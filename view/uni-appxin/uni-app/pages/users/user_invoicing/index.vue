<template>
	<view>
		<form @submit="formSubmit" report-submit="true">
			<view class="panel">
				<view v-if="receipt_title_type == '1'" class="acea-row row-middle">
					<view>发票类型</view>
					<input name="receipt_type" :value="typeName" disabled="true" />
				</view>
				<view v-if="receipt_title_type == '2'" class="acea-row row-middle">
					<view>发票类型</view>
					<input name="receipt_type" :value="typeName" disabled="true" @click="callType" />
					<text class="iconfont icon-xiangyou"></text>
				</view>
				<view class="acea-row row-middle">
					<view>抬头类型</view>
					<radio-group name="receipt_title_type" @change="changeHeader">
						<label>
							<radio value="1" :checked="receipt_title_type == '1' ? true : false" /><text>个人</text>
						</label>
						<label>
							<radio value="2" :checked="receipt_title_type == '2' ? true : false" /><text>企业</text>
						</label>
					</radio-group>
				</view>
				<view class="acea-row row-middle">
					<view>发票抬头</view>
					<input name="receipt_title" :value="receipt_title" placeholder="需要开具发票的企业名称" disabled="true" @click="callTitle" />
					<text class="iconfont icon-xiangyou"></text>
				</view>
				<view v-show="receipt_title_type == '2'" class="acea-row row-middle">
					<view>税号</view>
					<input name="duty_paragraph" :value="duty_paragraph" disabled="true" placeholder="纳税人识别号" />
				</view>
				<view class="acea-row row-middle">
					<view>手机号</view>
					<input name="drawer_phone" :value="drawer_phone" disabled="true" placeholder="您的手机号" />
				</view>
				<view class="acea-row row-middle">
					<view>邮箱</view>
					<input name="email" :value="email" disabled="true" placeholder="您的联系邮箱" />
				</view>
			</view>
			<view v-show="receipt_title_type == '2' && receipt_type == '2'" class="panel">
				<view class="acea-row row-middle">
					<view>开户银行</view>
					<input name="bank_name" :value="bank_name" disabled="true" placeholder="您的开户银行" />
				</view>
				<view class="acea-row row-middle">
					<view>银行账号</view>
					<input name="bank_code" :value="bank_code" disabled="true" placeholder="您的银行账号" />
				</view>
				<view class="acea-row row-middle">
					<view>企业地址</view>
					<input name="address" :value="address" disabled="true" placeholder="您所在的企业地址" />
				</view>
				<view class="acea-row row-middle">
					<view>企业电话</view>
					<input name="tel" :value="tel" disabled="true" placeholder="您的企业电话" />
				</view>
			</view>
			<!-- <checkbox-group class="acea-row row-middle panel" name="isDefault" @change="changeDefault">
				<label>
					<checkbox :checked="is_default ? true : false" /><text>设置为默认抬头</text>
				</label>
			</checkbox-group> -->
			<view class="btn-wrap">
				<button form-type="submit">提交申请</button>
				<button class="back" @tap="goBack">不开发票</button>
			</view>
		</form>
		<view :class="{ mask: popupType || popupTitle }"></view>
		<view class="popup" :class="{ on: popupType }">
			<view class="title">发票类型选择<text class="iconfont icon-guanbi" @click="closeType"></text></view>
			<scroll-view scroll-y="true">
				<radio-group name="invoice-type" @change="changeType">
					<label v-for="item in invoiceTypeList" :key="item.type" class="acea-row row-middle">
						<view class="text">
							<view>{{ item.name }}</view>
							<view class="info">{{ item.info }}</view>
						</view>
						<radio :value="item.type" :checked="receipt_type == item.type ? true : false" />
					</label>
				</radio-group>
			</scroll-view>
			<button @tap="closeType">确定</button>
		</view>
		<view class="popup" :class="{ on: popupTitle }">
			<view class="title">抬头选择<text class="iconfont icon-guanbi" @click="closeTitle"></text></view>
			<scroll-view scroll-y="true">
				<radio-group name="invoice-title" @change="changeTitle">
					<template v-for="item in invoiceList">
						<label v-if="receipt_title_type == item.receipt_title_type" :key="item.user_receipt_id" class="acea-row row-middle">
							<view class="text">
								<view class="acea-row row-middle">
									<view class="name">{{ item.receipt_title }}</view>
									<view v-if="item.is_default" class="label">默认</view>
								</view>
								<view class="type" :class="{ special: item.receipt_type == '2'}">{{ item.receipt_type == 1 ? '普通发票' : '专用发票'}}</view>
							</view>
							<radio :value="item.user_receipt_id" :checked="item.user_receipt_id == invoice_id ? true : false" />
						</label>
					</template>
				</radio-group>
			</scroll-view>
			<button @tap="addTitle">添加新的抬头</button>
		</view>
		<home></home>
	</view>
