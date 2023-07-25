<template>
	<view class="page">
		<view class="OrderCancellation">
			<view class="header":style="{ 'background-image': `url(${domain}/static/images/cancellation-header.png)`}">
			</view>
			<view class="scan_count">
				<view class="scan_bg"></view>
				<view v-if="!iShidden" class="whiteBg">
					<view class="input">
						<input type="number" placeholder-class='placeholder' placeholder="请输入核销码" v-model="verify_code" />
						<text @tap="codeChange">搜索</text>
					</view>
					<!-- #ifdef MP || MP-WEIXIN || APP-PLUS -->
					<view class="bnt" @tap="scanCode"><text class="iconfont icon-saoma"></text>扫码核销</view>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<view v-if="isWeixin" class="bnt" @tap="scanCode">
						<text class="iconfont icon-saoma"></text>
						扫码核销
					</view>
					<!-- #endif -->
				</view>	
			</view>	
		</view>
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
	import {orderVerific,verifierOrder} from "@/api/admin";
	import { HTTP_REQUEST_URL } from '@/config/app';
	export default {
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				iShidden: false,
				verify_code: '',
				orderInfo:{},
				isWeixin: false,
				mer_id: '',
				downStatus: false,
				type: 'customer',
				service: null
			}
		},
		
		onLoad: function(options) {
			// #ifdef MP
			if (options.scene) {
				let value = this.$util.getUrlParams(decodeURIComponent(options.scene) || {});
				if (value.verify_code) options.verify_code = value.verify_code;				
				if (value.mer_id) options.mer_id = value.mer_id;				
			}
			// #endif
			this.verify_code = options.verify_code;
			this.mer_id = options.mer_id;
			
			if(this.verify_code){
				this.codeChange();
			}	
			// #ifdef H5
			if(this.$wechat.isWeixin()){
				this.isWeixin = true;						
			}
			// #endif
		},
		methods: {
			/**
			 * 去订单详情
			 */
			goOrderDetails: function(id) {
				uni.navigateTo({
					url: '/pages/admin/orderDetail/index?id='+id+'&mer_id='+this.mer_id
				});
			},
			changeTips(data) {
				this.downStatus = !this.downStatus;
				this.$refs.shopList.isShowStore();
			},
			changeClose() {
				this.downStatus = false;
			},
			// 立即核销
			codeChange: function() {
				let self = this
				let ref = /[0-9]/;
				if (!this.verify_code) return self.$util.Tips({
					title: '请输入核销码'
				});
				if (!ref.test(this.verify_code)) return self.$util.Tips({
					title: '请输入正确的核销码'
				});
				
				uni.navigateTo({
					url: '/pages/admin/cancellate_result/index?code='+this.verify_code+'&mer_id='+this.mer_id
				});
				// self.$util.Tips({
				// 	title: '查询中'
				// });
				// setTimeout(() => {
				// 	verifierOrder(this.mer_id,this.verify_code)
				// 		.then(res => {
				// 			self.orderInfo = res.data
				// 			self.iShidden = true
				// 		})
				// 		.catch(res => {
				// 			self.verify_code = ''
				// 			return self.$util.Tips({
				// 				title: res
				// 			});
				// 		});
				// }, 800);
			},
			// 扫码核销			
			scanCode() {
				var self = this;
				// #ifdef MP || APP-PLUS
				wx.scanCode({
					scanType: ["qrCode", "barCode"],
					success(res) {
						self.verify_code = res.result
						uni.navigateTo({
							url: '/pages/admin/cancellate_result/index?code='+self.verify_code+'&mer_id='+self.mer_id
						});
						// self.codeChange();
					},
					fail(res) {
						console.log(res);
					},
				})
				// #endif
				//#ifdef H5
				if(this.$wechat.isWeixin()){
					this.$wechat.wechatEvevt('scanQRCode',{
						needResult: 1,
						scanType: ["qrCode", "barCode"]
					}).then(res=>{
						this.verify_code = res.resultStr
						uni.navigateTo({
							url: '/pages/admin/cancellate_result/index?code='+self.verify_code+'&mer_id='+self.mer_id
						});
						// this.codeChange();
					}).catch(res => {
						this.$util.Tips({
							title: res
						});
					});;
				}
				//#endif
			},					
		}
	}
</script>

