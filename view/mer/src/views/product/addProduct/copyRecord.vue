<template>
  <el-dialog v-if="showRecord" title="复制记录" :visible.sync="showRecord" width="900px">
    <div v-loading="loading">
      <el-table
        v-loading="loading"
        :data="tableData.data"
        style="width: 100%"
        size="mini"
        class="table"
        highlight-current-row
      >
        <el-table-column label="ID" prop="mer_id" min-width="50" />
        <el-table-column label="使用次数" prop="num" min-width="80" />
        <el-table-column label="复制商品平台名称" prop="type" min-width="120" />
        <el-table-column label="剩余次数" prop="number" min-width="80" />
        <el-table-column label="商品复制链接" prop="info" min-width="180" />
        <el-table-column label="操作时间" prop="create_time" min-width="120" />
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[10, 20]"
          :page-size="tableFrom.limit"
          :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </div>
  </el-dialog>
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
import { productCopyRecordApi } from '@/api/product'
export default {
  name: 'CopyRecord',
  data() {
    return {
      showRecord: false,
      loading: false,
      tableData: {
        data: [],
        total: 0
      },
      tableFrom: {
        page: 1,
        limit: 10
      }
    }
  },

  methods: {
    getRecord() {
      this.showRecord = true
      this.loading = true
      productCopyRecordApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.loading = false
        })
        .catch((res) => {
          this.$message.error(res.message)
          this.listLoading = false
        })
    },

    pageChange(page) {
      this.tableFrom.page = page
      this.getRecord()
    },
    pageChangeLog(page) {
      this.tableFromLog.page = page
      this.getRecord()
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getRecord()
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  margin-bottom: 16px;
  color: #17233d;
  font-weight: 500;
  font-size: 14px;
}
.description {
  &-term {
    display: table-cell;
    padding-bottom: 10px;
    line-height: 20px;
    width: 50%;
    font-size: 12px;
  }
}
</style>
