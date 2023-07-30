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

/**
 * @description 上传配置(表单)
 */
export function uploadApi() {
  return request.get(`upload/config`)
}
/**
 * @description 同城配送
 */
 export function deliveryConfigApi() {
  return request.get(`delivery/config/form`)
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
