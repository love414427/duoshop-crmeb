<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <div class="demo-input-suffix acea-row">
            <el-form inline size="small" label-width="100px">
              <el-form-item label="时间选择：" class="width100">
                <el-date-picker
                  class="selWidth"
                  v-model="timeVal"
                  value-format="yyyy/MM/dd"
                  format="yyyy/MM/dd"
                  size="small"
                  type="daterange"
                  placement="bottom-end"
                  placeholder="自定义时间"
                  @change="onchangeTime"
                />
              </el-form-item>
              <el-form-item label="支付方式：">
                <el-select v-model="tableFrom.pay_type" clearable placeholder="请选择" class="selWidth" @change="getList()">
                  <el-option label="微信" value="weixin" />
                  <el-option label="支付宝" value="alipay" />
                  <el-option label="小程序" value="routine" />
                  <el-option label="平台设置" value="sys" />
                  <el-option label="免费" value="free" />
                </el-select>
              </el-form-item>
              <el-form-item label="会员卡名称：">
                <el-input v-model="tableFrom.title" @keyup.enter.native="getList()" placeholder="请输入会员卡名称" class="selWidth" />
              </el-form-item>             
              <el-form-item label="搜索：">
                <el-input v-model="tableFrom.keyword" @keyup.enter.native="getList(1)" placeholder="请输入用户名称搜索" class="selWidth" />
              </el-form-item>
               <el-button size="small" type="primary" @click="getList">搜索</el-button>
            </el-form>
          </div>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
      >
        <el-table-column prop="order_sn" label="订单号" min-width="100" />
        <el-table-column prop="user.nickname" label="用户名" min-width="80" />
        <el-table-column prop="user.phone" label="手机号码" min-width="60" />
        <el-table-column prop="title" label="会员卡名称" min-width="60" />
        <el-table-column prop="pay_price" label="支付金额(元)" min-width="60" />
        <el-table-column prop="price" label="支付方式" min-width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.pay_type | svipPayType }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="paid" label="支付状态" min-width="60" > 
          <template slot-scope="scope">
            <span v-if = "scope.row.pay_type == 'sys' || scope.row.pay_type == 'free'">无需支付</span>
            <span v-else>{{ scope.row.paid ? '已支付' : '未支付' }}</span>
          </template> </el-table-column>
        <el-table-column prop="create_time" label="购买时间" min-width="60" />
        <el-table-column prop="user.svip_endtime" label="到期时间" min-width="60" />
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
  memberRecordListApi
} from "@/api/user";
export default {
  name: "LabelList",
  data() {
    return {
      listLoading: true,
      timeVal: [],
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 20,
        title: '',
        keyword: '',
        pay_type: '',
        date: ''
      },
    };
  },
  mounted() {
    this.getList('');
  },
  methods: {  
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e;
      this.tableFrom.date = e ? this.timeVal.join("-") : "";
      this.tableFrom.page = 1;
      this.getList(1);
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      memberRecordListApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;  
          this.listLoading = false;
        })
        .catch((res) => {
          this.listLoading = false;
          this.$message.error(res.message);
        });
    },
    pageChange(page) {
      this.tableFrom.page = page;
      this.getList('');
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      this.getList('');
    },
  },
};
</script>

<style scoped lang="scss">
.selWidth {
  width: 280px !important;
}
</style>
