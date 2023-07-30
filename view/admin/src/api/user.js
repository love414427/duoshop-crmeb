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

/**
 * @description 创建用户
 */
 export function createUserApi() {
  return request.get(`user/create`)
}
/**
 * @description 用户分组 -- 编辑表单
 * @param {Object} param params {Object} 传值参数
 */
export function groupEditApi(id) {
  return request.get('user/group/form/' + id)
}
/**
 * @description 用户分组 -- 添加表单
 */
export function groupFormApi() {
  return request.get('user/group/form')
}
/**
 * @description 用户分组 -- 列表
 */
export function groupLstApi(data) {
  return request.get('user/group/lst', data)
}
/**
 * @description 用户分组 -- 删除
 */
export function groupDeleteApi(id) {
  return request.delete(`user/group/${id}`)
}
/**
 * @description 用户标签 -- 编辑表单
 * @param {Object} param params {Object} 传值参数
 */
export function labelEditApi(id) {
  return request.get('user/label/form/' + id)
}
/**
 * @description 用户标签 -- 添加表单
 */
export function labelFormApi() {
  return request.get('user/label/form')
}
/**
 * @description 用户标签 -- 列表
 */
export function labelLstApi(data) {
  return request.get('user/label/lst', data)
}
/**
 * @description 用户标签 -- 删除
 */
export function labelDeleteApi(id) {
  return request.delete(`user/label/${id}`)
}
/**
 * @description 用户列表 -- 列表
 */
export function userLstApi(data) {
  return request.get('user/lst', data)
}
/**
 * @description 用户列表 -- 设置分组
 */
export function changeGroupApi(id) {
  return request.get(`user/change_group/form/${id}`)
}
/**
 * @description 用户列表 -- 设置标签
 */
export function changelabelApi(id) {
  return request.get(`user/change_label/form/${id}`)
}
/**
 * @description 用户列表 -- 编辑会员等级
 */
 export function changeMemberApi(id) {
  return request.get(`user/member/${id}/form`)
}
/**
 * @description 用户列表 -- 修改余额
 */
export function changeNowMoneyApi(id) {
  return request.get(`user/change_now_money/form/${id}`)
}
/**
 * @description 用户列表 -- 修改积分
 */
export function changeNowIntegralApi(id) {
    return request.get(`user/change_integral/form/${id}`)
}
/**
 * @description 用户列表 -- 批量设置分组
 */
export function batchChangeGroupApi(data) {
  return request.get(`user/batch_change_group/form`, data)
}
/**
 * @description 用户列表 -- 批量设置标签
 */
export function batchChangelabelApi(data) {
  return request.get(`user/batch_change_label/form`, data)
}
/**
 * @description 用户列表 -- 编辑用户
 */
export function userUpdateApi(id) {
  return request.get(`user/update/form/${id}`)
}
/**
 * @description 用户列表 -- 修改密码
 */
export function modifyUserPassword(id) {
  return request.get(`user/change_password/form/${id}`)
}
/**
 * @description 用户列表 -- 发送图文消息
 */
export function userNewsApi(data) {
  return request.post(`user/news/push`, data)
}
/**
 * @description 用户 -- 详情头部
 */
export function userDetailApi(uid) {
  return request.get(`user/detail/${uid}`)
}
/**
 * @description 用户 -- 详情消费记录
 */
export function userOrderApi(uid, data) {
  return request.get(`user/order/${uid}`, data)
}
/**
 * @description 用户 -- 积分记录
 */
export function userPointsApi(uid, data) {
  return request.get(`user/integral/${uid}`, data)
}
/**
 * @description 用户 -- 签到记录
 */
export function userSignLogApi(uid, data) {
  return request.get(`user/sign_log/${uid}`, data)
}
/**
 * @description 用户 -- 浏览足迹
 */
export function userHistoryApi(uid, data) {
  return request.get(`user/history/${uid}`, data)
}
/**
 * @description 用户 -- 详情优惠券
 */
export function userCouponApi(uid, data) {
  return request.get(`user/coupon/${uid}`, data)
}
/**
 * @description 用户 -- 余额明细
 */
export function userBillApi(uid, data) {
  return request.get(`user/bill/${uid}`, data)
}
/**
 * @description 用户 -- 城市列表
 */
