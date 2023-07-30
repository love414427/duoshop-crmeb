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
const userRouter =
  {
    path: `${roterPre}/user`,
    name: 'user',
    meta: {
      title: '用户管理'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'group',
        component: () => import('@/views/user/group'),
        name: 'UserGroup',
        meta: { title: '用户分组', noCache: true }
      },
      {
        path: 'label',
        component: () => import('@/views/user/group'),
        name: 'UserLabel',
        meta: { title: '用户标签', noCache: true }
      },
      {
        path: 'list',
        component: () => import('@/views/user/list'),
        name: 'UserList',
        meta: { title: '用户列表', noCache: true }
      },
      {
        path: 'searchRecord',
        component: () => import('@/views/user/search'),
        name: 'searchRecord',
        meta: { title: '用户搜索记录', noCache: true }
      },
      {
        path: 'agreement',
        component: () => import('@/views/user/agreement'),
        name: 'UserAgreement',
        meta: { title: '协议与隐私政策', noCache: true }
      },
      {
        path: 'member',
        name: 'Member',
        meta: {
          title: '会员',
          noCache: true
        },
        redirect: 'noRedirect',
        component: () => import('@/views/user/member/index'),
        children: [
          {
            path: 'config',
            name: 'memberConfig',
            meta: {
              title: '会员配置',
              noCache: true
            },
            component: () => import('@/views/user/member/config')
          },
          {
            path: 'list',
            name: 'memberList',
            meta: {
              title: '会员管理',
              noCache: true
            },
            component: () => import('@/views/user/member/list')
          },
          {
            path: 'interests',
            name: 'memberInterests',
            meta: {
              title: '等级会员权益',
              noCache: true
            },
            component: () => import('@/views/user/member/interests')
          },
          {
            path: 'equity',
            name: 'memberEquity',
            meta: {
              title: '会员权益',
              noCache: true
            },
            component: () => import('@/views/user/member/equity')
          },
          {
            path: 'description',
            name: 'memberDescription',
            meta: {
              title: '用户等级说明',
              noCache: true
            },
            path: 'description',
            component: () => import('@/views/user/member/description')
          },
          {
            path: 'vipAgreement',
            name: 'vipAgreement',
            meta: {
              title: '会员协议',
              noCache: true
            },
            path: 'vipAgreement',
            component: () => import('@/views/user/member/vipAgreement')
          },
          {
            path: 'type',
            name: 'vipType',
            meta: {
              title: '会员类型',
              noCache: true
            },
            component: () => import('@/views/user/member/type')
          },
          {
            path: 'record',
            name: 'vipRecord',
            meta: {
              title: '会员记录',
              noCache: true
            },
            component: () => import('@/views/user/member/record')
          },
        ]
      },
    ]
  }

export default userRouter
