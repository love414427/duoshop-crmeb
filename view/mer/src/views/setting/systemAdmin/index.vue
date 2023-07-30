<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row :gutter="24">
          <el-col v-bind="grid"><div class="grid-content bg-purple" /></el-col>
        </el-row>
        <el-button size="small" type="primary" @click="onAdd">添加管理员</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        highlight-current-row
      >
        <el-table-column
          prop="merchant_admin_id"
          label="ID"
          min-width="60"
        />
        <el-table-column
          prop="real_name"
          label="管理员姓名"
          min-width="150"
        />
        <el-table-column
          prop="rule_name"
          label="身份"
          min-width="250"
        />
        <el-table-column
          prop="account"
          label="账号"
          min-width="250"
        />
        <el-table-column
          prop="status"
          label="是否显示"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              active-text="开启"
              inactive-text="关闭"
              @change="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          min-width="150"
        />
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onPassword(scope.row.merchant_admin_id)">修改管理员密码</el-button>
            <el-button type="text" size="small" @click="onEdit(scope.row.merchant_admin_id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.merchant_admin_id, scope.$index)">删除</el-button>
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
  adminListApi,
  adminCreateApi,
  adminUpdateApi,
  adminDeleteApi,
  adminStatusApi,
  adminPasswordApi
} from '@/api/setting'
export default {
  name: 'SystemRole',
  data() {
    return {
      grid: {
        xl: 7,
        lg: 7,
        md: 12,
        sm: 24,
        xs: 24
      },
      tableData: {
        data: [],
        total: 0
      },
      listLoading: true,
      tableFrom: {
        page: 1,
        limit: 20
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 列表
    getList() {
      this.listLoading = true
      adminListApi(this.tableFrom).then(res => {
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
    onchangeIsShow(row) {
      adminStatusApi(row.merchant_admin_id, row.status).then(({ message }) => {
        this.$message.success(message)
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    },
    // 添加
    onAdd() {
      this.$modalForm(adminCreateApi()).then(() => this.getList())
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(adminUpdateApi(id)).then(() => this.getList())
    },
    // 修改密码表单
    onPassword(id) {
      this.$modalForm(adminPasswordApi(id))
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure().then(() => {
        adminDeleteApi(id).then(({ message }) => {
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

<style scoped lang="stylus">
</style>
