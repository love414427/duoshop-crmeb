<template>
	<view style="position: relative">
		<view class="verify-image-out" v-show="showImage">
			<view class="verify-image-panel" :style="{'width': imgSize.width,
                                                   'height': imgSize.height,
                                                   'margin-bottom': vSpace + 'px'}">
				<view class="verify-refresh" style="z-index:3" @click="refresh" v-show="showRefresh">
					<text class="iconfont icon-refresh"></text>
				</view>
				<image :src="pointBackImgBase?('data:image/png;base64,'+pointBackImgBase):defaultImg" id="image"
					ref="canvas" style="width:100%;height:100%;display:block"
					@click=" bindingClick? canvasClick($event): undefined"></image>
				<view v-for="(tempPoint, index) in tempPoints" :key="index" class="point-area" :style="{
                        'background-color':'#1abd6c',
                        color:'#fff',
                        'z-index':9999,
                        width:'20px',
                        height:'20px',
                        'text-align':'center',
                        'line-height':'20px',
                        'border-radius': '50%',
                        position:'absolute',
                        top:parseInt(tempPoint.y-10) + 'px',
                        left:parseInt(tempPoint.x-10) + 'px'
                     }">
					{{index + 1}}
				</view>
			</view>
		</view>
		<!-- 'height': this.barSize.height, -->
		<view class="verify-bar-area" :style="{'width': imgSize.width,
                      'color': barAreaColor,
                      'border-color': barAreaBorderColor,
                      'line-height':'40px'}">
			<text class="verify-msg">{{text}}</text>
		</view>
	</view>
