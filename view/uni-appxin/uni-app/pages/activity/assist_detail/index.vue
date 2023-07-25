<template>
	<view :style="viewColor" class="page-container">
		<view class='bargain'>
			<!-- #ifdef H5 -->
			<view class='iconfont icon-xiangzuo' v-if='!$wechat.isWeixin()' @tap='goBack' :style="'top:'+navH+'px'"></view>
			<!-- #endif -->
			<view class="header"
			:style="{ 'background-image': bargainInfo.relation == 10 ? `url(${domain}/static/diy/assist_detail2${keyColor}.png)` : `url(${domain}/static/diy/assist_detail1${keyColor}.png)`}">
				<view class='people'>
					{{bargainInfo.view_num || 0}}人查看 丨 {{bargainInfo.share_num || 0}}人分享 丨 {{bargainInfo.user_count_all || 0}}人参与
				</view>
				<countDown v-if="bargainInfo.relation == 10" :tipText="'倒计时'" :dayText="'天'" :hourText="'时'" :minuteText="'分'"
				 :secondText="'秒'" :datatime="datatime" :isView="true" :isDay="true" :bgImage="`${domain}/static/images/assist-time.png`"></countDown>
				<view v-if="bargainInfo.relation == 1" class='pictxt acea-row row-center-wrapper'>
					<view class='pictrue'>
						<image :src='userInfo.avatar ? userInfo.avatar : "/static/images/f.png"'></image>
					</view>
					<view class='text'>
						{{userInfo.nickname || ''}}
						<text>邀请您助力加油</text>
					</view>
				</view>
			</view>
			<view class='wrapper'>
				<view class='pictxt acea-row row-between-wrapper' @tap="goProduct">
					<view class='pictrue'>
						<image :src='bargainInfo.product && bargainInfo.product.image ? bargainInfo.product.image : ""'></image>
						<view class="bargain_view">
							查看商品
							<text class="iconfont icon-jiantou iconfonts"></text>
						</view>
					</view>
					<view class='text acea-row row-column-around'>
						<view class='line2'>{{bargainData.store_name}}</view>
						<view>
							<text class='money t-color'>
								助力价: ￥
								<text class='num'>{{bargainPrice}}</text>
							</text>
							<text class="old-price">￥{{old_price}}</text>
						</view>
						<view class='successNum'>{{bargainInfo.user_count_product}}人正在参与</view>
					</view>
				</view>
				<!-- 进度条 -->
				<block>
					<view class="cu-progress acea-row row-middle round margin-top">
						<view class='acea-row row-middle bg-red' :style="'width:'+ (bargainInfo.yet_assist_count/bargainInfo.assist_count*100).toFixed(2) +'%;'"></view>
					</view>
					<view class='money acea-row row-between-wrapper'>
						<view v-if="bargainInfo.yet_assist_count != bargainInfo.assist_count">还差{{bargainInfo.assist_count-bargainInfo.yet_assist_count}}人</view>
					</view>
				</block>
				<!-- 帮助助力、助力成功： -->
				<view v-if="bargainInfo.relation == 10">
					<view v-if="bargainInfo.yet_assist_count == bargainInfo.assist_count">
						<view class='bargainSuccess'>
							<text class='iconfont icon-xiaolian'></text>
							恭喜您助力成功，快去支付
						</view>
						<view v-if="bargainInfo.order.paid != 0 && bargainInfo.order.paid != 1" class='bargainBnt' @tap='goPay'>立即支付</view>
						<view v-else class='bargainBnt' @tap='goOrderDetail(bargainInfo.order)'>查看订单</view>
						<view class='bargainBnt on' @tap='goBargainList'>抢更多商品</view>
					</view>
					<view v-else>
						<!-- #ifdef H5 -->
						<button class='bargainBnt' v-if="$wechat.isWeixin()" @click="H5ShareBox = true">邀请好友助力</button>
						<button v-else class='bargainBnt copy-data' :data-clipboard-text="protocol +
							'//' +
							host +
							'/pages/activity/assist_detail/index?id='+
							id+'&spid='+uid">邀请好友助力</button>
						<!-- #endif -->
						<!-- #ifdef MP-->
						<button open-type='share' class='bargainBnt'>邀请好友助力</button>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS -->
						  <button class='bargainBnt' @click="listenerActionSheet">邀请好友助力</button>
						<!-- #endif -->
						<view class='tip'>
							已有
							<text class='t-color'>{{bargainInfo.yet_assist_count}}</text>
							位好友成功助力
						</view>
					</view>
				</view>
				<view v-if="bargainInfo.relation == 1">
					<view class='bargainBnt' @tap='setBargainHelp' :class="load ? 'disabled' : ''">为好友助力</view>
				</view>
				<view v-if="bargainInfo.relation == -1 || bargainInfo.relation == -2">
					<view>
						<view v-if="bargainInfo.relation == -2" class='bargainSuccess'>
							<text class='iconfont icon-xiaolian'></text>
							已成功助力好友
						</view>
						<view v-else class='bargainSuccess'>
							<text class='iconfont icon-xiaolian' style="color: #999999;"></text>
							商品助力次数上限
						</view>
						<view class='bargainBnt' @tap='currentBargainUser'>我也要发起助力</view>
					</view>
				</view>
				<view class='lock' :style="{ 'background-image': `url(${domain}/static/images/assist-lock.png)`}"></view>
			</view>
			<view class='bargainGang'>
				<view class='title font-color acea-row row-center-wrapper'>
					<view class='pictrue'>
						<image :src="domain+'/static/diy/left'+keyColor+'.png'"></image>
					</view>
					<view class='titleCon'>助力好友</view>
					<view class='pictrue on'>
						<image :src="domain+'/static/diy/left'+keyColor+'.png'"></image>
					</view>
				</view>
				<view class='list'>
					<block v-for="(item,index) in bargainUserHelpList" :key='index'>
						<view class='item acea-row row-between-wrapper'>
							<view class='pictxt acea-row row-between-wrapper'>
								<view class='pictrue'>
									<image :src='item.avatar_img' v-if="item.avatar_img"></image>
									<image src="/static/images/f.png" v-else></image>
								</view>
								<view class='text'>
									<view class='name line1'>{{item.nickname}}</view>
									<view class='line1 t-color'>{{item.create_time}}</view>
								</view>
							</view>
							<view class='money t-color'>
								已助力
							</view>
						</view>
					</block>
				</view>
				<view class='load font-color' v-if="!limitStatus" @tap='getBargainUser'>点击加载更多</view>
				<view class='lock'></view>
			</view>
			<view class='goodsDetails'>
				<view class='title font-color acea-row row-center-wrapper'>
					<view class='pictrue'>
						<image :src="domain+'/static/diy/left'+keyColor+'.png'"></image>
					</view>
					<view class='titleCon'>商品详情</view>
					<view class='pictrue on'>
						<image :src="domain+'/static/diy/left'+keyColor+'.png'"></image>
					</view>
				</view>
				<view v-if="bargainInfo.product && bargainInfo.product.content" class='conter'>
					<jyf-parser :domain='domain' :html="bargainInfo.product.content.content.replace(/<br\/>/ig, '')" ref="article" :tag-style="tagStyle"></jyf-parser>
				</view>
				<view class='lock'></view>
			</view>
			<view class='mask' catchtouchmove="true" v-show='active==true' @tap='close'></view>
		</view>
		<!-- 发送给朋友图片 -->
		<view class="share-box" v-if="H5ShareBox">
			<image src="/static/images/share-info.png" @click="H5ShareBox = false"></image>
		</view>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<home></home>
		<!-- 分享按钮 -->
		<view class="generate-posters acea-row row-middle" :class="posters ? 'on' : ''">
			<button class="item" hover-class='none' @tap="goPoster">
				<view class="iconfont icon-haibao"></view>
				<view class="">生成海报</view>
			</button>
			<button class="item" hover-class='none' @click="copyPwd">
				<view class="iconfont icon-fuzhikouling1"></view>
				<view>生成口令</view>
			</button>
		</view>
		<view class="mask" v-if="posters || posterImageStatus" @click="listenerActionClose"></view>
		<!--口令复制结果-->
		<copyPassword :isCopy='isCopy' :copyUrl='copyUrl' @close="closeCopy"></copyPassword>
		<!-- 海报展示 -->
		<view class='poster-pop' v-if="posterImageStatus">
			<image src='../../../static/images/poster-close.png' class='close' @click="posterImageClose"></image>
			<image class="poster-image" :src='posterImage'></image>
			<!-- #ifndef H5  -->
			<view class='save-poster' @click="savePosterPath">保存到手机</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="keep">长按图片可以保存到手机</view>
			<!-- #endif -->
		</view>
		<canvas class="canvas" canvas-id='myCanvas' v-if="canvasStatus"></canvas>

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
	import {
		getAssistDetail,
		postAssistHelp,
		assistHelpList,
		initiateAssistApi,
		getAssistUser
	} from '../../../api/activity.js';
	import { HTTP_REQUEST_URL } from '@/config/app';
	import { postCartAdd, getProductCode, copyPasswordApi } from '../../../api/store.js';
	import copyPassword from '@/components/copyPassword';
	import util from '../../../utils/util.js';
	import ClipboardJS from "@/plugin/clipboard/clipboard.js";
	import { mapGetters } from "vuex";
	import { configMap } from "@/utils";
	import authorize from '@/components/Authorize';
	// #ifndef H5
	import passwordPopup from '@/components/passwordPopup';
	// #endif
	import countDown from '@/components/countDown';
	import home from '@/components/home';
	import parser from "@/components/jyf-parser/jyf-parser";
	import { silenceBindingSpread } from "@/utils";
	import { spread, imgToBase } from '@/api/user.js'
	import history from "@/mixins/history";
	import shareScence from "@/libs/spread";
	const app = getApp();
	export default {
		components: {
			// #ifndef H5
			passwordPopup,
			// #endif
			countDown,
			copyPassword,
			authorize,
			home,
			"jyf-parser": parser
		},
		mixins: [history],
		/**
		 * 页面的初始数据
		 */
		data() {
			return {
				countDownDay: '00',
				countDownHour: '00',
				countDownMinute: '00',
				countDownSecond: '00',
				active: false,
				id: 0, //助力产品编号
				userInfo: {}, //当前用户信息
				bargainUid: 0, //开启助力用户
				bargainUserInfo: {}, //开启助力用户信息
				bargainUserId: 0, //开启助力编号
				bargainInfo: [], //助力产品
				bargainData: {
					assistSku: []
				},
				offset: 0,
				limit: 20,
				limitStatus: false,
				bargainUserHelpList: [],
				bargainUserHelpInfo: [],
				bargainUserBargainPrice: 0,
				status: '', // 0 开启助力   1  朋友帮忙助力  2 朋友帮忙助力成功 3 完成助力  4 助力失败 5已创建订单
				bargainCount: [], //分享人数  浏览人数 参与人数
				old_price: 0,
				retunTop: true,
				bargainPartake: 0,
				interval: null,
				userBargainStatus: 0, //判断自己是否助力
				productStock: 0, //判断是否售罄；
				quota: 0, //判断是否已限量；
				userBargainStatusHelp: true,
				navH: '',
				statusPay: '',
				bargainSumCount: 0,
				bargainPrice: 0,
				datatime: 0,
				offest: '',
				tagStyle: {
					img: 'width:100%;display:block;',
					video: 'width:100%;'
				},
				domain: HTTP_REQUEST_URL,
				H5ShareBox: false, //公众号分享图片
				systemH: 0,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				pages: '',
				protocol: '',
				host: '',
				currSpid: "",
				posters: false,
				actionSheetHidden: true,
				posterImageStatus: false,
				storeImage: '', //海报产品图
				PromotionCode: '', //二维码图片
				canvasStatus: false, //海报绘图标签
				posterImage: '', //海报路径
				posterbackgd: '/static/images/posterbackgd.png',
				isDown: true,
				isCopy: false,
				copyUrl: '',
				load: false,
			}
		},
		computed:{
			...configMap({site_name: '',share_pic: ''}, mapGetters(['isLogin','uid','viewColor','keyColor'])),
		},
		watch: {
			isLogin: {
				handler: function(newV, oldV) {
					if (newV) {
						this.getBargainDetails();
					}
				},
				deep: true
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var that = this;
			if(options.spid){
				app.globalData.spid = options.spid;
				that.currSpid = options.spid
			}
			// #ifdef MP
			uni.getSystemInfo({
				success: function(res) {
					that.systemH = res.statusBarHeight
					that.navH = that.systemH + 10
				}
			})
			// #endif
			var pages = getCurrentPages();
			if (pages.length <= 1) {
				// that.retunTop = false
			}
			//扫码携带参数处理
			// #ifdef MP
			if (options.scene) {
				var value = util.getUrlParams(decodeURIComponent(options.scene));
				if (typeof value === 'object') {
					if (value.id) options.id = value.id;
					if (value.bargain) options.bargain = value.bargain;
					//记录推广人uid
					if (value.spid){
						app.globalData.spid = value.spid;
						that.currSpid = value.spid
					}
				} else {
					app.globalData.spid = value;
				}
			}
			//记录推广人uid
			if (options.spid) app.globalData.spid = options.spid;
			// #endif
			if (options.hasOwnProperty('id')) {
				that.id = options.id;
				that.bargainUid = options.bargain || 0
			}
			if (that.isLogin) {
				console.log(that.bargainUid, 'that.bargainUid')
				if (that.bargainUid == 'undefined') {
					that.bargainUid = that.$store.state.app.uid
				}
				that.getBargainDetails();
				that.downloadFilePromotionCode();
				//#ifdef APP-PLUS
				that.downloadFilePromotionCode();
				// #endif
				// #ifdef MP
				that.getHistory()
				// #endif
			} else {
				this.isAuto = true;
				this.isShowAuth = true
			}
			shareScence(that.currSpid,that.isLogin)
			uni.setNavigationBarTitle({
				title: '助力详情'
			})
		},
		onShow: function(){
			// #ifdef H5
			this.protocol = window.location.protocol
			this.host = window.location.host
			//#endif
		},
		onReady: function() {
			// #ifdef H5
			this.$nextTick(function() {
				const clipboard = new ClipboardJS(".copy-data");
				clipboard.on("success", () => {
					this.$util.Tips({
						title: '链接已复制成功，请粘贴分享'
					});
				});
			});
			// #endif
		},
		methods: {
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e;
			},
			goBack: function() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 去商品页
			goProduct() {
				uni.navigateTo({
					url: `/pages/goods_details/index?id=${this.bargainInfo.product.old_product_id}`
				})
			},
			/**
			 * 生成海报
			 */
			async goPoster() {
				if (this.posterImage) {
					this.posterImageStatus = true
					this.posters = false
					return
				}
				let that = this;
				let arr2
				that.posters = false;
				that.$set(that, 'canvasStatus', true);
				uni.showLoading({
					title: '海报生成中',
					mask: true
				});
				// #ifdef H5
				arr2 = [that.posterbackgd, await that.imgToBase(that.storeImage), await that.imgToBase(that.codeImg), await that.imgToBase(that.share_pic)];
				// #endif
				// #ifdef MP || APP-PLUS
				arr2 = [that.posterbackgd, await that.fileStoreImage(that.storeImage), await that.fileStoreImage(
					that.codeImg), await that.fileStoreImage(that.share_pic)];
				// #endif
				that.$util.goodsPosterCanvas(arr2, that.bargainData.store_name, that.bargainPrice, that.site_name, that.old_price, function(tempFilePath) {
					that.$set(that, 'posterImage', tempFilePath);
					that.$set(that, 'posterImageStatus', true);
					that.$set(that, 'canvasStatus', false);
					that.$set(that, 'actionSheetHidden', !that.actionSheetHidden);
				}, (err) => {
					that.$set(that, 'canvasStatus', false);
				});
			},
			async imgToBase(url) {
				let res = await imgToBase({
					image: url
				})
				return res.data.image
			},
			//图片转符合安全域名路径
			fileStoreImage(url) {
				// #ifdef MP
				let ishttps = url.split('//')[0] == 'https:'
				if (!ishttps) {
					url = 'https://'+url.split('//')[1]
				}
				// #endif
				return new Promise((resolve, reject) => {
					let that = this;
					uni.downloadFile({
						url: url,
						success: function(res) {
							resolve(res.tempFilePath);
						},
						fail: function(error) {
							console.log(error)
							return that.$util.Tips({
								title: `${error}`
							});
						}
					});
				})
			},
			/**
			 * 分享打开
			 *
			 */
			listenerActionSheet: function() {
				if (this.isLogin == false) {
					this.isAuto = true;
					this.isShowAuth = true
				} else {
					this.posters = !this.posters;
				}
			},
			// 分享关闭
			listenerActionClose: function() {
				this.posters = false;
			},
			//隐藏海报
			posterImageClose: function() {
				this.posterImageStatus = false
			},
			downloadFilePromotionCode() {
				let that = this;
				getProductCode(that.id, {
					type: 'wechat',
					product_type: 3
				}).then(async res => {
					that.codeImg = res.data.url;
					console.log(this.codeImg)
					that.$set(that, 'isDown', false);
				}).catch(err => {
					that.$util.Tips({
						title: err
					});
					that.posters = false;
					that.$set(that, 'isDown', false);
					that.$set(that, 'PromotionCode', '');
				});
			},

			/*
			 * 保存到手机相册
			 */

			savePosterPath: function() {
				let that = this;
				// #ifdef APP-PLUS
				uni.saveImageToPhotosAlbum({
					filePath: that.posterImage,
					success: function(res) {
						that.posterImageClose();
						that.$util.Tips({
							title: '保存成功',
							icon: 'success'
						});
					},
					fail: function(res) {
						that.$util.Tips({
							title: '保存失败'
						});
					},
				})
				// #endif
			},
			//复制口令
			copyPwd(){
				let that = this;
				copyPasswordApi({
					id: that.id,
					product_type: 30
				}).then(async res => {
					that.copyUrl = res.data.str;
					that.posters = false
					that.isCopy = true;
				})
			},
			closeCopy(){
				this.isCopy = false
			},
			goPay: function() { //立即支付
				var that = this;
				var data = {
					product_id: that.bargainInfo.product_assist_set_id,
					product_attr_unique: that.bargainInfo.product.unique,
					cart_num: 1,
					product_type: 3,
					is_new: 1
				};
				postCartAdd(data).then(res => {
					uni.navigateTo({
						url: '/pages/users/order_confirm/index?new=1&cartId=' + res.data.cart_id
					});
				}).catch(err => {
					return that.$util.Tips({
						title: err
					})
				});
			},
			getBargainDetails: function() { //获取助力产品详情
				var that = this;
				var id = that.id;
				getAssistDetail(id).then(function(res) {
					that.bargainInfo = res.data;
					that.bargainData = res.data.assist;
					that.bargainPrice = that.bargainData.assistSku[0].assist_price;
					that.old_price = (that.bargainData.assistSku[0].sku && that.bargainData.assistSku[0].sku.price) || 0;
					that.userInfo = res.data.user;
					that.bargainSumCount = res.data.yet_assist_count;
					that.$set(that, 'storeImage', that.bargainInfo.product.image);
					that.datatime = res.data.stopTime;
					that.pages = '/pages/activity/assist_detail/index?id=' + that.id;
					that.bargainUserHelpList = []
					that.getBargainUser();
					//#ifdef H5
					that.setOpenShare();
					//#endif
				}).catch(function(err) {
					that.$util.Tips({
						title: err
					}, {
						tab: 3
					})
				})
			},
			currentBargainUser: function() { //当前用户助力
				let that = this;
				let id = that.bargainInfo.product_assist_id;
				initiateAssistApi(id).then(res => {
					let assist_id = res.data.product_assist_set_id
					uni.hideLoading();
					uni.navigateTo({
						url: '/pages/activity/assist_detail/index?id=' + assist_id
					});			
				}).catch((err) => {
					uni.hideLoading();
					that.$util.Tips({
						title: err
					})
				});
			},
			setBargainHelp: function() { //帮好友助力
				var that = this;
				that.load = true
				postAssistHelp(that.bargainInfo.product_assist_set_id).then(res => {
					that.$set(that, 'bargainUserHelpList', []);
					that.getBargainUser();
					that.$util.Tips({
						title: res.message
					})
					that.getBargainDetails();
					that.load = false
				}).catch(err => {
					that.$util.Tips({
						title: err
					})
					that.$set(that, 'bargainUserHelpList', []);
					that.getBargainUser();
					that.load = false
				})
			},
			getBargainUser: function() { //获取助力帮
				var that = this;
				var data = {
					offset: that.offset,
					limit: that.limit,
				};
				assistHelpList(that.id).then(res => {
					var bargainUserHelpListNew = [];
					var bargainUserHelpList = that.bargainUserHelpList;
					var len = res.data.list.length;
					bargainUserHelpListNew = bargainUserHelpList.concat(res.data.list);
					that.$set(that, 'bargainUserHelpList', res.data.list);
					that.$set(that, 'limitStatus', data.limit > len);
					that.$set(that, 'offest', (Number(data.offset) + Number(data.limit)));
				});
			},
			goBargainList: function() {
				uni.navigateTo({
					url: '/pages/activity/assist/index',
				})
			},
			goOrderDetail: function(order) {
				if (order.paid == 1) {
					uni.navigateTo({
						url: '/pages/order_details/index?order_id=' + order.order_id,
					})
				} else {
					uni.navigateTo({
						url: '/pages/order_details/stay?order_id=' + order.group_order_id,
					})
				}
			},
			close: function() {
				this.$set(this, 'active', false);
			},
			onLoadFun: function(e) {
				this.getBargainDetails();
				this.isShowAuth = false
				this.downloadFilePromotionCode();
			},
			addShareAssist: function() { //添加分享次数 获取人数
				var that = this;
				getAssistUser(that.bargainInfo.product_assist_set_id).then(res => {});
			},
			//#ifdef H5
			setOpenShare() {
				let that = this;
				let configTimeline = {
					title: "您的好友" +
						that.userInfo.nickname +
						"邀请您助力" +
						that.bargainInfo.product.store_name,
					desc: that.bargainInfo.product.store_name,
					link: window.location.protocol +
						"//" +
						window.location.host +
						"/pages/activity/assist_detail/index?id=" +
						that.id+'&spid='+that.uid,
					imgUrl: that.bargainInfo.product.image,
				};
				if (this.$wechat.isWeixin()) {
					this.$wechat.wechatEvevt([
								"updateAppMessageShareData",
								"updateTimelineShareData",
								"onMenuShareAppMessage",
								"onMenuShareTimeline"
							],
							configTimeline
						)
						.then(res => {
							console.log(res);
						})
						.catch(res => {
							if (res.is_ready) {
								res.wx.updateAppMessageShareData(configTimeline);
								res.wx.updateTimelineShareData(configTimeline);
								res.wx.onMenuShareAppMessage(configTimeline);
								res.wx.onMenuShareTimeline(configTimeline);
							}
						});
				}
			}
			//#endif
		},
		/** 生命周期函数--监听页面隐藏
		 */
		onHide: function() {
			if (this.interval !== null) clearInterval(this.interval);
		},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {
			if (this.interval !== null) clearInterval(this.interval);
		},
		//#ifdef MP
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {
			let that = this,
				share = {
					title: '您的好友' + that.userInfo.nickname + '邀请您帮他助力' + that.bargainInfo.product.store_name + ' 快去帮忙吧！',
					path: '/pages/activity/assist_detail/index?id=' + this.id+'&spread='+that.uid,
					imageUrl: that.bargainInfo.product.image,
				};
			that.close();
			that.addShareAssist();
			return share;
		},
		//#endif
	}
