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
  return request.get('order/lst', data)
}

/**
 * @description 订单 -- 表头
 */
export function chartApi() {
  return request.get('order/chart')
}

/**
 * @description 订单 -- 卡片
 */
export function cardListApi(data) {
    return request.get('order/title', data)
}
/**
 * @description 订单 -- 编辑
 */
export function orderUpdateApi(id) {
  return request.get(`store/order/update/${id}/form`)
}

/**
 * @description 订单 -- 发货
 */
export function orderDeliveryApi(id) {
  return request.get(`store/order/delivery/${id}/form`)
}

/**
 * @description 订单 -- 详情
 */
export function orderDetailApi(id) {
  return request.get(`order/detail/${id}`)
}
/**
 * @description 订单 -- 记录
 */
 export function orderLogApi(id, data) {
  return request.get(`order/status/${id}`, data)
}
/**
 * @description 退款订单 -- 列表
 */
export function refundorderListApi(data) {
  return request.get('order/refund/lst', data)
}
/**
 * @description 订单 -- 子订单
 */
export function getChildrenOrderApi(id) {
  return request.get(`order/children/${id}`)
}
/**
 * @description 发送货 -- 物流公司列表
 */
export function expressLst() {
  return request.get(`expr/options`)
}
/**
 * @description 获取物流信息
 */
export function getExpress(id) {
  return request.get(`order/express/${id}`)
}
/**
 * @description 导出订单
 */
export function exportOrderApi(data) {
  return request.get(`order/excel`,  data )
}
/**
 * @description 导出退款单
 */
 export function exportRefundOrderApi(data) {
  return request.get(`order/refund/excel`,  data )
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
 * @description 核销订单 -- 表头
 */
export function takeChartApi() {
  return request.get('order/takechart')
}
/**
 * @description 核销订单 -- 列表
 */
export function takeOrderListApi(data) {
  return request.get('order/takelst', data)
}
/**
 * @description 核销订单 -- 卡片
 */
 export function takeCardListApi(data) {
    return request.get('order/take_title', data)
}
/**
 * @description 导出列表 -- 文件类型
 */
 export function excelFileType() {
    return request.get('excel/type')
}
/**
 * @description 发送货 -- 门店列表
 */
 export function getStoreLst() {
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
 * @description 同城配送  -- 充值记录卡片数据
 */
 export function rechargeCardApi() {
  return request.get(`delivery/title`)
}
/**
 * @description 同城配送  -- 充值余额
 */
 export function rechargeBalancei() {
  return request.get(`delivery/belence`)
}