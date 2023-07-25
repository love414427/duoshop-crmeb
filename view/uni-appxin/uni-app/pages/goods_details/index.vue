<template>
	<view :style="viewColor">
		<view class="product-con">
			<!-- #ifdef H5 -->
			<view class="head-wrapper" :style="'top:'+statusBarHeight">
				<view class="head-menu">
					<view class='iconfont icon-xiangzuo' @click="returns"></view>
					<view class="iconfont icon-shouye4" @click="goHome"></view>
				</view>
			</view>
			<!-- #endif -->
			<view v-if="storeInfo && storeInfo.merchant">
				<scroll-view :scroll-top="scrollTop" scroll-y='true' scroll-with-animation="true" :style='"height:"+height+"px;"'
				 @scroll="scroll">
					<view id="past0">
						<productConSwiper :imgUrls="storeInfo.slider_image" :videoCoverImg="videoCoverImg" :videoline="storeInfo.video_link"></productConSwiper>
						<!--有氛围图-->
						<view v-if="storeInfo.atmosphere_pic" :style="{ backgroundImage: `url(${storeInfo.atmosphere_pic})` }" class='nav acea-row row-between-wrapper'>
							<view class='money skeleton-rect'>￥<text class='num'>{{storeInfo.price}}</text>
								<text v-if="!svipData"  class='y-money'>￥{{storeInfo.ot_price}}</text>
								<view class="atmosphere" v-if="svipData && svipData.show_svip_price && svipData.show_svip" style="display: inline-block;">
									<text class="vip-money">￥{{storeInfo.svip_price}}</text>
									<image class="vip-image" src="/static/images/svip.png"></image>
								</view>
							</view>
						</view>
						<view class='wrapper'>
							<view v-if="storeInfo.atmosphere_pic" class='introduce skeleton-rect acea-row row-between row-bottom atmosphere'>
								<view>
									<text v-if="(storeInfo.merchant && storeInfo.merchant.type_name)" class="font-bg-red bt-color">{{storeInfo.merchant.type_name}}</text>
									<text v-else-if="(storeInfo.merchant && storeInfo.merchant.is_trader)" class="font-bg-red bt-color">自营</text>
									{{storeInfo.store_name}}
								</view>
								<view class="fenxiang_btn" @click="listenerActionSheet">
									<view class='iconfont icon-fenxiang'></view>
									分享
								</view>	
							</view>
							<view v-if="storeInfo.atmosphere_pic" class='integral_count skeleton-rect'>
								<text v-if="storeInfo.max_integral > 0" class='integral'>积分最高可抵扣{{storeInfo.max_integral}}元</text>
								<text v-if="storeInfo.delivery_free == 1" class='integral'>包邮</text>
							</view>
							<!--无氛围图-->
							<view v-else class='share acea-row row-between row-bottom'>
								<view class='money p-color skeleton-rect' style="min-width: 70rpx;">
									￥
									<text class='num'>{{storeInfo.price}}</text>
									<view v-if="svipData && svipData.show_svip_price && svipData.show_svip" style="display: inline-block;">
										<text class="vip-money">￥{{storeInfo.svip_price}}</text>
										<image class="vip-image" src="/static/images/svip.png"></image>
									</view>
								</view>
								<view @click="listenerActionSheet" class="fenxiang_btn">
									<view class='iconfont icon-fenxiang'></view>
									分享
								</view>
							</view>
							<view 
								v-if="svipData && !svipData.is_svip && svipData.show_svip"
							  class="svipCon acea-row row-between-wrapper skeleton-rect" style="margin-top: 20rpx;">
								<view class="acea-row row-between-wrapper">
									<image src="/static/images/svip_user.png"></image>
									<view class="">开通 SVIP会员 立省<text>{{svipData.save_money}}元</text></view>
								</view>
							  <navigator class="svipBtn" url="/pages/annex/vip_paid/index">
							    立即开通
							    <text class="iconfont icon-jiantou"></text>
							  </navigator>
							</view>
							<view v-if="!storeInfo.atmosphere_pic" class='integral_count skeleton-rect'>
								<text v-if="storeInfo.max_integral > 0" class='integral'>积分最高可抵扣{{storeInfo.max_integral}}元</text>
								<text v-if="storeInfo.delivery_free == 1" class='integral'>包邮</text>
							</view>
							<view v-if="!storeInfo.atmosphere_pic" class='introduce skeleton-rect'>
								<text v-if="storeInfo.merchant.type_name" class="font-bg-red bt-color">{{storeInfo.merchant.type_name}}</text>
								<text v-else-if="storeInfo.merchant.is_trader" class="font-bg-red bt-color">自营</text>
								{{storeInfo.store_name || ''}}
							</view>
							<view class='label acea-row row-between-wrapper' :style="{'padding-bottom':coupon.list.length || storeInfo.top_pid?0 :10+'px;'}">
								<view class="skeleton-rect">市场价:￥{{storeInfo.ot_price || 0}}</view>
								<view class="skeleton-rect">库存:{{storeInfo.stock ? storeInfo.stock : 0}}{{storeInfo.unit_name ? storeInfo.unit_name : ''}}</view>
								<view class="skeleton-rect">销量:{{storeInfo.sales ? storeInfo.sales : 0}}{{storeInfo.unit_name ? storeInfo.unit_name : ''}}</view>
							</view>
							<navigator v-if="storeInfo.top_pid" hover-class='none' :url="`/pages/activity/rank/index?cate_id=${storeInfo.top_pid}`" class='label'>
								<view class="rank_list acea-row row-between-wrapper">
									<view class="acea-row row-between-wrapper">
										<text class="rank_title"></text>
										<view>{{ storeInfo.top_name }} · 第{{ storeInfo.top_num }}名</view>
									</view>
									<text class="iconfont icon-xiala1"></text>
								</view>
							</navigator>
							<view class='coupon acea-row row-between-wrapper skeleton-rect' @click='couponTap' style="margin-top: 20rpx;" v-if="coupon.list.length > 0">
								<view class='hide line1 acea-row'>
									优惠券：
									<view class='activity' v-for="(item,index) in coupon.list" :key="index">满{{item.use_min_price}}减{{item.coupon_price}}</view>
								</view>
								<view class='iconfont icon-jiantou'></view>
							</view>
						</view>
						<view class='attribute acea-row row-between-wrapper skeleton-rect' @click="selecAttr">
							<view class="acea-row row-between-wrapper">{{attrTxt}}：
								<text class='atterTxt'>{{attrValue}}</text>
							</view>
							<view class='iconfont icon-jiantou'></view>
						</view>
						<view v-if="specsInfo.params && specsInfo.params.length>0" class="attribute acea-row row-between-wrapper" @click="seeSpecs">
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
						<!--运费-->
						<view v-if="shipping || shippingValue" class='attribute acea-row row-between-wrapper' @click="showShip">
							<view class="acea-row row-between-wrapper">运费：
								<text class='atterTxt'>{{shippingValue}}</text>
							</view>
							<view class='iconfont icon-jiantou'></view>
						</view>
						<!--保障-->
						<view v-if="guarantee && guarantee.length" class='attribute acea-row row-between-wrapper' @click="showGuaranee">
							<view class="acea-row row-between-wrapper">保障：
							<view class="guaranteeAttr">
								<text class='atterTxt1' :class="item.guarantee_name ? 'hasAttr' : ''"  v-for="(item,index) in guarantee">
									{{item.guarantee_name ? item.guarantee_name : ''}}
								</text>
							</view>
							</view>
							<view class='iconfont icon-jiantou'></view>
						</view>
					</view>
					<!--优惠套餐-->
					<view class='combo' v-if="comboList && comboList.length>0">
						<view class='title acea-row row-between-wrapper'>
							<view>优惠套餐({{comboTotal}}) </view>
							<view class='praise' @click="openCombo">
								查看全部
								<text class='iconfont icon-jiantou'></text>
							</view>
						</view>
						<scroll-view scroll-x="true" style="white-space: nowrap; display: flex;height: 180rpx;" show-scrollbar="false">
							<view class="img-box">
								<view class="combo_item" v-for="(item,index) in comboList" :key="index">
									<view class="img-item" v-for="(itemn,indexn) in item.discountsProduct" :key="indexn">
										<image :src="itemn.image" mode="" @click="openCombo"></image>
										<text v-if="indexn != item.count-1" class="iconfont icon-jiahao2"></text>
									</view>
									<view class="list_total">
										<view class="list_num">共{{item.count}}件</view>
										<view class="list_price p-color">省 ¥{{item.max_price}}</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class='userEvaluation' id="past1" v-if="replyCount && replyCount>0">
						<view class='title acea-row row-between-wrapper skeleton-rect'>
							<view>用户评价({{replyCount}})</view>
							<navigator class='praise' hover-class='none' :url='"/pages/users/goods_comment_list/index?product_id="+id'>
								<text class='t-color'>{{replyChance}}</text>好评率
								<text class='iconfont icon-jiantou'></text>
							</navigator>
						</view>
						<block v-if="replyCount && replyCount>0">
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
							<view class="pictrue" v-for="(item, index) in storeInfo.community" :key="index" v-if="index<=2"
							 @click="goPlant(item)">
								<image :src="item.image[0]" class="image"></image>
								<image v-if="item.is_type == 2" class="video_img" src="@/static/images/stop.png" mode=""></image>
							</view>
						</view>
					</view>
					<!-- 商铺信息 -->
					<view class="store-wrapper" v-if="storeInfo.merchant && hide_mer_status !=1">
						<view class="store-hd skeleton-rect">
