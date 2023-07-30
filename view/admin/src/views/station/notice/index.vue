<template>
  <div class="divBox">
    <el-card class="box-card">
      <div class="filter-container">
        <div class="demo-input-suffix acea-row">
          <el-form inline size="small">
            <el-form-item label="时间选择：" class="width100" style="display: block;">
              <el-radio-group
                v-model="tableFrom.date"
                type="button"
                class="mr20"
                size="small"
                @change="selectChange(tableFrom.date)"
              >
                <el-radio-button
                  v-for="(item,i) in fromList.fromTxt"
                  :key="i"
                  :label="item.val"
                >{{ item.text }}</el-radio-button>
              </el-radio-group>
              <el-date-picker
                v-model="timeVal"
                value-format="yyyy/MM/dd"
                format="yyyy/MM/dd"
                size="small"
                type="daterange"
                placement="bottom-end"
                placeholder="自定义时间"
                style="width: 250px;"
                @change="onchangeTime"
              />
            </el-form-item>
            <el-form-item label="消息名称：">
              <el-input v-model="tableFrom.keyword" @keyup.enter.native="getList(1)" placeholder="请输入消息名称搜索" class="selWidth">
                <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
            <el-button size="small" type="primary" @click="createNews">发布消息</el-button>
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
          prop="notice_title"
          label="消息名称"
          min-width="150"
        />
        <el-table-column
          prop="create_time"
          label="发送日期"
          min-width="180"
        />
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item>
                <span>{{ props.row.notice_content }}</span>
              </el-form-item>
              <el-form-item v-if="props.row.type === 3 || props.row.type === 4" label="商户分类：">
                <span class="mr10">{{ props.row.type_str ? props.row.type_str : '-' }}</span>
              </el-form-item>
              <el-form-item v-if="props.row.type === 1 || props.row.type === 4" label="商户名称：">
                <span v-if="props.row.type_str" class="mr10">{{ props.row.type_str ? props.row.type_str : '-' }}</span>
                <span v-else>-</span>
              </el-form-item>
              <el-form-item v-if="props.row.type === 2 || props.row.type === 4" label="商户类别：">
                <span v-if="props.row.type_str" class="mr10">{{ props.row.type_str ? props.row.type_str : '-' }}</span>
                <span v-else>-</span>
              </el-form-item>
            </el-form>
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
    <el-dialog
      title="发布消息"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <el-form ref="formValidate" v-loading="fullscreenLoading" class="formValidate mt20" :rules="ruleValidate" :model="formValidate" label-width="100px" @submit.native.prevent>
        <el-form-item label="消息名称：" prop="notice_title">
          <el-input v-model="formValidate.notice_title" placeholder="请输入消息名称" />
        </el-form-item>
        <el-form-item label="消息内容：" prop="notice_content">
          <el-input v-model="formValidate.notice_content" maxLength="500" placeholder="仅限500字" type="textarea" :rows="2" />
        </el-form-item>
        <el-form-item label="选择商户">
          <el-radio-group v-model="formValidate.type">
            <el-radio :label="4">全部</el-radio>
            <el-radio :label="1">商户名称</el-radio>
            <el-radio :label="2">商户类别</el-radio>
            <el-radio :label="3">商户分类</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="formValidate.type === 1" label="商户名称：">
          <el-select v-model="formValidate.mer_id" multiple clearable filterable placeholder="请选择" class="selWidth" @change="getList(1)">
            <el-option
              v-for="item in merSelect"
              :key="item.mer_id"
              :label="item.mer_name"
              :value="item.mer_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="formValidate.type === 2" label="商户类别：">
          <el-select
            v-model="formValidate.is_trader"
            clearable
            placeholder="请选择"
            class="selWidth"
          >
            <el-option label="自营" value="1" />
            <el-option label="非自营" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="formValidate.type === 3" label="商户分类：">
          <el-select
            v-model="formValidate.category_id"
            multiple
            placeholder="请选择"
            class="filter-item selWidth mr20"
            clearable
            @change="getList()"
          >
            <el-option
              v-for="item in merCateList"
              :key="item.merchant_category_id"
              :label="item.category_name"
              :value="item.merchant_category_id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('formValidate')">确 定</el-button>
      </div>
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
import { stationNewsList, createNotice } from '@/api/system'
import { merCategoryListApi, merSelectApi } from '@/api/product'
import { fromList } from "@/libs/constants.js";
export default {
  name: 'SystemLog',
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
      fromList: fromList,
      dialogVisible: false,
      categoryList: [],
      merCateList: [],
      merSelect: [],
      fullscreenLoading: false,
      tableFrom: {
        page: 1,
        limit: 20,
        store_name: '',
        keyword: '',
        date: ''
      },
      formValidate: {
        type: 4,
        notice_title: '',
        notice_content: '',
        is_trader: '',
        mer_id: [],
        category_id: []
      },
      timeVal: '',
      ruleValidate: {
        notice_title: [
          { required: true, message: "请输入消息名称", trigger: "blur" },
        ],
        notice_content: [
          { required: true, message: "请输入消息内容", trigger: "blur" },
        ]

      },
    }
  },
  mounted() {
    this.getCategorySelect();
    this.getMerSelect();
    this.getList('');
  },
  methods: {
    // 商户分类；
    getCategorySelect() {
      merCategoryListApi().then(res => {
        this.merCateList = res.data.list
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    // 商户列表；
    getMerSelect() {
      merSelectApi().then(res => {
        this.merSelect = res.data
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    // 具体日期
    onchangeTime(e) {
        this.timeVal = e
        this.tableFrom.date = e ? this.timeVal.join('-') : ''
         this.getList(1);
     },
    // 选择时间
    selectChange(tab) {
      this.tableFrom.date = tab;
      this.tableFrom.page = 1;
      this.timeVal = [];
      this.getList(1);
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page;
      stationNewsList(this.tableFrom).then(res => {
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

    createNews(){
      this.dialogVisible = true;
      this.formValidate = {
          type: 4,
          notice_title: '',
          notice_content: '',
          is_trader: '',
          category_id: ''
      }
    },
    handleSubmit(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          createNotice(this.formValidate).then(async res => {
            this.fullscreenLoading = false
            this.$message.success(res.message)
            this.dialogVisible = false
            this.getList(1)
          }).catch(res => {
            this.fullscreenLoading = false
            this.$message.error(res.message)
          })
        } else {
          return false
        }
      })
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
