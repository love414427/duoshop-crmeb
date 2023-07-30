<template>
  <el-dialog v-if="dialogVisible" title="商品信息" :visible.sync="dialogVisible" width="1000px">
    <div class="divBox">
      <div class="header clearfix">
        <div class="container">
          <el-form size="small" inline label-width="100px">
            <el-form-item label="商品分类：">
              <el-cascader
                v-model="tableFrom.cate_id"
                class="selWidth"
                :options="categoryList"
                :props="props"
                filterable
                clearable
                @change="getList()"
              />
            </el-form-item>
            <el-form-item label="商品标签：">
              <el-select v-model="tableFrom.sys_labels" placeholder="请选择" class="filter-item selWidth" clearable filterable @change="getList(1)">
                <el-option v-for="item in labelList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>  
            </el-form-item>
            <el-form-item label="商户选择：">
            <el-select v-model="tableFrom.mer_ids" placeholder="请选择" class="selWidth" clearable multiple filterable @change="getList(1)">
              <el-option v-for="item in merSelect" :key="item.mer_id" :label="item.mer_name" :value="item.mer_name" />
            </el-select>
            </el-form-item>
            <el-form-item label="商品搜索：">
              <el-input v-model="tableFrom.keyword" placeholder="请输入商品关键字" class="selWidth" clearable>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="getList(1)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-table
        ref="mainTable"
        v-loading="listLoading"
        :data="tableData.data"
        row-key="spu_id"
        size="small"
        max-height="500"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
        <el-table-column label="商品信息" min-width="250">
          <template slot-scope="scope">
            <div class="acea-row" style="align-items: center">
              <div class="demo-image__preview">
                <el-image
                  style="width: 36px; height: 36px"
                  :src="scope.row.image"
                  :preview-src-list="[scope.row.image]"
                />
              </div>
              <div class="row_title line2">{{ scope.row.store_name }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="merchant" label="商户名称" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.merchant.mer_name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="售价" min-width="100" />
        <!-- <el-table-column prop="sales" label="库存" min-width="100" /> -->
      </el-table>
      <div class="acea-row row-between row-bottom">
        <el-pagination
          :page-sizes="[10, 20, 30]"
          :page-size="tableFrom.limit"
          :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
        <div>
          <el-button size="small" @click="dialogVisible = false">取消</el-button>
          <el-button size="small" type="primary" @click="submitProduct">确定</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
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
import { categoryListApi, getProductLabelApi, merSelectApi } from '@/api/product';
import { selectProductList } from '@/api/marketing';
import { roterPre } from '@/settings';
export default {
  name: 'GoodsList',
  props: {
    resellShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
      templateRadio: 0,
      categoryList: [],
      merSelect: [],
      labelList: [],
      merList: [],
      options: [
        {
          value: 'all',
          label: '所有页',
        },
        {
          value: 'one',
          label: '当前页',
        },
      ],
      roterPre: roterPre,
      listLoading: true,
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 10,
        cate_id: '',
        keyword: '',
        mer_ids: '',
        label_ids: [],
        type: 21,
      },
      mer_ids:[],
      props: { emitPath: false },
      multipleSelection: [],
      checked: [],
      selectAllPage: false,
    };
  },
  mounted() {
    this.multipleSelection = [];
    this.getLabelLst();
    this.getCategoryList();
    this.getMerchantList();
    this.getList('');
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCommand(command) {
      this.selectAllPage = command;
      this.$nextTick(() => {
        this.$refs.mainTable.toggleAllSelection();
      });
    },
    getCategoryList() {
      categoryListApi({type: 1})
        .then((res) => {
          this.categoryList = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 商户列表
    getMerchantList() {
      merSelectApi()
        .then((res) => {
          this.merSelect = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 获取标签项
    getLabelLst() {
      getProductLabelApi()
        .then((res) => {
          this.labelList = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page
      selectProductList(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
          if (this.selectAllPage == 'all') {
            this.multipleSelection.push(...this.tableData.data);
            this.multipleSelection.forEach((row) => {
              this.$refs.mainTable.toggleAllSelection();
            });
          }
          this.listLoading = false;
        })
        .catch((res) => {
          this.listLoading = false;
          this.$message.error(res.message);
        });
    },
    submitProduct() {
      let spu_ids = this.multipleSelection.map((item) => {
        return item.spu_id;
      });
      this.$emit('onSelectList', spu_ids);
      this.$refs.mainTable.clearSelection();
      this.dialogVisible = false;
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
  width: 250px !important;
}
.seachTiele {
  line-height: 35px;
}
.fr {
  float: right;
}
.row_title{
  max-width: 240px;
}
</style>
