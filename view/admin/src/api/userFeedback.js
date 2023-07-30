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
 * @description 列表
 */
export function feedbackListApi(data) {
  return request.get(`user/feedback/lst`, data)
}

/**
 * @description 备注
 */
export function feedbackReplyApi(id) {
  return request.post(`user/feedback/reply/${id}`)
}

/**
 * @description 删除
 */
export function feedbackDeleteApi(id) {
  return request.delete(`user/feedback/delete/${id}`)
}

/**
 * @description 分类列表
 */
export function feedbackCategoryListApi(data) {
  return request.get(`user/feedback/category/lst`, data)
}

/**
 * @description 分类添加
 */
export function feedbackCategoryCreateApi() {
  return request.get(`user/feedback/category/create/form`)
}

/**
 * @description 分类编辑
 */
export function feedbackCategoryUpdateApi(id) {
  return request.get(`user/feedback/category/update/${id}/form`)
}

/**
 * @description 分类删除
 */
export function feedbackCategoryDeleteApi(id) {
  return request.delete(`user/feedback/category/delete/${id}`)
}

/**
 * @description 修改状态
 */
export function feedbackCategoryStatusApi(id, status) {
  return request.post(`user/feedback/category/status/${id}`, { status })
}
/**
 * @description 修改反馈状态
 */
export function changeFeedbackStatus(id, status) {
  return request.post(`user/feedback/status/${id}`, { status })
}
/**
 * @description 反馈回复
 */
 export function replyFeedbackApi(id) {
  return request.get(`user/feedback/reply/${id}/form`)
}