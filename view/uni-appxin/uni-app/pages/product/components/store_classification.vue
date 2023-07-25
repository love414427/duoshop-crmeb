<template>
	<view class="area_container">
		<view class="area_container_title">
			<navigator :url="`/pages/product/storeClassification/index?mer_id=${mer_id}`" hover-class="none" class="manage_btn">管理</navigator>		
			<view class="area_container_title_name">选择店铺分类</view>
			<view class="area_container_title_close" @click="close"><text class="iconfont" >&#xe62f;</text></view>
		</view>
		<view class="area_container_content">
			<view class="selectList_con">
				<view class="selectList_con_item" v-for="(item, index) in selectList" :key="index">
					<text>{{ item.label }}</text>
					<text class="iconfont" @click="delSelectItem(item, index)">&#xe62f;</text>
				</view>
			</view>
			<view class="selectList_tap">
				<view class="selectList_tap_item" v-for="(item, index) in tapList" :key="index" @click="selectTapItem(item, index)" :class="{ selectTap: selectTap == item.value }">
					{{ item.label }}
				</view>
				<view class="selectList_tap_item" @click="selectTapLastItem(-1)" v-if="isShowLastItem" :class="{ selectTap: selectTap == -1 }">请选择</view>
			</view>
			<view class="selectList_area">
				<scroll-view scroll-y="true" class="scroll">
					<view v-for="(item, index) in areaList" :key="index" class="selectList_area_item">
						<view class="selectList_area_item_name" @click="selectArea(item)">{{ item.label }}</view>
						<view @click="handlyAddSelect(item)" v-if="!item.children"><text class="iconfont">&#xe70e;</text></view>
					</view>
				</scroll-view>
			</view>
			<view class="handle"><view class="handle_button" @click="handleGetSelectArea">确定</view></view>
		</view>
	</view>
</template>

<script>
import { serialize, Toast } from '../../../libs/uniApi.js';
export default {
	props:{
		allReadySelect: {
			type: Array,
			default:() => {
				return []
			}
		},
		classifiedData: {
			type: Array,
			default:() => {
				return []
			}
		},
		mer_id: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			selectList: [],
			selectTap: -1,
			selectTapIndex: -1, // 选择的列表下班
			tapList: [],
			isShowLastItem: true, // 是否展示最后一项请选择
			areaList: []
		};
	},
	watch: {
		classifiedData: {
			handler(val) {
				this.areaList = this.classifiedData
			},
			deep: true
		}
	},
	created() {
		this.areaList = serialize(this.classifiedData);
		console.log(this.areaList);
	},
	methods: {

		// 选择地址
		async selectArea(item) {
			
			// 当选择项没有子集时
			if (!(item.children && item.children.length)) {
				// Toast('该选项没有子集');
				return;
				if (this.isShowLastItem) {
					this.tapList.push(item);
				} else {
					this.tapList.splice(this.tapList.length - 1, 1, item);
				}
				this.isShowLastItem = false;
				return;
			}
			console.log(item);
			// 如果title被选中，选择子项时，删除后面所有title——item
			if (this.selectTapIndex > -1) {
				this.tapList.splice(this.selectTapIndex, 999);
				this.areaList = item.children;
				this.tapList.push(item);
				this.isShowLastItem = true;
				this.selectTap = -1;
				this.selectTapIndex = -1;
				return;
			}

			// 当所选择项拥有子集时
			if (item.children && item.children.length) {
				this.areaList = item.children;
				this.tapList.push(item);
				this.isShowLastItem = true;
				this.selectTap = -1;
				return;
			}


		},
		// 选择tap
		async selectTapItem(item, index) {
			if(index == 0) {
				this.areaList = serialize(this.classifiedData);
				this.selectTap = item.value; // 添加边框
				this.selectTapIndex = index; // 用于判断选择子集时，是否需要删除后面得选项
				return;
			}
			this.selectTap = item.value;			
			this.areaList = item.children;
		},
		// 点击请选择
		selectTapLastItem(val) {
			this.selectTap = -1;
			if (!this.tapList.length) {
				// this.areaList = val.children;
				this.areaList = serialize(this.classifiedData);
				return;
			}

			this.areaList = this.tapList[this.tapList.length - 1].children;
		},

		// 点击加号事件
		handlyAddSelect(item) {
			if (this.selectList.some(val => val.value == item.value)) {
				Toast('已经选择过了')
				return
			} 
				
			if (this.selectTapIndex > -1) {
				this.tapList.splice(this.selectTapIndex, 999);
			}
			if (!item.parent_id) {
				this.selectList.push(item);
				return;
			}
			let str = '';
			str =
				serialize(this.tapList)
					.map(val => val.name)
					.join('/') +
				'/' +
				item.name;
			this.selectList.push({ ...item, name: str });
		},
		// 删除所选地址
		delSelectItem(item, index) {
			this.selectList.splice(index, 1);
		},
		
		// 点击确定按钮，抛出已选项
		handleGetSelectArea() {
			this.$emit('handleGetSelectArea', this.selectList);
		},
		close() {
			this.$emit('close');
		},

		// 数组去重
		unique(arr) {
			var obj = {};
			return arr.filter(ele => {
				if (!obj[ele]) {
					obj[ele] = true;
					return true;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.area_container {
	background: #fff;
	border-radius: 16px 16px 0px 0px;

	&_title {
		text-align: center;
		padding: 36rpx 30rpx 46rpx 0;
		position: relative;
		&_close {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
		}
		.manage_btn{
			font-weight: normal;
			color: #e93323;
			font-size: 24rpx;
			position: absolute;
			left: 30rpx;
			top: 40rpx;
		}
	}
	
	&_content {
		padding: 0 30rpx;

		.selectList_con {
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 50rpx;
			&_item {
				padding: 3rpx 10rpx;
				background: #fff6f5;
				color: #e93323;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				display: flex;
				align-items: center;
				font-size: 22rpx;
				> span:nth-child(1) {
					display: inline-block;
					margin-right: 14rpx;
					white-space: nowrap;
				}
				.iconfont {
					font-size: 24rpx;
				}
			}
		}

		.selectList_tap {
			border-bottom: 1px solid #eeeeee;
			display: flex;
			&_item {
				font-size: 28rpx;
				margin-right: 60rpx;
				white-space: nowrap;
			}
			.selectTap {
				color: #e93323;
				border-bottom: 3rpx solid #e93323;
				padding-bottom: 21rpx;
			}
		}

		.selectList_area {
			.scroll {
				height: 597rpx;
			}

			.selectList_area_item {
				padding: 40rpx 0;
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				.iconfont {
					color: #e93323;
					font-size: 40rpx;
				}

				.selectList_area_item_name {
					flex: 0.7;
				}
			}
		}

		.handle {
			height: 126rpx;
			&_button {
				width: 690rpx;
				height: 86rpx;
				background: #e93323;
				border-radius: 43rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32rpx;
				color: #fff;
			}
		}
	}
}
</style>
