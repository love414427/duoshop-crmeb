<template>
	<view :style="viewColor">
		<form>
			<view class='personal-data'>
				<view class="wrapper" v-if="switchUserInfo.length>0">
					<view class="title">管理我的账号</view>
					<view class="wrapList" >
						<view class="item acea-row row-between-wrapper" :class="item.uid === userInfo.uid ? 'on' : ''"
						 :style="{ 'background-image': `url(${item.uid == userInfo.uid ? domain+'/static/diy/currentAcc'+keyColor+'.png' : '' })` }"
						v-for="(item,index) in switchUserInfo"
						 :key="index">
							<view class="picTxt acea-row row-between-wrapper">
								<block v-if='item.uid === userInfo.uid'>
									<view class="pictrue" v-if="!mp_is_new" @click="uploadpic">
										<image :src="item.avatar || '/static/images/f.png'"></image>
										<view v-if="open_update_info != 0" class="radius" ><span class="iconfont iconfonta icon-jilu-xuanzhong"></span></view>
									</view>
									<button v-if="mp_is_new && open_update_info != 0" class="avatar-box pictrue" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
										<image :src="item.avatar || '/static/images/f.png'"></image>
										<view class="radius" ><span class="iconfont iconfonta icon-jilu-xuanzhong"></span></view>
									</button>
									<button v-else-if="mp_is_new && open_update_info == 0" class="avatar-box">
										<image :src="item.avatar || '/static/images/f.png'"></image>
									</button>
								</block>
								<view class="pictrue" v-else>
									<image :src="item.avatar || '/static/images/f.png'"></image>
									<view class="radius" v-if="open_update_info != 0"><span class="iconfont iconfonta icon-jilu-xuanzhong"></span></view>
								</view>
								<view class="text">
									<view class="name line1">{{ item.nickname }}</view>
								</view>
							</view>	
							<view class="currentBnt acea-row row-center-wrapper t-color" v-if='item.uid === userInfo.uid'>
								当前账号
							</view>
							<view class="bnt t-color acea-row row-center-wrapper"  @click='switchAccounts(item,index)' v-else>
								使用账号
							</view>
						</view>
					</view>
				</view>
				<view class="list" v-else>
					<view class='item acea-row row-between-wrapper' >
						<view>头像</view>
						<view class="pictrue" v-if="!mp_is_new"  @click="uploadpic">
							<image class="avatar" :src="userInfo.avatar || '/static/images/f.png'"></image>
						</view>
						<button v-else class="avatar-box" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
							<image :src="userInfo.avatar || '/static/images/f.png'"></image>
						</button>
					</view>
				</view>
				<view class='list' style="margin-top: 1rpx;">
					<view class='item acea-row row-between-wrapper'>
						<view>昵称</view>
						<view class='input acea-row row-between-wrapper' @click="changeInput">
							<input type='text' name='nickname' :value='userInfo.nickname'>
							<text v-if="open_update_info != 0" class='iconfont icon-you'></text>
							<text v-else class='iconfont icon-suozi'></text>
						</view>
					</view>
					<view class='item acea-row row-between-wrapper'>
						<view>ID号</view>
						<view class='input acea-row row-between-wrapper'>
							<input type='text' :value='userInfo.uid' disabled='true' class='id'></input>
							<text class='iconfont icon-suozi'></text>
						</view>
					</view>
					<view class='item acea-row row-between-wrapper'>
						<view>手机号码</view>
						<navigator url="/pages/users/user_phone/index" hover-class="none" class="input" v-if="!userInfo.phone">
							点击绑定手机号<text class="iconfont icon-xiangyou"></text>
						</navigator>
						<navigator url="/pages/users/user_modify_phone/index" hover-class="none" class='input acea-row row-between-wrapper' v-else>
							<input type='text' disabled='true' name='phone' :value='userInfo.phone' class='id'></input>
							<text class='iconfont icon-you'></text>
						</navigator>
					</view>
					<view class='item acea-row row-between-wrapper'>
						<view>登录密码</view>
						<view class='input acea-row row-between-wrapper' @click="changePwd">
							<input type='text' placeholder="修改登录密码" disabled='true' class='id'></input>
							<text class='iconfont icon-you'></text>
						</view>
					</view>
					<view class='item acea-row row-between-wrapper'>
						<view>地址管理</view>
						<navigator url="/pages/users/user_address_list/index" hover-class="none" class='input acea-row row-between-wrapper'>
							<input type='text' placeholder="立即前往" disabled='true' class='id'></input>
							<text class='iconfont icon-you'></text>
						</navigator>
					</view>
					<view class='item acea-row row-between-wrapper'>
						<view>发票管理</view>
						<navigator url="/pages/users/user_invoice_list/index" hover-class="none" class='input acea-row row-between-wrapper'>
							<input type='text' placeholder="立即前往" disabled='true' class='id'></input>
							<text class='iconfont icon-you'></text>
						</navigator>
					</view>
					<view class='item acea-row row-between-wrapper'>
						<view>注销账号</view>
						<view class='input acea-row row-between-wrapper' @click="changeCancel">
							<input type='text' placeholder="账号注销后不能恢复" disabled='true' class='id'></input>
							<text class='iconfont icon-you'></text>
						</view>
					</view>
					<!--#ifdef APP-PLUS-->
					<view class='item acea-row row-between-wrapper'>
						<view>当前版本</view>
						<view class='input acea-row row-between-wrapper'>
							<input type='text' :value='version' disabled='true' class='id'></input>
						</view>
					</view>
					<!--#endif-->
				</view>
				<!-- #ifdef H5 -->
				<view class="logOut acea-row row-center-wrapper" @click="outLogin" v-if="!this.$wechat.isWeixin()">退出登录</view>
				<!-- #endif -->
				<!-- #ifdef MP || APP-PLUS -->
				<view class="logOut acea-row row-center-wrapper" @click="outLogin">退出登录</view>
				<!-- #endif -->	
				<view class="foot-bar"></view>
			</view>
		</form>
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
	import {
		getUserInfo,
		userEdit,
		getLogout,
		userAcc,
		editAvatar,
		updateInfo
	} from '@/api/user.js';
	import { switchH5Login, getAppVersion } from '@/api/api.js';
	import { mapGetters } from "vuex";
	import { configMap } from '@/utils';
	import dayjs from "@/plugin/dayjs/dayjs.min.js";
	import authorize from '@/components/Authorize';
	import Cache from '@/utils/cache';
	import { HTTP_REQUEST_URL } from '@/config/app';
	export default {
		components: {
			authorize
		},
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				userInfo: {},
				loginType: 'h5',
				userIndex: 0,
				switchUserInfo: [],
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				headBg: '../static/images/currentAcc',
				mp_is_new: this.$Cache.get('MP_VERSION_ISNEW') || false,
				version: ''
			};
		},
		computed: configMap({open_update_info: 0} ,mapGetters(['isLogin','viewColor','keyColor'])),
		onLoad() {
			if (this.isLogin) {
				this.getUserInfo();
			} else {
				this.isAuto = true;
        this.isShowAuth = true
			}
			//#ifdef APP-PLUS
			this.appVersionConfig()
			//#endif
		},
		methods: {	
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			/**
			 * 上传图片文件
			 *
			 */
			uploadpic: function() {
				let that = this;
				if(that.open_update_info == 0){
					return;
				}
				that.$util.uploadImageOne('upload/image', function(res) {
					let userInfo = that.switchUserInfo[that.userIndex];
					if (userInfo !== undefined) {
						userInfo.avatar = res.data.path;
					}
					that.switchUserInfo[that.userIndex] = userInfo;
					editAvatar({avatar:res.data.path}).then((res)=>{
						that.$util.Tips({
							title:res.message,
						})
					})	
				});		
			}, 		
			// 修改昵称
			changeInput(){
				if(this.open_update_info == 0){
					return;
				}
				uni.navigateTo({
					url: '/pages/users/user_nickname/index',
				})
			},	
			// 微信头像获取
			onChooseAvatar(e) {
				const {avatarUrl} = e.detail
				this.$util.uploadImgs('upload/image', avatarUrl, (res) => {
					this.userInfo.avatar = res.data.path
					editAvatar({avatar:res.data.path}).then((res)=>{
						that.$util.Tips({
							title:res.message,
						})
					})
				}, (err) => {
					console.log(err)
				})
			},
			// #ifdef APP-PLUS
			appVersionConfig() {
				var that = this;
				plus.runtime.getProperty(plus.runtime.appid, (info) => {
					this.version = info.version;
					console.log('当前版本：'+ info.version)
				});			
			},
			//#endif
			/**
			 * 授权回调 
			 */
			onLoadFun: function() {
				this.isShowAuth = false;
				this.getUserInfo();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			switchAccounts: function(item, index) {
				let userInfo = this.switchUserInfo[index],
					that = this;
				that.userIndex = index;
				if (that.switchUserInfo.length <= 1) return true;
				if (userInfo === undefined) return that.$util.Tips({
					title: '切换的账号不存在'
				});
				uni.showLoading({
					title: '正在切换中'
				});
				switchH5Login({
					uid: item.uid
				}).then(({
					data
				}) => {
					uni.hideLoading();
					let newTime = Math.round(new Date() / 1000);
					that.$store.commit("LOGIN", {
						'token': data.token,
						'time': data.exp,
					});
					that.$store.commit("SETUID", data.user.uid);
					that.$store.commit('UPDATE_USERINFO', data.user);
					that.getUserInfo();
				}).catch(err => {
					uni.hideLoading();
					return that.$util.Tips({
						title: err
					});
				})
			},
			/**
			 * 退出登录
			 *
			 */
			outLogin: function() {
				let that = this;				
				if (that.loginType == 'h5') {
					uni.showModal({
						title: '提示',
						content: '确认退出登录?',
						success: function(res) {
							if (res.confirm) {
								getLogout()
									.then(res => {
										that.$store.commit("LOGOUT");
										uni.reLaunch({
											url: '/pages/index/index',
										});
									})
									.catch(err => {
										console.log(err);
									});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			// 获取用户列表
			userAcc() {
				userAcc().then(res => {
					let that = this
					let switchUserInfo = res.data || [];
					for (let i = 0; i < switchUserInfo.length; i++) {
						if (switchUserInfo[i].uid == that.userInfo.uid) that.userIndex = i;
						// 切割h5用户；user_type状态：h5、routine（小程序）、wechat（公众号）；注：只有h5未注册手机号时，h5才可和小程序或是公众号数据想通；
						//#ifdef H5
						if (
							!that.$wechat.isWeixin() &&
							switchUserInfo[i].user_type != "h5" &&
							switchUserInfo[i].phone === ""
						)
						switchUserInfo.splice(i, 1);
						//#endif
					}
					that.$set(that, "switchUserInfo", switchUserInfo);
				})
			},
			/**修改密码*/
			changePwd(){
				let that = this;
				if(that.userInfo.phone){
					uni.navigateTo({
						url: `/pages/users/user_modify_pwd/index`
					})
				}else{
					that.$util.Tips({
						title: '请先绑定手机号'
					});
				}
			},
			//注销账号
			changeCancel(){
				uni.navigateTo({
					url: '/pages/users/user_about/index?from='+'the_cancellation_msg'
				})
			},
			/**
			 * 获取用户详情
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.$set(that, 'userInfo', res.data);
					if(res.data.phone){
						that.userAcc();
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	html{
		-webkit-text-size-adjust:none;
	}
	.radius{
		background-color: white;
		width: 35rpx;
		height: 35rpx;
		border-radius: 50%;
		border: 1px solid rgb(187, 43, 5);
		line-height: 25rpx;
		text-align: center;
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.iconfonta{
		border-radius: 50%;
		font-size: 20rpx;
		color: red;
	}
	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}
	.btnb{
		border-radius: 0;
		height: 100rpx;
		line-height: 100rpx;
	}
	.btna{
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 10rpx 10rpx 0 0;
	}
	.btnc{
		height: 130rpx;
		line-height: 130rpx;
		border-radius: 0;
	}
	.personal-data {
		padding-bottom: calc(0rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		padding-bottom: calc(0rpx + env(safe-area-inset-bottom)); ///兼容 IOS<11.2/
	}
	.personal-data .wrapper {
		margin: 10rpx 0;
		background-color: #fff;
		padding: 36rpx 30rpx 13rpx 30rpx;
	}
	.personal-data .wrapper .title {
		margin-bottom: 30rpx;
		font-size: 32rpx;
		color: #282828;
	}
	.personal-data .wrapper .wrapList .item {
		width: 690rpx;
		height: 160rpx;
		background-color: #f8f8f8;
		border-radius: 20rpx;
		margin-bottom: 22rpx;
		padding: 0 30rpx;
		position: relative;
		border: 2rpx solid #f8f8f8;
		box-sizing: border-box;
	}
	.t-color {
		color: var(--view-theme);
	}
	.personal-data .wrapper .wrapList .item.on {
		border-color: var(--view-theme);
		border-radius: 20rpx;
		//background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArIAAACgCAYAAADw+I85AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0QzNkY3NzlCNzJCMTFFOTgyNEU4QzhGQTRFRUY2REQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0QzNkY3N0FCNzJCMTFFOTgyNEU4QzhGQTRFRUY2REQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozRDM2Rjc3N0I3MkIxMUU5ODI0RThDOEZBNEVFRjZERCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozRDM2Rjc3OEI3MkIxMUU5ODI0RThDOEZBNEVFRjZERCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pn3rJMAAAArUSURBVHja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");
		background-size: 100% 100%;
		background-color: var(--view-minorColor);
		background-repeat: no-repeat;
	}
	.personal-data .wrapper .wrapList .item .picTxt {
		width: 445rpx;
	}
	.personal-data .wrapper .wrapList .item .picTxt .pictrue {
		width: 96rpx;
		height: 96rpx;
		position: relative;
	}
	.personal-data .wrapper .wrapList .item .picTxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.personal-data .wrapper .wrapList .item .picTxt .text {
		width: 325rpx;
	}
	.personal-data .wrapper .wrapList .item .picTxt .text .name {
		width: 100%;
		font-size: 30rpx;
		color: #282828;
	}
	.personal-data .wrapper .wrapList .item .picTxt .text .phone {
		font-size: 24rpx;
		color: #999;
		margin-top: 10rpx;
	}
	.personal-data .wrapper .wrapList .item .bnt {
		font-size: 24rpx;
		background-color: #fff;
		border-radius: 27rpx;
		width: 140rpx;
		height: 54rpx;
		border: 2rpx solid var(--view-theme);
	}
	.personal-data .wrapper .wrapList .item .currentBnt {
		position: absolute;
		right: 0;
		top: 0;
		font-size: 26rpx;
		background-color: var(--view-minorColor);
		width: 140rpx;
		height: 48rpx;
		border-radius: 0 20rpx 0 20rpx;
	}
	.personal-data .list {
		margin-top: 15rpx;
		background-color: #fff;
	}
	.personal-data .list .item {
		padding: 30rpx 30rpx 30rpx 0;
		border-bottom: 1px solid #f2f2f2;
		margin-left: 30rpx;
		font-size: 32rpx;
		color: #282828;
	}
	.personal-data .list .item .phone {
		width: 160rpx;
		height: 56rpx;
		font-size: 24rpx;
		color: #fff;
		line-height: 56rpx;
		border-radius: 32rpx
	}
	.personal-data .list .item .pictrue {
		width: 88rpx;
		height: 88rpx;
	}
	.personal-data .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.personal-data .list .item .input {
		min-width: 415rpx;
		text-align: right;
		color: #868686;
	}
	.personal-data .list .item .input .id {
		width: 365rpx;
	}
	.personal-data .list .item .input .iconfont {
		font-size: 35rpx;
	}
	.personal-data .modifyBnt {
		font-size: 32rpx;
		color: #fff;
		width: 690rpx;
		height: 90rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 90rpx;
		margin: 76rpx auto 0 auto;
		background: var(--view-theme);
	}
	.personal-data .logOut {
		font-size: 32rpx;
		text-align: center;
		width: 690rpx;
		height: 90rpx;
		border-radius: 45rpx;
		margin: 30rpx auto 0 auto;
		color: var(--view-theme);
		border: 1px solid var(--view-theme);
	}
	.avatar-box {
		width: 96rpx;
		height: 96rpx;
		background: transparent;
		image {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
</style>
