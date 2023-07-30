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
 * @description 优惠券模板 -- 列表
 */
export function couponListApi(data) {
  return request.get('store/coupon/lst', data)
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
  return request.get(`store/coupon/update/${id}/form`)
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
 * @description 优惠券列表 -- 详情
 */
export function couponDetailApi(coupon_id) {
  return request.get(`store/coupon/detail/${coupon_id}`)
}
/**
 * @description 优惠劵 -- 删除
 */
export function couponDeleteApi(coupon_id) {
  return request.delete(`store/coupon/delete/${coupon_id}`)
}
/**
 * @description 优惠劵 -- 发送
 */
export function couponSendApi(data) {
  return request.post(`store/coupon/send`, data)
}
/**
 * @description 优惠券发送记录 -- 列表
 */
export function couponSendLstApi(data) {
  return request.get(`store/coupon_send/lst`, data)
}
/**
 * @description 直播间 -- 创建直播间
 */
export function createBroadcastApi() {
  return request.get(`broadcast/room/create/form`)
}

/**
 * @description 直播间 -- 直播间列表
 */
export function broadcastListApi(data) {
  return request.get(`broadcast/room/lst`, data)
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
 * @description 直播间商品 -- 创建直播间商品
 */
export function createBroadcastProApi() {
  return request.get(`broadcast/goods/create/form`)
}
/**
 * @description 直播间商品 -- 编辑
 */
export function updateBroadcastApi(id) {
  return request.get(`broadcast/goods/update/form/${id}`)
}
/**
 * @description 直播间商品 -- 直播间商品列表
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
 * @description 直播间商品 -- 修改显示状态（上下架）
 */
export function changeProDisplayApi(id, data) {
  return request.post(`broadcast/goods/status/${id}`, data)
}
/**
 * @description 直播间 -- 商品导入
 */
export function broadcastGoodsImportApi(data) {
  return request.post(`broadcast/room/export_goods`, data)
}
/**
 * @description 直播间 -- 备注
 */
export function broadcastProRemarksApi(id, mark) {
  return request.post(`broadcast/goods/mark/${id}`, { mark })
}

/**
 * @description 直播间-- 修改显示状态（上下架）
 */
export function changeStudioRoomDisplayApi(id, data) {
  return request.post(`broadcast/room/status/${id}`, data)
}
/**
 * @description 直播间 -- 直播间商品
 */
export function studioProList(id, data) {
  return request.get(`broadcast/room/goods/${id}`, data)
}
/**
 * @description 直播间商品 -- 删除
 */
export function broadcastProDeleteApi(broadcast_goods_id) {
  return request.delete(`broadcast/goods/delete/${broadcast_goods_id}`)
}
/**
 * @description 直播间 -- 删除
 */
export function broadcastDeleteApi(broadcast_room_id) {
  return request.delete(`broadcast/room/delete/${broadcast_room_id}`)
}
/**
 * @description 直播间商品 -- 批量添加
 */
export function batchAddBroadcastGoodsApi(data) {
  return request.post(`broadcast/goods/batch_create`, data)
}
/**
 * @description 直播间 -- 开启收录
 */
export function openCollectionApi(id, status) {
  return request.post(`broadcast/room/feedsPublic/${id}`, { status })
}
/**
 * @description 直播间 -- 商品上下架
 */
export function studioProShowApi(id, data) {
  return request.post(`broadcast/room/on_sale/${id}`, data)
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
 * @description 直播间 -- 推送消息
 */
export function studioPushMessageApi(id) {
  return request.get(`broadcast/room/push_message/${id}`)
}
/**
 * @description 直播间已导入商品 -- 删除
 */
export function broadcastGoodsDeleteApi(data) {
  return request.post(`broadcast/room/rm_goods`, data)
}
/**
 * @description 直播间 -- 编辑
 */
export function studioEdit(id) {
  return request.get(`broadcast/room/update/form/${id}`)
}
/**
 * @description 直播间 -- 添加助手
 */
export function studioAssistantAdd() {
  return request.get(`broadcast/assistant/create/form`)
}
/**
 * @description 直播间 -- 编辑助手
 */
export function studioAssistantUpdate(id) {
  return request.get(`broadcast/assistant/update/${id}/form`)
}
/**
 * @description 直播间 -- 删除助手
 */
export function studioAssistantDelete(id) {
  return request.delete(`broadcast/assistant/delete/${id}`)
}
/**
 * @description 直播间 -- 直播助手列表
 */
export function studioAssistant(data) {
  return request.get(`broadcast/assistant/lst`, data)
}
/**
 * @description 直播间 -- 编辑直播助手
 */
export function studioEditAssistant(id) {
  return request.get(`broadcast/room/addassistant/form/${id}`)
}
/**
 * @description 拼团 -- 获取数据
 */
export function combinationDataApi() {
  return request.get(`config/others/group_buying`)
}
/**
 * @description 拼团 -- 创建拼团商品
 */
export function combinationCreateProApi(data) {
  return request.post(`store/product/group/create`, data)
}
/**
 * @description 拼团 -- 编辑拼团商品
 */
export function combinationProUpdateApi(id, data) {
  return request.post(`store/product/group/update/${id}`, data)
}
/**
 * @description 拼团 -- 商品列表
 */
export function combinationProLst(data) {
  return request.get(`store/product/group/lst`, data)
}
/**
 * @description 拼团 -- 商品列表（查看详情）
 */
export function combinationProDetailApi(id) {
  return request.get(`store/product/group/detail/${id}`)
}
/**
 * @description 拼团 -- 商品列表（删除）
 */
export function combinationProDeleteApi(id) {
  return request.delete(`store/product/group/delete/${id}`)
}
/**
 * @description 拼团商品列表 -- 显示状态（上下架）
 */
export function combinationStatusApi(id, status) {
  return request.post(`store/product/group/status/${id}`, { status })
}
/**
 * @description 拼团活动 -- 活动列表
 */
export function combinationActivityLst(data) {
  return request.get(`store/product/group/buying/lst`, data)
}
/**
 * @description 拼团活动 -- 查看详情
 */
export function combinationDetailApi(id, data) {
  return request.get(`store/product/group/buying/detail/${id}`, data)
}
/**
 * @description 秒杀活动 -- 查看详情
 */
export function seckillDetailApi(id, data) {
  return request.get(`store/seckill_product/detail/${id}`, data)
}
/**
 * @description 拼团商品 -- 列表排序
 */
export function combinationProSort(id, data) {
  return request.post(`/store/product/group/sort/${id}`, data)
}
/**
 * @description 秒杀商品 -- 列表排序
 */
export function seckillProSort(id, data) {
  return request.post(`/store/seckill_product/sort/${id}`, data)
}
/**
 * @description 预售商品 -- 列表排序
 */
export function presellProSort(id, data) {
  return request.post(`/store/product/presell/sort/${id}`, data)
}
/**
 * @description 助力商品 -- 列表排序
 */
export function assistProSort(id, data) {
  return request.post(`/store/product/assist/sort/${id}`, data)
}
/**
 * @description 优惠券详情 -- 关联商品列表
 */
export function couponRelateProLst(id, data) {
  return request.get(`/store/coupon/product/${id}`, data)
}
/**
 * @description 积分 -- 积分配置
 */
export function integralConfigApi(key) {
  return request.get(`config/${key}`)
}
/**
 * @description 积分 -- 积分统计
 */
export function integralTitleApi() {
  return request.get(`integral/title`)
}
/**
 * @description 积分 -- 积分列表
 */
export function integralLstApi(data) {
  return request.get(`integral/lst`, data)
}
/**
 * @description 创建套餐 -- 获取商品规格
 */
 export function productAttrsApi(id) {
  return request.get(`store/product/attr_value/${id}`)
}
/**
 * @description 创建套餐 -- 获取商品规格
 */
 export function discountsSave(data) {
  return request.post(`discounts/create`,data)
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
 * @description 创建套餐 -- 获取商品规格
 */
 export function discountsUpdate(id, data) {
  return request.post(`discounts/update/${id}`,data)
}
