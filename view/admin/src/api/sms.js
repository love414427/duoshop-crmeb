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
 * @description 短信账户 -- 列表
 */
export function smsLstApi(data) {
  return request.get('sms/record', data)
}
/**
 * @description 短信账户 -- 登录
 */
export function configApi(data) {
  return request.post('sms/config', data)
}
/**
 * @description 短信账户 -- 修改密码
 */
export function changePsdApi(data) {
  return request.post('sms/change_password', data)
}
/**
 * @description 短信账户 -- 修改签名
 */
export function changeSignApi(data) {
  return request.post('sms/change_sign', data)
}
/**
 * @description 短信账户 -- 获取验证码
 */
export function captchaApi(data) {
  return request.post('serve/captcha', data)
}
/**
 * @description 短信账户 -- 注册
 */
export function registerApi(data) {
  return request.post('serve/register', data)
}
/**
 * @description 短信账户 -- 是否登录
 */
export function isLoginApi() {
  return request.get('serve/user/is_login')
}
/**
 * @description 短信账户 -- 退出登录
 */
export function logoutApi() {
  return request.get('sms/logout')
}
/**
 * @description 短信账户 -- 剩余条数
 */
export function smsNumberApi() {
  return request.get('sms/number')
}
/**
 * @description 短信模板 -- 列表
 */
export function smsTempLstApi(data) {
  return request.get('serve/sms/temps', data)
}
/**
 * @description 申请模板 -- 列表
 */
 export function applyTempLstApi(data) {
  return request.get('serve/sms/apply_record', data)
}
/**
 * @description 短信购买 -- 支付套餐
 */
export function smsPriceApi() {
  return request.get('sms/price')
}
/**
 * @description 短信购买 -- 支付码
 */
export function payCodeApi(data) {
  return request.post('sms/pay_code', data)
}
/**
 * @description 短信模板 -- 添加表单
 */
export function tempCreateApi(data) {
  return request.post('serve/sms/apply',data)
}
