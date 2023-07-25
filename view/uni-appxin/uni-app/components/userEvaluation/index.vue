<template>
	<view class="evaluateWtapper">
		<view class="evaluateItem" v-for="(item, indexw) in reply" :key="indexw">
			<view class="pic-text acea-row row-middle">
				<view class="pictrue">
					<image :src="item.avatar ? item.avatar : '/static/images/f.png'"></image>
				</view>
				<view class="acea-row row-middle">
					<view class="name line1">{{ item.nickname }}</view>
					<view class="start" :style="'width:'+(item.rate/5)*124+'rpx;background-image: url('+domain+'/static/diy/score2'+keyColor+'.png)'"></view>
				</view>
			</view>
			<view class="time">{{ item.create_time }} {{ item.sku ? item.sku : '' }}</view>
			<view class="evaluate-infor">{{ item.comment }}</view>
			<view class="imgList acea-row">
				<view class="pictrue" v-for="(itemn, indexn) in item.pics" :key="indexn" v-if="indexn<=3"  @click='getpreviewImage(indexw, indexn)'>
					<easy-loadimage :image-src="itemn"></easy-loadimage>
					<!-- <image :src="itemn" class="image" @click='getpreviewImage(indexw, indexn)'></image> -->
					<!-- <view v-else class="image loadfail-img"></view> -->
					<text v-if="item.pics.length>4 && indexn == 3" class="morePic">+{{item.pics.length-4}}</text>
				</view>
			</view>
			<view class="reply" v-if="item.merchant_reply_content">
				<text>店小二</text>：{{item.merchant_reply_content}}
			</view>
		</view>
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
	import { HTTP_REQUEST_URL } from '@/config/app';
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';
	export default {
		props: {
			reply: {
				type: Array,
				default: () => []
			}
		},
		computed: mapGetters(['keyColor']),
		components: {
			easyLoadimage
		},
		data: function() {
			return {
				domain: HTTP_REQUEST_URL
			};
		},
		methods: {
			getpreviewImage: function(indexw, indexn) {
				console.log(this.reply)
				uni.previewImage({
					urls: this.reply[indexw].pics,
					current: this.reply[indexw].pics[indexn]
				});
			}
		}
	}
</script>
<style lang="scss">
	.evaluateWtapper .evaluateItem {
		background-color: #fff;
		padding-bottom: 25rpx;
	}
	.evaluateWtapper .evaluateItem~.evaluateItem {
		border-top: 1px solid #f5f5f5;
	}
	.evaluateWtapper .evaluateItem .pic-text {
		font-size: 26rpx;
		color: #282828;
		height: 95rpx;
		padding: 0 30rpx;
	}
	.evaluateWtapper .evaluateItem .pic-text .pictrue {
		width: 56rpx;
		height: 56rpx;
		margin-right: 20rpx;
	}
	.evaluateWtapper .evaluateItem .pic-text .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.evaluateWtapper .evaluateItem .pic-text .name {
		max-width: 450rpx;
		margin-right: 15rpx;
	}
	.evaluateWtapper .evaluateItem .time {
		font-size: 24rpx;
		color: #82848f;
		padding: 0 30rpx;
	}
	.evaluateWtapper .evaluateItem .evaluate-infor {
		font-size: 28rpx;
		color: #282828;
		margin-top: 19rpx;
		padding: 0 30rpx;
	}
	.evaluateWtapper .evaluateItem .imgList {
		padding: 0 30rpx 0 15rpx;
		margin-top: 25rpx;
	}
	.evaluateWtapper .evaluateItem .imgList .pictrue {
		width: 160rpx;
		height: 160rpx;
		margin: 0 0 15rpx 15rpx;
		position: relative;
		/deep/.easy-loadimage,/deep/uni-image,/deep/image{
			width: 160rpx;
			height: 160rpx;
		}
	}

	.evaluateWtapper .evaluateItem .imgList .morePic{
		position: absolute;
		width: 160rpx;
		height: 160rpx;
		color: #ffffff;
		font-size: 40rpx;
		text-align: center;
		top: 0;
		left: 0;
		background: rgba(0,0,0,.5);
		padding-top: 50rpx;
		box-sizing: border-box;
	}

	.evaluateWtapper .evaluateItem .reply {
		font-size: 26rpx;
		color: #454545;
		background-color: #f7f7f7;
		border-radius: 5rpx;
		margin: 20rpx 30rpx 0 30rpx;
		padding: 30rpx;
		position: relative;
		text{
			color: var(--view-theme);
		}
	}
	.evaluateWtapper .evaluateItem .reply::before {
		content: "";
		width: 0;
		height: 0;
		border-left: 20rpx solid transparent;
		border-right: 20rpx solid transparent;
		border-bottom: 30rpx solid #f7f7f7;
		position: absolute;
		top: -30rpx;
		left: 40rpx;
	}
	.start{
		position: relative;
		top: 4rpx;
	}
	.star_purple{
		background: url(../../pages/columnGoods/images/star_active_purple.png) left top/111rpx 19rpx no-repeat;
	}
	
</style>
