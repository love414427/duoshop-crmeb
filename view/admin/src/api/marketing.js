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
 * @description 平台优惠券 -- 列表
 */
 export function platformLstApi(data) {
  return request.get('/store/coupon/platformLst', data)
}

/**
 * @description 平台优惠券列表 -- 详情
 */
 export function platUpdateApi(id) {
  return request.get(`/store/coupon/update/${id}/form`)
}
/**
 * @description 平台优惠券列表 -- 详情
 */
 export function platDetailApi(coupon_id) {
  return request.get(`/store/coupon/show/${coupon_id}`)
}
/**
 * @description 平台优惠券列表 -- 删除
 */
 export function platDeleteApi(coupon_id) {
  return request.delete(`store/coupon/delete/${coupon_id}`)
}
/**
 * @description 平台优惠券列表 -- 复制
 */
 export function platCloneApi(id) {
  return request.get(`/store/coupon/sys/clone/${id}/form`)
}
/**
 * @description 平台优惠券列表 -- 领取记录
 */
 export function platIssueApi(data) {
  return request.get(`store/coupon/sys/issue`, data)
}
/**
 * @description 平台优惠券 -- 关联商品列表
 */
 export function platRelateProLst(id, data) {
  return request.get(`store/coupon/show_lst/${id}`, data)
}

/**
 * @description 平台优惠券 --  发送优惠券列表
 */
 export function platSendLstApi(data) {
  return request.get(`/store/coupon/send/lst`, data)
}
/**
 * @description 平台优惠劵 -- 发送
 */
 export function couponSendApi(data) {
  return request.post(`store/coupon/send`, data)
}

/**
 * @description 优惠券模板 -- 列表
 */
export function couponListApi(data) {
  return request.get('store/coupon/lst', data)
}
/**
 * @description 优惠券列表 -- 详情
 */
export function couponDetailApi(coupon_id) {
  return request.get(`store/coupon/detail/${coupon_id}`)
}
/**
 * @description 优惠券模板 -- 新增表单
 */
export function couponCreateApi() {
  return request.get('store/coupon/create/form')
}
/**
 * @description 优惠券模板 -- 编辑表单
 */
export function couponUpdateApi(id) {
  return request.get(`store/coupon/update/form/${id}`)
}
/**
 * @description 优惠券模板 -- 发布优惠券
 */
export function couponIssueApi(id) {
  return request.get(`store/coupon/issue/create/form/${id}`)
}

/**
 * @description 已发布优惠券 -- 列表
 */
export function couponIssueListApi(data) {
  return request.get('store/coupon/lst', data)
}
/**
 * @description 已发布优惠券 -- 修改状态
 */
export function couponIssueStatusApi(id, status) {
  return request.post(`store/coupon/status/${id}`, { status })
}
/**
 * @description 已发布优惠券 -- 添加优惠券
 */
export function couponIssuePushApi() {
  return request.get(`store/coupon/create/form`)
}
/**
 * @description 优惠券列表 -- 删除
 */
export function couponIssueDeleteApi(id) {
  return request.delete(`store/coupon/issue/${id}`)
}
/**
 * @description 优惠券列表 -- 复制
 */
export function couponCloneApi(id) {
  return request.get(`store/coupon/clone/form/${id}`)
}
/**
 * @description 优惠券列表 -- 领取记录
 */
export function issueApi(data) {
  return request.get(`store/coupon/issue`, data)
}
/**
 * @description 赠送优惠券组件列表 -- 列表
 */
export function couponSelectApi(data) {
  return request.get(`store/coupon/select`, data)
}
/**
 * @description 优惠劵 -- 删除
 */
export function couponDeleteApi(coupon_id) {
  return request.delete(`store/coupon/delete/${coupon_id}`)
}
/**
 * @description 直播间 -- 直播间列表
 */
export function broadcastListApi(data) {
  return request.get(`broadcast/room/lst`, data)
}
/**
 * @description 直播间 -- 修改回放状态
 */
export function changeReplayApi(id, data) {
  return request.post(`broadcast/room/live_status/${id}`, data)
}
/**
 * @description 直播间 -- 修改显示状态
 */
export function changeDisplayApi(id, data) {
  return request.post(`broadcast/room/status/${id}`, data)
}
/**
 * @description 直播间 -- 删除
 */
