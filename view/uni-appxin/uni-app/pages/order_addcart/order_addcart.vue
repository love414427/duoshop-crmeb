<template>
	<view :style="viewColor">
		<view class='shoppingCart'>
			<view class='labelNav acea-row row-around row-middle'>
				<view class='item'><text class='iconfont icon-xuanzhong'></text>100%正品保证</view>
				<view class='item'><text class='iconfont icon-xuanzhong'></text>所有商品精挑细选</view>
				<view class='item'><text class='iconfont icon-xuanzhong'></text>售后无忧</view>
			</view>
			<view class='nav acea-row row-between-wrapper'>
				<view>购物数量 <text class='num t-color'>{{cartTotalCount}}</text></view>
				<view v-if="cartList.valid.length > 0 || cartList.invalid.length > 0" class='administrate acea-row row-center-wrapper'
				 @click='manage'>{{ footerswitch ? '管理' : '取消'}}</view>
			</view>
			<view v-if="cartList.valid.length > 0 || cartList.invalid.length > 0">
				<view class='list'>
					<block v-for="(item,index) in cartList.valid" :key="index">
						<view class='item acea-row row-between-wrapper'>
							<view class="store-title">
								<view class="checkbox" @click="storeAllCheck(item,index)">
									<text v-if="!item.allCheck" class="iconfont icon-weixuanzhong"></text>
									<text v-else class="iconfont icon-xuanzhong1"></text>
								</view>
								<navigator :url="hide_mer_status == 0 ? '/pages/store/home/index?id='+item.mer_id : '#'" class="info">
									<text class="iconfont icon-shangjiadingdan"></text>
									<view class="name">{{item.mer_name}}</view>
									<text class="iconfont icon-xiangyou"></text>
								</navigator>
								<view class="coupon-btn" v-if="item.hasCoupon>0" @click="giveCoupon(item)">优惠券</view>
							</view>
							<navigator v-for="goods in item.list" :key="goods.cart_id" :url='"/pages/goods_details/index?id="+goods.product.product_id'
							 hover-class='none' class='picTxt acea-row'>
								<view class="checkbox" @click.stop="goodsCheck(goods,index)">
									<text v-if="!goods.check" class="iconfont icon-weixuanzhong"></text>
									<text v-else class="iconfont icon-xuanzhong1"></text>
								</view>
								<view class='pictrue'>
									<image :src='(goods.productAttr && goods.productAttr.image) || goods.product.image'></image>
									<!-- <image v-else :src='item.productInfo.image'></image> -->
								</view>
								<view class='text'>
									<view class='line1'>{{goods.product.store_name}}</view>
									<view class='infor line1' v-if="goods.productAttr.sku" @click.stop='changeCart(goods,goods.cart_id)'>
										{{goods.productAttr.sku}}
										<text class="iconfont icon-xiala1"></text>
									</view>
									<view v-if="goods.product.once_max_count>0 && goods.product.once_min_count>0" class="buy_limit">
										<text v-if="goods.product.once_min_count>0">{{goods.product.once_min_count}}件起购，</text><text v-if="goods.product.once_max_count>0">最多{{goods.product.once_max_count}}件</text>
									</view>
									<view class='money acea-row row-middle'>
										<text>￥{{goods.productAttr.price}}</text>
										<view v-if="goods.productAttr.show_svip_price" class="vipImg">
											<image src="/static/images/svip.png"></image>
										</view>
									</view>
								</view>
								<view class='carnum acea-row row-center-wrapper'>
									<view class="reduce" :class="goods.numSub ? 'on' : ''" @click.stop='subCart(goods)'>-</view>
									<view class='num'>{{goods.cart_num}}</view>
									<view class="plus" :class="goods.numAdd ? 'on' : ''" @click.stop='addCart(goods)'>+</view>
								</view>
							</navigator>
						</view>
					</block>
				</view>
				<view class='invalidGoods' v-if="cartList.invalid.length > 0">
					<view class='goodsNav acea-row row-between-wrapper'>
						<view @click='goodsOpen'><text class='iconfont' :class='goodsHidden==true?"icon-xiangxia":"icon-xiangshang"'></text>失效商品</view>
						<view class='del' @click='unsetCart'><text class='iconfont icon-shanchu1'></text>清空</view>
					</view>
					<view class='goodsList' :hidden='goodsHidden'>
						<block v-for="(item,index) in cartList.invalid" :key='index'>
							<navigator :url="'/pages/goods_details/index?id='+item.product_id" class='item acea-row row-between-wrapper' hover-class='none'>
								<view class='invalid'>失效</view>
								<view class='pictrue'>
									<image :src='(item.productAttr && item.productAttr.image) || item.product.image'></image>

								</view>
								<view class='text acea-row row-column-between'>
									<view class='line1 name'>{{item.product.store_name}}</view>
									<!-- <view class='infor line1' v-if="item.productInfo.attrInfo">属性：{{item.productInfo.attrInfo.suk}}</view> -->
									<view class='acea-row row-between-wrapper'>
										<!-- <view>￥{{item.truePrice}}</view> -->
										<view class='end'>该商品已失效</view>
									</view>
								</view>
							</navigator>
						</block>
					</view>
				</view>
			</view>
			<view class='noCart' v-if="recommend" :style="{marginTop:cartList.invalid.length ==0 && cartList.invalid.length ==0?'170rpx':'' }">
				<view class='pictrue'>
					<image src='../../static/images/noCart.png'></image>
					<view>暂无商品，去添加点什么吧</view>
				</view>	
				<recommend v-if="recommend_switch == 1" :hostProduct='hostProduct' :isLogin="isLogin"></recommend>
				<view class='loadingicon acea-row row-center-wrapper' v-if="hostProduct.length>5 && recommend_switch == 1">
					<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadTitle}}
				</view>
			</view>
			<view class='footer acea-row row-between-wrapper' :class="isFooter?'':'on'" v-if="cartList.valid.length > 0">
				<view>
					<view class="allcheckbox" @click.stop="checkboxAllChange">
						<text v-if="!isAllSelect" class="iconfont icon-weixuanzhong"></text>
						<text v-else class="iconfont icon-xuanzhong1"></text>
						全选 ({{cartCount}})
					</view>
				</view>
				<view class='money acea-row row-middle' v-if="footerswitch==true">
					<text class='t-color'>￥{{selectCountPrice}}</text>
					<form @submit="subOrder" report-submit='true'>
						<button class='placeOrder' formType="submit">去结算</button>
					</form>
				</view>
				<view class='button acea-row row-middle' v-else>
					<form @submit="subCollect" report-submit='true'>
						<button class='bnt bt-color' formType="submit">收藏</button>
					</form>
					<form @submit="subDel" report-submit='true'>
						<button class='bnt' formType="submit">删除</button>
					</form>
				</view>
			</view>
		</view>
		<!-- 优惠券弹窗 -->
		<block v-if="coupon.coupon">
			<couponListWindow
				:coupon='coupon'
				@ChangCouponsClone="ChangCouponsClone"
				@ChangCouponsUseState="ChangCouponsUseState"
			></couponListWindow>
		</block>
		<!-- 组件 -->
		<addcartWindow :attr="attr" :isShow='1' :iSplus='1' :destri='1' @myevent="onMyEvent" @ChangeAttr="ChangeAttr" @goCat="goCat" @attrVal="attrVal" id='product-window'></addcartWindow>
		<authorize :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse" @onLoadFun="onLoadFun"></authorize>
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
	import couponListWindow from '@/components/couponListWindow';
	import addcartWindow from '@/components/addcartWindow';
	import {
		getCartList,
		getCartCounts,
		changeCartNum,
		cartDel
	} from '@/api/order.js';
	import {
		getCoupons,
		getShopCoupons
	} from '@/api/api.js';
	import {
		getProductHot,
		collectAll
	} from '@/api/store.js';
	import {
		mapGetters
	} from "vuex";
	import recommend from '@/components/recommend';
	import authorize from '@/components/Authorize';
	import { configMap } from '@/utils';
	const app = getApp();
	export default {
		props: {
			image: {
				type: String,
				default: '',
			}			
		},
		components: {
			recommend,
			couponListWindow,
			addcartWindow,
			authorize
		},
		data() {
			return {
				loading: false, //是否加载中
				loadend: false, //是否加载完毕
				loadTitle: '加载更多', //提示语
				isFooter:false,
				cartCount: 0,
				goodsHidden: true,
				footerswitch: true,
				hostProduct: [],
				cartList: {
					valid: [],
					invalid: []
				},
				isAllSelect: false, //全选
				selectValue: [], //选中的数据
				selectCountPrice: 0.00,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				hotScroll: false,
				hotPage: 1,
				hotLimit: 10,
				//属性是否打开
				coupon: {
					'coupon': false,
					list: [],
				},
				// 购物车总数
				cartTotalCount:0,
				recommend: false,
				productValue: [], //系统属性
				attr: {
					cartAttr: false,
					productAttr: [],
					productSelect: {}
				},
				isOpen: false, //是否打开属性组件
				source: '',
				attrImage: '',
				isCart: true,
				cart_id: '',
				attrValue: '', //已选属性
				uniqueValue: "",
				newVal: {},
				goods: {},
				currSku: '',
				newData: {},
				activeRouter: '',
			};
		},
		computed: configMap({hide_mer_status: 1,recommend_switch:0,navigation: {}}, mapGetters(['isLogin','viewColor'])),
		onReady(){},
		mounted: function() {},
		onLoad: function(options) {
			
		},
		onShow: function() {
			let that = this
			let routes = getCurrentPages();
			let curRoute = routes[routes.length - 1].route
			this.activeRouter = '/' + curRoute
			this.getNav();
			// uni.showTabBar();
			if (this.isLogin == true) {
				this.getCartList();
				this.getCartNum();
				this.goodsHidden = true;
				this.footerswitch = true;
				this.isAllSelect = false; //全选
				this.selectValue = []; //选中的数据
				this.isShowAuth = false;
				uni.setStorage({
					key:'invoice_Data',
					data:{},
					success: function(){}
				})
			}else{
				setTimeout(() =>{
					this.isAuto = true;
					this.isShowAuth = true
				}, 300);
			}
		},
		methods: {
			// 授权关闭
			authColse: function(e) {
				console.log(e,'authColse')
				this.isShowAuth = e;
			},
			onLoadFun(){
				this.isShowAuth = false;
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
					this.isFooter = true
				} else {
					uni.showTabBar()
					this.isFooter = false
				}			
			},
			// 删除
			subDel: function(event) {
				let that = this
				let type_id = []
				this.cartList.valid.forEach(el=>{
					el.list.forEach(goods=>{
						if(goods.check){
							type_id.push(goods.cart_id)
						}
					})
				})
				if(type_id.length == 0){
					return that.$util.Tips({
						title: '请选择产品'
					});
				}else{
					cartDel({
						cart_id:type_id,
					}).then(res=>{
						this.getCartList();
						this.getCartNum();
						return that.$util.Tips({
							title: res.message,
							icon: 'success'
						});
					}).catch(err => {
						return that.$util.Tips({
							title: err
						});
					});
				}
			},
			// 收藏
			subCollect: function(event) {
				let that = this
				let type_id = []
				this.cartList.valid.forEach(el=>{
					el.list.forEach(goods=>{
						if(goods.check){
							type_id.push(goods.spu.spu_id)
						}
					})
				})
				if(type_id.length == 0){
					return that.$util.Tips({
						title: '请选择产品'
					});
				}else{
					collectAll({
						type_id:type_id,
						type:1
					}).then(res=>{
						return that.$util.Tips({
							title: res.message,
							icon: 'success'
						});
					}).catch(err => {
						return that.$util.Tips({
							title: err
						});
					});
				}
			},
			onMyEvent: function() {
				this.$set(this.attr, 'cartAttr', false);
				this.$set(this, 'isOpen', false);
			},
			/*
			 * 更改商品属性
			 */
			changeCart: function(goods, id) {
				let that = this;
				if(that.goods == goods){
					that.isOpen = that.attr.cartAttr = true;
					return
				}else{
					that.goods = JSON.parse((JSON.stringify(goods)));
					that.currSku = goods.productAttr.sku.split(",");
					that.$set(that.attr, 'productAttr', goods.attr);
					const sku = {}
					that.attrValue = goods.productAttr.sku
					that.attrImage = goods.product.image
					goods.attrValue.forEach((itemn)=>{
						 sku[itemn.sku] = itemn;
					})
					that.$set(that, 'productValue',sku);
					let	productSelect = sku[that.attrValue];
					that.isOpen = that.attr.cartAttr = true;
					//打开属性
					that.DefaultSelect(goods)
				}	
			},
			/**
			 * 默认选中属性
			 *
			 */
			DefaultSelect: function(goods) {
				let productAttr = this.attr.productAttr;
				let value = [];
				let arr = []
				console.log(arr, 'arr')
				if(this.currSku){
					value = this.currSku
				}else{
					for (var key in this.productValue) {
						if (this.productValue[key].stock > 0) {
							value = this.attr.productAttr.length ? key.split(",") : [];
							break;
						}
					}
				}
				for (let i = 0; i < productAttr.length; i++) {
					this.$set(productAttr[i], "index", value[i]);
				}
				let productSelect = this.productValue[value.join(",")];
				if (productSelect && productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"store_name",
						goods.product.store_name
					);
					this.$set(this.attr.productSelect, "image", productSelect.image ? productSelect.image : goods.product.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.unique);
					this.$set(this.attr.productSelect, "svip_price", productSelect.svip_price);
					this.$set(this, "uniqueValue", productSelect.unique);
					this.$set(this, "attrValue", value.join(","));
					this.$set(this, "attrTxt", "已选择");
					if (productSelect.stock == 0) {
						this.$set(this.attr.productSelect, "cart_num", 0);
					} else {
						this.$set(this.attr.productSelect, "cart_num", 1);
					}
				} else if (!productSelect && productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"store_name",
						goods.product.store_name
					);
					this.$set(this.attr.productSelect, "image", goods.product.image);
					this.$set(this.attr.productSelect, "price", goods.product.price);
					this.$set(this.attr.productSelect, "svip_price", productSelect.svip_price);
					this.$set(this.attr.productSelect, "stock", 0);
					this.$set(this.attr.productSelect, "unique", "");
					this.$set(this, "uniqueValue", "");
					this.$set(this.attr.productSelect, "cart_num", 0);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "请选择");
				} else if (!productSelect && !productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"store_name",
						goods.product.store_name
					);
					this.$set(this.attr.productSelect, "image", goods.product.image);
					this.$set(this.attr.productSelect, "price", goods.product.price);
					this.$set(this.attr.productSelect, "svip_price", productSelect.svip_price);
					this.$set(this.attr.productSelect, "stock", goods.product.stock);
					this.$set(this.attr.productSelect, "unique", goods.product.unique || "");
					this.$set(this, "uniqueValue", goods.product.unique || "");
					this.$set(this.attr.productSelect, "cart_num", 1);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "请选择");
				} else if (productSelect && !productAttr.length) {
					this.$set(this.attr.productSelect, "store_name", goods.product.store_name);
					this.$set(this.attr.productSelect, "image", productSelect.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "svip_price", productSelect.svip_price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.unique);
					this.$set(this, "uniqueValue", productSelect.unique);
					this.$set(this, "attrValue", value.join(","));
					this.$set(this, "attrTxt", "已选择");
					if (productSelect.stock == 0) {
						this.$set(this.attr.productSelect, "cart_num", 0);
					} else {
						this.$set(this.attr.productSelect, "cart_num", 1);
					}
				}
				this.goCart(productSelect);
			},
			goCart(productSelect){
				let that = this;
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
			},
			attrVal(val) {
				this.$set(this.attr.productAttr[val.indexw], 'index', this.attr.productAttr[val.indexw].attr_values[val.indexn]);
			},
			/**
			 * 属性变动赋值
			 *
			 */
			ChangeAttr: function(res) {
				let productSelect  = this.productValue[res];
				this.currSku = res;
				this.newVal = this.productValue[res];
				if(productSelect)this.$set(this, "uniqueValue", productSelect.unique);
				if (productSelect && productSelect.stock > 0) {
					this.$set(this.attr.productSelect, "image", productSelect.image ? productSelect.image : this.attrImage);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.unique);
					this.$set(this, "uniqueValue", productSelect.unique);
					this.$set(this.attr.productSelect, "cart_num", 1);
					this.$set(this, "attrValue", res);
				}
				 else {
					this.$set(this.attr.productSelect, "image", productSelect.image ? productSelect.image : this.attrImage);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "stock", 0);
					this.$set(this.attr.productSelect, "unique", "");
					this.$set(this.attr.productSelect, "cart_num", 0);
					this.$set(this, "attrValue", "");
				}
			},
			// 立即下单
			subOrder: function(event) {
				let selectValue = []
				this.cartList.valid.forEach(el=>{
					el.list.forEach(goods=>{
						if(goods.check){
							selectValue.push(goods.cart_id)
						}
					})
				})
				if (selectValue.length > 0) {
					uni.navigateTo({
						url: '/pages/users/order_confirm/index?cartId=' + selectValue.join(',')
					});
				} else {
					return this.$util.Tips({
						title: '请选择产品'
					});
				}
			},
			// 购物车增加
			addCart: function(goods, index) {
				let that = this;
				changeCartNum(goods.cart_id, {
					cart_num: goods.cart_num + 1
				}).then(res => {
					goods.cart_num = Number(goods.cart_num) + 1
					that.cartTotalCount = Number(that.cartTotalCount) + 1;
					if (goods.hasOwnProperty('productAttr') && goods.cart_num > goods.productAttr.stock) {
						goods.cart_num = goods.productAttr.stock;
						goods.numAdd = true;
						goods.numSub = false;
						return
					} else {
						goods.numAdd = false;
						goods.numSub = false;
					}
					this.cartAllCheck('goodsCheck')
				}).catch(error => {
					that.$util.Tips({
						title: error
					});
					// goods.cart_num = Number(goods.cart_num) - 1
				})
			},
			goCat: function() {
				let that = this;
				changeCartNum(that.goods.cart_id, {
					cart_num: that.goods.cart_num,
					product_attr_unique: that.newVal.unique
				}).then(res => {
					if (that.goods.hasOwnProperty('productAttr') && that.goods.cart_num > that.goods.productAttr.stock) {
						that.goods.cart_num = that.goods.productAttr.stock;
						that.goods.numAdd = true;
						that.goods.numSub = false;
						return
					} else {
						that.goods.numAdd = false;
						that.goods.numSub = false;
					}
					that.onMyEvent();
					that.getCartList(true);
					that.isAllSelect = false

				}).catch(error => {
					that.$util.Tips({
						title: error
					});
					// goods.cart_num = Number(goods.cart_num) - 1
				})

			},
			// 购物车递减
			subCart(goods) {
				let status = false;
				if (goods.cart_num < 1) status = true;
				if (goods.cart_num <= 1) {
					goods.cart_num = 1;
					goods.numSub = true;
					status = true;
				} else {
					// goods.cart_num = Number(goods.cart_num) - 1
					// this.cartTotalCount = Number(this.cartTotalCount) - 1;
					if (false == status) {
						changeCartNum(goods.cart_id, {
							cart_num: Number(goods.cart_num) - 1
						}).then(res => {
							goods.numSub = false;
							goods.numAdd = false;
							if(goods.cart_num <= 1){
								goods.numSub = true;
							}
							goods.cart_num = Number(goods.cart_num) - 1
							this.cartTotalCount = Number(this.cartTotalCount) - 1;
							this.cartAllCheck('goodsCheck')
						}).catch(error => {
							this.$util.Tips({
								title: error
							});
						})
					}
				}
			},
			getCartNum: function() {
				let that = this;
				getCartCounts().then(res => {
					that.cartTotalCount = res.data[0].count || 0;
				});
			},
			// 购物车列表
			getCartList: function(isChange) {
				let that = this;
				getCartList().then(res => {
					res.data.list.forEach((item, index) => {
						item.allCheck = true
						item.list.forEach((goods, j) => {
							goods.check = true
							if (goods.cart_num == 1) {
								goods.numSub = true;
							} else {
								goods.numSub = false;
							}
							if (goods.cart_num == goods.productAttr.stock) {
								goods.numAdd = true;
							} else {
								goods.numAdd = false;
							}
						})
					})
					this.cartList.valid = res.data.list
					this.cartList.invalid = res.data.fail
					if(res.data.list.length == 0 && res.data.list.length == 0){
						this.recommend = true;
						if(!this.hostProduct.length){
							this.getHostProduct();
						}
					}else{
						this.recommend = false
					}
					const sku = {}
					this.checkboxAllChange()
				});
			},
			// 商铺全选
			storeAllCheck(item, index) {
				// 店铺取消
				if (item.allCheck) {
					item.allCheck = false
					item.list.forEach((el, index) => {
						el.check = false
					})
				} else {
					item.allCheck = true
					item.list.forEach((el, index) => {
						el.check = true
					})
				}
				this.cartAllCheck('goodsCheck')
			},
			// 商品选中
			goodsCheck(goods) {
				goods.check = !goods.check
				this.cartAllCheck('goodsCheck')
			},
			// 全选判断
			cartAllCheck(type) {
				let allArr = [];
				let totalMoney = 0
				let totalNum = 0
				this.cartList.valid.forEach((el, index) => {
					if (type == 'goodsCheck') {
						let tempArr = el.list.filter(goods => {
							return goods.check == true
						})
						if (el.list.length == tempArr.length) {
							el.allCheck = true
							allArr.push(el)
						} else {
							el.allCheck = false
						}
					} else {
						el.list.forEach((goods) => {
							goods.check = this.isAllSelect
						})
						el.allCheck = this.isAllSelect
						if (el.allCheck) allArr.push(el)
					}
					// 总金额 //总数
					el.list.forEach(e => {
						if (e.check) {
							totalMoney = this.$util.$h.Add(totalMoney, this.$util.$h.Mul(e.productAttr.price, e.cart_num))
							totalNum += e.cart_num
						}
					})
				})
				this.cartCount = totalNum
				this.selectCountPrice = totalMoney
				// 全选
				this.isAllSelect = allArr.length == this.cartList.valid.length ? true : false
			},
			// 购物车全选
			checkboxAllChange() {
				this.isAllSelect = !this.isAllSelect
				this.cartAllCheck('cartCheck')
			},
			// 推荐列表
			getHostProduct: function() {
				let that = this;
				if (that.loadend) return;
				if (that.hotScroll) return;
				that.loading = true;
				that.loadTitle = "加载更多";
				getProductHot(
					that.hotPage,
					that.hotLimit,
				).then(res => {
					let list = res.data.list || [];
					that.hotPage++
					that.hotScroll = res.data.list.length < that.hotLimit
					that.hostProduct = that.hostProduct.concat(res.data.list)
					that.loading = false;
					that.loadTitle = that.hotScroll ? "我也是有底线的" : '加载更多';
				});
			},
			// 失效商品展开
			goodsOpen: function() {
				let that = this;
				that.goodsHidden = !that.goodsHidden;
			},
			// 管理
			manage: function() {
				let that = this;
				that.footerswitch = !that.footerswitch;
			},
			// 清空
			unsetCart: function() {
				let that = this,ids = [];
				for (let i = 0, len = that.cartList.invalid.length; i < len; i++) {
					ids.push(that.cartList.invalid[i].cart_id);
				}
				cartDel({
					cart_id:ids
				}).then(res => {
					that.$util.Tips({
						title: '清除成功'
					});
					that.getCartNum();
					that.$set(that.cartList, 'invalid', []);
				}).catch(res => {});
			},
			// 店铺优惠券
			giveCoupon(item){
				let that = this;
				let goodsArr = []
				let couponList = [];
				let activeList = [];
				let ids = []
				item.list.map(el=>{
					ids.push(el.product_id)
				})
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				getCoupons({
					ids:ids.join(',')
				}).then(res => {
					goodsArr = res.data
					getShopCoupons(item.mer_id).then(({data})=>{
						uni.hideLoading();
						couponList = goodsArr.concat(data)
						this.$set(this.coupon, 'list', couponList);
						this.$set(this.coupon, 'coupon', true);
					}).catch(error=>{})
				});
			},
			ChangCouponsClone: function() {
				this.$set(this.coupon, 'coupon', false)
			},
			ChangCouponsUseState(index) {
				let that = this;
				that.coupon.list[index].issue = true;
				console.log(that.coupon.list[index])
			},
		},
		onReachBottom() {
			this.recommend && this.getHostProduct();
		},
		// 滚动监听
		onPageScroll(e) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			uni.$emit('scroll');
		}
	}
