<template>
	<view v-if="plantList.length > 0" :style="'margin-top:'+mbConfig+'rpx;'">
		<view class="plant-count skeleton-rect" :style="'margin: 0 '+prConfig+'rpx;border-radius:'+bgStyle+'rpx'">
			<block v-if="community_status">
				<view class="spike-bd plant_bg" :style="{ 'background-image': `url(${domain}/static/images/plant_bg.png)`}">
					<view class="title line1"><image class="title-img" :src="`${domain}/static/images/plant_title.png`"></image></view>
					<navigator v-if="!merId" :open-type="open_grass ? 'switchTab' : 'navigate'" url="/pages/plant_grass/index" class="more-btn" hover-class="none">
						好物分享
						<text class="iconfont icon-jiantou" hover-class="none"></text>
					</navigator>
				</view>
				<view class="live-wrapper plant" style="border-radius: 0;">
					<scroll-view :class="'colum'+styleType" :scroll-x="styleType == 0 ? true : false" >
						<view 
						v-for="(item, index) in plantList" 
						:key="index" 
						class="item" 
						:class="'plant-item'+styleType"
						:style="'border-radius:'+conStyle+'rpx'"
						@click="goDetail(item)"
						>
							<view :class="'img-box'+conStyle">
								<easy-loadimage mode="widthFix" :image-src="item.image[0]"></easy-loadimage>
								<view class="item_text">
									<text v-if="titleShow" class="text_name line1">{{item.title}}</text>
									<view v-if="avatarShow || nicknameShow" class="text_count acea-row">
										<image v-if="avatarShow" :src="(item.author && item.author.avatar) || '/static/images/f.png'" ></image>
										<text v-if="nicknameShow" class="name line1">{{(item.author && item.author.nickname) || ''}}</text>
									</view>
									<view class="like_count" v-if="styleType == 1">
										<text class="iconfont" :class="item.relevance_id ? 'icon-shoucang1' : 'icon-dianzan'"></text>
										<text class="collect">{{item.count_start}}</text>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
import { HTTP_REQUEST_URL } from '@/config/app';	
import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';
import { graphicLstApi } from '@/api/community.js';
import { openPlantGrass } from "@/config/app.js";
import { mapGetters } from 'vuex';
import { configMap } from '@/utils';
export default {
	computed: configMap(['community_status']),
	components:{
		easyLoadimage
	},
	name: 'plantList',
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
			plantList: [],
			open_grass: openPlantGrass,
			mbConfig: this.dataConfig.mbConfig.val*2, //页面间距
			styleType: this.dataConfig.tabConfig.tabVal, //单行，多行，板块
			prConfig: this.dataConfig.prConfig.val*2, //背景间距
			bgStyle: this.dataConfig.bgStyle.type ? 16 : 0,
			conStyle: this.dataConfig.conStyle.type ? 16 : 0,
			titleShow: this.dataConfig.titleShow.val,
			avatarShow: this.dataConfig.avatarShow.val,
			nicknameShow: this.dataConfig.nicknameShow.val,
			domain: HTTP_REQUEST_URL,
		};
	},
	created() {},
	mounted() {
		this.getPlantList()
	},
	methods: {
		// 种草
		getPlantList(){
			let that = this;
			graphicLstApi({
				mer_id: that.merId,
				limit: 6
			}).then(res => {
					that.plantList = res.data.list;
			}).catch(e => {});
		},
		goDetail(item){
			if(item.is_type == 1){
				uni.navigateTo({
					url: '/pages/plantGrass/plant_detail/index?id='+item.community_id
				});
			}else{
				uni.navigateTo({
					//#ifdef APP
					url: '/pages/short_video/appSwiper/index?id='+item.community_id
					//#endif
					//#ifndef APP
					url: '/pages/short_video/nvueSwiper/index?id='+item.community_id
					//#endif
				});
			}
		}
	}
};
</script>

<style scoped lang="scss">
@import '../style/main.scss';
.plant-count{
	background: #ffffff;
	box-shadow: 4rpx 2rpx 12rpx 2rpx rgba(0, 0, 0, 0.03);
}
.plant_bg{
	margin-bottom: 0;
	border-radius: 0;
	padding: 24rpx 20rpx 27rpx 30rpx;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	.more-btn{
		top: 22rpx;
	}
}
.live-wrapper {
	position: relative;
	width: 100%;
	overflow: hidden;
	border-radius: 16rpx;
	padding: 20rpx 20rpx 0;
	image {
		width: 100%;
		height: 400rpx;
	}
	.item{
		position: relative;
		width: 280rpx;
		height: 280rpx;
		display: inline-block;
		overflow: hidden;
		margin-right: 20rpx;
		/deep/image,.easy-loadimage,uni-image {
			width: 280rpx;
			height: 280rpx;
		}
		.img-box16{
			/deep/image,.easy-loadimage,uni-image {
				border-radius: 16rpx;
			}
		}
		.img-box0{
			/deep/image,.easy-loadimage,uni-image {
				border-radius: 0;
			}
		}
		&::before{
			content: "";
			display: block;
			width: 280rpx;
			height: 280rpx;
			background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
			position: absolute;
			top: 0;
			left: 0;
			z-index: 9;
		}
		.item_text{
			width: 260rpx;
			padding: 17rpx 15rpx;
			position: absolute;
			left: 0;
			bottom: 0;
			color: #ffffff;
			z-index: 9;
			image {
				width: 34rpx;
				height: 34rpx;
				border-radius: 100%;
			}
			.text_name{
				font-size: 24rpx;
				width: 260rpx;
				word-break: normal;
				word-wrap: break-word;
				display: block;
			}
			.text_count{
				margin-top: 12rpx;
				align-items: center;
				.name{
					font-size: 18rpx;
					margin-left: 10rpx;
					max-width: 200rpx;
				}
			}
		}
		&.plant-item1{
			width: 324rpx;
			height: 440rpx;
			margin-bottom: 20rpx;
			&:nth-child(2n){
				margin-right: 0;
			}
			/deep/image,.easy-loadimage,uni-image {
				width: 324rpx;
				height: 334rpx;
			}
			&::before{
				width: 324rpx;
				height: 334rpx;
			}
			.item_text{
				position: static;
				color: #282828;
				position: relative;
				width: 100%;
				height: 110rpx;
				.text_name {
					font-size: 28rpx;
					font-weight: bold;
				}
				.text_count{
					width: 100%;
					display: flex;
					align-items: center;
					.name{
						max-width: 160rpx;
					}
				}
				.like_count{
					position: absolute;
					bottom: 10rpx;
					right: 20rpx;
					font-size: 24rpx;
					display: flex;
					align-items: center;
					.iconfont{
						margin-right: 6rpx;
					}
					.icon-shoucang1{
						color: #E93323;
					}
				}
				image {
					width: 34rpx;
					height: 34rpx;
					border-radius: 100%;
				}
			}
		}
	}
}
</style>
