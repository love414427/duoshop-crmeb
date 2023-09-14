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


namespace app\common\repositories\system\diy;

use app\common\dao\system\diy\DiyDao;
use app\common\model\system\merchant\Merchant;
use app\common\repositories\BaseRepository;
use app\common\repositories\system\config\ConfigValueRepository;
use app\common\repositories\system\merchant\MerchantRepository;
use app\common\repositories\system\RelevanceRepository;
use crmeb\services\QrcodeService;
use think\exception\ValidateException;
use think\facade\Cache;
use think\facade\Db;

class DiyRepository extends BaseRepository
{
    const IS_DEFAULT_DIY = 'is_default_diy';


    public function __construct(DiyDao $dao)
    {
        $this->dao = $dao;
    }

    public function getList(array $where, int $page, int $limit )
    {
        $query = $this->dao->search($where);
        $count = $query->count();
        $list = $query->page($page,$limit)->select();
        return compact('count','list');
    }


    public function getThemeVar($type)
    {
        $var = [
            'purple' => [
                'type' => 'purple',
                'theme_color' => '#905EFF',
                'assist_color' => '#FDA900',
                'theme' => '--view-theme: #905EFF;--view-assist:#FDA900;--view-priceColor:#FDA900;--view-bgColor:rgba(253, 169, 0,.1);--view-minorColor:rgba(144, 94, 255,.1);--view-bntColor11:#FFC552;--view-bntColor12:#FDB000;--view-bntColor21:#905EFF;--view-bntColor22:#A764FF;'
            ],
            'orange' => [
                'type' => 'orange',
                'theme_color' => '#FF5C2D',
                'assist_color' => '#FDB000',
                'theme' => '--view-theme: #FF5C2D;--view-assist:#FDB000;--view-priceColor:#FF5C2D;--view-bgColor:rgba(253, 176, 0,.1);--view-minorColor:rgba(255, 92, 45,.1);--view-bntColor11:#FDBA00;--view-bntColor12:#FFAA00;--view-bntColor21:#FF5C2D;--view-bntColor22:#FF9445;'
            ],
            'pink' => [
                'type' => 'pink',
                'theme_color' => '#FF448F',
                'assist_color' => '#FDB000',
                'theme' => '--view-theme: #FF448F;--view-assist:#FDB000;--view-priceColor:#FF448F;--view-bgColor:rgba(254, 172, 65,.1);--view-minorColor:rgba(255, 68, 143,.1);--view-bntColor11:#FDBA00;--view-bntColor12:#FFAA00;--view-bntColor21:#FF67AD;--view-bntColor22:#FF448F;'
            ],
            'default' => [
                'type' => 'default',
                'theme_color' => '#E93323',
                'assist_color' => '#FF7612',
                'theme' => '--view-theme: #E93323;--view-assist:#FF7612;--view-priceColor:#E93323;--view-bgColor:rgba(255, 118, 18,.1);--view-minorColor:rgba(233, 51, 35,.1);--view-bntColor11:#FEA10F;--view-bntColor12:#FA8013;--view-bntColor21:#FA6514;--view-bntColor22:#E93323;'
            ],
            'green' => [
                'type' => 'green',
                'theme_color' => '#42CA4D',
                'assist_color' => '#FE960F',
                'theme' => '--view-theme: #42CA4D;--view-assist:#FE960F;--view-priceColor:#FE960F;--view-bgColor:rgba(254, 150, 15,.1);--view-minorColor:rgba(66, 202, 77,.1);--view-bntColor11:#FDBA00;--view-bntColor12:#FFAA00;--view-bntColor21:#42CA4D;--view-bntColor22:#70E038;'
            ],
            'blue' => [
                'type' => 'blue',
                'theme_color' => '#1DB0FC',
                'assist_color' => '#FFB200',
                'theme' => '--view-theme: #1DB0FC;--view-assist:#FFB200;--view-priceColor:#FFB200;--view-bgColor:rgba(255, 178, 0,.1);--view-minorColor:rgba(29, 176, 252,.1);--view-bntColor11:#FFD652;--view-bntColor12:#FEB60F;--view-bntColor21:#40D1F4;--view-bntColor22:#1DB0FC;'
            ],
        ];
        return $var[$type] ?? $var['default'];
    }

