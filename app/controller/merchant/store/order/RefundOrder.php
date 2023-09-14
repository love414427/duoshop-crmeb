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

namespace app\controller\merchant\store\order;

use app\common\repositories\store\ExcelRepository;
use app\common\repositories\store\order\MerchantReconciliationRepository;
use app\common\repositories\store\order\StoreOrderProductRepository;
use app\common\repositories\store\order\StoreOrderRepository;
use app\common\repositories\store\order\StoreOrderStatusRepository;
use app\common\repositories\store\order\StoreRefundStatusRepository;
use crmeb\services\ExcelService;
use think\App;
use crmeb\basic\BaseController;
use app\common\repositories\store\order\StoreRefundOrderRepository as repository;
use think\exception\ValidateException;

class RefundOrder extends BaseController
{
    /**
     * @var repository
     */
    protected $repository;


    /**
     * Order constructor.
     * @param App $app
     * @param repository $repository
     */
    public function __construct(App $app, repository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
    }

    /**
     * TODO 获取可退款的商品信息
     * @param $id
     * @param StoreOrderRepository $storeOrderRepository
     * @param StoreOrderProductRepository $orderProductRepository
     * @return \think\response\Json
     * @author Qinii
     * @day 2023/7/13
     */
    public function check($id, StoreOrderRepository $storeOrderRepository, StoreOrderProductRepository $orderProductRepository)
    {
        $order = $storeOrderRepository->getSearch(['mer_id' => $this->request->merId()])->where('order_id',$id)->find();
        if (!$order) return app('json')->fail('订单状态有误');
        if (!$order->refund_status) return app('json')->fail('订单已过退款/退货期限');
        if ($order->status < 0) return app('json')->fail('订单已退款');
        if ($order->status == 10) return app('json')->fail('订单不支持退款');
        $product = $orderProductRepository->userRefundProducts([],0,$id,0);
        $total_refund_price = $this->repository->getRefundsTotalPrice($order,$product,0);
        $activity_type = $order->activity_type;
        $status = (!$order->status || $order->status == 9) ? 0 : $order->status;
        $postage_price = 0;
        return app('json')->success(compact('activity_type', 'total_refund_price','postage_price', 'product', 'status'));
    }

    public function compute(StoreOrderRepository $storeOrderRepository)
    {
        $refund = $this->request->param('refund',[]);
        $orderId = $this->request->param('order_id',0);
        $order = $storeOrderRepository->getSearch(['mer_id' => $this->request->merId()])->where('order_id',$orderId)->find();
        if (!$order) return app('json')->fail('订单状态有误');
        if (!$order->refund_status) return app('json')->fail('订单已过退款/退货期限');
        if ($order->status < 0) return app('json')->fail('订单已退款');
        if ($order->status == 10) return app('json')->fail('订单不支持退款');
        $totalRefundPrice = $this->repository->compute($order,$refund);
        return app('json')->success(compact('totalRefundPrice'));
    }

    /**
     * TODO 创建退款单，并执行退款操作
     * @param StoreOrderRepository $storeOrderRepository
     * @return \think\response\Json
     * @author Qinii
     * @day 2023/7/13
     */
    public function create(StoreOrderRepository $storeOrderRepository)
    {
        $data = $this->request->params(['refund_message','refund_price','mer_mark']);
        $refund = $this->request->param('refund',[]);
        $orderId = $this->request->param('order_id',02);
        $order = $storeOrderRepository->getSearch(['mer_id' => $this->request->merId()])->where('order_id',$orderId)->find();
        if (!$order) return app('json')->fail('订单状态有误');
        if (!$order->refund_status) return app('json')->fail('订单已过退款/退货期限');
        if ($order->status < 0) return app('json')->fail('订单已退款');
        if ($order->status == 10) return app('json')->fail('订单不支持退款');
        $data['refund_type'] = 1;
        $data['admin_id'] =  $this->request->adminId();
        $data['user_type'] =  $this->request->userType();
        $refund = $this->repository->merRefund($order,$refund,$data);
        return app('json')->success('退款成功',['refund_order_id' => $refund->refund_order_id]);
    }

    /**
     * @return mixed
     * @author Qinii
     * @day 2020-06-12
     */
    public function lst()
    {
        list($page,$limit) = $this->getPage();
        $where = $this->request->params(['refund_order_sn','status','refund_type','date','order_sn','id','delivery_id','user_type','username']);
        $where['mer_id'] = $this->request->merId();
        return app('json')->success($this->repository->getList($where,$page,$limit));
    }

