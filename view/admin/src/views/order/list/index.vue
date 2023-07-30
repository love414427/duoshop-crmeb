<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" inline label-width="100px">
            <el-form-item label="订单状态：">
              <el-radio-group v-model="tableFrom.status" type="button" @change="getList(1),getCardList()">
                <el-radio-button label="">全部 {{ '(' +orderChartType.all?orderChartType.all:0 + ')' }}</el-radio-button>
                <el-radio-button
                  label="1"
                >待付款 {{ '(' +orderChartType.unpaid?orderChartType.unpaid:0+ ')' }}</el-radio-button>
                <el-radio-button
                  label="2"
                >待发货 {{ '(' +orderChartType.unshipped?orderChartType.unshipped:0+ ')' }}</el-radio-button>
                <el-radio-button
                  label="3"
                >待收货 {{ '(' +orderChartType.untake?orderChartType.untake:0+ ')' }}</el-radio-button>
                <el-radio-button
                  label="4"
                >待评价 {{ '(' +orderChartType.unevaluate?orderChartType.unevaluate:0+ ')' }}</el-radio-button>
                <el-radio-button
                  label="5"
                >交易完成 {{ '(' +orderChartType.complete?orderChartType.complete:0+ ')' }}</el-radio-button>
                <el-radio-button
                  label="6"
                >已退款 {{ '(' +orderChartType.refund?orderChartType.refund:0+ ')' }}</el-radio-button>
                <el-radio-button
                  label="7"
                >已删除 {{ '(' +orderChartType.del?orderChartType.del:0+ ')' }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="时间选择：" class="width100">
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
            <el-form-item label="活动类型：" style="display: inline-block;">
              <el-select
                v-model="tableFrom.activity_type"
                clearable
                filterable
                placeholder="请选择"
                class="selWidth"
                @change="getList(1),getCardList()"
              >
                <el-option
                  v-for="item in activity"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="商户名称：" style="display: inline-block;">
              <el-select
                v-model="tableFrom.mer_id"
                clearable
                filterable
                placeholder="请选择"
                class="selWidth"
                @change="getList(1),getCardList()"
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
                @change="getList(1),getCardList()"
              >
                <el-option label="自营" value="1" />
                <el-option label="非自营" value="0" />
              </el-select>
            </el-form-item>
            <el-form-item label="商品名称：" class="width100" style="display: inline-block;">
              <el-input
                v-model="tableFrom.store_name"
                @keyup.enter.native="getList(1),getCardList()"
                placeholder="请输入商品名称"
                class="selWidth"
                size="small"
              >
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1),getCardList()" />
              </el-input>
            </el-form-item>
             <el-form-item label="发货方式：" class="width100">
                <el-select
                  v-model="tableFrom.filter_delivery"
                  placeholder="请选择"
                  class="filter-item selWidth"
                  clearable
                  @change="getList(1),getCardList()"
                >
                  <el-option
                    v-for="item in dliveryWayList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="商品类型：" class="width100">
                <el-select
                  v-model="tableFrom.filter_product"
                  placeholder="请选择"
                  class="filter-item selWidth"
                  clearable
                  @change="getList(1),getCardList()"
                >
                  <el-option
                    v-for="item in productTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            <el-form-item label="关键字：" class="width100" style="display: inline-block;">
              <el-input
                v-model="tableFrom.keywords"
                @keyup.enter.native="getList(1),getCardList()"
                placeholder="请输入订单号/收货人/联系方式"
                class="selWidth"
                size="small"
              >
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1),getCardList()" />
              </el-input>
            </el-form-item>
            <el-form-item label="总单单号：" class="width100" style="display: inline-block;">
              <el-input
                v-model="tableFrom.group_order_sn"
                @keyup.enter.native="getList(1),getCardList()"
                placeholder="请输入总单单号"
                class="selWidth"
                size="small"
              >
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1),getCardList()" />
              </el-input>
            </el-form-item>
            <el-form-item label="用户信息：" class="width100" style="display: inline-block;">
              <el-input
                v-model="tableFrom.username"
                @keyup.enter.native="getList(1),getCardList()"
                placeholder="请输入用户昵称/手机号"
                class="selWidth"
                size="small"
              >
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1),getCardList()" />
              </el-input>
              <el-button size="small" type="primary" icon="el-icon-top" @click="exports">导出列表</el-button>
              <!-- <el-button size="small" type="primary" @click="getExportFileList">导出记录</el-button> -->
            </el-form-item>
          </el-form>
        </div>
        <el-tabs v-if="headeNum.length > 0" v-model="tableFrom.order_type" @tab-click="getList(1),getCardList()">
          <el-tab-pane v-for="(item,index) in headeNum" :key="index" :name="item.order_type.toString()" :label="item.title +'('+item.count +')' " />
        </el-tabs>
        <cards-data :card-lists="cardLists" />
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="mini"
        class="table"
        highlight-current-row
        :cell-class-name="addTdClass"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品总价：">
                <span>{{ props.row.total_price | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="下单时间：">
                <span>{{ props.row.create_time | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="用户备注：">
                <span>{{ props.row.mark | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="商家备注：">
                <span>{{ props.row.remark | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="总单号：">
                <span>{{ props.row.groupOrder ? props.row.groupOrder.group_order_sn : '' }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单编号" min-width="170">
          <template slot-scope="scope">
            <span style="display: block;" v-text="scope.row.order_sn" />
            <span v-show="scope.row.is_del > 0" style="color: #ED4014;display: block;">用户已删除</span>
          </template>
        </el-table-column>
        <el-table-column label="用户信息" min-width="170">
          <template slot-scope="scope">
             <el-button type="text" size="small" @click.native="onUserDetails(scope.row.uid)">{{scope.row.user&&scope.row.user.nickname +'/'+ scope.row.uid}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="订单类型" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.is_virtual == 1 ? "虚拟订单" : scope.row.order_type == 0 ? "普通订单" : "核销订单" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动类型" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.activity_type != 4">{{ scope.row.activity_type === 1 ? "秒杀" : scope.row.activity_type === 2 ? "预售" : scope.row.activity_type === 3 ? "助力" : "--"}}</span>
            <span v-else>拼团订单 <span v-if="scope.row.groupUser && scope.row.groupUser.groupBuying">-{{scope.row.groupUser.groupBuying.status | activityOrderStatus}}</span></span>
          </template>
        </el-table-column>
        <el-table-column prop="real_name" label="收货人/订购人" min-width="120" />
        <el-table-column label="商户名称" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.merchant ? scope.row.merchant.mer_name :'' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mer_name" label="商户类别" min-width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.merchant" class="spBlock">{{ scope.row.merchant.is_trader ? '自营' : '非自营' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品信息" min-width="330">
          <template slot-scope="scope">
            <div
              v-for="(val, i) in scope.row.orderProduct"
              :key="i"
              class="tabBox acea-row row-middle"
            >
              <div class="demo-image__preview">
                <el-image
                  :src="val.cart_info.product.image"
                  :preview-src-list="[val.cart_info.product.image]"
                />
              </div>
              <span
                class="tabBox_tit"
              >{{ val.cart_info.product.store_name + ' | ' }}{{ val.cart_info.productAttr.sku }}</span>
              <span class="tabBox_pice">
                {{ '￥'+ val.cart_info.productAttr.price + ' x '+ val.product_num }}
                <em
                  v-if="val.refund_num < val.product_num && val.refund_num  > 0"
                  style="color: red;font-style: normal;"
                >(-{{ val.product_num - val.refund_num }})</em>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="实际支付" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.pay_price }}</span>
            <p v-if="scope.row.finalOrder">尾款：{{ scope.row.finalOrder.pay_price }}</p>
          </template>
        </el-table-column>
        <el-table-column label="订单佣金" min-width="100">
          <template slot-scope="scope">
            <span>{{ (parseFloat(scope.row.extension_one) + parseFloat(scope.row.extension_two) + parseFloat(scope.row.refund_extension_one) + parseFloat(scope.row.refund_extension_two)).toFixed(2) }}</span>
            <em v-if="(scope.row.refund_extension_one > 0) || (scope.row.refund_extension_two > 0)" style="color: red;font-style: normal;">(-{{ (parseFloat(scope.row.refund_extension_one)+parseFloat(scope.row.refund_extension_two)).toFixed(2) }})</em>
          </template>
        </el-table-column>
        <el-table-column label="支付类型" min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.paid === 1">{{ scope.row.pay_type | orderPayType }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="支付状态" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.paid == 0 ? "未支付" : "已支付" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.is_del === 0">
              <span v-if="scope.row.paid === 0">待付款</span>
              <span v-else>
                <span v-if="scope.row.order_type === 0 || scope.row.order_type === 2">{{ scope.row.status | orderStatusFilter }}</span>
                <span v-else>{{ scope.row.status | takeOrderStatusFilter }}</span>
              </span>
            </span>
            <span v-else>已删除</span>
          </template>
        </el-table-column>
        <el-table-column prop="serviceScore" label="下单时间" min-width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="推广人" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.spread && scope.row.spread.nickname || '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上级推广人" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.TopSpread && scope.row.TopSpread.nickname || '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="80" fixed="right" align="center">
          <template slot-scope="scope">
            <span v-for="(val, i ) in scope.row.orderProduct" :key="i">
              <el-button
                v-if="orderFilter(scope.row)"
                type="text"
                size="small"
                @click="onRefundDetail(scope.row.order_sn)"
              >查看退款单</el-button>
            </span>
            <el-button type="text" size="small" @click="onOrderDetails(scope.row.order_id)">详情</el-button>
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
    <!--用户信息-->
    <el-dialog v-if="uid" title="用户详情" :visible.sync="visibleDetail" width="1000px" :before-close="Close">
      <user-details v-if="visibleDetail" ref="userDetails" :uid="uid" :cancel-time="cancel_time" />
    </el-dialog>
    <!--导出订单列表-->
    <file-list ref="exportList" />
    <!--详情-->
    <order-detail
      ref="orderDetail"
      :orderId="orderId"
      @closeDrawer="closeDrawer"
      @changeDrawer="changeDrawer"
      :drawer="drawer"
    ></order-detail>
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
import { orderListApi, chartApi, cardListApi, exportOrderApi } from "@/api/order";
import { merSelectApi } from "@/api/product";
import userDetails from '../../user/list/userDetails';
import orderDetail from './orderDetails.vue';
import fileList from '@/components/exportFile/fileList';
import createWorkBook from '@/utils/newToExcel.js';
import cardsData from "@/components/cards/index";
import { fromList } from "@/libs/constants.js";
export default {
  components: { orderDetail, cardsData, fileList, userDetails },
  data() {
    return {
      orderId: 0,
      tableData: {
        data: [],
        total: 0,
      },
      activity: [
        {name: "普通订单",type: 0},
        {name: "秒杀订单",type: 1},
        {name: "预售订单",type: 2},
        {name: "助力订单",type: 3},
        {name: "拼团订单",type: 4}
      ],
      listLoading: true,
      tableFrom: {
        order_sn: this.$route.query.order_sn ? this.$route.query.order_sn : "",
        group_order_sn: '',
        keywords: "",
        username: "",
        store_name: "",
        status: "",
        date: "",
        mer_id: "",
        page: 1,
        limit: 20,
        is_trader: '',
        filter_delivery: '',
        filter_product : '',
        activity_type: ''
      },
      dliveryWayList: [
        { value: 1, label: '快递订单' },
        { value: 2, label: '配送订单' },
        { value: 4, label: '核销订单' },
        { value: 3, label: '虚拟发货' },
        { value: 6, label: '自动发货' }
      ], //发货方式
      productTypeList: [
        { value: 1, label: '实物商品' },
        { value: 2, label: '虚拟商品' },
        { value: 3, label: '卡密商品' }
      ], //商品类型
      orderChartType: {},
      headeNum: [],
      timeVal: [],
      fromList: fromList,
      selectionList: [],
      ids: "",
      uid: "",
      visibleDetail: false,
      tableFromLog: {
        page: 1,
        limit: 10,
      },
      tableDataLog: {
        data: [],
        total: 0,
      },
      LogLoading: false,
      dialogVisible: false,
      cardLists: [],
      orderDatalist: null,
      merSelect: [],
      drawer: false,
    };
  },
  mounted() {
    if (this.$route.query.hasOwnProperty("order_sn")) {
      this.tableFrom.order_sn = this.$route.query.order_sn;
    } else {
      this.tableFrom.order_sn = "";
    }
    this.headerList();
    this.getMerSelect();
    this.getCardList()
    this.getList('');
  },
  // 被缓存接收参数
  activated() {
    if (this.$route.query.hasOwnProperty("order_sn")) {
      this.tableFrom.order_sn = this.$route.query.order_sn;
    } else {
      this.tableFrom.order_sn = "";
    }
    this.headerList();
    this.getMerSelect();
    this.getCardList()
    this.getList('');
  },
  methods: {
    // 退款详情页
    onRefundDetail(sn) {
      console.log(sn, "sn");
      this.$router.push({
        path: "refund",
        query: {
          sn: sn,
        },
      });
    },
    // 订单筛选
    orderFilter(item) {
      let status = false;
      item.orderProduct.forEach((el) => {
        if (el.refund_num > 0 && el.refund_num < el.product_num) {
          status = true;
        }
      });
      return status;
    },
    // 表格某一行添加特定的样式
    addTdClass(val) {
      if (val.row.status > 0 && val.row.paid == 1) {
        for (let i = 0; i < val.row.orderProduct.length; i++) {
          if (val.row.orderProduct[i].refund_num > 0 && val.row.orderProduct[i].refund_num < val.row.orderProduct[i].product_num) {
            return "row-bg";
          }
        }
      } else {
        return " ";
      }
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
    // 用户信息
    onUserDetails(uid) {
      this.uid = uid
      this.visibleDetail = true
    },
    Close() {
      this.visibleDetail = false
    },
    async exports() {
      let excelData = JSON.parse(JSON.stringify(this.tableFrom)), data = []
      excelData.page = 1
      let pageCount = 1
      let lebData = {};
      for (let i = 0; i < pageCount; i++) {
        lebData = await this.downData(excelData)
        pageCount = Math.ceil(lebData.count/excelData.limit)
        if (lebData.export.length) {
          data = data.concat(lebData.export)
          excelData.page++
        }  
      }
      createWorkBook(lebData.header, lebData.title, data, lebData.foot,lebData.filename);
      return
    },
    /**订单列表 */
    downData(excelData) {
      return new Promise((resolve, reject) => {
        exportOrderApi(excelData).then((res) => {
          return resolve(res.data)
        })
      })
    },
    // 导出
    exportRecord() {
      exportOrderApi(this.tableFrom)
        .then((res) => {
          const h = this.$createElement;
          this.$msgbox({
            title: '提示',
            message: h('p', null, [
              h('span', null, '文件正在生成中，请稍后点击"'),
              h('span', { style: 'color: teal' }, '导出记录'),
              h('span', null, '"查看~ '),
            ]),
            confirmButtonText: '我知道了',
          }).then(action => {

          });
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    // 导出列表
    getExportFileList() {
      this.$refs.exportList.exportFileList()
    },
    // 详情
    onOrderDetails(id) {
      this.orderId = id;
      this.$refs.orderDetail.getInfo(id);
      this.drawer = true;
      // this.$refs.orderDetail.onOrderDetails(id);
      // this.$refs.orderDetail.onOrderLog(id);
    },
    changeDrawer(v) {
      this.drawer = v;
    },
    closeDrawer() {
      this.drawer = false;
    },
    pageChangeLog(page) {
      this.tableFromLog.page = page;
      this.getList('');
    },
    handleSizeChangeLog(val) {
      this.tableFromLog.limit = val;
      this.getList('');
    },
    // 选择时间
    selectChange(tab) {
      this.tableFrom.date = tab;
      this.tableFrom.page = 1;
      this.timeVal = [];
      this.getCardList()
      this.getList(1);
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e;
      this.tableFrom.date = e ? this.timeVal.join("-") : "";
      this.tableFrom.page = 1;
      this.getCardList()
      this.getList(1);
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      orderListApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
        //   this.cardLists = res.data.stat;
          this.listLoading = false;
        //   this.getCardList();
        })
        .catch((res) => {
          this.$message.error(res.message);
          this.listLoading = false;
        });
    },
    getCardList(){
        cardListApi(this.tableFrom)
        .then((res) => {
          this.cardLists = res.data;
        })
        .catch((res) => {
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
    headerList() {
      chartApi()
        .then((res) => {
          this.orderChartType = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.demo-table-expand {
  /deep/ label {
    width: 83px !important;
  }
}
.selWidth {
  width: 300px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 12px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.tabBox_tit {
  width: 60%;
  font-size: 12px !important;
  margin: 0 2px 0 10px;
  letter-spacing: 1px;
  padding: 5px 0;
  box-sizing: border-box;
}

/deep/.row-bg {
  .cell {
    color: red !important;
  }
}
</style>
