<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" inline label-width="120px">
            <el-form-item label="状态：" style="display: block;">
              <el-radio-group
                v-model="tableFrom.product_status"
                type="button"
                size="small"
                @change="getList(1)"
                clearable
              >
                <el-radio-button
                  v-for="(item,i) in fromList.fromTxt"
                  :key="i"
                  :label="item.val"
                >{{ item.text }}</el-radio-button>
              </el-radio-group>
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
            <el-form-item label="拼团活动状态：">
              <el-select
                v-model="tableFrom.active_type"
                placeholder="请选择"
                class="filter-item selWidth"
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
             <el-form-item label="商品搜索：">
              <el-input v-model="tableFrom.keyword" @keyup.enter.native="getList(1)" placeholder="请输入商品名称" class="selWidth">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini">
        <el-table-column prop="product_group_id" label="ID" min-width="50" />
        <el-table-column label="商户名称" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.merchant ? scope.row.merchant.mer_name : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mer_name" label="商户类别" min-width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.merchant" class="spBlock">{{ scope.row.merchant.is_trader ? '自营' : '非自营' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="拼团商品图片" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image :src="scope.row.product.image" :preview-src-list="[scope.row.product.image]" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="product.store_name" label="拼团商品" min-width="120" />
         <el-table-column prop="product.price" label="市场价" min-width="60" />
        <el-table-column prop="price" label="拼团价" min-width="60" />
        <el-table-column  label="几人团/成团数量"  min-width="180" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.buying_count_num }} / {{ scope.row.success_num }}</span>
          </template>
        </el-table-column>
         <el-table-column  label="参与人次/成团人次"  min-width="180" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.count_take }} / {{ scope.row.count_user }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sales" label="已售商品数" min-width="90" />
        <el-table-column prop="stock" label="拼团活动状态" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.action_status === 0 ? '未开始' :  scope.row.action_status === 1 ? '正在进行' : '已结束' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动时间" min-width="160">
          <template slot-scope="scope">
            <div>开始日期：{{ scope.row.start_time && scope.row.start_time ? scope.row.start_time.slice(0,10) : "" }}</div>
            <div>结束日期：{{ scope.row.end_time && scope.row.end_time ? scope.row.end_time.slice(0,10) : "" }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="限量剩余" min-width="60" />
        <el-table-column label="审核状态" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.product_status === 0 ? "待审核" : scope.row.product_status === 1 ? "审核通过" : "审核失败"}}</span>
            <span v-if="scope.row.product_status === -1 || scope.row.product_status === -2" style="font-size: 12px;">
              <br />
              原因：{{ scope.row.refusal }}
            </span>
          </template>
        </el-table-column>
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
        <el-table-column prop="product.rank" label="排序" min-width="60" />
        <el-table-column prop="status" label="显示状态" min-width="80">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
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
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="mr10" @click="onEdit(scope.row.product_group_id)">编辑</el-button>
            <el-button type="text" size="small" @click="handlePreview(scope.row.product_group_id)">预览</el-button>
            <el-button type="text" size="small" @click="onEditLabel(scope.row)">编辑标签</el-button>
            <el-button v-if="scope.row.product_status === 0" type="text" size="small" @click="toReview(scope.row.product_group_id)">审核</el-button>
            <el-button type="text" size="small" class="mr10" @click="goDetail(scope.row.product_group_id)">详情</el-button>
            <el-button v-if="scope.row.product_status == 1" type="text" size="small" class="mr10" @click="toOff(scope.row.product_group_id,scope.$index)">强制下架</el-button>
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
    <!--商品编辑-->
    <el-dialog
      title="商品编辑"
      :visible.sync="dialogVisible"
      width="1000px"
      :before-close="handleClose"
    >
      <el-form ref="formValidate" v-loading="fullscreenLoading" class="formValidate mt20" :rules="ruleValidate" :model="formValidate" label-width="120px" @submit.native.prevent>
        <el-form-item label="商品名称：" prop="store_name">
          <el-input v-model="formValidate.store_name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="活动列表推荐：">
          <!-- <el-radio-group v-model="formValidate.star">
            <el-radio v-for="item in recommendation" :key="item.value" :label="item.value">{{item.name}}</el-radio>
          </el-radio-group> -->
           <el-rate class="rate_star"
            v-model="formValidate.star"
            :colors="colors">
           </el-rate>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input-number v-model="formValidate.rank" placeholder="请输入排序序号" style="width: 200px;"/>
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
    <!--商品审核-->
    <info-from ref="infoFrom" :is-show="isShow" @subSuccess="subSuccess" />
    <!--查看详情-->
    <details-data ref="detailsData" :is-show="isShowDetail"/>
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
          <el-select v-model="labelForm.sys_labels" clearable multiple placeholder="请选择" class="selWidth">
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
  combinationProListApi,
  combinationProductStatusApi,
  combinationProUpdateApi,
  combinationStatusApi,
  combinationProductUpdateApi,
} from '@/api/marketing'
import { merSelectApi, updatetCombinationLabel, getProductLabelApi } from '@/api/product'
import { roterPre } from "@/settings";
import ueditorFrom from '@/components/ueditorFrom/index'
import infoFrom from './info'
import detailsData from './detail'
import previewBox from '@/components/previewBox/index'

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
  is_open_recommend: 1,
  is_open_state: 1,
  is_show: 1,
  keyword: "",
  brand_id: "", // 品牌id
  cate_id: "", // 平台分类id
  mer_cate_id: [], // 商户分类id
  unit_name: "",
  integral: 0,
  star: 1,
  is_good: 0,
  temp_id: "",
  preSale_date: "",
  finalPayment_date: "",
  delivery_type: 1,
  delivery_day: 10,
  rank: '',
  attrValue: [
    {
      image: "",
      price: null,
      active_price: null,
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
  // give_coupon_ids: [],
  is_gift_bag: 0,
  // couponData: [],
};

export default {
  name: "ProductList",
  components: { infoFrom, ueditorFrom, detailsData, previewBox },
  data() {
    return {
      props: {
        emitPath: false,
      },
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      roterPre: roterPre,
      listLoading: true,
      tableData: {
        data: [],
        total: 0,
      },
      activityStatusList: [
        { label: "未开始", value: 0 },
        { label: "正在进行", value: 1 },
        { label: "已结束", value: -1 },
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
      recommendation:[
        { name: "1星推荐", value: 1 },
        { name: "2星推荐", value: 2 },
        { name: "3星推荐", value: 3 },
        { name: "4星推荐", value: 4 },
        { name: "5星推荐", value: 5 }
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
        keyword: "",
        active_type: '',
        product_status: this.$route.query.status ? this.$route.query.status : "",
        is_trader: '',
        mer_id: '',
        status: '',
        star: '',
        us_status: "",
        sys_labels: "",
        product_group_id: this.$route.query.id ? this.$route.query.id : "",
      },
      product_group_id: this.$route.query.id ? this.$route.query.id : "",
      product_id: "",
      modals: false,
      dialogVisible: false,
      isShowDetail: false,
      isShow: false,
      loading: false,
      fullscreenLoading: true,
      manyTabTit: {},
      manyTabDate: {},
      formValidate: Object.assign({}, defaultObj),
      OneattrValue: [Object.assign({}, defaultObj.attrValue[0])], // 单规格
      ManyAttrValue: [Object.assign({}, defaultObj.attrValue[0])], // 多规格
      attrInfo: {},
      merSelect: [],
      checkboxGroup: [],
      ruleValidate: {
        store_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ]
      },
      previewVisible: false,
      goodsId: '',
      previewKey: '',
      labelList: [],
      dialogLabel: false,
      labelForm: {}
    };
  },
 watch: {
    product_group_id(newName, oldName) {
     this.getList("");
    },
    $route(newName, oldName){
         if (this.$route.query.id) {
             this.getList("");
         }
    },
  },
  mounted() {
    this.getList('');
    this.getLabelLst()
    this.getMerSelect();
  },
  methods: {
    onChangeGroup() {
      this.checkboxGroup.includes('is_benefit') ? this.formValidate.is_benefit = 1 : this.formValidate.is_benefit = 0 && this.checkboxGroup.remove('is_benefit')
      this.checkboxGroup.includes('is_best') ? this.formValidate.is_best = 1 : this.formValidate.is_best = 0 && this.checkboxGroup.remove('is_best')
      this.checkboxGroup.includes('is_new') ? this.formValidate.is_new = 1 : this.formValidate.is_new = 0 && this.checkboxGroup.remove('is_new')
      this.checkboxGroup.includes('is_hot') ? this.formValidate.is_hot = 1 : this.formValidate.is_hot = 0 && this.checkboxGroup.remove('is_hot')
    },
    handleClose() {
      this.dialogVisible = false;
      this.dialogLabel = false;
    },
    // 商户列表；
    getMerSelect() {
      merSelectApi()
        .then((res) => {
          this.merSelect = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    subSuccess() {
      this.getList('')
    },
    watCh(val) {

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
      this.product_id = row.product_group_id
      if (row.sys_labels && row.sys_labels.length) {
        const arrNew = row.sys_labels.map(item => {
          return item.id
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
    // 编辑
    onEdit(id){
      this.productId = id
      this.getInfo(id)
      this.dialogVisible = true
    },
    // 审核
    toReview(id) {
      this.$refs.infoFrom.dialogVisible = true
      this.isShow = true
      this.$refs.infoFrom.getInfo(id)
    },
    getInfo(id) {
      this.fullscreenLoading = true
      this.checkboxGroup = [];
      combinationProUpdateApi(id).then(res => {
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
        if (info.is_benefit === 1) this.checkboxGroup.push('is_benefit')
        if (info.is_hot === 1) this.checkboxGroup.push('is_hot')
        if (info.is_best === 1) this.checkboxGroup.push('is_best')
        if (info.is_new === 1) this.checkboxGroup.push('is_new')
        this.fullscreenLoading = false
        console.log(this.formValidate)
      }).catch(res => {
        this.$message.error(res.message)
        this.fullscreenLoading = false
      })
    },
  // 查看详情
    goDetail(id){
      this.$refs.detailsData.dialogVisible = true
      this.isShowDetail = true
      this.$refs.detailsData.getInfo(id)
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      combinationProListApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
          this.listLoading = false;
        })
        .catch((res) => {
          this.listLoading = false;
          this.$message.error(res.message);
        });
    },
    pageChange(page) {
      this.tableFrom.page = page;
      this.getList('');
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      this.getList('');
    },
    // 预览
     handlePreview(id) {
        this.previewVisible = true
        this.goodsId = id
        this.previewKey = ''
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
      }).then(({ value }) => {
        combinationProductStatusApi({ id: id, status: -2, refusal: value }).then(res => {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
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

    onchangeIsShow(row) {
      combinationStatusApi(row.product_group_id, row.status)
        .then(({ message }) => {
          this.$message.success(message);
          this.getList('');
        })
        .catch(({ message }) => {
          this.$message.error(message);
        });
    },
    // 提交
    handleSubmit(name) {
      console.log(this.formValidate)
      this.$refs[name].validate((valid) => {
        if (valid) {
          combinationProductUpdateApi(this.productId, this.formValidate).then(async res => {
            this.fullscreenLoading = false
            this.$message.success(res.message)
            this.dialogVisible = false
            this.getList()
          }).catch(res => {
            this.fullscreenLoading = false
            this.$message.error(res.message)
          })
        } else {
          return false
        }
      })
    },
  }

};
</script>
<style lang="scss">
.contentPic img{
  max-width: 100%;
}
</style>
<style scoped lang="scss">
/deep/.el-select-dropdown__item{
  max-width: 350px;
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
.rate_star{
    position: relative; top: 5px;
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
