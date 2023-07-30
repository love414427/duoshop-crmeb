<template>
  <el-dialog
    v-if="dialogVisible"
    title="商品审核"
    :visible.sync="dialogVisible"
    :append-to-body='isAppend'
    width="900px"
    :before-close="handleClose"
    class="projectInfo"
  >
    <el-tabs v-if="projectData && isShow" v-model="activeNames" v-loading="loading">
      <el-tab-pane label="商品信息" name="first">
        <div class="acea-row">
          <span class="sp">商品名称：{{ projectData.store_name }}</span>
          <span class="sp">平台分类：{{ projectData.storeCategory?projectData.storeCategory.cate_name:'' }}</span>
          <span class="sp">品牌：{{ projectData.brand?projectData.brand.brand_name:'其他' }}</span>
          <span class="sp">商品关键字：{{ projectData.keyword }}</span>
          <span class="sp">商品单位：{{ projectData.unit_name }}</span>
          <span class="sp" v-if="projectData.temp && projectData.temp.name">运费模板：{{ projectData.temp?projectData.temp.name:'' }}</span>
          <span class="sp100" v-if="projectData.temp && projectData.temp.info">运费说明：{{ projectData.temp?projectData.temp.info:'' }}</span>
          <span class="sp100">
            商品分类：
            <template v-if="projectData.merCateId">
              <span v-for="(item, index) in projectData.merCateId" :key="index" class="mr10">{{ item.category?item.category.cate_name:'' }}</span>
            </template>
            <span v-else>-</span>
          </span>
          <span class="sp100">商品简介：{{ projectData.store_info }}</span>
          <span class="sp100">
            商品封面图：
            <div class="demo-image__preview">
              <el-image
                style="width: 60px; height: 60px"
                :src="projectData.image"
                :preview-src-list="[projectData.image]"
              />
            </div>
          </span>
           <span v-if="projectData.video_link" class="sp100">
            主图视频：
             <video style="width:40%;height: 180px;border-radius: 10px;" :src="projectData.video_link" controls="controls">
                  您的浏览器不支持 video 标签。
                </video>
          </span>
          <span class="sp100">商品轮播图：
            <div
              v-for="(item,index) in projectData.slider_image"
              :key="index"
              class="pictrue"
            >
              <el-image
                style="width: 60px; height: 60px"
                :src="item"
                :preview-src-list="[item]"
              />
            </div>
          </span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品详情" name="second">
        <span class="sp100">商品详情：</span>
        <div class="contentPic" v-html="projectData.content"/>
      </el-tab-pane>
      <el-tab-pane label="其他设置" name="third">
        <span class="sp100">商品排序：{{ projectData.sort }}</span>
        <span class="third mb20">
          <span>商品推荐：</span>
          <el-checkbox-group v-model="checkboxGroup" size="small">
            <el-checkbox v-for="(item, index) in recommend" :key="index" disabled :label="item.value">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </span>
        <span v-if="projectData.guarantee && projectData.guarantee.templateValue.length" class="third mb20">
          <span>服务保障：</span>
          <span v-for="(item,index) in projectData.guarantee.templateValue" :key="index">
              <span v-if="item.value">{{index+1}}. {{item.value.guarantee_name}}；</span>
          </span>
        </span>
      </el-tab-pane>
      <el-tab-pane label="商品规格" name="fourth">
        <span class="sp">商品规格：{{ projectData.spec_type === 0 ? '单规格' : '多规格' }}</span>
        <span class="sp">佣金设置：{{ projectData.extension_type === 0 ? '默认设置' : '单独设置' }}</span>
        <span class="sp100">
          <span class="mb15" style="display: block">商品规格:</span>
          <template v-if="projectData.spec_type === 0">
            <el-table :data="OneattrValue" border class="tabNumWidth" size="mini">
              <el-table-column align="center" label="图片" min-width="80">
                <template slot-scope="scope">
                  <div class="demo-image__preview">
                    <el-image
                      style="width: 60px; height: 60px"
                      :src="scope.row.image"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column v-for="(item,iii) in attrValue" :key="iii" :label="formThead[iii].title" align="center" min-width="120">
                <template slot-scope="scope">
                  <span class="priceBox" v-text="scope.row[iii]" />
                </template>
              </el-table-column>
              <template v-if="projectData.extension_type === 1">
                <el-table-column align="center" label="一级返佣(元)" min-width="120">
                  <template slot-scope="scope">
                    <span class="priceBox" v-text="scope.row.extension_one" />
                  </template>
                </el-table-column>
                <el-table-column align="center" label="二级返佣(元)" min-width="120">
                  <template slot-scope="scope">
                    <span class="priceBox" v-text="scope.row.extension_two" />
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </template>
          <template v-if="projectData.spec_type === 1">
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
                  <div class="upLoadPicBox">
                    <div class="pictrue tabPic"><img :src="scope.row.image"></div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column v-for="(item,iii) in attrValue" :key="iii" :label="formThead[iii].title" align="center" min-width="120">
                <template slot-scope="scope">
                  <span class="priceBox">{{ scope.row[iii] }}</span>
                </template>
              </el-table-column>
              <template v-if="projectData.extension_type === 1">
                <el-table-column align="center" label="一级返佣(元)" min-width="120">
                  <template slot-scope="scope">
                    <span class="priceBox">{{ scope.row.extension_one }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="二级返佣(元)" min-width="120">
                  <template slot-scope="scope">
                    <span class="priceBox">{{ scope.row.extension_two }}</span>
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </template>
        </span>
      </el-tab-pane>
    </el-tabs>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
      <el-form-item label="审核状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio :label="1">通过</el-radio>
          <el-radio :label="-1">拒绝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="ruleForm.status===-1" label="原因" prop="refusal">
        <el-input v-model="ruleForm.refusal" type="textarea" placeholder="请输入原因" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
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
import { productDetailApi, productStatusApi } from '@/api/product'
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
    svip_price: null,
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
  svip_price: {
    title: '付费会员价'
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
const proOptions = [{ name: '是否热卖', value: 'is_hot' }, { name: '优品推荐', value: 'is_good' }, { name: '促销单品', value: 'is_benefit' }, { name: '是否精品', value: 'is_best' }, { name: '是否新品', value: 'is_new' }]
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
      isAppend: true,
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
      projectData: {},
      recommend: proOptions,
      checkboxGroup: [],
      svip_type: 0,
      OneattrValue: [Object.assign({}, defaultObj.attrValue[0])], // 单规格
      ManyAttrValue: [Object.assign({}, defaultObj.attrValue[0])] // 多规格
    }
  },
  computed: {
    attrValue() {
      const obj = Object.assign({}, defaultObj.attrValue[0])
      if(this.svip_type == 0)delete obj.svip_price
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
    onSubmit() {
      this.isShow ? this.ruleForm.id = this.proId : this.ruleForm.id = this.ids
      productStatusApi(this.ruleForm).then(res => {
        this.$message.success(res.message)
        this.dialogVisible = false
        this.activeNames = 'first'
        this.$emit('subSuccess')
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
      })
    },
    handleClose() {
      this.dialogVisible = false
      this.activeNames = 'first'
    },
    getInfo(id) {
      this.proId = id
      this.loading = true
      productDetailApi(id).then(res => {
        this.projectData = res.data
        this.svip_type = res.data.svip_price_type
       
        if (this.projectData.spec_type === 0) {
          this.OneattrValue = res.data.attrValue
        } else {
          this.ManyAttrValue = res.data.attrValue
        }
        const tmp = {}
        const tmpTab = {}
        this.projectData.attr.forEach((o, i) => {
          tmp['value' + i] = { title: o.value }
          tmpTab['value' + i] = ''
        })
        this.manyTabDate = tmpTab
        this.manyTabTit = tmp
        this.checkboxGroup = []
        this.formThead = Object.assign({}, this.formThead, tmp)
        if (this.projectData.is_hot === 1) this.checkboxGroup.push('is_hot')
        if (this.projectData.is_good === 1) this.checkboxGroup.push('is_good')
        if (this.projectData.is_benefit === 1) this.checkboxGroup.push('is_benefit')
        if (this.projectData.is_best === 1) this.checkboxGroup.push('is_best')
        if (this.projectData.is_new === 1) this.checkboxGroup.push('is_new')
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
  .projectInfo{
    /deep/.el-dialog__body{
      padding-top: 0 !important;
    }
    /deep/.el-tabs__content{
      padding-left: 10px !important;
    }
  }
  .tabPic{
    width: 40px !important;
    height: 40px !important;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .sp {
    display: block;
    width: 33%;
    font-size: 12px;
    margin-bottom: 20px;
  }

  .sp100 {
    width: 100%;
    margin-bottom: 15px;
    display: inline-block;
  }
  .third{
    width: 100%;
    display: flex;
  }
  .pictrue {
    width: 60px;
    height: 60px;
    border: 1px dotted rgba(0, 0, 0, 0.1);
    margin-right: 10px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .demo-image__preview{
    display: inline-block;
  }
</style>
