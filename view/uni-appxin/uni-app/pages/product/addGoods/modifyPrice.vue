<template>
	<view class="container">
		<view class="multiSpecifica_container" v-for="(item, index) in multiSpecificationList" :key="index">
			<view style="background: #fff;">
				<view class="multiSpecifica_container_imageItem" @click="clk(index)">
					<view class="multiSpecifica_container_imageItem_label">
						<view v-if="isBatchOperation" class="batchOperation" :class="{ selectEd: item.select }" @click.stop="selectGoods(item)">
							<view><span class="iconfont" v-if="item.select">&#xe64e;</span></view>
						</view>
						<view>商品图</view>
					</view>
					<view class="multiSpecifica_container_imageItem_value">
						<image :src="item.image" v-if="item.image" class="myimg2"></image>
						<view class="hanlerImage" v-else>
							<view><image src="../static/images/creamer.png" mode="widthFix"></image></view>
							<view>添加图片</view>
						</view>
					</view>
				</view>
				<view class="multiSpecifica_container_item">
					<view class="multiSpecifica_container_item_label flex-start">规格信息</view>
					<view class="multiSpecifica_container_item_value">
						<text class="attributes" v-for="(v,i) in Object.values(item.detail)" :key="i">{{v}}</text>
					</view>
				</view>
				<view class="multiSpecifica_container_item">
					<view class="multiSpecifica_container_item_label flex-start">售价</view>
					<view class="multiSpecifica_container_item_value"><input v-model="item.price" type="number" placeholder="请填写商品售价" /></view>
				</view>

				<view class="multiSpecifica_container_item">
					<view class="multiSpecifica_container_item_label flex-start">成本价</view>
					<view class="multiSpecifica_container_item_value"><input v-model="item.cost" type="number" placeholder="请填写商品成本价" /></view>
				</view>

				<view class="multiSpecifica_container_item">
					<view class="multiSpecifica_container_item_label flex-start">原价</view>
					<view class="multiSpecifica_container_item_value"><input v-model="item.ot_price" type="number" placeholder="请填写商品原价" /></view>
				</view>

				<view v-if="item.more_thanFlag">
					<view class="multiSpecifica_container_item">
						<view class="multiSpecifica_container_item_label flex-start">库存</view>
						<view class="multiSpecifica_container_item_value"><input v-model="item.stock" type="number" placeholder="请填写商品库存" /></view>
					</view>

					<view class="multiSpecifica_container_item">
						<view class="multiSpecifica_container_item_label flex-start">商品编号</view>
						<view class="multiSpecifica_container_item_value"><input v-model="item.bar_code" type="text" placeholder="请填写商品编号" /></view>
					</view>

					<view class="multiSpecifica_container_item">
						<view class="multiSpecifica_container_item_label flex-start">重量</view>
						<view class="multiSpecifica_container_item_value"><input v-model="item.weight" type="number" value="" placeholder="请填写商品重量" /></view>
					</view>

					<view class="multiSpecifica_container_item">
						<view class="multiSpecifica_container_item_label flex-start">体积</view>
						<view class="multiSpecifica_container_item_value"><input v-model="item.volume" type="number" placeholder="请填写商品体积" /></view>
					</view>

					<view class="multiSpecifica_container_item">
						<view class="multiSpecifica_container_item_label flex-start">佣金（一级）</view>
						<view class="multiSpecifica_container_item_value"><input v-model="item.extension_one" type="number" placeholder="请填写商品佣金" /></view>
					</view>

					<view class="multiSpecifica_container_item">
						<view class="multiSpecifica_container_item_label flex-start">佣金（二级）</view>
						<view class="multiSpecifica_container_item_value"><input v-model="item.extension_two" type="number" placeholder="请填写商品佣金" /></view>
					</view>
				</view>
			</view>
			<view class="more_than" @click="moreThan(item)" v-if="!item.more_thanFlag">更多</view>
		</view>

		<view class="handle" v-if="isBatchOperation">
			<view class="select_all" :class="{ selectAllEd: selectAllFlag }" @click="selectAll">
				<view><text class="iconfont" v-if="selectAllFlag">&#xe64e;</text></view>
				<view>全选</view>
			</view>

			<view class="change" @click="openChangeModel">修改</view>
		</view>

		<view class="handle" v-else>
			<view class="handle_button" @click="batchOperation">批量操作</view>
			<view class="handle_button save" @click="saveAttrValue">保存</view>
		</view>

		<!-- 弹框部分 -->

		<uni-popup ref="changePopup" type="bottom">
			<view class="changePopup_container">
				<view class="changePopup_container_title">
					<view>批量修改</view>
					<view @click="closeChangePopup"><span class="iconfont">&#xe62f;</span></view>
				</view>

				<scroll-view :scroll-y="true" class="scrollViewCon">
					<view class="changePopup_container_content">
						<view class="changePopup_container_content_item">
							<view class="changePopup_container_content_item_label">售价</view>
							<view class="changePopup_container_content_item_value"><input v-model="batchData.price" type="number" placeholder="0.00" /></view>
						</view>

						<view class="changePopup_container_content_item">
							<view class="changePopup_container_content_item_label">成本价</view>
							<view class="changePopup_container_content_item_value"><input v-model="batchData.cost" type="number" placeholder="0.00" /></view>
						</view>

						<view class="changePopup_container_content_item">
							<view class="changePopup_container_content_item_label">原价</view>
							<view class="changePopup_container_content_item_value"><input v-model="batchData.ot_price" type="number" placeholder="0.00" /></view>
						</view>

						<view class="changePopup_container_content_item">
							<view class="changePopup_container_content_item_label">库存</view>
							<view class="changePopup_container_content_item_value"><input v-model="batchData.stock" type="number" placeholder="0.00" /></view>
						</view>

						<view class="popup_moreThan" @click="popupOpenModel = !popupOpenModel" v-if="!popupOpenModel">
							<text>展开</text>
							<text class="iconfont">&#xe8ca;</text>
						</view>

						<view v-if="popupOpenModel">
							<view class="changePopup_container_content_item">
								<view class="changePopup_container_content_item_label">商品编号</view>
								<view class="changePopup_container_content_item_value"><input v-model="batchData.bar_code" type="text" placeholder="0.00" /></view>
							</view>

							<view class="changePopup_container_content_item">
								<view class="changePopup_container_content_item_label">重量</view>
								<view class="changePopup_container_content_item_value"><input v-model="batchData.weight" type="text" placeholder="0.00" /></view>
							</view>

							<view class="changePopup_container_content_item">
								<view class="changePopup_container_content_item_label">体积</view>
								<view class="changePopup_container_content_item_value"><input v-model="batchData.volume" type="text" placeholder="0.00" /></view>
							</view>

							<view class="changePopup_container_content_item">
								<view class="changePopup_container_content_item_label">佣金（一级）</view>
								<view class="changePopup_container_content_item_value"><input v-model="batchData.extension_one" type="text" placeholder="0.00" /></view>
							</view>

							<view class="changePopup_container_content_item">
								<view class="changePopup_container_content_item_label">佣金（二级）</view>
								<view class="changePopup_container_content_item_value"><input v-model="batchData.extension_two" type="text" placeholder="0.00" /></view>
							</view>
						</view>
					</view>
				</scroll-view>

				<view class="handle_popup"><view class="handle_popup_button" @click="saveBachData">确认</view></view>
			</view>
		</uni-popup>
		<avatar @upload="doUpload" @getName="getImgName" quality="1" ref="avatar" selWidth="250upx" selHeight="250upx"></avatar>
	</view>
