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
const deviseRouter =
  {
    path: `${roterPre}/devise`,
    name: 'devise',
    meta: {
      icon: '',
      title: '店铺装修'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'diy/index',
        name: 'NotificDiyation',
        meta: {
          title: '店铺装修',
          noCache: true,
          activeMenu: `${roterPre}/devise/diy/list`
        },
        component: () => import('@/views/devise/index')
      },
      {
        path: 'diy/list',
        name: 'DecorationDiyation',
        meta: {
          title: '装修列表',
          noCache: true,
         

        },
        component: () => import('@/views/devise/list')
      }
    ]
  }

export default deviseRouter
