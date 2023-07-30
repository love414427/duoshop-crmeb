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
const marketingRouter =
{
  path: `${roterPre}/marketing`,
  name: 'marketing',
  meta: {
    title: '营销'
  },
  alwaysShow: true,
  component: Layout,
  redirect: 'noRedirect',
  children: [
    {
      path: 'coupon',
      name: 'Coupon',
      meta: {
        title: '优惠券',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/coupon/index'),
      children: [
        {
          path: 'list',
          name: 'CouponList',
          meta: {
            title: '优惠劵列表',
            noCache: true
          },
          component: () => import('@/views/marketing/coupon/couponList/index')
        },
        {
          path: 'user',
          name: 'CouponUser',
          meta: {
            title: '会员领取记录',
            noCache: true
          },
          component: () => import('@/views/marketing/coupon/couponUser/index')
        }
      ]
    },
    {
      path: 'platform_coupon',
      name: 'Platform_coupon',
      meta: {
        title: '平台优惠券',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/platformCoupon/index'),
      children: [
        {
          path: 'list',
          name: 'PlatformCouponlist',
          meta: {
            title: '优惠劵列表',
            noCache: true
          },
          component: () => import('@/views/marketing/platformCoupon/couponList/index')
        },
        {
          path: 'couponRecord',
          name: 'CouponRecord',
          meta: {
            title: '优惠卷领取记录',
            noCache: true
          },
          component: () => import('@/views/marketing/platformCoupon/couponRecord/index')
        },
        {
          path: 'creatCoupon/:id?',
          name: 'CreatCoupon',
          meta: {
            title: '添加优惠劵',
            noCache: true,
            activeMenu: `${roterPre}/marketing/Platform_coupon/list`
          },
          component: () => import('@/views/marketing/platformCoupon/couponList/creatCoupon')
        },
        {
          path: 'couponSend',
          name: 'CouponSend',
          meta: {
            title: '优惠券发送记录',
            noCache: true
          },
          component: () => import('@/views/marketing/platformCoupon/couponSend/index')
        },
        {
          path: 'instructions',
          name: 'Instructions',
          meta: {
            title: '使用说明',
            noCache: true
          },
          component: () => import('@/views/marketing/platformCoupon/couponInstructions/index')
        }
      ]
    },
    {
      path: 'studio',
      name: 'Studio',
      meta: {
        title: '直播间',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/studio/index'),
      children: [
        {
          path: 'list',
          name: 'StudioList',
          meta: {
            title: '直播间列表',
            noCache: true
          },
          component: () => import('@/views/marketing/studio/studioList/index')
        }
      ]
    },
    {
      path: 'broadcast',
      name: 'Broadcast',
      meta: {
        title: '直播',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/broadcast/index'),
      children: [
        {
          path: 'list',
          name: 'BroadcastList',
          meta: {
            title: '直播商品列表',
            noCache: true
          },
          component: () => import('@/views/marketing/broadcast/broadcastList/index')
        }
      ]
    },
    {
      path: 'seckill',
      name: 'Seckill',
      meta: {
        title: '秒杀管理',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/seckill/index'),
      children: [
        {
          path: 'seckillConfig',
          name: 'SeckillConfig',
          meta: {
            title: '秒杀配置',
            noCache: true
          },
          component: () => import('@/views/marketing/seckill/seckillConfig/index')
        },
        {
          path: 'list',
          name: 'SpikeList',
          meta: {
            title: '秒杀列表',
            noCache: true
          },
          component: () => import('@/views/marketing/seckill/seckillGoods/index.vue')
        }
      ]
    },
    {
      path: 'presell',
      name: 'preSell',
      meta: {
        title: '预售商品管理',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/seckill/index'),
      children: [
        {
          path: 'list',
          name: `preSaleList`,
          meta: {
            title: '预售商品',
            noCache: true
          },
          component: () => import('@/views/marketing/preSale/index')
        },
        {
          path: 'agreement',
          name: `preSaleAgreement`,
          meta: {
            title: '预售协议',
            noCache: true
          },
          component: () => import('@/views/marketing/preSale/agreement')
        }
      ]
    },
    {
      path: 'assist',
      name: 'assist',
      meta: {
        title: '助力活动商品',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/assist/index'),
      children: [
        {
          path: 'goods_list',
          name: `assistProductList`,
          meta: {
            title: '助力活动商品',
            noCache: true
          },
          component: () => import('@/views/marketing/assist/assist_goods/index')
        },
        {
          path: 'list',
          name: `assist`,
          meta: {
            title: '助力活动列表',
            noCache: true
          },
          component: () => import('@/views/marketing/assist/assist_list/index')
        },
      ]
    },
    {
        path: 'combination',
        name: 'combinAtion',
        meta: {
          title: '拼团',
          noCache: true
        },
        redirect: 'noRedirect',
        component: () => import('@/views/marketing/combination/index'),
        children: [
          {
            path: 'combination_goods',
            name: `combinationGoods`,
            meta: {
              title: '拼团商品',
              noCache: true
            },
            component: () => import('@/views/marketing/combination/combination_goods/index')
          },
          {
            path: 'combination_list',
            name: `combinationList`,
            meta: {
              title: '拼团活动',
              noCache: true
            },
            component: () => import('@/views/marketing/combination/store_combination/index')
          },
          {
            path: 'combination_set',
            name: `combinationSet`,
            meta: {
              title: '拼团设置',
              noCache: true
            },
            component: () => import('@/views/marketing/combination/combination_set/index')
          },
        ]
      },
      {
        path: 'integral',
        name: 'Integral',
        meta: {
          title: '积分',
          noCache: true
        },
        redirect: 'noRedirect',
        component: () => import('@/views/marketing/integral/index'),
        children: [
            {
            path: 'config',
            name: `integralConfig`,
            meta: {
              title: '积分配置',
              noCache: true
            },
            component: () => import('@/views/marketing/integral/config/index')
            },
          {
            path: 'log',
            name: `integralLog`,
            meta: {
              title: '积分日志',
              noCache: true
            },
            component: () => import('@/views/marketing/integral/log/index')
          },
          {
            path: 'classify',
            name: `integralClassify`,
            meta: {
              title: '积分商品分类',
              noCache: true
            },
            component: () => import('@/views/marketing/integral/classify/index')
          },
          {
            path: 'proList',
            name: `integralProductList`,
            meta: {
              title: '积分商品列表',
              noCache: true
            },
            component: () => import('@/views/marketing/integral/productList/index')
          },
          {
            path: 'addProduct/:id?/:edit?',
            name: `addIntegralProduct`,
            meta: {
              title: '添加积分商品',
              noCache: true
            },
            component: () => import('@/views/marketing/integral/addProduct/index')
          },
          {
            path: 'orderList',
            name: `IntegralOrderList`,
            meta: {
              title: '兑换记录',
              noCache: true
            },
            component: () => import('@/views/marketing/integral/orderList/index')
          },
          {
            path: 'sign',
            name: `signConfig`,
            meta: {
              title: '签到配置',
              noCache: true
            },
            component: () => import('@/views/marketing/integral/sign/index')
          }
          
        ]
      },
      {
        path: 'discounts',
        name: 'discounts',
        meta: {
          title: '套餐',
          noCache: true
        },
        redirect: 'noRedirect',
        component: () => import('@/views/marketing/integral/index'),
        children: [
          {
            path: 'list',
            name: `discountsList`,
            meta: {
              title: '套餐列表',
              noCache: true
            },
            component: () => import('@/views/marketing/discounts/index')
          }
        ]
      },
      {
        path: 'atmosphere',
        name: 'atmosphere',
        meta: {
          title: '活动氛围',
          noCache: true
        },
        redirect: 'noRedirect',
        component: () => import('@/views/marketing/atmosphere/index'),
        children: [
          {
            path: 'list',
            name: `atmosphereList`,
            meta: {
              title: '氛围列表',
              noCache: true
            },
            component: () => import('@/views/marketing/atmosphere/atmosphereList/index')
          },
          {
            path: 'add/:id?',
            name: `addAtmosphere`,
            meta: {
              title: '添加活动氛围',
              noCache: true,
              activeMenu: `${roterPre}/marketing/atmosphere/list`
            },
            component: () => import('@/views/marketing/atmosphere/atmosphereList/addAtmosphere')
          }
        ]
      },
      {
        path: 'border',
        name: 'border',
        meta: {
          title: '活动边框',
          noCache: true
        },
        redirect: 'noRedirect',
        component: () => import('@/views/marketing/border/index'),
        children: [
          {
            path: 'list',
            name: `borderList`,
            meta: {
              title: '活动边框',
              noCache: true
            },
            component: () => import('@/views/marketing/border/borderList/index')
          },
          {
            path: 'add/:id?',
            name: `addBorder`,
            meta: {
              title: '添加活动边框',
              noCache: true,
              activeMenu: `${roterPre}/marketing/border/list`
            },
            component: () => import('@/views/marketing/border/borderList/addBorder')
          }
        ]
      }
  ],
  
}

export default marketingRouter
