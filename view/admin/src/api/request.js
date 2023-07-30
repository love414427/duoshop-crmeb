// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import axios from 'axios'
import store from '@/store'
import SettingMer from '@/libs/settingMer'

const instance = axios.create({
  baseURL: SettingMer.https,
  timeout: 60000
})
const defaultOpt = {login: true}

function baseRequest(options) {
  const token = store.getters.token
  const headers = options.headers || {}
  if (token) {
    headers['X-Token'] = token
    options.headers = headers
  }
  return new Promise((resolve, reject) => {
    instance(options).then(res => {
      const data = res.data || {}
      if (res.status !== 200) {
        return reject({message: '请求失败', res, data})
      }

      if ([410000, 410001, 410002, 40000].indexOf(data.status) !== -1) {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      } else if (data.status === 200) {
        return resolve(data, res)
      } else {
        return reject({message: data.message, res, data})
      }
    }).catch(message => reject({message}));
  })
}
/**
 * http 请求基础类
 * 参考文档 https://www.kancloud.cn/yunye/axios/234845
 *
 */
const request = ['post', 'put', 'patch', 'delete'].reduce((request, method) => {
  /**
   *
   * @param url string 接口地址
   * @param data object get参数
   * @param options object axios 配置项
   * @returns {AxiosPromise}
   */
  request[method] = (url, data = {}, options = {}) => {
    return baseRequest(
      Object.assign({url, data, method}, defaultOpt, options)
    )
  }
  return request
}, {});

['get', 'head'].forEach(method => {
  /**
   *
   * @param url string 接口地址
   * @param params object get参数
   * @param options object axios 配置项
   * @returns {AxiosPromise}
   */
  request[method] = (url, params = {}, options = {}) => {
    return baseRequest(
      Object.assign({url, params, method}, defaultOpt, options)
    )
  }
})

export default request