<!-- 							<view class="store-info">
								<view class="logo">
									<image :src="storeInfo.merchant.mer_avatar" mode=""></image>
								</view>
								<view class="info">
									<view class="name line1">
										<text>{{storeInfo.merchant.mer_name ? storeInfo.merchant.mer_name : ''}}</text>
										<image v-if="margin_ico_switch==1 && margin_ico && storeInfo.merchant.is_margin == 10" :src="margin_ico" class="store-margin"></image>
										<text v-if="storeInfo.merchant.type_name" class="font-bg-red ml8 bt-color">{{storeInfo.merchant.type_name}}</text>
										<text v-else-if="storeInfo.merchant.is_trader" class="font-bg-red ml8 bt-color">自营</text>
									</view>
									<view v-if="storeInfo.merchant.care_count" class="txt">
										{{storeInfo.merchant.care_count < 10000 ? storeInfo.merchant.care_count : (storeInfo.merchant.care_count/10000).toFixed(2)+'万'}}人关注
									</view>
									<view v-else class="txt">0人关注</view>
								</view>
								<navigator v-if="hide_mer_status != 1" :url="'/pages/store/home/index?id='+storeInfo.merchant.mer_id" class="link"
								 hover-class="none">进店</navigator>
							</view> -->
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
										<easy-loadimage mode="widthFix" :image-src="item.image"></easy-loadimage>
										<!-- <image :src="item.image"></image> -->
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
							<!-- #ifndef APP-PLUS -->
							<jyf-parser v-if="description.type == 0" :domain='domain' :html="description.content.replace(/<br\/>/ig, '')" ref="article" :tag-style="tagStyle"></jyf-parser>
							<!-- #endif -->
							<!-- #ifdef APP-PLUS -->
							<view v-if="description.type == 0" class="description" v-html="description.content.replace(/<br\/>/ig, '')"></view>
							<!-- #endif -->
							<view v-else class="product_content">
								<view v-if="description.content && description.content.title" class="title">{{description.content.title}}</view>
								<view v-if="description.content && description.content.image" class="pictures">
									<image v-for="(item,index) in description.content.image" :key="index" :src="item"></image>
								</view>
							</view>
						</view>
						<!-- 价格说明 -->
						<view v-if="priceRule.content" class="price-info">
							<view class="price-title">{{priceRule.rule_name}}</view>
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
				<view v-else class="item skeleton-rect" @click="couponTap2">
					<view class="iconfont icon-kefu"></view>
					<view>客服</view>
				</view>
				<view @click="setCollect" class='item skeleton-rect'>
					<view class='iconfont icon-shoucang1' v-if="storeInfo.isRelation"></view>
					<view class='iconfont icon-shoucang' v-else></view>
					<view>收藏</view>
				</view>
				<navigator open-type='switchTab' class="animated item skeleton-rect" :class="animated==true?'bounceIn':''" url='/pages/order_addcart/order_addcart'
				 hover-class="none">
					<view class='iconfont icon-gouwuche1'>
						<text v-if="CartCount>0" class='num'>{{CartCount || 0}}</text>
					</view>
					<view>购物车</view>
				</navigator>
				<view v-if="attr.productSelect.stock != 0" class='bnt acea-row skeleton-rect'>
					<form @submit="joinCart" report-submit='true'>
						<button v-if="storeInfo.type != 1&&storeInfo.type != 2" class='joinCart bnts' form-type="submit">加入购物车</button>
					</form>
					<form @submit="goBuy" report-submit='true' v-if="attr.productSelect">
						<button class='buy bnts' :class="storeInfo.type == 1 || storeInfo.type == 2 ? 'virtual_buy' : ''" form-type="submit" :disabled="attr.productSelect.stock == 0">立即购买</button>
					</form>
				</view>
				<view v-else class='bnt acea-row skeleton-rect'>
					<form report-submit='true'>
						<button v-if="arrival_notice" class='buy bnts sold_out' form-type="submit" @click="arrivalNotice">到货通知</button>
						<button v-else class='buy bnts sold_out' form-type="submit" disabled>商品已售罄</button>
					</form>
				</view>
			</view>
			<block v-if="sharePacket.max&&sharePacket.max>0">
				<shareRedPackets :sharePacket="sharePacket" @listenerActionSheet="listenerActionSheet" @closeChange="closeChange"
				 :showAnimate="showAnimate" @boxStatus="boxStatus"></shareRedPackets>
			</block>
			<!-- 组件 -->
			<productWindow :attr="attr" :isShow='1' :iSplus='1' @myevent="onMyEvent" @ChangeAttr="ChangeAttr" @ChangeCartNum="ChangeCartNum"
			 @attrVal="attrVal" @iptCartNum="iptCartNum" id='product-window' :maxCount="max_count" :minCount="min_count" :svipPrice="svipPrice" :image="storeInfo.image"></productWindow>
			<block v-if="coupon.coupon">
				<couponListWindow :coupon='coupon' @ChangCouponsClone="ChangCouponsClone" @ChangCoupons="ChangCoupons"
				 @ChangCouponsUseState="ChangCouponsUseState"></couponListWindow>
			</block>
			<specs :specsInfo="specsInfo" @myevent="mySpecs"></specs>
			<!-- 分享按钮 -->
			<view class="generate-posters acea-row row-middle" :class="posters ? 'on' : ''">
				<!-- #ifndef MP -->
				<button class="item" :class="weixinStatus ? 'item3' : ''"  hover-class='none' v-if="weixinStatus === true" @click="H5ShareBox = true">
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
				<!-- #ifdef APP-PLUS -->
				<view class="item" @click="appShare('WXSceneSession')">
					<view class="iconfont icon-weixin3"></view>
					<view class="">分享给好友</view>
				</view>
				<!-- #endif -->
				<button class="item" :class="weixinStatus ? 'item3' : ''" hover-class='none' @click="goPoster">
					<view class="iconfont icon-haibao"></view>
					<view class="">生成海报</view>
				</button>
				<button class="item" :class="weixinStatus ? 'item3' : ''" hover-class='none' @click="copyPwd">
					<view class="iconfont icon-fuzhikouling1"></view>
					<view>生成口令</view>
				</button>
			</view>
			<view class="mask" v-if="posters" @click="listenerActionClose"></view>
			<!--口令复制结果-->
			<copyPassword :isCopy='isCopy' :copyUrl='copyUrl' @close="closeCopy"></copyPassword>
			<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
			<!-- 海报展示 -->
			<view class='poster-pop' v-if="posterImageStatus">
				<image src='../../static/images/poster-close.png' class='close' @click="posterImageClose"></image>
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
			<!--套餐产品弹窗-->
			<discounts-goods ref="discounts" :id="id" :uid="uid"></discounts-goods>
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
	import { getconfig } from '@/api/public.js';
	import { arrivalSubscribe } from '@/utils/SubscribeMessage.js';
	import {
		getProductDetail,
		getProductCode,
		collectAdd,
		collectDel,
		postCartAdd,
		arrivalNoticeApi,
		copyPasswordApi, getDiscountsLst, priceRuleApi
	} from '@/api/store.js';
	import { getUserInfo, imgToBase } from '@/api/user.js';
	import { getCoupons,getShopCoupons } from '@/api/api.js';
	import { getCartCounts } from '@/api/order.js';
	import { mapGetters } from "vuex";
	import { configMap } from "@/utils";
	import { imageBase64 } from "@/api/public";
	import productConSwiper from '@/components/productConSwiper';
	import couponListWindow from '@/components/couponListWindow';
	import copyPassword from '@/components/copyPassword';
	import productWindow from '@/components/productWindow';
	import userEvaluation from '@/components/userEvaluation';
	import shareRedPackets from '@/components/shareRedPackets';
	import specs from '@/components/specs/index.vue';
	// #ifndef H5
	import passwordPopup from '@/components/passwordPopup';
	// #endif
	import { HTTP_REQUEST_URL } from '@/config/app';
	import home from '@/components/home';
	import { silenceBindingSpread } from "@/utils";
	import parser from "@/components/jyf-parser/jyf-parser";
	import authorize from '@/components/Authorize';
	import history from "@/mixins/history";
	import shareScence from "@/libs/spread";
	import guaranteeTemplate from '@/components/freightGuarantee';
	import discountsGoods from './discountsGoods';
	import ClipboardJS from "@/plugin/clipboard/clipboard.js";
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';
	let app = getApp();
	export default {
		components: {
			// #ifndef H5
			passwordPopup,
			// #endif
			productConSwiper,
			couponListWindow,
			productWindow,
			userEvaluation,
			shareRedPackets,
			home,
			guaranteeTemplate,
			copyPassword,
			discountsGoods,
			"jyf-parser": parser,
			authorize,
			easyLoadimage,
			specs
		},
		mixins: [history],
		data() {
			let that = this;
			return {
				isNodes: 0, //控制什么时候开始抓取元素节点,只要数值改变就重新抓取
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
				storeInfo: {
					merchant: {}
				}, //商品详情
				productValue: [], //系统属性
				couponList: [], //优惠券
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
				source: '',
				sharePacket: {
					isState: true, //默认不显示
				}, //分销商详细
				// uid: 0, //用户uid
				circular: false,
				autoplay: false,
				interval: 3000,
				duration: 500,
				clientHeight: "",
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
				hide_mer_status: 1,
				domain: HTTP_REQUEST_URL,
				currSpid: '',
				codeImg: "",
				videoCoverImg: "",
				shipping: "",
				guarantee: [],
				guaranteeValue: "",
				shippingValue: "",
				arrival_notice: 0, //是否开启到货通知
				uniqueValue: "",
				priceRule: "",
				isCopy: false,
				copyUrl: '',
				comboTotal: 0,
				comboList: [],
				max_count: 0,
				min_count: 0,
				svipData: {},
				svipPrice: false,
				specsInfo: {
				  show: false,
				  params: []
				},
			};
		},
		computed:{
			...configMap({margin_ico_switch: 0,margin_ico: '',site_name: '',share_pic: ''}, mapGetters(['isLogin','uid','viewColor'])),
		},
		onLoad(options) {
			let that = this
			if (options.spid) {
				app.globalData.spid = options.spid;
				that.currSpid = options.spid
			}
			var pages = getCurrentPages();
			let curPage = pages[pages.length - 1];
			if (pages.length <= 1) {
				that.retunTop = false
			}
			let curParam = curPage.options || curPage.$route.query;
			this.source = curParam.source;
			// #ifdef MP
			this.navH = app.globalData.navHeight;
			// #endif
			// #ifndef MP
			this.navH = 96;
			// #endif
			this.id = options.id;
			uni.getSystemInfo({
				success: function(res) {
					that.height = res.windowHeight
					//res.windowHeight:获取整个窗口高度为px，*2为rpx；98为头部占据的高度；
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
			this.getDiscountsData();
			//#ifdef H5
			this.isLogin && silenceBindingSpread();
			//#endif
			if (this.isLogin) {
				this.downloadFilePromotionCode();
				this.getHistory()
			}
		},
		onReady() {
			this.isNodes++;
		},
		onShow() {
			let that = this
			that.getConfig();
			uni.hideLoading();
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
				path: '/pages/goods_details/index?id=' + that.id + '&spid=' + that.uid,
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
					success: (res) => {},
					// 失败回调
					fail: (res) => {}
				});
			},
			getConfig() {
				let self = this
				// 获取配置
				getconfig().then(res => {
					this.hide_mer_status = res.data.hide_mer_status
					this.arrival_notice = res.data.procudt_increase_status
				}).catch(err => {})
			},
			/**到货通知*/
			arrivalNotice(){
				let that = this;
				// #ifdef MP
				arrivalSubscribe().then((res) => {
					console.log(res)
					that.arrivalNoticeFun();
				}).catch(err => {
					console.log(err)
				});
				// #endif
				// #ifndef MP
				that.arrivalNoticeFun();
				// #endif
			},
			arrivalNoticeFun(){
				let that = this;
				let uniqueValue = that.uniqueValue;
				let typeValue = 0;
				// #ifdef MP
				typeValue = 3
				// #endif
				// #ifdef H5
				if(this.$wechat.isWeixin() === true){
					typeValue = 2
				}else{
					typeValue = 1
				}
				// #endif
				arrivalNoticeApi({ unique: uniqueValue,type:typeValue,product_id: that.id }).then(res => {
					return that.$util.Tips({
						title: res.message
					})
				}).catch(err => {
					//状态异常返回上级页面
					return that.$util.Tips({
						title: err
					})
				})
			},
			goProDetail(item) {
				uni.redirectTo({
					url: '/pages/goods_details/index?id=' + item.product_id
				})
			},
			boxStatus(data) {
				this.showAnimate = data
			},
			closeChange: function() {
				this.$set(this.sharePacket, 'isState', true);
			},
			/**查看运费说明*/
			showShip: function() {
				this.$refs.guartemplate.showShippingTel();
			},
			/**查看服务保障*/
			showGuaranee: function() {
				this.$refs.guartemplate.showGuaranteeTel();
			},
			/*查看套餐详情*/
			openCombo(){
				this.$refs.discounts.showPopup(this.id);
			},
			seeSpecs() {
			  this.specsInfo.show = true;
			},
			mySpecs() {
			  this.$set(this.specsInfo, 'show', false);
			},
			/*获取套餐列表数据*/
			getDiscountsData(){
				getDiscountsLst({product_id: this.id}).then(res => {
					this.comboTotal = res.data.count;
					res.data.list.forEach((item, index) => {
						item.save_price = 0;
						item.discountsProduct.forEach((v, i) => {
							item.save_price += parseFloat(v.product.ot_price) - parseFloat(v.product.price)
						})
					})
				    this.comboList = res.data.list;
				}).catch(err => {

				});
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
						url: `/pages/activity/goods_seckill_details/index?id=${item.id}&time=${item.time}&status=1`
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
			// 种草详情
			goPlant(item){
				if(item.is_type == 1){
					uni.navigateTo({
						url: '/pages/plantGrass/plant_detail/index?id='+item.community_id
					});
				}else{
					uni.navigateTo({
						//#ifdef APP
						url: '/pages/short_video/appSwiper/index?id='+item.community_id+'&tab=1'
						//#endif
						//#ifndef APP
						url: '/pages/short_video/nvueSwiper/index?id='+item.community_id+'&tab=1'
						//#endif
					});
				}
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
				uni.$emit('scroll');
			},
			// 微信登录回调
			onLoadFun: function(e) {
				this.getCartCount();
				this.isShowAuth = false
				this.downloadFilePromotionCode()
			},
			ChangCouponsClone: function() {
				this.$set(this.coupon, 'coupon', false)
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
					if(num.cart_num > this.storeInfo.once_max_count && this.storeInfo.once_max_count !=0){
						this.$set(this.attr.productSelect, "cart_num", this.storeInfo.once_max_count);
						this.$set(this, "cart_num", this.storeInfo.once_max_count);
						return this.$util.Tips({
							title: "单次购买件数不能超过"+this.storeInfo.once_max_count+"件！"
						});
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
				if(productSelect)this.$set(this, "uniqueValue", productSelect.unique);
				if (productSelect && productSelect.stock > 0) {
					this.$set(this.attr.productSelect, "image", productSelect.image ? productSelect.image : this.storeInfo.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "svip_price", productSelect.svip_price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.unique);
					this.$set(this, "uniqueValue", productSelect.unique);
					this.$set(this.attr.productSelect, "cart_num", 1);
					this.$set(this, "attrValue", res);
					this.$set(this, "attrTxt", "选择");
				}
				 else {
					this.$set(this.attr.productSelect, "image", productSelect.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "svip_price", productSelect.svip_price);
					this.$set(this.attr.productSelect, "stock", 0);
					this.$set(this.attr.productSelect, "unique", "");
					this.$set(this.attr.productSelect, "cart_num", 0);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "选择");
				}
			},
			/**
			 * 领取完毕移除当前页面领取过的优惠券展示
			 */
			ChangCoupons: function(e) {
				let coupon = e;
				let couponList = this.$util.ArrayRemove(this.couponList, 'id', coupon.id);
				this.$set(this, 'couponList', couponList);
				this.getCouponList();
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
				getProductDetail(that.id).then(res => {
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
					if (that.description.type == 0) {
						that.description.content = that.description.content.replace(
							/<img/gi,
							'<img style="max-width:100%;height:auto;float:left;display:block" '
						);
						that.description.content = that.description.content.replace(
							/<video/gi,
							'<video style="width:100%;height:300px;display:block" '
						);
					}
					that.$set(that, 'reply', res.data.topReply ? [res.data.topReply] : []);
					that.$set(that, 'replyCount', res.data.replayData && res.data.replayData.count);
					that.$set(that, 'replyChance', res.data.replayData && res.data.replayData.rate);
					that.$set(that.attr, 'productAttr', res.data.attr);
					that.$set(that, 'productValue', res.data.sku);
					that.$set(that.sharePacket, 'priceName', res.data.priceName);
					that.$set(that.sharePacket, 'max', res.data.max_extension);
					that.$set(that.sharePacket, 'min', res.data.min_extension);
					that.$set(that, 'systemStore', res.data.system_store);
					that.$set(that, 'storeSelfMention', res.data.store_self_mention);
					that.$set(that, 'PromotionCode', storeInfo.code_base);
					that.$set(that, 'activity', res.data.activity ? res.data.activity : []);
					that.$set(that, 'shippingValue', res.data.temp ? res.data.temp.name : '');
					that.$set(that, 'guaranteeValue', res.data.guarantee ? res.data.guarantee.template_name : '');
					that.$set(that, 'guarantee', res.data.guaranteeTemplate ? res.data.guaranteeTemplate : []);
					that.$set(that, 'shipping', res.data.temp ? res.data.temp.info : '');
					that.$set(that, 'max_count', res.data.once_max_count);
					that.$set(that, 'min_count', res.data.once_min_count);
					that.$set(that, 'svipData', res.data.show_svip_info || null);		
					that.$set(that, 'svipPrice', res.data.show_svip_info && res.data.show_svip_info.show_svip_price || false);	
					
					that.$set(that.specsInfo, 'params', res.data.params);	
					uni.setNavigationBarTitle({
						title: storeInfo.store_name.substring(0, 7) + "..."
					})
					that.$set(that, 'storeImage', that.storeInfo.image);
					if (that.isLogin) {
						that.downloadFilePromotionCode();
						that.getCartCount();
					};
					// #ifdef H5
					that.ShareInfo();
					// #endif
					setTimeout(function() {
						that.infoScroll();
					}, 500);
					that.DefaultSelect();
					that.getPricrRule(that.storeInfo.cate_id)
					that.$nextTick(function() {
						that.getCouponList();
					})
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
					this.$set(this.attr.productSelect, "image", productSelect.image ? productSelect.image : this.storeInfo.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "svip_price", productSelect.svip_price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.unique);
					this.$set(this, "uniqueValue", productSelect.unique);
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
					this.$set(this.attr.productSelect, "svip_price", this.storeInfo.svip_price);
					this.$set(this.attr.productSelect, "stock", 0);
					this.$set(this.attr.productSelect, "unique", "");
					this.$set(this, "uniqueValue", "");
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
					this.$set(this.attr.productSelect, "svip_price", this.storeInfo.svip_price);
					this.$set(this.attr.productSelect, "stock", this.storeInfo.stock);
					this.$set(this.attr.productSelect, "unique", this.storeInfo.unique || "");
					this.$set(this, "uniqueValue", this.storeInfo.unique || "");
					this.$set(this.attr.productSelect, "cart_num", 1);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "选择");
				} else if (productSelect && !productAttr.length) {
					this.$set(this.attr.productSelect, "store_name", this.storeInfo.store_name);
					this.$set(this.attr.productSelect, "image", productSelect.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "svip_price", productSelect.svip_price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.unique);
					this.$set(this, "uniqueValue", productSelect.unique);
					this.$set(this, "attrValue", value.join(","));
					this.$set(this, "attrTxt", "选择");
					if (productSelect.stock == 0) {
						this.$set(this.attr.productSelect, "cart_num", 0);
					} else {
						this.$set(this.attr.productSelect, "cart_num", 1);
					}
				}
			},
			/**
			 * 获取优惠券
			 *
			 */
			getCouponList() {
				let that = this;
				let goodsArr = []
				let couponList = [];
				let activeList = []
				getCoupons({
					ids: that.id
				}).then(res => {
					goodsArr = res.data
					getShopCoupons(that.storeInfo.mer_id).then(({
						data
					}) => {
						couponList = goodsArr.concat(data)
						that.$set(that.coupon, 'list', couponList);
						for (let i = 0; i < couponList.length; i++) {
							if (!couponList[i].issue && activeList.length < 2) {
								activeList.push(couponList[i]);
							}
						}
						that.$set(that, 'couponList', activeList);
					})
				});
			},
			ChangCouponsUseState(index) {
				let that = this;
				// that.coupon.list[index].issue = true;
				// that.$set(that.coupon, 'list', that.coupon.list);
				that.$set(that.coupon, 'coupon', false);
				// this.getCouponList()
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
							type: 0,
							type_id: this.id
						}).then(res => {
							that.$set(that.storeInfo, 'isRelation', !that.storeInfo.isRelation);
						})
					} else {
						collectAdd({
							type_id: this.id,
							type: 0
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
			/**
			 * 打开优惠券插件
			 */
			couponTap: function() {
				let that = this;
				if (that.isLogin === false) {
					this.isAuto = true;
					this.isShowAuth = true
				} else {
					// that.getCouponList();
					that.$set(that.coupon, 'coupon', true);
				}
			},
			couponTap: function() {
				let that = this;
				if (that.isLogin === false) {
					this.isAuto = true;
					this.isShowAuth = true
				} else {
					// that.getCouponList();
					that.$set(that.coupon, 'coupon', true);
				}
			},
			couponTap2: function() {
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
					// if(!that.isOpen)that.attr.cartAttr = true
				} else {
					if (that.isOpen) that.attr.cartAttr = true;
					else
					 that.attr.cartAttr = !that.attr.cartAttr;
				}
				//只有关闭属性弹窗时进行加入购物车
				if (that.attr.cartAttr === true && that.isOpen === false)
					return (that.isOpen = true);

				that.isOpen = that.attr.cartAttr = true;
				//如果有属性,没有选择,提示用户选择
				if (
					that.attr.productAttr.length &&
					that.isOpen === true &&
					productSelect.stock == 0
				)
					return that.$util.Tips({
						title: "产品库存不足，请选择其它"
					});
				if (that.attr.productSelect.cart_num == 0) {
					return that.$util.Tips({
						title: '购买个数不能为0！'
					})
				}
				let q = {
					// productId: that.id,
					// cartNum: that.attr.productSelect.cart_num,
					is_new: news === undefined ? 0 : 1,
					// uniqueId: that.attr.productSelect !== undefined ?
					// 	that.attr.productSelect.unique : ""
					product_id: that.id,
					cart_num: that.attr.productSelect.cart_num,
					product_attr_unique: that.attr.productSelect !== undefined ? that.attr.productSelect.unique : "",
					source: this.source,
					product_type: 0,
					spread_id: this.currSpid
				};
				postCartAdd(q)
					.then(function(res) {
						that.isOpen = that.attr.cartAttr = false;
						if (news) {
							uni.navigateTo({
								url: '/pages/users/order_confirm/index?cartId=' + res.data.cart_id
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
			downloadFilePromotionCode: function(successFn) {
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
					product_type: 0
				}).then(async res => {
					that.codeImg = res.data.url
					that.$set(that, 'isDown', false);
				}).catch(err => {
					that.$set(that, 'isDown', false);
					that.$set(that, 'PromotionCode', '');
				});
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
				//生成推广海报
				that.$util.goodsPosterCanvas(arr2, that.storeInfo.store_name, that.storeInfo.price, that.site_name, that.storeInfo.ot_price, function(tempFilePath) {
					that.$set(that, 'posterImage', tempFilePath);
					that.$set(that, 'posterImageStatus', true);
					that.$set(that, 'actionSheetHidden', !that.actionSheetHidden);
					that.$set(that, 'canvasStatus', false);
				}, (err) => {
					that.$set(that, 'canvasStatus', false);
				});
			},
			//图片转符合安全域名路径
			fileStoreImage(url) {
				// #ifdef MP  || APP-PLUS
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
						fail: function() {
							return that.$util.Tips({
								title: ''
							});
						}
					});
				})
			},
			/*
			 * 保存到手机相册
			 */
			// #ifdef MP
			savePosterPath: function() {
				let that = this;
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
			},
			// #endif
			// #ifdef APP-PLUS
			savePosterPath(){
				let that = this
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
			},
			// #endif
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
						], configAppMessage).then(res => {
						}).catch(err => {
							console.log(err);
						})
					});
				}
			},
			//#endif
			async imgToBase(url) {
				let res = await imgToBase({
					image: url
				})
				return res.data.image
			},
			//复制口令
			copyPwd(){
				let that = this;
				copyPasswordApi({
					id: that.id,
					product_type: 0
				}).then(async res => {
					that.copyUrl = res.data.str;
					that.posters = false
					that.isCopy = true;
				})
			},
			closeCopy(){
				this.isCopy = false
			},
			// APP分享
			appShare(scene){
				let that = this
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].$page.fullPath // 获取当前页面路由，也就是最后一个打开的页面路由
				uni.share({
					provider: "weixin",
					scene: scene,
					type: 0,
					href: `${HTTP_REQUEST_URL}${curRoute}&spid=${that.uid}`,
					title: that.storeInfo.store_name,
					summary: that.storeInfo.store_info,
					imageUrl: that.storeInfo.image,
					success: function(res) {
						uni.showToast({
							title: '分享成功',
							icon: 'success'
						})
						that.posters = false;
						uni.hideLoading();
					},
					fail: function(err) {
						uni.showToast({
							title: '分享失败',
							icon: 'none',
							duration: 2000
						})
						that.posters = false;
						uni.hideLoading();
					}
				});
			}
		}
	}
