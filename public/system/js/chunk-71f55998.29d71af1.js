(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71f55998"],{"019c":function(e,t,i){},"50de":function(e,t,i){},5411:function(e,t,i){},"541a":function(e,t,i){"use strict";i("019c")},"951a":function(e,t,i){e.exports=i.p+"system/img/default.6b914f9c.jpg"},"9a9b":function(e,t,i){e.exports=i.p+"system/img/laber.d00bb7e6.png"},"9ed6":function(e,t,i){"use strict";i.r(t);var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"page-account"},[i("div",{staticClass:"container",class:[e.fullWidth>768?"containerSamll":"containerBig"]},[e.fullWidth>768?[i("swiper",{staticClass:"swiperPross",attrs:{options:e.swiperOption}},[e._l(e.swiperList,(function(e,t){return i("swiper-slide",{key:t,staticClass:"swiperPic"},[i("img",{attrs:{src:e.pic}})])})),e._v(" "),i("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2)]:e._e(),e._v(" "),i("div",{staticClass:"index_from page-account-container"},[e._m(0),e._v(" "),i("div",{staticClass:"page-account-top"},[i("div",{staticClass:"page-account-top-logo"},[i("img",{attrs:{src:e.loginLogo,alt:"logo"}})])]),e._v(" "),i("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,autocomplete:"on","label-position":"left"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}}},[i("el-form-item",{attrs:{prop:"account"}},[i("el-input",{ref:"account",attrs:{"prefix-icon":"el-icon-user",placeholder:"用户名",name:"username",type:"text",tabindex:"1",autocomplete:"on"},model:{value:e.loginForm.account,callback:function(t){e.$set(e.loginForm,"account",t)},expression:"loginForm.account"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"password"}},[i("el-input",{key:e.passwordType,ref:"password",attrs:{"prefix-icon":"el-icon-lock",type:e.passwordType,placeholder:"密码",name:"password",tabindex:"2","auto-complete":"on"},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}}),e._v(" "),i("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[i("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1),e._v(" "),i("el-button",{directives:[{name:"debounce",rawName:"v-debounce"}],staticStyle:{width:"100%","margin-top":"10px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleLogin(t)}}},[e._v("登录")])],1)],1)],2),e._v(" "),i("div",{staticClass:"record_number"},[-1==e.copyright.status?[i("span",{staticClass:"cell"},[e._v("Copyright "+e._s(e.copyright.year))]),e._v(" "),i("a",{staticClass:"cell",attrs:{href:"http://"+e.copyright.url,target:"_blank"}},[e._v(e._s(e.copyright.version))])]:[e._v(e._s(e.copyright.Copyright))]],2),e._v(" "),i("Verify",{ref:"verify",attrs:{captchaType:"blockPuzzle",imgSize:{width:"330px",height:"155px"}},on:{success:e.success}})],1)},n=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"labelPic"},[o("img",{attrs:{src:i("9a9b")}})])}],s=(i("ac6a"),i("456d"),i("c24f")),a=i("8593"),r=i("6618");!function(){function e(e,t,i){return e.getAttribute(t)||i}function t(e){return document.getElementsByTagName(e)}function i(){var i=t("script"),o=i.length,n=i[o-1];return{l:o,z:e(n,"zIndex",-2),o:e(n,"opacity",.8),c:e(n,"color","255,255,255"),n:e(n,"count",240)}}function o(){s=r.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,a=r.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}function n(){if(d+=1,d<5)u(n);else{d=0,h.clearRect(0,0,s,a);var e,t,i,o,r,l,p=[f].concat(g);g.forEach((function(n){for(n.x+=n.xa,n.y+=n.ya,n.xa*=n.x>s||n.x<0?-1:1,n.ya*=n.y>a||n.y<0?-1:1,h.fillRect(n.x-.5,n.y-.5,2,2),h.fillStyle="#FFFFFF",t=0;t<p.length;t++)e=p[t],n!==e&&null!==e.x&&null!==e.y&&(o=n.x-e.x,r=n.y-e.y,l=o*o+r*r,l<e.max&&(e===f&&l>=e.max/2&&(n.x-=.03*o,n.y-=.03*r),i=(e.max-l)/e.max,h.beginPath(),h.lineWidth=i/2,h.strokeStyle="rgba("+c.c+","+(i+.2)+")",h.moveTo(n.x,n.y),h.lineTo(e.x,e.y),h.stroke()));p.splice(p.indexOf(n),1)})),u(n)}}var s,a,r=document.createElement("canvas"),c=i(),l="c_n"+c.l,h=r.getContext("2d"),d=0,u=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/45)},p=Math.random,f={x:null,y:null,max:2e4};r.id=l,r.style.cssText="position:fixed;top:0;left:0;z-index:"+c.z+";opacity:"+c.o,t("body")[0].appendChild(r),o(),window.onresize=o,window.onmousemove=function(e){e=e||window.event,f.x=e.clientX,f.y=e.clientY},window.onmouseout=function(){f.x=null,f.y=null};for(var g=[],m=0;c.n>m;m++){var v=p()*s,y=p()*a,b=2*p()-1,w=2*p()-1;g.push({x:v,y:y,xa:b,ya:w,max:6e3})}setTimeout((function(){n()}),100)}();var c=i("a78e"),l=i.n(c),h=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"show",rawName:"v-show",value:e.showBox,expression:"showBox"}],class:"pop"==e.mode?"verify-mask":""},[i("div",{class:"pop"==e.mode?"verifybox":"",style:{"max-width":parseInt(e.imgSize.width)+30+"px"}},["pop"==e.mode?i("div",{staticClass:"verifybox-top"},[e._v("\n      请完成安全验证\n      "),i("span",{staticClass:"verifybox-close",on:{click:e.closeBox}},[i("i",{staticClass:"iconfont icon-close"})])]):e._e(),e._v(" "),i("div",{staticClass:"verifybox-bottom",style:{padding:"pop"==e.mode?"15px":"0"}},[e.componentType?i(e.componentType,{ref:"instance",tag:"components",attrs:{"captcha-type":e.captchaType,type:e.verifyType,figure:e.figure,arith:e.arith,mode:e.mode,"v-space":e.vSpace,explain:e.explain,"img-size":e.imgSize,"block-size":e.blockSize,"bar-size":e.barSize,"default-img":e.defaultImg}}):e._e()],1)])])},d=[],u=(i("6b54"),i("c5f6"),function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticStyle:{position:"relative"}},["2"===e.type?i("div",{staticClass:"verify-img-out",style:{height:parseInt(e.setSize.imgHeight)+e.vSpace+"px"}},[i("div",{staticClass:"verify-img-panel",style:{width:e.setSize.imgWidth,height:e.setSize.imgHeight}},[i("img",{staticStyle:{width:"100%",height:"100%",display:"block"},attrs:{src:e.backImgBase?"data:image/png;base64,"+e.backImgBase:e.defaultImg,alt:""}}),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.showRefresh,expression:"showRefresh"}],staticClass:"verify-refresh",on:{click:e.refresh}},[i("i",{staticClass:"iconfont icon-refresh"})]),e._v(" "),i("transition",{attrs:{name:"tips"}},[e.tipWords?i("span",{staticClass:"verify-tips",class:e.passFlag?"suc-bg":"err-bg"},[e._v(e._s(e.tipWords))]):e._e()])],1)]):e._e(),e._v(" "),i("div",{staticClass:"verify-bar-area",style:{width:e.setSize.imgWidth,height:e.barSize.height,"line-height":e.barSize.height}},[i("span",{staticClass:"verify-msg",domProps:{textContent:e._s(e.text)}}),e._v(" "),i("div",{staticClass:"verify-left-bar",style:{width:void 0!==e.leftBarWidth?e.leftBarWidth:e.barSize.height,height:e.barSize.height,"border-color":e.leftBarBorderColor,transaction:e.transitionWidth}},[i("span",{staticClass:"verify-msg",domProps:{textContent:e._s(e.finishText)}}),e._v(" "),i("div",{staticClass:"verify-move-block",style:{width:e.barSize.height,height:e.barSize.height,"background-color":e.moveBlockBackgroundColor,left:e.moveBlockLeft,transition:e.transitionLeft},on:{touchstart:e.start,mousedown:e.start}},[i("i",{class:["verify-icon iconfont",e.iconClass],style:{color:e.iconColor}}),e._v(" "),"2"===e.type?i("div",{staticClass:"verify-sub-block",style:{width:Math.floor(47*parseInt(e.setSize.imgWidth)/310)+"px",height:e.setSize.imgHeight,top:"-"+(parseInt(e.setSize.imgHeight)+e.vSpace)+"px","background-size":e.setSize.imgWidth+" "+e.setSize.imgHeight}},[i("img",{staticStyle:{width:"100%",height:"100%",display:"block"},attrs:{src:"data:image/png;base64,"+e.blockBackImgBase,alt:""}})]):e._e()])])])])}),p=[];i("a481");function f(e){return e}function g(e){var t,i,o,n,s=e.$el.parentNode.offsetWidth||window.offsetWidth,a=e.$el.parentNode.offsetHeight||window.offsetHeight;return t=-1!=e.imgSize.width.indexOf("%")?parseInt(this.imgSize.width)/100*s+"px":this.imgSize.width,i=-1!=e.imgSize.height.indexOf("%")?parseInt(this.imgSize.height)/100*a+"px":this.imgSize.height,o=-1!=e.barSize.width.indexOf("%")?parseInt(this.barSize.width)/100*s+"px":this.barSize.width,n=-1!=e.barSize.height.indexOf("%")?parseInt(this.barSize.height)/100*a+"px":this.barSize.height,{imgWidth:t,imgHeight:i,barWidth:o,barHeight:n}}var m={name:"VerifySlide",props:{captchaType:{type:String,default:"blockPuzzle"},type:{type:String,default:"1"},mode:{type:String,default:"fixed"},vSpace:{type:Number,default:5},explain:{type:String,default:"向右滑动完成验证"},imgSize:{type:Object,default:function(){return{width:"310px",height:"155px"}}},blockSize:{type:Object,default:function(){return{width:"50px",height:"50px"}}},barSize:{type:Object,default:function(){return{width:"310px",height:"40px"}}},defaultImg:{type:String,default:""}},data:function(){return{secretKey:"",passFlag:"",backImgBase:"",blockBackImgBase:"",backToken:"",startMoveTime:"",endMovetime:"",tipsBackColor:"",tipWords:"",text:"",finishText:"",setSize:{imgHeight:0,imgWidth:0,barHeight:0,barWidth:0},top:0,left:0,moveBlockLeft:void 0,leftBarWidth:void 0,moveBlockBackgroundColor:void 0,leftBarBorderColor:"#ddd",iconColor:void 0,iconClass:"icon-right",status:!1,isEnd:!1,showRefresh:!0,transitionLeft:"",transitionWidth:""}},computed:{barArea:function(){return this.$el.querySelector(".verify-bar-area")},resetSize:function(){return g}},watch:{type:{immediate:!0,handler:function(){this.init()}}},mounted:function(){this.$el.onselectstart=function(){return!1},console.log(this.defaultImg)},methods:{init:function(){var e=this;this.text=this.explain,this.getPictrue(),this.$nextTick((function(){var t=e.resetSize(e);for(var i in t)e.$set(e.setSize,i,t[i]);e.$parent.$emit("ready",e)}));var t=this;window.removeEventListener("touchmove",(function(e){t.move(e)})),window.removeEventListener("mousemove",(function(e){t.move(e)})),window.removeEventListener("touchend",(function(){t.end()})),window.removeEventListener("mouseup",(function(){t.end()})),window.addEventListener("touchmove",(function(e){t.move(e)})),window.addEventListener("mousemove",(function(e){t.move(e)})),window.addEventListener("touchend",(function(){t.end()})),window.addEventListener("mouseup",(function(){t.end()}))},start:function(e){if(e=e||window.event,e.touches)t=e.touches[0].pageX;else var t=e.clientX;this.startLeft=Math.floor(t-this.barArea.getBoundingClientRect().left),this.startMoveTime=+new Date,0==this.isEnd&&(this.text="",this.moveBlockBackgroundColor="#337ab7",this.leftBarBorderColor="#337AB7",this.iconColor="#fff",e.stopPropagation(),this.status=!0)},move:function(e){if(e=e||window.event,this.status&&0==this.isEnd){if(e.touches)t=e.touches[0].pageX;else var t=e.clientX;var i=this.barArea.getBoundingClientRect().left,o=t-i;o>=this.barArea.offsetWidth-parseInt(parseInt(this.blockSize.width)/2)-2&&(o=this.barArea.offsetWidth-parseInt(parseInt(this.blockSize.width)/2)-2),o<=0&&(o=parseInt(parseInt(this.blockSize.width)/2)),this.moveBlockLeft=o-this.startLeft+"px",this.leftBarWidth=o-this.startLeft+"px"}},end:function(){var e=this;this.endMovetime=+new Date;var t=this;if(this.status&&0==this.isEnd){var i=parseInt((this.moveBlockLeft||"").replace("px",""));i=310*i/parseInt(this.setSize.imgWidth);var o={captchaType:this.captchaType,pointJson:this.secretKey?f(JSON.stringify({x:i,y:5}),this.secretKey):JSON.stringify({x:i,y:5}),token:this.backToken};Object(a["b"])(o).then((function(t){e.moveBlockBackgroundColor="#5cb85c",e.leftBarBorderColor="#5cb85c",e.iconColor="#fff",e.iconClass="icon-check",e.showRefresh=!1,e.isEnd=!0,"pop"==e.mode&&setTimeout((function(){e.$parent.clickShow=!1,e.refresh()}),1500),e.passFlag=!0,e.tipWords="".concat(((e.endMovetime-e.startMoveTime)/1e3).toFixed(2),"s验证成功");var o=e.secretKey?f(e.backToken+"---"+JSON.stringify({x:i,y:5}),e.secretKey):e.backToken+"---"+JSON.stringify({x:i,y:5});setTimeout((function(){e.tipWords="",e.$parent.closeBox(),e.$parent.$emit("success",{captchaVerification:o})}),1e3)})).catch((function(i){e.moveBlockBackgroundColor="#d9534f",e.leftBarBorderColor="#d9534f",e.iconColor="#fff",e.iconClass="icon-close",e.passFlag=!1,setTimeout((function(){t.refresh()}),1e3),e.$parent.$emit("error",e),e.tipWords="验证失败",setTimeout((function(){e.tipWords=""}),1e3)})),this.status=!1}},refresh:function(){var e=this;this.showRefresh=!0,this.finishText="",this.transitionLeft="left .3s",this.moveBlockLeft=0,this.leftBarWidth=void 0,this.transitionWidth="width .3s",this.leftBarBorderColor="#ddd",this.moveBlockBackgroundColor="#fff",this.iconColor="#000",this.iconClass="icon-right",this.isEnd=!1,this.getPictrue(),setTimeout((function(){e.transitionWidth="",e.transitionLeft="",e.text=e.explain}),300)},getPictrue:function(){var e=this;console.log("sssss");var t={captchaType:this.captchaType,clientUid:localStorage.getItem("slider"),ts:Date.now()};console.log(t),Object(a["a"])(t).then((function(t){e.backImgBase=t.data.originalImageBase64,e.blockBackImgBase=t.data.jigsawImageBase64,e.backToken=t.data.token,e.secretKey=t.data.secretKey})).catch((function(t){e.tipWords=t.msg,e.backImgBase=null,e.blockBackImgBase=null}))}}},v=m,y=i("2877"),b=Object(y["a"])(v,u,p,!1,null,null,null),w=b.exports,k=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticStyle:{position:"relative"}},[i("div",{staticClass:"verify-img-out"},[i("div",{staticClass:"verify-img-panel",style:{width:e.setSize.imgWidth,height:e.setSize.imgHeight,"background-size":e.setSize.imgWidth+" "+e.setSize.imgHeight,"margin-bottom":e.vSpace+"px"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.showRefresh,expression:"showRefresh"}],staticClass:"verify-refresh",staticStyle:{"z-index":"3"},on:{click:e.refresh}},[i("i",{staticClass:"iconfont icon-refresh"})]),e._v(" "),i("img",{ref:"canvas",staticStyle:{width:"100%",height:"100%",display:"block"},attrs:{src:e.pointBackImgBase?"data:image/png;base64,"+e.pointBackImgBase:e.defaultImg,alt:""},on:{click:function(t){e.bindingClick&&e.canvasClick(t)}}}),e._v(" "),e._l(e.tempPoints,(function(t,o){return i("div",{key:o,staticClass:"point-area",style:{"background-color":"#1abd6c",color:"#fff","z-index":9999,width:"20px",height:"20px","text-align":"center","line-height":"20px","border-radius":"50%",position:"absolute",top:parseInt(t.y-10)+"px",left:parseInt(t.x-10)+"px"}},[e._v("\n        "+e._s(o+1)+"\n      ")])}))],2)]),e._v(" "),i("div",{staticClass:"verify-bar-area",style:{width:e.setSize.imgWidth,color:this.barAreaColor,"border-color":this.barAreaBorderColor,"line-height":this.barSize.height}},[i("span",{staticClass:"verify-msg"},[e._v(e._s(e.text))])])])},x=[],S={name:"VerifyPoints",props:{mode:{type:String,default:"fixed"},captchaType:{type:String,default:"blockPuzzle"},vSpace:{type:Number,default:5},imgSize:{type:Object,default:function(){return{width:"310px",height:"155px"}}},barSize:{type:Object,default:function(){return{width:"310px",height:"40px"}}},defaultImg:{type:String,default:""}},data:function(){return{secretKey:"",checkNum:3,fontPos:[],checkPosArr:[],num:1,pointBackImgBase:"",poinTextList:[],backToken:"",setSize:{imgHeight:0,imgWidth:0,barHeight:0,barWidth:0},tempPoints:[],text:"",barAreaColor:void 0,barAreaBorderColor:void 0,showRefresh:!0,bindingClick:!0}},computed:{resetSize:function(){return g}},watch:{type:{immediate:!0,handler:function(){this.init()}}},mounted:function(){this.$el.onselectstart=function(){return!1}},methods:{init:function(){var e=this;this.fontPos.splice(0,this.fontPos.length),this.checkPosArr.splice(0,this.checkPosArr.length),this.num=1,this.getPictrue(),this.$nextTick((function(){e.setSize=e.resetSize(e),e.$parent.$emit("ready",e)}))},canvasClick:function(e){var t=this;this.checkPosArr.push(this.getMousePos(this.$refs.canvas,e)),this.num==this.checkNum&&(this.num=this.createPoint(this.getMousePos(this.$refs.canvas,e)),this.checkPosArr=this.pointTransfrom(this.checkPosArr,this.setSize),setTimeout((function(){var e=t.secretKey?f(t.backToken+"---"+JSON.stringify(t.checkPosArr),t.secretKey):t.backToken+"---"+JSON.stringify(t.checkPosArr),i={captchaType:t.captchaType,pointJson:t.secretKey?f(JSON.stringify(t.checkPosArr),t.secretKey):JSON.stringify(t.checkPosArr),token:t.backToken};Object(a["b"])(i).then((function(i){"0000"==i.repCode?(t.barAreaColor="#4cae4c",t.barAreaBorderColor="#5cb85c",t.text="验证成功",t.bindingClick=!1,"pop"==t.mode&&setTimeout((function(){t.$parent.clickShow=!1,t.refresh()}),1500),t.$parent.$emit("success",{captchaVerification:e})):(t.$parent.$emit("error",t),t.barAreaColor="#d9534f",t.barAreaBorderColor="#d9534f",t.text="验证失败",setTimeout((function(){t.refresh()}),700))}))}),400)),this.num<this.checkNum&&(this.num=this.createPoint(this.getMousePos(this.$refs.canvas,e)))},getMousePos:function(e,t){var i=t.offsetX,o=t.offsetY;return{x:i,y:o}},createPoint:function(e){return this.tempPoints.push(Object.assign({},e)),++this.num},refresh:function(){this.tempPoints.splice(0,this.tempPoints.length),this.barAreaColor="#000",this.barAreaBorderColor="#ddd",this.bindingClick=!0,this.fontPos.splice(0,this.fontPos.length),this.checkPosArr.splice(0,this.checkPosArr.length),this.num=1,this.getPictrue(),this.text="验证失败",this.showRefresh=!0},getPictrue:function(){var e=this,t={captchaType:this.captchaType,clientUid:localStorage.getItem("point"),ts:Date.now()};Object(a["a"])(t).then((function(t){"0000"==t.repCode?(e.pointBackImgBase=t.repData.originalImageBase64,e.backToken=t.repData.token,e.secretKey=t.repData.secretKey,e.poinTextList=t.repData.wordList,e.text="请依次点击【"+e.poinTextList.join(",")+"】"):e.text=t.repMsg,"6201"==t.repCode&&(e.pointBackImgBase=null)}))},pointTransfrom:function(e,t){var i=e.map((function(e){var i=Math.round(310*e.x/parseInt(t.imgWidth)),o=Math.round(155*e.y/parseInt(t.imgHeight));return{x:i,y:o}}));return i}}},C=S,z=Object(y["a"])(C,k,x,!1,null,null,null),B=z.exports,T={name:"Vue2Verify",components:{VerifySlide:w,VerifyPoints:B},props:{locale:{require:!1,type:String,default:function(){if(navigator.language)var e=navigator.language;else e=navigator.browserLanguage;return e}},captchaType:{type:String,required:!0},figure:{type:Number},arith:{type:Number},mode:{type:String,default:"pop"},vSpace:{type:Number},explain:{type:String},imgSize:{type:Object,default:function(){return{width:"310px",height:"155px"}}},blockSize:{type:Object},barSize:{type:Object}},data:function(){return{clickShow:!1,verifyType:void 0,componentType:void 0,defaultImg:i("951a")}},computed:{instance:function(){return this.$refs.instance||{}},showBox:function(){return"pop"!=this.mode||this.clickShow}},watch:{captchaType:{immediate:!0,handler:function(e){switch(e.toString()){case"blockPuzzle":this.verifyType="2",this.componentType="VerifySlide";break;case"clickWord":this.verifyType="",this.componentType="VerifyPoints";break}}}},mounted:function(){this.uuid()},methods:{uuid:function(){for(var e=[],t="0123456789abcdef",i=0;i<36;i++)e[i]=t.substr(Math.floor(16*Math.random()),1);e[14]="4",e[19]=t.substr(3&e[19]|8,1),e[8]=e[13]=e[18]=e[23]="-";var o="slider-"+e.join(""),n="point-"+e.join("");console.log(localStorage.getItem("slider")),localStorage.getItem("slider")||localStorage.setItem("slider",o),localStorage.getItem("point")||localStorage.setItem("point",n)},i18n:function(e){if(this.$t)return this.$t(e);var t=this.$options.i18n.messages[this.locale]||this.$options.i18n.messages["en-US"];return t[e]},refresh:function(){this.instance.refresh&&this.instance.refresh()},closeBox:function(){this.clickShow=!1,this.refresh()},show:function(){"pop"==this.mode&&(this.clickShow=!0)}}},_=T,I=(i("ebe6"),Object(y["a"])(_,h,d,!1,null,null,null)),$=I.exports,P={name:"Login",components:{Verify:$},data:function(){var e=function(e,t,i){t?i():i(new Error("请输入用户名"))},t=function(e,t,i){t?t.length<6?i(new Error("请输入不少于6位数的密码")):i():i(new Error("请输入密码"))};return{fullWidth:document.body.clientWidth,swiperOption:{pagination:{el:".pagination"},autoplay:{enabled:!0,disableOnInteraction:!1,delay:3e3}},loginLogo:"",beian_sn:"",swiperList:[],captchatImg:"",loginForm:{account:"",password:"",key:"",code:""},loginRules:{account:[{required:!0,trigger:"blur",validator:e}],password:[{required:!0,trigger:"blur",validator:t}],code:[{required:!0,message:"请输入正确的验证码",trigger:"blur"}]},passwordType:"password",capsTooltip:!1,loading:!1,showDialog:!1,redirect:void 0,otherQuery:{},copyright:""}},watch:{fullWidth:function(e){if(!this.timer){this.screenWidth=e,this.timer=!0;var t=this;setTimeout((function(){t.timer=!1}),400)}},$route:{handler:function(e){var t=e.query;t&&(this.redirect=t.redirect,this.otherQuery=this.getOtherQuery(t))},immediate:!0}},created:function(){var e=this;document.onkeydown=function(t){if(-1!==e.$route.path.indexOf("login")){var i=window.event.keyCode;13===i&&e.handleLogin()}},window.addEventListener("resize",this.handleResize)},mounted:function(){var e=this;console.log(this.title),this.getInfo(),this.$nextTick((function(){e.screenWidth<768?document.getElementsByTagName("canvas")[0].removeAttribute("class","index_bg"):document.getElementsByTagName("canvas")[0].className="index_bg"})),this.getCaptcha(),this.getVersion()},beforeCreate:function(){this.fullWidth<768?document.getElementsByTagName("canvas")[0].removeAttribute("class","index_bg"):document.getElementsByTagName("canvas")[0].className="index_bg"},beforeDestroy:function(){window.removeEventListener("resize",this.handleResize),document.getElementsByTagName("canvas")[0].removeAttribute("class","index_bg")},destroyed:function(){},methods:{getInfo:function(){var e=this;Object(s["O"])().then((function(t){var i=t.data;e.swiperList=i.login_banner,e.loginLogo=i.login_logo,e.beian_sn=i.beian_sn,l.a.set("MerInfo",JSON.stringify(i)),console.log(l.a.get("MerInfo"))})).catch((function(t){var i=t.message;e.$message.error(i)}))},getVerify:function(){var e=this;return e.loginForm.account?e.loginForm.password?void this.$refs.verify.show():e.$message.error("请填写密码"):e.$message.error("请填写账号码")},getCaptcha:function(){var e=this;Object(s["h"])().then((function(t){var i=t.data;e.captchatImg=i.captcha,e.loginForm.key=i.key})).catch((function(t){var i=t.message;e.$message.error(i)}))},checkCapslock:function(e){var t=e.key;this.capsTooltip=t&&1===t.length&&t>="A"&&t<="Z"},showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){e.$refs.password.focus()}))},handleLogin:function(){var e=this;this.loginForm.captchaVerification="",this.$refs["loginForm"].validate((function(t){if(!t)return!1;e.loading=!0,Object(a["c"])({account:e.loginForm.account}).then((function(t){t.data.status?e.getVerify():e.loginIn()})).catch((function(t){e.$message.error(t.message)}))}))},loginIn:function(){var e=this;this.$store.dispatch("user/login",this.loginForm).then((function(t){console.log(t),e.$router.push({path:"/"}),e.loading=!1,e.$root.closeNotice(),e.$root.notice=Object(r["a"])(t.token)})).catch((function(t){e.loginForm.code="",e.$message.error(t.message),e.loading=!1}))},getOtherQuery:function(e){return Object.keys(e).reduce((function(t,i){return"redirect"!==i&&(t[i]=e[i]),t}),{})},handleResize:function(e){this.fullWidth=document.body.clientWidth,this.fullWidth<768?document.getElementsByTagName("canvas")[0].removeAttribute("class","index_bg"):document.getElementsByTagName("canvas")[0].className="index_bg"},getVersion:function(){var e=this;Object(s["s"])().then((function(t){console.log(t),e.copyright=t.data}))},success:function(e){this.isShow=!1,this.loginForm.captchaType="blockPuzzle",this.loginForm.captchaVerification=e.captchaVerification,this.loginIn()}}},W=P,O=(i("541a"),i("ea4e"),Object(y["a"])(W,o,n,!1,null,"09f53de6",null));t["default"]=O.exports},ea4e:function(e,t,i){"use strict";i("5411")},ebe6:function(e,t,i){"use strict";i("50de")}}]);