(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45d43217"],{"12e6":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"divBox"},[a("el-card",{staticClass:"box-card"},[a("div",{attrs:{slot:"header"},slot:"header"},[a("div",{staticClass:"container"},[a("div",{staticClass:"demo-input-suffix acea-row"},[a("el-form",{attrs:{inline:"",size:"small","label-width":"100px"}},[a("el-form-item",{attrs:{label:"搜索："}},[a("el-input",{staticClass:"selWidth",attrs:{placeholder:"请输入参数模板名称"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.getList(1)}},model:{value:t.tableFrom.template_name,callback:function(e){t.$set(t.tableFrom,"template_name",e)},expression:"tableFrom.template_name"}},[a("el-button",{staticClass:"el-button-solt",attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(e){return t.getList(1)}},slot:"append"})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"平台分类："}},[a("el-cascader",{staticClass:"selWidth",attrs:{options:t.cateList,props:{checkStrictly:!0},clearable:""},model:{value:t.tableFrom.cate_ids,callback:function(e){t.$set(t.tableFrom,"cate_ids",e)},expression:"tableFrom.cate_ids"}})],1)],1)],1)]),t._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.onAdd}},[t._v("添加参数模板")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData.data,size:"small"}},[a("el-table-column",{attrs:{prop:"template_id",label:"ID","min-width":"60"}}),t._v(" "),a("el-table-column",{attrs:{prop:"template_name",label:"参数模板名称","min-width":"60"}}),t._v(" "),a("el-table-column",{attrs:{prop:"svip_number",label:"关联分类","min-width":"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.cate_name.toString()))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"sort",label:"排序","min-width":"60"}}),t._v(" "),a("el-table-column",{attrs:{prop:"create_time",label:"创建时间","min-width":"60"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作","min-width":"100",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.onEdit(e.row.template_id)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.onDetail(e.row.template_id)}}},[t._v("查看")]),t._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.handleDelete(e.row.template_id,e.$index)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":t.tableFrom.limit,"current-page":t.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.total},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)],1),t._v(" "),a("el-dialog",{attrs:{title:t.title,visible:t.dialogVisible,width:"400px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",{staticStyle:{"min-height":"500px"}},[a("div",{staticClass:"description"},[a("div",{staticClass:"acea-row"},t._l(t.specsInfo.parameter,(function(e,i){return a("div",{key:i,staticClass:"description-term"},[a("span",{staticClass:"name"},[t._v(t._s(e.name))]),t._v(" "),a("span",{staticClass:"value"},[t._v(t._s(e.value))])])})),0)])])])],1)},s=[],n=(a("ac6a"),a("83d6")),l=a("c4c8"),o={name:"SpecsList",data:function(){return{listLoading:!0,cateList:[],tableData:{data:[],total:0},tableFrom:{page:1,limit:20},specsInfo:{},dialogVisible:!1,title:""}},mounted:function(){this.getCategorySelect(),this.getList("")},methods:{getList:function(t){var e=this;this.listLoading=!0,this.tableFrom.page=t||this.tableFrom.page,Object(l["kb"])(this.tableFrom).then((function(t){t.data.list.forEach((function(t,e){t.cate_name=[],t.cateId.forEach((function(e,a){var i=e.category?e.category.cate_name:"";t.cate_name.push(i)}))})),e.tableData.data=t.data.list,e.tableData.total=t.data.count,e.listLoading=!1})).catch((function(t){e.listLoading=!1,e.$message.error(t.message)}))},pageChange:function(t){this.tableFrom.page=t,this.getList("")},handleSizeChange:function(t){this.tableFrom.limit=t,this.getList("")},getCategorySelect:function(){var t=this;Object(l["w"])().then((function(e){t.cateList=e.data})).catch((function(e){t.$message.error(e.message)}))},onAdd:function(){this.$router.push("".concat(n["roterPre"],"/product/specs/create"))},onEdit:function(t){this.$router.push("".concat(n["roterPre"],"/product/specs/create/").concat(t))},onDetail:function(t){var e=this;Object(l["jb"])(t).then((function(t){e.specsInfo=t.data,e.title=t.data.template_name.length>10?t.data.template_name.slice(0,10)+"...":t.data.template_name,e.dialogVisible=!0})).catch((function(t){e.$message.error(t.message)}))},handleDelete:function(t,e){var a=this;this.$modalSure("确定删除该模板").then((function(){Object(l["yb"])(t).then((function(t){var e=t.message;a.$message.success(e),a.getList("")})).catch((function(t){var e=t.message;a.$message.error(e)}))}))}}},c=o,r=(a("6b09"),a("2877")),d=Object(r["a"])(c,i,s,!1,null,"78a889b8",null);e["default"]=d.exports},"3f57":function(t,e,a){},"6b09":function(t,e,a){"use strict";a("3f57")}}]);