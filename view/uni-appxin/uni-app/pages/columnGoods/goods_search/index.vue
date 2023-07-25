<template>
	<view>
		<view class='searchGood'>
			<view class='search acea-row row-between-wrapper'>
				<view class='input acea-row row-between-wrapper'>
					<text class='iconfont icon-sousuo2'></text>
					<input type='text' :value='searchValue' :focus="focus" placeholder='点击搜索商品、店铺名称' placeholder-class='placeholder'
					 @input="setValue"></input>
				</view>
				<view class='bnt' @tap='searchBut'>搜索</view>
			</view>
			<view class='title'>历史记录 <text class="iconfont icon-shanchu" @click="remove"></text></view>
			<view class='list acea-row' :style="{'height':historyBox?'auto':'150rpx'}" v-if="historyList.length > 0">
				<block v-for="(item,index) in historyList" :key="index">
					<view class='item line1' @tap='setHotSearchValue(item,0)'>{{item}}</view>
				</block>
			</view>
			<view>
				<view class="more-btn" v-if="historyList.length>9 && !historyBox" @click="historyBox = true">
					展开全部<text class="iconfont icon-xiangxia"></text>
				</view>
				<view class="more-btn" v-if="historyList.length>9 && historyBox" @click="historyBox = false">
					收起<text class="iconfont icon-xiangshang"></text>
				</view>
			</view>
			<view v-if="historyList.length == 0" style="text-align: center; color: #999;">暂无搜索历史~</view>
			<view class='title'>热门搜索</view>
			<view class='list acea-row' :style="{'height': hotSearchBox?'auto':'150rpx'}">
				<block v-for="(item,index) in hotSearchList" :key="index">
					<view class='item line1' @tap='setHotSearchValue(item,1)'>{{item.keyword}}</view>
				</block>
			</view>
			<view>
				<view class="more-btn" v-if="hotSearchList.length>8 && !hotSearchBox" @click="hotSearchBox = true">
					展开全部<text class="iconfont icon-xiangxia"></text>
				</view>
				<view class="more-btn" v-if="hotSearchList.length>8 && hotSearchBox" @click="hotSearchBox = false">
					收起<text class="iconfont icon-xiangshang"></text>
				</view>
			</view>
		</view>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse" :isGoIndex="false"></authorize>
		<!-- #ifndef H5 -->
		<passwordPopup></passwordPopup>
		<!-- #endif -->
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
	import { getSearchKeyword,copyPasswordSearch } from '@/api/store.js';
	import shareScence from '@/libs/spread';
	import { silenceBindingSpread } from '@/utils';
	import { goShopDetail } from '@/libs/order.js';
	import { initiateAssistApi } from '@/api/activity.js';
	import { mapGetters } from 'vuex';
	// #ifndef H5
	import passwordPopup from '@/components/passwordPopup';
	// #endif
    import authorize from '@/components/Authorize';
	export default {
		computed: mapGetters(['isLogin', 'uid']),
		components: {
			// #ifndef H5
			passwordPopup,
			// #endif
            authorize,
		},
		data() {
			return {
				hostProduct: [],
				searchValue: '',
				focus: true,
				bastList: [],
				hotSearchList: [],
				first: 0,
				limit: 8,
				page: 1,
				loading: false,
				loadend: false,
				loadTitle: '加载更多',
				hotPage: 1,
				isScroll: true,
				// 搜索历史
				historyList: [],
				// 临时搜索列表
				tempStorage: [],
				historyBox: false,
				hotSearchBox: false,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
			};
		},
		onLoad(options) {
			this.searchValue = options.searchVal || ''
		},
		onShow: function() {
			try {
				this.historyList = []
				this.tempStorage = []
				let arr = uni.getStorageSync('historyList')
				if (arr.length > 0) {
					this.historyList = arr
				} else {
					this.historyList = []
				}

				this.tempStorage = this.historyList
			} catch (e) {}
			this.getRoutineHotSearch();
		},
		methods: {
			// 微信登录回调
			onLoadFun: function(e) {
				this.isShowAuth = false;
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e;
			},
			// 清空历史记录
			remove() {
				let self = this
				uni.showModal({
					title: '提示',
					content: '确认删除全部历史搜索记录？',
					success: function(res) {
						if (res.confirm) {
							self.tempStorage = []
							try {
								uni.setStorageSync('historyList', self.tempStorage)
								self.historyList = []
							} catch (e) {}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			getRoutineHotSearch: function() {
				let that = this;
				getSearchKeyword().then(res => {
					that.$set(that, 'hotSearchList', res.data);
				});
			},
			setHotSearchValue: function(event, key) {
				this.focus = false
				if (key) {
					this.$set(this, 'searchValue', event.keyword);
				} else {
					this.$set(this, 'searchValue', event);
				}
				this.$nextTick(() => {
					this.focus = true
				})
				this.searchBut()
			},
			setValue: function(event) {
				this.$set(this, 'searchValue', event.detail.value);
			},
			searchBut: function() {
				if(/^(\/@[1-9]{1}).*\*\//.test(this.searchValue)){
					uni.showLoading({
						title: '加载中',
						mask: true
					});
					copyPasswordSearch({key: this.searchValue}).then(res => {
						uni.hideLoading();
						let item = res.data
						shareScence(res.data.user.uid, this.isLogin);
						//#ifdef H5
						this.isLogin && silenceBindingSpread();
						//#endif
						goShopDetail(item, this.uid).then(res => {
							if (this.isLogin) {
								initiateAssistApi(item.activity_id)
									.then(res => {
										let id = res.data.product_assist_set_id;
										uni.hideLoading();
										uni.navigateTo({
											url: '/pages/activity/assist_detail/index?id=' + id
										});
										
									})
									.catch(err => {
										uni.showToast({
											title: err,
											icon: 'none'
										});
									});
							} else {
                                this.isAuto = true;
                                this.isShowAuth = true
							}
						})
					}).catch(err => {
							uni.showToast({
								title: err,
								icon: 'none'
							});
							this.searchValue = ""
						});
				}else{

					let status = false
					this.tempStorage.forEach((el, index) => {
						if (el == this.searchValue) {
							status = true
						}
					})
					if (!status && this.searchValue) {
						this.tempStorage.unshift(this.searchValue)
					}
					try {
						uni.setStorageSync('historyList', this.tempStorage);
					} catch (e) {}

					uni.navigateTo({
						url: '/pages/columnGoods/goods_search_con/index?searchValue=' + this.searchValue
					})

				}

			}
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}
</style>
<style lang="scss">
	.searchGood .search {
		padding-left: 30rpx;
	}

	.searchGood .search {
		margin-top: 20rpx;
	}

	.searchGood .search .input {
		width: 598rpx;
		background-color: #f7f7f7;
		border-radius: 33rpx;
		padding: 0 35rpx;
		box-sizing: border-box;
		height: 66rpx;
	}

	.searchGood .search .input input {
		width: 472rpx;
		font-size: 28rpx;
	}

	.searchGood .search .input .placeholder {
		color: #bbb;
	}

	.searchGood .search .input .iconfont {
		color: #000;
		font-size: 35rpx;
	}

	.searchGood .search .bnt {
		width: 120rpx;
		text-align: center;
		height: 66rpx;
		line-height: 66rpx;
		font-size: 30rpx;
		color: #282828;
	}

	.searchGood .title {
		position: relative;
		font-size: 28rpx;
		color: #282828;
		margin: 50rpx 30rpx 25rpx 30rpx;

		.icon-shanchu {
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			color: #999;
		}
	}

	.searchGood .list {
		padding: 0 10rpx;
		overflow: hidden;
	}

	.searchGood .list .item {
		font-size: 26rpx;
		color: #666;
		padding: 0 21rpx;
		height: 60rpx;
		background: rgba(242, 242, 242, 1);
		border-radius: 22rpx;
		line-height: 60rpx;
		margin: 0 0 20rpx 20rpx;
		max-width: 150rpx;
	}

	.searchGood .line {
		border-bottom: 1rpx solid #eee;
		margin: 20rpx 30rpx 0 30rpx;
	}

	.more-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 0 20rpx 20rpx;
		height: 60rpx;
		font-size: 24rpx;
		color: #999;

		.iconfont {
			font-size: 22rpx;
			margin-left: 10rpx;
		}
	}
</style>
