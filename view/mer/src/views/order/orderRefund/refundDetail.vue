<template>
  <el-dialog
    v-if="orderDatalist"
    v-loading="loading"
    title="退款单信息"
    :visible.sync="dialogVisible"
    width="700px"
  >
    <div class="description">
      <div class="title">用户信息</div>
      <div class="acea-row">
        <div class="description-term">用户昵称：{{ orderDatalist.user.nickname }}</div>
        <div class="description-term">退货人：{{ orderDatalist.order.real_name }}</div>
        <div class="description-term">联系电话：{{ orderDatalist.order.user_phone }}</div>
        <div class="description-term">退货地址：{{ orderDatalist.order.user_address }}</div>
        <div class="description-term">备注：{{ orderDatalist.mark }}</div>
      </div>
      <el-divider />
      <div class="title">{{orderDatalist.refund_type == 1 ? '退款信息' : '退回商品信息'}}</div>
      <div class="acea-row">
        <div class="description-term">订单编号：{{ orderDatalist.order.order_sn }}</div>
        <div class="description-term">订单状态：{{ orderDatalist.status | orderRefundFilter }}</div>
        <div class="description-term100">退款单号：{{ orderDatalist.refund_order_sn }}</div>
        <div class="description-term100">退款商品名称：
            <div class="product_name">
                <div v-for="(item,index) in orderDatalist.refundProduct" :key="index">
                    <span v-if="item.product && item.product.cart_info && item.product.cart_info.product">{{item.product.cart_info.product.store_name}}</span>
                 </div>
            </div>           
        </div>
        <div class="description-term">退款商品件数：{{ orderDatalist.refund_num }}件</div>
        <!--<div class="description-term">退款总金额：{{ orderDatalist }}</div>-->
        <div class="description-term">退款总金额：{{ orderDatalist.refund_price }}元</div>
        <!--<div class="description-term">用户备注：{{ orderDatalist.coupon_price }}</div>-->
        <div class="description-term">创建时间：{{ orderDatalist.create_time }}</div>
        <div class="description-term">商家备注：{{ orderDatalist.mer_mark }}</div>
        <div class="description-term100">退款凭证：
          <div class="product_name" style="margin-left: 70px;">
            <div class="demo-image__preview">
            <el-image
              v-for="(item,index) in orderDatalist.pics"
              :key="index"
              :src="item"
              class="mr5"
              :preview-src-list="[item]"
            />
          </div>
          </div>  
        </div>
      </div>
      <el-divider />
      <div class="title">订单记录</div>
      <el-table v-loading="LogLoading" border :data="tableDataLog.data" style="width: 100%">
        <el-table-column prop="order_id" align="center" label="退款单ID" min-width="80" />
        <el-table-column prop="change_message" label="操作记录" align="center" min-width="280" />
        <el-table-column prop="change_time" label="操作时间" align="center" min-width="280" />
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80]"
          :page-size="tableFromLog.limit"
          :current-page="tableFromLog.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDataLog.total"
          @size-change="handleSizeChangeLog"
          @current-change="pageChangeLog"
        />
      </div>
      <el-divider />
      <div v-if="(orderDatalist.status == 2 || orderDatalist.status == 3) && orderDatalist.refund_type == 2">
           <div class="title">退货物流信息</div>
           <div class="acea-row">
               <div class="description-term">快递公司：{{ orderDatalist.delivery_type }}</div>
               <div class="description-term">快递单号：{{ orderDatalist.delivery_id }}</div>
               <el-button size="small" type="primary" @click="getLoginstics">物流查询</el-button>
           </div>
      </div>
    </div>
  </el-dialog>
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
import {
  refundorderLogApi
} from '@/api/order'
export default {
  name: 'OrderDetail',
  props: {
    orderDatalist: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialogVisible: false,
      LogLoading: false,
      // orderDatalist: null,
      loading: false,
      listLoading: true,
      order_id: '',
      tableDataLog: {
        data: [],
        total: 0,
      },
      tableFromLog: {
        page: 1,
        limit: 5
      },
    }
  },
  mounted() {
      
   
  },
  methods: {
    // 订单记录
    onOrderLog(id) {
      this.LogLoading = true
      this.order_id = id;
      refundorderLogApi(id, this.tableFromLog)
        .then(res => {
          this.tableDataLog.data = res.data.list
          this.tableDataLog.total = res.data.count
          this.LogLoading = false
        })
        .catch(res => {
          this.$message.error(res.message)
          this.LogLoading = false
        })
    },
    /**查看物流 */
    getLoginstics(){
        this.$emit('get-logistics',this.orderDatalist)
    },
    pageChangeLog(page) {
      this.tableFromLog.page = page
      this.onOrderLog(this.order_id)
    },
    handleSizeChangeLog(val) {
      this.tableFromLog.limit = val
      this.onOrderLog(this.order_id)
    },
  }
}
</script>

<style scoped lang="scss">
  .title{
    margin-bottom: 16px;
    color: #17233d;
    font-weight: 500;
    font-size: 14px;
  }
  .description{
    &-term {
      display: table-cell;
      padding-bottom: 10px;
      line-height: 20px;
      width: 50%;
      font-size: 12px;
    }
  }
 .description-term100{
    display: table-cell;
    padding-bottom: 10px;
    line-height: 20px;
    width: 100%;
    font-size: 12px;
 }
 .product_name{
     margin-left: 90px;
     position: relative;
     top: -20px;
 }
 .demo-image__preview {
  .el-image,img{
    width: 40px;
    height: 40px;
  }
 }
</style>