    /**
     * @param $id
     * @return mixed
     * @author Qinii
     * @day 2020-06-12
     */
    public function detail($id)
    {
        if(!$this->repository->getExistsById($this->request->merId(),$id))
            return app('json')->fail('数据不存在');
        return app('json')->success($this->repository->getOne($id));
    }

    /**
     * @param $id
     * @return mixed
     * @author Qinii
     * @day 2020-06-12
     */
    public function switchStatus($id)
    {
        if(!$this->repository->getStatusExists($this->request->merId(),$id))
            return app('json')->fail('信息或状态错误');
        $status = ($this->request->param('status') == 1) ? 1 : -1;
        event('refund.status',compact('id','status'));
        if($status == 1){
            $data = $this->request->params(['mer_delivery_user','mer_delivery_address','phone']);
            if ($data['phone'] && isPhone($data['phone']))
                return app('json')->fail('请输入正确的手机号');
            $data['status'] = $status;
            $this->repository->agree($id,$data);
        }else{
            $fail_message = $this->request->param('fail_message','');
            if($status == -1 && empty($fail_message))
                return app('json')->fail('未通过必须填写');
            $data['status'] = $status;
            $data['fail_message'] = $fail_message;
            $this->repository->refuse($id,$data);
        }
        return app('json')->success('审核成功');
    }

    /**
     * TODO 收货后确定退款
     * @param $id
     * @return mixed
     * @author Qinii
     * @day 2020-06-12
     */
    public function refundPrice($id)
    {
        if(!$this->repository->getRefundPriceExists($this->request->merId(),$id))
            return app('json')->fail('信息或状态错误');
        $this->repository->adminRefund($id,0);
        return app('json')->success('退款成功');
    }

    /**
     * TODO
     * @param $id
     * @return mixed
     * @author Qinii
     * @day 2020-06-12
     */
    public function switchStatusForm($id)
    {
        if(!$this->repository->getStatusExists($this->request->merId(),$id))
            return app('json')->fail('信息或状态错误');
        return app('json')->success(formToData($this->repository->statusForm($id)));
    }

    /**
     * TODO
     * @param $id
     * @return mixed
     * @author Qinii
     * @day 2020-06-18
     */
    public function delete($id)
    {
        if(!$this->repository->getUserDelExists($this->request->merId(),$id))
            return app('json')->fail('信息或状态错误');
        $this->repository->update($id,['is_system_del' => 1]);
        return app('json')->success('删除成功');
    }

    /**
     * TODO
     * @param $id
     * @return mixed
     * @author Qinii
     * @day 2020-06-18
     */
    public function markForm($id)
    {
        if(!$this->repository->getExistsById($this->request->merId(),$id))
            return app('json')->fail('数据不存在');
        return app('json')->success(formToData($this->repository->markForm($id)));
    }

    /**
     * TODO
     * @param $id
     * @return mixed
     * @author Qinii
     * @day 2020-06-18
     */
    public function mark($id)
    {
        if(!$this->repository->getExistsById($this->request->merId(),$id))
            return app('json')->fail('数据不存在');
        $this->repository->update($id,['mer_mark' => $this->request->param('mer_mark','')]);

        return app('json')->success('备注成功');
    }

    public function log($id)
    {
        list($page,$limit) = $this->getPage();
        $where = $this->request->params(['date','user_type']);
        $where['id'] = $id;
        $where['type'] = StoreOrderStatusRepository::TYPE_REFUND;
        $data = app()->make(StoreOrderStatusRepository::class)->search($where,$page,$limit);
        return app('json')->success($data);
    }

    public function reList($id)
    {
        [$page,$limit] = $this->getPage();
        $make = app()->make(MerchantReconciliationRepository::class);
        if(!$make->getWhereCount(['mer_id' => $this->request->merId(),'reconciliation_id' => $id]))
            return app('json')->fail('数据不存在');
        $where = ['reconciliation_id' => $id,'type' => 1];
        return app('json')->success($this->repository->reconList($where,$page,$limit));
    }

    /**
     * TODO 快递查询
     * @param $id
     * @return mixed
     * @author Qinii
     * @day 2020-06-25
     */
    public function express($id)
    {
        return app('json')->success($this->repository->express($id));
    }

    public function createExcel()
    {
        $where = $this->request->params(['refund_order_sn','status','refund_type','date','order_sn','id']);
        $where['mer_id'] = $this->request->merId();
        [$page, $limit] = $this->getPage();
        $data = app()->make(ExcelService::class)->refundOrder($where, $page, $limit);
        return app('json')->success($data);
    }
}
