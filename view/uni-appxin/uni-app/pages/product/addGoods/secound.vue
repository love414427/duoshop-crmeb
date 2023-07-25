<template>
	<view class=" writeBg  ">
		<view class="container_input marginTop_none">
			<view class="container_input_item">
				<view class="container_input_item_label"><span>是否推荐</span></view>
				<view class="container_input_item_value"><switch :checked="addGoodsSecoundData.is_good == 1" color="#E93323" style="transform:scale(0.8)" @change="isGood" /></view>
			</view>
			<view class="container_input_item">
				<view class="container_input_item_label"><span>是否开启礼包</span></view>
				<view class="container_input_item_value"><switch :checked="addGoodsSecoundData.is_gift_bag == 1" color="#E93323" style="transform:scale(0.8)" @change="isGiftBag" /></view>
			</view>
		</view>
		<view class="tip">
			<span class="iconfont">&#xe688;</span>
			<span>开启后此商品只能在分销礼包中展示并销售</span>
		</view>
		<view class="container_input marginTop_none">
			<view class="container_input_item">
				<view class="container_input_item_label"><span>限购数量</span></view>
				<view class="container_input_item_value">
					<input v-model="addGoodsSecoundData.once_count" type="number" value="" placeholder="请输入限购数量" placeholder-class="inputPlaceHolder" />
			</view>
			</view>
			<view class="container_input_item">
				<view class="container_input_item_label"><span>商品排序</span></view>
				<view class="container_input_item_value">
					<input v-model="addGoodsSecoundData.sort" type="number" value="" placeholder="请输入商品排序" placeholder-class="inputPlaceHolder" />
			</view>
			</view>
		</view>
		<view class="content_list">
			<view class="content_list_item" @click="inputGoodsDetils">
				<view>商品详情</view>
				<view class="content_list_item_han">
					<span v-if="disModel" style="color: #000000">去修改</span>
					<span v-else>设置详情</span>
					<span class="iconfont">&#xe6bd;</span>
				</view>
			</view>
			<view class="content_list_video">
				<view class="content_list_video_title">商品视频</view>
				<view class="video_list">
					<view class="video_list_item photo" v-if="addGoodsSecoundData.video_link">
						<view class="jiao" @click="deleteImage()">
							<video :src="addGoodsSecoundData.video_link"></video>
							<image src="../static/images/close.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="photo" @click="uploadVideo" v-else>
						<view><image src="../static/images/creamer.png" mode="widthFix"></image></view>
						<view>添加视频</view>
					</view>
				</view>
			</view>
		</view>

		<view class="handle dobuButton">
			<view class="handle_button margin_right" @click="lastStep">上一步</view>
			<view class="handle_button" @click="submitCreatedGoods">提交</view>
		</view>
	</view>
