(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f1874498"],{"2e83":function(t,e,r){"use strict";r.d(e,"a",(function(){return l}));r("28a5");var n=r("8122"),a=r("e8ae"),o=r.n(a),i=r("21a6");function l(t,e,r,a,l,s){var c,u=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],d=1,m=new o.a.Workbook,g=t.length;function p(t){var e=Array.isArray(t)?t[0]:t,r=Array.isArray(t)?t[1]:{};c=m.addWorksheet(e,r)}function h(t,e){if(!Object(n["isEmpty"])(t)){t=Array.isArray(t)?t:t.split(",");for(var r=0;r<t.length;r++){var a=c.getRow(r+1);a.getCell(1).value=t[r],a.height=30,a.font={bold:!0,size:20,vertAlign:"subscript"},a.alignment={vertical:"bottom",horizontal:"center"},a.outlineLevel=1,c.mergeCells(r+1,1,r+1,e),a.commit(),d++}}}function v(t){if(!Object(n["isEmpty"])(t)){for(var e=c.getRow(d),r=1;r<=t.length;r++)e.getCell(r).value=t[r-1];e.height=25,e.width=50,e.font={bold:!0,size:18,vertAlign:"subscript"},e.alignment={vertical:"bottom",horizontal:"center"},e.outlineLevel=1,e.commit(),d++}}function b(t){if(!Object(n["isEmpty"])(t))for(var e=0;e<t.length;e++){for(var r=d,a=c.getRow(d),o=!1,i=0,l=0,s=0,u=0;u<t[e].length;u++)Array.isArray(t[e][u])?(i=s,o=!0,y(t[e][u],s),s+=t[e][u][0].length,l=s):(a.getCell(w(s)).value=t[e][u],a.getCell(w(s)).border={top:{style:"thin"},left:{style:"thin"},bottom:{style:"thin"},right:{style:"thin"}},a.alignment={vertical:"middle",horizontal:"center"},s++);o&&_(r,d,i,l),a.height=25,a.commit(),d++}}function y(t,e){for(var r=t.length,n=r-1,a=0;a<t.length;a++){for(var o=c.getRow(d),i=0;i<t[a].length;i++)o.getCell(w(e+i)).value=t[a][i],o.getCell(w(e+i)).border={top:{style:"thin"},left:{style:"thin"},bottom:{style:"thin"},right:{style:"thin"}},o.alignment={vertical:"middle",horizontal:"center"};o.height=25,o.commit(),a<n&&d++}}function _(t,e,r,n){for(var a=0;a<g;a++)(a<r||a>n)&&c.mergeCells(w(a)+t+":"+w(a)+e)}function x(t){if(!Object(n["isEmpty"])(t))if(Array.isArray(t))for(var e=0;e<t.length;e++){var r=c.getRow(d);r.getCell(1).value=t[e],r.getCell(1).border={top:{style:"thin"},left:{style:"thin"},bottom:{style:"thin"},right:{style:"thin"}},r.alignment={vertical:"middle",horizontal:"left"},c.mergeCells("A"+d+":"+w(g-1)+d),d++}else{var a=c.getRow(d);a.getCell(1).value=t[f],a.getCell(1).border={top:{style:"thin"},left:{style:"thin"},bottom:{style:"thin"},right:{style:"thin"}},a.alignment={vertical:"middle",horizontal:"left"},c.mergeCells("A"+d+":"+w(g-1)+d)}}function w(t){if(t<26)return u[t];var e=t%26,r=Math.floor(t%26);return u[r]+u[e]}function C(t){t||(t=(new Date).getTime()),m.xlsx.writeBuffer().then((function(e){var r=new Blob([e],{type:"application/octet-stream"});i["saveAs"](r,t+".xlsx")}))}p(s),h(e,g),v(t),b(r),x(a),C(l)}},"831a":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"divBox"},[r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("div",{staticClass:"container"},[r("el-form",{attrs:{size:"small","label-width":"100px"}},[r("span",{staticClass:"seachTiele"},[t._v("创建时间：")]),t._v(" "),r("el-radio-group",{staticClass:"mr20",attrs:{type:"button",size:"small",clearable:""},on:{change:function(e){return t.selectChange(t.tableFrom.date)}},model:{value:t.tableFrom.date,callback:function(e){t.$set(t.tableFrom,"date",e)},expression:"tableFrom.date"}},t._l(t.fromList.fromTxt,(function(e,n){return r("el-radio-button",{key:n,attrs:{label:e.val}},[t._v(t._s(e.text))])})),1),t._v(" "),r("el-date-picker",{staticStyle:{width:"250px"},attrs:{"value-format":"yyyy/MM/dd",format:"yyyy/MM/dd",size:"small",type:"daterange",placement:"bottom-end",placeholder:"自定义时间",clearable:""},on:{change:t.onchangeTime},model:{value:t.timeVal,callback:function(e){t.timeVal=e},expression:"timeVal"}}),t._v(" "),r("div",{staticClass:"mt20"},[r("span",{staticClass:"seachTiele"},[t._v("分账时间：")]),t._v(" "),r("el-radio-group",{staticClass:"mr20",attrs:{type:"button",size:"small",clearable:""},on:{change:function(e){return t.selectChange2(t.tableFrom.profit_date)}},model:{value:t.tableFrom.profit_date,callback:function(e){t.$set(t.tableFrom,"profit_date",e)},expression:"tableFrom.profit_date"}},t._l(t.fromList.fromTxt,(function(e,n){return r("el-radio-button",{key:n,attrs:{label:e.val}},[t._v(t._s(e.text))])})),1),t._v(" "),r("el-date-picker",{staticStyle:{width:"250px"},attrs:{"value-format":"yyyy/MM/dd",format:"yyyy/MM/dd",size:"small",type:"daterange",placement:"bottom-end",placeholder:"自定义时间",clearable:""},on:{change:t.onchangeTime2},model:{value:t.timeVal2,callback:function(e){t.timeVal2=e},expression:"timeVal2"}})],1),t._v(" "),r("div",{staticClass:"mt20"},[r("span",{staticClass:"seachTiele"},[t._v("状态：")]),t._v(" "),r("el-select",{staticClass:"filter-item selWidth mr20",attrs:{placeholder:"请选择",clearable:""},on:{change:function(e){return t.getList(1)}},model:{value:t.tableFrom.status,callback:function(e){t.$set(t.tableFrom,"status",e)},expression:"tableFrom.status"}},t._l(t.applyStatus,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1),t._v(" "),r("span",{staticClass:"seachTiele"},[t._v("分账账单类型：")]),t._v(" "),r("el-select",{staticClass:"filter-item selWidth mr20",attrs:{placeholder:"请选择",clearable:""},on:{change:function(e){return t.getList(1)}},model:{value:t.tableFrom.type,callback:function(e){t.$set(t.tableFrom,"type",e)},expression:"tableFrom.type"}},[r("el-option",{attrs:{label:"订单支付",value:"order"}}),t._v(" "),r("el-option",{attrs:{label:"尾款支付",value:"presell"}})],1),t._v(" "),r("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-search"},on:{click:function(e){return t.getList(1)}}},[t._v("搜索")]),t._v(" "),r("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-top"},on:{click:t.exports}},[t._v("列表导出")])],1)],1)],1)]),t._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData.data,size:"mini"}},[r("el-table-column",{attrs:{prop:"profitsharing_id",label:"分账ID","min-width":"50"}}),t._v(" "),r("el-table-column",{attrs:{prop:"order.order_sn",label:"订单编号","min-width":"60"}}),t._v(" "),r("el-table-column",{attrs:{label:"分账金额","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("div",[t._v("订单金额： "+t._s(e.row.profitsharing_price))]),t._v(" "),e.row.profitsharing_refund>0?r("div",{staticStyle:{color:"#82e493"}},[t._v("退款金额： "+t._s(e.row.profitsharing_refund))]):t._e(),t._v(" "),r("div",[t._v("分账给商户金额： "+t._s(e.row.profitsharing_mer_price))])]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"账单类型","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",[t._v(t._s("order"==e.row.type?"订单支付":"尾款支付"))])]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"状态","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.status?r("div",[t._v("未分账")]):1==e.row.status?r("div",[t._v("已分账"),r("br"),t._v("分账时间： "+t._s(e.row.profitsharing_time))]):-1==e.row.status?r("div",[t._v("已退款")]):-2==e.row.status?r("div",[t._v("分账失败"),r("br"),t._v(" "),r("span",{staticStyle:{color:"red","font-size":"12px"}},[t._v(" 失败原因： "+t._s(e.row.error_msg))])]):t._e()]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"create_time",label:"创建时间","min-width":"100"}})],1),t._v(" "),r("div",{staticClass:"block"},[r("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":t.tableFrom.limit,"current-page":t.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.total},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)],1),t._v(" "),r("file-list",{ref:"exportList"})],1)},a=[],o=r("c80c"),i=(r("96cf"),r("3b8d")),l=r("8593"),s=r("2e83"),c=r("30dc"),u={components:{fileList:c["a"]},data:function(){return{tableData:{data:[],total:0},listLoading:!0,tableFrom:{type:"",keyword:"",status:"",date:"",profit_date:"",page:1,limit:20},timeVal:[],timeVal2:[],fromList:{title:"选择时间",custom:!0,fromTxt:[{text:"全部",val:""},{text:"今天",val:"today"},{text:"昨天",val:"yesterday"},{text:"最近7天",val:"lately7"},{text:"最近30天",val:"lately30"},{text:"本月",val:"month"},{text:"本年",val:"year"}]},selectionList:[],ids:"",LogLoading:!1,applyStatus:[{value:0,label:"待分账"},{value:1,label:"已分账"},{value:-1,label:"已退款"},{value:-2,label:"分账失败"}],orderDatalist:null}},mounted:function(){this.getList(1)},methods:{selectChange:function(t){this.tableFrom.date=t,this.timeVal=[],this.getList(1)},selectChange2:function(t){this.tableFrom.profit_date=t,this.timeVal2=[],this.getList(1)},onchangeTime:function(t){this.timeVal=t,this.tableFrom.date=t?this.timeVal.join("-"):"",this.getList(1)},onchangeTime2:function(t){this.timeVal2=t,this.tableFrom.profit_date=t?this.timeVal2.join("-"):"",this.getList(1)},exports:function(){var t=Object(i["a"])(Object(o["a"])().mark((function t(e){var r,n,a,i,l;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:r=JSON.parse(JSON.stringify(this.tableFrom)),n=[],r.page=1,a=1,i={},l=0;case 5:if(!(l<a)){t.next=14;break}return t.next=8,this.downData(r);case 8:i=t.sent,a=Math.ceil(i.count/r.limit),i.export.length&&(n=n.concat(i.export),r.page++);case 11:l++,t.next=5;break;case 14:return Object(s["a"])(i.header,i.title,n,i.foot,i.filename),t.abrupt("return");case 16:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),downData:function(t){return new Promise((function(e,r){Object(l["v"])(t).then((function(t){return e(t.data)}))}))},exportRecord:function(){var t=this;Object(l["v"])(this.tableFrom).then((function(e){var r=t.$createElement;t.$msgbox({title:"提示",message:r("p",null,[r("span",null,'文件正在生成中，请稍后点击"'),r("span",{style:"color: teal"},"导出记录"),r("span",null,'"查看~ ')]),confirmButtonText:"我知道了"}).then((function(t){}))})).catch((function(e){t.$message.error(e.message)}))},getExportFileList:function(){this.$refs.exportList.exportFileList()},getList:function(t){var e=this;this.listLoading=!0,this.tableFrom.page=t||this.tableFrom.page,Object(l["f"])(this.tableFrom).then((function(t){e.tableData.data=t.data.list,e.tableData.total=t.data.count,e.listLoading=!1})).catch((function(t){e.$message.error(t.message),e.listLoading=!1}))},pageChange:function(t){this.tableFrom.page=t,this.getList("")},handleSizeChange:function(t){this.tableFrom.limit=t,this.getList("")}}},d=u,f=(r("9d27"),r("2877")),m=Object(f["a"])(d,n,a,!1,null,"bf4c001c",null);e["default"]=m.exports},"9d27":function(t,e,r){"use strict";r("bc5a")},bc5a:function(t,e,r){},f8b7:function(t,e,r){"use strict";r.d(e,"F",(function(){return a})),r.d(e,"c",(function(){return o})),r.d(e,"b",(function(){return i})),r.d(e,"J",(function(){return l})),r.d(e,"C",(function(){return s})),r.d(e,"D",(function(){return c})),r.d(e,"p",(function(){return u})),r.d(e,"G",(function(){return d})),r.d(e,"I",(function(){return f})),r.d(e,"B",(function(){return m})),r.d(e,"H",(function(){return g})),r.d(e,"Q",(function(){return p})),r.d(e,"O",(function(){return h})),r.d(e,"T",(function(){return v})),r.d(e,"S",(function(){return b})),r.d(e,"R",(function(){return y})),r.d(e,"N",(function(){return _})),r.d(e,"d",(function(){return x})),r.d(e,"s",(function(){return w})),r.d(e,"P",(function(){return C})),r.d(e,"m",(function(){return k})),r.d(e,"l",(function(){return L})),r.d(e,"k",(function(){return F})),r.d(e,"j",(function(){return z})),r.d(e,"A",(function(){return A})),r.d(e,"u",(function(){return j})),r.d(e,"E",(function(){return O})),r.d(e,"V",(function(){return S})),r.d(e,"W",(function(){return V})),r.d(e,"U",(function(){return T})),r.d(e,"y",(function(){return D})),r.d(e,"x",(function(){return M})),r.d(e,"v",(function(){return $})),r.d(e,"w",(function(){return E})),r.d(e,"z",(function(){return R})),r.d(e,"i",(function(){return B})),r.d(e,"g",(function(){return J})),r.d(e,"h",(function(){return W})),r.d(e,"M",(function(){return N})),r.d(e,"o",(function(){return I})),r.d(e,"n",(function(){return P})),r.d(e,"a",(function(){return G})),r.d(e,"r",(function(){return H})),r.d(e,"t",(function(){return K})),r.d(e,"q",(function(){return Q})),r.d(e,"f",(function(){return U})),r.d(e,"e",(function(){return q})),r.d(e,"L",(function(){return X})),r.d(e,"K",(function(){return Y}));var n=r("0c6d");function a(t){return n["a"].get("store/order/lst",t)}function o(){return n["a"].get("store/order/chart")}function i(t){return n["a"].get("store/order/title",t)}function l(t,e){return n["a"].post("store/order/update/".concat(t),e)}function s(t,e){return n["a"].post("store/order/delivery/".concat(t),e)}function c(t){return n["a"].get("store/order/detail/".concat(t))}function u(t){return n["a"].get("store/order/children/".concat(t))}function d(t,e){return n["a"].get("store/order/log/".concat(t),e)}function f(t){return n["a"].get("store/order/remark/".concat(t,"/form"))}function m(t){return n["a"].post("store/order/delete/".concat(t))}function g(t){return n["a"].get("store/order/printer/".concat(t))}function p(t){return n["a"].get("store/refundorder/lst",t)}function h(t){return n["a"].get("store/refundorder/detail/".concat(t))}function v(t){return n["a"].get("store/refundorder/status/".concat(t,"/form"))}function b(t){return n["a"].get("store/refundorder/mark/".concat(t,"/form"))}function y(t){return n["a"].get("store/refundorder/log/".concat(t))}function _(t){return n["a"].get("store/refundorder/delete/".concat(t))}function x(t){return n["a"].post("store/refundorder/refund/".concat(t))}function w(t){return n["a"].get("store/order/express/".concat(t))}function C(t){return n["a"].get("store/refundorder/express/".concat(t))}function k(t){return n["a"].get("store/order/excel",t)}function L(t){return n["a"].get("store/order/delivery_export",t)}function F(t){return n["a"].get("excel/lst",t)}function z(t){return n["a"].get("excel/download/".concat(t))}function A(t){return n["a"].get("store/order/verify/".concat(t))}function j(t,e){return n["a"].post("store/order/verify/".concat(t),e)}function O(){return n["a"].get("store/order/filtter")}function S(){return n["a"].get("store/order/takechart")}function V(t){return n["a"].get("store/order/takelst",t)}function T(t){return n["a"].get("store/order/take_title",t)}function D(t){return n["a"].get("store/receipt/lst",t)}function M(t){return n["a"].get("store/receipt/set_recipt",t)}function $(t){return n["a"].post("store/receipt/save_recipt",t)}function E(t){return n["a"].get("store/receipt/detail/".concat(t))}function R(t,e){return n["a"].post("store/receipt/update/".concat(t),e)}function B(t){return n["a"].get("store/import/lst",t)}function J(t,e){return n["a"].get("store/import/detail/".concat(t),e)}function W(t){return n["a"].get("store/import/excel/".concat(t))}function N(t){return n["a"].get("store/refundorder/excel",t)}function I(){return n["a"].get("expr/options")}function P(t){return n["a"].get("expr/temps",t)}function G(t){return n["a"].post("store/order/delivery_batch",t)}function H(){return n["a"].get("serve/config")}function K(){return n["a"].get("delivery/station/select")}function Q(){return n["a"].get("delivery/station/options")}function U(t){return n["a"].get("delivery/order/lst",t)}function q(t){return n["a"].get("delivery/order/cancel/".concat(t,"/form"))}function X(t){return n["a"].get("delivery/station/payLst",t)}function Y(t){return n["a"].get("delivery/station/code",t)}}}]);