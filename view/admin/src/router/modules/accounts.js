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
        path: 'extract',
        name: 'AccountsExtract',
        meta: {
          title: '提现管理',
          noCache: true
        },
        component: () => import('@/views/accounts/extract/index')
      },
      {
        path: 'bill',
        name: 'AccountsBill',
        meta: {
          title: '充值记录',
          noCache: true
        },
        component: () => import('@/views/accounts/bill/index')
      },
      {
        path: 'capital',
        name: 'AccountsCapital',
        meta: {
          title: '资金记录',
          noCache: true
        },
        component: () => import('@/views/accounts/capital/index')
      },
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
        path: 'reconciliation/order/:id/:type?',
        name: 'ReconciliationOrder',
        component: () => import('@/views/merchant/list/record'),
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
        path: 'transferRecord',
        name: 'AccountsTransferRecord',
        meta: {
          title: '转账记录',
          noCache: true
        },
        component: () => import('@/views/accounts/transferRecord/index')
      },
      {
        path: 'setting',
        name: 'AccountsTransferSetting',
        meta: {
          title: '转账设置',
          noCache: true
        },
        component: () => import('@/views/accounts/transferManage/setting')
      },
      {
        path: 'invoiceDesc',
        name: 'AccountsInvoiceDesc',
        meta: {
          title: '发票说明',
          noCache: true
        },
        component: () => import('@/views/accounts/invoiceDesc/index')
      },
      {
        path: 'receipt',
        name: 'AccountsReceipt',
        meta: {
          title: '发票列表',
          noCache: true
        },
        component: () => import('@/views/accounts/receipt/index')
      },
      {
        path: 'settings',
        name: 'AccountsSetting',
        meta: {
          title: '转账设置',
          noCache: true
        },
        component: () => import('@/views/accounts/settings/index')
      },
    ]
  }

export default accountsRouter
