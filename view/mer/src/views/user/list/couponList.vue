<template>
  <div class="divBox">
    <div class="header clearfix">
      <div class="container">
        <el-form inline size="small">
          <el-form-item label="优惠劵名称：">
            <el-input v-model="tableFrom.coupon_name" @keyup.enter.native="getList(1)" placeholder="请输入优惠券名称" class="selWidth" size="small">
              <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-table
      ref="table"
      v-loading="listLoading"
      :data="tableData.data"
      style="width: 100%"
      size="mini"
      max-height="400"
      tooltip-effect="dark"
    >
      <el-table-column width="55">
        <template slot-scope="scope">
            <el-radio
              v-model="templateRadio"
              :label="scope.row.coupon_id"
              @change.native="getTemplateRow(scope.row)"
            >&nbsp</el-radio>
        </template>
      </el-table-column>
      <el-table-column
        prop="coupon_id"
        label="ID"
        min-width="50"
      />
      <el-table-column
        prop="title"
        label="优惠券名称"
        min-width="120"
      />
      <el-table-column
        label="优惠劵类型"
        min-width="80"
      >
        <template slot-scope="{ row }">
          <span>{{ row.type | couponTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="coupon_price"
        label="优惠券面值"
        min-width="90"
      />
      <el-table-column
        label="最低消费额"
        min-width="90"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.use_min_price===0?'不限制':scope.row.use_min_price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="有效期限"
        min-width="250"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.coupon_type===1?scope.row.use_start_time+' 一 '+scope.row.use_end_time:scope.row.coupon_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="剩余数量"
        min-width="90"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.is_limited===0 ? '不限量' : scope.row.remain_count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" class="mr10" :disabled="multipleSelection.coupon_id != scope.row.coupon_id" @click="send(scope.row.coupon_id)">发送</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block mb20">
      <el-pagination
        :page-sizes="[5, 10, 20]"
        :page-size="tableFrom.limit"
        :current-page="tableFrom.page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="pageChange"
      />
    </div>
    <div>
      <!-- <el-button size="small" type="primary" class="fr" @click="ok">确定</el-button> -->
      <!-- <el-button size="small" class="fr mr20" @click="close">取消</el-button> -->
    </div>
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
import { couponIssueListApi,couponSendApi } from '@/api/marketing'
import { roterPre } from '@/settings'
export default {
  name: 'CouponList',
  props: {
    couponForm: {
      type: Object,
      required: true
    },
    checkedIds: {
      type: Array,
      default: []
    },
    allCheck: {
      type: Boolean,
      default: false
    },
    userFrom: {
      type: Object,
      required: true
    } 
  },
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
        limit: 5,
        coupon_name: ''
      },
      multipleSelection: {
        coupon_id: ''
      },
      templateRadio: 0,
    }
  },
  mounted() {
    this.tableFrom.page = 1
    this.getList(1)

  },
  methods: {
    getTemplateRow(row) {
        this.multipleSelection = { coupon_id: row.coupon_id };
        // this.$emit("getCouponData", this.multipleSelection);
    },
    // 发送优惠券
    send(id){
        delete this.userFrom['page']
        delete this.userFrom['limit']
        let that = this;
        that.$confirm('确定要发送优惠券吗？发送优惠券后将无法恢复，请谨慎操作！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              let params = {
                coupon_id: id,
                search: that.userFrom,
                mark: that.filter(this.couponForm),
                is_all: that.allCheck ? 1 : 0,
                uid: that.checkedIds   
              }
              couponSendApi(params).then(res => {
                that.$message.success(res.message)
                that.$emit("sendSuccess");
              }).catch(res => {
                that.$message.error(res.message)
              })
            
          }).catch(action => {
            tthathis.$message({
              type: 'info',
              message: '已取消'
            })
          })
    },
    filter(data) {
        for ( var key in data ){
            if ( data[key] === '' ){
                delete data[key]
            }
        }
        return data
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page
      couponIssueListApi(this.tableFrom).then(res => {
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
      this.getList('')
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList('')
    }
  }
}
</script>

<style scoped lang="scss">
  .selWidth{
    width: 219px !important;
  }
  .seachTiele{
    line-height: 35px;
  }
  .fr{
    float: right;
  }
</style>
