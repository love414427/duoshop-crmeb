// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import Element from 'element-ui'
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { roterPre } from '@/settings'
import { editFormApi } from '@/api/user'
import { MessageBox, Message } from 'element-ui'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = [`${roterPre}/login`, '/auth-redirect'] // no redirect whitelist
router.beforeEach(async(to, from, next) => {
    let isEdit = store.getters.isEdit
    // if(from.name == 'AddProduct' || from.name == 'CreateSpikeGoods' || from.name == 'preSaleCreate' || from.name == 'assistProductCreate' || from.name == 'combinationCreate'){
      if(isEdit){ 
        MessageBox.confirm('离开该编辑页面，已编辑信息会丢失，请问您确认离开吗？', '提示', {
            confirmButtonText: '离开',  
            cancelButtonText: '不离开',
            confirmButtonClass: 'btnTrue', 
            cancelButtonClass: 'btnFalse',            
            type: 'warning'
          }).then(() => {
            // async() => {              
            // }     
            store.dispatch("settings/setEdit", false);
            NProgress.start()
            document.title = getPageTitle(to.meta.title)
            const hasToken = getToken()
            if (hasToken) {
                if (to.path === `${roterPre}/login`) {
                // if is logged in, redirect to the home page
                next({ path: '/' })
                NProgress.done()
                } else {
                if(from.fullPath === '/' && from.path !==`${roterPre}/login`){
                    editFormApi().then(res => {
                        next()
                    }).catch(res => {
                        next()
                    })
                }else{
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
                // await store.dispatch('user/resetToken')
                next(`${roterPre}/login?redirect=${to.path}`)
                NProgress.done()
                }
            } 
              
          })
    }else{
        // start progress bar
        NProgress.start()
        // set page title
        document.title = getPageTitle(to.meta.title)

        // determine whether the user has logged in
        const hasToken = getToken()
        if (hasToken) {
            if (to.path === `${roterPre}/login`) {
                // if is logged in, redirect to the home page
                next({ path: '/' })
                NProgress.done()
            } else {
                if(from.fullPath === '/' && from.path !==`${roterPre}/login`){
                editFormApi().then(res => {
                    next()
                }).catch(res => {
                    next()
                })
                }else{
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
        store.dispatch("settings/setEdit", false);
    }
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
