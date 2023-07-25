<template>
	<view>
		<view class="main">
			<view class='search acea-row row-between-wrapper'>
				<view class='input acea-row row-between-wrapper'>
					<text class='iconfont icon-sousuo2'></text>
					<input type='text' :value='searchValue' :focus="focus" placeholder='请输入关键字' placeholder-class='placeholder' @input="setValue" confirm-type="search" @confirm="searchBut()"></input>
				</view>
				<view class='bnt' @tap='searchBut'>搜索</view>
			</view>
			<view class="tab-cont">
				<view v-if="goods.length" class="goods-wrap">
					<view class="goods">
						<WaterfallsFlow :wfList='goods' :isFind="false" :isAuth="false"/>
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
	import { graphicLstApi } from '@/api/community.js';
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
				keyword: '',
				loaded: false,
				loading: false,
				loadTitle: '加载更多',
				isShowAuth: false, //是否隐藏授权
				isAuto: false, //没有授权的不会自动授权
				where: {
					keyword: '',
					page: 1,
					limit: 30,
					topic_id: ''
				},
				searchValue: ""
			}
		},
		created() {},
		computed: {
			...mapGetters(['isLogin', 'uid']),
		},
		watch: {},
		onLoad: function(options) {
			this.where.keyword = this.searchValue =  options.searchValue ? options.searchValue : ''
			this.where.topic_id = options.id ? options.id : ''
			this.getGoods();
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
			setValue: function(event) {
				this.$set(this.where, 'keyword', event.detail.value);
			},
			searchBut(){
				this.loadend = this.loading = false
				this.where.page = 1
				this.goods = []
				this.getGoods()
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
		},
		onReachBottom() {
			this.getGoods();
		},
		onPullDownRefresh(){}
	}
</script>

<style lang="scss" scoped>
	.main .search {
		padding: 20rpx 0 0 10rpx;
	}
	.main .search .input {
		width: 580rpx;
		background-color: #f7f7f7;
		border-radius: 33rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 66rpx;
	}
	.main .search .input input {
		width: 460rpx;
		font-size: 28rpx;
	}
	.main .search .input .placeholder {
		color: #bbb;
	}
	.main .search .input .iconfont {
		color: #000;
		font-size: 35rpx;
	}
	.main .search .bnt {
		width: 120rpx;
		text-align: center;
		height: 66rpx;
		line-height: 66rpx;
		font-size: 28rpx;
		color: #282828;
	}
	.main {
		background: #ffffff;
		padding: 0 20rpx;
		min-height: 100vh;
		.goods-wrap{
			margin-top: 20rpx;
		}
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
