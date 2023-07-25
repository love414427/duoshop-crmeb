<template>
	<view :style="viewColor" class="page-container">
		<view class='flash-sale'>
			<view class="fixed-head">
				<!-- <view class="sys-head" :style="{height:statusBarHeight}"></view> -->
				<view class="tool-bar">
					<!--#ifdef H5-->
					<view class='iconfont icon-xiangzuo' @tap='goBack'></view>
					<!--#endif-->
				</view>
			</view>
			<view class='head' :style="{ 'background-image': `url(${domain}/static/diy/selection${keyColor}.jpg)` }">
				<!-- <view class="sys-head" :style="{height:statusBarHeight}"></view> -->
				<view class="tool-bar"></view>
			</view>
			<view class="main_count">
				<view class='list'>
					<block v-for="(item,index) in goodsList" :key='index'>
						<view class='item acea-row row-between-wrapper' @tap='goDetails(item)'>
							<view class='pictrue'>
								<image :src='item.image'></image>
							</view>
							<view class='text acea-row row-column-around'>
								<view class='name line1'>{{item.store_name}}</view>
								<view class='booking'>
									<view class="count">
										<image class="image" :src="`${domain}/static/images/jf-point.png`" mode="widthFix"></image>
										<view class="price-box">
											<text>{{ item.ot_price }}</text>积分
										</view>
										<view v-if="item.price>0" class="sales">+{{parseFloat(Number(item.price).toFixed(2))}}元</view>
									</view>
								</view>
								<view class="exchange">
									<view class="count">{{item.sales}}人兑换</view>
									<view class='order_btn'>去兑换</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
		<home></home>
		<!-- #ifndef H5 -->
		<passwordPopup></passwordPopup>
		<!-- #endif -->
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
	
	import { getIntegralGoodsList } from '@/api/points_mall.js';
	import home from '@/components/home/index.vue'
	import { configMap } from "@/utils";
	import { HTTP_REQUEST_URL } from '@/config/app';
	// #ifndef H5
	import passwordPopup from '@/components/passwordPopup';
	// #endif
	import { mapGetters } from "vuex";
	let app = getApp();
	export default {
		components: {
			// #ifndef H5
			passwordPopup,
			// #endif
			home,
		},
		computed: configMap({statusBarHeight:0},mapGetters(['viewColor','keyColor'])),
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				goodsList: [],
				status: 1,
				page: 1,
				limit: 8,
				loading: false,
				loadend: false,
				pageloading: false,
			}
		},
		/**
		 * 用户点击右上角分享
		 */
		// #ifdef MP
		onShareAppMessage: function() {
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
			return {
				title: '好物精选',
				path: 'pages/points_mall/goodSelection',
			}
		},
		onShareTimeline: function() {
			return {
				title: '好物精选',
				query: {
					key: ''
				},
				imageUrl: ''
			}
		},
		// #endif
		onLoad() {
			this.getSelectionList('');
		},
		methods: {
			goBack: function() {
				uni.navigateBack();
			},
			getSelectionList: function() {
				var that = this;
				var data = {
					page: that.page,
					limit: that.limit,
					is_hot: 1
				};
				if (that.pageloading) return;
				this.pageloading = true
				getIntegralGoodsList(data).then(res => {
					var goodsList = res.data.list;
					that.page++;
					that.goodsList = that.goodsList.concat(goodsList),
					that.page = that.page;
					that.pageloading = false;
				}).catch(err => {
					that.pageloading = false
				});
			},
			goDetails(item) {
				uni.navigateTo({
					url: '/pages/points_mall/integral_goods_details?id=' + item.product_id
				})
			}
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getSelectionList();
		},
		// 滚动监听
		onPageScroll(e) {
			
		}
	}
</script>

<style lang="scss">
	.page-container{
		min-height: 100vh;
		background-color: var(--view-theme);
	}
	.icon-xiangzuo {
		margin-left: 20rpx;
		font-size: 40rpx;
		color: #fff;
	}
	.head {
		display: flex;
		flex-direction: column;
		/* #ifdef MP || APP-PLUS */
		height: 300rpx;
		/* #endif */
		/* #ifdef H5 */
		height: 300rpx;
		/* #endif */
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 100%;
	}
	.noCommodity {
		border-top: none;
	}
	.flash-sale .header {
		width: 100%;
		position: relative;
	}
	.flash-sale .main_count {
		position: relative;
		top: -40rpx;
	}
	.flash-sale .timeList {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
	}
	.flash-sale .timeList .item {
		font-size: 20rpx;
		color: #666;
		text-align: center;
		box-sizing: border-box;
		width: 224rpx;
	}
	.flash-sale .timeList .item .time {
		font-size: 26rpx;
		color: #AAAAAA;
	}
	.flash-sale .timeList .item.on .time {
		color: #FD6523;
		font-weight: 600;
		span {
			position: relative;  
			&::after {
				content: '';
				display: inline-block;
				width: 100%;
				height: 4rpx;
				background: #FD6523;
				position: absolute;
				left: 0;
				bottom: -4rpx;
				border-radius: 2rpx;
			}
		}
	}
	.flash-sale .list {
		margin-top: 24rpx;
	}
	.flash-sale .list .item {
		height: 278rpx;
		position: relative;
		width: 90%;
		margin: 0 auto 20rpx auto;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 0 25rpx;
	}
	.flash-sale .list .item .pictrue {
		width: 220rpx;
		height: 220rpx;
		border-radius: 16rpx;
	}
	.flash-sale .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.flash-sale .list .item .text {
		width: 390rpx;
		font-size: 30rpx;
		color: #333;
	}
	.flash-sale .list .item .text .name {
		width: 100%;
		color: #282828;
		font-weight: bold;
		font-size: 28rpx;
	}
	.flash-sale .list .item .text .booking {
		margin-top: 17rpx;
	}
	.flash-sale .list .item .text .booking .count {
		display: flex;
		margin-top: 8rpx;
		align-items: baseline;
		.image{
			width: 26rpx;
			height: 26rpx;
			margin-right: 10rpx;
			border-radius: 0;
		}
		.price-box {
			font-size: 22rpx;
			color: var(--view-theme);
			text{
				font-size: 34rpx;
			}
		}
		.sales {
			font-size: 22rpx;
			color: var(--view-theme);
		}	
	}
	.flash-sale .list .item .exchange{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 40rpx;
		.count{
			color: #666666;
			font-size: 26rpx;
		}
		.order_btn{
			width: 140rpx;
			height: 56rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #FFF3E5;
			border-radius: 30rpx;
			color: #FF8C00;
			font-size: 26rpx;
		}
	}
	.fixed-head{
		position: absolute;
		left: 0;
		top: 20px;
		width: 100%;
		z-index: 10;
		.icon-xiangzuo {
			margin-right: 40rpx;
			margin-left: 20rpx;
			font-size: 40rpx;
			color: #fff;
		}
	}
</style>