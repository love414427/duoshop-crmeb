<template>
	<view class="page_count">
		<view class="bg-img">
			<img :src="bgColor" alt="">
		</view>
		<!--搜索-->
		<view :class="{scrolled:isScrolled}" class="my-main">	
			<!-- #ifdef H5 -->
			<view>
				<view class="header">
					<view class="sys-head tui-skeleton" :style="{ height: statusBarHeight }"></view>
					<view class="serch-box tui-skeleton">
						<view class="serch-wrapper flex">
							<view v-if="logoConfig || site_logo" class="logo skeleton-rect"><image :src="logoConfig || site_logo" mode="widthFix"></image></view>
							<navigator v-if="hotWords.length > 0" :url="'/pages/columnGoods/goods_search/index?searchVal='+searchVal" :class="(logoConfig || site_logo) ? 'input' : 'uninput'"
							hover-class="none" class="skeleton-rect box">
								<view class='swiperTxt'>
									<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" vertical="true"
									 circular="true" @change="textChange">
										<block v-for="(item,index) in hotWords" :key='index'>
											<swiper-item catchtouchmove='catchTouchMove'>
												<view class='acea-row row-between-wrapper'>
													<view class='text acea-row row-between-wrapper'>
														<view class='newsTitle line1'>{{item.val}}</view>
													</view>
												</view>
											</swiper-item>
										</block>
									</swiper>
								</view>
								<text class="iconfont icon-xiazai5"></text>
							</navigator>
							<navigator v-else url="/pages/columnGoods/goods_search/index" :class="(logoConfig || site_logo) ? 'input' : 'uninput'" 
							hover-class="none" class="skeleton-rect">
								搜索商品
								<text class="iconfont icon-xiazai5"></text>
							</navigator>
							<navigator class="btn skeleton-rect" url="/pages/chat/customer_list/index?type=0" hover-class="none">
								<view class="iconfont icon-xiaoxi" style="color:#fff;"></view>
								<text class="iconnum" v-if="userInfo.total_unread">{{ userInfo.total_unread }}</text>
							</navigator>
						</view>
					</view>
				</view>
				<view :style="'height:'+isTop+'px'"></view>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP || APP-PLUS -->
			<view>
				<view class="mp-header" id="home">
					<view class="sys-head tui-skeleton" :style="{ height: statusBarHeight }"></view>
					<view class="serch-box tui-skeleton">
						<view class="serch-wrapper flex">
							<view v-if="logoConfig || site_logo" class="logo skeleton-rect"><image :src="logoConfig || site_logo" mode="widthFix"></image></view>
							<navigator v-if="hotWords.length > 0" :url="'/pages/columnGoods/goods_search/index?searchVal='+searchVal" :class="(logoConfig || site_logo) ? 'input' : 'uninput'"
							hover-class="none" class="skeleton-rect box">
								<view class='swiperTxt'>
									<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" vertical="true"
									 circular="true" @change="textChange">
										<block v-for="(item,index) in hotWords" :key='index'>
											<swiper-item catchtouchmove='catchTouchMove'>
												<view class='acea-row row-between-wrapper'>
													<view class='text acea-row row-between-wrapper'>
														<view class='newsTitle line1'>{{item.val}}</view>
													</view>
												</view>
											</swiper-item>
										</block>
									</swiper>
								</view>
								<text class="iconfont icon-xiazai5"></text>
							</navigator>
							<navigator v-else url="/pages/columnGoods/goods_search/index" :class="(logoConfig || site_logo) ? 'input' : 'uninput'" 
							hover-class="none" class="skeleton-rect">
								搜索商品
								<text class="iconfont icon-xiazai5"></text>
							</navigator>
						</view>
					</view>
				</view>
				<view :style="'height:'+marTop+'px;'"></view>
			</view>
			<!-- #endif -->
			<!--选项卡-->
			<view style="visibility: hidden;" :style="{ height: navHeight + 'px' }"></view>
			<view class="navTabBox tabNav" :class="{bgwhite:isScrolled}" :style="'top:'+isTop+'px'">		
				<view class="longTab" :style='"width:"+mainWidth+"px"'>
					<scroll-view scroll-x="true" style="white-space: nowrap; display: flex;" scroll-with-animation :scroll-left="tabLeft" show-scrollbar="true">
						<view class="longItem" :data-index="index" :class="index===tabClick?'click':''" @click="changeTab(item,index)" v-for="(item,index) in tabTitle" :key="index" :id="'id'+index">{{item.info[0].value}}</view>
						<view class="underlineBox" :style='"transform:translateX("+isLeft+"px);width:"+isWidth+"px"'>
							<view class="underline"></view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!--轮播图-->
		<view class="swiperBg" :style="{ marginTop: swiperTop+'px'}">
			<block>
				<view class="swiper page_swiper" 
				 v-if="imgUrls.length">
					<swiper
					:autoplay="true" 
					:circular="circular"
					:interval="intervals" 
					:duration="duration" 
					indicator-color="rgba(255,255,255,0.6)" 
					indicator-active-color="#fff"
					:current="swiperCur"
					previous-margin="30rpx"
					next-margin="30rpx"
					@change="swiperChange"
					:class="{ scalex:isScale }"
					>
						<block v-for="(item,index) in imgUrls" :key="index">
							<swiper-item :class="{ active: index == swiperCur,scalex:isScale }">
								<view @click="goDetail(item)" class='slide-navigator acea-row row-between-wrapper'>
									<image :src="item.img" class="slide-image aa"></image>
								</view>
							</swiper-item>
						</block>
					</swiper>
					<view class="dots">  
						<block v-for="(item,index) in imgUrls" :key="index">  
							<view class="dot" :class="index == swiperCur ? ' active' : ''"></view>  
						</block>  
					</view>  
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	import { configMap } from '@/utils';
	export default {
		name: 'homeComb',
		props: {
			dataConfig: {
				type: Object,
				default: () => {}
			},
			isScrolled: {
				type: Boolean,
				default: false
			},
			isScale: {
				type: Boolean,
				default: false
			},
			isMenu: {
				type: Boolean,
				default: false
			},
			userInfo: {
				type: Object,
				default: () => {}
			}, 
		},
		computed: configMap({site_logo: ''}),
		data() {
			return {
				statusBarHeight: statusBarHeight,
				scrollHeight: 0,
				autoplay: true,
				interval: this.dataConfig.titleConfig.value * 1000 || 2500,
				duration: 500,
				marTop: 50,
				searchH: 0,
				logoConfig: this.dataConfig.logoConfig.url,
				hotWords: this.dataConfig.hotWords.list || [],
				tabClick: 0, //导航栏被点击
				isLeft: 0, //导航栏下划线位置
				isWidth: 0, //每个导航栏占位
				mainWidth: 0,
				tabLeft:0,
				swiperIndex:0,
				childIndex:0,
				childID:0,			
				tabTitle:this.dataConfig.listConfig.list,
				fixedTop: 0,
				isTop: 0,
				navHeight: 38,
				homeTop: 20,
				indicatorDots: false,
				circular: true,
				autoplay: true,
				intervals: 3000,
				duration: 500,
				imgUrls: [], //图片轮播数据
				imageH: 310,
				swiperCur: 0,
				swiperType: 1,
				searchVal: this.dataConfig.hotWords && this.dataConfig.hotWords.list[0]['val'] || '',
				bgColor: this.dataConfig.swiperConfig.list && this.dataConfig.swiperConfig.list[0]['img'],
				tabId: false,
				isCategory: false,
				swiperTop: 0,
				isFixed: true,
			};
		},
		watch: {
			imageH(nVal, oVal) {
				let self = this
				this.imageH = nVal
			},
		},
		created() {
			var that = this
			// 获取设备宽度
			uni.getSystemInfo({
				success(e) {					
					that.mainWidth = e.windowWidth
					that.isWidth = (e.windowWidth-65) / 8 
				}
			})	
			setTimeout((e) => {
				const query = uni.createSelectorQuery().in(this);
				query.select('.navTabBox').boundingClientRect(data => {
					that.navHeight = data.height > 42 ? data.height : 42
				}).exec();
				// #ifdef H5
				query.select('.header').boundingClientRect(data => {
					that.isTop = data.height
					that.marTop = data.height
				}).exec();
				// #endif
				// #ifdef MP || APP-PLUS
				// #ifdef APP-PLUS
				const menuButton = 0
				//#endif
				// #ifdef MP
				const menuButton = uni.getMenuButtonBoundingClientRect();
				//#endif
				query
					.select('.mp-header')
					.boundingClientRect(data => {
						this.homeTop = menuButton.top * 2 + menuButton.height - data.height;
						this.marTop = data.height
					}).exec();
				//#endif
			}, 500)
			that.isTop = (uni.getSystemInfoSync().statusBarHeight + 43)
			that.imgUrls = that.dataConfig.swiperConfig.list
			that.$nextTick(function() {
				setTimeout((e) => {
					// #ifdef H5
					that.swiperTop = that.navHeight+that.marTop
					//#endif
					// #ifdef MP || APP-PLUS
					that.swiperTop = that.navHeight + that.marTop + uni.getSystemInfoSync().statusBarHeight
					//#endif
					// #ifdef APP-PLUS
					// that.swiperTop = uni.getSystemInfoSync().statusBarHeight + 50 + 30
					//#endif
				}, 500)
			})
		},
		mounted(){
			let that = this;
			if(that.tabTitle[0]['value'] != '推荐'){
				that.tabTitle.unshift({
					img: '',
					info: [{value: "推荐"},{value: false}]
				})
			}	
			that.$nextTick(function() {
				uni.getImageInfo({
					src: that.setDomain(that.imgUrls[0].img),
					success: function(res) {
						that.$set(that, 'imageH', res.height);
					},
					fail: function(error) {
						that.$set(that, 'imageH', 310);
						console.log(error, 'error')
					}
				})
			})
		},
		methods: {
			goDetail(url){
				let urls = url.info[1].value
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
			},
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
					this.bgColor = this.imgUrls[e.detail.current]['img']
				}
			},
			textChange(e) {
				let { current, source } = e.detail;
				if (source === 'autoplay' || source === 'touch') {
					this.searchVal = this.hotWords[e.detail.current]['val']
				}
			},
			/**显示全部分类*/
			showCategory() {
				this.isCategory = true;
			},
			/*跳转为页面*/
			changeTab(item, index) {
				if(this.tabClick == index) return
				this.tabClick = index //设置导航点击了哪一个
				this.isLeft = index * this.isWidth + 16 //设置下划线位置
				this.tabId = item.info[1].value
				this.bgColor = this.tabId ? item.img : this.dataConfig.swiperConfig.list[0]['img']
				this.imgUrls = this.tabId ? [{img:item.img}] : this.dataConfig.swiperConfig.list
				this.$emit('changeDiy', this.tabId);
			}
		},
	}
