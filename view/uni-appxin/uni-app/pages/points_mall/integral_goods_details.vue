<template>
	<view :style="viewColor">
		<view class='product-con'>
			<!-- #ifdef H5 -->
			<view class="head-wrapper" :style="'top:'+statusBarHeight">
				<view class="head-menu">
					<view class='iconfont icon-xiangzuo' @click.native="returns"></view>
					<view class="iconfont icon-shouye4" @click.native="goHome"></view>
				</view>
			</view>
			<!-- #endif -->
			<scroll-view :scroll-top="scrollTop" scroll-y='true' scroll-with-animation="true"
				:style="'height:'+height+'px;'" @scroll="scroll">
				<view id="past0">
					<productConSwiper :imgUrls='imgUrls'></productConSwiper>
					<view class='nav acea-row row-between-wrapper'>
						<view class="share acea-row row-between row-bottom">
							<view class="money">
								<image :src="`${domain}/static/images/jf-point.png`" mode=""></image>
								<view class="price-count">
									<text class="num">{{storeInfo.ot_price || 0}}</text> 
									<text>积分</text><text v-if="storeInfo.price > 0">+{{storeInfo.price}}元</text>
								</view>
								
							</view>
							<view></view>
						</view>
					</view>
					<view class='wrapper'>
						<view class='introduce acea-row row-between'>
							<view> {{storeInfo.store_name}}</view>
						</view>
						<view class='label acea-row row-middle'>
							<view class='stock'>市场价：￥{{storeInfo.cost}}</view>
							<view class='stock'>库存:
								{{ storeInfo.stock}}
							</view>
							<view class='stock'>已兑换：{{storeInfo.sales}}
							</view>
						</view>
					</view>
					<view class="attribute" v-if='attribute.productAttr.length' @tap='selecAttr'>
						<view class='acea-row row-between-wrapper df'>
							<view><text class='atterTxt line1'>{{attr}}：{{attrValue}}</text></view>
							<view class='iconfont icon-jiantou'></view>
						</view>
						<view class="acea-row row-between-wrapper" style="margin-top:7px;padding-left:55px;" v-if="skuArr.length > 1">
							<view class="flex">
								<image :src="item.image" v-for="(item,index) in skuArr.slice(0,4)" :key="index" class="attrImg"></image>
							</view>
							<view class="switchTxt">共{{skuArr.length}}种规格可选</view>
						</view>
					</view>
				</view>
				<view class='product-intro' id="past2">
					<view class='title'>产品介绍</view>
					<view class='conter'>
						<jyf-parser :html="storeInfo.description" ref="article" :tag-style="tagStyle"></jyf-parser>
					</view>
				</view>
			</scroll-view>
			<view class='footer acea-row row-between-wrapper'>
				<navigator hover-class="none" class="item" url="/pages/points_mall/index">
					<view class="iconfont icon-jifenshangcheng"></view>
					<view class="p_center">积分商城</view>
				</navigator>
				
				<view class="bnt acea-row"
					v-if="attribute.productSelect.stock>0">
					<view class="buy bnts" @tap="goCat">立即兑换</view>
				</view>
				<view class="bnt acea-row" v-else>
					<view class="bnts no-goods">无法兑换</view>
				</view>
			</view>
		</view>
		<product-window :attr='attribute' :limitCount='limitNum' :cusPreviewImg='1' :type="'points'" :domain="domain" :isShow="1" @myevent="onMyEvent" @ChangeAttr="ChangeAttr"
			@attrVal="attrVal" @iptCartNum="iptCartNum" @getImg="showImg" id="product-window"></product-window>
	
	<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
	</view>
</template>

