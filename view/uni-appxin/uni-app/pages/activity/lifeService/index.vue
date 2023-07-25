<template>
	<view :style="viewColor">
		<view class='productList'>
			<view class='search acea-row row-between-wrapper'>
				<!--#ifdef H5-->
				<view v-if='!$wechat.isWeixin()' class="back" @click='backjJump()'>
					<view class="iconfont icon-xiangzuo"></view>
				</view>
				<!--#endif-->
				<view class='input acea-row row-between-wrapper'><text class='iconfont icon-sousuo'></text>
					<input placeholder='搜索店铺名称' placeholder-class='placeholder' confirm-type='search' name="search" :value='sotreParam.keyword'
					 @confirm="searchSubmit"></input>
				</view>
				<view v-if="mer_location == 1" style="text-align: right;" class='iconfont search-right' @click='showMaoLocation(latitude,longitude)'>
					<view class="iconfont icon-dingwei"></view>
					<view class="right-text" v-if="recommend_address">
						{{recommend_address}}
					</view>
					<view class="iconfont icon-xiangyou" v-if="recommend_address"></view>
				</view>
			</view>
			<view class="nav-wrapper">
				<view class='nav acea-row row-middle'>
					<view v-for="item in downMenus" :key="item.key" class='item' :class="{'font-colors':firstKey == item.key}" @click='set_where(item.key)'>
						<view>
							{{item.title}}
						</view>
						<view class="line" :class="{'font-line':firstKey == item.key}">
						</view>
					</view>
				</view>
			</view>
			<!-- 店铺 -->
			<block>
				<view class="mer-box"v-if="storeList.length > 0">
					<view class="mer-item" v-for="(item,index) in storeList" :key='index'>
						<view class="mer-hd" @click="goStore(item.mer_id)">
							<image :src="item.mini_banner?item.mini_banner:item.mer_banner"></image>
							<view class="mer-name">
								<image :src="item.mer_avatar"></image>
								<view class="">
									<view class="mer-top">
										<view class="txt line1">{{item.mer_name}}</view>
										<text v-if="item.type_name" class="font-bg-red ml8">{{item.type_name}}</text>
										<text v-else-if="item.is_trader" class="font-bg-red ml8">自营</text>
									</view>
									<view class="mer-btn">
										<view class="">
											{{item.care_count<10000 ? item.care_count : (item.care_count/10000).toFixed(2)+'万'}}人关注
										</view>
										<view class="line" v-if="item.distance"></view>
										<view class="distance" v-if="item.distance" @click.stop="showStoreLocation(item)">
											<view class="">
												{{item.distance}}
											</view>
											<view class="iconfont icon-xiangyou"></view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="pro-box">
							<navigator :url="`/pages/goods_details/index?id=${itemn.product_id}`" hover-class="none" class="pro-item" v-for="(itemn,indexn) in item.recommend"
							 :key='indexn' v-if="item.recommend.length<=3">
								<image :src="itemn.image" mode=""></image>
								<view class="price">
									<text>￥</text>{{itemn.price}}
								</view>
							</navigator>
						</view>
					</view>
					<view class='loadingicon acea-row row-center-wrapper' v-if="loading">
						<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadTitle}}
					</view>
				</view>
				<view class='no-shop' v-if="!storeList.length && !loading && !loadingIcon" v-cloak>
					<view class='pictrue' style="margin: 0 auto;">
						<image src='../../../static/images/noCart.png'></image>
						<text>暂无店铺，快去搜索其他店铺吧</text>
					</view>
				</view>
			</block>
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
	import {
		getGeocoder
	} from '@/api/store.js';
	import {
		getMerchantServiceLst,
	} from '@/api/activity.js';
	import {
		mapGetters
	} from "vuex";
	import {
		goShopDetail
	} from '@/libs/order.js'
	const app = getApp();
	export default {
		data() {
			return {
				price: 0,
				stock: 0,
				nows: false,
				loading: false,
				loadingIcon: true,
				loadTitle: '加载更多',
				title: '',
				hotPage: 1,
				hotLimit: 10,
				hotScroll: false,
				// 筛选框
				rightBox: false,
				//品牌列表
				brandList: [],
				downKey: 0,
				downStatus: false,
				// 下拉菜单
				downMenu: [{
						title: '默认',
						key: 0,
						order: ""
					},
					{
						title: '销量',
						key: 1,
						order: 'sales'
					},
					{
						title: '好评',
						key: 2,
						order: 'rate'
					},
					{
						title: '距离',
						key: 3,
						order: 'location'
					}
				],
				// 是否第一个
				firstKey: 0,
				// 商铺列表
				storeList: [],
				sotreParam: {
					keyword: '',
					page: 1,
					limit: 10,
					order: '',
				},
				storeKey: 0,
				storeScroll: true,
				mer_id: '',
				sortId: '',
				hide_mer_status: "",
				price_on: '',
				price_off: '',
				detaile_address: "",
				recommend_address: "",
				latitude: "",
				longitude: "",
				count: 0,
				mer_location: "",
			};
		},
		created() {
			uni.getStorage({
				key: 'GLOBAL_DATA',
				success: (res) => {
					console.log(res);
					this.hide_mer_status = res.data.hide_mer_status
					this.storeList = []
					if (res.data.mer_location == 1) {
						this.mer_location = res.data.mer_location
						this.selfLocation()
					}
					this.getServiceList();
				}
			});
		},
		computed: {
			downMenus: function() {
				return this.downMenu.filter((item) => {
					if (this.mer_location) {
						return item
					} else {
						return item.key < 3
					}
				})
			},
			...mapGetters(['viewColor']),
		},
		onLoad: function(options) {
			this.mer_id = options.mer_id;
		},
		methods: {	
			// 打开地图
			showMaoLocation(lat, long) {
				if (!lat || !long) return this.$util.Tips({
					title: '请设置允许商城访问您的位置！'
				});
				//#ifdef H5
				if (this.$wechat.isWeixin() === true) {
					this.$wechat.seeLocation({
						latitude: Number(lat),
						longitude: Number(long),
						name: '当前位置',
						address: this.recommend_address
					}).then(res=>{
						console.log('success');
					})
				}else{
				//#endif
					uni.openLocation({
						latitude: parseFloat(lat),
						longitude: parseFloat(long),
						scale: 8,
						geocode: true,
						name: '当前位置',
						address: this.recommend_address,
						success: function(res) {
							console.log(res)
						},
					});
				// #ifdef H5
				}
				//#endif	
			},
			showStoreLocation(item) {
				console.log(lat, long)
				if (!item.lat || !item.long) return this.$util.Tips({
					title: '请设置允许商城访问您的位置！'
				});
				//#ifdef H5
				if (this.$wechat.isWeixin() === true) {
					this.$wechat.seeLocation({
						latitude: Number(item.lat),
						longitude: Number(item.long),
						name: item.mer_name,
						address: item.mer_address ? item.mer_address: '',
					}).then(res=>{
						console.log('success');
					})
				}else{
				//#endif
					uni.openLocation({
						latitude: parseFloat(item.lat),
						longitude: parseFloat(item.long),
						scale: 8,
						name: item.mer_name,
						address: item.mer_address ? item.mer_address: '',
						success: function(res) {
							console.log(res)
						},
					});
				// #ifdef H5
				}
				//#endif	
			},
			selfLocation() {
				let self = this
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						let latitude, longitude;
						latitude = res.latitude.toString();
						longitude = res.longitude.toString();
						this.latitude = res.latitude
						this.longitude = res.longitude
						getGeocoder({
							lat: latitude,
							long: longitude
						}).then(res => {
							console.log(res)
							this.detaile_address = res.data.address;
							this.recommend_address = res.data.address.length > 4 ? res.data.address.slice(0,4) + '...' : res.data.address
						})
					},
					fail: (res) => {
						uni.showToast({
							title: res,
							icon: 'none',
							duration: 1000
						});
					},
					complete: (res) => {
						this.getServiceList();
					}
				});
			},
			// 查找店铺
			getServiceList() {
				if (this.loading) return
				this.loading = true
				let rqData = {
					keyword: this.sotreParam.keyword,
					page: this.sotreParam.page,
					limit: 10,
					order: this.sotreParam.order,
				}
				if (this.latitude) {
					rqData.location = this.latitude + ',' + this.longitude
				}
				getMerchantServiceLst(rqData).then(res => {
					this.count = res.data.count
					this.storeList = this.storeList.concat(res.data.list)
					this.loading = false
					this.loadingIcon = false
				})
			},
			// 进店
			goStore(id) {
				if (this.hide_mer_status != 1) {
					uni.navigateTo({
						url: `/pages/store/home/index?id=${id}`
					})
				}
			},
			searchSubmit: function(e) {
				let that = this;
				that.$set(that.sotreParam, 'keyword', e.detail.value);
				this.set_where(this.firstKey)
			},
			//点击事件处理
			set_where: function(e) {
				if (this.loading) return
				console.log(this.downMenu, e)
				this.storeList = []
				this.firstKey = e
				this.sotreParam.page = 1
				this.sotreParam.order = this.downMenu[e].order
				this.getServiceList();
			},
			backjJump() {
				uni.navigateBack({
					delta: 1
				})
			},
		},
		//刷新
		onPullDownRefresh() {

		},
		//上划加载更多
		onReachBottom() {
			if (this.count === this.storeList.length) {
				if (this.count === 0) {
					return
				}
				uni.showToast({
					title: '已加载全部',
					icon: 'none',
					duration: 1000
				});
			} else {
				this.sotreParam.page += 1
				this.getServiceList()
			}
		}
	}
