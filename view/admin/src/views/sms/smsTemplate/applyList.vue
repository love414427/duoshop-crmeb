<template>
  <div class="divBox">
    <el-card v-loading="fullscreenLoading" class="box-card">
      <div slot="header" class="clearfix">
        <div class="filter-container">
          <div class="demo-input-suffix acea-row">
            <span class="seachTiele">模板类型：</span>
            <el-select v-model="tableFrom.temp_type" placeholder="请选择" clearable class="filter-item selWidth mr20" @change="getList(1)">
              <el-option label="验证码" :value="1" />
              <el-option label="通知" :value="2" />
              <el-option label="推广" :value="3" />
            </el-select>
          </div>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="mini"
        highlight-current-row
      >
        <el-table-column
          prop="id"
          label="ID"
          min-width="50"
        />
        <el-table-column
          prop="templateid"
          label="模板ID"
          min-width="80"
        />
        <el-table-column
          prop="title"
          label="模板名称"
          min-width="120"
        />
        <el-table-column
          prop="content"
          label="模板内容"
          min-width="150"
        />
        <el-table-column
          prop="temp_type"
          label="模板类型"
          min-width="100"
        >
        <template slot-scope="{row}">
            <span>{{ row.temp_type | typeFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="mark"
          label="备注"
          min-width="150"
        />
        <el-table-column label="模板状态" min-width="100">
          <template slot-scope="{row}">
            <span>{{ row.status == 1 ? '审核通过' : row.status == 2 ? '审核未通过' : '待审核' }}</span>
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
import { applyTempLstApi } from '@/api/sms'
import { roterPre } from '@/settings'
import { mapGetters } from 'vuex'
export default {
  name: 'SmsTemplate',
  filters: {
    typeFilter(type) {
      const typeMap = {
        1: '验证码',
        2: '通知',
        3: '营销短信'
      }
      return typeMap[type]
    }
  },
  data() {
    return {
      fullscreenLoading: false,
      listLoading: false,
      dialogVisible: false,
      tableData: {
        data: [],
        total: 0
      },
      tableFrom: {
        page: 1,
        limit: 20,
        temp_type: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'isLogin'
    ])
  },
  mounted() {
    console.log(this.isLogin);
    this.getList('')
  },
  methods: {
    // 查看是否登录
    onIsLogin() {
      this.fullscreenLoading = true
      this.$store.dispatch('user/isLogin').then(async res => {
        const data = res.data
        if (!data.status) {
          this.$message.warning('请先登录')
          this.$router.push(roterPre + '/sms/config?url=' + this.$route.path)
        } else {
          this.getList('')
        }
        this.fullscreenLoading = false
      }).catch(res => {
        this.$message.error(res.message)
        this.$router.push(roterPre + '/sms/config?url=' + this.$route.path)
        this.fullscreenLoading = false
      })
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page
      applyTempLstApi(this.tableFrom).then(res => {
        this.tableData.data = res.data.data
        this.tableData.total = res.data.count
        this.listLoading = false
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
         this.$router.push(roterPre + '/setting/sms/sms_config/index')
      })
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getList('')
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList('')
    },
  },

}
</script>

<style scoped lang="scss">
  .selWidth{
    width: 350px !important;
  }
</style>
