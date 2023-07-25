<template>
	<view class="container" :style="viewColor">
		<view class="header" :style="{ 'background-image': `url(${domain}/static/images/plant-header.png)`}">
			<view class="user_wrapper acea-row">
				<image :src="userInfo.avatar || '/static/images/f.png'" class="picture"></image>
				<view class="user_text">
					<view class="name acea-row">
						<text>{{userInfo.nickname || ''}}</text>
						<image v-if="userInfo.member_icon" class="level_icon" :src="userInfo.member_icon" alt="">
					</view>
					<view class="user_id">ID: {{userInfo.uid || ''}}</view>
				</view>
			</view>
			<view class="plant_info acea-row">
				<view class="count_wrapper acea-row">
					<navigator :url="userInfo.is_self ? '/pages/plantGrass/plant_user_attention/index' : ''" class="item" hover-class="none">
						<text>{{userInfo.focus}}</text>关注
					</navigator>
					<navigator :url="userInfo.is_self ? '/pages/plantGrass/plant_user_fans/index' : ''" class="item" hover-class="none">
						<text>{{userInfo.fans}}</text>粉丝
					</navigator>
					<view class="item">
						<text>{{userInfo.start}}</text>获赞
					</view>
				</view>
				<view v-if="!userInfo.is_self" @click.stop="followAuthor">
					<button v-if="!userInfo.is_start" class="follow_btn focus">
						<text class="iconfont icon-jiahao2"></text>关注
					</button>
					<button v-else class="follow_btn focused">已关注</button>
				</view>
				<view v-else>
					<navigator hover-class="none" url="/pages/plantGrass/plant_release/index" class="follow_btn focus">
						<text class="iconfont icon-fabu"></text>发布
					</navigator>
				</view>
			</view>
		</view>
		<view class="main">
			<view v-if="userInfo.is_self" class="tab_count">
				<text @click.stop="changeTab(0)" :class="tab==0 ? 'on' : ''">作品</text>
				<text @click.stop="changeTab(1)" :class="tab==1 ? 'on' : ''">赞过</text>
			</view>
			<view class="tab-cont">
				<view v-if="goods.length > 0" class="goods-wrap">
					<view class="goods">
						<WaterfallsFlow :wfList='goods' :isAuth="1" :uid="parseInt(uid)" :tab="tab"/>
					</view>
				</view>
				<view v-if="goods.length == 0 && !loading" class="empty">
					<image src="/static/images/no_thing.png"></image>
					<text>暂无内容哦~</text>
				</view>
				<view class='loadingicon acea-row row-center-wrapper'>
					<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>
						<view class="end" :hidden="loading || goods.length == 0"><text :class="loaded ? 'loaded' : ''">{{loadTitle}}</text>
					</view>
				</view>
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
	import { userInfoApi, followAuthorApi, userArticleLst, starArticleLst } from '@/api/community.js';
	import { mapGetters } from "vuex";
	import authorize from '@/components/Authorize';
	import { HTTP_REQUEST_URL } from '@/config/app';
	const app = getApp();
	export default {
		components: {
			authorize,
			WaterfallsFlow
		},
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				goods: [], // 商铺商品
				loadTitle: '加载更多',
				loading: false,
				loaded: false,
				isShowAuth: false, //是否隐藏授权
				isAuto: false, //没有授权的不会自动授权
				userInfo: {},
				where: {
					page: 1,
					limit: 30
				},
				tab: 0,
				uid: ''
			}
		},
		created() {},
		computed: {
			...mapGetters(['isLogin','viewColor']),
		},
		watch: {},
		onLoad: function(options) {
			let that = this;
			that.uid = options.id
			if (that.isLogin) {
				that.getAuthorInfo(that.uid);
				that.getList(that.uid);
			} else {
				this.isAuto = true;
				this.isShowAuth = true
			}
		},
		onShow() {},
		onReady() {},
		mounted: function() {},
		methods: {
			// 授权回调
			onLoadFun() {
				this.isShowAuth = false
				this.getAuthorInfo(this.uid);
				this.getList(this.uid);
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
			/*获取用户信息*/
			getAuthorInfo(id){
				let that = this;
					userInfoApi(id).then(res => {
						that.userInfo = res.data
					});
			},
			// 关注作者
			followAuthor: function() {
				if (this.isLogin === false) {
					this.isAuto = true;
					this.isShowAuth = true
				} else {
					let status = this.userInfo.is_start ? false : true
					followAuthorApi(this.userInfo.uid,{status: status}).then(res => {
						if (res.status === 200) {
							this.userInfo.is_start = this.userInfo.is_start ? false : true
						}
						this.$util.Tips({
							title: res.message
						});
					});
				}
			},
			changeTab(tab){
				this.tab = tab
				this.where.page = 1
				this.loaded = this.loading = false
				this.goods = []
				let uid = this.userInfo.is_self ? this.uid : this.userInfo.uid
				this.getList(uid)
			},
			// 获取用户的作品
			getList: function(uid) {
				let that = this;
				if (that.loaded || that.loading) return;
				that.loading = true;
				that.loadTitle = '';
				that.tab == 1 ? this.where.is_type = 1 : this.where.is_type = ''
				that.tab == 0 ?
				userArticleLst(uid,that.where).then(res => {
					let list = res.data.list;
					let goods = that.$util.SplitArray(list, that.goods);
					that.loaded = list.length < that.where.limit;
					that.loading = false;
					that.loadTitle = that.loaded ? '到底了' : '加载更多';
					that.$set(that, 'goods', goods);
					that.$set(that.where, 'page', that.where.page + 1);
				}).catch(err => {
					that.loading = false;
					uni.showToast({
						title: err,
						icon: 'none'
					})
				}) :
				starArticleLst(that.where).then(res => {
					that.loading = false;
					let list = res.data.list;
					let goods = that.$util.SplitArray(list, that.goods);
					that.loaded = list.length < that.where.limit;
					that.loading = false;
					that.loadTitle = that.loaded ? '到底了' : '加载更多';
					that.$set(that, 'goods', goods);
					that.$set(that.where, 'page', that.where.page + 1);
				}).catch(err => {
					that.loading = false;
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			}
		},
		onReachBottom() {
			let uid = this.userInfo.is_self ? this.uid : this.userInfo.uid
			this.getList(uid);
		},
		onPullDownRefresh(){},
		// 滚动监听
		onPageScroll(e) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			uni.$emit('scroll');
		}
	}
</script>

<style lang="scss" scoped>
.container{
	background: #ffffff;
	min-height: 100vh;
}
.header{
	width: 750rpx;
	height: 400rpx;
	padding: 56rpx 30rpx 0;
	background-repeat: no-repeat;
	background-size: 100%;
	.user_wrapper{
		align-items: center;
		.image,uni-image,image{
			width: 140rpx;
			height: 140rpx;
			border-radius: 100%;
			border: 4rpx solid #ffffff;
		}
		.user_text{
			margin-left: 22rpx;
			color: #FFFFFF;
			.name{
				font-size: 34rpx;
				font-weight: bold;
				align-items: center;
			}
			.user_id{
				margin-top: 16rpx;
				font-size: 24rpx;
			}
			.level_icon{
				width: 34rpx;
				height: 32rpx;
				margin: 4rpx 0 0 6rpx;
				border: none;
			}
		}
	}
	.plant_info{
		margin-top: 60rpx;
		align-items: center;
		justify-content: space-between;
		.count_wrapper{
			color: #FFFFFF;
			font-size: 24rpx;
			.item{
				text-align: center;
				margin-right: 60rpx;
				&:last-child{
					margin-right: 0;
				}
				text{
					display: block;
					font-size: 30rpx;
					margin-top: 10rpx;
				}
			}
		}
	}
	.follow_btn{
		color: #ffffff;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 146rpx;
		height: 62rpx;
		background-color: transparent;
		background-image: linear-gradient(270deg, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
		border-radius: 33rpx;
		.iconfont{
			font-size: 16rpx;
			margin-right: 12rpx;
		}
		.icon-fabu{
			font-size: 24rpx;
		}
		&.focused{
			background: transparent;
			color: #FFFFFF;
			border: 1px solid #FFFFFF;
		}
	}
}
.main {
	background: #ffffff;
	padding: 30rpx 0;
	border-radius: 24rpx 24rpx 0 0;
	position: relative;
	top: -20rpx;
	.tab_count{
		margin-bottom: 40rpx;
		text-align: center;
		text{
			font-size: 28rpx;
			color: #999999;
			margin: 0 30rpx;
			position: relative;
			padding-bottom: 10rpx;
			&.on{
				font-size: 32rpx;
				color: #282828;
				font-weight: bold;
				&::after{
					content: "";
					width: 40rpx;
					height: 5rpx;
					background: var(--view-theme);
					position: absolute;
					bottom: 0;
					left: 10rpx;
				}
			}
		}
	}
}
.goods {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 750rpx;
	padding: 0 20rpx;
}
.empty{
	margin: 130rpx 0 150rpx;
	text-align: center;
	image,uni-image{
		display: inline-block;
		width: 414rpx;
		height: 305rpx;
	}
	text{
		display: block;
		color: #999999;
		font-size: 26rpx;
	}
}
.end{
	margin-top: 50rpx 0;
	text-align: center;
	text{
		color: #999999;
		font-size: 22rpx;
		position: relative;
		&.loaded{
			&::before,&::after{
				content: "";
				display: inline-block;
				width: 22rpx;
				height: 1rpx;
				background: #999999;
				position: absolute;
				top: 18rpx;
				opacity: .5;
			}
			&::before{
				left: -30rpx;
			}
			&::after{
				right: -30rpx;
			}
		}
	}
}
</style>
