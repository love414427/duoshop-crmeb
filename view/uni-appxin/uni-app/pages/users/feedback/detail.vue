<template>
	<view class="feedback-detail" :style="viewColor">
		<view class="hd">
			<view class="item">
				<view class="label">反馈类型</view>
				<view class="txt">{{detail.category}}</view>
			</view>
			<view class="item">
				<view class="label">问题分类</view>
				<view class="txt">{{detail.type}}</view>
			</view>
			<view class="item">
				<view class="label">姓名</view>
				<view class="txt">{{detail.realname}}</view>
			</view>
			<view class="item">
				<view class="label">电话/邮箱</view>
				<view class="txt">{{detail.contact}}</view>
			</view>
			<view class="item" v-if="detail.reply">
				<view class="label">回复状态</view>
				<view class="txt color">已回复</view>
			</view>
		</view>
		<view class="content">
			<view class="con">{{detail.content}}</view>
			<view class="img-box" v-if="detail">
				<image class="img-list" v-for="(item,index) in detail.images" :key="index" :src="item" @click="clickImg(item)" mode="scaleToFill"></image>
			</view>
		</view>
		<view class="content" v-if="detail.reply">
			<view class="reply">
				<view class="reply-left">
					<image :src="`${domain}/static/images/gly.png`" mode=""></image>
				</view>
				<view class="reply-right">
					<view class="clearfix reply-right-top">
						<view class="pull-left">管理员</view>
						<view class="pull-right">{{detail.update_time}}</view>
					</view>
					<view class="">{{detail.reply}}</view>
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
	// +----------------------------------------------------------------------i
	// | Author: CRMEB Team <admin@crmeb.com>
	// +----------------------------------------------------------------------
	import { HTTP_REQUEST_URL } from '@/config/app';
	import { feedbackDetail } from '@/api/user.js'
	import { mapGetters } from "vuex";
	export default{
		computed: mapGetters(['viewColor']),
		data(){
			return {
				con:'',
				id:'',
				detail:{},
				domain: HTTP_REQUEST_URL,
			}
		},
		onLoad(options) {
			this.id = options.id
			feedbackDetail(options.id).then(res=>{
				this.detail = res.data
			})
		},
		methods:{
			clickImg(item) {
				wx.previewImage({
					urls: this.detail.images, 
					current: item,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			}
		}
	}
</script>

<style lang="scss">
.feedback-detail{
	.hd{
		margin: 20rpx;
		padding: 30rpx;
		border-radius: 10rpx;
		background-color: #fff;
		.item{
			display: flex;
			justify-content: space-between;
			margin-bottom: 30rpx;
			font-size: 28rpx;
			color: #282828;
			&:last-child{
				margin-bottom: 0;
			}
			.txt{
				flex: 1;
				margin-left: 50rpx;
				text-align: right;
				color: #868686;
			}
			.color{
				color: var(--view-theme);
			}
		}
	}
	.content{
		position: relative;
		margin: 20rpx;
		padding: 30rpx;
		border-radius: 10rpx;
		line-height: 1.5;
		background-color: #fff;
	}
	.img-box{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.img-list{
			border-radius: 10rpx;
			margin-top: 20rpx;
			width: 210rpx;
			height: 210rpx;
		}
	}
	.reply{
		display: flex;
		.reply-left{
			width: 70rpx;
			uni-image, image{
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
			}
		}
		.reply-right{
			width: calc( 100% - 70rpx );
			color: #282828;
			.reply-right-top{
				color: #999999;
				margin-bottom: 14rpx;
			}
		}
	}
}	
</style>
