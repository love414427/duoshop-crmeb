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
                @change="getList('')"
              >
                <el-radio-button
                  v-for="(item,i) in fromList.fromTxt"
                  :key="i"
                  :label="item.val"
                >{{ item.text }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="商品搜索：">
              <el-input v-model="tableFrom.keyword" placeholder="请输入商品名称" class="selWidth" @keyup.enter.native="getList(1)">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
            <el-form-item label="助力活动状态：">
              <el-select
                v-model="tableFrom.type"
                placeholder="请选择"
                class="filter-item selWidth mr20"
                clearable
                @change="getList(1)"
              >
                <el-option
                  v-for="item in assistStatusList"
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
          </el-form>
        </div>
        <router-link :to=" { path:`${roterPre}` + '/marketing/assist/create' } ">
          <el-button size="small" type="primary">
            <i class="add">+</i> 添加助力商品
          </el-button>
        </router-link>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini" :row-class-name="tableRowClassName" @rowclick.stop="closeEdit">
        <el-table-column prop="product_assist_id" label="ID" min-width="50" />
        <el-table-column label="助力商品图" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image :src="scope.row.product.image" :preview-src-list="[scope.row.product.image]" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="store_name" label="商品名称" min-width="120" />
        <el-table-column label="助力价格" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.assistSku && scope.row.assistSku[0].assist_price ? scope.row.assistSku[0].assist_price : 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="助力活动状态" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.assist_status === 0 ? '未开始' : scope.row.assist_status === 1 ? '正在进行' : '已结束' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动时间" min-width="160">
          <template slot-scope="scope">
            <div>开始日期：{{ scope.row.start_time && scope.row.start_time ? scope.row.start_time.slice(0,10) : "" }}</div>
            <div>结束日期：{{ scope.row.end_time && scope.row.end_time ? scope.row.end_time.slice(0,10) : "" }}</div>
          </template>
        </el-table-column>
        <el-table-column label="助力成功人数/参与人次" min-width="80" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.success }} / {{ scope.row.all }}</span>
          </template>
        </el-table-column>
        <el-table-column label="限量" min-width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.assistSku && scope.row.assistSku[0] ? scope.row.assistSku[0].stock_count : 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="限量剩余" min-width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.assistSku && scope.row.assistSku[0] ? scope.row.assistSku[0].stock : 0 }}</span>
          </template>
        </el-table-column>
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
            <span v-if="scope.row.product_status === -1" style="font-size: 12px;">
              <br>
              原因：{{ scope.row.refusal }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <router-link
              v-if="scope.row.product_status === 0"
              :to="{path: roterPre + '/marketing/assist/create/' + scope.row.product_assist_id}"
            >
              <el-button type="text" size="small" class="mr10">编辑</el-button>
            </router-link>
            <el-button type="text" size="small" @click="handlePreview(scope.row.product_assist_id)">预览</el-button>
            <el-button type="text" size="small" @click="onEditLabel(scope.row)">编辑标签</el-button>
            <el-button type="text" size="small" class="mr10" @click="goDetail(scope.row.product_assist_id)">详情</el-button>
            <el-button v-if="scope.row.product_status !== 1 || scope.row.assist_status == 2" type="text" size="small" class="mr10" @click="handleDelete(scope.row.product_assist_id,scope.$index)">删除</el-button>
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
    <el-dialog v-if="dialogVisible" title="助力商品详情" center :visible.sync="dialogVisible" width="700px">
      <div v-loading="loading">
        <div class="box-container">
          <div class="title">基本信息：</div>
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
          </div>
          <div class="title" style="margin-top: 20px;">助力商品活动信息：</div>
          <div class="acea-row">
            <div class="list sp100"><label class="name">助力活动简介：</label>{{ formValidate.store_info }}</div>
            <div class="list sp100"><label class="name">助力活动日期：</label>{{ formValidate.start_time + '-' + formValidate.end_time }}</div>
            <div class="list sp"><label class="name">助力价：</label>{{ formValidate.price }}元</div>
            <div class="list sp"><label class="name">已售商品数：</label>{{ formValidate.pay }}{{ formValidate.unit_name }}</div>
            <div class="list sp"><label class="name">限量：</label>{{ formValidate.stock_count }}</div>
            <div class="list sp"><label class="name">限量剩余：</label>{{ formValidate.stock }}</div>
            <div class="list sp"><label class="name">限购件数：</label>{{ formValidate.pay_count }}{{ formValidate.unit_name }}</div>
            <div class="list sp"><label class="name">助力次数：</label>{{ formValidate.assist_user_count }}</div>
            <div class="list sp"><label class="name">助力人数：</label>{{ formValidate.assist_count }}人</div>
            <div class="list sp">
              <label class="name">审核状态：</label>
              <span>{{ formValidate.reviewStatus === 0 ? "待审核" : formValidate.reviewStatus === 1 ? "审核通过" : "审核失败" }}</span>
              <span v-if="formValidate.reviewStatus === -1" style="font-size: 12px;">
                <br>
                原因：{{ formValidate.refusal }}
              </span>
            </div>
            <div class="list sp"><label class="name">助力成功/参与人次：</label>{{ formValidate.success }} / {{ formValidate.all }}</div>
            <div class="list sp"><label class="name">助力活动状态：</label>{{ formValidate.assist_status === 0 ? '未开始' : formValidate.assist_status === 1 ? '正在进行' : '已结束' }}</div>
            <div class="list sp"><label class="name">显示状态：</label>{{ formValidate.is_show === 1 ? "显示" : "隐藏" }}</div>
            <div class="list sp"><label class="name">创建时间：</label>{{ formValidate.create_time }}</div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--预览商品-->
    <div v-if="previewVisible">
      <div class="bg" @click.stop="previewVisible = false" />
      <preview-box v-if="previewVisible" ref="previewBox" :goods-id="goodsId" :product-type="3" :preview-key="previewKey" />
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
  assistProListApi,
  assistDeleteApi,
  assistStatusApi,
  assistProDetailApi,
  updatetAssistLabel,
  getProductLabelApi
} from '@/api/product'
import previewBox from '@/components/previewBox/index'
import { roterPre } from '@/settings'
import {
  assistProSort
} from '@/api/marketing'
export default {
  name: 'ProductList',
  components: { previewBox },
  data() {
    return {
      props: {
        emitPath: false
      },
      roterPre: roterPre,
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },
      assistStatusList: [
        { label: '未开始', value: 0 },
        { label: '正在进行', value: 1 },
        { label: '已结束', value: 2 }
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
        type: '',
        us_status: '',
        mer_labels: '',
        product_assist_id: this.$route.query.id ? this.$route.query.id : ''
      },
      product_assist_id: this.$route.query.id ? this.$route.query.id : '',
      product_id: '',
      modals: false,
      dialogVisible: false,
      loading: false,
      manyTabTit: {},
      manyTabDate: {},
      formValidate: {},
      attrInfo: {},
      tabClickIndex: '',
      previewVisible: false,
      goodsId: '',
      previewKey: '',
      dialogLabel: false,
      labelList: [],
      labelForm: {}
    }
  },
  watch: {
    product_assist_id(newName, oldName) {
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
      assistProSort(scope.row.product_assist_id, { sort: scope.row.product.sort })
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
    },
    // 表头换行
    renderheader(h, { column, $index }) {
      return h('span', {}, [
        h('span', {}, column.label.split('|')[0]),
        h('br'),
        h('span', {}, column.label.split('|')[1])
      ])
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
    },
    // 编辑标签
    onEditLabel(row) {
      this.dialogLabel = true
      this.product_id = row.product_assist_id
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
          updatetAssistLabel(this.product_id, this.labelForm).then(({ message }) => {
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
      // this.formThead = Object.assign({}, this.formThead, tmp);
      // console.log(this.formThead)
    },
    // 查看详情
    goDetail(id) {
      this.dialogVisible = true
      assistProDetailApi(id).then(async(res) => {
        this.loading = false
        const info = res.data
        this.formValidate = {
          product_id: info.product_assist_id,
          image: info.product.image,
          store_name: info.store_name,
          store_info: info.store_info,
          start_time: info.start_time ? info.start_time : '',
          end_time: info.end_time ? info.end_time : '',
          create_time: info.create_time,
          unit_name: info.product.unit_name,
          is_show: info.is_show,
          stock_count: info.assistSku[0].stock_count,
          stock: info.assistSku[0].stock,
          content: info.content,
          price: info.assistSku[0].assist_price,
          assist_status: info.assist_status,
          reviewStatus: info.product_status,
          refusal: info.refusal,
          all: info.all,
          pay: info.pay,
          assist_user_count: info.assist_user_count,
          assist_count: info.assist_count,
          pay_count: info.pay_count,
          success: info.success
        }
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
      assistProListApi(this.tableFrom)
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
      this.$modalSure().then(() => {
        assistDeleteApi(id)
          .then(({
            message
          }) => {
            this.$message.success(message)
            this.tableData.data.splice(idx, 1)
          })
          .catch(({
            message
          }) => {
            this.$message.error(message)
          })
      })
    },
    onchangeIsShow(row) {
      assistStatusApi(row.product_assist_id, row.is_show)
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
  height: 280px;
  overflow-y: auto;
}
</style>
