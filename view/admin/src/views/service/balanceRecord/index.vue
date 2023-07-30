<template>
  <div class="divBox">
    <el-card class="box-card">
       <!-- <div slot="header" class="clearfix">
            <div class="content acea-row row-middle">
                <div class="demo-basic--circle acea-row row-middle">
                    <el-avatar :size="50" class="dashboard-workplace-header-avatar" :src="imgUrl" />
                        <div class="dashboard-workplace-header-tip">
                            <div class="dashboard-workplace-header-tip-title">{{smsAccount}}，祝您每一天开心！</div>                           
                        </div>
                </div>
            </div>
       </div> -->
      <div class="filter-container">
        <div class="demo-input-suffix acea-row">
          <el-form inline size="small">    
            <!-- <el-form-item label="时间选择：">
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
            <el-form-item label="购买类型：">
              <el-select
                v-model="tableFrom.type"
                clearable
                filterable
                placeholder="请选择"
                class="selWidth"
                @change="getList(1)"
              >
                <el-option
                  v-for="item in purchaseList"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type"
                />
              </el-select>
            </el-form-item> -->
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
          </el-form>
        </div>     
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
      >
        <el-table-column label="序号" min-width="100">
          <template scope="scope">
            <span>{{ scope.$index+(tableFrom.page - 1) * tableFrom.limit + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="mer_name"
          label="商户名称"
          min-width="150"
        /> 
        <el-table-column
          prop="copy_product_num"
          label="复制商品剩余次数"
          min-width="150"
        /> 
        <el-table-column
          prop="export_dump_num"
          label="电子面单剩余次数"
          min-width="150"
        /> 
                    
        <el-table-column
          prop="create_time"
          label="购买时间"
          min-width="180"
        />
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
import { merBalanceLst } from '@/api/setting'
import { merSelectApi } from "@/api/product";
import { fromList } from "@/libs/constants.js";
export default {
  name: 'serviceSetting',
  data() {
    return {
      smsAccount: 'tangkai',
      imgUrl: require('@/assets/images/ren.png'),
      headeNum: [
        {type: 1,title: "平台购买记录"},
        {type: 2,title: "商户购买记录"}
      ],
      purchaseList: [
        {name: "短信",type: 1},
        {name: "电子面单",type: 2},
        {name: "商品采集",type: 3},
        {name: "物流查询",type: 4}
      ],
      merSelect: [],
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },
      fromList: fromList,
      timeVal: [],
      fullscreenLoading: false,
      tableFrom: {
        page: 1,
        limit: 20,
        way: '1',
        type: '',
        mer_id: '',
        keyword: '',
        date: ''
      }

    }
  },
  mounted() {
    this.getList('');
    this.getMerSelect();
  },
  methods: {
      // 选择时间
    selectChange(tab) {
      this.tableFrom.date = tab;
      this.tableFrom.page = 1;
      this.timeVal = [];
      this.getList(1);
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e;
      this.tableFrom.date = e ? this.timeVal.join("-") : "";
      this.tableFrom.page = 1;
      this.getList(1);
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page;
      merBalanceLst(this.tableFrom).then(res => {
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
      this.getList(1)
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
  }
}
</script>

<style scoped lang="scss">
  .content{
    justify-content: space-between;
  }
  .dashboard-workplace-header-tip {
    display: inline-block;
    vertical-align: middle;
  }
  .dashboard-workplace-header-tip-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
  }
  .dashboard-workplace-header-avatar{
      margin-right: 16px;
  }
.filter-container .filter-item{
  margin-bottom: 0;
}
/deep/ .el-input--medium .el-input__inner{
  line-height: 32px;
  height: 32px;
}
.demo-table-expand .el-form-item{
  width: 100%;
}
.dialog-footer{
  text-align: center;
}
</style>
