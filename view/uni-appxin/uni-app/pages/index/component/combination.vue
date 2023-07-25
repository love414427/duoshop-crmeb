<template>
	<view v-if="combinationList.length > 0" class="skeleton-rect" :style="'margin-top:'+mbConfig+'rpx'">
		<view class="seckill-count" :class="'wrapper-count'+styleType" :style="'background:'+bgColor+';border-radius:'+bgStyle+'rpx'">
			<view class="spike-bd">
				<view class="acea-row row-middle">
					<image class="title-img" :src="`${domain}/static/images/group_title.png`"></image>	
				</view>
				<navigator v-if="!merId" url="/pages/activity/combination/index" class="more-btn" hover-class="none">
					超值团购
					<text class="iconfont icon-jiantou" hover-class="none"></text>
				</navigator>
			</view>
			<view class="spike-wrapper" :class="'wrapper'+styleType">
				<scroll-view v-if="styleType != 2" :class="'colum'+styleType" :scroll-x="styleType == 0 ? true : false" show-scrollbar="false">
					<navigator
						class="spike-item"
						v-for="(item, index) in combinationList"
						:key="index"
						:url="'/pages/activity/combination_details/index?id=' + item.product_group_id"
						hover-class="none" :class="'img-box'+conStyle">
						<view class="img-box" :class="'img-box'+conStyle"><image :src="item.product.image" mode=""></image></view>
						<view class="info">
							<view v-if="titleShow" class="name line1">{{ item.product.store_name }}</view>
							<view class="price-box">
								<text v-if="pinkShow" class="comb-label" :style="'background:'+txtColor+';color:'+themeColor">{{item.buying_count_num}}人团</text>
								<text v-if="priceShow" class="price" :style="'color:'+themeColor">
									<text>￥</text>
									{{ item.price }}
								</text>
							</view>
							<view v-if="bntShow" class="com_btn">
								去拼团
							</view>
						</view>
					</navigator>
				</scroll-view>
				<block v-else class="acea-row row-between-wrapper combination">
					<navigator 
						class="combination-item" 
						v-for="(item, index) in combinationList" 
						:key="index"
						:style="{ 'background-image': `url(${domain}/static/images/combination${index+1}.png)`}"
						:url="'/pages/activity/combination_details/index?id=' + item.product_group_id"
						hover-class="none" :class="'img-box'+conStyle">
						<view class="info">
							<view class="price-box combination-price">
								<view v-if="titleShow" class="name line1">{{ item.product.store_name }}</view>
								<text v-if="priceShow" class="price" :style="'color:'+themeColor">
									<text>￥</text>
									{{ item.price }}
								</text>
								<text v-if="bntShow" class="gocom_btn">
									去拼团
									<text class="iconfont icon-jiantou"></text>
								</text>
							</view>
						</view>
						<view class="img-box" :class="'img-box'+conStyle">
							<easy-loadimage mode="widthFix" :image-src="item.product.image"></easy-loadimage>
						</view>
					</navigator>
					<navigator v-if="combinationList.length == 1" 
						class="combination-item"
						hover-class="none" 
						:style="{ 'background-image': `url(${domain}/static/images/combination2.png)`}"
						:url="'/pages/activity/combination_details/index?id=' + combinationList[0].product_group_id"
						:class="'img-box'+conStyle">
						<view class="info">
							<view class="price-box combination-price">
								<view v-if="titleShow" class="name line1">{{ combinationList[0].product.store_name }}</view>
								<text v-if="priceShow" class="price" :style="'color:'+themeColor">
									<text>￥</text>
									{{ combinationList[0].price }}
								</text>
								<text v-if="bntShow" class="gocom_btn">
									去拼团
									<text class="iconfont icon-jiantou"></text>
								</text>
							</view>
						</view>
						<view class="img-box" :class="'img-box'+conStyle">
							<easy-loadimage mode="widthFix" :image-src="combinationList[0].product.image"></easy-loadimage>
						</view>
					</navigator>
					<navigator v-if="combinationList.length == 1" 
						class="combination-item"
						hover-class="none"
						:style="{ 'background-image': `url(${domain}/static/images/combination3.png)`}"
						:url="'/pages/activity/combination_details/index?id=' + combinationList[0].product_group_id"
						:class="'img-box'+conStyle">
						<view class="info">
							<view class="price-box combination-price">
								<view v-if="titleShow" class="name line1">{{ combinationList[0].product.store_name }}</view>
								<text v-if="priceShow" class="price" :style="'color:'+themeColor">
									<text>￥</text>
									{{ combinationList[0].price }}
								</text>
								<text v-if="bntShow" class="gocom_btn">
									去拼团
									<text class="iconfont icon-jiantou"></text>
								</text>
							</view>
						</view>
						<view class="img-box" :class="'img-box'+conStyle">
							<easy-loadimage mode="widthFix" :image-src="combinationList[0].product.image"></easy-loadimage>
						</view>
					</navigator>
					<navigator v-if="combinationList.length == 2"
					class="combination-item"
					hover-class="none"
					:style="{ 'background-image': `url(${domain}/static/images/combination3.png)`}"
					:url="'/pages/activity/combination_details/index?id=' + combinationList[1].product_group_id"
					 :class="'img-box'+conStyle">
						<view class="info">
							<view class="price-box combination-price">
								<view v-if="titleShow" class="name line1">{{ combinationList[1].product.store_name }}</view>
								<text v-if="priceShow" class="price" :style="'color:'+themeColor">
									<text>￥</text>
									{{ combinationList[1].price }}
								</text>
								<text v-if="bntShow" class="gocom_btn">
									去拼团
									<text class="iconfont icon-jiantou"></text>
								</text>
							</view>
						</view>
						<view class="img-box" :class="'img-box'+conStyle">
							<easy-loadimage mode="widthFix" :image-src="combinationList[1].product.image"></easy-loadimage>
						</view>
					</navigator>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import { HTTP_REQUEST_URL } from '@/config/app';
	import { getCombinationList } from '@/api/activity.js';
	export default {
		name: 'combination',
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
				domain: HTTP_REQUEST_URL,
				combinationList: [],
				themeColor: this.dataConfig.themeColor.color[0].item,//主题颜色
				styleType: this.dataConfig.tabConfig.tabVal, //单行，多行，板块
				mbConfig: this.dataConfig.mbConfig.val*2,
				bgStyle: this.dataConfig.bgStyle.type ? 20 : 0,
				bgColor: this.dataConfig.bgColor.color[0].item,
				txtColor: this.dataConfig.txtColor.color[0].item,
				conStyle: this.dataConfig.conStyle.type,
				priceShow: this.dataConfig.priceShow.val,
				bntShow: this.dataConfig.bntShow.val,
				titleShow: this.dataConfig.titleShow.val,
				pinkShow: this.dataConfig.pinkShow.val,
			};
		},
		created() {},
		mounted() {
			this.getCombinationList();
		},
		methods: {
			// 砍价列表
			getCombinationList() {
				let that = this;
				getCombinationList({
					mer_id: that.merId,
					page: 1,
					limit: that.styleType == 2 ? 3 : 12
				}).then(res => {
					that.combinationList = res.data.list
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../style/main.scss';
	.seckill-count {
		background-color: #fff;
		margin: 0 20rpx;
		border-radius: 16rpx;
		padding: 24rpx 0 26rpx 20rpx;
		box-shadow: 4rpx 2rpx 12rpx 2rpx rgba(0, 0, 0, 0.03);
		&.wrapper-count2{
			padding: 24rpx 20rpx 26rpx;
		}
	}
	.comb-label{
		font-size: 24rpx;
		border-radius: 2rpx;
		padding: 1rpx 5rpx;
	}
	.com_btn{
		width: 96%;
		margin: 10rpx auto 0;
		height: 46rpx;
		line-height: 46rpx;
		background: linear-gradient(90deg, red 0%, #FF5400 100%);
		border-radius: 24rpx;
		text-align: center;
		color: #fff;
		font-size: 20rpx;
	}
</style>