</template>
<script>
import { TOKENNAME, HTTP_REQUEST_URL } from '@/config/app.js';
import store from 'store';
import { navigateTo, setStorage, getStorage, removeStorage, navigateBack, Toast,Loading, hideLoading, Modal  } from '../../../libs/uniApi.js';
import { productCreate, productUpdate } from 'api/product.js';
export default {
	components: {
		
	},
	props:{
		merId: {
			type: [String, Number],
			default: ''
		},
		product_id: {
			type: [String, Number],
			default: ''
		},
		resetKey: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			disModel: false,
			upload_max: 10,
			uploadUrl: `${HTTP_REQUEST_URL}/api/upload/video`,
			addGoodsSecoundData: {
				is_good: 0, // 是否推荐
				is_gift_bag: 0,
				sort: '',
				once_count: '', // 限购数量
				video_link: ''
			},
		};
	},

	created() {
		console.log('123');
		this.initData();
	},

	watch: {
		addGoodsSecoundData: {
			handler(val) {
				setTimeout(()=>{
					setStorage(this.product_id ? 'editGoodsDetils' : 'addGoodsSecoundData', val)
				});
			},
			deep: true
		},
		resetKey: {
			handler(val) {
				console.log(1);
				this.initData();
			}
		}
	},
	methods: {
		initData() {
			let editGoodsDetils = {};
			if(getStorage('goodsDis')) {
				this.disModel = true;
			}
			if (this.product_id) {
				editGoodsDetils = getStorage('editGoodsDetils');
				Object.keys(this.addGoodsSecoundData).forEach(item => {
					this.addGoodsSecoundData[item] = editGoodsDetils[item];
				});

				if (editGoodsDetils.content) {
					setStorage('goodsDis', {
						store_name: editGoodsDetils.content.title,
						imageList: editGoodsDetils.content.image
					});
					this.disModel = true;
				}
				setStorage('canChangeSecound', true);
				return;
			}

			if (getStorage('addGoodsSecoundData')) { 	
				Object.keys(this.addGoodsSecoundData).forEach(item => {
					if (getStorage('addGoodsSecoundData')[item] || getStorage('addGoodsSecoundData')[item] == 0) {
						this.addGoodsSecoundData[item] = getStorage('addGoodsSecoundData')[item];
					}
				});

				


			}
		},
		lastStep() {
			this.$emit('lastStep');
		},
		// 创建商品
		submitCreatedGoods() {
			Loading();
			let waitDeleteData = ['addGoodsFormData', 'singleSpecification', 'attrValue', 'modifyPriceData', 'addGoodsSecoundData', 'goodsDis', 'editGoodsDetils', 'canChange', 'canChangeSecound'];
			let attrValue = getStorage('addGoodsFormData').spec_type == 0 ? [getStorage('singleSpecification')] : getStorage('attrValue');
			let postData = {
				...this.addGoodsSecoundData,
				...getStorage('addGoodsFormData'),
				content: {
					title: getStorage('goodsDis') ? getStorage('goodsDis').store_name : '',
					image: getStorage('goodsDis') ? getStorage('goodsDis').imageList : []
				},
				video_link: this.addGoodsSecoundData.video_link
			};

			postData.attrValue = attrValue.filter(item => item != '');

			if (getStorage('addGoodsFormData').spec_type == 0) {
				// postData.attr = [getStorage('singleSpecification')];
			}
			if (this.product_id) {
				productUpdate(this.merId, this.product_id, postData)
					.then(res => {
						waitDeleteData.forEach(item => {
							if (getStorage(item)) {
								removeStorage(item);
							}
						});
						hideLoading()
						Modal('提交成功', '点击确定，返回商品管理', {
							showCancel: false
						}).then(() => {
							uni.redirectTo({
								url:'/pages/product/goodsOnSale/index?mer_id=' + this.merId
							})
						})
					})
					.catch(rej => {
						Toast(rej);
					});

			} else {
				productCreate(this.merId, postData)
					.then(res => {
						waitDeleteData.forEach(item => {
							if (getStorage(item)) {
								removeStorage(item);
							}
						});
						hideLoading();
						Modal('提交成功', '点击确定，返回商品管理', {
							showCancel: false,
						}).then(() => {
							uni.redirectTo({
								url:'/pages/product/goodsOnSale/index?mer_id=' + this.merId
							})
						})
					})
					.catch(rej => {
						Toast(rej);
					});
			}
		},
		// 是否推荐
		isGood(e) {
			this.addGoodsSecoundData.is_good = e.detail.value ? 1: 0;
		},
		// 是否开启礼包
		isGiftBag(e) {
			this.addGoodsSecoundData.is_gift_bag = e.detail.value ? 1: 0;
		},

		switchChange(value, item) {
			this.addGoodsSecoundData[item.model] = value ? 1 : 0;
		},
		// 跳转商品详情
		inputGoodsDetils() {
			navigateTo(1, '/pages/product/addGoods/addGoodDetils', { mer_id: this.merId });
		},
		// 上传视频
		uploadVideo() {
			uni.chooseVideo({
				sourceType: ['camera', 'album'],
				success: res => {
					if (Math.ceil(res.size / 1024) < this.upload_max * 1024) {
						uni.uploadFile({
							url: this.uploadUrl, //仅为示例，非真实的接口地址
							filePath: res.tempFilePath,
							name: 'file',
							//请求参数
							formData: {
								user: 'test'
							},
							header: {
								// #ifdef MP
								'Content-Type': 'multipart/form-data',
								// #endif
								[TOKENNAME]: 'Bearer ' + store.state.app.token
							},
							success: uploadFileRes => {
								let data = JSON.parse(uploadFileRes.data);
								this.addGoodsSecoundData.video_link = (data.data.src);
							},
							complete: a => {
								// console.log(a);
							}
						});
					} else {
						uni.showModal({
							title: '提示',
							content: `视频超出限制${this.upload_max}MB,已过滤`
						});
					}
				},
				fail: err => {
					uni.showModal({
						content: JSON.stringify(err)
					});
				}
			});
		},
		deleteImage(index) {
			this.addGoodsSecoundData.video_link = '';
		}
	}
};
</script>

