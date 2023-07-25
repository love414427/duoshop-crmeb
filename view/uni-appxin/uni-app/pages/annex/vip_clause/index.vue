<template>
	<view class="cont">
		<!-- <view v-html="agreement"></view> -->
		<jyf-parser :html="agreement" ref="article" :tag-style="tagStyle"></jyf-parser>
	</view>
</template>

<script>
	import {
		getAgreementApi
	} from '@/api/user.js';
	import parser from "@/components/jyf-parser/jyf-parser";
	export default {
		components: {
			"jyf-parser": parser,
		},
		data() {
			return {
				agreement: '',
				tagStyle: {
					img: 'width:100%;display:block;'
				},
			}
		},
		onLoad() {
			this.memberCard();
		},
		methods: {
			memberCard() {
				uni.showLoading({
					title: '加载中'
				});
				let that = this
				getAgreementApi('sys_svip').then(res => {
					that.agreement = res.data.sys_svip
					uni.hideLoading();
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}
</style>

<style scoped>
	.title {
		padding-top: 60rpx;
		font-size: 30rpx;
		text-align: center;
	}
	.cont {
		padding: 50rpx 30rpx;
	}
	/deep/img{
		max-width: 100%!important;
	}
</style>
