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
console.log(roterPre);
const productRouter =
{
  path: `${roterPre}/product`,
  name: 'product',
  meta: {
    icon: 'dashboard',
    title: '商品管理'
  },
  alwaysShow: true,
  component: Layout,
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
      path: 'examine',
      name: 'ProductExamine',
      meta: {
        title: '商品管理',
        noCache: true
      },
      component: () => import('@/views/product/productExamine/index.vue')
    },
    {
      path: 'comment',
      name: 'ProductComment',
      meta: {
        title: '评论管理',
        noCache: true
      },
      component: () => import('@/views/product/productComment/index.vue')
    },
    {
      path: 'label',
      name: 'ProductLabel',
      meta: {
        title: '商品标签',
        noCache: true
      },
      component: () => import('@/views/product/productLabel/index.vue')
    },
    {
      path: 'specs',
      name: 'ProductSpecs',
      meta: {
        title: '平台商品参数',
        noCache: true
      },
      component: () => import('@/views/product/specs/list.vue')
    },
    {
      path: 'merSpecs',
      name: 'MerProductSpecs',
      meta: {
        title: '商户商品参数',
        noCache: true
      },
      component: () => import('@/views/product/specs/merList.vue')
    },
    {
      path: 'specs/create/:id?',
      name: 'ProductSpecsCreate',
      meta: {
        title: '添加参数模板',
        noCache: true
      },
      component: () => import('@/views/product/specs/create.vue')
    },
    {
      path: 'priceDescription',
      name: 'PriceDescription',
      meta: {
        title: '价格说明',
        noCache: true
      },
      component: () => import('@/views/product/priceDescription/index.vue')
    },
    {
      path: 'band',
      name: 'ProductBand',
      meta: {
        title: '品牌管理',
        noCache: true
      },
      component: () => import('@/views/product/band/index'),
      children: [
        {
          path: 'brandList',
          name: 'BrandList',
          meta: {
            title: '品牌列表',
            noCache: true
          },
          component: () => import('@/views/product/band/bandList')
        },
        {
          path: 'brandClassify',
          name: 'BrandClassify',
          meta: {
            title: '品牌分类',
            noCache: true
          },
          component: () => import('@/views/product/band/bandClassify')
        }

      ]
    },
    {
      path: 'guarantee',
      name: 'ProductGuarantee',
      meta: {
        title: '保障服务',
        noCache: true
      },
      component: () => import('@/views/product/productGuarantee/index.vue')
    }
  ]
}

export default productRouter
