<template>
  <div>
    <el-dialog v-if="fileVisible" title="批量发货记录" :visible.sync="fileVisible" width="900px">
      <div class="container">
        <el-form size="small" inline label-width="90px">
          <el-form-item label="操作时间" class="width100">
            <el-date-picker
              v-model="timeVal"
              value-format="yyyy/MM/dd"
              format="yyyy/MM/dd"
              size="small"
              type="daterange"
              placement="bottom-end"
              placeholder="自定义时间"
              style="width: 220px;"
              @change="onchangeTime"
            />
          </el-form-item>
          <el-form-item label="发货类型：">
            <el-select
              v-model="tableFrom.type"
              placeholder="请选择"
              class="filter-item selWidth mr20"
              clearable
              @change="(getList(1))"
            >
              <el-option
                v-for="item in deliveryTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select
              v-model="tableFrom.status"
              placeholder="请选择"
              class="filter-item selWidth"
              clearable
              @change="(getList(1))"
            >
              <el-option
                v-for="item in deliveryStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div v-loading="loading">
        <el-table
          v-loading="loading"
          :data="tableData.data"
          style="width: 100%"
          size="mini"
          class="table"
          highlight-current-row
        >
          <el-table-column label="序号" min-width="90">
            <template scope="scope">
              <span>{{ scope.$index+(tableFrom.page - 1) * tableFrom.limit + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发货类型" min-width="90">
            <template scope="scope">
              <span>{{ scope.row.type | deliveryType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作时间" prop="create_time" min-width="180" />
          <el-table-column label="发货单数" prop="count" min-width="100" />
          <el-table-column label="成功发货单数" prop="success" min-width="100" />
          <el-table-column label="状态" min-width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.status | deliveryStatusFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column key="8" label="操作" min-width="150" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status != -1"
                type="text"
                size="small"
                class="mr10"
                @click="detail(scope.row.import_id)"
              >查看</el-button>
              <el-button
                v-if="scope.row.status != -1"
                type="text"
                size="small"
                class="mr10"
                @click="downLoad(scope.row.import_id)"
              >生成文件</el-button>
              <el-button
                v-if="scope.row.status == -1 "
                type="text"
                size="small"
                class="mr10"
                @click="detail(scope.row.import_id)"
              >查看原因</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :page-sizes="[10, 20, 30]"
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
    <el-dialog v-if="dialogVisible" title="" :visible.sync="dialogVisible" width="900px">
      <div v-loading="loading">
        <el-table
          v-loading="loading"
          :data="recordData.data"
          style="width: 100%"
          size="mini"
          class="table"
          highlight-current-row
        >
          <el-table-column label="序号" min-width="60">
            <template scope="scope">
              <span>{{ scope.$index+(recordFrom.page - 1) * recordFrom.limit + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单号" prop="order_sn" min-width="150" />
          <el-table-column label="物流公司" prop="delivery_name" min-width="80" />
          <el-table-column label="物流单号" prop="delivery_id" min-width="100" />
          <el-table-column label="发货状态" prop="status" min-width="80" />
          <el-table-column label="异常原因" prop="mark" min-width="120" />
        </el-table>
        <div class="block">
          <el-pagination
            :page-sizes="[10, 20, 30]"
            :page-size="recordFrom.limit"
            :current-page="recordFrom.page"
            layout="total, sizes, prev, pager, next, jumper"
            :total="recordData.total"
            @size-change="handleSizeChange1"
            @current-change="pageChange1"
          />
        </div>
      </div>
    </el-dialog>
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
import { deliveryRecordListApi, deliveryRecordDetailApi, deliveryRecordImportApi } from '@/api/order'
export default {
  name: 'DeliveryList',
  data() {
    return {
      fileVisible: false,
      dialogVisible: false,
      loading: false,
      timeVal: [],
      deliveryStatusList: [
        { label: '全部', value: '' },
        { label: '全部完成', value: 1 },
        { label: '部分完成', value: 10 },
        { label: '处理中', value: 0 },
        { label: '处理失败', value: -1 }
      ],
      deliveryTypeList: [
        { label: '全部', value: '' },
        { label: '发货', value: 1 },
        { label: '送货', value: 2 },
        { label: '无需物流', value: 3 },
        { label: '电子面单', value: 4 }
      ],
      tableData: {
        data: [],
        total: 0
      },
      recordData: {
        data: [],
        total: 0
      },
      recordFrom: {
        page: 1,
        limit: 20
      },
      tableFrom: {
        page: 1,
        limit: 10,
        date: '',
        status: ''
      },
      recordId: ''
    }
  },
  methods: {
    getList(num) {
      this.loading = true
      this.tableFrom.page = num || this.tableFrom.page
      deliveryRecordListApi(this.tableFrom)
        .then((res) => {
          this.fileVisible = true
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.loading = false
        })
        .catch((res) => {
          this.$message.error(res.message)
          this.listLoading = false
        })
    },
    // 下载
    downLoad(id) {
      deliveryRecordImportApi(id)
        .then((res) => {
          const h = this.$createElement
          this.$msgbox({
            title: '提示',
            message: h('p', null, [
              h('span', null, '文件正在生成中，请稍后点击"'),
              h('span', { style: 'color: teal' }, '导出记录'),
              h('span', null, '"查看~ ')
            ]),
            confirmButtonText: '我知道了'
          }).then(action => {})
        }).catch((res) => {
          this.$message.error(res.message)
        })
    },
    // 详情
    detail(id) {
      this.recordId = id
      deliveryRecordDetailApi(id, this.recordFrom).then((res) => {
        this.dialogVisible = true
        this.recordData.data = res.data.list
        this.recordData.total = res.data.count
      })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e
      this.tableFrom.date = e ? this.timeVal.join('-') : ''
      this.getList(1)
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getList('')
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList('')
    },
    pageChange1(page) {
      this.recordFrom.page = page
      this.getList('')
      this.detail(this.recordId)
    },
    handleSizeChange1(val) {
      this.recordFrom.limit = val
      this.getList('')
      this.detail(this.recordId)
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