    /**
     * TODO 平台后台的商户默认模板列表
     * @param array $where
     * @param int $page
     * @param int $limit
     * @return array
     * @author Qinii
     * @day 2023/9/4
     */
    public function getMerDefaultList(array $where,int $page, int $limit)
    {
        $field = 'is_diy,template_name,id,title,name,type,add_time,update_time,status,is_default';
        $query = $this->dao->getSearch($where)->where('is_default',2)->whereOr(function($query){
            $query->where('type',2)->where('is_default',1);
        })->order('is_default DESC, status DESC, update_time DESC,add_time DESC');
        $count = $query->count();
        $list = $query->page($page, $limit)->setOption('field',[])->field($field)->select()
            ->each(function($item) use($where){
                if ($item['is_default'])  {
                    $id = merchantConfig(0, self::IS_DEFAULT_DIY) ?: 0;
                    $item['status'] = ($id == $item['id']) ? 1 : 0;
                    return $item;
                }
            });
        return compact('count','list');
    }
    /**
     * 获取DIY列表
     * @param array $where
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getSysList(array $where,int $page, int $limit)
    {
        $field = 'is_diy,template_name,id,title,name,type,add_time,update_time,status,is_default';
        $query = $this->dao->getSearch($where)->order('is_default DESC, status DESC, update_time DESC,add_time DESC');
        $count = $query->count();
        $list = $query->page($page, $limit)->setOption('field',[])->field($field)->select()
            ->each(function($item) use($where){
                if ($item['is_default'])  {
                    $id = merchantConfig(0, self::IS_DEFAULT_DIY) ?: 0;
                    $item['status'] = ($id == $item['id']) ? 1 : 0;
                    return $item;
                }
            });
        return compact('count','list');
    }

    /**
     * TODO 商户获取diy列表
     * @param array $where
     * @param int $page
     * @param int $limit
     * @return array
     * @author Qinii
     * @day 2023/7/14
     */
    public function getMerchantList(array $where,int $page, int $limit)
    {
        $field = 'is_diy,template_name,id,title,name,type,add_time,update_time,status,is_default';
        $id = merchantConfig($where['mer_id'], self::IS_DEFAULT_DIY) ?: 0;
        $query = $this->dao->search($where)->order('is_default DESC, status DESC, update_time DESC,add_time DESC');
        $count = $query->count();
        $list = $query->page($page, $limit)->setOption('field',[])->field($field)->select()
            ->each(function($item) use($id){
                $item['status'] = ($id == $item['id']) ? 1 : 0;
                return $item;
            });
        return compact('count','list');
    }

    /**
     * TODO 商户获取自己的默认模板
     * @param array $where
     * @param int $page
     * @param int $limit
     * @author Qinii
     * @day 2023/9/4
     */
    public function getMerchantDefaultList(array $where,int $page, int $limit)
    {
        $field = 'is_diy,template_name,id,title,name,type,add_time,update_time,status,is_default';
        $query = $this->dao->search($where)->order('is_default DESC, status DESC, update_time DESC,add_time DESC');
        $count = $query->count();
        $list = $query->page($page, $limit)->setOption('field',[])->field($field)->select();
        return compact('count','list');
    }



    /**
     * 保存资源
     * @param int $id
     * @param array $data
     * @return int
     */
    public function saveData(int $id = 0, array $data)
    {
        if ($id) {
            if ($data['type'] === '') {
                unset($data['type']);
            }
            $data['update_time'] = date('Y-m-d H:i:s',time());
            $this->dao->update($id, $data);
        } else {
            $data['status'] = 0;
            $data['add_time'] = date('Y-m-d H:i:s',time());
            $data['update_time'] = date('Y-m-d H:i:s',time());
            $res = $this->dao->create($data);
            if (!$res) throw new ValidateException('保存失败');
            $id = $res->id;
        }
        $where = [
            'is_diy' => 1,
            'is_del' => 0,
            'id' => $id
        ];
        ksort($where);
        $cache_unique = 'get_sys_diy_'. md5(json_encode($where));
        Cache::delete($cache_unique);
        $micro_unique = 'sys.get_sys_micro_'.$id;
        Cache::delete($micro_unique);
        return $id;
    }

