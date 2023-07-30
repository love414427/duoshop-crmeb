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
              <div class="title">普通订单</div>
              <div>
                <span class="mr20">订单编号：{{ orderDetailList.order_sn }}</span>
              </div>
            </div>
            <div>
              <el-button
                v-if="orderDetailList.status === 0 && orderDetailList.paid === 1" 
                type="primary"
                size="small"
                @click="toSendGoods"
                >发送货</el-button
              >
              <!-- <el-button
                v-if="orderDetailList.paid == 1"
                type="success"
                size="small"
                @click="printOrder"
                >小票打印</el-button
              > -->
             <el-button
                size="small"
                @click="onOrderMark"
                >备注</el-button
              >
            </div>
          </div>
          <ul class="list">
            <li class="item">
              <div class="title">订单状态</div>
              <div>
                <div v-if="!orderDetailList.pay_time" class="value1">待付款</div>
                <div v-if="orderDetailList.pay_time" class="value1">
                  <span>{{ orderDetailList.status | orderStatusFilter }}</span>
                </div>
              </div>
            </li>
            <li class="item">
              <div class="title">实际支付</div>
              <div> {{ !orderDetailList.pay_time ? '-' : orderDetailList.integral+'个积分+'+orderDetailList.pay_price+'元' }}</div>
            </li>
            <li class="item">
              <div class="title">支付方式</div>
              <div v-if="orderDetailList.pay_time"><span>积分</span><span v-if="Number(orderDetailList.pay_price)!=0">+{{ orderDetailList.pay_type | payTypeFilter }}</span>支付</div>
              <div v-else>-</div>
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
                  <div class="value">{{ !orderDetailList.pay_time ? '-' : orderDetailList.integral+'个积分+'+orderDetailList.pay_price+'元' }}</div>
                </li>
                <li v-if="orderDetailList.integral" class="item">
                  <div>积分抵扣：</div>
                  <div class="value">使用了{{ orderDetailList.integral }}个积分</div>
                </li>
                <li class="item">
                  <div>订单总价：</div>
                  <div class="value">{{ orderDetailList.total_price ? orderDetailList.total_price : '-' }}</div>
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
                  <el-button type="text" size="mini" @click="openLogistics">物流查询</el-button>
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
                      {{ scope.row.product_price ? scope.row.product_price+'元' : '-' }}
                    </div>
                  </div>
                </template>
              </el-table-column>
               <el-table-column label="实付积分" min-width="90">
                <template slot-scope="scope">
                  <div class="tab">
                    <div class="line1">
                      {{ scope.row.integral_total ? scope.row.integral_total+'积分' : '-' }}
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
                </div>
              </el-form>
            </div>
            <el-table :data="tableDataLog.data" size="small">
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
          <el-timeline v-if="result.length>0">
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
  integralOrderExpressApi,
  orderDeliveryApi,
  orderDeleteApi,
  integralOrderDetailApi,
  integralOrderLog,
  orderPrintApi,
  integralMarkApi
} from '@/api/marketing';
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
      integralOrderExpressApi(this.orderId).then(async res => {
        this.result = res.data
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    //发送货
    toSendGoods() {
      this.$emit('send',this.orderId);
    },
    // 小票打印
    printOrder() {
      orderPrintApi(this.orderId)
        .then((res) => {
          this.$message.success(res.message)
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    // 备注
    onOrderMark() {
      this.$modalForm(integralMarkApi(this.orderId)).then(() => this.getInfo(this.orderId))
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
    getInfo(id) {
      this.loading = true;
      this.orderId = id
      integralOrderDetailApi(id)
        .then((res) => {
          this.drawer = true;
          this.loading = false;
          this.orderDetailList = res.data;
        })
        .catch((res) => {
          this.loading = false;
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
      integralOrderLog(id, this.tableFromLog).then((res) => {
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