<script>
	const app = getApp();
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	import {
		mapGetters
	} from "vuex";
	import {
		getIntegralProductDetail
	} from '@/api/points_mall.js';
	import { postCartAdd } from '@/api/store.js';
	import productConSwiper from '@/components/productConSwiper/index.vue'
  import productWindow from '@/components/productWindow';
	import cusPreviewImg from '@/components/cusPreviewImg';
	import parser from "@/components/jyf-parser/jyf-parser";
	import {
		imageBase64
	} from "@/api/public";
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		silenceBindingSpread
	} from "@/utils";
	import {
		getUserInfo
	} from '@/api/user.js';
	import {HTTP_REQUEST_URL} from '@/config/app';
	import authorize from '@/components/Authorize';
	export default {
		computed: mapGetters(['uid','isLogin','viewColor','keyColor']),
		data() {
			return {
				dataShow: 0,
				id: 0,
				time: 0,
				storeInfo: [],
				imgUrls: [],
				domain:HTTP_REQUEST_URL,
				statusBarHeight: statusBarHeight, //系统导航条高度
				parameter: {
					'navbar': '1',
					'return': '1',
					'title': '抢购详情页',
					'color': false
				},
				attribute: {
					cartAttr: false,
					productAttr: [],
					productSelect: {}
				},
				productValue: [],
				isOpen: false,
				attr: '请选择',
				attrValue: '',
				status: 1,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				iShidden: false,
				limitNum: 0, //限制本属性产品的个数；
				iSplus: false,
				replyCount: 0, //总评论数量
				reply: [], //评论列表
				replyChance: 0,
				navH: "",
				navList: ['商品', '详情'],
				opacity: 0,
				scrollY: 0,
				topArr: [],
				toView: '',
				height: 0,
				heightArr: [],
				lock: false,
				scrollTop: 0,
				tagStyle: {
					img: 'width:100%;display:block;',
					table: 'width:100%',
					video: 'width:100%'
				},
				navActive: 0,
				meunHeight: 0,
				backH: '',
				posters: false,
				weixinStatus: false,
				posterImageStatus: false,
				storeImage: '', //海报产品图
				PromotionCode: '', //二维码图片
				posterImage: '', //海报路径
				actionSheetHidden: false,
				cart_num: 1,
				returnShow: true,
				H5ShareBox: false, //公众号分享图片
				routineContact: 0,
				selectSku:{},
				skuArr:[]
			}
		},
		components: {
			productConSwiper,
			productWindow,
			cusPreviewImg,
			authorize,
			"jyf-parser": parser,
		},
		/**
		 * 用户点击右上角分享
		 */
		// #ifdef MP
		onShareAppMessage: function() {
			let that = this;
			that.$set(that, 'actionSheetHidden', !that.actionSheetHidden);
			return {
				title: that.storeInfo.store_name || '',
				imageUrl: that.storeInfo.image || '',
				path: '/pages/points_mall/integral_goods_details?id=' + that.id + '&spid=' + that.uid,
			}
		},
		onShareTimeline: function() {
			let that = this;
			that.$set(that, 'actionSheetHidden', !that.actionSheetHidden);
			return {
				title: that.storeInfo.store_name || '',
				query: {
					id: that.id,
					spid: that.uid
				},
				imageUrl: that.storeInfo.image || ''
			}
		},
		// #endif
		onLoad(options) {
			let that = this
			let statusBarHeight = ''
			var pages = getCurrentPages();
			that.returnShow = pages.length === 1 ? false : true;
			//设置商品列表高度
			uni.getSystemInfo({
				success: function(res) {
					that.height = res.windowHeight
					statusBarHeight = res.statusBarHeight
					//res.windowHeight:获取整个窗口高度为px，*2为rpx；98为头部占据的高度；
				},
			});
			this.isLogin && silenceBindingSpread();
			// #ifndef APP-PLUS
			this.navH = app.globalData.navHeight
			// #endif
			// #ifdef APP-PLUS
			this.navH = 90
			// #endif
			// #ifdef MP
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.meunHeight = menuButtonInfo.height
			this.backH = (that.navH / 2) + (this.meunHeight / 2)

			//扫码携带参数处理
			if (options.scene) {
				let value = this.$util.getUrlParams(decodeURIComponent(options.scene));
				if (value.id) {
					this.id = value.id;
				} else {
					return this.$util.Tips({
						title: '缺少参数无法查看商品'
					}, {
						tab: 3,
						url: 1
					});
				}
				//记录推广人uid
				if (value.pid) app.globalData.spid = value.pid;
			}
			// #endif

			if (options.id) {
				this.id = options.id
				this.status = options.status
			}
			this.getIntegralProductDetail();
			
		},
		onShow(){
			uni.removeStorageSync('form_type_cart');
		},
		methods: {
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e;
			},
			//点击sku图片打开轮播图
			showImg(index){
				this.$refs.cusPreviewImg.open(this.selectSku.suk)
			},
			// app分享
			// #ifdef APP-PLUS
			appShare(scene) {
				let that = this
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].$page.fullPath // 获取当前页面路由，也就是最后一个打开的页面路由
				uni.share({
					provider: "weixin",
					scene: scene,
					type: 0,
					href: `${HTTP_REQUEST_URL}${curRoute}`,
					title: that.storeInfo.store_name,
					imageUrl: that.storeInfo.image,
					success: function(res) {
						uni.showToast({
							title: '分享成功',
							icon: 'success'
						})
						that.posters = false;
					},
					fail: function(err) {
						uni.showToast({
							title: '分享失败',
							icon: 'none',
							duration: 2000
						})
						that.posters = false;
					}
				});
			},
			// #endif
			// 后退
			returns: function() {
				uni.navigateBack()
			},
			// 首页
			goHome() {
				uni.navigateTo({
					url: '/pages/points_mall/index'
				});
			},
			/**
			 * 购物车手动填写
			 * 
			 */
			iptCartNum: function(e) {
				this.$set(this.attribute.productSelect, 'cart_num', num);
				this.$set(this, "cart_num", num);
			},
			// 后退
			returns: function() {
				uni.navigateBack()
			},
			onLoadFun: function(data) {
				this.isShowAuth = false;
			},
			getIntegralProductDetail: function() {
				let that = this;
				getIntegralProductDetail(that.id).then(res => {
					this.dataShow = 1;
					let title = res.data.store_name;
					this.storeInfo = res.data;
					this.imgUrls = res.data.slider_image;
					this.limitNum = res.data.once_max_count;
					this.storeInfo.description = this.storeInfo.content.content.replace(/<img/gi,
						'<img style="max-width:100%;height:auto;float:left;display:block" ');
					this.attribute.productAttr = res.data.attr;
					this.productValue = res.data.sku;
					for(let key in res.data.productValue){
						let obj = res.data.productValue[key];
						that.skuArr.push(obj)
					}
					this.$set(this, "selectSku", that.skuArr[0]);
					this.reply = res.data.reply ? [res.data.reply] : [];
					uni.setNavigationBarTitle({
						title: title.substring(0, 7) + '...'
					});
					// #ifdef H5
					this.PromotionCode = res.data.code_base
					that.storeImage = that.storeInfo.image
					// #endif
					that.DefaultSelect();
					app.globalData.openPages = '/pages/activity/goods_seckill_details/index?id=' + that.id +
						'&scene=' + that.storeInfo.uid;
					// wxParse.wxParse('description', 'html', that.data.storeInfo.description || '', that, 0);
					// wxh.time(that.data.time, that);
				}).catch(err => {
					that.$util.Tips({
						title: err
					}, {
						tab: 3
					})
				});
			},
			setShare: function() {
				this.$wechat.isWeixin() &&
					this.$wechat.wechatEvevt([
						"updateAppMessageShareData",
						"updateTimelineShareData",
						"onMenuShareAppMessage",
						"onMenuShareTimeline"
					], {
						desc: this.storeInfo.info,
						title: this.storeInfo.title,
						link: location.href,
						imgUrl: this.storeInfo.image
					}).then(res => {
					}).catch(err => {
						console.log(err);
					});
			},
			/**
			 * 默认选中属性
			 * 
			 */
			DefaultSelect: function() {
				let self = this
				let productAttr = self.attribute.productAttr;
				let value = [];
				for (var key in self.productValue) {
					if (self.productValue[key].stock > 0) {
						value = self.attribute.productAttr.length ? key.split(",") : [];
						break;
					}
				}
				for (let i = 0; i < productAttr.length; i++) {
					self.$set(productAttr[i], "index", value[i]);
				}
				//sort();排序函数:数字-英文-汉字；
				let productSelect = self.productValue[value.join(",")];
				if ((productSelect && productAttr.length) || (productSelect && !productAttr.length)) {
					self.$set(self.attribute.productSelect, "image", productSelect.image);
					self.$set(self.attribute.productSelect, "price", productSelect.price);
					self.$set(self.attribute.productSelect, "ot_price", productSelect.ot_price || 0);
					self.$set(self.attribute.productSelect, "stock", productSelect.stock);
					self.$set(self.attribute.productSelect, "unique", productSelect.unique);
					self.$set(self.attribute.productSelect, "cart_num", 1);
					self.$set(self, "attrValue", value.join(","));
					self.attrValue = value.join(",")
				} else if (!productSelect && productAttr.length) {
					self.$set(self.attribute.productSelect, "image", self.storeInfo.image);
					self.$set(self.attribute.productSelect, "price", self.storeInfo.price);
					self.$set(self.attribute.productSelect, "ot_price", self.storeInfo.ot_price || 0);
					self.$set(self.attribute.productSelect, "stock", 0);
					self.$set(self.attribute.productSelect, "unique", "");
					self.$set(self.attribute.productSelect, "cart_num", 0);
					self.$set(self, "attrValue", "");
					self.$set(self, "attrTxt", "请选择");
				} else if (!productSelect && !productAttr.length) {
					self.$set(self.attribute.productSelect, "image", self.storeInfo.image);
					self.$set(self.attribute.productSelect, "price", self.storeInfo.price);
					self.$set(self.attribute.productSelect, "ot_price", self.storeInfo.ot_price || 0);
					self.$set(self.attribute.productSelect, "stock", self.storeInfo.stock);
					self.$set(
						self.attribute.productSelect,
						"unique",
						self.storeInfo.unique || ""
					);
					self.$set(self.attribute.productSelect, "cart_num", 1);
					self.$set(self, "attrValue", "");
					self.$set(self, "attrTxt", "请选择");
				}
				self.$set(self.attribute.productSelect, "store_name", self.storeInfo.store_name);
			},
			selecAttr: function() {
				this.attribute.cartAttr = true
			},
			onMyEvent: function() {
				this.$set(this.attribute, 'cartAttr', false);
				this.$set(this, 'isOpen', false);
			},
			attrVal(val) {
				this.attribute.productAttr[val.indexw].index = this.attribute.productAttr[val.indexw].attr_values[val
					.indexn];
			},
			/**
			 * 属性变动赋值
			 * 
			 */
			ChangeAttr: function(res) {
				this.$set(this, 'cart_num', 1);
				let productSelect = this.productValue[res];
				if (productSelect) {
					this.$set(this.attribute.productSelect, "image", productSelect.image);
					this.$set(this.attribute.productSelect, "price", productSelect.price);
					this.$set(this.attribute.productSelect, "ot_price", productSelect.ot_price);
					this.$set(this.attribute.productSelect, "stock", productSelect.stock);
					this.$set(this.attribute.productSelect, "unique", productSelect.unique);
					this.$set(this.attribute.productSelect, "cart_num", 1);
					this.$set(this, "attrValue", res);
					this.attrTxt = "已选择"
				} else {
					this.$set(this.attribute.productSelect, "image", this.storeInfo.image);
					this.$set(this.attribute.productSelect, "price", this.storeInfo.price);
					this.$set(this.attribute.productSelect, "ot_price", this.storeInfo.ot_price);
					this.$set(this.attribute.productSelect, "stock", 0);
					this.$set(this.attribute.productSelect, "unique", "");
					this.$set(this.attribute.productSelect, "cart_num", 0);
					this.$set(this, "attrValue", "");
					this.attrTxt = "已选择"
				}
			},
			scroll: function(e) {
				var that = this,
					scrollY = e.detail.scrollTop;
				var opacity = scrollY / 200;
				opacity = opacity > 1 ? 1 : opacity;
				that.opacity = opacity
				that.scrollY = scrollY
				if (that.lock) {
					that.lock = false
					return;
				}
				for (var i = 0; i < that.topArr.length; i++) {
					if (scrollY < that.topArr[i] - (app.globalData.navHeight / 2) + that.heightArr[i]) {
						that.navActive = i
						break
					}
				}
			},
			tap: function(item, index) {
				var id = item.id;
				var index = index;
				var that = this;
				this.toView = id;
				this.navActive = index;
				this.lock = true;
				this.scrollTop = index > 0 ? that.topArr[index] - (app.globalData.navHeight / 2) : that.topArr[index]
			},
			/*
			 *  下订单
			 */
			goCat: function() {
				let taht = this;
				if(this.isLogin){
					var that = this;
					var productSelect = this.productValue[this.attrValue];
					//打开属性
					if (this.isOpen)
						this.attribute.cartAttr = true
					else
						this.attribute.cartAttr = !this.attribute.cartAttr
					//只有关闭属性弹窗时进行加入购物车
					if (this.attribute.cartAttr === true && this.isOpen == false) return this.isOpen = true
					//如果有属性,没有选择,提示用户选择
					if (this.attribute.productAttr.length && productSelect === undefined && this.isOpen == true) return app
						.$util.Tips({
							title: '请选择属性'
						});
					if (this.cart_num <= 0) {
						return app.$util.Tips({
							title: '请选择数量'
						});
					}
					this.isOpen = false
					let q = {
						is_new: 1,
						product_id: that.id,
						cart_num: that.attribute.productSelect.cart_num,
						product_attr_unique: that.attribute.productSelect !== undefined ? that.attribute.productSelect.unique : "",
						product_type: 20,
					};
					postCartAdd(q)
						.then(function(res) {
							that.isOpen = that.attribute.cartAttr = false;
							uni.navigateTo({
								url: `/pages/points_mall/integral_order?cartId=${res.data.cart_id}`
							});
						})
						.catch(res => {
							return that.$util.Tips({
								title: res
							});
						});
				}else{
					this.isAuto = true;
					this.isShowAuth = true
				}
			},
		}
	}
