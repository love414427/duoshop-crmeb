(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-users-user_address_list-index"],{"02f6":function(t,e,i){"use strict";i.r(e);var n=i("3668"),a=i("1029");for(var s in a)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("fa4e");var o=i("f0c5"),d=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"2f7fb421",null,!1,n["a"],void 0);e["default"]=d.exports},"0abe":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.Popup[data-v-2f7fb421]{flex:1;align-items:center;justify-content:center;width:%?500?%;background-color:#fff;position:fixed;top:%?500?%;left:%?125?%;z-index:1000}.Popup .logo-auth[data-v-2f7fb421]{z-index:-1;position:absolute;left:50%;top:0;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:%?150?%;height:%?150?%;display:flex;align-items:center;justify-content:center;border:%?8?% solid #fff;border-radius:50%;background:#fff}.Popup .image[data-v-2f7fb421]{height:%?42?%;margin-top:%?-54?%}.Popup .title[data-v-2f7fb421]{font-size:%?28?%;color:#000;text-align:center;margin-top:%?30?%;align-items:center;justify-content:center;width:%?500?%;display:flex}.Popup .tip[data-v-2f7fb421]{font-size:%?22?%;color:#555;padding:0 %?24?%;margin-top:%?25?%;display:flex;align-items:center;justify-content:center}.Popup .bottom .item[data-v-2f7fb421]{width:%?250?%;height:%?80?%;background-color:#eee;text-align:center;line-height:%?80?%;margin-top:%?54?%;font-size:%?24?%;color:#666}.Popup .bottom .item .text[data-v-2f7fb421]{font-size:%?24?%;color:#666}.Popup .bottom .item.on[data-v-2f7fb421]{width:%?500?%}.flex[data-v-2f7fb421]{display:flex;flex-direction:row}.Popup .bottom .item.grant[data-v-2f7fb421]{font-weight:700;background-color:#e93323;\n  /* background-color: var(--view-theme); */border-radius:0;padding:0}.Popup .bottom .item.grant .text[data-v-2f7fb421]{font-size:%?28?%;color:#fff}.mask[data-v-2f7fb421]{position:fixed;top:0;right:0;left:0;bottom:0;background-color:rgba(0,0,0,.65);z-index:99}',""]),t.exports=e},"0f96":function(t,e,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("5530")),s=n(i("a50e")),o=i("cd6d"),d=i("937f"),r=i("26cb"),c=n(i("823f")),u=i("3255"),l=(n(i("42cb")),i("ddb3")),f=getApp(),h={name:"Authorize",props:{isAuto:{type:Boolean,default:!0},isGoIndex:{type:Boolean,default:!0},isShowAuth:{type:Boolean,default:!1}},components:{},data:function(){return{title:"用户登录",info:"请登录，将为您提供更好的服务！",isWeixin:this.$wechat.isWeixin(),canUseGetUserProfile:!1,code:null,top:0,mp_is_new:this.$Cache.get("MP_VERSION_ISNEW")||!1,editModal:!1}},computed:(0,a.default)((0,a.default)({},(0,r.mapGetters)(["isLogin","userInfo","viewColor"])),(0,u.configMap)(["routine_logo"])),watch:{isLogin:function(t){!0===t&&this.$emit("onLoadFun",this.userInfo)},isShowAuth:function(t){this.getCode(this.isShowAuth)}},created:function(){this.top=uni.getSystemInfoSync().windowHeight/2-70,wx.getUserProfile&&(this.canUseGetUserProfile=!0),this.setAuthStatus(),this.getCode(this.isShowAuth)},methods:{setAuthStatus:function(){},getCode:function(t){t&&(this.code=1)},toWecahtAuth:function(){(0,l.toLogin)(!0)},getUserProfile:function(){var t=this,e=this;c.default.getUserProfile().then((function(i){var n=i.userInfo;n.code=t.code,n.spread=f.globalData.spid,n.spread_code=f.globalData.code,(0,o.commonAuth)({auth:{type:"routine",auth:n}}).then((function(i){if(200!=i.data.status)return uni.setStorageSync("auth_token",i.data.result.key),uni.navigateTo({url:"/pages/users/login/index"});var n=i.data.result.expires_time-s.default.time();e.$store.commit("UPDATE_USERINFO",i.data.result.user),e.$store.commit("LOGIN",{token:i.data.result.token,time:n}),e.$store.commit("SETUID",i.data.result.user.uid),s.default.set(d.EXPIRES_TIME,i.data.result.expires_time,n),s.default.set(d.USER_INFO,i.data.result.user,n),t.$emit("onLoadFun",i.data.result.user),i.data.result.user.isNew&&t.mp_is_new&&(t.editModal=!0)})).catch((function(t){uni.hideLoading(),uni.showToast({title:t.message,icon:"none",duration:2e3})}))})).catch((function(t){uni.hideLoading()}))},close:function(){var t=getCurrentPages();t[t.length-1];this.$emit("authColse",!1)}}};e.default=h},1029:function(t,e,i){"use strict";i.r(e);var n=i("0f96"),a=i.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},"178d":function(t,e,i){var n=i("0abe");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("a1548d5e",n,!0,{sourceMap:!1,shadowMode:!1})},3668:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[t.isShowAuth&&t.code?i("v-uni-view",{staticClass:"mask",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.close.apply(void 0,arguments)}}}):t._e(),t.isShowAuth&&t.code?i("v-uni-view",{staticClass:"Popup",style:"top:"+t.top+"px;"},[i("v-uni-view",{staticClass:"logo-auth"},[i("v-uni-image",{staticClass:"image",attrs:{src:t.routine_logo,mode:"aspectFit"}})],1),t.isWeixin?i("v-uni-text",{staticClass:"title"},[t._v("授权提醒")]):i("v-uni-text",{staticClass:"title"},[t._v(t._s(t.title))]),t.isWeixin?i("v-uni-text",{staticClass:"tip"},[t._v("请授权头像等信息，以便为您提供更好的服务！")]):i("v-uni-text",{staticClass:"tip"},[t._v(t._s(t.info))]),i("v-uni-view",{staticClass:"bottom flex"},[i("v-uni-text",{staticClass:"item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.close.apply(void 0,arguments)}}},[t._v("随便逛逛")]),i("v-uni-button",{staticClass:"item grant",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toWecahtAuth.apply(void 0,arguments)}}},[t.isWeixin?i("v-uni-text",{staticClass:"text"},[t._v("去授权")]):i("v-uni-text",{staticClass:"text"},[t._v("去登录")])],1)],1)],1):t._e()],1)},a=[]},"4b18":function(t,e,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("e25e"),i("a434");i("cd6d");var a=i("6859"),s=i("26cb"),o=n(i("02f6")),d=i("f26a"),r=(i("9a23"),{components:{authorize:o.default},data:function(){return{addressList:[],cartId:"",pinkId:0,couponId:0,loading:!1,loadend:!1,loadTitle:"加载更多",page:1,limit:20,isAuto:!1,isShowAuth:!1,wxConfig:{},domain:d.HTTP_REQUEST_URL}},computed:(0,s.mapGetters)(["isLogin","viewColor"]),onLoad:function(t){this.isLogin?(this.cartId=t.cartId||"",this.pinkId=t.pinkId||0,this.couponId=t.couponId||0,this.getAddressList(!0)):(this.isAuto=!0,this.isShowAuth=!0)},onReady:function(){},onShow:function(){this.getAddressList(!0)},methods:{onLoadFun:function(){this.isShowAuth=!1,this.getAddressList()},authColse:function(t){this.isShowAuth=t},getWxAddress:function(){var t=this;uni.authorize({scope:"scope.address",success:function(e){uni.chooseAddress({success:function(e){var i={};i.province=e.provinceName,i.city=e.cityName,i.district=e.countyName,(0,a.editAddress)({is_default:1,real_name:e.userName,phone:e.telNumber,detail:e.detailInfo,province:e.provinceName,district:e.countyName,city:e.cityName,city_id:""}).then((function(e){t.$util.Tips({title:"添加成功",icon:"success"},(function(){t.getAddressList(!0)}))})).catch((function(e){return t.$util.Tips({title:e})}))},fail:function(e){if("chooseAddress:cancel"==e.errMsg)return t.$util.Tips({title:"取消选择"})}})},fail:function(e){uni.showModal({title:"您已拒绝导入微信地址权限",content:"是否进入权限管理，调整授权？",success:function(e){if(e.confirm)uni.openSetting({success:function(t){}});else if(e.cancel)return t.$util.Tips({title:"已取消！"})}})}})},getAddress:function(){var t=this;t.$wechat.openAddress().then((function(e){(0,a.editAddress)({real_name:e.userName,phone:e.telNumber,province:e.provinceName,city:e.cityName,district:e.countryName,detail:e.detailInfo,post_code:e.postalCode,is_default:1,city_id:""}).then((function(){t.$util.Tips({title:"添加成功",icon:"success"},(function(){t.getAddressList(!0)}))})).catch((function(e){return t.$util.Tips({title:e||"添加失败"})}))}))},getAddressList:function(t){var e=this;t&&(e.loadend=!1,e.page=1,e.$set(e,"addressList",[])),e.loading||e.loadend||(e.loading=!0,e.loadTitle="",(0,a.getAddressList)({page:e.page,limit:e.limit}).then((function(t){var i=t.data.list,n=i.length<e.limit;e.addressList=e.$util.SplitArray(i,e.addressList),e.$set(e,"addressList",e.addressList),e.loadend=n,e.loadTitle=n?"我也是有底线的":"加载更多",e.page=e.page+1,e.loading=!1})).catch((function(t){e.loading=!1,e.loadTitle="加载更多"})))},radioChange:function(t){var e=parseInt(t.detail.value),i=this,n=this.addressList[e];if(void 0==n)return i.$util.Tips({title:"您设置的默认地址不存在!"});(0,a.setAddressDefault)(n.address_id).then((function(t){for(var n=0,a=i.addressList.length;n<a;n++)i.addressList[n].is_default=n==e;i.$util.Tips({title:"设置成功",icon:"success"},(function(){i.$set(i,"addressList",i.addressList)}))})).catch((function(t){return i.$util.Tips({title:t})}))},editAddress:function(t){var e=this.cartId,i=this.pinkId,n=this.couponId;this.cartId="",this.pinkId="",this.couponId="",uni.navigateTo({url:"/pages/users/user_address/index?id="+t+"&cartId="+e+"&pinkId="+i+"&couponId="+n})},delAddress:function(t){var e=this,i=this.addressList[t];if(void 0==i)return e.$util.Tips({title:"您删除的地址不存在!"});(0,a.delAddress)(i.address_id).then((function(i){e.$util.Tips({title:"删除成功",icon:"success"},(function(){e.addressList.splice(t,1),e.$set(e,"addressList",e.addressList)}))})).catch((function(t){return e.$util.Tips({title:t})}))},addAddress:function(){var t=this.cartId;this.pinkId,this.couponId;this.cartId="",this.pinkId="",this.couponId="",uni.navigateTo({url:"/pages/users/user_address/index?cartId="+t})},goOrder:function(t){var e="",i="",n="";this.cartId&&t&&(e=this.cartId,i=this.pinkId,n=this.couponId,this.cartId="",this.pinkId="",this.couponId="",uni.redirectTo({url:"/pages/users/order_confirm/index?is_address=1&cartId="+e+"&addressId="+t+"&pinkId="+i+"&couponId="+n}))}},onReachBottom:function(){this.getAddressList()}});e.default=r},"7d4e":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{style:t.viewColor},[n("v-uni-view",{staticClass:"address-management",class:t.addressList.length<1&&t.page>1?"fff":""},[n("v-uni-view",{staticClass:"line"},[t.addressList.length?n("v-uni-image",{attrs:{src:t.domain+"/static/images/line.jpg"}}):t._e()],1),t.addressList.length?n("v-uni-radio-group",{staticClass:"radio-group",on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.radioChange.apply(void 0,arguments)}}},t._l(t.addressList,(function(e,i){return n("v-uni-view",{key:i,staticClass:"item"},[n("v-uni-view",{staticClass:"address",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goOrder(e.address_id)}}},[n("v-uni-view",{staticClass:"consignee"},[t._v("收货人："+t._s(e.real_name)),n("v-uni-text",{staticClass:"phone"},[t._v(t._s(e.phone))])],1),n("v-uni-view",[t._v("收货地址："+t._s(e.province||"")+t._s(e.city||"")+t._s(e.district||"")+t._s(e.street||"")+t._s(e.detail||""))])],1),n("v-uni-view",{staticClass:"operation acea-row row-between-wrapper"},[n("v-uni-radio",{staticClass:"radio",attrs:{value:i.toString(),checked:!!e.is_default}},[n("v-uni-text",[t._v("设为默认")])],1),n("v-uni-view",{staticClass:"acea-row row-middle"},[n("v-uni-view",{on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.editAddress(e.address_id)}}},[n("v-uni-text",{staticClass:"iconfont icon-bianji"}),t._v("编辑")],1),n("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.delAddress(i)}}},[n("v-uni-text",{staticClass:"iconfont icon-shanchu"}),t._v("删除")],1)],1)],1)],1)})),1):t._e(),t.addressList.length?n("v-uni-view",{staticClass:"loadingicon acea-row row-center-wrapper"},[n("v-uni-text",{staticClass:"loading iconfont icon-jiazai",attrs:{hidden:0==t.loading}}),t._v(t._s(t.loadTitle))],1):t._e(),t.addressList.length<1&&t.page>1?n("v-uni-view",{staticClass:"noCommodity"},[n("v-uni-view",{staticClass:"pictrue"},[n("v-uni-image",{attrs:{src:i("91c7")}})],1),n("v-uni-view",[t._v("暂无地址")])],1):t._e(),n("v-uni-view",{staticClass:"footer acea-row row-between-wrapper"},[n("v-uni-view",{staticClass:"addressBnt b-color on",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.addAddress.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"iconfont icon-tianjiadizhi"}),t._v("添加新地址")],1)],1)],1),n("authorize",{attrs:{isAuto:t.isAuto,isShowAuth:t.isShowAuth},on:{onLoadFun:function(e){arguments[0]=e=t.$handleEvent(e),t.onLoadFun.apply(void 0,arguments)},authColse:function(e){arguments[0]=e=t.$handleEvent(e),t.authColse.apply(void 0,arguments)}}})],1)},a=[]},"913c":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,"[data-v-7c133e76] uni-radio .wx-radio-input.wx-radio-input-checked,[data-v-7c133e76] uni-radio .uni-radio-input.uni-radio-input-checked{border:1px solid var(--view-theme)!important;background-color:var(--view-theme)!important}.address-management.fff[data-v-7c133e76]{background-color:#fff;height:100vh}.address-management .line[data-v-7c133e76]{width:100%;height:%?3?%}.address-management .line uni-image[data-v-7c133e76]{width:100%;height:100%;display:block}.address-management .item[data-v-7c133e76]{background-color:#fff;padding:0 %?30?%;margin-bottom:%?12?%}.address-management .item .address[data-v-7c133e76]{padding:%?30?% 0;border-bottom:1px solid #eee;font-size:%?28?%;color:#282828}.address-management .item .address .consignee[data-v-7c133e76]{font-size:%?28?%;font-weight:700;margin-bottom:%?8?%}.address-management .item .address .consignee .phone[data-v-7c133e76]{margin-left:%?25?%}.address-management .item .operation[data-v-7c133e76]{height:%?83?%;font-size:%?28?%;color:#282828}.b-color[data-v-7c133e76]{background-color:var(--view-theme)}.address-management .item .operation .radio uni-text[data-v-7c133e76]{margin-left:%?13?%}.address-management .item .operation .iconfont[data-v-7c133e76]{color:#2c2c2c;font-size:%?35?%;vertical-align:%?-2?%;margin-right:%?10?%}.address-management .item .operation .iconfont.icon-shanchu[data-v-7c133e76]{margin-left:%?40?%;font-size:%?38?%}.address-management .footer[data-v-7c133e76]{position:fixed;width:100%;background-color:#fff;bottom:0;bottom:calc(0rpx+ constant(safe-area-inset-bottom)); /*\\/兼容 IOS<11.2/ */bottom:calc(%?0?% + env(safe-area-inset-bottom)); /*\\/兼容 IOS>11.2/ */height:%?106?%;padding:0 %?30?%;box-sizing:border-box}.address-management .footer .addressBnt[data-v-7c133e76]{width:%?330?%;height:%?76?%;border-radius:%?50?%;text-align:center;line-height:%?76?%;font-size:%?30?%;color:#fff}.address-management .footer .addressBnt.on[data-v-7c133e76]{width:%?690?%;margin:0 auto}.address-management .footer .addressBnt .iconfont[data-v-7c133e76]{font-size:%?35?%;margin-right:%?8?%;vertical-align:%?-1?%}.address-management .footer .addressBnt.wxbnt[data-v-7c133e76]{background-color:#fe960f}.noCommodity[data-v-7c133e76]{text-align:center;border-top:none;margin-top:15vh}.noCommodity .pictrue[data-v-7c133e76]{height:%?305?%}.noCommodity uni-view[data-v-7c133e76]{color:#999}",""]),t.exports=e},"91c7":function(t,e,i){t.exports=i.p+"static/img/noAddress.81c95e2d.png"},b818:function(t,e,i){var n=i("913c");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("0caf0f56",n,!0,{sourceMap:!1,shadowMode:!1})},cd60:function(t,e,i){"use strict";i.r(e);var n=i("4b18"),a=i.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},d96e:function(t,e,i){"use strict";i.r(e);var n=i("7d4e"),a=i("cd60");for(var s in a)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("f5a9");var o=i("f0c5"),d=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"7c133e76",null,!1,n["a"],void 0);e["default"]=d.exports},f5a9:function(t,e,i){"use strict";var n=i("b818"),a=i.n(n);a.a},fa4e:function(t,e,i){"use strict";var n=i("178d"),a=i.n(n);a.a}}]);