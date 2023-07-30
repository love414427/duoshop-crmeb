// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import { isLoginApi } from '@/api/sms'
export function modalSure(title) {
  return new Promise((resolve, reject) => {
    this.$confirm(`${title || '删除该条数据吗'}?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      resolve()
    }).catch(action => {
      this.$message({
        type: 'info',
        message: '已取消'
      })
    })
  })
}

export function modalSureDelete(title) {
  return new Promise((resolve, reject) => {
    this.$confirm(`${title || '该记录删除后不可恢复，您确认删除吗?'}`, '提示', {
      confirmButtonText: '删除',
      cancelButtonText: '不删除',
      type: 'warning'
    }).then(() => {
      resolve()
    }).catch(action => {
      this.$message({
        type: 'info',
        message: '已取消'
      })
    })
  })
}
/**
 * @description 短信是否登录
 */
export function isLogin() {
  return new Promise((resolve, reject) => {
    isLoginApi().then(async res => {
      resolve(res)
    }).catch(res => {
      reject(res)
    })
  })
}

/**
 * @description 短信是否登录
 */
export function wss(wsSocketUrl) {
  const ishttps = document.location.protocol === 'https:'
  if (ishttps) {
    return wsSocketUrl.replace('ws:', 'wss:')
  } else {
    return wsSocketUrl.replace('wss:', 'ws:')
  }
}

export function deleteSure(title) {
  return new Promise((resolve, reject) => {
    this.$confirm(`该记录删除后不可恢复，您确认删除吗?`, '提示', {
      confirmButtonText: '删除',
      cancelButtonText: '不删除',
      type: 'warning'
    }).then(() => {
      resolve()
    }).catch(action => {
      this.$message({
        type: 'info',
        message: '已取消'
      })
    })
  })
}
