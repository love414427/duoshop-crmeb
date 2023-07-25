<template>
	<!-- 客服跳转 -->
	<!-- #ifdef APP-PLUS || H5 -->
	<view class="acea-row row-center-wrapper cartf iconfont icon-kefu3" :style="{ top: top + 'px'}" @touchmove.stop.prevent="setTouchMove" @click="licks"></view>
	<!-- #endif -->
	<!-- #ifdef MP -->
	<view v-if="routineContact == 0">
		<view class="acea-row row-center-wrapper cartf iconfont icon-kefu3" :style="{ top: top + 'px'}" @touchmove.stop.prevent="setTouchMove" @click="licks"></view>
	</view>
	<button class="acea-row row-center-wrapper cartf iconfont icon-kefu3" open-type='contact' :style="{ top: top + 'px'}" @touchmove.stop.prevent="setTouchMove" v-else-if="routineContact==1 && !goodsCon"></button>
	<button class="acea-row row-center-wrapper cartf iconfont icon-kefu3" open-type='contact' :send-message-title="storeInfo.store_name" :send-message-img="storeInfo.image" :send-message-path="`/pages/goods_details/index?id=${storeInfo.id}`" show-message-card :style="{ top: top + 'px'}" @touchmove.stop.prevent="setTouchMove" v-else-if="routineContact==1 && goodsCon"></button>
	<!-- #endif -->
</template>

<script>
	let app = getApp();
	import {
		mapGetters
	} from "vuex";
	export default {
		name: "kefuIcon", 
		props: {
			ids: {
				type: Number,
				default: 0
			},
			routineContact: {
				type: Number,
				default: 0
			},
			storeInfo: {
				type: Object,
				default () {
					return {};
				}
			},
			goodsCon: {
				type: Number,
				default: 0
			}
		},
		computed: mapGetters(['userInfo']),
		data: function() {
			return {
				top: "480"
			};
		},
		mounted() {
			// #ifdef H5
			this.top =  parseFloat(window.innerHeight) -200
			// #endif
		},
		methods: {
			setTouchMove(e) {
				let that = this;
				if (e.touches[0].clientY < 480 && e.touches[0].clientY > 66) {
					that.top = e.touches[0].clientY
				}
			},
			licks(){
				let userInfo = {}
				if(typeof this.userInfo === 'string'){
					userInfo = JSON.parse(this.userInfo)
				}else{
					userInfo = this.userInfo
				}
				let url = `/pages/extension/customer_list/chat?productId=${this.ids}`
				this.$util.getCustomer(userInfo,url)
			}
		},
		created() {
		}
	};
</script>

<style lang="scss">
	.cartf{
		width: 96rpx;
		height: 96rpx;
		background: #FFFFFF;
		box-shadow: 0 3rpx 16rpx rgba(0, 0, 0, 0.08);
		border-radius: 50%;
		font-size: 47rpx;
		color: #666;
		position: fixed;
		right: 15rpx;
		z-index: 9;
	}
</style>
