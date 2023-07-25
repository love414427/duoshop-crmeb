<template>
	<view :style="viewColor">
		<view class="product-window" :class="{'on':isShow}">
			<view class="iconfont icon-guanbi" @click="closeAttr"></view>
			<view class="mp-data">
				<image :src="routine_logo" mode=""></image>
				<text class="mp-name">{{site_name}} 申请</text>
			</view>
			<view class="trip-msg">
				<view class="title">
					获取您的昵称、头像
				</view>
				<view class="trip">
					提供具有辨识度的用户中心界面
				</view>
			</view>
			<form @submit="formSubmit">
				<view class="edit">
					<view class="avatar edit-box">
						<view class="left">
							<view class="head">头像</view>
							<!-- <image :src="userInfo.avatar || defaultAvatar" mode=""></image> -->
							<view class="avatar-box" v-if="!mp_is_new" @click.stop='uploadpic'>
								<image :src="userInfo.avatar || defHead"></image>
							</view>
							<button v-else class="avatar-box" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
								<image :src="userInfo.avatar || defHead"></image>
							</button>
						</view>
					</view>
					<view class="nickname edit-box">
						<view class="left">
							<view class="head">昵称</view>
							<view class='input'><input type='nickname' placeholder-class="pl-sty"
								placeholder="请输入昵称" name='nickname' :maxlength="16"
								:value='userInfo.nickname'></input>
							</view>
						</view>
					</view>
				</view>
				<view class="bottom">
					<button class="save" formType="submit" :class="{'open': userInfo.avatar}">
						保存
					</button>
				</view>
			</form>
		</view>
		<canvas canvas-id="canvas" v-if="canvasStatus"
			:style="{width: canvasWidth + 'px', height: canvasHeight + 'px',position: 'absolute',left:'-100000px',top:'-100000px'}"></canvas>
		<view class="mask" @touchmove.prevent v-if="isShow" @click="closeAttr"></view>
	</view>
	</uni-popup>
</template>
<script>
	import { mapGetters } from "vuex";
	import { configMap } from '@/utils';
	import Cache from '@/utils/cache';
	import { editAvatar } from '@/api/user.js';
	export default {
		props: {
			isShow: {
				type: Boolean,
				value: false
			}
		},
		data() {	
			return {
				defHead: require('@/static/images/def_avatar.png'),
				mp_is_new: this.$Cache.get('MP_VERSION_ISNEW') || false,
				userInfo: {
					avatar: '',
					nickname: '',
				},
				canvasStatus: false,
			};
		},
		computed: configMap({routine_logo: '',site_name: ''} ,mapGetters(['viewColor','keyColor'])),
		mounted() {
			
		},
		methods: {	
			/**
			 * 上传文件
			 * 
			 */
			uploadpic: function() {
				let that = this;
				this.canvasStatus = true
				that.$util.uploadImageChange('upload/image', (res) => {
					let userInfo = that.userInfo;
					if (userInfo !== undefined) {
						that.userInfo.avatar = res.data.url;
					}
					this.canvasStatus = false
				}, (res) => {
					this.canvasStatus = false
				}, (res) => {
					this.canvasWidth = res.w
					this.canvasHeight = res.h
				});
			},
			// 微信头像获取
			onChooseAvatar(e) {
				const {avatarUrl} = e.detail
				this.$util.uploadImgs('upload/image', avatarUrl, (res) => {
					this.userInfo.avatar = res.data.path
				}, (err) => {
					console.log(err)
				})
			},
			closeAttr: function() {
				this.$emit('closeEdit');
			},
			/**
			 * 提交修改
			 */
			formSubmit(e) {
				let that = this
				if (!this.userInfo.avatar) return that.$util.Tips({
					title: '请上传头像'
				});
				if (!e.detail.value.nickname) return that.$util.Tips({
					title: '请输入昵称'
				});
				this.userInfo.nickname = e.detail.value.nickname
				editAvatar(this.userInfo).then(res => {
					this.$emit('editSuccess')
					return that.$util.Tips({
						title: res.message,
						icon: 'success'
					}, {
						tab: 3
					});
				}).catch(msg => {
					return that.$util.Tips({
						title: msg || '保存失败'
					}, {
						tab: 3,
						url: 1
					});
				});
			}
		}
	}
</script>
<style>
	.pl-sty {
		color: #999999;
		font-size: 30rpx;
	}
</style>
<style scoped lang="scss">
	.product-window.on {
		transform: translate3d(0, 0, 0);
	}
	.mask {
		z-index: 99;
	}
	.product-window {
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		background-color: #fff;
		z-index: 1000;
		border-radius: 20rpx 20rpx 0 0;
		transform: translate3d(0, 100%, 0);
		transition: all .3s cubic-bezier(.25, .5, .5, .9);
		padding: 38rpx 40rpx;
		display: none;
		.icon-guanbi {
			position: absolute;
			top: 40rpx;
			right: 40rpx;
			font-size: 24rpx;
			font-weight: bold;
			color: #999;
		
		}
		.mp-data {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;
			.mp-name {
				font-size: 28rpx;
				font-weight: bold;
				color: #000000;
			}
			image {
				width: 48rpx;
				height: 48rpx;
				border-radius: 50%;
				margin-right: 16rpx;
			}
		}
		.trip-msg {
			padding-bottom: 32rpx;
			border-bottom: 1px solid #F5F5F5;
			.title {
				font-size: 30rpx;
				font-weight: bold;
				color: #000;
				margin-bottom: 6rpx;
			}
			.trip {
				font-size: 26rpx;
				color: #777777;
			}
		}
		.edit {
			border-bottom: 1px solid #F5F5F5;
			.avatar {
				border-bottom: 1px solid #F5F5F5;
			}
			.nickname {
				.input {
					width: 100%;
				}
				input {
					height: 80rpx;
				}
			}
			.edit-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30rpx;
				padding: 22rpx 0;
				.left {
					display: flex;
					align-items: center;
					flex: 1;
					.head {
						color: rgba(0, 0, 0, 0.9);
						white-space: nowrap;
						margin-right: 60rpx;
					}
					button {
						flex: 1;
						display: flex;
						align-items: center;
					}
				}
				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 6rpx;
				}
			}
			.icon-xiangyou {
				color: #cfcfcf;
			}
		}
		.bottom {
			display: flex;
			align-items: center;
			justify-content: center;
			.save {
				border: 1px solid #F5F5F5;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 368rpx;
				height: 80rpx;
				border-radius: 12rpx;
				margin-top: 52rpx;
				background-color: #F5F5F5;
				color: #ccc;
				font-size: 30rpx;
				font-weight: bold;
			}
			.save.open {
				border: 1px solid #fff;
				background-color: #07C160;
				color: #fff;
			}
		}
	}
</style>
