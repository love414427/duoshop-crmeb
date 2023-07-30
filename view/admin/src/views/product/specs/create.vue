<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header">
        <div class="container">
          <div class="demo-input-suffix acea-row">
            <el-form label-width="120px" :rules="ruleValidate" :model="formValidate" ref="formValidate">
              <el-form-item label="参数模板名称：" prop="template_name">
                <el-input v-model="formValidate.template_name" placeholder="请输入参数模板名称" class="selWidth" />
              </el-form-item>
              <el-form-item label="平台分类：" prop="cate_ids">
                <el-cascader v-model="formValidate.cate_ids" class="selWidth" filterable :options="cateList" :props="{ multiple: true, emitPath: false }" clearable />
              </el-form-item>
              <el-form-item label="排序：">
                <el-input-number v-model="formValidate.sort" label="排序" />
              </el-form-item>
              <el-form-item label="">
                <el-table
                  :data="data"
                  border
                  size="small"
                  style="width: 100%"
                >
                  <el-table-column align="center" prop="name" label="参数名称" min-width="200">
                    <template slot-scope="scope">
                    <el-input v-model="scope.row.name" class="priceBox"/>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="参数值" min-width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.value" class="priceBox"/>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="排序" min-width="300">
                    <template slot-scope="scope">
                      <el-input-number v-model="scope.row.sort" :min="0" class="priceBox" controls-position="right"/>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作" min-width="120">
                    <template slot-scope="scope">
                      <el-button type="text" class="submission" @click="delSpecs(scope.$index)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" @click="onAdd">添加参数</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        
      </div>
    </el-card>
    <el-card>
      <el-form>
        <el-form-item>
          <el-button size="small" type="primary" @click="handleSubmit('formValidate')">保存</el-button>
        </el-form-item>
      </el-form>
       
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
  productSpecs, specsUpdate, productSpecsInfo, categoryListApi
} from "@/api/product";
export default {
  name: "specsCreate",
  data() {
    return {
      listLoading: true,
      ruleValidate: {
        template_name: [
          { required: true, message: "请输入参数模板名称", trigger: "blur" },
        ],
        cate_ids: [
          { required: true, message: "请选择平台分类", trigger: "change" },
        ]
      },
      data: [],
      cateList: [],
      formValidate: {
        cate_ids: [],
        sort: 0,
      },
    };
  },
  created() {
    this.onAdd();
    if(this.$route.params.id)this.getInfo();
    this.getCategorySelect();
  },
  mounted() {
  
  },
  methods: {  
    // 添加
    onAdd() {
      let obj = { name: "", value: "", sort: 0,  parameter_id: 0 };
      this.data.push(obj);
    },
    // 编辑
    onEdit(id) {
      this.$modalForm(levelUpdateApi(id)).then(() => this.getList(''));
    },
    getInfo() {
      productSpecsInfo(this.$route.params.id).then((res) => {
        let cate_ids = []
        if(this.$route.params.id){
          if(this.$route.query.type != 'copy'){   
            res.data.cateId.forEach((item,index)=>{
              cate_ids.push(item.category.store_category_id)
            }) 
          }
        }
        this.formValidate = {
          template_name: res.data.template_name,
          sort: res.data.sort,
          cate_ids: cate_ids
        }
        this.data = res.data.parameter
      });
    },
     // 平台分类；
    getCategorySelect() {
      categoryListApi().then(res => {
        this.cateList = res.data
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    // 删除
    delSpecs(idx) {
      this.data.splice(idx, 1);
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.formValidate.params = this.data;
          for (let i = 0; i < this.formValidate.params.length; i++) {
            let data = this.formValidate.params[i];
            if (!data.name.trim()) {
              return this.$message.error("请输入参数名称");
            }
            if (!data.value.trim()) {
              return this.$message.error("请输入参数值");
            }
          }
          this.$route.params.id && this.$route.query.type != 'copy' ? 
          specsUpdate(this.$route.params.id, this.formValidate)
            .then((res) => {
              this.$message.success(res.message);
              this.$router.push({ path: "/admin/product/specs" });
            })
            .catch((err) => {
              this.$message.error(err.message);
            }) :
          productSpecs(this.formValidate)
            .then((res) => {
              this.$message.success(res.message);
              this.$router.push({ path: "/admin/product/specs" });
            })
            .catch((err) => {
              this.$message.error(err.message);
            });
        } else {
          // this.$message.error("请输入参数模板名称");
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.selWidth {
  width: 300px !important;
}
</style>
