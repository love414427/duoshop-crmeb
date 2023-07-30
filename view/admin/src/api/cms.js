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
 * @description 文章分类 -- 列表
 */
export function articleListApi() {
  return request.get('system/article/category/lst')
}
/**
 * @description 文章分类 -- 列表
 */
 export function articleCategoryApi() {
    return request.get('system/article/category/select')
  }
/**
 * @description 文章分类 -- 新增表单
 */
export function articleCreateApi() {
  return request.get('system/article/category/create/form')
}
/**
 * @description 文章分类 -- 编辑表单
 */
export function articleUpdateApi(id) {
  return request.get(`system/article/category/update/form/${id}`)
}
/**
 * @description 文章分类 -- 删除
 */
export function articleDeleteApi(id) {
  return request.delete(`system/article/category/delete/${id}`)
}
/**
 * @description 文章分类 -- 修改开启状态
 */
export function articleStatuseApi(id, status) {
  return request.post(`system/article/category/status/${id}`, { status })
}
/**
 * @description 文章管理 -- 列表
 */
export function articleLstApi(data) {
  return request.get('system/article/article/lst', data)
}
/**
 * @description 文章管理 -- 详情
 */
export function articleDetailApi(id) {
  return request.get(`system/article/article/detail/${id}`)
}
/**
 * @description 文章管理 -- 添加
 */
export function articleAddApi(data) {
  return request.post('system/article/article/create', data)
}
/**
 * @description 文章管理 -- 编辑
 */
export function articleEditApi(data, id) {
  return request.post(`system/article/article/update/${id}`, data)
}
/**
 * @description 文章管理 -- 删除
 */
export function articleDeleApi(id) {
  return request.delete(`system/article/article/delete/${id}`)
}
/**
 * @description 文章管理 -- 修改开启状态
 */
 export function articleStatusApi(id, status) {
    return request.post(`system/article/article/status/${id}`, { status })
  }