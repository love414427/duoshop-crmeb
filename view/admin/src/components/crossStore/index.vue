<template>
  <div class="divBox">
    <div class="header clearfix">
      <div class="filter-container">
        <div class="container">
          <el-form
            size="small"
            inline
            label-width="100px"
            @submit.native.prevent
          >
            <el-form-item label="关键字：" class="width100">
              <el-input
                v-model="tableFrom.keyword"
                placeholder="请输入店铺关键字/店铺名/联系电话"
                class="selWidth"
                clearable
                size="small"
                @change="getList"
                @keyup.enter.native="getList"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  class="el-button-solt"
                  @click="getList"
                />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <el-table
      ref="table"
      v-loading="listLoading"
      :data="tableData.data"
      style="width: 100%"
      size="samll"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="singleChoice == '1'" width="50">
        <template slot-scope="scope">
          <el-radio
            v-model="templateRadio"
            :label="scope.row.mer_id"
            @change.native="getTemplateRow(scope.row)"
            >&nbsp;</el-radio
          >
        </template>
      </el-table-column>
      <el-table-column v-else type="selection" width="55" />

      <el-table-column prop="mer_id" label="ID" min-width="50" />
      <el-table-column label="店铺logo" min-width="80">
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
              style="width: 36px; height: 36px"
              :src="scope.row.mer_avatar"
              :preview-src-list="[scope.row.mer_avatar]"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="mer_name" label="商户名称" min-width="100" />
      <el-table-column prop="is_trader " label="商户类别" min-width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.is_trader == 1">自营</div>
          <div v-if="scope.row.is_trader == 0">非自营</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="merchantCategory.category_name"
        label="商户分类"
        min-width="100"
      />
      <el-table-column
        prop="merchantType.type_name"
        label="店铺类型"
        min-width="100"
      />
      <el-table-column prop="mer_phone" label="联系方式" min-width="110" />
    </el-table>
    <div class="block mb20">
      <el-pagination
        :page-sizes="[5, 10, 20]"
        :page-size="tableFrom.limit"
        :current-page="tableFrom.page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="pageChange"
      />
    </div>
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
import { roterPre } from "@/settings";
import { merchantListApi } from "@/api/merchant";
export default {
  name: "GoodList",
  data() {
    return {
      templateRadio: 0,
      idKey: "mer_id",
      roterPre: roterPre,
      listLoading: true,
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 5,
        keyword: "",
        status: 1,
      },
      checked: [],
      multipleSelection: [],
      multipleSelectionAll:
        window.form_create_helper.get(this.$route.query.field) || [],
      nextPageFlag: false,
      singleChoice: 0,
      singleSelection: {},
    };
  },
  mounted() {
    let that = this;
    this.singleChoice = sessionStorage.getItem("singleChoice");
    this.getList();
    if (this.singleChoice != 1) {
      const checked =
        window.form_create_helper.get(this.$route.query.field).map((item) => {
          return {
            mer_id: item.id,
            mer_avatar: item.src,
          };
        }) || [];
      this.multipleSelectionAll = checked;
    }
    form_create_helper.onOk(function () {
      that.unloadHandler();
    });
  },
  destroyed: function () {
    sessionStorage.setItem("singleChoice", 0);
  },
  methods: {
    getTemplateRow(row) {
      this.singleSelection = { src: row.mer_avatar, id: row.mer_id };
    },
    unloadHandler() {
      if (this.singleChoice != 1) {
        if (this.multipleSelectionAll.length > 0) {
          if (this.$route.query.field) {
            form_create_helper.set(
              this.$route.query.field,
              this.multipleSelectionAll.map((item) => {
                return {
                  id: item.mer_id,
                  src: item.mer_avatar,
                };
              })
            );
            // form_create_helper.close(this.$route.query.field);
          }
        } else {
          this.$message.warning("请先选择商品");
        }
      } else {
        if (
          this.singleSelection &&
          this.singleSelection.src &&
          this.singleSelection.id
        ) {
          if (this.$route.query.field) {
            form_create_helper.set(
              this.$route.query.field,
              this.singleSelection
            );
            // form_create_helper.close(this.$route.query.field);
          }
        } else {
          this.$message.warning("请先选择商品");
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      setTimeout(() => {
        this.changePageCoreRecordData();
      }, 50);
    },
    // 设置选中的方法
    setSelectRow() {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return;
      }
      // 标识当前行的唯一键的名称
      let idKey = this.idKey;
      let selectAllIds = [];
      this.multipleSelectionAll.forEach((row) => {
        selectAllIds.push(row[idKey]);
      });
      this.$refs.table.clearSelection();
      for (var i = 0; i < this.tableData.data.length; i++) {
        if (selectAllIds.indexOf(this.tableData.data[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.table.toggleRowSelection(this.tableData.data[i], true);
        }
      }
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      let idKey = this.idKey;
      let that = this;
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection;
        return;
      }
      // 总选择里面的key集合
      let selectAllIds = [];
      this.multipleSelectionAll.forEach((row) => {
        selectAllIds.push(row[idKey]);
      });
      let selectIds = [];
      // 获取当前页选中的id
      this.multipleSelection.forEach((row) => {
        selectIds.push(row[idKey]);
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row);
        }
      });
      let noSelectIds = [];
      // 得到当前页没有选中的id
      this.tableData.data.forEach((row) => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey]);
        }
      });
      noSelectIds.forEach((id) => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] == id) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1);
              break;
            }
          }
        }
      });
    },
    // 列表
    getList() {
      this.listLoading = true;
      merchantListApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
          this.$nextTick(function () {
            this.setSelectRow(); //调用跨页选中方法
          });
          this.listLoading = false;
        })
        .catch((res) => {
          this.listLoading = false;
          this.$message.error(res.message);
        });
    },
    pageChange(page) {
      this.changePageCoreRecordData();
      this.tableFrom.page = page;
      this.getList();
    },
    handleSizeChange(val) {
      this.changePageCoreRecordData();
      this.tableFrom.limit = val;
      this.getList();
    },
  },
};
</script>

<style scoped lang="scss">
.selWidth {
  width: 300px !important;
}
.seachTiele {
  line-height: 35px;
}
.fr {
  float: right;
}
/deep/ .el-table-column--selection .cell {
  padding: 0;
}
</style>
