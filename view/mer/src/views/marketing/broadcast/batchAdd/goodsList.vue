<template>
  <div class="divBox">
    <el-dialog title="选择商品" :visible.sync="dialogVisible" width="700px" v-if="dialogVisible" custom-class="customHeight">
    <el-table
      ref="multipleSelection"
      v-loading="listLoading"
      :data="tableData.data"
      :row-key="(row) => { return row.product_id }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" :reserve-selection="true" width="55" />
      <el-table-column prop="product_id" label="ID" min-width="50" />
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
    </el-table>
    <div class="block mb20">
      <el-pagination
        :page-sizes="[5, 10]"
        :page-size="tableFrom.limit"
        :current-page="tableFrom.page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="pageChange"
      />
    </div>
      <div slot="footer" class="use-template-dialog-footer">
        <el-button @click="submitProduct">确定</el-button>
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
import { productLstApi } from "@/api/product";
import { roterPre } from "@/settings";

export default {
  name: "GoodList",
  data() {
    return {
      dialogVisible: false,
      templateRadio: 0,
      merCateList: [],
      roterPre: roterPre,
      listLoading: true,
      selectedGoods: [],
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 5,
        mer_cate_id: "",
        cate_id: "",
        keyword: "",
        type: "1",
        is_gift_bag: "",
      },
      multipleSelection: [],
      checked: [],
      broadcast_room_id: "",
    };
  },
  mounted() {

  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 提交
    submitProduct(){
      console.log(this.multipleSelection);
      let set = this.deteleObject(this.multipleSelection)
      this.$emit('get-goods',set);
      this.dialogVisible = false;
    },
    deteleObject(obj) {
      var uniques = [];
      var stringify = {};
      for (var i = 0; i < obj.length; i++) {
        var keys = Object.keys(obj[i]);
        keys.sort(function(a, b) {
          return (Number(a) - Number(b));
        });
        var str = '';
        for (var j = 0; j < keys.length; j++) {
          str += JSON.stringify(keys[j]);
          str += JSON.stringify(obj[i][keys[j]]);
        }
        if (!stringify.hasOwnProperty(str)) {
          uniques.push(obj[i]);
          stringify[str] = true;
        }
      }
      return uniques;
  },
    // 列表
    getList(arr,num) {
      this.listLoading = true;
      this.selectedGoods = arr;
      productLstApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
          if(arr && arr .length > 0){
            this.$nextTick(() => {
              arr.forEach((row) => {
                this.$refs.multipleSelection.toggleRowSelection(row, true);
              });
            });
          }
          if(num) this.pageChange(1)
          this.listLoading = false;
        })
        .catch((res) => {
          this.listLoading = false;
          this.$message.error(res.message);
        });
    },
    pageChange(page) {
      this.tableFrom.page = page;
      this.getList();
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      this.getList();
    },
  },
};
</script>

<style scoped lang="scss">
.customHeight{
  height: 800px;
}
</style>
