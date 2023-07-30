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
const accountsRouter =
  {
    path: `${roterPre}/accounts`,
    name: 'accounts',
    meta: {
      icon: '',
      title: '财务'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'reconciliation',
        name: 'AccountsReconciliation',
        meta: {
          title: '财务对账',
          noCache: true
        },
        component: () => import('@/views/accounts/reconciliation/index')
      },
      {
        path: 'statement',
        name: 'AccountsStatement',
        meta: {
          title: '财务账单',
          noCache: true
        },
        component: () => import('@/views/accounts/statement/index')
      },
      {
        path: 'reconciliation/order/:id',
        name: 'ReconciliationOrder',
        component: () => import('@/views/accounts/reconciliation/record'),
        meta: {
          title: '查看订单',
          noCache: true,
          activeMenu: `${roterPre}/accounts/reconciliation`
        },
        hidden: true
      },
      {
        path: 'capitalFlow',
        name: 'AccountsCapitalFlow',
        meta: {
          title: '资金流水',
          noCache: true
        },
        component: () => import('@/views/accounts/capitalFlow/index')
      },
      {
        path: 'transManagement',
        name: 'AccountsTransManagement',
        meta: {
          title: '对账管理',
          noCache: true
        },
        component: () => import('@/views/accounts/transManage/index')
      },
      {
        path: 'payType',
        name: 'AccountsPayType',
        meta: {
          title: '收款方式',
          noCache: true
        },
        component: () => import('@/views/accounts/payType')
      }
    ]
  }
export default accountsRouter
