<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        highlight-current-row
      >
        <el-table-column label="权益名称" prop="interests_id" min-width="60"/>
        <el-table-column label="展示名称" prop="name" min-width="100"/>
        <el-table-column label="未开通权益图标(80x80)" min-width="150">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image style="width: 36px; height: 36px" :src="scope.row.pic ? scope.row.pic : ''" :preview-src-list="[scope.row.pic || '']" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="已开通权益图标(80x80)" min-width="150">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image style="width: 36px; height: 36px" :src="scope.row.on_pic ? scope.row.on_pic : ''" :preview-src-list="[scope.row.on_pic || '']" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="权益简介" prop="info" min-width="180"/>
        <el-table-column prop="status" label="权益状态" min-width="100">
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
        <el-table-column label="操作" min-width="100" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row.interests_id)">编辑</el-button>
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
  memberEquityListApi,
  memberEquityUpdateApi,
  memberEquityStatusApi
} from '@/api/user'
export default {
  name: 'UserGroup',
  data() {
    return {
      tableFrom: {
        page: 1,
        limit: 20
      },
      tableData: {
        data: [],
      },
      listLoading: true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 列表
    getList() {
      this.listLoading = true
      memberEquityListApi(this.tableFrom).then(res => {
        this.tableData.data = res.data
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
    // 编辑
    onEdit(id) {
      this.$modalForm(memberEquityUpdateApi(id)).then(() => this.getList())
    },
    onchangeIsShow(row) {
      memberEquityStatusApi(row.interests_id, row.status)
        .then(({ message }) => {
          this.$message.success(message);
          this.getList();
        })
        .catch(({ message }) => {
          this.$message.error(message);
        });
    },
  }
}
</script>

<style scoped lang="scss">

</style>
