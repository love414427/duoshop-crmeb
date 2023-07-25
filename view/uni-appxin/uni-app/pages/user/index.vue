<template>
	<view :style="viewColor">
		<skeleton :show="showSkeleton" :isNodes="isNodes" ref="skeleton" loading="chiaroscuro" selector="skeleton"
			bgcolor="transparent"></skeleton>
			<!-- 自定义顶部背景颜色 -->
		<view class="top">
			<!-- #ifdef MP || APP-PLUS -->
			<view class="sys-head">
				<view class="sys-bar" :style="{height:sysHeight}"></view>
				<!-- #ifdef MP -->
				<view class="sys-title">个人中心</view>
				<!-- #endif -->
				<view class="bg"></view>
			</view>
			<!-- #endif -->
		</view>
			<!-- 自定义顶部背景颜色 -->
		<view class="new-users skeleton" :style="{visibility: showSkeleton ? 'hidden' : 'visible'}">
			<view class="head">
				<view class="user-card":class="userInfo.svip_open && svip_switch_status == 1 ? 'svip-card' : ''">
					<view class="bg"></view>
					<view class="user-info">
						<view class="avatar-box" :class="{on:userInfo.is_svip > 0 && svip_switch_status == 1}">
							<image class="avatar skeleton-radius" :src="userInfo.avatar ? userInfo.avatar : '/static/images/f.png'" @click="goEdit"></image>
							<view class="headwear" v-if="userInfo.is_svip > 0 && svip_switch_status == 1">
								<image src="/static/images/headwear.png"></image>
							</view>
						</view>
						<view class="info">
							<!--#ifdef MP-->
							<view class="name" v-if="!userInfo.uid" @click="openAuto">
								请点击授权
							</view>
							<!--#endif-->
							<!--#ifdef APP-PLUS-->
							<view class="name" v-if="!userInfo.uid" @click="openAuto">
								请点击登录
							</view>
							<!--#endif-->
							<!--#ifdef H5-->
							<view  class="name" v-if="!userInfo.uid" @click="openAuto">
								<text v-if="isWeixin">请点击授权</text>
								<text v-else>请点击登录</text>
							</view>
							<!--#endif-->
							<view class="name" v-if="userInfo.uid">
								{{userInfo.nickname}}<image v-if="member_status" class="level_icon" :src="userInfo.member_icon" alt="">
								<view class="vip" v-if="userInfo.is_svip > 0 && svip_switch_status == 1">
									<image src="/static/images/svip.png"></image>
								</view>
							</view>
							<view class="num" v-if="userInfo.phone" @click="goEdit()">
								<view class="num-txt">ID：{{userInfo.uid}}</view>
								<view class="icon">
									<image src="/static/images/edit.png" mode=""></image>
								</view>
							</view>
							<view class="phone" v-if="!userInfo.phone && isLogin" @tap="bindPhone">绑定手机号</view>
						</view>
					</view>
					<view class="num-wrapper skeleton-rect">
						<view class="num-item" @click="goMenuPage('/pages/users/user_goods_collection/index')">
							<text class="num">{{userInfo.total_collect_product || 0}}</text>
							<view class="txt">我的收藏</view>
						</view>
						<view v-if="hide_mer_status == 0" class="num-item" @click="goMenuPage('/pages/users/user_goods_collection/index?tab=2')">
							<text class="num">{{userInfo.total_collect_store || 0}}</text>
							<view class="txt">关注店铺</view>
						</view>
						<view class="num-item" @click="goMenuPage('/pages/users/browsingHistory/index')">
							<text class="num">{{userInfo.total_visit_product || 0}}</text>
							<view class="txt">浏览记录</view>
						</view>
						<view class="num-item" @click="goMenuPage('/pages/users/user_coupon/index')">
							<text class="num">{{userInfo.total_coupon || 0}}</text>
							<view class="txt">优惠券</view>
						</view>
					</view>
					<navigator hover-class="none" :url="userInfo.is_svip > 0 ? '/pages/annex/vip_center/index' : '/pages/annex/vip_paid/index'" class="cardVipA acea-row row-between-wrapper" v-if="userInfo.svip_open && svip_switch_status == 1">
						<image class="svip_user" src="/static/images/svip_user.png"></image>
						<view class="left-box">
							<view v-if="userInfo.is_svip > 0" class="small">累计为您节省{{userInfo.svip_save_money}}元</view>
							<view v-else-if="userInfo.is_svip <= 0" class="small">开通享六大特权，省钱又省心
							</view>
						</view>
						<view class="acea-row row-middle">
							<view class="btn-open">{{userInfo.is_svip > 0 && userInfo.is_svip != 3  ? '立即续费' : userInfo.is_svip == 3 ? '终身会员' : '立即开通'}}</view>
						</view>
					</navigator>
					<view class="right-btn">
						<view class="iconfont icon-shezhi" v-if="isLogin" @click="goSetting()"></view>
						<view class="btn" @click="authTo('/pages/chat/customer_list/index?type=0')" hover-class="none">
							<view class="iconfont icon-xiaoxi"></view>
							<text class="iconnum" v-if="userInfo.total_unread">{{userInfo.total_unread}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="wrapper">
				<view class="order-wrapper">
					<view class="order-hd flex skeleton-rect">
						<view class="left">我的订单</view>
						<view class="right flex" @click="authTo('/pages/users/order_list/index?status=-1')" hover-class="none" open-type="navigate">
							全部订单
							<text class="iconfont icon-xiangyou"></text>
						</view>
					</view>
					<view class="order-bd">
						<block v-for="(item,index) in orderMenu" :key="index">
							<view class="order-item" @click="authTo(item.url)" hover-class="none">
								<view class="pic">
									<text class="iconfont" :class="item.icon"></text>
									<text class="order-status-num" v-if="item.num > 0">{{ item.num }}</text>
								</view>
								<view class="txt skeleton-rect">{{item.title}}</view>
							</view>
						</block>
					</view>
				</view>
				<!-- 轮播 -->
				<view class="slider-wrapper skeleton-rect" v-if="imgUrls.length>0">
					<swiper indicator-dots="true" :autoplay="autoplay" :circular="circular" :interval="interval" :duration="duration"
					 indicator-color="rgba(255,255,255,0.6)" indicator-active-color="#fff">
						<block v-for="(item,index) in imgUrls" :key="index">
							<swiper-item>
								<view @click="goUrl(item.url)" class='slide-navigator acea-row row-between-wrapper'>
									<image :src="item.pic" class="slide-image"></image>
								</view>
							</swiper-item>
						</block>
					</swiper>
				</view>
				<!-- 会员菜单 -->
				<view class="user-menus" style="margin-top: 20rpx;">
					<view class="title skeleton-rect">我的服务</view>
					<view class="menu-box">
						<block v-for="(item,index) in personalMenu" :key="index">
							<view v-if="item.isShow" class="item">
								<view @click="authTo(item.url)" class="item-count">
									<image v-if="showSkeleton" class="skeleton_image skeleton-radius"></image>
									<image v-else :src="item.pic"></image>
									<text>{{item.name}}</text>
								</view>
							</view>
						</block>
					</view>
				</view>
				<view class="menus-list-item" v-if="!userInfo.topService && userInfo.service" @click="toService(0)">
					<view class="item-text">
						<view class="title">
							<text class="merchant">商家</text>管理
						</view>
						<view class="info">进入商户中心管理店铺</view>
					</view>
					<view class="image merchant-image"></view>
				</view>
				<view class="menus-list-item" v-if="!userInfo.service && userInfo.topService" @click="toService(1)">
					<view class="item-text">
						<view class="title">
							<text class="plantform">平台</text>管理
						</view>
						<view class="info">进入平台客服中心</view>
					</view>
					<view class="image plantform-image"></view>
				</view>
				<view class="menu-list-count" v-if="userInfo.topService && userInfo.service">
					<view class="menu-item" @click="toService(0)">
						<view class="image merchant-image"></view>
						<view class="menu-text">
							<view class="title">
								<text class="merchant">商家</text>管理
							</view>
							<view class="info">进入商家管理中心</view>
						</view>
					</view>
					<view class="menu-item" @click="toService(1)">
						<view class="menu-text">
							<view class="title">
								<text class="plantform">平台</text>管理
							</view>
							<view class="info">进入平台客服中心</view>
						</view>
						<view class="image plantform-image"></view>
					</view>
				</view>
			</view>
			<view v-if="copyright.status !== -1" class="copy-right">
				<image class="img-copyright" :src="copyright.image" mode="widthFix"></image>
				<view class="text">{{copyright.Copyright}}</view>
			</view>
			<view v-else class="copy-right">
				<view class="iconfont icon-crmeb"></view>
				<view class="text">众邦科技提供技术支持</view>
			</view>
			<view style="height: 50rpx;"></view>
			<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse" :isGoIndex="false"></authorize>
			<!-- #ifndef H5 -->
			<passwordPopup></passwordPopup>
			<!-- #endif -->
		</view>
		<view class="foot" v-if="newData.status && newData.status.status">
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
	let sysHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	import { getMenuList, getUserInfo, setVisit } from '@/api/user.js';
	import { getVersion } from "@/api/public";
	import { orderData } from '@/api/order.js'
	import { mapGetters } from "vuex";
	import authorize from '@/components/Authorize';
	import dayjs from '@/plugin/dayjs/dayjs.min.js';
	import Cache from '@/utils/cache';
	// #ifndef H5
	import passwordPopup from '@/components/passwordPopup';
	// #endif
	import { configMap } from '@/utils';
	import Auth from '../../libs/wechat';
	import { HTTP_REQUEST_URL } from '@/config/app';
	const app = getApp();
	export default {
		components: {
			// #ifndef H5
			passwordPopup,
			// #endif
			authorize,
		},
		computed: configMap({
			mer_intention_open: 0,
			hide_mer_status: 1,
			recharge_switch: 0,
			integral_status: 0,
			member_status: 0,
			balance_func_status: 0,
			svip_switch_status: 0,
			navigation: {}
		} , mapGetters(['isLogin','viewColor','keyColor'])),
		filters: {
			dateFormat: function(value) {
				return dayjs(value * 1000).format('YYYY-MM-DD');
			}
		},
		data() {
			return {
				//#ifdef H5
				isWeixin: this.$wechat.isWeixin(),
				//#endif
				domain: HTTP_REQUEST_URL,
				showSkeleton: true, //骨架屏显示隐藏
				isNodes: 0, //控制什么时候开始抓取元素节点,只要数值改变就重新抓取
				orderMenu: [{
						icon: 'icon-daifukuan1',
						title: '待付款',
						url: '/pages/users/order_list/index?status=0',
						num: 0
					},
					{
						icon: 'icon-daifahuo1',
						title: '待发货',
						url: '/pages/users/order_list/index?status=1',
						num: 0
					},
					{
						icon: 'icon-daishouhuo1',
						title: '待收货',
						url: '/pages/users/order_list/index?status=2',
						num: 0
					},
					{
						icon: 'icon-daipingjia1',
						title: '待评价',
						url: '/pages/users/order_list/index?status=3',
						num: 0
					},
					{
						icon: 'icon-a-shouhoutuikuan1',
						title: '售后/退款',
						url: '/pages/users/refund/list',
						num: 0
					},
				],
				imgUrls: [{url:'',pic:''}],
				userMenu: [],
				skeletonMenu: [],
				personalMenu: [
					{pic: '',name: '',isShow: true},
					{pic: '',name: '',isShow: true},
					{pic: '',name: '',isShow: true},
					{pic: '',name: '',isShow: true},
					{pic: '',name: '',isShow: true},
					{pic: '',name: '',isShow: true},
					{pic: '',name: '',isShow: true},
					{pic: '',name: '',isShow: true},
					{pic: '',name: '',isShow: true},
					{pic: '',name: '',isShow: true},
					{pic: '',name: '',isShow: true},
					{pic: '',name: '',isShow: true}
				],
				autoplay: true,
				circular: true,
				interval: 3000,
				duration: 500,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				orderStatusNum: {},
				userInfo: {aratar: '/static/f.png'},
				MyMenus: [],
				is_promoter: 0, //推广人开关  1开
				extension_status: 0,
				copyright: {
					copyright_status: 1
				},
				newData: {},
				activeRouter: '',
				sysHeight: sysHeight,
				
			}
		},
		onLoad() {
			
		},
		onReady() {
			this.isNodes++;
		},
		mounted: function() {
			this.getVersion()
		},
		onShow: function() {
			let that = this;
			let routes = getCurrentPages();
			let curRoute = routes[routes.length - 1].route
			this.activeRouter = '/' + curRoute
			this.getNav();
			if (that.isLogin) {
				this.getUserInfo();
				this.orderNum();
			} else {
				this.userInfo = {}
				this.orderMenu.forEach(v=>{
					v.num = 0
				})
				this.getMyMenus();
			}
			setTimeout(() => {
				this.showSkeleton = false
			}, 500)
		},
		methods: {
			authTo(url){
				if(this.isLogin){
					uni.navigateTo({
						url
					})
				}else{
					this.openAuto()
				}
			},
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
					uni.hideTabBar()
				} else {
					uni.showTabBar()
				}			
			},
			toService(is_sys){
				uni.navigateTo({
					url: '/pages/admin/business/index?is_sys=' + is_sys
				})
			},
			getVersion() {
				getVersion().then(data => {
					this.copyright = data.data;
				});
			},
			
			// 菜单显示
			filterMenus: function(item){
				let that = this;
				if(item.url=='/pages/users/user_money/index') item.isShow =  that.balance_func_status == 1
				else if(item.url=='/pages/users/user_spread_user/index'){
					if(that.extension_status == 0){
						item.isShow = false
					} else if(that.extension_status == 1){
						if(that.is_promoter == 1){
							item.isShow = that.is_promoter == 1 && that.extension_status == 1
						}else if(that.is_promoter == 0 ){
							item.isShow = that.is_promoter == 0 && that.extension_status == 1
							item.url="/pages/users/distributor/index"
						}
					}
				}
				else if(item.url=='/pages/store/settled/index')item.isShow = that.mer_intention_open == 1
				else if(item.url=='/pages/users/user_grade/index') item.isShow = that.member_status == 1
				else if(item.url=='/pages/users/user_integral/index') item.isShow = that.integral_status == 1
				else item.isShow = true
			},
			showMenu(menu){
				return !menu || ['integral','service','admin_order','verify_order','intention','promoter','balance'].indexOf(menu) === -1;
			},
			goUrl(url){
				if(url.indexOf("http") != -1){
					// #ifdef H5
					location.href = url
					// #endif
				}else{
					if(['/pages/goods_cate/goods_cate','/pages/order_addcart/order_addcart','/pages/user/index','/pages/plant_grass/index'].indexOf(url) == -1){
						uni.navigateTo({
							url:url
						})
					}else{
						uni.switchTab({
							url:url
						})
					}
				}
			},
			// 去聊天列表
			goChat() {
				let type = this.userInfo.service ? 1 : 0
				uni.navigateTo({
					url: `/pages/chat/customer_list/index?type=${type}`
				})
			},
			// 记录会员访问
			setVisit() {
				setVisit({
					url: '/pages/user/index'
				}).then(res => {})
			},
			// 打开授权
			openAuto() {
				this.isAuto = true;
				this.isShowAuth = true
			},
			// 授权回调
			onLoadFun(data) {
				this.getUserInfo();
				this.getMyMenus();
				this.orderNum();
				this.isShowAuth = false;
			},
			Setting: function() {
				uni.openSetting({
					success: function(res) {}
				});
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			// 绑定手机
			bindPhone() {
				uni.navigateTo({
					url: '/pages/users/user_phone/index'
				})
			},
			/**
			 * 获取个人用户信息
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.userInfo = res.data;
					that.userInfo.svip_open = true;
					that.userInfo.vip_status = 2;
					that.is_promoter = res.data.is_promoter;
					that.extension_status = res.data.extension_status;
					that.getMyMenus();
				});
			},
			// 订单数字
			orderNum() {
				orderData().then(({
					data
				}) => {
					this.orderMenu.forEach((item, index) => {
						console.log('item')
						switch (item.title) {
							case '待付款':
								item.num = data.noPay
								break
							case '待发货':
								item.num = data.noPostage
								break
							case '待收货':
								item.num = data.noDeliver
								break
							case '待评价':
								item.num = data.noComment
								break
							case '售后/退款':
								item.num = data.refund
								break
						}
					})
				})
			},
			/**
			 *
			 * 获取个人中心图标
			 */
			getMyMenus: function() {
				let that = this;
				if (this.MyMenus.length) return;
				getMenuList().then(res => {
					that.personalMenu = []
					res.data.menu.forEach((item,index)=>{
						that.filterMenus(item)
						that.personalMenu.push(item)
					})
					that.imgUrls = res.data.banner
				});
			},
			// 编辑页面
			goEdit() {
				if(this.isLogin){
					uni.navigateTo({
						url: '/pages/users/user_info/index'
					})
				}else{
					this.openAuto()
				}
			},
			goSetting() {
				if(this.isLogin){
					uni.navigateTo({
						url: '/pages/users/user_setting/index'
					})
				}else{
					this.openAuto()
				}
			},
			// 签到
			goSignIn() {
				uni.navigateTo({
					url: '/pages/users/user_sgin/index'
				})
			},
			// goMenuPage
			goMenuPage(url) {
				if (this.isLogin) {
					uni.navigateTo({
						url
					})
				} else {
					this.openAuto()
				}
			},
		}
	}
