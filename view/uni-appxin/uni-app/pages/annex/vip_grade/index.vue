<template>
	<view class="vipGrade">
		<view class="headerBg">
			<view class="header" v-if="info.user">
				<view class="top acea-row row-middle">
					<view class="pictrue">
						<image :src="info.user.avatar"></image>
					</view>
					<view class="text">
						<view class="name acea-row row-middle">
							<view class="nameCon line1">{{info.user.nickname}}</view>
							<view v-if="info.level_info.grade" class="num">lv.{{info.level_info.grade}}</view>
						</view>
						<view class="idNum">ID：{{info.user.uid}}</view>
					</view>
				</view>
				<view class="list acea-row row-around row-middle">
					<view class="item">
						<view class="num">{{info.user.now_money}}</view>
						<view>余额</view>
					</view>
					<view class="item">
						<view class="num">{{info.user.integral}}</view>
						<view>积分</view>
					</view>
					<view class="item">
						<view class="num">{{ info.level_info.discount　?　parseFloat(info.level_info.discount)/10　:　'0'}}</view>
						<view>折扣</view>
					</view>
				</view>
			</view>
		</view>
		<view class="qrCode">
			<view class="header acea-row row-between-wrapper">
			  <view class="title" :class="{'on': codeIndex == index,'onLeft':codeIndex == 1}"
			    v-for="(item, index) in codeList" :key="index" @click="tapCode(index)">{{item.name}}</view>
			</view>
			<view class="acea-row row-center-wrapper" style="margin-top: 35rpx;">
			  <w-qrcode :options="config.qrc" @generate="hello"></w-qrcode>
			</view>
		</view>
		<view class="store acea-row row-between-wrapper" v-if="storeList.length">
			<view class="title">
				<text class="iconfont icon-mendian1"></text>
				附近门店
			</view>
			<view class="acea-row" @click="goMap">
				距 <view class="storeName line1">{{storeList[0].name}}</view> {{storeList[0].range}}km<text class="iconfont icon-gengduo3"></text></view>
		</view>
		<home v-if="navigation"></home>
	</view>
</template>
<script>
	import home from '@/components/home/index.vue'

	import {
	  getlevelInfo,
		getRandCode
	} from '@/api/user.js';
	import {
		storeListApi
	} from "@/api/store";
	export default {
		components: {
			home
		},
		data() {
			return {
				info:{},
				codeList: [{
				  name: '付款码'
				}, {
				  name: '核销码'
				}],
				codeIndex:0,
				config: {
				  qrc: {
				    code: '',
				    size: 380, // 二维码大小
				    level: 3, //等级 0～4
				    bgColor: '#FFFFFF', //二维码背景色 默认白色
				    border: {
				      color: ['#eee', '#eee'], //边框颜色支持渐变色
				      lineWidth: 1, //边框宽度
				    },
				    color: ['#333', '#333'], //边框颜色支持渐变色
				  }
				},
				user_latitude: 0,
				user_longitude: 0,
				storeList: []
			};
		},
		onLoad() {
			this.levelInfo();
			this.getCode();
			try {
				this.user_latitude = uni.getStorageSync('user_latitude');
				this.user_longitude = uni.getStorageSync('user_longitude');
			} catch (e) {}
		},
		onReady() {},
		onShow() {
			uni.removeStorageSync('form_type_cart');
		},
		mounted() {
			if (this.user_latitude && this.user_longitude) {
				this.getList();
			} else {
				this.selfLocation();
			}
		},
		methods: {
			goMap(){
				uni.navigateTo({
					url: '/pages/store/map/index'
				})
			},
			selfLocation() {
				let self = this
				// #ifdef H5
				if (self.$wechat.isWeixin()) {
					self.$wechat.location().then(res => {
						this.user_latitude = res.latitude;
						this.user_longitude = res.longitude;
						uni.setStorageSync('user_latitude', res.latitude);
						uni.setStorageSync('user_longitude', res.longitude);
						self.getList();
					})
				} else {
					// #endif	
					uni.getLocation({
						type: 'wgs84',
						success: (res) => {
							try {
								this.user_latitude = res.latitude;
								this.user_longitude = res.longitude;
								uni.setStorageSync('user_latitude', res.latitude);
								uni.setStorageSync('user_longitude', res.longitude);
							} catch {}
							self.getList();
						},
						complete: function() {
							self.getList();
						}
					});
					// #ifdef H5	
				}
				// #endif
			},
			// 获取门店列表数据
			getList: function() {
				let data = {
					latitude: this.user_latitude || "", //纬度
					longitude: this.user_longitude || "", //经度
					page: 1,
					limit: 1
				};
				storeListApi(data)
					.then(res => {
						this.storeList = res.data.list.list;
					})
					.catch(err => {
						this.$util.Tips({
							title: err
						})
					});
			},
			getCode() {
			  getRandCode().then(res => {
			    let code = res.data.code;
			    this.config.qrc.code = code;
			  }).catch(err => {
			    return this.$util.Tips(err);
			  })
			},
			levelInfo(){
				getlevelInfo().then(res=>{
					this.info = res.data;
				}).catch(err=>{
					return this.$util.Tips({
						title: err
					});
				})
			},
			tapCode(index) {
			  this.codeIndex = index;
			  if (index == 0) {
			    this.getCode();
			  } else {
			    let code = this.info.user.bar_code;
			    this.config.qrc.code = code;
			  }
			},
			hello(res) {
			},
		},
		onReachBottom() {
		}
	}
