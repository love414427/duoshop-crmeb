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
 * @description 属性规则 -- 列表
 */
export function templateListApi(data) {
  return request.get('store/attr/template/lst', data)
}
/**
 * @description 属性规则 -- 添加
 */
export function attrCreatApi(data) {
  return request.post('store/attr/template/create', data)
}
/**
 * @description 属性规则 -- 编辑
 */
export function attrEdittApi(id, data) {
  return request.post(`store/attr/template/${id}`, data)
}
/**
 * @description 属性规则 -- 删除
 */
export function attrDeleteApi(id) {
  return request.delete(`store/attr/template/${id}`)
}
/**
 * @description 商品添加 -- 属性规则
 */
export function templateLsitApi() {
  return request.get(`/store/attr/template/list`)
}
/**
 * @description 商品列表 -- 列表
 */
export function productLstApi(data) {
  return request.get(`store/product/lst`, data)
}
/**
 * @description 商品列表 -- 删除
 */
export function productDeleteApi(id) {
  return request.delete(`store/product/delete/${id}`)
}
/**
 * @description 秒杀商品列表 -- 删除
 */
export function spikeProductDeleteApi(id) {
  return request.delete(`store/seckill_product/delete/${id}`)
}
/**
 * @description 商品列表 -- 添加
 */
export function productCreateApi(data) {
  return request.post(`store/product/create`, data)
}
/**
 * @description 商品列表 -- 预览
 */
export function productPreviewApi(data) {
  return request.post(`store/product/preview`, data)
}
/**
 * @description 商品列表 -- 复制
 */
export function productCopyApi(data) {
  return request.post(`store/productcopy/save`, data)
}
/**
 * @description 秒杀品列表 -- 添加
 */
export function seckillProductCreateApi(data) {
  return request.post(`store/seckill_product/create`, data)
}
/**
 * @description 秒杀 -- 预览
 */
export function seckillPreviewApi(data) {
  return request.post(`store/seckill_product/preview`, data)
}
/**
 * @description 商品列表 -- 编辑
 */
export function productUpdateApi(id, data) {
  return request.post(`store/product/update/${id}`, data)
}
/**
 * @description 商品列表 -- 详情
 */
export function productDetailApi(id) {
  return request.get(`store/product/detail/${id}`)
}
/**
 * @description 秒杀商品 -- 详情
 */
export function seckillProductDetailApi(id) {
  return request.get(`store/seckill_product/detail/${id}`)
}
/**
 * @description 商品列表 -- 商户分类
 */
export function categorySelectApi() {
  return request.get(`store/category/select`)
}

/**
 * @description 商品列表 -- 平台分类
 */
export function categoryListApi() {
  return request.get(`store/category/list`)
}
/**
 * @description 商品列表 -- 品牌分类
 */
export function categoryBrandListApi() {
  return request.get(`store/category/brandlist`)
}
/**
 * @description 商品列表 -- 运费模板筛选
 */
