<template>
	<view :style="viewColor">
		<view class='order-submission'>
			<view class="allAddress" @click="onAddress">
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
					<view v-for="(goods,j) in item.list" :key="j">
						<view>
							<view class="product-item">
								<view class="img-box">
									<image :src="goods.productAttr.image || goods.product.image"></image>
								</view>
								<view class="content">
									<view class="acea-row row-between">
										<view class="name line1">{{goods.product.store_name}}</view>
										<text class="number">x{{goods.cart_num}}</text>
									</view>
									
									<view class="label">{{goods.productAttr.sku}}</view>
									<view class="price acea-row row-between">
										<view class="acea-row row-middle">
											<block>
												{{goods.productAttr.ot_price}}积分<block v-if="goods.productAttr.price>0">+{{goods.productAttr.price}}元</block>
											</block>
											
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
				</view>
			</view>
			<view class='wrapper'>
				<view class='item acea-row row-between-wrapper'>
					<view>可用积分</view>
					<view class='discount'>{{resData.true_integral}}积分
					</view>
				</view>
				<view class='item acea-row row-between-wrapper'>
					<view>兑换积分</view>
					<view class='discount'>{{resData.order_total_integral}}积分
					</view>
				</view>
				<view class='item acea-row row-between-wrapper'>
					<view>支付金额</view>
					<view class='discount'>￥{{resData.order_pay_price || 0}}
					</view>
				</view>
				<view class='item acea-row row-between-wrapper'>
					<view>快递费用</view>
					<view class='discount'>免运费
					</view>
				</view>
				<view class='item' v-if="textareaStatus">
					<view>备注信息</view>
					<textarea placeholder-class='placeholder' placeholder="请添加备注（150字以内）"
						@input='bindHideKeyboard' :value="mark" :maxlength="150" name="mark">
						</textarea>
				</view>
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
			<view style='height:120rpx;'></view>
			<view class='footer acea-row row-between-wrapper'>
				<view>支付：
					<text class='color-t'>{{resData.order_total_integral || 0}}积分</text><text class="color-t" v-if="resData.order_pay_price>0">+{{resData.order_pay_price}}元</text>
				</view>
				<view class='settlement' style='z-index:100' @tap="goPay">立即兑换</view>
			</view>
		</view>
		<view class="alipaysubmit" v-html="formContent"></view>
		
		<addressWindow ref="addressWindow" @changeTextareaStatus="changeTextareaStatus" :news='news' :address='address'
			:pagesUrl="pagesUrl" @OnChangeAddress="OnChangeAddress" @changeClose="changeClose"></addressWindow>
		<!-- #ifdef MP -->
		<authorize v-if="isShowAuth" @authColse="authColse" @onLoadFun="onLoadFun"></authorize>
		<!-- #endif -->
	</view>
