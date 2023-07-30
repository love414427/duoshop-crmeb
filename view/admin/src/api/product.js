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
/*
  上传视频 local
*/
export function uploadVideoOfLocal(data) {
  return request.post('upload/video', data)
}
/**
 * @description 商品分类 -- 列表
 */
export function storeCategoryListApi() {
  return request.get('store/category/lst')
}
/**
 * @description 商品分类 -- 新增表单
 */
export function storeCategoryCreateApi() {
  return request.get('store/category/create/form')
}
/**
 * @description 商品分类 -- 编辑表单
 */
export function storeCategoryUpdateApi(id) {
  return request.get(`store/category/update/form/${id}`)
}
/**
 * @description 商品分类 -- 删除
 */
export function storeCategoryDeleteApi(id) {
  return request.delete(`store/category/delete/${id}`)
}
/**
 * @description 商品分类 -- 修改状态
 */
export function storeCategoryStatusApi(id, status) {
  return request.post(`store/category/status/${id}`, { status })
}
/**
 * @description 商品分类 -- 是否推荐
 */
export function storeCategoryRecommendApi(id, status) {
  return request.post(`store/category/is_hot/${id}`, { status })
}
/**
 * @description 品牌分类 -- 列表
 */
export function brandCategoryListApi(data) {
  return request.get('store/brand/category/lst', data)
}
/**
 * @description 品牌分类 -- 新增表单
 */
export function brandCategoryCreateApi() {
  return request.get('store/brand/category/create/form')
}
/**
 * @description 品牌分类 -- 编辑表单
 */
export function brandCategoryUpdateApi(id) {
  return request.get(`store/brand/category/update/form/${id}`)
}
/**
 * @description 品牌分类 -- 删除
 */
export function brandCategoryDeleteApi(id) {
  return request.delete(`store/brand/category/delete/${id}`)
}
/**
 * @description 品牌分类 -- 修改状态
 */
export function brandCategoryStatusApi(id, status) {
  return request.post(`store/brand/category/status/${id}`, { status })
}
/**
 * @description 品牌 -- 列表
 */
export function brandListApi(data) {
  return request.get('store/brand/lst', data)
}
/**
 * @description 品牌 -- 新增表单
 */
export function brandCreateApi() {
  return request.get('store/brand/create/form')
}
/**
 * @description 品牌 -- 编辑表单
 */
export function brandUpdateApi(id) {
  return request.get(`store/brand/update/form/${id}`)
}
/**
 * @description 品牌 -- 删除
 */
export function brandDeleteApi(id) {
  return request.delete(`store/brand/delete/${id}`)
}
/**
 * @description 品牌列表 -- 修改状态
 */
export function brandStatusApi(id, status) {
  return request.post(`store/brand/status/${id}`, { status })
}
/**
 * @description 标签 -- 新增表单
 */
 export function labelCreateApi() {
    return request.get('product/label/create/form')
}
/**
 * @description 标签 -- 编辑表单
 */
 export function labelUpdateApi(id) {
    return request.get(`product/label/update/${id}/form`)
  }
/**
 * @description 标签 -- 列表
 */
 export function labelListApi(data) {
    return request.get('product/label/lst', data)
}
/**
 * @description 标签 -- 删除
 */
 export function labelDeleteApi(id) {
    return request.delete(`product/label/delete/${id}`)
}
/**
 * @description 标签列表 -- 修改状态
 */
 export function labelStatusApi(id, status) {
    return request.post(`product/label/status/${id}`, { status })
}
/**
 * @description 商品列表 -- 列表
 */
export function productLstApi(data) {
  return request.get(`store/product/lst`, data)
}
/**
 * @description 秒杀商品列表 -- 列表
 */
export function seckillProductLstApi(data) {
  return request.get(`seckill/product/lst`, data)
}
/**
 * @description 商品列表 -- 平台分类
 */
export function categoryListApi(data) {
  return request.get(`store/category/list`, data)
}
/**
 * @description 商户分类 -- 列表
 */
export function merCategoryListApi() {
  return request.get(`system/merchant/category_lst`)
}
/**
 * @description 商品审核 -- 详情
 */
export function productDetailApi(id) {
  return request.get(`store/product/detail/${id}`)
}
/**
 * @description 秒杀商品审核 -- 详情
 */
export function seckillProductDetailApi(id) {
  return request.get(`seckill/product/detail/${id}`)
}
/**
 * @description 商品审核 -- 表单提交
 */
export function productStatusApi(data) {
  return request.post(`store/product/status`, data)
}
/**
 * @description 秒杀商品审核 -- 表单提交
 */
export function seckillProductStatusApi(data) {
  return request.post(`seckill/product/status`, data)
}
/**
 * @description 商品列表 -- 列表表头
 */