</template>

<script>
	// +----------------------------------------------------------------------
	// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
	// +----------------------------------------------------------------------
	// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
	// +----------------------------------------------------------------------
	// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
	// +----------------------------------------------------------------------
	// | Author: CRMEB Team <admin@crmeb.com>
	// +----------------------------------------------------------------------
	import home from '@/components/home';
	import {
		invoiceDefault,
		invoice,
		invoiceDetail
	} from '@/api/user.js';
	export default {
		components: {
			home
		},
		data() {
			return {
				id: '',
				receipt_title_type: '1',
				receipt_type: '1',
				drawer_phone: '',
				receipt_title: '',
				duty_paragraph: '',
				tel: '',
				address: '',
				bank_name: '',
				bank_code: '',
				is_default: 0,
				email: '',
				isDefault: [],
				typeName: '增值税电子普通发票',
				popupType: false,
				popupTitle: false,
				invoiceTypeList: [{
						type: '1',
						name: '增值税电子普通发票',
						info: '纸质发票开出后将以邮寄形式交付'
					},
					{
						type: '2',
						name: '增值税专用发票',
						info: '纸质发票开出后将以邮寄形式交付'
					}
				],
				special_invoice: true,
				invoice_func: true,
				invoiceList: [],
				invoice_checked: '',
				invoice_id: '',
				order_id: '',
				news: '',
				cartId: '',
				pinkId: '',
				couponId: '',
				addressId: '',

			}
		},
		watch: {
			// receipt_title_type(value) {
			// 	this.receipt_title = '';
			// },
			// invoice_id(value) {
			// 	let result = this.invoiceList.find(item => {
			// 		return item.user_receipt_id == value;
			// 	});
			// 	this.receipt_title = result.receipt_title;
			// }
		},
		onLoad(option) {
			this.news = option.news;
			this.cartId = option.cartId;
			this.pinkId = option.pinkId;
			this.couponId = option.couponId;
			this.addressId = option.addressId;
			if (option.special_invoice == 'false') {
				this.$set(this, 'special_invoice', false);
			}
			this.getInvoiceDefault();
			this.getInvoiceList();
		},
		methods: {
			getInvoiceList() {	
				let params = {
					receipt_title_type: this.receipt_title_type,
					receipt_type: this.receipt_type
				}
				invoice(params).then(res => {
					for (let i = 0; i < res.data.length; i++) {
						res.data[i].user_receipt_id = res.data[i].user_receipt_id.toString();
						if (res.data[i].is_default) {
							this.invoice_id = res.data[i].user_receipt_id;
						}
					}
					this.$set(this, 'invoiceList', res.data);
				}).catch(err => {
					this.$util.Tips({
						title: err
					});
				});
			},
			getInvoiceDefault() {
				let params = {
					is_default: 1,
					receipt_title_type: this.receipt_title_type,
					receipt_type: this.receipt_type
				}
				invoice(params).then(res => {
					let data = res.data[0];
					this.receipt_title_type = data.receipt_title_type;
					this.receipt_type = data.receipt_type ;
					this.receipt_title = data.receipt_title;
					// this.drawer_phone = res.data.drawer_phone;
					this.email = data.email;
					this.duty_paragraph = data.duty_paragraph;
					this.bank_name = data.bank_name;
					this.bank_code = data.bank_code;
					this.address = data.address;
					this.tel = data.tel;
					// this.is_default = data.is_default;
					this.invoice_id = data.user_receipt_id.toString();
				}).catch(err => {});
			},
			getInvoiceDetail(id){
				invoiceDetail(id).then(res => {
					uni.hideLoading();
					this.receipt_title_type = res.data.receipt_title_type;
					this.receipt_type = res.data.receipt_type;
					this.typeName = this.receipt_type == '1' ? '增值税电子普通发票' : '增值税专用发票'
					this.receipt_title = res.data.receipt_title;
					// this.drawer_phone = res.data.drawer_phone;
					this.email = res.data.email;
					this.duty_paragraph = res.data.duty_paragraph;
					this.bank_name = res.data.bank_name;
					this.bank_code = res.data.bank_code;
					this.address = res.data.address;
					this.tel = res.data.tel;
					this.is_default = res.data.is_default;
				}).catch(err => {
					uni.hideLoading();
					this.$util.Tips({
						title: err
					});
				});
			},
			callType() {
				this.popupType = true;
			},
			changeType(e) {
				this.receipt_type = e.detail.value;
				this.typeName = this.invoiceTypeList.find(value => {
					return value.type == this.receipt_type;
				}).name;
				this.getInvoiceList();			
			},
			closeType() {
				this.popupType = false;
			},
			callTitle() {
				this.popupTitle = true;
			},
			changeTitle(e) {
				this.invoice_id = e.detail.value.toString();
				this.getInvoiceDetail(e.detail.value)
				this.popupTitle = false;
			},
			addTitle() {
				uni.navigateTo({
					url: '/pages/users/user_invoice_list/index'
				});	
			},
			closeTitle() {
				this.popupTitle = false;
			},
			changeHeader(e) {
				this.receipt_title_type = e.detail.value;
				if(e.detail.value == 1){
					this.receipt_type = 1;
					this.typeName = '增值税电子普通发票'
				}
				this.receipt_type
				this.getInvoiceDefault();
				this.getInvoiceList();
			},
			changeDefault(e) {
				this.is_default = e.detail.value.length ? 1 : 0;
			},
			// 提交发票数据
			formSubmit(e) {
				uni.navigateTo({
					url: '/pages/users/order_confirm/index?new=' + this.news + '&cartId=' + this.cartId + '&addressId=' + this.addressId +
						'&pinkId=' + this.pinkId + '&couponId=' + this.couponId + '&invoice_id=' + this.invoice_id + '&invoice_type=' +
						this.receipt_type
				});
			},
			goBack() {
				uni.navigateTo({
					url: '/pages/users/order_confirm/index?new=' + this.news + '&cartId=' + this.cartId + '&addressId=' + this.addressId +
						'&pinkId=' + this.pinkId + '&couponId=' + this.couponId
				});
			}
		}
	}
