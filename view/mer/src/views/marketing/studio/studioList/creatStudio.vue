<template>
  <div class="divBox">
    <el-card class="box-card">
      <form-create
        v-if="FormData"
        ref="fc"
        v-loading="loading"
        :option="option"
        :rule="FormData.rule"
        class="formBox"
        handle-icon="false"
        @submit="onSubmit"
      />
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
import formCreate from '@form-create/element-ui'
import { createBroadcastApi } from '@/api/marketing'
import request from '@/api/request'
import { roterPre } from '@/settings'

export default {
  name: 'CreatCoupon',
  data() {
    return {
      option: {
        form: {
          labelWidth: '150px'
        },
        submitBtn: {
          loading: false
        },
        global: {
          upload: {
            props: {
              onSuccess(rep, file) {
                if (rep.status === 200) {
                  file.url = rep.data.src
                }
              }
            }
          }
        }
      },
      FormData: null,
      loading: false
    }
  },
  components: {
    formCreate: formCreate.$form()
  },
  mounted() {
    this.getFrom()
    /* eslint-disable */
    },
    methods: {
      getFrom() {
        this.loading = true
        createBroadcastApi().then(async res => {
           this.FormData = res.data
          this.loading = false
          this.$store.dispatch("settings/setEdit", true);
         }).catch(res => {
           this.$message.error(res.message)
           this.loading = false
         })
      },
      onSubmit(formData) {
        this.$refs.fc.$f.btn.loading(true);
        request[this.FormData.method.toLowerCase()](this.FormData.api, formData).then((res) => {
          this.$refs.fc.$f.btn.loading(false);
          this.$message.success(res.message || '提交成功')
          this.$store.dispatch("settings/setEdit", false);
          this.$router.push({ path: `${roterPre}/marketing/studio/list` })
        }).catch(err => {
          this.$refs.fc.$f.btn.loading(false);
          this.$message.error(err.message || '提交失败')
        })
      }
    }
  }
</script>

<style lang="scss" scoped >

</style>
