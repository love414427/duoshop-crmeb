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
 * @description 身份管理 -- 列表
 * @param {Object} param params {Object} 传值参数
 */
export function menuRoleApi(data) {
  return request.get(`system/role/lst`, data)
}

/**
 * @description 身份管理 -- 新增
 * @param {Object} param params {Object} 传值参数
 */
export function roleCreateApi() {
  return request.get(`system/role/create/form`)
}

/**
 * @description 身份管理 -- 编辑
 * @param {Object} param params {Object} 传值参数
 */
export function roleUpdateApi(id) {
  return request.get(`system/role/update/form/${id}`)
}

/**
 * @description 身份管理 -- 删除
 * @param {Object} param params {Object} 传值参数
 */
export function roleDeleteApi(id) {
  return request.delete(`system/role/delete/${id}`)
}

/**
 * @description 身份管理 -- 修改状态
 * @param {Object} param params {Object} 传值参数
 */
export function roleStatusApi(id, status) {
  return request.post(`system/role/status/${id}`, { status })
}
/**
 * @description 管理员 -- 列表
 * @param {Object} param params {Object} 传值参数
 */
export function adminListApi(data) {
  return request.get(`system/admin/lst`, data)
}

/**
 * @description 管理员 -- 新增
 * @param {Object} param params {Object} 传值参数
 */
export function adminCreateApi() {
  return request.get(`/system/admin/create/form`)
}

/**
 * @description 管理员 -- 编辑
 * @param {Object} param params {Object} 传值参数
 */
export function adminUpdateApi(id) {
  return request.get(`system/admin/update/form/${id}`)
}

/**
 * @description 管理员 -- 删除
 * @param {Object} param params {Object} 传值参数
 */
export function adminDeleteApi(id) {
  return request.delete(`system/admin/delete/${id}`)
}

/**
 * @description 管理员 -- 修改状态
 * @param {Object} param params {Object} 传值参数
 */
export function adminStatusApi(id, status) {
  return request.post(`system/admin/status/${id}`, { status })
}
/**
 * @description 管理员 -- 修改密码表单
 * @param {Object} param params {Object} 传值参数
 */
export function adminPasswordApi(id) {
  return request.get(`system/admin/password/form/${id}`)
}
/**
 * @description 操作日志 -- 列表
 * @param {Object} param params {Object} 传值参数
 */
export function adminLogApi(data) {
  return request.get(`system/admin/log`, data)
}
/**
 * @description 自提 -- 详情
 * @param {Object} param params {Object} 传值参数
 */
export function storeGetInfoApi() {
  return request.get(`take/info`)
}
/**
 * @description 自提 -- 提交
 * @param {Object} param params {Object} 传值参数
 */
export function storeUpdateApi(data) {
  return request.post(`take/update`, data)
}
/**
 * @description 上传资质图片
 * @param {Object} param params {Object} 传值参数
*/
export function uploadCertificate(data) {
  return request.post('upload/certificate', data)
}
/**
 * @description 保证金支付二维码
 * @param {Object} param params {Object} 传值参数
*/
export function marginCode() {
  return request.get('margin/code')
}
/**
 * @description 补缴保证金支付二维码
 * @param {Object} param params {Object} 传值参数
*/
export function marginMakeCode() {
  return request.get('margin/make_code')
}
/**
 * @description 保证金记录
 * @param {Object} param params {Object} 传值参数
*/
export function marginRecordLst(data) {
  return request.get('margin/lst', data)
}
/**
 * @description 申请退回保证金(只返回信息)
 * @param {Object} param params {Object} 传值参数
*/
export function marginRefund() {
  return request.post('financial/refund/margin')
}
/**
 * @description 申请退回保证金(申请退)
 * @param {Object} param params {Object} 传值参数
*/
export function marginRefundApply(data) {
  return request.post('financial/refund/margin_apply',data)
}
/**
 * @description 一号通 -- 用户信息
 * @param {Object} param params {Object} 传值参数
 */
export function serveInfoApi() {
  return request.get(`serve/info`)
}
/**
 * @description 一号通 -- 是否登录
 * @param {Object} param params {Object} 传值参数
 */
export function smsPriceApi(data) {
  return request.get(`serve/meal`, data)
}

/**
 * @description 一号通短信账户 -- 支付二维码
 */
export function payCodeApi(data) {
  return request.get('serve/code', data)
}

/**
 * @description 一号通短信账户 -- 列表
 */
export function serveRecordListApi(data) {
  return request.get('serve/record', data)
}

/**
 * @description 短信账户签名修改 -- 获取验证码
 */
export function captchaApi(phone) {
  return request.get(`serve/captcha/${phone}`)
}

/**
 * @description 一号通 -- 购买记录
 */
export function payRecordLst(data) {
  return request.get('serve/paylst', data)
}
/**
 * @description 电子面单配置 -- 快递公司列表
 */
export function getExpressLst() {
  return request.get('serve/expr/lst')
}
/**
 * @description 电子面单配置 -- 电子面单列表
 */
export function getdumpLst(data) {
  return request.get('expr/temps', data)
}
/**
 * @description 电子面单配置 -- 获取数据
 */
export function getdumpDataApi() {
  return request.get('serve/config')
}
/**
 * @description 电子面单配置 -- 提交数据
 */
export function updatedumpDataApi(data) {
  return request.post('serve/config', data)
}
/**
 * @description 打印机配置 -- 添加
 */
 export function printerAddApi() {
  return request.get('store/printer/create/form')
}
/**
 * @description 打印机配置 -- 列表
 */
 export function printerLstApi(data) {
  return request.get('store/printer/lst', data)
}
/**
 * @description 打印机 -- 是否开启
 */
 export function printerStatusApi(id, status) {
  return request.post(`store/printer/status/${id}`, status)
}
/**
 * @description 打印机配置 -- 编辑
 */
 export function printerUpdateApi(id) {
  return request.get(`store/printer/update/${id}/form`)
}
/**
 * @description 打印机配置 -- 删除
 */
 export function printerDeleteApi(id) {
  return request.delete(`store/printer/delete/${id}`)
}