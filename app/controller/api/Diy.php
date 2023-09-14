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
namespace app\controller\api;

use app\common\repositories\community\CommunityRepository;
use app\common\repositories\store\broadcast\BroadcastRoomRepository;
use app\common\repositories\store\coupon\StoreCouponRepository;
use app\common\repositories\store\order\StoreOrderRepository;
use app\common\repositories\store\product\ProductAssistRepository;
use app\common\repositories\store\product\ProductGroupRepository;
use app\common\repositories\store\product\ProductPresellRepository;
use app\common\repositories\store\product\ProductRepository;
use app\common\repositories\store\product\SpuRepository;
use app\common\repositories\store\StoreCategoryRepository;
use app\common\repositories\store\StoreSeckillTimeRepository;
use app\common\repositories\system\merchant\MerchantRepository;
use crmeb\basic\BaseController;
use think\App;
use think\facade\Cache;

class Diy extends BaseController
{
    protected $unique;
    protected $diyId;

    public function __construct(App $app)
    {
        parent::__construct($app);
        $this->unique = trim((string)$this->request->param('unique'));
        if ($this->unique) {
            $params = $this->request->get();
            unset($params['diy_id'], $params['unique']);
            $params['_url'] = $this->request->pathinfo();
            ksort($params);
            $this->unique = md5($this->unique . json_encode($params));
        }
        $this->diyId = ((int)$this->request->param('diy_id')) ?: 0;
    }

    protected function cache($fn)
    {
        if (!$this->unique || !$this->diyId) {
            return $fn();
        }
        $res = Cache::get('diy.' . $this->diyId . '.' . $this->unique);
        if ($res) return json_decode($res, true);
        $res = $fn();
        Cache::set('diy.' . $this->diyId . '.' . $this->unique, json_encode($res), $res['ttl'] ?? 1500 + random_int(30, 100));
        return $res;
    }


    /**
     * TODO 首页diy需要的秒杀列表
     * @param ProductRepository $productRepository
     * @param StoreSeckillTimeRepository $storeSeckillTimeRepository
     * @return \think\response\Json
     * @author Qinii
     * @day 2023/8/15
     */
    public function seckill(ProductRepository $productRepository, StoreSeckillTimeRepository $storeSeckillTimeRepository)
    {
        $limit = $this->request->param('limit',10);
        $data = $this->cache(function() use($productRepository,$storeSeckillTimeRepository,$limit) {
            $mer_id = $this->request->param('mer_id','');
            $field = 'Product.product_id,Product.mer_id,is_new,U.keyword,brand_id,U.image,U.product_type,U.store_name,U.sort,U.rank,star,rate,reply_count,sales,U.price,cost,Product.ot_price,stock,extension_type,care_count,unit_name,U.create_time';
            $res = $storeSeckillTimeRepository->getBginTime([]);
            $data = [];
            if ($res) {
                $where = [
                    'start_time' => $res['start_time'],
                    'end_time' => $res['end_time'],
                    'day' => date('Y-m-d', time()),
                    'star' => '',
                    'mer_id' => $mer_id
                ];
                $data['stop'] = strtotime((date('Y-m-d ',time()).$res['end_time'].':00:00'));
                $data['ttl'] = ($data['stop'] - time() - 30) > 0 ?: 5;
                $data['list'] = [];
                $make = app()->make(StoreOrderRepository::class);
                $list = $productRepository->seckillSearch($where)->limit($limit)->setOption('field', [])->field($field)->select()->each(function ($item) use ($make) {
                    $item['sales'] = $make->seckillOrderCounut($item['product_id']);
                    $item['stop']  = $item->end_time;
                    return $item;
                });
                if ($list) $data['list'] = $list->toArray();
            }
            return $data;
        });
        return app('json')->success($data);
    }

    /**
     * TODO DIY 预售商品列表
     * @param ProductPresellRepository $productPresellRepository
     * @return \think\response\Json
     * @author Qinii
     * @day 2023/8/15
     */
    public function presell(ProductPresellRepository $repository)
    {
        $limit = $this->request->param('limit',10);
        $data = $this->cache(function() use($repository,$limit) {
            $where = $repository->actionShow();
            $where['type'] = 100;
            $where['star'] = '';
            $where['mer_id'] = $this->request->param('mer_id','');
            $list = $repository->search($where)->with(['product' => function($query){
                $query->field('product_id,image,store_name');
            }])->limit($limit)->select();
            if ($list) $data['list'] = $list->toArray();
            return $data;
        });
        return app('json')->success($data);
    }

