<template>
	<view class="select_popup_container">
		<view class="popup_title">
			<view class="popup_title_msn">{{ selectProductTitle }}</view>
			<view class="close" @click="close"><span class="iconfont">&#xe761;</span></view>
		</view>
		<view v-if="selectProductItem.showTap">
			<scroll-view scroll-x="true" class="popup_tap">
				<view class="popup_tap_content">
					<view
						class="popup_tap_item"
						v-for="(item, index) in selectProductItem.singleCaseChild"
						:key="index"
						:class="{ selectTapEd: selectProductId == item.id }"
						@click="selectTapId(item)"
					>
						<view>{{ item.label }}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<scroll-view scroll-y="true" class="popup_sroll">
			<view class="popup_container" v-if="selectProductItem.showTap && selectSingleCase.children">
				<view
					class="popup_container_item"
					v-for="(item, index) in selectSingleCase.children"
					:key="index"
					@click="handleSelectProductItem(item)"
					:class="{ selectSingleCaseChild: selectProductItem.multiple ? multiple.indexOf(item.id) != -1 : selectSingleCaseChild == item.id }"
				>
					<view>{{ item.label }}</view>
				</view>
			</view>

			<view class="popup_container" v-if="!selectProductItem.showTap">
				<view
					class="popup_container_item"
					v-for="(item, index) in selectProductItem.singleCaseChild"
					:key="index"
					@click="handleSelectProductItem(item)"
					:class="{ selectSingleCaseChild: selectSingleCaseChild == item.brand_id || item.id }"
				>
					<view>{{ item.label }}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	props: {
		selectProductTitle: {
			type: String,
			default: ''
		},
		selectProductItem: {
			type: Object | Array,
			default() {
				return [] || {};
			}
		},
		form: {
			type: Object,
			default:() => {
				return {}
			}
		}
	},
	data() {
		return {
			selectProductId: '', // 标签tap页ID
			selectSingleCase: [], // 选中标签下的子项
			selectSingleCaseChild: '', // 选项id
			multiple: [] // 多选时，使用该字段
		};
	},
	created() {
		this.initData();
	},
	watch: {
		selectProductId: {
			handler(val) {
				this.selectSingleCase = this.selectProductItem.singleCaseChild.find(item => item.id == val);
			},
			deep: true
		}
	},
	methods: {
		initData() {
			
			if(this.form[this.selectProductItem.model]) {
				this[this.selectProductItem.multiple ? 'multiple' : 'selectSingleCaseChild'] = this.form[this.selectProductItem.model];
				
			}
			if (this.selectProductItem.showTap && this.selectProductItem.singleCaseChild.length) {
				this.selectProductId = this.selectProductItem.singleCaseChild[0].id;
				this.selectSingleCase = this.selectProductItem.singleCaseChild.find(item => item.id == this.selectProductId);
			}
		},
		// 选择标签ID
		selectTapId(item) {
			this.selectProductId = item.id;
		},
		// 选择选项id
		handleSelectProductItem(item) {
			if (this.selectProductItem.multiple) {
				if (this.multiple.indexOf(item.id) != -1) {
					this.multiple.splice(this.multiple.indexOf(item.id), 1);
				} else {
					this.multiple.push(item.brand_id || item.id);
				}
				this.multiple = this.unique(this.multiple);
				this.$emit('multipleData', this.multiple, this.selectProductItem.model);
				return;
			}
			this.selectSingleCaseChild = item.brand_id || item.id;
			this.$emit('singleChoiceData', this.selectSingleCaseChild, this.selectProductItem.model);
		},
		unique(arr) {
			var obj = {};
			return arr.filter(ele => {
				if (!obj[ele]) {
					obj[ele] = true;
					return true;
				}
			});
		},
		//关闭按钮
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

.popup_tap {
	display: flex;
	padding: 0 30rpx;
	color: #333333;
	font-size: 28rpx;
	border-bottom: 1px solid #eeeeee;
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
.popup_sroll {
	max-height: 742rpx;
	min-height: 300rpx;
}
.popup_container {
	&_item {
		padding: 40rpx 0 30rpx 40rpx;
	}
	.selectSingleCaseChild {
		color: #e93323;
	}
}
</style>
