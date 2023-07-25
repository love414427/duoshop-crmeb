<template>
	<view :style="viewColor">
		<!-- 选择送货方式 -->
		<view class="mask-box">
			<view class="bg" v-if="isShowDiscount"></view>
			<view class="mask-content animated" :class="{slideInUp:isShowDiscount}">
				<view class="title-bar">
					优惠明细
					<view class="close" @click="closeShowBox"><text class="iconfont icon-guanbi"></text></view>
				</view>
				<view class="box">
					<view class="check-item">
						<view>商品售价：</view>
						<view class="radio"> 
							￥{{couponData.total_price}}
						</view>
					</view>
					<view v-if="couponData.order_total_integral_price>0" class="check-item">
						<view>积分抵扣：</view>
						<view class="radio"> 
							-￥{{couponData.order_total_integral_price}}
						</view>
					</view>
					<view v-if="couponData.total_platform_coupon_price>0" class="check-item">
						<view>平台优惠金额：</view>
						<view class="radio"> 
							-￥{{ couponData.total_platform_coupon_price }}
						</view>
					</view>
					<view v-if="couponData.order_coupon_price>0" class="check-item">
						<view>店铺优惠金额：</view>
						<view class="radio"> 
							-￥{{ couponData.order_coupon_price }}
						</view>
					</view>
					<view v-if="couponData.order_svip_discount>0" class="check-item">
						<view>SVIP优惠金额：</view>
						<view class="radio"> 
							-￥{{ couponData.order_svip_discount }}
						</view>
					</view>
					<view v-if="couponData.total_coupon>0" class="check-item total">
						<view>共优惠：</view>
						<view class="radio"> 
							-￥{{ couponData.total_coupon}}
						</view>
					</view>
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
	import { mapGetters } from "vuex";
	export default{
		name:'Discount',
		props:{
			isShowDiscount:{
				type:Boolean,
				default:false
			},
			couponData:{
				type:Object,
				default:function(){
					return {}
				}
			}
		},
		computed: mapGetters(['viewColor']),
		data(){
			return {}
		},
		created() {},
		methods:{
			// 关闭配送方式弹窗
			closeShowBox(){
				this.$emit('close')
			},
		}
	}
</script>

<style lang="scss">
	.mask-box{
		.bg{
			z-index: 9;
			position: fixed;
			left: 0;
			bottom: 100rpx;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.5);
		}
		.mask-content{
			z-index: 10;
			position: fixed;
			left: 0;
			bottom: 100rpx;
			width: 100%;
			background-color: #f5f5f5;
			border-radius: 16rpx 16rpx 0 0;
			transform: translate3d(0, 200%, 0);	
			transition: all .3s cubic-bezier(.25, .5, .5, .9);
			.title-bar{
				position: relative;
				text-align: center;
				padding: 30rpx 0;
				margin-bottom: 20rpx;
				font-size: 32rpx;
				color: #282828;
				.close{
					position: absolute;
					right: 30rpx;
					top: 50%;
					transform: translateY(-50%);
					.iconfont{
						color: #8A8A8A;
					}
				}
			}
			.box{
				padding: 0 30rpx 60rpx;
				.check-item{
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 40rpx;
					margin-bottom: 50rpx;
					font-size: 28rpx;
					&.total{
						font-weight: bold;
						font-size: 32rpx;
						.radio{
							color: var(--view-priceColor);
						}
					}
				}
			}
		}	
	}
	.animated {
		animation-duration: .3s
	}
</style>
