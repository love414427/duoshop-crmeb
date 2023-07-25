<template>
	<!-- #ifdef MP -->
	<view v-if="liveList.length > 0" style="margin: 0 20rpx;">
		<view class="wrapper-count" :style="[{'margin-top': mbConfig + 'rpx'},{'background':bg},{'border-radius':bgStyle+'rpx'}]">
			<view class="spike-bd">
				<view class="title line1"><image class="title-img" :src="`${domain}/static/images/broadcast_title.png`"></image></view>
				<navigator v-if="!merId" url="/pages/activity/liveBroadcast/index" class="more-btn" hover-class="none">
					进入频道
					<text class="iconfont icon-jiantou" hover-class="none"></text>
				</navigator>
			</view>
			<!-- 直播 -->
			<block v-if="listStyle == 0">
				<view class="live-wrapper mores">
					<scroll-view scroll-x="true" style="white-space: nowrap; display: flex">
						<view class="item" v-for="(item, index) in liveList" :key="index">
							<navigator hover-class="none" :url="'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + item.room_id">
								<view
									class="live-top"
									:style="'background:' + (item.live_status == 101 ? playBg : item.live_status != 101 && item.live_status != 102 ? endBg : notBg) + ';'"
									:class="item.live_status == 102 ? 'playRadius' : 'notPlayRadius'"
								>
									<view v-if="item.live_status == 101">
										<image :src="`${domain}/static/images/live-01.png`" mode=""></image>
										<text>直播中</text>
									</view>
									<view v-if="item.live_status == 103 && item.replay_status === 1">
										<image :src="`${domain}/static/images/live-02.png`" mode=""></image>
										<text>回放</text>
									</view>
									<view v-if="(item.live_status != 101 && item.live_status != 102 && item.live_status != 103) || (item.live_status == 103 && item.replay_status == 0)">
										<image :src="`${domain}/static/images/live-02.png`" mode=""></image>
										<text>已结束</text>
									</view>
									<view v-if="item.live_status == 102">
										<image :src="`${domain}/static/images/live-03.png`" mode=""></image>
										<text>预告</text>
									</view>
								</view>
								<view v-if="item.live_status == 101 || item.live_status == 102" class="broadcast-time">{{ item.show_time }}</view>
								<easy-loadimage class="image" mode="widthFix" :image-src="item.feeds_img"></easy-loadimage>
							</navigator>
						</view>
					</scroll-view>
				</view>
			</block>
			<block v-if="listStyle == 1">
				<view class="live-wrapper-a">
					<navigator class="live-item-a" v-for="(item,index) in liveList" :key="index" :url="'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + item.room_id" hover-class="none">
						<view class="img-box">
							<view class="label bgblue" v-if="item.live_status == 102">
								<view class="txt">预告</view>
								<view class="msg">{{item.show_time}}</view>
							</view>
							<view class="label bggary" v-if="item.live_status==103 && item.replay_status === 1">
								<image :src="`${domain}/static/images/live-02.png`" mode="" style="width: 20rpx; height: 20rpx;"></image>
								<text>回放</text>
							</view>
							<view class="label bgred" v-if="item.live_status==101">
								<image :src="`${domain}/static/images/live-01.png`" mode="" style="width: 21rpx; height: 22rpx;"></image>
								<text>直播中</text>
							</view>
							<view class="label bggary" v-if="(item.live_status != 101 && item.live_status != 102 && item.live_status != 103) || (item.live_status == 103 && item.replay_status == 0)">
								<image :src="`${domain}/static/images/live-02.png`" mode="" style="width: 20rpx; height: 20rpx;"></image>
								<text>已结束</text>
							</view>
							<image :src="item.feeds_img"></image>
						</view>
						<view class="info">
							<view class="title line2">{{item.name}}</view>
							<view class="people">
								<text>{{item.anchor_name}}</text>
							</view>
							<view class="goods-wrapper">
								<block v-if="item.broadcast.length<=3 && item.broadcast.length > 0">
									<view class="goods-item" v-for="(goods,index) in item.broadcast" :key="index">					
										<image :src="goods.goods.feeds_img" alt="">
										<text class="line1">￥{{goods.goods.price}}</text>
									</view>
								</block>
								<block v-if=" item.broadcast.length>3">
									<view class="goods-item" v-for="(goods,index) in item.broadcast" :key="index" v-if="index<2">
										<image :src="goods.goods.feeds_img" alt="">
										<text class="line1">￥{{goods.goods.price}}</text>
									</view>
									<view class="goods-item">
										<image :src="item.broadcast[item.broadcast.length-1].goods.feeds_img" alt="">
										<view class="num">+{{item.broadcast.length}}</view>	
									</view>
								</block>
								<block v-if="item.broadcast.length == 0">
									<view class="empty-goods" >暂无商品</view>
								</block>
							</view>
						</view>
					</navigator>
				</view>
			</block>
			<block v-if="listStyle == 2">
				<view class="live-wrapper-b">
					<navigator class="live-item-b" v-for="(item,index) in liveList" :key="index" :url="'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + item.room_id" hover-class="none" :style="[{'box-shadow':`0px 1px 20px ${boxShadow}`}]">
						<view class="img-box">
							<view class="label bgblue" v-if="item.live_status == 102">
								<view class="txt">预告</view>
								<view class="msg">{{item.show_time}}</view>
							</view>
							<view class="label bggary" v-if="item.live_status==103 && item.replay_status === 1">
								<image :src="`${domain}/static/images/live-02.png`" mode="" style="width: 20rpx; height: 20rpx;"></image>
								<text>回放</text>
							</view>
							<view class="label bgred" v-if="item.live_status==101">
								<image :src="`${domain}/static/images/live-01.png`" mode="" style="width: 21rpx; height: 22rpx;"></image>
								<text>直播中</text>
							</view>
							<view class="label bggary" v-if="(item.live_status != 101 && item.live_status != 102 && item.live_status != 103) || (item.live_status == 103 && item.replay_status == 0)">
								<image :src="`${domain}/static/images/live-02.png`" mode="" style="width: 21rpx; height: 22rpx;"></image>
								<text>已结束</text>
							</view>
							<image :src="item.feeds_img"></image>
						</view>
						<view class="info">
							<view class="title line2">{{item.name}}</view>
							<view class="people">
								<text>{{item.anchor_name}}</text>
							</view>
						</view>
					</navigator>
				</view>
			</block>
		</view>
	</view>
	<!-- #endif -->
