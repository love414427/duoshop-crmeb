(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21f309"],{d986:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"divBox"},[a("el-card",{staticClass:"box-card"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData.data,size:"small","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"权益名称",prop:"interests_id","min-width":"60"}}),t._v(" "),a("el-table-column",{attrs:{label:"展示名称",prop:"name","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{label:"未开通权益图标(80x80)","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("div",{staticClass:"demo-image__preview"},[a("el-image",{staticStyle:{width:"36px",height:"36px"},attrs:{src:t.row.pic?t.row.pic:"","preview-src-list":[t.row.pic||""]}})],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"已开通权益图标(80x80)","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("div",{staticClass:"demo-image__preview"},[a("el-image",{staticStyle:{width:"36px",height:"36px"},attrs:{src:t.row.on_pic?t.row.on_pic:"","preview-src-list":[t.row.on_pic||""]}})],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"权益简介",prop:"info","min-width":"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"权益状态","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-text":"显示","inactive-text":"隐藏"},on:{change:function(a){return t.onchangeIsShow(e.row)}},model:{value:e.row.status,callback:function(a){t.$set(e.row,"status",a)},expression:"scope.row.status"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作","min-width":"100",fixed:"right",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.onEdit(e.row.interests_id)}}},[t._v("编辑")])]}}])})],1)],1)],1)},n=[],s=a("c24f"),l={name:"UserGroup",data:function(){return{tableFrom:{page:1,limit:20},tableData:{data:[]},listLoading:!0}},mounted:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,Object(s["Q"])(this.tableFrom).then((function(e){t.tableData.data=e.data,t.listLoading=!1})).catch((function(e){t.listLoading=!1,t.$message.error(e.message)}))},pageChange:function(t){this.tableFrom.page=t,this.getList()},handleSizeChange:function(t){this.tableFrom.limit=t,this.getList()},onEdit:function(t){var e=this;this.$modalForm(Object(s["S"])(t)).then((function(){return e.getList()}))},onchangeIsShow:function(t){var e=this;Object(s["R"])(t.interests_id,t.status).then((function(t){var a=t.message;e.$message.success(a),e.getList()})).catch((function(t){var a=t.message;e.$message.error(a)}))}}},o=l,r=a("2877"),c=Object(r["a"])(o,i,n,!1,null,"0a4ae07d",null);e["default"]=c.exports}}]);