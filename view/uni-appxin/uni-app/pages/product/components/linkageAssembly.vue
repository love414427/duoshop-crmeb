<template>
	<view class="select_popup_container">
		<view class="popup_title">	
			<navigator v-if="mer_id" :url="`pages/product/addGoods/freightTemplate?mer_id=${mer_id}`" hover-class="none" class="manage_btn">管理</navigator>		
			<view class="popup_title_msn">{{ selectProductTitle }}</view>
			<view class="close" @click="close"><text class="iconfont">&#xe761;</text></view>
		</view>

		<!-- 已选列表 -->
		<view class="selected_list" v-if="selectProductItem.multiple && multipleList.length">
			<view class="selected_list_item" v-for="(item, index) in multipleList" :key="index">
				<view>{{ item.label }}</view>
				<view @click="deleteSelectedList(item, index)"><view class="iconfont">&#xe6a0;</view></view>
			</view>
		</view>

		<!-- 标签头部 -->
		<view class="tap">
			<scroll-view scroll-x="true" class="popup_tap">
				<view class="popup_tap_content">
					<view class="popup_tap_item" v-for="(item, index) in tap" :key="index" @click="handleSelectTapId(item, index)" :class="{ selectTapEd: selectTapId == item.value }">
						<view>{{ item.label }}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 内容选择 -->
		<view class="content">
			<scroll-view scroll-y="true" class="popup_sroll" @scrolltolower="scrolltolower">
				<view class="content_list">
					<view v-for="(item, index) in assemblyList" :key="index" class="content_list_item" :class="{ selectSingleCase: item.selectEd }">
						<view @click="selectItem(item, assemblyList)">{{ item.label }}</view>
						<view v-if="selectProductItem.multiple && !item.children"><text class="iconfont" @click="selectPushMultiple(item, assemblyList)">&#xe70e;</text></view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { serialize } from '../../../libs/uniApi.js';
