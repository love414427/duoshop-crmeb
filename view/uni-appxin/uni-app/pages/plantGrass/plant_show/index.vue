<template>
	<view :style="viewColor">
		<view class="main">
			<view class="show_main area-row">
				<view class="picture">
					<image :src="proInfo.image"></image>
				</view>
				<view class="show_info">
					<view class="show_name line1">{{proInfo.store_name}}</view>
					<view class="show_count"><text class="num">{{count}}</text>条买家秀</view>
				</view>
			</view>
			<view class="tab-cont">
				<view v-if="goods.length" class="goods-wrap">
					<view class="goods">
						<WaterfallsFlow :wfList='goods' :isFind="false" :isShow="true" :isAuth="false"/>
					</view>
				</view>
				<view :hidden="!loading" class="acea-row row-center-wrapper loadingicon">
					<text class="iconfont icon-jiazai loading"></text>
				</view>
				<emptyPage v-if="goods.length == 0 && !loading" title="暂无文章~"></emptyPage>
			</view>
		</view>
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
	import WaterfallsFlow from '@/components/plantWaterfallsFlow/WaterfallsFlow.vue'
	import { graphicLstApi, graphicProApi} from '@/api/community.js';
	import { mapGetters } from "vuex";
	import authorize from '@/components/Authorize';
	import emptyPage from '@/components/emptyPage.vue'
	const app = getApp();
	export default {
		components: {
			authorize,
			emptyPage,
			WaterfallsFlow,
		},
		data() {
			return {
				focus: false,
				goods: [], // 商铺商品
				count: 0, //买家秀条数
				keyword: '',
				loaded: false,
				loading: false,
				loadTitle: '加载更多',
				isShowAuth: false, //是否隐藏授权
				isAuto: false, //没有授权的不会自动授权
				proInfo: {},
				where: {
					keyword: '',
					page: 1,
					limit: 30,
					topic_id: '',
					spu_id: ''
				},
			}
		},
		created() {},
		computed: {
			...mapGetters(['isLogin','uid','scrollTop','viewColor']),
		},
		watch: {},
		onLoad: function(options) {
			this.where.spu_id = options.spu_id
			this.getGoods();
			this.getProDetail();
		},
		onShow() {},
		mounted: function() {},
		methods: {
			// 授权回调
			onLoadFun() {
				this.isShowAuth = false
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			// 打开授权
			authOpen: function() {
				let that = this;
				if (that.isLogin === false) {
					this.isAuto = true;
					this.isShowAuth = true
				}
			},
			// 获取关注商品
			getGoods: function() {
				let that = this;
				if (that.loadend) return;
				if (that.loading) return;
				that.loading = true;
				that.loadTitle = '';
				graphicLstApi(that.where).then(res => {
					that.loading = false;
					let list = res.data.list;
					let goodsList = that.$util.SplitArray(list, that.goods);
					let loadend = list.length < that.where.limit;
					that.loadend = loadend;
					that.loading = false;
					that.count = res.data.count;
					that.loadTitle = loadend ? '已全部加载' : '加载更多';
					that.$set(that, 'goods', goodsList);
					that.$set(that.where, 'page', that.where.page + 1);
				}).catch(err => {
					that.loading = false;
					that.goodsLoading = false;
					uni.showToast({
						title: err,
						icon: 'none'
					})
				});
			},
			getProDetail(){
				let that = this
				graphicProApi(that.where.spu_id).then(res => {
					that.proInfo = res.data
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				});
			}
		},
		onReachBottom() {
			this.getGoods();
		},
		// 滚动监听
		onPageScroll(e) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			uni.$emit('scroll');
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		padding: 20rpx 20rpx 0;
		min-height: 100vh;
		.goods-wrap{
			margin-top: 20rpx;
		}
	}
	.show_main{
		padding: 20rpx 30rpx;
		background: #fff;
		border-radius: 16rpx;
		justify-content: space-between;
		display: flex;
		.picture{
			width: 108rpx;
			height: 108rpx;
		}
		.show_info{
			width: 510rpx;
			position: relative;
		}
		.show_name{
			color: #282828;
			font-size: 28rpx;
			font-weight: bold;
			font-family: 'PingFang SC';
		}
		.show_count{
			position: absolute;
			bottom: 4rpx;
			color: #282828;
			font-size: 24rpx;
			 .num{
				 font-size: 30rpx;
				 font-weight: bold;
				 color: var(--view-theme);
			 }
		}
	}
	.show_main .picture image{
		width: 100%;
		height: 100%;
	}
	.goods {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.empty-box{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 0;
		padding-top: 200rpx;
		image{
			width: 414rpx;
			height: 240rpx;
		}
		.txt{
			font-size: 26rpx;
			color: #999;
		}
	}
</style>
