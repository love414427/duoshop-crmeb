<template>
	<view class="select_popup_container">
		<view class="popup_title">
			<navigator :url="`/pages/product/addGoods/mulSpecification?mer_id=${mer_id}`" hover-class="none" class="manage_btn">管理</navigator>
			<view class="popup_title_msn">{{title}}</view>
			<view class="close" @click="close"><text class="iconfont">&#xe761;</text></view>
		</view>
		
		<view class="content">
			<scroll-view scroll-y="true" class="popup_sroll" @scrolltolower="scrolltolower">
				<view class="content_list">
					<view v-for="(item, index) in attrList" :key="index" class="content_list_item">
						<view @click="selectItem(item)">{{ item.template_name }}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			attrList: {
				type: Array,
				default() {
					return []
				}
			},
			title: {
				type: String,
				default: '请选择规格'
			},
			mer_id: {
				type: String || Number,
				default: 0
			}
		},
		data() {
			return {}
		},
		methods: {
			close(){
				this.$emit('close');
			},
			selectItem(item) {
				this.$emit('selectAttr', item);
			},
			scrolltolower() {
				this.$emit('scrolltolower');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.select_popup_container {
		background: #fff;
		border-radius: 16rpx 16rpx 0 0;
	}
	.popup_title {
		display: flex;
		justify-content: flex-end;
		padding: 36rpx 30rpx;
		position: relative;
		&_msn {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: #282828;
			font-size: 32rpx;
			font-weight: bold;
		}
		.manage_btn{
			font-weight: normal;
			color: #e93323;
			font-size: 24rpx;
			position: absolute;
			left: 40rpx;
			top: 40rpx;
		}
		.close {
			position: relative;
			z-index: 10;
			font-size: 28rpx;
			color: #8a8a8a;
		}
	}
	.content {
		.popup_sroll {
			max-height: 742rpx;
			min-height: 300rpx;
		}
		&_list {
			&_item {
				color: #333333;
				margin-bottom: 50rpx;
				margin-left: 40rpx;
				margin-right: 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				> view {
					flex: 0.6;
				}
				> view:nth-child(2) {
					flex: 0.4;
					display: flex;
					justify-content: flex-end;
				}
				.iconfont {
					color: #e93323;
					font-size: 36rpx !important;
				}
			}
		}
	}
	
</style>
