<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px">
            <span class="seachTiele">时间选择：</span>
            <el-radio-group
              v-model="tableFrom.date"
              type="button"
              class="mr20"
              size="small"
              @change="selectChange(tableFrom.date)"
              clearable
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
              clearable
            />
            <div class="mt20">
              <span class="seachTiele">评价分类：</span>
              <el-select
                v-model="tableFrom.is_reply"
                placeholder="请选择"
                class="filter-item selWidth mr20"
                @change="getList(1)"
                clearable
              >
                <el-option
                  v-for="item in evaluationStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <span class="seachTiele">商品信息：</span>
              <el-input
                v-model="tableFrom.keyword"
                @keyup.enter.native="getList(1)"
                placeholder="请输入商品ID或者商品信息"
                class="selWidth mr20"
                clearable
              />
              <span class="seachTiele">用户名称：</span>
              <el-input v-model="tableFrom.nickname" @keyup.enter.native="getList(1)" placeholder="请输入用户名称" class="selWidth mr20" />
              <el-button size="small" type="primary" icon="el-icon-search" @click="getList(1)">搜索</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini" @rowclick.stop="closeEdit" :row-class-name="tableRowClassName">
        <el-table-column
          prop="product_id"
          label="商品ID"
          min-width="50"
        />
        <el-table-column label="商品信息" min-width="180">
          <template slot-scope="scope">
            <div class="tabBox acea-row row-middle">
              <div class="demo-image__preview">
                <el-image
                  :src="scope.row.image"
                  :preview-src-list="[scope.row.image]"
                />
              </div>
              <span class="tabBox_tit">{{ scope.row.store_name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="用户名称"
          min-width="80"
        />
        <el-table-column
          prop="product_score"
          label="产品评分"
          min-width="50"
        />
        <el-table-column
          prop="service_score"
          label="服务评分"
          min-width="50"
        />
        <el-table-column
          prop="postage_score"
          label="物流评分"
          min-width="50"
        />
        <el-table-column
          prop="comment"
          label="评价内容"
          min-width="150"
        >
          <template slot-scope="scope">
            <div class="mb5 content_font">{{ scope.row.comment }}</div>
            <div class="demo-image__preview">
              <el-image
                v-for="(item,index) in scope.row.pics"
                :key="index"
                :src="item"
                class="mr5"
                :preview-src-list="[item]"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="merchant_reply_content"
          label="回复内容"
          min-width="100"
        />
        <el-table-column
          prop="create_time"
          label="评价时间"
          min-width="100"
        />
        <el-table-column prop="sort" label="排序" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.index === tabClickIndex">
              <el-input v-model.number="scope.row['sort']" type="number" maxlength="300" size="mini" @blur="inputBlur(scope)" autofocus/>
            </span>
            <span v-else @dblclick.stop="tabClick(scope.row)">{{ scope.row['sort'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="80" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleReply(scope.row.reply_id)">回复</el-button>
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
    <!--详情-->
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
import { reviewLstApi, reviewReplyApi, reviewsSort ,destoryApi} from '@/api/product'
export default {
  data() {
    return {
      tableData: {
        data: [],
        total: 0
      },
      listLoading: true,
      tableFrom: {
        is_reply: '',
        nickname: '',
        keyword: '',
        order_sn: '',
        product_id: this.$route.query.product_id ? this.$route.query.product_id : '',
        status: '',
        date: '',
        page: 1,
        limit: 20
      },
      timeVal: [],
      fromList: {
        title: '选择时间',
        custom: true,
        fromTxt: [
          { text: '全部', val: '' },
          { text: '今天', val: 'today' },
          { text: '昨天', val: 'yesterday' },
          { text: '最近7天', val: 'lately7' },
          { text: '最近30天', val: 'lately30' },
          { text: '本月', val: 'month' },
          { text: '本年', val: 'year' }
        ]
      },
      selectionList: [],
      tabClickIndex: '',
      ids: '',
      tableFromLog: {
        page: 1,
        limit: 10
      },
      tableDataLog: {
        data: [],
        total: 0
      },
      LogLoading: false,
      dialogVisible: false,
      evaluationStatusList: [
        { value: '', label: '全部' },
        { value: 1, label: '已回复' },
        { value: 0, label: '未回复' }
      ],
      orderDatalist: null
    }
  },
  mounted() {
    this.getList(1)
  },
  methods: {
    // 回复
    handleReply(id) {
      // console.log(this.scope)
      this.$modalForm(reviewReplyApi(id)).then(() => this.getList(1))
    },
    handleSelectionChange(val) {
      this.selectionList = val
      const data = []
      this.selectionList.map(item => {
        data.push(item.id)
      })
      this.ids = data.join(',')
    },
    // 选择时间
    selectChange(tab) {
      this.tableFrom.date = tab;
      this.timeVal = [];
      this.getList(1);
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e
      this.tableFrom.date = e ? this.timeVal.join('-') : ''
      this.getList(1)
    },
     // 把每一行的索引放进row
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
    // 添加明细原因 row 当前行 column 当前列
    tabClick(row) {    
        this.tabClickIndex = row.index;
        //   this.tabClickLabel = column.label;  
    },
    // 失去焦点初始化
    inputBlur(scope) {
        if(!scope.row.sort || scope.row.sort<0)scope.row.sort=0
        reviewsSort(scope.row.reply_id,{sort:scope.row.sort})
        .then((res) => {
          this.closeEdit();
        //   this.$message.success(res.message);
        })
        .catch((res) => {
        //  this.$message.error(res.message);
        });
    },
    closeEdit(){
        this.tabClickIndex = null;
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      reviewLstApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list
          this.tableData.total = res.data.count
          this.listLoading = false
        })
        .catch(res => {
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

<style lang="scss" scoped>
.selWidth {
  width: 300px;
}
table .el-image{
    display: inline-block;
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
.mt20 {
  margin-top: 20px;
}
.demo-image__preview{
  position: relative;
}
.maxw180{
  display: inline-block;
  max-width: 180px;
}

</style>
