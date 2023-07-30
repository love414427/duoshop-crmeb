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
const configRouter =
    {
      path: `${roterPre}/config`,
      name: 'system_config',
      meta: {
        icon: 'dashboard',
        title: '系统配置'
      },
      alwaysShow: true, // 一直显示根路由
      component: Layout,
      children: [
        {
          path: 'picture',
          name: 'system_config_picture',
          meta: {
            title: '素材管理'
          },
          component: () => import('@/views/system/config/picture')
        },
        {
          path: 'service',
          name: 'Service',
          meta: {
            title: '客服管理'
          },
          component: () => import('@/views/system/service/index')
        },
        {
          path: 'guarantee',
          name: 'Guarantee',
          meta: {
            title: '保障服务',
            noCache: true
          },
          component: () => import('@/views/system/guarantee/index')
        },

        {
          path: 'freight',
          name: 'Freight',
          meta: {
            title: '物流设置'
          },
          component: () => import('@/views/system/freight/index'),
          children: [
            {
              path: 'shippingTemplates',
              name: 'ShippingTemplates',
              meta: {
                title: '运费模板',
                noCache: true
              },
              component: () => import('@/views/system/freight/shippingTemplates')
            },
            {
              path: 'express',
              name: 'Express',
              meta: {
                title: '物流公司',
                noCache: true
              },
              component: () => import('@/views/system/freight/express/index')
            }
          ]
        }

      ]
    }
export default configRouter
