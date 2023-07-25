<template>
	<view>
		<view v-if="orderList.length > 0">
			<view class='cancellate'>
				<view>
					<view class="order acea-row row-between">
						<view class="order_sn">订单号：{{orderData.order_sn}}</view>
						<view class="btn" @click="goBack">上一步</view>
					</view>	
					<view class='list'>
						<view class="acea-row row-between header">
							<view class="info">
								<view class="name">共{{orderData.total_num}}件</view>
							</view>
							<!-- <navigator url="" hover-class='none' class="coupon-btn">查看	<text class="iconfont icon-xiangyou"></text></navigator> -->
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view v-for="goods in orderList" :key="goods.cart_id" class='picTxt acea-row'>
								<view v-if="goods.refund_num > 0 && orderData.status == 0" class="checkbox"  @click.stop="goodsCheck(goods)">
									<text v-if="goods.check" class="iconfont icon-xuanzhong1"></text>
									<text v-else class="iconfont icon-weixuanzhong"></text>
								</view>
								<view v-else class="checkbox">
									<text class="iconfont icon-weixuanzhong disabled"></text>
								</view>
								
								<view class='pictrue'>
									<image :src='goods.cart_info.product.image'></image>
								</view>
								<view class='text'>
									<view class='line1 name'>{{goods.cart_info.product.store_name}}</view>
									<view class='money acea-row row-middle'>
										<text>￥{{goods.cart_info.productAttr.price}}</text>
									</view>
									<view class="callate_bom acea-row row-between">
										<view class="callate_text refund_text">x{{goods.product_num}}</view>
										<view class='carnum acea-row row-center-wrapper'>
											<view class="reduce" :class="(goods.numSub || goods.refund_num == 1) ? 'on' : ''" @click.stop='subCart(goods)'>-</view>
											<view class='num'>{{goods.refund_num}}</view>
											<view class="plus" :class="(goods.max_count == goods.refund_num || goods.numAdd) ? 'on' : ''" @click.stop='addCart(goods)'>+</view>
										</view>
									</view>	
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class='footer acea-row row-between-wrapper' v-if="orderList.length > 0">
				<view>
					<view class="allcheckbox" @click.stop="checkboxAllChange">
						<text v-if="!isAllSelect" class="iconfont icon-weixuanzhong"></text>
						<text v-else class="iconfont icon-xuanzhong1"></text>
						全选
					</view>
				</view>
				<view class='money acea-row row-middle'>
					<form @submit="goCallate" report-submit='true'>
						<button class='placeOrder' formType="submit">立即核销</button>
					</form>
				</view>	
			</view>
		</view>
		<view v-else>
			<emptyPage title="暂无订单信息~"></emptyPage>
		</view>
		<!-- 组件 -->
		<authorize :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse" @onLoadFun="onLoadFun"></authorize>
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
		verifierOrder, orderVerific
	} from '@/api/admin.js';
	import {
		getProductHot,
	} from '@/api/store.js';
	import {
		mapGetters
	} from "vuex";
	import authorize from '@/components/Authorize';
	import emptyPage from '@/components/emptyPage.vue'
	import { configMap } from '@/utils';
	const app = getApp();
	export default {
		components: {
			authorize,
			emptyPage
		},
		data() {
			return {
				loading: false, //是否加载中
				loadend: false, //是否加载完毕
				loadTitle: '加载更多', //提示语
				cartCount: 0,
				hostProduct: [],
				orderData: {},
				orderList: [],
				verify_code: '',
				mer_id: '',
				isAllSelect: true, //全选
				selectValue: [], //选中的数据
				selectCountPrice: 0.00,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
			};
		},
		computed: mapGetters(['isLogin']),
		onReady(){},
		mounted: function() {},
		onLoad: function(options) {
			let that = this;
			that.verify_code = options.code
			that.mer_id = options.mer_id
		},
		onShow: function() {
			if (this.isLogin == true) {
				this.getOrderData();
			}else{
				setTimeout(() =>{
					this.isAuto = true;
					this.isShowAuth = true
				}, 300);
			}
		},
		methods: {
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e;
			},
			onLoadFun(){
				this.isShowAuth = false;
			},
			goBack: function() {
				uni.navigateBack();
			},
			getOrderData(){
				let that = this
				verifierOrder(that.mer_id,that.verify_code)
					.then(res => {
						that.orderData = res.data
						that.orderList = res.data.orderProduct
						that.orderList.forEach((item) => {
							item.max_count = item.refund_num
							this.$set(item, "check", true);
						})
					}).catch(res => {
						that.$util.Tips({
							title: res
						});
						setTimeout(()=>{
							uni.navigateTo({
								url: '/pages/admin/orderList/index?types=4&merId='+that.mer_id
							});
						},500)
					})
			},
			// 商品递减
			subCart(goods) {
				if (goods.refund_num <= 1) {
					goods.refund_num = 1;
					goods.numSub = true;
				} else {
					goods.refund_num--
					goods.numAdd = false;
				}
			},
			// 商品增加
			addCart(goods) {
				if(goods.max_count <= goods.refund_num){
					goods.refund_num = goods.max_count
					goods.numAdd = true;
				}else{
					goods.refund_num++
					goods.numSub = false;
				}
			},
			goCallate() {
				let that = this;
				let products = that.getSelectedProduct();
				if(products.length == 0){
					return that.$util.Tips({
						title: '请选择要核销的商品'
					});
				}
				orderVerific(that.mer_id,that.orderData.order_id,{verify_code: that.verify_code,data: products})
					.then(res => {
						that.$util.Tips({
							title: res.message
						});
						that.getOrderData();
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
						setTimeout(()=>{
							uni.navigateTo({
								url: '/pages/admin/order_cancellation/index?mer_id='+that.mer_id
							});
						},500)
					});
			},
			// 获取选中的商品
			getSelectedProduct(){
				let arr = []
				this.orderList.forEach((item) => {
					if(item.check){
						arr.push({id: item.order_product_id, num: item.refund_num})
					}
				})
				return arr
			},
			// 商品选中
			goodsCheck(goods) {
				goods.check = !goods.check
				this.cartAllCheck('goodsCheck')
			},
			// 全选
			checkboxAllChange() {
				this.isAllSelect = !this.isAllSelect
				this.cartAllCheck('allCheck')
			},
			// 全选判断
			cartAllCheck(type) {
				let tempArr = [], calArr = [];
				this.orderList.forEach((item) => {
					if((this.orderData.status == 0 && item.refund_num > 0)){
						calArr.push(item)
					}
				})
				if (type == 'goodsCheck') {
					tempArr = calArr.filter(item => {
						return item.check
					})
					this.isAllSelect = calArr.length == tempArr.length
				} else {
					calArr.forEach((item) => {
						item.check = this.isAllSelect
						if(item.check)tempArr.push(item)
					})
				}	
				// 全选
				this.isAllSelect = tempArr.length == calArr.length ? true : false
			},
		},
		onReachBottom() {
			
		},
		// 滚动监听
		onPageScroll(e) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			uni.$emit('scroll');
		}
	}
