<template>
	<view class="user_store_attention">
		<block v-if="list.length >0">
			<view class="item" v-for="(item,index) in list" :key="index" @click="goHomepage(item)">
				<image :src="(item.fans && item.fans.avatar) || '/static/images/f.png'" mode=""></image>
				<view class="info">
					<view class="line1">
						<text class="name line1">{{(item.fans && item.fans.nickname) || '用户已注销'}}</text>	
					</view>
					<view v-if="item.fans && item.fans.count_fans" class="des">
						粉丝{{item.fans.count_fans<10000 ? item.fans.count_fans : (item.fans.count_fans/10000).toFixed(2)+'万'}}
					</view>
					<view v-else class="des">粉丝0</view>
					<view  @click.stop="focusToggle(item)" class="btn" :class="item.is_start ? '' : 'focusBtn'">
						<text v-if="!item.is_start" class="iconfont icon-jiahao2"></text>
						{{item.is_start ? '已关注' : '关注'}}
					</view>
				</view>
			</view>
		</block>
		<view :hidden="!loading" class="acea-row row-center-wrapper loadingicon">
			<text class="iconfont icon-jiazai loading"></text>
		</view>
		<view class="no_content" v-if="list.length == 0 && !loading">
			<view class="count">
				<image src="../static/images/no_fans.png"></image>
				<text>你还没有粉丝哦~</text>
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
	let app = getApp();
	import { myFansLst, followAuthorApi } from '@/api/community.js'
	export default{
		data(){
			return {
				list:[],
				isScroll:true,
				page:1,
				limit:20,
				loading: false,
			}
		},
		onLoad() {
			this.getList()
		},
		onReady(){},
		mounted: function() {},
		methods:{	
			getList(){
				if(!this.isScroll || this.loading) return
				this.loading = true;
				myFansLst({
					page:this.page,
					limit:this.limit
				}).then(res=>{
					this.loading = false
					this.isScroll = res.data.list.length>=this.limit
					this.list = this.list.concat(res.data.list)
					this.page+=1
				})
			},
			/*关注*/
			focusToggle(item){
				let status = item.is_start ? 0 : 1
				followAuthorApi(item.left_id,{status: status}).then(res => {
					if (res.status === 200) {
						item.is_start = item.is_start ? false : true
					}
					this.$util.Tips({
						title: res.message
					});
				});
			}
		},
		onReachBottom() {
			this.getList()
		}
	}
</script>

<style lang="scss" acoped>
.user_store_attention{
	.item{
		position: relative;
		display: flex;
		padding: 30rpx 20rpx;
		background-color: #fff;
		align-items: center;
		&::after{
			content: ' ';
			position: absolute;
			bottom: 0;
			left: 30rpx;
			right: 0;
			height: 1px;
			background: #f0f0f0;
		}
		image{
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
		}
		.info{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20rpx;
			position: relative;
			.name{
				width: 410rpx;
				font-size: 30rpx;
				color: #282828;
			}
			.des{
				color: #999999;
				font-size: 24rpx;
				margin-top: 10rpx;
			}
			.btn{
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				right: 0;
				top: 50%;
				width: 126rpx;
				height: 50rpx;
				transform: translateY(-50%);
				border:1px solid #999999;
				color: #999999;
				border-radius: 33rpx;
				font-size: 26rpx;
				&.focusBtn{
					color: #E93323;
					border-color: #E93323;
					.iconfont{
						font-size: 20rpx;
						margin-right: 10rpx;
					}
				}
			}
		}
	}
}
.no_content,.main{
	min-height: 100vh;
	background: #fff;
	position: relative;
	.count{
		position: absolute;
		text-align: center;
		width: 100%;
		top: 50%;
		margin-top: -300rpx;
		image,uni-image{
			width: 424rpx;
			height: 305rpx;
		}
		text{
			display: block;
			color: #999999;
			font-size: 26rpx;
		}
	}
}
</style>
