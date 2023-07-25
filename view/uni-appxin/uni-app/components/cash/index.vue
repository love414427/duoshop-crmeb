<template>
	<view :style="viewColor">
		<view class="payment" :class="pay_close ? 'on' : ''">
			<view class="title acea-row row-center-wrapper">
				选择提现方式<text class="iconfont icon-guanbi" @click='close'></text>
			</view>
			<radio-group @change="radioChange">
				<label class="item acea-row row-between-wrapper" v-for="(item,index) in payMode" :key="index">
					<view class="acea-row-left">
						<view class="icon-left" :style="[{backgroundColor: item.bg_color}]">
							<view class="iconfont" :class="item.icon"></view>
						</view>
						<view class="name">{{item.name}}</view>
					</view>
					<view>
						<radio :value="item.id.toString()" :checked="item.id == order_id" />
					</view>
				</label>
			</radio-group>
		</view>
		<view class="mask" ref="close" @click='close' v-if="pay_close"></view>
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
	import { orderPay, presellOrderPay } from '@/api/order.js';
	import { mapGetters } from "vuex";
	export default {
		props: {
			payMode: {
				type: Array,
				default: function() {
					return [];
				}
			},
			pay_close: {
				type: Boolean,
				default: false,
			},
			order_id: {
				type: String,
				default: '0'
			}
		},
		computed: mapGetters(['viewColor']),
		data() {
			return {
				type: '0'
			};
		},
		methods: {
			close: function() {
				this.$emit('payClose')
			},
			radioChange(e) {
				this.type = e.detail.value
				this.$emit('onChangeFun', {
					action: 'payClose',
					type: this.type
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.payment {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		border-radius: 16rpx 16rpx 0 0;
		background-color: #fff;
		padding-bottom: 60rpx;
		z-index: 99;
		transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		transform: translate3d(0, 100%, 0);
	}
	.payment.on {
		transform: translate3d(0, 0, 0);
	}
	/deep/radio .uni-radio-input.uni-radio-input-checked {
	  border: 1px solid var(--view-theme) !important;
	  background-color: var(--view-theme) !important
	}
	.payment .title {
		text-align: center;
		height: 123rpx;
		font-size: 32rpx;
		color: #282828;
		font-weight: bold;
		padding-right: 30rpx;
		margin-left: 30rpx;
		position: relative;
		border-bottom: 1px solid #eee;
	}
	.payment .title .iconfont {
		position: absolute;
		right: 30rpx;
		top: 50%;
		transform: translateY(-50%);
		font-size: 43rpx;
		color: #8a8a8a;
		font-weight: normal;
	}
	.payment .item {
		border-bottom: 1px solid #eee;
		height: 130rpx;
		margin-left: 30rpx;
		padding-right: 30rpx;
	}	
	.payment .item .acea-row-left{
		 .icon-left{
			display: inline-block;
			width: 56rpx;
			height: 56rpx;
			text-align: center;
			line-height: 56rpx;
			background-color: #FE960F;
			margin-right: 20rpx;
			border-radius: 50%;
			.iconfont{
				color: #FFF;
				font-size: 36rpx;
			}
		}
		.name{
			display: inline-block;
		}
	}
</style>