</script>

<style lang="scss">
	.product-con{
		position: relative;
	}
	.product-con .attribute{
		padding: 22rpx;
	}
	.p_center{
		text-align: center;
	}
	.generate-posters {
		width: 100%;
		height: 170rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 300;
		transform: translate3d(0, 100%, 0);
		transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		border-top: 1rpx solid #eee;
	}
	.generate-posters.on {
		transform: translate3d(0, 0, 0);
	}
	.generate-posters .item {
		flex: 1;
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
	.navbar .header {
		height: 96rpx;
		font-size: 30rpx;
		color: #050505;
		background-color: #fff;
		/* #ifdef MP */
		padding-right: 95rpx;
		/* #endif */
	}
	.icon-xiangzuo {
		/* #ifdef H5 */
		top: 30rpx !important;
		/* #endif */
	}
	.navbar .header .item {
		position: relative;
		margin: 0 25rpx;
	}
	.navbar .header .item.on:before {
		position: absolute;
		width: 60rpx;
		height: 5rpx;
		background-repeat: no-repeat;
		content: "";
		background-image: linear-gradient(to right, #ff3366 0%, #ff6533 100%);
		bottom: -10rpx;
		left: 50%;
		margin-left: -28rpx;
	}
	.navbar {
		position: fixed;
		background-color: #fff;
		top: 0;
		left: 0;
		z-index: 99;
		width: 100%;
	}
	.navbar .navbarH {
		position: relative;
	}
	.navbar .navbarH .navbarCon {
		position: absolute;
		bottom: 0;
		height: 100rpx;
		width: 100%;
	}
	.product-con .nav {
		height: 100rpx;
		padding: 0 22rpx;
		box-sizing: border-box;
		background-color: #fff;
		margin-top: 22rpx;
	}
	.product-con .nav .money {
		font-size: 28rpx;
		color: var(--view-theme);	
		display: flex;
		align-items: baseline;
		image {
			width: 26rpx;
			height: 26rpx;
		}
	}
	.product-con .nav .money .price-count {
		font-weight: normal;
		font-size: 22rpx;
		.num{
			font-weight: bold;
			margin-right: 8rpx;
		}
	}
	.product-con .nav .money .num {
		font-size: 34rpx;
		padding-left: 16rpx;
	}
	.product-con .nav .money .y-money {
		font-size: 26rpx;
		margin-left: 10rpx;
		text-decoration: line-through;
	}
	.product-con .nav .timeItem {
		font-size: 20rpx;
		color: #fff;
		text-align: center;
	}
	.product-con .nav .timeItem .timeCon {
		margin-top: 10rpx;
	}
	.product-con .nav .timeItem .timeCon .num {
		padding: 0 7rpx;
		font-size: 22rpx;
		color: #ff3d3d;
		background-color: #fff;
		border-radius: 2rpx;
	}
	.product-con .nav .timeState {
		font-size: 28RPX;
		color: #FFF;
	}
	.product-con .nav .iconfont {
		color: #fff;
		font-size: 30rpx;
		margin-left: 20rpx;
	}
	.product-con .wrapper {
		padding: 4rpx 22rpx 22rpx;
		box-sizing: border-box;
		background-color: #fff;	
	}
	.product-con .wrapper .introduce {
		margin: 0;
	}
	.product-con .wrapper .introduce .iconfont {
		font-size: 37rpx;
		color: #515151;
	}
	.product-con .wrapper .label {
		display: flex;
		justify-content: space-between;
		margin: 18rpx 0 0 0;
		font-size: 24rpx;
		color: #82848f;
	}
	.product-con .footer {
		padding: 0 30rpx 0 44rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		background-color: #fff;
		z-index: 277;
		border-top: 1px solid #f0f0f0;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		height: calc(100rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		height: calc(100rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		padding-bottom: constant(safe-area-inset-bottom); ///兼容 IOS<11.2/
		padding-bottom: env(safe-area-inset-bottom); ///兼容 IOS>11.2/
	}
	.product-con .footer .item {
		width: 120rpx;
		font-size: 18rpx;
		color: #666;
		tex-align: center;
		margin-right: 30rpx;
	}
	.product-con .footer .item .iconfont {
		text-align: center;
		font-size: 32rpx;
	}
	.product-con .footer .item .iconfont.icon-shoucang1 {
		color: #f00;
	}
	.product-con .footer .item .iconfont.icon-gouwuche1 {
		font-size: 40rpx;
		position: relative;
	}
	.product-con .footer .item .iconfont.icon-gouwuche1 .num {
		color: #fff;
		position: absolute;
		font-size: 18rpx;
		padding: 2rpx 8rpx 3rpx;
		border-radius: 200rpx;
		top: -10rpx;
		right: -10rpx;
	}
	.product-con .footer .bnt {
		width: 100%;
		height: 76rpx;
	}
	.product-con .footer .bnt .bnts {
		width: 100%;
		text-align: center;
		line-height: 76rpx;
		color: #fff;
		font-size: 28rpx;
	}
	.product-con .footer .bnt .joinCart {
		border-radius: 50rpx 0 0 50rpx;
		background-image: linear-gradient(to right, #fea10f 0%, #fa8013 100%);
	}
	.product-con .footer .bnt .buy {
		border-radius: 50rpx;
		background-image: linear-gradient(90deg, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
	}
	.product-con .footer .bnt .no-goods {
		border-radius: 50rpx;
		background-color: #CCCCCC;
	}
	.product-con .conter {
		display: block;
		padding-bottom: 100rpx;
	}
	.product-con .conter img {
		display: block;
	}
	.bg-color-hui {
		background: #bbbbbb !important;
	}
	.canvas {
		width: 750px;
		height: 1190px;
	}
	.poster-pop {
		width: 450rpx;
		height: 714rpx;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		z-index: 300;
		top:50%;
		margin-top: -559rpx;
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
	}
	.poster-pop .keep {
		color: #fff;
		text-align: center;
		font-size: 25rpx;
		margin-top: 10rpx;
	}
	.mask1 {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #000;
		opacity: .5;
		z-index: 288;
	}
	.home-nav {
		/* #ifdef H5 */
		top: 20rpx !important;
		/* #endif */
	}
	.home-nav {
		color: #fff;
		position: fixed;
		font-size: 33rpx;
		width: 56rpx;
		height: 56rpx;
		z-index: 99;
		left: 33rpx;
		background: rgba(190, 190, 190, 0.5);
		border-radius: 50%;
		&.on {
			background: unset;
			color: #333;
		}
	}
	.home-nav .line {
		width: 1rpx;
		height: 24rpx;
		background: rgba(255, 255, 255, 0.25);
	}
	.home-nav .icon-xiangzuo {
		width: auto;
		font-size: 28rpx;
	}
	.share-box {
		z-index: 1000;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	.share-box image {
		width: 100%;
		height: 100%;
	}
	.df {
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
	}
	.head-wrapper {
		z-index: 999;
		display: flex;
		align-items: center;
		position: fixed;
		left: 30rpx;
		top: 0;
		/* #ifdef MP */
		height: 43px;
		/* #endif */
		/* #ifdef H5 */
		height: 114rpx;
		/* #endif */
	}
	.head-menu {
		display: flex;
		align-items: center;
		height: 54rpx;
		width: 140rpx;
		background: rgba(0, 0, 0, .25);
		border-radius: 27rpx;
		.iconfont {
			flex: 1;
			text-align: center;
			color: #fff;
			box-sizing: border-box;
			&.icon-xiangzuo {
				border-right: 1px solid #fff;
			}
		}
	}
</style>
