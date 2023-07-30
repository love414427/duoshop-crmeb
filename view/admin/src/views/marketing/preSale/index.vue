<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form inline size="small" label-width="110px">
            <el-form-item label="状态：" style="display: block;">
              <el-radio-group
                v-model="tableFrom.product_status"
                type="button"
                class="mr20"
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
            <el-form-item label="预售活动状态：">
              <el-select
                v-model="tableFrom.type"
                placeholder="请选择"
                class="filter-item selWidth"
                clearable
                @change="getList(1)"
              >
                <el-option
                  v-for="item in preSaleStatusList"
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
            <el-form-item label="商户类别：">
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
            <el-form-item label="关键字搜索：">
              <el-input v-model="tableFrom.keyword" @keyup.enter.native="getList(1)" placeholder="请输入预售商品名称/ID" class="selWidth">
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
        <el-tabs v-model="tableFrom.presell_type" @tab-click="getList(1)">
          <el-tab-pane v-for="(item,index) in headeNum" :key="index" :name="item.presell_type.toString()" :label="item.title +'('+item.count +')' " />
        </el-tabs>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini">
        <el-table-column prop="product_presell_id" label="ID" min-width="50" />
        <el-table-column label="商户名称" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.merchant ? scope.row.merchant.mer_name : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="store_name" label="商品名称" min-width="120" />
        <el-table-column prop="mer_name" label="商户类别" min-width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.merchant" class="spBlock">{{ scope.row.merchant .is_trader ? '自营' : '非自营' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品图" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image :src="scope.row.product.image" :preview-src-list="[scope.row.product.image]" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="预售价" min-width="90" />
        <el-table-column label="预售活动状态" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.presell_status === 0 ? '未开始' :  (scope.row.presell_status === 1 ? '进行中' : '已结束') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预售活动日期" min-width="160">
          <template slot-scope="scope">
            <div>开始日期：{{ scope.row.start_time && scope.row.start_time ? scope.row.start_time.slice(0,10) : "" }}</div>
            <div>结束日期：{{ scope.row.end_time && scope.row.end_time ? scope.row.end_time.slice(0,10) : "" }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="tableFrom.presell_type === '1'" label="成功/参与人数"  min-width="90" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tattend_one && scope.row.tattend_one.pay }} / {{ scope.row.tattend_one && scope.row.tattend_one.all }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="tableFrom.presell_type === '2'" :label="'第一阶段 | 成功/参与人次'" :render-header="renderheader" min-width="90" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tattend_one && scope.row.tattend_one.pay }} / {{ scope.row.tattend_one && scope.row.tattend_one.all }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="tableFrom.presell_type === '2'" :label="'第二阶段 | 成功/参与人次'" :render-header="renderheader" min-width="90" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tattend_two && scope.row.tattend_two.pay }} / {{ scope.row.tattend_two && scope.row.tattend_two.all }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="seles" label="已售商品数" min-width="90" />
        <el-table-column prop="stock_count" label="限量" min-width="90" />
        <el-table-column prop="stock" label="限量剩余" min-width="90" />
        <el-table-column prop="status" label="显示状态" min-width="100">
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
        <el-table-column label="排序" min-width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.product.rank }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.product_status === 0 ? "待审核" : scope.row.product_status === 1 ? "审核通过" : "审核失败"}}</span>
            <span v-if="scope.row.product_status === -1 || scope.row.product_status === -2" style="font-size: 12px;">
              <br />
              原因：{{ scope.row.refusal }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="mr10" @click="onEdit(scope.row.product_presell_id)">编辑</el-button>
            <el-button type="text" size="small" class="mr10" @click="handlePreview(scope.row.product_presell_id)">预览</el-button>
            <el-button type="text" size="small" @click="onEditLabel(scope.row)">编辑标签</el-button>
            <el-button v-if="scope.row.product_status === 1" type="text" size="small" class="mr10" @click="toOff(scope.row.product_presell_id)">强制下架</el-button>
            <el-button type="text" size="small" class="mr10" @click="goDetail(scope.row.product_presell_id)">详情</el-button>
            <el-button v-if="scope.row.product_status === 0" type="text" size="small" @click="toReview(scope.row.product_presell_id)">审核</el-button>            
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
           <el-rate class="rate_star"
            v-model="formValidate.star"
            :colors="colors" style="margin-top: 4px;">
           </el-rate>
           <span style="margin-top: 4px; font-size: 12px;">备注：5星为最高推荐级别，1星为最低推荐级别，设置后会在商城商品列表、搜索商品列表中体现。</span>
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
    <!--商品审核-->
    <info-from ref="infoFrom" :is-show="isShow" @subSuccess="subSuccess" />
    <!--查看详情-->
    <details-data ref="detailsData" :is-show="isShowDetail"/>
     <!--预览商品-->
    <div v-if="previewVisible">
        <div class="bg" @click.stop="previewVisible = false" />
        <preview-box v-if="previewVisible" ref="previewBox" :goods-id="goodsId" :product-type="2" :preview-key="previewKey" />
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
  preSaleProListApi,
  presellStatusApi,
  presellProductStatusApi,
  preSaleProDetailApi,
  presellUpdateApi,
  merSelectApi,
  getProductLabelApi,
  updatetPresellLabel
} from '@/api/product'
import { roterPre } from "@/settings";
import ueditorFrom from '@/components/ueditorFrom'
import infoFrom from './info'
import detailsData from './detail'
import previewBox from '@/components/previewBox/index'

