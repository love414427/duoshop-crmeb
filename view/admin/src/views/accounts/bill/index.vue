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
            <el-form-item label="是否支付：">
              <el-radio-group v-model="tableFrom.paid" type="button" size="small" @change="getList(1)">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="1">已支付</el-radio-button>
                <el-radio-button label="0">未支付</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="关键字：" class="width100">
              <el-input v-model="tableFrom.keyword" @keyup.enter.native="getList(1)" placeholder="微信昵称/姓名/订单号" class="selWidth" size="small">
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
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
        <el-table-column
          prop="recharge_id"
          label="ID"
          width="60"
        />
        <el-table-column
          label="头像"
          min-width="80"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.avatar" class="demo-image__preview">
              <el-image
                :src="scope.row.avatar"
                :preview-src-list="[scope.row.avatar]"
              />
            </div>
            <img v-else src="../../../assets/images/f.png" alt="" style="width: 36px; height: 36px; vertical-align: top;">
          </template>
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="用户昵称"
          min-width="130"
        />
        <el-table-column
          prop="order_id"
          label="订单号"
          min-width="180"
        />
        <el-table-column
          sortable
          :sort-method="(a,b)=>{return a.price - b.price}"
          label="支付金额"
          min-width="120"
          prop="price"
        />
        <el-table-column
          sortable
          label="赠送金额"
          :sort-method="(a,b)=>{return a.give_price - b.give_price}"
          min-width="120"
          prop="give_price"
        />
        <el-table-column
          label="是否支付"
          min-width="80"
        >
          <template slot-scope="scope">
            <span class="spBlock">{{ scope.row.paid | payStatusFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="充值类型"
          min-width="80"
          prop="recharge_type"
        >
          <template slot-scope="scope">
            <span class="spBlock">{{ scope.row.recharge_type | rechargeTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="支付时间"
          min-width="150"
        >
          <template slot-scope="scope">
            <span class="spBlock">{{ scope.row.pay_time || '无' }}</span>
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
import { rechargeListApi, rechargeTotalApi } from '@/api/accounts'
import cardsData from '@/components/cards/index'
import { fromList } from '@/libs/constants.js'
export default {
  name: 'AccountsBill',
  components: { cardsData },
  data() {
    return {
      cardLists: [],
      timeVal: [],
      tableData: {
        data: [],
        total: 0
      },
      listLoading: true,
      tableFrom: {
        paid: '',
        date: '',
        keyword: '',
        page: 1,
        limit: 20
      },
      fromList: fromList
    }
  },
  mounted() {
    this.getList()
    this.getStatistics()
  },
  methods: {
    // 选择时间
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
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page;
      rechargeListApi(this.tableFrom).then(res => {
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
    // 统计
    getStatistics() {
      this.StatisticsLoading = true
      rechargeTotalApi().then(res => {
        const stat = res.data
        this.cardLists = [
          { name: '充值总金额', count: stat.totalPayPrice, className: 'el-icon-s-goods' },
          { name: '充值退款金额', count: stat.totalRefundPrice, className: 'el-icon-s-order' },
          { name: '小程序充值金额', count: stat.totalRoutinePrice, className: 'el-icon-s-cooperation' },
          { name: '公众号充值金额', count: stat.totalWxPrice, className: 'el-icon-s-finance' }
        ]
        this.StatisticsLoading = false
      }).catch((res) => {
        this.$message.error(res.message)
        this.StatisticsLoading = false
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
