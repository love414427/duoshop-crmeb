<template>
	<view class="lottie-bg">
		<view id="lottie">
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
	import dayjs from "@/plugin/dayjs/dayjs.min.js";
	import wechat from "@/libs/wechat";
	import {
		getUserInfo
	} from "@/api/user";
	export default {
		name: "Auth",
		mounted() {

		},
		onLoad(option) {
			let that = this
			const {
				code,
				state
			} = option;
			wechat.auth(code, state)
				.then(() => {
					console.log(decodeURIComponent(decodeURIComponent(option.back_url)),'back_url')
					const href = decodeURIComponent(decodeURIComponent(option.back_url))
					location.replace(href)
				})
				.catch((err) => {
					location.replace("/");
				});
		}
	};
</script>

<style scoped lang="scss">
	.lottie-bg {
		position: fixed;
		left: 0;
		top: 0;
		background-color: #fff;
		width: 100%;
		height: 100%;
		z-index: 999;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	#lottie {
		display: block;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		transform: translate3d(0, 0, 0);
		margin: auto;

		image {
			width: 200rpx;
			height: 200rpx;
		}
	}
</style>