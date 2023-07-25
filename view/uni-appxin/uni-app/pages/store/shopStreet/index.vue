<template>
	<view>
		<view class='productList' :style="viewColor">
			<view class='search acea-row row-between-wrapper' :class="'styleType'+store_street_theme">
				<!--#ifdef H5-->
				<view class="back" @click='backjJump()'>
					<view class="iconfont icon-xiangzuo"></view>
				</view>
				<!--#endif-->
				<view class='input acea-row row-between-wrapper'><text class='iconfont icon-sousuo'></text>
					<input placeholder='搜索店铺名称' placeholder-class='placeholder' confirm-type='search' name="search" :value='sotreParam.keyword'
					 @confirm="searchSubmit"></input>
				</view>
				<view v-if="mer_location == 1" :class="'styleType'+store_street_theme" style="text-align: right;" class='iconfont search-right' @click='showMaoLocation(latitude,longitude)'>
					<view class="iconfont icon-dingwei"></view>
					<view class="right-text" v-if="recommend_address">
						{{recommend_address}}
					</view>
					<view class="iconfont icon-xiangyou" v-if="recommend_address"></view>
				</view>
			</view>
			<view class="nav-wrapper" :class="'styleType'+store_street_theme">
				<view class='nav acea-row row-middle' :class="'styleType'+store_street_theme">
					<view v-for="item in downMenus" :key="item.key" class='item' :class="{'font-colors':firstKey == item.key}" @click='set_where(item.key)'>
						<view class="">
							{{item.title}}
						</view>
						<view class="line" :class="{'font-line':firstKey == item.key}">
						</view>
					</view>
					<view class="item" @click="bindRight">
						<view>筛选
						<!-- <text class="iconfont icon-shaixuan"></text> -->
						</view>
						<view class="line">
						</view>
					</view>
				</view>
			</view>
			<!-- 店铺 -->
			<block>
				<view class="mer-box">
					<block v-if="store_street_theme == 1">
						<view class="mer-item" v-for="(item,index) in storeList" :key='index'>
							<view class="mer-hd" @click="goStore(item.mer_id)">
								<image :src="item.mini_banner?item.mini_banner:item.mer_banner"></image>
								<view class="mer-name">
									<image :src="item.mer_avatar"></image>
									<view class="">
										<view class="mer-top">
											<view class="txt line1">{{item.mer_name}}</view>
											<image v-if="margin_ico_switch==1 && margin_ico && item.is_margin==10" :src="margin_ico" class="store-margin"></image>
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
							<view class="pro-box" :class="'styleType'+store_street_theme">
								<navigator :url="`/pages/goods_details/index?id=${itemn.product_id}`" hover-class="none" class="pro-item" v-for="(itemn,indexn) in item.recommend" :key='indexn' v-if="item.recommend.length<=3">
									<view class="picture">
										<easy-loadimage mode="widthFix" :image-src="itemn.image"></easy-loadimage>
										<view v-if="itemn.border_pic" :style="{ backgroundImage: `url(${itemn.border_pic})` }" class="border-picture"></view>
									</view>
									<view class="price">
										<text>￥</text>{{itemn.price}}
									</view>
								</navigator>
							</view>
						</view>
					</block>
					<block v-if="store_street_theme == 2">
						<view class="mer-item2" v-for="(item,index) in storeList" :key='index'>
							<view class="mer-hd mer-shop-count" @click="goStore(item.mer_id)">
								<image class="mer-avatar" :src="item.mer_avatar"></image>
								<view class="mer-shop-right">
									<view class="mer-count">
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
									<view class="pro-box">
										<navigator :url="`/pages/goods_details/index?id=${itemn.product_id}`" hover-class="none" class="pro-item" v-for="(itemn,indexn) in item.recommend" :key='indexn' v-if="item.recommend.length<=3">
											<view class="picture">
												<easy-loadimage mode="widthFix" :image-src="itemn.image"></easy-loadimage>
												<view v-if="itemn.border_pic" :style="{ backgroundImage: `url(${itemn.border_pic})` }" class="border-picture"></view>
											</view>
											<view class="price">
												<text>￥</text>{{itemn.price}}
											</view>
										</navigator>
									</view>
								</view>
							</view>
						</view>
					</block>
					<block v-if="store_street_theme == 3">
						<view class="mer-item mer-item3" v-for="(item,index) in storeList" :key='index' :style="'background-image:url('+item.mini_banner+')'">
							<view class="mer-hd" @click="goStore(item.mer_id)">
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
							<view class="pro-box" :class="'styleType'+store_street_theme">
								<navigator :url="`/pages/goods_details/index?id=${itemn.product_id}`" hover-class="none" class="pro-item" v-for="(itemn,indexn) in item.recommend" :key='indexn' v-if="item.recommend.length<=3">
									<view class="picture">
										<image :src="itemn.image"></image>
										<view v-if="itemn.border_pic" :style="{ backgroundImage: `url(${itemn.border_pic})` }" class="border-picture"></view>
									</view>
									<view class="price">
										<text>￥</text>{{itemn.price}}
									</view>
								</navigator>
							</view>
						</view>
					</block>
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
		<rightSlider v-if="rightBox" :status="rightBox" :merList="merList" :storeTypeArr="storeTypeArr" @confirm="confirm" @close="close"></rightSlider>
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
	import { storeMerchantList, getGeocoder } from '@/api/store.js';
	import recommend from '@/components/recommend';
	import rightSlider from '@/components/rightSlider/index';
	import { merClassifly, getStoreTypeApi } from '@/api/store.js';
	import { mapGetters } from "vuex";
	import { goShopDetail } from '@/libs/order.js'
	import { configMap } from '@/utils';
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';
	const app = getApp();
	export default {
		components: {
			recommend,
			rightSlider,
			easyLoadimage
		},
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
					category_id : '',
					type_id: ''
				},
				storeKey: 0,
				storeScroll: true,
				mer_id: '',
				sortId: '',
				price_on: '',
				price_off: '',
				detaile_address: "",
				recommend_address: "",
				location_address: "",
				latitude: "",
				longitude: "",
				count: 0,
				storeTypeArr: [], //店铺类型
				merList: [], //商户分类
			};
		},
		onLoad(options) {
			this.sotreParam.type_id = options.type_id && options.type_id.split(',').toString() || ''
			this.sotreParam.category_id= options.cate_id && options.cate_id.split(',').toString() || ''
			this.storeList = [];
			if (this.mer_location == 1) {
				this.selfLocation()
			}
			this.storeMerchantList();
			this.getClassfication();
			this.getStoreType();
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
			...configMap({
				margin_ico_switch: 0,
				margin_ico: '',
				mer_location: 0,
				store_street_theme: 1,
				hide_mer_status: '',
			}, mapGetters(['viewColor'])),
		},
		methods: {
			// 获取商户分类
			getClassfication: function() {
				let temp = []
				merClassifly()
					.then(res => {
						temp = res.data.map(item => {
							return {
								...item,
								check: false
							}
						})
						if (this.sotreParam.category_id.length > 0) {
							this.sotreParam.category_id.forEach((ids, index) => {
								temp.forEach(el => {
									if (ids == el.merchant_category_id) {
										el.check = true
									}
								})
							})
						}
						this.merList = temp
					})
					.catch(res => {
						this.$util.Tips({
							title: res
						});
					});
			},
			// 获取店铺类型
			getStoreType: function() {
				let temp = []
				getStoreTypeApi()
					.then(res => {
						temp = res.data.map(item => {
							return {
								...item,
								check: false
							}
						})
						if (this.sotreParam.type_id.length > 0) {
							this.sotreParam.type_id.forEach((ids, index) => {
								temp.forEach(el => {
									if (ids == el.mer_type_id) {
										el.check = true
									}
								})
							})
						}
						this.storeTypeArr = temp
					})
					.catch(res => {
						this.$util.Tips({
							title: res
						});
					});
			},
			/** 打开地图**/
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
						address: this.location_address
					}).then(res=>{})
				}else{
				//#endif
					uni.openLocation({
						latitude: parseFloat(lat),
						longitude: parseFloat(long),
						name: '当前位置',
						address: this.location_address,
						scale: 8,
						success: function(res) {},
					});
				// #ifdef H5
				}
				//#endif	
			},
			showStoreLocation(item) {
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
					}).then(res=>{})
				}else{
				//#endif
					uni.openLocation({
						latitude: parseFloat(item.lat),
						longitude: parseFloat(item.long),
						scale: 8,
						name: item.mer_name,
						address: item.mer_address ? item.mer_address: '',
						success: function(res) {},
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
							this.detaile_address = res.data.address;
							this.location_address = res.data.address;
							this.recommend_address = res.data.address.length > 4 ? res.data.address.slice(0,4) + '...' : res.data.address
						}).catch(err => {
							uni.showToast({
								title: err,
								icon: 'none'
							})
						})
					},
					fail: (res) => {
						uni.showToast({
							title: res,
							icon: 'none',
							duration: 1000
						});
					},
				});
			},
			// 查找店铺
			storeMerchantList() {
				if (this.loading) return
				this.loading = true
				let rqData = {
					keyword: this.sotreParam.keyword,
					page: this.sotreParam.page,
					limit: 10,
					order: this.sotreParam.order,
					category_id: this.sotreParam.category_id,
					type_id: this.sotreParam.type_id
				}
				if (this.latitude) {
					rqData.location = this.latitude + ',' + this.longitude
				}
				storeMerchantList(rqData).then(res => {
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
			// 右侧切换
			bindRight() {
				this.sotreParam.page = 1
				this.rightBox = true
			},
			// 组件确定
			confirm(data) {
				let arr1 = [],arr2 = []
				if (data.storeTypeArr.length == 0) {
					this.sotreParam.type_id = ''
				} else {
					data.storeTypeArr.forEach(item => {
						arr1.push(item.mer_type_id)
					})
					this.sotreParam.type_id = arr1.toString();
				}
				if (data.merList.length == 0) {
					this.sotreParam.category_id = ''
				} else {
					data.merList.forEach(item => {
						arr2.push(item.merchant_category_id)
					})
					this.sotreParam.category_id = arr2.toString();
				}
				this.rightBox = data.status
				this.loadend = false;
				this.$set(this.sotreParam, 'page', 1)
				this.storeList = [];
				this.storeMerchantList();
			},
			// 组件关闭
			close() {
				this.rightBox = false
			},
			//点击事件处理
			set_where: function(e) {
				if (this.loading) return
				this.storeList = []
				this.firstKey = e
				this.sotreParam.page = 1
				this.sotreParam.order = this.downMenu[e].order
				this.storeMerchantList();
			},
			backjJump() {
				uni.navigateBack({
					delta: 1
				})
			},
		},
		//刷新
		onPullDownRefresh() {},
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
				this.storeMerchantList()
			}
		},
		// 滚动监听
		onPageScroll(e) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			uni.$emit('scroll');
		}		
	}
