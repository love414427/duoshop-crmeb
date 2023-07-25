<template>
	<view :style="viewColor">
		<view class='my-promotion'>
			<view class="header">
				<view class='name acea-row row-center-wrapper'>
					<view>当前佣金</view>
					<text @click="showProtocol=true" class="iconfont wenhao">?</text>
					<navigator v-if="userInfo.brokerage && userInfo.show_brokerage" url='/pages/users/user_brokerage/index' hover-class="none" class='record area-row row-middle'>
						<image v-if="userInfo.brokerage.brokerage_icon" class="level_icon" :src="userInfo.brokerage.brokerage_icon"></image>
						<image v-else class="level_icon" src="../static/images/level_avatar.png"></image>
						<text>{{userInfo.brokerage.brokerage_name}}</text>
						<text class='iconfont icon-xiangyou'></text>
					</navigator>
				</view>
				<view class='num'>{{userInfo.total_brokerage_price}}</view>
				<view class='profit acea-row row-between-wrapper'>
					<view class='item'>
						<view>昨日收益</view>
						<view class='money'>{{userInfo.yesterday_brokerage}}</view>
					</view>
					<view class='item'>
						<navigator url='/pages/users/user_spread_money/index?type=1' hover-class="none">累计已提<text class='iconfont icon-xiangyou font20'></text></navigator>
						<view class='money'>{{userInfo.total_extract}}</view>
					</view>
				</view>
			</view>
			<!-- #ifdef APP-PLUS || H5 -->
			<navigator url="/pages/users/user_cash/index" hover-class="none" class='bnt b-color'>立即提现</navigator>
			<!-- #endif -->
			<!-- #ifdef MP -->
			<view @click="openSubscribe('/pages/users/user_cash/index')" class='bnt b-color'>立即提现</view>
			<!-- #endif -->
			<view class='list acea-row row-between-wrapper'>
				<navigator url='/pages/users/user_spread_code/index' hover-class="none" class='item acea-row row-center-wrapper row-column'>
					<text class='iconfont icon-erweima'></text>
					<view>推广名片</view>
				</navigator>
				<navigator url='/pages/users/promoter-list/index' hover-class="none" class='item acea-row row-center-wrapper row-column'>
					<text class='iconfont icon-tongji'></text>
					<view>推广人统计</view>
				</navigator>
				<navigator url='/pages/users/user_spread_money/index?type=2' hover-class="none" class='item acea-row row-center-wrapper row-column'>
					<text class='iconfont icon-qiandai'></text>
					<view>佣金明细</view>
				</navigator>
				<navigator url='/pages/users/promoter-order/index' hover-class="none" class='item acea-row row-center-wrapper row-column'>
					<text class='iconfont icon-dingdan'></text>
					<view>推广人订单</view>
				</navigator>
				<navigator url='/pages/users/promoter_rank/index' hover-class="none" class='item acea-row row-center-wrapper row-column'>
					<text class='iconfont icon-paihang1'></text>
					<view>推广人排行</view>
				</navigator>
				<navigator url='/pages/users/commission_rank/index' hover-class="none" class='item acea-row row-center-wrapper row-column'>
					<text class='iconfont icon-paihang'></text>
					<view>佣金排行</view>
				</navigator>
			</view>
		</view>
		<view class="instructions" v-if="showProtocol">
			<view class="setAgCount">
				<i class="icon iconfont icon-cha" @click="showProtocol = false"></i>
				<div class="title">佣金说明</div>
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
	import { getUserInfo,spreadInfo, commissionDescription } from '@/api/user.js';
	import { openEextractSubscribe } from '@/utils/SubscribeMessage.js';
	import {
		mapGetters
	} from "vuex";
	import authorize from '@/components/Authorize';
	import parser from "@/components/jyf-parser/jyf-parser";
	export default {
		components: {
			authorize,
			"jyf-parser": parser,
		},
		data() {
			return {
				userInfo: [],
				yesterdayPrice: 0.00,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false ,//是否隐藏授权
				protocol: '',
				showProtocol: false,
				tagStyle: {
					img: 'width:100%;display:block;',
					video: 'width:100%;'
				},
			};
		},
		computed: mapGetters(['isLogin','viewColor']),
		onLoad() {
			if (this.isLogin) {
				this.spreadInfo();
				this.getCommissionDescription();
			} else {
				this.isAuto = true;
				this.isShowAuth = true
			}
		},
		methods: {
			// 获取佣金说明
			getCommissionDescription() {
				commissionDescription().then(res => {
					if(res.status == 200) {
						this.protocol = res.data.sys_extension_agree
					}
				})
			},
			onLoadFun: function() {
				this.isShowAuth = false;
				this.spreadInfo();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			openSubscribe: function(page) {
				uni.showLoading({
					title: '正在加载',
				})
				openEextractSubscribe().then(res => {
					uni.hideLoading();
					uni.navigateTo({
						url: page,
					});
				}).catch(() => {
					uni.hideLoading();
				});
			},
			/**
			 * 获取佣金数据
			 */
			spreadInfo: function() {
				let that = this;
				spreadInfo().then(res => {
					that.$set(that,'userInfo',res.data);
				}).catch((err) => {
					that.$util.Tips({
						title: err,
					});
					setTimeout(()=>{
						uni.switchTab({
							url: '/pages/user/index',
						});
					},1000)
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.font20{
		font-size: 20rpx;
	}
	.b-color {
		background-color: var(--view-theme);
	}
	.level_icon{
		width: 43rpx;
		height: 43rpx;
		margin-right: 6rpx;
	}
	.my-promotion .header {
		background-image: url('data:image/png;base64,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');
		background-size: 100% 100%;
		background-color: var(--view-theme);
		width: 100%;
		height: 375rpx;
	}
	.my-promotion .header .name {
		font-size: 30rpx;
		color: #fff;
		padding-top: 57rpx;
		position: relative;
	}
	.wenhao{
		width: 34rpx;
		height: 34rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		border-radius: 50%;
		background-color: rgba(255,255,255,.8);
		color: var(--view-theme);
		margin-left: 4rpx;
	}
	.icon-wenti{
		background-color: #fff;
		border-radius: 50%;
		color: #e93323;
		position: relative;
		margin-left: 4rpx;
		&:after{
			content: '';
			width: 20rpx;
			height: 20rpx;
			border: 8rpx solid #fff;
			border-radius: 100%;
			position: absolute;
			top: 0;
			left: -2rpx;
		}
	}
	.my-promotion .header .name .record {
		font-size: 26rpx;
		color: #D16739;
		position: absolute;
		right: 0;
		padding: 10rpx;
		border-radius: 30rpx 0 0 30rpx;
		background-color: #FFF9E3;
		-webkit-box-align: center;
		-moz-box-align: center;
		-o-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-lines: multiple;
		-moz-box-lines: multiple;
		-o-box-lines: multiple;
		-webkit-flex-wrap: wrap;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
	}

	.my-promotion .header .name .record .iconfont {
		font-size: 25rpx;
		margin-left: 10rpx;
		vertical-align: 2rpx;
	}

	.my-promotion .header .num {
		text-align: center;
		color: #fff;
		margin-top: 28rpx;
		font-size: 90rpx;
		// font-family: 'Guildford Pro';
	}

	.my-promotion .header .profit {
		padding: 0 20rpx;
		margin-top: 35rpx;
		font-size: 24rpx;
		color: rgba(255, 255, 255, 0.8);
	}

	.my-promotion .header .profit .item {
		min-width: 200rpx;
		text-align: center;
	}

	.my-promotion .header .profit .item .money {
		font-size: 34rpx;
		color: #fff;
		margin-top: 5rpx;
	}

	.my-promotion .bnt {
		font-size: 28rpx;
		color: #fff;
		width: 278rpx;
		height: 88rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 68rpx;
		margin: -32rpx auto 0 auto;
		border: 10rpx solid #fff;
	}

	.my-promotion .list {
		padding: 0 20rpx 50rpx 20rpx;
		margin-top: 10rpx;
	}

	.my-promotion .list .item {
		width: 345rpx;
		height: 240rpx;
		border-radius: 20rpx;
		background-color: #fff;
		margin-top: 20rpx;
		font-size: 30rpx;
		color: #666;
	}

	.my-promotion .list .item .iconfont {
		font-size: 70rpx;
		background-image: linear-gradient(to right, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		margin-bottom: 20rpx;
	}
	.instructions {
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
