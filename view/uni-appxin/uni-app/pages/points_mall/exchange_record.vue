<template>
	<view :style="viewColor">
		<view v-if="exchangeList.length>0">
			<view class="exchange-record">
				<view v-for="(item,index) in exchangeList" :key="index">
					<view class="item" v-for="(itm, idx) in item.orderProduct" :key="idx">
						<view class="exchange_record-time">
							<view>
								{{item.paid == 1 ? '兑换时间：'+item.pay_time : '订单编号：'+item.order_sn}}
							</view>
							<view v-if="item.paid == 0" class="status">
								待付款
							</view>
							<view v-else class="status">
								{{item.status == 0 ? '待发货' : item.status == 1 ? '待收货' : '已完成'}}
							</view>
						</view>
						<view v-if="itm.cart_info" class="picTxt acea-row row-between-wrapper">
							<view class="pictrue">
								<image :src="itm.cart_info.productAttr ? itm.cart_info.productAttr.image : itm.cart_info.product.image" />
							</view>
							<view class="text acea-row row-column-around">
								<view class="line1" style="width: 100%;">{{ itm.cart_info.product.store_name }}</view>
								<view class="line1 gray-sty">{{itm.cart_info.productAttr&&itm.cart_info.productAttr.sku || '默认'}}</view>
							</view>
						</view>
						<view class="bottom acea-row row-between-wrapper">
							<view class="end"></view>
							<view class="acea-row row-middle row-right">
								<view v-if="item.paid == 0" class='bnt bg-colort' @click='goPay(item)'>立即付款</view>
								<view class="bnt cancel" v-if="(item.status == 2 || item.status == 1) && item.delivery_type == 1"
									@click="getLogistics(item.order_id)">
									查看物流
								</view>
								<view v-if="item.status == 3 && item.paid == 1" class="bnt cancel" @click="delOrder(item.order_id,index,idx)">删除</view>
								<view v-if="item.paid == 1" class="bnt bg-colort" @click="goDetail(item.order_id)">
									查看详情
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="isLogin" :hidden="!loading" class="acea-row row-center-wrapper loadingicon">
			<text :hidden="!loading" class="iconfont icon-jiazai loading"></text>
			{{loadTitle}}
		</view>
		<block v-if="exchangeList.length == 0 && !loading">
			<emptyPage title="暂无兑换记录～"></emptyPage>
		</block>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<payment :payMode='payMode' :order_type="2" :pay_close="pay_close" :returnUrl="'/pages/points_mall/integral_order_details?order_id='+order_id" @onChangeFun='onChangeFun' :order_id="pay_order_id" :totalPrice='totalPrice'></payment>
	</view>
