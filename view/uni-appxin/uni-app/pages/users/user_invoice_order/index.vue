<template>
	<view :style="viewColor">
		<view class='order-details'>
			<view>
				<view class='header acea-row row-middle' :class='isGoodsReturn ? "on":""'>
					<view class='pictrue' v-if="isGoodsReturn==false">
						<i class="iconfont icon-fapiao fapiao"></i>
					</view>
					<view class='data'>
						<view class='state'>
							<block v-if="orderData.status == 1">已开票</block>
							<block v-else>未开票</block>
						</view>
						<view>申请时间：{{orderData.create_time}}</view>
					</view>
				</view>
				<view class='wrapper'>
					<view class='item acea-row row-between'>
						<view>发票类型：</view>
						<view class='conter'>{{receipt_info.receipt_type == 1 ? '普通发票' : '专用发票'}}</view>
					</view>
					<view v-if="receipt_info.receipt_title_type == 2" class='item acea-row row-between'>
						<view>发票内容：</view>
						<view class='conter'>{{receipt_info.duty_paragraph}}</view>
					</view>
					<view class='item acea-row row-between'>
						<view>抬头类型：</view>
						<view class='conter'>{{receipt_info.receipt_title_type == 1 ? '个人' : '企业'}}</view>
					</view>
					<view class='item acea-row row-between'>
						<view>抬头名称：</view>
						<view class='conter'>{{receipt_info.receipt_title}}</view>
					</view>
					<view v-if="orderData.status == 1" class='item acea-row row-between'>
						<view>开票时间：</view>
						<view class='conter'>{{orderData.status_time}}</view>
					</view>
					<view class='item acea-row row-between'>
						<view>申请时间：</view>
						<view class='conter'>{{orderData.create_time}}</view>
					</view>
				</view>

				<block v-if="cartInfo.length>0">
					<invoiceGoods :orderData='orderInfo' :evaluate='orderInfo.status' :activityType='orderInfo.activity_type' :orderId="order_id" :cartInfo="cartInfo" :jump="true"></invoiceGoods>
				</block>
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
					<view class='conter'>已支付</view>
				</view>
				<view class='item acea-row row-between' v-if="orderInfo.pay_time">
					<view>支付时间：</view>
					<view class='conter'>{{orderInfo.pay_time}}</view>
				</view>
				<view class='item acea-row row-between'>
					<view>商品总额：</view>
					<view class='conter'>￥{{orderInfo.total_price}}</view>
				</view>
				<view class='item acea-row row-between'>
					<view>实际支付：</view>
					<view class='conter'>￥{{orderInfo.pay_price}}</view>
				</view>
				<view v-if="orderInfo.coupon_price > 0" class='item acea-row row-between'>
					<view>优惠券抵扣：</view>
					<view class='conter'>￥{{orderInfo.coupon_price}}</view>
				</view>
				<view v-if="orderInfo.integral_price > 0" class='item acea-row row-between'>
					<view>积分抵扣：</view>
					<view class='conter'>￥{{orderInfo.integral_price}}</view>
				</view>
				<view class='item acea-row row-between'>
					<view>支付方式：</view>
					<view class='conter' v-if="orderInfo.pay_type==0">余额支付</view>
					<view class='conter' v-if="orderInfo.pay_type==4 || orderInfo.pay_type==5">支付宝支付</view>
					<view class='conter' v-if="orderInfo.pay_type==1 || orderInfo.pay_type==2 || orderInfo.pay_type==3">微信支付</view>
				</view>
				<view class='item acea-row row-between' v-if="orderInfo.mark">
					<view>买家留言：</view>
					<view class='conter'>{{orderInfo.mark}}</view>
				</view>
			</view>
			<view style='height:120rpx;'></view>
			<view class='footer acea-row row-right row-middle'>
				<view class=" acea-row row-right row-middle">

					<view v-if="orderData.merchant && orderData.merchant.services_type == 1" class="bnt cancel" @click="call">
						联系客服
					</view>

					<view v-else class="bnt cancel" @click.stop="goGoodCall">联系客服</view>
				</view>
			</view>
		</view>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
	</view>
