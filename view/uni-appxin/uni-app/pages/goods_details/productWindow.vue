<template>
	<view :style="viewColor">
		<view class="product-window"
			:class="(attr.cartAttr === true ? 'on' : '') + ' ' + (iSbnt?'join':'') + ' ' + (iScart?'joinCart':'')">
			<text class="iconfont icon-guanbi5" @click.stop="closeAttr"></text>
			<view class="textpic acea-row row-between-wrapper">
				<view class="pictrue">
					<image :src="attr.productSelect.image" @click='getpreviewImage'></image>
				</view>
				<view class="text">
					<view class="line1">
						{{ title }}
					</view>
					<view class="money">
						<view class="acea-row row-middle">
							￥<text class="num">{{ attr.productSelect.price }}</text>
						</view>
						<text class="stock" v-if='isShow'>库存: {{ attr.productSelect.product_stock }}</text>
					</view>
				</view>
			</view>
			<view class="rollTop">
				<view class="productWinList">
					<view class="item" v-for="(item, indexw) in attr.productAttr" :key="indexw">
						<view class="title">{{ item.attr_name }}</view>
						<view class="listn acea-row row-middle">
							<view class="itemn" :class="item.index === itemn.attr ? 'on' : ''" v-for="(itemn, indexn) in item.attr_value"
							 @click="tapAttr(indexw, indexn)" :key="indexn">
								{{ itemn.attr }}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="joinBnt on"
				v-if="!attr.productSelect || attr.productSelect.product_atock <=0">已售罄
			</view>
			<view class="joinBnt" v-if="attr.productSelect.product_stock" @click="goCat">确定</view>
			<view class="joinBnt on" v-else-if="!attr.productSelect.product_stock">已售罄</view>
		</view>
		<view class="mask" @touchmove.prevent :hidden="attr.cartAttr === false" @click="closeAttr"></view>
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
	import { mapGetters } from "vuex";
	export default {
		props: {
			attr: {
				type: Object,
				default: () => {}
			},
			title: {
				type: String
			},
			limitNum: {
				type: Number,
				value: 0
			},
			isShow: {
				type: Number,
				value: 0
			},
			iSbnt: {
				type: Number,
				value: 0
			},
			iSplus: {
				type: Number,
				value: 0
			},
			iScart: {
				type: Number,
				value: 0
			},
			is_vip: {
				type: Number,
				value: 0
			}
		},
		computed: mapGetters(['viewColor']),
		data() {
			return {};
		},
		mounted() {
		},
		methods: {
			getpreviewImage: function() {
				uni.previewImage({
					urls: this.attr.productSelect.image.split(','),
					current: this.attr.productSelect.image
				});
			},
			goCat: function() {
				this.$emit('goCat');
			},
		
			closeAttr: function() {
				this.$emit('myevent');
			},
	
			tapAttr: function(indexw, indexn) {
				let that = this;
				that.$emit("attrVal", {
					indexw: indexw,
					indexn: indexn
				});
				this.$set(this.attr.productAttr[indexw], 'index', this.attr.productAttr[indexw].attr_values[indexn]);
				let value = that
					.getCheckedValue()
					.join(",");
				that.$emit("ChangeAttr", value);

			},
			//获取被选中属性；
			getCheckedValue: function() {
				let productAttr = this.attr.productAttr;
				let value = [];
				for (let i = 0; i < productAttr.length; i++) {
					for (let j = 0; j < productAttr[i].attr_values.length; j++) {
						if (productAttr[i].index === productAttr[i].attr_values[j]) {
							value.push(productAttr[i].attr_values[j]);
						}
					}
				}
				return value;
			}
		}
	}
</script>

