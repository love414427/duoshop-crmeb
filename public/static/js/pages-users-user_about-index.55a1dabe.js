(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-users-user_about-index"],{"2a63":function(module,exports,__webpack_require__){"use strict";__webpack_require__("7a82");var _interopRequireDefault=__webpack_require__("4ea4").default;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _createForOfIteratorHelper2=_interopRequireDefault(__webpack_require__("b85c"));__webpack_require__("c975"),__webpack_require__("caad"),__webpack_require__("2532"),__webpack_require__("ac1f"),__webpack_require__("466d"),__webpack_require__("5319"),__webpack_require__("acd8"),__webpack_require__("99af"),__webpack_require__("14d9");var rpx=uni.getSystemInfoSync().screenWidth/750,cfg=__webpack_require__("b275"),_default={name:"parser",data:function(){return{uid:this._uid,scaleAm:"",showAm:"",imgs:[],nodes:[]}},props:{html:null,autopause:{type:Boolean,default:!0},autosetTitle:{type:Boolean,default:!0},domain:String,gestureZoom:Boolean,lazyLoad:Boolean,selectable:Boolean,tagStyle:Object,showWithAnimation:Boolean,useAnchor:Boolean},watch:{html:function(t){this.setContent(t)}},mounted:function(){this.imgList=[],this.imgList.each=function(t){for(var e=0,i=this.length;e<i;e++)this.setItem(e,t(this[e],e,this))},this.imgList.setItem=function(t,e){if(void 0!=t&&e){if(0==e.indexOf("http")&&this.includes(e)){for(var i,n="",a=0;i=e[a];a++){if("/"==i&&"/"!=e[a-1]&&"/"!=e[a+1])break;n+=Math.random()>.5?i.toUpperCase():i}return n+=e.substr(a),this[t]=n}if(this[t]=e,e.includes("data:image")){var o=e.match(/data:image\/(\S+?);(\S+?),(.+)/);if(!o)return}}},this.html&&this.setContent(this.html)},beforeDestroy:function(){this._observer&&this._observer.disconnect(),this.imgList.each((function(t){})),clearInterval(this._timer)},methods:{_Dom2Str:function(t){var e,i="",n=(0,_createForOfIteratorHelper2.default)(t);try{for(n.s();!(e=n.n()).done;){var a=e.value;if("text"==a.type)i+=a.text;else{for(var o in i+="<"+a.name,a.attrs||{})i+=" "+o+'="'+a.attrs[o]+'"';a.children&&a.children.length?i+=">"+this._Dom2Str(a.children)+"</"+a.name+">":i+=">"}}}catch(r){n.e(r)}finally{n.f()}return i},_handleHtml:function(t,e){if("string"!=typeof t&&(t=this._Dom2Str(t.nodes||t)),t.includes("rpx")&&(t=t.replace(/[0-9.]+\s*rpx/g,(function(t){return parseFloat(t)*rpx+"px"}))),!e){var i="<style scoped>@keyframes show{0%{opacity:0}100%{opacity:1}}";for(var n in cfg.userAgentStyles)i+="".concat(n,"{").concat(cfg.userAgentStyles[n],"}");for(n in this.tagStyle)i+="".concat(n,"{").concat(this.tagStyle[n],"}");i+="</style>",t=i+t}return t},setContent:function(t,e){var i=this;if(t){var n=document.createElement("div");e?this.rtf?this.rtf.appendChild(n):this.rtf=n:(this.rtf&&this.rtf.parentNode.removeChild(this.rtf),this.rtf=n),n.innerHTML=this._handleHtml(t,e);for(var a,o=this.rtf.getElementsByTagName("style"),r=0;a=o[r++];)a.innerHTML=a.innerHTML.replace(/body/g,"#rtf"+this._uid),a.setAttribute("scoped","true");!this._observer&&this.lazyLoad&&IntersectionObserver&&(this._observer=new IntersectionObserver((function(t){for(var e,n=0;e=t[n++];)e.isIntersecting&&(e.target.src=e.target.getAttribute("data-src"),e.target.removeAttribute("data-src"),i._observer.unobserve(e.target))}),{rootMargin:"900px 0px 900px 0px"}));var s=this,c=this.rtf.getElementsByTagName("title");c.length&&this.autosetTitle&&uni.setNavigationBarTitle({title:c[0].innerText}),this.imgList.length=0;for(var l,u=this.rtf.getElementsByTagName("img"),d=0,h=0;l=u[d];d++){l.style.maxWidth="100%";var f=l.getAttribute("src");this.domain&&f&&("/"==f[0]?"/"==f[1]?l.src=(this.domain.includes("://")?this.domain.split("://")[0]:"")+":"+f:l.src=this.domain+f:f.includes("://")||(l.src=this.domain+"/"+f)),l.hasAttribute("ignore")||"A"==l.parentElement.nodeName||(l.i=h++,s.imgList.push(l.src||l.getAttribute("data-src")),l.onclick=function(){var t=!0;this.ignore=function(){return t=!1},s.$emit("imgtap",this),t&&uni.previewImage({current:this.i,urls:s.imgList})}),l.onerror=function(){s.$emit("error",{source:"img",target:this})},s.lazyLoad&&this._observer&&l.src&&0!=l.i&&(l.setAttribute("data-src",l.src),l.removeAttribute("src"),this._observer.observe(l))}var p,v=this.rtf.getElementsByTagName("a"),m=(0,_createForOfIteratorHelper2.default)(v);try{for(m.s();!(p=m.n()).done;){var g=p.value;g.onclick=function(){var t=!0,e=this.getAttribute("href");if(s.$emit("linkpress",{href:e,ignore:function(){return t=!1}}),t&&e)if("#"==e[0])s.useAnchor&&s.navigateTo({id:e.substr(1)});else{if(0==e.indexOf("http")||0==e.indexOf("//"))return!0;uni.navigateTo({url:e})}return!1}}}catch(A){m.e(A)}finally{m.f()}var _=this.rtf.getElementsByTagName("video");s.videoContexts=_;for(var b,y=0;b=_[y++];)b.style.maxWidth="100%",b.style.width="100%",b.onerror=function(){s.$emit("error",{source:"video",target:this})},b.onplay=function(){if(s.autopause)for(var t,e=0;t=s.videoContexts[e++];)t!=this&&t.pause()};var x,w,k=this.rtf.getElementsByTagName("audios"),T=(0,_createForOfIteratorHelper2.default)(k);try{for(T.s();!(x=T.n()).done;){var C=x.value;C.onerror=function(){s.$emit("error",{source:"audio",target:this})}}}catch(A){T.e(A)}finally{T.f()}this.document=this.rtf,e||document.getElementById("rtf"+this._uid).appendChild(this.rtf),this.$nextTick((function(){i.nodes=[1],i.$emit("load")})),setTimeout((function(){return i.showAm=""}),500),clearInterval(this._timer),this._timer=setInterval((function(){var t=[i.rtf.getBoundingClientRect()];i.width=t[0].width,t[0].height==w&&(i.$emit("ready",t[0]),clearInterval(i._timer)),w=t[0].height}),350),this.showWithAnimation&&!e&&(this.showAm="animation:show .5s")}else this.rtf&&!e&&this.rtf.parentNode.removeChild(this.rtf)},getText:function(){arguments.length>0&&void 0!==arguments[0]||this.nodes;return this.rtf.innerText},navigateTo:function(t){if(!this.useAnchor)return t.fail&&t.fail({errMsg:"Anchor is disabled"});if(!t.id)return window.scrollTo(0,this.rtf.offsetTop),t.success&&t.success({errMsg:"pageScrollTo:ok"});var e=document.getElementById(t.id);if(!e)return t.fail&&t.fail({errMsg:"Label not found"});t.scrollTop=this.rtf.offsetTop+e.offsetTop,uni.pageScrollTo(t)},getVideoContext:function(t){if(!t)return this.videoContexts;for(var e=this.videoContexts.length;e--;)if(this.videoContexts[e].id==t)return this.videoContexts[e]},preLoad:function preLoad(html,num){html.constructor==Array&&(html=this._Dom2Str(html));var script="var contain=document.createElement('div');contain.innerHTML='"+html.replace(/'/g,"\\'")+"';for(var imgs=contain.querySelectorAll('img'),i=imgs.length-1;i>="+num+";i--)imgs[i].removeAttribute('src');";eval(script)},_tap:function(t){if(this.gestureZoom&&t.timeStamp-this._lastT<300){var e=t.touches[0].pageY-t.currentTarget.offsetTop;if(this._zoom)this._scaleAm.translateX(0).scale(1).step(),uni.pageScrollTo({scrollTop:(e+this._initY)/2-t.touches[0].clientY,duration:400});else{var i=t.touches[0].pageX-t.currentTarget.offsetLeft;this._initY=e,this._scaleAm=uni.createAnimation({transformOrigin:"".concat(i,"px ").concat(this._initY,"px 0"),timingFunction:"ease-in-out"}),this._scaleAm.scale(2).step(),this._tMax=i/2,this._tMin=(i-this.width)/2,this._tX=0}this._zoom=!this._zoom,this.scaleAm=this._scaleAm.export()}this._lastT=t.timeStamp},_touchstart:function(t){1==t.touches.length&&(this._initX=this._lastX=t.touches[0].pageX)},_touchmove:function(t){var e=t.touches[0].pageX-this._lastX;if(this._zoom&&1==t.touches.length&&Math.abs(e)>20){if(this._lastX=t.touches[0].pageX,this._tX<=this._tMin&&e<0||this._tX>=this._tMax&&e>0)return;this._tX+=e*Math.abs(this._lastX-this._initX)*.05,this._tX<this._tMin&&(this._tX=this._tMin),this._tX>this._tMax&&(this._tX=this._tMax),this._scaleAm.translateX(this._tX).step(),this.scaleAm=this._scaleAm.export()}}}};exports.default=_default},3192:function(t,e,i){"use strict";i.r(e);var n=i("80ec"),a=i("60e9");for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("4c06");var r=i("f0c5"),s=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"09387707",null,!1,n["a"],void 0);e["default"]=s.exports},3246:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,"@-webkit-keyframes show-data-v-09387707{0%{opacity:0}100%{opacity:1}}@keyframes show-data-v-09387707{0%{opacity:0}100%{opacity:1}}\n\n\n\n",""]),t.exports=e},"4a5f":function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("d3b7");var n=i("6859"),a=i("26cb"),o={name:"user_about",data:function(){return{type:"",data:"",check:!1,moal:!1,loaded:!1,tagStyle:{img:"width:100%;display:block;"}}},computed:(0,a.mapGetters)(["viewColor"]),onLoad:function(t){this.type=t.from,this.setTitle(this.type)},methods:{toCancel:function(){uni.redirectTo({url:"/pages/users/user_about/index?from=the_cancellation_prompt"})},setCheck:function(){this.check=!this.check},ok:function(){var t=this;uni.showLoading({title:"注销中",mask:!0}),this.moal=!1,new Promise((function(e){(0,n.userOut)().then((function(i){200===i.data.status?(uni.hideLoading(),e()):uni.showModal({title:"提示",content:i.message,success:function(a){var o=a.confirm;o?(0,n.userOut)({key:i.data.result.key}).then((function(i){uni.hideLoading(),200===i.data.status?e():t.$util.Tips({title:i.message})})):uni.hideLoading()}})}))})).then((function(e){t.$store.commit("LOGOUT"),setTimeout((function(){uni.reLaunch({url:"/pages/index/index"})}),500)}))},cancelBtn:function(){if(!this.check)return uni.showToast({title:"请勾选已阅读",icon:"none",duration:2e3});this.moal=!0},cancelMoal:function(){this.moal=!1,this.check=!1},getCacheinfo:function(){var t=this;this.loaded=!1,(0,n.cacheInfo)(this.type).then((function(e){t.data=e.data[t.type],e.data.title&&uni.setNavigationBarTitle({title:e.data.title}),t.loaded=!0}))},setTitle:function(t){switch(t){case"the_cancellation_msg":uni.setNavigationBarTitle({title:"注销账号"}),this.getCacheinfo();break;case"sys_about_us":uni.setNavigationBarTitle({title:"关于我们"}),this.getCacheinfo();break;case"sys_certificate":uni.setNavigationBarTitle({title:"资质证明"}),this.getCacheinfo();break;default:uni.setNavigationBarTitle({title:"加载中..."}),this.getCacheinfo();break}}}};e.default=o},"4c06":function(t,e,i){"use strict";var n=i("9a38"),a=i.n(n);a.a},"60e9":function(t,e,i){"use strict";i.r(e);var n=i("2a63"),a=i.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"68d1":function(t,e,i){"use strict";var n=i("a86d"),a=i.n(n);a.a},"80ec":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[t.nodes.length?t._e():t._t("default"),i("v-uni-view",{style:t.showAm+(t.selectable?";user-select:text;-webkit-user-select:text":""),attrs:{id:"top",animation:t.scaleAm},on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t._touchstart.apply(void 0,arguments)},touchmove:function(e){arguments[0]=e=t.$handleEvent(e),t._touchmove.apply(void 0,arguments)},click:function(e){arguments[0]=e=t.$handleEvent(e),t._tap.apply(void 0,arguments)}}},[i("div",{attrs:{id:"rtf"+t.uid}})])],2)},a=[]},"9a38":function(t,e,i){var n=i("3246");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("6c227020",n,!0,{sourceMap:!1,shadowMode:!1})},"9db6":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={jyfParser:i("3192").default},a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"user_about",style:t.viewColor},[i("v-uni-view",[i("v-uni-view",{staticClass:"text cancelTxt",class:{cancelTxt:"the_cancellation_msg"==t.type}},[i("jyf-parser",{ref:"article",attrs:{html:t.data.replace(/<br\/>/gi,""),"tag-style":t.tagStyle}})],1)],1),"the_cancellation_msg"==t.type&&t.loaded?i("v-uni-view",{staticClass:"cancel"},[i("v-uni-view",{staticClass:"checkbox",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.setCheck.apply(void 0,arguments)}}},[t.check?i("v-uni-view",{staticClass:"iconfont icon-xuanzhong1"}):i("v-uni-view",{staticClass:"iconfont icon-weixuanzhong"}),i("v-uni-view",[t._v("已阅读并同意"),i("v-uni-text",{staticClass:"font",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.toCancel.apply(void 0,arguments)}}},[t._v("《重要提醒》")])],1)],1),i("v-uni-view",{staticClass:"btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.cancelBtn.apply(void 0,arguments)}}},[t._v("申请注销")])],1):t._e(),t.moal?i("v-uni-view",{staticClass:"outMoal"},[i("v-uni-view",{staticClass:"box"},[i("v-uni-view",{staticClass:"title"},[t._v("该账号将永久注销")]),i("v-uni-view",{staticClass:"moalBtn"},[i("v-uni-view",{staticClass:"ok",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ok.apply(void 0,arguments)}}},[t._v("确定")]),i("v-uni-view",{staticClass:"no",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.cancelMoal.apply(void 0,arguments)}}},[t._v("取消")])],1)],1)],1):t._e()],1)},o=[]},"9eb4":function(t,e,i){"use strict";i.r(e);var n=i("4a5f"),a=i.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},a86d:function(t,e,i){var n=i("b850");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("23bbe7df",n,!0,{sourceMap:!1,shadowMode:!1})},b275:function(t,e){function i(t){for(var e={},i=t.split(","),n=i.length;n--;)e[i[n]]=!0;return e}t.exports={filter:null,highlight:null,onText:null,blankChar:i(" , ,\t,\r,\n,\f"),blockTags:i("address,article,aside,body,caption,center,cite,footer,header,html,nav,section,pre"),ignoreTags:i("area,base,basefont,canvas,command,frame,input,isindex,keygen,link,map,meta,param,script,source,style,svg,textarea,title,track,use,wbr,embed,iframe"),richOnlyTags:i("a,colgroup,fieldset,legend,picture,table"),selfClosingTags:i("area,base,basefont,br,col,circle,ellipse,embed,frame,hr,img,input,isindex,keygen,line,link,meta,param,path,polygon,rect,source,track,use,wbr"),trustAttrs:i("align,alt,app-id,author,autoplay,border,cellpadding,cellspacing,class,color,colspan,controls,data-src,dir,face,height,href,id,ignore,loop,media,muted,name,path,poster,rowspan,size,span,src,start,style,type,unit-id,width,xmlns"),boolAttrs:i("autoplay,controls,ignore,loop,muted"),trustTags:i("a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video"),userAgentStyles:{address:"font-style:italic",big:"display:inline;font-size:1.2em",blockquote:"background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px",caption:"display:table-caption;text-align:center",center:"text-align:center",cite:"font-style:italic",dd:"margin-left:40px",img:"max-width:100%",mark:"background-color:yellow",picture:"max-width:100%",pre:"font-family:monospace;white-space:pre;overflow:scroll",s:"text-decoration:line-through",small:"display:inline;font-size:0.8em",u:"text-decoration:underline"}}},b850:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.user_about .text[data-v-e0a4400c]{font-size:%?30?%;font-weight:400;padding:%?30?%;color:#282828}.user_about .cancelTxt[data-v-e0a4400c]{overflow:hidden;overflow-y:auto}.user_about .cancelTxt uni-image[data-v-e0a4400c]{max-width:100%}.user_about .cancel[data-v-e0a4400c]{position:fixed;bottom:%?60?%;left:0;z-index:1;width:100%}.user_about .cancel .checkbox[data-v-e0a4400c]{display:flex;align-items:center;justify-content:center;margin:0 auto;font-size:%?24?%;font-weight:400}.user_about .cancel .checkbox span[data-v-e0a4400c]{margin-left:%?5?%}.user_about .cancel .checkbox .font[data-v-e0a4400c]{color:var(--view-theme);font-style:normal}.user_about .cancel .checkbox .iconfont[data-v-e0a4400c]{font-size:%?24?%}.user_about .cancel .btn[data-v-e0a4400c]{width:%?690?%;height:%?90?%;background:var(--view-theme);border-radius:%?45?%;margin:0 auto;margin-top:%?30?%;text-align:center;line-height:%?90?%;font-size:%?32?%;font-weight:400;color:#fff}.outMoal[data-v-e0a4400c]{width:100%;height:100%;background:rgba(0,0,0,.5);position:fixed;top:0;left:0;z-index:2;display:flex;align-items:center;justify-content:center}.outMoal .box[data-v-e0a4400c]{position:fixed;width:%?590?%;height:%?258?%;background:#fff;opacity:1;border-radius:%?20?%;text-align:center;padding:%?50?%}.outMoal .box .title[data-v-e0a4400c]{font-size:%?30?%;font-weight:600;color:#282828}.outMoal .box .moalBtn[data-v-e0a4400c]{margin-top:%?43?%;display:flex;justify-content:space-between}.outMoal .box .moalBtn .ok[data-v-e0a4400c]{width:%?234?%;height:%?66?%;border:1px solid var(--view-theme);border-radius:%?33?%;font-size:%?26?%;line-height:%?66?%;color:var(--view-theme)}.outMoal .box .moalBtn .no[data-v-e0a4400c]{width:%?234?%;height:%?66?%;background:linear-gradient(90deg,var(--view-bntColor21),var(--view-bntColor21));border-radius:%?33?%;font-size:%?26?%;color:#fff;line-height:%?66?%}',""]),t.exports=e},b85c:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){var i="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!i){if(Array.isArray(t)||(i=(0,n.default)(t))||e&&t&&"number"===typeof t.length){i&&(t=i);var a=0,o=function(){};return{s:o,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,s=!0,c=!1;return{s:function(){i=i.call(t)},n:function(){var t=i.next();return s=t.done,t},e:function(t){c=!0,r=t},f:function(){try{s||null==i["return"]||i["return"]()}finally{if(c)throw r}}}},i("a4d3"),i("e01a"),i("d3b7"),i("d28b"),i("3ca3"),i("ddb0"),i("d9e2"),i("d401");var n=function(t){return t&&t.__esModule?t:{default:t}}(i("06c5"))},bee6:function(t,e,i){"use strict";i.r(e);var n=i("9db6"),a=i("9eb4");for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("68d1");var r=i("f0c5"),s=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"e0a4400c",null,!1,n["a"],void 0);e["default"]=s.exports}}]);