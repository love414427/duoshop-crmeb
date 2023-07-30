<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small" type="primary" class="mb20" @click="onAdd">添加社区话题</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        row-key="topic_id"
      >
        <el-table-column
          label="话题名称"
          min-width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.topic_name  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="话题图标" min-width="80">
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
          min-width="100"
        />
        <el-table-column
          prop="count_use"
          label="使用次数"
          min-width="100"
        />
        <el-table-column
          prop="sort"
          label="排序"
          min-width="100"
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
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row.topic_id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.topic_id, scope.$index)">删除</el-button>
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
  communityTopicListApi, communityTopicCreateApi, communityTopicUpdateApi, communityTopicDeleteApi, communityTopicStatusApi
} from '@/api/community'
export default {
  name: 'communityTopic',
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
      communityTopicListApi(this.tableFrom).then(res => {
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
    // 添加
    onAdd() {
      this.$modalForm(communityTopicCreateApi()).then(() => this.getList())
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(communityTopicUpdateApi(id)).then(() => this.getList())
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure().then(() => {
        communityTopicDeleteApi(id).then(({ message }) => {
          this.$message.success(message)
          this.getList()
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    },
    onchangeIsShow(row) {
      communityTopicStatusApi(row.topic_id, row.status).then(({ message }) => {
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
