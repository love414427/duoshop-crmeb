<template>
	<view class='product-bg'>
		<swiper :indicator-dots="indicatorDots" indicator-active-color="#e93323" :circular="circular"
		 :interval="interval" :duration="duration">
		 
			<block v-for="(item,index) in imgUrls" :key='index'>
				<swiper-item>
					<image :src="item" class="slide-image" />
					<!-- <view class="stop" v-if="isType == 2">
						<image class="image" src="/static/images/stop.png"></image>
					</view> -->
				</swiper-item>
			</block>
		</swiper>
		
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
	export default {
		props: {
			imgUrls: {
				type: Array,
				default: function() {
					return [];
				}
			},
			videoline: {
				type: String,
				value: ""
			},
			isType: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				indicatorDots: true,
				circular: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
				currents: "1",
				controls: true,
				isPlay: true,
				videoContext: ''
			};
		},
		created() {
		},
		watch: {

		},
		mounted() {
			// #ifndef APP-PLUS
			this.videoContext = uni.createVideoContext('myVideo', this);
			// #endif
		},
		methods: {
			videoPause(e) {
				// #ifdef APP-PLUS
				this.isPlay = true
				this.autoplay = true
				// #endif
			},
			bindPause: function() {
				// #ifndef APP-PLUS
				this.videoContext.play();
				this.$set(this, 'controls', false)
				this.autoplay = false
				// #endif

				// #ifdef APP-PLUS
				this.isPlay = false
				this.videoContext = uni.createVideoContext('myVideo', this);
				this.$nextTick(()=>{
					this.videoContext.play();
				})
				// #endif
			},
			change: function(e) {
				this.$set(this, 'currents', e.detail.current + 1);
			}

		}
	}
</script>

<style scoped lang="scss">
	.product-bg {
		width: 710rpx;
		height: 710rpx;
		position: relative;
	}
	.product-bg swiper {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.product-bg .slide-image {
		width: 100%;
		height: 100%;
		border-radius: 16rpx;
	}

	.product-bg .pages {
		position: absolute;
		background-color: #fff;
		height: 34rpx;
		padding: 0 10rpx;
		border-radius: 3rpx;
		right: 30rpx;
		bottom: 30rpx;
		line-height: 34rpx;
		font-size: 24rpx;
		color: #050505;
	}

	#myVideo {
		width: 100%;
		height: 100%
	}

	.product-bg .item {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.product-bg .item .poster {
		position: absolute;
		top: 0;
		left: 0;
		height: 750rpx;
		width: 100%;
		z-index: 9;
	}

	.product-bg .item .poster .image {
		width: 100%;
		height: 100%;
	}

	.product-bg .item .stop {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 136rpx;
		height: 136rpx;
		margin-top: -68rpx;
		margin-left: -68rpx;
		z-index: 9;
	}

	.product-bg .item .stop .image {
		width: 100%;
		height: 100%;
	}
</style>
