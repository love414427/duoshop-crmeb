<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small" type="primary" @click="onAdd(0)">添加城市</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        row-key="id"
        lazy
        :load="load"
        :tree-props="{children: 'children'}"
      >
        <!-- <el-table-column prop="id" label="编号" min-width="150" /> -->
        <el-table-column prop="name" label="地区名称" min-width="150" />
        <el-table-column prop="parent.name" label="上级名称" min-width="150">
           <template slot-scope="scope">
              <span>{{(scope.row.parent && scope.row.parent.name) || '中国'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onAdd(scope.row.id)">添加</el-button>
            <el-button type="text" size="small" @click="onEdit(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.id,scope.$index,scope.row)">删除</el-button>
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
import {
  cityDataCreate, cityDataLst, cityDataUpdate, cityDataDelete
} from "@/api/system";
export default {
  name: "CityList",
  data() {
    return {
      listLoading: true,
      tableData: {
        data: [],
        total: 0,
      },
      childrenData: [],
      tableFrom: {
        page: 1,
        limit: 20,
      },
    };
  },
  mounted() {
    this.getList(0);
  },
  methods: {  
    // 列表
    getList(id) {
      this.listLoading = true;
      cityDataLst(id)
        .then((res) => {
          this.tableData.data = res.data;
          this.listLoading = false;
        })
        .catch((res) => {
          this.listLoading = false;
          this.$message.error(res.message);
        });
    },
    getChildren(id){
       cityDataLst(id)
        .then((res) => {
          this.childrenData = res.data
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    load(tree, treeNode, resolve) {
      let that = this;
      that.getChildren(tree.id)
      setTimeout(() => {
        resolve(that.childrenData)
      }, 1000)
    },
    // 添加
    onAdd(id) {
      this.$modalForm(cityDataCreate(id)).then(() => this.getList(0));
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(cityDataUpdate(id)).then(() => this.getList(0));
    },
    // 删除
    handleDelete(id, idx, row) {  
      this.$modalSure('确定删除该城市').then(() => {
        cityDataDelete(id).then(({ message }) => {
          if(row.parent){
            let index = this.childrenData.map(item => item).indexOf(row)
            this.childrenData.splice(index,1);
          }else{
            this.tableData.data.splice(idx,1);
          }
          this.$message.success(message)
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    },
  },
};
</script>

<style scoped lang="scss">

</style>