</template>
<style scoped lang="scss">
	.merchant {
		width: 100%;
		height: 86rpx;
		padding: 0 30rpx;
		margin-top: 15rpx;
		border-bottom: 2rpx solid #f0f0f0;
		font-size: 30rpx;
		color: #282828;
		line-height: 86rpx;
		box-sizing: border-box;
		background-color: #fff;
		.iconfont {
			margin-top: 6rpx;
			font-size: 22rpx;
		}
	}
	.goodCall {
		text-align: center;
		width: 100%;
		height: 86rpx;
		padding: 0 30rpx;
		border-bottom: 1px solid #eee;
		font-size: 30rpx;
		line-height: 86rpx;
		background: #fff;
		color: #282828;
		.icon-kefu {
			font-size: 28rpx;
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
		background-image: linear-gradient(-90deg, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
		&.presell_header{
			background-image: url('data:image/jpg;base64,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');
			background-repeat: no-repeat;
			background-size: cover;
			padding: 35rpx 50rpx;
			.data{
				margin: 8rpx 0 0 13rpx;
				.state{
					font-weight: normal;
					font-size: 24rpx;
				}
			}
		}
	}
	.order-details .header.on {
		background-color: #666 !important;
	}
	.order-details .header .pictrue {
		width: 110rpx;
		height: 110rpx;
	}
	.order-details .header .pictrue .fapiao {
		width: 100%;
		height: 100%;
		color: #fff;
		font-size: 80rpx
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
	.presell_header .presell_payment{
		color: #fff;
		font-size: 30rpx;
		font-weight: bold;
		.iconfont{
			font-weight: normal;
			margin-right: 8rpx;
		}
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
		margin-top: 13rpx;
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
		border: 1px solid #666;
		padding: 3rpx 15rpx;
		margin-left: 24rpx;
	}
	.order-details .wrapper .actualPay {
		border-top: 1px solid #eee;
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
		width: 176rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50rpx;
		color: #fff;
		font-size: 27rpx;
		margin-left: 20rpx;
		&.btn_auto{
			width: auto;
			padding: 0 40rpx;
		}
	}
	.order-details .footer .bnt.cancel {
		color: #aaa;
		border: 1px solid #ddd;
	}
	.order-details .footer .bnt~.bnt {
		margin-left: 18rpx;
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
</style>

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
	import { HTTP_REQUEST_URL } from '@/config/app';
	import {
		getOrderDetail,
		orderAgain,
		orderTake,
		orderDel,
		unOrderCancel,
		verifyCode,
		getReceiptOrder
	} from '@/api/order.js';
	import {
		openOrderRefundSubscribe
	} from '@/utils/SubscribeMessage.js';

	import invoiceGoods from "@/components/invoiceGoods";
	import ClipboardJS from "@/plugin/clipboard/clipboard.js";
	import { mapGetters } from "vuex";
	import authorize from '@/components/Authorize';
	export default {
		components: {
			invoiceGoods,
			authorize
		},
		data() {
			return {
				order_id: '',
				invoice_id: '',
				evaluate: 0,
				activityType: 0,
				cartInfo: [], //购物车产品
				orderInfo: {
					system_store: {},
					_status: {},
					take: {}
				}, //订单详情
				orderData: {},
				system_store: {},
				isGoodsReturn: false, //是否为退款订单
				status: {}, //订单底部按钮状态
				isClose: false,
				pay_close: false,
				pay_order_id: '',
				totalPrice: '0',
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				refundNum: [], //退款个数临时数据
				imgUrl:HTTP_REQUEST_URL,
				codeUrl:'',
				isTimePay: false,
				receipt_info: {},
			};
		},
		computed:{
			...mapGetters(['isLogin','uid','viewColor']),
		},
		filters:{
			filterDay(val){
				if(val){
					var reg =/(\d{4})\-(\d{2})\-(\d{2})/;
					var date = val.replace(reg,"$2月$3日");
					return date
				}
			}
		},
		onLoad: function(options) {
			if (options.order_id) {
				this.$set(this, 'order_id', options.order_id);
			}
			if (options.invoice_id) {
				this.$set(this, 'invoice_id', options.invoice_id);
			}
		},
		onShow() {
			if (this.isLogin) {
				this.getOrderInfo();
			} else {
                this.isAuto = true;
                this.isShowAuth = true
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
			call: function(){
				uni.makePhoneCall({
					phoneNumber: this.orderData.merchant.service_phone
				})
			},
			// 联系客服
			goGoodCall() {
				let self = this
				uni.navigateTo({
					url: `/pages/chat/customer_list/chat?mer_id=${self.orderInfo.mer_id}&uid=${this.uid}&order_id=${self.orderInfo.order_id}`
				})
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
			 * 拨打电话
			 */
			makePhone: function() {
				uni.makePhoneCall({
					phoneNumber: this.orderInfo.take.mer_take_phone
				})
			},

			/**
			 * 关闭支付组件
			 *
			 */
			payClose: function() {
				this.pay_close = false;
			},
			/**
			 * 登录授权回调
			 *
			 */
			onLoadFun: function() {
				this.isShowAuth = false;
				this.getOrderInfo();
			},
            // 授权关闭
            authColse: function(e) {
                this.isShowAuth = e;
            },
			getOrderCode(){
				verifyCode(this.order_id).then(res=>{
					this.codeUrl = res.data.qrcode
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
				getReceiptOrder(this.invoice_id).then(res => {
					// let _type = res.data._status._type;
					uni.hideLoading();
					that.$set(that, 'orderData', res.data);
					that.$set(that, 'orderInfo', res.data.storeOrder);
					that.$set(that, 'receipt_info', res.data.receipt_info);
					that.orderInfo.take = res.data.take ? res.data.take: {}
					that.$set(that, 'cartInfo', res.data.storeOrder.orderProduct);
					if (this.orderInfo.status == '-1') {
						this.isGoodsReturn = true;
					}
				}).catch(err => {
					uni.hideLoading();
					that.$util.Tips({
						title: err
					}, '/pages/users/order_list/index');
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
		}
	}
</script>

<style>
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
</style>
