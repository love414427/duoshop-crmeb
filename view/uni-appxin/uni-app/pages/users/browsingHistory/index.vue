<template>
	<view class="page-wrapper history" :style="viewColor">
		<view class="history_count">
			<block v-if="list.length>0">
				<view class="history_header acea-row">
					<text>共{{total}}条</text>
					<view class="text" @click.stop="handleEdit">{{isEdit ? '完成' : '管理'}}</view>				
				</view>
				<view class="list" v-for="(item,index) in list">
					<view class="item_time">
						<view v-if="isEdit" class="checkbox" @click="historyAllCheck(item,index)">
							<text v-if="!item.allCheck" class="iconfont icon-weixuanzhong"></text>
							<text v-else class="iconfont icon-xuanzhong1"></text>
						</view>
						<view>{{item.date}}</view>
					</view>
					<view class="item_main acea-row">
						<view class="item acea-row" :class="{gary :(itemn.spu && itemn.spu.status ==1) }" v-for="(itemn,indexn) in item.list" v-if="itemn.spu">
							<view v-if="isEdit" class="item item_count" @click="historyCheck(itemn,indexn)">
								<!-- <image :src="itemn.spu.image" mode=""></image> -->
								<view  class="checkbox">
									<text v-if="!itemn.check" class="iconfont icon-weixuanzhong"></text>
									<text v-else class="iconfont icon-xuanzhong1"></text>
								</view>
								<easy-loadimage class="easy-img" mode="widthFix" :image-src="itemn.spu.image"></easy-loadimage>
								<view class="info">
									<view class="msg">
										<block v-if="itemn.spu && itemn.spu.status == 1">
											<view class="price"><text>￥</text>{{itemn.spu.price}}</view>
										</block>
										<block v-else>
											<view class="tips">该商品已下架</view>
										</block>
									</view>
								</view>
							</view>			
							<view v-else class="item item_count" @click="goPage(itemn)" >
								<easy-loadimage class="easy-img" mode="widthFix" :image-src="itemn.spu.image"></easy-loadimage>
								<view class="info">
									<view class="msg">
										<block v-if="itemn.spu && itemn.spu.status == 1">
											<view class="price"><text>￥</text>{{itemn.spu.price}}</view>
										</block>
										<block v-else>
											<view class="tips">该商品已下架</view>
										</block>
									</view>
								</view>
							</view>			
						</view>
					</view>			
				</view>
			</block>
			<block v-else>
				<emptyPage title="暂无浏览记录~"></emptyPage>
			</block>
		</view>
		<view class='footer acea-row row-between-wrapper' v-if="isEdit">
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
						<button class='bnt collect_btn' formType="submit">收藏</button>
					</form>
				</view>
				<view class='button acea-row row-middle'>
					<form @submit="subDel('batch')" report-submit='true'>
						<button class='bnt delete_btn' formType="submit">删除</button>
					</form>
				</view>
			</view>
		</view>
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
	import emptyPage from '@/components/emptyPage.vue'
	import { historyList, historyDelete, historyBatchDelete, historyBatchCollect } from '@/api/user.js'
	import { goShopDetail } from '@/libs/order.js'
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';
	import { mapGetters } from "vuex";
	export default{
		components:{
			emptyPage,
			easyLoadimage
		},
		computed: mapGetters(['viewColor']),
		data(){
			return {
				list:[],
				isScroll:true,
				page:1,
				limit:50,
				isAllSelect: false,
				isEdit: false,
				allArr: [],
				total: 0
			}
		},
		onShow() {
			this.list = [];
			this.allArr = [];
			this.isScroll = true;
			this.page = 1;
			this.getList();
			this.isAllSelect = false; 
			this.isEdit = false;
		},
		methods:{
			getList(){
				// if(!this.isScroll) return
				let that = this
				historyList({
					page:that.page,
					limit:that.limit
				}).then(({data})=>{
					that.total = data.count
					if(!data.list) return ;
					data.list.forEach((item, index) => {
						item.check = false
					})
					that.isScroll = data.list.length>=that.limit					
					that.page+=1					
					that.list = that.list.concat(data.list)
					that.listFilter(that.list)
				})
			},
			// 数据结构重组
			listFilter(arr){
				arr.forEach((item,index)=>{
					if(!item.allCheck){
						this.$set(item,'allCheck',false)
					}
					item.list.forEach((itemn,indexn)=>{
						if(!itemn.check){
							this.$set(itemn,'check',false)
						}
					})
				})
				if(this.isAllSelect){this.cartAllCheck('allCheck')}
			},
			// 全选
			checkboxAllChange() {
				this.isAllSelect = !this.isAllSelect
				this.cartAllCheck('allCheck')
			},
			handleEdit(){
				this.isEdit = !this.isEdit;
			},
			// 商品选中
			historyCheck(item) {
				item.check = !item.check
				this.cartAllCheck('goodsCheck')
			},
			// 删除
			subDel: function(type) {
				let that = this	
				let type_id
				let content = (type == 'empty') ? '确定清空浏览记录？' : '确定删除浏览记录？'
				if(type == 'batch'){
					type_id = []
					that.list.forEach(item=>{
						item.list.forEach(el=>{
							if(el.check){
								type_id.push(el.user_history_id)
							}
						})
						
					})
				}else{
					type_id = 1
				}
				if(type_id.length == 0 && type == 'batch'){
					return that.$util.Tips({
						title: '请选择记录'
					});
				}else{
					uni.showModal({
						title: '提示',
						 content: content,
						 success: function (res) {
						if (res.confirm) {							
							historyBatchDelete({
								history_id:type_id,						
							}).then(res=>{
								that.allArr = [];
								that.page = 1;
								that.list = [];
								that.isEdit = false;
								that.isScroll = true;
								that.getList();
								return that.$util.Tips({
									title: res.message,
									icon: 'success'
								});							
								}).catch(err => {
									return that.$util.Tips({
										title: err
									});							
								});  
							}else if (res.cancel) {
								return that.$util.Tips({
									title: '已取消'
								});
							}							 					     	    				     	 					        
						}   
					});                          					
				}
			},
			subCollect(){
				let that = this, type_id = []
				that.list.forEach(item=>{
					item.list.forEach(el=>{
						if(el.check){
							type_id.push(el.spu.spu_id)
						}
					})
				})
				historyBatchCollect({
					type_id:type_id,
					type: 1						
				}).then(res=>{
					that.allArr = [];
					that.page = 1;
					that.list = [];
					that.isEdit = false;
					that.isScroll = true;
					that.isAllSelect = false;
					that.getList();
					return that.$util.Tips({
						title: res.message,
						icon: 'success'
					});							
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});							
				});  
			},
			// 商铺全选
			historyAllCheck(item, index) {
				// 店铺取消
				if (item.allCheck) {
					item.allCheck = false
					item.list.forEach((el, i) => {
						el.check = false
					})
				} else {
					item.allCheck = true
					item.list.forEach((el, i) => {
						el.check = true
					})
				}
				this.cartAllCheck('goodsCheck')
			},
			// 删除
			bindDelete(item,index){
				historyDelete(item.user_history_id).then(res=>{
					this.list.splice(index,1)
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}).catch(error=>{
					uni.showToast({
						title:error,
						icon:'none'
					})
				})
			},
			goPage(item){
				goShopDetail(item.spu).then(res => {
					uni.navigateTo({
						url:`/pages/goods_details/index?id=${item.spu.product_id}`
					})
				})
				
			},
			// 全选判断
			cartAllCheck(type) {
				let allArr = [];
				this.list.forEach((el, index) => {
					if (type == 'goodsCheck') {
						let tempArr = el.list.filter(item => {
							return item.check == true
						})
						if (el.list.length == tempArr.length) {
							el.allCheck = true
							allArr.push(el)
						} else {
							el.allCheck = false
						}
					} else {
						el.list.forEach((item) => {
							item.check = this.isAllSelect
						})
						el.allCheck = this.isAllSelect
						if (el.allCheck) allArr.push(el)
					}					
				})
				// 全选
				this.isAllSelect = allArr.length == this.list.length ? true : false
			},
		},			
		onReachBottom() {
			this.getList()
		},
		// 滚动监听
		onPageScroll(e) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			uni.$emit('scroll');
		}
	}
