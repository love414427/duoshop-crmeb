<template>
	<view :style="viewColor">
		<form @submit="formSubmit" report-submit="true">
			<view class="panel">
				<view v-if="receipt_title_type == 1" class="acea-row row-middle">
					<view>发票类型</view>
					<input name="receipt_type" :value="typeName" disabled="true" />
				</view>
				<view v-else class="acea-row row-middle">
					<view>发票类型</view>
					<input name="receipt_type" :value="typeName" disabled="true" @click="callType" />
					<text class="iconfont icon-xiangyou"></text>
				</view>
				<view class="acea-row row-middle">
					<view>抬头类型</view>
					<radio-group name="receipt_title_type" @change="changeHeader">
						<label>
							<radio value="1" :checked="receipt_title_type == 1 ? true : false" /><text>个人</text>
						</label>
						<label>
							<radio value="2" :checked="receipt_title_type == 2 ? true : false" /><text>企业</text>
						</label>
					</radio-group>
				</view>
				<view class="acea-row row-middle">
					<view>发票抬头</view>
					<input name="receipt_title" :value="receipt_title"  :placeholder="receipt_title_type == 1 ? '需要开具发票的姓名' : '需要开具发票的企业名称'" />
					<!-- <text class="iconfont icon-xiangyou"></text> -->
				</view>
				<view v-show="receipt_title_type === '2' && receipt_title_type === '2'" class="acea-row row-middle">
					<view>税号</view>
					<input name="duty_paragraph" :value="duty_paragraph" maxlength="20" placeholder="纳税人识别号" />
				</view>
				<!-- <view class="acea-row row-middle">
					<view>手机号</view>
					<input name="drawer_phone" :value="drawer_phone" placeholder="您的手机号" />
				</view> -->
				<view class="acea-row row-middle">
					<view>邮箱</view>
					<input name="email" :value="email" placeholder="您的联系邮箱" />
				</view>
			</view>
			<view v-show="receipt_title_type == '2' && receipt_type == '2'" class="panel">
				<view class="acea-row row-middle">
					<view>开户银行</view>
					<input name="bank_name" :value="bank_name" maxlength="15" placeholder="您的开户银行" />
				</view>
				<view class="acea-row row-middle">
					<view>银行账号</view>
					<input name="bank_code" :value="bank_code" placeholder="您的银行账号" />
				</view>
				<view class="acea-row row-middle">
					<view>企业地址</view>
					<input name="address" :value="address" maxlength="30" placeholder="您所在的企业地址" />
				</view>
				<view class="acea-row row-middle">
					<view>企业电话</view>
					<input name="tel" :value="tel" placeholder="您的企业电话" />
				</view>
			</view>
			<checkbox-group class="acea-row row-middle panel" name="isDefault" @change="changeDefault">
				<label>
					<checkbox :checked="is_default ? true : false" /><text>设置为默认抬头</text>
				</label>
			</checkbox-group>
			<button form-type="submit" :disabled="loading" :class="loading ? 'disabled' : ''">保存</button>
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
					<label class="acea-row row-middle">
						<view class="text">
							<view class="acea-row row-middle">
								<view class="name">西安众邦网络科技有限公司</view>
								<view class="label">默认</view>
							</view>
							<view class="type">普通发票</view>
						</view>
						<radio value="西安众邦网络科技有限公司" :checked="receipt_title === '西安众邦网络科技有限公司' ? true : false" />
					</label>
				</radio-group>
			</scroll-view>
			<button>添加新的抬头</button>
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
	import { invoiceSave, invoiceUpdate, invoiceDetail } from '@/api/user.js';
	import { mapGetters } from "vuex";
	export default {
		components: {
			home
		},
		props: {},
		computed: mapGetters(['viewColor']),
		data() {
			return {
				loading: false,
				id: '',
				mer_id: '',
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
						info: '默认发送至所提供的电子邮件'
					},
					{
						type: '2',
						name: '增值税专用发票',
						info: '纸质发票开出后将以邮寄形式交付'
					}
				],
				addInvoice: []
			};
		},
		onLoad: function(options) {
			if (options.id) {
				this.id = options.id;
				this.getInvoiceDetail();
			}
			if(options.mer_id){
				this.mer_id = options.mer_id
			}
		},
		methods: {
			getInvoiceDetail() {
				uni.showLoading({
					title: '加载中'
				});
				invoiceDetail(this.id).then(res => {
					uni.hideLoading();
					this.receipt_title_type = res.data.receipt_title_type;
					this.receipt_type = res.data.receipt_type;
					this.receipt_title = res.data.receipt_title;
					this.typeName = this.receipt_type == 1 ? '增值税电子普通发票' : '增值税专用发票' 
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
			// 提交发票数据
			formSubmit(e) {
				let formData = e.detail.value;
				console.log(formData)
				if (formData.receipt_title_type === '2') {
					if (!formData.receipt_title) {
						return this.$util.Tips({
							title: '请输入需要开具发票的企业名称'
						});
					}
					if (!formData.duty_paragraph) {
						return this.$util.Tips({
							title: '请输入纳税人识别码'
						});
					}
					if(this.receipt_type == 2){
						if (!formData.bank_name) return this.$util.Tips({
							title: '请输入开户行'
						});
						
						if (!formData.bank_code) return this.$util.Tips({
							title: '请输入银行账号'
						});
						if(!/^(\d{9}|\d{14}|\d{18})$/.test(formData.bank_code)){
							return this.$util.Tips({
								title: '请输入正确的银行账号'
							});
						}						
						if(!/(^(\d{3,4})?\d{7,8})$|(^1(3|4|5|7|8|9|6)\d{9}$)/i.test(formData.tel)){
							return this.$util.Tips({
								title: '请输入正确的电话号码'
							});
						}	
					}				
				} else {
					if (!formData.receipt_title) {
						return this.$util.Tips({
							title: '请输入需要开具发票的姓名'
						});
					}
				}
				if (formData.email) {
					if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(formData.email)) {
						return this.$util.Tips({
							title: '请输入正确的邮箱'
						});
					}
				}
				this.loading = true;
				formData.receipt_type = this.receipt_type;
				formData.is_default = this.is_default;
				uni.showLoading({
					title: '保存中',
					mask: true
				});
				this.id ? invoiceUpdate(this.id,formData).then(res => {
					uni.hideLoading();
					this.$util.Tips({
						title: '添加成功',
						icon: 'success'
					});

					setTimeout(() => {
						// #ifdef H5
						return history.back();
						// #endif
						// #ifndef H5
						return uni.navigateBack({
							delta: 1,
						})
						// #endif
					}, 1000);
				}).catch(err => {
					uni.hideLoading();
					this.$util.Tips({
						title: err
					});
					this.loading = false;
				}) :
				invoiceSave(formData).then(res => {
					let that = this
					uni.hideLoading();
					that.$util.Tips({
						title: '添加成功',
						icon: 'success'
					});
					if(that.mer_id){
						formData.mer_id = that.mer_id
						uni.getStorage({
							key:"invoice_Data",
							success: function (res) {
								that.addInvoice = res.data;
							}
						})
						let arr = [formData]
						console.log(that.addInvoice)
						if(that.addInvoice.length){
							that.addInvoice.forEach((item, i) => {
								if (item.mer_id == that.mer_id) {
									that.addInvoice.splice(i,1)
								}
							})
						}
						arr = (that.addInvoice.length && that.addInvoice[0]['mer_id']) ? arr.concat(that.addInvoice) : arr

						uni.setStorage({
							key:'invoice_Data',
							data: arr,
							success: function(){
							}
						})
						
					}
					setTimeout(() => {
						// #ifdef H5
						return history.back();
						// #endif
						// #ifndef H5
						return uni.navigateBack({
							delta: 1,
						})
						// #endif
					}, 1000);
				}).catch(err => {
					uni.hideLoading();
					this.$util.Tips({
						title: err
					});
					this.loading = false;
				});
			},
			callType() {
				this.popupType = true;
				
			},
			changeType(e) {
				this.receipt_type = e.detail.value;
				this.typeName = this.invoiceTypeList.find(value => {
					return value.type === this.receipt_type;
				}).name;
			},
			closeType() {
				this.popupType = false;
			},
			callTitle() {
				this.popupTitle = true;
			},
			changeTitle(e) {
				this.receipt_title = e.detail.value;
			},
			closeTitle() {
				this.popupTitle = false;
			},
			changeHeader(e) {
				this.receipt_title_type = e.detail.value;
				if (e.detail.value == 1) {
					this.receipt_type = 1;
					this.typeName = '增值税电子普通发票';
				}
			},
			changeDefault(e) {
				this.is_default = e.detail.value.length ? 1 : 0;
			}
		}
	}
</script>

<style scoped>
	/deep/radio .wx-radio-input.wx-radio-input-checked,
	/deep/uni-radio .uni-radio-input.uni-radio-input-checked {
	 border: 1px solid var(--view-theme)!important;
	 background-color: var(--view-theme)!important;
	}
	/deep/checkbox .uni-checkbox-input.uni-checkbox-input-checked,
	/deep/checkbox .wx-checkbox-input.wx-checkbox-input-checked {
	  border: 1px solid var(--view-theme)!important;
	  background-color: var(--view-theme)!important;
	  color: #fff!important;
	}
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
		margin: 66rpx 30rpx;
		background-color: var(--view-theme);
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
		background-color: var(--view-theme);
		font-size: 30rpx;
		line-height: 86rpx;
		color: #FFFFFF;
	}
	uni-button[disabled]:not([type]), uni-button[disabled][type=default] {
		opacity: .5;
		background-color: var(--view-theme);
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
