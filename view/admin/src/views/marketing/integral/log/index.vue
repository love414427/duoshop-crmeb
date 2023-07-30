<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
            <cards-data :card-lists="cardLists" />
          <el-form inline size="small" label-width="80px">
            <el-form-item label="搜索：">
              <el-input v-model="tableFrom.keyword" @keyup.enter.native="getList(1)" placeholder="请输入用户ID用户昵称、标题" class="selWidth" clearable>
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
            <el-form-item label="选择时间：" class="width100">
                <el-date-picker
                    v-model="timeVal"
                    value-format="yyyy/MM/dd"
                    format="yyyy/MM/dd"
                    size="small"
                    type="daterange"
                    placement="bottom-end"
                    placeholder="自定义时间"
                    style="width: 250px;"
                    @change="onchangeTime"/>
            </el-form-item>
             <el-form-item class="width100">
                <el-button size="small" type="primary" @click="exports">导出</el-button>
             </el-form-item>
          </el-form>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini">
        <el-table-column prop="bill_id" label="ID" min-width="50" />
        <el-table-column label="用户昵称" prop="nickname" min-width="150" />
        <el-table-column label="积分标题" prop="title" min-width="120" />
        <el-table-column label="积分变动" prop="number" min-width="90">
            <template slot-scope="scope">
                <span v-if="scope.row.pm==1" style="color: #ff3b30;">+{{scope.row.number}}</span>
                <span v-if="scope.row.pm==0" style="color: #82e493;">-{{scope.row.number}}</span>
            </template>
        </el-table-column>
        <el-table-column label="当前积分额度" prop="balance" min-width="90" />
        <el-table-column prop="mark" label="备注" min-width="150" />
        <el-table-column prop="create_time" label="添加时间" min-width="90" />
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
import { integralLogTitle, integralLogLst, signLogExport } from '@/api/marketing'
import fileList from '@/components/exportFile/fileList'
import cardsData from "@/components/cards/index";
import createWorkBook from '@/utils/newToExcel.js';
import {roterPre} from '@/settings'
export default {
  name: "preSaleProductList",
  components: {fileList, cardsData},
  data() {
    return {
      timeVal: [],
      listLoading: true,
      roterPre: roterPre,
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 20,
        keyword: "",
        date: ""
      },
      loading: false,
      cardLists: [],
    };
  },
  watch: {

  },
  mounted() {
    this.getList('');
    this.getTitle();
  },
  methods: {
    // 选择时间
    selectChange(tab) {
      this.tableFrom.date = tab;
      this.tableFrom.page = 1;
      this.timeVal = [];
      this.getList('');
    },
       // 具体日期
    onchangeTime(e) {
      this.timeVal = e;
      this.tableFrom.date = e ? this.timeVal.join("-") : "";
      this.tableFrom.page = 1;
      this.getList('');
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
     /**列表 */
    downData(excelData) {
      return new Promise((resolve, reject) => {
        signLogExport(excelData).then((res) => {
          return resolve(res.data)
        })
      })
    },
    // 导出
    exportRecord() {
      signLogExport(this.tableFrom)
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
                this.$router.push({ path: this.roterPre + "/group/exportList" });
            });                })
            .catch((res) => {
                this.$message.error(res.message);
            });
    },
    //头部
    getTitle(){
        integralLogTitle().then((res) => {
          this.cardLists = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      integralLogLst(this.tableFrom)
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
  },
};
</script>
<style scoped lang="scss">
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
