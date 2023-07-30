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
const userFeedbackRouter =
  {
    path: `${roterPre}/feedback`,
    name: 'Feedback',
    meta: {
      icon: 'dashboard',
      title: '用户反馈管理'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'classify',
        name: 'FeedbackClassify',
        meta: {
          title: '反馈分类',
          noCache: true
        },
        component: () => import('@/views/userFeedback/classify/index')
      },
      {
        path: 'list',
        name: 'FeedbackList',
        meta: {
          title: '反馈列表',
          noCache: true
        },
        component: () => import('@/views/userFeedback/list/index')
      }
    ]
  }

export default userFeedbackRouter