<style scoped lang="scss">
	.vip-money {
		color: #282828;
		font-size: 28rpx;
		font-weight: 700;
		margin-left: 6rpx;
	}

	.vipImg {
		width: 68rpx;
		height: 27rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.product-window {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 920rpx;
		left: 0;
		background-color: #fff;
		z-index: 320;
		border-radius: 16rpx 16rpx 0 0;
		transform: translate3d(0, 100%, 0);
		transition: all .3s cubic-bezier(.25, .5, .5, .9);
		padding-bottom: 140rpx;
		padding-bottom: calc(140rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		padding-bottom: calc(140rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		padding-bottom: calc(140rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		padding-bottom: calc(140rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
	}

	.product-window.on {
		transform: translate3d(0, 0, 0);
	}
	.product-window .icon-guanbi5{
		position: absolute;
		right: 20rpx;
		color: #8a8a8a;
		font-size: 30rpx;
		line-height: 30rpx;
		top: 20rpx;
	}

	.product-window.join {
		padding-bottom: 30rpx;
	}

	.product-window.joinCart {
		padding-bottom: 30rpx;
		z-index: 10000;
	}

	.product-window .textpic {
		padding: 0 130rpx 0 30rpx;
		margin-top: 50rpx;
		position: relative;
	}

	.product-window .textpic .pictrue {
		width: 150rpx;
		height: 150rpx;
	}

	.product-window .textpic .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.product-window .textpic .text {
		width: 410rpx;
		font-size: 32rpx;
		color: #202020;
	}

	.product-window .textpic .text .money {
		font-size: 24rpx;
		margin-top: 40rpx;
		color: var(--view-priceColor);
	}

	.product-window .textpic .text .money .num {
		font-size: 36rpx;
	}

	.product-window .textpic .text .money .stock {
		color: #999;
		margin-left: 6rpx;
	}

	.product-window .textpic .iconfont {
		position: absolute;
		right: 30rpx;
		top: -5rpx;
		font-size: 35rpx;
		color: #8a8a8a;
	}

	.product-window .rollTop {
		max-height: 500rpx;
		overflow: auto;
		margin: 36rpx 0;
	}

	.product-window .productWinList .item~.item {
		margin-top: 36rpx;
	}

	.product-window .productWinList .item .title {
		font-size: 30rpx;
		color: #999;
		padding: 0 30rpx;
	}

	.product-window .productWinList .item .listn {
		padding: 0 30rpx 0 16rpx;
	}

	.product-window .productWinList .item .listn .itemn {
		border: 1px solid #F2F2F2;
		font-size: 26rpx;
		color: #282828;
		padding: 7rpx 33rpx;
		border-radius: 25rpx;
		margin: 20rpx 0 0 14rpx;
		background-color: #F2F2F2;
	}

	.product-window .productWinList .item .listn .itemn.on {
		color: var(--view-theme);
		background: var(--view-minorColor);
		border-color: var(--view-theme);
	}

	.product-window .productWinList .item .listn .itemn.limit {
		color: #999;
		text-decoration: line-through;
	}

	.product-window .cart {
		margin-top: 36rpx;
		padding: 0 30rpx;
	}

	.product-window .cart .title {
		font-size: 30rpx;
		color: #999;
	}

	.product-window .cart .carnum {
		height: 54rpx;
		margin-top: 24rpx;
	}

	.product-window .cart .carnum .iconfont {
		font-size: 25rpx;
	}

	.product-window .cart .carnum view {
		// border: 1px solid #a4a4a4;
		width: 84rpx;
		text-align: center;
		height: 100%;
		line-height: 54rpx;
		color: #282828;
		font-size: 45rpx;
	}

	.product-window .cart .carnum .reduce {
		border-right: 0;
		border-radius: 6rpx 0 0 6rpx;
		line-height: 48rpx;
		font-size: 60rpx;
	}

	.product-window .cart .carnum .reduce.on {
		// border-color: #e3e3e3;
		color: #DEDEDE;
	}

	.product-window .cart .carnum .plus {
		border-left: 0;
		border-radius: 0 6rpx 6rpx 0;
		line-height: 46rpx;
	}

	.product-window .cart .carnum .plus.on {
		// border-color: #e3e3e3;
		color: #dedede;
	}

	.product-window .cart .carnum .num {
		background: rgba(242, 242, 242, 1);
		color: #282828;
		font-size: 28rpx;
	}

	.product-window .joinBnt {
		font-size: 30rpx;
		width: 620rpx;
		height: 86rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 86rpx;
		color: #fff;
		position: absolute;
		bottom: 30rpx;
		left: 65rpx;
		background-image: linear-gradient(270deg, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
	}

	.product-window .joinBnt.on {
		background-color: #bbb;
		color: #fff;
		background-image: none;
	}
</style>
