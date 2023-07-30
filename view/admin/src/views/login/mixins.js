// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import iHeaderI18n from '@/layouts/basic-layout/header-i18n'
import { mapState } from 'vuex'

export default {
  components: { iHeaderI18n },
  computed: {
    ...mapState('admin/layout', [
      'showI18n'
    ])
  }
}
