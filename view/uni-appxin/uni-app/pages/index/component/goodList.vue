<template>
	<view class="index-product-wrapper" :style="{ marginTop: mbConfig + 'rpx', background: themeColor,borderRadius: bgStyle+'rpx'}" v-if="tempArr.length">
		<!-- 单列 -->
		<block v-if="itemStyle == 0">	
			<view class="list-box animated listA" :class="tempArr.length > 0 ? 'fadeIn on' : ''">
				<view class="item" v-for="(item, index) in tempArr" :key="index" @click="goDetail(item)">
					<view class="pictrue" :class="'cont'+conStyle">	
						<easy-loadimage mode="widthFix" :image-src="item.image"></easy-loadimage>
						<view v-if="item.stock == 0" class="sell_out">已售罄</view>
						<view v-if="item.border_pic" :style="{ backgroundImage: `url(${item.border_pic})` }" class="border-picture"></view>
					</view>
					<view class="text-info" style="display: flex; flex-direction: column; justify-content: space-between;">
						<view>
							<view v-if="titleShow" class="title">{{ item.store_name }}</view>
							<view class="merchant_info">
								<view v-if="item.merchant && item.merchant.type_name" :style="'background:'+labelColor" class="font-bg-red">{{item.merchant.type_name}}</view>
								<view class="txt" :style="'border-color:'+priceColor+';color:'+priceColor+';'" v-if="item.issetCoupon && couponShow">领券</view>
								<view class="txt delivery" v-if="item.delivery_free">包邮</view>
							</view>
						</view>
						<view v-if="priceShow" class="price acea-row" :style="'color:'+priceColor">
							<view>
								¥
								<text>{{ item.price }}</text>
							</view>
							<!-- <view v-if="opriceShow" class="ot-price">¥{{item.ot_price}}</view> -->
						</view>			
					</view>
				</view>
			</view>
		</block>
		<!-- 两列 -->
		<block v-if="itemStyle == 1">
			<view class="list-box listS animated" :class="tempArr.length > 0 ? 'fadeIn on' : ''">
				<view class="item" v-for="(item, index) in tempArr" :key="index" @click="goDetail(item)" :style="'border-radius:'+bgStyle+'rpx;'">
					<view class="pictrue picture1" :class="'cont'+conStyle">
						<!-- <image :src="item.image" mode=""></image> -->
						<easy-loadimage mode="widthFix" :image-src="item.image"></easy-loadimage>
						<view v-if="item.stock == 0" class="sell_out">已售罄</view>
						<view v-if="item.border_pic" :style="{ backgroundImage: `url(${item.border_pic})` }" class="border-picture"></view>
					</view>
					<view class="text-info" style="background:#fff;">
						<view v-if="titleShow" class="title line2">{{ item.store_name }}</view>
						<view v-if="priceShow" class="price acea-row" :style="'color:'+priceColor">
							<view>¥<text>{{ item.price }}</text></view>
							<!-- <view v-if="opriceShow" class="ot-price">¥{{item.ot_price}}</view> -->
						</view>	
					</view>
				</view>
			</view>
		</block>
		<!-- 三列 -->
		<block v-if="itemStyle == 2">
			<view class="list-box animated listB" :class="tempArr.length > 0 ? 'fadeIn on' : ''">
				<view class="item" v-for="(item, index) in tempArr" :key="index" @click="goDetail(item)" :style="'border-radius:'+bgStyle+'rpx;'">
					<view class="pictrue" :class="'cont'+conStyle">		
						<!-- <image :src="item.image" mode=""></image> -->
						<easy-loadimage mode="widthFix" :image-src="item.image"></easy-loadimage>
						<view v-if="item.stock == 0" class="sell_out">已售罄</view>
						<view v-if="item.border_pic" :style="{ backgroundImage: `url(${item.border_pic})` }" class="border-picture"></view>
					</view>
					<view class="text-info" style="display: flex; flex-direction: column; justify-content: space-between;">
						<view v-if="titleShow" class="title line2">{{ item.store_name }}</view>
						<view v-if="priceShow" class="price">
							<view v-if="priceShow" :style="'color:'+priceColor">
								¥<text>{{ item.price }}</text>
							</view>
							<!-- <view v-if="opriceShow" class="ot-price">¥{{item.ot_price}}</view> -->
						</view>
					</view>
				</view>
			</view>
		</block>
		<!--大图-->
		<block v-if="itemStyle == 3">
			<view class="list-box animated listC" :class="tempArr.length > 0 ? 'fadeIn on' : ''">
				<view class="item" v-for="(item, index) in tempArr" :key="index" @click="goDetail(item)" :style="'border-radius:'+bgStyle+'rpx;'">
					<view class="pictrue" :class="'cont'+conStyle">
						<easy-loadimage mode="widthFix" :image-src="item.image"></easy-loadimage>
					</view>
					<view class="text-info" style="display: flex; flex-direction: column; justify-content: space-between;">
						<view v-if="titleShow" class="title line2">{{ item.store_name }}</view>							
						<!-- <view v-if="priceShow || opriceShow" class="price">
							<view v-if="priceShow" :style="'color:'+priceColor">
								¥<text>{{ item.price }}</text>
							</view>
							<view v-if="opriceShow" class="old-price">
								¥{{ item.ot_price }}
							</view>
						</view> -->
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
import { getProductslist } from '@/api/store.js';
export default {
	name: 'goodList',
	props: {
		dataConfig: {
			type: Object,
			default: () => {}
		},
		merId: {
			type: String || Number,
			default: ''
		}
	},
	data() {
		return {
			tempArr: [],
			mbConfig: this.dataConfig.mbConfig.val*2,
			numConfig: this.dataConfig.numConfig.val ? this.dataConfig.numConfig.val : this.dataConfig.numConfig.val,
			themeColor: this.dataConfig.themeColor.color[0].item,
			priceColor: this.dataConfig.fontColor.color[0].item,
			labelColor: this.dataConfig.labelColor.color[0].item,
			itemStyle: this.dataConfig.itemStyle.type,
			sortType: this.dataConfig.goodsSort.type,
			conStyle: this.dataConfig.conStyle.type,
			bgStyle: this.dataConfig.bgStyle.type ? '20' : '0',
			type: this.dataConfig.tabConfig.tabVal || 0,
			selectId: this.dataConfig.selectConfig.activeValue || 0,
			productIds: this.dataConfig.goodsList.ids || [],
			titleShow: this.dataConfig.titleShow.val,
			// opriceShow: this.dataConfig.opriceShow.val,
			priceShow: this.dataConfig.priceShow.val,
			couponShow: this.dataConfig.couponShow.val
		};
	},
	created() {},
	mounted() {
		this.productslist();
	},
	methods: {
		productslist() {
			let data = {};
			if (this.type == 1) {
				data = {
					mer_id: this.merId,
					product_ids: this.productIds.toString(),
					limit: this.productIds.length,
					type: 1
				};
			} else {
				data = {
					mer_id: this.merId,
					order: this.sortType == 2 ? 'price_asc' : this.sortType == 1 ? 'sales' : '',
					limit: this.numConfig,
					type: 1
				};
				if(this.merId){
					data.mer_cate_id = this.selectId.toString()
				}else{
					data.cate_pid = this.selectId.toString()
				}
			}
			getProductslist(data).then(res => {
				this.tempArr = res.data.list;
			});
		},
		goDetail(item) {
			this.$emit('detail', item);
		}
	}
};
</script>

