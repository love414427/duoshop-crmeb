<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="filter-container">
            <el-form size="small" inline label-width="100px">
                <el-form-item label="时间选择：" class="width100">
                   <el-radio-group v-model="tableFrom.date" type="button" class="mr20" size="small" @change="selectChange(tableFrom.date)">
                        <el-radio-button v-for="(item,i) in fromList.fromTxt" :key="i" :label="item.val">{{ item.text }}</el-radio-button>
                    </el-radio-group>
                    <el-date-picker v-model="timeVal" value-format="yyyy/MM/dd" format="yyyy/MM/dd" size="small" type="daterange" placement="bottom-end" placeholder="自定义时间" style="width: 250px;" @change="onchangeTime" />     
                </el-form-item>
                <el-form-item label="优惠券类型：" class="width100">
                     <el-select v-model="tableFrom.coupon_type" placeholder="请选择" class="filter-item selWidth mr20" clearable @change="getList(1)">
                        <el-option label="全部" value="" />
                        <el-option label="店铺券" :value="0" />
                        <el-option label="商品券" :value="1" />
                    </el-select>
                </el-form-item>
                <el-form-item label="优惠券名称：" class="width100">
                  <el-input v-model="tableFrom.coupon_name" @keyup.enter.native="getList(1)" placeholder="请输入优惠券名称" class="selWidth mr20" @change="getList(1)" clearable> 
                    <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
                  </el-input>             
                </el-form-item>               
            </el-form>             
        </div>       
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        highlight-current-row
      >
        <el-table-column
          prop="coupon_send_id"
          label="ID"
          min-width="80"
        />
        <el-table-column
          prop="title"
          label="优惠劵名称"
          min-width="200"
        />
        <el-table-column
          label="优惠劵类型"
          min-width="90"
        >
          <template slot-scope="{ row }">
            <span>{{ row.type | couponTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          min-width="200"
          label="发送日期"
        />         
        <el-table-column
          min-width="200"
          label="使用有效期"
        >
          <template slot-scope="{ row }">
            <div v-if="row.use_start_time && row.use_end_time">
              {{ row.use_start_time }} <br/>- {{ row.use_end_time }}
            </div>
            <span v-else>{{ row.coupon_time }}天</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="200"
          label="筛选条件"
        >
          <template slot-scope="{ row }">
            <span v-if="!row.mark.search">无</span>
            <div v-else>
              <span v-if="row.mark.search['用户标签']">
                  用户标签:{{row.mark.search['用户标签']}}
              </span>
              <span v-if="row.mark.search['用户类型']">
                  用户类型:{{row.mark.search['用户类型']}}
              </span>
              <span v-if="row.mark.search['性别']">
                  性别:{{row.mark.search['性别']}}
              </span>
              <span v-if="row.mark.search['消费情况']">
                  消费情况:{{row.mark.search['消费情况']}}
              </span>
              <span v-if="row.mark.search['身份']">
                  身份:{{row.mark.search['身份']}}
              </span>
              <span v-if="row.mark.search['访问情况']">
                  访问情况:{{row.mark.search['访问情况']}}
              </span>
              <span v-if="row.mark.search['访问时间']">
                  访问时间:{{row.mark.search['访问时间']}}
              </span>
              <span v-if="row.mark.search['昵称']">
                  昵称:{{row.mark.search['昵称']}}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="200"
          label="使用情况"
        >
          <template slot-scope="{ row }">
            <div>
              <span>发放数量：{{ row.coupon_num }}</span>
              <span class="sheng">发放使用数量：{{ row.useCount }}</span>
            </div>
          </template>
        </el-table-column>
       
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="mr10" @click="details(scope.row)">详情</el-button>
            <el-button type="text" size="small" class="mr10" @click="usedRecord(scope.row.coupon_send_id)">使用记录</el-button>
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
    <!--优惠券详情-->
    <el-dialog title="优惠券详情" :visible.sync="detailDialog" width="700px" v-if="detailDialog">
      <div>
        <div class="box-container">
          <div class="list sp">
            <label class="name">优惠券名称：</label>
            <span class="info">{{ couponDetail.title }}</span>
          </div>
          <div class="list sp">
            <label class="name">优惠券类型：</label>
            <span class="info">{{ couponDetail.type | couponTypeFilter }}</span>
          </div>
          <div class="list sp">
            <label class="name">优惠券面值：</label>
            <span class="info">{{ couponDetail.coupon_price }}</span>
          </div>
          <div class="list sp">
            <label class="name">使用门槛：</label>
            <span class="info">{{ couponDetail.use_min_price == '0.00' ? "无门槛" : "最低消费"+couponDetail.use_min_price }}</span>
          </div>
          <div class="list sp100">
            <label class="name">使用有效期：</label>
            <span v-if="couponDetail.coupon_time && couponDetail.coupon_type == 0" class="info">{{ couponDetail.coupon_time  }}天</span>
            <span v-else-if="couponDetail.coupon_type == 1" class="info">{{ couponDetail.use_start_time + " - " + couponDetail.use_end_time }}</span>
          </div>
          <div class="list sp100">
            <label class="name">领取时间：</label>
            <span class="info" v-if="couponDetail.is_timeout == 1">{{ couponDetail.start_time }} - {{ couponDetail.end_time }}</span>
            <span v-else class="info">不限时</span>
          </div>
          <div class="list sp">
            <label class="name">类型：</label>
            <span class="info">{{ couponDetail.send_type | couponUseTypeFilter }}</span>
          </div>
          <div class="list sp">
            <label class="name">是否限量：</label>
            <span class="info">{{ couponDetail.is_limited | filterClose }}</span>
          </div>
          <div class="list sp">
            <label class="name">已发布总数：</label>
            <span class="info">{{ couponDetail.is_limited == 0 ? "不限量" : couponDetail.total_count }}</span>
          </div>
          <div class="list sp">
            <label class="name">剩余总数：</label>
            <span class="info">{{ couponDetail.is_limited == 0 ? "不限量" : couponDetail.remain_count }}</span>
          </div>
          <!-- <div class="list sp">
            <label class="name">已领取总数：</label>
            <span class="info">{{ couponDetail.send_num  }}</span>           
          </div> -->
          <div class="list sp">
            <label class="name">已发送总数：</label>
            <span class="info">{{ couponDetail.coupon_num  }}</span>           
          </div>
          <div class="list sp">
            <label class="name">已使用总数：</label>
            <span class="info" style="color: red;">{{ couponDetail.useCount }}</span>
          </div>
          <div class="list sp">
            <label class="name">发放筛选条件：</label>           
            <span v-if="!couponDetail.mark.search">无</span>
            <span v-else>
              <span class="condition" v-if="couponDetail.mark.search['用户标签']">
                  用户标签:{{couponDetail.mark.search['用户标签']}}
              </span>
              <span class="condition" v-if="couponDetail.mark.search['用户类型']">
                  用户类型:{{couponDetail.mark.search['用户类型']}}
              </span>
              <span class="condition" v-if="couponDetail.mark.search['性别']">
                  性别:{{couponDetail.mark.search['性别']}}
              </span>
              <span class="condition" v-if="couponDetail.mark.search['消费情况']">
                  消费情况:{{couponDetail.mark.search['消费情况']}}
              </span>
              <span class="condition" v-if="couponDetail.mark.search['身份']">
                  身份:{{couponDetail.mark.search['身份']}}
              </span>
              <span class="condition" v-if="couponDetail.mark.search['访问情况']">
                  访问情况:{{couponDetail.mark.search['访问情况']}}
              </span>
              <span class="condition" v-if="couponDetail.mark.search['访问时间']">
                  访问时间:{{couponDetail.mark.search['访问时间']}}
              </span>
              <span class="condition" v-if="couponDetail.mark.search['昵称']">
                  昵称:{{couponDetail.mark.search['昵称']}}
              </span>
            </span>
          </div>
          <div class="list sp">
            <label class="name">排序：</label>
            <span class="info">{{ couponDetail.sort }}</span>
          </div>
          <div class="list sp">
            <label class="name">状态：</label>
            <span class="info">{{ couponDetail.status ? "开启" : "关闭" }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--领取记录-->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      min-width="500px"
      :before-close="handleClose"
      class="modalbox"
    >
      <div class="header clearfix">
        <div class="filter-container">
            <div class="demo-input-suffix acea-row">
                <span class="seachTiele">优惠券获取方式：</span>
                <el-select v-model="tableFromIssue.type" placeholder="请选择" class="filter-item selWidth mr20" clearable @change="getIssueList()">
                    <el-option label="全部" value="" />
                    <el-option label="自己领取" value="receive" />
                    <el-option label="后台发送" value="send" />
                    <el-option label="新人赠送" value="new" />
                    <el-option label="买东西赠送" value="buy" />
                </el-select>
            </div>
         </div>
      </div>
      <el-table
        v-loading="Loading"
        :data="issueData.data"
        style="width: 100%; margin-top: 15px;"
        size="small"
        highlight-current-row
      >
        <el-table-column
          prop="user.nickname"
          label="用户名"
          min-width="120"
        />
        <el-table-column label="用户头像" min-width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.user && scope.row.user.avatar" class="demo-image__preview">
              <img
                style="width: 36px; height: 36px"
                :src="scope.row.user.avatar"
              />
            </div>
            <div v-else class="demo-image__preview">
              <img
                style="width: 36px; height: 36px"
                src="../../../../assets/images/f.png"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="200"
          label="优惠券获取方式"
        >
          <template slot-scope="scope">
            
            <span>{{ scope.row.type == 'receive' ? '自己领取' : scope.row.type == 'send' ? '后台发送' : scope.row.type == 'new' ? '新人' : '买赠送' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="使用情况"
          min-width="180"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.use_time">{{scope.row.use_time}}</span>
            <span v-else>未使用</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          :page-size="tableFromIssue.limit"
          :current-page="tableFromIssue.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="issueData.total"
          @size-change="handleSizeChangeIssue"
          @current-change="pageChangeIssue"
        />
      </div>
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
import { couponSendLstApi, issueApi, couponDetailApi } from '@/api/marketing'
import { roterPre } from '@/settings'
export default {
  name: 'CouponList',
  data() {
    return {
      Loading: false,
      dialogVisible: false,
      detailDialog: false,
      roterPre: roterPre,
      listLoading: true,
      title: "领取记录",
      receiveTime: "领取时间",
      receiveType: 0,
      timeVal: [],
      fromList: {
         title: "选择时间",
            custom: true,
            fromTxt: [{
                text: "全部",
                 val: ""
            },
            {
                text: "今天",
                val: "today"
            },
            {
                text: "昨天",
                val: "yesterday"
            },
            {
                text: "最近7天",
                val: "lately7"
            },
            {
                text: "最近30天",
                val: "lately30"
            },
            {
                text: "本月",
                val: "month"
            },
            {
                text: "本年",
                val: "year"
            },
            ],       
        },
      tableData: {
        data: [],
        total: 0
      },
      tableFrom: {
        page: 1,
        limit: 20,
        status: '',
        coupon_name: '',
        coupon_type: '',
        send_type: '',
        date: ''
      },
      tableFromIssue: {
        page: 1,
        limit: 10,
        send_id: 0,
        type: ''       
      },
      issueData: {
        data: [],
        total: 0
      },
      couponDetail: {}
    }
  },
  mounted() {
    this.getList(1)
  },
  methods: {   
    handleClose() {
      this.dialogVisible = false
    },
    // 详情
    details(row){
      this.detailDialog = true;
      this.couponDetail = row;    
    },
    // 使用记录
    usedRecord(id) {
      this.dialogVisible = true
      this.title="使用记录"
      this.receiveTime="使用时间"
      this.receiveType = 1
      this.tableFromIssue.send_id = id
      this.tableFromIssue.type = 'send'
      this.tableFromIssue.page = 1
      this.getIssueList()
    },
    // 选择时间
        selectChange(tab) {
            this.timeVal = [];
            this.tableFrom.date = tab;
            this.getList(1);
        },
        // 具体日期
        onchangeTime(e) {
            this.timeVal = e;
            this.tableFrom.date = e ? this.timeVal.join("-") : "";
            this.getList(1);
        },
    // 列表
    getIssueList() {
      this.Loading = true
      issueApi(this.tableFromIssue).then(res => {
        this.issueData.data = res.data.list
        this.issueData.total = res.data.count
        this.Loading = false
      }).catch(res => {
        this.Loading = false
        this.$message.error(res.message)
      })
    },
    pageChangeIssue(page) {
      this.tableFromIssue.page = page
      this.getIssueList()
    },
    handleSizeChangeIssue(val) {
      this.tableFromIssue.limit = val
      this.getIssueList()
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page
      couponSendLstApi(this.tableFrom).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.listLoading = false
      }).catch(res => {
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
    }
   
  }
}
</script>

<style scoped lang="scss">
  .modalbox{
    /deep/.el-dialog{
      min-width: 550px;
    }
  }
  .selWidth{
    width: 260px !important;
  }
  .seachTiele{
    line-height: 35px;
  }
  .fa{
    color: #0a6aa1;
    display: block;
  }
  .sheng{
    color: #ff0000;
    display: block;
  }
  .ml20{
    margin-left: 20px;
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
    width: 120px;
    text-align: right;
    color: #606266;
  }
  .box-container .list .blue {
    color: #1890ff;
  }
  .box-container .list.image {
    margin-bottom: 40px;
  }
  .box-container .list.image img {
    position: relative;
    top: 40px;
  }
  .condition{
      display: block;
      margin-left: 120px;
      &:first-child{
          display: inline;
          margin-left: 0;
      }
  }
</style>