    /**
     * 删除DIY模板
     * @param int $id
     */
    public function del(int $id, $merId)
    {
        $diyData = $this->dao->getWhere(['id' => $id]);
        if (!$diyData) throw new ValidateException('数据不存在');
        if ($diyData['is_default'] && $merId) throw new ValidateException('无权删除默认模板');
        if ($diyData['is_default']){
            $count = $this->dao->search(['type' => $diyData['type']])
                ->where('is_default','<>',0)
                ->where('id','<>',$id)
                ->count();
            if (!$count)throw new ValidateException('至少存在一个默认模板');
        }
        $res = $this->dao->delete($id);
        if (!$res) throw new ValidateException('删除失败，请稍后再试');
    }


    /**
     * 获取diy详细数据
     * @param int $id
     * @return array|object
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getMicro($id)
    {
        $where = ['id' => $id,'is_diy' => 0];
        $data = [];
        $diyInfo = $this->dao->getWhere($where);
        if ($diyInfo) {
            $data = $diyInfo->toArray();
            $data['value'] = json_decode($diyInfo['value'], true);
        }
        return compact('data');
    }

    /**
     * TODO 商城首页/商户首页/预览等调用获取diy详情
     * @param int $merId
     * @param int $id
     * @param int $isDiy
     * @return array
     * @author Qinii
     * @day 2023/7/15
     */
    public function show(int $merId, int $id,int $isDiy = 1)
    {
        $where = [
            'is_diy' => $isDiy,
            'is_del' => 0,
        ];
        if (!$id) {
            $id = merchantConfig($merId, self::IS_DEFAULT_DIY);
            if (!$id || ($id && !$this->dao->get($id))) {
                if ($merId) {
                    $merchant = app()->make(MerchantRepository::class)->get($merId);
                    $scop = [
                        'mer_id' => $merId,
                        'type_id'=> $merchant->type_id,
                        'category_id'=> $merchant->category_id,
                        'is_trader'=> $merchant->is_trader,
                    ];
                    $ids = $this->dao->withMerSearch($scop);
                    if (empty($ids)) $ids = $this->dao->search(['is_default' => 1,'type' => 2])->column('id');
                } else {
                    $ids = $this->dao->search(['is_default' => 1,'type' => 1])->column('id');
                }
                if (empty($ids)) throw new ValidateException('模板获取失败，请联系管理员！');
                $id = $ids[array_rand($ids,1)];
            }
        }
        $where['id'] = $id;
        ksort($where);
        $cache_unique = 'get_sys_diy_' . md5(json_encode($where));
        $data = Cache::remember($cache_unique,function()use($merId,$id,$where){
            $diyInfo = $this->dao->getWhere($where);
            if ($diyInfo) {
                if ($diyInfo['mer_id'] != $merId && !$diyInfo['is_default']) throw new ValidateException('模板不存在或不属于您');
                $diyInfo = $diyInfo->toArray();
                $diyInfo['value'] = json_decode($diyInfo['value'], true);
            } else {
                $diyInfo = [];
            }
            return json_encode($diyInfo, JSON_UNESCAPED_UNICODE);
        }, 3600);
        $data = json_decode($data);
        return compact('data');
    }


    /**
     * 获取底部导航
     * @param string $template_name
     * @return array|mixed
     */
    public function getNavigation()
    {
        $id = merchantConfig(0, self::IS_DEFAULT_DIY);
        $diyInfo = $this->dao->getWhere(['id' => $id,'is_del' => 0],'value');
        if (!$diyInfo) {
            $where = ['is_default' =>  1,];
            $diyInfo = $this->dao->getWhere($where,'value');
        }
        $navigation = [];
        if ($diyInfo) {
            $value = json_decode($diyInfo['value'], true);
            foreach ($value as $item) {
                if (isset($item['name']) && strtolower($item['name']) === 'pagefoot') {
                    $navigation = $item;
                    break;
                }
            }
        }
        return $navigation;
    }

