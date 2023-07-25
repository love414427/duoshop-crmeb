<template>
	<view class="select_popup_container platform">
		<!-- 头部内容 -->
		<view class="popup_title">
			<view class="popup_title_msn">请选择平台分类</view>
			<view class="close" @click="close"><text class="iconfont">&#xe761;</text></view>
		</view>
		<!-- 头部内容结束 -->
		<view class="tap_list">
			<view class="tap_list_item" v-for="(item, index) in tapList" :key="index" @click="selectTap(item, index)" :class="{ 'border': selectIndex == index }">
				{{item.label}}
			</view>
			<view class="tap_list_item" :class="{ 'border': selectIndex == -1 }" @click="pleaseSelect">请选择</view>
		</view>
		<view class="content_list">
			<scroll-view scroll-y="true" class="popup_sroll">
				<view class="content_list_item" @click="selectItem(item, index)" v-for="(item, index) in selectClassifiedData" :key="index">{{ item.label }}</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { navigateTo, serialize, setStorage } from '../../../libs/uniApi.js';
export default {
	props: {
		// 从外部传入的分类数据(平台分类)
		classifiedData: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	data() {
		return {
			selectIndex: -1,
			tapList: [],
			selectClassifiedData: []
		};
	},
	watch: {
		classifiedData: {
			handler(val) {
				this.selectClassifiedData = this.classifiedData
			},
			deep: true
		}
	},
	created() {
		this.selectClassifiedData = serialize(this.classifiedData);
	},
	methods: {
		selectItem(item, index) {	
			if(!(item.children && item.children.length)) {
				this.$emit('getPlatData', item, this.tapList);
				return;
			}			
			if(this.selectIndex > -1) {
				this.tapList.splice(this.selectIndex + 1, 999);
				this.tapList.push(item);
				this.selectIndex = -1;
				this.selectClassifiedData = serialize(item.children);
				return;
			}
			if(item.children && item.children.length) {
				this.tapList.push(item);
				this.selectClassifiedData = serialize(item.children);
				return;
			}
		},
		// 选择标签
		selectTap(item, index) {
			this.selectIndex = index;
			this.selectClassifiedData = serialize(item.children);
		},
		// 点击请选择
		pleaseSelect() {
			this.selectIndex = -1;
			this.selectClassifiedData = this.tapList[this.tapList.length - 1].children;
		},
		// 点击关闭按钮
		close() {
			this.$emit('close');
		}
	}
};
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
	.close {
		position: relative;
		z-index: 10;
		font-size: 28rpx;
		color: #8a8a8a;
	}
}

.tap_list {
	margin-top: 35rpx;
	border-bottom: 1px solid #EEEEEE;
	width: 710rpx;
	margin: auto;
	margin-bottom: 40rpx;
	display: flex;
	.border {
		border-bottom: 2px solid #E93323 !important;
		color: #E93323 !important;
	}
	
	&_item {
		padding-bottom: 18rpx;
		margin-right: 30rpx;
	}
}


.content_list {
	.popup_sroll {
		height: 742rpx;
	}
	

	.content_list_item {
		color: #333333;
		margin-bottom: 50rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
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
</style>
