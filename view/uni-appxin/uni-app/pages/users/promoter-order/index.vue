<template>
	<view :style="viewColor">
		<view class="promoter-order">
			<view class="promoter-header">
				<view class="search">
					<view class="search-content acea-row row-middle">
						<text class="iconfont icon-sousuo"></text>
						<input type='text' placeholder='搜索用户昵称或商品名称' @confirm="searchSubmitValue" confirm-type='search'
						name="search" placeholder-class='placeholder' />
					</view>
				</view>
				<timeSlot @changeTime="changeTime"></timeSlot>
			</view>
			<view class='list' v-if="recordList.length>0">
			<view class="top_num">
				共 <text class="main_color">{{total}}</text> 笔订单
			</view>
				<block v-for="(item,index) in recordList" :key="index">
					<view class='item'>
						<view class='listn'>
								<view class='itenm'>
									<view class='top acea-row row-between-wrapper'>
										<view class='pictxt acea-row row-between-wrapper'>
											<view class='pictrue'>
												<image v-if="item.user.avatar" :src='item.user.avatar'></image>
												<image v-else class="avatar" src="/static/images/f.png"></image>
											</view>
											<view class='text line1'>{{item.user.nickname}}</view>
										</view>
										<view class='money' v-if="item.status >= 2">返佣：<text class='p-color'>￥{{item.brokerage}}</text></view>
										<view class='money' v-else>暂未返佣：<text class='p-color'>￥{{item.brokerage}}</text></view>
									</view>
									<view class='bottom'>
										<view class="acea-row">
											<view class='name'>商品名称：</view>
											<view class="line1 store_name">{{item.orderProduct[0]['cart_info']['product']['store_name']}}</view>
										</view>
										<view><text class='name'>订单编号：</text>{{item.order_sn}}</view>
										<view><text class='name'>下单时间：</text>{{item.pay_time}}</view>
									</view>
								</view>
						</view>
					</view>
				</block>
			</view>
			<view v-if="recordList.length == 0">
				<emptyPage title="暂无推广订单～"></emptyPage>
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
	import {
		spreadOrder,
		spreadInfo
	} from '@/api/user.js';
	import {
		mapGetters
	} from "vuex";
	import authorize from '@/components/Authorize';
	import emptyPage from '@/components/emptyPage.vue';
	import timeSlot from '@/components/timeSlot/index.vue';
	export default {
		components: {
			authorize,
			timeSlot,
			emptyPage
		},
		data() {
			return {
				page: 1,
				limit: 8,
				keyword: "",
				start: 0,
				stop: 0,
				status: false,
				total:0,
				sum_brokerage:0,
				recordList: [],
				recordCount: 0,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				userInfo:'',
				time: "", //时间|today=今天|yesterday=昨天|month=本月
				times: [],
			};
		},
		computed: mapGetters(['isLogin','viewColor']),
		onLoad() {
			if (this.isLogin) {
				this.getRecordOrderList();
			} else {
				this.isAuto = true;
				this.isShowAuth = true
			}
		},
		methods: {
			spreadInfo(){
				spreadInfo().then(res => {
					this.userInfo = res.data
				});
			},
			onLoadFun() {
				this.isShowAuth = false;
				this.getRecordOrderList();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			searchSubmitValue(e) {
				this.keyword = e ? e.detail.value : ''
				this.page = 1;
				this.limit = 20;
				this.status = false;
				this.$set(this, 'recordList', []);
				this.$set(this, 'times', []);
				this.getRecordOrderList()
			},
			changeTime(time) {
				this.start = time.start
				this.stop = time.stop
				this.searchSubmitValue()
			},
			getRecordOrderList: function() {
				let that = this;
				let page = that.page;
				let limit = that.limit;
				let status = that.status;
				let recordList = that.recordList;
				let recordListNew = [];
				if (status == true) return;
				spreadOrder({
					start: that.start,
					stop: that.stop,
					keyword: that.keyword,
					page: page,
					limit: limit
				}).then(res => {
					that.total = res.data.count;
					that.sum_brokerage = res.data.sum_brokerage;
					let len = res.data.list ? res.data.list.length : 0;
					let recordListData = res.data.list;
					recordListNew = recordList.concat(recordListData);
					that.recordCount = res.data.count || 0;
					that.status = limit > len;
					that.page +=1;
					that.$set(that, 'recordList', recordListNew);
				});
			}
		},
		onReachBottom() {
			this.getRecordOrderList();
		}
	}
</script>

<style scoped lang="scss">
	.promoterHeader {
		background-image: linear-gradient(to right, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
	}
	.promoter-header{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
		width: 100%;
	}
	.p-color {
		color: var(--view-priceColor);
	}
	.search {
		padding: 17rpx 30rpx;
		background-color: var(--view-theme);
		.search-content {
			width: 100%;
			height: 60rpx;
			padding: 0 30rpx;
			border-radius: 30rpx;
			background-color: #FFFFFF;
			font-size: 26rpx;	
		}
		.iconfont {
			margin-right: 10rpx;
			font-size: 26rpx;
			color: #999999;
		}
		.placeholder {
			font-size: 26rpx;
			color: #999999;
		}	
		.input {
			flex: 1;
		}
	}
	.promoter-order .list{
		margin-top: 200rpx;
	}
	.promoter-order .list .item .title {
		height: 133rpx;
		padding: 0 30rpx;
		font-size: 26rpx;
		color: #999;
	}
	.promoter-order .list .item .title .data {
		font-size: 28rpx;
		color: #282828;
		margin-bottom: 5rpx;
	}
	.promoter-order .list .item .listn .itenm {
		background-color: #fff;
	}
	.promoter-order .list .item .listn .itenm~.itenm {
		margin-top: 12rpx;
	}
	.promoter-order .list .item .listn .itenm .top {
		margin-left: 30rpx;
		padding-right: 30rpx;
		border-bottom: 1px solid #eee;
		height: 100rpx;
	}
	.promoter-order .list .item .listn .itenm .top .pictxt {
		width: 320rpx;
	}
	.promoter-order .list .item .listn .itenm .top .pictxt .text {
		width: 230rpx;
		font-size: 30rpx;
		color: #282828;
	}
	.promoter-order .list .item .listn .itenm .top .pictxt .pictrue {
		width: 64rpx;
		height: 64rpx;
	}
	.promoter-order .list .item .listn .itenm .top .pictxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 3rpx solid #fff;
		box-sizing: border-box;
		box-shadow: 0px 1px 12px 0px rgba(0,0,0,0.102);
	}
	.promoter-order .list .item .listn .itenm .top .money {
		font-size: 28rpx;
	}
	.promoter-order .list .item .listn .itenm .bottom {
		padding: 20rpx 30rpx;
		font-size: 28rpx;
		color: #666;
		line-height: 1.6;
	}
	.promoter-order .list .item .listn .itenm .bottom .name {
		color: #999;
	}
	.promoter-order .list .item .listn .itenm .bottom .store_name{
		max-width: 550rpx;
	}
	.top_num{
		padding: 0 30rpx;
		font-size: 26rpx;
		color: #666;
		line-height: 86rpx;
	}
	.main_color{
		color: var(--view-theme);
	}
</style>
