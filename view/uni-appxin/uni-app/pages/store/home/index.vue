<template>
	<view :style="{ 'background-image': `linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 100%),url(${store.mer_banner})` }"
	 class="store-home">
		<!-- 搜索 -->
		<!-- #ifdef MP || APP-PLUS -->
		<view :style="{ height: statusBarHeight }"></view>
		<view class="header">
			<view class="head-menu">
				<view class="iconfont icon-xiangzuo" @click="goback" style="color: #fff;"></view>
				<view class="iconfont icon-shouye4" @click="goHome" style="color: #fff;"></view>
			</view>
			<navigator :url="'/pages/store/list/index?mer_id='+id" hover-class="none" class="search"><text class="iconfont icon-xiazai5"></text>搜索商品</navigator>
		</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view class="header">
			<view class="head-menu">
				<view class="iconfont icon-xiangzuo" @click="goback"></view>
				<view class="iconfont icon-shouye4" @click="goHome"></view>
			</view>
			<navigator :url="'/pages/store/list/index?mer_id='+id" hover-class="none" class="search"><text class="iconfont icon-xiazai5"></text>搜索商品</navigator>
		</view>
		<!-- #endif -->
		<view v-show="navShow && tabActive === 3" class="nav" :style="viewColor">
			<view class="nav-cont">
				<view :class="{ active: navActive === 0 }" class="item" @click="navActive = 0;select.show = !select.show">
					<view class="cont">
						{{ select.selected ? '评分' : '默认' }}
						<text :class="['arrow-icon', 'iconfont', select.show ? 'icon-xiangshang' : 'icon-xiangxia']"></text>
					</view>
				</view>
				<view :class="{ active: navActive === 1 }" class="item" @click="set_where(2,0)">
					<view class="cont">销量</view>
				</view>
				<view :class="{ active: navActive === 2 }" class="item" @click="set_where(3,0)">
					<view class="cont">
						价格
						<image :src="sortPrice ? domain+'/static/diy/up'+keyColor+'.png' : domain+'/static/diy/down'+keyColor+'.png'"></image>
					</view>
				</view>
				<view class="item" @click="select.show = false;navActive = 4;isColumn = !isColumn">
					<view class="cont">
						<text :class="['layout-icon', 'iconfont', isColumn ? 'icon-pailie' : 'icon-tupianpailie']"></text>
					</view>
				</view>
			</view>
			<view v-show="select.show && navShow" class="select">
				<view v-for="item in select.options" :key="item.id" :class="{ active: item.id === select.selected }" class="item"
				 @click="set_where(item.id,0)">
				 {{ item.name }}
				 <text v-if="item.id === select.selected" class="iconfont icon-gou"></text>
				 </view>
			</view>
		</view>
		<!--diy页面的导航-->
		<view v-show="navShow && tabActive == 1" class="nav" :style="viewColor">
			<view class="nav-cont">
				<view :class="{ active: diyActive == 0 }" class="item" @click="setDiy">
					<view class="cont">精选</view>
				</view>
				<view :class="{ active: diyActive == 1 }" class="item" @click="set_where(4,1)">
					<view class="cont">新品</view>
				</view>
				<view :class="{ active: diyActive ===2 }" class="item" @click="set_where(5,2)">
					<view class="cont">活动</view>
				</view>
				<view :class="{ active: diyActive == 3 }" class="item" @click="getCoupon">
					<view class="cont">领券</view>
				</view>
			</view>
		</view>
		<scroll-view class="main" scroll-y="true" @scroll="scrollHome" catchtouchmove :style="viewColor">
			<!-- 店铺信息 -->
			<view id="store" class="store">
				<image :src="store.mer_avatar"></image>
				<view class="text">
					<navigator :url="`/pages/store/detail/index?id=${id}`" hover-class="none">
						<text v-if="store.type_name" class="font-bg-red">{{store.type_name}}</text>
						<text v-else-if="store.is_trader" class="font-bg-red">自营</text>
						<text class="name">{{ store.mer_name }}</text>
						<image v-if="margin_ico_switch==1 && margin_ico && store.is_margin == 10" :src="margin_ico" class="store-margin"></image>
						<text class="iconfont icon-xiangyou"></text>
					</navigator>
					<view class="score">
						<view class="star">
							<view
							:style="{width: `${score.star.toFixed(2)}%`, backgroundImage: `url(${domain}/static/diy/score1${keyColor}.png)`}"></view>
						</view>
						<view>{{ score.number.toFixed(1) }}</view>
					</view>
				</view>
				<!-- #ifdef H5 -->
				<view v-if="store.services_type == 1" class="kefu">
					<a :href="'tel:'+store.service_phone" style="color: #fff; text-decoration: none;" class="iconfont icon-kefu3"></a>
				</view>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<view v-if="store.services_type == 1" class="kefu" @click="call">
					<text class="iconfont icon-kefu3"></text>
				</view>
				<!-- #endif -->
				<view v-else class="kefu" @click="goService">
					<text class="iconfont icon-kefu3"></text>
				</view>
				<button hover-class="none" :class="store.care ? 'care' : ''" v-if="!isLogin" @click="authOpen">
					<text v-show="!store.care" class="iconfont icon-guanzhu"></text>
					{{ store.care ? '已关注' : '关注' }}
				</button>
				<button v-else hover-class="none" :class="store.care ? 'care' : ''" @click="followToggle">
					<text v-show="!store.care" class="iconfont icon-guanzhu"></text>
					{{ store.care ? '已关注' : '关注' }}
				</button>
			</view>
			<view v-show="!navShow && tabActive === 3" class="nav">
				<view class="nav-cont">
					<view :class="{ active: navActive === 0 }" class="item" @click="navActive = 0;select.show = !select.show">
						<view class="cont">
							{{ select.selected ? '评分' : '默认' }}
							<text :class="['arrow-icon', 'iconfont', select.show ? 'icon-xiangshang' : 'icon-xiangxia']"></text>
						</view>
					</view>
					<view :class="{ active: navActive === 1 }" class="item" @click="set_where(2,0)">
						<view class="cont">
							销量
						</view>
					</view>
					<view :class="{ active: navActive === 2 }" class="item" @click="set_where(3,0)">
						<view class="cont">
							价格
							<image v-if="navActive === 2 && where.order == 'price_asc'" :src="domain+'/static/diy/up'+keyColor+'.png'"></image>
							<image v-if="navActive === 2 && where.order == 'price_desc'" :src="domain+'/static/diy/down'+keyColor+'.png'"></image>
						</view>
					</view>
					<view class="item" @click="select.show = false;navActive = 4;isColumn = !isColumn">
						<view class="cont">
							<text :class="['layout-icon', 'iconfont', isColumn ? 'icon-pailie' : 'icon-tupianpailie']"></text>
						</view>
					</view>
				</view>
				<view v-show="select.show && !navShow" class="select">
					<view v-for="item in select.options" :key="item.id" :class="{ active: item.id === select.selected }" class="item"
					 @click="set_where(item.id,0)">{{ item.name }}
					 <text v-if="item.id === select.selected" class="iconfont icon-gou"></text>
					 </view>
				</view>
			</view>
			<!--diy导航-->
			<view v-show="!navShow && tabActive === 1" class="nav">
				<view class="nav-cont">
					<view :class="{ active: diyActive == 0 }" class="item" @click="setDiy">
						<view class="cont">精选</view>
					</view>
					<view :class="{ active: diyActive == 1 }" class="item" @click="set_where(4,1)">
						<view class="cont">新品</view>
					</view>
					<view :class="{ active: diyActive == 2 }" class="item" @click="set_where(5,2)">
						<view class="cont">活动</view>
					</view>
					<view :class="{ active: diyActive == 3 }" class="item" @click="getCoupon">
						<view class="cont">领券</view>
					</view>
				</view>
				<view v-show="select.show && !navShow" class="select">
					<view v-for="item in select.options" :key="item.id" :class="{ active: item.id === select.selected }" class="item"
					 @click="set_where(item.id)">{{ item.name }}
					 <text v-if="item.id === select.selected" class="iconfont icon-gou"></text>
					 </view>
				</view>
			</view>
			<view class="tab-cont" :style="viewColor">
				<!-- diy组件 -->
				<view v-show="diyActive == 0 && tabActive == 1">
					<!-- #ifdef H5 -->
					<view v-for="(item, index) in styleConfig" :key="index">
						<block v-if="item.name != 'headerSerch' && item.name != 'tabNav'">
							<component
								:is="item.name"
								:index="index"
								:dataConfig="item"
								:merId="id"
								@detail="goGoodsDetail"
							></component>
						</block>
						</block>
					</view>
					<!-- #endif -->
					<!-- #ifdef MP  || APP-PLUS-->
					<block v-for="(item, index) in styleConfig" :key="index" >
						<view>
							<activeParty v-if="item.name == 'activeParty'" :merId="id" :dataConfig="item"></activeParty>
							<articleList v-if="item.name == 'articleList'" :merId="id" :dataConfig="item"></articleList>
							<bargain v-if="item.name == 'bargain'" :merId="id" :dataConfig="item"></bargain>
							<blankPage v-if="item.name == 'blankPage'" :merId="id" :dataConfig="item"></blankPage>
							<combination v-if="item.name == 'combination'" :merId="id" :dataConfig="item"></combination>
							<topic v-if="item.name == 'topic'" :merId="id" :dataConfig="item"></topic>
							<coupon v-if="item.name == 'coupon'" :merId="id" :dataConfig="item"></coupon>	
							<goodList v-if="item.name == 'goodList'" :merId="id" :dataConfig="item" @detail="goGoodsDetail"></goodList>
							<guide v-if="item.name == 'guide'" :merId="id" :dataConfig="item"></guide>
							<liveBroadcast v-if="item.name == 'liveBroadcast'" :merId="id" :dataConfig="item"></liveBroadcast>
							<menus v-if="item.name == 'menus'" :merId="id" :dataConfig="item"></menus>
							<presellList v-if="item.name == 'presellList'" :merId="id" :dataConfig="item"></presellList>
							<richText v-if="item.name == 'richText'" :merId="id" :dataConfig="item"></richText>
							<seckill v-if="item.name == 'seckill'" :merId="id" :dataConfig="item"></seckill>
							<swiperBg v-if="item.name == 'swiperBg'" :merId="id" :dataConfig="item"></swiperBg>
							<pictureCube v-if="item.name == 'pictureCube'" :merId="id" :dataConfig="item"></pictureCube>
							<swipers v-if="item.name == 'swipers'" :merId="id" :dataConfig="item"></swipers>
							<titles v-if="item.name == 'titles'" :merId="id" :dataConfig="item"></titles>
						</view>
					</block>
					<!-- #endif -->
				</view>
				<!-- 首页 -->
				<view v-show="(tabActive == 3 || diyActive == 1 || diyActive == 2) && tabActive != 5 && tabActive != 2">
					<!-- 商品 -->
					<view v-if="goods.length" class="goods-wrap" id="goods" @touchmove="onTouchmove">
						<view v-if="isColumn" class="goods column">
							<view v-for="item in goods" :key="item.product_id" class="item" @click="goGoodsDetail(item)">
								<view class="image">
									<easy-loadimage mode="widthFix" :image-src="item.image"></easy-loadimage>
									<view v-if="item.stock == 0" class="sell_out">已售罄</view>
									<view v-if="item.border_pic" :style="{ backgroundImage: `url(${item.border_pic})` }" class="border-picture"></view>
								</view>
								<view class="text on acea-row row-between-wrapper">
									<view class="name line2">
										<text class="name_text line1">{{ item.store_name }}</text>
									</view>
									<view class="item_bot">
										<view class="money-wrap acea-row">
											<view class="money">
												¥<text>{{ item.price }}</text>
											</view>
											<view v-if="item.show_svip_info && item.show_svip_info.show_svip_price && item.svip_price" class="acea-row row-middle">
												<text class='vip-money'>￥{{item.svip_price}}</text>
												<view class="vipImg">
													<image class="image" src="/static/images/svip.png"></image>
												</view>
											</view>
										</view>
										<view v-if="item.product_type != 0 || item.issetCoupon || item.delivery_free == 1" class="item_tags">
											<text v-if="item.product_type != 0" :class="'font_bg-red type'+item.product_type">{{item.product_type == 1 ? "秒杀" : item.product_type == 2 ? "预售" : item.product_type == 3 ? "助力" : item.product_type == 4 ? "拼团" : ""}}</text>
											<text class="tags_item ticket" v-if="item.issetCoupon">领券</text>
											<text class="tags_item delivery" v-if="item.delivery_free == 1">包邮</text>
										</view>
										<view class="score">{{ item.rate }}评分 {{ item.reply_count }}条评论</view>
									</view>
								</view>
								<view v-if="item.max_extension>0 && (item.product_type == 0 || item.product_type == 2)" class="foot">
									<text v-show="!isColumn" class="iconfont"></text>
									最高赚 ¥{{ item.max_extension }}
								</view>
							</view>
						</view>
						<view v-else class="goods">
							<WaterfallsFlow :wfList='goods' @itemTap="goGoodsDetail" :type="1" :isStore="1"/>
						</view>
					</view>
					<view v-if="goodsLoading" class="acea-row row-center-wrapper loadingicon">
						<text :hidden="!goodsLoading" class="iconfont icon-jiazai loading"></text>
						{{loadTitle}}
					</view>
					<emptyPage v-if="goods.length == 0 && !goodsLoading" title="暂无商品~"></emptyPage>
				</view>
				<!-- 分类 -->
				<view v-show="!navShow && tabActive == 2">
					<view class="category">
						<view class="section">
							<view class="head" @click="goCategoryGoods('')">
								<view class="title">全部</view>
								<view class="iconfont icon-xiangyou"></view>
							</view>
						</view>
						<view v-for="item in category" :key="item.store_category_id" class="section">
							<view class="head" @click="goCategoryGoods(item.store_category_id)">
								<view class="title">{{ item.cate_name }}</view>
								<view class="iconfont icon-xiangyou"></view>
							</view>
							<view v-if="item.children" class="body">
								<view v-for="value in item.children" :key="value.store_category_id" class="item" @click="goCategoryGoods(value.store_category_id)">{{ value.cate_name }}</view>
							</view>
						</view>
					</view>
					<view class="acea-row row-center-wrapper loadingicon">
						<text :hidden="!categoryLoading" class="iconfont icon-jiazai loading"></text>
						{{loadTitle}}
					</view>
				</view>
				<!--生活服务-->
				<view v-show="tabActive === 5" id="product" @touchmove="onTouchmoves">
					<view v-if="productList.length" class="goods column">
						<view v-for="item in productList" :key="item.product_id" class="item" @click="goGoodsDetail(item)">
							<view class="image">
								<easy-loadimage mode="widthFix" :image-src="item.image"></easy-loadimage>
							</view>
							<view class="text acea-row row-between-wrapper">
								<view class="name line2">
									<text class="name_text line1">{{ item.store_name }}</text>
								</view>
								<view class="item_bot">
									<view class="money-wrap acea-row">
										<view class="money">
											¥
											<text>{{ item.price }}</text>
										</view>
										<view v-if="item.show_svip_info && item.show_svip_info.show_svip_price && item.svip_price" class="acea-row row-middle">
											<text class='vip-money'>￥{{item.svip_price}}</text>
											<view class="vipImg">
												<image class="image" src="/static/images/svip.png"></image>
											</view>
										</view>
									</view>
									<view v-if="item.product_type != 0 || item.issetCoupon || item.delivery_free == 1" class="item_tags">
										<text v-if="item.product_type != 0" :class="'font_bg-red type'+item.product_type">{{item.product_type == 1 ? "秒杀" : item.product_type == 2 ? "预售" : item.product_type == 3 ? "助力" : item.product_type == 4 ? "拼团" : ""}}</text>
										<text class="tags_item ticket" v-if="item.issetCoupon">领券</text>
										<text class="tags_item delivery" v-if="item.delivery_free == 1">包邮</text>
									</view>
									<view class="score">{{ item.rate }}评分 {{ item.reply_count }}条评论</view>
								</view>
							</view>
							<view v-if="item.max_extension && (item.product_type == 0 || item.product_type == 2)" class="foot">
								<text v-show="!isColumn" class="iconfont"></text>
								最高赚 ¥{{ item.max_extension }}
							</view>
						</view>
					</view>
					<view v-if="goodsLoading" class="acea-row row-center-wrapper loadingicon">
						<text :hidden="!goodsLoading" class="iconfont icon-jiazai loading"></text>
							{{loadTitle}}
					</view>
					<emptyPage v-if="productList.length == 0 && !goodsLoading" title="暂无商品~"></emptyPage>
				</view>
				<!-- 优惠券 -->
				<view v-show="diyActive == 3 && tabActive == 1">
					<view v-if="coupon.length" class="coupon">
						<view v-for="item in coupon" :key="item.coupon_id" class="item">
							<view class="left gary" v-if="item.issue">
								<view class="money">
									¥
									<text>{{ item.coupon_price }}</text>
								</view>
								<view>满{{ item.use_min_price }}元可用</view>
							</view>
							<view class="left" v-else :style="{ 'background-image': `url(${domain}/static/diy/couponBg${keyColor}.png)` }">
								<view class="money">
									¥
									<text>{{ item.coupon_price }}</text>
								</view>
								<view>满{{ item.use_min_price }}元可用</view>
							</view>
							<view class="right">
								<view class="name line1">
									<text :class="{gary:item.issue}">{{item.type===0?'店铺券':'商品券'}}</text>
									{{ item.title }}
								</view>
								<view class="time-wrap" style="justify-content: space-between;">
									<block v-if="item.coupon_type == 1">
										<view class="time">{{ item.use_start_time | dateFormat }}-{{ item.use_end_time | dateFormat }}</view>
									</block>
									<block v-if="item.coupon_type == 0">
										<view>领取后{{ item.coupon_time}}天内可用</view>
									</block>
									<block v-if="item.issue">
										<view class="gary iconfont icon-yilingqu2"></view>
									</block>
									<block v-else>
										<view class="button" @click="receiveCoupon(item)">立即领取</view>
									</block>
								</view>
							</view>
						</view>
					</view>
					<emptyPage v-if="coupon.length == 0" title="暂无优惠券~"></emptyPage>
				</view>
				<!--活动专场-->
				<view v-show="tabActive === 4">
					<block v-if="topicList.length>0">
						<view class="main_count">
							<navigator v-for="(item,index) in topicList" :key='item.group_data_id' :url="`/pages/activity/topic_detail/index?id=${item.group_data_id}`" hover-class="none">
								<view class='list'>
									<image :src="item.pic" class="picture"></image>
								</view>
							</navigator>
						</view>
					</block>
					<block v-else>
						<view class='empty-box' v-cloak>
							<image src='../static/images/no-topic.png'></image>
							<view class="txt">暂无活动专场哦~</view>
						</view>
					</block>
				</view>
			</view>
		</scroll-view>
		<view class="footer" :style="viewColor">
			<view v-for="(item, index) in tabs" :key="index" :class="{ active: tabActive === item.value }" class="item" @click="tab(item.value)">
				<view :class="['iconfont', item.icon]"></view>
				<view>{{ item.name }}</view>
			</view>
		</view>
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
	import request from "@/utils/request.js";
	import WaterfallsFlow from '@/components/WaterfallsFlow/WaterfallsFlow.vue'
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	import {getStoreDetail,	getStoreGoods, getStoreCategory, followStore, unfollowStore, storeServiceList} from '@/api/store.js';
	import { initiateAssistApi, getTopicList } from '@/api/activity.js';
	import { getShopCoupons, setCouponReceive, getDiy } from '@/api/api.js';
	import { getUserInfo } from '@/api/user.js';
	import { configMap } from "@/utils";
	import { mapGetters } from "vuex";
	import { goShopDetail } from '@/libs/order.js';
	import authorize from '@/components/Authorize';
	import history from "@/mixins/history";
	import emptyPage from '@/components/emptyPage.vue'
	import shareScence from "@/libs/spread";
	import { HTTP_REQUEST_URL } from '@/config/app';
	import mConfig from '../component/index.js';
	// #ifdef MP || APP-PLUS
	import activeParty from '../../index/component/activeParty';
	import coupon from '../../index/component/coupon';
	import bargain from '../../index/component/bargain';
	import blankPage from '../../index/component/blankPage';
	import combination from '../../index/component/combination';
	import goodList from '../../index/component/goodList';
	import guide from '../../index/component/guide';
	import liveBroadcast from '../../index/component/liveBroadcast';
	import menus from '../../index/component/menus';
	import topic from '../../index/component/topic';
	import presellList from '../../index/component/presellList';
	import richText from '../../index/component/richText';
	import seckill from '../../index/component/seckill';
	import swiperBg from '../../index/component/swiperBg';
	import pictureCube from '../../index/component/pictureCube'
	import titles from '../../index/component/titles';
	// #endif
	const app = getApp();	
	export default {
		components: {
			...mConfig,
			authorize,
			emptyPage,
			WaterfallsFlow,
			easyLoadimage,
			// #ifdef MP || APP-PLUS
			activeParty,
			bargain,
			coupon,
			blankPage,
			combination,
			goodList,
			liveBroadcast,
			menus,
			topic,
			presellList,
			richText,
			seckill,
			swiperBg,
			pictureCube,
			titles
			// #endif
		},
		mixins: [history],
		filters: {
			dateFormat: function(value) {
				if (!value) {
					return '';
				}
				return value.split(' ')[0].replace('-', '.');
			}
		},
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				// #ifdef MP
				menuButtonInfo: uni.getMenuButtonBoundingClientRect(),
				// #endif
				id: 0, // 商铺id
				store: {}, // 商铺详情
				goods: [], // 商铺商品
				category: [], // 商铺分类
				coupon: [], // 优惠券
				productList: [], //本地服务商品
				styleConfig: [],
				isColumn: true, // 商品列表排列方式
				navShow: false,
				navActive: 0,
				diyActive: 0,
				tabActive: 0, // 底部切换
				isCoupon: 0,
				keyword: '',
				order: '',
				sortPrice: true, // 价格排序
				goodsLoading: false,
				categoryLoading: false,
				loadTitle: '加载更多',
				loadend: false,
				isShowAuth: false, //是否隐藏授权
				isAuto: false, //没有授权的不会自动授权
				where: {
					order: '',
					keyword: '',
					page: 1,
					limit: 30
				},
				// 下拉菜单
				select: {
					show: false,
					selected: 0,
					options: [{
							id: 0,
							name: '默认'
						},
						{
							id: 1,
							name: '评分'
						}
					]
				},
				// 底部菜单
				tabs1: [{
						icon: 'icon-yizhan_o',
						name: '首页',
						value: 1,
					},
					{
						icon: 'icon-gouwu_o',
						name: '商品',
						value: 3,
					},
					{
						icon: 'icon-baoguo_huanbaohe_o',
						name: '生活服务',
						value: 5,
					},
					{
						icon: 'icon-yingyongAPP_o',
						name: '分类',
						value: 2,
					},
					{
						icon: 'icon-liwu_o',
						name: '专场',
						value: 4,
					}
				],
				// 底部菜单
				tabs2: [{
						icon: 'icon-yizhan_o',
						name: '首页',
						value: 1,
					},
					{
						icon: 'icon-gouwu_o',
						name: '商品',
						value: 3,
					},
					{
						icon: 'icon-yingyongAPP_o',
						name: '分类',
						value: 2,
					},
					{
						icon: 'icon-zhuanti',
						name: '专场',
						value: 4,
					}
				],
				tabs: [],
				storeScroll: true,
				storeTop: 0,
				navHeight: 0,
				currSpid: "",
				topicList: [],
				service_open: false,
				type: 0,
				statusBarHeight: 0
			}
		},
		computed: {
			score: function() {
				let store = this.store,
					score = {
						star: 0,
						number: 0
					};
				if ('postage_score' in store) {
					score.number = (parseFloat(store.postage_score) + parseFloat(store.product_score) + parseFloat(store.service_score)) /
						3;
					score.star = score.number / 5 * 100;
				}
				return score;
			},
			...configMap({
				margin_ico_switch: 0,
				margin_ico: '',
			}, mapGetters(['isLogin','uid','viewColor','keyColor'])),
		},
		watch: {
			tabActive: function(value, old) {
				switch (value) {
					case 1:
						if(this.goods.length == 0 && this.isCoupon == 0){
							this.resetParmas();
							this.where.order = this.order == 1 ? 'is_new' : '';
							this.where.action = this.order == 2 ? 1 : '';
							this.getGoods();
						}else if(this.isCoupon == 1){
							this.getCoupon();
						}
						break;
					case 2:
						this.getCategory();
						break;
					case 3:
						this.resetParmas();
						this.goods = [];
						this.getGoods();
						break;
					case 4:	
						this.getTopic();
						break;
					case 5:
						if(this.productList.length == 0){
							this.resetParmas();
							this.get_service_list();
						}
						break;
					case 6:
						this.getCoupon();
						break;
				}
			},
		},
		onLoad: function(options) {
			this.type = parseInt(options.type) || 1
			this.id = options.mer_id || options.id || 0;
			this.isCoupon = options.coupon || 0;
			this.diyActive = options.order || 0;
			this.order = options.order;
			if (options.spid) {
				this.currSpid = options.spid
				app.globalData.spid = options.spid;
			}
			// #ifdef MP
			if (options.scene) {
				let value = this.$util.getUrlParams(decodeURIComponent(options.scene));
				console.log(value)
				if (value.id ) this.id = value.id || 0;
				//记录推广人uid
				if (value.spid) {
					this.currSpid = value.spid
					app.globalData.spid = value.spid;
				}
			}
			// #endif
			this.getStore();
			this.diyData();
			shareScence(this.currSpid, this.isLogin)
			if (this.isLogin) {
				// #ifdef MP
				this.getHistory()
				// #endif
			}
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
		},
		onShow() {
			
		},
		onReady: function() {

		},
		/**
		 * 用户点击右上角分享
		 */
		// #ifdef MP
		onShareAppMessage: function() {
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
			let that = this;
			return {
				title: that.store.mer_name || '',
				imageUrl: that.store.mer_avatar || '',
				path: '/pages/store/home/index?id=' + that.id + '&spid=' + that.uid,
			}
		},
		onShareTimeline: function() {
			let that = this;
			return {
				title: that.store.mer_name || '',
				query: {
					id: that.id,
					spid: that.uid
				},
				imageUrl: that.store.mer_avatar || ''
			}
		},
		// #endif
		mounted: function() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#store').boundingClientRect(data => {
				this.storeHeight = data.height;
				this.storeTop = data.top;
			}).exec();
		},
		methods: {
			//#ifndef H5
			call: function(){
				wx.makePhoneCall({
					phoneNumber: this.store.service_phone,
				})
			},
			//#endif
			onTouchmove(e){
				if (this.loadend) return;
				if (this.loading) return;
				if (this.goodsLoading) return;
				const query = uni.createSelectorQuery().in(this);
				query.select('#goods').boundingClientRect(data => {
					if(data.bottom < 1500 && data.top < 0) {
						this.getGoods();
					}
				}).exec();
				// 模拟触底刷新
			},
			onTouchmoves(e){
				if (this.loadend) return;
				if (this.loading) return;
				if (this.goodsLoading) return;
				const query = uni.createSelectorQuery().in(this);
				query.select('#product').boundingClientRect(data => {
					if(data.bottom < 1500 && data.top < 0) {
						this.get_service_list();
					}
				}).exec();
			},
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
					this.isShowAuth = true
				}
			},
			setDiy() {
				this.diyActive = 0;
			},
			// 获取diy模板数据
			diyData() {
				let that = this;
				getDiy({id: that.id}).then(res => {
					let data = res.data;
					that.styleConfig = that.objToArr(res.data.value);
					uni.setNavigationBarTitle({
						title: res.data.title
					});
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					});		
				});
			},
			// 对象转数组
			objToArr(data) {
				let obj = Object.keys(data).sort();
				let m = obj.map(key => data[key]);
				return m;
			},
			goService(){
				let that = this;
				if (that.isLogin === false) {
					this.isAuto = true;
					this.isShowAuth = true
				} else {
					uni.navigateTo({
						url: `/pages/chat/customer_list/chat?mer_id=${this.store.mer_id}&uid=${this.uid}`,
					});
				}
			},
			// 本地生活服务商品
			get_service_list: function(isPage) {
				let that = this;
				if (that.loadend) return;
				if (that.loading) return;
				if (that.goodsLoading) return;
				that.goodsLoading = true;
				that.loadTitle = '';
				storeServiceList(that.id, that.where).then(res => {
					that.goodsLoading = false;
					let list = res.data.list;
					let productList = that.$util.SplitArray(list, that.productList);
					let loadend = list.length < that.where.limit;
					that.loadend = loadend;
					that.loading = false;
					that.loadTitle = loadend ? '加载更多' : '已全部加载';
					that.$set(that, 'productList', productList);
					that.$set(that.where, 'page', that.where.page + 1);
				}).catch(err => {
					that.loading = false;
					that.goodsLoading = false;
					uni.showToast({
						title: err,
						icon: 'none'
					})
					setTimeout(function() {
						uni.navigateBack()
					}, 1000);
				});
			},
			// 领取优惠券
			receiveCoupon(item) {
				let that = this;
				if (that.isLogin === false) {
					this.isAuto = true;
					this.isShowAuth = true
				} else {
					setCouponReceive(item.coupon_id).then(res => {
						item.issue = 1
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}).catch(err => {
						uni.showToast({
							title: err,
							icon: 'none'
						})
					})
				}
			},
			// 获取商品详情
			getStore: function() {
				getStoreDetail(this.id).then(res => {
					this.store = res.data;
					if((res.data.delivery_way.length == 1 && res.data.delivery_way[0] == '1') || res.data.delivery_way.length == 2){
						this.tabs = this.tabs1
						this.service_open = true
					}else{
						this.tabs = this.tabs2
						this.service_open = false
					}	
					this.tab(this.type)
					// #ifdef H5
					this.ShareInfo();
					// #endif
				}).catch(err => {
					this.loading = false;
					uni.showToast({
						title: err,
						icon: 'none'
					})
					setTimeout(function() {
						uni.navigateBack()
					}, 1000);
				})
			},
			// 获取商铺商品
			getGoods: function() {
				let that = this;
				if (that.loadend) return;
				if (that.loading) return;
				if (that.goodsLoading) return;
				that.goodsLoading = true;
				that.loadTitle = '';
				getStoreGoods(that.id, that.where).then(res => {
					that.goodsLoading = false;
					let list = res.data.list;
					let goodsList = that.$util.SplitArray(list, that.goods);
					let loadend = list.length < that.where.limit;
					that.loadend = loadend;
					that.loading = false;
					that.loadTitle = loadend ? '已全部加载' : '加载更多';
					that.$set(that, 'goods', goodsList);
					that.$set(that.where, 'page', that.where.page + 1);
				}).catch(err => {
					that.loading = false;
					that.goodsLoading = false;
					uni.showToast({
						title: err,
						icon: 'none'
					})
					setTimeout(function() {
						uni.navigateBack()
					}, 1000);
				});
			},
			// 获取商铺分类
			getCategory: function() {
				if (this.category.length) {
					return;
				}
				this.categoryLoading = true;
				getStoreCategory(this.id).then(res => {
					this.categoryLoading = false;
					this.category = res.data;
					this.loadTitle = '已全部加载';
				});
			},
			// 获取商铺优惠券
			getCoupon: function() {
				this.diyActive = 3
				if (this.coupon.length) {
					return;
				}
				getShopCoupons(this.id).then(res => {
					this.coupon = res.data;
				});
			},
			// 获取商铺活动专题
			getTopic(){
				if (this.topicList.length) {
					return;
				}
				getTopicList(this.id,{page: 1, limit: 999}).then(res => {
					this.topicList = res.data;
				});
			},
			// 关注商铺
			follow: function() {
				followStore(this.id).then(res => {
					if (res.status === 200) {
						this.store.care = true;
					}
					this.$util.Tips({
						title: res.message
					});
				});
			},
			// 取消关注
			unfollow: function() {
				unfollowStore(this.id).then(res => {
					if (res.status === 200) {
						this.store.care = false;
					}
					this.$util.Tips({
						title: res.message
					});
				});
			},
			// 设置是否关注
			followToggle: function() {
				this.store.care ? this.unfollow() : this.follow();
			},
			// 选择条件展示商品
			set_where: function(param,isDiy) {
				this.select.show = false;
				this.loading = false;
				this.loadend = false;
				this.where.page = 1;
				this.goods = [];
				this.where.action = ""
				switch (param) {
					case 0:
						this.select.selected = 0;
						this.where.order = '';
						this.getGoods();
						break;
					case 1:
						this.select.selected = 1;
						this.where.order = 'rate';
						this.getGoods();
						break;
					case 2:
						this.navActive = 1;
						this.where.order = 'sales';
						this.getGoods();
						break;
					case 3:
						this.navActive = 2;
						this.sortPrice = !this.sortPrice;
						this.where.order = this.sortPrice ? 'price_asc' : 'price_desc';
						this.getGoods();
						break;
					case 4:
						if(isDiy == 1 || isDiy == 2) this.diyActive = isDiy
						this.navActive = 3;
						this.where.order = 'is_new';
						this.getGoods();
						break;
					case 5:
					if(isDiy == 1 || isDiy == 2) this.diyActive = isDiy
						this.navActive = 5;
						this.where.action = 1;
						this.where.order = ""
						this.getGoods();
						break;
				}
			},

			// 去分类商品页
			goCategoryGoods: function(id) {
				uni.navigateTo({
					url: `/pages/store/list/index?id=${id}&mer_id=${this.id}`
				})
			},
			// 去商品详情页
			goGoodsDetail(item) {
				goShopDetail(item, this.uid).then(res => {
					if (this.isLogin) {
						initiateAssistApi(item.activity_id).then(res => {
							let id = res.data.product_assist_set_id;
							uni.hideLoading();
							uni.navigateTo({
								url: '/pages/activity/assist_detail/index?id=' + id
							});	
						}).catch((err) => {
							uni.showToast({
								title: err,
								icon: 'none'
							})
						});
					} else {
						this.isAuto = true;
						this.isShowAuth = true
					}
				})
			},
			// 商铺首页滚动 navbar 吸顶
			scrollHome: function(e) {
				uni.$emit('scroll');
				this.navShow = e.detail.scrollTop >= this.storeHeight - 30;
			},
			goback: function() {
				uni.navigateBack();
			},
			// 首页
			goHome() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			// 商铺底部切换
			tab: function(param) {
				this.tabActive = param;
				this.goodsLoading = this.loadend = this.loading = false
			},
			resetParmas(){
				this.where = {
					order: '',
					keyword: '',
					page: 1,
					limit: 30
				}
			},
			//#ifdef H5
			ShareInfo() {
				let data = this.store;
				let href = location.href;
				if (this.$wechat.isWeixin()) {
					getUserInfo().then(res => {
						href =
							href.indexOf("?") === -1 ?
							href + "?spid=" + res.data.uid :
							href + "&spid=" + res.data.uid;
						let configAppMessage = {
							desc: data.mer_info,
							title: data.mer_name,
							link: href,
							imgUrl: data.mer_avatar
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
		onReachBottom() {
			// 模拟触底刷新
			if(this.tabActive == 0){
				setTimeout(()=>{
					this.goods.push(...this.goods);
				},500)
			}
		},
		onPullDownRefresh(){
			// 模拟上拉刷新
			setTimeout(()=>{
				const newList = this.goods.reverse();
				this.goods = newList;
				uni.stopPullDownRefresh();
			},500)
		}
	}
</script>

<style lang="scss" scoped>
	.tab-cont{
		background: #f5f5f5;
		min-height: 500rpx;
	}
	/deep/.care {
		background-image: none !important;
		border: 1px solid #fff;
		background-color: transparent;
	}
	.store-home {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		padding-bottom: 100rpx;
		padding-bottom: calc(100rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		padding-bottom: calc(100rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		background: left top/750rpx 390rpx no-repeat fixed;
		overflow: hidden;
	}
	.header {
		position: relative;
		z-index: 6;
		display: flex;
		align-items: center;
		padding-right: 34rpx;
		height: 43px;
		padding-left: 33rpx;
		.head-menu {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
			height: 27px;
			width: 70px;
			background: rgba(0, 0, 0, 0.25);
			border-radius: 13px;
			.icon-xiangzuo {
				font-size: 32rpx;
				color: #FFFFFF;
			}
			.iconfont {
				-webkit-box-flex: 1;
				-webkit-flex: 1;
				flex: 1;
				text-align: center;
				color: #fff;
				box-sizing: border-box;
				&.icon-xiangzuo {
					border-right: 1px solid rgba(255,255,255,.3);
				}
			}
		}
		.search {
			flex: 1;
			display: flex;
			align-items: center;
			min-width: 0;
			height: 58rpx;
			border-radius: 29rpx;
			margin-left: 32rpx;
			background-color: #FFFFFF;
			font-weight: 500;
			font-size: 26rpx;
			color: #999999;
			/* #ifdef MP */
			margin-right: 200rpx;
			/* #endif */
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
		min-height: 0rpx;
		box-sizing: border-box;
		padding: 0;
	}
	.store {
		position: relative;
		z-index: 6;
		display: flex;
		align-items: center;
		padding-right: 20rpx;
		padding-left: 20rpx;
		padding-top: 20rpx;
		padding-bottom: 22rpx;
		image {
			width: 74rpx;
			height: 74rpx;
			border-radius: 6rpx;
		}
		.store-margin{
			width: 26rpx;
			height: 26rpx;
			margin-left: 10rpx;
		}
		.kefu{
			color: #ffffff;
			margin-right: 26rpx;
			cursor: pointer;
			.icon-kefu3{
				font-size: 34rpx;
			}
		}
		.text {
			flex: 1;
			min-width: 0;
			margin-right: 20rpx;
			margin-left: 20rpx;
			navigator {
				display: inline-flex;
				align-items: center;
				max-width: 100%;
				.name {
					flex: 1;
					min-width: 0;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-weight: bold;
					font-size: 30rpx;
					line-height: 1;
					color: #FFFFFF;
				}
				.iconfont {
					margin-left: 10rpx;
					font-size: 17rpx;
					color: #FFFFFF;
				}
			}
			.score {
				display: flex;
				align-items: center;
				margin-top: 17rpx;
				font-weight: 500;
				font-size: 24rpx;
				line-height: 1;
				color: #FFFFFF;
				.star {
					position: relative;
					width: 111rpx;
					height: 19rpx;
					margin-right: 10rpx;
					background: url(../../columnGoods/images/star.png) left top/100% 100% no-repeat;
					overflow: hidden;
					view {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background: url(../../columnGoods/images/star_active.png) left top/111rpx 19rpx no-repeat;
						&.star_purple{
							background: url(../../columnGoods/images/star_active_purple.png) left top/111rpx 19rpx no-repeat;
						}
					}
				}
			}
		}
		button {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 113rpx;
			height: 48rpx;
			border-radius: 24rpx;
			background-image: linear-gradient(-90deg, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
			font-weight: 500;
			font-size: 22rpx;
			color: #FFFFFF;
			.iconfont {
				margin-right: 6rpx;
				font-size: 22rpx;
			}
			&.gary {
				background-color: #999;
			}
		}
	}
	.font-bg-red {
		background-color: var(--view-theme);
		border: 1px solid var(--view-theme);
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
	.nav {
		position: relative;
		.nav-cont {
			display: flex;
			align-items: center;
			height: 84rpx;
			.item {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				min-width: 0;
				.cont {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 116rpx;
					height: 44rpx;
					border-radius: 22rpx;
					font-weight: 500;
					font-size: 24rpx;
					color: #FFFFFF;
					.arrow-icon {
						margin-left: 10rpx;
						font-size: 18rpx;
					}
					.layout-icon {
						font-size: 32rpx;
					}
					.icon-pailie {
						font-size: 32rpx;
					}
					image {
						width: 15rpx;
						height: 21rpx;
						margin-left: 7rpx;
					}
				}
			}
			.active {
				.cont {
					background-color: #FFFFFF;
					font-weight: bold;
					color: var(--view-theme);
				}
			}
		}
		.select {
			position: absolute;
			top: 100%;
			left: 0;
			z-index: 2;
			width: 100%;
			padding-right: 40rpx;
			padding-bottom: 28rpx;
			padding-left: 74rpx;
			border-bottom-right-radius: 24rpx;
			border-bottom-left-radius: 24rpx;
			background-color: #FFFFFF;
			box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.06);
			.item {
				margin-top: 28rpx;
				font-size: 24rpx;
				color: #454545;
			}
			.active {
				color: var(--view-theme);
				.iconfont{
					color: var(--view-theme);
					float: right;
					font-size: 20rpx;
				}
			}
		}
	}
	.goods {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-top: 20rpx;
		padding-right: 20rpx;
		padding-left: 20rpx;
		background-color: #F5F5F5;
		width: 750rpx;
		.item {
			width: 345rpx;
			border-radius: 16rpx;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
			overflow: hidden;
			.sell_out {
				display: flex;
				width: 110rpx;
				height: 110rpx;
				align-items: center;
				justify-content: center;
				border-radius: 100%;
				background: rgba(0,0,0,.6);
				color: #fff;
				font-size: 24rpx;
				position: absolute;
				top: 50%;
				left: 50%;
				margin: -55rpx 0 0 -55rpx;
				&::before{
					content: "";
					display: block;
					width: 100rpx;
					height: 100rpx;
					border-radius: 100%;
					border: 1px dashed #fff;
					position: absolute;
					top: 5rpx;
					left: 5rpx;
				}
			}
			.image,.easy-loadimage,image,uni-image {
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
						color: var(--view-priceColor);
						text {
							font-size: 34rpx;
							line-height: 1;
						}
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
			.item_tags{
				margin-top: 8rpx;
			}
			.item_tags .tags_item {
				display: inline-block;
				font-size: 20rpx;
				text-align: center;
				border-radius: 5rpx;
				padding: 0 4rpx;
				line-height: 28rpx;
				margin-right: 8rpx;
			}
			.item_tags .tags_item.ticket{
				border: 1px solid var(--view-theme);
				color: var(--view-theme);
			}
			.item_tags .tags_item.delivery{
				color: #FF9000;
				border: 1px solid #FF9000;
			}
			.foot {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 52rpx;
				background-image: linear-gradient(-90deg, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
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

	.column {
		padding: 0;
		background-color: #FFFFFF;
		.item {
			position: relative;
			display: flex;
			width: 100%;
			padding: 30rpx 20rpx;
			border-radius: 0;
			margin-bottom: 0;
			&::before {
				content: " ";
				position: absolute;
				top: 0;
				right: 20rpx;
				left: 250rpx;
				border-top: 1px solid #F5F5F5;
			}
			/deep/.image,/deep/.easy-loadimage,/deep/image,/deep/uni-image {
				width: 260rpx;
				height: 260rpx;
				border-radius: 16rpx;
				overflow: hidden;
				position: relative;
				
			}
			.border-picture {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: center/cover no-repeat;
			}
			.text {
				position: relative;
				width: 450rpx;
				min-width: 0;
				padding-top: 0;
				padding-right: 0;
				padding-bottom: 0;
				.name {
					color: #282828;
					width: 100%;
					display: flex;
				}
				.item_bot{
					width: 100%;
				}
				.money-wrap {
					display: flex;
					align-items: center;
					margin-top: 52rpx;
					.ticket {
						height: 28rpx;
						padding-right: 12rpx;
						padding-left: 12rpx;
						border: none;
						border-radius: 0;
						margin-top: 17rpx;
						margin-left: 0;
						background: url(../../../static/images/yh.png) top left/100% 100% no-repeat;
						line-height: 28rpx;
					}
				}
			}
			.foot {
				position: absolute;
				right: 20rpx;
				bottom: 30rpx;
				height: 44rpx;
				padding-right: 17rpx;
				padding-left: 17rpx;
				border-radius: 22rpx;
				font-size: 22rpx;
				color: #F5F5F5;
			}
		}
	}
	.category {
		padding-top: 34rpx;
		padding-right: 20rpx;
		padding-left: 20rpx;
		.section {
			border-radius: 10rpx;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
			.head {
				position: relative;
				display: flex;
				align-items: center;
				height: 90rpx;
				padding-right: 20rpx;
				padding-left: 36rpx;
				font-weight: bold;
				color: #282828;
				&::before {
					content: " ";
					position: absolute;
					top: 50%;
					left: 20rpx;
					width: 6rpx;
					height: 24rpx;
					background-color: var(--view-theme);
					transform: translateY(-50%);
				}
				.title {
					flex: 1;
					min-width: 0;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 30rpx;
				}
				.iconfont {
					font-size: 22rpx;
					line-height: 1;
				}
			}
			.body {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				align-items: center;
				padding: 9rpx 36rpx 14rpx;
				.item {
					width: 314rpx;
					height: 84rpx;
					padding-right: 30rpx;
					padding-left: 30rpx;
					border-radius: 10rpx;
					background-color: #F5F5F5;
					margin-bottom: 10rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-weight: 500;
					font-size: 26rpx;
					line-height: 84rpx;
					color: #282828;
				}
			}
		}
	}
	.coupon {
		padding: 30rpx;
		background-color: #F5F5F5;
		.item {
			display: flex;
			margin-bottom: 16rpx;
			.left {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 240rpx;
				font-weight: 500;
				font-size: 24rpx;
				line-height: 1;
				color: #FFFFFF;
				background-size: 100% 100%;
				&.gary {
					background-image: url('data:image/png;base64,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');
				}
				.money {
					margin-bottom: 25rpx;
					font-weight: 800;
					font-size: 36rpx;
					text {
						font-size: 60rpx;
					}
				}
			}
			.right {
				flex: 1;
				min-width: 0;
				padding-right: 18rpx;
				padding-left: 27rpx;
				background-color: #FFFFFF;
				position: relative;
				overflow: hidden;
				.name {
					padding-top: 32rpx;
					padding-bottom: 32rpx;
					border-bottom: 1px solid #F0F0F0;
					font-weight: 500;
					font-size: 30;
					line-height: 1;
					color: #282828;
					text {
						display: inline-block;
						text-align: center;
						line-height: 40rpx;
						height: 40rpx;
						padding: 0 10rpx;
						-webkit-box-sizing: border-box;
						box-sizing: border-box;
						background: var(--view-minorColor);
						border: 1px solid var(--view-theme);
						opacity: 1;
						border-radius: 22rpx;
						font-size: 20rpx;
						color: var(--view-theme);
						margin-right: 12rpx;
						&.gary {
							border-color: #BBB;
							color: #bbb;
							background-color: #F5F5F5;

						}
					}
				}
				.time-wrap {
					display: flex;
					align-items: center;
					padding-top: 16rpx;
					padding-bottom: 16rpx;
					font-weight: 500;
					font-size: 20rpx;
					color: #999999;
					.time {
						flex: 1;
						min-width: 0;
					}
					.button {
						width: 136rpx;
						height: 44rpx;
						border-radius: 22rpx;
						background-color: var(--view-theme);
						font-weight: 500;
						font-size: 22rpx;
						line-height: 44rpx;
						text-align: center;
						color: #FFFFFF;
					
					}
					.gary {
						font-size: 130rpx;
						color: #DFDFDF;
						position: absolute;
						right: -15rpx;
						z-index: 0;
						bottom: -20rpx;
					}
				}
			}
		}
		.disabled {
			.left {
				background-image: url(../static/images/coupon2.png);
			}
			.right {
				.name {
					text {
						border-color: #C1C1C1;
						color: #C1C1C1;
					}
				}
				.time-wrap {
					.button {
						background-color: #CCCCCC;
						color: #FFFFFF;
					}
				}
			}
		}
	}
	.empty-box{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 0;
		padding-top: 200rpx;
		image{
			width: 414rpx;
			height: 240rpx;
		}
		.txt{
			font-size: 26rpx;
			color: #999;
		}
	}
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 5;
		display: flex;
		width: 100%;
		height: 100rpx;
		height: calc(100rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		height: calc(100rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		background-color: #FFFFFF;
		opacity: 0.96;
		.item {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-weight: 500;
			font-size: 20rpx;
			color: #282828;
			.iconfont {
				font-size: 43rpx;
			}
			.icon-zhuanti{
				font-size: 38rpx;
			}
		}
		.active {
			color: var(--view-theme);
		}
	}
	.p-b-75{
		padding-bottom: 150rpx;
	}
	.vip-money {
		color: #282828;
		font-size: 22rpx;
		margin-left: 6rpx;
		font-weight: bold;
	}
	.vipImg {
		width: 65rpx;
		height: 28rpx;
		margin-left: 4rpx;
		image {
			width: 100%!important;
			height: 100%!important;
			display: block;
		}
	}
</style>
