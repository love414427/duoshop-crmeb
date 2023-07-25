<template>
	<view :style="viewColor">
		<view class='order-submission'>
			<view v-if="allow_address && order_model == 0" class="allAddress" @click="onAddress">
				<view class='address acea-row row-between-wrapper' v-if='shippingType == 0 '>
					<view class='addressCon' v-if="addressInfo.real_name">
						<view class='name'>{{addressInfo.real_name}}
							<text class='phone'>{{addressInfo.phone}}</text>
						</view>
						<view>
							<text class='default t-color'
								v-if="addressInfo.is_default">[默认]</text>{{addressInfo.province}}{{addressInfo.city}}{{addressInfo.district}}{{addressInfo.street || ''}}{{addressInfo.detail}}
						</view>
					</view>
					<navigator v-else :url="'/pages/users/user_address/index?cartId='+cartId" hover-class="none" class='addressCon'>
						<view class='setaddress'>设置收货地址</view>
					</navigator>
					<view class='iconfont icon-jiantou'></view>
				</view>
				<view class='line'>
					<image :src="`${domain}/static/images/line.jpg`"></image>
				</view>
			</view>
			<!-- 商品信息 -->
			<view class="storeinfo-wrapper">
				<view class="store-item" v-for="(item,index) in cartInfo" :key="index">
					<view class="store-title">
						<text class="iconfont icon-shangjiadingdan"></text>
						<view class="txt" @click="goStore(item.mer_id)">{{item.mer_name}}</view>
						<text class="iconfont icon-xiangyou"></text>
					</view>
					<view v-for="(goods,j) in item.list" :key="j">
						<view v-if="goods.product_type == 2">
							<view class="product-item">
								<view class="img-box">
									<image :src="goods.productPresellAttr.image || goods.product.image"></image>
								</view>
								<view class="content event_content">
									<view class="name line1"><text
											class="event_name event_bg">预售</text>{{goods.productPresell.store_name}}
									</view>
									<view class="label" style="width: 70%;">{{goods.productAttr.sku}}</view>
									<view class="price">
										￥{{goods.productPresellAttr.presell_price}}
										<text>X{{goods.cart_num}}</text>
									</view>
									<view class="event_ship event_color">发货时间：
										<!--全款预售-->
										<text
											v-if="goods.productPresell.presell_type === 1">{{goods.productPresell.delivery_type === 1 ? '支付后' : '预售结束后'}}{{ goods.productPresell.delivery_day }}天内</text>
										<!--定金预售-->
										<text
											v-if="goods.productPresell.presell_type === 2">{{ goods.productPresell.delivery_type === 1 ? '付尾款后' : '预售结束后' }}{{ goods.productPresell.delivery_day }}天内</text>
									</view>
									<view class="err-txt" v-if="goods.undelivered && addressInfo.real_name">
										<text class="iconfont icon-zhuyi-copy"></text>
										<view class="txt">此商品不支持该区域配送</view>
									</view>
								</view>
							</view>
							<view v-if="goods.productPresell.presell_type === 2" class="event_payTime">
								<view class="event_progress">
									<view class="progress_step">
										<text class="name color_red">定金</text>
										<text
											class="price color_red">￥{{ (goods.productPresellAttr.down_price * goods.cart_num).toFixed(2) }}</text>
									</view>
									<view class="progress_step">
										<text class="name">尾款</text>
										<text
											class="price">￥{{ (goods.productPresellAttr.final_price * goods.cart_num).toFixed(2) }}</text>
									</view>
									<view class="progress_pay">
										{{ goods.productPresell.final_start_time | filterDay}}开始支付尾款</view>
								</view>
							</view>
						</view>
						<view v-else>
							<view class="product-item">
								<view class="img-box">
									<image :src="goods.productAttr.image || goods.product.image"></image>
								</view>
								<view class="content">
									<view class="name line1">{{goods.product.store_name}}</view>
									<view class="label">{{goods.productAttr.sku}}</view>
									<view class="price acea-row row-between">
										<view class="acea-row row-middle">
											<block v-if="order_type == 3">
												￥{{goods.productAssistAttr.assist_price}}
											</block>
											<block v-else-if="order_type == 4">
												￥{{goods.activeSku.active_price}}
											</block>
											<block v-else>
												￥{{goods.productAttr.price}}
											</block>
											<text>X{{goods.cart_num}}</text>
											<view v-if="goods.productAttr.show_svip_price" class="vipImg">
												<image src="/static/images/svip.png"></image>
											</view>
										</view>
										<view class="delivery_type">
											<text v-if="!goods.allow_delivery">不支持快递</text>
											<text v-if="!goods.allow_take">不支持到店核销</text> 
										</view>
										
									</view>
									<view class="err-txt" v-if="goods.undelivered && addressInfo.real_name">
										<text class="iconfont icon-zhuyi-copy"></text>
										<view class="txt">此商品不支持该区域配送</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="wrapper">
						<view class="boxs">
							<view class='item acea-row row-between-wrapper'>
								<view>配送方式</view>
								<view v-if="item.delivery_way.length == 2 && (item.order.allow_delivery && item.order.allow_take)" class='discount' @tap="openShowBox(item,index)">
									{{item.order.isTake==0 ? deliveryName :'到店核销'}}
									<text v-if="order_model != 2" class='iconfont icon-jiantou'></text>
								</view>
								<view v-else class='discount'>
									{{item.order.isTake==0 ? deliveryName :'到店核销'}}
								</view>
							</view>
							<view class="store-address" v-if="item.order.isTake">
								<view class="name line2">{{item.take.mer_take_name}}</view>
								<view class="info line2">{{item.take.mer_take_address}}</view>
								<view class="map" @click="goMap(item)">
									<text class="iconfont icon-chakanditu"></text>
									<view class="map_text">查看地图</view>
								</view>
							</view>
						</view>
						<view class='item acea-row row-between-wrapper' v-if='shippingType==0 && item.isTake == 0 && order_model == 0'>
							<view>快递费用 <text
									v-if="item.list[0].productPresell && item.list[0].productPresell.presell_type == 2">(尾款阶段）</text>
							</view>
							<view class='discount' v-if='item.order.postage_price > 0'>+￥{{item.order.postage_price}}
							</view>
							<view class='discount' v-else>免运费</view>
						</view>
						<view class='item acea-row row-between-wrapper'
							v-if="!seckillId && order_type != 3 && order_type != 4 && item.order.enabledCoupon">
							<view>店铺优惠券</view>
							<block v-if="item.coupon.length>0">
								<view class='discount' @tap='couponTap(item,index)'>
									<text v-if="item.order.coupon_price>0">优惠￥{{item.order.coupon_price}}</text>
									<text v-else>暂未选择优惠券</text>
									<text class='iconfont icon-jiantou'></text>
								</view>
							</block>
							<block v-else>
								<view class='discount'>暂无优惠券</view>
							</block>
						</view>
						<view v-if="item.openReceipt == 1" class='item acea-row row-between-wrapper'>
							<view>开具发票 <text @tap="showInvoice" class="iconfont icon-wenhao1"></text></view>
							<view class='discount discount_voice' @tap="goInvoice(item.mer_id)">
								{{(item.invoiceData && item.invoiceData.receipt_title) ? item.invoiceData.receipt_title : '不开发票'}}
								<text class='iconfont icon-jiantou'></text>
							</view>
						</view>
						<view v-if="order_type === 2 && item.list[0].productPresell.presell_type ==2"
							class="item acea-row row-between-wrapper"
							style="border-top: 1px solid #f5f5f5; border-bottom: 1px solid #f5f5f5;">
							<checkbox-group class="checkgroup" @change='changeIsAgree'>
								<text class="iconfont icon-wenhao1"></text>
								<text @click="getPresellAgree">我已同意定金不退等预售协议</text>
								<checkbox class="checkbox" :checked="isAgree ? true : false" />
							</checkbox-group>
						</view>
						<view class='item acea-row row-between-wrapper' v-if="textareaStatus">
							<view style="width: 100px;">备注信息</view>
							<input v-if="coupon.status===false" placeholder-class='placeholder'
								@input='bindHideKeyboard' value="" name="mark" placeholder='选填备注信息'
								v-model="msgObj[item.mer_id]"></input>
						</view>
						<view class="total">
							共{{item.order.total_num}}件 小计
							<view class="price" v-if="item.isTake == 0"><text>￥</text>{{ item.order.pay_price }}</view>
							<view class="price" v-if="item.isTake == 1"><text>￥</text>{{ item.order.org_price}}</view>
						</view>
					</view>
				</view>
			</view>
			<!--虚拟商品-->
			<view class="wrapper virtual_form">
				<form report-submit='true'>
					<view v-for="(item,index) in order_extend" :key="item.title">
						<view v-if="item.key == 'mobile'" class='item acea-row row-between-wrapper'>
							<view><text class="item-require" v-if="item.require">*</text>{{item.title}}</view>
							<view class='discount'>
								<input type="text" v-model="item.value" placeholder="请填写手机号" placeholder-class='placeholder' />
							</view>
						</view>
						<view v-if="item.key == 'email'" class='item acea-row row-between-wrapper'>
							<view><text class="item-require" v-if="item.require">*</text>{{item.title}}</view>
							<view class='discount'>
								<input type="text" v-model="item.value" placeholder="请填写邮箱" placeholder-class='placeholder' />
							</view>
						</view>
						<view v-if="item.key == 'idCard'" class='item acea-row row-between-wrapper'>
							<view><text class="item-require" v-if="item.require">*</text>{{item.title}}</view>
							<view class='discount'>
								<input type="text" v-model="item.value" placeholder="请填写身份证号" placeholder-class='placeholder' />
							</view>
						</view>
						<view v-if="item.key == 'text' || item.key == 'number'" class='item acea-row row-between-wrapper'>
							<view><text class="item-require" v-if="item.require">*</text>{{item.title}}</view>
							<view class='discount'>
								<input v-if="item.key == 'text'" type="text" v-model="item.value" :placeholder="'请填写'+item.title" placeholder-class='placeholder' />
								<input v-if="item.key == 'number'" type="number" v-model="item.value" :placeholder="'请填写'+item.title" placeholder-class='placeholder' />
							</view>
						</view>
						<view v-if="item.key == 'date'" class='item acea-row row-between-wrapper'>
							<view><text class="item-require" v-if="item.require">*</text>{{item.title}}</view>
							<view class='discount'>
								<picker mode="date" :value="item.value" start="1970-01-01" @change="bindDateChange">
									<input type="text" @click="getTime(index)" disabled v-model="item.value" placeholder="请选择日期" placeholder-class='placeholder' />
								</picker>
							</view>
						</view>
						<view v-if="item.key == 'time'" class='item acea-row row-between-wrapper'>
							<view><text class="item-require" v-if="item.require">*</text>{{item.title}}</view>
							<view class='discount'>
								<picker mode="time" :value="item.value" start="1970-01-01" @change="bindDateChange">
									<input type="text" @click="getTime(index)" disabled v-model="item.value" placeholder="请选择时间" placeholder-class='placeholder' />
								</picker>
							</view>
						</view>
						<view v-if="item.key == 'image'" class='item'>
							<view><text class="item-require" v-if="item.require">*</text>{{item.title}}</view>
							<view class="upload">
								<view class='pictrue' v-for="(itemn,indexn) in item.value" :key="indexn" :data-index="indexn" @click="getPhotoClickIdx">
									<image :src="itemn"></image>
									<text class="iconfont icon-guanbi4" @click.stop="DelPic(item,indexn)"></text>
								</view>
								<view class='pictrue acea-row row-center-wrapper row-column' @click='uploadpic(item)' v-if="pics.length < 5">
									<text class='iconfont icon-icon25201'></text>
									<view>上传图片</view>
								</view>
							</view>
						</view>
					</view>
				</form>
			</view>
			<view class="settlementAgreement" v-if="showProtocol">
				<view class="setAgCount">
					<i class="icon iconfont icon-cha" @click="showProtocol = false"></i>
					<div class="title">{{agrementTtile}}</div>
					<view class="content">
						<jyf-parser :html="protocol" ref="article" :tag-style="tagStyle"></jyf-parser>
					</view>
				</view>
			</view>
			<!--收货人信息-->
			<view v-if="is_take" class="wrapper virtual_form">
				<form report-submit='true'>
					<view  class='item acea-row row-between-wrapper'>
						<view><text class="item-require">*</text>收货人姓名</view>
						<view class='discount'>
							<input type="text" v-model="post.real_name" placeholder="请填写收货人姓名" placeholder-class='placeholder' />
						</view>
					</view>					
					<view class='item acea-row row-between-wrapper'>
						<view><text class="item-require">*</text>收货人电话</view>
						<view class='discount'>
							<input type="number" v-model="post.phone" placeholder="请填写收货人电话" placeholder-class='placeholder' />
						</view>
					</view>
				</form>
			</view>
			<view class='wrapper'>
				<view class='item'>
					<view>支付方式</view>
					<view class='list'>
						<!-- #ifdef H5 -->
						<view class='payItem acea-row row-middle' :class='active==index ?"on":""' @tap='payItem(index)'
							v-for="(item,index) in cartArr" :key='index' v-if="item.payStatus==1">
							<view class='name acea-row row-center-wrapper'>
								<view class='iconfont animated'
									:class='(item.icon) + " " + (animated==true&&active==index ?"bounceIn":"")'></view>
								{{item.name}}
							</view>
							<view class='tip'>
								{{item.title}}
								<block v-if="item.value == 'balance'">
									{{userInfo.now_money}}
								</block>
							</view>
						</view>
						<!-- #endif -->
						<!-- #ifdef MP || APP-PLUS -->
						<view class='payItem acea-row row-middle' :class='active==index ?"on":""' @tap='payItem(index)'
							v-for="(item,index) in cartArr" :key='index' v-if="item.payStatus==1">
							<view class='name acea-row row-center-wrapper'>
								<view class='iconfont animated'
									:class='(item.icon) + " " + (animated==true&&active==index ?"bounceIn":"")'></view>
								{{item.name}}
							</view>
							<view class='tip'>
								{{item.title}}
								<block v-if="item.value == 'balance'">
									{{userInfo.now_money}}
								</block>
							</view>
						</view>
						<!-- #endif -->
					</view>
				</view>
			</view>
			<view class='moneyList'>
				<view class='item acea-row row-between-wrapper'>
					<view>商品总价：</view>
					<view class='money'>￥{{proPrice}}</view>
				</view>
				<view class='item acea-row row-between-wrapper' v-if="couponData.order_total_postage > 0">
					<view>运费：</view>
					<view class='money'>￥{{couponData.order_total_postage}}</view>
				</view>
				<view class='item acea-row row-between-wrapper' v-if="coupon_price > 0">
					<view>店铺优惠金额：</view>
					<view class='money'>-￥{{coupon_price}}</view>
				</view>
				<view class='item acea-row row-between-wrapper' v-if="open_integral && userInfo.integral>0 && order_type == 0">
					<view>积分抵扣：</view>
					<view class='money'>
						<text v-if="!use_integral">当前积分<text class="pColor">{{userInfo.integral}}</text></text>
						<text v-else>使用了{{integral_count}}个积分，抵扣<text
								class="pColor">{{integral_price}}元</text></text>
				<!-- 		<checkbox-group class="checkbox integral_checked" name="isDefault" @change="changeIntegral">
							<label>
								<checkbox :checked="use_integral ? true : false" />
							</label>
						</checkbox-group> -->
						<view class="checkbox integral_checked" @click="changeIntegral">
							<view class="iconfont icon-weixuanzhong" v-if="!use_integral"></view>
							<view class='iconfont icon-xuanzhong1' v-else></view>
						</view>
					</view>
				</view>
				<view class='item acea-row row-between-wrapper'
					v-if="!seckillId && order_type != 3 && order_type != 4 && enabledPlatformCoupon">
					<view>平台优惠券<text @tap="showCoupon" class="iconfont icon-wenhao1"></text></view>
					<block v-if="platformCoupon.length > 0">
						<view class='discount money' @tap='couponTap2(platformCoupon,0)'>
							<text v-if="total_platform_coupon_price>0">优惠￥{{total_platform_coupon_price}}</text>
							<text v-else>暂未选择优惠券</text>
							<text class='iconfont icon-jiantou'></text>
						</view>
					</block>
					<block v-else>
						<view class='discount'>暂无优惠券</view>
					</block>
				</view>
				<view class='item acea-row row-between-wrapper' v-if="priceGroup.storePostage > 0">
					<view>运费：</view>
					<view class='money'>+￥{{priceGroup.storePostage}}</view>
				</view>
			</view>
			<view style='height:140rpx;'></view>
			<view class='footer acea-row row-between-wrapper'>
				<view class="footer_count">
					<view>
						合计:
						<text class='pColor'>￥{{totalPrice || 0}}</text>
					</view>
					<view class="coupon_price" v-if="couponData.total_coupon > 0">
						优惠:¥ {{couponData.total_coupon}}
						<text @click="openDiscount">优惠明细</text>
					</view>
				</view>
				<view class='settlement' :class='couponData.status != "noAddress" ? "" : "disabled"' style='z-index:100'
					@tap="SubOrder">{{couponData.status != "noAddress" ? '提交订单':'选择地址'}}</view>
			</view>
		</view>
		<block v-if="coupon.status">
			<couponListWindow :coupon='coupon' :couponTitle="plantCoupon ? '平台优惠券' : '优惠券'" @ChangCouponsClone="ChangCouponsClone" @getCoupon="getCoupon"
				:openType='openType' @ChangCoupons="ChangCoupons" :coupon_amount='coupon_amount'
				:coupon_number='coupon_number'></couponListWindow>
		</block>
		<addressWindow ref="addressWindow" @changeTextareaStatus="changeTextareaStatus" :address='address'
			:pagesUrl="pagesUrl" @OnChangeAddress="OnChangeAddress" @changeClose="changeClose"></addressWindow>
		<addInvoicing ref="addInvoicing" @changeInvoiceClose="changeInvoiceClose" :invoice='invoice'></addInvoicing>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<block v-if="isShowBox">
			<checkDelivery :deliveryName="deliveryName" :isShowBox="isShowBox" :activeObj="activeObj" :radioList="radioList" @close="boxClose" @confirmBtn="getData">
			</checkDelivery>
		</block>
		<!--优惠明细弹窗-->
		<discountDetails :isShowDiscount="isShowDiscount" @close="closeDiscount" :couponData="couponData"></discountDetails>
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
	let app = getApp();
	import {
		orderConfirm,
		getOrderConfirm,
		getCouponsOrderPrice,
		orderCreate,
		createOrder
	} from '@/api/order.js';
	import {
		getAddressDefault,
		getAddressDetail,
		getAddressList,
		getUserInfo,
		getAgreementApi
	} from '@/api/user.js';
	import {
		openPaySubscribe
	} from '@/utils/SubscribeMessage.js';
	import {
		presellAgreement
	} from '@/api/activity.js';
	import {
		storeListApi
	} from '@/api/store.js';
	import {
		CACHE_LONGITUDE,
		CACHE_LATITUDE
	} from '@/config/cache.js';
	import couponListWindow from '@/components/orderCoupon';
	import addressWindow from '@/components/addressWindow';
	import orderGoods from '@/components/orderGoods';
	import checkDelivery from '@/components/checkDelivery/index.vue';
	import discountDetails from '@/components/discountDetails/index.vue';
	import addInvoicing from '@/components/addInvoicing';
	import parser from "@/components/jyf-parser/jyf-parser";
	import { mapGetters } from "vuex";
	import authorize from '@/components/Authorize';
	import { configMap } from '@/utils';
	import { HTTP_REQUEST_URL } from '@/config/app';
	export default {
		components: {
			couponListWindow,
			addressWindow,
			orderGoods,
			checkDelivery,
			addInvoicing,
			discountDetails,
			"jyf-parser": parser,
			authorize,
		},
		filters: {
			filterDay(val) {
				if (val) {
					var reg = /(\d{4})\-(\d{2})\-(\d{2})/;
					var date = val.replace(reg, "$2月$3日");
					return date
				}
			}
		},
		data() {
			return {
				// 备注
				msgObj: {},
				textareaStatus: true,
				deliveryName: '快递配送',
				//支付方式
				cartArr: [{
						"name": "微信支付",
						"icon": "icon-weixin2",
						value: 'weixin',
						title: '微信快捷支付',
						payStatus: 1,
					},
					{
						name: "支付宝支付",
						icon: "icon-icon34",
						// #ifdef H5 || APP-PLUS
						value: 'alipay',
						// #endif
						// #ifdef MP
						value: 'alipayQr',
						// #endif
						title: '支付宝支付',
						payStatus: this.$store.getters.globalData.alipay_open
					},
					{
						"name": "余额支付",
						"icon": "icon-icon-test",
						value: 'balance',
						title: '可用余额:',
						payStatus: this.$store.getters.globalData.yue_pay_status,
					},
					{
						"name": "线下支付",
						"icon": "icon-yinhangqia",
						value: 'offline',
						title: '线下支付',
						payStatus: 2,
					},
				],
				tagStyle: {
					img: 'width:100%;display:block;',
					video: 'width:100%;'
				},
				radioList:[
					{
						title:this.deliveryName,
						check:true
					},
					{
						title:'到店核销',
						check:false
					}
				],
				payType: 'weixin', //支付方式
				openType: 1, //优惠券打开方式 1=使用
				active: 0, //支付方式切换
				coupon: {
					status: false,
					list: [],
					statusTile: '立即使用'
				}, //优惠券组件
				address: {
					address: false
				}, //地址组件
				addressInfo: {}, //地址信息
				invoice: {
					invoice: false,
					mer_id: 0,
					add: true
				}, //发票组件
				invoiceData: {}, // 发票数据
				pinkId: 0, //拼团id
				addressId: 0, //地址id
				couponId: 0, //优惠券id
				cartId: '', //购物车id
				BargainId: 0,
				combinationId: 0,
				seckillId: 0,
				userInfo: {}, //用户信息
				post: {},
				mark: '', //备注信息
				couponTitle: '请选择', //优惠券
				coupon_price: 0, //优惠券抵扣金额
				useIntegral: false, //是否使用积分
				integral_price: 0, //积分抵扣金额
				integral: 0,
				ChangePrice: 0, //使用积分抵扣变动后的金额
				formIds: [], //收集formid
				status: 0,
				is_address: false,
				toPay: false, //修复进入支付时页面隐藏从新刷新页面
				shippingType: 0,
				system_store: {},
				storePostage: 0,
				contacts: '',
				contactsTel: '',
				mydata: {},
				storeList: [],
				store_self_mention: 0,
				cartInfo: [],
				priceGroup: {},
				animated: false,
				totalPrice: 0,
				use_integral: false,
				pagesUrl: "",
				orderKey: "",
				offlinePostage: "",
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				from: '',
				orderStatus: '', //是否有地址
				couponIndex: 0, //选择商铺优惠券索引
				subCoupon: {}, //提交订单使用的优惠券
				proPrice: 0, //商品总价
				isShowBox: false,
				activeObj: {}, //选中店铺信息
				activeIndex: '', // 选中店铺索引
				invoiceName: '不开发票',
				invoice_func: false,
				special_invoice: false,
				isAgree: false,
				showProtocol: false,
				isCoupon: false,
				protocol: '',
				order_type: 0,
				addInvoice: {},
				couponData: {},
				go_map: false,
				orderPay: false,
				take: [],
				open_integral: 0,
				coupon_number: 0,
				store_coupon_number: 0,
				coupon_amount: 0,
				store_coupon_amount: 0,
				plant_coupon_amount: 0,
				integral_count: '',
				agrementTtile: '发票说明',
				pics: [],
				order_model: 2,
				allow_address: true,
				order_extend: [],
				extend: [],
				virtualIndex: 0,
				platformCoupon: [],
				total_platform_coupon_price: 0,
				enabledPlatformCoupon: false,
				plantCoupon: false,
				isShowDiscount: false,
				order_key: '',
				is_take: '',
				domain: HTTP_REQUEST_URL,
			};
		},
		computed: {
			...mapGetters(['isLogin','viewColor']),
			...configMap(['hide_mer_status', 'alipay_open', 'yue_pay_status']),
		},
		watch: {
			alipay_open(n){
				this.payMode[1].payStatus = n
			},
			yue_pay_status(n){
				this.payMode[2].payStatus = n
			}
		},
		onReady() {
		},
		mounted: function() {
		},
		onLoad: function(options) {
			this.seckillId = options.seckillId
			// #ifdef H5
			this.from = this.$wechat.isWeixin() ? 'weixin' : 'h5'
			// #endif
			// #ifdef MP
			this.from = 'routine'
			// #endif
			// #ifdef APP-PLUS
			this.from = 'weixin'
			// #endif
			if (!options.cartId) return this.$util.Tips({
				title: '请选择要购买的商品'
			}, {
				tab: 3,
				url: 1
			});
			this.couponId = options.couponId || 0;
			this.pinkId = options.pinkid ? parseInt(options.pinkid) : 0;
			this.addressId = options.addressId || 0;
			this.cartId = options.cartId;
			this.is_address = options.is_address ? true : false;
			this.news = options.new ? 1 : 0;
			this.invoice_id = options.invoice_id || '';
			if (options.invoice_type == 1) {
				this.invoiceName = '增值税电子普通发票';
			} else if (options.invoice_type == 2) {
				this.invoiceName = '增值税专用发票';
			}
			if (!this.isLogin) {
				this.isAuto = true;
				this.isShowAuth = true
			}
			if (this.payType == 'weixin') {
				this.payType = this.from
			}
			let _this = this
			this.textareaStatus = true;
			if (this.isLogin && this.toPay == false && !this.orderPay) {
				this.getaddressInfo();
				this.$nextTick(function() {
					this.$refs.addressWindow.getAddressList();
					this.getUserInfo()
				})
			}
			uni.setStorage({
				key:'invoice_Data',
				data:{},
				success: function(){}
			})
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			let that = this;
			uni.$on("handClick", res => {
				if (res) {
					_this.system_store = res.address
				}
				// 清除监听
				uni.$off('handClick');
			})
			that.invoice.invoice = false
		},
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		// onHide: function() {
		// },
		methods: {
			/*预售协议*/
			getPresellAgree: function() {
				this.showProtocol = true
				this.agrementTtile = '预售协议'
				presellAgreement().then(res => {
					this.protocol = res.data.sys_product_presell_agree;
				})
			},
			changeIsAgree: function(e) {
				this.isAgree = !this.isAgree;
			},
			changeIntegral: function(e) {
				this.use_integral = !this.use_integral;
				this.getConfirm(this.addressId);
			},
			showPresellAgree(){
				this.getPresellAgree()
			},
			showInvoice(){
				this.getAgreement();
			},
			showCoupon(){
				this.getCouponAgreement();
			},
			// 打开配送方式弹窗
			openDiscount(item, index) {
				this.isShowDiscount = !this.isShowDiscount;
			},
			closeDiscount() {
				this.isShowDiscount = false
			},
			// 图片预览
			// 获得相册 idx
			getPhotoClickIdx(e) {
				let _this = this;
				let idx = e.currentTarget.dataset.index;
				_this.imgPreview(_this.pics, idx);
			},
			// 图片预览
			imgPreview: function(list, idx) {
				// list：图片 url 数组
				if (list && list.length > 0) {
					uni.previewImage({
						current: list[idx], //  传 Number H5端出现不兼容
						urls: list
					});
				}
			},
			/**上传文件*/
			uploadpic: function(item) {
				let that = this;
				that.$util.uploadImageOne('upload/image', function(res) {
					let pics = item.value || []
					pics.push(res.data.path);
					that.$set(item,'value', pics);
				});
			},
			/** 删除图片*/
			DelPic: function(item,index) {
				let that = this,
				pic = this.pics[index];
				item.value.splice(index, 1);
				// that.$set(that, 'pics', that.pics);
			},
			// 获取个人信息
			getUserInfo() {
				getUserInfo().then(res => {
					this.userInfo = res.data
				})
			},
			/*获取发票说明*/
			getAgreement() {
				let that = this
				that.showProtocol = true;
				that.agrementTtile = '发票说明'
				getAgreementApi('sys_receipt_agree').then(res => {
					that.protocol = res.data.sys_receipt_agree
				})
			},
			/*获取发票说明*/
			getCouponAgreement() {
				let that = this
				that.showProtocol = true;
				that.agrementTtile = '优惠券说明'
				getAgreementApi('sys_coupon_agree').then(res => {
					that.protocol = res.data.sys_coupon_agree
				})
			},
			/**
			 * 授权回调事件
			 *
			 */
			onLoadFun: function() {
				this.isShowAuth = false;
				this.getaddressInfo();
				this.getUserInfo();
				//调用子页面方法授权后执行获取地址列表
				// this.$scope.selectComponent('#address-window').getAddressList();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e;
			},
			/**
			 * 获取门店列表数据
			 */
			getList: function() {
				let longitude = uni.getStorageSync("CACHE_LONGITUDE"); //经度
				let latitude = uni.getStorageSync("CACHE_LATITUDE"); //纬度
				let data = {
					latitude: latitude, //纬度
					longitude: longitude, //经度
					page: 1,
					limit: 10
				}
				storeListApi(data).then(res => {
					let list = res.data.list.list || [];
					this.$set(this, 'storeList', list);
					this.$set(this, 'system_store', list[0]);
				}).catch(err => {})
			},
			// 关闭地址弹窗；
			changeClose: function() {
				this.$set(this.address, 'address', false);
			},
			// 关闭发票弹窗
			changeInvoiceClose: function(data) {
				this.getInvoiceData(data);
				this.$set(this.invoice, 'invoice', false);
			},
			getInvoiceData(selectedData) {
				this.invoiceData = {}
				if (selectedData) {
					this.cartInfo.forEach((item, i) => {
						if (item.mer_id == selectedData.mer_id) {
							if (this.cartInfo[i]['invoiceData']) {
								this.cartInfo[i]['invoiceData'] = selectedData
							} else {
								this.$set(this.cartInfo[i], 'invoiceData', selectedData)
							}
						}
						let mer_id = selectedData.mer_id
						this.invoiceData[mer_id] = selectedData;
					});
				} else {
					this.cartInfo.forEach((item, i) => {
						this.$set(this.cartInfo[i], 'invoiceData', {})
					});
				}
			},
			getInvoiceDatas(selectedData) {
				this.invoiceData = {}
				if (selectedData.length) {
					this.cartInfo.forEach((item, i) => {
						selectedData.forEach((val, j) => {
							if (item.mer_id == val.mer_id) {
								if (this.cartInfo[i]['invoiceData']) {
									this.cartInfo[i]['invoiceData'] = val
								} else {
									this.$set(this.cartInfo[i], 'invoiceData', val)
								}
							}
							let mer_id = val.mer_id
							this.invoiceData[mer_id] = val;
						})
					});
				} else {
					this.cartInfo.forEach((item, i) => {
						this.$set(this.cartInfo[i], 'invoiceData', {})
					});
				}
			},
			/*
			 * 跳转门店列表
			 */
			showStoreList: function() {
				let _this = this
				if (this.storeList.length > 0) {
					uni.navigateTo({
						url: '/pages/users/goods_details_store/index'
					})
				}
			},
			// 进店
			goStore: function(id) {
				if (this.hide_mer_status != 1) {
					uni.navigateTo({
						url: `/pages/store/home/index?id=${id}`
					})
				}
			},
			ChangCouponsClone: function() {
				this.$set(this.coupon, 'status', false);
			},
			changeTextareaStatus: function() {
				for (let i = 0, len = this.coupon.list.length; i < len; i++) {
					this.coupon.list[i].use_title = '';
					this.coupon.list[i].is_use = 0;
				}
				this.textareaStatus = true;
				this.status = 0;
				this.$set(this.coupon, 'list', this.coupon.list);
			},
			/**
			 * 处理点击优惠券后的事件
			 *
			 */
			ChangCoupons: function(data) {
				this.cartInfo.forEach((item, index) => {
					if (item.mer_id == data.mer_id) {
						this.$set(this.cartInfo, index, data)
					}
				})
				this.$set(this.coupon, 'status', false);
				this.couponNum()
			},
			// 计算优惠券抵扣
			couponNum() {
				let tempTotal = 0,
				tempCouponNum = 0
				this.cartInfo.forEach((item, index) => {
					tempCouponNum = this.$util.$h.Add(tempCouponNum, item.order.coupon_price)
					tempTotal = this.$util.$h.Add(tempTotal, item.order.pay_price)
				})
				this.coupon_price = tempCouponNum
				if (this.order_type == 2 && this.coupon.list[0].productPresell.presell_type == 2) {
					return
				}
				this.totalPrice = tempTotal
			},
			/**
			 * 选择地址后改变事件
			 * @param object e
			 */
			OnChangeAddress: function(e) {
				this.textareaStatus = true;
				this.addressId = e;
				this.address.address = false;
				this.getaddressInfo();
			},
			bindHideKeyboard: function(e) {
				this.mark = e.detail.value;
			},
			getCoupon(coupon) {
				if (coupon.checked) {
					this.subCoupon[coupon.mer_id].forEach((item, i) => {
						if (coupon.coupon_user_id == item) {
							this.subCoupon[coupon.mer_id].splice(i, 1)
						}
					})
				} else {
					this.subCoupon[coupon.mer_id].push(coupon.coupon_user_id)
				}
				this.getConfirm(this.addressId)
			},
			/**
			 * 获取当前订单详细信息
			 *
			 */
			getConfirm: function(address_id) {
				let that = this;
				uni.showLoading({
					title: '',
					mask: true
				});
				getOrderConfirm({
					cart_id: that.cartId.split(","),
					address_id: address_id,
					takes: that.take,
					use_coupon: that.subCoupon,
					use_integral: that.use_integral
				}).then(res => {
					// 默认选中
					that.is_take = false
					res.data.order.forEach(el => {
						if(el.order.isTake == 1)that.is_take = true
						el.isTake = 0
						that.subCoupon[el.mer_id] = []
						el.coupon.forEach(coupon => {
							if (coupon.checked) {
								that.subCoupon[el.mer_id].push(coupon.coupon_user_id)
							}
						})
					})	
					that.subCoupon['0'] = []
					if(res.data.platformCoupon.length > 0){
						res.data.platformCoupon.forEach(el => {
							if (el.checked) {
								that.subCoupon[el.mer_id] = []
								that.subCoupon[el.mer_id].push(el.coupon_user_id)
							}
						})
					}
					that.$set(that.coupon, "coupon", that.plantCoupon ? res.data.platformCoupon : res.data.order[that.couponIndex].coupon);
					that.$set(that, "store_coupon_number",  res.data.order[that.couponIndex].order.useCouponIds.length);
					that.$set(that, "coupon_amount", parseFloat(res.data.order[that.couponIndex].order.coupon_price) + parseFloat(res.data.total_platform_coupon_price));
					that.$set(that, "store_coupon_amount", parseFloat(res.data.order[that.couponIndex].order.coupon_price));
					that.$set(that, "plant_coupon_amount", parseFloat(res.data.total_platform_coupon_price));
					that.$set(that, 'couponData', res.data);
					that.$set(that, 'cartInfo', res.data.order);
					that.$set(that, 'total_platform_coupon_price', res.data.total_platform_coupon_price);
					that.$set(that, 'enabledPlatformCoupon', res.data.enabledPlatformCoupon);
					that.$set(that, 'platformCoupon', res.data.platformCoupon);
					that.$set(that, 'order_type', res.data.order_type);
					that.$set(that, 'coupon_price', res.data.order_coupon_price);
					that.$set(that, 'integral_count', res.data.order_total_integral);
					that.$set(that, 'integral_price', res.data.order_total_integral_price);
					that.$set(that, 'open_integral', res.data.openIntegral);
					that.$set(that, 'use_integral', res.data.useIntegral);
					that.$set(that, 'order_extend', (that.order_extend && that.order_extend.length>0) ? that.order_extend : res.data.order_extend);
					that.totalPrice = res.data.order_price
					that.orderStatus = res.data.status
					that.proPrice = res.data.total_price
					that.order_type = res.data.order_type
					that.order_model = res.data.order_model
					that.allow_address = res.data.allow_address
					that.deliveryName = res.data.order_model == 0 ?  '快递配送' : '虚拟发货'
					that.order_key = res.data.key
					uni.getStorage({
						key: "invoice_Data",
						success: function(res) {
							that.addInvoice = res.data;
							if (res.data) {
								that.getInvoiceDatas(res.data)
							}
						}
					})
					uni.hideLoading();
				}).catch(err => {
					return this.$util.Tips({
						title: err
					}, {
						tab: 3,
						url: 1
					});
				});
			},
			/*
			 * 获取默认收货地址或者获取某条地址信息
			 */
			getaddressInfo: function() {
				let that = this;
				if (that.addressId) {
					getAddressDetail(that.addressId).then(res => {
						res.data.is_default = parseInt(res.data.is_default);
						that.addressInfo = res.data || {};
						that.addressId = res.data.address_id || 0;
						that.address.addressId = res.data.address_id || 0;
						that.post = {real_name: res.data.real_name, phone: res.data.phone}
						this.getConfirm(that.addressId);
					})
				} else {
					getAddressList().then(res => {
						that.addressInfo = res.data.list.length > 0 ? res.data.list[0] : {};
						that.addressId = res.data.list.length > 0 ? res.data.list[0].address_id : 0;
						that.address.addressId = res.data.list.length > 0 ? res.data.list[0].address_id : 0;
						that.post = res.data.list.length > 0 ? {real_name: res.data.list[0].real_name,phone:res.data.list[0].phone } : {real_name: '', phone: ''}
						this.getConfirm(that.addressId);
					})
				}
			},
			payItem: function(e) {
				let that = this;
				let active = e;
				that.active = active;
				that.animated = true;
				that.payType = that.cartArr[active].value;
				if (that.payType == 'weixin') {
					that.payType = that.from
				}
			},
			couponTap: function(item, index) {
				this.coupon = item
				this.$set(this.coupon, 'status', true)
				this.couponIndex = index
				this.plantCoupon = false
				this.$set(this, "coupon_number",  this.store_coupon_number);
				this.$set(this, "coupon_amount",  this.store_coupon_amount);
			},
			couponTap2: function(item, index) {
				this.coupon = {
					coupon: item,
					mer_id: 0,
					status: true
				}
				this.plantCoupon = true
				this.$set(this, "coupon_number",  this.subCoupon['0'].length);
				this.$set(this, "coupon_amount",  this.plant_coupon_amount);
			},
			car: function() {
				let that = this;
				that.animated = false;
			},
			onAddress: function() {
				let that = this;
				if(that.addressInfo.real_name){
					that.textareaStatus = false;
					that.address.address = true;
					that.pagesUrl = '/pages/users/user_address/index?cartId=' + this.cartId + '&pinkId=' + this.pinkId + '&couponId=' + this.couponId;
				}else{
					uni.navigateTo({
						url: `/pages/users/user_address/index?cartId=${this.cartId}`,
					});
				}
			},
			/**
			 * 开发票
			 */
			goInvoice: function(id) {
				let that = this;
				that.invoice.invoice = true;
				that.invoice.mer_id = id;
				this.$refs.addInvoicing.getInvoiceDefault();
				this.$refs.addInvoicing.getInvoiceList();
			},
			realName: function(e) {
				this.contacts = e.detail.value;
			},
			phone: function(e) {
				this.contactsTel = e.detail.value;
			},
			payment: function(data) {
				let that = this;
				createOrder(data).then(res => {
					let status = res.data.status,
						orderId = res.data.result.order_id,
						callback_key = res.data.result.pay_key,
						jsConfig = res.data.result.config,
						goPages = '/pages/order_pay_status/index?order_id=' + orderId + '&msg=' + res.message;
					that.orderPay = true;
					uni.hideLoading();
					console.log('status是啥呀',status)
					switch (status) {
						case 'ORDER_EXIST':
						case 'EXTEND_ORDER':
						case 'PAY_ERROR':
						case 'error':
							return that.$util.Tips({
								title: res.message
							}, {
								tab: 5,
								url: goPages
							});
							break;
						case 'success':
							return that.$util.Tips({
								title: res.message,
								icon: 'success'
							}, {
								tab: 5,
								url: goPages
							});
							break;
						case 'alipay':
						case "alipayQr":
							uni.navigateTo({
								url: '/pages/order_pay_back/index?keyCode=' + callback_key + '&url=' +
									jsConfig
							})
							return;
							break;
							// #ifndef MP
						case "wechat":
						case "weixin":
						case "weixinApp":
							jsConfig.timeStamp = jsConfig.timestamp;
							// #ifndef APP-PLUS
							this.$wechat.pay(jsConfig).then(res => {
								return that.$util.Tips({
									title: res.message,
									icon: 'success'
								}, {
									tab: 4,
									url: goPages
								});
							}).catch(res => {
								if (res.errMsg == 'chooseWXPay:cancel') return that.$util.Tips({
									title: '取消支付'
								}, {
									tab: 5,
									url: goPages + '&status=0'
								});
							})
							// #endif
							// #ifdef APP-PLUS
							let mp_pay_name=''
							if(uni.requestOrderPayment){
								mp_pay_name='requestOrderPayment'
							}else{
								mp_pay_name='requestPayment'
							}
							uni[mp_pay_name]({
								provider: 'wxpay',
								orderInfo: jsConfig,
								success: (e) => {
									let url = '/pages/order_pay_status/index?order_id=' + orderId +
										'&msg=支付成功';
									return that.$util.Tips({
										title: '支付成功',
										icon: 'success'
									}, {
										tab: 4,
										url: url
									});
								},
								fail: (e) => {
									let url = '/pages/order_pay_status/index?order_id=' + orderId + '&msg=取消支付';
									return that.$util.Tips({
										title: '取消支付',
									}, {
										tab: 4,
										url: url
									});
								},
								complete: () => {
									let url = '/pages/order_pay_status/index?order_id=' + orderId + '&msg=取消支付';
									return that.$util.Tips({
										title: '',
									}, {
										tab: 4,
										url: url
									});
								},
							});
							// #endif
							break;
							// #endif
							// #ifdef MP
						case "routine":
							jsConfig.timeStamp = jsConfig.timestamp;
							that.toPay = true;
							let mp_pay_name=''
							if(uni.requestOrderPayment){
								mp_pay_name='requestOrderPayment'
							}else{
								mp_pay_name='requestPayment'
							}
							uni[mp_pay_name]({
								...jsConfig,
								success: function(res) {
									uni.hideLoading();
									return that.$util.Tips({
										title: '支付成功',
										icon: 'success'
									}, {
										tab: 5,
										url: goPages
									});
								},
								fail: function(e) {
									let pages = '/pages/order_pay_status/index?order_id=' +
										orderId + '&msg=取消支付'
									return that.$util.Tips({
										title: '取消支付'
									}, {
										tab: 5,
										url: pages + '&status=0'
									});
								},
							})
							break;
							// #endif
						case "balance":
							//余额
							return that.$util.Tips({
								title: res.msg
							}, {
								tab: 5,
								url: goPages + '&status=1'
							});
							break;
							// #ifdef H5
						case 'h5':
							let host = window.location.protocol + "//" + window.location.host;
							let url = `${host}/pages/order_pay_status/index?order_id=${orderId}&msg=${res.message}`
							let eUrl = encodeURIComponent(url)
							let jsurl = jsConfig.mweb_url || jsConfig.h5_url
							let locations = `${jsurl}&redirect_url=${eUrl}`
							setTimeout(() => {
								location.href = locations;
							}, 100);
							break;
							// #endif
							// #ifdef APP-PLUS
						case 'alipayApp':
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: jsConfig,
								success: (e) => {
									return that.$util.Tips({
										title: '支付成功',
										icon: 'success'
									}, {
										tab: 5,
										url: goPages
									});
								},
								fail: (e) => {
									let pages = '/pages/order_pay_status/index?order_id=' +
										orderId + '&msg=支付失败'
									return that.$util.Tips({
										title: '支付失败'
									}, {
										tab: 5,
										url: pages
									});
								},
								complete: () => {
									uni.hideLoading();
									let pages = '/pages/order_pay_status/index?order_id=' +
										orderId + '&msg=取消支付'
									return that.$util.Tips({
										title: ''
									}, {
										tab: 5,
										url: pages
									});
								},
							});
							break;
							// #endif
						default: 
							let pages = '/pages/order_pay_status/index?order_id=' +
								orderId + '&msg=取消支付'
							return that.$util.Tips({
								title: '取消支付'
							}, {
								tab: 5,
								url: pages + '&status=0'
							});
					}
				}).catch(err => {
					uni.hideLoading();
					return that.$util.Tips({
						title: err
					});
				});
			},
			isEmojiCharacter: function(substring) {
				if (substring) {
					for (var i = 0; i < substring.length; i++) {
						var hs = substring.charCodeAt(i);
						if (0xd800 <= hs && hs <= 0xdbff) {
							if (substring.length > 1) {
								var ls = substring.charCodeAt(i + 1);
								var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
								if (0x1d000 <= uc && uc <= 0x1f77f) {
									return true;
								}
							}
						} else if (substring.length > 1) {
							var ls = substring.charCodeAt(i + 1);
							if (ls == 0x20e3) {
								return true;
							}
						} else {
							if (0x2100 <= hs && hs <= 0x27ff) {
								return true;
							} else if (0x2B05 <= hs && hs <= 0x2b07) {
								return true;
							} else if (0x2934 <= hs && hs <= 0x2935) {
								return true;
							} else if (0x3297 <= hs && hs <= 0x3299) {
								return true;
							} else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 ||
								hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b ||
								hs == 0x2b50) {
								return true;
							}
						}
					}
				}
			},
			bindDateChange(e){
				let that = this
				that.$set(that.order_extend[that.virtualIndex], 'value', e.detail.value);
			},
			getTime(index){
				this.virtualIndex = index;
			},
			SubOrder: function(e) {
				let that = this,
					data = {};
				if (!that.payType) return that.$util.Tips({
					title: '请选择支付方式'
				});
				if (that.orderStatus == 'noAddress') return that.$util.Tips({
					title: '请选择收货地址'
				});
				if (that.orderStatus != 'finish' && that.order_model == 0) {
					return that.$util.Tips({
						title: '收货地址不在配送区域'
					});
				}
				if (that.orderStatus == 'noDeliver') {
					return that.$util.Tips({
						title: '暂不发货'
					});
				}
				if (that.order_type == 2 && !that.isAgree && that.cartInfo[0].list[0].productPresell.presell_type ==
					2) {
					return that.$util.Tips({
						title: '请阅读并勾选协议，否则无法进行操作'
					});
				}
				if(that.order_model == 1 && that.order_extend.length > 0){
					for(var i=0; i<that.order_extend.length; i++){
						let el = that.order_extend[i]
						if (el.require) {
							if(!el.value || el.value.length == 0){
								return that.$util.Tips({
									title: '请填写'+el.title
								});
							}else if(el.key == 'mobile' && !/^1(3|4|5|7|8|9|6)\d{9}$/i.test(el.value)){
								return that.$util.Tips({
									title: '请输入正确的'+el.title
								});
							}else if(el.key == 'email' && !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(el.value)){
								return that.$util.Tips({
									title: '请输入正确的'+el.title
								});
							}else if(el.key == 'idCard' && !/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(el.value)){
								return that.$util.Tips({
									title: '请输入正确的'+el.title
								});
							}
						}else if(el.value){
							if(el.key == 'mobile' && !/^1(3|4|5|7|8|9|6)\d{9}$/i.test(el.value)){
								return that.$util.Tips({
									title: '请输入正确的'+el.title
								});
							}if(el.key == 'email' && !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(el.value)){
								return that.$util.Tips({
									title: '请输入正确的'+el.title
								});
							}if(el.key == 'idCard' && !/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(el.value)){
								return that.$util.Tips({
									title: '请输入正确的'+el.title
								});
							}
						}
						that.extend[i] = {title: el.title,value: el.value}
					}
				}
				if (that.is_take) {
					if(!that.post.real_name){
						return that.$util.Tips({
							title: '请填写收货人姓名'
						});
					}
					if(!that.post.phone){
						return that.$util.Tips({
							title: '请填写收货人电话'
						});
					}
					if(that.post.phone && !/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.post.phone)){
						return that.$util.Tips({
							title: '收货人电话格式不正确'
						});
					}
				}
				data = {
					cart_id: this.cartId.split(","),
					address_id: this.addressId,
					use_coupon: this.subCoupon,
					pay_type: this.payType,
					mark: this.msgObj,
					order_type: this.order_type,
					key: this.order_key,
					takes: this.take,
					use_integral: this.use_integral,
					receipt_data: this.invoiceData,
					extend: this.extend,
					post: this.post,
					// #ifdef H5
					return_url: 'http://' + window.location.host + '/pages/users/order_list/index',
					// #endif
				};
				if (data.mark && this.isEmojiCharacter(data.mark[Object.keys(data.mark)[0]])) {
					that.$util.Tips({
						title: '备注不允许输入表情！'
					});
					return;
				}
				data.takes=[]
				this.cartInfo.map(el => {
					if (el.isTake == 1 || el.order.isTake) {
						data.takes.push(el.mer_id)
					}
				})
				if (data.payType == 'balance' && parseFloat(that.userInfo.now_money) < parseFloat(that.totalPrice))
					return that.$util
						.Tips({
							title: '余额不足！'
						});
				uni.showLoading({
					title: '订单支付中',
					mask: true
				});
				// #ifdef MP
				openPaySubscribe().then(() => {
					that.payment(data);
				});
				// #endif
				// #ifndef MP
				that.payment(data);
				// #endif
			},
			// 打开配送方式弹窗
			openShowBox(item, index) {
				if(item.delivery_way.length == 2 && this.order_model != 2){
					this.activeObj = item
					this.activeIndex = index
					this.isShowBox = true
					this.getDeliveryType(item.order)
				}
			},
			// 获取快递方式
			getDeliveryType(item) {
				if(item.allow_delivery && item.allow_take){
					this.radioList = [
						{
							title:this.deliveryName,
							check:true
						},
						{
							title:'到店核销',
							check:false
						}
					]
				}else if(item.allow_delivery && !item.allow_take){
					this.radioList = [
						{
							title:this.deliveryName,
							check:true
						}
					]
				}else if(!item.allow_delivery && item.allow_take){
					this.radioList = [
						{
							title:'到店核销',
							check:false
						}
					]
				}
			},
			boxClose() {
				this.isShowBox = false
			},
			getData(data) {
				this.cartInfo[this.activeIndex] = data
				if (data.order.isTake) {
					this.take.push(data.mer_id)
				} else {
					this.take.forEach((item, i) => {
						if (data.mer_id == item) {
							this.take.splice(i, 1)
						}
					})
				}
				this.isShowBox = false
				this.getConfirm(this.addressId);
			},
			//查看内置地图
			goMap(item) {
				let that = this;
				let lat = Number(item.take.mer_take_location[0]),
					long = Number(item.take.mer_take_location[1])
				//#ifdef H5
				if (that.$wechat.isWeixin() === true) {
					that.$wechat.seeLocation({
						latitude: lat,
						longitude: long,
						name: item.mer_name,
						address: item.take ? item.take.mer_take_address : '',
					}).then(res => {})
				} else {
					//#endif
					uni.openLocation({
						latitude: parseFloat(lat),
						longitude: parseFloat(long),
						scale: 8,
						name: item.mer_name,
						address: item.take ? item.take.mer_take_address : '',
						success: function(res) {
							that.go_map = true
						},
					});
					// #ifdef H5
				}
				//#endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/checkbox .uni-checkbox-input.uni-checkbox-input-checked,
	/deep/checkbox .wx-checkbox-input.wx-checkbox-input-checked {
	  border: 1px solid var(--view-theme)!important;
	  background-color: var(--view-theme)!important;
	  color: #fff!important;
	}
	.order-submission .line {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 3rpx;
	}
	.order-submission .line image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.order-submission .address {
		padding: 28rpx 30rpx;
		background-color: #fff;
		box-sizing: border-box;
	}
	.order-submission .address .addressCon {
		width: 610rpx;
		font-size: 26rpx;
		color: #666;
	}
	.order-submission .address .addressCon .name {
		font-size: 30rpx;
		color: #282828;
		font-weight: bold;
		margin-bottom: 10rpx;
	}
	.order-submission .address .addressCon .name .phone {
		margin-left: 50rpx;
	}
	.order-submission .address .addressCon .default {
		margin-right: 12rpx;
	}
	.t-color{
		color: var(--view-theme);
	}
	.order-submission .address .addressCon .setaddress {
		color: #333;
		font-size: 28rpx;
	}
	.order-submission .address .iconfont {
		font-size: 35rpx;
		color: #707070;
	}
	.order-submission .allAddress {
		width: 100%;
	}
	.order-submission .allAddress .nav {
		width: 710rpx;
		margin: 0 auto;
	}
	.order-submission .allAddress .nav .item {
		width: 355rpx;
	}
	.order-submission .allAddress .nav .item.on {
		position: relative;
		width: 250rpx;
	}
	.order-submission .allAddress .nav .item.on::before {
		position: absolute;
		bottom: 0;
		content: "快递配送";
		font-size: 28rpx;
		display: block;
		height: 0;
		width: 336rpx;
		border-width: 0 20rpx 80rpx 0;
		border-style: none solid solid;
		border-color: transparent transparent #fff;
		z-index: 2;
		border-radius: 7rpx 30rpx 0 0;
		text-align: center;
		line-height: 80rpx;
	}
	.order-submission .allAddress .nav .item:nth-of-type(2).on::before {
		content: "到店核销";
		border-width: 0 0 80rpx 20rpx;
		border-radius: 30rpx 7rpx 0 0;
	}
	.order-submission .allAddress .nav .item.on2 {
		position: relative;
	}
	.order-submission .allAddress .nav .item.on2::before {
		position: absolute;
		bottom: 0;
		content: "到店核销";
		font-size: 28rpx;
		display: block;
		height: 0;
		width: 400rpx;
		border-width: 0 0 60rpx 60rpx;
		border-style: none solid solid;
		border-color: transparent transparent #f7c1bd;
		border-radius: 40rpx 6rpx 0 0;
		text-align: center;
		line-height: 60rpx;
	}
	.order-submission .allAddress .nav .item:nth-of-type(1).on2::before {
		content: "快递配送";
		border-width: 0 60rpx 60rpx 0;
		border-radius: 6rpx 40rpx 0 0;
	}
	.order-submission .allAddress .address {
		height: 150rpx;
		margin: 0 auto;
	}
	.order-submission .allAddress .line {
		margin: 0 auto;
	}
	.order-submission .wrapper .item .discount .placeholder {
		color: #ccc;
		text-align: right;
	}
	.order-submission .wrapper {
		margin-bottom: 12rpx;
		background-color: #fff;
	}
	.order-submission .wrapper .item {
		padding: 27rpx 30rpx;
		font-size: 30rpx;
		color: #282828;
	}
	.order-submission .virtual_form{
		padding: 0 30rpx;
	}
	/deep/.order-submission .virtual_form .uni-input-wrapper {
		text-align: right;
	}
	
	.order-submission .virtual_form .item-require{
		color: red;
		margin-right: 4rpx;
	}
	.order-submission .virtual_form .item{
		border-bottom: 1rpx solid #EEEEEE;
		padding: 27rpx 0;
	}
	.upload {
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-lines: multiple;
		-moz-box-lines: multiple;
		-o-box-lines: multiple;
		-webkit-flex-wrap: wrap;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
	}
	.order-submission .virtual_form .pictrue {
		width: 156rpx;
		height: 156rpx;
		margin: 24rpx 20rpx 0 0;
		position: relative;
		font-size: 11px;
		color: #bbb;
		border-radius: 3rpx;
		&:nth-child(4n) {
			margin-right: 0;
		}
		&:nth-last-child(1) {
			border: 0.5px solid #ddd;
			box-sizing: border-box;
		}
		uni-image,
		image {
			width: 100%;
			height: 100%;
			border-radius: 1px;
			img {
				-webkit-touch-callout: none;
				-webkit-user-select: none;
				-moz-user-select: none;
				display: block;
				position: absolute;
				top: 0;
				left: 0;
				opacity: 0;
				width: 100%;
				height: 100%;
			}
		}
		.icon-guanbi4 {
			color: #fff;
			font-size: 14rpx;
			position: absolute;
			top: 0;
			right: 0;
			width: 30rpx;
			height: 30rpx;
			text-align: center;
			line-height: 30rpx;
			border-radius: 0 8rpx 0 8rpx;
			background: rgba(0,0,0,.6);
		}
	}
	.vipImg {
		width: 65rpx;
		height: 28rpx;
		margin-left: 4rpx;
		image {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
	.order-submission .wrapper .item .discount {
		font-size: 30rpx;
		color: #999;
		&.discount_voice {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			width: 500rpx;
			text-align: right;
		}
	}
	.order-submission .wrapper .item .discount .iconfont {
		color: #515151;
		font-size: 30rpx;
		margin-left: 15rpx;
	}
	.order-submission .wrapper .item .discount .num {
		font-size: 32rpx;
		margin-right: 20rpx;
	}
	.order-submission .wrapper .item .shipping {
		font-size: 30rpx;
		color: #999;
		position: relative;
		padding-right: 58rpx;
	}
	.order-submission .wrapper .item .shipping .iconfont {
		font-size: 35rpx;
		color: #707070;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		margin-left: 30rpx;
	}
	.order-submission .wrapper .item input {
		flex: 1;
		height: 100%;
		margin-left: 20rpx;
		text-align: right;
	}
	.order-submission .wrapper .item .placeholder {
		color: #ccc;
	}
	.order-submission .wrapper .item .list {
		margin-top: 35rpx;
	}
	.order-submission .wrapper .item .list .payItem {
		border: 1px solid #eee;
		border-radius: 6rpx;
		height: 86rpx;
		width: 100%;
		box-sizing: border-box;
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #282828;
	}
	.order-submission .wrapper .item .list .payItem.on {
		border-color: var(--view-theme);
		color: var(--view-theme);
	}
	.order-submission .wrapper .item .list .payItem .name {
		width: 50%;
		text-align: center;
		border-right: 1px solid #eee;
		justify-content: left;
		padding-left: 80rpx;
	}
	.order-submission .wrapper .item .list .payItem .name .iconfont {
		width: 44rpx;
		height: 44rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 44rpx;
		background-color: #fe960f;
		color: #fff;
		font-size: 30rpx;
		margin-right: 15rpx;
	}
	.order-submission .wrapper .item .list .payItem .name .iconfont.icon-weixin2 {
		background-color: #41b035;
	}
	.order-submission .wrapper .item .list .payItem .name .iconfont.icon-icon34 {
		background-color: #4295D5;
	}
	.order-submission .wrapper .item .list .payItem .tip {
		width: 49%;
		text-align: center;
		font-size: 26rpx;
		color: #aaa;
	}
	.order-submission .moneyList {
		margin-top: 12rpx;
		background-color: #fff;
		padding: 30rpx;
	}
	.order-submission .moneyList .item {
		font-size: 28rpx;
		color: #282828;
	}
	.order-submission .moneyList .item~.item {
		margin-top: 20rpx;
	}
	.order-submission .moneyList .item .money {
		color: #868686;
		display: flex;
		align-items: center;
	}
	.order-submission .footer {
		width: 100%;
		height: 100rpx;
		height: calc(100rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		height: calc(100rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		background-color: #fff;
		padding: 0 30rpx;
		font-size: 28rpx;
		color: #333;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 30;
		.footer_count{
			font-size: 28rpx;
		}
		.coupon_price{
			color: #999999;
			font-size: 20rpx;
			margin-top: 10rpx;
			text{
				color: #282828;
				padding: 2rpx 10rpx;
				background: #F5F5F5;
				border-radius: 26rpx;
				margin-left: 20rpx;
				line-height: 30rpx;
				height: 30rpx;
				display: inline-block;
			}
		}
	}
	.pColor{
		color: var(--view-priceColor);
	}
	.order-submission .footer .settlement {
		font-size: 30rpx;
		color: #fff;
		width: 240rpx;
		height: 70rpx;
		background-color: var(--view-theme);
		border-radius: 50rpx;
		text-align: center;
		line-height: 70rpx;
		&.disabled {
			background-color: #cccccc;
		}
	}
	.footer .transparent {
		opacity: 0
	}
	.event_bg {
		background: #FF7F00;
	}
	.event_color {
		color: #FF7F00;
	}
	.color_red {
		color: var(--view-theme);
	}
	.storeinfo-wrapper {
		.store-item {
			margin-top: 12rpx;
			background-color: #fff;
			.store-title {
				display: flex;
				align-items: center;
				padding: 28rpx 30rpx;
				.icon-shangjiadingdan {
					font-size: 32rpx;
				}
				.icon-xiangyou {
					font-size: 26rpx;
					color: #999;
				}
				.txt {
					margin: 0 8rpx;
				}
			}
			.product-item {
				display: flex;
				padding: 25rpx 30rpx;
				border-top: 1px solid #F0F0F0;
				.img-box {
					width: 130rpx;
					height: 130rpx;

					image {
						width: 130rpx;
						height: 130rpx;
						border-radius: 16rpx;
					}
				}
				.content {
					position: relative;
					width: 550rpx;
					margin-left: 30rpx;
					font-size: 28rpx;
					color: #282828;
					overflow: hidden;
					&.event_content {
						.line1 {
							width: 360rpx;
						}
						.price {
							position: absolute;
							top: 0;
							right: 0;
							margin-top: 0;

							text {
								display: block;
								text-align: right;
							}
						}
					}
					.event_name {
						display: inline-block;
						margin-right: 9rpx;
						color: #fff;
						font-size: 20rpx;
						padding: 0 8rpx;
						line-height: 30rpx;
						text-align: center;
						border-radius: 6rpx;
					}
					.event_ship {
						font-size: 20rpx;
						margin-top: 10rpx;
					}
					.label {
						margin-top: 10rpx;
						color: #868686;
						font-size: 20rpx;
					}
					.price {
						margin-top: 20rpx;
						color: var(--view-priceColor);
						position: relative;
						text {
							margin-left: 10rpx;
							color: #999;
						}
						.delivery_type{
							float: right;
							text{
								color: var(--view-priceColor);
								font-size: 20rpx;
							}
							
						}
					}
					.err-txt {
						display: flex;
						align-items: center;
						margin-top: 18rpx;
						color: $theme-color;
						.iconfont {
							margin-right: 10rpx;
						}
					}
					.step {
						position: absolute;
						right: 0;
						top: 100rpx;
						display: flex;
						align-items: center;
						.min {
							width: 50rpx;
							height: 40rpx;
							background-image: url('~@/static/images/min.png');
							background-size: 17rpx 17rpx;
							background-position: center;
							background-repeat: no-repeat;
						}
						.num-box {
							width: 68rpx;
							height: 40rpx;
							line-height: 40rpx;
							text-align: center;
							background: #F2F2F2;
							font-size: 23rpx;
						}
						.add {
							width: 50rpx;
							height: 40rpx;
							background-image: url('~@/static/images/add.png');
							background-size: 17rpx 17rpx;
							background-position: center;
							background-repeat: no-repeat;
						}
					}
				}
			}
		}
		.event_payTime {
			padding: 0 30rpx 24rpx;
			.event_progress {
				margin-top: 50rpx;
				position: relative;
			}
			.progress_step {
				height: 80rpx;
				position: relative;
				padding-left: 60rpx;
				&::before {
					content: '';
					display: block;
					width: 2rpx;
					height: 40rpx;
					background: var(--view-theme);
					position: absolute;
					left: 35rpx;
					top: 18rpx;
				}
				&:nth-child(2) {
					&::before {
						bottom: 64rpx;
						top: auto;
						background: #EFEFEF;
					}
					&::after {

						background: #EFEFEF;
					}
				}
				&::after {
					content: '';
					display: block;
					width: 14rpx;
					height: 14rpx;
					background: var(--view-theme);
					border-radius: 50%;
					position: absolute;
					top: 10rpx;
					left: 29rpx;
				}
				.name {
					float: left;
					color: #282828;

					&.color_red {
						color: var(--view-theme);
					}
				}
				.price {
					float: right;
					color: #282828;

					&.color_red {
						color: var(--view-priceColor);
					}
				}
			}
			.progress_pay {
				padding-left: 60rpx;
				font-size: 24rpx;
				color: #868686;
				margin-top: -34rpx;
			}
		}
	}
	.integral_checked {
		margin-left: 10rpx;
		display: inline;
		.iconfont{
			font-size: 38rpx;
		}
		.icon-weixuanzhong {
			color: #BFBFBF;
		}
		.icon-xuanzhong1 {
			color: var(--view-theme);
		}
	}
	uni-checkbox-group,
	.checkgroup {
		width: 100%;
		.checkbox {
			float: right;
		}
	}
	.icon-wenhao1 {
		color: #868686;
		margin-right: 6rpx;
	}
	.total {
		display: flex;
		justify-content: flex-end;
		padding-right: 30rpx;
		padding-bottom: 30rpx;
		font-size: 26rpx;
		color: #282828;
		.price {
			margin-left: 10rpx;
			color: var(--view-priceColor);
			font-size: 28rpx;
			font-weight: bold;
			text {
				font-size: 20rpx;
			}
		}
	}
	.store-address {
		padding: 30rpx 23rpx;
		margin: 0 30rpx;
		background: #F6F6F6;
		border-radius: 8rpx;
		font-size: 24rpx;
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		/*垂直居中*/
		-webkit-box-align: center;
		/*旧版本*/
		-moz-box-align: center;
		/*旧版本*/
		-ms-flex-align: center;
		/*混合版本*/
		-webkit-align-items: center;
		/*新版本*/
		align-items: center;
		/*新版本*/
		.name {
			width: 148rpx;
			margin-right: 20rpx;
		}
		.info {
			flex: 1;
		}
		.map {
			text-align: center;
			padding-left: 40rpx;
			position: relative;
			&::before {
				content: '';
				display: inline-block;
				width: 2rpx;
				height: 42rpx;
				background-color: #DDDDDD;
				position: absolute;
				left: 0;
				top: 18rpx;
			}
			.iconfont {
				color: var(--view-theme);
			}
			.map_text {
				color: var(--view-theme);
			}
		}
	}
	.settlementAgreement {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		z-index: 40;
	}
	.settlementAgreement .setAgCount {
		background: #fff;
		width: 656rpx;
		height: 458px;
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: 12rpx;
		-webkit-border-radius: 12rpx;
		padding: 52rpx;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		overflow: hidden;
		.content {
			height: 900rpx;
			overflow-y: scroll;
			/deep/ p {
				font-size: 13px;
				line-height: 22px;
			}
			/deep/ img {
				max-width: 100%;
			}
		}
	}
	.settlementAgreement .setAgCount .icon {
		font-size: 42rpx;
		color: #b4b1b4;
		position: absolute;
		top: 15rpx;
		right: 15rpx;
	}
	.settlementAgreement .setAgCount .title {
		color: #333;
		font-size: 32rpx;
		text-align: center;
		font-weight: bold;
	}
	.settlementAgreement .setAgCount .content {
		margin-top: 32rpx;
		color: #333;
		font-size: 26rpx;
		line-height: 22px;
		text-align: justify;
		text-justify: distribute-all-lines;
		height: 756rpx;
		overflow-y: scroll;
	}
</style>
