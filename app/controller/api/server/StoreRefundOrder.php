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
namespace app\controller\api\server;

use app\common\repositories\store\order\StoreOrderProductRepository;
use app\common\repositories\store\order\StoreOrderRepository;
use app\common\repositories\store\order\StoreRefundOrderRepository;
use crmeb\basic\BaseController;
use think\App;

class StoreRefundOrder extends BaseController
{
    protected $merId;
    protected $repository;
    protected $service_id;

    public function __construct(App $app, StoreRefundOrderRepository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
        $this->merId = $this->request->route('merId');
        $this->service_id = $this->request->serviceInfo()->service_id;
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
        $order = $storeOrderRepository->getSearch(['mer_id' => $this->merId])->where('order_id',$id)->find();
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
        $orderId = $this->request->param('order_id',02);
        $order = $storeOrderRepository->getSearch(['mer_id' => $this->merId])->where('order_id',$orderId)->find();
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
        $order = $storeOrderRepository->getSearch(['mer_id' =>  $this->merId])->where('order_id',$orderId)->find();
        if (!$order) return app('json')->fail('订单状态有误');
        if (!$order->refund_status) return app('json')->fail('订单已过退款/退货期限');
        if ($order->status < 0) return app('json')->fail('订单已退款');
        if ($order->status == 10) return app('json')->fail('订单不支持退款');
        $data['refund_type'] = 1;
        $data['admin_id'] = $this->service_id;
        $data['user_type'] = 4;
        $refund  = $this->repository->merRefund($order,$refund,$data);
        return app('json')->success('退款成功',['refund_order_id' => $refund->refund_order_id]);
    }


    public function lst()
    {
        [$page, $limit] = $this->getPage();
        $where = $this->request->params(['order_type','delivery_id']);
        $where['mer_id'] = $this->merId;
        return app('json')->success($this->repository->getListByService($where,$page,$limit));
    }

    public function detail($id)
    {
        $data = $this->repository->getWhere([$this->repository->getPk() => $id,'mer_id' => $this->merId],'*',['order','refundProduct.product','user']);
        return app('json')->success($data);
    }

    public function getRefundPrice($id)
    {
        return app('json')->success($this->repository->serverRefundDetail($id,$this->merId));
    }
    public function express($id)
    {
        $data['refund'] = $this->repository->getWhere(['refund_order_id' => $id,'mer_id'=> $this->merId,'status' =>2],'*', ['refundProduct.product']);
        if(!$data['refund'])
            return app('json')->fail('订单信息或状态错误');

        $data['express'] = $this->repository->express($id);
        return app('json')->success($data);
    }

    public function switchStatus($id)
    {
        if(!$this->repository->getStatusExists($this->merId,$id))
            return app('json')->fail('信息或状态错误');
        $status = ($this->request->param('status') == 1) ? 1 : -1;
        event('refund.status',compact('id','status'));
        if($status == 1){
            $data = $this->request->params(['mer_delivery_user','mer_delivery_address','phone']);
            if ($data['phone'] && isPhone($data['phone']))
                return app('json')->fail('请输入正确的手机号');
            $data['status'] = $status;
            $this->repository->agree($id,$data,$this->service_id);
        }else{
            $fail_message = $this->request->param('fail_message','');
            if($status == -1 && empty($fail_message))
                return app('json')->fail('未通过必须填写');
            $data['status'] = $status;
            $data['fail_message'] = $fail_message;
            $this->repository->refuse($id,$data, $this->service_id);
        }
        return app('json')->success('审核成功');
    }

    public function refundPrice($id)
    {
        if(!$this->repository->getRefundPriceExists($this->merId,$id))
            return app('json')->fail('信息或状态错误');
        $this->repository->adminRefund($id,$this->service_id);
        return app('json')->success('退款成功');
    }

    public function mark($id){
        if(!$this->repository->getExistsById($this->merId,$id))
            return app('json')->fail('数据不存在');
        $this->repository->update($id,['mer_mark' => $this->request->param('mer_mark','')]);

        return app('json')->success('备注成功');
    }

}
