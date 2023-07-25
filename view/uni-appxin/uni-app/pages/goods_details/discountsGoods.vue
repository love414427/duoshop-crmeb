<template>
	<view :style="viewColor">
		<view class="container" :class="popup.show==true?'on':''">
			<view class="header">
				<text class="title">优惠套餐({{discountsTotal}})</text>
				<text class="iconfont icon-guanbi5" @tap.stop="closePopup"></text>
			</view>
			<view class="main_count">
				<scroll-view scroll-y="true">
					<view v-for="(item, index) in discountsData" :key="index" class="list">
						<view class="acea-row list_title">
							<view class="combo_list_name">
								<image class="title_icon" src="/static/images/combo_title.png"></image>
								<view class="name line1">套餐{{index+1}}: {{item.title}}</view>
							</view>
							<view class="combo_list_money">￥{{item.total_price}}</view>
						</view>
						<view v-if="item.is_time == 1">
							<view class="comb_time">
								<text class="count-time">距套餐结束：</text>
								<countDown class="spike-count" :tip-text="' '" :day-text="'天'" :hour-text="':'" :minute-text="':'" :second-text="' '" :isDay="true" :datatime="item.stop_time" :isTheme="true" :isView="true"></countDown>
							</view>
						</view>
						<block v-for="(itemn, indexn) in item.discountsProduct" :key="indexn">
								<view class="pro_list">
									<view v-if="item.type == 1 && indexn!=0" class="checkbox" @tap.stop="checkedChange(item,itemn)">
										<text v-if="itemn.checked" class="iconfont icon-xuanzhong1"></text>
										<text v-else class="iconfont icon-weixuanzhong"></text>											
									</view>
									<view v-if="item.type == 1 && indexn ==0" class="checkbox">
										<text class="iconfont icon-xuanzhong3"></text>
									</view>									
									<view class="picture">
										<image :src="itemn.image" class="image"></image>
										<text v-if="itemn.product_id == id" class="current_pro">当前商品</text>
									</view>
									<view class="info">
										<view class="name line2">{{itemn.store_name}}</view>
										<view class="list_attr" @click="selecAttr(index,indexn)">
											<text class="line1">
											{{itemn.attr || '默认'}}
											</text>
											<text class="iconfont icon-xiangxia"></text>																						
										</view>
										<view class="price">
											<text>
											￥{{itemn.product.price}}
											</text>
											<text class="ot_price">
											￥{{itemn.product.ot_price}}
											</text>
										</view>
									</view>
								</view>
							</block>						
						<view class="save_money">省: ¥ {{item.checked_save_money}}</view>
						<view v-if="item.is_limit == 0 || (item.is_limit == 1 && item.limit_num > 0)" class="btn" @click="subData(index)">
							购买此套餐{{item.checked_num}}件商品
						</view>
						<view v-else-if="item.is_limit == 1 && item.limit_num <= 0" class="btn disabled">
							套餐已售罄
						</view>
					</view>
				</scroll-view>				
			</view>	
		</view>
		<view class='mask' catchtouchmove="true" :hidden='popup.show==false' @tap="closePopup"></view>
		<productWindow :attr="attr" :isShow="1" :title="selectTitle" :iSplus="1" @myevent="onMyEvent"
			@ChangeAttr="ChangeAttr" @attrVal="attrVal" @iptCartNum="iptCartNum" id="product-window" @goCat="goOrder()">
		</productWindow>
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
	import { goShopDetail } from '@/libs/order.js'
	import { discountsCartAdd, getDiscountsLst } from '@/api/store.js';
	import productWindow from './productWindow.vue'
	import { mapGetters } from "vuex";
	import countDown from '@/components/countDown';
	export default {
		components: {
			productWindow,
			countDown
		},
		props:{
			uid: {
				type: Number,
			},
			id: {
				type:  String|| Number,
			}
		},
		computed: mapGetters(['viewColor']),
		data() {
			return {
				discountsData: [],
				discountsTotal: 0,
				popup: {
					show: false
				},
				attr: {
					cartAttr: false,
					productAttr: [],
					productSelect: {},
				},
				productValue: [], //系统属性
				isOpen: false, //是否打开属性组件
				attrValue: [],
				attrTxt: "",
				selectAttr: [],
				selectValue: [], //选中的ID
				proNum: 0,
				images: [],
				selectCountPrice: [],
				selectTitle: "",
				seleNum: 0,
				isFirst: true,
				seleIndexn: -1,
				seleIndex: -1,
				unique: "0"
			};
		},
		mounted(){	
			this.$nextTick(function() {
				
			})
				
		},
		methods: {
			// 点击关闭按钮
			closePopup() {
				this.$set(this.popup, 'show', false);
			},
			showPopup(id) {
				this.id = id
				this.$set(this.popup, 'show', true);
				this.getList();	
			},
			initAttr(){
				this.discountsData.map((v, i) => {
					this.getData(i)
				})
			},
			getData(index){
				this.discountsData[index].discountsProduct.forEach((item, i) => {
					this.attr.productAttr = item.product.attr;	
					this.productValue = item.product.sku				
					this.DefaultSelect(index,i)				
					this.getPrice(this.discountsData[index])										
				})
			},
			/*获取套餐列表数据*/
			getList(){
				getDiscountsLst({product_id: this.id}).then(res => {
					res.data.list.forEach((item, index) => {
						item.total_price = 0;
						item.checked_num = item.count;
						item.checked_save_money = 0;
						item.discountsProduct.forEach((v, i) => {
							this.$set(v,'checked',true)
							this.$set(v,'attr','')
							this.$set(v,'unique','')
							item.total_price += parseFloat(v.product.price)				
							item.checked_save_money += (parseFloat(v.product.ot_price) - parseFloat(v.product.price)).toFixed(2)
						})					
					})	
					this.discountsTotal = res.data.count;
				    this.discountsData = res.data.list;
					this.initAttr()
				}).catch(err => {
					
				});
			},
			/**
			 * 购物车手动填写
			 *
			 */
			iptCartNum: function(e) {	
				this.$set(this.attr.productSelect, 'cart_num', e);
			},
			/**
			 * 打开属性插件
			 */
			selecAttr: function(index, n) {
				this.proNum = index
				this.seleNum = n
				this.selectTitle = this.discountsData[index].discountsProduct[n].product.store_name
				this.attr.productAttr = this.discountsData[index].discountsProduct[n].product.attr
				this.productValue = this.discountsData[index].discountsProduct[n].product.sku
				if(this.isFirst || (!this.isFirst &&
				 (this.seleIndex != index && this.seleIndexn != n || this.seleIndex == index && this.seleIndexn != n || this.seleIndex != index && this.seleIndexn == n) || this.unique != this.attr.productSelect.unique)){
					this.DefaultSelect(index,n)
				}
				this.seleIndex = index;this.seleIndexn = n
				this.isFirst = false
				
				this.$nextTick((e) => {
					this.$set(this.attr, 'cartAttr', true);
					this.$set(this, 'isOpen', true);
				})
			},
			attrVal(val) {
				this.$set(this.attr.productAttr[val.indexw], 'index', this.attr.productAttr[val.indexw]
				.attr_values[val.indexn]);
			},
			/**
			* 属性变动赋值
			*
			*/
			ChangeAttr: function(res) {
				let productSelect = this.productValue[res];
				if (productSelect && productSelect.stock > 0) {
					this.$set(this.attr.productSelect, 'image', productSelect.image);
					this.$set(this.attr.productSelect, 'price', productSelect.price);
					this.$set(this.attr.productSelect, 'stock', productSelect.stock);
					this.$set(this.attr.productSelect, 'product_stock', productSelect.stock);
					this.$set(this.attr.productSelect, 'unique', productSelect.unique);
					this.$set(this, 'unique', productSelect.unique);
					this.$set(this.attr.productSelect, 'cart_num', 1);										
					this.$set(this.discountsData[this.proNum].discountsProduct[this.seleNum], 'attr', res || "");
					this.$set(this.discountsData[this.proNum].discountsProduct[this.seleNum]['product'], 'price', productSelect.price || 0);
					this.$set(this.discountsData[this.proNum].discountsProduct[this.seleNum]['product'], 'ot_price', productSelect.ot_price || 0);
					
					this.$set(this.discountsData[this.proNum].discountsProduct[this.seleNum], 'unique', productSelect.unique || "");			
				} else {
					this.$set(this.attr.productSelect,"store_name",this.discountsData[0].discountsProduct[0].product.store_name
					);
					this.$set(this.attr.productSelect, "image", this.discountsData[0].discountsProduct[0].product.image);
					this.$set(this.attr.productSelect, "price", this.discountsData[0].discountsProduct[0].product.price);
					this.$set(this.attr.productSelect, "ot_price", this.discountsData[0].discountsProduct[0].product.ot_price);
					this.$set(this.attr.productSelect, "product_stock", 0);
					this.$set(this.attr.productSelect,"unique", "");
					return;
				}
				this.getPrice(this.discountsData[this.proNum])				
			},
						
			/**
			 * 默认选中属性
			 *
			 */
			DefaultSelect: function(index,indexn) {
				let productAttr = this.attr.productAttr;				
				let value = [];
				for (var key in this.productValue) {
					if (this.productValue[key].stock > 0) {
						value = this.attr.productAttr.length ? key.split(',') : [];
						break;
					}
				}
				for (let i = 0; i < productAttr.length; i++) {
					this.$set(productAttr[i], 'index', value[i]);
				}
				//sort();排序函数:数字-英文-汉字；
				let productSelect = this.productValue[value.join(',')];
				if (productSelect && productAttr.length) {
					this.$set(this.attr.productSelect, 'store_name', productSelect.store_name);
					this.$set(this.attr.productSelect, 'image', productSelect.image);
					this.$set(this.attr.productSelect, 'price', productSelect.price);
					this.$set(this.attr.productSelect, 'ot_price', productSelect.ot_price);
					this.$set(this.attr.productSelect, 'stock', productSelect.stock);
					this.$set(this.attr.productSelect, 'product_stock', productSelect.stock);
					this.$set(this.attr.productSelect, 'unique', productSelect.unique);
					this.$set(this, 'unique', productSelect.unique);
					this.$set(this.attr.productSelect, 'cart_num', 1);					
					this.$set(this.attr.productSelect, 'vip_price', productSelect.vip_price);					
					this.$set(this.discountsData[index].discountsProduct[indexn], 'unique', productSelect.unique || "");
					this.$set(this.discountsData[index].discountsProduct[indexn], 'attr', value.join(','));
					this.$set(this.discountsData[index].discountsProduct[indexn]['product'], 'price', productSelect.price);
					this.$set(this.discountsData[index].discountsProduct[indexn]['product'], 'ot_price', productSelect.ot_price);
					this.$set(this.discountsData[index].discountsProduct[indexn]['product'], 'ot_price', productSelect.ot_price);
				} else if (productSelect && !productAttr.length) {
					this.$set(this.attr.productSelect, 'store_name', productSelect.store_name);
					this.$set(this.attr.productSelect, 'image', productSelect.image);
					this.$set(this.attr.productSelect, 'price', productSelect.price);
					this.$set(this.attr.productSelect, 'ot_price', productSelect.ot_price);
					this.$set(this.attr.productSelect, 'stock', productSelect.stock);
					this.$set(this.attr.productSelect, 'product_stock', productSelect.stock);
					this.$set(this.attr.productSelect, 'unique', productSelect.unique || '');
					this.$set(this, 'unique', productSelect.unique);
					this.$set(this.attr.productSelect, 'cart_num', 1);
					this.$set(this.attr.productSelect, 'vip_price', productSelect.vip_price);
					this.$set(this.discountsData[index].discountsProduct[indexn]['product'], 'price', productSelect.price);
					this.$set(this.discountsData[index].discountsProduct[indexn]['product'], 'ot_price', productSelect.ot_price);
					this.$set(this.discountsData[index].discountsProduct[indexn], 'attr', '')
					this.$set(this.discountsData[index].discountsProduct[indexn], 'unique', productSelect.unique || "");
				}else if (!productSelect && !productAttr.length || !productSelect && productAttr.length) {
					this.$set(this.attr.productSelect,"store_name",this.discountsData[0].discountsProduct[0].product.store_name
					);
					this.$set(this.attr.productSelect, "image", this.discountsData[0].discountsProduct[0].product.image);
					this.$set(this.attr.productSelect, "price", this.discountsData[0].discountsProduct[0].product.price);
					this.$set(this.attr.productSelect, "ot_price", this.discountsData[0].discountsProduct[0].product.ot_price);
					this.$set(this.attr.productSelect, "product_stock", 0);
					this.$set(this.attr.productSelect,"unique", "");
					this.$set(this, 'unique', "");
				}
			},
			onMyEvent: function() {
				this.$set(this.attr, 'cartAttr', false);
				this.$set(this, 'isOpen', false);
			},		
			checkedChange(item,itemn) {
				itemn.checked = !itemn.checked
				if(itemn.checked){
					item.checked_num++
				}else{
					item.checked_num--;
				}
				this.getPrice(item)				
			},
			/*计算此套餐总价及节省价*/
			getPrice(item){
				let checked_save_money = 0;
				let total_price = 0;			
				item.discountsProduct.forEach((v, i) => {
					if(v.checked){
						checked_save_money += (parseFloat(v.product.ot_price) - parseFloat(v.product.price));
						total_price += parseFloat(v.product.price);
					}				
				})	
				this.$set(item, 'checked_save_money', checked_save_money);
				this.$set(item, 'total_price', total_price);
			},			
			subData(index) {
				let data = []
				let reqData = {
					is_new: 1,
					discount_id: this.discountsData[index].discount_id,
					data: [],				
				}
				if (this.discountsData[index].type == 0) {		
					this.selectValue = []
					this.discountsData[index].discountsProduct.map(v => {
						this.selectValue.push(v.discount_product_id + '')
					})
				} else {
					if (this.discountsData[index].checked_num < 2) {
						return this.$util.Tips({
							title: '请先选择套餐商品'
						});			
					}
					this.selectValue = []
					this.discountsData[index].discountsProduct.map(v => {
						if(v.checked){
							this.selectValue.push(v.discount_product_id + '')
						}				
					})
				}
				for (let i = 0; i < this.discountsData[index].discountsProduct.length; i++) {
					for (let j = 0; j < this.selectValue.length; j++) {
						if (this.discountsData[index].discountsProduct[i].discount_product_id == this.selectValue[j]) {	
							reqData.data.push({
								cart_num: 1,
								product_attr_unique: this.discountsData[index].discountsProduct[i].unique,
								product_id: this.discountsData[index].discountsProduct[i].product_id
							})
						}
					}
				}
				discountsCartAdd(reqData)
					.then(function(res) {
						uni.navigateTo({
							url: '/pages/users/order_confirm/index?cartId=' + res
								.data
								.cart_id
								.join(',')
						});
					})
					.catch(err => {
						this.selectValue = []
						return this.$util.Tips({
							title: err
						});
					});
			},
			goOrder() {
				this.$set(this, 'isOpen', false);
				this.$set(this.attr, 'cartAttr', false);
			}			
		}
	}
