<template>
	<view>
		<view class='logistics'>
			<view class='logisticsCon'>
				<view class='company'>
					<view v-if="status == 0 || status == 2" class="order_head">
						<view class="order_number">{{status == 0 ? '待接单' : '待取货'}}</view>
						<view class="">等待配送员接单完成后开始派送</view>
					</view>
					<view v-if="code && (status != 0 && status != 2)" class="order_head">
						<view class="order_number">{{code}}</view>
						<view>稍后请将收货码告诉配送员</view>
					</view>
					<view class="order_delivery">
						<view class="delivery_info">
							<view class="delivery_pic">
								<image :src="`${domain}/static/images/delivery_man.png`"></image>
							</view>
							<view v-if="deliveryInfo.delivery_id" class="delivery_name">
								<view>{{deliveryInfo.delivery_name}}<br/>{{deliveryInfo.delivery_id}}</view>
							</view>
							<view v-else class="delivery_name_not">配送员未接单</view>
						</view>
						<view class="delivery_phone iconfont" @click="call">&#xe634;</view>
					</view>
				</view>
				<view class="order_logistic">
					<view class="recip_info">
						<view class="title">收件人信息</view>
						<view>
							<view class='items acea-row row-between'>
								<view>姓名：</view>
								<view class='conter'>{{deliveryInfo.real_name}}</view>
							</view>
							<view class='items acea-row row-between'>
								<view>手机号：</view>
								<view class='conter'>{{deliveryInfo.user_phone}}</view>
							</view>
							<view class='items acea-row row-between'>
								<view>地址：</view>
								<view class='conter'>{{deliveryInfo.user_address}}</view>
							</view>
						</view>
					</view>
					<view class="logistic_count">
						<view class='item' v-for="(item,index) in expressList" :key="index">
							<view class='circular' :class='index === 0 ? "on iconfont icon-xuanzhong1":""'></view>
							<view class='text' :class='index===0 ? "on-font on":""'>
								<view>{{item.change_message}}</view>
								<view class='data' :class='index===0 ? "on-font on":""'>{{item.change_time}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
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
		develiveryDetail
	} from '@/api/order.js';
	import { mapGetters } from "vuex";
	import { HTTP_REQUEST_URL } from '@/config/app';
	import authorize from '@/components/Authorize';
	export default {
		components: {
			authorize
		},
		data() {
			return {
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				orderId: '',
				code: '',
				status: 0,
				deliveryInfo: {},
				expressList: [],
				domain: HTTP_REQUEST_URL,

			};
		},
		computed: mapGetters(['isLogin']),
		onLoad: function (options) {
		    if (!options.orderId) return this.$util.Tips({title:'缺少订单号'});
			this.orderId = options.orderId;
			if (this.isLogin) {
				this.getExpress();
			} else {
                this.isAuto = true;
                this.isShowAuth = true
			}
		  },
		  onReady: function() {

		  },
		methods: {
			/**
			 * 授权回调
			 */
			onLoadFun: function() {
				this.getExpress();
				this.isShowAuth = false;
			},
			// 授权关闭
			authColse: function(e) {
					this.isShowAuth = e;
			},
			getExpress:function(){
				let that=this;
				develiveryDetail(that.orderId).then(function(res){
					let result = res.data.storeOrderStatus || {};
				that.$set(that,'deliveryInfo',res.data.storeOrder);
				that.$set(that,'code',res.data.finish_code);
				that.$set(that,'status',res.data.status);
				that.$set(that,'expressList',result || []);
				});
			},
			/**
			 * 拨打电话
			 */
			call: function() {
				uni.makePhoneCall({
					phoneNumber: this.deliveryInfo.delivery_id
				})
			},
		},
	}
</script>

<style scoped lang="scss">
	.logistics{
		padding: 0 30rpx;
	}
	.order_head {
		text-align: center;
		color: #282828;
		font-size: 24rpx;
		border-bottom: 1px dashed #D8D8D8;
		padding-bottom: 40rpx;
		.order_number{
			font-size: 66rpx;
			font-weight: bold;
		}
	}
	.order_delivery {
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.delivery_info{
			width: 300rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.delivery_name {
				color: #666666;
				&_not {
					font-weight: bold;
				}
			}
			image,uni-image {
				width: 80rpx;
				height: 80rpx;
			}

		}
		.delivery_phone {
			width: 44rpx;
			height: 44rpx;
			border-radius: 100%;
			background: #E7E7E7;
			text-align: center;
			line-height: 44rpx;
			font-size: 20rpx;
			color: #666;
		}
	}
	.logistics .logisticsCon {
		margin: 12rpx 0;
	}
	.logistics .logisticsCon .company {
		background-color: #fff;
		padding: 30rpx 0;
		border-radius: 16rpx;
	}
	.order_logistic{
		background-color: #fff;
		margin-top: 30rpx;
		border-radius: 16rpx;
		padding: 30rpx;
	}
	.recip_info {
		border-bottom: 1px dashed #D8D8D8;
		padding-bottom: 30rpx;
	}
	.recip_info .title {
		font-size: 30rpx;
		font-weight: bold;
		color: #282828;
		margin-bottom: 30rpx;
	}
	.recip_info .items~.items {
		margin-top: 24rpx;
	}
	.recip_info .items .conter {
		color: #868686;
		width: 460rpx;
		text-align: right;
	}
	.logistic_count {
		margin-top: 30rpx;
	}
	.logistics .logisticsCon .item {
		padding: 0 40rpx;
		position: relative;
	}
	.logistics .logisticsCon .item .circular {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		position: absolute;
		top: -1rpx;
		left: 31.5rpx;
		background-color: #ddd;
	}
	.logistics .logisticsCon .item .circular.on {
		color: #e93323;
		background-color: transparent;
		font-size: 30rpx;
		left: 30rpx;
	}
	.logistics .logisticsCon .item .text.on-font {
		color: #282828;
		font-size: 30rpx;
		font-weight: bold;
	}
	.logistics .logisticsCon .item .text .data.on-font {
		color: #282828;
		font-weight: normal;
	}
	.logistics .logisticsCon .item .text {
		font-size: 26rpx;
		color: #666;
		width: 615rpx;
		border-left: 1px solid #e6e6e6;
		padding: 0 0 60rpx 38rpx;
	}
	.logistics .logisticsCon .item .text.on {
		border-left-color: #f8c1bd;
	}
	.logistics .logisticsCon .item .text .data {
		font-size: 24rpx;
		color: #999;
		margin-top: 10rpx;
	}
	.logistics .logisticsCon .item .text .data .time {
		margin-left: 15rpx;
	}
</style>
