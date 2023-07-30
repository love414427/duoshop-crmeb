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
const systemFormRouter =
    {
      path: `${roterPre}/systemForm`,
      name: 'system',
      meta: {
        icon: 'dashboard',
        title: '商城设置'
      },
      alwaysShow: true,
      component: Layout,
      children: [
        {
          path: 'Basics/:key?',
          component: () => import('@/views/systemForm/setSystem/index'),
          name: 'Basics',
          meta: { title: '基础配置' }
        },
        {
          path: 'delivery',
          component: () => import('@/views/systemForm/cityDelivery/index'),
          name: 'Delivery',
          meta: { title: '同城配送' }
        },
        {
          path: 'customer_keyword',
          component: () => import('@/views/system/customer_keyword/index'),
          name: 'CustomerKeyword',
          meta: { title: '自动回复' }
        }
      ]
    }

export default systemFormRouter
