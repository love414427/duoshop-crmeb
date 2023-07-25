<template>
	<view v-if="!successful" :style="viewColor">
		<form report-submit='true'>
			<view class='merchantsSettled'>
				<view class="merchantBgCount">
					<image mode="widthFix" class="merchantBg" :src="domain+'/static/diy/merchantBg'+keyColor+'.jpg'" alt="">
				</view>
				<view class="application-record" @click="jumpToList">
					申请记录
					<text class="iconfont icon-xiangyou"></text>
				</view>
				<view class='list'>
					<view class="item">
						<view class="acea-row row-middle">
							<text class="item-name">商户名称</text>
							<input type="text" maxlength="30" placeholder="请输入商户名称" v-model="merchantData.enterprise_name" @input="validateBtn"
							 placeholder-class='placeholder' />
						</view>
					</view>
					<view class="item">
						<view class="acea-row row-middle">
							<text class="item-name">用户姓名</text>
							<input type="text" placeholder="请输入姓名" v-model="merchantData.user_name" @input="validateBtn" placeholder-class='placeholder' />
						</view>
					</view>
					<view class="item">
						<view class="acea-row row-middle">
							<text class="item-name">联系电话</text>
							<input type="text" placeholder="请输入手机号" v-model="merchantData.phone" @input="validateBtn" placeholder-class='placeholder' />
						</view>
					</view>
					<view class="item rel">
						<view class="acea-row row-middle">
							<text class="item-name">验证码</text>
							<input type="text" placeholder="填写验证码" v-model="merchantData.yanzhengma" @input="validateBtn" class="codeIput"
							 placeholder-class='placeholder' />
							<button class="code" :disabled="disabled" :class="disabled === true ? 'on' : ''" @click="handleVerify">
								{{ text }}
							</button>
						</view>
					</view>
					<view class="item" v-if="isShowCode">
						<view class="acea-row row-middle">
							<text class="item-name">验证码</text>
							<input type="text" placeholder="请输入验证码" class="codeIput" v-model="codeVal" @input="validateBtn"
							 placeholder-class='placeholder' />
							<view class="imageCode" @click="again"><image :src="codeUrl" /></view>
						</view>
					</view>
					<view class="item">
						<view class="uni-list">
							<view class="uni-list-cell">
								<view class="uni-list-cell-db acea-row row-middle">
									<text class="item-name">商户分类</text>
									<picker @change="bindPickerChange" :value="index" :range="array" range-key="category_name">
										<input placeholder="请选择商户分类" type="text" readonly disabled v-model="mer_classification">
										<view class='iconfont icon-jiantou'></view>
									</picker>
								</view>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="uni-list">
							<view class="uni-list-cell">
								<view class="uni-list-cell-db acea-row row-middle">
									<text class="item-name">店铺类型</text>
									<text class="iconfont wenhao" @click="getAgreement">?</text>
									<picker @change="bindPickerChange1" :value="index1" :range="storeTypeArr" range-key="type_name">
										<input placeholder="请选择店铺类型" type="text" disabled readonly v-model="mer_storeType">
										<view v-if="mer_storeType" @tap.stop="mer_storeType=''" class="iconfont icon-guanbi2"></view>
										<view class='iconfont icon-jiantou'></view>
									</picker>
								</view>
							</view>
						</view>
					</view>
					<view class="item no-border">
						<view class='acea-row row-middle'>
							<text class="item-title">请上传营业执照及行业相关资质证明图片</text>
							<text class="item-desc">(图片最多可上传10张,图片格式支持JPG、PNG、JPEG)</text>
							<view class="upload">
								<view class='pictrue' v-for="(item,index) in pics" :key="index" :data-index="index" @click="getPhotoClickIdx">
									<image :src='item'></image>
									<text class='iconfont icon-guanbi1' @click.stop='DelPic(index)'></text>
								</view>
								<view class='pictrue acea-row row-center-wrapper row-column' @click='uploadpic' v-if="pics.length < 10">
									<text class='iconfont icon-icon25201'></text>
									<view>上传图片</view>
								</view>
							</view>
						</view>
					</view>
					<view class="item no-border">
						<checkbox-group @change='ChangeIsAgree'>
							<checkbox class="checkbox" :checked="isAgree ? true : false" />已阅读并同意</checkbox-group>
						<button class="settleAgree" @click="getConfig">《入驻协议》</button>
					</view>
					<button class='submitBtn' :class="validate === true ? 'on':''" @click="formSubmit">提交申请</button>
				</view>
			</view>
		</form>
		<view class="settlementAgreement" v-if="showProtocol">
			<view class="setAgCount">
				<i class="icon iconfont icon-cha" @click="showProtocol = false"></i>
				<div class="title">{{isType ? '店铺类型说明' : '商户入驻协议'}}</div>
				<view class="content">
					<jyf-parser :html="protocol" ref="article" :tag-style="tagStyle"></jyf-parser>
					<!-- <view v-html="protocol"></view> -->
				</view>
			</view>
		</view>
		<view class='loadingicon acea-row row-center-wrapper' v-if="loading">
			<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>
		</view>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
    <Verify @success="success" :captchaType="'blockPuzzle'" :imgSize="{ width: '330px', height: '155px' }" ref="verify"></Verify>
	</view>
	<view class="settledSuccessMain" v-else :style="viewColor">
		<view class="settledSuccessful">
			<image class="image" src="../static/images/settledSuccessful.svg" alt="">
			<view class="title">恭喜，您的资料提交成功！</view>
			<view class="info">预计15个工作日内审核完毕，平台客服会及时与您联系！</view>
			<view class="goHome" hover-class="none" @click="goHome">
				返回首页
			</view>
		</view>
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
	import {
		create,
		verify,
		merClassifly,
		getGoodsDetails,
		updateGoodsRecord,
		getStoreTypeApi
	} from '@/api/store.js';
	import {
		getCaptcha,
		getAgreementApi
	} from "@/api/user";
	import { mapGetters } from "vuex";
	import { configMap } from "@/utils";
	import parser from "@/components/jyf-parser/jyf-parser";
	import authorize from '@/components/Authorize';
  import Verify from '@/components/verify/verify.vue';
	import { HTTP_REQUEST_URL } from '@/config/app';
	const app = getApp();
	export default {
		components: {
			"jyf-parser": parser,
			authorize,
      Verify
		},
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				cartId: '', //购物车id
				pinkId: 0, //拼团id
				couponId: 0, //优惠券id
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				text: "获取验证码",
				codeUrl: "",
				disabled: false,
				isAgree: false,
				showProtocol: false,
				isShowCode: false,
				loading: false,
				merchantData: {
					enterprise_name: "",
					user_name: "",
					phone: "",
					classification: ''
				},
				validate: false,
				successful: false,
				keyCode: "",
				codeVal: "",
				protocol: this.sys_intention_agree,
				timer: "",
				index: 0,
				index1: 0,
				mer_classification: "",
				array: [{
					category_name: '',
					merchant_category_id: ''
				}],
				storeTypeArr: [{
					type_name: '',
					mer_type_id: ''
				}],
				mer_storeType: '',
				pics: [],
				tagStyle: {
					img: 'width:100%;display:block;'
				},
				mer_i_id: null, // 商户申请id
				isType: false,
			};
		},
		beforeDestroy() {
			clearTimeout(this.timer)
		},
		computed: configMap({sys_intention_agree:''},mapGetters(['isLogin','viewColor','keyColor'])),
		onLoad(options) {
			if (this.isLogin) {
				this.getClassfication();
				this.getStoreType();
			} else {
				this.isAuto = true;
				this.isShowAuth = true
			}
			if (options.mer_i_id) {
				this.mer_i_id = options.mer_i_id
				uni.showLoading({
					title: '获取数据中',
				});
				this.$nextTick(function() {
					this.getGoodsDetails(options.mer_i_id)
				})
			}
		},
		onShow() {},
		onReady() {},
		methods: {
			getConfig() {
				this.isType = false;
				this.showProtocol = true;
				// 获取配置
				this.protocol = this.sys_intention_agree
			},
			/*获取发票说明*/
			getAgreement() {
				let that = this
				that.showProtocol = true;
				that.isType = true
				getAgreementApi('sys_merchant_type').then(res => {
					that.protocol = res.data.sys_merchant_type
				})
			},
			// 获取历史提交数据详情
			getGoodsDetails(id) {
				getGoodsDetails(id).then(res => {
					let arr = Object.keys(this.merchantData)
					let resData = res.data
					arr.map(item => {
						this.merchantData.enterprise_name = resData.mer_name
						this.merchantData.user_name = resData.name
						this.merchantData.phone = resData.phone
						this.merchantData.classification = resData.merchant_category_id
						this.merchantData.mer_type = resData.mer_type_id
					})
					this.pics = resData.images
					this.mer_classification = this.getCategoryName(resData.merchant_category_id, this.array)
					this.mer_storeType = this.getStoreTypeName(resData.mer_type_id, this.storeTypeArr)
					uni.hideLoading();
				})
			},
			//获取商户分类名称
			getCategoryName(id, arr) {
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].merchant_category_id === id) {
						return arr[i]['category_name']
					}
				}
			},
			//获取店铺类型名称
			getStoreTypeName(id, arr) {
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].mer_type_id === id) {
						return arr[i]['type_name']
					}
				}
			},
			bindPickerChange: function(e) {
				this.index = e.target.value
				let idx = e.target.value
				this.merchantData.classification = this.array[idx]['merchant_category_id']
				this.mer_classification = this.array[idx]['category_name']
				this.validateBtn()
			},
			bindPickerChange1: function(e) {
				this.index1 = e.target.value
				let idx = e.target.value
				this.merchantData.mer_type = this.storeTypeArr[idx]['mer_type_id']
				this.mer_storeType = this.storeTypeArr[idx]['type_name']
				this.validateBtn()
			},
			// 获取商户分类
			getClassfication: function() {
				merClassifly()
					.then(res => {
						this.array = res.data
					})
					.catch(res => {
						this.$util.Tips({
							title: res
						});
					});
			},
			// 获取店铺类型
			getStoreType: function() {
				getStoreTypeApi()
					.then(res => {
						this.storeTypeArr = res.data
					})
					.catch(res => {
						this.$util.Tips({
							title: res
						});
					});
			},
			// 图片预览
			// 获得相册 idx
			getPhotoClickIdx(e) {
				let _this = this;
				let idx = e.currentTarget.dataset.index;
				_this.imgPreview(_this.pics, idx);
			},
			// 图片预览
			imgPreview: function(list, idx) {
				// list：图片 url 数组
				if (list && list.length > 0) {
					uni.previewImage({
						current: list[idx], //  传 Number H5端出现不兼容
						urls: list
					});
				}
			},
			// 授权回调
			onLoadFun: function() {
				this.isShowAuth = false;
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			toggleTab(str) {
				this.$refs[str].show();
			},
			// 首页
			goHome() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			again() {
				this.getcaptcha()
			},
			/**
			 * 上传文件
			 *
			 */
			uploadpic: function() {
				let that = this;
				that.$util.uploadImageOne('upload/image', function(res) {
					that.pics.push(res.data.path);
					that.$set(that, 'pics', that.pics);
				});
			},
			/**
			 * 删除图片
			 *
			 */
			DelPic: function(index) {
				let that = this,
					pic = this.pics[index];
				that.pics.splice(index, 1);
				that.$set(that, 'pics', that.pics);
			},
			getCode() {
				let that = this
				getCodeApi()
					.then(res => {
						that.keyCode = res.data.key;
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			async code(data) {
				let that = this;
				if (!that.merchantData.phone) return that.$util.Tips({
					title: '请填写手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.merchantData.phone)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				await verify({
						phone: that.merchantData.phone,
						// key: that.codeKey,
						// code: that.codeVal,
						type: 'intention',
            captchaType: 'blockPuzzle',
					  captchaVerification: data.captchaVerification
					})
					.then(res => {
						that.$util.Tips({
							title: res.msg
						});
						that.sendCode();
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
						if (res.status == 402) {
							// that.getcaptcha();
						}
					});
			},
			getcaptcha() {
				let that = this
				getCaptcha().then(data => {
					that.codeUrl = data.data.captcha; //图片路径
					that.codeVal = data.data.code; //图片验证码
					that.codeKey = data.data.key //图片验证码key
				})
				that.isShowCode = true;
			},
			sendCode() {
				if (this.disabled) return;
				this.disabled = true;
				let n = 60;
				this.text = "剩余 " + n + "s";
				const run = setInterval(() => {
					n = n - 1;
					if (n < 0) {
						clearInterval(run);
					}
					this.text = "剩余 " + n + "s";
					if (this.text < "剩余 " + 0 + "s") {
						this.disabled = false;
						this.text = "重新获取";
					}
				}, 1000);
			},
			onConfirm(val) {
				this.region = val.checkArr[0] + '-' + val.checkArr[1] + '-' + val.checkArr[2];
			},
			ChangeIsAgree: function(e) {
				this.isAgree = !this.isAgree;
				this.validateBtn();
			},
			formSubmit: function(e) {
				let that = this;
				if (that.validateForm() && that.validate) {
					let requestData = {
						phone: that.merchantData.phone,
						mer_name: that.merchantData.enterprise_name,
						name: that.merchantData.user_name,
						code: that.merchantData.yanzhengma,
						merchant_category_id: that.merchantData.classification,
						mer_type_id: that.merchantData.mer_type,
						images: that.pics
					}
					that.validate = false;
					if (that.mer_i_id) {
						updateGoodsRecord(that.mer_i_id, requestData).then(res => {
							if (res.status == 200) {
								title: '提交成功',
								that.loading = true;
								that.timer = setTimeout(() => {
									that.successful = true;
									that.validate = true;
								}, 1000)
							}
						}).catch(res => {
							that.validate = true;
							that.$util.Tips({
								title: res
							});
						})
					} else {
						create(requestData).then(data => {
							if (data.status == 200) {
								title: '提交成功',
								that.loading = true;
								this.timer = setTimeout(() => {
									that.successful = true;
										that.validate = true;
								}, 1000)
							}

						}).catch(res => {
							that.validate = true;
							that.$util.Tips({
								title: res
							});
						})
					}
				}
			},
			validateBtn: function() {
				let that = this,
					value = that.merchantData;
				if (value.enterprise_name && value.user_name && value.phone && /^1(3|4|5|7|8|9|6)\d{9}$/i.test(value.phone) &&
					value.yanzhengma && that.isAgree && value.classification) {
					if (!that.isShowCode) {
						that.validate = true;
					} else {
						if (that.codeVal) {
							that.validate = true;
						} else {
							that.validate = false;
						}
					}
				}else{
					that.validate = false;
				}
			},
			validateForm: function() {
				let that = this,
					value = that.merchantData;
				if (!value.enterprise_name) return that.$util.Tips({
					title: '请输入企业名称'
				});
				if (!value.user_name) return that.$util.Tips({
					title: '请输入姓名'
				});
				if (!value.phone) return that.$util.Tips({
					title: '请输入手机号'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(value.phone)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (!value.yanzhengma) return that.$util.Tips({
					title: '请填写验证码'
				});
				if (!value.classification) return that.$util.Tips({
					title: '请选择商户分类'
				});
				if (!that.isAgree) return that.$util.Tips({
					title: '请勾选并同意入驻协议'
				});
				if (that.isShowCode && !that.codeVal) return that.$util.Tips({
					title: '请填写图片验证码'
				});
				that.validate = true;
				return true;
			},
			jumpToList() {
				uni.navigateTo({
					url: "/pages/store/applicationRecord/index"
				})
			},
      success(data) {
				this.$refs.verify.hide();
				this.code(data);
			},
			handleVerify() {
				if (!this.merchantData.phone) return this.$util.Tips({
					title: '请输入手机号'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(this.merchantData.phone)) return this.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (!this.isAgree) return this.$util.Tips({
					title: '请勾选并同意入驻协议'
				});
				this.$refs.verify.show();
			}
		}
	}
</script>

<style scoped lang="scss">
	/deep/checkbox .uni-checkbox-input.uni-checkbox-input-checked,
	/deep/checkbox .wx-checkbox-input.wx-checkbox-input-checked {
	  border: 1px solid var(--view-theme)!important;
	  background-color: var(--view-theme)!important;
	  color: #fff!important;
	}
	.uni-input-placeholder {
		color: #B2B2B2;
	}
	.item-name{
		width: 190rpx;
	}
	.uni-list-cell {
		position: relative;
		.iconfont {
			font-size: 14px;
			color: #7a7a7a;
			position: absolute;
			right: 15px;
			top: 7rpx;
		}
		.icon-guanbi2{
			right: 35px;
		}
	}
	.merchantBgCount{
		line-height: 0;
	}
	.merchantsSettled {
		background-image: linear-gradient(var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
		height: 140vh;
	}
	.merchantsSettled .merchantBg {
		width: 750rpx;
		width: 100%;
	}
	.merchantsSettled .list {
		background-color: #fff;
		border-radius: 12px;
		padding: 22px 0;
		margin: 0 15px;
		position: absolute;
		top: 300rpx;
		width: calc(100% - 30px);
		
	}
	.application-record {
		position: absolute;
		display: flex;
		align-items: center;
		top: 240rpx;
		right: 0;
		color: #fff;
		font-size: 22rpx;
		background-color: rgba(0, 0, 0, 0.3);
		padding: 8rpx 18rpx;
		border-radius: 20px 0px 0px 20px;
	}
	.merchantsSettled .list .item {
		padding: 50rpx 0 20rpx;
		border-bottom: 1px solid #eee;
		position: relative;
		margin: 0 20px;
		&.no-border {
			border-bottom: none;
			padding-left: 0;
			padding-right: 0;
		}
		.item-title {
			color: #666666;
			font-size: 28rpx;
			display: block;
		}
		.item-desc {
			color: #B2B2B2;
			font-size: 22rpx;
			display: block;
			margin-top: 9rpx;
			line-height: 36rpx;
		}
	}
	.acea-row,.upload {
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-lines: multiple;
		-moz-box-lines: multiple;
		-o-box-lines: multiple;
		-webkit-flex-wrap: wrap;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
	}
	.upload {
		margin-top: 20rpx;
	}
	.acea-row.row-middle {
		-webkit-box-align: center;
		-moz-box-align: center;
		-o-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding-left: 2px;
	}
	.acea-row.row-column {
		-webkit-box-orient: vertical;
		-moz-box-orient: vertical;
		-o-box-orient: vertical;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
	}
	.acea-row.row-center-wrapper {
		-webkit-box-align: center;
		-moz-box-align: center;
		-o-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-moz-box-pack: center;
		-o-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
	}
	.merchantsSettled .list .item .pictrue {
		width: 130rpx;
		height: 130rpx;
		margin: 24rpx 22rpx 0 0;
		position: relative;
		font-size: 11px;
		color: #bbb;
		&:nth-child(4n) {
			margin-right: 0;
		}
		&:nth-last-child(1) {
			border: 0.5px solid #ddd;
			box-sizing: border-box;
		}
		uni-image,
		image {
			width: 100%;
			height: 100%;
			border-radius: 1px;
			img {
				-webkit-touch-callout: none;
				-webkit-user-select: none;
				-moz-user-select: none;
				display: block;
				position: absolute;
				top: 0;
				left: 0;
				opacity: 0;
				width: 100%;
				height: 100%;
			}
		}
		.icon-guanbi1 {
			font-size: 33rpx;
			position: absolute;
			top: -10px;
			right: -10px;
		}
	}
	.uni-list-cell-db{
		position: relative;
	}
	.wenhao{
		width: 34rpx;
		height: 34rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		border-radius: 50%;
		background: #E3E3E3;
		color: #ffffff!important;
		margin-left: 4rpx;
		position: absolute;
		left: 122rpx;
	}
	.merchantsSettled .list .item .imageCode {
		position: absolute;
		top: 7px;
		right: 0;
	}
	.merchantsSettled .list .item .icon {
		font-size: 40rpx;
		color: #b4b1b4;
	}
	.merchantsSettled .list .item input {
		width: 400rpx;
		font-size: 30rpx;
	}
	.merchantsSettled .list .item .placeholder {
		color: #b2b2b2;
	}
	.merchantsSettled .default {
		padding: 0 30rpx;
		height: 90rpx;
		background-color: #fff;
		margin-top: 23rpx;
	}
	.merchantsSettled .default checkbox {
		margin-right: 15rpx;
	}
	.merchantsSettled .acea-row uni-image {
		width: 20px;
		height: 20px;
		display: block;
	}
	.merchantsSettled .list .item .codeIput {
		width: 125px;
	}
	.uni-input-input {
		display: block;
		height: 100%;
		background: none;
		color: inherit;
		opacity: 1;
		-webkit-text-fill-color: currentcolor;
		font: inherit;
		line-height: inherit;
		letter-spacing: inherit;
		text-align: inherit;
		text-indent: inherit;
		text-transform: inherit;
		text-shadow: inherit;
	}
	.merchantsSettled .list .item .code {
		position: absolute;
		width: 93px;
		line-height: 27px;
		border: 1px solid var(--view-theme);
		border-radius: 15px;
		color: var(--view-theme);
		text-align: center;
		bottom: 8px;
		right: 0;
		font-size: 12px;
	}
	.merchantsSettled .list .item .code.on {
		background-color: #bbb;
		color: #fff;
		border-color: #bbb;
	}
	.merchantsSettled .submitBtn {
		width: 588rpx;
		margin: 0 auto;
		height: 86rpx;
		border-radius: 25px;
		text-align: center;
		line-height: 86rpx;
		font-size: 15px;
		color: #fff;
		background: #E3E3E3;
		margin-top: 25px;
		pointer-events: none;
	}
	.merchantsSettled .submitBtn.on {
		background: var(--view-theme);
			pointer-events: all;
	}
	uni-checkbox-group,
	.settleAgree {
		display: inline-block;
		font-size: 24rpx;
	}
	uni-checkbox-group {
		color: #b2b2b2;
	}
	.settleAgree {
		color: var(--view-theme);
		position: relative;
		top: 2px;
		left: 8px;
	}
	.merchantsSettled uni-checkbox .uni-checkbox-wrapper {
		width: 30rpx;
		height: 30rpx;
		border: 2rpx solid #C3C3C3;
		border-radius: 15px;
	}
	.settlementAgreement {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		z-index: 10;
	}
	.settlementAgreement .setAgCount {
		background: #fff;
		width: 656rpx;
		height: 458px;
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: 12rpx;
		-webkit-border-radius: 12rpx;
		padding: 52rpx;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		overflow: hidden;
		.content {
			height: 900rpx;
			overflow-y: scroll;
			/deep/ p {
				font-size: 13px;
				line-height: 22px;
			}
			/deep/ img {
				max-width: 100%;
			}
		}
	}
	.settlementAgreement .setAgCount .icon {
		font-size: 42rpx;
		color: #b4b1b4;
		position: absolute;
		top: 15rpx;
		right: 15rpx;
	}
	.settlementAgreement .setAgCount .title {
		color: #333;
		font-size: 32rpx;
		text-align: center;
		font-weight: bold;
	}
	.settlementAgreement .setAgCount .content {
		margin-top: 32rpx;
		color: #333;
		font-size: 26rpx;
		line-height: 22px;
		text-align: justify;
		text-justify: distribute-all-lines;
		height: 756rpx;
		overflow-y: scroll;
	}
	.settledSuccessMain {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #fff;
	}
	.settledSuccessful {
		flex: 1;
		width: 100%;
		padding: 0 56px;
		height: auto;
		background: #fff;
		text-align: center;
	}
	.settledSuccessful .image {
		width: 189px;
		height: 157px;
		margin-top: 66px;
	}
	.settledSuccessful .title {
		color: #333333;
		font-size: 16px;
		font-weight: bold;
		margin-top: 35px;
	}
	.settledSuccessful .info {
		color: #A0A0A0;
		font-size: 13px;
		margin-top: 12px;
	}
	.settledSuccessful .goHome {
		margin: 60px auto 0;
		line-height: 43px;
		color: #282828;
		font-size: 15px;
		border: 1px solid #B4B4B4;
		border-radius: 60px;
	}
	/deep/ uni-checkbox .uni-checkbox-input {
		width: 15px;
		height: 15px;
		position: relative;
	}
	/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
		font-size: 14px;
	}
	.loadingicon {
		height: 100vh;
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
	}
	.icon-xiangyou {
		font-size: 22rpx;
	}
	// #ifdef MP
	checkbox-group {
		display: inline-block;
	}
	// #endif
	.setAgCount{
		/deep/ table{
			border:  1px solid #DDD;
			border-bottom: none;
			border-right: none;
		}
		/deep/ td, th {
		    padding: 5rpx 10rpx;
		    border-bottom: 1px solid #DDD;
			border-right:  1px solid #DDD;
		}
	}
</style>
