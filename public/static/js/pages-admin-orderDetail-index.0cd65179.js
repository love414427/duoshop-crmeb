(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-admin-orderDetail-index"],{"11f7":function(e,t,r){"use strict";r.r(t);var o=r("892e"),i=r.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){r.d(t,e,(function(){return o[e]}))}(a);t["default"]=i.a},"2b73":function(e,t,r){var o=r("4bb0");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var i=r("4f06").default;i("789566b2",o,!0,{sourceMap:!1,shadowMode:!1})},"33c7":function(e,t,r){"use strict";r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return i})),r.d(t,"a",(function(){}));var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-uni-view",{staticClass:"order-details pos-order-details"},[r("v-uni-view",{staticClass:"header acea-row row-middle"},[r("v-uni-view",{staticClass:"state"},[e._v(e._s(e.title))]),r("v-uni-view",{staticClass:"data"},[r("v-uni-view",{staticClass:"order-num"},[e._v("订单："+e._s(e.orderInfo.order_sn))]),r("v-uni-view",[r("span",{staticClass:"time"},[e._v(e._s(e.orderInfo.create_time))])])],1)],1),"looks"!=e.goname?r("v-uni-view",{staticClass:"remarks acea-row",staticStyle:{"align-items":"center"}},[r("span",{staticClass:"iconfont icon-zhinengkefu-"}),r("v-uni-view",{staticClass:"line1",staticStyle:{"text-align":"left",flex:"1","margin-left":"10rpx"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.modify("1")}}},[e._v(e._s(e.orderInfo.remark?e.orderInfo.remark:"订单未备注，点击添加备注信息"))])],1):e._e(),r("v-uni-view",{staticClass:"orderingUser acea-row row-middle"},[r("span",{staticClass:"iconfont icon-yonghu2"}),e._v(e._s(e.orderInfo.user&&e.orderInfo.user.nickname||""))]),r("v-uni-view",{staticClass:"address"},[r("v-uni-view",{staticClass:"name"},[e._v(e._s(e.orderInfo.real_name)),r("span",{staticClass:"phone"},[e._v(e._s(e.orderInfo.user_phone))])]),r("v-uni-view",[e._v(e._s(e.orderInfo.user_address))]),r("v-uni-button",{staticClass:"copy copy-data",attrs:{"data-clipboard-text":"收货人姓名："+e.orderInfo.real_name+"\n收货人电话："+e.orderInfo.user_phone+"\n收货人地址："+e.orderInfo.user_address}},[e._v("复制")])],1),r("v-uni-view",{staticClass:"line"},[r("v-uni-image",{attrs:{src:e.domain+"/static/images/line.jpg"}})],1),r("v-uni-view",{staticClass:"pos-order-goods"},e._l(e.orderInfo.orderProduct,(function(t,o){return r("v-uni-navigator",{key:o,staticClass:"goods",attrs:{url:"/pages/goods_details/index?id="+t.cart_info.product.product_id,"hover-class":"none"}},[r("v-uni-view",{staticClass:"acea-row row-between-wrapper"},[r("v-uni-view",{staticClass:"picTxt acea-row row-between-wrapper"},[r("v-uni-view",{staticClass:"pictrue"},[r("v-uni-image",{attrs:{src:t.cart_info.productAttr.image||t.cart_info.product.image}})],1),r("v-uni-view",{staticClass:"text acea-row row-between row-column"},[r("v-uni-view",{staticClass:"info line2"},[e._v(e._s(t.cart_info.product.store_name))]),r("v-uni-view",{staticClass:"attr"},[e._v(e._s(t.cart_info.product.suk))])],1)],1),r("v-uni-view",{staticClass:"money"},[r("v-uni-view",{staticClass:"x-money"},[e._v("￥"+e._s(t.cart_info.productAttr.price))]),r("v-uni-view",{staticClass:"num"},[e._v("x"+e._s(t.product_num)),t.product_num-t.refund_num>0?r("v-uni-text",{staticClass:"font-color refund_num"},[e._v("(-"+e._s(t.product_num-t.refund_num)+")")]):e._e()],1),0==e.orderInfo.order_type?r("v-uni-view",{staticClass:"y-money"},[e._v("￥"+e._s(t.cart_info.productAttr.ot_price))]):e._e()],1)],1)],1)})),1),r("v-uni-view",{staticClass:"public-total"},[e._v("共"+e._s(e.orderInfo.total_num)+"件商品，已支付"),r("span",{staticClass:"money"},[e._v("￥"+e._s(e.orderInfo.pay_price))]),e._v("( 邮费 ¥"+e._s(e.orderInfo.pay_postage)+")")]),r("v-uni-view",{staticClass:"wrapper"},[r("v-uni-view",{staticClass:"item acea-row row-between"},[r("v-uni-view",[e._v("订单编号：")]),r("v-uni-view",{staticClass:"conter acea-row row-middle row-right"},[e._v(e._s(e.orderInfo.order_sn)),r("v-uni-button",{staticClass:"copy copy-data",attrs:{"data-clipboard-text":e.orderInfo.order_sn}},[e._v("复制")])],1)],1),r("v-uni-view",{staticClass:"item acea-row row-between"},[r("v-uni-view",[e._v("下单时间：")]),r("v-uni-view",{staticClass:"conter"},[e._v(e._s(e.orderInfo.create_time))])],1),r("v-uni-view",{staticClass:"item acea-row row-between"},[r("v-uni-view",[e._v("支付状态：")]),r("v-uni-view",{staticClass:"conter"},[e._v(e._s(1==e.orderInfo.paid?"已支付":"未支付"))])],1),r("v-uni-view",{staticClass:"item acea-row row-between"},[r("v-uni-view",[e._v("支付方式：")]),r("v-uni-view",{staticClass:"conter"},[e._v(e._s(0==e.orderInfo.pay_type?"余额支付":1==e.orderInfo.pay_type||2==e.orderInfo.pay_type||3==e.orderInfo.pay_type?"微信支付":"支付宝支付"))])],1),r("v-uni-view",{staticClass:"item acea-row row-between"},[r("v-uni-view",[e._v("买家留言：")]),r("v-uni-view",{staticClass:"conter"},[e._v(e._s(e.orderInfo.mark))])],1)],1),1==e.orderInfo.is_virtual?r("v-uni-view",{staticClass:"wrapper"},e._l(e.orderInfo.order_extend,(function(t,o){return t&&o?r("v-uni-view",{key:o,staticClass:"item acea-row row-between"},[r("v-uni-view",[e._v(e._s(o)+"：")]),Array.isArray(t)?r("v-uni-view",{staticClass:"conter virtual_image"},e._l(t,(function(o,i){return r("v-uni-image",{key:i,staticClass:"picture",attrs:{src:o},on:{click:function(r){arguments[0]=r=e.$handleEvent(r),e.getPhotoClickIdx(t,i)}}})})),1):r("v-uni-view",{staticClass:"conter"},[e._v(e._s(t))])],1):e._e()})),1):e._e(),r("v-uni-view",{staticClass:"wrapper"},[r("v-uni-view",{staticClass:"item acea-row row-between"},[r("v-uni-view",[e._v("支付金额：")]),r("v-uni-view",{staticClass:"conter"},[e._v("￥"+e._s(e.orderInfo.total_price))])],1),e.orderInfo.coupon_price>0?r("v-uni-view",{staticClass:"item acea-row row-between"},[r("v-uni-view",[e._v("优惠券抵扣：")]),r("v-uni-view",{staticClass:"conter"},[e._v("-￥"+e._s(e.orderInfo.coupon_price))])],1):e._e(),e.orderInfo.integral_price>0?r("v-uni-view",{staticClass:"item acea-row row-between"},[r("v-uni-view",[e._v("积分抵扣：")]),r("v-uni-view",{staticClass:"conter"},[e._v("-￥"+e._s(e.orderInfo.integral_price))])],1):e._e(),e.orderInfo.pay_postage>0?r("v-uni-view",{staticClass:"item acea-row row-between"},[r("v-uni-view",[e._v("运费：")]),r("v-uni-view",{staticClass:"conter"},[e._v("￥"+e._s(e.orderInfo.pay_postage))])],1):e._e(),r("v-uni-view",{staticClass:"actualPay acea-row row-right"},[e._v("实付款："),r("span",{staticClass:"money font-color-red"},[e._v("￥"+e._s(e.orderInfo.pay_price))])])],1),"3"!=e.orderInfo.delivery_type&&0===e.orderInfo.order_type&&e.orderInfo.delivery_type?r("v-uni-view",{staticClass:"wrapper"},["6"!=e.orderInfo.delivery_type?r("v-uni-view",{staticClass:"item acea-row row-between"},[r("v-uni-view",[e._v("配送方式：")]),"1"===e.orderInfo.delivery_type||"4"===e.orderInfo.delivery_type?r("v-uni-view",{staticClass:"conter"},[e._v("快递")]):e._e(),"2"===e.orderInfo.delivery_type?r("v-uni-view",{staticClass:"conter"},[e._v("送货")]):e._e()],1):e._e(),r("v-uni-view",{staticClass:"item acea-row row-between"},["1"===e.orderInfo.delivery_type||"4"===e.orderInfo.delivery_type?r("v-uni-view",[e._v("快递公司：")]):e._e(),"2"===e.orderInfo.delivery_type?r("v-uni-view",[e._v("送货人：")]):e._e(),"6"===e.orderInfo.delivery_type?r("v-uni-view",[e._v("发货方式：")]):e._e(),r("v-uni-view",{staticClass:"conter line1"},[e._v(e._s(e.orderInfo.delivery_name?e.orderInfo.delivery_name:""))])],1),r("v-uni-view",{staticClass:"item acea-row row-between"},["1"===e.orderInfo.delivery_type||"4"===e.orderInfo.delivery_type?r("v-uni-view",[e._v("快递单号：")]):e._e(),"2"===e.orderInfo.delivery_type?r("v-uni-view",[e._v("送货人电话：")]):e._e(),"6"===e.orderInfo.delivery_type?r("v-uni-view",[e._v("卡密信息：")]):e._e(),r("v-uni-view",{staticClass:"conter",staticStyle:{display:"flex"}},[r("v-uni-text",[e._v(e._s(e.orderInfo.delivery_id?e.orderInfo.delivery_id:""))]),r("v-uni-text",{staticClass:"copy copy-data",attrs:{"data-clipboard-text":e.orderInfo.delivery_id}},[e._v("复制")])],1)],1)],1):e._e(),r("v-uni-view",{staticStyle:{height:"120upx"}}),"looks"!=e.goname?r("v-uni-view",{staticClass:"footer acea-row row-right row-middle"},[r("v-uni-view",{staticClass:"more"}),0==e.orderInfo.paid?r("v-uni-view",{staticClass:"bnt cancel",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.modify("0")}}},[e._v("一键改价")]):e._e(),-1==e.types?r("v-uni-view",{staticClass:"bnt cancel",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.modify("0")}}},[e._v("立即退款")]):e._e(),r("v-uni-view",{staticClass:"bnt cancel",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.modify("1")}}},[e._v("订单备注")]),"offline"===e.orderInfo.pay_type&&0===e.orderInfo.paid?r("v-uni-view",{staticClass:"bnt cancel",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.offlinePay.apply(void 0,arguments)}}},[e._v("确认付款")]):e._e(),1==e.orderInfo.paid&&0==e.orderInfo.status&&0==e.orderInfo.order_type?r("v-uni-navigator",{staticClass:"bnt delivery",attrs:{url:"/pages/admin/delivery/index?id="+e.orderInfo.order_id+"&merId="+e.mer_id}},[e._v("去发货")]):e._e(),1!=e.orderInfo.paid||0!=e.orderInfo.status&&9!=e.orderInfo.status||1!=e.orderInfo.order_type?e._e():r("v-uni-view",{staticClass:"bnt delivery",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.goCancellation.apply(void 0,arguments)}}},[e._v("去核销")])],1):e._e(),r("PriceChange",{attrs:{change:e.change,orderInfo:e.orderInfo,status:e.status},on:{closechange:function(t){arguments[0]=t=e.$handleEvent(t),e.changeclose(t)},savePrice:function(t){arguments[0]=t=e.$handleEvent(t),e.savePrice.apply(void 0,arguments)}}})],1)},i=[]},"4bb0":function(e,t,r){var o=r("24fb");t=o(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/*商户管理订单详情*/.pos-order-details .header[data-v-2c6e7d26]{background:linear-gradient(90deg,#2291f8 0,#1cd1dc);background:-webkit-linear-gradient(90deg,#2291f8 0,#1cd1dc);background:-moz-linear-gradient(to right,#2291f8 0,#1cd1dc 100%)}.pos-order-details .header .state[data-v-2c6e7d26]{font-size:%?36?%;color:#fff}.pos-order-details .header .data[data-v-2c6e7d26]{margin-left:%?35?%;font-size:%?28?%}.pos-order-details .header .data .order-num[data-v-2c6e7d26]{font-size:%?30?%;margin-bottom:%?8?%}.pos-order-details .remarks[data-v-2c6e7d26]{width:100%;height:%?86?%;background-color:#fff;padding:0 %?30?%}.pos-order-details .remarks .iconfont[data-v-2c6e7d26]{font-size:%?40?%;color:#2a7efb}.pos-order-details .remarks uni-input[data-v-2c6e7d26]{width:%?630?%;height:100%;font-size:%?30?%}.pos-order-details .remarks uni-input[data-v-2c6e7d26]::-webkit-input-placeholder{color:#666}.pos-order-details .remarks uni-input[data-v-2c6e7d26]::placeholder{color:#666}.pos-order-details .orderingUser[data-v-2c6e7d26]{font-size:%?26?%;color:#282828;padding:0 %?30?%;height:%?67?%;background-color:#fff;margin-top:%?16?%;border-bottom:1px solid #f5f5f5}.pos-order-details .orderingUser .iconfont[data-v-2c6e7d26]{font-size:%?40?%;color:#2a7efb;margin-right:%?15?%}.pos-order-details .address[data-v-2c6e7d26]{margin-top:0}.pos-order-details .pos-order-goods[data-v-2c6e7d26]{margin-top:%?17?%}.pos-order-details .footer .more[data-v-2c6e7d26]{font-size:%?27?%;color:#aaa;width:%?100?%;height:%?64?%;text-align:center;line-height:%?64?%;margin-right:%?25?%;position:relative}.pos-order-details .footer .delivery[data-v-2c6e7d26]{background:linear-gradient(90deg,#2291f8 0,#1cd1dc);background:-webkit-linear-gradient(90deg,#2291f8 0,#1cd1dc);background:-moz-linear-gradient(to right,#2291f8 0,#1cd1dc 100%)}.pos-order-details .footer .more .order .arrow[data-v-2c6e7d26]{width:0;height:0;border-left:%?11?% solid transparent;border-right:%?11?% solid transparent;border-top:%?20?% solid #e5e5e5;position:absolute;left:%?15?%;bottom:%?-18?%}.pos-order-details .footer .more .order .arrow[data-v-2c6e7d26]:before{content:"";width:0;height:0;border-left:%?9?% solid transparent;border-right:%?9?% solid transparent;border-top:%?19?% solid #fff;position:absolute;left:%?-10?%;bottom:0}.pos-order-details .footer .more .order[data-v-2c6e7d26]{width:%?200?%;background-color:#fff;border:1px solid #eee;border-radius:%?10?%;position:absolute;top:%?-200?%;z-index:9}.pos-order-details .footer .more .order .item[data-v-2c6e7d26]{height:%?77?%;line-height:%?77?%}.pos-order-details .footer .more .order .item ~ .item[data-v-2c6e7d26]{border-top:1px solid #f5f5f5}.pos-order-details .footer .more .moreName[data-v-2c6e7d26]{width:100%;height:100%}\n/*订单详情*/.order-details .header[data-v-2c6e7d26]{padding:0 %?30?%;height:%?150?%}.order-details .header.on[data-v-2c6e7d26]{background-color:#666!important}.order-details .header .pictrue[data-v-2c6e7d26]{width:%?110?%;height:%?110?%}.order-details .header .pictrue uni-image[data-v-2c6e7d26]{width:100%;height:100%}.order-details .header .data[data-v-2c6e7d26]{color:hsla(0,0%,100%,.8);font-size:%?24?%;margin-left:%?27?%}.order-details .header.on .data[data-v-2c6e7d26]{margin-left:0}.order-details .header .data .state[data-v-2c6e7d26]{font-size:%?30?%;font-weight:700;color:#fff;margin-bottom:%?7?%}\n/* .order-details .header .data .time{margin-left:20upx;} */.order-details .nav[data-v-2c6e7d26]{background-color:#fff;font-size:%?26?%;color:#282828;padding:%?25?% 0}.order-details .nav .navCon[data-v-2c6e7d26]{padding:0 %?40?%}.order-details .nav .navCon .on[data-v-2c6e7d26]{font-weight:700;color:#e93323}.order-details .nav .progress[data-v-2c6e7d26]{padding:0 %?65?%;margin-top:%?10?%}.order-details .nav .progress .line[data-v-2c6e7d26]{width:%?100?%;height:%?2?%;background-color:#939390}.order-details .nav .progress .iconfont[data-v-2c6e7d26]{font-size:%?25?%;color:#939390;margin-top:%?-2?%;width:%?30?%;height:%?30?%;line-height:%?33?%;text-align:center;margin-right:0!important}.order-details .address[data-v-2c6e7d26]{font-size:%?26?%;color:#868686;background-color:#fff;padding:%?25?% %?30?% %?30?% %?30?%;position:relative}.order-details .address .name[data-v-2c6e7d26]{font-size:%?30?%;color:#282828;margin-bottom:.1rem}.order-details .address .name .phone[data-v-2c6e7d26]{margin-left:%?40?%}.order-details .line[data-v-2c6e7d26]{width:100%;height:%?3?%}.order-details .line uni-image[data-v-2c6e7d26]{width:100%;height:100%;display:block}.order-details .wrapper[data-v-2c6e7d26]{background-color:#fff;margin-top:%?12?%;padding:%?30?%}.order-details .wrapper .item[data-v-2c6e7d26]{font-size:%?28?%;color:#282828}.order-details .wrapper .item ~ .item[data-v-2c6e7d26]{margin-top:%?20?%}.order-details .wrapper .item .conter[data-v-2c6e7d26]{color:#868686;text-align:right;max-width:%?450?%}.order-details .wrapper .item .virtual_image[data-v-2c6e7d26]{margin-left:%?50?%}.order-details .wrapper .item .virtual_image .picture[data-v-2c6e7d26]{width:%?106?%;height:%?106?%;border-radius:%?8?%;margin-right:%?10?%}.order-details .wrapper .item .virtual_image .picture[data-v-2c6e7d26]:last-child{margin-right:0}.order-details .wrapper .item .conter .copy[data-v-2c6e7d26]{font-size:%?20?%;color:#868686;border-radius:%?3?%;border:1px solid #868686;padding:%?0?% %?15?%;margin-left:%?24?%;height:%?40?%;display:flex;align-items:center;justify-content:center;border-radius:%?16?%}.address .copy[data-v-2c6e7d26]{font-size:%?20?%;color:#868686;border-radius:%?3?%;border:1px solid #868686;padding:%?0?% %?15?%;height:%?40?%;display:flex;align-items:center;justify-content:center;border-radius:%?16?%;position:absolute;right:%?30?%;top:%?20?%}.order-details .wrapper .actualPay[data-v-2c6e7d26]{border-top:%?1?% solid #eee;margin-top:%?30?%;padding-top:%?30?%}.order-details .wrapper .actualPay .money[data-v-2c6e7d26]{font-weight:700;font-size:%?30?%}.order-details .footer[data-v-2c6e7d26]{width:100%;height:%?100?%;position:fixed;bottom:0;left:0;background-color:#fff;padding:0 %?30?%;border-top:1px solid #eee}.order-details .footer .bnt[data-v-2c6e7d26]{width:auto;height:%?60?%;line-height:%?60?%;text-align:center;line-height:upx;border-radius:%?50?%;color:#fff;font-size:%?27?%;padding:0 3%}.order-details .footer .bnt.cancel[data-v-2c6e7d26]{color:#aaa;border:1px solid #ddd}.order-details .footer .bnt.default[data-v-2c6e7d26]{color:#444;border:1px solid #444}.order-details .footer .bnt ~ .bnt[data-v-2c6e7d26]{margin-left:%?18?%}.pos-order-goods[data-v-2c6e7d26]{padding:0 %?30?%;background-color:#fff;position:relative}.pos-order-goods .goods[data-v-2c6e7d26]{padding:%?20?% 0;overflow:hidden}.pos-order-goods .goods ~ .goods[data-v-2c6e7d26]{border-top:1px dashed #e5e5e5}.pos-order-goods .goods .picTxt[data-v-2c6e7d26]{width:%?515?%}.pos-order-goods .goods .picTxt .pictrue[data-v-2c6e7d26]{width:%?130?%;height:%?130?%}.pos-order-goods .goods .picTxt .pictrue uni-image[data-v-2c6e7d26]{width:100%;height:100%;border-radius:%?6?%}.pos-order-goods .goods .picTxt .text[data-v-2c6e7d26]{width:%?365?%;height:%?130?%}.pos-order-goods .goods .picTxt .text .info[data-v-2c6e7d26]{font-size:%?28?%;color:#282828}.pos-order-goods .goods .picTxt .text .attr[data-v-2c6e7d26]{font-size:%?24?%;color:#999}.pos-order-goods .goods .money[data-v-2c6e7d26]{width:%?164?%;text-align:right;font-size:%?28?%}.pos-order-goods .goods .money .refund_num[data-v-2c6e7d26]{display:inline-block;margin-left:%?10?%}.pos-order-goods .goods .money .x-money[data-v-2c6e7d26]{color:#282828}.pos-order-goods .goods .money .num[data-v-2c6e7d26]{color:#ff9600;margin:%?5?% 0}.pos-order-goods .goods .money .y-money[data-v-2c6e7d26]{color:#999;text-decoration:line-through}.pos-order-goods .cancellate[data-v-2c6e7d26]{font-size:%?24?%;float:right;margin-top:%?10?%}.pos-order-goods .cancellate uni-text[data-v-2c6e7d26]{margin-left:%?26?%}.pos-order-goods .cancelled[data-v-2c6e7d26]{color:#ff9600}.pos-order-goods .goods .uncancell[data-v-2c6e7d26]{color:#999}.public-total[data-v-2c6e7d26]{font-size:%?28?%;color:#282828;border-top:1px solid #eee;height:%?92?%;line-height:%?92?%;text-align:right;padding:0 %?30?%;background-color:#fff}.public-total .money[data-v-2c6e7d26]{color:#ff4c3c}',""]),e.exports=t},"892e":function(e,t,r){"use strict";r("7a82");var o=r("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(r("c7eb")),a=o(r("1da1"));r("d81d"),r("99af"),r("a9e3");var d=o(r("71d4")),n=o(r("43a2")),s=r("316e"),c=r("5a7e"),l=r("f26a"),v={name:"AdminOrder",components:{PriceChange:d.default},props:{},data:function(){return{order:!1,change:!1,order_id:"",mer_id:"",orderInfo:{_status:{},user:{}},domain:l.HTTP_REQUEST_URL,status:"",title:"",payType:"",types:"",clickNum:1,goname:""}},watch:{"$route.params.oid":function(e){void 0!=e&&(this.order_id=e,this.getIndex())}},onLoad:function(e){var t=this;this.order_id=e.id,this.mer_id=e.mer_id,this.goname=e.goname,this.getIndex(),this.$nextTick((function(){var e=new n.default(".copy-data");e.on("success",(function(e){t.$util.Tips({title:"复制成功"})})),e.on("error",(function(e){t.$util.Tips({title:"复制失败"})}))}))},methods:{more:function(){this.order=!this.order},modify:function(e){this.change=!0,this.status=e},changeclose:function(e){this.change=e},getPhotoClickIdx:function(e,t){uni.previewImage({current:e[t],urls:e})},copyText:function(e){var t=[{name:"收货人姓名",value:this.orderInfo.real_name},{name:"收货人电话",value:this.orderInfo.user_phone},{name:"收货人地址",value:this.orderInfo.user_address}];wx.setClipboardData({data:"".concat(t.map((function(e){return"".concat(e.name,": ").concat(e.value)})).join("\n")),success:function(e){wx.getClipboardData({success:function(e){wx.showToast({title:"复制成功"})}})}})},getIndex:function(){var e=this;(0,s.getAdminOrderDetail)(e.mer_id,e.order_id).then((function(t){e.orderInfo=t.data}),(function(t){e.$util.Tips({title:t},{tab:3,url:1})}))},goCancellation:function(){uni.navigateTo({url:"/pages/admin/cancellate_result/index?mer_id="+this.mer_id+"&code="+this.orderInfo.verify_code})},savePrice:function(e){var t=this;return(0,a.default)((0,i.default)().mark((function r(){var o,a,d,n,l,v,u;return(0,i.default)().wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(o=t,a={},d=e.price,n=e.refund_price,l=o.orderInfo.refund_status,v=e.remark,a.order_id=o.orderInfo.order_id,0!=o.status){r.next=8;break}a.price=d,u={pay_postage:e.orderInfo.pay_postage,coupon_price:e.orderInfo.coupon_price,total_price:Number(e.orderInfo.total_price)},(0,s.setAdminOrderPrice)(o.mer_id,a.order_id,u).then((function(e){o.change=!1,o.$util.Tips({title:"改价成功",icon:"success"}),o.getIndex()}),(function(e){o.change=!1,o.$util.Tips({title:e})})),r.next=20;break;case 8:if(0!=o.status||1!==l){r.next=16;break}if((0,c.isMoney)(n)){r.next=11;break}return r.abrupt("return",o.$util.Tips({title:"请输入正确的金额"}));case 11:a.price=n,a.type=e.type,(0,s.setOrderRefund)(o.mer_id,a).then((function(e){o.change=!1,o.$util.Tips({title:e.message}),o.getIndex()}),(function(e){o.change=!1,o.$util.Tips({title:e})})),r.next=20;break;case 16:if(v){r.next=18;break}return r.abrupt("return",t.$util.Tips({title:"请输入备注"}));case 18:(0,s.setAdminOrderRemark)(o.mer_id,a.order_id,{remark:v}).then((function(e){o.change=!1,t.$util.Tips({title:e.message,icon:"success"}),o.getIndex()}),(function(e){o.change=!1,o.$util.Tips({title:e})}));case 20:case"end":return r.stop()}}),r)})))()},offlinePay:function(){var e=this;(0,s.setOfflinePay)(this.mer_id,{order_id:this.orderInfo.order_id}).then((function(t){e.$util.Tips({title:t.msg,icon:"success"}),e.getIndex()}),(function(t){e.$util.Tips({title:t})}))},copyNum:function(e){uni.setClipboardData({data:e,success:function(){}})},copyData:function(e){uni.setClipboardData({data:e,success:function(){}})},webCopy:function(e,t){var r=e,o=t;1==this.clickNum&&(this.clickNum+=1,this.webCopy(r,o))}}};t.default=v},a177:function(e,t,r){"use strict";var o=r("2b73"),i=r.n(o);i.a},bf94:function(e,t,r){"use strict";r.r(t);var o=r("33c7"),i=r("11f7");for(var a in i)["default"].indexOf(a)<0&&function(e){r.d(t,e,(function(){return i[e]}))}(a);r("a177");var d=r("f0c5"),n=Object(d["a"])(i["default"],o["b"],o["c"],!1,null,"2c6e7d26",null,!1,o["a"],void 0);t["default"]=n.exports}}]);