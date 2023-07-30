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
export function configClassifyLst(status, classify_name, page, limit) {
  return request.get('config/classify/lst', { page, limit, status, classify_name })
}
/**
 * @description 配置分类 -- 修改状态
 */
export function changeConfigClassifyStatus(id, status) {
  return request.post('config/classify/status/' + id, { status })
}

/**
 * @description 配置分类 -- 删除
 */
export function classifyDelApi(id) {
  return request.delete(`config/classify/delete/${id}`)
}

/**
 * @description 配置分类 -- 列表
 */
 export function configClassifyOptions() {
  return request.get('config/classify/options')
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

export function configSettingLst(data) {
  return request.get('config/setting/lst', data)
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
 * @description 数据列表 -- 表格表头
 * @param {Object} param params {Object} 传值参数
 */
export function groupDetail(id) {
  return request.get('group/detail/' + id)
}
/**
 * @description 数据列表 -- 列表
 * @param {Object} param params {Object} 传值参数
 */
export function groupDataLst(groupId, page, limit) {
  return request.get('group/data/lst/' + groupId, { page, limit })
}
/**
 * @description 数据列表 -- 新增表单
 * @param {Object} param params {Object} 传值参数
 */
export function createGroupData(groupId) {
  return request.get('group/data/create/table/' + groupId)
}
/**
 * @description 数据列表 -- 编辑表单
 * @param {Object} param params {Object} 传值参数
 */
export function updateGroupData(groupId, id) {
  return request.get(`group/data/update/table/${groupId}/${id}`)
}
/**
 * @description 数据列表 -- 修改状态
 */
export function statusGroupData(id, data) {
  return request.post(`group/data/status/${id}`, data)
}
/**
 * @description 数据列表 -- 删除
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
export function picNameUpdateApi(id) {
  return request.get(`system/attachment/update/${id}/form`)
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
 * @description 公告列表 -- 创建
 */
export function createNotice(data) {
  return request.post(`notice/create`, data)
}
/**
 * @description 公告列表 -- 列表
 */
export function stationNewsList(data) {
  return request.get(`notice/lst`, data)
}
/**
 * @description 配置
 */
 export function configApi() {
  return request.get(`config`)
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
  return request.get(`service/user_lst`, data)
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
/**
 * @description 城市数据 -- 添加
 */
 export function cityDataCreate(id) {
  return request.get(`store/city/create/form/${id}`)
}
/**
 * @description 城市数据 -- 编辑
 */
 export function cityDataUpdate(id) {
  return request.get(`/store/city/update/${id}/form`)
}
/**
 * @description 城市数据 -- 列表
 */
 export function cityDataLst(id) {
  return request.get(`/store/city/lst/${id}`)
}
/**
 * @description 城市数据 -- 删除
 */
export function cityDataDelete(id) {
  return request.delete(`/store/city/delete/${id}`)
}
/**
 * @description 数据配置 -- 菜单
 */
export function groupAllApi() {
  return request.get(`/diy/get_theme_key`)
}
/**
 * @description 数据配置 -- 列表数据
 */
export function groupDataListApi(key,data) {
  return request.get(`/diy/get_theme/${key}`, data)
}
/**
 * @description 数据配置 -- 连续签到奖励(添加)
 */
export function groupDataAddApi(id) {
  return request.get(`/group/data/create/table/${id}`)
}
/**
 * @description 数据配置 -- 连续签到奖励(删除)
 */
export function groupDataDeleteApi(id) {
  return request.delete(`/group/data/delete/${id}`)
}

/**
 * @description 数据配置 -- 连续签到奖励(编辑)
 */
export function groupDataEditApi(group_id,group_data_id) {
  return request.get(`/group/data/update/table/${group_id}/${group_data_id}`)
}
/**
 * @description 数据配置 -- 列表数据(保存)
 */
export function groupSaveApi(key,data) {
  return request.post(`/diy/set_theme/${key}`, data)
}

/**
 * @description 客服管理 -- 修改状态
 */
export function groupDataSetApi(id, status) {
  return request.post(`/group/data/status/${id}`, { status })
}