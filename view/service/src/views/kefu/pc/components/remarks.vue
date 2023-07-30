<template>
  <el-dialog
    title="请修改内容"
    :visible.sync="dialogVisible"
    width="520px"
    :show-close="false"
    :before-close="handleClose"
  >
    <el-form ref="formValidate" :model="formValidate" :rules="ruleInline" label-width="90px">
      <el-form-item label="备注：" prop="con" class="form-item" label-position="right">
        <el-input v-model="formValidate.con" placeholder="请输入备注" maxlength="200" type="textarea" :rows="5" show-word-limit />
      </el-form-item>
      <div class="mask-footer">
        <el-button size="small" type="primary" @click="handleSubmit('formValidate')">提交</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { orderRemark } from '@/api/kefu'
export default {
  name: 'Remarks',
  props: {
    remarkId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formValidate: {
        con: ''
      },
      ruleInline: {
        con: [
          { required: true, message: '请输入备注信息', trigger: 'change' }
        ]
      },
      dialogVisible: false
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    openBox() {
      this.dialogVisible = true
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          orderRemark({
            order_id: this.remarkId,
            remark: this.formValidate.con
          }).then(res => {
            this.$Message.success(res.msg)
            this.$emit('remarkSuccess')
          }).catch(error => {
            this.$Message.error(error.msg)
          })
        } else {

        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.mask-footer{
  text-align: right;
}
</style>
