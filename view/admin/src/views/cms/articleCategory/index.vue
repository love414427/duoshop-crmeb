<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small" type="primary" @click="onAdd(0)">添加文章分类</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        row-key="article_category_id"
        :default-expand-all="false"
      >
        <el-table-column
          label="分类名称"
          min-width="150"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.title + '  [ ' + scope.row.article_category_id + '  ]' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="info"
          label="配置分类说明"
          min-width="150"
        />
        <el-table-column label="分类图片" min-width="100" prop="image">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image
                style="width: 36px; height: 36px"
                :src="scope.row.image"
                :preview-src-list="[scope.row.image]"
              />
            </div>
          </template>
        </el-table-column>
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
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row.article_category_id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.article_category_id, scope.$index)">删除</el-button>
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
  articleCreateApi,
  articleUpdateApi,
  articleListApi,
  articleStatuseApi,
  articleDeleteApi
} from '@/api/cms'
export default {
  name: 'ArticleCategory',
  data() {
    return {
      tableData: {
        data: [],
        loading: false,
        indexNum: 0
      },
      listLoading: true,
      previewSrcList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 列表
    getList() {
      this.listLoading = true
      articleListApi().then(res => {
        this.tableData.data = res.data
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
      articleStatuseApi(row.article_category_id, row.status).then(({ message }) => {
        this.$message.success(message)
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    },
    // 添加
    onAdd(id) {
      const config = {}
      if (Number(id) > 0) config.formData = { pid: id }
      this.$modalForm(articleCreateApi(), config).then(() => this.getList())
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(articleUpdateApi(id)).then(() => this.getList())
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure().then(() => {
        articleDeleteApi(id).then(({ message }) => {
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
