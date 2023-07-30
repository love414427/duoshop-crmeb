<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small" type="primary" @click="onAdd">添加分类</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        row-key="id"
        :default-expand-all="false"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="id" label="ID" min-width="60" />
        <el-table-column prop="name" label="名称" min-width="150" />
        <el-table-column prop="type" label="类型" min-width="100" /> 
        <el-table-column prop="status" label="是否显示" min-width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" active-text="显示" inactive-text="隐藏" @change="onchangeIsShow(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column prop="add_time" label="添加时间" min-width="150" />
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
          </template>       
        </el-table-column>
      </el-table>
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
import { plantCategoryList, addPlantCategory, editPlantCategory, deletePlantCategory, plantCategoryStatus } from "@/api/diy";
import { roterPre } from '@/settings'
export default {
  name: "PlantCategory",
  data() {
    return {
      roterPre: roterPre,
      listLoading: true,
      tableData: {
        data: []
      },
      tableFrom: {
        page: 1,
        limit: 20,
      },
     
    };
  },
  mounted() {
    this.getList();
  },
  methods: {  
    // 列表
    getList() {
      this.listLoading = true;
      plantCategoryList(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data;
          this.listLoading = false;
        })
        .catch((res) => {
          this.listLoading = false;
          this.$message.error(res.message);
        });
    },
    // 添加
    onAdd(){
      this.$modalForm(addPlantCategory()).then(() => this.getList());
    },
    // 编辑
    edit(row) {
      this.$modalForm(editPlantCategory(row.id)).then(() => this.getList());
    },
    // 修改状态
    onchangeIsShow(row) {
      plantCategoryStatus(row.id, row.status).then(({message}) => {
        this.$message.success(message)
        this.getList()
      }).catch(({message}) => {
        this.$message.error(message)
      })
    },
    // 删除
    handleDelete(row, idx) {
      this.$modalSure('删除该分类吗').then(() => {
        deletePlantCategory(row.id).then(({ message }) => {
          this.$message.success(message)
          this.getList()
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    } 
  }
  
};
</script>

<style scoped lang="scss">
.selWidth {
  width: 300px !important;
}
</style>
