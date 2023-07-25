<template>
	<view :style="viewColor">
		<view class='my-order'>
			<view class='list'>
				<!-- 代付款 -->
				<view class='item' v-for="(item,index) in orderList" :key="index">
					<view>
						<view class='title acea-row row-between-wrapper'>
							<view class="acea-row row-middle left-wrapper" @click="goStore(item.mer_id)">
								<text class="iconfont icon-shangjiadingdan"></text>
								<view class="store-name">{{item.merchant.mer_name}}</view>
								<text class="iconfont icon-xiangyou"></text>
							</view>
							<block v-if="item.presellOrder">
								<view v-if="item.presellOrder.activeStatus === 1" class='t-color'>等待买家付尾款</view>
								<view v-if="item.presellOrder.activeStatus === 0" class='t-color'>未开始</view>
								<view v-if="item.presellOrder.activeStatus === 2" class='t-color'>交易已关闭</view>
							</block>
							
						</view>
						<block v-for="(goods,g) in item.orderProduct">
							<!--预售-->
							<view  class='item-info acea-row row-between row-top' @click='goOrderDetails(item.order_id)'>
								<view class='pictrue'>
									<image :src='(goods.cart_info.productAttr && goods.cart_info.productAttr.image) || goods.cart_info.product.image'></image>
								</view>
								<view class='text acea-row row-between'>
									<view class='name line1'>
										<text class="event_name event_bg">预售</text><text>{{goods.cart_info.product.store_name}}</text>
										<view class="event_ship event_color">发货时间：
											<block v-if="goods.cart_info.productPresell">
												<!--全款预售-->
												<text v-if="goods.cart_info.productPresell.presell_type === 1">{{ goods.cart_info.productPresell.delivery_type === 1 ? '支付成功后' : '预售结束后' }}{{ goods.cart_info.productPresell.delivery_day }}天内</text>
												<!--定金预售-->
												<text v-if="goods.cart_info.productPresell.presell_type === 2">{{ goods.cart_info.productPresell.delivery_type === 1 ? '支付尾款后' : '预售结束后' }}{{ goods.cart_info.productPresell.delivery_day }}天内</text>
											</block>
										</view>
									</view>
									<view class='money'>
										<view v-if="goods.cart_info.productPresellAttr">￥{{goods.cart_info.productPresellAttr.presell_price}}</view>
										<view>x{{goods.product_num}}</view>
									</view>
								</view>
								<view v-if="goods.cart_info.productPresell.presell_type === 2" class="event_price">
									<text class="color_gray">定金已支付 <text>￥{{ item.pay_price }}，</text></text>
									尾款待支付 <text class="p-color">￥{{ item.presellOrder.pay_price }}</text>
								</view>
							</view>
						</block>



						<view class='bottom acea-row row-right row-middle'>
							<view v-if="item.presellOrder.activeStatus === 2" class='bnt cancelBnt' @click.stop='cancelOrder(index,item.order_id)'>取消订单</view>
							<view v-if="item.presellOrder.activeStatus === 1" class='bnt b-color' @click.stop='goPay(item.presellOrder.pay_price,item.order_id)'>立即付款</view>
							<view v-if="item.presellOrder.activeStatus === 0" class='bnt b-color btn_auto'>未开始</view>
							<view v-if="item.presellOrder.activeStatus === 2" class='bnt b-color'>交易已关闭</view>
						</view>
					</view>
				</view>
			</view>
			<view class='loadingicon acea-row row-center-wrapper' v-if="orderList.length>5">
				<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadTitle}}
			</view>
			<view v-if="orderList.length == 0">
				<emptyPage title="暂无订单~"></emptyPage>
			</view>
		</view>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<payment :payMode='payMode' :pay_close="pay_close" @onChangeFun='onChangeFun' :order_id="pay_order_id" :totalPrice='totalPrice' :order_type='1'></payment>
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
	let app = getApp();
	import {
		getOrderList,
		orderData,
		unOrderCancel,
		orderDel,
		orderPay,
		groupOrderList,
		orderTake
	} from '@/api/order.js';
	import {
		getUserInfo
	} from '@/api/user.js';
	import {
		openOrderSubscribe
	} from '@/utils/SubscribeMessage.js';
	import payment from '@/components/payment';
	import {
		mapGetters
	} from "vuex";
	import authorize from '@/components/Authorize';
	import emptyPage from '@/components/emptyPage.vue'
	import { configMap } from '@/utils'
	export default {
		components: {
			payment,
			emptyPage,
			authorize,
		},
		data() {
			return {
				loading: false, //是否加载中
				loadend: false, //是否加载完毕
				loadTitle: '加载更多', //提示语
				orderList: [], //订单数组
				orderData: {}, //订单详细统计
				orderStatus: 0, //订单状态
				page: 1,
				limit: 20,
				payMode: [{
						name: "微信支付",
						icon: "icon-weixinzhifu",
						value: 'wechat',
						title: '微信快捷支付',
						payStatus: 1
					},
					{
						name: "支付宝支付",
						icon: "icon-zhifubao",
						value: 'alipay',
						title: '支付宝支付',
						payStatus: this.$store.getters.globalData.alipay_open
					},
					{
						name: "余额支付",
						icon: "icon-yuezhifu",
						value: 'balance',
						title: '可用余额:',
						number: 0,
						payStatus: this.$store.getters.globalData.yue_pay_status
					}
				],
				pay_close: false,
				pay_order_id: '',
				totalPrice: '0',
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false ,//是否隐藏授权
				isTimePay: false,
			};
		},
		computed: {
			...mapGetters(['isLogin','viewColor']),
			...configMap(['hide_mer_status', 'community_status', 'alipay_open', 'yue_pay_status']),
		},
		onShow() {
			if (this.isLogin) {
				this.$set(this, 'orderList', []);
				this.page = 1;
				this.loadend = false;
				this.loading = false;
				this.getOrderList();
				this.getUserInfo();
			} else {
                this.isAuto = true;
                this.isShowAuth = true
			}

		},
		onReady: function() {
		},
		methods: {
			onLoadFun() {
				this.isShowAuth = false;
				this.getOrderList();
				this.getUserInfo();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			/**
			 * 事件回调
			 *
			 */
			onChangeFun: function(e) {
				let opt = e;
				let action = opt.action || null;
				let value = opt.value != undefined ? opt.value : null;
				(action && this[action]) && this[action](value);
			},
			/**
			 * 获取用户信息
			 *
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.payMode[2].number = res.data.now_money;
					// that.$set(that, 'payMode', that.payMode);
				});
			},
			/**
			 * 关闭支付组件
			 *
			 */
			payClose: function() {
				this.pay_close = false;
			},
			/**
			 * 生命周期函数--监听页面加载
			 */
			onLoad: function(options) {
				if (options.status) this.orderStatus = options.status;

			},
			/**
			 * 获取订单统计数据
			 *
			 */

			/**
			 * 取消订单
			 *
			 */
			cancelOrder: function(index, order_id) {
				let that = this;
				if (!order_id) return that.$util.Tips({
					title: '缺少订单号无法取消订单'
				});
				orderDel(order_id).then(res => {
					return that.$util.Tips({
						title: res.message,
						icon: 'success'
					}, function() {
						that.orderList.splice(index, 1);
						that.$set(that, 'orderList', that.orderList);
						that.$set(that.orderData, 'unpaid_count', that.orderData.unpaid_count - 1);

					});
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				});
			},
			/**
			 * 打开支付组件
			 *
			 */
			goPay: function(pay_price, order_id) {
				console.log(order_id)
				this.$set(this, 'pay_close', true);
				this.order_id = order_id;
				this.pay_order_id = order_id.toString()
				// this.$set(this, 'pay_order_id', );
				this.$set(this, 'totalPrice', pay_price);
			},
			/**
			 * 支付成功回调
			 *
			 */
			pay_complete: function() {
				this.loadend = false;
				this.page = 1;
				this.$set(this, 'orderList', []);
				this.pay_close = false;
				this.pay_order_id = '';

				this.getOrderList();
			},
			/**
			 * 支付失败回调
			 *
			 */
			pay_fail: function() {
				this.pay_close = false;
				this.pay_order_id = '';

			},
			goStore(id){
				if(this.hide_mer_status != 1){
					uni.navigateTo({
						url:`/pages/store/home/index?id=${id}`
					})
				}
			},
			/**
			 * 去订单详情
			 */
			goOrderDetails: function(order_id) {
				let self = this
				if (!order_id) return that.$util.Tips({
					title: '缺少订单号无法查看订单详情'
				});
				// #ifdef MP
				uni.showLoading({
					title: '正在加载',
				})
				openOrderSubscribe().then(() => {
					uni.hideLoading();
					uni.navigateTo({
						url: '/pages/order_details/index?order_id=' + order_id
					})

				}).catch(() => {
					uni.hideLoading();
				})
				// #endif
				// #ifndef MP

				uni.navigateTo({
					url: '/pages/order_details/index?order_id=' + order_id
				})

				// #endif
			},

			/**
			 * 获取订单列表
			 */
			getOrderList: function() {
				let that = this;
				if (that.loadend) return;
				if (that.loading) return;
				that.loading = true;
				that.loadTitle = "加载更多";
					getOrderList({
						status: 10,
						page: that.page,
						limit: that.limit,
					}).then(res => {
						let list = res.data.list || [];
						let loadend = list.length < that.limit;
						that.orderList = that.$util.SplitArray(list, that.orderList);
						that.$set(that, 'orderList', that.orderList);
						that.getProductCount();
						that.loadend = loadend;
						that.loading = false;
						that.loadTitle = loadend ? "我也是有底线的" : '加载更多';
						that.page = that.page + 1;
					}).catch(err => {
						that.loading = false;
						that.loadTitle = "加载更多";
					})
			},

			/**
			 * 获取单个订单商品数量
			 */
			getProductCount: function(){
				if(this.orderStatus !== 0){
					this.orderList.forEach((item,i) => {
						let orderNum = 0
						 item.orderProduct.forEach((val) => {
						      orderNum += val.product_num
						  })
						  this.orderList[i]['orderNum']=orderNum;
					 })
				}

			},
			/**
			 * 删除订单
			 */
			delOrder: function(order_id, index) {
				let that = this;
				orderDel(order_id).then(res => {
					that.orderList.splice(index, 1);
					that.$set(that, 'orderList', that.orderList);
					that.$set(that.orderData, 'unpaid_count', that.orderData.unpaid_count - 1);

					return that.$util.Tips({
						title: '删除成功',
						icon: 'success'
					});
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				})
			},
			// 确认收货
			confirmOrder: function(item, index) {
				let that = this;
				uni.showModal({
					title: '确认收货',
					content: '为保障权益，请收到货确认无误后，再确认收货',
					success: function(res) {
						if (res.confirm) {
							orderTake(item.order_id).then(res => {
								return that.$util.Tips({
									title: '操作成功',
									icon: 'success'
								}, function() {
									that.orderList.splice(index, 1);

								});
							}).catch(err => {
								return that.$util.Tips({
									title: err
								});
							})
						}
					}
				})
			},
		},
		onReachBottom: function() {
			this.getOrderList();
		}
	}
</script>

<style scoped lang="scss">
	.my-order .header {
		height: 260rpx;
		padding: 0 30rpx;
	}
	.my-order .header .picTxt {
		height: 190rpx;
	}
	.my-order .header .picTxt .text {
		color: rgba(255, 255, 255, 0.8);
		font-size: 26rpx;
	}
	.my-order .header .picTxt .text .name {
		font-size: 34rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 20rpx;
	}
	.my-order .header .picTxt .pictrue {
		width: 122rpx;
		height: 109rpx;
	}
	.my-order .header .picTxt .pictrue image {
		width: 100%;
		height: 100%;
	}
	.my-order .nav {
		background-color: #fff;
		width: 690rpx;
		height: 140rpx;
		border-radius: 6rpx;
		margin: -73rpx auto 0 auto;
	}
	.my-order .nav .item {
		text-align: center;
		font-size: 26rpx;
		color: #282828;
		padding: 29rpx 0;
	}
	.my-order .nav .item.on {
		font-weight: bold;
		border-bottom: 5rpx solid #e93323;
	}
	.my-order .nav .item .num {
		margin-top: 18rpx;
	}
	.my-order .list {
		width: 690rpx;
		margin: 14rpx auto 0 auto;
	}
	.my-order .list .item {
		background-color: #fff;
		border-radius: 16rpx;
		margin-bottom: 14rpx;
	}
	.t-color {
		color: var(--view-theme);
	}
	.p-color {
		color: var(--view-priceColor);
	}
	.b-color {
		background-color: var(--view-theme);
	}
	.my-order .list .item .title {
		height: 84rpx;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 28rpx;
		color: #282828;
		.left-wrapper {
			.iconfont {
				margin-top: 5rpx;
			}
			.store-name {
				margin: 0 10rpx;
			}
			.icon-xiangyou {
				font-size: 20rpx;
			}
		}
	}
	.my-order .list .item .title .sign {
		font-size: 24rpx;
		padding: 0 7rpx;
		height: 36rpx;
		margin-right: 15rpx;
	}
	.my-order .list .item .item-info {
		padding: 0 30rpx;
		margin-top: 22rpx;
	}
	.my-order .list .item .item-info .pictrue {
		width: 120rpx;
		height: 120rpx;
	}
	.my-order .list .item .item-info .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}
	.my-order .list .item .item-info .text {
		width: 486rpx;
		font-size: 28rpx;
		color: #999;
		margin-top: 6rpx;
	}
	.my-order .list .item .item-info .text .name {
		width: 320rpx;
		color: #282828;
	}
	.event_bg{
		background: #FF7F00;
	}
	.event_color{
		color: #FF7F00;
	}
	.my-order .list .item .event_name{
		display: inline-block;
		margin-right: 9rpx;
		color: #fff;
		font-size: 20rpx;
		padding: 0 8rpx;
		line-height: 30rpx;
		text-align: center;
		border-radius: 6rpx;
	}
	.my-order .list .item .event_ship{
		font-size: 20rpx;
		margin-top: 10rpx;
	}
	.my-order .list  .event_price{
		margin: 0 0 50rpx 120rpx;
		font-size: 24rpx;
		.color_gray{
			color: #999;
		}
	}
	.my-order .list .item .item-info .text .money {
		text-align: right;
	}
	.my-order .list .item .totalPrice {
		font-size: 26rpx;
		color: #282828;
		text-align: right;
		margin: 27rpx 0 0 30rpx;
		padding: 0 30rpx 30rpx 0;
	}
	.my-order .list .item .totalPrice .money {
		font-size: 28rpx;
		font-weight: bold;
	}
	.my-order .list .item .bottom {
		height: 107rpx;
		padding: 0 30rpx;
		border-top: 1px solid #f0f0f0;
	}
	.my-order .list .item .bottom .bnt {
		width: 176rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		color: #fff;
		border-radius: 50rpx;
		font-size: 27rpx;
		&.btn_auto{
			width: auto;
			padding: 0 40rpx;
		}
	}
	.my-order .list .item .bottom .bnt.cancelBnt {
		border: 1rpx solid #ddd;
		color: #aaa;
	}
	.my-order .list .item .bottom .bnt~.bnt {
		margin-left: 17rpx;
	}
	.noCart {
		margin-top: 171rpx;
		padding-top: 0.1rpx;
	}
	.noCart .pictrue {
		width: 414rpx;
		height: 336rpx;
		margin: 78rpx auto 56rpx auto;
	}
	.noCart .pictrue image {
		width: 100%;
		height: 100%;
	}
	.event_container{
		width: 690rpx;
		background-image: url(../static/images/presell_orderBg.png);
		background-size: cover;
		background-repeat: no-repeat;
		margin: 20rpx auto;
		padding: 26rpx 30rpx;
		border-radius: 16rpx;
		.info{
			width: 420rpx;
			.title{
				color: #282828;
				font-size: 26rpx;
			}
			.desc{
				color: #999;
				font-size: 24rpx;
				margin-top: 30rpx;
			}
		}
		.photo{
			width: 180rpx;
			.picture{
				width: 120rpx;
				height: 120rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 8rpx;
				}
			}
			.more_btn{
				color: #fff;
				background: #F97E3B;
				width: 40rpx;
				height: 40rpx;
				border-radius: 40rpx;
				text-align: center;
				line-height: 40rpx;
				position: relative;
				top: 40rpx;
				text{
					font-size: 10rpx;
				}
			}
		}
	}
</style>
