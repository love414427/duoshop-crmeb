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
 * @description 数据备份 -- 列表
 */
export function fileListApi() {
  return request.get('safety/database/fileList')
}
/**
 * @description 数据备份 -- 删除
 */
export function fileListDeleteApi(data) {
    return request.delete('safety/database/delete',data)
  }
/**
 * @description 数据库表 -- 列表
 */
export function databaseListApi() {
  return request.get('safety/database/lst')
}
/**
 * @description 数据库表 -- 备份
 */
export function backupsApi(data) {
  return request.post(`safety/database/backups`, data)
}
/**
 * @description 数据库表 -- 修复
 */
export function repairApi(data) {
  return request.post(`safety/database/repair`, data)
}
/**
 * @description 数据库表 -- 优化
 */
export function optimizeApi(data) {
  return request.post(`safety/database/optimize`, data)
}
/**
 * @description 数据库表 -- 详情
 */
export function detailApi(name) {
  return request.get(`safety/database/detail/${name}`)
}
/**
 * @description 数据库 -- 下载
 */
export function downloadApi(feilname) {
  return request.get(`safety/database/download/${feilname}`)
}
/**
 * @description 授权 -- 获取授权状态
 */
export function authTypeApi() {
  return request.get(`auth`)
}
/**
 * @description 授权 -- 获取授权状态
 */
 export function getAuthApi() {
  return request.get(`copyright/auth`)
}
/**
 * @description 授权 -- 申请授权
 */
export function authApplyApi(data) {
  return request.post(`auth_apply`, data)
}
/**
 * @description 授权 -- 检查授权状态
 */
export function checkAuthApi() {
  return request.get(`check_auth`)
}
/**
 * @description 授权 -- 申请授权
 */
 export function applyAuthApi() {
  return request.get(`pay/auth`)
}
/**
 * @description 安全设置 -- 清除缓存
 */
 export function clearCacheApi(data) {
  return request.post(`clear/cache`,data)
}

/**
 * @description 授权 -- 保存版权信息
 */
 export function saveCrmebCopyRight(data) {
  return request.post(`copyright/save`,data)
}
/**
 * @description 授权 -- 保存版权信息
 */
 export function getCrmebCopyRight() {
  return request.get(`copyright/get`)
}