<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="80px" :inline="true">
            <el-form-item label="搜索：">
              <el-input v-model="tableFrom.keyword" placeholder="请输入用户名称、标题" class="selWidth mr20" clearable @keyup.enter.native="getList(1)">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
            <el-form-item label="时间选择：" class="width100">
              <el-date-picker v-model="timeVal" value-format="yyyy/MM/dd" format="yyyy/MM/dd" size="small" type="daterange" placement="bottom-end" placeholder="自定义时间" style="width: 250px;" @change="onchangeTime" />
            </el-form-item>
          </el-form>
          <cards-data :card-lists="cardLists" />
        </div>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="small" highlight-current-row>
        <el-table-column prop="bill_id" label="ID" min-width="50" />
        <el-table-column prop="nickname" label="用户微信昵称" min-width="120" />
        <el-table-column prop="title" label="积分标题" min-width="120" />
        <el-table-column prop="number" label="积分变动" min-width="120" />
        <el-table-column prop="balance" label="当前积分额度" min-width="120" />
        <el-table-column prop="mark" label="备注" min-width="120" />
        <el-table-column prop="create_time" label="添加时间" min-width="120" />
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
import { integralLstApi, integralTitleApi } from '@/api/marketing'
import { roterPre } from '@/settings'
import cardsData from '@/components/cards/index'
export default {
  name: 'CouponList',
  components: { cardsData },
  data() {
    return {
      Loading: false,
      dialogVisible: false,
      detailDialog: false,
      roterPre: roterPre,
      listLoading: true,
      timeVal: [],
      cardLists: [],
      tableData: {
        data: [],
        total: 0
      },
      tableFrom: {
        page: 1,
        limit: 20,
        keyword: '',
        date: ''
      }
    }
  },
  mounted() {
    this.getList(1)
    this.getIntegralTitle()
  },
  methods: {
    // 获取统计数据
    getIntegralTitle() {
      integralTitleApi({ date: this.tableFrom.date }).then((res) => {
        this.cardLists = res.data
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
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num || this.tableFrom.page
      integralLstApi(this.tableFrom).then(res => {
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
  .modalbox{
    /deep/.el-dialog{
      min-width: 550px;
    }
  }
  .seachTiele{
    line-height: 35px;
  }
  .fa{
    color: #0a6aa1;
    display: block;
  }
  .sheng{
    color: #ff0000;
    display: block;
  }
  .ml20{
    margin-left: 20px;
  }
  .box-container {
    overflow: hidden;
  }
  .box-container .list {
    float: left;
    line-height: 40px;
  }
  .box-container .sp {
    width: 50%;
  }
  .box-container .sp3 {
    width: 33.3333%;
  }
  .box-container .sp100 {
    width: 100%;
  }
  .box-container .list .name {
    display: inline-block;
    width: 150px;
    text-align: right;
    color: #606266;
  }
  .box-container .list .blue {
    color: #1890ff;
  }
  .box-container .list.image {
    margin-bottom: 40px;
  }
  .box-container .list.image img {
    position: relative;
    top: 40px;
  }
</style>
