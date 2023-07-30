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
const safeRouter =
  {
    path: `${roterPre}/safe`,
    name: 'Safe',
    meta: {
      icon: '',
      title: '维护'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'pageLinks',
        name: 'PageLinks',
        meta: {
          title: '页面链接'
        },
        component: () => import('@/views/safe/pageLinks/index')
      },
      {
        path: 'pcLinks',
        name: 'PcLinks',
        meta: {
          title: 'PC商城页面链接'
        },
        component: () => import('@/views/safe/pcLinks/index')
      }
    ]
  }

export default safeRouter
