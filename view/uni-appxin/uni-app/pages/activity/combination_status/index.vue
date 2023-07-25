<template>
	<div class="group-con" :style="viewColor">
		<div class="header acea-row row-between-wrapper">
			<div class="pictrue"><image :src="storeCombination.image" /></div>
			<div class="text">
				<div class="line1" v-text="storeCombination.store_name"></div>
				<div class="money">
					￥
					<span class="num" v-text="storeCombination.price"></span>
					<span class="team sColor" v-text="(combinationData.buying_count_num ? combinationData.buying_count_num : '') + '人拼'"></span>
				</div>
			</div>
			<div v-if="pinkBool === -1" class="iconfont icon-pintuanshibai"></div>
			<div v-else-if="pinkBool === 10" class="iconfont icon-pintuanchenggong t-color"></div>
		</div>
		<div class="wrapper">
			<div class="title acea-row row-center-wrapper" v-if="pinkBool === 0">
				<div class="line"></div>
				<div class="name acea-row row-center-wrapper">
					剩余
					<CountDown :justifyLeft="justifyLeft" :is-day="false" :tip-text="' '" :day-text="' '" :hour-text="' : '" :minute-text="' : '" :second-text="' '"
					 :datatime="combinationData.end_time"></CountDown>
					结束
				</div>
				<div class="line"></div>
			</div>
			<div class="tips t-color" v-if="pinkBool === 10">恭喜您拼团成功</div>
			<div class="tips t-color" v-else-if="pinkBool === -1">还差{{ count }}人，拼团失败</div>
			<div class="tips t-color" v-else-if="pinkBool === 0">拼团中，还差{{ count }}人拼团成功</div>
			<div class="list acea-row row-middle" :class="iShidden ? 'on' : 'result'">
				<div class="acea-row row-middle" v-if="pinkAll.length > 0">
					<div class="pictrue" v-for="(item, index) in pinkAll" :key="index"><image :src="item.avatar ? item.avatar : '/static/images/f.png'" /></div>
				</div>
				<div v-if="(pinkBool === 0 || pinkBool === -1)" class="pictrue" v-for="index in count" :key="index"><image class="img-none" src="../static/images/vacancy.png" /></div>
			</div>
			<div v-if="count > 9" class="lookAll acea-row row-center-wrapper" @click="lookAll">
				{{ iShidden ? '收起' : '查看全部' }}
				<span class="iconfont" :class="iShidden ? 'icon-xiangshang' : 'icon-xiangxia'"></span>
			</div>
			<div v-if="userBool !== 0 && pinkBool === 0">
				<div class="teamBnt" @click="listenerActionSheet">邀请好友参团</div>
			</div>
			<div class="teamBnt" v-else-if="userBool === 0 && pinkBool === 0 && count > 0" @click="pay">我要参团</div>
			<div class="teamBnt" v-if="pinkBool === 10 || pinkBool === -1" @click="goDetail(combinationData.product_group_id)">再次开团</div>
			<div class="cancel" @click="getCombinationRemove" v-if="pinkBool === 0 && userBool !== 0">
				<span class="iconfont icon-guanbi3"></span>
				取消开团
			</div>
			<div class="lookOrder" v-if="pinkBool === 10" @click="goOrder">
				查看订单信息
				<span class="iconfont icon-xiangyou"></span>
			</div>
		</div>
		<div class="group-recommend">
			<div class="title acea-row row-between-wrapper">
				<div>大家都在拼</div>
				<div class="more" @click="goList">
					更多拼团
					<span class="iconfont icon-jiantou"></span>
				</div>
			</div>
			<div class="list acea-row row-middle">
				<div class="item" v-for="(item, index) in storeCombinationHost" :key="index" @click="goDetail(item.product_group_id)">
					<div class="pictrue">
						<image :src="item.product.image" />
						<div class="team" v-text="item.buying_count_num + '人团'"></div>
					</div>
					<div class="name line1" v-text="item.product.store_name"></div>
					<div class="money" v-text="'￥' + item.price"></div>
				</div>
			</div>
		</div>
		<product-window :attr="attr" :limitNum="1" :iSbnt="1" @myevent="onMyEvent" @ChangeAttr="ChangeAttr" @ChangeCartNum="ChangeCartNum"
		 @iptCartNum="iptCartNum" @attrVal="attrVal" @goCat="goPay"></product-window>
		<!-- 分享按钮 -->
		<view class="generate-posters acea-row row-middle" :class="posters ? 'on' : ''">
			<!-- #ifndef MP -->
			<button class="item" :class="weixinStatus ? 'item3' : ''" hover-class='none' v-if="weixinStatus === true" @click="H5ShareBox = true">
				<!-- <button class="item" hover-class='none' v-if="weixinStatus === true" @click="setShareInfoStatus"> -->
				<view class="iconfont icon-weixin3"></view>
				<view class="">发送给朋友</view>
			</button>
			<!-- #endif -->
			<!-- #ifdef MP -->
			<button class="item" :class="weixinStatus ? 'item3' : ''" open-type="share" hover-class='none' @click="goFriend">
				<view class="iconfont icon-weixin3"></view>
				<view class="">发送给朋友</view>
			</button>
			<!-- #endif -->
			<button class="item" :class="weixinStatus ? 'item3' : ''" hover-class='none' @tap="goPoster">
				<view class="iconfont icon-haibao"></view>
				<view class="">生成海报</view>
			</button>
			<button class="item" :class="weixinStatus ? 'item3' : ''" hover-class='none' @click="copyPwd">
				<view class="iconfont icon-fuzhikouling1"></view>
				<view>生成口令</view>
			</button>
		</view>
		<view class="mask" v-if="posters" @click="listenerActionClose"></view>
		<!--口令复制结果-->
		<copyPassword :isCopy='isCopy' :copyUrl='copyUrl' @close="closeCopy"></copyPassword>
		<!-- 发送给朋友图片 -->
		<view class="share-box" v-if="H5ShareBox">
			<image src="/static/images/share-info.png" @click="H5ShareBox = false"></image>
		</view>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- <Product-window v-on:changeFun="changeFun" :attr="attr" :limitNum='1' :iSbnt='1'></Product-window> -->
		<home></home>
		<canvasPoster v-if="posterCompenents" :posterStatus.sync="posterStatus" :picData="picData"></canvasPoster>
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
	import CountDown from '@/components/countDown';
	import ProductWindow from '@/components/productWindow';
	import copyPassword from '@/components/copyPassword';
	import canvasPoster from '../combination_poster/index.vue'
	import { mapGetters } from 'vuex';
	import {
		getCombinationPink,
		postCombinationRemove,
		getCombinationList
	} from '@/api/activity';
	import {
		postCartAdd,
		getProductCode,
		copyPasswordApi
	} from '@/api/store';
	import authorize from '@/components/Authorize';
	import home from '@/components/home';
	const NAME = 'GroupRule';
	const app = getApp();
	export default {
		name: NAME,
		components: {
			CountDown,
			ProductWindow,
			home,
			canvasPoster,
			copyPassword,
			authorize,
		},
		props: {},
		data: function() {
			return {
				currentPinkOrder: '', //当前拼团订单
				isOk: 0, //判断拼团是否完成
				pinkBool: 0, //判断拼团是否成功|0=失败,1=成功
				userBool: 0, //判断当前用户是否在团内|0=未在,1=在
				pinkAll: [], //团员
				storeCombination: [], //拼团产品
				storeCombinationHost: [], //拼团推荐
				pinkId: 0,
				count: 0, //拼团剩余人数
				iShidden: false,
				isOpen: false, //是否打开属性组件
				attr: {
					cartAttr: false,
					productSelect: {
						image: '',
						store_name: '',
						price: '',
						quota: 0,
						unique: '',
						cart_num: 1,
						quota_show: 0,
						product_stock: 0,
						num: 0
					},
					productAttr: []
				},
				cart_num: '',
				userInfo: {},
				combinationData: {},
				posters: false,
				weixinStatus: false,
				H5ShareBox: false, //公众号分享图片
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				attrTxt: '请选择', //属性页面提示
				attrValue: '', //已选属性
				posterStatus: false,
				posterCompenents: false,
				currSpid: "",
				picData: {
					bagPic: '',
					goodsPic: '',
					codePic: "",
					title: "",
					label: "",
					msg: "",
					price: '',
				},
				isCopy: false,
				copyUrl: '',
				justifyLeft: ''
			};
		},
		computed: mapGetters(['isLogin', 'uid', 'viewColor']),

		watch: {
			isLogin: {
				handler: function(newV, oldV) {
					if (newV) {
						this.getCombinationPink();
					}
				},
				deep: true
			},
		},
		onLoad(options) {
			var that = this;
			that.justifyLeft = that.viewColor;
			if(options.id)that.pinkId = options.id;
			//扫码携带参数处理
			// #ifdef MP
			if (options.scene) {
				let value = this.$util.getUrlParams(decodeURIComponent(options.scene));
				if (value.id) this.pinkId = value.id;
				//记录推广人uid
				if (value.spid) {
					app.globalData.spid = value.spid;
					that.currSpid = value.spid
				}
			}
			// #endif
			if (that.isLogin == false) {
				this.isAuto = true;
				this.isShowAuth = true
			} else {
				this.getCombinationPink();
			}
		},
		mounted: function() {
			this.getCombinationProductList();
			this.getPosterCode()
		},
		//#ifdef MP
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {
			let that = this;
			let pathUrl = '/pages/activity/combination_status/index?id=' + this.pinkId;
			return {
				title: '您的好友' + that.pinkAll[0].nickname + '邀请您参团' + that.storeCombination.store_name,
				path: pathUrl,
				imageUrl: that.storeCombination.image || ''
			};
		},
		onShareTimeline: function() {
			let that = this;
			console.log(app.globalData.openPages)
			return {
				title: '您的好友' + that.pinkAll[0].nickname + '邀请您参团' + that.storeCombination.store_name,
				query: {
					id: that.pinkId,
					spid: that.uid
				},
				imageUrl: that.storeCombination.image || ''
			}
		},
		//#endif
		methods: {
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e;
			},
			// 授权后回调
			onLoadFun: function(e) {
				app.globalData.openPages = '/pages/activity/combination_status/index?id=' + this.pinkId;
				this.getCombinationPink();
				this.isShowAuth = false;
			},
			/**
			 * 分享打开
			 *
			 */
			listenerActionSheet: function() {
				if (this.isLogin == false) {
					this.isAuto = true;
					this.isShowAuth = true
				} else {
					// #ifdef H5
					if (this.$wechat.isWeixin() === true) {
						this.weixinStatus = true;
					}
					// #endif
					this.posters = !this.posters;
				}
			},
			// 分享关闭
			listenerActionClose: function() {
				this.posters = false;
			},
			// 小程序关闭分享弹窗；
			goFriend: function() {
				this.posters = false;
				// this.H5ShareBox = true
			},
			/**
			 * 购物车手动填写
			 *
			 */
			iptCartNum: function(e) {
				this.$set(this.attr.productSelect, 'cart_num', e);
				this.$set(this, 'cart_num', e);
			},
			attrVal(val) {
				this.attr.productAttr[val.indexw].index = this.attr.productAttr[val.indexw].attr_values[val.indexn];
			},
			onMyEvent: function() {
				this.$set(this.attr, 'cartAttr', false);
				this.$set(this, 'isOpen', false);
			},
			//选择属性；
			ChangeAttr: function(res) {
				this.$set(this, 'cart_num', 1);
				let productSelect = this.productValue[res];
				if (productSelect) {
					this.$set(this.attr.productSelect, 'image', productSelect.image);
					this.$set(this.attr.productSelect, 'price', productSelect.price);
					this.$set(this.attr.productSelect, 'stock', productSelect.stock);
					this.$set(this.attr.productSelect, 'quota', productSelect.quota);
					this.$set(this.attr.productSelect, 'unique', productSelect.unique);
					this.$set(this.attr.productSelect, 'cart_num', 1);
					this.$set(this.attr.productSelect, 'product_stock', productSelect.stock);
					this.$set(this.attr.productSelect, 'quota_show', productSelect.stock);
					this.$set(this, 'attrValue', res);
					this.$set(this, 'attrTxt', '已选择');
				} else {
					this.$set(this.attr.productSelect, 'image', this.storeCombination.image);
					this.$set(this.attr.productSelect, 'price', this.storeCombination.price);
					this.$set(this.attr.productSelect, 'quota', 0);
					this.$set(this.attr.productSelect, 'unique', '');
					this.$set(this.attr.productSelect, 'cart_num', 0);
					this.$set(this.attr.productSelect, 'quota_show', 0);
					this.$set(this.attr.productSelect, 'stock', 0);
					this.$set(this.attr.productSelect, 'product_stock', 0);
					this.$set(this, 'attrValue', '');
					this.$set(this, 'attrTxt', '请选择');
				}
			},
			ChangeCartNum: function(changeValue) {
				//changeValue:是否 加|减
				//获取当前变动属性
				let productSelect = this.productValue[this.attrValue];
				//如果没有属性,赋值给商品默认库存
				if (productSelect === undefined && !this.attr.productAttr.length)
					productSelect = this.attr.productSelect;
				//无属性值即库存为0；不存在加减；
				if (productSelect === undefined) return;
				let stock = productSelect.stock || 0;
				let num = this.attr.productSelect;
				if (changeValue) {
					num.cart_num++;
					if (num.cart_num > stock) {
						this.$set(this.attr.productSelect, "cart_num", stock);
						this.$set(this, "cart_num", stock);
					}
				} else {
					num.cart_num--;
					if (num.cart_num < 1) {
						this.$set(this.attr.productSelect, "cart_num", 1);
						this.$set(this, "cart_num", 1);
					}
				}
			},
			//默认选中属性；
			DefaultSelect() {
				let productAttr = this.attr.productAttr,
					value = [];
				for (var key in this.productValue) {
					if (this.productValue[key].stock > 0) {
						value = this.attr.productAttr.length ? key.split(',') : [];
						break;
					}
				}
				for (let i = 0; i < productAttr.length; i++) {
					this.$set(productAttr[i], 'index', value[i]);
				}
				//sort();排序函数:数字-英文-汉字；
				let productSelect = this.productValue[value.join(',')];
				if (productSelect && productAttr.length) {
					this.$set(this.attr.productSelect, 'store_name', this.storeCombination.store_name);
					this.$set(this.attr.productSelect, 'image', productSelect.image);
					this.$set(this.attr.productSelect, 'price', productSelect.price);
					this.$set(this.attr.productSelect, 'stock', productSelect.stock);
					this.$set(this.attr.productSelect, 'unique', productSelect.unique);
					this.$set(this.attr.productSelect, 'cart_num', 1);
					this.$set(this.attr.productSelect, 'product_stock', productSelect.stock);
					this.$set(this.attr.productSelect, 'quota_show', productSelect.stock);
					this.$set(this, 'attrValue', value.join(','));
					this.attrValue = value.join(',');
					this.$set(this, 'attrTxt', '已选择');
				} else if (!productSelect && productAttr.length) {
					this.$set(this.attr.productSelect, 'store_name', this.storeCombination.store_name);
					this.$set(this.attr.productSelect, 'image', this.storeCombination.image);
					this.$set(this.attr.productSelect, 'price', this.storeCombination.price);
					this.$set(this.attr.productSelect, 'stock', 0);
					this.$set(this.attr.productSelect, 'unique', '');
					this.$set(this.attr.productSelect, 'cart_num', 0);
					this.$set(this.attr.productSelect, 'product_stock', 0);
					this.$set(this.attr.productSelect, 'quota_show', 0);
					this.$set(this, 'attrValue', '');
					this.$set(this, 'attrTxt', '请选择');
				} else if (!productSelect && !productAttr.length) {
					this.$set(this.attr.productSelect, 'store_name', this.storeCombination.store_name);
					this.$set(this.attr.productSelect, 'image', this.storeCombination.image);
					this.$set(this.attr.productSelect, 'price', this.storeCombination.price);
					this.$set(this.attr.productSelect, 'stock', 0);
					this.$set(this.attr.productSelect, 'unique', this.storeCombination.unique || '');
					this.$set(this.attr.productSelect, 'cart_num', 1);
					this.$set(this.attr.productSelect, 'quota_show', 0);
					this.$set(this.attr.productSelect, 'product_stock', 0);
					this.$set(this, 'attrValue', '');
					this.$set(this, 'attrTxt', '请选择');
				} else if (productSelect && !productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"store_name",
						this.storeCombination.store_name
					);
					this.$set(this.attr.productSelect, "image", productSelect.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.unique);
					this.$set(this.attr.productSelect, 'quota_show', productSelect.stock);
					this.$set(this, "attrValue", value.join(","));
					this.$set(this, "attrTxt", "已选择");
					if (productSelect.stock == 0) {
						this.$set(this.attr.productSelect, "cart_num", 0);
					} else {
						this.$set(this.attr.productSelect, "cart_num", 1);
					}
				}
			},
			setProductSelect: function() {
				var that = this;
				var attr = that.attr;
				attr.productSelect.image = that.storeCombination.image;
				attr.productSelect.store_name = that.storeCombination.store_name;
				attr.productSelect.price = that.storeCombination.price;
				attr.productSelect.quota = 0;
				attr.productSelect.quota_show = that.storeCombination.stock;
				attr.productSelect.stock = that.storeCombination.stock;
				attr.productSelect.product_stock = that.storeCombination.stock;
				attr.cartAttr = false;
				that.$set(that, 'attr', attr);
			},
			pay: function() {
				var that = this;
				that.attr.cartAttr = true;
				that.isOpen = true;
			},
			goPay() {
				var that = this;
				var data = {
					product_id: that.combinationData.product_group_id,
					product_attr_unique: that.attr.productSelect !== undefined ? that.attr.productSelect.unique : "",
					cart_num: that.attr.productSelect.cart_num,
					product_type: 4,
					is_new: 1,
					group_buying_id: that.combinationData.group_buying_id
				};
				postCartAdd(data)
					.then(res => {
						uni.navigateTo({
							url: '/pages/users/order_confirm/index?new=1&cartId=' + res.data.cart_id
						});
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			goPoster: function() {
				var that = this;
				that.posters = false;
				this.posterStatus = true
			},
			goOrder: function() {
				var that = this;
				uni.navigateTo({
					url: '/pages/order_details/index?order_id=' + that.currentPinkOrder
				});
			},
			//拼团列表
			goList: function() {
				uni.navigateTo({
					url: '/pages/activity/combination/index'
				});
			},
			//拼团详情
			goDetail: function(id) {
				this.pinkId = id;
				uni.navigateTo({
					url: '/pages/activity/combination_details/index?id=' + id
				});
			},
			getPosterCode() {
				let type
				// #ifndef MP
				type = 'wechat'
				// #endif
				// #ifdef MP
				type = 'routine'
				// #endif
				getProductCode(this.pinkId, {
					type,
					product_type: 40
				}).then(res => {
					this.picData.codePic = res.data.url
				}).catch(err => {
					this.$util.Tips({
						title: err
					});
				})
			},
			//复制口令
			copyPwd(){
				let that = this;
				copyPasswordApi({
					id: that.pinkId,
					product_type: 40
				}).then(async res => {
					that.copyUrl = res.data.str;
					that.posters = false
					that.isCopy = true;
				})
			},
			closeCopy(){
				this.isCopy = false
			},
			//拼团信息
			getCombinationPink: function() {
				var that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});

				getCombinationPink(that.pinkId)
					.then(res => {
						uni.hideLoading();
						that.$set(that, 'combinationData', res.data);
						that.$set(that, 'storeCombination', res.data.product);
						that.$set(that, 'pinkAll', res.data.groupUser);
						that.$set(that, 'count', res.data.buying_count_num - res.data.yet_buying_num);
						that.$set(that, 'userBool', res.data.create_status);
						that.$set(that, 'pinkBool', res.data.status);
						that.$set(that, 'currentPinkOrder', res.data.self ? res.data.self.order_id : '');
						that.attr.productAttr = res.data.product.attr;
						that.productValue = res.data.product.sku;
						that.$set(that.picData, 'goodsPic', res.data.product.image);
						that.$set(that.picData, 'title', res.data.product.store_name.length > 28 ? res.data.product.store_name.slice(0,
							28) + '...' : res.data.product.store_name);
						that.$set(that.picData, 'label', res.data.buying_count_num + "人团");
						that.$set(that.picData, 'price', res.data.product.price);
						that.$set(that.picData, 'msg', '市场价：¥ ' + res.data.product.ot_price + " 还差 " +
							that.count + " 人 拼团成功");
						this.posterCompenents = true
						//#ifdef H5
						that.setOpenShare();
						//#endif
						that.setProductSelect();
						that.DefaultSelect();
					})
					.catch(err => {
						this.$util.Tips({
							title: err
						});
						uni.redirectTo({
							success() {},
							fail() {
								uni.navigateTo({
									url: '/pages/index/index',
								})
							}
						})
					});
			},
			//拼团列表
			getCombinationProductList: function() {
				var that = this;
				var data = {
					page: 1,
				};
				getCombinationList(data)
					.then(res => {
						var storeCombinationHost = res.data.list;
						that.storeCombinationHost = that.storeCombinationHost.concat(storeCombinationHost)
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			//#ifdef H5
			setOpenShare() {
				let that = this;
				let configTimeline = {
					title: '您的好友' + that.pinkAll[0].nickname + '邀请您参团' + that.storeCombination.store_name,
					desc: that.storeCombination.store_name,
					link: window.location.protocol + '//' + window.location.host +
						'/pages/activity/combination_status/index?id=' + that.pinkId,
					imgUrl: that.storeCombination.image
				};
				if (this.$wechat.isWeixin()) {
					this.$wechat
						.wechatEvevt(['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage',
							'onMenuShareTimeline'
						], configTimeline)
						.then(res => {
							console.log(res);
						})
						.catch(res => {
							if (res.is_ready) {
								res.wx.updateAppMessageShareData(configTimeline);
								res.wx.updateTimelineShareData(configTimeline);
								res.wx.onMenuShareAppMessage(configTimeline);
								res.wx.onMenuShareTimeline(configTimeline);
							}
						});
				}
			},
			//#endif
			//拼团取消
			getCombinationRemove: function() {
				var that = this;
				uni.showModal({
				    title: '提示',
				     content: '确定取消拼团？',
				     success: function (res) {
						if (res.confirm) {
							postCombinationRemove({
									group_buying_id: that.pinkId
								})
								.then(res => {
									that.$util.Tips({
										title: res.message
									}, {
										tab: 3
									});
								})
								.catch(res => {
									that.$util.Tips({
										title: res.message
									});
								});
						}else if (res.cancel) {
							return that.$util.Tips({
								title: '已取消'
							});
				    }
					}
				});
			},
			lookAll: function() {
				this.iShidden = !this.iShidden;
			}
		}
	};
</script>
<style lang="scss" scoped>
	.generate-posters {
		width: 100%;
		height: 170rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 301;
		transform: translate3d(0, 100%, 0);
		transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		border-top: 1rpx solid #eee;
	}
	.generate-posters.on {
		transform: translate3d(0, 0, 0);
	}
	.generate-posters .item {
		/* #ifdef H5 */
		flex: 50%;
		/* #endif */
		/* #ifndef H5 */
		flex: 33.33%;
		/* #endif */
		text-align: center;
		font-size: 30rpx;
		&.item3{
			flex: 33.33%;
		}
	}
	.generate-posters .item .iconfont {
		font-size: 80rpx;
		color: #5eae72;
	}
	.generate-posters .item .iconfont.icon-haibao {
		color: #5391f1;
	}
	.generate-posters .item .iconfont.icon-fuzhikouling1 {
		color: #FBB324;
	}
	/* #ifdef MP */
	.group-con{
		padding-top: 30rpx;
	}
	/* #endif */
	.sColor{
		color: var(--view-theme);
		border: 1rpx solid var(--view-theme);
	}
	/*开团*/
	.group-con .header {
		width: 100%;
		height: 186rpx;
		background-color: #fff;
		border-top: 1px solid #f5f5f5;
		padding: 0 30rpx;
		position: relative;
	}
	.group-con .header .iconfont {
		font-size: 100rpx;
		position: absolute;
		color: #ccc;
		right: 33rpx;
		bottom: 20rpx;
	}
	.group-con .header .pictrue {
		width: 140rpx;
		height: 140rpx;
	}
	.group-con .header .pictrue uni-image,.group-con .header .pictrue image {
		width: 140rpx;
		height: 140rpx;
		border-radius: 6rpx;
	}
	.group-con .header .text {
		width: 540rpx;
		font-size: 30rpx;
		color: #222;
	}
	.group-con .header .text .money {
		font-size: 24rpx;
		font-weight: bold;
		margin-top: 15rpx;
	}
	.group-con .header .text .money .num {
		font-size: 32rpx;
	}
	.group-con .header .text .money .team {
		padding: 1rpx 10rpx;
		font-weight: normal;
		border-radius: 50rpx;
		font-size: 20rpx;
		vertical-align: 4rpx;
		margin-left: 15rpx;
	}
	.group-con .wrapper {
		background-color: #fff;
		margin-top: 20rpx;
		padding: 2rpx 0 35rpx 0;
	}
	.group-con .wrapper .title {
		margin-top: 30rpx;
	}
	.group-con .wrapper .title .line {
		width: 136rpx;
		height: 1px;
		background-color: #ddd;
	}
	.group-con .wrapper .title .name {
		margin: 0 45rpx;
		font-size: 28rpx;
		color: #282828;
	}
	.group-con .wrapper .title .name .time {
		margin: 0 14rpx;
	}
	/deep/.group-con .wrapper .styleAll {
		background-color: #ffcfcb;
		text-align: center;
		border-radius: 3rpx;
		font-size: 28rpx;
		font-weight: bold;
		display: inline-block;
		vertical-align: middle;
		background-color: var(--view-minorColor);
		padding: 2rpx 5rpx;
	}
	.gColor{
		background-color: var(--view-theme)!important;
	}
	.t-color{
		color: var(--view-theme)!important;
	}
	.group-con .wrapper .tips {
		font-size: 30rpx;
		font-weight: bold;
		text-align: center;
		margin-top: 30rpx;
	}
	.group-con .wrapper .list {
		padding: 0 30rpx;
		margin-top: 45rpx;
	}
	.group-con .wrapper .list.result {
		max-height: 240rpx;
		overflow: hidden;
	}
	.group-con .wrapper .list.result.on {
		max-height: 2000rpx;
	}
	.group-con .wrapper .list .pictrue {
		width: 94rpx;
		height: 94rpx;
		margin: 0 0 29rpx 35rpx;
	}
	.group-con .wrapper .list .pictrue uni-image,.group-con .wrapper .list .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.group-con .wrapper .list .img-none {
		border: none;
		width: 140rpx;
		height: 140rpx;
	}
	.group-con .wrapper .lookAll {
		font-size: 24rpx;
		color: #282828;
		padding-top: 10rpx;
	}
	.group-con .wrapper .lookAll .iconfont {
		font-size: 25rpx;
		margin: 2rpx 0 0 10rpx;
	}
	.group-con .wrapper .teamBnt {
		font-size: 30rpx;
		width: 620rpx;
		height: 86rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 86rpx;
		color: #fff;
		margin: 21rpx auto 0 auto;
		background-color: var(--view-theme);
	}
	.group-con .wrapper .cancel,
	.group-con .wrapper .lookOrder {
		text-align: center;
		font-size: 24rpx;
		color: #282828;
		padding-top: 30rpx;
	}
	.group-con .wrapper .cancel .iconfont {
		font-size: 35rpx;
		color: #2c2c2c;
		vertical-align: -4rpx;
		margin-right: 9rpx;
	}
	.group-con .wrapper .lookOrder .iconfont {
		font-size: 25rpx;
		color: #2c2c2c;
		margin-left: 10rpx;
	}
	.group-con .group-recommend {
		background-color: #fff;
		margin-top: 25rpx;
	}
	.group-con .group-recommend .title {
		padding-right: 30rpx;
		margin-left: 30rpx;
		height: 85rpx;
		border-bottom: 1px solid #eee;
		font-size: 28rpx;
		color: #282828;
	}
	.group-con .group-recommend .title .more {
		color: #808080;
	}
	.group-con .group-recommend .title .more .iconfont {
		margin-left: 13rpx;
		font-size: 28rpx;
	}
	.group-con .group-recommend .list {
		margin-top: 30rpx;
	}
	.group-con .group-recommend .list .item {
		width: 210rpx;
		margin: 0 0 25rpx 30rpx;
	}
	.group-con .group-recommend .list .item .pictrue {
		width: 100%;
		height: 210rpx;
		position: relative;
	}
	.group-con .group-recommend .list .item .pictrue uni-image,.group-con .group-recommend .list .item .pictrue image {
		width: 210rpx;
		height: 210rpx;
		border-radius: 10rpx;
	}
	.group-con .group-recommend .list .item .pictrue .team {
		position: absolute;
		top: 28rpx;
		left: -5rpx;
		min-width: 100rpx;
		height: 36rpx;
		line-height: 36rpx;
		text-align: center;
		border-radius: 0 18rpx 18rpx 0;
		font-size: 20rpx;
		color: #fff;
		background-image: linear-gradient(to right, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
	}
	.group-con .group-recommend .list .item .name {
		font-size: 28rpx;
		color: #333;
		margin-top: 0.18rem;
	}
	.group-con .group-recommend .list .item .money {
		font-weight: bold;
		font-size: 28rpx;
		color: var(--view-priceColor);
	}
	.share-box {
		z-index: 1000;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
