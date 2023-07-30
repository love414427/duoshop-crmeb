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
const smsRouter =
  {
    path: `${roterPre}/sms`,
    name: 'sms',
    meta: {
      title: '短信管理'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'config',
        component: () => import('@/views/sms/smsConfig'),
        name: 'SmsConfig',
        meta: { title: '短信账户', noCache: true }
      },
      {
        path: 'template',
        component: () => import('@/views/sms/smsTemplate'),
        name: 'SmsTemplate',
        meta: { title: '模板列表', noCache: true }
      },
      {
        path: 'applyList',
        component: () => import('@/views/sms/smsTemplate/applyList'),
        name: 'SmsApplyList',
        meta: { title: '申请列表', noCache: true }
      },
      {
        path: 'pay',
        component: () => import('@/views/sms/smsPay'),
        name: 'SmsPay',
        meta: { title: '短信购买', noCache: true }
      }
    ]
  }

export default smsRouter
