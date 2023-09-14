<?php

// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2022 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

namespace app\common\repositories\wechat;

use app\common\dao\wechat\TemplateMessageDao;
use app\common\repositories\BaseRepository;
use app\common\repositories\system\notice\SystemNoticeConfigRepository;
use crmeb\exceptions\WechatException;
use crmeb\services\MiniProgramService;
use crmeb\services\WechatService;
use FormBuilder\Factory\Elm;
use think\exception\ValidateException;
use think\facade\Config;
use think\facade\Log;
use think\facade\Route;

/**
 * Class TemplateMessageRepository
 * @package app\common\repositories\wechat
 * @mixin TemplateMessageDao
 */
class TemplateMessageRepository extends BaseRepository
{

    /**
     * @var TemplateMessageDao
     */
    public $dao;

    /**
     * TemplateMessageRepository constructor.
     * @param TemplateMessageDao $dao
     */
    public function __construct(TemplateMessageDao $dao)
    {
        $this->dao = $dao;
    }


    public function getList($wereh,$page,$limit)
    {
        $query = $this->dao->search($wereh);
        $count = $query->count();
        $list = $query->page($page,$limit)->order('template_id DESC')->select();
        return compact('count','list');
    }

    /**
     * TODO
     * @param int|null $id
     * @param int $type
     * @return \FormBuilder\Form
     * @author Qinii
     * @day 2020-06-19
     */
    public function form(?int $id = null,$type = 0)
    {
        $form = Elm::createForm(Route::buildUrl('systemTemplateMessageCreate')->build());
        $form->setRule([
            Elm::hidden('type',$type),
            Elm::input('tempkey','模板编号'),
            Elm::input('name','模板名'),
            Elm::input('tempid','模板ID'),
            Elm::textarea('content','回复内容'),
            Elm::switches('status','状态',1)->activeValue(1)->inactiveValue(0)->inactiveText('关')->activeText('开'),
        ]);
        return $form->setTitle(is_null($id) ? '添加' : '编辑');
    }

    /**
     * TODO
     * @param $id
     * @return \FormBuilder\Form
     * @author Qinii
     * @day 2020-06-19
     */
    public function updateForm($id)
    {
        $tem = $this->dao->get($id);
        $form = Elm::createForm(Route::buildUrl('systemTemplateMessageUpdate',['id' => $id])->build());
        $form->setRule([
            Elm::hidden('type',$tem['type']),
            Elm::input('tempkey','模板编号',$tem['tempkey'])->disabled(1),
            Elm::input('name','模板名',$tem['name'])->disabled(1),
            Elm::input('tempid','模板ID',$tem['tempid']),
            Elm::switches('status','状态',$tem['status'])->activeValue(1)->inactiveValue(0)->inactiveText('关')->activeText('开'),
        ]);
        return $form->setTitle('编辑');
    }

    public function getSubscribe()
    {
        $res = [];
        $data = $this->dao->search(['type' => 0])->column('tempid','tempkey');
        $arr = Config::get('template.stores.subscribe.template_id');
        foreach ($arr as $k => $v){
            $res[$k] = $data[$v] ?? '';
        }
        return $res;
    }

    public function getTemplateList(array $where)
    {
        $query = $this->dao->search($where);
        $count = $query->count();
        $list = $query->select();
        foreach ($list as &$item) {
            if ($item['content']) $item['content'] = explode("\n", $item['content']);
        }
        return compact('list', 'count');
    }