    /**
     * TODO DIY助力商品列表
     * @param ProductAssistRepository $repository
     * @return \think\response\Json
     * @author Qinii
     * @day 2023/8/15
     */
    public function assist(ProductAssistRepository $repository)
    {
        $limit = $this->request->param('limit',10);
        $data = $this->cache(function() use($repository,$limit) {
            $where = $repository->assistShow();
            $where['star'] = '';
            $where['mer_id'] = $this->request->param('mer_id','');
            $list = $repository->search($where)->with([
                'assistSku',
                'product' => function($query){
                    $query->field('product_id,image,store_name');
                },
            ])->append(['user_count'])->limit($limit)->select();
            if ($list) $data['list'] = $list->toArray();
            return $data;
        });
        return app('json')->success($data);
    }

    /**
     * TODO DIY拼团商品列表
     * @param ProductGroupRepository $repository
     * @return \think\response\Json
     * @author Qinii
     * @day 2023/8/15
     */
    public function group(ProductGroupRepository $repository)
    {
        $limit = $this->request->param('limit',10);
        $data = $this->cache(function() use($repository,$limit) {
            $where = $repository->actionShow();
            $where['order'] = '';
            $where['mer_id'] = $this->request->param('mer_id','');
            $list = $repository->search($where)->with([
                'product' => function($query){
                    $query->field('product_id,store_name,image,price,sales,unit_name');
                },
            ])->limit($limit)->select();
            if ($list) $data['list'] = $list->toArray();
            return $data;
        });
        return app('json')->success($data);
    }

    /**
     * TODO DIY商品列表
     * @param SpuRepository $repository
     * @return \think\response\Json
     * @author Qinii
     * @day 2023/8/15
     */
    public function spu(SpuRepository $repository)
    {
        $data = $this->cache(function() use($repository) {
            $where = $this->request->params(['cate_pid','product_ids','mer_id','mer_cate_id']);
            $limit = $this->request->param('limit',10);
            $where['spu_status'] = 1;
            $where['mer_status'] = 1;
            $where['not_type'] = [20];
            $where['is_gift_bag'] = 0;
            $where['product_type'] = 0;
            $list = $repository->search($where)->with(['merchant'=> function($query){
                $query->with(['typeName','categoryName'])->field('mer_id,category_id,type_id,mer_avatar,mer_name,is_trader');
            },'issetCoupon'])->limit($limit)->select();
            if ($list) $data['list'] = $list->toArray();
            return $data;
        });
        return app('json')->success($data);
    }

    /**
     * TODO DIY社区文章列表
     * @param CommunityRepository $repository
     * @return \think\response\Json
     * @author Qinii
     * @day 2023/8/15
     */
    public function community(CommunityRepository $repository)
    {
        $limit = $this->request->param('limit',10);
        $data = $this->cache(function() use($repository,$limit) {
            $where = $repository::IS_SHOW_WHERE;
            $list = $repository->search($where)->with([
                'author' => function($query) {
                    $query->field('uid,real_name,status,avatar,nickname,count_start');
                },
            ])->limit($limit)->select();
            if ($list) $data['list'] = $list->toArray();
            return $data;
        });
        return app('json')->success($data);
    }

    /**
     * TODO DIY店铺推荐列表
     * @param MerchantRepository $repository
     * @return \think\response\Json
     * @author Qinii
     * @day 2023/8/15
     */
    public function store(MerchantRepository $repository)
    {
        $limit = $this->request->param('limit',10);
        $data = $this->cache(function() use($repository,$limit) {
            $field = 'mer_id,care_count,is_trader,type_id,mer_banner,mini_banner,mer_name, mark,mer_avatar,product_score,service_score,postage_score,sales,status,is_best,create_time,long,lat,is_margin';
            $where['is_best'] = 1;
            $where['status'] = 1;
            $where['mer_state'] = 1;
            $where['is_del'] = 0;
            $list = $repository->search($where)->with(['type_name'])->setOption('field', [])->field($field)->limit($limit)->select()->append(['all_recommend']);
            if ($list) $data['list'] = $list->toArray();
            return $data;
        });
        return app('json')->success($data);
    }

