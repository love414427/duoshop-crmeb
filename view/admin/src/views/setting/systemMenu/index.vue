<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small" type="primary" @click="onAdd(0)">添加菜单</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        row-key="menu_id"
        highlight-current-row
        :default-expand-all="false"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          label="菜单名称"
          min-width="200"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.menu_name + '  [ ' + scope.row.menu_id + '  ]' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="route"
          label="菜单地址"
          min-width="150"
        />
        <el-table-column label="菜单图标" min-width="100">
          <template slot-scope="scope">
            <div class="listPic">
              <i :class="'el-icon-' + scope.row.icon" style="font-size: 20px;" />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          min-width="150"
        />
        <el-table-column label="操作" min-width="180" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" :disabled="isChecked" @click="onAdd(scope.row.menu_id)">添加子菜单</el-button>
            <el-button type="text" size="small" @click="onEdit(scope.row.menu_id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.menu_id, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  menuListApi, menuCreateApi, menuUpdateApi, menuDeleteApi
} from '@/api/system'
export default {
  name: 'Menu',
  data() {
    return {
      isChecked: false,
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },
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
      menuListApi(this.tableFrom).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.listLoading = false
      }).catch(res => {
        this.listLoading = false
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
    onAdd(id) {
      const config = {}
      if (Number(id) > 0) config.formData = { pid: id }
      this.$modalForm(menuCreateApi(), config).then(() => {
        this.getList()
        this.$store.dispatch('user/getMenus')
      })
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(menuUpdateApi(id)).then(() => {
        this.getList()
        this.$store.dispatch('user/getMenus')
      })
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure('删除菜单吗').then(() => {
        menuDeleteApi(id).then(({ message }) => {
          this.$message.success(message)
          this.getList()
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
