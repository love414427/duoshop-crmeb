<template>
	<view v-if="(rankingData && rankingData.length>0) && (rankingData[0]['list'].length || rankingData[1]['list'].length || rankingData[2]['list'].length)" class="rank_card bg-white">
		<view class="cross">
			<view class="cross_rank_header acea-row row-between row-middle">
				<view class="rank_logo">
					<image class="title-img" :src="`${domain}/static/images/rank_title.png`" alt=""></image>
				</view>
				<navigator url="/pages/activity/rank/index" hover-class="none" class="session">更多 <text class="iconfont icon-jiantou" hover-class="none"></text></navigator>
			</view>
			<view class="scroll_box">
				<scroll-view scroll-x="true" style="white-space: nowrap; vertical-align: middle;"
					show-scrollbar="false">
					<view class="scroll_item" v-for="(item,idx) in rankingData" :key="idx" v-if="item.list.length > 0" :style="'border-radius:'+bgStyle+'rpx'">
						<view>
							<block v-if="item.list.length == 1">
								<navigator :url="'/pages/activity/rank/index?cate_id='+item.cate_id" hover-class="none" class="acea-row row-between">
									<view class="left_count" :style="'border-radius:'+conStyle+'rpx'">
										<view class="left_pic">
											<view class="picture" :class="'border'+conStyle">
												<easy-loadimage mode="widthFix" :image-src="item.list[0]['image']"></easy-loadimage>
											</view>
											<view class="rank acea-row row-center row-middle">01</view>
										</view>
										<view class="cate_name">
											<text class="rank_tit line1">{{item.cate_name}}</text>	
										</view>
									</view>
									<view class="acea-row row-column row-between">
										<view class="right_pic">
											<view class="picture" :class="'border'+conStyle">
												<easy-loadimage mode="widthFix" :image-src="item.list[0]['image']"></easy-loadimage>
											</view>
											<view class="rank acea-row row-center row-middle">02</view>
										</view>
										<view class="right_pic">
											<view class="picture" :class="'border'+conStyle">
												<easy-loadimage mode="widthFix" :image-src="item.list[0]['image']"></easy-loadimage>
											</view>
											<view class="rank acea-row row-center row-middle">03</view>
										</view>
									</view>
								</navigator>	
							</block>
							<block v-if="item.list.length == 2">
								<navigator :url="'/pages/activity/rank/index?cate_id='+item.cate_id" hover-class="none" class="acea-row row-between">
									<view class="left_count" :style="'border-radius:'+conStyle+'rpx'">
										<view class="left_pic">
											<view class="picture" :class="'border'+conStyle">
												<easy-loadimage mode="widthFix" :image-src="item.list[0]['image']"></easy-loadimage>
											</view>
											<view class="rank acea-row row-center row-middle">01</view>
										</view>
										<view class="cate_name">
											<text class="rank_tit line1">{{item.cate_name}}</text>	
										</view>
									</view>
									<view class="acea-row row-column row-between">
										<view class="right_pic">
											<view class="picture" :class="'border'+conStyle">
												<easy-loadimage mode="widthFix" :image-src="item.list[1]['image']"></easy-loadimage>
											</view>
											<view class="rank acea-row row-center row-middle">02</view>
										</view>
										<view class="right_pic">
											<view class="picture" :class="'border'+conStyle">
												<easy-loadimage mode="widthFix" :image-src="item.list[1]['image']"></easy-loadimage>
											</view>
											<view class="rank acea-row row-center row-middle">03</view>
										</view>
									</view>
								</navigator>
							</block>
							<block v-if="item.list.length >= 3">
								<navigator :url="'/pages/activity/rank/index?cate_id='+item.cate_id" hover-class="none" class="acea-row row-between">
									<view class="left_count" :style="'border-radius:'+conStyle+'rpx'">
										<view class="left_pic">
											<view class="picture" :class="'border'+conStyle">
												<easy-loadimage mode="widthFix" :image-src="item.list[0]['image']"></easy-loadimage>
											</view>
											<view class="rank acea-row row-center row-middle">01</view>
										</view>
										<view class="cate_name">
											<text class="rank_tit line1">{{item.cate_name}}</text>	
										</view>
									</view>
									<view class="acea-row row-column row-between">
										<view class="right_pic">
											<view class="picture" :class="'border'+conStyle">
												<easy-loadimage mode="widthFix" :image-src="item.list[1]['image']"></easy-loadimage>
											</view>
											<view class="rank acea-row row-center row-middle">02</view>
										</view>
										<view class="right_pic">
											<view class="picture" :class="'border'+conStyle">
												<easy-loadimage mode="widthFix" :image-src="item.list[2]['image']"></easy-loadimage>
											</view>
											<view class="rank acea-row row-center row-middle">03</view>
										</view>
									</view>
								</navigator>
							</block>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>
