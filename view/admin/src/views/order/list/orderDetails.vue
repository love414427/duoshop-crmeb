<template>
  <div>
    <el-drawer
      :with-header="false"
      :size="1000"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      
    >
      <div v-loading="loading">
        <div class="head">
          <div class="full">
            <img class="order_icon" :src="orderImg" alt="" />
            <div class="text">
              <div class="title">{{ orderDetailList.order_type == 0 ? '普通订单' : '核销订单' }}</div>
              <div>
                <span class="mr20">订单编号：{{ orderDetailList.order_sn }}</span>
              </div>
            </div>
          </div>
          <ul class="list">
            <li class="item">
              <div class="title">订单状态</div>
              <div>
                <div v-if="orderDetailList.order_type === 0 && !orderDetailList.pay_time" class="value1">待付款</div>
                <div v-if="orderDetailList.order_type === 0 && orderDetailList.pay_time" class="value1">
                  <span>{{ orderDetailList.status | orderStatusFilter }}</span>
                </div>
                <div v-if="orderDetailList.order_type === 1 && orderDetailList.pay_time" class="value1">
                  <span>{{ orderDetailList.status | cancelOrderStatusFilter }}</span>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="title">实际支付</div>
              <div>¥ {{ orderDetailList.pay_price }}</div>
            </li>
            <li class="item">
              <div class="title">支付方式</div>
              <div>{{ orderDetailList.pay_type | payTypeFilter }}</div>
            </li>
            <li class="item">
              <div class="title">支付时间</div>
              <div>{{ orderDetailList.create_time }}</div>
            </li>
          </ul>
        </div>
        <el-tabs type="border-card" v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="订单信息" name="detail">
            <div class="section">
              <div class="title">用户信息</div>
              <ul class="list">
                <li class="item">
                  <div>用户昵称：</div>
                  <div class="value">
                    {{
                      orderDetailList.user.real_name ? orderDetailList.user.real_name : orderDetailList.user.nickname
                    }}
                  </div>
                </li>
                <li class="item">
                  <div>用户ID：</div>
                  <div class="value">{{ orderDetailList.user.uid ? orderDetailList.user.uid : '-' }}</div>
                </li>
                <li class="item">
                  <div>绑定电话：</div>
                  <div class="value">{{ orderDetailList.user.phone ? orderDetailList.user.phone : '-' }}</div>
                </li>
              </ul>
            </div>
            <div class="section">
              <div class="title">收货信息</div>
              <ul class="list">
                <li class="item">
                  <div>收货人：</div>
                  <div class="value">{{ orderDetailList.real_name ? orderDetailList.real_name : '-' }}</div>
                </li>
                <li class="item">
                  <div>收货电话：</div>
                  <div class="value">{{ orderDetailList.user_phone ? orderDetailList.user_phone : '-' }}</div>
                </li>
                <li class="item">
                  <div>收货地址：</div>
                  <div class="value">{{ orderDetailList.user_address ? orderDetailList.user_address : '-' }}</div>
                </li>
              </ul>
            </div>
            <div class="section">
              <div class="title">订单信息</div>
              <ul class="list">
                <li class="item">
                  <div>创建时间：</div>
                  <div class="value">{{ orderDetailList.create_time ? orderDetailList.create_time : '-' }}</div>
                </li>
                <li class="item">
                  <div>商品总数：</div>
                  <div class="value">{{ orderDetailList.total_num ? orderDetailList.total_num : '-' }}</div>
                </li>
                <li class="item">
                  <div>实际支付：</div>
                  <div class="value">{{ orderDetailList.finalOrder ? (parseFloat(orderDetailList.finalOrder.pay_price) + parseFloat(orderDetailList.pay_price)) : orderDetailList.pay_price }}</div>
                </li>
                 <li class="item">
                  <div>优惠券金额：</div>
                  <div class="value">{{ orderDetailList.coupon_price ? orderDetailList.coupon_price : '-' }}</div>
                </li>
                 <li v-if="orderDetailList.integral" class="item">
                  <div>积分抵扣：</div>
                  <div class="value">使用了{{ orderDetailList.integral }}个积分，抵扣了{{ orderDetailList.integral_price }}元</div>
                </li>
                <li class="item">
                  <div>订单总价：</div>
                  <div class="value">{{ orderDetailList.total_price ? orderDetailList.total_price : '-' }}</div>
                </li>
                <li class="item" v-if="orderDetailList.svip_discount">
                  <div>会员商品优惠：</div>
                  <div class="value">{{ orderDetailList.svip_discount }}</div>
                </li>
                <li class="item">
                  <div>支付运费：</div>
                  <div class="value">{{ orderDetailList.pay_postage }}</div>
                </li>
                <li v-if="orderDetailList.TopSpread" class="item">
                  <div>推广人：</div>
                  <div class="value">{{ orderDetailList.TopSpread.nickname }}</div>
                </li>
                <li class="item">
                  <div>一级佣金：</div>
                  <div class="value">
                    {{ parseFloat(orderDetailList.extension_one) + parseFloat(orderDetailList.refund_extension_one) }}
                    <em v-if="orderDetailList.refund_extension_one > 0" style="color: red;font-style: normal;">(-{{ orderDetailList.refund_extension_one }})</em>
                  </div>
                </li>
                <li class="item">
                  <div>二级佣金：</div>
                  <div class="value">
                    {{ parseFloat(orderDetailList.extension_two) + parseFloat(orderDetailList.refund_extension_two) }}
                    <em v-if="orderDetailList.refund_extension_two > 0" style="color: red;font-style: normal;">(-{{ orderDetailList.refund_extension_two }})</em>
                  </div>
                </li>
               
                <li class="item">
                  <div>发货方式：</div>
                  <div v-if="orderDetailList.order_type == 1" class="value">核销</div>
                  <div v-else class="value">{{ orderDetailList.delivery_type | sendWay }}</div>
                </li>
                <li class="item">
                  <div>商品类型：</div>
                  <div class="value">{{ orderDetailList.is_virtual==1 ? '虚拟商品' : orderDetailList.is_virtual==2 ? '卡密商品' : '普通商品' }}</div>
                </li>
                <li class="item">
                  <div>活动类型：</div>
                  <div class="value">{{ orderDetailList.activity_type == 1 ? '秒杀' : orderDetailList.activity_type == 2 ? '预售' : orderDetailList.activity_type == 3 ? '助力' : orderDetailList.activity_type == 4 ? '拼团' : '普通' }}</div>
                </li>
              </ul>
            </div>
            <div class="section" v-if="orderDetailList.delivery_type === '1'">
              <div class="title">物流信息</div>
              <ul class="list">
                <li class="item acea-row row-middle">
                  <div>快递公司：</div>
                  <div class="value">{{ orderDetailList.delivery_name ? orderDetailList.delivery_name : '-' }}</div>
                </li>
                <li class="item acea-row row-middle">
                  <div>快递单号：</div>
                  <div class="value">{{ orderDetailList.delivery_id ? orderDetailList.delivery_id : '-' }}</div>
                  <el-button type="text" size="small" @click="openLogistics">物流查询</el-button>
                </li>
              </ul>
            </div>
            <div class="section">
              <div class="title">买家留言</div>
              <ul class="list">
                <li class="item">
                  <div>{{ orderDetailList.mark ? orderDetailList.mark : '-' }}</div>
                </li>
              </ul>
            </div>
            <div class="section">
              <div class="title">商家备注</div>
              <ul class="list">
                <li class="item">
                  <div>{{ orderDetailList.remark ? orderDetailList.remark : '-' }}</div>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="商品信息" name="goods">
           <el-table :data="orderDetailList.orderProduct">
              <el-table-column label="商品信息" min-width="300">
                <template slot-scope="scope">
                  <div class="tab">
                    <div class="demo-image__preview">
                      <el-image
                        :src="scope.row.cart_info.product.image"
                        :preview-src-list="[scope.row.cart_info.product.image]"
                      />
                    </div>
                    <div>
                      <div class="line1">{{ scope.row.cart_info.product.store_name }}</div>
                      <div class="line1 gary">
                        规格：{{
                          scope.row.cart_info.productAttr.sku ? scope.row.cart_info.productAttr.sku : '默认'
                        }}
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
             
              <el-table-column label="售价" min-width="90">
                <template slot-scope="scope">
                  <div class="tab">
                    <div class="line1">
                      {{ scope.row.cart_info.productAttr.price ? scope.row.cart_info.productAttr.price : '-' }}
                    </div>
                  </div>
                </template>
              </el-table-column>
               <el-table-column label="实付金额" min-width="90">
                <template slot-scope="scope">
                  <div class="tab">
                    <div class="line1">
                      {{ scope.row.product_price ? scope.row.product_price : '-' }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="购买数量" min-width="90">
                <template slot-scope="scope">
                  <div class="tab">
                    <div class="line1">
                      {{ scope.row.product_num }}
                    </div>
                  </div>
                </template>
              </el-table-column>
             
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="订单记录" name="orderList">
            <div>
              <el-form size="small" label-width="80px">
                <div class="acea-row">
                  <el-form-item label="操作端：">
                    <el-select
                      v-model="tableFromLog.user_type"
                      placeholder="请选择"
                      style="width: 140px; margin-right: 20px"
                      clearable
                      filterable
                      @change="onOrderLog(orderId)"
                    >
                      <el-option label="系统" value="0" />
                      <el-option label="用户" value="1" />
                      <el-option label="平台" value="2" />
                      <el-option label="商户" value="3" />
                      <el-option label="商家客服" value="4" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="操作时间：">
                    <el-date-picker
                      style="width: 380px; margin-right: 20px"
                      v-model="timeVal"
                      type="datetimerange"
                      placeholder="选择日期"
                      value-format="yyyy/MM/dd HH:mm:ss"
                      clearable
                      @change="onchangeTime"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <!-- <div>
                    <el-button type="primary" size="small" @click="onOrderLog(orderId)">查询</el-button>
                  </div> -->
                </div>
              </el-form>
            </div>
            <el-table :data="tableDataLog.data">
              <el-table-column prop="order_id" label="订单编号" min-width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.order_sn }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作记录" min-width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.change_message }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作角色" min-width="150">
                <template slot-scope="scope">
                  <div class="tab">
                    <div>{{ operationType(scope.row.user_type) }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作人" min-width="150">
                <template slot-scope="scope">
                  <div class="tab">
                    <div>{{ scope.row.nickname }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作时间" min-width="150">
                <template slot-scope="scope">
                  <div class="tab">
                    <div class="line1">{{ scope.row.change_time }}</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="tableFromLog.limit" :current-page="tableFromLog.page" layout="total, sizes, prev, pager, next, jumper" :total="tableDataLog.total" @size-change="handleSizeChangeLog" @current-change="pageChangeLog" />
            </div>
          </el-tab-pane>
          <el-tab-pane v-if="childOrder.length>0" label="关联订单" name="subOrder">
            <el-table :data="childOrder">
              <el-table-column label="订单编号" prop="order_sn" min-width="150">
               <template slot-scope="scope">
                  <div>{{ scope.row.order_sn }}</div>
                </template>
              </el-table-column>
              <el-table-column label="商品信息" min-width="200">
                <template slot-scope="scope">
                  <div
                    v-for="(val, i) in scope.row.orderProduct"
                    :key="i"
                    class="tabBox acea-row row-middle"
                  >
                    <div class="demo-image__preview">
                      <el-image
                        :src="val.cart_info.product.image"
                        :preview-src-list="[val.cart_info.product.image]"
                      />
                    </div>
                    <span
                      class="tabBox_tit"
                    >{{ val.cart_info.product.store_name + ' | ' }}{{ val.cart_info.productAttr.sku }}</span>
                    <span class="tabBox_pice">
                      {{ '￥'+ val.cart_info.productAttr.price + ' x '+ val.product_num }}
                      <em
                        v-if="val.refund_num < val.product_num && val.refund_num  > 0"
                        style="color: red;font-style: normal;"
                      >(-{{ val.product_num - val.refund_num }})</em>
                    </span>
                  </div>
                </template>
              </el-table-column> 
              <el-table-column label="实际支付" min-width="80" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.pay_price }}</span>
                </template>
              </el-table-column>
              <el-table-column label="订单生成时间" prop="create_time" min-width="120" />
              <el-table-column label="操作" min-width="50" fixed="right" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="getChildOrderDetail(scope.row.order_id)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-drawer>
    <el-dialog
      title="物流查询"
      :visible.sync="dialogLogistics"
      width="350px"
      v-if="dialogLogistics"
    >
      <div class="logistics acea-row row-top">
        <div class="logistics_img"><img src="@/assets/images/expressi.jpg"></div>
        <div class="logistics_cent">
          <span>物流公司：{{ orderDetailList.delivery_name }}</span>
          <span>物流单号：{{ orderDetailList.delivery_id }}</span>
        </div>
      </div>
      <div class="acea-row row-column-around trees-coadd">
        <div class="scollhide">
          <el-timeline>
            <el-timeline-item v-for="(item,i) in result" :key="i">
              <p class="time" v-text="item.time" />
              <p class="content" v-text="item.status" />
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getExpress,
  orderDeliveryApi,
  orderDeleteApi,
  orderDetailApi,
  orderLogApi,
  getChildrenOrderApi
} from '@/api/order';
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: true,
      orderId: '',
      direction: 'rtl',
      activeName: 'detail',
      goodsList: [],
      orderConfirm: false,
      sendGoods: false,
      dialogLogistics: false,
      confirmReceiptForm: {
        id: '',
      },
      orderData: [],
      contentList: [],
      nicknameList: [],
      result: [],
      timeVal: [],
      childOrder: [],
      childOrder: [],
      tableDataLog: {
        data: [],
        total: 0
      },
      tableFromLog: {
        user_type: '',
        date: [],
        page: 1,
        limit: 10
      },
      orderDetailList: {
        user: {
          real_name: '',
        },
        groupOrder: {
          group_order_sn: '',
        },
      },
      orderImg: require('@/assets/images/order_icon.png'),

    };
  },
  filters: {
  },
  methods: {
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e
      this.tableFromLog.date = e ? this.timeVal.join('-') : ''
      this.onOrderLog(this.orderId)
    },
    handleClose() {
      this.activeName = 'detail';
      this.$emit('closeDrawer');
      this.sendGoods = false;
      this.orderRemark = false;
    },
    openLogistics() {
      this.getOrderData()
      this.dialogLogistics = true
    },
     // 获取订单物流信息
    getOrderData() {
      getExpress(this.orderId).then(async res => {
        this.result = res.data
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    //发送货
    toSendGoods() {
      this.sendGoods = true;
    },
    getDelivery() {
      orderDeliveryApi(this.orderId)
        .then((res) => {
          this.$message.success(res.message);
          this.sendGoods = false;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
     // 获取子订单信息
    getChildOrder() {
      this.loading = true;
      getChildrenOrderApi(this.orderId)
        .then((res) => {
          this.activeName = 'detail'
          this.childOrder = res.data
          setTimeout(()=>{
            this.loading = false;
          },500)
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    getChildOrderDetail(id){
      this.getInfo(id);
    },
    getInfo(id) {
      this.loading = true;
      this.orderId = id
      orderDetailApi(id)
        .then((res) => {
          this.drawer = true;
          this.orderDetailList = res.data;
          this.getChildOrder();
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 删除订单
    handleDelete() {
      this.$modalSure().then(() => {
        orderDeleteApi(this.orderId)
          .then(({ message }) => {
            this.$message.success(message);
            // this.tableData.data.splice(idx, 1);
          })
          .catch(({ message }) => {
            this.$message.error(message);
          });
      });
    },
    tabClick(tab) {
      if (tab.name === 'orderList') {
       this.onOrderLog(this.orderId)
      }
    },
    onOrderLog(id){
      orderLogApi(id, this.tableFromLog).then((res) => {
        this.tableDataLog.data = res.data.list
        this.tableDataLog.total = res.data.count
      });
    },
    pageChangeLog(page) {
      this.tableFromLog.page = page
      this.onOrderLog(this.orderId)
    },
    handleSizeChangeLog(val) {
      this.tableFromLog.limit = val
      this.onOrderLog(this.orderId)
    },
    operationType(type) {
      if (type == 0) {
        return '系统';
      } else if (type == 1) {
        return '用户';
      } else if (type == 2) {
        return '平台';
      } else if (type == 3) {
        return '商户';
      } else if (type == 4) {
        return '商家客服';
      } else {
        return '未知';
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.head {
  padding: 30px 35px 25px;
  .full {
    display: flex;
    align-items: center;
    .order_icon {
      width: 60px;
      height: 60px;
    }
    .iconfont {
      color: #1890ff;
      &.sale-after {
        color: #90add5;
      }
    }
    .text {
      align-self: center;
      flex: 1;
      min-width: 0;
      padding-left: 12px;
      font-size: 13px;
      color: #606266;
      .title {
        margin-bottom: 10px;
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        color: rgba(0, 0, 0, 0.85);
      }
      .order-num {
        padding-top: 10px;
        white-space: nowrap;
      }
    }
  }
  .list {
    display: flex;
    margin-top: 20px;
    overflow: hidden;
    list-style: none;
    padding: 0;
    .item {
      flex: none;
      width: 200px;
      font-size: 14px;
      line-height: 14px;
      color: rgba(0, 0, 0, 0.85);
      .title {
        margin-bottom: 12px;
        font-size: 13px;
        line-height: 13px;
        color: #666666;
      }
      .value1 {
        color: #f56022;
      }

      .value2 {
        color: #1bbe6b;
      }

      .value3 {
        color: #1890ff;
      }

      .value4 {
        color: #6a7b9d;
      }

      .value5 {
        color: #f5222d;
      }
    }
  }
}
.el-tabs--border-card {
  box-shadow: none;
  border-bottom: none;
}
.section {
  padding: 20px 0 5px;
  border-bottom: 1px dashed #eeeeee;
  .title {
    padding-left: 10px;
    border-left: 3px solid #1890ff;
    font-size: 15px;
    line-height: 15px;
    color: #303133;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
  }
  .item {
    flex: 0 0 calc(100% / 3);
    display: flex;
    margin-top: 16px;
    font-size: 13px;
    color: #606266;

    &:nth-child(3n + 1) {
      padding-right: 20px;
    }

    &:nth-child(3n + 2) {
      padding-right: 10px;
      padding-left: 10px;
    }

    &:nth-child(3n + 3) {
      padding-left: 20px;
    }
  }
  .value {
    flex: 1;
    image {
      display: inline-block;
      width: 40px;
      height: 40px;
      margin: 0 12px 12px 0;
      vertical-align: middle;
    }
  }
}
.tab {
  display: flex;
  align-items: center;
  .el-image {
    width: 36px;
    height: 36px;
    margin-right: 10px;
  }
}
/deep/.el-drawer__body {
  overflow: auto;
}
.gary {
  color: #aaa;
}
.logistics{
  align-items: center;
  padding: 10px 0px;
  .logistics_img{
    width: 45px;
    height: 45px;
    margin-right: 12px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .logistics_cent{
    span{
      display: block;
      font-size: 12px;
    }
  }
}
.tabBox_tit {
  width: 53%;
  font-size: 12px !important;
  margin: 0 2px 0 10px;
  letter-spacing: 1px;
  padding: 5px 0;
  box-sizing: border-box;
}
</style>
