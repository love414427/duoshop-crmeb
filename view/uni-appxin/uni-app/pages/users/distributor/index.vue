<template>
	<view class="distributor" :style="viewColor">
		<view class="headerBg" :style="{ 'background-image': `url(${domain}/static/diy/distribution${keyColor}.png)` }">
			<view v-if="openActivity" class="explain" @click="explain">分销说明</view>
			<view class="picTxt acea-row row-middle">
				<view class="pictrue">
					<image class="avatar" :src='userInfo.avatar' v-if="userInfo.avatar"></image>
					<image v-else class="avatar" src="/static/images/f.png" mode=""></image>
				</view>
				<view class="text">
					<view class="name line1">{{userInfo.nickname}}</view>
					<view class="info line1">直接推广人越多，获得的奖励越多哦！</view>
				</view>
			</view>
		</view>
		<!-- menu -->
		<view class='nav acea-row' v-if="menus.length && openActivity">
			<block v-for="(item,index) in menus" :key="index">
				<view class='item'>
					<view class='pictrue' style="width: 90rpx; height: 90rpx; background-color: #FFF8EC; border-radius: 100%; text-align: center;">
						<image :src='item.img'></image>
					</view>
					<view class="menu-txt area-row">{{item.title}}</view>
				</view>
			</block>
		</view>
		<!-- 推荐礼包 -->
		<view class="recommend" v-if="openActivity">
			<view v-if="fastList.length > 0" class="public_title acea-row row-center-wrapper">
				<image :src="domain+'/static/diy/linefx'+keyColor+'.png'"></image>
				<view class="name">推荐礼包</view>
				<image :src="domain+'/static/diy/linefx'+keyColor+'.png'" class="right"></image>
			</view>
			<view v-if="fastList.length > 0" class='scroll-product'>
				<scroll-view class="scroll-view_x" scroll-x style="width:auto;overflow:hidden;">
					<block v-for="(item,index) in fastList" :key='index'>
						<view class="itemCon">
							<view class="item acea-row row-right">
								<view class="picTxt acea-row row-between-wrapper" @click="godDetail(item)">
									<view class="pictrue">
										<image :src="item.image"></image>
									</view>
									<view class="text">
										<view class="name line1">{{item.store_name}}</view>
										<text v-if="item.merchant && item.merchant.type_name" class="font-bg-red mt8 b-color">{{item.merchant.type_name}}</text>
										<text v-else-if="item.merchant && item.merchant.is_trader" class="font-bg-red mt8  b-color">自营</text>
										<view class="acea-row row-bottom">
											<view class="money p-color">￥<text class="num">{{item.price}}</text></view>
											<!-- <view v-if="item.show_svip_info.show_svip_price && item.svip_price" class="acea-row row-middle">
												<text class='vip-money'>￥{{item.svip_price}}</text>
												<view class="vipImg">
													<image src="/static/images/svip.png"></image>
												</view>
											</view> -->
										</view>
										
									</view>
								</view>
								<view class="circular bg-color-red"></view>
								<view class="open b-color" @click="goBuy(item)">立即开通</view>
							</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</view>
		<view class="pin" v-if="openActivity">
			<view class="public_title acea-row row-center-wrapper">
				<image :src="domain+'/static/diy/linefx'+keyColor+'.png'"></image>
				<view class="name">分销礼包</view>
				<image :src="domain+'/static/diy/linefx'+keyColor+'.png'" class="right"></image>
			</view>
			<view class="list">
				<view class="item acea-row row-between-wrapper" v-for="(item, index) in distribution" :key='index' @click="godDetail(item)">
					<view class="pictrue">
						<image :src="item.image"></image>
					</view>
					<view class="text">
						<view class="name line2">
							<text v-if="item.merchant && item.merchant.type_name" class="font-bg-red ml8 b-color">{{item.merchant.type_name}}</text>
							<text v-else-if="item.merchant && item.merchant.is_trader" class="font-bg-red ml8 b-color">自营</text>
							{{item.store_name}}
						</view>
						<view class="acea-row row-bottom">
							<view class="money p-color">￥<text class="num">{{item.price}}</text></view>
							<!-- <view v-if="item.show_svip_info.show_svip_price && item.svip_price" class="acea-row row-middle">
								<text class='vip-money'>￥{{item.svip_price}}</text>
								<view class="vipImg">
									<image src="/static/images/svip.png"></image>
								</view>
							</view> -->
							<view class="open b-color" @click.stop="goBuy(item)">立即开通</view>
						</view>
						
						
					</view>
				</view>
			</view>
			<view class='loadingicon acea-row row-center-wrapper' v-if='distribution.length > 0 '>
				<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadTitle}}
			</view>
		</view>
		<view class="explainTxt" :class="explainShow?'on':''">
			<view class="name">分销说明<text class="iconfont icon-guanbi" @click="close"></text></view>
			<view class="conter">{{explainTxt}}</view>
		</view>
		<view class="mask" v-if="explainShow"></view>
		<!-- 组件 -->
		<productWindow :attr="attr" :isShow='1' :iSplus='1' :destri='1' @myevent="onMyEvent" @ChangeAttr="ChangeAttr"
		 @attrVal="attrVal" @iptCartNum="iptCartNum" @goCat="goPay" id='product-window'></productWindow>
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
	import { getUserInfo } from '@/api/user.js';
	import { goShopDetail } from '@/libs/order.js'
	import { postCartAdd } from '@/api/store.js';
	import { bagExplain, bagRecommend, productBag, getProductDetail } from '@/api/store.js';
	import ProductWindow from "@/components/productWindow";
	import { mapGetters } from "vuex";
	import { HTTP_REQUEST_URL } from '@/config/app';
	export default {
		components: {
			ProductWindow
		},
		computed: mapGetters(['viewColor','keyColor']),
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				explainShow: false,
				menus: [],
				fastList: [],
				userInfo: {},
				distribution: [],
				explainTxt: '',
				attr: {
					cartAttr: false,
					productAttr: [],
					productSelect: {}
				},
				productValue: [], //系统属性
				storeInfo: {},
				attrValue: '', //已选属性
				attrTxt: '请选择', //属性页面提示
				cart_num: 1, //购买数量
				id: 0, //产品id
				loadend: false,
				loading: false,
				loadTitle: '加载更多',
				where: {
					page: 1,
					limit: 20,
				},
				openActivity: false,
			}
		},
		onLoad() {},
		onShow: function() {
			this.bagExplain();
			this.productBag();	
			this.bagRecommend();		
			this.getUserInfo();
		},
		// 滚动到底部
		onReachBottom() {
			this.productBag();
		},
		methods: {
			goBuy: function(item) {
				let that = this;
				that.id = item.product_id;
				that.getGoodsDetails(item);
			},
			onMyEvent: function() {
				this.$set(this.attr, 'cartAttr', false);
			},
			/**
			 * 获取产品详情
			 * 
			 */
			getGoodsDetails: function(item) {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let that = this;
				getProductDetail(item.product_id).then(res => {
					uni.hideLoading();
					that.attr.cartAttr = true;
					let storeInfo = res.data;
					that.$set(that, 'storeInfo', storeInfo);
					that.$set(that.attr, 'productAttr', res.data.attr);
					that.$set(that, 'productValue', res.data.sku);
					that.DefaultSelect();
				}).catch(err => {
					uni.hideLoading();
				})
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
					this.$set(this, "attrTxt", "已选择");
				} else {
					this.$set(this.attr.productSelect, "image", this.storeInfo.image);
					this.$set(this.attr.productSelect, "price", this.storeInfo.price);
					this.$set(this.attr.productSelect, "stock", 0);
					this.$set(this.attr.productSelect, "unique", "");
					this.$set(this.attr.productSelect, "cart_num", 0);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "请选择");
				}
			},
			/**
			 * 默认选中属性
			 * 
			 */
			DefaultSelect: function() {
				let productAttr = this.attr.productAttr;
				let value = [];
				let arr = [];
				let unSortArr = [];
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
						this.storeInfo.store_name
					);
					this.$set(this.attr.productSelect, "image", this.storeInfo.image);
					this.$set(this.attr.productSelect, "price", this.storeInfo.price);
					this.$set(this.attr.productSelect, "stock", 0);
					this.$set(this.attr.productSelect, "unique", "");
					this.$set(this.attr.productSelect, "cart_num", 0);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "请选择");
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
					this.$set(this, "attrTxt", "请选择");
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
					this.$set(this, "attrTxt", "已选择");
					if (productSelect.stock == 0) {
						this.$set(this.attr.productSelect, "cart_num", 0);
					} else {
						this.$set(this.attr.productSelect, "cart_num", 1);
					}
				}
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
			 * 购物车手动填写
			 * 
			 */
			iptCartNum: function(e) {
				this.$set(this.attr.productSelect, 'cart_num', e);
			},
			// 立即购买
			goPay() {
				let that = this,
					productSelect = that.productValue[this.attrValue];
				if (
					that.attr.productAttr.length &&
					productSelect.stock == 0
				)
					return that.$util.Tips({
						title: "产品库存不足，请选择其它"
					});
				let q = {
					product_id: that.id,
					cart_num: Number(that.attr.productSelect.cart_num),
					is_new: 1,
					product_attr_unique: that.attr.productSelect !== undefined ? that.attr.productSelect.unique : ""
				};
				postCartAdd(q)
					.then(function(res) {
						that.attr.cartAttr = false;
						uni.navigateTo({
							url: '/pages/users/order_confirm/index?cartId=' + res.data.cart_id
						});
					})
					.catch(res => {
						return that.$util.Tips({
							title: res
						});
					});
			},

			// 去商品详情
			godDetail(item) {
				goShopDetail(item).then(res => {
					uni.navigateTo({
						url: `/pages/goods_details/index?id=${item.product_id}`
					})
				})
			},
			// 分销
			productBag: function() {
				let that = this;
				if (that.loadend) return;
				if (that.loading) return;
				that.loading = true;
				that.loadTitle = '';
				productBag(that.where).then(res => {
					let list = res.data.list;
					let productList = that.$util.SplitArray(list, that.distribution);
					let loadend = list.length < that.where.limit;
					that.loadend = loadend;
					that.loading = false;
					that.loadTitle = loadend ? '已全部加载' : '加载更多';
					that.$set(that, 'distribution', productList);
					that.$set(that.where, 'page', that.where.page + 1);
				}).catch(err => {
					that.loading = false;
					that.loadTitle = '加载更多';
				});
			},
			// 推荐
			bagRecommend: function() {
				let that = this;
				bagRecommend().then(res => {
					this.fastList = res.data.list
				})
			},
			/**
			 * 获取个人用户信息
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.userInfo = res.data
				});
			},
			// 说明以及导航
			bagExplain: function() {
				let that = this;
				bagExplain().then(res => {
					let data = res.data;
					this.menus = data.data;
					this.explainTxt = data.explain;
					this.openActivity = true
				}).catch(res => {
					this.openActivity = false
					return that.$util.Tips({
						title: res
					});
				});
			},

			explain() {
				this.explainShow = true;
			},
			close() {
				this.explainShow = false;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
	.area-row {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
		width: 80%;
		text-align: center;
	}
	.b-color {
		border: 1rpx solid var(--view-theme);
		background-color: var(--view-theme);
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
			width: 100%;
			height: 100%;
			display: block;
		}
	}
	.distributor {
		.headerBg {
			width: 100%;
			height: 371rpx;
			//background-image: url('data:image/png;base64,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');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			position: relative;
			.explain {
				position: absolute;
				top: 30rpx;
				right: 0;
				width: 134rpx;
				height: 40rpx;
				background: linear-gradient(-90deg, rgba(239, 215, 168, 1) 0%, rgba(248, 230, 193, 1) 100%);
				border-radius: 20px 0px 0px 20px;
				color: var(--view-theme);
				font-size: 24rpx;
				font-weight: 500;
				text-align: center;
				line-height: 40rpx;
			}
			.picTxt {
				position: absolute;
				left: 60rpx;
				bottom: 38rpx;
				.pictrue {
					width: 84rpx;
					height: 84rpx;
					border-radius: 50%;
					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.text {
					font-size: 34rpx;
					color: #814C07;
					margin-left: 19rpx;
					width: 500rpx;
				}
				.info {
					font-size: 28rpx;
					color: #BB8D59;
					margin-top: 10rpx;
				}
			}
		}
		.nav {
			padding: 0 0rpx 30rpx;
			flex-wrap: wrap;
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 25%;
				margin-top: 30rpx;
				image {
					width: 48rpx;
					height: 48rpx;
					border-radius: 50%;
					position: relative;
					top: 20rpx;							
				}
				.picture{
					border: 40rpx solid #FFF8EC;					
				}				
				.menu-txt {
					color: #B99450;
					font-size: 32rpx;
					margin-top: 20rpx;
				}
			}
		}
		
		.public_title {
			margin-top: 20rpx;
			image {
				width: 119rpx;
				height: 15rpx;
				&.right {
					transform: rotate(180deg);
				}
			}
			.name {
				font-size: 34rpx;
				color: var(--view-theme);
				margin: 0 19rpx;
			}
		}
		.recommend {
			.scroll-product {
				white-space: nowrap;
				margin-top: 45rpx;
				padding-left: 30rpx;
				height: 200rpx;
				.scroll-view_x {
					height: 100%;
				}
				.itemCon {
					display: inline-block;
					.item {
						width: 430rpx;
						height: 156rpx;
						margin-right: 30rpx;
						border-radius: 8rpx;
						position: relative;
						box-shadow: 0 10rpx 20rpx -5rpx #eee;
						.circular {
							width: 20rpx;
							height: 20rpx;
							border-radius: 50%;
							position: absolute;
							top: 50%;
							margin-top: -10rpx;
							right: 40rpx;
						}
						.open {
							width: 60rpx;
							writing-mode: vertical-lr;
							writing-mode: tb-lr;
							color: #fff;
							height: 100%;
							text-align: center;
							line-height: 70rpx;
							border-radius: 0 8rpx 8rpx 0;
							border: none;
						}
						.picTxt {
							width: 382rpx;
							height: 100%;
							border-radius: 0 8rpx 8rpx 0;
							position: absolute;
							left: 0;
							top: 0;
							background-color: #fff;
							.pictrue {
								width: 156rpx;
								height: 100%;
								image {
									width: 100%;
									height: 100%;
									border-radius: 8rpx 0 0 8rpx;
								}
							}
							.text {
								width: 210rpx;
								padding-right: 10rpx;
								box-sizing: border-box;
								.name {
									width: 210rpx;
									font-size: 26rpx;
									color: #282828;
									white-space: nowrap;
									text-overflow: ellipsis;
									overflow: hidden;
								}
								.money {
									font-size: 28rpx;
									margin-top: 26rpx;
									color: var(--view-priceColor);
									.num {
										font-size: 32rpx;
									}
								}
							}
						}
					}
				}
			}
		}
		.pin {
			.list {
				padding-left: 30rpx;
				margin-top: 50rpx;
				.item {
					position: relative;
					.pictrue {
						width: 210rpx;
						height: 210rpx;
						border-radius: 16px;
						image {
							width: 100%;
							height: 100%;
						}
					}
					&~.item {
						margin-top: 60rpx;
						.text {
							&::after {
								width: 100%;
								height: 1px;
								position: absolute;
								content: '';
								top: -30rpx;
								background-color: #F0F0F0;
							}
						}
					}
					.text {
						position: relative;
						width: 460rpx;
						font-size: 30rpx;
						color: #282828;
						padding-right: 30rpx;
						.name {
							height: 75rpx;
						}
						.money {
							font-size: 28rpx;
							margin-top: 75rpx;
							color: var(--view-priceColor);
							.num {
								font-size: 36rpx;
							}
						}
						.open {
							position: absolute;
							right: 0;
							bottom: 0;
							width: 144rpx;
							height: 48rpx;
							border-radius: 24rpx;
							color: #fff;
							text-align: center;
							line-height: 48rpx;
							font-size: 24rpx;
							right: 30rpx;
							border: none;
						}
					}
				}
			}
		}
		.explainTxt {
			position: fixed;
			top: 20%;
			left: 50%;
			width: 600rpx;
			background-color: #fff;
			margin-left: -300rpx;
			border-radius: 8rpx;
			z-index: 32;
			padding: 33rpx;
			transition: all 0.3s ease-in-out 0s;
			opacity: 0;
			transform: scale(0);
			&.on {
				opacity: 1;
				transform: scale(1);
			}
			.name {
				font-size: 38rpx;
				position: relative;
				text-align: center;
				color: var(--view-theme);
				.iconfont {
					position: absolute;
					color: #999999;
					font-size: 37rpx;
					top: -10rpx;
					right: 0rpx;
				}
			}
			.conter {
				margin-top: 30rpx;
				font-size: 26rpx;
				color: #282828;
				line-height: 1.6;
				max-height: 600rpx;
				overflow-y: auto;
			}
		}
	}
</style>
