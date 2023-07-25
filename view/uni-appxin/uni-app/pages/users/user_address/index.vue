<template>
	<view :style="viewColor">
		<form @submit="formSubmit" report-submit='true'>
			<view class='addAddress'>
				<view class='list'>
					<view class='item acea-row row-between-wrapper'>
						<view class='name'>姓名</view>
						<input type='text' placeholder='请输入姓名' name='real_name' :value="userAddress.real_name" placeholder-class='placeholder'></input>
					</view>
					<view class='item acea-row row-between-wrapper'>
						<view class='name'>联系电话</view>
						<input type='text' placeholder='请输入联系电话' name="phone" :value='userAddress.phone' placeholder-class='placeholder'></input>
					</view>
					<view class='item acea-row row-between-wrapper'>
						<view class='name'>所在地区</view>
						<view class="region">
							<view class="region_count" @click="changeRegion">
								<text v-if="!addressInfo.length" style="color:#cdcdcd;">请选择地址</text>
								<text v-else>{{addressText}}</text>
								<text class="iconfont icon-xiangyou"></text>
								</view>
						</view>
					</view>
					<view class='item acea-row row-between-wrapper'>
						<view class='name'>详细地址</view>
						<input type='text' class="location-input" placeholder='请填写具体地址' name='detail' placeholder-class='placeholder' v-model="userAddress.detail"></input>
						<view class="location" @click="selfLocation">
							<text class="iconfont icon-chakanditu"></text>
							<br>
							定位
						</view>
					</view>
				</view>
				<view class='default acea-row row-middle'>
					<checkbox-group @change='ChangeIsDefault'>
						<checkbox :checked="userAddress.is_default ? true : false" />设置为默认地址</checkbox-group>
				</view>
				<button class='keepBnt' form-type="submit">立即保存</button>
				<!-- #ifdef MP -->
				<view class="wechatAddress" v-if="!address_id" @click="getWxAddress">导入微信地址</view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view class="wechatAddress" v-if="this.$wechat.isWeixin() && !address_id" @click="getAddress">导入微信地址</view>
				<!-- #endif -->
			</view>
		</form>
		<areaWindow ref="areaWindow" :display="display" :address="addressInfo"
			 @submit="OnChangeAddress" @changeClose="changeClose"></areaWindow>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
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
	import { editAddress, getAddressDetail } from '@/api/user.js';
	import { getCityV2, getCityList } from '@/api/api.js';
	import { mapGetters } from "vuex";
	import areaWindow from '@/components/areaWindow';
	import { getGeocoder } from '@/api/store.js';
	import authorize from '@/components/Authorize';
	export default {
		components: {
			areaWindow,
			authorize,
		},
		data() {
			return {
				cartId: '', //购物车id
				pinkId: 0, //拼团id
				couponId: 0, //优惠券id
				address_id: 0, //地址id
				productType: 0,
				userAddress: {
					is_default: false
				}, //地址详情
				region: ['省', '市', '区'],
				valueRegion: [0, 0, 0],
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				district: [],
				multiArray: [],
				multiIndex: [0, 0, 0],
				cityId: 0,
				display: false,
				addressInfo:[],
				latitude: '',
				longitude: ''
			};
		},
		computed: {...mapGetters(['isLogin','viewColor']),
			addressText(){
				return this.addressInfo.map(v=>v.name).join('/');
			}
		},
		onLoad(options) {
			if (this.isLogin) {
				this.cartId = options.cartId || '';
				this.pinkId = options.pinkId || 0;
				this.couponId = options.couponId || 0;
				this.address_id = options.id || 0;
				this.productType = options.product_type || 0;
				uni.setNavigationBarTitle({
					title: options.id ? '修改地址' : '添加地址'
				})
				this.getUserAddress();
				this.getCityList();
			} else {
				this.isAuto = true;
				this.isShowAuth = true
			}
		},
		methods: {
			OnChangeAddress(address){
				this.addressInfo = address;
			},
			// 地址数据
			getCityList: function() {
				let that = this;
				getCityV2(0).then(res => {
					this.district = res.data
				})
			},
			changeRegion(){
				this.display = true;
			},
			// 关闭地址弹窗；
			changeClose: function() {
				this.display = false;
			},
			// 授权回调
			onLoadFun: function() {
				this.isShowAuth = false;
				this.getUserAddress();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			toggleTab(str) {
				this.$refs[str].show();
			},
			onConfirm(val) {
				this.region = val.checkArr[0] + '-' + val.checkArr[1] + '-' + val.checkArr[2];
			},
			getUserAddress: function() {
				if (!this.address_id) return false;
				let that = this;
				getAddressDetail(this.address_id).then(res => {
					let region = [res.data.province, res.data.city, res.data.district];
					that.$set(that, 'userAddress', res.data);
					that.$set(that, 'region', region);
					that.city_id = res.data.city_id
					that.addressInfo = res.data.area
				});
			},
			// 导入共享地址（小程序）
			getWxAddress: function() {
				let that = this;
				uni.authorize({
					scope: 'scope.address',
					success: function(res) {
						uni.chooseAddress({
							success: function(res) {
								getCityList(res.provinceName+'/'+res.cityName+'/'+res.countyName).then(res=>{
									that.addressInfo = res.data;
								})
								that.userAddress.real_name = res.userName;
								that.userAddress.phone = res.telNumber;
								that.userAddress.detail = res.detailInfo;
							},
							fail: function(res) {
								uni.showToast({
									title: res.errMsg,
									icon: 'none',
									duration: 1000
								});
								if (res.errMsg == 'chooseAddress:cancel') return that.$util.Tips({
									title: '取消选择'
								});
							},
						})
					},
					fail: function(res) {
						uni.showModal({
							title: '您已拒绝导入微信地址权限',
							content: '是否进入权限管理，调整授权？',
							success(res) {
								if (res.confirm) {
									uni.openSetting({
										success: function(res) {}
									});
								} else if (res.cancel) {
									return that.$util.Tips({
										title: '已取消！'
									});
								}
							}
						})
					},
				})
			},
			// 导入共享地址（微信）；
			getAddress() {
				let that = this;
				that.$wechat.openAddress().then(res => {
					getCityList(res.provinceName+'/'+res.cityName+'/'+res.countryName).then(res=>{
						that.addressInfo = res.data;
					})
					that.userAddress.real_name = res.userName;
					that.userAddress.phone = res.telNumber;
					that.userAddress.detail = res.detailInfo;
				}).catch(err => {
					console.log(err);
				});
			},
			selfLocation() {
				let self = this
				uni.showLoading({
					title: '定位中',
					mask: true,
				});
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						let latitude, longitude;
						latitude = res.latitude.toString();
						longitude = res.longitude.toString();
						self.latitude = res.latitude
						self.longitude = res.longitude
						getGeocoder({
							lat: latitude,
							long: longitude
						}).then(res => {
							const data = res.data;
							getCityList(data.address_component.province+'/'+data.address_component.city+'/'+data.address_component.district+'/'+(!data.address_reference.town ? '' : data.address_reference.town.title)).then(res=>{
								self.addressInfo = res.data;
								self.$set(self.userAddress, 'detail', data.formatted_addresses.recommend);
								uni.hideLoading();
							}).catch(e=>{
								uni.hideLoading();
								uni.showToast({
									title: '定位失败，请手动输入地址',
									icon: 'none',
									duration: 1000
								});
							})
						}).catch(e=>{
							uni.hideLoading();
							uni.showToast({
								title: '定位失败，请手动输入地址',
								icon: 'none',
								duration: 1000
							});
						})
					},
					fail: (res) => {
						uni.hideLoading();
						uni.showToast({
							title: res.errMsg,
							icon: 'none',
							duration: 1000
						});
					}
				});
			},
			/**
			 * 提交用户添加地址
			 *
			 */
			formSubmit: function(e) {
				let that = this,
					value = e.detail.value;
				if (!value.real_name) return that.$util.Tips({
					title: '请填写收货人姓名'
				});
				if (!value.phone) return that.$util.Tips({
					title: '请填写联系电话'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(value.phone)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (!that.addressInfo.length) return that.$util.Tips({
					title: '请选择所在地区'
				});
				if (!value.detail) return that.$util.Tips({
					title: '请填写详细地址'
				});
				value.address_id = that.address_id;
				value.is_default = that.userAddress.is_default ? 1 : 0;
				value.area = that.addressInfo;

				uni.showLoading({
					title: '保存中',
					mask: true
				})
				editAddress(value).then(res => {
					if (that.id)
						that.$util.Tips({
							title: '修改成功',
							icon: 'success'
						});
					else
						that.$util.Tips({
							title: '添加成功',
							icon: 'success'
						});
					setTimeout(function() {
						if (that.cartId) {
							let cartId = that.cartId;
							let pinkId = that.pinkId;
							let couponId = that.couponId;
							that.cartId = '';
							that.pinkId = '';
							that.couponId = '';
							uni.$emit('updataAddress')
							if(that.productType == 20){
								uni.navigateTo({
									url: '/pages/points_mall/integral_order?cartId=' + cartId + '&addressId=' + (that.id ? that.id : res.data
										.address_id) + '&pinkId=' + pinkId + '&couponId=' + couponId
								});
							}else{
								uni.navigateTo({
									url: '/pages/users/order_confirm/index?cartId=' + cartId + '&addressId=' + (that.id ? that.id : res.data
										.address_id) + '&pinkId=' + pinkId + '&couponId=' + couponId
								});
							}
							
						} else {
							// #ifdef H5
							return history.back();
							// #endif
							// #ifndef H5
							return uni.navigateBack({
								delta: 1,
							})
							// #endif
						}
					}, 1000);
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				})
			},
			ChangeIsDefault: function(e) {
				this.$set(this.userAddress, 'is_default', !this.userAddress.is_default);
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
	.addAddress .list {
		background-color: #fff;
	}
	.addAddress .list .item {
		padding: 30rpx;
		border-top: 1px solid #eee;
		position: relative;
	}
	.addAddress .list .item .location{
		position: absolute;
		right: 30rpx;
		top: 15rpx;
		text-align: center;
		font-size: 20rpx;
		.iconfont{
			color: var(--view-theme);
		}
	}
	.addAddress .list .item .name {
		width: 195rpx;
		font-size: 30rpx;
		color: #333;
	}
	.addAddress .list .item .address {
		flex: 1;
		margin-left: 20rpx;
	}
	.addAddress .list .item input,.region .region_count {
		width: 475rpx;
		font-size: 30rpx;
		box-sizing: border-box;
	}
	.region .region_count{
		height: 42rpx;
		line-height: 42rpx;
		.icon-xiangyou{
			float: right;
		}
	}
	.addAddress .list .location-input{
		padding-right: 70rpx;
	}
	.addAddress .list .item .placeholder {
		color: #ccc;
	}
	.addAddress .list .item picker {
		width: 475rpx;
	}
	.addAddress .list .item picker .picker {
		width: 410rpx;
		font-size: 30rpx;
	}
	.addAddress .list .item picker .iconfont {
		font-size: 43rpx;
	}
	.addAddress .default {
		padding: 0 30rpx;
		height: 90rpx;
		background-color: #fff;
		margin-top: 23rpx;
	}
	.addAddress .default checkbox {
		margin-right: 15rpx;
	}
	.addAddress .keepBnt {
		width: 690rpx;
		height: 86rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 86rpx;
		margin: 50rpx auto;
		font-size: 32rpx;
		color: #fff;
		background-color: var(--view-theme);
	}
	.addAddress .wechatAddress {
		width: 690rpx;
		height: 86rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 86rpx;
		margin: 0 auto;
		font-size: 32rpx;
		color: var(--view-theme);
		border: 1px solid var(--view-theme);
	}
</style>