<style lang="scss" scoped>
.index-product-wrapper {
	margin: 30rpx 20rpx 0 20rpx;
	.list-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 20rpx 20rpx 0;
		.item {
			width: 328rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
			position: relative;
			&.on {
				border-radius: 0;
			}
			.pictrue_log {
				width: 92rpx;
				height: 44rpx;
				font-size: 26rpx;
				line-height: 44rpx;
			}
			.pictrue,/deep/image,/deep/.easy-loadimage,/deep/uni-image {
				width: 100%;
				display: block;
				position: relative;
				.border-picture {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: center/cover no-repeat;
				}
			}
			.picture1,/deep/.picture1 image,/deep/.picture1 .easy-loadimage,/deep/.picture1 uni-image {			
				height: 346rpx;
				position: relative;
				.border-picture {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: center/cover no-repeat;
				}
				.sell_out {
					display: flex;
					width: 150rpx;
					height: 150rpx;
					align-items: center;
					justify-content: center;
					border-radius: 100%;
					background: rgba(0,0,0,.6);
					color: #fff;
					font-size: 30rpx;
					position: absolute;
					top: 50%;
					left: 50%;
					margin: -75rpx 0 0 -75rpx;
					&::before{
						content: "";
						display: block;
						width: 140rpx;
						height: 140rpx;
						border-radius: 100%;
						border: 1px dashed #fff;
						position: absolute;
						top: 5rpx;
						left: 5rpx;
					}
				}
			}
			.cont1,/deep/.cont1 image,/deep/.cont1 .easy-loadimage,/deep/.cont1 uni-image,.cont1 .border-picture{
				border-radius: 16rpx;
			}
			.text-info {
				padding: 10rpx 20rpx 15rpx;
				.title {
					color: #222222;
					overflow:hidden; 
					text-overflow: ellipsis; 
					display: -webkit-box; 
					-webkit-line-clamp: 2; 
					-webkit-box-orient: vertical;
				}
				.old-price {
					margin-top: 4rpx;
					font-size: 26rpx;
					color: #999;
					text-decoration: line-through;
					text {
						margin-right: 2px;
						font-size: 20rpx;
					}
				}
				.price {
					display: flex;
					margin-top: 20rpx;
					font-size: 26rpx;
					align-items: center;
					text {
						font-size: 36rpx;
						font-weight: 550;
					}
					.ot-price{
						color: #aaa;
						font-size: 26rpx;
						text-decoration: line-through;
						margin-left: 6rpx;
						font-weight: normal;
						margin-top: 10rpx;
					}	
				}
			}
			.pictrue {
				position: relative;
			}		
			.border-picture {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
				background: center/cover no-repeat;
			}
		}
		.merchant_info{
			display: flex;
			align-items: center;
			margin-top: 20rpx;
			.merchant_type{
				color: #fff;
				line-height: 30rpx;
				padding: 0 10rpx;
				border-radius: 2rpx;
				font-size: 22rpx;
			}
			.txt {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 56rpx;
				height: 28rpx;
				margin-left: 15rpx;
				border: 1px solid $theme-color;
				border-radius: 4rpx;
				font-size: 20rpx;
				font-weight: normal;
				&.delivery{
					// margin-left: 0;
					color: #FF9000;
					border-color: #FF9000;
				}
			}
		}
		&.on {
			display: flex;
		}
		&.listA {
			.item {
				display: flex;
				width: 100%;
				.pictrue,/deep/image,/deep/.easy-loadimage,/deep/uni-image {
					width: 220rpx;
					height: 220rpx;		
				}
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
				.text-info {
					width: 490rpx;
				}
			}
		}
		&.listB {
			justify-content: inherit;
			.item {
				width: 31.3%;
				margin-right: 3.05%;
				.pictrue,/deep/image,/deep/.easy-loadimage,/deep/uni-image {
					height: 220rpx;	
				}
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
				&:nth-child(3n) {
					margin-right: 0;
				}
				.price{
					display: flex;	
					align-items: center;
					justify-content: center;
					font-size: 20rpx;
					text{
						font-size: 28rpx;
					}
				}
				.text-info{
					padding: 10rpx 4rpx;
				}
			}
		}
		&.listC{
			.item{
				width: 100%;
				.pictrue,/deep/image,/deep/.easy-loadimage,/deep/uni-image{
					height: 320rpx;			
				}
				.price{
					margin-top: 20rpx;
					font-size: 40rpx;
					display: flex;
					align-items: center;
					.old-price{
						font-weight: normal;
						font-size: 22rpx;
						margin-left: 10rpx;
					}
				}
			}
		}
		&.listS{
			.price{
				font-size: 40rpx;
				display: flex;
				align-items: baseline;
				.old-price{
					font-weight: normal;
					font-size: 22rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
}
</style>
