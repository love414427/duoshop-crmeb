<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="filter-container">
          <div class="demo-input-suffix acea-row">
            <span class="seachTiele">是否显示：</span>
            <el-select
              v-model="tableFrom.status"
              placeholder="请选择"
              class="filter-item selWidth mr20"
              clearable
              @change="getList"
            >
              <el-option label="显示" :value="1" />
              <el-option label="不显示" :value="0" />
            </el-select>
          </div>
        </div>
        <el-button size="small" type="primary" class="ivu-btn" @click="addSpike">
          <i class="ivu-icon ivu-icon-md-add">+</i>
          <span class="text">添加数据</span>
        </el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        highlight-current-row
      >
        <el-table-column prop="seckill_time_id" label="编号" min-width="90" />
        <el-table-column prop="title" label="名称" min-width="120" />
        <el-table-column label="开始时间(整数小时)" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.start_time }} :00</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间(整点)" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.end_time }} :00</span>
          </template>
        </el-table-column>
        <el-table-column label="图片" min-width="90">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image
                style="width: 36px; height: 36px"
                :src="scope.row.pic"
                :preview-src-list="[scope.row.pic]"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否可用" min-width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              active-text="启用"
              inactive-text="禁用"
              @click.native="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="mr10"
              @click="handleEdit(scope.row.seckill_time_id)"
            >编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.seckill_time_id,scope.$index)">删除</el-button>
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
  spikeConfigLstApi,
  spikeConfigDeleteApi,
  spikeConfigurationApi,
  spikeConfigUpdateApi,
  spikeConfigStatusApi
} from '@/api/marketing'
import { roterPre } from '@/settings'
export default {
  name: 'CouponList',
  data() {
    return {
      Loading: false,
      dialogVisible: false,
      roterPre: roterPre,
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },
      tableFrom: {
        page: 1,
        limit: 20,
        status: ""
      },
      tableFromIssue: {
        page: 1,
        limit: 10,
        coupon_id: 0
      },
      issueData: {
        data: [],
        total: 0
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 添加秒杀配置
    addSpike() {
      this.$modalForm(spikeConfigurationApi().then()).then(() =>
        this.getList()
      )
    },
    // 编辑
    handleEdit(id) {
      this.$modalForm(spikeConfigUpdateApi(id).then()).then(() =>
        this.getList()
      )
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure().then(() => {
        spikeConfigDeleteApi(id)
          .then(({ message }) => {
            this.$message.success(message)
            this.tableData.data.splice(idx, 1)
          })
          .catch(({ message }) => {
            this.$message.error(message)
          })
      })
    },
    handleClose() {
      this.dialogVisible = false
    },
    // 列表
    getList() {
      this.listLoading = true
      console.log(this.tableFrom)
      spikeConfigLstApi(this.tableFrom)
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
      this.getList()
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList()
    },
    // 修改状态
    onchangeIsShow(row) {
      spikeConfigStatusApi(row.seckill_time_id, row.status )
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
  width: 350px !important;
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
.ivu-icon {
  display: inline-block;
  font-style: normal;
  text-align: center;
  position: relative;
  top: -1px;
}

.ivu-btn .text {
  display: inline-block;
  margin-left: 4px;
}
</style>
