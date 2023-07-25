<template>
	<view v-if="assistList.length > 0">
		<view class="skeleton-rect" :style="'margin-top:'+mbConfig+'rpx;'">
			<view class="assist-count" :class="'wrapper-count'+styleType" :style="'border-radius:'+bgStyle+'rpx'">
				<view class="spike-bd">
					<view class="title line1"><image class="title-img" :src="`${domain}/static/images/assist_title.png`"></image></view>
					<view v-if="!merId" class="activity_pic">
						<view v-for="(item, index) in assistUserList" class="picture">
							<text v-if="item.avatar_img" class="avatar" :style="'background-image: url(' + item.avatar_img + ')'"></text>
							<text v-else class="avatar" style="background-image: url('/static/images/f.png')"></text>
						</view>
						<text class="pic_count">{{ assistUserCount }}人助力成功</text>
					</view>
					<navigator v-if="!merId" url="/pages/activity/assist/index" class="more-btn" hover-class="none">
						更多活动
						<text class="iconfont icon-jiantou" hover-class="none"></text>
					</navigator>
				</view>
				<view class="wapper_count">
					<view class="spike-wrapper" :class="'wrapper'+styleType">
						<scroll-view v-if="styleType != 2" :class="'colum'+styleType" :scroll-x="styleType == 0 ? true : false" show-scrollbar="false">
							<view class="spike-item assist-item" v-for="(item, index) in assistList" :key="index" @click="handleAssist(item.product_assist_id)">
								<view class="img-box" :class="'img-box'+conStyle">
									<easy-loadimage mode="widthFix" :image-src="item.product.image"></easy-loadimage>
									<text v-if="joinShow" class="participants">{{ item.user_count }}人参与</text>
								</view>
								<view v-if="titleShow || barginShow || priceShow" class="assist-info" :class="'assist-info'+styleType">
									<view class="price-box presell-price">
										<view v-if="titleShow" class="name line1">{{ item.store_name }}</view>
										<view :style="'color:'+themeColor" class="price">
											<text v-if="barginShow" class="assist_price">助力价</text>
											<text v-if="priceShow" class="line1 price_num">￥{{ item.assistSku[0].assist_price }}</text>

										</view>
									</view>
									<button v-if="bntShow" class="initiate_btn" :class="'initiate_btn'+styleType" :style="{background: `linear-gradient(180deg,${bgColor[0].item} 0%,${bgColor[1].item} 100%)`}">发起助力</button>
								</view>
							</view>
						</scroll-view>
						<block v-else class="acea-row row-between-wrapper combination">
							<view
								class="combination-item"
								v-for="(item, index) in assistList"
								:key="index"
								:style="{ 'background-image': `url(${domain}/static/images/combination${index+1}.png)`,'border-radius':`${conStyle}rpx`}"
								@click="handleAssist(item.product_assist_id)">
								<view class="info">
									<view class="price-box combination-price">
										<view v-if="titleShow" class="name line1">{{ item.product.store_name }}</view>
										<text :style="'color:'+themeColor" v-if="priceShow" class="price">
											<text>￥</text>
											{{ item.product.price }}
										</text>
										<text v-if="bntShow" class="gocom_btn" :style="{background: `linear-gradient(180deg,${bgColor[0].item} 0%,${bgColor[1].item} 100%)`}">
											去助力
											<text class="iconfont icon-jiantou"></text>
										</text>
									</view>
								</view>
								<view class="img-box">
									<easy-loadimage mode="widthFix" :image-src="item.product.image"></easy-loadimage>
								</view>
							</view>
							<view v-if="assistList.length == 1"
								class="combination-item"
								:style="{ 'background-image': `url(${domain}/static/images/combination2.png)`,'border-radius':`${conStyle}rpx`}"
								@click="handleAssist(assistList[0].product_assist_id)">
								<view class="info">
									<view class="price-box combination-price">
										<view v-if="titleShow" class="name line1">{{ assistList[0].product.store_name }}</view>
										<text :style="'color:'+themeColor" v-if="priceShow" class="price">
											<text>￥</text>
											{{ assistList[0].product.price }}
										</text>
										<text v-if="bntShow" class="gocom_btn" :style="{background: `linear-gradient(180deg,${bgColor[0].item} 0%,${bgColor[1].item} 100%)`}">
											去助力
											<text class="iconfont icon-jiantou"></text>
										</text>
									</view>
								</view>
								<view class="img-box">
									<easy-loadimage mode="widthFix" :image-src="assistList[0].product.image"></easy-loadimage>
								</view>
							</view>
							<view v-if="assistList.length == 1"
								class="combination-item"
								:style="{ 'background-image': `url(${domain}/static/images/combination3.png)`,'border-radius':`${conStyle}rpx`}"
								@click="handleAssist(assistList[0].product_assist_id)">
								<view class="info">
									<view class="price-box combination-price">
										<view v-if="titleShow" class="name line1">{{ assistList[0].product.store_name }}</view>
										<text :style="'color:'+themeColor" v-if="priceShow" class="price">
											<text>￥</text>
											{{ assistList[0].product.price }}
										</text>
										<text v-if="bntShow" class="gocom_btn" :style="{background: `linear-gradient(180deg,${bgColor[0].item} 0%,${bgColor[1].item} 100%)`}">
											去助力
											<text class="iconfont icon-jiantou"></text>
										</text>
									</view>
								</view>
								<view class="img-box">
									<easy-loadimage mode="widthFix" :image-src="assistList[0].product.image"></easy-loadimage>
								</view>
							</view>
							<view v-if="assistList.length == 2"
							class="combination-item"
							:style="{ 'background-image': `url(${domain}/static/images/combination3.png)`,'border-radius':`${conStyle}rpx`}"
							@click="handleAssist(assistList[1].product_assist_id)">
								<view class="info">
									<view class="price-box combination-price">
										<view v-if="titleShow" class="name line1">{{ assistList[1].product.store_name }}</view>
										<text :style="'color:'+themeColor" v-if="priceShow" class="price">
											<text>￥</text>
											{{ assistList[1].product.price }}
										</text>
										<text v-if="bntShow" class="gocom_btn" :style="{background: `linear-gradient(180deg,${bgColor[0].item} 0%,${bgColor[1].item} 100%)`}">
											去助力
											<text class="iconfont icon-jiantou"></text>
										</text>
									</view>
								</view>
								<view class="img-box">
									<easy-loadimage mode="widthFix" :image-src="assistList[1].product.image"></easy-loadimage>
								</view>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
	<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse" :isGoIndex="false"></authorize>
	</view>
