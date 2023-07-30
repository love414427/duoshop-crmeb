// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import request from './request'

/**
 * 获取左侧客服聊天用户列表
 */
export function record(params) {
  return request.get('/user/lst', params)
}

export function history(uid, params) {
  return request.get('/history/' + uid, params)
}

export function merchantInfo() {
  return request.get('/info')
}

export function adminInfo() {
  return request.get('/user')
}

export function changeMark(uid, mark) {
  return request.post('/user/mark/' + uid, { mark })
}
/**
 * @description 验证码
 */
export function captchaApi() {
  return request.get(`captcha`)
}
/**
 * @description 登录
 */
export function login(data) {
  return request.post(`login`, data)
}
/**
 * @description 扫码登录
 */
export function scanLogin() {
  return request.post(`login/scan`)
}
/**
 * @description 扫码登录检查
 */
export function scanLoginCheck(key) {
  return request.post(`login/scan/check`, { key })
}

/**
 * @description 退出登录
 */
export function logout() {
  return request.post(`logout`)
}

/**
 * @description 订单详情
 */
export function orderInfo(id) {
  return request.get(`order/${id}`)
}
/**
 * @description 退款单详情
 */
 export function refundOrderInfo(id) {
  return request.get(`refund/${id}`)
}
/**
 * @description 订单物流
 */
export function getExpress(id) {
  return request.get(`order_express/${id}`)
}
/**
 * @description 退款单物流
 */
 export function refundorderExpressApi(id) {
  return request.get(`refund_express/${id}`)
} 
/**
 * @description 退款单记录
 */
 export function refundorderLogApi(id, data) {
  return request.get(`order_status/${id}`, data)
}
/**
 * @description 退款单记录
 */
 export function productDetails(id) {
  return request.get(`product/${id}`)
}

/**
 * @description 退出登录
 */
export function config() {
  return request.get(`config`)
}

/**
 * 版权信息
 * @returns 
 */
export function version() {
  return request.get(`../api/version`)
}
/**
 * 客服聊天--撤回消息
 * @param object data
 * 
 */
 export function chatReverstApi(id) {
	return request.post(`recall/${id}`)
}

