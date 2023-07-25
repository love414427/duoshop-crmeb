<template>
	<view :style="viewColor">
		<form @submit="formSubmit" report-submit='true'>
			<view class="release_content">
				<view class="release_tab acea-row">		
					<view class="tab_item" v-for="(item, index) in tabList" :key="item.value" :class="{on:tabActive == item.value}" @click="changeTab(item)">
						<text class="iconfont" :class="item.icon"></text>{{item.name}}
					</view>
				</view>
				<view>
					<view class="release_item">
						<view class="photo_count">
							<view class="input_photo acea-row row-middle">	
								<block v-if="tabActive == 2">
									<view class="pictrue" v-if="formData.video_link">
										<image class="video-bg" mode="widthFix" src="../static/images/video_bg.png"></image>
										<view class="videoHover" @click="videoshow">
											<view>
												<text class="iconfont icon-24gf-play"></text>
											</view>							
										</view>
										<text class="video-text">点击可预览视频</text>
										<view class="close_btn" @click="formData.video_link = ''"><text class="iconfont icon-guanbi4"></text></view>
									</view>
									<view v-else class="pictrue acea-row row-center-wrapper row-column add" @click="uploadVideo">
										<view><text class='iconfont icon-tianjiashipin'></text></view>
										<view class="text">添加视频</view>	
									</view>
									<view v-if="formData.image.length < 1" class="pictrue acea-row row-center-wrapper row-column add" @click.stop="clk">
										<view><text class='iconfont icon-fengmian'></text></view>
										<view class="text">添加封面</view>	
									</view>
								</block>
								<view class="pictrue" v-for="(item, index) in formData.image" :key="index">
									<easy-loadimage mode="widthFix" :image-src="item"></easy-loadimage>
									<text class="cover_text" v-if="tabActive == 2">封面</text>
									<view class="close_btn" @click="DelPic(index)"><text class="iconfont icon-guanbi4"></text></view>
								</view>
								<block v-if="tabActive == 1">
									<view v-if="formData.image.length < 6" class="pictrue acea-row row-center-wrapper row-column add" @click.stop="clk">
										<view><text class='iconfont icon-icon25201'></text></view>
										<view class="text">添加图片</view>	
									</view>
								</block>
								<view v-if="showCd" :ratio="16/9" class="container">
									<bt-cropper ref="cropper" :imageSrc="imageSrc" @cropEnd="loadImage" :dWidth="800">
										<!-- 你想插入的内容 -->
										<button class="crop_btn" @click="crop">裁切</button>
									</bt-cropper>
								</view>
							</view>
						</view>
						<view class="textarea">
							<textarea placeholder='分享使用体验和心得，获得更多点赞和关注哦~(600字以内)' name="comment" placeholder-class='placeholder'v-model="formData.content" maxlength="600"></textarea>
						</view>
					</view>
					<view class="release_item">
						<view class='item acea-row row-between-wrapper'>
							<view class='name'><text class="iconfont icon-baobeilianjie"></text>添加宝贝({{productList.length}})</view>
							<view class="select">
								<view class="select_count" @click.stop="addProduct">
									<text v-if="productList.length == 0" class="text">选择商品</text>
									<view v-else class="text">
										<image class="image" v-for="(item,index) in productList" :key="index" :src="item.image || (item.spu && item.spu.image)"></image>
									</view>
									<text class="iconfont icon-xiangyou"></text>
								</view>
							</view>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'><text class="iconfont icon-canyuhuati"></text>参与话题</view>
							<view class="select">
								<view class="select_count" @click="addTopic">
									<text v-if="!topicName.topic_name"class="text">选择话题</text>
									<text v-else class="text_name" @click.stop="deleteTopic">
										<text class="icon">#</text>
										<text class="title">{{topicName.topic_name}}</text>
										<text class="iconfont icon-guanbi5"></text>
									</text>
									<text class="iconfont icon-xiangyou"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<button class="release_btn button" form-type="submit">发布</button>
			</view>
		</form>
		<!--视频预览弹窗-->
		<view v-if="showVideo" class="video-count">
			<!--#ifndef APP-PLUS-->
			<video id="myVideo" class="videoLink" autoplay loop :src="formData.video_link"></video>
			<!--#endif-->
			<!--#ifdef APP-PLUS-->
			<video id="myVideo" class="videoLink" autoplay loop
			 :src='formData.video_link && (formData.video_link.substring(0,4) == "http" || formData.video_link.substring(0,5) == "https") ? formData.video_link : "http:" + formData.video_link'
			></video>
			<!--#endif-->
		</view>
		<view class='mask' catchtouchmove="true" :hidden='showVideo==false' @tap="showVideo=false"></view>
		<avatar @upload="doUpload" @getName="getImgName" quality="1" ref="avatar" selWidth="250upx" selHeight="250upx"></avatar>
		<!-- 提到的宝贝弹窗 -->
		<uni-popup ref="associated" type="bottom">
			<associated @close="close" @getProduct="getProduct" :checkedObj="productList"></associated>
		</uni-popup>
		<!-- 话题弹窗 -->
		<uni-popup ref="participateTopic" type="bottom">
			<participate-topic @close="close" @getTopic="getTopic"></participate-topic>
		</uni-popup>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
	</view>	