    /**
     * TODO 同步订阅消息
     * @return string
     * @author Qinii
     * @day 11/24/21
     */
    public function syncMinSubscribe()
    {
        if (!systemConfig('routine_appId') || !systemConfig('routine_appsecret')) {
            throw new ValidateException('请先配置小程序appid、appSecret等参数');
        }
        $systemNoticeConfigRepository = app()->make(SystemNoticeConfigRepository::class);
        $all = $systemNoticeConfigRepository->getTemplateList(0);
        $errData = [];
        $errMessage = [
            '-1' => '系统繁忙，此时请稍候再试',
            '40001' => 'AppSecret错误或者AppSecret不属于这个小程序，请确认AppSecret 的正确性',
            '40002' => '请确保grant_type字段值为client_credential',
            '40013' => '不合法的AppID，请检查AppID的正确性，避免异常字符，注意大小写',
            '40125' => '小程序配置无效，请检查配置',
            '41002' => '缺少appid参数',
            '41004' => '缺少secret参数',
            '43104' => 'appid与openid不匹配',
            '45009' => '达到微信api每日限额上限',
            '200011' => '此账号已被封禁，无法操作',
            '200012' => '个人模版数已达上限，上限25个',
        ];
        if ($all['list']) {

            $time = time();
            foreach ($all['list'] as $k => $template) {
                if ($template['tempkey']) {
                    if (!isset($template['kid'])) {
                        throw new ValidateException('缺少字段：kid');
                    }
                    if (isset($template['kid']) && $template['kid']) {
                        continue;
                    }
                    $works = [];
                    try {
                        $works = MiniProgramService::create()->getSubscribeTemplateKeyWords($template['tempkey']);
                    } catch (\Throwable $e) {
                        $wechatErr = $e->getMessage();
                        if (is_string($wechatErr))
                            throw new WechatException('模板ID：'.$template['tempkey'].',错误信息'.$wechatErr);
                        if (in_array($e->getCode(), array_keys($errMessage))) {
                            throw new WechatException($errMessage[$wechatErr->getCode()]);
                        }
                        $errData[$k][] = '获取关键词列表失败：' . $wechatErr->getMessage();
                    }
                    $kid = [];
                    if ($works) {
                        $works = array_combine(array_column($works, 'name'), $works);
                        $content = is_array($template['content']) ? $template['content'] : explode("\n", $template['content']);
                        foreach ($content as $c) {
                            $name = trim(explode('{{', $c)[0] ?? '');
                            if ($name && isset($works[$name])) {
                                $kid[] = $works[$name]['kid'];
                            }
                        }
                    }
                    if ($kid && isset($template['kid']) && !$template['kid']) {
                        $tempid = '';
                        try {
                            $tempid = MiniProgramService::create()->addSubscribeTemplate($template['tempkey'], $kid, $template['notice_title']);
                        } catch (\Throwable $e) {
                            $wechatErr = $e->getMessage();
                            if ($e->getCode() == 200022) continue;
                            if (is_string($wechatErr)) throw new WechatException($wechatErr);
                            if (in_array($wechatErr->getCode(), array_keys($errMessage))) {
                                throw new WechatException($errMessage[$wechatErr->getCode()]);
                            }
                            $errData[$k][] = '模板ID：'.$template['tempkey'].'，添加订阅消息模版失败：'.$wechatErr->getMessage();
                        }

                        if ($tempid != $template['tempid'] && $tempid) {
                            $systemNoticeConfigRepository->update($template['notice_config_id'], ['routine_tempid' => $tempid, 'kid' => json_encode($kid)]);
                        }
                    }
                }
            }
        }
        if ($errData) Log::error('同步消息失败：'.var_export($errData,1));
        return $errData ? '同步存在错误，请在日志查看:/runtime/log/' : '同步成功';
    }

    /**
     * 同步模板消息
     * @return mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function syncWechatSubscribe()
    {
        if (!systemConfig('wechat_appid') || !systemConfig('wechat_appsecret')) {
            throw new WechatException('请先配置微信公众号appid、appSecret等参数');
        }
        $systemNoticeConfigRepository = app()->make(SystemNoticeConfigRepository::class);
        $tempall = $systemNoticeConfigRepository->getTemplateList(1);
        /*
         * 删除所有模版ID
         */
        //获取微信平台已经添加的模版
        $list = WechatService::create()->getPrivateTemplates();//获取所有模版
        foreach ($list->template_list as $v) {
            //删除已有模版
            WechatService::create()->deleleTemplate($v['template_id']);
        }

        foreach ($tempall['list'] as $temp) {
            $content = is_array($temp['content']) ? $temp['content'] : explode("\n", $temp['content']);
            $name = [];
            foreach ($content as $c) {
                $name[] = trim(explode('{{', $c)[0] ?? '');
            }
            //添加模版消息
            try{
                $res = WechatService::create()->addTemplateId($temp['tempkey'],$name);
            }catch (\Exception $exception) {
                return $temp['notice_title'].$exception->getMessage();
            }

            if (!$res->errcode && $res->template_id) {
                $systemNoticeConfigRepository->update($temp['notice_config_id'], ['wechat_tempid' => $res->template_id]);
            }
        }

        return '模版消息一键设置成功';
    }
}
