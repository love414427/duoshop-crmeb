<template>
	<view :style="viewColor">
		<view class='commission-details'>
			<view class='promoterHeader'>
				<timeSlot @changeTime="changeTime"></timeSlot>
			</view>
			<view class='sign-record' v-if="type==1">
				<block v-for="(item,index) in recordList" :key="index" v-if="recordList.length>0">
					<view class='list'>
						<view class='item'>
							<view class='listn'>
								<view class='itemn acea-row row-between-wrapper'>
									<view>
										<block v-if="item.status>=0">
											<view class='name line1' v-if="item.extract_type == 0">银行卡提现</view>
											<view class='name line1' v-if="item.extract_type == 1">微信提现</view>
											<view class='name line1' v-if="item.extract_type == 2">支付宝提现</view>
											<view class='name line1' v-if="item.extract_type == 3">提现到零钱</view>
										</block>
										<block v-else>
											<view class='name line1'>提现失败<text class="message">({{item.fail_msg}})</text></view>
										</block>
										<view>{{item.create_time}}</view>
									</view>
									<view class='nums' v-if="item.status>=0">-{{item.extract_price}}</view>
									<view class='nums p-color acea-row row-between-wrapper' v-else>
										<text v-if="item.status == 0" class="item-label">冻结中</text>
										+{{item.extract_price}}
									</view>

								</view>
							</view>
						</view>
					</view>
				</block>
				<view v-if="recordList.length == 0">
					<emptyPage title='暂无提现记录~'></emptyPage>
				</view>
			</view>
			<view class='sign-record' v-if="type==2">
				<block v-for="(item,index) in recordList" :key="index" v-if="recordList.length>0">
					<view class='list'>
						<view class='item'>
							<view class='listn'>
								<view class='itemn acea-row row-between-wrapper'>
									<view>
										<view class='name line1'>{{item.title}}</view>
										<view>{{item.create_time}}</view>
									</view>
									<view class='nums' v-if="item.pm==0">-{{item.number}}</view>
									<view class='nums p-color acea-row row-between-wrapper' v-else>
										<text class="item-label">冻结中</text>
										+{{item.number}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
				<view v-if="recordList.length == 0">
					<emptyPage title='暂无提现记录~'></emptyPage>
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
	import {
		getCommissionInfo,
		spreadCount,
		getSpreadInfo,
		extractLst,
		brokerage_list,
		spreadInfo
	} from '@/api/user.js';
	import { mapGetters } from "vuex";
	import authorize from '@/components/Authorize';
	import emptyPage from '@/components/emptyPage.vue';
	import timeSlot from '@/components/timeSlot/index.vue';
	export default {
		components: {
			authorize,
			emptyPage,
			timeSlot
		},
		data() {
			return {
				name: '',
				type: 0,
				page: 1,
				limit: 12,
				recordList: [],
				recordType: 0,
				recordCount: 0,
				status: false,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				extractCount: 0,
				userInfo:'',
				times: [],
				start: "",
				stop: ""
			};
		},
		computed: mapGetters(['isLogin','viewColor']),
		onLoad(options) {
			if (this.isLogin) {
				this.type = options.type;
			} else {
				this.isAuto = true;
        this.isShowAuth = true
			}
		},
		onShow: function() {
			let type = this.type;
			if(type == 2){
				uni.setNavigationBarTitle({
					title: "佣金记录"
				});
				this.name = '佣金明细';
				this.recordType = 2;
			}
			if(type == 1){
				uni.setNavigationBarTitle({
					title: "提现记录"
				});
				this.name = '提现总额';
				this.recordType = 1;
			}
			this.spreadInfo();
			this.getRecordList();
		},
		methods: {
			spreadInfo(){
				spreadInfo().then(res => {
					this.userInfo = res.data
				});
			},
			onLoadFun() {
				this.isShowAuth = false;
				this.getRecordList();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			changeTime(time) {
				this.start = time.start
				this.stop = time.stop
				this.searchSubmitValue()
			},
			searchSubmitValue(e) {
				this.page = 1;
				this.limit = 20;
				this.status = false;
				this.$set(this, 'recordList', []);
				this.$set(this, 'times', []);
				this.getRecordList()
			},
			getRecordList: function() {
				let that = this;
				let page = that.page;
				let limit = that.limit;
				let status = that.status;
				let recordType = that.recordType;
				let start = that.start;
				let stop = that.stop;
				let recordList = that.recordList;
				let recordListNew = [];
				if (status == true) return;
				if(this.type == 1){
					extractLst({
						page: page,
						limit: limit,
						start: start,
						stop: stop
					}, recordType).then(res => {
						let len = res.data.list.length;
						let recordListData = res.data.list;
						recordListNew = recordList.concat(recordListData);
						that.status = limit > len;
						that.page+=1;
						that.$set(that, 'recordList', recordListNew);
					});
				}
				if(this.type == 2){
					brokerage_list({
						page: page,
						limit: limit,
						start: start,
						stop: stop
					}).then(res => {
						let len = res.data.list.length;
						let recordListData = res.data.list;
						recordListNew = recordList.concat(recordListData);
						that.status = limit > len;
						that.page+=1;
						that.$set(that, 'recordList', recordListNew);
					});
				}
			},
			getRecordListCount: function() {
				let that = this;
				getSpreadInfo().then(res => {
					that.recordCount = res.data.commissionCount;
					that.extractCount = res.data.extractCount;
				});
			}
		},
		onReachBottom: function() {
			this.getRecordList();
		}
	}
</script>

<style scoped lang="scss">
	.promoterHeader{
		background-image: linear-gradient(to right, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
	}
	.sign-record{
		margin-top: 14rpx;
	}
	.commission-details .promoterHeader .headerCon .money {
		font-size: 36rpx;
	}
	.p-color {
		color: var(--view-priceColor);
	}
	.commission-details .listn .nums {
		font-size: 32rpx;
		font-weight: bold;
	}
	.message{
		font-size: 18rpx;
		color: #fc4141;
	}
	.item-label{
		font-size: 18rpx;
		display: flex;
		width: 76rpx;
		height: 26rpx;
		text-align: center;
		justify-content: center;
		background-color: var(--view-bgColor);
		margin-right: 6rpx;
		font-weight: normal;
	}
</style>
