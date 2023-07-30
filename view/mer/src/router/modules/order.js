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
const orderRouter =
{
  path: `${roterPre}/order`,
  name: 'order',
  meta: {
    icon: 'dashboard',
    title: '订单'
  },
  alwaysShow: true,
  component: Layout,
  redirect: 'noRedirect',
  children: [
    {
      path: 'list',
      name: 'OrderList',
      meta: {
        title: '订单管理'
      },
      component: () => import('@/views/order/index')
    },
    {
      path: 'refund',
      name: 'OrderRefund',
      meta: {
        title: '退款单'
      },
      component: () => import('@/views/order/orderRefund/index')
    },
    {
      path: 'invoice',
      name: 'OrderInvoice ',
      meta: {
        title: '发票管理'
      },
      component: () => import('@/views/order/orderInvoice/index')
    },
    {
      path: 'cancellation',
      name: 'OrderCancellation',
      meta: {
        title: '核销订单'
      },
      component: () => import('@/views/order/orderCancellate/index')
    }
  ]
}

export default orderRouter
