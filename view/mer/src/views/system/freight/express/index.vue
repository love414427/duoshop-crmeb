<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form inline>
            <el-form-item label="搜索:" class="mr10">
              <el-input
                v-model="tableFrom.keyword"
                placeholder="请输入物流公司名称或者编码"
                class="selWidth"
                @input="getList(1)"
              />
             <el-button type="primary" @click="getList(1)">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini">
        <el-table-column prop="id" label="ID" min-width="150" />
        <el-table-column prop="name" label="物流公司名称" min-width="200" />
        <el-table-column prop="code" label="编码" min-width="200" />
        <el-table-column label="操作" min-width="80" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="scope.row.partner_id == 1 || scope.row.partner_key == 1 || scope.row.net_name == 1" type="text" size="small" @click="handleEdit(scope.row.id)">月结账号编辑</el-button>
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
import { expressLst, accountUpdate } from '@/api/system'

export default {
  name: 'ExpressFreight',
  data() {
    return {
      tableData: {
        data: [],
        total: 0
      },
      listLoading: true,
      tableFrom: {
        page: 1,
        limit: 20,
        date: '',
        keyword: ''
      },
      tabClickIndex: ''
    }
  },
  mounted() {
    this.getList(1)
  },
  methods: {
    // 编辑
    handleEdit(id) {
      this.$modalForm(accountUpdate(id)).then(() => this.getList(''))
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num || this.tableFrom.page
      expressLst(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.listLoading = false
        })
        .catch((res) => {
          this.listLoading = false
          this.$message.error(res.message)
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

<style scoped lang="scss">
.selWidth{
    width: 300px;
}
</style>
