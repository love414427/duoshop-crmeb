<template>
	<view :style="viewColor">
		<view class='order-details'>
			<view class='header acea-row row-middle'>
				<view class='pictrue'>
					<image v-if="orderInfo.paid == 0" :src="domain+'/static/order_2.gif'"></image>
					<image v-else :src="domain+'/static/order_'+(orderInfo.status+1)+'.gif'"></image>
				</view>
				<view v-if="orderInfo.status == 0 && orderInfo.paid == 0" class='data'>
					<view class='state'>请在{{orderInfo.cancel_time}}前完成支付!</view>
					<view>{{orderInfo.add_time_y}}<text class='time'>{{orderInfo.create_time}}</text></view>
				</view>
				<view v-else class='data'>
					<view class='state'>
						<block v-if="orderInfo.status == 0  && orderInfo.paid == 1">待发货</block>
						<block v-if="orderInfo.status == 1">待收货</block>
						<block v-if="orderInfo.status == 3">已完成</block>
					</view>
					<view>{{orderInfo.pay_time}}</view>
				</view>
			</view>
			<view>
				<view class='address'>
					<view class='name'>{{orderInfo.real_name}}<text class='phone'>{{orderInfo.user_phone}}</text></view>
					<view>{{orderInfo.user_address}}</view>
				</view>
				<view class='line'>
					<image :src="`${domain}/static/images/line.jpg`"></image>
				</view>
			</view>
			<view class="orderGoods" :class="orderInfo.product_type == 0?'':'on'">
				<view class='total'>共{{orderInfo.total_num}}件商品</view>
				<view class='goodWrapper'>
					<view class='item acea-row row-between-wrapper' v-for="(item, index) in orderInfo.orderProduct" @click="jumpCon(item)">
						<view class='pictrue'>
							<image v-if="item.cart_info" :src='(item.cart_info.productArr && item.cart_info.productArr.image) || item.cart_info.product.image'></image>
						</view>
						<view class='text'>
							<view class='acea-row row-between-wrapper'>
								<view class='name line1'>{{item.cart_info.product.store_name}}</view>
								<view class='num'>x {{item.product_num}}</view>
							</view>
							<view class='attr line1'>{{item.cart_info.productAttr.sku || '默认'}}</view>
							<view class='money'>
								{{item.integral}}积分 <text v-if="item.product_price > 0">+{{item.product_price}}元</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 送货 -->
			<view class="wrapper" v-if="orderInfo.delivery_type == 2">
				<view class='item acea-row row-between'>
					<view>配送方式：</view>
					<view class='conter'>送货</view>
				</view>
				<view class='item acea-row row-between'>
					<view>配送员：</view>
					<view class='conter'>{{orderInfo.delivery_name}}</view>
				</view>
				<view class='item acea-row row-between'>
					<view>联系电话：</view>
					<view class='conter'>{{orderInfo.delivery_id}}</view>
				</view>
			</view>
			<view class='wrapper'>
				<view class='item acea-row row-between'>
					<view>订单编号：</view>
					<view class='conter acea-row row-middle row-right'>{{orderInfo.order_sn}}
						<!-- #ifndef H5 -->
						<text class='copy' @tap='copy'>复制</text>
						<!-- #endif -->
						<!-- #ifdef H5 -->
						<text class='copy copy-data' :data-clipboard-text="orderInfo.order_sn">复制</text>
						<!-- #endif -->
					</view>
				</view>
				<view class='item acea-row row-between'>
					<view>下单时间：</view>
					<view class='conter'>{{orderInfo.create_time}}</view>
				</view>
				<view class='item acea-row row-between'>
					<view>支付状态：</view>
					<view class='conter'>{{orderInfo.paid == 1 ? '已支付' : '未支付'}}</view>
				</view>
				<view class='item acea-row row-between'>
					<view>支付积分：</view>
					<view class='conter'>{{orderInfo.integral}}积分</view>
				</view>
				<view class='item acea-row row-between'>
					<view>支付金额：</view>
					<view class='conter'>￥{{orderInfo.pay_price}}</view>
				</view>
				<view class='item acea-row row-between'>
					<view>备注信息：</view>
					<view class='conter'>{{orderInfo.mark}}</view>
				</view>
				<view class='item acea-row row-between' v-if="orderInfo.delivery_type === 'express'">
					<view>快递单号：</view>
					<view class='conter'>{{orderInfo.delivery_id}}</view>
				</view>
				<view class='item acea-row row-between' v-if="orderInfo.delivery_type === 'express'">
					<view>快递公司：</view>
					<view class='conter'>{{orderInfo.delivery_name}}</view>
				</view>
				<view class='item acea-row row-between' v-if="orderInfo.delivery_type === 'send'">
					<view>送货人电话：</view>
					<view class='conter'>{{orderInfo.delivery_id}}</view>
				</view>
				<view class='item acea-row row-between' v-if="orderInfo.delivery_type === 'send'">
					<view>配送人姓名：</view>
					<view class='conter'>{{orderInfo.delivery_name}}</view>
				</view>
			</view>
			<view style='height:120rpx;'></view>
			<view v-if="orderInfo.status==1 || orderInfo.status==3" class='footer acea-row row-right row-middle'>
				<navigator class='bnt cancel' hover-class='none'
					v-if="orderInfo.status==1 && orderInfo.delivery_id && orderInfo.delivery_type == 1"
					:url="'/pages/users/goods_logistics/index?orderId='+ orderInfo.order_id">查看物流
				</navigator>
				<view v-if="orderInfo.status == 3 && orderInfo.paid == 1" class="bnt cancel" @click="delOrder(orderInfo.order_id)">删除</view>
				<view class='bnt bg-colort' v-if="orderInfo.status==1 && orderInfo.paid==1" @click='confirmOrder'>确认收货</view>	
			</view>
			<view v-else-if="orderInfo.status==0 && orderInfo.paid==0" class='footer acea-row row-right row-middle'>
				<view class='bnt bg-colort' @click='pay_open()'>立即付款</view>
			</view>
		</view>
		<!-- #ifdef MP -->
		<authorize v-if="isShowAuth" @authColse="authColse" @onLoadFun="onLoadFun"></authorize>
		<!-- #endif -->
		<payment :payMode='payMode' :pay_close="pay_close" :returnUrl="'/pages/points_mall/integral_order_details?order_id='+order_id" @onChangeFun='onChangeFun' :order_id="pay_order_id" :totalPrice='totalPrice'></payment>
	</view>