</template>

<script>
	// +----------------------------------------------------------------------
	// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
	// +----------------------------------------------------------------------
	// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
	// +----------------------------------------------------------------------
	// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
	// +----------------------------------------------------------------------
	// | Author: CRMEB Team <admin@crmeb.com>
	// +----------------------------------------------------------------------
	import { mapGetters } from "vuex";
	import authorize from '@/components/Authorize';
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	import associated from '../components/associated.vue';
	import participateTopic from '../components/participateTopic.vue';
	import {TOKENNAME, HTTP_REQUEST_URL} from '@/config/app.js';
	import {createPlantApi, updatePlantApi, plantDetailApi, orderAssociatePlantApi} from "@/api/community";
	import { setStorage, getStorage } from '../../../libs/uniApi.js';
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';
	import { configMap } from '@/utils';
	import store from '@/store';
	export default {
		components: {
			avatar,
			associated,
			participateTopic,
			authorize,
			easyLoadimage
		},
		data() {
			return {
				formData: {
					image: [],
					content: "",
					topic_id: "",
					spu_id: [],
					video_link: ''
				},
				imageSrc: '',
				productList: [],
				topicName: {},
				isUpload: true,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				showCd: false,
				id: "",
				order_id: "",
				imgName: "",
				upload_max: 50,
				uploadUrl: `${HTTP_REQUEST_URL}/api/upload/video`,
				tabList: [
					{name: '图文', value: 1, icon: 'icon-tuwen'},
					{name: '视频', value: 2, icon: 'icon-shipin'},
				],
				tabActive: 1,
				isPlay: false,
				videoContext: "",
				video_link: "",
				showVideo: false,
				videoplay: false,
				videoContext: ''
			};
		},
		computed: {
			...mapGetters(['isLogin', 'viewColor', 'uid']),
			...configMap({community_app_switch: []})
		},
		watch:{},
		mounted() {
			// #ifndef APP-PLUS
			this.videoContext = uni.createVideoContext('myVideo', this);
			// #endif
		},
		onLoad(options) {
			this.id = options.id;
			this.order_id = options.order_id;
			this.tabActive = options.type || 1;
			if(this.community_app_switch.length == 1){
				if(this.community_app_switch[0] == 1){
					this.tabList = [
						{name: '图文', value: 1, icon: 'icon-tuwen'},
					]
				}else{
					this.tabList = [
						{name: '视频', value: 2, icon: 'icon-shipin'},
					]
				}
			}
			if (!this.isLogin)  {
				this.isAuto = true;
				this.isShowAuth = true
			}else{
				if(this.id){
					this.getDetail()
				} else {
					const data = getStorage('addPlant');
					this.tabActive = getStorage('tabActive') || this.community_app_switch[0] || options.type || 1;
					if(data){
						this.formData.content = data.content || '';
						this.formData.image = data.image || [];
						this.formData.video_link = data.video_link || ''
					}
				}
				if(this.order_id)this.getOrderGoods()
			}
			this.videoContext = uni.createVideoContext("myvideo", this);
		},
		methods: {
			onLoadFun() {
				this.isShowAuth = false;
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e;
			},			
			/*获取图文详情*/
			getDetail(){
				let that = this
				plantDetailApi(that.id).then(res => {
					that.formData = res.data
					that.productList = res.data.relevance || []
					that.topicName = res.data.topic || {}
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				})
			},
			/*获取关联订单商品*/
			getOrderGoods(){
				let that = this
				orderAssociatePlantApi(that.order_id).then(res => {
					that.productList = res.data || []
					that.formData.spu_id = res.data.map(val => val.spu_id)
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				})
			},
			/*切换tab*/
			changeTab(item) {
				if(this.tabActive == item.value) return
				this.tabActive = item.value
				this.formData.image = []
			},
			/*删除话题*/
			deleteTopic(){
				this.formData.topic = {}
				this.topicName = {}
			},
			clk() {
				let that = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					success: (res) => {
						console.log(res)	
						let tempFilePaths = res.tempFilePaths[0]
						//#ifdef APP-PLUS
						if(uni.getSystemInfoSync().platform == 'ios'){
							that.doUpload(tempFilePaths)
						}else{
							let size = res.tempFiles[0].size/1024
							if(size >= 1){
								uni.compressImage({
									src: tempFilePaths,
									quality: 80, // 仅对jpg有效
									success: res => {
										that.imageSrc = res.tempFilePath;
										that.showCd = true;
									},
									fail: err => {
										console.log('失败了compressImage', tempFilePaths);
										that.imageSrc = tempFilePaths
										that.showCd = true
									}
								})
							}else{
								that.imageSrc = tempFilePaths
								that.showCd = true
							}
						}
						//#endif
						//#ifndef APP-PLUS
							that.imageSrc = tempFilePaths
							that.showCd = true
						//#endif
					}
				})
			},
			crop(){
				uni.showLoading({
					title: '',
					mask: true
				})
			  // 通过组件定义的ref调用cropper方法，返回一个promise对象
			  this.$refs.cropper.crop().then(([err,res])=>{
					if(!err){
						uni.hideLoading()
						this.doUpload(res.tempFilePath)
					}else{
						uni.hideLoading()
						console.log(err)
					}
				})
			},
			loadImage() {
				this.showCd = false
			},
			doUpload(rsp) {
				let that = this
				uni.showLoading({
					title: '上传中',
					mask: true
				})
				uni.uploadFile({
					url: HTTP_REQUEST_URL + '/api/upload/image/field',
					filePath: rsp,
					name: 'field',
					formData: {
						'filename': rsp,
						'name': that.imgName
					},
					header: {
						// #ifdef MP
						"Content-Type": "multipart/form-data",
						// #endif
						[TOKENNAME]: 'Bearer ' + store.state.app.token
					},
					success: (uploadFileRes) => {
						let imgData = JSON.parse(uploadFileRes.data)
						if(imgData.data.path){
							that.formData.image.push(imgData.data.path)
							uni.hideLoading()
						}
					},
					complete(res) {}
				});
			},
			// 上传视频
			uploadVideo() {
				let that = this
				uni.chooseVideo({
					sourceType: ['camera', 'album'],
					success: res => {
						uni.showLoading({
							title: '视频上传中',
						});
						if (Math.ceil(res.size / 1024) < that.upload_max * 1024) {
							uni.uploadFile({
								url: that.uploadUrl, //仅为示例，非真实的接口地址
								filePath: res.tempFilePath,
								name: 'file',
								//请求参数
								formData: {
									user: 'test'
								},
								header: {
									// #ifdef MP
									'Content-Type': 'multipart/form-data',
									// #endif
									[TOKENNAME]: 'Bearer ' + store.state.app.token
								},
								success: uploadFileRes => {
									uni.hideLoading();
									let data = JSON.parse(uploadFileRes.data);
									that.formData.video_link = (data.data.src);
								},
								complete: a => {
									uni.hideLoading();
								},
								fail: function(res) {
									uni.hideLoading();
									that.Tips({
										title: res.message
									});
								}
								
							});
						} else {
							uni.hideLoading();
							uni.showModal({
								title: '提示',
								content: `视频超出限制${that.upload_max}MB`
							});
						}
					},
					fail: err => {
						that.$util.Tips({
							title: err
						});
					}
				});
			},
			getImgName(name){
				this.imgName = name
			},
			/**删除图片*/
			DelPic: function(index) {
				let that = this
				that.formData.image.splice(index, 1);
			},
			/*添加宝贝*/
			addProduct(){
				this.$refs.associated.open();
			},
			/*添加话题*/
			addTopic(){
				this.$refs.participateTopic.open();
			},
			close(){
				this.$refs.associated.close();
				this.$refs.participateTopic.close();
			},
			/*查看视频*/
			videoshow() {
				this.showVideo = true
				this.videoContext = uni.createVideoContext('myVideo', this);
				this.$nextTick(()=>{
					this.videoContext.play();
				})
			},
			screenChange(e) {
				let fullScreen = e.detail.fullScreen; //值true为进入全屏，false为退出全屏 
				if (!fullScreen) { 
					this.videoplay = false
					//退出全屏 this.videoplay = false; // 隐藏播放盒子 
				} 
			},
			/*获取选中的宝贝*/
			getProduct(data){
				this.productList = data;
				this.formData.spu_id = data.map(val => val.spu_id)
				this.$refs.associated.close();
			},
			/*获取选中的话题*/
			getTopic(item){
				if(!item.topic_id){
					this.topicName = {}
				}else{
					this.topicName = item
				}
				this.formData.topic_id = item.topic_id;
				this.$refs.participateTopic.close();
			},
			/**
			 * 提交数据
			 */
			formSubmit: function(e) {
				let that = this;
				let value = that.formData;
				if (!that.isLogin)  {
					that.isAuto = true;
					that.isShowAuth = true;
					if(!that.id){
						setTimeout(()=>{
							setStorage('addPlant', value);
							setStorage('tabActive', that.tabActive);
						});
					}
				}else{
					if (value.image.length == 0) return that.$util.Tips({
						title: '请添加话题图片'
					});
					if (!value.content) return that.$util.Tips({
						title: '请分享使用心得和体会'
					});
					if(that.tabActive == 2 && !value.video_link){
						return that.$util.Tips({
							title: '请添加话题视频'
						});
					}
					if(that.id){
						if (value.relevance.length){
							value.spu_id = value.relevance.map(val => (val.spu&&val.spu.spu_id) || val.spu_id)
						}
					}
					value.order_id = that.order_id
					value.is_type = that.tabActive
					uni.showLoading({
						title: '保存中',
						mask: true
					})
					that.id ? updatePlantApi(that.id, value).then(res => {
						uni.hideLoading()
						that.$util.Tips({
							title: res.messge,
							icon: 'success'
						});
						if(that.tabActive == 2){
							uni.navigateTo({
								//#ifdef APP
								url: '/pages/short_video/appSwiper/index?id='+res.data.community_id+'&user=1&uid='+that.uid
								//#endif
								//#ifndef APP
								url: '/pages/short_video/nvueSwiper/index?id='+res.data.community_id+'&user=1&uid='+that.uid
								//#endif
							});
						}else{
							uni.redirectTo({
								url:'/pages/plantGrass/plant_detail/index?id='+res.data.community_id+'&type='+that.tabActive
							})
						}
					}).catch(err => {
						return that.$util.Tips({
							title: err
						});
					}) : createPlantApi(value).then(res => {
						uni.hideLoading()
						that.$util.Tips({
							title: res.messge,
							icon: 'success'
						});
						setStorage('addPlant', '');
						setStorage('tabActive',1)

						if(that.tabActive == 2){
							uni.navigateTo({
								//#ifdef APP
								url: '/pages/short_video/appSwiper/index?id='+res.data.community_id+'&user=1&uid='+that.uid
								//#endif
								//#ifndef APP
								url: '/pages/short_video/nvueSwiper/index?id='+res.data.community_id+'&user=1&uid='+that.uid
								//#endif
							});
						}else{
							uni.redirectTo({
								url:'/pages/plantGrass/plant_detail/index?id='+res.data.community_id+'&type='+that.tabActive
							})
						}
					}).catch(err => {
						return that.$util.Tips({
							title: err
						});
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #F5F5F5;
	}
	.crop_btn{
		line-height: 90rpx;
		height: 90rpx;
		height: calc(90rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		height: calc(90rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
	}
	.container{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 20;
		width: 750rpx;
		height:100vh;
	}
	.release_content{
		margin-top: 30rpx;
		.release_tab{
			border-radius: 16rpx 16rpx 0 0;
			border-bottom: 1rpx solid #E4E4E4;
			background: #fff;
			align-items: center;
			justify-content: center;
			height: 86rpx;
			.tab_item{
				margin: 0 40rpx;
				font-size: 32rpx;
				color: #999;
				position: relative;
				line-height: 86rpx;
				cursor: pointer;
				&.on{
					color: #E93323;
					&::after{
						content: "";
						display: inline-block;
						width: 100%;
						height: 3rpx;
						background: #E93323;
						position: absolute;
						bottom: 2rpx;
						left: 0;
					}
				}
				.iconfont{
					margin-right: 10rpx;
					font-size: 32rpx;
				}
			}
		}
		padding: 0 20rpx;
		.release_item{
			background: #ffffff;
			padding: 0 30rpx;
			border-radius: 10rpx;
		}
		.photo_count{
			padding: 30rpx 0;
		}
	}
	/deep/.input_photo .easy-loadimage,/deep/.input_photo uni-image,/deep/.input_photo image{
		width: 180rpx;
		height: 180rpx;
		border-radius: 12rpx!important;
	}
	.input_photo .pictrue{
		width: 180rpx;
		height: 180rpx;
		border-radius: 12rpx!important;
		margin-right: 11rpx;
		position: relative;
		overflow: hidden;
		&:nth-child(3n){
			margin-right: 0;
		}
		.close_btn{
			width: 30rpx;
			height: 30rpx;
			background: rgba(0,0,0,.6);
			border-radius: 0 12rpx 0 12rpx;
			position: absolute;
			top: 0;
			right: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 10;
			.iconfont{
				color: #ffffff;
				font-size: 12rpx;
			}
		}
		.cover_text{
			display: flex;
			width: 58rpx;
			height: 29rpx;
			background: #E93323;
			border-radius: 0px 12rpx 0px 12rpx;
			position: absolute;
			left: 0;
			bottom: 0;
			z-index: 10;
			align-items: center;
			justify-content: center;
			font-size: 18rpx;
			color: #fff;
		}
	}
	/deep/.loading-img{
		width: 180rpx;
		height: 180rpx;
		border-radius: 12rpx;
	}
	.input_photo .pictrue{
		margin-bottom: 20rpx;
		.videoHover{
			width: 180rpx;
			height: 180rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 10;
			>view{
				width: 50rpx;
				height: 50rpx;
				background: #000000;
				border-radius: 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.iconfont{
					color: #ffffff;
					font-size: 21rpx;
				}
			}	
		}
		.video-text{
			display: block;
			width: 180rpx;
			text-align: center;
			color: #ffffff;
			font-size: 18rpx;
			z-index: 13;
			position: absolute;
			bottom: 20rpx;
		}
		video{
			width: 180rpx;
			height: 180rpx;
			border-radius: 12rpx;
		}
	}
	.input_photo .add{
		background: #f6f6f6;
		color: #666666;
		.iconfont{
			font-size: 50rpx;
		}
		.text{
			margin-top: 20rpx;
			font-size: 27rpx;
		}
	}
	.textarea textarea {
		font-size: 28rpx;
		padding-bottom: 38rpx;
		width: 100%;
		box-sizing: border-box;
		height: 400rpx;
		overflow: hidden;
	}
	.textarea .placeholder {
		color: #BBBBBB;
	}
	.release_item .item{
		height: 106rpx;
		border-bottom: 1rpx solid #eee;
		position: relative;
		font-size: 30rpx;
		&:last-child{
			border-bottom: none;
		}
		.name{
			color: #333333;
			.iconfont {
				margin-right: 10rpx;
				font-size: 28rpx;
			}
		}
		.select{
			color: #bbbbbb;
			.select_count{
				display: flex;
				align-items: center;
			}
			.text{
				margin-right: 15rpx;
				display: flex;
				align-items: center;
				.image,image,uni-image{
					width: 60rpx;
					height: 60rpx;
					margin-right: 5rpx;
				}
			}
			.iconfont{
				font-size: 24rpx;
			}
			.text_name{
				color: var(--view-theme);
				padding: 5rpx 12rpx;
				background: var(--view-minorColor);
				border-radius: 23rpx;
				font-size: 24rpx;
				margin-right: 10rpx;
				.icon{
					color: var(--view-theme);
					font-weight: bold;
					font-size: 24rpx;
				}
				.title{
					margin: 0 10rpx;
				}
				.iconfont{
					font-size: 16rpx;
				}
			}
		}
	}
	.button{
		width: 710rpx;
		height: 86rpx;
		line-height: 86rpx;
		color: #ffffff;
		text-align: center;
		font-size: 32rpx;
		background: var(--view-theme);
		border-radius: 43rpx;
	}
	.release_btn{
		margin-top: 160rpx;
	}
	.video-count{
		position: fixed;
		width: 600rpx;
		height: 500rpx;
		top: 50%;
		left: 50%;
		margin-left: -300rpx;
		margin-top: -250rpx;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		.videoLink{
			width: 600rpx;
			height: 500rpx;
		}
	}
</style>
