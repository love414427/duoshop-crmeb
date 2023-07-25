<template>
	<view class="tip">
		<view>
			<span class="iconfont">&#xe78b;</span>
		</view>
		<view>{{message}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			message: {
				type: String,
				default: '开启时指定区域不配送时无效'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tip {
		display: flex;
		color: #E93323;
		width: 710rpx;
		margin: auto;
		padding: 21rpx 0 28rpx 0;
		font-size: 22rpx;
		.iconfont {
			font-size: 22rpx;
			display: inline-block;
			margin-right: 10rpx;
		}
	}
</style>
