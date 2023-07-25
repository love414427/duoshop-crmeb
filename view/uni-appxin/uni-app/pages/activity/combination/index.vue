<template>
	<view :style="viewColor" class="page-container">
		<view class='flash-sale'>
			<view class="fixed-head">
				<view class="sys-head" :style="{height:statusBarHeight}"></view>
				<view class="tool-bar">
					<!--#ifdef H5-->
					<view v-if='!$wechat.isWeixin()' class='iconfont icon-xiangzuo' @tap='goBack'></view>
					<!--#endif-->
					<user-name-swiper class="name-swiper" :style="'top:'+ (navH/2) +'rpx'" :combinationUserList="combinationUserList"></user-name-swiper>
				</view>
			</view>
			<view class='head' :style="{ 'background-image': `url(${domain}/static/diy/combination${keyColor}.png)` }">
				<view class="sys-head" :style="{height:statusBarHeight}"></view>
				<view class="tool-bar"></view>
				<view class='header'>
					<view class="success_per">
						<view class="success_num">{{combinationUserCount}}人已参与拼团</view>
						<view class="activity_pic" v-if="combinationUserList.length > 0">
							<view v-for="(item,index) in combinationUserList.slice(0,10)" class="picture" :key="index">							
								<image v-if="index != 9" class="avatar" :src='item.avatar ? item.avatar : "/static/images/f.png"'></image>
								<span v-else class="avatar" style="background:#fff;"><text class="iconfont icon-gengduo1"></text></span>							
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="main_count">
				<tabNav class="tabNav" :class="{'fixed':isFixed}" :tabTitle="navTop" @changeTab='changeTab'></tabNav>
				<view class='list'>
					<block v-for="(item,index) in combinationList" :key='index'>
						<view class='item acea-row row-between-wrapper' @tap='goDetails(item)'>
							<view class='pictrue'>
								<image :src='item.product.image'></image>
							</view>
							<view class='text acea-row row-column-around'>
								<view class='name line1'>{{item.product.store_name}}</view>
								<view class='booking'>
									<text class="count">
										<text class="iconfont icon-pintuan"></text>
										{{item.buying_count_num}}人团 <text class="line"></text>
										已拼{{item.sales ? item.sales : 0}}{{item.product.unit_name}}
									</text>
								</view>
								<view class="progress">
									<view class='combination_price'>
										<text class="combination_text">拼团价</text>
										<text class="price">¥ <text>{{ item.price }}</text></text>
									</view>
									<view class='order_btn' :style="{ 'background-image': `url(${domain}/static/diy/pink_btn${keyColor}.png)` }">去拼团</view>
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
	import { getCombinationList, getCombinationUser, getActivitycategory } from '../../../api/activity.js';
	import home from '@/components/home/index.vue'
	import tabNav from '@/components/combinNav'
	import userNameSwiper from '@/components/userNameSwiper/userNameSwiper.vue'
	import { getIndexData } from '@/api/api.js';
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
			tabNav,
			userNameSwiper
		},
		computed: configMap({statusBarHeight:0},mapGetters(['viewColor','keyColor'])),
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				navH: '',
				topImage: '',
				combinationList: [],
				combinationUserList: [],
				combinationUserCount: 0,
				navTop: [{
					'cate_name': '精选',
					store_category_id: ''
				}],
				active: 1,
				type: 0,
				scrollLeft: 0,
				interval: 0,
				status: 1,
				page: 1,
				limit: 8,
				loading: false,
				loadend: false,
				pageloading: false,
				isFixed: false,
				navIndex: 0,
				avatar: '../../../static/images/f.png',
				headBg: '../static/images/comHead'
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
				title: '拼团',
				path: 'pages/activity/combination/index',
			}
		},
		onShareTimeline: function() {
			return {
				title: '拼团活动',
				query: {
					key: ''
				},
				imageUrl: ''
			}
		},
		// #endif
		onLoad() {
			var pages = getCurrentPages();
			uni.setNavigationBarTitle({
				title: "拼团列表"
			})
			this.navH = app.globalData.navHeight;
			this.getCombinationProductList('');
			this.getIndexConfig();
			this.getCombinationUser();
		},
		methods: {
			goBack: function() {
				uni.navigateBack();
			},
			getCombinationProductList: function(store_category_id) {
				var that = this;
				var data = {
					page: that.page,
					limit: that.limit,
					store_category_id: store_category_id
				};
				if (that.pageloading) return;
				this.pageloading = true
				getCombinationList(data).then(res => {
					var combinationList = res.data.list;
					that.page++;
					that.combinationList = that.combinationList.concat(combinationList),
					that.page = that.page;
					that.pageloading = false;
				}).catch(err => {
					that.pageloading = false
				});
			},
			// 首页数据
			getIndexConfig: function() {
				let that = this;
				getActivitycategory(4).then(res => {
					that.navTop = that.navTop.concat(res.data)
				})
			},
			//获取参与拼团用户
			getCombinationUser: function() {
				let that = this;
				getCombinationUser({
					limit: 30
				}).then(res => {
					that.$set(that, "combinationUserCount", res.data.count);
					that.$set(that, "combinationUserList", res.data.list);
				})
			},
			// 导航分类切换
			changeTab(e) {
				let that = this
				if (that.navIndex == e.index) return
				that.navIndex = e.index;
				that.page = 1;
				that.limit = 8;
				that.combinationList = [];
				that.getCombinationProductList(e.pid)

			},
			goDetails(item) {
				uni.navigateTo({
					url: '/pages/activity/combination_details/index?id=' + item.product_group_id
				})
			}
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getCombinationProductList('');
		},
		// 滚动监听
		onPageScroll(e) {
			// #ifdef H5
			let self = this
			if (e.scrollTop >= self.searchH) {
				self.isFixed = true
			} else {
				self.isFixed = false
			}
			// #endif
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
		height: 576rpx;
		/* #endif */
		/* #ifdef H5 */
		height: 490rpx;
		/* #endif */
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 100%;
	}
	.name-swiper{
		margin-left: 40rpx;
	}
	.header {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.success_per {
			width: 100%;
			text-align: center;
			left: 0;
			.success_num {
				color: #FFF1BF;
				font-size: 26rpx;
			}
		}
	}
	.activity_pic {
		margin-left: 20rpx;
		padding-left: 20rpx;
		position: relative;
		display: inline-block;
		margin-top: 17rpx;
		background: rgba(0, 0, 0, .15);
		padding: 13rpx 24rpx 13rpx 14rpx;
		border-radius: 33rpx;
		.picture {
			display: inline-block;
		}
		.avatar {
			width: 42rpx;
			height: 42rpx;
			line-height: 20rem;
			display: inline-block;
			background-repeat: no-repeat;
			background-size: center/cover;
			position: relative;
			text-align: center;
			color: #fff;
			font-weight: 600;
			vertical-align: bottom;
			font-size: .875rem;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			border-radius: 50%;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: 0 0;
			margin-right: -10rpx;
			box-shadow: 0 0 0 1px #fff;
			position: relative;
			text {
				position: absolute;
				line-height: 42rpx;
				color: #8E8E8E;
				width: 42rpx;
				left: 0;
			}
		}
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
		top: 10rpx;
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
		width: 240rpx;
		height: 240rpx;
		border-radius: 10rpx;
	}
	.flash-sale .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.flash-sale .list .item .text {
		width: 370rpx;
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
		font-size: 22rpx;
		color: var(--view-priceColor);
		border-radius: 18rpx;
		background-color: var(--view-bgColor);
		line-height: 36rpx;
		padding: 5rpx 12rpx;
		.iconfont {
			margin-right: 10rpx;
		}
		.line {
			display: inline-block;
			width: 1rpx;
			height: 14rpx;
			background: #F49088;
			margin: 0 9rpx;
			position: relative;
			top: -3rpx;
		}
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
		margin-top: 20rpx;
		overflow: hidden;
		.combination_price {
			line-height: 15px;
			padding: 8rpx 0;
			color: #282828;
			float: left;
			position: relative;
			top: 10rpx;
			.combination_text {
				font-size: 22rpx;
			}
			.price {
				font-size: 24rpx;
				font-weight: bold;
			}
		}
		.order_btn {
			float: right;
			width: 145rpx;
			height: 62rpx;
			text-align: center;
			color: #FFFFFF;
			font-size: 26rpx;
			line-height: 72rpx;
			background-size: 100%;
		}
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
}
</style>