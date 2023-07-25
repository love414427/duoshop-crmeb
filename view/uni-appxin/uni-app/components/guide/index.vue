<template>
	<!-- 开屏广告 -->
	<view class="content">
		<swiper class="swiper" :class="advData.list.length==1?'on':''" :autoplay="autoplay" :duration="duration" @change="stopChange"
			v-if="advData.list.length">
			<swiper-item v-for="(item,index) in advData.list" :key="index" @click="jump(item.url)">
				<view class="swiper-item">
					<view class="swiper-item-img">
						<image :src="item.pic" mode="aspectFill"></image>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="video-box" v-if="advData.type == 'video' && advData.video_link">
			<video class="vid" :src="advData.video_link" :autoplay="true" :loop="true" :muted="true"
				:controls="false"></video>
		</view>
		<view class="jump-over" :style="{ top: navH + 'rpx' }" @tap="launchFlag()">跳过<text v-if="closeType == 1">{{time}}</text><slot name="bottom"></slot></view>
	</view>
</template>

<script>
	let app = getApp();
	export default {
		data() {
			return {
				autoplay: false,
				duration: 500,
				jumpover: '跳过',
				experience: '立即体验',
				time: this.advData.config.open_screen_time,

				timecount: undefined,
				navH: 0
			}
		},
		props: {
			advData: {
				type: Object,
				default: () => {}
			},
			// 1 倒计时 2 手动关闭(预留)
			closeType: {
				type: Number,
				default: 1
			}
		},
		mounted() {
			this.timer()
			// #ifdef MP
			this.navH = app.globalData.navHeight;
			// #endif
			// #ifndef MP
			this.navH = 80;
			// #endif
		},
		methods: {
			stopChange(){
				if(this.advData.list.length == 1){
					return false
				}
			},
			timer() {
				var t = this.advData.config.open_screen_time || 5
				this.timecount = setInterval(() => {
					t--
					this.time = t
					if (t <= 0) {
						clearInterval(this.timecount)
						this.launchFlag()
					}
				}, 1000)
			},
			launchFlag() {
				clearInterval(this.timecount)
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			jump(url) {
				if(url){
					clearInterval(this.timecount)
					if (url.indexOf("http") != -1) {
						uni.navigateTo({
							url: `/pages/annex/web_view/index?url=${url}`
						});
					} else {
						if (['/pages/goods_cate/goods_cate', '/pages/order_addcart/order_addcart', '/pages/user/index', '/pages/index/index', '/pages/plant_grass/index']
							.indexOf(url) == -1) {
							uni.navigateTo({
								url: url
							})
						} else {
							uni.reLaunch({
								url: url
							})
						}
					}
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	page,
	.content {
		width: 100%;
		height: 100%;
		background-size: 100% auto;
		padding: 0;
	}

	.swiper {
		width: 100%;
		height: 100vh;
		background: #FFFFFF;
		&.on{
			position: relative;
			&:after {
			 content: '';
			 position: absolute;
			 top: 0;
			 left: 0;
			 right: 0;
			 bottom: 0;
			 z-index: 2;
			}
		}
	}

	.swiper-item {
		width: 100%;
		height: 100%;
		text-align: center;
		position: relative;
		display: flex;
		/* justify-content: center; */
		align-items: flex-end;
		flex-direction: column-reverse
	}

	.swiper-item-img {
		width: 100vw;
		height: 100vh;
		margin: 0 auto;
	}

	.swiper-item-img image {
		width: 100%;
		height: 100%;
	}

	.jump-over {
		position: absolute;
		height: 45rpx;
		line-height: 45rpx;
		padding: 0 15rpx;
		border-radius: 30rpx;
		font-size: 24rpx;
		color: #b09e9a;
		border: 1px solid #b09e9a;
		z-index: 999;
		right: 30rpx;
	}

	.video-box {
		width: 100vw;
		height: 100vh;

		.vid {
			width: 100%;
			height: 100%;
		}
	}
</style>