<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="filter-container">
          <div class="demo-input-suffix acea-row">
            <span class="seachTiele">搜索：</span>
            <el-input v-model="tableFrom.keyword" @keyup.enter.native="getList" placeholder="请输入物流公司名称或者编码" class="selWidth" size="small">
              <el-button slot="append" icon="el-icon-search" class="el-button-solt" size="small" @click="getList"/>
            </el-input>
          </div>
        </div>
        <!-- <el-button size="small" type="primary" @click="onAdd">添加物流公司</el-button> -->
        <el-button size="small" type="primary" @click="onSync">同步物流公司</el-button>
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
          prop="name"
          label="物流公司名称"
          min-width="100"
        />
        <el-table-column
          prop="code"
          label="编码"
          min-width="120"
        />
        <el-table-column
          prop="sort"
          label="排序"
          min-width="120"
          sortable
        />
        <el-table-column
          label="是否显示"
          min-width="120"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_show"
              :active-value="1"
              :inactive-value="0"
              active-text="显示"
              inactive-text="隐藏"
              @change="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.id, scope.$index)">删除</el-button>
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
import { expressListApi, expressCreateApi, expressUpdateApi, expressDeleteApi, expressStatuseApi,syncExpressApi } from '@/api/freight'
import { roterPre } from '@/settings'
export default {
  name: 'FreightExpress',
  data() {
    return {
      roterPre: roterPre,
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },
      tableFrom: {
        page: 1,
        limit: 20,
        keyword: ''
      },
      imgList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 列表
    getList() {
      this.listLoading = true
      expressListApi(this.tableFrom).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.tableData.data.map((item) => {
          this.imgList.push(item.image)
        })
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
      this.$modalForm(expressCreateApi()).then(() => this.getList())
    },
    //同步物流公司
    onSync(){
        syncExpressApi().then(res => {
            this.$message.success(res.message)
        }).catch(res => {
            this.$message.error(res.message)
        })
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(expressUpdateApi(id)).then(() => this.getList())
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure().then(() => {
        expressDeleteApi(id).then(({ message }) => {
          this.$message.success(message)
          this.tableData.data.splice(idx, 1)
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    },
    onchangeIsShow(row) {
      expressStatuseApi(row.id, row.is_show).then(({ message }) => {
        this.$message.success(message)
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .selWidth{
    width: 350px;
  }
  .seachTiele{
    line-height: 35px;
  }
</style>
