<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" inline label-width="80px">
            <el-form-item label="订单状态：">
              <el-select
                v-model="tableFrom.status"
                placeholder="请选择"
                class="filter-item selWidth"
                clearable
                @change="getList(1)"
              >
                <el-option label="全部" value="" />
                <el-option label="待付款" :value="-3" />
                <el-option label="待发货" :value="0" />
                <el-option label="待收货" :value="1" />
                <el-option label="交易完成" :value="3" />
                <el-option label="已删除" :value="-10" />
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间：" prop="date">
              <el-date-picker
                v-model="timeVal"
                value-format="yyyy/MM/dd"
                align="right"
                unlink-panels
                format="yyyy/MM/dd"
                size="small"
                type="daterange"
                placement="bottom-end"
                placeholder="自定义时间"
                class="selWidth"
                :picker-options="pickerOptions"
                @change="onchangeTime"
              />
            </el-form-item>
            <el-form-item label="搜索：" class="width100" style="display: inline-block;">
              <el-input placeholder="请输入内容" v-model="keywords" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="订单号" value="order_sn"></el-option>
                  <el-option label="UID" value="uid"></el-option>
                  <el-option label="用户姓名" value="nickname"></el-option>
                  <el-option label="用户电话" value="phone"></el-option>
                </el-select>
                <el-button slot="append" type="primary" style="background-color:#1890ff;border-color:#1890ff;color:#fff;border-radius:0 4px 4px 0;" icon="el-icon-search" @click="changeSearch"></el-button>
              </el-input>
               
            </el-form-item>
            <el-button size="small" type="primary" icon="el-icon-top" @click="exports">导出</el-button>
          </el-form>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        class="table"
        highlight-current-row
        :cell-class-name="addTdClass"
      > 
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户备注：">
                <span>{{ props.row.mark | filterEmpty }}</span>
              </el-form-item>
              <el-form-item label="商家备注：">
                <span>{{ props.row.remark | filterEmpty }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单编号" min-width="150">
          <template slot-scope="scope">
            <span style="display: block;" v-text="scope.row.order_sn" />
            <span v-show="scope.row.is_del > 0" style="color: #ED4014;display: block;">用户已删除</span>
          </template>
        </el-table-column>
        <el-table-column prop="real_name" label="收货人" min-width="100" />
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
        <el-table-column label="兑换积分" prop="integral" min-width="80"/>
        <el-table-column label="兑换金额" prop="pay_price" min-width="80"/>
        <el-table-column label="订单状态" min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.is_del === 0">
              <span v-if="scope.row.paid === 0">待付款</span>
              <span v-else>
                <span>{{ scope.row.status | orderStatusFilter }}</span>
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
        <el-table-column label="操作" min-width="120" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.paid==1&&scope.row.status==0" type="text" size="small" @click="send(scope.row.order_id)">发送货</el-button>
            <el-button type="text" size="small" @click="onOrderDetails(scope.row.order_id)">订单详情</el-button>
            <el-button v-if="scope.row.is_del > 0" type="text" size="small" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
            
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
    <!--发送货-->
    <el-dialog title="订单发送货" :visible.sync="sendVisible" width="800px" :before-close="handleClose">
      <el-form ref="shipment" :model="shipment" :rules="rules" label-width="120px" @submit.native.prevent>
        <el-form-item label="选择类型：" prop="delivery_type">
          <el-radio-group v-model="shipment.delivery_type" @change="changeSend">
            <el-radio :label="1">手动发货</el-radio>
            <el-radio :label="3" class="radio"> 无需物流</el-radio>
            <el-radio :label="2">自己配送</el-radio>
          </el-radio-group>
        </el-form-item>
      
        <el-form-item v-if="shipment.delivery_type == 1" label="快递公司：" prop="delivery_name">
          <el-select
            filterable
            v-model="shipment.delivery_name"
            placeholder="请选择快递公司"
            class="filter-item selWidth mr20"
          >
            <el-option
              v-for="item in deliveryList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="shipment.delivery_type == 1" label="快递单号：" prop="delivery_id">
          <el-input v-model="shipment.delivery_id" placeholder="请输入快递单号" />
        </el-form-item>
        <el-form-item v-if="shipment.delivery_type == 2" label="送货人姓名：" prop="to_name">
          <el-input v-model="shipment.to_name"  maxlength="10" placeholder="请输入送货人姓名" />
        </el-form-item>
        <el-form-item v-if="shipment.delivery_type == 2" label="送货人手机号：" prop="to_phone">
          <el-input v-model="shipment.to_phone" placeholder="请输入送货人手机号" />
        </el-form-item>
        <el-form-item  label="备注：" prop="remark">
          <el-input v-model="shipment.remark" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="submitForm('shipment')">提交</el-button>
      </span>
    </el-dialog>
    <!--详情-->
    <order-detail
      ref="orderDetail"
      @closeDrawer="closeDrawer"
      @changeDrawer="changeDrawer"
      @send="send"
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
import { integralOrderLstApi, integralOrderExcelApi, expressOptionsApi, integralDelivery, integralOrderDeleteApi } from "@/api/marketing";
import orderDetail from './orderDetails.vue';
import createWorkBook from '@/utils/newToExcel.js';
import timeOptions from '@/utils/timeOptions';
export default {
  components: { orderDetail },
  data() {
    return {
      select: "",
      keywords: "",
      orderId: 0,
      tableData: {
        data: [],
        total: 0,
      },
      pickerOptions: timeOptions,
      listLoading: true,
      tableFrom: {
        keywords: "",
        status: "",
        date: "",
        page: 1,
        limit: 20,
        product_id: '',
      },
      timeVal: [],
      ids: "",
      uid: "",
      visibleDetail: false,
      tableFromLog: {
        page: 1,
        limit: 10,
      },
      loading: false,
      dialogVisible: false,
      cardLists: [],
      orderDatalist: null,
      shipment: {
        delivery_type: 1
      },
      deliveryList: [],
      drawer: false,
      sendVisible: false,
      rules: {
        delivery_type: [
          { required: true, message: '请选择发送货方式', trigger: 'change' }
        ],
        delivery_name: [
          { required: true, message: '请选择快递公司', trigger: 'change' }
        ],
        to_name: [
          { required: true, message: '请输入送货人姓名', trigger: 'blur' }
        ],
        delivery_id: [
          { required: true, message: '请输入快递单号', trigger: 'blur' }
        ],
        to_phone: [
          { required: true, message: '请输入送货人手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
    };
  },
    watch: {
    '$route.query.id': {   
      handler: function(val) {
        this.tableFrom.product_id  = val || ""
        this.getList('');
      },
      immediate: false,
      deep: true
    },
  },
  mounted() {
    if (this.$route.query.id) {
      this.tableFrom.product_id = this.$route.query.id;
    } else {
      this.tableFrom.product_id = "";
    }
    this.getExpressLst();
    this.getList('');
  },
  // 被缓存接收参数
  activated() {
    if (this.$route.query.id) {
      this.tableFrom.product_id = this.$route.query.id;
    } else {
      this.tableFrom.product_id = "";
    }
    this.getList('');
  },
  methods: {
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
        integralOrderExcelApi(excelData).then((res) => {
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
    // 订单删除
    handleDelete(row, idx) {
      this.$modalSure().then(() => {
        integralOrderDeleteApi(row.order_id)
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
    // 获取快递公司列表
    getExpressLst() {
      expressOptionsApi().then((res) => {
        this.deliveryList = res.data
      }).catch((res) => {
        this.$message.error(res.message)
      })
    },
    // 发货
    send(id) {
      this.sendVisible = true
      this.orderId = id
      this.sendReset();
    },
    sendReset() {
      this.shipment = {
        delivery_type: 1,
        delivery_name: '',
        delivery_id: '',
        from_name: '',
        from_addr: '',
        from_tel: '',
        remark: ''
      }
    },
    changeSend() {
      this.$refs['shipment'].clearValidate();
    },
    handleClose() {
      this.sendVisible = false
      this.$refs['shipment'].resetFields()
    },
    submitForm(name) {
      if (this.shipment.delivery_type == 2) {
        this.shipment.delivery_name = this.shipment.to_name
        this.shipment.delivery_id = this.shipment.to_phone
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true;
          delete this.shipment.to_name;
          delete this.shipment.to_phone;
          integralDelivery(this.orderId, this.shipment).then(res => {
              this.sendVisible = false;
              this.$message.success(res.message);
              this.getList('');
              this.loading = false;
            
              // this.sendReset()
            }).catch(({ message }) => {
              this.$message.error(message);
              this.loading = false;
            })
        } else {
          return
        }
      })
    },
    // 详情
    onOrderDetails(id) {
      this.orderId = id;
      this.$refs.orderDetail.getInfo(id);
      this.drawer = true;
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
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e;
      this.tableFrom.date = e ? this.timeVal.join('-') : '';
      this.getList(1);
    },
    changeSearch(){
      this.resetSearchVal();
      switch(this.select){
        case "uid":
          this.tableFrom.uid = this.keywords;
          this.getList(1);
          break;
        case "nickname":
          this.tableFrom.nickname = this.keywords;
          this.getList(1);
          break;
        case "phone":
          this.tableFrom.phone = this.keywords;
          this.getList(1);
          break;
        case "order_sn":
          this.tableFrom.order_sn = this.keywords;
          this.getList(1);
          break;
        case "mer_name":
          this.tableFrom.mer_name = this.keywords;
          this.getList(1);
          break;
        default:
          this.tableFrom.keywords = this.keywords;
          this.getList(1);
          break;
      }

    },
    resetSearchVal(){
      this.tableFrom.mer_name="";
      this.tableFrom.order_sn="";
      this.tableFrom.phone="";
      this.tableFrom.nickname="";
      this.tableFrom.uid="";
      this.tableFrom.keywords="";
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      integralOrderLstApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
          this.listLoading = false;
        })
        .catch((res) => {
          this.$message.error(res.message);
          this.listLoading = false;
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
  },
};
</script>

<style lang="scss" scoped>
.demo-table-expand {
  /deep/ label {
    width: 83px !important;
  }
}
/deep/.el-input-group__prepend .el-input{
  width: 90px;
}
/deep/.el-input-group__prepend div.el-select .el-input__inner{
  padding: 0 10px;
  display: block;
  font-size: 13px;
}
.selWidth {
  width: 260px;
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
