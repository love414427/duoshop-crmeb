(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-news_list-index"],{"15f7":function(t,e,i){t.exports=i.p+"static/img/empty-box.241c4194.png"},"2b60":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-07a9f971]{background-color:#fff!important}body.?%PAGE?%[data-v-07a9f971]{background-color:#fff!important}.newsList .swiper[data-v-07a9f971]{width:100%;position:relative;box-sizing:border-box;padding:0 %?30?%}.newsList .swiper uni-swiper[data-v-07a9f971]{width:100%;height:%?365?%;position:relative}.newsList .swiper .slide-image[data-v-07a9f971]{width:100%;height:%?335?%;border-radius:%?6?%}.newsList .swiper .uni-swiper-dot[data-v-07a9f971]{width:%?12?%!important;height:%?12?%!important;border-radius:0;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 100%;transform-origin:0 100%}.newsList .swiper .uni-swiper-dot ~ .uni-swiper-dot[data-v-07a9f971]{margin-left:%?5?%}.newsList .swiper .uni-swiper-dots.uni-swiper-dots-horizontal[data-v-07a9f971]{margin-bottom:%?-15?%}.newsList .nav[data-v-07a9f971]{padding:0 %?30?%;width:100%;white-space:nowrap;box-sizing:border-box;margin-top:%?43?%}.newsList .nav .item[data-v-07a9f971]{display:inline-block;font-size:%?32?%;color:#999;min-width:%?130?%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;position:relative;padding-bottom:%?20?%;text-align:center}.newsList .nav .item.on[data-v-07a9f971]{color:#282828}.newsList .nav .item ~ .item[data-v-07a9f971]{margin-left:%?46?%}.newsList .nav .item .line[data-v-07a9f971]{width:%?24?%;height:%?4?%;border-radius:%?2?%;margin:%?10?% auto 0 auto;position:absolute;bottom:%?5?%;left:50%;margin-left:%?-12?%}.newsList .list .item[data-v-07a9f971]{margin:0 %?30?%;border-bottom:1px solid #f0f0f0;padding:%?35?% 0}.newsList .list .item .pictrue[data-v-07a9f971]{width:%?250?%;height:%?156?%}.newsList .list .item .pictrue uni-image[data-v-07a9f971]{width:100%;height:100%;border-radius:%?6?%}.newsList .list .item .text[data-v-07a9f971]{width:%?420?%;height:%?156?%;font-size:%?24?%;color:#999}.newsList .list .item .text .name[data-v-07a9f971]{font-size:%?30?%;color:#282828}.newsList .list .item .picList .pictrue[data-v-07a9f971]{width:%?335?%;height:%?210?%;margin-top:%?30?%}.newsList .list .item .picList.on .pictrue[data-v-07a9f971]{width:%?217?%;height:%?136?%}.newsList .list .item .picList .pictrue uni-image[data-v-07a9f971]{width:100%;height:100%;border-radius:%?6?%}.newsList .list .item .time[data-v-07a9f971]{text-align:right;font-size:%?24?%;color:#999;margin-top:%?22?%}.noCommodity[data-v-07a9f971]{border:none}.empty-box[data-v-07a9f971]{display:flex;flex-direction:column;justify-content:center;align-items:center;margin-top:%?200?%}.empty-box uni-image[data-v-07a9f971]{width:%?414?%;height:%?240?%}.empty-box .txt[data-v-07a9f971]{font-size:%?26?%;color:#999;text-align:center}',""]),t.exports=e},"4cc1":function(t,e,i){"use strict";i.r(e);var n=i("cc8a"),a=i("4dc2");for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("b1a8");var r=i("f0c5"),s=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"6d33dd08",null,!1,n["a"],void 0);e["default"]=s.exports},"4dc2":function(t,e,i){"use strict";i.r(e);var n=i("fa4c"),a=i.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"58d4":function(t,e,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.ajcaptchaCheck=function(t){return a.default.post("ajcheck",t,{noAuth:!0})},e.appleAppAuth=function(t){return a.default.post("auth/apple",t,{noAuth:!0})},e.appletsDecrypt=function(t){return a.default.post("user/mp/binding",t)},e.bindingPhone=function(t){return a.default.post("user/binding",t)},e.getAjcaptcha=function(t){return a.default.get("ajcaptcha",t,{noAuth:!0})},e.getAppVersion=function(){return a.default.get("appVersion",{},{noAuth:!0})},e.getArticleBannerList=function(){return a.default.get("article/banner/list",{},{noAuth:!0})},e.getArticleCategoryList=function(){return a.default.get("article/category/lst",{},{noAuth:!0})},e.getArticleDetails=function(t){return a.default.get("article/detail/"+t,{},{noAuth:!0})},e.getArticleHotList=function(){return a.default.get("article/hot/list",{},{noAuth:!0})},e.getArticleList=function(t,e){return a.default.get("article/lst/"+t,e,{noAuth:!0})},e.getCity=function(){return a.default.get("system/city/lst",{},{noAuth:!0})},e.getCityList=function(t){return a.default.get("v2/system/city",{address:t},{noAuth:!0})},e.getCityV2=function(t){return a.default.get("v2/system/city/lst/"+t,{},{noAuth:!0})},e.getCoupons=function(t){return a.default.get("coupon/product",t,{noAuth:!0})},e.getDiy=function(t){return a.default.get("diy",t,{noAuth:!0})},e.getIndexData=function(){return a.default.get("common/home",{},{noAuth:!0})},e.getLiveList=function(t,e){return a.default.get("wechat/live",{page:t,limit:e},{noAuth:!0})},e.getLogo=function(){return a.default.get("wechat/get_logo",{},{noAuth:!0})},e.getOpenAdv=function(){return a.default.get("open_screen",{},{noAuth:!0})},e.getPageDiy=function(t){return a.default.get("micro",t,{noAuth:!0})},e.getShopCoupons=function(t){return a.default.get("coupon/store/"+t,{},{noAuth:!0})},e.getTemlIds=function(){return a.default.get("wechat/teml_ids",{},{noAuth:!0})},e.getUserCoupons=function(t){return a.default.get("coupon/list",t)},e.loginMobile=function(t){return a.default.post("login/mobile",t,{noAuth:!0})},e.logout=function(){return a.default.get("logout")},e.modifyPassword=function(t){return a.default.post("user/change/password",t)},e.modifyPhone=function(t){return a.default.post("user/change/phone",t)},e.phoneLogin=function(t){return a.default.post("login",t,{noAuth:!0})},e.phoneRegister=function(t){return a.default.post("register",t,{noAuth:!0})},e.phoneRegisterReset=function(t){return a.default.post("register/reset",t,{noAuth:!0})},e.pink=function(){return a.default.get("pink",{},{noAuth:!0})},e.registerVerify=function(t,e,i,n){return a.default.post("register/verify",{phone:t,type:void 0===e?"reset":e,key:i,code:n},{noAuth:!0})},e.setCouponReceive=function(t){return a.default.post("coupon/receive/"+t)},e.setFormId=function(t){return a.default.post("wechat/set_form_id",{formId:t})},e.switchH5Login=function(t){return a.default.post("user/switch",t)},e.verifyCode=function(){return a.default.get("verify_code",{},{noAuth:!0})},e.wechatAppAuth=function(t){return a.default.post("auth/app",t,{noAuth:!0})};var a=n(i("3314"))},"6a7e":function(t,e,i){"use strict";var n=i("faf1"),a=i.n(n);a.a},7799:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".pictrueBox[data-v-6d33dd08]{width:%?130?%;height:%?120?%}\n/*返回主页按钮*/.home[data-v-6d33dd08]{position:fixed;color:#fff;text-align:center;z-index:9999;right:%?15?%;display:flex}.home .homeCon[data-v-6d33dd08]{border-radius:%?50?%;opacity:0;height:0;color:#e93323;width:0}.home .homeCon.on[data-v-6d33dd08]{opacity:1;-webkit-animation:bounceInRight .5s cubic-bezier(.215,.61,.355,1);animation:bounceInRight .5s cubic-bezier(.215,.61,.355,1);width:%?300?%;height:%?86?%;margin-bottom:%?20?%;display:flex;justify-content:center;align-items:center;background:var(--view-theme)}.home .homeCon .iconfont[data-v-6d33dd08]{font-size:%?48?%;color:#fff;display:inline-block;margin:0 auto}.home .pictrue[data-v-6d33dd08]{width:%?86?%;height:%?86?%;border-radius:50%;margin:0 auto;background-color:var(--view-theme);box-shadow:0 %?5?% %?12?% rgba(0,0,0,.5)}.home .pictrue .image[data-v-6d33dd08]{width:100%;height:100%}.pictruea[data-v-6d33dd08]{width:100%;height:100%;display:block;object-fit:cover;vertical-align:middle}",""]),t.exports=e},"89ae":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"newsList"},[t.imgUrls.length>0?n("v-uni-view",{staticClass:"swiper"},[n("v-uni-swiper",{attrs:{"indicator-dots":"true",autoplay:t.autoplay,circular:t.circular,interval:t.interval,duration:t.duration,"indicator-color":"rgba(102,102,102,0.3)","indicator-active-color":"#666"}},[t._l(t.imgUrls,(function(t,e){return[n("v-uni-swiper-item",[n("v-uni-navigator",{attrs:{url:"/pages/news_details/index?id="+t.id}},[n("v-uni-image",{staticClass:"slide-image",attrs:{src:t.image_input[0]}})],1)],1)]}))],2)],1):t._e(),t.navList.length>0?n("v-uni-view",{staticClass:"nav"},[n("v-uni-scroll-view",{staticClass:"scroll-view_x",staticStyle:{width:"auto",overflow:"hidden"},attrs:{"scroll-x":!0,"scroll-with-animation":!0,"scroll-left":t.scrollLeft}},[t._l(t.navList,(function(e,i){return[n("v-uni-view",{key:i+"_0",staticClass:"item",class:t.active==e.article_category_id?"on":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.tabSelect(e.article_category_id)}}},[n("v-uni-view",[t._v(t._s(e.title))]),t.active==e.article_category_id?n("v-uni-view",{staticClass:"line bg-color"}):t._e()],1)]}))],2)],1):t._e(),n("v-uni-view",{staticClass:"list"},[t._l(t.articleList,(function(e,i){return[n("v-uni-navigator",{key:i+"_0",staticClass:"item acea-row row-between-wrapper",attrs:{url:"/pages/news_details/index?id="+e.article_id,"hover-class":"none"}},[n("v-uni-view",{staticClass:"text acea-row row-column-between"},[n("v-uni-view",{staticClass:"name line2"},[t._v(t._s(e.title))]),n("v-uni-view",[t._v(t._s(e.create_time))])],1),n("v-uni-view",{staticClass:"pictrue"},[n("v-uni-image",{attrs:{src:e.image_input}})],1)],1)]}))],2)],1),0!=t.articleList.length||1==t.page&&0!=t.active?t._e():n("v-uni-view",{staticClass:"empty-box acea-row row-middle"},[n("v-uni-view",{staticClass:"pictrue"},[n("v-uni-image",{attrs:{src:i("15f7")}}),n("v-uni-view",{staticClass:"txt"},[t._v("暂无新闻信息~")])],1)],1),n("home")],1)},a=[]},b1a8:function(t,e,i){"use strict";var n=i("d56c"),a=i.n(n);a.a},cc8a:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticStyle:{"touch-action":"none"},style:t.viewColor},[i("v-uni-view",{staticClass:"home",staticStyle:{position:"fixed"},style:{top:t.top+"px",bottom:t.bottom},attrs:{id:"right-nav"},on:{touchmove:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.setTouchMove.apply(void 0,arguments)}}},[t.homeActive?i("v-uni-view",{staticClass:"homeCon",class:!0===t.homeActive?"on":""},[i("v-uni-navigator",{staticClass:"iconfont icon-shouye-xianxing",attrs:{"hover-class":"none",url:"/pages/index/index","open-type":"switchTab"}}),i("v-uni-navigator",{staticClass:"iconfont icon-caigou-xianxing",attrs:{"hover-class":"none",url:"/pages/order_addcart/order_addcart","open-type":"switchTab"}}),i("v-uni-navigator",{staticClass:"iconfont icon-yonghu1",attrs:{"hover-class":"none",url:"/pages/user/index","open-type":"switchTab"}})],1):t._e(),i("v-uni-view",{staticClass:"pictrueBox",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.open.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"pictrue"},[i("v-uni-image",{staticClass:"image pictruea",attrs:{src:!0===t.homeActive?"/static/images/navbtn_open.gif":"/static/images/navbtn_close.gif"}})],1)],1)],1)],1)},a=[]},d56c:function(t,e,i){var n=i("7799");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("6cbd5adf",n,!0,{sourceMap:!1,shadowMode:!1})},da62:function(t,e,i){"use strict";i.r(e);var n=i("dbbc"),a=i.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},dbbc:function(t,e,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("99af");var a=i("58d4"),o=n(i("4cc1")),r={components:{home:o.default},data:function(){return{imgUrls:[],articleList:[],indicatorDots:!1,circular:!0,autoplay:!0,interval:3e3,duration:500,navList:[],active:0,page:1,limit:8,status:!1,scrollLeft:0}},onShow:function(){},onLoad:function(){this.getArticleCate(),this.status=!1,this.page=1,this.articleList=[]},onReachBottom:function(){this.getCidArticle()},methods:{getArticleHot:function(){var t=this;(0,a.getArticleHotList)().then((function(e){t.$set(t,"articleList",e.data)}))},getArticleBanner:function(){var t=this;(0,a.getArticleBannerList)().then((function(e){t.imgUrls=e.data}))},getCidArticle:function(){var t=this;if(0!=t.active){var e=t.limit,i=t.page,n=t.articleList;t.status||(0,a.getArticleList)(t.active,{page:i,limit:e}).then((function(i){var a,o=i.length;a=n.concat(i.data.list),t.page++,t.$set(t,"articleList",a),t.status=e>o,t.page=t.page}))}},getArticleCate:function(){var t=this,e=this;(0,a.getArticleCategoryList)().then((function(i){t.active=i.data[0].article_category_id,e.$set(e,"navList",i.data),t.getCidArticle()}))},tabSelect:function(t){this.active=t,0==this.active?this.getArticleHot():(this.$set(this,"articleList",[]),this.page=1,this.status=!1,this.getCidArticle())}}};e.default=r},ddfa:function(t,e,i){"use strict";i.r(e);var n=i("89ae"),a=i("da62");for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("6a7e");var r=i("f0c5"),s=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"07a9f971",null,!1,n["a"],void 0);e["default"]=s.exports},fa4c:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i("26cb"),a=i("f26a"),o={name:"Home",props:{},data:function(){return{domain:a.HTTP_REQUEST_URL,top:"",bottom:""}},computed:(0,n.mapGetters)(["homeActive","viewColor","keyColor"]),methods:{setTouchMove:function(t){t.touches[0].clientY<545&&t.touches[0].clientY>66&&(this.top=t.touches[0].clientY,this.bottom="auto")},open:function(){this.homeActive?this.$store.commit("CLOSE_HOME"):this.$store.commit("OPEN_HOME")}},created:function(){this.bottom="50px"}};e.default=o},faf1:function(t,e,i){var n=i("2b60");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("d8013dd6",n,!0,{sourceMap:!1,shadowMode:!1})}}]);