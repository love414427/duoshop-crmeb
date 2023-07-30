<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small" type="primary" @click="onAdd">{{ $route.path.indexOf('group') !== -1?'添加用户分组':'添加用户标签' }}</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        highlight-current-row
      >
        <el-table-column
          label="ID"
          min-width="60"
        >
          <template slot-scope="{row}">
            <span v-text="$route.path.indexOf('group') !== -1?row.group_id:row.label_id" />
          </template>
        </el-table-column>
        <el-table-column
          :label="$route.path.indexOf('group') !== -1 ? '分组名称' : '标签名称'"
          min-width="180"
        >
          <template slot-scope="{row}">
            <span v-text="$route.path.indexOf('group') !== -1?row.group_name:row.label_name" />
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          min-width="150"
        />
        <el-table-column label="操作" min-width="100" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit($route.path.indexOf('group') !== -1?scope.row.group_id:scope.row.label_id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete($route.path.indexOf('group') !== -1?scope.row.group_id:scope.row.label_id, scope.$index)">删除</el-button>
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
import {
  groupLstApi,
  groupFormApi,
  groupEditApi,
  groupDeleteApi,
  labelLstApi,
  labelFormApi,
  labelEditApi,
  labelDeleteApi
} from '@/api/user'
export default {
  name: 'UserGroup',
  data() {
    return {
      tableFrom: {
        page: 1,
        limit: 20
      },
      tableData: {
        data: [],
        total: 0
      },
      listLoading: true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 列表
    getList() {
      this.listLoading = true
      this.$route.path.indexOf('group') !== -1 ? groupLstApi(this.tableFrom).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.listLoading = false
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
      }) : labelLstApi(this.tableFrom).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.listLoading = false
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
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
    // 添加
    onAdd() {
      this.$modalForm(this.$route.path.indexOf('group') !== -1 ? groupFormApi() : labelFormApi()).then(() => this.getList())
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(this.$route.path.indexOf('group') !== -1 ? groupEditApi(id) : labelEditApi(id)).then(() => this.getList())
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure(this.$route.path.indexOf('group') !== -1 ? '删除该分组' : '删除该标签').then(() => {
        this.$route.path.indexOf('group') !== -1 ? groupDeleteApi(id).then(({ message }) => {
          this.$message.success(message)
          this.tableData.data.splice(idx, 1)
          this.getList()
        }).catch(({ message }) => {
          this.$message.error(message)
        }) : labelDeleteApi(id).then(({ message }) => {
          this.$message.success(message)
          this.tableData.data.splice(idx, 1)
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
