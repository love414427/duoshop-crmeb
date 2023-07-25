<template>
	<view class="refund-select" :style="viewColor">
		<view class="select-item" @click="goPage(1)">
			<view class="left">
				<image :src="domain+'/static/diy/select01'+keyColor+'.png'" mode=""></image>
			</view>
			<view class="right-wrapper">
				<view class="title">我要退款(无需退货)</view>
				<view class="txt">未收到货，或与卖家协商同意不退货只退款</view>
			</view>
			<view class="iconfont icon-xiangyou"></view>
		</view>
		<view class="select-item" @click="goPage(2)">
			<view class="left">
				<image :src="domain+'/static/diy/select02'+keyColor+'.png'" mode=""></image>
			</view>
			<view class="right-wrapper">
				<view class="title">{{order_type != 2 ? '我要退货退款' : '我要退款'}}</view>
				<view class="txt" v-if="order_type != 2">已收到货，需要退还收到的货物</view>
			</view>
			<view class="iconfont icon-xiangyou"></view>
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
	import { HTTP_REQUEST_URL } from '@/config/app';
	export default{
		computed: mapGetters(['viewColor', 'keyColor']),
		data(){
			return {
				domain: HTTP_REQUEST_URL,
				order_id:'',
				type:0,
				ids:'',
				order_type: 0
			}
		},
		onLoad(options) {
			this.order_id = options.order_id
			this.type = options.type
			this.ids = options.ids || ''
			this.order_type = options.order_type
		},
		methods:{
			goPage(type){
				if(this.type ==1 && this.ids){
					uni.redirectTo({
						url:`/pages/users/refund/confirm?ids=${this.ids}&refund_type=${type}&type=${this.type}&order_id=${this.order_id}`
					})
				}else{
					uni.redirectTo({
						url:`/pages/users/refund/index?order_id=${this.order_id}&refund_type=${type}&type=${this.type}`
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
.refund-select{
	.select-item{
		position: relative;
		display: flex;
		align-items: center;
		padding: 25rpx 0;
		background-color: #fff;
		border-bottom: 1px solid #f0f0f0;
	}
	.left{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 105rpx;
		image{
			width:50rpx;
			height: 46rpx;
		}
	}
	.right-wrapper{
		position: relative;
		.title{
			font-size: 26rpx;
			color: #282828;
		}
		.txt{
			margin-top: 10rpx;
			color: #999999;
			font-size: 22rpx;
		}
	}
	.icon-xiangyou{
		position: absolute;
		right: 30rpx;
		top: 50%;
		transform: translateY(-50%);
		color: #AAAAAA;
		font-size: 30rpx;
	}
}
</style>
