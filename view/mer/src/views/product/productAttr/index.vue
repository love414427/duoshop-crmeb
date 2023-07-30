<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small" type="primary" @click="add">添加商品规格</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        highlight-current-row
      >
        <el-table-column
          prop="attr_template_id"
          label="ID"
          min-width="60"
        />
        <el-table-column
          prop="template_name"
          label="规格名称"
          min-width="150"
        />
        <el-table-column
          label="商品规格"
          min-width="150"
        >
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.template_value" :key="index" class="mr10" v-text="item.value" />
          </template>
        </el-table-column>
        <el-table-column
          label="商品属性"
          min-width="300"
        >
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.template_value" :key="index" v-text="item.detail.join(',')" />
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.attr_template_id, scope.$index)">删除
            </el-button>
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
import { templateListApi, attrDeleteApi } from '@/api/product'
// import CreatAttr from './creatAttr'
export default {
  name: 'ProductAttr',
  data() {
    return {
      formDynamic: {
        template_name: '',
        template_value: []
      },
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
    add() {
      const _this = this
       _this.formDynamic = {
          template_name: '',
          template_value: []
        }
      this.$modalAttr(Object.assign({}, _this.formDynamic), function() {
        _this.getList()
       
      })
    },
    // 列表
    getList() {
      this.listLoading = true
      templateListApi(this.tableFrom).then(res => {
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
    // 删除
    handleDelete(id, idx) {
      this.$modalSure().then(() => {
        attrDeleteApi(id).then(({ message }) => {
          this.$message.success(message)
          this.tableData.data.splice(idx, 1)
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    },
    onEdit(val) {
      const _this = this
      this.$modalAttr(JSON.parse(JSON.stringify(val)), function() {
        _this.getList()
        this.formDynamic = {
          template_name: '',
          template_value: []
        }
      })
    }
  }
}
</script>
