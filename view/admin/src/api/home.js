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
 * @description 运营数据 -- 列表
 */
export function statisticsApi() {
  return request.get('statistics/main')
}

/**
 * @description 当日订单额
 */
export function statisticsOrderApi() {
  return request.get('statistics/order')
}

/**
 * @description 当日订单数
 */
export function statisticsOrderNumApi() {
  return request.get('statistics/order_num')
}

/**
 * @description 当日支付人数
 */
export function statisticsOrderUserApi() {
  return request.get('statistics/order_user')
}

/**
 * @description 商户销量排行
 */
export function merchantStockApi(data) {
  return request.get('statistics/merchant_stock', data)
}

/**
 * @description 商户销售额占比
 */
export function merchantRateApi(data) {
  return request.get('statistics/merchant_rate', data)
}

/**
 * @description 商户访问量排行
 */
export function merchantVisitApi(data) {
  return request.get('statistics/merchant_visit', data)
}

/**
 * @description 成交用户
 */
export function merchantUserApi(data) {
  return request.get('statistics/user', data)
}

/**
 * @description 成交用户占比
 */
export function userRateApi(data) {
  return request.get('statistics/user_rate', data)
}

/**
 * @description 用户数据
 */
export function userDataApi(data) {
  return request.get('statistics/user_data', data)
}

