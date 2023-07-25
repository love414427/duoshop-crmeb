<template>
	<view class='goodList' :style="viewColor">
		<block v-for="(item,index) in bastList" :key="index">
			<view @click="goDetail(item)" class='item acea-row' hover-class="none">
				<view class='pictrue'>
					<image :src='item.image'></image>
					<text class="pictrue_log pictrue_log_class" v-if="item.activity && item.activity.type === '1'">秒杀</text>
					<text class="pictrue_log pictrue_log_class" v-if="item.activity && item.activity.type === '2'">砍价</text>
					<text class="pictrue_log pictrue_log_class" v-if="item.activity && item.activity.type === '3'">拼团</text>
				</view>
				<view class='underline'>				
						<view class='line1'>						
						{{item.store_name}}
						</view>
						<view class="item_line">
							<text v-if="item.merchant.type_name && item.product_type == 0" class="font-bg-red bt-color">{{item.merchant.type_name}}</text>
							<text v-else-if="item.merchant.is_trader && item.product_type == 0" class="font-bg-red bt-color">自营</text>
							<text v-if="item.product_type != 0" :class="'font_bg-red bt-color type'+item.product_type">{{item.product_type == 1 ? "秒杀" : item.product_type == 2 ? "预售" : item.product_type == 3 ? "助力" : item.product_type == 4 ? "拼团" : ""}}</text>
							<text v-if="item.issetCoupon" class="coupon">领券购买更优惠</text>
						</view>
						<view class='money'>￥<text class='num'>{{item.price}}</text></view>				
				</view>
				<view class='gobuy acea-row row-center-wrapper'>去购买</view>
			</view>
		</block>
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
	import {mapGetters} from "vuex";
	import { goShopDetail } from '@/libs/order.js'
	import {initiateAssistApi} from '@/api/activity.js';
	import { toLogin } from '@/libs/login.js';
	export default {
		computed: mapGetters(['uid','viewColor']),
		props: {
			status: {
				type: Number,
				default: 0,
			},
			bastList: {
				type: Array,
				default: function() {
					return [];
				}
			},
			isLogin:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		},
		methods: {
			goDetail(item){
				goShopDetail(item, this.uid).then(res => {
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

<style scoped lang='scss'>
	.bt-color {
		background-color: var(--view-theme);
		border: 1rpx solid var(--view-theme);
		&.type2{
			background-color: #FD6523;
			border: 1rpx solid #FD6523;
		}
	}
	.goodList .item {
		position: relative;
		padding: 20rpx;
		margin-bottom: 20rpx;
		background: #fff;
		justify-content: space-between;
		border-radius: 16rpx;
	}
	.goodList .item .pictrue {
		width: 180rpx;
		height: 180rpx;
		position: relative;
	}
	.goodList .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}
	.goodList .item .pictrue .numPic {
		position: absolute;
		left: 7rpx;
		top: 7rpx;
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
	}
	.goodList .item .underline{
		width: 450rpx;
		font-size: 30rpx;
		color: #222;
		position: relative;
	}
	.goodList .item .item_line{
		margin-top: 10rpx;
	}
	.goodList .item .item_line .coupon{
		font-size: 22rpx;
		margin-left: 4rpx;
	}
	.goodList .item .money {
		font-size: 26rpx;
		font-weight: bold;
		position: absolute;
		bottom: 10rpx;
		left: 0;
		color: var(--view-priceColor);
	}
	.goodList .item .money .num {
		font-size: 34rpx;
	}
	.goodList .item .vip-money {
		font-size: 24rpx;
		color: #282828;
		font-weight: bold;
		margin-top: 15rpx;
	}
	.goodList .item .vip-money image {
		width: 46rpx;
		height: 21rpx;
		margin-left: 5rpx;
	}
	.goodList .item .vip-money .num {
		font-size: 22rpx;
		color: #aaa;
		font-weight: normal;
		margin: -2rpx 0 0 22rpx;
	}
	.goodList .item .gobuy {
		position: absolute;
		right: 30rpx;
		padding: 6rpx 20rpx;
		border-radius: 50%;
		font-size: 22rpx;
		bottom: 30rpx;
		color: #fff;
		background: var(--view-theme);
		border-radius: 27rpx;
	}
</style>
