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
      icon: 'dashboard',
      title: '用户管理'
    },
    alwaysShow: true,
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'label',
        name: 'UserLabel',
        meta: { title: '用户标签', noCache: true },
        component: () => import('@/views/user/group'),
      },
      {
        path: 'maticlabel',
        name: 'UserAutoLabel',
        meta: { title: '自动标签', noCache: true },
        component: () => import('@/views/user/label'),
      },
      {
        path: 'list',
        name: 'UserList',
        meta: { title: '用户列表', noCache: true },
        component: () => import('@/views/user/list'),
      },
      {
        path: 'searchRecord',
        name: 'searchRecord',
        meta: { title: '用户搜索记录', noCache: true },
        component: () => import('@/views/user/search'),
      },
      {
        path: 'memberRecord',
        name: 'memberRecord',
        meta: { title: '付费会员记录', noCache: true },
        component: () => import('@/views/user/member/record'),
      }
    ]
  }

export default userRouter
