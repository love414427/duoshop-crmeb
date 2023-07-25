<template>
	<view :style="'margin-top:' +mbConfig+'rpx;background:'+bgColor">
		<view class="explosion" :style="'margin:0 '+prConfig+'rpx'">
			<view class="common-hd" mode="widthFix" v-if="logoUrl">
				<image class="title-img" mode="widthFix" :src="logoUrl"></image>
			</view>
			<view class="mer-box">
				<block v-if="tabConfig == 0">
					<view class="mer-item" v-for="(item, index) in brandList" :key="index" :style="'border-radius:'+bgStyle+'rpx'">
						<view class="mer-hd" @click="goStore(item.mer_id)" :style="'border-radius:'+bgStyle+'rpx '+bgStyle+'rpx 0 0'">
							<image :src="item.mer_banner"></image>
							<view class="mer-name">
								<image :src="item.mer_avatar"></image>
								<view class="txt line1">{{ item.mer_name }}</view>
								<text v-if="item.type_name" class="store_type" :style="'background:'+themeColor">{{ item.type_name }}</text>
								<text v-else-if="item.is_trader" class="store_type" :style="'background:'+themeColor">自营</text>
							</view>
						</view>
						<view class="pro-box">
							<navigator
								:url="`/pages/goods_details/index?id=${itemn.product_id}`"
								hover-class="none"
								class="pro-item"
								v-for="(itemn, indexn) in item.recommend"
								:key="indexn"
								v-if="item.recommend.length <= 3"
							>
								<view class="picture">
									<easy-loadimage mode="widthFix" :image-src="itemn.image"></easy-loadimage>
									<view v-if="itemn.border_pic" :style="{ backgroundImage: `url(${itemn.border_pic})` }" class="border-picture"></view>
								</view>	
								<view v-if="titleShow" class="name line1">{{itemn.store_name}}</view>
								<view v-if="priceShow" class="price" :style="'color:'+themeColor">
									<text>￥</text>
									{{ itemn.price }}
								</view>
							</navigator>
						</view>
					</view>
				</block>
				<block v-else>
					<view class="mer_count">
						<view class="item" v-for="(item, index) in brandList" :key="index" @click="goStore(item.mer_id)">
							<easy-loadimage mode="widthFix" :image-src="item.mer_avatar"></easy-loadimage>
						</view>
					</view>
				</block>	
				<view class="more-shop" @click="moreShop">
					<text>更多店铺</text>
					<text class="iconfont icon-xiangyou"></text>
				</view>
			</view>
		</view>
	</view>	
</template>

<script>
import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';
import { storeMerchantList } from '@/api/store.js';
import { mapGetters } from 'vuex';
import { configMap } from '@/utils';
export default {
	computed: configMap(['hide_mer_status']),
	components: {
		easyLoadimage
	},
	props: {
		dataConfig: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			brandList: [],
			mbConfig: this.dataConfig.mbConfig.val*2, //页面间距
			prConfig: this.dataConfig.prConfig.val*2, //背景间距
			logoUrl: this.dataConfig.logoConfig.url,
			bgStyle: this.dataConfig.bgStyle.type ? '16' : 0,
			bgColor: this.dataConfig.bgColor.color[0].item,
			themeColor: this.dataConfig.themeColor.color[0].item,
			tabConfig: this.dataConfig.tabConfig.tabVal, //展示样式
			numConfig: this.dataConfig.numConfig.val,
			titleShow: this.dataConfig.titleShow.val,
			priceShow: this.dataConfig.priceShow.val
		}	
	},
	created() {},
	mounted() {
		this.storeMerchant();
	},
	methods: {
		// 进店看看
		goStore(id) {
			if (this.hide_mer_status != 1) {
				uni.navigateTo({
					url: `/pages/store/home/index?id=${id}`
				});
			}
		},
		// 更多店铺
		moreShop() {
			uni.navigateTo({
				url: `/pages/store/shopStreet/index?cate_id=&type_id=`
			});
		},
		// 品牌好店
		storeMerchant() {
			storeMerchantList({
				page: 1,
				limit: this.numConfig ? this.numConfig : 4,
				is_best: 1
			}).then(res => {
				this.brandList = res.data.list;
			});
		},
	}
};
</script>