</script>

<style scoped lang="scss">
	page {	
		background: #F5F5F5;
	}
	.cancellate {
		margin-top: 20rpx;
		padding: 0 30rpx;
		.order {
			background: #fff;
			height: 90rpx;
			border-radius: 16rpx;
			padding: 0 30rpx;
			align-items: center;
			color: #282828;
			font-size: 28rpx;
			.btn{
				width: 124rpx;
				height: 48rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border: 1px solid #707070;
				border-radius: 25rpx;
			}
		}
		.list{
			background: #fff;
			border-radius: 16rpx;
			margin-top: 20rpx;
			.header{
				height: 88rpx;
				line-height: 88rpx;
				padding: 0 30rpx;
				border-bottom: 1px solid #f0f0f0;
				.info{
					color: #282828;
					text{
						color: #999;
					}
				}
				.coupon-btn{
					color: #666;
					font-size: 24rpx;
					.iconfont{
						font-size: 20rpx;
					}
				}
			}
		}
		.item{
			padding: 20rpx;
		}
		.picTxt {
			width: 100%;
			position: relative;
			align-items: center;
			margin-bottom: 30rpx;
			.checkbox {
				width: 60rpx;
				.iconfont {
					font-size: 40rpx;
					color: #CCCCCC;
					border-radius: 100%;
					&.disabled{
						background: #f3f3f3;
					}
				}
				.icon-xuanzhong1 {
					color: #2291F8;
				}
			}
			.pictrue {
				width: 160rpx;
				height: 160rpx;
				image {
					width: 100%;
					height: 100%;
					border-radius: 6rpx;
				}
			}
			.text {
				width: 410rpx;
				margin-left: 20rpx;
				font-size: 28rpx;
				color: #282828;
			}
			.text .money {
				font-size: 26rpx;
				color: #282828;
				margin-top: 8rpx;
			}
			.callate_bom{
				margin-top: 20rpx;
				align-items: center;
				.callate_text{
					font-size: 26rpx;
					color: #999;
					&.refund_text{
						color: #FF9600;
					}
					&.uncall_text{
						color: #2291F8;
					}
				}
			}
			.carnum {
				height: 47rpx;
			}
			.carnum view {
				border: 1px solid #a4a4a4;
				min-width: 66rpx;
				text-align: center;
				height: 100%;
				line-height: 46rpx;
				font-size: 28rpx;
				color: #a4a4a4;
			}
			.reduce {
				border-right: 0;
				border-radius: 3rpx 0 0 3rpx;
				&.on{
					border-color: #e3e3e3;
					color: #dedede;
				}
			}
			.plus {
				border-left: 0;
				border-radius: 0 3rpx 3rpx 0;
				&.on{
					border-color: #e3e3e3;
					color: #dedede;
				}
			}
			.carnum .num {
				color: #282828;
			}
		}
	}
	.footer {
		z-index: 9;
		width: 100%;
		height: 96rpx;
		background-color: #fafafa;
		position: fixed;
		padding: 0 30rpx;
		box-sizing: border-box;
		border-top: 1px solid #eee;
		bottom: 0;
	}
	.footer .checkAll {
		font-size: 28rpx;
		color: #282828;
		margin-left: 16rpx;
	}
	.footer .placeOrder {
		color: #fff;
		font-size: 30rpx;
		width: 226rpx;
		height: 70rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 70rpx;
		margin-left: 22rpx;
		background-color: #2291F8;
	}
	.allcheckbox {
		display: flex;
		align-items: center;
		width: 260rpx;
		.iconfont {
			margin-right: 20rpx;
			font-size: 40rpx;
			color: #CCCCCC;
		}
		.icon-xuanzhong1 {
			color: #2291F8;
		}
	}
	.footer .button .bnt {
		font-size: 28rpx;
		color: #999;
		border-radius: 50rpx;
		border: 1px solid #999;
		width: 160rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		&.bt-color {
			color: #2291F8;
			border: 1px solid #2291F8;
		}
	}
</style>