<style lang="scss">
	.page{
		// height: 100vh;
	}
	.OrderCancellation .header {
		padding-top: 30rpx;
		width: 100%;
		height: 520rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: relative;
	}
	.OrderCancellation {
		width: 100%;		
		
	}
	.OrderCancellation .title_bg {
		height: 90rpx;
		background: #E93323;
		width: 100%;
	}
	.OrderCancellation .scan_count{
		position: relative;
		top: -140rpx;
		width: 690rpx;
		margin: 0 auto;
	}
	.OrderCancellation .scan_bg{
		width: 100%;
		height: 70rpx;
		border-radius: 16rpx;
		background-image: url('data:image/png;base64,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');
		background-size: 100%;
		background-repeat: no-repeat;

	}
	.OrderCancellation .whiteBg {
		width: 640rpx;
		background-color: #fff;
		margin: -47rpx auto 0;
		padding-top: 60rpx;
		border-radius: 4rpx 4rpx 16rpx 16rpx;
		padding-bottom: 77rpx;
		box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
	}
	.OrderCancellation .whiteBg .placeholder{
		color: #282828;
		font-size: 40rpx;
	}
	.OrderCancellation .whiteBg .input {
		width: 580rpx;
		background: #F4F4F4;
		margin: 0 auto;
		border-bottom: 1px solid #eee;
		padding: 0 100rpx 0 20rpx;
		border-radius: 10rpx;
		
		position: relative;
	}
	.OrderCancellation .whiteBg .input text{
		position: absolute;
		right: 20rpx;
		top: 30rpx;
		color: #666666;
		font-size: 32rpx;
	}
	.OrderCancellation .whiteBg .input input {
		font-size: 60rpx;
		color: #282828;
		line-height: 100rpx;
		height: 100rpx;		
	}
	.OrderCancellation .whiteBg .bnt {
		font-size: 32rpx;
		color: #fff;
		width: 80%;
		height: 86rpx;
		border-radius: 43rpx;
		background: #2291F8;
		text-align: center;
		line-height: 86rpx;
		margin: 60rpx auto 0 auto;
	}
	.OrderCancellation .whiteBg .bnt .icon-saoma{
		color: #ffffff;
		font-size: 30rpx;
		margin-right: 15rpx;
	}
	.OrderCancellation .scan {
		width: 300rpx;
		height: 300rpx;
		margin: 160rpx auto 0 auto;
	}
	.OrderCancellation .scan image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.WriteOff {
		width: 640rpx;
		background-color: #fff;
		margin: -47rpx auto 0;
		padding: 24rpx 30rpx;
		border-radius: 4rpx 4rpx 16rpx 16rpx;
		padding-bottom: 77rpx;
		box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
		}

	.WriteOff .num {
		font-size: 28rpx;
		color: #282828;
		border-bottom: 1px solid #EEEEEE;
		padding-bottom: 22rpx;
	}
	.WriteOff .num .see {
		font-size: 16rpx;
		color: #fff;
		border-radius: 4rpx;
		background-color: #c68937;
		padding-left: 5rpx;
		margin-left: 12rpx;
	}
	.WriteOff .num .see .iconfont {
		font-size: 15rpx;
	}
	
	.WriteOff .sure {
		font-size: 32rpx;
		color: #fff;
		text-align: center;
		line-height: 86rpx;
		height: 86rpx;
		width: 580rpx;
		border-radius: 41rpx;
		margin: 40rpx auto 0 auto;
		background-image: linear-gradient(to right, #f67a38 0%, #f11b09 100%);
		background-image: -webkit-linear-gradient(to right, #f67a38 0%, #f11b09 100%);
		background-image: -moz-linear-gradient(to right, #f67a38 0%, #f11b09 100%);
	}
	.WriteOff .sure.cancel {
		background-image: none;
		color: #666666;
		margin-top: 30rpx;
		border: 1px solid #BBBBBB;
	}
	.WriteOff .order_count scroll-view{
		max-height: 450rpx;
	}
	.WriteOff .order_count .order_list{
		margin-top: 30rpx;
		justify-content: space-between;
		align-items: center;
	}
	.WriteOff .order_list .pictrue{
		width: 120rpx;
		height: 120rpx;
		border-radius: 10rpx;
		image{
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
		}
	}
	.WriteOff .order_list .name{
		color: #282828;
		font-size: 28rpx;
	}
	.WriteOff .order_list .pro_name{
		width: 320rpx;
	}
	.WriteOff .order_list .price{
		color: #999999;
		font-size: 28rpx;
		text-align: right;
		line-height: 40rpx;
	}
	.WriteOff .order_list .btn-item{
		display: block;
		font-size: 24rpx;
		color: #E93323;
		margin-top: 16rpx;
		
	}
	.WriteOff .order_price{
		margin-top: 20rpx;
		text-align: right;
		font-size: 26rpx;
		text{
			color: #E93323;
			font-weight: bold;
		}
	}
	.views {
		font-size: 24rpx;
		color: #666666;
	}
	.views-jian {
		font-size: 10px;
	}
	.spin {
		display: block;
		transform: rotate(180deg);
		font-size: 36rpx;
	}
	.popupn{
		width: 100%;
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		color: #fff;
		.title{
			background: rgba(0,0,0,.15);
			max-width: 360rpx;
			margin: 0 auto;
			position: relative;
			border-radius: 30rpx;
		}
		.iconfont{
			display: inline-block;
			position: relative;
			top: 4rpx;
			right: 0;
		}
		.mer_logo{
			width: 34rpx;
			height: 34rpx;
			position: relative;
			top: 6rpx;
			right: 10px;			
		}
		.mer_name{
			display: inline-block;
			max-width: 650rpx;
		}
		.invoice-content{
			background-color: #ffffff;
		}
	}
</style>
