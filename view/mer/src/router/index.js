// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import Vue from 'vue'
import Router from 'vue-router'
import { roterPre } from '@/settings'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import systemFormRouter from './modules/systemForm'
import configRouter from './modules/config'
import settingRouter from './modules/setting'
import groupRouter from './modules/group'
import productRouter from './modules/product'
import marketingRouter from './modules/marketing'
import orderRouter from './modules/order'
import accountsRouter from './modules/accounts'
import userRouter from './modules/user'
import stationRouter from './modules/station'
import exprotFileRouter from './modules/exportFile'
import deliveryRouter from './modules/delivery'
import deviseRouter from './modules/devise'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  systemFormRouter,
  configRouter,
  settingRouter,
  groupRouter,
  productRouter,
  marketingRouter,
  orderRouter,
  accountsRouter,
  userRouter,
  stationRouter,
  exprotFileRouter,
  deliveryRouter,
  deviseRouter,
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: roterPre,
    component: Layout,
    redirect: `${roterPre}/dashboard`,
    children: [
      {
        path: `${roterPre}/dashboard`,
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '控制台', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: `${roterPre}/dashboard`,
    children: [
      {
        path: `${roterPre}/dashboard`,
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '控制台', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: `${roterPre}/login`,
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: roterPre + '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: roterPre + '/setting/icons',
    component: () => import('@/components/iconFrom/index'),
    name: 'icons'
  },
  {
    path: roterPre + '/setting/uploadPicture',
    component: () => import('@/components/uploadPicture/index.vue'),
    name: 'uploadPicture'
  },
  {
    path: roterPre + '/setting/storeProduct',
    component: () => import('@/components/goodList/index.vue'),
    name: 'uploadPicture'
  },
  {
    path: roterPre + '/setting/broadcastProduct',
    component: () => import('@/components/importGoods/goodList.vue'),
    name: 'broadcastProduct'
  },
  {
    path: roterPre + '/setting/userList',
    component: () => import('@/components/userList/index.vue'),
    name: 'uploadPicture'
  },
  {
    path: roterPre + '/order/export',
    component: () => import('@/components/exportFile/index.vue'),
    name: 'exportFileList'
  },
  {
    path: roterPre + '/admin/widget/image',
    name: `images`,
    meta: {
      title: '上传图片'
    },
    component: () => import('@/components/uploadPicture/index')
  },
  {
    path: roterPre + '/admin/widget/video',
    name: `video`,
    meta: {
      title: '上传视频'
    },
    component: () => import('@/components/uploadVideo/index')
  },
  { path: '*', redirect: roterPre + '/404', hidden: true }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
