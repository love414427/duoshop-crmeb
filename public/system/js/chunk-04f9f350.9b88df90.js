(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04f9f350"],{1686:function(e,t,a){},6461:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.dialogVisible?a("el-dialog",{staticClass:"projectInfo",attrs:{title:"商品审核",visible:e.dialogVisible,"append-to-body":e.isAppend,width:"900px","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[e.projectData&&e.isShow?a("el-tabs",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],model:{value:e.activeNames,callback:function(t){e.activeNames=t},expression:"activeNames"}},[a("el-tab-pane",{attrs:{label:"商品信息",name:"first"}},[a("div",{staticClass:"acea-row"},[a("span",{staticClass:"sp"},[e._v("商品名称："+e._s(e.projectData.store_name))]),e._v(" "),a("span",{staticClass:"sp"},[e._v("平台分类："+e._s(e.projectData.storeCategory?e.projectData.storeCategory.cate_name:""))]),e._v(" "),a("span",{staticClass:"sp"},[e._v("品牌："+e._s(e.projectData.brand?e.projectData.brand.brand_name:"其他"))]),e._v(" "),a("span",{staticClass:"sp"},[e._v("商品关键字："+e._s(e.projectData.keyword))]),e._v(" "),a("span",{staticClass:"sp"},[e._v("商品单位："+e._s(e.projectData.unit_name))]),e._v(" "),e.projectData.temp&&e.projectData.temp.name?a("span",{staticClass:"sp"},[e._v("运费模板："+e._s(e.projectData.temp?e.projectData.temp.name:""))]):e._e(),e._v(" "),e.projectData.temp&&e.projectData.temp.info?a("span",{staticClass:"sp100"},[e._v("运费说明："+e._s(e.projectData.temp?e.projectData.temp.info:""))]):e._e(),e._v(" "),a("span",{staticClass:"sp100"},[e._v("\n          商品分类：\n          "),e.projectData.merCateId?e._l(e.projectData.merCateId,(function(t,s){return a("span",{key:s,staticClass:"mr10"},[e._v(e._s(t.category?t.category.cate_name:""))])})):a("span",[e._v("-")])],2),e._v(" "),a("span",{staticClass:"sp100"},[e._v("商品简介："+e._s(e.projectData.store_info))]),e._v(" "),a("span",{staticClass:"sp100"},[e._v("\n          商品封面图：\n          "),a("div",{staticClass:"demo-image__preview"},[a("el-image",{staticStyle:{width:"60px",height:"60px"},attrs:{src:e.projectData.image,"preview-src-list":[e.projectData.image]}})],1)]),e._v(" "),e.projectData.video_link?a("span",{staticClass:"sp100"},[e._v("\n          主图视频：\n           "),a("video",{staticStyle:{width:"40%",height:"180px","border-radius":"10px"},attrs:{src:e.projectData.video_link,controls:"controls"}},[e._v("\n                您的浏览器不支持 video 标签。\n              ")])]):e._e(),e._v(" "),a("span",{staticClass:"sp100"},[e._v("商品轮播图：\n          "),e._l(e.projectData.slider_image,(function(e,t){return a("div",{key:t,staticClass:"pictrue"},[a("el-image",{staticStyle:{width:"60px",height:"60px"},attrs:{src:e,"preview-src-list":[e]}})],1)}))],2)])]),e._v(" "),a("el-tab-pane",{attrs:{label:"商品详情",name:"second"}},[a("span",{staticClass:"sp100"},[e._v("商品详情：")]),e._v(" "),a("div",{staticClass:"contentPic",domProps:{innerHTML:e._s(e.projectData.content)}})]),e._v(" "),a("el-tab-pane",{attrs:{label:"其他设置",name:"third"}},[a("span",{staticClass:"sp100"},[e._v("商品排序："+e._s(e.projectData.sort))]),e._v(" "),a("span",{staticClass:"third mb20"},[a("span",[e._v("商品推荐：")]),e._v(" "),a("el-checkbox-group",{attrs:{size:"small"},model:{value:e.checkboxGroup,callback:function(t){e.checkboxGroup=t},expression:"checkboxGroup"}},e._l(e.recommend,(function(t,s){return a("el-checkbox",{key:s,attrs:{disabled:"",label:t.value}},[e._v(e._s(t.name))])})),1)],1),e._v(" "),e.projectData.guarantee&&e.projectData.guarantee.templateValue.length?a("span",{staticClass:"third mb20"},[a("span",[e._v("服务保障：")]),e._v(" "),e._l(e.projectData.guarantee.templateValue,(function(t,s){return a("span",{key:s},[t.value?a("span",[e._v(e._s(s+1)+". "+e._s(t.value.guarantee_name)+"；")]):e._e()])}))],2):e._e()]),e._v(" "),a("el-tab-pane",{attrs:{label:"商品规格",name:"fourth"}},[a("span",{staticClass:"sp"},[e._v("商品规格："+e._s(0===e.projectData.spec_type?"单规格":"多规格"))]),e._v(" "),a("span",{staticClass:"sp"},[e._v("佣金设置："+e._s(0===e.projectData.extension_type?"默认设置":"单独设置"))]),e._v(" "),a("span",{staticClass:"sp100"},[a("span",{staticClass:"mb15",staticStyle:{display:"block"}},[e._v("商品规格:")]),e._v(" "),0===e.projectData.spec_type?[a("el-table",{staticClass:"tabNumWidth",attrs:{data:e.OneattrValue,border:"",size:"mini"}},[a("el-table-column",{attrs:{align:"center",label:"图片","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("div",{staticClass:"demo-image__preview"},[a("el-image",{staticStyle:{width:"60px",height:"60px"},attrs:{src:e.row.image}})],1)]}}],null,!1,323865937)}),e._v(" "),e._l(e.attrValue,(function(t,s){return a("el-table-column",{key:s,attrs:{label:e.formThead[s].title,align:"center","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"priceBox",domProps:{textContent:e._s(t.row[s])}})]}}],null,!0)})})),e._v(" "),1===e.projectData.extension_type?[a("el-table-column",{attrs:{align:"center",label:"一级返佣(元)","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"priceBox",domProps:{textContent:e._s(t.row.extension_one)}})]}}],null,!1,102250766)}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"二级返佣(元)","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"priceBox",domProps:{textContent:e._s(t.row.extension_two)}})]}}],null,!1,4284057702)})]:e._e()],2)]:e._e(),e._v(" "),1===e.projectData.spec_type?[a("el-table",{staticClass:"tabNumWidth",attrs:{data:e.ManyAttrValue,border:"",size:"mini"}},[e.manyTabDate?e._l(e.manyTabDate,(function(t,s){return a("el-table-column",{key:s,attrs:{align:"center",label:e.manyTabTit[s].title,"min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"priceBox",domProps:{textContent:e._s(t.row[s])}})]}}],null,!0)})})):e._e(),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"图片","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("div",{staticClass:"upLoadPicBox"},[a("div",{staticClass:"pictrue tabPic"},[a("img",{attrs:{src:e.row.image}})])])]}}],null,!1,651288578)}),e._v(" "),e._l(e.attrValue,(function(t,s){return a("el-table-column",{key:s,attrs:{label:e.formThead[s].title,align:"center","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"priceBox"},[e._v(e._s(t.row[s]))])]}}],null,!0)})})),e._v(" "),1===e.projectData.extension_type?[a("el-table-column",{attrs:{align:"center",label:"一级返佣(元)","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"priceBox"},[e._v(e._s(t.row.extension_one))])]}}],null,!1,1519547738)}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"二级返佣(元)","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"priceBox"},[e._v(e._s(t.row.extension_two))])]}}],null,!1,603129202)})]:e._e()],2)]:e._e()],2)])],1):e._e(),e._v(" "),a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"审核状态",prop:"status"}},[a("el-radio-group",{model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}},[a("el-radio",{attrs:{label:1}},[e._v("通过")]),e._v(" "),a("el-radio",{attrs:{label:-1}},[e._v("拒绝")])],1)],1),e._v(" "),-1===e.ruleForm.status?a("el-form-item",{attrs:{label:"原因",prop:"refusal"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入原因"},model:{value:e.ruleForm.refusal,callback:function(t){e.$set(e.ruleForm,"refusal",t)},expression:"ruleForm.refusal"}})],1):e._e(),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("提交")])],1)],1)],1):e._e()},l=[],i=(a("ac6a"),a("c4c8")),o={image:"",slider_image:[],store_name:"",store_info:"",keyword:"",brand_id:"",cate_id:"",mer_cate_id:[],unit_name:"",sort:0,is_show:0,is_benefit:0,is_new:0,is_good:0,temp_id:"",attrValue:[{image:"",price:null,svip_price:null,cost:null,ot_price:null,stock:null,bar_code:"",weight:null,volume:null}],attr:[],selectRule:"",extension_type:0,content:"",spec_type:0},r={price:{title:"售价"},svip_price:{title:"付费会员价"},cost:{title:"成本价"},ot_price:{title:"市场价"},stock:{title:"库存"},bar_code:{title:"商品编号"},weight:{title:"重量（KG）"},volume:{title:"体积(m³)"}},n=[{name:"是否热卖",value:"is_hot"},{name:"优品推荐",value:"is_good"},{name:"促销单品",value:"is_benefit"},{name:"是否精品",value:"is_best"},{name:"是否新品",value:"is_new"}],c={name:"Info",props:{isShow:{type:Boolean,default:!0},ids:{type:Array,default:function(){return[]}}},data:function(){return{rules:{status:[{required:!0,message:"请选择审核状态",trigger:"change"}],refusal:[{required:!0,message:"请填写拒绝原因",trigger:"blur"}]},isAppend:!0,proId:0,ruleForm:{refusal:"",status:1,id:""},formThead:Object.assign({},r),manyTabDate:{},manyTabTit:{},loading:!1,dialogVisible:!1,activeNames:"first",projectData:{},recommend:n,checkboxGroup:[],svip_type:0,OneattrValue:[Object.assign({},o.attrValue[0])],ManyAttrValue:[Object.assign({},o.attrValue[0])]}},computed:{attrValue:function(){var e=Object.assign({},o.attrValue[0]);return 0==this.svip_type&&delete e.svip_price,delete e.image,e},oneFormBatch:function(){var e=[Object.assign({},o.attrValue[0])];return delete e[0].bar_code,e}},methods:{onSubmit:function(){var e=this;this.isShow?this.ruleForm.id=this.proId:this.ruleForm.id=this.ids,Object(i["lb"])(this.ruleForm).then((function(t){e.$message.success(t.message),e.dialogVisible=!1,e.activeNames="first",e.$emit("subSuccess")})).catch((function(t){e.listLoading=!1,e.$message.error(t.message)}))},handleClose:function(){this.dialogVisible=!1,this.activeNames="first"},getInfo:function(e){var t=this;this.proId=e,this.loading=!0,Object(i["db"])(e).then((function(e){t.projectData=e.data,t.svip_type=e.data.svip_price_type,0===t.projectData.spec_type?t.OneattrValue=e.data.attrValue:t.ManyAttrValue=e.data.attrValue;var a={},s={};t.projectData.attr.forEach((function(e,t){a["value"+t]={title:e.value},s["value"+t]=""})),t.manyTabDate=s,t.manyTabTit=a,t.checkboxGroup=[],t.formThead=Object.assign({},t.formThead,a),1===t.projectData.is_hot&&t.checkboxGroup.push("is_hot"),1===t.projectData.is_good&&t.checkboxGroup.push("is_good"),1===t.projectData.is_benefit&&t.checkboxGroup.push("is_benefit"),1===t.projectData.is_best&&t.checkboxGroup.push("is_best"),1===t.projectData.is_new&&t.checkboxGroup.push("is_new"),t.loading=!1})).catch((function(e){t.$message.error(e.message),t.loading=!1}))}}},u=c,m=(a("902d"),a("2877")),p=Object(m["a"])(u,s,l,!1,null,"14014661",null);t["a"]=p.exports},8016:function(e,t,a){"use strict";a("8c58")},"8c58":function(e,t,a){},"902d":function(e,t,a){"use strict";a("1686")},fe2f:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"divBox"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("el-tabs",{on:{"tab-click":function(t){e.getList(1),e.getLstFilterApi()}},model:{value:e.tableFrom.type,callback:function(t){e.$set(e.tableFrom,"type",t)},expression:"tableFrom.type"}},e._l(e.headeNum,(function(e,t){return a("el-tab-pane",{key:t,attrs:{name:e.type.toString(),label:e.name+"("+e.count+")"}})})),1),e._v(" "),a("div",{staticClass:"container"},[a("div",{staticClass:"demo-input-suffix acea-row"},[a("el-form",{attrs:{inline:"",size:"small","label-width":"100px"}},[a("el-form-item",{attrs:{label:"商品分类："}},[a("el-cascader",{staticClass:"selWidth",attrs:{options:e.merCateList,props:{checkStrictly:!0,emitPath:!1},clearable:""},on:{change:function(t){return e.getList(1)}},model:{value:e.tableFrom.pid,callback:function(t){e.$set(e.tableFrom,"pid",t)},expression:"tableFrom.pid"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商户名称："}},[a("el-select",{staticClass:"selWidth",attrs:{clearable:"",filterable:"",placeholder:"请选择"},on:{change:function(t){return e.getList(1)}},model:{value:e.tableFrom.mer_id,callback:function(t){e.$set(e.tableFrom,"mer_id",t)},expression:"tableFrom.mer_id"}},e._l(e.merSelect,(function(e){return a("el-option",{key:e.mer_id,attrs:{label:e.mer_name,value:e.mer_id}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"商户类别："}},[a("el-select",{staticClass:"selWidth",attrs:{clearable:"",placeholder:"请选择"},on:{change:function(t){return e.getList(1)}},model:{value:e.tableFrom.is_trader,callback:function(t){e.$set(e.tableFrom,"is_trader",t)},expression:"tableFrom.is_trader"}},[a("el-option",{attrs:{label:"自营",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"非自营",value:"0"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"商品状态："}},[a("el-select",{staticClass:"filter-item selWidth",attrs:{placeholder:"请选择",clearable:""},on:{change:function(t){return e.getList(1)}},model:{value:e.tableFrom.us_status,callback:function(t){e.$set(e.tableFrom,"us_status",t)},expression:"tableFrom.us_status"}},e._l(e.productStatusList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"推荐级别："}},[a("el-select",{staticClass:"filter-item selWidth",attrs:{placeholder:"请选择",clearable:""},on:{change:function(t){return e.getList(1)}},model:{value:e.tableFrom.star,callback:function(t){e.$set(e.tableFrom,"star",t)},expression:"tableFrom.star"}},e._l(e.recommendedLevelStatus,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"标签："}},[a("el-select",{staticClass:"filter-item selWidth",attrs:{placeholder:"请选择",clearable:"",filterable:""},on:{change:function(t){return e.getList(1)}},model:{value:e.tableFrom.sys_labels,callback:function(t){e.$set(e.tableFrom,"sys_labels",t)},expression:"tableFrom.sys_labels"}},e._l(e.labelList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"会员价设置："}},[a("el-select",{staticClass:"selWidth",attrs:{placeholder:"请选择",clearable:""},on:{change:function(t){return e.getList(1)}},model:{value:e.tableFrom.svip_price_type,callback:function(t){e.$set(e.tableFrom,"svip_price_type",t)},expression:"tableFrom.svip_price_type"}},[a("el-option",{attrs:{label:"未设置",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"默认设置",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"自定义设置",value:"2"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"商品推荐："}},[a("el-select",{staticClass:"filter-item selWidth",attrs:{placeholder:"请选择",clearable:"",filterable:""},on:{change:function(t){return e.getList(1)}},model:{value:e.tableFrom.hot_type,callback:function(t){e.$set(e.tableFrom,"hot_type",t)},expression:"tableFrom.hot_type"}},e._l(e.recommendList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"商品类型："}},[a("el-select",{staticClass:"filter-item selWidth",attrs:{placeholder:"请选择",clearable:""},on:{change:function(t){return e.getList(1)}},model:{value:e.tableFrom.is_ficti,callback:function(t){e.$set(e.tableFrom,"is_ficti",t)},expression:"tableFrom.is_ficti"}},e._l(e.productTypeList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"商品搜索："}},[a("el-input",{staticClass:"selWidth",attrs:{placeholder:"请输入商品名称，关键字，产品编号"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getList(1)}},model:{value:e.tableFrom.keyword,callback:function(t){e.$set(e.tableFrom,"keyword",t)},expression:"tableFrom.keyword"}},[a("el-button",{staticClass:"el-button-solt",attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(t){return e.getList(1)}},slot:"append"})],1)],1)],1)],1)]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:"6"===e.tableFrom.type,expression:"tableFrom.type === '6'"}],attrs:{size:"mini",disabled:0==e.multipleSelection.length},on:{click:e.batch}},[e._v("批量审核")]),e._v(" "),a("el-button",{attrs:{size:"mini",disabled:0==e.multipleSelection.length},on:{click:e.batchOff}},[e._v("批量强制下架")]),e._v(" "),a("el-button",{attrs:{size:"mini",disabled:0==e.multipleSelection.length},on:{click:function(t){return e.batchShow(0)}}},[e._v("批量不显示")]),e._v(" "),a("el-button",{attrs:{size:"mini",disabled:0==e.multipleSelection.length},on:{click:function(t){return e.batchShow(1)}}},[e._v("批量显示")]),e._v(" "),a("el-button",{attrs:{disabled:0==e.multipleSelection.length,size:"mini"},on:{click:e.batchLabel}},[e._v("批量设置标签")]),e._v(" "),a("el-button",{attrs:{disabled:0==e.multipleSelection.length,size:"mini"},on:{click:e.batchRecommend}},[e._v("批量设置推荐")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData.data,size:"mini"},on:{"selection-change":e.handleSelectionChange}},[Number(e.tableFrom.type)<7?a("el-table-column",{key:"2",attrs:{type:"selection",width:"55"}}):e._e(),e._v(" "),a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"平台分类："}},[a("span",[e._v(e._s(t.row.storeCategory?t.row.storeCategory.cate_name:"-"))])]),e._v(" "),a("el-form-item",{attrs:{label:"商户类别："}},[t.row.merchant?a("span",{staticClass:"spBlock"},[e._v(e._s(t.row.merchant.is_trader?"自营":"非自营"))]):e._e()]),e._v(" "),a("el-form-item",{attrs:{label:"商品分类："}},[t.row.merCateId.length?e._l(t.row.merCateId,(function(t,s){return a("span",{key:s,staticClass:"mr10"},[e._v(e._s(t.category?t.category.cate_name:"-"))])})):a("span",[e._v("-")])],2),e._v(" "),a("el-form-item",{attrs:{label:"品牌："}},[a("span",[e._v(e._s(t.row.brand?t.row.brand.brand_name:"-"))])]),e._v(" "),a("el-form-item",{attrs:{label:"市场价格："}},[a("span",[e._v(e._s(e._f("filterEmpty")(t.row.ot_price)))])]),e._v(" "),a("el-form-item",{attrs:{label:"成本价："}},[a("span",[e._v(e._s(e._f("filterEmpty")(t.row.cost)))])]),e._v(" "),a("el-form-item",{attrs:{label:"收藏："}},[a("span",[e._v(e._s(e._f("filterEmpty")(t.row.care_count)))])]),e._v(" "),a("el-form-item",{attrs:{label:"已售数量："}},[a("span",[e._v(e._s(e._f("filterEmpty")(t.row.ficti)))])]),e._v(" "),a("el-form-item",{attrs:{label:"抵扣积分："}},[a("span",[e._v(e._s(t.row.integral_total))])]),e._v(" "),a("el-form-item",{attrs:{label:"积分抵扣金额："}},[a("span",[e._v(e._s(t.row.integral_price_total))])])],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"product_id",label:"ID","min-width":"50"}}),e._v(" "),a("el-table-column",{attrs:{label:"商品图","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("div",{staticClass:"demo-image__preview"},[a("el-image",{staticStyle:{width:"36px",height:"36px"},attrs:{src:e.row.image,"preview-src-list":[e.row.image]}})],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"store_name",label:"商品名称","min-width":"200"}}),e._v(" "),a("el-table-column",{attrs:{label:"商户名称","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.merchant?t.row.merchant.mer_name:""))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"mer_name",label:"商户类别","min-width":"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.merchant?a("span",{staticClass:"spBlock"},[e._v(e._s(t.row.merchant.is_trader?"自营":"非自营"))]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"商品售价","min-width":"90"}}),e._v(" "),a("el-table-column",{attrs:{prop:"svip_price",label:"会员价","min-width":"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.svip_price||"-"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"sales",label:"销量","min-width":"90"}}),e._v(" "),a("el-table-column",{attrs:{prop:"stock",label:"库存","min-width":"90"}}),e._v(" "),a("el-table-column",{attrs:{label:"推荐级别","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-rate",{attrs:{disabled:"",colors:e.colors},model:{value:t.row.star,callback:function(a){e.$set(t.row,"star",a)},expression:"scope.row.star"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"rank",label:"排序","min-width":"70"}}),e._v(" "),a("el-table-column",{attrs:{prop:"status",label:"是否显示","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-text":"显示","inactive-text":"隐藏"},on:{change:function(a){return e.onchangeIsShow(t.row)}},model:{value:t.row.is_used,callback:function(a){e.$set(t.row,"is_used",a)},expression:"scope.row.is_used"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"stock",label:"商品状态","min-width":"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("productStatusFilter")(t.row.us_status)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"stock",label:"标签","max-height":"120","min-width":"90","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.sys_labels,(function(t,s){return a("span",{key:s,staticClass:"label-list"},[e._v(e._s(t.name))])}))}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"create_time",label:"创建时间","min-width":"150"}}),e._v(" "),Number(e.tableFrom.type)<7?a("el-table-column",{key:"8",attrs:{label:"操作","min-width":"160",fixed:"right",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[Number(e.tableFrom.type)<7?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.onEdit(t.row.product_id)}}},[e._v("编辑")]):e._e(),e._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.handlePreview(t.row.product_id)}}},[e._v("预览")]),e._v(" "),5!=e.tableFrom.type?a("router-link",{attrs:{to:{path:e.roterPre+"/product/comment/?product_id="+t.row.product_id}}},[a("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"}},[e._v("查看评价")])],1):e._e(),e._v(" "),"5"!==e.tableFrom.type?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.onEditLabel(t.row)}}},[e._v("编辑标签")]):e._e(),e._v(" "),"6"===e.tableFrom.type||"1"===e.tableFrom.type?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.toVirtualSales(t.row.product_id)}}},[e._v("已售数量")]):e._e(),e._v(" "),"6"===e.tableFrom.type?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.toExamine(t.row.product_id)}}},[e._v("审核")]):e._e(),e._v(" "),Number(e.tableFrom.type)<3?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.toOff([t.row.product_id])}}},[e._v("强制下架")]):e._e()]}}],null,!1,2066833049)}):e._e()],1),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":e.tableFrom.limit,"current-page":e.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:e.tableData.total},on:{"size-change":e.handleSizeChange,"current-change":e.pageChange}})],1)],1),e._v(" "),a("info-from",{ref:"infoFrom",attrs:{"is-show":e.isShow,ids:e.OffId},on:{subSuccess:e.subSuccess}}),e._v(" "),a("el-dialog",{attrs:{title:"商品编辑",visible:e.dialogVisible,width:"1000px","before-close":e.handleClose,"append-to-body":e.append},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.fullscreenLoading,expression:"fullscreenLoading"}],ref:"formValidate",staticClass:"formValidate mt20",attrs:{rules:e.ruleValidate,model:e.formValidate,"label-width":"100px"},nativeOn:{submit:function(e){e.preventDefault()}}},[a("el-form-item",{attrs:{label:"商品名称：",prop:"store_name"}},[a("el-input",{attrs:{placeholder:"请输入商品名称"},model:{value:e.formValidate.store_name,callback:function(t){e.$set(e.formValidate,"store_name",t)},expression:"formValidate.store_name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"星级推荐："}},[a("el-rate",{staticClass:"rate_star",staticStyle:{"margin-top":"4px"},attrs:{colors:e.colors},model:{value:e.formValidate.star,callback:function(t){e.$set(e.formValidate,"star",t)},expression:"formValidate.star"}}),e._v(" "),a("span",{staticStyle:{"margin-top":"4px","font-size":"12px"}},[e._v("备注：5星为最高推荐级别，1星为最低推荐级别，设置后会在商城商品列表、搜索商品列表中体现。")])],1),e._v(" "),a("el-form-item",{attrs:{label:"商品推荐："}},[a("el-checkbox-group",{attrs:{size:"small"},on:{change:e.onChangeGroup},model:{value:e.checkboxGroup,callback:function(t){e.checkboxGroup=t},expression:"checkboxGroup"}},e._l(e.recommend,(function(t,s){return a("el-checkbox",{key:s,attrs:{label:t.value}},[e._v(e._s(t.name))])})),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"排序："}},[a("el-input-number",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入排序序号"},model:{value:e.formValidate.rank,callback:function(t){e.$set(e.formValidate,"rank",t)},expression:"formValidate.rank"}})],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"商品详情："}},[a("ueditor-from",{attrs:{content:e.formValidate.content},model:{value:e.formValidate.content,callback:function(t){e.$set(e.formValidate,"content",t)},expression:"formValidate.content"}})],1)],1),e._v(" "),a("el-form-item",{staticStyle:{"margin-top":"30px"}},[a("el-button",{staticClass:"submission",attrs:{type:"primary",size:"small"},on:{click:function(t){return e.handleSubmit("formValidate")}}},[e._v("提交")])],1)],1)],1),e._v(" "),e.previewVisible?a("div",[a("div",{staticClass:"bg",on:{click:function(t){t.stopPropagation(),e.previewVisible=!1}}}),e._v(" "),e.previewVisible?a("preview-box",{ref:"previewBox",attrs:{"goods-id":e.goodsId,"product-type":0,"preview-key":e.previewKey}}):e._e()],1):e._e(),e._v(" "),e.dialogLabel?a("el-dialog",{attrs:{title:"选择标签",visible:e.dialogLabel,width:"800px","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogLabel=t}}},[a("el-form",{ref:"labelForm",attrs:{model:e.labelForm},nativeOn:{submit:function(e){e.preventDefault()}}},[a("el-form-item",[a("el-select",{staticClass:"selWidth",attrs:{clearable:"",filterable:"",multiple:"",placeholder:"请选择"},model:{value:e.labelForm.sys_labels,callback:function(t){e.$set(e.labelForm,"sys_labels",t)},expression:"labelForm.sys_labels"}},e._l(e.labelList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("labelForm")}}},[e._v("提交")])],1)],1):e._e(),e._v(" "),e.dialogRecommend?a("el-dialog",{attrs:{title:"推荐设置",visible:e.dialogRecommend,width:"800px","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogRecommend=t}}},[a("el-form",{nativeOn:{submit:function(e){e.preventDefault()}}},[a("el-form-item",{attrs:{label:"商品推荐："}},[a("el-checkbox-group",{attrs:{size:"small"},on:{change:e.onChangeRecommend},model:{value:e.recommendGroup,callback:function(t){e.recommendGroup=t},expression:"recommendGroup"}},e._l(e.recommend,(function(t,s){return a("el-checkbox",{key:s,attrs:{label:t.value}},[e._v(e._s(t.name))])})),1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.submitRecommendForm}},[e._v("提交")])],1)],1):e._e()],1)},l=[],i=(a("c5f6"),a("6762"),a("2fdb"),a("c80c")),o=(a("96cf"),a("3b8d")),r=(a("7f7f"),a("c4c8")),n=a("83d6"),c=a("6461"),u=a("ef0d"),m=a("8c98"),p=[{name:"热门榜单",value:"is_hot"},{name:"促销单品",value:"is_benefit"},{name:"精品推荐",value:"is_best"},{name:"首发新品",value:"is_new"}],d={name:"ProductExamine1",components:{infoFrom:c["a"],ueditorFrom:u["a"],previewBox:m["a"]},data:function(){return{props:{emitPath:!1},ruleValidate:{store_name:[{required:!0,message:"请输入商品名称",trigger:"blur"}]},dialogVisible:!1,dialogRecommend:!1,append:!0,checkboxGroup:[],recommendGroup:[],colors:["#99A9BF","#F7BA2A","#FF9900"],recommendedLevelStatus:[{label:"全部",value:""},{label:"5星",value:5},{label:"4星",value:4},{label:"3星",value:3},{label:"2星",value:2},{label:"1星",value:1}],recommend:p,recommendList:[{name:"热门榜单",value:"hot"},{name:"促销单品",value:"good"},{name:"精品推荐",value:"best"},{name:"首发新品",value:"new"}],formValidate:{is_hot:0,is_best:0,is_new:0,is_benefit:0,ficti:0,is_ficti:"",content:"",store_name:"",rank:"",us_status:"",star:""},productStatusList:[{label:"上架显示",value:1},{label:"下架",value:0},{label:"平台关闭",value:-1}],productTypeList:[{label:"普通商品",value:0},{label:"虚拟商品",value:1},{label:"卡密商品",value:2}],fullscreenLoading:!1,isShow:!1,roterPre:n["roterPre"],listLoading:!0,tableData:{data:[],total:0},tableFrom:{page:1,limit:20,cate_id:"",sys_labels:"",pid:"",store_name:"",type:"6",mer_id:"",keyword:"",is_trader:"",hot_type:"",star:"",svip_price_type:"",product_id:this.$route.query.id?this.$route.query.id:""},categoryList:[],merCateList:[],multipleSelection:[],headeNum:[],merSelect:[],OffId:[],productId:0,tabClickIndex:"",previewVisible:!1,goodsId:"",previewKey:"",product_id:"",labelList:[],dialogLabel:!1,isBatch:!1,labelForm:{},recommendForm:{}}},mounted:function(){this.getMerSelect(),this.getList(""),this.getCategorySelect(),this.getLstFilterApi(),this.getLabelLst()},methods:{subSuccess:function(){this.getList(""),this.getLstFilterApi()},onchangeIsShow:function(e){var t=this;Object(r["x"])(e.product_id,e.is_used).then((function(e){var a=e.message;t.$message.success(a),t.getList(""),t.getLstFilterApi()})).catch((function(e){var a=e.message;t.$message.error(a)}))},handlePreview:function(e){this.previewVisible=!0,this.goodsId=e,this.previewKey=""},getLabelLst:function(){var e=this;Object(r["A"])().then((function(t){e.labelList=t.data})).catch((function(t){e.$message.error(t.message)}))},onEditLabel:function(e){if(this.dialogLabel=!0,this.product_id=e.product_id,e.sys_labels&&e.sys_labels.length){var t=e.sys_labels.map((function(e){return e.product_label_id}));this.labelForm={sys_labels:t}}else this.labelForm={sys_labels:[]}},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){e&&(t.isBatch?Object(r["j"])(t.labelForm).then((function(e){var a=e.message;t.$message.success(a),t.getList(""),t.dialogLabel=!1,t.isBatch=!1})).catch((function(e){t.$message.error(e.message)})):Object(r["Lb"])(t.product_id,t.labelForm).then((function(e){var a=e.message;t.$message.success(a),t.getList(""),t.dialogLabel=!1})).catch((function(e){t.$message.error(e.message)})))}))},batchRecommend:function(){this.dialogRecommend=!0,this.recommendGroup=[]},submitRecommendForm:function(){var e=this;this.recommendForm.ids=this.OffId,Object(r["l"])(this.recommendForm).then((function(t){var a=t.message;e.$message.success(a),e.getList(""),e.dialogRecommend=!1})).catch((function(t){e.$message.error(t.message)}))},getInfo:function(e){var t=this;this.fullscreenLoading=!0,this.checkboxGroup=[],Object(r["db"])(e).then((function(e){var a=e.data;t.formValidate={is_hot:a.is_hot,is_best:a.is_best,is_new:a.is_new,is_benefit:a.is_benefit,ficti:a.ficti,content:a.content,store_name:a.store_name,rank:a.rank,star:a.star},1===a.is_benefit&&t.checkboxGroup.push("is_benefit"),1===a.is_hot&&t.checkboxGroup.push("is_hot"),1===a.is_best&&t.checkboxGroup.push("is_best"),1===a.is_new&&t.checkboxGroup.push("is_new"),t.fullscreenLoading=!1,console.log(t.formValidate)})).catch((function(e){t.$message.error(e.message),t.fullscreenLoading=!1}))},onEdit:function(e){this.productId=e,this.getInfo(e),this.dialogVisible=!0},toVirtualSales:function(e){var t=this;this.$modalForm(Object(r["Gb"])(e)).then((function(){return t.getList("")}))},handleSubmit:function(e){var t=this;console.log(this.formValidate),this.$refs[e].validate((function(e){if(!e)return!1;Object(r["mb"])(t.productId,t.formValidate).then(function(){var e=Object(o["a"])(Object(i["a"])().mark((function e(a){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.fullscreenLoading=!1,t.$message.success(a.message),t.dialogVisible=!1,t.getList("");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.fullscreenLoading=!1,t.$message.error(e.message)}))}))},onChangeGroup:function(){this.checkboxGroup.includes("is_benefit")?this.formValidate.is_benefit=1:this.formValidate.is_benefit=0,this.checkboxGroup.includes("is_best")?this.formValidate.is_best=1:this.formValidate.is_best=0,this.checkboxGroup.includes("is_new")?this.formValidate.is_new=1:this.formValidate.is_new=0,this.checkboxGroup.includes("is_hot")?this.formValidate.is_hot=1:this.formValidate.is_hot=0},onChangeRecommend:function(){this.recommendForm.is_benefit=Number(this.recommendGroup.includes("is_benefit")),this.recommendForm.is_best=Number(this.recommendGroup.includes("is_best")),this.recommendForm.is_new=Number(this.recommendGroup.includes("is_new")),this.recommendForm.is_hot=Number(this.recommendGroup.includes("is_hot"))},handleClose:function(){this.dialogVisible=!1,this.dialogLabel=!1,this.dialogRecommend=!1},batchOff:function(){if(0===this.multipleSelection.length)return this.$message.warning("请先选择商品");this.toOff(this.OffId)},batchLabel:function(){this.labelForm={sys_labels:[],ids:this.OffId},this.isBatch=!0,this.dialogLabel=!0},batchShow:function(e){var t=this;if(0===this.multipleSelection.length)return this.$message.warning("请先选择商品");var a={status:e,ids:this.OffId};Object(r["k"])(a).then((function(e){t.$message.success(e.message),t.getList("")})).catch((function(e){t.$message.error(e.message)}))},toOff:function(e){var t=this;this.$prompt("强制下架",{confirmButtonText:"确定",cancelButtonText:"取消",inputErrorMessage:"请输入强制下架原因",inputType:"textarea",inputPlaceholder:"请输入强制下架原因",inputValidator:function(e){if(!e)return"请输入强制下架原因"}}).then((function(a){var s=a.value;Object(r["gb"])({id:e,status:-2,refusal:s}).then((function(e){t.$message({type:"success",message:"提交成功"}),t.getLstFilterApi(),t.getList("")})).catch((function(e){t.$message.error(e.message)}))})).catch((function(){t.$message({type:"info",message:"取消输入"})}))},getLstFilterApi:function(){var e=this;Object(r["N"])().then((function(t){e.headeNum=t.data})).catch((function(t){e.$message.error(t.message)}))},getMerSelect:function(){var e=this;Object(r["Q"])().then((function(t){e.merSelect=t.data})).catch((function(t){e.$message.error(t.message)}))},batch:function(){if(0===this.multipleSelection.length)return this.$message.warning("请先选择商品");this.$refs.infoFrom.dialogVisible=!0,this.isShow=!1},handleSelectionChange:function(e){this.multipleSelection=e;var t=[];this.multipleSelection.map((function(e){t.push(e.product_id)})),this.OffId=t},toExamine:function(e){this.$refs.infoFrom.dialogVisible=!0,this.isShow=!0,this.$refs.infoFrom.getInfo(e)},getCategorySelect:function(){var e=this;Object(r["w"])().then((function(t){e.merCateList=t.data})).catch((function(t){e.$message.error(t.message)}))},getList:function(e){var t=this;this.listLoading=!0,this.tableFrom.page=e||this.tableFrom.page,Object(r["fb"])(this.tableFrom).then((function(e){t.tableData.data=e.data.list,t.tableData.total=e.data.count,t.listLoading=!1})).catch((function(e){t.listLoading=!1,t.$message.error(e.message)}))},pageChange:function(e){this.tableFrom.page=e,this.getList("")},handleSizeChange:function(e){this.tableFrom.limit=e,this.getList("")}}},b=d,_=(a("8016"),a("2877")),f=Object(_["a"])(b,s,l,!1,null,"56288762",null);t["default"]=f.exports}}]);