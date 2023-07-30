<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px" :inline="true">
            <el-form-item label="选择时间：" style="display: inline-block">
              <el-radio-group
                v-model="tableFrom.date"
                size="small"
                @change="selectChange(tableFrom.date)"
              >
                <el-radio-button
                  v-for="(itemn, indexn) in fromList.fromTxt"
                  :key="indexn"
                  :label="itemn.val"
                  >{{ itemn.text }}</el-radio-button
                >
              </el-radio-group>
              <el-date-picker
                v-model="timeVal"
                type="daterange"
                placeholder="选择日期"
                format="yyyy/MM/dd"
                value-format="yyyy/MM/dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="onchangeTime"
              />
            </el-form-item>
            <el-form-item
              label="关键字："
              label-width="80px"
              style="display: inline-block"
            >
              <el-input
                v-model="tableFrom.keyword"
                @keyup.enter.native="getList(1)"
                placeholder="请输入店铺关键字/店铺名/联系电话"
                class="selWidth"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  class="el-button-solt"
                  @click="getList(1)"
                />
              </el-input>
            </el-form-item>
            <el-form-item label="商户类别：">
              <el-select
                v-model="tableFrom.is_trader"
                clearable
                placeholder="请选择"
                class="selWidth"
                @change="getList(1)"
              >
                <el-option label="自营" value="1" />
                <el-option label="非自营" value="0" />
              </el-select>
            </el-form-item>
            <el-form-item label="商户分类：">
              <el-select
                v-model="tableFrom.category_id"
                clearable
                placeholder="请选择"
                class="selWidth"
                @change="getList(1)"
              >
                <el-option
                  v-for="item in merCateList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="店铺类型：">
              <el-select
                v-model="tableFrom.type_id"
                clearable
                placeholder="请选择"
                class="selWidth"
                @change="getList(1)"
              >
                <el-option
                  v-for="item in storeType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            
            <el-form-item v-if="type == 0" label="审核状态：">
              <el-radio-group
                v-model="tableFrom.status"
                type="button"
                @change="getList(1)"
              >
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="0">待审核</el-radio-button>
                <el-radio-button label="1">已审核</el-radio-button>
                <el-radio-button label="-1">审核失败</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="type == 0" label="退回状态：">
              <el-select
                v-model="tableFrom.status"
                clearable
                placeholder="请选择"
                class="selWidth"
                @change="getList(1)"
              >
                <el-option label="待审核" value="0" />
                <el-option label="未退回" value="-1" />
                <el-option label="已退回" value="1" />
              </el-select>
            </el-form-item>
            <el-tabs
              v-if="headeNum.length > 0"
              v-model="type"
              @tab-click="getList(1)"
            >
              <el-tab-pane
                v-for="(item, index) in headeNum"
                :key="index"
                :name="item.type.toString()"
                :label="item.title"
              />
            </el-tabs>
          </el-form>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        highlight-current-row
        class="switchTable"
      >
        <el-table-column
          :prop="type != 0 ? 'mer_id' : 'financial_id'"
          label="ID"
          min-width="60"
        />
        <el-table-column
          label="商户名称"
          min-width="100"
        >
         <template slot-scope="scope">
            <span>{{(scope.row.merchant&&scope.row.merchant.mer_name) || scope.row.mer_name}}</span>
          </template>
        </el-table-column>
        <el-table-column  v-if="type!=0" key="10" label="店铺类型" min-width="120">
          <template slot-scope="scope">
            <span v-if="type != 2" class="spBlock">{{
              scope.row.merchantType &&
              scope.row.merchantType.type_name
                ? scope.row.merchantType.type_name
                : ""
            }}</span>
            <span v-else class="spBlock">{{
              scope.row.merchantType &&
              scope.row.merchantType.type_name
                ? scope.row.merchantType.type_name
                : ""
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商户姓名"
          min-width="100"
        >
         <template slot-scope="scope">
            <span>{{(scope.row.merchant&&scope.row.merchant.real_name) || scope.row.real_name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="type != 2"
          key="1"
          :prop="type == 0 ? 'merchant.ot_margin' : 'ot_margin'"
          label="保证金额度"
          min-width="80"
        />
        <el-table-column
          v-if="type == 0"
          key="3"
          label="申请状态"
          min-width="100"
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.status == 0
                ? "待审核"
                : scope.row.status == 1
                ? "审核通过"
                : "审核未通过"
            }}</span>
            <span
              v-if="scope.row.status == -1"
              style="display: block; font-size: 12px; color: red"
              >原因： {{ scope.row.refusal }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          v-if="type == 0"
          prop="merchant.margin"
          key="7"
          label="结余保证金"
          min-width="100"
        />
         <el-table-column
          v-if="type == 0"
          prop="extract_money"
          key="9"
          label="退款金额"
          min-width="100"
        />
        <el-table-column
          v-if="type == 0"
          prop="extract_money"
          key="11"
          label="退回方式"
          min-width="100"
        >
         <template slot-scope="scope">
            <span>{{ scope.row.financial_type == 3 ? "线下" : "线上" }}</span>
          </template>
        </el-table-column>  
        <el-table-column
          v-if="type == 0"
          key="4"
          prop="create_time"
          label="申请时间"
          min-width="150"
        />
        <el-table-column
          v-if="type == 1"
          key="14"
          label="支付时间"
          min-width="150"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.marginOrder && scope.row.marginOrder[0] && scope.row.marginOrder[0]['create_time'] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="type == 2"
          key="15"
          label="待缴金额"
          min-width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.is_margin == 1 ? scope.row.margin : (scope.row.ot_margin-scope.row.margin).toFixed(2) }}</span>
          </template>
         </el-table-column>
        <el-table-column
          v-if="type == 2"
          key="18"
          label="保证金额度"
          min-width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.ot_margin }}</span>
          </template>
        </el-table-column>
         <el-table-column label="备注" min-width="120">
          <template slot-scope="scope">
            <span>{{ type == 0 ? scope.row.admin_mark : scope.row.mark }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="280"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              v-if="type == 0"
              type="text"
              size="small"
              @click="handleRemark(scope.row.financial_id)"
              >备注</el-button
            >
            <el-button
              v-if="scope.row.status == 0 && type == 0"
              type="text"
              size="small"
              @click="handleAudit(scope.row.financial_id)"
              >审核</el-button
            >
            <el-button
              v-if="type == 1"
              type="text"
              size="small"
              @click="handleDeduction(scope.row.mer_id)"
              >保证金扣费</el-button
            >
            <el-button
              v-if="
                scope.row.status == 1 &&
                scope.row.financial_status == 1 &&
                type == 0
              "
              type="text"
              size="small"
              @click="handleInfo(scope.row.financial_id)"
              >退回信息</el-button
            >
            <el-button
              v-if="type != 2"
              type="text"
              size="small"
              @click="handleRecord(scope.row.mer_id)"
              >操作记录</el-button
            >
            <el-button
              v-if="type == 2"
              type="text"
              size="small"
              @click="offline(scope.row.mer_id)"
              >线下付款</el-button
            >
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
    <!--退回保证金-->
    <el-dialog
      :title="isReturn ? '退回保证金' : '退回信息'"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <div class="container">
        <div class="label_item">
          <span class="label_title"
            >商户名称: {{ marginData.merchant.mer_name }}</span
          >
        </div>
        <div class="label_item">
          <span class="label_title"
            >商户ID: {{ marginData.merchant.mer_id }}</span
          >
        </div>
        <div class="label_item">
          <span class="label_title"
            >店铺类型:
            {{
              marginData.merchant.merchantType &&
              marginData.merchant.merchantType.type_name
            }}</span
          >
        </div>
        <div class="label_item">
          <span class="label_title"
            >保证金额度:
            {{ marginData.merchant.ot_margin }}元</span
          >
        </div>
        <div class="label_item">
          <span class="label_title"
            >扣费金额:
            {{
              (marginData.financial_account.pay_price -
              marginData.merchant.margin).toFixed(2)
            }}元</span
          >
        </div>
        <div class="label_item">
          <span class="label_title"
            >应退回保证金: {{ marginData.extract_money }}元</span>
        </div>
         <div class="label_item">
          <span class="label_title">退回方式:
            {{ marginData.financial_type == 3 ? "线下退回" : "线上退回" }}</span>
        </div>
        <template v-if="marginData.financial_account && marginData.financial_account.account">
          <div class="label_item" v-if="marginData.financial_account.account.name">
            <span class="label_title">收款人姓名: {{ marginData.financial_account.account.name }}</span>
          </div>
          <div class="label_item" v-if="marginData.financial_account.account.code">
            <span class="label_title">开户银行: {{ marginData.financial_account.account.code }}</span>
          </div>
          <div class="label_item" v-if="marginData.financial_account.account.pic">
            <span v-if="marginData.financial_account.account.type == 1" class="label_title">银行账号: {{ marginData.financial_account.account.pic }}</span>
            <img v-else-if="marginData.financial_account.account.type == 2" :src="marginData.financial_account.account.pic" style="width:120px;height:120px;" alt="">
          </div>
        </template>
        
        <div class="label_item">
          <span class="label_title"
            >审核状态:
            {{ marginData.financial_status == 1 ? "已审核" : "待审核" }}</span
          >
        </div>
        <div class="label_item">
          <span class="label_title"
            >审核时间: {{ marginData.status_time }}</span
          >
        </div>
      </div>
    </el-dialog>
    <!--扣费记录-->
    <el-dialog
      v-if="modalRecord"
      :visible.sync="modalRecord"
      title="操作记录"
      width="800px"
      close-on-click-modal
      class="mapBox"
      custom-class="dialog-scustom"
    >
      <el-table :data="recordData.data" :loading="recordLoading" size="small">
        <el-table-column label="序号" min-width="50">
          <template scope="scope">
            <span>{{
              scope.$index + (recordFrom.page - 1) * recordFrom.limit + 1
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" min-width="90" prop="title" />
        <el-table-column prop="number" label="金额" min-width="60">
          <template scope="scope">
            <span v-if="scope.row.pm == 1" style="color:#13ce66">+{{scope.row.number}}</span>
            <span v-else style="color:rgb(237, 64, 20)">-{{scope.row.number}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="保证金结余" min-width="100" />
        <el-table-column label="备注" min-width="150" prop="mark" />
        <el-table-column prop="create_time" label="操作时间" min-width="100" />
      </el-table>
      <div class="acea-row row-right page">
        <el-pagination
          :page-sizes="[20, 40, 60, 80]"
          :page-size="recordFrom.limit"
          :current-page="recordFrom.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="recordData.total"
          @size-change="handleSizeChanges"
          @current-change="pageChanges"
        />
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
import {
  marginLstApi,
  marginRefundLstApi,
  marginRefundStatus,
  marginRefundMark,
  marginDepositLstApi,
  marginPaymentApi,
  getstoreTypeApi,
  marginDeductionForm,
  getMerCateApi,
  marginRefundInfo,
  marginDeductionRecord,
} from "@/api/merchant";

import { fromList } from "@/libs/constants.js";
import { roterPre } from "@/settings";
export default {
  name: "MerchantList",
  data() {
    return {
      fromList: fromList,
      roterPre: roterPre,
      isChecked: false,
      listLoading: true,
      recordLoading: true,
      merCateList: [],
      storeType: [],
      dialogVisible: false,
      modalRecord: false,
      formValidate: {},
      isReturn: false,
      type: "1",
      headeNum: [
        {
          count: "",
          type: "2",
          title: "待缴保证金",
        },
        {
          count: "",
          type: "1",
          title: "缴存保证金",
        },
        {
          count: "",
          type: "0",
          title: "退回保证金",
        },
      ],
      tableData: {
        data: [],
        total: 0,
      },
      recordData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 20,
        date: "",
        status: "",
        keyword: "",
        is_trader: "",
        category_id: "",
        type_id: "",
      },
      recordFrom: {
        page: 1,
        limit: 20,
      },
      autoUpdate: true,
      timeVal: [],
      recordId: "",
      marginData: {
        merchant: {},
        financial_account: {},
      },
    };
  },
  mounted() {
    this.getMerCategory();
    this.getStoreType();
    this.getList("");
  },
  methods: {
    // 选择时间
    selectChange(tab) {
      this.tableFrom.date = tab;
      this.timeVal = [];
      this.tableFrom.page = 1;
      this.getList("");
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e;
      this.tableFrom.date = this.timeVal ? this.timeVal.join("-") : "";
      this.tableFrom.page = 1;
      this.getList("");
    },
    // 商户分类；
    getMerCategory() {
      getMerCateApi()
        .then((res) => {
          this.merCateList = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    getStoreType() {
      getstoreTypeApi()
        .then((res) => {
          this.storeType = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      this.type == 1   
        ? marginLstApi(this.tableFrom) //缴存
          .then((res) => {
            this.tableData.data = res.data.list;
            this.tableData.total = res.data.count;
            this.listLoading = false;
          })
          .catch((res) => {
            this.listLoading = false;
            this.$message.error(res.message);
          })
      : this.type == 2 ? marginDepositLstApi(this.tableFrom) //待缴
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
          this.listLoading = false;
        })
        .catch((res) => {
          this.listLoading = false;
          this.$message.error(res.message);
        }) 
      : marginRefundLstApi(this.tableFrom) //退回
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
      this.getList("");
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      this.getList(1);
    },
    pageChanges(page) {
      this.recordFrom.page = page;
      this.getRecordList(this.recordId);
    },
    handleSizeChanges(val) {
      this.recordFrom.limit = val;
      this.getRecordList(this.recordId);
    },
    // 列表
    getRecordList(id) {
      this.recordLoading = true;
      this.recordId = id;
      marginDeductionRecord(id, this.recordFrom)
        .then((res) => {
          this.recordData.data = res.data.list;
          this.recordData.total = res.data.count;
          this.recordLoading = false;
        })
        .catch((res) => {
          this.recordLoading = false;
          this.$message.error(res.message);
        });
    },
    // 审核
    handleAudit(id) {
      this.$modalForm(marginRefundStatus(id)).then(() => this.getList(""));
    },
    // 备注
    handleRemark(id) {
      this.$modalForm(marginRefundMark(id)).then(() => this.getList(""));
    },
    // 保证金扣费
    handleDeduction(id) {
      this.$modalForm(marginDeductionForm(id)).then(() => this.getList(""));
    },
    // 退回信息
    handleInfo(id) {
      this.dialogVisible = true;
      marginRefundInfo(id)
        .then((res) => {
          this.marginData = res.data;
          this.marginData.merchant = res.data.merchant;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 线下付款
    offline(id) {
      this.$modalForm(marginPaymentApi(id)).then(() => this.getList(""));
    },
    // 退回记录
    handleRecord(id) {
      this.modalRecord = true;
      this.recordFrom.page = 1;
      this.getRecordList(id);
    },
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  margin-top: 10px;
}
.label_item {
  margin-bottom: 20px;
}
/deep/.el-card__header{
  border-bottom: none;
  padding-bottom: 0;
}
</style>
