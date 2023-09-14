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


namespace app\common\repositories\openapi;

use app\common\dao\openapi\OpenAuthDao;
use app\common\repositories\BaseRepository;
use crmeb\exceptions\AuthException;
use FormBuilder\Factory\Elm;
use think\exception\ValidateException;
use think\facade\Cache;
use think\facade\Config;
use think\facade\Route;

class OpenAuthRepository extends BaseRepository
{
    public function __construct(OpenAuthDao $dao)
    {
        $this->dao = $dao;
    }

    /**
     * TODO 创建
     * @param int $merId
     * @param array $data
     * @return \app\common\dao\BaseDao|\think\Model
     * @author Qinii
     * @day 2023/7/21
     */
    public function create(int $merId, array $data)
    {
        $data['secret_key'] = $this->createSecretKey($merId);
        $data['mer_id'] = $merId;
        return $this->dao->create($data);
    }

    /**
     * TODO 列表
     * @param $where
     * @param $page
     * @param $limit
     * @return array
     * @author Qinii
     * @day 2023/7/21
     */
    public function getList($where,$page, $limit)
    {
        $where['is_del'] = 0;
        $query = $this->dao->getSearch($where)->hidden(['secret_key','delete_time'])->order('id ASC');
        $count = $query->count();
        $list = $query->page($page, $limit)->select();
        return compact('count','list');
    }

    /**
     * TODO 添加编辑表单
     * @param int $merId
     * @param $id
     * @return \FormBuilder\Form
     * @author Qinii
     * @day 2023/7/21
     */
    public function form(int $merId, $id = 0)
    {
        $formData = [];
        if ($id) {
            $formData = $this->dao->getWhere(['id' => $id])->toArray();
            if (!$formData) throw new ValidateException('数据不存在');
            $form = Elm::createForm(Route::buildUrl('merchantOpenapiUpdate', ['id' => $id])->build());
        } else {
            $form = Elm::createForm(Route::buildUrl('merchantOpenapiCreate')->build());
        }
        $form->setRule([
            Elm::input('title', '标题'),
            Elm::input('access_key', 'accessKey', $formData['access_key'] ?? $this->createAccessKey($merId))->hiddenStatus(true),
            Elm::selectMultiple('auth', '权限')->options([
                ['value' => '1','label' => '商品'],
                ['value' => '2','label' => '订单'],
            ]),
            Elm::input('mark', '备注'),
            Elm::switches('status', '是否开启', 1)->activeValue(1)->inactiveValue(0)->inactiveText('关')->activeText('开'),
            Elm::number('sort', '排序', 0)->precision(0)->max(99999),
        ]);
        return $form->setTitle($id ? '编辑授权账号' : '添加授权账号')->formData($formData);
    }

    /**
     * TODO 生成 AccessKey
     * @param int $merId
     * @return string
     * @author Qinii
     * @day 2023/7/21
     */
    public function createAccessKey(int $merId)
    {
        list($msec, $sec) = explode(' ', microtime());
        $msectime = number_format((floatval($msec) + floatval($sec)) * 1000, 0, '', '');
        $sn = $msectime . random_int(10000, max(intval($msec * 10000) + 10000, 98369));
        return 'M'.$merId.'os'.$sn;
    }

    /**
     * TODO 生成 secret_key
     * @param int $merId
     * @return string
     * @author Qinii
     * @day 2023/7/21
     */
    public function createSecretKey(int $merId)
    {
        list($msec, $sec) = explode(' ', microtime());
        $msectime = number_format((floatval($msec) + floatval($sec)) * 1000, 0, '', '');
        return $merId.'cb'.MD5($msectime . random_int(10000, max(intval($msec * 10000) + 10000, 98369)));
    }

    /**
     * TODO 获取secret_key
     * @param $id
     * @return array
     * @author Qinii
     * @day 2023/7/21
     */
    public function getSecretKey($id)
    {
        $data = $this->dao->get($id);
        return ['secret_key' => $data['secret_key']];
    }

    /**
     * TODO 重置secret_key
     * @param $id
     * @return int
     * @author Qinii
     * @day 2023/7/21
     */
    public function setSecretKey($id,$merId)
    {
        $data['secret_key'] = $this->createSecretKey($merId);
        $data['update_time'] = date('Y-m-d H:i:s',time());
        $this->dao->update($id,$data);
        return  ['secret_key' => $data['secret_key']];
    }

    public function checkToken(string $token)
    {
        $has = Cache::has('openapi_' . $token);
        if (!$has)
            throw new AuthException('无效的token');
        $lastTime = Cache::get('openapi_' . $token);
        if (($lastTime + (intval(Config::get('admin.openapi_token_valid_exp', 15))) * 60) < time())
            throw new AuthException('token 已过期');
    }

}
