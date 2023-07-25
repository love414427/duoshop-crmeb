<template>
	<view class="pos-order-list" ref="container">
		<view class="top-header">
			<view class="search">
				<view class="search-content acea-row row-middle">
					<text class="iconfont icon-sousuo"></text>
					<input v-model="where.store_name" confirm-type="search" placeholder="请输收货人手机号或退款订单号搜索" class="input" @confirm="handleSearch" />
				</view>
			</view>
			<view>
				<scroll-view class="nav acea-row" scroll-x="true" style="white-space: nowrap; display: flex;" scroll-with-animation show-scrollbar="true">
					<view class="item" :class="where.status == 1 ? 'on' : ''" @click="changeStatus(1)">
						待付款
					</view>
					<view class="item" :class="where.is_verify == 1 ? 'on' : ''" @click="changeStatus('verify')">
						待核销
					</view>
					<view class="item" :class="where.status == 2 ? 'on' : ''" @click="changeStatus(2)">
						待发货
					</view>
					<view class="item" :class="where.status == 3 ? 'on' : ''" @click="changeStatus(3)">
						待收货
					</view>
					<view class="item" :class="where.status == 4 ? 'on' : ''" @click="changeStatus(4)">
						待评价
					</view>
					<view class="item" :class="where.status == 5 ? 'on' : ''" @click="changeStatus(5)">
						已完成
					</view>
					<view class="item" :class="where.status == 6 ? 'on' : ''" @click="changeStatus(6)">
						退款
					</view>
				</scroll-view>
				
			</view>
		</view>
			<view v-if="where.status == 6" class="list">
				<view class="item" v-for="(item, index) in list" :key="index">
					<view class="order-num acea-row row-middle">
						<text v-if="item.order && item.order.activity_type != 0" class="activity_type">
							{{ item.order.activity_type == 1 ? '秒杀' : item.order.activity_type == 2 ? '预售' : item.order.activity_type == 3 ? '助力' : item.order.activity_type == 4 ? '拼团' : item.order.activity_type == 10 ? '套餐' :'' }}
						</text>
						退款单号：{{ item.refund_order_sn }}
						<text class="time">申请时间：{{ item.create_time }}</text>
					</view>
					<view class="pos-order-goods" v-for="(val, key) in item.refundProduct" :key="key" @click="toRefundDetail(item)">
						<view class="goods acea-row row-between-wrapper">
							<view class="picTxt acea-row row-between-wrapper">
								<view class="pictrue">
									<image :src="val.product.cart_info.product.image" />
								</view>
								<view class="text acea-row row-between row-column">
									<view class="info line1 refund-info">
										{{ val.product.cart_info.product.store_name }}
									</view>
									<view class="attr" v-if="val.product.cart_info.productAttr.sku">
										{{ val.product.cart_info.productAttr.sku }}
									</view>
									<view class="y-money refund-y-money">
										退款：￥{{ val.refund_price }}
									</view>
								</view>
							</view>
							<view class="money refund-money">
								<view class="num">x{{ val.refund_num }}</view>
							</view>
						</view>
					</view>
					<view class="item-status">
						<text v-if="item.status == -1" class="iconfont icon-yijujue1"></text>
						<text v-if="item.status == 0" class="iconfont icon-tuikuanzhong on"></text>
						<text v-if="item.status == 1 || item.status == 2" class="iconfont icon-tuihuozhong on"></text>
						<text v-if="item.status == 3" class="iconfont icon-yituikuan1"></text>
					</view>
					<view class="operation acea-row row-between-wrapper">
						<view class="more">
						</view>
						<view class="acea-row row-middle">
							<view class="bnt" @click="refundModify(item, 1)">订单备注</view>
							<navigator class="bnt bnt_color" v-if="item.status == 0" :url="'/pages/admin/orderRefund/index?id='+item.refund_order_id+'&merId='+merId">立即退款</navigator>
							<navigator class="bnt" v-if="item.status == 2" :url="'/pages/users/goods_logistics/index?refundId='+item.refund_order_id+'&merId='+merId">查看物流</navigator>
							<view class="bnt bnt_color" v-if="item.status == 2" @tap='confirmOrder(item)'>确认收货</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else class="list">
				<view class="item" v-for="(item, index) in list" :key="index">
					<view class="order-num acea-row row-middle">
						<text v-if="item.activity_type != 0" class="activity_type">
							{{ item.activity_type == 1 ? '秒杀' : item.activity_type == 2 ? '预售' : item.activity_type == 3 ? '助力' : item.activity_type == 4 ? '拼团' : item.activity_type == 10 ? '套餐' :'' }}
						</text>
						订单号：{{ item.order_sn }}
						<text class="time">下单时间：{{ item.create_time }}</text>
						<text class="order-status" v-if="item.refunding != 0 && where.status != 1">{{item.refunding==1 ? '退款中' : item.refunding==2 ? '部分退款' : '全部退款'}}</text>
					</view>
					<view class="pos-order-goods" v-for="(val, key) in item.orderProduct" :key="key" @click="toDetail(item)">
						<view class="goods">
							<view class="acea-row row-between-wrapper">
								<view class="picTxt acea-row row-between-wrapper">
									<view class="pictrue">
										<image :src="val.cart_info.product.image" />
									</view>
									<view class="text acea-row row-between row-column">
										<view class="info line2">
											{{ val.cart_info.product.store_name }}
										</view>
										<view class="attr" v-if="val.cart_info.productAttr.sku">
											{{ val.cart_info.productAttr.sku }}
										</view>
									</view>
								</view>
								<view class="money">
									<view class="x-money">￥{{ val.cart_info.productAttr.price }}</view>
									<view class="num">x{{ val.product_num }}</view>
									<!-- <view class="refund-num" v-if="val.product_num-val.refund_num>0">{{val.product_num-val.refund_num}}件{{val.is_refund==1?'退款中' : val.is_refund==2 ? '已退款' : val.is_refund==3?'全部退款':''}}</view> -->
								</view>
							</view>
							<!-- <view v-if="item.order_type == 1" class="cancellate">
								<text class="uncancell">1件已核销</text>
								<text class="uncancell">1件已退款</text>
								<text class="cancelled">1件退款中</text>
							</view> -->
						</view>
						
					</view>
					<view class="public-total">
						共{{ item.total_num }}件商品，
						<span v-if="where.status <= 1">应</span>
						<span v-else>已</span>
						支付
						<span class="money">￥{{ item.pay_price }}</span> (邮费 ¥{{ item.pay_postage}})
					</view>
					<view class="operation acea-row row-between-wrapper">
						<view class="more">
						</view>
						<view class="acea-row row-middle">
							<view class="bnt" @click="modify(item, 0)" v-if="where.status == 1 && item.activity_type != 2">
								一键改价
							</view>
							<view class="bnt" @click="modify(item, 1)">订单备注</view>
							<view class="bnt bnt_color" v-if="where.status == 2 && item.order_type == 0" @click="toPostage(item)">去发货</view>
							<view class="bnt bnt_color" v-if="(where.status == 2 && item.order_type == 1) || where.is_verify == 1" @click="toDetail(item)">去核销</view>
						</view>
					</view>
				</view>
			</view>
			<Loading :loaded="loaded" :loading="loading"></Loading>
		<view v-if="!loading && list.length <= 0" class="nothing">
			<image src="/static/images/no_thing.png" mode="widthFix"></image>
			<view class="nothing_text">暂无订单~</view>
		</view>
		<PriceChange :change="change" :orderInfo="orderInfo" v-on:closechange="changeclose($event)" v-on:savePrice="savePrice"
		 :status="status"></PriceChange>
		 <view>
		   <view class="priceChange" :class="refundMark === true ? 'on' : ''">
		     <view class="priceTitle">
		      订单备注
		       <span class="iconfont icon-guanbi" @click="refundMark = false"></span>
		     </view>
		     <view class="listChange">
		       <textarea
		         placeholder="请填写备注信息..."
		         v-model="refundInfo.mer_mark"
		       ></textarea>
		     </view>
		     <view class="modify" @click="save">
		       确认提交
		     </view>
		   </view>
		   <view class="mask" @touchmove.prevent v-show="refundMark === true"></view>
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
	import {
		getOrderList,
		getRefundOrderList,
		setAdminOrderPrice,
		setAdminOrderRemark,
		setOfflinePay,
		setOrderRefund,
		refundOrderReceive,
		setRefundMark
	} from "@/api/admin";
	import Loading from '@/components/Loading/index'
	import PriceChange from '@/components/PriceChange/index'
	import { isMoney } from '@/utils/validate.js'
	export default {
		name: "AdminOrderList",
		components: {
			Loading,
			PriceChange
		},
		data() {
			return {
				current: "",
				change: false,
				refundMark: false,
				types: 1,
				where: {
					page: 1,
					limit: 10,
					status: 1,
					store_name: ''
				},
				list: [],
				loaded: false,
				loading: false,
				refundInfo: {},
				orderInfo: {},
				status: "",
				merId: ''
			};
		},
		watch: {
			"$route.params.types": function(newVal) {
				let that = this;
				if (newVal != undefined) {
					that.where.status = newVal;
					that.init();
				}
			},
			types: function() {
				this.getIndex();
			}
		},
		onLoad(option) {
			this.where.status = option.types
			this.current = "";
			this.merId = option.merId;
			this.getIndex();
		},	
		methods: {
			handleSearch() {
				this.loaded = false;
				this.where.page = 1;
				this.list = [];
				this.getIndex();
			},
			// 获取数据
			getIndex() {
				let that = this;
				if (that.loading || that.loaded) return;
				that.loading = true;
				if(that.where.status == 6){
					getRefundOrderList(that.where, that.merId).then(
						res => {
							that.loading = false;
							that.loaded = res.data.list.length < that.where.limit;
							that.list.push.apply(that.list, res.data.list);
							that.where.page = that.where.page + 1;
						},
						err => {
							that.$util.Tips({title: err});
						}
					);
				}else{
					getOrderList(that.where, that.merId).then(
						res => {
							that.loading = false;
							that.loaded = res.data.list.length < that.where.limit;
							that.list.push.apply(that.list, res.data.list);
							that.where.page = that.where.page + 1;
						},
						err => {
							that.$util.Tips({title: err});
						}
					);
				}
			},
			// 初始化
			init: function() {
				this.list = [];
				this.where.page = 1;
				this.loaded = false;
				this.loading = false;
				this.getIndex();
				this.current = "";
			},
			// 导航切换
			changeStatus(val) {
				if(val != 'verify'){
					if(this.where.status != val){
						this.where.status = val;
						delete this.where.is_verify;
						this.init();
					}
				}else{
					this.where.is_verify = 1;
					delete this.where.status;
					this.init();
				}
			},
			// 商品操作
			modify: function(item, status) {
				let temp = status.toString()
				this.change = true;
				this.orderInfo = item;
				this.status = temp;
			},
			refundModify(item){
				this.refundInfo = item;
				this.refundMark = true;
			},
			// 退款单备注
			save(item) {
				let that = this;
				if (!that.refundInfo.mer_mark) {
					return this.$util.Tips({
						title: '请输入备注'
					})
				}
				setRefundMark(that.merId,that.refundInfo.refund_order_id,{ mer_mark: that.refundInfo.mer_mark }).then(
					res => {
						that.refundMark = false;
						this.$util.Tips({
							title: res.message,
							icon: 'success'
						})
					},
					err => {
						that.refundMark = false;
						that.$util.Tips({
							title: err
						});
					}
				);
			},
			changeclose: function(msg) {
				this.change = msg;
			},
			// 确认收货
			confirmOrder: function(item) {
				let that = this;
				uni.showModal({
					title: '确认收货',
					content: '为保障权益，请收到货确认无误后，再确认收货',
					success: function(res) {
						if (res.confirm) {
							refundOrderReceive(that.merId,item.refund_order_id).then(res => {
								return that.$util.Tips({
									title: '操作成功',
									icon: 'success'
								}, function() {
									item.status = 3;
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
			toPostage(item){
				let that = this;
				if(item.refunding != 0){
					uni.showModal({
						title: '标题',
						content: '该订单有售后申请，请确认已处理！',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url:`/pages/admin/delivery/index?id=${item.order_id}&merId=${that.merId}`
								})
							}
						}
					})
				}else{
					uni.navigateTo({
						url:`/pages/admin/delivery/index?id=${item.order_id}&merId=${that.merId}`
					})
				}	
			},
			async savePrice(opt) {
				let that = this,
					data = {},
					price = opt.orderInfo.pay_postage,
					refund_price = opt.refund_price,
					refund_status = that.orderInfo.refund_status,
					remark = opt.remark;
					let parmas = {
						 pay_postage: opt.orderInfo.pay_postage,
						 coupon_price: opt.orderInfo.coupon_price,
						 total_price: Number(opt.orderInfo.total_price)
					}
				let id = that.orderInfo.order_id;
				if (that.status == 0) {
					if(!isMoney(opt.orderInfo.pay_postage || opt.orderInfo.total_price)){
						return that.$util.Tips({title: '请输入正确的金额'});
					}
					data.pay_price = price;
					setAdminOrderPrice(this.merId,id,parmas).then(
						function() {
							that.change = false;
							that.$util.Tips({
								title:'改价成功',
								icon:'success'
							})
							that.init();
						},
						function(res) {
							that.change = false;
							that.$util.Tips({
								title:res,
								icon:'none'
							})
						}
					);
				} else {					
					if(!remark){
						return this.$util.Tips({
							title:'请输入备注'
						})
					}
					setAdminOrderRemark(this.merId,id, {remark: remark}).then(
						res => {
							that.change = false;
							this.$util.Tips({
								title:res.message,
								icon:'success'
							})
							that.init();
						},
						err => {
							that.change = false;
							that.$util.Tips({title: err});
						}
					);
				}
			},
			toDetail(item){
				uni.navigateTo({
					url:`/pages/admin/orderDetail/index?id=${item.order_id}&mer_id=${item.mer_id}`
				})
			},
			toRefundDetail(item){
				uni.navigateTo({
					url:`/pages/admin/refundDetail/index?id=${item.refund_order_id}&mer_id=${item.mer_id}`
				})
			}
		},
		onReachBottom() {
			this.getIndex()
		}
	}
</script>

<style lang="scss">
	.pos-order-list .top-header {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		width: 100%;
		background-color: #fff;
	}
	.pos-order-list .nav {
		// width: 100%;
		height: 96upx;
		font-size: 30upx;
		color: #282828;
		width: 690rpx;
		margin: 0 auto;
	}
	.pos-order-list .nav .item {
		display: inline-block;
		text-align: center;
		color: #333333;
		max-width: 160rpx;
		margin-right: 50rpx;
		line-height: 96upx;
		&:last-child{
			margin-right: 0;
		}
	}
	
	.pos-order-list .nav .item.on {
		color: #2291f8;
	}
	.pos-order-list .list {
		margin-top: 210upx;
	}
	.pos-order-list .list .item {
		background-color: #fff;
		width: 100%;
		position: relative;
	}
	.pos-order-list .list .item .item-status{
		position: absolute;
		top: 14rpx;
		right: 20rpx;
		.iconfont{
			font-size: 98rpx;
			color: #CCCCCC;
			&.on{
				color: #FFE3BC;
			}
		}
	}
	.pos-order-list .list .item~.item {
		margin-top: 24upx;
	}
	.pos-order-list .list .activity_type {
		display: inline-block;
		color: #E93323;
		font-size: 20rpx;
		text-align: center;
		border-radius: 5rpx;
		padding: 0 4rpx;
		line-height: 28rpx;
		margin-right: 8rpx;
		border: 1rpx solid #E93323;
	}
	.pos-order-list .list .item .order-num {
		height: 124upx;
		border-bottom: 1px solid #eee;
		font-size: 30upx;
		font-weight: bold;
		color: #282828;
		padding: 0 30upx;
		position: relative;
	}
	.pos-order-list .list .item .order-status{
		color: #ff9600;
		position: absolute;
		top: 24rpx;
		right: 20rpx;
		text-align: right;
		width: 160rpx;
		font-weight: normal;
		font-size: 26rpx;
	}
	.pos-order-list .list .item .order-num .time {
		font-size: 26upx;
		font-weight: normal;
		color: #999;
		margin-top: -40upx;
	}
	.pos-order-list .list .item .operation {
		padding: 20upx 30upx 20upx 0;
		margin: 30upx 0 0 30upx;
		border-top: 1rpx solid #EEEEEE;
	}
	.pos-order-list .list .item .operation .more {
		position: relative;
	}
	.pos-order-list .list .item .operation .icon-gengduo {
		font-size: 50upx;
		color: #aaa;
	}
	.pos-order-list .list .item .operation .order .arrow {
		width: 0;
		height: 0;
		border-left: 11upx solid transparent;
		border-right: 11upx solid transparent;
		border-top: 20upx solid #e5e5e5;
		position: absolute;
		left: 15upx;
		bottom: -18upx;
	}
	.pos-order-list .list .item .operation .order .arrow:before {
		content: '';
		width: 0;
		height: 0;
		border-left: 7upx solid transparent;
		border-right: 7upx solid transparent;
		border-top: 20upx solid #fff;
		position: absolute;
		left: -7upx;
		bottom: 0;
	}
	.pos-order-list .list .item .operation .order {
		width: 200upx;
		background-color: #fff;
		border: 1px solid #eee;
		border-radius: 10upx;
		position: absolute;
		top: -100upx;
		z-index: 9;
	}
	.pos-order-list .list .item .operation .order .items {
		height: 77upx;
		line-height: 77upx;
		text-align: center;
	}
	.pos-order-list .list .item .operation .order .items~.items {
		border-top: 1px solid #f5f5f5;
	}
	.pos-order-list .list .item .operation .bnt {
		font-size: 28upx;
		color: #5c5c5c;
		width: 170upx;
		height: 60upx;
		border-radius: 30upx;
		border: 1px solid #bbb;
		text-align: center;
		line-height: 60upx;
	}
	.pos-order-list .list .item .operation .bnt_color{
		border: none;
		color: #fff;
		background: linear-gradient(90deg, #2291F8 0%, #1CD1DC 100%);
	}
	.pos-order-list .list .item .operation .bnt~.bnt {
		margin-left: 14upx;
	}

	.pos-order-goods {
		padding: 0 30upx;
		background-color: #fff;
	}
	.pos-order-goods .goods {
		padding-top: 20rpx;
		overflow: hidden;
	}
	.pos-order-goods .goods~.goods {
		border-top: 1px dashed #e5e5e5;
	}
	.pos-order-goods .cancellate{
		font-size: 24rpx;
		float: right;
		margin-top: 10rpx;
		text{
			margin-left: 26rpx;
		}
	}
	.pos-order-goods .cancelled{	
		color: #FF9600;	
	}
	.pos-order-goods .goods .uncancell{
		color: #999999;
	}
	.pos-order-goods .goods .picTxt {
		width: 515upx;
	}
	.pos-order-goods .goods .picTxt .pictrue {
		width: 130upx;
		height: 130upx;
	}
	.pos-order-goods .goods .picTxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6upx;
	}
	.pos-order-goods .goods .picTxt .text {
		flex-direction: column;
		width: 365upx;
	}
	.pos-order-goods .goods .picTxt .text .info {
		font-size: 28upx;
		color: #282828;
		&.refund-info{
			width: 460upx;
		}
	}
	.refund-y-money{
		margin-top: 16rpx;
		font-size: 26rpx;
	}
	.pos-order-goods .goods .picTxt .text .attr {
		margin-top: 5rpx;
		font-size: 24upx;
		color: #999;
	}
	.pos-order-goods .goods .money {
		width: 164upx;
		text-align: right;
		font-size: 28upx;
		&.refund-money{
			width: auto;
			position: relative;
			top: -50rpx;
			.num{
				color: #999999;
			}
			
		}
		.refund-num{
			font-size: 24rpx;
			color: #282828;
		}
	}
	.pos-order-goods .goods .money .x-money {
		color: #282828;
	}
	.pos-order-goods .goods .money .num {
		color: #ff9600;
		margin: 5upx 0;
	}
	.pos-order-goods .goods .money .y-money {
		color: #999;
		text-decoration: line-through;
	}
	.pos-order-goods .goods .refund_num{
		display: inline-block;
		margin-left: 10rpx;
	}
	.public-total {
		font-size: 28upx;
		color: #282828;
		height: 92upx;
		line-height: 92upx;
		text-align: right;
		padding: 0 30upx;
		background-color: #fff;
	}
	.public-total .money {
		color: #ff4c3c;
	}
	.nothing {
		margin-top: 200rpx;
		text-align: center;	
	}
	.nothing_text{
		margin-top: 20rpx;
		color: #999999;
	}
	.priceChange{position:fixed;width:580upx;background-color:#fff;border-radius:10upx;top:50%;left:50%;margin-left:-290upx;margin-top:-335upx;z-index:666;transition:all 0.3s ease-in-out 0s;transform: scale(0);opacity:0;}
	.priceChange.on{opacity:1;transform: scale(1);}
	.priceChange .priceTitle{background:url("~@/static/images/pricetitle.jpg") no-repeat;background-size:100% 100%;width:100%;height:160upx;border-radius:10upx 10upx 0 0;text-align:center;font-size:40upx;color:#fff;line-height:160upx;position:relative;}
	.priceChange .priceTitle .iconfont{position:absolute;font-size:40upx;right:26upx;top:23upx;width:40upx;height:40upx;line-height:40upx;}
	.priceChange .listChange{padding:0 40upx;}
	.priceChange .listChange textarea{box-sizing: border-box;}
	.priceChange .listChange .item{height:103upx;border-bottom:1px solid #e3e3e3;font-size:32upx;color:#333;}
	.priceChange .modify{font-size:32upx;color:#fff;width:490upx;height:90upx;text-align:center;line-height:90upx;border-radius:45upx;background-color:#2291f8;margin:53upx auto;}
	.priceChange .listChange textarea {
	  border: 1px solid #eee;
	  width: 100%;
	  height: 200upx;
	  margin-top: 50upx;
	  border-radius: 10upx;
	  color: #333;
	  padding: 20upx;
	}
	.search {
		padding: 17rpx 30rpx;
		
		.search-content {
			width: 100%;
			height: 60rpx;
			padding: 0 30rpx;
			border-radius: 30rpx;
			background-color: #F5F5F5;
			font-size: 26rpx;	
		}
		
		.iconfont {
			margin-right: 10rpx;
			font-size: 26rpx;
			color: #999999;
		}
		
		.input-placeholder {
			font-size: 26rpx;
			color: #999999;
		}
		
		.input {
			flex: 1;
		}
	}
</style>
