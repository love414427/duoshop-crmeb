<template>
	<view class="swiperBg" :style="'margin-top:' + marginTop +'rpx;background: linear-gradient(180deg, '+ bgColor0 +' 50%, '+ bgColor1 +' 100%);'">
		<!-- 单图模式 -->
		<block v-if="swiperType == 0">
			<view class="item-img" v-for="(item,index) in imgUrls" :key="index" :style="{padding:'0 '+paddinglr+'rpx',marginBottom:itemEdge+'rpx'}">
				<image @click="goDetail(item)" :src="item.img"></image></view>
		</block>
		<block v-else>
			<view class="swiper page_swiper" :class="[docConfig == 1 ? 'square' : docConfig == 0 ? 'circular' : 'nodoc',imgConfig?'':'fillet','dot'+txtStyle]" 
			:style="'padding: 0 '+ paddinglr +'rpx;'"
			 v-if="imgUrls.length">
				<swiper
				indicator-dots="true" 
				:autoplay="true" 
				:circular="circular"
				 :interval="interval" 
				 :duration="duration" 
				 indicator-color="rgba(255,255,255,0.6)" 
				 indicator-active-color="#fff"
				 :current="swiperCur"
				 previous-margin="20rpx"
				 next-margin="20rpx"
				 @change="swiperChange"
				 >
					<block v-for="(item,index) in imgUrls" :key="index">
						<swiper-item :class="{ active: index == swiperCur }">
							<view @click="goDetail(item)" class='slide-navigator acea-row row-between-wrapper'>
								<image :src="item.img" class="slide-image aa"></image>
							</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</block>
	</view>
</template>

<script>
	import {merPath} from "@/utils/index"
	
	export default {
		name: 'swiperBg',
		props: {
			dataConfig: {
				type: Object,
				default: () => {}
			},
			merId:{}
		},
		data() {
			return {
				indicatorDots: false,
				circular: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				imgUrls: [], //图片轮播数据
				bgColor0: this.dataConfig.isShow.val ? this.dataConfig.bgColor.color[0].item : 'transparent', //轮播背景颜色
				bgColor1: this.dataConfig.isShow.val ? this.dataConfig.bgColor.color[1].item : 'transparent', //轮播背景颜色
				marginTop: this.dataConfig.mbConfig.val, //组件上边距
				paddinglr: this.dataConfig.lrConfig.val, //轮播左右边距
				docConfig: this.dataConfig.docConfig.type, //指示点样式
				imgConfig: this.dataConfig.imgConfig.type, //是否为圆角
				txtStyle: this.dataConfig.txtStyle.type, //指示器位置
				imageH: 310,
				swiperCur: 0,
				swiperType: 1,
			};
		},
		watch: {
			imageH(nVal, oVal) {
				let self = this
				this.imageH = nVal
			}
		},
		created() {
			this.imgUrls = this.dataConfig.swiperConfig.list
		},
		mounted() {
			let that = this;
			this.$nextTick(function() {
				uni.getImageInfo({
					src: that.setDomain(that.imgUrls[0].img),
					success: function(res) {
						that.$set(that, 'imageH', res.height);
					},
					fail: function(error) {
						that.$set(that, 'imageH', 310);
					}
				})
			})
		},
		methods: {
			//替换安全域名
			setDomain: function(url) {
				url = url ? url.toString() : '';
				//本地调试打开,生产请注销
				if (url.indexOf("https://") > -1) return url;
				else return url.replace('http://', 'https://');
			},
			swiperChange(e) {
				let { current, source } = e.detail;
				if (source === 'autoplay' || source === 'touch') {
					this.swiperCur = e.detail.current;
				}
			},
			goDetail(url){
				let urls = url.info[1].value
				urls = merPath(urls, this.merId)
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
	.swiperBg {
		position: relative;
		background: #fff;
		z-index: 1;
		.colorBg {
			position: absolute;
			left: 0;
			top: 0;
			height: 130rpx;
			width: 100%;
		}
		.page_swiper {
			position: relative;
			width: 100%;
			height: auto;
			margin: 0 auto;
			border-radius: 10rpx;
			overflow-x: hidden;
			/* #ifdef MP */
			z-index: 20;
			/* #endif */
			/* 设置圆角 */
			&.fillet {
				.swiper-item, image, .acea-row.row-between-wrapper{
					border-radius: 10rpx;
				}
			}
			.swiper-item, image, .acea-row.row-between-wrapper {
				width: 100%;
				height:100%;
				margin: 0 auto;
			}
			swiper{
				width: 100%;
				display: block;
			}
			image {
				transform: scale(0.93);
				transition: all 0.6s ease;
			}
			swiper-item.active {
				image {
					transform: scale(1);
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
					background: #fff;
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
					background: #fff;
				}
			}
			&.nodoc{
				/deep/.uni-swiper-dot {
					display: none;
				}
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
	.item-img image{
		display: block;
		width: 100%;
	}
</style>
