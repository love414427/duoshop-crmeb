(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-activity-combination-index"],{"041f":function(t,e,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.assistHelpList=function(t,e){return a.default.get("store/product/assist/user/"+t,e)},e.assistUserData=function(t){return a.default.get("store/product/assist/count",t,{noAuth:!0})},e.getActivitycategory=function(t){return a.default.get("product/spu/active/category/"+t,{},{noAuth:!0})},e.getAssistDetail=function(t,e){return a.default.get("store/product/assist/detail/"+t,e)},e.getAssistList=function(t){return a.default.get("store/product/assist/lst",t,{noAuth:!0})},e.getAssistUser=function(t){return a.default.get("store/product/assist/share/"+t)},e.getBargainUserCancel=function(t){return a.default.post("store/product/assist/set/delete/"+t)},e.getBargainUserList=function(t){return a.default.get("store/product/assist/set/lst",t)},e.getCombinationDetail=function(t){return a.default.get("store/product/group/detail/"+t,{},{noAuth:!0})},e.getCombinationList=function(t){return a.default.get("store/product/group/lst",t,{noAuth:!0})},e.getCombinationPink=function(t){return a.default.get("store/product/group/get/"+t)},e.getCombinationPoster=function(t){return a.default.post("combination/poster",t)},e.getCombinationUser=function(t){return a.default.get("store/product/group/count",t,{noAuth:!0})},e.getCouponLst=function(t){return a.default.get("coupon/getlst",t,{noAuth:!0})},e.getMerchantServiceLst=function(t){return a.default.get("store/merchant/local",t,{noAuth:!0})},e.getNewPeopleCouponLst=function(t){return a.default.get("coupon/new_people",t,{noAuth:!0})},e.getPresellList=function(t){return a.default.get("store/product/presell/lst",t,{noAuth:!0})},e.getSeckillDetail=function(t){return a.default.get("store/product/seckill/detail/"+t,{},{noAuth:!0})},e.getSeckillIndexTime=function(){return a.default.get("store/product/seckill/select",{},{noAuth:!0})},e.getSeckillList=function(t){return a.default.get("store/product/seckill/lst",t,{noAuth:!0})},e.getTopicDetail=function(t){return a.default.get("activity/info/".concat(t),{},{noAuth:!0})},e.getTopicList=function(t,e){return a.default.get("activity/lst/".concat(t),e,{noAuth:!0})},e.getTopicProLst=function(t){return a.default.get("product/spu/labels",t,{noAuth:!0})},e.hotRankingApi=function(t){return a.default.get("product/spu/get_hot_ranking",t,{noAuth:!0})},e.initiateAssistApi=function(t){return a.default.post("store/product/assist/create/"+t)},e.postAssistHelp=function(t){return a.default.post("store/product/assist/set/"+t)},e.postCombinationRemove=function(t){return a.default.post("store/product/group/cancel",t)},e.presellAgreement=function(){return a.default.get("store/product/presell/agree")},e.scombinationCode=function(t){return a.default.get("combination/code/"+t)},e.seckillCode=function(t,e){return a.default.get("seckill/code/"+t,e)},e.spuTop=function(t){return a.default.get("store/product/category/hotranking",{},{noAuth:!0})},e.spuTopList=function(t){return a.default.get("product/spu/get_hot_ranking",t,{noAuth:!0})};var a=n(i("3314"))},"17f8":function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("ac1f");var n={data:function(){return{init:!0,distance:0,boxWidth:0,timer:null}},props:{combinationUserList:{type:Array,default:function(){}}},watch:{combinationUserList:function(){var t=this;setTimeout((function(e){var i=uni.createSelectorQuery().in(t);i.select("#box").boundingClientRect((function(e){t.width=e.width,t.move()})).exec()}),1e3)}},activated:function(){this.move()},methods:{move:function(){var t=this;this.timer=setInterval((function(){t.$set(t,"distance",t.distance-t.width/t.combinationUserList.length),t.distance===-t.width&&(t.init=!1,t.distance=0,setTimeout((function(e){t.init=!0}),800))}),2500)}},destroyed:function(){clearInterval(this.timer),this.timer=null},deactivated:function(){clearInterval(this.timer),this.timer=null}};e.default=n},"1d75":function(t,e,i){"use strict";var n=i("3b1d"),a=i.n(n);a.a},"1e7c":function(t,e,i){"use strict";var n=i("3602"),a=i.n(n);a.a},"2eec":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.page-container[data-v-7a9bec1f]{min-height:100vh;background-color:var(--view-theme)}.icon-xiangzuo[data-v-7a9bec1f]{margin-left:%?20?%;font-size:%?40?%;color:#fff}.head[data-v-7a9bec1f]{display:flex;flex-direction:column;height:%?490?%;background-repeat:no-repeat;background-size:100% 100%;width:100%}.name-swiper[data-v-7a9bec1f]{margin-left:%?40?%}.header[data-v-7a9bec1f]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center}.header .success_per[data-v-7a9bec1f]{width:100%;text-align:center;left:0}.header .success_per .success_num[data-v-7a9bec1f]{color:#fff1bf;font-size:%?26?%}.activity_pic[data-v-7a9bec1f]{margin-left:%?20?%;padding-left:%?20?%;position:relative;display:inline-block;margin-top:%?17?%;background:rgba(0,0,0,.15);padding:%?13?% %?24?% %?13?% %?14?%;border-radius:%?33?%}.activity_pic .picture[data-v-7a9bec1f]{display:inline-block}.activity_pic .avatar[data-v-7a9bec1f]{width:%?42?%;height:%?42?%;line-height:20rem;display:inline-block;background-repeat:no-repeat;background-size:center/cover;position:relative;text-align:center;color:#fff;font-weight:600;vertical-align:bottom;font-size:.875rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:50%;background-repeat:no-repeat;background-size:cover;background-position:0 0;margin-right:%?-10?%;box-shadow:0 0 0 1px #fff;position:relative}.activity_pic .avatar uni-text[data-v-7a9bec1f]{position:absolute;line-height:%?42?%;color:#8e8e8e;width:%?42?%;left:0}.noCommodity[data-v-7a9bec1f]{border-top:none}.flash-sale .header[data-v-7a9bec1f]{width:100%;position:relative}.flash-sale .main_count[data-v-7a9bec1f]{position:relative;top:%?10?%}.flash-sale .timeList[data-v-7a9bec1f]{display:flex;justify-content:center;align-items:center;margin:0 auto}.flash-sale .timeList .item[data-v-7a9bec1f]{font-size:%?20?%;color:#666;text-align:center;box-sizing:border-box;width:%?224?%}.flash-sale .timeList .item .time[data-v-7a9bec1f]{font-size:%?26?%;color:#aaa}.flash-sale .timeList .item.on .time[data-v-7a9bec1f]{color:#fd6523;font-weight:600}.flash-sale .timeList .item.on .time span[data-v-7a9bec1f]{position:relative}.flash-sale .timeList .item.on .time span[data-v-7a9bec1f]::after{content:"";display:inline-block;width:100%;height:%?4?%;background:#fd6523;position:absolute;left:0;bottom:%?-4?%;border-radius:%?2?%}.flash-sale .list[data-v-7a9bec1f]{margin-top:%?24?%}.flash-sale .list .item[data-v-7a9bec1f]{height:%?278?%;position:relative;width:90%;margin:0 auto %?20?% auto;background-color:#fff;border-radius:%?20?%;padding:0 %?25?%}.flash-sale .list .item .pictrue[data-v-7a9bec1f]{width:%?240?%;height:%?240?%;border-radius:%?10?%}.flash-sale .list .item .pictrue uni-image[data-v-7a9bec1f]{width:100%;height:100%;border-radius:%?10?%}.flash-sale .list .item .text[data-v-7a9bec1f]{width:%?370?%;font-size:%?30?%;color:#333}.flash-sale .list .item .text .name[data-v-7a9bec1f]{width:100%;color:#282828;font-weight:700;font-size:%?28?%}.flash-sale .list .item .text .booking[data-v-7a9bec1f]{margin-top:%?17?%}.flash-sale .list .item .text .booking .count[data-v-7a9bec1f]{font-size:%?22?%;color:var(--view-priceColor);border-radius:%?18?%;background-color:var(--view-bgColor);line-height:%?36?%;padding:%?5?% %?12?%}.flash-sale .list .item .text .booking .count .iconfont[data-v-7a9bec1f]{margin-right:%?10?%}.flash-sale .list .item .text .booking .count .line[data-v-7a9bec1f]{display:inline-block;width:%?1?%;height:%?14?%;background:#f49088;margin:0 %?9?%;position:relative;top:%?-3?%}.flash-sale .list .item .text .limit[data-v-7a9bec1f]{font-size:%?22?%;color:#999;margin-bottom:%?5?%}.flash-sale .list .item .text .limit .limitPrice[data-v-7a9bec1f]{margin-left:%?10?%}.flash-sale .list .item .text .progress[data-v-7a9bec1f]{margin-top:%?20?%;overflow:hidden}.flash-sale .list .item .text .progress .combination_price[data-v-7a9bec1f]{line-height:15px;padding:%?8?% 0;color:#282828;float:left;position:relative;top:%?10?%}.flash-sale .list .item .text .progress .combination_price .combination_text[data-v-7a9bec1f]{font-size:%?22?%}.flash-sale .list .item .text .progress .combination_price .price[data-v-7a9bec1f]{font-size:%?24?%;font-weight:700}.flash-sale .list .item .text .progress .order_btn[data-v-7a9bec1f]{float:right;width:%?145?%;height:%?62?%;text-align:center;color:#fff;font-size:%?26?%;line-height:%?72?%;background-size:100%}.tool-bar[data-v-7a9bec1f]{display:flex;align-items:center;height:40px}.fixed-head[data-v-7a9bec1f]{position:absolute;left:0;top:20px;width:100%;z-index:10}',""]),t.exports=e},3602:function(t,e,i){var n=i("2eec");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("03c29a32",n,!0,{sourceMap:!1,shadowMode:!1})},"3b1d":function(t,e,i){var n=i("d82c");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("5df95d84",n,!0,{sourceMap:!1,shadowMode:!1})},"46b2":function(t,e,i){"use strict";var n=i("d517"),a=i.n(n);a.a},"477c":function(t,e,i){"use strict";i.r(e);var n=i("79bef"),a=i("4ebd");for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("584d");var s=i("f0c5"),r=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"03dff5d0",null,!1,n["a"],void 0);e["default"]=r.exports},"4cc1":function(t,e,i){"use strict";i.r(e);var n=i("6948"),a=i("4dc2");for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("46b2");var s=i("f0c5"),r=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"0a89d374",null,!1,n["a"],void 0);e["default"]=r.exports},"4dc2":function(t,e,i){"use strict";i.r(e);var n=i("fa4c"),a=i.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"4ebd":function(t,e,i){"use strict";i.r(e);var n=i("ba24"),a=i.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"584d":function(t,e,i){"use strict";var n=i("79be"),a=i.n(n);a.a},"58d4":function(t,e,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.ajcaptchaCheck=function(t){return a.default.post("ajcheck",t,{noAuth:!0})},e.appleAppAuth=function(t){return a.default.post("auth/apple",t,{noAuth:!0})},e.appletsDecrypt=function(t){return a.default.post("user/mp/binding",t)},e.bindingPhone=function(t){return a.default.post("user/binding",t)},e.getAjcaptcha=function(t){return a.default.get("ajcaptcha",t,{noAuth:!0})},e.getAppVersion=function(){return a.default.get("appVersion",{},{noAuth:!0})},e.getArticleBannerList=function(){return a.default.get("article/banner/list",{},{noAuth:!0})},e.getArticleCategoryList=function(){return a.default.get("article/category/lst",{},{noAuth:!0})},e.getArticleDetails=function(t){return a.default.get("article/detail/"+t,{},{noAuth:!0})},e.getArticleHotList=function(){return a.default.get("article/hot/list",{},{noAuth:!0})},e.getArticleList=function(t,e){return a.default.get("article/lst/"+t,e,{noAuth:!0})},e.getAssistData=function(t){return a.default.get("diy/assist",t,{noAuth:!0})},e.getCateData=function(t){return a.default.get("diy/category",t,{noAuth:!0})},e.getCity=function(){return a.default.get("system/city/lst",{},{noAuth:!0})},e.getCityList=function(t){return a.default.get("v2/system/city",{address:t},{noAuth:!0})},e.getCityV2=function(t){return a.default.get("v2/system/city/lst/"+t,{},{noAuth:!0})},e.getCombinationData=function(t){return a.default.get("diy/group",t,{noAuth:!0})},e.getCouponData=function(t){return a.default.get("diy/coupon",t,{noAuth:!0})},e.getCoupons=function(t){return a.default.get("coupon/product",t,{noAuth:!0})},e.getDiy=function(t){return a.default.get("diy",t,{noAuth:!0})},e.getIndexData=function(){return a.default.get("common/home",{},{noAuth:!0})},e.getLiveData=function(t){return a.default.get("diy/broadcast",t,{noAuth:!0})},e.getLiveList=function(t,e){return a.default.get("wechat/live",{page:t,limit:e},{noAuth:!0})},e.getLogo=function(){return a.default.get("wechat/get_logo",{},{noAuth:!0})},e.getOpenAdv=function(){return a.default.get("open_screen",{},{noAuth:!0})},e.getPageDiy=function(t){return a.default.get("micro",t,{noAuth:!0})},e.getPresellData=function(t){return a.default.get("diy/presell",t,{noAuth:!0})},e.getProductData=function(t){return a.default.get("diy/spu",t,{noAuth:!0})},e.getSeckillData=function(t){return a.default.get("diy/seckill",t,{noAuth:!0})},e.getShopCoupons=function(t){return a.default.get("coupon/store/"+t,{},{noAuth:!0})},e.getTemlIds=function(){return a.default.get("wechat/teml_ids",{},{noAuth:!0})},e.getUserCoupons=function(t){return a.default.get("coupon/list",t)},e.graphicLstData=function(t){return a.default.get("diy/community",t,{noAuth:!0})},e.hotRankingList=function(t){return a.default.get("diy/hot_top",t,{noAuth:!0})},e.loginMobile=function(t){return a.default.post("login/mobile",t,{noAuth:!0})},e.logout=function(){return a.default.get("logout")},e.modifyPassword=function(t){return a.default.post("user/change/password",t)},e.modifyPhone=function(t){return a.default.post("user/change/phone",t)},e.phoneLogin=function(t){return a.default.post("login",t,{noAuth:!0})},e.phoneRegister=function(t){return a.default.post("register",t,{noAuth:!0})},e.phoneRegisterReset=function(t){return a.default.post("register/reset",t,{noAuth:!0})},e.pink=function(){return a.default.get("pink",{},{noAuth:!0})},e.registerVerify=function(t,e,i,n){return a.default.post("register/verify",{phone:t,type:void 0===e?"reset":e,key:i,code:n},{noAuth:!0})},e.setCouponReceive=function(t){return a.default.post("coupon/receive/"+t)},e.setFormId=function(t){return a.default.post("wechat/set_form_id",{formId:t})},e.storeList=function(t){return a.default.get("diy/store",t,{noAuth:!0})},e.switchH5Login=function(t){return a.default.post("user/switch",t)},e.verifyCode=function(){return a.default.get("verify_code",{},{noAuth:!0})},e.wechatAppAuth=function(t){return a.default.post("auth/app",t,{noAuth:!0})};var a=n(i("3314"))},"65e7":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".pictrueBox[data-v-0a89d374]{width:%?130?%;height:%?120?%}\n/*返回主页按钮*/.home[data-v-0a89d374]{position:fixed;color:#fff;text-align:center;z-index:9999;right:%?15?%;display:flex}.home .homeCon[data-v-0a89d374]{border-radius:%?50?%;opacity:0;height:0;color:#e93323;width:0}.home .homeCon.on[data-v-0a89d374]{opacity:1;-webkit-animation:bounceInRight .5s cubic-bezier(.215,.61,.355,1);animation:bounceInRight .5s cubic-bezier(.215,.61,.355,1);width:%?300?%;height:%?86?%;margin-bottom:%?20?%;display:flex;justify-content:center;align-items:center;background:var(--view-theme)}.home .homeCon .iconfont[data-v-0a89d374]{font-size:%?48?%;color:#fff;display:inline-block;margin:0 auto}.home .pictrue[data-v-0a89d374]{width:%?86?%;height:%?86?%;border-radius:50%;margin:0 auto;background-color:var(--view-theme);box-shadow:0 %?5?% %?12?% rgba(0,0,0,.5)}.home .pictrue .image[data-v-0a89d374]{width:100%;height:100%}.pictruea[data-v-0a89d374]{width:100%;height:100%;display:block;object-fit:cover;vertical-align:middle}",""]),t.exports=e},6948:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticStyle:{"touch-action":"none"},style:t.viewColor},[i("v-uni-view",{staticClass:"home",staticStyle:{position:"fixed"},style:{top:t.top+"px",bottom:t.bottom},attrs:{id:"right-nav"},on:{touchmove:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.setTouchMove.apply(void 0,arguments)}}},[t.homeActive?i("v-uni-view",{staticClass:"homeCon",class:!0===t.homeActive?"on":""},[i("v-uni-navigator",{staticClass:"iconfont icon-shouye-xianxing",attrs:{"hover-class":"none",url:"/pages/index/index","open-type":"switchTab"}}),i("v-uni-navigator",{staticClass:"iconfont icon-caigou-xianxing",attrs:{"hover-class":"none",url:"/pages/order_addcart/order_addcart","open-type":"switchTab"}}),i("v-uni-navigator",{staticClass:"iconfont icon-yonghu1",attrs:{"hover-class":"none",url:"/pages/user/index","open-type":"switchTab"}})],1):t._e(),i("v-uni-view",{staticClass:"pictrueBox",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.open.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"pictrue"},[i("v-uni-image",{staticClass:"image pictruea",attrs:{src:!0===t.homeActive?"/static/images/navbtn_open.gif":"/static/images/navbtn_close.gif"}})],1)],1)],1)],1)},a=[]},"75d6":function(t,e,i){"use strict";i.r(e);var n=i("f692"),a=i("f1a7");for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("1e7c");var s=i("f0c5"),r=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"7a9bec1f",null,!1,n["a"],void 0);e["default"]=r.exports},"79be":function(t,e,i){var n=i("b887");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("52273fd8",n,!0,{sourceMap:!1,shadowMode:!1})},"79bef":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{style:t.viewColor},[i("v-uni-view",{staticClass:"navTabBox"},[i("v-uni-view",{staticClass:"longTab"},[i("v-uni-scroll-view",{staticStyle:{"white-space":"nowrap",display:"flex",height:"60rpx"},attrs:{"scroll-x":"true","scroll-with-animation":!0,"scroll-left":t.tabLeft,"show-scrollbar":"true"}},[t._l(t.tabTitle,(function(e,n){return i("v-uni-view",{key:n,staticClass:"longItem",class:n===t.tabClick?"click":"",style:"width:"+t.isWidth+"px",attrs:{"data-index":n,id:"id"+n},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.longClick(n,e.store_category_id)}}},[t._v(t._s(e.cate_name))])})),i("v-uni-view",{staticClass:"underlineBox",style:"transform:translateX("+t.isLeft+"px);width:"+t.isWidth+"px"},[i("v-uni-view",{staticClass:"underline bg-color-white"})],1)],2),i("v-uni-view",{staticClass:"iconfont icon-xiangxia",staticStyle:{padding:"8rpx 0 0 8rpx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tabsOpen=!0}}})],1),t.tabsOpen?i("v-uni-view",{staticClass:"tabs-box"},[i("v-uni-view",{staticClass:"box-top"},[i("v-uni-view",{},[t._v("切换分类")]),i("v-uni-view",{},[i("v-uni-view",{staticClass:"iconfont icon-xiangshang",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tabsOpen=!1}}})],1)],1),i("v-uni-view",{staticClass:"all-tabs"},t._l(t.tabTitle,(function(e,n){return i("v-uni-view",{key:n,staticClass:"tabs-style",class:n===t.tabClick?"active":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.longClick(n,e.store_category_id)}}},[i("v-uni-text",{staticClass:"line1"},[t._v(t._s(e.cate_name))])],1)})),1)],1):t._e()],1),t.tabsOpen?i("v-uni-view",{staticClass:"mask",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tabsOpen=!1}}}):t._e()],1)},a=[]},a41a:function(t,e,i){"use strict";i.r(e);var n=i("17f8"),a=i.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},b772:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"user-swiper"},[i("v-uni-view",{staticClass:"box",style:{marginLeft:t.distance+"px"},attrs:{id:"box"}},t._l(t.combinationUserList,(function(e,n){return i("v-uni-view",{key:n,staticClass:"user-list"},[i("v-uni-image",{directives:[{name:"show",rawName:"v-show",value:t.init,expression:"init"}],staticClass:"header-img",attrs:{src:e.avatar?e.avatar:"/static/images/f.png",mode:""}}),i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.init,expression:"init"}],staticClass:"user-name"},[t._v("***** 拼团成功")])],1)})),1)],1)},a=[]},b887:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */@-webkit-keyframes bounce-in-data-v-03dff5d0{0%{opacity:0}100%{opacity:1}}@keyframes bounce-in-data-v-03dff5d0{0%{opacity:0}100%{opacity:1}}.navTabBox[data-v-03dff5d0]{width:%?750?%;box-sizing:border-box;padding:0 %?40?%;color:#fff;position:relative}.navTabBox .tabs-box[data-v-03dff5d0]{position:absolute;top:0;display:flex;flex-direction:column;width:90%;background-color:#fff;border-radius:%?24?%;z-index:999;-webkit-animation:bounce-in-data-v-03dff5d0 .3s;animation:bounce-in-data-v-03dff5d0 .3s}.navTabBox .tabs-box .box-top[data-v-03dff5d0]{padding:%?30?% %?20?% %?10?% %?20?%;display:flex;justify-content:space-between;color:#666;font-size:%?28?%}.navTabBox .tabs-box .all-tabs[data-v-03dff5d0]{display:flex;flex-wrap:wrap;padding:%?20?% 0;font-size:%?24?%}.navTabBox .tabs-box .all-tabs .tabs-style[data-v-03dff5d0]{display:flex;justify-content:center;background:#f2f2f2;border-radius:29px;color:#282828;width:22%;padding:%?10?% %?20?%;white-space:nowrap;border-radius:30px;margin:%?10?%}.navTabBox .tabs-box .all-tabs .active[data-v-03dff5d0]{background:var(--view-minorColor);color:var(--view-theme);border:1px solid var(--view-theme)}.navTabBox .nav_toggle[data-v-03dff5d0]{position:absolute;top:%?8?%;right:%?20?%}.navTabBox .click[data-v-03dff5d0]{color:#fff}.navTabBox .longTab[data-v-03dff5d0]{display:flex;width:95%;padding-bottom:%?20?%}.navTabBox .longTab .longItem[data-v-03dff5d0]{height:%?50?%;display:inline-block;line-height:%?50?%;text-align:center;font-size:%?30?%;color:hsla(0,0%,100%,.8);max-width:%?160?%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;overflow-x:scroll;overflow-y:hidden;\n  /*解决ios上滑动不流畅*/-webkit-overflow-scrolling:touch}.navTabBox .longTab .longItem.click[data-v-03dff5d0]{font-weight:700;font-size:%?30?%;color:#fff}.navTabBox .longTab .underlineBox[data-v-03dff5d0]{height:3px;width:20%;display:flex;align-content:center;justify-content:center;transition:.5s}.navTabBox .longTab .underlineBox .underline[data-v-03dff5d0]{width:%?60?%;height:%?4?%}.bg-color-white[data-v-03dff5d0]{background-color:#fff}.child-box[data-v-03dff5d0]{width:100%;position:relative;background-color:#fff;box-shadow:0 2px 5px 1px rgba(0,0,0,.02)}.child-box .wrapper[data-v-03dff5d0]{display:flex;align-items:center;padding:%?20?% 0;background:#fff}.child-box .child-item[data-v-03dff5d0]{flex-shrink:0;width:%?140?%;display:flex;flex-direction:column;align-items:center;justify-content:center;margin-left:%?10?%}.child-box .child-item uni-image[data-v-03dff5d0]{width:%?90?%;height:%?90?%;border-radius:50%}.child-box .child-item .txt[data-v-03dff5d0]{font-size:%?24?%;color:#282828;text-align:center;margin-top:%?10?%}.child-box .child-item.on uni-image[data-v-03dff5d0]{border:1px solid rgba(233,51,35,.6)}.child-box .child-item.on .txt[data-v-03dff5d0]{color:#e93323}.brand-wrapper[data-v-03dff5d0]{flex:1;overflow:hidden;width:%?690?%;margin:0 auto;background:#fff;border-radius:%?12?%;padding:%?25?%}.brand-wrapper .wrapper[data-v-03dff5d0]{display:flex;flex-wrap:wrap;padding-bottom:%?20?%}.brand-wrapper .item[data-v-03dff5d0]{display:block;width:%?146?%;height:%?58?%;line-height:%?58?%;text-align:center;background:#f2f2f2;border-radius:%?28?%;margin-top:%?25?%;padding:0 %?10?%;margin-right:%?19?%;color:#282828;font-size:%?24?%}.brand-wrapper .item[data-v-03dff5d0]:nth-child(4n){margin-right:0}.brand-wrapper .item.on[data-v-03dff5d0]{background:#fff4f3;border:1px solid #e93323;color:#e93323}.brand-wrapper .btns[data-v-03dff5d0]{display:flex;align-items:center;justify-content:center;padding-top:%?10?%;font-size:%?22?%;color:#999}.brand-wrapper .btns .iconfont[data-v-03dff5d0]{margin-left:%?10?%;margin-top:%?5?%;font-size:%?20?%}.brand-wrapper .mask[data-v-03dff5d0]{z-index:300!important}.brand-wrapper .icon-xiangxia[data-v-03dff5d0]{font-size:20px}',""]),t.exports=e},ba24:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i("26cb"),a=(getApp(),{name:"navTab",props:{tabTitle:{type:Array,default:function(){}}},computed:(0,n.mapGetters)(["viewColor"]),data:function(){return{tabClick:0,isLeft:0,isWidth:0,tabLeft:0,swiperIndex:0,childIndex:0,childID:0,window:!1,tabsOpen:!1}},created:function(){var t=this;uni.getSystemInfo({success:function(e){t.isWidth=e.windowWidth/5}})},methods:{longClick:function(t,e){if(this.childIndex=0,this.tabTitle.length>5){var i=t-2;i=i<=0?0:i,this.tabLeft=(t-2)*this.isWidth}this.tabClick=t,this.isLeft=t*this.isWidth;var n={index:t,pid:e};this.parentEmit(n),this.tabsOpen=!1},parentEmit:function(t){this.$emit("changeTab",t)}}});e.default=a},bce7:function(t,e,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("99af");var a=i("041f"),o=n(i("4cc1")),s=n(i("477c")),r=n(i("cf8e")),c=(i("58d4"),i("3255")),u=i("f26a"),d=i("26cb"),l=getApp(),f={components:{home:o.default,tabNav:s.default,userNameSwiper:r.default},computed:(0,c.configMap)({statusBarHeight:0},(0,d.mapGetters)(["viewColor","keyColor"])),data:function(){return{domain:u.HTTP_REQUEST_URL,navH:"",topImage:"",combinationList:[],combinationUserList:[],combinationUserCount:0,navTop:[{cate_name:"精选",store_category_id:""}],active:1,type:0,scrollLeft:0,interval:0,status:1,page:1,limit:10,loading:!1,loadend:!1,pageloading:!1,isFixed:!1,navIndex:0,avatar:"../../../static/images/f.png",headBg:"../static/images/comHead"}},onLoad:function(){getCurrentPages();uni.setNavigationBarTitle({title:"拼团列表"}),this.navH=l.globalData.navHeight,this.getCombinationProductList(""),this.getIndexConfig(),this.getCombinationUser()},methods:{goBack:function(){uni.navigateBack()},getCombinationProductList:function(t){var e=this,i={page:e.page,limit:e.limit,store_category_id:t};e.pageloading||(this.pageloading=!0,(0,a.getCombinationList)(i).then((function(t){var i=t.data.list;e.page++,e.combinationList=e.combinationList.concat(i),uni.stopPullDownRefresh(),e.page=e.page,e.pageloading=!1})).catch((function(t){e.pageloading=!1})))},getIndexConfig:function(){var t=this;(0,a.getActivitycategory)(4).then((function(e){t.navTop=t.navTop.concat(e.data)}))},getCombinationUser:function(){var t=this;(0,a.getCombinationUser)({limit:30}).then((function(e){t.$set(t,"combinationUserCount",e.data.count),t.$set(t,"combinationUserList",e.data.list)}))},changeTab:function(t){this.navIndex!=t.index&&(this.navIndex=t.index,this.page=1,this.limit=8,this.combinationList=[],this.getCombinationProductList(t.pid))},goDetails:function(t){uni.navigateTo({url:"/pages/activity/combination_details/index?id="+t.product_group_id})}},onPullDownRefresh:function(){this.page=1,this.pageloading=!1,this.loadend=!1,this.combinationList=[],this.getCombinationProductList("")},onReachBottom:function(){this.getCombinationProductList("")},onPageScroll:function(t){t.scrollTop>=this.searchH?this.isFixed=!0:this.isFixed=!1}};e.default=f},cf8e:function(t,e,i){"use strict";i.r(e);var n=i("b772"),a=i("a41a");for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("1d75");var s=i("f0c5"),r=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"afa6b418",null,!1,n["a"],void 0);e["default"]=r.exports},d517:function(t,e,i){var n=i("65e7");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("cbfd1e32",n,!0,{sourceMap:!1,shadowMode:!1})},d82c:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.user-swiper[data-v-afa6b418]{width:%?260?%;overflow:hidden;border-radius:%?25?%;background:rgba(0,0,0,.3);height:%?50?%;display:flex;align-items:center}.user-swiper .box[data-v-afa6b418]{width:-webkit-max-content;width:max-content;display:flex;align-items:center;flex-wrap:nowrap;transition:all .8s}.user-swiper .box .user-list[data-v-afa6b418]{display:flex;align-items:center;justify-content:center;width:%?260?%;border-radius:%?25?%;padding:%?8?% %?18?%;color:#fff;font-size:%?22?%}.user-swiper .box .user-list .header-img[data-v-afa6b418]{width:%?34?%;height:%?34?%;border-radius:50%;border:1px solid #fff;margin-right:%?6?%}',""]),t.exports=e},f1a7:function(t,e,i){"use strict";i.r(e);var n=i("bce7"),a=i.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},f692:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"page-container",style:t.viewColor},[i("v-uni-view",{staticClass:"flash-sale"},[i("v-uni-view",{staticClass:"fixed-head"},[i("v-uni-view",{staticClass:"sys-head",style:{height:t.statusBarHeight}}),i("v-uni-view",{staticClass:"tool-bar"},[t.$wechat.isWeixin()?t._e():i("v-uni-view",{staticClass:"iconfont icon-xiangzuo",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goBack.apply(void 0,arguments)}}}),i("user-name-swiper",{staticClass:"name-swiper",style:"top:"+t.navH/2+"rpx",attrs:{combinationUserList:t.combinationUserList}})],1)],1),i("v-uni-view",{staticClass:"head",style:{"background-image":"url("+t.domain+"/static/diy/combination"+t.keyColor+".png)"}},[i("v-uni-view",{staticClass:"sys-head",style:{height:t.statusBarHeight}}),i("v-uni-view",{staticClass:"tool-bar"}),i("v-uni-view",{staticClass:"header"},[i("v-uni-view",{staticClass:"success_per"},[i("v-uni-view",{staticClass:"success_num"},[t._v(t._s(t.combinationUserCount)+"人已参与拼团")]),t.combinationUserList.length>0?i("v-uni-view",{staticClass:"activity_pic"},t._l(t.combinationUserList.slice(0,10),(function(t,e){return i("v-uni-view",{key:e,staticClass:"picture"},[9!=e?i("v-uni-image",{staticClass:"avatar",attrs:{src:t.avatar?t.avatar:"/static/images/f.png"}}):i("span",{staticClass:"avatar",staticStyle:{background:"#fff"}},[i("v-uni-text",{staticClass:"iconfont icon-gengduo1"})],1)],1)})),1):t._e()],1)],1)],1),i("v-uni-view",{staticClass:"main_count"},[i("tabNav",{staticClass:"tabNav",class:{fixed:t.isFixed},attrs:{tabTitle:t.navTop},on:{changeTab:function(e){arguments[0]=e=t.$handleEvent(e),t.changeTab.apply(void 0,arguments)}}}),i("v-uni-view",{staticClass:"list"},[t._l(t.combinationList,(function(e,n){return[i("v-uni-view",{key:n+"_0",staticClass:"item acea-row row-between-wrapper",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goDetails(e)}}},[i("v-uni-view",{staticClass:"pictrue"},[i("v-uni-image",{attrs:{src:e.product.image}})],1),i("v-uni-view",{staticClass:"text acea-row row-column-around"},[i("v-uni-view",{staticClass:"name line1"},[t._v(t._s(e.product.store_name))]),i("v-uni-view",{staticClass:"booking"},[i("v-uni-text",{staticClass:"count"},[i("v-uni-text",{staticClass:"iconfont icon-pintuan"}),t._v(t._s(e.buying_count_num)+"人团"),i("v-uni-text",{staticClass:"line"}),t._v("已拼"+t._s(e.sales?e.sales:0)+t._s(e.product.unit_name))],1)],1),i("v-uni-view",{staticClass:"progress"},[i("v-uni-view",{staticClass:"combination_price"},[i("v-uni-text",{staticClass:"combination_text"},[t._v("拼团价")]),i("v-uni-text",{staticClass:"price"},[t._v("¥"),i("v-uni-text",[t._v(t._s(e.price))])],1)],1),i("v-uni-view",{staticClass:"order_btn",style:{"background-image":"url("+t.domain+"/static/diy/pink_btn"+t.keyColor+".png)"}},[t._v("去拼团")])],1)],1)],1)]}))],2)],1)],1),i("home")],1)},a=[]},fa4c:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i("26cb"),a=i("f26a"),o={name:"Home",props:{},data:function(){return{domain:a.HTTP_REQUEST_URL,top:"",bottom:""}},computed:(0,n.mapGetters)(["homeActive","viewColor","keyColor"]),methods:{setTouchMove:function(t){t.touches[0].clientY<545&&t.touches[0].clientY>66&&(this.top=t.touches[0].clientY,this.bottom="auto")},open:function(){this.homeActive?this.$store.commit("CLOSE_HOME"):this.$store.commit("OPEN_HOME")}},created:function(){this.bottom="50px"}};e.default=o}}]);