<template>
    <div class="ivu-global-footer i-copyright" v-if="openVersion !== '0'">
       <div v-if="version.status == -1" class="ivu-global-footer-copyright">{{ `Copyright ${version.year} ` }}<a :href="`http://${version.url}`" target="_blank">{{ version.version }}</a></div>
       <div v-else class="ivu-global-footer-copyright">{{ version.Copyright }}</div>
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
import { getVersion } from '@/api/accounts'
import log from '@/libs/util.log';
export default {
  name: 'i-copyright',
  data () {
    return {
      copyright: 'Copyright © 2022 西安众邦网络科技有限公司',
      openVersion: '0',
      copyright_status: '0',
      version: {}
    }
  },
  mounted () {
    this.getVersion();
  },
  methods: {
    getVersion () {
      getVersion().then((res) => {
        let version = res.data.version
        this.version = res.data;
        this.copyright = res.data.Copyright
        this.openVersion = res.data.sys_open_version;
      }).catch((res) => {
        this.$message.error(res.message);
      });
    }
  }
}
</script>
<style lang="scss" scoped>
    .ivu-global-footer {
      /* margin: 48px 0 24px 0; */
      /* padding: 0 16px; */
      margin: 15px 0px;
      text-align: center;
      box-sizing: border-box;
      margin-left: 210px;
    }
     .i-copyright {
       flex: 0 0 auto;
     }
    .ivu-global-footer-links {
      margin-bottom: 8px;
    }
    .ivu-global-footer-links a:not(:last-child) {
      margin-right: 40px;
    }
     .ivu-global-footer-links a {
       font-size: 14px;
       color: #808695;
       transition: all .2s ease-in-out;
     }
    .ivu-global-footer-copyright {
      color: #808695;
      font-size: 14px;
    }
</style>
