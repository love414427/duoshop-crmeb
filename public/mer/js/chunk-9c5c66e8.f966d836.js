(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9c5c66e8"],{"0fde":function(e,t,a){},"10e4":function(e,t,a){"use strict";a("0fde")},1988:function(e,t,a){"use strict";a("b6cd")},"504c":function(e,t,a){var i=a("9e1e"),r=a("0d58"),s=a("6821"),l=a("52a7").f;e.exports=function(e){return function(t){var a,n=s(t),o=r(n),c=o.length,u=0,d=[];while(c>u)a=o[u++],i&&!l.call(n,a)||d.push(e?[a,n[a]]:n[a]);return d}}},7719:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.dialogVisible?a("el-dialog",{attrs:{title:"商品信息",visible:e.dialogVisible,width:"1200px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",{staticClass:"divBox"},[a("div",{staticClass:"header clearfix"},[a("div",{staticClass:"container"},[a("el-form",{attrs:{size:"small",inline:"","label-width":"100px"}},[a("el-form-item",{staticClass:"width100",attrs:{label:"商品分类："}},[a("el-select",{staticClass:"filter-item selWidth mr20",attrs:{placeholder:"请选择",clearable:""},on:{change:function(t){return e.getList()}},model:{value:e.tableFrom.mer_cate_id,callback:function(t){e.$set(e.tableFrom,"mer_cate_id",t)},expression:"tableFrom.mer_cate_id"}},e._l(e.merCateList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),a("el-form-item",{staticClass:"width100",attrs:{label:"商品搜索："}},[a("el-input",{staticClass:"selWidth",attrs:{placeholder:"请输入商品名称，关键字，产品编号",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getList(t)}},model:{value:e.tableFrom.keyword,callback:function(t){e.$set(e.tableFrom,"keyword",t)},expression:"tableFrom.keyword"}},[a("el-button",{staticClass:"el-button-solt",attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getList},slot:"append"})],1)],1)],1)],1)]),e._v(" "),e.resellShow?a("el-alert",{attrs:{title:"注：添加为预售商品后，原普通商品会下架；如该商品已开启其它营销活动，请勿选择！",type:"warning","show-icon":""}}):e._e(),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:e.tableData.data,size:"mini"}},[a("el-table-column",{attrs:{width:"55"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-radio",{attrs:{label:t.row.product_id},nativeOn:{change:function(a){return e.getTemplateRow(t.row)}},model:{value:e.templateRadio,callback:function(t){e.templateRadio=t},expression:"templateRadio"}},[e._v(" ")])]}}],null,!1,3465899556)}),e._v(" "),a("el-table-column",{attrs:{prop:"product_id",label:"ID","min-width":"50"}}),e._v(" "),a("el-table-column",{attrs:{label:"商品图","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("div",{staticClass:"demo-image__preview"},[a("el-image",{staticStyle:{width:"36px",height:"36px"},attrs:{src:e.row.image,"preview-src-list":[e.row.image]}})],1)]}}],null,!1,2331550732)}),e._v(" "),a("el-table-column",{attrs:{prop:"store_name",label:"商品名称","min-width":"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"stock",label:"库存","min-width":"80"}})],1),e._v(" "),a("div",{staticClass:"block mb20"},[a("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":e.tableFrom.limit,"current-page":e.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:e.tableData.total},on:{"size-change":e.handleSizeChange,"current-change":e.pageChange}})],1)],1)]):e._e()},r=[],s=a("c4c8"),l=a("83d6"),n={name:"GoodsList",props:{resellShow:{type:Boolean,default:!1},isSeckill:{type:Boolean,default:!1}},data:function(){return{dialogVisible:!1,templateRadio:0,merCateList:[],roterPre:l["roterPre"],listLoading:!0,tableData:{data:[],total:0},tableFrom:{page:1,limit:20,cate_id:"",store_name:"",keyword:"",is_gift_bag:0,status:1,is_action:this.isSeckill?"":1},multipleSelection:{},checked:[]}},mounted:function(){var e=this;this.getList(),this.getCategorySelect(),window.addEventListener("unload",(function(t){return e.unloadHandler(t)}))},methods:{getTemplateRow:function(e){this.multipleSelection={src:e.image,id:e.product_id},this.dialogVisible=!1,this.$emit("getProduct",this.multipleSelection)},getCategorySelect:function(){var e=this;Object(s["r"])().then((function(t){e.merCateList=t.data})).catch((function(t){e.$message.error(t.message)}))},getList:function(){var e=this;this.listLoading=!0,Object(s["y"])(this.tableFrom).then((function(t){e.tableData.data=t.data.list,e.tableData.total=t.data.count,e.listLoading=!1})).catch((function(t){e.listLoading=!1,e.$message.error(t.message)}))},pageChange:function(e){this.tableFrom.page=e,this.getList()},handleSizeChange:function(e){this.tableFrom.limit=e,this.getList()}}},o=n,c=(a("1988"),a("2877")),u=Object(c["a"])(o,i,r,!1,null,"4e2da16a",null);t["a"]=u.exports},8615:function(e,t,a){var i=a("5ca1"),r=a("504c")(!1);i(i.S,"Object",{values:function(e){return r(e)}})},b6cd:function(e,t,a){},e538:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"divBox"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("el-steps",{attrs:{active:e.currentTab,"align-center":"","finish-status":"success"}},[a("el-step",{attrs:{title:"选择助力商品"}}),e._v(" "),a("el-step",{attrs:{title:"填写基础信息"}}),e._v(" "),a("el-step",{attrs:{title:"修改商品详情"}})],1)],1),e._v(" "),a("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.fullscreenLoading,expression:"fullscreenLoading"}],ref:"formValidate",staticClass:"formValidate mt20",attrs:{rules:e.ruleValidate,model:e.formValidate,"label-width":"120px"},nativeOn:{submit:function(e){e.preventDefault()}}},[a("div",{directives:[{name:"show",rawName:"v-show",value:0===e.currentTab,expression:"currentTab === 0"}],staticStyle:{overflow:"hidden"}},[a("el-row",{attrs:{gutter:24}},[a("el-col",e._b({},"el-col",e.grid2,!1),[a("el-form-item",{attrs:{label:"选择商品：",prop:"image"}},[a("div",{staticClass:"upLoadPicBox",on:{click:function(t){return e.add()}}},[e.formValidate.image?a("div",{staticClass:"pictrue"},[a("img",{attrs:{src:e.formValidate.image}})]):a("div",{staticClass:"upLoad"},[a("i",{staticClass:"el-icon-camera cameraIconfont"})])])])],1)],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:1===e.currentTab,expression:"currentTab === 1"}]},[a("el-row",{attrs:{gutter:24}},[a("el-col",e._b({},"el-col",e.grid2,!1),[a("el-form-item",{attrs:{label:"商品主图：",prop:"image"}},[a("div",{staticClass:"upLoadPicBox",on:{click:function(t){return e.modalPicTap("1")}}},[e.formValidate.image?a("div",{staticClass:"pictrue"},[a("img",{attrs:{src:e.formValidate.image}})]):a("div",{staticClass:"upLoad"},[a("i",{staticClass:"el-icon-camera cameraIconfont"})])])])],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"商品轮播图：",prop:"slider_image"}},[a("div",{staticClass:"acea-row"},[e._l(e.formValidate.slider_image,(function(t,i){return a("div",{key:i,staticClass:"pictrue",attrs:{draggable:"false"},on:{dragstart:function(a){return e.handleDragStart(a,t)},dragover:function(a){return a.preventDefault(),e.handleDragOver(a,t)},dragenter:function(a){return e.handleDragEnter(a,t)},dragend:function(a){return e.handleDragEnd(a,t)}}},[a("img",{attrs:{src:t}}),e._v(" "),a("i",{staticClass:"el-icon-error btndel",on:{click:function(t){return e.handleRemove(i)}}})])})),e._v(" "),e.formValidate.slider_image.length<10?a("div",{staticClass:"upLoadPicBox",on:{click:function(t){return e.modalPicTap("2")}}},[a("div",{staticClass:"upLoad"},[a("i",{staticClass:"el-icon-camera cameraIconfont"})])]):e._e()],2)])],1),e._v(" "),a("el-col",{staticClass:"sp100"},[a("el-form-item",{attrs:{label:"商品名称：",prop:"store_name"}},[a("el-input",{attrs:{placeholder:"请输入商品名称"},model:{value:e.formValidate.store_name,callback:function(t){e.$set(e.formValidate,"store_name",t)},expression:"formValidate.store_name"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:24}},[a("el-col",{staticClass:"sp100"},[a("el-form-item",{attrs:{label:"助力活动简介：",prop:"store_info"}},[a("el-input",{attrs:{type:"textarea",rows:3,placeholder:"请输入助力活动简介"},model:{value:e.formValidate.store_info,callback:function(t){e.$set(e.formValidate,"store_info",t)},expression:"formValidate.store_info"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:24}},[a("el-col",e._b({},"el-col",e.grid2,!1),[a("el-form-item",{attrs:{label:"活动时间：",required:""}},[a("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},on:{change:e.onchangeTime},model:{value:e.assist_date,callback:function(t){e.assist_date=t},expression:"assist_date"}})],1)],1),e._v(" "),a("el-col",e._b({},"el-col",e.grid2,!1),[a("el-form-item",{attrs:{label:"助力人数：",prop:"assist_count"}},[a("el-input-number",{attrs:{min:1,placeholder:"请输入人数"},model:{value:e.formValidate.assist_count,callback:function(t){e.$set(e.formValidate,"assist_count",e._n(t))},expression:"formValidate.assist_count"}})],1)],1),e._v(" "),a("el-col",e._b({},"el-col",e.grid2,!1),[a("el-form-item",{attrs:{label:"用户助力次数：",prop:"assist_user_count"}},[a("el-input-number",{attrs:{min:1,placeholder:"请输入次数"},model:{value:e.formValidate.assist_user_count,callback:function(t){e.$set(e.formValidate,"assist_user_count",e._n(t))},expression:"formValidate.assist_user_count"}})],1)],1),e._v(" "),a("el-col",e._b({},"el-col",e.grid2,!1),[a("el-form-item",{attrs:{label:"单位：",prop:"unit_name"}},[a("el-input",{staticStyle:{width:"250px"},attrs:{placeholder:"请输入单位"},model:{value:e.formValidate.unit_name,callback:function(t){e.$set(e.formValidate,"unit_name",t)},expression:"formValidate.unit_name"}})],1)],1),e._v(" "),a("el-col",e._b({},"el-col",e.grid2,!1),[a("el-form-item",{attrs:{label:"排序："}},[a("el-input-number",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入排序序号"},model:{value:e.formValidate.sort,callback:function(t){e.$set(e.formValidate,"sort",t)},expression:"formValidate.sort"}})],1)],1),e._v(" "),a("el-col",e._b({},"el-col",e.grid2,!1),[a("el-form-item",{attrs:{label:"限购："}},[a("el-input-number",{attrs:{min:1,placeholder:"请输入限购数"},model:{value:e.formValidate.pay_count,callback:function(t){e.$set(e.formValidate,"pay_count",t)},expression:"formValidate.pay_count"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:24}},[a("el-col",e._b({},"el-col",e.grid2,!1),[a("el-form-item",{attrs:{label:"活动状态："}},[a("el-radio-group",{model:{value:e.formValidate.is_show,callback:function(t){e.$set(e.formValidate,"is_show",t)},expression:"formValidate.is_show"}},[a("el-radio",{staticClass:"radio",attrs:{label:0}},[e._v("关闭")]),e._v(" "),a("el-radio",{attrs:{label:1}},[e._v("开启")])],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"送货方式：",prop:"delivery_way"}},[a("div",{staticClass:"acea-row"},[a("el-checkbox-group",{model:{value:e.formValidate.delivery_way,callback:function(t){e.$set(e.formValidate,"delivery_way",t)},expression:"formValidate.delivery_way"}},e._l(e.deliveryList,(function(t){return a("el-checkbox",{key:t.value,attrs:{label:t.value}},[e._v("\n                    "+e._s(t.name)+"\n                  ")])})),1)],1)])],1),e._v(" "),(2==e.formValidate.delivery_way.length||1==e.formValidate.delivery_way.length&&2==e.formValidate.delivery_way[0])&&0==e.formValidate.type?a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"是否包邮："}},[a("el-radio-group",{model:{value:e.formValidate.delivery_free,callback:function(t){e.$set(e.formValidate,"delivery_free",t)},expression:"formValidate.delivery_free"}},[a("el-radio",{staticClass:"radio",attrs:{label:0}},[e._v("否")]),e._v(" "),a("el-radio",{attrs:{label:1}},[e._v("是")])],1)],1)],1):e._e(),e._v(" "),0==e.formValidate.delivery_free&&(2==e.formValidate.delivery_way.length||1==e.formValidate.delivery_way.length&&2==e.formValidate.delivery_way[0])&&0==e.formValidate.type?a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"运费模板：",prop:"temp_id"}},[a("div",{staticClass:"acea-row"},[a("el-select",{staticClass:"selWidthd mr20",attrs:{placeholder:"请选择"},model:{value:e.formValidate.temp_id,callback:function(t){e.$set(e.formValidate,"temp_id",t)},expression:"formValidate.temp_id"}},e._l(e.shippingList,(function(e){return a("el-option",{key:e.shipping_template_id,attrs:{label:e.name,value:e.shipping_template_id}})})),1),e._v(" "),a("el-button",{staticClass:"mr15",attrs:{size:"small"},on:{click:e.addTem}},[e._v("添加运费模板")])],1)])],1):e._e(),e._v(" "),e.labelList.length?a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"商品标签："}},[a("el-select",{staticClass:"selWidthd",attrs:{multiple:"",placeholder:"请选择"},model:{value:e.formValidate.mer_labels,callback:function(t){e.$set(e.formValidate,"mer_labels",t)},expression:"formValidate.mer_labels"}},e._l(e.labelList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1):e._e()],1),e._v(" "),a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{xl:24,lg:24,md:24,sm:24,xs:24}},[0===e.formValidate.spec_type?a("el-form-item",[a("el-table",{staticClass:"tabNumWidth",attrs:{data:e.OneattrValue,border:"",size:"mini"}},[a("el-table-column",{attrs:{align:"center",label:"图片","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"upLoadPicBox"},[e.formValidate.image?a("div",{staticClass:"pictrue tabPic"},[a("img",{attrs:{src:t.row.image}})]):a("div",{staticClass:"upLoad tabPic"},[a("i",{staticClass:"el-icon-camera cameraIconfont"})])])]}}],null,!1,1903352531)}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"市场价","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row["price"]))])]}}],null,!1,1703924291)}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"助力价","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{staticClass:"priceBox",attrs:{type:"number",min:0,max:t.row["price"]},on:{blur:function(a){return e.limitPrice(t.row)}},model:{value:t.row["assist_price"],callback:function(a){e.$set(t.row,"assist_price",a)},expression:"scope.row['assist_price']"}})]}}],null,!1,2747857572)}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"成本价","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row["cost"]))])]}}],null,!1,4236060069)}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"库存","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row["old_stock"]))])]}}],null,!1,1655454038)}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"限量","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{staticClass:"priceBox",attrs:{type:"number",max:t.row["old_stock"],min:0},model:{value:t.row["stock"],callback:function(a){e.$set(t.row,"stock",a)},expression:"scope.row['stock']"}})]}}],null,!1,1088110974)}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"商品编号","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row["bar_code"]))])]}}],null,!1,2057585133)}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"重量（KG）","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row["weight"]))])]}}],null,!1,1649766542)}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"体积（m³）","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row["volume"]))])]}}],null,!1,2118841126)})],1)],1):e._e()],1)],1),e._v(" "),a("el-row",{attrs:{gutter:24}},[1===e.formValidate.spec_type?a("el-form-item",{staticClass:"labeltop",attrs:{label:"规格列表："}},[a("el-table",{ref:"multipleTable",attrs:{data:e.ManyAttrValue,"tooltip-effect":"dark","highlight-current-row":"","row-key":function(e){return e.id}}},[a("el-table-column",{attrs:{label:"选择",width:"65"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-radio",{attrs:{label:t.$index},nativeOn:{change:function(a){return e.getCurrentRow(t.row)}},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}})]}}],null,!1,4056121160)}),e._v(" "),e.manyTabDate?e._l(e.manyTabDate,(function(t,i){return a("el-table-column",{key:i,attrs:{align:"center",label:e.manyTabTit[i].title,"min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"priceBox",domProps:{textContent:e._s(t.row[i])}})]}}],null,!0)})})):e._e(),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"图片","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("div",{staticClass:"upLoadPicBox"},[e.row.image?a("div",{staticClass:"pictrue tabPic"},[a("img",{attrs:{src:e.row.image}})]):a("div",{staticClass:"upLoad tabPic"},[a("i",{staticClass:"el-icon-camera cameraIconfont"})])])]}}],null,!1,2631442157)}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"市场价","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row["price"]))])]}}],null,!1,1703924291)}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"助力价","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{staticClass:"priceBox",attrs:{type:"number",min:0,max:t.row["price"]},model:{value:t.row["assist_price"],callback:function(a){e.$set(t.row,"assist_price",a)},expression:" scope.row['assist_price']"}})]}}],null,!1,544898518)}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"成本价","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row["cost"]))])]}}],null,!1,4236060069)}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"库存","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row["old_stock"]))])]}}],null,!1,1655454038)}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"限量","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{staticClass:"priceBox",attrs:{type:"number",min:0,max:t.row["old_stock"]},model:{value:t.row["stock"],callback:function(a){e.$set(t.row,"stock",a)},expression:"scope.row['stock']"}})]}}],null,!1,1335772286)}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"商品编号","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row["bar_code"]))])]}}],null,!1,2057585133)}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"重量（KG）","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row["weight"]))])]}}],null,!1,1649766542)}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"体积（m³）","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row["volume"]))])]}}],null,!1,2118841126)})],2)],1):e._e()],1)],1),e._v(" "),a("el-row",{directives:[{name:"show",rawName:"v-show",value:2===e.currentTab,expression:"currentTab === 2"}]},[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"商品详情："}},[a("ueditorFrom",{attrs:{content:e.formValidate.content},model:{value:e.formValidate.content,callback:function(t){e.$set(e.formValidate,"content",t)},expression:"formValidate.content"}})],1)],1)],1),e._v(" "),a("el-form-item",{staticStyle:{"margin-top":"30px"}},[a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.currentTab>0,expression:"currentTab>0"}],staticClass:"submission",attrs:{type:"primary",size:"small"},on:{click:e.handleSubmitUp}},[e._v("上一步")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:0==e.currentTab,expression:"currentTab == 0"}],staticClass:"submission",attrs:{type:"primary",size:"small"},on:{click:function(t){return e.handleSubmitNest1("formValidate")}}},[e._v("下一步")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:1==e.currentTab,expression:"currentTab == 1"}],staticClass:"submission",attrs:{type:"primary",size:"small"},on:{click:function(t){return e.handleSubmitNest2("formValidate")}}},[e._v("下一步")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:2===e.currentTab,expression:"currentTab===2"}],staticClass:"submission",attrs:{loading:e.loading,type:"primary",size:"small"},on:{click:function(t){return e.handleSubmit("formValidate")}}},[e._v("提交")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:2===e.currentTab,expression:"currentTab===2"}],staticClass:"submission",attrs:{loading:e.loading,type:"primary",size:"small"},on:{click:function(t){return e.handlePreview("formValidate")}}},[e._v("预览")])],1)],1)],1),e._v(" "),a("goods-list",{ref:"goodsList",on:{getProduct:e.getProduct}}),e._v(" "),e.previewVisible?a("div",[a("div",{staticClass:"bg",on:{click:function(t){t.stopPropagation(),e.previewVisible=!1}}}),e._v(" "),e.previewVisible?a("preview-box",{ref:"previewBox",attrs:{"preview-key":e.previewKey}}):e._e()],1):e._e()],1)},r=[],s=a("75fc"),l=(a("7f7f"),a("c80c")),n=(a("c5f6"),a("96cf"),a("3b8d")),o=a("2d63"),c=(a("8615"),a("55dd"),a("ac6a"),a("6762"),a("2fdb"),a("ef0d")),u=a("6625"),d=a.n(u),m=a("7719"),p=a("8c98"),f=a("c4c8"),_=a("83d6"),g=a("bbcc"),h=a("5f87"),b={product_id:"",image:"",slider_image:[],store_name:"",store_info:"",start_day:"",end_day:"",start_time:"",end_time:"",is_open_recommend:1,is_open_state:1,is_show:1,keyword:"",brand_id:"",pay_count:1,unit_name:"",assist_user_count:1,assist_count:2,integral:0,is_good:0,temp_id:"",assist_date:"",delivery_way:[],mer_labels:[],delivery_free:0,attrValue:[{image:"",price:null,assist_price:null,cost:null,ot_price:null,old_stock:null,stock:null,bar_code:"",weight:null,volume:null}],attr:[],extension_type:0,content:"",spec_type:0,is_gift_bag:0},v=[{name:"店铺推荐",value:"is_good"}],y={name:"AssistProductAdd",components:{ueditorFrom:c["a"],goodsList:m["a"],previewBox:p["a"],VueUeditorWrap:d.a},data:function(){var e=g["a"].https+"/upload/image/0/file?ueditor=1&token="+Object(h["a"])();return{radio:"",multipleTable:[],myConfig:{autoHeightEnabled:!1,initialFrameHeight:500,initialFrameWidth:"100%",UEDITOR_HOME_URL:"/UEditor/",serverUrl:e,imageUrl:e,imageFieldName:"file",imageUrlPrefix:"",imageActionName:"upfile",imageMaxSize:2048e3,imageAllowFiles:[".png",".jpg",".jpeg",".gif",".bmp"]},pickerOptions:{disabledDate:function(e){}},dialogVisible:!1,product_id:"",optionsCate:{value:"store_category_id",label:"cate_name",children:"children",emitPath:!1},roterPre:_["roterPre"],selectRule:"",checkboxGroup:[],recommend:v,tabs:[],fullscreenLoading:!1,props:{emitPath:!1},propsMer:{emitPath:!1,multiple:!0},active:0,OneattrValue:[Object.assign({},b.attrValue[0])],ManyAttrValue:[Object.assign({},b.attrValue[0])],ruleList:[],merCateList:[],categoryList:[],shippingList:[],deliveryList:[],labelList:[],BrandList:[],formValidate:Object.assign({},b),timeVal:"",assist_date:"",maxStock:"",addNum:0,singleSpecification:{},multipleSpecifications:[],formDynamics:{template_name:"",template_value:[]},manyTabTit:{},manyTabDate:{},grid2:{lg:10,md:12,sm:24,xs:24},formDynamic:{attrsName:"",attrsVal:""},isBtn:!1,manyFormValidate:[],images:[],currentTab:0,isChoice:"",grid:{xl:8,lg:8,md:12,sm:24,xs:24},loading:!1,ruleValidate:{store_name:[{required:!0,message:"请输入商品名称",trigger:"blur"}],assist_date:[{required:!0,message:"请选择助力活动时间",trigger:"blur"}],keyword:[{required:!0,message:"请输入商品关键字",trigger:"blur"}],unit_name:[{required:!0,message:"请输入单位",trigger:"blur"}],assist_user_count:[{required:!0,message:"请输入助力人数",trigger:"blur",type:"number"}],assist_count:[{required:!0,message:"请输入助力次数",trigger:"blur"}],store_info:[{required:!0,message:"请输入秒杀活动简介",trigger:"blur"}],temp_id:[{required:!0,message:"请选择运费模板",trigger:"change"}],image:[{required:!0,message:"请上传商品图",trigger:"change"}],slider_image:[{required:!0,message:"请上传商品轮播图",type:"array",trigger:"change"}],delivery_way:[{required:!0,message:"请选择送货方式",trigger:"change"}]},attrInfo:{},keyNum:0,extensionStatus:0,previewVisible:!1,previewKey:"",deliveryType:[]}},computed:{attrValue:function(){var e=Object.assign({},b.attrValue[0]);return delete e.image,e},oneFormBatch:function(){var e=[Object.assign({},b.attrValue[0])];return delete e[0].bar_code,e}},watch:{"formValidate.attr":{handler:function(e){1===this.formValidate.spec_type&&this.watCh(e)},immediate:!1,deep:!0}},created:function(){this.tempRoute=Object.assign({},this.$route)},mounted:function(){var e=this;this.formValidate.slider_image=[],this.$route.params.id?(this.setTagsViewTitle(),this.getInfo(this.$route.params.id),this.currentTab=1):(this.formValidate.attr.map((function(t){e.$set(t,"inputVisible",!1)})),this.productCon()),this.getCategorySelect(),this.getCategoryList(),this.getShippingList(),this.getLabelLst(),this.$store.dispatch("settings/setEdit",!0)},methods:{getLabelLst:function(){var e=this;Object(f["x"])().then((function(t){e.labelList=t.data})).catch((function(t){e.$message.error(t.message)}))},productCon:function(){var e=this;Object(f["Z"])().then((function(t){e.deliveryType=t.data.delivery_way.map(String);var a=0==e.formValidate.type?"快递配送":"虚拟发货";2==e.deliveryType.length?2==e.formValidate.type?e.deliveryList=[{value:"2",name:a}]:e.deliveryList=[{value:"1",name:"到店自提"},{value:"2",name:a}]:1==e.deliveryType.length&&"1"==e.deliveryType[0]&&2!=e.formValidate.type?e.deliveryList=[{value:"1",name:"到店自提"}]:(e.deliveryList=[{value:"2",name:a}],e.formValidate.delivery_way=["2"])})).catch((function(t){e.$message.error(t.message)}))},getCurrentRow:function(e){e.checked=!0,this.multipleTable=e,this.formValidate.attrValue=[e]},limitPrice:function(e){e.assist_price-e.price>0?e.assist_price=e.price:e.assist_price<0&&(e.assist_price=0)},add:function(){this.$refs.goodsList.dialogVisible=!0},getProduct:function(e){this.formValidate.image=e.src,this.product_id=e.id,console.log(this.product_id)},onchangeTime:function(e){this.assist_date=e,console.log(this.moment(e[0]).format("YYYY-MM-DD HH:mm:ss")),this.formValidate.start_time=e?this.moment(e[0]).format("YYYY-MM-DD HH:mm:ss"):"",this.formValidate.end_time=e?this.moment(e[1]).format("YYYY-MM-DD HH:mm:ss"):""},setTagsViewTitle:function(){var e="编辑商品",t=Object.assign({},this.tempRoute,{title:"".concat(e,"-").concat(this.$route.params.id)});this.$store.dispatch("tagsView/updateVisitedView",t)},onChangeGroup:function(){this.checkboxGroup.includes("is_good")?this.formValidate.is_good=1:this.formValidate.is_good=0},watCh:function(e){var t=this,a={},i={};this.formValidate.attr.forEach((function(e,t){a["value"+t]={title:e.value},i["value"+t]=""})),this.ManyAttrValue.forEach((function(e,a){var i=Object.values(e.detail).sort().join("/");t.attrInfo[i]&&(t.ManyAttrValue[a]=t.attrInfo[i])})),this.attrInfo={},this.ManyAttrValue.forEach((function(e){t.attrInfo[Object.values(e.detail).sort().join("/")]=e})),this.manyTabTit=a,this.manyTabDate=i},addTem:function(){var e=this;this.$modalTemplates(0,(function(){e.getShippingList()}))},getCategorySelect:function(){var e=this;Object(f["r"])().then((function(t){e.merCateList=t.data})).catch((function(t){e.$message.error(t.message)}))},getCategoryList:function(){var e=this;Object(f["q"])().then((function(t){e.categoryList=t.data})).catch((function(t){e.$message.error(t.message)}))},productGetRule:function(){var e=this;Object(f["Qb"])().then((function(t){e.ruleList=t.data}))},getShippingList:function(){var e=this;Object(f["zb"])().then((function(t){e.shippingList=t.data}))},delAttrTable:function(e){this.ManyAttrValue.splice(e,1)},batchAdd:function(){var e,t=Object(o["a"])(this.ManyAttrValue);try{for(t.s();!(e=t.n()).done;){var a=e.value;this.$set(a,"image",this.oneFormBatch[0].image),this.$set(a,"price",this.oneFormBatch[0].price),this.$set(a,"cost",this.oneFormBatch[0].cost),this.$set(a,"ot_price",this.oneFormBatch[0].ot_price),this.$set(a,"stock",this.oneFormBatch[0].stock),this.$set(a,"bar_code",this.oneFormBatch[0].bar_code),this.$set(a,"weight",this.oneFormBatch[0].weight),this.$set(a,"volume",this.oneFormBatch[0].volume),this.$set(a,"extension_one",this.oneFormBatch[0].extension_one),this.$set(a,"extension_two",this.oneFormBatch[0].extension_two)}}catch(i){t.e(i)}finally{t.f()}},getInfo:function(e){var t=this;this.fullscreenLoading=!0,this.$route.params.id?Object(f["f"])(e).then(function(){var e=Object(n["a"])(Object(l["a"])().mark((function e(a){var i;return Object(l["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:i=a.data,t.formValidate={type:i.type,product_id:i.product_id,image:i.product.image,slider_image:i.product.slider_image,store_name:i.store_name,store_info:i.store_info,assist_count:i.assist_count?i.assist_count:2,assist_user_count:i.assist_user_count?i.assist_user_count:1,start_time:i.start_time?i.start_time+":00":"",end_time:i.end_time?i.end_time+":00":"",brand_id:i.product.brand_id,pay_count:i.pay_count?i.pay_count:1,unit_name:i.product.unit_name,is_good:i.product.is_good,temp_id:i.product.temp_id,is_show:i.is_show,attr:i.product.attr,sort:i.product.sort,extension_type:i.extension_type,content:i.product.content.content,spec_type:i.product.spec_type,is_gift_bag:i.product.is_gift_bag,delivery_way:i.product.delivery_way&&i.product.delivery_way.length?i.product.delivery_way.map(String):t.deliveryType,delivery_free:i.product.delivery_free?i.product.delivery_free:0,mer_labels:i.mer_labels&&i.mer_labels.length?i.mer_labels.map(Number):[]},0===t.formValidate.spec_type?(t.OneattrValue=i.product.attrValue,t.$set(t.OneattrValue[0],"assist_price",t.OneattrValue[0].assistSku&&t.OneattrValue[0].assistSku.assist_price?t.OneattrValue[0].assistSku.assist_price:0),t.$set(t.OneattrValue[0],"stock",t.OneattrValue[0].assistSku?t.OneattrValue[0].assistSku.stock:t.OneattrValue[0].old_stock)):(t.ManyAttrValue=i.product.attrValue,t.ManyAttrValue.forEach((function(e,a){t.attrInfo[Object.values(e.detail).sort().join("/")]=e,t.$set(t.ManyAttrValue[a],"assist_price",t.ManyAttrValue[a].assistSku&&t.ManyAttrValue[a].assistSku.assist_price?t.ManyAttrValue[a].assistSku.assist_price:0),t.$set(t.ManyAttrValue[a],"stock",t.ManyAttrValue[a].assistSku?t.ManyAttrValue[a].assistSku.stock:t.ManyAttrValue[a].old_stock),t.ManyAttrValue[a].assistSku&&t.$nextTick((function(){t.radio=a,t.$refs.multipleTable.setCurrentRow(t.ManyAttrValue[a]),t.formValidate.attrValue=[t.ManyAttrValue[a]]}))}))),1===t.formValidate.is_good&&t.checkboxGroup.push("is_good"),t.fullscreenLoading=!1,t.assist_date=[i.start_time,i.end_time],t.$store.dispatch("settings/setEdit",!0),t.productCon();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.fullscreenLoading=!1,t.$message.error(e.message)})):Object(f["fb"])(e).then(function(){var e=Object(n["a"])(Object(l["a"])().mark((function e(a){var i;return Object(l["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:i=a.data,t.formValidate={type:i.type,product_id:i.product_id,image:i.image,slider_image:i.slider_image,store_name:i.store_name,store_info:i.store_info,assist_count:i.assist_count?i.assist_count:2,assist_user_count:i.assist_user_count?i.assist_user_count:1,start_time:i.start_time?i.start_time+":00":"",end_time:i.end_time?i.end_time+":00":"",brand_id:i.brand_id,pay_count:i.pay_count?i.pay_count:1,unit_name:i.unit_name,is_good:i.is_good,temp_id:i.temp_id,is_show:i.is_show,attr:i.attr,sort:i.sort?i.sort:0,extension_type:i.extension_type,content:i.content,spec_type:i.spec_type,is_gift_bag:i.is_gift_bag,delivery_way:i.delivery_way&&i.delivery_way.length?i.delivery_way.map(String):t.deliveryType,delivery_free:i.delivery_free?i.delivery_free:0,mer_labels:i.mer_labels&&i.mer_labels.length?i.mer_labels.map(Number):[]},t.assist_date="",0===t.formValidate.spec_type?(t.OneattrValue=i.attrValue,t.OneattrValue.assist_price=t.OneattrValue.assist_price?t.OneattrValue.assist_price:0):(t.ManyAttrValue=i.attrValue,t.ManyAttrValue.forEach((function(e,a){t.attrInfo[Object.values(e.detail).sort().join("/")]=e,t.$set(t.ManyAttrValue[a],"assist_price",0)}))),1===t.formValidate.is_good&&t.checkboxGroup.push("is_good"),t.fullscreenLoading=!1,t.productCon();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.fullscreenLoading=!1,t.$message.error(e.message)}))},handleRemove:function(e){this.formValidate.slider_image.splice(e,1)},modalPicTap:function(e,t,a){var i=this,r=[];this.$modalUpload((function(s){"1"!==e||t||(i.formValidate.image=s[0],i.OneattrValue[0].image=s[0]),"2"!==e||t||s.map((function(e){r.push(e.attachment_src),i.formValidate.slider_image.push(e),i.formValidate.slider_image.length>10&&(i.formValidate.slider_image.length=10)})),"1"===e&&"dan"===t&&(i.OneattrValue[0].image=s[0]),"1"===e&&"duo"===t&&(i.ManyAttrValue[a].image=s[0]),"1"===e&&"pi"===t&&(i.oneFormBatch[0].image=s[0])}),e)},handleSubmitUp:function(){this.currentTab--<0&&(this.currentTab=0)},handleSubmitNest1:function(e){this.formValidate.image?(this.currentTab++,this.$route.params.id||this.getInfo(this.product_id)):this.$message.warning("请选择商品！")},handleSubmitNest2:function(e){var t=this;0===this.formValidate.spec_type&&(this.formValidate.attrValue=this.OneattrValue),this.$refs[e].validate((function(e){if(e){if(!t.formValidate.store_name||!t.formValidate.store_info||!t.formValidate.image||!t.formValidate.slider_image)return void t.$message.warning("请填写完整商品信息！");if(!t.formValidate.attrValue||0===t.formValidate.attrValue.length)return void t.$message.warning("请选择商品规格！");t.currentTab++}}))},handlePreview:function(e){var t=this;Object(f["e"])(this.formValidate).then(function(){var e=Object(n["a"])(Object(l["a"])().mark((function e(a){return Object(l["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.previewVisible=!0,t.previewKey=a.data.preview_key;case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.$message.error(e.message)}))},handleSubmit:function(e){var t=this;this.$refs[e].validate((function(a){a?(t.$store.dispatch("settings/setEdit",!1),t.fullscreenLoading=!0,t.loading=!0,t.$route.params.id?Object(f["i"])(t.$route.params.id,t.formValidate).then(function(){var a=Object(n["a"])(Object(l["a"])().mark((function a(i){return Object(l["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.fullscreenLoading=!1,t.$message.success(i.message),t.$router.push({path:t.roterPre+"/marketing/assist/list"}),t.$refs[e].resetFields(),t.formValidate.slider_image=[],t.loading=!1;case 6:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()).catch((function(e){t.fullscreenLoading=!1,t.loading=!1,t.$message.error(e.message)})):Object(f["a"])(t.formValidate).then(function(){var a=Object(n["a"])(Object(l["a"])().mark((function a(i){return Object(l["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.fullscreenLoading=!1,t.$message.success(i.message),t.$router.push({path:t.roterPre+"/marketing/assist/list"}),t.$refs[e].resetFields(),t.formValidate.slider_image=[],t.loading=!1;case 6:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()).catch((function(e){t.fullscreenLoading=!1,t.loading=!1,t.$message.error(e.message)}))):t.formValidate.store_name&&t.formValidate.store_info&&t.formValidate.image&&t.formValidate.slider_image||t.$message.warning("请填写完整商品信息！")}))},validate:function(e,t,a){!1===t&&this.$message.warning(a)},handleDragStart:function(e,t){this.dragging=t},handleDragEnd:function(e,t){this.dragging=null},handleDragOver:function(e){e.dataTransfer.dropEffect="move"},handleDragEnter:function(e,t){if(e.dataTransfer.effectAllowed="move",t!==this.dragging){var a=Object(s["a"])(this.formValidate.slider_image),i=a.indexOf(this.dragging),r=a.indexOf(t);a.splice.apply(a,[r,0].concat(Object(s["a"])(a.splice(i,1)))),this.formValidate.slider_image=a}}}},w=y,V=(a("10e4"),a("2877")),k=Object(V["a"])(w,i,r,!1,null,"347aa207",null);t["default"]=k.exports}}]);