<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="120px" inline>
            <el-form-item label="状态：" style="display: block;">
              <el-radio-group
                v-model="tableFrom.product_status"
                type="button"
                class="mr20"
                size="small"
                clearable
                @change="getList(1)"
              >
                <el-radio-button
                  v-for="(item,i) in fromList.fromTxt"
                  :key="i"
                  :label="item.val"
                >{{ item.text }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="拼团状态：">
              <el-select
                v-model="tableFrom.active_type"
                placeholder="请选择"
                class="filter-item selWidth mr20"
                clearable
                @change="getList(1)"
              >
                <el-option
                  v-for="item in activityStatusList"
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
            <el-form-item label="商品搜索：">
              <el-input v-model="tableFrom.keyword" placeholder="请输入商品名称" class="selWidth" @keyup.enter.native="getList(1)">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <router-link :to=" { path:`${roterPre}` + '/marketing/combination/create' } ">
          <el-button size="small" type="primary">
            <i class="add">+</i> 添加拼团商品
          </el-button>
        </router-link>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini" :row-class-name="tableRowClassName" @rowclick.stop="closeEdit">
        <el-table-column prop="product_group_id" label="ID" min-width="50" />
        <el-table-column label="拼团商品图片" min-width="100">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image :src="scope.row.product.image" :preview-src-list="[scope.row.product.image]" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="product.store_name" label="拼团商品" min-width="120" />
        <el-table-column prop="product.price" label="市场价" min-width="90" />
        <el-table-column prop="price" label="拼团价" min-width="80" />
        <el-table-column prop="buying_count_num" label="拼团人数" min-width="80" align="center" />
        <el-table-column prop="success_num" label="成团数量" min-width="90" align="center" />
        <el-table-column prop="sales" label="已售商品数" min-width="90" />
        <el-table-column label="拼团活动状态" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.action_status === 0 ? '未开始' : scope.row.action_status === 1 ? '正在进行' : '已结束' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动时间" min-width="220">
          <template slot-scope="scope">
            <div>开始时间：{{ scope.row.start_time && scope.row.start_time ? scope.row.start_time : "" }}</div>
            <div>结束时间：{{ scope.row.end_time && scope.row.end_time ? scope.row.end_time : "" }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="stock" label="限量剩余" align="center" min-width="80" />
        <el-table-column prop="product.sort" align="center" label="排序" min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.index === tabClickIndex">
              <el-input v-model.number="scope.row['product']['sort']" type="number" maxlength="300" size="mini" autofocus @blur="inputBlur(scope)" />
            </span>
            <span v-else @dblclick.stop="tabClick(scope.row)">{{ scope.row['product']['sort'] }}</span>
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
        <el-table-column label="审核状态" min-width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.product_status === 0 ? "待审核" : scope.row.product_status === 1 ? "审核通过" : "审核失败" }}</span>
            <span v-if="scope.row.product_status === -1 || scope.row.product_status === -2" style="font-size: 12px;">
              <br>
              原因：{{ scope.row.refusal }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <router-link
              :to="{path: roterPre + '/marketing/combination/create/' + scope.row.product_group_id}"
            >
              <el-button type="text" size="small" class="mr10">编辑</el-button>
            </router-link>
            <el-button type="text" size="small" @click="handlePreview(scope.row.product_group_id)">预览</el-button>
            <el-button type="text" size="small" @click="onEditLabel(scope.row)">编辑标签</el-button>
            <el-button type="text" size="small" class="mr10" @click="goDetail(scope.row.product_group_id)">详情</el-button>
            <el-button v-if="scope.row.product.action_status !== 1" type="text" size="small" class="mr10" @click="handleDelete(scope.row,scope.$index)">删除</el-button>
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
    <el-dialog v-if="dialogVisible" title="拼团商品详情" center :visible.sync="dialogVisible" width="700px">
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
                  <el-table-column align="center" label="拼团价格" min-width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row['active_price'] }}</span>
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
                >
                  <template v-if="manyTabDate">
                    <el-table-column v-for="(item,iii) in manyTabDate" :key="iii" align="center" :label="manyTabTit[iii].title" min-width="80">
                      <template slot-scope="scope">
                        <span class="priceBox" v-text="scope.row[iii]" />
                      </template>
                    </el-table-column>
                  </template>
                  <el-table-column align="center" label="拼团价格" min-width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row['active_price'] }}</span>
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
          <div class="title" style="margin-top: 20px;">拼团商品活动信息</div>
          <div class="acea-row">
            <div class="list sp100"><label class="name">拼团活动简介：</label>{{ formValidate.store_info }}</div>
            <div class="list sp100"><label class="name">拼团活动日期：</label>{{ formValidate.start_time + '-' + formValidate.end_time }}</div>
            <!-- <div class="list sp"><label class="name">拼团价：</label>{{ formValidate.price }}元</div>
            <div class="list sp"><label class="name">已售商品数量：</label>{{ formValidate.sales }}</div> -->
            <div class="list sp"><label class="name">拼团人数：</label>{{ formValidate.buying_count_num }}人</div>
            <div class="list sp"><label class="name">成团数量：</label>{{ formValidate.success_num }}个</div>
            <div class="list sp"><label class="name">活动期间限购件数：</label>{{ formValidate.pay_count }}</div>
            <div class="list sp"><label class="name">限量：</label>{{ formValidate.stock_count }}</div>
            <div class="list sp"><label class="name">单次购买限购件数：</label>{{ formValidate.once_pay_count }}</div>
            <div class="list sp"><label class="name">拼团活动状态：</label>{{ formValidate.action_status === 0 ? '未开始' : formValidate.action_status === 1 ? '正在进行' : '已结束' }}</div>
            <div class="list sp"><label class="name">拼团成功人次/参与人次：</label>{{ formValidate.count_user + '/' + formValidate.count_take }}</div>
            <div class="list sp"><label class="name">创建时间：</label>{{ formValidate.create_time }}</div>
            <div class="list sp"><label class="name">审核状态：</label>{{ formValidate.product_status === 1 ? '审核通过' : formValidate.product_status === 0 ? '未审核' : '审核未通过 原因：'+formValidate.refusal }}</div>
            <div class="list sp"><label class="name">显示状态：</label>{{ formValidate.is_show === 1 ? "显示" : "隐藏" }}</div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--预览商品-->
    <div v-if="previewVisible">
      <div class="bg" @click.stop="previewVisible = false" />
      <preview-box v-if="previewVisible" ref="previewBox" :goods-id="goodsId" :product-type="4" :preview-key="previewKey" />
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
  combinationStatusApi,
  combinationProLst,
  combinationProDetailApi,
  combinationProDeleteApi,
  combinationProSort
} from '@/api/marketing'
import { updatetCombinationLabel, getProductLabelApi } from '@/api/product'
import previewBox from '@/components/previewBox/index'
import { roterPre } from '@/settings'

