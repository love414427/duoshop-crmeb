<template>
	<view>
		<view class='logistics'>
			<view class='logisticsCon'>
				<view class='company acea-row row-between-wrapper'>
					<view class='picTxt acea-row row-between-wrapper'>
						<view class='iconfont icon-wuliu'></view>
						<view class='text'>
							<view><text class='name line1'>物流公司：</text> {{orderInfo.delivery_type}}</view>
							<view class='express line1'><text class='name'>快递单号：</text> {{orderInfo.delivery_id}}</view>
						</view>
					</view>
					<!-- #ifndef H5 -->
					<view class='copy' @tap='copyOrderId'>复制单号</view>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<view class='copy copy-data' :data-clipboard-text="orderInfo.delivery_id">复制单号</view>
					<!-- #endif -->
				</view>
				<view class='item' v-for="(item,index) in expressList" :key="index">
					<view class='circular' :class='index === 0 ? "on":""'></view>
					<view class='text' :class='index===0 ? "on-font on":""'>
						<view>{{item.status}}</view>
						<view class='data' :class='index===0 ? "on-font on":""'>{{item.time}}</view>
					</view>
				</view>
			</view>
			<recommend v-if="recommend_switch == 1" :hostProduct='hostProduct' :isLogin="isLogin"></recommend>
		</view>
		<authorize :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
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
		refundExpress
	} from '@/api/order.js';
	import {
		getProductHot
	} from '@/api/store.js';
	import ClipboardJS from "@/plugin/clipboard/clipboard.js";
	import {
		mapGetters
	} from "vuex";
	import { configMap } from '@/utils';
	import recommend from '@/components/recommend';
	import authorize from '@/components/Authorize';
	export default {
		components: {
			recommend,
			authorize
		},
		data() {
			return {
				orderId: '',
				product: {},
				orderInfo: {},
				expressList: [],
				hostProduct: []
			};
		},
		computed: configMap({recommend_switch:0},mapGetters(['isLogin'])),
		onLoad: function (options) {
		    if (!options.orderId) return this.$util.Tips({title:'缺少订单号'});
			this.orderId = options.orderId;
			if (this.isLogin) {
				this.getExpress();
				this.get_host_product();
			} else {
                this.isAuto = true;
                this.isShowAuth = true
			}
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
			 * 授权回调
			 */
			onLoadFun: function() {
				this.getExpress();
				this.get_host_product();
			},
            // 授权关闭
            authColse: function(e) {
                this.isShowAuth = e;
            },
			copyOrderId:function(){
			    uni.setClipboardData({ data: this.orderInfo.delivery_id });
			  },
			  getExpress:function(){
			    let that=this;
			    refundExpress(that.orderId).then(function(res){
				  that.$set(that, 'expressList', res.data.express || []);
				  that.$set(that, 'orderInfo', res.data.refund);
			    });
			  },
			  /**
			* 获取我的推荐
			*/
			  get_host_product: function () {
			    let that = this;
			    let data = { offset: 1, limit: 10 }
			    getProductHot().then(function (res) {
					that.$set(that,'hostProduct',res.data.list);
			    });
			  },
		},
		// 滚动监听
		onPageScroll() {
			uni.$emit('scroll');
		},
	}
</script>

<style scoped lang="scss">
	.logistics .header {
		padding: 23rpx 30rpx;
		background-color: #fff;
		height: 166rpx;
		box-sizing: border-box;
	}

	.logistics .header .pictrue {
		width: 120rpx;
		height: 120rpx;
	}

	.logistics .header .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.logistics .header .text {
		width: 540rpx;
		font-size: 28rpx;
		color: #999;
		margin-top: 6rpx;
	}

	.logistics .header .text .name {
		width: 365rpx;
		color: #282828;
	}

	.logistics .header .text .money {
		text-align: right;
	}

	.logistics .logisticsCon {
		background-color: #fff;
		margin: 12rpx 0;
	}

	.logistics .logisticsCon .company {
		height: 120rpx;
		margin: 0 0 45rpx 30rpx;
		padding-right: 30rpx;
		border-bottom: 1px solid #f5f5f5;
	}

	.logistics .logisticsCon .company .picTxt {
		width: 520rpx;
	}

	.logistics .logisticsCon .company .picTxt .iconfont {
		width: 50rpx;
		height: 50rpx;
		background-color: #666;
		text-align: center;
		line-height: 50rpx;
		color: #fff;
		font-size: 35rpx;
	}

	.logistics .logisticsCon .company .picTxt .text {
		width: 450rpx;
		font-size: 26rpx;
		color: #282828;
	}

	.logistics .logisticsCon .company .picTxt .text .name {
		color: #999;
	}

	.logistics .logisticsCon .company .picTxt .text .express {
		margin-top: 5rpx;
	}

	.logistics .logisticsCon .company .copy {
		font-size: 20rpx;
		width: 120rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		border-radius: 3rpx;
		border: 1px solid #999;
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
		background-color: #e93323;
	}

	.logistics .logisticsCon .item .text.on-font {
		color: #e93323;
	}

	.logistics .logisticsCon .item .text .data.on-font {
		color: #e93323;
	}

	.logistics .logisticsCon .item .text {
		font-size: 26rpx;
		color: #666;
		width: 615rpx;
		border-left: 1rpx solid #e6e6e6;
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
