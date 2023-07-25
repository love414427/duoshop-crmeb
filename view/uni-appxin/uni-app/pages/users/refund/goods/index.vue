<template>
	<view class="refund-wrapper" :style="viewColor">
		<view class="item" v-for="(item,index) in productData" :key="index">
			<view class="img-box">
				<image :src="item.product.cart_info.product.image"></image>
			</view>
			<view class="info">
				<view class="name line1">{{item.product.cart_info.product.store_name}}</view>
				<view class="price" style="color: #868686;">{{item.product.cart_info.productAttr.sku}}</view>
			</view>
		</view>
		<view class="form-box">
			<view class="form-item item-txt">
				<text class="label">物流公司</text>
				<view class="picker" v-if="numArray.length>0">
					<picker @change="bindNumChange" :value="numIndex" :range="numArray" range-key="label">
						<view class="picker-box">
							{{numArray[numIndex]['label']}}
							<text class="iconfont icon-jiantou"></text>
						</view>
					</picker>
				</view>
			</view>
			<view class="form-item item-txt">
				<text class="label">物流单号</text>
				<input style="text-align: right;" type="text" placeholder="请输入物流单号" v-model="number">
			</view>
			<view class="form-item item-txt">
				<text class="label">联系电话</text>
				<input style="text-align: right;" type="text" placeholder="请输入电话" v-model="phone">
			</view>
			<!-- <view class="form-item item-txtarea">
				<text class="label">备注说明</text>
				<view class="txtarea"><textarea v-model="con" value="" placeholder="填写备注信息，100字以内" /></view>
			</view> -->
		</view>
		<view class="btn-box" @click="bindComfirm">提交</view>
		<alertBox :msg="msg" v-if="isShowBox" @bindClose="bindClose"></alertBox>
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
	import {refundDetail,expressList,refundBackGoods } from '@/api/order.js'
	import { checkPhone } from '@/utils/validate.js'
	import alertBox from '@/components/alert/index.vue'
	import { mapGetters } from "vuex";
	export default{
		components:{
			alertBox
		},
		data(){
			return {
				order_id:0,
				isShowBox:false,
				// 图片上传
				uploadImg:[],
				numArray:[],
				numIndex:0,
				//订单id
				id:'',
				productData:[],
				con:'',
				refund_price:'',
				msg:'',
				// 快递单号
				number:'',
				phone:''
			}
		},
		computed: {
			...mapGetters(['viewColor'])
		},
		onLoad(optios) {
			this.id = optios.id
			this.refund_type = optios.refund_type
			this.type = optios.type,
			this.order_id = optios.order_id
			Promise.all([this.refundProduct(),this.expressList()])
		},
		methods:{
			// 退款理由
			expressList(){
				expressList().then(res=>{
					this.numArray = res.data
				})
			},
			// 退款商品
			refundProduct(){
				refundDetail(this.id).then(({data})=>{
					this.productData = data.refundProduct
				})
			},
			// 下拉选中
			bindPickerChange(e){
				this.qsIndex = e.target.value
			},
			bindNumChange(e){
				this.numIndex = e.target.value
				this.refund_price = this.unitPrice*this.numArray[e.target.value]
			},
			// 删除图片
			deleteImg(index){
				this.uploadImg.splice(index,1)
			},
			/**
			 * 上传文件
			*/
			uploadpic: function () {
				if(this.uploadImg.length <9){
					let that = this;
					that.$util.uploadImageOne('upload/image', function (res) {
					  that.uploadImg.push(res.data.path);
						that.$set(that,'uploadImg',that.uploadImg);
					});
				}else{
					uni.showToast({
						title:'最多可上传9张',
						icon:'none'
					})
				}
			},
			// 提交
			async bindComfirm(){
				try {
					if(!this.number){
						uni.showToast({
							title:'请填写快递单号',
							icon:'none'
						})
						return
					}
					if(!checkPhone(this.phone)){
						uni.showToast({
							title:'请填写正确的手机号码',
							icon:'none'
						})
						return
					}
					const data = await refundBackGoods(this.id,{
						delivery_type:this.numArray[this.numIndex].label,
						delivery_id:this.number,
						delivery_phone:this.phone,
						ids:this.ids,
						delivery_mark:this.con,
						delivery_pics:this.uploadImg
					})
					this.msg = data.message
					this.isShowBox = true
				}catch(err){
					uni.showToast({
						title:err,
						icon:'none'
					})
				}
			},
			// 弹窗关闭
			bindClose(){
				this.isShowBox = false
				uni.redirectTo({
					url:'/pages/users/refund/detail?id='+this.id
				})
			}
		}
	}
</script>

<style lang="scss">
	.refund-wrapper{
		.item{
			position: relative;
			display: flex;
			padding: 25rpx 30rpx;
			background-color: #fff;
			&:after{
				content: ' ';
				position: absolute;
				right: 0;
				bottom: 0;
				width: 657rpx;
				height: 1px;
				background: #F0F0F0;
			}
			.img-box{
				width: 130rpx;
				height: 130rpx;
				image{
					width: 130rpx;
					height: 130rpx;
					border-radius:16rpx;
				}
			}
			.info{
				display: flex;
				flex-direction: column;
				width: 440rpx;
				margin-left: 26rpx;
				.tips{
					color: #868686;
					font-size: 20rpx;
				}
				.price{
					margin-top: 15rpx;
					font-size: 26rpx;
				}
			}
			.check-box{
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 1;
				.iconfont{
					font-size: 40rpx;
					color: #CCCCCC;
				}
				.icon-xuanzhong1{
					color: $theme-color;
				}
			}
		}
		.form-box{
			padding-left: 30rpx;
			margin-top: 18rpx;
			background-color: #fff;
			.form-item{
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #f0f0f0;
				font-size: 30rpx;
			}
			.item-txt{
				align-items: center;
				width: 100%;
				padding:30rpx 30rpx 30rpx 0;
				
			}
			.item-txtarea{
				padding:30rpx 30rpx 30rpx 0;
				textarea{
					display: block;
					width: 400rpx;
					height: 100rpx;
					font-size: 30rpx;
					text-align: right;
				}
			}
			.icon-jiantou{
				margin-left: 10rpx;
				font-size: 28rpx;
				color: #BBBBBB;
			}
		}
		.upload-box{
			padding: 30rpx;
			background-color: #fff;
			.title{
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 30rpx;
				.des{
					color: #BBBBBB;
				}
			}
			.upload-img{
				display: flex;
				flex-wrap: wrap;
				margin-top: 20rpx;
				.img-item{
					position: relative;
					width: 156rpx;
					height: 156rpx;
					margin-right: 24rpx;
					margin-top: 20rpx;
					image{
						width: 156rpx;
						height: 156rpx;
						border-radius: 8rpx;
					}
					.iconfont{
						position: absolute;
						right: -15rpx;
						top: -20rpx;
						font-size: 40rpx;
						color: $theme-color;
					}
				}
				.add-img{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 156rpx;
					height: 156rpx;
					margin-top: 20rpx;
					border: 1px solid #DDDDDD;
					border-radius: 3rpx;
					color: #BBBBBB;
					font-size: 24rpx;
					.iconfont{
						margin-bottom: 10rpx;
						font-size: 50rpx;
					}
				}
			}
		}
		.btn-box{
			width:690rpx;
			height:86rpx;
			margin: 70rpx auto;
			line-height: 86rpx;
			text-align: center;
			color: #fff;
			background:var(--view-theme);
			border-radius:43rpx;
			font-size: 32rpx;
		}
	}
</style>
