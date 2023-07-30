<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-tabs v-model="tableFrom.type" @tab-click="getList(1),getLstFilterApi()">
          <el-tab-pane v-for="(item,index) in headeNum" :key="index" :name="item.type.toString()" :label="item.name +'('+item.count +')' " />
        </el-tabs>
        <div class="container">
          <div class="demo-input-suffix acea-row">
            <el-form inline size="small" label-width="100px">
              <el-form-item label="商品分类：">
                <el-cascader v-model="tableFrom.pid" class="selWidth" :options="merCateList" :props="{ checkStrictly: true, emitPath:false }" clearable @change="getList(1)" />
              </el-form-item>
              <el-form-item label="商户名称：">
                <el-select v-model="tableFrom.mer_id" clearable filterable placeholder="请选择" class="selWidth" @change="getList(1)">
                  <el-option v-for="item in merSelect" :key="item.mer_id" :label="item.mer_name" :value="item.mer_id" />
                </el-select>
              </el-form-item>
              <el-form-item label="商户类别：">
                <el-select v-model="tableFrom.is_trader" clearable placeholder="请选择" class="selWidth" @change="getList(1)">
                  <el-option label="自营" value="1" />
                  <el-option label="非自营" value="0" />
                </el-select>
              </el-form-item>
              <el-form-item label="商品状态：">
                <el-select v-model="tableFrom.us_status" placeholder="请选择" class="filter-item selWidth" clearable @change="getList(1)">
                  <el-option v-for="item in productStatusList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item label="推荐级别：">
                <el-select v-model="tableFrom.star" placeholder="请选择" class="filter-item selWidth" clearable @change="getList(1)">
                  <el-option v-for="item in recommendedLevelStatus" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>               
              </el-form-item>
              <el-form-item label="标签：">
                <el-select v-model="tableFrom.sys_labels" placeholder="请选择" class="filter-item selWidth" clearable filterable @change="getList(1)">
                  <el-option v-for="item in labelList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>               
              </el-form-item>
              <el-form-item label="会员价设置：">
              <el-select v-model="tableFrom.svip_price_type" placeholder="请选择" class="selWidth" clearable @change="getList(1)">
                <el-option label="未设置" value="0" />
                <el-option label="默认设置" value="1" />
                <el-option label="自定义设置" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="商品推荐：">
              <el-select v-model="tableFrom.hot_type" placeholder="请选择" class="filter-item selWidth" clearable filterable @change="getList(1)">
                <el-option v-for="item in recommendList" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>               
            </el-form-item>
            <el-form-item label="商品类型：">
              <el-select v-model="tableFrom.is_ficti" placeholder="请选择" class="filter-item selWidth" clearable @change="getList(1)">
                <el-option v-for="item in productTypeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="商品搜索：">
              <el-input v-model="tableFrom.keyword" @keyup.enter.native="getList(1)" placeholder="请输入商品名称，关键字，产品编号" class="selWidth">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-button v-show="tableFrom.type === '6'" size="mini" :disabled="multipleSelection.length==0" @click="batch">批量审核</el-button>
      <el-button size="mini" :disabled="multipleSelection.length==0 " @click="batchOff">批量强制下架</el-button>
      <el-button size="mini" :disabled="multipleSelection.length==0 " @click="batchShow(0)">批量不显示</el-button>
      <el-button size="mini" :disabled="multipleSelection.length==0 " @click="batchShow(1)">批量显示</el-button>
      <el-button :disabled="multipleSelection.length==0" size="mini" @click="batchLabel">批量设置标签</el-button>
      <el-button :disabled="multipleSelection.length==0" size="mini" @click="batchRecommend">批量设置推荐</el-button>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini" @selection-change="handleSelectionChange">
        <el-table-column v-if="Number(tableFrom.type)<7" key="2" type="selection" width="55" />
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="平台分类：">
                <span>{{ props.row.storeCategory?props.row.storeCategory.cate_name:'-' }}</span>
              </el-form-item>
              <el-form-item label="商户类别：">
                <!-- <span>{{ props.row.storeCategory?props.row.storeCategory.cate_name:'-' }}</span> -->
                <span v-if="props.row.merchant" class="spBlock">{{ props.row.merchant .is_trader ? '自营' : '非自营' }}</span>
              </el-form-item>
              <el-form-item label="商品分类：">
                <template v-if="props.row.merCateId.length">
                  <span v-for="(item, index) in props.row.merCateId" :key="index" class="mr10">{{ item.category ? item.category.cate_name : '-' }}</span>
                </template>
                <span v-else>-</span>
              </el-form-item>
              <el-form-item label="品牌：">
                <span>{{ props.row.brand ? props.row.brand.brand_name: '-' }}</span>
              </el-form-item>
              <el-form-item label="市场价格：">
                <span>{{ props.row.ot_price | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="成本价：">
                <span>{{ props.row.cost | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="收藏：">
                <span>{{ props.row.care_count | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="已售数量：">
                <span>{{ props.row.ficti | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="抵扣积分：">
                <span>{{ props.row.integral_total }}</span>
              </el-form-item>
              <el-form-item label="积分抵扣金额：">
                <span>{{ props.row.integral_price_total }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="product_id" label="ID" min-width="50" />
        <el-table-column label="商品图" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image style="width: 36px; height: 36px" :src="scope.row.image" :preview-src-list="[scope.row.image]" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="store_name" label="商品名称" min-width="200" />
        <el-table-column label="商户名称" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.merchant ? scope.row.merchant.mer_name : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mer_name" label="商户类别" min-width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.merchant" class="spBlock">{{ scope.row.merchant .is_trader ? '自营' : '非自营' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="商品售价" min-width="90" />
         <el-table-column prop="svip_price" label="会员价" min-width="90">
           <template slot-scope="scope">
            <span>{{ scope.row.svip_price || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sales" label="销量" min-width="90" />
        <!-- <el-table-column prop="integral_total" label="抵扣积分" min-width="90" />
        <el-table-column prop="integral_price_total" label="积分抵扣金额" min-width="90" /> -->
        <el-table-column prop="stock" label="库存" min-width="90" />
        <el-table-column label="推荐级别" min-width="150">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.star+'星推荐' }} </span> -->
            <el-rate disabled v-model="scope.row.star" :colors="colors">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="rank" label="排序" min-width="70" />
        <el-table-column prop="status" label="是否显示" min-width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.is_used" :active-value="1" :inactive-value="0" active-text="显示" inactive-text="隐藏" @change="onchangeIsShow(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="商品状态" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.us_status | productStatusFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="标签"  max-height="120" min-width="90" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.sys_labels" :key="index" class="label-list">{{ item.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" min-width="150" />
        <el-table-column v-if="Number(tableFrom.type) < 7" key="8" label="操作" min-width="160" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button v-if="Number(tableFrom.type) < 7" type="text" size="small" @click="onEdit(scope.row.product_id)">编辑</el-button>
            <el-button type="text" size="small" @click="handlePreview(scope.row.product_id)">预览</el-button>
            <router-link v-if="tableFrom.type != 5" :to="{path: roterPre + '/product/comment/?product_id=' + scope.row.product_id}">
              <el-button type="text" size="small" class="mr10">查看评价</el-button>
            </router-link>
            <el-button v-if="tableFrom.type !== '5'" type="text" size="small" @click="onEditLabel(scope.row)">编辑标签</el-button>
            <el-button v-if="tableFrom.type === '6' || tableFrom.type === '1'" type="text" size="small" @click="toVirtualSales(scope.row.product_id)">已售数量</el-button>
            <el-button v-if="tableFrom.type === '6'" type="text" size="small" @click="toExamine(scope.row.product_id)">审核</el-button>
            <el-button v-if="Number(tableFrom.type) < 3" type="text" size="small" @click="toOff([scope.row.product_id])">强制下架</el-button>           
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="tableFrom.limit" :current-page="tableFrom.page" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange" @current-change="pageChange" />
      </div>
    </el-card>
    <info-from ref="infoFrom" :is-show="isShow" :ids="OffId" @subSuccess="subSuccess" />
    <el-dialog title="商品编辑" :visible.sync="dialogVisible" width="1000px" :before-close="handleClose" :append-to-body='append'>
      <el-form ref="formValidate" v-loading="fullscreenLoading" class="formValidate mt20" :rules="ruleValidate" :model="formValidate" label-width="100px" @submit.native.prevent>
        <el-form-item label="商品名称：" prop="store_name">
          <el-input v-model="formValidate.store_name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="星级推荐：">
          <el-rate class="rate_star" v-model="formValidate.star" :colors="colors" style="margin-top: 4px;"></el-rate>
          <span style="margin-top: 4px; font-size: 12px;">备注：5星为最高推荐级别，1星为最低推荐级别，设置后会在商城商品列表、搜索商品列表中体现。</span>
        </el-form-item>
        <el-form-item label="商品推荐：">
          <el-checkbox-group v-model="checkboxGroup" size="small" @change="onChangeGroup">
            <el-checkbox v-for="(item, index) in recommend" :key="index" :label="item.value">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input-number v-model="formValidate.rank" placeholder="请输入排序序号" style="width: 200px;" />
        </el-form-item>
        <el-col :span="24">
          <el-form-item label="商品详情：">
            <ueditor-from v-model="formValidate.content" :content="formValidate.content" />
          </el-form-item>
        </el-col>
        <el-form-item style="margin-top:30px;">
          <el-button type="primary" class="submission" size="small" @click="handleSubmit('formValidate')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
     <!--预览商品-->
    <div v-if="previewVisible">
        <div class="bg" @click.stop="previewVisible = false" />
        <preview-box v-if="previewVisible" ref="previewBox" :goods-id="goodsId" :product-type="0" :preview-key="previewKey" />
    </div>
    <!--编辑标签-->
    <el-dialog
      v-if="dialogLabel"
      title="选择标签"
      :visible.sync="dialogLabel"
      width="800px"
      :before-close="handleClose"
    >
      <el-form ref="labelForm" :model="labelForm" @submit.native.prevent>
        <el-form-item>
          <el-select v-model="labelForm.sys_labels" clearable filterable multiple placeholder="请选择" class="selWidth">
            <el-option
                v-for="item in labelList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('labelForm')">提交</el-button>
      </span>
    </el-dialog>
    <!--编辑推荐-->
    <el-dialog
      v-if="dialogRecommend"
      title="推荐设置"
      :visible.sync="dialogRecommend"
      width="800px"
      :before-close="handleClose"
    >
      <el-form @submit.native.prevent>
        <el-form-item label="商品推荐：">
         <el-checkbox-group v-model="recommendGroup" @change="onChangeRecommend" size="small">
            <el-checkbox v-for="(item, index) in recommend" :key="index" :label="item.value">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitRecommendForm">提交</el-button>
      </span>
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
  changeApi,
  productLstApi,
  productDetailApi,
  categoryListApi,
  productUpdateApi,
  lstFilterApi,
  merSelectApi,
  productOffApi,
  toVirtualSalesApi,
  getProductLabelApi,
  updatetProductLabel,
  batchesLabelsApi,
  batchesRecommendApi,
  batchesOnOffApi
} from '@/api/product'
import { roterPre } from '@/settings'
import infoFrom from './info'
import ueditorFrom from '@/components/ueditorFrom'
import previewBox from '@/components/previewBox/index'
const proOptions = [{
  name: '热门榜单',
  value: 'is_hot'
}, {
  name: '促销单品',
  value: 'is_benefit'
}, {
  name: '精品推荐',
  value: 'is_best'
}, {
  name: '首发新品',
  value: 'is_new'
}]
export default {
  name: 'ProductExamine1',
  components: {
    infoFrom,
    ueditorFrom,
    previewBox
  },
  data() {
    return {
      props: {
        emitPath: false
      },
      ruleValidate: {
        store_name: [{
          required: true,
          message: "请输入商品名称",
          trigger: "blur"
        },]
      },
      dialogVisible: false,
      dialogRecommend: false,
      append: true,
      checkboxGroup: [],
      recommendGroup: [],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      recommendedLevelStatus: [
        { label: "全部", value: "" },
        { label: "5星", value: 5 },
        { label: "4星", value: 4 },
        { label: "3星", value: 3 },
        { label: "2星", value: 2 },
        { label: "1星", value: 1 }
      ],
      recommend: proOptions,
      recommendList: [{
        name: '热门榜单',
        value: 'hot'
      }, {
        name: '促销单品',
        value: 'good'
      }, {
        name: '精品推荐',
        value: 'best'
      }, {
        name: '首发新品',
        value: 'new'
      }],
      formValidate: {
        is_hot: 0,
        is_best: 0,
        is_new: 0,
        is_benefit: 0,
        ficti: 0,
        is_ficti: "",
        content: '',
        store_name: '',
        rank: '',
        us_status: '',
        star: ''
      },
      productStatusList: [
        { label: "上架显示", value: 1 },
        { label: "下架", value: 0 },
        { label: "平台关闭", value: -1 },
      ],
      productTypeList: [
        { label: '普通商品', value: 0 },
        { label: '虚拟商品', value: 1 },
        { label: '卡密商品', value: 2 }
      ],
      fullscreenLoading: false,
      isShow: false,
      roterPre: roterPre,
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },
      tableFrom: {
        page: 1,
        limit: 20,
        cate_id: '',
        sys_labels: '',
        pid: '',
        store_name: '',
        type: '6',
        mer_id: '',
        keyword: '',
        is_trader: '',
        hot_type: '',
        star: '',
        svip_price_type: '',
        product_id: this.$route.query.id ? this.$route.query.id : ""
      },
      categoryList: [],
      merCateList: [],
      multipleSelection: [],
      headeNum: [],
      merSelect: [],
      OffId: [],
      productId: 0,
      tabClickIndex: '',
      previewVisible: false,
      goodsId: '',
      previewKey: '',
      product_id: '',
      labelList: [],
      dialogLabel: false,
      isBatch: false,
      labelForm: {},
      recommendForm: {}
    }
  },
  mounted() {
    this.getMerSelect()
    this.getList('')
    this.getCategorySelect()
    this.getLstFilterApi()
    this.getLabelLst()
  },
  methods: {
    subSuccess() {
      this.getList('')
      this.getLstFilterApi()
    },
    onchangeIsShow(row) {
      changeApi(row.product_id, row.is_used).then(({
        message
      }) => {
        this.$message.success(message)
        this.getList('')
        this.getLstFilterApi()
      }).catch(({
        message
      }) => {
        this.$message.error(message)
      })
    },
    // 预览
    handlePreview(id) {
      this.previewVisible = true
      this.goodsId = id
      this.previewKey = ''
    },
    // 获取标签项
    getLabelLst() {
      getProductLabelApi().then(res => {
        this.labelList = res.data
      })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 编辑标签
    onEditLabel(row) {
      this.dialogLabel = true
      this.product_id = row.product_id
      if (row.sys_labels && row.sys_labels.length) {
        const arrNew = row.sys_labels.map(item => {
          return item.product_label_id
        })
        this.labelForm = {
          sys_labels: arrNew
        }
      } else {
        this.labelForm = {
          sys_labels: []
        }
      }
    },
    submitForm(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.isBatch ? batchesLabelsApi(this.labelForm).then(({ message }) => {
            this.$message.success(message)
            this.getList('')
            this.dialogLabel = false
            this.isBatch = false
          }).catch(res => {
            this.$message.error(res.message)
          }) :
          updatetProductLabel(this.product_id, this.labelForm).then(({ message }) => {
            this.$message.success(message)
            this.getList('')
            this.dialogLabel = false
          }).catch(res => {
            this.$message.error(res.message)
          })
        } else {
          return
        }
      })
    },
    batchRecommend() {
      this.dialogRecommend = true
      this.recommendGroup = []
    },
    submitRecommendForm() {
      this.recommendForm.ids = this.OffId
      batchesRecommendApi(this.recommendForm).then(({ message }) => {
        this.$message.success(message)
        this.getList('')
        this.dialogRecommend = false
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    getInfo(id) {
      this.fullscreenLoading = true
      this.checkboxGroup = [];
      productDetailApi(id).then(res => {
        const info = res.data
        this.formValidate = {
          is_hot: info.is_hot,
          is_best: info.is_best,
          is_new: info.is_new,
          is_benefit: info.is_benefit,
          ficti: info.ficti,
          content: info.content,
          store_name: info.store_name,
          rank: info.rank,
          star: info.star
        }
        if(info.is_benefit === 1) this.checkboxGroup.push('is_benefit')
        if(info.is_hot === 1) this.checkboxGroup.push('is_hot')
        if(info.is_best === 1) this.checkboxGroup.push('is_best')
        if(info.is_new === 1) this.checkboxGroup.push('is_new')
        this.fullscreenLoading = false
        console.log(this.formValidate)
      }).catch(res => {
        this.$message.error(res.message)
        this.fullscreenLoading = false
      })
    },
    onEdit(id) {
      this.productId = id
      this.getInfo(id)
      this.dialogVisible = true
    },
    // 编辑虚拟销量
    toVirtualSales(id) {
      this.$modalForm(toVirtualSalesApi(id)).then(() => this.getList(''))
    },
    // 提交
    handleSubmit(name) {
      console.log(this.formValidate)
      this.$refs[name].validate((valid) => {
        if(valid) {
          productUpdateApi(this.productId, this.formValidate).then(async res => {
            this.fullscreenLoading = false
            this.$message.success(res.message)
            this.dialogVisible = false
            this.getList('')
          }).catch(res => {
            this.fullscreenLoading = false
            this.$message.error(res.message)
          })
        } else {
          return false
        }
      })
    },
    onChangeGroup() {
      this.checkboxGroup.includes('is_benefit') ? this.formValidate.is_benefit = 1 : this.formValidate.is_benefit = 0 && this.checkboxGroup.remove('is_benefit')
      this.checkboxGroup.includes('is_best') ? this.formValidate.is_best = 1 : this.formValidate.is_best = 0 && this.checkboxGroup.remove('is_best')
      this.checkboxGroup.includes('is_new') ? this.formValidate.is_new = 1 : this.formValidate.is_new = 0 && this.checkboxGroup.remove('is_new')
      this.checkboxGroup.includes('is_hot') ? this.formValidate.is_hot = 1 : this.formValidate.is_hot = 0 && this.checkboxGroup.remove('is_hot')
    },
    onChangeRecommend() {
      this.recommendForm.is_benefit = Number(this.recommendGroup.includes('is_benefit'));
      this.recommendForm.is_best = Number(this.recommendGroup.includes('is_best'));
      this.recommendForm.is_new = Number(this.recommendGroup.includes('is_new'));
      this.recommendForm.is_hot = Number(this.recommendGroup.includes('is_hot'));
    },
    handleClose() {
      this.dialogVisible = false
      this.dialogLabel = false
      this.dialogRecommend = false
    },
    // 批量下架
    batchOff() {
      if(this.multipleSelection.length === 0) return this.$message.warning('请先选择商品')
      this.toOff(this.OffId)
    },
    // 批量设置标签
    batchLabel() {
      this.labelForm = {
        sys_labels: [],
        ids: this.OffId
      }
      this.isBatch = true
      this.dialogLabel = true
    },
    // 批量显示不显示
    batchShow(status) {
      if(this.multipleSelection.length === 0) return this.$message.warning('请先选择商品')
      let data = {status: status,ids: this.OffId}
       batchesOnOffApi(data).then(res => {
        this.$message.success(res.message)
        this.getList('')
      })
      .catch(res => {
        this.$message.error(res.message)
      })
    },

    // 下架
    toOff(id) {
      this.$prompt('强制下架', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '请输入强制下架原因',
        inputType: 'textarea',
        inputPlaceholder: '请输入强制下架原因',
        inputValidator: (value) => {
          if(!value) {
            return '请输入强制下架原因'
          }
        }
      }).then(({
        value
      }) => {
        productOffApi({
          id: id,
          status: -2,
          refusal: value
        }).then(res => {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          this.getLstFilterApi()
          this.getList('')
        }).catch((res) => {
          this.$message.error(res.message)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    // 列表表头；
    getLstFilterApi() {
      lstFilterApi().then(res => {
        this.headeNum = res.data
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    // 商户列表；
    getMerSelect() {
      merSelectApi().then(res => {
        this.merSelect = res.data
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    batch() {
      if(this.multipleSelection.length === 0) return this.$message.warning('请先选择商品')
      this.$refs.infoFrom.dialogVisible = true
      this.isShow = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      const data = []
      this.multipleSelection.map((item) => {
        data.push(item.product_id)
      })
      this.OffId = data
    },
    toExamine(id) {
      this.$refs.infoFrom.dialogVisible = true
      this.isShow = true
      this.$refs.infoFrom.getInfo(id)
    },
    // 商户分类；
    getCategorySelect() {
      categoryListApi().then(res => {
        this.merCateList = res.data
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page;
      productLstApi(this.tableFrom).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.listLoading = false
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
      })
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getList('')
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList('')
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-select-dropdown__item{
  max-width: 350px!important;
}
.template{
  overflow: hidden;
}
.label-list{
  height: 100%;
}
.bg {
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}
.rate_star {
  position: relative;
  top: 5px;
}
table .el-image {
  display: inline-block;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand {
  /deep/ label {
    width: 105px;
    color: #99a9bf;
  }
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 33.33%;
}

.selWidth {
  min-width: 300px !important;
}

.seachTiele {
  line-height: 35px;
}

</style>
