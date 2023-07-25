<template>
	<view class="collection-count" :style="viewColor">
		<view class="navTabBox">
			<view class="longTab">
				<view class="tab-item" v-for="(item,index) in tabList" :key="index" :class="{'on':index == tabIndex-1}" @click="bindTab(index)"><text>{{item.title}}</text></view>
			</view>
			<view v-if="collectProductList.length && tabIndex == 1" class="list_header acea-row">
				<view class="total">共<text>{{total}}</text>件商品</view>
				<view class="text" @click.stop="handleEdit">{{isEdit ? '完成' : '编辑'}}</view>				
			</view>
		</view>
		<block v-if="tabIndex == 1">	
			<view class='collectionGoods' v-if="collectProductList.length">
				<view class='item acea-row row-between-wrapper' v-for="(item,index) in collectProductList" :key="index" v-if="item.spu" @tap.stop="goDetail(item.spu)">
					<view class="left acea-row row-between-wrapper">
						<view v-if="isEdit" class="checkbox" @click.stop="collectCheck(item,index)">
							<text v-if="!item.check" class="iconfont icon-weixuanzhong"></text>
							<text v-else class="iconfont icon-xuanzhong1"></text>
						</view>
						<view class='pictrue' >
							<easy-loadimage mode="widthFix" :image-src="item.spu.image"></easy-loadimage>
							<view v-if="item.spu.status !== 1" class="off">已下架</view>
						</view>
					</view>
					<view class='text acea-row row-column-between' :class="isEdit ? 'edit' : ''">
						<view class='name' :class="{saleOff : item.spu.status!=1}">	
							<view class="name_text">
								<text v-if="item.spu.product_type != 0" :class="'font_bg-red type'+item.spu.product_type">{{item.spu.product_type == 1 ? "秒杀" : item.spu.product_type == 2 ? "预售" : item.spu.product_type == 3 ? "助力" : item.spu.product_type == 4 ? "拼团" : ""}}</text>
							{{item.spu.store_name}}
							</view>
						</view>
						<view class='acea-row row-between-wrapper'>
							<view class='money' :class="{saleOff : item.spu.status!=1}"><text>￥</text>{{item.spu.price}}</view>
						</view>
					</view>
				</view>
				<view class='loadingicon acea-row row-center-wrapper'>
					<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadTitle}}
				</view>
			</view>
			
			<view class='footer acea-row row-between-wrapper' v-if="isEdit && collectProductList.length>0">
				<view>
					<view class="allcheckbox" @click.stop="checkboxAllChange">
						<text v-if="!isAllSelect" class="iconfont icon-weixuanzhong"></text>
						<text v-else class="iconfont icon-xuanzhong1"></text>
						全选 
					</view>
				</view>
				<view class='acea-row row-between-wrapper'>
					<view class='button acea-row row-middle' style="margin-right: 20rpx;">
						<form @submit="subCollect" report-submit='true'>
							<button class='bnt collect_btn' formType="submit">取消收藏</button>
						</form>
					</view>
				</view>
			</view>
		</block>
		<block v-else>
			<view v-if="storeList.length>0" class="user_store_attention" :style="viewColor">
				<view class="item" v-for="(item,index) in storeList" :key="index" :style="{ 'background-image': `url(${domain}/static/diy/store_bg${keyColor}.png)`}">
					<view class="store_header" @click="goStore(item)">
						<image :src="item.merchant.mer_avatar" mode=""></image>
						<view class="info">
							<view class="line1">
								<text class="name line1">{{item.merchant.mer_name}}</text>
								<text v-if="item.merchant.type_name" class="font-bg-red ml8">{{item.merchant.type_name}}</text>
								<text v-else-if="item.merchant.is_trader" class="font-bg-red ml8">自营</text>
							</view>
							<view class="btn" @click.stop="bindDetele(item,index)">取消关注</view>
						</view>
					</view>
					<view class="store-closed" v-if="item.merchant.is_del == 1 || item.merchant.mer_state == 0 || item.merchant.status == 0">
						<image class="closed" :src="domain+'/static/images/store-closed.png'"></image>
						<view class="closed-text">店铺已关闭，去看看别的店铺吧</view>
					</view>
					<view class="store_recommend" v-else-if="item.merchant && item.merchant.showProduct.length>0">
						<block v-for="(itemn,indexn) in item.merchant.showProduct" :key="indexn" v-if="indexn < 3">
							<navigator :url="'/pages/goods_details/index?id='+itemn.product_id"
						 hover-class="none" class="list">
								<view class="picture">
									<easy-loadimage mode="widthFix" :image-src="itemn.image"></easy-loadimage>
									<view v-if="itemn.border_pic" :style="{ backgroundImage: `url(${itemn.border_pic})` }" class="border-picture"></view>
								</view>
							</navigator>
						</block>
					</view>
				</view>
			</view>
		</block>
		<view class='noCommodity' v-if="(!collectProductList.length && tabIndex == 1) || (!storeList.length && tabIndex == 2)">
			<view class='pictrue'>
				<image src='@/static/images/noCart.png'></image>
				<view>{{tabIndex == 1 ? '暂无商品' : '暂无店铺'}}，去添加点什么吧</view>
			</view>
			
		</view>
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
	import { getCollectUserList, getProductHot, userCollectDel, collectDel, getMerchantLst } from '@/api/store.js';
	import { goShopDetail } from '@/libs/order.js'
	import {initiateAssistApi} from '@/api/activity.js'
	import { mapGetters } from "vuex";
	import { configMap } from '@/utils';
	import { HTTP_REQUEST_URL } from '@/config/app';
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';
	import authorize from '@/components/Authorize';
	export default {
		components: {
			easyLoadimage,
			authorize
		},
		data() {
			return {
				hostProduct: [],
				loadTitle: '加载更多',
				loading: false,
				loadend: false,
				collectProductList: [],
				checkedArr: [],
				limit: 10,
				page: 1,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false ,//是否隐藏授权
				hotScroll:false,
				hotPage:1,
				hotLimit:10,
				domain: HTTP_REQUEST_URL,
				storeList:[],
				isScroll:true,
				storePage: 1,
				storeLimit: 10,
				total: 0,
				isEdit: false,
				isAllSelect: false,
				tabIndex:1,
				tabList:[
					{
						title:'商品'
					},
					{
						title:'店铺'
					}
				],
			};
		},
		computed: configMap({recommend_switch:0,hide_mer_status:0},mapGetters(['isLogin','viewColor','keyColor'])),
		onLoad(options) {
			this.tabIndex = options.tab || 1
			if (this.isLogin) {
				this.get_user_collect_product();
				this.getList();
			} else {
				this.isAuto = true;
				this.isShowAuth = true
			}
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		methods: {
			/**
			 * 授权回调
			 */
			onLoadFun: function() {
				this.isShowAuth = false;
				this.get_user_collect_product();
				this.getList();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			handleEdit(){
				this.isEdit = !this.isEdit;
			},
			goStore(item){
				if(this.hide_mer_status != 1){
					uni.navigateTo({
						url:`/pages/store/home/index?id=${item.merchant.mer_id}`
					})
				}				
			},
			goDetail(item){
				goShopDetail(item, this.uid).then(res => {
				if (this.isLogin) {
						initiateAssistApi(item.activity_id).then(res => {
							let id = res.data.product_assist_set_id;
							uni.hideLoading();
							uni.navigateTo({
								url: '/pages/activity/assist_detail/index?id=' + id
							});	
						}).catch((err) => {
							uni.showToast({
								title: err,
								icon: 'none'
							})
						});
					} else {
						this.isAuto = true;
						this.isShowAuth = true
					}
				})
			},
			bindTab(index){
				this.tabIndex = index+1
			},
			// 取消关注
			bindDetele(item,index){
				userCollectDel({
					type:10,
					type_id:[item.type_id]
				}).then(res=>{
					uni.showToast({
						title:'已取消',
						icon:'none'
					})
					this.storeList.splice(index,1)
				})
			},
			getList(){
				if(!this.isScroll) return
				getMerchantLst({
					page:this.storePage,
					limit:this.storeLimit
				}).then(res=>{
					this.isScroll = res.data.list.length>=this.limit
					this.storeList = this.storeList.concat(res.data.list)
					this.storePage+=1
				})
			},
			/**
			 * 获取收藏产品
			 */
			get_user_collect_product: function() {
				let that = this;
				if (that.loading) return;
				if (that.loadend) return;
				that.loading = true;
				that.loadTitle = "";
				getCollectUserList({
					page: that.page,
					limit: that.limit
				}).then(res => {
					that.total = res.data.count;
					let collectProductList = res.data.list;
					let loadend = collectProductList.length < that.limit;
					collectProductList.forEach((item,index)=>{
						if(!item.check){
							that.$set(item,'check',false)
						}
					})
					that.collectProductList = that.$util.SplitArray(collectProductList, that.collectProductList);
					that.$set(that, 'collectProductList', that.collectProductList);
					that.loadend = loadend;
					that.loadTitle = loadend ? '我也是有底线的' : '加载更多';
					that.page = that.page + 1;
					that.loading = false;
				}).catch(err => {
					that.loading = false;
					that.loadTitle = "加载更多";
				});
			},
			/**
			 * 取消收藏
			 */
			subCollect: function() {
				let that = this;
				userCollectDel({
					type:1,
					type_id: that.getSelectGoods()
				}).then(res => {
					return that.$util.Tips({
						title: '取消收藏成功',
						icon: 'success'
					}, function() {
						that.reloadData()
					});
				}).catch(err => {
					return that.$util.Tips({
						title: err,
					});
				});;
			},
			reloadData() {
				this.checkedArr.forEach((itm, idx) => {
					this.collectProductList = this.collectProductList.filter(item => item!=itm);	
				})
				this.total-=this.checkedArr.length;
			},
			collectCheck(item) {
				item.check = !item.check
				this.cartAllCheck('goodsCheck')
			},
			// 全选
			checkboxAllChange() {
				this.isAllSelect = !this.isAllSelect
				this.cartAllCheck('allCheck')
			},
			// 全选判断
			cartAllCheck(type) {
				let allArr = [];
				this.collectProductList.forEach((el, index) => {
					if(type == 'goodsCheck'){
						if(el.check){
							allArr.push(el)
						}
					}else{
						el.check = this.isAllSelect
						if (el.check) allArr.push(el)	
					}				
				})
				this.checkedArr = allArr;
				// 全选
				this.isAllSelect = allArr.length == this.collectProductList.length ? true : false
			},
			// 获取选中的商品
			getSelectGoods() {
				let arr = []
				this.collectProductList.forEach((el, index) => {
					if(el.check){
						arr.push(el.type_id)
					}
				})
				return arr;
			},
			
		},
		onReachBottom() {
			this.tabIndex == 1 ? this.get_user_collect_product() : this.getList()
		},
		// 滚动监听
		onPageScroll(e) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			uni.$emit('scroll');
		}
	}
</script>

<style scoped lang="scss">
	.navTabBox{
		
		height: 166rpx;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
	}
	.longTab{
		background: #fff;
		display: flex;
		text-align: center;
	}
	.tab-item{
		width: 50%;
		display: inline-block;
		line-height: 90rpx;
		color: #666666;
		font-size: 30rpx;
		text{
			position: relative;
			display: inline-block;
		}
	}
	.tab-item.on{
		color: var(--view-theme);
		font-weight: bold;
		text{
			&:after{
				content: "";
				display: inline-block;
				width: 90%;
				height: 3rpx;
				background-color: var(--view-theme);
				position: absolute;
				left: 5%;
				bottom: 0;
			}
		}
	}
	.list_header{
		justify-content: space-between;
		padding: 0 30rpx;
		height: 76rpx;
		line-height: 76rpx;
		color: #666666;
		font-size: 26rpx;
		background: #f5f5f5;
		.total{
			text{
				color: var(--view-theme);
			}
		}
		.text{
			color: var(--view-theme);
		}
	}
	.collectionGoods {
		background-color: #fff;
		margin-top: 166rpx;
	}
	.font_bg-red {
		background-color: var(--view-theme);
		border: 1px solid var(--view-theme);
		&.type2{
			background-color: #FD6523;
			border: 1px solid #FD6523;
		}
	}
	.collectionGoods .item {
		margin-left: 30rpx;
		padding: 25rpx 30rpx 30rpx 0;
		border-bottom: 1px solid #eee;
		.checkbox{
			margin-right: 30rpx;
			.iconfont{
				font-size: 38rpx;
				color: #999999;
				&.icon-xuanzhong1{
				  color: var(--view-theme);
				}
			}
		}
	}
	.collectionGoods .item .pictrue {
		width: 160rpx;
		height: 160rpx;
		position: relative;
		.off{
			width: 80rpx;
			height: 80rpx;
			background: rgba(0,0,0,.5);
			color: #ffffff;
			font-size: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 100%;
			position: absolute;
			top: 40rpx;
			left: 40rpx;
		}
	}

	/deep/.collectionGoods .item .pictrue image,
	/deep/.collectionGoods .item .easy-loadimage, .collectionGoods .item uni-image{
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}
	.collectionGoods .item .text {
		width: 500rpx;
		height: 160rpx;
		font-size: 28rpx;
		color: #282828;
		&.edit{
			width: 430rpx;
		}
	}
	.collectionGoods .item .text .name {
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		&.saleOff{
			color: #CCCCCC;
		}
	}
	.collectionGoods .item .name_text{
		display: inline-block;
		max-width: 480rpx;
		overflow:hidden;
		text-overflow: ellipsis; 
		display: -webkit-box; 
		-webkit-line-clamp: 2; 
		-webkit-box-orient: vertical;
		font-size: 28rpx;
	}
	.collectionGoods .item .text .money {
		font-size: 30rpx;
		font-weight: bold;
		color: var(--view-priceColor);
		text{
			font-size: 20rpx;
		}
		&.saleOff{
			color: #CCCCCC;
		}
	}
	.collectionGoods .item .text .delete {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #282828;
		width: 144rpx;
		height: 46rpx;
		border: 1px solid #bbb;
		border-radius: 24rpx;
		text-align: center;

	}

	.noCommodity {
		padding-top: 1rpx;
		border-top: 0;
		min-height: 90vh;
		margin-top: 90rpx;
	}
	.noCommodity .pictrue{
		text-align: center;
		padding: 0;
		margin: 78rpx auto 26rpx auto;
	}
.collection-count .footer {
	z-index: 99;
	width: 100%;
	height: 100rpx;
	height: calc(100rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
	height: calc(100rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
	background-color: #ffffff;
	position: fixed;
	padding: 0 20rpx;
	box-sizing: border-box;
	border-top: 1px solid #eee;
	bottom: var(--window-bottom);
	
}
.area-edit{
	justify-content: center;
	.area-item{
		width: 50%;
		text-align: center;
		position: relative;	
		align-items: center;
		color: #333333;
		.text{
			position: relative;
			top: -1px;
		}
		.iconfont{
			color: #333333;
		}
		&:nth-child(1){
			&::after{
				content: '';
				display: inline-block;
				width: 2rpx;
				height: 42rpx;
				background: #CCCCCC;
				position: absolute;
				top: 0;
				right: 0;
			}
		}
	}
}
.collection-count .footer .checkAll {
	font-size: 28rpx;
	color: #282828;
	margin-left: 16rpx;
}
.allcheckbox .iconfont{
	margin-right: 11px;
	font-size: 40rpx;
	color: #cccccc;
}
.allcheckbox .icon-xuanzhong1{
	color: var(--view-theme);
}
.collection-count .footer .button .bnt {
	font-size: 28rpx;
	border-radius: 50rpx;
	width: 160rpx;
	height: 60rpx;
	text-align: center;
	line-height: 60rpx;
	color: var(--view-theme);
	border: 2rpx solid var(--view-theme);
}
.user_store_attention{
	padding: 20rpx;
	margin-top: 90rpx;
	.item{
		background-color: #ffffff;
		background-size: 100%;
		background-repeat: no-repeat;
		border-radius: 16rpx;
		padding: 0 20rpx;
		margin-bottom: 20rpx;
		
	}
	.store_header{
		position: relative;
		display: flex;
		padding: 30rpx 10rpx;		
		align-items: center;	
		image{
			width: 88rpx;
			height: 88rpx;
			border-radius: 50%;
		}
		.info{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20rpx;
			position: relative;
			.name{
				width: 410rpx;
				font-weight: bold;
			}
			.des{
				color: #666666;
				font-size: 22rpx;
			}
			.btn{
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				right: 0;
				top: 50%;
				width:150rpx;
				height:50rpx;
				transform: translateY(-50%);
				border:1px solid #BBBBBB;
				border-radius:25rpx;
				font-size: 26rpx;
			}
		}
	}
	.store-closed{
		text-align: center;
		padding-bottom: 30rpx;
		.closed{
			width: 300rpx;
			height: 170rpx;
		}
		.closed-text{
			color: #999999;
			font-size: 26rpx;
			margin-top: 20rpx;
		}
	}
	.store_recommend{
		display: flex;
		padding-bottom: 30rpx;
		.list{
			width: 210rpx;
			.picture,/deep/image,/deep/.easy-loadimage,uni-image{
				width: 210rpx;
				height: 210rpx;
				border-radius: 10rpx;
				position: relative;
			}
			.border-picture {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border-radius: 16rpx 16rpx 0 0;
				background: center/cover no-repeat;
			}
			margin-right: 20rpx;
			&:last-child{
				margin-right: 0;
			}
			.price{
				text-align: center;
				color: var(--view-priceColor);
				font-size: 24rpx;
				margin-top: 10rpx;
				font-weight: bold;
			}
		}
	}
}
</style>
