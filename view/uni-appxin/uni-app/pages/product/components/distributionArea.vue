<template>
	<view>
		<view class="pouponCount" :class="popup.show==true?'on':''">
			<view class='title'>配送区域及运费<text class='iconfont icon-guanbi' @tap='changeClose'></text></view>
			<view class="container">
				
				<view class="area_container">
					<scroll-view scroll-y="true">
						<view v-if="shippingAddressData.length">
							<view class="distribution_area" v-for="(item, index) in shippingAddressData" :key="index">
								<view class="distribution_area_title">
									<view>{{ item.title }}</view>									
									<view class="distribution_area_title_del blackColor" v-if="item.label">
										<span>{{ item.label }}</span>
									</view>									
									<view class="distribution_area_title_del" v-else @click="deleteAreaAndFreight(item, index)">
										<text class="iconfont icon-shanchu2"></text>
										<span>删除</span>
									</view>
								</view>										
								<view class="distribution_area_item" @click="selectArea(item, index)" v-if="index">
									<view class="distribution_area_item_label">配送区域</view>
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
									<view class="distribution_area_item_label">首件</view>
									<view class="distribution_area_item_value">
										<input type="number" v-model="item.first" @input="item.first = Number(item.first)" placeholder="请填写首件数量" placeholder-class="inputHolder" />
									</view>
								</view>									
								<view class="distribution_area_item">
									<view class="distribution_area_item_label">运费</view>
									<view class="distribution_area_item_value">
										<input type="number" v-model="item.first_price" @input="item.first_price = Number(item.first_price)" placeholder="请填写运费金额" placeholder-class="inputHolder" />
									</view>
								</view>			
								<view class="distribution_area_item">
									<view class="distribution_area_item_label">续件</view>
									<view class="distribution_area_item_value">
										<input type="number" :min="0.1" v-model="item.continue" @input="item.continue = Number(item.continue)" placeholder="请填写续件数量" placeholder-class="inputHolder" />
									</view>
								</view>
										
								<view class="distribution_area_item">
									<view class="distribution_area_item_label">续费</view>
									<view class="distribution_area_item_value">
										<input type="number" v-model="item.continue_price" @input="item.continue_price = Number(item.continue_price)" placeholder="请填写续费金额" placeholder-class="inputHolder" />
									</view>
								</view>
							</view>
						</view>
						<view class="add" @click="addAreaAndFreight">
							<span class="iconfont">&#xe70e;</span>
							<span>添加配送区域及运费</span>
						</view>
					</scroll-view>
				</view>	
				
				<view class="handle"><view class="handle_button" @click="save">保存</view></view>			
				<uni-popup ref="area_popup" type="bottom"><areas @handleGetSelectArea="handleGetSelectArea" :allReadySelect="allReadySelect" @close="close"></areas></uni-popup>
			</view>
		</view>
		<view class='mask' catchtouchmove="true" :hidden='popup.show==false' @tap="changeClose"></view>
	</view>
	
</template>

<script>
// 配送区域
import areas from '../components/areas.vue';
export default {
	components: {
		areas
	},
	props: {
		freightData: {
			type: Array,
			default: () => {
				[]
			}
		},
		popup: {
			type: Object,
			default: function() {
				return {
					show: false
				};
			}
		}
	},
	data() {
		return {
			// shippingAddressData: [
			// 	{
			// 		title: '配送区域',
			// 		label: '默认全国',
			// 		city_id: [],
			// 		first: '', //首件条件
			// 		first_price: '', //首件运费
			// 		continue: '', // 续件数量
			// 		continue_price: '' // 续件金额
			// 	}
			// ],
			shippingAddressData: this.freightData,
			selectIndex: '',
			allReadySelect: []
		};
	},
	watch: {

	},
	mounted() {
	
	},
	methods: {
		//初始化数据	
		initListData(){
			console.log(this.freightData)
			let arr = [...this.freightData]
			if(arr.length == 0){
				arr = [
					{
						title: '配送区域',
						label: '默认全国',
						city_id: [],
						first: '', //首件条件
						first_price: '', //首件运费
						continue: '', // 续件数量
						continue_price: '' // 续件金额
					}
				]
			}else{
				arr.forEach((value,i)=>{
					value['title'] = '配送区域'
					if(i == 0)value['label'] = '默认全国'
				})
				
			}
			this.shippingAddressData = arr
		},
		// 点击 添加配送区域及运费
		addAreaAndFreight() {
			this.shippingAddressData.push({
				title: '配送区域',
				city_id: [],
				city_name: '',
				selectData: [],
				first: '', //首件条件
				first_price: '', //首件运费
				continue: '', // 续件数量
				continue_price: '' // 续件金额
			});
		},
		// 删除配送区域和运费
		deleteAreaAndFreight(item, index) {
			this.shippingAddressData.splice(index, 1);
		},
		selectArea(item, index) {
			this.selectIndex = index;
			if(!item.selectData){
				item.name = this.shippingAddressData[this.selectIndex]['city_name'].map(val => val.name).join('/')
				this.allReadySelect = [item];
			}else{
				this.allReadySelect = item.selectData;
			}
			
			this.$refs.area_popup.open();
		},
		// 获取所限地址
		handleGetSelectArea(item) {
			this.shippingAddressData[this.selectIndex].selectData = item;
			this.shippingAddressData[this.selectIndex].city_name = item.map(val => val.name).join(',');
			this.shippingAddressData[this.selectIndex].city_id = item.map(val => val.id);
			this.$refs.area_popup.close();
		},
		// 关闭选择弹窗
		close() {
			
			this.$refs.area_popup.close();
		},
		changeClose(){
			this.$emit('changeClose')
		},
		// 点击保存
		save() {
			let that = this;
			let value = that.shippingAddressData
			for(var i=0; i<value.length; i++){
				if (value[i].first === "") return that.$util.Tips({
					title: '请填写首件数量'
				});
				if (value[i].first < 1) return that.$util.Tips({
					title: '首件数量不能小于1'
				});
				if (value[i].first_price === "") return that.$util.Tips({
					title: '请填写首件金额'
				});
				if (value[i].continue === "") return that.$util.Tips({
					title: '请填写续件数量'
				});
				if (value[i].continue_price === "") return that.$util.Tips({
					title: '请填写续费金额'
				});
				if(i != 0 && (value[i].city_id).length == 0) return that.$util.Tips({
					title: '请填写配送区域'
				});
			}
			that.$emit('getData',that.shippingAddressData);
		}
	}
};
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
	padding-bottom: 120rpx;
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
	top: 40rpx;
	line-height: 30rpx;
	top: 20rpx;
	font-weight: normal;
	background-color: transparent;
}
scroll-view{
	height: 70vh;
}	
.area_container{
	padding: 20rpx;
	background-color: #f7f7f7;
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
	box-sizing: border-box;
	background: #fff;
	border-radius: 10px;
	&:first-child{
		margin-top: 0;
	}
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

		.blackColor {
			color: #666666 !important;
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
		.select_name{
			// font-weight: bold;
		}
		.line1{
			max-width: 430rpx;
		}
		.right {
			color: #bbbbbb;
			> span:nth-child(1) {
				display: inline-block;
				margin-right: 14rpx;
				max-width: 350rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
}
.handle {
	width: 100%;
	height: 126rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	left: 0;
	bottom: 0;
}
.handle_button {
	background: #e93323;
	border-radius: 43rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32rpx;
	color: #ffffff;
	width: 690rpx;
	padding: 21rpx 0;
	box-sizing: border-box;
}
.inputHolder {
	color: #bbbbbb;
	font-size: 30rpx;
}
</style>