</script>

<style scoped lang="scss">
	.shoppingCart .labelNav {
		height: 76rpx;
		padding: 0 30rpx;
		font-size: 22rpx;
		color: #8c8c8c;
		position: fixed;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		background-color: #f5f5f5;
		z-index: 5;
		top: 0;
	}
	.icon-xiala1{
		display: inline-block;
		transform: rotate(180deg);
		font-size: 14rpx;
		padding: 0 5rpx;
	}
	.shoppingCart .labelNav .item .iconfont {
		font-size: 25rpx;
		margin-right: 10rpx;
	}
	.t-color {
		color: var(--view-theme);
	}
	.shoppingCart {
		/* #ifndef MP */
		padding-bottom: 180rpx;
		/* #endif */
		/* #ifdef MP */
		padding-bottom: calc(180rpx+ constant(safe-area-inset-bottom));
		padding-bottom: calc(180rpx + env(safe-area-inset-bottom));
		/* #endif */
	}
	.shoppingCart .nav {
		width: 100%;
		height: 80rpx;
		background-color: #fff;
		padding: 0 30rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		color: #282828;
		position: fixed;
		left: 0;
		z-index: 5;
		top: 76rpx;
	}
	.shoppingCart .nav .administrate {
		font-size: 26rpx;
		color: #282828;
		width: 110rpx;
		height: 46rpx;
		border-radius: 6rpx;
		border: 1px solid #868686;
	}
	.shoppingCart .noCart {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		background-color: #fff;
		padding-top: 0.1rpx;
	}
	.shoppingCart .noCart .pictrue {
		text-align: center;
		margin: 78rpx auto 56rpx auto;
		padding-bottom: 60rpx;
	}
	.shoppingCart .noCart .pictrue image {
		width: 414rpx;
		height: 305rpx;
	}
	.shoppingCart .noCart .pictrue view{
		color: #999;
	}
	.shoppingCart .list {
		margin: 171rpx 0 20rpx;
	}
	.shoppingCart .list .item {
		background-color: #fff;
		margin-bottom: 15rpx;
		.store-title {
			display: flex;
			align-items: center;
			width: 100%;
			padding: 0 30rpx;
			height: 85rpx;
			border-bottom: 1px solid #f0f0f0;
			.checkbox {
				width: 60rpx;
				.iconfont {
					font-size: 40rpx;
					color: #CCCCCC;
				}
				.icon-xuanzhong1 {
					color: var(--view-theme);
				}
			}
			.info {
				flex: 1;
				display: flex;
				align-items: center;
				.iconfont {
					font-size: 36rpx;
				}
				.name {
					margin: 0 0 0 10rpx;
					font-size: 28rpx;
					color: #282828;
					font-weight: bold;
				}
				.icon-xiangyou {
					margin-top: 6rpx;
					font-size: 22rpx;
					color: #999;
				}
			}
			.coupon-btn {
				color: var(--view-theme);
				font-size: 22rpx;
				width: 100rpx;
				line-height: 36rpx;
				background: var(--view-minorColor);
				border-radius: 18rpx;
				text-align: center;
			}
		}
	}
	.vipImg {
		width: 65rpx;
		height: 28rpx;
		margin-left: 10rpx;
		image {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
	.shoppingCart .list .item .picTxt {
		width: 100%;
		padding: 25rpx 30rpx;
		position: relative;
		align-items: center;
		border-bottom: 1px solid #f0f0f0;
		.checkbox {
			width: 60rpx;
			.iconfont {
				font-size: 40rpx;
				color: #CCCCCC;
			}
			.icon-xuanzhong1 {
				color: var(--view-theme);
			}
		}
	}
	.shoppingCart .list .item .picTxt .pictrue {
		width: 160rpx;
		height: 160rpx;
	}
	.shoppingCart .list .item .picTxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}
	.shoppingCart .list .item .picTxt .text {
		width: 444rpx;
		margin-left: 20rpx;
		font-size: 28rpx;
		color: #282828;
	}
	.shoppingCart .list .item .picTxt .buy_limit {
		margin-top: 10rpx;
		color: #E93323;
		font-size: 22rpx;
	}
	.shoppingCart .list .item .picTxt .text .infor {
		display: inline-block;
		padding: 6rpx;
		border-radius: 4rpx;
		font-size: 24rpx;
		color: #868686;
		margin-top: 16rpx;
		background-color: #F5F5F5;
		max-width: 460rpx;
	}
	.shoppingCart .list .item .picTxt .text .money {
		font-size: 32rpx;
		color: #282828;
		margin-top: 28rpx;
	}
	.shoppingCart .list .item .picTxt .carnum {
		height: 47rpx;
		position: absolute;
		bottom: 30rpx;
		right: 30rpx;
	}
	.shoppingCart .list .item .picTxt .carnum view {
		border: 1px solid #a4a4a4;
		min-width: 66rpx;
		text-align: center;
		height: 100%;
		line-height: 46rpx;
		font-size: 28rpx;
		color: #a4a4a4;
	}
	.shoppingCart .list .item .picTxt .carnum .reduce {
		border-right: 0;
		border-radius: 3rpx 0 0 3rpx;
	}
	.shoppingCart .list .item .picTxt .carnum .reduce.on {
		border-color: #e3e3e3;
		color: #dedede;
	}
	.shoppingCart .list .item .picTxt .carnum .plus {
		border-left: 0;
		border-radius: 0 3rpx 3rpx 0;
	}
	.shoppingCart .list .item .picTxt .carnum .num {
		color: #282828;
	}
	.shoppingCart .invalidGoods {
		background-color: #fff;
	}
	.shoppingCart .invalidGoods .goodsNav {
		width: 100%;
		height: 66rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		color: #282828;
	}
	.shoppingCart .invalidGoods .goodsNav .iconfont {
		color: #424242;
		font-size: 28rpx;
		margin-right: 17rpx;
	}
	.shoppingCart .invalidGoods .goodsNav .del {
		font-size: 26rpx;
		color: #999;
	}
	.shoppingCart .invalidGoods .goodsNav .del .icon-shanchu1 {
		color: #999;
		font-size: 33rpx;
		vertical-align: -2rpx;
		margin-right: 8rpx;
	}
	.shoppingCart .invalidGoods .goodsList .item {
		padding: 20rpx 30rpx;
		border-top: 1px solid #f5f5f5;
	}
	.shoppingCart .invalidGoods .goodsList .item .invalid {
		font-size: 22rpx;
		color: #fff;
		width: 70rpx;
		height: 36rpx;
		background-color: #aaa;
		border-radius: 3rpx;
		text-align: center;
		line-height: 36rpx;
	}
	.shoppingCart .invalidGoods .goodsList .item .pictrue {
		width: 140rpx;
		height: 140rpx;
	}
	.shoppingCart .invalidGoods .goodsList .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}
	.shoppingCart .invalidGoods .goodsList .item .text {
		width: 433rpx;
		font-size: 28rpx;
		color: #999;
		height: 140rpx;
	}
	.shoppingCart .invalidGoods .goodsList .item .text .name {
		width: 100%;
	}
	.shoppingCart .invalidGoods .goodsList .item .text .infor {
		font-size: 24rpx;
	}
	.shoppingCart .invalidGoods .goodsList .item .text .end {
		font-size: 26rpx;
		color: #bbb;
	}
	.shoppingCart .footer {
		z-index: 9;
		width: 100%;
		height: 96rpx;
		background-color: #fafafa;
		position: fixed;
		padding: 0 30rpx;
		box-sizing: border-box;
		border-top: 1px solid #eee;
		bottom: 98rpx;
		bottom: calc(98rpx + constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		bottom: calc(98rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
	}
	.shoppingCart .footer.on {
		// #ifndef H5
		bottom: 0rpx;
		// #endif
	}
	.shoppingCart .footer .checkAll {
		font-size: 28rpx;
		color: #282828;
		margin-left: 16rpx;
	}
	.shoppingCart .footer .money {
		font-size: 30rpx;
	}
	.shoppingCart .footer .placeOrder {
		color: #fff;
		font-size: 30rpx;
		width: 226rpx;
		height: 70rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 70rpx;
		margin-left: 22rpx;
		background-color: var(--view-theme);
	}
	.shoppingCart .footer .button .bnt {
		font-size: 28rpx;
		color: #999;
		border-radius: 50rpx;
		border: 1px solid #999;
		width: 160rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		&.bt-color {
			color: var(--view-theme);
			border: 1px solid var(--view-theme);
		}
	}
	.shoppingCart .footer .button form~form {
		margin-left: 17rpx;
	}
	.allcheckbox {
		display: flex;
		align-items: center;
		width: 260rpx;
		.iconfont {
			margin-right: 20rpx;
			font-size: 40rpx;
			color: #CCCCCC;
		}
		.icon-xuanzhong1 {
			color: var(--view-theme);
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
		border-top: solid 1px #F3F3F3;
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

