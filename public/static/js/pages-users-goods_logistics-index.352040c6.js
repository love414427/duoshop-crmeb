(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-users-goods_logistics-index"],{"02f6":function(t,e,o){"use strict";o.r(e);var n=o("3668"),i=o("1029");for(var r in i)["default"].indexOf(r)<0&&function(t){o.d(e,t,(function(){return i[t]}))}(r);o("fa4e");var a=o("f0c5"),s=Object(a["a"])(i["default"],n["b"],n["c"],!1,null,"2f7fb421",null,!1,n["a"],void 0);e["default"]=s.exports},"039c":function(t,e,o){"use strict";var n=o("cbfe"),i=o.n(n);i.a},"0abe":function(t,e,o){var n=o("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.Popup[data-v-2f7fb421]{flex:1;align-items:center;justify-content:center;width:%?500?%;background-color:#fff;position:fixed;top:%?500?%;left:%?125?%;z-index:1000}.Popup .logo-auth[data-v-2f7fb421]{z-index:-1;position:absolute;left:50%;top:0;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:%?150?%;height:%?150?%;display:flex;align-items:center;justify-content:center;border:%?8?% solid #fff;border-radius:50%;background:#fff}.Popup .image[data-v-2f7fb421]{height:%?42?%;margin-top:%?-54?%}.Popup .title[data-v-2f7fb421]{font-size:%?28?%;color:#000;text-align:center;margin-top:%?30?%;align-items:center;justify-content:center;width:%?500?%;display:flex}.Popup .tip[data-v-2f7fb421]{font-size:%?22?%;color:#555;padding:0 %?24?%;margin-top:%?25?%;display:flex;align-items:center;justify-content:center}.Popup .bottom .item[data-v-2f7fb421]{width:%?250?%;height:%?80?%;background-color:#eee;text-align:center;line-height:%?80?%;margin-top:%?54?%;font-size:%?24?%;color:#666}.Popup .bottom .item .text[data-v-2f7fb421]{font-size:%?24?%;color:#666}.Popup .bottom .item.on[data-v-2f7fb421]{width:%?500?%}.flex[data-v-2f7fb421]{display:flex;flex-direction:row}.Popup .bottom .item.grant[data-v-2f7fb421]{font-weight:700;background-color:#e93323;\n  /* background-color: var(--view-theme); */border-radius:0;padding:0}.Popup .bottom .item.grant .text[data-v-2f7fb421]{font-size:%?28?%;color:#fff}.mask[data-v-2f7fb421]{position:fixed;top:0;right:0;left:0;bottom:0;background-color:rgba(0,0,0,.65);z-index:99}',""]),t.exports=e},"0f96":function(t,e,o){"use strict";o("7a82");var n=o("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(o("5530")),r=n(o("a50e")),a=o("cd6d"),s=o("937f"),u=o("26cb"),d=n(o("823f")),c=o("3255"),f=(n(o("42cb")),o("ddb3")),l=getApp(),p={name:"Authorize",props:{isAuto:{type:Boolean,default:!0},isGoIndex:{type:Boolean,default:!0},isShowAuth:{type:Boolean,default:!1}},components:{},data:function(){return{title:"用户登录",info:"请登录，将为您提供更好的服务！",isWeixin:this.$wechat.isWeixin(),canUseGetUserProfile:!1,code:null,top:0,mp_is_new:this.$Cache.get("MP_VERSION_ISNEW")||!1,editModal:!1}},computed:(0,i.default)((0,i.default)({},(0,u.mapGetters)(["isLogin","userInfo","viewColor"])),(0,c.configMap)(["routine_logo"])),watch:{isLogin:function(t){!0===t&&this.$emit("onLoadFun",this.userInfo)},isShowAuth:function(t){this.getCode(this.isShowAuth)}},created:function(){this.top=uni.getSystemInfoSync().windowHeight/2-70,wx.getUserProfile&&(this.canUseGetUserProfile=!0),this.setAuthStatus(),this.getCode(this.isShowAuth)},methods:{setAuthStatus:function(){},getCode:function(t){t&&(this.code=1)},toWecahtAuth:function(){(0,f.toLogin)(!0)},getUserProfile:function(){var t=this,e=this;d.default.getUserProfile().then((function(o){var n=o.userInfo;n.code=t.code,n.spread=l.globalData.spid,n.spread_code=l.globalData.code,(0,a.commonAuth)({auth:{type:"routine",auth:n}}).then((function(o){if(200!=o.data.status)return uni.setStorageSync("auth_token",o.data.result.key),uni.navigateTo({url:"/pages/users/login/index"});var n=o.data.result.expires_time-r.default.time();e.$store.commit("UPDATE_USERINFO",o.data.result.user),e.$store.commit("LOGIN",{token:o.data.result.token,time:n}),e.$store.commit("SETUID",o.data.result.user.uid),r.default.set(s.EXPIRES_TIME,o.data.result.expires_time,n),r.default.set(s.USER_INFO,o.data.result.user,n),t.$emit("onLoadFun",o.data.result.user),o.data.result.user.isNew&&t.mp_is_new&&(t.editModal=!0)})).catch((function(t){uni.hideLoading(),uni.showToast({title:t.message,icon:"none",duration:2e3})}))})).catch((function(t){uni.hideLoading()}))},close:function(){var t=getCurrentPages();t[t.length-1];this.$emit("authColse",!1)}}};e.default=p},1029:function(t,e,o){"use strict";o.r(e);var n=o("0f96"),i=o.n(n);for(var r in n)["default"].indexOf(r)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(r);e["default"]=i.a},1110:function(t,e,o){var n=o("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.logistics .header[data-v-675d5acf]{padding:%?23?% %?30?%;background-color:#fff;height:%?166?%;box-sizing:border-box}.logistics .header .pictrue[data-v-675d5acf]{width:%?120?%;height:%?120?%}.logistics .header .pictrue uni-image[data-v-675d5acf]{width:100%;height:100%;border-radius:%?6?%}.logistics .header .text[data-v-675d5acf]{width:%?540?%;font-size:%?28?%;color:#999;margin-top:%?6?%}.logistics .header .text .name[data-v-675d5acf]{width:%?480?%;color:#282828}.logistics .header .text .sku[data-v-675d5acf]{color:#999;font-size:%?22?%;margin-top:%?10?%}.logistics .header .text .money[data-v-675d5acf]{font-size:%?22?%;margin-top:%?10?%}.logistics .logisticsCon[data-v-675d5acf]{background-color:#fff;margin:%?12?% 0}.logistics .logisticsCon .company[data-v-675d5acf]{height:%?120?%;margin:0 0 %?45?% %?30?%;padding-right:%?30?%;border-bottom:1px solid #f5f5f5}.logistics .logisticsCon .company .picTxt[data-v-675d5acf]{width:%?520?%}.logistics .logisticsCon .company .picTxt .iconfont[data-v-675d5acf]{width:%?50?%;height:%?50?%;background-color:#666;text-align:center;line-height:%?50?%;color:#fff;font-size:%?35?%}.logistics .logisticsCon .company .picTxt .text[data-v-675d5acf]{width:%?450?%;font-size:%?26?%;color:#282828}.logistics .logisticsCon .company .picTxt .text .name[data-v-675d5acf]{color:#999}.logistics .logisticsCon .company .picTxt .text .express[data-v-675d5acf]{margin-top:%?5?%}.logistics .logisticsCon .company .copy[data-v-675d5acf]{font-size:%?20?%;width:%?106?%;height:%?40?%;text-align:center;display:flex;align-items:center;justify-content:center;border-radius:%?3?%;border:1px solid #999}.logistics .logisticsCon .item[data-v-675d5acf]{padding:0 %?40?%;position:relative}.logistics .logisticsCon .item .circular[data-v-675d5acf]{width:%?20?%;height:%?20?%;border-radius:50%;position:absolute;top:%?-1?%;left:%?31.5?%;background-color:#ddd}.logistics .logisticsCon .item .circular.on[data-v-675d5acf]{background-color:#e93323}.logistics .logisticsCon .item .text.on-font[data-v-675d5acf]{color:#e93323}.logistics .logisticsCon .item .text .data.on-font[data-v-675d5acf]{color:#e93323}.logistics .logisticsCon .item .text[data-v-675d5acf]{font-size:%?26?%;color:#666;width:%?615?%;border-left:1px solid #e6e6e6;padding:0 0 %?60?% %?38?%}.logistics .logisticsCon .item .text.on[data-v-675d5acf]{border-left-color:#f8c1bd}.logistics .logisticsCon .item .text .data[data-v-675d5acf]{font-size:%?24?%;color:#999;margin-top:%?10?%}.logistics .logisticsCon .item .text .data .time[data-v-675d5acf]{margin-left:%?15?%}',""]),t.exports=e},"178d":function(t,e,o){var n=o("0abe");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=o("4f06").default;i("a1548d5e",n,!0,{sourceMap:!1,shadowMode:!1})},3668:function(t,e,o){"use strict";o.d(e,"b",(function(){return n})),o.d(e,"c",(function(){return i})),o.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-uni-view",[t.isShowAuth&&t.code?o("v-uni-view",{staticClass:"mask",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.close.apply(void 0,arguments)}}}):t._e(),t.isShowAuth&&t.code?o("v-uni-view",{staticClass:"Popup",style:"top:"+t.top+"px;"},[o("v-uni-view",{staticClass:"logo-auth"},[o("v-uni-image",{staticClass:"image",attrs:{src:t.routine_logo,mode:"aspectFit"}})],1),t.isWeixin?o("v-uni-text",{staticClass:"title"},[t._v("授权提醒")]):o("v-uni-text",{staticClass:"title"},[t._v(t._s(t.title))]),t.isWeixin?o("v-uni-text",{staticClass:"tip"},[t._v("请授权头像等信息，以便为您提供更好的服务！")]):o("v-uni-text",{staticClass:"tip"},[t._v(t._s(t.info))]),o("v-uni-view",{staticClass:"bottom flex"},[o("v-uni-text",{staticClass:"item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.close.apply(void 0,arguments)}}},[t._v("随便逛逛")]),o("v-uni-button",{staticClass:"item grant",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toWecahtAuth.apply(void 0,arguments)}}},[t.isWeixin?o("v-uni-text",{staticClass:"text"},[t._v("去授权")]):o("v-uni-text",{staticClass:"text"},[t._v("去登录")])],1)],1)],1):t._e()],1)},i=[]},"59c6":function(t,e,o){"use strict";o("7a82");var n=o("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.applyInvoiceApi=function(t,e){return i.default.post("order/receipt/".concat(t),e)},e.cartDel=function(t){return i.default.post("user/cart/delete",t)},e.changeCartNum=function(t,e){return i.default.post("user/cart/change/"+t,e)},e.createOrder=function(t){return i.default.post("v2/order/create",t,{noAuth:!0})},e.develiveryDetail=function(t){return i.default.get("order/delivery/".concat(t))},e.express=function(t){return i.default.post("order/express/"+t)},e.expressList=function(){return i.default.get("common/express")},e.getCallBackUrlApi=function(t){return i.default.get("common/pay_key/"+t,{},{noAuth:!0})},e.getCartCounts=function(){return i.default.get("user/cart/count")},e.getCartList=function(){return i.default.get("user/cart/lst")},e.getCouponsOrderPrice=function(t,e){return i.default.get("coupons/order/"+t,e)},e.getOrderConfirm=function(t){return i.default.post("v2/order/check",t)},e.getOrderDetail=function(t){return i.default.get("order/detail/"+t)},e.getOrderList=function(t){return i.default.get("order/list",t)},e.getPayOrder=function(t){return i.default.get("order/status/"+t)},e.getReceiptOrder=function(t){return i.default.get("user/receipt/order/"+t)},e.groupOrderDetail=function(t){return i.default.get("order/group_order_detail/"+t)},e.groupOrderList=function(t){return i.default.get("order/group_order_list",t,{noAuth:!0})},e.integralOrderPay=function(t,e){return i.default.post("order/points/pay/"+t,e)},e.ordeRefundReason=function(){return i.default.get("order/refund/reason")},e.orderAgain=function(t){return i.default.post("user/cart/again",t)},e.orderComment=function(t,e){return i.default.post("reply/"+t,e)},e.orderConfirm=function(t){return i.default.post("order/check",t)},e.orderCreate=function(t){return i.default.post("order/create",t,{noAuth:!0})},e.orderData=function(){return i.default.get("order/number")},e.orderDel=function(t){return i.default.post("order/del/"+t)},e.orderPay=function(t,e){return i.default.post("order/pay/"+t,e)},e.orderProduct=function(t){return i.default.get("reply/product/"+t)},e.orderRefundVerify=function(t){return i.default.post("order/refund/verify",t)},e.orderTake=function(t){return i.default.post("order/take/"+t)},e.postOrderComputed=function(t,e){return i.default.post("/order/computed/"+t,e)},e.presellOrderPay=function(t,e){return i.default.post("presell/pay/"+t,e)},e.receiptOrder=function(t){return i.default.get("user/receipt/order",t)},e.refundApply=function(t,e){return i.default.post("refund/apply/"+t,e,{noAuth:!0})},e.refundBackGoods=function(t,e){return i.default.post("refund/back_goods/"+t,e,{noAuth:!0})},e.refundBatch=function(t){return i.default.get("refund/batch_product/"+t,{noAuth:!0})},e.refundCancelApi=function(t){return i.default.post("refund/cancel/".concat(t))},e.refundDel=function(t){return i.default.post("refund/del/"+t,{noAuth:!0})},e.refundDetail=function(t){return i.default.get("refund/detail/"+t,{noAuth:!0})},e.refundExpress=function(t){return i.default.get("refund/express/"+t,{noAuth:!0})},e.refundList=function(t){return i.default.get("refund/list",t,{noAuth:!0})},e.refundMessage=function(){return i.default.get("common/refund_message",{noAuth:!0})},e.refundOrderExpress=function(t,e){return i.default.get("server/".concat(t,"/refund/express/").concat(e))},e.refundProduct=function(t,e){return i.default.get("refund/product/"+t,e,{noAuth:!0})},e.unOrderCancel=function(t){return i.default.post("order/cancel/"+t)},e.verifyCode=function(t){return i.default.get("order/verify_code/"+t)},o("99af");var i=n(o("3314"))},6185:function(t,e,o){"use strict";o.d(e,"b",(function(){return n})),o.d(e,"c",(function(){return i})),o.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-uni-view",[o("v-uni-view",{staticClass:"logistics"},[t.product.cart_info?o("v-uni-view",{staticClass:"header acea-row row-between row-top"},[o("v-uni-view",{staticClass:"pictrue"},[o("v-uni-image",{attrs:{src:t.product.cart_info.product.image}})],1),o("v-uni-view",{staticClass:"text acea-row row-between"},[o("v-uni-view",[o("v-uni-view",{staticClass:"name line1"},[t._v(t._s(t.product.cart_info.product.store_name))]),o("v-uni-view",{staticClass:"sku"},[t._v(t._s(t.product.cart_info.productAttr.sku))]),o("v-uni-view",{staticClass:"money"},[20==t.orderInfo.activity_type?o("v-uni-view",[t._v(t._s(t.product.cart_info.productAttr.ot_price)+"个积分"),t.product.cart_info.productAttr.price>0?[t._v("+"+t._s(t.product.cart_info.productAttr.price)+"元")]:t._e()],2):o("v-uni-view",[t._v("￥"+t._s(t.product.product_price))])],1)],1),o("v-uni-view",[t._v("x"+t._s(t.product.product_num))])],1)],1):t._e(),o("v-uni-view",{staticClass:"logisticsCon"},[o("v-uni-view",{staticClass:"company acea-row row-between-wrapper"},[o("v-uni-view",{staticClass:"picTxt acea-row row-between-wrapper"},[o("v-uni-view",{staticClass:"iconfont icon-wuliu"}),o("v-uni-view",{staticClass:"text"},[o("v-uni-view",[o("v-uni-text",{staticClass:"name line1"},[t._v("物流公司：")]),t._v(t._s(t.orderInfo.delivery_name?t.orderInfo.delivery_name:""))],1),o("v-uni-view",{staticClass:"express line1"},[o("v-uni-text",{staticClass:"name"},[t._v("快递单号：")]),t._v(t._s(t.orderInfo.delivery_id?t.orderInfo.delivery_id:""))],1)],1)],1),o("v-uni-view",{staticClass:"copy copy-data",attrs:{"data-clipboard-text":t.orderInfo.delivery_id}},[t._v("复制单号")])],1),t._l(t.expressList,(function(e,n){return t.expressList.length>0?o("v-uni-view",{key:n,staticClass:"item"},[o("v-uni-view",{staticClass:"circular",class:0===n?"on":""}),o("v-uni-view",{staticClass:"text",class:0===n?"on-font on":""},[o("v-uni-view",[t._v(t._s(e.status))]),o("v-uni-view",{staticClass:"data",class:0===n?"on-font on":""},[t._v(t._s(e.time))])],1)],1):t._e()}))],2),1==t.recommend_switch?o("recommend",{attrs:{hostProduct:t.hostProduct,isLogin:t.isLogin}}):t._e()],1),o("authorize",{attrs:{isAuto:t.isAuto,isShowAuth:t.isShowAuth},on:{onLoadFun:function(e){arguments[0]=e=t.$handleEvent(e),t.onLoadFun.apply(void 0,arguments)},authColse:function(e){arguments[0]=e=t.$handleEvent(e),t.authColse.apply(void 0,arguments)}}})],1)},i=[]},6198:function(t,e,o){"use strict";o("7a82");var n=o("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,o("99af");var i=o("59c6"),r=o("736f"),a=n(o("43a2")),s=o("26cb"),u=o("3255"),d=n(o("1857")),c=n(o("02f6")),f={components:{recommend:d.default,authorize:c.default},data:function(){return{orderId:"",refundId:"",merId:"",product:{},orderInfo:{},expressList:[],hostProduct:[],scroll:!1,isAuto:!1,isShowAuth:!1,page:1,limit:10}},computed:(0,u.configMap)({recommend_switch:0},(0,s.mapGetters)(["isLogin"])),onLoad:function(t){if(!t.orderId&&!t.refundId)return this.$util.Tips({title:"缺少订单号"});this.orderId=t.orderId,this.refundId=t.refundId,this.merId=t.merId,this.isLogin?this.getExpress():(this.isAuto=!0,this.isShowAuth=!0)},onReady:function(){this.$nextTick((function(){var t=this,e=new a.default(".copy-data");e.on("success",(function(){t.$util.Tips({title:"复制成功"})}))}))},methods:{onLoadFun:function(){this.getExpress(),this.isShowAuth=!1},authColse:function(t){this.isShowAuth=t},copyOrderId:function(){uni.setClipboardData({data:this.orderInfo.delivery_id})},getExpress:function(){var t=this;uni.showLoading({title:"加载中",mask:!0}),t.orderId?(0,i.express)(t.orderId).then((function(e){uni.hideLoading();var o=e.data.express||{};t.$set(t,"product",e.data.order.orderProduct[0]||{}),t.$set(t,"orderInfo",e.data.order),t.$set(t,"expressList",o||[]),t.get_host_product()})):(0,i.refundOrderExpress)(t.merId,t.refundId).then((function(e){uni.hideLoading();var o=e.data.express||{};t.$set(t,"product",e.data.refund.refundProduct[0].product||{}),t.$set(t,"orderInfo",e.data.refund),t.$set(t,"expressList",o||[]),t.get_host_product()}))},get_host_product:function(){var t=this;t.scroll||(t.scroll=!0,(0,r.getProductHot)(t.page,t.limit).then((function(e){t.page++,t.scroll=e.data.list.length<t.limit,t.hostProduct=t.hostProduct.concat(e.data.list)})))}},onReachBottom:function(){this.get_host_product()},onPageScroll:function(){uni.$emit("scroll")}};e.default=f},a3c1:function(t,e,o){"use strict";o.r(e);var n=o("6198"),i=o.n(n);for(var r in n)["default"].indexOf(r)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(r);e["default"]=i.a},cbfe:function(t,e,o){var n=o("1110");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=o("4f06").default;i("5852d7c8",n,!0,{sourceMap:!1,shadowMode:!1})},cf17:function(t,e,o){"use strict";o.r(e);var n=o("6185"),i=o("a3c1");for(var r in i)["default"].indexOf(r)<0&&function(t){o.d(e,t,(function(){return i[t]}))}(r);o("039c");var a=o("f0c5"),s=Object(a["a"])(i["default"],n["b"],n["c"],!1,null,"675d5acf",null,!1,n["a"],void 0);e["default"]=s.exports},fa4e:function(t,e,o){"use strict";var n=o("178d"),i=o.n(n);i.a}}]);