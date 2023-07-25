<template>
	<view :style="viewColor">
		<view class="container" :class="popup.show==true?'on':''">
			<view class="header">
				<text class="title">TA提到的宝贝</text>
				<text class="iconfont icon-guanbi5" @click="closePopup"></text>
			</view>
			<view class="main_count" :class="isHome ? 'mb90' : ''">
				<scroll-view scroll-y="true">
					<view v-for="(item, index) in list" :key="index" @click="goDetail(item.spu)" class="list">
						<view class="pro_list">
							<view class="picture">
								<image :src="item.spu && item.spu.image" class="image"></image>
							</view>
							<view class="info">
								<view class="name line2">{{item.spu && item.spu.store_name}}</view>
								<view class="bottom">
									<view class="price">￥<text>{{item.spu && item.spu.price}}</text></view>
									<view class="buy-btn">立即购买</view>
								</view>
								
							</view>
						</view>
						
					</view>
				</scroll-view>
				
			</view>	
		</view>
		<view class='mask' catchtouchmove="true" :hidden='popup.show==false' @tap="closePopup"></view>
	</view>
	
</template>

<script>
	import { goShopDetail } from '@/libs/order.js'
	import { mapGetters } from "vuex";
	export default {
		computed:{
			...mapGetters(['viewColor']),
		},
		props:{
			list: {
				type: Array,
				default: []
			},
			uid: {
				type: Number,
			},
			isHome: {
				type: Boolean,
				default: false
			}	
		},
		data() {			
			return {
				popup: {
					show: false
				},
			};
		},
		methods: {
			// 点击关闭按钮
			closePopup() {
				this.$set(this.popup, 'show', false);
			},
			showPopup() {
				this.$set(this.popup, 'show', true);
			},
			goDetail(item){
				if (item.product_type === 1) {
					uni.navigateTo({
						url: `/pages/activity/goods_seckill_details/index?id=${item.product_id}&time=${item.stop_time}&spid=${this.uid}`
					})
				} else if (item.product_type === 2) {
					uni.navigateTo({
						url: `/pages/activity/presell_details/index?id=${item.activity_id}&spid=${this.uid}`
					})
				} else if (item.product_type === 0) {
					uni.navigateTo({
						url: `/pages/goods_details/index?id=${item.product_id}&spid=${this.uid}`
					})	
				}else if (item.product_type === 4) {
					uni.navigateTo({
						url: `/pages/activity/combination_details/index?id=${item.activity_id}&spid=${this.uid}`
					})
				}else if (item.product_type === 40) {
					uni.navigateTo({
						url: `/pages/activity/combination_status/index?id=${item.activity_id}&spid=${this.uid}`
					})
				}	
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
	background-color: #ffffff;
	z-index: 77;
	border-radius: 16rpx 16rpx 0 0;
	transform: translate3d(0, 100%, 0);
	transition: all .3s cubic-bezier(.25, .5, .5, .9);
	max-height: 1000rpx;
	&.on {
		transform: translate3d(0, 0, 0);
	}
	.header{
		position: relative;
		padding: 40rpx 30rpx;
		.title{
			color: #282828;
			font-size: 30rpx;
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
			top: 20rpx;
			background-color: transparent;
			font-weight: normal;
		}
	}
	scroll-view{
		max-height: 800rpx;
	}
	.main_count{
		padding: 0 30rpx 30rpx;
		max-height: 800rpx;
		overflow-y: scroll;
		/* #ifndef MP */
		&.mb90{
			margin-bottom: 90rpx;
		}	
		/* #endif */
		.list{
			margin-bottom: 40rpx;
			height: auto;
			flex-direction: row;
			&:last-child{
				margin-bottom: 0;
			}
		}
		.pro_list{
			display: flex;
			flex-direction: row;
			.picture,.image,uni-image{
				width: 200rpx;
				height: 200rpx;
				border-radius: 16rpx;
			}
			.info{
				margin-left: 30rpx;
				position: relative;	
				.bottom{
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 460rpx;
					position: absolute;
					left: 0;
					bottom: 10rpx;
					flex-direction: row;
				}
				.name{
					color: #282828;
					font-size: 30rpx;
					line-height: 45rpx;		
					display: -webkit-box;
					width: 460rpx;
				}
				.price{
					color: var(--view-priceColor);
					font-size: 26rpx;
					font-weight: bold;
					flex-direction: row;
					align-items: flex-end;
					text{
						font-size: 34rpx;	
					}
				}
				.buy-btn{
					color: #fff;
					background: var(--view-theme);
					border-radius: 26rpx;
					width: 140rpx;
					height: 48rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 22rpx;
				}
			}
		}
	}
}
</style>
