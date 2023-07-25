// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import request from "@/utils/request.js";

/**
 * 商品列表
 */
export function productLstApi(merId, data) {
	return request.get(`server/${merId}/product/lst`, data, { login: true });
}

/**
 * 商品列表 -- 删除
 */
export function productDeleteApi(merId, id) {
	return request.post(`server/${merId}/product/delete/${id}`, {}, { login: true });
}
/**
 * 商品列表 -- 上下架
 */
export function productOffApi(merId, id, data) {
	return request.post(`server/${merId}/product/status/${id}`, data, { login: true });
}

/*
 售罄商品 -- 列表头部
*/

export function productTitle(merId, data) {
	return request.get(`server/${merId}/product/title`, data, { login: true });
}

/*
	回收站商品，彻底删除
*/

export function productDestory(merId, id, data) {
	return request.post(`server/${merId}/product/destory/${id}`, data, { login: true });
}

/*
	还原
*/

export function productRestore(merId, id) {
	return request.post(`server/${merId}/product/restore/${id}`, {}, { login: true });
}

/*
	添加或修改商品， 获取商品品牌
*/

export function categoryBrandlist(merId) {
	return request.get(`server/${merId}/category/brandlist`, {}, { login: true });
}

/*
	添加修改商品, 获取商户分类
*/

export function categorySelect(merId) {
	return request.get(`server/${merId}/category/select`, {}, { login: true })
}

/*
	添加修改商品， 获取平台分类
*/

export function categoryList(merId) {
	return request.get(`server/${merId}/category/list`, {}, { login: true })
}

/*
	商品管理， 添加商品
*/

export function productCreate(merId, data) {
	return request.post(`server/${merId}/product/create`, data, { login: true })
}
/**
 * 商品列表 -- 设置推荐
 */
export function productRecommendApi(merId, id, data) {
	return request.post(`server/${merId}/product/good/${id}`, data, { login: true });
}

/*
	获取规格列表
*/

export function attrList(merId, data) {
	return request.get(`server/${merId}/attr/lst`, data, { login: true })
}
/*
	请求运费模板
*/
export function templateList(merId, data) {
	return request.get(`server/${merId}/template/lst`, data, { login: true })
}
/*
	运费模板 -- 删除
*/
export function templateDelete(merId, data) {
	return request.post(`server/${merId}/template/delete`, data, { login: true })
}
/**
 * 运费模板 -- 详情
 */
export function templateDetail(merId, id) {
	return request.get(`server/${merId}/template/detail/${id}`, {}, { login: true });
}
/*
	运费模板 -- 添加
*/
export function templateCreate(merId, data) {
	return request.post(`server/${merId}/template/create`, data, { login: true });
}
/*
	运费模板 -- 编辑
*/
export function templateUpdate(merId, id, data) {
	return request.post(`server/${merId}/template/update/${id}`, data, { login: true });
}
/**
 * 店铺分类 -- 列表
 */
export function storeClassifyLst(merId) {
	return request.get(`server/${merId}/category/lst`, {}, { login: true });
}
/**
 * 店铺分类 -- 列表(删除)
 */
export function storeClassifyDel(merId, id) {
	return request.post(`server/${merId}/category/delete/${id}`, {}, { login: true });
}
/**
 * 上级分类 -- 商户列表
 */
export function merClassifyLst(merId) {
	return request.get(`server/${merId}/category/select`, {}, { login: true });
}
/**
 * 店铺分类 -- 添加
 */
export function merClassifyAdd(merId, data) {
	return request.post(`server/${merId}/category/create`, data, { login: true });
}
/**
 * 店铺分类 -- 详情
 */
export function merClassifyDetail(merId, id) {
	return request.get(`server/${merId}/category/detail/${id}`, {}, { login: true });
}
/**
 * 店铺分类 -- 编辑
 */
export function merClassifyUpdate(merId, id, data) {
	return request.post(`server/${merId}/category/update/${id}`, data, { login: true });
}
/**
 * 商品规格项目 -- 列表
 */
export function specificationLst(merId, data) {
	return request.get(`server/${merId}/attr/lst`, data, { login: true });
}
/**
 * 商品规格项目 -- 删除
 */
export function specificationDel(merId, data) {
	return request.post(`server/${merId}/attr/delete`, data, { login: true });
}
/**
 * 商品规格项目 -- 添加
 */
export function specificationAdd(merId, data) {
	return request.post(`server/${merId}/attr/create`, data, { login: true });
}
/**
 * 商品规格项目 -- 编辑
 */
export function specificationUpdate(merId, id, data) {
	return request.post(`server/${merId}/attr/update/${id}`, data, { login: true });
}
/**
 * 商品规格项目 -- 详情
 */
export function specificationDetail(merId, id) {
	return request.get(`server/${merId}/attr/detail/${id}`, {}, { login: true });
}
/*
	请求商品详情
*/ 
export function productDetail(merId, id) {
	return request.get(`server/${merId}/product/detail/${id}`, {}, {login: true});
}
/*
	编辑商品
*/ 
export function productUpdate(merId, id, data) {
	return request.post(`server/${merId}/product/update/${id}`, data, { login: true });
}
/*
	添加商品 -- 获取送货方式信息
*/ 
export function getDeliveryType(merId) {
	return request.get(`server/${merId}/product/config`, {}, { login: true });
}