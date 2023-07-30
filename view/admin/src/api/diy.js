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
 export function getCategory(data) {
  return request.get(`store/category/list`, data)
}
/**
 * @description 商品列表 -- 列表
 */
 export function getProduct(data) {
  return request.get(`diy/product/lst`, data)
}
/**
 * @description 首页diy -- 保存
 */
 export function diySave(id, data) {
  return request.post(`diy/create/${id}`, data)
}
/**
 * @description 店铺装修 -- 列表
 */
 export function diyList(data) {
  return request.get(`diy/lst`, data)
}
/**
 * @description 获取diy数据
 */
 export function diyGetInfo(id) {
  return request.get( `diy/detail/${id}`);
}
/**
 * @description diy列表数据 -- 删除
 */
 export function diyDel(id,data) {
  return request.delete( `diy/delete/${id}`, data);
}
/**
 * @description diy列表数据 -- 使用diy模板
 */
 export function setStatus(id) {
  return request.post(`diy/status/${id}`);
}
/**
 * @description diy -- 恢复模板初始数据
 */
 export function recovery(id) {
  return request.get(`diy/recovery/${id}`);
}
/**
 * @description diy -- 设置初始数据
 */
 export function setDefault(id) {
  return request.post(`diy/set_default_data/${id}`);
}
/**
 * @description 获取分类
 */
 export function categoryList() {
  return request.get('/cms/category_list');
}
/**
 * @description 获取链接列表
 */
 export function getUrl(data) {
  return request.get('diy/link/lst', data);
}
/**
 * @description 获取产品一或二级分类
 */
 export function getByCategory(data) {
  return request.get('diy/get_by_category', data);
}
/**
 * @description 使用diy模板(判断是否显示周边门店列表)
 */
 export function storeStatus() {
  return request.get( 'diy/get_store_status');
}
/**
 * @description 使用diy模板(活动商品)
 */
 export function getGroomList(type,data) {
  return request.get(`diy/groom_list/${type}`, data);
}
/**
 * @description 小程序 -- 二维码；
 */
 export function getRoutineCode(id) {
  return request.get(`diy/get_routine_code/${id}`);
}
/**
 * @description 个人中心-获取信息；
 */
 export function getMember() {
  return request.get( `diy/user_index`);
}
/**
 * @description 个人中心-提交信息；
 */
 export function memberSave(data) {
  return request.post( `diy/user_index`, data);
}
/**
 * @description 页面链接-获取分类；
 */
 export function pageCategory() {
  return request.get(`diy/categroy/options`);
}
/**
 * @description 页面链接-获取链接；
 */
 export function pageLink(id, data) {
  // return request.get( `diy/link/getLinks/${id}`);
  return request.get( `diy/link/getLinks/${id}`, data);
}
/**
 * @description 页面链接-自定义链接提交；
 */
 export function saveLink(data,id) {
  return request.post( `diy/save_link/${id}`, data);
}
/**
 * @description 页面链接-获取链接；
 */
 export function getPageUrl() {
  return request.get( `diy/show`);
}
/**
 * @description diy-添加平台分类
 */
 export function addPlantCategory() {
  return request.get( `diy/categroy/form`);
}
/**
 * @description diy-编辑平台分类
 */
 export function editPlantCategory (id) {
  return request.get( `diy/categroy/${id}/form`);
}
/**
 * @description diy-平台分类列表
 */
 export function plantCategoryList(data) {
  return request.get('diy/categroy/lst', data);
}
/**
 * @description diy-平台分类修改状态
 */
 export function plantCategoryStatus(id, status) {
  return request.post(`diy/categroy/status/${id}`, { status })
}
/**
 * @description diy-删除平台分类
 */
 export function deletePlantCategory(id) {
  return request.delete( `diy/categroy/delete/${id}`);
}
/**
 * @description diy-添加商户分类
 */
 export function addMerCategory() {
  return request.get( `diy/mer_categroy/form`);
}
/**
 * @description diy-编辑商户分类
 */
 export function editMerCategory(id) {
  return request.get( `diy/mer_categroy/${id}/form`);
}
/**
 * @description diy-商户分类列表
 */
 export function merCategoryList(data) {
  return request.get('diy/mer_categroy/lst', data);
}
/**
 * @description diy-商户分类修改状态
 */
 export function merCategoryStatus(id, status) {
  return request.post(`diy/mer_categroy/status/${id}`, { status })
}
/**
 * @description diy-删除商户分类
 */
 export function deleteMerCategory(id) {
  return request.delete( `diy/mer_categroy/delete/${id}`);
}
/**
 * @description diy-添加平台链接
 */
 export function addPlantLink() {
  return request.get( `diy/link/form`);
}
/**
 * @description diy-编辑平台链接
 */
 export function editPlantLink(id) {
  return request.get( `diy/link/${id}/form`);
}
/**
 * @description diy-删除平台链接
 */
 export function deletePlantLink(id) {
  return request.delete( `diy/link/delete/${id}`);
}
/**
 * @description diy-平台链接列表
 */
 export function plantLinkList(data) {
  return request.get('diy/link/lst', data);
}
/**
 * @description diy-添加商户链接
 */
 export function addMerLink() {
  return request.get( `diy/mer_link/form`);
}
/**
 * @description diy-编辑商户链接
 */
 export function editMerLink(id) {
  return request.get( `diy/mer_link/${id}/form`);
}
/**
 * @description diy-删除商户链接
 */
 export function deleteMerLink(id) {
  return request.delete( `diy/mer_link/delete/${id}`);
}
/**
 * @description diy-商户链接列表
 */
 export function merLinkList(data) {
  return request.get('diy/mer_link/lst', data);
}
/**
 * @description 可视化-店铺街获取数据
 */
 export function getColorChange() {
  return request.get('diy/store_street');
}
/**
 * @description 可视化-店铺街提交数据
 */
 export function colorChange(data) {
  return request.post('diy/store_street', data);
}
/**
 * @description 可视化-商城首页复制
 */
 export function diyCopy(id) {
  return request.get(`diy/copy/${id}`);
}
/**
 * @description 微页面 -- 保存
 */
 export function microSave(id, data) {
  return request.post(`micro/create/${id}`, data);
}
/**
 * @description 微页面 -- 列表
 */
 export function microList(data) {
  return request.get(`micro/lst`, data);
}
/**
 * @description 获取微页面数据
 */
 export function microGetInfo(id) {
  return request.get(`micro/detail/${id}`);
}
/**
 * @description 微页面列表数据 -- 删除
 */
 export function microDel(id, data) {
  return request.delete(`micro/delete/${id}`, data);
}
/**
 * @description diy-获取微页面链接
 */
 export function getPageLink() {
  return request.get('diy/select');
}