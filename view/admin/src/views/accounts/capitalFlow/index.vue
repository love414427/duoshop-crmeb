<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px">
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
                @keyup.enter.native="getList(1)"
                placeholder="请输入订单号/用户昵称"
                class="selWidth"
                size="small"
              >
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
              </el-input>
              <el-button size="small" type="primary" icon="el-icon-top" @click="exports">列表导出</el-button>
              <!-- <el-button size="small" type="primary" @click="getExportFileList">导出记录</el-button> -->
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
        <el-table-column label="订单号" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.financial_type != 'sys_accoubts'">{{ scope.row.order_sn }}</span>
            <span v-else>{{ scope.row.financial_record_sn }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="financial_record_sn" label="交易流水号" min-width="100" />
        <el-table-column prop="create_time" label="交易时间" min-width="100" sortable />
        <el-table-column prop="user_info" label="对方信息" min-width="80" />
        <el-table-column label="交易类型" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.financial_type | transactionTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收支金额（元）" min-width="100" >
          <template slot-scope="scope">
            <span>{{ scope.row.financial_pm === 1 ? scope.row.number : -scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <router-link v-if="scope.row.financial_type == 'sys_accoubts'" :to=" { path:`${roterPre}` + '/accounts/reconciliation?reconciliation_id='+scope.row.order_id } ">
              <el-button type="text" size="small" class="mr10">详情</el-button>
            </router-link>
            <router-link v-else-if="scope.row.financial_type == 'order' || scope.row.financial_type == 'brokerage_one' || scope.row.financial_type == 'brokerage_two'" :to=" { path:`${roterPre}` + '/order/list?order_sn='+scope.row.order_sn } ">
              <el-button type="text" size="small" class="mr10">详情</el-button>
            </router-link>
            <router-link v-else :to=" { path:`${roterPre}` + '/order/refund?refund_order_sn='+scope.row.order_sn } ">
              <el-button type="text" size="small" class="mr10">详情</el-button>
            </router-link>
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
import { capitalFlowLstApi, capitalFlowExportApi, getStatisticsApi } from '@/api/accounts'
import { fromList } from '@/libs/constants.js'
import createWorkBook from '@/utils/newToExcel.js'
import fileList from '@/components/exportFile/fileList'
import { roterPre } from '@/settings'
import cardsData from "@/components/cards/index";
export default {
  name: 'AccountsCapitalFlow',
  components: { fileList, cardsData },
  data() {
    return {
      timeVal: [],
      tableData: {
        data: [],
        total: 0
      },
      roterPre: roterPre,
      listLoading: true,
      tableFrom: {
        date: '',
        keyword: '',
        page: 1,
        limit: 20
      },
      fromList: fromList,
      options: [],
      cardLists: [],
    }
  },
  mounted() {
    this.getList()
    this.getStatisticalData()
  },
  methods: {
    // 时间选择
    selectChange(tab) {
      this.tableFrom.date = tab
      this.timeVal = []
      this.tableFrom.page = 1;
      this.getList()
      this.getStatisticalData()
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e
      this.tableFrom.date = e ? this.timeVal.join('-') : ''
      this.tableFrom.page = 1;
      this.getList()
      this.getStatisticalData()
    },
    //获取统计数据
    getStatisticalData(){
        getStatisticsApi({date:this.tableFrom.date}).then((res) => {
          this.cardLists = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    async exports(x) {
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
        capitalFlowExportApi(excelData).then((res) => {
          return resolve(res.data)
        })
      })
    },
    // 导出
    exportRecord() {
      capitalFlowExportApi(this.tableFrom)
        .then((res) => {
          /*this.$message.success(res.message)
          this.$refs.exportList.exportFileList()*/
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
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page;
      capitalFlowLstApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.listLoading = false
        })
        .catch((res) => {
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
    }
  }
}
</script>

<style scoped>
.selWidth {
  width: 320px;
}
</style>
