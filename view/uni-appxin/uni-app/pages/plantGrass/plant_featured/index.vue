<template>
	<view>
		<view class="main">
			<view class="tab-cont">
				<view v-if="featuredList.length" class="follow_count">
					<block v-for="(item, index) in featuredList" :key="index">
						<view class="list_count">
							<view v-if="item.author" class="title">
								<view class="author">
									<image class="picture" :src="item.author.avatar || '/static/images/f.png'"></image>
									<text class="name">{{item.author.nickname}}</text>
								</view>
								<view @click="followAuthor(item)">
									<view v-if="!item.relevance_id" class="follow focus">
										<text class="iconfont icon-jiahao2"></text>关注
									</view>
									<view v-else class="follow focused">已关注</view>
								</view>
							</view>
							<view class="product">
								<productConSwiper :imgUrls="item.image"></productConSwiper>
							</view>
							<view class="pro_describle">
								<view class="mentioned" v-if="item.relevance.length>0" @click="openMore(item)">
									<text class="title">查看TA提到的宝贝({{item.relevance.length}})</text>
									<view class="product_more">
										<view class="item">
											<image v-for="(itemn, indexn) in item.relevance" :key="indexn" :src="(itemn.spu&&itemn.spu.image)||itemn.image" class="more_image"></image>
										</view>
										<text class="iconfont icon-gengduo3"></text>
									</view>
								</view>
								<view class="product_info">
									<text class="text">
										{{item.content}}
									</text>
									<text class="unfold_btn">展开</text>
								</view>
								<navigator v-if="item.topic" hover-class="none" class="product_cate" :url="'/pages/plantGrass/plant_search_list/index?id='+item.topic.topic_id">
									<view>
										<text class="icon">#</text><text class="text">{{item.topic.topic_name}}</text>
									</view>
								</navigator>
								<view class="foot_bar">
									<view class="item iconfont icon-fenxiang2"></view>
									<view class="item">
										<view class="item_count" @click.stop="likeToggle(item)">
											<text class="iconfont" :class="item.relevance_id ? 'icon-shoucang1' : 'icon-dianzan'"></text>
											<text>{{item.count_start > 0 ? item.count_start : '点赞'}}</text>
										</view>

										<view class="item_count" @click="openCommon(item,index)">
											<text class="iconfont icon-pinglun"></text>
											<text>{{item.count_reply ? item.count_reply : '评论'}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
		<!-- 他提到的宝贝弹窗 -->
		<uni-popup ref="mentioned" type="bottom">
			<mentioned @close="close" :list="moreList"></mentioned>
		</uni-popup>
		<!-- 评论弹窗 -->
		<comment ref="comment" :isShow="showComment" @close="close" @successFul="commentSucces"></comment>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
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
	import WaterfallsFlow from '@/components/plantWaterfallsFlow/WaterfallsFlow.vue'
	import mentioned from '@/components/mentioned.vue';
	import comment from '@/components/comment.vue';
	import {graphicLstApi, graphicStartApi, followAuthorApi} from '@/api/community.js';
	import { getUserInfo } from '@/api/user.js';
	import { mapGetters } from "vuex";
	import authorize from '@/components/Authorize';
	import productConSwiper from '@/components/productConSwiper';
	const app = getApp();
	export default {
		components: {
			authorize,
			WaterfallsFlow,
			productConSwiper,
			mentioned,
			comment
		},
		data() {
			return {
				featuredList: [], // 商铺商品
				moreList: [],
				commList: [], //评论列表
				loading: false,
				loaded: false,
				loadTitle: '加载更多',
				isShowAuth: false, //是否隐藏授权
				isAuto: false, //没有授权的不会自动授权
				where: {
					topic_id: '',
					page: 1,
					limit: 30
				},
				showComment: false,
			}
		},
		created() {

		},
		computed: {
			...mapGetters(['isLogin']),
		},
		watch: {

		},
		onLoad: function(options) {
			this.where.topic_id = options.id
			this.getList();
		},
		onShow() {

		},
		mounted: function() {
		},
		methods: {
			// 授权回调
			onLoadFun() {
				this.isShowAuth = false
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			// 打开授权
			authOpen: function() {
				let that = this;
				if (that.isLogin === false) {
					this.isAuto = true;
					this.isShowAuth = true;
				}
			},
			// 获取关注商品
			getList: function() {
				let that = this;
				if (that.loaded || that.loading) return;
				that.loading = true;
				that.loadTitle = '';
				graphicLstApi(that.where).then(res => {
					that.loading = false;
					let list = res.data.list;
					let featuredList = that.$util.SplitArray(list, that.featuredList);
					that.loaded = list.length < that.where.limit;
					that.loadTitle = loaded ? '已全部加载' : '加载更多';
					that.$set(that, 'featuredList', featuredList);
					that.$set(that.where, 'page', that.where.page + 1);
				}).catch(err => {
					that.loading = false;
					uni.showToast({
						title: err,
						icon: 'none'
					})
				});
			},
			likeToggle(item){
				let status = item.relevance_id ? 0 : 1
				graphicStartApi(item.community_id,{status: status}).then(res => {
					if(item.relevance_id){
						item.count_start--;
						item.count_start = item.count_start == 0 ? 0 : item.count_start
						item.relevance_id = false
					}else{
						item.count_start++;
						item.relevance_id = true
					}
				});
			},
			// 关注作者
			followAuthor: function(item) {
				let status = item.relevance_id ? 0 : 1
				followAuthorApi(item.uid,{status: status}).then(res => {
					if (res.status === 200) {
						item.relevance_id = item.relevance_id ? false : true
					}
					this.$util.Tips({
						title: res.message
					});
				});
			},
			/*查看提到的宝贝*/
			openMore(item){
				this.$refs.mentioned.open();
				this.moreList = item.relevance;
			},
			openCommon(item,index){
				this.showComment = true
				this.$refs.comment.getData(item,index);
			},
			commentSucces(index){
				this.featuredList[index]['count_reply']++
			},
			close(){
				this.$refs.mentioned.close();
				this.showComment = false;
			}
		},
		onReachBottom() {
			this.getList();
		},
		onPullDownRefresh(){

		}
	}
</script>

<style lang="scss" scoped>
	.main{
		background: #ffffff;
		min-height: 100vh;
	}
	.tab-cont{
		background: #fff;
		border-radius: 16rpx 16rpx 0 0;
	}
	.follow_count{
		padding: 20rpx;
		.list_count{
			margin-bottom: 70rpx;
		}
		.title{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.author{
			display: flex;
			align-items: center;
			.picture, uni-image{
				width: 78rpx;
				height: 78rpx;
				border-radius: 100%;
			}
			.name{
				margin-left: 20rpx;
				color: #333333;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		.follow{
			margin-right: 10rpx;
			width: 112rpx;
			text-align: center;
			line-height: 42rpx;
			font-size: 22rpx;
			border-radius: 33rpx;
			&.focus{
				color: #E93323;
				border: 1px solid #E93323;
				.iconfont{
					font-size: 15rpx;
					margin-right: 5rpx;
				}
			}
			&.focused{
				background: #EEEEEE;
				border: 1px solid #EEEEEE;
				color: #999999;
			}
		}
		.product{
			margin-top: 20rpx;
			border-radius: 16rpx;
		}
	}
	.pro_describle{
		.mentioned{
			padding: 20rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #F5F5F5;
			.title{
				color: #666666;
				font-size: 26rpx;
			}
		}
		.product_more{
			max-width: 360rpx;
			display: flex;
			align-items: center;
			.more_image{
				width: 58rpx;
				height: 58rpx;
				border-radius: 5rpx;
				border: 1px solid #BBBBBB;
				margin-right: 12rpx;
			}
			.iconfont{
				color: #CCCCCC;
				margin-left: 10rpx;
			}
		}
		.product_info{
			line-height: 45rpx;
			margin: 20rpx 0;
			.text{
				font-size: 28rpx;
				color: #282828;
			}
			.unfold_btn{
				margin-left: 30rpx;
				font-size: 30rpx;
				color: #282828;
				font-weight: bold;
			}
		}
		.product_cate{
			margin: 20rpx 0;
			display: inline-block;
			>view{
				display: flex;
				align-items: center;
				background: #FFF3F2;
				border-radius: 30rpx;
				padding: 0 25rpx;
				line-height: 56rpx;
				height: 56rpx;
				color: #E93323;
				.text{
					font-size: 28rpx;
				}
				.icon{
					font-size: 35rpx;
					font-weight: bold;
					margin-right: 10rpx;
				}
			}
		}
		.foot_bar{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.item{
				display: flex;
				align-items: center;
				color: #282828;
				&.icon-fenxiang2{
					font-size: 46rpx;
				}
			}
			.item_count{
				font-size: 26rpx;
				display: flex;
				align-items: center;
				&:first-child{
					margin-right: 30rpx;
				}
				.iconfont{
					font-size: 40rpx;
					margin-right: 5rpx;
				}
				.icon-shoucang1{
					color: #E93323;
				}
			}
		}
	}
</style>
