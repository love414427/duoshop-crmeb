<template>
	<view :style="viewColor">
		<view class="acea-row nav">
			<view class="acea-row row-center-wrapper" :class="{ on: tabCur == 1 }" @click="tab(1)">发票记录</view>
			<view class="acea-row row-center-wrapper" :class="{ on: tabCur == 2 }" @click="tab(2)">抬头管理</view>
		</view>
		<block v-if="tabCur == 1">
			<view class="store-list" v-if="orderList.length">
				<view class="item" v-for="(item,index) in orderList" :key="index">
					<view class="hd">
						<image :src="item.storeOrder.orderProduct[0].cart_info.productAttr.image" mode="" v-if="item.storeOrder.orderProduct[0].cart_info.productAttr.image"></image>
						<image :src="item.storeOrder.orderProduct[0].cart_info.product.image" mode="" v-else></image>
						<view class="line2 name">{{item.storeOrder.orderProduct[0].cart_info.product.store_name}}</view>
					</view>
					<view class="bd">
						<view class="title">{{ item.receipt_info.receipt_type == 1 ? '普通发票' : '专用发票' }}</view>
						<view class="time">申请时间 {{item.create_time}}</view>
						<view class="price"><text>￥</text>{{item.order_price}}</view>
					</view>
					<view class="ft">
						<text>{{item.status | filterTxt}}</text>
						<view v-if="item.storeOrder.paid == 1" class="btn" @click="goOrderDetail(item)">查看详情</view>
					</view>
				</view>
			</view>
			<view v-else class="nothing">
				<image src="@/static/images/noInvoice.png"></image>
				<view class="nothing_text">您还没有发票记录哟~</view>
			</view>
		</block>
		<block v-if="tabCur == 2">
			<view v-if="invoiceList && invoiceList.length" class="list">
				<view v-for="(item,index) in invoiceList" :key="index" class="item">
					<view class="acea-row item-hd">
						<view class="acea-row row-middle">
							<view class="name">{{ item.receipt_title }}</view>
							<view v-if="item.is_default" class="label">默认</view>
						</view>
						<view class="type" :class="item.receipt_type == 1 ? '' : 'special'">{{ item.receipt_type == 1 ? '普通发票' : '专用发票' }}</view>
					</view>
					<view class="item-bd">
						<view v-if="item.receipt_title_type == 1" class="cell">邮箱 {{ item.email }}</view>
						<view v-else>
							<!-- <view class="cell">联系电话 {{ item.tel }}</view> -->
							<view class="cell">企业税号 {{ item.duty_paragraph }}</view>
						</view>
					</view>
					<view class="acea-row row-right item-ft">
						<view class="btn" @tap="editInvoice(item.user_receipt_id)"><text class="iconfont icon-bianji"></text>编辑</view>
						<view class="btn" @tap="deleteInvoice(item.user_receipt_id,index)"><text class="iconfont icon-shanchu"></text>删除</view>
					</view>
				</view>
			</view>
			<view v-else class="nothing">
				<image src="@/static/images/noInvoice.png"></image>
				<view class="nothing_text">您还没有添加发票信息哟~</view>
			</view>
			<button class="add-btn" @click="addInvoice"><text class="iconfont icon-fapiao"></text>添加新发票抬头</button>
		</block>
		
		<home></home>
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
	import home from '@/components/home';
	import { mapGetters } from "vuex";
	import {
		invoice,
		invoiceDelete
	} from '@/api/user.js';
	import { receiptOrder } from '@/api/order.js'
	export default {
		components: {
			home
		},
		props: {},
		filters:{
			filterTxt(val){
				const obj = {
					0:'未开票',
					1:'已开票',
					10:'未寄出'
				}
				return obj[val]
			}
		},
		data() {
			return {
				tabCur:1,
				invoiceList: [],
				query: {
					page: 1,
					limit: 20,
				},
				loading: false,
				finished: false,
				isScroll:false,
				orderList:[],
				orderPage:1
			};
		},
		computed: mapGetters(['isLogin','viewColor']),
		watch: {
			loading(value) {
				if (value) {
					uni.showLoading({
						title: '加载中'
					});
				} else {
					uni.hideLoading();
				}
			}
		},
		onLoad(optios) {
			if(optios.type){
				this.tabCur = optios.type
			}else{
				try{
					this.tabCur = uni.getStorageSync('user_invoice_list')?uni.getStorageSync('user_invoice_list'): 1
					uni.removeStorageSync('user_invoice_list')
				}catch(error){}
			}
			
		},
		onShow() {
			this.orderPage =1
			this.orderList = []
			this.query.page = 1
			this.invoiceList = []
			this.finished = false;
			this.isScroll = false
			this.receiptOrder();
			this.getInvoiceList();
		},
		methods: {
			// 去订单详情
			goOrderDetail(item){
				uni.navigateTo({
					url:`/pages/users/user_invoice_order/index?order_id=${item.storeOrder.group_order_id}&invoice_id=${item.order_receipt_id}`
				})								
			},
			// 切换发票
			tab(type) {
				if (this.tabCur !== type) {
					this.tabCur = type;
					uni.setStorageSync('user_invoice_list',type)
					// if(type == 2){
					// 	this.getInvoiceList();
					// }else{
					// 	this.receiptOrder();
					// }
					
				}
			},
			// 获取发票订单
			receiptOrder(){
				if(this.isScroll) return
				receiptOrder({
					page:this.orderPage,
					limit:this.query.limit
				}).then(res=>{
					this.orderList =this.orderList.concat(res.data.list)
					this.isScroll = this.orderList.length>=res.data.count
					this.orderPage++
				})
			},
			// 获取发票列表
			getInvoiceList(param) {
				if (param) {
					this.invoiceList = [];
					this.query.page = 1;
					this.finished = false;
				}
				if (this.loading) {
					return;
				}
				if (this.finished) {
					return;
				}
				this.loading = true;
				invoice().then(res => {
					let data = res.data;
					this.loading = false;
					this.invoiceList = res.data;
					this.finished = data.length < this.query.limit;
					this.query.page++;
				}).catch(err => {
					this.loading = false;
					this.$util.Tips({
						title: err
					});
				});
			},
			// 添加新发票
			addInvoice() {
				uni.navigateTo({
					url: '/pages/users/user_invoice_form/index'
				});
			},
			// 编辑发票
			editInvoice(id) {
				uni.navigateTo({
					url: `/pages/users/user_invoice_form/index?id=${id}`
				})
			},
			// 删除发票
			deleteInvoice(id,index) {
				let that = this;
				uni.showModal({
					content: '删除该发票？',
					confirmColor: '#E93323',
					success(res) {
						if (res.confirm) {
							invoiceDelete(id).then(() => {
								that.$util.Tips({
									title: '删除成功',
									icon: 'success'
								}, () => {
									that.invoiceList.splice(index, 1);
								});
							}).catch(err => {
								return that.$util.Tips({
									title: err
								});
							});
						}
					}
				});
			}
		},
		onReachBottom() {
			this.receiptOrder()
		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
		width: 100%;
		height: 90rpx;
		background-color: #FFFFFF;
	}
	.nav .acea-row {
		flex: 1;
		border-top: 3rpx solid transparent;
		border-bottom: 3rpx solid transparent;
		font-size: 30rpx;
		color: #282828;
	}
	.nav .on {
		border-bottom-color: var(--view-theme);
		color: var(--view-theme);
	}
	.list {
		padding: 14rpx 32rpx;
		margin-top: 90rpx;
		padding-bottom: 220rpx;
	}
	.list .item {
		padding: 28rpx 32rpx;
		background-color: #FFFFFF;
	}
	.list .item~.item {
		margin-top: 14rpx;
	}
	.list .item-hd .acea-row {
		flex: 1;
		min-width: 0;
	}
	.list .name {
		font-weight: 600;
		font-size: 30rpx;
		color: #282828;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.list .label {
		width: 70rpx;
		height: 28rpx;
		border: 1rpx solid var(--view-theme);
		margin-left: 18rpx;
		font-size: 20rpx;
		line-height: 26rpx;
		text-align: center;
		color: var(--view-theme);
	}
	.list .type {
		width: 124rpx;
		height: 42rpx;
		background-color: #FCF0E0;
		font-size: 24rpx;
		line-height: 42rpx;
		text-align: center;
		color: #D67300;
	}
	.list .type.special {
		background-color: var(--view-minorColor);
		color: var(--view-theme);
	}
	.list .item-bd {
		margin-top: 18rpx;
	}
	.list .cell {
		font-size: 26rpx;
		color: #666666;
	}
	.list .cell~.cell {
		margin-top: 12rpx;
	}
	.list .item-ft {
		margin-top: 11rpx;
	}
	.list .btn {
		font-size: 26rpx;
		color: #282828;
		cursor: pointer;
	}
	.list .btn~.btn {
		margin-left: 35rpx;
	}
	.list .btn .iconfont {
		margin-right: 10rpx;
		font-size: 24rpx;
		color: #000000;
	}
	.add-btn {
		position: fixed;
		right: 30rpx;
		bottom: 20rpx;
		left: 30rpx;
		z-index: 9;
		height: 86rpx;
		border-radius: 43rpx;
		background-color: var(--view-theme);
		font-size: 30rpx;
		line-height: 86rpx;
		color: #FFFFFF;
	}
	.nothing {
		margin-top: 200rpx;
		text-align: center;		
	}
	.nothing_text{
		margin-top: 20rpx;
		color: #999999;
	}
	.store-list{
		margin-top: 110rpx;
		padding: 0 30rpx 30rpx;
		.item{
			padding: 30rpx;
			margin-bottom: 20rpx;
			background: #fff;
			border-radius: 6rpx;
			.hd{
				display: flex;
				image{
					width: 78rpx;
					height: 78rpx;
				}
				.name{
					flex:1;
					margin-left: 24rpx;
					line-height: 1.8;
					font-size: 26rpx;
					color: #282828;
				}
			}
			.bd{
				position: relative;
				padding: 25rpx 36rpx;
				margin-top: 36rpx;
				background: #F5F6F7;
				border-radius: 20rpx;
				.title{
					font-size: 26rpx;
					color: #282828;
					font-weight: bold;
				}
				.time{
					margin-top: 8rpx;
					font-size: 26rpx;
					color: #818181;
				}
				.price{
					position: absolute;
					right: 30rpx;
					top: 50%;
					transform: translateY(-50%);
					color: #282828;
					font-size: 32rpx;
					font-weight: bold;
					text{
						font-weight: normal;
						font-size: 24rpx;
					}
				}
			}
			.ft{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 39rpx;
				text{
					color: #282828;
					font-size: 28rpx;
					font-weight: bold;
				}
				.btn{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 150rpx;
					height: 57rpx;
					background: #FFFFFF;
					border: 1px solid #707070;
					border-radius: 29rpx;
					font-size: 26rpx;
				}
			}
		}
	}
</style>
