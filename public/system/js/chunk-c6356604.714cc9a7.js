(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c6356604"],{9049:function(t,e,r){},"9f12":function(t,e,r){"use strict";r("9049")},bce6:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"divBox"},[r("el-card",{staticClass:"box-card"},[r("el-form",{ref:"promoterForm",staticClass:"demo-promoterForm",attrs:{model:t.promoterForm,rules:t.rules,"label-width":"200px"}},[r("el-form-item",{attrs:{prop:"extension_status"}},[r("span",{attrs:{slot:"label"},slot:"label"},[r("span",[t._v("分销启用：")]),t._v(" "),r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"商城分销功能开启关闭",placement:"top-start"}},[r("i",{staticClass:"el-icon-warning-outline"})])],1),t._v(" "),r("el-radio-group",{model:{value:t.promoterForm.extension_status,callback:function(e){t.$set(t.promoterForm,"extension_status",e)},expression:"promoterForm.extension_status"}},[r("el-radio",{attrs:{label:1}},[t._v("开启")]),t._v(" "),r("el-radio",{attrs:{label:0}},[t._v("关闭")])],1)],1),t._v(" "),r("el-form-item",{attrs:{prop:"extension_one_rate"}},[r("span",{attrs:{slot:"label"},slot:"label"},[r("span",[t._v("一级返佣比例：")]),t._v(" "),r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"订单交易成功后给上级返佣的比例0 - 100,例:5 = 反订单金额的5%",placement:"top-start"}},[r("i",{staticClass:"el-icon-warning-outline"})])],1),t._v(" "),r("el-input-number",{staticClass:"selWidth",attrs:{precision:2,step:.1,min:0},model:{value:t.promoterForm.extension_one_rate,callback:function(e){t.$set(t.promoterForm,"extension_one_rate",e)},expression:"promoterForm.extension_one_rate"}}),t._v(" "),r("span",[t._v("%")])],1),t._v(" "),r("el-form-item",{attrs:{prop:"extension_two_rate"}},[r("span",{attrs:{slot:"label"},slot:"label"},[r("span",[t._v("二级返佣比例：")]),t._v(" "),r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"订单交易成功后给上级返佣的比例0 ~ 100,例:5 = 反订单金额的5%",placement:"top-start"}},[r("i",{staticClass:"el-icon-warning-outline"})])],1),t._v(" "),r("el-input-number",{staticClass:"selWidth",attrs:{precision:2,step:.1,min:0},model:{value:t.promoterForm.extension_two_rate,callback:function(e){t.$set(t.promoterForm,"extension_two_rate",e)},expression:"promoterForm.extension_two_rate"}}),t._v(" "),r("span",[t._v("%")])],1),t._v(" "),r("el-form-item",{attrs:{prop:"extension_self",required:""}},[r("span",{attrs:{slot:"label"},slot:"label"},[r("span",[t._v("分销内购：")])]),t._v(" "),r("el-radio-group",{model:{value:t.promoterForm.extension_self,callback:function(e){t.$set(t.promoterForm,"extension_self",e)},expression:"promoterForm.extension_self"}},[r("el-radio",{attrs:{label:1}},[t._v("开启")]),t._v(" "),r("el-radio",{staticClass:"radio",attrs:{label:0}},[t._v("关闭")])],1),t._v(" "),r("div",{staticClass:"item-text"},[r("span",{staticClass:"title"},[t._v("开启：")]),t._v("开启分销内购，分销员自己购买商品，享受一级返佣，上级享受二级返佣；\n              "),r("span",{staticClass:"title"},[t._v("关闭：")]),t._v("分销员自己购买商品没有返佣\n          ")])],1),t._v(" "),r("el-form-item",{attrs:{prop:"extension_limit",required:""}},[r("span",{attrs:{slot:"label"},slot:"label"},[r("span",[t._v("分销限时开关：")])]),t._v(" "),r("el-radio-group",{model:{value:t.promoterForm.extension_limit,callback:function(e){t.$set(t.promoterForm,"extension_limit",e)},expression:"promoterForm.extension_limit"}},[r("el-radio",{attrs:{label:1}},[t._v("开启")]),t._v(" "),r("el-radio",{staticClass:"radio",attrs:{label:0}},[t._v("关闭")])],1),t._v(" "),r("div",{staticClass:"item-text"},[r("span",{staticClass:"title"},[t._v("开启：")]),t._v("根据设置的分销绑定时段返佣；\n          "),r("span",{staticClass:"title"},[t._v("关闭：")]),t._v("默认永久绑定"),r("span",{staticClass:"font-red"},[t._v("（此处不建议频繁修改，请谨慎操作）")])])],1),t._v(" "),r("el-form-item",[r("span",{attrs:{slot:"label"},slot:"label"},[r("span",[t._v("分销绑定时间设置：")])]),t._v(" "),r("el-input-number",{attrs:{step:1,min:0},model:{value:t.promoterForm.extension_limit_day,callback:function(e){t.$set(t.promoterForm,"extension_limit_day",e)},expression:"promoterForm.extension_limit_day"}}),t._v(" 天\n         "),r("div",{staticClass:"item-text"},[t._v("\n              指自绑定关系成功至自动解绑之间的天数，自动解绑后返佣按新绑定关系结算。"),r("span",{staticClass:"font-red"},[t._v("（此处不建议频繁修改，请谨慎操作）")])])],1),t._v(" "),r("el-form-item",[r("span",{attrs:{slot:"label"},slot:"label"},[r("span",[t._v("佣金到账方式：")])]),t._v(" "),r("el-radio-group",{model:{value:t.promoterForm.sys_extension_type,callback:function(e){t.$set(t.promoterForm,"sys_extension_type",e)},expression:"promoterForm.sys_extension_type"}},[r("el-radio",{attrs:{label:0}},[t._v("线下手动转账")]),t._v(" "),r("el-radio",{staticClass:"radio",attrs:{label:1}},[t._v("自动到微信零钱")])],1)],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary",loading:t.loading},on:{click:function(e){return t.submitForm("promoterForm")}}},[t._v("保存")])],1)],1)],1)],1)},o=[],s=(r("c5f6"),r("e519")),a={name:"Index",data:function(){return{promoterForm:{extension_self:1,extension_limit_day:0,extension_limit:1,sys_extension_type:0},loading:!1,rules:{extension_status:[{required:!0,message:"请选择是否启用分销",trigger:"change"}],extension_one_rate:[{required:!0,message:"请输入一级返佣比例",trigger:"blur"}],extension_two_rate:[{required:!0,message:"请输入二级返佣比例",trigger:"blur"}],extension_self:[{required:!0,message:"请选择是否开启分销内购",trigger:"blur"}],extension_limit:[{required:!0,message:"请选择是否开启分销限时",trigger:"blur"}]}}},mounted:function(){this.getDetal()},methods:{getDetal:function(){var t=this;Object(s["c"])().then((function(e){t.promoterForm=e.data,t.promoterForm.extension_status=Number(e.data.extension_status),t.promoterForm.extension_self=e.data.extension_self?1:0,t.promoterForm.extension_limit=e.data.extension_limit?1:0,t.promoterForm.extension_limit_day=e.data.extension_limit_day?e.data.extension_limit_day:30})).catch((function(e){t.$message.error(e.message)}))},submitForm:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return!1;e.loading=!0,Object(s["d"])(e.promoterForm).then((function(t){e.loading=!1,e.$modalSure("提交成功，是否自动下架商户低于此佣金比例的商品").then((function(){Object(s["q"])().then((function(t){var r=t.message;e.$message.success(r)})).catch((function(t){var r=t.message;e.$message.error(r)}))}))})).catch((function(t){e.$message.error(t.message),e.loading=!1}))}))}}},i=a,l=(r("9f12"),r("2877")),u=Object(l["a"])(i,n,o,!1,null,"13724724",null);e["default"]=u.exports},e519:function(t,e,r){"use strict";r.d(e,"c",(function(){return o})),r.d(e,"d",(function(){return s})),r.d(e,"q",(function(){return a})),r.d(e,"v",(function(){return i})),r.d(e,"x",(function(){return l})),r.d(e,"y",(function(){return u})),r.d(e,"w",(function(){return c})),r.d(e,"s",(function(){return m})),r.d(e,"a",(function(){return p})),r.d(e,"r",(function(){return _})),r.d(e,"n",(function(){return d})),r.d(e,"b",(function(){return f})),r.d(e,"p",(function(){return g})),r.d(e,"t",(function(){return v})),r.d(e,"u",(function(){return b})),r.d(e,"m",(function(){return x})),r.d(e,"A",(function(){return F})),r.d(e,"k",(function(){return h})),r.d(e,"z",(function(){return C})),r.d(e,"o",(function(){return k})),r.d(e,"g",(function(){return y})),r.d(e,"f",(function(){return w})),r.d(e,"j",(function(){return $})),r.d(e,"e",(function(){return q})),r.d(e,"l",(function(){return j})),r.d(e,"i",(function(){return O})),r.d(e,"h",(function(){return D}));var n=r("0c6d");function o(){return n["a"].get("config/others/lst")}function s(t){return n["a"].post("config/others/update",t)}function a(){return n["a"].post("store/product/check")}function i(t){return n["a"].get("user/promoter/lst",t)}function l(t,e){return n["a"].get("user/spread/lst/".concat(t),e)}function u(t,e){return n["a"].get("user/spread/order/".concat(t),e)}function c(t){return n["a"].post("user/spread/clear/".concat(t))}function m(t){return n["a"].get("store/bag/lst",t)}function p(){return n["a"].get("store/category/list")}function _(t){return n["a"].get("store/bag/detail/".concat(t))}function d(){return n["a"].get("store/bag/lst_filter")}function f(t,e){return n["a"].post("store/bag/change/".concat(t),{status:e})}function g(){return n["a"].get("store/product/mer_select")}function v(t){return n["a"].post("store/bag/status",t)}function b(t,e){return n["a"].post("store/bag/update/".concat(t),e)}function x(t){return n["a"].get("agreement/".concat(t))}function F(t,e){return n["a"].post("agreement/".concat(t),e)}function h(t){return n["a"].get("agreement/".concat(t))}function C(t,e){return n["a"].post("agreement/".concat(t),e)}function k(t){return n["a"].post("user/brokerage/create",t)}function y(t){return n["a"].get("user/brokerage/lst",t)}function w(t){return n["a"].get("user/brokerage/detail/".concat(t))}function $(t,e){return n["a"].post("user/brokerage/update/".concat(t),e)}function q(t){return n["a"].delete("user/brokerage/delete/".concat(t))}function j(){return n["a"].get("user/brokerage/options")}function O(t){return n["a"].get("user/promoter/count",t)}function D(t){return n["a"].get("user/spread/".concat(t,"/form"))}}}]);