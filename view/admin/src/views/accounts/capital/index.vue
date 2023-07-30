<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px">
            <el-form-item label="时间选择：" class="width100">
              <el-radio-group v-model="tableFrom.date" type="button" class="mr20" size="small" @change="selectChange(tableFrom.date)">
                <el-radio-button v-for="(item,i) in fromList.fromTxt" :key="i" :label="item.val">{{ item.text }}</el-radio-button>
              </el-radio-group>
              <el-date-picker v-model="timeVal" value-format="yyyy/MM/dd" format="yyyy/MM/dd" size="small" type="daterange" placement="bottom-end" placeholder="自定义时间" style="width: 250px;" @change="onchangeTime" />
            </el-form-item>
            <el-form-item label="明细类型：">
              <el-select v-model="tableFrom.type" class="selWidth" filterable clearable placeholder="请选择" @change="getList(1)">
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :label="item.title"
                  :value="item.type"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="关键字：" class="width100">
              <el-input v-model="tableFrom.keyword" @keyup.enter.native="getList(1)" placeholder="微信昵称/姓名/支付宝账号/银行卡号" class="selWidth" size="small">
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
        <el-table-column
          prop="uid"
          label="会员ID"
          width="80"
        />
        <el-table-column
          prop="nickname"
          label="昵称"
          min-width="130"
        />
        <el-table-column
          prop="number"
          label="金额"
          min-width="120"
        />
        <el-table-column
          label="明细类型"
          min-width="100"
          prop="title"
        />
        <el-table-column
          prop="mark"
          label="备注"
          min-width="200"
        />
        <el-table-column
          prop="create_time"
          label="创建时间"
          min-width="150"
        />
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
import { billListApi, billTypeApi, fundingRecordsExportApi } from '@/api/accounts'
import { fromList } from '@/libs/constants.js'
import createWorkBook from '@/utils/newToExcel.js'
import fileList from '@/components/exportFile/fileList'
export default {
  components: { fileList },
  name: 'AccountsCapital',
  data() {
    return {
      timeVal: [],
      tableData: {
        data: [],
        total: 0
      },
      listLoading: true,
      tableFrom: {
        type: '',
        date: '',
        keyword: '',
        page: 1,
        limit: 20
      },
      fromList: fromList,
      options: []
    }
  },
  mounted() {
    this.getTypes()
    this.getList()
  },
  methods: {
    selectChange(tab) {
      this.tableFrom.date = tab
      this.timeVal = []
      this.tableFrom.page = 1;
      this.getList()
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e
      this.tableFrom.date = e ? this.timeVal.join('-') : ''
      this.tableFrom.page = 1;
      this.getList()
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
    /**资金记录 */
    downData(excelData) {
      return new Promise((resolve, reject) => {
        fundingRecordsExportApi(excelData).then((res) => {
          return resolve(res.data)
        })
      })
    },
    // 导出
    exportRecord() {
      fundingRecordsExportApi(this.tableFrom)
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
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page;
      billListApi(this.tableFrom).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.listLoading = false
      }).catch((res) => {
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
    getTypes() {
      billTypeApi().then(res => {
        this.options = res.data
        localStorage.setItem('CashKey', JSON.stringify(res.data))
      }).catch((res) => {
        this.$message.error(res.message)
      })
    }
  }
}
</script>

<style scoped>
  .selWidth{
    width: 300px;
  }
</style>
