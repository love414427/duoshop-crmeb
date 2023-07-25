// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import Vue from 'vue'
import App from './App'
import store from './store'
import Cache from './utils/cache'
import util from 'utils/util'
import { HTTP_REQUEST_URL } from '@/config/app';
import skeleton from './components/skeleton/index.vue'
import BaseMoney from './components/BaseMoney.vue';
Vue.component('skeleton', skeleton)
Vue.component('BaseMoney', BaseMoney)
Vue.prototype.$util = util;
Vue.prototype.$Cache = Cache;
Vue.prototype.$eventHub = new Vue();
Vue.config.productionTip = false

// #ifdef H5
import { parseQuery } from "./utils";
import Auth from './libs/wechat';
import { SPREAD } from './config/cache';
// import wx from '@/node_modules/jweixin-module/lib/index'
var __s = document.createElement('script');
__s.src=HTTP_REQUEST_URL+"/api/script";
document.head.appendChild(__s);
Vue.prototype.$wechat = Auth;
let cookieName = "VCONSOLE",
	query = parseQuery(),
	urlSpread = query["spread"],
	vconsole = query[cookieName.toLowerCase()],
	md5Crmeb = "b14d1e9baeced9bb7525ab19ee35f2d2", //CRMEB MD5 加密开启vconsole模式
	md5UnCrmeb = "3dca2162c4e101b7656793a1af20295c"; //UN_CREMB MD5 加密关闭vconsole模式

if (urlSpread !== undefined) {
	var spread = Cache.get(SPREAD);
	urlSpread = parseInt(urlSpread);
	if (!Number.isNaN(urlSpread) && spread !== urlSpread) {
		Cache.set("spread", urlSpread || 0);
	} else if (spread === 0 || typeof spread !== "number") {
		Cache.set("spread", urlSpread || 0);
	}
}

if (vconsole !== undefined) {
  if (vconsole === md5UnCrmeb && Cache.has(cookieName))
	  Cache.clear(cookieName);
} else vconsole = Cache.get(cookieName);

import VConsole from './components/vconsole.min.js'

if (vconsole !== undefined && vconsole === md5Crmeb) {
	Cache.set(cookieName, md5Crmeb, 3600);
	let vConsole = new VConsole();
	
}
// 注册全局防抖指令
Vue.directive('debounce',{
  inserted:(el,binding)=>{
    let debounceTime = binding.value || 2000
    let timer
    el.addEventListener('click',e=>{
        el.style.pointerEvents = 'none'; 
        if(!el.disabled){
          timer = setTimeout(()=>{
            el.style.pointerEvents = 'auto'
          },debounceTime)
        }
    },true)
  }
})

// if(!!!Auth.isAndroid() && Auth.isWeixin()){
// 	Auth.wechat()
// }

// Auth.isWeixin() && Auth.oAuth();

// #endif

App.mpType = 'app'


const app = new Vue({
    ...App,
	store,
	Cache
})
app.$mount();