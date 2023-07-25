<template>
	<view>
		<view class="pouponCount" :class="popup.showParael==true?'on':''">
			<view class='title'>指定包邮区域<text class='iconfont icon-guanbi' @tap='changeClose'></text></view>
			<view class="container">
				<scroll-view scroll-y="true">
					<view class="distribution_area" v-for="(item, index) in parcelArea" :key="index">
						<view class="distribution_area_title">
							<view>新增包邮区域</view>
							<view class="distribution_area_title_del" @click="deleteParcelArea(item, index)" v-if="index">
								<text class="iconfont icon-shanchu2"></text>
								<text>删除</text>
							</view>
						</view>
						<view class="distribution_area_item" @click="selectArea(item, index)">
							<view class="distribution_area_item_label">选择地区</view>
							<view class="distribution_area_item_value right">
								<text class="line1" v-if="item.city_name">
									<text class="select_name" v-if="Array.isArray(item.city_name)">{{item.city_name.length ? item.city_name.map(val => val.name).join(',')  : '选择区域'}}</text>
									<text class="select_name" v-else>{{item.city_name}}</text>
								</text>
								<text v-else>选择区域</text>
								<text class="iconfont">&#xe617;</text>
							</view>
						</view>
						<view class="distribution_area_item">
							<view class="distribution_area_item_label">最低限购数</view>
							<view class="distribution_area_item_value">
								<input type="number" v-model="item.number" placeholder="请填写运费金额" @input="item.number = Number(item.number)" placeholder-class="inputHolder" />
							</view>
						</view>								
						<view class="distribution_area_item">
							<view class="distribution_area_item_label">最低购买金额</view>
							<view class="distribution_area_item_value">
								<input type="number" v-model="item.price" @input="item.price = Number(item.price)" placeholder="请填写续件金额" placeholder-class="inputHolder" />
							</view>
						</view>		
					</view>
					<view class="add" @click="addParcelAreaItem">
						<text class="iconfont">&#xe70e;</text>
						<text>添加指定包邮区域</text>
					</view>
				</scroll-view>	
				<uni-popup ref="area_popup" type="bottom">
					<areas @handleGetSelectArea="handleGetSelectArea" :allReadySelect="allReadySelect" @close="close"></areas>
				</uni-popup>
				
				<view class="handle">
					<view class="handle_button" @click="save">保存</view>
				</view>
			</view>
		</view>
		
		<view class='mask' catchtouchmove="true" :hidden='popup.showParael==false' @tap="changeClose"></view>
	</view>
	
</template>

<script>
// 配送区域
import areas from '../components/areas.vue';
import { navigateTo, serialize, setStorage, navigateBack } from '../../../libs/uniApi.js';
export default {
	components: {
		areas
	},
	props: {
		parcelData: {
			type: Array,
			default: () => {
				[]
			}
		},
		popup: {
			type: Object,
			default: function() {
				return {
					showParael: false
				};
			}
		}
	},
	data() {
		return {
			parcelArea: this.parcelData,
			allReadySelect: [],
			selectIndex: ''
		}
	},	
	mounted(){
		
	},
	methods: {
		//初始化数据			
		initParcelData(){
			let arr = [...this.parcelData]
			if(arr.length == 0){
				arr = [
					{
						city_id: [],
						number: '',
						price: '',
						city_name: []
					}
				]
			}
			this.parcelArea = arr
		},
		deleteParcelArea(item, index) {
			this.parcelArea.splice(index, 1);
		},
		close() {
			this.$refs.area_popup.close();
		},
		changeClose(){
			this.$emit('changeClose');
		},
		selectArea(item, index) {
			this.allReadySelect = item.city_name;
			this.selectIndex = index;
			this.$refs.area_popup.open();
		},
		// 添加指定包邮区域
		addParcelAreaItem() {
			this.parcelArea.push({
				city_id: [],
				number: '',
				price: '',
				city_name: []
			})
		},
		// 确定选择
		handleGetSelectArea(item) {
			this.allReadySelect = item;
			this.parcelArea[this.selectIndex].city_name = item;
			this.parcelArea[this.selectIndex].city_id = item.map(val => val.id);
			this.$refs.area_popup.close();
		},
		// 保存
		save() {
			let that = this;
			let value = that.parcelArea;
			for(var i=0; i<value.length; i++){	
				if((value[i].city_id).length == 0) return that.$util.Tips({
					title: '请选择地区'
				});
				if (value[i].number === "") return that.$util.Tips({
					title: '请输入最低购买数量'
				});			
				if (value[i].price === "") return that.$util.Tips({
					title: '请输入最低购买金额'
				});
			}
			that.$emit('getData',that.parcelArea);
			// setStorage('parcelArea', this.parcelArea);
			// navigateBack(1);
		}	
	}
}

</script>

<style lang="scss" scoped>
.pouponCount {
	position: fixed;
	bottom: 0;
	width: 100%;
	left: 0;
	background-color: #f5f5f5;
	z-index: 77;
	border-radius: 16rpx 16rpx 0 0;
	padding-bottom: 20rpx;
	transform: translate3d(0, 100%, 0);
	transition: all .3s cubic-bezier(.25, .5, .5, .9);
}	
.pouponCount.on {
	transform: translate3d(0, 0, 0);
}
.pouponCount .title {
	font-size: 32rpx;
	font-weight: bold;
	text-align: center;
	padding: 36rpx 0;
	position: relative;
}
.pouponCount .icon-guanbi {
	position: absolute;
	right: 20rpx;
	color: #8a8a8a;
	font-size: 30rpx;
	line-height: 30rpx;
	top: 40rpx;
	background-color: transparent;
	font-weight: normal;
}
scroll-view{
	height: 650rpx;
}	
.container {
	padding-top: 20rpx;
	padding-bottom: 197rpx;
}

.add {
	margin: auto;
	width: 710rpx;
	height: 106rpx;
	background: #ffffff;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #e93323;
	font-size: 30rpx;
	.iconfont {
		display: inline-block;
		margin-right: 10rpx;
	}
}

.distribution_area {
	margin: 0 auto 30rpx;
	width: 710rpx;
	padding: 36rpx 30rpx 31rpx 30rpx;
	min-height: 355rpx;
	box-sizing: border-box;
	background: #fff;
	border-radius: 10px;
	&_title {
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		margin-bottom: 36rpx;
		> view:nth-child(2) {
			color: #666666;
		}
		&_del {
			color: #e93323 !important;
			font-size: 28rpx !important;
			display: flex;
			align-items: center;
			.iconfont {
				font-size: 30rpx;
				margin-right: 15rpx;
			}
		}
	}

	&_item {
		height: 84rpx;
		background: #f5f5f5;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		&_value {
			text-align: right;
			display: flex;
			align-items: center;
		}
		.line1{
			max-width: 430rpx;
		}
		.select_name{
			// font-weight: bold;
		}
		.right {
			color: #bbbbbb;
			> span:nth-child(1) {
				max-width: 300rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				display: inline-block;
				margin-right: 14rpx;
			}
		}
	}
}
.handle {
	width: 100%;
	height: 126rpx;
	background: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	left: 0;
	bottom: 0;
	&_button {
		width: 690rpx;
		height: 86rpx;
		background: #e93323;
		border-radius: 43px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		color: #ffffff;
	}
}
.inputHolder {
	color: #bbbbbb;
	font-size: 30rpx;
}
</style>
