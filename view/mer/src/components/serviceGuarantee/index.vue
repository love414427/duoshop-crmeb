<template>
  <div>
    <el-dialog :title="isEdit ? '编辑服务说明模板' : '添加服务说明模板'" :visible.sync="dialogVisible" width="1000px">
      <el-form ref="formValidate" class="formValidate mt20" :model="formValidate" :rules="ruleInline" label-width="100px" label-position="right">
        <el-form-item label="模板名称：" prop="template_name">
          <el-input v-model="formValidate.template_name" placeholder="请输入模板名称" size="small" />
        </el-form-item>
        <el-form-item label="服务条款：" prop="template_value">
          <div class="acea-row">
            <el-tag
              v-for="(tag, index) in termsService"
              :key="index"
              class="mr10"
              closable
              :disable-transitions="false"
              @close="handleCloseItems(tag)"
            >{{ tag.guarantee_name }}</el-tag>
          </div>
        </el-form-item>
        <el-form-item>
          <el-input v-model="guarantee_name" placeholder="请输入服务条款名称搜索" class="selWidth" size="small" @keyup.enter.native="getServiceTerms">
            <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getServiceTerms" />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="formValidate.template_value" @change="handleCheckedTermsChange">
            <el-checkbox v-for="item in termsList" v-show="item.isShow" :key="item.guarantee_id" :label="item.guarantee_id" class="guarantee_checkbox">
              <span class="guarantee_name">{{ item.guarantee_name }}</span>
              <span class="guarantee_info">{{ item.guarantee_info }}</span></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input-number v-model="formValidate.sort" placeholder="请输入排序" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="!isEdit" type="primary" :loading="loading" @click="createGuarantee('formValidate')">确 定</el-button>
        <el-button v-else type="primary" :loading="loading" @click="updateGuarantee('formValidate')">确 定</el-button>
      </span>
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
import { guaranteeAddApi, guaranteeUpdateApi, guaranteeDetailApi, guaranteeSelectApi } from '@/api/product'

export default {
  name: 'CreatGuarantee',

  data() {
    return {
      isEdit: false,
      dialogVisible: false,
      loading: false,
      guarantee_id: '',
      guarantee_name: '',
      termsService: [],
      termsList: [],
      formValidate: {
        template_name: '',
        template_value: [],
        sort: ''
      },
      ruleInline: {
        template_name: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ],
        template_value: [
          { required: true, message: '请选择服务条款', trigger: 'change' }
        ]
      }
    }
  },
  watch: {

  },
  mounted() {
    this.getServiceTerms()
  },
  methods: {
    /** 获取服务条款 */
    getServiceTerms() {
      guaranteeSelectApi({ keyword: this.guarantee_name }).then((res) => {
        if (this.guarantee_name) {
          this.getSearchItem(res.data)
        } else {
          this.termsList = res.data
          this.termsList.forEach((item, index) => {
            item.isShow = true
          })
        }
      })
        .catch(({ message }) => {
          this.$message.error(message)
        })
    },
    /** 把搜索结果显示出来 */
    getSearchItem(arr) {
      this.termsList.forEach((item, index) => {
        if (arr.length > 0) {
          arr.forEach((itemn, indexn) => {
            if (itemn.guarantee_id == item.guarantee_id) {
              item.isShow = true
            } else {
              item.isShow = false
            }
          })
        } else {
          item.isShow = false
        }
        this.$set(this.termsList, index, item)
        console.log(this.termsList)
      })
    },
    handleCheckedTermsChange(value) {
      this.getSelectedItems(value)
    },
    handleCloseItems(tag) {
      this.termsService.splice(this.termsService.indexOf(tag), 1)
      this.formValidate.template_value = []
      this.termsService.map(item => {
        this.formValidate.template_value.push(item.guarantee_id)
      })
    },
    /** 取出选择的服务条款 */
    getSelectedItems(arr) {
      this.termsService = []
      this.termsList.forEach((item, index) => {
        arr.forEach((itemn, indexn) => {
          if (itemn == item.guarantee_id) {
            this.termsService.push(item)
          }
        })
      })
    },
    // 编辑
    handleEdit(id) {
      this.isEdit = true
      this.dialogVisible = true
      this.loading = false
      this.guarantee_id = id
      guaranteeDetailApi(id).then((res) => {
        const data = res.data
        this.formValidate = {
          template_name: data.template_name,
          template_value: data.template_value,
          sort: data.sort
        }
        this.getSelectedItems(data.template_value)
        this.$refs['formValidate'].clearValidate()
      })
        .catch(({ message }) => {
          this.$message.error(message)
        })
    },
    add() {
      this.isEdit = false
      this.dialogVisible = true
      this.loading = false
      this.guarantee_name = ""
      this.formValidate = {
        template_name: '',
        template_value: [],
        sort: ''
      }
      this.getServiceTerms()
    },
    /** 添加 */
    createGuarantee(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true
          guaranteeAddApi(this.formValidate)
            .then(({ message }) => {
              this.$message.success(message)
              this.dialogVisible = false
              this.loading = false
              this.$emit('get-list', '')
            })
            .catch(({ message }) => {
              this.loading = false
              this.$message.error(message)
            })
        }
      })
    },
    /** 编辑 */
    updateGuarantee(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true
          guaranteeUpdateApi(this.guarantee_id, this.formValidate)
            .then(({ message }) => {
              this.$message.success(message)
              this.dialogVisible = false
              this.loading = false
              this.$emit('get-list', '')
            })
            .catch(({ message }) => {
              this.loading = false
              this.$message.error(message)
            })
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
/deep/.selWidth{
    width: 300px!important;
}
.guarantee_info{
    display: block;
}
/deep/.el-checkbox__input{
    vertical-align: top;
    top: 3px;
}
/deep/.el-checkbox__label{
    white-space: normal;  word-break: break-all;
}
.guarantee_name{
    font-weight: bold;
    color: #333;
}
</style>
