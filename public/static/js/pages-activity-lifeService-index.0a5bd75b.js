(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-activity-lifeService-index"],{"041f":function(t,e,n){"use strict";n("7a82");var i=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.assistHelpList=function(t,e){return a.default.get("store/product/assist/user/"+t,e)},e.assistUserData=function(){return a.default.get("store/product/assist/count",{},{noAuth:!0})},e.getActivitycategory=function(t){return a.default.get("product/spu/active/category/"+t,{},{noAuth:!0})},e.getAssistDetail=function(t){return a.default.get("store/product/assist/detail/"+t)},e.getAssistList=function(t){return a.default.get("store/product/assist/lst",t,{noAuth:!0})},e.getAssistUser=function(t){return a.default.get("store/product/assist/share/"+t)},e.getBargainUserCancel=function(t){return a.default.post("store/product/assist/set/delete/"+t)},e.getBargainUserList=function(t){return a.default.get("store/product/assist/set/lst",t)},e.getCombinationDetail=function(t){return a.default.get("store/product/group/detail/"+t,{},{noAuth:!0})},e.getCombinationList=function(t){return a.default.get("store/product/group/lst",t,{noAuth:!0})},e.getCombinationPink=function(t){return a.default.get("store/product/group/get/"+t)},e.getCombinationPoster=function(t){return a.default.post("combination/poster",t)},e.getCombinationUser=function(t){return a.default.get("store/product/group/count",t,{noAuth:!0})},e.getCouponLst=function(t){return a.default.get("coupon/getlst",t,{noAuth:!0})},e.getMerchantServiceLst=function(t){return a.default.get("store/merchant/local",t,{noAuth:!0})},e.getNewPeopleCouponLst=function(t){return a.default.get("coupon/new_people",t,{noAuth:!0})},e.getPresellList=function(t){return a.default.get("store/product/presell/lst",t,{noAuth:!0})},e.getSeckillDetail=function(t){return a.default.get("store/product/seckill/detail/"+t,{},{noAuth:!0})},e.getSeckillIndexTime=function(){return a.default.get("store/product/seckill/select",{},{noAuth:!0})},e.getSeckillList=function(t){return a.default.get("store/product/seckill/lst",t,{noAuth:!0})},e.getTopicDetail=function(t){return a.default.get("activity/info/".concat(t),{},{noAuth:!0})},e.getTopicList=function(t,e){return a.default.get("activity/lst/".concat(t),e,{noAuth:!0})},e.getTopicProLst=function(t){return a.default.get("product/spu/labels",t,{noAuth:!0})},e.hotRankingApi=function(t){return a.default.get("product/spu/get_hot_ranking",t,{noAuth:!0})},e.initiateAssistApi=function(t){return a.default.post("store/product/assist/create/"+t)},e.postAssistHelp=function(t){return a.default.post("store/product/assist/set/"+t)},e.postCombinationRemove=function(t){return a.default.post("store/product/group/cancel",t)},e.presellAgreement=function(){return a.default.get("store/product/presell/agree")},e.scombinationCode=function(t){return a.default.get("combination/code/"+t)},e.seckillCode=function(t,e){return a.default.get("seckill/code/"+t,e)},e.spuTop=function(t){return a.default.get("store/product/category/hotranking",{},{noAuth:!0})},e.spuTopList=function(t){return a.default.get("product/spu/get_hot_ranking",t,{noAuth:!0})};var a=i(n("3314"))},1747:function(t,e,n){"use strict";n.r(e);var i=n("9bcf"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"41ac":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{style:t.viewColor},[i("v-uni-view",{staticClass:"productList"},[i("v-uni-view",{staticClass:"search acea-row row-between-wrapper"},[t.$wechat.isWeixin()?t._e():i("v-uni-view",{staticClass:"back",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.backjJump()}}},[i("v-uni-view",{staticClass:"iconfont icon-xiangzuo"})],1),i("v-uni-view",{staticClass:"input acea-row row-between-wrapper"},[i("v-uni-text",{staticClass:"iconfont icon-sousuo"}),i("v-uni-input",{attrs:{placeholder:"搜索店铺名称","placeholder-class":"placeholder","confirm-type":"search",name:"search",value:t.sotreParam.keyword},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.searchSubmit.apply(void 0,arguments)}}})],1),1==t.mer_location?i("v-uni-view",{staticClass:"iconfont search-right",staticStyle:{"text-align":"right"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showMaoLocation(t.latitude,t.longitude)}}},[i("v-uni-view",{staticClass:"iconfont icon-dingwei"}),t.recommend_address?i("v-uni-view",{staticClass:"right-text"},[t._v(t._s(t.recommend_address))]):t._e(),t.recommend_address?i("v-uni-view",{staticClass:"iconfont icon-xiangyou"}):t._e()],1):t._e()],1),i("v-uni-view",{staticClass:"nav-wrapper"},[i("v-uni-view",{staticClass:"nav acea-row row-middle"},t._l(t.downMenus,(function(e){return i("v-uni-view",{key:e.key,staticClass:"item",class:{"font-colors":t.firstKey==e.key},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.set_where(e.key)}}},[i("v-uni-view",[t._v(t._s(e.title))]),i("v-uni-view",{staticClass:"line",class:{"font-line":t.firstKey==e.key}})],1)})),1)],1),[t.storeList.length>0?i("v-uni-view",{staticClass:"mer-box"},[t._l(t.storeList,(function(e,n){return i("v-uni-view",{key:n,staticClass:"mer-item"},[i("v-uni-view",{staticClass:"mer-hd",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.goStore(e.mer_id)}}},[i("v-uni-image",{attrs:{src:e.mini_banner?e.mini_banner:e.mer_banner}}),i("v-uni-view",{staticClass:"mer-name"},[i("v-uni-image",{attrs:{src:e.mer_avatar}}),i("v-uni-view",{},[i("v-uni-view",{staticClass:"mer-top"},[i("v-uni-view",{staticClass:"txt line1"},[t._v(t._s(e.mer_name))]),e.type_name?i("v-uni-text",{staticClass:"font-bg-red ml8"},[t._v(t._s(e.type_name))]):e.is_trader?i("v-uni-text",{staticClass:"font-bg-red ml8"},[t._v("自营")]):t._e()],1),i("v-uni-view",{staticClass:"mer-btn"},[i("v-uni-view",{},[t._v(t._s(e.care_count<1e4?e.care_count:(e.care_count/1e4).toFixed(2)+"万")+"人关注")]),e.distance?i("v-uni-view",{staticClass:"line"}):t._e(),e.distance?i("v-uni-view",{staticClass:"distance",on:{click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.showStoreLocation(e)}}},[i("v-uni-view",{},[t._v(t._s(e.distance))]),i("v-uni-view",{staticClass:"iconfont icon-xiangyou"})],1):t._e()],1)],1)],1)],1),i("v-uni-view",{staticClass:"pro-box"},t._l(e.recommend,(function(n,a){return e.recommend.length<=3?i("v-uni-navigator",{key:a,staticClass:"pro-item",attrs:{url:"/pages/goods_details/index?id="+n.product_id,"hover-class":"none"}},[i("v-uni-image",{attrs:{src:n.image,mode:""}}),i("v-uni-view",{staticClass:"price"},[i("v-uni-text",[t._v("￥")]),t._v(t._s(n.price))],1)],1):t._e()})),1)],1)})),t.loading?i("v-uni-view",{staticClass:"loadingicon acea-row row-center-wrapper"},[i("v-uni-text",{staticClass:"loading iconfont icon-jiazai",attrs:{hidden:0==t.loading}}),t._v(t._s(t.loadTitle))],1):t._e()],2):t._e(),t.storeList.length||t.loading||t.loadingIcon?t._e():i("v-uni-view",{staticClass:"no-shop"},[i("v-uni-view",{staticClass:"pictrue",staticStyle:{margin:"0 auto"}},[i("v-uni-image",{attrs:{src:n("680c")}}),i("v-uni-text",[t._v("暂无店铺，快去搜索其他店铺吧")])],1)],1)]],2)],1)},a=[]},"558c":function(t,e,n){"use strict";var i=n("5814"),a=n.n(i);a.a},5814:function(t,e,n){var i=n("688b");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("36de4aa1",i,!0,{sourceMap:!1,shadowMode:!1})},"680c":function(t,e,n){t.exports=n.p+"static/img/noCart.67573212.png"},"688b":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.productList .search[data-v-7b08a1a4]{width:100%;height:%?86?%;padding:0 %?20?%;box-sizing:border-box;position:fixed;left:0;top:0;z-index:9;display:flex;flex-wrap:nowrap;background:var(--view-theme)}.productList .search .search-right[data-v-7b08a1a4]{display:flex;align-items:center;justify-content:space-between;max-width:-webkit-max-content;max-width:max-content;flex:1;padding-left:%?20?%}.productList .search .right-text[data-v-7b08a1a4]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:%?28?%;width:-webkit-max-content;width:max-content;color:#fff;padding:0 %?10?%}.productList .search .icon-xiangyou[data-v-7b08a1a4],\n.productList .search .icon-dingwei[data-v-7b08a1a4]{font-size:%?30?%;color:#fff}.productList .search .back[data-v-7b08a1a4]{display:flex;align-items:center;width:%?40?%;height:%?60?%}.productList .search .back .iconfont[data-v-7b08a1a4]{color:#fff;font-size:%?36?%}.productList .search .input[data-v-7b08a1a4]{flex:1;height:%?60?%;background-color:#fff;border-radius:%?50?%;padding:0 %?20?%;box-sizing:border-box}.productList .search .input uni-input[data-v-7b08a1a4]{flex:1;height:100%;font-size:%?26?%;margin-left:%?10?%}.productList .search .input .placeholder[data-v-7b08a1a4]{color:#999}.productList .search .input .iconfont[data-v-7b08a1a4]{font-size:%?35?%;color:#555}.productList .search .icon-pailie[data-v-7b08a1a4],\n.productList .search .icon-tupianpailie[data-v-7b08a1a4]{color:#fff;width:%?62?%;font-size:%?40?%;height:%?86?%;line-height:%?86?%}.productList .nav-wrapper[data-v-7b08a1a4]{z-index:9;position:fixed;left:0;top:0;width:100%;margin-top:%?86?%;background-color:#e93323}.productList .nav-wrapper .tab-bar[data-v-7b08a1a4]{display:flex;align-items:center}.productList .nav-wrapper .tab-bar .tab-item[data-v-7b08a1a4]{position:relative;flex:1;display:flex;justify-content:center;align-items:center;padding:%?8?% 0 %?20?%;color:#fff;font-size:%?28?%;font-weight:700}.productList .nav-wrapper .tab-bar .tab-item[data-v-7b08a1a4]::after{content:" ";position:absolute;left:50%;bottom:%?18?%;width:%?30?%;height:%?3?%;background:transparent;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.productList .nav-wrapper .tab-bar .tab-item.on[data-v-7b08a1a4]::after{background:#fff}.productList .nav[data-v-7b08a1a4]{height:%?86?%;color:#454545;font-size:%?28?%;background-color:var(--view-theme);display:flex;justify-content:space-between;padding:0 %?28?%}.productList .nav .item[data-v-7b08a1a4]{display:flex;align-items:center;justify-content:center;flex-direction:column;color:#fff;flex:1}.productList .nav .item.font-colors[data-v-7b08a1a4]{font-weight:500;color:#fff}.productList .nav .item .font-line[data-v-7b08a1a4]{height:%?4?%;background-color:#fff;margin-top:%?3?%;width:%?28?%;animation:line-data-v-7b08a1a4 .3s;-moz-animation:line-data-v-7b08a1a4 .3s;\n  /* Firefox */-webkit-animation:line-data-v-7b08a1a4 .3s;\n  /* Safari 和 Chrome */-o-animation:line-data-v-7b08a1a4 .3s\n  /* Opera */}@-webkit-keyframes line-data-v-7b08a1a4{from{width:%?0?%}to{width:%?28?%}}@keyframes line-data-v-7b08a1a4{from{width:%?0?%}to{width:%?28?%}}.productList .nav .item uni-image[data-v-7b08a1a4]{width:%?15?%;height:%?19?%;margin-left:%?10?%}.mer-box[data-v-7b08a1a4]{padding:%?20?% %?20?%;margin-top:%?168?%}.mer-box .mer-item[data-v-7b08a1a4]{margin-bottom:%?20?%;background-color:#fff;border-radius:%?16?%}.mer-box .mer-item .mer-hd[data-v-7b08a1a4]{position:relative;width:100%;height:%?134?%;border-radius:%?16?% %?16?% 0 0;overflow:hidden;display:flex}.mer-box .mer-item .mer-hd uni-image[data-v-7b08a1a4]{width:100%;height:100%}.mer-box .mer-item .mer-hd .mer-name[data-v-7b08a1a4]{position:absolute;left:%?20?%;top:%?30?%;display:flex;align-items:center;padding:0 %?10?%}.mer-box .mer-item .mer-hd .mer-name uni-image[data-v-7b08a1a4]{width:%?79?%;height:%?79?%;border:1px solid #fff;border-radius:50%;margin-right:%?10?%}.mer-box .mer-item .mer-hd .mer-name .mer-top[data-v-7b08a1a4]{display:flex;align-items:center;color:#fff;font-size:%?28?%;font-weight:700;margin-bottom:%?6?%}.mer-box .mer-item .mer-hd .mer-name .mer-top .font-bg-red[data-v-7b08a1a4]{margin-left:%?20?%;font-size:%?18?%;padding:%?2?% %?10?%;border-color:var(--view-theme);background:var(--view-theme);border-radius:%?30?%;width:auto}.mer-box .mer-item .mer-hd .mer-name .mer-btn[data-v-7b08a1a4]{color:hsla(0,0%,100%,.7);font-size:%?24?%;display:flex;align-items:center}.mer-box .mer-item .mer-hd .mer-name .mer-btn .line[data-v-7b08a1a4]{width:%?2?%;height:%?18?%;color:hsla(0,0%,100%,.7);margin:0 %?12?%}.mer-box .mer-item .mer-hd .mer-name .mer-btn .distance[data-v-7b08a1a4]{display:flex;align-items:center;font-size:%?24?%;color:hsla(0,0%,100%,.7)}.mer-box .mer-item .mer-hd .mer-name .mer-btn .distance .iconfont[data-v-7b08a1a4]{font-size:%?24?%;line-height:%?24?%}.mer-box .mer-item .mer-hd .mer-name .txt[data-v-7b08a1a4]{flex:1}.mer-box .mer-item .pro-box[data-v-7b08a1a4]{display:flex;align-items:center;padding:%?20?% %?20?% %?30?%}.mer-box .mer-item .pro-box .pro-item[data-v-7b08a1a4]{width:%?218?%;margin-right:%?14?%}.mer-box .mer-item .pro-box .pro-item uni-image[data-v-7b08a1a4]{width:100%;height:%?214?%;border-radius:%?8?%}.mer-box .mer-item .pro-box .pro-item .price[data-v-7b08a1a4]{margin-top:%?5?%;font-size:%?28?%;color:var(--view-priceColor);font-weight:700}.mer-box .mer-item .pro-box .pro-item .price uni-text[data-v-7b08a1a4]{font-size:%?28?%}.mer-box .mer-item .pro-box .pro-item[data-v-7b08a1a4]:last-child{margin-right:0}.mer-box .more-shop[data-v-7b08a1a4]{display:flex;align-items:center;justify-content:center;background-color:#fff;padding:%?27?% 0;color:#999;font-size:%?26?%}.mer-box .more-shop .icon-xiangyou[data-v-7b08a1a4]{font-size:%?22?%}.no-shop[data-v-7b08a1a4]{background-color:#fff;padding-bottom:calc(100% - %?40?%);padding-top:%?200?%}.no-shop .pictrue[data-v-7b08a1a4]{display:flex;flex-direction:column;align-items:center;color:#999}.no-shop .pictrue uni-image[data-v-7b08a1a4]{width:%?414?%;height:%?380?%}',""]),t.exports=e},"736f":function(t,e,n){"use strict";n("7a82");var i=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.arrivalNoticeApi=function(t){return o.default.post("store/product/increase_take",t)},e.bagExplain=function(){return o.default.get("store/product/bag/explain")},e.bagRecommend=function(){return o.default.get("product/spu/bag/recommend")},e.collectAdd=function(t){return o.default.post("user/relation/create",t)},e.collectAll=function(t){return o.default.post("user/relation/batch/create",t)},e.collectDel=function(t){return o.default.post("user/relation/delete",t)},e.copyPasswordApi=function(t){return o.default.get("product/spu/copy",t,{noAuth:!0})},e.copyPasswordSearch=function(t){return o.default.get("command/copy",t,{noAuth:!0})},e.create=function(t){return o.default.post("intention/create",t)},e.discountsCartAdd=function(t){return o.default.post("user/cart/batchCreate",t)},e.express=function(t){return o.default.post("ordero/express/"+t,{noAuth:!0})},e.followStore=function(t){return o.default.post("user/relation/create",{type:10,type_id:t})},e.getApplicationRecordList=function(t){return o.default.get("intention/lst",t)},e.getBrandlist=function(t){return o.default.get("store/product/brand/lst",t,{noAuth:!0})},e.getBroadcastListApi=function(t){return o.default.get("broadcast/lst",t,{noAuth:!0})},e.getCaptcha=function(){return o.default.get("captcha")},e.getCategoryList=function(){return o.default.get("store/product/category/lst",{},{noAuth:!0})},e.getCollectUserList=function(t){return o.default.get("user/relation/product/lst",t)},e.getCouponProductlist=function(t){t.brand_id&&Array.isArray(t.brand_id)&&(t=(0,a.default)({},t),t.brand_id=t.brand_id.toString());return o.default.get("product/spu/coupon_product",t,{noAuth:!0})},e.getDiscountsLst=function(t){return o.default.get("discounts/lst",t,{noAuth:!0})},e.getGeocoder=function(t){return o.default.get("lbs/geocoder?location=".concat(t.lat,",").concat(t.long),{},{noAuth:!0})},e.getGoodsDetails=function(t){return o.default.get("intention/detail/"+t,{})},e.getGroomList=function(t,e){return o.default.get("product/spu/hot/"+t,e,{noAuth:!0})},e.getHotBanner=function(t){return o.default.get("common/hot_banner/"+t,{},{noAuth:!0})},e.getLiveList=function(t){return o.default.get("broadcast/hot",t,{noAuth:!0})},e.getMerProductHot=function(t,e){return o.default.get("product/spu/recommend",{page:void 0===e.page?1:e.page,limit:void 0===e.limit?10:e.limit,mer_id:t||""},{noAuth:!0})},e.getMerchantLst=function(t){return o.default.get("user/relation/merchant/lst",t,{noAuth:!0})},e.getPresellProductDetail=function(t){return o.default.get("store/product/presell/detail/"+t,{},{noAuth:!0})},e.getPreviewProDetail=function(t){return o.default.get("store/product/preview",t,{noAuth:!0})},e.getProductCode=function(t,e){return o.default.get("store/product/qrcode/"+t,e)},e.getProductDetail=function(t){return o.default.get("store/product/detail/"+t,{},{noAuth:!0})},e.getProductHot=function(t,e){return o.default.get("product/spu/recommend",{page:void 0===t?1:t,limit:void 0===e?10:e},{noAuth:!0})},e.getProductslist=function(t){t.brand_id&&Array.isArray(t.brand_id)&&(t=(0,a.default)({},t),t.brand_id=t.brand_id.toString());return o.default.get("product/spu/lst",t,{noAuth:!0})},e.getReplyConfig=function(t){return o.default.get("reply/config/"+t)},e.getReplyList=function(t,e){return o.default.get("store/product/reply/lst/"+t,e,{noAuth:!0})},e.getSearchKeyword=function(){return o.default.get("common/hot_keyword",{},{noAuth:!0})},e.getSeckillProductDetail=function(t){return o.default.get("store/product/seckill/detail/"+t,{},{noAuth:!0})},e.getStoreCategory=function(t,e){return o.default.get("store/merchant/category/lst/"+t,e,{noAuth:!0})},e.getStoreCoupon=function(t){return o.default.get("coupon/store/"+t,{noAuth:!0})},e.getStoreDetail=function(t,e){return o.default.get("store/merchant/detail/"+t,e,{noAuth:!0})},e.getStoreGoods=function(t,e){return o.default.get("product/spu/merchant/"+t,e,{noAuth:!0})},e.getStoreTypeApi=function(){return o.default.get("intention/type",{},{noAuth:!0})},e.merClassifly=function(){return o.default.get("intention/cate",{},{noAuth:!0})},e.merchantProduct=function(t,e){e.brand_id&&Array.isArray(e.brand_id)&&(e=(0,a.default)({},e),e.brand_id=e.brand_id.toString());return o.default.get("product/spu/merchant/"+t,e,{noAuth:!0})},e.merchantQrcode=function(t,e){return o.default.get("store/merchant/qrcode/"+t,e,{noAuth:!0})},e.postCartAdd=function(t){return o.default.post("user/cart/create",t)},e.priceRuleApi=function(t){return o.default.get("store/product/price_rule/".concat(t),{},{noAuth:!0})},e.productBag=function(t){return o.default.get("product/spu/bag",t,{noAuth:!0})},e.storeCategory=function(t){return o.default.get("store/product/category",t,{noAuth:!0})},e.storeCertificate=function(t){return o.default.post("store/certificate/".concat(t.merId),t)},e.storeListApi=function(t){return o.default.get("store_list",t,{noAuth:!0})},e.storeMerchantList=function(t){return o.default.get("store/merchant/lst",t,{noAuth:!0})},e.storeServiceList=function(t,e){return o.default.get("product/spu/local/".concat(t),e,{noAuth:!0})},e.unfollowStore=function(t){return o.default.post("user/relation/delete",{type:10,type_id:t})},e.updateGoodsRecord=function(t,e){return o.default.post("intention/update/"+t,e)},e.userCollectDel=function(t){return o.default.post("user/relation/batch/delete",t)},e.verify=function(t){return o.default.post("auth/verify",t)},n("d401"),n("d3b7"),n("25f0"),n("99af");var a=i(n("5530")),o=i(n("3314"))},"9bcf":function(t,e,n){"use strict";n("7a82");var i=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("4de4"),n("d3b7"),n("a9e3"),n("acd8"),n("d401"),n("25f0"),n("fb6a"),n("99af");var a=i(n("5530")),o=n("736f"),r=n("041f"),s=n("26cb"),u=(n("f823"),getApp(),{data:function(){return{price:0,stock:0,nows:!1,loading:!1,loadingIcon:!0,loadTitle:"加载更多",title:"",hotPage:1,hotLimit:10,hotScroll:!1,rightBox:!1,brandList:[],downKey:0,downStatus:!1,downMenu:[{title:"默认",key:0,order:""},{title:"销量",key:1,order:"sales"},{title:"好评",key:2,order:"rate"},{title:"距离",key:3,order:"location"}],firstKey:0,storeList:[],sotreParam:{keyword:"",page:1,limit:10,order:""},storeKey:0,storeScroll:!0,mer_id:"",sortId:"",hide_mer_status:"",price_on:"",price_off:"",detaile_address:"",recommend_address:"",latitude:"",longitude:"",count:0,mer_location:""}},created:function(){var t=this;uni.getStorage({key:"GLOBAL_DATA",success:function(e){t.hide_mer_status=e.data.hide_mer_status,t.storeList=[],1==e.data.mer_location&&(t.mer_location=e.data.mer_location,t.selfLocation()),t.getServiceList()}})},computed:(0,a.default)({downMenus:function(){var t=this;return this.downMenu.filter((function(e){return t.mer_location?e:e.key<3}))}},(0,s.mapGetters)(["viewColor"])),onLoad:function(t){this.mer_id=t.mer_id},methods:{showMaoLocation:function(t,e){if(!t||!e)return this.$util.Tips({title:"请设置允许商城访问您的位置！"});!0===this.$wechat.isWeixin()?this.$wechat.seeLocation({latitude:Number(t),longitude:Number(e),name:"当前位置",address:this.recommend_address}).then((function(t){})):uni.openLocation({latitude:parseFloat(t),longitude:parseFloat(e),scale:8,geocode:!0,name:"当前位置",address:this.recommend_address,success:function(t){}})},showStoreLocation:function(t){if(!t.lat||!t.long)return this.$util.Tips({title:"请设置允许商城访问您的位置！"});!0===this.$wechat.isWeixin()?this.$wechat.seeLocation({latitude:Number(t.lat),longitude:Number(t.long),name:t.mer_name,address:t.mer_address?t.mer_address:""}).then((function(t){})):uni.openLocation({latitude:parseFloat(t.lat),longitude:parseFloat(t.long),scale:8,name:t.mer_name,address:t.mer_address?t.mer_address:"",success:function(t){}})},selfLocation:function(){var t=this;uni.getLocation({type:"gcj02",success:function(e){var n,i;n=e.latitude.toString(),i=e.longitude.toString(),t.latitude=e.latitude,t.longitude=e.longitude,(0,o.getGeocoder)({lat:n,long:i}).then((function(e){t.detaile_address=e.data.address,t.recommend_address=e.data.address.length>4?e.data.address.slice(0,4)+"...":e.data.address}))},fail:function(t){uni.showToast({title:t,icon:"none",duration:1e3})},complete:function(e){t.getServiceList()}})},getServiceList:function(){var t=this;if(!this.loading){this.loading=!0;var e={keyword:this.sotreParam.keyword,page:this.sotreParam.page,limit:10,order:this.sotreParam.order};this.latitude&&(e.location=this.latitude+","+this.longitude),(0,r.getMerchantServiceLst)(e).then((function(e){t.count=e.data.count,t.storeList=t.storeList.concat(e.data.list),t.loading=!1,t.loadingIcon=!1}))}},goStore:function(t){1!=this.hide_mer_status&&uni.navigateTo({url:"/pages/store/home/index?id=".concat(t)})},searchSubmit:function(t){this.$set(this.sotreParam,"keyword",t.detail.value),this.set_where(this.firstKey)},set_where:function(t){this.loading||(this.storeList=[],this.firstKey=t,this.sotreParam.page=1,this.sotreParam.order=this.downMenu[t].order,this.getServiceList())},backjJump:function(){uni.navigateBack({delta:1})}},onPullDownRefresh:function(){},onReachBottom:function(){if(this.count===this.storeList.length){if(0===this.count)return;uni.showToast({title:"已加载全部",icon:"none",duration:1e3})}else this.sotreParam.page+=1,this.getServiceList()}});e.default=u},a75c:function(t,e,n){"use strict";n.r(e);var i=n("41ac"),a=n("1747");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("558c");var r=n("f0c5"),s=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"7b08a1a4",null,!1,i["a"],void 0);e["default"]=s.exports},f823:function(t,e,n){"use strict";n("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.goShopDetail=function(t,e){return new Promise((function(e){1===t.product_type?uni.navigateTo({url:"/pages/activity/goods_seckill_details/index?id=".concat(t.product_id,"&time=").concat(t.stop_time)}):2===t.product_type?uni.navigateTo({url:"/pages/activity/presell_details/index?id=".concat(t.activity_id)}):0===t.product_type||10===t.product_type?uni.navigateTo({url:"/pages/goods_details/index?id=".concat(t.product_id)}):4===t.product_type?uni.navigateTo({url:"/pages/activity/combination_details/index?id=".concat(t.activity_id)}):40===t.product_type?uni.navigateTo({url:"/pages/activity/combination_status/index?id=".concat(t.activity_id)}):e(t)}))},n("d3b7"),n("99af")}}]);