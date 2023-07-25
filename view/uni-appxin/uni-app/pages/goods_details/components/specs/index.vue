<template>
	<!-- 产品参数 -->
	<view>
		<view class="specs" :class="specsInfo.show === true ? 'on' : ''">
			<view class="title">商品参数<text class="iconfont icon-guanbi5" @click="closeSpecs"></text></view>
			<view class="list">
				<view class="item acea-row" v-for="(item,index) in specsInfo.params" :key="index">
					<view class="name">{{item.name}}</view>
					<view class="val">{{item.value}}</view>
				</view>
			</view>
			<view class="bnt" @click="closeSpecs">完成</view>
			<slot name="bottom"></slot>
		</view>
		<view class="mask" @touchmove.prevent :hidden="specsInfo.show === false" @click="closeSpecs"></view>
	</view>
</template>

<script>
	export default {
		props: {
			specsInfo: {
				type: Object,
				default: () => {}
			},
		},
		data() {
			return {};
		},
		mounted() {},
		methods: {
			closeSpecs(){
				this.$emit('myevent');
			}
		}
	}
</script>

<style scoped lang="scss">
	.specs{
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		background-color: #fff;
		z-index: 280;
		border-radius: 16rpx 16rpx 0 0;
		transform: translate3d(0, 100%, 0);
		transition: all .3s cubic-bezier(.25, .5, .5, .9);
		padding-bottom: 22rpx;
		padding-bottom: calc(22rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		padding-bottom: calc(22rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		.title{
			font-size: 32rpx;
			color: #282828;
			text-align: center;
			margin: 38rpx 0 36rpx 0;
			position: relative;
			font-weight: bold;
			.iconfont{
				position: absolute;
				right: 30rpx;
				top:0;
				font-size: 36rpx;
				font-weight: normal;
				color: #999999;
			}
		}
		.list{
			height: 750rpx;
			margin: 0 30rpx;
			color: #999999;
			overflow-x: hidden;
			overflow-y: auto;
			.item{
				padding: 30rpx 0;
				border-bottom: 1px solid #eee;
				.name{
					width: 160rpx;
					margin-right: 10rpx;
					word-break: break-all;
				}
				.val{
					width: 510rpx;
					word-break: break-all;
				}
			}
		}
		.bnt{
			width: 690rpx;
			height: 86rpx;
			text-align: center;
			line-height: 86rpx;
			border-radius: 43rpx;
			background-color: var(--view-theme);
			font-size: 30rpx;
			color: #fff;
			margin: 0 auto;
		}
	}
	.specs.on{
		transform: translate3d(0, 0, 0);
	}
</style>
