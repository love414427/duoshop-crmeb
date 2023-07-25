<template>
	<view :style="viewColor" class="page-container">
		<view class='topic-home' :style="'background-color: '+bgColor+''">
			<!-- #ifdef H5 -->
			<view class="header">
				<view class="head-menu">
					<view class="iconfont icon-xiangzuo" @click="goback"></view>
					<view v-if="merchant" class="iconfont merchant" @click="goStore(topicData.group_mer_id)">
						<image class="icon_merchant" :src="merchant.mer_avatar"></image>
					</view>
					<view v-else class="iconfont icon-shouye4" @click="goHome"></view>
				</view>
			</view>
			<!-- #endif -->
			<view class="main_count">
				<view class="topic_image">
					<image :src="topicData.image" class="picture" mode="widthFix"></image>
				</view>
				<view class="main">
					<!-- 轮播 -->
					<view class="slider-wrapper" v-if="imgUrls.length>0">
						<swiper indicator-dots="true" :autoplay="autoplay" :circular="circular" :interval="interval" :duration="duration"
						 indicator-color="rgba(255,255,255,0.6)" indicator-active-color="#fff">
							<block v-for="(item,index) in imgUrls" :key="index">
								<swiper-item>
									<view class='slide-navigator acea-row row-between-wrapper'>
										<image :src="item" class="slide-image"></image>
									</view>
								</swiper-item>
							</block>
						</swiper>
					</view>
					<!--商品-->
					<view class="product_list" :class="['theme'+theme, {'acea-row row-between-wrapper': (theme == 2 || theme == '')}]">
						<view class='item' v-for="(item,index) in activety_goods" :key="index" hover-class='none' @tap="goDetail(item)">
							<view class='pictrue'>
								<!-- <image class="image" :src='item.image'></image> -->
								<easy-loadimage mode="widthFix" :image-src="item.image"></easy-loadimage>
							</view>
							<view class="text">
								<view class='name line2'>
									{{item.store_name}}
								</view>
								<view class="acea-row row-middle">
									<view class='money'>￥<text class='num'>{{item.price}}</text></view>
								</view>
								<view v-if="theme != 1" class="score">{{item.rate}}评分 {{item.reply_count}}条评论</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<home></home>
		<!-- #ifndef H5 -->
		<passwordPopup></passwordPopup>
		<!-- #endif -->
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
	import {mapGetters} from "vuex";
	import {getTopicDetail,getTopicProLst,initiateAssistApi } from '../../../api/activity.js';
	import { goShopDetail } from '@/libs/order.js'
	import home from '@/components/home/index.vue'
	// #ifndef H5
	import passwordPopup from '@/components/passwordPopup';
	// #endif
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';
    import authorize from '@/components/Authorize';
	const app = getApp();
	export default {
		computed: mapGetters(['isLogin','uid','viewColor']),
		components: {
			// #ifndef H5
			passwordPopup,
			// #endif
			home,
			easyLoadimage,
            authorize
		},
		data() {
			return {
				group_id: '',
				systemInfo: app.globalData.statusBarHeight,
				bgColor: '',
				activety_goods: [],
				page: 1,
				limit: 30,
				loading: false,
				loadend: false,
				pageloading: false,
				autoplay: true,
				circular: true,
				interval: 3000,
				duration: 500,
				theme: 1,
				topicData: {},
				imgUrls: [],
				label_id: '',
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false ,//是否隐藏授权
				merchant: {}
			}
		},
		onLoad(options) {
			this.group_id = options.id
			this.getTopicDetail();
		},
		methods: {
			/**
			 * 授权回调
			 */
			onLoadFun: function() {
				this.isShowAuth = false;
				this.getTopicDetail();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			goback: function() {
				uni.navigateBack();
			},
			// 首页
			goHome() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			// 进入商户首页
			goStore(id){
				uni.navigateTo({
					url: `/pages/store/home/index?id=${id}`
				})
			},
			getTopicDetail(){
				let that = this;
				getTopicDetail(that.group_id).then(res => {
					that.$set(that, 'topicData', res.data)
					that.$set(that, 'theme', res.data.type)
					that.$set(that, 'bgColor', res.data.color)
					that.$set(that, 'imgUrls', res.data.banner)
					that.$set(that, 'label_id', res.data.label_id)
					that.$set(that, 'merchant', res.data.merchant)
					that.getProList()
				})
				.catch(err => {
					return this.$util.Tips({
						title: err
					}, {
						tab: 3,
						url: 1
					});
				});
			},
			getProList: function() {
				var that = this;
				var data = {
					page: that.page,
					limit: that.limit,
					labels: that.label_id,
					mer_id: that.topicData.group_mer_id
				};
				if (that.loadend) return;
				if (that.pageloading) return;
				this.pageloading = true
				getTopicProLst(data).then(res => {
					var activety_goods = res.data.list;
					var loadend = activety_goods.length < that.limit;
					that.page++;
					that.activety_goods = that.activety_goods.concat(activety_goods),
					that.page = that.page;
					that.pageloading = false;
					that.loadend = loadend;
				}).catch(err => {
					that.pageloading = false
				});
			},
			goDetail(item) {
				goShopDetail(item, this.uid).then(res => {
				if (this.isLogin) {
					initiateAssistApi(item.activity_id).then(res => {
						let id = res.data.product_assist_set_id;
						uni.hideLoading();
						uni.navigateTo({
							url: '/pages/activity/assist_detail/index?id=' + id
						});
					}).catch((err) => {
						uni.showToast({
							title: err,
							icon: 'none'
						})
					});
			} else {
				this.isAuto = true;
				this.isShowAuth = true
			}
			})
		}
	},
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {
		this.getProList()
	},
	// 滚动监听
	onPageScroll(e) {
		// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
		uni.$emit('scroll');
	}
}
</script>

<style lang="scss">
	.header {
		position: absolute;
		z-index: 6;
		display: flex;
		align-items: center;
		padding-right: 34rpx;
		height: 43px;
		padding-left: 33rpx;
		.head-menu {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
			height: 27px;
			width: 70px;
			background: rgba(0, 0, 0, 0.3);
			border-radius: 13px;
			.icon-xiangzuo {
				font-size: 32rpx;
				color: #FFFFFF;
			}
			.iconfont {
				-webkit-box-flex: 1;
				-webkit-flex: 1;
				flex: 1;
				text-align: center;
				color: #fff;
				box-sizing: border-box;
				&.icon-xiangzuo {
					border-right: 1px solid #fff;
				}
			}
			.merchant{
				width: 36rpx;
				height: 36rpx;
				.icon_merchant{
					width: 36rpx;
					height: 36rpx;
					border-radius: 100%;
				}
			}

		}
	}
	.topic-home{
		position: relative;
		min-height: 100vh;
		padding-bottom: 30rpx;
		.topic_image{
			line-height: 0;
			.picture{
				width: 750rpx;
			}
		}
	}
	.main_count{
		.main{
			padding: 0 20rpx;
		}
		.slider-wrapper{
			width: 710rpx;
			height: 250rpx;
			margin: 40rpx 0;
			uni-swiper{
				height: 250rpx;
			}
			.slide-image{
				width: 710rpx;
				height: 250rpx;
				border-radius: 16rpx;
			}
		}
		.product_list{
			.item{
				background-color: #fff;
			}
			.image {
				width: 100%;
				height: 100%;
				border-radius: 20rpx 20rpx 0 0;
			}
			.text{
				color: #222222;
			}
			.money {
				display: flex;
				align-items: center;
				font-size: 26rpx;
				font-weight: bold;
				margin-top: 8rpx;
				color: var(--view-priceColor);
			}
			.score {
				margin-top: 10rpx;
				color: #737373;
				font-size: 20rpx;
			}
			&.theme2,&.theme{
				.item{
					position: relative;
					width: 345rpx;
					margin-bottom: 20rpx;
					border-radius: 20rpx;
					.pictrue {
						position: relative;
						width: 100%;
						height: 345rpx;
					}
					/deep/image,/deep/.easy-loadimage,uni-image{
						height: 345rpx;
					}
					.text {
						padding: 20rpx 17rpx 26rpx 17rpx;
					}
					.name{
						font-size: 13px;
						color: #282828;
						margin: 11px 0 5px 0;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						
					}
				}
			}
			&.theme1{
				.item{
					display: inline-block;
					width: 225rpx;
					margin: 0 19rpx 16rpx 0;
					border-radius: 10rpx;
					&:nth-child(3n){
						margin-right: 0;
					}
				}
				.pictrue {
					position: relative;
					width: 100%;
					height: 226rpx;
					.image{
						border-radius: 10rpx 10rpx 0 0;
					}
				}
				/deep/image,/deep/.easy-loadimage,uni-image{
					width: 100%;
					height: 226rpx;
					border-radius: 10rpx 10rpx 0 0;
				}
				.text{
					padding: 12rpx 14rpx 16rpx;
					.name{
						font-size: 13px;
						color: #282828;
						margin: 11px 0 5px 0;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						height: 60rpx;
					}
					.money {
						font-size: 22rpx;
					}
				}
			}
			&.theme2{
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.pictrue,/deep/image,/deep/.easy-loadimage,uni-image{
					border-radius: 20rpx 20rpx 0 0;
				}
			}
			&.theme3{
				.item{
					width: 710rpx;
					border-radius: 20rpx;
					margin-bottom: 30rpx;
				}
				.num{
					font-family: 'PingFangSC-Semibold';
					font-size: 32rpx;
				}
				.pictrue {
					position: relative;
					width: 710rpx;
					height: 710rpx;
					.image{
						border-radius: 20rpx 20rpx 0 0;
					}

				}
				/deep/image,/deep/.easy-loadimage,uni-image{
					width: 710rpx;
					height: 710rpx;
					max-height: 710rpx;
					border-radius: 20rpx 20rpx 0 0;
				}
				.text{
					padding: 24rpx 30rpx 34rpx;
					position: relative;
					.name{
						color: #222222;
						font-size: 34rpx;
						margin-bottom: 16rpx;
						overflow:hidden;
						text-overflow: ellipsis; 
						display: -webkit-box; 
						-webkit-line-clamp: 2; 
						-webkit-box-orient: vertical;
					}
					.money{
						font-size: 22rpx;
						font-family: 'PingFangSC-Semibold';
						font-weight: bold;
					}
					.score{
						color: #737373;
						display: inline-block;
						float: right;
						position: relative;
						top: -34rpx;
						margin-top: 0;
					}
				}
			}
		}
	}
</style>
