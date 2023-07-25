<template>
	<view :style="viewColor">
		<form report-submit='true'>
			<view v-if="userInfo">
				<view class="user-info">
					<image class="image" :src="userInfo.user.avatar || '/static/images/f.png'"></image>
					<text>{{userInfo.user.nickname}}</text>
				</view>
				<view class="customerInfo">
					<view class="list">
						<view class="item">
							<view class="text">备注昵称</view>
							<view class="input">
								<input type='text' v-model="userInfo.mark" placeholder="请输入"></input>
							</view>	
						</view>
						<view class="item" v-if="userInfo.user.phone">
							<view class="text">手机号</view>
							<view class="input">
								{{userInfo.user.phone}}
							</view>
						</view>
						<view class="item">
							<view class="text">推广员</view>
							<view class="input">
								{{userInfo.user.is_promoter ? '是' : '否'}}
							</view>
						</view>
					</view>
				</view>
				<button form-type="submit" @click="saveMark" class="confirmBnt">确认</button>
			</view>
		</form>
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
	import { serviceUser, serviceSaveMark } from '@/api/user.js';
	import {
		mapGetters
	} from "vuex";
	export default {
		data() {
			return {
				userInfo: null,
				merId: '',
				uid: '',
				loading: false,
			};
		},
		computed: mapGetters(['isLogin', 'viewColor']),
		onLoad(options) {
			this.mer_id = options.mer_id;
			this.uid = options.uid;
			this.serviceUser()
		},
		methods: {
			saveMark() {
				if(this.loading) return ;
				this.loading = true;
				serviceSaveMark(this.mer_id, this.uid, this.userInfo.mark).then(res=>{
					uni.showToast({
						icon: 'success',
						title: '保存成功'
					})
					setTimeout(v=>{
						uni.navigateBack()
					}, 1000)
				}).catch(err=>{
					uni.showToast({
						title: err,
						icon: 'none'
					})
				}).finally(e=>{
					setTimeout(e=>{
						this.loading = false
					}, 2000)
				})
			},
			serviceUser() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				serviceUser(this.mer_id, this.uid).then(res => {
					this.userInfo = res.data
				}).catch(err=>{
					uni.showToast({
						title: err,
						icon: 'none'
					})
					setTimeout(v=>{
						uni.navigateBack()
					}, 1000)
				}).finally(e=>{
					uni.hideLoading()
				})
				
			},
		}
	}
</script>

<style lang="scss">
	.customerInfo{
		background: #ffffff;
		margin-top: 20rpx;
	}
	.customerInfo .phone {
		font-size: 32rpx;
	}

	.customerInfo .list {
		width: 650rpx;
		margin: 0 auto;
	}

	.customerInfo .list .item {
		width: 100%;
		height: 110rpx;
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #f0f0f0;
	}
	.customerInfo .list .item .title {
		color: #333333;
		font-size: 30rpx;

	}
	.customerInfo .list .item .text{
		width: 160rpx;
	}
	.customerInfo .list .item .input {
		width: 100%;
		margin-left: 60rpx;
		color: #666666;
		font-size: 30rpx;
	}
	.customerInfo .list .item input {
		width: 100%;
		height: 100%;
		font-size: 30rpx;
		color: #666666;
	}

	.confirmBnt {
		font-size: 32rpx;
		width: 650rpx;
		height: 90rpx;
		border-radius: 45rpx;
		color: #fff;
		margin: 70rpx auto 0 auto;
		text-align: center;
		line-height: 90rpx;
		background-color: var(--view-theme);
	}
	.user-info{
		padding: 50rpx 30rpx 30rpx;
		display: flex;
		align-items: center;
		background-color: #fff;
		.image{
			width: 111rpx;
			height: 111rpx;
			border-radius: 100%;
		}
		text{
			margin-left: 24rpx;
			color: #333333;
			font-size: 32rpx;
			font-weight: bold;
		}
	}
	
</style>
