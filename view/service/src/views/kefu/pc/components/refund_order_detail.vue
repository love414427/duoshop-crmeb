<template>
<div>
  <el-dialog
    title="退款单详情"
    :visible.sync="dialogVisible"
    width="700px"
    :show-close="true"
    :before-close="handleClose"
  >
    <div v-if="orderDetail" class="order_detail">
      <div class="msg-box" style="border: none;">
        <div class="box-title">用户信息</div>
        <div class="msg-wrapper">
           <div class="msg-item">
            <div class="item">
              <span>用户昵称：</span>{{ orderDetail.user && orderDetail.user.nickname }}
            </div>
            <div class="item">
              <span>退货人：</span>{{ orderDetail.order && orderDetail.order.real_name }}
            </div>
          </div>
          <div class="msg-item">
            <div class="item">
              <span>联系电话：</span>{{ orderDetail.order && orderDetail.order.user_phone }}
            </div>
            <div class="item">
              <span>退货地址：</span>{{ orderDetail.order && orderDetail.order.user_address }}
            </div>
          </div>
        </div>
      </div>
      <div class="msg-box" style="border: none;">
        <div class="box-title">订单信息</div>
        <div class="msg-wrapper">
          <div class="msg-item">
            <div class="item">
              <span>订单编号：</span>{{ orderDetail.order && orderDetail.order.order_sn }}
            </div>
            <div class="item">
              <span>订单状态：</span>{{ orderDetail.status | orderRefundFilter }}
            </div>
          </div>
          <div class="msg-item">
            <div class="item">
              <span>退款单号：</span>{{ orderDetail.refund_order_sn }}
            </div>
            <div class="item">
              <span>退款商品名称：</span>
              <span class="product_name">
                <span v-for="(item,index) in orderDetail.refundProduct" :key="index">
                    <span v-if="item.product && item.product.cart_info && item.product.cart_info.product">{{item.product.cart_info.product.store_name}}</span>
                 </span>
              </span>
            </div>
          </div>
          <div class="msg-item">
            <div class="item">
              <span>退款商品件数：</span>{{ orderDetail.refund_num }}
            </div>
            <div class="item">
              <span>退款总金额：</span>{{ orderDetail.refund_price }}
            </div>
          </div>
          <div class="msg-item">
            <div class="item">
              <span>创建时间：</span>{{ orderDetail.create_time }}
            </div>
            <div class="item">
              <span>商家备注：</span>{{ orderDetail.mer_mark }}
            </div>
          </div>
          
        </div>
      </div>
      <div class="goods-box">
        <el-table :data="tableDataLog.data" size="mini">
          <el-table-column prop="refund_order_id" align="center" label="退款单ID" min-width="80" />
          <el-table-column prop="change_message" label="操作记录" align="center" min-width="280" />
          <el-table-column prop="change_time" label="操作时间" align="center" min-width="280" />
        </el-table>
      </div>
      <div v-if="(orderDetail.status == 2 || orderDetail.status == 3) && orderDetail.refund_type == 2" class="msg-box" style="border: none;">
         <div class="box-title">物流信息</div>
         <div class="msg-wrapper">
            <div class="msg-item">
              <div class="item">快递公司：{{ orderDetail.delivery_name }}</div>
              <div class="item">快递单号：{{ orderDetail.delivery_id }}
                <el-button type="primary" size="mini" style="margin-left: 5px" @click="openLogistics">物流查询</el-button>
              </div>
            </div>
          </div>
      </div>
      
    </div>
  </el-dialog>
  <el-dialog
      title="物流查询"
      :visible.sync="dialogLogistics"
      width="350px"
      :before-close="close"
    >
      <logistics-from v-if="orderDetail" :order-detail="orderDetail" :result="result" />
    </el-dialog>
</div>
</template>

<script>
import { refundOrderInfo, getExpress, refundorderLogApi, refundorderExpressApi } from '@/api/kefu'
import logisticsFrom from './logistics'
export default {
  name: 'RefundOrderDetail',
  components: { logisticsFrom },
  data() {
    return {
      dialogLogistics: false,
      orderDetail: {},
      result: {},
      dialogVisible: false,
      LogLoading: false,
      tableFromLog: {
        page: 1,
        limit: 10
      },
      tableDataLog: {
        data: [],
        total: 0
      },
      
    }
  },
  mounted() {
    
  },
  methods: {
    openBox(id) {
      this.dialogVisible = true
      this.getOrderInfo(id)
    },
    handleClose() {
      this.dialogVisible = false
    },
    getOrderInfo(id) {
      refundOrderInfo(id).then(res => {
        this.orderDetail = res.data
      })
    },
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
    openLogistics() {
      this.getOrderData()
      this.dialogLogistics = true
    },
    close() {
      this.dialogLogistics = false
    },
    // 获取订单物流信息
    getOrderData() {
      refundorderExpressApi(this.orderDetail.refund_order_id).then(async res => {
        this.result = res.data
      }).catch(res => {
        this.$message.error(res.message)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.order_detail{
  .msg-box{
    border-bottom: 1px solid #E8EAED;
    .box-title{
      padding-top: 20px;
      font-size: 16px;
      color: #333;
    }
    .msg-wrapper{
      margin-top: 15px;
      padding-bottom: 10px;
      .msg-item{
        display: flex;
        .item{
          flex: 1;
          margin-bottom: 15px;
          font-size: 12px;
          span{
            color: #333;
          }
        }
      }
    }
    &:first-child .box-title{
      padding-top: 0;
    }
  }
  .product_info{
    display: flex;
    align-items: center;
    img{
      width: 36px;
      height: 36px;
      border-radius: 4px;
      margin-right: 10px;
    }
  }
  /deep/ .el-table .cell{
    font-size: 12px;
  }
}
</style>
