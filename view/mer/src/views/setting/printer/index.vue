<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form  @submit.native.prevent inline>
            <el-form-item label="打印机名称：" class="mr10">
              <el-input
                v-model="tableFrom.keyword"
                placeholder="请输入打印机名称"
                class="selWidth"
                size="small"
                @keyup.enter.native="getList(1)"
              >
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button size="small" type="primary" @click="add">添加打印机</el-button>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini">
        <el-table-column prop="printer_id" label="ID" min-width="150" />
        <el-table-column prop="printer_name" label="打印机名称" min-width="200" />
        <el-table-column prop="printer_terminal" label="终端号" min-width="200" />
        <el-table-column label="是否开启" min-width="90">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              active-text="开启"
              inactive-text="不开启"
              @click.native="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>

        <el-table-column label="创建时间" min-width="150" prop="create_time" />
        <el-table-column label="操作" min-width="80" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row.printer_id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.printer_id, scope.$index)">删除</el-button>
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
import { printerLstApi, printerAddApi, printerStatusApi, printerUpdateApi, printerDeleteApi  } from '@/api/setting'
export default {
  name: 'ProductGuarantee',
  components: {},
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
      timeVal: [],
      props: {},
    }
  },
  mounted() {
    this.getList(1)
  },
  methods: {
    // 添加
    add() {
      this.$modalForm(printerAddApi()).then(() => this.getList(''))
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num || this.tableFrom.page
      printerLstApi(this.tableFrom)
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
    },
    // 是否开启
    onchangeIsShow(row) {
      printerStatusApi(row.printer_id, { status: row.status })
        .then(({ message }) => {
          this.$message.success(message)
          this.getList('')
        })
        .catch(({ message }) => {
          this.$message.error(message)
        })
    },
    // 编辑
    handleEdit(id) {
      this.$modalForm(printerUpdateApi(id)).then(() => this.getList(''))
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure('删除打印机').then(() => {
        printerDeleteApi(id)
          .then(({ message }) => {
            this.$message.success(message)
            this.tableData.data.splice(idx, 1)
          })
          .catch(({ message }) => {
            this.$message.error(message)
          })
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