export function broadcastDeleteApi(id) {
  return request.delete(`broadcast/room/delete/${id}`)
}
/**
 * @description 直播间 -- 审核
 */
export function broadcastAuditApi(id) {
  return request.get(`broadcast/room/apply/form/${id}`)
}
/**
 * @description 直播间 -- 直播间详情
 */
export function broadcastDetailApi(id) {
  return request.get(`broadcast/room/detail/${id}`)
}
/**
 * @description 直播间 -- 备注
 */
export function broadcastRemarksApi(id, mark) {
  return request.post(`broadcast/room/mark/${id}`, { mark })
}
/**
 * @description 直播间 -- 开启收录
 */
 export function openCollectionApi(id, status) {
  return request.post(`broadcast/room/feedsPublic/${id}`, { status })
}
/**
 * @description 直播间 -- 禁言
 */
export function openCommontApi(id, status) {
  return request.post(`broadcast/room/comment/${id}`, { status })
}
/**
 * @description 直播间 -- 客服开关
 */
 export function studioCloseKfApi(id, status) {
  return request.post(`broadcast/room/closeKf/${id}`, { status })
}
/**
 * @description 直播商品 -- 列表
 */
export function broadcastProListApi(data) {
  return request.get(`broadcast/goods/lst`, data)
}
/**
 * @description 直播间商品 -- 直播间商品详情
 */
export function broadcastProDetailApi(id) {
  return request.get(`broadcast/goods/detail/${id}`)
}
/**
 * @description 直播间商品 -- 修改显示状态
 */
export function changeProDisplayApi(id, data) {
  return request.post(`broadcast/goods/status/${id}`, data)
}
/**
 * @description 直播间商品 -- 审核
 */
export function applyBroadcastProApi(id) {
  return request.get(`broadcast/goods/apply/form/${id}`)
}
/**
 * @description 秒杀 -- 秒杀配置
 */
export function spikeConfigurationApi() {
  return request.get(`seckill/config/create/form`)
}
/**
 * @description 秒杀 -- 秒杀配置列表
 */
export function spikeConfigLstApi(data) {
  return request.get(`seckill/config/lst`, data)
}
/**
 * @description 秒杀 -- 秒杀配置编辑
 */
export function spikeConfigUpdateApi(id) {
  return request.get(`seckill/config/update/${id}/form`)
}
/**
 * @description 秒杀 -- 秒杀配置删除
 */
export function spikeConfigDeleteApi(id) {
  return request.delete(`seckill/config/delete/${id}`)
}
/**
 * @description 秒杀 -- 秒杀配置编辑
 */
export function spikeConfigStatusApi(id, status) {
  return request.post(`seckill/config/status/${id}`, { status })
}
/**
 * @description 秒杀活动 -- 查看详情
 */
export function seckillDetailApi(id, data) {
    return request.get(`seckill/product/detail/${id}`, data)
}
/**
 * @description 直播间 -- 直播间商品
 */
export function studioProList(id,data) {
  return request.get(`broadcast/room/goods/${id}`, data)
}
/**
 * @description 直播间商品 -- 删除
 */
export function broadcastProDeleteApi(broadcast_goods_id) {
  return request.delete(`broadcast/goods/delete/${broadcast_goods_id}`)
}
/**
 * @description 直播间 -- 编辑-排序
 */
export function broadcastRoomSortApi(broadcast_room_id,data) {
  return request.post(`broadcast/room/sort/${broadcast_room_id}`,data)
}
/**
 * @description 直播间商品 -- 编辑-排序
 */
export function broadcastProSortApi(broadcast_goods_id,data) {
  return request.post(`broadcast/goods/sort/${broadcast_goods_id}`,data)
}
/**
 * @description 拼团活动 -- 设置
 */
export function combinationSetApi(data) {
    return request.post(`config/others/group_buying`,data)
}
/**
 * @description 拼团活动 -- 获取数据
 */
export function combinationDataApi() {
    return request.get(`config/others/group_buying`)
}
/**
 * @description 拼团 -- 列表
 */
