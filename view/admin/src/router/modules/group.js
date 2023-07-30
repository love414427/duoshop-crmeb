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
const groupRouter =
    {
      path: `${roterPre}/group`,
      name: 'SystemGroup',
      meta: {
        icon: 'dashboard',
        title: '组合数据'
      },
      alwaysShow: true,
      component: Layout,
      children: [
        {
          path: 'list',
          name: 'SystemGroupList',
          meta: {
            title: '组合数据'
          },
          component: () => import('@/views/system/groupData/list')
        },
        {
          path: 'data/:id?',
          name: 'SystemGroupData',
          meta: {
            title: '组合数据列表',
            activeMenu: `${roterPre}/group/list`
          },
          component: () => import('@/views/system/groupData/data')
        },
        {
          path: 'topic/:id?',
          name: 'SystemTopicData',
          meta: {
            title: '专场列表',
          },
          component: () => import('@/views/system/topic/data')
        },
        {
            path: 'config/:id?',
            name: 'SystemConfigData',
            meta: {
              title: '组合数据列表',
              // activeMenu: `${roterPre}/group/list`
            },
            component: () => import('@/views/system/groupData/data')
          },
        {
            path: 'exportList',
            name: 'ExportList',
            meta: {
              title: '导出文件'
            },
            component: () => import('@/views/system/exportFile/index')
          }
      ]
    }

export default groupRouter