</template>
<script>
	import {
		integralOrderConfirm,
		integralOrderCreate,
	} from '@/api/points_mall.js';
	import {
		getAddressDefault,
		getAddressDetail,
		getAddressList,
		getUserInfo,
	} from '@/api/user.js';
	import {
		storeListApi
	} from '@/api/store.js';
	import {
		CACHE_LONGITUDE,
		CACHE_LATITUDE
	} from '@/config/cache.js';
	import { openPaySubscribe } from '@/utils/SubscribeMessage.js';
	import addressWindow from '@/components/addressWindow';
	import { HTTP_REQUEST_URL } from '@/config/app';
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		mapGetters
	} from "vuex";
	export default {
		components: {
			addressWindow,
		},
		data() {
			return {
				confirm:[],
				textareaStatus: true,
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
					}
				],
				formContent: '',
				payType: 'weixin', //支付方式
				openType: 1, //优惠券打开方式 1=使用
				active: 0, //支付方式切换
				coupon: {
					coupon: false,
					list: [],
					statusTile: '立即使用'
				}, //优惠券组件
				address: {
					address: false
				}, //地址组件
				addressInfo: {}, //地址信息
				pinkId: 0, //拼团id
				addressId: 0, //地址id
				couponId: 0, //优惠券id
				cartId: '', //购物车id
				BargainId: 0,
				combinationId: 0,
				seckillId: 0,
				userInfo: {}, //用户信息
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
				cartInfo: {},
				priceGroup: {},
				animated: false,
				totalPrice: 0,
				integralRatio: "0",
				pagesUrl: "",
				offlinePostage: "",
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				from: '',
				news: 1,
				order_key: "",
				order_type: 20,
				invTitle: '不开发票',
				special_invoice: false,
				invoice_func: false,
				header_type: '',
				invShow: false,
				invList: [],
				invChecked: '',
				urlQuery: '',
				pay_close: false,
				resData: {},
				product_type:1,
				newImg: [],
				domain: HTTP_REQUEST_URL,
			};
		},
		computed: mapGetters(['isLogin','viewColor','keyColor']),
		onLoad: function(options) {
			// #ifdef H5
			this.from = this.$wechat.isWeixin() ? 'weixin' : 'h5'
			// #endif
			// #ifdef MP
			this.from = 'routine'
			// #endif
			// #ifdef APP-PLUS
			this.from = 'weixin'
			// #endif
			if (this.payType == 'weixin') {
				this.payType = this.from
			}
			if (!options.cartId) return this.$util.Tips({
				title: '请选择要购买的商品'
			}, {
				tab: 3,
				url: 1
			});
			this.addressId = options.addressId || 0;
			this.cartId = options.cartId;
			this.is_address = options.is_address ? true : false;
			this.invChecked = options.invoice_id || '';
			// #ifndef APP-PLUS
			this.textareaStatus = true;
			// #endif
			if (this.isLogin && this.toPay == false) {
				this.getFun();
			} else {
				//#ifndef MP
				toLogin();
				//#endif
				//#ifdef MP
				this.isShowAuth = true;
				//#endif
			}
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			uni.removeStorageSync('form_type_cart');
			let _this = this
			uni.$on("handClick", res => {
				if (res) {
					_this.system_store = res.address
				}
				// 清除监听
				uni.$off('handClick');
			})
		},
		methods: {
			getFun(){
				this.getaddressInfo();
				this.$nextTick(function() {
					this.getUserInfo();
					this.$refs.addressWindow.getAddressList();
				})
			},
			// 获取个人信息
			getUserInfo() {
				getUserInfo().then(res => {
					this.userInfo = res.data
				})
			},
			onLoadFun(){
				this.getFun();
				this.isShowAuth = false
			},
			// 授权关闭
			authColse: function(e) {
			  this.isShowAuth = e
			},
			payClose: function() {
				this.pay_close = false;
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
			goPay() {
				let that = this,
					data = {};
				if (!that.addressId) {
					return that.$util.Tips({
						title: '请选择收货地址'
					});
				}
				if (parseFloat(that.resData.true_integral) < parseFloat(that.resData.order_total_integral))
					return that.$util.Tips({
						title: '积分不足！'
					});
				
				data = {
					cart_id: this.cartId.split(","),
					address_id: this.addressId,
					pay_type: this.payType,
					mark: this.mark,
					order_type: this.order_type,
					key: this.order_key,
					// #ifdef H5
					return_url: 'http://' + window.location.host + '/pages/points_mall/exchange_record',
					// #endif
				};
				if (data.mark && this.isEmojiCharacter(data.mark[Object.keys(data.mark)[0]])) {
					that.$util.Tips({
						title: '备注不允许输入表情！'
					});
					return;
				}
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
			payment: function(data) {
				let that = this;
				integralOrderCreate(data).then(res => {
					let status = res.data.status,
						orderId = res.data.result.order_id,
						callback_key = res.data.result.pay_key,
						jsConfig = res.data.result.config,
						goPages = '/pages/order_pay_status/index?order_type=20&order_id=' + orderId + '&msg=' + res.message;
					that.orderPay = true;
					uni.hideLoading();
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
									url: goPages
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
									let url = '/pages/order_pay_status/index?order_type=20&order_id=' + orderId +
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
									let url = '/pages/order_pay_status/index?order_type=20&order_id=' + orderId + '&msg=取消支付';
									return that.$util.Tips({
										title: '取消支付',
									}, {
										tab: 4,
										url: url
									});
								},
								complete: () => {
									let url = '/pages/order_pay_status/index?order_type=20&order_id=' + orderId + '&msg=取消支付';
									return that.$util.Tips({
										title: '取消支付',
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
									let pages = '/pages/order_pay_status/index?order_type=20&order_id=' +
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
							let url = `${host}/pages/order_pay_status/index?order_type=20&order_id=${orderId}&msg=${res.message}`
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
									let pages = '/pages/order_pay_status/index?order_type=20&order_id=' +
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
									let pages = '/pages/order_pay_status/index?order_type=20&order_id=' +
										orderId + '&msg=取消支付'
									return that.$util.Tips({
										title: '取消支付'
									}, {
										tab: 5,
										url: pages
									});
								},
							});
							break;
							// #endif
						default: 
							let pages = '/pages/order_pay_status/index?order_type=20&order_id=' +
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
			// 关闭地址弹窗；
			changeClose: function() {
				this.$set(this.address, 'address', false);
			},

			ChangCouponsClone: function() {
				
			},
			changeTextareaStatus: function() {
				
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
			/**
			 * 获取当前订单详细信息
			 * 
			 */
			getConfirm: function() {
				let that = this;
				console.log(this.addressId)
				integralOrderConfirm({
					cart_id: this.cartId.split(","),
					address_id: this.addressId
				}).then(res => {
					that.$set(that, 'resData', res.data);
					that.$set(that, 'cartInfo', res.data.order);
					that.$set(that, 'order_key', res.data.key);
					that.$set(that, 'order_type', res.data.order_type);
				}).catch(err => {
					return this.$util.Tips({
						title: err
					}, {
						tab: 3,
						url: 1
					});
				});
			},
			bindDateChange: function(e, index) {
				this.confirm[index].value = e.target.value
			},
			bindTimeChange: function(e, index) {
				this.confirm[index].value = e.target.value
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
						that.getConfirm();
					})
				} else {
					getAddressList().then(res => {
						that.addressInfo = res.data.list.length > 0 ? res.data.list[0] : {};
						that.addressId = res.data.list.length > 0 ? res.data.list[0].address_id : 0;
						that.address.addressId = res.data.list.length > 0 ? res.data.list[0].address_id : 0;
						that.getConfirm();
					})
				}
			},
			onAddress: function() {
				let that = this;
				if(that.addressInfo.real_name){
					that.textareaStatus = false;
					that.address.address = true;
					that.pagesUrl = '/pages/users/user_address/index?cartId=' + this.cartId+'&product_type=20';
				}else{
					uni.navigateTo({
						url: `/pages/users/user_address/index?cartId=${this.cartId}&product_type=20`,
					});
				}
			},
			clickTextArea() {
				this.$nextTick(() => {
					this.$refs.getFocus.focus()
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	/deep/uni-checkbox[disabled] .uni-checkbox-input {
		background-color: #eee;
	}
	.confirmImg{
		width: 100%;
	}
	.confirmImg .upload {
		padding-bottom: 36rpx;
	}
	.confirmImg .upload .pictrue {
		margin: 22rpx 23rpx 0 0;
		width: 156rpx;
		height: 156rpx;
		position: relative;
		font-size: 24rpx;
		color: #bbb;
	}
	.confirmImg .upload .pictrue:nth-of-type(4n) {
		margin-right: 0;
	}
	.confirmImg .upload .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 3rpx;
	}
	.confirmImg .upload .pictrue .icon-guanbi1 {
		position: absolute;
		font-size: 45rpx;
		top: -10rpx;
		right: -10rpx;
	}	
	.confirmImg .upload .pictrue .icon-icon25201 {
		color: #bfbfbf;
		font-size: 50rpx;
	}
	.confirmImg .upload .pictrue:nth-last-child(1) {
		border: 1rpx solid #ddd;
		box-sizing: border-box;
	}
	.goodWrapper{
		padding: 0 30rpx;
	}
	.alipaysubmit {
		display: none;
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
		position: relative;
	}
	.order-submission .allAddress .nav .item.on {
		position: relative;
		width: 250rpx;
	}
	.order-submission .allAddress .address {
		height: 150rpx;
		margin: 0 auto;
	}
	.order-submission .allAddress .line {
		margin: 0 auto;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 3rpx;
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
							
						}
					}
					.number{
						display: block;
						text-align: right;
						color: #999;
						font-size: 26rpx;
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
						color: #999999;
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
	.order-submission .wrapper {
		background-color: #fff;
		margin-top: 13rpx;
	}
	.order-submission .wrapper .item .name{
		position: relative;
	}
	.order-submission .wrapper .item .asterisk{
		position: absolute;
		color:red;
		left:-15rpx
	}
	.order-submission .wrapper .item {
		padding: 27rpx 30rpx;
		font-size: 30rpx;
		color: #282828;
		border-bottom: 1px solid #f0f0f0;
	}
	.order-submission .wrapper .item .discount {
		font-size: 30rpx;
		color: #999;
	}
	.order-submission .wrapper .item .discount input {
		text-align: end;
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
	.order-submission .wrapper .item textarea {
		background-color: #f9f9f9;
		width: 690rpx;
		height: 140rpx;
		border-radius: 3rpx;
		margin-top: 30rpx;
		padding: 25rpx 28rpx;
		box-sizing: border-box;
	}
	.order-submission .wrapper .item .placeholder {
		color: #ccc;
	}
	.order-submission .wrapper .item .list {
		margin-top: 35rpx;
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
	}
	.order-submission .footer {
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		padding: 0 30rpx;
		font-size: 28rpx;
		color: #333;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
	}
	.order-submission .footer .color-t{
		color: var(--view-theme);
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
	}

	.footer .transparent {
		opacity: 0
	}

	.pictrue image {
		width: 130rpx;
		height: 130rpx;
	}
</style>
