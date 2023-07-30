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
const promoterRouter =
  {
    path: `${roterPre}/promoter`,
    name: 'promoter',
    meta: {
      icon: '',
      title: '设置'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'config',
        name: 'PromoterConfig',
        meta: {
          title: '分销配置',
          noCache: true
        },
        component: () => import('@/views/promoter/config/index')
      },
      {
        path: 'user',
        name: 'AccountsUser',
        meta: {
          title: '分销员列表',
          noCache: true
        },
        component: () => import('@/views/promoter/user/index')
      },
      {
        path: 'bank/:id?',
        name: 'PromoterBank',
        meta: {
          title: '页面设置',
          noCache: true
        },
        component: () => import('@/views/system/groupData/data')
      },
      {
        path: 'commission',
        name: 'commissionDes',
        meta: {
          title: '佣金说明',
          noCache: true
        },
        component: () => import('@/views/promoter/commission/index')
      },
      {
        path: 'gift',
        name: 'AccountsGift',
        meta: {
          title: '分销礼包',
          noCache: true
        },
        component: () => import('@/views/promoter/gift/index')
      },
      {
        path: 'membership_level',
        name: 'PromoterLevel',
        meta: {
          title: '分销等级',
          noCache: true
        },
        component: () => import('@/views/promoter/membershipLevel/index')
      },
      {
        path: 'distribution',
        name: 'distributionRules',
        meta: {
          title: '分销等级规则',
          noCache: true
        },
        component: () => import('@/views/promoter/distributionRules/index')
      }
      
    ]
  }

export default promoterRouter
