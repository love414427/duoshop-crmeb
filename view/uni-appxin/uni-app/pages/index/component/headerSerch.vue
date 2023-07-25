<template>
	<!-- #ifdef H5 -->
	<view class="header" :style="'background:  '+ bgColor +' ;margin-top:'+ mbConfig +'rpx;'">
		<view class="serch-wrapper acea-row row-between-wrapper" :style="'padding-left:'+prConfig+'rpx;'">
			<view v-if="logoConfig" class="logo skeleton-rect">
				<image :src="logoConfig" mode=""></image>
			</view>
			<navigator :url="merId ? '/pages/store/list/index?mer_id='+merId : '/pages/columnGoods/goods_search/index'" :class="logoConfig ? 'input' : 'uninput'" class="skeleton-rect box" hover-class="none" 
			:style="'border-radius:'+boxStyle+'rpx;text-align:'+txtStyle">
				<text class="iconfont icon-xiazai5"></text>
				搜索商品
			</navigator>
			<navigator class="btn skeleton-rect" url="/pages/chat/customer_list/index?type=0" hover-class="none">
				<view class="iconfont icon-xiaoxi" :style="'color:'+iconColor"></view>
				<text class="iconnum" v-if="userInfo.total_unread">{{ userInfo.total_unread }}</text>
			</navigator>
		</view>	
	</view>
	<!-- #endif -->
	<!-- #ifdef MP || APP-PLUS -->	
	<view>		
		<view class="mp-header" :style="'background: '+ bgColor +' ;margin-top:'+ mbConfig +'rpx;'">
			<view class="sys-head skeleton-rect" :style="{ height: statusBarHeight }"></view>
			<view class="serch-box skeleton-rect" style="height: 43px;">
				<view class="serch-wrapper flex" :style="'padding-left:'+prConfig+'rpx;'">
					<view v-if="logoConfig" class="logo skeleton-rect"><image :src="logoConfig" mode=""></image></view>
					<navigator :url="merId ? '/pages/store/list/index?mer_id='+merId : '/pages/columnGoods/goods_search/index'" :class="logoConfig ? 'input' : 'uninput'" 
					hover-class="none" class="skeleton-rect box" :style="'border-radius:'+boxStyle+'rpx;text-align:'+txtStyle">
						<text class="iconfont icon-xiazai5"></text>
						搜索商品
					</navigator>
				</view>
			</view>
		</view>
		<view :style="'height:'+marTop+'px;'"></view>
	</view>
	<!-- #endif -->
</template>

<script>
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight*2 + 'rpx';
	export default {
		name: 'headerSerch',
		props: {
			dataConfig: {
				type: Object,
				default: () => {}
			},
			userInfo: {
				type: Object,
				default: () => {}
			}, 
			merId: {
				type: String || Number,
				default: ''
			}
		},
		data() {
			return {
				statusBarHeight: statusBarHeight,
				marTop:0,
				searchH: 0,
				bgColor: this.dataConfig.bgColor && this.dataConfig.bgColor.color[0].item,
				iconColor: this.dataConfig.iconColor && this.dataConfig.iconColor.color[0].item,
				boxStyle: this.dataConfig.boxStyle.type ? '0' : '32',
				logoConfig: this.dataConfig.logoConfig.url,
				mbConfig: this.dataConfig.mbConfig.val*2,
				prConfig: this.dataConfig.prConfig.val*2,
				txtStyle: this.dataConfig.txtStyle.type ? 'center' : 'xleft',
			};
		},
		mounted(){
			let that = this;
			// #ifdef H5
			// 获取H5 搜索框高度
			setTimeout(() => {
				let appSearchH = uni.createSelectorQuery().select('.serch-wrapper');
				appSearchH
					.boundingClientRect(function(data) {
						that.searchH = data.height;
					})
					.exec();
			}, 800);
			// #endif
			// #ifdef MP || APP-PLUS
			setTimeout(() => {
				// 获取小程序头部高度
				let info = uni.createSelectorQuery().in(this).select(".mp-header");
				info.boundingClientRect(function(data) {
					that.marTop = data.height
				}).exec()
			}, 300)
			// #endif
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
.header {
	width: 100%;
	background: #ffffff;
	.btn {
		position: relative;
		margin-left: 30rpx;
		.iconfont {
			font-size: 45rpx;
		}
	}
	.iconnum {
		min-width: 6px;
		color: #fff;
		background: #e93323;
		border-radius: 15rpx;
		position: absolute;
		right: -10rpx;
		top: -10rpx;
		font-size: 10px;
		padding: 0 4px;
	}
	.serch-wrapper {
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx 20rpx 30rpx;
		.box{
			flex: 1;
		}
		.logo {
			width: 127rpx;
			height: 46rpx;
			margin-right: 20rpx;
		}
		image {
			width: 118rpx;
			height: 42rpx;
		}
		.input,.uninput {
			line-height: 64rpx;
			padding: 0 0 0 30rpx;
			background: rgba(237, 237, 237, 1);
			border: 1px solid rgba(241, 241, 241, 1);
			color: #bbbbbb;
			font-size: 28rpx;
			.iconfont {
				margin-right: 20rpx;
			}
		}
	}
}
/* #ifdef MP || APP-PLUS */
	.mp-header {
		z-index: 999;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		/* #ifdef H5 */
		padding-bottom: 20rpx;
		/* #endif */
		background-color: #fff;
		.serch-wrapper {
			height: 100%;
			align-items: center;
			padding: 0 50rpx 0 53rpx;
			image {
				width: 118rpx;
				height: 42rpx;
				margin-right: 30rpx;
			}
			.input,.uninput {
				display: flex;
				align-items: center;
				/* #ifndef APP-PLUS */
				width: 305rpx;
				/* #endif */
				/* #ifdef APP-PLUS */
				flex: 1;
				width: 500rpx;
				/* #endif */
				height: 58rpx;
				padding: 0 0 0 30rpx;
				background: rgba(247, 247, 247, 1);
				border: 1px solid rgba(241, 241, 241, 1);
				border-radius: 29rpx;
				color: #bbbbbb;
				font-size: 28rpx;
				.iconfont {
					margin-right: 20rpx;
				}
			}
			.uninput {
				/* #ifdef MP */
				min-width: 450rpx;
				max-width: 480rpx;
				/* #endif*/
			}
		}
	}
/* #endif */
</style>
