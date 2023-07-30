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
    title: '设置'
  },
  
  alwaysShow: true,
  component: Layout,
  children: [
    {
      path: 'Basics/:key?',
      component: () => import('@/views/systemForm/setSystem/index'),
      name: 'Basics',
      meta: { title: '店铺配置', noCache: true }
    },
    {
      path: 'modifyStoreInfo',
      component: () => import('@/views/systemForm/setSystem/modifyStoreInfo'),
      name: 'ModifyStoreInfo',
      meta: { title: ' 商户基本信息', noCache: true }
    },
    {
      path: 'systemStore',
      name: 'setting_systemStore',
      meta: {
        title: '提货点设置'
      },
      component: () => import('@/views/setting/systemStore/index')
    },
    {
      path: 'applyMents',
      name: 'ApplyMents',
      meta: {
        title: '申请分账商户'
      },
      component: () => import('@/views/systemForm/applyMents/index')
    },
    {
      path: 'applyList',
      name: 'ApplyList',
      meta: {
        title: '分账商户列表'
      },
      component: () => import('@/views/systemForm/applyMents/list')
    },
    {
      path: 'customer_keyword',
      component: () => import('@/views/system/customer_keyword/index'),
      name: 'CustomerKeyword',
      meta: { title: '自动回复' }
    },
      // meta: { title: '自动回复' }
  ]
}

export default systemFormRouter
