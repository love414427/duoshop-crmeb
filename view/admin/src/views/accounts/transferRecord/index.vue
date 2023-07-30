<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" inline label-width="100px">
              <el-form-item label="时间选择：" class="width100" style="display: block;">
              <el-radio-group
                v-model="tableFrom.date"
                type="button"
                class="mr20"
                size="small"
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
                @change="onchangeTime"
              />
            </el-form-item>
            <el-form-item label="审核状态：">
              <el-radio-group v-model="tableFrom.status" type="button" @change="getList(1)">
                <el-radio-button label="">全部 </el-radio-button>
                <el-radio-button label="0">待审核</el-radio-button>
                <el-radio-button label="1">已审核</el-radio-button>
                <el-radio-button label="-1">审核失败</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="商户名称：">
              <el-select
                v-model="tableFrom.mer_id"
                clearable
                filterable
                placeholder="请选择"
                class="selWidth"
                @change="getList(1)"
              >
                <el-option
                  v-for="item in merSelect"
                  :key="item.mer_id"
                  :label="item.mer_name"
                  :value="item.mer_id"
                />
              </el-select>
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
            <el-form-item label="收款方式：">
              <el-radio-group v-model="tableFrom.financial_type" type="button" @change="getList(1)">
                <el-radio-button label="">全部 </el-radio-button>
                <el-radio-button label="1">银行卡</el-radio-button>
                <el-radio-button label="3">支付宝</el-radio-button>
                <el-radio-button label="2">微信</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="转账状态：">
                <el-select
                  v-model="tableFrom.financial_status"
                  placeholder="请选择"
                  class="filter-item selWidth mr20"
                  clearable
                  @change="getList"
                >
                  <el-option
                    v-for="item in arrivalStatusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
            </el-form-item>
            <el-form-item label="关键字：" class="width100" >
              <el-input
                v-model="tableFrom.keyword"
                @keyup.enter.native="getList(1)"
                placeholder="请输入管理员姓名"
                class="selWidth"
                size="small"
              >
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />

              </el-input>
              <el-button size="small" type="primary" icon="el-icon-top" @click="exports">列表导出</el-button>
              <!-- <el-button size="small" type="primary" @click="getExportFileList">导出记录</el-button> -->
            </el-form-item>
          </el-form>
        </div>
        <cards-data :card-lists="cardLists" />
      </div>
      <el-table
        v-loading="listLoading"
        tooltip-effect="dark"
        :data="tableData.data"
        size="small"
        style="width: 100%"
        class="table"
      >
        <el-table-column label="序号" min-width="60">
            <template scope="scope">
                <span>{{ scope.$index+(tableFrom.page - 1) * tableFrom.limit + 1 }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="mer_name" label="商户类别" min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.merchant" class="spBlock">{{ scope.row.merchant .is_trader ? '自营' : '非自营' }}</span>
          </template>
        </el-table-column>
         <el-table-column label="商户名称" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.merchant ? scope.row.merchant.mer_name : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="申请时间" min-width="150"/>
        <el-table-column prop="extract_money" label="转账金额（元）" min-width="120" />
        <el-table-column prop="admin_id" label="平台管理员姓名" min-width="120" />
        <el-table-column label="收款方式" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.financial_type">{{scope.row.financial_type == 1 ? '银行' : scope.row.financial_type == 2 ? '微信' : '支付宝' }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.status == 0 ? '待审核' : scope.row.status == 1 ? '审核通过' : '审核未通过' }}</span>
            <span v-if="scope.row.status === -1" style="font-size: 12px;">
              <br />
              原因：{{ scope.row.refusal }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="到账状态" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.financial_status == 1 ? '已转账' : '未转账' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mer_money" label="商户余额（元）" min-width="120"/>
        <el-table-column label="操作" min-width="180" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 0" type="text" size="small" @click="transferDetail(scope.row.financial_id)">审核</el-button>
            <el-button v-if="scope.row.status == 1 && scope.row.financial_status != 1" type="text" size="small" @click="transferDetail(scope.row.financial_id,1)">转账</el-button>
            <el-button v-if="scope.row.status == 1 && scope.row.financial_status == 1" type="text" size="small" @click="transferDetail(scope.row.financial_id,0)">转账信息</el-button>
            <el-button type="text" size="small" @click="transferMark(scope.row.financial_id)">备注</el-button>
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
    <!--转账信息-->
    <el-dialog :title="transferData.status == 0 ? '审核' :  '转账信息'" :visible.sync="dialogVisible" width="700px" v-if="dialogVisible">
        <div class="box-container">
            <div class="acea-row">
                <div class="list sp100"><label class="name">商户名称：</label>{{ transferData.merchant && transferData.merchant.mer_name }}</div>
                <div class="list sp100"><label class="name">商户ID：</label>{{  transferData.merchant && transferData.merchant.mer_id }}</div>
                <div class="list sp100"><label class="name">商户余额：</label>{{ transferData.mer_money }}</div>
                <div class="list sp100"><label class="name">商户收款方式：</label>{{ transferData.financial_type == 1 ? '银行卡' : transferData.financial_type == 2 ? '微信' : '支付宝' }}</div>
                <div class="list sp100" v-if="transferData.financial_type == 1"><label class="name">开户银行：</label>{{ transferData.financial_account.bank }}</div>
                <div class="list sp100" v-if="transferData.financial_type == 1"><label class="name">银行账号：</label>{{ transferData.financial_account.bank_code }}</div>
                <div class="list sp100" v-if="transferData.financial_type == 1"><label class="name">开户户名：</label>{{ transferData.financial_account.name }}</div>
                <div class="list sp100" v-if="transferData.financial_type != 1"><label class="name">真实姓名：</label>{{ transferData.financial_account.name }}</div>
                <div class="list sp100" v-if="transferData.financial_type == 2"><label class="name">微信号：</label>{{ transferData.financial_account.wechat }}</div>
                <div class="list sp100 image" v-if="transferData.financial_type == 2"><label class="name">微信收款二维码：</label><img style="max-width: 150px; height: 80px;" @click="getPicture(transferData.financial_account.wechat_code);return false;" :src="transferData.financial_account.wechat_code"/></div>
                <div class="list sp100" v-if="transferData.financial_type == 3"><label class="name">支付宝账号：</label>{{ transferData.financial_account.alipay }}</div>
                <div class="list sp100 image" v-if="transferData.financial_type == 3"><label class="name">支付宝收款二维码：</label><img style="max-width: 150px; height: 80px;" @click="getPicture(transferData.financial_account.alipay_code);return false;" :src="transferData.financial_account.alipay_code"/></div>
                <div class="list sp100"><label class="name">本次申请转账金额：</label><span class="font-red">{{ transferData.extract_money }}</span></div>
                <div class="list sp100" v-if="transferData.status != 0"><label class="name">审核状态：</label>{{ transferData.status == 0 ? '待审核' : transferData.status == 1 ? '已审核' : '审核失败' }}</div>
                <div class="list sp100" v-if="transferData.status == 1"><label class="name">审核时间：</label>{{ transferData.status_time }}</div>
                <div class="list sp100" v-if="transferData.status == -1"><label class="name">审核未通过原因：</label>{{ transferData.refusal }}</div>
                <el-form ref="ruleForm" class="demo-ruleForm" label-width="90px">
                    <el-form-item label="审核状态：" required v-if="transferData.status == 0">
                        <el-radio-group v-model="formValidate.status">
                            <el-radio :label="1" class="radio">通过</el-radio>
                            <el-radio :label="-1">拒绝</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="原因：" required v-if="formValidate.status == -1">
                        <el-input type="textarea" v-model="formValidate.refusal"></el-input>
                    </el-form-item>
                    <el-form-item label="转账凭证：" v-if="transferData.status == 1">
                        <div class="acea-row">
                            <div v-if="voucher_image.length > 0" v-for="(item,index) in voucher_image" :key="index" class="pictrue">
                                <img :src="item" @click="getPicture(item)"/>
                                <i class="el-icon-error btndel" @click="handleRemove(index)" />
                            </div>
                            <div class="upLoadPicBox" @click="modalPicTap('2')">
                                <div class="upLoad">
                                    <i class="el-icon-upload2" />
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-if="transferData.status == 0" type="primary" @click="transferReview(transferData.financial_id)">提交</el-button>
                        <el-button v-if="transferData.status == 1" type="primary" @click="onSubmit(transferData.financial_id)">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </el-dialog>
    <!--查看二维码-->
    <el-dialog :visible.sync="pictureVisible" width="700px" v-if="pictureVisible">
        <img :src="pictureUrl" class="pictures"/>
    </el-dialog>
    <!--导出订单列表-->
    <file-list ref="exportList" />
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
import { merSelectApi } from '@/api/product'
import { transferRecordApi, transferDetailApi, transferReviewApi, transferEditApi, transferMarkApi, transferHeaderDataApi, transferRecordsExportApi } from '@/api/accounts'
import cardsData from "@/components/cards/index";
import createWorkBook from '@/utils/newToExcel.js';
import fileList from '@/components/exportFile/fileList'
export default {
  components: { cardsData, fileList },
  name: 'transferRecord',
  data() {
    return {
      type: '',
      tableData: {
        data: [],
        total: 0
      },
      arrivalStatusList: [
        { label: "已到账", value: 1 },
        { label: "未到账", value: 0 }
      ],
      listLoading: true,
      cardLists: [],
      voucher_image: [],
      formValidate: {
        status: 1,
        refusal: ''
      },
      approvalStatus: 0,
      tableFrom: {
        date: '',
        page: 1,
        limit: 20,
        mer_id: '',
        financial_type: '',
        keyword: '',
        status: '',
        is_trader: ''
      },
      orderChartType: {},
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
      merSelect: [],
      tableFromLog: {
        page: 1,
        limit: 20
      },
      tableDataLog: {
        data: [],
        total: 0
      },
      loading: false,
      dialogVisible: false,
      pictureVisible: false,
      pictureUrl: '',
      transferData: {
        financial_account: {}
      },
    }
  },
  mounted() {
    this.getList(1);
    this.getMerSelect();
    this.getHeaderData();
  },

  methods: {
    // 商户列表；
    getMerSelect() {
      merSelectApi()
        .then((res) => {
          this.merSelect = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 头部数据
    getHeaderData(){
        transferHeaderDataApi().then((res) => {
          this.cardLists = res.data
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 转账信息
    transferDetail(id,num){
        if(num) this.voucher_image = []
        transferDetailApi(id).then(res => {
          this.listLoading = false;
          this.dialogVisible = true;
          this.transferData = res.data
          this.formValidate.status = res.data.status
          if(num){
            this.voucher_image = []
          }else{
             this.voucher_image = res.data.image
          }
        })
        .catch(res => {
          this.listLoading = false;
          this.$message.error(res.message)
        })
    },
    //获取支付二维码
    getPicture(url){
        this.pictureVisible = true;
        this.pictureUrl = url;
    },
    // 审核
    transferReview(id){
        let parmas = {
            status: this.formValidate.status,
            refusal: this.formValidate.refusal
        }
        transferReviewApi(id,parmas).then(res => {
         this.listLoading = false;
         this.$message.success(res.message);
         this.dialogVisible = false;
         this.getList(1);
        }).catch(res => {
          this.listLoading = false;
          this.$message.error(res.message)
        })

    },
    // 备注
    transferMark(id){
        this.$modalForm(transferMarkApi(id)).then(() => this.getList('1'))
    },
    // 转账提交
    onSubmit(id){
        if(this.voucher_image == 0){
            return this.$message.error('请上传转账凭证！')
        }else{
            transferEditApi(id,{image: this.voucher_image}).then(res => {
                this.$message.success(res.message)
                this.dialogVisible = false;
                this.getList(1);
            }).catch(res => {
                this.$message.error(res.message)
            })
        }

    },
     // 点击商品图
    modalPicTap(tit, num, i) {
        const _this = this;
        const attr = [];
        this.$modalUpload(function (img) {
            if (tit === "2" && !num) {
                img.map((item) => {
                    attr.push(item.attachment_src);
                     _this.voucher_image.push(item);
                    if(_this.voucher_image.length > 6){
                        _this.voucher_image.length = 6
                    }
                });
            }
        }, tit);
    },
    handleRemove(i) {
        this.voucher_image.splice(i, 1);
    },

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
    async exports() {
      let excelData = JSON.parse(JSON.stringify(this.tableFrom)), data = []
      excelData.page = 1
      let pageCount = 1
      let lebData = {};
      for (let i = 0; i < pageCount; i++) {
        lebData = await this.downData(excelData)
        pageCount = Math.ceil(lebData.count/excelData.limit)
        if (lebData.export.length) {
          data = data.concat(lebData.export)
          excelData.page++
        }  
      }
      createWorkBook(lebData.header, lebData.title, data, lebData.foot,lebData.filename);
      return
    },
    /**订单列表 */
    downData(excelData) {
      return new Promise((resolve, reject) => {
        transferRecordsExportApi(excelData).then((res) => {
          return resolve(res.data)
        })
      })
    },
    // 导出
    exportRecord() {
      transferRecordsExportApi(this.tableFrom)
        .then((res) => {
          /*this.$message.success(res.message)
          this.$refs.exportList.exportFileList()*/
          const h = this.$createElement;
          this.$msgbox({
            title: '提示',
            message: h('p', null, [
              h('span', null, '文件正在生成中，请稍后点击"'),
              h('span', { style: 'color: teal' }, '导出记录'),
              h('span', null, '"查看~ '),
            ]),
            confirmButtonText: '我知道了',
          }).then(action => {

          });
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    // 导出列表
    getExportFileList() {
      this.$refs.exportList.exportFileList()
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page;
      transferRecordApi(this.tableFrom)
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
      this.getList()
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList()
    },

    handleClose() {
      this.dialogLogistics = false
    },
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__title{
  font-weight: bold;
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
.pictrue {
    width: 60px;
    height: 60px;
    border: 1px dotted rgba(0, 0, 0, 0.1);
    margin-right: 10px;
    position: relative;
    cursor: pointer;
    img {
        width: 100%;
        height: 100%;
    }
}
.btndel {
    position: absolute;
    z-index: 1;
    width: 20px !important;
    height: 20px !important;
    left: 46px;
    top: -4px;
}
.box-container {
  overflow: hidden;
  padding: 0 10px;
}
.box-container .title{
  margin: 15px 0 10px;
  color: #333;
  font-weight: bold;
  border-bottom: 1px solid #dfe6ec;
}

.box-container .list {
  float: left;
  line-height: 40px;
}
.box-container .list .info{
  display: block;
  .el-textarea{
   margin-top: 10px;
  }
}
.box-container .list.image {
  margin: 20px 0;
  position: relative;
}
.box-container .list.image img {
  position: absolute;
  top: -20px;
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
  align-items: center;
  display: inline-block;
//   width: 130px;
  color: #606266;
  text-align: right;
}
.acea-row{
  margin-bottom: 25px;
}
.pictures{
    width: 100%;
    max-width: 100%;
}
</style>
