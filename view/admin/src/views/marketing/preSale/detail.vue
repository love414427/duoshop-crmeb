<template>
  <el-dialog title="预售商品详情" center :visible.sync="dialogVisible" width="700px" v-if="dialogVisible">
    <div v-loading="loading">
      <div class="box-container">
        <div class="title">基本信息：</div>
        <div class="acea-row">
          <div class="list sp"><label class="name">商户名称：</label>{{ formValidate.merchant && formValidate.merchant.mer_name }}</div>
          <div class="list sp"><label class="name">商户类别：</label>{{ (formValidate.merchant && formValidate.merchant.is_trader) === 1 ? '自营' : '非自营' }}</div>
          <div class="list sp"><label class="name">商品ID：</label>{{ formValidate.product_id }}</div>
          <div class="list sp"><label class="name">商品名称：</label>{{ formValidate.store_name }}</div>
          <div class="list sp100 image">
            <label class="name">商品图：</label>
            <img
              style="max-width: 150px; height: 80px;"
              :src="formValidate.image"
            />
          </div>

          <div class="list sp100">
            <label class="name">商品信息：</label>
            <!-- 单规格表格-->
            <div v-if="formValidate.spec_type === 0">
              <el-table :data="OneattrValue" border class="tabNumWidth" size="mini">
                <el-table-column align="center" label="预售价格" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row['price'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="formValidate.presell_type === 2" align="center" label="预售定金" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row['down_price'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="已售商品数量" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row['sales'] }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 多规格表格-->
            <div
              v-if="formValidate.spec_type === 1"
              class="labeltop"
              label="规格列表："
            >
              <el-table
                :data="ManyAttrValue"
                height="260"
                tooltip-effect="dark"
                :row-key="(row) => { return row.id }"
              >
                <template v-if="manyTabDate">
                  <el-table-column v-for="(item,iii) in manyTabDate" :key="iii" align="center" :label="manyTabTit[iii].title" min-width="80">
                    <template slot-scope="scope">
                      <span class="priceBox" v-text="scope.row[iii]" />
                    </template>
                  </el-table-column>
                </template>
                <el-table-column align="center" label="预售价格" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row['presell_price'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="formValidate.presell_type === 2" align="center" label="预售定金" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row['down_price'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column  align="center" label="已售商品数量" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row['sales'] }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="title" style="margin-top: 20px;">预售商品活动信息：</div>
        <div class="acea-row">
          <div class="list sp100"><label class="name">预售简介：</label>{{ formValidate.store_info }}</div>
          <div class="list sp100"><label class="name">预售活动日期：</label>{{ formValidate.start_time + '-' + formValidate.end_time }}</div>
          <div v-if="formValidate.presell_type === 2" class="list sp100"><label class="name">尾款支付日期：</label>{{ formValidate.final_start_time + '-' + formValidate.final_end_time }}</div>
          <div class="list sp"><label class="name">限量：</label>{{ formValidate.stock_count }}</div>
          <div class="list sp"><label class="name">限量剩余：</label>{{ formValidate.stock }}</div>
          <div class="list sp"><label class="name">限购件数：</label>{{ formValidate.pay_count }}（0为不限制购买数量）</div>
          <div class="list sp"><label class="name">审核状态：</label>{{ formValidate.status === 1 ? '审核通过' : formValidate.status === 0 ? '未审核' : '审核未通过' }}</div>
          <div v-if="formValidate.presell_type === 1"  class="list sp"><label class="name">预售成功/参与人次：</label>{{ (formValidate.tattend_one && formValidate.tattend_one.pay) + '/' + (formValidate.tattend_one && formValidate.tattend_one.all) }}</div>
          <div v-if="formValidate.presell_type === 2"  class="list sp"><label class="name">第一阶段(定金支付)成功/参与人次：</label>{{ (formValidate.tattend_one && formValidate.tattend_one.pay) + '/' + (formValidate.tattend_one && formValidate.tattend_one.all) }}</div>
          <div v-if="formValidate.presell_type === 2"  class="list sp"><label class="name">第二阶段(尾款支付)成功/参与人次：</label>{{ (formValidate.tattend_two && formValidate.tattend_two.pay) + '/' + (formValidate.tattend_two && formValidate.tattend_two.all) }}</div>
          <div v-if="formValidate.presell_type === 2" class="list sp"><label class="name">发货时间：</label>{{ "支付尾款后"+formValidate.delivery_day+"天内" }}</div>
          <div v-if="formValidate.presell_type === 1" class="list sp"><label class="name">发货时间：</label>{{ formValidate.delivery_type === 1 ? "支付成功后"+formValidate.delivery_day+"天内" : "预售结束后"+formValidate.delivery_day+"天内" }}</div>
          <div class="list sp"><label class="name">预售活动状态：</label>{{ formValidate.presell_status === 0 ? '未开始' : formValidate.presell_status === 1 ? '正在进行' : '已结束' }}</div>
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
import { presellProDetailApi, productStatusApi } from '@/api/product'
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
  spec_type: 0,
  tattend_one: {},
  tattend_two: {}
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
      const tmp = {};
      const tmpTab = {};
      this.formValidate.attr.forEach((o, i) => {
        tmp["value" + i] = { title: o.value };
        tmpTab["value" + i] = "";
      });
      this.ManyAttrValue.forEach((val, index) => {
        const key = Object.values(val.detail).sort().join("/");
        if (this.attrInfo[key]) this.ManyAttrValue[index] = this.attrInfo[key];
      });
      this.attrInfo = {};
      this.ManyAttrValue.forEach((val) => {
        this.attrInfo[Object.values(val.detail).sort().join("/")] = val;
      });
      this.manyTabTit = tmp;
      this.manyTabDate = tmpTab;
      this.formThead = Object.assign({}, this.formThead, tmp);
      // console.log(this.formThead)
    },
    getInfo(id) {
      this.proId = id
      this.loading = true
      this.formValidate = {}
      presellProDetailApi(id).then(res => {
        let info = res.data;
        this.formValidate = {
          product_id: info.product_id,
          image: info.product.image,
          store_name: info.store_name,
          store_info: info.store_info,
          presell_type: info.presell_type ? info.presell_type : 1,
          delivery_type: info.delivery_type ? info.delivery_type : 1,
          delivery_day: info.delivery_day ? info.delivery_day : 10,
          start_time: info.start_time
            ? info.start_time
            : "",
          end_time: info.end_time
            ? info.end_time
            : "",
          final_start_time: info.final_start_time
            ? info.final_start_time
            : "",
          final_end_time: info.final_end_time
            ? info.final_end_time
            : "",
          unit_name: info.product.unit_name,
          is_show: info.is_show,
          attr: info.product.attr,
          spec_type: info.product.spec_type,
          create_time: info.create_time,
          product: info.product,
          tattend_one: info.tattend_one,
          tattend_two: info.tattend_two,
          presell_status: info.presell_status,
          status: info.product_status,
          pay_count: info.pay_count,
          stock: info.stock,
          stock_count: info.stock_count,
          merchant: info.merchant
        };
        if (this.formValidate.spec_type === 0) {
          this.OneattrValue = info.product.attrValue;
          this.OneattrValue[0].down_price = this.OneattrValue[0].presellSku ? this.OneattrValue[0].presellSku.down_price : 0;
          this.OneattrValue[0].presell_price = this.OneattrValue[0].presell_price ? this.OneattrValue[0].presellSku.presell_price : 0;
          this.OneattrValue[0].sales = this.OneattrValue[0].presellSku ? this.OneattrValue[0].presellSku.seles : 0;
        } else {
          this.ManyAttrValue = [];
          info.product.attrValue.forEach((val,i) => {
            if(val.presellSku){
              this.$set(val,'down_price',val.presellSku.down_price)
              this.$set(val,'presell_price',val.presellSku.presell_price)
              this.$set(val,'sales',val.presellSku.seles)
              this.attrInfo[Object.values(val.detail).sort().join("/")] = val;
              this.ManyAttrValue.push(val)
            }
          });
          this.watCh(this.formValidate.attr)
        }
        console.log(this.ManyAttrValue);
        if (this.formValidate.is_good === 1){
          this.checkboxGroup.push("is_good");
        }
        this.fullscreenLoading = false;
        this.formValidate.preSale_date = [
          info.start_time,
          info.end_time,
        ];
        this.formValidate.finalPayment_date = [
          info.final_start_time,
          info.final_end_time,
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
  //white-space: nowrap;
  //overflow: hidden;
  //text-overflow: ellipsis;
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
  max-height: 280px;
  min-height: 120px;
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