</template>
<script type="text/babel">
	/**
     * VerifyPoints
     * @description 点选
     * */
    import {aesEncrypt} from "./../utils/ase.js"
	import {getAjcaptcha,ajcaptchaCheck} from '@/api/api.js';
	
    export default {
        name: 'VerifyPoints',
        props: {
            //弹出式pop，固定fixed
            mode: {
                type: String,
                default: 'fixed'
            },
            captchaType:{
                type:String,
            },
            //间隔
            vSpace: {
                type: Number,
                default: 5
            },
            imgSize: {
                type: Object,
                default() {
                    return {
                        width: '310px',
                        height: '155px'
                    }
                }
            },
            barSize: {
                type: Object,
                default() {
                    return {
                        width: '310px',
                        height: '40px'
                    }
                }
            },
			defaultImg: {
				type: String,
				default: ''
			}
        },
        data() {
            return {
                secretKey:'',        //后端返回的加密秘钥 字段
                checkNum:3,                 //
                fontPos: [],                // 选中的坐标信息
                checkPosArr: [],            //用户点击的坐标
                num: 1,                     //点击的记数
                pointBackImgBase:'',        //后端获取到的背景图片
                poinTextList:[],            //后端返回的点击字体顺序
                backToken:'',               //后端返回的token值
                imgRand: 0,                 //随机的背景图片
                setSize: {
                    imgHeight: 0,
                    imgWidth: 0,
                    barHeight: 0,
                    barWidth: 0
                },
                showImage: true,
                tempPoints: [],
                text: '',
                barAreaColor: '#fff',
                barAreaBorderColor: "#fff",
                showRefresh: true,
                bindingClick: true,
                imgLeft:'' ,
                imgTop:'',
            }
        },
        methods: {
            init() {
                //加载页面
                this.fontPos.splice(0, this.fontPos.length)
                this.checkPosArr.splice(0, this.checkPosArr.length)
                this.num = 1
                this.$nextTick(() => {
                    this.refresh();
                    this.$parent.$emit('ready', this)
                })
            },
            canvasClick(e) {
                const query = uni.createSelectorQuery().in(this);
                query.select('#image').boundingClientRect(data => {
                    this.imgLeft =Math.ceil(data.left)
                    this.imgTop =Math.ceil(data.top) 
                    this.checkPosArr.push(this.getMousePos(this.$refs.canvas, e));
                    if (this.num == this.checkNum) {
                        this.num = this.createPoint(this.getMousePos(this.$refs.canvas, e));
                        //按比例转换坐标值
                        this.checkPosArr = this.pointTransfrom(this.checkPosArr,this.imgSize);
                        //等创建坐标执行完
                        setTimeout(() => {
                            //发送后端请求
                            var captchaVerification =this.secretKey? aesEncrypt(this.backToken+'---'+JSON.stringify(this.checkPosArr),this.secretKey):this.backToken+'---'+JSON.stringify(this.checkPosArr)
                            let data = {
                                captchaType:this.captchaType,
                                "pointJson":this.secretKey? aesEncrypt(JSON.stringify(this.checkPosArr),this.secretKey):JSON.stringify(this.checkPosArr),
                                "token":this.backToken
                            }
                            ajcaptchaCheck(data).then(result => {
                                let res = result.data
                                this.barAreaColor = '#4cae4c'
								this.barAreaBorderColor = '#5cb85c'
                                this.text = '验证成功'
                                this.bindingClick = false
								setTimeout(()=>{
									if (this.mode=='pop') {
										this.$parent.clickShow = false;
									}
									this.refresh();
								},1500)
                                this.$parent.$emit('success', {captchaVerification})
                            }).catch(res=>{
								this.$parent.$emit('error', this)
								this.barAreaColor = '#d9534f'
								this.barAreaBorderColor = '#d9534f'
								this.text = '验证失败'
								setTimeout(() => {
									this.refresh();
								}, 700);
							})    
                        }, 400);
                    }
                    if (this.num < this.checkNum) {
                        this.num = this.createPoint(this.getMousePos(this.$refs.canvas, e));
                    }
                }).exec();
            },
            //获取坐标
            getMousePos: function (obj, e) {
                let position = {
                    x:Math.ceil(e.detail.x)-this.imgLeft,
                    y:Math.ceil(e.detail.y)-this.imgTop,
                }
                return position
            },
            //创建坐标点
            createPoint: function (pos) {
                this.tempPoints.push(Object.assign({}, pos))
                return ++this.num;
            },
            refresh: function () {
                this.tempPoints.splice(0, this.tempPoints.length)
                this.barAreaColor = '#000'
                this.barAreaBorderColor = '#ddd'
                this.bindingClick = true

                this.fontPos.splice(0, this.fontPos.length)
                this.checkPosArr.splice(0, this.checkPosArr.length)
                this.num = 1

                this.getPictrue();

                // this.text = '验证失败'
                this.showRefresh = true
            },
            // 请求背景图片和验证图片
            getPictrue(){
                let data = {
                    captchaType:this.captchaType,
					clientUid: uni.getStorageSync('point'),
					ts: Date.now(), // 现在的时间戳
                }
                getAjcaptcha(data).then((result) => {
                    let res = result.data
                    this.pointBackImgBase = res.originalImageBase64
                    this.backToken = res.token
                    this.secretKey = res.secretKey
                    this.poinTextList = res.wordList
                    this.text = '请依次点击【' + this.poinTextList.join(",") + '】'
                    }).catch(()=>{
						this.pointBackImgBase = null
					})
            },
            //坐标转换函数
            pointTransfrom(pointArr,imgSize){
                var newPointArr = pointArr.map(p=>{
                    let x = Math.round(310 * p.x/parseInt(imgSize.width)) 
                    let y =Math.round(155 * p.y/parseInt(imgSize.height)) 
                    return {x,y}
                })
                // console.log(newPointArr,"newPointArr");
                return newPointArr
            },
        },
        watch: {
            // type变化则全面刷新
            type: {
                immediate: true,
                handler() {
                    this.init()
                }
            }
        },
		mounted() {
			console.log(this.defaultImg)
		}
    }
</script>