export default {
	props: {
		selectProductTitle: {
			type: String,
			default: ''
		},
		// 从外部传入的分类数据
		classifiedData: {
			type: Array,
			default: () => {
				return [];
			}
		},
		// 表单数据
		form: {
			type: Object,
			default: () => {
				return {};
			}
		},
		// 外部选项数据，携带需要进项判断的参数

		selectProductItem: {
			type: Object,
			default: () => {
				return {
					// multiple true || false 是否多选
					// model 外部表单的key值
					// showTap 是否展示tap
					// allreadySelect 曾经的选项，用于再次打开后回显
					// singleColumn 单列单选
				};
			}
		},
		mer_id: {
			type: Number,
			default: 0
		}
		
	},
	data() {
		return {
			assemblyList: [],
			tap: [], // 标签数据
			selectTapId: '',
			tapIndex: '', // 选中d的tap的下标
			multipleList: [] // 多选的数组, 可用于展示
		};
	},
	watch: {
		tap: {
			handler(val) {
				// console.log(val);
			},
			deep: true
		},

		multipleList: {
			handler(val) {
				this.$emit('multipleList', val, this.selectProductItem.model);
			}
		},
		// 监听外部传入的数据变化，重新渲染数据
		classifiedData: {
			handler(val) {
				this.initData();
			},
			deep: true
		}
	},
	created() {
		this.initData();
		this.tap.push({ value: '', label: '请选择', samelevel: this.assemblyList });
	},
	methods: {
		initData() {
			this.addClassifiedAttr(this.classifiedData, 'children', 'selectEd', false);
			// 代表有选中项
			if (this.selectProductItem.singleColumn && (this.selectProductItem.allreadySelect && this.selectProductItem.allreadySelect.length) ) {
				this.assemblyList = serialize(this.classifiedData);
				this.assemblyList.forEach(item => {
					if (this.selectProductItem.allreadySelect.map(val => val.value).includes(item.value)) {
						item.selectEd = true;
					}
				});
				return;
			}
			// 多选有数据
			if (this.selectProductItem.allreadySelect && this.selectProductItem.allreadySelect.length && !this.selectProductItem.multiple) {
				this.tap = this.selectProductItem.allreadySelect;
				this.selectTapId = this.tap[0].value;
				this.handleSelectTapId(this.tap[0], 0);
				return;
			}
			// 品牌数据没有 value， label 字段
			this.classifiedData.forEach(item => {
				if (!item.value) {
					this.$set(item, 'value', item.brand_id);
				}
				if (!item.label) {
					this.$set(item, 'label', item.brand_name);
				}
			});
			this.assemblyList = serialize(this.classifiedData);
		},
		selectItem(item, samelevel) {
			console.log(item);
			if (this.selectProductItem.multiple) {
				// 注意，只能选择最后一级
				if (!item.children || !item.children.length) {
					item.selectEd = !item.selectEd;
				}
			} else {
				this.assemblyList.forEach(val => {
					val.selectEd = false;
				});
				item.selectEd = true;
			}

			if (this.tap.filter(val => val.value === item.value).length) {
				return;
			}
			this.$set(item, 'samelevel', samelevel);

			if (this.selectTapId !== '') {
				if (!item.children || !item.children.length) {
					this.tap[this.tap.length - 1].label = item.label;
					this.tap[this.tap.length - 1].value = item.value;

					this.$emit('getLinkageData', this.tap, this.selectProductItem.model);
					return;
				}

				this.tap.splice(this.tapIndex, 1, item);
				this.tap.splice(this.tapIndex + 1, this.tap.length);
				this.selectTapId = '';
				this.assemblyList = item.children;
				this.tap.push({ value: '', label: '请选择', samelevel: this.assemblyList });
				return;
			}

			if (item.children && item.children.length && !this.selectTapId) {
				this.tap.splice(this.tap.length - 1, 0, item);

				this.assemblyList = item.children;
			} else {
				this.tap[this.tap.length - 1].label = item.label;
				this.tap[this.tap.length - 1].value = item.value;
				if (this.selectProductItem.multiple) {
					return;
				}
				this.$emit('getLinkageData', this.tap, this.selectProductItem.model);
			}
		},

		// 多选时添加事件
		selectPushMultiple(item, samelevel) {
		
			item.selectEd = true;
		
			this.multipleList.push(item);
			this.multipleList = this.unique(this.multipleList);
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
		// 删除已选项
		deleteSelectedList(item, index) {
			this.multipleList.splice(index, 1);
			this.assemblyList.forEach(val => {
				if (item.value == val.value) {
					val.selectEd = false;
				}
			});
		},
		// 将数组用 "/" 连接
		connectionString(arr, lab = '/') {
			return arr.map(item => item.label).join('/');
		},

		handleSelectTapId(item, index) {
			if (!item.value) {
				this.assemblyList = this.tap[this.tap.length - 2].children;
				this.selectTapId = '';
				return;
			}

			if (index == this.tap.length - 1) {
				this.selectTapId = item.value;
				this.assemblyList = this.tap[this.tap.length - 2].children;
				return;
			}

			this.selectTapId = item.value;
			this.tapIndex = index;
			this.assemblyList = item.samelevel;
		},
		// 递归添加属性
		addClassifiedAttr(arr, childKey, addkey, value) {
			arr.forEach(item => {
				this.$set(item, addkey, value);
				if (item[childKey] && item[childKey].length) {
					this.addClassifiedAttr(item[childKey], childKey, addkey, value);
				}
			});
		},
		close() {
			this.$emit('close');
		},
		// 滑动组件滑倒底部时触发事件
		scrolltolower() {
			this.$emit('scrolltolower', this.selectProductItem.model);
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
	.manage_btn{
		font-weight: normal;
		color: #e93323;
		font-size: 24rpx;
		position: absolute;
		left: 30rpx;
		top: 40rpx;
	}
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

.selected_list {
	display: flex;
	flex-wrap: wrap;
	padding: 50rpx 30rpx;
	&_item {
		display: flex;
		align-items: center;
		color: #e93323;
		margin-right: 31rpx;
		margin-bottom: 40rpx;
		padding: 3rpx 11rpx;
		background: #fff6f5;
		.iconfont {
			display: inline-block;
			margin-left: 14rpx;
			font-size: 24rpx;
		}
	}
}

.popup_tap {
	display: flex;
	padding: 0 30rpx;
	color: #333333;
	font-size: 28rpx;
	border-bottom: 1px solid #eeeeee;
	margin-bottom: 40rpx;
	.popup_tap_content {
		display: flex;
	}
	&_item {
		margin-right: 60rpx;
		padding-bottom: 21rpx;
		white-space: nowrap;
	}
	.selectTapEd {
		color: #e93323;
		border-bottom: 3rpx solid #e93323;
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
.selectSingleCase {
	color: #e93323;
}
.selectTapEd {
	color: #e93323;
	border-bottom: 3rpx solid #e93323;
}
</style>