<script>
	import { HTTP_REQUEST_URL } from '@/config/app';
	import { hotRankingApi } from '@/api/activity.js'
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	export default {
		name: 'hotRanking',
		components:{easyLoadimage},
		props:{
			dataConfig: {
				type: Object,
				default: () => {}
			},
		},
		data(){
			return {
				domain: HTTP_REQUEST_URL,
				mbConfig: this.dataConfig.mbConfig.val*2,
				list: this.dataConfig.cateConfig.list,
				bgStyle: this.dataConfig.bgStyle.type ? 16 : 0,
				conStyle: this.dataConfig.conStyle.type ? 10 : 0,
				unique: this.dataConfig.timestamp,
				rankingData: {},
			}
		},
		mounted() {
			this.getData();
		},
		methods: {
			getData: function() {
				let that = this;
				let data = {
					unique: that.unique,
					cate_pid: that.getCateId(),
				};				
				hotRankingApi(data).then(res => {
					that.rankingData = res.data
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				});
			},
			//获取分类id
			getCateId(){
				let arr = []
				this.list.forEach((item, i) => {
					arr.push(item.cate)
				});
				return arr.toString()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.cross_rank_header{
		padding: 30rpx 20rpx 0 40rpx;
		.icon-jiantou{
			font-size: 24rpx;
		}
	}
	.rank_logo{
		position: relative;
		.title-img{
			width: 136rpx;
			height: 36rpx;
		}	
	}
	.session{
		font-size: 26rpx;
		color: #323232;
		text-align: right;
	}
	.scroll_box {
		width: 750rpx;
		margin-top: 24rpx;
		padding-left: 32rpx;
	}
	.scroll_item {
		display: inline-block;
		background-color: #FFFFFF;
		width: 414rpx;
		padding: 20rpx;
		border-radius: 16rpx;
	}
	.scroll_item~.scroll_item {
		margin-left: 20rpx;
	}
	.left_count{
		width: 230rpx;
		background: #FFF6F5;
		border-radius: 10rpx;;
		.cate_name{
			margin-top: 10rpx;
			text-align: center;
			.rank_tit{
				padding: 0 35rpx;
				color: #E93323;
				font-size: 26rpx;
				font-weight: bold;
				position: relative;
				max-width: 230rpx;
				display: inline-block;
				&::before,&::after{
					content: '';
					display: inline-block;
					width: 22rpx;
					height: 30rpx;
					background-image: url('../../activity/static/images/rank_cate.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					position: absolute;
				}
				&::before{
					left: 0;
				}
				&::after{
					right: 0;
					transform: rotateY(180deg);
				}
			}	
		}
	}
	.left_pic{
		width: 230rpx;
		height: 230rpx;
		border-radius: 10rpx;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		.picture,/deep/image,/deep/.easy-loadimage,/deep/uni-image {
			width: 200rpx!important;
			height: 200rpx!important;
			border-radius: 10rpx;
		}
		.border0{
			border-radius: 0;
			/deep/image,/deep/.easy-loadimage,/deep/uni-image{
				border-radius: 0;
			}
		}
		.border10{
			border-radius: 10rpx;
			/deep/image,/deep/.easy-loadimage,/deep/uni-image{
				border-radius: 10rpx;
			}
		}
		.rank {
			position: absolute;
			top: 0;
			left: 10rpx;
			width: 50rpx;
			height: 61rpx;
			font-weight: bold;
			font-size: 32rpx;
			color: #CE8F21;;
			background-image: url('../../activity/static/images/rank.png');
			background-size: cover;
			font-family: '黑体';
		}	
	}
	.right_pic{
		width: 124rpx;
		height: 124rpx;
		position: relative;
		border-radius: 8rpx;
		&:first-child{
			margin-bottom: 20rpx;
		}
		.picture,/deep/image,/deep/.easy-loadimage,/deep/uni-image {
			width: 124rpx!important;
			height: 124rpx!important;
			border-radius: 8rpx;
		}
		.rank {
			position: absolute;
			top: 0;
			left: 6rpx;
			width: 30rpx;
			height: 36rpx;
			font-size: 16rpx;
			font-weight: bold;
			color: #CE8F21;;
			background-image: url('../../activity/static/images/rank.png');
			background-size: cover;
			font-family: '黑体';
		}
	}
</style>