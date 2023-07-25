<template>
	<view class="shop_list">
		<view class="shop_list_item">
			<view class="shop_list_item_shop">
				<view class="shop_list_item_shop_image" v-if="isShowImg"><image :src="itemObject.image" mode="widthFix"></image></view>
				<view class="shop_list_item_shop_con">
					<view class="shop_list_item_shop_con_title">{{itemObject.store_name}}</view>
					<view class="shop_list_item_shop_con_message">
						<span>库存：{{itemObject.stock}}</span>
						<span>销量：{{itemObject.sales}}</span>
					</view>
					<view class="shop_list_item_shop_con_price">
						<span>￥{{itemObject.price}}</span>
						<del>￥{{itemObject.ot_price}}</del>
					</view>
				</view>
			</view>
			<view class="shop_list_item_handle">
				<slot>
					
				</slot>
				<!-- <view v-for="(item, i) in itemObject.handleList" :key="i" @click="handleMethod(item, itemObject)">{{item.label}}</view> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		isShowImg: {
			type: Boolean,
			default: false
		},
		itemObject: {
			type: Object,
			default() {
				return {}
			}
		},
		index: {
			type: Number | String,
			default: 0
		}
	},
	data() {
		return {};
	},
	created() {
	},
	methods: {
		handleMethod(item, obj) {
			this.$emit('handleMethod', item, obj, this.index);
		}
	}
};
</script>

<style lang="scss" scoped>
.shop_list {
	margin-top: 20rpx;
	padding: 0 20rpx;

	&_item {
		padding: 30rpx;
		background: #ffffff;
		border-radius: 10px;
		margin-bottom: 20rpx;
		&_shop {
			display: flex;
			&_image {
				width: 150rpx;
				height: 150rpx;
				background: #eeeeee;
				border-radius: 16px;
				overflow: hidden;
				image {
					width: 100%;
				}
			}

			&_con {
				flex: 1;
				display: flex;
				flex-direction: column;
				margin-left: 20rpx;
				padding-bottom: 12rpx;

				&_title {
					font-size: 28rpx;
					color: #282828;
					// font-weight: bold;
					padding-top: 4rpx;
				}
				&_message {
					margin-top: 15rpx;
					font-size: 22rpx;
					color: #868686;
					> span:nth-child(1) {
						display: inline-block;
						margin-right: 20rpx;
					}
				}

				&_price {
					margin-top: 10rpx;
					> span {
						display: inline-block;
						margin-right: 7rpx;
						font-size: 30rpx;
						color: #e93323;
					}
					> del {
						color: #bebebe;
						font-size: 26rpx;
					}
				}
			}
		}
		&_handle {
			display: flex;
			justify-content: flex-end;
			> view {
				margin-left: 18rpx;
				padding: 0 34rpx;
				height: 60rpx;
				border: 1px solid #c7c7c7;
				border-radius: 30px;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 30rpx;
				font-size: 26rpx;
				color: #999999;
			}
		}
	}
}
</style>
