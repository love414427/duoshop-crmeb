<template>
  <div class="divBox">
    <el-card class="box-card">
     <div slot="header" class="clearfix">
        <el-button size="small" type="primary" @click="onAdd">添加链接</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
      >
        <el-table-column prop="id" label="ID" min-width="60" />
        <el-table-column prop="name" label="页面名称" min-width="150" />
        <el-table-column prop="url" label="页面链接" min-width="100" />
        <el-table-column prop="param" label="参数" min-width="100" />
        <el-table-column prop="category.name" label="分组" min-width="100" />    
        <el-table-column prop="add_time" label="添加时间" min-width="150" />
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
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
  merLinkList, addMerLink, editMerLink, deleteMerLink
} from "@/api/diy";
export default {
  name: "MerchantLink",
  data() {
    return {
      listLoading: true,
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 20,
      },
    };
  },
  mounted() {
    this.getList('');
  },
  methods: {  
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      merLinkList(this.tableFrom)
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
    // 添加
    onAdd() {
      this.$modalForm(addMerLink()).then(() => this.getList(''));
    },
    // 编辑
    edit(row) {
      this.$modalForm(editMerLink(row.id)).then(() => this.getList(''));
    },
    // 删除
    handleDelete(row, idx) {
      this.$modalSure('删除该链接吗').then(() => {
        deleteMerLink(row.id).then(({ message }) => {
          this.$message.success(message)
          this.tableData.data.splice(idx, 1);
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    }
    
  },
};
</script>

<style scoped lang="scss">

</style>