<style scoped>
	.verifybox {
		position: relative;
		box-sizing: border-box;
		border-radius: 2px;
		border: 1px solid #e4e7eb;
		background-color: #fff;
		box-shadow: 0 0 10px rgba(0, 0, 0, .3);
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.verifybox-top {
		padding: 0 15px;
		height: 50px;
		line-height: 50px;
		text-align: left;
		font-size: 16px;
		color: #45494c;
		border-bottom: 1px solid #e4e7eb;
		box-sizing: border-box;
	}

	.verifybox-bottom {
		/* padding: 15px; */
		box-sizing: border-box;
	}

	.verifybox-close {
		position: absolute;
		top: 13px;
		right: 9px;
		width: 24px;
		height: 24px;
		text-align: center;
		cursor: pointer;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1001;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .3);
		/* display: none; */
		transition: all .5s;
	}

	.verify-tips {
		position: absolute;
		left: 0px;
		bottom: 0px;
		width: 100%;
		height: 30px;
		background-color: rgb(231, 27, 27, .5);
		line-height: 30px;
		color: #fff;
	}

	.tips-enter,
	.tips-leave-to {
		bottom: -30px;
	}

	.tips-enter-active,
	.tips-leave-active {
		transition: bottom .5s;
	}

	/* ---------------------------- */
	/*常规验证码*/
	.verify-code {
		font-size: 20px;
		text-align: center;
		cursor: pointer;
		margin-bottom: 5px;
		border: 1px solid #ddd;
	}

	.cerify-code-panel {
		height: 100%;
		overflow: hidden;
	}

	.verify-code-area {
		float: left;
	}

	.verify-input-area {
		float: left;
		width: 60%;
		padding-right: 10px;

	}

	.verify-change-area {
		line-height: 30px;
		float: left;
	}

	.varify-input-code {
		display: inline-block;
		width: 100%;
		height: 25px;
	}

	.verify-change-code {
		color: #337AB7;
		cursor: pointer;
	}

	.verify-btn {
		width: 200px;
		height: 30px;
		background-color: #337AB7;
		color: #FFFFFF;
		border: none;
		margin-top: 10px;
	}


	/*滑动验证码*/
	.verify-bar-area {
		position: relative;
		background: #FFFFFF;
		text-align: center;
		-webkit-box-sizing: content-box;
		-moz-box-sizing: content-box;
		box-sizing: content-box;
		border: 1px solid #ddd;
		-webkit-border-radius: 4px;
	}

	.verify-bar-area .verify-move-block {
		position: absolute;
		top: 0px;
		left: 0;
		background: #fff;
		cursor: pointer;
		-webkit-box-sizing: content-box;
		-moz-box-sizing: content-box;
		box-sizing: content-box;
		box-shadow: 0 0 2px #888888;
		-webkit-border-radius: 1px;
	}

	.verify-bar-area .verify-move-block:hover {
		background-color: #337ab7;
		color: #FFFFFF;
	}

	.verify-bar-area .verify-left-bar {
		position: absolute;
		top: -1px;
		left: -1px;
		background: #f0fff0;
		cursor: pointer;
		-webkit-box-sizing: content-box;
		-moz-box-sizing: content-box;
		box-sizing: content-box;
		border: 1px solid #ddd;
	}

	.verify-image-panel {
		margin: 0;
		-webkit-box-sizing: content-box;
		-moz-box-sizing: content-box;
		box-sizing: content-box;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		border-radius: 3px;
		position: relative;
	}

	.verify-image-panel .verify-refresh {
		width: 25px;
		height: 25px;
		text-align: center;
		padding: 5px;
		cursor: pointer;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 2;
	}

	.verify-image-panel .icon-refresh {
		font-size: 20px;
		color: #fff;
	}

	.verify-image-panel .verify-gap {
		background-color: #fff;
		position: relative;
		z-index: 2;
		border: 1px solid #fff;
	}

	.verify-bar-area .verify-move-block .verify-sub-block {
		position: absolute;
		text-align: center;
		z-index: 3;
		/* border: 1px solid #fff; */
	}

	.verify-bar-area .verify-move-block .verify-icon {
		width: 80rpx;
		height: 80rpx;
		font-size: 18px;
	}

	.verify-bar-area .verify-msg {
		z-index: 3;
	}

	/*字体图标的css*/
	/*@font-face {font-family: "iconfont";*/
	/*src: url('../fonts/iconfont.eot?t=1508229193188'); !* IE9*!*/
	/*src: url('../fonts/iconfont.eot?t=1508229193188#iefix') format('embedded-opentype'), !* IE6-IE8 *!*/
	/*url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),*/
	/*url('../fonts/iconfont.ttf?t=1508229193188') format('truetype'), !* chrome, firefox, opera, Safari, Android, iOS 4.2+*!*/
	/*url('../fonts/iconfont.svg?t=1508229193188#iconfont') format('svg'); !* iOS 4.1- *!*/
	/*}*/

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-check:before {
		content: " ";
		display: block;
		width: 16px;
		height: 16px;
		position: absolute;
		margin: auto;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 9999;
		background-image: url("@/static/images/arrow-good.png");
		background-size: contain;
	}

	.icon-close:before {
		content: " ";
		display: block;
		width: 16px;
		height: 16px;
		position: absolute;
		margin: auto;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 9999;
		background-image: url("@/static/images/arrow-close.png");
		background-size: contain;
	}

	.icon-right:before {
		content: " ";
		display: block;
		width: 16px;
		height: 16px;
		position: absolute;
		margin: auto;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-size: cover;
		z-index: 9999;
		background-image: url("@/static/images/arrow-right.png");
		background-size: contain;
	}

	.icon-refresh:before {
		content: " ";
		display: block;
		width: 16px;
		height: 16px;
		position: absolute;
		margin: auto;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 9999;
		background-image: url("@/static/images/refresh.png");
		background-size: contain;
	}
</style>
