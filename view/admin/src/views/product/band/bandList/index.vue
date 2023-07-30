<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="79px" :inline="true">
            <el-form-item label="品牌分类：">
              <el-cascader
                v-model="tableFrom.brand_category_id"
                class="selWidth"
                :options="brandCategory"
                clearable
                :props="props"
                @change="getList(1)"
              />
            </el-form-item>
          </el-form>
        </div>
        <el-button size="small" type="primary" @click="onAdd">添加品牌</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        row-key="brand_id"
        :default-expand-all="false"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="brand_id" label="ID" min-width="60" />
        <el-table-column label="品牌名称" prop="brand_name" min-width="150" />
        <el-table-column prop="sort" label="排序" min-width="50" />
        <el-table-column prop="status" label="是否显示" min-width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_show"
              :active-value="1"
              :inactive-value="0"
              active-text="显示"
              inactive-text="隐藏"
              @change="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" min-width="150" />
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row.brand_id)">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="handleDelete(scope.row.brand_id, scope.$index)"
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
import {
  brandCategoryListApi,
  brandListApi,
  brandCreateApi,
  brandUpdateApi,
  brandDeleteApi,
  brandStatusApi,
} from "@/api/product";
export default {
  name: "BrandList",
  data() {
    return {
      props: {
        value: "store_brand_category_id",
        label: "cate_name",
        children: "children",
        emitPath: false,
      },
      isChecked: false,
      listLoading: true,
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 20,
        
      },
      imgList: [],
      brandCategory: [],
    };
  },
  mounted() {
    this.getBrandCategory();
    this.getList();
  },
  methods: {
    // 品牌分类
    getBrandCategory() {
      brandCategoryListApi({ page: 1, limit: 9999,status: 1 })
        .then((res) => {
          this.brandCategory = res.data;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      brandListApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
          this.tableData.data.map((item) => {
            this.imgList.push(item.pic);
          });
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
    // 添加
    onAdd() {
      this.$modalForm(brandCreateApi()).then(() => this.getList());
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(brandUpdateApi(id)).then(() => this.getList());
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure().then(() => {
        brandDeleteApi(id)
          .then(({ message }) => {
            this.$message.success(message);
            this.getList();
          })
          .catch(({ message }) => {
            this.$message.error(message);
          });
      });
    },
    onchangeIsShow(row) {
      brandStatusApi(row.brand_id, row.is_show)
        .then(({ message }) => {
          this.$message.success(message);
          this.getList();
        })
        .catch(({ message }) => {
          this.$message.error(message);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.selWidth {
  width: 300px !important;
}
</style>
