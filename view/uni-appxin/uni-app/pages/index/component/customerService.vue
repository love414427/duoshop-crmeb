<template>
	<view style="touch-action: none;" v-if="is_open_service != '0' || merId != '0'">
		<view class="customerService" @touchmove.stop.prevent="setTouchMove" :style="{top:topConfig}">
			<navigator class="pictrue" :url="'/pages/chat/customer_list/chat?mer_id='+merId" hover-class="none">
				<image :src="logoConfig"></image>
			</navigator>
		</view>
	</view>
</template>
<script>
import { configMap } from '@/utils/index';
	export default {
		name: 'customerService',
		props: {
			dataConfig: {
				type: Object,
				default: () => {}
			},
			merId: {
				type: [String, Number],
				default: '0'
			}
		},
		computed: configMap({ is_open_service:0 }),
		data() {
			return {
				logoConfig: this.dataConfig.logoConfig.url,
				topConfig: (this.dataConfig.topConfig.val || 75)+'%'
			};
		},
		created() {},
		methods: {
			setTouchMove(e) {
				var that = this;
				if (e.touches[0].clientY < 545 && e.touches[0].clientY > 66) {
					that.topConfig = e.touches[0].clientY+'px'
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.customerService {
		position: fixed;
		right: 20rpx;
		z-index: 999;
		/* #ifdef MP || APP-PLUS */
		top: 160rpx;
		right: 0;
		/* #endif */
		.pictrue {
			width: 86rpx;
			height: 86rpx;
			border-radius: 50%;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