</script>

<style scoped>
	form {
		font-size: 28rpx;
		color: #282828;
	}

	form input,
	form radio-group {
		flex: 1;
		text-align: right;
	}

	form input {
		font-size: 26rpx;
	}

	form label {
		margin-right: 50rpx;
	}

	form radio {
		margin-right: 8rpx;
	}

	form checkbox-group {
		height: 90rpx;
	}

	form checkbox {
		margin-right: 20rpx;
	}

	form button {
		height: 86rpx;
		border-radius: 43rpx;
		margin: 26rpx 30rpx;
		background-color: #E93323;
		font-size: 30rpx;
		line-height: 86rpx;
		color: #FFFFFF;
	}

	.panel {
		padding-right: 30rpx;
		padding-left: 30rpx;
		background-color: #FFFFFF;
	}

	.panel~.panel {
		margin-top: 14rpx;
	}

	.panel .acea-row {
		height: 90rpx;
	}

	.panel .acea-row~.acea-row {
		border-top: 1px solid #EEEEEE;
	}

	.input-placeholder {
		font-size: 26rpx;
		color: #BBBBBB;
	}

	.icon-xiangyou {
		margin-left: 25rpx;
		font-size: 18rpx;
		color: #BFBFBF;
	}

	.btn-wrap {
		position: fixed;
		bottom: 58rpx;
		left: 0;
		width: 100%;
	}

	.btn-wrap .back {
		border: 1px solid #E93323;
		background: none;
		color: #E93323;
	}

	.popup {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		padding-bottom: 100rpx;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		background-color: #F5F5F5;
		overflow: hidden;
		transform: translateY(100%);
		transition: 0.3s;
	}

	.popup.on {
		transform: translateY(0);
	}

	.popup .title {
		position: relative;
		height: 137rpx;
		font-size: 32rpx;
		line-height: 137rpx;
		text-align: center;
	}

	.popup scroll-view {
		height: 466rpx;
		padding-right: 30rpx;
		padding-left: 30rpx;
		box-sizing: border-box;
	}

	.popup label {
		padding: 35rpx 30rpx;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
	}

	.popup .text {
		flex: 1;
		min-width: 0;
		font-size: 28rpx;
		color: #282828;
	}

	.popup .info {
		margin-top: 10rpx;
		font-size: 22rpx;
		color: #909090;
	}

	.popup .icon-guanbi {
		position: absolute;
		top: 50%;
		right: 30rpx;
		z-index: 2;
		transform: translateY(-50%);
		font-size: 30rpx;
		color: #707070;
		cursor: pointer;
	}

	.popup button {
		height: 86rpx;
		border-radius: 43rpx;
		margin-right: 30rpx;
		margin-left: 30rpx;
		background-color: #E93323;
		font-size: 30rpx;
		line-height: 86rpx;
		color: #FFFFFF;
	}

	.popup .text .acea-row {
		display: inline-flex;
		max-width: 100%;
	}

	.popup .name {
		flex: 1;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 30rpx;
	}

	.popup .label {
		width: 56rpx;
		height: 28rpx;
		border: 1px solid #E93323;
		margin-left: 18rpx;
		font-size: 20rpx;
		line-height: 26rpx;
		text-align: center;
		color: #E93323;
	}

	.popup .type {
		width: 124rpx;
		height: 42rpx;
		margin-top: 14rpx;
		background-color: #FCF0E0;
		font-size: 24rpx;
		line-height: 42rpx;
		text-align: center;
		color: #D67300;
	}

	.popup .type.special {
		background-color: #FDE9E7;
		color: #E93323;
	}
</style>
