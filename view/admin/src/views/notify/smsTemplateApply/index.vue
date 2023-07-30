<template>
  <div>
    <div class="i-layout-page-header">
      <!-- <PageHeader
        class="product_tabs"
        :title="$route.meta.title"
        hidden-breadcrumb
      ></PageHeader> -->
    </div>
    <el-card :bordered="false" dis-hover class="ivu-mt">
      <el-form
        ref="levelFrom"
        :model="levelFrom"
        :label-width="labelWidth"
        :label-position="labelPosition"
        @submit.native.prevent
      >
        <el-row
          type="flex"
          :gutter="24"
          v-if="$route.path === '/admin/sms/template'"
        >
            <el-button type="primary" class="ml20" @click="add">申请模板</el-button>
            <el-button class="ml20" @click="editSign">修改签名</el-button>
        </el-row>
        <el-row type="flex" :gutter="24" v-else>
          <el-col v-bind="grid">
            <el-form-item label="是否拥有：">
              <el-select
                v-model="levelFrom.is_have"
                placeholder="请选择"
                clearable
                @change="userSearchs"
              >
                <el-option value="1">有</el-option>
                <el-option value="0">没有</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :data="levelLists"
        ref="table"
        class="mt25"
        :loading="loading"
      >      
        <el-table-column prop="id" label="ID" min-width="200" />
        <el-table-column prop="templateid" label="模板ID" min-width="90" />
        <el-table-column prop="title" label="模板名称" min-width="90" />
        <el-table-column prop="content" label="模板内容" min-width="70" /> 
        <el-table-column prop="type" label="模板类型" min-width="90" />
        <el-table-column prop="status" label="模板状态" min-width="70" />  
        <el-table-column slot="is_have" min-width="70"> 
            <template v-if="$route.path === '/admin/setting/sms/sms_template_apply/commons'">
                <span v-show="row.status === 1">有</span>
                <span v-show="row.status === 0">没有</span>
            </template>
        </el-table-column>        
      </el-table>
      <div class="acea-row row-right page">
        <el-pagination
          :total="total"
          :current="levelFrom.page"
          show-elevator
          show-total
          @change="pageChange"
          :page-size="levelFrom.limit"
        />
      </div>
    </el-card>
    <!-- 新建表单-->
    <edit-from
      ref="edits"
      :FromData="FromData"
      @submitFail="submitFail"
    ></edit-from>
    <el-dialog
      v-if="modals"
      :visible.sync="modals"
      title="短信账户签名修改"
      class="order_box"
      :before-close="cancel('formInline')"
    >
      <el-form
        ref="formInline"
        :model="formInline"
        :rules="ruleInline"
        :label-width="63"
        @submit.native.prevent
      >
        <el-form-item>
          <el-input
            v-model="accountInfo.account"
            disabled
            prefix="ios-person-outline"
            size="large"
            style="width: 87%"/>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            v-model="formInline.phone"
            prefix="ios-call-outline"
            placeholder="请输入您的手机号"
            size="large"
            :disabled="formInline.phone"
            style="width: 87%"/>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="sign"
            :disabled="sign"
            prefix="ios-document-outline"
            placeholder="请输入短信签名，例如：CRMEB"
            size="large"
            style="width: 87%"/>
        </el-form-item>
        <el-form-item prop="sign">
          <el-input
            v-model="formInline.sign"
            prefix="ios-document-outline"
            placeholder="请输入新的短信签名，例如：CRMEB"
            size="large"
            style="width: 87%" />
        </el-form-item>
        <el-form-item prop="code">
          <div class="code acea-row row-middle" style="width: 87%">
            <el-input
              type="text"
              v-model="formInline.code"
              prefix="ios-keypad-outline"
              placeholder="验证码"
              size="large"
              style="width: 74%"
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
import { mapState } from "vuex";
import {
  tempListApi,
  tempCreateApi,
  isLoginApi,
  serveInfoApi,
  serveSign,
  captchaApi,
} from "@/api/setting";
import editFrom from "@/components/from/from";
export default {
  name: "smsTemplateApply",
  components: { editFrom },
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
      modals: false,
      cutNUm: "获取验证码",
      canClick: true,
      spinShow: true,
      grid: {
        xl: 7,
        lg: 7,
        md: 12,
        sm: 24,
        xs: 24,
      },
      sign: "",
      formInline: {
        sign: "",
        phone: "",
        code: "",
      },
      ruleInline: {
        sign: [{ required: true, message: "请输入短信签名", trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      loading: false,
      columns1: [],
      levelFrom: {
        type: "",
        status: "",
        title: "",
        page: 1,
        limit: 20,
      },
      levelFrom2: {
        is_have: "",
        page: 1,
        limit: 20,
      },
      total: 0,
      FromData: null,
      delfromData: {},
      levelLists: [],
      accountInfo: {}, //签名审核状态： 0、待审核；1、已通过；2、未通过
    };
  },
  watch: {
    $route(to, from) {
      this.getList();
    },
  },
  created() {
    this.onIsLogin();
  },
  mounted() {
    serveInfoApi().then((res) => {
      this.accountInfo = res.data;
      console.log(res.data);
      this.formInline.phone = res.data.phone;
      if (res.data.sms.open != 1) {
        this.$router.push(
          "/admin/setting/sms/sms_config/index?url=" + this.$route.path
        );
      }
    });
  },
  computed: {
    ...mapState("admin/layout", ["isMobile"]),
    labelWidth() {
      return this.isMobile ? undefined : 75;
    },
    labelPosition() {
      return this.isMobile ? "top" : "right";
    },
  },
  methods: {
    // 查看是否登录
    onIsLogin() {
      this.spinShow = true;
      isLoginApi()
        .then(async (res) => {
          let data = res.data;
          if (!data.status) {
            this.$message.warning("请先登录");
            this.$router.push(
              "/admin/setting/sms/sms_config/index?url=" + this.$route.path
            );
          } else {
            this.getList();
          }
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 等级列表
    getList() {
      this.loading = true;
      this.levelFrom.status = this.levelFrom.status || "";
      this.levelFrom.is_have = this.levelFrom.is_have || "";
      let data = {
        data:
          this.$route.path === "/admin/sms/template"
            ? this.levelFrom
            : this.levelFrom2,
        url:
          this.$route.path === "/admin/sms/template"
            ? "serve/sms/temps"
            : "notify/sms/public_temp",
      };
      let columns1 = [
        {
          title: "ID",
          key: "id",
          sortable: true,
          width: 80,
        },
        {
          title: "模板ID",
          key: "templateid",
          minWidth: 110,
        },
        {
          title: "模板名称",
          key: "title",
          minWidth: 150,
        },
        {
          title: "模板内容",
          key: "content",
          minWidth: 550,
        },
        {
          title: "模板类型",
          key: "type",
          minWidth: 100,
        },
        {
          title: "模板状态",
          slot: "status",
          minWidth: 100,
        },
      ];
      if (
        this.$route.path === "/admin/setting/sms/sms_template_apply/commons"
      ) {
        this.columns1 = Object.assign([], columns1)
          .slice(0, 6)
          .concat([
            {
              title: "是否拥有",
              slot: "is_have",
              minWidth: 110,
            },
          ]);
      } else {
        this.columns1 = columns1;
      }
      tempListApi(data)
        .then(async (res) => {
          let data = res.data;
          this.levelLists = data.data;
          this.total = data.count;
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res.message);
        });
    },
    pageChange(index) {
      this.levelFrom.page = index;
      this.getList();
    },
    // 添加
    add() {
      tempCreateApi()
        .then(async (res) => {
          this.FromData = res.data;
          this.$refs.edits.modals = true;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 表格搜索
    userSearchs() {
      this.levelFrom.page = 1;
      this.getList();
    },
    // 修改成功
    submitFail() {
      this.getList();
    },
    //修改签名
    editSign() {
      if (this.accountInfo.sms.sign_status === 0) {
        this.$message.warning("签名待审核，暂无法修改");
        return;
      }
      this.sign = this.accountInfo.sms.sign;
      this.modals = true;
    },
    cancel(name) {
      this.modals = false;
      this.$refs[name].resetFields();
      this.formInline.phone = this.accountInfo.phone;
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
    // 短信验证码
    cutDown() {
      if (this.formInline.phone) {
        if (!this.canClick) return;
        this.canClick = false;
        this.cutNUm = 60;
        let data = {
          phone: this.formInline.phone,
        };
        captchaApi(data)
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
  },
};
</script>

<style scoped lang="scss">
.tabBox_img {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
