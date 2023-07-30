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
const serviceRouter  =
  {
    path: `${roterPre}/service`,
    name: 'service',
    meta: {
      icon: '',
      title: '公告列表'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'settings',
        name: 'serviceSettings',
        meta: {
          title: '服务设置'
        },
        component: () => import('@/views/service/settings/index')
      },
      {
        path: 'purchase',
        name: 'purchaseRecord',
        meta: {
          title: '购买记录'
        },
        component: () => import('@/views/service/purchase/index')
      },
      {
        path: 'balance_record',
        name: 'balanceRecord',
        meta: {
          title: '商户结余记录'
        },
        component: () => import('@/views/service/balanceRecord/index')
      },
      {
        path: 'customer/list',
        name: 'customerList',
        meta: {
          title: '客服管理'
        },
        component: () => import('@/views/service/customer/index')
      }
    ]
  }

export default serviceRouter
