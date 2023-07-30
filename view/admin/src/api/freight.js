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
 * @description 物流公司 -- 列表
 */
export function expressListApi(data) {
  return request.get('store/express/lst', data)
}
/**
 * @description 物流公司 -- 新增表单
 */
export function expressCreateApi() {
  return request.get('store/express/create/form')
}
/**
 * @description 物流公司 -- 编辑表单
 */
export function expressUpdateApi(id) {
  return request.get(`store/express/update/form/${id}`)
}
/**
 * @description 物流公司 -- 删除
 */
export function expressDeleteApi(id) {
  return request.delete(`store/express/delete/${id}`)
}
/**
 * @description 物流公司 -- 修改开启状态
 */
export function expressStatuseApi(id, is_show) {
  return request.post(`store/express/status/${id}`, { is_show })
}
/**
 * @description 物流公司 -- 同步物流公司
 */
 export function syncExpressApi() {
    return request.get('store/express/sync')
  }