(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6230a51e"],{"6d13":function(t,e,a){"use strict";a("f84f")},9129:function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"divBox"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("div",{staticClass:"container"},[a("el-form",{attrs:{size:"small",inline:!0}},[a("el-form-item",{attrs:{label:"状态："}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择状态"},on:{change:t.getList},model:{value:t.tableFrom.status,callback:function(e){t.$set(t.tableFrom,"status",e)},expression:"tableFrom.status"}},t._l(t.switchData,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"关键字搜索："}},[a("el-input",{staticClass:"selWidth",attrs:{placeholder:"请输入模板名称或者模板ID",size:"small"},model:{value:t.tableFrom.keyword,callback:function(e){t.$set(t.tableFrom,"keyword",e)},expression:"tableFrom.keyword"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.getList}},[t._v("查询")])],1)],1),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.onAdd}},[t._v("添加模板消息")])],1)]),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticClass:"table",staticStyle:{width:"100%"},attrs:{data:t.tableData.data,size:"mini","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"ID",width:"80",prop:"template_id"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tempid",label:"模板ID","min-width":"340"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"模板名","min-width":"150"}}),t._v(" "),a("el-table-column",{attrs:{label:"回复内容","min-width":"200"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.content.split("\n"),(function(e,l){return a("span",{key:l,staticStyle:{display:"block"}},[t._v(t._s(e))])}))}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"create_time",label:"添加时间","min-width":"150"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作","min-width":"100",fixed:"right",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.onEdit(e.row.template_id)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.handleDelete(e.row.template_id,e.$index)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":t.tableFrom.limit,"current-page":t.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.total},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)],1)],1)},s=[],n=a("b562"),i=a("e572"),o={name:"Template",data:function(){return{switchData:i["c"],tableFrom:{page:1,limit:20,status:"",keyword:""},tableData:{data:[],total:0},listLoading:!0,tempId:null}},mounted:function(){this.getList()},methods:{handleDelete:function(t,e){var a=this;this.$modalSure().then((function(){-1!==a.$route.path.indexOf("wechat")?Object(n["q"])(t).then((function(){a.$message.success("删除成功"),a.tableData.data.splice(e,1)})).catch((function(t){a.$message.error(t.message)})):Object(n["j"])(t).then((function(){a.$message.success("删除成功"),a.tableData.data.splice(e,1)})).catch((function(t){a.$message.error(t.message)}))}))},onAdd:function(){var t=this;this.$modalForm(-1!==this.$route.path.indexOf("wechat")?Object(n["p"])():Object(n["i"])()).then((function(){return t.getList()}))},onEdit:function(t){var e=this;this.$modalForm(-1!==this.$route.path.indexOf("wechat")?Object(n["t"])(t):Object(n["o"])(t)).then((function(){return e.getList()}))},getList:function(){var t=this;this.listLoading=!0,-1!==this.$route.path.indexOf("wechat")?Object(n["r"])(this.tableFrom).then((function(e){t.tableData.data=e.data.list||[],t.tableData.total=e.data.count,t.listLoading=!1})).catch((function(e){t.tableData.data=[],t.listLoading=!1,t.$message.error(e.message)})):Object(n["m"])(this.tableFrom).then((function(e){t.tableData.data=e.data.list||[],t.tableData.total=e.data.count,t.listLoading=!1})).catch((function(e){t.tableData.data=[],t.listLoading=!1,t.$message.error(e.message)}))},pageChange:function(t){this.tableFrom.page=t,this.getList()},handleSizeChange:function(t){this.tableFrom.limit=t,this.getList()},onchangeIsShow:function(t){var e=this;-1!==this.$route.path.indexOf("wechat")?Object(n["s"])(t.template_id,{status:t.status}).then((function(){e.$message.success("修改成功"),e.getList()})).catch((function(t){e.$message.error(t.message)})):Object(n["n"])(t.template_id,{status:t.status}).then((function(){e.$message.success("修改成功"),e.getList()})).catch((function(t){e.$message.error(t.message)}))}}},r=o,c=(a("6d13"),a("2877")),u=Object(c["a"])(r,l,s,!1,null,"e05f994c",null);e["default"]=u.exports},e572:function(t,e,a){"use strict";a.d(e,"c",(function(){return l})),a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return n}));var l=[{label:"开启",value:1},{label:"关闭",value:0}],s={title:"选择时间",custom:!0,fromTxt:[{text:"全部",val:""},{text:"今天",val:"today"},{text:"昨天",val:"yesterday"},{text:"最近7天",val:"lately7"},{text:"最近30天",val:"lately30"},{text:"本月",val:"month"},{text:"本年",val:"year"}]},n={title:"状态",custom:!0,fromTxt:[{text:"全部",val:""},{text:"待审核",val:"0"},{text:"审核已通过",val:"1"},{text:"审核未通过",val:"2"}]}},f84f:function(t,e,a){}}]);