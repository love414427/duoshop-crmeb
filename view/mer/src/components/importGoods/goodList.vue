<template>
  <div class="divBox">
    <div class="header clearfix">
      <div class="filter-container">
        <div class="demo-input-suffix acea-row">
          <span class="seachTiele">商品搜索：</span>
          <el-input v-model="tableFrom.keyword" placeholder="请输入商品名称，关键字，产品编号" class="selWidth" size="small">
            <el-button slot="append" icon="el-icon-search" class="el-button-solt" size="small" @click="getList()" />
          </el-input>
        </div>
      </div>
    </div>
    <el-table
      ref="multipleSelection"
      v-loading="listLoading"
      :data="tableData.data"
      style="width: 100%"
      size="mini"
      highlight-current-row
      :row-key="(row) => { return row.id }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="broadcast_goods_id" label="ID" min-width="50" />
      <el-table-column label="商品图" min-width="80">
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
              style="width: 36px; height: 36px"
              :src="scope.row.cover_img"
              :preview-src-list="[scope.row.cover_img]"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" min-width="200" />
    </el-table>
    <div class="block mb20">
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
import { broadcastProListApi} from "@/api/marketing";
import { roterPre } from "@/settings";
export default {
  name: "GoodList",
  data() {
    return {
      templateRadio: 0,
      merCateList: [],
      roterPre: roterPre,
      listLoading: true,
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 20,
        status_tag: 1,
        keyword: "",
        mer_valid: 1
      },
      multipleSelectionAll:
        window.form_create_helper.get(this.$route.query.field) || [],
      multipleSelection: [],
      checked: [],
      broadcast_room_id: "",
    };
  },
  mounted() {
    this.getList();
    const checked = [];
    this.multipleSelectionAll = checked;   
    form_create_helper.onOk(this.unloadHandler)
  },
  methods: {
    unloadHandler() {
      if (this.multipleSelectionAll.length > 0) {
        if (this.$route.query.field) {
          /* eslint-disable */
            form_create_helper.set(
              this.$route.query.field,
              this.multipleSelectionAll.map((item) => {
                return {
                  id: item.product_id,
                  src: item.cover_img,
                };
              })
            );
            console.log(this.multipleSelectionAll);
            localStorage.setItem(
              "broadcastPro",
              JSON.stringify(this.multipleSelectionAll)
            );   
        }
      } else {
        this.$message.warning("请先选择商品");
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.multipleSelectionAll = val;
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
      broadcastProListApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = [];
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
    }
  }
};
</script>

<style scoped lang="scss">
.selWidth {
  width: 219px !important;
}
.seachTiele {
  line-height: 35px;
}
.fr {
  float: right;
}
</style>
