<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form size="small" label-width="79px" :inline="true">
          <el-form-item label="是否显示：">
            <el-select
              v-model="status"
              clearable
              filterable
              placeholder="请选择"
              class="selWidth"
              @change="getList"
            >
              <el-option label="显示" value="1" />
              <el-option label="不显示" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称：" class="width100" style="display: inline-block;">
            <el-input
              v-model="classify_name"
              @keyup.enter.native="getList"
              placeholder="请输入分类名称"
              class="selWidth"
              size="small"
            >
              <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList" />
            </el-input>
          </el-form-item>
        </el-form>
        <el-button size="small" type="primary" @click="onAdd">添加配置分类</el-button>
      </div>
      <el-table
        :data="tableData.data"
        style="width: 100%"
        size="small"
        row-key="config_classify_id"
        default-expand-all
        v-loading="listLoading"
      >
        <el-table-column
          prop="config_classify_id"
          label="ID"
          min-width="80"
        />
        <el-table-column
          prop="classify_name"
          label="配置分类名称"
          min-width="150"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        />
        <el-table-column
          prop="classify_key"
          label="配置分类key"
          min-width="150"
        />
        <el-table-column
          prop="info"
          label="配置分类说明"
          min-width="150"
        />
        <el-table-column
          prop="icon"
          label="图标"
          min-width="150"
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
              active-text="显示"
              inactive-text="隐藏"
              @change="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          min-width="150"
        />
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row.config_classify_id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.config_classify_id, scope.$index)">删除</el-button>
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
  createConfigClassifyTable,
  updateConfigClassifyTable,
  configClassifyLst,
  changeConfigClassifyStatus,
  classifyDelApi
} from '@/api/system'
export default {
  name: 'Classify',
  data() {
    return {
      tableData: {
        data: [],
        total: 0
      },
      listLoading: true,
      status: '',
      classify_name: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 列表
    getList() {
      this.listLoading = true
      configClassifyLst(this.status, this.classify_name).then(res => {
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
    onchangeIsShow(row) {
      changeConfigClassifyStatus(row.config_classify_id, row.status).then(({ message }) => {
        this.$message.success(message)
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    },
    // 添加
    onAdd() {
      this.$modalForm(createConfigClassifyTable()).then(() => this.getList())
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(updateConfigClassifyTable(id)).then(() => this.getList())
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure().then(() => {
        classifyDelApi(id).then(({ message }) => {
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
