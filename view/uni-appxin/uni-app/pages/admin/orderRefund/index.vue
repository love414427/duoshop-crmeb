<template>
	<view class="refund-wrapper" :style="viewColor">
		<view class="form-box">
			<view class="form-item item-txt">
				<text class="label">审核</text>
				<view class="picker acea-row">
					<view :class="status == 1 ? 'on' : ''" class="agree-count" @click="status = 1"><text class="icon-agree"></text>同意</view>
					<view :class="status == -1 ? 'on' : ''" class="agree-count" @click="status = -1"><text class="icon-agree"></text>拒绝</view>
				</view>
			</view>
		</view>
		<view v-if="status == 1" class="form-box">
			<view class="form-item item-txt">
				<text class="label">商品实际支付(元)</text>
				<view class="picker">
					{{orderInfo.total_price}}
				</view>
			</view>
			<view class="form-item item-txt">
				<text class="label">运费实际支付(元)</text>
				<view class="picker">
					{{orderInfo.total_postage}}
				</view>
			</view>
			<view class="form-item item-txt">
				<text class="label">商品购买数量(件)</text>
				<view class="picker">
					{{orderInfo.total_num}}
				</view>
			</view>
			<view class="form-item item-txt">
				<text class="label">申请退款金额(元)</text>
				<view class="picker">
					{{orderInfo.refund_price}}
				</view>
			</view>
			<view class="form-item item-txt">
				<text class="label">申请退款数量(件)</text>
				<view class="picker">
					{{orderInfo.refund_num}}
				</view>
			</view>
		</view>
		<view v-if="orderInfo.refund_type == 2 && status == 1" class="form-box">
			<view class="form-item item-txt">
				<text class="label">收货人</text>
				<view class="picker">
					<input style="text-align: right;" maxlength="10" class="p-color" type="text" placeholder="请输入姓名" v-model="refundInfo.mer_delivery_user">
				</view>
			</view>
			<view class="form-item item-txtarea">
				<text class="label">收货地址</text>
				<view class="txtarea"><textarea  v-model="refundInfo.mer_delivery_address" value="" placeholder="请输入地址" /></view>
			</view>
			<view class="form-item item-txt">
				<text class="label">手机号</text>
				<view class="picker">
					<input style="text-align: right;" class="p-color" type="text" placeholder="请输入手机号" v-model="refundInfo.phone">
				</view>
			</view>
		</view>
		<view v-if="status == -1" class="form-box">
			<view class="form-item item-txtarea">
				<text class="label">拒绝理由</text>
				<view class="txtarea"><textarea v-model="fail_message" value="" placeholder-class="coarea" placeholder="请填写拒绝退款的理由" /></view>
			</view>
		</view>
		<view class="confirm-btn">
			<view class="btn-box" @click="bindComfirm">确认提交</view>
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
	import { getRefundOrderInfo, refundOrderSubmit } from '@/api/admin.js'
	import { mapGetters } from "vuex";
	export default{
		components:{},
		computed: mapGetters(['viewColor']),
		data(){
			return {
				order_id:0,
				mer_id: 0,
				type: 0,
				isShowBox:false,
				refund_price:'',
				refund_order_id:'',//退款id
				status: '',
				order_status: false,
				status: 1,
				fail_message: '',
				refundInfo: {
					mer_delivery_user: '',
					mer_delivery_address: '',
					phone: '',
				},
				orderInfo: {}
			}
		},
		onLoad(options) {
			this.order_id = options.id
			this.mer_id = options.merId
			Promise.all([this.getOrderInfo()])
		},
		methods:{
			// 获取退款订单信息
			getOrderInfo(){
				let that = this;
				getRefundOrderInfo(that.mer_id, that.order_id).then(
					res => {
						that.orderInfo = res.data	
						that.refundInfo = res.data.refund_info
					},
					err => {
						that.$util.Tips({title: err});
					}
				);
			},
			// 提交
			async bindComfirm(){
				let that = this
				if(that.status == -1){
					if (!that.fail_message) {
						return that.$util.Tips({
							title: '请填写拒绝理由'
						})
					}
				}
				let params = {
					status: that.status,
					fail_message: that.fail_message
				}
				if(that.orderInfo.refund_type == 2){
					if (!that.refundInfo.mer_delivery_user) {
						return that.$util.Tips({
							title: '请填写收货人姓名'
						})
					}
					if (!that.refundInfo.mer_delivery_address) {
						return that.$util.Tips({
							title: '请填写收货地址'
						})
					}
					if (!that.refundInfo.phone) {
						return that.$util.Tips({
							title: '请填写手机号'
						})
					}else if(!(/^1[3456789]\d{9}$/.test(that.refundInfo.phone))){
						return that.$util.Tips({
							title: '请填写正确的手机号码'
						})
					}
					params.mer_delivery_user = that.refundInfo.mer_delivery_user
					params.mer_delivery_address = that.refundInfo.mer_delivery_address
					params.phone = that.refundInfo.phone
				}
				refundOrderSubmit(that.mer_id,that.order_id,params).then(
					res => {
						that.$util.Tips({title: res.message});
						setTimeout(res => {
							uni.redirectTo({
								url:`/pages/admin/orderList/index?types=6&merId=${that.mer_id}`
							})
						}, 1000)
					},
					err => {
						that.$util.Tips({title: err});
					}
				);
			},	
		}
	}
</script>

<style lang="scss">
	.refund-wrapper{		
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
					width: 500rpx;
					height: 100rpx;
					font-size: 30rpx;	
				}
				.coarea{
					color: #ccc;
				}
			}
			.icon-jiantou{
				margin-left: 10rpx;
				font-size: 28rpx;
				color: #BBBBBB;
			}
			.agree-count{
				margin-left: 30rpx;
				.icon-agree{
					display: inline-block;
					width: 24rpx;
					height: 24rpx;
					background: #CCCCCC;
					border-radius: 100%;
					position: relative;
					top: 2rpx;
					margin-right: 8rpx;
					&::after{
						content: "";
						display: inline-block;
						width: 8rpx;
						height: 8rpx;
						border-radius: 100%;
						background-color: #fff;
						position: absolute;
						top: 8rpx;
						left: 8rpx;
					}
				}
				&.on{
					.icon-agree{
						background: #2291F8;
					}
				}
			}
		}
		.confirm-btn{
			position: fixed;
			bottom: 0;
			padding: 20rpx 30rpx;
			background: #fff;
			width: 100%;
			.btn-box{
				width:100%;
				height:86rpx;
				line-height: 86rpx;
				text-align: center;
				color: #fff;
				background: #2291F8;
				border-radius:43rpx;
				font-size: 32rpx;
			}
		}	
	}
</style>