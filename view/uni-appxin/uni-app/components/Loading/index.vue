<template>
	<view>
		<view class="Loads acea-row row-center-wrapper" v-if="loading && !loaded" style="margin-top: .2rem;">
			<view v-if="loading">
				<view class="iconfont icon-jiazai loading acea-row row-center-wrapper"></view>
				正在加载中
			</view>
			<view v-else>
				上拉加载更多
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
	export default {
		name: "Loading",
		props: {
			loaded: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			}
		}
	};
</script>
<style>
	.Loads {
	  height: 80upx;
	  font-size: 25upx;
	  color: #000;
	}
	.Loads .iconfont {
	  font-size: 30upx;
	  margin-right: 10upx;
	  height: 32upx;
	  line-height: 32upx;
	}
	/*加载动画*/
	@keyframes load {
	  from {
	    transform: rotate(0deg);
	  }
	  to {
	    transform: rotate(360deg);
	  }
	}
	.loadingpic {
	  animation: load 3s linear 1s infinite;
	}
	.loading {
	  animation: load linear 1s infinite;
	}
</style>