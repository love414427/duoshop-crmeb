<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px">
            <el-form-item label="订单状态：">
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
            <el-form-item label="商户类别：" style="display: inline-block;">
              <el-select
                v-model="tableFrom.is_trader"
                clearable
                placeholder="请选择"
                class="selWidth"
                @change="getList(1)"
              >
                <el-option label="自营" value="1" />
                <el-option label="非自营" value="0" />
              </el-select>
            </el-form-item>
            <el-form-item label="退款单号：" style="display: inline-block;">
              <el-input
                v-model="tableFrom.refund_order_sn"
                @keyup.enter.native="getList(1)"
                placeholder="请输入订单号"
                class="selWidth"
                size="small"
                clearable
              >
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
            <el-form-item label="订单单号：" style="display: inline-block;">
              <el-input
                v-model="tableFrom.order_sn"
                @keyup.enter.native="getList(1)"
                placeholder="请输入订单号"
                class="selWidth"
                size="small"
                clearable
              >
              <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
              </el-input>
              <el-button size="small" type="primary" icon="el-icon-top" @click="exports">列表导出</el-button>
              <!-- <el-button size="small" type="primary" @click="getExportFileList">导出记录</el-button> -->
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
              <el-form-item label="退款商品总价：">
                <span>{{ getTotal(props.row.refundProduct) }}</span>
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
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="退款单号" min-width="170">
          <template slot-scope="scope">
            <span style="display: block;" v-text="scope.row.refund_order_sn" />
            <span v-show="scope.row.is_del > 0" style="color: #ED4014;display: block;">用户已删除</span>
          </template>
        </el-table-column>
        <el-table-column prop="user.nickname" label="用户信息" min-width="130" />
        <el-table-column prop="merchant.mer_name" label="商户名称" min-width="130" />
        <el-table-column prop="mer_name" label="商户类别" min-width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.merchant" class="spBlock">{{ scope.row.merchant.is_trader ? '自营' : '非自营' }}</span>
          </template>
        </el-table-column>
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
                class="tabBox_pice"
              >{{ '￥'+ val.product.cart_info.productAttr.price + ' x '+ val.product.product_num }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="serviceScore" label="订单状态" min-width="250">
          <template slot-scope="scope">
            <span style="display: block">{{ scope.row.status | orderRefundFilter }}</span>
            <span style="display: block">退款原因：{{ scope.row.refund_message }}</span>
            <span style="display: block">状态变更时间：{{ scope.row.status_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="onOrderDetail(scope.row.order.order_sn)"
            >订单详情</el-button>
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
    <!--导出订单列表-->
    <file-list ref="exportList" />
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
  refundorderListApi,
  orderUpdateApi,
  orderDeliveryApi, exportRefundOrderApi
} from "@/api/order";
import createWorkBook from '@/utils/newToExcel.js';
import { fromList } from "@/libs/constants.js";
import fileList from '@/components/exportFile/fileList'
export default {
  components: { fileList },
  name: "OrderRefund",
  data() {
    return {
      orderId: 0,
      tableData: {
        data: [],
        total: 0,
      },
      listLoading: true,
      tableFrom: {
        refund_order_sn: this.$route.query.refund_order_sn ? this.$route.query.refund_order_sn : "",
        order_sn: "",
        status: "",
        date: "",
        page: 1,
        limit: 20,
        is_trader: ''
      },
      orderChartType: {},
      timeVal: [],
      fromList: fromList,
      selectionList: [],
      ids: "",
      tableFromLog: {
        page: 1,
        limit: 10,
      },
      tableDataLog: {
        data: [],
        total: 0,
      },
      LogLoading: false,
      dialogVisible: false,
      cardLists: [],
      orderDatalist: null,
    };
  },
  mounted() {
    if (this.$route.query.hasOwnProperty("sn")) {
      this.tableFrom.order_sn = this.$route.query.sn;
    } else {
      this.tableFrom.order_sn = "";
    }
    this.getList('');
  },
  // 被缓存接收参数
  activated() {
    if (this.$route.query.hasOwnProperty("sn")) {
      this.tableFrom.order_sn = this.$route.query.sn;
    } else {
      this.tableFrom.order_sn = "";
    }
    this.getList('');
  },
  methods: {
    // 订单详情
    onOrderDetail(order_sn) {
      this.$router.push({
        name: "OrderList",
        query: {
          order_sn: order_sn,
        },
      });
    },
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
    /**订单列表 */
    downData(excelData) {
      return new Promise((resolve, reject) => {
        exportRefundOrderApi(excelData).then((res) => {
          return resolve(res.data)
        })
      })
    },
    // 导出
    exportRecord() {
      exportRefundOrderApi(this.tableFrom)
        .then((res) => {
          const h = this.$createElement;
          this.$msgbox({
            title: '提示',
            message: h('p', null, [
              h('span', null, '文件正在生成中，请稍后点击"'),
              h('span', { style: 'color: teal' }, '导出记录'),
              h('span', null, '"查看~ '),
            ]),
            confirmButtonText: '我知道了',
          }).then(action => {

          });
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    // 导出列表
    getExportFileList() {
      this.$refs.exportList.exportFileList()
    },
    getTotal(row) {
      let sum = 0;
      for (let i = 0; i < row.length; i++) {
        sum += row[i].product.cart_info.productAttr.price * row[i].refund_num;
      }
      return sum;
    },
    pageChangeLog(page) {
      this.tableFromLog.page = page;
      this.getList('');
    },
    handleSizeChangeLog(val) {
      this.tableFromLog.limit = val;
      this.getList(1);
    },
    // 选择时间
    selectChange(tab) {
      this.tableFrom.date = tab;
      this.tableFrom.page = 1;
      this.timeVal = [];
      this.getList('');
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e;
      this.tableFrom.date = e ? this.timeVal.join("-") : "";
      this.tableFrom.page = 1;
      this.getList('');
    },
    // 编辑
    edit(id) {
      this.$modalForm(orderUpdateApi(id)).then(() => this.getList(''));
    },
    // 发货
    send(id) {
      this.$modalForm(orderDeliveryApi(id)).then(() => this.getList(''));
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      refundorderListApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
          this.orderChartType = res.data.stat;
          this.cardLists = res.data.stat;
          this.listLoading = false;
        })
        .catch((res) => {
          this.$message.error(res.message);
          this.listLoading = false;
        });
    },
    pageChange(page) {
      this.tableFrom.page = page;
      this.getList('');
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      this.getList(1);
    },
  },
};
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
