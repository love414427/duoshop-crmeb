<template>
	<view class="business">
		<view class="business-header">
			<view class="headerbox" @click="changeTips" v-if="service">
				<image :src="service.merchant.mer_avatar" mode=""></image>
				<span class='font line1'>{{service.merchant.mer_name || '暂无店铺'}}</span>
				<text v-if="!downStatus" class="iconfont icon-xiala1 spin"></text>
				<text v-else class="iconfont icon-xiala1"></text>
			</view>
		</view>
		<view class="business-content">
			<view @click="goNext(item)" class="listBox" v-for="(item,index) in list">
				<text :class="item.icon" class="businessIcon"></text>
				<view>{{item.title}}</view>
			</view>
		</view>
		<shopList ref="shopList" @changeStoreClose="changeClose" @getService="getService" :is_sys='is_sys'></shopList>
	</view>
</template>

<script>
	import shopList from '@/components/shopList';
	export default {
		name: 'business',
		components: {
			shopList
		},
		data() {
			return {
				is_sys: '',
				downStatus: false,
				service: null
			}
		},
		computed: {
			list(){
				if(!this.service) return [];
				const merId = this.service.mer_id;
				const list = [{
						type: 'customer',
						title: '客服记录',
						url: '/pages/chat/customer_list/index?type=1&mer_id=' + merId,
						icon: 'iconfont icon-kefujilu'
					}];
				if(this.service.is_verify){
					list.push({
						title: '订单核销',
						url: '/pages/admin/order_cancellation/index?mer_id=' + merId,
						icon: 'iconfont icon-dingdanhexiao'
					});
				}
				if(this.service.customer){
					list.push({
						title: '订单管理',
						url: '/pages/admin/order/index?mer_id=' + merId,
						icon: 'iconfont icon-dingdanguanli'
					});
				}
				if(this.service.is_goods){
					list.push({
						title: '商品管理',
						url: '/pages/product/list/index?mer_id=' + merId,
						icon: 'iconfont icon-shangjiaguanli'
					});
				}
				return list;				
			}
		},
		onLoad: function(options) {
			this.is_sys = options.is_sys;
			this.getStoreList({is_sys:this.is_sys});
			uni.setNavigationBarTitle({
				title: this.is_sys ? '平台管理' : '商家管理'
			})
		},
		methods: {
			getStoreList: function(data) {
				this.$nextTick(() => {
					this.$refs.shopList.getStoreList(data)
				});
			},
			changeTips(data) {
				this.downStatus = !this.downStatus;
				this.$refs.shopList.isShowStore();
			},
			changeClose() {
				this.downStatus = false;
			},
			goNext(item){
				if(item.type == 'customer' && this.service.status == 0){
					return this.$util.Tips({
						title: '客服已离线，请开启客服状态！'
					});
				}else{
					uni.navigateTo({
						url: item.url,
					});
				}
				
			},
			getService: function(data) {
				this.service = data;
				if(data && data.merchant){
					uni.setNavigationBarTitle({
						title: data.merchant.mer_name
					})
				}else{
					uni.setNavigationBarTitle({
						title: (!data.mer_id) ? '平台管理' : '商家管理'
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.businessIcon {
		color: #2291F8;
		font-size: 80rpx;
		display: inline-block;
		margin-bottom: 29rpx;
	}
	.business-header {
		height: 305rpx;
		background: linear-gradient(180deg, #2291F8 0%, rgba(34,145,248,0) 100%);
		position: fixed;
		width: 100%;
		text-align: center;
		top: 0;
		left: 0;
		.headerbox {
			max-width: 360rpx;
			margin: 0 auto;
			position: relative;
			padding: 10rpx 0rpx 10rpx 0rpx;
			background-color: rgba(0, 0, 0, .25);
			border-radius: 30rpx;
			color: #FFFFFF;
			margin-top: 33rpx;
			.font {
				max-width: 260rpx;
				display: inline-block;
				margin-left: 10rpx;
				line-height: 28rpx;
			}
			image {
				width: 34rpx;
				height: 34rpx;
				position: relative;
				top: 4rpx;
			}
			.spin {
				display: inline-block;
				transform: rotate(180deg);
				font-size: 36rpx;
			}
		}
	}
	.business-content {
		width: 100%;
		padding: 0 18rpx;
		margin-top: 151rpx;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		.listBox {
			width: 345rpx;
			height: 270rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 5rpx 15rpx rgba(142, 82, 77, 0.1);
			border-radius: 20rpx;
			z-index: 1;
			margin-bottom: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			image {
				width: 66rpx;
				height: 66rpx;
				background: #F34C20;
			}
		}
	}
	/deep/ radio .wx-radio-input.wx-radio-input-checked,
	/deep/radio .uni-radio-input.uni-radio-input-checked {
	  border: 1px solid #2291F8 !important;
	  background-color: #2291F8 !important
	}
</style>
