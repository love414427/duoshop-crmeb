<template>
	<view class="user_about" :style="viewColor">
		<view>
			<view class="text cancelTxt" :class="{cancelTxt: type == 'the_cancellation_msg'}">
				<jyf-parser :html="data.replace(/<br\/>/ig, '')" ref="article" :tag-style="tagStyle"></jyf-parser>
			</view>
		</view>
		<view class="cancel" v-if="type == 'the_cancellation_msg' && loaded">
			<view class="checkbox" @click="setCheck">
				<view v-if="!check" class="iconfont icon-weixuanzhong"></view>
				<view v-else class="iconfont icon-xuanzhong1"></view>
				<view>已阅读并同意<text class="font" @click.stop="toCancel">《重要提醒》</text></view>
			</view>
			<view class="btn" @click="cancelBtn">
				申请注销
			</view>

		</view>
		<view class="outMoal" v-if="moal">
			<view class="box">
				<view class="title">该账号将永久注销</view>
				<view class="moalBtn">
					<view class="ok" @click="ok">确定</view>
					<view class="no" @click="cancelMoal">取消</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		cacheInfo,
		userOut,
		getLogout
	} from '@/api/user.js'
	import { mapGetters } from "vuex";
	export default {
		name: 'user_about',
		data() {
			return {
				type: '',
				data: '',
				check: false,
				moal: false,
				loaded: false,
				tagStyle: {
					img: 'width:100%;display:block;'
				},
			}
		},
		computed: mapGetters(['viewColor']),
		onLoad: function(options) {
			this.type = options.from;
			this.setTitle(this.type)
		},
		methods: {
			toCancel(){
				uni.redirectTo({
					url: '/pages/users/user_about/index?from=the_cancellation_prompt'
				})
			},
			setCheck() {
				this.check = !this.check
			},
			ok() {
				uni.showLoading({
					title: '注销中',
					mask: true
				});
				this.moal = false;
				(new Promise(call=>{
					userOut().then(res => {
						if(res.data.status === 200){
							uni.hideLoading()
							call()
						}else{
							uni.showModal({
								title: '提示',
								content: res.message,
								success: ({confirm}) => {
									if (confirm) {
										userOut({key: res.data.result.key}).then(res => {
											uni.hideLoading()
											if(res.data.status === 200){
												call()
											}else{
												this.$util.Tips({
													title: res.message
												});
											}
										})
									}else{
										uni.hideLoading()
									}
								}
							});
						}
					})
				})).then(v=>{
					this.$store.commit("LOGOUT");
					setTimeout(()=>{
						uni.reLaunch({
							url: '/pages/index/index'
						});
					}, 500);
				})
			},
			cancelBtn() {
				if (!this.check) {
					return uni.showToast({
						title: "请勾选已阅读",
						icon: 'none',
						duration: 2000,
					})
				} else {
					this.moal = true
				}
			},
			cancelMoal() {
				this.moal = false
				this.check = false
			},
			getCacheinfo() {
				this.loaded = false;
				cacheInfo(this.type).then(res => {
					this.data = res.data[this.type]
					if(res.data.title) {
						uni.setNavigationBarTitle({
							title: res.data.title
						})
					}
					this.loaded = true;
				})
			},
			setTitle(e) {
				switch (e) {
					case 'the_cancellation_msg':
						uni.setNavigationBarTitle({
							title: '注销账号'
						})
						this.getCacheinfo()
						break;
					case 'sys_about_us':
						uni.setNavigationBarTitle({
							title: '关于我们'
						})
						this.getCacheinfo()
						break;
					case 'sys_certificate':
						uni.setNavigationBarTitle({
							title: '资质证明'
						})
						this.getCacheinfo()
						break;
					default:
						uni.setNavigationBarTitle({
							title: '加载中...'
						})
						this.getCacheinfo()
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	.user_about {
		.text {
			font-size: 30rpx;
			font-weight: 400;
			padding: 30rpx;
			color: #282828;
		}
		.cancelTxt {
			overflow: hidden;
			overflow-y: auto;
			image{
				max-width: 100%;
			}
		}
		.cancel {
			position: fixed;
			bottom: 60rpx;
			left: 0;
			z-index: 1;
			width: 100%;
			.checkbox {
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0 auto;
				font-size: 24rpx;
				font-weight: 400;
				span {
					margin-left: 5rpx;
				}
				.font {
					color: var(--view-theme);
					font-style: normal;
				}
				.iconfont {
					font-size: 24rpx;
				}
			}
			.btn {
				width: 690rpx;
				height: 90rpx;
				background: var(--view-theme);
				border-radius: 45rpx;
				margin: 0 auto;
				margin-top: 30rpx;
				text-align: center;
				line-height: 90rpx;
				font-size: 32rpx;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
	}
	.outMoal {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		.box {
			position: fixed;
			width: 590rpx;
			height: 258rpx;
			background: #FFFFFF;
			opacity: 1;
			border-radius: 20rpx;
			text-align: center;
			padding: 50rpx;
			.title {
				font-size: 30rpx;
				font-weight: 600;
				color: #282828;
			}
			.moalBtn {
				margin-top: 43rpx;
				display: flex;
				justify-content: space-between;
				.ok {
					width: 234rpx;
					height: 66rpx;
					border: 1px solid var(--view-theme);
					border-radius: 33rpx;
					font-size: 26rpx;
					line-height: 66rpx;
					color: var(--view-theme);
				}
				.no {
					width: 234rpx;
					height: 66rpx;
					background: linear-gradient(90deg, var(--view-bntColor21) 0%, var(--view-bntColor21) 100%);
					border-radius: 33rpx;
					font-size: 26rpx;
					color: #FFFFFF;
					line-height: 66rpx;
				}
			}
		}
	}
</style>
