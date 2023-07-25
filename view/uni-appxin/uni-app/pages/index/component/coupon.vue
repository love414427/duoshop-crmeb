<template>
	<view class="coupon_main" :style="'margin: 0 '+prConfig+'rpx'">
		<view class="coupon_count" :style="'margin-top:' + mbConfig +'rpx;border-radius:'+bgStyle+'rpx'" v-if="couponList.length">
			<view class="acea-row coupon-title">
				<text>领优惠券</text>
				<navigator v-if="merId" :url="'/pages/store/home/index?id='+merId+'&coupon=1'" class="more-box" hover-class="none">
					<view class="txt">查看更多 <text class="iconfont icon-jiantou"></text></view>
				</navigator>
				<navigator v-else url="/pages/activity/collect_coupons/index" class="more-box" hover-class="none">
					查看更多 <text class="iconfont icon-jiantou"></text>
				</navigator>
			</view>
			<scroll-view scroll-x="true" style="white-space: nowrap; vertical-align: middle;" show-scrollbar="false">
				<view class="wrapper" v-if="style == 0">
					<view class="item item0"  style="margin-right: 20rpx;" v-for="(item,index) in couponList"
					 :key="index" hover-class="none">
						<view class="top" :style="{color:`${themeColor}`,backgroundImage: `url(${domain}/static/images/coupon-bg.png)`}">
							<view class="money"><text>¥</text>{{item.coupon_price}}</view>
							<view class="info">满{{item.use_min_price}}元可用</view>
						</view>
						<navigator hover-class="none" :style="{background:`${themeColor}`}" v-if="item.issue" :url="'/pages/columnGoods/goods_coupon_list/index?coupon_id='+item.coupon_id" class="coupon-btn"><text>去使用</text></navigator>
						<view :style="{background:`${themeColor}`}" class="coupon-btn" v-else @click="receiveCoupon(item)"><text>立即领取</text></view>
					</view>
				</view>
				<view class="wrapper" v-else-if="style == 1">
					<view class="item item1" :style="{background:`${themeColor}`}" v-for="(item,index) in couponList"
					 :key="index" hover-class="none">
						<view class="itemCon acea-row row-between-wrapper">
							<view class="text" :style="{color:`${themeColor}`}">
								<view class="money"><text>¥</text>{{item.coupon_price}}</view>
								<view class="info">满{{item.use_min_price}}元可用</view>
							</view>
							<navigator v-if="item.issue" :url="'/pages/columnGoods/goods_coupon_list/index?coupon_id='+item.coupon_id" class="bnt"><text>去使用</text></navigator>
							<view class="bnt" v-else @click="receiveCoupon(item)"><text>立即领取</text></view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
	</view>
</template>

<script>
	import {setCouponReceive} from '@/api/api.js';
	import {getCouponLst} from '@/api/activity.js'
  import authorize from '@/components/Authorize';
	import { HTTP_REQUEST_URL } from '@/config/app';
	import {
		mapGetters
	} from "vuex";
	export default {
		name: 'coupon',
		props: {
			dataConfig: {
				type: Object,
				default: () => {}
			},
			merId: {
				type: String || Number,
				default: ''
			}
		},
		computed: mapGetters(['isLogin']),
		components: {
			authorize
		},
		watch:{
			isLogin:{
				handler:function(newV,oldV){
					if(newV){
						this.getCoupon();
					}
				},
				deep:true
			}
		},
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				couponList: [],
				style: this.dataConfig.tabConfig&&this.dataConfig.tabConfig.tabVal || 0,
				themeColor: this.dataConfig.themeColor.color[0].item,
				mbConfig: this.dataConfig.mbConfig.val*2,
				prConfig: this.dataConfig.prConfig&&this.dataConfig.prConfig.val*2,
				bgStyle: this.dataConfig.bgStyle.type ? 20 : 0,
				isShowAuth: false, //是否隐藏授权
				isAuto: false, //没有授权的不会自动授权
			};
		},
		created() {},
		mounted() {
			this.getCoupon();
		},
		methods: {
			getCoupon: function() {
				let that = this;
				getCouponLst({
					mer_id: that.merId,
					page: 1,
					limit: 10
				}).then(res => {
					that.$set(that, 'couponList', res.data.list);
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				});
			},
			receiveCoupon: function(item) {
				let that = this;
				if (that.isLogin === false) {
					this.isAuto = true;
					this.isShowAuth = true
				} else {
					setCouponReceive(item.coupon_id).then(res => {
						item.issue = 1
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}).catch(err => {
						uni.showToast({
							title: err,
							icon: 'none'
						})
					})
				}
			},
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
		}
	}
</script>

<style lang="scss" scoped>
	.coupon_main {
		.coupon_count{
			background: #ffffff;
			padding: 0 0 30rpx 20rpx;
		}
		.coupon-title {
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 20rpx 20rpx 10rpx;
			font-size: 28rpx;
			font-weight: bold;
			color: #282828;
			.more-box {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				font-weight: normal;
				image {
					width: 20rpx;
					height: 20rpx;
					margin-top: 10rpx;
					margin: 10rpx 0 0 5rpx;
				}
				.iconfont{
					font-size: 22rpx;
				}	
			}
		}
		.item {
			position: relative;
			&.item0{
				margin-right: 28rpx;
				width: 260rpx;
				height: 194rpx;
				position: relative;
				display: flex;
				justify-content: flex-end;
				align-items: flex-end;
				.top{
					text-align: center;
					position: absolute;
					top: 0;
					left: 10rpx;
					width: 240rpx;
					height: 124rpx;
					background-size: 100% 100%;
					color: #E93323;
					.money{
						margin: 8rpx 0 2rpx;
						font-size: 52rpx;
						font-weight: bold;
						text{
							font-size: 28rpx;
							font-weight: normal;
						}
					}
					.info{
						font-size: 24rpx;
					}
				}
				.coupon-btn{
					width: 260rpx;
					height: 160rpx;
					text-align: center; 
					font-size: 28rpx;
					display: flex;
					align-items: end;
					justify-items: center;
					justify-content: flex-end;
					border-radius: 24rpx;
					background: #E93323;
					text{
						display: inline-block;
						color: #ffffff;
						width: 100%;
						position: absolute;
						bottom: 20rpx;
					}
				}
			}
			&.item1{
				width: 244rpx;
				height: 126rpx;
				background: #BBBBBB;
				border-radius: 14rpx;
				color: #fff;
				margin-right: 24rpx;
				&::before {
					position: absolute;
					content: ' ';
					width: 20rpx;
					height: 20rpx;
					border-radius: 50%;
					background-color: #fff;
					left: -8rpx;
					top: 54rpx;
				}
			}
			.itemCon {
				width: 244rpx;
				height: 128rpx;
				.text {
					width: 198rpx;
					height: 130rpx;
					padding: 18rpx 0;
					margin: -2rpx 0 0 -1rpx;
					background-color: #f7f7f7;
					border-radius: 14rpx;
					.money {
						font-size: 48rpx;
						text-align: center;
						font-weight: bold;
						text {
							font-size: 24rpx;
						}
					}
					.info {
						font-size: 24rpx;
						text-align: center;
					}
				}
				.bnt {
					float: right;
					position: relative;
					height: 100%;
					font-size: 20rpx;
					writing-mode: vertical-lr;
					line-height: 1.2;
					width: 46rpx;
					height: 128rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
		.wrapper {
			display: flex;
		}
	}
</style>