</script>
<style lang="scss">
	.productList .search {
		width: 100%;
		height: 86rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9;
		display: flex;
		flex-wrap: nowrap;
		background: var(--view-theme);
		.search-right {
			display: flex;
			align-items: center;
			justify-content: space-between;
			max-width: max-content;
			flex: 1;
			padding-left: 20rpx;
		}
		.right-text {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 28rpx;
			width: max-content;
			// max-width: 4.4rem;
			color: #fff;
			padding: 0 10rpx;
		}
		.icon-xiangyou,
		.icon-dingwei {
			font-size: 30rpx;
			color: #fff;
		}
	}
	.productList .search .back {
		display: flex;
		align-items: center;
		width: 40rpx;
		height: 60rpx;

		.iconfont {
			color: #fff;
			font-size: 36rpx;
		}
	}
	.productList .search .input {
		flex: 1;
		// width: 540rpx;
		height: 60rpx;
		background-color: #fff;
		border-radius: 50rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	.productList .search .input input {
		flex: 1;
		height: 100%;
		font-size: 26rpx;
		margin-left: 10rpx;
	}
	.productList .search .input .placeholder {
		color: #999;
	}
	.productList .search .input .iconfont {
		font-size: 35rpx;
		color: #555;
	}
	.productList .search .icon-pailie,
	.productList .search .icon-tupianpailie {
		color: #fff;
		width: 62rpx;
		font-size: 40rpx;
		height: 86rpx;
		line-height: 86rpx;
	}
	.productList .nav-wrapper {
		z-index: 9;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		margin-top: 86rpx;
		background-color: $theme-color;
		.tab-bar {
			display: flex;
			align-items: center;
			.tab-item {
				position: relative;
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 8rpx 0 20rpx;
				color: #fff;
				font-size: 28rpx;
				font-weight: bold;
				&::after {
					content: ' ';
					position: absolute;
					left: 50%;
					bottom: 18rpx;
					width: 30rpx;
					height: 3rpx;
					background: transparent;
					transform: translateX(-50%);
				}
				&.on {
					&::after {
						background: #fff;
					}
				}
			}
		}
	}
	.productList .nav {
		height: 86rpx;
		color: #454545;
		font-size: 28rpx;
		background-color: var(--view-theme);
		display: flex;
		justify-content: space-between;
		padding: 0 28rpx;
	}
	.productList .nav .item {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: #FFFFFF;
		flex: 1;
	}
	.productList .nav .item.font-colors {
		font-weight: 500;
		color: #FFFFFF;
	}
	.productList .nav .item .font-line {
		height: 4rpx;
		background-color: #fff;
		margin-top: 3rpx;
		width: 28rpx;
		animation: line 0.3s;
		-moz-animation: line 0.3s;
		/* Firefox */
		-webkit-animation: line 0.3s;
		/* Safari 和 Chrome */
		-o-animation: line 0.3s;
		/* Opera */
	}
	@keyframes line {
		from {
			width: 0rpx;
		}
		to {
			width: 28rpx;
		}
	}
	.productList .nav .item image {
		width: 15rpx;
		height: 19rpx;
		margin-left: 10rpx;
	}
	.mer-box {
		padding: 20rpx 20rpx;
		margin-top: 168rpx;
		.mer-item {
			margin-bottom: 20rpx;
			background-color: #fff;
			border-radius: 16rpx;
			.mer-hd {
				position: relative;
				width: 100%;
				height: 134rpx;
				border-radius: 16rpx 16rpx 0 0;
				overflow: hidden;
				display: flex;
				image {
					width: 100%;
					height: 100%;
				}
				.mer-name {
					position: absolute;
					left: 20rpx;
					top: 30rpx;
					display: flex;
					align-items: center;
					padding: 0 10rpx;
					image {
						width: 79rpx;
						height: 79rpx;
						border: 1px solid #fff;
						border-radius: 50%;
						margin-right: 10rpx;
					}
					.mer-top {
						display: flex;
						align-items: center;
						color: #FFFFFF;
						font-size: 28rpx;
						font-weight: bold;
						margin-bottom: 6rpx;
						.font-bg-red {
							margin-left: 20rpx;
							font-size: 18rpx;
							padding: 2rpx 10rpx;
							border-color: var(--view-theme);
							background: var(--view-theme);
							border-radius: 30rpx;
							width: auto;
						}
					}
					.mer-btn {
						color: rgba($color: #fff, $alpha: 0.7);
						font-size: 24rpx;
						display: flex;
						align-items: center;
						.line {
							width: 2rpx;
							height: 18rpx;
							color: rgba($color: #fff, $alpha: 0.7);
							margin: 0 12rpx;
						}
						.distance {
							display: flex;
							align-items: center;
							font-size: 24rpx;
							color: rgba($color: #fff, $alpha: 0.7);
							.iconfont {
								font-size: 24rpx;
								line-height: 24rpx;
							}
						}
					}
					.txt {
						flex: 1;
					}
				}
			}
			.pro-box {
				display: flex;
				align-items: center;
				padding: 20rpx 20rpx 30rpx;
				.pro-item {
					width: 218rpx;
					margin-right: 14rpx;
					image {
						width: 100%;
						height: 214rpx;
						border-radius: 8rpx;
					}
					.price {
						margin-top: 5rpx;
						font-size: 28rpx;
						color: var(--view-priceColor);
						font-weight: bold;
						text {
							font-size: 28rpx;
						}
					}
					&:last-child {
						margin-right: 0;
					}
				}
			}
		}
		.more-shop {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #FFFFFF;
			padding: 27rpx 0;
			color: #999999;
			font-size: 26rpx;

			.icon-xiangyou {
				font-size: 22rpx;
			}
		}

	}

	.no-shop {
		background-color: #fff;
		padding-bottom: calc(100% - 40rpx);
		padding-top: 200rpx;
		.pictrue {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: $uni-nothing-text;

			image {
				width: 414rpx;
				height: 380rpx;
			}
		}
	}
</style>
