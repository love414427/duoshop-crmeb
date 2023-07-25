<template>
	<view :style="viewColor">
		<view class="navTabBox">
			<view class="longTab">
				<scroll-view scroll-x="true" style="white-space: nowrap; display: flex;" scroll-with-animation :scroll-left="tabLeft"
				 show-scrollbar="true">
					<view class="longItem" :style='"width:"+isWidth+"px"' :data-index="index" :class="index===tabClick?'click':''"
					 v-for="(item,index) in tabTitle" :key="index" :id="'id'+index" @click="longClick(index,item.store_category_id)">{{item.cate_name}}
					</view>
					<view class="underlineBox" :style='"transform:translateX("+isLeft+"px);width:"+isWidth+"px"'>
						<view class="underline bg-color-white"></view>
					</view>
				</scroll-view>
				<view class='iconfont icon-xiangxia' style="padding: 8rpx 0 0 8rpx;" @click="tabsOpen = true"></view>
			</view>
			<view class="tabs-box" v-if="tabsOpen">
				<view class="box-top">
					<view class="">
						切换分类
					</view>
					<view class="">
						<view class='iconfont icon-xiangshang' @click="tabsOpen = false"></view>
					</view>
				</view>
				<view class="all-tabs">
					<view class="tabs-style" :class="index===tabClick?'active':''" v-for="(tab,index) in tabTitle" :key='index' @click="longClick(index,tab.store_category_id)">
						<text class="line1">{{tab.cate_name}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class='mask' v-if="tabsOpen" @click="tabsOpen = false"></view>
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
	import { mapGetters } from "vuex";
	let app = getApp();
	export default {
		name: 'navTab',
		props: {
			tabTitle: {
				type: Array,
				default: () => {
					[]
				}
			}
		},
		computed: mapGetters(['viewColor']),
		data() {
			return {
				tabClick: 0, //导航栏被点击
				isLeft: 0, //导航栏下划线位置
				isWidth: 0, //每个导航栏占位
				tabLeft: 0,
				swiperIndex: 0,
				childIndex: 0,
				childID: 0,
				window: false,
				tabsOpen: false
			};
		},
		created() {
			var that = this
			// 获取设备宽度
			uni.getSystemInfo({
				success(e) {
					that.isWidth = e.windowWidth / 5
				}
			})
		},
		methods: {
			// 导航栏点击
			longClick(index, id) {
				this.childIndex = 0;
				if (this.tabTitle.length > 5) {
					var tempIndex = index - 2;
					tempIndex = tempIndex <= 0 ? 0 : tempIndex;
					this.tabLeft = (index - 2) * this.isWidth //设置下划线位置
				}
				this.tabClick = index //设置导航点击了哪一个
				this.isLeft = index * this.isWidth //设置下划线位置
				let obj = {
					index: index,
					pid: id
				}
				this.parentEmit(obj);
				this.tabsOpen = false
			},
			parentEmit(obj) {
				this.$emit('changeTab', obj);
			}
		}
	}
</script>

<style lang="scss">
	@keyframes bounce-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	.navTabBox {
		width: 750rpx;
		padding: 0 40rpx;
		color: rgba(255, 255, 255, 1);
		position: relative;
		.tabs-box {
			position: absolute;
			top: 0;
			display: flex;
			flex-direction: column;
			width: 90%;
			background-color: #FFFFFF;
			border-radius: 24rpx;
			z-index: 999;
			animation: bounce-in .3s;
			.box-top {
				padding: 30rpx 20rpx 10rpx 20rpx;
				display: flex;
				justify-content: space-between;
				color: #666;
				font-size: 28rpx;
			}
			.all-tabs {
				display: flex;
				flex-wrap: wrap;
				padding: 20rpx 0;
				font-size: 24rpx;
				.tabs-style {
					display: flex;
					justify-content: center;
					background: #F2F2F2;
					border-radius: 29px;
					color: #282828;
					width: 22%;
					padding: 10rpx 20rpx;
					white-space: nowrap;
					border-radius: 30px;
					margin: 10rpx;
				}
				.active {
					background: var(--view-minorColor);
					color: var(--view-theme);
					border: 1px solid var(--view-theme);
				}
			}
		}
		.nav_toggle {
			position: absolute;
			top: 8rpx;
			right: 20rpx;
		}
		.click {
			color: white;
		}
		.longTab {
			display: flex;
			width: 95%;
			/* #ifdef H5 */
			padding-bottom: 20rpx;
			/* #endif */
			/* #ifdef MP */
			padding-top: 12rpx;
			padding-bottom: 12rpx;
			/* #endif */
			.longItem {
				height: 50upx;
				display: inline-block;
				line-height: 50upx;
				text-align: center;
				font-size: 30rpx;
				color: rgba(255, 255, 255, .8);
				max-width: 160rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				overflow-x: scroll;
				overflow-y: hidden;
				/*解决ios上滑动不流畅*/
				-webkit-overflow-scrolling: touch;
				&.click {
					font-weight: bold;
					font-size: 30rpx;
					color: #FFFFFF;
				}
			}
			.underlineBox {
				height: 3px;
				width: 20%;
				display: flex;
				align-content: center;
				justify-content: center;
				transition: .5s;
				.underline {
					width: 60rpx;
					height: 4rpx;
				}
			}
		}
	}
	.bg-color-white {
		background-color: #fff;
	}
	.child-box {
		width: 100%;
		position: relative;
		background-color: #fff;
		/* #ifdef H5 */
		box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.02);
		/* #endif */
		/* #ifdef MP */
		box-shadow: 0 2rpx 3rpx 1rpx #f9f9f9;
		/* #endif */
		.wrapper {
			display: flex;
			align-items: center;
			padding: 20rpx 0;
			background: #fff;
		}
		.child-item {
			flex-shrink: 0;
			width: 140rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-left: 10rpx;
			image {
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
			}
			.txt {
				font-size: 24rpx;
				color: #282828;
				text-align: center;
				margin-top: 10rpx;
			}
			&.on {
				image {
					border: 1px solid $theme-color-opacity;
				}
				.txt {
					color: $theme-color;
				}
			}
		}
	}
	.brand-wrapper {
		flex: 1;
		overflow: hidden;
		width: 690rpx;
		margin: 0 auto;
		background: #ffffff;
		border-radius: 12rpx;
		padding: 25rpx;
		.wrapper {
			display: flex;
			flex-wrap: wrap;
			padding-bottom: 20rpx;
		}
		.item {
			display: block;
			width: 146rpx;
			height: 58rpx;
			line-height: 58rpx;
			text-align: center;
			background: rgba(242, 242, 242, 1);
			border-radius: 28rpx;
			margin-top: 25rpx;
			padding: 0 10rpx;
			margin-right: 19rpx;
			color: #282828;
			font-size: 24rpx;
			&:nth-child(4n) {
				margin-right: 0;
			}
			&.on {
				background: rgba(255, 244, 243, 1);
				border: 1px solid rgba(233, 51, 35, 1);
				color: rgba(233, 51, 35, 1);
			}
		}
		.btns {
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top: 10rpx;
			font-size: 22rpx;
			color: #999;
			.iconfont {
				margin-left: 10rpx;
				margin-top: 5rpx;
				font-size: 20rpx;
			}
		}
		.mask {
			z-index: 300 !important;
		}
		.icon-xiangxia {
			font-size: 20px;
		}
	}
</style>