<style lang="scss" scoped>
@import './scss/index.scss';

.content_list {
	width: 710rpx;
	margin: auto;
	padding: 0 20rpx;
	box-sizing: border-box;
	background: #fff;
	margin-top: 31rpx;
	border-radius: 10rpx;
	.content_list_item {
		padding: 32rpx 10rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #eee;
		.content_list_item_han {
			color: #bbbbbb;
			display: flex;
			align-items: center;
		}
	}
	.content_list_video {
		min-height: 154rpx;
		padding: 23rpx 10rpx;
		display: flex;
		justify-content: space-between;
		.content_list_video_title {
			padding-top: 10rpx;
		}

		.video_list {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			flex-wrap: wrap;
		}
	}
}

.photo {
	border: 1px solid #dddddd;
	opacity: 1;
	border-radius: 8rpx;
	font-size: 28rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	// padding: 27rpx 21rpx 24rpx 21rpx;
	width: 150rpx;
	height: 150rpx;
	box-sizing: border-box;
	color: #bbbbbb;
	margin-left: 16rpx;
	position: relative;
	margin-bottom: 12rpx;
	image {
		width: 62rpx;
		margin-bottom: 10rpx;
	}
}

.jiao {
	image {
		position: absolute;
		top: -14rpx;
		right: -14rpx;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		padding: 8rpx;
		background: #e93323;
		z-index: 999;
	}
	video {
		width: 150rpx;
		height: 150rpx;
	}
}
.container_input {
	background: #fff;
	padding: 0 20rpx;
	width: 710rpx;

	margin: auto;
	margin-top: 31rpx;
	border-radius: 10rpx;
	&_item {
		display: flex;
		height: 106rpx;
		align-items: center;
		.select_and_input {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.greyColor {
				color: #bbbbbb;
			}
		}

		.radio {
			padding: 30rpx 0;
		}

		&_label {
			padding-left: 10rpx;
			color: #333333;
			font-size: 30rpx;
			display: flex;
			align-items: center;
			.select_check {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 40rpx;
				height: 40rpx;
				border: 1px solid #cccccc;
				border-radius: 50%;
				margin-right: 20rpx;

				.iconfont {
					font-size: 24rpx;
				}
			}

			.select {
				background: #e93323;
				border: none;
				.iconfont {
					color: #fff;
				}
			}
		}
		&_value {
			padding-right: 10rpx;
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: flex-end;

			> span:nth-child(1) {
				display: inline-block;
				margin-right: 15rpx;
			}
			.text {
				color: #000;
				display: inline-block;
				max-width: 400rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			input {
				text-align: right;
			}

			.select_group {
				display: flex;
			}

			&_select {
				display: flex;
				margin-right: 110rpx;
			}
		}

		.flex_start {
			padding: 0 10rpx;
			margin-top: 40rpx;
			justify-content: flex-start;
		}
	}
	> view:not(:last-child) {
		border-bottom: 1px solid #eeeeee;
	}
}

.inputPlaceHolder {
	color: #bbbbbb;
}

.paddingTop_none {
	padding-top: 0 !important;
}
.marginTop_none {
	margin-top: 0;
}

// .writeBg {
// 	background: #fff;
// }
</style>
