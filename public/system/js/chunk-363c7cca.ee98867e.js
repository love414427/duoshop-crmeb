(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-363c7cca"],{"2f21":function(t,e,a){"use strict";var r=a("79e5");t.exports=function(t,e){return!!t&&r((function(){e?t.call(null,(function(){}),1):t.call(null)}))}},"55dd":function(t,e,a){"use strict";var r=a("5ca1"),s=a("d8e8"),i=a("4bf8"),l=a("79e5"),o=[].sort,n=[1,2,3];r(r.P+r.F*(l((function(){n.sort(void 0)}))||!l((function(){n.sort(null)}))||!a("2f21")(o)),"Array",{sort:function(t){return void 0===t?o.call(i(this)):o.call(i(this),s(t))}})},9809:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"divBox"},[a("el-card",{staticClass:"box-card"},[a("div",{attrs:{slot:"header"},slot:"header"},[a("div",{staticClass:"container"},[a("div",{staticClass:"demo-input-suffix acea-row"},[a("el-form",{ref:"formValidate",attrs:{"label-width":"120px",rules:t.ruleValidate,model:t.formValidate}},[a("el-form-item",{attrs:{label:"参数模板名称：",prop:"template_name"}},[a("el-input",{staticClass:"selWidth",attrs:{placeholder:"请输入参数模板名称"},model:{value:t.formValidate.template_name,callback:function(e){t.$set(t.formValidate,"template_name",e)},expression:"formValidate.template_name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"平台分类：",prop:"cate_ids"}},[a("el-cascader",{staticClass:"selWidth",attrs:{filterable:"",options:t.cateList,props:{multiple:!0,emitPath:!1},clearable:""},model:{value:t.formValidate.cate_ids,callback:function(e){t.$set(t.formValidate,"cate_ids",e)},expression:"formValidate.cate_ids"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"排序："}},[a("el-input-number",{attrs:{label:"排序"},model:{value:t.formValidate.sort,callback:function(e){t.$set(t.formValidate,"sort",e)},expression:"formValidate.sort"}})],1),t._v(" "),a("el-form-item",{attrs:{label:""}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.data,border:"",size:"small"}},[a("el-table-column",{attrs:{align:"center",prop:"name",label:"参数名称","min-width":"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{staticClass:"priceBox",model:{value:e.row.name,callback:function(a){t.$set(e.row,"name",a)},expression:"scope.row.name"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"参数值","min-width":"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{staticClass:"priceBox",model:{value:e.row.value,callback:function(a){t.$set(e.row,"value",a)},expression:"scope.row.value"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"排序","min-width":"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input-number",{staticClass:"priceBox",attrs:{min:0,"controls-position":"right"},model:{value:e.row.sort,callback:function(a){t.$set(e.row,"sort",a)},expression:"scope.row.sort"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"submission",attrs:{type:"text"},on:{click:function(a){return t.delSpecs(e.$index)}}},[t._v("删除")])]}}])})],1)],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.onAdd}},[t._v("添加参数")])],1)],1)],1)])])]),t._v(" "),a("el-card",[a("el-form",[a("el-form-item",[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){return t.handleSubmit("formValidate")}}},[t._v("保存")])],1)],1)],1)],1)},s=[],i=(a("7f7f"),a("55dd"),a("ac6a"),a("c4c8")),l={name:"specsCreate",data:function(){return{listLoading:!0,ruleValidate:{template_name:[{required:!0,message:"请输入参数模板名称",trigger:"blur"}],cate_ids:[{required:!0,message:"请选择平台分类",trigger:"change"}]},data:[],cateList:[],formValidate:{cate_ids:[],sort:0}}},created:function(){this.onAdd(),this.$route.params.id&&this.getInfo(),this.getCategorySelect()},mounted:function(){},methods:{onAdd:function(){var t={name:"",value:"",sort:0,parameter_id:0};this.data.push(t)},onEdit:function(t){var e=this;this.$modalForm(levelUpdateApi(t)).then((function(){return e.getList("")}))},getInfo:function(){var t=this;Object(i["jb"])(this.$route.params.id).then((function(e){var a=[];t.$route.params.id&&"copy"!=t.$route.query.type&&e.data.cateId.forEach((function(t,e){a.push(t.category.store_category_id)})),t.formValidate={template_name:e.data.template_name,sort:e.data.sort,cate_ids:a},t.data=e.data.parameter}))},getCategorySelect:function(){var t=this;Object(i["w"])().then((function(e){t.cateList=e.data})).catch((function(e){t.$message.error(e.message)}))},delSpecs:function(t){this.data.splice(t,1)},handleSubmit:function(t){var e=this;this.$refs[t].validate((function(t){if(t){e.formValidate.params=e.data;for(var a=0;a<e.formValidate.params.length;a++){var r=e.formValidate.params[a];if(!r.name.trim())return e.$message.error("请输入参数名称");if(!r.value.trim())return e.$message.error("请输入参数值")}e.$route.params.id&&"copy"!=e.$route.query.type?Object(i["zb"])(e.$route.params.id,e.formValidate).then((function(t){e.$message.success(t.message),e.$router.push({path:"/admin/product/specs"})})).catch((function(t){e.$message.error(t.message)})):Object(i["ib"])(e.formValidate).then((function(t){e.$message.success(t.message),e.$router.push({path:"/admin/product/specs"})})).catch((function(t){e.$message.error(t.message)}))}}))}}},o=l,n=(a("a8c2"),a("2877")),c=Object(n["a"])(o,r,s,!1,null,"37c7045e",null);e["default"]=c.exports},a8c2:function(t,e,a){"use strict";a("b37b")},b37b:function(t,e,a){}}]);