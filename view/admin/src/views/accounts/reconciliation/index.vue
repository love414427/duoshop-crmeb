<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="filter-container">
          <el-form :inline="true" size="small">
            <el-form-item label="对账状态：" class="mr20">
              <el-select v-model="tableFrom.status" placeholder="请选择使用状态" @change="getList(1)">
                <el-option label="全部" value />
                <el-option label="未确认" value="0" />
                <el-option label="已拒绝" value="1" />
                <el-option label="已确认" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="时间选择：" class="mr10">
              <el-date-picker
                v-model="timeVal"
                type="daterange"
                align="right"
                unlink-panels
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy/MM/dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                @change="onchangeTime"
              />
            </el-form-item>
            <el-form-item label="关键字：" class="mr10">
              <el-input v-model="tableFrom.keyword" @keyup.enter.native="getList(1)" placeholder="请输入管理员姓名/商户名称" class="selWidth">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="mini"
        class="table"
        highlight-current-row
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="银行卡持卡人：">
                <span>{{ props.row.bank_name | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="开户行地址：">
                <span>{{ props.row.bank_address | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="转账时间：">
                <span>{{ props.row.accounts_time | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="备注：">
                <span>{{ props.row.admin_mark | filterEmpty }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="reconciliation_id" label="ID" width="60" />
        <el-table-column prop="admin.real_name" label="后台管理员" min-width="100" />
        <el-table-column prop="merchant.mer_name" label="商户名称" min-width="150" />
        <el-table-column label="对账状态" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.status | reconciliationStatusFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="对账总金额" min-width="120" />
        <el-table-column prop="charge" label="总扣除金额" min-width="120" />
        <el-table-column prop="bank" label="开户行" min-width="180" />
        <el-table-column label="银行卡号" min-width="150" prop="bank_number" />
        <el-table-column prop label="转账状态" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.is_accounts | accountStatusFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180" fixed="right">
          <template slot-scope="scope">
            <router-link
              :to="{path: roterPre+ '/accounts/reconciliation/order/' + scope.row.reconciliation_id + '/0' }"
              class="mr5"
            >
              <el-button type="text" size="small">查看订单</el-button>
            </router-link>
            <el-button
              v-if="scope.row.status === 2"
              type="text"
              size="small"
              @click="onAccounts(scope.row.reconciliation_id)"
            >确认转账</el-button>
            <el-button type="text" size="small" @click="onMark(scope.row.reconciliation_id)">备注</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block mb20">
        <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          :page-size="tableFrom.limit"
          :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>

    <el-dialog
      title="请选择转账状态"
      :visible.sync="dialogVisible"
      width="450px"
      :before-close="handleClose"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="转账状态" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio label="1">已转账</el-radio>
            <el-radio label="2">未转帐</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
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
import {
  reconciliationListApi,
  reconciliationStatusApi,
  reconciliationMarkApi,
} from "@/api/accounts";
import { roterPre } from "@/settings";
export default {
  name: "Record",
  data() {
    return {
      loading: false,
      roterPre: roterPre,
      timeVal: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      listLoading: true,
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 10,
        date: "",
        status: "",
        keyword: '',
        reconciliation_id: this.$route.query.reconciliation_id ? this.$route.query.reconciliation_id : ""
      },
      ruleForm: {
        status: "2",
      },
      dialogVisible: false,
      rules: {
        status: [
          { required: true, message: "请选择转账状态", trigger: "change" },
        ],
      },
      reconciliationId: 0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    onMark(id) {
      this.$modalForm(reconciliationMarkApi(id)).then(() => this.getList());
    },
    onAccounts(id) {
      this.reconciliationId = id;
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
      this.$refs["ruleForm"].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          reconciliationStatusApi(this.reconciliationId, this.ruleForm)
            .then((res) => {
              this.$message.success(res.message);
              this.loading = false;
              this.handleClose();
              this.getList();
            })
            .catch((res) => {
              this.$message.error(res.message);
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e;
      this.tableFrom.date = this.timeVal ? this.timeVal.join("-") : "";
      this.tableFrom.page = 1;
      this.getList();
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      reconciliationListApi(this.tableFrom)
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
      this.getList();
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      this.chkName = "";
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.spBlock {
  cursor: pointer;
}
.check {
  color: #00a2d4;
}
.tabPop {
  /deep/ .el-popover {
    width: 100px !important;
  }
}
.fang {
  display: inline-block;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  background-color: #fff;
  z-index: 1;
  -webkit-transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
    background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
  transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
    background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
}
.el-table /deep/.DisabledSelection .cell .el-checkbox__inner {
  margin-left: -30px;
  position: relative;
}
.el-table /deep/.DisabledSelection .cell:before {
  content: "全选";
  position: absolute;
  right: 11px;
}
.demo-table-expands {
  /deep/ label {
    width: 84px !important;
    color: #99a9bf;
  }
}
.selWidth {
  width: 300px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 12px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.tabBox_tit {
  width: 60%;
  font-size: 12px !important;
  margin: 0 2px 0 10px;
  letter-spacing: 1px;
  padding: 5px 0;
  box-sizing: border-box;
}
</style>