export function lstFilterApi() {
  return request.get(`store/product/lst_filter`)
}
/**
 * @description 秒杀商品列表 -- 列表表头
 */
export function seckillLstFilterApi() {
  return request.get(`seckill/product/lst_filter`)
}
/**
 * @description 商品评论 -- 列表
 */
export function replyListApi(data) {
  return request.get(`store/reply/lst`, data)
}
/**
 * @description 商品评论 -- 添加
 */
export function replyCreateApi(id) {
  return request.get(id ? `store/reply/create/form/${id}` : `store/reply/create/form`)
}
/**
 * @description 商品评论 -- 删除
 */
export function replyDeleteApi(id) {
  return request.delete(`store/reply/delete/${id}`)
}
/**
 * @description 商品评论商品列表 -- 列表
 */
export function goodLstApi(data) {
  return request.get(`store/product/list`, data)
}
/**
 * @description 商户总
 */
export function merSelectApi() {
  return request.get(`store/product/mer_select`)
}
/**
 * @description 秒杀商户总
 */
export function seckillMerSelectApi() {
  return request.get(`seckill/product/mer_select`)
}
/**
 * @description 商品下架
 */
export function productOffApi(data) {
  return request.post(`store/product/status`, data)
}
/**
 * @description 秒杀商品下架
 */
export function seckillProductOffApi(data) {
  return request.post(`seckill/product/status`, data)
}
/**
 * @description 商品编辑
 */
export function productUpdateApi(id, data) {
  return request.post(`store/product/update/${id}`, data)
}
/**
 * @description 秒杀商品编辑
 */
export function seckillProductUpdateApi(id, data) {
  return request.post(`seckill/product/update/${id}`, data)
}
/**
 * @description 商品列表 -- 显示隐藏
 */
export function changeApi(id, status) {
  return request.post(`store/product/change/${id}`, { status })
}
/**
 * @description 秒杀商品列表 -- 显示隐藏
 */
export function seckillChangeApi(id, status) {
  return request.post(`seckill/product/change/${id}`, { status })
}
/**
 * @description 商品列表 -- 虚拟库存
 */
export function toVirtualSalesApi(id) {
  return request.get(`store/product/ficti/form/${id}`)
}
/**
 * @description 预售 -- 列表
 */
export function preSaleProListApi(data) {
  return request.get(`store/product/presell/lst`, data)
}
/**
 * @description 预售商品 -- 详情(编辑和查看)
 */
export function preSaleProDetailApi(id) {
  return request.get(`store/product/presell/get/${id}`)
}
/**
 * @description 预售商品 -- 详情(审核)
 */
export function presellProDetailApi(id) {
  return request.get(`store/product/presell/detail/${id}`)
}
/**
 * @description 预售商品 -- 编辑
 */
export function presellUpdateApi(id,data) {
  return request.post(`store/product/presell/update/${id}`,data)
}
/**
 * @description 预售商品审核 -- 表单提交
 */
export function presellProductStatusApi(data) {
  return request.post(`store/product/presell/status`, data)
}
/**
 * @description 预售商品列表 -- 显示状态（上下架）
 */
export function presellStatusApi(id, status) {
  return request.post(`store/product/presell/is_show/${id}`, { status })
}
/**
 * @description 申请管理 -- 预售协议详情
 */
export function preSellAgreeInfo() {
  return request.get(`agreement/sys_product_presell_agree`)
}
/**
 * @description 申请管理 -- 预售协议保存
 */
export function preSellAgreeUpdate(data) {
  return request.post(`agreement/sys_product_presell_agree`,data)
}
/**
 * @description 助力 -- 列表
 */
export function assistProListApi(data) {
  return request.get(`store/product/assist/lst`, data)
}

/**
 * @description 助力列表 -- 详情(编辑和查看)
 */
export function assistProUpdateApi(id) {
  return request.get(`store/product/assist/get/${id}`)
}
/**
 * @description 助力列表 -- 详情(审核)
 */
export function assistProDetailApi(id) {
  return request.get(`store/product/assist/detail/${id}`)
}

/**
 * @description 助力商品列表 -- 删除
 */
export function assistDeleteApi(id) {
  return request.delete(`store/product/assist/delete/${id}`)
}
/**
 * @description 助力商品审核 -- 表单提交
 */
export function assistProductStatusApi(data) {
  return request.post(`store/product/assist/status`, data)
}
/**
 * @description 助力商品列表 -- 显示状态（上下架）
 */
export function assistStatusApi(id, status) {
  return request.post(`store/product/assist/is_show/${id}`, { status })
}
/**
 * @description 助力活动 -- 列表
 */
export function assistListApi(data) {
  return request.get(`store/product/assist/set/lst`, data)
}
/**
 * @description 助力活动列表 -- 查看详情
 */
