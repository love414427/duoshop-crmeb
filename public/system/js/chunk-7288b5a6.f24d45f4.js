(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7288b5a6"],{"57cd":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"divBox"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("div",{staticClass:"container"},[a("el-form",{attrs:{size:"small","label-width":"100px",inline:""}},[a("el-form-item",{attrs:{label:"时间选择："}},[a("el-radio-group",{staticClass:"mr20",attrs:{type:"button",size:"small",clearable:""},on:{change:function(e){return t.selectChange(t.tableFrom.date)}},model:{value:t.tableFrom.date,callback:function(e){t.$set(t.tableFrom,"date",e)},expression:"tableFrom.date"}},t._l(t.fromList.fromTxt,(function(e,n){return a("el-radio-button",{key:n,attrs:{label:e.val}},[t._v(t._s(e.text))])})),1),t._v(" "),a("el-date-picker",{staticStyle:{width:"250px"},attrs:{"value-format":"yyyy/MM/dd",format:"yyyy/MM/dd",size:"small",type:"daterange",placement:"bottom-end",placeholder:"自定义时间",clearable:""},on:{change:t.onchangeTime},model:{value:t.timeVal,callback:function(e){t.timeVal=e},expression:"timeVal"}})],1),t._v(" "),a("div",[a("el-form-item",{attrs:{label:"配送订单号"}},[a("el-input",{staticClass:"selWidth",attrs:{placeholder:"请输入订单号",size:"small"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.getList(1)}},model:{value:t.tableFrom.keyword,callback:function(e){t.$set(t.tableFrom,"keyword",e)},expression:"tableFrom.keyword"}},[a("el-button",{staticClass:"el-button-solt",attrs:{slot:"append",icon:"el-icon-search",size:"small"},on:{click:function(e){return t.getList(1)}},slot:"append"})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"订单号"}},[a("el-input",{staticClass:"selWidth",attrs:{placeholder:"请输入订单号",size:"small"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.getList(1)}},model:{value:t.tableFrom.order_sn,callback:function(e){t.$set(t.tableFrom,"order_sn",e)},expression:"tableFrom.order_sn"}},[a("el-button",{staticClass:"el-button-solt",attrs:{slot:"append",icon:"el-icon-search",size:"small"},on:{click:function(e){return t.getList(1)}},slot:"append"})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"商户名称："}},[a("el-select",{staticClass:"selWidth",attrs:{clearable:"",filterable:"",placeholder:"请选择"},on:{change:function(e){return t.getList(1)}},model:{value:t.tableFrom.mer_id,callback:function(e){t.$set(t.tableFrom,"mer_id",e)},expression:"tableFrom.mer_id"}},t._l(t.merSelect,(function(t){return a("el-option",{key:t.mer_id,attrs:{label:t.mer_name,value:t.mer_id}})})),1)],1),t._v(" "),a("el-form-item",{staticClass:"width100",attrs:{label:"状态："}},[a("el-select",{staticClass:"filter-item selWidth mr20",attrs:{placeholder:"请选择",clearable:""},on:{change:function(e){return t.getList(1)}},model:{value:t.tableFrom.status,callback:function(e){t.$set(t.tableFrom,"status",e)},expression:"tableFrom.status"}},t._l(t.statusList,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),t._v(" "),a("el-form-item",{staticClass:"width100",attrs:{label:"配送平台："}},[a("el-select",{staticClass:"filter-item selWidth mr20",attrs:{placeholder:"请选择",clearable:""},on:{change:function(e){return t.getList(1)}},model:{value:t.tableFrom.station_type,callback:function(e){t.$set(t.tableFrom,"station_type",e)},expression:"tableFrom.station_type"}},[a("el-option",{attrs:{label:"UU",value:"2"}}),t._v(" "),a("el-option",{attrs:{label:"达达",value:"1"}})],1)],1)],1)],1)],1)]),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData.data,size:"mini"}},[a("el-table-column",{attrs:{label:"序号","min-width":"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.$index+(t.tableFrom.page-1)*t.tableFrom.limit+1))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"merchant.mer_name",label:"商户名称","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{label:"配送平台","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(" "+t._s(1==e.row.station_type?"达达":"UU"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"station.station_name",label:"发货点名称","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"order_sn",label:"配送订单号","min-width":"60"}}),t._v(" "),a("el-table-column",{attrs:{prop:"storeOrder.order_sn",label:"订单号","min-width":"60"}}),t._v(" "),a("el-table-column",{attrs:{label:"配送起点","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(e.row.station&&e.row.station.station_address))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"配送终点","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(" "+t._s(e.row.to_address))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"状态","min-width":"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(" "+t._s(t._f("runErrandStatus")(e.row.status)))]),t._v(" "),-1==e.row.status&&e.row.reason?a("span",{staticStyle:{display:"block","font-size":"12px",color:"red"}},[t._v("原因: "+t._s(e.row.reason))]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"distance",label:"配送距离","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fee",label:"配送费用","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"create_time",label:"消费时间","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"mark",label:"备注","min-width":"100"}})],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":t.tableFrom.limit,"current-page":t.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.total},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)],1)],1)},l=[],r=a("f8b7"),o=a("c4c8"),i={components:{},data:function(){return{tableData:{data:[],total:0},listLoading:!0,loading:!0,tableFrom:{keyword:"",order_sn:"",date:"",station_type:"",mer_id:"",status:"",page:1,limit:20},timeVal:[],merSelect:[],fromList:{title:"选择时间",custom:!0,fromTxt:[{text:"全部",val:""},{text:"今天",val:"today"},{text:"昨天",val:"yesterday"},{text:"最近7天",val:"lately7"},{text:"最近30天",val:"lately30"},{text:"本月",val:"month"},{text:"本年",val:"year"}]},storeList:[],statusList:[{label:"已取消",value:"-1"},{label:"待接单",value:"0"},{label:"待取货",value:"2"},{label:"配送中",value:"3"},{label:"已完成",value:"4"},{label:"物品返回中",value:"9"},{label:"物品返回完成",value:"10"},{label:"骑士到店",value:"100"}]}},mounted:function(){this.getList(1),this.getMerSelect()},methods:{selectChange:function(t){this.tableFrom.date=t,this.timeVal=[],this.getList(1)},onchangeTime:function(t){this.timeVal=t,this.tableFrom.date=t?this.timeVal.join("-"):"",this.getList(1)},getStoreList:function(){var t=this;getStoreLst(this.tableFrom).then((function(e){t.storeList=e.data})).catch((function(e){t.$message.error(e.message)}))},getMerSelect:function(){var t=this;Object(o["Q"])().then((function(e){t.merSelect=e.data})).catch((function(e){t.$message.error(e.message)}))},getList:function(t){var e=this;this.listLoading=!0,this.tableFrom.page=t||this.tableFrom.page,Object(r["d"])(this.tableFrom).then((function(t){e.tableData.data=t.data.list,e.tableData.total=t.data.count,e.listLoading=!1})).catch((function(t){e.$message.error(t.message),e.listLoading=!1}))},pageChange:function(t){this.tableFrom.page=t,this.getList("")},handleSizeChange:function(t){this.tableFrom.limit=t,this.getList("")},toCancle:function(t){var e=this;this.$modalForm(Object(r["c"])(t)).then((function(){return e.getList("")}))},onDetails:function(t){}}},s=i,c=a("2877"),u=Object(c["a"])(s,n,l,!1,null,"e2d12306",null);e["default"]=u.exports},f8b7:function(t,e,a){"use strict";a.d(e,"n",(function(){return l})),a.d(e,"b",(function(){return r})),a.d(e,"a",(function(){return o})),a.d(e,"p",(function(){return i})),a.d(e,"l",(function(){return s})),a.d(e,"m",(function(){return c})),a.d(e,"o",(function(){return u})),a.d(e,"t",(function(){return d})),a.d(e,"i",(function(){return m})),a.d(e,"j",(function(){return f})),a.d(e,"g",(function(){return b})),a.d(e,"h",(function(){return p})),a.d(e,"f",(function(){return h})),a.d(e,"v",(function(){return v})),a.d(e,"w",(function(){return g})),a.d(e,"u",(function(){return _})),a.d(e,"e",(function(){return y})),a.d(e,"d",(function(){return k})),a.d(e,"c",(function(){return w})),a.d(e,"s",(function(){return x})),a.d(e,"r",(function(){return F})),a.d(e,"q",(function(){return L}));var n=a("0c6d");function l(t){return n["a"].get("order/lst",t)}function r(){return n["a"].get("order/chart")}function o(t){return n["a"].get("order/title",t)}function i(t){return n["a"].get("store/order/update/".concat(t,"/form"))}function s(t){return n["a"].get("store/order/delivery/".concat(t,"/form"))}function c(t){return n["a"].get("order/detail/".concat(t))}function u(t,e){return n["a"].get("order/status/".concat(t),e)}function d(t){return n["a"].get("order/refund/lst",t)}function m(t){return n["a"].get("order/children/".concat(t))}function f(t){return n["a"].get("order/express/".concat(t))}function b(t){return n["a"].get("order/excel",t)}function p(t){return n["a"].get("order/refund/excel",t)}function h(t){return n["a"].get("excel/lst",t)}function v(){return n["a"].get("order/takechart")}function g(t){return n["a"].get("order/takelst",t)}function _(t){return n["a"].get("order/take_title",t)}function y(){return n["a"].get("excel/type")}function k(t){return n["a"].get("delivery/order/lst",t)}function w(t){return n["a"].get("delivery/order/cancel/".concat(t,"/form"))}function x(t){return n["a"].get("delivery/station/payLst",t)}function F(){return n["a"].get("delivery/title")}function L(){return n["a"].get("delivery/belence")}}}]);