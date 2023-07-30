<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-tabs v-model="tableFrom.type" @tab-click="getList(1),getLstFilterApi()">
          <el-tab-pane v-for="(item,index) in headeNum" :key="index" :name="item.type.toString()" :label="item.name +'('+item.count +')' " />
        </el-tabs>
        <div class="container">
          <el-form size="small" label-width="120px" :inline="true">
            <el-form-item label="平台商品分类：">
              <el-cascader v-model="tableFrom.cate_id" class="selWidth" :options="categoryList" :props="props" clearable @change="getList(1)" />
            </el-form-item>
            <el-form-item label="商户商品分类：">
              <el-select v-model="tableFrom.mer_cate_id" placeholder="请选择" class="filter-item selWidth" clearable @change="getList(1)">
                <el-option v-for="item in merCateList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="是否为礼包：">
              <el-select v-model="tableFrom.is_gift_bag" placeholder="请选择" class="selWidth" clearable @change="getList(1)">
                <el-option label="是" value="1" />
                <el-option label="否" value="0" />
              </el-select>
            </el-form-item>
            <el-form-item label="会员价设置：">
              <el-select v-model="tableFrom.svip_price_type" placeholder="请选择" class="selWidth" clearable @change="getList(1)">
                <el-option label="未设置" value="0" />
                <el-option label="默认设置" value="1" />
                <el-option label="自定义设置" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="商品状态：">
              <el-select v-model="tableFrom.us_status" placeholder="请选择" class="filter-item selWidth" clearable @change="getList">
                <el-option v-for="item in productStatusList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="标签：">
              <el-select
                v-model="tableFrom.mer_labels"
                placeholder="请选择"
                class="filter-item selWidth"
                clearable
                filterable
                @change="getList(1)"
              >
                <el-option
                  v-for="item in labelList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="运费模板：">
              <el-select
                v-model="tableFrom.temp_id"
                placeholder="请选择"
                class="filter-item selWidth"
                clearable
                filterable
                @change="getList(1)"
              >
                <el-option
                  v-for="item in tempList"
                  :key="item.shipping_template_id"
                  :label="item.name"
                  :value="item.shipping_template_id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="关键字搜索：">
              <el-input v-model="tableFrom.keyword" placeholder="请输入商品名称，关键字" class="selWidth" @keyup.enter.native="getList(1)">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
            <el-form-item label="商品类型：">
              <el-select v-model="tableFrom.is_ficti" placeholder="请选择" class="filter-item selWidth" clearable @change="getList(1)">
                <el-option v-for="item in productTypeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <router-link :to="{ path:`${roterPre}` + '/product/list/addProduct' }">
          <el-button size="small" type="primary">添加商品</el-button>
        </router-link>
        <el-button size="small" type="success" @click="onCopy">商品采集</el-button>
        <el-button size="mini" :disabled="tableFrom.type != 1 || multipleSelection.length == 0" @click="batchOff">批量下架</el-button>
        <el-button size="mini" :disabled="tableFrom.type != 2 || multipleSelection.length == 0" @click="batchShelf">批量上架</el-button>
        <el-button size="mini" :disabled="multipleSelection.length == 0" @click="batchLabel">批量设置标签</el-button>
        <el-tooltip class="item" effect="dark" content="仅可针对实物商品批量设置运费，选中的虚拟商品和卡密商品将被自动过滤！" placement="top-start">
         <el-button size="mini" :disabled="multipleSelection.length == 0" @click="batchFreight">批量设置运费</el-button>
        </el-tooltip>
        
        <el-button size="mini" :disabled="multipleSelection.length == 0" @click="batchCommision">批量设置佣金</el-button>
        <el-button v-if="open_svip == 1" size="mini" :disabled="multipleSelection.length == 0" @click="batchSvip">批量设置会员价</el-button>
      </div>
      <el-table 
        v-loading="listLoading" 
        :data="tableData.data" 
        style="width: 100%" 
        size="mini" 
        :row-class-name="tableRowClassName" 
        :row-key="(row) => { return row.product_id }"
        @selection-change="handleSelectionChange"
        @rowclick.stop="closeEdit">
        <el-table-column
          type="selection"
          :reserve-selection="true"
          width="55"
        />
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand demo-table-expand1" label-width="90px">
              <el-form-item label="平台分类：">
                <span>{{ props.row.storeCategory?props.row.storeCategory.cate_name:'-' }}</span>
              </el-form-item>
              <el-form-item label="商品分类：">
                <template v-if="props.row.merCateId.length">
                  <span v-for="(item, index) in props.row.merCateId" :key="index" class="mr10">{{ item.category.cate_name }}</span>
                </template>
                <span v-else>-</span>
              </el-form-item>
              <el-form-item label="品牌：">
                <span class="mr10">{{ props.row.brand?props.row.brand.brand_name:'其他' }}</span>
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
              <el-form-item v-if="tableFrom.type === '7'" key="1" label="未通过原因：">
                <span>{{ props.row.refusal }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="product_id" label="ID" min-width="50" />
        <el-table-column label="商品图" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image :src="scope.row.image" :preview-src-list="[scope.row.image]" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="store_name" label="商品名称" min-width="200" />
        <el-table-column prop="price" label="商品售价" min-width="90" />
        <el-table-column prop="svip_price" label="会员价" min-width="90">
           <template slot-scope="scope">
            <span>{{ scope.row.svip_price || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sales" label="销量" min-width="90" />
        <el-table-column prop="stock" label="库存" min-width="70" />
        <el-table-column prop="integral_total" label="积分抵扣" min-width="70" />
        <el-table-column prop="integral_price_total" label="积分抵扣金额" min-width="90" />
        <el-table-column prop="sort" align="center" label="排序" min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.index === tabClickIndex">
              <el-input v-model.number="scope.row['sort']" type="number" maxlength="300" size="mini" autofocus @blur="inputBlur(scope)" />
            </span>
            <span v-else @dblclick.stop="tabClick(scope.row)">{{ scope.row['sort'] }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="Number(tableFrom.type) < 5" key="1" prop="status" label="上/下架" min-width="150">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.is_show" :active-value="1" :inactive-value="0" active-text="上架" inactive-text="下架" @change="onchangeIsShow(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="商品状态" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.us_status | productStatusFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="标签" min-width="90">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.mer_labels" :key="index" class="label-list">{{ item.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" min-width="150" />
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope"> 
            <router-link v-if="tableFrom.type != 5" :to="{path: roterPre + '/product/list/addProduct/' + scope.row.product_id}">
              <el-button type="text" size="small" class="mr10">编辑</el-button>
            </router-link>
            <router-link v-if="tableFrom.type != 5" :to="{path: roterPre + '/product/list/addProduct/' + scope.row.product_id+'?type=copy'}">
              <el-button type="text" size="small" class="mr10">复制</el-button>
            </router-link>
            <el-button v-if="tableFrom.type !== '5'" type="text" size="small" @click="handlePreview(scope.row.product_id)">预览</el-button>
            <router-link v-if="tableFrom.type != 5" :to="{path: roterPre + '/product/reviews/?product_id=' + scope.row.product_id}">
              <el-button type="text" size="small" class="mr10">查看评价</el-button>
            </router-link>
            <el-button v-if="tableFrom.type !== '5' && is_audit == '1' " type="text" size="small" @click="onAuditFree(scope.row)">免审编辑</el-button>
            <el-button v-if="tableFrom.type !== '5'" type="text" size="small" @click="onEditLabel(scope.row)">编辑标签</el-button>
            <el-button v-if="tableFrom.type === '5'" type="text" size="small" @click="handleRestore(scope.row.product_id)">恢复商品</el-button>
            <el-button v-if="tableFrom.type !== '1' && tableFrom.type!== '3' && tableFrom.type !=='4' " type="text" size="small" @click="handleDelete(scope.row.product_id, scope.$index)">{{ tableFrom.type === '5' ? '删除' : '加入回收站' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="tableFrom.limit" :current-page="tableFrom.page" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange" @current-change="pageChange" />
      </div>
    </el-card>
    <!-- 生成淘宝京东表单-->
    <tao-bao ref="taoBao" @getSuccess="getSuccess" :deliveryType="deliveryType" :deliveryList="deliveryList"/>
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
          <el-select v-model="labelForm.mer_labels" clearable multiple placeholder="请选择" class="selWidth">
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
    <!-- 免审核弹窗-->
    <edit-attr ref="editAttr"/>
    <!--运费模板弹窗-->
    <el-dialog
      v-if="dialogFreight"
      title="选择运费模板"
      :visible.sync="dialogFreight"
      width="800px"
      :before-close="handleFreightClose"
    >
      <!-- <el-alert
        title="仅可针对实物商品批量设置运费，选中的虚拟商品将被自动过滤！"
        type="warning">
      </el-alert> -->
      <el-form ref="tempForm" :model="tempForm" :rules="tempRule" @submit.native.prevent>
        <el-form-item prop="temp_id">
          <el-select v-model="tempForm.temp_id" clearable placeholder="请选择" class="selWidth">
            <el-option
              v-for="item in tempList"
              :key="item.shipping_template_id"
              :label="item.name"
              :value="item.shipping_template_id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitTempForm('tempForm')">提交</el-button>
      </span>
    </el-dialog>
    <!--批量设置佣金弹窗-->
    <el-dialog
      v-if="dialogCommision"
      title="设置佣金"
      :visible.sync="dialogCommision"
      width="600px"
    >
      <el-form ref="commisionForm" :model="commisionForm" :rules="commisionRule" @submit.native.prevent>
        <el-form-item label="一级佣金比例：" prop="extension_one">
          <el-input-number v-model="commisionForm.extension_one" :precision="2" :step="0.1" :min="0" :max="1" class="priceBox" controls-position="right"/>
        </el-form-item>
        <el-form-item label="二级佣金比例：" prop="extension_two">
          <el-input-number v-model="commisionForm.extension_two" :precision="2" :step="0.1" :min="0" :max="1" class="priceBox" controls-position="right"/>
        </el-form-item>
        <el-form-item>
          <span>备注：订单交易成功后给上级返佣的比例，例:0.5 = 返订单金额的50%</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitCommisionForm('commisionForm')">提交</el-button>
      </span>
    </el-dialog>
    <!--批量设置付费会员价-->
    <el-dialog
      v-if="dialogSvip"
      title="批量设置付费会员价"
      :visible.sync="dialogSvip"
      width="700px"
    >
      <el-form ref="svipForm" :model="svipForm" @submit.native.prevent label-width="80px">
        <el-form-item
          label="参与方式："
        >
          <el-radio-group v-model="svipForm.svip_price_type">
            <el-radio :label="0" class="radio">不设置会员价</el-radio>
            <el-radio :label="1" class="radio">默认设置会员价</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
         备注：默认设置会员价是指商户在 <router-link :to="{path: roterPre + '/systemForm/Basics/svip'}" style="color: #1890ff;"> [设置-付费会员设置] </router-link> 中设置的会员折扣价，选择后每个商品默认展示此处设置的会员折扣价。
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitSvipForm('svipForm')">提交</el-button>
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
  productLstApi,
  productDeleteApi,
  categorySelectApi,
  lstFilterApi,
  statusApi,
  categoryListApi,
  destoryApi,
  restoreApi,
  productSort,
  getProductLabelApi,
  updatetProductLabel,
  batchesOnOffApi,
  productConfigApi,
  batchesLabelsApi,
  shippingListApi,
  batchesTempApi,
  productBathExtApi,
  productBathSvipApi
} from '@/api/product'
import { roterPre } from '@/settings'
import taoBao from './taoBao'
import editAttr from './editAttr'
import previewBox from '@/components/previewBox/index'
export default {
  name: 'ProductList',
  components: { taoBao, previewBox, editAttr },
  data() {
    return {
      props: {
        emitPath: false
      },
      roterPre: roterPre,
      headeNum: [],
      labelList: [],
      tempList: [],
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },
      tableFrom: {
        page: 1,
        limit: 20,
        mer_cate_id: '',
        cate_id: '',
        keyword: '',
        temp_id: '',
        type: this.$route.query.type ? this.$route.query.type : '1',
        is_ficti: "",
        is_gift_bag: '',
        us_status: '',
        mer_labels: '',
        svip_price_type: '',
        product_id: this.$route.query.id ? this.$route.query.id : ''
      },
      categoryList: [], // 平台
      merCateList: [], // 商户分类筛选
      modals: false,
      tabClickIndex: '',
      multipleSelection: [],
      productStatusList: [
        { label: '上架显示', value: 1 },
        { label: '下架', value: 0 },
        { label: '平台关闭', value: -1 }
      ],
      productTypeList: [
        { label: '普通商品', value: 0 },
        { label: '虚拟商品', value: 1 },
        { label: '卡密商品', value: 2 }
      ],
      tempRule: {
        temp_id: [{required: true,message: '请选择运费模板',trigger: 'change'}]
      },
      commisionRule: {
        extension_one: [{required: true,message: '请输入一级佣金',trigger: 'change'}],
        extension_two: [{required: true,message: '请输入二级佣金',trigger: 'change'}]
      },
      commisionForm: {extension_one:0,extension_two:0},
      svipForm: {svip_price_type: 0},
      goodsId: '',
      previewKey: '',
      product_id: '',
      previewVisible: false,
      dialogLabel: false,
      dialogFreight: false,
      dialogCommision: false,
      dialogSvip: false,
      is_audit: false,
      deliveryType: [],
      deliveryList: [],
      labelForm: {},
      tempForm: {},
      isBatch: false,
      open_svip: false
    }
  },
  mounted() {
    this.getLstFilterApi()
    this.getCategorySelect()
    this.getCategoryList()
    this.getList(1)
    this.getLabelLst()
    this.getTempLst()
    this.productCon()
  },
  methods: {
    // 把每一行的索引放进row
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex
    },
    // 添加明细原因 row 当前行 column 当前列
    tabClick(row) {
      this.tabClickIndex = row.index
    },
    // 失去焦点初始化
    inputBlur(scope) {
      if (!scope.row.sort || scope.row.sort < 0) scope.row.sort = 0
      productSort(scope.row.product_id, { sort: scope.row.sort })
        .then((res) => {
          this.closeEdit()
        })
        .catch((res) => {
        })
    },
    closeEdit() {
      this.tabClickIndex = null
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      const data = []
      this.multipleSelection.map((item) => {
        data.push(item.product_id)
      })
      this.product_ids = data
    },
    productCon() {
      productConfigApi()
        .then(res => {
          this.is_audit = res.data.is_audit
          this.open_svip = res.data.mer_svip_status == 1 && res.data.svip_switch_status == 1
          this.deliveryType = res.data.delivery_way.map(String)
          if (this.deliveryType.length == 2) {
            this.deliveryList = [
              { value: '1', name: '到店自提' },
              { value: '2', name: '快递配送' }
            ]
          } else {
            if (this.deliveryType.length == 1 && this.deliveryType[0] == '1') {
              this.deliveryList = [
                { value: '1', name: '到店自提' }
              ]
            } else {
              this.deliveryList = [
                { value: '2', name: '快递配送' }
              ]
            }
          }
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    getSuccess() {
      this.getLstFilterApi()
      this.getList(1)
    },
    handleClose() {
      this.dialogLabel = false
    },
    handleFreightClose() {
      this.dialogFreight = false
    },
    // 添加淘宝商品成功
    onClose() {
      this.modals = false
    },
    // 复制淘宝
    onCopy() {
      // this.$refs.taoBao.modals = true
      // this.$refs.taoBao.soure_link = ''
      // this.$refs.taoBao.formValidate = {}
      // this.$refs.taoBao.isData = false
       this.$router.push({
        path: this.roterPre + '/product/list/addProduct',
        query: { type: 1 },
      });
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
    // 获取运费模板
    getTempLst() {
      shippingListApi().then(res => {
        this.tempList = res.data
      })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 免审编辑
    onAuditFree(row) {
      this.$refs.editAttr.getAttrDetail(row.product_id)
    },
    // 批量设置佣金
    batchCommision() {
      if(this.multipleSelection.length === 0) return this.$message.warning('请先选择商品')
      this.dialogCommision = true;
    },
    // 批量设置会员价
    batchSvip() {
      if(this.multipleSelection.length === 0) return this.$message.warning('请先选择商品')
      this.dialogSvip = true;
    },
    submitCommisionForm(name) {
        this.$refs[name].validate(valid => {
        if (valid) {
          this.commisionForm.ids = this.product_ids
          productBathExtApi(this.commisionForm).then(({ message }) => {
            this.$message.success(message)
            this.getList('')
            this.dialogCommision = false
          })
        } else {
          return
        }
      })
    },
    // 提交会员价
    submitSvipForm(name) {
      this.svipForm.ids = this.product_ids
      productBathSvipApi(this.svipForm).then(({ message }) => {
        this.$message.success(message)
        this.getList('')
        this.dialogSvip = false
      })
    },
    // 批量上架
    batchShelf() {
      if(this.multipleSelection.length === 0) return this.$message.warning('请先选择商品')
      let data = {status: 1,ids: this.product_ids}
      batchesOnOffApi(data).then(res => {
        this.$message.success(res.message)
        this.getLstFilterApi()
        this.getList('')
      })
      .catch(res => {
        this.$message.error(res.message)
      })
    },
    // 批量下架
    batchOff() {
      if(this.multipleSelection.length === 0) return this.$message.warning('请先选择商品')
      let data = {status: 0,ids: this.product_ids}
      batchesOnOffApi(data).then(res => {
        this.$message.success(res.message)
        this.getLstFilterApi()
        this.getList('')
      })
      .catch(res => {
        this.$message.error(res.message)
      })
    },
    // 批量设置标签
    batchLabel() {
      this.labelForm = {
        mer_labels: [],
        ids: this.product_ids
      }
      this.isBatch = true
      this.dialogLabel = true
    },
    // 批量设置运费模板
    batchFreight() {

      this.dialogFreight = true;
    },
    submitTempForm(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.tempForm.ids = this.product_ids
          batchesTempApi(this.tempForm).then(({ message }) => {
            this.$message.success(message)
            this.getList('')
            this.dialogFreight = false
          })
        } else {
          return
        }
      })
    },
    handleRestore(id) {
      this.$modalSure('恢复商品').then(() => {
        restoreApi(id)
          .then(res => {
            this.$message.success(res.message)
            this.getLstFilterApi()
            this.getList('')
          })
          .catch(res => {
            this.$message.error(res.message)
          })
      })
    },
    // 预览
    handlePreview(id) {
      this.previewVisible = true
      this.goodsId = id
      this.previewKey = ''
    },
    // 商户分类；
    getCategorySelect() {
      categorySelectApi()
        .then(res => {
          this.merCateList = res.data
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 平台分类；
    getCategoryList() {
      categoryListApi()
        .then(res => {
          this.categoryList = res.data
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 列表表头；
    getLstFilterApi() {
      lstFilterApi()
        .then(res => {
          this.headeNum = res.data
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num || this.tableFrom.page
      productLstApi(this.tableFrom)
        .then(res => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.listLoading = false
        })
        .catch(res => {
          this.listLoading = false
          this.$message.error(res.message)
        })
      this.getLstFilterApi()
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getList('')
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList('')
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure(this.tableFrom.type !== '5' ? '加入回收站' : '删除该商品').then(
        () => {
          this.tableFrom.type === '5'
            ? destoryApi(id)
              .then(({ message }) => {
                this.$message.success(message)
                this.getList('')
                this.getLstFilterApi()
              })
              .catch(({ message }) => {
                this.$message.error(message)
              })
            : productDeleteApi(id)
              .then(({ message }) => {
                this.$message.success(message)
                this.getList('')
                this.getLstFilterApi()
              })
              .catch(({ message }) => {
                this.$message.error(message)
              })
        }
      )
    },
    // 编辑标签
    onEditLabel(row) {
      this.dialogLabel = true
      this.product_id = row.product_id
      if (row.mer_labels && row.mer_labels.length) {
        const arrNew = row.mer_labels.map(item => {
          return item.product_label_id
        })
        this.labelForm = {
          mer_labels: arrNew
        }
      } else {
        this.labelForm = {
          mer_labels: []
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
          }) :
          updatetProductLabel(this.product_id, this.labelForm).then(({ message }) => {
            this.$message.success(message)
            this.getList('')
            this.dialogLabel = false
          })
        } else {
          return
        }
      })
    },
    onchangeIsShow(row) {
      statusApi(row.product_id, row.is_show)
        .then(({ message }) => {
          this.$message.success(message)
          this.getList('')
          this.getLstFilterApi()
        })
        .catch(({ message }) => {
          this.$message.error(message)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.bg {
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.goods_detail .goods_detail_wrapper {
  z-index: -10;
}
/deep/ table.el-input__inner {
  padding: 0;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand1 {
  /deep/ label {
    color: #99a9bf;
  }
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 33.33%;
}
.selWidth {
  width: 300px !important;
}
.seachTiele {
  line-height: 35px;
}
</style>
