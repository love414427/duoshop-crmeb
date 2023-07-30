<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="120px" inline>
            <el-form-item label="订单状态：" style="display: block;">
              <el-radio-group v-model="tableFrom.status" type="button" @change="getList(1)">
                <el-radio-button label>全部 {{ '(' +orderChartType.all?orderChartType.all:0 + ')' }}</el-radio-button>
                <el-radio-button
                  label="0"
                >待审核 {{ '(' +orderChartType.audit?orderChartType.audit:0+ ')' }}</el-radio-button>
                <el-radio-button
                  label="-1"
                >审核未通过 {{ '(' +orderChartType.refuse?orderChartType.refuse:0+ ')' }}</el-radio-button>
                <el-radio-button
                  label="1"
                >审核通过 {{ '(' +orderChartType.agree?orderChartType.agree:0+ ')' }}</el-radio-button>
                <el-radio-button
                  label="2"
                >待收货 {{ '(' +orderChartType.backgood?orderChartType.backgood:0+ ')' }}</el-radio-button>
                <el-radio-button
                  label="3"
                >已完成 {{ '(' +orderChartType.end?orderChartType.end:0+ ')' }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="时间选择：" class="width100" style="display: block;">
              <el-radio-group
                v-model="tableFrom.date"
                type="button"
                class="mr20"
                size="small"
                @change="selectChange(tableFrom.date)"
              >
                <el-radio-button
                  v-for="(item,i) in fromList.fromTxt"
                  :key="i"
                  :label="item.val"
                >{{ item.text }}</el-radio-button>
              </el-radio-group>
              <el-date-picker
                v-model="timeVal"
                value-format="yyyy/MM/dd"
                format="yyyy/MM/dd"
                size="small"
                type="daterange"
                placement="bottom-end"
                placeholder="自定义时间"
                style="width: 250px;"
                @change="onchangeTime"
              />
            </el-form-item>
            <el-form-item label="退款单号：" class="width100">
              <el-input
                v-model="tableFrom.refund_order_sn"
                clearable
                placeholder="请输入订单号"
                class="selWidth"
                size="small"
                @keyup.enter.native="getList(1)"
              >
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
            <el-form-item label="退款类型：" class="width100">
              <el-select
                v-model="tableFrom.refund_type"
                placeholder="请选择"
                class="filter-item selWidth mr20"
                clearable
                @change="getList(1)"
              >
                <el-option
                  v-for="item in refundTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="订单单号：" class="width100">
              <el-input
                v-model="tableFrom.order_sn"
                clearable
                placeholder="请输入订单号"
                class="selWidth"
                size="small"
                @keyup.enter.native="getList(1)"
              >
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
            <el-form-item label="退货快递单号：" class="width100">
              <el-input
                v-model="tableFrom.delivery_id"
                clearable
                placeholder="请输入退货快递单号"
                class="selWidth"
                size="small"
                @keyup.enter.native="getList(1)"
              >
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
              </el-input>
              <el-button size="small" type="primary" @click.native="exports">导出退款单</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="mini"
        class="table"
        highlight-current-row
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand demo-table-expands">
              <el-form-item label="订单号：">
                <span>{{ props.row.order.order_sn }}</span>
              </el-form-item>
              <el-form-item label="退款商品总价：">
                <span v-if="props.row.order.activity === 2">{{ getPresellTotal(props.row.refundProduct) }}</span>
                <span v-else-if="props.row.order.activity === 3">{{ getAssistTotal(props.row.refundProduct) }}</span>
                <span v-else>{{ getTotal(props.row.refundProduct) }}</span>
              </el-form-item>
              <el-form-item label="退款商品总数：">
                <span>{{ props.row.refund_num }}</span>
              </el-form-item>
              <el-form-item label="申请退款时间：">
                <span>{{ props.row.create_time | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="用户备注：">
                <span>{{ props.row.mark | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="商家备注：">
                <span>{{ props.row.mer_mark | filterEmpty }}</span>
              </el-form-item>
              <el-form-item v-if="props.row.status === 2" label="快递公司：">
                <span>{{ props.row.delivery_type | filterEmpty }}</span>
              </el-form-item>
              <el-form-item v-if="props.row.status === 2" label="快递单号：">
                <span class="mr5">{{ props.row.delivery_id | filterEmpty }}</span>
                <el-button type="text" @click="openLogistics(props.row)">物流查询</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="退款单号" min-width="170">
          <template slot-scope="scope">
            <span style="display: block;" v-text="scope.row.refund_order_sn" />
          </template>
        </el-table-column>
        <el-table-column prop="user.nickname" label="用户信息" min-width="130" />
        <el-table-column prop="refund_price" label="退款金额" min-width="130" />
        <el-table-column prop="nickname" label="商品信息" min-width="330">
          <template slot-scope="scope">
            <div
              v-for="(val, i ) in scope.row.refundProduct"
              :key="i"
              class="tabBox acea-row row-middle"
            >
              <div class="demo-image__preview">
                <el-image
                  :src="val.product && val.product.cart_info.product.image"
                  :preview-src-list="[val.product && val.product.cart_info.product.image]"
                />
              </div>
              <span
                class="tabBox_tit"
              >{{ val.product && val.product.cart_info.product.store_name + ' | ' }}{{ val.product && val.product.cart_info.productAttr.sku }}</span>
              <span
                v-if="scope.row.order && scope.row.order.activity_type === 2 && val.product && val.product.cart_info.productPresellAttr"
                class="tabBox_pice"
              >{{ '￥'+ val.product && val.product.cart_info.productPresellAttr.presell_price + ' x '+ val.refund_num }}</span>
              <span
                v-else-if="scope.row.order && scope.row.order.activity_type === 3 && val.product && val.product.cart_info.productAssistAttr.assist_price"
                class="tabBox_pice"
              >{{ '￥'+ val.product && val.product.cart_info.productAssistAttr.assist_price + ' x '+ val.refund_num }}</span>
              <span
                v-else
                class="tabBox_pice"
              >{{ '￥'+ val.product && val.product.cart_info.productAttr.price + ' x '+ val.refund_num }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="退款类型" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.refund_type == 1 ? '退款' : '退货退款' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="order.real_name" label="退货人" min-width="160" />
        <el-table-column prop="delivery_id" label="退货快递单号" min-width="160" />
        <el-table-column label="订单状态" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.order.is_del === 0">
              <span v-if="scope.row.order.paid === 0">待付款</span>
              <span v-else>
                <span v-if="scope.row.order.order_type === 0 || scope.row.order.order_type === 2">{{ scope.row.order.status | orderStatusFilter }}</span>
                <span v-else>{{ scope.row.order.status | takeOrderStatusFilter }}</span>
              </span>
            </span>
            <span v-else>已删除</span>
          </template>
        </el-table-column>
        <el-table-column prop="serviceScore" label="退款单状态" min-width="250">
          <template slot-scope="scope">
            <span style="display: block">{{ scope.row.status | orderRefundFilter }}</span>
            <span v-if="scope.row.status == -1" style="display: block">拒绝原因：{{ scope.row.fail_message }}</span>
            <span style="display: block">退款原因：{{ scope.row.refund_message }}</span>
            <span style="display: block">状态变更时间：{{ scope.row.status_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onOrderDetail(scope.row.order.order_sn)">订单详情</el-button>
            <el-button type="text" size="small" @click="onRefundOrderDetail(scope.row.refund_order_id)">退款单详情</el-button>
            <el-button v-if="scope.row.status === 0" type="text" size="small" @click="onOrderStatus(scope.row.refund_order_id)">退款</el-button>
            <!-- <el-button type="text" size="small" @click="onOrderLog(scope.row.refund_order_id)">订单记录</el-button> -->
            <el-button type="text" size="small" @click="onOrderMark(scope.row.refund_order_id)">订单备注</el-button>
            <el-button v-if="scope.row.status === 2" type="text" size="small" @click="confirmReceipt(scope.row)">确认收货</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80]"
          :page-size="tableFrom.limit"
          :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <!--记录-->
    <el-dialog title="操作记录" :visible.sync="dialogVisible" width="700px">
      <el-table v-loading="LogLoading" border :data="tableDataLog.data" style="width: 100%">
        <el-table-column prop="refund_order_id" align="center" label="退款单ID" min-width="80" />
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
    </el-dialog>
    <!--详情-->
    <details-from ref="orderDetail" :order-datalist="orderDatalist" @get-logistics="openLogistics" />
    <el-dialog
      v-if="dialogLogistics"
      title="物流查询"
      :visible.sync="dialogLogistics"
      width="350px"
      :before-close="handleClose"
    >
      <logistics-from
        v-if="orderDetails"
        :order-datalist="orderDetails"
        :result="result"
        :logistics-name="logisticsName"
      />
    </el-dialog>
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
import {
  refundorderStatusApi,
  refundorderListApi,
  orderUpdateApi,
  orderDeliveryApi,
  refundorderLogApi,
  refundorderDeleteApi,
  refundorderMarkApi,
  refundorderDetailApi,
  refundorderExpressApi,
  confirmReceiptApi,
  refundListImportApi
} from '@/api/order'
import detailsFrom from './refundDetail'
import logisticsFrom from '../logistics'
import { roterPre } from '@/settings'
import createWorkBook from '@/utils/newToExcel.js'
export default {
  name: 'OrderRefund',
  components: { detailsFrom, logisticsFrom },
  data() {
    return {
      logisticsName: 'refund',
      dialogLogistics: false,
      orderId: 0,
      tableData: {
        data: [],
        total: 0
      },
      refundTypeList: [
        { value: 1, label: '退款' },
        { value: 2, label: '退款退货' }
      ],
      listLoading: true,
      roterPre: roterPre,
      tableFrom: {
        delivery_id: '',
        refund_type: '',
        status: '',
        date: '',
        page: 1,
        limit: 20,
        order_sn: this.$route.query.sn ? this.$route.query.sn : '',
        refund_order_sn: this.$route.query.refund_order_sn ? this.$route.query.refund_order_sn : '',
        id: this.$route.query.id ? this.$route.query.id : ''
      },
      orderChartType: {},
      timeVal: [],
      fromList: {
        title: '选择时间',
        custom: true,
        fromTxt: [
          { text: '全部', val: '' },
          { text: '今天', val: 'today' },
          { text: '昨天', val: 'yesterday' },
          { text: '最近7天', val: 'lately7' },
          { text: '最近30天', val: 'lately30' },
          { text: '本月', val: 'month' },
          { text: '本年', val: 'year' }
        ]
      },
      selectionList: [],
      tableFromLog: {
        page: 1,
        limit: 10
      },
      tableDataLog: {
        data: [],
        total: 0
      },
      LogLoading: false,
      dialogVisible: false,
      orderDatalist: null,
      orderDetails: {},
      result: []
    }
  },
  mounted() {
    // if (this.$route.query.hasOwnProperty('sn')) {
    //   this.tableFrom.order_sn = this.$route.query.sn
    // } else {
    //   this.tableFrom.order_sn = ''
    // }
    this.getList(1)
  },
  // 被缓存接收参数
  activated() {
    // if (this.$route.query.hasOwnProperty('sn')) {
    //   this.tableFrom.order_sn = this.$route.query.sn
    // } else {
    //   this.tableFrom.order_sn = ''
    // }
    // this.getList(1)
  },
  methods: {
    // 订单详情
    onOrderDetail(order_sn) {
      this.$router.push({
        name: 'OrderList',
        query: {
          order_sn: order_sn
        }
      })
    },
    // 退款
    onOrderStatus(id) {
      this.$modalForm(refundorderStatusApi(id)).then(() => this.getList(''))
    },
    // 确认收货
    confirmReceipt(row) {
      const that = this
      const h = this.$createElement
      this.$msgbox({
        title: '是否确认收货？',
        message: h('div', null, [
          h('p', null, '退货物流公司：' + row.delivery_type),
          h('p', null, '退货快递单号：' + row.delivery_id)
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            confirmReceiptApi(row.refund_order_id)
              .then(res => {
                that.$message.success(res.message)
                done()
                that.getList('')
              })
              .catch(({ res }) => {
                that.$message.error(res.message)
              })
          } else {
            done()
          }
        }
      }).then(action => {}).catch(e => e)// 注意这里，这里是重点！！！;
    },
    /**导出退款单 */
    async exports() {
      let excelData = JSON.parse(JSON.stringify(this.tableFrom)), data = []
      excelData.page = 1
      let pageCount = 1
      let lebData = {};
      for (let i = 0; i < pageCount; i++) {
        lebData = await this.downData(excelData)
        pageCount = Math.ceil(lebData.count/excelData.limit)
        if (lebData.export.length) {
          data = data.concat(lebData.export)
          excelData.page++
        }  
      }
      createWorkBook(lebData.header, lebData.title, data, lebData.foot,lebData.filename);
      return
    },
    /**资金流水 */
    downData(excelData) {
      return new Promise((resolve, reject) => {
        refundListImportApi(excelData).then((res) => {
          return resolve(res.data)
        })
      })
    },
    getExportFileList() {
      refundListImportApi()
        .then((res) => {
          const h = this.$createElement
          this.$msgbox({
            title: '提示',
            message: h('p', null, [
              h('span', null, '文件正在生成中，请稍后点击"'),
              h('span', { style: 'color: teal' }, '导出记录'),
              h('span', null, '"查看~ ')
            ]),
            confirmButtonText: '我知道了'
          }).then(action => {
            this.$router.push({ path: this.roterPre + '/export/list' })
          })
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    getTotal(row) {
      let sum = 0
      for (let i = 0; i < row.length; i++) {
        sum += row[i].product ? row[i].product.cart_info.productAttr.price * row[i].refund_num : ''
      }
      return sum
    },
    // 预售商品退款金额
    getPresellTotal(row) {
      let sum = 0
      for (let i = 0; i < row.length; i++) {
        sum += row[i].product ? row[i].product.cart_info.productPresellAttr.presell_price * row[i].refund_num : ''
      }
      return sum
    },
    // 助力商品退款金额
    getAssistTotal(row) {
      let sum = 0
      for (let i = 0; i < row.length; i++) {
        sum += row[i].product ? row[i].product.cart_info.productAssistAttr.assist_price * row[i].refund_num : ''
      }
      return sum
    },
    // 详情
    onRefundOrderDetail(id) {
      this.orderId = id
      this.$refs.orderDetail.dialogVisible = true
      this.loading = true
      refundorderDetailApi(id)
        .then(res => {
          this.orderDatalist = res.data
          this.loading = false
          this.$refs.orderDetail.onOrderLog(id)
        })
        .catch(({ message }) => {
          this.loading = false
          this.$message.error(message)
        })
    },
    // 订单记录
    onOrderLog(id) {
      this.dialogVisible = true
      this.LogLoading = true
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
    pageChangeLog(page) {
      this.tableFromLog.page = page
      this.getList('')
    },
    handleSizeChangeLog(val) {
      this.tableFromLog.limit = val
      this.getList('')
    },
    // 订单删除
    handleDelete(row, idx) {
      if (row.is_del === 1) {
        this.$modalSure().then(() => {
          refundorderDeleteApi(row.refund_order_id)
            .then(({ message }) => {
              this.$message.success(message)
              this.tableData.data.splice(idx, 1)
            })
            .catch(({ message }) => {
              this.$message.error(message)
            })
        })
      } else {
        this.$confirm(
          '您选择的的订单存在用户未删除的订单，无法删除用户未删除的订单！',
          '提示',
          {
            confirmButtonText: '确定',
            type: 'error'
          }
        )
      }
    },
    // 备注
    onOrderMark(id) {
      this.$modalForm(refundorderMarkApi(id)).then(() => this.getList(''))
    },
    // 选择时间
    selectChange(tab) {
      this.tableFrom.date = tab
      this.timeVal = []
      this.getList(1)
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e
      this.tableFrom.date = e ? this.timeVal.join('-') : ''
      this.getList(1)
    },
    // 编辑
    edit(id) {
      this.$modalForm(orderUpdateApi(id)).then(() => this.getList(''))
    },
    // 发货
    send(id) {
      this.$modalForm(orderDeliveryApi(id)).then(() => this.getList(''))
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num || this.tableFrom.page
      refundorderListApi(this.tableFrom)
        .then(res => {
          this.orderChartType = res.data.stat
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.listLoading = false
        })
        .catch(res => {
          this.$message.error(res.message)
          this.listLoading = false
        })
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getList()
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList()
    },
    openLogistics(row) {
      this.orderDetails = row
      this.getOrderData(row.refund_order_id)
      this.dialogLogistics = true
    },
    handleClose() {
      this.dialogLogistics = false
      this.dialogConfirm = false
    },
    // 获取订单物流信息
    getOrderData(id) {
      refundorderExpressApi(id)
        .then(async res => {
          this.result = res.data
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-table-expands {
  /deep/ label {
    width: 110px !important;
    color: #99a9bf;
  }
}
.selWidth {
  width: 300px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 12px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.tabBox_tit {
  width: 60%;
  font-size: 12px !important;
  margin: 0 2px 0 10px;
  letter-spacing: 1px;
  padding: 5px 0;
  box-sizing: border-box;
}
</style>
