(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-961c0de4"],{5405:function(t,n,e){"use strict";e.r(n);var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"divBox"},[e("el-card",{staticClass:"box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("el-row",{attrs:{gutter:24}},[e("el-col",t._b({},"el-col",t.grid,!1),[e("div",{staticClass:"grid-content bg-purple"})])],1),t._v(" "),e("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.onAdd}},[t._v("添加管理员")])],1),t._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData.data,size:"small","highlight-current-row":""}},[e("el-table-column",{attrs:{prop:"merchant_admin_id",label:"ID","min-width":"60"}}),t._v(" "),e("el-table-column",{attrs:{prop:"real_name",label:"管理员姓名","min-width":"150"}}),t._v(" "),e("el-table-column",{attrs:{prop:"rule_name",label:"身份","min-width":"250"}}),t._v(" "),e("el-table-column",{attrs:{prop:"account",label:"账号","min-width":"250"}}),t._v(" "),e("el-table-column",{attrs:{prop:"status",label:"是否显示","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-text":"开启","inactive-text":"关闭"},on:{change:function(e){return t.onchangeIsShow(n.row)}},model:{value:n.row.status,callback:function(e){t.$set(n.row,"status",e)},expression:"scope.row.status"}})]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"create_time",label:"创建时间","min-width":"150"}}),t._v(" "),e("el-table-column",{attrs:{label:"操作","min-width":"150",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.onPassword(n.row.merchant_admin_id)}}},[t._v("修改管理员密码")]),t._v(" "),e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.onEdit(n.row.merchant_admin_id)}}},[t._v("编辑")]),t._v(" "),e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.handleDelete(n.row.merchant_admin_id,n.$index)}}},[t._v("删除")])]}}])})],1),t._v(" "),e("div",{staticClass:"block"},[e("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":t.tableFrom.limit,"current-page":t.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.total},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)],1)],1)},a=[],i=e("90e7"),o={name:"SystemRole",data:function(){return{grid:{xl:7,lg:7,md:12,sm:24,xs:24},tableData:{data:[],total:0},listLoading:!0,tableFrom:{page:1,limit:20}}},mounted:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,Object(i["c"])(this.tableFrom).then((function(n){t.tableData.data=n.data.list,t.tableData.total=n.data.count,t.listLoading=!1})).catch((function(n){t.listLoading=!1,t.$message.error(n.message)}))},pageChange:function(t){this.tableFrom.page=t,this.getList()},handleSizeChange:function(t){this.tableFrom.limit=t,this.getList()},onchangeIsShow:function(t){var n=this;Object(i["f"])(t.merchant_admin_id,t.status).then((function(t){var e=t.message;n.$message.success(e)})).catch((function(t){var e=t.message;n.$message.error(e)}))},onAdd:function(){var t=this;this.$modalForm(Object(i["a"])()).then((function(){return t.getList()}))},onEdit:function(t){var n=this;this.$modalForm(Object(i["g"])(t)).then((function(){return n.getList()}))},onPassword:function(t){this.$modalForm(Object(i["e"])(t))},handleDelete:function(t,n){var e=this;this.$modalSure().then((function(){Object(i["b"])(t).then((function(t){var r=t.message;e.$message.success(r),e.tableData.data.splice(n,1)})).catch((function(t){var n=t.message;e.$message.error(n)}))}))}}},u=o,s=e("2877"),c=Object(s["a"])(u,r,a,!1,null,"324c4d02",null);n["default"]=c.exports},"90e7":function(t,n,e){"use strict";e.d(n,"o",(function(){return a})),e.d(n,"w",(function(){return i})),e.d(n,"z",(function(){return o})),e.d(n,"x",(function(){return u})),e.d(n,"y",(function(){return s})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return l})),e.d(n,"g",(function(){return d})),e.d(n,"b",(function(){return f})),e.d(n,"f",(function(){return m})),e.d(n,"e",(function(){return g})),e.d(n,"d",(function(){return p})),e.d(n,"C",(function(){return h})),e.d(n,"D",(function(){return v})),e.d(n,"j",(function(){return b})),e.d(n,"k",(function(){return _})),e.d(n,"l",(function(){return w})),e.d(n,"m",(function(){return y})),e.d(n,"n",(function(){return x})),e.d(n,"A",(function(){return k})),e.d(n,"B",(function(){return z})),e.d(n,"p",(function(){return L})),e.d(n,"q",(function(){return $})),e.d(n,"i",(function(){return C})),e.d(n,"h",(function(){return D})),e.d(n,"E",(function(){return j})),e.d(n,"r",(function(){return F})),e.d(n,"t",(function(){return S})),e.d(n,"u",(function(){return O})),e.d(n,"v",(function(){return E})),e.d(n,"s",(function(){return A}));var r=e("0c6d");function a(t){return r["a"].get("system/role/lst",t)}function i(){return r["a"].get("system/role/create/form")}function o(t){return r["a"].get("system/role/update/form/".concat(t))}function u(t){return r["a"].delete("system/role/delete/".concat(t))}function s(t,n){return r["a"].post("system/role/status/".concat(t),{status:n})}function c(t){return r["a"].get("system/admin/lst",t)}function l(){return r["a"].get("/system/admin/create/form")}function d(t){return r["a"].get("system/admin/update/form/".concat(t))}function f(t){return r["a"].delete("system/admin/delete/".concat(t))}function m(t,n){return r["a"].post("system/admin/status/".concat(t),{status:n})}function g(t){return r["a"].get("system/admin/password/form/".concat(t))}function p(t){return r["a"].get("system/admin/log",t)}function h(){return r["a"].get("take/info")}function v(t){return r["a"].post("take/update",t)}function b(){return r["a"].get("margin/code")}function _(){return r["a"].get("margin/make_code")}function w(t){return r["a"].get("margin/lst",t)}function y(){return r["a"].post("financial/refund/margin")}function x(t){return r["a"].post("financial/refund/margin_apply",t)}function k(){return r["a"].get("serve/info")}function z(t){return r["a"].get("serve/meal",t)}function L(t){return r["a"].get("serve/code",t)}function $(t){return r["a"].get("serve/paylst",t)}function C(t){return r["a"].get("expr/temps",t)}function D(){return r["a"].get("serve/config")}function j(t){return r["a"].post("serve/config",t)}function F(){return r["a"].get("store/printer/create/form")}function S(t){return r["a"].get("store/printer/lst",t)}function O(t,n){return r["a"].post("store/printer/status/".concat(t),n)}function E(t){return r["a"].get("store/printer/update/".concat(t,"/form"))}function A(t){return r["a"].delete("store/printer/delete/".concat(t))}}}]);