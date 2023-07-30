<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" inline label-width="120px">
            <el-form-item label="时间选择：" class="width100" style="display: block;">
              <el-radio-group
                v-model="tableFrom.date"
                type="button"
                class="mr20"
                size="small"
                @change="selectChange(tableFrom.date)"
              >
                <el-radio-button
                  v-for="(item,i) in fromList.fromTxt"
                  :key="i"
                  :label="item.val"
                >{{ item.text }}</el-radio-button>
              </el-radio-group>
              <el-date-picker
                v-model="timeVal"
                value-format="yyyy/MM/dd"
                format="yyyy/MM/dd"
                size="small"
                type="daterange"
                placement="bottom-end"
                placeholder="自定义时间"
                style="width: 250px;"
                @change="onchangeTime"
              />
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
              <el-input v-model="tableFrom.keyword" @keyup.enter.native="getList(1)" placeholder="请输入商品名称/ID" class="selWidth">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
            <el-form-item label="发起人搜索：">
              <el-input v-model="tableFrom.user_name" @keyup.enter.native="getList(1)" placeholder="请输入发起人昵称" class="selWidth">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini">
        <el-table-column prop="product_assist_set_id" label="ID" min-width="50" />
        <el-table-column label="商户名称" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.merchant ? scope.row.merchant.mer_name : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mer_name" label="商户类别" min-width="90">
          <template slot-scope="scope">
            <span
              v-if="scope.row.merchant"
              class="spBlock"
            >{{ scope.row.merchant.is_trader ? '自营' : '非自营' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="助力商品图片" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image
                v-if="scope.row.product"
                :src="scope.row.product.image"
                :preview-src-list="[scope.row.product.image]"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.assist.store_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="助力价格" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.assist && scope.row.assist.assistSku[0].assist_price || '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="assist_count" label="助力人数" min-width="90" />
        <el-table-column label="发起人" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.user && scope.row.user.nickname || '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="发起时间" min-width="130" />
        <el-table-column label="活动时间" min-width="160">
          <template slot-scope="scope">
            <div>开始日期：{{ scope.row.assist && scope.row.assist.start_time ? scope.row.assist.start_time.slice(0,10) : "" }}</div>
            <div>结束日期：{{ scope.row.assist.end_time && scope.row.assist.end_time ? scope.row.assist.end_time.slice(0,10) : "" }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="mr10"
              @click="goDetail(scope.row.product_assist_set_id)"
            >查看详情</el-button>
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
    <!--查看详情-->
    <details-data ref="detailsData" :is-show="isShowDetail" />
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
import { assistListApi, merSelectApi } from "@/api/product";
import { roterPre } from "@/settings";
import { fromList } from "@/libs/constants.js";
import detailsData from "./detail";

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
  presell_type: 1,
  keyword: "",
  brand_id: "", // 品牌id
  cate_id: "", // 平台分类id
  mer_cate_id: [], // 商户分类id
  unit_name: "",
  integral: 0,
  sort: 0,
  is_good: 0,
  temp_id: "",
  preSale_date: "",
  finalPayment_date: "",
  delivery_type: 1,
  delivery_day: 10,
  attrValue: [
    {
      image: "",
      price: null,
      down_price: null,
      presell_price: null,
      cost: null,
      ot_price: null,
      old_stock: null,
      stock: null,
      bar_code: "",
      weight: null,
      volume: null
    }
  ],
  attr: [],
  extension_type: 0,
  content: "",
  spec_type: 0,
  // give_coupon_ids: [],
  is_gift_bag: 0
  // couponData: [],
};

export default {
  name: "ProductList",
  components: { detailsData },
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
        { label: "未开始", value: 0 },
        { label: "正在进行", value: 1 },
        { label: "已结束", value: 2 }
      ],
      fromList: fromList,
      tableFrom: {
        page: 1,
        limit: 20,
        keyword: "",
        date: "",
        type: "",
        is_trader: "",
        mer_id: "",
        user_name: "",
      },
      modals: false,
      dialogVisible: false,
      loading: false,
      manyTabTit: {},
      manyTabDate: {},
      formValidate: Object.assign({}, defaultObj),
      OneattrValue: [Object.assign({}, defaultObj.attrValue[0])], // 单规格
      ManyAttrValue: [Object.assign({}, defaultObj.attrValue[0])], // 多规格
      attrInfo: {},
      timeVal: "",
      isShowDetail: false,
      merSelect: []
    };
  },
  mounted() {
    this.getList("");
    this.getMerSelect();
  },
  methods: {
    watCh() {},
    // 商户列表；
    getMerSelect() {
      merSelectApi()
        .then(res => {
          this.merSelect = res.data;
        })
        .catch(res => {
          this.$message.error(res.message);
        });
    },
    // 查看详情
    goDetail(id) {
      this.$refs.detailsData.dialogVisible = true;
      this.isShowDetail = true;
      this.$refs.detailsData.getList(id);
    },
    // 选择时间
    selectChange(tab) {
      this.tableFrom.date = tab;
      this.tableFrom.page = 1;
      this.timeVal = [];
      this.getList("");
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e;
      this.tableFrom.date = e ? this.timeVal.join("-") : "";
      this.tableFrom.page = 1;
      this.getList("");
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      assistListApi(this.tableFrom)
        .then(res => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
          this.listLoading = false;
        })
        .catch(res => {
          this.listLoading = false;
          this.$message.error(res.message);
        });
    },
    pageChange(page) {
      this.tableFrom.page = page;
      this.getList("");
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      this.getList("");
    }
  }
};
</script>

<style scoped lang="scss">
.el-table .cell {
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
.title {
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
.labeltop {
  height: 280px;
  overflow-y: auto;
}
</style>
