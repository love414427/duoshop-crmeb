<template>
	<view class="order-details pos-order-details">
		<view class="header acea-row row-middle">
			<view class="state">{{ title }}</view>
			<view class="data">
				<view class="order-num">订单：{{ orderInfo.order_sn }}</view>
				<view>
					<span class="time">{{ orderInfo.create_time }}</span>
				</view>
			</view>
		</view>
		<view class="remarks acea-row" v-if="goname != 'looks'" style="align-items: center;">
			<span class="iconfont icon-zhinengkefu-"></span>
			<view class="line1" style="text-align: left; flex: 1; margin-left: 10rpx;" @click="modify('1')">
				 {{orderInfo.remark ? orderInfo.remark : '订单未备注，点击添加备注信息'}}
			</view>
		</view>
		<view class="orderingUser acea-row row-middle">
			<span class="iconfont icon-yonghu2"></span>{{ (orderInfo.user && orderInfo.user.nickname) || ''  }}
		</view>
		<view class="address">
			<view class="name">
				{{ orderInfo.real_name }}<span class="phone">{{ orderInfo.user_phone }}</span>
			</view>
			<view>{{ orderInfo.user_address }}</view>
			<!-- #ifdef H5 -->
			<button class="copy copy-data" :data-clipboard-text="'收货人姓名：'+orderInfo.real_name+'\n收货人电话：'+ orderInfo.user_phone+'\n收货人地址：'+orderInfo.user_address">复制</button>
			<!-- #endif -->
			<!-- #ifdef MP || APP-PLUS -->
			<button class="copy" @tap="copyText">复制</button>
			<!-- #endif -->
		</view>
		<view class="line">
			<image :src="`${domain}/static/images/line.jpg`" />
		</view>
		<view class="pos-order-goods">
			<navigator :url="`/pages/goods_details/index?id=${item.cart_info.product.product_id}`" hover-class="none" class="goods" v-for="(item, index) in orderInfo.orderProduct" :key="index">
				<view class="acea-row row-between-wrapper">
					<view class="picTxt acea-row row-between-wrapper">
						<view class="pictrue">
							<image :src="item.cart_info.productAttr.image || item.cart_info.product.image" />
						</view>
						<view class="text acea-row row-between row-column">
							<view class="info line2">
								{{ item.cart_info.product.store_name }}
							</view>
							<view class="attr">{{ item.cart_info.product.suk }}</view>
						</view>
					</view>
					<view class="money">
						<view class="x-money">￥{{ item.cart_info.productAttr.price }}</view>
						<view class="num">x{{ item.product_num }}
							<text class="font-color refund_num" v-if="item.product_num-item.refund_num>0">(-{{item.product_num-item.refund_num}})</text>
						</view>
						<view v-if="orderInfo.order_type == 0" class="y-money">￥{{ item.cart_info.productAttr.ot_price }}</view>	
					</view>
				</view>
			</navigator>
		</view>
		<view class="public-total">
			共{{ orderInfo.total_num }}件商品，已支付
			<span class="money">￥{{ orderInfo.pay_price }}</span> ( 邮费 ¥{{orderInfo.pay_postage}})
		</view>
		<view class="wrapper">
			<view class="item acea-row row-between">
				<view>订单编号：</view>
				<view class="conter acea-row row-middle row-right">
					{{ orderInfo.order_sn }}
					<!-- #ifdef H5 -->
					<button class="copy copy-data" :data-clipboard-text="orderInfo.order_sn">复制</button>
					<!-- #endif -->
					<!-- #ifdef MP || APP-PLUS -->
					<span class="copy copy-data" @click="copyNum(orderInfo.order_sn)">复制</span>
					<!-- #endif -->
				</view>
			</view>
			<view class="item acea-row row-between">
				<view>下单时间：</view>
				<view class="conter">{{ orderInfo.create_time }}</view>
			</view>
			<view class="item acea-row row-between">
				<view>支付状态：</view>
				<view class="conter">
					{{ orderInfo.paid == 1 ? "已支付" : "未支付" }}
				</view>
			</view>
			<view class="item acea-row row-between">
				<view>支付方式：</view>
				<view class="conter">{{ orderInfo.pay_type == 0 ? "余额支付" : (orderInfo.pay_type == 1 || orderInfo.pay_type == 2 || orderInfo.pay_type == 3) ? "微信支付" : "支付宝支付" }}</view>
			</view>
			<view class="item acea-row row-between">
				<view>买家留言：</view>
				<view class="conter">{{ orderInfo.mark }}</view>
			</view>
		</view>
		<view v-if="orderInfo.is_virtual == 1" class='wrapper'>
			<view v-for="(item,index) in orderInfo.order_extend" v-if="item && index" :key="index" class='item acea-row row-between'>
				<view>{{index}}：</view>
				<view v-if="!Array.isArray(item)" class='conter'>{{item}}</view>
				<view v-else class='conter virtual_image'>
					<image v-for="(pic,i) in item" :key="i" class="picture" :src="pic" @click="getPhotoClickIdx(item,i)"></image>
				</view>
			</view>
		</view>
		<view class="wrapper">
			<view class="item acea-row row-between">
				<view>支付金额：</view>
				<view class="conter">￥{{ orderInfo.total_price }}</view>
			</view>
			<view v-if="orderInfo.coupon_price > 0" class="item acea-row row-between">
				<view>优惠券抵扣：</view>
				<view class="conter">-￥{{ orderInfo.coupon_price }}</view>
			</view>
			<view v-if="orderInfo.integral_price > 0" class="item acea-row row-between">
				<view>积分抵扣：</view>
				<view class="conter">-￥{{ orderInfo.integral_price }}</view>
			</view>
			<view v-if="orderInfo.pay_postage > 0" class="item acea-row row-between">
				<view>运费：</view>
				<view class="conter">￥{{ orderInfo.pay_postage }}</view>
			</view>
			<view class="actualPay acea-row row-right">
				实付款：<span class="money font-color-red">￥{{ orderInfo.pay_price }}</span>
			</view>
		</view>
		<view class="wrapper" v-if="orderInfo.delivery_type != '3' && orderInfo.order_type === 0 && orderInfo.delivery_type">
			<view v-if="orderInfo.delivery_type != '6'" class="item acea-row row-between">
				<view>配送方式：</view>
				<view class="conter" v-if="orderInfo.delivery_type === '1' || orderInfo.delivery_type === '4'">
					快递
				</view>
				<view class="conter" v-if="orderInfo.delivery_type === '2'">送货</view>
			</view>
			<view class="item acea-row row-between">
				<view v-if="orderInfo.delivery_type === '1' || orderInfo.delivery_type === '4'">快递公司：</view>
				<view v-if="orderInfo.delivery_type === '2'">送货人：</view>
				<view v-if="orderInfo.delivery_type === '6'">发货方式：</view>
				<view class="conter line1">{{ orderInfo.delivery_name ? orderInfo.delivery_name : '' }}</view>
			</view>
			<view class="item acea-row row-between">
				<view v-if="orderInfo.delivery_type === '1' || orderInfo.delivery_type === '4'">快递单号：</view>
				<view v-if="orderInfo.delivery_type === '2'">送货人电话：</view>
				<view v-if="orderInfo.delivery_type === '6'">卡密信息：</view>
				<view class="conter" style="display: flex;">
					<text>{{ orderInfo.delivery_id ? orderInfo.delivery_id : ''}}</text>
					<!-- #ifndef H5 -->
					<text class='copy' @tap='copyKm'>复制</text>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<text class="copy copy-data" :data-clipboard-text="orderInfo.delivery_id">复制</text>
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view style="height:120upx;"></view>
		<view class="footer acea-row row-right row-middle" v-if="goname != 'looks'">
			<view class="more"></view>
			<view class="bnt cancel" @click="modify('0')" v-if="orderInfo.paid == 0">
				一键改价
			</view>
			<view class="bnt cancel" @click="modify('0')" v-if="types == -1">
				立即退款
			</view>
			<view class="bnt cancel" @click="modify('1')">订单备注</view>
			<view class="bnt cancel" v-if="orderInfo.pay_type === 'offline' && orderInfo.paid === 0" @click="offlinePay">
				确认付款
			</view>
			<navigator class="bnt delivery" v-if="orderInfo.paid == 1 && orderInfo.status == 0 && orderInfo.order_type == 0" :url="'/pages/admin/delivery/index?id='+orderInfo.order_id+'&merId='+mer_id">去发货</navigator>
			<view class="bnt delivery" v-if="orderInfo.paid == 1 && (orderInfo.status == 0 || orderInfo.status == 9) && orderInfo.order_type == 1" @click="goCancellation">去核销</view>
		</view>
		<PriceChange :change="change" :orderInfo="orderInfo" v-on:closechange="changeclose($event)" v-on:savePrice="savePrice"
		 :status="status"></PriceChange>
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
	import PriceChange from "@/components/PriceChange";
	// #ifdef H5
	import ClipboardJS from "@/plugin/clipboard/clipboard.js";
	// #endif
	import {
		getAdminOrderDetail,
		setAdminOrderPrice,
		setAdminOrderRemark,
		setOfflinePay,
		setOrderRefund,
		orderCancellation
	} from "@/api/admin";
	import { isMoney } from '@/utils/validate.js'
	import { HTTP_REQUEST_URL } from '@/config/app';
	export default {
		name: "AdminOrder",
		components: {
			PriceChange
		},
		props: {},
		data: function() {
			return {
				order: false,
				change: false,
				order_id: "",
				mer_id: '',
				orderInfo: {
					_status: {},
					user: {}
				},
				domain: HTTP_REQUEST_URL,
				status: "",
				title: "",
				payType: "",
				types: "",
				clickNum: 1,
				goname:''
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
				this.change = msg;
			},
			// 图片预览
			getPhotoClickIdx(list, idx) {
				uni.previewImage({
					current: list[idx], //  传 Number H5端出现不兼容 
					urls: list
				});
			},
			/**
			 *
			 * 剪切卡密内容
			 */
			// #ifndef H5
			copyKm: function() {
				let that = this;
				uni.setClipboardData({
					data: that.orderInfo.delivery_id,
					success: function(res){
					}
				});
			},
			// #endif
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
			    // console.log(`${arr.map(item =>`${item.name}: ${item.value}`).join("\n")}`)
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
				getAdminOrderDetail(that.mer_id,that.order_id).then(
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
			/*核销订单*/
			goCancellation() {
				let that = this;
				uni.navigateTo({
					url: '/pages/admin/cancellate_result/index?mer_id='+that.mer_id+'&code='+that.orderInfo.verify_code,
				})
				// uni.showModal({
				// 	title: '订单核销',
				// 	content: '请确认是否核销该订单？',
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			orderCancellation(that.mer_id,that.orderInfo.order_id).then(res => {
				// 				return that.$util.Tips({
				// 					title: '操作成功',
				// 					icon: 'success'
				// 				}, function() {
				// 					that.getIndex();
				// 				});
				// 			}).catch(err => {
				// 				return that.$util.Tips({
				// 					title: err
				// 				});
				// 			})
				// 		}
				// 	}
				// })
			},
			async savePrice(opt) {
				let that = this,
					data = {},
					price = opt.price,
					refund_price = opt.refund_price,
					refund_status = that.orderInfo.refund_status,
					remark = opt.remark;
				data.order_id = that.orderInfo.order_id;
				if (that.status == 0) {
					// if (!isMoney(price)) {
					// 	return that.$util.Tips({
					// 		title: '请输入正确的金额'
					// 	});
					// }
					data.price = price;
					let parmas = {
						 pay_postage: opt.orderInfo.pay_postage,
						 coupon_price: opt.orderInfo.coupon_price,
						 total_price: Number(opt.orderInfo.total_price)
					}
					setAdminOrderPrice(that.mer_id,data.order_id, parmas ).then(
						res => {
							that.change = false;
							that.$util.Tips({
								title: '改价成功',
								icon: 'success'
							})
							that.getIndex();
						},
						err => {
							console.log(err, 'err')
							that.change = false;
							that.$util.Tips({
								title: err
							});
						}
					);
				} else if (that.status == 0 && refund_status === 1) {
					if (!isMoney(refund_price)) {
						return that.$util.Tips({
							title: '请输入正确的金额'
						});
					}
					data.price = refund_price;
					data.type = opt.type;
					setOrderRefund(that.mer_id,data).then(
						res => {
							that.change = false;
							that.$util.Tips({
								title: res.message
							});
							that.getIndex();
						},
						err => {
							console.log(err, 'err')
							that.change = false;
							that.$util.Tips({
								title: err
							});
						}
					);
				} else {
					if (!remark) {
						return this.$util.Tips({
							title: '请输入备注'
						})
					}
					// data.remark = remark;
					console.log(data);
					setAdminOrderRemark(that.mer_id,data.order_id,{ remark: remark }).then(
						res => {
							that.change = false;
							this.$util.Tips({
								title: res.message,
								icon: 'success'
							})
							that.getIndex();
						},
						err => {
							that.change = false;
							that.$util.Tips({
								title: err
							});
						}
					);
				}
			},
			offlinePay: function() {
				setOfflinePay(this.mer_id,{
					order_id: this.orderInfo.order_id
				}).then(
					res => {
						this.$util.Tips({
							title: res.msg,
							icon: 'success'
						});
						this.getIndex();
					},
					err => {
						this.$util.Tips({
							title: err
						});
					}
				);
			},

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

			// #ifdef H5
			webCopy(item, index) {
				console.log('yunxingle')
				let items = item
				let indexs = index
				let self = this

				if (self.clickNum == 1) {
					console.log('22')
					self.clickNum += 1
					self.webCopy(items, indexs)
				}
			}
			// #endif
		}
	};
</script>

<style lang="scss">
	/*商户管理订单详情*/
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

	/*订单详情*/
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

	/* .order-details .header .data .time{margin-left:20upx;} */
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
		max-width: 450rpx;
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
		position: relative;
	}

	.pos-order-goods .goods {
		padding: 20rpx 0;
		overflow: hidden;
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
	}
	.pos-order-goods .goods .money .refund_num{
		display: inline-block;
		margin-left: 10rpx;
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
	.public-total {
		font-size: 28upx;
		color: #282828;
		border-top: 1px solid #eee;
		height: 92upx;
		line-height: 92upx;
		text-align: right;
		padding: 0 30upx;
		background-color: #fff;
	}

	.public-total .money {
		color: #ff4c3c;
	}
</style>
