<template>
	<view :style="viewColor">
		<view class="address-window" :class="address.address==true?'on':''">
			<view class='title'>选择地址<text class='iconfont icon-guanbi' @tap='close'></text></view>
			<scroll-view scroll-y="true" class='list'>
				<view class='item acea-row row-between-wrapper' :class='active==index?"t-color":""' v-for="(item,index) in addressList"
				 @tap='tapAddress(index,item.address_id)' :key='index'>
					<text class='iconfont icon-ditu' :class='active==index?"t-color":""'></text>
					<view class='address'>
						<view class='name' :class='active==index?"t-color":""'>{{item.real_name}}<text class='phone'>{{item.phone}}</text></view>
						<view class='line1'>{{item.province}}{{item.city}}{{item.district}}{{item.street || ''}}{{item.detail}}</view>
					</view>
					<text class='iconfont icon-complete' :class='active==index?"t-color":""'></text>
				</view>
			</scroll-view>
			<!-- 无地址 -->
			<view class='pictrue' v-if="!is_loading && !addressList.length">
				<image src='../../static/images/noAddress.png'></image>
				<view>暂无地址</view>
			</view>
			<view class='addressBnt' @tap='goAddressPages'>添加新地址</view>
		</view>
		<view class='mask' catchtouchmove="true" :hidden='address.address==false' @tap='close'></view>
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
	import { getAddressList } from '@/api/user.js';
	import { mapGetters } from "vuex";
	export default {
		props: {
			pagesUrl: {
				type: String,
				default: '',
			},
			address: {
				type: Object,
				default: function() {
					return {
						address: true,
						addressId: 0,
					};
				}
			},
			isLog: {
				type: Boolean,
				default: false,
			},
		},
		computed: mapGetters(['viewColor']),
		data() {
			return {
				active: 0,
				//地址列表
				addressList: [],
				is_loading: true
			};
		},
		methods: {
			tapAddress: function(e, addressid) {
				this.active = e;
				this.$emit('OnChangeAddress', addressid);
			},
			close: function() {
				this.$emit('changeClose');
				this.$emit('changeTextareaStatus');
			},
			goAddressPages: function() {
				this.$emit('changeClose');
				this.$emit('changeTextareaStatus');
				uni.navigateTo({
					url: this.pagesUrl
				});
			},
			getAddressList: function() {
				let that = this;
				getAddressList({
					page: 1,
					limit: 5
				}).then(res => {
					let addressList = res.data.list;
					//处理默认选中项
					for (let i = 0; i < res.data.list.length; i++) {
						if (addressList[i].address_id == that.address.addressId) {
							that.active = i;
						}
					}
					that.$set(that, 'addressList', addressList);
					that.is_loading = false;
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.address-window {
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 101;
		transform: translate3d(0, 100%, 0);
		transition: all .3s cubic-bezier(.25, .5, .5, .9);
	}
	.address-window.on {
		transform: translate3d(0, 0, 0);
	}
	.address-window .title {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		height: 123rpx;
		line-height: 123rpx;
		position: relative;
	}
	.address-window .title .iconfont {
		position: absolute;
		right: 30rpx;
		color: #8a8a8a;
		font-size: 35rpx;
	}
	.address-window .list{
		max-height: 650rpx;
	}
	.address-window .list .item {
		margin-left: 30rpx;
		padding-right: 30rpx;
		border-bottom: 1px solid #eee;
		height: 129rpx;
		font-size: 25rpx;
		color: #333;
	}
	.address-window .list .item .iconfont {
		font-size: 37rpx;
		color: #2c2c2c;
	}
	.address-window .list .item .iconfont.icon-complete {
		font-size: 30rpx;
		color: #fff;
	}
	.address-window .list .item .address {
		width: 560rpx;
	}
	.address-window .list .item .address .name {
		font-size: 28rpx;
		font-weight: bold;
		color: #282828;
		margin-bottom: 4rpx;
	}
	.address-window .list .item .address .name .phone {
		margin-left: 18rpx;
	}
	.address-window .addressBnt {
		font-size: 30rpx;
		font-weight: bold;
		color: #fff;
		width: 690rpx;
		height: 86rpx;
		border-radius: 43rpx;
		text-align: center;
		line-height: 86rpx;
		margin: 85rpx auto;
		background-color: var(--view-theme);
	}
	.address-window .pictrue {
		text-align: center;
	}
	.address-window .pictrue image,.address-window .pictrue uni-image {
		width: 414rpx;
		height: 305rpx;
	}
	.address-window .pictrue view{	
		color: #999;
	}
	.t-color {
		color: var(--view-theme)!important;
	}
</style>
