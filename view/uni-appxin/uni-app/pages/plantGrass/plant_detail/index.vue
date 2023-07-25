<template>
	<view :style="viewColor">
		<view v-if="followDetail != null && followDetail" class="main" @click.stop="showManage = false">
		<view v-if="followDetail.status != 1" class="approval_status">
			<view class="status_count" :class="followDetail.status == 0 ? 'status1' : 'status0'">
				<view class="status_title">
					<text class="iconfont" :class="(followDetail.status == -1 || followDetail.status == -2) ? 'icon-tishi' : 'icon-shijian'"></text>
					<text v-if="followDetail.status == -1" class="title">审核未通过</text>
					<text v-if="followDetail.status == -2" class="title">已下架</text>
					<text v-if="followDetail.status == 0" class="title">正在审核</text>
				</view>
				<view v-if="followDetail.status == -1 || followDetail.status == -2" class="status_info">
					{{followDetail.refusal}}
				</view>
				<view v-if="followDetail.status == 0" class="status_info">
					发布的内容审核通过后，将展示在首页！
				</view>
			</view>
		</view>
			<view class="tab-cont">
				<view class="follow_count">
					<view class="list_count">
						<view v-if="followDetail.author" class="title">
							<view class="author">
								<navigator hover-class="none" :url="'/pages/plantGrass/plant_user/index?id='+followDetail.uid">
									<image class="picture" :src="followDetail.author.avatar || '/static/images/f.png'"></image>
								</navigator>
								<view class="name acea-row">
									<text>{{followDetail.author.nickname}}</text>
									<image v-if="followDetail.author.member" class="level_icon" :src="followDetail.author.member.brokerage_icon" alt="">
								</view>
							</view>
							<view class="author">
								<view class="manageCount" v-if="followDetail.is_author">
									<view class="follow_btn" @click.stop="showManage=!showManage">管理</view>
									<view class="manage" v-show="showManage">
										<navigator hover-class="none" :url="'/pages/plantGrass/plant_release/index?id='+id+'&type=1'" class="items">
											<text class="iconfont icon-bianji"></text>
											<text>编辑</text>
										</navigator>
										<view class="items" @click.stop="deleteTopic">
											<text class="iconfont icon-shanchu3"></text>
											<text>删除</text>
										</view>
									</view>
								</view>
								<view v-else @click.stop="followAuthor">
									<view v-if="!followDetail.is_fans" class="follow_btn focus"><text class="iconfont icon-jiahao2"></text>关注</view>
									<view v-else class="follow_btn focused">已关注</view>
								</view>
								<!-- #ifdef MP -->
								<button v-if="followDetail.status == 1" class="time iconfont icon-fenxiang2" open-type="share" hover-class='none'></button>
								<!-- #endif -->
								<!-- #ifdef APP-PLUS -->
								<button v-if="followDetail.status == 1" @click="appShare('WXSceneSession',followDetail.community_id)" class="time iconfont icon-fenxiang2" hover-class='none'></button>
								<!-- #endif -->
							</view>
						</view>
						<view class="product">
							<productConSwiper :imgUrls="followDetail.image"></productConSwiper>
						</view>
						<view class="pro_describle">
							<view class="mentioned" v-if="followDetail.relevance.length" @click="openMore(followDetail)">
								<text class="title">查看TA提到的宝贝({{followDetail.relevance.length}})</text>
								<view class="product_more">
									<view class="item">
										<image v-if="indexn<=3" v-for="(itemn, indexn) in followDetail.relevance" :key="indexn" :src="(itemn.spu&&itemn.spu.image) || itemn.image" class="more_image"></image>
									</view>
									<text class="iconfont icon-gengduo3"></text>
								</view>
							</view>
							<view class="product_info">
								<text class="text">
									{{followDetail.content}}
								</text>
							</view>
							<navigator v-if="followDetail.topic" hover-class="none" class="product_cate" :url="'/pages/plantGrass/plant_search_list/index?id='+followDetail.topic.topic_id">
								<view>
									<text class="icon">#</text><text class="text">{{followDetail.topic.topic_name}}</text>
								</view>
							</navigator>
							<view class="create_time">{{followDetail.create_time}}</view>
						</view>
					</view>
				</view>
				<view v-if="community_reply_status == 1" class="commend_list" @click.stop="loseFocus">
					<view class="commen_count">评论{{replyData.all == 0 ? '' : replyData.all}}</view>
					<block v-if="commList.length > 0">
						<view class="common_list" v-for="(item, index) in commList" :key="index">
							<view v-if="item.author" @click.stop="toReply(item,index)" class="commen_one">
								<image :src="item.author.avatar ? item.author.avatar : '/static/images/f.png'" class="image"></image>
							</view>
							<view class="info_count">
								<view class="info">
									<view class="message">
										<view v-if="item.author" class="name">{{item.author.nickname}}</view>
										<view class="desc" @click.stop="toReply(item,index)">{{item.content}}</view>
										<view class="time">{{item.create_time}}</view>
									</view>
									<view class="like" @click.stop="starComment(item)">
										<view class="iconfont" :class="item.relevance_id ? 'icon-yidianzan' : 'icon-dianzan1'"></view>
										{{item.count_start}}
									</view>
								</view>
								<view v-if="item.children&&item.children.length > 0" class="reply_count">
									<view v-for="(itemn,indexn) in item.children" :key="indexn" class="reply_list">
										<view class="item">
											<view class="item_count">
												<image v-if="itemn.author" class="image" :src="itemn.author.avatar ? itemn.author.avatar : '/static/images/f.png'" @click.stop="toReply(itemn,index)"></image>
												<view v-if="itemn.author" class="name_two">{{itemn.author.nickname}}</view>
												<view class="desc_two" @click.stop="toReply(itemn,index)">
												<text class="reply_user" v-if="itemn.reply">回复 @{{itemn.reply.nickname}} </text>
												{{itemn.content}}
												</view>
												<view class="time_two">{{itemn.create_time}}</view>
											</view>
											<view class="like_two" @click.stop="starComment(itemn)">
												<view class="iconfont":class="itemn.relevance_id ? 'icon-yidianzan' : 'icon-dianzan1'"></view>
												{{itemn.count_start}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view :hidden="!loading" class="acea-row row-center-wrapper loadingicon">
							<text class="iconfont icon-jiazai loading"></text>
						</view>
					</block>
					<view v-if="commList.length == 0 && !loading" class="empty">
						<image src="/static/images/no_commen.png"></image>
						<text>暂无评论，快去抢沙发吧~</text>
					</view>
					<view v-if="followDetail.status == 1" class="release_bar acea-row">
						<view class="input_count" :class="{input_reply:content}">
							<form @submit="submitComment">
								<input type="text" :placeholder="placeholder" placeholder-style="color: #999999; font-size: 26rpx;" v-model="content" :focus="focus" @confirm.stop="submitComment()" cursorSpacing={20}>
							</form>
						</view>
						<view v-if="content">
							<button class="send" @click.stop="submitComment">发送</button>
						</view>
						<view v-else class="input_bar acea-row">
							<view class="item acea-row" @click.stop="likeToggle(followDetail.relevance_id)">
								<text class="iconfont" :class="followDetail.relevance_id ? 'icon-shoucang1' : 'icon-dianzan'"></text>
								<text>{{followDetail.count_start}}</text>
							</view>
							<view class="item acea-row">
								<text class="iconfont icon-pinglun"></text>
								<text>{{replyData.all}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="(!followDetail || followDetail == null) && !loadData" class="no_content">
			<view class="count">
				<image src="../static/images/no_content.png"></image>
				<text>内容不存在，可能被删除了哦~</text>
				<navigator class="btn" :open-type="open_grass ? 'switchTab' : 'navigate'" url="/pages/plant_grass/index">返回首页</navigator>
			</view>
		</view>
		<!-- 他提到的宝贝弹窗 -->
		<mentioned ref="mentioned" v-if="followDetail" @close="close" :list="followDetail.relevance" :uid="followDetail.uid"></mentioned>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- 绑定手机号 -->
		<uni-popup ref="bindmobile" type="bottom">
			<bindmobile @close="close"></bindmobile>
		</uni-popup>
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
	import request from "@/utils/request.js";
	import { HTTP_REQUEST_URL } from '@/config/app.js';
	import { getUserInfo } from '@/api/user.js';
	import {plantDetailApi, replyLstApi, replyCreateApi, starCommentApi, deletePlantApi, followAuthorApi, graphicStartApi} from "@/api/community";
	import { mapGetters } from "vuex";
	import shareScence from "@/libs/spread";
	import authorize from '@/components/Authorize';
	import productConSwiper from '@/components/plantConSwiper';
	import mentioned from '@/components/mentioned.vue';
	import bindmobile from '@/components/bindmobile.vue';
	import { openPlantGrass } from "@/config/app.js";
	import { configMap } from '@/utils';
	const app = getApp();
	export default {
		components: {
			authorize,
			productConSwiper,
			mentioned,
			bindmobile
		},
		data() {
			return {
				open_grass: openPlantGrass,
				followDetail: null,
				commList: [], //评论列表
				moreList: [],
				isShowAuth: false, //是否隐藏授权
				isAuto: false, //没有授权的不会自动授权
				showManage: false,
				content: "", //评论内容
				id: "",
				replyData: {},
				userInfo: {},
				loadData: false,
				loaded: false,
				loading: false,
				loadTitle: '加载更多',
				where:{
					page: 1,
					limit: 10
				},
				reply_id: "",
				placeholder: "快来说点儿什么吧...",
				isChild: false,
				index: 0,
				currSpid: '',
				focus: false,
				actionSheetHidden: true,
				type: 0
			}
		},
		created() {},
		computed: configMap({community_reply_auth:0,community_reply_status:0},mapGetters(['isLogin', 'uid', 'viewColor'])),
		watch: {},
		onLoad: function(options) {
			let that = this
			that.id = options.id;
			that.type = options.type;
			//#ifdef MP
			if (options.spid) {
				app.globalData.spid = options.spid;
				that.currSpid = options.spid
			}
			shareScence(that.currSpid, that.isLogin)
			//#endif
			that.getDetail();
			that.getReplyList();
		
		},
		onShow() {
			uni.hideLoading();
		},
		mounted: function() {},
		methods: {
			//分享
			//#ifdef MP
			plantShare(){
				let that = this;
				if(that.followDetail.status == 1){
					uni.showShareMenu({
						withShareTicket: true,
						menus: ['shareAppMessage','shareTimeline'],
						title: that.followDetail.title || '',
						imageUrl: that.followDetail.image[0] || '',
						path: '/pages/plantGrass/plant_detail/index?id=' + that.id + '&spid=' + that.uid,
					})
				}else{
					uni.hideShareMenu()
				}
			},
			// #endif
			// 授权回调
			onLoadFun() {
				this.isShowAuth = false
				this.getDetail()
				this.getReplyList()
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
					this.isShowAuth = true
				}
			},
			// #ifdef APP-PLUS
			appShare(scene,id) {
				let that = this
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let data = this.followDetail;
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].$page.fullPath // 获取当前页面路由，也就是最后一个打开的页面路由
				uni.share({
					provider: "weixin",
					scene: scene,
					type: 0,
					href: `${HTTP_REQUEST_URL}${curRoute}`,
					title: data.title || '',
					summary: data.content || '',
					imageUrl: data.image[0] || '',
					success: function(res) {
						uni.showToast({
							title: '分享成功',
							icon: 'success'
						})
						uni.hideLoading();	
					},
					fail: function(err) {
						uni.hideLoading();	
						uni.showToast({
							title: '分享失败',
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			// #endif
			/**
			 * 获取个人用户信息
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.userInfo = res.data;
					/*判断是否绑定手机号*/
					if(res.data.phone || that.community_reply_auth == 0){
						that.createReply()
					}else{
						that.$refs.bindmobile.open()
					}
				});
			},
			/*获取内容详情*/
			getDetail(){
				let that = this;
				if(that.loadData)return
				that.loadData = true
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				plantDetailApi(that.id).then(res => {
					that.loadData = false
					that.followDetail = res.data
					uni.hideLoading()
					// #ifdef MP
					that.plantShare();
					// #endif
				}).catch(err => {
					that.followDetail = null
					that.loadData = false
					uni.hideLoading()
					return that.$util.Tips({
						title: err
					});
				})
			},
			/*获取评论*/
			getReplyList(){
				let that = this;
				if (that.loading || that.loaded) return;
				that.loading = true;
				that.loadTitle = '';
				replyLstApi(that.id,that.where).then(res => {
					that.loading = false;
					that.replyData = res.data
					let list = res.data.list;
					let commList = that.$util.SplitArray(list, that.commList);
					that.loaded = list.length < that.where.limit;
					that.loading = false;
					that.loadTitle = that.loaded ? '已全部加载' : '加载更多';
					that.$set(that, 'commList', commList);
					that.$set(that.where, 'page', that.where.page + 1);
				}).catch(err => {
					that.loading = false;
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			/*发表评论*/
			submitComment(){
				let that = this;
				if (that.isLogin === false) {
					that.isAuto = true;
					that.isShowAuth = true
				}else{
					that.getUserInfo();
				}
			},
			createReply() {
				let that = this;
				let reply_id = that.reply_id ? that.reply_id : 0
				replyCreateApi(that.id,{content: that.content,reply_id: reply_id}).then(res => {
					if (res.status === 200 && res.data.status == 1) {
						if(that.isChild){
							if(that.commList[that.index]['children']){
								that.commList[that.index]['children'].push(res.data)
							}else{
								that.commList[that.index]['children'] = [res.data]
							}
						}else{
							that.commList.unshift(res.data)
						}
						that.replyData.all++
					}
					that.$util.Tips({
						title: res.message
					});
					that.loseFocus()
					that.content = ""
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				});
			},
			toReply(item,index){
				this.placeholder = '回复：'+item.author.nickname
				this.reply_id = item.reply_id
				this.isChild = true
				this.index = index
				this.focus = true
				this.content = ""
			},
			loseFocus(){
				this.focus = false;
				this.reply_id = 0;
				this.placeholder = "快来说点儿什么吧..."
				this.isChild = false
			},
			/*点赞评论*/
			starComment(item){
				let that = this;
				if (that.isLogin === false) {
					this.isAuto = true;
					this.isShowAuth = true
				}else{
					let status = item.relevance_id ? 0 : 1
					starCommentApi(item.reply_id,{status: status}).then(res => {
						if (res.status === 200) {
							if(item.relevance_id){
								item.count_start--;
								that.replyData.start--
								item.count_start = item.count_start == 0 ? 0 : item.count_start
								that.replyData.start = that.replyData.start == 0 ? 0 : that.replyData.start
								item.relevance_id = false
							}else{
								item.count_start++;
								item.relevance_id = true
								that.replyData.start++
							}
						}
						that.$util.Tips({
							title: res.message
						});
					}).catch(err => {
						uni.showToast({
							title: err,
							icon: 'none'
						})
					});
				}
			},
			/*点赞文章*/
			likeToggle(id){
				if (this.isLogin === false) {
					this.isAuto = true;
					this.isShowAuth = true
				}else{
					let status = id ? 0 : 1
					graphicStartApi(this.followDetail.community_id,{status: status}).then(res => {
						if(id){
							this.followDetail.count_start--;
							this.followDetail.count_start = this.followDetail.count_start == 0 ? 0 : this.followDetail.count_start
							this.followDetail.relevance_id = false
						}else{
							this.followDetail.count_start++;
							this.followDetail.relevance_id = true
						}
						uni.$emit('startLike', this.followDetail)
					});
				}
			},
			// 关注作者
			followAuthor: function() {
				if (this.isLogin === false) {
					this.isAuto = true;
					this.isShowAuth = true
				}else{
					let status = this.followDetail.is_fans == 0 ? 1 : 0
					followAuthorApi(this.followDetail.uid,{status:status}).then(res => {
						if (res.status === 200) {
							this.followDetail.is_fans = this.followDetail.is_fans == 0 ? 1 : 0
						}
						this.$util.Tips({
							title: res.message
						});
					});
				}
			},
			// 删除话题
			deleteTopic(){
				let that = this;
				uni.showModal({
				  content: '确定要删除该话题么？',
				  success: function(res) {
				    if(res.confirm) {
				      deletePlantApi(that.id).then(res => {
				      	if (res.status === 200) {
				      		that.$util.Tips({
				      			title: res.message
				      		});
									setTimeout(function() {
										uni.redirectTo({
											url: '/pages/plantGrass/plant_user/index?id='+that.followDetail.uid
										})
									}, 1000);
								}
				      })
				    } else if(res.cancel) {
				      console.log('用户点击取消');
				    }
				  }
				});

			},
			/*查看提到的宝贝*/
			openMore(item){
				this.$refs.mentioned.showPopup()
			},
			close(){
				this.$refs.mentioned.closePopup()
				this.$refs.bindmobile.close()
			}
		},
		onReachBottom() {
			this.getReplyList()
		},
		onPullDownRefresh(){}
	}
</script>

<style lang="scss" scoped>
page{
	background: #ffffff;
}
.tab-cont{
	background: #fff;
	border-radius: 16rpx 16rpx 0 0;
}
.approval_status{
	padding: 20rpx;
	.status_count{
		padding: 26rpx 30rpx 20rpx;
		border-radius: 10rpx;
		.title{
			margin-left: 10rpx;
			font-size: 28rpx;
			font-weight: bold;
		}
		&.status0{
			background: #FDF3F2;
			.title{
				color: #E93323;
			}
		}
		&.status1{
			background: #FFF4EB;
			.title{
				color: #FC8327;
			}
		}
		.iconfont{
			font-size: 30rpx;
		}
		.icon-shijian{
			color: #FC8327;
		}
		.icon-tishi{
			color: #E93323;
		}
		.status_info{
			font-size: 22rpx;
			color: #666666;
			margin: 10rpx 0 0 36rpx;
		}
	}
}
.follow_count{
	padding: 20rpx;
	border-bottom: 1px solid #F5F5F5;
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
			align-items: center;
		}
		.follow_btn{
			margin-right: 24rpx;
			width: 112rpx;
			display: flex;
			text-align: center;
			justify-content: center;
			line-height: 42rpx;
			font-size: 22rpx;
			border-radius: 33rpx;
			color: #282828;
			border: 1px solid #282828;
			&.focus{
				color: var(--view-theme);
				border: 1px solid var(--view-theme);
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
		.level_icon{
			width: 34rpx;
			height: 32rpx;
			margin: 4rpx 0 0 6rpx;
			border: none;
		}
	}
	.time{
		color: #282828;
		font-size: 46rpx;
	}
	.product{
		margin-top: 20rpx;
		border-radius: 16rpx;
	}
	.manageCount{
		position: relative;
		.manage{
			width: 210rpx;
			background: #ffffff;
			box-shadow: 0 2rpx 15rpx rgba(0, 0, 0, 0.1);
			padding: 0 15rpx;
			position: absolute;
			bottom: -180rpx;
			left: -20rpx;
			z-index: 10;
			border-radius: 16rpx;
			&::before{
				content: "";
				display: inline-block;
				width: 26rpx;
				height: 26rpx;
				background: #ffffff;
				transform: rotate(45deg);
				position: absolute;
				top: -10rpx;
				left: 30rpx;
				box-shadow: -1rpx -1rpx 1rpx rgba(0, 0, 0, 0.05);
			}
			.items{
				border-bottom: 1px solid #EEEEEE;
				color: #282828;
				font-size: 26rpx;
				padding: 20rpx 0;
				display: flex;
				align-items: center;
				&:last-child{
					border-bottom: none;
				}
				.iconfont{
					margin: 0 16rpx 0;
				}
			}
		}
	}
}
.pro_describle{
	.create_time{
		color: #CCCCCC;
		font-size: 22rpx;
		margin-left: 10rpx;
		margin-top: 5rpx;
	}
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
			text-align: justify;
			text-justify: newspaper;
			word-break: break-all;
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
			background: var(--view-minorColor);
			border-radius: 30rpx;
			padding: 0 25rpx;
			line-height: 56rpx;
			height: 56rpx;
			color: var(--view-theme);
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
}

.main_count{
	padding: 30rpx 20rpx;
	.list{
		width: 710rpx;
		height: 280rpx;
		margin-bottom: 30rpx;
		position: relative;
		.picture{
			width: 710rpx;
			height: 280rpx;
			border-radius: 16rpx;
		}
	}
}
.commend_list{
	margin-top: 30rpx;
	padding: 0 20rpx;
	position: relative;
	padding-bottom: 120rpx;
	.commen_count{
		font-size: 26rpx;
		color: #282828;
		margin: 30rpx 0;
	}
	.common_list{
		position: relative;
		padding-left: 94rpx;

		.commen_one{
			position: absolute;
			top: 0;
			left: 0;
			.image,uni-image{
				width: 74rpx;
				height: 74rpx;
				border-radius: 100%;
			}
		}
		.info_count{
			margin-bottom: 20rpx;
		}
		.info{
			position: relative;
			padding-right: 90rpx;
		}
		.name,.name_two{
			color: #999999;
			font-size: 26rpx;
		}
		.desc,.desc_two{
			color: #282828;
			font-size: 28rpx;
			margin-top: 10rpx;
			display: inline-block;
		}
		.desc_two{
			font-size: 26rpx;
			.reply_user{
				font-size: 24rpx;
				color: #4A8AC9;
				margin: 0 6rpx;
			}
		}
		.time,.time_two{
			color: #BBBBBB;
			font-size: 22rpx;
			margin-top: 15rpx;
		}
		.like,.like_two{
			color: #999999;
			font-size: 26rpx;
			text-align: center;
			position: absolute;
			top: 0;
			right: 0;
			width: 75rpx;
			.icon-yidianzan{
				color: var(--view-theme);
			}
		}
		.reply_list{
			margin-top: 20rpx;
			.item{
				padding-right: 140rpx;
				position: relative;
			}
			.item_count{
				position: relative;
				padding-left: 56rpx;
				.image,un-image{
					width: 36rpx;
					height: 36rpx;
					border-radius: 100%;
					position: absolute;
					top: 0;
					left: 0;
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
	.btn{
		width: 440rpx;
		text-align: center;
		padding: 15rpx 0;
		color: var(--view-theme);
		border: 1px solid var(--view-theme);
		border-radius: 40rpx;
		margin: 44rpx auto 0;
		font-size: 32rpx;
	}
}
.release_bar{
	align-items: center;
	width: 100%;
	background: #ffffff;
	padding: 15rpx 20rpx;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 10;
	border-top: 1px solid #F5F5F5;
	justify-content: space-between;
	.input_count{
		width: 530rpx;
		background: #F7F7F7;
		border-radius: 30rpx;
		padding: 12rpx 30rpx;
		input{
			font-size: 26rpx;
		}
	}
	.input_bar{
		align-items: center;
		color: #282828;
		font-size: 26rpx;
		.iconfont{
			font-size: 40rpx;
			margin-right: 6rpx;
		}
		.icon-shoucang1{
			color: var(--view-theme);
		}
		.item{
			align-items: center;
			&:first-child{
				margin-right: 25rpx;
			}
		}
	}
	.send{
		font-size: 26rpx;
		color: #ffffff;
		padding: 12rpx 45rpx;
		background-image: linear-gradient(126deg, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
		border-radius: 30rpx;
		text-align: center;
	}
}
.empty{
	margin: 130rpx 0 150rpx;
	text-align: center;
	image,uni-image{
		display: inline-block;
		width: 414rpx;
		height: 305rpx;
	}
	text{
		display: block;
		color: #999999;
		font-size: 26rpx;
	}
}
</style>