    /**
     * TODO DIY 优惠券列表
     * @param StoreCouponRepository $repository
     * @return \think\response\Json
     * @author Qinii
     * @day 2023/8/15
     */
    public function coupon(StoreCouponRepository $repository)
    {
        $limit = $this->request->param('limit',10);
        $data = $this->cache(function() use($repository,$limit) {
            $uid = 0;
            if ($this->request->isLogin()) $uid = $this->request->uid();
            $where['send_type'] = 0;
            $where['mer_id'] = $this->request->param('mer_id','');
            $with = [];
            if ($uid)
                $with['issue'] = function ($query) use ($uid) {
                    $query->where('uid', $uid);
                };
            $baseQuery = $repository->validCouponQueryWithMerchant($where, $uid)->with($with);
            $list = $baseQuery->setOption('field',[])->field('C.*')->limit($limit)->select();
            if ($list) $data['list'] = $list->toArray();
            return $data;
        });
        return app('json')->success($data);
    }

    /**
     * TODO DIY二级分类
     * @param StoreCategoryRepository $repository
     * @return \think\response\Json
     * @author Qinii
     * @day 2023/8/16
     */
    public function category(StoreCategoryRepository $repository)
    {
        $data = $this->cache(function() use($repository) {
            $data = app()->make(StoreCategoryRepository::class)->getTwoLevel();
            return $data;
        });
        return app('json')->success($data);
    }

    /**
     * TODO 小程序直播接口
     * @param BroadcastRoomRepository $repository
     * @return \think\response\Json
     * @author Qinii
     * @day 2023/8/16
     */
    public function broadcast(BroadcastRoomRepository $repository)
    {
        $limit = $this->request->param('limit',10);
        $data = $this->cache(function() use($repository,$limit) {
            $where = $this->request->params(['mer_id']);
            $where['show_tag'] = 1;
            $list = $repository->search($where)->where('room_id', '>', 0)
                ->whereNotIn('live_status', [107])->limit($limit)
                ->with([
                    'broadcast' => function($query) {
                        $query->where('on_sale',1);
                        $query->with('goods');
                    }
                ])
                ->order('star DESC, sort DESC, create_time DESC')->select();
            if ($list) $data['list'] = $list->toArray();
            return $data;
        });
        return app('json')->success($data);
    }

    /**
     * TODO DIY 热门排行列表
     * @param SpuRepository $repository
     * @return \think\response\Json
     * @author Qinii
     * @day 2023/8/16
     */
    public function hot_top(SpuRepository $repository)
    {
        $data = $this->cache(function() use($repository) {
            $cateId = $this->request->param('cate_pid',0);
            $cateId = is_array($cateId) ?:explode(',',$cateId);
            $cateId = array_unique($cateId);
            $count = count($cateId);
            if ($count > 3){
                $cateId = array_slice($cateId,0,3);
            } else if ($count < 3) {
                $limit = 3 - count($cateId);
                $_cateId = app()->make(StoreCategoryRepository::class)->getSearch([
                    'level' => systemConfig('hot_ranking_lv') ?:0,
                    'mer_id' => 0,
                    'is_show' => 1,
                    'type' => 0
                ])->limit($limit)->order('sort DESC,create_time DESC')->column('store_category_id');
                $cateId = array_merge($cateId,$_cateId);
            }
            $data = [];
            $storeCategoryRepository = app()->make(StoreCategoryRepository::class);
            foreach ($cateId as $cate_id) {
                $list = $repository->getHotRanking($cate_id ?: 0,3);
                $cate = $storeCategoryRepository->get($cate_id);
                $data[] = [
                    'cate_id' => $cate['store_category_id'] ?? 0,
                    'cate_name' => $cate['cate_name'] ?? '总榜',
                    'list' => $list,
                ];
            }
            return $data;
        });
        return app('json')->success($data);
    }
}
