<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-form
        ref="formValidate"
        :model="formValidate"
        :rules="rules"
        label-width="170px"
        v-loading="fullscreenLoading"
      >
        <el-form-item label="采集商品接口方式：">
          <el-radio-group v-model="formValidate.copy_product_status">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="2">一号通</el-radio>
            <el-radio :label="1" class="radio">99API自有账号</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="formValidate.copy_product_status == 1"
          label="采集商品接口Key："
          prop="copy_product_apikey"
        >
          <el-input
            v-model="formValidate.copy_product_apikey"
            placeholder="请输入采集商品接口Key"
          ></el-input>
        </el-form-item>
        <el-form-item label="物流查询接口方式：">
          <el-radio-group v-model="formValidate.crmeb_serve_express">
            <el-radio :label="2">一号通</el-radio>
            <el-radio :label="1" class="radio">阿里云物流查询</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="formValidate.crmeb_serve_express == 1"
          label="物流查询接口Key："
          prop="express_app_code"
        >
          <el-input
            v-model="formValidate.express_app_code"
            placeholder="物流查询接口Key"
          ></el-input>
        </el-form-item>
        <el-form-item label="电子面单：">
          <el-radio-group v-model="formValidate.crmeb_serve_dump">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0" class="radio">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="interface_desc">
          <div>接口方式说明：</div>
          <h3>采集商品接口：</h3>
          <p>
            1.一号通方式：是指通过注册CRMEB一号通方式，可对接更多服务接口，方便运营；详情请前往：<span
              class="color_blue"
              >平台后台>一号通>一号通服务</span
            >了解；
          </p>
          <p>
            2.99API自有账号：是指用户在99API平台已注册并购买商品采集的服务，可选择继续使用。
          </p>
          <h3>物流查询接口：</h3>
          <p>
            1.一号通方式：是指通过注册CRMEB一号通方式，可对接更多服务接口，方便运营；详情请前往：<span
              class="color_blue"
              >平台后台>一号通>一号通服务</span
            >了解；
          </p>
          <p>
            2.阿里云物流查询方式：是指用户在阿里云平台自行注册并购买物流查询服务的情况，可选择继续使用。
          </p>
          <p>
            3.阿里云快递查询接口密钥购买地址：https://market.aliyun.com/products/56928004/cmapi021863.html。
          </p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="submitForm"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
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
import { getSmsConfig, updateSmsConfig } from "@/api/setting";
export default {
  name: "smsConfig",
  data() {
    return {
      fullscreenLoading: false,
      loading: false,
      listLoading: true,
      formValidate: {},
      rules: {
        copy_product_apikey: [
          { required: true, message: "请输入采集商品接口Key", trigger: "blur" },
        ],
        express_app_code: [
          {
            required: true,
            message: "请输入物流查询     接口Key",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    submitForm() {
      updateSmsConfig(this.formValidate)
        .then((res) => {
          this.fullscreenLoading = false;
          this.$message.success(res.message);
        })
        .catch((res) => {
          this.$message.error(res.message);
          this.fullscreenLoading = false;
        });
    },
    // 详情
    getData() {
      this.fullscreenLoading = true;
      getSmsConfig()
        .then((res) => {
          this.fullscreenLoading = false;
          let info = res.data;
          this.formValidate = {
            copy_product_status: info.copy_product_status,
            copy_product_apikey: info.copy_product_apikey,
            crmeb_serve_dump: Number(info.crmeb_serve_dump),
            crmeb_serve_express: Number(info.crmeb_serve_express),
            express_app_code: info.express_app_code,
          };
        })
        .catch((res) => {
          this.$message.error(res.message);
          this.fullscreenLoading = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.color_blue {
  color: #1890ff;
}
.interface_desc {
  p,
  h3 {
    margin: 0;
  }
  div {
    color: #333;
  }
}
</style>