</script>

<style lang="scss">
	.page-container {
		min-height: 100vh;
		background-color: var(--view-theme);
	}
	.canvas {
		z-index: 300;
		width: 750px;
		height: 1190px;
		opacity: 0;
	}
	.poster-pop {
		width: 600rpx;
		height: 897rpx;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1000;
		top: 50%;
		margin-top: -446rpx;	
	}
	.poster-pop image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.poster-pop .close {
		width: 46rpx;
		height: 75rpx;
		position: fixed;
		right: 0;
		top: -73rpx;
		display: block;
	}
	.poster-pop .save-poster {
		background-color: #df2d0a;
		font-size: ：22rpx;
		color: #fff;
		text-align: center;
		height: 76rpx;
		line-height: 76rpx;
		width: 100%;
		border-radius: 43rpx;
		margin-top: 20rpx;
	}
	.poster-pop .keep {
		color: #fff;
		text-align: center;
		font-size: 25rpx;
		margin-top: 10rpx;
	}
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 100;
	}
	.generate-posters {
		width: 100%;
		height: 170rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		transform: translate3d(0, 100%, 0);
		transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		border-top: 1px solid #eee;
	}
	.generate-posters.on {
		transform: translate3d(0, 0, 0);
	}
	.generate-posters .item {
		flex: 50%;
		text-align: center;
		font-size: 30rpx;
	}
	.generate-posters .item .iconfont {
		font-size: 80rpx;
		color: #5eae72;
	}
	.generate-posters .item .iconfont.icon-haibao {
		color: #5391f1;
	}
	.generate-posters .item .iconfont.icon-fuzhikouling1 {
		color: #FBB324;
	}
	.bargain .icon-xiangzuo {
		font-size: 40rpx;
		color: #fff;
		position: fixed;
		top: 30rpx;
		left: 30rpx;
		z-index: 99;
		font-size: 36rpx;
	}
	.bargain .header {
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 698rpx;
		height: 572rpx;
		margin: 0 auto;
		padding-top: 0.1rpx;
		position: relative;
	}
	.bargain .header .pictxt {
		margin: 330rpx auto 0 auto;
		font-size: 26rpx;
		color: #fff;
	}
	.bargain .header .pictxt .pictrue {
		width: 56rpx;
		height: 56rpx;
		margin-right: 30rpx;
	}
	.bargain .header .pictxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2rpx solid #fff;
	}
	.bargain .header .pictxt .text text {
		margin-left: 20rpx;
	}
	.bargain .header .time {
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 480rpx;
		height: 166rpx;
		font-size: 22rpx;
		text-align: center;
		padding-top: 11rpx;
		box-sizing: border-box;
		position: absolute;
		top: 340rpx;
		left: 50%;
		margin-left: -240rpx;
		align-items: inherit;
	}
	.t-color {
		color: var(--view-theme);
	}
	.b-color {
		background-color: var(--view-theme);
	}
	.bargain .header .people {
		text-align: center;
		color: #fff;
		font-size: 20rpx;
		position: absolute;
		width: 100%;
		/* #ifdef MP || APP-PLUS */
		height: 44px;
		line-height: 44px;
		/* #endif */
		/* #ifdef H5 */
		top: 36rpx;
		/* #endif */
	}
	.bargain .header .time text {
		// color: var(--view-theme);
	}
	.bargain .wrapper,
	.bargain .bargainGang,
	.bargain .goodsDetails {
		width: 660rpx;
		border: 6rpx solid #fc8b42;
		background-color: #fff;
		border-radius: 20rpx;
		margin: -162rpx auto 0 auto;
		box-sizing: border-box;
		padding: 0 24rpx 47rpx 24rpx;
		position: relative;
	}
	.bargain .wrapper .pictxt {
		margin: 26rpx 0 37rpx 0;
	}
	.bargain .wrapper .pictxt .pictrue {
		width: 180rpx;
		height: 180rpx;
		position: relative;
	}
	.bargain .wrapper .pictxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}
	.bargain .wrapper .pictxt .text {
		width: 395rpx;
		font-size: 28rpx;
		color: #282828;
		height: 180rpx;
	}
	.bargain .wrapper .pictxt .text .money {
		font-weight: bold;
		font-size: 24rpx;
		color: var(--view-priceColor);
	}
	.bargain .wrapper .pictxt .text .money .num {
		font-size: 36rpx;
	}
	.bargain .wrapper .pictxt .text .old-price{
		text-decoration: line-through;
		color: #999;
		margin-left: 10rpx;
		font-size: 24rpx;
	}
	.bargain .wrapper .pictxt .text .successNum {
		font-size: 22rpx;
		color: #999;
	}
	.bargain .wrapper .cu-progress {
		overflow: hidden;
		height: 12rpx;
		background-color: #eee;
		width: 100%;
		border-radius: 20rpx;
	}
	.bargain .wrapper .cu-progress .bg-red {
		width: 0;
		height: 100%;
		transition: width 0.6s ease;
		border-radius: 20rpx;
		background-image: linear-gradient(to right, var(--view-bntColor11) 0%, var(--view-bntColor12) 100%);
	}
	.bargain .wrapper .money {
		font-size: 22rpx;
		color: #999;
		margin-top: 15rpx;
	}
	.bargain .wrapper .bargainSuccess {
		font-size: 26rpx;
		color: #282828;
		text-align: center;
	}
	.bargain .wrapper .bargainSuccess .iconfont {
		font-size: 45rpx;
		color: #54c762;
		padding-right: 18rpx;
		vertical-align: -5rpx;
	}
	.bargain .wrapper .bargainBnt {
		font-size: 30rpx;
		font-weight: bold;
		color: #fff;
		width: 600rpx;
		height: 80rpx;
		border-radius: 40rpx;
		background-image: linear-gradient(to right, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
		text-align: center;
		line-height: 80rpx;
		margin-top: 32rpx;
		&.disabled {
			background: #BFBFBF;
			pointer-events: none;
		}
	}
	.bargain .wrapper .bargainBnt.on {
		border: 2rpx solid var(--view-theme);
		color: var(--view-theme);
		background-image: linear-gradient(to right, #fff 0%, #fff 100%);
		width: 596rpx;
		height: 76rpx;
	}
	.bargain .wrapper .bargainBnt.grey {
		color: #fff;
		background-image: linear-gradient(to right, #BBBBBB 0%, #BBBBBB 100%);
	}
	.bargain .wrapper .tip {
		font-size: 22rpx;
		color: #999;
		text-align: center;
		margin-top: 20rpx;
	}
	.bargain .wrapper .lock,
	.bargain .bargainGang .lock,
	.bargain .goodsDetails .lock {
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 548rpx;
		height: 66rpx;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: -43rpx;
		z-index: 5;
	}
	.bargain .bargainGang {
		margin: 13rpx auto 0 auto;
	}
	.bargain .bargainGang .title,
	.bargain .goodsDetails .title {
		font-size: 32rpx;
		font-weight: bold;
		height: 80rpx;
		margin-top: 30rpx;
	}
	.bargain .bargainGang .title .pictrue,
	.bargain .goodsDetails .title .pictrue {
		width: 46rpx;
		height: 24rpx;
	}
	.bargain .bargainGang .title .pictrue.on,
	.bargain .goodsDetails .title .pictrue.on {
		transform: rotate(180deg);
	}
	.bargain .bargainGang .title .pictrue image,
	.bargain .goodsDetails .title .pictrue image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.bargain .bargainGang .title .titleCon,
	.bargain .goodsDetails .title .titleCon {
		margin: 0 20rpx;
		color: var(--view-theme);
	}
	.bargain .bargainGang .list .item {
		border-bottom: 1rpx dashed #ddd;
		height: 112rpx;
	}
	.bargain .bargainGang .list .item .pictxt {
		width: 310rpx;
	}
	.bargain .bargainGang .list .item .pictxt .pictrue {
		width: 70rpx;
		height: 70rpx;
	}
	.bargain .bargainGang .list .item .pictxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.bargain .bargainGang .list .item .pictxt .text {
		width: 225rpx;
		font-size: 20rpx;
		color: #999;
	}
	.bargain .bargainGang .list .item .pictxt .text .name {
		font-size: 25rpx;
		color: #282828;
		margin-bottom: 7rpx;
	}
	.bargain .bargainGang .list .item .money {
		font-size: 25rpx;
	}
	.bargain .bargainGang .list .item .money .iconfont {
		font-size: 35rpx;
		vertical-align: middle;
		margin-right: 10rpx;
	}
	.bargain .bargainGang .load {
		font-size: 24rpx;
		text-align: center;
		line-height: 80rpx;
		height: 80rpx;
	}
	.bargain .goodsDetails {
		margin: 13rpx auto 0 auto;
	}
	.bargain .goodsDetails~.goodsDetails {
		margin-bottom: 50rpx;
	}
	.bargain .goodsDetails .conter {
		margin-top: 20rpx;
		overflow: hidden;
	}
	.bargain_view {
		width: 180rpx;
		height: 48rpx;
		background: rgba(0, 0, 0, 0.5);
		opacity: 1;
		border-radius: 0 0 6rpx 6rpx;
		position: absolute;
		bottom: 0;
		font-size: 22rpx;
		color: #fff;
		text-align: center;
		line-height: 48rpx;
	}
	.iconfonts {
		font-size: 22rpx !important;
	}
	.bargain .mask {
		z-index: 100;
	}
	.share-box {
		z-index: 1000;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
