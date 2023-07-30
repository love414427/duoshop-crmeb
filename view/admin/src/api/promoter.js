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
 * @description 分销设置 -- 详情
 */
export function configApi() {
  return request.get('config/others/lst')
}

/**
 * @description 分销设置 -- 表单提交
 */
export function configUpdateApi(data) {
  return request.post('config/others/update', data)
}

/**
 * @description 分销设置 -- 表单提交
 */
export function productCheckApi() {
  return request.post('store/product/check')
}

/**
 * @description 分销员 -- 列表
 */
export function promoterListApi(data) {
  return request.get('user/promoter/lst', data)
}

/**
 * @description 推广人 -- 列表
 */
export function spreadListApi(uid, data) {
  return request.get(`user/spread/lst/${uid}`, data)
}

/**
 * @description 推广人订单 -- 列表
 */
export function spreadOrderListApi(uid, data) {
  return request.get(`user/spread/order/${uid}`, data)
}

/**
 * @description 推广人 -- 清除上级推广人
 */
export function spreadClearApi(uid) {
  return request.post(`user/spread/clear/${uid}`)
}

/**
 * @description 商品列表 -- 列表
 */
export function productLstApi(data) {
  return request.get(`store/bag/lst`, data)
}

/**
 * @description 商品列表 -- 平台分类
 */
export function categoryListApi() {
  return request.get(`store/category/list`)
}

/**
 * @description 商品审核 -- 详情
 */
export function productDetailApi(id) {
  return request.get(`store/bag/detail/${id}`)
}

/**
 * @description 商品审核/下架
 */
export function productStatusApi(data) {
  return request.post(`store/bag/status`, data)
}

/**
 * @description 商品列表 -- 列表表头
 */
export function lstFilterApi() {
  return request.get(`store/bag/lst_filter`)
}

/**
 * @description 商品列表 -- 显示隐藏
 */
export function changeApi(id, status) {
  return request.post(`store/bag/change/${id}`, { status })
}
/**
 * @description 商户总
 */
export function merSelectApi() {
  return request.get(`store/product/mer_select`)
}
/**
 * @description 商品下架
 */
export function productOffApi(data) {
  return request.post(`store/bag/status`, data)
}
/**
 * @description 商品编辑
 */
export function productUpdateApi(id, data) {
  return request.post(`store/bag/update/${id}`, data)
}
/**
 * @description 佣金 -- 获取佣金说明
 */
export function getEextensionApi(key) {
    return request.get(`agreement/${key}`)
}
/**
 * @description 佣金 -- 编辑佣金说明
 */
export function updateEextensionApi(type, data) {
    return request.post(`agreement/${type}`, data)
}
/**
 * @description 分销等级 -- 获取分销等级规则
 */
 export function getBrokerageApi(key) {
    return request.get(`agreement/${key}`)
}
/**
 * @description 分销等级 -- 编辑分销等级规则
 */
export function updateBrokerageApi(type, data) {
    return request.post(`agreement/${type}`, data)
}
/**
 * @description 分销等级 -- 添加
 */
 export function membershipDataAddApi(data) {
    return request.post(`user/brokerage/create`, data)
}
/**
 * @description 分销等级 -- 列表
 */
 export function distributionLevelLst(data) {
    return request.get(`user/brokerage/lst`, data)
}
/**
 * @description 分销等级 -- 列表
 */
 export function distributionDetail(id) {
    return request.get(`user/brokerage/detail/${id}`)
}
/**
 * @description 分销等级 -- 编辑
 */
 export function distributionUpdate(id, data) {
    return request.post(`user/brokerage/update/${id}`, data)
}
/**
 * @description 分销等级 -- 删除
 */
 export function distributionDelete(id) {
    return request.delete(`user/brokerage/delete/${id}`)
}
/**
 * @description 分销员列表 -- 获取分销等级
 */
 export function getDistributionLevel() {
    return request.get(`user/brokerage/options`)
}
/**
 * @description 分销员列表 -- 获取分销数据
 */
 export function distributionStatistics(data) {
    return request.get(`user/promoter/count`,data)
}
/**
 * @description 分销员列表 -- 编辑分销员等级
 */
 export function distributionLevelUpdate(id) {
  return request.get(`user/spread/${id}/form`)
}
