(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d095b"],{6935:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"divBox"},[e("el-card",{staticClass:"box-card"},[t.FormData?e("form-create",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"fc",staticClass:"formBox",attrs:{option:t.option,rule:t.FormData.rule,"handle-icon":"false"},on:{submit:t.onSubmit}}):t._e()],1)],1)},o=[],r=e("c80c"),s=(e("96cf"),e("3b8d")),i=e("30ba"),c=e.n(i),u=e("b7be"),l=e("0c6d"),m={name:"IntegralConfig",data:function(){return{option:{form:{labelWidth:"150px"},global:{upload:{props:{onSuccess:function(t,a){200===t.status&&(a.url=t.data.src)}}}}},FormData:null,loading:!1}},components:{formCreate:c.a.$form()},mounted:function(){this.getFrom()},methods:{getFrom:function(){var t=this;this.loading=!0,Object(u["R"])("integral").then(function(){var a=Object(s["a"])(Object(r["a"])().mark((function a(e){return Object(r["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.FormData=e.data,t.loading=!1;case 2:case"end":return a.stop()}}),a)})));return function(t){return a.apply(this,arguments)}}()).catch((function(a){t.$message.error(a.message),t.loading=!1}))},onSubmit:function(t){var a=this;l["a"][this.FormData.method.toLowerCase()](this.FormData.api,t).then((function(t){a.$message.success(t.message||"提交成功")})).catch((function(t){a.$message.error(t.message||"提交失败")}))}}},d=m,f=e("2877"),p=Object(f["a"])(d,n,o,!1,null,"884f55c8",null);a["default"]=p.exports}}]);