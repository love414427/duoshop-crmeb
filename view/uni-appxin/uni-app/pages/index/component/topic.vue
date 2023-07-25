<template>
	<view v-if="activityData.length > 0" :style="'margin-top:'+mbConfig+'rpx;'" class="skeleton-rect">
		<view class="activity_count" :style="'background:'+bgColor+';margin: 0 '+prConfig+'rpx;border-radius:'+bgStyle+'rpx'">
			<view class="spike-bd">
				<view class="title">
					<image class="title-img" :src="`${domain}/static/images/topic_title.png`"></image>
				</view>
				<navigator :url="merId ? '/pages/store/home/index?id='+merId+'&type=4' : '/pages/activity/topic/index'" class="more-btn" hover-class="none">
					进入专场
					<text class="iconfont icon-jiantou" hover-class="none"></text>
				</navigator>
			</view>
			<view v-if="activityData.length">
				<!-- 单图模式 -->
				<block v-if="activityData.length == 1">
					<view class="topic_swiper" 
						v-for="(item,index) in activityData" 
						:key="index" 
						@click="goTopicDetail(item.info[1].value)">
						<image :src="item.img"></image>
					</view>
				</block>
				<view v-else class="topic_swiper" :class="[pointerStyle?'circular':'square',conStyle?'':'fillet','dot'+txtStyle]">
					<swiper indicator-dots="true" :autoplay="autoplay" :circular="true" :interval="2500" :duration="duration"
					 indicator-color="rgba(255,255,255,0.6)" indicator-active-color="rgba(233, 51, 35, 1)">
						<block v-for="(item,index) in activityData" :key="index">
							<swiper-item>
								<view @click="goTopicDetail(item.info[1].value)" class='slide-navigator acea-row row-between-wrapper'>
									<image :src="item.img" class="slide-image"></image>
								</view>
							</swiper-item>
						</block>
					</swiper>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import { HTTP_REQUEST_URL } from '@/config/app';
	export default {
		name: 'topic',
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
				indicatorDots: false,
				autoplay: true,
				duration: 500,
				activityData: this.dataConfig.menuConfig.list,
				bgColor: this.dataConfig.colorShow.val ? this.dataConfig.bgColor.color[0].item : 'transparent',
				mbConfig: this.dataConfig.mbConfig.val*2, //页面间距
				prConfig: this.dataConfig.prConfig.val*2, //背景间距
				txtStyle: this.dataConfig.txtStyle.type,
				bgStyle: this.dataConfig.bgStyle.type ? 20 : 0,
				colorShow: this.dataConfig.colorShow.val,
				pointerStyle: this.dataConfig.pointerStyle.type, //指示点样式
				conStyle: this.dataConfig.conStyle.type, //内容样式
				domain: HTTP_REQUEST_URL,
			};
		},
		created() {},
		mounted() {},
		methods: {
			goTopicDetail(url) {
				if(url.indexOf("http") != -1){
					// #ifdef H5
					location.href = url
					// #endif
				}else{
					if(['/pages/goods_cate/goods_cate','/pages/order_addcart/order_addcart','/pages/user/index'].indexOf(url) == -1){
						uni.navigateTo({
							url:url
						})
					}else{
						uni.switchTab({
							url:url
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../style/main.scss';
	.activity_count{
		margin-bottom: 20rpx;
		background: #ffffff;
		border-radius: 16rpx;
		position: relative;
		padding: 24rpx 20rpx 26rpx;
		/deep/swiper-item,uni-swiper-item,swiper{
			height: 278rpx;
		}
		/deep/uni-image,/deep/image,/deep/.easy-loadimage{
			width: 650rpx;
			height: 278rpx;
			border-radius: 16rpx;
		}
		/deep/.uni-swiper-wrapper{
			overflow: hidden;
		}
	}
	.topic_swiper{
		width: 650rpx;
		margin: 0 auto;
		line-height: 0;
		&.fillet {
			border-radius: 0;
			/deep/uni-image,/deep/image,/deep/.easy-loadimage{
				border-radius: 0;
			}
		}
		// 圆形指示点
		&.circular {
			/deep/.uni-swiper-dot {
				width: 10rpx;
				height: 10rpx;
				background: rgba(0, 0, 0, .4);
			}
			/deep/.uni-swiper-dot-active {
				background: rgba(233, 51, 35, 1);
			}
		}	
		// 方形指示点
		&.square {
			/deep/.uni-swiper-dot {
				width: 20rpx;
				height: 5rpx;
				border-radius: 3rpx;
				background: rgba(0, 0, 0, .4);
			}	
			/deep/.uni-swiper-dot-active {
				background: rgba(233, 51, 35, 1);
			}
		}		
	}
	/deep/.dot0 .uni-swiper-dots-horizontal{
		left: 10%;
	}
	/deep/.dot1 .uni-swiper-dots-horizontal{
		left: 50%;
	}
	/deep/.dot2 .uni-swiper-dots-horizontal{
		left: 90%;
	}
</style>