    public function copy($id, $merId)
    {
        $data = $this->dao->getWhere([$this->dao->getPk() => $id]);
        if (!$data) throw new ValidateException('数据不存在');
        $data = $data->toArray();
        $data['name'] = ($merId ? '商户复制-' :  '平台复制-' ).$data['name'].'-copy';
        $data['add_time'] = date('Y-m-d H:i:s',time());
        $data['update_time'] = date('Y-m-d H:i:s',time());
        $data['status'] = 0;
        $data['mer_id'] = $merId;
        $data['scope_type'] = 0;
        $data['is_default'] =  (!$merId && $data['type'] == 2) ? 1 : 0;
        unset($data[$this->dao->getPk()]);
        $res = $this->dao->create($data);
        $id = $res[$this->dao->getPk()];
        return compact('id');
    }


    public function setUsed(int $id, int $merId)
    {
        $diyInfo = $this->dao->getWhere(['id' => $id]);
        if (!$diyInfo) throw new ValidateException('模板不存在');

        if ($diyInfo['mer_id'] != $merId && !$diyInfo['is_default']) {
            throw new ValidateException('模板不属于你');
        }
        $make = app()->make(ConfigValueRepository::class);
        return Db::transaction(function () use($id, $merId, $make){
            $this->dao->setUsed($id, $merId);
            return $make->setFormData([self::IS_DEFAULT_DIY => $id ], $merId);
        });
    }


    public function getOptions(array $where)
    {
        return $this->dao->getSearch($where)->field('name label, id value')->select();
    }

    /**
     * TODO 获取没个模板的适用范围
     * @param $id
     * @return array|\think\Model|null
     * @author Qinii
     * @day 2023/7/15
     */
    public function getScope($id)
    {
        $res = $this->dao->getWhere(['id' => $id],'id,scope_type',['relevance']);
        $scope_value = [];
        foreach ($res['relevance'] as $item) {
            $scope_value[] = $item['right_id'];
        }
        unset($res['relevance']);
        $data['scope_type'] = is_null($res['scope_type']) ? 4 : $res['scope_type'];
        $data['scope_value'] = $scope_value;
        return  $data;
    }

    /**
     * TODO 保存模板的适用范围
     * @param $id
     * @param $data
     * @return mixed
     * @author Qinii
     * @day 2023/7/15
     */
    public function setScope($id,$data)
    {
        $rest = $this->dao->get($id);
        if (!$rest) throw new ValidateException('数据不存在');
        if ($rest->type != 2 && !$rest->is_default) throw new ValidateException('非默认模板');
        //DIY默认模板适用范围 0. 指定店铺、1. 指定商户分类、2. 指定店铺类型、3. 指定商户类别、4.全部店铺
        $relevanceRepository = app()->make(RelevanceRepository::class);
        $oldRelevanceType = RelevanceRepository::MER_DIY_SCOPE[$rest['scope_type']] ?? '';
        $relevanceType = RelevanceRepository::MER_DIY_SCOPE[$data['scope_type']] ?? '';

        return Db::transaction(function() use($id,$data,$relevanceRepository,$rest,$relevanceType,$oldRelevanceType) {
            if ($oldRelevanceType) $relevanceRepository->clear($id,$oldRelevanceType);
            if (!empty($data['scope_value']) && $relevanceType) {
                $relevanceRepository->createMany($id,$data['scope_value'],$relevanceType);
            }
            $rest->scope_type = $data['scope_type'];
            return $rest->save();
        });
    }

    /**
     *  生成小程序预览二维码
     * @param $id
     * @param $merId
     * @return bool|int|mixed|string
     * @author Qinii
     * @day 2023/9/12
     */
    public function review($id,$merId)
    {
        $name = md5('view_diy_' .$id).'.jpg';
        $qrcodeService = app()->make(QrcodeService::class);
        $link = 'pages/admin/storeDiy/index';
        $params = 'diy_id='.$id .'&id='.$merId;
        return $qrcodeService->getRoutineQrcodePath($name, $link, $params,'routine/diy');
    }
}
