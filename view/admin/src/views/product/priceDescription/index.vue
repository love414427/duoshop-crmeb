<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header">
        <div class="container">
          <div class="demo-input-suffix acea-row">
            <el-form inline size="small" label-width="90px">
              <el-form-item label="商品分类：">
                <el-cascader v-model="tableFrom.cate_id" class="selWidth" :options="merCateList" :props="{ checkStrictly: true }" clearable @change="getList(1)" />
              </el-form-item>
               <el-form-item label="显示状态：">
                <el-select v-model="tableFrom.is_show" clearable filterable placeholder="请选择" class="selWidth" @change="getList(1)">
                  <el-option label="显示" value="1" />
                  <el-option label="不显示" value="0" />
                </el-select>
              </el-form-item>
              <el-form-item label="搜索：">
                <el-input v-model="tableFrom.keyword" @keyup.enter.native="getList(1)" placeholder="请输入须知名称" class="selWidth">
                  <el-button slot="append" icon="el-icon-search" class="el-button-solt" @click="getList(1)" />
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <el-button size="small" type="primary" @click="onAdd">添加价格说明</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
      >
        <el-table-column prop="rule_id" label="ID" min-width="60" />
        <el-table-column prop="rule_name" label="名称" min-width="60" />
        <el-table-column label="使用分类" min-width="60">
          <template slot-scope="scope">
            <span >{{scope.row.cate_name.toString() || '默认全部'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" min-width="60" />
        <el-table-column prop="is_show" label="是否显示" min-width="100">
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
        <el-table-column prop="update_time" label="更新时间" min-width="100" />
        <el-table-column prop="create_time" label="创建时间" min-width="100" />
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="handleDelete(scope.row.rule_id, scope.$index)"
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
    <!--添加编辑弹窗-->
     <el-dialog :title="rule_id ? '编辑说明' : '添加说明'" :visible.sync="dialogVisible" width="900px" :before-close="handleClose">
      <el-form ref="formValidate" v-loading="fullscreenLoading" class="formValidate mt20" :rules="ruleValidate" :model="formValidate" label-width="120px" @submit.native.prevent>
        <el-form-item label="名称：" prop="rule_name">
          <el-input v-model="formValidate.rule_name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="使用商品分类：">
          <el-cascader v-model="formValidate.cate_id" class="selWidth" :options="merCateList" :props="{ multiple: true, checkStrictly: true, emitPath: false }" clearable />  <span>    注: 当不选择任何分类时，默认全部商品</span>
        </el-form-item>
        <el-form-item label="是否显示：" prop="is_show">
          <el-switch v-model="formValidate.is_show" :active-value="1" :inactive-value="0" active-text="显示" inactive-text="隐藏" :width="60" />
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-input-number v-model="formValidate.sort" placeholder="请输入排序序号" />
        </el-form-item>
        <el-col :span="24">
          <el-form-item label="价格说明详情：" prop="content">
            <ueditor-from v-model="formValidate.content" :content="formValidate.content" />
          </el-form-item>
        </el-col>
        <el-form-item style="margin-top:30px;">
          <el-button type="primary" class="submission" size="small" @click="handleSubmit('formValidate')">提交</el-button>
        </el-form-item>
      </el-form>
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
import ueditorFrom from '@/components/ueditorFrom'
import {
  categoryListApi, priceRuleLstApi, createPriceRuleApi, updatePriceRuleApi, deletePriceRuleApi, priceRuleStatusApi
} from "@/api/product";
export default {
  name: "LabelList",
  components: {
    ueditorFrom,
  },
  data() {
    return {
      listLoading: true,
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        cate_id: [],
        is_show: '',
        keyword: '',
        page: 1,
        limit: 20,
      },
      rule_id: '',
      merCateList: [],
      dialogVisible: false,
      fullscreenLoading: false,
      formValidate: {},
      ruleValidate: {
        rule_name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        sort: [{ required: true, message: "请输入排序", trigger: "change" }],
        content: [{ required: true, message: "请输入说明详情", trigger: "blur" }],
      }
    };
  },
  mounted() {
    this.getCategorySelect();
    this.getList('');
  },
  methods: {  
    // 商品分类；
    getCategorySelect() {
      categoryListApi().then(res => {
        this.merCateList = res.data
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      priceRuleLstApi(this.tableFrom)
        .then((res) => {
          res.data.list.forEach((item,index)=>{
            item.cate_id=[];
            item.cate_name= [];
            let cate_name = ''
            item.cate.forEach((val,idx)=>{
              cate_name = (val.category && val.category.cate_name) ? val.category.cate_name : ''
              item.cate_id.push(val.right_id)
              item.cate_name.push(cate_name)
            })
          })
          this.tableData.data = res.data.list;
          console.log(this.tableData.data)
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
      this.rule_id = "";
      this.dialogVisible = true;
      this.reset()
    },
    // 编辑
    onEdit(row) {
      this.rule_id = row.rule_id;
      this.formValidate = row;
      this.dialogVisible = true;
    },
    reset() {
      this.formValidate = {
        cate_id: [],
        rule_name: '',
        content: '',
        is_show: 0,
        sort: ''
      }
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure('确定删除该说明').then(() => {
        deletePriceRuleApi(id)
          .then(({ message }) => {
            this.$message.success(message);
            this.getList('');
          })
          .catch(({ message }) => {
            this.$message.error(message);
          });
      });
    },
    onchangeIsShow(row) {
      priceRuleStatusApi(row.rule_id, {is_show: row.is_show})
        .then(({ message }) => {
          this.$message.success(message);
          this.getList('');
        })
        .catch(({ message }) => {
          this.$message.error(message);
        });
    },
     // 提交
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if(valid) {
          this.rule_id ? 
          updatePriceRuleApi(this.rule_id,this.formValidate).then(async res => {
            this.fullscreenLoading = false
            this.$message.success(res.message)
            this.dialogVisible = false
            this.getList('')
          }).catch(res => {
            this.fullscreenLoading = false
            this.$message.error(res.message)
          }) :
          createPriceRuleApi(this.formValidate).then(async res => {
            this.fullscreenLoading = false
            this.$message.success(res.message)
            this.dialogVisible = false
            this.getList('')
          }).catch(res => {
            this.fullscreenLoading = false
            this.$message.error(res.message)
          })
        } else {
          return false
        }
      })
    },
    handleClose() {
      this.dialogVisible = false;
    }
  },
};
</script>

<style scoped lang="scss">
.selWidth {
  width: 300px !important;
}
</style>
