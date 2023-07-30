<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px">
            <el-form-item label="状态：">
              <el-radio-group v-model="tableForm.status_tag" type="button" @change="getList">
                <el-radio-button label>全部</el-radio-button>
                <el-radio-button label="0">待审核</el-radio-button>
                <el-radio-button label="1">已审核</el-radio-button>
                <el-radio-button label="-1">审核失败</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="关键字：" class="width100">
              <el-input
                v-model="tableForm.keyword"
                @keyup.enter.native="getList"
                placeholder="请输入直播间名称/ID/主播昵称/微信号"
                class="selWidth"
                size="small"
              >
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList" />
              </el-input>
            </el-form-item>
          </el-form>
          <router-link :to=" { path:`${roterPre}` + '/marketing/studio/creatStudio' } ">
            <el-button size="small" type="primary">创建直播间</el-button>
          </router-link>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        highlight-current-row
      >
        <el-table-column label="序号" min-width="90">
          <template scope="scope">
            <span>{{ scope.$index+(tableForm.page - 1) * tableForm.limit + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品ID" min-width="120" />
        <el-table-column prop="broadcast_room_id" label="直播间ID" min-width="90" />
        <el-table-column prop="anchor_name" label="商品名称" min-width="90" />
        <el-table-column prop="anchor_wechat" label="原价" min-width="150" />
        <el-table-column prop="start_time" min-width="130" label="库存" />
        <el-table-column v-if="tableForm.status_tag != 1" key="3" label="审核状态" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.status | liveReviewStatusFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否上架" min-width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_show"
              :active-value="1"
              :inactive-value="0"
              active-text="上架"
              inactive-text="下架"
              @click.native="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status == 0"
              type="text"
              size="small"
              @click="handleEdit(scope.row.broadcast_room_id)"
            >编辑</el-button>
            <router-link
              :to=" { path:`${roterPre}` + '/marketing/coupon/creatCoupon/' + scope.row.broadcast_room_id } "
            >
              <el-button type="text" size="small" class="mr10">详情</el-button>
            </router-link>
            <el-button
              type="text"
              size="small"
              @click="handleDelete(scope.row.broadcast_room_id, scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80]"
          :page-size="tableForm.limit"
          :current-page="tableForm.page"
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
import { broadcastListApi, couponIssueStatusApi } from '@/api/marketing'
import { roterPre } from '@/settings'
export default {
  name: 'StudioList',
  data() {
    return {
      Loading: false,
      roterPre: roterPre,
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },
      tableForm: {
        page: 1,
        limit: 20,
        status_tag: '',
        keyword: ''
      },
      liveRoomStatus: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 编辑
    handleEdit() {},
    handleSizeChangeIssue(val) {
      this.tableFormIssue.limit = val
      this.getIssueList()
    },
    // 列表
    getList() {
      this.listLoading = true
      console.log(this.tableForm)
      broadcastListApi(this.tableForm)
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
      this.tableForm.page = page
      this.getList()
    },
    handleSizeChange(val) {
      this.tableForm.limit = val
      this.getList()
    },
    // 修改状态
    onchangeIsShow(row) {
      couponIssueStatusApi(row.coupon_id, row.status)
        .then(({ message }) => {
          this.$message.success(message)
          this.getList()
        })
        .catch(({ message }) => {
          this.$message.error(message)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.modalbox {
  /deep/.el-dialog {
    min-width: 550px;
  }
}
.selWidth {
  width: 400px;
}
.seachTiele {
  line-height: 35px;
}
.fa {
  color: #0a6aa1;
  display: block;
}
.sheng {
  color: #ff0000;
  display: block;
}
</style>
