(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5db6c23e"],{"3fec":function(t,a,e){"use strict";e("4760")},4760:function(t,a,e){},b449:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("el-card",{staticClass:"ivu-mt",attrs:{bordered:!1}},[e("div",[e("div",{staticClass:"flex-wrapper"},[e("div",[e("iframe",{ref:"iframe",staticClass:"iframe-box",attrs:{src:t.pageData.site_url+"?inner_frame=1",frameborder:"0"}}),t._v(" "),e("div",{staticClass:"mask"})]),t._v(" "),e("div",{staticClass:"right"},[e("div",{staticClass:"content"},[e("div",{staticClass:"content-box title"},[e("div",{staticClass:"line"}),t._v(" "),e("div",{staticClass:"right title"},[t._v("小程序设置")])]),t._v(" "),t.pageData.routine_appId?t._e():e("el-alert",{attrs:{type:"info",description:"您尚未配置小程序信息，请前往小程序配置页面立即设置"}}),t._v(" "),e("div",{staticClass:"content-box"},[e("div",{staticClass:"left"},[t._v("小程序名称：")]),t._v(" "),e("div",{staticClass:"right"},[t._v(t._s(t.pageData.routine_name||"未命名"))])]),t._v(" "),e("div",{staticClass:"content-box"},[e("div",{staticClass:"left"},[t._v("种草功能：")]),t._v(" "),e("div",{staticClass:"right"},[e("span",[t._v("是否显示种草模块")]),t._v(" "),e("el-radio-group",{staticClass:"rad",attrs:{size:"large"},model:{value:t.is_menu,callback:function(a){t.is_menu=a},expression:"is_menu"}},[e("el-radio",{attrs:{label:1}},[t._v("显示")]),t._v(" "),e("el-radio",{attrs:{label:0}},[t._v("不显示")])],1)],1)]),t._v(" "),e("div",{staticClass:"content-box"},[e("div",{staticClass:"left"},[t._v("小程序包：")]),t._v(" "),e("div",{staticClass:"right"},[e("span",[t._v("是否已开通小程序直播")]),t._v(" "),e("el-radio-group",{staticClass:"rad",attrs:{size:"large"},model:{value:t.is_live,callback:function(a){t.is_live=a},expression:"is_live"}},[e("el-radio",{attrs:{label:0}},[t._v("未开通")]),t._v(" "),e("el-radio",{attrs:{label:1}},[t._v("已开通")])],1)],1)]),t._v(" "),e("div",{staticClass:"content-box last"},[e("div",{staticClass:"left"}),t._v(" "),e("div",{staticClass:"right"},[e("div",{staticStyle:{"margin-top":"10px"}},[t._v("\n                请谨慎选择是否有开通小程序直播功能，否则将影响小程序的发布\n                可前往\n                "),e("a",{attrs:{href:t.pageData.url,target:"_blank"}},[t._v("帮助文档")]),t._v("\n                查看如何开通直播功能\n              ")]),t._v(" "),e("el-button",{staticStyle:{"margin-top":"10px"},attrs:{type:"primary",size:"mini"},on:{click:function(a){return t.downLoad()}}},[t._v("下载小程序包")])],1)])],1)])])])])],1)},s=[],n=e("b562"),r={name:"routineTemplate",data:function(){return{is_live:1,is_menu:1,pageData:{routine_name:"",url:"",routine_appId:"1",site_url:""}}},created:function(){var t=this;Object(n["l"])().then((function(a){console.log(a),t.pageData=a.data}))},watch:{$route:function(t,a){}},computed:{},methods:{downLoad:function(){var t=this;Object(n["k"])({is_live:this.is_live,is_menu:this.is_menu}).then((function(t){window.open(t.data.url)})).catch((function(a){t.$message.warning(a.message)}))},downLoadCode:function(t){if(!t)return this.$message.warning("暂无小程序码");var a=new Image;a.src=t,a.setAttribute("crossOrigin","anonymous"),a.onload=function(){var t=document.createElement("canvas");t.width=a.width,t.height=a.height;var e=t.getContext("2d");e.drawImage(a,0,0,a.width,a.height);var i=t.toDataURL(),s=document.createElement("a"),n=new MouseEvent("click");s.download=name||"photo",s.href=i,s.dispatchEvent(n)}}}},l=r,o=(e("3fec"),e("2877")),c=Object(o["a"])(l,i,s,!1,null,"75e670a0",null);a["default"]=c.exports}}]);