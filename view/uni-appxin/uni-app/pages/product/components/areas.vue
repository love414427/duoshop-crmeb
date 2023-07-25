<template>
	<view class="area_container">
		<view class="area_container_title">
			<view></view>
			<view class="area_container_title_name">选择地区</view>
			<view class="area_container_title_close" @click.stop="close"><text class="iconfont" >&#xe62f;</text></view>
		</view>

		<view class="area_container_content">
			<view class="selectList_con">
				<view class="selectList_con_item" v-for="(item, index) in selectList" :key="index">
					<text>{{ item.name }}</text>
					<text class="iconfont" @click="delSelectItem(item, index)">&#xe62f;</text>
				</view>
			</view>

			<view class="selectList_tap">
				<view class="selectList_tap_item" v-for="(item, index) in tapList" :key="index" @click="selectTapItem(item, index)" :class="{ selectTap: selectTap == item.id }">
					{{ item.name }}
				</view>
				<view class="selectList_tap_item" @click="selectTapLastItem(-1)" v-if="isShowLastItem" :class="{ selectTap: selectTap == -1 }">请选择</view>
			</view>

			<view class="selectList_area">
				<scroll-view scroll-y="true" class="scroll" :scroll-top="scrollTop" @scroll="scroll">
					<view v-for="(item, index) in areaList" :key="index" class="selectList_area_item">
						<view class="selectList_area_item_name" @click="selectArea(item)">{{ item.name }}</view>
						<view @click="handlyAddSelect(item)"><text class="iconfont">&#xe70e;</text></view>
					</view>
				</scroll-view>
			</view>

			<view class="handle"><view class="handle_button" @click="handleGetSelectArea">确定</view></view>
		</view>
	</view>
</template>

<script>
// 获取地址接口
import { getCityV2 } from '@/api/api.js';
import { serialize, Toast } from '../../../libs/uniApi.js';
export default {
	props:{
		allReadySelect: {
			type: Array,
			default:() => {
				return []
			}
		}
	},
	data() {
		return {
			selectList: [],
			selectTap: -1,
			selectTapIndex: -1, // 选择的列表下班
			tapList: [],
			isShowLastItem: true, // 是否展示最后一项请选择
			areaList: [],
			old: { scrollTop: 0 },
			scrollTop: 0
		};
	},
	watch: {
		allReadySelect: {
			handler(val) {
				this.selectList = this.allReadySelect;
			},
			deep: true
		}
	},
	created() {
		this.loadAddress(0);
		this.selectList = this.allReadySelect;
	},
	methods: {
		loadAddress(address_id) {
			return getCityV2(address_id).then(res => {
				this.areaList = res.data;
			});
		},
		// 选择地址
		async selectArea(item) {
			// 如果title被选中，选择子项时，删除后面所有title——item
			if (this.selectTapIndex > -1) {
				this.tapList.splice(this.selectTapIndex, 999);
				this.loadAddress(item.id);
				this.tapList.push(item);
				this.isShowLastItem = true;
				this.selectTap = -1;
				this.selectTapIndex = -1;
				this.goTop();
				return;
			}
			// 当所选择项拥有子集时
			if (item.snum) {
				this.loadAddress(item.id);
				this.tapList.push(item);
				this.isShowLastItem = true;
				this.selectTap = -1;
				this.goTop();
				return;
			}
			// 当选择项没有子集时
			if (!item.snum) {
				return;
				if (this.isShowLastItem) {
					this.tapList.push(item);
				} else {
					this.tapList.splice(this.tapList.length - 1, 1, item);
				}
				this.isShowLastItem = false;
				this.goTop();
				return;
			}
			
		},
		// 选择tap
		async selectTapItem(item, index) {
			this.selectTap = item.id;
			this.selectTapIndex = index;
			await this.loadAddress(item.parent_id);
		},
		// 点击请选择
		selectTapLastItem(val) {
			this.selectTap = -1;
			if (!this.tapList.length) {
				this.loadAddress(0);
				return;
			}
			this.loadAddress(this.tapList[this.tapList.length - 1].id);
		},
		// 点击加号事件
		handlyAddSelect(item) {
			if (this.selectList.some(val => val.id == item.id)) {
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
			console.log(1);
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
		},
		scroll : function(e) {
			this.old.scrollTop = e.detail.scrollTop
		},
		goTop: function(e) {
		    this.scrollTop = this.old.scrollTop
		    this.$nextTick(() => {
		        this.scrollTop = 0
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
		display: flex;
		justify-content: space-between;
		padding: 36rpx 30rpx 46rpx 0;
		> view {
			flex: 1;
		}
		&_name {
			text-align: center;
			font-weight: bold;
			font-size: 32rpx;
		}
		&_close {
			text-align: right;
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
					font-size: 20rpx;
					margin-left: 6rpx;
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
