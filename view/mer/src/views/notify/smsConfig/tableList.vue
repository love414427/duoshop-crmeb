<template>
  <div class="divBox">
    <el-card :bordered="false" dis-hover>
      <el-tabs v-model="tableFrom.type" @tab-click="onChangeType">
        <el-tab-pane label="商品采集" name="copy" />
        <el-tab-pane label="电子面单打印" name="mer_dump" />
      </el-tabs>
      <el-row>
        <el-col :span="24" class="record_count">
          <el-button type="primary" plain @click="getPurchase">购买记录</el-button>
        </el-col>
      </el-row>
      <!--商品采集，物流，电子面单列表-->
      <div>
        <el-table
          :data="tableList"
          :loading="loading"
          size="mini"
          class="table"
        >
          <el-table-column key="7" label="序号" min-width="50">
            <template scope="scope">
              <span>{{ scope.$index+(tableFrom.page - 1) * tableFrom.limit + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="tableFrom.type == 'mer_dump'" key="1" prop="info.order_sn" label="订单号" min-width="200" />
          <el-table-column v-if="tableFrom.type == 'mer_dump'" key="2" prop="info.from_name" label="发货人" min-width="90" />
          <el-table-column v-if="tableFrom.type == 'mer_dump'" label="收货人" min-width="90">
            <template scope="scope">
              <span>{{ (scope.row.info && scope.row.info.to_name) ? scope.row.info.to_name : '' }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="tableFrom.type == 'mer_dump'" key="3" prop="info.delivery_id" label="快递单号" min-width="90" />
          <el-table-column v-if="tableFrom.type == 'mer_dump'" key="4" prop="info.delivery_name" label="快递公司编码" min-width="90" />
          <el-table-column v-if="tableFrom.type == 'copy'" key="6" prop="info" label="复制URL" min-width="200" />
          <el-table-column key="8" prop="create_time" :label="tableFrom.type != 'copy' ? '打印时间' : '添加时间'" min-width="90" />
        </el-table>
        <div class="block">
          <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="tableFrom.limit" :current-page="tableFrom.page" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="pageChange" />
        </div>
      </div>
    </el-card>
    <!--购买记录-->
    <el-dialog v-if="dialogVisible" :title="tableFrom.type == 'copy' ? '商品采集购买记录' : '电子面单购买记录'" :visible.sync="dialogVisible" width="700px">
      <el-table
        :data="tableData"
        :loading="loading"
        class="mt25"
      >
        <el-table-column label="序号" min-width="50">
          <template scope="scope">
            <span>{{ scope.$index+(purchaseForm.page - 1) * purchaseForm.limit + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="order_sn" label="订单号" min-width="120" />
        <el-table-column label="购买记录" min-width="90">
          <template scope="scope">
            <span v-if="scope.row.order_info">{{ scope.row.order_info.price }}元 / {{ scope.row.order_info.num }}次</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="购买时间" min-width="90" />
      </el-table>
      <div class="block">
        <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="purchaseForm.limit" :current-page="purchaseForm.page" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChangeOther" @current-change="pageChangeOther" />
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
import { productCopyRecordApi } from '@/api/product'
import { payRecordLst } from '@/api/setting'
export default {
  name: 'TableList',
  props: {
    copy: {
      type: Object,
      default: null
    },
    dump: {
      type: Object,
      default: null
    },
    accountInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isChecked: 'copy',
      tableFrom: {
        page: 1,
        limit: 20,
        type: 'copy'
      },
      total: 0,
      loading: false,
      tableList: [],
      modals: false,
      dialogVisible: false,
      tableData: [],
      purchaseForm: {
        page: 1,
        limit: 10
      }
    }
  },
  watch: {
  },
  created() {
    this.getRecordList()
  },
  mounted() {
  },
  methods: {
    onChangeType() {
      this.getRecordList()
    },
    // 其他列表
    getRecordList() {
      this.loading = true
      productCopyRecordApi(this.tableFrom)
        .then(async(res) => {
          const data = res.data
          this.tableList = data.list
          this.total = res.data.count
          this.loading = false
        })
        .catch((res) => {
          this.loading = false
          this.$message.error(res.message)
        })
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getRecordList('')
    },
    handleSizeChangeOther(val) {
      this.purchaseForm.limit = val
      this.getPurchase()
    },
    pageChange(index) {
      this.tableFrom.page = index
      this.getRecordList()
    },
    pageChangeOther(index) {
      this.purchaseForm.page = index
      this.getPurchase()
    },
    // 购买记录
    getPurchase() {
      this.dialogVisible = true
      this.purchaseForm.type = this.tableFrom.type == 'copy' ? 1 : 2
      payRecordLst(this.purchaseForm)
        .then(async(res) => {
          const data = res.data
          this.tableData = data.list
          this.total = res.data.count
          this.loading = false
        })
        .catch((res) => {
          this.loading = false
          this.$message.error(res.message)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.mt25{
    margin-top: 25px;
}
.record_count{
    text-align: right;
}
</style>
