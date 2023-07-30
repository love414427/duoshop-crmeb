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
 * @description 商户权限管理 -- 列表
 */
export function merchantMenuListApi(data) {
  return request.get('merchant/menu/lst', data)
}
/**
 * @description 商户权限管理 -- 新增表单
 */
export function merchantMenuCreateApi() {
  return request.get('merchant/menu/create/form')
}
/**
 * @description 商户权限管理 -- 编辑表单
 */
export function merchantMenuUpdateApi(id) {
  return request.get(`merchant/menu/update/form/${id}`)
}
/**
 * @description 商户权限管理 -- 删除
 */
export function merchantMenuDeleteApi(id) {
  return request.delete(`merchant/menu/delete/${id}`)
}

/**
 * @description 商户列表 -- 列表
 */
export function merchantListApi(data) {
  return request.get('system/merchant/lst', data)
}
/**
 * @description 商户列表 -- 新增表单
 */
export function merchantCreateApi() {
  return request.get('system/merchant/create/form')
}
/**
 * @description 商户列表 -- 编辑表单
 */
export function merchantUpdateApi(id) {
  return request.get(`system/merchant/update/form/${id}`)
}
/**
 * @description 商户列表 -- 删除
 */
export function merchantDeleteApi(id) {
  return request.delete(`system/merchant/delete/${id}`)
}
/**
 * @description 商户列表 -- 删除(表单)
 */
export function merchantDeleteForm(id) {
  return request.get(`system/merchant/delete/${id}/form`)
}
/**
 * @description 商户列表 -- 修改开启状态
 */
export function merchantStatuseApi(id, status) {
  return request.post(`system/merchant/status/${id}`, { status })
}
/**
 * @description 商户列表 -- 修改密码
 */
export function merchantPasswordApi(id) {
  return request.get(`system/merchant/password/form/${id}`)
}
/**
 * @description 商户分类 -- 列表
 */
export function categoryListApi(data) {
  return request.get('system/merchant/category/lst', data)
}
/**
 * @description 商户分类 -- 新增表单
 */
export function categoryCreateApi() {
  return request.get('system/merchant/category/form')
}
/**
 * @description 商户分类 -- 编辑表单
 */
export function categoryUpdateApi(id) {
  return request.get(`system/merchant/category/form/${id}`)
}
/**
 * @description 商户分类 -- 删除
 */
export function categoryDeleteApi(id) {
  return request.delete(`system/merchant/category/${id}`)
}

/**
 * @description 商户对账 -- 订单列表
 */
export function merOrderListApi(id, data) {
  return request.get(`merchant/order/lst/${id}`, data)
}
/**
 * @description 商户对账 -- 订单备注
 */
export function orderMarkApi(id) {
  return request.get(`merchant/order/mark/${id}/form`)
}
/**
 * @description 商户对账 -- 退款订单列表
 */
export function refundOrderListApi(id, data) {
  return request.get(`merchant/order/refund/lst/${id}`, data)
}
/**
 * @description 退款订单 -- 订单备注
 */
export function refundMarkApi(id) {
  return request.get(`merchant/order/refund/mark/${id}/form`)
}
/**
 * @description 对账订单 -- 发起对账单
 */
export function reconciliationApi(id, data) {
  return request.post(`merchant/order/reconciliation/create/${id}`, data)
}
/**
 * @description 对账订单 -- 发起对账单
 */
export function merchantLoginApi(mer_id) {
  return request.post(`system/merchant/login/${mer_id}`)
}
/**
 * @description 申请管理 -- 列表
 */
export function intentionLstApi(data) {
  return request.get('merchant/intention/lst', data)
}
/**
 * @description 申请管理 -- 备注
 */
export function auditApi(mer_id) {
  return request.get(`merchant/intention/mark/${mer_id}/form`)
}
/**
 * @description 申请管理 -- 删除
 */
export function intentionDelte(mer_id) {
  return request.delete(`merchant/intention/delete/${mer_id}`)
}
/**
 * @description 申请管理 -- 修改状态
 */
export function intentionStatusApi(mer_id) {
  return request.get(`merchant/intention/status/${mer_id}/form`)
}
/**
 * @description 申请管理 -- 编辑复制次数
 */
export function changeCopyApi(mer_id) {
  return request.get(`system/merchant/changecopy/${mer_id}/form`)
}
/**
 * @description 申请管理 -- 入驻协议详情
 */
export function intentionAgreeInfo() {
  return request.get(`agreement/sys_intention_agree`)
}
/**
 * @description 申请管理 -- 入驻协议保存
 */
