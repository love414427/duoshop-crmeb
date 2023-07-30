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
 * @description 社区分类 -- 列表
 */
export function communityCategoryListApi(data) {
  return request.get('community/category/lst', data)
}
/**
 * @description 社区分类 -- 新增表单
 */
export function communityCategoryCreateApi() {
  return request.get('community/category/create/form')
}
/**
 * @description 社区分类 -- 编辑表单
 */
export function communityCategoryUpdateApi(id) {
  return request.get(`community/category/update/${id}/form`)
}
/**
 * @description 社区分类 -- 删除
 */
export function communityCategoryDeleteApi(id) {
  return request.delete(`community/category/delete/${id}`)
}
/**
 * @description 社区分类 -- 修改状态
 */
export function communityCategoryStatusApi(id, status) {
  return request.post(`community/category/status/${id}`, { status })
}
/**
 * @description 社区话题 -- 列表
 */
export function communityTopicListApi(data) {
  return request.get('community/topic/lst', data)
}
/**
 * @description 社区话题 -- 新增表单
 */
export function communityTopicCreateApi() {
  return request.get('community/topic/create/form')
}
/**
 * @description 社区话题 -- 编辑表单
 */
export function communityTopicUpdateApi(id) {
  return request.get(`community/topic/update/${id}/form`)
}
/**
 * @description 社区话题 -- 删除
 */
export function communityTopicDeleteApi(id) {
  return request.delete(`community/topic/delete/${id}`)
}
/**
 * @description 社区话题 -- 修改状态
 */
export function communityTopicStatusApi(id, status) {
  return request.post(`community/topic/status/${id}`, { status })
}
/**
 * @description 社区话题 -- 修改状态
 */
 export function communityTopicHotApi(id, status) {
  return request.post(`community/topic/hot/${id}`, { status })
}
/**
 * @description 社区文章 -- 列表
 */
export function communityListApi(data) {
  return request.get('community/lst', data)
}
/**
 * @description 社区文章 -- 详情
 */
export function communityDetailApi(id) {
  return request.get(`community/detail/${id}`)
}
/**
 * @description 社区文章 -- 审核/下架
 */
export function communityAuditApi(id, data) {
  return request.post(`community/status/${id}`, data)
}
/**
 * @description 社区文章 -- 编辑星级
 */
 export function communityUpdateApi(id) {
  return request.get(`community/update/${id}/form`)
}
/**
 * @description 社区文章 -- 编辑状态
 */
 export function communityStatusApi(id, status) {
  return request.post(`community/show/${id}`, {status})
}
/**
 * @description 社区文章 -- 是否推荐
 */
 export function communityHotApi(id) {
  return request.post(`community/hot/${id}`)
}

/**
 * @description 社区文章 -- 删除
 */
export function communityDeleteApi(id) {
  return request.delete(`community/delete/${id}`)
}
/**
 * @description 社区文章 -- 强制下架
 */

 export function communityOffApi(id) {
  return request.get(`community/status/${id}/form`)
}
/**
 * @description 社区文章 -- 分类筛选
 */

 export function communityCateOptionApi() {
  return request.get(`community/category/option`)
}
/**
 * @description 社区文章 -- 话题筛选
 */

 export function communityTopicOptionApi() {
  return request.get(`community/topic/option`)
}
/**
 * @description 社区评论 -- 列表
 */
 export function communityReplyListApi(data) {
    return request.get('community/reply/lst', data)
}
/**
 * @description 社区评论 -- 删除
 */
 export function communityReplyDeleteApi(id) {
    return request.delete(`community/reply/delete/${id}`)
}
/**
 * @description 社区评论 -- 审核
 */
 export function communityReviewApi(id) {
  return request.get(`community/reply/status/${id}/form`)
}
/**
 * @description 社区内容 -- 标题切换
 */
 export function communityTitleApi() {
  return request.get(`community/title`)
}