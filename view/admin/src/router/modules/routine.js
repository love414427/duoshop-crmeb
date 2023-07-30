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
const routineRouter =
  {
    path: `${roterPre}/app/routine`,
    name: 'routine',
    meta: {
      title: '小程序'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'template',
        name: 'RoutineTemplate',
        meta: {
          title: '小程序订阅消息',
          noCache: true
        },
        component: () => import('@/views/app/wechat/wxTemplate/index')
      }
    ]
  }

export default routineRouter
