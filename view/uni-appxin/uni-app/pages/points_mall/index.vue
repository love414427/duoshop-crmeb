<template>
	<view :style="viewColor">
		<view class="points-swiper">
			<image class="bag" :src="`${domain}/static/images/jf-head.png`" mode=""></image>
			<view class="swiper">
				<swiper indicator-dots="true" :autoplay="autoplay" :circular="circular" :interval="interval"
					:duration="duration" indicator-color="rgba(255,255,255,0.6)" indicator-active-color="#fff">
					<block v-for="(item, index) in imgUrls" :key="index">
						<swiper-item>
							<image :src="item.pic" class="slide-image" @click="goPages(item.url)"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
		<view v-if="modelLength <= 10" class="model">
			<view class="model-list" v-for="(model,index) in modelList" :key="index" @click="goPages(model.url)">
				<image class="img" :src="model.pic" mode=""></image>
				<view class="model-name line1">{{model.name}}</view>
			</view>
		</view>
		<view v-else class="model">
			<view class="model-swiper">
				<swiper indicator-dots="true" :autoplay="false" :circular="circular"
					indicator-color="rgba(0,0,0,0.3)">
					<block v-for="(item,index) in modelList" :key="index">
						<swiper-item class="model-swiper-item">
							<view v-for="(model,idx) in item" class="model-list" :key="idx" @click="goPages(model.url)">
								<image class="img" :src="model.pic" mode=""></image>
								<view class="model-name line1">{{model.name}}</view>
							</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
		<view class="body">
			<view class="body-title">
				<view class="navTabBox">
					<view class="longTab">
						<scroll-view scroll-x="true" style="white-space: nowrap; display: flex;" scroll-with-animation
						 show-scrollbar="true">
							<view class="longItem" :data-index="index" :class="index===tabClick?'click':''"
							 v-for="(item,index) in tabTitle" :key="index" :id="'id'+index" @click="longClick(index,item)">{{item.title}}
							</view>
						</scroll-view>		
					</view>
				</view>
			</view>
			<view class="product-list" v-if="goodList.length">
				<view class="product-item" v-for="(item, index) in goodList" @click="goGoodsDetail(item)">
					<view class='pictrue'>
						<image :src='item.image'></image>
						<view v-if="item.stock == 0" class="sell_out">已兑完</view>
					</view>
					<view class="info">
						<view class="title line1">{{ item.store_name }}</view>
						<view class="acea-row price-count">
							<image class="image" :src="`${domain}/static/images/jf-point.png`" mode="widthFix"></image>
							<view class="price-box">
								<text>{{ item.ot_price }}</text>积分
							</view>
							<view class="sales">+{{parseFloat(Number(item.price).toFixed(2))}}元</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else-if="!loading" class="no-goods">
				<image src="../../static/images/noCart.png" mode=""></image>
				<view class="fontimg">暂无商品，去看点别的吧</view>
			</view>		
			<view v-if="loading" class='loadingicon acea-row row-center-wrapper'>
				<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadTitle}}
			</view>
			
		</view>
		<!-- #ifdef MP -->
		<authorize v-if="isShowAuth" @authColse="authColse" @onLoadFun="onLoadFun"></authorize>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
	  toLogin
	} from '@/libs/login.js';
	import {
		mapGetters
	} from 'vuex';
	import {
		getIntegralHome, getIntegralScope, getIntegralGoodsList
	} from '@/api/points_mall.js'
	import {
		goShopDetail
	} from '@/libs/order.js';
	import {HTTP_REQUEST_URL} from '@/config/app';
	export default {
		components: {},
		data() {
			return {
				tabClick: 0, //导航栏被点击
				autoplay: true,
				circular: true,
				interval: 3000,
				duration: 500,
				imgUrls: [],
				goodList: [],
				modelList: [],
				modelLength: 0,
				tabTitle: [],
				domain:HTTP_REQUEST_URL,
				isShowAuth: false,
				loadend: false,
				loading: false,
				loadTitle: '加载更多',
				where: {
					page: 1,
					limit: 10,
					scope: ''
				}
			}
		},
		computed: mapGetters(['isLogin','viewColor']),
		onLoad() {
			this.getIntegralHome();
			this.getIntegralScope();
			this.getIntegralGoods();
		},
		watch: {
			
		},
		onShow(){

		},
		methods: {
			// 授权回调
			onLoadFun() {
				this.isShowAuth = false;
			},
			// 授权关闭
			authColse: function(e) {
			  this.isShowAuth = e
			},
			getIntegralHome() {
				getIntegralHome().then(res => {
					this.imgUrls = res.data.banner
					this.modelList = res.data.district
					this.modelLength = res.data.district.length
					if(this.modelLength > 10){
						this.modelList = this.chunk(this.modelList, 10)
					}
				})
			},
			chunk(arr, num){
				let j = 0, o = j;
				let newArray = [];
				while (j < arr.length) {
					j += num;
					newArray.push(arr.slice(o, j));
					o = j;
				}
				return newArray;
			},
			// 获取积分区间
			getIntegralScope() {
				getIntegralScope().then(res => {
					res.data.unshift({title: '全部',group_data_id: '',min: '',max: ''})
					this.tabTitle = res.data
				}).catch(err => {
					this.loading = false;
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			longClick(index, item) {
				this.tabClick = index;
				if(!item.min&&!item.max){
					this.where.scope='';
				}else{
					item.min = item.min || 0;
					item.max = item.max || 0;
					this.where.scope=item.min+','+item.max;
				}
				this.where.page = 1;
				this.loading = false;
				this.loadend = false;
				this.goodList = [];
				this.getIntegralGoods();
			},
			//积分商品列表
			getIntegralGoods(){
				let that = this;
				if (that.loadend) return;
				if (that.loading) return;
				that.loading = true;
				that.loadTitle = '';
				getIntegralGoodsList(that.where).then(res => {
					let list = res.data.list;
					let goodList = that.$util.SplitArray(list, that.goodList);
					let loadend = list.length < that.where.limit;
					that.loadend = loadend;
					that.loading = false;
					that.loadTitle = loadend ? '已全部加载' : '加载更多';
					that.$set(that, 'goodList', goodList);
					that.$set(that.where, 'page', that.where.page + 1);
				}).catch(err => {
					that.loading = false;
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			// 去商品详情
			goGoodsDetail(item) {
				uni.navigateTo({
					url: `/pages/points_mall/integral_goods_details?id=${item.product_id}`
				});
			},
			goPages(url) {
				if (url.indexOf("http") != -1) {
					// #ifdef H5
					location.href = url
					// #endif
				} else {
					if (['/pages/goods_cate/goods_cate', '/pages/order_addcart/order_addcart', '/pages/user/index', '/pages/index/index','/pages/plant_grass/index']
						.indexOf(url) == -1) {
						uni.navigateTo({
							url: url +'?delta=0'
						})
					} else {
						uni.switchTab({
							url: url
						})
					}
				}
			},
		},
		onReachBottom() {
			this.getIntegralGoods()
		},
	}
</script>

<style lang="scss" scoped>
	.swiper,
	swiper,
	swiper-item,
	.slide-image {
		width: 100%;
		height: 280rpx;
	}
	/deep/ .uni-swiper-wrapper {
		border-radius: 16rpx;
	}
	.swiper {
		padding: 30rpx;
	}
	.points-swiper {
		position: relative;
		width: 100%;
		background-color: #fff;
		.bag {
			position: absolute;
			width: 100%;
			height: 285rpx;
		}
		.points-swiper-sty {
			padding: 20rpx 26rpx;
		}
	}
	.model-swiper{
		position: relative;
		width: 100%;
		swiper{
			height: 380rpx;
		}
		/deep/.uni-swiper-dot{
			width: 10rpx;
			height: 10rpx;
			border-radius: 8rpx;
		}
		/deep/.uni-swiper-dot-active{
			width: 36rpx;
			background-color: var(--view-theme);
		}
		/deep/.uni-swiper-dots-horizontal{
			bottom: 0;
		}
	}
	.model {
		display: flex;
		flex-flow: row wrap;
		padding: 56rpx 20rpx;
		background-color: #fff;
	}
	.model-swiper-item{
		display: flex;
		align-items: center;
		flex-flow: row wrap;
		height: auto!important;
		font-size: 24rpx;
		color: #282828;
		font-weight: 500;
	}
	.model-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 0 0 20%;
		font-size: 24rpx;
		color: #282828;
		margin-top: 27rpx;
		font-weight: 500;
		.img {
			width: 90rpx;
			height: 90rpx;
			margin-bottom: 19rpx;
			border-radius: 100%;
		}
		.model-name{
			width: 100%;
			max-width: 140rpx;
			text-align: center;
		}
	}
	.body {
		background-color: #fff;
		padding: 30rpx;
		margin-top: 20rpx;
		.body-title {
			.navTabBox {
				color: #282828;
				position: relative;		
				.longTab {
					display: flex;
					.longItem {
						height: 50upx;
						display: inline-block;
						line-height: 50upx;
						text-align: center;
						font-size: 28rpx;
						color: #282828;
						// max-width: 160rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						overflow-x: scroll;
						overflow-y: hidden;
						/*解决ios上滑动不流畅*/
						-webkit-overflow-scrolling: touch;
						margin-right: 50rpx;
						&:last-child{
							margin-right: 0;
						}
						&.click {
							font-weight: bold;
							color: var(--view-theme);
						}
					}			
				}
			}
		}
		.product-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-top: 30rpx;
			.product-item {
				position: relative;
				width: 330rpx;
				background: #fff;
				border-radius: 10rpx;
				margin-bottom: 20rpx;
				.pictrue{
					position: relative;
					width: 100%;
					height: 330rpx;
					.sell_out {
						display: flex;
						width: 150rpx;
						height: 150rpx;
						align-items: center;
						justify-content: center;
						border-radius: 100%;
						background: rgba(0,0,0,.6);
						color: #fff;
						font-size: 30rpx;
						position: absolute;
						top: 50%;
						left: 50%;
						margin: -75rpx 0 0 -75rpx;
						&::before{
							content: "";
							display: block;
							width: 140rpx;
							height: 140rpx;
							border-radius: 100%;
							border: 1px dashed #fff;
							position: absolute;
							top: 5rpx;
							left: 5rpx;
						}
						
					}
				}
				image {
					width: 100%;
					height: 330rpx;
					border-radius: 16rpx;
				}
				.info {
					padding: 14rpx 10rpx;
					.title {
						font-size: 30rpx;
						color: #282828;
					}
					.price-count{
						display: flex;
						margin-top: 8rpx;
						align-items: baseline;
					}
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
			}
		}
	}
	.no-goods {
		display: flex;
		flex-direction: column;
		padding: 60rpx 0;
		image{
			width: 414rpx;
			height: 305rpx;
			display: block;
			margin: 0 auto;
		}
		.fontimg{
			text-align: center;
			color: #bebebe;
		}
}
</style>