</template>
<script>
	import emptyPage from '@/components/emptyPage.vue';
	import { mapGetters } from 'vuex';
	import { integralOrderList, integralOrderDelete } from "@/api/points_mall.js";	
	import { getUserInfo } from "@/api/user.js";	
	import payment from '@/components/payment';
	import authorize from '@/components/Authorize';
	import { configMap } from '@/utils';
	export default {
		name: "exchangeRecord",
		components: {
			emptyPage,
			payment,
			authorize
		},
		props: {},
		data: function() {
			return {
				exchangeList: [],
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
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				loadend: false,
				loading: false,
				loadTitle: '加载更多',
				page: 1, //页码
				limit: 20, //数量
				userInfo: {},
				pay_close: false,
				pay_order_id: '',
				order_id: '',
				totalPrice: '0',
				delta: 1,
			};
		},
		computed: {
			...mapGetters(['isLogin','viewColor']),
			...configMap(['alipay_open', 'yue_pay_status']),
		},
		watch: {
			alipay_open(n){
				this.payMode[1].payStatus = n
			},
			yue_pay_status(n){
				this.payMode[2].payStatus = n
			}
		},
		onLoad: function(option) {
			this.delta = option.delta || 0;
		},
		onUnload: function(){
			// uni.navigateBack({
			//   delta: this.delta
			// })
		},
		onShow(){
			if (this.isLogin === false) {
				this.isAuto = true;
				this.isShowAuth = true
			} else {
				this.getIntegralOrderList();
				this.getUserInfo();
			}
		},
		methods: {
			goDetail: function(id) {
				uni.navigateTo({
					url: `/pages/points_mall/integral_order_details?order_id=${id}`
				})
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
			onLoadFun() {
				this.isShowAuth = false;
				this.getIntegralOrderList();
				this.getUserInfo();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			getIntegralOrderList: function() {
				var that = this;
				if (that.loadend) return;
				if (that.loading) return;
				that.loading = true;
				that.loadTitle = '';
				integralOrderList({
					page: that.page,
					limit: that.limit
				})
				.then(res => {
					let loadend = res.data.list.length < that.limit;
					that.loadend = loadend;
					that.loading = false;
					that.loadTitle = loadend ? '已全部加载' : '加载更多';
					that.exchangeList.push.apply(that.exchangeList, res.data.list);
					that.page++;
				})
				.catch(res => {
					that.$util.Tips({
						title: res
					})
				});
			},
			/**
			 * 打开支付组件
			 *
			 */
			goPay: function(item) {
				this.$set(this, 'pay_close', true);
				this.order_id = item.order_id;
				this.pay_order_id = item.group_order_id.toString()
				this.$set(this, 'totalPrice', item.pay_price);
			},
			/**
			 * 支付成功回调
			 *
			 */
			pay_complete: function() {
				this.loadend = false;
				this.page = 1;
				this.$set(this, 'exchangeList', []);
				this.pay_close = false;
				this.pay_order_id = '';
				this.getIntegralOrderList();
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
			 * 关闭支付弹窗
			 *
			 */
			payClose: function() {
				this.$set(this, 'pay_close', false);
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
			 * 去订单详情
			 */
			goOrderDetails: function(order_id) {
				let self = this
				if (!order_id) return that.$util.Tips({
					title: '缺少订单号无法查看订单详情'
				});
				uni.navigateTo({
					url: '/pages/points_mall/integral_order_details?order_id=' + order_id
				})
			},
			/*查看物流*/
			getLogistics(order_id) {
				uni.navigateTo({
					url: `/pages/users/goods_logistics/index?orderId=${order_id}`
				})
			},
			/**
			 * 删除订单
			 */
			delOrder: function(order_id, index, idx) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定删除该记录吗？',
					success: function (res) {
						if (res.confirm) {
							integralOrderDelete(order_id).then(res=>{
								that.exchangeList[index]['orderProduct'].splice(idx,1);
								that.$util.Tips({
									title: '删除成功'
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
		},
		onReachBottom() {
			this.getIntegralOrderList();
		}
	};
</script>

<style lang="scss">
	.exchange-record .item {
		background-color: #fff;
		margin: 10rpx 30rpx;
		border-radius: 6rpx;
		.exchange_record-time {
			color: #333333;
			border-bottom: 1px solid #EEEEEE;
			padding: 22rpx 30rpx;
			display: flex;
			justify-content: space-between;
			.status {
				color: var(--view-theme);
			}
		}
	}
	.exchange-record .item .picTxt {
		border-bottom: 1px solid #f0f0f0;
		padding: 30rpx 30upx;
	}

	.exchange-record .item .picTxt .pictrue {
		width: 120rpx;
		height: 120rpx;
	}

	.exchange-record .item .picTxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6upx;
	}

	.exchange-record .item .picTxt .text {
		width: 470upx;
		font-size: 30upx;
		color: #282828;
	}

	.exchange-record .item .picTxt .text .time {
		font-size: 24upx;
		color: #868686;
		justify-content: left !important;
	}

	.exchange-record .item .picTxt .text .successTxt {
		font-size: 24rpx;
	}

	.exchange-record .item .picTxt .text .endTxt {
		font-size: 24rpx;
		color: #999;
	}

	.exchange-record .item .picTxt .text .money {
		font-size: 24upx;
	}

	.exchange-record .item .picTxt .text .money .num {
		font-size: 32upx;
		font-weight: bold;
	}

	.exchange-record .item .picTxt .text .money .symbol {
		font-weight: bold;
	}

	.exchange-record .item .bottom {
		height: 100upx;
		padding: 0 30upx;
		font-size: 27upx;
	}

	.exchange-record .item .bottom .purple {
		color: #f78513;
	}

	.exchange-record .item .bottom .end {
		color: #999;
	}

	.exchange-record .item .bottom .success {
		color: #e93323;
	}

	.exchange-record .item .bottom .bnt {
		font-size: 27upx;
		color: #fff;
		width: 176upx;
		height: 60upx;
		border-radius: 32upx;
		text-align: center;
		line-height: 60upx;
	}
	.exchange-record .item .bottom .bnt.cancel {
		color: #aaa;
		border: 1px solid #ddd;
	}
	.exchange-record .item .bottom .bnt~.bnt {
		margin-left: 18upx;
	}
	.exchange-record .item .bottom .bg-colort {
		background-color: var(--view-theme);
	}
	.gray-sty {
		width: 100%;
		font-size: 24rpx;
		color: #999999;
	}
</style>
