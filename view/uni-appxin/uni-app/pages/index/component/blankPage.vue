<template>
	<view class="blankPage" :style="'height:'+ heightConfig +'rpx;'" v-if="heightConfig>0">
		<view class="bankCon" :style="'background-color:'+ bgColor +';height:'+ heightConfig +'rpx;'"></view>
	</view>
</template>
<script>
	export default {
		name: 'blankPage',
		props: {
			dataConfig: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				bgColor:this.dataConfig.bgColor.color[0].item,
				heightConfig:this.dataConfig.heightConfig.val
			};
		},
		created() {},
		methods: {
			
		}
	}
</script>
<style lang="scss">
	.blankPage{
		.bankCon{
			width: 100%;
		}
	} 
</style>
