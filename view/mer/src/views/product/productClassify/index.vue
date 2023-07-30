<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small" type="primary" @click="onAdd">添加商品分类</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="samll"
        highlight-current-row
        row-key="store_category_id"
        :default-expand-all="false"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          label="分类名称"
          min-width="200"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.cate_name + '  [ ' + scope.row.store_category_id + '  ]' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类图标" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image
                style="width: 36px; height: 36px"
                :src="scope.row.pic?scope.row.pic:moren"
                :preview-src-list="[scope.row.pic?scope.row.pic:moren]"
              />
            </div>
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
            <el-button type="text" size="small" @click="handleDelete(scope.row.store_category_id, scope.$index)">删除</el-button>
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
  storeCategoryListApi, storeCategoryCreateApi, storeCategoryUpdateApi, storeCategoryDeleteApi, storeCategoryStatusApi
} from '@/api/product'
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
      // tableFrom: {
      //   page: 1,
      //   limit: 20
      // }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 列表
    getList() {
      this.listLoading = true
      storeCategoryListApi().then(res => {
        this.tableData.data = res.data
        this.listLoading = false
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
      })
    },
    // 添加
    onAdd() {
      this.$modalForm(storeCategoryCreateApi()).then(() => this.getList())
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(storeCategoryUpdateApi(id)).then(() => this.getList())
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure('删除该分类').then(() => {
        storeCategoryDeleteApi(id).then(({ message }) => {
          this.$message.success(message)
          this.getList()
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    },
    onchangeIsShow(row) {
      storeCategoryStatusApi(row.store_category_id, row.is_show).then(({ message }) => {
        this.$message.success(message)
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
