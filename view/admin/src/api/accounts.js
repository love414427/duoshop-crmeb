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
 * @description 提现 -- 列表
 */
export function extractListApi(data) {
  return request.get('user/extract/lst', data)
}

/**
 * @description 提现 -- 审核
 */
export function extractStatusApi(id, data) {
  return request.post(`user/extract/status/${id}`, data)
}

/**
 * @description 充值记录 -- 列表
 */
export function rechargeListApi(data) {
  return request.get(`user/recharge/list`, data)
}

/**
 * @description 充值记录 -- 统计
 */
export function rechargeTotalApi() {
  return request.get(`user/recharge/total`)
}

/**
 * @description 资金记录 -- 列表
 */
export function billListApi(data) {
  return request.get(`bill/list`, data)
}

/**
 * @description 资金记录 -- 记录类型
 */
export function billTypeApi() {
  return request.get(`bill/type`)
}

/**
 * @description 财务对账 -- 对账单列表
 */
export function reconciliationListApi(data) {
  return request.get(`merchant/order/reconciliation/lst`, data)
}

/**
 * @description 财务对账 -- 确认打款
 */
export function reconciliationStatusApi(id, data) {
  return request.post(`merchant/order/reconciliation/status/${id}`, data)
}

/**
 * @description 财务对账 -- 查看订单
 */
export function reconciliationOrderApi(id, data) {
  return request.get(`merchant/order/reconciliation/${id}/order`, data)
}

/**
 * @description 财务对账 -- 退款订单
 */
export function reconciliationRefundApi(id, data) {
  return request.get(`merchant/order/reconciliation/${id}/refund`, data)
}

/**
 * @description 财务对账 -- 备注
 */
export function reconciliationMarkApi(id) {
  return request.get(`merchant/order/reconciliation/mark/${id}/form`)
}
/**
 * @description 资金流水 -- 列表
 */
export function capitalFlowLstApi(data) {
  return request.get(`financial_record/list`, data)
}
/**
 * @description 资金流水 -- 导出
 */
export function capitalFlowExportApi(data) {
  return request.get(`financial_record/export`, data)
}
/**
 * @description 转账记录 -- 导出
 */
 export function transferRecordsExportApi(data) {
  return request.get(`financial/export`, data)
}
/**
 * @description 资金记录 -- 导出
 */
 export function fundingRecordsExportApi(data) {
  return request.get(`bill/export`, data)
}
/**
 * @description 提现管理 -- 导出
 */
 export function extractManageExportApi(data) {
  return request.get(`user/extract/export`, data)
}
/**
 * @description 获取版本号
 */
export function getVersion() {
    return request.get(`version`)
}
/**
 * @description 转账设置
 */
export function transferSettingApi(key) {
    return request.get(`config/${key}`)
}
/**
 * @description 转账记录
 */
export function transferRecordApi(data) {
    return request.get(`financial/lst`, data)
}
/**
 * @description 转账记录 -- 头部数据
 */
export function transferHeaderDataApi() {
    return request.get(`financial/title`)
}
/**
 * @description 转账信息
 */
export function transferDetailApi(id) {
    return request.get(`financial/detail/${id}`)
}
/**
 * @description 申请转账 -- 审核
 */
export function transferReviewApi(id, data) {
    return request.post(`financial/status/${id}`, data)
}
/**
 * @description 申请转账 -- 备注
 */
export function transferMarkApi(id) {
    return request.get(`financial/mark/${id}/form`)
}
/**
 * @description 申请转账 -- 转账
 */
export function transferEditApi(id, data) {
    return request.post(`financial/update/${id}`, data)
}
/**
 * @description 财务账单 -- 列表
 */
export function financialLstApi(data) {
    return request.get(`financial_record/lst`, data)
}
/**
 * @description 财务账单 -- 详情
 */
export function financialDetailApi(type, data) {
    return request.get(`financial_record/detail/${type}`, data)
}
/**
 * @description 财务账单 -- 头部数据
 */
export function finaHeaderDataApi(data) {
    return request.get(`financial_record/title`, data)
}
/**
 * @description 财务账单 -- 下载账单
 */
export function downloadFinancialApi(type, data) {
    return request.get(`financial_record/detail_export/${type}`, data)
}
/**
 * @description 资金流水 -- 统计数据
 */
export function getStatisticsApi(data) {
    return request.get(`financial_record/count`,data)
}
/**
 * @description 发票 -- 获取发票说明
 */
export function getReceiptApi(key) {
    return request.get(`agreement/${key}`)
}
/**
 * @description 发票 -- 编辑发票说明
 */
export function updateReceiptApi(type, data) {
    return request.post(`agreement/${type}`, data)
}
/**
 * @description 发票 -- 列表
 */
export function invoiceListApi(data) {
    return request.get(`receipt/lst`, data)
}
/**
 * @description 发票 -- 详情
 */
 export function invoiceDetailApi(id) {
    return request.get(`receipt/detail/${id}`)
}
/**
 * @description 分账单 -- 获取配置
 */
 export function getSettingApi() {
    return request.get(`profitsharing/config`)
}
/**
 * @description 分账单 -- 修改配置
 */
 export function updateSettingApi(data) {
    return request.post(`profitsharing/config`, data)
}
