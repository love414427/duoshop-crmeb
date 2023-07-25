<template>
	<view :style="viewColor">
		<view class="product-con skeleton">
			<view class="head-wrapper" :style="'top:'+statusBarHeight">
				<view class="head-menu">
					<view class='iconfont icon-xiangzuo' @click="returns"></view>
					<view class="iconfont icon-shouye4" @click="goHome"></view>
				</view>
			</view>
			<view>
				<scroll-view :scroll-top="scrollTop" scroll-y='true' scroll-with-animation="true" :style='"height:"+height+"px;"'
				 @scroll="scroll">
					<view id="past0">
						<productConSwiper class="skeleton-rect" :imgUrls="storeInfo.slider_image" :videoCoverImg='videoCoverImg' :videoline="storeInfo.video_link"></productConSwiper>
						<view class='nav acea-row row-between-wrapper' :style="{ 'background-image': `url(${domain}/static/images/seckill-bg.png)`}">
							<view class='money skeleton-rect'>￥<text class='num'>{{storeInfo.price}}</text><text class='y-money'>￥{{storeInfo.ot_price}}</text></view>
							<view class='acea-row row-middle skeleton-rect' v-if="storeInfo.seckill_status == '1'">
								<view class='time'>
									<view>距秒杀结束仅剩</view>
									<countDown :is-day="false" :tip-text="' '" :day-text="' '" :hour-text="' : '" :minute-text="' : '" :second-text="' '" :datatime="datatime"></countDown>
								</view>
							</view>
						</view>
						<view class='wrapper'>
							<view class='introduce skeleton-rect acea-row row-between row-bottom'>
								<view>
									<text v-if="(storeInfo.merchant && storeInfo.merchant.type_name)" class="font-bg-red">{{storeInfo.merchant.type_name}}</text>
									<text v-else-if="(storeInfo.merchant && storeInfo.merchant.is_trader)" class="font-bg-red">自营</text>
									{{storeInfo.store_name}}
								</view>
								<view class="fenxiang_btn" @click="listenerActionSheet">
									<view class='iconfont icon-fenxiang'></view>
									分享
								</view>

							</view>
							<view class='label acea-row row-between-wrapper'>
								<view class="skeleton-rect">市场价:￥{{storeInfo.ot_price}}</view>
								<view class="skeleton-rect">库存:{{storeInfo.stock}}{{storeInfo.unit_name}}</view>
								<view class="skeleton-rect">销量:{{storeInfo.sales}}{{storeInfo.unit_name}}</view>
							</view>
						</view>
						<view class='attribute acea-row row-between-wrapper' @click="selecAttr">
							<view class="skeleton-rect">{{attrTxt}}：
								<text class='atterTxt'>{{attrValue}}</text>
							</view>
							<view class='iconfont icon-jiantou skeleton-rect'></view>
						</view>
						<!--运费-->
						<view v-if="shipping || shippingValue" class='attribute acea-row row-between-wrapper' @click="showShip">
							<view class="acea-row row-between-wrapper skeleton-rect">运费：
								<text class='atterTxt'>{{shippingValue}}</text>
							</view>
							<view class='iconfont icon-jiantou skeleton-rect'></view>
						</view>
						<!--保障-->
						<view v-if="guarantee.length" class='attribute acea-row row-between-wrapper' @click="showGuaranee">
							<view class="acea-row row-between-wrapper">保障：
								<view class="guaranteeAttr">
									<text class='atterTxt1' :class="item.guarantee_name ? 'hasAttr' : ''"  v-for="(item,index) in guarantee">
										{{item.guarantee_name ? item.guarantee_name : ''}}
									</text>
								</view>
							</view>
							<view class='iconfont icon-jiantou'></view>
						</view>
						<view v-if="specsInfo.params.length>0" class="attribute acea-row row-between-wrapper" @click="seeSpecs">
						  <view class="acea-row row-middle">
						    参数：
						    <view class="list line1">
						      <text class="item params" v-for="(item,index) in specsInfo.params" :key="index"
						        v-if="index<2">{{item.name}}</text>
						      <text>...</text>
						    </view>
						  </view>
						  <view class="iconfont icon-jiantou"></view>
						</view>
					</view>
					<view class='userEvaluation' id="past1" v-if="replyCount && replyCount>0">
						<view class='title acea-row row-between-wrapper'>
							<view>用户评价({{replyCount}})</view>
							<navigator class='praise' hover-class='none' :url='"/pages/users/goods_comment_list/index?product_id="+id'>
								<text class='t-color'>{{replyChance}}</text>好评率
								<text class='iconfont icon-jiantou'></text>
							</navigator>
						</view>
						<block v-if="replyCount">
							<userEvaluation :reply="reply"></userEvaluation>
						</block>
					</view>
					<!-- 种草秀 -->
					<view class='userPlant' v-if="storeInfo.community && storeInfo.community.length>0">
						<view class='title acea-row row-between-wrapper'>
							<view>种草秀 </view>
							<navigator class='praise' hover-class='none' :url="'/pages/plantGrass/plant_show/index?spu_id='+storeInfo.spu_id">
								查看全部
								<text class='iconfont icon-jiantou'></text>
							</navigator>
						</view>
						<view class="imgList acea-row">
							<navigator class="pictrue" v-for="(item, index) in storeInfo.community" :key="index" v-if="index<=2"
							 hover-class='none' :url="'/pages/plantGrass/plant_detail/index?id='+item.community_id">
								<image :src="item.image[0]" class="image"></image>

							</navigator>
						</view>
					</view>
					<!-- 商铺信息 -->
					<view class="store-wrapper" v-if="storeInfo.merchant && hide_mer_status ==0">
						<view class="store-hd">
							<view class="store-info">
								<view class="logo">
									<image :src="storeInfo.merchant.mer_avatar" mode=""></image>
								</view>
								<view class="info">
									<view class="name">{{storeInfo.merchant.mer_name}}
										<text v-if="(storeInfo.merchant && storeInfo.merchant.type_name)" class="font-bg-red ml8">{{storeInfo.merchant.type_name}}</text>
										<text v-else-if="(storeInfo.merchant && storeInfo.merchant.is_trader)" class="font-bg-red ml8">自营</text>
									</view>
									<view class="txt">
									{{storeInfo.merchant.care_count < 10000 ? storeInfo.merchant.care_count : (storeInfo.merchant.care_count/10000).toFixed(2)+'万'}}人关注
									</view>
								</view>
								<navigator v-if="hide_mer_status == 0" :url="'/pages/store/home/index?id='+storeInfo.merchant.mer_id" class="link"
								 hover-class="none">进店</navigator>
							</view>
							<view class="score-wrapper">
								<view class="item">
									商品描述<text>{{storeInfo.merchant.product_score}}</text>
								</view>
								<view class="item">
									卖家服务<text>{{storeInfo.merchant.service_score}}</text>
								</view>
								<view class="item">
									物流服务<text>{{storeInfo.merchant.postage_score}}</text>
								</view>
							</view>
						</view>
						<view v-if="storeInfo.merchant.recommend && storeInfo.merchant.recommend.length > 0" class="con-box">
							<view class="title">店铺推荐</view>
							<scroll-view scroll-x="true" style="white-space: nowrap; display: flex" show-scrollbar="false">
								<view class="img-box">
									<view class="img-item" v-for="(item,index) in storeInfo.merchant.recommend" :key="index" @click="goProDetail(item)">
										<image :src="item.image" mode=""></image>
										<view class="txt">
											<view class="title line1">{{item.store_name}}</view>
											<view class="price">
												<text>￥</text>{{item.price}}
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
					<view class='product-intro' id="past3">
						<view class='title'>产品介绍</view>
						<view class='conter' v-if="description">
							<jyf-parser :domain='domain' :html="description.content" ref="article" :tag-style="tagStyle"></jyf-parser>
						</view>
						<!-- 价格说明 -->
						<view v-if="priceRule.content" class="price-info">
							<view class="price-title">价格说明</view>
							<!-- #ifndef APP-PLUS -->
							<jyf-parser :domain='domain' :html="priceRule.content.replace(/<br\/>/ig, '')" ref="article" :tag-style="tagStyle"></jyf-parser>
							<!-- #endif -->
							<!-- #ifdef APP-PLUS -->
							<view class="description" v-html="priceRule.content.replace(/<br\/>/ig, '')"></view>
							<!-- #endif -->
						</view>
					</view>
					<view style='height:120rpx;'></view>
				</scroll-view>
			</view>
			<view class='footer acea-row row-between-wrapper'>
				<view v-if="storeInfo.merchant && storeInfo.merchant.services_type == 1" class="item skeleton-rect" @click="call">
					<view class="iconfont icon-kefu"></view>
					<view>客服</view>
				</view>
				<view v-else class="item skeleton-rect" @click="goCustomer">
					<view class="iconfont icon-kefu"></view>
					<view>客服</view>
				</view>
				<view @click="setCollect" class='item skeleton-rect'>
					<view class='iconfont icon-shoucang1' v-if="storeInfo.isRelation"></view>
					<view class='iconfont icon-shoucang' v-else></view>
					<view>收藏</view>
				</view>
				<view class='bnt acea-row skeleton-rect'>
					<form @submit="joinCart" report-submit='true'>
						<button class='joinCart bnts' @tap="openAlone">直接购买</button>
					</form>
					<form @submit="goBuy" report-submit='true' v-if="attr.productSelect && storeInfo.seckill_status == '1'">
						<button v-if="attr.productSelect.stock == 0" class='buy bnts' form-type="submit" disabled>已售罄</button>
						<button v-else class='buy bnts' form-type="submit">秒杀购买</button>
					</form>
					<form @submit="goBuy" report-submit='true' v-if="attr.productSelect && storeInfo.seckill_status == '0'">
						<button class='buy bnts' form-type="submit" disabled>未开始</button>
					</form>
					<form @submit="goBuy" report-submit='true' v-if="attr.productSelect && storeInfo.seckill_status == '-1'">
						<button class='buy bnts' form-type="submit" disabled>已结束</button>
					</form>
				</view>
			</view>
			<!-- 组件 -->
			<productWindow :attr="attr" :isShow='1' :iSplus='1' @myevent="onMyEvent" @ChangeAttr="ChangeAttr" @ChangeCartNum="ChangeCartNum"
			 @attrVal="attrVal" @iptCartNum="iptCartNum" id='product-window' :image="storeInfo.image"></productWindow>
			<!-- 商品参数 -->
			<specs :specsInfo="specsInfo" @myevent="mySpecs"></specs>
			<!-- 分享按钮 -->
			<view class="generate-posters acea-row row-middle" :class="posters ? 'on' : ''">
				<!-- #ifndef MP -->
				<button class="item" :class="weixinStatus ? 'item3' : ''" hover-class='none' v-if="weixinStatus === true" @click="H5ShareBox = true">
					<view class="iconfont icon-weixin3"></view>
					<view class="">发送给朋友</view>
				</button>
				<!-- #endif -->
				<!-- #ifdef MP -->
				<button class="item" :class="weixinStatus ? 'item3' : ''" open-type="share" hover-class='none' @click="goFriend">
					<view class="iconfont icon-weixin3"></view>
					<view class="">发送给朋友</view>
				</button>
				<!-- #endif -->
				<button class="item" :class="weixinStatus ? 'item3' : ''" hover-class='none' @click="goPoster">
					<view class="iconfont icon-haibao"></view>
					<view class="">生成海报</view>
				</button>
				<button class="item" :class="weixinStatus ? 'item3' : ''" hover-class='none' @click="copyPwd">
					<view class="iconfont icon-fuzhikouling1"></view>
					<view>复制口令</view>
				</button>
			</view>
			<view class="mask" v-if="posters" @click="listenerActionClose"></view>
			<!--口令复制结果-->
			<copyPassword :isCopy='isCopy' :copyUrl='copyUrl' @close="closeCopy"></copyPassword>
			<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
			<!-- 海报展示 -->
			<view class='poster-pop' v-if="posterImageStatus">
				<image src='../../../static/images/poster-close.png' class='close' @click="posterImageClose"></image>
				<image :src='posterImage'></image>
				<!-- #ifndef H5  -->
				<view class='save-poster' @click="savePosterPath">保存到手机</view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view class="keep">长按图片可以保存到手机</view>
				<!-- #endif -->
			</view>
			<view class='mask' v-if="posterImageStatus"></view>
			<canvas class="canvas" canvas-id='myCanvas' v-if="canvasStatus"></canvas>
			<!-- 发送给朋友图片 -->
			<view class="share-box" v-if="H5ShareBox">
				<image src="/static/images/share-info.png" @click="H5ShareBox = false"></image>
			</view>
			<guaranteeTemplate ref="guartemplate" :guarantee='guarantee' :shipping='shipping'></guaranteeTemplate>
			<!-- #ifndef H5 -->
			<passwordPopup></passwordPopup>
			<!-- #endif -->
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
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	import {
		getSeckillProductDetail,
		getProductCode,
		collectAdd,
		collectDel,
		postCartAdd,
		copyPasswordApi, priceRuleApi
	} from '@/api/store.js';
	import { getUserInfo, imgToBase } from '@/api/user.js';
	import { getCoupons, getShopCoupons } from '@/api/api.js';
	import { getCartCounts } from '@/api/order.js';
	import { mapGetters } from "vuex";
	import { imageBase64 } from "@/api/public";
	import specs from '@/components/specs/index.vue';
	import productConSwiper from '@/components/productConSwiper';
	import productWindow from '@/components/productWindow';
	import copyPassword from '@/components/copyPassword';
	import userEvaluation from '@/components/userEvaluation';
	import countDown from '@/components/countDown';
	import home from '@/components/home';
	import { HTTP_REQUEST_URL } from '@/config/app';
	import { silenceBindingSpread, configMap } from "@/utils";
	import parser from "@/components/jyf-parser/jyf-parser";
	import authorize from '@/components/Authorize';
	// #ifndef H5
	import passwordPopup from '@/components/passwordPopup';
	// #endif
	import history from "@/mixins/history";
	import shareScence from "@/libs/spread";
	import guaranteeTemplate from '@/components/freightGuarantee';
	const app = getApp();
	export default {
		components: {
			// #ifndef H5
			passwordPopup,
			// #endif
			specs,
			productConSwiper,
			productWindow,
			userEvaluation,
			home,
			countDown,
			guaranteeTemplate,
			copyPassword,
			"jyf-parser": parser,
			authorize,
		},
		mixins: [history],
		data() {
			let that = this;
			return {
				isNodes: 0, //控制什么时候开始抓取元素节点,只要数值改变就重新抓取
				countDownHour: "00",
				countDownMinute: "00",
				countDownSecond: "00",
				datatime: '',
				statusBarHeight: statusBarHeight, //系统导航条高度
				//属性是否打开
				coupon: {
					'coupon': false,
					list: [],
				},
				attrTxt: '选择', //属性页面提示
				attrValue: '', //已选属性
				animated: false, //购物车动画
				id: 0, //商品id
				replyCount: 0, //总评论数量
				reply: [], //评论列表
				storeInfo: {}, //商品详情
				productValue: [], //系统属性
				cart_num: 1, //购买数量
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				isOpen: false, //是否打开属性组件
				actionSheetHidden: true,
				posterImageStatus: false,
				storeImage: '', //海报产品图
				PromotionCode: '', //二维码图片
				canvasStatus: false, //海报绘图标签
				posterImage: '', //海报路径
				posterbackgd: '/static/images/posterbackgd.png',
				// uid: 0, //用户uid
				circular: false,
				autoplay: false,
				interval: 3000,
				duration: 500,
				clientHeight: "",
				priceRule: "",
				systemStore: {}, //门店信息
				replyChance: 0,
				CartCount: 0,
				isDown: true,
				storeSelfMention: true,
				posters: false,
				weixinStatus: false,
				attr: {
					cartAttr: false,
					productAttr: [],
					productSelect: {}
				},
				description: '',
				navActive: 0,
				H5ShareBox: false, //公众号分享图片
				activity: [],
				retunTop: true, //顶部返回
				navH: "",
				navList: [],
				opacity: 0,
				scrollY: 0,
				topArr: [],
				toView: '',
				height: 0,
				heightArr: [],
				lock: false,
				scrollTop: 0,
				tagStyle: {
					img: 'width:100%;display:block;'
				},
				// 动画状态
				showAnimate: true,
				domain: HTTP_REQUEST_URL,
				currSpid: "",
				codeImg: "",
				videoCoverImg: "",
				shipping: "",
				guarantee: [],
				guaranteeValue: "",
				shippingValue: "",
				isCopy: false,
				copyUrl: '',
				services_type: "",
				specsInfo: {
				  show: false,
				  params: []
				},
			};
		},
		computed: configMap(['hide_mer_status','site_name','share_pic'],mapGetters(['isLogin','uid','viewColor'])),
		onLoad(options) {
			let that = this;
			if (options.spid) {
				that.currSpid = options.spid
				app.globalData.spid = options.spid;
			}
			var pages = getCurrentPages();
			if (pages.length <= 1) {
				that.retunTop = false
			}
			// #ifdef MP
			this.navH = app.globalData.navHeight;
			// #endif
			// #ifndef MP
			this.navH = 96;
			// #endif
			this.id = options.id;
			if (options.id) {
				this.id = options.id
			}
			uni.getSystemInfo({
				success: function(res) {
					that.height = res.windowHeight
				},
			});
			//扫码携带参数处理
			// #ifdef MP
			if (options.scene) {
				let value = this.$util.getUrlParams(decodeURIComponent(options.scene));
				if (value.id) options.id = value.id;
				//记录推广人uid
				if (value.spid) {
					app.globalData.spid = value.spid;
					that.currSpid = value.spid
				}
			}
			if (!options.id && !options.scene) {
				return this.$util.Tips({
					title: '缺少参数无法查看商品'
				}, {
					tab: 3,
					url: 1
				});
			} else {
				this.id = options.id
			}
			//记录推广人uid
			if (options.spid) app.globalData.spid = options.spid;
			// #endif
			shareScence(that.currSpid, that.isLogin)
			this.getGoodsDetails();

			//#ifdef H5
			this.isLogin && silenceBindingSpread();
			//#endif
			if (this.isLogin) {
				this.downloadFilePromotionCode();
				// #ifdef MP
				this.getHistory()
				// #endif
			}
		},
		onReady() {
			this.isNodes++;
		},
		mounted: function() {

		},
		show() {

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
				path: '/pages/activity/goods_seckill_details/index?id=' + that.id + '&spid=' + that.uid,
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
		methods: {
			call: function(){
				uni.makePhoneCall({
					// 手机号
				    phoneNumber: this.storeInfo.merchant.service_phone,
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				});
			},
			goCustomer(){
				let that = this;
				if (that.isLogin === false) {
				    this.isAuto = true;
				    this.isShowAuth = true
				} else {
					uni.navigateTo({
						url: `/pages/chat/customer_list/chat?mer_id=${that.storeInfo.mer_id}&uid=${that.uid}&productId=${that.id}`
					});
				}
			},
			goProDetail(item) {
				uni.redirectTo({
					url: '/pages/goods_details/index?id=' + item.product_id
				})
			},
			/**查看运费说明*/
			showShip: function() {
				this.$refs.guartemplate.showShippingTel();
			},
			/**查看服务保障*/
			showGuaranee: function() {
				this.$refs.guartemplate.showGuaranteeTel();
			},
			/**查看商品参数*/
			seeSpecs() {
			  this.specsInfo.show = true;
			},
			mySpecs() {
			  this.$set(this.specsInfo, 'show', false);
			},
			/*获取价格说明*/
			getPricrRule() {
				priceRuleApi(this.storeInfo.cate_id).then(res => {
					this.priceRule = res.data
				}).catch(err => {
			
				});
			},
			goActivity: function(e) {
				let item = e;
				if (item.type === "1") {
					uni.navigateTo({
						url: `/pages/activity/goods_seckill_details/index?id=${item.id}&status=1`
					});
				} else if (item.type === "2") {
					uni.navigateTo({
						url: `/pages/activity/goods_bargain_details/index?id=${item.id}&bargain=${this.uid}`
					});
				} else {
					uni.navigateTo({
						url: `/pages/activity/goods_combination_details/index?id=${item.id}`
					});
				}
			},
			/**
			 * 购物车手动填写
			 *
			 */
			iptCartNum: function(e) {
				this.$set(this.attr.productSelect, 'cart_num', e);
			},
			// 后退
			returns: function() {
				uni.navigateBack()
			},
			// 首页
			goHome() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			tap: function(index) {
				var id = "past" + index;
				var index = index;
				var that = this;
				this.$set(this, 'toView', id);
				this.$set(this, 'navActive', index);
				this.$set(this, 'lock', true);
				this.$set(this, 'scrollTop', index > 0 ? that.topArr[index] - (app.globalData.navHeight / 2) : that.topArr[index]);
			},
			scroll: function(e) {
				var that = this,
					scrollY = e.detail.scrollTop;
				var opacity = scrollY / 200;
				opacity = opacity > 1 ? 1 : opacity;
				that.$set(that, 'showAnimate', false);
				that.$set(that, 'opacity', opacity);
				that.$set(that, 'scrollY', scrollY);
				if (that.lock) {
					that.$set(that, 'lock', false)
					return;
				}
				for (var i = 0; i < that.topArr.length; i++) {
					if (scrollY < that.topArr[i] - (app.globalData.navHeight / 2) + that.heightArr[i]) {
						that.$set(that, 'navActive', i)
						break
					}
				}
			},
			// 微信登录回调
			onLoadFun: function(e) {
				this.getCartCount();
				this.downloadFilePromotionCode();
				this.isShowAuth = false
			},
			/*
			 * 获取用户信息
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {});
			},
			/**
			 * 购物车数量加和数量减
			 *
			 */
			ChangeCartNum: function(changeValue) {
				//changeValue:是否 加|减
				//获取当前变动属性
				let productSelect = this.productValue[this.attrValue];
				//如果没有属性,赋值给商品默认库存
				if (productSelect === undefined && !this.attr.productAttr.length)
					productSelect = this.attr.productSelect;
				//无属性值即库存为0；不存在加减；
				if (productSelect === undefined) return;
				let stock = productSelect.stock || 0;
				let num = this.attr.productSelect;
				if (changeValue) {
					num.cart_num++;
					if (num.cart_num > stock) {
						this.$set(this.attr.productSelect, "cart_num", stock);
						this.$set(this, "cart_num", stock);
					}
				} else {
					num.cart_num--;
					if (num.cart_num < 1) {
						this.$set(this.attr.productSelect, "cart_num", 1);
						this.$set(this, "cart_num", 1);
					}
				}
			},
			attrVal(val) {
				this.$set(this.attr.productAttr[val.indexw], 'index', this.attr.productAttr[val.indexw].attr_values[val.indexn]);
			},
			/**
			 * 属性变动赋值
			 *
			 */
			ChangeAttr: function(res) {
				let productSelect = this.productValue[res];
				if (productSelect && productSelect.stock > 0) {
					this.$set(this.attr.productSelect, "image", productSelect.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.unique);
					this.$set(this.attr.productSelect, "cart_num", 1);
					this.$set(this, "attrValue", res);
					this.$set(this, "attrTxt", "选择");
				} else {
					this.$set(this.attr.productSelect, "image", this.storeInfo.image);
					this.$set(this.attr.productSelect, "price", this.storeInfo.price);
					this.$set(this.attr.productSelect, "stock", 0);
					this.$set(this.attr.productSelect, "unique", "");
					this.$set(this.attr.productSelect, "cart_num", 0);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "选择");
				}
			},
			setClientHeight: function() {
				let that = this;
				let view = uni.createSelectorQuery().in(this).select("#list0");
				view.fields({
					size: true,
				}, data => {
					that.$set(that, 'clientHeight', data.height + 20)
				}).exec();
			},
			/**
			 * 获取产品详情
			 *
			 */
			getGoodsDetails: function() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let that = this;
				getSeckillProductDetail(that.id).then(async res => {
					uni.hideLoading();
					let storeInfo = res.data;
					if (storeInfo.video_link && storeInfo.slider_image.length > 1) {
						this.videoCoverImg = storeInfo.slider_image[0]
						storeInfo.slider_image.splice(0, 1)
					} else if (storeInfo.video_link && storeInfo.slider_image.length === 1) {
						this.videoCoverImg = storeInfo.slider_image[0]
					}
					that.$set(that, 'storeInfo', storeInfo);
					that.$set(that, 'description', storeInfo.content);
					that.$set(that, 'reply', res.data.topReply ? [res.data.topReply] : []);
					that.$set(that, 'replyCount', res.data.replayData && res.data.replayData.count);
					that.$set(that, 'replyChance', res.data.replayData && res.data.replayData.rate);
					that.$set(that.attr, 'productAttr', res.data.attr);
					that.$set(that, 'productValue', res.data.sku);
					that.$set(that, 'systemStore', res.data.system_store);
					that.$set(that, 'storeSelfMention', res.data.store_self_mention);
					that.$set(that, 'PromotionCode', storeInfo.code_base);
					that.$set(that, 'activity', res.data.activity ? res.data.activity : []);
					that.$set(that, 'datatime', res.data.stop ? res.data.stop : []);
					that.$set(that, 'shippingValue', res.data.temp ? res.data.temp.name : '');
					that.$set(that, 'guaranteeValue', res.data.guarantee ? res.data.guarantee.template_name : '');
					that.$set(that, 'guarantee', res.data.guaranteeTemplate ? res.data.guaranteeTemplate : []);
					that.$set(that, 'shipping', res.data.temp ? res.data.temp.info : '');
					that.$set(that.specsInfo, 'params', res.data.params);	
					uni.setNavigationBarTitle({
						title: storeInfo.store_name.substring(0, 7) + "..."
					})
					that.$set(that, 'storeImage', that.storeInfo.image);
					// #ifdef H5
					if (that.isLogin) {
						that.getCartCount();
						that.ShareInfo();
						that.downloadFilePromotionCode();
					};

					// #endif
					// #ifdef APP-PLUS || MP
					that.getCartCount();
					// #endif
					setTimeout(function() {
						that.infoScroll();
					}, 500);
					that.DefaultSelect();
					that.getPricrRule(that.storeInfo.cate_id);
				}).catch(err => {
					//状态异常返回上级页面
					return that.$util.Tips({
						title: err
					}, {
						tab: 3,
						url: 1
					});
				})
			},
			infoScroll: function() {
				var that = this,
					topArr = [],
					heightArr = [];
				for (var i = 0; i < that.navList.length; i++) { //productList
					//获取元素所在位置
					var query = uni.createSelectorQuery().in(this);
					var idView = "#past" + i;
					query.select(idView).boundingClientRect();
					query.exec(function(res) {
						var top = res[0].top;
						var height = res[0].height;
						topArr.push(top);
						heightArr.push(height);
						that.$set(that, 'topArr', topArr);
						that.$set(that, 'heightArr', heightArr);
					});
				};
			},
			/**
			 * 拨打电话
			 */
			makePhone: function() {
				uni.makePhoneCall({
					phoneNumber: this.systemStore.phone
				})
			},
			/**
			 * 默认选中属性
			 *
			 */
			DefaultSelect: function() {
				let productAttr = this.attr.productAttr;
				let value = [];
				let arr = []
				let unSortArr = []
				for (var key in this.productValue) {
					if (this.productValue[key].stock > 0) {
						value = this.attr.productAttr.length ? key.split(",") : [];
						break;
					}
				}
				for (let i = 0; i < productAttr.length; i++) {
					this.$set(productAttr[i], "index", value[i]);
				}
				//sort();排序函数:数字-英文-汉字；
				let productSelect = this.productValue[value.join(",")];
				if (productSelect && productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"store_name",
						this.storeInfo.store_name
					);
					this.$set(this.attr.productSelect, "image", productSelect.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.unique);
					this.$set(this, "attrValue", value.join(","));
					this.$set(this, "attrTxt", "选择");
					if (productSelect.stock == 0) {
						this.$set(this.attr.productSelect, "cart_num", 0);
					} else {
						this.$set(this.attr.productSelect, "cart_num", 1);
					}
				} else if (!productSelect && productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"store_name",
						this.storeInfo.store_name
					);
					this.$set(this.attr.productSelect, "image", this.storeInfo.image);
					this.$set(this.attr.productSelect, "price", this.storeInfo.price);
					this.$set(this.attr.productSelect, "stock", 0);
					this.$set(this.attr.productSelect, "unique", "");
					this.$set(this.attr.productSelect, "cart_num", 0);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "选择");
				} else if (!productSelect && !productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"store_name",
						this.storeInfo.store_name
					);
					this.$set(this.attr.productSelect, "image", this.storeInfo.image);
					this.$set(this.attr.productSelect, "price", this.storeInfo.price);
					this.$set(this.attr.productSelect, "stock", this.storeInfo.stock);
					this.$set(
						this.attr.productSelect,
						"unique",
						this.storeInfo.unique || ""
					);
					this.$set(this.attr.productSelect, "cart_num", 1);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "选择");
				} else if (productSelect && !productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"store_name",
						this.storeInfo.store_name
					);
					this.$set(this.attr.productSelect, "image", productSelect.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.unique);
					this.$set(this, "attrValue", value.join(","));
					this.$set(this, "attrTxt", "选择");
					if (productSelect.stock == 0) {
						this.$set(this.attr.productSelect, "cart_num", 0);
					} else {
						this.$set(this.attr.productSelect, "cart_num", 1);
					}
				}
			},
			/*
			 *  单独购买
			 */
			openAlone: function() {
				uni.navigateTo({
					url: `/pages/goods_details/index?id=${this.storeInfo.old_product_id}`
				})
			},
			/**
			 *
			 *
			 * 收藏商品
			 */
			setCollect: function() {
				if (this.isLogin === false) {
                    this.isAuto = true;
                    this.isShowAuth = true
				} else {
					let that = this;
					if (this.storeInfo.isRelation) {
						collectDel({
							type: 1,
							type_id: this.id
						}).then(res => {
							that.$set(that.storeInfo, 'isRelation', !that.storeInfo.isRelation);
						})
					} else {
						collectAdd({
							type_id: this.id,
							type: 1
						}).then(res => {
							that.$set(that.storeInfo, 'isRelation', !that.storeInfo.isRelation);
						})
					}
				}
			},
			/**
			 * 打开属性插件
			 */
			selecAttr: function() {
				this.$set(this.attr, 'cartAttr', true);
				this.$set(this, 'isOpen', true);
			},

			onMyEvent: function() {
				this.$set(this.attr, 'cartAttr', false);
				this.$set(this, 'isOpen', false);
			},
			/**
			 * 打开属性加入购物车
			 *
			 */
			joinCart: function(e) {
				//是否登录
				if (this.isLogin === false) {
                    this.isAuto = true;
                    this.isShowAuth = true
				} else {
					this.goCat();
				}
			},
			/*
			 * 加入购物车
			 */
			goCat: function(news) {
				let that = this,
					productSelect = that.productValue[this.attrValue];
				//打开属性
				if (that.attrValue) {
					//默认选中了属性，但是没有打开过属性弹窗还是自动打开让用户查看默认选中的属性
					that.attr.cartAttr = !that.isOpen ? true : false;
				} else {
					if (that.isOpen) that.attr.cartAttr = true;
					else that.attr.cartAttr = !that.attr.cartAttr;

				}
				//只有关闭属性弹窗时进行加入购物车
				if (that.attr.cartAttr === true && that.isOpen === false)
					return (that.isOpen = true);
				//如果有属性,没有选择,提示用户选择
				if (
					that.attr.productAttr.length &&
					that.isOpen === true &&
					productSelect.stock == 0
				)
					return that.$util.Tips({
						title: "产品库存不足，请选择其它"
					});
				let q = {
					is_new: 1,
					product_id: that.id,
					cart_num: that.attr.productSelect.cart_num,
					product_attr_unique: that.attr.productSelect !== undefined ? that.attr.productSelect.unique : "",
					product_type: 1,
					spread_id: this.currSpid
				};
				postCartAdd(q)
					.then(function(res) {
						that.isOpen = false;
						that.attr.cartAttr = false;
						if (news) {
							uni.navigateTo({
								url: '/pages/users/order_confirm/index?cartId=' + res.data.cart_id + '&seckillId=' + that.id
							});
						} else {
							that.$util.Tips({
								title: "添加购物车成功",
								success: () => {
									that.getCartCount(true);
								}
							});
						}
					})
					.catch(res => {
						that.isOpen = false;
						return that.$util.Tips({
							title: res
						});
					});
			},
			/**
			 * 获取购物车数量
			 * @param boolean 是否展示购物车动画和重置属性
			 */
			getCartCount: function(isAnima) {
				let that = this;
				const isLogin = that.isLogin;
				if (isLogin) {
					getCartCounts().then(res => {
						that.CartCount = res.data[0].count;
						//加入购物车后重置属性
						if (isAnima) {
							that.animated = true;
							setTimeout(function() {
								that.animated = false;
							}, 500);
						}
					});
				}
			},
			/**
			 * 立即购买
			 */
			goBuy: function(e) {
				if (this.isLogin === false) {
					this.isAuto = true;
					this.isShowAuth = true
				} else {
					this.goCat(true);
				}
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			/**
			 * 分享打开
			 *
			 */
			listenerActionSheet: function() {
				if (this.isLogin === false) {
					this.isAuto = true;
					this.isShowAuth = true
				} else {
					// #ifdef H5
					if (this.$wechat.isWeixin() === true) {
						this.weixinStatus = true;
					}
					// #endif
					this.posters = true;
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
			//替换安全域名
			setDomain: function(url) {
				url = url ? url.toString() : '';
				//本地调试打开,生产请注销
				if (url.indexOf("https://") > -1) return url;
				else return url.replace('http://', 'https://');
			},
			/**
			 * 获取产品分销二维码
			 * @param function successFn 下载完成回调
			 *
			 */
			downloadFilePromotionCode() {
				let that = this;
				let type;
				// #ifndef MP
				type = 'wechat'
				// #endif
				// #ifdef MP
				type = 'routine'
				// #endif
				getProductCode(that.id, {
					type: type,
					product_type: 1
				}).then(async res => {
					this.codeImg = res.data.url;
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
			async imgToBase(url) {
				let res = await imgToBase({
					image: url
				})
				return res.data.image
			},
			// 小程序关闭分享弹窗；
			goFriend: function() {
				this.posters = false;
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
				// #ifdef MP || APP-PLUS
				arr2 = [that.posterbackgd, await that.fileStoreImage(that.storeImage), await that.fileStoreImage(
					that.codeImg), await that.fileStoreImage(that.share_pic)];
				// #endif
				// #ifdef H5
				arr2 = [that.posterbackgd, await that.imgToBase(that.storeImage), await that.imgToBase(that.codeImg), await that.imgToBase(that.share_pic)];
				// #endif
				that.$util.goodsPosterCanvas(arr2, that.storeInfo.store_name, that.storeInfo.price, that.site_name, that.storeInfo.ot_price, function(tempFilePath) {
					that.$set(that, 'posterImage', tempFilePath);
					that.$set(that, 'posterImageStatus', true);
					that.$set(that, 'canvasStatus', false);
					that.$set(that, 'actionSheetHidden', !that.actionSheetHidden);
				}, (err) => {
					that.$set(that, 'canvasStatus', false);
				});
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
			/*
			 * 保存到手机相册
			 */
			savePosterPath: function() {
				let that = this;
				// #ifdef MP
				uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.writePhotosAlbum']) {
							uni.authorize({
								scope: 'scope.writePhotosAlbum',
								success() {
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
										}
									})
								}
							})
						} else {
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
						}
					}
				})
				// #endif
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
					product_type: 1
				}).then(async res => {
					that.copyUrl = res.data.str;
					that.posters = false
					that.isCopy = true;
				})
			},
			closeCopy(){
				this.isCopy = false
			},
			//#ifdef H5
			ShareInfo() {
				let data = this.storeInfo;
				let href = location.href;
				if (this.$wechat.isWeixin()) {
					getUserInfo().then(res => {
						href =
							href.indexOf("?") === -1 ?
							href + "?spid=" + res.data.uid :
							href + "&spid=" + res.data.uid;

						let configAppMessage = {
							desc: data.store_info,
							title: data.store_name,
							link: href,
							imgUrl: data.image
						};
						this.$wechat.wechatEvevt([
							"updateAppMessageShareData",
							"updateTimelineShareData",
							"onMenuShareAppMessage",
							"onMenuShareTimeline"
						], configAppMessage).then(res => {}).catch(err => {
							console.log(err);
						})
					});
				}
			},
			//#endif
		},
	}
