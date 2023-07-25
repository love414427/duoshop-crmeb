<template>
	<view class="hot-img" :style="'margin-top:' + mbConfig +'rpx;background-color:' + boxColor+';'" v-if="explosiveMoney.length">
		<!--单行展示-->
		<block v-if="tabConfig == 0">
			<view class="item skeleton-rect" v-for="(item, index) in explosiveMoney" :key="index" @click="goDetail(item)">
				<view class="title area-row">{{ item.info[0].value }}</view>
				<view class="msg area-row line1">{{ item.info[1].value }}</view>
				<view class="img">
					<easy-loadimage mode="widthFix" :image-src="item.img"></easy-loadimage>
				</view>
			</view>
		</block>
		<!--多行展示-->
		<block v-if="tabConfig == 1">
			<view class="bd">
				<view class="item skeleton-rect" v-for="(item, index) in explosiveMoney" :key="index" @click="goDetail(item)">
					<view class="left">
						<view class="title area-row">{{ item.info[0].value }}</view>
						<view class="msg area-row">{{ item.info[1].value }}</view>
					</view>
					<view class="img">
						<easy-loadimage mode="widthFix" :image-src="item.img"></easy-loadimage>
					</view>
				</view>
			</view>	
		</block>			
	</view>
</template>
<script>
	import {merPath} from "@/utils/index"
	export default {
		name: 'activeParty',
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
				explosiveMoney: this.dataConfig.menuConfig.list,
				themeColor: this.dataConfig.themeColor.color[0].item,
				bgColor: this.dataConfig.bgColor.color,
				mbConfig: this.dataConfig.mbConfig.val*2,
				boxColor: this.dataConfig.boxColor.color[0].item,
				tabConfig: this.dataConfig.tabConfig.tabVal, //展示样式
			};
		},
		created() {},
		methods: {
			goDetail(url){
				let urls = url.info[2].value
				urls = merPath(urls, this.merId)
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

<style scoped lang="scss">
	.hot-img {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 20rpx 0;
		padding: 20rpx 0;
		width: 710rpx;
		.item {
			display: block;
			width: 23.5%;
			background-color: #fefeff;
			padding: 20rpx 0 10rpx;
			border-radius: 8rpx;
			text-align: center;
			box-shadow: 2px 1px 6px 1px rgba(0, 0, 0, 0.03);
			.title {
				font-weight: bold;
				color: #282828;
				height: 40rpx;
			}
			.msg {
				margin: 5rpx auto 0;
				font-size: 20rpx;
				max-width: 120rpx;
				height: 40rpx;
			}
			.img {
				margin: 10rpx auto 0;
				width: 130rpx;
				height: 130rpx;
				/deep/image,/deep/.easy-loadimage,/deep/uni-image {
					width: 130rpx!important;
					height: 130rpx!important;
				}
			}	
			&:first-child .msg {
				color: #8fbbe8;
			}
			&:nth-child(2) .msg {
				color: #d797b7;
			}
			&:nth-child(3) .msg {
				color: #c49bd1;
			}
			&:nth-child(4) .msg {
				color: #a3bf95;
			}
		}
	}
	.bd{
		display: flex;
		flex-wrap: wrap;
		.item{
			display: flex;
			align-items: center;
			width: 49%;
			margin-right: 2%;	
			background: #fff;
			border-radius: 16rpx;
			padding: 20rpx;
			justify-content: space-between;	
			&:nth-child(3),&:nth-child(4){
				margin-top: 20rpx;
			}
			&:nth-child(2n){
			  margin-right: 0;
			}
			.left{
				width: 150rpx;
				align-items: center;
			}
			.img{
				margin: 0;
			}
			/deep/image,/deep/.easy-loadimage,uni-image{
				width: 120rpx!important;
				height: 120rpx!important;
			}		
		}
	}
</style>
