<template>
	<view v-if="presellList.length > 0" class="presell-wrapper" :style="'margin-top:'+mbConfig+'rpx;'">
		<view class="presell-count" :class="'wrapper-count'+styleType" :style="'border-radius:'+bgStyle+'rpx'">
			<view class="spike-bd title-bd" :style="'border-radius:'+bgStyle+'rpx '+bgStyle+'rpx 0 0;background-image:url('+domain+'/static/images/presell_bg.png)'">
				<view class="title line1"><image class="title-img" :src="`${domain}/static/images/presell_title.png`"></image></view>
				<navigator v-if="!merId" url="/pages/activity/presell/index" class="more-btn" hover-class="none">
					进去逛逛
					<text class="iconfont icon-jiantou" hover-class="none"></text>
				</navigator>
			</view>
			<view class="wapper_count">
				<view class="spike-wrapper" :class="'wrapper'+styleType">
					<scroll-view v-if="styleType != 2" :class="'colum'+styleType" :scroll-x="styleType == 0 ? true : false" show-scrollbar="false">
						<navigator
							class="spike-item presell-item"
							v-for="(item, index) in presellList"
							:key="index"
							:url="'/pages/activity/presell_details/index?id=' + item.product_presell_id"
							hover-class="none"
						>
							<view class="img-box presell_imgBox" :class="'img-box'+conStyle">
								<easy-loadimage mode="widthFix" :image-src="item.product.image"></easy-loadimage>
								<view v-if="presellShow" class="box_bg" :style="'background-image: url('+domain+'/static/images/combination4.png)'">火热预定中</view>
							</view>
							<view v-if="priceShow || titleShow" class="info">
								<view class="price-box presell-price">
									<text :style="'color:'+themeColor" v-if="priceShow" class="price">
										<text>预售价:￥</text>
										{{ item.price }}
									</text>
									<view v-if="titleShow" class="name line1">{{ item.store_name }}</view>
								</view>
							</view>
						</navigator>
					</scroll-view>
					<block v-else class="acea-row row-between-wrapper combination">
						<navigator 
							class="combination-item" 
							v-for="(item, index) in presellList" 
							:key="index"
							:style="{ 'background-image': `url(${domain}/static/images/combination${index+1}.png)`,'border-radius':`${conStyle}rpx`}"
							:url="'/pages/activity/presell_details/index?id=' + item.product_presell_id"
							hover-class="none">
							<view class="info">
								<view class="price-box combination-price">
									<view v-if="titleShow" class="name line1">{{ item.product.store_name }}</view>
									<text :style="'color:'+themeColor" v-if="priceShow" class="price">
										<text>￥</text>
										{{ item.price }}
									</text>
									<text v-if="presellShow" class="gocom_btn">
										去预定
										<text class="iconfont icon-jiantou"></text>
									</text>
								</view>
							</view>
							<view class="img-box">
								<easy-loadimage mode="widthFix" :image-src="item.product.image"></easy-loadimage>
							</view>
						</navigator>
						<navigator v-if="presellList.length == 1" 
							class="combination-item"
							hover-class="none" 
							:style="{ 'background-image': `url(${domain}/static/images/combination2.png)`,'border-radius':`${conStyle}rpx`}"
							:url="'/pages/activity/presell_details/index?id=' + presellList[0].product_presell_id"
							>
							<view class="info">
								<view class="price-box combination-price">
									<view v-if="titleShow" class="name line1">{{ presellList[0].product.store_name }}</view>
									<text :style="'color:'+themeColor" v-if="priceShow" class="price">
										<text>￥</text>
										{{ presellList[0].price }}
									</text>
									<text v-if="presellShow" class="gocom_btn">
										去预定
										<text class="iconfont icon-jiantou"></text>
									</text>
								</view>
							</view>
							<view class="img-box">
								<easy-loadimage mode="widthFix" :image-src="presellList[0].product.image"></easy-loadimage>
							</view>
						</navigator>
						<navigator v-if="presellList.length == 1" 
							class="combination-item"
							hover-class="none" 
							:style="{ 'background-image': `url(${domain}/static/images/combination3.png)`,'border-radius':`${conStyle}rpx`}"
							:url="'/pages/activity/presell_details/index?id=' + presellList[0].product_presell_id"
							>
							<view class="info">
								<view class="price-box combination-price">
									<view v-if="titleShow" class="name line1">{{ presellList[0].product.store_name }}</view>
									<text :style="'color:'+themeColor" v-if="priceShow" class="price">
										<text>￥</text>
										{{ presellList[0].price }}
									</text>
									<text v-if="presellShow" class="gocom_btn">
										去预定
										<text class="iconfont icon-jiantou"></text>
									</text>
								</view>
							</view>
							<view class="img-box">
								<easy-loadimage mode="widthFix" :image-src="presellList[0].product.image"></easy-loadimage>
							</view>
						</navigator>
						<navigator v-if="presellList.length == 2"
						class="combination-item"
						hover-class="none" 
						:style="{ 'background-image': `url(${domain}/static/images/combination3.png)`,'border-radius':`${conStyle}rpx`}"
						:url="'/pages/activity/presell_details/index?id=' + presellList[1].product_presell_id"
						>
							<view class="info">
								<view class="price-box combination-price">
									<view v-if="titleShow" class="name line1">{{ presellList[1].product.store_name }}</view>
									<text :style="'color:'+themeColor" v-if="priceShow" class="price">
										<text>￥</text>
										{{ presellList[1].price }}
									</text>
									<text v-if="presellShow" class="gocom_btn">
										去预定
										<text class="iconfont icon-jiantou"></text>
									</text>
								</view>
							</view>
							<view class="img-box">
								<easy-loadimage mode="widthFix" :image-src="presellList[1].product.image"></easy-loadimage>
							</view>
						</navigator>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';
