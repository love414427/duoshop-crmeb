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
const productRouter =
  {
    path: `${roterPre}/product`,
    name: 'product',
    component: Layout,
    meta: {
      icon: 'dashboard',
      title: '商品管理'
    },
    alwaysShow: true,
    redirect: 'noRedirect',
    children: [
      {
        path: 'classify',
        name: 'ProductClassify',
        meta: {
          title: '商品分类',
          noCache: true
        },
        component: () => import('@/views/product/productClassify')
      },
      {
        path: 'attr',
        name: `ProductAttr`,
        meta: {
          title: '商品规格',
          noCache: true
        },
        component: () => import('@/views/product/productAttr')
      },
      {
        path: 'label',
        name: `ProductLabel`,
        meta: {
          title: '商品标签',
          noCache: true
        },
        component: () => import('@/views/product/productLabel')
      },
      {
        path: 'list',
        name: `ProductList`,
        meta: {
          title: '商品列表',
          noCache: true
        },
        component: () => import('@/views/product/productList')
      },
      {
        path: 'list/addProduct/:id?/:edit?',
        component: () => import('@/views/product/addProduct/index'),
        name: 'AddProduct',
        meta: { title: '商品添加', noCache: true, activeMenu: `${roterPre}/product/list` },
        hidden: true
      },
      {
        path: 'reviews',
        name: 'ProductReviews',
        meta: {
          title: '商品评论'
        },
        component: () => import('@/views/product/Reviews/index')
      },
      {
        path: 'specs',
        name: 'ProductSpecs',
        meta: {
          title: '商品参数',
          noCache: true,
         
        },
        component: () => import('@/views/product/specs/list.vue')
      },
      {
        path: 'specs/create/:id?',
        name: 'ProductSpecsCreate',
        meta: {
          title: '添加参数模板',
          noCache: true,
          activeMenu: `${roterPre}/product/specs`
        },
        component: () => import('@/views/product/specs/create.vue')
      },
    ]
  }

export default productRouter
