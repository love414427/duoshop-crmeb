<template>
	<view>
		<view class='mask' v-if='isShowAuth && code' @click='close'></view>
		<view class='Popup' v-if='isShowAuth && code' :style="'top:'+top+'px;'">
			<view class="logo-auth">
				<image class="image" :src='routine_logo' mode="aspectFit"></image>
			</view>
			<!--#ifdef H5-->
			<text v-if="isWeixin" class='title'>授权提醒</text>
			<text v-else class='title'>{{title}}</text>
			<!--#endif-->
			<!--#ifdef APP-PLUS-->
			<text class='title'>用户登录</text>
			<!--#endif-->
			<!--#ifdef MP-->
			<text class='title'>{{title}}</text>
			<!--#endif-->
			<!--#ifdef H5-->
			<text v-if="isWeixin" class='tip'>请授权头像等信息，以便为您提供更好的服务！</text>
			<text v-else class='tip'>{{info}}</text>
			<!--#endif-->
			<!--#ifdef APP-PLUS-->
			<text class='tip'>请登录，将为您提供更好的服务！</text>
			<!--#endif-->
			<!--#ifdef MP-->
			<text class='tip'>{{info}}</text>
			<!--#endif-->
			<view class='bottom flex'>
				<text class='item' @click='close'>随便逛逛</text>
				<!-- #ifdef MP -->
				<button class="item grant" hover-class="none"
					@tap="getUserProfile"><text class="text">去授权</text></button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<button class="item grant" @tap="toWecahtAuth">
					<text class="text">去登录</text>
				</button>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<button class="item grant" @tap="toWecahtAuth">
					<text v-if="isWeixin" class="text">去授权</text>
					<text v-else class="text">去登录</text>
				</button>
				<!-- #endif -->
			</view>
		</view>
		<!-- #ifdef MP -->
		<editUserModal :isShow="editModal" @closeEdit="closeEdit" @editSuccess="editSuccess"></editUserModal>
		<!-- #endif -->
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
	const app = getApp();
	import Cache from '../utils/cache';
	import {
		getLogo, commonAuth
	} from '../api/public';
	import { LOGO_URL, USER_INFO, EXPIRES_TIME} from '../config/cache';
	import { mapGetters } from 'vuex';
	import Routine from '../libs/routine';
	import { configMap } from '@/utils/index';
	import Auth from '../libs/wechat';
	import { toLogin } from '../libs/login';
	// #ifdef MP
	import editUserModal from '@/components/eidtUserModal/index.vue'
	// #endif
	export default {
		name: 'Authorize',
		props: {
			isAuto: {
				type: Boolean,
				default: true
			},
			isGoIndex: {
				type: Boolean,
				default: true
			},
			isShowAuth: {
				type: Boolean,
				default: false
			}
		},
		components: {
			// #ifdef MP
			editUserModal
			// #endif
		},
		data() {
			return {
				title: '用户登录',
				info: '请登录，将为您提供更好的服务！',
				//#ifdef H5
				isWeixin: this.$wechat.isWeixin(),
				//#endif
				//#ifdef MP
				title: '授权提醒',
				info: '请授权头像等信息，以便为您提供更好的服务！',
				//#endif
				canUseGetUserProfile: false,
				code: null,
				top: 0,
				mp_is_new: this.$Cache.get('MP_VERSION_ISNEW') || false,
				editModal: false, // 编辑头像信息
			}
		},
		computed: {
			...mapGetters(['isLogin', 'userInfo', 'viewColor']),
			...configMap(['routine_logo'])
		},
		watch: {
			isLogin(n) {
				n === true && this.$emit('onLoadFun', this.userInfo);
			},
			isShowAuth(n) {
				this.getCode(this.isShowAuth)
			}
		},
		created() {
			this.top = uni.getSystemInfoSync().windowHeight/2-70
			if (wx.getUserProfile) {
				this.canUseGetUserProfile = true
			}
			this.setAuthStatus();
			this.getCode(this.isShowAuth)
		},
		methods: {
			// #ifdef MP
			editSuccess() {
				this.editModal = false
				this.$emit('onLoadFun', this.userInfo);
			},
			closeEdit() {
				this.editModal = false
			},
			// #endif
			setAuthStatus() {
				//#ifdef MP
				Routine.authorize().then(res => {
					if (res.islogin === false)
						this.$emit('onLoadFun', this.userInfo);
				}).catch(res => {
					if (this.isAuto)
						this.$emit('authColse', true);
				})
				//#endif
			},
			getCode(n){
				// #ifdef MP
					if (n) {
						uni.showLoading({
							title: '正在登录中'
						});
						Routine.getCode().then(code => {
							uni.hideLoading();
							this.code = code;
						}).catch(e => {
							uni.hideLoading();
							uni.showToast({
								title: '登录失败',
								duration: 2000
							});
						})
					} else {
						this.code = null;
					}
					// #endif
					// #ifndef MP
					if(n){
						this.code = 1;
					}
					// #endif
			},
			toWecahtAuth(){
				toLogin(true);
			},
			getUserProfile() {
				let self = this;
				Routine.getUserProfile()
					.then(res => {
						let userInfo = res.userInfo;
						userInfo.code = this.code;
						userInfo.spread = app.globalData.spid; //获取推广人ID
						userInfo.spread_code = app.globalData.code; //获取推广人分享二维码ID
						commonAuth({
							auth: {
							type:'routine',
							auth: userInfo
						}
						}).then(res=>{
							if(res.data.status == 200){
								let time = res.data.result.expires_time - Cache.time();
								self.$store.commit('UPDATE_USERINFO', res.data.result.user);
								self.$store.commit('LOGIN', {token:res.data.result.token, time:time});
								self.$store.commit('SETUID', res.data.result.user.uid);
								Cache.set(EXPIRES_TIME,res.data.result.expires_time,time);
								Cache.set(USER_INFO,res.data.result.user,time);
								this.$emit('onLoadFun', res.data.result.user);
								if(res.data.result.user.isNew && this.mp_is_new){
									this.editModal = true;
								}
							}else{
								uni.setStorageSync('auth_token',res.data.result.key);
								return uni.navigateTo({
									url:'/pages/users/login/index'
								})
							}
						}).catch(res => {
							uni.hideLoading();
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000,
								
							});
						});
					})
					.catch(res => {
						uni.hideLoading();
					});
			},
			close() {
				let pages = getCurrentPages(),
					currPage = pages[pages.length - 1];
					this.$emit('authColse', false);
				// if (this.isGoIndex) {
				// 	uni.switchTab({
				// 		url: '/pages/index/index'
				// 	});
				// } else {
				// 	this.$emit('authColse', false);
				// }
			},
		}
	}
