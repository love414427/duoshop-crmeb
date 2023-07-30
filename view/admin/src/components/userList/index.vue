<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form inline size="small">
          <el-form-item>
            <el-input v-model="tableFrom.nickname" placeholder="请输入用户名称"class="selWidth" @keyup.enter.native="getList(1)">
              <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
      >
        <el-table-column label="" min-width="65">
          <template scope="scope">
            <el-radio v-model="templateRadio" :label="scope.row.uid" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="uid"
          label="ID"
          min-width="60"
        />
        <el-table-column
          prop="nickname"
          label="微信用户名称"
          min-width="130"
        />
        <el-table-column label="客服头像" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image
                class="tabImage"
                :src="scope.row.avatar ? scope.row.avatar : moren"
                :preview-src-list="[scope.row.avatar || moren]"
              />
            </div>
          </template>
        </el-table-column>
        <!--<el-table-column
          label="用户类型"
          min-width="130"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.user_type | statusFilter }}</span>
          </template>
        </el-table-column>-->
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
import { userLstApi } from '@/api/system'
export default {
  name: 'UserList',
  filters: {
    saxFilter(status) {
      const statusMap = {
        0: '未知',
        1: '男',
        2: '女'
      }
      return statusMap[status]
    },
    statusFilter(status) {
      const statusMap = {
        'wechat': '微信用户',
        'routine': '小程序用户',
        'h5': 'H5用户'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      moren: require('@/assets/images/f.png'),
      templateRadio: 0,
      loading: false,
      tableData: {
        data: [],
        total: 0
      },
      tableFrom: {
        page: 1,
        limit: 20,
        nickname: ''
      }
    }
  },
  mounted() {
    this.getList(1)
  },
  methods: {
    getTemplateRow(idx, row) {
      /* eslint-disable */
      form_create_helper.set(this.$route.query.field, {src:row.avatar || this.moren,id:row.uid})
      form_create_helper.close(this.$route.query.field);
    },
    // 列表
    getList(num) {
      this.loading = true
      this.tableFrom.page = num ? num : this.tableFrom.page
      userLstApi(this.tableFrom).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.loading = false
      }).catch(res => {
        this.$message.error(res.message)
        this.loading = false
      })
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getList('')
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList('')
    }
  }
}
</script>

<style scoped>

</style>
