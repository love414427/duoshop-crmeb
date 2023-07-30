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
const merchantRouter =
    {
      path: `${roterPre}/merchant`,
      name: 'merchant',
      meta: {
        icon: 'dashboard',
        title: '商户管理'
      },
      alwaysShow: true,
      component: Layout,
      children: [
        {
          path: 'system',
          name: 'MerchantSystem',
          meta: {
            title: '商户权限管理',
            noCache: true
          },
          component: () => import('@/views/merchant/system/index')
        },
        {
          path: 'list',
          name: 'MerchantList',
          meta: {
            title: '商户列表',
            noCache: true
          },
          component: () => import('@/views/merchant/list/index')
        },
        {
          path: 'list/reconciliation/:id/:type?',
          name: 'MerchantRecord',
          component: () => import('@/views/merchant/list/record'),
          meta: {
            title: '商户对账',
            noCache: true,
            activeMenu: `${roterPre}/merchant/list`
          },
          hidden: true
        },
        {
          path: 'classify',
          name: 'MerchantClassify',
          meta: {
            title: '商户分类',
            noCache: true
          },
          component: () => import('@/views/merchant/classify')
        },
        {
          path: 'application',
          name: 'MerchantApplication',
          meta: {
            title: '商户申请',
            noCache: true
          },
          component: () => import('@/views/merchant/application')
        },
        {
          path: 'agree',
          name: 'MerchantAgreement',
          meta: {
            title: '入驻协议',
            noCache: true
          },
          component: () => import('@/views/merchant/agreement')
        },
        {
            path: 'type',
            name: 'storeType',
            meta: {
              title: '店铺类型',
              noCache: true
            },
            component: () => import('@/views/merchant/type/index')
          },
          {
            path: 'applyMents',
            name: 'MerchantApplyMents',
            meta: {
              title: '服务申请',
              noCache: true
            },
            component: () => import('@/views/merchant/applyments/index')
          },
          {
            path: 'applyList',
            name: 'ApplyList',
            meta: {
              title: '分账商户列表'
            },
            component: () => import('@/views/merchant/applyments/list')
          },
          {
            path: 'type/description',
            name: 'MerTypeDesc',
            meta: {
              title: '店铺类型说明',
              noCache: true
            },
            component: () => import('@/views/merchant/type/description')
          },
          {
            path: 'deposit_list',
            name: 'DepositList',
            meta: {
              title: '店铺保证金管理',
              noCache: true
            },
            component: () => import('@/views/merchant/deposit/index')
          },
          {
            path: 'recharge_record',
            name: 'RechargeRecord',
            meta: {
              title: '商户充值记录',
              noCache: true
            },
            component: () => import('@/views/merchant/rechargeRecord/index')
          },
      ]
    }

export default merchantRouter