</script>

<style lang="scss" scoped>
.container{
	position: fixed;
	bottom: 0;
	width: 100%;
	left: 0;
	background-color: #f5f5f5;
	z-index: 300;
	border-radius: 16rpx 16rpx 0 0;
	transform: translate3d(0, 100%, 0);
	transition: all .3s cubic-bezier(.25, .5, .5, .9);
	max-height: 1000rpx;
	&.on {
		transform: translate3d(0, 0, 0);
	}
	.header{
		position: relative;
		padding: 36rpx 30rpx;
		text-align: center;
		.title{
			color: #282828;
			font-size: 32rpx;
			font-weight: bold;
		}
		.iconfont{
			color: #8A8A8A;
			font-size: 28rpx;
			position: absolute;
			top: 0;
			right: 0;
		}
		.icon-guanbi5 {
			right: 20rpx;
			color: #8a8a8a;
			font-size: 30rpx;
			line-height: 30rpx;
			top: 40rpx;
			background-color: transparent;
			font-weight: normal;
		}
		
	}
	scroll-view{
		max-height: 1000rpx;
	}
	.comb_time{
		display: flex;
		justify-items: center;
		margin-top: 20rpx;
		.count-time{
			color: #666666;
			font-size: 22rpx;
		}
		/deep/.time{
			align-items: center;
		}
		/deep/.styleAll{
			background-color: var(--view-theme);
			color: #ffffff;
			font-size: 22rpx;
		}
		/deep/.timeTxt{
			color: var(--view-theme);
			font-size: 20rpx;
		}
	}
	/deep/.styleAll{
		background-color: var(--view-theme);
		color: #ffffff;
		font-size: 22rpx;
	}
	.main_count{
		padding: 0 20rpx 30rpx;
		max-height: 800rpx;
		overflow-y: scroll;
		.list{
			margin-bottom: 20rpx;
			background: #ffffff;
			padding: 30rpx 20rpx;
			.list_title{	
				color: #282828;
				font-weight: bold;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.combo_list_name{
					font-size: 26rpx;
					display: flex;
					align-items: center;
					.name{
						max-width: 500rpx;
						margin-left: 8rpx;
					}
					
					.title_icon,uni-image,image{
						width: 26rpx;
						height:26rpx;
					}
				}
				.combo_list_money{
					color: var(--view-priceColor);
					font-size: 28rpx;
				}
			}
			&:last-child{
				margin-bottom: 0;
			}
			.btn{
				width: 670rpx;
				height: 60rpx;
				line-height: 60rpx;
				background-image: linear-gradient(270deg, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
				border-radius: 43px;
				margin: 21rpx auto 0;
				color: #ffffff;
				text-align: center;
				font-size: 24rpx;
				&.disabled{
					cursor: not-allowed;
					background:#bbb
				}
			}
			.save_money{
				color: var(--view-priceColor);
				font-size: 22rpx;
				font-weight: bold;
				text-align: center;
				margin-top: 30rpx;
			}
		}
		.pro_list{
			display: flex;
			align-items: center;
			padding: 30rpx 0;
			border-bottom: 1px solid #EEEEEE;
			&:last-child{
				border-bottom: none;
			}
			.checkbox{
				margin-right: 30rpx;
			
			}
			.icon-xuanzhong1{
				color: var(--view-theme);
			}
			.icon-xuanzhong1,.icon-weixuanzhong{
				font-size: 40rpx;
			}
			.icon-xuanzhong3{
				color: var(--view-theme);
				font-size: 18rpx;
				width: 40rpx;
				height: 40rpx;
				border-radius: 100%;
				background: var(--view-minorColor);
				line-height: 40rpx;
			}
			.picture,.image,uni-image{
				width: 180rpx;
				height: 180rpx;
				border-radius: 12rpx;
				position: relative;
			}
			.current_pro{
				background: linear-gradient(270deg, #F67A38 0%, #F11B09 100%);
				border-radius: 12rpx 0px 12rpx 12rpx;
				color: #fff;
				line-height: 34rpx;
				height: 34rpx;
				font-size: 16rpx;
				text-align: center;
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100rpx;
			}
			.info{
				margin-left: 30rpx;
				position: relative;
				.name{
					color: #282828;
					font-size: 24rpx;
					line-height: 36rpx;
				}
				.price{
					color: #282828;
					font-weight: bold;
					margin-top: 15rpx;
					font-size: 20rpx;
					font-weight: bold;
					text{
						font-size: 26rpx;
						
					}
					.ot_price{
						font-weight: normal;
						font-size: 20rpx;
						color: #999;
						text-decoration: line-through;
						margin-left: 10rpx;
					}
				}
			}
		}
		
	}	
	.list_attr{
		max-width:390rpx;
		height: 34rpx;
		line-height: 34rpx;
		font-size: 20rpx;
		color: #666666;
		border-radius: 18rpx;
		background-color: #f5f5f5;
		padding: 0 60rpx 0 20rpx;
		margin-top: 15rpx;
		position: relative;
		.iconfont{
			font-size: 12rpx;
			position: absolute;
			right: 20rpx;
			top: 4rpx;
		}
		text{
			display: inline-block;
			max-width: 300rpx;
		}
	}
	
}
/deep/uni-checkbox .uni-checkbox-input{
	width: 38rpx;
	height: 38rpx;
	border-radius: 100%;
	margin-right: 30rpx;
}
</style>
