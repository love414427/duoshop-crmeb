<template>
	<view class="right-wrapper" @touchmove.stop.prevent="moveStop" :style="viewColor">
		<view class="control-wrapper animated" :class="showBox?'slideInRight':''">
			<view class="header">
				<view class="title">价格区间</view>
				<view class="input-wrapper">
					<input placeholder="最低价" v-model="min" type="number"/>
					<view class="line"></view>
					<input placeholder="最高价" v-model="max" type="number"/>
				</view>
			</view>
			<view class="content-box">
				<view class="title">品牌</view>
				<view class="brand-wrapper">
					<scroll-view :style="{'height':isShow?'90%':'250rpx'}" :scroll-y="isShow">
						<view class="wrapper">			
							<view class="item line1" v-for="(item,index) in list" :key="index" :class="item.check?'on':''" @tap="bindChenck(item)">
								{{item.brand_name}}
							</view>				
						</view>
					</scroll-view>
					<view class="btns" v-if="!isShow && list.length>9" @click="isShow = true">展开全部<text class="iconfont icon-xiangxia"></text></view>
					<view class="btns" v-if="isShow && list.length>9"  @click="isShow = false">收起<text class="iconfont icon-xiangshang"></text></view>
				</view>
				<view class="foot-btn">
					<view class="btn-item" @click="reset">重置</view>
					<view class="btn-item confirm" @click="confirm">确定</view>
				</view>
			</view>
		</view>
		<view class="right-bg" @click="close"></view>
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
	import { mapGetters } from "vuex";
	export default{
		props: {
			brandList: {
				type: Array,
			},
			status:{
				type:Boolean,
				default:false
			},
			price_on:{
				type:String,
				default:''
			},
			price_off:{
				type:String,
				default:''
			}
		},
		computed: mapGetters(['viewColor']),
		data(){
			return {
				min: '',
				max:'',
				is_trader: '',
				isShow:false,
				list:[],
				storeTypeList: [
					{name: '全部', value: '',check: true},
					{name: '自营', value: 'trader',check: false},
				],
				activeList:[],
				showBox:false
			}
		},
		mounted() {
			// 重要组件挂载后
			this.list = this.brandList
			this.showBox = this.status
			this.min = this.price_on
			this.max = this.price_off
		},
		methods:{	
			bindChenck(item){
				item.check = !item.check
				this.arrFilter()
			},	
			bindChenckType(item,index){
				
				this.storeTypeList = [
					{name: '全部', value: '',check: false},
					{name: '自营', value: 'trader',check: false},
				]
				this.storeTypeList[index]['check'] = true
				this.is_trader = this.storeTypeList[0]['check'] ? '' : 1
			}, 
			arrFilter(){
				this.activeList = this.list.filter(item=>{
					return item.check == true
				})
			},
			reset(){
				this.list.forEach((el,index)=>{
					el.check = false
				})
				this.storeTypeList = [
					{name: '全部', value: '',check: true},
					{name: '自营', value: 'trader',check: false}
				]
				this.min = this.max = ''
				this.arrFilter()
			},
			confirm(){
				this.arrFilter()
				console.log(this.activeList)
				let obj = {
					brandList:this.activeList,
					price_on:this.min,
					price_off:this.max,
					status:false,
					is_trader: this.is_trader
				}
				this.showBox = false
				this.$emit('confirm',obj)				
			},
			close(){
				// this.list.forEach((el,index)=>{
				// 	el.check = false
				// })
				// this.arrFilter()
				this.showBox = false
				this.$emit('close')
			},
			moveStop(){}
		}
	}
</script>

<style lang="scss">
	.slideInRight{
		animation-duration:.5s
	}
	.right-wrapper{
		z-index: 99;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		.control-wrapper{
			z-index: 90;
			position: absolute;
			right: 0;
			top: 0;
			display: flex;
			flex-direction: column;
			width: 635rpx;
			height: 100%;
			background-color: #F5F5F5;
			.header{
				padding: 50rpx 26rpx 40rpx;
				background-color: #fff;
				.title{
					font-size: 26rpx;
					font-weight: bold;
					color: #282828;
				}
				.input-wrapper{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 28rpx;
					input{
						width:260rpx;
						height:56rpx;
						padding: 0 10rpx;
						background:rgba(242,242,242,1);
						border-radius:28rpx;
						font-size: 22rpx;
						text-align: center;
					}
					.line{
						width:15rpx;
						height:2rpx;
						background:#7D7D7D;
					}
				}
			}
			.content-box{
				position: relative;
				flex: 1;
				display: flex;
				flex-direction: column;
				margin-top: 20rpx;
				padding: 0 26rpx;
				background-color: #fff;
				overflow: hidden;
				.title{
					padding: 40rpx 0 20rpx;
					font-size: 26rpx;
					font-weight: bold;
					color: #282828;
				}
				.brand-wrapper{
					flex: 1;
					overflow: hidden;
					.wrapper{
						display: flex;
						flex-wrap: wrap;
						padding-bottom: 20rpx;
					}
					.item{
						display: block;
						width:186rpx;
						height:56rpx;
						line-height: 56rpx;
						text-align: center;
						background:rgba(242,242,242,1);
						border-radius:28rpx;
						margin-top: 25rpx;
						padding: 0 10rpx;
						margin-right: 12rpx;
						&:nth-child(3n){
							margin-right: 0;
						}
						&.on{
							background: var(--view-minorColor);
							border:1px solid var(--view-theme);
							color: var(--view-theme);
						}
					}
					.btns{
						display: flex;
						align-items: center;
						justify-content: center;
						padding-top: 10rpx;
						font-size: 22rpx;
						color: #999;
						.iconfont{
							margin-left: 10rpx;
							margin-top: 5rpx;
							font-size: 20rpx;
						}
					}
				}
				.foot-btn{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-bottom: 30rpx;
					.btn-item{
						display: flex;
						align-items: center;
						justify-content: center;
						width:286rpx;
						height:68rpx;
						background:rgba(255,255,255,1);
						border:1px solid rgba(170,170,170,1);
						border-radius:34rpx;
						font-size: 26rpx;
						color: #282828;
						&.confirm{
							background: var(--view-theme);
							border-color: var(--view-theme);
							color: #fff;
						}
					}
				}
			}
			.store_type{
				position: relative;
				margin-top: 20rpx;
				padding: 0 26rpx;
				background-color: #fff;
				overflow: hidden;
			
				.title{
					padding: 40rpx 0 20rpx;
					font-size: 26rpx;
					font-weight: bold;
					color: #282828;
				}
				.brand-wrapper{
					overflow: hidden;
					.wrapper{
						display: flex;
						flex-wrap: wrap;
						padding-bottom: 20rpx;
					}
					.item{
						display: block;
						width:186rpx;
						height:56rpx;
						line-height: 56rpx;
						text-align: center;
						background:rgba(242,242,242,1);
						border-radius:28rpx;
						margin-top: 25rpx;
						padding: 0 10rpx;
						margin-right: 12rpx;
						&:nth-child(3n){
							margin-right: 0;
						}
						&.on{
							background: var(--view-minorColor);
							border:1px solid var(--view-theme);
							color: var(--view-theme);
						}
					}
					
				}
				
			}
		}
		.right-bg{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,.5);
		}
	}
</style>
