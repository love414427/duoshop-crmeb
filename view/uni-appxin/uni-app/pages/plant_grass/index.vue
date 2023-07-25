<template>
	<view :style="viewColor">
		<view class="page_con">
			<view class="grass_header" :style="{'background-image': `url(${domain}/static/images/grass_header.png)`}">
				<view v-if="!navShow" class="header">
					<view class="navTab">
						<navigator v-if="community_status == 1" url="/pages/plantGrass/plant_release/index" class="release_btn acea-row row-center-wrapper" hover-class="none">
							<text class="iconfont icon-fabu"></text></navigator>
						<view class="acea-row row-center-wrapper">
							<view :class="tabActive == 0 ? 'on' : ''" class="nav-item" @click="tabActive=0;top=200;">关注</view>
							<view :class="tabActive == 1 ? 'on' : ''" class="nav-item" @click="tabActive=1;top=300;">发现</view>
						</view>
						<navigator v-if="isLogin && community_status == 1" :url="'/pages/plantGrass/plant_user/index?id='+userInfo.uid">
							<image class="avatar" :src="userInfo.avatar ? userInfo.avatar : '/static/images/f.png'"></image>
						</navigator>
					</view>
					<view class="search_count">
						<navigator url="/pages/plantGrass/plant_search/index" hover-class="none" class="search"><text class="iconfont icon-xiazai5"></text>搜索想看的文章</navigator>
						<navigator class="search_topic" url="/pages/plantGrass/plant_topic/index">
							<image class="topic_icon" src="/static/images/topic_cate.png"></image>
						</navigator>
					</view>
				</view>
				<view class="longTab" v-if="tabActive == 1">
					<scroll-view scroll-x="true" style="white-space: nowrap; display: flex;" scroll-with-animation class="menu" :scroll-left="tabLeft" show-scrollbar="true">
						<view class="longItem"
						:data-index="index"
						:class="index === tabClick ? 'click' : ''"
						v-for="(item, index) in menuList"
						:key="index"
						:id="'id' + index"
						@click.stop="selectMenu(item, index, true)">{{ item.cate_name }}</view>
					</scroll-view>
				</view>
			</view>
			<scroll-view class="main" scroll-y="true" @scroll="followScroll">
				<view class="tab-cont" id="main" @touchmove="onTouchmove">
					<!-- 关注 -->
					<view v-if="tabActive === 0">
						<view v-if="isLogin && followList.length > 0" class="follow_count" :class="(newData.status && newData.status.status && showTab) ? 'showFoot' : ''">
							<block v-for="(item, index) in followList" :key="index">
								<view class="list_count">
									<view class="title">
										<navigator hover-class="none" :url="'/pages/plantGrass/plant_user/index?id='+item.uid" v-if="item.author" class="author">
											<easy-loadimage class="picture" mode="widthFix" :image-src="item.author&&item.author.avatar || '/static/images/f.png'"></easy-loadimage>
											<text class="name">{{item.author.nickname || ''}}</text>
										</navigator>
										<view class="time">{{item.time}}</view>
									</view>
									<view class="product">
										<productConSwiper v-if="item.is_type == 1" :imgUrls="item.image"></productConSwiper>
										<view v-else class="videoSwiper" @click="goVideo(item)">
											<image class="image" :src="item.image[0]"></image>
											<image v-if="item.is_type == 2" class="video_img" src="../../static/images/stop.png"></image>
										</view>
									</view>
									<view class="pro_describle">
										<view class="mentioned" v-if="item.relevance && item.relevance.length > 0" @click="openMore(item)">
											<text class="title">查看TA提到的宝贝({{item.relevance.length}})</text>
											<view class="product_more">
												<view class="item">
													<easy-loadimage v-if="indexn<4" v-for="(itemn, indexn) in item.relevance" :key="indexn" mode="widthFix" :image-src="(itemn.spu && itemn.spu.image) || itemn.image" class="more_image"></easy-loadimage>
												</view>
												<text class="iconfont icon-gengduo3"></text>
											</view>
										</view>
										<view v-if="!item.show && item.content.length > 110" class="product_info">
											<text class="text">
												{{item.content.substring(0,90)+'...'}}
											</text>
											<text @click.stop="showMore(item)" class="unfold_btn">展开</text>
										</view>
										<view v-else class="product_info">
											<text class="text">
												{{item.content}}
											</text>
										</view>
										<navigator v-if="item.topic" hover-class="none" class="product_cate" :url="'/pages/plantGrass/plant_search_list/index?id='+item.topic.topic_id">
											<view>
												<text class="icon">#</text><text class="text">{{item.topic.topic_name}}</text>
											</view>
										</navigator>
										<view class="foot_bar">
											<!-- #ifdef MP -->
											<button class="time iconfont icon-fenxiang2" open-type="share" hover-class='none' @click="shareFriend(item)"></button>
											<!-- #endif -->
											<!-- #ifndef MP -->
											<button></button>
											<!-- #endif -->
											<view class="item">
												<view class="item_count" @click.stop="likeToggle(item)">
													<text class="iconfont" :class="item.relevance_id ? 'icon-shoucang1' : 'icon-dianzan'"></text>
													<text>{{item.count_start > 0 ? item.count_start : '点赞'}}</text>
												</view>
												<view v-if="community_reply_status == 1" class="item_count" @click="openCommon(item,index)">
													<text class="iconfont icon-pinglun"></text>
													<text>{{item.count_reply > 0 ? item.count_reply : '评论'}}</text>
												</view>
											</view>
										</view>
									</view>
								</view>
							</block>
						</view>
						<view v-if="followList.length == 0 && !focusLoading && isLogin" class="empty">
							<image src="/static/images/no_thing.png"></image>
							<text>暂无内容~</text>
						</view>
						<view v-if="!isLogin" class="empty no_login">
							<image src="/static/images/no_login.png"></image>
							<view class="title">暂未登录</view>
							<text>登录后可查看关注用户的发布哦~</text>
							<button class="login_btn" @click="authOpen">立即登录</button>
						</view>
					</view>
					<!-- 发现 -->
					<view v-show="tabActive === 1">
						<!-- 商品 -->
						<swiper :interval="interval" indicator-color="rgba(255,255,255,0.6)" :current="swiperCurrent" @change="swiperChange" :style="'height:'+swiperHeight+'px'" >
							<block v-for="(item,index) in menuList" :key="index">
								<swiper-item :item-id="`${item.category_id}`">
									<scroll-view @scroll="scrollLeft" scroll-y="true" :style="'height:'+swiperHeight+'px'" id="goods" @touchmove="onTouchmove"
										refresher-enabled="true" :refresher-threshold="100"
										:refresher-triggered="triggeredDiscover"
										@refresherrefresh="onRefreshDiscover" @refresherpulling="onPulling"
										@refresherrestore="onRestore" @refresherabort="onAbort">
										<view v-if="cateGoods[item.category_id] && cateGoods[item.category_id].goods.length" class="goods-wrap" id="goods">
											<view class="goods">
												<WaterfallsFlow :isShow="false" :wfList='cateGoods[item.category_id].goods' :isFind="true" @likeToggle="likeToggle"/>
											</view>
										</view>
										<view :hidden="cateGoods[item.category_id] && !cateGoods[item.category_id].goodsLoading" class="acea-row row-center-wrapper loadingicon">
											<text class="iconfont icon-jiazai loading"></text>{{!cateGoods[item.category_id] ? 0 : cateGoods[item.category_id].goodsLoading}}
										</view>
										<view v-if="cateGoods[item.category_id] && cateGoods[item.category_id].goods.length == 0 && !cateGoods[item.category_id].goodsLoading" class="empty">
											<image src="/static/images/no_thing.png"></image>
											<text>{{item.category_id == -1 ? '暂无视频' : '暂无文章'}}~</text>
										</view>
									</scroll-view>
								</swiper-item>
							</block>
						</swiper>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 他提到的宝贝弹窗 -->
		<mentioned ref="mentioned" :isHome="true" @close="closePopup" :list="moreList" :uid="authorUid"></mentioned>
		<!-- 评论弹窗 -->
		<comment ref="comment" :isShow="showComment" :userInfo="userInfo" :bottom="bottom" @successFul="commentSucces" @close="close"></comment>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<view class="foot" v-if="newData.status && newData.status.status && showTab">
			<view class="page-footer" id="target" :style="{'background-color':newData.bgColor.color[0].item}">
				<view class="foot-item" v-for="(item,index) in newData.menuList" :key="index"
					@click="goRouter(item)">
					<block v-if="item.link == activeRouter">
						<image :src="item.imgList[0]"></image>
						<view class="txt" :style="{color:newData.activeTxtColor.color[0].item}">{{item.name}}
						</view>
					</block>
					<block v-else>
						<image :src="item.imgList[1]"></image>
						<view class="txt" :style="{color:newData.txtColor.color[0].item}">{{item.name}}</view>
					</block>
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
	// +----------------------------------------------------------------------
	// | Author: CRMEB Team <admin@crmeb.com>
	// +----------------------------------------------------------------------
	import WaterfallsFlow from '@/components/plantWaterfallsFlow/WaterfallsFlow.vue'
	import mentioned from '@/components/mentioned.vue';
	import comment from '@/components/comment.vue';
	import { graphicLstApi, getTopicList, graphicStartApi, focusArticleLst } from '@/api/community.js';
	import { getUserInfo } from '@/api/user.js';
	import { mapGetters } from "vuex";
	import authorize from '@/components/Authorize';
	import productConSwiper from '@/components/plantConSwiper';
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';
	import { HTTP_REQUEST_URL } from '@/config/app';
	import { configMap } from '@/utils';
	const app = getApp();
	export default {
		components: {
			authorize,
			WaterfallsFlow,
			productConSwiper,
			mentioned,
			comment,
			easyLoadimage
		},
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				// #ifdef MP
				menuButtonInfo: uni.getMenuButtonBoundingClientRect(),
				// #endif
				tabClick: 0,
				tabLeft: 0,
				isLeft: 0, //导航栏下划线位置
				isWidth: 0, //每个导航栏占位
				windowHeight: 0,
				swiperHeight: 0,
				childIndex: 0,
				showComment: false,
				triggered: false,
				triggeredDiscover: false,
				userInfo: {},
				goods: [], // 商铺商品
				followList: [], //关注列表
				menuList: [],
				moreList: [],
				commList: [], //评论列表
				goodsList: [

				],
				navShow: false,
				navActive: 0,
				tabActive: 1, // 底部切换
				keyword: '',
				sortPrice: true, // 价格排序
				focusLoading: false,
				goodsLoading: false,
				goodsLoaded: false,
				focusLoaded: false,
				loadTitle: '加载更多',
				isShowAuth: false, //是否隐藏授权
				isAuto: false, //没有授权的不会自动授权
				where: {
					category_id: 0,
					page: 1,
					limit: 30
				},
				focusWhere: {
					page: 1,
					limit: 30
				},
				storeScroll: true,
				_freshing: false,
				storeTop: 0,
				storeHeight: 0,
				navHeight: 0,
				avatar: '',
				hederBg: '../static/images/plant_header.png',
				top: 300,
				shareInfo: {},
				actionSheetHidden: true,
				authorUid: 0,
				swiperCur: 0,
				circular: true,
				isScroll: false,
				interval: 3000,
				currentItemId: 0,
				swiperCurrent: 0,
				cateGoods:{},
				newData: {},
				activeRouter: '',
				showTab: false,
				//#ifdef MP||APP-PLUS
				bottom: 0,
				//#endif
				//#ifndef MP||APP-PLUS
				bottom: 90,
				//#endif

			}
		},
		// 滚动监听
		onPageScroll({scrollTop}) {
			uni.$emit('scroll');
		},
		created() {
			var that = this;
			// 获取设备宽度
			uni.getSystemInfo({
				success(e) {
					that.isWidth = e.windowWidth / 6;
					that.windowHeight = e.windowHeight;
					// that.swiperHeight = that.windowHeight - 205
					that.$set(that, 'swiperHeight', that.windowHeight+55);
				}
			});
		},
		computed: {
			...mapGetters(['isLogin', 'uid', 'viewColor']),
			...configMap({community_reply_status: 0,community_app_switch: [],community_status: 0,navigation: {}})
		},
		watch: {},
		onLoad: function(options) {
			let that = this;
			uni.$on('startLike',function(data){
				for(var i = 0; i < that.cateGoods[that.currentItemId]['goods'].length; i++){
					let item = that.cateGoods[that.currentItemId]['goods'][i]
					if(data.community_id == item['community_id']){
						item['count_start'] = data.relevance_id ? item['count_start']+1 : item['count_start']-1
						item['relevance_id'] =  data.relevance_id ? true : false
					}
				}
			})
		},
		onShow() {
			app.getConfigData();
			this.getCateList();
			this.getGoods();
			let that = this
			let routes = getCurrentPages();
			let curRoute = routes[routes.length - 1].route
			this.activeRouter = '/' + curRoute
			this.getNav();
			if (that.isLogin) {
				this.getUserInfo();
				this.getFocusArtical();
			} else {
				this.userInfo = {}
			}
		},
		mounted: function() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#main').boundingClientRect(data => {
				this.storeHeight = data.height;
				this.storeTop = data.top;
			}).exec();
		},
		/**
		 * 用户点击右上角分享
		 */
		// #ifdef MP
		onShareAppMessage: function() {
			let that = this;
			that.$set(that, 'actionSheetHidden', !that.actionSheetHidden);
			return {
				title: that.shareInfo.title || '',
				imageUrl: that.shareInfo.image[0] || '',
				path: '/pages/plantGrass/plant_detail/index?id=' + that.shareInfo.community_id + '&spid=' + that.uid,
			}
		},
		onShareTimeline: function() {
			let that = this;
			that.$set(that, 'actionSheetHidden', !that.actionSheetHidden);
			return {
				title: that.shareInfo.title || '',
				query: {
					id: that.shareInfo.community_id,
					spid: that.uid
				},
				imageUrl: that.shareInfo.image[0] || ''
			}
		},
		// #endif
		methods: {
			goRouter(item) {
				var pages = getCurrentPages();
				var page = (pages[pages.length - 1]).$page.fullPath;
				if (item.link == page) return
				uni.switchTab({
					url: item.link,
					fail(err) {
						uni.redirectTo({
							url: item.link
						})
					}
				})
			},
			getNav() {
				this.newData = this.navigation
				if (this.newData.status && this.newData.status.status) {
					this.showTab = true;
					uni.hideTabBar()
				} else {
					this.showTab = false;
					uni.showTabBar()
				}			
			},
			followScroll(){
				uni.$emit('scroll');
			},
			//分享信息
			shareFriend(item){
				this.shareInfo = item
			},
			// 授权回调
			onLoadFun() {
				this.isShowAuth = false
				this.getUserInfo();
				this.getFocusArtical();
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
			/**
			 * 获取个人用户信息
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.userInfo = res.data
				});
			},
			/*获取分类列表*/
			getCateList(){
				getTopicList().then(res => {
					let data = [{cate_name: "推荐",category_id: 0,children: []}]
					if(this.community_app_switch.length == 2 || this.community_app_switch[0]==2){
						data = [{cate_name: "推荐",category_id: 0,children: []},{cate_name: "视频",category_id: -1,children: []}]
					}	
					this.menuList = Array.from(new Set([...data,...res.data]));
				})
			},
			swiperChange(e) {
				let { current, source, currentItemId } = e.detail;
				if (source === 'autoplay' || source === 'touch') {
					this.currentItemId = currentItemId;
					this.swiperCur = current
					this.selectMenu(this.menuList[this.swiperCur],this.swiperCur,false)
					if (this.menuList.length > 6) {
						var tempIndex = this.swiperCur - 2;
						tempIndex = tempIndex <= 0 ? 0 : tempIndex;
						let tabLeft = (this.swiperCur - 2) * this.isWidth; //设置下划线位置
						this.$nextTick(function() {
							this.$set(this, 'tabLeft', tabLeft);
						});
					}
				}
			},
			// 点击列表头部
			selectMenu(item, index, isScroll) {
				this.currentItemId = item.category_id;
				this.swiperCurrent = index;
				this.swiperCur = index
				this.isScroll = isScroll;
				this.tabClick = index; //设置导航点击了哪一个
				this.isLeft = index * this.isWidth; //设置下划线位置
				this.setMenuLeft(index);
			},
			/*导航栏移动位置*/
			setMenuLeft(index) {
				this.getGoods();
			},
			showMore(item){
				this.$set(item,'show', true);
			},
			scrollLeft: function(e){
				uni.$emit('scroll');
				this.navShow = e.detail.scrollTop >= this.storeHeight - 200;
				if(e.detail.scrollTop > e.detail.scrollHeight - 1500){
					this.getGoods();
				}
			},
			// 获取发现商品
			getGoods: function() {
				let that = this;
				if(!this.cateGoods[this.currentItemId]) {
					this.$set(this.cateGoods, this.currentItemId, {
						where: {...this.where, category_id: this.currentItemId},
						goods: []
					})
				}
				const data = this.cateGoods[this.currentItemId];
				const cateId = this.currentItemId;
				if (data.goodsLoading || data.goodsLoaded) return;
				data.goodsLoading = true;
				data.loadTitle = "";
				graphicLstApi(data.where).then(res => {
					data.goodsLoading = false;
					data.goodsLoaded = res.data.list.length < that.where.limit;
					if(data.where.page == 1 ){
						data.goods = [];
					}
					data.goods.push.apply(data.goods, res.data.list);
					data.where.page = data.where.page + 1;
					this.$set(this.cateGoods,cateId, {...data});
					this.triggeredDiscover = false;
					this.$forceUpdate()
				}).catch(err => {
					data.goodsLoading = false;
					uni.showToast({
						title: err,
						icon: 'none'
					})
					this.$set(this.cateGoods,cateId, data);
				});
			},
			/*获取关注的人的文章列表*/
			getFocusArtical(){
				let that = this;
				if (that.focusLoading || that.focusLoaded) return;
				that.focusLoading = true;
				that.loadTitle = "";
				focusArticleLst(that.focusWhere).then(res => {
					that.focusLoading = false;
					that.focusLoaded = res.data.list.length < that.focusWhere.limit;
					res.data.list.forEach((item)=>{
						item.show = false
					})
					that.followList.push.apply(that.followList, res.data.list);
					that.focusWhere.page = that.focusWhere.page + 1;
				}).catch(err => {
					that.focusLoading = false;
					uni.showToast({
						title: err,
						icon: 'none'
					})
				});
			},
			onPulling(e) {
				if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
				if (this.tabActive == 1) {
					this.triggeredDiscover = true;
				} else {
					this.triggered = true;
				}
			},
			onRefreshDiscover() {
				if (this._freshing) return;
				this._freshing = true;
				setTimeout(() => {
					this._freshing = false;
					this.cateGoods = {}
					this.getGoods();
					this.triggeredDiscover = false;
					uni.stopPullDownRefresh();
					this._freshing = false;
				}, 1000)
			},
			onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				setTimeout(() => {
					this.loadendfollow = false;
					this.loadend = false;
					this.followList = [];
					this.focusWhere.page = 1;
					this.params.page = 1;
					this.getFocusArtical();
					setTimeout(() => {
						if(this.followList.length === 0 || this.focusLoaded) this.getGoods();
					}, 400)
					this.triggered = false
					uni.stopPullDownRefresh();
					this._freshing = false;
				}, 1000)
			},
			onRestore() {
				this.triggeredDiscover = false;
			},
			onAbort() {
				console.log("onAbort");
			},
			// 商铺首页滚动 navbar 吸顶
			scrollHome: function(e) {
				this.navShow = e.detail.scrollTop >= this.storeHeight - 20;
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
			/*查看提到的宝贝*/
			openMore(item){
				this.$refs.mentioned.showPopup()
				this.moreList = item.relevance;
				this.authorUid = item.uid
			},
			openCommon(item,index){
				this.switchTab(0);
				this.showComment = true
				this.$refs.comment.getData(item,index);
			},
			commentSucces(index){
				this.followList[index]['count_reply']++
			},
			closePopup(){
				this.$refs.mentioned.closePopup()
			},
			close(){
				this.switchTab(1);
				this.showComment = false;
			},
			switchTab(type){ //1打开0关闭
				this.newData = this.navigation
				if (this.newData.status && this.newData.status.status) {
					if(type == 1){
						this.showTab = true;
						uni.hideTabBar()
					}else{
						this.showTab = false;
						uni.hideTabBar()
					}
				} else {
					if(type == 1){
						this.showTab = false;
						uni.showTabBar()
					}else{
						this.showTab = false;
						uni.hideTabBar()
					}
				}			
			},
			goVideo(item) {
				uni.navigateTo({
					//#ifdef APP
					url: '/pages/short_video/appSwiper/index?id='+item.community_id
					//#endif
					//#ifndef APP
					url: '/pages/short_video/nvueSwiper/index?id='+item.community_id
					//#endif
				});
			},
			onTouchmove(e){
				// const query = uni.createSelectorQuery().in(this);
				// query.select('#main').boundingClientRect(data => {
				// 	if(data.bottom < 1500 && data.top < 0) {
				// 		if(this.tabActive == 1){
				// 			this.getGoods();
				// 		}else{
				// 			this.getFocusArtical();
				// 		}
				// 	}
				// }).exec();
				// 模拟触底刷新
			},
		},
		onReachBottom() {
			if(this.tabActive == 1){
				this.getGoods();
			}else{
				this.getFocusArtical();
			}
		},
		beforeDestroy() {
			uni.$off('startLike');
		}
	}
