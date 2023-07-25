<template>
	<view :style="viewColor">
		<view class='order-details'>
			<!-- 给header上与data上加on为退款订单-->
			<!--预售-->
			<view v-if="orderInfo.activity_type == 2 && (orderInfo.status == 10 || orderInfo.status == 11)">
				<view class='header presell_header' :style="{ 'background-image': `url(${imgUrl}/static/diy/presell_bg${keyColor}.jpg)`}"  :class="'header'+keyColor">
					<view class="presell_payment">
						<text class="iconfont icon-shijian1"></text>
						{{ orderInfo.status == 11 ? '交易已关闭' : '待付尾款' }}
					</view>
					<view class='data' style="margin-left: 0;">
						<view class='state'>请在{{orderInfo.orderProduct[0].cart_info.productPresell.final_end_time}}前完成支付,超时订单将自动取消</view>
					</view>
				</view>
			</view>
			<view v-else>
				<view class='header acea-row row-middle' :class='isGoodsReturn ? "on":""'>
					<view class='pictrue' v-if="isGoodsReturn==false">
						<image v-if="orderInfo.status != 9" :src="imgUrl+'/static/order_'+(orderInfo.status+2)+'.gif'"></image>
						<image v-else :src="imgUrl+'/static/order_2.gif'"></image>
					</view>
					<view class='data' :class='isGoodsReturn ? "on":""'>
						<view class='state'>
							<block v-if="orderInfo.status == 0  && orderInfo.order_type != 1">待发货</block>
							<block v-if="orderInfo.status == 9">等待其他人参加拼团</block>
							<block v-if="orderInfo.status == 0 && orderInfo.order_type == 1">待核销</block>
							<block v-if="orderInfo.status == 1">{{orderInfo.is_virtual == 1 ? '服务商品已虚拟发货' : '待收货'}}</block>
							<block v-if="orderInfo.status == 2">待评价</block>
							<block v-if="orderInfo.status == 3">已完成</block>
							<block v-if="orderInfo.status == -1">已为您退款,感谢您的支持</block>
						</view>
						<view>{{orderInfo.pay_time}}</view>
					</view>
				</view>
				<block v-if="isGoodsReturn==false">
					<view class='nav'>
						<view class='navCon acea-row row-between-wrapper'>
							<view>待付款</view>
							<view :class="(orderInfo.status == 0 || orderInfo.status == 9) ? 'on':''" v-if="orderInfo.order_type != 1">待发货</view>
							<view :class="(orderInfo.status == 0 || orderInfo.status == 9) ? 'on':''" v-if="orderInfo.order_type == 1">待核销</view>
							<view :class="orderInfo.status == 1 ? 'on':''" v-if="orderInfo.order_type != 1">待收货</view>
							<view :class="orderInfo.status == 2 ? 'on':''">待评价</view>
							<view :class="orderInfo.status == 3 ? 'on':''">已完成</view>
						</view>
						<view class='progress acea-row row-between-wrapper'>
							<view class='iconfont icon-yuandianxiao t-color'></view>
							<view class='line b-color'></view>
							<view class='iconfont' :class='((orderInfo.status == 0 || orderInfo.status == 9) ? "icon-webicon318":"icon-yuandianxiao") + " " + (orderInfo.status >= 0 ? "t-color":"")'></view>
							<view class='line' :class='orderInfo.status > 0 && orderInfo.status != 9 ? "b-color":""'></view>
							<view class='iconfont' :class='(orderInfo.status == 1 ? "icon-webicon318":"icon-yuandianxiao") + " " +(orderInfo.status >= 1 && orderInfo.status != 9 ? "t-color":"")'  v-if="orderInfo.order_type == 0"></view>
							<view class='line' :class='orderInfo.status > 1 && orderInfo.status != 9 ? "b-color":""'  v-if="orderInfo.order_type == 0"></view>
							<view class='iconfont' :class='(orderInfo.status == 2 && orderInfo.status != 9 ? "icon-webicon318":"icon-yuandianxiao") + " " + (orderInfo.status >= 2 && orderInfo.status != 9 ? "t-color":"")'></view>
							<view class='line' :class='orderInfo.status > 2 && orderInfo.status != 9 ? "b-color":""'></view>
							<view class='iconfont' :class='(orderInfo.status == 3 ? "icon-webicon318":"icon-yuandianxiao") + " " + (orderInfo.status >= 3 && orderInfo.status != 9 ? "t-color":"")'></view>
						</view>
					</view>
					<view class='line'>
						<image :src="`${imgUrl}/static/images/line.jpg`"></image>
					</view>
				</block>
			</view>
			<view>
				<!-- 配送地址 -->
				<view class='address' v-if="orderInfo.order_type == 0 && orderInfo.is_virtual != 1">
					<view class='name'>{{orderInfo.real_name}}<view class='phone'>{{orderInfo.user_phone}}</view></view>
					<view>{{orderInfo.user_address}}</view>
				</view>
				<!-- 地图 -->
				<view class="map acea-row row-between-wrapper" v-if="orderInfo.order_type == 1">
					<view>自提地址信息</view>
					<view class="place t-color acea-row row-center-wrapper" @tap="showMaoLocation">
						<text class="iconfont icon-weizhi"></text>查看位置
					</view>
				</view>
				<view class='address' v-if="orderInfo.order_type == 1" style="margin-top: 0;">
					<view class='name'>
						{{orderInfo.take.mer_take_name}}
						<text class='phone' @click="makePhone">{{orderInfo.take.mer_take_phone}}</text>
						<text class="iconfont icon-tonghua t-color" @click="makePhone"></text>
					</view>
					<view class="line2">{{orderInfo.take.mer_take_address}}</view>
				</view>
				<view v-if="orderInfo.take" class="take-info">
					<view class="take-msg">
						<view class="left">
							<view class="title">
								营业时间
							</view>
							<view class="text">
								<text v-if="orderInfo.take.mer_take_day && orderInfo.take.mer_take_day.length == 7">周一至周日：</text>
								<block v-else>
									<text v-for="item in orderInfo.take.mer_take_day">{{'周'+ toChinese(item)}},</text>
								</block>
								<text class="time" v-if="orderInfo.take.mer_take_time">{{orderInfo.take.mer_take_time[0]}}-{{orderInfo.take.mer_take_time[1]}}</text>
							</view>
						</view>
						<view class="code" @click="showCode">
							<text class="iconfont icon-hexiaoma"></text>
							<view class="text">
								自提码
							</view>
						</view>
					</view>
				</view>
				<view class="merchant" v-if="orderInfo.merchant && orderInfo.order_type != 1" @click="goStore(orderInfo.mer_id)">
					{{orderInfo.merchant.mer_name}}
					<text class="iconfont icon-xiangyou"></text>
				</view>
				<block v-if="cartInfo.length>0">
					<orderGoods :orderData='orderInfo' :evaluate='orderInfo.status' :activityType='orderInfo.activity_type' :orderId="order_id" :cartInfo="cartInfo" :jump="true"></orderGoods>
					<block v-if="orderInfo.order_type == 1 && orderInfo.takeOrderList && orderInfo.takeOrderList.length > 0" v-for="(item,index) in orderInfo.takeOrderList" :key="index">
						<orderGoods :orderData='item' :evaluate='item.status' :activityType='item.activity_type' :orderId="item.order_id" :cartInfo="item.orderProduct" :jump="true"></orderGoods>
					</block>
				</block>
				<div v-if="orderInfo.merchant && orderInfo.merchant.services_type == 1" class="goodCall" @click="call">
					<text class="iconfont icon-kefu"></text><text style="font-size: 28rpx;">联系客服</text>
				</div>
				<div v-else class="goodCall" @click="goGoodCall">
					<text class="iconfont icon-kefu"></text><text style="font-size: 28rpx;">联系客服</text>
				</div>
				<!--卡密商品发货-->
				<view v-if="orderInfo.delivery_type == 6 && orderInfo.delivery_id" class='wrapper'>
					<view class='item acea-row row-between'>
						<view>卡密发货：</view>
						<view class="item acea-row">
							<view class="conter">
								<!-- #ifndef H5 -->
								<text class='copy' @tap='copyKm'>复制</text>
								<!-- #endif -->
								<!-- #ifdef H5 -->
								<text class='copy copy-data' :data-clipboard-text="orderInfo.delivery_id">复制</text>
								<!-- #endif -->
							</view>
						</view>
					</view>
					<view class="item acea-row">
						<view style="color:#868686;">卡密已自动发放 <view>{{orderInfo.delivery_id}}</view></view>
					</view>
				</view>
				<!-- 送货 -->
				<view class="wrapper" v-if="orderInfo.delivery_type == 2">
					<view class='item acea-row row-between'>
						<view>配送方式：</view>
						<view class='conter'>送货</view>
					</view>
					<view class='item acea-row row-between'>
						<view>配送员：</view>
						<view class='conter'>{{orderInfo.delivery_name}}</view>
					</view>
					<view class='item acea-row row-between'>
						<view>联系电话：</view>
						<view class='conter'>{{orderInfo.delivery_id}}</view>
					</view>
				</view>
				<!-- 同城配送 -->
				<view v-if="orderInfo.delivery_type == 5" class="wrapper">
					<view class='item virtual_item'>
						<view class="acea-row virtual_row">
							<view>
								<image :src="`${imgUrl}/static/images/delivery_man.png`"></image>
							</view>
							<view v-if="orderInfo.delivery_id" class="virtual_delivery">
								<view>{{orderInfo.delivery_name}}</view>
								<view>{{orderInfo.delivery_id}}</view>
							</view>
							<view v-else class="virtual_delivery_not">配送员未接单</view>
						</view>
						<navigator class="virtual_detail" hover-class="none"
						:url="'/pages/order_details/delivery?orderId=' + orderInfo.order_id">查看详情</navigator>
					</view>
				</view>
				<view v-if="orderInfo.remark" class="wrapper">
					<view class="item acea-row row-between">
						<view class="">发货备注：</view>
						<view class="conter remark">{{ orderInfo.remark }}</view>
					</view>
				</view>
				<view class='wrapper'>
					<view class='item acea-row row-between'>
						<view>订单编号：</view>
						<view class='conter acea-row row-middle row-right'>{{orderInfo.order_sn}}
							<!-- #ifndef H5 -->
							<text class='copy' @tap='copy'>复制</text>
							<!-- #endif -->
							<!-- #ifdef H5 -->
							<text class='copy copy-data' :data-clipboard-text="orderInfo.order_sn">复制</text>
							<!-- #endif -->
						</view>
					</view>
					<view class='item acea-row row-between'>
						<view>下单时间：</view>
						<view class='conter'>{{orderInfo.create_time}}</view>
					</view>
					<view class='item acea-row row-between'>
						<view>支付状态：</view>
						<view class='conter'>已支付</view>
					</view>
					<view class='item acea-row row-between' v-if="orderInfo.pay_time">
						<view>支付时间：</view>
						<view class='conter'>{{orderInfo.pay_time}}</view>
					</view>
					<view class='item acea-row row-between'>
						<view>商品总额：</view>
						<view class='conter'>￥{{orderInfo.total_price}}</view>
					</view>
					<view class='item acea-row row-between'>
						<view>支付方式：</view>
						<view class='conter' v-if="orderInfo.pay_type==0">余额支付</view>
						<view class='conter' v-if="orderInfo.pay_type==4 || orderInfo.pay_type==5">支付宝支付</view>
						<view class='conter' v-if="orderInfo.pay_type==1 || orderInfo.pay_type==2 || orderInfo.pay_type==3">微信支付</view>
					</view>
					<view class='item acea-row row-between' v-if="orderInfo.mark">
						<view>买家留言：</view>
						<view class='conter'>{{orderInfo.mark}}</view>
					</view>
				</view>
			</view>
			<view v-if="orderInfo.is_virtual == 1 && orderInfo.order_extend" class='wrapper'>
				<view v-for="(item,index) in orderInfo.order_extend" v-if="item" :key="index" class='item acea-row row-between'>
					<view>{{index}}：</view>
					<view v-if="!Array.isArray(item)" class='conter'>{{item}}</view>
					<view v-else class='conter virtual_image'>
						<image v-for="(pic,i) in item" :key="i" class="picture" :src="pic" @click="getPhotoClickIdx(item,i)"></image>
					</view>
				</view>
			</view>
			<view class='wrapper'>
				<view class='item acea-row row-between' v-if="orderInfo.pay_postage > 0 && orderInfo.order_type != 1">
					<view>运费：</view>
					<view class='conter'>+￥{{orderInfo.pay_postage}}</view>
				</view>
				<view class='item acea-row row-between' v-if='orderInfo.coupon_price > 0'>
					<view>优惠券抵扣：</view>
					<view class='conter'>-￥{{orderInfo.coupon_price}}</view>
				</view>
				<view class='item acea-row row-between' v-if='orderInfo.integral'>
					<view>积分抵扣：</view>
					<view class='conter'>-￥{{orderInfo.integral_price}}</view>
				</view>
				<view class='item acea-row row-between' v-if="orderInfo.activity_type == 2">
					<view>实付款：</view>
					<view class='conter'>￥{{orderInfo.presell_price}}</view>
				</view>
				<view class='item acea-row row-between' v-else>
					<view>实付款：</view>
					<view class='conter'>￥{{orderInfo.pay_price}}</view>
				</view>
			</view>
			<view class="content-clip" v-if="isGoodsReturn==false && (orderInfo.status != 0 || (orderInfo.status == 0 && refundNum.length != cartInfo.length && orderInfo.refund_status && orderInfo.refund_switch))"></view>
			<view class='footer acea-row row-right row-middle' v-if="isGoodsReturn==false && orderInfo.status != 0">
				<view v-if="!orderInfo.receipt && !isGoodsReturn && orderInfo.open_receipt == 1" class='bnt cancel' @click="applyInvoice">申请开票</view>
				<view v-if="orderInfo.activity_type == 2 && (orderInfo.status == 10 || orderInfo.status == 11)" class=" acea-row row-right row-middle">
					<view v-if="orderInfo.presellOrder.activeStatus == 0" class='bnt b-color btn_auto'>{{ orderInfo.presellOrder.final_start_time | filterDay }} 付尾款</view>
					<view v-if="orderInfo.presellOrder.activeStatus == 1" class='bnt b-color' @tap='pay_open'>立即付款</view>
					<view v-if="orderInfo.presellOrder.activeStatus == 2" class='bnt cancel' @click="cancelOrder">取消订单</view>
				</view>
				<block v-if="orderInfo.status == 9">
					<view class="bnt cancel" @click="getCombinationRemove">取消拼团</view>
				</block>
				<view class='bnt b-color' v-if="orderInfo.activity_type==4" @tap='goJoinPink'>查看拼团</view>
				<block v-if="orderInfo.status == 1">
					<view class="bnt cancel" @click="allRefund" v-if="refundNum.length != cartInfo.length && orderInfo.refund_status && orderInfo.refund_switch == 1">批量退款</view>
					<navigator v-if="orderInfo.delivery_type == 1 || orderInfo.delivery_type == 4" class='bnt cancel' hover-class='none' :url="'/pages/users/goods_logistics/index?orderId='+ orderInfo.order_id">查看物流</navigator>
					<view class='bnt b-color' @tap='confirmOrder'>确认收货</view>
				</block>
				<block v-if="orderInfo.status == 2">
					<view class="bnt cancel" @click="allRefund" v-if="refundNum.length != cartInfo.length && orderInfo.refund_status && orderInfo.refund_switch == 1">批量退款</view>
					<navigator v-if="orderInfo.delivery_type == 1 || orderInfo.delivery_type == 4" class='bnt cancel' hover-class='none' :url="'/pages/users/goods_logistics/index?orderId='+ orderInfo.order_id">查看物流</navigator>
					<view class='bnt b-color' @click="goOrderConfirm" v-if="orderInfo.activity_type!=1 && orderInfo.activity_type!=2 && orderInfo.activity_type!=3 &&orderInfo.activity_type!=4 && orderInfo.activity_type!=10">再次购买</view>
				</block>
				<block v-if="orderInfo.status == 3">
					<view class='bnt cancel' @click="delOrder">删除订单</view>
					<view class="bnt cancel" @click="allRefund" v-if="refundNum.length != cartInfo.length && orderInfo.refund_status && orderInfo.refund_switch == 1">批量退款</view>
					<view class='bnt b-color' @click="goOrderConfirm" v-if="orderInfo.activity_type!=1 && orderInfo.activity_type!=2 && orderInfo.activity_type!=3 && orderInfo.activity_type!=4 && orderInfo.activity_type!=10">再次购买</view>
				</block>
			</view>
			<view class='footer acea-row row-right row-middle' v-if="isGoodsReturn==false && orderInfo.status == 0 && refundNum.length != cartInfo.length && orderInfo.refund_status && orderInfo.refund_switch">
				<view class="bnt cancel" @click="allRefund">批量退款</view>
			</view>
		</view>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<payment :payMode='payMode' :pay_close="pay_close" @onChangeFun='onChangeFun' :order_id="pay_order_id" :totalPrice='totalPrice' :order_type='1'></payment>
		<addInvoicing ref="addInvoicing" @changeInvoiceClose="changeInvoiceClose" :invoice='invoice'></addInvoicing>
		<!--核销码弹窗-->
		<uni-popup ref="cancellPoupon" type="bottom">
			<view class="code-content">
				<text class="iconfont icon-guanbi5" @click="close"></text>
				<view class="title">核销码</view>
				<view class="trip">
					请将二维码展示给店员 或 提供数字核销码
				</view>
				<view class="grayBg">
					<view class="pictrue">
						<image :src="codeUrl"></image>
					</view>
				</view>
				<view class="num">{{orderInfo.verify_code}}</view>
			</view>
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
	let app = getApp();
	import { HTTP_REQUEST_URL } from '@/config/app';
	import {
		getOrderDetail,
		orderAgain,
		orderTake,
		orderDel,
		unOrderCancel,
		verifyCode,
		applyInvoiceApi
	} from '@/api/order.js';
	import { postCombinationRemove } from '@/api/activity';
	import { openOrderRefundSubscribe } from '@/utils/SubscribeMessage.js';
	import { getUserInfo } from '@/api/user.js';
	import payment from '@/components/payment';
	import orderGoods from "@/components/orderGoods";
	import ClipboardJS from "@/plugin/clipboard/clipboard.js";
	import { mapGetters } from "vuex";
	import { configMap } from "@/utils";
	import authorize from '@/components/Authorize';
	import addInvoicing from '@/components/addInvoicing';
	import zbCode from '@/components/zb-code/zb-code.vue';
	export default {
		components: {
			payment,
			orderGoods,
			authorize,
			addInvoicing,
			zbCode
		},
		data() {
			return {
				order_id: '',
				evaluate: 0,
				activityType: 0,
				cartInfo: [], //购物车产品
				orderInfo: {
					system_store: {},
					_status: {},
					take: {}
				}, //订单详情
				system_store: {},
				isGoodsReturn: false, //是否为退款订单
				status: {}, //订单底部按钮状态
				isClose: false,
				payMode: [{
						name: "微信支付",
						icon: "icon-weixinzhifu",
						value: 'wechat',
						title: '微信快捷支付',
						payStatus: 1
					},
					{
						name: "支付宝支付",
						icon: "icon-zhifubao",
						value: 'alipay',
						title: '支付宝支付',
						payStatus: this.alipay_open
					},
					{
						name: "余额支付",
						icon: "icon-yuezhifu",
						value: 'balance',
						title: '可用余额:',
						number: 0,
						payStatus: this.yue_pay_status
					}
				],
				pay_close: false,
				pay_order_id: '',
				totalPrice: '0',
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				refundNum: [], //退款个数临时数据
				imgUrl:HTTP_REQUEST_URL,
				codeUrl:'',
				isTimePay: false,
				codeShow: false,
				cid: '1',
				val: "", // 要生成的二维码值
				size: 200, // 二维码大小
				unit: 'upx', // 单位
				background: '#FFF', // 背景色
				foreground: '#000', // 前景色
				pdground: '#32dbc6', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64
				codeSrc: "",
				wd: 225,
				hg: 500,
				invoice: {
					invoice: false,
					add: false,
				}
			};
		},
		computed:{
			...configMap({hide_mer_status:0,yue_pay_status:0,alipay_open:0},
			mapGetters(['isLogin','uid','viewColor','keyColor'])),
		},
		filters:{
			filterDay(val){
				if(val){
					var reg =/(\d{4})\-(\d{2})\-(\d{2})/;
					var date = val.replace(reg,"$2月$3日");
					return date
				}
			}
		},
		onLoad: function(options) {
			if (options.order_id) {
				this.$set(this, 'order_id', options.order_id);
			}
		},
		onShow() {
			if (this.isLogin) {
				this.getOrderInfo();
				this.getUserInfo();
				this.isPayBalance();
			} else {
				this.isAuto = true;
				this.isShowAuth = true
			}
		},
		onHide: function() {
			this.isClose = true;
		},
		onReady: function() {
			// #ifdef H5
			this.$nextTick(function() {
				const clipboard = new ClipboardJS(".copy-data");
				clipboard.on("success", () => {
					this.$util.Tips({
						title: '复制成功'
					});
				});
			});
			// #endif
		},
		mounted: function() {},
		methods: {
			// 图片预览
			getPhotoClickIdx(list, idx) {
				uni.previewImage({
					current: list[idx], //  传 Number H5端出现不兼容
					urls: list
				});
			},
			// 判断是否到支付尾款时间
			isPayBalance(){
				let that = this;
				if(that.orderInfo.status === 10){
					if(new Date() < new Date(that.orderInfo.presellOrder.final_start_time)){
						that.isTimePay = false; //未开始
					}else if((new Date() >= new Date(that.orderInfo.presellOrder.final_start_time)) && (new Date() <= new Date(that.orderInfo.presellOrder.final_start_time)) ){
						that.isTimePay = true; //立即支付
					}
				}
			},
			// 数字转汉字
			toChinese(num){
				let changeNum = ['零', '一', '二', '三', '四', '五', '六', '日', '八', '九'];
				let unit = ["", "十", "百", "千", "万"];
				num = parseInt(num);
				let getWan = (temp) => {
				　　let strArr = temp.toString().split("").reverse();
				　　let newNum = "";
				　　for (var i = 0; i < strArr.length; i++) {
					　　newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
				　　}
				 　 return newNum;
			 }
			 let overWan = Math.floor(num / 10000);
			 let noWan = num % 10000;
			 if (noWan.toString().length < 4) {　　　　　　noWan = "0" + noWan;　　　 }
			 return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
			},
			// 返回店铺首页
			goStore(mer_id){
				if(this.hide_mer_status != 1){
					uni.navigateTo({
						url: '/pages/store/home/index?id=' + mer_id
					})
				}
			},
			// 批量退款
			allRefund() {
				// #ifdef MP
				openOrderRefundSubscribe().then(() => {
					uni.hideLoading();
					if (this.orderInfo.status == 0 || this.orderInfo.is_virtual != 0) {
						uni.navigateTo({
							url: '/pages/users/refund/index?order_id=' + this.order_id + '&refund_type=1&type=2&order_type='+this.orderInfo.order_type
						})
					} else {
						uni.navigateTo({
							url: '/pages/users/refund/select?order_id=' + this.order_id + '&type=2&order_type='+this.orderInfo.order_type
						})
					}
				}).catch(() => {
					uni.hideLoading();
				})
				// #endif
				// #ifdef H5 || APP-PLUS
				if (this.orderInfo.status == 0 || this.orderInfo.is_virtual != 0) {
					uni.navigateTo({
						url: '/pages/users/refund/index?order_id=' + this.order_id + '&refund_type=1&type=2&order_type='+this.orderInfo.order_type
					})
				} else {
					uni.navigateTo({
						url: '/pages/users/refund/select?order_id=' + this.order_id + '&type=2&order_type='+this.orderInfo.order_type
					})
				}
				// #endif
			},
			//拼团取消
			getCombinationRemove: function() {
				var that = this;
				postCombinationRemove({
					group_buying_id: that.orderInfo.orderProduct[0].activity_id
					})
					.then(res => {
						that.$util.Tips({
							title: res.message
						}, {
							tab: 3
						});
					})
					.catch(res => {
						that.$util.Tips({
							title: res.message
						});
					});
			},
			// 取消售后
			cancelSales(){
				let that = this;
				uni.showModal({
				  content: '确定要取消售后？',
				  success: function(res) {
				    if(res.confirm) {
				      deletePlantApi(that.id).then(res => {
				      	if (res.status === 200) {
				      		that.$util.Tips({
				      			title: res.message
				      		});								
								}
				      })
				    } else if(res.cancel) {
				      console.log('用户点击取消');
				    }
				  }
				});
			},
			// 联系客服
			goGoodCall() {
				let self = this
				uni.navigateTo({
					url: `/pages/chat/customer_list/chat?mer_id=${self.orderInfo.mer_id}&uid=${this.uid}&order_id=${this.order_id}`
				})
			},
			openSubcribe: function(e) {
				let page = e;
				uni.showLoading({
					title: '正在加载',
				})
				openOrderRefundSubscribe().then(res => {
					uni.hideLoading();
					uni.navigateTo({
						url: page,
					});
				}).catch(() => {
					uni.hideLoading();
				});
			},
			/**
			 * 事件回调
			 *
			 */
			onChangeFun: function(e) {
				let opt = e;
				let action = opt.action || null;
				let value = opt.value != undefined ? opt.value : null;
				(action && this[action]) && this[action](value);
			},
			/**
			 * 拨打电话
			 */
			makePhone: function() {
				uni.makePhoneCall({
					phoneNumber: this.orderInfo.take.mer_take_phone
				})
			},
			/**
			 * 拨打电话
			 */
			call: function() {
				uni.makePhoneCall({
					phoneNumber: this.orderInfo.merchant.service_phone
				})
			},
			/**
			 * 打开地图
			 *
			 */
			showMaoLocation: function() {
				if (!this.orderInfo.take.mer_take_location[0] || !this.orderInfo.take.mer_take_location[1]) return this.$util.Tips({
					title: '请设置允许商城访问您的位置！'
				});
				let that = this, lat = parseFloat(that.orderInfo.take.mer_take_location[0]),
				    long = parseFloat(that.orderInfo.take.mer_take_location[1])
				//#ifdef H5
				if (that.$wechat.isWeixin() === true) {
					that.$wechat.seeLocation({
						latitude: Number(lat),
						longitude: Number(long),
						address: that.orderInfo.take ? that.orderInfo.take.mer_take_name : ''
					}).then(res=>{
						console.log('success');
					})
				}else{
				  //#endif
					uni.openLocation({
						latitude: lat,
						longitude: long,
						address: that.orderInfo.take ? that.orderInfo.take.mer_take_name : '',
						scale: 8,
						success: function() {},
					});
					// #ifdef H5
				}
				//#endif
			},
			/**
			 * 关闭支付组件
			 *
			 */
			payClose: function() {
				this.pay_close = false;
			},
			/**
			 * 打开支付组件
			 *
			 */
			pay_open: function() {
				this.pay_close = true;
				this.pay_order_id = this.orderInfo.order_id.toString();
				this.totalPrice = this.orderInfo.pay_price;
			},
			/**
			 * 支付成功回调
			 *
			 */
			pay_complete: function() {
				this.pay_close = false;
				this.pay_order_id = '';
				this.getOrderInfo();
			},
			/**
			 * 支付失败回调
			 *
			 */
			pay_fail: function() {
				this.pay_close = false;
				this.pay_order_id = '';
			},
			/**
			 * 登录授权回调
			 *
			 */
			onLoadFun: function() {
				this.isShowAuth = false;
				this.getOrderInfo();
				this.getUserInfo();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e;
			},
			/**
			 * 获取用户信息
			 *
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.payMode[2].number = res.data.now_money;
				})
			},
			getOrderCode(){
				verifyCode(this.order_id).then(res=>{
					this.codeUrl = res.data.qrcode
					this.val = res.data.qrcode
				})
			},
			/**
			 * 获取订单详细信息
			 *
			 */
			getOrderInfo: function() {
				let that = this;
				uni.showLoading({
					title: "正在加载中"
				});
				getOrderDetail(that.order_id).then(res => {	
					uni.hideLoading();
					that.$set(that, 'orderInfo', res.data);
					that.orderInfo.take = res.data.take;
					that.$set(that, 'cartInfo', res.data.orderProduct);
					if (that.orderInfo.status == '-1') {
						that.isGoodsReturn = true;
					}
					res.data.orderProduct.map(el => {
						if (el.refund_num == 0) {
							that.refundNum.push(el)
						}
					})
					if(res.data.order_type == 1){
						that.getOrderCode()
					}
				}).catch(err => {
					uni.hideLoading();
					that.$util.Tips({
						title: err
					}, '/pages/users/order_list/index');
				});
			},
			qrR(res) {
				this.codeSrc = res
			},
			showCode() {
				this.$refs.cancellPoupon.open();
			},
			close(){
				this.$refs.cancellPoupon.close();
			},
			/**
			 *
			 * 剪切订单号
			 */
			// #ifndef H5
			copy: function() {
				let that = this;
				console.log(that.orderInfo.order_sn)
				uni.setClipboardData({
					data: that.orderInfo.order_sn,
					success: function(res){
					}

				});
			},
			// #endif
			/**
			 *
			 * 剪切卡密内容
			 */
			// #ifndef H5
			copyKm: function() {
				let that = this;
				uni.setClipboardData({
					data: that.orderInfo.delivery_id,
					success: function(res){
					}
			
				});
			},
			// #endif
			/**
			 * 打电话
			 */
			goTel: function() {
				uni.makePhoneCall({
					phoneNumber: this.orderInfo.delivery_id
				})
			},
			/**
			 * 去拼团详情
			 *
			 */
			goJoinPink: function() {
				uni.navigateTo({
					url: '/pages/activity/combination_status/index?id=' + this.orderInfo.orderProduct[0].activity_id,
				});
			},
			/**
			 * 再此购买
			 *
			 */
			goOrderConfirm: function() {
				let that = this;
				let data = []
				this.cartInfo.map((item, index) => {
					let obj = {}
					obj.product_id = item.product_id
					obj.product_attr_unique = item.product_sku
					obj.cart_num = item.product_num
					data.push(obj)
				})

				orderAgain({
					data: data
				}).then(res => {
					let cart_id = res.data.cart_id.join(',')
					return uni.navigateTo({
						url: '/pages/users/order_confirm/index?cartId=' + cart_id
					});
				});
			},
			confirmOrder: function() {
				let that = this;
				uni.showModal({
					title: '确认收货',
					content: '为保障权益，请收到货确认无误后，再确认收货',
					success: function(res) {
						if (res.confirm) {
							orderTake(that.order_id).then(res => {
								return that.$util.Tips({
									title: '操作成功',
									icon: 'success'
								}, function() {
									that.getOrderInfo();
								});
							}).catch(err => {
								return that.$util.Tips({
									title: err
								});
							})
						}
					}
				})
			},
			/**
			 *
			 * 删除订单
			 */
			delOrder: function() {
				let that = this;
				orderDel(this.order_id).then(res => {
					return that.$util.Tips({
						title: '删除成功',
						icon: 'success'
					}, {
						tab: 3,
						url: 1
					});
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				});
			},
			cancelOrder() {
				let self = this
				uni.showModal({
					title: '提示',
					content: '确认取消该订单?',
					success: function(res) {
						if (res.confirm) {
							orderDel(self.orderInfo.order_id)
								.then((data) => {
									console.log(data)
									self.$util.Tips({
										title: data.msg
									}, {
										tab: 3
									})
								})
								.catch((err) => {
									return self.$util.Tips({
										title: err
									});
								});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			/*申请开票*/
			applyInvoice() {
				let that = this;
				that.invoice.invoice = true;
				that.$refs.addInvoicing.getInvoiceDefault();
				that.$refs.addInvoicing.getInvoiceList();
			},
			// 关闭发票弹窗
			changeInvoiceClose: function(data) {
				if(data)this.getInvoiceData(data);
				this.$set(this.invoice, 'invoice', false);
			},
			// 开票回调
			getInvoiceData(data) {
				let that = this
				applyInvoiceApi(that.order_id,data).then(res => {
					return that.$util.Tips({
						title: res.message,
					});
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.remark {
		flex: 1;
	}
	.merchant {
		width: 100%;
		height: 86rpx;
		padding: 0 30rpx;
		margin-top: 15rpx;
		border-bottom: 2rpx solid #f0f0f0;
		font-size: 30rpx;
		color: #282828;
		line-height: 86rpx;
		box-sizing: border-box;
		background-color: #fff;
		.iconfont {
			margin-top: 6rpx;
			font-size: 22rpx;
		}
	}
	.presell_bg_header{
		background: linear-gradient(to right, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
	}
	.b-color {
		background-color: var(--view-theme);
	}
	.t-color {
		color: var(--view-theme)!important;
	}
	.goodCall {
		text-align: center;
		width: 100%;
		height: 86rpx;
		padding: 0 30rpx;
		border-bottom: 1px solid #eee;
		font-size: 30rpx;
		line-height: 86rpx;
		background: #fff;
		color: #282828;
		.icon-kefu {
			font-size: 28rpx;
			margin-right: 15rpx;
		}
		/* #ifdef MP */
		button {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 86rpx;
			font-size: 30rpx;
			color: #e93323;
		}
		/* #endif */
	}
	.order-details .header {
		padding: 0 30rpx;
		height: 150rpx;
		background-image: linear-gradient(90deg, var(--view-bntColor21) 0%,var(--view-bntColor22) 100%);
		&.presell_header{
			background-repeat: no-repeat;
			background-size: cover;
			padding: 35rpx 50rpx;
			.data{
				margin: 8rpx 0 0 13rpx;
				.state{
					font-weight: normal;
					font-size: 24rpx;
				}
			}
		}
	}
	.take-info{
		padding: 0 30rpx 30rpx;
		background-color: #ffffff;
		margin-bottom: 14rpx;
	}
	.take-msg {
		display: flex;
		justify-content: space-between;
		background-color: #FAFAFA;
		padding: 24rpx;
		border-radius: 4rpx;
		.left {
			font-size: 24rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.title {
				font-size: 28rpx;
				font-weight: bold;
				color: #282828;
			}
			.text {
				color: #666666;
			}
		}
		.code {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.iconfont {
				font-size: 50rpx;
				color: #666666;
			}
			.text {
				font-size: 20rpx;
				color: #666666;
				margin-top: 12rpx;
			}
		}
	}
	.order-details .header.on {
		background-color: #666 !important;
	}
	.order-details .header .pictrue {
		width: 110rpx;
		height: 110rpx;
	}
	.order-details .header .pictrue image {
		width: 100%;
		height: 100%;
	}
	.order-details .header .data {
		color: rgba(255, 255, 255, 0.8);
		font-size: 24rpx;
		margin-left: 27rpx;
	}
	.order-details .header .data.on {
		margin-left: 0;
	}
	.order-details .header .data .state {
		font-size: 30rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 7rpx;
	}
	.presell_header .presell_payment{
		color: #fff;
		font-size: 30rpx;
		font-weight: bold;
		.iconfont{
			font-weight: normal;
			margin-right: 8rpx;
		}
	}
	.order-details .header .data .time {
		margin-left: 20rpx;
	}
	.order-details .nav {
		background-color: #fff;
		font-size: 26rpx;
		color: #282828;
		padding: 25rpx 0;
	}
	.order-details .nav .navCon {
		padding: 0 40rpx;
	}
	.order-details .nav .on {
		color: var(--view-theme);
	}
	.order-details .nav .progress {
		padding: 0 65rpx;
		margin-top: 10rpx;
	}
	.order-details .nav .progress .line {
		width: 100rpx;
		height: 2rpx;
		background-color: #939390;
	}
	.order-details .nav .progress .iconfont {
		font-size: 25rpx;
		color: #939390;
		margin-top: -2rpx;
	}
	.order-details .address {
		font-size: 26rpx;
		color: #868686;
		background-color: #fff;
		margin-top: 13rpx;
		padding: 35rpx 30rpx;
	}
	.order-details .address .name {
		font-size: 30rpx;
		color: #282828;
		margin-bottom: 15rpx;
	}
	.order-details .line {
		width: 100%;
		height: 3rpx;
	}
	.order-details .line image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.order-details .wrapper {
		background-color: #fff;
		margin-top: 12rpx;
		padding: 30rpx;
	}
	.order-details .wrapper .item {
		font-size: 28rpx;
		color: #282828;
	}
	.order-details .wrapper .virtual_item {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.order-details .virtual_item .virtual_row {
		width: 300rpx;
		align-items: center;
		justify-content: space-between;
		image,uni-image{
			width: 80rpx;
			height: 80rpx;
			border-radius: 100%;
		}
	}
	.order-details .virtual_item .virtual_detail {
		color: var(--view-theme);
	}
	.order-details .virtual_item .virtual_delivery {
		line-height: 40rpx;
	}
	.order-details .virtual_item .virtual_delivery_not {
		font-weight: bold;
	}
	.order-details .wrapper .item~.item {
		margin-top: 20rpx;
	}
	.order-details .wrapper .item .conter {
		color: #868686;
		width: 500rpx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-end;
		text-align: right;
	}
	.order-details .wrapper .item .virtual_image {
		margin-left: 50rpx;
	}
	.order-details .wrapper .item .virtual_image .picture{
		width: 106rpx;
		height: 106rpx;
		border-radius: 8rpx;
		margin-right: 10rpx;
		&:last-child{
			margin-right: 0;
		}
	}
	.order-details .wrapper .item .conter .copy {
		font-size: 20rpx;
		color: #333;
		border-radius: 17rpx;
		border: 1px solid #666;
		padding: 3rpx 15rpx;
		margin-left: 24rpx;
	}
	.order-details .wrapper .actualPay {
		border-top: 1px solid #eee;
		margin-top: 30rpx;
		padding-top: 30rpx;
	}
	.order-details .wrapper .actualPay .money {
		font-weight: bold;
		font-size: 30rpx;
	}
	.order-details .footer {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		padding: 0 30rpx;
		height: 100rpx;
		height: calc(100rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		height: calc(100rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		box-sizing: border-box;
	}
	.content-clip{
		height: 120rpx;
		height: calc(120rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		height: calc(120rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
	}
	.order-details .footer .bnt {
		width: 156rpx;
		text-align: center;
		height: 60rpx;
		border-radius: 50rpx;
		color: #fff;
		font-size: 27rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		&.btn_auto{
			width: auto;
			padding: 0 40rpx;
		}
	}
	.order-details .footer .bnt.cancel {
		color: #aaa;
		border: 1px solid #ddd;
	}
	.order-details .footer .bnt~.bnt {
		margin-left: 18rpx;
	}
	.order-details .writeOff {
		background-color: #fff;
		margin-top: 13rpx;
		padding-bottom: 30rpx;
	}
	.order-details .writeOff .title {
		font-size: 30rpx;
		color: #282828;
		height: 87rpx;
		border-bottom: 1px solid #f0f0f0;
		padding: 0 30rpx;
		line-height: 87rpx;
	}
	.grayBg .pictrue {
		width: 290rpx;
		height: 290rpx;
		margin: 0 auto;
	}
	.grayBg .pictrue image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.gear {
		width: 590rpx;
		height: 30rpx;
		margin: 0 auto;
	}
	.gear image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.num {
		color: #282828;
		font-size: 34rpx;
		font-weight: bold;
		margin: 0 auto;
		text-align: center;
		margin-top: 30rpx;
	}
	.order-details .writeOff .rules {
		margin: 46rpx 30rpx 0 30rpx;
		border-top: 1px solid #f0f0f0;
		padding-top: 10rpx;
	}
	.order-details .writeOff .rules .item {
		margin-top: 20rpx;
	}
	.order-details .writeOff .rules .item .rulesTitle {
		font-size: 28rpx;
		color: #282828;
	}
	.order-details .writeOff .rules .item .rulesTitle .iconfont {
		font-size: 30rpx;
		color: #333;
		margin-right: 8rpx;
		margin-top: 5rpx;
	}
	.order-details .writeOff .rules .item .info {
		font-size: 28rpx;
		color: #999;
		margin-top: 7rpx;
	}
	.order-details .writeOff .rules .item .info .time {
		margin-left: 20rpx;
	}
	.order-details .map {
		height: 86rpx;
		font-size: 30rpx;
		color: #282828;
		line-height: 86rpx;
		border-bottom: 1px solid #f0f0f0;
		margin-top: 13rpx;
		background-color: #fff;
		padding: 0 30rpx;
	}
	.order-details .map .place {
		font-size: 26rpx;
		width: 176rpx;
		border-radius: 25rpx;
		line-height: 50rpx;
		text-align: center;
		border: 1px solid var(--view-theme);
	}
	.order-details .map .place .iconfont {
		font-size: 27rpx;
		height: 27rpx;
		line-height: 27rpx;
		margin: 2rpx 3rpx 0 0;
	}
	.order-details .address .name .iconfont {
		font-size: 34rpx;
		margin-left: 10rpx;
	}
	.refund {
		padding: 0 30rpx 30rpx;
		margin-top: 24rpx;
		background-color: #fff;
		.title {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			color: #333;
			height: 86rpx;
			border-bottom: 1px solid #f5f5f5;
			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
		}
		.con {
			padding-top: 25rpx;
			font-size: 28rpx;
			color: #868686;
		}
	}
	.qs-btn {
		width: auto;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50rpx;
		color: #fff;
		font-size: 27rpx;
		padding: 0 3%;
		color: #aaa;
		border: 1px solid #ddd;
		margin-right: 20rpx;
	}
	.code-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 32rpx 0 60rpx 0;
		background: #ffffff;
		border-radius: 16rpx 16rpx 0 0;
		position: relative;
		.iconfont{
			font-size: 24rpx;
			color: #939393;
			position: absolute;
			top: 20rpx;
			right: 30rpx;
		}
		.title{
			color: #282828;
			font-size: 32rpx;
			font-weight: bold;
		}
		.trip {
			font-size: 28rpx;
			font-weight: 400;
			color: #666666;
			margin: 40rpx 0;
		}
	}
</style>