const defaultObj = {
  product_id: '',
  image: '',
  slider_image: [],
  store_name: '',
  store_info: '',
  time: '',
  ficti_num: 1,
  buying_count_num: 1,
  start_time: '',
  end_time: '',
  action_status: '',
  is_show: 1,
  keyword: '',
  brand_id: '', // 品牌id
  cate_id: '', // 平台分类id
  mer_cate_id: [], // 商户分类id
  unit_name: '',
  integral: 0,
  once_pay_count: '',
  pay_count: '',
  is_good: 0,
  temp_id: '',
  combination_date: '',
  create_time: '',
  attrValue: [
    {
      image: '',
      price: null,
      active_price: null,
      cost: null,
      ot_price: null,
      old_stock: null,
      stock: null,
      bar_code: '',
      weight: null,
      volume: null,
      sales: null
    }
  ],
  attr: [],
  content: '',
  spec_type: 0,
  // give_coupon_ids: [],
  is_gift_bag: 0,
  tattend_two: {},
  tattend_one: {}
  // couponData: [],
}
export default {
  name: 'ProductList',
  components: { previewBox },
  data() {
    return {
      previewVisible: false,
      goodsId: '',
      previewKey: '',
      props: {
        emitPath: false
      },
      roterPre: roterPre,
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },
      activityStatusList: [
        { label: '未开始', value: 0 },
        { label: '正在进行', value: 1 },
        { label: '已结束', value: -1 }
      ],
      productStatusList: [
        { label: '上架显示', value: 1 },
        { label: '下架', value: 0 },
        { label: '平台关闭', value: -1 }
      ],
      fromList: {
        custom: true,
        fromTxt: [
          { text: '全部', val: '' },
          { text: '待审核', val: '0' },
          { text: '已审核', val: '1' },
          { text: '审核失败', val: '-1' }
        ]
      },
      tableFrom: {
        page: 1,
        limit: 20,
        keyword: '',
        product_status: this.$route.query.status ? this.$route.query.status : '',
        active_type: '',
        type: '',
        us_status: '',
        mer_labels: '',
        product_group_id: this.$route.query.id ? this.$route.query.id : ''
      },
      product_group_id: this.$route.query.id ? this.$route.query.id : '',
      product_id: '',
      modals: false,
      dialogVisible: false,
      loading: true,
      manyTabTit: {},
      manyTabDate: {},
      formValidate: Object.assign({}, defaultObj),
      OneattrValue: [Object.assign({}, defaultObj.attrValue[0])], // 单规格
      ManyAttrValue: [Object.assign({}, defaultObj.attrValue[0])], // 多规格
      attrInfo: {},
      tabClickIndex: '',
      tabClickLabel: '',
      labelList: [],
      dialogLabel: false,
      labelForm: {}
    }
  },
  watch: {
    product_group_id(newName, oldName) {
      this.getList('')
    }
  },
  mounted() {
    this.getList('')
    this.getLabelLst()
  },
  methods: {
    // 把每一行的索引放进row
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex
    },
    // 添加明细原因 row 当前行 column 当前列
    tabClick(row) {
      this.tabClickIndex = row.index
      //   this.tabClickLabel = column.label;
    },
    // 失去焦点初始化
    inputBlur(scope) {
      if (!scope.row.product.sort || scope.row.product.sort < 0)scope.row.product.sort = 0
      combinationProSort(scope.row.product_group_id, { sort: scope.row.product.sort })
        .then((res) => {
          this.closeEdit()
        //   this.$message.success(res.message);
        })
        .catch((res) => {
        //  this.$message.error(res.message);
        })
    },
    closeEdit() {
      this.tabClickIndex = null
      // this.tabClickLabel = "";
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
    handleClose() {
      this.dialogLabel = false
      this.dialogLabel = false
    },
    // 编辑标签
    onEditLabel(row) {
      this.dialogLabel = true
      this.product_id = row.product_group_id
      if (row.mer_labels && row.mer_labels.length) {
        const arrNew = row.mer_labels.map(item => {
          return item.id
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
          updatetCombinationLabel(this.product_id, this.labelForm).then(({ message }) => {
            this.$message.success(message)
            this.getList('')
            this.dialogLabel = false
          })
        } else {
          return
        }
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
      this.formThead = Object.assign({}, this.formThead, tmp)
      // console.log(this.formThead)
    },
    // 查看详情
    goDetail(id) {
      this.dialogVisible = true
      this.loading = true
      this.formValidate = {}
      combinationProDetailApi(id).then(async(res) => {
        this.loading = false
        const info = res.data
        this.formValidate = {
          product_id: info.product.product_id,
          image: info.product.image,
          slider_image: info.product.slider_image,
          store_name: info.product.store_name,
          store_info: info.product.store_info,
          start_time: info.start_time
            ? info.start_time
            : '',
          end_time: info.end_time
            ? info.end_time
            : '',
          price: info.price,
          success_num: info.success_num,
          count_take: info.count_take,
          count_user: info.count_user,
          sales: info.product.sales,
          buying_count_num: info.buying_count_num,
          buying_num: info.buying_num ? info.buying_num : '',
          ficti_num: info.ficti_num,
          unit_name: info.product.unit_name,
          ficti_status: info.ficti_status,
          is_show: info.is_show,
          attr: info.product.attr,
          content: info.content,
          spec_type: info.product.spec_type,
          create_time: info.create_time,
          action_status: info.action_status,
          product_status: info.product_status,
          pay_count: info.pay_count,
          once_pay_count: info.once_pay_count,
          stock: info.stock,
          stock_count: info.stock_count,
          refusal: info.refusal
        }
        if (this.formValidate.spec_type === 0) {
          this.OneattrValue = info.product.attrValue
          this.OneattrValue[0].active_price = this.OneattrValue[0]._sku ? this.OneattrValue[0]._sku.active_price : 0
          this.OneattrValue[0].sales = this.OneattrValue[0]._sku ? this.OneattrValue[0]._sku.sales : 0
        } else {
          this.ManyAttrValue = []
          info.product.attrValue.forEach((val, i) => {
            // this.attrInfo[Object.values(val.detail).sort().join("/")] = val;
            if (val._sku) {
              this.$set(val, 'active_price', val._sku.active_price)
              this.$set(val, 'sales', val._sku.sales ? val._sku.sales : 0)
              this.ManyAttrValue.push(val)
            }
          })
          this.watCh(this.formValidate.attr)
        }
        console.log(this.ManyAttrValue)
        this.fullscreenLoading = false
      })
        .catch((res) => {
          this.fullscreenLoading = false
          this.$message.error(res.message)
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
      combinationProLst(this.tableFrom)
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
    handleDelete(item, idx) {
      item.status == 2
        ? this.$confirm('该拼团商品活动正在进行中，删除后不可恢复，您确认删除吗？', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '不删除',
          type: 'warning'
        }).then(() => {
          combinationProDeleteApi(item.product_group_id)
            .then(({ message }) => {
              this.$message.success(message)
              this.tableData.data.splice(idx, 1)
              this.getList()
            })
            .catch(({ message }) => {
              this.$message.error(message)
            })
        }).catch(action => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
        : this.$modalSureDelete().then(() => {
          combinationProDeleteApi(item.product_group_id)
            .then(({
              message
            }) => {
              this.$message.success(message)
              this.tableData.data.splice(idx, 1)
              this.getList()
            })
            .catch(({
              message
            }) => {
              this.$message.error(message)
            })
        })
    },
    onchangeIsShow(row) {
      combinationStatusApi(row.product_group_id, row.is_show)
        .then(({ message }) => {
          this.$message.success(message)
          this.getList('')
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
/deep/ .el-dialog__title{
  font-weight: bold;
}
.el-table .cell{
  white-space: pre-line;
}
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
.title{
  margin-bottom: 16px;
  color: #17233d;
  font-size: 14px;
  font-weight: bold;
  padding-bottom: 2px;
  border-bottom: 1px solid #dfe6ec;
}
.scollhide::-webkit-scrollbar {
  display: none; /* Chrome Safari */
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
</style>
