(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-users-user_get_coupon-index"],{"02f6":function(t,e,n){"use strict";n.r(e);var i=n("3668"),o=n("1029");for(var a in o)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("fa4e");var u=n("f0c5"),s=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,"2f7fb421",null,!1,i["a"],void 0);e["default"]=s.exports},"0abe":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.Popup[data-v-2f7fb421]{flex:1;align-items:center;justify-content:center;width:%?500?%;background-color:#fff;position:fixed;top:%?500?%;left:%?125?%;z-index:1000}.Popup .logo-auth[data-v-2f7fb421]{z-index:-1;position:absolute;left:50%;top:0;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:%?150?%;height:%?150?%;display:flex;align-items:center;justify-content:center;border:%?8?% solid #fff;border-radius:50%;background:#fff}.Popup .image[data-v-2f7fb421]{height:%?42?%;margin-top:%?-54?%}.Popup .title[data-v-2f7fb421]{font-size:%?28?%;color:#000;text-align:center;margin-top:%?30?%;align-items:center;justify-content:center;width:%?500?%;display:flex}.Popup .tip[data-v-2f7fb421]{font-size:%?22?%;color:#555;padding:0 %?24?%;margin-top:%?25?%;display:flex;align-items:center;justify-content:center}.Popup .bottom .item[data-v-2f7fb421]{width:%?250?%;height:%?80?%;background-color:#eee;text-align:center;line-height:%?80?%;margin-top:%?54?%;font-size:%?24?%;color:#666}.Popup .bottom .item .text[data-v-2f7fb421]{font-size:%?24?%;color:#666}.Popup .bottom .item.on[data-v-2f7fb421]{width:%?500?%}.flex[data-v-2f7fb421]{display:flex;flex-direction:row}.Popup .bottom .item.grant[data-v-2f7fb421]{font-weight:700;background-color:#e93323;\n  /* background-color: var(--view-theme); */border-radius:0;padding:0}.Popup .bottom .item.grant .text[data-v-2f7fb421]{font-size:%?28?%;color:#fff}.mask[data-v-2f7fb421]{position:fixed;top:0;right:0;left:0;bottom:0;background-color:rgba(0,0,0,.65);z-index:99}',""]),t.exports=e},"0f96":function(t,e,n){"use strict";n("7a82");var i=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("5530")),a=i(n("a50e")),u=n("cd6d"),s=n("937f"),r=n("26cb"),c=i(n("823f")),l=n("3255"),f=(i(n("42cb")),n("ddb3")),d=getApp(),p={name:"Authorize",props:{isAuto:{type:Boolean,default:!0},isGoIndex:{type:Boolean,default:!0},isShowAuth:{type:Boolean,default:!1}},components:{},data:function(){return{title:"用户登录",info:"请登录，将为您提供更好的服务！",isWeixin:this.$wechat.isWeixin(),canUseGetUserProfile:!1,code:null,top:0,mp_is_new:this.$Cache.get("MP_VERSION_ISNEW")||!1,editModal:!1}},computed:(0,o.default)((0,o.default)({},(0,r.mapGetters)(["isLogin","userInfo","viewColor"])),(0,l.configMap)(["routine_logo"])),watch:{isLogin:function(t){!0===t&&this.$emit("onLoadFun",this.userInfo)},isShowAuth:function(t){this.getCode(this.isShowAuth)}},created:function(){this.top=uni.getSystemInfoSync().windowHeight/2-70,wx.getUserProfile&&(this.canUseGetUserProfile=!0),this.setAuthStatus(),this.getCode(this.isShowAuth)},methods:{setAuthStatus:function(){},getCode:function(t){t&&(this.code=1)},toWecahtAuth:function(){(0,f.toLogin)(!0)},getUserProfile:function(){var t=this,e=this;c.default.getUserProfile().then((function(n){var i=n.userInfo;i.code=t.code,i.spread=d.globalData.spid,i.spread_code=d.globalData.code,(0,u.commonAuth)({auth:{type:"routine",auth:i}}).then((function(n){if(200!=n.data.status)return uni.setStorageSync("auth_token",n.data.result.key),uni.navigateTo({url:"/pages/users/login/index"});var i=n.data.result.expires_time-a.default.time();e.$store.commit("UPDATE_USERINFO",n.data.result.user),e.$store.commit("LOGIN",{token:n.data.result.token,time:i}),e.$store.commit("SETUID",n.data.result.user.uid),a.default.set(s.EXPIRES_TIME,n.data.result.expires_time,i),a.default.set(s.USER_INFO,n.data.result.user,i),t.$emit("onLoadFun",n.data.result.user),n.data.result.user.isNew&&t.mp_is_new&&(t.editModal=!0)})).catch((function(t){uni.hideLoading(),uni.showToast({title:t.message,icon:"none",duration:2e3})}))})).catch((function(t){uni.hideLoading()}))},close:function(){var t=getCurrentPages();t[t.length-1];this.$emit("authColse",!1)}}};e.default=p},1029:function(t,e,n){"use strict";n.r(e);var i=n("0f96"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},"178d":function(t,e,n){var i=n("0abe");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("a1548d5e",i,!0,{sourceMap:!1,shadowMode:!1})},2361:function(t,e,n){"use strict";n.r(e);var i=n("bc4c"),o=n("e05c");for(var a in o)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("6a77");var u=n("f0c5"),s=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,"0960d56e",null,!1,i["a"],void 0);e["default"]=s.exports},3668:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[t.isShowAuth&&t.code?n("v-uni-view",{staticClass:"mask",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.close.apply(void 0,arguments)}}}):t._e(),t.isShowAuth&&t.code?n("v-uni-view",{staticClass:"Popup",style:"top:"+t.top+"px;"},[n("v-uni-view",{staticClass:"logo-auth"},[n("v-uni-image",{staticClass:"image",attrs:{src:t.routine_logo,mode:"aspectFit"}})],1),t.isWeixin?n("v-uni-text",{staticClass:"title"},[t._v("授权提醒")]):n("v-uni-text",{staticClass:"title"},[t._v(t._s(t.title))]),t.isWeixin?n("v-uni-text",{staticClass:"tip"},[t._v("请授权头像等信息，以便为您提供更好的服务！")]):n("v-uni-text",{staticClass:"tip"},[t._v(t._s(t.info))]),n("v-uni-view",{staticClass:"bottom flex"},[n("v-uni-text",{staticClass:"item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.close.apply(void 0,arguments)}}},[t._v("随便逛逛")]),n("v-uni-button",{staticClass:"item grant",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toWecahtAuth.apply(void 0,arguments)}}},[t.isWeixin?n("v-uni-text",{staticClass:"text"},[t._v("去授权")]):n("v-uni-text",{staticClass:"text"},[t._v("去登录")])],1)],1)],1):t._e()],1)},o=[]},"48fa":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".condition .line-title[data-v-0960d56e]{width:%?90?%;padding:0 %?10?%;box-sizing:border-box;background:#fff7f7;border:1px solid #e83323;opacity:1;border-radius:%?20?%;font-size:%?20?%;color:#e83323;margin-right:%?12?%}.condition .line-title.gray[data-v-0960d56e]{border-color:#bbb;color:#bbb;background-color:#f5f5f5}.coupon-list .pic-num[data-v-0960d56e]{color:#fff;font-size:%?24?%}",""]),t.exports=e},"58d4":function(t,e,n){"use strict";n("7a82");var i=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.ajcaptchaCheck=function(t){return o.default.post("ajcheck",t,{noAuth:!0})},e.appleAppAuth=function(t){return o.default.post("auth/apple",t,{noAuth:!0})},e.appletsDecrypt=function(t){return o.default.post("user/mp/binding",t)},e.bindingPhone=function(t){return o.default.post("user/binding",t)},e.getAjcaptcha=function(t){return o.default.get("ajcaptcha",t,{noAuth:!0})},e.getAppVersion=function(){return o.default.get("appVersion",{},{noAuth:!0})},e.getArticleBannerList=function(){return o.default.get("article/banner/list",{},{noAuth:!0})},e.getArticleCategoryList=function(){return o.default.get("article/category/lst",{},{noAuth:!0})},e.getArticleDetails=function(t){return o.default.get("article/detail/"+t,{},{noAuth:!0})},e.getArticleHotList=function(){return o.default.get("article/hot/list",{},{noAuth:!0})},e.getArticleList=function(t,e){return o.default.get("article/lst/"+t,e,{noAuth:!0})},e.getCity=function(){return o.default.get("system/city/lst",{},{noAuth:!0})},e.getCityList=function(t){return o.default.get("v2/system/city",{address:t},{noAuth:!0})},e.getCityV2=function(t){return o.default.get("v2/system/city/lst/"+t,{},{noAuth:!0})},e.getCoupons=function(t){return o.default.get("coupon/product",t,{noAuth:!0})},e.getDiy=function(t){return o.default.get("diy",t,{noAuth:!0})},e.getIndexData=function(){return o.default.get("common/home",{},{noAuth:!0})},e.getLiveList=function(t,e){return o.default.get("wechat/live",{page:t,limit:e},{noAuth:!0})},e.getLogo=function(){return o.default.get("wechat/get_logo",{},{noAuth:!0})},e.getOpenAdv=function(){return o.default.get("open_screen",{},{noAuth:!0})},e.getPageDiy=function(t){return o.default.get("micro",t,{noAuth:!0})},e.getShopCoupons=function(t){return o.default.get("coupon/store/"+t,{},{noAuth:!0})},e.getTemlIds=function(){return o.default.get("wechat/teml_ids",{},{noAuth:!0})},e.getUserCoupons=function(t){return o.default.get("coupon/list",t)},e.loginMobile=function(t){return o.default.post("login/mobile",t,{noAuth:!0})},e.logout=function(){return o.default.get("logout")},e.modifyPassword=function(t){return o.default.post("user/change/password",t)},e.modifyPhone=function(t){return o.default.post("user/change/phone",t)},e.phoneLogin=function(t){return o.default.post("login",t,{noAuth:!0})},e.phoneRegister=function(t){return o.default.post("register",t,{noAuth:!0})},e.phoneRegisterReset=function(t){return o.default.post("register/reset",t,{noAuth:!0})},e.pink=function(){return o.default.get("pink",{},{noAuth:!0})},e.registerVerify=function(t,e,n,i){return o.default.post("register/verify",{phone:t,type:void 0===e?"reset":e,key:n,code:i},{noAuth:!0})},e.setCouponReceive=function(t){return o.default.post("coupon/receive/"+t)},e.setFormId=function(t){return o.default.post("wechat/set_form_id",{formId:t})},e.switchH5Login=function(t){return o.default.post("user/switch",t)},e.verifyCode=function(){return o.default.get("verify_code",{},{noAuth:!0})},e.wechatAppAuth=function(t){return o.default.post("auth/app",t,{noAuth:!0})};var o=i(n("3314"))},"5c72":function(t,e,n){"use strict";n("7a82");var i=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("58d4"),a=n("26cb"),u=i(n("02f6")),s={components:{authorize:u.default},data:function(){return{couponsList:[],loading:!1,loadend:!1,loadTitle:"加载更多",page:1,limit:20,isAuto:!1,isShowAuth:!1}},computed:(0,a.mapGetters)(["isLogin"]),onLoad:function(){this.isLogin?this.getUseCoupons():(this.isAuto=!0,this.isShowAuth=!0)},onReachBottom:function(){this.getUseCoupons()},methods:{onLoadFun:function(){this.isShowAuth=!1,this.getUseCoupons()},authColse:function(t){this.isShowAuth=t},getCoupon:function(t,e){var n=this,i=n.couponsList;(0,o.setCouponReceive)(t).then((function(t){i[e].is_use=!0,n.$set(n,"couponsList",i),n.$util.Tips({title:"领取成功"})}),(function(t){return n.$util.Tips({title:t.msg})}))},getUseCoupons:function(){var t=this;return!this.loadend&&(!this.loading&&void(0,o.getCoupons)({page:t.page,limit:t.limit}).then((function(e){var n=e.data,i=n.length<t.limit,o=t.$util.SplitArray(n,t.couponsList);t.$set(t,"couponsList",o),t.loadend=i,t.loadTitle=i?"我也是有底线的":"加载更多",t.page=t.page+1,t.loading=!1})).catch((function(e){t.loading=!1,t.loadTitle="加载更多"})))}}};e.default=s},"69d2":function(t,e,n){var i=n("48fa");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("79b70f60",i,!0,{sourceMap:!1,shadowMode:!1})},"6a77":function(t,e,n){"use strict";var i=n("69d2"),o=n.n(i);o.a},"8b53":function(t,e,n){t.exports=n.p+"static/img/noCoupon.27891225.png"},bc4c:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[t.couponsList.length?i("v-uni-view",{staticClass:"coupon-list"},t._l(t.couponsList,(function(e,n){return i("v-uni-view",{key:n,staticClass:"item acea-row row-center-wrapper"},[i("v-uni-view",{staticClass:"money",class:e.is_use?"moneyGray":""},[i("v-uni-view",[t._v("￥"),i("v-uni-text",{staticClass:"num"},[t._v(t._s(e.coupon_price))])],1),i("v-uni-view",{staticClass:"pic-num"},[t._v("满"+t._s(e.use_min_price)+"元可用")])],1),i("v-uni-view",{staticClass:"text"},[i("v-uni-view",{staticClass:"condition line1"},[0===e.type?i("span",{staticClass:"line-title",class:1==e.is_use||2==e.is_use?"gray":""},[t._v("通用劵")]):1===e.type?i("span",{staticClass:"line-title",class:1==e.is_use||2==e.is_use?"gray":""},[t._v("品类券")]):i("span",{staticClass:"line-title",class:1==e.is_use||2==e.is_use?"gray":""},[t._v("商品券")]),i("span",[t._v(t._s(e.title))])]),i("v-uni-view",{staticClass:"data acea-row row-between-wrapper"},[i("v-uni-view",[t._v(t._s(e.start_time?e.start_time+"-":"")+t._s(e.end_time))]),1==e.is_use?i("v-uni-view",{staticClass:"bnt gray"},[t._v("已领取")]):2==e.is_use?i("v-uni-view",{staticClass:"bnt gray"},[t._v("已领完")]):i("v-uni-view",{staticClass:"bnt bg-color",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.getCoupon(e.id,n)}}},[t._v("立即领取")])],1)],1)],1)})),1):t._e(),t.couponsList.length?i("v-uni-view",{staticClass:"loadingicon acea-row row-center-wrapper"},[i("v-uni-text",{staticClass:"loading iconfont icon-jiazai",attrs:{hidden:0==t.loading}}),t._v(t._s(t.loadTitle))],1):t.couponsList.length||1!=t.loading?t._e():i("v-uni-view",{staticClass:"noCommodity"},[i("v-uni-view",{staticClass:"pictrue"},[i("v-uni-image",{attrs:{src:n("8b53")}})],1)],1),i("authorize",{attrs:{isAuto:t.isAuto,isShowAuth:t.isShowAuth},on:{onLoadFun:function(e){arguments[0]=e=t.$handleEvent(e),t.onLoadFun.apply(void 0,arguments)},authColse:function(e){arguments[0]=e=t.$handleEvent(e),t.authColse.apply(void 0,arguments)}}})],1)},o=[]},e05c:function(t,e,n){"use strict";n.r(e);var i=n("5c72"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},fa4e:function(t,e,n){"use strict";var i=n("178d"),o=n.n(i);o.a}}]);