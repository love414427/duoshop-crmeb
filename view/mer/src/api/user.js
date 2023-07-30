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
export function captchaApi() {
  return request.get(`captcha`)
}
/**
  * @description 登录
  */
export function login(data) {
  return request.post(`login`, data)
}

/**
 * @description 登录页配置
 */
export function loginConfigApi() {
  return request.get(`login_config`)
}

/**
 * @description 退出登录
 */
export function logout() {
  return request.get(`logout`)
}

/**
 * @description 修改密码
 */
export function passwordFormApi() {
  return request.get(`system/admin/edit/password/form`)
}

/**
 * @description 修改自己的信息
 */
export function editFormApi() {
  return request.get(`system/admin/edit/form`)
}
/**
 * @description 菜单
 */
export function getMenusApi() {
  return request.get(`menus`)
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}
/**
 * @description 标签
 */
export function getBaseInfo() {
  return request.get(`info`)
}
/**
 * @description 用户标签 -- 列表
 */
export function labelLstApi(data) {
  return request.get('user/label/lst', data)
}
/**
 * @description 用户标签 -- 添加表单
 */
export function labelFormApi() {
  return request.get('user/label/form')
}
/**
 * @description 用户标签 -- 编辑表单
 */
export function labelEditApi(id) {
  return request.get('user/label/form/' + id)
}
/**
 * @description 用户标签 -- 删除
 */
export function labelDeleteApi(id) {
  return request.delete(`user/label/${id}`)
}
/**
 * @description 自动标签 -- 添加
 */
export function AutolabelCreateApi(data) {
  return request.post('auto_label/create', data)
}
/**
 * @description 自动标签 -- 列表
 */
export function AutolabelLstApi(data) {
  return request.get('auto_label/lst', data)
}
/**
 * @description 自动标签 -- 编辑
 */
export function AutolabelUpdateApi(id, data) {
  return request.post('auto_label/update/' + id, data)
}
/**
 * @description 自动标签 -- 删除
 */
export function AutolabelDeleteApi(id) {
  return request.delete(`auto_label/delete/${id}`)
}
/**
 * @description 自动标签 -- 更新
 */
export function AutolabelSyncApi(id) {
  return request.post('auto_label/sync/' + id)
}
/**
 * @description 用户 -- 列表
 */
export function userLstApi(data) {
  return request.get('user/lst', data)
}
/**
 * @description 用户 -- 详情消费记录
 */
export function userOrderApi(uid, data) {
  return request.get(`user/order/${uid}`, data)
}
/**
 * @description 用户 -- 详情优惠券
 */
export function userCouponApi(uid, data) {
  return request.get(`user/coupon/${uid}`, data)
}
/**
 * @description 用户 -- 批量设置分组
 */
export function changeGroupApi(id) {
  return request.get('user/change_label/form/' + id)
}
/**
 * @description 修改商户基本信息
 */
export function merchantUpdate(data) {
  return request.post("/info/update", data)
}
/**
 * @description 用户搜索信息 -- 列表
 */
export function userSearchLstApi(data) {
    return request.get("user/search_log", data)
}
/**
 * 获取版权信息
 * @returns 
 */
 export function getVersion() {
  return request.get('../api/version')
}
/**
 * @description 付费会员记录  -- 列表
 */
 export function memberRecordListApi(data) {
  return request.get('user/svip/order_lst', data)
}