</script>

<style lang="scss" scoped>
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
		background-color: #fff;
		&.styleType1{
			background-color: var(--view-theme);
		}
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
			color: #fff;
			padding: 0 10rpx;
		}
		.icon-xiangyou,
		.icon-dingwei {
			font-size: 30rpx;
			color: #fff;
		}
	}
	.search-right.styleType2 .right-text, .search-right.styleType3 .right-text{
		color: #282828;
	}
	.search-right.styleType2 .icon-xiangyou,.search-right.styleType3 .icon-xiangyou{
		color: #999999;
	}
	.search-right.styleType2 .icon-dingwei,.search-right.styleType3 .icon-dingwei{
		color: #8A8A8A;
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
		height: 60rpx;
		background-color: #fff;
		border-radius: 50rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	.productList .search.styleType2 .input,.productList .search.styleType3 .input{
		background: #EDEDED;
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
		background-color: #fff;
		&.styleType1{
			background-color: var(--view-theme);
		}
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
	.border-picture {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: center/cover no-repeat;
	}
	.productList .nav {
		height: 86rpx;
		color: #454545;
		font-size: 28rpx;
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
	.productList .nav.styleType2 .item,.productList .nav.styleType3 .item {
		color: #282828;
	}
	.productList .nav .item.font-colors {
		font-weight: 500;
		color: #FFFFFF;
	}
	.productList .nav.styleType2 .item.font-colors,
	.productList .nav.styleType3 .item.font-colors {
		color: var(--view-theme);
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
	.productList .nav.styleType2 .item .font-line,
	.productList .nav.styleType3 .item .font-line{
		background-color: var(--view-theme);
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
		.store-margin{
			width: 30rpx!important;
			height: 32rpx!important;
			margin: 0 0 0 10rpx!important;
			border: none!important;
			border-radius: 0!important;
		}
		.mer-item {
			margin-bottom: 20rpx;
			background-color: #fff;
			border-radius: 16rpx;
			&.mer-item3{
				background-size: cover;
				background-repeat: no-repeat;
			}
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
					.txt {
						flex: 1;
					}
				}
			}
			/deep/.easy-loadimage{
				width: 100%;
				height: 214rpx;
				border-radius: 8rpx;
			}
			.pro-box {
				display: flex;
				align-items: center;
				padding: 20rpx 20rpx 30rpx;
				.pro-item {
					width: 218rpx;
					margin-right: 14rpx;
					.picture,/deep/image,uni-image {
						width: 100%;
						height: 214rpx;
						border-radius: 8rpx;
						position: relative;
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
				
				&.styleType3{
					padding: 20rpx;
					.pro-item {
						background-color: #fff;
						border-radius: 16rpx;
						text-align: center;
						padding: 10rpx 0 20rpx;
						
						.picture,/deep/image,uni-image {
							width: 194rpx;
							height: 194rpx;
							text-align: center;
							border-radius: 8rpx;
							position: relative;
							margin: 0 auto;
						}
					}
				}
			}
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
				color: #fff;
				border-radius: 30rpx;
				width: auto;
				background-color: var(--view-theme);
				border-color: var(--view-theme);
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
				.iconfont {
					font-size: 24rpx;
					line-height: 24rpx;
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
	
	.mer-item2{
		padding: 20rpx;
		background: #fff;
		margin-bottom: 20rpx;
		border-radius: 16rpx;
		.mer-shop-count{
			display: flex;
			.mer-avatar{
				width: 100rpx;
				height: 100rpx;
			}
			.mer-top{
				color: #282828;
			}
			.mer-shop-right{
				margin-left: 20rpx;
				.mer-btn{
					color: #666666;
				}
				
			}
			.pro-box {
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				.pro-item {
					width: 170rpx;
					margin-right: 20rpx;
					.picture,/deep/image,uni-image,/deep/.easy-loadimage {
						width: 100%;
						height: 170rpx;
						border-radius: 8rpx;
						position: relative;
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
		
	}	

	.no-shop {
		background-color: #fff;
		padding-bottom: calc(100% - 176rpx);
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
