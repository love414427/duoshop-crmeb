<template>
  <div>
    <el-form ref="formDynamic" size="small" :model="formDynamic" :rules="rules" class="attrFrom mb20" label-width="100px" @submit.native.prevent>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="模板名称：" prop="template_name">
            <el-input v-model="formDynamic.template_name" placeholder="请输入模板名称" />
          </el-form-item>
        </el-col>
        <el-col v-for="(item, index) in formDynamic.template_value" :key="index" :span="24" class="noForm">
          <el-form-item>
            <div class="acea-row row-middle"><span class="mr5">{{ item.value }}</span><i class="el-icon-circle-close" @click="handleRemove(index)" /></div>
            <div class="rulesBox">
              <el-tag
                v-for="(j, indexn) in item.detail"
                :key="indexn"
                closable
                size="medium"
                :disable-transitions="false"
                class="mb5 mr10"
                @close="handleClose(item.detail,indexn)"
              >
                {{ j }}
              </el-tag>
              <el-input
                v-if="item.inputVisible"
                ref="saveTagInput"
                v-model="item.detail.attrsVal"
                class="input-new-tag"
                size="small"
                maxlength="30"
                @keyup.enter.native="createAttr(item.detail.attrsVal,index)"
                @blur="createAttr(item.detail.attrsVal,index)"
              />
              <el-button v-else class="button-new-tag" size="small" @click="showInput(item)">+ 添加</el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col v-if="isBtn" :span="24" class="mt10" style="padding-left: 0;padding-right: 0;">
          <el-col :span="8">
            <el-form-item label="规格：">
              <el-input v-model="attrsName" maxlength="30" placeholder="请输入规格" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="规格值：">
              <el-input v-model="attrsVal" maxlength="30" placeholder="请输入规格值" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" class="mr10" @click="createAttrName">确定</el-button>
            <el-button @click="offAttrName">取消</el-button>
          </el-col>
        </el-col>
        <Spin v-if="spinShow" size="large" fix />
      </el-row>
      <el-form-item>
        <el-button v-if="!isBtn" type="primary" icon="md-add" class="mt10" @click="addBtn">添加新规格</el-button>
      </el-form-item>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-form>
    <span class="footer acea-row">
      <el-button @click="resetForm('formDynamic')">取消</el-button>
      <el-button :loading="loading" type="primary" @click="handleSubmit('formDynamic')">确 定</el-button>
    </span>
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
import { attrCreatApi, attrEdittApi } from '@/api/product'
export default {
  name: 'CreatAttr',
  props: {
    currentRow: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialogVisible: false,
      inputVisible: false,
      inputValue: '',
      spinShow: false,
      loading: false,
      grid: {
        xl: 3,
        lg: 3,
        md: 12,
        sm: 24,
        xs: 24
      },
      modal: false,
      index: 1,
      rules: {
        template_name: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ]
      },
      formDynamic: {
        template_name: '',
        template_value: []
      },
      attrsName: '',
      attrsVal: '',
      formDynamicNameData: [],
      isBtn: false,
      formDynamicName: [],
      results: [],
      result: [],
      ids: 0
    }
  },
  watch: {
    currentRow: {
      handler: function(val, oldVal) {
        this.formDynamic = val
      },
      immediate: true
    }
  },
  mounted() {
    this.formDynamic.template_value.map(item => {
      this.$set(item, 'inputVisible', false)
    })
  },
  methods: {
    resetForm(formName) {
      this.$msgbox.close()
      this.clear()
      this.$refs[formName].resetFields()
    },
    // 添加按钮
    addBtn() {
      this.isBtn = true
    },
    handleClose(item, index) {
      item.splice(index, 1)
    },
    // 取消
    offAttrName() {
      this.isBtn = false
    },
    // 删除
    handleRemove(index) {
      this.formDynamic.template_value.splice(index, 1)
    },
    // 添加规则名称
    createAttrName() {
      if (this.attrsName && this.attrsVal) {
        const data = {
          value: this.attrsName,
          detail: [
            this.attrsVal
          ]
        }
        this.formDynamic.template_value.push(data)
        var hash = {}
        this.formDynamic.template_value = this.formDynamic.template_value.reduce(function(item, next) {
          /* eslint-disable */
            hash[next.value] ? '' : hash[next.value] = true && item.push(next);
            return item
          }, [])
          this.attrsName = '';
          this.attrsVal = '';
          this.isBtn = false;
        } else {
          if(!this.attrsName){
            this.$message.warning('请输入规格名称！');
            return
          }
          if(!this.attrsVal){
            this.$message.warning('请输入规格值！');
            return
          }

        }
      },
      // 添加属性
      createAttr (num, idx) {
        if (num) {
          this.formDynamic.template_value[idx].detail.push(num);
          var hash = {};
          this.formDynamic.template_value[idx].detail = this.formDynamic.template_value[idx].detail.reduce(function (item, next) {
            /* eslint-disable */
            hash[next] ? '' : hash[next] = true && item.push(next);
            return item
          }, [])
          this.formDynamic.template_value[idx].inputVisible = false
        } else {
          this.$message.warning('请添加属性');
        }
      },
    showInput(item) {
      this.$set(item, 'inputVisible', true)
    },
      // 提交
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.formDynamic.template_value.length === 0) {
              return this.$message.warning('请至少添加一条属性规格！');
            }
            this.loading = true;
            setTimeout(() => {
              this.currentRow.attr_template_id? attrEdittApi(this.currentRow.attr_template_id,this.formDynamic).then(res => {
                this.$message.success(res.message);
                this.loading = false;
                setTimeout(() => {
                  this.$msgbox.close()
                }, 500);
                setTimeout(() => {
                  this.clear();
                  this.$emit('getList');
                }, 600);
              }).catch(res => {
                this.loading = false;
                this.$message.error(res.message);
              }):attrCreatApi(this.formDynamic).then(res => {
                this.$message.success(res.message);
                this.loading = false;
                setTimeout(() => {
                  this.$msgbox.close()
                }, 500);
                setTimeout(() => {
                  this.$emit('getList');
                  this.clear();
                }, 600);
              }).catch(res => {
                 this.loading = false;
                this.$message.error(res.message);
              })
            }, 1200);
          } else {
            return false
          }
        })
      },
      clear () {
        this.$refs['formDynamic'].resetFields();
        this.formDynamic.template_value = [];
        this.formDynamic.template_name=''
        this.isBtn = false;
        this.attrsName = '';
        this.attrsVal = '';
      },
      handleInputConfirm() {
        const inputValue = this.inputValue
        if (inputValue) {
          this.dynamicTags.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .button-new-tag {
    height: 28px;
    line-height: 26px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .footer{
    justify-content: flex-end;
  }
</style>