</script>

<style lang="scss">
page{background: #ffffff;}
.history{
	margin-bottom: 96rpx;
	.history_count{
		padding: 0 30rpx 0;
		padding: 0 30rpx calc(0rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		padding: 0 30rpx calc(0rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
	}
	.history_header{
		justify-content: space-between;
		margin: 30rpx 0;
		text{
			font-size: 26rpx;
			color: #666666;
		}
		.text{
			color: var(--view-theme);
		}
	}
	.list{
		margin-top: 20rpx;
		.item_time{
			font-size: 36rpx;
			color: #282828;
			font-weight: bold;
			display: flex;
			align-items: center;
		}
		.item_main{
			margin-top: 30rpx;
		}
	}
	.item{
		width: 217rpx;
		border-radius: 16rpx;
		margin: 0 20rpx 20rpx 0;
		position: relative;
		&:nth-child(3n){
			margin-right: 0;
		}
		/deep/image,/deep/.easy-loadimage,uni-image{
			width: 217rpx;
			height: 217rpx;
			border-radius: 16rpx;
		}
		.info{
			margin-top: 20rpx;
			color: var(--view-priceColor);
			font-size: 24rpx;
		}
	}
}
/deep/.loadfail-img, .easy-img{
	width: 217rpx;
	height: 217rpx;
	border-radius: 16rpx;
	display: block;
}
.item_time .checkbox .iconfont{
	font-size: 38rpx;
	color: #999999;
	margin-right: 10rpx;
	&.icon-xuanzhong1{
	    color: var(--view-theme);
	}
}
.item_main .checkbox .iconfont{
	font-size: 40rpx;
	color: #DEDEDE;
	position: absolute;
	right: 12rpx;
	top: 12rpx;
	z-index: 10;
	border-radius: 100%;
	&.icon-weixuanzhong{
		&::after{
			content: "";
			display: block;
			width: 36rpx;
			height: 36rpx;
			background: rgba(0,0,0,.38);
			position: absolute;
			top: 2rpx;
			left: 2rpx;
			border-radius: 100%;
			border: 1px solid #DEDEDE;
		}
	}
}
.history .item .icon-xuanzhong1{
	color: var(--view-theme);
}
.history .footer {
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
.history .footer .checkAll {
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
.history .footer .button .bnt {
	font-size: 28rpx;
	color: #999;
	border-radius: 50rpx;
	border: 1px solid #999;
	width: 160rpx;
	height: 60rpx;
	text-align: center;
	line-height: 60rpx;
	&.collect_btn{
		color: var(--view-theme);
		border-color: var(--view-theme);
	}
}
	
</style>
