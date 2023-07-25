<template>
	<view :style="viewColor">
		<view class='copy-list-window' :class='isCopy==true?"on":""'>
			<button class="iconfont icon-guanbi" @click='close'></button>
			<view class="title">
				<text class="iconfont icon-xuanzhong11"></text>
				{{title}}
			</view>
			<view class="copy-url">
				<!-- #ifdef H5 -->
				<text class="copy copy-data" :data-clipboard-text="copyUrl">{{copyUrl}}</text>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<text>{{copyUrl}}</text>
				<!-- #endif -->
			</view>
			<!-- #ifdef H5 -->
			<button class="button copy-data" :data-clipboard-text="copyUrl">点击复制口令</button>
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<button class="button" @click="copyText">点击复制口令</button>
			<!-- #endif -->
		</view>
		<view class='mask' catchtouchmove="true" :hidden='isCopy==false' @click='close'></view>
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
	// #ifdef H5
	import ClipboardJS from "@/plugin/clipboard/clipboard.js";
	// #endif
	import { mapGetters } from "vuex";
	export default {
		props: {
			isCopy: {
				type: Boolean,
				default: false,
			},
			copyUrl: {
				type: String,
				default: '',
			}
		},
		computed: mapGetters(['viewColor']),
		data() {
			return {
				title: '复制以下口令'
			};
		},
		mounted(){
			let that = this
			// #ifdef H5
			that.$nextTick(function() {
				var clipboard = new ClipboardJS('.copy-data');
				clipboard.on('success', function(e) {
					that.$util.Tips({
						title:'复制成功'
					})
					setTimeout(()=>{
						that.$emit('close');
					},500)
				});
				clipboard.on('error', function(e) {
					that.$util.Tips({
						title:'复制失败'
					})
				});
			});
			// #endif
		},
		methods: {
			//#ifndef H5
			copyText:function(){
				let that = this;
				uni.setClipboardData({ data: this.copyUrl });
				setTimeout(()=>{
					that.$emit('close');
				},500)			 
			},
			// #endif
			close: function(){
			  this.$emit('close');
			}
		}
	}
</script>

<style scoped lang="scss">
	.copy-list-window {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		border-radius: 16rpx 16rpx 0 0;
		z-index: 555;
		transform: translate3d(0, 100%, 0);
		transition: all .1s cubic-bezier(.25, .5, .5, .9);
		padding: 50rpx 30rpx 30rpx;
		.icon-guanbi{
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			color: #8A8A8A;
		}
		.button{
			height: 76rpx;
			border-radius: 38rpx;
			margin: 30rpx 30rpx 0;
			background-color: var(--view-theme);
			font-size: 30rpx;
			line-height: 76rpx;
			color: #FFFFFF;
		}	
	}
	.copy-list-window.on {
		transform: translate3d(0, 0, 0);
	}
	.copy-list-window .title {
		width: 100%;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		font-family: 'PingFang SC';
		.iconfont {
			font-size: 30rpx;
			color: #FBB324;
			margin-right: 12rpx;
		}
	}
	.copy-url{
		margin-top: 30rpx;
		background: #F5F5F5;
		padding: 20rpx 25rpx;
		color: #BBBBBB;
		font-size: 28rpx;
	}
</style>
