<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" :inline="true">
            <el-form-item label="状态：">
              <el-select v-model="tableFrom.status" clearable placeholder="请选择状态" @change="getList">
                <el-option v-for="(item, index) in switchData" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="关键字搜索：">
              <el-input v-model="tableFrom.keyword" placeholder="请输入模板名称或者模板ID" class="selWidth" size="small" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="getList">查询</el-button>
            </el-form-item>
          </el-form>
          <el-button type="primary" size="small" @click="onAdd">添加模板消息</el-button>
        </div>
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
          label="ID"
          width="80"
          prop="template_id"
        />
        <el-table-column
          prop="tempid"
          label="模板ID"
          min-width="340"
        />
        <el-table-column
          prop="name"
          label="模板名"
          min-width="150"
        />
        <el-table-column
          label="回复内容"
          min-width="200"
        >
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.content.split('\n')" :key="index" style="display: block">{{ item }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="状态"
          width="100"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              class="demo"
              active-text="开启"
              inactive-text="关闭"
              :active-value="1"
              :inactive-value="0"
              @click.native="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column> -->
        <el-table-column
          prop="create_time"
          label="添加时间"
          min-width="150"
        />
        <el-table-column label="操作" min-width="100" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row.template_id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.template_id, scope.$index)">删除</el-button>
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
import { templateListApi, templateStatusApi, templateCreateApi, templateupdateApi, templateDeleteApi, routineListApi, routineCreateApi, routineUpdateApi, routineDeleteApi, routineStatusApi } from '@/api/app'
import * as constants from '@/libs/constants.js'
export default {
  name: 'Template',
  data() {
    return {
      switchData: constants.switchStatus,
      tableFrom: {
        page: 1,
        limit: 20,
        status: '',
        keyword: ''
      },
      tableData: {
        data: [],
        total: 0
      },
      listLoading: true,
      tempId: null
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 删除
    handleDelete(id, idx) {
      this.$modalSure().then(() => {
        this.$route.path.indexOf('wechat') !== -1 ? templateDeleteApi(id).then(() => {
          this.$message.success('删除成功')
          this.tableData.data.splice(idx, 1)
        }).catch((res) => {
          this.$message.error(res.message)
        }) : routineDeleteApi(id).then(() => {
          this.$message.success('删除成功')
          this.tableData.data.splice(idx, 1)
        }).catch((res) => {
          this.$message.error(res.message)
        })
      })
    },
    // 添加
    onAdd() {
      this.$modalForm(this.$route.path.indexOf('wechat') !== -1 ? templateCreateApi() : routineCreateApi()).then(() => this.getList())
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(this.$route.path.indexOf('wechat') !== -1 ? templateupdateApi(id) : routineUpdateApi(id)).then(() => this.getList())
    },
    // 列表
    getList() {
      this.listLoading = true
      this.$route.path.indexOf('wechat') !== -1 ? templateListApi(this.tableFrom).then(res => {
        this.tableData.data = res.data.list || []
        this.tableData.total = res.data.count
        this.listLoading = false
      }).catch((res) => {
        this.tableData.data = []
        this.listLoading = false
        this.$message.error(res.message)
      }) : routineListApi(this.tableFrom).then(res => {
        this.tableData.data = res.data.list || []
        this.tableData.total = res.data.count
        this.listLoading = false
      }).catch((res) => {
        this.tableData.data = []
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
    // 修改状态
    onchangeIsShow(row) {
      this.$route.path.indexOf('wechat') !== -1 ? templateStatusApi(row.template_id, { status: row.status }).then(() => {
        this.$message.success('修改成功')
        this.getList()
      }).catch((res) => {
        this.$message.error(res.message)
      }) : routineStatusApi(row.template_id, { status: row.status }).then(() => {
        this.$message.success('修改成功')
        this.getList()
      }).catch((res) => {
        this.$message.error(res.message)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .selWidth {
    width: 300px;
  }
</style>
