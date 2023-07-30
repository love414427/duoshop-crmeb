<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <router-link :to="{path: roterPre + '/app/wechat/reply/keyword/save'}">
          <el-button size="small" type="primary">添加关键字</el-button>
        </router-link>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
      >
        <el-table-column
          prop="wechat_reply_id"
          label="ID"
          min-width="60"
        />
        <el-table-column
          prop="key"
          label="关键字"
          min-width="150"
        />
        <el-table-column
          prop="status"
          label="回复类型"
          min-width="100"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.type === 'text'">文字消息</span>
            <span v-if="scope.row.type === 'image'">图片消息</span>
            <span v-if="scope.row.type === 'news'">图文消息</span>
            <span v-if="scope.row.type === 'voice'">声音消息</span>
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
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <router-link :to="{path: roterPre + '/app/wechat/reply/keyword/save/' + scope.row.wechat_reply_id}">
              <el-button type="text" size="small">编辑</el-button>
            </router-link>
            <el-button type="text" size="small" @click="handleDelete(scope.row.wechat_reply_id, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80]"
          :page-size="tableData.limit"
          :current-page="tableData.page"
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
import { replyListApi, replyDeleteApi, replyStatusApi } from '@/api/app'
import { roterPre } from '@/settings'
export default {
  name: 'WechatKeyword',
  data() {
    return {
      roterPre: roterPre,
      tableData: {
        page: 1,
        limit: 20,
        data: [],
        total: 0,
        indexNum: 0
      },
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onchangeIsShow(row) {
      replyStatusApi(row.wechat_reply_id, row.status).then(({ message }) => {
        this.$message.success(message)
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    },
    // 列表
    getList() {
      this.listLoading = true
      replyListApi(this.tableData.page, this.tableData.limit).then(res => {
        this.tableData.data = res.data.list
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
    // 删除
    handleDelete(id, idx) {
      this.$modalSure().then(() => {
        replyDeleteApi(id).then(({ message }) => {
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

<style scoped>

</style>