</script>

<style scoped lang='scss'>
	.Popup {
		flex: 1;
		align-items: center;
		justify-content: center;
		width: 500rpx;
		background-color: #fff;
		position: fixed;
		top: 500rpx;
		left: 125rpx;
		z-index: 1000;
	}
	.Popup {
		.logo-auth {
			z-index: -1;
			position: absolute;
			left: 50%;
			top: 0%;
			transform: translate(-50%, -50%);
			width: 150rpx;
			height: 150rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 8rpx solid #fff;
			border-radius: 50%;
			background: #fff;
		}
		.image {
			height: 42rpx;
			margin-top: -54rpx;
		}
	}

	.Popup .title {
		font-size: 28rpx;
		color: #000;
		text-align: center;
		margin-top: 30rpx;
		align-items: center;
		justify-content: center;
		width: 500rpx;
		display: flex;
	}
	.Popup .tip {
		font-size: 22rpx;
		color: #555;
		padding: 0 24rpx;
		margin-top: 25rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.Popup .bottom .item {
		width: 250rpx;
		height: 80rpx;
		background-color: #eeeeee;
		text-align: center;
		line-height: 80rpx;
		margin-top: 54rpx;
		font-size: 24rpx;
		color: #666;
		.text{
			font-size: 24rpx;
			color: #666;
		}
	}
	.Popup .bottom .item.on {
		width: 500rpx;
	}
	.flex {
		display: flex;
		flex-direction: row;
	}
	.Popup .bottom .item.grant {	
		font-weight: bold;
		background-color: #E93323;
		/* background-color: var(--view-theme); */
		border-radius: 0;
		padding: 0;
		.text{
			font-size: 28rpx;
			color: #fff;
		}
	}
	.mask {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.65);
		z-index: 99;
	}
</style>
