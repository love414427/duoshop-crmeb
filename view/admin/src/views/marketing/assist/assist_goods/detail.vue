<template>
  <el-dialog title="助力商品详情" center :visible.sync="dialogVisible" width="700px" v-if="dialogVisible">
    <div v-loading="loading">
      <div class="box-container">
        <div class="title">基本信息：</div>
        <div class="acea-row">
          <div class="list sp"><label class="name">商户名称：</label>{{ formValidate.merchant ? formValidate.merchant.mer_name : '' }}</div>
          <div class="list sp"><label class="name">商户类别：</label>{{ (formValidate.merchant && formValidate.merchant.is_trader === 1) ? '自营' : '非自营' }}</div>
          <div class="list sp"><label class="name">商品ID：</label>{{ formValidate.product_id }}</div>
          <div class="list sp"><label class="name">商品名称：</label>{{ formValidate.store_name }}</div>
          <div class="list sp100 image">
            <label class="name">商品图：</label>
            <img
              style="max-width: 150px; height: 80px;"
              :src="formValidate.image"
            />
          </div>
        </div>
        <div class="title" style="margin-top: 20px;">助力商品活动信息：</div>
        <div class="acea-row">
          <div class="list sp100"><label class="name">助力活动简介：</label>{{ formValidate.store_info }}</div>
          <div class="list sp"><label class="name">助力价：</label>{{ formValidate.assistSku ? '¥'+formValidate.assistSku[0].assist_price : '' }}</div>
          <div class="list sp"><label class="name">限量：</label>{{ formValidate.assistSku ? formValidate.assistSku[0].stock_count : '' }}</div>
          <div class="list sp"><label class="name">助力人数：</label>{{ formValidate.assist_count }}</div>
          <div class="list sp"><label class="name">限量剩余：</label>{{ formValidate.assistSku ? formValidate.assistSku[0].stock : '' }}</div>
          <div class="list sp"><label class="name">限购件数：</label>{{ formValidate.pay_count }}{{formValidate.unit_name}}</div>
          <div class="list sp"><label class="name">助力次数：</label>{{ formValidate.assist_user_count }}</div>
          <div class="list sp100"><label class="name">助力活动日期：</label>{{ formValidate.start_time + '&nbsp;&nbsp;-&nbsp;&nbsp;' + formValidate.end_time }}</div>
          <div class="list sp"><label class="name">已售商品数：</label>{{ formValidate.pay ? formValidate.pay : 0 }}</div>
          <div class="list sp"><label class="name">助力成功/参与人次：</label>{{ formValidate.success + '/' + formValidate.all }}</div>
          <div class="list sp"><label class="name">审核状态：</label>{{ formValidate.status  === 1 ? '审核通过' : formValidate.status === 0 ? '未审核' : '审核未通过' }}</div>
          <div class="list sp"><label class="name">助力活动状态：</label>{{ formValidate.assist_status === 0 ? '未开始' : formValidate.assist_status === 1 ? '正在进行' : '已结束' }}</div>
          <div class="list sp"><label class="name">显示状态：</label>{{ formValidate.is_show === 1 ? "显示" : "隐藏" }}</div>
          <div class="list sp"><label class="name">创建时间：</label>{{ formValidate.create_time }}</div>
        </div>
      </div>
    </div>
  </el-dialog>
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
import { assistProDetailApi, productStatusApi } from '@/api/product'
const defaultObj = {
  image: '',
  slider_image: [],
  store_name: '',
  store_info: '',
  keyword: '',
  brand_id: '', // 品牌id
  cate_id: '', // 平台分类id
  mer_cate_id: [], // 商户分类id
  unit_name: '',
  sort: 0,
  is_show: 0,
  is_benefit: 0,
  is_new: 0,
  is_good: 0,
  temp_id: '',
  attrValue: [{
    image: '',
    price: null,
    cost: null,
    ot_price: null,
    stock: null,
    bar_code: '',
    weight: null,
    volume: null
  }],
  attr: [],
  selectRule: '',
  extension_type: 0,
  content: '',
  spec_type: 0
}
const objTitle = {
  price: {
    title: '售价'
  },
  cost: {
    title: '成本价'
  },
  ot_price: {
    title: '市场价'
  },
  stock: {
    title: '库存'
  },
  bar_code: {
    title: '商品编号'
  },
  weight: {
    title: '重量（KG）'
  },
  volume: {
    title: '体积(m³)'
  }
}

export default {
  name: 'Info',
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    ids: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      rules: {
        status: [
          { required: true, message: '请选择审核状态', trigger: 'change' }
        ],
        refusal: [
          { required: true, message: '请填写拒绝原因', trigger: 'blur' }
        ]
      },
      proId: 0,
      ruleForm: {
        refusal: '',
        status: 1,
        id: ''
      },
      formThead: Object.assign({}, objTitle),
      manyTabDate: {},
      manyTabTit: {},
      loading: false,
      dialogVisible: false,
      activeNames: 'first',
      formValidate: {},
      attrInfo: {},
      OneattrValue: [Object.assign({}, defaultObj.attrValue[0])], // 单规格
      ManyAttrValue: [Object.assign({}, defaultObj.attrValue[0])] // 多规格
    }
  },
  computed: {
    attrValue() {
      const obj = Object.assign({}, defaultObj.attrValue[0])
      delete obj.image
      return obj
    },
    oneFormBatch() {
      const obj = [Object.assign({}, defaultObj.attrValue[0])]
      delete obj[0].bar_code
      return obj
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
      this.activeNames = 'first'
    },
    watCh(val) {

    },
    getInfo(id) {
      this.proId = id
      this.loading = true
      assistProDetailApi(id).then(res => {
        let info = res.data;
        this.formValidate = {
          product_id: info.product_id,
          image: info.product.image,
          store_name: info.store_name,
          store_info: info.store_info,
          start_time: info.start_time
            ? info.start_time + ":00"
            : "",
          end_time: info.end_time
            ? info.end_time + ":00"
            : "",
          unit_name: info.product.unit_name,
          is_show: info.is_show,
          attr: info.product.attr,
          spec_type: info.product.spec_type,
          create_time: info.create_time,
          product: info.product,
          merchant: info.merchant,
          assist_user_count: info.assist_user_count,
          pay: info.pay,
          all: info.all,
          assist_status: info.assist_status,
          status: info.product_status,
          assistSku: info.assistSku,
          pay_count: info.pay_count,
          assist_count: info.assist_count,
          success: info.success
        };

        console.log(this.ManyAttrValue);
        if (this.formValidate.is_good === 1){
          this.checkboxGroup.push("is_good");
        }
        this.fullscreenLoading = false;
        this.formValidate.preSale_date = [
          info.start_time,
          info.end_time,
        ];
        this.loading = false
      }).catch(res => {
        this.$message.error(res.message)
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-dialog__title{
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
}
.box-container .list.image img {
  position: absolute;
  top: -20px;
}
.labeltop{
  height: 280px;
  overflow-y: auto;
}
.title{
  margin-bottom: 16px;
  color: #17233d;
  font-size: 14px;
  font-weight: bold;
  padding-bottom: 2px;
  border-bottom: 1px solid #dfe6ec;
}
</style>
