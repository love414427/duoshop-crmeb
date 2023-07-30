<template>
  <div class="divBox">
    <el-card :bordered="false" dis-hover>
        <el-form v-if="(isChecked == 2 && dump.open === 1)  || (isChecked == 4 && copy.open === 1)" size="small" inline label-width="100px">
            <el-form-item label="商户名称：">
              <el-select
                v-model="mer_id"
                clearable
                filterable
                placeholder="请选择"
                class="selWidth"
                @change="getQueryList()"
              >
                <el-option
                  v-for="item in merSelect"
                  :key="item.mer_id"
                  :label="item.mer_name"
                  :value="item.mer_id"
                />
              </el-select>
            </el-form-item>
        </el-form>
      <el-tabs v-model="isChecked" @tab-click="onChangeType">
        <el-tab-pane label="短信" name="1"></el-tab-pane>
        <el-tab-pane label="商品采集" name="4"></el-tab-pane>
        <el-tab-pane label="物流查询" name="3"></el-tab-pane>
        <el-tab-pane label="电子面单打印" name="2"></el-tab-pane>
      </el-tabs>
      <div v-if="isChecked === '1'">
          短信字数>70个字，占用3个字符作为分条字符，按照67个字记为一条短信计算
      </div>
      <!--短信列表-->
      <div class="note" v-if="isChecked === '1' && sms.open === 1">
        <div class="acea-row row-between-wrapper">
          <div>
            <el-button type="primary" size="small" @click="shortMes">短信模板</el-button>
            <el-button style="margin-left: 20px" size="small" @click="editSign">修改签名</el-button>
          </div>
        </div>
        <el-table :data="tableList" :loading="loading" class="mt25">
            <el-table-column label="序号" min-width="50">
                <template scope="scope">
                    <span>{{ scope.$index+(tableFrom.page - 1) * tableFrom.limit + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号" min-width="100" />
            <el-table-column prop="content" label="模板内容" min-width="200" />
            <el-table-column prop="create_time" label="发送时间" min-width="90" />     
        </el-table>
        <div class="block">
          <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="tableFrom.limit" :current-page="tableFrom.page" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="pageChange" />
        </div>
      </div>
      <!--商品采集，电子面单列表-->
      <div v-else-if="(isChecked === '4' && copy.open === 1) || (isChecked === '2' && dump.open === 1)">
        <el-table :data="tableList" :loading="loading" class="mt25">
            <el-table-column label="序号" min-width="50">
                <template scope="scope">
                    <span>{{ scope.$index+(tableFrom.page - 1) * tableFrom.limit + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="merchant.mer_name" key="7" label="商户名称" min-width="200" />
            <el-table-column v-if="isChecked == 4" prop="info" key="6" label="复制URL" min-width="200" />
            <el-table-column v-if="isChecked == 2" key="1" prop="info.order_sn" label="订单号" min-width="200" />
            <el-table-column v-if="isChecked == 2" key="2" prop="info.from_name" label="发货人" min-width="90" />
            <el-table-column v-if="isChecked == 2" prop="info.to_name" label="收货人" min-width="90" />
            <el-table-column v-if="isChecked == 2" key="3" prop="info.delivery_id" label="快递单号" min-width="90" />
            <el-table-column v-if="isChecked == 2" key="4" prop="info.delivery_name" label="快递公司编码" min-width="90" />            
            <el-table-column prop="create_time" key="8" :label="isChecked == 2 ? '打印时间' : '添加时间'" min-width="90" />  
        </el-table>
         <div class="block">
          <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="tableFrom.limit" :current-page="tableFrom.page" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChangeOther" @current-change="pageChangeOther" />
        </div>
      </div>
      <!--物流-->
      <div v-else-if="(isChecked == '3' && query.open == 1)">
        <el-table :data="tableList" :loading="loading" class="mt25">
            <el-table-column label="序号" min-width="50">
                <template scope="scope">
                    <span>{{ scope.$index+(tableFrom.page - 1) * tableFrom.limit + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column v-if="isChecked == 3" label="快递单号" min-width="90">
                <template slot-scope="scope">
                    <div>{{ (scope.row.content && scope.row.content.num) || '' }}</div>
                </template>
            </el-table-column>
            <el-table-column  prop="content.num" label="快递公司编码" min-width="90" />
            <el-table-column prop="add_time" label="添加时间" min-width="90" />  
        </el-table>
         <div class="block">
          <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="tableFrom.limit" :current-page="tableFrom.page" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChangeQuery" @current-change="pageChangeQuery" />
        </div>
      </div>
      <!--无开通-->
      <div v-else>
        <!--开通按钮-->
        <div v-if="(isChecked === '1' && !isSms) || ((isChecked === '2' || isChecked === '3') && !isDumpOpen) || (isChecked === '4' && !isCopy)" class="wuBox">
          <div class="wuTu"><img src="../../../assets/images/wutu.png" /></div>
          <span v-if="isChecked === '1'">
            <span class="wuSp1">短信服务未开通哦</span>
            <span class="wuSp2">点击立即开通按钮，即可使用短信服务哦～～～</span>
          </span>
          <span v-if="isChecked === '4'">
            <span class="wuSp1">商品采集服务未开通哦</span>
            <span class="wuSp2">点击立即开通按钮，即可使用商品采集服务哦～～～</span>
          </span>
          <span v-if="isChecked === '3'">
            <span class="wuSp1">物流查询未开通哦</span>
            <span class="wuSp2">点击立即开通按钮，即可使用物流查询服务哦～～～</span>
          </span>
          <span v-if="isChecked === '2'">
            <span class="wuSp1">电子面单打印未开通哦</span>
            <span class="wuSp2">点击立即开通按钮，即可使用电子面单打印服务哦～～～</span>
          </span>
          <el-button size="default" type="primary" @click="onOpen">立即开通</el-button>
        </div>

        <div class="smsBox" v-if="isSms && isChecked === '1'">
          <div class="index_from page-account-container">
            <div class="page-account-top">
              <span class="page-account-top-tit">开通短信服务</span>
            </div>
            <el-form ref="formInline" :model="formInline" :rules="ruleInline" @submit.native.prevent @keyup.enter="handleSubmit('formInline')">
              <el-form-item class="maxInpt" prop="sign">
                <el-input type="text" v-model="formInline.sign" prefix="ios-contact-outline" placeholder="请输入短信签名"/>
              </el-form-item>
              <el-form-item class="maxInpt">
                <el-button type="primary" @click="handleSubmit('formInline')" class="btn">立即开通</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog
       v-if="modals"
      :visible.sync="modals"
      title="短信账户签名修改"
      class="order_box"
      :before-close="cancel"
    >
      <el-form
        ref="formInline"
        :model="formInline"
        :rules="ruleInline"
        label-width="100px"
        @submit.native.prevent
      >
        <el-form-item>
          <el-input
            v-model="accountInfo.account"
            disabled
            prefix="ios-person-outline"
            size="large"
            style="width: 87%"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="formInline.sign"
            prefix="ios-document-outline"
            placeholder="请输入短信签名，例如：CRMEB"
            size="large"
            style="width: 87%"
          />
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            disabled
            v-model="formInline.phone"
            prefix="ios-call-outline"
            placeholder="请输入您的手机号"
            size="large"
            style="width: 87%"
          />
        </el-form-item>
        <el-form-item prop="verify_code">
          <div class="code acea-row row-middle" style="width: 87%">
            <el-input
              type="text"
              v-model="formInline.verify_code"
              prefix="ios-keypad-outline"
              placeholder="验证码"
              size="large"
              style="width: 75%"
            />
            <el-button :disabled="!this.canClick" @click="cutDown" size="large">{{cutNUm}}</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            long
            size="large"
            @click="editSubmit('formInline')"
            class="btn"
            style="width: 87%"
            >确认修改</el-button>
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
  smsRecordApi,
  serveRecordListApi,
  serveQueryListApi,
  exportTempApi,
  exportAllApi,
  serveSign,
  captchaApi,
  serveOpen
} from "@/api/setting";
import { merSelectApi } from "@/api/product";
export default {
  name: "tableList",
  props: {
    copy: {
      type: Object,
      default: null,
    },
    dump: {
      type: Object,
      default: null,
    },
    query: {
      type: Object,
      default: null,
    },
    sms: {
      type: Object,
      default: null,
    },
    accountInfo: {
      type: Object,
      default: null,
    },
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写手机号"));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("手机号格式不正确!"));
      } else {
        callback();
      }
    };
    return {
      cutNUm: "获取验证码",
      canClick: true,
      spinShow: true,
      formInline: {
        sign: "",
        phone: "",
        verify_code: "",
      },
      ruleInline: {
        sign: [{ required: true, message: "请输入短信签名", trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        verify_code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      isChecked: "1",
      mer_id: "",
      tableFrom: {
        page: 1,
        limit: 20,
        type: '',
        
      },
      total: 0,
      loading: false,
      tableList: [],
      formInlineDump: {
        temp_id: "",
        com: "",
        to_name: "",
        to_tel: "",
        siid: "",
        to_address: "",
      },
      merSelect: [],
      ruleInlineDump: {
        com: [{ required: true, message: "请选择快递公司", trigger: "change" }],
        temp_id: [
          { required: true, message: "请选择打印模板", trigger: "change" },
        ],
        to_name: [
          { required: true, message: "请输寄件人姓名", trigger: "blur" },
        ],
        to_tel: [{ required: true, validator: validatePhone, trigger: "blur" }],
        siid: [
          { required: true, message: "请输入云打印机编号", trigger: "blur" },
        ],
        to_address: [
          { required: true, message: "请输寄件人地址", trigger: "blur" },
        ],
      },
      tempImg: "", // 图片
      exportTempList: [], // 电子面单模板
      exportList: [], // 快递公司列表
      isSms: this.sms.open, // 是否开通短信
      isDump: this.dump.open, // 是否开通电子面单,是否开通物流查询
      isCopy: this.copy.open, // 是否开通商品采集
      modals: false,
      isDumpOpen: this.dump.open,
    };
  },
  watch: {
    sms(n) {
      if (n.open === 1){
        this.tableFrom.page = 1;
        this.getList();
      } 
    },
  },
  created() {
    if (this.isChecked === "1" && this.sms.open === 1){  
        this.getList();
    } 
  },
  mounted() {
      this.getMerSelect();
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
    //短信模板页
    shortMes() {
      this.$router.push({
        path: "/admin/sms/template",
      });
    },
    // 短信验证码
    cutDown() {
      if (this.formInline.phone) {
        if (!this.canClick) return;
        this.canClick = false;
        this.cutNUm = 60;
        captchaApi(this.formInline.phone)
          .then(async (res) => {
            this.$message.success(res.message);
          })
          .catch((res) => {
            this.$message.error(res.message);
          });
        let time = setInterval(() => {
          this.cutNUm--;
          if (this.cutNUm === 0) {
            this.cutNUm = "获取验证码";
            this.canClick = true;
            clearInterval(time);
          }
        }, 1000);
      } else {
        this.$message.warning("请填写手机号!");
      }
    },
    editSign() {
      if (this.accountInfo.sms.sign_status === 0) {
        return this.$message.warning("签名待审核中，暂无法修改");
      }
      this.formInline.sign = this.accountInfo.sms.sign;
      this.formInline.phone = this.accountInfo.phone;
      this.modals = true;
    },
    cancel() {
      this.modals = false;
      this.$refs['formInline'].resetFields();
    },
    // 提交
    editSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          serveSign(this.formInline)
            .then((res) => {
              this.modals = false;
              this.$message.success(res.message);
              this.$refs[name].resetFields();
            })
            .catch((res) => {
              this.$message.error(res.message);
            });
        }
      });
    },
    onChangeImg(item) {
      this.exportTempList.map((i) => {
        if (i.temp_id === item) this.tempImg = i.pic;
      });
    },
    // 物流公司
    exportTempAllList() {
      exportAllApi()
        .then(async (res) => {
          this.exportList = res.data.list;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 快递公司选择
    onChangeExport(val) {
      this.formInlineDump.temp_id = "";
      this.exportTemp(val);
    },
    // 电子面单模板
    exportTemp(val) {
      exportTempApi({ com: val })
        .then(async (res) => {
          this.exportTempList = res.data.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    onChangeType() {
      this.tableFrom.page = 1;
      if (this.isChecked === "1" && this.sms.open === 1) { //短信
        this.tableFrom.type = "";
        this.getList();
      } else if(this.isChecked === "2" || this.isChecked === "4") {
        if (this.isChecked === "2" && this.isDump.open === 0)
            this.isDump = false;
        if (this.dump.open === 1 || this.copy.open === 1){
            this.tableFrom.type = this.isChecked == 4 ? 'copy' : 'mer_dump'
            this.tableFrom.mer_id = this.mer_id
            this.getQueryList();
        }
      }
      if (this.query.open === 1 && this.isChecked === "3") {
         this.getRecordList();
      }
      if(this.query.open === 0 && this.isChecked === "3"){
          this.isDumpOpen = false
      }
      if(this.copy.open === 0 && this.isChecked === "4"){
          this.isCopy = false
      }
      if(this.sms.open == 0 &&  this.isChecked === "1"){
          this.isSms = false
      }
    },
    // 物流
    getRecordList() {
      this.loading = true;
      this.tableFrom.type = this.isChecked
      delete this.tableFrom.mer_id
      serveRecordListApi(this.tableFrom)
        .then(async (res) => {
          let data = res.data;
          this.tableList = data.data;
          this.total = res.data.count;
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res.message);
        });
    },
    pageChangeOther(index) {
      this.tableFrom.page = index;
      this.getRecordList();
    },
     handleSizeChangeOther(val) {
      this.tableFrom.limit = val
      this.getRecordList()
    },
    pageChangeQuery(index) {
      this.tableFrom.page = index;
      this.getRecordList();
    },
     handleSizeChangeQuery(val) {
      this.tableFrom.limit = val
      this.getRecordList()
    },
    //获取物流列表数据
    getQueryList(){
        this.loading = true;
        this.tableFrom.mer_id = this.mer_id
        serveQueryListApi(this.tableFrom)
        .then(async (res) => {
          let data = res.data;
          this.tableList = data.list;
          this.total = data.count;
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res.message);
        });
    },
    // 开通短信提交
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          serveOpen({type: 'sms',sign: this.formInline.sign})
            .then(async (res) => {
              this.$message.success("开通成功!");
              this.tableFrom.page = 1;
              this.getList();
              this.$emit("openService", "sms");
            })
            .catch((res) => {
              this.$message.error(res.message);
            });
        } else {
          return false;
        }
      });
    },
    // 首页去开通
    onOpenIndex(val) {
      switch (val) {
        case "sms":
          this.isChecked = "1";
          this.isSms = true;
          break;
        case "copy":
          this.isChecked = "4";
          this.openOther();
          break;
        case "query":
          this.isChecked = "3";
          this.onDumpOpen();
          break;
        default:
          this.isChecked = "2";
          this.openDump();
          break;
      }
    },
    // 开通按钮
    onOpen() {
      if (this.isChecked === "1") this.isSms = true;
      if (this.isChecked === "2") this.openDump();
      if (this.isChecked === "4") this.openOther();
      if (this.isChecked === "3") this.onDumpOpen();
    },
    // 开通物流
    onDumpOpen() {
      const h = this.$createElement;
      this.$msgbox({
        title: "提示",
        message: h('p','确定要开通物流查询吗'),
         showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              serveOpen({type: 'query'}).then((res) => {
                this.$message.success(res.message);
                this.$emit("openService", "query");
                done();
             }).catch((res) => {
                    this.$message.error(res.message);
                });
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
        });
      });
    },
    // 开通其他
    openOther() {
      const h = this.$createElement;
      this.$msgbox({
        title: "提示",
        message: h('p','确定要开通商品采集吗'),
        showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              setTimeout(() => {
                serveOpen({ type: 'copy' })
                .then(async (res) => {
                    this.getRecordList();
                    this.$message.success(res.message);
                    this.$emit("openService", "copy");
                    done();
                })
                .catch((res) => {
                    this.$message.error(res.message);
                });
            }, 300);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
        });
      });
    },
    // 开通电子面单
    openDump() {
        const h = this.$createElement;
        this.$msgbox({
            title: "提示",
            message: h('p','确定要开通电子面单功能吗'),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                    serveOpen({type: 'dump'}).then((res) => {
                        this.$message.success(res.message);
                        this.$emit("openService", "dump");
                    }).catch((res) => {
                    this.$message.error(res.message);
                })
                } else {
                    done();
                }
            }
            }).then(action => {
            this.$message({
                type: 'info',
                message: 'action: ' + action
            });
        });
    },
    // 列表
    getList() {
      this.loading = true;
      delete this.tableFrom.mer_id
      delete this.tableFrom.type
      smsRecordApi(this.tableFrom)
        .then(async (res) => {
          let data = res.data;
          this.tableList = data.list;
          this.total = res.data.count;
          this.spinShow = false;
          this.loading = false;
        })
        .catch((res) => {
          this.spinShow = false;
          this.loading = false;
          this.$message.error(res.message);
        });
    },
    pageChange(index) {
      this.tableFrom.page = index;
      this.getList();
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList()
    },
    // 表格搜索
    userSearchs() {
      this.tableFrom.page = 1;
      this.getList();
    },
    handleSubmitDump(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
            this.formInlineDump.type = 'dump'
          serveOpen(this.formInlineDump)
            .then(async (res) => {
              this.$message.success("开通成功!");
              this.getRecordList();
              this.$emit("openService", "dump");
            })
            .catch((res) => {
              this.$message.error(res.message);
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.mt25{
    margin-top: 25px;
}
.order_box /deep/.ivu-form-item-content {
  margin-left: 50px !important;
}
.maxInpt {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  .el-button{
      width: 100%;
  }
}
.smsBox .page-account-top {
  text-align: center;
  margin: 70px 0 30px 0;
}
.note {
  margin-top: 15px;
}
.tempImg {
  cursor: pointer;
  margin-left: 11px;
  color: #1890ff;
}
.tabBox_img {
  opacity: 0;
  width: 38px;
  height: 30px;
  margin-top: -30px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
.width9 {
  width: 90%;
}
.width10 {
  width: 100%;
}
.wuBox {
  width: 100%;
  text-align: center;
}
.wuSp1 {
  display: block;
  text-align: center;
  color: #000000;
  font-size: 21px;
  font-weight: 500;
  line-height: 32px;
  margin-top: 23px;
  margin-bottom: 5px;
}
.wuSp2 {
  opacity: 45%;
  font-weight: 400;
  color: #000000;
  line-height: 22px;
  margin-bottom: 30px;
}
.page-account-top-tit {
  font-size: 21px;
  color: #1890ff;
}
.wuTu {
  display: block;
  width: 295px;
  height: 164px;
  margin: 54px auto 0;
  
  img {
    width: 100%;
    height: 100%;
  }

  + span {
    margin-bottom: 20px;
    display: block;
    text-align: center;
  }
}
</style>
