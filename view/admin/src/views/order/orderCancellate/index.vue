<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--<el-tabs v-model="tableFrom.type" @tab-click="getList">-->
        <!--<el-tab-pane label="全部订单" name="" />-->
        <!--<el-tab-pane label="普通订单" name="1" />-->
        <!--<el-tab-pane label="拼团订单" name="2" />-->
        <!--<el-tab-pane label="秒杀订单" name="3" />-->
        <!--<el-tab-pane label="助力订单" name="4" />-->
        <!--</el-tabs>-->
        <div class="container">
          <el-form size="small" label-width="100px">
            <el-form-item label="核销时间：" class="width100">
              <el-radio-group
                v-model="tableFrom.date"
                type="button"
                class="mr20"
                size="small"
                clearable
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
                clearable
                @change="onchangeTime"
              />
            </el-form-item>
            <el-form-item label="订单号：" class="width100">
              <el-input
                v-model="tableFrom.keywords"
                @keyup.enter.native="getList(1),getCardList()"
                placeholder="请输入订单号/收货人/联系方式"
                class="selWidth"
                size="small"
                clearable
              >
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1),getCardList()" />
              </el-input>
              <!-- <el-button size="small" type="primary" @click="exportOrder">列表导出</el-button>
              <el-button size="small" type="primary" @click="getExportFileList">导出记录</el-button> -->
            </el-form-item>
            <el-form-item label="商户类别：" style="display: inline-block;">
              <el-select
                v-model="tableFrom.is_trader"
                clearable
                placeholder="请选择"
                class="selWidth"
                @change="getList(1),getCardList()"
              >
                <el-option label="自营" value="1" />
                <el-option label="非自营" value="0" />
              </el-select>
            </el-form-item>
            <el-form-item label="用户信息：" class="width100" style="display: inline-block;">
              <el-input
                v-model="tableFrom.username"
                @keyup.enter.native="getList(1),getCardList()"
                placeholder="请输入用户信息/联系电话"
                class="selWidth"
                size="small"
              >
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1),getCardList()" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <cards-data :card-lists="cardLists" />
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
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品总价：">
                <span>{{ props.row.total_price | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="用户备注：">
                <span>{{ props.row.mark | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="商家备注：">
                <span>{{ props.row.remark | filterEmpty }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单编号" min-width="180">
          <template slot-scope="scope">
            <span style="display: block;" v-text="scope.row.order_sn" />
            <span v-show="scope.row.is_del > 0" style="color: #ED4014;display: block;">用户已删除</span>
          </template>
        </el-table-column>
        <el-table-column label="订单类型" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.order_type == 0 ? "普通订单" : "核销订单" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商户名称" min-width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.merchant">{{ scope.row.merchant.mer_name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mer_name" label="商户类别" min-width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.merchant" class="spBlock">{{ scope.row.merchant.is_trader ? '自营' : '非自营' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="real_name" label="收货人" min-width="100" />
        <el-table-column label="商品信息" min-width="330">
          <template slot-scope="scope">
            <div
              v-for="(val, i ) in scope.row.orderProduct"
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
              <span
                class="tabBox_pice"
              >{{ '￥'+ val.cart_info.productAttr.price + ' x '+ val.product_num }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="pay_price" label="实际支付" min-width="100" />
        <el-table-column prop="serviceScore" label="核销员" min-width="80">
        <template slot-scope="scope">
            <span v-if="scope.row.paid">{{ scope.row.verifyService ? scope.row.verifyService.nickname : "管理员核销" }}</span>
          </template>
        </el-table-column>
       <el-table-column prop="serviceScore" label="核销状态" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.status >= 2 ? "已核销" : "未核销" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="verify_time" label="核销时间" min-width="150" />
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
  takeOrderListApi,
  takeChartApi,
  exportOrderApi,
  takeCardListApi
} from "@/api/order";
import fileList from "@/components/exportFile/fileList";
import cardsData from "@/components/cards/index";
export default {
  components: { cardsData, fileList },
  data() {
    return {
      orderId: 0,
      tableData: {
        data: [],
        total: 0,
      },
      listLoading: true,
      tableFrom: {
        order_sn: "",
        status: "",
        date: "",
        page: 1,
        limit: 20,
        order_type: "1",
        username: "",
        keywords: '',
        is_trader: ''
      },
      orderChartType: {},
      timeVal: [],
      fromList: {
        title: "选择时间",
        custom: true,
        fromTxt: [
          { text: "全部", val: "" },
          { text: "今天", val: "today" },
          { text: "昨天", val: "yesterday" },
          { text: "最近7天", val: "lately7" },
          { text: "最近30天", val: "lately30" },
          { text: "本月", val: "month" },
          { text: "本年", val: "year" },
        ],
      },
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
      fileVisible: false,
      cardLists: [],
      orderDatalist: null,
    };
  },
  mounted() {
    this.headerList();
    this.getCardList()
    this.getList('');
  },
  methods: {
    // 导出
    exportOrder() {
      exportOrderApi({
        status: this.tableFrom.status,
        date: this.tableFrom.date,
        take_order: 1
      })
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
          this.$message.error(res.message);
        });
    },
    getExportFileList() {
      this.fileVisible = true;
      this.$refs.exportList.exportFileList('order');
    },
    pageChangeLog(page) {
      this.tableFromLog.page = page;
      this.getList('');
    },
    handleSizeChangeLog(val) {
      this.tableFromLog.limit = val;
      this.getList('');
    },
    // 打印订单
    printOrder(id) {
      orderPrintApi(id)
        .then((res) => {
          this.$message.success(res.message);
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 选择时间
    selectChange(tab) {
      this.timeVal = [];
      this.tableFrom.date = tab;
      this.tableFrom.page = 1;
      this.getCardList();
      this.getList(1);
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e;
      this.tableFrom.date = e ? this.timeVal.join("-") : "";
      this.tableFrom.page = 1;
      this.getCardList();
      this.getList(1);
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      takeOrderListApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
        //   this.cardLists = res.data.stat;
          this.listLoading = false;
        //   this.getCardList();
        })
        .catch((res) => {
          this.$message.error(res.message);
          this.listLoading = false;
        });
    },
    getCardList(){
        takeCardListApi(this.tableFrom)
        .then((res) => {
          this.cardLists = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    pageChange(page) {
      this.tableFrom.page = page;
      this.getList('');
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      this.getList('');
    },
    headerList() {
      takeChartApi()
        .then((res) => {
          this.orderChartType = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
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