export function shippingListApi() {
  return request.get(`store/shipping/list`)
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
export function spikelstFilterApi() {
  return request.get(`store/seckill_product/lst_filter`)
}
/**
 * @description 商品列表 -- 上下架
 */
export function statusApi(id, status) {
  return request.post(`store/product/status/${id}`, { status })
}
/**
 * @description 秒杀商品列表 -- 上下架
 */
export function spikeStatusApi(id, status) {
  return request.post(`store/seckill_product/status/${id}`, { status })
}
/**
 * @description 组件商品列表 -- 列表
 */
export function goodLstApi(data) {
  return request.get(`store/product/list`, data)
}
/**
 * @description 配置状态
 */
export function productConfigApi() {
  return request.get(`store/product/config`)
}
/**
 * @description 商品列表 -- 评价列表
 */
export function reviewLstApi(data) {
  return request.get(`store/reply/lst`, data)
}
/**
 * @description 商品列表 -- 评价回复
 */
export function reviewReplyApi(id) {
  return request.get(`store/reply/form/${id}`)
}
/**
 * @description 商品列表 -- 评价回复
 */
export function destoryApi(id) {
  return request.delete(`store/product/destory/${id}`)
}
/**
 * @description 秒杀商品列表 -- 加入回收站
 */
export function spikeDestoryApi(id) {
  return request.delete(`store/seckill_product/destory/${id}`)
}
/**
 * @description 商品列表 -- 恢复
 */
export function restoreApi(id) {
  return request.post(`store/product/restore/${id}`)
}
/**
 * @description 秒杀商品列表 -- 恢复
 */
export function spikeRestoreApi(id) {
  return request.post(`store/seckill_product/restore/${id}`)
}
/**
 * @description 商品列表 -- 复制商品
 */
export function crawlFromApi(data) {
  return request.get(`store/productcopy/get`, data)
}
/**
 * @description 秒杀商品列表 -- 列表
 */
export function seckillProductLstApi(data) {
  return request.get(`store/seckill_product/lst`, data)
}
/**
 * @description 秒杀商品 -- 可选时间表
 */
export function seckillProTimeApi() {
  return request.get(`store/seckill_product/lst_time`)
}
/**
 * @description 秒杀商品列表 -- 编辑
 */
export function seckillProductUpdateApi(id, data) {
  return request.post(`store/seckill_product/update/${id}`, data)
}
/**
 * @description 复制商品 -- 剩余次数
 */
export function productCopyCountApi() {
  return request.get(`store/productcopy/count`)
}
/**
 * @description 复制商品 -- 复制记录
 */
export function productCopyRecordApi(data) {
  return request.get(`store/productcopy/lst`, data)
}
/**
 * @description 预售 -- 添加预售商品
 */
export function preSaleCreateProApi(data) {
  return request.post(`store/product/presell/create`, data)
}
/**
 * @description 预售 -- 编辑预售商品
 */
export function preSaleUpdateProApi(id, data) {
  return request.post(`store/product/presell/update/${id}`, data)
}
/**
 * @description 预售 -- 列表
 */
export function preSaleProListApi(data) {
  return request.get(`store/product/presell/lst`, data)
}
/**
 * @description 预售商品 -- 详情
 */
export function preSaleProDetailApi(id) {
  return request.get(`store/product/presell/detail/${id}`)
}
/**
 * @description 预售商品 -- 头部数量
 */
export function preSaleProUnmApi() {
  return request.get(`store/product/presell/number`)
}
/**
 * @description 预售商品列表 -- 显示状态（上下架）
 */
export function presellStatusApi(id, status) {
  return request.post(`store/product/presell/status/${id}`, { status })
}
/**
 * @description 预售商品列表 -- 删除
 */
export function preSellDeleteApi(id) {
  return request.delete(`store/product/presell/delete/${id}`)
}
/**
 * @description 预售 -- 预览
 */
export function presellPreviewApi(data) {
  return request.post(`store/product/presell/preview`, data)
}
/**
 * @description 拼团 -- 预览
 */
export function groupPreviewApi(data) {
  return request.post(`store/product/group/preview`, data)
}
/**
 * @description 助力 -- 添加助力商品
 */
export function assistCreateProApi(data) {
  return request.post(`store/product/assist/create`, data)
}
/**
 * @description 助力 -- 编辑助力商品
 */
export function assistUpdateProApi(id, data) {
  return request.post(`store/product/assist/update/${id}`, data)
}
/**
 * @description 助力 -- 列表
 */
export function assistProListApi(data) {
  return request.get(`store/product/assist/lst`, data)
}
/**
 * @description 助力商品 -- 详情
 */
export function assistProDetailApi(id) {
  return request.get(`store/product/assist/detail/${id}`)
}
/**
 * @description 助力 -- 预览
 */
export function assistPreviewApi(data) {
  return request.post(`store/product/assist/preview`, data)
}
/**
 * @description 助力商品列表 -- 删除
 */
export function assistDeleteApi(id) {
  return request.delete(`store/product/assist/delete/${id}`)
}
/**
 * @description 助力活动 -- 列表
 */
export function assistListApi(data) {
  return request.get(`store/product/assist_set/lst`, data)
}
/**
 * @description 助力商品列表 -- 显示状态（上下架）
 */
export function assistStatusApi(id, status) {
  return request.post(`store/product/assist/status/${id}`, { status })
}
/**
 * @description 助力活动列表 -- 查看详情
 */
export function assistDetailApi(id, data) {
  return request.get(`store/product/assist_set/detail/${id}`, data)
}
/**
 * @description 助力活动列表 -- 查看详情
 */
export function productGetTempKeysApi() {
  return request.get(`store/product/temp_key`)
}
/**
 * @description 普通商品 -- 列表排序
 */
export function productSort(id, data) {
  return request.post(`/store/product/sort/${id}`, data)
}

/**
 * @description 评论 -- 列表排序
 */
export function reviewsSort(id, data) {
  return request.post(`/store/reply/sort/${id}`, data)
}
/**
 * @description 服务保障 -- 添加
 */
export function guaranteeAddApi(data) {
  return request.post(`guarantee/create`, data)
}
/**
 * @description 服务保障 -- 列表
 */
export function guaranteeLstApi(data) {
  return request.get(`guarantee/lst`, data)
}
/**
 * @description 服务保障 -- 编辑排序
 */
export function guaranteeSortApi(id, data) {
  return request.post(`guarantee/sort/${id}`, data)
}
/**
 * @description 服务保障 -- 编辑
 */
export function guaranteeUpdateApi(id, data) {
  return request.post(`guarantee/update/${id}`, data)
}
/**
 * @description 服务保障 -- 详情
 */
export function guaranteeDetailApi(id) {
  return request.get(`guarantee/detail/${id}`)
}
/**
 * @description 服务保障 -- 删除
 */
export function guaranteeDeleteApi(id) {
  return request.delete(`guarantee/delete/${id}`)
}
/**
 * @description 服务保障 -- 获取平台条款
 */
export function guaranteeSelectApi(data) {
  return request.get(`guarantee/select`, data)
}
/**
 * @description 服务保障 -- 修改显示状态
 */
export function guaranteeStatusApi(id, status) {
  return request.post(`guarantee/status/${id}`, status)
}
/**
 * @description 添加商品 -- 获取服务保障模板列表
 */
export function guaranteeListApi() {
  return request.get(`guarantee/list`)
}

/*
  上传视频 local
*/
export function uploadVideoOfLocal(data) {
  return request.post('upload/video', data)
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
  return request.post(`store/seckill_product/labels/${id}`, data)
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
/** 商品列表 -- 免审核编辑 */
export function freeTrialApi(id, data) {
  return request.post(`store/product/free_trial/${id}`, data)
}
/** 商品列表 -- 批量上下架 */
export function batchesOnOffApi(data) {
  return request.post(`store/product/batch_status`, data)
}
/** 商品列表 -- 批量设置标签 */
export function batchesLabelsApi(data) {
  return request.post(`store/product/batch_labels`, data)
}
/** 商品列表 -- 批量设置运费模板 */
export function batchesTempApi(data) {
  return request.post(`store/product/batch_temp`, data)
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
/** 参数模板 -- 详情 */
export function specsDetailApi(id) {
  return request.get(`store/params/temp/detail/${id}`)
}
/** 添加商品 -- 参数筛选 */
export function specsSelectedApi(data) {
  return request.get(`store/params/temp/select`,data)
}
/** 添加商品 -- 参数筛选详情 */
export function productSpecsDetailApi(data) {
  return request.get(`store/params/temp/show`, data)
}
/** 商品列表 -- 批量设置佣金 */
export function productBathExtApi(data) {
  return request.post(`store/product/batch_ext`, data)
}
/** 商品列表 -- 批量设置会员价 */
export function productBathSvipApi(data) {
  return request.post(`store/product/batch_svip`, data)
}
/** 商品列表 -- 立即生成规格 */
export function generateAttrApi(id,data) {
  return request.post(`store/product/get_attr_value/${id}`, data)
}