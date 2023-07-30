<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small" type="primary" @click="onAdd">添加组合数据</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        highlight-current-row
      >
        <el-table-column
          prop="group_id"
          label="ID"
          min-width="60"
        />
        <el-table-column
          prop="group_name"
          label="数据组名称"
          min-width="130"
        />
        <el-table-column
          prop="group_key"
          label="数据组key"
          min-width="130"
        />
        <el-table-column
          prop="group_info"
          label="数据组说明"
          min-width="130"
        />
        <el-table-column
          prop="create_time"
          label="创建时间"
          min-width="150"
        />
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goList(scope.row.group_id, scope.$index)">数据列表</el-button>
            <el-button type="text" size="small" @click="onEdit(scope.row.group_id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80]"
          :page-size="tableData.limit"
          :current-page="tableData.page"
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
import { roterPre } from '@/settings'
import {
  createGroupTable,
  updateGroupTable,
  groupLst
} from '@/api/system'
export default {
  name: 'List',
  data() {
    return {
      roterPre: roterPre,
      tableData: {
        page: 1,
        limit: 20,
        data: [],
        total: 0
      },
      loading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 列表
    getList() {
      this.loading = true
      groupLst(this.tableData.page, this.tableData.limit).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.loading = false
      }).catch(res => {
        this.loading = false
        this.$message.error(res.message)
      })
    },
    pageChange(page) {
      this.tableData.page = page
      this.getList()
    },
    handleSizeChange(val) {
      this.tableData.limit = val
      this.getList()
    },
    // 添加
    onAdd() {
      this.$modalForm(createGroupTable()).then(() => this.getList())
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(updateGroupTable(id)).then(() => this.getList())
    },
    // 组合数据列表
    goList(id) {
      this.$router.push(`${roterPre}/group/data/${id}`)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