export function combinationProListApi(data) {
    return request.get(`store/product/group/lst`, data)
  }

  /**
   * @description 拼团列表 -- 详情(编辑和查看)
   */
  export function combinationProUpdateApi(id) {
    return request.get(`store/product/group/get/${id}`)
  }
  /**
   * @description 拼团列表 -- 详情(审核)
   */
  export function combinationProDetailApi(id) {
    return request.get(`store/product/group/detail/${id}`)
  }

  /**
   * @description 拼团商品列表 -- 删除
   */
  export function combinationDeleteApi(id) {
    return request.delete(`store/product/group/delete/${id}`)
  }
  /**
   * @description 拼团商品审核 -- 表单提交
   */
  export function combinationProductStatusApi(data) {
    return request.post(`store/product/group/status`, data)
  }
  /**
   * @description 拼团商品列表 -- 显示状态（上下架）
   */
  export function combinationStatusApi(id, status) {
    return request.post(`store/product/group/is_show/${id}`, { status })
  }
/**
 * @description 拼团商品 -- 详情(编辑和查看)
 */
  export function combinationReviewDetailApi(id) {
    return request.get(`store/product/group/get/${id}`)
  }
  /**
   * @description 拼团商品 -- 详情(编辑和查看)
   */
  export function combinationProductUpdateApi(id,data) {
    return request.post(`store/product/group/update/${id}`,data)
  }
 /**
 * @description 拼团活动 -- 活动列表
 */
export function combinationActivityLst(data) {
    return request.get(`store/product/group/buying/lst`,data)
}
  /**
 * @description 拼团活动 -- 查看详情
 */
export function combinationDetailApi(id, data) {
    return request.get(`store/product/group/buying/detail/${id}`, data)
}
/**
 * @description 优惠券详情 -- 关联商品列表
 */
export function couponRelateProLst(id, data) {
    return request.get(`store/coupon/product/${id}`, data)
}
/**
 * @description 积分日志 -- 头部
 */
export function integralLogTitle() {
    return request.get(`user/integral/title`)
}
/**
 * @description 积分日志 -- 列表
 */
export function integralLogLst(data) {
    return request.get(`user/integral/lst`, data)
}
/**
 * @description 积分日志 -- 导出
 */
export function signLogExport(data) {
    return request.get(`user/integral/excel`, data)
}
/**
 * @description 签到配置 -- 列表
 */
export function signConfigLst(data) {
    return request.get(`user/integral/sign_config`, data)
}
/**
 * @description 积分配置 -- 获取
 */
export function getIntegralConfig() {
    return request.get(`user/integral/config`)
}
/**
 * @description 积分配置 -- 修改
 */
export function updateIntegralConfig(data) {
    return request.post(`user/integral/config`, data)
}
/**
 * @description 套餐列表 -- 列表数据
 */
 export function discountsList(data) {
  return request.get(`discounts/lst`,data)
}

/**
 * @description 套餐列表 -- 显示状态（上下架）
 */
 export function discountsChangeStatus(id, status) {
  return request.post(`discounts/status/${id}`, { status })
}
/**
 * @description 套餐列表 -- 详情
 */
 export function discountsGetDetails(id) {
  return request.get(`discounts/detail/${id}`)
}
/**
 * @description 套餐列表 -- 删除
 */
 export function discountsDelete(id) {
  return request.delete(`discounts/delete/${id}`)
}
/**
 * @description 氛围图 -- 选择商品列表
 */
 export function selectProductList(data) {
  return request.get(`marketing/spu/lst`,data)
}
/**
 * @description 氛围图 -- 创建氛围图
 */
  export function createAtuosphere(data) {
  return request.post(`activity/atmosphere/create`,data)
}
/**
 * @description 氛围图 -- 编辑氛围图
 */
 export function atuosphereUpdateApi(id, data) {
  return request.post(`activity/atmosphere/update/${id}`,data)
}
/**
 * @description 氛围图 -- 氛围图列表
 */
 export function atuosphereList(data) {
  return request.get(`activity/atmosphere/lst`,data)
}
/**
 * @description 氛围图 -- 详情
 */
 export function atuosphereDetailApi(id) {
  return request.get(`activity/atmosphere/detail/${id}`)
}
/**
 * @description 套餐列表 -- 显示状态（上下架）
 */
 export function atmosphereStatusApi(id, status) {
  return request.post(`activity/atmosphere/status/${id}`, { status })
}
/**
 * @description 套餐列表 -- 删除
 */
 export function atmosphereDelete(id) {
  return request.delete(`activity/atmosphere/delete/${id}`)
}
/**
 * @description 商品边框 -- 创建边框
 */
 export function createBorder(data) {
  return request.post(`activity/border/create`,data)
}
/**
 * @description 商品边框 -- 编辑边框
 */
 export function borderUpdateApi(id, data) {
  return request.post(`activity/border/update/${id}`,data)
}
/**
 * @description 商品边框 -- 边框列表
 */
 export function borderList(data) {
  return request.get(`activity/border/lst`,data)
}
/**
 * @description 商品边框 -- 详情
 */
 export function borderDetailApi(id) {
  return request.get(`activity/border/detail/${id}`)
}
/**
 * @description 商品边框 -- 显示状态（上下架）
 */
 export function borderStatusApi(id, status) {
  return request.post(`activity/border/status/${id}`, { status })
}
/**
 * @description 商品边框列表 -- 删除
 */
 export function borderDelete(id) {
  return request.delete(`activity/border/delete/${id}`)
}
/**
 * @description 积分商品分类 -- 列表
 */
