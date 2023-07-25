<template>
	<view :style="viewColor" class="page-container">
		<view class='flash-sale'>
			<view class='header'>
				<image mode="widthFix" class="presellBg" :src="`${domain}/static/images/topic_bg.jpg`" alt="">	
			</view>
			<view class="main_count">	
				<block v-if="topicList.length>0">
					<navigator v-for="(item,index) in topicList" :key='index' :url="`/pages/activity/topic_detail/index?id=${item.group_data_id}`" hover-class="none">
						<view class='list'>
							<image :src="item.pic" class="picture"></image>
						</view>
					</navigator>
				</block>				
				<block v-else>
					<view class='empty-box' v-cloak>
						<image src='../../store/static/images/no-topic.png'></image>
						<view class="txt">暂无活动专场哦~</view>
					</view>
				</block>
			</view>
		</view>		
		<home></home>
		<!-- #ifndef H5 -->
		<passwordPopup></passwordPopup>
		<!-- #endif -->
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
	import { getTopicList } from '../../../api/activity.js';
	import home from '@/components/home/index.vue'
	import emptyPage from '@/components/emptyPage.vue'
	import { mapGetters } from "vuex";
	import { HTTP_REQUEST_URL } from '@/config/app';
	// #ifndef H5
	import passwordPopup from '@/components/passwordPopup';
	// #endif
	export default {
		components: {
			// #ifndef H5
			passwordPopup,
			// #endif
			home,
			emptyPage
		},
		computed: mapGetters(['viewColor']),
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				topicList: [],				
				page: 1,
				limit: 30,
				loading: false,
				loadend: false,
				pageloading: false,
			}
		},
		
		onLoad() {
			this.getTopicList();
		},
		methods: {			
			getTopicList: function() {
				var that = this;
				var data = {
					page: that.page,
					limit: that.limit,
				};
				if (that.loadend) return;
				if (that.pageloading) return;
				this.pageloading = true
				getTopicList(0,data).then(res => {
					var topicList = res.data;
					var loadend = topicList.length < that.limit;
					that.page++;
					that.topicList = that.topicList.concat(topicList),
						that.page = that.page;
					that.pageloading = false;
					that.loadend = loadend;
				}).catch(err => {
					that.pageloading = false
				});
			}
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getTopicList();
		}
	}
</script>

<style lang="scss" scoped>
	.page-container{
		min-height: 100vh;
		background-color: #ff5348;
	}
	.flash-sale{
		.header{
			width: 100%;
			position: relative;
			.presellBg{
				width: 750rpx;
			}
		}
		.main_count{
			position: relative;
			top: -90rpx;
			background-color: #fff;
			margin: 0 20rpx;
			border-radius: 16rpx;
			padding: 20rpx;
			.list{
				width: 100%;
				height: 280rpx;
				margin-bottom: 30rpx;
				position: relative;
				.picture{
					width: 100%;
					height: 280rpx;
					border-radius: 16rpx;
				}
			}
		}
		.empty-box{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 80rpx 0 120rpx 0;
			image{
				width: 414rpx;
				height: 240rpx;
			}
			.txt{
				font-size: 26rpx;
				color: #999;
			}
		}
	}

</style>