</script>

<style lang="scss">
	.cardVipA {
		position: absolute;
		background: linear-gradient(145deg, #F8E3A8 0%, #E8C077 100%);
		background-size: 100% 100%;
		width: 710rpx;
		height: 84rpx;
		bottom: -2rpx;
		left: 20rpx;
		padding: 0 30rpx 0 105rpx;
		border-radius: 16rpx 16rpx 0 0;
		box-sizing: border-box;
		.svip_user{
			width: 52rpx;
			height: 52rpx;
			border-radius: 100%;
			position: absolute;
			left: 30rpx;
			top: 17rpx;
		}
		.left-box {
			font-size: 26rpx;
			color: #905100;
			font-weight: 400;
		}
		.btn {
			color: #905100;
			font-weight: 400;
			font-size: 24rpx;
		}
		.btn-open {
			background: #282828;
			border-radius: 40rpx;
			color: #F7E1A6;
			font-size: 24rpx;
			width: 140rpx;
			height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.new-users {
		.head {
			background: #fff;
			.user-card {
				position: relative;
				width: 100%;
				padding: 35rpx 0 50rpx;
				background-image: linear-gradient(90deg, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
				&.svip-card{
					padding: 35rpx 0 120rpx;
				}
				.bg {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					background-size: 100% 100%;
				}
				.user-info {
					z-index: 20;
					position: relative;
					display: flex;
					padding: 0 28rpx;
					.level_icon{
						width: 34rpx;
						height: 32rpx;
						margin: 4rpx 0 0 6rpx;
						border: none;
					}
					.avatar-box{
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						position: relative;
						.avatar,image{
							width: 120rpx;
							height: 120rpx;
							border-radius: 50%;
						}
						&.on {
							.avatar {
								border: 2px solid #FFAC65;
								border-radius: 50%;
								box-sizing: border-box;
							}
						}
					}
					.headwear {
						position: absolute;
						right: -4rpx;
						top: -14rpx;
						width: 44rpx;
						height: 44rpx;
						z-index: -1;
						image {
							width: 100%;
							height: 100%;
						}
					}
					.info {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						margin-left: 20rpx;
						padding: 15rpx 0;
						.name {
							display: flex;
							align-items: center;
							color: #fff;
							font-size: 31rpx;
							.vip {
								width: 82rpx;
								height: 36rpx;
								margin-left: 12rpx;
								image {
									width: 82rpx;
									height: 36rpx;
								}
							}
						}
						.num {
							display: flex;
							align-items: center;
							font-size: 26rpx;
							color: rgba(255, 255, 255, 0.6);
							image {
								width: 22rpx;
								height: 23rpx;
								margin-left: 20rpx;
							}
						}
					}
				}
				.num-wrapper {
					z-index: 30;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 30rpx 20rpx 0;
					color: #fff;
					.num-item {
						width: 25%;
						text-align: center;
						.num {
							font-size: 42rpx;
							font-weight: bold;
						}
						.txt {
							margin-top: 8rpx;
							font-size: 22rpx;
							color: rgba(255, 255, 255, 0.6);
						}
					}
				}
				.sign {
					z-index: 200;
					position: absolute;
					right: -12rpx;
					top: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 120rpx;
					height: 60rpx;
					background: linear-gradient(90deg, rgba(255, 225, 87, 1) 0%, rgba(238, 193, 15, 1) 100%);
					border-radius: 29rpx 4rpx 4rpx 29rpx;
					color: #282828;
					font-size: 28rpx;
					font-weight: bold;
				}
			}
		}
		.wrapper {
			position: relative;
			padding: 0 20rpx;
			margin-top: 20rpx;
		}
		.order-wrapper {
			background-color: #fff;
			border-radius: 16rpx;
			.order-hd {
				height: 80rpx;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px dashed #DDDDDD;
				padding: 0 30rpx;
				color: #282828;
				.left {
					font-weight: bold;
				}
				.right {
					align-items: center;
					color: #666666;
					font-size: 26rpx;
					.icon-xiangyou {
						margin-left: 5rpx;
						margin-top: 6rpx;
						font-size: 26rpx;
					}
				}
			}
			.order-bd {
				display: flex;
				.order-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 20%;
					height: 160rpx;
					.pic {
						position: relative;
						text-align: center;
						.iconfont{
							font-size: 62rpx;
							color: var(--view-theme);
						}
					}
					.txt {
						margin-top: 8rpx;
						font-size: 26rpx;
						color: #454545;
					}
				}
			}
		}
		.slider-wrapper {
			margin: 20rpx 0;
			height: 130rpx;
			swiper,
			swiper-item {
				height: 100%;
			}
			image {
				width: 100%;
				height: 130rpx;
			}
		}
		.user-menus {
			padding-bottom: 30rpx;
			background-color: #fff;
			border-radius: 16rpx;
			.title {
				height: 80rpx;
				line-height: 80rpx;
				padding: 0 30rpx;
				border-bottom: 1px dashed #DDDDDD;
				font-weight: bold;
			}
			.item {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				width: 25%;
				line-height: 28rpx;
				height: 90rpx;
				margin-top: 40rpx;
				text-align: center;
				.item-count {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 100%;
				}
				image {
					width: 52rpx;
					height: 52rpx;
				}
				.skeleton_image{
					width: 80rpx;
					height: 80rpx;
				}
				text {
					margin-top: 10rpx;
					font-size: 26rpx;
					color: #282828;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					width: 78%;
				}
				&:last-child::before {
					display: none;
				}
			}
			button {
				font-size: 28rpx;
			}
		}
		.phone {
			color: #fff;
		}
		.order-status-num {
			background-color: #fff;
			color: var(--view-theme);
			border-radius: 200rpx;
			position: absolute;
			right: -12rpx;
			top: -12rpx;
			font-size: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			min-width: 30rpx;
			height: 30rpx;
			padding: 0 8rpx;
			box-sizing: border-box;
			border: 1px solid var(--view-theme);
		}
	}
	.sys-head {
	  position: relative;
	  width: 100%;
	  // background: linear-gradient(90deg, $bg-star1 0%, $bg-end1 100%);
	
	  .bg {
	    position: absolute;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    background-image:linear-gradient(90deg, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
	    background-size: 100% auto;
	    background-position: left bottom;
	  }
	  .sys-title {
	    z-index: 10;
	    position: relative;
	    height: 43px;
	    text-align: center;
	    line-height: 43px;
	    font-size: 32rpx;
	    color: #FFFFFF;
	  }
	}
	.menus-list-item{
		background: #fff;
		border-radius: 12rpx;
		padding: 30rpx 50rpx 30rpx 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
		.title{
			font-size: 34rpx;
			color: #282828;
			font-weight: bold;
			.merchant{
				color: #E93323;
			}
			.plantform{
				color: #FFC552;
			}
		}
		.info{
			margin-top: 15rpx;
			color: #666666;
			font-size: 22rpx;
		}
		.image{
			width: 180rpx;
			height: 108rpx;
			background-size: 100%;
			background-repeat: no-repeat;
			
		}
	}
	.merchant-image{
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAADYCAMAAADxhokmAAAC+lBMVEUAAAAvLy/+6ef/6ef/6eb/6ef/8uT+6Of/6ef/6Of/6ef/6ef/rXAzMDP/6+QxMTH/6uf/6ef/6Of96eT/6ef/6ef+6en/6ef/6Ob/6ef/6ef/6uf96OfMPDv/6ef9TVXwurHPusH/6uf/6efkRkb/18D7U1T/6efDs7THPjf1S037UVf8S1O7Qzj8T1fzSU7NRDumPCiPRCbOQTn/gEeUSSxkNzZ4OhkiLFLM1+25yOLHMCshK1IiK039zsq/zOTpg4DsqaXH1u+7uc/aqaeyhHL/6eclLHL////o8Pv8TFRSY8n/0Nv/a2vD0e3NRDv8Wl7cQh4yO2PHMSz/q2v/gWT/0tHqT04wMDHm7vq5yOH/oLL/5+X5qmzrkk95OxshNV8jLVPO3fbV4PVFS4Th6vj45/zK2fLH1O7sUlK+zefTws6bSy7/qaH0+P09QX/7p2f8aGg2MjLc5fb4pGb+095nUFH/398tM3b/u8rS3fLwVlb+5OHyY2P7ZGTu8/yztMz/f0f44/j+3tj/ycf/w9D5VlpFVK0+RIEnLF9KTopPX8H/z8z/eXn34+T/r7/u2drxoGNNW7bqkJOgo8LFalX+1tT/p7jkUjPul1QkGVL/urY9Omb/saz1Xl3/xMGtPCX99vtcasiQaVfRNjT+h4f3SVDLMzDw3uLZOzr/cHH9kGL/3ctiX5I0OXmSWlXhP0D9xpfnYkD/0qLyRkyRRSj+0LT40+ezwd1zYl/YSEPk1OBsdsmvq9rjS0n+l5jgys55gszabmf6elyFQCjWzuD6r3smH0jrQ0fHvtztpZ1CSW1WSVLwb07qeWKjRC6Ym9bvysWGjdH8uYnjhXri3emoeWTPTEN/UeuMUkuZbvfNoZOzqLLctbGKgp85OYrUXldDPT3qsoyNe4BfPXBvSG/inWzIjmqdU2oUEhKdl6hydI5NLlCOYvWcjI1gZYNQVneuWEp/b3C3a16smpu4hINwO0/Dh739cmiKjLnLc4BzXKLQQiaaiK88ZYbPAAAARnRSTlMAYv31MFIHJKFq38P+RxL3DOaXHK17F+7iW0HO1w+67P7+jYMia1hz/vQ9kahazXPYNI2g1MEh2c7W0c+ec8VvzMeXm5fBDOYbpgAAJcxJREFUeNrs3MmL01AcwPHwsidS2po2TVoKtkj9Kzz+9OJFXBBS8aCHImILRYVWEfQgojJFEMQNEUF0FAahIB4UBA9uIIIn9aC4oAfFkwqCL0lrbdIlW9WXmc+cOuLB7/x8eXlph1qy2HHJ7HKe0XXWovWxNl3XGYbns4lEkqOWBMNleV0sp5WinC/kUqqq0sNUUyonFfJ5uagI6XJF0xk+sRTcD45nS0WJBr+QKuWVssbwS7mnyjJsRsmrCEKgVUkWyiK7NODjJRlWrGSCKMuO6TZzKyVRzy7FjhafglFQSi7ry5diRycrwTi0VMQr99JoU8uZCJRpmADRkpxml1OLGLc8I8HfgVICu1jnmtNLBQR/D10QRCZJLTp8WkKTw8hCMQU2VFCEUJQcAkC4NZugFpVsJQeTSSxHUUweWZ3T2dAXA4Hu/cgy/OIZ64RWpGEyVaNMTA6wYpYKjc+DDUnpxTLWvKDCNHJvmyCYaVgqPK70x/16UYvdVCf1TEbnhr7DSjCd0hs6Mw/NUBHIDF0Ainq8UidLKkCqnPzzIqiCBwXe/vtFcwIrVHhJwbE2KWycUmu0NT8s1afLNHhBlzjz/7tIAyZFMNJ6zr215qm44BSwlPqvNQk8otM6//ueL6/x4TBiAdwKsVmqHaETlZSvI+YU+p09J4WSo2EUVWCoeNAQDLYNiTQN/xlUYKlYSKZVhNQSZ413WaWjgPylpCeTxHgcgSS0Url3eU+wkdAEP6VpRWMni83dCxf1xPA58K4Ql0X4H2BS4J2kU4tKQhOjUikisBjtQx6sXjmOOKBlqXjgyjSKDNiM+WfLwrjfbaM+ukTFg5aCyB16tsFSt2zwb9k8/EbHY++hSxC9+WVW5s5pW9N/6S4M5OKwlicEebRU8HHudheszqe39pzuhAqNlLjs8kZhimjwLz1xZc6zpwsLC8/szgOdOn59equnr7ojtPWkIcZEGiyGcfvFq+vefb106dLzKl43tv6paYb3xh0a5DiPdD/03M8ba/x4tGfPnkv1Dc3henhOmx5tcIdGIkU0brwkr9hnTjuv71sTJHTHGTr4Go3JRG+mOU0YL28NtHFwO24XJLRzoWiGCq0SfZDHF2Cau0fXRBa67tGo0KhM8F6aSyOY4sSrMTX37R7rFva86g7t8WLo2nXYFIKft7AqTLNz95jQu7ePZYWuRx06T+47IbMyTGPggQ4auuPctIVaOiBF7JEqp9EwzdzYFXrfjbH22EtHM9JdB6jE3oYvL8JUd/EOOuDF0H3DsqHenKA+JTRN7LbDw0DDzn2BQztvwXG7ziTNaaFJvQvP5mGmoR2HSubr5qTQ9biGFtHMQ+O14vQgM345SVyXjuUyzDR0/1w08MF/XC6GmjrD0NjzjtcTpNGPshb2xmN7lxTQLENjty5583rBrTs/3zZgWIHMGxYmBzMM7cOt1zddum1wK5J5Il1Gswt99lHI0PMGuKASkYdK2QJEHnpg/VnvvrycdzpkmKHjsbvTULDQ0du9EzyRiLwWJhUgLTSZp6RMjrTQhN6uiDRpofNEDnRSQISFpisUiXgJCAudJ/MjWiJNWGhCn8xyChAWOkfk3o7iVZ+h9x2Zhd37vIZGZK7Q0+9W2od33bGd/GD6cTKMB3M7toyy4+Bub6ERoW+84wSYzLhwfF2ULu9dO9LF795Cp8jcQ1N8Hibbe7mfqHHgPHagEbL0ubWjHfQUGglE7qEpSk/9Ht0rc7dvzxngcOqq3efA+dpmS+38gVCh74QITfBn5Co0WNDdj58+f/n86eNdNCp0w87cT21PuF+9tePiRX+hY/Ee9P4SfeXVw222h6uMEaHPbx5ilm60av60GnboTZv2XgwYGqUpQiXygJ1Y9RknHpR2hT5QGw5dO4BD4+/5UvsdetOhi+NCx3ThoBjV7PzRHOdB6buGI3Sj5YzWaoSYaAwChUYVDs8Gkb8PWURm523DPjpCWwuHa6QDCBtaylIUX1Qr5JXmFNz5xXpH6E9XHKFbm13O/4PQKmsdzZC4gGQlMHZ+2ebweW4o9MjVuPX3QyOFs9+CIpN3eqcj4wS+Drom+r8MndIpLCkKBL5LKQPGi20uH9vTQrcet/DFsFXz9RX2YkjwB2Y5Aa58cnVev9OYErp27VorwPYuXGhE6r0Ktjxv7HzoCv2mPSV07XH1SetvbO9i83FZRjJWrXd2vvWuazh3Hc6Brj7Gu44DfvlYo2Pznhkbqxquvd3Dd9X7ZulBaNeN4eNmpzWrfXTMnnz3ZJA79KN31Wp1Yb5tuO8MBwN9rdX4y6ERyb94hhPAWOFco9c/7+DS9xfaY886njSr18yB3u+B79BxO+/vnygZd7+4Nh3vq9izwUQ7Tklb+AfR3Ii/N5PQMXuLweBE6cSr4Svh+0uPrNA3HQf/B1r9heNJFcOpv/3V0KQ+WLFUEMDw/u4sjvzOCtl1P2Fp1awFulm11Dc2PIgsNKGPvi2cDJjxcf3QlsM2mOhDxwfPDLF71b7mt4CPsoKERgTedg+tHNbDlfVDE23rIrAZ5/BID1wLG/r4uSChVZKXaLFXcu7Tn3crdsVn3UPQs/fc5eO2q3jRfVLtu3Y8iMvnjgUJXSD4tjChwKjSvSX4fhf6f2zsPbTpjOnB27dvP3SqtvtnDgeBMwcJLf9i71xj4qiiOK7Dq4IaXkLlWZFgaNVqTTVq4tvRii4kJJBdx5Cwwd2uYmLQrCybatyyTXTdVlT6oSFYpDxMVYhUsTxaTJe0+kFAt1UrSoyPxESNrxg/mHjuvM7M3NllhhmVjf7pIlCa6/nN2f895947u6m31o/OgXeuTP2oKu6k2RAV6ida/vqrr76W/n68yYJMgy48J3WlOEXKKBb/T4sJe5hVyC+D/uo30Vsi/4M2qAoMg1MUeWLGvsmxCnFNCHpeMA5LnP1md8ErzklZQc2Bwlb8necfg9uJ57V3UXK9kUhk+SvQrzzoD3v9FsQevPs/49GZmhsqop8R0u+/AlXH88/jQimSBvHHdr/7kHdoHtXBtT1AZkFvTNkXuhMTGkEGz54+/a1Y3CFnlQTQ8/xv3G1F5kGnpd7GN77vl1rBTV8SzQPHcT+bGPQPDyQFfZBdqx76/PPP/zzuVwn3elL1RTLp07rRU95A7NRDsYcuWd7HJQEtTJaHE3BmH7+XCD5L/9F/0H909XiQS/FFpcvSKNDeVo/L5W31uRxxNjFocTUklCCf/ffaKz+X0jclw66sdq5j4q3A2NfqhUecSQz6Z8HFWX3OB+XM7O7uBHVbBf24BDrt0nNSUJlVjIZzNOZp9U5OOhyuSYfXEYsmAi2uOs3r1Q4PPvjg0yLo7s799/Pa32kTaDY7FZeV0jXGwYz4fCShvV7X5KTPB494VB/0148JfeFBHc4IupvHLKLuFtGb/EDQoipS0KUz8lWqiLtcnlaHy9HqhS8Atq/V44uVFeZrdPsTT4gN+riObRDOAmjkjKT33m9OeynQzKWpRzpTqdyM6yGXecYeeBCX9pDsDtxwc1ZuplIXEOdIVN0dxIzeTzGzDhqUl6olnqgs4CwYBzwcrR7yhcPlI19cf5vq0PcFd30tLpKGkmQ0zbSTT3NzojyaTbl3YMnMSlfpNpLLBC2fywJj+Sc33JaBv3mB5BzzbJKM7kbCKvN43NQHBVooPVLpxcEyyrKVKnNACvNoSS5LxuEQfkIK6+uvl/7BJVBEU3MhldGdtA90Wqw6kHRF6pTTmpfVjQZ8gk04xFwWjaNVbF6Idwc6Rhi+6oAimpoLqYzeq2O4VkGjii9LkU2tzEvVpV3ckcQ44CGmeWwEmuHj8u7L3Ukyer8u6L37zYmaDDGpz0sJ/9C8OCYTcCltAj6pjEMmH/ty/DC3+ICow0kyWh+09aoDVZyTAqi17+Q4IlccDs0XDhk4ac03PfDA+ePj0r5sKFlG61tH515z6kTQOsquSr9wvVUguVnpRWgcFxeqVKGoOFyUceD8eBwWT1EfsoY82v7JEMXkVVxUUrCeWGdtyN6Yk4Gkc1W62eXyoXF4ExmHdxNSFrZXzFUd3TaCRtbFZRvOS18v3WJuISPfz0Sr6AZwaLniEIsMNA6ZfGxeBfpNxKvXGe5fW9HRbRw0Kq00/+L0otx/P7VLioV71fUv/M2TLp9D1zg8UiPOk8eEpudCujPs1utXOg3IJGjM7MKq8zKy/t2y72ImyasAX3gDcPYJWUtXHF6PZByBLxEy3RfSax2dtEMT0HuT/gF1mwWNsNOKsyuqSv5F1iVpSV62BRwa8hmNw4vGQX7imBTTPPCh2qLvTprRoL30TAj7AMn+IGdDoPn3DUZxgpjsf4R1eXVNzdaams3l6gN2TML7Egr4hJ7kbYI2Dvhm0uXw+uCv4qG3PpzHhA4mAo0L/52yTwt1mr2TIZOdf2lVThpu4EcO9LX3HdjdyzF5hRf/3TV2zeWVlffcc09l5ZVbNiurjsLitNKMzHNyCyjdTjgnalWgniZ7ALGRuNsb57jg4fHzsS1cDTSoey/f30GW2g+6tATWbIuqRNLB/ucawhB5uOHRQ/1BmB4v/junxuotQFlS5eUkrXGxDp5O6Tl5WpXpGQcPW8xustcyxbHR+AiEA6jf/PKbb775dvlgMtBvU3WENfn1X6UbN/I5/7EGjDz83AE/l7Yh/W9DXX35EBkHUfNZjSopZbXi4pjQVKsitIM+1+QU/KLkh3BA7/33X3/x7iSggfTja9W9x0FKyPAz4EwrT9w9zCf/T6FD6sgbDvVzTNnftvJ0Re3g6IRqwCuVpEvKGJbSlM83MzMz6aCMQ2rEPbB5OEWd60gG+mmYDtesmWeeeea1h96WFeVAbBLQVQT0pvphTeS7+sA/8v+mI2RbG0GjJ1VJXSM3LcKb13OhfftCitu8o7FPQd8vYKuCxiEAh9kwbhw0YLaip2e++OKLZ5SgWZTey3QXVZCgXhjmIx9SJjWQZlQL1+XXXltuU0Y3Eg2PDSlzulrkfBHPObh8+pdffjm7KJPmjgPmjz/+FI1DcGkZuBdmwwBjADSeNhAf5j+BtKC5hEVzIUnpzMuKSRDvDdORv9oLv5SD3fDV27Zv377tajtAX13byGtwgkrpog1CKb34ScuRhx9++KezUlJzm4AzgJb8QsxjxZ4h9I1eA6Axpy3pKXjzQwQdxYEpgQeXZBTyYXGLZ+TIUe0c+SUpp6+9DiIHbbMhq8uvaRSk9Ksry4k954hYz55oEcY7K84wQRF0q2pZQzUtwnQYNQIaZf00qUkFwTso0o82kRBLRdIXtLTYR7r6xkZ6vK1Q1pUyEmgY7sTDPOkgSxR6jwf9vUdGS0zDo9wzhHNLI+scNNP7rhS5Yoo65GdBOQLpc/nI7SJ9tUx6CM1jM6k1ETS5sETLfEof/lIArVwc9UrLpeKBx8l1DxrMY4XOsYYDHK6lnYuRX2HHfCiRHkXSV97EIugT8oX9ZVEGDZpMZBytfNmx3kHDXLNCR/5chOPfdSGTtw458u3X2kB6s0R6DBulQyFp7uaWZdBgHpwAmic9o+gL1fU0OIcvzuiCfuRJO2UJNOY0RI6kmzhpIf7q6zDybcjLBvdQmNWrEYn04if4DPoFXJojoAH19zPYF0rA5XVTnyOmC/rJHTt2OO3Sjh1PWgENAtJU5Pf1k8griqBSuA4j315uT3+INi1pV/tuoZ4LvSINB1okGT3/O68YHjQQgeMGrcfni+qAfmSHJImVRT1CgU4ryzGhW3XK213Hdvu5YnJebxtGji5tSWKRN8w/hXDAEF8HnVYMt0zIC6vM43FAq28cQB1nQz3QzraOgMfjCbjbALUTPtYgJ/mgQOddllV0oQltbRRERV5aoAa9zaYGEVMaFe7jMKMRNPcWv6MdikvGgXuGCDspaGeH1yHI63bamdHm32qlulbMMfW6xzGOuchu0JmZCLpxVDXcc2DJUb7qQOsABd8aH38zxMV1Kg6E7YsnAu1scztQnjaCus0dMKcOnjOV0cXpJiOH1hgrD9SjfnZj+gXX2Wcd1TVbQFuvGWzEWQH1apDb9xtwxuH2iVsTQY5jR4TKmTYO/jucDdWggXNAgoyk27wOc3LrZ3RegfHIt5LIt+hHvivERu+8Thn51RZX/RsEhZtHh+kLe4jbRwwah/tpH4saEc9E+8RWRQUbHtEEoN0aZgGYE9s85kHrZ7Q9kb/qD2HklkHXXNmACu8cIwMOKy9se+i3lsSgowFClDYO0bfRpNWg6eTtcEKam5QzgUdXXWjEM1aN/BhGbh10jXhRccBBtUvv6hf8WeXRKKZDv+IQfdulBxoTWmUeO9Youuoozk8vWlUSZ4x8VB15A0Zu3aPLrzo62xVWDdgFpIeH0DkWj7TgcFJriKDjeBRaAVta8fAkAE2bhLfNaV8dzaZtXE3Z7+pG3jiBVUDvGxi51aqjura+vv5oc5fyys6qKsr2sy2yYKgPPiDewSlAS8ahPEsqrU073Poe3eZAoXc4O0yqjcpo4wqtQOTAWkm6eViZ0u3LJxA0idyKd1RfBcMR1GEF6VFFSjfs/k0J+uXR5tlaslSKu7Q+9QateonJaxy029nm8ZqSTtVhXP4VncjHsJYG58AUOwGR1zfP1n+w9qXSa+oFzYaVTyFM6UNB5XAv893M7EuLCDoqtyqa8o5P6qUpziBo6FrMl3cWMpp5QYz8aJeCtDJyP2Q0Rs5fgearLKU0jodPodEhMaGhuJOH+0A0la5NnHI2xD1DNA7etz0LPU8xxq2jzW1SHRYymo28qxf5oNwYH+CipxG0OE/urFl7402TBpuG6ye1hdziJ5JRAWgwFWEDU1acOksqGYdjqWfPXFR3MvTqTYbmtVpGp+WlCf/R0cZNK1LkOzHy5mEx8kc35uUdf0MV+QRuWttGunlwTGz3WVau2h+G4cRp+RCePIgtCPUF5rJ49m5hYM+ePT1TnOHyzhhbWglBF59XUFLGsmUlBbraDJELUuS0FPnlBaBtCFpqGy8vX/tK9DVIWtbOZgk0tyxm9AkCWvSwcD+CHphbWJhxeX1CLvvIQYPJmaXpnj1Ez55ijDUsboMNy+p1NAoW33I34BqTTuS1mNOSuoSeZYu06E+kiLyyxkITLpNWzsDhMG8d3L5XpMuKw5GpAkHX1dUNDExPT88tLc2Bpgd6eoCywLluIWqoBfeQFtyILZvJ6LIsuGmBZQpzE0demyhyOAVQvr0FU4w3aUspDSqH8bD2wBHJIuniaawlFcPdF5EPhwFo0LPAVqueZ+vqlkaMLSrBDw2BNpPRaYXn5ReT4zD5ibThljM0aRBEeMsd27WRD/EpXW3pZEe9oOYGDemGlRNYRSNo2CnWgAbUz/ZoYAPnuukYDVog7dUukzqN9CjJM9q0/B/VJ8oxKnKxEquxto+FNo0iT6Ghox9Izx8EDWqnQIu0Ce8e+Fz3LA964BQNmgj6QI9cQrc5edBGpJfRlnbBz4ikdyaPHEFvsQYabVo9HBnw5SPC8+dlxX7PMXmhFEFr1NNDPi9wNGgRNW5lWZIl0ItnjEYOKWYfaDQPHA4GnK090vIwDIagw30y6OkEnMWUnh6hdsGtbc46lR/w7ZPWznXUS5rVjbz+SMsRjJxoqxXQxKPpmvIe1MTL6k2IXbsp0LQE74hpQUNO2yhr5zqCL+hGHlZEXktCR9CVmy1Phjgr0KBPyrs9Ysso94ZRBK3vHTPMOj6p5P9otcgnNPtcV1qqOqBHoi9smBoN98ixjo7O1SX2DvJ5KbqOQfe+W4/amTTy4Qmso60sLdEXdgKHG23UbJEfC64GGk16av2CZppW6lFH5b5Y3vgYGmvEFLMVNF7Y8CgONygPd9IwaFCPUOBx6xY0GwHQqGYp8glt5DgXbrEJNBY6O/HM8JB4Xht3BNA6mKW65CY9MMOsW9AMWAcdedfgGO0cMDlhRtvg0ZjSzcOj9HUdxTs9EPQqJr0Q1VYddspaRocIaFQzFfmo7Bx4d48tVQde2FnF4bCTw/j80bTgzELdKiY9N0LV0XbqEXvKO4wcFqWTRF5ppQUvuPUMndJkDVz7DJJ/gp0ht6DqwDWVdI84GyJo4GyvLDYs+pFTJo0nPi63ADojRMpJ1Ky4SXtSe11HhyjQ7IwSdI/GpPfws6EGNB4ndbuldQ74MCn5X2lB44E1AwqqIz9KR441h2XQmVWlN91y1VW1OB7vHV2jY9p25STed1EK2sggaPQK6vsFhgZNFpW8wppSwOJiB4JWvp1RU2+QNSL/C++unNF0EeExKvIx6q7itSgLVL1Z3NTCvj/cJdaSw1hKSneLZxGV5IigMYM1KS2YdJQCrVqQ9nY4hdOkJuXUB835e5uIQpwxm44svreSPHL0THhJAjvuVdakNFEYJ15IaO1gF7Ese0oNek6nwJvSgnZqDjR2EGZuhzl522jQHCdhBgU5o079Ht0Yh1WRj9mCOVfUFWgezcqjS4OY0GSwmgtzRWUVUqCnT03XUaZ9itOCDugcCHN7TYKmM5oLhgBzhLx/Gaa0AS3WJ4wcExoiL7fEuWRDoSCsPXB1VjBrvKy7NlUUyspJI6AHlKBfjM7ombQatLOD2gQHaG1mRYEOhgAveUWZ9r6+/ohRlwZF9CMHs8b2oRIwW3zBUUan1FFvtQxKlzXcR2VJTAX6KTa6RHXhc1ENaDQOlXk4TX5oQF/SBNoNmHkdiDT5OaMZvXrksA5tURdW6NWUzarhxqTarqGJReFeFtbNMZYbmdOa9PQUpwSNCY0KrL3yQNDImSfd1GsYtLa2pSOv3GzbK45y751RF5SoWemyNkRo0NMKrAPQBXKxaaqSVoN2O3QP0Fi1jkuIb7SjdjcFjbYtVF+MkUtFgGXQ5zFUO0o9g/Aobx+XDPSeP0glx8wMKExaWFdSgQ7olhBur0m10aB3I2ZMaeNVB71NOys4tB3WUUg1SfQW2phcQz/nZzUaUYJ+kb9q0QUkLcyGUQOgrZd3TU39StB9EWMVHqYYPpnpk7ywmmRJRdkJVrLC+sdZD3Ba0HMKo3iKEw7zLqlNemmEsg6aWkfApKiqI0SBNpbSoY+MRL7Vrvev6f2rvTMLWSKK4njZRvtG0V5WtC8vET3UW1QvUkaLwSWKCoqIskIDzYqENhVpwzK1gqDVSCiSNstWS1spolUsyIr2ohU6dxznOHPn2piTT/19iPqE6/l1vv8599yrPmXmK6Kmlrx/1yt9QzJO/rFrvkBEPzmL3iFUQ14xxP5Ohy04YUBrS+mtzLAUbzBj5FWmdGNpuSly0Kdl/62X8T00StC3EDQALcgA3TV20vQoHEGrvqNw1t++RVkGerXcoz0aNy1T5KBP4754HyY09B16fDchZjRbfU/j2I520mVAS9ehiVAQ0aRPkVLQaNLoHMBs2pw/PqaVHyrZp8i7DhgtVZTRGDkmNESuh3fAdUt1j8a+Y3l/nEMD6AVK0DcQ9GaDnD+atKEUNE1pNqGXzPqz5pQHTbZ6SvtoEG5aNF06QNfEyPUB3bYp1t7UPTWrsqa+XD+Nq7mU1mE4haCvYFRCN41blr0IGt9xL9uu6ALaLtsZejyY0pWM/08XI7cdhcjROnT6JnVi33SPHYLvD/qvxc/gTYcFyk0AmkRhTIfmgdUQfiIHjfUQb5Mu0aA/gIaUnuKJhChmGCu5g0FtKU0gx9gTLWvQHrdh5NWcf4M6dSjtJ1PnSha851ju3XP4DfHF44n7DsE2JniD7GYLQYsWjX0fzpUuKAb/0mVS/BiJaVr0J9B2mN2BhGwGG3HTlNaU07LI5y3fv+dwjpDctcT9092FdB5S5UypQWvZelt7pO6co7pzZ1Pqru2m843N54zbctduLtiz50woQos4P6NPyX5KruzGudIVBF3yuShz58puk5afIWk6YSFTFuw5E6SQgx7Yjwc1dHgY+Z1i5J9tN+1vsn4AnVs8euigQQOHDuiq73fYEEKc9tUgu9NJEtfekH7ZhDOezT4kxG5XO4bDY3C8C431EE36FHttFzRnTvWf9bNCDjriNZn2n4kAZDdsyENuzWNpWeS2HDFajCS3OPupQZ2uXRvq+WVBrMjDrDGR7eez5eN+5odM14E3dEHYTIugb0iggTSqyiNx9jap/YyJyhui2Qy0qUs7eWC5pkL6WR76s2/Ih7zNr9M3mTWuN4Yvf9wGWb33Wv4T7xVh3uJ1RgQNLl2shreMEmhAreNDEHp0cL/J5ALt33OmkNLMpgUPcLdu5bqK78O1RPwDpNinJu1rAJrMtzyESrh4sb8MaJx13DAw9i1Vw7Mra3IlbKvX5HJMBTkAdYhOTSMqKS0eeZXp/Yg/+yln82cXJ7o11B80K/IhnrtmtOT4nHFMSqfO6ocC9Gj8ZE1AOxeYXPOmFhS2ekPuiJDSdqIoQ6v/eH5L3sQ/ZY2WD75edXQEzZfx2ofsJ0uiDGg8yjp5gagXyo0U9OZagI54rZDPRdImSOrQgojsigcRklnSasKP/E32U75fvQZ6fnMeXz6bzfLhGnovKzwFP7sXXzV2eKJJ764FaHLGFJ4qaZ7VBKgLKY2eUaTsDtKDcr5L77XFF8ct/taNdALdoDxokrPks2Wdg5ySLNrHMXBq0ru/1QB0cL+VGgemNMh7hqY0Efu3AmaPm56Uu8uOQsgbi2VxnDRtpQtm3Bny+5x8/qHsn7ht9BXC6/2EakhBf9s17p9o1zcK+hFUwqklcgBnmtSQu06hzRAxRyhmuI9Qvhwa8/n8J0MbPWohzjr48mfzlkRZcznLDDoY76B7w5MU9OzjCEdPziujFPR3kxK01eGirM+4t4rJXDy+DbqlcsjtprL5fKJeX5044/QOBbX7ACodix0o0UH2yBAHHawMJ06K1XA3BT02uv5faHZ0LGjHOQXoMDj2vLAVSO8JuYvJvEBMZo87EmHKIWEiHyYJZnf6zKNR9ouruHJzr3WcItztzIaNAHvsvxYFDU0HymWyhudNdQBqwT8KzhyCuZ7o0iGPssNzlom8T5Up3VMloysBfQEHHZxaWSvQ1DpMLkUtpOQdQBrmH6FiMhcnqR7s8GoAuqOBhfPoMKv7gu6uZky42EWjRTMZT9uODcsqorZOUGWgjcE9+61hyaFd4bCLoneI/uHdA5gVtVAoh6Rs5PcLOty7StCNVPo740RWMwW98jG7bBx08ItlpaDXzVw3cQddUzNq8RR8AZB2iJytImG5f0Qk+1DbHSauqgYOGlH1Jxo3VcnCqzzQjwlvdnfKgDtcKgKSvGMjgH6iHdnMiQtnC4rOnFkJaFjNA0ntCjuEXKbZPc9lFf3DJfiHaB8oeSu99x0P9Mg61aqdge1s3jLLzRBWW/fQoJKwOOggTjo/z2TSmcydVA+PEAI0eELboR30uujsotZO1EhamkevDu0RvNkFeRwImM2BqUDdGpb8g54KIGhlRhte8UCP0u9r1VHkMWe5iUbC6e7ohVFCIndiEJuoQCyTAgM8cbJC0MsgnSskjaDhRWxdsN/lCJhRADtM/WOe6B8RTGloPzwHRdG0IC95oJvX0eHaLjvx5yx3VTleAoxFiyZOd0YMDxXYtHXvrcKd0jVaOc+Wa+I67aAF49oazJgZBVzoH1AUi5SPXJwk6fZBWp6uciy6etANVQZ486+qg36nPGkhxdndKTJlU8ysotidX9B2VAB6oQL0Qu2ghWlG6A7+d8uy2iX4B0XtXeCmlI/dpphRR2g1fMcBPVyHXXgTduP9TlPTgQewuy/0SJs5elHo7zZqTOi1CtBrtYOGCagbMTOow6X9R+TIxWaT5LpNI3/LqYVdqwfdsA3rHa/YWkj12MA5Aj+bCph56r8B+zvtoFETNffRcPYdM5eRw+qS/GPyNpkWiaB9r/hNh87lEKshu9xDwmmjc8iZ0fgfFYGerVRUM2hPCjmraqrVJPUfX5PTS7S0CPolk2HYdFStXkyH93CHatMxn3MEvuE99BhUATXgP4TTrA3RvwS9QzNo3q9VIFB8bQEr3b8UUR9YKqmY0UQR+TpsOnRQoy7KRDVeVW06btJbJptog0xkR+A/MsnJBSWT6ViAMWns77RbR+UZ/UCdcRpfG8AG35D84+vSRQemp2Pp9DYErYh8pqjhuoBu2FfZeCTeqYG+FhNffSbldpKSNvrxZBQL+/0Gob97opHX34LecY8HGZWMxWDWRK2a/hGWXmcgBuYhgMbIZU1HV52m0spe2v9W7RfofGnXFnFKQ9LdnycrVcr6J/iGdtBRJWitQ5IvP+WY00mkjEoHHML8w2oNB+TPn34bI9e5FqI6Kerh3ldqJeG6GUXTOjIlcZJ+OObGczQElnVAMmkK+tAzbW6r8I6Fmgzn2fPn7wOlu1KEzJA+HXZBT836edoDjuh7rOcGnFVj+RDPqbrcTrNcUGPuL4Mvit6BoJm0psoJjfTnzLkXOyp26bUaEnrZ84+ZZMGyYEF0DA5paipmNcV6OMcYXupZC1m1aGPgbMIR9OufZkbnt1Nt4YeVhF/g77uhv9v4Hf62JaqVNMuZrxcZxYJlleT3gIEUIUZd94WsGjWVkZ6/oxLQr99DqHxlnj95smz7F/qcj8sqGist1PL055zF+SnNJ92DnLiq6zCaVX0Zaf87FvQXM6svgFlAffhcGdBfCs+5/zEz+YW2Ji+6cO3ahVFNdRCNS6sCfNIxj++tzrWQJd15DAqW4zcdqAAglFBnuKBfS0/68gLg6asXsEK1KY1KYXnSuRaiOnXGnCYv2eWuqyQAgEbUL84luaBRcBSop6IfKwadNPOVWf2Q3a7U1Q6xuRYN7od6A8sUHwVdOr+T0fvXl0r1+vAWNYnPQs1cp592vN9SsXby9ZGNHDK6uVbVaalJi0sEV8/ER1GLVWSRa7G6LP9Si/UWG3lLzapj+a+aqE7d/6qJ6vxXbfQbVI9DA2KLWF8AAAAASUVORK5CYII=');
	}
	.plantform-image{
		background-image: url('data:image/png;base64,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');
	}
	.copy-right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #CCCCCC;
		font-size: 22rpx;
		margin-top: 40rpx;
		margin-bottom: 98rpx;
		margin-bottom: calc(98rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		margin-bottom: calc(98rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		.iconfont {
			font-size: 60rpx;
		}
		.img-copyright{
			width: 60rpx;
			height: 60rpx;
		}
	}
	.menu-box {
		display: flex;
		flex-wrap: wrap;
	}
	.right-btn {
		z-index: 99;
		position: absolute;
		right: 30rpx;
		top: 40rpx;
		display: flex;
		align-items: center;
		color: #fff;
		.iconfont {
			font-size: 40rpx;
			margin-left: 33rpx;
		}
		.btn {
			position: relative;
		}
		.iconnum {
			min-width: 6px;
			background-color: #fff;
			color: var(--view-theme);
			border-radius: 15rpx;
			position: absolute;
			right: -10rpx;
			top: -10rpx;
			font-size: 10px;
			padding: 0 4px;
		}
	}
	.menu-list-count{
		background-color: #fff;
		margin-top: 20rpx;
		border-radius: 12rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.menu-item{
			width: 50%;
			padding: 25rpx 15rpx;
			display: flex;
			align-items: center;
			position: relative;
			&:first-child{
				&::after{
					content: "";
					display: block;
					border-right: 1rpx solid #E2E2E2;
					height: 56%;
					position: absolute;
					right: 0;
				}
			}
			.image {
				width: 106rpx;
				height: 64rpx;
				background-size: 100%;
				background-repeat: no-repeat;
				&.merchant-image{
					margin-right: 15rpx;
				}
				&.plantform-image{
					margin-left: 15rpx;
				}
			}
			.menu-text{
				margin-left: 10rpx;
				.title{
					color: #333333;
					font-weight: bold;
					font-size: 26rpx;
					.merchant{
						color: #E93323;
					}
					.plantform{
						color: #FFC552;
					}
				}
				.info{
					color: #999999;
					font-size: 22rpx;
					margin-top: 5rpx;
				}
			}
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
		height: calc(98rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		height: calc(98rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		box-sizing: border-box;
		border-top: solid 1rpx #F3F3F3;
		background-color: #fff;
		box-shadow: 0px 0px 17rpx 1rpx rgba(206, 206, 206, 0.32);
		padding-bottom: constant(safe-area-inset-bottom); ///兼容 IOS<11.2/
		padding-bottom: env(safe-area-inset-bottom); ///兼容 IOS>11.2/
		&.filter{
			filter: blur(2rpx);
		}
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
