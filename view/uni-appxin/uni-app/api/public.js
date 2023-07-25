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
import wechat from "@/libs/wechat.js";

/**
 * 获取微信sdk配置
 * @returns {*}
 */
export function getWechatConfig() {
	return request.get(
		"wechat/config", {
			url: wechat.signLink()
		}, {
			noAuth: true
		}
	);
}

/**
 * 获取微信sdk配置
 * @returns {*}
 */
export function wechatAuth(code, spread, login_type) {
	return request.get(
		"auth/wechat", {
			code,
			spread,
			login_type
		}, {
			noAuth: true
		}
	);
}

export function commonAuth(data) {
	return request.post(
		"auth", data, {
			noAuth: true
		}
	);
}
/**
 * 获取登录授权login
 * 
 */
export function getLogo() {
	return request.get('wechat/get_logo', {}, {
		noAuth: true
	});
}
/**
 * 小程序用户登录
 * @param data object 小程序用户登陆信息
 */
export function login(data) {
	return request.post("auth/mp", data, {
		noAuth: true
	});
}
/**
 * 分享
 * @returns {*}
 */
export function getShare() {
	return request.get("share", {}, {
		noAuth: true
	});
}
/**
 * 获取关注海报
 * @returns {*}
 */
export function follow() {
	return request.get("wechat/follow", {}, {
		noAuth: true
	});
}
/**
 * 获取图片base64
 * @retins {*}
 * */
export function imageBase64(image, code) {
	return request.post(
		"common/base64", {
			image: image,
			code: code
		}, {
			noAuth: true
		}
	);
}
// 配置
export function getconfig(data) {
	return request.get("config",data,{noAuth: true});
}
// 浏览记录
export function history(data) {
	return request.post("common/visit",data);
}
export function getSubscribe(){
	return request.get("subscribe", {}, {
		noAuth: true
	});
}
export function getVersion() {
	return request.get("version",{},{noAuth: true});
}
/**
 * 获取组件底部菜单
 * @param data object 获取组件底部菜单
 */
export function getNavigation(data) {
	return request.get("navigation", data, {
		noAuth: true
	});
}