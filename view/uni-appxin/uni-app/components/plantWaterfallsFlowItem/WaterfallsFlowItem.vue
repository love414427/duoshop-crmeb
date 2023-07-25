<template>  
	<view v-if="item" @click="goDetail(item)" class="wf-page2" :style="viewColor">
		<view class='pictrue skeleton-rect'>
			<!-- <image :src='item.image[0]' mode="widthFix"></image> -->
			<easy-loadimage class="image" mode="widthFix" :image-src="item.image[0]"></easy-loadimage>
			<view v-if="isShow" class="plant-show">
				<text v-if="item.is_type == 1" class="iconfont icon-tuwen1"></text>
				<text v-else-if="item.is_type == 2" class="iconfont icon-shipin1"></text>
			</view>
			<view v-else-if="item.is_type == 2" class="video_img">
				<image class="image" src="../../static/images/stop.png" mode=""></image>
			</view>
			<view v-if="isAuth && tab == 0 && item.status != 1" class="approval_status">
				<view v-if="item.status == -1" class="approval_title">审核未通过</view>
				<view v-else-if="item.status == -2" class="approval_title">已下架</view>
				<view v-else-if="item.status == 0" class="approval_title">正在审核</view>
				<text v-if="item.status == -1 || item.status == -2" class="approval_info">查看未通过原因</text>
				<text v-if="item.status == 0" class="approval_info">通过后将展示在列表</text>
			</view>
		</view>
		<view class='text'>
			<view class='name skeleton-rect'>
				<text class="text_name line2">{{item.title}}
				</text>				
			</view>
			<view class="count acea-row skeleton-rect">
				<view v-if="!isAuth" class="author acea-row">
					<image class="image" :src="(item.author && item.author.avatar) || '/static/images/f.png'" mode="widthFix"></image>
					<text class="author_name line1">{{item.author && item.author.nickname}}</text>
				</view>
				<view v-else class="author acea-row">
					<text class="author_time">
					{{item.time}}
					</text>
				</view>
				<view class="like">
					<button class="like_count" hover-class="none" @click.stop="likeToggle(item)">
						<text class="iconfont" :class="item.relevance_id ? 'icon-shoucang1' : 'icon-dianzan'"></text>
						<text class="collect">{{item.count_start}}</text>
					</button>
				</view>
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
import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
import { mapGetters } from "vuex";
export default {
	components:{easyLoadimage},
	computed: {...mapGetters(['viewColor'])},
    props: {
			item: {
					type: Object,
					require: true
			},
			type: {
				type: Number,
				default: 0
			},
			isAuth: {
				type: Number || String,
				default: 0
			},
			uid: {
				type: Number || String,
				default: 0
			},
			tab: {
				type: Number,
				default: 1
			},
			isFind: {
				type: Boolean,
				default: false
			},
			isShow: {
				type: Boolean,
				default: false
			},
    },
	data() {
		return {
			isShowAuth: false,
			isAuto: false
		};
	},
	
	methods: {	
		likeToggle(item){
			this.$emit('likeToggle',item)
		},
		goDetail(item){
			if(this.isFind){
				uni.navigateTo({
					url: '/pages/plantGrass/plant_featured/index?id='+item.topic_id
				});	
			}else{
				this.plantDeail(item)
			}
		},
		plantDeail(item){
			if(item.is_type == 1){
				uni.navigateTo({
					url: '/pages/plantGrass/plant_detail/index?id='+item.community_id
				});
			}else{
				let user = this.isAuth ? 1 : 0;
				console.log(this.uid)
				uni.navigateTo({
					//#ifdef APP
					url: '/pages/short_video/appSwiper/index?id='+item.community_id+'&user='+user+'&uid='+this.uid+'&tab='+this.tab
					//#endif
					//#ifndef APP
					url: '/pages/short_video/nvueSwiper/index?id='+item.community_id+'&user='+user+'&uid='+this.uid+'&tab='+this.tab
					//#endif
				});
			}
		}
	}
		
}

</script>
<style lang="scss" scoped>
.wf-page2 .pictrue{
	width: 345rpx;
	height: 345rpx;
	border-radius: 16rpx;
	position: relative;
	/deep/image,/deep/.easy-loadimage,/deep/.image{
		width: 100%;
		max-width: 345rpx;
		height: 345rpx;
		border-radius: 16rpx;
	}
	.video_img{
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		z-index: 100;
		.image,image,uni-image{
			width: 40rpx;
			height: 40rpx;
		}
	}
	.plant-show{
		width: 42rpx;
		height: 42rpx;
		border-radius: 100%;
		background: rgba(0,0,0,.5);
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 10rpx;
		left: 10rpx;
		.iconfont{
			font-size: 20rpx;
			color: #fff;
			
		}
	}
}
 .loadfail-img{
	width: 100%;
  height: 345rpx;
}
.wf-page2 .text{
	padding: 20rpx;
	width: 345rpx;
	.name{
		color: #333333;
		font-size: 28rpx;
		font-weight: bold;
	}
	.count{
		margin-top: 20rpx;
		justify-content: space-between;
		.author{
			align-items: center;
		}
		.author_name{
			margin-left: 10rpx;
			max-width: 120rpx;
			font-size: 24rpx;
			color: #333333;
			max-width: 180rpx;
		}
		.author_time{
			color: #666666;
		}
		.like{	
			font-size: 24rpx;
			color: #999999;
			display: flex;
			.like_count{
				display: flex;
				align-items: center;
			}
			.iconfont{
				font-size: 30rpx;
			}
			.icon-shoucang1{
				color: var(--view-priceColor);
			}
			.collect{
				font-size: 24rpx;
				margin-left: 5rpx;
			}
		}
	}
}
.wf-page2 .author .image,.wf-page2 .author uni-image{
	width: 46rpx;
	height: 46rpx;
	border-radius: 100%;
}
.approval_status{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.4);
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 16rpx;
	color: #fff;
	text-align: center;
	z-index: 5;
	.approval_title{
		font-size: 28rpx;
		margin-top: 135rpx;
		font-weight: bold;
	}
	.approval_info{
		font-size: 24rpx;
		margin-top: 24rpx;
	}
}
</style>
