(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c00ceb3"],{1336:function(t,e,a){"use strict";a.d(e,"h",(function(){return i})),a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return s})),a.d(e,"l",(function(){return l})),a.d(e,"e",(function(){return c})),a.d(e,"k",(function(){return o})),a.d(e,"i",(function(){return u})),a.d(e,"f",(function(){return d})),a.d(e,"a",(function(){return m})),a.d(e,"g",(function(){return f})),a.d(e,"d",(function(){return g})),a.d(e,"j",(function(){return p}));var n=a("0c6d");function i(){return n["a"].get("system/article/category/lst")}function r(){return n["a"].get("system/article/category/select")}function s(){return n["a"].get("system/article/category/create/form")}function l(t){return n["a"].get("system/article/category/update/form/".concat(t))}function c(t){return n["a"].delete("system/article/category/delete/".concat(t))}function o(t,e){return n["a"].post("system/article/category/status/".concat(t),{status:e})}function u(t){return n["a"].get("system/article/article/lst",t)}function d(t){return n["a"].get("system/article/article/detail/".concat(t))}function m(t){return n["a"].post("system/article/article/create",t)}function f(t,e){return n["a"].post("system/article/article/update/".concat(e),t)}function g(t){return n["a"].delete("system/article/article/delete/".concat(t))}function p(t,e){return n["a"].post("system/article/article/status/".concat(t),{status:e})}},"4ce5":function(t,e,a){},"62e4":function(t,e,a){"use strict";a("4ce5")},"9d25":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"divBox"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("div",{staticClass:"container"},[a("el-form",{attrs:{size:"small","label-width":"100px",inline:!0}},[a("el-form-item",{attrs:{label:"文章标题："}},[a("el-input",{staticClass:"selWidth",attrs:{placeholder:"请输入文章标题",size:"small"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.getList(1)}},model:{value:t.tableFrom.title,callback:function(e){t.$set(t.tableFrom,"title",e)},expression:"tableFrom.title"}},[a("el-button",{staticClass:"el-button-solt",attrs:{slot:"append",icon:"el-icon-search",size:"small"},on:{click:function(e){return t.getList(1)}},slot:"append"})],1)],1)],1)],1),t._v(" "),a("router-link",{attrs:{to:{path:t.roterPre+"/cms/article/addArticle"}}},[a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("添加文章")])],1)],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData.data,size:"small"}},[a("el-table-column",{attrs:{prop:"article_id",label:"ID","min-width":"60"}}),t._v(" "),a("el-table-column",{attrs:{label:"文章图片","min-width":"80",prop:"image"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("div",{staticClass:"demo-image__preview"},[a("el-image",{staticStyle:{width:"36px",height:"36px"},attrs:{src:t.row.image_input,"preview-src-list":[t.row.image_input]}})],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"文章标题","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.articleCategory?" [ "+e.row.articleCategory.title+" ] "+e.row.title:e.row.title))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"create_time",label:"时间","min-width":"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"是否显示","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-text":"显示","inactive-text":"隐藏"},on:{change:function(a){return t.onchangeIsShow(e.row)}},model:{value:e.row.status,callback:function(a){t.$set(e.row,"status",a)},expression:"scope.row.status"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作","min-width":"100",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{attrs:{to:{path:t.roterPre+"/cms/article/addArticle/"+e.row.article_id}}},[a("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"}},[t._v("编辑")])],1),t._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.handleDelete(e.row.article_id,e.$index)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":t.tableFrom.limit,"current-page":t.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.total},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)],1)],1)},i=[],r=a("1336"),s=a("83d6"),l={name:"Article",data:function(){return{roterPre:s["roterPre"],tableFrom:{page:1,limit:20,title:""},tableData:{data:[],total:0},listLoading:!0}},mounted:function(){this.getList("")},methods:{getList:function(t){var e=this;this.listLoading=!0,this.tableFrom.page=t||this.tableFrom.page,Object(r["i"])(this.tableFrom).then((function(t){e.tableData.data=t.data.list,e.tableData.total=t.data.count,e.listLoading=!1})).catch((function(t){e.listLoading=!1,e.$message.error(t.message)}))},pageChange:function(t){this.tableFrom.page=t,this.getList("")},handleSizeChange:function(t){this.tableFrom.limit=t,this.getList("")},handleDelete:function(t,e){var a=this;this.$modalSure().then((function(){Object(r["d"])(t).then((function(t){var e=t.message;a.$message.success(e),a.getList("")})).catch((function(t){var e=t.message;a.$message.error(e)}))}))},onchangeIsShow:function(t){var e=this;Object(r["j"])(t.article_id,t.status).then((function(t){var a=t.message;e.$message.success(a),e.getList("")})).catch((function(t){var a=t.message;e.$message.error(a)}))}}},c=l,o=(a("62e4"),a("2877")),u=Object(o["a"])(c,n,i,!1,null,"046b513c",null);e["default"]=u.exports}}]);