</script>
<style lang="scss">
	.ml8{
		top:2rpx
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
	.t-color {
		color: var(--view-theme);
	}
	.p-color {
		color: var(--view-priceColor);
	}
	.bt-color {
		background-color: var(--view-theme);
		border: 1px solid var(--view-theme);
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
	.product-con .footer {
		padding: 0 20rpx 0 30rpx;
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
	.product-con .footer .item {
		font-size: 18rpx;
		color: #666;
		text-align: center;
	}
	.product-con .attribute .atterTxt {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		display: inline-block;
		width: 400rpx;
	}
	.product-con .attribute .params{
		margin-right: 20rpx;
		font-size: 28rpx;
		color: #282828;
		&:nth-child(2){
			margin-right: 0;
		}
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
	.product-con .wrapper .coupon .activity {
		border: 1px solid var(--view-theme);
		color: var(--view-theme);
		&::before,&::after{
			border: 1px solid var(--view-theme);
		}
		&::before{
			border-left-color: #ffffff;
		}
		&::after{
			border-right-color: #ffffff;
		}
	}
	.product-con .guaranteeAttr{
		display: inline-block;
		width: 560rpx;
		overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
	}
	.product-con .footer .item .iconfont {
		text-align: center;
		font-size: 40rpx;
	}
	.product-con .wrapper .introduce {
		margin: 20rpx 30rpx 0;
		// min-height: 90rpx;
		&.atmosphere {
			padding: 20rpx 94rpx 0 30rpx;
			margin: 0;
			.fenxiang_btn{
				top: 8rpx;
				right: 30rpx;
			}
		}
		.font-bg-red{
			position: relative;
			/* #ifdef H5 */
			top: -2rpx;
			/* #endif */
			/* #ifndef H5 */
			top: -4rpx;
			/* #endif */
		}
	}
	.product-con .footer .item .iconfont.icon-shoucang1 {
		color: var(--view-priceColor);
	}
	.integral_count{
		padding: 0 30rpx;
	}
	.product-con .integral{
		display: inline-block;
		margin: 20rpx 30rpx 0 0;
		color: #FF9000;
		background-color: #FFF4E6;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 22rpx;
		padding: 0 26rpx;
		font-size: 24rpx;
		font-weight: normal;
		&:last-child{
			margin-left: 0;
		}
	}
	.product-con .footer .item .iconfont.icon-gouwuche1 {
		font-size: 40rpx;
		position: relative;
	}
	.product-con .footer .item .iconfont.icon-gouwuche1 .num {
		color: #fff;
		position: absolute;
		font-size: 18rpx;
		height: 30rpx;
		border-radius: 200rpx;
		padding: 0 8rpx;
		box-sizing: border-box;
		top: -10rpx;
		right: -10rpx;
		background-color: var(--view-theme);
		min-width: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
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
		&.sold_out {
			width: 444rpx;
			border-radius: 50rpx;
		}
		&.virtual_buy {
			width: 444rpx;
			border-radius: 50rpx;
		}
	}
	.product-con .footer .bnt .joinCart {
		border-radius: 50rpx 0 0 50rpx;
		background-image: linear-gradient(90deg, var(--view-bntColor11) 0%, var(--view-bntColor12) 100%);
		&.disabled{
			background: #bbb;
		}
	}
	.product-con .footer .bnt .buy {
		border-radius: 0 50rpx 50rpx 0;
		background-image: linear-gradient(90deg, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
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
.svipCon {
    height: 64rpx;
    padding: 0 20rpx;
    margin: 8rpx 20rpx 0;	
		background: #FAE3BB;
    font-size: 24rpx;
    color: #B37400;
		border-radius: 10rpx;
		image{
			width: 38rpx;
			height: 38rpx;
			margin-right: 20rpx;
		}
  }
	.svipCon .svipBtn {
		font-size: 22rpx;
		.iconfont{
			font-size: 18rpx;
			margin-left: 4rpx;
		}
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
		font-size: 22rpx;
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
				.store-margin{
					width: 24rpx;
					height: 26rpx;
					margin-left: 10rpx;
				}
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
						display: flex;
						align-items: center;
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
						color: var(--view-priceColor);
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
					width: 218rpx;
					margin-right: 20rpx;
					/deep/image,/deep/uni-image,/deep/.easy-loadimage  {
						width: 218rpx;
						height: 218rpx;
						border-radius: 16rpx;
						display: inline-block;
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
