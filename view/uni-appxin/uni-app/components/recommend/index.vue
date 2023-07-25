<template>
	<view class='recommend'>
		<view class="common-hd">
			<view class="title">为你推荐</view>
		</view>
		<view class='recommendList' :class="indexP?'on':''">
			<WaterfallsFlow :wfList='hostProduct' @itemTap="goDetail" :type="0" />
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
	import {mapGetters} from "vuex";
	import { goShopDetail } from '@/libs/order.js'
	import {initiateAssistApi} from '@/api/activity.js';
	import {toLogin} from '@/libs/login.js';
	import WaterfallsFlow from '@/components/WaterfallsFlow/WaterfallsFlow.vue'
	export default {
		components:{WaterfallsFlow},
		computed: mapGetters(['uid']),
		props: {
			hostProduct: {
				type: Array,
				default: function() {
					return [];
				}
			},
			indexP:{
				type: Boolean,
				default: false
			},
			isLogin:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			};
		},
		mounted() {

		},
		onPullDownRefresh(){
			// 模拟上拉刷新
			setTimeout(()=>{
				const newList = this.hostProduct.reverse();
				this.hostProduct = newList;
				uni.stopPullDownRefresh();
			},500)
		},
		methods: {
			goDetail(item){
				goShopDetail(item, this.uid).then(res => {
				if (this.isLogin) {
						initiateAssistApi(item.activity_id).then(res => {
							let id = res.data.product_assist_set_id;
							uni.hideLoading();
							uni.navigateTo({
								url: '/pages/activity/assist_detail/index?id=' + id
							});		
						}).catch((err) => {
							uni.showToast({
								title: err,
								icon: 'none'
							})
						});
					} else {
						// #ifdef H5 || APP-PLUS
						toLogin();
						// #endif
						// #ifdef MP
						this.$emit('isShowAuth', true);
						this.$emit('isAuto', true);
						// #endif
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.common-hd {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 118rpx;
		.title {
			padding: 0 80rpx;
			font-size: 34rpx;
			color: $theme-color;
			font-weight: bold;
			background-image: url("~@/static/images/index-title.png");
			background-repeat: no-repeat;
			background-size: 100% auto;
			background-position: left center;
		}
	}
	.recommend .recommendList {
		padding: 0 20rpx;
		min-height: 100rpx;
	}
	.recommend .recommendList.on{
		padding: 0;
	}
	/deep/.looming-gray{
		border-radius: 16rpx 16rpx 0 0;
	}
</style>