</template>

<script>
	import { integralOrderDetail, integralOrderDelete, integralOrderTake } from '@/api/points_mall.js';
	import { openOrderRefundSubscribe } from '@/utils/SubscribeMessage.js';
	import { HTTP_REQUEST_URL } from '@/config/app';
	import { getUserInfo } from '@/api/user.js';
	import orderGoods from "@/components/orderGoods";
	import ClipboardJS from "@/plugin/clipboard/clipboard.js";
	import payment from '@/components/payment';
	import { configMap } from "@/utils";
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	export default {
		components: {
			orderGoods,
			payment
		},
		data() {
			return {
				order_id: '',
				evaluate: 0,
				
				orderInfo: {
					
				}, //订单详情
				isGoodsReturn: false, //是否为退款订单
				status: {}, //订单底部按钮状态
				isClose: false,
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
					},
				],
				pay_close: false,
				pay_order_id: '',
				totalPrice: '0',
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				routineContact: '0',
				domain: HTTP_REQUEST_URL,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
			};
		},
		watch: {
			alipay_open(n){
				this.payMode[1].payStatus = n
			},
			yue_pay_status(n){
				this.payMode[2].payStatus = n
			}
		},
		computed: {
			...mapGetters(['isLogin','viewColor']),
			...configMap(['alipay_open', 'yue_pay_status']),
		},
		onLoad: function(options) {
			if (options.order_id) {
				this.$set(this, 'order_id', options.order_id);
			}
		},
		onShow() {
			uni.removeStorageSync('form_type_cart');
			if (this.isLogin) {
				this.getOrderInfo();
				this.getUserInfo();
			} else {
				//#ifndef MP
				toLogin();
				//#endif
				//#ifdef MP
				this.isShowAuth = true;
				//#endif
			}
		},
		onHide: function() {
			this.isClose = true;
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
		methods: {
			/**
			 * 登录授权回调
			 * 
			 */
			onLoadFun: function() {
				this.getOrderInfo();
				this.getUserInfo();
				this.isShowAuth = false;
			},
			// 授权关闭
			authColse: function(e) {
			  this.isShowAuth = e
			},
			openSubcribe: function(e) {
				let page = e;
				uni.showLoading({
					title: '正在加载',
				})
				openOrderRefundSubscribe().then(res => {
					uni.hideLoading();
					uni.navigateTo({
						url: page,
					});
				}).catch(() => {
					uni.hideLoading();
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
			 * 打开支付组件
			 *
			 */
			pay_open: function() {
				this.pay_close = true;
				this.pay_order_id = this.orderInfo.group_order_id.toString();
				this.totalPrice = this.orderInfo.pay_price;
			},
			/**
			 * 支付成功回调
			 *
			 */
			pay_complete: function() {
				this.pay_close = false;
				this.pay_order_id = '';
				uni.redirectTo({
					url:'/pages/users/order_list/index?status=1'
				})
			},
			/**
			 * 支付失败回调
			 *
			 */
			pay_fail: function() {
				this.pay_close = false;
				this.pay_order_id = '';
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
				})
			},
			/**
			 * 获取订单详细信息
			 * 
			 */
			getOrderInfo: function() {
				let that = this;
				uni.showLoading({
					title: "正在加载中"
				});
				integralOrderDetail(this.order_id).then(res => {
					uni.hideLoading();
					that.$set(that, 'orderInfo', res.data);
				}).catch(err => {
					uni.hideLoading();
					that.$util.Tips({
						title: err
					}, '/pages/points_mall/exchange_record');
				});
			},
			/**
			 * 
			 * 剪切订单号
			 */
			// #ifndef H5
			copy: function() {
				let that = this;
				uni.setClipboardData({
					data: that.orderInfo.order_sn,
					success: function(res){
					}
				
				});
			},
			// #endif
			/**
			 * 去商品详情
			 */
			jumpCon: function(item) {
				uni.navigateTo({
					url: '/pages/points_mall/integral_goods_details?id=' + item.cart_info.product.product_id
				})
			},	
			confirmOrder: function() {
				let that = this;
				uni.showModal({
					title: '确认收货',
					content: '是否确认收获？',
					success: function(res) {
						if (res.confirm) {
							integralOrderTake(that.order_id
							).then(res => {
								return that.$util.Tips({
									title: '操作成功',
									icon: 'success'
								}, function() {
									that.getOrderInfo();
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
			/**
			 * 删除订单
			 */
			delOrder: function(order_id) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定删除该记录吗？',
					success: function (res) {
						if (res.confirm) {
							integralOrderDelete(order_id).then(res=>{
								return that.$util.Tips({
									title: '删除成功',
									icon: 'success'
								}, {
									tab: 3,
									url: 1
								});
							}).catch(err => {
								return that.$util.Tips({
									title: err
								});
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.order-details .header {
		padding: 0 30rpx;
		height: 150rpx;
		background-image: linear-gradient(90deg, var(--view-bntColor21) 0%,var(--view-bntColor22) 100%);
	}
	.order-details .header .pictrue {
		width: 110rpx;
		height: 110rpx;
	}
	.order-details .header .pictrue image {
		width: 100%;
		height: 100%;
	}
	.order-details .header .data {
		color: rgba(255, 255, 255, 0.8);
		font-size: 24rpx;
		margin-left: 27rpx;
	}

	.order-details .header .data .state {
		font-size: 30rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 7rpx;
	}
	.qs-btn {
		width: auto;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50rpx;
		color: #fff;
		font-size: 27rpx;
		padding: 0 3%;
		color: #aaa;
		border: 1px solid #ddd;
		margin-right: 20rpx;
	}
	.goodCall {
		color: #e93323;
		text-align: center;
		width: 100%;
		height: 86rpx;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 30rpx;
		line-height: 86rpx;
		background: #fff;
		.icon-kefu {
			font-size: 36rpx;
			margin-right: 15rpx;
		}
		/* #ifdef MP */
		button {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 86rpx;
			font-size: 30rpx;
			color: #e93323;
		}
		/* #endif */
	}
	.order-details .header {
		padding: 0 30rpx;
		height: 150rpx;
	}
	.order-details .header.on {
		background-color: #666 !important;
	}
	.order-details .header .pictrue {
		width: 110rpx;
		height: 110rpx;
	}
	.order-details .header .pictrue image {
		width: 100%;
		height: 100%;
	}
	.order-details .header .data {
		color: rgba(255, 255, 255, 0.8);
		font-size: 24rpx;
		margin-left: 27rpx;
	}
	.order-details .header .data.on {
		margin-left: 0;
	}
	.order-details .header .data .state {
		font-size: 30rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 7rpx;
	}
	.order-details .header .data .time {
		margin-left: 20rpx;
	}
	.order-details .nav {
		background-color: #fff;
		font-size: 26rpx;
		color: #282828;
		padding: 25rpx 0;
	}
	.order-details .nav .navCon {
		padding: 0 40rpx;
	}
	.order-details .nav .on {
		color: #e93323;
	}
	.order-details .nav .progress {
		padding: 0 65rpx;
		margin-top: 10rpx;
	}
	.order-details .nav .progress .line {
		width: 100rpx;
		height: 2rpx;
		background-color: #939390;
	}
	.order-details .nav .progress .iconfont {
		font-size: 25rpx;
		color: #939390;
		margin-top: -2rpx;
	}
	.order-details .address {
		font-size: 26rpx;
		color: #868686;
		background-color: #fff;
		padding: 35rpx 30rpx;
	}
	.order-details .address .name {
		font-size: 30rpx;
		color: #282828;
		margin-bottom: 15rpx;
	}
	.order-details .address .name .phone {
		margin-left: 40rpx;
	}
	.order-details .line {
		width: 100%;
		height: 3rpx;
	}
	.order-details .line image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.order-details .wrapper {
		background-color: #fff;
		margin-top: 12rpx;
		padding: 30rpx;
	}
	.order-details .wrapper .item {
		font-size: 28rpx;
		color: #282828;
	}
	.order-details .wrapper .item~.item {
		margin-top: 20rpx;
	}
	.order-details .wrapper .item .conter {
		color: #868686;
		width: 460rpx;
		text-align: right;
	}
	.order-details .wrapper .item .conter .copy {
		font-size: 20rpx;
		color: #333;
		border-radius: 17rpx;
		border: 1rpx solid #666;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 70rpx;
		height: 36rpx;
		margin-left: 24rpx;
	}
	.order-details .wrapper .actualPay {
		border-top: 1rpx solid #eee;
		margin-top: 30rpx;
		padding-top: 30rpx;
	}
	.order-details .wrapper .actualPay .money {
		font-weight: bold;
		font-size: 30rpx;		
	}
	.order-details .footer {
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	.order-details .footer .bnt {
		width: 150rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50rpx;
		color: #fff;
		font-size: 27rpx;
	}
	.order-details .footer .bnt.cancel {
		color: #aaa;
		border: 1rpx solid #ddd;
	}
	.order-details .footer .bnt~.bnt {
		margin-left: 18rpx;
	}
	.order-details .footer .bg-colort {
		background-color: var(--view-theme);
	}
	.order-details .writeOff {
		background-color: #fff;
		margin-top: 13rpx;
		padding-bottom: 30rpx;
	}
	.order-details .writeOff .title {
		font-size: 30rpx;
		color: #282828;
		height: 87rpx;
		border-bottom: 1px solid #f0f0f0;
		padding: 0 30rpx;
		line-height: 87rpx;
	}
	.order-details .writeOff .grayBg {
		background-color: #f2f5f7;
		width: 590rpx;
		height: 384rpx;
		border-radius: 20rpx 20rpx 0 0;
		margin: 50rpx auto 0 auto;
		padding-top: 55rpx;
		position: relative;
	}
	.order-details .writeOff .grayBg .written {
		position: absolute;
		top: 0;
		right: 0;
		width: 60rpx;
		height: 60rpx;
	}
	.order-details .writeOff .grayBg .written image {
		width: 100%;
		height: 100%;
	}
	.order-details .writeOff .grayBg .pictrue {
		width: 290rpx;
		height: 290rpx;
		margin: 0 auto;
	}
	.order-details .writeOff .grayBg .pictrue image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.order-details .writeOff .gear {
		width: 590rpx;
		height: 30rpx;
		margin: 0 auto;
	}
	.order-details .writeOff .gear image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.order-details .writeOff .num {
		background-color: #f0c34c;
		width: 590rpx;
		height: 84rpx;
		color: #282828;
		font-size: 48rpx;
		margin: 0 auto;
		border-radius: 0 0 20rpx 20rpx;
		text-align: center;
		padding-top: 4rpx;
	}
	.order-details .writeOff .rules {
		margin: 46rpx 30rpx 0 30rpx;
		border-top: 1px solid #f0f0f0;
		padding-top: 10rpx;
	}
	.order-details .writeOff .rules .item {
		margin-top: 20rpx;
	}
	.order-details .writeOff .rules .item .rulesTitle {
		font-size: 28rpx;
		color: #282828;
	}
	.order-details .writeOff .rules .item .rulesTitle .iconfont {
		font-size: 30rpx;
		color: #333;
		margin-right: 8rpx;
		margin-top: 5rpx;
	}
	.order-details .writeOff .rules .item .info {
		font-size: 28rpx;
		color: #999;
		margin-top: 7rpx;
	}
	.order-details .writeOff .rules .item .info .time {
		margin-left: 20rpx;
	}
	.order-details .map {
		height: 86rpx;
		font-size: 30rpx;
		color: #282828;
		line-height: 86rpx;
		border-bottom: 1px solid #f0f0f0;
		margin-top: 13rpx;
		background-color: #fff;
		padding: 0 30rpx;
	}
	.order-details .map .place {
		font-size: 26rpx;
		width: 176rpx;
		height: 50rpx;
		border-radius: 25rpx;
		line-height: 50rpx;
		text-align: center;
	}
	.order-details .map .place .iconfont {
		font-size: 27rpx;
		height: 27rpx;
		line-height: 27rpx;
		margin: 2rpx 3rpx 0 0;
	}
	.order-details .address .name .iconfont {
		font-size: 34rpx;
		margin-left: 10rpx;
	}
	.refund {
		padding: 0 30rpx 30rpx;
		margin-top: 24rpx;
		background-color: #fff;
		.title {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			color: #333;
			height: 86rpx;
			border-bottom: 1px solid #f5f5f5;
			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
		}
		.con {
			padding-top: 25rpx;
			font-size: 28rpx;
			color: #868686;
		}
	}
	.orderGoods {
		background-color: #fff;
		margin-top: 12rpx;
		&.on{
			margin-top: 0;
		}
	}
	.orderGoods .total {
		width: 100%;
		height: 86rpx;
		padding: 0 30rpx;
		border-bottom: 2rpx solid #f0f0f0;
		font-size: 30rpx;
		color: #282828;
		line-height: 86rpx;
		box-sizing: border-box;
	}
	.goodWrapper .item .text .money{
		color: var(--view-theme);
	}
</style>
