<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
            <!--<el-tabs v-model="tableFrom.type" @tab-click="getList">-->
            <!--<el-tab-pane label="全部订单" name="" />-->
            <!--<el-tab-pane label="普通订单" name="1" />-->
            <!--<el-tab-pane label="拼团订单" name="2" />-->
            <!--<el-tab-pane label="秒杀订单" name="3" />-->
            <!--<el-tab-pane label="砍价订单" name="4" />-->
            <!--</el-tabs>-->
            <div class="container">
                <el-form size="small" label-width="100px" inline>                   
                    <el-form-item label="时间选择：">
                        <el-radio-group v-model="tableFrom.date" type="button" class="mr20" size="small" @change="selectChange(tableFrom.date)">
                            <el-radio-button v-for="(item,i) in fromList.fromTxt" :key="i" :label="item.val">{{ item.text }}</el-radio-button>
                        </el-radio-group>
                        <el-date-picker v-model="timeVal" value-format="yyyy/MM/dd" format="yyyy/MM/dd" size="small" type="daterange" placement="bottom-end" placeholder="自定义时间" style="width: 250px;" @change="onchangeTime" />
                    </el-form-item>
                  
                    <el-form-item label="消息名称：">
                        <el-input v-model="tableFrom.keyword" @keyup.enter.native="getLists(1)" placeholder="请输入消息名称" class="selWidth" size="small">
                            <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getLists(1)" />
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
        @expand-change="handleRead"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
      >
        <el-table-column label="序号" min-width="50">
          <template scope="scope">
            <span>{{ scope.$index+(tableFrom.page - 1) * tableFrom.limit + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="消息名称"
          min-width="150"
        >
          <template scope="scope">
            <span class="circle" :class="scope.row.is_read === 0 ? 'red' : 'gray'"></span>
            <span :class="scope.row.is_read === 0 ? 'unread' : 'read'">{{ scope.row.notice_title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="日期"
          min-width="180"
        >
          <template scope="scope">
            <span :class="scope.row.is_read === 0 ? 'unread' : 'read'">{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item>
                <span style="color: #333;">{{ (props.row.notice_content) ? props.row.notice_content : ''}}</span>
              </el-form-item>
            </el-form>
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
import { stationNewsList, stationNoticeRead } from '@/api/system'
import { roterPre } from '@/settings'
export default {
  name: 'SystemLog',
  data() {
    return {
      props: {
        emitPath: false
      },
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },
      dialogVisible: false,
      categoryList: [],
      merCateList: [],
      merSelect: [],
      fullscreenLoading: false,
      roterPre: roterPre,
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
      tableFrom: {
        page: 1,
        limit: 20,
        date: "",
        keyword: '',  
      },
      // 要展开的行，数值的元素是row的key值
      expands: [],
      idx: 0
    }
  },
  mounted() {
    this.getList('');
  },
  methods: {
    // 获取row的key值
    getRowKeys(row) {
      return row.notice_log_id;
    },
     // 选择时间
        selectChange(tab) {
            this.timeVal = [];
            this.tableFrom.date = tab;
            this.getLists(1);
        },
        // 具体日期
        onchangeTime(e) {
            this.timeVal = e;
            this.tableFrom.date = e ? this.timeVal.join("-") : "";
            this.getLists(1);
        },
    // 列表
    getList(num) {
      let that = this
      that.listLoading = true
      that.tableFrom.page = num ? num : that.tableFrom.page;
      stationNewsList(that.tableFrom).then(res => {
        that.tableData.data = res.data.list
        that.tableData.total = res.data.count
        that.listLoading = false
        if(that.$route.params.id){
          that.handleRead({notice_log_id: that.$route.params.id,is_read: 0})
          that.tableData.data.forEach((item,index)  => {
            if (item.notice_log_id == that.$route.params.id) {
              that.idx = index
              console.log(that.idx)
              that.expands.push(that.tableData.data[that.idx].notice_log_id);
            }
          })
        }
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
      })
    },
     // 列表
    getLists(num) {
      let that = this
      that.listLoading = true
      that.tableFrom.page = num ? num : that.tableFrom.page;
      stationNewsList(that.tableFrom).then(res => {
        that.tableData.data = res.data.list
        that.tableData.total = res.data.count
        that.listLoading = false
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
      })
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getLists('')
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getLists(1)

    },
    handleRead(data){
      if(data.is_read === 0){
        stationNoticeRead(data.notice_log_id).then(res => {
          this.listLoading = false
          data.is_read = 1
          if(this.$route.params.id && this.tableFrom.page === 1){
            this.tableData.data[this.idx].is_read = 1
          }
          // this.$refs.headerNotice.getList("");
        }).catch(res => {
          this.listLoading = false
          this.$message.error(res.message)
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.filter-container .filter-item{
  margin-bottom: 0;
}
/deep/ .el-input--medium .el-input__inner{
  line-height: 32px;
  height: 32px;
}
/deep/ .demo-table-expand .el-form-item{
  width: 100%;
}
/deep/ .el-table__expanded-cell,/deep/ .el-table__expanded-cell:hover{
  background-color: #f4f5f9!important;
}
.read{
  color: #999;
}
.circle{
  display: inline-block;
  height: 8px;
  width: 8px;
  border-radius: 100%;
  box-shadow: 0 0 0 1px #fff;
}
.red{
  background: #ed4014;
}
.gray{
  background: #c5c8ce;
}
/deep/ .el-table th:nth-child(2){
  padding-left: 15px;
}
</style>
