// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import { login, logout, getInfo, getMenusApi } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { isLoginApi } from '@/api/sms'
import Cookies from 'js-cookie'
import groupRouter from '@/router/modules/group'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  menuList: JSON.parse(localStorage.getItem('MerMenuList')),
  isLogin: Cookies.get('isLogin'),
  sidebarWidth: window.localStorage.getItem('sidebarWidth'),
  sidebarStyle: window.localStorage.getItem('sidebarStyle')
}
const mutations = {
  SET_MENU_LIST: (state, menuList) => {
    state.menuList = menuList
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ISLOGIN: (state, isLogin) => {
    state.isLogin = isLogin
    Cookies.set(isLogin)
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_SIDEBAR_WIDTH: (state, width) => {
    state.sidebarWidth = width;
  },
  SET_SIDEBAR_STYLE: (state, style) => {
    state.sidebarStyle = style;
    window.localStorage.setItem('sidebarStyle', style);
  }
}
const actions = {
  // user login
  login({ commit }, userInfo) {
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        Cookies.set('AdminName', data.admin.account)
        setToken(data.token)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 短信是否登录
  isLogin({ commit }, userInfo) {
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      isLoginApi().then(async res => {
        commit('SET_ISLOGIN', res.data.status)
        resolve(res)
      }).catch(res => {
        commit('SET_ISLOGIN', false)
        reject(res)
      })
    })
  },
  // getMenus({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     getMenusApi().then(response => {
  //       commit('SET_MENU_LIST', response.data)
  //       localStorage.setItem('MerMenuList', JSON.stringify(response.data))
  //       resolve(response)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  getMenus({ commit }, Data) {
    let { that } = Data;
    return new Promise((resolve, reject) => {
      getMenusApi()
        .then((response) => {
          commit('SET_MENU_LIST', response.data);
          localStorage.setItem('MerMenuList', JSON.stringify(response.data));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        Cookies.remove()
        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
