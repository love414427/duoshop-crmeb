(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-62ffca4c"],{"0b65":function(t,e,n){"use strict";e["a"]={shortcuts:[{text:"今天",onClick:function(t){var e=new Date,n=new Date;n.setTime(new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate())),t.$emit("pick",[n,e])}},{text:"昨天",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.setTime(new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate()-1))),e.setTime(e.setTime(new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate()-1))),t.$emit("pick",[n,e])}},{text:"最近7天",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-6048e5),t.$emit("pick",[n,e])}},{text:"最近30天",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-2592e6),t.$emit("pick",[n,e])}},{text:"本月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.setTime(new Date((new Date).getFullYear(),(new Date).getMonth(),1))),t.$emit("pick",[n,e])}},{text:"本年",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.setTime(new Date((new Date).getFullYear(),0,1))),t.$emit("pick",[n,e])}}]}},4128:function(t,e,n){},"865f":function(t,e,n){"use strict";n("4128")},a160:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"divBox"},[n("el-card",{staticClass:"box-card"},[n("div",{staticClass:"container"},[n("el-form",{ref:"tableFrom",attrs:{model:t.tableFrom,size:"small","label-width":"90px",inline:!0}},[n("el-form-item",{attrs:{label:"创建时间：",prop:"date"}},[n("el-date-picker",{staticClass:"selWidth",attrs:{"value-format":"yyyy/MM/dd",align:"right","unlink-panels":"",format:"yyyy/MM/dd",size:"small",type:"daterange",placement:"bottom-end",placeholder:"自定义时间","picker-options":t.pickerOptions},on:{change:t.onchangeTime},model:{value:t.timeVal,callback:function(e){t.timeVal=e},expression:"timeVal"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"上架状态：",prop:"status"}},[n("el-select",{staticClass:"filter-item selWidth",attrs:{placeholder:"请选择",clearable:""},on:{change:function(e){return t.getList(1)}},model:{value:t.tableFrom.is_used,callback:function(e){t.$set(t.tableFrom,"is_used",e)},expression:"tableFrom.is_used"}},[n("el-option",{attrs:{label:"上架",value:1}}),t._v(" "),n("el-option",{attrs:{label:"下架",value:0}})],1)],1),t._v(" "),n("el-form-item",{attrs:{label:"商品搜索："}},[n("el-input",{staticClass:"selWidth",attrs:{placeholder:"请输入商品名称/ID",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.getList(1)}},model:{value:t.tableFrom.keyword,callback:function(e){t.$set(t.tableFrom,"keyword",e)},expression:"tableFrom.keyword"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.getList(1)}}},[t._v("查询")]),t._v(" "),n("el-button",{attrs:{size:"small"},on:{click:function(e){return t.reset("tableFrom")}}},[t._v("重置")])],1)],1)],1),t._v(" "),n("router-link",{attrs:{to:{path:t.roterPre+"/marketing/integral/addProduct"}}},[n("el-button",{attrs:{size:"small",type:"primary"}},[t._v("添加积分商品")])],1),t._v(" "),n("el-button",{attrs:{size:"small",type:"success"},on:{click:function(e){return t.quickAdd()}}},[t._v("快速添加")]),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticClass:"mt20",staticStyle:{width:"100%"},attrs:{data:t.tableData.data,size:"small","highlight-current-row":""}},[n("el-table-column",{attrs:{prop:"product_id",label:"ID","min-width":"50"}}),t._v(" "),n("el-table-column",{attrs:{"min-width":"100",label:"商品图片"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("el-image",{staticStyle:{width:"36px",height:"36px"},attrs:{src:t.row.image}})]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"store_name",label:"商品标题","min-width":"150"}}),t._v(" "),n("el-table-column",{attrs:{prop:"ot_price",label:"兑换积分","min-width":"100"}}),t._v(" "),n("el-table-column",{attrs:{prop:"price",label:"兑换金额","min-width":"100"}}),t._v(" "),n("el-table-column",{attrs:{prop:"stock",label:"库存","min-width":"80"}}),t._v(" "),n("el-table-column",{attrs:{prop:"sales",label:"已兑换数量","min-width":"100"}}),t._v(" "),n("el-table-column",{attrs:{prop:"create_time","min-width":"200",label:"创建时间"}}),t._v(" "),n("el-table-column",{attrs:{prop:"sort","min-width":"120",label:"排序"}}),t._v(" "),n("el-table-column",{attrs:{label:"状态","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-text":"上架","inactive-text":"下架"},nativeOn:{click:function(n){return t.onchangeIsShow(e.row)}},model:{value:e.row.is_used,callback:function(n){t.$set(e.row,"is_used",n)},expression:"scope.row.is_used"}})]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作","min-width":"180",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("router-link",{attrs:{to:{path:t.roterPre+"/marketing/integral/orderList?id="+e.row.product_id}}},[n("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"}},[t._v("兑换记录")])],1),t._v(" "),n("router-link",{attrs:{to:{path:t.roterPre+"/marketing/integral/addProduct/"+e.row.product_id}}},[n("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"}},[t._v("编辑")])],1),t._v(" "),n("router-link",{attrs:{to:{path:t.roterPre+"/marketing/integral/addProduct/"+e.row.product_id+"?type=2"}}},[n("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"}},[t._v("复制")])],1),t._v(" "),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.handleDelete(e.row.product_id,e.$index)}}},[t._v("删除")])]}}])})],1),t._v(" "),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":t.tableFrom.limit,"current-page":t.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.total},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)],1),t._v(" "),n("goods-list",{ref:"goodsList",on:{getProduct:t.getProduct}})],1)},o=[],a=n("b7be"),i=n("83d6"),c=n("0b65"),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.dialogVisible?n("el-dialog",{attrs:{title:"商品信息",visible:t.dialogVisible,width:"1000px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("div",{staticClass:"divBox"},[n("div",{staticClass:"header clearfix"},[n("div",{staticClass:"container"},[n("el-form",{attrs:{size:"small",inline:"","label-width":"100px"}},[n("el-form-item",{staticClass:"width100",attrs:{label:"商品分类："}},[n("el-cascader",{attrs:{options:t.merCateList,props:{checkStrictly:!0,emitPath:!1},clearable:""},on:{change:function(e){return t.getList(1)}},model:{value:t.tableFrom.pid,callback:function(e){t.$set(t.tableFrom,"pid",e)},expression:"tableFrom.pid"}})],1),t._v(" "),n("el-form-item",{staticClass:"width100",attrs:{label:"商品搜索："}},[n("el-input",{attrs:{placeholder:"请输入商品名称，关键字，编号",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.getList(e)}},model:{value:t.tableFrom.keyword,callback:function(e){t.$set(t.tableFrom,"keyword",e)},expression:"tableFrom.keyword"}},[n("el-button",{staticClass:"el-button-solt",attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(e){return t.getList(1)}},slot:"append"})],1)],1)],1)],1)]),t._v(" "),t.resellShow?n("el-alert",{attrs:{title:"注：添加为预售商品后，原普通商品会下架；如该商品已开启其它营销活动，请勿选择！",type:"warning","show-icon":""}}):t._e(),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:t.tableData.data,size:"mini"}},[n("el-table-column",{attrs:{width:"55"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-radio",{attrs:{label:e.row.product_id},nativeOn:{change:function(n){return t.getTemplateRow(e.row)}},model:{value:t.templateRadio,callback:function(e){t.templateRadio=e},expression:"templateRadio"}},[t._v(" ")])]}}],null,!1,3465899556)}),t._v(" "),n("el-table-column",{attrs:{prop:"product_id",label:"ID","min-width":"50"}}),t._v(" "),n("el-table-column",{attrs:{label:"商品图","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("div",{staticClass:"demo-image__preview"},[n("el-image",{staticStyle:{width:"36px",height:"36px"},attrs:{src:t.row.image,"preview-src-list":[t.row.image]}})],1)]}}],null,!1,2331550732)}),t._v(" "),n("el-table-column",{attrs:{prop:"store_name",label:"商品名称","min-width":"150"}}),t._v(" "),n("el-table-column",{attrs:{prop:"stock",label:"库存","min-width":"80"}})],1),t._v(" "),n("div",{staticClass:"block mb20"},[n("el-pagination",{attrs:{"page-sizes":[10,20,40],"page-size":t.tableFrom.limit,"current-page":t.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.total},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)],1)]):t._e()},s=[],l=n("c4c8"),d={name:"GoodsList",props:{resellShow:{type:Boolean,default:!1}},data:function(){return{dialogVisible:!1,templateRadio:0,merCateList:[],roterPre:i["roterPre"],listLoading:!0,tableData:{data:[],total:0},tableFrom:{page:1,limit:10,cate_id:"",store_name:"",keyword:"",type:1,is_gift_bag:0},multipleSelection:{},checked:[]}},mounted:function(){var t=this;this.getList(),this.getCategorySelect(),window.addEventListener("unload",(function(e){return t.unloadHandler(e)}))},methods:{getTemplateRow:function(t){this.multipleSelection={src:t.image,id:t.product_id},this.dialogVisible=!1,this.$emit("getProduct",this.multipleSelection)},getCategorySelect:function(){var t=this;Object(l["w"])().then((function(e){t.merCateList=e.data})).catch((function(e){t.$message.error(e.message)}))},getList:function(t){var e=this;this.listLoading=!0,this.tableFrom.page=t||this.tableFrom.page,Object(l["P"])(this.tableFrom).then((function(t){e.tableData.data=t.data.list,e.tableData.total=t.data.count,e.listLoading=!1})).catch((function(t){e.listLoading=!1,e.$message.error(t.message)}))},pageChange:function(t){this.tableFrom.page=t,this.getList()},handleSizeChange:function(t){this.tableFrom.limit=t,this.getList()}}},f=d,p=n("2877"),g=Object(p["a"])(f,u,s,!1,null,"ccf7d0ac",null),m=g.exports,b={name:"integralProduct",components:{goodsList:m},data:function(){return{props:{multiple:!1,emitPath:!1},Loading:!1,dialogVisible:!1,roterPre:i["roterPre"],listLoading:!0,receiveType:0,id:"",categoryList:[],labelList:[],tableData:{data:[],total:0},tableFrom:{page:1,limit:20,keyword:"",is_used:"",date:""},type:0,isShow:!1,pickerOptions:c["a"],timeVal:[]}},mounted:function(){this.getList(1)},methods:{quickAdd:function(){this.$refs.goodsList.dialogVisible=!0},getProduct:function(t){this.$router.push({path:this.roterPre+"/marketing/integral/addProduct/".concat(t.id,"?type=1")})},onchangeTime:function(t){this.timeVal=t,this.tableFrom.date=t?this.timeVal.join("-"):"",this.tableFrom.page=1,this.getList()},reset:function(t){this.timeVal=[],this.tableFrom={page:1,limit:20,keyword:"",is_used:"",date:""},this.getList("")},handleDelete:function(t,e){var n=this;this.$modalSureDelete("删除积分商品后将无法恢复，请谨慎操作!").then((function(){Object(a["nb"])(t).then((function(t){var e=t.message;n.$message.success(e),n.getList("")})).catch((function(t){var e=t.message;n.$message.error(e)}))}))},getList:function(t){var e=this;this.listLoading=!0,this.tableFrom.page=t||this.tableFrom.page,Object(a["pb"])(this.tableFrom).then((function(t){e.tableData.data=t.data.list,e.tableData.total=t.data.count,e.listLoading=!1})).catch((function(t){e.listLoading=!1,e.$message.error(t.message)}))},pageChange:function(t){this.tableFrom.page=t,this.getList("")},handleSizeChange:function(t){this.tableFrom.limit=t,this.getList("")},onchangeIsShow:function(t){var e=this;Object(a["rb"])(t.product_id,t.is_used).then((function(t){var n=t.message;e.$message.success(n),e.getList("")})).catch((function(t){var n=t.message;e.$message.error(n)}))}}},h=b,v=(n("865f"),Object(p["a"])(h,r,o,!1,null,"77938f22",null));e["default"]=v.exports},b7be:function(t,e,n){"use strict";n.d(e,"Fb",(function(){return o})),n.d(e,"Eb",(function(){return a})),n.d(e,"Ab",(function(){return i})),n.d(e,"zb",(function(){return c})),n.d(e,"yb",(function(){return u})),n.d(e,"Bb",(function(){return s})),n.d(e,"Cb",(function(){return l})),n.d(e,"Db",(function(){return d})),n.d(e,"N",(function(){return f})),n.d(e,"I",(function(){return p})),n.d(e,"J",(function(){return g})),n.d(e,"L",(function(){return m})),n.d(e,"K",(function(){return b})),n.d(e,"sb",(function(){return h})),n.d(e,"H",(function(){return v})),n.d(e,"o",(function(){return w})),n.d(e,"u",(function(){return _})),n.d(e,"m",(function(){return k})),n.d(e,"l",(function(){return y})),n.d(e,"n",(function(){return D})),n.d(e,"tb",(function(){return x})),n.d(e,"ub",(function(){return L})),n.d(e,"Pb",(function(){return C})),n.d(e,"r",(function(){return F})),n.d(e,"q",(function(){return z})),n.d(e,"v",(function(){return S})),n.d(e,"a",(function(){return $})),n.d(e,"Ob",(function(){return P})),n.d(e,"Lb",(function(){return T})),n.d(e,"Nb",(function(){return O})),n.d(e,"Kb",(function(){return V})),n.d(e,"Mb",(function(){return j})),n.d(e,"Hb",(function(){return M})),n.d(e,"Qb",(function(){return E})),n.d(e,"p",(function(){return I})),n.d(e,"t",(function(){return R})),n.d(e,"s",(function(){return Y})),n.d(e,"F",(function(){return B})),n.d(e,"x",(function(){return q})),n.d(e,"A",(function(){return A})),n.d(e,"B",(function(){return J})),n.d(e,"z",(function(){return N})),n.d(e,"C",(function(){return W})),n.d(e,"G",(function(){return H})),n.d(e,"E",(function(){return K})),n.d(e,"D",(function(){return G})),n.d(e,"w",(function(){return Q})),n.d(e,"y",(function(){return U})),n.d(e,"M",(function(){return X})),n.d(e,"eb",(function(){return Z})),n.d(e,"db",(function(){return tt})),n.d(e,"Jb",(function(){return et})),n.d(e,"W",(function(){return nt})),n.d(e,"Sb",(function(){return rt})),n.d(e,"T",(function(){return ot})),n.d(e,"R",(function(){return at})),n.d(e,"S",(function(){return it})),n.d(e,"Ib",(function(){return ct})),n.d(e,"O",(function(){return ut})),n.d(e,"f",(function(){return st})),n.d(e,"e",(function(){return lt})),n.d(e,"d",(function(){return dt})),n.d(e,"c",(function(){return ft})),n.d(e,"b",(function(){return pt})),n.d(e,"P",(function(){return gt})),n.d(e,"k",(function(){return mt})),n.d(e,"i",(function(){return bt})),n.d(e,"h",(function(){return ht})),n.d(e,"j",(function(){return vt})),n.d(e,"g",(function(){return wt})),n.d(e,"Z",(function(){return _t})),n.d(e,"X",(function(){return kt})),n.d(e,"bb",(function(){return yt})),n.d(e,"Y",(function(){return Dt})),n.d(e,"ab",(function(){return xt})),n.d(e,"Q",(function(){return Lt})),n.d(e,"qb",(function(){return Ct})),n.d(e,"pb",(function(){return Ft})),n.d(e,"nb",(function(){return zt})),n.d(e,"rb",(function(){return St})),n.d(e,"V",(function(){return $t})),n.d(e,"mb",(function(){return Pt})),n.d(e,"ob",(function(){return Tt})),n.d(e,"lb",(function(){return Ot})),n.d(e,"hb",(function(){return Vt})),n.d(e,"jb",(function(){return jt})),n.d(e,"ib",(function(){return Mt})),n.d(e,"cb",(function(){return Et})),n.d(e,"U",(function(){return It})),n.d(e,"fb",(function(){return Rt})),n.d(e,"kb",(function(){return Yt})),n.d(e,"gb",(function(){return Bt}));var r=n("0c6d");function o(t){return r["a"].get("/store/coupon/platformLst",t)}function a(t){return r["a"].get("/store/coupon/update/".concat(t,"/form"))}function i(t){return r["a"].get("/store/coupon/show/".concat(t))}function c(t){return r["a"].delete("store/coupon/delete/".concat(t))}function u(t){return r["a"].get("/store/coupon/sys/clone/".concat(t,"/form"))}function s(t){return r["a"].get("store/coupon/sys/issue",t)}function l(t,e){return r["a"].get("store/coupon/show_lst/".concat(t),e)}function d(t){return r["a"].get("/store/coupon/send/lst",t)}function f(t){return r["a"].post("store/coupon/send",t)}function p(t){return r["a"].get("store/coupon/detail/".concat(t))}function g(t){return r["a"].get("store/coupon/lst",t)}function m(t,e){return r["a"].post("store/coupon/status/".concat(t),{status:e})}function b(){return r["a"].get("store/coupon/create/form")}function h(t){return r["a"].get("store/coupon/issue",t)}function v(t){return r["a"].delete("store/coupon/delete/".concat(t))}function w(t){return r["a"].get("broadcast/room/lst",t)}function _(t,e){return r["a"].post("broadcast/room/status/".concat(t),e)}function k(t){return r["a"].delete("broadcast/room/delete/".concat(t))}function y(t){return r["a"].get("broadcast/room/apply/form/".concat(t))}function D(t){return r["a"].get("broadcast/room/detail/".concat(t))}function x(t,e){return r["a"].post("broadcast/room/feedsPublic/".concat(t),{status:e})}function L(t,e){return r["a"].post("broadcast/room/comment/".concat(t),{status:e})}function C(t,e){return r["a"].post("broadcast/room/closeKf/".concat(t),{status:e})}function F(t){return r["a"].get("broadcast/goods/lst",t)}function z(t){return r["a"].get("broadcast/goods/detail/".concat(t))}function S(t,e){return r["a"].post("broadcast/goods/status/".concat(t),e)}function $(t){return r["a"].get("broadcast/goods/apply/form/".concat(t))}function P(){return r["a"].get("seckill/config/create/form")}function T(t){return r["a"].get("seckill/config/lst",t)}function O(t){return r["a"].get("seckill/config/update/".concat(t,"/form"))}function V(t){return r["a"].delete("seckill/config/delete/".concat(t))}function j(t,e){return r["a"].post("seckill/config/status/".concat(t),{status:e})}function M(t,e){return r["a"].get("seckill/product/detail/".concat(t),e)}function E(t,e){return r["a"].get("broadcast/room/goods/".concat(t),e)}function I(t){return r["a"].delete("broadcast/goods/delete/".concat(t))}function R(t,e){return r["a"].post("broadcast/room/sort/".concat(t),e)}function Y(t,e){return r["a"].post("broadcast/goods/sort/".concat(t),e)}function B(t){return r["a"].post("config/others/group_buying",t)}function q(){return r["a"].get("config/others/group_buying")}function A(t){return r["a"].get("store/product/group/lst",t)}function J(t){return r["a"].get("store/product/group/get/".concat(t))}function N(t){return r["a"].get("store/product/group/detail/".concat(t))}function W(t){return r["a"].post("store/product/group/status",t)}function H(t,e){return r["a"].post("store/product/group/is_show/".concat(t),{status:e})}function K(t){return r["a"].get("store/product/group/get/".concat(t))}function G(t,e){return r["a"].post("store/product/group/update/".concat(t),e)}function Q(t){return r["a"].get("store/product/group/buying/lst",t)}function U(t,e){return r["a"].get("store/product/group/buying/detail/".concat(t),e)}function X(t,e){return r["a"].get("store/coupon/product/".concat(t),e)}function Z(){return r["a"].get("user/integral/title")}function tt(t){return r["a"].get("user/integral/lst",t)}function et(t){return r["a"].get("user/integral/excel",t)}function nt(){return r["a"].get("user/integral/config")}function rt(t){return r["a"].post("user/integral/config",t)}function ot(t){return r["a"].get("discounts/lst",t)}function at(t,e){return r["a"].post("discounts/status/".concat(t),{status:e})}function it(t){return r["a"].get("discounts/detail/".concat(t))}function ct(t){return r["a"].get("marketing/spu/lst",t)}function ut(t){return r["a"].post("activity/atmosphere/create",t)}function st(t,e){return r["a"].post("activity/atmosphere/update/".concat(t),e)}function lt(t){return r["a"].get("activity/atmosphere/lst",t)}function dt(t){return r["a"].get("activity/atmosphere/detail/".concat(t))}function ft(t,e){return r["a"].post("activity/atmosphere/status/".concat(t),{status:e})}function pt(t){return r["a"].delete("activity/atmosphere/delete/".concat(t))}function gt(t){return r["a"].post("activity/border/create",t)}function mt(t,e){return r["a"].post("activity/border/update/".concat(t),e)}function bt(t){return r["a"].get("activity/border/lst",t)}function ht(t){return r["a"].get("activity/border/detail/".concat(t))}function vt(t,e){return r["a"].post("activity/border/status/".concat(t),{status:e})}function wt(t){return r["a"].delete("activity/border/delete/".concat(t))}function _t(){return r["a"].get("points/cate/lst")}function kt(){return r["a"].get("points/cate/create/form")}function yt(t){return r["a"].get("points/cate/update/form/".concat(t))}function Dt(t){return r["a"].delete("points/cate/delete/".concat(t))}function xt(t,e){return r["a"].post("points/cate/status/".concat(t),{status:e})}function Lt(t){return r["a"].post("points/product/create",t)}function Ct(t,e){return r["a"].post("points/product/update/".concat(t),e)}function Ft(t){return r["a"].get("points/product/lst",t)}function zt(t){return r["a"].delete("points/product/delete/".concat(t))}function St(t,e){return r["a"].post("points/product/status/".concat(t),{status:e})}function $t(t,e){return r["a"].post("points/product/get_attr_value/".concat(t),e)}function Pt(){return r["a"].get("points/cate/select")}function Tt(t){return r["a"].get("points/product/detail/".concat(t))}function Ot(t){return r["a"].get("points/order/lst",t)}function Vt(t){return r["a"].get("points/order/detail/".concat(t))}function jt(t){return r["a"].get("points/order/express/".concat(t))}function Mt(t){return r["a"].get("points/order/excel",t)}function Et(t,e){return r["a"].post("points/order/delivery/".concat(t),e)}function It(t){return r["a"].get("store/express/options",t)}function Rt(t){return r["a"].get("points/order/mark/".concat(t,"/form"))}function Yt(t,e){return r["a"].get("points/order/status/".concat(t),e)}function Bt(t){return r["a"].delete("points/order/delete/".concat(t))}}}]);