export function integralCategoryListApi() {
  return request.get('points/cate/lst')
}
/**
 * @description 积分商品分类 -- 新增表单
 */
export function integralCategoryCreateApi() {
  return request.get('points/cate/create/form')
}
/**
 * @description 积分商品分类 -- 编辑表单
 */
export function integralCategoryUpdateApi(id) {
  return request.get(`points/cate/update/form/${id}`)
}
/**
 * @description 积分商品分类 -- 删除
 */
export function integralCategoryDeleteApi(id) {
  return request.delete(`points/cate/delete/${id}`)
}
/**
 * @description 积分商品分类 -- 修改状态
 */
export function integralCategoryStatusApi(id, status) {
  return request.post(`points/cate/status/${id}`, { status })
}
/**
 * @description 积分商品 -- 创建商品
 */
export function createIntegralProduct(data) {
  return request.post(`points/product/create`,data)
}
/**
 * @description 积分商品 -- 编辑商品
 */
 export function integralProUpdateApi(id, data) {
  return request.post(`points/product/update/${id}`,data)
}
/**
 * @description 积分商品 -- 商品列表
 */
 export function integralProList(data) {
  return request.get(`points/product/lst`,data)
}
/**
 * @description 积分商品 -- 删除
 */
export function integralProDeleteApi(id) {
  return request.delete(`points/product/delete/${id}`)
}
/**
 * @description 积分商品 -- 修改状态
 */
export function integralProductStatusApi(id, status) {
  return request.post(`points/product/status/${id}`, { status })
}
/** 积分商品列表 -- 立即生成规格 */
export function generateAttrApi(id,data) {
  return request.post(`points/product/get_attr_value/${id}`, data)
}
/** 积分商品 -- 商品分类选择 */
export function integralProCateSelect() {
  return request.get(`points/cate/select`)
}
/** 积分商品 -- 商品详情 */
export function integralProDetailApi(id) {
  return request.get(`points/product/detail/${id}`)
}
/** 积分订单 -- 列表 */
export function integralOrderLstApi(data) {
  return request.get(`points/order/lst`, data)
}
/** 积分订单 -- 详情 */
export function integralOrderDetailApi(id) {
  return request.get(`points/order/detail/${id}`)
}
/** 积分订单 -- 快递查询 */
export function integralOrderExpressApi(id) {
  return request.get(`points/order/express/${id}`)
}
/** 积分订单 -- 导出 */
export function integralOrderExcelApi(data) {
  return request.get(`points/order/excel`, data)
}
/** 积分订单 -- 发货 */
export function integralDelivery(id, data) {
  return request.post(`points/order/delivery/${id}`, data)
}
/** 积分订单 -- 批量发货 */
export function integralBatchDelivery(data) {
  return request.post(`points/order/delivery`, data)
}
/** 积分订单 -- 快递公司列表 */
export function expressOptionsApi(data) {
  return request.get(`store/express/options`, data)
}
/** 积分订单 -- 备注 */
export function integralMarkApi(id) {
  return request.get(`points/order/mark/${id}/form`)
}
/** 积分订单 -- 订单记录 */
export function integralOrderLog(id,data) {
  return request.get(`points/order/status/${id}`, data)
}
/**
 * @description 积分订单 -- 删除
 */
export function integralOrderDeleteApi(id) {
  return request.delete(`points/order/delete/${id}`)
}

