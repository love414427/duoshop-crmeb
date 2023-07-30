<template>
  <div class="divBox">
    <el-card class="box-card mb20">
      <div slot="header" class="clearfix">
        <span>数据库备份记录</span>
      </div>
      <el-table
        v-loading="listLoading1"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        highlight-current-row
      >
        <el-table-column
          prop="filename"
          label="备份名称"
          sortable
          min-width="200"
        />
        <el-table-column
          prop="part"
          label="part"
          min-width="100"
        />
        <el-table-column
          prop="size"
          label="大小"
          min-width="150"
        />
        <el-table-column
          prop="compress"
          label="compress"
          min-width="100"
        />
        <el-table-column
          prop="backtime"
          label="时间"
          min-width="150"
        />
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <!--<el-button type="text" size="small">导入</el-button>-->
            <el-button type="text" size="small" @click="handleDelete(scope.row.time, scope.$index)">删除</el-button>
            <el-button type="text" size="small" @click="download(scope.row.time)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="mr10">数据库表列表</span>
        <el-button size="small" type="primary" @click="getBackup">备份</el-button>
        <el-button size="small" type="primary" @click="getOptimize">优化表</el-button>
        <el-button size="small" type="primary" @click="getRepair">修复表</el-button>
        <!--<el-button size="small" type="primary" @click="exportData(1)">导出文件</el-button>-->
      </div>
      <el-table
        v-loading="listLoading"
        :data="databaseData.data"
        style="width: 100%"
        size="small"
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="name"
          label="表名称"
          min-width="200"
          sortable
        />
        <el-table-column
          prop="comment"
          label="备注"
          min-width="200"
        />
        <el-table-column
          prop="engine"
          label="类型"
          min-width="130"
          sortable
        />
        <el-table-column
          prop="data_length"
          label="大小"
          sortable
          min-width="130"
        />
        <el-table-column
          prop="update_time"
          label="更新时间"
          sortable
          min-width="150"
        />
        <el-table-column
          prop="rows"
          label="行数"
          sortable
          min-width="100"
        />
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="Info(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="'[ '+rows.name+' ]'+rows.comment" :visible.sync="dialogVisible">
      <el-table
        v-loading="listLoading"
        :data="tabList"
        style="width: 100%"
        size="small"
        max-height="500"
        highlight-current-row
      >
        <el-table-column
          prop="COLUMN_NAME"
          label="字段名"
          min-width="80"
        />
        <el-table-column
          prop="COLUMN_TYPE"
          label="数据类型"
          min-width="120"
        />
        <el-table-column
          prop="COLUMN_DEFAULT"
          label="默认值"
          min-width="130"
        />
        <el-table-column
          prop="IS_NULLABLE"
          label="允许非空"
          min-width="130"
        />
        <el-table-column
          prop="EXTRA"
          label="自动递增"
          min-width="150"
        />
        <el-table-column
          prop="COLUMN_COMMENT"
          label="备注"
          min-width="120"
        />
      </el-table>
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
import { fileListApi, databaseListApi, backupsApi, optimizeApi, repairApi, detailApi, downloadApi, fileListDeleteApi } from '@/api/maintain'
import SettingMer from '@/libs/settingMer'
import { getToken } from '@/utils/auth'
export default {
  name: 'DataBackup',
  data() {
    return {
      tableData: {
        data: []
      },
      databaseData: {
        data: []
      },
      listLoading: false,
      listLoading1: false,
      selectionList: [],
      dataList: {},
      dialogVisible: false,
      tabList: [],
      rows: {}
    }
  },
  mounted() {
    this.getList()
    this.getListDatabase()
  },
  methods: {
    exportData() {
      const formValidate = this.formValidate
      const data = {
        is_show: formValidate.is_show,
        store_name: formValidate.store_name
      }
      storeCombinationApi(data).then(res => {
        location.href = res.data[0]
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    download(feilname) {
      window.open(SettingMer.https + `/safety/database/download/${feilname}?token=` + getToken())
      // downloadApi(feilname).then(async res => {
      //   console.log(res)
      //   // let blob = new Blob([res], { type: 'application/vnd.ms-excel' }); // res就是接口返回的文件流了
      //   const blob = new Blob([res], { type: 'application/zip' })
      //   const objectUrl = URL.createObjectURL(blob)
      //   console.log(objectUrl)
      //   window.location.href = objectUrl
      // }).catch(res => {
      //   console.log(res)
      //   this.$message.error(res.message)
      // })
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleSelectionChange(val) {
      this.selectionList = val
      const tables = []
      this.selectionList.map((item) => {
        tables.push(item.name)
      })
      this.dataList = {
        name: tables
      }
    },
    // 详情
    Info(row) {
      this.rows = row
      this.dialogVisible = true
      this.listLoading = true
      detailApi(row.name).then(async res => {
        this.tabList = res.data
        this.listLoading = false
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
      })
    },
    // 备份表
    getBackup() {
      if (this.selectionList.length === 0) {
        return this.$message.warning('请选择表')
      }
      this.$modalSure('是否备份数据库表').then(() => {
        backupsApi(this.dataList).then(async res => {
          this.$message.success(res.message)
        }).catch(res => {
          this.loading = false
          this.$message.error(res.message)
        })
      })
    },
    // 优化表
    getOptimize() {
      if (this.selectionList.length === 0) {
        return this.$message.warning('请选择表')
      }
      this.$modalSure('是否优化数据库表').then(() => {
        optimizeApi(this.dataList).then(async res => {
          this.$message.success(res.message)
        }).catch(res => {
          this.$message.error(res.message)
        })
      })
    },
    // 修复表
    getRepair() {
      if (this.selectionList.length === 0) {
        return this.$message.warning('请选择表')
      }
      this.$modalSure('是否修复数据库表').then(() => {
        repairApi(this.dataList).then(async res => {
          this.$message.success(res.message)
        }).catch(res => {
          this.$message.error(res.message)
        })
      })
    },
    // 列表
    getList() {
      this.listLoading1 = true
      fileListApi().then(res => {
        this.tableData.data = res.data
        this.listLoading1 = false
      }).catch(res => {
        this.listLoading1 = false
        this.$message.error(res.message)
      })
    },
    // 数据库表列表
    getListDatabase() {
      this.listLoading = true
      databaseListApi().then(res => {
        this.databaseData.data = res.data
        this.listLoading = false
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
      })
    },
    // 删除
    handleDelete(time, idx) {
      this.$modalSure().then(() => {
        fileListDeleteApi({feilname: time}).then(({ message }) => {
          this.$message.success(message)
          this.getList()
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