export function intentionAgreeUpdate(data) {
  return request.post(`agreement/sys_intention_agree`,data)
}
/**
 * @description 店铺类型 -- 获取说明
 */
 export function getStoreTypeApi(key) {
    return request.get(`agreement/${key}`)
}
/**
 * @description 店铺类型 -- 编辑说明
 */
export function updateStoreTypeApi(type, data) {
    return request.post(`agreement/${type}`, data)
}
/**
 * @description 商户列表 -- 开启关闭
 */
export function merchantIsCloseApi(id, status) {
  return request.post(`system/merchant/close/${id}`, { status })
}
/**
 * @description 商户列表 -- 开启商户数
 */
export function merchantCountApi() {
  return request.get(`system/merchant/count`)
}

/**
 * @description 店铺类型 -- 创建店铺类型
 */
export function storeTypeCreateApi(data) {
    return request.post(`merchant/type/create`, data)
}
/**
 * @description 店铺类型 -- 列表
 */
 export function storeTypeLstApi(data) {
  return request.get(`merchant/type/lst`, data)
}
/**
 * @description 店铺类型 -- 店铺权限
 */
 export function storeJurisdictionApi() {
  return request.get(`merchant/mer_auth`)
}
/**
 * @description 店铺类型 -- 创建店铺类型
 */
export function storeTypeUpdateApi(id, data) {
    return request.post(`merchant/type/update/${id}`, data)
}
/**
 * @description 店铺类型列表 -- 删除
 */
export function storeTypeDeleteApi(id) {
    return request.delete(`merchant/type/delete/${id}`)
}
/**
 * @description 店铺类型列表 -- 备注
 */
export function merchantTypeMarkForm(id) {
    return request.get(`merchant/type/mark/${id}`)
}
/**
 * @description 店铺类型列表 -- 详情
 */
 export function merchantTypeMarkApi(id) {
  return request.get(`/merchant/type/detail/${id}`)
}
/**
 * @description 店铺类型 -- 获取选择项
 */
export function getstoreTypeApi() {
    return request.get(`merchant/type/options`)
}
/**
 * @description 商户分类 -- 获取选择项
 */
export function getMerCateApi() {
    return request.get(`system/merchant/category/options`)
}
/**
 * @description 服务申请 -- 列表
 */
export function getApplymentLst(data) {
    return request.get(`system/applyments/lst`, data)
}
/**
 * @description 服务申请 -- 审核
 */
export function applymentStatusApi(id, data) {
    return request.post(`system/applyments/status/${id}`, data)
}
/**
 * @description 服务申请 -- 详情
 */
export function applymentDetailApi(id) {
    return request.get(`system/applyments/detail/${id}`)
}
/**
 * @description 商户 -- 分账列表
 */
 export function applymentLstApi(data) {
    return request.get(`profitsharing/lst`, data)
}
/**
 * @description 商户 -- 分账（立即分账）
 */
 export function splitAccountApi(id) {
    return request.post(`profitsharing/again/${id}`)
}
/**
 * @description 分账申请 -- 备注
 */
export function splitAccountMark(id) {
    return request.get(`system/applyments/mark/${id}/form`)
}
/**
 * @description 分账管理 -- 导出
 */
 export function ledgerManageExportApi(data) {
  return request.get(`profitsharing/export`, data)
}
/**
 * @description 缴存保证金 -- 列表
 */
 export function marginLstApi(data) {
  return request.get(`margin/lst`, data)
}
/**
 * @description 待缴保证金 -- 列表
 */
export function marginDepositLstApi(data) {
  return request.get(`margin/make_up`, data)
}
/**
 * @description 待缴保证金 -- 线下付款
 */
export function marginPaymentApi(id) {
  return request.get(`margin/local/${id}/form`)
}
/**
 * @description 退回保证金 -- 列表
 */
 export function marginRefundLstApi(data) {
  return request.get(`margin/refund/lst`, data)
}
/**
 * @description 退回保证金 -- 审核
 */
 export function marginRefundStatus(id) {
  return request.get(`margin/refund/status/${id}/form`)
}
/**
 * @description 退回保证金 -- 备注
 */
 export function marginRefundMark(id) {
  return request.get(`margin/refund/mark/${id}/form`)
}
/**
 * @description 退回保证金 -- 退回信息
 */
 export function marginRefundInfo(id) {
  return request.get(`margin/refund/show/${id}`)
}
/**
 * @description 退回保证金 -- 扣费记录
 */
 export function marginDeductionRecord(id, data) {
  return request.get(`margin/list/${id}`, data)
}
/**
 * @description 退回保证金 -- 保证金扣费
 */
 export function marginDeductionForm(id) {
  return request.get(`margin/set/${id}/form`)
}
