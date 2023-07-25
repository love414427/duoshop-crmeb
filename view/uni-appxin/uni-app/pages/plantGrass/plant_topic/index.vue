<template>
	<view class='productSort' :style="'height:'+winHeight+'px'">
		<view class="con-box" :style="viewColor">
			<view class='aside'>
				<scroll-view scroll-y="true" style="height: 100%; overflow: hidden;" scroll-with-animation='true'>
					<view v-for="(item,index) in productList" :key="item.category_id">
						<view class='item acea-row row-center-wrapper' :class='index==navActive?"on":""' v-show='item.children && item.children.length > 0'
						  @click='tap(index,"b"+index)'><text class="item_text">{{item.cate_name}}</text>
						 </view>
					</view>
				</scroll-view>
			</view>
			<view class='conter'>
				<scroll-view scroll-y="true">
					<view class='listw' v-for="(item,index) in childList" :key="item.topic_id">
						<view class='list'>	
							<navigator hover-class='none' :url="'/pages/plantGrass/plant_search_list/index?id='+item.topic_id" class='item acea-row'>
								<view class='picture'>
									<image :src='item.pic'></image>
								</view>
								<view class='text'>
									<view class="name line1">{{item.topic_name}}</view>
									<view class="info">{{item.count_use || 0}}篇内容 </view>
								</view>
							</navigator>	
						</view>
					</view>
					<view :style='"height:"+(height-300)+"rpx;"'></view>
				</scroll-view>
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
	let app = getApp();
	import { getTopicList } from '@/api/community.js';
	import { mapGetters } from "vuex";
	export default {
		computed: mapGetters(['viewColor']),
		data() {	
			return {
				productList: [],
				navActive: 0,
				number: "",
				height: 0,
				winHeight: 0,
				childList: []
			}
		},
		watch:{
			
		},
		onLoad(options) {
			let that = this			
			uni.getSystemInfo({
				success: function(res) {
					console.log(res,'res')
					that.winHeight = res.windowHeight
				},
			});
		},		
		onShow() {
			if (!this.productList.length) {
				this.getAllCategory();
			}
		},
		onReady() {},
		methods: {
			tap: function(index, id) {
				this.navActive = index;
				this.childList = this.productList[index].children
			},
			getAllCategory: function() {
				let that = this;
				getTopicList().then(res => {
					that.productList = res.data;
					for(let i=0; i < that.productList.length; i++){
						if(that.productList[i].children && that.productList[i].children.length > 0){
							that.childList = that.productList[i].children;
							return
						}
					}
				})
			},
		}
	}
</script>
<style scoped lang="scss">
	.productSort {
		display: flex;
		flex-direction: column;
		width: 100%;
		.con-box {
			flex: 1;
			display: flex;
			overflow: hidden;
		}
	}
	.productSort .aside {
		background-color: #f5f5f5;
		overflow-y: auto;
		overflow-x: hidden;
		width: 202rpx;
		height: 100%;
		overflow-y: scroll;
	}
	.productSort .aside .item {
		height: 100rpx;
		width: 100%;
		font-size: 28rpx;
		color: #666666;
	}
	.productSort .aside .item_text {
		padding-left: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.productSort .aside .item.on {
		background-color: #ffffff;
		border-left: 4rpx solid var(--view-theme);
		width: 100%;
		text-align: center;
		color: var(--view-theme);
		font-weight: bold;
	}
	.productSort .conter {
		flex: 1;
		height: 100%;
		padding: 0 30rpx;
		background-color: #ffffff;
		overflow-y: scroll;
	}
	.productSort .conter .list {
		flex-wrap: wrap;
	}
	.productSort .conter .list .item {
		margin-top: 26rpx;
		margin-bottom: 40rpx;
		align-items: center;
	}
	.productSort .conter .list .item .picture {
		width: 110rpx;
		height: 110rpx;
		border-radius: 8rpx;
	}
	.productSort .conter .list .item .picture image {
		width: 100%;
		height: 100%;
		border-radius: 8rpx;
	}
	.productSort .conter .list .item .text{
		margin-left: 30rpx;
	}
	.productSort .conter .list .text .name {
		font-size: 28rpx;
		color: #282828;
		font-weight: bold;
		max-width: 300rpx;
	}
	.productSort .list .item .info {
		font-size: 24rpx;
		color: #999999;
		margin-top: 10rpx;
	}
</style>