<template>
  <view>
    <view class="priceChange" :class="change === true ? 'on' : ''">
      <view class="priceTitle">
        {{ status == 0 ? "一键改价" :  status == 1  ?   "订单备注" : "立即退款" }}
        <span class="iconfont icon-guanbi" @click="close"></span>
      </view>
     <view class="listChange" v-if="status == 0">
        <view class="item acea-row row-between-wrapper">
          <view>商品总价(¥)</view>
          <view class="money">
			<input
			  type="digit"
			  class="color_black"
			  v-model="orderInfo.total_price"
			  @input="setValue"
			/>
          </view>
        </view>
        <view class="item acea-row row-between-wrapper">
          <view>实际支付邮费(¥)</view>
          <view class="money">
			<input
			  type="digit"
			  class="color_black"
			  v-model="orderInfo.pay_postage"
			  @input="setValue"
			  
			/>
          </view>
        </view>
        <view
          class="item acea-row row-between-wrapper"
        >
          <view>实际支付金额(¥)</view>
          <view class="money">
			{{ Number(orderInfo.total_price) + Number(orderInfo.pay_postage) - Number(orderInfo.coupon_price) - Number(orderInfo.integral_price)- Number(orderInfo.svip_discount)}}<span class="iconfont icon-suozi"></span>
          </view>
        </view>
		<view v-if="orderInfo.coupon_price>0 || orderInfo.svip_discount>0" class="item acea-row row-between-wrapper">
		  <view>优惠金额(¥)</view>
		  <view class="money">
			{{ Number(orderInfo.coupon_price) + Number(orderInfo.svip_discount) }}<span class="iconfont icon-suozi"></span>
		  </view>  
		</view>
		<view v-if="orderInfo.integral_price>0" class="item acea-row row-between-wrapper">
		  <view>积分抵扣(¥)</view>
		  <view class="money">
			{{ orderInfo.integral_price }}<span class="iconfont icon-suozi"></span>
		  </view>  
		</view>
      </view>
      <view class="listChange" v-else>
        <textarea
          :placeholder="orderInfo.remark ? orderInfo.remark : '请填写备注信息...'"
          v-model="remark"
        ></textarea>
      </view>
      <view class="modify" @click="save">
        {{
          status == 0 ? "立即修改" : "确认提交"
        }}
      </view>

    </view>
    <view class="mask" @touchmove.prevent v-show="change === true"></view>
  </view>
</template>
<style>
.priceChange{position:fixed;width:580upx;background-color:#fff;border-radius:10upx;top:50%;left:50%;margin-left:-290upx;margin-top:-335upx;z-index:666;transition:all 0.3s ease-in-out 0s;transform: scale(0);opacity:0;}
.priceChange.on{opacity:1;transform: scale(1);}
.priceChange .priceTitle{background:url("~@/static/images/pricetitle.jpg") no-repeat;background-size:100% 100%;width:100%;height:160upx;border-radius:10upx 10upx 0 0;text-align:center;font-size:40upx;color:#fff;line-height:160upx;position:relative;}
.priceChange .priceTitle .iconfont{position:absolute;font-size:40upx;right:26upx;top:23upx;width:40upx;height:40upx;line-height:40upx;}
.priceChange .listChange{padding:0 40upx;}
.priceChange .listChange textarea{box-sizing: border-box;}
.priceChange .listChange .item{height:103upx;border-bottom:1px solid #e3e3e3;font-size:32upx;color:#333;}
.priceChange .listChange .item .money{color:#666;width:200upx;text-align:right;}
.priceChange .listChange .item .money .color_black{color: #333;}
.priceChange .listChange .item .money .iconfont{font-size:32upx;margin-left:20upx;}
.priceChange .listChange .item .money input{width:100%;height:100%;text-align:right;color:#ccc;}
.priceChange .listChange .item .money input.on{color:#666;}
.priceChange .modify{font-size:32upx;color:#fff;width:490upx;height:90upx;text-align:center;line-height:90upx;border-radius:45upx;background-color:#2291f8;margin:53upx auto;}
.priceChange .modify1{font-size:32upx;color:#312b2b;width:490upx;height:90upx;text-align:center;line-height:90upx;border-radius:45upx;background-color:#eee;margin:30upx auto 0 auto;}
.priceChange .listChange textarea {
  border: 1px solid #eee;
  width: 100%;
  height: 200upx;
  margin-top: 50upx;
  border-radius: 10upx;
  color: #333;
  padding: 20upx;
}
</style>
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
export default {
  name: "PriceChange",
  components: {},
  props: {
    change: Boolean,
    orderInfo: Object,
    status: String
  },
  data: function() {
    return {
      focus: false,
      price: 0,
			actual_price: 0,
      refund_price: 0,
      remark: ""
    };
  },
  watch: {
    orderInfo: function(nVal) {
      this.price = this.orderInfo.pay_price;
			this.actual_price = this.orderInfo.total_price + this.orderInfo.pay_postage - this.orderInfo.coupon_price
      this.refund_price = this.orderInfo.pay_price;
      this.remark = this.orderInfo.remark;
    }
  },
  mounted: function() {
	  
	},
  methods: {
    priceChange: function() {
      this.focus = true;
    },
    close: function() {
      this.price = this.orderInfo.pay_price;
      this.$emit("closechange", false);
    },
		setValue: function(){
			this.price = this.orderInfo.total_price + this.orderInfo.pay_postage - this.orderInfo.coupon_price
		},
		save: function() {
			let that = this;
			that.$emit("savePrice", {
				price: that.price,
				refund_price: that.refund_price,
				type: 1,
				remark: that.remark,
				orderInfo: that.orderInfo
			});
		},
		refuse: function() {
			let that = this;
			that.$emit("savePrice", {
				price: that.price,
				refund_price: that.refund_price,
				type: 2,
				remark: that.remark
			});
		}
	}
};
</script>
