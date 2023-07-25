<template>
	<view :style="viewColor">
		<form report-submit='true'>
			<view class="ChangePassword">
				<view class="list">
					<view class="item">
						<input type='number' placeholder='填写手机号码' placeholder-class='placeholder' v-model="phone"></input>
					</view>
					<view class="item acea-row row-between-wrapper">
						<input type='number' placeholder='填写验证码' placeholder-class='placeholder' class="codeIput" v-model="captcha"></input>
						<button class="code" :class="disabled === true ? 'on' : ''" :disabled='disabled' @click="handleVerify">
							{{ text }}
						</button>
					</view>
				</view>
				<button form-type="submit" @click="editPwd" class="confirmBnt">确认绑定</button>
				<!-- #ifdef MP -->
				<button form-type="submit" class="getPhoneBtn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"><text class="iconfont icon-weixin2"></text>使用微信绑定号码</button>
				<!-- #endif -->
			</view>
		</form>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
    <Verify @success="success" :captchaType="'blockPuzzle'" :imgSize="{ width: '330px', height: '155px' }" ref="verify"></Verify>
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
	import sendVerifyCode from "@/mixins/SendVerifyCode";
	import {
		bindingPhone,
		verifyCode, appletsDecrypt
	} from '@/api/api.js';
	import { registerVerify } from '@/api/user.js'
	import {
		mapGetters
	} from "vuex";
	import authorize from '@/components/Authorize';
  import Verify from '@/components/verify/verify.vue';
	export default {
		mixins: [sendVerifyCode],
		components: {
			authorize,
      Verify
		},
		data() {
			return {
				phone:'',
				captcha:'',
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				key: '',
				codeVal: ''
			};
		},
		computed: mapGetters(['isLogin','viewColor']),
		onLoad() {
			let that = this
			if (this.isLogin) {
				// verifyCode().then(res=>{
				// 	this.$set(this, 'key', res.data.key)
				// });
			} else {
				this.isAuto = true;
                this.isShowAuth = true
			}
			// #ifdef MP
			wx.login({
			  success (res) {
			    if (res.code) {
			     that.codeVal = res.code
			    } else {
			      console.log('登录失败！' + res.errMsg)
			    }
			  }
			})
			// #endif
		},
		methods: {
			onLoadFun:function(){
				this.isShowAuth = false;
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			// #ifdef MP
			getPhoneNumber(e) {
				let that = this;
				appletsDecrypt({
					iv:e.detail.iv,
					encryptedData:e.detail.encryptedData,
					code:that.codeVal
					}).then(res => {
						that.$util.Tips({
							title: '绑定成功！',
							icon: 'success'
						})
						setTimeout(()=>{
							uni.switchTab({
								url: '/pages/user/index',
							});
						},2000)
					})
			},
			// #endif
			editPwd: function() {
				let that = this;
				if (!that.phone) return that.$util.Tips({
					title: '请填写手机号码！'
				});
				if (!(/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.phone))) return that.$util.Tips({
					title: '请输入正确的手机号码！'
				});
				if (!that.captcha) return that.$util.Tips({
					title: '请填写验证码'
				});
				bindingPhone({
					phone: that.phone,
					sms_code: that.captcha
				}).then(res => {
					if (res.data !== undefined && res.data.is_bind) {
						uni.showModal({
							title: '是否绑定账号',
							content: res.msg,
							confirmText: '绑定',
							success(res) {
								if (res.confirm) {
									bindingPhone({
										phone: that.phone,
										captcha: that.captcha,
										step: 1
									}).then(res => {
										return that.$util.Tips({
											title: res.msg,
											icon: 'success'
										}, {
											tab: 5,
											url: '/pages/users/user_info/index'
										});
									}).catch(err => {
										return that.$util.Tips({
											title: err
										});
									})
								} else if (res.cancel) {
									return that.$util.Tips({
										title: '您已取消绑定！'
									}, {
										tab: 5,
										url: '/pages/users/user_info/index'
									});
								}
							}
						});
					} else
						return that.$util.Tips({
							title: '绑定成功！',
							icon: 'success'
						}, {
							tab: 5,
							url: '/pages/users/user_info/index'
						});
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				})
			},
			/**
			 * 发送验证码
			 *
			 */
			async code(data) {
				let that = this;
				if (!that.phone) return that.$util.Tips({
					title: '请填写手机号码！'
				});
				if (!(/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.phone))) return that.$util.Tips({
					title: '请输入正确的手机号码！'
				});
				this.disabled = true
				await registerVerify({
					phone:that.phone,
					key:that.key,
					code:that.captcha,
					type: 'binding',
          captchaType: 'blockPuzzle',
					captchaVerification: data.captchaVerification
				}).then(res => {
					this.disabled = false
					that.$util.Tips({
						title: res.msg
					});
					that.sendCode();
				}).catch(err => {
					this.disabled = false
					return that.$util.Tips({
						title: err
					});
				});
			},
			success(data) {
				this.$refs.verify.hide();
				this.code(data);
			},
			handleVerify() {
				this.$refs.verify.show();
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff !important;
	}

	.ChangePassword .phone {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		margin-top: 55rpx;
	}

	.ChangePassword .list {
		width: 580rpx;
		margin: 53rpx auto 0 auto;
	}

	.ChangePassword .list .item {
		width: 100%;
		height: 110rpx;
		border-bottom: 2rpx solid #f0f0f0;
	}

	.ChangePassword .list .item input {
		width: 100%;
		height: 100%;
		font-size: 32rpx;
	}

	.ChangePassword .list .item .placeholder {
		color: #b9b9bc;
	}

	.ChangePassword .list .item input.codeIput {
		width: 340rpx;
	}

	.ChangePassword .list .item .code {
		font-size: 32rpx;
		background-color: transparent;
		color: var(--view-theme);
		
	}

	.ChangePassword .list .item .code.on {
		color: #b9b9bc;
	}

	.ChangePassword .confirmBnt {
		font-size: 32rpx;
		width: 580rpx;
		height: 90rpx;
		border-radius: 45rpx;
		color: #fff;
		margin: 92rpx auto 0 auto;
		text-align: center;
		line-height: 90rpx;
		background-color: var(--view-theme);
	}
	.getPhoneBtn{
		font-size: 32rpx;
		width: 580rpx;
		height: 90rpx;
		border-radius: 45rpx;
		border: 1px solid #3CB625;
		color: #3CB625;
		margin: 40rpx auto 0 auto;
		text-align: center;
		line-height: 90rpx;
		.iconfont{
			font-size: 32rpx;
			margin-right: 12rpx;
		}
	}
</style>
