<template>
	<view>
		<view class='password-window' :class='window==true?"on":""'>
			<view class='passwordCount'>
				<view class="title1 acea-row row-between-wrapper">
					<image v-if="userInfo.avatar" :src="userInfo.avatar" class="picture"></image>
					<text class="name line1">{{userInfo.nickname}}</text>
					给你分享了宝贝
				</view>
				<view class="banner">
					<image :src="storeInfo.image"></image>
				</view>
				<view class="pro-info">
					<view class="price acea-row">¥<text class="money">{{storeInfo.price}}</text>
						<text v-if="storeInfo.product_type == 0" class="pro_type">普通商品</text>
					</view>
					<view class="name line1">{{storeInfo.store_name}}</view>
				</view>
				<button v-if="storeInfo.product_type != 3" class="go_btn" @click="goDetail(storeInfo)">查看详情</button>
				<button v-if="storeInfo.product_type == 3" class="go_btn btn1" @click="goDetail(storeInfo)">帮他助力</button>
			</view>
			<view class='lid'>
				<view class='iconfont icon-guanbi3' @click="close"></view>
			</view>
		</view>
		
		<view class='mask' catchtouchmove="true" :hidden="window==false" style="z-index: 999;"></view>
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

	import { pwdResolution } from '@/api/user.js'
	import { mapGetters } from "vuex";
	import {toLogin} from '@/libs/login.js';
	import { goShopDetail } from '@/libs/order.js'
	import {initiateAssistApi} from '@/api/activity.js';
	export default {
		props: {
			isLogin:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				window: false,
				couponList: [],
				userInfo: {
					
				},
				storeInfo: {
					
				},
				pwdInfo: {}
			};
		},
		computed: mapGetters(["copyPwd", "uid"]),
		watch: {
			copyPwd:{
				handler(nVal,oVal){
					if(nVal)this.resolution(nVal)
				},
				immediate: true,
				deep:true
			}
		},
		mounted(){		
		},
		beforeDestroy(){
			
		},
		methods: {
			close:function(){
			    this.window = false
			},
			resolution(data){
				let com = uni.getStorageSync('pwdKey')
				pwdResolution(data).then(res => {
					if(res.data.user && res.data.user.uid != this.uid && com !=res.data.com){
						this.window = true;
						this.pwdInfo = res.data;
						this.userInfo = res.data.user;
						this.storeInfo = res.data.data;
						if(res.data.activity_id )this.storeInfo.activity_id = res.data.activity_id 
						if(res.data.product_type )this.storeInfo.product_type = res.data.product_type 
						this.$store.commit("PARSE_PWD", null)
						uni.setStorageSync('pwdKey', res.data.com);
					}
				})
			},
			goDetail(item){
				goShopDetail(item, this.uid).then(res => {
					this.$store.commit("PARSE_PWD", null)
					if (this.isLogin) {
							initiateAssistApi(item.activity_id).then(res => {
								let id = res.data.product_assist_set_id;
								uni.hideLoading();
								uni.navigateTo({
									url: '/pages/activity/assist_detail/index?id=' + id
								});					
							}).catch((err) => {
								uni.showToast({
									title: err,
									icon: 'none'
								})
							});
						} else {
							// #ifdef H5 || APP-PLUS
							toLogin();
							// #endif 
							// #ifdef MP
							this.$emit('isShowAuth', true);
							this.$emit('isAuto', true);
							// #endif
						}
					})		
			}
		}
	}
</script>

<style scoped lang="scss">
	.password-window {
		background-image: url('/static/images/passwordPop.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-color: #fff;
		width: 580rpx;
		height: 910rpx;
		position: fixed;
		top: 50%;
		z-index: 1000;
		left: 50%;
		margin-left: -290rpx;
		margin-top: -455rpx;
		transform: translate3d(0, -200%, 0);
		transition: all .3s cubic-bezier(.25, .5, .5, .9);
		border-radius: 24rpx;
		padding: 25rpx 30rpx 40rpx;
	}
	
	.password-window.on {
		transform: translate3d(0, 0, 0);
	}
	.passwordCount .title1{
		width: 380rpx;
		margin: 0 auto;
		height: 42rpx;
		background: #F1F1F1;
		border-radius: 23rpx;
		padding: 0 15rpx;
		color: #666666;
		font-size: 24rpx;
		.picture{
			width: 36rpx;
			height: 36rpx;
			border-radius: 100%;
			image{
				width: 36rpx;
				height: 36rpx;
			}
		}
		.name{
			color: #282828;
			font-weight: bold;
			max-width: 100rpx;
			margin: 0 10rpx;
		}
	}
	.password-window .banner{
		width: 520rpx;
		height: 520rpx;
		margin-top: 25rpx;
		image{
			width: 520rpx;
			height: 520rpx;
			border-radius: 16rpx;
		}
	}
	.password-window .pro-info{
		margin-top: 15rpx;
		.price{
			color: #E93323;
			font-size: 26rpx;
			justify-content: left;
			align-items: center;
			.money{
				font-size: 42rpx;
			}
		}
		.pro_type{
			display: inline-block;
			width: 100rpx;
			height: 28rpx;
			text-align: center;
			line-height: 28rpx;
			background: #FDEAE8;
			margin-left: 30rpx;
			font-size: 18rpx;
			position: relative;
			&::before{
				content: "";
				display: inline-block;
				width: 0;
				height: 0;
				border-width: 15rpx 15rpx 15rpx 0;
				border-style: solid;
				border-color: transparent #FDEAE8 transparent transparent;
				position: absolute;
				left: -16rpx;
			}
			&::after{
				content: "";
				display: inline-block;
				width: 6rpx;
				height: 6rpx;
				background: #fff;
				border-radius: 100%;
				position: absolute;
				top: 12.5rpx;
				left: -4rpx;
				z-index: 10;
			}
		}
		.name{
			margin-top: 15rpx;
			color: #282828;
			font-size: 30rpx;
		}
	}
	.password-window .lid {
		position: absolute;
		bottom: -100rpx;
		left: 0;
		width: 100%;
		text-align: center;
	}
	.go_btn{
		margin-top: 50rpx;
		width: 520rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: #E93323;
		color: #ffffff;
		border-radius: 40rpx;
		font-size: 28rpx;
		&.btn1{
			background: #FC8327
		}
	}
	.password-window .lid .iconfont {
		color: #fff;
		font-size: 60rpx;
		text-align: center;
		margin-left: -30rpx;
	}
</style>
