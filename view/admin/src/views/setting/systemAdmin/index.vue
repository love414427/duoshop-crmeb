<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px" :inline="true">
            <el-form-item label="选择时间：" style="width: 100%">
              <el-radio-group
                v-model="tableFrom.date"
                size="small"
                @change="selectChange(tableFrom.date)"
              >
                <el-radio-button
                  v-for="(itemn,indexn) in fromList.fromTxt"
                  :key="indexn"
                  :label="itemn.val"
                >{{ itemn.text }}</el-radio-button>
              </el-radio-group>
              <el-date-picker
                v-model="timeVal"
                type="daterange"
                placeholder="选择日期"
                format="yyyy/MM/dd"
                value-format="yyyy/MM/dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="onchangeTime"
              />
            </el-form-item>
            <el-form-item label="显示状态：">
              <el-select
                v-model="tableFrom.status"
                clearable
                placeholder="请选择"
                class="selWidth"
                @change="getList(1)"
              >
                <el-option label="显示" value="1" />
                <el-option label="隐藏" value="0" />
              </el-select>
            </el-form-item>
            <el-form-item label="关键字：">
              <el-input v-model="tableFrom.keyword" @keyup.enter.native="getList(1)" placeholder="请输入账号/呢称/关键字" class="selWidth">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button size="small" type="primary" @click="onAdd">添加管理员</el-button>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="small">
        <el-table-column prop="admin_id" label="ID" min-width="120" />
        <el-table-column prop="real_name" label="管理员姓名" min-width="150" />
        <el-table-column prop="rule_name" label="身份" min-width="250" />
        <el-table-column prop="account" label="账号" min-width="250" />
        <el-table-column prop="status" label="是否显示" min-width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              active-text="显示"
              inactive-text="隐藏"
              @change="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" min-width="150" />
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onPassword(scope.row.admin_id)">修改管理员密码</el-button>
            <el-button type="text" size="small" @click="onEdit(scope.row.admin_id)">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="handleDelete(scope.row.admin_id, scope.$index)"
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
  adminListApi,
  adminCreateApi,
  adminUpdateApi,
  adminDeleteApi,
  adminStatusApi,
  adminPasswordApi,
} from "@/api/setting";
import { fromList } from "@/libs/constants.js";
export default {
  name: "SystemRole",
  data() {
    return {
      fromList: fromList,
      grid: {
        xl: 7,
        lg: 7,
        md: 12,
        sm: 24,
        xs: 24,
      },
      tableData: {
        data: [],
        total: 0,
      },
      listLoading: true,
      tableFrom: {
        page: 1,
        limit: 20,
        keyword: "",
        status: "",
        date: "",
      },
      timeVal: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 选择时间
    selectChange(tab) {
      this.tableFrom.date = tab;
      this.timeVal = [];
      this.tableFrom.page = 1;
      this.getList();
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e;
      this.tableFrom.date = this.timeVal ? this.timeVal.join("-") : "";
      this.tableFrom.page = 1;
      this.getList();
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      adminListApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.data.list;
          this.tableData.total = res.data.count;
          this.listLoading = false;
        })
        .catch((res) => {
          this.tableData.data = [];
          this.tableData.total = 0;
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
    onchangeIsShow(row) {
      adminStatusApi(row.admin_id, row.status)
        .then(({ message }) => {
          this.$message.success(message);
        })
        .catch(({ message }) => {
          this.$message.error(message);
        });
    },
    // 添加
    onAdd() {
      this.$modalForm(adminCreateApi()).then(() => this.getList());
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(adminUpdateApi(id)).then(() => this.getList());
    },
    // 修改密码表单
    onPassword(id) {
      this.$modalForm(adminPasswordApi(id));
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure('删除该管理员').then(() => {
        adminDeleteApi(id)
          .then(({ message }) => {
            this.$message.success(message);
            this.tableData.data.splice(idx, 1);
          })
          .catch(({ message }) => {
            this.$message.error(message);
          });
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
