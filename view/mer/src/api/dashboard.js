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
 * @description 首页 -- 主要数据*/
export function mainDataApi() {
  return request.get('statistics/main')
}
/**
 * @description 首页 -- 支付订单
 */
export function orderApi(data) {
  return request.get('statistics/order', data)
}
/**
 * @description 首页 -- 成交客户
 */
export function customerApi(data) {
  return request.get('statistics/user', data)
}
/**
 * @description 首页 -- 成交客户比例
 */
export function customerRatioApi(data) {
  return request.get('statistics/user_rate', data)
}
/**
 * @description 首页 -- 商品支付排行
 */
export function rankingApi(data) {
  return request.get('statistics/product', data)
}
/**
 * @description 首页 -- 商品访客排行
 */
export function visitorRankingApi(data) {
  return request.get('statistics/product_visit', data)
}
/**
 * @description 首页 -- 商品加购排行
 */
export function ProductPlusApi(data) {
  return request.get('statistics/product_cart', data)
}

