<template>
	<view class='product-bg'>
		<swiper :indicator-dots="indicatorDots" indicator-active-color="#e93323" :autoplay="autoplay" :circular="circular"
		 :interval="interval" :duration="duration" @change="change" v-if="isPlay">
			<!-- #ifndef APP-PLUS -->
			<swiper-item v-if="videoline && videoline != '' && videoline != 'https:'">
				<view class="item">
					<video id="myVideo" :src='videoline && (videoline.substring(0,4) == "http" || videoline.substring(0,5) == "https") ? videoline : ("http:" + videoline)'
					 objectFit="cover" controls style="width:100%;height:100% " show-mute-btn="true"
					 auto-pause-if-navigate @ended="endedFun()"></video>
					<view class="poster" v-if="controls">
						<image class="image" :src="videoCoverImg"></image>
					</view>
					<view class="stop" v-if="controls" @tap="bindPause">
						<image class="image" src="../../static/images/stop.png"></image>
					</view>
				</view>
			</swiper-item>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<swiper-item v-if="videoline">
				<view class="item">
					<view class="poster" v-show="controls">
						<image class="image" :src="videoCoverImg"></image>
					</view>
					<view class="stop" v-show="controls" @tap="bindPause">
						<image class="image" src="../../static/images/stop.png"></image>
					</view>
				</view>
			</swiper-item>
			<!-- #endif -->
			<block v-for="(item,index) in imgUrls" :key='index'>
				<swiper-item>
					<image :src="item" class="slide-image" @click='getpreviewImage(item)' mode="widthFix" />
				</swiper-item>
			</block>
		</swiper>
		<!-- #ifdef APP-PLUS -->
		<view v-if="!isPlay" style="width: 100%; height: 750rpx;">
			<video id="myVideo" :src='videoline && (videoline.substring(0,4) == "http" || videoline.substring(0,5) == "https") ? videoline : "http:" + videoline'
			 objectFit="cover" controls style="width:100%;height:100% " show-center-play-btn show-mute-btn="true"
			 auto-pause-if-navigate :enable-progress-gesture="false" :poster="videoCoverImg" @pause="videoPause" @ended="endedFun()"></video>

		</view>
		<!-- #endif -->
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
			videoCoverImg: {
				type: String,
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
			getpreviewImage: function(item) {
				uni.previewImage({
					urls: this.imgUrls,
					current: item
				});
			},
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
			},
			endedFun() {
				this.controls = true
			}
		}
	}
</script>

<style scoped lang="scss">
	.product-bg {
		width: 100%;
		height: 750rpx;
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
