<template>
	<view :style="viewColor">
		<view class='flash-sale'>
			<!-- #ifdef H5 -->
			<view v-if='!$wechat.isWeixin()' class="fixed-head">
				<view class="sys-head" :style="{height:statusBarHeight}"></view>
				<view class="tool-bar">
					<view class='iconfont icon-xiangzuo' @tap='goBack'></view>
				</view>
			</view>
			<!-- #endif -->
			<view class="saleBox"></view>
			<view class='header' v-if="timeList.length>0">
				<image :src='timeList[active].pic'></image>
			</view>
			<view class="seckillList acea-row row-between-wrapper">
				<view class="priceTag">
					<image :src="`${domain}/static/diy/priceTag${keyColor}.png`"></image>
				</view>
				<view class='timeLsit'>
					<scroll-view class="scroll-view_x" scroll-x scroll-with-animation  style="width:auto;overflow:hidden;height:106rpx;" :scroll-into-view="intoindex">
						<block v-for="(item,index) in timeList" :key='index'>
							<view @tap='settimeList(item,index)' class='item' :class="active == index?'on':''" :id='"sort"+index'>
								<view class='time'>{{item.time}}</view>
								<view class="state">{{item.state}}</view>
							</view>
						</block>
					</scroll-view>
				</view>
			</view>
			<view class='list'>
				<block v-for="(item,index) in seckillList" :key='index'>
					<view class='item acea-row row-between-wrapper' @tap='goDetails(item)'>
						<view class='pictrue'>
							<image :src='item.image'></image>
						</view>
						<view class='text acea-row row-column-around'>
							<view class='name line1'>{{item.store_name}}</view>
							<view class='money'>￥
								<text class='num'>{{item.price}}</text>
								<text class="y_money">￥{{item.ot_price}}</text>
							</view>
							<view class="limit">限量 <text class="limitPrice">{{item.stock}}{{item.unit_name || ''}}</text></view>
							<view class="progress">
								<view class='bg-reds' :style="'width:'+item.percent+';'"></view>
								<view class='piece'>已抢{{item.percent}}</view>
							</view>
						</view>
						<view class='grab b-color' v-if="status == 1">马上抢</view>
						<view class='grab b-color' v-else-if="status == 2">未开始</view>
						<view class='grab bg-color-hui' v-else>已结束</view>
					</view>
				</block>
			</view>
		</view>
		<view class='noCommodity' v-if="seckillList.length == 0 && (page != 1 || active== 0)">
			<view class='pictrue'>
				<image src='/static/images/noCart.png'></image>
				<view>暂无商品，去看点什么吧</view>
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
	import {
		getSeckillIndexTime,
		getSeckillList
	} from '../../../api/activity.js';
	import home from '@/components/home/index.vue'
	// #ifndef H5
	import passwordPopup from '@/components/passwordPopup';
	// #endif
	import { mapGetters } from "vuex";
	import { configMap } from "@/utils";
	import { HTTP_REQUEST_URL } from '@/config/app';
	export default {
		components: {
			// #ifndef H5
			passwordPopup,
			// #endif
			home
		},
		computed: configMap({statusBarHeight:0},mapGetters(['viewColor','keyColor'])),
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				seckillList: [],
				timeList: [],
				active: 5,
				scrollLeft: 0,
				interval: 0,
				status: 1,
				countDownHour: "00",
				countDownMinute: "00",
				countDownSecond: "00",
				page: 1,
				limit: 8,
				loading: false,
				loadend: false,
				pageloading: false,
				intoindex:''
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
				title: '秒杀活动',
				path: 'pages/activity/goods_seckill/index',
			}
		},
		onShareTimeline: function() {
			return {
				title: '秒杀活动',
				  query: {
				    key: ''
				  },
				  imageUrl: ''
				}      
		},
		// #endif
		onLoad() {
			this.getSeckillConfig();
		},
		methods: {
			goBack: function() {
				uni.navigateBack();
			},
			getSeckillConfig: function() {
				let that = this;
				getSeckillIndexTime().then(res => {
					that.timeList = res.data.seckillTime;
					that.active = res.data.seckillTimeIndex;
					that.$nextTick(()=>{
						that.intoindex = 'sort'+res.data.seckillTimeIndex
					})
					let time;
					that.timeList.map((item) => {
						time = item.start_time > 9 ? item.start_time + ':00' : '0' + item.start_time + ':00';
						item.time = time;
					})
					if (that.timeList.length) {
						// wxh.time(that.data.timeList[that.data.active].stop, that);
						setTimeout(function() {
							that.loading = true
						}, 2000);
						that.seckillList = [],
							that.page = 1
						that.status = that.timeList[that.active].status
						that.getSeckillList();
						// 不用延时 app不会自动滚动到当前时间
						setTimeout(()=>{
							// that.scrollLeft = (that.active - 1.37) * 100
						},500)
					}
				});
			},
			getSeckillList: function() {
				var that = this;
				var data = {
					page: that.page,
					limit: that.limit,
					start_time: that.timeList[that.active].start_time,
					end_time: that.timeList[that.active].end_time
				};
				if (that.loadend) return;
				if (that.pageloading) return;
				this.pageloading = true
				getSeckillList(data).then(res => {
					console.log(res);
					var seckillList = res.data.list;
					seckillList.map((item) => {
						item.percent = item.stock === 0 ? '0%' : (item.sales*100 / item.stock).toFixed(2) + '%';
					})
					var loadend = seckillList.length < that.limit;
					that.page++;
					that.seckillList = that.seckillList.concat(seckillList);
					that.pageloading = false;
					that.loadend = loadend;
				}).catch(err => {
					that.pageloading = false
				});
			},
			settimeList: function(item, index) {
				var that = this;
				this.active = index
				if (that.interval) {
					clearInterval(that.interval);
					that.interval = null
				}
				that.interval = 0;
				that.countDownHour = "00";
				that.countDownMinute = "00";
				that.countDownSecond = "00";
				that.status = that.timeList[that.active].status;
				that.loadend = false;
				that.page = 1;
				that.seckillList = [];
				that.getSeckillList();
			},
			goDetails(item) {
				uni.navigateTo({
					url: '/pages/activity/goods_seckill_details/index?id=' + item.product_id
				})
			}
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getSeckillList();
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5 !important;
	}
	.flash-sale .header {
		width: 710rpx;
		height: 300rpx;
		margin: -215rpx auto 0 auto;
		border-radius: 20rpx;
	}
	.flash-sale .header image {
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
	.flash-sale .seckillList {
		padding: 0 20rpx;
	}
	.flash-sale .seckillList .priceTag {
		width: 76rpx;
		height: 70rpx;
	}
	.flash-sale .seckillList .priceTag image {
		opacity: 1;
	}
	.flash-sale .seckillList .priceTag image {
		width: 100%;
		height: 100%;
	}
	.flash-sale .timeLsit {
		width: 610rpx;
		white-space: nowrap;
		margin: 10rpx 0;
	}
	.flash-sale .timeLsit .item {
		display: inline-block;
		font-size: 20rpx;
		color: #666;
		text-align: center;
		padding: 11rpx 0;
		box-sizing: border-box;
		height: 96rpx;
		margin-right: 35rpx;
	}
	.flash-sale .timeLsit .item .time {
		font-size: 36rpx;
		font-weight: 600;
		color: #333;
	}
	.flash-sale .timeLsit .item.on .time {
		color: var(--view-theme);
	}
	.flash-sale .timeLsit .item.on .state {
		width: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 30rpx;
		border-radius: 15rpx;
		background-image: linear-gradient(90deg, var(--view-bntColor11) 0%, var(--view-bntColor12) 100%);
		color: #fff;
	}
	.flash-sale .countDown {
		height: 92rpx;
		border-bottom: 1px solid #f0f0f0;
		margin-top: -14rpx;
		font-size: 28rpx;
		color: #282828;
	}
	.flash-sale .countDown .num {
		font-size: 28rpx;
		font-weight: bold;
		background-color: #ffcfcb;
		padding: 4rpx 7rpx;
		border-radius: 3rpx;
	}
	.flash-sale .countDown .text {
		font-size: 28rpx;
		color: #282828;
		margin-right: 13rpx;
	}
	.flash-sale .list .item {
		height: 230rpx;
		position: relative;
		width: 710rpx;
		margin: 0 auto 20rpx auto;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 0 25rpx;
	}
	.flash-sale .list .item .pictrue {
		width: 180rpx;
		height: 180rpx;
		border-radius: 10rpx;
	}
	.flash-sale .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}
	.flash-sale .list .item .text {
		width: 460rpx;
		font-size: 30rpx;
		color: #333;
		height: 166rpx;
	}
	.flash-sale .list .item .text .name {
		width: 100%;
	}
	.flash-sale .list .item .text .money {
		font-size: 30rpx;
		color: var(--view-priceColor);
	}
	.flash-sale .list .item .text .money .num {
		font-size: 40rpx;
		font-weight: 500;
	}
	.flash-sale .list .item .text .money .y_money {
		font-size: 24rpx;
		color: #999;
		text-decoration-line: line-through;
		margin-left: 15rpx;
	}
	.flash-sale .list .item .text .limit {
		font-size: 22rpx;
		color: #999;
		margin-bottom: 5rpx;
	}
	.flash-sale .list .item .text .limit .limitPrice {
		margin-left: 10rpx;
	}
	.flash-sale .list .item .text .progress {
		overflow: hidden;
		background-color: var(--view-bgColor);
		width: 260rpx;
		border-radius: 18rpx;
		height: 18rpx;
		position: relative;
	}
	.flash-sale .list .item .text .progress .bg-reds {
		width: 0;
		height: 100%;
		transition: width 0.6s ease;
		background: linear-gradient(90deg, var(--view-bntColor11) 0%, var(--view-bntColor12) 100%);
	}
	.flash-sale .list .item .text .progress .piece {
		position: absolute;
		left: 8%;
		transform: translate(0%, -50%);
		top: 49%;
		font-size: 16rpx;
		color: var(--view-theme);
	}
	.flash-sale .list .item .grab {
		font-size: 28rpx;
		color: #fff;
		width: 150rpx;
		height: 54rpx;
		border-radius: 27rpx;
		text-align: center;
		line-height: 54rpx;
		position: absolute;
		right: 30rpx;
		bottom: 30rpx;
		background: #bbbbbb;
		&.b-color {
			background: var(--view-theme);
		}
	}
	.flash-sale .saleBox {
		width: 100%;
		height: 230rpx;
		background: var(--view-theme);
		border-radius: 0 0 50rpx 50rpx;
	}
	.tool-bar{
		display: flex;
		align-items: center;
		height: 40px;
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
