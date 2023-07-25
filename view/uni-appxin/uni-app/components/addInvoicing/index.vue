<template>
	<view :style="viewColor">
		<view class="add_invoicing" :class="invoice.invoice==true?'on':''">
			<view class='title'>选择发票<text class='iconfont icon-guanbi' @tap='close'></text></view>
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
						<input name="receipt_title" :value="receipt_title" :maxlength="20" placeholder="需要开具发票的企业名称"/>
						<text class="iconfont icon-xiangyou" @click="callTitle" ></text>
					</view>
					<view v-show="receipt_title_type == '2'" class="acea-row row-middle">
						<view>税号</view>
						<input name="duty_paragraph" :value="duty_paragraph"  placeholder="纳税人识别号" />
					</view>
					<view class="acea-row row-middle">
						<view>邮箱</view>
						<input name="email" :value="email"  placeholder="您的联系邮箱" />
					</view>
				</view>
				<view v-show="receipt_title_type == '2' && receipt_type == '2'" class="panel">
					<view class="acea-row row-middle" style="border-top: 1px solid #EEEEEE;">
						<view>开户银行</view>
						<input name="bank_name" :value="bank_name"  placeholder="您的开户银行" />
					</view>
					<view class="acea-row row-middle">
						<view>银行账号</view>
						<input name="bank_code" :value="bank_code"  placeholder="您的银行账号" />
					</view>
					<view class="acea-row row-middle">
						<view>企业地址</view>
						<input name="address" :value="address"  placeholder="您所在的企业地址" />
					</view>
					<view class="acea-row row-middle">
						<view>企业电话</view>
						<input name="tel" :value="tel"  placeholder="您的企业电话" />
					</view>
				</view>
				<view class="btn-wrap">
					<button class="button" form-type="submit">提交申请</button>
					<button class="back" @tap="noInvoice">不开发票</button>
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
				<scroll-view v-if="invoiceList.length > 0" scroll-y="true">
					<radio-group name="invoice-title" @change="changeTitle">
						<template v-for="item in invoiceList">
							<label :key="item.user_receipt_id" class="acea-row row-middle">
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
				<view v-else class="nothing">
					<image src="../../static/images/noInvoice.png"></image>
					<view class="nothing_text">您还没有添加发票信息哟~</view>
				</view>
				<button v-if="invoice.add" @tap="addTitle">添加新的抬头</button>
				<button v-else @tap="close" class="btn-default">不开发票</button>
			</view>			
		</view>		
		<view class='mask' catchtouchmove="true" :hidden='invoice.invoice==false' @tap='close'></view>
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
	import { invoiceDefault, invoice, invoiceDetail } from '@/api/user.js';
	import { mapGetters } from "vuex";
	export default {
		props: {			
			invoice: {
				type: Object,
				default: function() {
					return {
						invoice: false,
						mer_id: 0,
					};
				}
			}			
		},
		computed: { ...mapGetters(['viewColor'])},
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
						info: '默认发送至所提供的电子邮件'
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
				invoiceData: {},
				formvalidate: false
			}
		},
		watch: {
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
		},
		onShow(){
			this.getInvoiceDefault();
			this.popupTitle = false;
		},
		methods: {
			getInvoiceList() {	
				let params = {
					// receipt_title_type: this.receipt_title_type,
					// receipt_type: this.receipt_type
				}
				invoice().then(res => {
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
					// receipt_title_type: this.receipt_title_type,
					// receipt_type: this.receipt_type
				}
				invoice(params).then(res => {
					let data = res.data[0];
					this.typeName = data.receipt_type == '1' ? '增值税电子普通发票' : '增值税专用发票'
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
			close: function() {
				if(this.formvalidate){
					this.$emit('changeInvoiceClose',this.invoiceData)
				}else{
					this.$emit('changeInvoiceClose','');
				}	
			},
			noInvoice: function(){
				uni.setStorage({
					key:'invoice_Data',
					data:{},
					success: function(){}
				})
				this.$emit('changeInvoiceClose','');
			},
			callType() {
				this.popupType = true;
			},
			changeType(e) {
				this.receipt_type = e.detail.value;
				this.typeName = this.invoiceTypeList.find(value => {
					return value.type == this.receipt_type;
				}).name;			
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
				this.popupType = false;	
				this.popupTitle = false;
				uni.navigateTo({
					url: '/pages/users/user_invoice_form/index?mer_id='+this.invoice.mer_id
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
			},
			changeDefault(e) {
				this.is_default = e.detail.value.length ? 1 : 0;
			},
			// 提交发票数据
			formSubmit(e) {
				let that = this,
					value = e.detail.value;
				if (!value.receipt_title_type) return that.$util.Tips({
					title: '请填写发票抬头'
				});
				if (!value.email) return that.$util.Tips({
					title: '请填写邮箱'
				});	
				if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value.email)) return that.$util.Tips({
					title: '请输入正确的邮箱'
				});			
				if(value.receipt_title_type == 2){
					if (!value.duty_paragraph) return that.$util.Tips({
						title: '请填写税号'
					});
					if(value.receipt_type == '增值税专用发票'){
						if (!value.bank_name) return that.$util.Tips({
							title: '请填写开户行'
						});						
						if (!value.bank_code) return that.$util.Tips({
							title: '请填写银行账号'
						});
						if (!value.address) return that.$util.Tips({
							title: '请填写企业地址'
						});
						if (!value.tel) return that.$util.Tips({
							title: '请填写企业电话'
						});						
						if(!/^(\d{9}|\d{14}|\d{18})$/.test(value.bank_code)){
							return this.$util.Tips({
								title: '请输入正确的银行账号'
							});
						}						
						if(!/(^(\d{3,4})?\d{7,8})$|(13[0-9]{9})/.test(value.tel)){
							return this.$util.Tips({
								title: '请输入正确的电话号码'
							});
						}
					}
				}
				that.formvalidate = true;
				value.mer_id = that.invoice.mer_id;
				value.receipt_type = that.receipt_type;
				that.invoiceData = value
				uni.setStorage({
					key:'invoice_Data',
					data: [that.invoiceData],
					success: function(){
					}
				})
				that.$emit('changeInvoiceClose',that.invoiceData)	
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add_invoicing{
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		background-color: #fff;
		z-index: 77;
		border-radius: 16rpx 16rpx 0 0;
		padding-bottom: 20rpx;
		transform: translate3d(0, 100%, 0);
		transition: all .3s cubic-bezier(.25, .5, .5, .9);
	}	
	.add_invoicing.on {
		transform: translate3d(0, 0, 0);
	}
	.add_invoicing .title {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		height: 123rpx;
		line-height: 123rpx;
		position: relative;
	}
	.add_invoicing .title .iconfont {
		position: absolute;
		right: 30rpx;
		color: #8a8a8a;
		font-size: 35rpx;
	}
	form {
		font-size: 28rpx;
		color: #282828;
	}
	form input, form radio-group {
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
	/deep/radio .uni-radio-input.uni-radio-input-checked,
	/deep/radio .wx-radio-input.wx-radio-input-checked{
	  border: 1px solid var(--view-theme) !important;
	  background-color: var(--view-theme) !important
	}
	form button {
		height: 76rpx;
		border-radius: 38rpx;
		margin: 16rpx 30rpx;
		background-color: var(--view-theme);
		font-size: 30rpx;
		line-height: 76rpx;
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
		width: 100%;
		border-top: 1px solid #F5F5F5;
	}
	.btn-wrap .button{
		height: 86rpx;
		line-height: 86rpx;
		border-radius: 50rpx;
	}
	.btn-wrap .back {
		border-radius: 50rpx;
		height: 86rpx;
		line-height: 86rpx;
		border: 1rpx solid var(--view-theme);
		background: none;
		color: var(--view-theme);
	}
	.popup {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		padding-bottom: 30rpx;
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
	button{
		margin-top: 30rpx;
	}
	button.btn-default{
		background-color: transparent;
		color: var(--view-theme);
		border: 1px solid var(--view-theme);
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
		width: 70rpx;
		height: 28rpx;
		border: 1px solid #E93323;
		margin-left: 18rpx;
		font-size: 16rpx;
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
	.nothing {
		margin: 50rpx 0;
		text-align: center;	
		image, uni-image{
			width: 400rpx;
			height: 260rpx;
		}
	}
	.nothing_text{
		margin-top: 20rpx;
		color: #999999;
	}
</style>
