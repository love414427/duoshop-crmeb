(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0174d93c"],{"43b5":function(t,e,r){},5112:function(t,e,r){"use strict";r("43b5")},e08e:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"divBox"},[r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("div",{staticClass:"container"},[r("el-form",{attrs:{size:"small","label-width":"100px"}},[r("el-form-item",{staticClass:"width100",attrs:{label:"核销时间："}},[r("el-radio-group",{staticClass:"mr20",attrs:{type:"button",size:"small",clearable:""},on:{change:function(e){return t.selectChange(t.tableFrom.date)}},model:{value:t.tableFrom.date,callback:function(e){t.$set(t.tableFrom,"date",e)},expression:"tableFrom.date"}},t._l(t.fromList.fromTxt,(function(e,n){return r("el-radio-button",{key:n,attrs:{label:e.val}},[t._v(t._s(e.text))])})),1),t._v(" "),r("el-date-picker",{staticStyle:{width:"250px"},attrs:{"value-format":"yyyy/MM/dd",format:"yyyy/MM/dd",size:"small",type:"daterange",placement:"bottom-end",placeholder:"自定义时间",clearable:""},on:{change:t.onchangeTime},model:{value:t.timeVal,callback:function(e){t.timeVal=e},expression:"timeVal"}})],1),t._v(" "),r("el-form-item",{staticClass:"width100",attrs:{label:"订单号："}},[r("el-input",{staticClass:"selWidth",attrs:{placeholder:"请输入订单号/收货人/联系方式",size:"small",clearable:""},nativeOn:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.getList(1),t.getCardList()}},model:{value:t.tableFrom.keywords,callback:function(e){t.$set(t.tableFrom,"keywords",e)},expression:"tableFrom.keywords"}},[r("el-button",{staticClass:"el-button-solt",attrs:{slot:"append",icon:"el-icon-search",size:"small"},on:{click:function(e){t.getList(1),t.getCardList()}},slot:"append"})],1)],1),t._v(" "),r("el-form-item",{staticClass:"width100",attrs:{label:"用户信息："}},[r("el-input",{staticClass:"selWidth",attrs:{placeholder:"请输入用户信息/联系电话",size:"small"},nativeOn:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.getList(1),t.getCardList()}},model:{value:t.tableFrom.username,callback:function(e){t.$set(t.tableFrom,"username",e)},expression:"tableFrom.username"}},[r("el-button",{staticClass:"el-button-solt",attrs:{slot:"append",icon:"el-icon-search",size:"small"},on:{click:function(e){t.getList(1),t.getCardList()}},slot:"append"})],1)],1)],1)],1),t._v(" "),r("cards-data",{attrs:{"card-lists":t.cardLists}})],1),t._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticClass:"table",staticStyle:{width:"100%"},attrs:{data:t.tableData.data,size:"mini","highlight-current-row":""}},[r("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[r("el-form-item",{attrs:{label:"商品总价："}},[r("span",[t._v(t._s(t._f("filterEmpty")(e.row.total_price)))])]),t._v(" "),r("el-form-item",{attrs:{label:"下单时间："}},[r("span",[t._v(t._s(t._f("filterEmpty")(e.row.create_time)))])]),t._v(" "),r("el-form-item",{attrs:{label:"用户备注："}},[r("span",[t._v(t._s(t._f("filterEmpty")(e.row.mark)))])]),t._v(" "),r("el-form-item",{attrs:{label:"商家备注："}},[r("span",[t._v(t._s(t._f("filterEmpty")(e.row.remark)))])])],1)]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"订单编号","min-width":"170"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",{staticStyle:{display:"block"},domProps:{textContent:t._s(e.row.order_sn)}}),t._v(" "),r("span",{directives:[{name:"show",rawName:"v-show",value:e.row.is_del>0,expression:"scope.row.is_del > 0"}],staticStyle:{color:"#ED4014",display:"block"}},[t._v("用户已删除")])]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"订单类型","min-width":"170"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",[t._v(t._s(0==e.row.order_type?"普通订单":"核销订单"))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"real_name",label:"收货人","min-width":"130"}}),t._v(" "),r("el-table-column",{attrs:{label:"商品信息","min-width":"330"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.orderProduct,(function(e,n){return r("div",{key:n,staticClass:"tabBox acea-row row-middle"},[r("div",{staticClass:"demo-image__preview"},[r("el-image",{attrs:{src:e.cart_info.product.image,"preview-src-list":[e.cart_info.product.image]}})],1),t._v(" "),r("span",{staticClass:"tabBox_tit"},[t._v(t._s(e.cart_info.product.store_name+" | ")+t._s(e.cart_info.productAttr.sku))]),t._v(" "),r("span",{staticClass:"tabBox_pice"},[t._v(t._s("￥"+e.cart_info.productAttr.price+" x "+e.product_num))])])}))}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"pay_price",label:"实际支付","min-width":"100"}}),t._v(" "),r("el-table-column",{attrs:{prop:"pay_price",label:"核销员","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.paid?r("span",[t._v(t._s(e.row.verifyService?e.row.verifyService.nickname:"管理员核销"))]):t._e()]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"serviceScore",label:"核销状态","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",[t._v(t._s(-1==e.row.status?"已退款":"已核销"))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"verify_time",label:"核销时间","min-width":"150"}})],1),t._v(" "),r("div",{staticClass:"block"},[r("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":t.tableFrom.limit,"current-page":t.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.total},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)],1),t._v(" "),r("file-list",{ref:"exportList"})],1)},a=[],o=r("f8b7"),i=r("30dc"),s=r("0f56"),c={components:{cardsData:s["a"],fileList:i["a"]},data:function(){return{orderId:0,tableData:{data:[],total:0},listLoading:!0,tableFrom:{order_sn:"",status:"",date:"",page:1,limit:20,type:"4",order_type:"1",username:"",keywords:""},orderChartType:{},timeVal:[],fromList:{title:"选择时间",custom:!0,fromTxt:[{text:"全部",val:""},{text:"今天",val:"today"},{text:"昨天",val:"yesterday"},{text:"最近7天",val:"lately7"},{text:"最近30天",val:"lately30"},{text:"本月",val:"month"},{text:"本年",val:"year"}]},selectionList:[],ids:"",tableFromLog:{page:1,limit:10},tableDataLog:{data:[],total:0},LogLoading:!1,dialogVisible:!1,fileVisible:!1,cardLists:[],orderDatalist:null,headeNum:[{type:1,name:"全部",count:10},{type:2,name:"普通订单",count:3},{type:3,name:"直播订单",count:1},{type:4,name:"核销订单",count:2},{type:5,name:"拼团订单",count:0},{type:6,name:"秒杀订单",count:6},{type:7,name:"砍价订单",count:5}]}},mounted:function(){this.headerList(),this.getCardList(),this.getList(1)},methods:{exportOrder:function(){var t=this;Object(o["n"])({status:this.tableFrom.status,date:this.tableFrom.date,take_order:1}).then((function(e){var r=t.$createElement;t.$msgbox({title:"提示",message:r("p",null,[r("span",null,'文件正在生成中，请稍后点击"'),r("span",{style:"color: teal"},"导出记录"),r("span",null,'"查看~ ')]),confirmButtonText:"我知道了"}).then((function(t){}))})).catch((function(e){t.$message.error(e.message)}))},getExportFileList:function(){this.fileVisible=!0,this.$refs.exportList.exportFileList("order")},pageChangeLog:function(t){this.tableFromLog.page=t,this.getList("")},handleSizeChangeLog:function(t){this.tableFromLog.limit=t,this.getList("")},handleSelectionChange:function(t){this.selectionList=t;var e=[];this.selectionList.map((function(t){e.push(t.id)})),this.ids=e.join(",")},selectChange:function(t){this.timeVal=[],this.tableFrom.date=t,this.getCardList(),this.getList(1)},onchangeTime:function(t){this.timeVal=t,this.tableFrom.date=t?this.timeVal.join("-"):"",this.getCardList(),this.getList(1)},getList:function(t){var e=this;this.listLoading=!0,this.tableFrom.page=t||this.tableFrom.page,Object(o["ab"])(this.tableFrom).then((function(t){e.tableData.data=t.data.list,e.tableData.total=t.data.count,e.listLoading=!1})).catch((function(t){e.$message.error(t.message),e.listLoading=!1}))},getCardList:function(){var t=this;Object(o["Y"])(this.tableFrom).then((function(e){t.cardLists=e.data})).catch((function(e){t.$message.error(e.message)}))},pageChange:function(t){this.tableFrom.page=t,this.getList("")},handleSizeChange:function(t){this.tableFrom.limit=t,this.getList("")},headerList:function(){var t=this;Object(o["Z"])().then((function(e){t.orderChartType=e.data})).catch((function(e){t.$message.error(e.message)}))}}},u=c,l=(r("5112"),r("2877")),d=Object(l["a"])(u,n,a,!1,null,"8d07c3ca",null);e["default"]=d.exports},f8b7:function(t,e,r){"use strict";r.d(e,"I",(function(){return a})),r.d(e,"c",(function(){return o})),r.d(e,"b",(function(){return i})),r.d(e,"M",(function(){return s})),r.d(e,"F",(function(){return c})),r.d(e,"G",(function(){return u})),r.d(e,"q",(function(){return l})),r.d(e,"J",(function(){return d})),r.d(e,"L",(function(){return f})),r.d(e,"E",(function(){return p})),r.d(e,"K",(function(){return m})),r.d(e,"T",(function(){return g})),r.d(e,"R",(function(){return h})),r.d(e,"W",(function(){return b})),r.d(e,"V",(function(){return v})),r.d(e,"U",(function(){return _})),r.d(e,"Q",(function(){return y})),r.d(e,"e",(function(){return L})),r.d(e,"t",(function(){return x})),r.d(e,"S",(function(){return w})),r.d(e,"n",(function(){return k})),r.d(e,"m",(function(){return C})),r.d(e,"l",(function(){return F})),r.d(e,"k",(function(){return S})),r.d(e,"D",(function(){return z})),r.d(e,"x",(function(){return E})),r.d(e,"H",(function(){return O})),r.d(e,"Z",(function(){return V})),r.d(e,"ab",(function(){return $})),r.d(e,"Y",(function(){return D})),r.d(e,"B",(function(){return j})),r.d(e,"A",(function(){return T})),r.d(e,"y",(function(){return B})),r.d(e,"z",(function(){return M})),r.d(e,"C",(function(){return N})),r.d(e,"j",(function(){return A})),r.d(e,"h",(function(){return J})),r.d(e,"i",(function(){return P})),r.d(e,"P",(function(){return W})),r.d(e,"p",(function(){return I})),r.d(e,"o",(function(){return Y})),r.d(e,"a",(function(){return Z})),r.d(e,"s",(function(){return q})),r.d(e,"w",(function(){return G})),r.d(e,"r",(function(){return H})),r.d(e,"g",(function(){return K})),r.d(e,"f",(function(){return Q})),r.d(e,"O",(function(){return R})),r.d(e,"N",(function(){return U})),r.d(e,"v",(function(){return X})),r.d(e,"u",(function(){return tt})),r.d(e,"X",(function(){return et})),r.d(e,"d",(function(){return rt}));var n=r("0c6d");function a(t){return n["a"].get("store/order/lst",t)}function o(){return n["a"].get("store/order/chart")}function i(t){return n["a"].get("store/order/title",t)}function s(t,e){return n["a"].post("store/order/update/".concat(t),e)}function c(t,e){return n["a"].post("store/order/delivery/".concat(t),e)}function u(t){return n["a"].get("store/order/detail/".concat(t))}function l(t){return n["a"].get("store/order/children/".concat(t))}function d(t,e){return n["a"].get("store/order/log/".concat(t),e)}function f(t){return n["a"].get("store/order/remark/".concat(t,"/form"))}function p(t){return n["a"].post("store/order/delete/".concat(t))}function m(t){return n["a"].get("store/order/printer/".concat(t))}function g(t){return n["a"].get("store/refundorder/lst",t)}function h(t){return n["a"].get("store/refundorder/detail/".concat(t))}function b(t){return n["a"].get("store/refundorder/status/".concat(t,"/form"))}function v(t){return n["a"].get("store/refundorder/mark/".concat(t,"/form"))}function _(t){return n["a"].get("store/refundorder/log/".concat(t))}function y(t){return n["a"].get("store/refundorder/delete/".concat(t))}function L(t){return n["a"].post("store/refundorder/refund/".concat(t))}function x(t){return n["a"].get("store/order/express/".concat(t))}function w(t){return n["a"].get("store/refundorder/express/".concat(t))}function k(t){return n["a"].get("store/order/excel",t)}function C(t){return n["a"].get("store/order/delivery_export",t)}function F(t){return n["a"].get("excel/lst",t)}function S(t){return n["a"].get("excel/download/".concat(t))}function z(t){return n["a"].get("store/order/verify/".concat(t))}function E(t,e){return n["a"].post("store/order/verify/".concat(t),e)}function O(){return n["a"].get("store/order/filtter")}function V(){return n["a"].get("store/order/takechart")}function $(t){return n["a"].get("store/order/takelst",t)}function D(t){return n["a"].get("store/order/take_title",t)}function j(t){return n["a"].get("store/receipt/lst",t)}function T(t){return n["a"].get("store/receipt/set_recipt",t)}function B(t){return n["a"].post("store/receipt/save_recipt",t)}function M(t){return n["a"].get("store/receipt/detail/".concat(t))}function N(t,e){return n["a"].post("store/receipt/update/".concat(t),e)}function A(t){return n["a"].get("store/import/lst",t)}function J(t,e){return n["a"].get("store/import/detail/".concat(t),e)}function P(t,e){return n["a"].get("store/import/excel/".concat(t),e)}function W(t){return n["a"].get("store/refundorder/excel",t)}function I(){return n["a"].get("expr/options")}function Y(t){return n["a"].get("expr/temps",t)}function Z(t){return n["a"].post("store/order/delivery_batch",t)}function q(){return n["a"].get("serve/config")}function G(){return n["a"].get("delivery/station/select")}function H(){return n["a"].get("delivery/station/options")}function K(t){return n["a"].get("delivery/order/lst",t)}function Q(t){return n["a"].get("delivery/order/cancel/".concat(t,"/form"))}function R(t){return n["a"].get("delivery/station/payLst",t)}function U(t){return n["a"].get("delivery/station/code",t)}function X(t){return n["a"].get("store/refundorder/check/".concat(t))}function tt(){return n["a"].get("store/refundorder/refund_message")}function et(t){return n["a"].post("store/refundorder/create",t)}function rt(t){return n["a"].post("store/refundorder/compute",t)}}}]);