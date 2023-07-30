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
const stationRouter  =
  {
    path: `${roterPre}/station`,
    name: 'station',
    meta: {
      icon: '',
      title: '公告列表'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'notice',
        name: 'stationNotice',
        meta: {
          title: '公告列表'
        },
        component: () => import('@/views/station/notice/index')
      }
    ]
  }
export default stationRouter