</template>
<script>
	import { HTTP_REQUEST_URL } from '@/config/app';
	import { mapGetters } from 'vuex';
	import { getAssistList, assistUserData, initiateAssistApi } from '@/api/activity.js';
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';
  import authorize from '@/components/Authorize';
	export default {
		computed: mapGetters(['isLogin', 'uid']),
		name: 'bargain',
		components:{
			easyLoadimage,
			authorize
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
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				assistList: [], //助力
				assistUserList: [], //已助力数据
				assistUserCount: '',
				mbConfig: this.dataConfig.mbCongfig.val*2,
				styleType: this.dataConfig.tabConfig.tabVal, //单行，多行，板块
				bgStyle: this.dataConfig.bgStyle.type ? 20 : 0,
				conStyle: this.dataConfig.conStyle.type ? 16 : 0,
				bgColor: this.dataConfig.bgColor.color,
				themeColor: this.dataConfig.priceColor && this.dataConfig.priceColor.color[0].item,
				priceShow: this.dataConfig.priceShow.val,
				bntShow: this.dataConfig.bntShow.val,
				titleShow: this.dataConfig.titleShow.val,
				barginShow: this.dataConfig.barginShow.val, //助力标签
				joinShow: this.dataConfig.joinShow.val, //参与标签
				domain: HTTP_REQUEST_URL,
			};
		},
		created() {},
		mounted() {
			this.getAssistUserCount();
			this.getAssistProduct();
		},
		methods: {
			// 助力
			getAssistProduct() {
				let that = this;
				getAssistList({
					mer_id: that.merId,limit: that.styleType == 2 ? 3 : 12
				}).then(res => {
					that.assistList = res.data.list;
				}).catch(e => {});
			},
			// 获取已助力成功数据
			getAssistUserCount() {
				let that = this;
				assistUserData()
					.then(res => {
						that.assistUserCount = res.data.count;
						that.assistUserList = res.data.list;
					})
					.catch(e => {});
			},
			handleAssist(id) {
				if (this.isLogin) {
					initiateAssistApi(id)
						.then(res => {
							let id = res.data.product_assist_set_id;
							uni.hideLoading();
							uni.navigateTo({
								url: '/pages/activity/assist_detail/index?id=' + id
							});
						})
						.catch(err => {
							uni.showToast({
								title: err,
								icon: 'none'
							});
						});
				} else {
					this.isAuto = true;
					this.isShowAuth = true
				}
			},
			// 微信登录回调
			onLoadFun: function(e) {
				this.isShowAuth = false;
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e;
			},
		}
	}
</script>

<style lang="scss">
	@import '../style/main.scss';
	.assist-count {
		background-color: #fff;
		margin: 0 20rpx;
		border-radius: 16rpx;
		padding: 20rpx 0 0 20rpx;
		box-shadow: 4rpx 2rpx 12rpx 2rpx rgba(0, 0, 0, 0.03);
		&.wrapper-count2{
			padding: 20rpx;
		}
	}
	.activity_pic {
		margin-left: 20rpx;
		padding-left: 20rpx;
		position: relative;
		&::before {
			content: '';
			display: inline-block;
			width: 2rpx;
			height: 40rpx;
			background: #dcdcdc;
			position: absolute;
			top: 0;
			left: 0;
		}
		.picture {
			display: inline-block;
		}
		.avatar {
			width: 42rpx;
			height: 42rpx;
			line-height: 20rem;
			display: inline-block;
			background-repeat: no-repeat;
			background-size: center/cover;
			position: relative;
			text-align: center;
			color: #fff;
			font-weight: 600;
			vertical-align: bottom;
			font-size: 0.875rem;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			border-radius: 50%;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: 0 0;
			margin-right: -10rpx;
			box-shadow: 0 0 0 1px #fff;
		}
		.pic_count {
			margin-left: 30rpx;
			color: #999999;
			font-size: 26rpx;
			position: relative;
			top: -4rpx;
		}
	}
	.price_num{
		display: inline-block;
		max-width: 100rpx;
		overflow: hidden;
		line-height: 32rpx;
	}
</style>
