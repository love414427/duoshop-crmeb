<template>
	<view class="agreement-rules">	
		<view class="list">
			<view class='item acea-row row-between-wrapper' v-for="(item,index) in listDta" @click="goMultiple(item.key)">
				<view>{{item.label}}</view>
				<text class='iconfont icon-you'></text>
			</view>
		</view>
	</view>
</template>

<script>
	import {cacheLst} from '@/api/user.js';
	export default{
		name:'agreement-rules',
		data(){
			return{
				listDta:''
			}
		},
		onLoad: function() {
			this.getInfo()
		},
		methods:{
			getInfo(){
				cacheLst().then(res=>{
					this.listDta = res.data
				})
			}, 
			goMultiple(e){
				uni.navigateTo({
					url: '/pages/users/user_about/index?from='+e
				})
			}
		}
	} 
</script>

<style scoped lang="scss">
	.agreement-rules {
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
