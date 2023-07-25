import {
	SUBSCRIBE_MESSAGE
} from '../config/cache.js';

export function auth() {
	let tmplIds = {};
	let messageTmplIds = uni.getStorageSync(SUBSCRIBE_MESSAGE);
	console.log(messageTmplIds,'messageTmplIds')
	tmplIds = messageTmplIds ? messageTmplIds : {};
	return tmplIds;
}
// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
/**
 * 支付成功后订阅消息id
 * 订阅  订单支付成功 订单发货提醒(快递)  订单发货提醒(送货) 
 */
export function openPaySubscribe() {
	let tmplIds = auth();
	return subscribe([
		tmplIds.DELIVER_GOODS_CODE,
		tmplIds.ORDER_DELIVER_SUCCESS,
		tmplIds.ORDER_PAY_SUCCESS,
	]); 
}
/**
 * 到货通知id
 * 订阅  到货通知
 */
export function arrivalSubscribe() {
	let tmplIds = auth();
	return subscribe([
		tmplIds.PRODUCT_INCREASE
	]); 
}
/**
 * 订单相关订阅消息
 * 送货 发货
 */
export function openOrderSubscribe() {
	let tmplIds = auth();
	return subscribe([
		tmplIds.ORDER_DELIVER_SUCCESS,
		tmplIds.DELIVER_GOODS_CODE,
	]);
}

/**
 * 提现消息订阅
 * 成功 和 失败 消息
 */
export function openExtrctSubscribe() {
	let tmplIds = auth();
	return subscribe([
		tmplIds.EXTRACT_NOTICE
	]);
}

/**
 * 订单退款
 */
export function openOrderRefundSubscribe() {
	let tmplIds = auth();
	return subscribe([tmplIds.REFUND_CONFORM_CODE]);
}

/**
 * 充值成功
 */
export function openRechargeSubscribe() {
	let tmplIds = auth();
	return subscribe([tmplIds.USER_BALANCE_CHANGE]);
}

/**
 * 提现
 */
export function openEextractSubscribe() {
	let tmplIds = auth();
	return subscribe([tmplIds.EXTRACT_NOTICE]);
}

/**
 * 调起订阅界面
 * array tmplIds 模板id
 */
export function subscribe(tmplIds) {
	 let wecaht = wx;
	return new Promise((reslove, reject) => {
		uni.requestSubscribeMessage({
			tmplIds: tmplIds,
			success(res) {
				console.log(res,'requestSubscribeMessage')
				return reslove(res);
			},
			fail(res) {
				console.log(res,'fail')
				return reslove(res);
			},
			complete(res){
				console.log(res,'complete')
			}
		})
	});
}
