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
 export function getCategory() {
  return request.get(`store/category/list`)
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
 export function diyDel (id,data) {
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
  return request.get( `diy/get_member`);
}
/**
 * @description 个人中心-提交信息；
 */
 export function memberSave(data) {
  return request.post( `diy/member_save`, data);
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
 export function pageLink (id, data) {
  return request.get( `diy/link/getLinks/${id}`, data);
}
/**
 * @description 页面链接-自定义链接提交；
 */
 export function saveLink (data,id) {
  return request.post( `diy/save_link/${id}`, data);
}
/**
 * @description 页面链接-获取链接；
 */
 export function getPageUrl () {
  return request.get( `diy/show`);
}
/**
 * @description diy-添加分类
 */
 export function addCategoryApi () {
  return request.get( `diy/categroy/form`);
}
/**
 * @description diy-提交分类
 */
 export function createCategoryApi () {
  return request.post( `diy/categroy/create`);
}
/**
 * @description diy-分类列表
 */
 export function categoryListApi(data) {
  return request.get('diy/categroy/lst', data);
}
/**
 * @description diy-添加链接
 */
 export function addLinkApi () {
  return request.get( `diy/link/form`);
}
/**
 * @description diy-编辑链接
 */
 export function editLinkApi (id) {
  return request.get( `diy/link/${id}/form`);
}
/**
 * @description diy-删除链接
 */
 export function deleteLinkApi (id) {
  return request.delete( `diy/link/delete/${id}`);
}
/**
 * @description diy-链接列表
 */
 export function linkListApi(data) {
  return request.get('diy/link/lst', data);
}
/**
 * @description 可视化-商城首页复制
 */
 export function diyCopy(id) {
  return request.get(`diy/copy/${id}`);
}