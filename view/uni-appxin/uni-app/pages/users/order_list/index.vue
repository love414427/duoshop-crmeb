<template>
	<view :style="viewColor">
		<view class='my-order'>
			<view class='header'>
				<view class='picTxt acea-row row-between-wrapper'>
					<view class='text'>
						<view class='name'>订单信息</view>
						<view>消费订单：{{orderData.orderCount || 0}} 总消费：￥{{orderData.orderPrice || 0}}</view>
					</view>
					<view class='pictrue'>
						<image :src="`${domain}/static/images/orderTime.png`"></image>
					</view>
				</view>
			</view>
			<navigator class="search acea-row row-middle" url="/pages/users/order_list/search" hover-class="none">
				<text class="iconfont icon-sousuo"></text>
				搜索我的订单
			</navigator>
			<view class='nav acea-row row-around'>
				<view class='item' :class='orderStatus==-1 ? "on": ""' @click="statusClick(-1)">
					<view>全部</view>
					<view class='num'>{{orderData.all || 0}}</view>
				</view>
				<view class='item' :class='orderStatus==0 ? "on": ""' @click="statusClick(0)">
					<view>待付款</view>
					<view class='num'>{{orderData.noPay || 0}}</view>
				</view>
				<view class='item' :class='orderStatus==1 ? "on": ""' @click="statusClick(1)">
					<view>待发货</view>
					<view class='num'>{{orderData.noPostage || 0}}</view>
				</view>
				<view class='item' :class='orderStatus==2 ? "on": ""' @click="statusClick(2)">
					<view>待收货</view>
					<view class='num '>{{orderData.noDeliver || 0}}</view>
				</view>
				<view class='item' :class='orderStatus==3 ? "on": ""' @click="statusClick(3)">
					<view>待评价</view>
					<view class='num'>{{orderData.noComment || 0}}</view>
				</view>
			</view>
			<!--定金预售订单-->
			<view v-if="presellProList.length > 0" class="event_container">
				<navigator class="acea-row row-between" url="/pages/users/presell_order_list/index" hover-class='none' >
					<view class="info">
						<view class="title">预售尾款订单转到这里了！</view>
						<view class="desc">有 <text class="t-color">{{ presellOrderCount }}</text> 笔预售尾款订单待付款，请点击查看</view>
					</view>
					<view class="photo acea-row row-between">
						<view class='picture'>
							<image :src='(presellProList[0].orderProduct[0].cart_info.productAttr && presellProList[0].orderProduct[0].cart_info.productAttr.image) || presellProList[0].orderProduct[0].cart_info.product.image'></image>
						</view>
						<view class="more_btn"><text class="iconfont icon-gengduo3"></text></view>
					</view>
				</navigator>
			</view>
			<view class='list'>
				<!-- 代付款 -->
				<view v-if="orderList.length > 0">
					<block v-if="orderStatus == 0">
						<view class='item' v-for="(item,index) in orderList" :key="index">
							<view @click='goOrderDetails(item.group_order_id)'>
								<view class='title acea-row row-between-wrapper'>
									<view class="acea-row row-middle left-wrapper">
										{{item.group_order_sn}}
									</view>
									<view class='t-color'>{{ item.orderList[0].activity_type === 2 && item.orderList[0].orderProduct[0].cart_info.productPresell.presell_type ==2 ? "待付定金" : "待付款" }}</view>
								</view>
								<view v-for="(order,j) in item.orderList" :key="order.order_id+j">
										<!--预售-->
										<view v-if="order.activity_type === 2">
											<block v-for="(goods,g) in order.orderProduct">
											<view  class='item-info acea-row row-between row-top'>
												<view class='pictrue'>
													<image :src='(goods.cart_info.productAttr && goods.cart_info.productAttr.image) || goods.cart_info.product.image'></image>
												</view>
												<view class='text acea-row row-between'>
													<view class='name line1'>
														<text class="event_name event_bg">预售</text><text>{{goods.cart_info.product.store_name}}</text>
														<view class="event_ship event_color">发货时间：
															<!--全款预售-->
															<text v-if="goods.cart_info.productPresell.presell_type === 1">
																{{ goods.cart_info.productPresell.delivery_type === 1 ? '支付成功后' : '预售结束后' }}{{ goods.cart_info.productPresell.delivery_day }}天内
															</text>
															<!--定金预售-->
															 <text v-if="goods.cart_info.productPresell.presell_type === 2">{{ goods.cart_info.productPresell.delivery_type === 1 ? '支付尾款后' : '预售结束后' }}{{ goods.cart_info.productPresell.delivery_day }}天内</text>
														</view>
													</view>
													<view class='money'>
														<view>￥{{goods.cart_info.productPresellAttr.presell_price}}</view>
														<view>x{{goods.product_num}}</view>
													</view>
												</view>
												<view v-if="goods.cart_info.productPresell.presell_type === 2" class="event_price">
													 定金待支付 <text class="t-color">￥{{ order.pay_price }}</text>
													尾款待支付 <text class="t-color">￥{{ order.presellOrder.pay_price }}</text>
												</view>
											</view>
											</block>
										</view>
									<view v-else>
										<block v-for="(goods,g) in order.orderProduct">
												<view class='item-info acea-row row-between row-top'>
													<view class='pictrue'>
														<image :src='(goods.cart_info.productAttr && goods.cart_info.productAttr.image) || goods.cart_info.product.image'></image>
													</view>
													<view class='text acea-row row-between'>
														<view class='name line2'>
															<text v-if="goods.product_type != 0 && goods.product_type != 10" :class="'font_bg-red type'+goods.product_type">{{goods.product_type == 1 ? "秒杀" : goods.product_type == 2 ? "预售" : goods.product_type == 3 ? "助力" : goods.product_type == 4 ? "拼团" : ""}}</text>
															{{goods.cart_info.product.store_name}}
														</view>
														<view class='money' v-if="item.orderList[0].activity_type == 4">
															<view v-if="goods.cart_info.activeSku">￥{{goods.cart_info.activeSku.active_price}}</view>
															<view>x{{goods.product_num}}</view>
														</view>
														<view v-else class='money'>
															<view>￥{{goods.cart_info.productAttr.price}}</view>
															<view>x{{goods.product_num}}</view>
														</view>
													</view>
												</view>	
											</block>
										</view>
								</view>
								<view class='totalPrice' v-if="item.orderList[0].activity_type !== 2">共{{item.total_num || 0}}件商品，总金额
									<text class='money p-color'>￥{{item.pay_price}}</text>
								</view>
								<view class='bottom acea-row row-right row-middle'>
									<view class='bnt b-color' @click.stop='goPay(item.pay_price,item.group_order_id)'>立即付款</view>
								</view>
							</view>
						</view>
					</block>
					<!-- 待发货 待收货 待评价 已完成 -->
					<block v-else>
						<view class='item' v-for="(item,index) in orderList" :key="index">
							<view @click='goOrderDetails(item.order_id)'>
								<view class='title acea-row row-between-wrapper'>
									<view class="acea-row row-middle left-wrapper" @click.stop="goMall(item)">
										<text class="iconfont icon-shangjiadingdan"></text>
										<view class="store-name">{{item.merchant.mer_name}}</view>
										<text class="iconfont icon-xiangyou"></text>
									</view>
									<view v-if="item.status == 0" class='t-color'>
										<text v-if="item.order_type==1">{{item.takeOrderCount > 0 ? '部分核销' : '待核销'}}</text>
										<text v-else>待发货</text>
									</view>
									<view v-if="item.status == 1" class='t-color'>待收货</view>
									<view v-if="item.status == 2" class='t-color'>待评价</view>
									<view v-if="item.status == 3" class='t-color'>已完成</view>
									<view v-if="item.status == -1" class='t-color'>已退款</view>
								</view>
								<view v-if="item.activity_type === 2">
									<view class='item-info acea-row row-between row-top' v-for="(goods,index) in item.orderProduct" :key="index">
										<view class='pictrue'>
											<image :src='(goods.cart_info.productAttr && goods.cart_info.productAttr.image) || goods.cart_info.product.image'></image>
										</view>
										<view class='text acea-row row-between'>
											<view class='name '>
												<view class='name' :class="item.status === 0 ? 'line1' : 'line2'">
													<text class="event_name event_bg">预售</text><text>{{goods.cart_info.product.store_name}}</text>
													<view v-if="item.status == 0" class="event_ship event_color">发货时间：
														<!--全款预售-->
														<text v-if="goods.cart_info.productPresell.presell_type === 1">{{ goods.cart_info.productPresell.delivery_type === 1 ? '支付成功后' : '预售结束后' }}{{ goods.cart_info.productPresell.delivery_day }}天内</text>
														<!--定金预售-->
														<text v-if="goods.cart_info.productPresell.presell_type === 2">{{ goods.cart_info.productPresell.delivery_type === 1 ? '支付尾款后' : '预售结束后' }}{{ goods.cart_info.productPresell.delivery_day }}天内</text>
													</view>
												</view>
												<view style="margin-top: 10rpx;" class="t-color">{{goods.is_refund==1?'退款中':goods.is_refund==2?'部分退款':goods.is_refund==3?'全部退款':''}}</view>
											</view>
											<view class='money'>
												<view>￥{{goods.cart_info.productPresellAttr.presell_price}}</view>
												<view>x{{goods.product_num}}</view>
											</view>
										</view>
									</view>
								</view>
								<view v-else>
									<view class='item-info acea-row row-between row-top' v-for="(goods,index) in item.orderProduct" :key="index">
										<view class='pictrue'>
											<image :src='(goods.cart_info.productAttr && goods.cart_info.productAttr.image) || goods.cart_info.product.image'></image>
										</view>
										<view class='text acea-row row-between'>
											<view class='name '>
												<view class='name line2'>
													<text v-if="goods.product_type != 0 && goods.product_type != 10" :class="'font_bg-red type'+goods.product_type">{{goods.product_type == 1 ? "秒杀" : goods.product_type == 2 ? "预售" : goods.product_type == 3 ? "助力" : goods.product_type == 4 ? "拼团" : ""}}</text>
													<text>{{goods.cart_info.product.store_name}}</text>
												</view>
												<view style="margin-top: 10rpx;" class="t-color">{{goods.is_refund==1?'退款中':goods.is_refund==2?'部分退款':goods.is_refund==3?'全部退款':''}}</view>
											</view>
											<view class='money' v-if="item.activity_type == 3">
												<view v-if="goods.cart_info.productAssistAttr">￥{{goods.cart_info.productAssistAttr.assist_price}}</view>
												<view>x{{goods.product_num}}</view>
											</view>
											<view class='money' v-else-if="item.activity_type == 4">
												<view v-if="goods.cart_info.activeSku">￥{{goods.cart_info.activeSku.active_price}}</view>
												<view>x{{goods.product_num}}</view>
											</view>
											<view class='money' v-else>
												<view>￥{{goods.cart_info.productAttr.price}}</view>
												<view>x{{goods.product_num}}</view>
											</view>
										</view>
									</view>
								</view>
								<view class='totalPrice' v-if="item.activity_type == 2">共{{item.orderNum || 0}}件商品，总金额
									<text class='money p-color'>￥{{item.presell_price}}</text>
								</view>
								<view class='totalPrice' v-else>共{{item.orderNum || 0}}件商品，总金额
									<text class='money p-color'>￥{{item.pay_price}}</text>
								</view>
							</view>
							<view class='bottom acea-row row-right row-middle'>
								<view v-if="!item.receipt && item.status != -1 && item.open_receipt == 1" class='bnt cancelBnt' @click.stop='applyInvoice(item.order_id)'>申请开票</view>
								<block v-if="item.status == 0 || item.status == 9 || item.status == -1">
									<view class='bnt b-color' @click='goOrderDetails(item.order_id)'>查看详情</view>
								</block>
								<block v-if="item.status == 1">
									<view class='bnt cancelBnt' v-if="item.delivery_type == 1 || item.delivery_type == 2" @click='goOrderDetails(item.order_id)'>查看物流</view>
									<view class='bnt b-color' @tap='confirmOrder(item,index)'>确认收货</view>
								</block>
								<block v-if="item.status == 2">
									<navigator v-if="community_status == 1 && !item.community_id" :url="'/pages/plantGrass/plant_release/index?order_id='+item.order_id" class='bnt colorBnt' hover-class="none">
										<text class="iconfont icon-fabu"></text>
										发布种草
									</navigator>
									<view class='bnt b-color' @click='goOrderDetails_Evaluation(item.order_id)'>去评价</view>
								</block>
								<block v-if="item.status == 3">
									<view class='bnt b-color' @click='goOrderDetails(item.order_id)' v-if="item.activity_type == 2 || item.activity_type == 3 || item.activity_type == 10">查看详情</view>
									<navigator v-if="community_status == 1 && !item.community_id" :url="'/pages/plantGrass/plant_release/index?order_id='+item.order_id" class='bnt colorBnt' hover-class="none">
										<text class="iconfont icon-fabu"></text>
										发布种草
									</navigator>
									<view class='bnt b-color' @click='goOrderDetails(item.order_id)' v-else>再次购买</view>
								</block>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class='loadingicon acea-row row-center-wrapper' v-if="orderList.length>5">
				<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadTitle}}
			</view>
			<view v-if="orderList.length == 0 && page > 1">
				<emptyPage title="暂无订单~"></emptyPage>
			</view>
		</view>
		<home></home>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<payment :payMode='payMode' :pay_close="pay_close" @onChangeFun='onChangeFun' :order_id="pay_order_id" :totalPrice='totalPrice'></payment>
		<addInvoicing ref="addInvoicing" @changeInvoiceClose="changeInvoiceClose" :invoice='invoice'></addInvoicing>
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
		orderTake,
		applyInvoiceApi
	} from '@/api/order.js';
	import {
		getUserInfo
	} from '@/api/user.js';
	import {openOrderSubscribe} from '@/utils/SubscribeMessage.js';
	import payment from '@/components/payment';
	import home from '@/components/home/index.vue';
	import addInvoicing from '@/components/addInvoicing';
	import { mapGetters } from "vuex";
	import authorize from '@/components/Authorize';
	import emptyPage from '@/components/emptyPage.vue';
	import { configMap } from '@/utils'
	import { HTTP_REQUEST_URL } from '@/config/app';
	export default {
		components: {
			payment,
			emptyPage,
			home,
			authorize,
			addInvoicing
		},
		data() {
			return {
				loading: false, //是否加载中
				loadend: false, //是否加载完毕
				loadTitle: '加载更多', //提示语
				orderList: [], //订单数组
				presellProList: [], //定金预售订单
				presellOrderCount: 0,
				orderData: {}, //订单详细统计
				orderStatus: 0, //订单状态
				page: 1,
				limit: 20,
				domain: HTTP_REQUEST_URL,
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
				invoice_order_id: '',
				totalPrice: '0',
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				isReady: true,
				invoice: {
					invoice: false,
					add: false,
				}
			};
		},
		computed: {
			...mapGetters(['isLogin','viewColor']),
			...configMap(['hide_mer_status', 'community_status', 'alipay_open', 'yue_pay_status']),
		},
		watch: {
			alipay_open(n){
				this.payMode[1].payStatus = n
			},
			yue_pay_status(n){
				this.payMode[2].payStatus = n
			}
		},
		onShow() {
			if (this.isLogin) {
				this.page = 1;
				this.loadend = false;
				this.loading = false;
				this.getOrderData();
				this.getOrderList();
				this.getUserInfo();
				this.getpreSellOrderList();
			} else {
				this.isAuto = true;
				this.isShowAuth = true
			}
		},
		onReady(){
		},
		mounted: function() {
		},
		methods: {
			// 去商铺
			goMall(item){
				if(this.hide_mer_status == 0){
					uni.navigateTo({
						url:'/pages/store/home/index?id='+item.mer_id
					})
				}
			},
			onLoadFun() {
				this.isShowAuth = false;
				this.getOrderData();
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
			getOrderData: function() {
				let that = this;
				orderData().then(res => {
					that.$set(that, 'orderData', res.data);
				})
			},
			/**
			 * 取消订单
			 *
			 */
			cancelOrder: function(index, order_id) {
				let that = this;
				if (!order_id) return that.$util.Tips({
					title: '缺少订单号无法取消订单'
				});
				unOrderCancel(order_id).then(res => {
					return that.$util.Tips({
						title: res.message,
						icon: 'success'
					}, function() {
						that.orderList.splice(index, 1);
						that.$set(that, 'orderList', that.orderList);
						that.$set(that.orderData, 'unpaid_count', that.orderData.unpaid_count - 1);
						that.getOrderData();
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
				this.$set(this, 'pay_close', true);
				this.order_id = order_id;
				this.pay_order_id = order_id.toString()
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
				this.getOrderData();
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
					if (self.orderStatus == 0) {
						uni.navigateTo({
							url: '/pages/order_details/stay?order_id=' + order_id
						})
					} else {
						uni.navigateTo({
							url: '/pages/order_details/index?order_id=' + order_id
						})
					}
				}).catch(() => {
					uni.hideLoading();
				})
				// #endif
				// #ifndef MP
				if (self.orderStatus == 0) {
					uni.navigateTo({
						url: '/pages/order_details/stay?order_id=' + order_id
					})
				} else {
					uni.navigateTo({
						url: '/pages/order_details/index?order_id=' + order_id
					})
				}
				// #endif
			},
			/**
			 * 点击去评价
			 */
			goOrderDetails_Evaluation: function(order_id) {
				let self = this
				if (!order_id) return that.$util.Tips({
					title: '缺少订单号无法查看订单详情和评价'
				});
				// #ifdef MP
					if (self.orderStatus == 0) {
						uni.navigateTo({
							url: '/pages/order_details/stay?order_id=' + order_id
						})
					} else {
						uni.navigateTo({
							url: '/pages/order_details/index?order_id=' + order_id
						})
					}
				// #endif
				// #ifndef MP
				if (self.orderStatus == 0) {
					uni.navigateTo({
						url: '/pages/order_details/stay?order_id=' + order_id
					})
				} else {
					uni.navigateTo({
						url: '/pages/order_details/index?order_id=' + order_id
					})
				}
				// #endif
			},
			/**
			 * 切换类型
			 */
			statusClick: function(status) {
				if (status == this.orderStatus) return;
				this.orderStatus = status;
				this.loadend = false;
				this.loading = false;
				this.page = 1;
				this.$set(this, 'orderList', []);
				this.getOrderList();
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
				if(that.isReady){
					that.isReady = false
					if (that.orderStatus == 0) {
						groupOrderList({
							page: that.page,
							limit: that.limit,
						}).then(res => {
							that.isReady = true;
							let list = res.data.list || [];
							let loadend = list.length < that.limit;
							console.log(that.orderList)
							that.orderList = that.page == 1 ? list : that.$util.SplitArray(list, that.orderList);
							that.$set(that, 'orderList', that.orderList);
							console.log(that.orderList)
							that.getProductCount();
							that.loadend = loadend;
							that.loading = false;
							that.loadTitle = loadend ? "我也是有底线的" : '加载更多';
							that.page = that.page + 1
						})
					} else {
						getOrderList({
							status: that.orderStatus - 1,
							page: that.page,
							limit: that.limit,
						}).then(res => {
							let list = res.data.list || [];
							let loadend = list.length < that.limit;
							that.orderList = that.page == 1 ? list : that.$util.SplitArray(list, that.orderList);
							that.$set(that, 'orderList', that.orderList);
							that.getProductCount();
							that.loadend = loadend;
							that.loading = false;
							that.loadTitle = loadend ? "我也是有底线的" : '加载更多';
							that.page = that.page + 1;
							that.isReady = true;
						}).catch(err => {
							that.loading = false;
							that.loadTitle = "加载更多";
						})
					}
				}
			},
			/**
			 * 获取定金预售订单列表
			 */
			getpreSellOrderList: function() {
				let that = this;
				getOrderList({
					status: 10,
					page: 1,
					limit: 1,
				}).then(res => {
					let list = res.data.list || [];
					that.presellOrderCount = res.data.count;
					that.$set(that, 'presellProList', list);
				})
			},
			/**
			 * 获取单个订单商品数量
			 */
			getProductCount: function(){
				if(this.orderStatus !== 0){
					this.orderList.forEach((item,i) => {
						let orderNum = 0
						if(item.orderProduct){
							item.orderProduct.forEach((val) => {
							  orderNum += val.product_num
							 })
							this.orderList[i]['orderNum']=orderNum;
						}
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
					that.getOrderData();
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
									that.getOrderData();
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
			/*申请开票*/
			applyInvoice(order_id) {
				let that = this;
				that.invoice_order_id = order_id
				that.invoice.invoice = true;
				that.$refs.addInvoicing.getInvoiceDefault();
				that.$refs.addInvoicing.getInvoiceList();
			},
			// 关闭发票弹窗
			changeInvoiceClose: function(data) {
				if(data)this.getInvoiceData(data);
				this.$set(this.invoice, 'invoice', false);			
			},
			// 开票回调
			getInvoiceData(data) {
				let that = this
				applyInvoiceApi(that.invoice_order_id,data).then(res => {
					return that.$util.Tips({
						title: res.message,
					});
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				})
			}
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
		background-color: var(--view-theme);
	}
	.t-color{color: var(--view-theme);}
	.p-color{color: var(--view-priceColor);}
	.b-color{background-color:var(--view-theme);}
	.my-order .header .picTxt {
		height: 190rpx;
	}

	.my-order .header .picTxt .text {
		color: rgba(255, 255, 255, 0.8);
		font-size: 26rpx;
		// font-family: 'Guildford Pro';
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
		border-radius: 16rpx;
		margin: 20rpx auto 0 auto;
	}

	.my-order .nav .item {
		text-align: center;
		font-size: 26rpx;
		color: #282828;
		padding: 29rpx 0;
	}

	.my-order .nav .item.on {
		font-weight: bold;
		border-bottom: 5rpx solid var(--view-theme);
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

	.my-order .list .item .title {
		height: 84rpx;
		padding: 0 30rpx;
		border-bottom: 1px solid #eee;
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
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		border-radius: 50rpx;
		font-size: 27rpx;
	}

	.my-order .list .item .bottom .bnt.cancelBnt {
		border: 1px solid #ddd;
		color: #aaa;
	}
	.my-order .list .item .bottom .bnt.colorBnt {
		border: 1px solid var(--view-theme);
		color: var(--view-theme);
	}
	.my-order .list .item .bottom .bnt .icon-fabu{
		font-size: 26rpx;
		margin-right: 10rpx;
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
					font-size: 20rpx;
				}
			}
		}
	}
	
	.search {
		height: 70rpx;
		padding: 0 30rpx;
		border-radius: 35rpx;
		margin: -35rpx 30rpx 0;
		background-color: #FFFFFF;
		font-size: 26rpx;
		color: #999999;
		
		.iconfont {
			margin-right: 10rpx;
			font-size: 23rpx;
		}
	}
</style>
