(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order_details-delivery"],{"02f6":function(t,e,n){"use strict";n.r(e);var i=n("65ba"),o=n("1029");for(var r in o)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("e49b");var a=n("f0c5"),s=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,"2fda29d4",null,!1,i["a"],void 0);e["default"]=s.exports},"0f96":function(t,e,n){"use strict";n("7a82");var i=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("5530")),r=i(n("a50e")),a=n("cd6d"),s=n("937f"),d=n("26cb"),u=i(n("823f")),c=n("3255"),f=(i(n("42cb")),n("ddb3")),l=getApp(),v={name:"Authorize",props:{isAuto:{type:Boolean,default:!0},isGoIndex:{type:Boolean,default:!0},isShowAuth:{type:Boolean,default:!1}},components:{},data:function(){return{title:"用户登录",info:"请登录，将为您提供更好的服务！",isWeixin:this.$wechat.isWeixin(),canUseGetUserProfile:!1,code:null,top:0,mp_is_new:this.$Cache.get("MP_VERSION_ISNEW")||!1,editModal:!1,canGetPrivacySetting:!1}},computed:(0,o.default)((0,o.default)({},(0,d.mapGetters)(["isLogin","userInfo","viewColor"])),(0,c.configMap)(["routine_logo","first_avatar_switch","wechat_phone_switch"])),watch:{isLogin:function(t){!0===t&&this.$emit("onLoadFun",this.userInfo)},isShowAuth:function(t){this.getCode(this.isShowAuth)}},created:function(){this.top=uni.getSystemInfoSync().windowHeight/2-70,wx.getUserProfile&&(this.canUseGetUserProfile=!0),this.setAuthStatus(),this.getCode(this.isShowAuth)},methods:{onclose:function(){this.canGetPrivacySetting=!1},onAgree:function(){var t=this;t.canUseGetUserProfile=!1,u.default.getUserProfile().then((function(e){var n=e.userInfo;n.code=t.code,n.spread=l.globalData.spid,n.spread_code=l.globalData.code,(0,a.commonAuth)({auth:{type:"routine",auth:n}}).then((function(e){if(200!=e.data.status)return uni.setStorageSync("auth_token",e.data.result.key),uni.navigateTo({url:"/pages/users/login/index"});var n=e.data.result.expires_time-r.default.time();t.$store.commit("UPDATE_USERINFO",e.data.result.user),t.$store.commit("LOGIN",{token:e.data.result.token,time:n}),t.$store.commit("SETUID",e.data.result.user.uid),r.default.set(s.EXPIRES_TIME,e.data.result.expires_time,n),r.default.set(s.USER_INFO,e.data.result.user,n),t.$emit("onLoadFun",e.data.result.user),e.data.result.user.isNew&&t.mp_is_new&&1==t.first_avatar_switch&&1==t.wechat_phone_switch&&(t.editModal=!0)})).catch((function(t){uni.hideLoading(),uni.showToast({title:t.message,icon:"none",duration:2e3})}))})).catch((function(t){uni.hideLoading()}))},setAuthStatus:function(){},getCode:function(t){t&&(this.code=1)},toWecahtAuth:function(){(0,f.toLogin)(!0)},getUserProfile:function(){var t=this;wx.getPrivacySetting?wx.getPrivacySetting({success:function(e){e.needAuthorization?(t.canGetPrivacySetting=!0,t.$nextTick((function(){t.$refs.privacyAgreement.showPoupon(e.privacyContractName)}))):t.onAgree()},fail:function(){},complete:function(){}}):this.onAgree()},close:function(){var t=getCurrentPages();t[t.length-1];this.$emit("authColse",!1),this.canGetPrivacySetting=!1}}};e.default=v},1029:function(t,e,n){"use strict";n.r(e);var i=n("0f96"),o=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},"59c6":function(t,e,n){"use strict";n("7a82");var i=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.applyInvoiceApi=function(t,e){return o.default.post("order/receipt/".concat(t),e)},e.cartDel=function(t){return o.default.post("user/cart/delete",t)},e.changeCartNum=function(t,e){return o.default.post("user/cart/change/"+t,e)},e.createOrder=function(t){return o.default.post("v2/order/create",t,{noAuth:!0})},e.develiveryDetail=function(t){return o.default.get("order/delivery/".concat(t))},e.express=function(t){return o.default.post("order/express/"+t)},e.expressList=function(){return o.default.get("common/express")},e.getCallBackUrlApi=function(t){return o.default.get("common/pay_key/"+t,{},{noAuth:!0})},e.getCartCounts=function(){return o.default.get("user/cart/count")},e.getCartList=function(){return o.default.get("user/cart/lst")},e.getCouponsOrderPrice=function(t,e){return o.default.get("coupons/order/"+t,e)},e.getOrderConfirm=function(t){return o.default.post("v2/order/check",t)},e.getOrderDetail=function(t){return o.default.get("order/detail/"+t)},e.getOrderList=function(t){return o.default.get("order/list",t)},e.getPayOrder=function(t){return o.default.get("order/status/"+t)},e.getReceiptOrder=function(t){return o.default.get("user/receipt/order/"+t)},e.groupOrderDetail=function(t){return o.default.get("order/group_order_detail/"+t)},e.groupOrderList=function(t){return o.default.get("order/group_order_list",t,{noAuth:!0})},e.integralOrderPay=function(t,e){return o.default.post("order/points/pay/"+t,e)},e.ordeRefundReason=function(){return o.default.get("order/refund/reason")},e.orderAgain=function(t){return o.default.post("user/cart/again",t)},e.orderComment=function(t,e){return o.default.post("reply/"+t,e)},e.orderConfirm=function(t){return o.default.post("order/check",t)},e.orderCreate=function(t){return o.default.post("order/create",t,{noAuth:!0})},e.orderData=function(){return o.default.get("order/number")},e.orderDel=function(t){return o.default.post("order/del/"+t)},e.orderPay=function(t,e){return o.default.post("order/pay/"+t,e)},e.orderProduct=function(t){return o.default.get("reply/product/"+t)},e.orderRefundVerify=function(t){return o.default.post("order/refund/verify",t)},e.orderTake=function(t){return o.default.post("order/take/"+t)},e.postOrderComputed=function(t,e){return o.default.post("/order/computed/"+t,e)},e.presellOrderPay=function(t,e){return o.default.post("presell/pay/"+t,e)},e.receiptOrder=function(t){return o.default.get("user/receipt/order",t)},e.refundApply=function(t,e){return o.default.post("refund/apply/"+t,e,{noAuth:!0})},e.refundBackGoods=function(t,e){return o.default.post("refund/back_goods/"+t,e,{noAuth:!0})},e.refundBatch=function(t){return o.default.get("refund/batch_product/"+t,{noAuth:!0})},e.refundCancelApi=function(t){return o.default.post("refund/cancel/".concat(t))},e.refundDel=function(t){return o.default.post("refund/del/"+t,{noAuth:!0})},e.refundDetail=function(t){return o.default.get("refund/detail/"+t,{noAuth:!0})},e.refundExpress=function(t){return o.default.get("refund/express/"+t,{noAuth:!0})},e.refundList=function(t){return o.default.get("refund/list",t,{noAuth:!0})},e.refundMessage=function(){return o.default.get("common/refund_message",{noAuth:!0})},e.refundOrderExpress=function(t,e){return o.default.get("server/".concat(t,"/refund/express/").concat(e))},e.refundProduct=function(t,e){return o.default.get("refund/product/"+t,e,{noAuth:!0})},e.unOrderCancel=function(t){return o.default.post("order/cancel/"+t)},e.verifyCode=function(t){return o.default.get("order/verify_code/"+t)},n("99af");var o=i(n("3314"))},"5a88":function(t,e,n){"use strict";n("7a82");var i=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("59c6"),r=n("26cb"),a=n("f26a"),s=i(n("02f6")),d={components:{authorize:s.default},data:function(){return{isAuto:!1,isShowAuth:!1,orderId:"",code:"",status:0,deliveryInfo:{},expressList:[],domain:a.HTTP_REQUEST_URL}},computed:(0,r.mapGetters)(["isLogin"]),onLoad:function(t){if(!t.orderId)return this.$util.Tips({title:"缺少订单号"});this.orderId=t.orderId,this.isLogin?this.getExpress():(this.isAuto=!0,this.isShowAuth=!0)},onReady:function(){},methods:{onLoadFun:function(){this.getExpress(),this.isShowAuth=!1},authColse:function(t){this.isShowAuth=t},getExpress:function(){var t=this;(0,o.develiveryDetail)(t.orderId).then((function(e){var n=e.data.storeOrderStatus||{};t.$set(t,"deliveryInfo",e.data.storeOrder),t.$set(t,"code",e.data.finish_code),t.$set(t,"status",e.data.status),t.$set(t,"expressList",n||[])}))},call:function(){uni.makePhoneCall({phoneNumber:this.deliveryInfo.delivery_id})}}};e.default=d},"65ba":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[t.isShowAuth&&t.code?n("v-uni-view",{staticClass:"mask",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.close.apply(void 0,arguments)}}}):t._e(),t.isShowAuth&&t.code?n("v-uni-view",{staticClass:"Popup",class:{privacyPoupon:t.canGetPrivacySetting},style:"top:"+t.top+"px;"},[n("v-uni-view",{staticClass:"logo-auth"},[n("v-uni-image",{staticClass:"image",attrs:{src:t.routine_logo,mode:"aspectFit"}})],1),t.isWeixin?n("v-uni-text",{staticClass:"title"},[t._v("授权提醒")]):n("v-uni-text",{staticClass:"title"},[t._v(t._s(t.title))]),t.isWeixin?n("v-uni-text",{staticClass:"tip"},[t._v("请授权用户信息，以便为您提供更好的服务！")]):n("v-uni-text",{staticClass:"tip"},[t._v(t._s(t.info))]),n("v-uni-view",{staticClass:"bottom flex"},[n("v-uni-text",{staticClass:"item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.close.apply(void 0,arguments)}}},[t._v("随便逛逛")]),n("v-uni-button",{staticClass:"item grant",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toWecahtAuth.apply(void 0,arguments)}}},[t.isWeixin?n("v-uni-text",{staticClass:"text"},[t._v("去授权")]):n("v-uni-text",{staticClass:"text"},[t._v("去登录")])],1)],1)],1):t._e()],1)},o=[]},"664c":function(t,e,n){"use strict";var i=n("b6fd"),o=n.n(i);o.a},7126:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"logistics"},[n("v-uni-view",{staticClass:"logisticsCon"},[n("v-uni-view",{staticClass:"company"},[0==t.status||2==t.status?n("v-uni-view",{staticClass:"order_head"},[n("v-uni-view",{staticClass:"order_number"},[t._v(t._s(0==t.status?"待接单":"待取货"))]),n("v-uni-view",{},[t._v("等待配送员接单完成后开始派送")])],1):t._e(),t.code&&0!=t.status&&2!=t.status?n("v-uni-view",{staticClass:"order_head"},[n("v-uni-view",{staticClass:"order_number"},[t._v(t._s(t.code))]),n("v-uni-view",[t._v("稍后请将收货码告诉配送员")])],1):t._e(),n("v-uni-view",{staticClass:"order_delivery"},[n("v-uni-view",{staticClass:"delivery_info"},[n("v-uni-view",{staticClass:"delivery_pic"},[n("v-uni-image",{attrs:{src:t.domain+"/static/images/delivery_man.png"}})],1),t.deliveryInfo.delivery_id?n("v-uni-view",{staticClass:"delivery_name"},[n("v-uni-view",[t._v(t._s(t.deliveryInfo.delivery_name)),n("br"),t._v(t._s(t.deliveryInfo.delivery_id))])],1):n("v-uni-view",{staticClass:"delivery_name_not"},[t._v("配送员未接单")])],1),n("v-uni-view",{staticClass:"delivery_phone iconfont",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.call.apply(void 0,arguments)}}},[t._v("")])],1)],1),n("v-uni-view",{staticClass:"order_logistic"},[n("v-uni-view",{staticClass:"recip_info"},[n("v-uni-view",{staticClass:"title"},[t._v("收件人信息")]),n("v-uni-view",[n("v-uni-view",{staticClass:"items acea-row row-between"},[n("v-uni-view",[t._v("姓名：")]),n("v-uni-view",{staticClass:"conter"},[t._v(t._s(t.deliveryInfo.real_name))])],1),n("v-uni-view",{staticClass:"items acea-row row-between"},[n("v-uni-view",[t._v("手机号：")]),n("v-uni-view",{staticClass:"conter"},[t._v(t._s(t.deliveryInfo.user_phone))])],1),n("v-uni-view",{staticClass:"items acea-row row-between"},[n("v-uni-view",[t._v("地址：")]),n("v-uni-view",{staticClass:"conter"},[t._v(t._s(t.deliveryInfo.user_address))])],1)],1)],1),n("v-uni-view",{staticClass:"logistic_count"},t._l(t.expressList,(function(e,i){return n("v-uni-view",{key:i,staticClass:"item"},[n("v-uni-view",{staticClass:"circular",class:0===i?"on iconfont icon-xuanzhong1":""}),n("v-uni-view",{staticClass:"text",class:0===i?"on-font on":""},[n("v-uni-view",[t._v(t._s(e.change_message))]),n("v-uni-view",{staticClass:"data",class:0===i?"on-font on":""},[t._v(t._s(e.change_time))])],1)],1)})),1)],1)],1)],1),n("authorize",{attrs:{isAuto:t.isAuto,isShowAuth:t.isShowAuth},on:{onLoadFun:function(e){arguments[0]=e=t.$handleEvent(e),t.onLoadFun.apply(void 0,arguments)},authColse:function(e){arguments[0]=e=t.$handleEvent(e),t.authColse.apply(void 0,arguments)}}})],1)},o=[]},7299:function(t,e,n){"use strict";n.r(e);var i=n("5a88"),o=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},b6fd:function(t,e,n){var i=n("e845");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("2a9ef133",i,!0,{sourceMap:!1,shadowMode:!1})},bfd2:function(t,e,n){var i=n("c51f");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("eb258e76",i,!0,{sourceMap:!1,shadowMode:!1})},c51f:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.Popup[data-v-2fda29d4]{flex:1;align-items:center;justify-content:center;width:%?500?%;background-color:#fff;position:fixed;top:%?500?%;left:%?125?%;z-index:900\n  /* \t&.privacyPoupon{\n\t\tz-index: 0\n\t} */}.Popup .logo-auth[data-v-2fda29d4]{z-index:-1;position:absolute;left:50%;top:0;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:%?150?%;height:%?150?%;display:flex;align-items:center;justify-content:center;border:%?8?% solid #fff;border-radius:50%;background:#fff}.Popup .image[data-v-2fda29d4]{height:%?42?%;margin-top:%?-54?%}.Popup .title[data-v-2fda29d4]{font-size:%?28?%;color:#000;text-align:center;margin-top:%?30?%;align-items:center;justify-content:center;width:%?500?%;display:flex}.Popup .tip[data-v-2fda29d4]{font-size:%?22?%;color:#555;padding:0 %?24?%;margin-top:%?25?%;display:flex;align-items:center;justify-content:center}.Popup .bottom .item[data-v-2fda29d4]{width:%?250?%;height:%?80?%;background-color:#eee;text-align:center;line-height:%?80?%;margin-top:%?54?%;font-size:%?24?%;color:#666}.Popup .bottom .item .text[data-v-2fda29d4]{font-size:%?24?%;color:#666}.Popup .bottom .item.on[data-v-2fda29d4]{width:%?500?%}.flex[data-v-2fda29d4]{display:flex;flex-direction:row}.Popup .bottom .item.grant[data-v-2fda29d4]{font-weight:700;background-color:#e93323;\n  /* background-color: var(--view-theme); */border-radius:0;padding:0}.Popup .bottom .item.grant .text[data-v-2fda29d4]{font-size:%?28?%;color:#fff}.mask[data-v-2fda29d4]{position:fixed;top:0;right:0;left:0;bottom:0;background-color:rgba(0,0,0,.65);z-index:99}',""]),t.exports=e},e49b:function(t,e,n){"use strict";var i=n("bfd2"),o=n.n(i);o.a},e845:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.logistics[data-v-1386d9f2]{padding:0 %?30?%}.order_head[data-v-1386d9f2]{text-align:center;color:#282828;font-size:%?24?%;border-bottom:1px dashed #d8d8d8;padding-bottom:%?40?%}.order_head .order_number[data-v-1386d9f2]{font-size:%?66?%;font-weight:700}.order_delivery[data-v-1386d9f2]{padding:%?30?%;display:flex;justify-content:space-between;align-items:center}.order_delivery .delivery_info[data-v-1386d9f2]{width:%?300?%;display:flex;justify-content:space-between;align-items:center}.order_delivery .delivery_info .delivery_name[data-v-1386d9f2]{color:#666}.order_delivery .delivery_info .delivery_name_not[data-v-1386d9f2]{font-weight:700}.order_delivery .delivery_info uni-image[data-v-1386d9f2], .order_delivery .delivery_info uni-image[data-v-1386d9f2]{width:%?80?%;height:%?80?%}.order_delivery .delivery_phone[data-v-1386d9f2]{width:%?44?%;height:%?44?%;border-radius:100%;background:#e7e7e7;text-align:center;line-height:%?44?%;font-size:%?20?%;color:#666}.logistics .logisticsCon[data-v-1386d9f2]{margin:%?12?% 0}.logistics .logisticsCon .company[data-v-1386d9f2]{background-color:#fff;padding:%?30?% 0;border-radius:%?16?%}.order_logistic[data-v-1386d9f2]{background-color:#fff;margin-top:%?30?%;border-radius:%?16?%;padding:%?30?%}.recip_info[data-v-1386d9f2]{border-bottom:1px dashed #d8d8d8;padding-bottom:%?30?%}.recip_info .title[data-v-1386d9f2]{font-size:%?30?%;font-weight:700;color:#282828;margin-bottom:%?30?%}.recip_info .items ~ .items[data-v-1386d9f2]{margin-top:%?24?%}.recip_info .items .conter[data-v-1386d9f2]{color:#868686;width:%?460?%;text-align:right}.logistic_count[data-v-1386d9f2]{margin-top:%?30?%}.logistics .logisticsCon .item[data-v-1386d9f2]{padding:0 %?40?%;position:relative}.logistics .logisticsCon .item .circular[data-v-1386d9f2]{width:%?20?%;height:%?20?%;border-radius:50%;position:absolute;top:%?-1?%;left:%?31.5?%;background-color:#ddd}.logistics .logisticsCon .item .circular.on[data-v-1386d9f2]{color:#e93323;background-color:initial;font-size:%?30?%;left:%?30?%}.logistics .logisticsCon .item .text.on-font[data-v-1386d9f2]{color:#282828;font-size:%?30?%;font-weight:700}.logistics .logisticsCon .item .text .data.on-font[data-v-1386d9f2]{color:#282828;font-weight:400}.logistics .logisticsCon .item .text[data-v-1386d9f2]{font-size:%?26?%;color:#666;width:%?615?%;border-left:1px solid #e6e6e6;padding:0 0 %?60?% %?38?%}.logistics .logisticsCon .item .text.on[data-v-1386d9f2]{border-left-color:#f8c1bd}.logistics .logisticsCon .item .text .data[data-v-1386d9f2]{font-size:%?24?%;color:#999;margin-top:%?10?%}.logistics .logisticsCon .item .text .data .time[data-v-1386d9f2]{margin-left:%?15?%}',""]),t.exports=e},fd4a:function(t,e,n){"use strict";n.r(e);var i=n("7126"),o=n("7299");for(var r in o)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("664c");var a=n("f0c5"),s=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,"1386d9f2",null,!1,i["a"],void 0);e["default"]=s.exports}}]);