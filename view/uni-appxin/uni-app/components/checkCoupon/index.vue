<template>
	<view>
		<view class='coupon-list-window animated' :class='coupon.status==true?"slideInUp":""'>
			<view class='title'>
				<view class="item">优惠券</view>
			</view>
			<block v-if="couponArr.length">
				<view class='coupon-list'>
					<view class='item acea-row row-center-wrapper' v-for="(item,index) in couponArr" @click="getCouponUser(index,item)"
					 :key='index'>
						<view class='money acea-row row-column row-center-wrapper'>
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
								<view>{{ item.start_time |timeYMD }} ~ {{ item.end_time |timeYMD}}</view>
								<view class="iconfont icon-weixuanzhong" v-if="!item.checked"></view>
								<view class='iconfont icon-xuanzhong1' v-else></view>
							</view>
						</view>
					</view>
				</view>
				<view class="foot-box">
					<view class="left">
						已选择{{allNum}}张，可优惠<text>￥{{allCouponNum}}</text>
					</view>
					<view class="btn" @click="confirm">确定</view>
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
	import {
		setCouponReceive
	} from '@/api/api.js';
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
			subCoupon: {
				type: Object
			}
		},
		filters: {
			timeYMD: function(value) {
				if(value){
					var newDate=/\d{4}-(\d{1,2}\d{1,2}-\d{1,2}\d{1,2})/g.exec(value)
					return newDate?.[1]||''
				}
			}
		},
		data() {
			return {
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
				goodsOrder: ''
			};
		},
		mounted() {
			this.couponData = this.coupon
			// 深拷贝数据 不影响原来数据使用
			this.couponArr = JSON.parse(JSON.stringify(this.coupon.coupon))
			// 深拷贝数据 不影响原来数据使用
			this.goodsOrder = JSON.parse(JSON.stringify(this.coupon.order))
			let tempObj = this.active[this.couponData.mer_id] = {}
			tempObj.product = []
			tempObj.store = ''
			this.allActive()
		},
		methods: {
			close: function() {
				this.$emit('ChangCouponsClone');
			},
			// 使用优惠券
			getCouponUser: function(index, item) {
				let self = this
				// 先判断是哪个券 1商品 0店铺
				if (item.coupon.type == 1) {
					let order = this.goodsOrder
					let orderToalPrice = 0
					if (item.checked) {
						/**
						 * 取消选中 并且删除 use_coupon_product里的值
						 * use_coupon_product 哪些商品可以用的券的id
						 * */
						for (let key in order.use_coupon_product) {
							if (order.use_coupon_product[key] == item.coupon_user_id) {
								delete order.use_coupon_product[key]
							}
						}
						item.checked = false
					} else {
						/**
						 * 选中
						 * @item.product 该优惠券可以使用的商品
						 * order.product_price 产品的价格 key是id
						 * */
						for (let i = 0; i < item.product.length; i++) {
							if (order.product_price[item.product[i].product_id]) {
								orderToalPrice = order.product_price[item.product[i].product_id]
								//价格的值大于等于最小值就可以使用
								if (orderToalPrice >= parseFloat(item.use_min_price)) {
									// 可以用
									if (!order.use_coupon_product[item.product[i].product_id]) {
										item.checked = true
										order.use_coupon_product[item.product[i].product_id] = item.coupon_user_id
									} else {
										// 上个商品用了就取消选中，点击的这个添加选中
										this.couponArr.forEach(el => {
											if (el.coupon_user_id == order.use_coupon_product[item.product[i].product_id]) {
												el.checked = false
											}
										})
										item.checked = true
										order.use_coupon_product[item.product[i].product_id] = item.coupon_user_id
									}
									break
								}
							}
						}
					}
				} else {
					let order = this.couponData.order
					// 店铺券
					if (item.checked) {
						item.checked = false
						// this.pay_price = order.total_price
					} else {
						this.couponArr.forEach(el => {
							if (el.coupon.type == 0 && el.checked) {
								el.checked = false
							}
						})
						item.checked = true
					}
					this.pay_price = this.$util.$h.Sub(order.total_price, item.coupon_price)
				}
				this.allActive()
			},
			// 选中计算
			allActive() {
				let tempObj = this.active[this.couponData.mer_id]
				let sotreTotal = 0 //商铺券优惠
				let goodsTotal = 0 //商品券优惠
				tempObj.product = []
				tempObj.store = ''
				this.couponArr.forEach(el => {
					/**
					 * @el.coupon.type 0店铺 1商品
					 */
					if (el.coupon.type == 0 && el.checked) {
						tempObj.store = el.coupon_user_id
						sotreTotal = el.coupon_price
						this.use_store_coupon = el.coupon_user_id
					}
					if (el.coupon.type == 1 && el.checked) {
						tempObj.product.push(el.coupon_user_id)
						goodsTotal = this.$util.$h.Add(goodsTotal, el.coupon_price)
					}
				})
				if (tempObj.store) {
					this.allNum = this.$util.$h.Add(tempObj.product.length, 1)
				} else {
					this.allNum = tempObj.product.length
				}
				let tempAllCouponNum = this.$util.$h.Add(sotreTotal, goodsTotal)
				if (parseFloat(tempAllCouponNum) >= parseFloat(this.couponData.order.total_price)) {
					this.allCouponNum = this.couponData.order.total_price
				} else {
					if(this.allNum !== 0 ){
						if(sotreTotal || goodsTotal){
							this.allCouponNum = tempAllCouponNum
						}else{
							this.allCouponNum = this.couponData.order.total_price							
						}						
					}else{
						this.allCouponNum = tempAllCouponNum
					}
				}
			},
			// 确认
			confirm() {
				// 商品类
				this.couponData.order = this.goodsOrder
				// 店铺类
				// 支付价格
				let tempTotal = 0
				tempTotal = this.$util.$h.Sub(this.couponData.order.total_price, this.allCouponNum)
				if (tempTotal > 0) {
					this.couponData.order.pay_price = this.$util.$h.Add(tempTotal, this.couponData.order.postage_price)
				} else {
					// 如果没有用优惠券
					if(this.allNum == 0){
						this.couponData.order.pay_price = this.$util.$h.Add(this.couponData.order.total_price, this.couponData.order.postage_price)
					}else{
						this.couponData.order.pay_price = this.couponData.order.postage_price
					}					
				}
				// 列表的优惠总金额
				this.couponData.order.coupon_price = this.allCouponNum
				this.couponData.order.use_store_coupon = this.use_store_coupon
				this.couponData.coupon = this.couponArr
				this.active[this.coupon.mer_id].product = this.goodsOrder.use_coupon_product
				this.subCoupon[this.coupon.mer_id] = this.active[this.coupon.mer_id]
				this.$emit('ChangCoupons',this.couponData);
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
					background: $theme-color;
				}
			}
		}
	}
	.coupon-list {
		padding: 30rpx;
		.item {
			box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.06);
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
		border: 1px solid rgba(232, 51, 35, 1);
		opacity: 1;
		border-radius: 20rpx;
		font-size: 20rpx;
		color: #E83323;
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
			background: $theme-color;
			border-radius: 35rpx;
			color: #fff;
			font-size: 30rpx;
		}
		.left {
			text {
				color: $theme-color;
			}
		}
	}
	.coupon-list .item .text .data .iconfont {
		font-size: 36rpx;
		&.icon-weixuanzhong {
			color: #BFBFBF;
		}
		&.icon-xuanzhong1 {
			color: $theme-color;
		}
	}
</style>
