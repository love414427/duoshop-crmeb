<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="120px"  :inline="true">
            <el-form-item label="使用状态：" class="mr10">
              <el-select v-model="tableFromIssue.status" placeholder="请选择状态" @change="getIssueList" class="selWidth">
                <el-option label="全部" value="" />
                <el-option label="已使用" value="1" />
                <el-option label="未使用" value="0" />
                <el-option label="已过期" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="领取人：" class="mr10">
              <el-input v-model="tableFromIssue.username" @keyup.enter.native="getIssueList" placeholder="请输入领取人" class="selWidth">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getIssueList"/>
              </el-input>
            </el-form-item>
            <el-form-item label="优惠劵：" class="mr10">
              <el-input v-model="tableFromIssue.coupon_id" @keyup.enter.native="getIssueList" placeholder="请输入优惠劵ID" class="selWidth">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getIssueList"/>
              </el-input>
            </el-form-item>
            <el-form-item label="获取方式" class="mr10">
              <el-select v-model="tableFromIssue.type" placeholder="请选择状态" @change="getIssueList" class="selWidth">
                <el-option label="全部" value="" />
                <el-option label="自己领取" value="receive" />
                <el-option label="后台发送" value="send" />
                <el-option label="新人" value="new" />
                <el-option label="买赠送" value="buy" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-table
        v-loading="Loading"
        :data="issueData.data"
        size="mini"
        style="width: 100%"
      >
        <el-table-column
          prop="coupon_id"
          label="ID"
          min-width="80"
        />
        <el-table-column
          prop="coupon_title"
          label="优惠券名称"
          min-width="150"
        />
        <el-table-column
          label="领取人"
          min-width="200"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.user">{{scope.row.user.nickname | filterEmpty}}</span>
            <span v-else>未知</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="coupon_price"
          label="面值"
          min-width="100"
        />
        <el-table-column
          prop="use_min_price"
          label="最低消费额"
          min-width="120"
        />
        <el-table-column
          prop="start_time"
          label="开始使用时间"
          min-width="150"
        />
        <el-table-column
          prop="end_time"
          label="结束使用时间"
          min-width="150"
        />
        <el-table-column
          label="获取方式"
          min-width="150"
        >
          <template slot-scope="scope">
            <span>{{scope.row.type | failFilter}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="is_fail"
          label="是否可用"
          min-width="100"
        >
          <template slot-scope="scope">
            <i v-if="scope.row.is_fail === 0" class="el-icon-check" style="font-size: 14px;color: #0092DC;" />
            <i v-else class="el-icon-download" style="font-size: 14px;color: #ed5565;" />
          </template>
        </el-table-column> -->
        <el-table-column
          label="状态"
          min-width="100"
        >
          <template slot-scope="scope">
            <span>{{scope.row.status | statusFilter}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          :page-size="tableFromIssue.limit"
          :current-page="tableFromIssue.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="issueData.total"
          @size-change="handleSizeChangeIssue"
          @current-change="pageChangeIssue"
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
import { issueApi } from '@/api/marketing'
import { roterPre } from '@/settings'
export default {
  name: 'CouponUser',
  filters: {
    failFilter(status) {
      const statusMap = {
        'receive': '自己领取',
        'send': '后台发送',
        'give': '满赠',
        'new': '新人',
        'buy': '买赠送'
      }
      return statusMap[status]
    },
    statusFilter(status) {
      const statusMap = {
        0: '未使用',
        1: '已使用',
        2: '已过期'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      Loading: false,
      roterPre: roterPre,
      tableFromIssue: {
        page: 1,
        limit: 10,
        coupon_id: '',
        status: '',
        username: '',
        type: ''
      },
      issueData: {
        data: [],
        total: 0
      }
    }
  },
  mounted() {
    this.getIssueList()
  },
  methods: {
    // 列表
    getIssueList() {
      this.Loading = true
      issueApi(this.tableFromIssue).then(res => {
        this.issueData.data = res.data.list
        this.issueData.total = res.data.count
        this.Loading = false
      }).catch(res => {
        this.Loading = false
        this.$message.error(res.message)
      })
    },
    pageChangeIssue(page) {
      this.tableFromIssue.page = page
      this.getIssueList()
    },
    handleSizeChangeIssue(val) {
      this.tableFromIssue.limit = val
      this.getIssueList()
    }
  }
}
</script>

<style scoped lang="scss">
  .box-card{
    /deep/.el-card__header{
      padding: 18px 20px 0 18px !important;
    }
  }
  .selWidth{
    width: 300px !important;
  }
  .seachTiele{
    line-height: 35px;
  }
  .fa{
    color: #0a6aa1;
    display: block;
  }
  .sheng{
    color: #ff0000;
    display: block;
  }
</style>