</script>

<style scoped lang="scss">
	.font-bg-red{
		position: relative;
		top: -3rpx;
		background-color: var(--view-theme);
		border: 1px solid var(--view-theme);
	}
	.product-con .nav {
		background-color: var(--view-theme);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 100rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	.t-color {
		color: var(--view-theme);
	}
	.product-con .nav .money {
		font-size: 28rpx;
		color: #fff;
	}
	.product-con .nav .money .num {
		font-size: 48rpx;
	}
	.product-con .nav .money .y-money {
		font-size: 26rpx;
		margin-left: 10rpx;
		text-decoration: line-through;
	}
	.product-con .nav .time {
		font-size: 20rpx;
		color: #fff;
		text-align: center;
	}
	.product-con .nav .time .timeCon {
		margin-top: 10rpx;
	}
	.product-con .nav .time .timeCon .num {
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
		padding: 32rpx;
		width: 100%;
		box-sizing: border-box;
	}
	.product-con .attribute .params{
		margin-right: 20rpx;
		font-size: 28rpx;
		color: #282828;
		&:nth-child(2){
			margin-right: 0;
		}
	}
	.product-con .wrapper .introduce {
		align-items: center;
		position: relative;
		padding-right: 50rpx;
		margin-bottom: 30rpx;
		.fenxiang_btn {
			text-align: center;
			font-size: 14rpx;
			color: #666;
			font-weight: normal;
			position: absolute;
			top: -4rpx;
			right: 0;
		}
	}
	.product-con .wrapper .introduce .infor {
		width: 570rpx;
	}

	.product-con .wrapper .introduce .iconfont {
		font-size: 37rpx;
		color: #515151;
	}
	.product-con .wrapper .label {
		margin: 18rpx 0 0 0;
		font-size: 24rpx;
		color: #82848f;
	}
	.product-con .wrapper .label .stock {
		width: 255rpx;
		margin-right: 28rpx;
	}
	.activity_pin {
		width: auto;
		height: 44rpx;
		line-height: 44rpx;
		background: linear-gradient(90deg, rgba(233, 51, 35, 1) 0%, rgba(250, 101, 20, 1) 100%);
		opacity: 1;
		border-radius: 22rpx;
		padding: 0 15rpx;
		margin-left: 19rpx;
	}
	.activity_miao {
		width: auto;
		height: 44rpx;
		line-height: 44rpx;
		padding: 0 15rpx;
		background: linear-gradient(90deg, rgba(250, 102, 24, 1) 0%, rgba(254, 161, 15, 1) 100%);
		opacity: 1;
		border-radius: 22rpx;
		margin-left: 19rpx;
	}
	.iconfonts {
		color: #fff !important;
		font-size: 28rpx;
	}
	.activity_title {
		font-size: 24rpx;
		color: #fff;
	}
	.activity_kan {
		width: auto;
		height: 44rpx;
		line-height: 44rpx;
		padding: 0 15rpx;
		background: linear-gradient(90deg, rgba(254, 159, 15, 1) 0%, rgba(254, 178, 15, 1) 100%);
		opacity: 1;
		border-radius: 22rpx;
		margin-left: 19rpx;
	}
	.mask {
		z-index: 300 !important;
	}
	.head-bar {
		background: #fff;
	}
	.generate-posters {
		width: 100%;
		height: 170rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 388;
		transform: translate3d(0, 100%, 0);
		transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		border-top: 1px solid #eee;
	}
	.generate-posters.on {
		transform: translate3d(0, 0, 0);
	}
	.generate-posters .item {
		/* #ifdef H5 */
		flex: 50%;
		/* #endif */
		/* #ifndef H5 */
		flex: 33.33%;
		/* #endif */
		text-align: center;
		font-size: 30rpx;
		&.item3{
			flex: 33.33%;
		}
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
	.product-con .mask {
		z-index: 88;
	}
	.product-con .footer {
		padding: 0 20rpx 0 80rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		height: 100rpx;
		height: calc(100rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		height: calc(100rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		background-color: #fff;
		z-index: 277;
		border-top: 1px solid #f0f0f0;
	}
	.product-con .attribute .atterTxt {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		display: inline;
		width: 400rpx;
	}
	.product-con .attribute .atterTxt1{
		color: #282828;
		&.hasAttr{
			&:after{
				content: "";
				display: inline-block;
				position: relative;
				top: -6rpx;
				margin: 0 6rpx;
				width: 5rpx;
				height: 5rpx;
				background-color: #282828;
				border-radius: 100%;
			}
			&:last-child{
				&:after{
					display: none;
				}
			}
		}
	}
	.product-con .guaranteeAttr{
		display: inline-block;
		width: 560rpx;
		overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
	}
	.product-con .footer .item {
		font-size: 18rpx;
		color: #666;
		text-align: center;
	}
	.product-con .footer .item .iconfont {
		text-align: center;
		font-size: 40rpx;
	}
	.product-con .footer .item .iconfont.icon-shoucang1 {
		color: var(--view-priceColor);
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
		width: 444rpx;
		height: 76rpx;
	}
	.product-con .footer .bnt .bnts {
		width: 222rpx;
		text-align: center;
		line-height: 76rpx;
		color: #fff;
		font-size: 28rpx;
	}

	.product-con .footer .bnt .joinCart {
		border-radius: 50rpx 0 0 50rpx;
		background-image: linear-gradient(to right, var(--view-bntColor11) 0%, var(--view-bntColor12) 100%);
	}
	.product-con .footer .bnt .buy {
		border-radius: 0 50rpx 50rpx 0;
		background-image: linear-gradient(to right, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
	}
	.product-con .footer .bnt .joinCart[disabled] {
		background: #bbb;
	}
	.product-con .footer .bnt .buy[disabled] {
		background: #bbb;
	}
	.product-con .superior {
		background-color: #fff;
		margin-top: 20rpx;
		padding-bottom: 10rpx;
	}
	.product-con .superior .title {
		height: 98rpx;
	}
	.product-con .superior .title image {
		width: 30rpx;
		height: 30rpx;
	}
	.product-con .superior .title .titleTxt {
		margin: 0 20rpx;
		font-size: 30rpx;
		background-image: linear-gradient(to right, #f57a37 0%, #f21b07 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.product-con .superior .slider-banner {
		width: 690rpx;
		margin: 0 auto;
		position: relative;
	}
	.product-con .superior .slider-banner swiper {
		height: 100%;
		width: 100%;
	}
	.product-con .superior .slider-banner swiper-item {
		height: 100%;
	}
	.product-con .superior .slider-banner .list {
		width: 100%;
	}
	.product-con .superior .slider-banner .list .item {
		width: 215rpx;
		margin: 0 22rpx 30rpx 0;
		font-size: 26rpx;
	}
	.product-con .superior .slider-banner .list .item:nth-of-type(3n) {
		margin-right: 0;
	}
	.product-con .superior .slider-banner .list .item .pictrue {
		position: relative;
		width: 100%;
		height: 215rpx;
	}
	.product-con .superior .slider-banner .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}
	.product-con .superior .slider-banner .list .item .name {
		color: #282828;
		margin-top: 12rpx;
	}
	.product-con .superior .slider-banner .swiper-pagination-bullet {
		background-color: #999;
	}
	.product-con .superior .slider-banner .swiper-pagination-bullet-active {
		background-color: #e93323;
	}
	button {
		padding: 0;
		margin: 0;
		line-height: normal;
		background-color: #fff;
	}
	button::after {
		border: 0;
	}
	action-sheet-item {
		padding: 0;
		height: 240rpx;
		align-items: center;
		display: flex;
	}
	.contact {
		font-size: 16px;
		width: 50%;
		background-color: #fff;
		padding: 8rpx 0;
		border-radius: 0;
		margin: 0;
		line-height: 2;
	}
	.contact::after {
		border: none;
	}
	.action-sheet {
		font-size: 17px;
		line-height: 1.8;
		width: 50%;
		position: absolute;
		top: 0;
		right: 0;
		padding: 25rpx 0;
	}
	.canvas {
		z-index: 300;
		width: 750px;
		height: 1190px;
	}
	.poster-pop {
		width: 600rpx;
		height: 897rpx;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		z-index: 399;
		top: 50%;
		margin-top: -500rpx;
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
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 9;
	}

	.pictrue_log {
		width: 80upx;
		height: 40upx;
		border-radius: 6upx 0 12upx 0;
		line-height: 40upx;
		font-size: 24upx;
	}

	.pictrue_log_class {
		z-index: 3;
		background: -webkit-gradient(linear, left top, right top, from(rgba(246, 122, 56, 1)), to(rgba(241, 27, 9, 1)));
		background: linear-gradient(90deg, rgba(246, 122, 56, 1) 0%, rgba(241, 27, 9, 1) 100%);
		opacity: 1;
		position: absolute;
		top: 0;
		left: 0;
		color: #fff;
		text-align: center;

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

	.store-wrapper {
		margin-top: 20rpx;
		background-color: #fff;

		.store-hd {
			padding: 30rpx;
			border-bottom: 1px solid #F5F5F5;

			.store-info {
				position: relative;
				display: flex;

				.logo {
					width: 86rpx;
					height: 86rpx;

					image {
						width: 86rpx;
						height: 86rpx;
						border-radius: 6rpx;
					}
				}

				.info {
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-left: 20rpx;

					.name {
						font-size: 28rpx;
						color: #282828;
						font-weight: bold;
					}

					.txt {
						margin-top: 8rpx;
						color: #666666;
						font-size: 22rpx;
					}
				}

				.link {
					position: absolute;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
					display: flex;
					align-items: center;
					justify-content: center;
					width: 114rpx;
					height: 50rpx;
					background-image: linear-gradient(-90deg, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
					border-radius: 25rpx;
					color: #fff;
				}
			}

			.score-wrapper {
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
				.item {
					color: #948D8C;
					font-size: 26rpx;
					text {
						margin-left: 10rpx;
						color: var(--view-theme);
					}
				}
			}
		}
		.con-box {
			padding: 20rpx 0 20rpx 30rpx;
			.title {
				font-size: 28rpx;
				color: #282828;
				margin-bottom: 20rpx;
			}
			.img-box {
				display: flex;
				.img-item {
					width: 206rpx;
					margin-right: 15rpx;
					image {
						width: 206rpx;
						height: 206rpx;
						border-radius: 16rpx;
					}
					.txt {
						.title {
							font-size: 28rpx;
							color: #282828;
						}
						.price {
							color: var(--view-priceColor);
							font-size: 28rpx;

							text {
								font-size: 20rpx;
							}
						}
					}
				}
			}
		}
	}
	.sys-head {
		background: transparent;
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
