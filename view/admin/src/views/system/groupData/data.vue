<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button v-show="$route.path.indexOf('data') !== -1" size="mini" class="mr20" icon="el-icon-back" @click="back">返回</el-button>
        <el-button size="small" type="primary" @click="onAdd">添加数据</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
      >
        <el-table-column
          v-for="(item,index) in columns"
          :key="index"
          :prop="item.key"
          :label="item.title"
          :min-width="item.minWidth"
        >
          <template slot-scope="scope">
            <div v-if="['img','image','pic'].indexOf(item.key) > -1 || item.key.indexOf('pic') > -1 || item.key.indexOf('img') > -1 || item.key.indexOf('image') > -1 || item.key.indexOf('banner') > -1" class="demo-image__preview">
              <div v-if="Array.isArray(scope.row[item.key])">
                <span v-for="(item,index) in scope.row[item.key]" :key="index">
                    <el-image 
                    style="width: 36px; height: 36px; margin-right: 5px;"
                    :src="item"
                    />
                </span>
              </div>
              <div v-else>        
                  <el-image 
                    style="width: 36px; height: 36px"
                    :src="scope.row[item.key]"
                />
              </div>  
            </div>
            <span v-else>{{ scope.row[item.key] }}</span>
            
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
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row.group_data_id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.group_data_id, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80]"
          :page-size="tableData.limit"
          :current-page="tableData.page"
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
  createGroupData,
  updateGroupData,
  groupDataLst,
  deleteGroupData,
  groupDetail,
  statusGroupData
} from '@/api/system'
import { roterPre } from '@/settings'
import { mapGetters } from 'vuex'
export default {
  name: 'Data',
  data() {
    return {
      roterPre: roterPre,
      tableData: {
        page: 1,
        limit: 20,
        data: [],
        total: 0
      },
      groupId: null,
      loading: false,
      groupDetail: null,
      titles: ''
    }
  },
  computed: {
    columns() {
      if (!this.groupDetail) return []
      const colums = [
        {
          title: 'ID',
          key: 'group_data_id',
          minWidth: 60
        }]
      if(this.groupDetail.fields)
        this.groupDetail.fields.forEach((val) => {
        colums.push({
          title: val
            .name,
          key:
          val.field,
          minWidth:
            80
        })
      })
      colums.push(
        {
          title: '添加时间',
          key: 'create_time',
          minWidth: 200
        },
        // {
        //   title: '状态',
        //   key: 'status',
        //   minWidth: 80
        // },
        // {
        //   title: '操作',
        //   slot: 'action',
        //   minWidth: 120,
        //   fixed: 'right'
        // }
      )

      return colums
    },
    ...mapGetters(['menuList'])
  },
  watch: {
    '$route.params.id': function(n) {
      this.groupId = n
    },
    groupId(n) {
      this.getGroupDetail(n)
    }
  },
  mounted() {
    this.groupId = this.$route.params.id
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    // 返回
    back() {
      this.$router.push({ path: `${roterPre}/group/list` })
    },
    getGroupDetail(id) {
      groupDetail(id).then(res => {
        this.groupDetail = res.data
        this.tableData.page = 1
        this.setTagsViewTitle(res.data.group_name)
        this.getList()
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    // 列表
    getList() {
      this.loading = false
      groupDataLst(this.$route.params.id, this.tableData.page, this.tableData.limit).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.loading = false
      }).catch(({ message }) => {
        this.loading = false
        this.$message.error(message)
      })
    },
    pageChange(page) {
      this.tableData.page = page
      this.getList()
    },
    handleSizeChange(val) {
      this.tableData.limit = val
      this.getList()
    },
    // 添加
    onAdd() {
      this.$modalForm(createGroupData(this.$route.params.id)).then(() => this.getList())
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(updateGroupData(this.$route.params.id, id)).then(() => this.getList())
    },
    onchangeIsShow(row) {
      statusGroupData(row.group_data_id, { status: row.status }).then(({ message }) => {
        this.$message.success(message)
        this.getList()
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure('确定删除该数据').then(() => {
        deleteGroupData(id).then(({ message }) => {
          this.$message.success(message)
          this.tableData.data.splice(idx, 1)
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    },
    setTagsViewTitle(title) {
      const route = Object.assign({}, this.tempRoute, { title: title })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
