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
 * @description 配置分类 -- 编辑表单
 * @param {Object} param params {Object} 传值参数
 */
export function updateConfigClassifyTable(id) {
  return request.get('config/classify/update/table/' + id)
}
/**
 * @description 配置分类 -- 添加表单
 */
export function createConfigClassifyTable() {
  return request.get('config/classify/create/table')
}
/**
 * @description 配置分类 -- 列表
 */
export function configClassifyLst(page, limit) {
  return request.get('config/classify/lst', { page, limit })
}
/**
 * @description 配置分类 -- 修改状态
 */
export function changeConfigClassifyStatus(id, status) {
  return request.post('group/data/status/' + id, { status })
}

/**
 * @description 配置分类 -- 删除
 */
export function classifyDelApi(id) {
  return request.delete(`config/classify/delete/${id}`)
}

/**
 * @description 配置 -- 删除
 */
export function settingDelApi(id) {
  return request.delete(`config/setting/delete/${id}`)
}
export function updateConfigSettingTable(id) {
  return request.get('config/setting/update/table/' + id)
}

export function createConfigSettingTable() {
  return request.get('config/setting/create/table')
}

export function configSettingLst(page, limit) {
  return request.get('config/setting/lst', { page, limit })
}

export function changeConfigSettingStatus(id, status) {
  return request.post('config/setting/status/' + id, { status })
}

export function groupLst(page, limit) {
  return request.get('group/lst', { page, limit })
}

export function createGroupTable() {
  return request.get('group/create/table')
}

export function updateGroupTable(id) {
  return request.get('group/update/table/' + id)
}
/**
 * @description 专题详情 -- 表格表头
 * @param {Object} param params {Object} 传值参数
 */
export function groupDetail(id) {
  return request.get('group/detail/' + id)
}
/**
 * @description 专题列表 -- 列表
 * @param {Object} param params {Object} 传值参数
 */
export function groupDataLst(groupId, page, limit) {
  return request.get('group/data/lst/' + groupId, { page, limit })
}
/**
 * @description 专题列表 -- 新增表单
 * @param {Object} param params {Object} 传值参数
 */
export function createGroupData(groupId) {
  return request.get('group/data/create/table/' + groupId)
}
/**
 * @description 专题列表 -- 编辑表单
 * @param {Object} param params {Object} 传值参数
 */
export function updateGroupData(groupId, id) {
  return request.get(`group/data/update/table/${groupId}/${id}`)
}
/**
 * @description 客服管理 -- 修改状态
 */
export function goupDataStatusApi(id, status) {
  return request.post(`/group/data/status/${id}`, { status })
}
/**
 * @description 专题列表 -- 删除
 * @param {Object} param params {Object} 传值参数
 */
export function deleteGroupData(id) {
  return request.delete('group/data/delete/' + id)
}
/**
 * @description 菜单管理 -- 列表
 */
export function menuListApi(data) {
  return request.get('system/menu/lst', data)
}
/**
 * @description 菜单管理 -- 新增表单
 */
export function menuCreateApi() {
  return request.get('system/menu/create/form')
}
/**
 * @description 菜单管理 -- 编辑表单
 */
export function menuUpdateApi(id) {
  return request.get(`system/menu/update/form/${id}`)
}
/**
 * @description 菜单管理 -- 删除
 */
export function menuDeleteApi(id) {
  return request.delete(`system/menu/delete/${id}`)
}
/**
 * @description 附件分类 -- 所有分类
 */
export function formatLstApi() {
  return request.get(`system/attachment/category/formatLst`)
}
/**
 * @description 附件分类 -- 添加分类
 */
export function attachmentCreateApi() {
  return request.get(`system/attachment/category/create/form`)
}
/**
 * @description 附件分类 -- 编辑分类
 */
export function attachmentUpdateApi(id) {
  return request.get(`system/attachment/category/update/form/${id}`)
}
/**
 * @description 附件分类 -- 编辑名称
 */
export function picNameUpdateApi(id, data) {
  return request.get(`system/attachment/update/${id}/form`, data)
}
/**
 * @description 附件分类 -- 编辑名称升级
 */
