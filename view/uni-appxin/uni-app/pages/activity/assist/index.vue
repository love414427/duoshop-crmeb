<template>
	<view :style="viewColor" class="page_container">
		<view class='bargain-list'>
			<!-- #ifdef H5 -->
			<view v-if='!$wechat.isWeixin()' class="fixed-head">
				<view class="sys-head" :style="{height:statusBarHeight}"></view>
				<view class="tool-bar">
					<view class='iconfont icon-xiangzuo' @tap='goBack'></view>
				</view>
			</view>
			<!-- #endif -->
			<view class='header'>
				<image mode="widthFix" class="assistBg" :src="domain+'assist_bg'+keyColor+'.png'" alt="">
			</view>
			<view class='list'>
				<block v-for="(item,index) in assistList" :key="index">
					<view class='item acea-row row-between-wrapper' @tap="openSubscribe(item.product_assist_id)">
						<view class='pictrue'>
							<image :src='item.product.image'></image>
						</view>
						<view class='text acea-row row-column-around'>
							<view class='name line1'>{{item.store_name}}</view>
							<view class='num'><text class='iconfont icon-pintuan'></text>{{item.user_count}}人正在参与</view>
							<view class='money'>助力价: ￥<text class='price'>{{item.assistSku ? item.assistSku[0].assist_price : ''}}</text></view>
						</view>
						<view class='cutBnt'></text>发起助力</view>
					</view>
				</block>
			</view>
		</view>
		<home></home>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
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
		getAssistList,
		initiateAssistApi
	} from '../../../api/activity.js';
	import home from '@/components/home/index.vue';
	import { getUserInfo } from '@/api/user.js';
	import { mapGetters } from "vuex";
	import { configMap } from "@/utils";
	import { HTTP_REQUEST_URL } from '@/config/app';
	import authorize from '@/components/Authorize';
	// #ifndef H5
	import passwordPopup from '@/components/passwordPopup';
	// #endif
	export default {
		components: {
			home,
			// #ifndef H5
			passwordPopup,
			// #endif
			authorize
		},
		data() {
			return {
				domain: HTTP_REQUEST_URL+'/static/diy/',
				topImage: '',
				assistList: [],
				active: 0,
				type: 0,
				scrollLeft: 0,
				interval: 0,
				status: 1,
				page: 1,
				limit: 8,
				loading: false,
				loadend: false,
				pageloading: false,
				userInfo: {},
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
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
				title: '助力活动',
				path: 'pages/activity/assist/index',
			}
		},
		onShareTimeline: function() {
			return {
				title: '助力活动',
				  query: {
				    key: ''
				  },
				  imageUrl: ''
				}
		},
		// #endif
		computed: configMap({statusBarHeight:0},mapGetters(['isLogin','viewColor','keyColor'])),
		watch:{
		 isLogin:{
			handler:function(newV,oldV){
				if(newV){
					this.getUserInfo();
					this.getAssistProductList();
				}
			},
			deep:true
		 }
		},
		onLoad() {
			this.getAssistProductList();
			if (this.isLogin) {
				this.getUserInfo();
			}
		},
		methods: {
			goBack: function() {
				uni.navigateBack();
			},
			// 微信登录回调
			onLoadFun: function(e) {
				this.getUserInfo();
				this.isShowAuth = false
			},
			getAssistProductList: function() {
				var that = this;
				var data = {
					page: that.page,
					limit: that.limit,
				};
				if (that.loadend) return;
				if (that.pageloading) return;
				this.pageloading = true
				getAssistList(data).then(res => {
					console.log(res);
					var assistList = res.data.list;
					var loadend = assistList.length < that.limit;
					that.page++;
					that.assistList = that.assistList.concat(assistList),
					that.pageloading = false;
					that.loadend = loadend;
				}).catch(err => {
					that.pageloading = false
				});
			},
			openSubscribe: function(id) {
				if(this.isLogin){
					initiateAssistApi(id).then(res => {
						let id = res.data.product_assist_set_id;
						uni.hideLoading();
						uni.navigateTo({
							url: '/pages/activity/assist_detail/index?id='+id
						});
					}).catch((err) => {
						uni.showToast({
							title:err,
							icon:'none'
						})
					});
				}else{
					this.isAuto = true;
					this.isShowAuth = true
				}
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			/*
			 * 获取用户信息
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.$set(that, 'userInfo', res.data);
				});
			},
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getAssistProductList();
		}
	}
</script>

<style lang="scss">
	.page_container {
		min-height: 100vh;
		background-color: var(--view-theme);
	}
	.bargain-list .header {
		width: 100%;
		position: relative;
	}
	.bargain-list .header .assistBg {
		width: 750rpx;
	}
	.bargain-list .list {
		background-color: #fff;
		border: 6rpx solid #fc8b42;
		border-radius: 30rpx;
		margin: -90rpx 30rpx 66rpx 30rpx;
		padding: 0 24rpx;
		position: relative;
		top: -50rpx;
	}
	.bargain-list .list .item {
		border-bottom: 1px solid #eee;
		position: relative;
		height: 223rpx;
	}
	.bargain-list .list .item .pictrue {
		width: 160rpx;
		height: 160rpx;
	}
	.bargain-list .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}
	.bargain-list .list .item .text {
		width: 450rpx;
		font-size: 30rpx;
		color: #282828;
		height: 160rpx;
	}
	.bargain-list .list .item .text .name {
		width: 100%;
	}
	.bargain-list .list .item .text .num {
		font-size: 26rpx;
		color: #999;
	}
	.bargain-list .list .item .text .num .iconfont {
		font-size: 35rpx;
		margin-right: 7rpx;
	}
	.bargain-list .list .item .text .money {
		font-size: 24rpx;
		font-weight: bold;
		color: var(--view-priceColor);
	}
	.bargain-list .list .item .text .money .price {
		font-size: 32rpx;
	}
	.bargain-list .list .item .cutBnt {
		position: absolute;
		width: 180rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50rpx;
		font-size: 26rpx;
		color: #fff;
		height: 56rpx;
		right: 0;
		bottom: 44rpx;
		background-color: var(--view-theme);
	}
	.bargain-list .list .item .cutBnt .iconfont {
		margin-right: 8rpx;
		font-size: 30rpx;
	}
	.bargain-list .list .load {
		font-size: 24rpx;
		height: 85rpx;
		text-align: center;
		line-height: 85rpx;
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
