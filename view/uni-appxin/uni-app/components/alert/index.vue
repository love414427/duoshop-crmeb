<template>
	<view class="alert-wrapper" :style="viewColor">
		<view class="alert-box">
			<image :src="domain+'/static/diy/success'+keyColor+'.png'" mode=""></image>
			<view class="txt">{{msg}}</view>
			<view class="btn" @click="close">鎴戠煡閬撲簡</view>
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
	import { mapGetters } from "vuex";
	import { HTTP_REQUEST_URL } from '@/config/app';
	export default{
		data() {
			return {
				domain: HTTP_REQUEST_URL,
			}
		},
		props:{
			msg:{
				type:String,
				default:''
			},
		},
		computed: mapGetters(['viewColor','keyColor']),
		methods:{
			close(){
				this.$emit('bindClose');
			}
		}
	}
</script>

<style lang="scss">
.alert-wrapper{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.5);
	z-index: 10;
	.alert-box{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 500rpx;
		height: 540rpx;
		background-color: #fff;
		border-radius: 10rpx;
		font-size: 34rpx;
		image{
			width: 149rpx;
			height: 230rpx;
		}
		.txt{
			margin-bottom: 20rpx;
		}
		.btn{
			width:340rpx;
			height:90rpx;
			line-height: 90rpx;
			text-align: center;
			background-image:linear-gradient(-90deg,var(--view-bntColor21) 0%,var(--view-bntColor22) 100%);
			border-radius:45rpx;
			color: #fff;
		}
	}
}
</style>
