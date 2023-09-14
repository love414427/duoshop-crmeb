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


namespace app\controller\openapi\store;


use app\common\repositories\delivery\DeliveryOrderRepository;
use app\common\repositories\store\order\StoreOrderCreateRepository;
use app\common\repositories\store\order\StoreOrderReceiptRepository;
use app\validate\api\UserReceiptValidate;
use crmeb\basic\BaseController;
use app\common\repositories\store\order\StoreCartRepository;
use app\common\repositories\store\order\StoreGroupOrderRepository;
use app\common\repositories\store\order\StoreOrderRepository;
use crmeb\exceptions\AuthException;
use crmeb\services\ExpressService;
use crmeb\services\LockService;
use think\App;
use think\exception\ValidateException;
use think\facade\Log;

/**
 * Class StoreOrder
 * @package app\controller\api\store\order
 * @author xaboy
 * @day 2020/6/10
 */
class StoreOrder extends BaseController
{
    /**
     * @var StoreOrderRepository
     */
    protected $repository;
    protected $merId;

    /**
     * StoreOrder constructor.
     * @param App $app
     * @param StoreOrderRepository $repository
     */
    public function __construct(App $app, StoreOrderRepository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
        $this->merId = $this->request->openMerId();
        if (!in_array(1,$this->request->openRoule())) throw new AuthException('无此权限');
    }

    /**
     * TODO 订单列表
     * @return \think\response\Json
     * @author Qinii
     * @day 2023/7/24
     */

    public function lst()
    {
        /**
         *  status 订单状态：0 全部 1 未支付 2 待发货 3 待收货 4 待评价 5 交易完成 6 已退款 7 待核销
         *  date 时间筛选：2023/07/25 - 2023/07/31
         *  order_sn 订单编号
         *  group_order_sn 主订单编号
         *  username 用户昵称
         *  order_type 订单类型 0 普通订单 1 自提订单 2 虚拟订单 3 卡密订单
         *  order_id 订单ID
         *  activity_type 活动类型
         *  store_name 商品名称模糊搜索
         *  filter_product 商品类型搜索 1 实物商品、2虚拟商品、3卡密商品
         *  filter_delivery 按发货方式：1快递订单、2配送订单、4核销订单、3虚拟发货、6自动发货
         */
        [$page, $limit] = $this->getPage();
        $where = $this->request->params(['status', 'date', 'order_sn', 'username', 'order_type', 'keywords', 'order_id', 'activity_type', 'group_order_sn', 'store_name','filter_delivery','filter_product']);
        $where['mer_id'] = $this->merId;
        $pay_type = $this->request->param('pay_type','');
        if ($pay_type != '') $where['pay_type'] = $this->repository::PAY_TYPE_FILTEER[$pay_type];
        return app('json')->success($this->repository->merchantGetList($where, $page, $limit));
    }

    /**
     * TODO 订单详情
     * @param $id
     * @return \think\response\Json
     * @author Qinii
     * @day 2023/7/24
     */
    public function detail($id)
    {
        $data = $this->repository->getOne($id, $this->merId);
        if (!$data) return app('json')->fail('数据不存在');
        return app('json')->success($data);
    }
}
