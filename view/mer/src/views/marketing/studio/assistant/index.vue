<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="120px" inline>            
            <el-form-item label="用户名：">
              <el-input v-model="tableFrom.username" placeholder="请输入用户名" class="selWidth" @keyup.enter.native="getList(1)">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
            <el-form-item label="昵称：">
              <el-input v-model="tableFrom.nickname" placeholder="请输入昵称" class="selWidth" @keyup.enter.native="getList(1)">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button size="small" type="primary" @click="onAdd">
          <i class="add">+</i> 添加助手
        </el-button>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini">
        <el-table-column prop="assistant_id" label="ID" min-width="150" />
        <!-- <el-table-column label="头像" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image :src="scope.row.avatar" :preview-src-list="[scope.row.avatar]" />
            </div>
          </template>
        </el-table-column> -->
        <el-table-column prop="username" label="用户名" min-width="200" />
        <el-table-column prop="nickname" label="昵称" min-width="200" />
        <el-table-column label="操作" min-width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="mr10" @click="onEdit(scope.row.assistant_id)">编辑</el-button>
            <el-button type="text" size="small" class="mr10" @click="handleDelete(scope.row.assistant_id,scope.$index)">删除</el-button>
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
import { roterPre } from '@/settings'
import { studioAssistantAdd, studioAssistant, studioAssistantUpdate, studioAssistantDelete } from '@/api/marketing'
export default {
  name: 'AssistantList',
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
        username: '',
        nickname: ''
      },
      loading: false
    }
  },
  watch: {

  },
  mounted() {
    this.getList('')
  },
  methods: {
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num || this.tableFrom.page
      studioAssistant(this.tableFrom)
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
    // 添加助手
    onAdd() {
      this.$modalForm(studioAssistantAdd()).then(() => this.getList(''))
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(studioAssistantUpdate(id)).then(() => this.getList(''))
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure('删除该助手').then(() => {
        studioAssistantDelete(id)
          .then(({
            message
          }) => {
            this.$message.success(message)
            this.getList('')
          })
          .catch(({
            message
          }) => {
            this.$message.error(message)
          })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.add {
  font-style: normal;
}
</style>
