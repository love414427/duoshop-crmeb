import {
	spread
} from "@/api/user";
import Cache from "@/utils/cache";
import Store from '@/store/index';

export function configMap(args, init) {
	if(Array.isArray(args)) {
		return args.reduce((i, v)=>{
			i[v] = () => Store.getters.globalData[v];
			return i;
		}, init || {})
	}else{
		return Object.keys(args).reduce((i, v)=>{
			i[v] = () => {
				const val = Store.getters.globalData[v];
				return (val === undefined || val === null || val === '') ? args[v] : val;
			};
			return i;
		}, init || {})
	}
}

export function redirect(url){
	uni.switchTab({
		url,
		fail(){
			uni.redirectTo({
				url
			})	
		}
	})
}

/**
 *  转换商户跳转链接, 自动追加商户 id
 * @param {string} path
 * @param {int} mer_id
 * @param {string} name 商户id  参数名, 默认 mer_id
 */
export function merPath(path, mer_id, name){
	if(!mer_id) return path;
	path += ((path.indexOf('?') > -1 ? '&' : '?') + (name || 'mer_id') + '=' + mer_id);
	return path;
}

/**
 * 绑定用户授权
 * @param {Object} puid
 */
export function silenceBindingSpread() {

	//#ifdef H5
	let puid = Cache.get('spread');
	//#endif

	//#ifdef MP || APP-PLUS
	let puid = getApp().globalData.spid;
	if (!puid) {
		puid = getApp().globalData.code;
	}
	//#endif

	puid = parseInt(puid);
	if (Number.isNaN(puid)) {
		puid = 0;
	}
	if (puid) {

		//#ifdef H5
		Cache.clear('spread');
		//#endif

		//#ifdef MP || APP-PLUS
		getApp().globalData.spid = 0;
		getApp().globalData.code = 0;
		//#endif


	}
}

export function isWeixin() {
	return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
}

export function parseQuery() {
	const res = {};

	const query = (location.href.split("?")[1] || "")
		.trim()
		.replace(/^(\?|#|&)/, "");

	if (!query) {
		return res;
	}
	// const VUE_APP_WS_URL = process.env.VUE_APP_WS_URL || `ws://${location.hostname}:20003`;
	// const ishttps = 'https:' == document.location.protocol ? true : false;
	// const VUE_APP_WS_URL = ishttps ? `wss://mer.crmeb.net?type=user&token=${token}` : `ws://mer.crmeb.net?type=user&token=${token}`;
	// export { VUE_APP_WS_URL }
	

	query.split("&").forEach(param => {
		const parts = param.replace(/\+/g, " ").split("=");
		const key = decodeURIComponent(parts.shift());
		const val = parts.length > 0 ? decodeURIComponent(parts.join("=")) : null;

		if (res[key] === undefined) {
			res[key] = val;
		} else if (Array.isArray(res[key])) {
			res[key].push(val);
		} else {
			res[key] = [res[key], val];
		}
	});

	return res;
}
// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
let token = ''
try {
	token = uni.getStorageSync('LOGIN_STATUS_TOKEN')
	console.log(token, 'this')
} catch (error) {

}
// const VUE_APP_WS_URL = process.env.VUE_APP_WS_URL || `ws://${location.hostname}?type=user&token=${token}`;
// const VUE_APP_WS_URL = `wss://mer.crmeb.net?type=user&token=${token}`
export default parseQuery;
