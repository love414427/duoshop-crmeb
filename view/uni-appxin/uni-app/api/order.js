// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import request from "@/utils/request.js";

/**
 * 获取购物车列表
 * @param numType boolean true 购物车数量,false=购物车产品数量
 */
export function getCartCounts() {
  return request.get("user/cart/count");
}
/**
 * 获取购物车列表
 * 
 */
export function getCartList() {
  return request.get("user/cart/lst");
}

/**
 * 修改购物车数量
 * @param int cartId  购物车id
 * @param int number 修改数量
 */
export function changeCartNum(cartId, data) {
  return request.post("user/cart/change/"+cartId,data);
}
/**
 * 清除购物车
 * @param object ids
*/
export function cartDel(data){
  return request.post('user/cart/delete', data);
}
/**
 * 订单列表
 * @param object data
*/
export function getOrderList(data){
  return request.get('order/list',data);
}

/**
 * 订单产品信息
 * @param string unique 
*/
export function orderProduct(orderId){
  return request.get('reply/product/'+orderId);
}

/**
 * 订单评价
 * @param object data
 * 
*/
export function orderComment(id,data){
  return request.post('reply/'+id,data);
}

/**
 * 订单支付
 * @param object data
*/
export function orderPay(id,data){
  return request.post('order/pay/'+id,data);
}

/**
 * 积分商品订单支付
 * @param object data
*/
export function integralOrderPay(id,data){
  return request.post('order/points/pay/'+id,data);
}
/**
 * 订单统计数据
*/
export function orderData(){
  return request.get('order/number')
}

/**
 * 订单取消
 * @param string id
 * 
*/
// export function orderCancel(id){
//   return request.post('order/cancel',{id:id});
// }

/**
 * 未支付订单取消
 * @param string id
 * 
*/
export function unOrderCancel(id){
  return request.post('order/cancel/'+id);
}

/**
 * 删除已完成订单
 * @param string uni
 * 
*/
export function orderDel(id){
  return request.post('order/del/'+id);
}

/**
 * 订单详情
 * @param string uni 
*/
export function getOrderDetail(uni){
  return request.get('order/detail/'+uni);
}

/**
 * 订单详情
 * @param string uni 
*/
export function groupOrderDetail(uni){
  return request.get('order/group_order_detail/'+uni);
}

// 支付状态订单
export function getPayOrder(uni){
  return request.get('order/status/'+uni);
}

/**
 * 再次下单
 * @param string uni
 * 
*/
export function orderAgain(data){
  return request.post('user/cart/again',data);
}

/**
 * 订单收货
 * @param string uni
 * 
*/
export function orderTake(uni){
  return request.post('order/take/'+uni);
}

/**
 * 订单查询物流信息
 * @returns {*}
 */
export function express(id) {
  return request.post("order/express/" + id);
}
/**
 * 退款单查询物流信息
 * @returns {*}
 */
export function refundOrderExpress(merId,id) {
  return request.get(`server/${merId}/refund/express/${id}`);
}
/**
 * 获取退款理由
 * 
*/
export function ordeRefundReason(){
  return request.get('order/refund/reason');
}

/**
 * 订单退款审核
 * @param object data
*/
export function orderRefundVerify(data){
  return request.post('order/refund/verify',data);
}

/**
 * 订单确认获取订单详细信息
 * @param string cartId
*/
export function orderConfirm(data){
  return request.post('order/check', data);
}
/**
 * 订单确认获取订单详细信息
 * @param string cartId
*/
export function getOrderConfirm(data){
  return request.post('v2/order/check', data);
}
/**
 * 获取当前金额能使用的优惠卷
 * @param string price
 * 
*/
export function getCouponsOrderPrice(price, data){
  return request.get('coupons/order/' + price, data)
}



/**
 * 计算订单金额
 * @param key
 * @param data
 * @returns {*}
 */
export function postOrderComputed(key, data) {
  return request.post("/order/computed/" + key, data);
}

// 生成订单
export function orderCreate(data) {
	return request.post("order/create",data,{ noAuth : true });
}
// 新的生成订单
export function createOrder(data) {
	return request.post("v2/order/create",data,{ noAuth : true });
}
// 未支付订单
export function groupOrderList(data) {
	return request.get("order/group_order_list",data,{ noAuth : true });
}

// 批量退款列表
export function refundBatch(id) {
	return request.get("refund/batch_product/"+id,{ noAuth : true });
}

// 退款商品
export function refundProduct(id,data) {
	return request.get("refund/product/"+id,data,{ noAuth : true });
}

// 申请退款
export function refundApply(id,data) {
	return request.post("refund/apply/"+id,data,{ noAuth : true });
}

// 退款理由
export function refundMessage() {
	return request.get("common/refund_message",{ noAuth : true });
}

// 退款列表
export function refundList(data) {
	return request.get("refund/list",data,{ noAuth : true });
}

// 退款详情
export function refundDetail(id) {
	return request.get("refund/detail/"+id,{ noAuth : true });
}

// 物流列表
export function expressList() {
	return request.get("common/express");
}

// 退回商品提交
export function refundBackGoods(id,data) {
	return request.post("refund/back_goods/"+id,data,{ noAuth : true });
}

// 退款记录删除
export function refundDel(id) {
	return request.post("refund/del/"+id,{ noAuth : true });
}

// 退款记录删除
export function refundExpress(id) {
	return request.get("refund/express/"+id,{ noAuth : true });
}

// 核销二维码
export function verifyCode(id) {
	return request.get("order/verify_code/"+id);
}
/**
 * 预售尾款支付
 * @param object data
*/
export function presellOrderPay(id,data){
  return request.post('presell/pay/'+id,data);
}

/**
 * 发票订单
 * @param object data
*/
export function receiptOrder(data){
  return request.get('user/receipt/order',data);
}
/**
 * 发票订单
 * @param object data
*/
export function getReceiptOrder(id){
  return request.get('user/receipt/order/'+id);
}
/**
 * 发票订单
 * @param object data
*/
export function getCallBackUrlApi(key){
  return request.get('common/pay_key/'+key, {},{ noAuth : true});
}
/**
 * 发票订单
 * @param object data
*/
export function develiveryDetail(id){
  return request.get(`order/delivery/${id}`);
}
/**
 * 订单申请开票
 * @param object data
*/
export function applyInvoiceApi(id, data){
  return request.post(`order/receipt/${id}`, data);
}
/**
 * 退款单取消申请
 * @param object data
*/
export function refundCancelApi(id){
  return request.post(`refund/cancel/${id}`);
}