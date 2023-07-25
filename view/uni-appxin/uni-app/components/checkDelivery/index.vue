<template>
	<view :style="viewColor">
		<!-- 选择送货方式 -->
		<view class="mask-box">
			<view class="bg" v-if="isShowBox"></view>
			<view class="mask-content animated" :class="{slideInUp:isShowBox}">
				<view class="title-bar">
					配送方式
					<view class="close" @click="closeShowBox"><text class="iconfont icon-guanbi"></text></view>
				</view>
				<view class="box">
					<view class="check-item" v-for="(item,index) in radioList" :key="index" :class="{on:index == radioIndex}">
						<view>{{item.title}}</view>
						<view class="radio" @click="bindCheck(item,index)"> 
							<block v-if="index == newData.order.isTake">
								<view class="iconfont icon-xuanzhong1"></view>
							</block>
							<block v-else>
								<view class="iconfont icon-weixuanzhong"></view>
							</block>
						</view>
					</view>
				</view>
				<view class="foot">
					<view class="btn" @click="confirmBtn">确定</view>
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
	import { mapGetters } from "vuex";
	export default{
		name:'checkDelivery',
		props:{
			isShowBox:{
				type:Boolean,
				default:false
			},
			activeObj:{
				type:Object,
				default:function(){
					return {}
				}
			},
			deliveryName:{
				type:String,
				default:'快递配送'
			},
			radioList:{
				type:Array,
				default: [
					{
						title:'快递配送',
						check:true
					},
					{
						title:'到店核销',
						check:false
					}
				],
			},
		},
		computed: mapGetters(['viewColor']),
		data(){
			return {
				radioIndex:0,
				oldRadioIndex:'', //旧的索引
				newData:{}
			}
		},
		created() {
			this.newData = JSON.parse(JSON.stringify(this.activeObj))
		},
		methods:{
			// 关闭配送方式弹窗
			closeShowBox(){
				this.$emit('close')
			},
			// 选择配送方式
			bindCheck(item,index){
				this.newData.order.isTake = index
			},
			confirmBtn(){
				this.$emit('confirmBtn',this.newData)
			}
		}
	}
</script>

<style lang="scss">
	.mask-box{
		.bg{
			z-index: 30;
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.5);
		}
		.mask-content{
			z-index: 40;
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			background-color: #fff;
			border-radius: 16rpx 16rpx 0 0;
			transform: translate3d(0, 100%, 0);
			transition: all .3s cubic-bezier(.25, .5, .5, .9);
			.title-bar{
				position: relative;
				text-align: center;
				padding: 30rpx 0;
				margin-bottom: 20rpx;
				font-size: 32rpx;
				color: #282828;
				.close{
					position: absolute;
					right: 30rpx;
					top: 50%;
					transform: translateY(-50%);
					.iconfont{
						color: #8A8A8A;
					}
				}
			}
			.box{
				padding: 0 30rpx;
				.check-item{
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 40rpx;
					margin-bottom: 50rpx;
					font-size: 28rpx;
					.iconfont{
						font-size: 38rpx;
						color: #CCCCCC;
						&.icon-xuanzhong1{
							color: var(--view-theme);
						}
					}
				}
			}
			.foot{
				padding: 20rpx 30rpx;
				padding-bottom: calc(20rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
				padding-bottom: calc(20rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
				border-top: 1px solid #F5F5F5;
				.btn{
					width: 100%;
					height: 70rpx;
					line-height: 70rpx;
					text-align: center;
					border-radius: 35rpx;
					color: #fff;
					font-size: 30rpx;
					background: var(--view-theme);
				}
			}
		}	
	}
	.animated {
		animation-duration: .3s
	}
</style>
