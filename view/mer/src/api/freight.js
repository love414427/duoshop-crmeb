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
 * @description 运费模板 -- 城市
 */
export function cityList() {
  return request.get('system/city/lst')
}

export function cityListV2(pid) {
  return request.get('v2/system/city/lst/' + pid)
}

/**
 * @description 运费模板 -- 列表
 */
export function templateListApi(data) {
  return request.get('store/shipping/lst', data)
}
/**
 * @description 运费模板 -- 新增
 */
export function templateCreateApi(data) {
  return request.post('store/shipping/create', data)
}
/**
 * @description 运费模板 -- 编辑
 */
export function templateUpdateApi(id, data) {
  return request.post(`store/shipping/update/${id}`, data)
}
/**
 * @description 运费模板 -- 详情
 */
export function templateDetailApi(id) {
  return request.get(`/store/shipping/detail/${id}`)
}
/**
 * @description 运费模板 -- 删除
 */
export function templateDeleteApi(id) {
  return request.delete(`store/shipping/delete/${id}`)
}