</script>

<style lang="scss" scoped>
.page_count {
	position: relative;
	overflow: hidden;
	.bg-img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		/* #ifdef MP || APP-PLUS */
		z-index: -1;
		/* #endif */
		/* #ifdef H5 */
		z-index: 0;
		/* #endif */
		z-index: 0;
		filter: blur(0);
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			filter: blur(30rpx);
			transform: scale(1.5);
		}
	}
}
.my-main{
	transition: background-color .5s ease;
}
.swiperTxt {
	width: 300rpx;
	line-height: 64rpx;
	height: 64rpx;
	overflow: hidden;
}
.swiperTxt .text {
	width: 480rpx;
}
.swiperTxt .text .newsTitle {
	width: 300rpx;
	font-size: 24rpx;
	color: #ffffff;
}
.swiperTxt swiper {
	height: 100%;
}
.header {
	z-index: 99;
	position: fixed;
	left: 0;
	width: 100%;
	.btn {
		position: relative;
		margin-left: 30rpx;
		.iconfont {
			font-size: 45rpx;
		}
	}
	.iconnum {
		min-width: 14rpx;
		color: #E93323;
		background: #fff;
		border-radius: 15rpx;
		position: absolute;
		right: -10rpx;
		top: -10rpx;
		font-size: 10px;
		padding: 0 5px;
	}
	.serch-wrapper {
		align-items: center;
		padding: 20rpx 30rpx 20rpx 30rpx;
		.logo {
			width: 133rpx;
			margin-right: 20rpx;
		}
		image {
			width: 133rpx;
			height: 66rpx;
		}
		.box{
			flex: 1;
		}
		.input,.uninput {
			line-height: 64rpx;
			height: 64rpx;
			padding: 0 0 0 30rpx;
			background: rgba(0,0,0,.2);
			color: #fff;
			border-radius: 30rpx;
			font-size: 28rpx;
			z-index: 2;
			position: relative;
			box-sizing: border-box;
			.iconfont {
				position: absolute;
				right: 20rpx;
				top: 0;
				color: #eeeeee;
			}
		}
	}	
}	
.mp-header {
	z-index: 99;
	position: fixed;
	left: 0;
	width: 100%;
	.box{
		flex: 1;
	}
	.serch-wrapper {
		display: flex;
		align-items: center;
		padding: 0 50rpx 0 30rpx;
		height: 76rpx;			
		.logo {
			width: 133rpx;
			margin-right: 20rpx;
			line-height: 0;
		}
		image {
			width: 118rpx;
			height: 42rpx;
		}
		.input,.uninput {
			display: flex;
			/* #ifdef MP */
			flex: 0;
			/* #endif */
			/* #ifdef APP-PLUS */
			flex: 1;
			/* #endif */
			flex: 1;
			align-items: center;
			height: 64rpx;
			line-height: 64rpx;
			padding: 0 50rpx 0 30rpx;	
			background: rgba(0,0,0,.2);
			border-radius: 100rpx;
			color: #ffffff;
			font-size: 28rpx;
			position: relative;
			box-sizing: border-box;
			.iconfont {
				position: absolute;
				right: 20rpx;
				top: 0;
				color: #eeeeee;
			}
		}
		/* #ifdef MP */
		.uninput{
			max-width: 500rpx;
		}
		.input{
			max-width: 340rpx;
		}
		/* #endif */
	}
}
.tabNav {
	padding-top: 10rpx;
}
.navTabBox {
	color: rgba(255, 255, 255, 1);
	padding: 0 30rpx;
	z-index: 10;
	left: 0;
	width: 100%;
	box-sizing: border-box;
	position: fixed;
	scroll-view{
		width:100%;
		padding-right: 30rpx;
		height: 70rpx;
	}
	.click {
		color: white;
	}
	.longTab {
		.longItem{ 
			height: 50upx; 
			display: inline-block;
			line-height: 50upx;
			text-align: center;
			font-size: 28rpx;
			color: #FFFFFF;
			max-width: 160rpx;
			margin-right: 30rpx;
			position: relative;
			&:last-child{
				margin-right: 0;
			}
			&.click{
				font-weight: bold;
				font-size: 30rpx;
				color: #FFFFFF;
				&::after{
					content: '';
					transition: .5s;
					width: 33rpx;
					height: 4rpx;
					background: #FFFFFF;
					position: absolute;
					bottom: -4rpx;
					left: 50%;
					margin-left: -16rpx;
				}
			}
		}
	}
}
.scrolled{
	z-index: 5000;
	position: fixed;
	min-height: 180rpx;
	left: 0;
	top: 0;
	width: 100%;
	background: #fff!important;
	transition: background-color .5s ease;
	.longItem,.click,.category text{
		color: #000000!important;
	}
	.navTabBox,.mp-header{
		transition: background-color .5s ease;
	}
	.btn .iconfont{
		color: #333333!important;
	}
	.iconnum{
		background: #333333!important;
	}
	.underline{
		background: #000000!important;
	}
	.click{
		&::after{
			background-color:#fff!important;
		}
	}
}
.swiperBg {
	z-index: 1;
	margin-top: 10rpx;
	padding-bottom: 30rpx;
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
		z-index: 8;
		padding: 0 10rpx;
		swiper-item{
			border-radius: 10rpx;
		}
		.swiper-item, image, .acea-row.row-between-wrapper {
			width: 100%;
			height:100%;
			margin: 0 auto;
			border-radius: 10rpx;
		}
		swiper{
			width: 100%;
			display: block;
			height: 308rpx;
			&.scalex{
				/deep/.uni-swiper-slide-frame{
					transform: translate(0,0)!important;
				}			
			}
		}
		image {
			transform: scale(0.93);
			transition: all 0.6s ease;
		}
		swiper-item.active, swiper-item.scalex{
			image {
				transform: scale(1);			
			}
		}
		/*用来包裹所有的小圆点  */
		.dots {
		  width: 156rpx;
		  height: 36rpx;
		  display: flex;
		  flex-direction: row;
		  position: absolute;
		  left: 320rpx;
		  bottom: 0;
		}		
		/*未选中时的小圆点样式 */
		.dot {
		  width: 16rpx;
		  height: 6rpx;
		  border-radius: 6rpx;
		  margin-right: 6rpx;
		  background-color: rgba(255,255,255,.4);
			/*选中以后的小圆点样式  */
			&.active {
			  width: 32rpx;
			  height: 6rpx;
			  background-color: rgba(255,255,255,.4);
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
</style>
