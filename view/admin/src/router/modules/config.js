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
      alwaysShow: true,
      component: Layout,
      children: [
        {
          path: 'classify',
          name: 'system_config_classify',
          meta: {
            title: '配置分类',
            noCache: true
          },
          component: () => import('@/views/system/config/classify')
        },
        {
          path: 'setting',
          name: 'system_config_setting',
          meta: {
            title: '配置管理',
            noCache: true
          },
          component: () => import('@/views/system/config/setting')
        },
        {
          path: 'picture',
          name: 'system_config_picture',
          meta: {
            title: '素材管理',
            noCache: true
          },
          component: () => import('@/views/system/config/picture')
        }
      ]
    }
export default configRouter