</template>

<script>
import { Toast, setStorage, navigateBack, getStorage } from '../../../libs/uniApi.js';
import avatar from "@/components/yq-avatar/yq-avatar.vue";
import {TOKENNAME, HTTP_REQUEST_URL} from '@/config/app.js';
import store from '@/store';
export default {
	components: {
		avatar
	},
	data() {
		return {
			popupOpenModel: false,
			selectAllFlag: false,
			isBatchOperation: false, // 是否开始批量操作
			multiSpecificationList: [],
			addMultiSpecification: [],
			attrObj: {},
			index: 0,
			imgName: "",
			batchData: {
				price: '', //售价
				cost: '', // 成本价
				ot_price: '', // 原价
				stock: '', // 库存
				bar_code: '', // 商品编号
				weight: '', // 重量
				volume: '', // 体积
				extension_one: '', // 一级佣金
				extension_two: '' //二级拥挤
			}
		};
	},
	onLoad(opt) {
		this.attrObj = opt;
	},
	onShow() {
		this.initData();
	},
	watch: {
		multiSpecificationList: {
			handler(val) {
				if (val.filter(item => item.select).length == val.length) {
					this.selectAllFlag = true;
				} else {
					this.selectAllFlag = false;
				}
			},
			deep: true
		}
	},
	methods: {
		initData() {
			if (getStorage('attrValue')) {
				this.multiSpecificationList = getStorage('attrValue');
			} else {
				this.multiSpecificationList = this.attrFormat(getStorage('modifyPriceData').template_value);
			}

			this.multiSpecificationList.forEach(item => {
				this.$set(item, 'more_thanFlag', false);
				this.$set(item, 'select', false);
			});
		},
		// 选择图片
		selectImage(item) {
			let that = this;
			that.$util.uploadImageOne('upload/image', function(res) {
				item.image = res.data.path;
			});
		},
		clk(index) {
			let avatar = this.$refs.avatar;
			this.index = index;
			avatar.fChooseImg(1,{selWidth: '350upx', selHeight: '350upx', inner: true});
		},
		doUpload(rsp) {
			console.log(rsp);
			let that = this;
			uni.uploadFile({
				url: HTTP_REQUEST_URL + '/api/upload/image/field',
				filePath: rsp.path,
				name: 'field',
				formData: {
					'filename': rsp.path,
					'name': that.imgName
				},
				header: {
					// #ifdef MP
					"Content-Type": "multipart/form-data",
					// #endif
					[TOKENNAME]: 'Bearer ' + store.state.app.token
				},
				success: (uploadFileRes) => {
					console.log(uploadFileRes.data);
					let imgData = JSON.parse(uploadFileRes.data)
					that.multiSpecificationList[that.index]['image'] = imgData.data.path;
				},
				complete(res) {
					console.log(res)
				}
			});		
		},
		getImgName(name){
			this.imgName = name
		},
		moreThan(item) {
			item.more_thanFlag = true;
		},
		// 批量操作
		batchOperation() {
			this.isBatchOperation = true;

			this.multiSpecificationList.forEach(item => {
				this.$set(item, 'select', false);
			});
		},
		// 点击全选
		selectAll() {
			this.selectAllFlag = !this.selectAllFlag;

			this.multiSpecificationList.forEach(item => {
				if (this.selectAllFlag) {
					this.$set(item, 'select', true);
				} else {
					this.$set(item, 'select', false);
				}
			});
		},
		// 单选
		selectGoods(item) {
			item.select = !item.select;
		},

		// 打开修改弹框
		openChangeModel() {
			if (!this.multiSpecificationList.filter(item => item.select).length) {
				Toast('请选择商品');
				return;
			}

			this.$refs.changePopup.open();
		},

		// 保存批量修改得数据
		saveBachData() {
			Object.keys(this.batchData).forEach(item => {
				this.multiSpecificationList.forEach(val => {
					if (val.select) {
						val[item] = this.batchData[item];
					}
				});
			});
			this.isBatchOperation = false;
			this.$refs.changePopup.close();
		},

		// 保存数据
		saveAttrValue() {
			setStorage('attrValue', this.multiSpecificationList);
			navigateBack(1);
		},

		// 关闭修改弹框
		closeChangePopup() {
			this.$refs.changePopup.close();
		},

		attrFormat(arr) {
			let data = [];
			const res = [];
			return format(arr);
			function format(arr) {
				if (arr.length > 1) {
					arr.forEach((v, i) => {
						if (i === 0) data = arr[i]['detail'];
						const tmp = [];
						data.forEach(function(vv) {
							arr[i + 1] &&
								arr[i + 1]['detail'] &&
								arr[i + 1]['detail'].forEach(g => {
									const rep2 = (i !== 0 ? '' : arr[i]['value'] + '_$_') + vv + '-$-' + arr[i + 1]['value'] + '_$_' + g;
									tmp.push(rep2);
									if (i === arr.length - 2) {
										const rep4 = {
											image: '',
											price: 0,
											cost: 0,
											ot_price: 0,
											stock: 0,
											bar_code: '',
											weight: 0,
											volume: 0,
											brokerage: 0,
											brokerage_two: 0
										};
										rep2.split('-$-').forEach((h, k) => {
											const rep3 = h.split('_$_');
											if (!rep4['detail']) rep4['detail'] = {};
											rep4['detail'][rep3[0]] = rep3.length > 1 ? rep3[1] : '';
										});
										// if(rep4.detail !== 'undefined' && rep4.detail !== null){
										Object.values(rep4.detail).forEach((v, i) => {
											rep4['value' + i] = v;
										});
										// }

										res.push(rep4);
									}
								});
						});
						data = tmp.length ? tmp : [];
					});
				} else {
					const dataArr = [];
					arr.forEach((v, k) => {
						v['detail'].forEach((vv, kk) => {
							dataArr[kk] = v['value'] + '_' + vv;
							res[kk] = {
								image: '',
								price: 0,
								cost: 0,
								ot_price: 0,
								stock: 0,
								bar_code: '',
								weight: 0,
								volume: 0,
								brokerage: 0,
								brokerage_two: 0,
								detail: { [v['value']]: vv }
							};
							// if(res[kk].detail !== 'undefined' && res[kk].detail !== null){
							Object.values(res[kk].detail).forEach((v, i) => {
								res[kk]['value' + i] = v;
							});
							// }
						});
					});
					data.push(dataArr.join('$&'));
				}
				return res;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding-top: 20rpx;
	padding-bottom: 140rpx;
}
.multiSpecifica_container {
	width: 710rpx;
	margin: auto;
	border-radius: 10px;
	margin-bottom: 30rpx;
	> view {
		padding: 0 30rpx;
		background: #ffffff;
	}
	&_imageItem {
		display: flex;
		padding: 17rpx 0 15rpx 0;
		border-bottom: 1px solid #eeeeee;
		&_label {
			flex: 0.25;
			white-space: nowrap;
			padding-top: 10rpx;
			display: flex;
			align-items: center;
			.batchOperation {
				> view {
					border: 1px solid #cccccc;
					border-radius: 50%;
					width: 38rpx;
					height: 38rpx;
					margin-right: 20rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}

			.selectEd {
				> view {
					border: none;
					border-radius: 50%;
					width: 38rpx;
					height: 38rpx;
					margin-right: 20rpx;
					background: #e93323;
					color: #fff;
				}
			}
		}
		&_value {
			flex: 0.75;
			overflow: hidden;
			image {
				width: 120rpx;
				max-height: 120rpx;
				border-radius: 8rpx;
			}
		}
	}
	.attributes{
		display: inline-block;
		margin-right: 3rpx;
		&:not(:last-child) {
			&:after{
				content: '/';
				display: inline-block;
			}
		}
		
		
	}
	&_item {
		display: flex;
		align-items: center;
		padding: 32rpx 0;
		border-bottom: 1px solid #eeeeee;
		&_label {
			flex: 0.25;
			white-space: nowrap;
		}
		&_value {
			flex: 0.75;
			image {
				width: 120rpx;
			}
		}
	}
}

.more_than {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto;
	margin-top: 20rpx;
	// width: 710rpx;
	height: 84rpx;
	background: #ffffff;
	border-radius: 10rpx;
}

.handle {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 126rpx;
	background: #ffffff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 30rpx;
	z-index: 10;
	&_button {
		width: 330rpx;
		height: 86rpx;
		border-radius: 43rpx;
		background: #fd6523;
		color: #ffffff;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.save {
		background: #e93323;
	}

	.select_all {
		display: flex;
		align-items: center;
		> view:nth-child(1) {
			border: 1px solid #cccccc;
			border-radius: 50%;
			width: 38rpx;
			height: 38rpx;
			margin-right: 24rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		> view:nth-child(2) {
			color: #282828;
			font-size: 28rpx;
			font-weight: 500;
		}
	}

	.change {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #e93323;
		width: 180rpx;
		height: 70rpx;
		border: 1px solid #e93323;
		border-radius: 35rpx;
		font-size: 30rpx;
	}

	.selectAllEd {
		> view:nth-child(1) {
			background: #e93323;
			border: none;
			color: #fff;
		}
	}
}

.changePopup_container {
	background: #fff;
	border-radius: 16rpx 16rpx 0 0;

	.scrollViewCon {
		max-height: 668rpx;
	}

	&_title {
		display: flex;
		justify-content: flex-end;
		padding: 40rpx 20rpx;
		position: relative;
		> view:nth-child(1) {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		> view:nth-child(2) {
			position: relative;
			z-index: 10;
		}
	}

	&_content {
		padding: 0 30rpx;
		&_item {
			margin-bottom: 20rpx;
			height: 80rpx;
			background: #f5f5f5;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			&_label {
				flex: 0.3;
				color: #666666;
				font-size: 26rpx;
			}
			&_value {
				flex: 0.7;
				display: flex;
				justify-content: flex-end;
				input {
					text-align: right;
				}
			}
		}

		.popup_moreThan {
			margin-top: 18rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			color: #e93323;
			padding-right: 20rpx;
			> span:nth-child(1) {
				display: inline-block;
				margin-right: 10rpx;
				font-size: 24rpx;
			}
		}
	}

	.handle_popup {
		height: 126rpx;
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		&_button {
			width: 580rpx;
			height: 86rpx;
			background: #e93323;
			border-radius: 43rpx;
			color: #ffffff;
			font-size: 32rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}

.hanlerImage {
	position: relative;
	width: 126rpx;
	height: 126rpx;
	border: 1px solid #dddddd;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-radius: 8rpx;
	text-align: center;
	> image {
		height: 100%;
		margin: auto;
	}
	> view:nth-child(1) {
		height: 37rpx;
		margin-bottom: 8rpx;
		display: flex;
		justify-content: center;
		image {
			width: 45rpx;
			display: block;
		}
	}
	> view:nth-child(2) {
		text-align: center;
		color: #bbbbbb;
		font-size: 24rpx;
	}
}
</style>
