(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-500ac1a2"],{"798e":function(t,e,n){"use strict";n("d485")},a7a4:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"k",(function(){return a})),n.d(e,"b",(function(){return o})),n.d(e,"e",(function(){return c})),n.d(e,"d",(function(){return s})),n.d(e,"f",(function(){return u})),n.d(e,"g",(function(){return l})),n.d(e,"j",(function(){return d})),n.d(e,"h",(function(){return f})),n.d(e,"c",(function(){return m})),n.d(e,"i",(function(){return g})),n.d(e,"l",(function(){return p})),n.d(e,"o",(function(){return v})),n.d(e,"m",(function(){return h})),n.d(e,"n",(function(){return y})),n.d(e,"p",(function(){return w}));var i=n("0c6d");function r(t){return i["a"].get("config/".concat(t))}function a(){return i["a"].get("delivery/station/business")}function o(t){return i["a"].post("delivery/station/create",t)}function c(t){return i["a"].get("delivery/station/lst",t)}function s(t){return i["a"].get("delivery/station/detail/".concat(t))}function u(t){return i["a"].get("delivery/station/mark/".concat(t,"/form"))}function l(t,e){return i["a"].post("delivery/station/status/".concat(t),e)}function d(){return i["a"].get("config")}function f(t,e){return i["a"].post("delivery/station/update/".concat(t),e)}function m(t){return i["a"].delete("delivery/station/delete/".concat(t))}function g(){return i["a"].get("delivery/station/getCity")}function p(t){return i["a"].post("service/reply/create",t)}function v(t,e){return i["a"].get("service/reply/list",{page:t,limit:e})}function h(t){return i["a"].delete("service/reply/delete/".concat(t))}function y(t,e){return i["a"].post("service/reply/update/".concat(t),e)}function w(t,e){return i["a"].post("service/reply/status/".concat(t),{status:e})}},d485:function(t,e,n){},f478:function(t,e,n){"use strict";n.d(e,"f",(function(){return r})),n.d(e,"e",(function(){return a})),n.d(e,"d",(function(){return o})),n.d(e,"c",(function(){return c})),n.d(e,"b",(function(){return s})),n.d(e,"l",(function(){return u})),n.d(e,"k",(function(){return l})),n.d(e,"h",(function(){return d})),n.d(e,"g",(function(){return f})),n.d(e,"i",(function(){return m})),n.d(e,"j",(function(){return g})),n.d(e,"a",(function(){return p}));var i=n("0c6d");function r(t){return i["a"].get("diy/product/lst",t)}function a(t,e){return i["a"].post("diy/create/".concat(t),e)}function o(t){return i["a"].get("diy/lst",t)}function c(t){return i["a"].get("diy/detail/".concat(t))}function s(t,e){return i["a"].delete("diy/delete/".concat(t),e)}function u(t){return i["a"].post("diy/status/".concat(t))}function l(t){return i["a"].get("diy/recovery/".concat(t))}function d(t){return i["a"].get("diy/link/lst",t)}function f(t){return i["a"].get("diy/get_routine_code/".concat(t))}function m(){return i["a"].get("diy/categroy/options")}function g(t,e){return i["a"].get("diy/link/getLinks/".concat(t),e)}function p(t){return i["a"].get("diy/copy/".concat(t))}},f672:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"divBox"},[n("el-row",{staticClass:"ivu-mt box-wrapper"},[n("el-col",{staticClass:"right-wrapper"},[0==t.cardShow?n("el-card",[0==t.cardShow?n("el-row",[t.isDiy?n("el-col",{staticStyle:{width:"310px",height:"550px","margin-right":"30px",position:"relative"}},[n("iframe",{ref:"iframe",staticClass:"iframe-box",attrs:{src:t.imgUrl,frameborder:"0"}}),t._v(" "),n("div",{staticClass:"mask"})]):t._e(),t._v(" "),n("el-col",{class:t.isDiy?"table":""},[n("div",{staticClass:"acea-row row-between-wrapper"},[n("el-row",{attrs:{type:"flex"}},[n("el-col",[n("div",{staticClass:"acea-row row-between-wrapper"},[n("div",{staticClass:"button acea-row row-middle"},[n("el-button",{staticStyle:{"font-size":"12px"},attrs:{type:"primary",size:"small"},on:{click:t.add}},[n("i",{staticClass:"el-icon-plus",staticStyle:{"margin-right":"4px"}}),t._v("添加")])],1),t._v(" "),n("div",{staticStyle:{color:"rgb(246, 44, 44)","font-size":"13px"}},[t._v("  注：初次进入该页面，可直接添加商城首页模板，也可先复制默认模板，再编辑默认模板保存后设为首页。")])])])],1)],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"table",staticClass:"tables",attrs:{data:t.list,size:"mini",border:""}},[n("el-table-column",{attrs:{prop:"id",label:"页面ID","min-width":"80"}}),t._v(" "),n("el-table-column",{attrs:{prop:"name",label:"模板名称","min-width":"100"}}),t._v(" "),n("el-table-column",{attrs:{prop:"add_time",label:"添加时间","min-width":"100"}}),t._v(" "),n("el-table-column",{attrs:{prop:"update_time",label:"更新时间","min-width":"100"}}),t._v(" "),n("el-table-column",{attrs:{label:"操作","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[(e.row.status||e.row.is_diy)&&0==e.row.is_default?n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.edit(e.row)}}},[t._v("编辑")]):t._e(),t._v(" "),1!=e.row.id&&e.row.is_diy&&0==e.row.is_default?n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.del(e.row.id,e.$index)}}},[t._v("删除")]):t._e(),t._v(" "),1!=e.row.status?n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.setStatus(e.row,e.$index)}}},[t._v("设为首页")]):t._e(),t._v(" "),e.row.is_diy?t._e():n("div",{staticStyle:{display:"inline-block"}},[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.recovery(e.row,e.$index)}}},[t._v("恢复初始设置")]),t._v(" "),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.del(e.row,e.$index)}}},[t._v("删除")])],1),t._v(" "),e.row.status||e.row.is_diy?n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.onDiyCopy(e.row)}}},[t._v("复制")]):t._e()]}}],null,!1,1878188763)})],1),t._v(" "),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":t.diyFrom.limit,"current-page":t.diyFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)],1)],1):t._e()],1):t._e()],1)],1),t._v(" "),n("el-dialog",{attrs:{visible:t.modal,title:"预览"},on:{"update:visible":function(e){t.modal=e}}},[n("div",[n("div",{directives:[{name:"viewer",rawName:"v-viewer"}],staticClass:"acea-row row-around code"},[n("div",{staticClass:"acea-row row-column-around row-between-wrapper"},[n("div",{ref:"qrCodeUrl",staticClass:"QRpic"}),t._v(" "),n("span",{staticClass:"mt10"},[t._v("公众号二维码")])]),t._v(" "),n("div",{staticClass:"acea-row row-column-around row-between-wrapper"},[n("div",{staticClass:"QRpic"},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.qrcodeImg,expression:"qrcodeImg"}]})]),t._v(" "),n("span",{staticClass:"mt10"},[t._v("小程序二维码")])])])])])],1)},r=[],a=n("c80c"),o=(n("96cf"),n("3b8d")),c=n("db72"),s=n("bbcc"),u=n("83d6"),l=(n("b311"),n("f478")),d=n("a7a4"),f=n("2f62"),m=n("d044"),g=n.n(m),p={name:"devise_list",computed:Object(c["a"])({},Object(f["d"])("layout",["menuCollapse"])),components:{},data:function(){return{grid:{sm:10,md:12,lg:19},loading:!1,theme3:"light",roterPre:u["roterPre"],list:[],imgUrl:"",modal:!1,BaseURL:s["a"].httpUrl||"http://localhost:8080",cardShow:0,loadingExist:!1,isDiy:1,qrcodeImg:"",diyFrom:{page:1,limit:20},total:0,mer_id:""}},created:function(){this.getMerId(),this.getList()},mounted:function(){},methods:{getChildData:function(t){this.loadingExist=t},getMerId:function(){var t=this,e=window.localStorage;this.imgUrl=e.getItem("imgUrl"),Object(d["j"])().then((function(n){t.mer_id=n.data.mer_id;var i=1e3*(new Date).getTime(),r="".concat(t.BaseURL,"/pages/store/home/index?id=").concat(t.mer_id,"&inner_frame=1&time=").concat(i);e.setItem("imgUrl",r),t.imgUrl=r})).catch((function(e){t.$message.error(e.message)}))},onCopy:function(){this.$message.success("复制预览链接成功")},onError:function(){this.$mssage.error("复制预览链接失败")},creatQrCode:function(t,e){this.$refs.qrCodeUrl.innerHTML="";var n="";if(e)n="".concat(this.BaseURL,"/pages/index/index?inner_frame=1");else{var i=1e3*(new Date).getTime();n="".concat(this.BaseURL,"/pages/index/index?inner_frame=1&time=").concat(i)}new g.a(this.$refs.qrCodeUrl,{text:n,width:160,height:160,colorDark:"#000000",colorLight:"#ffffff",correctLevel:g.a.CorrectLevel.H})},routineCode:function(t){var e=this;Object(l["g"])(t).then((function(t){e.qrcodeImg=t.data.image})).catch((function(t){e.$message.error(t)}))},preview:function(t){this.modal=!0,this.creatQrCode(t.id,t.status),this.routineCode(t.id)},getList:function(){var t=this;this.loading=!0,Object(l["d"])(this.diyFrom).then((function(e){t.loading=!1;var n=e.data;t.list=n.list,t.total=n.count}))},pageChange:function(t){this.diyFrom.page=t,this.getList()},handleSizeChange:function(t){this.diyFrom.limit=t,this.getList()},edit:function(t){this.$router.push({path:"".concat(u["roterPre"],"/devise/diy/index"),query:{id:t.id,name:t.template_name||"moren"}})},add:function(){this.$router.push({path:"".concat(u["roterPre"],"/devise/diy/index"),query:{id:0,name:"首页",types:1}})},del:function(t,e){var n=this;this.$modalSure("删除模板吗").then((function(){Object(l["b"])(t).then((function(t){var e=t.message;n.$message.success(e),n.getList()})).catch((function(t){var e=t.message;n.$message.error(e)}))}))},setStatus:function(){var t=Object(o["a"])(Object(a["a"])().mark((function t(e){var n;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=this,n.$modalSure("把该模板设为首页").then((function(){Object(l["l"])(e.id).then((function(t){n.$message.success(t.message),n.getList()})).catch((function(t){n.$message.error(t.message)}))}));case 2:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),recovery:function(t){var e=this;Object(l["k"])(t.id).then((function(t){e.$message.success(t.message),e.getList()}))},onDiyCopy:function(t){var e=this;Object(l["a"])(t.id).then((function(){e.getList()})).catch((function(t){e.$message.error(t.message)}))}}},v=p,h=(n("798e"),n("2877")),y=Object(h["a"])(v,i,r,!1,null,"789b5337",null);e["default"]=y.exports}}]);