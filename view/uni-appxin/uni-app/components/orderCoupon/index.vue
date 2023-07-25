<template>
	<view :style="viewColor">
		<view class='coupon-list-window animated' :class='coupon.status==true?"slideInUp":""'>
			<view class='title'>
				<view class="item">{{couponTitle}}<text class='iconfont icon-guanbi' @tap='close'></text></view>
			</view>
			<block v-if="couponArr.length">
				<view class='coupon-list'>
					<view class='item acea-row row-center-wrapper' :class="item.disabled ? 'disabled' : ''" 
					 v-for="(item,index) in couponArr" @click="getCouponUser(index,item)" :key='index'>
						<view v-if="item.coupon.send_type == 5" class='money acea-row row-column row-center-wrapper vip-coupon'>
							<view>￥<text class='num'>{{item.coupon_price}}</text></view>
							<view class="pic-num">满{{item.use_min_price}}元可用</view>
						</view>
						<view v-else class='money acea-row row-column row-center-wrapper' :style="{ 'background-image': `url(${domain}/static/diy/couponBg${keyColor}.png)` }">
							<view>￥<text class='num'>{{item.coupon_price}}</text></view>
							<view class="pic-num">满{{item.use_min_price}}元可用</view>
						</view>
						<view class='text'>
							<view class='condition line1'>
								<span class='line-title' v-if='item.coupon.type===0'>店铺券</span>
								<span class='line-title' v-else-if='item.coupon.type===1'>商品券</span>
								<span>{{item.coupon_title}}</span>
							</view>
							<view class='data acea-row row-between-wrapper'>
								<view>{{ item.start_time | timeYMD }} ~ {{ item.end_time | timeYMD}}</view>
								<view class="iconfont icon-weixuanzhong" v-if="!item.checked"></view>
								<view class='iconfont icon-xuanzhong1' v-else></view>
							</view>
						</view>
					</view>
				</view>
				<view class="foot-box">
					<view class="left">
						已选择{{coupon_number}}张，可优惠<text>￥{{coupon_amount}}</text>
					</view>
				</view>
			</block>
			<!-- 无优惠券 -->
			<view class='pictrue' v-else>
				<image src='../../static/images/noCoupon.png'></image>
			</view>
		</view>
		<view class='mask' catchtouchmove="true" :hidden='coupon.status==false' @click='close'></view>
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
	import { setCouponReceive } from '@/api/api.js';
	import { mapGetters } from "vuex";
	import { HTTP_REQUEST_URL } from '@/config/app';
	export default {
		props: {
			//打开状态 0=领取优惠券,1=使用优惠券
			openType: {
				type: Number,
				default: 0,
			},
			coupon: {
				type: Object,
				default: function() {
					return {};
				}
			},
			coupon_amount: {
				type: Number
			},
			coupon_number: {
				type: Number
			},
			couponTitle: {
				type: String,
				default: '优惠券',
			}
		},
		filters: {
			timeYMD: function(value) {
				if(value){
					var newDate=/\d{4}-(\d{1,2}\d{1,2}-\d{1,2}\d{1,2})/g.exec(value)
					return newDate?.[0]||''
				}
			}
		},
		computed: mapGetters(['viewColor','keyColor']),
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				couponArr: [],
				couponData: {},
				// 选中的数据存放
				active: {},
				allNum: 0,
				allCouponNum: 0,
				// 选中店铺优惠券id
				use_store_coupon: 0,
				// 单个店铺总价
				pay_price: 0,
				// 商品有优惠订单
				goodsOrder: '',
				moneyBg: '/static/images/couponBg',
			};
		},
		watch: {
			coupon:{
				handler(nVal,oVal){
					this.couponArr = JSON.parse(JSON.stringify(nVal.coupon))
				},
				immediate: true,
				deep:true
			}
		},
		mounted() {
			this.couponData = this.coupon
			// 深拷贝数据 不影响原来数据使用
			this.couponArr = JSON.parse(JSON.stringify(this.coupon.coupon))
			// 深拷贝数据 不影响原来数据使用
			// this.goodsOrder = JSON.parse(JSON.stringify(this.coupon.order))
			let tempObj = this.active[this.couponData.mer_id] = {}
			tempObj.product = []
			tempObj.store = ''
		},
		methods: {
			close: function() {
				this.$emit('ChangCouponsClone');
			},
			// 使用优惠券
			getCouponUser: function(index, item) {
				this.$emit('getCoupon',item);
			}					
		}
	}
</script>

<style scoped lang="scss">
	.animated {
		animation-duration: .3s
	}
	.title {
		display: flex;
		.item {
			position: relative;
			flex: 1;
			font-size: 28rpx;
			color: #999999;
			&::after {
				content: ' ';
				position: absolute;
				left: 50%;
				bottom: 18rpx;
				width: 50rpx;
				height: 5rpx;
				background: transparent;
				border-radius: 3px;
				transform: translateX(-50%);
			}
			&.on {
				color: #282828;
				&::after {
					background: var(--view-theme);
				}
			}
			
		}
	}
	.coupon-list {
		padding: 30rpx;
		.item {
			box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.06);
			&.disabled{
				pointer-events:none;
				opacity: .6;
				.iconfont{
					background-color: #eee;
					border-radius: 100%;
				}
			}
		}
	}
	.coupon-list-window {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		border-radius: 16rpx 16rpx 0 0;
		z-index: 555;
		transform: translate3d(0, 100%, 0);
		transition: all .3s cubic-bezier(.25, .5, .5, .9);
	}
	.coupon-list-window.on {
		animation: aminup;
	}
	.coupon-list-window .title {
		height: 106rpx;
		width: 100%;
		text-align: center;
		line-height: 106rpx;
		font-size: 32rpx;
		font-weight: bold;
		position: relative;
		border: 1px solid #f5f5f5;
	}
	.coupon-list-window .title .iconfont {
		position: absolute;
		right: 30rpx;
		top: 50%;
		transform: translateY(-50%);
		font-size: 35rpx;
		color: #8a8a8a;
		font-weight: normal;
	}
	.coupon-list-window .coupon-list {
		margin: 0 0 0rpx 0;
		height: 550rpx;
		overflow: auto;
	}
	.coupon-list-window .pictrue {
		width: 414rpx;
		height: 336rpx;
		margin: 0 auto 50rpx auto;
	}

	.coupon-list-window .pictrue image {
		width: 100%;
		height: 100%;
	}
	.pic-num {
		color: #fff;
		font-size: 24rpx;
	}
	.line-title {
		width: 90rpx;
		padding: 0 10rpx;
		box-sizing: border-box;
		background: rgba(255, 247, 247, 1);
		border: 1px solid var(--view-theme);
		opacity: 1;
		border-radius: 20rpx;
		font-size: 20rpx;
		color: var(--view-theme);
		margin-right: 12rpx;
	}

	.line-title.gray {
		border-color: #BBB;
		color: #bbb;
		background-color: #F5F5F5;
	}
	.foot-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100rpx;
		padding: 0 30rpx;
		border-top: 1px solid #F5F5F5;
		.btn {
			width: 240rpx;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			background: var(--view-theme);;
			border-radius: 35rpx;
			color: #fff;
			font-size: 30rpx;
		}
		.left {
			text {
				color: var(--view-priceColor);
			}
		}
	}

	.coupon-list .item .text .data .iconfont {
		font-size: 36rpx;

		&.icon-weixuanzhong {
			color: #BFBFBF;
		}
		&.icon-xuanzhong1 {
			color: var(--view-theme);;
		}
	}
</style>
