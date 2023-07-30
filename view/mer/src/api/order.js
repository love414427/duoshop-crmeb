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
 * @description 订单 -- 列表
 */
export function orderListApi(data) {
  return request.get('store/order/lst', data)
}

/**
 * @description 订单 -- 表头
 */
export function chartApi() {
  return request.get('store/order/chart')
}
/**
 * @description 订单 -- 卡片
 */
export function cardListApi(data) {
  return request.get('store/order/title', data)
}
/**
 * @description 订单 -- 编辑
 */
export function orderUpdateApi(id, data) {
  return request.post(`store/order/update/${id}`, data)
}
/**
 * @description 订单 -- 发货
 */
export function orderDeliveryApi(id, data) {
  return request.post(`store/order/delivery/${id}`, data)
}
/**
 * @description 订单 -- 详情
 */
export function orderDetailApi(id) {
  return request.get(`store/order/detail/${id}`)
}
/**
 * @description 订单 -- 子订单
 */
export function getChildrenOrderApi(id) {
  return request.get(`store/order/children/${id}`)
}
/**
 * @description 订单 -- 记录
 */
export function orderLogApi(id, data) {
  return request.get(`store/order/log/${id}`, data)
}
/**
 * @description 订单 -- 备注from
 */
export function orderRemarkApi(id) {
  return request.get(`store/order/remark/${id}/form`)
}
/**
 * @description 订单 -- 删除
 */
export function orderDeleteApi(id) {
  return request.post(`store/order/delete/${id}`)
}
/**
 * @description 订单 -- 打印
 */
export function orderPrintApi(id) {
  return request.get(`store/order/printer/${id}`)
}
/**
 * @description 退款订单 -- 列表
 */
export function refundorderListApi(data) {
  return request.get('store/refundorder/lst', data)
}
/**
 * @description 退款订单 -- 详情
 */
export function refundorderDetailApi(id) {
  return request.get(`store/refundorder/detail/${id}`)
}
/**
 * @description 退款订单 -- 审核from
 */
export function refundorderStatusApi(id) {
  return request.get(`store/refundorder/status/${id}/form`)
}
/**
 * @description 退款订单 -- 备注from
 */
export function refundorderMarkApi(id) {
  return request.get(`store/refundorder/mark/${id}/form`)
}
/**
 * @description 退款订单 -- 记录from
 */
export function refundorderLogApi(id) {
  return request.get(`store/refundorder/log/${id}`)
}
/**
 * @description 退款订单 -- 删除
 */
export function refundorderDeleteApi(id) {
  return request.get(`store/refundorder/delete/${id}`)
}
/**
 * @description 退款订单 -- 确认收货
 */
export function confirmReceiptApi(id) {
  return request.post(`store/refundorder/refund/${id}`)
}
/**
 * @description 获取物流信息
 */
export function getExpress(id) {
  return request.get(`store/order/express/${id}`)
}
/**
 * @description 退款单获取物流信息
 */
export function refundorderExpressApi(id) {
  return request.get(`store/refundorder/express/${id}`)
}
/**
 * @description 导出订单
 */
export function exportOrderApi(data) {
  return request.get(`store/order/excel`, data)
}
/**
 * @description 生成发货单
 */
export function exportInvoiceApi(data) {
  return request.get(`store/order/delivery_export`, data)
}
/**
 * @description 导出文件列表
 */
export function exportFileLstApi(data) {
  return request.get(`excel/lst`, data)
}
/**
 * @description 下载
 */
export function downloadFileApi(id) {
  return request.get(`excel/download/${id}`)
}
/**
 * @description 订单核销详情
 */
export function orderCancellationApi(code) {
  return request.get(`store/order/verify/${code}`)
}
/**
 * @description 订单核销
 */
 export function goCancellationApi(id, data) {
  return request.post(`store/order/verify/${id}`, data)
}
/**
 * @description 订单 -- 头部
 */
export function orderHeadListApi() {
  return request.get(`store/order/filtter`)
}
/**
 * @description 核销订单 -- 表头
 */
export function takeChartApi() {
  return request.get('store/order/takechart')
}
/**
 * @description 核销订单 -- 列表
 */
export function takeOrderListApi(data) {
  return request.get('store/order/takelst', data)
}
/**
 * @description 核销订单 -- 卡片
 */
export function takeCardListApi(data) {
  return request.get('store/order/take_title', data)
}
/**
 * @description 发票管理 -- 列表
 */
export function invoiceOrderListApi(data) {
  return request.get('store/receipt/lst', data)
}
/**
 * @description 发票 -- 备注from
 */
export function invoiceorderMarkApi(id) {
  return request.get(`store/receipt/mark/${id}/form`)
}
/**
 * @description 发票 -- 开票信息
 */
export function invoiceInfoApi(data) {
  return request.get(`store/receipt/set_recipt`, data)
}
/**
 * @description 发票 -- 开票
 */
export function invoiceApi(data) {
  return request.post(`store/receipt/save_recipt`, data)
}
/**
 * @description 发票 -- 详情
 */
export function invoiceDetailApi(id) {
  return request.get(`store/receipt/detail/${id}`)
}
/**
 * @description 发票 -- 编辑
 */
export function invoiceUpdateApi(id, data) {
  return request.post(`store/receipt/update/${id}`, data)
}
/**
 * @description 批量发货记录 -- 列表
 */
export function deliveryRecordListApi(data) {
  return request.get('store/import/lst', data)
}
/**
 * @description 批量发货记录 -- 详情
 */
export function deliveryRecordDetailApi(id, data) {
  return request.get(`store/import/detail/${id}`, data)
}
/**
 * @description 批量发货记录 -- 导出
 */
export function deliveryRecordImportApi(id) {
  return request.get(`store/import/excel/${id}`)
}
/**
 * @description 退款单 -- 导出
 */
export function refundListImportApi(data) {
  return request.get(`store/refundorder/excel`, data)
}
/**
 * @description 发送货 -- 物流公司列表
 */
export function expressLst() {
  return request.get(`expr/options`)
}
/**
 * @description 发送货 -- 电子面单列表
 */
export function exprTempsLst(data) {
  return request.get(`expr/temps`, data)
}
/**
 * @description 发送货 -- 批量发送货
 */
export function batchDeliveryApi(data) {
  return request.post(`store/order/delivery_batch`, data)
}
/**
 * @description 发送货 -- 电子面单默认数据
 */
export function getEleTempData() {
  return request.get(`serve/config`)
}
/**
 * @description 发送货 -- 门店列表
 */
 export function getStoreLst() {
  return request.get(`delivery/station/select`)
}
/**
 * @description 发送货 -- 门店列表
 */
 export function getDeliveryStoreLst() {
  return request.get(`delivery/station/options`)
}
/**
 * @description 同城配送  -- 订单列表
 */
 export function deliveryOrderLst(data) {
  return request.get(`delivery/order/lst`, data)
}
/**
 * @description 同城订单 -- 取消
 */
 export function deliveryOrderCancle(id) {
  return request.get(`delivery/order/cancel/${id}/form`)
}
/**
 * @description 同城配送  -- 充值记录列表
 */
 export function rechargeLst(data) {
  return request.get(`delivery/station/payLst`, data)
}
/**
 * @description 同城配送  -- 充值
 */
 export function rechargeInfoApi(data) {
  return request.get(`delivery/station/code`, data)
}
/**
 * @description 订单  -- 导出
 */
 export function storeOrderApi(data) {
  return request.get(`delivery/station/code`, data)
}