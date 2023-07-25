<template>
	<view class="order-details pos-order-details">
		<view class="header acea-row row-middle">
			<view class="state" v-if="orderInfo.status == 0">待审核</view>
			<view class="state" v-else-if="orderInfo.status == -1">审核未通过</view>
			<view class="state" v-else-if="orderInfo.status == 1">待退货</view>
			<view class="state" v-else-if="orderInfo.status == 2">待收货</view>
			<view class="state" v-else-if="orderInfo.status == 3">已退款</view>		
		</view>
		<view v-if="orderInfo.refund_type == 2 && orderInfo.status > 0" class="orderingUser acea-row row-middle">
			<span class="iconfont icon-yonghu2"></span>{{ orderInfo.user && orderInfo.user.nickname }}
		</view>
		<view v-if="orderInfo.refund_type == 2 && orderInfo.status > 0" class="address">
			<view class="name">
				{{ orderInfo.mer_delivery_user }}<span class="phone">{{ orderInfo.phone }}</span>
			</view>
			<view>{{ orderInfo.mer_delivery_address }}</view>
			<!-- #ifdef H5 -->
			<button class="copy copy-data" :data-clipboard-text="'收货人姓名：'+orderInfo.mer_delivery_user+'\n收货人电话：'+ orderInfo.phone+'\n收货人地址：'+orderInfo.mer_delivery_address">复制</button>
			<!-- #endif -->
			<!-- #ifdef MP -->
			<button class="copy" @tap="copyText">复制</button>
			<!-- #endif -->
		</view>
		<view class="line">
			<image :src="`${domain}/static/images/line.jpg`" />
		</view>
		<view class="pos-order-goods">
			<navigator :url="`/pages/goods_details/index?id=${item.product.cart_info.product.product_id}`" hover-class="none" class="goods acea-row row-between-wrapper" v-for="(item, index) in orderInfo.refundProduct" :key="index">
				<view class="picTxt acea-row row-between-wrapper">
					<view class="pictrue">
						<image :src="item.product.cart_info.product.image || item.product.cart_info.product.image" />
					</view>
					<view class="text acea-row row-between row-column">
						<view class="info line2">
							{{ item.product.cart_info.product.store_name }}
						</view>
						<view class="attr line1">{{ item.product.cart_info.productAttr.sku }}</view>
						<view class="x-money">￥{{ item.product.cart_info.productAttr.price }}</view>
					</view>
				</view>
				<view class="money">
					<view class="num">x{{ item.refund_num }}</view>
				</view>
			</navigator>
		</view>
		<view class="wrapper">
			<view class="item acea-row row-between">
				<view>退款单编号：</view>
				<view class="conter acea-row row-middle row-right">
					{{ orderInfo.refund_order_sn }}
					<!-- #ifdef H5 -->
					<button class="copy copy-data" :data-clipboard-text="orderInfo.refund_order_sn">复制</button>
					<!-- #endif -->
					<!-- #ifdef MP -->
					<span class="copy copy-data" @click="copyNum(orderInfo.refund_order_sn)">复制</span>
					<!-- #endif -->
				</view>
			</view>
			<view class="item acea-row row-between">
				<view>退款金额：</view>
				<view class="conter">{{ orderInfo.refund_price }}</view>
			</view>
			<view class="item acea-row row-between">
				<view>申请件数：</view>
				<view class="conter">{{ orderInfo.refund_num }}</view>
			</view>
			<view class="item acea-row row-between">
				<view>申请时间：</view>
				<view class="conter">{{ orderInfo.create_time }}</view>
			</view>
			<view class="item acea-row row-between">
				<view>退款原因：</view>
				<view class="conter">{{ orderInfo.refund_message }}</view>
			</view>
			<view class="item acea-row row-between">
				<view>备注信息：</view>
				<view class="conter">{{ orderInfo.mark }}</view>
			</view>
			<view class="item">
				<view>退款凭证：</view>
				<view class="upload-img">
					<view class="img-item" v-for="(item,index) in orderInfo.pics" :key="index">
						<image :src="item" mode="" @click="loookImg(item,index)"></image>
					</view>
				</view>
			</view>
		</view>
		<view style="height:120upx;"></view>
		<view class="footer acea-row row-right row-middle" v-if="goname != 'looks'">
			<view class="more"></view>
			<view class="bnt cancel" @click="modify('1')">订单备注</view>
			<navigator class="bnt cancel" v-if="orderInfo.status == 2" :url="'/pages/users/goods_logistics/index?refundId='+orderInfo.refund_order_id+'&merId='+mer_id">查看物流</navigator>
			<view class="bnt delivery" v-if="orderInfo.status == 2" @click="confirmOrder">确认收货</view>
		</view>
		<view>
		  <view class="priceChange" :class="change === true ? 'on' : ''">
		    <view class="priceTitle">
		     订单备注
		      <span class="iconfont icon-guanbi" @click="changeclose"></span>
		    </view>
		    <view class="listChange">
		      <textarea
		        placeholder="请填写备注信息..."
		        v-model="orderInfo.mer_mark"
		      ></textarea>
		    </view>
		    <view class="modify" @click="save">
		      确认提交
		    </view>
		  </view>
		  <view class="mask" @touchmove.prevent v-show="change === true"></view>
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

	// #ifdef H5
	import ClipboardJS from "@/plugin/clipboard/clipboard.js";
	// #endif
	import {
		getRefundOrderDetail,
		refundOrderReceive,
		setRefundMark
	} from "@/api/admin";
	import { isMoney } from '@/utils/validate.js'
	import { HTTP_REQUEST_URL } from '@/config/app';
	export default {
		name: "AdminOrder",
		components: {
		},
		props: {},
		data: function() {
			return {
				order: false,
				change: false,
				order_id: "",
				mer_id: '',
				mer_mark: '',
				orderInfo: {
					_status: {},
					user: {}
				},
				status: "",
				title: "",
				payType: "",
				types: "",
				clickNum: 1,
				goname:'',
				domain: HTTP_REQUEST_URL,
			};
		},
		watch: {
			"$route.params.oid": function(newVal) {
				let that = this;
				if (newVal != undefined) {
					that.order_id = newVal;
					that.getIndex();
				}
			}
		},
		onLoad: function(option) {
			let self = this
			this.order_id = option.id
			this.mer_id = option.mer_id
			this.goname = option.goname
			this.getIndex();
			// #ifdef H5
			this.$nextTick(function() {
				var clipboard = new ClipboardJS('.copy-data');
				clipboard.on('success', function(e) {
					self.$util.Tips({
						title:'复制成功'
					})
				});
				clipboard.on('error', function(e) {
					self.$util.Tips({
						title:'复制失败'
					})
				});
			});
			// #endif
			
		},
		methods: {
			more: function() {
				this.order = !this.order;
			},
			modify: function(status) {
				this.change = true;
				this.status = status;
			},
			changeclose: function(msg) {
				this.change = false;
			},
			//  查看大图
			loookImg(item,index){
				uni.previewImage({
					urls: this.orderInfo.pics,
					current: this.orderInfo.pics[index]
				});
			},
			// 图片预览
			getPhotoClickIdx(list, idx) {
				uni.previewImage({
					current: list[idx], //  传 Number H5端出现不兼容 
					urls: list
				});
			},
			copyText: function (e) {
			    // var copy = e.currentTarget.dataset.copy;  //data-copy传过来的数值
			    let arr = [
			      {
			        name: "收货人姓名",
			        value: this.orderInfo.real_name
			      },
			      {
			        name: "收货人电话",
			        value: this.orderInfo.user_phone
			      },
			      {
			        name: "收货人地址",
			        value: this.orderInfo.user_address
			      }
			    ]
			    wx.setClipboardData({
			      data: `${arr.map(item =>`${item.name}: ${item.value}`).join("\n")}`,
			      success: function (res) {
			        wx.getClipboardData({
			          success: function (res) {
			            wx.showToast({
			              title: '复制成功'
			            })
			          }
			        })
			      }
			    })
			},
			getIndex: function() {
				let that = this;
				getRefundOrderDetail(that.mer_id,that.order_id).then(
					res => {
						that.orderInfo = res.data;
					},
					err => {
						that.$util.Tips({
							title: err
						}, {
							tab: 3,
							url: 1
						});
					}
				);
			},
			// 确认收货
			confirmOrder: function() {
				let that = this;
				uni.showModal({
					title: '确认收货',
					content: '为保障权益，请收到货确认无误后，再确认收货',
					success: function(res) {
						if (res.confirm) {
							refundOrderReceive(that.mer_id,that.orderInfo.refund_order_id).then(res => {
								return that.$util.Tips({
									title: '操作成功',
									icon: 'success'
								}, function() {
									that.getIndex()
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
			// 提交备注信息
			save(){
				let that = this;
				if (!that.orderInfo.mer_mark) {
					return this.$util.Tips({
						title: '请输入备注'
					})
				}
				setRefundMark(that.mer_id,that.orderInfo.refund_order_id,{ mer_mark: that.orderInfo.mer_mark }).then(
					res => {
						that.change = false;
						this.$util.Tips({
							title: res.message,
							icon: 'success'
						})
					},
					err => {
						that.change = false;
						that.$util.Tips({
							title: err
						});
					}
				);
			},
			// #ifdef MP
			copyNum(id) {
				uni.setClipboardData({
					data: id,
					success: function() {
						console.log('success');
					}
				});
			},
			copyData(id){
				uni.setClipboardData({
					data: id,
					success: function() {
						console.log('success');
					}
				});
			},
			// #endif
			// #ifdef H5
			webCopy(item, index) {
				let items = item
				let indexs = index
				let self = this
				if (self.clickNum == 1) {
					self.clickNum += 1
					self.webCopy(items, indexs)
				}
			}
			// #endif
		}
	};
</script>

<style lang="scss">
	.pos-order-details .header {
		background: linear-gradient(to right, #2291f8 0%, #1cd1dc 100%);
		background: -webkit-linear-gradient(to right, #2291f8 0%, #1cd1dc 100%);
		background: -moz-linear-gradient(to right, #2291f8 0%, #1cd1dc 100%);
	}
	.pos-order-details .header .state {
		font-size: 36upx;
		color: #fff;
	}
	.pos-order-details .header .data {
		margin-left: 35upx;
		font-size: 28upx;
	}
	.pos-order-details .header .data .order-num {
		font-size: 30upx;
		margin-bottom: 8upx;
	}
	.pos-order-details .remarks {
		width: 100%;
		height: 86upx;
		background-color: #fff;
		padding: 0 30upx;
	}
	.pos-order-details .remarks .iconfont {
		font-size: 40upx;
		color: #2a7efb;
	}
	.pos-order-details .remarks input {
		width: 630upx;
		height: 100%;
		font-size: 30upx;
	}
	.pos-order-details .remarks input::placeholder {
		color: #666;
	}
	.pos-order-details .orderingUser {
		font-size: 26upx;
		color: #282828;
		padding: 0 30upx;
		height: 67upx;
		background-color: #fff;
		margin-top: 16upx;
		border-bottom: 1px solid #f5f5f5;
	}
	.pos-order-details .orderingUser .iconfont {
		font-size: 40upx;
		color: #2a7efb;
		margin-right: 15upx;
	}
	.pos-order-details .address {
		margin-top: 0;
	}
	.pos-order-details .pos-order-goods {
		margin-top: 17upx;
	}
	.pos-order-details .footer .more {
		font-size: 27upx;
		color: #aaa;
		width: 100upx;
		height: 64upx;
		text-align: center;
		line-height: 64upx;
		margin-right: 25upx;
		position: relative;
	}
	.pos-order-details .footer .delivery {
		background: linear-gradient(to right, #2291f8 0%, #1cd1dc 100%);
		background: -webkit-linear-gradient(to right, #2291f8 0%, #1cd1dc 100%);
		background: -moz-linear-gradient(to right, #2291f8 0%, #1cd1dc 100%);
	}
	.pos-order-details .footer .more .order .arrow {
		width: 0;
		height: 0;
		border-left: 11upx solid transparent;
		border-right: 11upx solid transparent;
		border-top: 20upx solid #e5e5e5;
		position: absolute;
		left: 15upx;
		bottom: -18upx;
	}
	.pos-order-details .footer .more .order .arrow:before {
		content: '';
		width: 0;
		height: 0;
		border-left: 9upx solid transparent;
		border-right: 9upx solid transparent;
		border-top: 19upx solid #fff;
		position: absolute;
		left: -10upx;
		bottom: 0;
	}
	.pos-order-details .footer .more .order {
		width: 200upx;
		background-color: #fff;
		border: 1px solid #eee;
		border-radius: 10upx;
		position: absolute;
		top: -200upx;
		z-index: 9;
	}
	.pos-order-details .footer .more .order .item {
		height: 77upx;
		line-height: 77upx;
	}
	.pos-order-details .footer .more .order .item~.item {
		border-top: 1px solid #f5f5f5;
	}
	.pos-order-details .footer .more .moreName {
		width: 100%;
		height: 100%;
	}
	.order-details .header {
		padding: 0 30upx;
		height: 150upx;
	}
	.order-details .header.on {
		background-color: #666 !important;
	}
	.order-details .header .pictrue {
		width: 110upx;
		height: 110upx;
	}
	.order-details .header .pictrue image {
		width: 100%;
		height: 100%;
	}
	.order-details .header .data {
		color: rgba(255, 255, 255, 0.8);
		font-size: 24upx;
		margin-left: 27upx;
	}
	.order-details .header.on .data {
		margin-left: 0;
	}
	.order-details .header .data .state {
		font-size: 30upx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 7upx;
	}
	.order-details .nav {
		background-color: #fff;
		font-size: 26upx;
		color: #282828;
		padding: 25upx 0;
	}
	.order-details .nav .navCon {
		padding: 0 40upx;
	}
	.order-details .nav .navCon .on {
		font-weight: bold;
		color: #e93323;
	}
	.order-details .nav .progress {
		padding: 0 65upx;
		margin-top: 10upx;
	}
	.order-details .nav .progress .line {
		width: 100upx;
		height: 2upx;
		background-color: #939390;
	}
	.order-details .nav .progress .iconfont {
		font-size: 25upx;
		color: #939390;
		margin-top: -2upx;
		width: 30upx;
		height: 30upx;
		line-height: 33upx;
		text-align: center;
		margin-right: 0 !important;
	}
	.order-details .address {
		font-size: 26upx;
		color: #868686;
		background-color: #fff;
		padding: 25upx 30upx 30upx 30upx;
		position: relative;
	}
	.order-details .address .name {
		font-size: 30upx;
		color: #282828;
		margin-bottom: 0.1rem;
	}
	.order-details .address .name .phone {
		margin-left: 40upx;
	}
	.order-details .line {
		width: 100%;
		height: 3upx;
	}
	.order-details .line image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.order-details .wrapper {
		background-color: #fff;
		margin-top: 12upx;
		padding: 30upx;
	}
	.order-details .wrapper .item {
		font-size: 28upx;
		color: #282828;
	}
	.order-details .wrapper .item~.item {
		margin-top: 20upx;
	}
	.order-details .wrapper .item .conter {
		color: #868686;
		text-align: right;
	}
	.order-details .wrapper .item .virtual_image {
		// text-align: left;
		margin-left: 50rpx;
	}
	.order-details .wrapper .item .virtual_image .picture{
		width: 106rpx;
		height: 106rpx;
		border-radius: 8rpx;
		margin-right: 10rpx;
		&:last-child{
			margin-right: 0;
		}
	}
	.order-details .wrapper .item .conter .copy {
		font-size: 20rpx;
		color: #868686;
		border-radius: 3rpx;
		border: 1px solid #868686;
		padding: 0rpx 15rpx;
		margin-left: 24rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 16rpx;
	}
	.address .copy{
		font-size: 20rpx;
		color: #868686;
		border-radius: 3rpx;
		border: 1px solid #868686;
		padding: 0rpx 15rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 16rpx;
		position: absolute;
		right: 30rpx;
		top: 20rpx;	
	}
	.order-details .wrapper .actualPay {
		border-top: 1upx solid #eee;
		margin-top: 30upx;
		padding-top: 30upx;
	}
	.order-details .wrapper .actualPay .money {
		font-weight: bold;
		font-size: 30upx;
	}
	.order-details .footer {
		width: 100%;
		height: 100upx;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		padding: 0 30upx;
		border-top: 1px solid #eee;
	}
	.order-details .footer .bnt {
		width: auto;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		line-height: upx;
		border-radius: 50upx;
		color: #fff;
		font-size: 27upx;
		padding: 0 3%;
	}
	.order-details .footer .bnt.cancel {
		color: #aaa;
		border: 1px solid #ddd;
	}
	.order-details .footer .bnt.default {
		color: #444;
		border: 1px solid #444;
	}
	.order-details .footer .bnt~.bnt {
		margin-left: 18upx;
	}
	.pos-order-goods {
		padding: 0 30upx;
		background-color: #fff;
	}
	.pos-order-goods .goods {
		height: 185upx;
		position: relative;
	}
	.pos-order-goods .goods~.goods {
		border-top: 1px dashed #e5e5e5;
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
		width: 365upx;
		height: 130upx;
	}
	.pos-order-goods .goods .picTxt .text .info {
		font-size: 28upx;
		color: #282828;
	}
	.pos-order-goods .goods .picTxt .text .attr {
		font-size: 24upx;
		color: #999;
	}
	.pos-order-goods .goods .money {
		width: 164upx;
		text-align: right;
		font-size: 28upx;
		position: absolute;
		top: 26rpx;
		right: 0;
		color: #999999;
	}
	.pos-order-goods .goods .money .refund_num{
		display: inline-block;
		margin-left: 10rpx;
	}
	.pos-order-goods .goods .x-money {
		color: #FF9600;
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
.upload-img{
	display: flex;
	flex-wrap: wrap;
	margin-top: 20rpx;
	.img-item{
		position: relative;
		width: 156rpx;
		height: 156rpx;
		margin-right: 23rpx;
		margin-top: 20rpx;
		&:nth-child(4n){
			margin-right: 0;
		}
		image{
			width: 156rpx;
			height: 156rpx;
			border-radius: 8rpx;
		}
	}
}
</style>
