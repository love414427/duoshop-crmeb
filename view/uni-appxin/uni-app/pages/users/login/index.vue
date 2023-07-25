<template>
	<div :style="viewColor">
	<div class="register absolute" v-if="!auth_token">
			<div class="shading">
				<div class="pictrue acea-row row-center-wrapper">
					<image :src="login_logo" v-if="login_logo" />
				</div>
			</div>
			<div class="whiteBg" v-if="formItem === 1">
				<div class="title acea-row row-center-wrapper">
					<div class="item" :class="current === index ? 'on' : ''" v-for="(item, index) in navList" @click="navTap(index)" :key="index">
						{{ item }}
					</div>
				</div>
				<div class="list" :hidden="current !== 0">
					<form @submit.prevent="submit">
						<div class="item">
							<div class="acea-row row-middle">
								<image src="/static/images/phone_1.png"></image>
								<input type="text" placeholder="输入手机号码" placeholder-class="placeholder" v-model="account" required />
							</div>
						</div>
						<div class="item">
							<div class="acea-row row-middle">
								<image src="/static/images/code_2.png"></image>
								<input type="password" placeholder="填写登录密码" placeholder-class="placeholder" v-model="password" required />
							</div>
						</div>
					</form>
					<navigator class="forgetPwd" hover-class="none" url="/pages/users/retrievePassword/index">
						忘记密码
					</navigator>
				</div>
				<div class="list" :hidden="current !== 1">
					<div class="item">
						<div class="acea-row row-middle">
							<image src="/static/images/phone_1.png"></image>
							<input type="text" placeholder="输入手机号码" placeholder-class="placeholder" v-model="account" />
						</div>
					</div>
					<div class="item">
						<div class="acea-row row-middle">
							<image src="/static/images/code_2.png"></image>
							<input type="text" placeholder="填写验证码" placeholder-class="placeholder" class="codeIput" v-model="captcha" />
							<button class="code" :disabled="disabled" :class="disabled === true ? 'on' : ''" @click="handleVerify">
								{{ text }}
							</button>
						</div>
					</div>
					<div class="item" v-if="isShowCode">
						<div class="acea-row row-middle">
							<image src="/static/images/code_2.png"></image>
							<input type="text" placeholder="填写验证码" placeholder-class="placeholder" class="codeIput" v-model="codeVal" />
							<div class="code" @click="getcaptcha"><image class="code-img" style="width: 100%;height: 100%;" :src="codeUrl" /></div>
						</div>
					</div>
				</div>
				<div class="protocol acea-row row-between-wrapper">
					<checkbox-group class="checkgroup" @change='isAgree=!isAgree'>
						<checkbox class="checkbox" :checked="isAgree ? true : false" />
						<text class="protocol_text">我已同意<text @click="userAgree" class="font_pro">《用户协议》</text>与<text @click="userPrivacyAgree" class="font_pro">《隐私政策》</text></text>
					</checkbox-group>
				</div>
				<div class="logon" @click="loginMobile" :hidden="current !== 1">登录</div>
				<div class="logon" @click="submit" :hidden="current === 1">登录</div>
				<div class="tip">
					没有账号?
					<span @click="formItem = 2" class="font-color-red">立即注册</span>
				</div>
				
				<!-- #ifdef MP -->
				<view class="appLogin">
					<view class="hds">
						<span class="line"></span>
						<p>其他方式登录</p>
						<span class="line"></span>
					</view>
					<view class="btn-wrapper">
						<button form-type="submit" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
							<view class="btn wx">
								<span class="iconfont icon-s-weixindenglu1"></span>
							</view>
						</button>
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<view class="appLogin" v-if="!appLoginStatus && !appleLoginStatus">
					<view class="hds">
						<span class="line"></span>
						<p>其他方式登录</p>
						<span class="line"></span>
					</view>
					<view class="btn-wrapper">
						<view class="btn wx" @click="wxLogin">
							<span class="iconfont icon-s-weixindenglu1"></span>
						</view>
						<view class="btn wx btn-apple" @click="appleLogin" v-if="appleShow">
							<span class="iconfont icon-s-pingguo"></span>
						</view>
					</view>
				</view>
				<!-- #endif -->
			</div>
			<div class="whiteBg" v-else>
				<div class="title">注册账号</div>
				<div class="list">
					<div class="item">
						<div class="acea-row row-middle">
							<image src="/static/images/phone_1.png"></image>
							<input type="text" placeholder="输入手机号码" placeholder-class="placeholder" v-model="account" />
						</div>
					</div>
					<div class="item">
						<div class="acea-row row-middle">
							<image src="/static/images/code_2.png"></image>
							<input type="text" placeholder="填写验证码" placeholder-class="placeholder" class="codeIput" v-model="captcha" />
							<button class="code" :disabled="disabled" :class="disabled === true ? 'on' : ''" @click="handleVerify">
								{{ text }}
							</button>
						</div>
					</div>
					<div class="item">
						<div class="acea-row row-middle">
							<image src="/static/images/code_1.png"></image>
							<input type="password" placeholder="填写您的登录密码" placeholder-class="placeholder" v-model="password" />
						</div>
					</div>
					<div class="item" v-if="isShowCode">
						<div class="acea-row row-middle">
							<image src="/static/images/code_2.png"></image>
							<input type="text" placeholder="填写验证码" placeholder-class="placeholder" class="codeIput" v-model="codeVal" />
							<div class="code" @click="getcaptcha"><image class="code-img" style="width: 100%;height: 100%;" :src="codeUrl" /></div>
						</div>
					</div>
				</div>
				<div class="protocol acea-row row-between-wrapper">
					<checkbox-group class="checkgroup" @change='isAgree=!isAgree'>
						<checkbox class="checkbox" :checked="isAgree ? true : false" />
						<text class="protocol_text">我已同意<text @click="userAgree" class="font_pro">《用户协议》</text>与<text @click="userPrivacyAgree" class="font_pro">《隐私政策》</text></text>			
					</checkbox-group>
				</div>
				<div class="logon" @click="register">注册</div>
				<div class="tip">	
					已有账号?
					<span @click="formItem = 1" class="font-color-red">立即登录</span>
				</div>
				<!-- #ifdef APP-PLUS -->
				<view class="appLogin" v-if="!appLoginStatus && !appleLoginStatus">
					<view class="hds">
						<span class="line"></span>
						<p>其他方式登录</p>
						<span class="line"></span>
					</view>
					<view class="btn-wrapper">
						<view class="btn wx" @click="wxLogin">
							<span class="iconfont icon-s-weixindenglu1"></span>
						</view>
						<view class="btn wx btn-apple" @click="appleLogin" v-if="appleShow">
							<span class="iconfont icon-s-pingguo"></span>
						</view>
					</view>
				</view>
				<!-- #endif -->			
			</div>
			<div class="bottom"></div>
			<view class="settlementAgreement" v-if="showAgreement">
				<view class="setAgCount">
					<i class="icon iconfont icon-cha" @click="showAgreement = false"></i>
					<div class="title">用户协议与隐私政策</div>
					<view class="content">
						<jyf-parser :html="agreement" ref="article" :tag-style="tagStyle"></jyf-parser>
					</view>		
				</view>
			</view>
		</div>
		<form report-submit='true' v-if="auth_token">
			<view class="ChangePassword">
				<view class="list">
					<view class="item">
						<input type='number' placeholder='填写手机号码' placeholder-class='placeholder' v-model="account"></input>
					</view>
					<view class="item acea-row row-between-wrapper">
						<input type='number' placeholder='填写验证码' placeholder-class='placeholder' class="codeIput" v-model="captcha"></input>
						<button class="code" :class="disabled === true ? 'on' : ''" :disabled='disabled' @click="handleVerify">
							{{ text }}
						</button>
					</view>
					<view class="item">
						<input type='password' placeholder='填写登录密码' placeholder-class='placeholder' v-model="password"></input>
					</view>
					<view class="protocol acea-row row-between-wrapper">
						<checkbox-group class="checkgroup" @change='isAgree=!isAgree'>
							<checkbox class="checkbox" :checked="isAgree ? true : false" />
							<text class="protocol_text">我已同意<text @click="userAgree" class="font_pro">《用户协议》</text>与<text @click="userPrivacyAgree" class="font_pro">《隐私政策》</text></text>			
						</checkbox-group>
					</view>
				</view>
				<button form-type="submit" @click="register" class="confirmBnt">确认绑定</button>
				<button form-type="submit" @click="auth_token = ''" class="confirmBnt back">返回</button>
			</view>
		</form>
		<view class="copyright" @click="goCopyUrl">{{copyData}}</view>
		<Verify @success="success" :captchaType="'blockPuzzle'" :imgSize="{ width: '330px', height: '155px' }" ref="verify"></Verify>
	</div>
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
	import dayjs from "@/plugin/dayjs/dayjs.min.js";
	import sendVerifyCode from "@/mixins/SendVerifyCode";
	import {
		loginH5,
		loginMobile,
		registerVerify,
		register,
		getCodeApi,
		getUserInfo,
		getCaptcha,
		getAgreementApi,
		appleLogin,
		loginMpPhone
	} from "@/api/user";
	// #ifdef APP-PLUS
	import {
		wechatAppAuth,
		appleAppAuth
	} from '@/api/api.js'
	// #endif
	import attrs, {
		required,
		alpha_num,
		chs_phone
	} from "@/utils/validate";
	import {
		validatorDefaultCatch
	} from "@/utils/dialog";
	import {
		getLogo,
		getconfig,
		getVersion
	} from "@/api/public";
	// import cookie from "@/utils/store/cookie";
	import {
		VUE_APP_API_URL,
		configMap
	} from "@/utils";
	import parser from "@/components/jyf-parser/jyf-parser";
	import {
		commonAuth
	} from '../../../api/public';
	import {
		mapGetters
	} from "vuex";
	import Verify from '@/components/verify/verify.vue';
	const BACK_URL = "login_back_url";

	export default {
		name: "Login",
		mixins: [sendVerifyCode],
		components: {
			"jyf-parser": parser,
			Verify
		},
		data: function() {
			return {
				navList: ["账号登录", "快速登录"],
				current: 1,
				account: "",
				password: "",
				captcha: "",
				formItem: 1,
				type: "login",
				keyCode: "",
				codeUrl: "",
				codeVal: "",
				isShowCode: false,
				showAgreement: false,
				tagStyle: {
					img: 'width:100%;display:block;'
				},
				isAgree: false,
				agreement: '',
				appLoginStatus: false, // 微信登录强制绑定手机号码状态
				appUserInfo: null, // 微信登录保存的用户信息
				appleLoginStatus: false, // 苹果登录强制绑定手机号码状态
				appleUserInfo: null,
				appleShow: false, // 苹果登录版本必须要求ios13以上的
				keyLock: true,
				auth_token: '',
				codeVal: '',
				copyright: {}
			};
		},
		computed:{
			...configMap(['login_logo'], mapGetters(['viewColor'])),
			copyData() {
				let copy = this.copyright.status == -1 ? this.copyright.year+" "+this.copyright.url : this.copyright.Copyright
				return copy;
			}
		}, 
		watch: {
			formItem: function(nval, oVal) {
				if (nval == 1) {
					this.type = 'login'
				} else {
					this.type = 'register'
				}
			}
		},
		onLoad() {
			let self = this
			uni.getSystemInfo({
				success: function(res) {
					if (res.platform.toLowerCase() == 'ios' && self.getSystem(res.system) >= 13) {
						self.appleShow = true
					}
				}
			});
		},
		mounted: function() {
			this.getVersion();
			
		},
		onReady(){
			let that = this
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
			// #ifdef MP
			getPhoneNumber(e) {
				
				let that = this;
				loginMpPhone({
					iv:e.detail.iv,
					encryptedData:e.detail.encryptedData,
					code:that.codeVal,
					auth_token: uni.getStorageSync('auth_token'),
					}).then(({
						data
					}) => {
						const backUrl = that.$Cache.get(BACK_URL) || "/pages/index/index";
						that.$Cache.clear(BACK_URL);
						that.$store.commit("LOGIN", {
							'token': data.token,
							'time': data.exp
						});
						that.$store.commit("SETUID", data.user.uid);
						that.$store.commit('UPDATE_USERINFO', data.user);

						let method
						let indexPat = ['/pages/index/index', '/pages/order_addcart/order_addcart', '/pages/goods_cate/goods_cate',
							'/pages/user/index','/pages/plant_grass/index'
						]
						if (indexPat.includes(this.getPath(backUrl))) {
							method = 'switchTab'
						} else {
							method = 'navigateTo'
						}
						if (this.getPath(backUrl) === '/pages/users/login/index') {
							uni.switchTab({
								url: '/pages/index/index'
							});
							return
						}
						uni[method]({
							url: backUrl
						});
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			// #endif
			goCopyUrl() {
				// #ifdef H5
				location.href = 'http://'+this.copyright.url
				// #endif
			},
			userAgree(){
				uni.navigateTo({
					url: '/pages/users/user_about/index?from=sys_user_agree'
				})
			},
			userPrivacyAgree(){
				uni.navigateTo({
					url: '/pages/users/user_about/index?from=sys_userr_privacy'
				})
			},
			getSystem(system) {
				if(system.indexOf('iOS') === -1){
					return system
				}else{
					let str = system.split(' ')[1]
					if (str.indexOf('.')) {
						return Number(str.split('.')[0])
					} else {
						return Number(str)
					}
				}
			},
			// 苹果登录
			appleLogin() {
				let self = this
				this.account = ''
				this.captcha = ''
				uni.showLoading({
					title: '登录中'
				})
				uni.login({
					provider: 'apple',
					timeout: 10000,
					success(loginRes) {
						uni.getUserInfo({
							provider: 'apple',
							success: function(infoRes) {
								self.appleUserInfo = infoRes.userInfo
								self.appleLoginApi()
							},
							fail() {
								uni.showToast({
									title: '获取用户信息失败',
									icon: 'none',
									duration: 2000
								})
							},
							complete() {
								uni.hideLoading()
							}
						});
					},
					fail(error) {
						uni.showToast({
							title: '获取用户信息失败',
							icon: 'none',
							duration: 2000
						})
						console.log(error)
					}
				})
			},
			appleLoginApi(){
				let that = this
				commonAuth({
					auth: {
						type:'apple',
						auth: {
							userInfo: that.appleUserInfo,
							openId: that.appleUserInfo.openId,
							nickname: (that.appleUserInfo.fullName.familyName || '') + (that.appleUserInfo.fullName.giveName || ''),
						}
				}}).then(res => {
					const data = res.data;
					if(res.data.status == 200){
						const backUrl = that.$Cache.get(BACK_URL) || "/pages/index/index";
						that.$Cache.clear(BACK_URL);
						that.$store.commit("LOGIN", {
							'token': data.result.token,
							'time': data.result.exp
						});
						that.$store.commit("SETUID", data.result.user.uid);
						that.$store.commit('UPDATE_USERINFO', data.result.user);
						
						let method
						let indexPat = ['/pages/index/index', '/pages/order_addcart/order_addcart', '/pages/goods_cate/goods_cate',
							'/pages/user/index','/pages/plant_grass/index'
						]
						if (indexPat.includes(this.getPath(backUrl))) {
							method = 'switchTab'
						} else {
							method = 'navigateTo'
						}
						if (this.getPath(backUrl) === '/pages/users/login/index') {
							uni.switchTab({
								url: '/pages/index/index'
							});
							return
						}
						uni[method]({
							url: backUrl
						});
					}else{
						uni.hideLoading();
						that.auth_token = res.data.result.key;
					}
				}).catch(res => {
					uni.hideLoading();
					uni.showToast({
						title: res.message || res,
						icon: 'none',
						duration: 2000
					});
				});
			},
			// App微信登录
			wxLogin() {
				if (!this.isAgree) return this.$util.Tips({
					title: '请勾选用户协议与隐私政策'
				});
				let self = this
				this.account = ''
				this.captcha = ''
				uni.showLoading({
					title: '登录中'
				})
				uni.login({
					provider: 'weixin',
					// onlyAuthorize: true,
					success: function(loginRes) {
						self.appUserInfo = loginRes
						self.wxLoginApi()
					},
					fail(error) {
						uni.showToast({
							title: '登录失败',
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			getPath(url) {
				if (url.indexOf("?") != -1) {
					url = url.split("?")[0];
					console.log(url);
				}
				return url
			},
			wxLoginApi() {
				const that = this
				commonAuth({
					auth: {
						type:'app_wechat',
						auth: {
							code: that.appUserInfo.authResult.access_token,
							openid: that.appUserInfo.authResult.openid,
							phone: this.account,
						}
				}}).then(res => {
					const data = res.data;
					if(res.data.status == 200){
						const backUrl = that.$Cache.get(BACK_URL) || "/pages/index/index";
						that.$Cache.clear(BACK_URL);
						that.$store.commit("LOGIN", {
							'token': data.result.token,
							'time': data.result.exp
						});
						that.$store.commit("SETUID", data.result.user.uid);
						that.$store.commit('UPDATE_USERINFO', data.result.user);
						let method
						let indexPat = ['/pages/index/index', '/pages/order_addcart/order_addcart', '/pages/goods_cate/goods_cate',
							'/pages/user/index','/pages/plant_grass/index'
						]
						if (indexPat.includes(this.getPath(backUrl))) {
							method = 'switchTab'
						} else {
							method = 'navigateTo'
						}
						if (this.getPath(backUrl) === '/pages/users/login/index') {
							uni.switchTab({
								url: '/pages/index/index'
							});
							return
						}
						uni[method]({
							url: backUrl
						});
					}else{
						that.auth_token = res.data.result.key;
						that.bindStatus = true;
					}
						uni.hideLoading();
				}).catch(res => {
					uni.hideLoading();
					uni.showToast({
						title: res.message || res,
						icon: 'none',
						duration: 2000
					});
				});
			},
			getAgreement() {
				let that = this
				getAgreementApi('sys_user_agree').then(res => {
					that.agreement = res.data.sys_user_agree
				})
			},
			getCode(data) {
				let that = this
				getCodeApi()
					.then(res => {
						that.keyCode = res.data.key;
						that.code(data);
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			async loginMobile() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请输入手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (!that.captcha) return that.$util.Tips({
					title: '请输入验证码'
				});
				if (!/^[\w\d]+$/i.test(that.captcha)) return that.$util.Tips({
					title: '请输入正确的验证码'
				});
				if (!that.isAgree) return that.$util.Tips({
					title: '请勾选用户协议与隐私政策'
				});
				
				loginMobile({
						auth_token: uni.getStorageSync('auth_token'),
						phone: that.account,
						sms_code: that.captcha,
						spread: that.$Cache.get("spread"),
						// #ifdef APP-PLUS
						user_type: 'app',
						// #endif
						// #ifdef H5
						user_type: 'h5',
						// #endif
					})
					.then(({
						data
					}) => {
						const backUrl = that.$Cache.get(BACK_URL) || "/pages/index/index";
						that.$Cache.clear(BACK_URL);
						that.$store.commit("LOGIN", {
							'token': data.token,
							'time': data.exp
						});
						that.$store.commit("SETUID", data.user.uid);
						that.$store.commit('UPDATE_USERINFO', data.user);

						let method
						let indexPat = ['/pages/index/index', '/pages/order_addcart/order_addcart', '/pages/goods_cate/goods_cate',
							'/pages/user/index'
						]
						if (indexPat.includes(this.getPath(backUrl))) {
							method = 'switchTab'
						} else {
							method = 'navigateTo'
						}
						if (this.getPath(backUrl) === '/pages/users/login/index') {
							uni.switchTab({
								url: '/pages/index/index'
							});
							return
						}
						uni[method]({
							url: backUrl
						});
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			async register() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请输入手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (!that.captcha) return that.$util.Tips({
					title: '请输入验证码'
				});
				if (!/^[\w\d]+$/i.test(that.captcha)) return that.$util.Tips({
					title: '请输入正确的验证码'
				});
				if (!that.password) return that.$util.Tips({
					title: '请输入密码'
				});
				if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/i.test(that.password)) return that.$util.Tips({
					title: '请输入6-16位字母加数字组合'
				});
				if (!that.isAgree) return that.$util.Tips({
					title: '请勾选用户协议与隐私政策'
				});
				register({
						auth_token: this.auth_token || uni.getStorageSync('auth_token'),
						phone: that.account,
						sms_code: that.captcha,
						pwd: that.password,
						spread: that.$Cache.get("spread"),
						// #ifdef APP-PLUS
						user_type: 'app',
						// #endif
						// #ifdef H5
						user_type: 'h5',
						// #endif
					})
					.then(res => {
						const backUrl = that.$Cache.get(BACK_URL) || "/pages/index/index";
						that.$Cache.clear(BACK_URL);
						that.$store.commit("LOGIN", {
							'token': res.data.token,
							'time': res.data.exp
						});
						that.$store.commit("SETUID", res.data.user.uid);
						that.$store.commit('UPDATE_USERINFO', res.data.user);					
						uni.switchTab({
							url: '/pages/user/index'
						})						
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			async code(data) {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请输入手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				// if (that.formItem == 2) that.type = "register";
				await registerVerify({
						phone: that.account,
						type: 'login',
						key: that.keyCode,
						// code: that.codeVal,
						toke:data.token,
						captchaType: 'blockPuzzle',
						captchaVerification: data.captchaVerification
					})
					.then(res => {
						that.$util.Tips({
							title: res.message
						});
						that.sendCode();
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			getcaptcha() {
				let that = this
				getCaptcha().then(data => {
					// that.codeUrl = `${VUE_APP_API_URL}/sms_captcha?key=${that.keyCode}`;
					that.codeUrl = data.data.captcha;
					that.keyCode = data.data.key
				})
				that.isShowCode = true;
			},
			navTap: function(index) {
				this.current = index;
			},
			getPath(url) {
				if (url.indexOf("?") != -1) {
					url = url.split("?")[0];
				}
				return url
			},
			async submit() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请输入账号'
				});
				if (!/^[\w\d]{5,16}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的账号'
				});
				if (!that.password) return that.$util.Tips({
					title: '请输入密码'
				});
				if (!that.isAgree) return that.$util.Tips({
					title: '请勾选用户协议与隐私政策'
				});
				loginH5({
						auth_token: uni.getStorageSync('auth_token'),
						account: that.account,
						password: that.password,
						spread: that.$Cache.get("spread")
					})
					.then(({
						data
					}) => {
						const backUrl = that.$Cache.get(BACK_URL) || "/pages/index/index";
						that.$Cache.clear(BACK_URL);
						that.$store.commit("LOGIN", {
							'token': data.token,
							'time': data.exp
						});
						that.$store.commit("SETUID", data.user.uid);
						that.$store.commit('UPDATE_USERINFO', data.user);

						let method
						let indexPat = ['/pages/index/index', '/pages/order_addcart/order_addcart', '/pages/goods_cate/goods_cate',
							'/pages/user/index'
						]
						if (indexPat.includes(this.getPath(backUrl))) {
							method = 'switchTab'
						} else {
							method = 'navigateTo'
						}
						if (this.getPath(backUrl) === '/pages/users/login/index') {
							uni.switchTab({
								url: '/pages/index/index'
							});
							return
						}
						uni[method]({
							url: backUrl
						});						
					})
					.catch(e => {
						that.$util.Tips({
							title: e
						});
					});
			},
			getVersion() {
				getVersion().then(data => {
					this.copyright = data.data;
				});
			},
			success(data) {
				this.$refs.verify.hide();
				this.code(data);
			},
			handleVerify() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请输入手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (!that.isAgree) return that.$util.Tips({
					title: '请勾选用户协议与隐私政策'
				});
				that.$refs.verify.show();
			}
		}
	};
</script>
<style lang="scss" scoped>
	page {
		background-color: #fff !important;
	}
	/deep/uni-checkbox .uni-checkbox-input{
		border-radius: 100%;
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
		width: 240rpx;
		
	}
	/deep/.uni-input-wrapper,/deep/.uni-input-input{
		// width: 240rpx;
	}
	.ChangePassword .list .item .code {
		font-size: 32rpx;
		background-color: #fff;
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
	
	.ChangePassword .confirmBnt.back{
		background-color: #FFFFFF;
		border: 1px solid  var(--view-theme);
		color: var(--view-theme);
		margin-top: 30rpx;
	}
	
	.getPhoneBtn{
		font-size: 32rpx;
		width: 580rpx;
		height: 90rpx;
		border-radius: 45rpx;
		border: 1rpx solid #3CB625;
		color: #3CB625;
		margin: 40rpx auto 0 auto;
		text-align: center;
		line-height: 90rpx;
		.iconfont{
			font-size: 32rpx;
			margin-right: 12rpx;
		}
	}
	.code image {
		width: 100%;
		height: 100%;
	}

	.acea-row.row-middle {
		input {
			margin-left: 20rpx;
		}
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
	.protocol_text{
		color: #999;
		font-size: 24rpx;
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
	.protocol{
		margin-top: 30rpx;
	}
	.protocol_text{
		.font_pro{
			color: var(--view-theme);
		}
	}
	.appLogin {
		.hds {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			color: #B4B4B4;	
			.line {
				width: 68rpx;
				height: 1rpx;
				background: #CCCCCC;
			}	
			p {
				margin: 0 20rpx;
			}
		}	
		.btn-wrapper {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 30rpx;
	
			.btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 68rpx;
				height: 68rpx;
				border-radius: 50%;
				
				+ .btn {
					margin-left: 30rpx;
				}
			}
	
			.apple-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 246rpx;
				height: 66rpx;
				margin-left: 10rpx;
				background: #EAEAEA;
				border-radius: 34rpx;
				font-size: 24rpx;
	
				.icon-s-pingguo {
					color: #333;
					margin-right: 10rpx;
					font-size: 34rpx;
				}
			}
	
			.iconfont {
				font-size: 40rpx;
				color: #fff;
			}
	
			.wx {
				// margin-right: 30rpx;
				background-color: #61C64F;
				&.btn-apple{
					margin-right: 0;
					background-color: #333;
				}
			}
			
			.mima {
				background-color: #28B3E9;
			}
	
			.yanzheng {
				background-color: #F89C23;
			}
	
		}
	}
	
	.code img {
		width: 100%;
		height: 100%;
	}
	
	.acea-row.row-middle {
		input {
			margin-left: 20rpx;
			display: block;
		}
	}
	
	.login-wrapper {
		padding: 30rpx;
	
		.shading {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			/* #ifdef APP-VUE */
			margin-top: 50rpx;
			/* #endif */
			/* #ifndef APP-VUE */
	
			margin-top: 200rpx;
			/* #endif */
	
	
			image {
				width: 180rpx;
				height: 180rpx;
			}
		}
	
		.whiteBg {
			margin-top: 100rpx;
	
			.list {
				border-radius: 16rpx;
				overflow: hidden;
	
				.item {
					border-bottom: 1px solid #F0F0F0;
					background: #fff;
	
					.row-middle {
						position: relative;
						padding: 16rpx 45rpx;
	
						input {
							flex: 1;
							font-size: 28rpx;
							height: 80rpx;
						}
	
						.code {
							color: #E93323;
							font-size: 26rpx;
							transform: translateY(-50%);
						}
					}
				}
			}
	
			.logon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 86rpx;
				margin-top: 80rpx;
				background-color: $theme-color;
				border-radius: 120rpx;
				color: #FFFFFF;
				font-size: 30rpx;
			}
	
			.tips {
				margin: 30rpx;
				text-align: center;
				color: #999;
			}
		}
	}
	.copyright {
		position: fixed;
		bottom: 30rpx;
		left: 0;
		width: 100%;
		text-align: center;
		font-size: 20rpx;
		line-height: 28rpx;
		color: #FFFFFF;
		
		.cell {
			// margin-left: 6rpx;
			font-size: 20rpx;
		}
	}
</style>