</script>

<style lang="scss">
	page{
		background: linear-gradient(121deg, #F5EBE1 0%, #FFDFBE 100%);
	}
	.vipGrade{
		.headerBg{
			background: url('../static/big-bg.png') no-repeat;
			background-size: 100% 100%;
			width: 100%;
			height: 476rpx;
			padding-top: 1rpx;
			.header{
				background: url('../static/grade-bg.png') no-repeat;
				background-size: 100% 100%;
				width: 690rpx;
				height: 286rpx;
				margin: 26rpx auto;
				padding: 28rpx 28rpx 0 28rpx;
				.top{
					.pictrue{
						width: 92rpx;
						height: 92rpx;
						border: 1px solid #FFFFFF;
						margin-right: 20rpx;
						border-radius: 50%;
						image{
							border-radius: 50%;
							width:100%;
							height: 100%;
						}
					}
					.text{
						width: 400rpx;
						.name{
							.nameCon{
								color: #EDCAAC;
								font-size: 28rpx;
								max-width: 332rpx;
								margin-right: 10rpx;
							}
							.num{
								border-radius: 4px;
								border: 1px solid #EDCAAC;
								background: rgba(215,177,144,0.2);
								font-size: 20rpx;
								font-weight: 400;
								color: #EDCAAC;
								padding: 0 4rpx;
							}
						}
						.idNum{
							font-weight: 400;
							color: #EDCAAC;
							font-size: 24rpx;
							margin-top: 5rpx;
						}
					}
				}
			}
			.list{
				margin-top: 46rpx;
				.item{
					color: #EDCAAC;
					font-size: 22rpx;
					text-align: center;
					.num{
						font-size: 40rpx;
						margin-bottom: 15rpx;
					}
				}
			}
		}
		.qrCode{
			width: 690rpx;
			height: 700rpx;
			background: #FFFFFF;
			border-radius: 18rpx;
			margin: -134rpx auto 0 auto;
			padding-top: 60rpx;
			.header{
				width: 330rpx;
				height: 60rpx;
				border-radius: 30rpx;
				background: #EEEEEE;
				color: #333333;
				font-size: 30rpx;
				margin: 0 auto;
				.title {
				  width: 146rpx;
				  height: 100%;
				  line-height: 60rpx;
				  border-radius: 30rpx;
				  text-align: center;
				  padding-right: 20rpx;
				
				  &.onLeft {
				    padding-left: 34rpx;
				  }
				
				  &.on {
				    width: 170rpx;
				    background-color: #333 !important;
				    color: #fff;
				    padding: 0 !important;
				  }
				}
			}
		}
		.store{
			width: 690rpx;
			height: 100rpx;
			background: linear-gradient(90deg, #FFAE49 0%, #FCC887 100%);
			border-radius: 18rpx;
			margin: 26rpx auto;
			padding: 0 30rpx;
			color: #fff;
			font-weight: 500;
			font-size: 28rpx;
			.iconfont{
				margin-right: 20rpx;
				font-size: 38rpx;
			}
			.icon-gengduo3{
				font-size: 24rpx;
				margin-left: 5rpx;
				margin-right: 0;
				margin-top: 6rpx;
			}
			.storeName{
				display: inline-block;
				max-width: 284rpx;
				vertical-align: middle;
			}
		}
	}
</style>