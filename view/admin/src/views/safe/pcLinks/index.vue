<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <div class="goodsTitle acea-row">
            <div class="title">页面信息</div>
          </div>
        </div>
      </div>
      <div>
        <span class="spBlock spTitle mb10">全部商品</span>
        <span class="spBlock">地址：<i>/goods_cate</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">店铺街</span>
        <span class="spBlock">地址：<i>/shop_street</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">秒杀列表</span>
        <span class="spBlock">地址：<i>/goods_seckill</i></span>
        <el-divider />
      </div>


      <div>
        <span class="spBlock spTitle mb10">热门榜单/ 精品推荐/ 首发新品/促销单品</span>
        <span class="spBlock mb5">地址：<i>/goods_list</i></span>
        <span class="spBlock mb5">参数：<i>type: 区分列表：best为精品推荐、hot为热门榜单、new为首发新品、good为促销单品</i></span>
        <span class="spBlock spEx">例如：<i>/goods_list?type=best</i></span>
        <el-divider></el-divider>
      </div>
      <div>
        <span class="spBlock spTitle mb10">商品详情</span>
        <span class="spBlock">地址：<i>/goods_detail</i></span>
        <span class="spBlock mb5">参数：<i>id: 商品id</i></span>
        <span class="spBlock spEx">例如：<i>/goods_detail/982</i></span>
        <el-divider />
      </div>

      <div>
        <span class="spBlock spTitle mb10">秒杀商品详情</span>
        <span class="spBlock">地址：<i>/goods_seckill_detail</i></span>
        <span class="spBlock mb5">参数：<i>id: 商品id； time: 秒杀结束时间</i></span>
        <span class="spBlock spEx">例如：<i>/goods_seckill_detail/1097?time=1620626400</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">店铺首页</span>
        <span class="spBlock">地址：<i>/store</i></span>
        <span class="spBlock mb5">参数：<i>id: 店铺id</i></span>
        <span class="spBlock spEx">例如：<i>/store?id=128</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">店铺全部分类</span>
        <span class="spBlock">地址：<i>/store/category</i></span>
        <span class="spBlock mb5">参数：<i>id: 店铺id</i></span>
        <span class="spBlock spEx">例如：<i>/store/category?id=128</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">店铺优惠券</span>
        <span class="spBlock">地址：<i>/store/storeCoupon</i></span>
        <span class="spBlock mb5">参数：<i>id: 店铺id</i></span>
        <span class="spBlock spEx">例如：<i>/store/storeCoupon?id=128</i></span>
        <el-divider />
      </div>

      <div>
        <span class="spBlock spTitle mb10">账户管理</span>
        <span class="spBlock mb5">地址：<i>/user?type=0</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">我的订单</span>
        <span class="spBlock mb5">地址：<i>/user/order_list?type=1</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">售后/退款</span>
        <span class="spBlock mb5">地址：<i>/user/refund_list?type=2</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">退货详情</span>
        <span class="spBlock mb5">地址：<i>/refund_detail</i></span>
        <span class="spBlock mb5">参数：<i>id：退款列表id</i></span>
        <span class="spBlock spEx">例如：<i>/refund_detail?id=609</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">我的余额</span>
        <span class="spBlock mb5">地址：<i>/user/balance?type=0</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">我的收藏</span>
        <span class="spBlock mb5">地址：<i>/user/collect?type=4</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">地址管理</span>
        <span class="spBlock mb5">地址：<i>/user/address_list?type=5</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">我的优惠券</span>
        <span class="spBlock mb5">地址：<i>/user/my_coupon?type=6</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">入驻记录</span>
        <span class="spBlock mb5">地址：<i>/user/settle_record?type=7</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">商户入驻</span>
        <span class="spBlock mb5">地址：<i>/merchant_settled</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">购物车</span>
        <span class="spBlock">地址：<i>/shopping_cart</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">订单详情</span>
        <span class="spBlock mb5">地址：<i>/order_detail</i></span>
        <span class="spBlock mb5">参数：<i>orderId：订单id</i></span>
        <span class="spBlock spEx">例如：<i>/order_detail?orderId=3060</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">订单详情(待付款)</span>
        <span class="spBlock mb5">地址：<i>/order_stay_detail</i></span>
        <span class="spBlock mb5">参数：<i>orderId：订单id</i></span>
        <span class="spBlock spEx">例如：<i>/order_stay_detail?orderId=2993</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">查看物流</span>
        <span class="spBlock mb5">地址：<i>/logistics</i></span>
        <span class="spBlock mb5">参数：<i>orderId：订单id</i></span>
        <span class="spBlock spEx">例如：<i>/logistics?orderId=3055</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">提交订单</span>
        <span class="spBlock mb5">地址：<i>/order_confirm</i></span>
        <span class="spBlock mb5">参数：<i>new：1, cartId: 购物车编号</i></span>
        <span class="spBlock spEx">例如：<i>/order_confirm?new=1&cartId=6472</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">支付页面</span>
        <span class="spBlock mb5">地址：<i>/payment</i></span>
        <span class="spBlock mb5">参数：<i>result: 订单id</i></span>
        <span class="spBlock spEx">例如：<i>/payment?result=2997</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">订单评价</span>
        <span class="spBlock">地址：<i>/evaluation</i></span>
        <span class="spBlock mb5">参数：<i>unique：产品属性的唯一值；order_id：订单id</i></span>
        <span class="spBlock spEx">例如：<i>/evaluation?unique=3067&order_id=3037</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">退款选择服务类型</span>
        <span class="spBlock mb5">地址：<i>/user/refund_select</i></span>
        <span class="spBlock mb5">参数：<i>order_id：订单号 type：2为批量退款 1为退款</i></span>
        <span class="spBlock spEx">例如：<i>/user/refund_select?orderId=3057&type=2</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">批量退款</span>
        <span class="spBlock mb5">地址：<i>/refund</i></span>
        <span class="spBlock mb5">参数：<i> order_id：订单号,  type：2为批量退款 1为退款,  refund_type：1为退款 2为退货退款</i></span>
        <span class="spBlock spEx">例如：<i>/refund?orderId=3060&refund_type=1&type=2</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">申请退款</span>
        <span class="spBlock mb5">地址：<i>refund_confirm</i></span>
        <span class="spBlock mb5">参数：<i> order_id：订单号,  type：2为批量退款 1为退款,  refund_type：1为退款 2为退货退款,  ids：商品id</i></span>
        <span class="spBlock spEx">例如：<i>/refund_confirm?ids=65&refund_type=1&type=2&order_id=63</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">搜索商品</span>
        <span class="spBlock">地址：<i>/goods_search</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">搜索商品列表</span>
        <span class="spBlock mb5">地址：<i>/goods_search</i></span>
        <span class="spBlock mb5">参数：<i>title：搜索的参数</i></span>
        <span class="spBlock spEx">例如：<i>/goods_search?title=鲜花</i></span>
        <el-divider />
      </div>
      <div>
        <span class="spBlock spTitle mb10">申请退款</span>
        <span class="spBlock mb5">地址：<i>/users/refund/confirm</i></span>
        <span class="spBlock mb5">参数：<i> order_id：订单号,  type：2为批量退款 1为退款,  refund_type：1为退款 2为退货退款,  ids：商品id</i></span>
        <span class="spBlock spEx">例如：<i>/users/refund/confirm?ids=65&refund_type=1&type=2&order_id=63</i></span>
        <el-divider />
      </div>

      <div>
        <span class="spBlock spTitle mb10">退货物流信息</span>
        <span class="spBlock mb5">地址：<i>/refund_logistics</i></span>
        <span class="spBlock mb5">参数：<i>orderId：退款订单id</i></span>
        <span class="spBlock spEx">例如：<i>/refund_logistics?orderId=7</i></span>
        <el-divider></el-divider>
      </div>
      <div>
        <span class="spBlock spTitle mb10">申请退货</span>
        <span class="spBlock mb5">地址：<i>/refund_goods</i></span>
        <span class="spBlock mb5">参数：<i>orderId：订单号</i></span>
        <span class="spBlock spEx">例如：<i>/refund_goods?orderId=110</i></span>
        <el-divider></el-divider>
      </div>
      <div>
        <span class="spBlock spTitle mb10">更多店铺</span>
        <span class="spBlock mb5">地址：<i>/shop_more</i></span>
        <el-divider></el-divider>
      </div>
      <div>
        <span class="spBlock spTitle mb10">资讯信息</span>
        <span class="spBlock mb5">地址：<i>/news_list</i></span>
        <el-divider></el-divider>
      </div>
      <div>
        <span class="spBlock spTitle mb10">资讯详情</span>
        <span class="spBlock mb5">地址：<i>/news_detail</i></span>
        <span class="spBlock mb5">参数：<i>id: 资讯id</i></span>
        <span class="spBlock spEx">例如：<i>/news_detail/249</i></span>
        <el-divider></el-divider>
      </div>
      <div>
        <span class="spBlock spTitle mb10">预售商品列表</span>
        <span class="spBlock mb5">地址：<i>/goods_presell</i></span>
        <el-divider></el-divider>
      </div>
      <div>
        <span class="spBlock spTitle mb10">预售商品详情</span>
        <span class="spBlock mb5">地址：<i>/goods_presell_detail</i></span>
        <span class="spBlock mb5">参数：<i>id: 预售商品id</i></span>
        <span class="spBlock spEx">例如：<i>/goods_presell_detail/330</i></span>
        <el-divider></el-divider>
      </div>
      <div>
        <span class="spBlock spTitle mb10">预售订单</span>
        <span class="spBlock mb5">地址：<i>/user/presell_order</i></span>
        <el-divider></el-divider>
      </div>
      <div>
        <span class="spBlock spTitle mb10">我的发票</span>
        <span class="spBlock mb5">地址：<i>/user/invoice_list</i></span>
        <el-divider></el-divider>
      </div>
      <div>
        <span class="spBlock spTitle mb10">领券中心</span>
        <span class="spBlock mb5">地址：<i>/coupon_center</i></span>
        <el-divider></el-divider>
      </div>
      <div>
        <span class="spBlock spTitle mb10">优惠券可用商品页面</span>
        <span class="spBlock mb5">地址：<i>/goods_coupon</i></span>
        <span class="spBlock mb5">参数：<i>id: 优惠券id</i></span>
        <span class="spBlock spEx">例如：<i>/goods_coupon?id=647</i></span>
        <el-divider></el-divider>
      </div>
    </el-card>
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
export default {
  name: 'PageLinks'
}
</script>

<style scoped lang="scss">
  .goodsTitle {
    .title {
      border-left: 2px solid #1890FF;
      padding-left: 10px;
      color: #000;
      font-size: 14px;
      box-sizing: border-box;
    }
  }
  .spTitle{
    font-size: 14px;
    color: #1890FF;
  }
  .spEx{
    i{
      font-size: 14px;
      color: #666 !important;
    }
  }
  .spBlock{
    i{
      font-style: normal;
      color: #666;
    }
  }
  .spEx{
    i{
      font-style: normal;
    }
  }
</style>
