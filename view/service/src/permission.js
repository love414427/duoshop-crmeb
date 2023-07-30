// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { roterPre } from '@/settings'
import { adminInfo } from '@/api/kefu'
import Cookies from 'js-cookie'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = [`${roterPre}/login`, '/auth-redirect'] // no redirect whitelist
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === `${roterPre}/login`) {
      // if is logged in, redirect to the home page
      next({ path: roterPre + '/' })
      NProgress.done()
    } else {
      if (from.fullPath === '/' && from.path !== `${roterPre}/login`) {
        adminInfo().then(res => {
          Cookies.set('ServiceInfo', res.data)
          next()
        }).catch(res => {
          next()
        })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      await store.dispatch('user/resetToken')
      next(`${roterPre}/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
  store.dispatch('settings/setEdit', false)
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
