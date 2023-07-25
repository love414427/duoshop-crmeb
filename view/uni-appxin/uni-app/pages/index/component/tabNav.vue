<template>
	<view>
		<!-- #ifdef MP || APP-PLUS -->
		<view style="visibility: hidden;" :style="{ height: navHeight + 'rpx' }" v-if="isFixed"></view>
		<!-- #endif -->
		<view class="navTabBox tabNav" :class="{isFixed:isFixed}" :style="'background:  '+ bgColor +';margin-top:'+mbConfig+'rpx;color:'+txtColor+';top:'+isTop">		
			<view class="longTab" :style='"width:"+mainWidth+"px"'>
				<scroll-view scroll-x="true" style="white-space: nowrap; display: flex;" scroll-with-animation :scroll-left="tabLeft" show-scrollbar="true">
					<view class="longItem" :style="'width:'+isWidth+'px;color:' + (index===tabClick ? activeColor : txtColor)" :data-index="index" :class="index===tabClick?'click':''" v-for="(item,index) in tabTitle" :key="index" :id="'id'+index" @click="longClick(index,item.store_category_id,item.pid)">{{item.cate_name}}</view>
					<view class="underlineBox" :style='"transform:translateX("+isLeft+"px);width:"+isWidth+"px"'>
						<view class="underline" :style="'background-color:'+activeColor"></view>
					</view>
				</scroll-view>
			</view>
			<navigator v-if="merId" :url="'/pages/store/home/index?id='+merId+'&type=2'" class="category" hover-class="none" :style="'background-color:'+bgColor+';color:'+txtColor">
				<text class="iconfont icon-fenlei3"></text>分类
			</navigator>
			<navigator v-else open-type='switchTab' url="/pages/goods_cate/goods_cate" class="category" hover-class="none" :style="'background-color:'+bgColor+';color:'+txtColor">
				<text class="iconfont icon-fenlei3"></text>分类
			</navigator>
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
	let app = getApp();
	export default {
		name: 'navTab',
		props: {
			tabTitle: {
				type: Array,
				default: []
			},
			dataConfig: {
				type: Object,
				default: () => {}
			},
			isFixed: {
				type: Boolean,
				default: false
			},
			merId: {
				type: String || Number,
				default: ''
			}
		},
		data() {
			return {
				tabClick: 0, //导航栏被点击
				isLeft: 0, //导航栏下划线位置
				isWidth: 0, //每个导航栏占位
				mainWidth: 0,
				tabLeft:0,
				swiperIndex:0,
				childIndex:0,
				childID:0,
				bgColor:this.dataConfig.bgColor.color[0].item,
				mbConfig:this.dataConfig.mbConfig.val * 2,
				txtColor:this.dataConfig.txtColor.color[0].item,
				activeColor: this.dataConfig.activeColor.color[0].item,
				fixedTop: 0,
				isTop: 0,
				navHeight: 38,
			};
		},
		created() {
			var that = this
			// 获取设备宽度
			uni.getSystemInfo({
				success(e) {					
					that.mainWidth = e.windowWidth
					that.isWidth = (e.windowWidth-65) / 4 
				}
			})
			setTimeout((e) => {
				const query = uni.createSelectorQuery().in(this);
				query.select('.navTabBox').boundingClientRect(data => {
					
					that.navHeight = data.height * 2
					that.$emit('bindHeight', data)
				}).exec();
			}, 300)
			that.$nextTick(function() {
				uni.getSystemInfo({
					success: function(res) {
						that.windowHeight = res.windowHeight;
					}
				});
			})
			// #ifdef MP || APP-PLUS
			this.isTop = (uni.getSystemInfoSync().statusBarHeight + 43) + 'px'
			// #endif
			// #ifdef H5 
			this.isTop = 0
			// #endif
		},
		methods: {
			// 导航栏点击
			longClick(index,id,fid){
				app.globalData.fid = fid;
				this.childIndex = 0;
				if(this.tabTitle.length>3){
					var tempIndex = index - 2;
					tempIndex = tempIndex<=0 ? 0 : tempIndex;
					this.tabLeft = (index-2) * this.isWidth //设置下划线位置
				}
				this.tabClick = index //设置导航点击了哪一个
				this.isLeft = index * this.isWidth //设置下划线位置	
				let obj = {
					index:index,
					pid:id//自己的id
				}
				if(!this.merId){
					this.parentEmit(obj);
				}else{
					if(id){
						uni.navigateTo({
							url: '/pages/store/list/index?id='+id+'&mer_id='+this.merId
						});
					}else{
						uni.navigateTo({
							url: '/pages/store/home/index?id='+this.merId
						});
					}
					
				}	
			},
			parentEmit(obj){
				this.$emit('changeTab', obj);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabNav {
		padding-top: 10rpx;
	}
	.navTabBox {
		width: 100%;
		color: rgba(255, 255, 255, 1);
		position: relative;
		padding-bottom: 10rpx;
		&.isFixed {
			z-index: 10;
			position: fixed;
			left: 0;
			width: 100%;
			/* #ifdef H5 */
			top: 0;
			/* #endif */
		}
		.click {
			color: white;
		}
		.longTab {
			/* #ifdef H5 */
			padding-right: 106rpx;
			/* #endif */
			/* #ifdef MP || APP-PLUS */
			padding-right: 116rpx;
			/* #endif */
			.longItem{ 
				height: 50upx; 
				display: inline-block;
				line-height: 50upx;
				text-align: center;
				font-size: 28rpx;
				color: #333333;
				max-width: 160rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				&.click{
					font-weight: bold;
					font-size: 30rpx;
					color: #E93323;
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
					width: 33rpx;
					height: 4rpx;
				}
			}
		}
		.category{
			position: absolute;
			right: 0;
			top: 10rpx;
			/* #ifdef H5 */
			width: 132rpx;
			/* #endif */
			/* #ifdef MP */
			width: 120rpx;
			/* #endif */
			/* #ifdef APP-PLUS */
			width: 150rpx;
			/* #endif */
			height: 50upx;
			line-height: 50upx;
			z-index: 3;
			padding: 0 15rpx 0 25rpx;
			.iconfont{
				font-size: 30rpx;
				margin-right:6rpx;
			}
		}
	}
	.child-box{
		width: 100%;
		position: relative;
		background-color: #fff;
		/* #ifdef H5 */
		box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.02);
		/* #endif */
		/* #ifdef MP */
		box-shadow: 0 2rpx 3rpx 1rpx #f9f9f9;
		/* #endif */
		.wrapper{
			display: flex;
			align-items: center;
			padding: 20rpx 0;
			background: #fff;
		}
		.child-item{
			flex-shrink: 0;
			width:140rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-left: 10rpx;
			image{
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
			}
			.txt{
				font-size: 24rpx;
				color: #282828;
				text-align: center;
				margin-top: 10rpx;
			}
			&.on{
				image{
					border: 1px solid $theme-color-opacity;
				}
				.txt{
					color: $theme-color;
				}
			}
		}
	}
</style>
