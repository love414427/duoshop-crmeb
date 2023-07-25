<template>
	<view :class="bgTabVal==2?'fullsize noRepeat':bgTabVal==1?'repeat ysize':'noRepeat ysize'"
		:style="'overflow-x:hidden;background-color:'+bgColor+';background-image: url('+bgPic+');min-height:'+windowHeight+'px;'">
		<skeleton :show="showSkeleton" :isNodes="isNodes" ref="skeleton" loading="chiaroscuro" selector="skeleton" bgcolor="#FFF"></skeleton>
		<view v-if="!errorNetwork" :style="{visibility: showSkeleton ? 'hidden' : 'visible'}">
			<view class="page-index skeleton">
				<block>
					<!-- #ifdef H5 -->
					<view v-for="(item, index) in styleConfig" :key="index">
						<block v-if="item.name != 'headerSerch' && item.name != 'tabNav'">
							<component
								:is="item.name"
								:index="index"
								:isFixed="isFixed"
								:dataConfig="item"
								:tempArr="tempArr"
								:userInfo="userInfo"
								:tabTitle="navTop"
								:merId="mer_id"
								:navIndex="navIndex"
								:communityStatus="community_status"
								@detail="goDetail"
							></component>
						</block>
						<block v-if="item.name == 'headerSerch'">
							<headerSerch
								:is="'headerSerch'"
								:isFixed="isFixed"
								:dataConfig="item"
								:tempArr="tempArr"
								:userInfo="userInfo"
								:tabTitle="navTop"
								:merId="mer_id"
								@detail="goDetail"
							></headerSerch>
						</block>
						<block v-if="item.name == 'tabNav'">
							<tabNav
								:is="'tabNav'"
								:isFixed="isFixed"
								:dataConfig="item"
								:tempArr="tempArr"
								:merId="mer_id"
								:userInfo="userInfo"
								:tabTitle="navTop"
								@detail="goDetail"
							></tabNav>
						</block>
					</view>
					<!-- #endif -->
					<!-- #ifdef MP  || APP-PLUS-->
					<block v-for="(item, index) in styleConfig" :key="index" >
						<view v-show="navIndex == 0">
							<activeParty v-if="item.name == 'activeParty'" :merId="mer_id" :dataConfig="item"></activeParty>
							<articleList v-if="item.name == 'articleList'" :merId="mer_id" :dataConfig="item"></articleList>
							<bargain v-if="item.name == 'bargain'" :merId="mer_id" :dataConfig="item"></bargain>
							<blankPage v-if="item.name == 'blankPage'" :merId="mer_id" :dataConfig="item"></blankPage>
							<combination v-if="item.name == 'combination'" :merId="mer_id" :dataConfig="item"></combination>
							<topic v-if="item.name == 'topic'" :merId="mer_id" :dataConfig="item"></topic>
							<coupon v-if="item.name == 'coupon'" :merId="mer_id" :dataConfig="item"></coupon>
							<customerService v-if="item.name == 'customerService'" :merId="mer_id" :dataConfig="item"></customerService>
							<goodList v-if="item.name == 'goodList'" :merId="mer_id" :dataConfig="item" @detail="goDetail"></goodList>
							<guide v-if="item.name == 'guide'" :merId="mer_id" :dataConfig="item"></guide>
							<liveBroadcast v-if="item.name == 'liveBroadcast'" :merId="mer_id" :dataConfig="item"></liveBroadcast>
							<menus v-if="item.name == 'menus'" :merId="mer_id" :dataConfig="item"></menus>
							<news v-if="item.name == 'news'" :merId="mer_id" :dataConfig="item"></news>
							<presellList v-if="item.name == 'presellList'" :merId="mer_id" :dataConfig="item"></presellList>
							<promotionList v-if="item.name == 'promotionList'" :merId="mer_id" :dataConfig="item" :tempArr="tempArr" @detail="goDetail"></promotionList>
							<richText v-if="item.name == 'richText'" :merId="mer_id" :dataConfig="item"></richText>
							<seckill v-if="item.name == 'seckill'" :merId="mer_id" :dataConfig="item"></seckill>
							<swiperBg v-if="item.name == 'swiperBg'" :merId="mer_id" :dataConfig="item"></swiperBg>
							<pictureCube v-if="item.name == 'pictureCube'" :merId="mer_id" :dataConfig="item"></pictureCube>
							<swipers v-if="item.name == 'swipers'" :merId="mer_id" :dataConfig="item"></swipers>
							<titles v-if="item.name == 'titles'" :merId="mer_id" :dataConfig="item"></titles>
						</view>
						
						<headerSerch v-if="item.name == 'headerSerch'" :merId="mer_id" :dataConfig="item" :userInfo="userInfo"></headerSerch>
						<tabNav v-if="item.name == 'tabNav'" :merId="mer_id" :dataConfig="item" class="tabNav" :tabTitle="navTop"
						@bindHeight="bindHeighta" :isFixed="isFixed"></tabNav>
					</block>
					<!-- #endif -->
					<view>
						<view class="loadingicon acea-row row-center-wrapper" v-if="tempArr.length && styleConfig[styleConfig.length - 1].name == 'promotionList'">
							<text class="loading iconfont icon-jiazai" :hidden="loading == false"></text>
							{{ loadTitle }}
						</view>
					</view>
				</block>
			</view>
		</view>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse" :isGoIndex="false"></authorize>
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
var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
let app = getApp();
import { getUserInfo } from '@/api/user.js';
import { getDiy, getIndexData, getAppVersion } from '@/api/api.js';
// #ifdef MP-WEIXIN
import { getTemlIds } from '@/api/api.js';
import { SUBSCRIBE_MESSAGE, TIPS_KEY } from '@/config/cache';
// #endif
import { getShare, follow } from '@/api/public.js';
import { goShopDetail } from '@/libs/order.js';
import { mapGetters } from 'vuex';
import { getProductslist, getMerProductHot, getStoreCategory } from '@/api/store.js';
import { initiateAssistApi } from '@/api/activity.js';
import { spread } from '@/api/user.js';
import mConfig from './component/index.js';
import authorize from '@/components/Authorize';
// #ifdef MP || APP-PLUS
import activeParty from '../index/component/activeParty';
import headerSerch from '../index/component/headerSerch';
import coupon from '../index/component/coupon';
import bargain from '../index/component/bargain';
import blankPage from '../index/component/blankPage';
import combination from '../index/component/combination';
import customerService from '../index/component/customerService';
import goodList from '../index/component/goodList';
import guide from '../index/component/guide';
import liveBroadcast from '../index/component/liveBroadcast';
import menus from '../index/component/menus';
import news from '../index/component/news';
import topic from '../index/component/topic';
import presellList from '../index/component/presellList';
import richText from '../index/component/richText';
import seckill from '../index/component/seckill';
import swiperBg from '../index/component/swiperBg';
import pictureCube from '../index/component/pictureCube'
import tabNav from '../index/component/tabNav';
import titles from '../index/component/titles';
// #endif
import { silenceBindingSpread, configMap } from '@/utils';
import history from '@/mixins/history';
import shareScence from '@/libs/spread';
import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';
export default {
	computed: configMap({hide_mer_status:0,community_status:0,share_title:''},
	mapGetters(['isLogin', 'uid'])),
	mixins: [history],
	components: {
		easyLoadimage,
		...mConfig,
    authorize,
		// #ifdef MP || APP-PLUS
		activeParty,
		headerSerch,
		bargain,
		coupon,
		blankPage,
		combination,
		customerService,
		goodList,
		liveBroadcast,
		menus,
		news,
		topic,
		presellList,
		richText,
		seckill,
		swiperBg,
		pictureCube,
		tabNav,
		titles
		// #endif
	},
	data() {
		return {
			styleConfig: [],
			showSkeleton: true, //骨架屏显示隐藏
			isNodes: 0, //控制什么时候开始抓取元素节点,只要数值改变就重新抓取
			errorNetwork: false,
			ad: {home_ad_pic: ''},
			userInfo: {},
			loading: false,
			isAuto: false, //没有授权的不会自动授权
			isShowAuth: false, //是否隐藏授权
			statusBarHeight: statusBarHeight,			
			navTop: [],
			subscribe: false,
			itemNew: [],
			menus: [{url:'',pic:'',id: '',name:''},{url:'',pic:'',id: '',name:''},{url:'',pic:'',id: '',name:''},{url:'',pic:'',id: '',name:''},{url:'',pic:'',id: '',name:''},{url:'',pic:'',id: '',name:''},{url:'',pic:'',id: '',name:''},{url:'',pic:'',id: '',name:''},{url:'',pic:'',id: '',name:''},{url:'',pic:'',id: '',name:''}],
			window: false,
			iShidden: false,
			couponList: [],
			lovely: [],
			marTop: 0,
			datatime: 0,
			mer_id: '',
			loadend: false,
			loading: false,
			loadTitle: '加载更多',
			sortProduct: [],
			where: {
				pid: 0,
				page: 1,
				limit: 6
			},
			hostProduct: [],
			hotPage: 1,
			hotLimit: 30,
			hotScroll: true,
			hotLoading: false,
			hotTitle: '加载更多',
			prodeuctTop: 0,
			pinkInfo: '',
			searchH: 0,
			domOffsetTop: 50,
			// #ifdef APP-PLUS || MP
			isFixed: true,
			// #endif
			// #ifdef H5
			isFixed: false,
			// #endif
			goodScroll: true, //精品推荐开关
			params: {
				//精品推荐分页
				page: 1,
				limit: 10
			},
			tempArr: [], //精品推荐临时数组
			numConfig: 0,
			swiperCur: 0,
			brandList: [],
			d: '',
			h: '',
			m: '',
			s: '',
			sum_h: '',
			sortMarTop: 0,
			// #ifdef MP || APP-PLUS
			mpHeight: 108,
			// #endif
			// #ifndef MP || APP-PLUS
			mpHeight: 0,
			// #endif
			currSpid: '',
			mer_id: '',
			navIndex: 0,
			_options:{},
			activity_banner: true,
			activityData: [],
			sortMpTop: 0,
			isHeaderSerch: false,
			bgColor: '',
			bgPic: '',
			bgTabVal: '',
			windowHeight: 0,
		};
	},
	/**
	 * 用户点击右上角分享
	 */
	// #ifdef MP
	onShareAppMessage: function() {
		let that = this;
		wx.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
		return {
			title: that.share_title,
			path: '/pages/store/home/index?id='+ that.mer_id +'&spid='+ that.uid
		};
	},
	onShareTimeline: function() {
		let that = this;
		return {
			title: that.share_title,
			query: {
				spid: that.uid
			},
			imageUrl: ''
		};
	},
	// #endif
	onLoad(options) {
		let that = this;
		this._options = options;
		this.mer_id = this._options.id
		// #ifdef APP-PLUS
		const pages = getCurrentPages();
		const page = pages[pages.length - 1];
		this.isSupport = !this.isSupport;
		// #endif
		that.$nextTick(function() {
			uni.getSystemInfo({
				success: function(res) {
					that.windowHeight = res.windowHeight;
				}
			});
		})
		this.pageLoad(options);
		setTimeout(() => {
			this.isNodes++;
		}, 100);
	},
	onShow() {
		
	},
	onHide() {

	},
	onReady() {

	},
	watch: {
	},
	onPullDownRefresh(){
		setTimeout(()=> {
			uni.stopPullDownRefresh();
		}, 100);
	},
	methods: {
		pageLoad(options){
			let that = this;
			if (options.spid) {
				that.currSpid = options.spid;
				app.globalData.spid = options.spid;
			}
			// #ifdef MP
			if (options.scene) {
				let value = that.$util.getUrlParams(decodeURIComponent(options.scene));
				if (value.id) options.id = value.id;
				//记录推广人uid
				if (value.spid) {
					that.currSpid = value.spid;
					app.globalData.spid = value.spid;
				}
			}
			// #endif
			shareScence(that.currSpid, that.isLogin);
			this.isLogin && silenceBindingSpread();
			this.getIndexConfig()
			Promise.all([
				this.diyData()
			]);
			if (this.isLogin) {
				this.getUserInfo();
			}
		},
		bindHeighta(data) {
			// #ifdef APP-PLUS
			this.sortMpTop = data.top + data.height;
			// #endif
		},
		// 对象转数组
		objToArr(data) {
			let obj = Object.keys(data).sort();
			let m = obj.map(key => data[key]);
			return m;
		},
		diyData() {
			let that = this;
			getDiy({id: this.mer_id}).then(res => {
				setTimeout(() => {
					that.isNodes++;
				}, 0);
				that.errorNetwork = false
				let data = res.data;
				if (data.is_bg_color) {
					that.bgColor = data.color_picker
				}
				if (data.is_bg_pic) {
					that.bgPic = data.bg_pic
					that.bgTabVal = data.bg_tab_val
				}
				uni.setNavigationBarTitle({
					title: res.data.title
				});
				if(!res.data.value || res.data.value==""){
					uni.redirectTo({
						url: '/pages/store/home/index?id=' + that.mer_id
					});
				}else{
					that.styleConfig = that.objToArr(res.data.value);
					that.styleConfig.forEach((item, index, arr) => {
						if (item.name == 'headerSerch') {
							that.isHeaderSerch = true
						}
					});
				}
			}).catch(err => {
				uni.showToast({
					title: err,
					icon: 'none'
				});		
			});
		},
		// 微信登录回调
		onLoadFun: function(e) {
			this.isShowAuth = false;
		},
		// 菜单详情
		goMenuDetail(item) {
			if (item.url == '/pages/goods_cate/goods_cate') {
				let data = this.$util.stringIntercept(item.url, 1, '\?');
				data = this.$util.stringIntercept(data, 1, '\=');
				uni.setStorageSync('storeIndex', data);
				uni.switchTab({
					url: '/pages/goods_cate/goods_cate'
				});
			} else {
				uni.navigateTo({
					url: item.url
				});
			}
		},
		goDetails(item) {
			goShopDetail(item, this.uid).then(res => {
				if (this.isLogin) {
					initiateAssistApi(item.activity_id)
						.then(res => {
							let id = res.data.product_assist_set_id;
							uni.hideLoading();
							uni.navigateTo({
								url: '/pages/activity/assist_detail/index?id=' + id
							});
						})
						.catch(err => {
							uni.showToast({
								title: err,
								icon: 'none'
							});
						});
				} else {
					this.isAuto = true;
					this.isShowAuth = true
				}
			});
		},
		/**
		 * 获取个人用户信息
		 */
		getUserInfo: function() {
			let that = this;
			getUserInfo().then(res => {
				that.userInfo = res.data;
			});
		},		
		//分类产品
		get_product_list: function() {
			let that = this;
			// if (!that.loadend) return;
			if (that.loading) return;
			that.loading = true;
			that.loadTitle = '';
			getProductslist(that.where)
				.then(res => {
					let list = res.data.list;
					let productList = that.$util.SplitArray(list, that.sortProduct);
					let loadend = list.length < that.where.limit;
					that.loadend = loadend;
					that.loading = false;
					that.loadTitle = loadend ? '已全部加载' : '加载更多';
					that.$set(that, 'sortProduct', productList);
					that.$set(that.where, 'page', that.where.page + 1);
				})
				.catch(err => {
					that.loading = false;
					that.loadTitle = '加载更多';
				});
		},
		// 首页数据
		getIndexConfig: function() {
			let that = this;
			getStoreCategory(this.mer_id).then(res => {
				that.$set(that, 'menus', res.data.menu);
				res.data.unshift({
					cate_name: '首页'
				});
				that.$set(that, 'navTop', res.data);
				that.reloadData();
			});
		},
		reloadData() {
			setTimeout(() => {
				this.showSkeleton = false
			}, 500)
		},
		// 授权关闭
		authColse: function(e) {
			this.isShowAuth = e;
		},
		// 首发新品详情
		goDetail(item) {
			if (item.activity && item.activity.type === '2' && !this.isLogin) {
				// #ifdef H5
				uni.showModal({
					title: '提示',
					content: '您未登录，请登录！',
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/users/login/index'
							});
						} else if (res.cancel) {
						}
					}
				});
				// #endif
				// #ifdef MP
				this.$set(this, 'isAuto', true);
				this.$set(this, 'isShowAuth', true);
				// #endif
				return;
			} else {
				goShopDetail(item, this.uid).then(res => {
					uni.navigateTo({
						url: `/pages/goods_details/index?id=${item.id}`
					});
				});
			}
		},
		// 分类详情
		godDetail(item) {
			uni.navigateTo({
				url: `/pages/goods_details/index?id=${item.id}`
			});
		},
		//拼团详情
		goCombinDetail(item) {
			uni.navigateTo({
				url: `/pages/activity/combination_details/index?id=${item.product_group_id}`
			});
		},
		countTime: function() {
			// 获取当前时间
			var date = new Date();
			var now = date.getTime();
			//设置截止时间
			var endDate = new Date('2020-10-22 23:23:23');
			var end = endDate.getTime();
			//时间差
			var leftTime = end - now;
			//定义变量 d,h,m,s保存倒计时的时间
			if (leftTime >= 0) {
				this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
				this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
				this.m = Math.floor((leftTime / 1000 / 60) % 60);
				this.s = Math.floor((leftTime / 1000) % 60);
				this.sum_h = this.d * 24 + this.h;
			}
			//递归每秒调用countTime方法，显示动态时间效果
			setTimeout(this.countTime, 1000);
		},

	},
	mounted() {

	},
	// 滚动到底部
	onReachBottom() {

	},
	// 滚动监听
	onPageScroll(e) {
		// #ifdef H5
		if (this.isHeaderSerch) {
			if (e.scrollTop > this.domOffsetTop) {
				this.isFixed = true;
			}
			if (e.scrollTop < this.domOffsetTop) {
				this.$nextTick(() => {
					this.isFixed = false;
				});
			}
		} else {
			this.isFixed = false
		}
		// #endif
		// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
		uni.$emit('scroll');
	}
};
</script>
<style lang="scss">
page {
	display: flex;
	flex-direction: column;
}
.main {
	padding: 0 20rpx;
}
.colum0{
	white-space: nowrap; 
	display: flex;
}
.ysize {
	background-size: 100%;
}
.fullsize {
	background-size: 100% 100%;
}
.repeat {
	background-repeat: repeat;
}
.noRepeat {
	background-repeat: no-repeat;
}
.area-row {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: block;
	width: 100%;
	text-align: center;
}
.page-index {
	display: flex;
	flex-direction: column;
	min-height: 100%;
	.page_content {
		/* #ifdef MP || APP-PLUS */
		padding-top: 270rpx;
		/* #endif */
		.page_bg{
			background: linear-gradient(180deg, #fff 0%, #f5f5f5 100%);
		}
		.nav {
			padding: 0 0rpx 30rpx;
			flex-wrap: wrap;
			/* #ifdef MP */
			margin-top: 0;
			/* #endif */
			/* #ifdef H5 */
			margin-top: 0;
			/* #endif */
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 20%;
				margin-top: 30rpx;
				image {
					width: 82rpx;
					height: 82rpx;
				}
			}
		}
		.index-product-wrapper {	
			.nav-bd {
				display: flex;
				align-items: center;
				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 25%;
					.txt {
						font-size: 32rpx;
						color: #282828;
					}
					.label {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 124rpx;
						height: 32rpx;
						margin-top: 5rpx;
						font-size: 24rpx;
						color: #999;
					}
					&.active {
						color: $theme-color;
						.label {
							background: linear-gradient(90deg, $bg-star 0%, $bg-end 100%);
							border-radius: 16rpx;
							color: #fff;
						}
					}
				}
			}
			.list-box {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.item {
					width: 345rpx;
					margin-bottom: 20rpx;
					background-color: #fff;
					border-radius: 10px;
					overflow: hidden;
					image {
						width: 100%;
						height: 345rpx;
					}
					.text-info {
						padding: 10rpx 20rpx 15rpx;
						.title {
							color: #222222;
						}
						.old-price {
							margin-top: 8rpx;
							font-size: 26rpx;
							color: #aaaaaa;
							text-decoration: line-through;
							text {
								margin-right: 2px;
								font-size: 20rpx;
							}
						}
						.price {
							display: flex;
							align-items: flex-end;
							color: $theme-color;
							font-size: 34rpx;
							font-weight: 800;
							text {
								padding-bottom: 4rpx;
								font-size: 24rpx;
								font-weight: normal;
							}
							.txt {
								display: flex;
								align-items: center;
								justify-content: center;
								width: 28rpx;
								height: 28rpx;
								margin-left: 15rpx;
								margin-bottom: 10rpx;
								border: 1px solid $theme-color;
								border-radius: 4rpx;
								font-size: 22rpx;
								font-weight: normal;
							}
						}
					}
				}
				&.on {
					display: flex;
				}
			}
		}
	}
}
.productList {
	background-color: #f1f1f1;
	min-height: 70vh;
	.sort {
		width: 710rpx;
		max-height: 380rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 16rpx;
		padding: 8rpx 0rpx 30rpx;
		flex-wrap: wrap;
		margin: 25rpx auto 0 auto;
		&.no_pad {
			padding: 0;
		}
		.item {
			width: 20%;
			margin-top: 30rpx;
			text-align: center;
			.pictrues {
				width: 90rpx;
				height: 90rpx;
				background: rgba(248, 248, 248, 1);
				border-radius: 50%;
				margin: 0 auto;
			}
			image {
				width: 90rpx;
				height: 90rpx;
			}
			.text {
				color: #272727;
				font-size: 24rpx;
				margin-top: 10rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

		}
	}
}
.productList .list {
	padding: 0 20rpx;
}
.productList .list.on {
	background-color: #fff;
	border-top: 1px solid #f6f6f6;
}
.productList .list .item {
	width: 345rpx;
	margin-top: 20rpx;
	background-color: #fff;
	border-radius: 10rpx;
	.name{
		display: flex;
		align-items: center;
		.name_text{
			display: inline-block;
			max-width: 200rpx;
		}
	}
}
.productList .list .item.on {
	width: 100%;
	display: flex;
	border-bottom: 1px solid #f6f6f6;
	padding: 30rpx 0;
	margin: 0;
}
.productList .list .item .pictrue {
	position: relative;
	width: 100%;
	height: 345rpx;
}
.productList .list .item .pictrue.on {
	width: 180rpx;
	height: 180rpx;
}
.productList .list .item .pictrue image,
.productList .list .item .pictrue uni-image,
.productList .list .item .pictrue .easy-loadimage{
	width: 100%;
	height: 100%;
	border-radius: 10rpx 10rpx 0 0;
}
.productList .list .item .pictrue image.on {
	border-radius: 6rpx;
}
.productList .list .item .text {
	padding: 14rpx 17rpx 26rpx 17rpx;
	font-size: 28rpx;
	color: #212121;
}
.productList .list .item .text.on {
	width: 508rpx;
	padding: 0 0 0 22rpx;
}
.productList .list .item .text .money {
	font-size: 26rpx;
	font-weight: bold;
	margin-top: 8rpx;
}
.productList .list .item .text .coupon {
	background: rgba(255, 248, 247, 1);
	border: 1px solid rgba(233, 51, 35, 1);
	border-radius: 4rpx;
	font-size: 20rpx;
	margin-left: 18rpx;
	padding: 1rpx 4rpx;
}
.productList .list .item .text .money.on {
	margin-top: 50rpx;
}
.productList .list .item .text .money .num {
	font-size: 34rpx;
}
.productList .list .item .text .vip {
	font-size: 22rpx;
	color: #aaa;
	margin-top: 7rpx;
}
.productList .list .item .text .vip.on {
	margin-top: 12rpx;
}
.productList .list .item .text .vip .vip-money {
	font-size: 24rpx;
	color: #282828;
	font-weight: bold;
}

.productList .list .item .text .vip .vip-money image {
	width: 46rpx;
	height: 21rpx;
	margin-left: 4rpx;
}
.pictrue {
	position: relative;
}
// .fixed {
// 	z-index: 100;
// 	position: fixed;
// 	left: 0;
// 	top: 0;
// 	background-color: #fff;
// 	box-shadow: 0 10rpx 20rpx -5rpx rgba(0, 0, 0, 0.06);
// }
.combination-item {
	width: 328rpx;
	height: 180rpx;
	display: inline-block;
	background-size: 100%;
	position: relative;
	background-size: cover;
	border-radius: 16rpx;
	.img-box {
		width: 122rpx;
		height: 122rpx;
		position: absolute;
		image,.easy-loadimage,uni-image {
			width: 122rpx;
			height: 122rpx;
		}
	}
	.name {
		font-size: 30rpx;
		color: #333333;
		font-weight: bold;
		line-height: 32rpx;
	}
	.price {
		display: block;
		font-size: 30rpx;
		font-weight: bold;
		margin-top: 8rpx;
		color: #e93323;
		text {
			font-size: 20rpx;
		}
	}
}
</style>
