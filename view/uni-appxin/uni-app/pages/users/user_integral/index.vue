<template>
	<view :style="viewColor">
		<view class='integral-details'>
			<view class='header'>
				<view class='currentScore'>当前积分 <text @click="showProtocol=true" class="iconfont wenhao">?</text></view>
				<view class="scoreNum">{{userInfo.integral ? userInfo.integral : 0}}</view>
				<view class='line'></view>
				<view class='nav acea-row'>
					<view class='item'>
						<view class='num'>{{userInfo.totalGainIntegral || 0}}</view>
						<view>累计积分</view>
					</view>
					<view class='item'>
						<view class='num'>{{userInfo.deductionIntegral || 0}}</view>
						<view>累计消费</view>
					</view>
					<view class='item'>
						<view class='num'>{{userInfo.lockIntegral || 0}}</view>
						<view>冻结积分</view>
					</view>
				</view>
			</view>
			<view class='wrapper'>
				<view class='nav acea-row'>
					<view class='item acea-row row-center-wrapper' :class='current==index?"on":""' v-for="(item,index) in navList" :key='index'
					 @click='nav(index)'><text class='iconfont' :class="item.icon"></text>{{item.name}}</view>
				</view>

				<view class='list' :hidden='current != 0' >
					<view class='tip' v-if="userInfo.clear && userInfo.clear.status && userInfo.clear.nextClearIntegral > 0"><text class='iconfont icon-shuoming'></text>
						<text class="tip-text">提示：您有部分积分将于{{userInfo.clear.nextClearDay}}过期，请尽快使用！</text>
					</view>
					<view class='item acea-row row-between-wrapper' v-for="(item,index) in integralList" :key="index">
						<view>
							<view class='state'>{{item.mark}}</view>
							<view>{{item.create_time}}</view>
						</view>
						<view class='num p-color' v-if="item.pm">+{{item.number}}</view>
						<view class='num' v-else>-{{item.number}}</view>
					</view>
					<view class='loadingicon acea-row row-center-wrapper' v-if="integralList.length>0">
						<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadTitle}}
					</view>
					<view v-if="integralList.length == 0">
						<emptyPage title="暂无积分记录哦～"></emptyPage>
					</view>
				</view>

				<view v-if="integral_status" class='list2' :hidden='current!=1'>
					<navigator class='item acea-row row-between-wrapper' open-type='switchTab' hover-class='none' url='/pages/index/index'>
						<view class='pictrue'>
							<image src='../../../static/images/score.png'></image>
						</view>
						<view class='name'>购买商品可获得积分奖励</view>
						<view class='earn'>赚积分</view>
					</navigator>
					<navigator class='item acea-row row-between-wrapper' hover-class='none' url='/pages/users/user_sgin/index'>
						<view class='pictrue'>
							<image src='../../../static/images/score.png'></image>
						</view>
						<view class='name'>每日签到可获得积分奖励</view>
						<view class='earn'>赚积分</view>
					</navigator>
					<!--#ifndef APP-PLUS-->
					<view class='item acea-row row-between-wrapper' @click="shareIntegral">
						<view class='pictrue'>
							<image src='../../../static/images/score.png'></image>
						</view>
						<view class='name'>邀请好友可获得积分奖励</view>
						<view class='earn'>赚积分</view>
					</view>
					<!--#endif-->
				</view>
			</view>
		</view>
		<view class="instructions" v-if="showProtocol">
			<view class="setAgCount">
				<i class="icon iconfont icon-cha" @click="showProtocol = false"></i>
				<div class="title">积分说明</div>
				<view class="content">
					<jyf-parser :html="protocol" ref="article" :tag-style="tagStyle"></jyf-parser>
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
	import { getIntegralInfo, getIntegralList, getAgreementApi } from '@/api/user.js';
	import {
		mapGetters
	} from "vuex";
	import authorize from '@/components/Authorize';
	import emptyPage from '@/components/emptyPage.vue';
	import parser from "@/components/jyf-parser/jyf-parser";
	const app = getApp();
	export default {
		components: {
			authorize,
			emptyPage,
			"jyf-parser": parser,
		},
		data() {
			return {
				navList: [{
						'name': '分值明细',
						'icon': 'icon-mingxi'
					},
					{
						'name': '分值提升',
						'icon': 'icon-tishengfenzhi'
					}
				],
				current: 0,
				page: 1,
				limit: 10,
				integralList: [],
				userInfo:{},
				loadend: false,
				loading: false,
				loadTitle: '加载更多',
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false,//是否隐藏授权
				showProtocol: false,
				protocol: '',
				tagStyle: {
					img: 'width:100%;display:block;',
					video: 'width:100%;'
				},
				integral_status: true,
			};
		},
		computed: mapGetters(['isLogin','viewColor']),
		onLoad() {
			if (this.isLogin) {
				this.getUserInfo();
			} else {
				this.isAuto = true;
                this.isShowAuth = true
			}
			this.getAgreement();
		},

		/**
		   * 页面上拉触底事件的处理函数
		   */
		  onReachBottom: function () {
		    this.getIntegralList();
		  },
		methods: {
			/**
			 * 授权回调
			 */
			onLoadFun: function() {
				this.isShowAuth = false;
				this.getUserInfo();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			getUserInfo: function() {
				let that = this;
				getIntegralInfo().then(function(res) {
					that.$set(that,'userInfo',res.data);
					that.getIntegralList()
				}).catch(res => {
					this.integral_status = false
					return that.$util.Tips({
						title: res
					});
				});
			},
			/*获取积分说明*/
			getAgreement() {
				let that = this
				getAgreementApi('sys_integral_rule').then(res => {
					that.protocol = res.data.sys_integral_rule
				})
			},
			/**
			 * 获取积分明细
			 */
			getIntegralList: function() {
				let that = this;
				if (that.loading) return;
				if (that.loadend) return;
				that.loading = true;
				that.loadTitle = '';
				getIntegralList({
					page: that.page,
					limit: that.limit
				}).then(function(res) {
					let list = res.data.list,
						loadend = list.length < that.limit;
					that.integralList = that.$util.SplitArray(list, that.integralList);
					that.$set(that,'integralList',that.integralList);
					that.page = that.page + 1;
					that.loading = false;
					that.loadend = loadend;
					that.loadTitle = loadend ? '哼~😕我也是有底线的~' : "加载更多";
				}, function(res) {
					this.loading = false;
					that.loadTitle = '加载更多';
				});
			},
			shareIntegral(){
				uni.setStorageSync('isIntegral',true)
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			nav: function(current) {
				this.current = current;
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		background-color: #fff;
	}
	.integral-details .header {
		background-image: url('data:image/png;base64,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');
		background-color: var(--view-theme);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 460rpx;
		font-size: 72rpx;
		color: #fff;
		padding: 31rpx 0 45rpx 0;
		box-sizing: border-box;
		text-align: center;
	}

	.integral-details .header .currentScore {
		font-size: 26rpx;
		color: rgba(255, 255, 255, 0.8);
		text-align: center;
		margin-bottom: 11rpx;
	}
	.currentScore .wenhao{
		display: inline-block;
		width: 32rpx;
		height: 32rpx;
		line-height: 32rpx;
		text-align: center;
		// font-size: 20rpx;
		border-radius: 100%;
		background-color: rgba(255,255,255,.8);
		color: var(--view-theme);
		margin-left: 4rpx;
	}

	.wenhao{
		margin-top: -10rpx;
	}

	.integral-details .header .line {
		width: 60rpx;
		height: 3rpx;
		background-color: #fff;
		margin: 20rpx auto 0 auto;
	}

	.integral-details .header .nav {
		font-size: 22rpx;
		color: rgba(255, 255, 255, 0.8);
		flex: 1;
		margin-top: 35rpx;
	}

	.integral-details .header .nav .item {
		width: 33.33%;
		text-align: center;
	}

	.integral-details .header .nav .item .num {
		color: #fff;
		font-size: 40rpx;
		margin-bottom: 5rpx;
	}

	.integral-details .wrapper .nav {
		flex: 1;
		width: 690rpx;
		border-radius: 20rpx 20rpx 0 0;
		margin: -96rpx auto 0 auto;
		background-color: #f7f7f7;
		height: 96rpx;
		font-size: 30rpx;
		color: #bbb;
	}

	.integral-details .wrapper .nav .item {
		text-align: center;
		width: 50%;
	}

	.integral-details .wrapper .nav .item.on {
		background-color: #fff;
		color: var(--view-theme);
		font-weight: bold;
		border-radius: 20rpx 0 0 0;
	}
	.p-color {
		color: var(--view-priceColor);
	}
	.integral-details .wrapper .nav .item:nth-of-type(2).on {
		border-radius: 0 20rpx 0 0;
	}

	.integral-details .wrapper .nav .item .iconfont {
		font-size: 38rpx;
		margin-right: 10rpx;
	}

	.integral-details .wrapper .list {
		background-color: #fff;
		padding: 24rpx 30rpx;
	}

	.integral-details .wrapper .list .tip {
		font-size: 25rpx;
		width: 690rpx;
		border-radius: 50rpx;
		background-color: #fff5e2;
		border: 1px solid #ffeac1;
		color: #c8a86b;
		padding: 10rpx 20rpx 10rpx 55rpx;
		box-sizing: border-box;
		margin-bottom: 24rpx;
		position: relative;
	}
	.integral-details .wrapper .list .tip .iconfont {
		font-size: 35rpx;
		margin-right: 15rpx;
		position: absolute;
		top: 10rpx;
		left: 16rpx;
	}
	.integral-details .wrapper .list .item {
		height: 124rpx;
		border-bottom: 1px solid #eee;
		font-size: 24rpx;
		color: #999;
	}

	.integral-details .wrapper .list .item .state {
		font-size: 28rpx;
		color: #282828;
		margin-bottom: 8rpx;
	}

	.integral-details .wrapper .list .item .num {
		font-size: 36rpx;
	}

	.integral-details .wrapper .list2 {
		background-color: #fff;
		padding: 24rpx 0;
	}

	.integral-details .wrapper .list2 .item {
		background-image: linear-gradient(to right, #fff7e7 0%, #fffdf9 100%);
		width: 690rpx;
		height: 180rpx;
		position: relative;
		border-radius: 10rpx;
		margin: 0 auto 20rpx auto;
		padding: 0 25rpx 0 180rpx;
		box-sizing: border-box;
	}

	.integral-details .wrapper .list2 .item .pictrue {
		width: 90rpx;
		height: 150rpx;
		position: absolute;
		bottom: 0;
		left: 45rpx;
	}

	.integral-details .wrapper .list2 .item .pictrue image {
		width: 100%;
		height: 100%;
	}

	.integral-details .wrapper .list2 .item .name {
		width: 285rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #c8a86b;
	}

	.integral-details .wrapper .list2 .item .earn {
		font-size: 26rpx;
		color: #c8a86b;
		border: 2rpx solid #c8a86b;
		text-align: center;
		line-height: 52rpx;
		height: 52rpx;
		width: 160rpx;
		border-radius: 50rpx;
	}
	.instructions{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		z-index: 10;
	}
	.instructions .setAgCount {
		background: #fff;
		width: 656rpx;
		height: 458px;
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: 12rpx;
		-webkit-border-radius: 12rpx;
		padding: 52rpx;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		overflow: hidden;
		.content {
			height: 900rpx;
			overflow-y: scroll;
			/deep/ p {
				font-size: 13px;
				line-height: 22px;
			}
			/deep/ img {
				max-width: 100%;
			}
		}
	}
	.instructions .setAgCount .icon {
		font-size: 42rpx;
		color: #b4b1b4;
		position: absolute;
		top: 15rpx;
		right: 15rpx;
	}

	.instructions .setAgCount .title {
		color: #333;
		font-size: 32rpx;
		text-align: center;
		font-weight: bold;
	}
	.instructions .setAgCount .content {
		margin-top: 32rpx;
		color: #333;
		font-size: 26rpx;
		line-height: 22px;
		text-align: justify;
		text-justify: distribute-all-lines;
		height: 756rpx;
		overflow-y: scroll;
	}
</style>
