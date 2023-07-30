<template>
    <el-main>
        <el-container>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="180px">
                <el-form-item label="虚拟成团启用：" required>
                    <el-radio-group v-model="ruleForm.ficti_status">
                        <el-radio :label="1">启用</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="ruleForm.ficti_status == 1" label="真实成团最小比例：" prop="group_buying_rate">
                    <span style="color: #606266;">
                        <el-input-number v-model="ruleForm.group_buying_rate" placeholder="请输入排序序号" :min="1" :max="100" style="width: 200px;"/> %
                    </span>
                </el-form-item>
                <el-form-item v-if="ruleForm.ficti_status == 1" label="虚拟成团补齐最大比例：">
                   <span style="color: #606266;"> {{100 - Number(ruleForm.group_buying_rate)}}%</span>
                </el-form-item>
                <el-form-item style="margin-top:30px;">
                    <el-button :loading="loading" type="primary" class="submission" size="small" @click="handleSubmit('ruleForm')">确认</el-button>
            </el-form-item>
            </el-form>
        </el-container>
    </el-main>
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
import { combinationSetApi, combinationDataApi } from '@/api/marketing'
export default {
  name: 'combinationSet',
  data() {
    return {
       loading: false,
       ruleForm: {
          ficti_status: 0,
          group_buying_rate: ''
        },
        rules: {
          group_buying_rate: [
            { required: true, message: '请输入真实成团最小比例', trigger: 'blur' }
          ]
        }
    }
  },
  mounted() {
      this.getCombinationData();
  },
  methods: {
    getCombinationData(){
        combinationDataApi().then((res) => {
            if (res.data && res.data.ficti_status) {
                res.data.ficti_status = Number(res.data.ficti_status)
            }
            this.ruleForm = res.data
        }).catch((res) => {
            this.$message.error(res.message);
        });
    },
   handleSubmit(name){
      this.$refs[name].validate((valid) => {
            if (valid) {
                combinationSetApi(this.ruleForm).then((res) => {
                    this.$message.success(res.message);
                }).catch((res) => {
                    this.$message.error(res.message);
                });
            } else {
                if (
                    !this.ruleForm.minRatio || !this.ruleForm.maxRatio
                ) {
                    this.$message.warning("请填写完数据！");
                }
            }
        });
   }
  }
}
</script>

<style scoped lang="scss">

</style>