<style scoped lang="scss">
.explosion {
	.common-hd {
		display: flex;
		align-items: center;
		justify-content: center;
	
		.title-img{
			width: 242rpx;
			margin: 20rpx 0;
		}
	}
	.mer-box {
		margin-bottom: 20rpx;
		.mer-item {
			margin-bottom: 20rpx;
			background-color: #fff;
			text-align: center;
			.mer-hd {
				position: relative;
				width: 100%;
				height: 200rpx;
				border-radius: 16rpx 16rpx 0 0;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
				.mer-name {
					position: absolute;
					left: 20rpx;
					top: 20rpx;
					display: flex;
					max-width: 60%;
					padding: 8rpx 8rpx 8rpx 4rpx;
					border-radius: 26rpx;
					background: #fff;
					font-weight: bold;
					font-size: 12px;
					align-items: center;
					image {
						width: 38rpx;
						height: 38rpx;
						margin-right: 10rpx;
						border-radius: 50%;
					}
					.txt {
						flex: 1;
						line-height: 19px;
						height: 19px;
					}
					.store_type {
						font-size: 10px;
						color: #fff;
						background-color: #e93323;
						padding: 0 5px;
						line-height: 19px;
						height: 19px;
						margin-left: 20rpx;
						border-radius: 30rpx;
					}
				}
			}
			/deep/.easy-loadimage,/deep/uni-image,image,/deep/.loadfail-img{
				width: 100%;
				height: 214rpx;
			}
			.pro-box {
				display: flex;
				align-items: center;
				padding: 20rpx 20rpx 30rpx;
				.pro-item {
					width: 31.3%;
					margin-right: 3.05%;
					.picture,/deep/.easy-loadimage,/deep/uni-image,/deep/image,/deep/.loadfail-img {
						width: 100%;
						height: 214rpx;
						position: relative;
					}
					.sell_out {
						display: flex;
						width: 110rpx;
						height: 110rpx;
						align-items: center;
						justify-content: center;
						border-radius: 100%;
						background: rgba(0,0,0,.6);
						color: #fff;
						font-size: 24rpx;
						position: absolute;
						top: 50%;
						left: 50%;
						margin: -55rpx 0 0 -55rpx;
						&::before{
							content: "";
							display: block;
							width: 100rpx;
							height: 100rpx;
							border-radius: 100%;
							border: 1px dashed #fff;
							position: absolute;
							top: 5rpx;
							left: 5rpx;
						}
					}
					.border-picture {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background: center/cover no-repeat;
					}
					.name{
						padding: 6rpx 9rpx;
						margin-top: 6rpx;
					}
					.price {
						margin-top: 5rpx;
						font-size: 28rpx;
						color: $theme-color;
						font-weight: bold;
						text {
							font-size: 28rpx;
						}
					}
					&:last-child {
						margin-right: 0;
					}		
					.picture {
						position: relative;
					}				
					.border-picture {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background: center/cover no-repeat;
					}
				}
			}
		}
		.more-shop {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #ffffff;
			padding: 27rpx 0;
			color: #999999;
			font-size: 26rpx;
			.icon-xiangyou {
				font-size: 22rpx;
			}
		}
	}
}
.mer_count{
	display: flex;
	flex-wrap: wrap;
	padding: 20rpx;
	align-items: center;
	.item{
		width: 23.5%;
		height: 140rpx;
		margin: 0 2% 10px 0;
		background: #FEFEFF;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		/deep/uni-image,/deep/image,/deep/.easy-loadimage{
			width: 140rpx;
			height: 70rpx;
		}
		&:nth-child(4n){
			margin-right: 0;
		}
	}
}
</style>
