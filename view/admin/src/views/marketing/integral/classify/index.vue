<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small" type="primary" class="mb20" @click="onAdd">添加积分商品分类</el-button> 
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        row-key="store_category_id"
      >
        <el-table-column
          label="分类名称"
          min-width="200"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.cate_name + '  [ ' + scope.row.store_category_id + '  ]' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          min-width="50"
        />
        <el-table-column
          prop="status"
          label="是否显示"
          min-width="100"
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
        <el-table-column
          prop="create_time"
          label="创建时间"
          min-width="150"
        />
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row.store_category_id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
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
  integralCategoryListApi, integralCategoryCreateApi, integralCategoryUpdateApi, integralCategoryDeleteApi, 
  integralCategoryStatusApi
} from '@/api/marketing'
export default {
  name: 'ProductClassify',
  data() {
    return {
      moren: require("@/assets/images/bjt.png"),
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
      integralCategoryListApi(this.tableFrom).then(res => {
        this.tableData.data = res.data
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
    onAdd() {
      this.$modalForm(integralCategoryCreateApi()).then(() => this.getList())
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(integralCategoryUpdateApi(id)).then(() => this.getList())
    },
    // 删除
    handleDelete(row, idx) {
      let modalText = ""
      if(row.has_product == 1){
        modalText ="该分类下有商品，删除后不可恢复，请确认是否删除"
      }else{
       modalText ="确定删除该分类吗"
      }
      this.$modalSure(modalText).then(() => {
        integralCategoryDeleteApi(row.store_category_id).then(({ message }) => {
          this.$message.success(message)
          this.getList()
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    },
    onchangeIsShow(row) {
      integralCategoryStatusApi(row.store_category_id, row.is_show).then(({ message }) => {
        this.$message.success(message)
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
