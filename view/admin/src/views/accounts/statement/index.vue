<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="filter-container">
          <el-form size="small" label-width="120px" :inline="true">
            <el-form-item label="时间选择：" class="mr10">
              <el-date-picker
                v-model="timeVal"
                type="daterange"
                align="right"
                unlink-panels
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy/MM/dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="onchangeTime"
              />
            </el-form-item>
          </el-form>
        </div>
        <cards-data :card-lists="cardLists" />
        <el-tabs v-if="headeNum.length > 0" v-model="tableForm.type" @tab-click="getList(1)">
            <el-tab-pane v-for="(item,index) in headeNum" :key="index" :name="item.type.toString()" :label="item.title" />
        </el-tabs>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="mini"
        class="table"
        highlight-current-row
      >
        <el-table-column label="序号" min-width="90">
            <template scope="scope">
                <span>{{ scope.$index+(tableForm.page - 1) * tableForm.limit + 1 }}</span>
            </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="日期"
          min-width="150"
        />
        <el-table-column
          prop="income"
          label="账期内收入"
          min-width="100"
        />
        <el-table-column
          prop="expend"
          label="账期内支出"
          min-width="150"
        />

        <el-table-column
          prop="charge"
          label="平台应入账金额"
          min-width="120"
        />
        <el-table-column label="操作" min-width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onDetails(scope.row.time)">详情</el-button>
            <el-button type="text" size="small" @click="exports(scope.row.time)">下载账单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block mb20">
        <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          :page-size="tableForm.limit"
          :current-page="tableForm.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>

    <el-dialog
      :title="tableForm.type == 1 ? '日账单详情' : '月账单详情'"
      :visible.sync="dialogVisible"
      width="830px"
      :before-close="handleClose"
      center
    >
      <el-row align="middle" class="ivu-mt mt20">
      <el-col :span="4">
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
        >
          <el-menu-item :name="accountDetails.date">
            <span>{{accountDetails.date}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
          <el-col :span="6">
              <div class="grid-content">
                  <span class="title">{{accountDetails.income && accountDetails.income.title}}</span>
                  <span class="color_red">{{accountDetails.income && accountDetails.income.number}}元</span>
                  <span class="count">{{accountDetails.income && accountDetails.income.count}}</span>
                  <div class="list" v-if="accountDetails.income && accountDetails.income.data && accountDetails.income.data.length > 0">
                      <el-row class="item" v-for="(item,index) in accountDetails.income.data" :key="index">
                          <el-col :span="12" class="name">{{item['0']}}</el-col>
                          <el-col :span="12" class="cost">
                              <span class="cost_num">{{item['1']}}</span>
                              <span class="cost_count">{{item['2']}}</span>
                          </el-col>
                      </el-row>
                  </div>
              </div>
              <el-divider direction="vertical"></el-divider>
          </el-col>
          <el-col :span="6">
              <div class="grid-content">
                  <span class="title">{{accountDetails.bill && accountDetails.bill.title}}</span>
                  <span class="color_red">{{accountDetails.bill && accountDetails.bill.number}}元</span>
                  <span class="count">{{accountDetails.bill && accountDetails.bill.count}}</span>
                  <div class="list" v-if="accountDetails.bill && accountDetails.bill.data && accountDetails.bill.data.length > 0">
                      <el-row class="item" v-for="(item,index) in accountDetails.bill.data" :key="index">
                          <el-col :span="12" class="name">{{item['0']}}</el-col>
                          <el-col :span="12" class="cost">
                              <span class="cost_num">{{item['1']}}</span>
                              <span class="cost_count">{{item['2']}}</span>
                          </el-col>
                      </el-row>
                  </div>
              </div>
              <el-divider direction="vertical"></el-divider>
          </el-col>
          <el-col :span="6">
              <div class="grid-content">
                  <span class="title">{{accountDetails.expend && accountDetails.expend.title}}</span>
                  <span class="color_gray">{{accountDetails.expend && accountDetails.expend.number}}元</span>
                  <span class="count">{{accountDetails.expend && accountDetails.expend.count}}</span>
                  <div class="list" v-if="accountDetails.expend && accountDetails.expend.data && accountDetails.expend.data.length > 0">
                      <el-row class="item" v-for="(item,index) in accountDetails.expend.data" :key="index">
                          <el-col :span="12" class="name">{{item['0']}}</el-col>
                          <el-col :span="12" class="cost">
                              <span class="cost_num">{{item['1']}}</span>
                              <span class="cost_count">{{item['2']}}</span>
                          </el-col>
                      </el-row>
                  </div>
              </div>
              <el-divider direction="vertical"></el-divider>
          </el-col>
          <el-col :span="6">
              <div class="grid-content">
                  <span class="title">{{accountDetails.charge && accountDetails.charge.title}}</span>
                  <span class="color_gray">{{accountDetails.charge && accountDetails.charge.number}}元</span>
              </div>
          </el-col>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">我知道了</el-button>
  </span>
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
import { financialLstApi, financialDetailApi, finaHeaderDataApi, downloadFinancialApi } from '@/api/accounts'
import { roterPre } from '@/settings'
import cardsData from "@/components/cards/index";
import createWorkBook from '@/utils/newToExcel.js';
export default {
  name: 'Record',
  components: { cardsData },
  data() {
    return {
      loading: false,
      roterPre: roterPre,
      timeVal: [],
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },
      tableForm: {
        page: 1,
        limit: 10,
        date: '',
        type: '1',
      },
      ruleForm: {
        status: '0'
      },
      headeNum: [
          {type: 1,title: "日账单"},
          {type: 2,title: "月账单"},
      ],
      dialogVisible: false,
      rules: {
        status: [
          { required: true, message: '请选择对账状态', trigger: 'change' }
        ]
      },
      reconciliationId: 0,
      cardLists: [],
      accountDetails: {
        date: '',
        charge: {},
        expend: {},
        income: {}
      }
    }
  },
  computed: {

  },
  mounted() {
    this.getList('')
    this.getHeaderData()
  },
  methods: {
    onDetails(date) {
      financialDetailApi(this.tableForm.type,{date: date}).then(res => {
        this.dialogVisible = true
        this.accountDetails = res.data
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    getHeaderData(){
       finaHeaderDataApi({date:this.tableForm.date}).then(res => {
           this.cardLists = res.data.stat
       }).catch(res => {
         this.$message.error(res.message)
       })
    },
    async exports(time) {
     let excelData = JSON.parse(JSON.stringify(this.tableForm)), data = []
      excelData.page = 1
      let pageCount = 1
      let lebData = {};
      for (let i = 0; i < pageCount; i++) {
        lebData = await this.downData(excelData,time)
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
    downData(excelData,time) {
      excelData.date = time
      return new Promise((resolve, reject) => {
        downloadFinancialApi(this.tableForm.type,excelData).then((res) => {
          return resolve(res.data)
        })
      })
    },
    handleClose() {
      this.dialogVisible = false
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e
      this.tableForm.date = this.timeVal ? this.timeVal.join('-') : ''
      this.getList('')
      this.getHeaderData()
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableForm.page = num ? num : this.tableForm.page;
      financialLstApi(this.tableForm).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.listLoading = false
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
      })
    },
    pageChange(page) {
      this.tableForm.page = page
      this.getList('')
    },
    handleSizeChange(val) {
      this.tableForm.limit = val
      this.chkName = ''
      this.getList('')
    }
  }
}
</script>

<style lang="scss" scoped>
  .selWidth{
    width: 300px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
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
  .el-menu-item{
      font-weight: bold;
      color: #333;
  }
  /deep/.el-dialog__header{
      text-align: left;
  }
  .el-col{
      position: relative;
      .el-divider--vertical{
        position: absolute;
        height: 100%;
        right: 0;
        top: 0;
        margin: 0;
       }
  }
  .grid-content{
      padding: 0 15px;
      display: block;
      .title,.color_red,.color_gray{
        display: block;
        line-height: 20px;
      }
      .color_red{
        color: red;
        font-weight: bold;
      }
      .color_gray{
        color: #333;
        font-weight: bold;
      }
     .count{
         font-size: 12px;
     }
     .list{
         margin-top: 20px;
         .item{
             overflow: hidden;
             margin-bottom: 10px;
         }
         .name,.cost{
             line-height: 20px;
         }
         .cost{
             text-align: right;
             span{
                 display: block;
             }
         }
         .name,.cost_count{
             font-size: 12px;
         }
         .cost_count{
             margin-top: 10px;
         }
         .cost_num{
             font-weight: bold;
             color: #333;
         }
     }

  }

</style>
