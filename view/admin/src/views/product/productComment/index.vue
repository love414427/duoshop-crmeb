<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form :inline="true">
            <el-form-item label="时间选择：" class="mr10" style="width: 100%">
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
                style="width: 260px;"
                @change="onchangeTime"
              />
            </el-form-item>
            <el-form-item label="用户名称：" class="mr10">
              <el-input
                v-model="tableFrom.nickname"
                @keyup.enter.native="getList(1)"
                placeholder="请输入用户名称"
                class="selWidth"
                size="small"
              >
                <!-- <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" /> -->
                <el-button size="small" type="primary" icon="el-icon-search" @click="getList(1)">搜索</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="关键字搜索：" class="mr10">
              <el-input
                v-model="tableFrom.keyword"
                @keyup.enter.native="getList(1)"
                placeholder="请输入商品ID或者商品信息"
                class="selWidth"
                size="small"
              >
                <!-- <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" /> -->
                <el-button size="small" type="primary" icon="el-icon-search" @click="getList(1)">搜索</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="评价状态：" class="mr10">
              <el-select
                v-model="tableFrom.is_reply"
                clearable
                placeholder="请选择"
                class="selWidth"
                @change="getList(1)"
              >
                <el-option label="已回复" value="1" />
                <el-option label="未回复" value="0" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <el-button size="small" type="primary" @click="add">添加自评</el-button>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini" @rowclick.stop="closeEdit" :row-class-name="tableRowClassName">
        <el-table-column prop="reply_id" label="ID" min-width="50" />
        <el-table-column label="商品图" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image
                style="width: 36px; height: 36px"
                :src="scope.row.image"
                :preview-src-list="[scope.row.image]"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="store_name" label="商品名称" min-width="200" />
        <el-table-column prop="nickname" label="用户名称" min-width="90" />
        <el-table-column prop="product_score" label="产品评分" sortable min-width="100" />
        <el-table-column prop="sort" label="排序" min-width="180">
                <template slot-scope="scope">
                <span v-if="scope.row.index === tabClickIndex">
                    <el-input v-model.number="scope.row['sort']" type="number" maxlength="300" size="mini" @blur="inputBlur(scope)" autofocus/>
                </span>
                <span v-else @dblclick.stop="tabClick(scope.row)">{{ scope.row['sort'] }}</span>
            </template>
        </el-table-column>
        <el-table-column label="评价内容" min-width="210">
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
        <el-table-column prop="merchant_reply_content" label="回复内容" min-width="250" />
        <el-table-column label="评价时间" min-width="150" prop="create_time" />
        <el-table-column label="操作" min-width="80" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleDelete(scope.row.reply_id, scope.$index)"
            >删除</el-button>
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
import { replyListApi, replyCreateApi, replyDeleteApi, productSort } from "@/api/product";
import { fromList } from "@/libs/constants.js";
export default {
  name: "StoreComment",
  data() {
    return {
      fromList: fromList,
      tableData: {
        data: [],
        total: 0,
      },
      listLoading: true,
      tableFrom: {
        page: 1,
        limit: 20,
        is_reply: "",
        product_id: this.$route.query.product_id ? this.$route.query.product_id : '',
        date: "",
        nickname: "",
        keyword: "",
      },
      timeVal: [],
      props: {},
       tabClickIndex: '',
    };
  },
  mounted() {
    this.getList(1);
  },
  methods: {
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
            productSort(scope.row.reply_id,{sort:scope.row.sort})
            .then((res) => {
            this.closeEdit();
            //   this.$message.success(res.message);
            }).catch((res) => {
            //  this.$message.error(res.message);
        });
    },
    closeEdit(){
        this.tabClickIndex = null;
    },
    add() {
      this.$modalForm(replyCreateApi()).then(() => this.getList(1));
    },
    // 选择时间
    selectChange(tab) {
      this.tableFrom.date = tab;
      this.timeVal = [];
      // this.tableFrom.page = 1;
      this.getList(1);
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e;
      // this.tableFrom.date = this.timeVal ? this.timeVal.join("-") : "";
      this.tableFrom.date = e ? this.timeVal.join('-') : ''
      // this.tableFrom.page = 1;
      this.getList(1);
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      replyListApi(this.tableFrom)
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
    // 删除
    handleDelete(id, idx) {
      this.$modalSure('确定删除该评论').then(() => {
        replyDeleteApi(id)
          .then(({ message }) => {
            this.$message.success(message);
            this.getList('')
          })
          .catch(({ message }) => {
            this.$message.error(message);
          });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.selWidth {
  width: 300px !important;
}
/deep/.el-rate{
  margin-top: 9px;
}
</style>