export function picNameEditApi(id, data) {
  return request.post(`system/attachment/update/${id}.html`, data)
}
/**
 * @description 附件分类 -- 删除分类
 */
export function attachmentDeleteApi(id) {
  return request.delete(`system/attachment/category/delete/${id}`)
}
/**
 * @description 图片列表
 */
export function attachmentListApi(data) {
  return request.get(`system/attachment/lst`, data)
}
/**
 * @description 图片列表 -- 删除
 */
export function picDeleteApi(id) {
  return request.delete(`system/attachment/delete`, id)
}
/**
 * @description 图片列表 -- 修改附件分类
 */
export function categoryApi(ids, attachment_category_id) {
  return request.post(`system/attachment/category`, { ids, attachment_category_id })
}
/**
 * @description 客服管理 -- 创建表单
 */
export function serviceCreateApi() {
  return request.get(`service/create/form`)
}
/**
 * @description 客服管理 -- 编辑表单
 */
export function serviceUpdateApi(id) {
  return request.get(`service/update/form/${id}`)
}
/**
 * @description 客服管理 -- 列表
 */
export function serviceListApi(data) {
  return request.get(`service/list`, data)
}
/**
 * @description 客服管理 -- 修改状态
 */
export function serviceStatusApi(id, status) {
  return request.post(`service/status/${id}`, { status })
}
/**
 * @description 客服管理 -- 删除
 */
export function serviceDeleteApi(id) {
  return request.delete(`service/delete/${id}`)
}
/**
 * @description 客服管理 -- 用户列表
 */
export function userLstApi(data) {
  return request.get(`user/lst`, data)
}
/**
 * @description 客服管理 -- 用户列表
 */
export function userListApi(data) {
  return request.get(`user/list`, data)
}
/**
 * @description 客服管理 -- 用户列表
 */
export function serviceChatListApi(id, data) {
  return request.get(`service/${id}/user`, data)
}
/**
 * @description 客服管理 -- 客服与用户的聊天记录
 */
export function serviceChatUidListApi(id, uid, data) {
  return request.get(`service/${id}/${uid}/lst`, data)
}
/**
 * @description 客服管理 -- 登录
 */
export function serviceLoginApi(id) {
  return request.post(`service/login/` + id)
}
/**
 * @description 站内消息 -- 列表
 */
export function stationNewsList(data) {
  return request.get(`notice/lst`, data)
}
/**
 * @description 站内消息列表 -- 设为已读
 */
export function stationNoticeRead(id) {
  return request.post(`notice/read/${id}`)
}
/**
 * @description 消息 -- 未读数量
 */
export function unreadCountApi() {
  return request.get(`notice/unread_count`)
}
/**
 * @description 设置 -- 电商服务申请
 */
export function createApplyment(data) {
  return request.post(`applyments/create`, data)
}
/**
 * @description 设置 -- 电商服务详情
 */
export function applymentDetail() {
  return request.get(`applyments/detail`)
}
/**
 * @description 设置 -- 电商服务编辑
 */
export function updateApplyment(id, data) {
  return request.post(`applyments/update/${id}`, data)
}
/**
 * @description 设置 -- 分账列表
 */
export function applymentLstApi(data) {
  return request.get(`profitsharing/lst`, data)
}
/**
 * @description 设置 -- 物流公司列表
 */
export function expressLst(data) {
  return request.get(`expr/lst`, data)
}
/**
 * @description 设置 -- 物流公司列表
 */
export function accountUpdate(id) {
  return request.get(`expr/partner/${id}/form`)
}
/**
 * @description 分账管理 -- 导出
 */
export function ledgerManageExportApi(data) {
  return request.get(`profitsharing/export`, data)
}
/**
 * @description 滑块 -- 请求滑块验证码
 */
 export function ajCaptcha(data) {
  return request.get(`ajcaptcha`, data)
}
/**
 * @description 滑块 -- 请求滑块验证码
 */
 export function ajCaptchaCheck(data) {
  return request.post(`ajcheck`, data)
}

/**
 * @description 滑块 -- 请求滑块验证码
 */
 export function ajCaptchaStatus(data) {
  return request.post(`ajstatus`, data)
}