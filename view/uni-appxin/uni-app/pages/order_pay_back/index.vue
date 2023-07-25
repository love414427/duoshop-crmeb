<template>
	<view class="container" :style="viewColor">
		<!-- #ifdef H5 -->
		<!--公众号-->
		<view class="payCount" v-if="isWeixin">
			<view class="count">
				<view class="main">
					<view>点击右上角
						<text class='iconfont icon-gengduo2'></text>
						<image class="image" :src="`${domain}/static/images/guide.png`"></image>
					</view>
					<view>选择在<text class="text">浏览器</text>中打开，去支付宝支付</view>	
				</view>		
			</view>	
			<view class="pay_count">
				<navigator v-if="type == 0" url="/pages/users/order_list/index?status=1" class="payBtn">完成支付</navigator>
				<navigator v-if="type == 10" url="/pages/users/user_payment/index" class="payBtn bg-none">返回</navigator>
				<navigator v-else-if="type == 11" url="/pages/annex/vip_paid/index" class="payBtn bg-none">返回</navigator>
				<navigator v-else url="/pages/users/order_list/index?status=0" class="payBtn bg-none">返回查看订单</navigator>			
			</view>						
		</view>	
		<!--H5-->
		<view v-else>
			<view class="alipay">
				<image class="alipay_wait" :src="domain+'/static/diy/alipay_wait'+keyColor+'.png'"></image>
				<view class="alipay_text">正在跳转支付... </view>	
			</view>	
			<view class="pay_count">
				<navigator v-if="type == 0" url="/pages/users/order_list/index?status=1" class="payBtn">完成支付</navigator>
				<navigator v-if="type == 10" url="/pages/users/user_payment/index" class="payBtn bg-none">返回</navigator>
				<navigator v-else-if="type == 11" url="/pages/annex/vip_paid/index" class="payBtn bg-none">返回</navigator>
				<navigator v-else url="/pages/users/order_list/index?status=0" class="payBtn bg-none">返回查看订单</navigator>			
			</view>
		</view> 
		<!-- #endif -->
		<!-- #ifdef MP -->
		<!--小程序-->
		<view class="payCount">
			<view class="count">
				<view class="main_text">
					<view>去支付，请长按网址复制后 使用浏览器访问</view>
					<text class='copy' @tap='copy'>{{url}}</text>	
				</view>	
			</view>	
			<view class="pay_count">
				<navigator v-if="type == 10" url="/pages/users/user_payment/index" class="payBtn">完成支付</navigator>
				<navigator v-else-if="type == 11" url="/pages/annex/vip_paid/index" class="payBtn">完成支付</navigator>
				<navigator v-else url="/pages/users/order_list/index?status=1" class="payBtn">完成支付</navigator>
				<navigator v-if="type == 10" url="/pages/users/user_payment/index" class="payBtn bg-none">返回</navigator>
				<navigator v-else-if="type == 11" url="/pages/annex/vip_paid/index" class="payBtn bg-none">返回</navigator>
				<navigator v-else url="/pages/users/order_list/index?status=0" class="payBtn bg-none">返回查看订单</navigator>
			</view>	
		</view>		
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
	import ClipboardJS from "@/plugin/clipboard/clipboard.js";
	import { getCallBackUrlApi } from "@/api/order";
	import { mapGetters } from "vuex";
	import { HTTP_REQUEST_URL } from '@/config/app';
	export default {
		computed: mapGetters(['viewColor','keyColor']),
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				isWeixin: false,
				url: '',
				keyCode: '',
				type: 0
			};
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			

		},
		onReady: function() {
			// #ifdef H5
			this.$nextTick(function() {
				const clipboard = new ClipboardJS(".copy-data");
				clipboard.on("success", () => {
					this.$util.Tips({
						title: '复制成功'
					});
				});
			});
			// #endif
		},
		onLoad: function(options){
			let that = this;
				that.url = options.url;
				that.type = options.type || 0;
			if(options.keyCode && options.url){				
				// #ifdef H5	
				that.keyCode = options.keyCode;
				that.getCallBackUrl(that.keyCode);					
				// 公众号
				if(that.$wechat.isWeixin()){
					that.isWeixin = true;						
				}else{
					setTimeout(function(){
						window.location.href = that.url;
					},2000)	
				}	
				// #endif				
			}					
		},

		methods: {
			/**
			 * 
			 * 剪切订单号
			 */
			// #ifndef H5
			copy: function() {
				let that = this;
				uni.setClipboardData({
					data: that.url,
					success: function(res){
					}				
				});
			},
			// #endif
			getCallBackUrl: function(key){
				let that = this;
				getCallBackUrlApi(key)
					.then(res => {
						that.url = res.message;
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		height: 100vh;
		background: #F5F5F5;
	}
	.payCount{
		padding-bottom: 60rpx;
		.count{
			padding-top: 260rpx;
		}
		.main{
			position: relative;
			padding: 0 100rpx;
			color: #111111;
			font-size: 32rpx;
			line-height: 60rpx;
			.text{
				color: #000000;
				font-size: 36rpx;
				margin: 0 4px;
				font-weight: 700;
			}
			.image{
				width: 200rpx;
				height: 200rpx;
				position: absolute;
				right: 50rpx;
				top: -200rpx;
			}
		}
		.main_text{
			position: relative;
			color: #111111;
			font-size: 32rpx;
			line-height: 60rpx;
			text-align: center;
			width: 600rpx;
			margin: 0 auto;
		}
		.copy{
			display: block;
			margin-top: 100rpx;
			font-weight: bold;
			word-break:break-all;
		}
	}
	.pay_count{
		padding: 0 15px;
		box-sizing: border-box;
		margin-top: 180rpx;
	}
	.payBtn{
		width: 690rpx;
		margin: 0 auto;
		height: 86rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 86rpx;
		font-size: 30rpx;
		color: #fff;
		background-color: var(--view-theme);
		&.bg-none{
			color: var(--view-theme);
			background-color: #fff;
			border: 1px solid var(--view-theme);
			margin-top: 30rpx;
		}
	}
	.alipay{
		text-align: center;
		.alipay_wait{
			width: 502rpx;
			height: 400rpx;
			margin-top: 200rpx;
		}
		.alipay_text{
			color: #111111;
			font-size: 32rpx;
			margin-top: 40rpx;
		}
	}
	
</style>
