<template>
	<view class="user-setting">
		<view class="list">
			<view class='item acea-row row-between-wrapper' @click="gouser">
				<view>个人信息</view>
				<text class='iconfont icon-you'></text>
			</view>
		</view>
		<view class="list other">
			<view class='item acea-row row-between-wrapper' @click="goMultiple('sys_about_us')">
				<view>关于我们</view>
				<text class='iconfont icon-you'></text>
			</view>
			<view class='item acea-row row-between-wrapper' @click="goMultiple('sys_certificate')">
				<view>资质证明</view>
				<text class='iconfont icon-you'></text>
			</view>
			<view class='item acea-row row-between-wrapper' @click="gorules">
				<view>协议规则</view>
				<text class='iconfont icon-you'></text>
			</view>
			<!-- #ifdef MP -->
			<view class='item acea-row row-between-wrapper' @click="Setting">
				<view>隐私设置</view>
				<text class='iconfont icon-you'></text>
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default{
		name:'user-setting',
		data(){
			return{
				
			}
		},
		methods:{
			/**
			 * 小程序设置
			 */
			Setting: function() {
				uni.openSetting({
					success: function(res) {}
				});
			},
			//个人信息
			gouser(){
				uni.navigateTo({
					url: '/pages/users/user_info/index'
				})
			},
			//关于我们  资质证明  
			goMultiple(e){
				uni.navigateTo({
					url: '/pages/users/user_about/index?from='+e
				})
			},
			gorules(){
				uni.navigateTo({
					url: '/pages/users/agreement_rules/index'
				})
			}
		}
	} 
</script>

<style scoped lang="scss">
	.user-setting {
		margin-top: 2rpx;
		.other {
			margin-top: 15rpx;
		}

		.list {
			background-color: #fff;

			.item {
				padding: 30rpx 30rpx 30rpx 0;
				border-bottom: 1px solid #f2f2f2;
				margin-left: 30rpx;
				font-size: 32rpx;
				color: #242424;

				.iconfont {
					font-size: 30rpx;
					color: #8A8A8A;
				}
			}
		}
	}
</style>
