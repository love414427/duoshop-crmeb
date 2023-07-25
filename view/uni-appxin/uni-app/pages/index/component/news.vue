<template>
	<view v-if="itemNew.length" :style="'margin-top:'+mbConfig+'rpx;'">
		<view class='news acea-row row-between-wrapper':style="'background:'+bgColor[0].item+';margin: 0 '+prConfig+'rpx;border-radius:'+bgStyle+'rpx'">
			<view class='pictrue'>
				<image :src='logoConfig'></image>
			</view>
			<view class='swiperTxt'>
				<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" interval="2500" :duration="duration" vertical="true"
				 circular="true">
					<block v-for="(item,index) in itemNew" :key='index'>
						<swiper-item catchtouchmove='catchTouchMove'>
							<view @click="goDetail(item.chiild[1].val)" class='acea-row row-between-wrapper'>
								<view class='text acea-row row-between-wrapper'>
									<view class='newsTitle line1' :style="'text-align:'+ (txtStyle==1?'center':txtStyle==2?'right':'left') +';color:'+txtColor">{{item.chiild[0].val}}</view>
								</view>
								<view class='iconfont icon-jiantou'></view>
							</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import {merPath} from "@/utils/index"
	export default {
		name: 'news',
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
				itemNew: this.dataConfig.listConfig.list,
				logoConfig: this.dataConfig.logoConfig.url,
				bgColor: this.dataConfig.bgColor.color,
				mbConfig: this.dataConfig.mbConfig.val*2,
				prConfig: this.dataConfig.prConfig.val*2,
				txtStyle: this.dataConfig.txtStyle.type,
				txtColor: this.dataConfig.txtColor.color[0].item,
				bgStyle: this.dataConfig.bgStyle.type ? 20 : 0,
			};
		},
		created() {},
		mounted() {},
		methods: {
			goDetail(url){
				let urls = merPath(url, this.merId)
				console.log(urls,'urls');
				if(urls.indexOf("http") != -1){
					// #ifdef H5
					location.href = urls
					// #endif
				}else{
					if(['/pages/goods_cate/goods_cate','/pages/order_addcart/order_addcart','/pages/user/index','/pages/plant_grass/index'].indexOf(urls) == -1){
						uni.navigateTo({
							url:urls
						})	
					}else{
						uni.switchTab({
							url:urls
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.news {
		height: 77rpx;
		border-top: 1px solid #f4f4f4;
		padding: 0 20rpx;
		box-shadow: 0 10rpx 30rpx #f5f5f5;
	}
	.news .pictrue {
		width: 130rpx;
		height: 36rpx;
		border-right: 1px solid #ddd;
		padding-right: 23rpx;
		box-sizing: content-box;
	}
	.news .pictrue image {
		width: 100%;
		height: 100%;
	}
	.news .swiperTxt {
		width: 510rpx;
		height: 100%;
		line-height: 77rpx;
		overflow: hidden;
	}
	.news .swiperTxt .text {
		width: 480rpx;
	}
	.news .swiperTxt .text .label {
		font-size: 20rpx;
		color: #ff4c48;
		width: 64rpx;
		height: 30rpx;
		border-radius: 40rpx;
		text-align: center;
		line-height: 28rpx;
		border: 2rpx solid #ff4947;
	}
	.news .swiperTxt .text .newsTitle {
		width: 397rpx;
		font-size: 24rpx;
		color: #666;
	}
	.news .swiperTxt .iconfont {
		font-size: 22rpx;
		color: #282828;
	}
	.news .swiperTxt swiper {
		height: 100%;
	}
</style>
