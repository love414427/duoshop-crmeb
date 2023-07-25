<template>
	<view style="touch-action: none;" :style="viewColor">
		<view class="home" style="position:fixed;" :style="{ top: top + 'px', bottom: bottom }" id="right-nav" @touchmove.stop.prevent="setTouchMove">
			<view class="homeCon" :class="homeActive === true ? 'on' : ''" v-if="homeActive">
				<navigator hover-class='none' url='/pages/index/index' open-type='switchTab' class='iconfont icon-shouye-xianxing'></navigator>
				<navigator hover-class='none' url='/pages/order_addcart/order_addcart' open-type='switchTab' class='iconfont icon-caigou-xianxing'></navigator>
				<navigator hover-class='none' url='/pages/user/index' open-type='switchTab' class='iconfont icon-yonghu1'></navigator>
			</view>
			<view @click="open" class="pictrueBox">
				<view class="pictrue">
					<image :src="homeActive === true ? '/static/images/navbtn_open.gif' : '/static/images/navbtn_close.gif'"
					 class="image pictruea" />
				</view>
			</view>
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
	export default {
		name: "Home",
		props: {},
		data: function() {
			return {
				domain: HTTP_REQUEST_URL,
				top: "",
				bottom: ""
			};
		},
		computed: mapGetters(["homeActive","viewColor","keyColor"]),
		methods: {
			setTouchMove(e) {
				var that = this;
				if (e.touches[0].clientY < 545 && e.touches[0].clientY > 66) {
					that.top = e.touches[0].clientY
					that.bottom = "auto";
				}
			},
			open: function() {
				this.homeActive ? this.$store.commit("CLOSE_HOME") : this.$store.commit("OPEN_HOME");
			}
		},
		created() {
			this.bottom = "50px";
		}
	};
</script>

<style scoped>
	.pictrueBox {
		width: 130rpx;
		height: 120rpx;
	}
	/*返回主页按钮*/
	.home {
		position: fixed;
		color: white;
		text-align: center;
		z-index: 9999;
		right: 15rpx;
		display: flex;
	}
	.home .homeCon {
		border-radius: 50rpx;
		opacity: 0;
		height: 0;
		color: #e93323;
		width: 0;
	}
	.home .homeCon.on {
		opacity: 1;
		animation: bounceInRight 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000);
		width: 300rpx;
		height: 86rpx;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--view-theme);
	}
	.home .homeCon .iconfont {
		font-size: 48rpx;
		color: #fff;
		display: inline-block;
		margin: 0 auto;
	}
	.home .pictrue {
		width: 86rpx;
		height: 86rpx;
		border-radius: 50%;
		margin: 0 auto;
		background-color: var(--view-theme);
		box-shadow: 0 5rpx 12rpx rgba(0, 0, 0, 0.5);
	}
	.home .pictrue .image {
		width: 100%;
		height: 100%;
	}	
	.pictruea{
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
		vertical-align: middle;	
	}
</style>