export function cityListApi(uid) {
  return request.get(`system/city/lst`)
}
/**
 * @description 用户 -- 修改用户推荐人(表单)
 */
export function modifyUserReferrer(uid) {
    return request.get(`user/change_spread_form/${uid}`)
}
/**
 * @description 用户 -- 推荐人修改记录
 */
export function modifyUserRefLog(uid, data) {
    return request.get(`user/spread_log/${uid}`, data)
}
/**
 * @description 用户 -- 获取协议
 */
export function getAgreementApi(key) {
    return request.get(`agreement/${key}`)
}
/**
 * @description 用户 -- 编辑协议
 */
export function updateAgreementApi(type, data) {
    return request.post(`agreement/${type}`, data)
}
/**
 * @description 用户搜索信息 -- 列表
 */
export function userSearchLstApi(data) {
    return request.get("user/search_log", data)
}
/**
 * @description 用户搜索信息 -- 导出
 */
export function recordListImportApi(data) {
    return request.get("user/search_log/export", data)
}
/**
 * @description 会员管理  -- 添加会员
 */
 export function addInterestsApi() {
  return request.get('user/member/create/form')
}
/**
 * @description 会员管理  -- 列表
 */
 export function interestsLstApi(data) {
  return request.get('user/member/lst', data)
}
/**
 * @description 会员管理  -- 编辑
 */
 export function interestsUpdateApi(id) {
  return request.get(`user/member/update/${id}/form`)
}
/**
 * @description 会员管理 -- 删除
 */
 export function interestsDeleteApi(id) {
  return request.delete(`user/member/delete/${id}`)
}
/**
 * @description 会员 -- 说明
 */
 export function interestsInfo(key) {
  return request.get(`agreement/${key}`)
}
/**
 * @description 会员管理 -- 编辑
 */
 export function interestsUpdate(key,data) {
  return request.post(`agreement/${key}`, data)
}
/**
 * @description 会员 -- 配置
 */
 export function interestsConfig(key) {
  return request.get(`config/${key}`)
}
/**
 * @description 会员权益  -- 添加
 */
 export function addBenefitsApi() {
  return request.get('member/interests/create/form')
}
/**
 * @description 会员权益  -- 列表
 */
 export function benefitsLstApi(data) {
  return request.get('member/interests/lst', data)
}
/**
 * @description 会员权益  -- 编辑
 */
 export function benefitsUpdateApi(id) {
  return request.get(`/member/interests/update/${id}/form`)
}
/**
 * @description 会员权益 -- 删除
 */
 export function benefitsDeleteApi(id) {
  return request.delete(`member/interests/delete/${id}`)
}
/**
 * 获取版权信息
 * @returns 
 */
export function getVersion() {
  return request.get('../api/version')
}
/**
 * @description 会员类型  -- 添加
 */
 export function levelCreateApi() {
  return request.get('user/svip/type/form')
}
/**
 * @description 会员类型  -- 编辑
 */
 export function levelUpdateApi(id) {
  return request.get(`user/svip/type/${id}/form`)
}
/**
 * @description 会员类型  -- 删除
 */
 export function levelDeteleApi(id) {
  return request.delete(`user/svip/type/delete/${id}`)
}
/**
 * @description 付费会员权益 -- 权益状态
 */
 export function levelStatusApi(id, status) {
  return request.post(`user/svip/type/status/${id}`, { status })
}
/**
 * @description 付费会员类型  -- 列表
 */
 export function levelListApi() {
  return request.get('user/svip/type/lst')
}
/**
 * @description 付费会员权益  -- 列表
 */
 export function memberEquityListApi() {
  return request.get('svip/interests/lst')
}
/**
 * @description 付费会员权益  -- 编辑表单
 */
 export function memberEquityUpdateApi(id) {
  return request.get(`svip/interests/${id}/form`)
}
/**
 * @description 付费会员权益 -- 权益状态
 */
 export function memberEquityStatusApi(id, status) {
  return request.post(`svip/interests/status/${id}`, { status })
}
/**
 * @description 付费会员记录  -- 列表
 */
 export function memberRecordListApi(data) {
  return request.get('user/svip/order_lst', data)
}
/**
 * @description 用户  -- 赠送付费会员
 */
 export function giveMemberApi(id) {
  return request.get(`user/svip/${id}/form`)
}