</template>

<script>
	import { HTTP_REQUEST_URL } from '@/config/app';
	import {getLiveList} from '@/api/store.js';
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';
	export default {
		name: 'liveBroadcast',
		components: {
			easyLoadimage
		},
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
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				listStyle: this.dataConfig.listStyle.type,
				bgStyle: this.dataConfig.bgStyle && this.dataConfig.bgStyle.type ? '16' : '0',
				mbConfig: this.dataConfig.mbConfig.val*2,
				liveList: [],
				bg:this.dataConfig.bg.color[0].item,
				endBg: 'linear-gradient(#666666, #999999)',
				notBg: 'rgb(26, 163, 246)',
				playBg: 'linear-gradient(#FF0000, #FF5400)',
			};
		},
		created() {},
		mounted() {
			this.getLiveList();
		},
		methods: {
			// 直播
			getLiveList() {
				let that = this;
				getLiveList({
					mer_id: that.merId,
					limit: 10
				}).then(res => {
						that.liveList = res.data.list;
						that.liveList.forEach(val => {
							val.link =
								(val.live_status == 103 && val.replay_status) || val.live_status === 101 || val.live_status === 102
									? 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + val.room_id
									: '';
						});
					})
					.catch(e => {});
			},
		}
	};
</script>

<style lang="scss" scoped>
	@import '../style/main.scss';
	.wrapper-count{
		padding: 24rpx 20rpx 0;
	}
	.live-wrapper {
		position: relative;
		width: 100%;
		overflow: hidden;
		border-radius: 16rpx;

		.live-top {
			z-index: 20;
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			width: 120rpx;
			height: 32rpx;		
		}	
		.broadcast-time {
			z-index: 20;
			position: absolute;
			left: 100rpx;
			top: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			width: 160rpx;
			height: 36rpx;
			background: rgba(0, 0, 0, 0.4);
			font-size: 22rpx;
			border-radius: 0 0 18rpx 0;
		}
		.live-title {
			position: absolute;
			left: 0;
			bottom: 6rpx;
			width: 100%;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			font-size: 30rpx;
			color: #fff;
			background: rgba(0, 0, 0, 0.35);
		}
		&.mores {
			width: 100%;
			.item {
				position: relative;
				width: 280rpx;
				display: inline-block;
				border-radius: 16rpx;
				overflow: hidden;
				margin-right: 20rpx;
				/deep/image,/deep/.easy-loadimage,uni-image {
					width: 280rpx;
					height: 224rpx;
					border-radius: 16rpx;
				}
				.live-title {
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					font-size: 22rpx;
				}
				.live-top {
					width: 110rpx;
					height: 32rpx;
					font-size: 22rpx;
					image {
						width: 20rpx;
						height: 20rpx;
					}
				}
			}
		}
	}
	.live-wrapper {
		position: relative;
		width: 100%;
		overflow: hidden;
		border-radius: 16rpx;
		.live-top {
			z-index: 20;
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			width: 180rpx;
			height: 54rpx;
			border-radius: 16rpx 0px 16rpx 0px;
			&.playRadius {
				border-radius: 16rpx 0 0 0;
			}			
			&.notPlayRadius {
				border-radius: 16rpx 0px 16rpx 0px;
			}	
			image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;
				/* #ifdef H5 */
				display: block;
				/* #endif */
			}
		}
		.live-title {
			position: absolute;
			left: 0;
			bottom: 6rpx;
			width: 100%;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			font-size: 30rpx;
			color: #fff;
			background: rgba(0, 0, 0, 0.35);
		}
		&.mores {
			width: 100%;
			.item {
				position: relative;
				width: 280rpx;
				display: inline-block;
				border-radius: 16rpx;
				overflow: hidden;
				margin-right: 20rpx;
				image {
					width: 280rpx;
					height: 224rpx;
					border-radius: 16rpx;
				}
				.live-title {
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					font-size: 22rpx;
				}
				.live-top {
					width: 100rpx;
					height: 36rpx;
					font-size: 22rpx;
					image {
						width: 20rpx;
						height: 20rpx;
					}
				}
			}
		}
	}
	.live-wrapper-a{
		padding: 0rpx 20rpx 0;
		.live-item-a{
			display: flex;
			background: #fff;
			margin-bottom: 20rpx;
			border-radius: 16rpx;
			overflow: hidden;
			&:last-child{
				margin-bottom: 0;
			}
			.img-box{
				position: relative;
				width: 340rpx;
				height: 270rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.info{
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 15rpx 20rpx;
				.title{
					font-size: 30rpx;
					color: #333;
				}
				.people{
					display: flex;
					align-items: center;
					color: #999;
					font-size: 24rpx;
					margin-top: 10rpx;	
				}
				.goods-wrapper{
					display: flex;
					.goods-item{
						position: relative;
						width: 96rpx;
						height: 96rpx;
						margin-right: 20rpx;
						overflow: hidden;
						border-radius: 16rpx;
						&:last-child{
							margin-right: 0;
						}
						image{
							width: 100%;
							height: 100%;
							border-radius: 16rpx;
						}
						.bg{
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: 100%;
							border-radius: 16rpx;
							background: rgba(0, 0, 0, 0.3);
						}
						text{
							font-size: 24rpx;
							position: absolute;
							left: 0;
							bottom: 0;
							width: 100%;
							height: 60rpx;
							line-height: 70rpx;
							color: #fff;
							background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 100%);
						}
						.num{
							display: flex;
							align-items: center;
							justify-content: center;
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: 100%;
							background: rgba(0, 0, 0, 0.3);
							color: #fff;
							font-size: 28rpx;
						}
					}
				}
				.empty-goods{
					width: 96rpx;
					height: 96rpx;
					border-radius: 6rpx;
					background-color: #B2B2B2;
					color: #fff;
					font-size: 20rpx;
					text-align: center;
					line-height: 96rpx;
				}
			}
		}
		&.live-wrapper-c{
			.live-item-a{
				display: flex;
				flex-direction: column;
				.img-box{
					width: 100%;
					border-radius: 8px 8px 0 0;
				}
				.info{
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-direction: initial;
					.left{
						width: 69%;
					}
					.goods-wrapper{
						flex: 1;
					}
				}	
			}
		}
	}
	.live-wrapper-b{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.live-item-b{
			width: 328rpx;
			background-color: #fff;
			border-radius: 16rpx;
			overflow: hidden;
			margin-bottom: 20rpx;
			overflow: hidden;
			.img-box{
				position: relative;
				image{
					width: 100%;
					height: 274rpx;
				}
			}
			.info{
				display: flex;
				flex-direction: column;
				padding: 20rpx;
				.title{
					font-size: 30rpx;
					color: #333;
				}
				.people{
					display: flex;
					margin-top: 10rpx;
					color: #999;
					font-size: 24rpx;
				}
			}
		}
	}
	.label{
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 0;
		top: 0;
		border-radius: 16rpx 0px 16rpx 0;
		font-size: 24rpx;
		color: #fff;
		image{
			margin-right: 10rpx;
		}
		text{
			font-size: 22rpx;
		}
	}
	.bgred{
		width: 132rpx;
		height: 38rpx;
		background: linear-gradient(270deg, #F5742F 0%, #FF1717 100%)
	}
	.bggary{
		width: 108rpx;
		height: 38rpx;
		background: linear-gradient(270deg, #999999 0%, #666666 100%)
	}
	.bgblue{
		width: 220rpx;
		height: 38rpx;
		background: rgba(0,0,0,0.36);
		overflow: hidden;
		.txt{
			position: relative;
			left: -6rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 38px;
			height: 100%;
			text-align: center;
			background: linear-gradient(270deg, #2FA1F5 0%, #0076FF 100%);	
		}	
	}
</style>