import { getPresellList } from '@/api/activity.js';
import { HTTP_REQUEST_URL } from '@/config/app';
export default {
	components:{
		easyLoadimage
	},
	name: 'presellList',
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
			presellList: [],
			mbConfig: this.dataConfig.mbConfig.val*2, //页面间距
			styleType: this.dataConfig.tabConfig.tabVal, //单行，多行，板块
			bgStyle: this.dataConfig.bgStyle.type ? 20 : 0,
			conStyle: this.dataConfig.conStyle.type ? 16 : 0,
			titleShow: this.dataConfig.titleShow.val,
			priceShow: this.dataConfig.priceShow.val,
			themeColor: this.dataConfig.themeColor && this.dataConfig.themeColor.color[0].item,
			presellShow: this.dataConfig.presellShow.val
		};
	},
	created() {},
	mounted() {
		this.getPresellProduct()
	},
	methods: {
		// 预售
		getPresellProduct() {
			let that = this;
			getPresellList({
				mer_id: that.merId,
				limit: that.styleType == 2 ? 3 : 12
			}).then(res => {
				that.presellList = res.data.list;
			}).catch(e => {});
		},
	}
};
</script>

<style scoped lang="scss">
@import '../style/main.scss';
.presell-wrapper{
	margin: 0 20rpx;
}
.spike-wrapper {
	&.wrapper2{
		padding: 0 20rpx 20rpx;
	}	
}
.presell-count {
	background-color: #fff;
	border-radius: 16rpx;
	box-shadow: 4rpx 2rpx 12rpx 2rpx rgba(0, 0, 0, 0.03);
}
.title-bd {
	margin-bottom: 0;
	padding: 24rpx 30rpx 30rpx 30rpx;
	border-radius: 16rpx 16rpx 0 0;
	background-size: 100%;
	background-repeat: no-repeat;
	.more-btn {
		top: 23rpx;
	}
}
.wapper_count {
	padding-left: 20rpx;
}
.wrapper-count2{
	.wapper_count{
		padding: 0;
	}
}
</style>
