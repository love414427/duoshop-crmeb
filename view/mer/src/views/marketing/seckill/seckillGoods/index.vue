<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-tabs v-model="tableFrom.type" @tab-click="getList(1),getLstFilterApi">
          <el-tab-pane
            v-for="(item,index) in headeNum"
            :key="index"
            :name="item.type.toString()"
            :label="item.name +'('+item.count +')' "
          />
        </el-tabs>
        <div class="container">
          <el-form size="small" label-width="120px" :inline="true">
            <el-form-item label="秒杀状态：">
              <el-select
                v-model="tableFrom.seckill_status"
                placeholder="请选择"
                class="filter-item selWidth mr20"
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
                class="filter-item selWidth mr20"
                clearable
                @change="getList(1)"
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
              <el-select
                v-model="tableFrom.mer_labels"
                placeholder="请选择"
                class="filter-item selWidth mr20"
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
            <el-form-item label="关键字搜索：">
              <el-input v-model="tableFrom.keyword" placeholder="请输入商品名称，关键字，产品编号" class="selWidth" @keyup.enter.native="getList(1)">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <router-link :to=" { path:`${roterPre}` + '/marketing/seckill/createGoods' } ">
          <el-button size="small" type="primary">
            <i class="add">+</i> 添加秒杀商品
          </el-button>
        </router-link>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini" :row-class-name="tableRowClassName" @rowclick.stop="closeEdit">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand demo-table-expand1">
              <el-form-item label="平台分类：">
                <span>{{ props.row.storeCategory?props.row.storeCategory.cate_name:'-' }}</span>
              </el-form-item>
              <el-form-item label="商品分类：">
                <template v-if="props.row.merCateId.length">
                  <span
                    v-for="(item, index) in props.row.merCateId"
                    :key="index"
                    class="mr10"
                  >{{ item.category.cate_name }}</span>
                </template>
                <span v-else>-</span>
              </el-form-item>
              <el-form-item label="品牌：">
                <span class="mr10">{{ props.row.brand?props.row.brand.brand_name:'-' }}</span>
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
                <span>{{ props.row.care_count | filterEmpty }}</span>
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
        <el-table-column prop="store_name" label="活动标题" min-width="120" />
        <el-table-column prop="store_info" label="商品简介" min-width="120" />
        <el-table-column prop="price" label="秒杀价" min-width="90" />
        <el-table-column label="限量剩余" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.stock - scope.row.sales }}</span>
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
        <el-table-column prop="status" label="上/下架" min-width="80">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_show"
              :active-value="1"
              :inactive-value="0"
              active-text="上架"
              inactive-text="下架"
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
            <div v-for="(item,index) in scope.row.mer_labels" :key="index" class="label-list">{{ item.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="sort" align="center" label="排序" min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.index === tabClickIndex">
              <el-input v-model.number="scope.row['sort']" type="number" maxlength="300" size="mini" autofocus @blur="inputBlur(scope)" />
            </span>
            <span v-else @dblclick.stop="tabClick(scope.row)">{{ scope.row['sort'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" min-width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.status | seckillReviewStatusFilter }}</span>
            <span v-if="scope.row.status == -1 || scope.row.status == -2" style="font-size: 12px;">
              <br>
              原因：{{ scope.row.refusal }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <router-link :to="{path: roterPre + '/marketing/seckill/createGoods/' + scope.row.product_id}">
              <el-button type="text" size="small" class="mr10">编辑</el-button>
            </router-link>
            <el-button v-if="tableFrom.type !== '5'" type="text" size="small" @click="handlePreview(scope.row.product_id)">预览</el-button>
            <el-button v-if="tableFrom.type !== '5'" type="text" size="small" @click="onEditLabel(scope.row)">编辑标签</el-button>
            <el-button type="text" size="small" class="mr10" @click="goDetail(scope.row.product_id)">详情</el-button>
            <el-button
              v-if="tableFrom.type === '5'"
              type="text"
              size="small"
              @click="handleRestore(scope.row.product_id)"
            >恢复商品</el-button>
            <el-button
              v-if="tableFrom.type!== '1' && tableFrom.type!== '3' && tableFrom.type !=='4' "
              type="text"
              size="small"
              @click="handleDelete(scope.row.product_id, scope.$index)"
            >{{ tableFrom.type === '5' ? '删除' : '加入回收站' }}</el-button>
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
    <el-dialog v-if="dialogVisible" title="秒杀商品详情" center :visible.sync="dialogVisible" width="700px">
      <div v-loading="loading" style="margin-top: 5px;">
        <div class="box-container">
          <div class="title">基本信息</div>
          <div class="acea-row">
            <div class="list sp"><label class="name">商品ID：</label>{{ formValidate.product_id }}</div>
            <div class="list sp"><label class="name">商品名称：</label><span>{{ formValidate.store_name }}</span></div>
            <div class="list sp100 image">
              <label class="name">商品图：</label>
              <img
                style="max-width: 150px; height: 80px;"
                :src="formValidate.image"
              >
            </div>
            <div class="list sp100">
              <label class="name">商品信息</label>
              <!-- 单规格表格-->
              <div v-if="formValidate.spec_type === 0">
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
            </div>
          </div>
          <div class="title" style="margin-top: 20px;">秒杀商品活动信息</div>
          <div class="acea-row">
            <div class="list sp100"><label class="name">秒杀简介：</label>{{ formValidate.store_info }}</div>
            <div class="list sp100"><label class="name">秒杀活动日期：</label>{{ formValidate.start_day + '-' + formValidate.end_day }}</div>
            <div class="list sp100"><label class="name">秒杀活动时间：</label>{{ formValidate.start_time + '-' + formValidate.end_time }}</div>
            <div class="list sp100"><label class="name">活动日期内最多购买次数：</label>{{ formValidate.all_pay_count }}</div>
            <div class="list sp100"><label class="name">秒杀时间段内最多购买次数：</label>{{ formValidate.once_pay_count }}</div>
            <div class="list sp"><label class="name">审核状态：</label>{{ formValidate.status === 1 ? '审核通过' : formValidate.status === 0 ? '未审核' : '审核未通过' }}</div>
            <div class="list sp"><label class="name">商品状态：</label>{{ formValidate.us_status === 1 ? '上架显示' : formValidate.us_status === -1 ? '平台关闭' : '下架' }}</div>
            <div class="list sp"><label class="name">秒杀活动状态：</label>{{ formValidate.seckill_status === 0 ? '未开始' : formValidate.seckill_status === 1 ? '正在进行' : '已结束' }}</div>
            <div class="list sp"><label class="name">创建时间：</label>{{ formValidate.create_time }}</div>
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
  seckillProductLstApi,
  spikeProductDeleteApi,
  categorySelectApi,
  spikelstFilterApi,
  spikeStatusApi,
  categoryListApi,
  spikeDestoryApi,
  spikeRestoreApi,
  updatetSeckillLabel,
  getProductLabelApi
} from '@/api/product'
import {
  seckillProSort, seckillDetailApi
} from '@/api/marketing'
import previewBox from '@/components/previewBox/index'
import { roterPre } from '@/settings'
const defaultObj = {
  product_id: '',
  image: '',
  slider_image: [],
  store_name: '',
  store_info: '',
  start_day: '',
  end_day: '',
  start_time: '',
  end_time: '',
  is_open_recommend: 1,
  is_open_state: 1,
  is_show: 1,
  seckill_status: '',
  keyword: '',
  brand_id: '', // 品牌id
  cate_id: '', // 平台分类id
  mer_cate_id: [], // 商户分类id
  unit_name: '',
  integral: 0,
  sort: 0,
  is_good: 0,
  temp_id: '',
  seckill_date: '',
  finalPayment_date: '',
  delivery_type: 1,
  delivery_day: 10,
  create_time: '',
  attrValue: [
    {
      image: '',
      price: null,
      cost: null,
      ot_price: null,
      old_stock: null,
      stock: null,
      bar_code: '',
      weight: null,
      volume: null
    }
  ],
  attr: [],
  extension_type: 0,
  content: '',
  spec_type: 0,
  is_gift_bag: 0,
  tattend_two: {},
  tattend_one: {}
}
export default {
  name: 'ProductList',
  components: { previewBox },
  data() {
    return {
      props: {
        emitPath: false
      },
      roterPre: roterPre,
      headeNum: [],
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },
      seckillStatusList: [
        { label: '正在进行', value: 2 },
        { label: '活动已结束', value: 3 },
        { label: '活动未开始', value: 1 }
      ],
      productStatusList: [
        { label: '上架显示', value: 1 },
        { label: '下架', value: 0 },
        { label: '平台关闭', value: -1 }
      ],
      labelList: [],
      tableFrom: {
        page: 1,
        limit: 20,
        mer_cate_id: '',
        cate_id: '',
        mer_labels: '',
        keyword: '',
        type: this.$route.query.type ? this.$route.query.type : '1',
        seckill_status: '',
        us_status: '',
        product_id: this.$route.query.id ? this.$route.query.id : ''
      },
      categoryList: [], // 平台
      merCateList: [], // 商户分类筛选
      modals: false,
      dialogVisible: false,
      manyTabTit: {},
      manyTabDate: {},
      formValidate: Object.assign({}, defaultObj),
      OneattrValue: [Object.assign({}, defaultObj.attrValue[0])], // 单规格
      ManyAttrValue: [Object.assign({}, defaultObj.attrValue[0])], // 多规格
      attrInfo: {},
      tabClickIndex: '',
      previewVisible: false,
      goodsId: '',
      previewKey: '',
      dialogLabel: false,
      labelForm: {}
    }
  },
  mounted() {
    this.getLstFilterApi()
    this.getCategorySelect()
    this.getCategoryList()
    this.getLabelLst()
    this.getList('')
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
      if (!scope.row.sort || scope.row.sort < 0)scope.row.sort = 0
      seckillProSort(scope.row.product_id, { sort: scope.row.sort })
        .then((res) => {
          this.closeEdit()
        })
        .catch((res) => {
        })
    },
    closeEdit() {
      this.tabClickIndex = null
    },
    handleClose() {
      this.dialogLabel = false
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
    handleRestore(id) {
      this.$modalSure('恢复商品').then(() => {
        spikeRestoreApi(id)
          .then((res) => {
            this.$message.success(res.message)
            this.getLstFilterApi()
            this.getList('')
          })
          .catch((res) => {
            this.$message.error(res.message)
          })
      })
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
    // 平台分类；
    getCategoryList() {
      categoryListApi()
        .then((res) => {
          this.categoryList = res.data
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    // 列表表头；
    getLstFilterApi() {
      spikelstFilterApi()
        .then((res) => {
          this.headeNum = res.data
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
      this.ManyAttrValue.forEach((val, index) => {
        const key = Object.values(val.detail).sort().join('/')
        if (this.attrInfo[key]) this.ManyAttrValue[index] = this.attrInfo[key]
      })
      this.attrInfo = {}
      this.ManyAttrValue.forEach((val) => {
        this.attrInfo[Object.values(val.detail).sort().join('/')] = val
      })
      this.manyTabTit = tmp
      this.manyTabDate = tmpTab
      // this.formThead = Object.assign({}, this.formThead, tmp);
    },
    // 查看详情
    goDetail(id) {
      this.dialogVisible = true
      this.loading = true
      this.formValidate = {}
      seckillDetailApi(id).then(async(res) => {
        this.loading = false
        const info = res.data
        this.formValidate = {
          product_id: info.product_id,
          image: info.image,
          slider_image: info.slider_image,
          store_name: info.store_name,
          store_info: info.store_info,
          start_time: info.seckillActive && info.seckillActive.start_time
            ? info.seckillActive.start_time + ':00:00'
            : '',
          end_time: info.seckillActive && info.seckillActive.end_time
            ? info.seckillActive.end_time + ':00:00'
            : '',
          start_day: info.seckillActive && info.seckillActive.start_day
            ? (info.seckillActive.start_day).slice(0, 10)
            : '',
          end_day: info.seckillActive && info.seckillActive.end_day
            ? (info.seckillActive.end_day).slice(0, 10)
            : '',
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
          all_pay_count: info.seckillActive ? info.seckillActive.all_pay_count : '',
          once_pay_count: info.seckillActive ? info.seckillActive.once_pay_count : '',
          stock: info.stock,
          stock_count: info.stock_count,
          seckill_status: info.seckill_status,
          us_status: info.us_status
        }
        if (this.formValidate.spec_type === 0) {
          this.OneattrValue = info.attrValue
        } else {
          this.ManyAttrValue = info.attrValue
          this.watCh(this.formValidate.attr)
        }
        console.log(this.ManyAttrValue)
        this.fullscreenLoading = false
        this.formValidate.seckill_date = [
          info.start_time,
          info.end_time
        ]
      })
        .catch((res) => {
          this.fullscreenLoading = false
          this.$message.error(res.message)
        })
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
    // 预览
    handlePreview(id) {
      this.previewVisible = true
      this.goodsId = id
      this.previewKey = ''
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num || this.tableFrom.page
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
      this.getList('')
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure(this.tableFrom.type !== '5' ? '加入回收站' : '删除该商品').then(
        () => {
          this.tableFrom.type === '5'
            ? spikeDestoryApi(id)
              .then(({ message }) => {
                this.$message.success(message)
                this.getList('')
                this.getLstFilterApi()
              })
              .catch(({ message }) => {
                this.$message.error(message)
              })
            : spikeProductDeleteApi(id)
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
    onchangeIsShow(row) {
      spikeStatusApi(row.product_id, row.is_show)
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
.goods_detail .goods_detail_wrapper{
    z-index: -10
}
/deep/ table .el-input__inner{padding: 0;}
.add {
  font-style: normal;
  position: relative;
  top: -1.2px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand1 {
  /deep/ label {
    width: 77px !important;
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
