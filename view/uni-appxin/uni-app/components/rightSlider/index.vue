
<template>
	<view class="right-wrapper" @touchmove.stop.prevent="moveStop" :style="viewColor">
		<view class="control-wrapper animated" :class="showBox?'slideInRight':''">			
			<view class="content-box">
				<view class="title">店铺类型</view>
				<view class="brand-wrapper">
					<scroll-view style="max-height: 400rpx;" :scroll-y="isShow">
						<view class="wrapper">	
							<view class="item line1" v-for="(item,index) in list" :key="index" :class="item.check?'on':''" @tap="bindChenck1(item)">
								{{item.type_name}}
							</view>				
						</view>
					</scroll-view>
					<view class="btns" v-if="!isShow && list.length>9" @click="isShow = true">展开全部<text class="iconfont icon-xiangxia"></text></view>
					<view class="btns" v-if="isShow && list.length>9"  @click="isShow = false">收起<text class="iconfont icon-xiangshang"></text></view>
				</view>
				<view class="title">商户分类</view>
				<view class="brand-wrapper">
					<scroll-view style="max-height: 400rpx;" :scroll-y="isShow">
						<view class="wrapper">			
							<view class="item line1" v-for="(item,index) in merCate" :key="index" :class="item.check?'on':''" @tap="bindChenck2(item)">
								{{item.category_name}}
							</view>				
						</view>
					</scroll-view>
					<view class="btns" v-if="!isShow && merCate.length>9" @click="isShow = true">展开全部<text class="iconfont icon-xiangxia"></text></view>
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
			storeTypeArr: { //店铺类型
				type: Array,
			},
			merList: { //商户分类
				type: Array,
			},
			status:{
				type:Boolean,
				default:false
			},
		},
		computed: mapGetters(['viewColor']),
		data(){
			return {
				min: '',
				max:'',
				isShow:false,
				list:[],
				merCate: [],
				activeList:[],
				selectList: [],
				showBox:false
			}
		},
		mounted() {
			// 重要组件挂载后
			this.list = this.storeTypeArr //店铺类型
			this.merCate = this.merList //商户分类
			this.showBox = this.status
		},
		methods:{	
			bindChenck1(item){
				item.check = !item.check
				this.arrFilter1()
			},
			bindChenck2(item){
				item.check = !item.check
				this.arrFilter2()
			},
			arrFilter1(){
				this.selectList = this.list.filter(item=>{
					return item.check == true
				})
			},
			arrFilter2(){
				this.activeList = this.merCate.filter(item=>{
					return item.check == true
				})
			},
			reset(){
				this.list.forEach((el,index)=>{
					el.check = false
				})
				this.merCate.forEach((el,index)=>{
					el.check = false
				})
				this.arrFilter1()
				this.arrFilter2()
			},
			confirm(){
				this.arrFilter1()
				this.arrFilter2()
				console.log(this.activeList)
				let obj = {
					storeTypeArr:this.selectList,
					merList: this.activeList,
					status:false
				}
				this.showBox = false
				this.$emit('confirm',obj)				
			},
			close(){
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
					// flex: 1;
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
					position: absolute;
					// width: 100%;
					// text-align: center;
					bottom: 30rpx;
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
							margin-left: 20rpx;
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
