(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-admin-orderList-index"],{"0066":function(t,e,i){"use strict";i("7a82");var o=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(i("c7eb")),n=o(i("1da1"));i("14d9"),i("d401"),i("d3b7"),i("25f0"),i("99af"),i("a9e3");var r=i("316e"),s=o(i("a869")),d=o(i("71d4")),c=i("5a7e"),l={name:"AdminOrderList",components:{Loading:s.default,PriceChange:d.default},data:function(){return{current:"",change:!1,refundMark:!1,types:1,where:{page:1,limit:10,status:1,store_name:""},list:[],loaded:!1,loading:!1,refundInfo:{},orderInfo:{},status:"",merId:""}},watch:{"$route.params.types":function(t){void 0!=t&&(this.where.status=t,this.init())},types:function(){this.getIndex()}},onLoad:function(t){this.where.status=t.types,this.current="",this.merId=t.merId,this.getIndex()},methods:{handleSearch:function(){this.loaded=!1,this.where.page=1,this.list=[],this.getIndex()},getIndex:function(){var t=this;t.loading||t.loaded||(t.loading=!0,6==t.where.status?(0,r.getRefundOrderList)(t.where,t.merId).then((function(e){t.loading=!1,t.loaded=e.data.list.length<t.where.limit,t.list.push.apply(t.list,e.data.list),t.where.page=t.where.page+1}),(function(e){t.$util.Tips({title:e})})):(0,r.getOrderList)(t.where,t.merId).then((function(e){t.loading=!1,t.loaded=e.data.list.length<t.where.limit,t.list.push.apply(t.list,e.data.list),t.where.page=t.where.page+1}),(function(e){t.$util.Tips({title:e})})))},init:function(){this.list=[],this.where.page=1,this.loaded=!1,this.loading=!1,this.getIndex(),this.current=""},changeStatus:function(t){"verify"!=t?this.where.status!=t&&(this.where.status=t,delete this.where.is_verify,this.init()):(this.where.is_verify=1,delete this.where.status,this.init())},modify:function(t,e){var i=e.toString();this.change=!0,this.orderInfo=t,this.status=i},refundModify:function(t){this.refundInfo=t,this.refundMark=!0},save:function(t){var e=this,i=this;if(!i.refundInfo.mer_mark)return this.$util.Tips({title:"请输入备注"});(0,r.setRefundMark)(i.merId,i.refundInfo.refund_order_id,{mer_mark:i.refundInfo.mer_mark}).then((function(t){i.refundMark=!1,e.$util.Tips({title:t.message,icon:"success"})}),(function(t){i.refundMark=!1,i.$util.Tips({title:t})}))},changeclose:function(t){this.change=t},confirmOrder:function(t){var e=this;uni.showModal({title:"确认收货",content:"为保障权益，请收到货确认无误后，再确认收货",success:function(i){i.confirm&&(0,r.refundOrderReceive)(e.merId,t.refund_order_id).then((function(i){return e.$util.Tips({title:"操作成功",icon:"success"},(function(){t.status=3}))})).catch((function(t){return e.$util.Tips({title:t})}))}})},toPostage:function(t){var e=this;0!=t.refunding?uni.showModal({title:"标题",content:"该订单有售后申请，请确认已处理！",success:function(i){i.confirm&&uni.navigateTo({url:"/pages/admin/delivery/index?id=".concat(t.order_id,"&merId=").concat(e.merId)})}}):uni.navigateTo({url:"/pages/admin/delivery/index?id=".concat(t.order_id,"&merId=").concat(e.merId)})},savePrice:function(t){var e=this;return(0,n.default)((0,a.default)().mark((function i(){var o,n,s,d,l,u;return(0,a.default)().wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(o=e,n={},s=t.orderInfo.pay_postage,t.refund_price,o.orderInfo.refund_status,d=t.remark,l={pay_postage:t.orderInfo.pay_postage,coupon_price:t.orderInfo.coupon_price,total_price:Number(t.orderInfo.total_price)},u=o.orderInfo.order_id,0!=o.status){i.next=10;break}if((0,c.isMoney)(t.orderInfo.pay_postage||t.orderInfo.total_price)){i.next=6;break}return i.abrupt("return",o.$util.Tips({title:"请输入正确的金额"}));case 6:n.pay_price=s,(0,r.setAdminOrderPrice)(e.merId,u,l).then((function(){o.change=!1,o.$util.Tips({title:"改价成功",icon:"success"}),o.init()}),(function(t){o.change=!1,o.$util.Tips({title:t,icon:"none"})})),i.next=13;break;case 10:if(d){i.next=12;break}return i.abrupt("return",e.$util.Tips({title:"请输入备注"}));case 12:(0,r.setAdminOrderRemark)(e.merId,u,{remark:d}).then((function(t){o.change=!1,e.$util.Tips({title:t.message,icon:"success"}),o.init()}),(function(t){o.change=!1,o.$util.Tips({title:t})}));case 13:case"end":return i.stop()}}),i)})))()},toDetail:function(t){uni.navigateTo({url:"/pages/admin/orderDetail/index?id=".concat(t.order_id,"&mer_id=").concat(t.mer_id)})},toRefundDetail:function(t){uni.navigateTo({url:"/pages/admin/refundDetail/index?id=".concat(t.refund_order_id,"&mer_id=").concat(t.mer_id)})}},onReachBottom:function(){this.getIndex()}};e.default=l},"29f7":function(t,e,i){"use strict";i.r(e);var o=i("0066"),a=i.n(o);for(var n in o)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return o[t]}))}(n);e["default"]=a.a},"43e8":function(t,e,i){"use strict";var o=i("d32a"),a=i.n(o);a.a},"46ed":function(t,e,i){"use strict";i.r(e);var o=i("b0b4"),a=i.n(o);for(var n in o)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return o[t]}))}(n);e["default"]=a.a},"522d":function(t,e,i){var o=i("24fb");e=o(!1),e.push([t.i,".Loads[data-v-49bc8a2c]{height:%?80?%;font-size:%?25?%;color:#000}.Loads .iconfont[data-v-49bc8a2c]{font-size:%?30?%;margin-right:%?10?%;height:%?32?%;line-height:%?32?%}\n/*加载动画*/@-webkit-keyframes load-data-v-49bc8a2c{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes load-data-v-49bc8a2c{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.loadingpic[data-v-49bc8a2c]{-webkit-animation:load-data-v-49bc8a2c 3s linear 1s infinite;animation:load-data-v-49bc8a2c 3s linear 1s infinite}.loading[data-v-49bc8a2c]{-webkit-animation:load-data-v-49bc8a2c linear 1s infinite;animation:load-data-v-49bc8a2c linear 1s infinite}",""]),t.exports=e},"53de":function(t,e,i){"use strict";i.r(e);var o=i("b8ad"),a=i("29f7");for(var n in a)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(n);i("43e8");var r=i("f0c5"),s=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,"153d34ce",null,!1,o["a"],void 0);e["default"]=s.exports},"60c2":function(t,e,i){var o=i("24fb"),a=i("1de5"),n=i("88d1");e=o(!1);var r=a(n);e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.pos-order-list .top-header[data-v-153d34ce]{position:fixed;top:0;left:0;z-index:9999;width:100%;background-color:#fff}.pos-order-list .nav[data-v-153d34ce]{height:%?96?%;font-size:%?30?%;color:#282828;width:%?690?%;margin:0 auto}.pos-order-list .nav .item[data-v-153d34ce]{display:inline-block;text-align:center;color:#333;max-width:%?160?%;margin-right:%?50?%;line-height:%?96?%}.pos-order-list .nav .item[data-v-153d34ce]:last-child{margin-right:0}.pos-order-list .nav .item.on[data-v-153d34ce]{color:#2291f8}.pos-order-list .list[data-v-153d34ce]{margin-top:%?210?%}.pos-order-list .list .item[data-v-153d34ce]{background-color:#fff;width:100%;position:relative}.pos-order-list .list .item .item-status[data-v-153d34ce]{position:absolute;top:%?14?%;right:%?20?%}.pos-order-list .list .item .item-status .iconfont[data-v-153d34ce]{font-size:%?98?%;color:#ccc}.pos-order-list .list .item .item-status .iconfont.on[data-v-153d34ce]{color:#ffe3bc}.pos-order-list .list .item ~ .item[data-v-153d34ce]{margin-top:%?24?%}.pos-order-list .list .activity_type[data-v-153d34ce]{display:inline-block;color:#e93323;font-size:%?20?%;text-align:center;border-radius:%?5?%;padding:0 %?4?%;line-height:%?28?%;margin-right:%?8?%;border:%?1?% solid #e93323}.pos-order-list .list .item .order-num[data-v-153d34ce]{height:%?124?%;border-bottom:1px solid #eee;font-size:%?30?%;font-weight:700;color:#282828;padding:0 %?30?%;position:relative}.pos-order-list .list .item .order-status[data-v-153d34ce]{color:#ff9600;position:absolute;top:%?24?%;right:%?20?%;text-align:right;width:%?160?%;font-weight:400;font-size:%?26?%}.pos-order-list .list .item .order-num .time[data-v-153d34ce]{font-size:%?26?%;font-weight:400;color:#999;margin-top:%?-40?%}.pos-order-list .list .item .operation[data-v-153d34ce]{padding:%?20?% %?30?% %?20?% 0;margin:%?30?% 0 0 %?30?%;border-top:%?1?% solid #eee}.pos-order-list .list .item .operation .more[data-v-153d34ce]{position:relative}.pos-order-list .list .item .operation .icon-gengduo[data-v-153d34ce]{font-size:%?50?%;color:#aaa}.pos-order-list .list .item .operation .order .arrow[data-v-153d34ce]{width:0;height:0;border-left:%?11?% solid transparent;border-right:%?11?% solid transparent;border-top:%?20?% solid #e5e5e5;position:absolute;left:%?15?%;bottom:%?-18?%}.pos-order-list .list .item .operation .order .arrow[data-v-153d34ce]:before{content:"";width:0;height:0;border-left:%?7?% solid transparent;border-right:%?7?% solid transparent;border-top:%?20?% solid #fff;position:absolute;left:%?-7?%;bottom:0}.pos-order-list .list .item .operation .order[data-v-153d34ce]{width:%?200?%;background-color:#fff;border:1px solid #eee;border-radius:%?10?%;position:absolute;top:%?-100?%;z-index:9}.pos-order-list .list .item .operation .order .items[data-v-153d34ce]{height:%?77?%;line-height:%?77?%;text-align:center}.pos-order-list .list .item .operation .order .items ~ .items[data-v-153d34ce]{border-top:1px solid #f5f5f5}.pos-order-list .list .item .operation .bnt[data-v-153d34ce]{font-size:%?28?%;color:#5c5c5c;width:%?170?%;height:%?60?%;border-radius:%?30?%;border:1px solid #bbb;text-align:center;line-height:%?60?%}.pos-order-list .list .item .operation .bnt_color[data-v-153d34ce]{border:none;color:#fff;background:linear-gradient(90deg,#2291f8,#1cd1dc)}.pos-order-list .list .item .operation .bnt ~ .bnt[data-v-153d34ce]{margin-left:%?14?%}.pos-order-goods[data-v-153d34ce]{padding:0 %?30?%;background-color:#fff}.pos-order-goods .goods[data-v-153d34ce]{padding-top:%?20?%;overflow:hidden}.pos-order-goods .goods ~ .goods[data-v-153d34ce]{border-top:1px dashed #e5e5e5}.pos-order-goods .cancellate[data-v-153d34ce]{font-size:%?24?%;float:right;margin-top:%?10?%}.pos-order-goods .cancellate uni-text[data-v-153d34ce]{margin-left:%?26?%}.pos-order-goods .cancelled[data-v-153d34ce]{color:#ff9600}.pos-order-goods .goods .uncancell[data-v-153d34ce]{color:#999}.pos-order-goods .goods .picTxt[data-v-153d34ce]{width:%?515?%;align-items:flex-start}.pos-order-goods .goods .picTxt .pictrue[data-v-153d34ce]{width:%?130?%;height:%?130?%}.pos-order-goods .goods .picTxt .pictrue uni-image[data-v-153d34ce]{width:100%;height:100%;border-radius:%?6?%}.pos-order-goods .goods .picTxt .text[data-v-153d34ce]{flex-direction:column;width:%?365?%}.pos-order-goods .goods .picTxt .text .info[data-v-153d34ce]{font-size:%?28?%;color:#333}.pos-order-goods .goods .picTxt .text .info.refund-info[data-v-153d34ce]{width:%?460?%}.refund-y-money[data-v-153d34ce]{margin-top:%?20?%;font-size:%?26?%}.pos-order-goods .goods .picTxt .text .attr[data-v-153d34ce]{margin-top:%?20?%;font-size:%?24?%;color:#999}.pos-order-goods .goods .money[data-v-153d34ce]{width:%?164?%;text-align:right;font-size:%?28?%}.pos-order-goods .goods .money.refund-money[data-v-153d34ce]{width:auto;position:relative;top:%?-50?%}.pos-order-goods .goods .money.refund-money .num[data-v-153d34ce]{color:#999}.pos-order-goods .goods .money .refund-num[data-v-153d34ce]{font-size:%?24?%;color:#282828}.pos-order-goods .goods .money .x-money[data-v-153d34ce]{color:#282828}.pos-order-goods .goods .money .num[data-v-153d34ce]{color:#ff9600;margin:%?5?% 0}.pos-order-goods .goods .money .y-money[data-v-153d34ce]{color:#999;text-decoration:line-through}.pos-order-goods .goods .refund_num[data-v-153d34ce]{display:inline-block;margin-left:%?10?%}.public-total[data-v-153d34ce]{font-size:%?28?%;color:#282828;height:%?92?%;line-height:%?92?%;text-align:right;padding:0 %?30?%;background-color:#fff}.public-total .money[data-v-153d34ce]{color:#ff4c3c}.nothing[data-v-153d34ce]{margin-top:%?200?%;text-align:center}.nothing_text[data-v-153d34ce]{margin-top:%?20?%;color:#999}.priceChange[data-v-153d34ce]{position:fixed;width:%?580?%;background-color:#fff;border-radius:%?10?%;top:50%;left:50%;margin-left:%?-290?%;margin-top:%?-335?%;z-index:666;transition:all .3s ease-in-out 0s;-webkit-transform:scale(0);transform:scale(0);opacity:0}.priceChange.on[data-v-153d34ce]{opacity:1;-webkit-transform:scale(1);transform:scale(1)}.priceChange .priceTitle[data-v-153d34ce]{background:url('+r+") no-repeat;background-size:100% 100%;width:100%;height:%?160?%;border-radius:%?10?% %?10?% 0 0;text-align:center;font-size:%?40?%;color:#fff;line-height:%?160?%;position:relative}.priceChange .priceTitle .iconfont[data-v-153d34ce]{position:absolute;font-size:%?40?%;right:%?26?%;top:%?23?%;width:%?40?%;height:%?40?%;line-height:%?40?%}.priceChange .listChange[data-v-153d34ce]{padding:0 %?40?%}.priceChange .listChange uni-textarea[data-v-153d34ce]{box-sizing:border-box}.priceChange .listChange .item[data-v-153d34ce]{height:%?103?%;border-bottom:1px solid #e3e3e3;font-size:%?32?%;color:#333}.priceChange .modify[data-v-153d34ce]{font-size:%?32?%;color:#fff;width:%?490?%;height:%?90?%;text-align:center;line-height:%?90?%;border-radius:%?45?%;background-color:#2291f8;margin:%?53?% auto}.priceChange .listChange uni-textarea[data-v-153d34ce]{border:1px solid #eee;width:100%;height:%?200?%;margin-top:%?50?%;border-radius:%?10?%;color:#333;padding:%?20?%}.search[data-v-153d34ce]{padding:%?17?% %?30?%}.search .search-content[data-v-153d34ce]{width:100%;height:%?60?%;padding:0 %?30?%;border-radius:%?30?%;background-color:#f5f5f5;font-size:%?26?%}.search .iconfont[data-v-153d34ce]{margin-right:%?10?%;font-size:%?26?%;color:#999}.search .input-placeholder[data-v-153d34ce]{font-size:%?26?%;color:#999}.search .input[data-v-153d34ce]{flex:1}",""]),t.exports=e},a869:function(t,e,i){"use strict";i.r(e);var o=i("c562"),a=i("46ed");for(var n in a)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(n);i("f3ea");var r=i("f0c5"),s=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,"49bc8a2c",null,!1,o["a"],void 0);e["default"]=s.exports},b0b4:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={name:"Loading",props:{loaded:{type:Boolean,default:!1},loading:{type:Boolean,default:!1}}};e.default=o},b8ad:function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{ref:"container",staticClass:"pos-order-list"},[i("v-uni-view",{staticClass:"top-header"},[i("v-uni-view",{staticClass:"search"},[i("v-uni-view",{staticClass:"search-content acea-row row-middle"},[i("v-uni-text",{staticClass:"iconfont icon-sousuo"}),i("v-uni-input",{staticClass:"input",attrs:{"confirm-type":"search",placeholder:"请输收货人手机号或退款订单号搜索"},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.handleSearch.apply(void 0,arguments)}},model:{value:t.where.store_name,callback:function(e){t.$set(t.where,"store_name",e)},expression:"where.store_name"}})],1)],1),i("v-uni-view",[i("v-uni-scroll-view",{staticClass:"nav acea-row",staticStyle:{"white-space":"nowrap",display:"flex"},attrs:{"scroll-x":"true","scroll-with-animation":!0,"show-scrollbar":"true"}},[i("v-uni-view",{staticClass:"item",class:1==t.where.status?"on":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeStatus(1)}}},[t._v("待付款")]),i("v-uni-view",{staticClass:"item",class:1==t.where.is_verify?"on":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeStatus("verify")}}},[t._v("待核销")]),i("v-uni-view",{staticClass:"item",class:2==t.where.status?"on":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeStatus(2)}}},[t._v("待发货")]),i("v-uni-view",{staticClass:"item",class:3==t.where.status?"on":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeStatus(3)}}},[t._v("待收货")]),i("v-uni-view",{staticClass:"item",class:4==t.where.status?"on":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeStatus(4)}}},[t._v("待评价")]),i("v-uni-view",{staticClass:"item",class:5==t.where.status?"on":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeStatus(5)}}},[t._v("已完成")]),i("v-uni-view",{staticClass:"item",class:6==t.where.status?"on":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeStatus(6)}}},[t._v("退款")])],1)],1)],1),6==t.where.status?i("v-uni-view",{staticClass:"list"},t._l(t.list,(function(e,o){return i("v-uni-view",{key:o,staticClass:"item"},[i("v-uni-view",{staticClass:"order-num acea-row row-middle"},[e.order&&0!=e.order.activity_type?i("v-uni-text",{staticClass:"activity_type"},[t._v(t._s(1==e.order.activity_type?"秒杀":2==e.order.activity_type?"预售":3==e.order.activity_type?"助力":4==e.order.activity_type?"拼团":10==e.order.activity_type?"套餐":""))]):t._e(),t._v("退款单号："+t._s(e.refund_order_sn)),i("v-uni-text",{staticClass:"time"},[t._v("申请时间："+t._s(e.create_time))])],1),t._l(e.refundProduct,(function(o,a){return i("v-uni-view",{key:a,staticClass:"pos-order-goods",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toRefundDetail(e)}}},[i("v-uni-view",{staticClass:"goods acea-row row-between-wrapper"},[o.product.cart_info?i("v-uni-view",{staticClass:"picTxt acea-row row-between-wrapper"},[i("v-uni-view",{staticClass:"pictrue"},[i("v-uni-image",{attrs:{src:o.product.cart_info.product.image}})],1),i("v-uni-view",{staticClass:"text acea-row row-between row-column"},[i("v-uni-view",{staticClass:"info line1 refund-info"},[t._v(t._s(o.product.cart_info.product&&o.product.cart_info.product.store_name))]),i("v-uni-view",{staticClass:"attr"},[t._v(t._s(o.product.cart_info.productAttr&&o.product.cart_info.productAttr.sku||"默认"))]),i("v-uni-view",{staticClass:"y-money refund-y-money"},[t._v("退款：￥"+t._s(o.refund_price))])],1)],1):t._e(),i("v-uni-view",{staticClass:"money refund-money"},[i("v-uni-view",{staticClass:"num"},[t._v("x"+t._s(o.refund_num))])],1)],1)],1)})),i("v-uni-view",{staticClass:"item-status"},[-1==e.status?i("v-uni-text",{staticClass:"iconfont icon-yijujue1"}):t._e(),0==e.status?i("v-uni-text",{staticClass:"iconfont icon-tuikuanzhong on"}):t._e(),1==e.status||2==e.status?i("v-uni-text",{staticClass:"iconfont icon-tuihuozhong on"}):t._e(),3==e.status?i("v-uni-text",{staticClass:"iconfont icon-yituikuan1"}):t._e()],1),i("v-uni-view",{staticClass:"operation acea-row row-between-wrapper"},[i("v-uni-view",{staticClass:"more"}),i("v-uni-view",{staticClass:"acea-row row-middle"},[i("v-uni-view",{staticClass:"bnt",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.refundModify(e,1)}}},[t._v("订单备注")]),0==e.status?i("v-uni-navigator",{staticClass:"bnt bnt_color",attrs:{url:"/pages/admin/orderRefund/index?id="+e.refund_order_id+"&merId="+t.merId}},[t._v("立即退款")]):t._e(),2==e.status?i("v-uni-navigator",{staticClass:"bnt",attrs:{url:"/pages/users/goods_logistics/index?refundId="+e.refund_order_id+"&merId="+t.merId}},[t._v("查看物流")]):t._e(),2==e.status?i("v-uni-view",{staticClass:"bnt bnt_color",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.confirmOrder(e)}}},[t._v("确认收货")]):t._e()],1)],1)],2)})),1):i("v-uni-view",{staticClass:"list"},t._l(t.list,(function(e,o){return i("v-uni-view",{key:o,staticClass:"item"},[i("v-uni-view",{staticClass:"order-num acea-row row-middle"},[0!=e.activity_type?i("v-uni-text",{staticClass:"activity_type"},[t._v(t._s(1==e.activity_type?"秒杀":2==e.activity_type?"预售":3==e.activity_type?"助力":4==e.activity_type?"拼团":10==e.activity_type?"套餐":""))]):t._e(),t._v("订单号："+t._s(e.order_sn)),i("v-uni-text",{staticClass:"time"},[t._v("下单时间："+t._s(e.create_time))]),0!=e.refunding&&1!=t.where.status?i("v-uni-text",{staticClass:"order-status"},[t._v(t._s(1==e.refunding?"退款中":2==e.refunding?"部分退款":"全部退款"))]):t._e()],1),t._l(e.orderProduct,(function(o,a){return i("v-uni-view",{key:a,staticClass:"pos-order-goods",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toDetail(e)}}},[i("v-uni-view",{staticClass:"goods"},[i("v-uni-view",{staticClass:"acea-row row-between-wrapper"},[i("v-uni-view",{staticClass:"picTxt acea-row row-between-wrapper"},[i("v-uni-view",{staticClass:"pictrue"},[i("v-uni-image",{attrs:{src:o.cart_info.product.image}})],1),i("v-uni-view",{staticClass:"text acea-row row-between row-column"},[i("v-uni-view",{staticClass:"info line2"},[t._v(t._s(o.cart_info.product.store_name))]),i("v-uni-view",{staticClass:"attr"},[t._v(t._s(o.cart_info.productAttr&&o.cart_info.productAttr.sku||"默认"))])],1)],1),i("v-uni-view",{staticClass:"money"},[i("v-uni-view",{staticClass:"x-money"},[t._v("￥"+t._s(o.cart_info.productAttr.price))]),i("v-uni-view",{staticClass:"num"},[t._v("x"+t._s(o.product_num))])],1)],1)],1)],1)})),i("v-uni-view",{staticClass:"public-total"},[t._v("共"+t._s(e.total_num)+"件商品，"),t.where.status<=1?i("span",[t._v("应")]):i("span",[t._v("已")]),t._v("支付"),i("span",{staticClass:"money"},[t._v("￥"+t._s(e.pay_price))]),t._v("(邮费 ¥"+t._s(e.pay_postage)+")")]),i("v-uni-view",{staticClass:"operation acea-row row-between-wrapper"},[i("v-uni-view",{staticClass:"more"}),i("v-uni-view",{staticClass:"acea-row row-middle"},[1==t.where.status&&2!=e.activity_type?i("v-uni-view",{staticClass:"bnt",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.modify(e,0)}}},[t._v("一键改价")]):t._e(),i("v-uni-view",{staticClass:"bnt",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.modify(e,1)}}},[t._v("订单备注")]),2==t.where.status&&0==e.order_type?i("v-uni-view",{staticClass:"bnt bnt_color",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toPostage(e)}}},[t._v("去发货")]):t._e(),2==t.where.status&&1==e.order_type||1==t.where.is_verify?i("v-uni-view",{staticClass:"bnt bnt_color",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toDetail(e)}}},[t._v("去核销")]):t._e()],1)],1)],2)})),1),i("Loading",{attrs:{loaded:t.loaded,loading:t.loading}}),!t.loading&&t.list.length<=0?i("v-uni-view",{staticClass:"nothing"},[i("v-uni-image",{attrs:{src:"/static/images/no_thing.png",mode:"widthFix"}}),i("v-uni-view",{staticClass:"nothing_text"},[t._v("暂无订单~")])],1):t._e(),i("PriceChange",{attrs:{change:t.change,orderInfo:t.orderInfo,status:t.status},on:{closechange:function(e){arguments[0]=e=t.$handleEvent(e),t.changeclose(e)},savePrice:function(e){arguments[0]=e=t.$handleEvent(e),t.savePrice.apply(void 0,arguments)}}}),i("v-uni-view",[i("v-uni-view",{staticClass:"priceChange",class:!0===t.refundMark?"on":""},[i("v-uni-view",{staticClass:"priceTitle"},[t._v("订单备注"),i("span",{staticClass:"iconfont icon-guanbi",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.refundMark=!1}}})]),i("v-uni-view",{staticClass:"listChange"},[i("v-uni-textarea",{attrs:{placeholder:"请填写备注信息..."},model:{value:t.refundInfo.mer_mark,callback:function(e){t.$set(t.refundInfo,"mer_mark",e)},expression:"refundInfo.mer_mark"}})],1),i("v-uni-view",{staticClass:"modify",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.save.apply(void 0,arguments)}}},[t._v("确认提交")])],1),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:!0===t.refundMark,expression:"refundMark === true"}],staticClass:"mask",on:{touchmove:function(e){e.preventDefault(),arguments[0]=e=t.$handleEvent(e)}}})],1)],1)},a=[]},b98c:function(t,e,i){var o=i("522d");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=i("4f06").default;a("45a150b0",o,!0,{sourceMap:!1,shadowMode:!1})},c562:function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var o=function(){var t=this.$createElement,e=this._self._c||t;return e("v-uni-view",[this.loading&&!this.loaded?e("v-uni-view",{staticClass:"Loads acea-row row-center-wrapper",staticStyle:{"margin-top":".2rem"}},[this.loading?e("v-uni-view",[e("v-uni-view",{staticClass:"iconfont icon-jiazai loading acea-row row-center-wrapper"}),this._v("正在加载中")],1):e("v-uni-view",[this._v("上拉加载更多")])],1):this._e()],1)},a=[]},d32a:function(t,e,i){var o=i("60c2");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=i("4f06").default;a("40586e58",o,!0,{sourceMap:!1,shadowMode:!1})},f3ea:function(t,e,i){"use strict";var o=i("b98c"),a=i.n(o);a.a}}]);