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
 * 积分商城--banner和金刚区
 */
export function getIntegralHome() {
	return request.get("points/home",{},{noAuth: true});
}
/**
 * 积分商城--积分兑换区间
 */
export function getIntegralScope() {
	return request.get("points/scope",{},{noAuth: true});
}
/**
 * 积分商城--商品列表
 */
export function getIntegralGoodsList(data) {
	return request.get("points/lst",data,{noAuth: true});
}
/**
 * 积分商城--商品列表
 */
export function getIntegralProductDetail(id) {
	return request.get(`points/detail/${id}`,{},{noAuth: true});
}
/**
 * 积分商城--生成订单
 */
export function integralOrderConfirm(data) {
	return request.post(`order/v3/check`,data,{noAuth: true});
}
/**
 * 积分商城--下单
 */
export function integralOrderCreate(data) {
	return request.post(`order/v3/create`,data,{noAuth: true});
}
/**
 * 积分商城--订单列表
 */
export function integralOrderList(data) {
	return request.get(`points/order/lst`,data,{noAuth: true});
}
/**
 * 积分商城--订单详情
 */
export function integralOrderDetail(id) {
	return request.get(`points/order/detail/${id}`,{},{noAuth: true});
}
/**
 * 积分商城--订单详情
 */
export function integralOrderTake(id) {
	return request.post(`points/order/take/${id}`,{},{noAuth: true});
}
/**
 * 积分商城--删除
 */
export function integralOrderDelete(id) {
	return request.post(`points/order/deleate/${id}`,{},{noAuth: true});
}