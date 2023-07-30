// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import Layout from '@/layout'
import { roterPre } from '@/settings'
const exportFileRouter  =
  {
    path: `${roterPre}/export`,
    name: 'exportFile',
    meta: {
      icon: '',
      title: '导出文件'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'exportList',
        meta: {
          title: '导出文件'
        },
        component: () => import('@/views/exportFile/index')
      }
    ]
  }

export default exportFileRouter
