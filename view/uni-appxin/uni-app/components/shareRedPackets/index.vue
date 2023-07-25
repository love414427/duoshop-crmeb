<template>
	<view class='sharing-packets' :class='isAnimate==true?"":"right"'>
		<view class='sharing-con' @click='goShare'>
			<image src='/static/images/red-packets.png'></image>
			<view class='text font-color'>
				<!-- <view class="title">分享赚佣金</view> -->
				<!-- <view class='money'><text class='label'>￥</text>{{sharePacket.priceName}}</view> -->
				<view class='money'><text class='label'>￥</text>{{parseFloat(sharePacket.max)}}</view>
				<!-- <view class='tip'>下单即返佣金</view>
				<view class='shareBut'>立即分享</view> -->
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
	export default {

		props: { 
			sharePacket: {
				type: Object,
				default: function() {
					return {
						isState: true,
						priceName: ''
					}
				}
			},
			showAnimate:{
				type: Boolean,
			},
			
		},
		watch:{
			showAnimate(nVal,oVal){
				setTimeout(res=>{
					this.isAnimate = nVal
				},1000)
			}
		},
		data() {
			return {
				scrollNum:0,
				isAnimate:true
			};
		},

		methods: {
			closeShare: function() {
				this.$emit('closeChange');
			},
			goShare: function() {
				if(this.isAnimate){
					this.$emit('listenerActionSheet');
				}else{
					this.isAnimate = true
					this.$emit('boxStatus',true);
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.sharing-packets {
		position: fixed;
		right: 30rpx;
		bottom: 200rpx;
		z-index: 5;
		transition: all 0.3s ease-in-out 0s;
		opacity: 1;
		transform: scale(1);
		&.right{
			right: -140rpx;
		}
	}

	.sharing-packets.on {
		transform: scale(0);
		opacity: 0;
	}

	.sharing-packets .iconfont {
		width: 44rpx;
		height: 44rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 44rpx;
		background-color: #999;
		font-size: 20rpx;
		color: #fff;
		margin: 0 auto;
		box-sizing: border-box;
		padding-left: 1px;
	}

	.sharing-packets .line {
		width: 2rpx;
		height: 40rpx;
		background-color: #999;
		margin: 0 auto;
	}

	.sharing-packets .sharing-con {
		width: 197rpx;
		height: 195rpx;
		position: relative;
	}

	.sharing-packets .sharing-con image {
		width: 100%;
		height: 100%;
	}

	.sharing-packets .sharing-con .text {
		position: absolute;
		top: 20rpx;
		font-size: 20rpx;
		width: 100%;
		text-align: center;
	}

	.sharing-packets .sharing-con .text .money {
		font-size: 32rpx;
		font-weight: bold;
		margin-top: 24rpx;
	}

	.sharing-packets .sharing-con .text .money .label {
		font-size: 16rpx;
	}

	.sharing-packets .sharing-con .text .tip {
		font-size: 18rpx;
		color: #AA6E56;
		margin-top: 5rpx;
	}

	.sharing-packets .sharing-con .text .shareBut {
		width: 60%;
		font-size: 20rpx;
		color: #F13926;
		margin-top: 18rpx;
		height: 30rpx;
		line-height: 30rpx;
		background: #FFE8BB;
		border-radius: 30rpx;
		margin: 26rpx auto 0;
	}
</style>
