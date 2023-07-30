<template>
  <div class="divBox">
    <el-card class="box-card">
      <div class="filter-container">
        <div class="demo-input-suffix acea-row">
          <el-form inline size="small">                      
            <el-button size="small" type="primary" @click="createSetting">添加设置</el-button>
          </el-form>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
      >
        <el-table-column label="序号" min-width="100">
          <template scope="scope">
            <span>{{ scope.$index+(tableFrom.page - 1) * tableFrom.limit + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="业务名称"
          min-width="150"
        /> 
        <el-table-column
          label="类型"
          min-width="150"
        > 
        <template slot-scope="scope">
            <span>{{scope.row.type == 1 ? '复制商品' : '电子面单'}}</span>
          </template>
        </el-table-column>      
        <el-table-column
          prop="price"
          label="价格(元)"
          min-width="150"
        />
        <el-table-column
          prop="num"
          label="购买数量(次数)"
          min-width="150"
        />
        <el-table-column
          prop="create_time"
          label="添加时间"
          min-width="180"
        />
        <el-table-column label="是否显示" min-width="100">
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
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="mr10" @click="handleEdit(scope.row.meal_id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.meal_id, scope.$index)">删除</el-button>
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
import { addServiceConfig, aserviceConfigLst, aserviceStatusApi, updateServiceConfig, deleteServiceConfig } from '@/api/setting'
export default {
  name: 'serviceSetting',
  data() {
    return {
      props: {
        emitPath: false
      },
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },

      fullscreenLoading: false,
      tableFrom: {
        page: 1,
        limit: 20,
        store_name: '',
        keyword: '',
        date: ''
      }

    }
  },
  mounted() {
    this.getList('');
  },
  methods: {
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page;
      aserviceConfigLst(this.tableFrom).then(res => {
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
      this.getList(1)
    },
    //添加设置
    createSetting(){
       this.$modalForm(addServiceConfig()).then(() => this.getList(''))
    },
    onchangeIsShow(row) {
      aserviceStatusApi(row.meal_id, {status: row.status})
        .then(({ message }) => {
          this.$message.success(message)
          this.getList('')
        })
        .catch(({ message }) => {
          this.$message.error(message)
        })
    },
    handleEdit(id){
        this.$modalForm(updateServiceConfig(id)).then(() => this.getList(''))
    },
    handleDelete(id){
        this.$modalSure().then(() => {
          deleteServiceConfig(id).then(({ message }) => {
                this.$message.success(message)
                this.getList('')
              })
              .catch(({ message }) => {
                this.$message.error(message)
              })
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
.filter-container .filter-item{
  margin-bottom: 0;
}
/deep/ .el-input--medium .el-input__inner{
  line-height: 32px;
  height: 32px;
}
.demo-table-expand .el-form-item{
  width: 100%;
}
.dialog-footer{
  text-align: center;
}
</style>