export default {
  name: "preSaleProductList",
  components: { infoFrom, ueditorFrom, detailsData, previewBox },
  data() {
    return {
     colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      headeNum: [
        {
          count: 0,
          presell_type: 1,
          title: "全款预售"
        },
        {
          count: 0,
          presell_type: 2,
          title: "定金预售"
        }
      ],
      props: {
        emitPath: false,
      },
      roterPre: roterPre,
      listLoading: true,
      tableData: {
        data: [],
        total: 0,
      },
      preSaleStatusList: [
        { label: "未开始", value: 0 },
        { label: "进行中", value: 1 },
        { label: "已结束", value: 2 },
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
        product_status: this.$route.query.status ? this.$route.query.status : '',
        status: '',
        type: '',
        is_trader: '',
        mer_id: '',
        presell_type: this.$route.query.type ? this.$route.query.type : '1',
        us_status: "",
        sys_labels: "",
        star: "",
        product_presell_id: this.$route.query.id ? this.$route.query.id : "",
      },
      product_presell_id: this.$route.query.id ? this.$route.query.id : "",
      product_id: '',
      modals: false,
      dialogVisible: false,
      loading: false,
      formValidate: {
        is_hot: 0,
        is_best: 0,
        is_new: 0,
        is_benefit: 0,
        ficti: 0,
        content: '',
        store_name: '',
        rank: '',
        star: 0
      },
      fullscreenLoading: true,
      isShow: false,
      isShowDetail: false,
      checkboxGroup: [],
      merSelect: [],
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
    product_presell_id(newName, oldName) {
     this.getList("");
    }
  },
  mounted() {
    this.getList('');
    this.getMerSelect();
    this.getLabelLst()
  },
  methods: {
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
    // 表头换行
    renderheader(h, { column, $index }) {
      return h('span', {}, [
        h('span', {}, column.label.split('|')[0]),
        h('br'),
        h('span', {}, column.label.split('|')[1])
      ]);
    },
    subSuccess() {
      this.getList('')
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
      this.product_id = row.product_presell_id
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
          updatetPresellLabel(this.product_id, this.labelForm).then(({ message }) => {
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
    // 预览
    handlePreview(id) {
        this.previewVisible = true
        this.goodsId = id
        this.previewKey = ''
    },
    // 查看详情
    goDetail(id){
      this.$refs.detailsData.dialogVisible = true
      this.isShowDetail = true
      this.$refs.detailsData.getInfo(id)
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
        presellProductStatusApi({ id: id, status: -2, refusal: value }).then(res => {
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
    getInfo(id) {
      this.fullscreenLoading = true
      this.checkboxGroup = [];
      preSaleProDetailApi(id).then(res => {
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
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      preSaleProListApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
          this.headeNum[0]['count'] = res.data.stat.all;
          this.headeNum[1]['count'] = res.data.stat.down;
          console.log(this.headeNum);
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
    onchangeIsShow(row) {
      presellStatusApi(row.product_presell_id, row.status)
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
      this.$refs[name].validate((valid) => {
        if (valid) {
          presellUpdateApi(this.productId, this.formValidate).then(async res => {
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
  },
};
</script>

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
.rate_star{
    position: relative; top: 5px;
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
}
.scollhide::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
