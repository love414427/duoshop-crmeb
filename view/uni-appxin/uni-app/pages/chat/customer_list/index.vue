<template>
	<div class="CustomerList" :style="viewColor">
		<view>
			<block v-if="type == 0 && list.length>0" v-for="(item,index) in list" :key="index">
				<div v-if="item.merchant" class="item acea-row" @click="goPage(item)">
					<view class="logo">
						<image :src="item.merchant && item.merchant.mer_avatar" mode=""></image>
					</view>
					<view class="info">
						<view class="name">{{item.merchant ? item.merchant.mer_name : ''}}</view>
						<view class="con line1" v-if="item.last && item.last.msn_type == 1">{{item.last.msn}}</view>
						<view class="con line1" v-if="item.last && item.last.msn_type == 2">[表情]</view>
						<view class="con line1" v-if="item.last && item.last.msn_type == 3">[图片]</view>
						<view class="con line1" v-if="item.last && item.last.msn_type == 4">[商品]</view>
						<view class="con line1" v-if="item.last && (item.last.msn_type == 5 || item.last.msn_type == 6)">[订单]</view>
					</view>
					<view class="right-box">
						<view class="time">{{item.last && item.last.create_time.split(' ')[1] || ''}}</view>
						<view class="num" v-if="item.num>0">{{item.num}}</view>
					</view>
				</div>
			</block>
			<block v-if="type == 1 && list.length>0" v-for="(item,index) in list" :key="index">
				<div class="item acea-row" @click="goPage(item)">
					<view class="logo">
						<image :src="(item.user && item.user.avatar) ? item.user.avatar : '/static/images/f.png'" mode=""></image>
					</view>
					<view class="info">
						<view class="name">{{item.user && item.user.nickname}}</view>
						<view class="con line1" v-if="item.last && item.last.msn_type == 1">{{item.last.msn}}</view>
						<view class="con line1" v-if="item.last && item.last.msn_type == 2">[表情]</view>
						<view class="con line1" v-if="item.last && item.last.msn_type == 3">[图片]</view>
						<view class="con line1" v-if="item.last && (item.last.msn_type == 4 || item.last.msn_type == 7)">[商品]</view>
						<view class="con line1" v-if="item.last &&  (item.last.msn_type == 5 || item.last.msn_type == 6)">[订单]</view>
					</view>
					<view class="right-box">
						<view class="time">{{item.last && item.last.create_time.split(' ')[1]}}</view>
						<view class="num" v-if="item.num>0">{{item.num}}</view>
					</view>
				</div>
			</block>
			<block v-if="list.length == 0">
				<emptyPage title="暂无数据~"></emptyPage>
			</block>
		</view>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
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
	import emptyPage from '@/components/emptyPage.vue'
	import authorize from '@/components/Authorize';
	import {
		serviceList,
		serviceUserList
	} from "@/api/user";
	import { mapGetters } from "vuex";
	export default {
		name: "CustomerList",
		components:{
			emptyPage,
			authorize
		},
		data() {
			return {
				list: [],
				productId: 0,
				orderId: "",
				type: 0 ,// 0 用户 1客服
				timer: null,
				page:1,
				limit:9999,
				mer_id: '',
				loading: false,
				clear: false,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
			};
		},
		computed: mapGetters(['isLogin','viewColor']),
		onLoad(optios) {
			this.type = optios.type;
			this.mer_id = optios.mer_id;
			if(this.isLogin){
				this.getList(this.mer_id)
			} else {
				this.isAuto = true;
				this.isShowAuth = true
			}
		},
		onShow(option) {
			if(this.isLogin){
				this.liveUpdate();
			} else {
				this.isAuto = true;
				this.isShowAuth = true
			}
		},
		onHide(){  
			if(this.timer) {  
				clearInterval(this.timer);  
				this.timer = null; 
			}   
			this.clear = true;
		},
		onUnload() {
			if(this.timer) {
				clearInterval(this.timer);  
				this.timer = null;  
			}  
			this.clear = true;
		},
		methods: {
			onLoadFun() {
				this.isShowAuth = false;
				this.getList(this.mer_id);
				this.liveUpdate();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			getList(mer_id) {		
				this.loading = true;
				if(this.type == 0){
					serviceList({
						page:this.page,
						limit:this.limit
					}).then(res => {
						this.list = res.data.list;
						if(res.status == 400){
							clearInterval(this.timer);
							this.timer = null; 
							return this.$util.Tips({
								title: res.message
							})
						}	
					}).finally(v=>{
						this.loading = false;
						return this.$util.Tips({
							title: v
						})
					}).catch(err => {
						return this.$util.Tips({
							title: err
						})
					});
				}else{
					serviceUserList(mer_id,{
						page:this.page,
						limit:this.limit
					}).then(res =>{
						this.list = res.data.list;
						if(res.status == 400){
							clearInterval(this.timer);
							this.timer = null; 
							return this.$util.Tips({
								title: res.message
							})
						}
					}).finally(v=>{
						this.loading = false;
						clearInterval(this.timer);
						this.timer = null; 
						return this.$util.Tips({
							title: v
						})
					}).catch(err => {
						clearInterval(this.timer);
						this.timer = null; 
						return this.$util.Tips({
							title: err
						})
					});
				}				
			},
			//实时刷新列表
			liveUpdate(){
				let that = this;
				this.clear = false;
				if(that.timer) {
					clearInterval(that.timer);
					that.timer = null;	
				}  
				that.timer = setInterval(function(){
					if(that.clear){
						clearInterval(that.timer);
						return ;
					}
					// 用户
					(!that.loading) && that.getList(that.mer_id);
				},5000);	
			},
			goPage(item) {
				item.num = 0;
				if(this.type == 0){
					uni.navigateTo({
						url: `/pages/chat/customer_list/chat?mer_id=${item.mer_id}`
					})
				}else{
					uni.navigateTo({
						url: `/pages/chat/customer_list/chat?userId=${item.user.uid}&mer_id=${item.mer_id}`
					})
				}
			}
		},
		changeTitle(e) {
			this.mer_id = e.detail.value.toString();
		},
	};
</script>
<style lang="scss">
	.CustomerList {
		.spin {
			display: block;
			transform: rotate(180deg);
			font-size: 36rpx;
		}
		.popupn{
			position: fixed;
			width: 100%;
			text-align: center;
			top: 0;
			left: 0;
			background: #ffffff;
			height: 90rpx;
			line-height: 90rpx;
			z-index: 100;
			.title{
				max-width: 560rpx;
				margin: 0 auto;
				position: relative;
			}
			.iconfont{
				display: inline-block;
				position: relative;
				top: 4rpx;
				right: 0;
			}
			.mer_logo{
				width: 34rpx;
				height: 34rpx;
				position: relative;
				top: 6rpx;
				right: 10px;			
			}
			.mer_name{
				display: inline-block;
				max-width: 650rpx;
			}
			.invoice-content{
				background-color: #ffffff;
			}
		}
		.list_count{
			margin-top: 104rpx;
		}
		.item {
			align-items: center;
			border-bottom: 1px solid #eee;
			padding: 20rpx 30rpx;
			background-color: #fff;
			.logo image{
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
			}
			.info{
				width: 334rpx;
				margin-left: 20rpx;
				.con{
					margin-top: 10rpx;
					color: #999999;
					font-size: 24rpx;
				}
			}
			.right-box{
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				font-size: 20rpx;
				color: #BBBBBB;
				.time{
					margin-bottom: 10rpx;
				}
				.num{
					min-width: 6px;
					background-color: var(--view-theme);
					border-radius: 15px;
					font-size: 10px;
					padding: 0 4px;
					font-size: 20rpx;
					color: #fff;
				}
			}
		}
	}
</style>