</script>

<style lang="scss" scoped>
page{
	background: #fff;
}
.page_con{
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	flex-direction: column;
}
/deep/.wf-page{
	margin-bottom: 98rpx;
	margin-bottom: calc(98rpx+ constant(safe-area-inset-bottom));
	margin-bottom: calc(98rpx + env(safe-area-inset-bottom));
}
.longTab {
	display: flex;
	width: 100%;
	background: #fff;
	border-radius: 16rpx 16rpx 0 0;
	padding: 20rpx;
	.longItem {
		height: 50upx;
		display: inline-block;
		line-height: 50upx;
		text-align: center;
		font-size: 30rpx;
		color: #999999;
		max-width: 160rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		overflow-x: scroll;
		overflow-y: hidden;
		margin-right: 56rpx;
		&:last-child{
			margin-right: 0;
		}
		/*解决ios上滑动不流畅*/
		-webkit-overflow-scrolling: touch;
		position: relative;
		&.click {
			font-weight: bold;
			font-size: 34rpx;
			color: var(--view-theme);
			&::after{
				content: "";
				display: block;
				width: 60rpx;
				height: 4rpx;
				background-color: var(--view-theme);
				display: flex;
				position: absolute;
				left: 50%;
				margin-left: -32rpx;
				bottom: 0rpx;
			}
			.underline {
				opacity: 1;
			}
		}
	}
	.underlineBox {
		height: 3px;
		width: 20%;
		display: flex;
		align-content: center;
		justify-content: center;
		.underline {
			opacity: 0;
			width: 60rpx;
			height: 4rpx;
			background-color: #e93323;
		}
	}
}
.tab-cont{
	border-radius: 16rpx 16rpx 0 0;
}
.follow_count{
	background: #ffffff;
	/* #ifndef MP */
	padding: 20rpx 20rpx 100rpx;
	/* #endif */
	/* #ifdef MP */
	padding: 20rpx 20rpx calc(0rpx+ constant(safe-area-inset-bottom));
	padding: 20rpx 20rpx calc(0rpx + env(safe-area-inset-bottom));
	/* #endif */
	&.showFoot{
		padding: 20rpx 20rpx calc(120rpx+ constant(safe-area-inset-bottom));
		padding: 20rpx 20rpx calc(120rpx + env(safe-area-inset-bottom));
	}
	.title{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.author{
		display: flex;
		align-items: center;
		.picture{
			width: 78rpx;
			height: 78rpx;
			border-radius: 100%;
			overflow: hidden;
		}
		/deep/image,/deep/.easy-loadimage,uni-image{
			height: 78rpx;
		}
		.name{
			margin-left: 20rpx;
			color: #333333;
			font-size: 32rpx;
			font-weight: bold;
		}
	}
	.time{
		color: #999999;
		font-size: 24rpx;
	}
	.product{
		margin-top: 20rpx;
		border-radius: 16rpx;
	}
	.icon-fenxiang2{
		color: #282828;
		font-size: 46rpx;
		background: transparent;
	}
}
.list_count{
	margin-bottom: 70rpx;
	&:last-child{
		margin-bottom: 0;
	}
}
.videoSwiper{
	width: 710rpx;
	height: 710rpx;
	position: relative;
	border-radius: 16rpx;
	.image{
		width: 710rpx;
		height: 710rpx;
		border-radius: 16rpx;
	}
	.video_img{
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -50rpx;
		margin-top: -50rpx;
		z-index: 10;
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
			margin-right: 12rpx;
			display: inline-block;
			border: 1px solid #BBBBBB;
		}
		/deep/image,/deep/.easy-loadimage,uni-image{
			width: 58rpx;
			height: 58rpx;
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
				color: var(--view-priceColor);
			}
		}
	}
}
.grass_header {
	display: flex;
	flex-direction: column;
	background-size: cover;
	background-color: #ffffff;
	width: 100%;
	z-index: 10;
}
.header {
	padding: 0 30rpx 20rpx;
	.navTab{
		position: relative;
		padding: 20rpx 0 40rpx 0;
		.nav-item{
			font-size: 32rpx;
			color: #666666;
			&:first-child{
				margin-right: 70rpx;
			}
			&.on{
				font-size: 38rpx;
				color: #282828;
				font-weight: bold;
			}
		}
		.release_btn{
			width: 58rpx;
			height: 58rpx;
			border-radius: 100%;
			background-image: linear-gradient(126deg, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
			color: #fff;
			position: absolute;
			top: 20rpx;
			left: 0;
			.iconfont{
				font-size: 28rpx;
			}
		}
		.avatar{
			width: 58rpx;
			height: 58rpx;
			border-radius: 100%;
			border: 3rpx solid rgba(0,0,0,.05);
			position: absolute;
			top: 20rpx;
			right: 0;
		}
	}
	.search_count{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.search_topic{
			width: 46rpx;
			height: 46rpx;
			image,.topic_icon,uni-image{
				width: 46rpx;
				height: 46rpx;
			}
		}
	}
	.search {
		display: flex;
		align-items: center;
		min-width: 0;
		height: 58rpx;
		border-radius: 29rpx;
		background-color: #FFFFFF;
		font-weight: 500;
		font-size: 24rpx;
		color: #999999;
		width: 609rpx;
		.iconfont {
			margin-right: 13rpx;
			margin-left: 30rpx;
			font-size: 24rpx;
		}
	}
}
.main_count{
	background-color: #ffffff;
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
.main {
	flex: 1;
	min-height: 60vh;
	height: auto;
}
.nav.fixed {
	position: fixed;
	left: 0;
	width: 100%;
	.nav-cont {
		position: absolute;
		width: 100%;
	}
}
.goods {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0 20rpx;
	background: #ffffff;
	width: 750rpx;
	/* #ifdef H5 */
	// padding-bottom: 90rpx;
	/* #endif */
	.item {
		width: 345rpx;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
		overflow: hidden;
		/deep/.image,/deep/.easy-loadimage,uni-image {
			width: 345rpx;
			height: 345rpx;
			image {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		.text {
			padding: 20rpx 20rpx 25rpx;
			.name {
				font-weight: 500;
				font-size: 30rpx;
				line-height: 1;
				color: #222222;
				display: flex;
				align-items: center;
				.name_text{
					display: inline-block;
					max-width: 400rpx;
				}
			}
			.money-wrap {
				display: flex;
				align-items: center;
				margin-top: 43rpx;
				.money {
					font-weight: bold;
					font-size: 26rpx;
					color: $theme-color;
					text {
						font-size: 34rpx;
						line-height: 1;
					}
				}
				.ticket {
					height: 26rpx;
					padding-right: 9rpx;
					padding-left: 9rpx;
					border: 1px solid $theme-color;
					border-radius: 4rpx;
					margin-left: 10rpx;
					font-weight: 500;
					font-size: 20rpx;
					line-height: 24rpx;
					color: $theme-color;
				}
			}
			.score {
				margin-top: 20rpx;
				font-weight: 500;
				font-size: 20rpx;
				line-height: 1;
				color: #737373;
			}
		}
		.foot {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 52rpx;
			background: linear-gradient(to right, #F11B09, #F67A38);
			font-weight: 500;
			font-size: 24rpx;
			color: #FFFFFF;
			.iconfont {
				margin-right: 10rpx;
				font-size: 22rpx;
				line-height: 1;
			}
		}
	}
}
.empty{
	width: 100%;
	text-align: center;
	position:relative;
	top: 200rpx;
	/* #ifdef MP */
	// top: 100rpx;
	/* #endif */
	image,uni-image{
		display: inline-block;
		width: 414rpx;
		height: 305rpx;
	}
	.title{
		font-size: 28rpx;
		color: #282828;
		font-weight: bold;
		margin-bottom: 14rpx;
	}
	text{
		display: block;
		color: #999999;
		font-size: 26rpx;
	}
	.login_btn{
		width: 440rpx;
		text-align: center;
		height: 76rpx;
		line-height: 76rpx;
		color: var(--view-theme);
		border: 1px solid var(--view-theme);
		border-radius: 40rpx;
		margin: 44rpx auto 0;
		font-size: 32rpx;
	}
}
.page-footer {
	position: fixed;
	bottom: 0;
	z-index: 30;
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	height: 98rpx;
	height: calc(98rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
	height: calc(98rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
	box-sizing: border-box;
	border-top: solid 1px #F3F3F3;
	background-color: #fff;
	box-shadow: 0px 0px 17rpx 1rpx rgba(206, 206, 206, 0.32);
	padding-bottom: constant(safe-area-inset-bottom); ///兼容 IOS<11.2/
	padding-bottom: env(safe-area-inset-bottom); ///兼容 IOS>11.2/
	.foot-item {
		display: flex;
		width: max-content;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
		.count-num {
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 40rpx;
			height: 40rpx;
			top: 0rpx;
			right: -15rpx;
			color: #fff;
			font-size: 20rpx;
			background-color: #FD502F;
			border-radius: 50%;
			padding: 4rpx;
		}
	}
	.foot-item image {
		height: 50rpx;
		width: 50rpx;
		text-align: center;
		margin: 0 auto;
	}
	.foot-item .txt {
		font-size: 24rpx;
	}
}
</style>