export function assistDetailApi(id, data) {
  return request.get(`store/product/assist/set/detail/${id}`, data)
}
/**
 * @description 助力商品 -- 详情(编辑和查看)
 */
export function assistReviewDetailApi(id) {
  return request.get(`store/product/assist/get/${id}`)
}
/**
 * @description 助力商品 -- 详情(编辑和查看)
 */
export function assistProductUpdateApi(id,data) {
  return request.post(`store/product/assist/update/${id}`,data)
}
/**
 * @description 服务保障 -- 添加
 */
export function guaranteeAddApi() {
    return request.get(`guarantee/create/form`)
}
/**
 * @description 服务保障 -- 列表
 */
export function guaranteeLstApi(data) {
    return request.get(`guarantee/lst`,data)
}
/**
 * @description 服务保障 -- 编辑排序
 */
export function guaranteeSortApi(id,data) {
    return request.post(`guarantee/sort/${id}`,data)
}
/**
 * @description 服务保障 -- 修改显示状态
 */
export function guaranteeStatusApi(id, status) {
    return request.post(`guarantee/status/${id}`,  status )
}
/**
 * @description 服务保障 -- 编辑
 */
export function guaranteeUpdateApi(id) {
    return request.get(`guarantee/update/${id}/form`)
}
/**
 * @description 服务保障 -- 删除
 */
export function guaranteeDeleteApi(id) {
    return request.delete(`guarantee/delete/${id}`)
}
/**
 * @description 商品列表 -- 编辑排序
 */
export function productSort(id, data) {
    return request.post(`store/reply/sort/${id}`,data)
}
/** 商品列表 -- 获取标签项 */
export function getProductLabelApi() {
    return request.get(`product/label/option`)
}
/** 商品列表 -- 编辑标签 */
export function updatetProductLabel(id, data) {
    return request.post(`store/product/labels/${id}`, data)
}
/** 秒杀列表 -- 编辑标签 */
export function updatetSeckillLabel(id, data) {
    return request.post(`seckill/product/labels/${id}`, data)
}
/** 预售列表 -- 编辑标签 */
  export function updatetPresellLabel(id, data) {
    return request.post(`store/product/presell/labels/${id}`, data)
}
/** 助力列表 -- 编辑标签 */
export function updatetAssistLabel(id, data) {
    return request.post(`store/product/assist/labels/${id}`, data)
}
/** 拼团列表 -- 编辑标签 */
export function updatetCombinationLabel(id, data) {
    return request.post(`store/product/group/labels/${id}`, data)
}
/**
 * @description 上传视频
 */
 export function productGetTempKeysApi() {
  return request.get(`upload/temp_key`)
}
/** 商品列表 -- 批量设置标签 */
export function batchesLabelsApi(data) {
  return request.post(`store/product/batch_labels`, data)
}
/** 商品列表 -- 批量设置推荐 */
export function batchesRecommendApi(data) {
  return request.post(`store/product/batch_hot`, data)
}
/** 商品列表 -- 批量上下架 */
export function batchesOnOffApi(data) {
  return request.post(`store/product/batch_status`, data)
}
/** 价格说明 -- 列表 */
export function priceRuleLstApi(data) {
  return request.get(`price_rule/lst`, data)
}
/** 价格说明 -- 添加 */
export function createPriceRuleApi(data) {
  return request.post(`price_rule/create`, data)
}
/** 价格说明 -- 编辑 */
export function updatePriceRuleApi(id, data) {
  return request.post(`price_rule/update/${id}`, data)
}
/** 价格说明 -- 删除 */
export function deletePriceRuleApi(id) {
  return request.delete(`price_rule/del/${id}`)
}
/** 价格说明 -- 是否显示 */
export function priceRuleStatusApi(id, status) {
  return request.post(`price_rule/status/${id}`,status)
}
/** 参数模板 -- 添加 */
export function productSpecs(data) {
  return request.post(`store/params/temp/create`,data)
}
/** 参数模板 -- 编辑 */
export function specsUpdate(id, data) {
  return request.post(`store/params/temp/update/${id}`,data)
}
/** 参数模板 -- 详情 */
export function productSpecsInfo(id) {
  return request.get(`store/params/temp/detail/${id}`)
}
/** 参数模板 -- 列表 */
export function productSpecsList(data) {
  return request.get(`store/params/temp/lst`, data)
}
/** 参数模板 -- 删除 */
export function specsDeteleApi(id) {
  return request.delete(`store/params/temp/delete/${id}`)
}

/** 商户参数模板 -- 列表 */
export function merSpecsList(data) {
  return request.get(`store/params/temp/merlst`, data)
}
/**
 * @description 商户商品列表 -- 选择弹窗
 */
export function merProductLstApi(data) {
  return request.get(`store/product/list`, data)
}