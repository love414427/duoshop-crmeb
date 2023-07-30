<template>
  <div class="divBox">
    <el-card class="box-card">    
      <div slot="header" class="clearfix">
          <el-form size="small" label-width="100px" inline>
            <el-form-item label="关键字：" class="width100">
              <el-input v-model="tableFrom.keyword" @keyup.enter.native="getList(1)" placeholder="请输入名称/key" class="selWidth" size="small" clearable>
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
            <el-form-item label="上级分类：">
              <el-cascader v-model="config_classify_id" :options="classifyOptions" :props="{ value: 'config_classify_id', label: 'classify_name', checkStrictly: true }" @change="getList"></el-cascader>
            </el-form-item>
            <el-form-item label="后台类型：">
              <el-select
                v-model="tableFrom.user_type"
                clearable
                filterable
                placeholder="请选择"
                class="selWidth"
                @change="getList"
              >
                <el-option label="总后台配置" value="0" />
                <el-option label="商户后台" value="1" />
              </el-select>
            </el-form-item>
        </el-form>
        <el-button size="small" type="primary" @click="onAdd">添加配置</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
      >
        <el-table-column
          prop="config_id"
          label="ID"
          min-width="60"
        />
        <el-table-column
          prop="config_name"
          label="配置名称"
          min-width="130"
        />
        <el-table-column
          prop="config_key"
          label="配置key"
          min-width="130"
        />
        <el-table-column
          prop="info"
          label="配置说明"
          min-width="150"
        />
        <el-table-column
          prop="typeName"
          label="类型"
          min-width="130"
        />
        <el-table-column
          prop="user_type"
          label="后台类型"
          min-width="100"
        >
          <template slot-scope="scope">
            <span v-text="scope.row.user_type===0?'总后台配置':'商户后台配置'" />
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="是否显示"
          min-width="100"
        >
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
        <el-table-column
          prop="create_time"
          label="创建时间"
          min-width="150"
        />
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row.config_id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.config_id, scope.$index)">删除</el-button>
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
  createConfigSettingTable,
  updateConfigSettingTable,
  configSettingLst,
  changeConfigSettingStatus,
  settingDelApi,
  configClassifyOptions
} from '@/api/system'
export default {
  name: 'Setting',
  data() {
    return {
      tableData: {
        data: [],
        total: 0
      },
      tableFrom: {
        page: 1,
        limit: 20,
        keyword: '',
        user_type: ''
      },
      listLoading: true,
      classifyOptions: [],
      config_classify_id: []
    }
  },
  mounted() {
    this.getList('')
    this.getClassifyOptions()
  },
  methods: {
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page
      if (this.config_classify_id.length) {
        this.tableFrom.config_classify_id = this.config_classify_id[this.config_classify_id.length - 1]
      }
      configSettingLst(this.tableFrom).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.listLoading = false
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
      })
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getList('')
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList('')
    },
    onchangeIsShow(row) {
      changeConfigSettingStatus(row.config_id, row.status).then(({ message }) => {
        this.$message.success(message)
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    },
    // 添加
    onAdd() {
      this.$modalForm(createConfigSettingTable()).then(() => this.getList(1))
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(updateConfigSettingTable(id)).then(() => this.getList(1))
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure().then(() => {
        settingDelApi(id).then(({ message }) => {
          this.$message.success(message)
          this.tableData.data.splice(idx, 1)
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    },
    getClassifyOptions() {
      configClassifyOptions().then(res => {
        this.classifyOptions = res.data;
      }).catch(res => {
        this.$message.error(res.message)
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
