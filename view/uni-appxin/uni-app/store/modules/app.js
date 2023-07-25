// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import {
	getUserInfo
} from "../../api/user.js";
import {
	LOGIN_STATUS,
	UID
} from '../../config/cache';
import Cache from '../../utils/cache';
import {
	USER_INFO
} from '../../config/cache';

const state = {
	token: Cache.get(LOGIN_STATUS) || null,
	backgroundColor: "#fff",
	userInfo: null,
	uid: Cache.get(UID) || null,
	globalData: uni.getStorageSync('GLOBAL_DATA') || {},
	homeActive: false,
	copyPwd: null,
	pageFooter:uni.getStorageSync('pageFoot') || {},
	keyColor: Cache.get('KEY_COLOR') || '_default',
	viewColor: Cache.get('VIEW_COLOR') || '--view-theme: #E93323;--view-assist:#FF7612;--view-priceColor:#E93323;--view-bgColor:rgba(255, 118, 18,.1);--view-minorColor:rgba(233, 51, 35,.1);--view-bntColor11:#FDA923;--view-bntColor12:#FD6523;--view-bntColor21:#F11B09;--view-bntColor22:#F67A38;',
};

const mutations = {
	LOGIN(state, opt) {
		state.token = opt.token;
		Cache.set(LOGIN_STATUS, opt.token, opt.time);
		uni.removeStorageSync('auth_token');
	},
	SETUID(state,val){
		state.uid = val;
		Cache.set(UID, val);
	},
	UPDATE_LOGIN(state, token) {
		state.token = token;
	},
	LOGOUT(state) {
		state.token = null;
		state.uid = null
		Cache.clear(LOGIN_STATUS);
		Cache.clear(UID);
	},
	BACKGROUND_COLOR(state, color) {
		state.color = color;
		document.body.style.backgroundColor = color;
	},
	UPDATE_USERINFO(state, userInfo) {
		userInfo.isNew && Cache.set('is_new_user', '1')
		state.userInfo = userInfo;
	},
	OPEN_HOME(state) {
		state.homeActive = true;
	},
	CLOSE_HOME(state) {
		state.homeActive = false;
	},
	PARSE_PWD(state, pwd) {
		state.copyPwd = pwd;
	},
	VIEW_COLOR(state, color) {
		Cache.set('VIEW_COLOR', color)
		state.viewColor = color;
	},
	KEY_COLOR(state, key) {
		Cache.set('KEY_COLOR', key)
		state.keyColor = key;
	},
	GLOBAL_DATA(state, key) {
		uni.setStorageSync('GLOBAL_DATA', key);
		state.globalData = key;
	},
	FOOT_UPLOAD(state,data){
		state.pageFooter = data
	}
};

const actions = {
	USERINFO({
		state,
		commit
	}, force) {
		if (state.userInfo !== null && !force)
			return Promise.resolve(state.userInfo);
		else
			return new Promise(reslove => {
				getUserInfo().then(res => {
					commit("UPDATE_USERINFO", res.data);
					Cache.set(USER_INFO, res.data);
					reslove(res.data);
				});
			}).catch(() => {

			});
	}
};

export default {
	state,
	mutations,
	actions
};
