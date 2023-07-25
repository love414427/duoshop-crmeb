<template>
	<view class="title_search">
		<span class="iconfont">&#xe67d;</span>
		<form @submit="search" report-submit="true">
			<input type="text" :name="keyword" v-model="keyword" :placeholder="holder" confirm-type='search'/>
		</form>		
	</view>
</template>

<script>
	export default {
		props:{
			holder: {
				type: String,
				default: '请输入商品名称'
			}
		},
		data() {
			return {
				keyword: ''
			};
		},
		methods: {
			search(){
				this.$emit('getList', this.keyword);
			}
		}
	}
</script>

<style lang="scss" scoped>
.title_search {
	background: #f5f5f5;
	border-radius: 30rpx;
	height: 60rpx;
	padding-left: 60rpx;
	position: relative;
	.iconfont {
		position: absolute;
		top: 50%;
		margin-top: -14rpx;
		left: 30rpx;
		font-size: 28rpx;
	}
	input {
		height: 60rpx;
		font-size: 26rpx;
		margin-left: 20rpx;
	}
}
</style>
