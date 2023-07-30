<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-tabs v-model="tableFrom.type" @tab-click="getList(1),getLstFilterApi()">
          <el-tab-pane
            v-for="(item,index) in headeNum"
            :key="index"
            :name="item.type.toString()"
            :label="item.name +'('+item.count +')' "
          />
        </el-tabs>
        <div class="container">
          <div class="demo-input-suffix acea-row">
            <el-form inline size="small" label-width="120px" >
               <el-form-item label="秒杀状态：">
              <el-select
                v-model="tableFrom.seckill_status"
                placeholder="请选择"
                class="filter-item selWidth"
                clearable
                @change="getList(1)"
              >
                <el-option
                  v-for="item in seckillStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="活动商品状态：">
              <el-select
                v-model="tableFrom.us_status"
                placeholder="请选择"
                class="filter-item selWidth"
                clearable
                @change="getList"
              >
                <el-option
                  v-for="item in productStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="标签：">
              <el-select v-model="tableFrom.sys_labels" placeholder="请选择" class="filter-item selWidth" clearable filterable @change="getList(1)">
                <el-option v-for="item in labelList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>               
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
              <el-form-item label="商户类别：" style="display: inline-block;">
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
              <el-form-item label="商品搜索：">
                <el-input
                  v-model="tableFrom.keyword"
                  @keyup.enter.native="getList(1)"
                  placeholder="请输入商品名称，关键字，产品编号"
                  class="selWidth"
                >
                  <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
                </el-input>
              </el-form-item>
              <el-form-item label="推荐级别：">
              <el-select
                v-model="tableFrom.star"
                placeholder="请选择"
                class="filter-item selWidth"
                clearable
                @change="getList(1)"
              >
                <el-option
                  v-for="item in recommendedLevelStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            </el-form>
          </div>
        </div>
        <el-button v-show="tableFrom.type === '6'" size="mini" @click="batch">批量审核</el-button>
        <el-button
          v-show="Number(tableFrom.type) < 3"
          size="mini"
          style="margin-left: 0px"
          @click="batchOff"
        >批量强制下架</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="mini"
        @selection-change="handleSelectionChange"
      >
        <el-table-column v-if="Number(tableFrom.type)<7" key="2" type="selection" width="55" />
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="平台分类：">
                <span>{{ scope.row.storeCategory ? scope.row.storeCategory.cate_name:'-' }}</span>
              </el-form-item>
              <!--<el-form-item label="商品分类：">
                <template v-if="scope.row.merCateId.length">
                  <span
                    v-for="(item, index) in scope.row.merCateId"
                    :key="index"
                    class="mr10"
                  >{{ item.category.cate_name }}</span>
                </template>
                <span v-else>-</span>
              </el-form-item>-->
              <el-form-item label="品牌：">
                <span>{{ scope.row.brand ? scope.row.brand.brand_name: '-' }}</span>
              </el-form-item>
              <el-form-item label="市场价格：">
                <span>{{ scope.row.ot_price | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="成本价：">
                <span>{{ scope.row.cost | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="收藏：">
                <span>{{ scope.row.care_count | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="已售数量：">
                <span>{{ scope.row.ficti | filterEmpty }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="product_id" label="ID" min-width="50" />
        <el-table-column label="商户名称" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.merchant ? scope.row.merchant.mer_name : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mer_name" label="商户类别" min-width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.merchant" class="spBlock">{{ scope.row.merchant.is_trader ? '自营' : '非自营' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品图" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image
                style="width: 36px; height: 36px"
                :src="scope.row.image"
                :preview-src-list="[scope.row.image]"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="store_name" label="活动标题" min-width="180" />
        <el-table-column prop="price" label="商品售价" min-width="90" />
        <el-table-column prop="sales" label="销量" min-width="90" />
        <el-table-column label="推荐级别"  min-width="150">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.star+'星推荐' }} </span> -->
            <el-rate
            disabled
            v-model="scope.row.star"
            :colors="colors">
           </el-rate>
          </template>
        </el-table-column>
         <el-table-column label="限量剩余" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.stock }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rank" label="排序" min-width="70" />
        <el-table-column prop="status" label="是否显示" min-width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_used"
              :active-value="1"
              :inactive-value="0"
              active-text="显示"
              inactive-text="隐藏"
              @change="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="商品状态" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.us_status | productStatusFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="标签" min-width="90">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.sys_labels" :key="index" class="label-list">{{ item.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="秒杀状态" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.seckill_status | seckillStatusFilter }}</span>
          </template>
        </el-table-column>
         <el-table-column label="秒杀活动日期" min-width="160">
          <template slot-scope="scope">
            <div>开始日期：{{ scope.row.seckillActive && scope.row.seckillActive.start_day ? scope.row.seckillActive.start_day.slice(0,10) : "" }}</div>
            <div>结束日期：{{ scope.row.seckillActive && scope.row.seckillActive.end_day ? scope.row.seckillActive.end_day.slice(0,10) : "" }}</div>
          </template>
        </el-table-column>
        <el-table-column label="秒杀活动时间" min-width="130">
          <template slot-scope="scope">
            <div>开始时间：{{ scope.row.seckillActive && scope.row.seckillActive.start_time ? scope.row.seckillActive.start_time+':00' : "" }}</div>
            <div>结束时间：{{ scope.row.seckillActive && scope.row.seckillActive.end_time ? scope.row.seckillActive.end_time+':00' : "" }}</div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="Number(tableFrom.type) < 7"
          key="8"
          label="操作"
          min-width="100"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              v-if="Number(tableFrom.type) < 7"
              type="text"
              size="small"
              @click="onEdit(scope.row.product_id)"
            >编辑</el-button>
            <el-button type="text" size="small" @click="handlePreview(scope.row.product_id)">预览</el-button>
            <el-button type="text" size="small" @click="onEditLabel(scope.row)">编辑标签</el-button>
            <el-button
              v-if="tableFrom.type === '6'"
              type="text"
              size="small"
              @click="toExamine(scope.row.product_id)"
            >审核</el-button>
            <el-button v-if="Number(tableFrom.type) < 3" type="text"
              size="small"
              @click="toOff([scope.row.product_id])"
            >强制下架</el-button>
           <el-button type="text" size="small" class="mr10" @click="goDetail(scope.row.product_id)">详情</el-button>
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
    <info-from ref="infoFrom" :is-show="isShow" :ids="OffId" @subSuccess="subSuccess" />
    <el-dialog
      title="商品编辑"
      :visible.sync="dialogVisible"
      width="1000px"
      :before-close="handleClose"
    >
      <el-form
        ref="formValidate"
        v-loading="fullscreenLoading"
        class="formValidate mt20"
        :rules="ruleValidate"
        :model="formValidate"
        label-width="120px"
        @submit.native.prevent
      >
        <el-form-item label="商品名称：" prop="store_name">
          <el-input v-model="formValidate.store_name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="活动列表推荐：">
           <el-rate class="rate_star"
            v-model="formValidate.star"
            :colors="colors" style="margin-top: 4px;">
           </el-rate>
           <span style="margin-top: 4px; font-size: 12px;">备注：5星为最高推荐级别，1星为最低推荐级别，设置后会在商城商品列表、搜索商品列表中体现。</span>
        </el-form-item>
        <!-- <el-form-item label="商品推荐：">
          <el-checkbox-group v-model="checkboxGroup" size="small" @change="onChangeGroup">
            <el-checkbox
              v-for="(item, index) in recommend"
              :key="index"
              :label="item.value"
            >{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
        <el-form-item label="排序：">
          <el-input-number v-model="formValidate.rank"  label="排序" />
        </el-form-item>
        <el-col :span="24">
          <el-form-item label="商品详情：">
            <ueditor-from v-model="formValidate.content" :content="formValidate.content" />
          </el-form-item>
        </el-col>
        <el-form-item style="margin-top:30px;">
          <el-button
            type="primary"
            class="submission"
            size="small"
            @click="handleSubmit('formValidate')"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
     <el-dialog title="秒杀商品详情" center :visible.sync="detailDialog" width="700px" v-if="detailDialog">
      <div v-loading="loading" style="margin-top: 5px;">
        <div class="box-container">
          <div class="title">基本信息</div>
          <div class="acea-row">
            <div class="list sp"><label class="name">商户名称：</label>{{ detailFormValidate.merchant && detailFormValidate.merchant.mer_name }}</div>
            <div class="list sp"><label class="name">商户类别：</label>{{ (detailFormValidate.merchant && detailFormValidate.merchant.is_trader) === 1 ? '自营' : '非自营' }}</div>
            <div class="list sp"><label class="name">商品ID：</label>{{ detailFormValidate.product_id }}</div>
            <div class="list sp"><label class="name">商品名称：</label>{{ detailFormValidate.store_name }}</div>
            <div class="list sp100 image">
                <label class="name">商品图：</label>
                <img
                style="max-width: 150px; height: 80px;"
                :src="detailFormValidate.image"
                />
            </div>
            <div class="list sp100">
              <label class="name">商品信息</label>
              <!-- 单规格表格-->
              <div v-if="detailFormValidate.spec_type === 0">
                <el-table :data="OneattrValue" border class="tabNumWidth" size="mini">
                  <el-table-column align="center" label="秒杀价格" min-width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row['price'] }}</span>
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
                v-if="detailFormValidate.spec_type === 1"
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
                  <el-table-column align="center" label="秒杀价格" min-width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row['price'] }}</span>
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
          <div class="title" style="margin-top: 20px;">秒杀商品活动信息</div>
          <div class="acea-row">
            <div class="list sp100"><label class="name">秒杀简介：</label>{{ detailFormValidate.store_info }}</div>
            <div class="list sp100"><label class="name">秒杀活动日期：</label>{{ detailFormValidate.start_day + '-' + detailFormValidate.end_day }}</div>
            <div class="list sp100"><label class="name">秒杀活动时间：</label>{{ detailFormValidate.start_time + '-' + detailFormValidate.end_time }}</div>
            <div class="list sp100"><label class="name">活动日期内最多购买次数：</label>{{ detailFormValidate.all_pay_count }}</div>
            <div class="list sp100"><label class="name">秒杀时间段内最多购买次数：</label>{{ detailFormValidate.once_pay_count }}</div>
            <div class="list sp"><label class="name">审核状态：</label>{{ detailFormValidate.status === 1 ? '审核通过' : detailFormValidate.status === 0 ? '未审核' : '审核未通过' }}</div>
            <div class="list sp"><label class="name">商品状态：</label>{{ detailFormValidate.us_status === 1 ? '上架显示' : detailFormValidate.us_status === -1 ? '平台关闭' : '下架' }}</div>
            <div class="list sp"><label class="name">秒杀活动状态：</label>{{ detailFormValidate.seckill_status === 0 ? '未开始' : detailFormValidate.seckill_status === 1 ? '正在进行' : '已结束' }}</div>
            <div class="list sp"><label class="name">创建时间：</label>{{ detailFormValidate.create_time }}</div>
          </div>

        </div>
       
      </div>
    </el-dialog>
     <!--预览商品-->
    <div v-if="previewVisible">
        <div class="bg" @click.stop="previewVisible = false" />
        <preview-box v-if="previewVisible" ref="previewBox" :goods-id="goodsId" :product-type="1" :preview-key="previewKey" />
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
  seckillChangeApi,
  seckillProductLstApi,
  seckillProductDetailApi,
  categoryListApi,
  seckillProductUpdateApi,
  seckillLstFilterApi,
  seckillMerSelectApi,
  seckillProductOffApi,
  getProductLabelApi,
  updatetSeckillLabel
} from '@/api/product'
import {
  seckillDetailApi
} from "@/api/marketing";
import { roterPre } from '@/settings'
import infoFrom from './info'
import previewBox from '@/components/previewBox/index'
import ueditorFrom from '@/components/ueditorFrom'
const defaultObj = {
  product_id: "",
  image: "",
  slider_image: [],
  store_name: "",
  store_info: "",
  start_day: "",
  end_day: "",
  start_time: "",
  end_time: "",
  start_day: "",
  end_day: "",
  is_open_recommend: 1,
  is_open_state: 1,
  is_show: 1,
  seckill_status: "",
  keyword: "",
  brand_id: "", // 品牌id
  cate_id: "", // 平台分类id
  mer_cate_id: [], // 商户分类id
  unit_name: "",
  integral: 0,
  sort: 0,
  is_good: 0,
  temp_id: "",
  seckill_date: "",
  finalPayment_date: "",
  delivery_type: 1,
  delivery_day: 10,
  create_time: '',
  attrValue: [
    {
      image: "",
      price: null,
      price: null,
      cost: null,
      ot_price: null,
      old_stock: null,
      stock: null,
      bar_code: "",
      weight: null,
      volume: null,
    },
  ],
  attr: [],
  extension_type: 0,
  content: "",
  spec_type: 0,
  is_gift_bag: 0,
  tattend_two: {},
  tattend_one: {}
};

export default {
  name: 'ProductExamine1',
  components: { infoFrom, ueditorFrom, previewBox },
  data() {
    return {
      ruleValidate: {},
      dialogVisible: false,
      detailDialog: false,
      checkboxGroup: [],
      formValidate: {
        is_hot: 0,
        is_best: 0,
        is_new: 0,
        is_benefit: 0,
        ficti: 1,
        content: '',
        store_name: ''
      },
      detailFormValidate: Object.assign({}, defaultObj),
      OneattrValue: [Object.assign({}, defaultObj.attrValue[0])], // 单规格
      ManyAttrValue: [Object.assign({}, defaultObj.attrValue[0])], // 多规格
      attrInfo: {},
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
       seckillStatusList: [
        { label: "正在进行", value: 2 },
        { label: "活动已结束", value: 3 },
        { label: "活动未开始", value: 1 },
      ],
      productStatusList: [
        { label: "上架显示", value: 1 },
        { label: "下架", value: 0 },
        { label: "平台关闭", value: -1 },
      ],
      recommendedLevelStatus: [
        { label: "全部", value: "" },
        { label: "5星", value: 5 },
        { label: "4星", value: 4 },
        { label: "3星", value: 3 },
        { label: "2星", value: 2 },
        { label: "1星", value: 1 }
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
        store_name: '',
        type: '6',
        mer_id: '',
        seckill_status: "",
        sys_labels: "",
        keyword: '',
        is_trader: '',
        us_status: "",
        star: "",
        product_id: this.$route.query.id ? this.$route.query.id : ""
      },
      product_id: '',
      categoryList: [],
      merCateList: [],
      multipleSelection: [],
      headeNum: [],
      merSelect: [],
      OffId: [],
      productId: 0,
      previewVisible: false,
      goodsId: '',
      previewKey: '',
      labelList: [],
      dialogLabel: false,
      labelForm: {}
    }
  },
  mounted() {
    this.getMerSelect()
    this.getList('')
    this.getLabelLst()
    this.getCategorySelect()
    this.getLstFilterApi()
  },
  methods: {
    subSuccess() {
      this.getList('')
      this.getLstFilterApi()
    },
    onchangeIsShow(row) {
      seckillChangeApi(row.product_id, row.is_used)
        .then(({ message }) => {
          this.$message.success(message)
          this.getList('')
        })
        .catch(({ message }) => {
          this.$message.error(message)
        })
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
    getInfo(id) {
      this.fullscreenLoading = true
      this.checkboxGroup = [];
      seckillProductDetailApi(id)
        .then((res) => {
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
            star: info.star ? info.star : 1
          }
          if (info.is_hot === 1) this.checkboxGroup.push('is_hot')
          if (info.is_benefit === 1) this.checkboxGroup.push('is_benefit')
          if (info.is_best === 1) this.checkboxGroup.push('is_best')
          if (info.is_new === 1) this.checkboxGroup.push('is_new')
          this.fullscreenLoading = false
        })
        .catch((res) => {
          this.$message.error(res.message)
          this.fullscreenLoading = false
        })
    },
    onEdit(id) {
      this.productId = id
      this.getInfo(id)
      this.dialogVisible = true
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
          updatetSeckillLabel(this.product_id, this.labelForm).then(({ message }) => {
            this.$message.success(message)
            this.getList('')
            this.dialogLabel = false
          })
        } else {
          return
        }
      })
    },
    // 提交
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          seckillProductUpdateApi(this.productId, this.formValidate)
            .then(async(res) => {
              this.fullscreenLoading = false
              this.$message.success(res.message)
              this.dialogVisible = false
              this.getList('')
            })
            .catch((res) => {
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
    handleClose() {
      this.dialogVisible = false
      this.dialogLabel = false
    },
     watCh(val) {
      const tmp = {};
      const tmpTab = {};
      this.detailFormValidate.attr.forEach((o, i) => {
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
      // this.formThead = Object.assign({}, this.formThead, tmp);
      // console.log(this.formThead)
    },
    // 预览
    handlePreview(id) {
        this.previewVisible = true
        this.goodsId = id
        this.previewKey = ''
    },
    // 查看详情
    goDetail(id){
      this.detailDialog = true;
      this.loading = true;
      this.detailFormValidate = {}
      seckillDetailApi(id).then(async (res) => {
        this.loading = false;
        let info = res.data;
        this.detailFormValidate = {
          product_id: info.product_id,
          image: info.image,
          slider_image: info.slider_image,
          store_name: info.store_name,
          store_info: info.store_info,
          start_time: info.seckillActive && info.seckillActive.start_time
            ? info.seckillActive.start_time+':00:00'
            : "",
          end_time: info.seckillActive && info.seckillActive.end_time
            ? info.seckillActive.end_time+':00:00'
            : "",
          start_day: info.seckillActive && info.seckillActive.start_day
            ? (info.seckillActive.start_day).slice(0,10)
            : "",
          end_day: info.seckillActive && info.seckillActive.end_day
            ? (info.seckillActive.end_day).slice(0,10)
            : "",
          brand_id: info.brand_id, // 品牌id
          cate_id: info.cate_id ? info.cate_id : '', // 平台分类id
          mer_cate_id: info.mer_cate_id, // 商户分类id
          unit_name: info.unit_name,
          sort: info.sort,
          is_good: info.is_good,
          temp_id: info.temp_id,
          is_show: info.is_show,
          attr: info.attr,
          extension_type: info.extension_type,
          content: info.content,
          spec_type: info.spec_type,
          is_gift_bag: info.is_gift_bag,
          create_time: info.create_time,
          product_status: info.product_status,
          status: info.status,
          all_pay_count: info.seckillActive ?  info.seckillActive.all_pay_count : "",
          once_pay_count: info.seckillActive ?  info.seckillActive.once_pay_count : "",
          stock: info.stock,
          stock_count: info.stock_count,
          seckill_status: info.seckill_status,
          us_status: info.us_status,
          merchant: info.merchant
        };
        if (this.detailFormValidate.spec_type === 0) {
          this.OneattrValue = info.attrValue;
        } else {
          this.ManyAttrValue = info.attrValue
          this.watCh(this.detailFormValidate.attr)
        }
        console.log(this.ManyAttrValue);
        this.fullscreenLoading = false;
        this.detailFormValidate.seckill_date = [
          info.start_time,
          info.end_time,
        ];

      })
        .catch((res) => {
          this.fullscreenLoading = false;
          this.$message.error(res.message);
        })
    },
    // 批量下架
    batchOff() {
      if (this.multipleSelection.length === 0) { return this.$message.warning('请先选择商品') }
      this.toOff(this.OffId)
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
          if (!value) {
            return '请输入强制下架原因'
          }
        }
      })
        .then(({ value }) => {
          seckillProductOffApi({ id: id, status: -2, refusal: value })
            .then((res) => {
              this.$message({
                type: 'success',
                message: '提交成功'
              })
              this.getLstFilterApi()
              this.getList('')
            })
            .catch((res) => {
              this.$message.error(res.message)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    // 列表表头；
    getLstFilterApi() {
      seckillLstFilterApi()
        .then((res) => {
          this.headeNum = res.data
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    // 商户列表；
    getMerSelect() {
      seckillMerSelectApi()
        .then((res) => {
          this.merSelect = res.data
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    batch() {
      if (this.multipleSelection.length === 0) { return this.$message.warning('请先选择商品') }
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
      categoryListApi()
        .then((res) => {
          this.merCateList = res.data
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page;
      seckillProductLstApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.listLoading = false
        })
        .catch((res) => {
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
      this.getList(1)
    }
  }
}
</script>
<style lang="scss">
.contentPic img{
  max-width: 100%;
}
</style>
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
.rate_star{
    position: relative; top: 5px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand {
  /deep/ label {
    width: 77px;
    color: #99a9bf;
  }
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 33.33%;
}
.selWidth {
  width: 350px !important;
}
.seachTiele {
  line-height: 35px;
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
  max-height: 280px;
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
