<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px" inline>
            <el-form-item label="时间选择：">
              <el-radio-group
                v-model="tableFrom.date"
                type="button"
                class="mr20"
                size="small"
                clearable
                @change="selectChange(tableFrom.date)"
              >
                <el-radio-button
                  v-for="(item,i) in fromList.fromTxt"
                  :key="i"
                  :label="item.val"
                >{{ item.text }}</el-radio-button>
              </el-radio-group>
              <el-date-picker
                v-model="timeVal"
                value-format="yyyy/MM/dd"
                format="yyyy/MM/dd"
                size="small"
                type="daterange"
                placement="bottom-end"
                placeholder="自定义时间"
                style="width: 250px;"
                clearable
                @change="onchangeTime"
              />
            </el-form-item>           
            <div>
              <el-form-item label="配送订单号">
                <el-input v-model="tableFrom.keyword" placeholder="请输入订单号" class="selWidth" size="small" @keyup.enter.native="getList(1)">
                  <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
                </el-input>
              </el-form-item>
              <el-form-item label="订单号">
                <el-input v-model="tableFrom.order_sn" placeholder="请输入订单号" class="selWidth" size="small" @keyup.enter.native="getList(1)">
                  <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
                </el-input>
              </el-form-item>
              <el-form-item label="发货点名称：" class="width100">
                <el-select
                  v-model="tableFrom.station_id"
                  placeholder="请选择"
                  class="filter-item selWidth mr20"
                  clearable
                  @change="getList(1)"
                >
                  <el-option
                    v-for="item in storeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item> 
              <el-form-item label="状态：" class="width100">
                <el-select
                  v-model="tableFrom.status"
                  placeholder="请选择"
                  class="filter-item selWidth mr20"
                  clearable
                  @change="getList(1)"
                >
                  <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item> 
            </div>
          </el-form>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini">
        <el-table-column label="序号" min-width="50">
          <template scope="scope">
            <span>{{ scope.$index+(tableFrom.page - 1) * tableFrom.limit + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="station.station_name" label="发货点名称" min-width="100" />
        <el-table-column prop="order_sn" label="配送订单号" min-width="60" />
        <el-table-column prop="storeOrder.order_sn" label="订单号" min-width="60" />
        <el-table-column label="配送起点" min-width="100">
         <template slot-scope="scope">
            <div>{{scope.row.station && scope.row.station.station_address}}</div>
          </template>
        </el-table-column>
        <el-table-column label="配送终点" min-width="100">
         <template slot-scope="scope">
            <div> {{scope.row.to_address}}</div>
          </template>
        </el-table-column> 
        <el-table-column label="状态" min-width="60"> 
          <template slot-scope="scope">
            <div> {{scope.row.status | runErrandStatus}}</div>
            <span
              v-if="scope.row.status == -1 && scope.row.reason"
              style="display: block; font-size: 12px; color: red"
            >原因: {{ scope.row.reason }}</span>
          </template>
        </el-table-column>   
        <el-table-column prop="distance" label="配送距离" min-width="100" />
        <el-table-column prop="fee" label="配送费用" min-width="100" />
       <el-table-column prop="create_time" label="消费时间" min-width="100" />
       <el-table-column prop="mark" label="备注" min-width="100" />
       <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status != -1" type="text" size="small" @click="toCancle(scope.row.delivery_order_id)">取消</el-button>
            <!--<el-button type="text" size="small" @click="onDetails(scope.row.delivery_order_id)">详情</el-button>-->
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
import { deliveryOrderLst, getStoreLst, deliveryOrderCancle } from '@/api/order'
export default {
  components: {

  },
  data() {
    return {
      tableData: {
        data: [],
        total: 0
      },
      listLoading: true,
      loading: true,
      tableFrom: {
        keyword: '',
        order_sn: '',
        date: '',
        station_id: '',
        page: 1,
        limit: 20
      },
      timeVal: [],
      fromList: {
        title: '选择时间',
        custom: true,
        fromTxt: [
          { text: '全部', val: '' },
          { text: '今天', val: 'today' },
          { text: '昨天', val: 'yesterday' },
          { text: '最近7天', val: 'lately7' },
          { text: '最近30天', val: 'lately30' },
          { text: '本月', val: 'month' },
          { text: '本年', val: 'year' }
        ]
      },
      storeList: [],
      statusList: [
        {label: '已取消', value: '-1'},
        {label: '待接单', value: '0'},
        {label: '待取货', value: '2'},
        {label: '配送中', value: '3'},
        {label: '已完成', value: '4'},
        {label: '物品返回中', value: '9'},
        {label: '物品返回完成', value: '10'},
        {label: '骑士到店', value: '100'}
      ]
    }
  },
  mounted() {
    this.getList(1)
    this.getStoreList()
  },
  methods: {
    // 选择时间
    selectChange(tab) {
      this.tableFrom.date = tab
      this.timeVal = []
      this.getList(1)
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e
      this.tableFrom.date = e ? this.timeVal.join('-') : ''
      this.getList(1)
    },
    // 获取发货点列表
    getStoreList() {
      getStoreLst(this.tableFrom)
        .then(res => {
          this.storeList = res.data
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num || this.tableFrom.page
      deliveryOrderLst(this.tableFrom)
        .then(res => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.listLoading = false
        })
        .catch(res => {
          this.$message.error(res.message)
          this.listLoading = false
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
    // 取消
    toCancle(id) {
      this.$modalForm(deliveryOrderCancle(id)).then(() => this.getList(''))
    },
    // 详情
    onDetails(id) {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
