<template>
	<view :style="viewColor">
		<view class="container">
			<view class="header">
				<text class="title">TA提到的宝贝</text>
				<image @click="closePopup" class="closeBnt" src="../static/img/index/close.png" mode=""></image>
			</view>
			<view class="main_count" :class="isHome ? 'mb90' : ''">
				<scroll-view scroll-y="true" class="scroll-view">
					<view v-for="(item, index) in list" :key="index" @click="goDetail(item.spu)" class="list">
						<view class="pro_list">
							<view class="picture">
								<image :src="item.spu && item.spu.image" class="image"></image>
							</view>
							<view class="info">
								<text class="name line2" v-if="item.spu && item.spu.store_name.length>=32">{{item.spu.store_name.slice(0,32)}}...</text>
								<text class="name line2" v-else>{{item.spu && item.spu.store_name}}</text>
								<view class="bottom">
									<view v-if="item.spu" class="price"><text class="sm">￥</text><text class="text">{{item.spu.price}}</text></view>
									<text class="buy-btn">立即购买</text>
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
				this.$emit('close');
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
	width: 750rpx;
	background-color: #ffffff;
	border-radius: 16rpx 16rpx 0 0;	
	.header{
		position: relative;
		padding: 40rpx 30rpx;
		.title{
			color: #282828;
			font-size: 30rpx;
		}
		.closeBnt{
			position: absolute;
			right: 30rpx;
			top: 30rpx;
			width: 30rpx;
			height: 30rpx;
		}
	}
	.scroll-view{
		max-height: 800rpx;
	}
	.main_count{
		padding: 0 30rpx 30rpx;
		max-height: 800rpx;
		overflow-y: scroll;
		.list{
			margin-bottom: 40rpx;
			flex-direction: row;
			&:last-child{
				margin-bottom: 0;
			}
		}
		.pro_list{
			display: flex;
			flex-direction: row;
			.picture,.image{
				width: 200rpx;
				height: 200rpx;
				border-radius: 16rpx;
			}
			.info{
				margin-left: 30rpx;
				position: relative;	
				.name{
					color: #282828;
					font-size: 30rpx;
					line-height: 44rpx;		
					display: flex;
					width: 460rpx;
				}
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
				.price{	
					flex-direction: row;
					align-items: flex-end;
					.sm{
						font-weight: bold;
						color: #E93323;
						font-size: 26rpx;
					}
					.text{
						font-weight: bold;
						color: #E93323;
						font-size: 34rpx;	
					}
				}
				.buy-btn{	
					border-radius: 26rpx;
					padding: 10rpx 20rpx;
					text-align: center;
					align-items: center;
					justify-content: center;
					font-size: 24rpx;
					color: #fff;
					background: #E93323;
				}
			}
		}
	}
}
</style>
