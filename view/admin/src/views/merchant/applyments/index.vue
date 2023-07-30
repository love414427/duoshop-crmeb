<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px" :inline="true">
            <el-form-item label="选择时间：" style="width: 100%">
              <el-radio-group v-model="tableFrom.date" size="small" @change="selectChange(tableFrom.date)">
                <el-radio-button v-for="(itemn, indexn) in fromList.fromTxt" :key="indexn" :label="itemn.val">{{ itemn.text }}</el-radio-button>
              </el-radio-group>
              <el-date-picker v-model="timeVal" type="daterange" placeholder="选择日期" format="yyyy/MM/dd" value-format="yyyy/MM/dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="onchangeTime" />
            </el-form-item>
            <el-form-item label="状态：">
              <el-radio-group v-model="tableFrom.status" size="small" @change="statusChange(tableFrom.status)">
                <el-radio-button v-for="(itemn, indexn) in statusList" :key="indexn" :label="itemn.val">{{ itemn.text }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="商户名称：">
              <el-select v-model="tableFrom.mer_id" clearable filterable placeholder="请选择" class="selWidth" @change="getList(1)">
                <el-option v-for="item in merSelect" :key="item.mer_id" :label="item.mer_name" :value="item.mer_id" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="small" highlight-current-row class="switchTable">
        <el-table-column prop="mer_applyments_id" label="ID" min-width="60" />
        <el-table-column prop="applyment_id" label="微信支付申请单号" min-width="150" />
        <el-table-column prop="out_request_no" label="业务申请编号" min-width="260" />
        <el-table-column prop="merchant.mer_name" label="商户名" min-width="100" />
        <el-table-column prop="sub_mchid" label="分账商户ID" min-width="100" />
        <el-table-column prop="message" label="审核结果" min-width="100" />
        <el-table-column prop="create_time" label="申请时间" min-width="150" />
        <el-table-column label="状态" min-width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 0">待审核</div>
            <div v-if="scope.row.status == -1">平台驳回</div>
            <div v-if="scope.row.status == 10">平台提交审核中</div>
            <div v-if="scope.row.status == 1">商户验证</div>
            <div v-if="scope.row.status == 20">已完成</div>
            <div v-if="scope.row.status == 30">已冻结</div>
            <div v-if="scope.row.status == 40">微信驳回</div>
          </template>
        </el-table-column>
        <el-table-column prop="mark" label="备注" min-width="150" />
        <el-table-column label="操作" min-width="280" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleMark(scope.row.mer_applyments_id)">备注</el-button>
            <el-button v-if="scope.row.status == 0" type="text" size="small" @click="handleDetail(scope.row.mer_id)">审核</el-button>
            <el-button type="text" size="small" @click="handleDetail(scope.row.mer_id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="tableFrom.limit" :current-page="tableFrom.page" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange" @current-change="pageChange" />
      </div>
    </el-card>
    <!-- 详情 -->
    <el-dialog title="详情" :visible.sync="visible" width="1000px" :before-close="handleClose" class="dia">
      <div v-loading="loading">
        <div class="box-container">
          <div class="acea-row">
            <div class="list sp"><label class="name">业务申请编号：</label>{{ formValidate.out_request_no }}</div>
            <div class="list sp"><label class="name">主体类型：</label>{{formValidate.organization_type | organizationType }}</div>
          </div>
          <div v-if="formValidate.organization_type != 2401 && formValidate.organization_type != 2500">
            <div class="title" style="margin-top: 20px;">{{(formValidate.organization_type == 2 || formValidate.organization_type == 4) ? '营业执照信息' : '登记证书信息'}}</div>
            <div class="acea-row">
              <div class="list sp100 image">
                <label class="name">证件扫描件：</label>
                <span class="img">
                    <img style="max-width: 150px; height: 80px;" :src="formValidate.business_license_copy && formValidate.business_license_copy['dir']" @click="getPicture(formValidate.business_license_copy['dir'])" />
                </span>
            </div>
                <div class="list sp100"><label class="name">证件注册号：</label>{{ formValidate.business_license_number }}</div>
                <div class="list sp100"><label class="name">商户名称：</label>{{ formValidate.merchant_name }}</div>
                <div class="list sp"><label class="name">经营者/法定代表人姓名：</label>{{ formValidate.legal_person }}</div>
                <div class="list sp" v-if="formValidate.company_address"><label class="name">注册地址：</label>{{ formValidate.company_address }}</div>
                <div class="list sp" v-if="formValidate.business_time"><label class="name">营业期限：</label>{{ formValidate.business_start +'-'+ formValidate.business_end }}</div>
            </div>            
          </div>
          <div v-if="formValidate.organization_cert_info">
            <div class="title" style="margin-top: 20px;">组织机构代码证信息：</div>
            <div class="acea-row">
              <div class="list sp100 image">
                <label class="name">组织机构代码证照片：</label>
                <span class="img">
                  <img style="max-width: 150px; height: 80px;" :src="formValidate.organization_copy && formValidate.organization_copy['dir']" @click="getPicture(formValidate.organization_copy['dir'])" />
                </span>
              </div>
              <div class="list sp"><label class="name">组织机构代码：</label>{{ formValidate.organization_number }}</div>
              <div class="list sp"><label class="name">组织机构代码有效期限：</label>{{ formValidate.start_time+'-'+formValidate.end_time }}</div>
              <div class="list sp"><label class="name">经营者/法人证件类型：</label>{{ formValidate.id_doc_type | id_docType}}</div>
            </div>
          </div>
          <div v-if="formValidate.id_doc_type == 1">
            <div class="title" style="margin-top: 20px;">经营者/法人身份证信息：</div>
            <div class="acea-row">
              <div class="list sp100 image">
                <label class="name">身份证人像面照片：</label>
                <span class="img">
                  <img style="max-width: 150px; height: 80px;" :src="formValidate.id_card_copy && formValidate.id_card_copy['dir']" @click="getPicture(formValidate.id_card_copy['dir'])" />
                </span>
              </div>
              <div class="list sp100 image">
                <label class="name">身份证国徽面照片：</label>
                <span class="img">
                  <img style="max-width: 150px; height: 80px;" :src="formValidate.id_card_national && formValidate.id_card_national['dir']" @click="getPicture(formValidate.id_card_national['dir'])" />
                </span>
              </div>
              <div class="list sp"><label class="name">身份证姓名：</label>{{formValidate.id_card_name}}</div>
              <div class="list sp"><label class="name">身份证号码：</label>{{formValidate.id_card_number}}</div>
              <div class="list sp"><label class="name">身份证有效期限：</label>{{formValidate.id_card_valid_time}}</div>
            </div>
          </div>
          <div v-else>
            <div class="title" style="margin-top: 20px;">经营者/法人其他类型证件信息：</div>
            <div class="acea-row">
              <div class="list sp"><label class="name">证件姓名：</label>{{formValidate.id_doc_name}}</div>
              <div class="list sp"><label class="name">证件号码：</label>{{formValidate.id_doc_number }}</div>
              <div class="list sp100 image">
                <label class="name">证件照片：</label>
                <span class="img">
                  <img style="max-width: 150px; height: 80px;" :src="formValidate.id_doc_copy && formValidate.id_doc_copy['dir']" @click="getPicture(formValidate.id_doc_copy['dir'])" />
                </span>
              </div>
              <div class="list sp"><label class="name">证件结束日期：</label>{{formValidate.doc_period_end}}</div>
            </div>
          </div>
          <div>
            <div class="title" style="margin-top: 20px;">结算银行账户：</div>
            <div class="acea-row">
              <div class="list sp"><label class="name">账户类型：</label>{{formValidate.bank_account_type == 74 ? '对公账户' : '对私账户'}}</div>
              <div class="list sp"><label class="name">开户银行：</label>{{formValidate.account_bank}}</div>
              <div class="list sp"><label class="name">开户名称：</label>{{formValidate.account_name}}</div>
              <div class="list sp"><label class="name">开户银行省市编码：</label>{{formValidate.bank_address_code}}</div>
              <div v-if="formValidate.bank_branch_id" class="list sp"><label class="name">开户银行联行号：</label>{{formValidate.bank_branch_id}}</div>
              <div v-if="formValidate.bank_name" class="list sp"><label class="name">开户银行全称 （含支行）：</label>{{formValidate.bank_name}}</div>
              <div class="list sp"><label class="name">银行帐号：</label>{{formValidate.account_number}}</div>
            </div>
          </div>
          <div>
            <div class="title" style="margin-top: 20px;">超级管理员信息：</div>
            <div class="acea-row">
              <div class="list sp"><label class="name">超级管理员类型：</label>{{formValidate.contact_type == 65 ? '经营者/法人' : '负责人'}}</div>
              <div class="list sp"><label class="name">超级管理员姓名：</label>{{formValidate.contact_name}}</div>
              <div class="list sp"><label class="name">超级管理员身份证件号码：</label>{{formValidate.contact_id_card_number}}</div>
              <div class="list sp"><label class="name">超级管理员手机：</label>{{formValidate.mobile_phone}}</div>
              <div v-if="formValidate.contact_email" class="list sp"><label class="name">超级管理员邮箱：</label>{{formValidate.contact_email}}</div>
            </div>
          </div>
          <div>
            <div class="title" style="margin-top: 20px;">店铺信息：</div>
            <div class="acea-row">
              <div class="list sp"><label class="name">店铺名称：</label>{{formValidate.store_name}}</div>
              <div v-if="formValidate.store_url" class="list sp"><label class="name">店铺链接：</label>{{formValidate.store_url}}</div>
              <div v-if="formValidate.store_qr_code" class="list sp100 image">
                <label class="name">店铺二维码：</label>
                <span class="img">
                  <img style="max-width: 150px; height: 80px;" :src="formValidate.store_qr_code && formValidate.store_qr_code['dir']" @click="getPicture(formValidate.store_qr_code['dir'])" />
                </span>
              </div>
              <div v-if="formValidate.mini_program_sub_appid" class="list sp"><label class="name">小程序AppID：</label>{{formValidate.mini_program_sub_appid}}</div>
              <div class="list sp"><label class="name">商户简称：</label>{{formValidate.merchant_shortname}}</div>
              <div class="list sp100 image" v-if="formValidate.qualifications && formValidate.qualifications.length > 0">
                <label class="name">特殊资质：</label>
                <span class="img">
                  <img v-for="(item, index) in formValidate.qualifications" :key="index" @click="getPicture(item.dir)" style="max-width: 150px; height: 80px;" :src="item['dir']" />
                </span>
              </div>
              <div class="list sp100 image" v-if="formValidate.business_addition_pics && formValidate.business_addition_pics.length > 0">
                <label class="name">补充材料：</label>
                <span class="img">
                  <img v-for="(item, index) in formValidate.business_addition_pics" :key="index" @click="getPicture(item.dir)" style="max-width: 150px; height: 80px;" :src="item['dir']" />
                </span>
              </div>
              <div v-if="formValidate.business_addition_desc" class="list sp"><label class="name">补充说明：</label>{{formValidate.business_addition_desc}}</div>
              <div v-if="formValidate.message" class="list sp"><label class="name">{{ (formValidate.status == -1 || formValidate.status == 40) ? '驳回原因' :  formValidate.status == 11 ? '需验证操作' : '审核结果' }}：</label>{{formValidate.message}}</div>
            </div>
          </div>
        </div>
        <el-form v-if="formValidate.status == 0" ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
          <el-form-item label="审核状态" prop="status">
            <el-radio-group v-model="ruleForm.status">
              <el-radio :label="10">通过</el-radio>
              <el-radio :label="-1">拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="ruleForm.status===-1" label="原因" prop="refusal">
            <el-input v-model="ruleForm.message" type="textarea" placeholder="请输入原因" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!--查看图片-->
    <el-dialog v-if="pictureVisible" :visible.sync="pictureVisible" width="700px">
      <img :src="pictureUrl" class="pictures">
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
  getApplymentLst,
  applymentDetailApi,
  applymentStatusApi, splitAccountMark
} from "@/api/merchant";
import { merSelectApi } from "@/api/product";
import { fromList } from "@/libs/constants.js";
import { roterPre } from "@/settings";
export default {
  name: "MerchantApplyMents",
  data() {
    return {
      props: {
        emitPath: false
      },
      fromList: fromList,
      merSelect: [],
      statusList: [
        { text: '全部', val: '' },
        { text: '待审核', val: '0' },
        { text: '平台驳回', val: '-1' },
        { text: '审核中', val: '10' },
        { text: '商户验证', val: '11' },
        { text: '已完成', val: '20' },
        { text: '已冻结', val: '30' },
        { text: '微信驳回', val: '40' }
      ], //筛选状态列表
      roterPre: roterPre,
      listLoading: true,
      loading: true,
      storeType: [],
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 20,
        date: "",
        status: "",
        mer_id: "",
      },
      timeVal: [],
      visible: false,
      formValidate: {},
      ruleForm: {
        message: '',
        status: 10,
      },
      rules: {
        status: [
          { required: true, message: '请选择审核状态', trigger: 'change' }
        ],
        message: [
          { required: true, message: '请填写拒绝原因', trigger: 'blur' }
        ]
      },
      pictureVisible: false,
      pictureUrl: ''
    };
  },
  watch: {
  },
  mounted() {
    this.getMerSelect()
    this.getList("");
  },
  methods: {
    // 商户列表；
    getMerSelect() {
      merSelectApi().then(res => {
        this.merSelect = res.data
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    // 查看图片
    getPicture(url) {
      this.pictureVisible = true
      this.pictureUrl = url
    },
    // 选择时间
    selectChange(tab) {
      this.tableFrom.date = tab;
      this.timeVal = [];
      this.tableFrom.page = 1;
      this.getList("");
    },
    statusChange(tab) {
      this.tableFrom.status = tab;
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
    handleClose() {
      this.visible = false
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      getApplymentLst(this.tableFrom)
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
    // 审核
    onSubmit() {
      applymentStatusApi(this.formValidate.mer_applyments_id, this.ruleForm).then((res) => {
        this.$message.success(res.message)
        this.visible = false
        this.getList('')
      }).catch((res) => {
        this.$message.error(res.message)
      });
    },
    // 备注
    handleMark(id) {
       this.$modalForm(splitAccountMark(id)).then(() => this.getList(''))
    },
    // 详情
    handleDetail(id) {
      this.loading = true
      this.formValidate = {}
      applymentDetailApi(id).then((res) => {
        this.visible = true;
        this.loading = false;
        let info = res.data.info;
        this.formValidate = {
          mer_applyments_id: res.data.mer_applyments_id,
          status: res.data.status,
          message: res.data.message,
          id_doc_type: info.id_doc_type,
          out_request_no: info.out_request_no,
          organization_type: info.organization_type,
          business_license_copy: info.business_license_info ? info.business_license_info.business_license_copy : '',
          business_license_number: info.business_license_info ? info.business_license_info.business_license_number : '',
          merchant_name: info.business_license_info ? info.business_license_info.merchant_name : '',
          legal_person: info.business_license_info ? info.business_license_info.legal_person : '',
          company_address: info.business_license_info ? info.business_license_info.company_address : '',
          organization_cert_info: info.organization_cert_info,
          organization_copy: info.organization_cert_info ? info.organization_cert_info.organization_copy : '',
          organization_number: info.organization_cert_info ? info.organization_cert_info.organization_number : '',
          need_account_info: info.need_account_info,
          contact_type: info.contact_info ? info.contact_info.contact_type : 65,
          contact_name: info.contact_info ? info.contact_info.contact_name : '',
          contact_id_card_number: info.contact_info ? info.contact_info.contact_id_card_number : '',
          mobile_phone: info.contact_info ? info.contact_info.mobile_phone : '',
          contact_email: info.contact_info ? info.contact_info.contact_email : '',
          store_name: info.sales_scene_info ? info.sales_scene_info.store_name : '',
          store_url: info.sales_scene_info ? info.sales_scene_info.store_url : '',
          store_qr_code: info.sales_scene_info ? info.sales_scene_info.store_qr_code : '',
          mini_program_sub_appid: info.sales_scene_info ? info.sales_scene_info.mini_program_sub_appid : '',
          merchant_shortname: info.merchant_shortname,
          qualifications: info.qualifications ? info.qualifications : [],
          business_addition_pics: info.business_addition_pics ? info.business_addition_pics : [],
          business_addition_desc: info.business_addition_desc,
          business_time: info.business_license_info ? info.business_license_info.business_time : '',
          business_start: info.business_license_info && info.business_license_info.business_time ? info.business_license_info.business_time[0] : '',
          business_end: info.business_license_info && info.business_license_info.business_time ? info.business_license_info.business_time[1] : '',
          start_time: info.organization_cert_info && info.organization_cert_info.organization_time ? info.organization_cert_info.organization_time[0] : '',
          end_time: info.organization_cert_info && info.organization_cert_info.organization_time ? info.organization_cert_info.organization_time[1] : '',
          bank_account_type: (info.account_info && info.account_info.bank_account_type) || 74,
          account_bank: info.account_info ? info.account_info.account_bank : '',
          account_name: info.account_info ? info.account_info.account_name : '',
          bank_address_code: info.account_info ? info.account_info.bank_address_code : '',
          bank_branch_id: info.account_info ? info.account_info.bank_branch_id : '',
          bank_name: info.account_info ? info.account_info.bank_name : '',
          account_number: info.account_info ? info.account_info.account_number : ''
        };
        if(info.id_doc_type == 1) {
          this.formValidate.id_card_copy = (info.id_card_info && info.id_card_info.id_card_copy) || []
          this.formValidate.id_card_national = (info.id_card_info && info.id_card_info.id_card_national) || ''
          this.formValidate.id_card_name = (info.id_card_info && info.id_card_info.id_card_name) || ''
          this.formValidate.id_card_number = (info.id_card_info && info.id_card_info.id_card_number) || ''
          this.formValidate.id_card_valid_time = (info.id_card_info && info.id_card_info.id_card_valid_time) || ''
        } else {
          this.formValidate.id_doc_name = (info.id_doc_info && info.id_doc_info.id_doc_name) || ''
          this.formValidate.id_doc_number = (info.id_doc_info && info.id_doc_info.id_doc_number) || ''
          this.formValidate.id_doc_copy = (info.id_doc_info && info.id_doc_info.id_doc_copy) || ''
          this.formValidate.doc_period_end = (info.id_doc_info && info.id_doc_info.doc_period_end) || ''
        }
      }).catch((res) => {

      });

    },
  },
};
</script>

<style lang="scss" scoped>
.pictures {
  width: 100%;
  max-width: 100%;
}
/deep/ table .el-image {
  display: inline-block !important;
}
/deep/ .el-dialog__title {
  font-weight: bold;
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
  color: #606266;
}
.box-container .list .blue {
  color: #1890ff;
}
.box-container .list.image {
  margin: 20px 0;
  position: relative;
  margin-bottom: 30px;
}
.box-container .list.image .img {
  position: absolute;
  top: -20px;

  img {
    margin-right: 10px;
  }
}
.labeltop {
  max-height: 280px;
  min-height: 120px;
  overflow-y: auto;
}
.title {
  margin-bottom: 16px;
  color: #17233d;
  font-size: 14px;
  font-weight: bold;
  padding-bottom: 2px;
  border-bottom: 1px solid #dfe6ec;
}
</style>
