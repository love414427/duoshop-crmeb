<template>
  <div class="Box">
    <el-dialog
      v-if="modals"
      :visible.sync="modals"
      width="80%"
      title="免审核商品信息编辑"
      custom-class="dialog-scustom"
    > 
      <el-form
        ref="formValidate"
        class="formValidate mt20"
        :model="formValidate"
        :rules="ruleInline"
        label-width="120px"
        label-position="right"
        @submit.native.prevent
      >
        <div>
          <div>
            <el-form-item label="商户商品分类：" prop="mer_cate_id">
              <el-cascader
                v-model="formValidate.mer_cate_id"
                class="selWidth"
                :options="merCateList"
                :props="propsMer"
                clearable
              />
            </el-form-item>
            <el-form-item v-if="formValidate.spec_type === 1 && ManyAttrValue.length > 1" label="批量设置：" class="labeltop">
              <el-table :data="oneFormBatch" size="mini">
                <el-table-column label="图片" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div
                      class="acea-row row-middle row-center-wrapper"
                    >
                      <div v-if="oneFormBatch[0].image" class="pictrue pictrueTab">
                        <img v-lazy="oneFormBatch[0].image">
                      </div>
                      <div v-else class="upLoad pictrueTab acea-row row-center-wrapper">
                        <i class="el-icon-camera cameraIconfont" />
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="售价" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-input-number v-model="oneFormBatch[0].price" :min="0" class="priceBox" controls-position="right"/>
                  </template>
                </el-table-column>
                <el-table-column label="成本价" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-input-number v-model="oneFormBatch[0].cost" :min="0" class="priceBox" controls-position="right"/>
                  </template>
                </el-table-column>
                <el-table-column label="市场价" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-input-number v-model="oneFormBatch[0].ot_price" :min="0" class="priceBox" controls-position="right"/>
                  </template>
                </el-table-column>
                <el-table-column label="库存" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-input-number v-model="oneFormBatch[0].stock" :min="0" class="priceBox" controls-position="right"/>
                  </template>
                </el-table-column>
                <el-table-column label="商品编号" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="oneFormBatch[0].bar_code" />
                  </template>
                </el-table-column>
                <el-table-column label="重量(KG)" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-input-number v-model="oneFormBatch[0].weight" :min="0" class="priceBox" controls-position="right"/>
                  </template>
                </el-table-column>
                <el-table-column label="体积(m²)" min-width="100" align="center">
                  <template slot-scope="scope">
                    <el-input-number v-model="oneFormBatch[0].volume" :min="0" class="priceBox" controls-position="right"/>
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="150" align="center">
                  <template slot-scope="scope">
                    <a href="javascript: void(0);" class="ela-btn" @click="batchAdd">添加</a>
                    <a href="javascript: void(0);" class="ela-btn" @click="batchDel">清空</a>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item v-if="formValidate.spec_type === 0" class="labeltop" label="规格列表：">
              <el-table :data="OneattrValue" border class="tabNumWidth" size="mini">
                <el-table-column align="center" label="图片" min-width="80">
                  <template slot-scope="scope">
                    <div class="upLoadPicBox">
                      <div v-if="scope.row.image" class="pictrue tabPic"><img :src="scope.row.image"></div>
                      <div v-else class="upLoad tabPic">
                        <i class="el-icon-camera cameraIconfont" />
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column v-for="(item,iii) in attrValue" :key="iii" :label="formThead[iii].title" align="center" min-width="120">
                  <template slot-scope="scope">
                    <el-input v-if="formThead[iii].title==='商品编号'" v-model="scope.row[iii]" type="text" class="priceBox" />
                    <el-input-number v-else v-model="scope.row[iii]" :min="0" class="priceBox" controls-position="right"/>
                  </template>
                </el-table-column>
                <template v-if="formValidate.extension_type === 1">
                  <el-table-column align="center" label="一级返佣(元)" min-width="100">
                    <template slot-scope="scope">
                      <el-input-number v-model="scope.row.extension_one" :min="0" class="priceBox" controls-position="right"/>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="二级返佣(元)" min-width="100">
                    <template slot-scope="scope">
                      <el-input-number v-model="scope.row.extension_two" :min="0" class="priceBox" controls-position="right"/>
                    </template>
                  </el-table-column>
                </template>
              </el-table>
            </el-form-item>
            <!-- 多规格表格-->
            <el-form-item v-if="formValidate.spec_type === 1" class="labeltop" label="规格列表：">
              <el-table :data="ManyAttrValue" border class="tabNumWidth" size="mini">
                <template v-if="manyTabDate">
                  <el-table-column v-for="(item,iii) in manyTabDate" :key="iii" align="center" :label="manyTabTit[iii].title" min-width="80">
                    <template slot-scope="scope">
                      <span class="priceBox" v-text="scope.row[iii]" />
                    </template>
                  </el-table-column>
                </template>
                <el-table-column align="center" label="图片" min-width="80">
                  <template slot-scope="scope">
                    <div class="upLoadPicBox" title="750*750px">
                      <div v-if="scope.row.image" class="pictrue tabPic"><img :src="scope.row.image"></div>
                      <div v-else class="upLoad tabPic">
                        <i class="el-icon-camera cameraIconfont" />
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column v-for="(item,iii) in attrValue" :key="iii" :label="formThead[iii].title" align="center" min-width="120">
                  <template slot-scope="scope">
                    <el-input v-if="formThead[iii].title==='商品编号'" v-model="scope.row[iii]" type="text" class="priceBox" />
                    <el-input-number v-else v-model="scope.row[iii]" :min="0" class="priceBox" controls-position="right"/>
                  </template>
                </el-table-column>
                <template v-if="formValidate.extension_type === 1">
                  <el-table-column align="center" label="一级返佣(元)" min-width="100">
                    <template slot-scope="scope">
                      <el-input-number v-model="scope.row.extension_one" :min="0" class="priceBox" controls-position="right"/>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="二级返佣(元)" min-width="100">
                    <template slot-scope="scope">
                      <el-input-number v-model="scope.row.extension_two" :min="0" class="priceBox" controls-position="right"/>
                    </template>
                  </el-table-column>
                </template>
              </el-table>
            </el-form-item> 
            <el-form-item>
              <el-button :loading="loading1" type="primary" class="submission" @click="handleSubmit('formValidate')">提交</el-button>
            </el-form-item>
          </div>
        </div>
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
  categorySelectApi,
  productDetailApi,
  freeTrialApi
} from '@/api/product'
import { roterPre } from "@/settings";
const defaultObj = {
  store_name: '',
  cate_id: '',
  temp_id: '',
  type: 0,
  guarantee_template_id: '',
  keyword: '',
  unit_name: '',
  store_info: '',
  image: '',
  slider_image: [],
  content: '',
  ficti: 0,
  once_count: 0,
  give_integral: 0,
  is_show: 0,
  price: 0,
  cost: 0,
  ot_price: 0,
  stock: 0,
  attrs: [],
  items: [],
  delivery_way: [],
  mer_labels: [],
  delivery_free: 0,
  spec_type: 0,
  is_copoy: 1,
  attrValue: [{
    image: '',
    price: 0,
    cost: 0,
    ot_price: 0,
    stock: 0,
    bar_code: '',
    weight: 0,
    volume: 0
  }]
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
  name: 'editAttr',
  components: {},
  data() {
    return {
      product_id: '',
      roterPre: roterPre,
      modals: false,
      loading: false,
      loading1: false,
      OneattrValue: [Object.assign({}, defaultObj.attrValue[0])], // 单规格
      ManyAttrValue: [Object.assign({}, defaultObj.attrValue[0])], // 多规格
      manyTabDate: {},
      count: 0,
      modal_loading: false,
      images: '',
      modalPic: false,
      isChoice: '',
      columns: [],
      merCateList: [], // 商户
      propsMer: { emitPath: false, multiple: true },
      ruleInline: {
        mer_cate_id: [
          {
            required: true,
            message: '请选择商户分类',
            trigger: 'change',
            type: 'array',
            min: '1'
          }
        ]
      },
      formThead: Object.assign({}, objTitle),
      formValidate: Object.assign({}, defaultObj),
      items: [
        {
          image: '',
          price: 0,
          cost: 0,
          ot_price: 0,
          stock: 0,
          bar_code: '',
          weight: 0,
          volume: 0
        }
      ],
      tableIndex: 0,
      attrInfo: {},
      oneFormBatch:  [
        {
          image: '',
          price: 0,
          cost: 0,
          ot_price: 0,
          stock: 0,
          bar_code: '',
          weight: 0,
          volume: 0
        }
      ]
    }
  },
  computed: {
    attrValue() {
      const obj = Object.assign({}, defaultObj.attrValue[0])
      delete obj.image
      return obj
    },
  },
  watch: {
    'formValidate.attr': {
      handler: function(val) {
        if (this.formValidate.spec_type === 1) this.watCh(val)
      },
      immediate: false,
      deep: true
    }
  },
  created() {
    this.getCategorySelect()
  },
  mounted() {

  },
  methods: {
    batchDel() {
      this.oneFormBatch = [
        {
          image: '',
          price: 0,
          cost: 0,
          ot_price: 0,
          stock: 0,
          bar_code: '',
          weight: 0,
          volume: 0
        }
      ]
    },
    batchAdd() {
      for (const val of this.ManyAttrValue) {
        this.$set(val, 'image', this.oneFormBatch[0].image)
        this.$set(val, 'price', this.oneFormBatch[0].price)
        this.$set(val, 'cost', this.oneFormBatch[0].cost)
        this.$set(val, 'ot_price', this.oneFormBatch[0].ot_price)
        this.$set(val, 'stock', this.oneFormBatch[0].stock)
        this.$set(val, 'bar_code', this.oneFormBatch[0].bar_code)
        this.$set(val, 'weight', this.oneFormBatch[0].weight)
        this.$set(val, 'volume', this.oneFormBatch[0].volume)
        this.$set(val, 'extension_one', this.oneFormBatch[0].extension_one)
        this.$set(val, 'extension_two', this.oneFormBatch[0].extension_two)
      }
    },
    // 商户分类；
    getCategorySelect() {
      categorySelectApi()
        .then((res) => {
          this.merCateList = res.data
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    watCh(val) {
      const tmp = {}
      const tmpTab = {}
      this.formValidate.attr.forEach((o, i) => {
        tmp['value' + i] = { title: o.value }
        tmpTab['value' + i] = ''
      })
      this.ManyAttrValue = this.attrFormat(val)
      console.log(this.ManyAttrValue)
      this.ManyAttrValue.forEach((val, index) => {
        const key = Object.values(val.detail).sort().join('/')
        if (this.attrInfo[key]) this.ManyAttrValue[index] = this.attrInfo[key]
        val.image = this.formValidate.image
      })
      this.attrInfo = {}
      this.ManyAttrValue.forEach((val) => {
        if (val.detail !== 'undefined' && val.detail !== null) {
          this.attrInfo[Object.values(val.detail).sort().join('/')] = val
        }
      })
      this.manyTabTit = tmp
      this.manyTabDate = tmpTab
      this.formThead = Object.assign({}, this.formThead, tmp)
    },
    attrFormat(arr) {
      let data = []
      const res = []
      return format(arr)
      function format(arr) {
        if (arr.length > 1) {
          arr.forEach((v, i) => {
            if (i === 0) data = arr[i]['detail']
            const tmp = []
            data.forEach(function(vv) {
              arr[i + 1] && arr[i + 1]['detail'] && arr[i + 1]['detail'].forEach(g => {
                const rep2 = (i !== 0 ? '' : arr[i]['value'] + '_$_') + vv + '-$-' + arr[i + 1]['value'] + '_$_' + g
                tmp.push(rep2)
                if (i === (arr.length - 2)) {
                  const rep4 = {
                    image: '',
                    price: 0,
                    cost: 0,
                    ot_price: 0,
                    stock: 0,
                    bar_code: '',
                    weight: 0,
                    volume: 0,
                    brokerage: 0,
                    brokerage_two: 0
                  }
                  rep2.split('-$-').forEach((h, k) => {
                    const rep3 = h.split('_$_')
                    if (!rep4['detail']) rep4['detail'] = {}
                    rep4['detail'][rep3[0]] = rep3.length > 1 ? rep3[1] : ''
                  })
                  Object.values(rep4.detail).forEach((v, i) => {
                    rep4['value' + i] = v
                  })
                  res.push(rep4)
                }
              })
            })
            data = tmp.length ? tmp : []
          })
        } else {
          const dataArr = []
          arr.forEach((v, k) => {
            v['detail'].forEach((vv, kk) => {
              dataArr[kk] = v['value'] + '_' + vv
              res[kk] = {
                image: '',
                price: 0,
                cost: 0,
                ot_price: 0,
                stock: 0,
                bar_code: '',
                weight: 0,
                volume: 0,
                brokerage: 0,
                brokerage_two: 0,
                detail: { [v['value']]: vv }
              }
              Object.values(res[kk].detail).forEach((v, i) => {
                res[kk]['value' + i] = v
              })
            })
          })
          data.push(dataArr.join('$&'))
        }
        return res
      }
    },
    // 获取规格数据
    getAttrDetail(id) {
      this.product_id = id
      this.loading = true
      this.modals = true
      productDetailApi(id)
        .then((res) => {
          const info = res.data
          this.formValidate = {
            attr: info.attr || [],
            attrValue: info.attrValue,
            mer_cate_id: info.mer_cate_id,
            spec_type: info.spec_type
           }
          if (this.formValidate.spec_type === 0) {
            this.OneattrValue = info.attrValue
          } else {
            this.ManyAttrValue = info.attrValue
            this.ManyAttrValue.forEach(val => {
              if (val.detail !== 'undefined' && val.detail !== null) {
                this.attrInfo[
                  Object.values(val.detail)
                    .sort()
                    .join('/')
                  ] = val
              }
            })
            this.$watch('formValidate.attr', this.watCh)
          }
          this.loading = false
        })
        .catch((res) => {
          this.$message.error(res.message)
          this.loading = false
        })
    },
    // 提交
    handleSubmit(name) {
      let that = this;
      that.$refs[name].validate((valid) => {
        if (valid) {
          if (that.formValidate.spec_type === 1) {
            that.formValidate.attrValue = that.ManyAttrValue
          } else {
            that.formValidate.attrValue = that.OneattrValue
            that.formValidate.attr = []
          }
          that.loading1 = true
          freeTrialApi(that.product_id,that.formValidate)
            .then((res) => {
              that.loading1 = false
              that.$message.success(res.message)
              setTimeout(() => {
                that.modals = false
              }, 500)
            })
            .catch((res) => {
              that.$message.error(res.message)
              that.loading1 = false
            })
        } else {
          if (!that.formValidate.mer_cate_id) {
            that.$message.warning('请选择商户商品分类！')
          }
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
/deep/.el-cascader {
  display: block;
}
.ela-btn {
  color: #2d8cf0;
}
.priceBox {
  width: 80px;
}
.pictrue {
  width: 50px;
  height: 50px;
  border: 1px dotted rgba(0, 0, 0, 0.1);
  display: inline-block;
  position: relative;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
/deep/.el-input-number__decrease,/deep/.el-input-number__increase{
  display: none;
}
/deep/.el-input-number.is-controls-right .el-input__inner{
  padding: 0 5px;
}
/deep/.el-input__inner{
  padding: 0 5px;
}
.pictrueTab {
  width: 40px !important;
  height: 40px !important;
}
.upLoad {
  width: 40px;
  height: 40px;
  border: 1px dotted rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.02);
  cursor: pointer;
}
</style>
