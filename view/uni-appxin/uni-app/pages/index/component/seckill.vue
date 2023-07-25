<template>
	<view v-if="spikeList.length > 0" class="skeleton-rect" :style="'margin-top:'+mbConfig+'rpx'">
		<view class="seckill-count" :class="'wrapper-count'+styleType" :style="'background:'+bgColor+';border-radius:'+bgStyle+'rpx'">
			<view class="spike-bd">
				<view class="acea-row row-middle">
					<image class="title-img" :src="`${domain}/static/images/spike_title.png`"></image>
					<view class="spike-distance">
						<text :style="'background-color:'+countDownColor" class="text bg-red">距结束</text>
						<countDown class="spike-count" :is-day="false" :tip-text="' '" :day-text="' '" :hour-text="':'" :minute-text="':'" :second-text="' '" :datatime="datatime" :colors="themeColor" @getProduct="getProduct"></countDown>
					</view>
				</view>
				<navigator v-if="!merId" url="/pages/activity/goods_seckill/index" class="more-btn" hover-class="none">
					更多惊喜
					<text class="iconfont icon-jiantou" hover-class="none"></text>
				</navigator>
			</view>
			<view class="spike-wrapper" :class="'wrapper'+styleType">
				<scroll-view v-if="styleType != 2"  :class="'colum'+styleType" :scroll-x="styleType == 0 ? true : false" show-scrollbar="false">
					<navigator
						class="spike-item"
						v-for="(item, index) in spikeList"
						:key="index"
						:url="'/pages/activity/goods_seckill_details/index?id=' + item.product_id + '&time=' + item.stop + ''"
						hover-class="none">
						<view class="img-box" :class="'img-box'+conStyle">
							<easy-loadimage mode="widthFix" :image-src="item.image"></easy-loadimage>
						</view>
						<view class="info">
							<view v-if="titleShow" class="name line1">{{ item.store_name }}</view>
							<view v-if="progressShow" class="stock-box">
								<view class="grabbed" :style="'width:' + item.percent + ';'"></view>
								<text class="stock-sales">{{ item.percent }}</text>
							</view>
							<view class="price-box">
								<text class="price">
									<text>￥</text>
									{{ item.price }}
								</text>
								<text v-if="priceShow" class="old-price">
									<text>￥</text>
									{{ item.ot_price }}
								</text>
							</view>
						</view>
					</navigator>
				</scroll-view>
				<block v-else class="acea-row row-between-wrapper combination">
					<navigator 
						class="combination-item" 
						v-for="(item, index) in spikeList" 
						:key="index"
						hover-class="none"
						:style="{ 'background-image': `url(${domain}/static/images/combination${index+1}.png)`,'border-radius':`${conStyle}rpx`}"
						:url="'/pages/activity/goods_seckill_details/index?id=' + item.product_id + '&time=' + item.stop + ''"
						>
						<view class="info">
							<view class="price-box combination-price">
								<view v-if="titleShow" class="name line1">{{ item.store_name }}</view>
								<text class="price">
									<text>￥</text>
									{{ item.price }}
								</text>
								<text class="gocom_btn">
									去抢购
									<text class="iconfont icon-jiantou"></text>
								</text>
							</view>
						</view>
						<view class="img-box">
							<easy-loadimage mode="widthFix" :image-src="item.image"></easy-loadimage>
						</view>
					</navigator>
					<navigator v-if="spikeList.length == 1" 
						class="combination-item"
						hover-class="none" 
						:style="{ 'background-image': `url(${domain}/static/images/combination2.png)`,'border-radius':`${conStyle}rpx`}"
						:url="'/pages/activity/goods_seckill_details/index?id=' + spikeList[0].product_id + '&time=' + spikeList[0].stop + ''"
						>
						<view class="info">
							<view class="price-box combination-price">
								<view v-if="titleShow" class="name line1">{{ spikeList[0].store_name }}</view>
								<text class="price">
									<text>￥</text>
									{{ spikeList[0].price }}
								</text>
								<text class="gocom_btn">
									去抢购
									<text class="iconfont icon-jiantou"></text>
								</text>
							</view>
						</view>
						<view class="img-box">	
							<easy-loadimage mode="widthFix" :image-src="spikeList[0].image"></easy-loadimage>
						</view>
					</navigator>
					<navigator v-if="spikeList.length == 1" 
						class="combination-item"
						hover-class="none" 
						:style="{ 'background-image': `url(${domain}/static/images/combination3.png)`,'border-radius':`${conStyle}rpx`}"
						:url="'/pages/activity/goods_seckill_details/index?id=' + spikeList[0].product_id + '&time=' + spikeList[0].stop + ''"
						>
						<view class="info">
							<view class="price-box combination-price">
								<view v-if="titleShow" class="name line1">{{ spikeList[0].store_name }}</view>
								<text class="price">
									<text>￥</text>
									{{ spikeList[0].price }}
								</text>
								<text class="gocom_btn">
									去抢购
									<text class="iconfont icon-jiantou"></text>
								</text>
							</view>
						</view>
						<view class="img-box">
							<easy-loadimage mode="widthFix" :image-src="spikeList[0].image"></easy-loadimage>
						</view>
					</navigator>
					<navigator v-if="spikeList.length == 2"
					class="combination-item"
					hover-class="none" 
					:style="{ 'background-image': `url(${domain}/static/images/combination3.png)`,'border-radius':`${conStyle}rpx`}"
					:url="'/pages/activity/goods_seckill_details/index?id=' + spikeList[1].product_id + '&time=' + spikeList[1].stop + ''"
					>
						<view class="info">
							<view class="price-box combination-price">
								<view v-if="titleShow" class="name line1">{{ spikeList[1].store_name }}</view>
								<text class="price">
									<text>￥</text>
									{{ spikeList[1].price }}
								</text>
								<text class="gocom_btn">
									去抢购
									<text class="iconfont icon-jiantou"></text>
								</text>
							</view>
						</view>
						<view class="img-box">
							<easy-loadimage mode="widthFix" :image-src="spikeList[1].image"></easy-loadimage>
						</view>
					</navigator>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import { HTTP_REQUEST_URL } from '@/config/app';
	import countDown from '@/components/countDown';
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';
	import {
		getSeckillIndexTime,
		getSeckillList
	} from '@/api/activity.js';
	export default {
		name: 'seckill',
		components:{
			countDown,
			easyLoadimage
		},
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
				datatime:0,
				spikeList: [],
				countDownColor: this.dataConfig.countDownColor.color[0].item,
				themeColor: this.dataConfig.themeColor.color[0].item,
				styleType: this.dataConfig.tabConfig.tabVal, //单行，多行，板块
				mbConfig: this.dataConfig.mbConfig.val*2,
				bgStyle: this.dataConfig.bgStyle.type ? 20 : 0,
				bgColor: this.dataConfig.bgColor.color[0].item,
				conStyle: this.dataConfig.conStyle.type ? 16 : 0,
				priceShow: this.dataConfig.priceShow.val,
				progressShow: this.dataConfig.progressShow.val,
				titleShow: this.dataConfig.titleShow.val
			};
		},
		created() {},
		mounted() {
			this.getSpikeProduct();
			this.getSpeckillCutTime();
		},
		methods: {
			// 获取秒杀截止时间
			getSpeckillCutTime() {
				getSeckillIndexTime().then(res => {
					this.datatime = res.data.seckillEndTime ? res.data.seckillEndTime : '';
				});
			},
			getSpikeProduct() {
				let that = this;
				getSeckillList({
					mer_id:that.merId,limit: that.styleType == 2 ? 3 : 12
				}).then(res => {
						that.spikeList = res.data.list;
						that.spikeList.map(item => {
							item.percent = item.stock === 0 ? '0%' : ((item.sales * 100) / item.stock).toFixed(2) + '%';
						});
				}).catch(e => {});
			},
			getProduct(){
				this.getSpeckillCutTime();
				this.getSpikeProduct();
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	.spike-count{
		display: flex;
		justify-content: center;
		align-items: center;
		/*#ifdef MP*/
		// width: 180rpx;
		/*#endif*/
	}
	/deep/.spike-bd .red{
		color: #e93323!important;
	}
</style>
