<template>
<div>
  <el-dialog
    title="订单详情"
    :visible.sync="dialogVisible"
    width="700px"
    :show-close="true"
    :before-close="handleClose"
  >
    <div v-if="orderDetail" class="order_detail">
      <div class="msg-box" style="border: none;">
        <div class="box-title">订单信息</div>
        <div class="msg-wrapper">
          <div class="msg-item">
            <div class="item">
              <span>订单编号：</span>{{ orderDetail.order_sn }}
            </div>
            <div class="item" style="color: red">
              <span v-if="orderDetail.order_type === 0" style="color: red">订单状态：{{ orderDetail.status | orderStatusFilter }}</span>
              <span v-else style="color: red">订单状态：{{ orderDetail.status | cancelOrderStatusFilter }}</span>
            </div>
          </div>
          <div class="msg-item">
            <div class="item">
              <span>商品数量：</span>{{ orderDetail.total_num }}
            </div>
            <div class="item">
              <span>商品总价：</span>{{ orderDetail.total_price }}
            </div>
          </div>
          <div class="msg-item">
            <div class="item">
              <span>优惠券金额：</span>{{ orderDetail.coupon_price }}
            </div>
            <div class="item">
              <span>交付邮费：</span>{{ orderDetail.pay_postage }}
            </div>
          </div>
          <div v-if="orderDetail.integral > 0" class="msg-item">
            <div class="item">
              <span>抵扣积分：</span>{{ orderDetail.integral }}
            </div>
            <div class="item">
              <span>积分抵扣金额：</span>{{ orderDetail.integral_price }}
            </div>
          </div>
          <div class="msg-item">
            <div class="item">
              <span>实际支付：</span>{{ orderDetail.finalOrder ? (parseFloat(orderDetail.finalOrder.pay_price) + parseFloat(orderDetail.pay_price)) : orderDetail.pay_price }}
            </div>
            <div class="item">
              <span>支付方式：</span>{{ orderDetail.pay_type | payTypeFilter }}
            </div>
            
          </div>
          <div class="msg-item">
            <div class="item">
              <span>创建时间：</span>{{ orderDetail.create_time }}
            </div>
            <div class="item">
              <span>推广人：</span>--
            </div>
          </div>
          <div class="msg-item">
            <div class="item">
              <span>一级佣金：</span>{{ parseFloat(orderDetail.extension_one) }}
            </div>
            <div class="item">
              <span>二级佣金：</span>{{ parseFloat(orderDetail.extension_two) }}
            </div>
          </div>
          <div class="msg-item">
            <div class="item">
              <span>订单类型：</span>{{ orderDetail.order_type == 2 ? '虚拟订单' : orderDetail.order_type == 1 ? '核销订单' : '普通订单' }}
            </div>
            <div class="item">
              <span>活动类型：</span>{{ orderDetail.activity_type | activityTypeFilter }}
            </div>
          </div>
          <div class="msg-item">
            <div class="item">
              <span>买家备注：</span>{{ orderDetail.mark || '--' }}
            </div>
          </div>
          <div class="msg-item">
            <div class="item">
              <span>商家备注：</span>{{ orderDetail.remark || '--' }}
            </div>
          </div>
        </div>
      </div>
      <div class="goods-box">
        <el-table :data="orderList" size="mini">
          <el-table-column
            prop="product_id"
            label="商品ID"
            min-width="80"
          />
          <el-table-column
            prop="productInfo"
            label="商品名称"
            min-width="160"
          >
            <template slot-scope="scope">
              <div class="product_info">
                <img :src="scope.row.cart_info.productAttr.image" alt="">
                <p>{{ scope.row.cart_info.product.store_name }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="product_price"
            label="商品售价"
            min-width="80"
          />
          <el-table-column
            prop="product_num"
            label="商品数量"
            min-width="80"
          />
        </el-table>
      </div>
      <div v-if="orderDetail.delivery_type === '1' || orderDetail.delivery_type === '4'" class="msg-box" style="border: none;">
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
      <div v-if="orderDetail.delivery_type === '2'" class="msg-box" style="border: none;">
        <div class="box-title">配送信息</div>
        <div class="msg-wrapper">
          <div class="msg-item">
            <div class="item">送货人姓名：{{ orderDetail.delivery_name }}</div>
            <div class="item">送货人姓名：{{ orderDetail.delivery_name }}</div>
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
import { orderInfo, getExpress } from '@/api/kefu'
import logisticsFrom from './logistics'
export default {
  name: 'OrderDetail',
  components: { logisticsFrom },
  data() {
    return {
      dialogLogistics: false,
      orderDetail: {},
      result: {},
      orderList: [
        
      ],
      dialogVisible: false,
      
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
      orderInfo(id).then(res => {
        this.orderDetail = res.data
        this.orderList = res.data.orderProduct
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
      getExpress(this.orderDetail.order_id).then(async res => {
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
