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
 * @description 微信菜单 -- 获取
 */
export function wechatMenuApi() {
  return request.get('wechat/menu')
}
/**
 * @description 微信菜单 -- 编辑
 */
export function wechatMenuAddApi(data) {
  return request.post(`wechat/menu`, data)
}
/**
 * @description 关键字回复 -- 列表
 */
export function replyListApi(page, limit) {
  return request.get(`wechat/reply/lst`,{page, limit})
}
/**
 * @description 关键字回复 -- 删除
 */
export function replyDeleteApi(id) {
  return request.delete(`wechat/reply/${id}`)
}
/**
 * @description 关键字回复 -- 添加
 */
export function replyAddApi(data) {
  return request.post(`wechat/reply/create`, data)
}
/**
 * @description 关键字回复 -- 编辑
 */
export function replyEditApi(id, data) {
  return request.post(`wechat/reply/update/${id}`, data)
}
/**
 * @description 关键字回复 -- 详情
 */
export function keywordsinfoApi(key, type) {
  return request.get(`wechat/reply/detail/${key}`, { type })
}
/**
 * @description 关键字回复 -- 修改状态
 */
export function replyStatusApi(id, status) {
  return request.post(`wechat/reply/status/${id}`, { status })
}
/**
 * @description 微信关注回复 -- 编辑
 */
export function replySaveApi(key, data) {
  return request.post(`wechat/reply/save/${key}`, data)
}
/**
 * @description 图文管理 -- 列表
 */
export function newsListApi(data) {
  return request.get(`wechat/news/lst`, data)
}
/**
 * @description 图文管理 -- 添加
 */
export function wechatNewsAddApi(data) {
  return request.post(`wechat/news/create`, { data })
}
/**
 * @description 图文管理 -- 编辑
 */
export function wechatNewsUpdateApi(id, data) {
  return request.post(`wechat/news/update/${id}`, { data })
}
/**
 * @description 图文管理 -- 删除
 */
export function wechatNewsdeleteApi(id) {
  return request.delete(`wechat/news/delete/${id}`)
}
/**
 * @description 图文管理 -- 详情
 */
export function wechatNewsInfotApi(id) {
  return request.get(`wechat/news/detail/${id}`)
}
/**
 * @description 微信用户标签 -- 列表
 */
export function tagListApi(page, limit) {
  return request.get(`wechat/user/tag/lst`, { page, limit })
}
/**
 * @description 微信用户标签 -- 创建表单
 */
export function tagCreateApi() {
  return request.get(`wechat/user/tag/create/form`)
}
/**
 * @description 微信用户标签 -- 编辑表单
 */
export function tagUpdateApi(id) {
  return request.get(`wechat/user/tag/update/form/${id}`)
}
/**
 * @description 微信用户标签 -- 删除
 */
export function tagDeleteApi(id) {
  return request.delete(`wechat/user/tag/delete/${id}`)
}
/**
 * @description 微信用户分组 -- 列表
 */
export function groupListApi(page, limit) {
  return request.get(`wechat/user/group/lst`, { page, limit })
}
/**
 * @description 微信用户标签 -- 创建表单
 */
export function groupCreateApi() {
  return request.get(`wechat/user/group/create/form`)
}
/**
 * @description 微信用户标签 -- 编辑表单
 */
export function groupUpdateApi(id) {
  return request.get(`wechat/user/group/update/form/${id}`)
}
/**
 * @description 微信用户标签 -- 删除
 */
export function groupDeleteApi(id) {
  return request.delete(`wechat/user/group/delete/${id}`)
}
/**
 * @description 微信用户 -- 获取用户分组和标签
 */
export function tagGroupApi() {
  return request.get(`wechat/user/tag_group`)
}
/**
 * @description 微信用户 -- 列表
 */
export function userListApi() {
  return request.get(`wechat/user/lst`)
}
/**
 * @description 微信模板 -- 列表
 */
export function templateListApi(data) {
  return request.get(`wechat/template/lst`, data)
}
/**
 * @description 微信模板 -- 添加表单
 */
export function templateCreateApi() {
  return request.get(`wechat/template/create/form`)
}
/**
 * @description 微信模板 -- 编辑表单
 */
export function templateupdateApi(id) {
  return request.get(`wechat/template/update/${id}/form`)
}
/**
 * @description 微信模板 -- 删除
 */
export function templateDeleteApi(id) {
  return request.delete(`wechat/template/delete/${id}`)
}
/**
 * @description 微信模板 -- 修改状态
 */
export function templateStatusApi(id, data) {
  return request.post(`wechat/template/status/${id}`, data)
}
/**
 * @description 小程序模板 -- 列表
 */
export function routineListApi(data) {
  return request.get(`wechat/template/min/lst`, data)
}
/**
 * @description 小程序模板 -- 添加表单
 */
export function routineCreateApi() {
  return request.get(`wechat/template/min/create/form`)
}
/**
 * @description 小程序模板 -- 编辑表单
 */
export function routineUpdateApi(id) {
  return request.get(`wechat/template/min/update/${id}/form`)
}
/**
 * @description 小程序模板 -- 删除
 */
export function routineDeleteApi(id) {
  return request.delete(`wechat/template/min/delete/${id}`)
}
/**
 * @description 小程序模板 -- 修改状态
 */
export function routineStatusApi(id, data) {
  return request.post(`wechat/template/min/status/${id}`, data)
}
/**
 * @description 微信公众号 -- 上传校验文件
 */
 export function uploadVerFileApi() {
  return request.get(`config/setting/wechat/file/form`)
}
/**
 * @description 小程序下载 -- 下载小程序包
 */
 export function routineDownload(data) {
  return request.get(`config/setting/routine/downloadTemp`,data)
}
/**
 * @description 小程序下载 -- 小程序信息
 */
 export function routineInfo() {
  return request.get(`config/setting/routine/config`)
}