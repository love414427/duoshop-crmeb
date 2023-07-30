<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" inline label-width="100px">
            <el-form-item label="订单状态：">
              <el-radio-group v-model="tableFrom.order_type" type="button" @change="getList(1)">
                <el-radio-button label="">全部 </el-radio-button>
                <el-radio-button label="1">待付款</el-radio-button>
                <el-radio-button label="2">待发货</el-radio-button>
                <el-radio-button label="3">待收货</el-radio-button>
                <el-radio-button label="4">待评价</el-radio-button>
                <el-radio-button label="5">交易完成</el-radio-button>
                <el-radio-button label="6">已退款</el-radio-button>
                <el-radio-button label="7">已删除</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="时间选择：" class="width100">
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
            <el-form-item label="关键字：" class="width100">
              <el-input
                v-model="tableFrom.keyword"
                placeholder="请输入订单号/收货人/联系方式"
                class="selWidth"
                size="small"
                @keyup.enter.native="getList(1)"
              >
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
            <el-form-item label="开票状态：">
              <el-select
                v-model="tableFrom.status"
                placeholder="请选择"
                class="filter-item selWidth mr20"
                clearable
                @change="getList"
              >
                <el-option
                  v-for="item in invoiceStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="用户信息：" class="width100">
              <el-input
                v-model="tableFrom.username"
                placeholder="请输入用户昵称/手机号"
                class="selWidth"
                size="small"
                @keyup.enter.native="getList(1)"
              >
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
            <el-button style="display: block;" size="small" type="primary" @click="getInvoiceInfo('','invoice')">
              合并开票
            </el-button>
          </el-form>
        </div>
      </div>
      <el-table
        ref="multipleSelection"
        v-loading="listLoading"
        tooltip-effect="dark"
        :row-key="(row) => { return row.order_receipt_id }"
        :data="tableData.data"
        style="width: 100%"
        class="table"
        size="mini"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          :reserve-selection="true"
          width="55"
        />
        <el-table-column prop="storeOrder.order_sn" label="订单号" min-width="170" />
        <el-table-column prop="user.nickname" label="用户昵称" min-width="90" />
        <el-table-column prop="order_price" label="订单金额" min-width="90" />
        <el-table-column label="订单状态" min-width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.storeOrder && scope.row.storeOrder.paid === 0 && scope.row.storeOrder.status === 0">待付款</span>
            <span v-else>{{ scope.row.storeOrder && scope.row.storeOrder.status | orderStatusFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="receipt_price" label="发票金额" min-width="90" />
        <el-table-column prop="receipt_sn" label="发票单号" min-width="120" />
        <el-table-column label="发票类型" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.receipt_info">{{ scope.row.receipt_info.receipt_type == 1 ? '普通发票' : '专用发票' }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="发票抬头" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.receipt_info.receipt_title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发票联系人" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.storeOrder && scope.row.storeOrder.real_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发票联系信息" min-width="120">
          <template slot-scope="scope">
            <span>{{ (scope.row.delivery_info&&scope.row.delivery_info.email) ? scope.row.delivery_info.email : scope.row.delivery_info.user_address && scope.row.delivery_info.user_address + scope.row.delivery_info.user_phone && scope.row.delivery_info.user_phone }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="create_time" label="下单时间" min-width="120" /> -->
        <el-table-column label="开票状态" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.status == 1 ? '已开' : '未开' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mer_mark" label="发票备注" min-width="120" />
        <el-table-column label="操作" min-width="180" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === 0 && scope.row.storeOrder && scope.row.storeOrder.paid === 1" type="text" size="small" @click="getInvoiceInfo(scope.row.order_receipt_id,'invoice')">开票</el-button>
            <el-button type="text" size="small" @click="onOrderDetail(scope.row.order_id)">订单详情</el-button>
            <el-button v-if="scope.row.status" type="text" size="small" @click="getInvoiceInfo(scope.row.order_receipt_id,'edit')">编辑</el-button>
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
    <!--开票-->
    <el-dialog v-if="dialogVisible" :title="invoiceInfo.title" :visible.sync="dialogVisible" width="900px">
      <div v-loading="loading">
        <div class="box-container">
          <div class="acea-row">
            <div class="list sp"><label class="name" style="color: #333;">发票详情</label></div>
            <div class="list sp"><label class="name" style="color: #333;">发票申请单号：</label>{{ invoiceInfo.receipt_sn }}</div>
          </div>
          <div class="title">发票信息</div>
          <div class="acea-row">
            <div class="list sp"><label class="name">发票抬头：</label>{{ invoiceInfo.receipt_info.receipt_title }}</div>
            <div class="list sp"><label class="name">发票类型：</label>{{ invoiceInfo.receipt_info.receipt_type == 1 ? '普通发票' : '专用发票' }}</div>
            <div class="list sp"><label class="name">发票抬头类型：</label>{{ invoiceInfo.receipt_info.receipt_title_type == '1' ? '个人' : '企业' }}</div>
            <div class="list sp"><label class="name">发票金额：</label>{{ invoiceInfo.receipt_price }}</div>
            <div v-if="invoiceInfo.receipt_info.receipt_title_type == '2'" class="list sp"><label class="name">企业税号：</label>{{ invoiceInfo.receipt_info.duty_paragraph }}</div>
            <div v-if="invoiceInfo.receipt_info.receipt_type == 2" class="list sp"><label class="name">开户银行：</label>{{ invoiceInfo.receipt_info.bank_name }}</div>
            <div v-if="invoiceInfo.receipt_info.receipt_type == 2" class="list sp"><label class="name">银行账号：</label>{{ invoiceInfo.receipt_info.bank_code }}</div>
            <div v-if="invoiceInfo.receipt_info.receipt_type == 2" class="list sp"><label class="name">企业地址：</label>{{ invoiceInfo.receipt_info.address }}</div>
            <div v-if="invoiceInfo.receipt_info.receipt_type == 2" class="list sp"><label class="name">企业电话：</label>{{ invoiceInfo.receipt_info.tel }}</div>
          </div>
          <div class="title">联系信息：</div>
          <div v-if="invoiceInfo.receipt_info.receipt_type == 1" class="acea-row">
            <div class="list sp"><label class="name">联系邮箱：</label>{{ invoiceInfo.delivery_info.email }}</div>
          </div>
          <div v-else class="acea-row">
            <div class="list sp"><label class="name">联系人姓名：</label>{{ invoiceInfo.delivery_info.user_name }}</div>
            <div class="list sp"><label class="name">联系人电话：</label>{{ invoiceInfo.delivery_info.user_phone }}</div>
            <div class="list sp"><label class="name">联系人地址：</label>{{ invoiceInfo.delivery_info.user_address }}</div>
          </div>
          <div class="acea-row">
            <div class="list sp"><label class="name">开票状态：</label>{{ invoiceInfo.status == 1 ? '已开' : '未开' }}</div>
            <div class="list sp100"><label class="name">发票号码：</label><span class="info"><el-input v-model="invoiceData.number" @keyup.native="invoiceData.number=invoiceData.number.replace(/[^\w]/g,'')" /></span></div>
            <div class="list sp100"><label class="name">发票备注：</label><span class="info"><el-input v-model="invoiceData.mark" type="textarea" :rows="5" /></span></div>
          </div>
          <el-button style="width: 100%; margin-top: 15px;" type="primary" @click="handleInvoic">确定</el-button>
        </div>
      </div>
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
  invoiceOrderListApi,
  invoiceUpdateApi,
  invoiceDetailApi,
  invoiceInfoApi,
  invoiceApi
} from '@/api/order'

export default {
  name: 'OrderInvoice',
  data() {
    return {
      logisticsName: 'refund',
      id: 0,
      type: '',
      tableData: {
        data: [],
        total: 0
      },
      invoiceStatusList: [
        { label: '已开票', value: 1 },
        { label: '未开票', value: 0 }
      ],
      listLoading: true,
      tableFrom: {
        username: '',
        type: '',
        date: '',
        page: 1,
        limit: 20,
        receipt_sn: '',
        order_type: '',
        keyword: '',
        status: ''
      },
      orderChartType: {},
      timeVal: [],
      multipleSelection: [],
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
        limit: 20
      },
      tableDataLog: {
        data: [],
        total: 0
      },
      loading: false,
      dialogVisible: false,
      orderDatalist: null,
      invoiceInfo: {

      },
      invoiceData: {
        number: '',
        mark: ''
      }

    }
  },
  mounted() {
    if (this.$route.query.hasOwnProperty('sn')) {
      this.tableFrom.order_sn = this.$route.query.sn
    } else {
      this.tableFrom.order_sn = ''
    }
    this.getList(1)
  },

  methods: {
    // 订单详情
    onOrderDetail(order_id) {
      this.$router.push({
        name: 'OrderList',
        query: {
          id: order_id
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    pageChangeLog(page) {
      this.tableFromLog.page = page
      this.getList('')
    },
    handleSizeChangeLog(val) {
      this.tableFromLog.limit = val
      this.getList('')
    },
    // 开票信息
    getInvoiceInfo(id, type) {
      this.id = id
      this.type = type
      const ids = id ? id.toString() : this.getInvoic()
      const params = { ids: ids }
      type === 'invoice'
        ? invoiceInfoApi(params)
          .then(res => {
            this.listLoading = false
            this.dialogVisible = true
            this.invoiceInfo = res.data
            this.invoiceData = {
              number: '',
              mark: ''
            }
          })
          .catch(res => {
            this.$message.error(res.message)
            this.listLoading = false
          })
        : invoiceDetailApi(id) // 编辑详情
          .then(res => {
            this.listLoading = false
            this.dialogVisible = true
            this.invoiceInfo = res.data
            this.invoiceData = {
              number: res.data.receipt_no,
              mark: res.data.mer_mark
            }
          })
          .catch(res => {
            this.$message.error(res.message)
            this.listLoading = false
          })
    },
    // 开票
    handleInvoic() {
      const ids = this.id ? this.id.toString() : this.getInvoic()
      const params = {
        ids: ids,
        receipt_sn: this.invoiceInfo.receipt_sn,
        receipt_price: this.invoiceInfo.receipt_price,
        receipt_no: this.invoiceData.number,
        mer_mark: this.invoiceData.mark ? this.invoiceData.mark : ''
      }
      this.type === 'invoice'
        ? invoiceApi(params)
          .then(res => {
            this.$message.success(res.message)
            this.dialogVisible = false
            this.getList()
            this.id = ''
          })
          .catch(res => {
            this.$message.error(res.message)
            this.listLoading = false
          })
        : invoiceUpdateApi(this.id, { receipt_no: this.invoiceData.number, mer_mark: this.invoiceData.mark ? this.invoiceData.mark : '' })
          .then(res => {
            this.$message.success(res.message)
            this.dialogVisible = false
            this.getList()
            this.id = ''
          })
          .catch(res => {
            this.$message.error(res.message)
            this.listLoading = false
          })
    },
    // 获取开票订单id
    getInvoic() {
      const ids = []
      this.multipleSelection.forEach(function(item, index) {
        ids.push(item.order_receipt_id)
      })
      return ids.toString()
    },
    // 编辑
    onOrderMark(id) {
      // this.$modalForm(invoiceorderMarkApi(id)).then(() => this.getList(''))
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
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num || this.tableFrom.page
      invoiceOrderListApi(this.tableFrom)
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

    handleClose() {
      this.dialogLogistics = false
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__title{
  font-weight: bold;
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
.box-container {
  overflow: hidden;
  padding: 0 10px;
}
.box-container .title{
  margin: 15px 0 10px;
  color: #333;
  font-weight: bold;
  border-bottom: 1px solid #dfe6ec;
}

.box-container .list {
  float: left;
  line-height: 40px;
}
.box-container .list .info{
  display: block;
  .el-textarea{
   margin-top: 10px;
  }
}

.box-container .sp {
  width: 50%;
}
.box-container .sp3 {
  width: 33.3333%;
}
.box-container .sp100 {
  width: 100%;
}
.box-container .list .name {
  align-items: center;
  width: 100px;
  color: #606266;
}
.acea-row{
  margin-bottom: 25px;
}
</style>
