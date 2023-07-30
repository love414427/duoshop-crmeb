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
 * @description 验证码
 */
export function configApi(key) {
  return request.get(`config/${key}`)
}
export function modifyStoreApi() {
  return request.get(`update/form`)
}
/**
 * @description 验证码
 */
 export function getDeliveryCate() {
  return request.get(`delivery/station/business`)
}
/**
 * @description 添加门店
 */
 export function createStoreApi(data) {
  return request.post(`delivery/station/create`, data)
}
/**
 * @description 门店管理 -- 列表
 */
 export function deliveryStoreLst(data) {
  return request.get(`delivery/station/lst`, data)
}
/**
 * @description 门店管理 -- 详情
 */
 export function deliveryStoreDetail(id) {
  return request.get(`delivery/station/detail/${id}`)
}
/**
 * @description 门店管理 -- 备注
 */
 export function deliveryStoreRemark(id) {
  return request.get(`delivery/station/mark/${id}/form`)
}
/**
 * @description 门店管理 -- 修改显示状态（上下架）
 */
 export function deliveryStoreStatus(id, data) {
  return request.post(`delivery/station/status/${id}`, data)
}
/**
 * @description 门店管理 -- 获取地图key
 */
 export function getConfigApi() {
  return request.get(`config`)
}
/**
 * @description 门店管理 -- 编辑
 */
 export function deliveryStoreUpdate(id, data) {
  return request.post(`delivery/station/update/${id}`, data)
}
/**
 * @description 门店管理 -- 删除
 */
 export function deliveryStoreDelete(id) {
  return request.delete(`delivery/station/delete/${id}`)
}
/**
 * @description 门店管理 -- 城市列表
 */
 export function getCityLst() {
  return request.get(`delivery/station/getCity`)
}
/**
 * @description 客服自动回复 -- 添加
 */
 export function replyAddApi(data) {
  return request.post(`service/reply/create`, data)
}
/**
 * @description 客服自动回复 -- 列表
 */
 export function replyListApi(page, limit) {
  return request.get(`service/reply/list`,{page, limit})
}
/**
 * @description 客服自动回复 -- 删除
 */
export function replyDeleteApi(id) {
  return request.delete(`service/reply/delete/${id}`)
}

/**
 * @description 客服自动回复 -- 编辑
 */
 export function replyEditApi(id, data) {
  return request.post(`service/reply/update/${id}`, data)
}
/**
 * @description 客服自动回复 -- 修改状态
 */
export function replyStatusApi(id, status) {
  return request.post(`service/reply/status/${id}`, { status })
}