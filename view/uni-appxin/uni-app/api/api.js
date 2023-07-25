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
 * 公共接口 ，优惠券接口 , 行业此讯 , 手机号码注册
 * 
*/
/**
 * 获取主页数据 无需授权
 * 
*/
export function getIndexData()
{
  return request.get("common/home",{},{ noAuth : true});
}
/**
 * 获取app版本
 */
export function getAppVersion() {
  return request.get('appVersion',{},{noAuth:true});
}
/**
 * 获取登录授权login
 * 
*/
export function getLogo()
{
  return request.get('wechat/get_logo', {}, { noAuth : true});
}
/**
 * 保存form_id
 * @param string formId 
 */
export function setFormId(formId) {
  return request.post("wechat/set_form_id", { formId: formId});
}
/**
 * 领取优惠卷
 * @param int couponId
 * 
*/
export function setCouponReceive(couponId){
  return request.post('coupon/receive/'+couponId);
}
/**
 * 商铺优惠券列表
 * @param object data
*/
export function getShopCoupons(id){
  return request.get('coupon/store/'+id,{},{ noAuth: true})
}
/**
 * 商品优惠券列表
 * @param object data
*/
export function getCoupons(data){
  return request.get('coupon/product',data,{ noAuth: true})
}
/**
 * 我的优惠券
 * @param int types 0全部  1未使用 2已使用
*/
export function getUserCoupons(data){
  return request.get('coupon/list',data)
}
/**
 * 文章分类列表
 * 
*/
export function getArticleCategoryList(){
  return request.get('article/category/lst',{},{noAuth:true})
}
/**
 * 文章列表
 * @param int cid
 * 
*/
export function getArticleList(cid,data){
  return request.get('article/lst/' + cid, data,{noAuth:true})
}
/**
 * 文章 热门列表
 * 
*/
export function getArticleHotList(){
  return request.get('article/hot/list',{},{noAuth:true});
}
/**
 * 文章 轮播列表
 * 
*/
export function getArticleBannerList(){
  return request.get('article/banner/list',{},{noAuth:true})
}
/**
 * 文章详情
 * @param int id 
 * 
*/
export function getArticleDetails(id){
  return request.get('article/detail/'+id,{},{noAuth:true});
}
/**
 * 手机号+验证码登录接口
 * @param object data
*/
export function loginMobile(data){
  return request.post('login/mobile',data,{noAuth:true})
}
/**
 * 获取短信KEY
 * @param object phone
*/
export function verifyCode(){
  return request.get('verify_code', {},{noAuth:true})
}
/**
 * 验证码发送
 * @param object phone
*/
export function registerVerify(phone, reset, key, code){
  return request.post('register/verify', { phone: phone, type: reset === undefined ? 'reset' : reset, key: key, code: code },{noAuth:true})
}
/**
 * 手机号注册
 * @param object data
 * 
*/
export function phoneRegister(data){
  return request.post('register',data,{noAuth:true});
}
/**
 * 手机号修改密码
 * @param object data
 * 
*/
export function phoneRegisterReset(data){
  return request.post('register/reset',data,{noAuth:true})
}
/**
 * 手机号+密码登录
 * @param object data
 * 
*/
export function phoneLogin(data){
  return request.post('login',data,{noAuth:true})
}
/* h5切换公众号登陆 */
export function switchH5Login(data) {
  return request.post("user/switch", data);
}
/** 绑定手机号 */
export function bindingPhone(data){
  return request.post('user/binding',data);
}
/** 修改手机号 */
export function modifyPhone(data){
  return request.post('user/change/phone',data);
}
/** 修改密码 */
export function modifyPassword(data){
  return request.post('user/change/password',data);
}
/** 退出登錄 */
export function logout(){
  return request.get('logout');
}
/** 获取订阅消息id */
export function getTemlIds(){
  return request.get('wechat/teml_ids', {}, { noAuth:true});
}
/** 首页拼团数据 */
export function pink(){
  return request.get('pink', {}, { noAuth:true});
}
/** 获取城市信息 */
export function getCity() {
  return request.get('system/city/lst', { }, { noAuth: true });
}
export function getCityV2(pid) {
	return request.get('v2/system/city/lst/'+pid, {}, {noAuth: true});
}
export function getCityList(address){
	return request.get('v2/system/city', {address}, {noAuth: true});
}
/** 获取小程序直播列表 */
export function getLiveList(page,limit) {
  return request.get('wechat/live', { page, limit}, { noAuth: true });
}
/* APP登录 */
export function wechatAppAuth(data) {
  return request.post("auth/app", data, { noAuth: true });
}
/* APPLE登录 */
export function appleAppAuth(data) {
  return request.post("auth/apple", data, { noAuth: true });
}
/* 小程序获取手机号解密 */
export function appletsDecrypt(data) {
  return request.post("user/mp/binding", data);
}
/**
 * 获取首页DIY；
 */
export function getDiy(data) {
  return request.get('diy',data,{ noAuth: true });
}
/**
 * 获取首页微页面；
 */
export function getPageDiy(data) {
	return request.get(`micro`, data, {
		noAuth: true
	});
}
/**
 * 滑块信息
 * @param {Object} data
 */
export function getAjcaptcha(data) {
	return request.get("ajcaptcha", data, {
		noAuth: true
	});
}
/**
 * 滑块验证
 * @param {Object} data
 */
export function ajcaptchaCheck(data) {
	return request.post("ajcheck", data, {
		noAuth: true
	});
}
/**
 * 滑块信息
 * @param {Object} data
 */
export function getOpenAdv() {
	return request.get("open_screen", {}, {
		noAuth: true
	});
}