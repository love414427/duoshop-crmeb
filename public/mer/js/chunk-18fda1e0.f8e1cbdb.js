(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-18fda1e0"],{"223e":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"divBox"},[n("el-card",{staticClass:"box-card"},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("div",{staticClass:"container"},[n("el-form",{attrs:{inline:""},nativeOn:{submit:function(t){t.preventDefault()}}},[n("el-form-item",{staticClass:"mr10",attrs:{label:"打印机名称："}},[n("el-input",{staticClass:"selWidth",attrs:{placeholder:"请输入打印机名称",size:"small"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.getList(1)}},model:{value:t.tableFrom.keyword,callback:function(e){t.$set(t.tableFrom,"keyword",e)},expression:"tableFrom.keyword"}},[n("el-button",{staticClass:"el-button-solt",attrs:{slot:"append",icon:"el-icon-search",size:"small"},on:{click:function(e){return t.getList(1)}},slot:"append"})],1)],1)],1)],1),t._v(" "),n("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.add}},[t._v("添加打印机")])],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData.data,size:"mini"}},[n("el-table-column",{attrs:{prop:"printer_id",label:"ID","min-width":"150"}}),t._v(" "),n("el-table-column",{attrs:{prop:"printer_name",label:"打印机名称","min-width":"200"}}),t._v(" "),n("el-table-column",{attrs:{prop:"printer_terminal",label:"终端号","min-width":"200"}}),t._v(" "),n("el-table-column",{attrs:{label:"是否开启","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-text":"开启","inactive-text":"不开启"},nativeOn:{click:function(n){return t.onchangeIsShow(e.row)}},model:{value:e.row.status,callback:function(n){t.$set(e.row,"status",n)},expression:"scope.row.status"}})]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"创建时间","min-width":"150",prop:"create_time"}}),t._v(" "),n("el-table-column",{attrs:{label:"操作","min-width":"80",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.handleEdit(e.row.printer_id)}}},[t._v("编辑")]),t._v(" "),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.handleDelete(e.row.printer_id,e.$index)}}},[t._v("删除")])]}}])})],1),t._v(" "),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":t.tableFrom.limit,"current-page":t.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.total},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)],1)],1)},a=[],i=n("90e7"),o={name:"ProductGuarantee",components:{},data:function(){return{tableData:{data:[],total:0},listLoading:!0,tableFrom:{page:1,limit:20,date:"",keyword:""},timeVal:[],props:{}}},mounted:function(){this.getList(1)},methods:{add:function(){var t=this;this.$modalForm(Object(i["r"])()).then((function(){return t.getList("")}))},getList:function(t){var e=this;this.listLoading=!0,this.tableFrom.page=t||this.tableFrom.page,Object(i["t"])(this.tableFrom).then((function(t){e.tableData.data=t.data.list,e.tableData.total=t.data.count,e.listLoading=!1})).catch((function(t){e.listLoading=!1,e.$message.error(t.message)}))},pageChange:function(t){this.tableFrom.page=t,this.getList("")},handleSizeChange:function(t){this.tableFrom.limit=t,this.getList("")},onchangeIsShow:function(t){var e=this;Object(i["u"])(t.printer_id,{status:t.status}).then((function(t){var n=t.message;e.$message.success(n),e.getList("")})).catch((function(t){var n=t.message;e.$message.error(n)}))},handleEdit:function(t){var e=this;this.$modalForm(Object(i["v"])(t)).then((function(){return e.getList("")}))},handleDelete:function(t,e){var n=this;this.$modalSure("删除打印机").then((function(){Object(i["s"])(t).then((function(t){var r=t.message;n.$message.success(r),n.tableData.data.splice(e,1)})).catch((function(t){var e=t.message;n.$message.error(e)}))}))}}},s=o,u=n("2877"),c=Object(u["a"])(s,r,a,!1,null,"e2c65e0e",null);e["default"]=c.exports},"90e7":function(t,e,n){"use strict";n.d(e,"o",(function(){return a})),n.d(e,"w",(function(){return i})),n.d(e,"z",(function(){return o})),n.d(e,"x",(function(){return s})),n.d(e,"y",(function(){return u})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return l})),n.d(e,"g",(function(){return d})),n.d(e,"b",(function(){return f})),n.d(e,"f",(function(){return m})),n.d(e,"e",(function(){return p})),n.d(e,"d",(function(){return g})),n.d(e,"C",(function(){return h})),n.d(e,"D",(function(){return v})),n.d(e,"j",(function(){return b})),n.d(e,"k",(function(){return y})),n.d(e,"l",(function(){return w})),n.d(e,"m",(function(){return k})),n.d(e,"n",(function(){return _})),n.d(e,"A",(function(){return x})),n.d(e,"B",(function(){return L})),n.d(e,"p",(function(){return C})),n.d(e,"q",(function(){return z})),n.d(e,"i",(function(){return F})),n.d(e,"h",(function(){return $})),n.d(e,"E",(function(){return D})),n.d(e,"r",(function(){return O})),n.d(e,"t",(function(){return j})),n.d(e,"u",(function(){return S})),n.d(e,"v",(function(){return E})),n.d(e,"s",(function(){return I}));var r=n("0c6d");function a(t){return r["a"].get("system/role/lst",t)}function i(){return r["a"].get("system/role/create/form")}function o(t){return r["a"].get("system/role/update/form/".concat(t))}function s(t){return r["a"].delete("system/role/delete/".concat(t))}function u(t,e){return r["a"].post("system/role/status/".concat(t),{status:e})}function c(t){return r["a"].get("system/admin/lst",t)}function l(){return r["a"].get("/system/admin/create/form")}function d(t){return r["a"].get("system/admin/update/form/".concat(t))}function f(t){return r["a"].delete("system/admin/delete/".concat(t))}function m(t,e){return r["a"].post("system/admin/status/".concat(t),{status:e})}function p(t){return r["a"].get("system/admin/password/form/".concat(t))}function g(t){return r["a"].get("system/admin/log",t)}function h(){return r["a"].get("take/info")}function v(t){return r["a"].post("take/update",t)}function b(){return r["a"].get("margin/code")}function y(){return r["a"].get("margin/make_code")}function w(t){return r["a"].get("margin/lst",t)}function k(){return r["a"].post("financial/refund/margin")}function _(t){return r["a"].post("financial/refund/margin_apply",t)}function x(){return r["a"].get("serve/info")}function L(t){return r["a"].get("serve/meal",t)}function C(t){return r["a"].get("serve/code",t)}function z(t){return r["a"].get("serve/paylst",t)}function F(t){return r["a"].get("expr/temps",t)}function $(){return r["a"].get("serve/config")}function D(t){return r["a"].post("serve/config",t)}function O(){return r["a"].get("store/printer/create/form")}function j(t){return r["a"].get("store/printer/lst",t)}function S(t,e){return r["a"].post("store/printer/status/".concat(t),e)}function E(t){return r["a"].get("store/printer/update/".concat(t,"/form"))}function I(t){return r["a"].delete("store/printer/delete/".concat(t))}}}]);