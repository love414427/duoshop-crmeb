// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import request from './request'
/**
 * @description 身份管理 -- 列表
 * @param {Object} param params {Object} 传值参数
 */
export function menuRoleApi(data) {
  return request.get(`system/role/lst`, data)
}

/**
 * @description 身份管理 -- 新增
 * @param {Object} param params {Object} 传值参数
 */
export function roleCreateApi() {
  return request.get(`system/role/create/form`)
}

/**
 * @description 身份管理 -- 编辑
 * @param {Object} param params {Object} 传值参数
 */
export function roleUpdateApi(id) {
  return request.get(`system/role/update/form/${id}`)
}

/**
 * @description 身份管理 -- 删除
 * @param {Object} param params {Object} 传值参数
 */
export function roleDeleteApi(id) {
  return request.delete(`system/role/delete/${id}`)
}

/**
 * @description 身份管理 -- 修改状态
 * @param {Object} param params {Object} 传值参数
 */
export function roleStatusApi(id, status) {
  return request.post(`system/role/status/${id}`, { status })
}
/**
 * @description 管理员 -- 列表
 * @param {Object} param params {Object} 传值参数
 */
export function adminListApi(data) {
  return request.get(`system/admin/lst`, data)
}

/**
 * @description 管理员 -- 新增
 * @param {Object} param params {Object} 传值参数
 */
export function adminCreateApi() {
  return request.get(`/system/admin/create/form`)
}

/**
 * @description 管理员 -- 编辑
 * @param {Object} param params {Object} 传值参数
 */
export function adminUpdateApi(id) {
  return request.get(`system/admin/update/form/${id}`)
}

/**
 * @description 管理员 -- 删除
 * @param {Object} param params {Object} 传值参数
 */
export function adminDeleteApi(id) {
  return request.delete(`system/admin/delete/${id}`)
}

/**
 * @description 管理员 -- 修改状态
 * @param {Object} param params {Object} 传值参数
 */
export function adminStatusApi(id, status) {
  return request.post(`system/admin/status/${id}`, { status })
}
/**
 * @description 管理员 -- 修改密码表单
 * @param {Object} param params {Object} 传值参数
 */
export function adminPasswordApi(id) {
  return request.get(`system/admin/password/form/${id}`)
}
/**
 * @description 操作日志 -- 列表
 * @param {Object} param params {Object} 传值参数
 */
export function adminLogApi(data) {
  return request.get(`system/admin/log`, data)
}
/**
 * @description 一号通 -- 是否登录
 * @param {Object} param params {Object} 传值参数
 */
 export function isLoginApi() {
    return request.get(`serve/user/is_login`)
}
/**
 * @description 一号通 -- 用户信息
 * @param {Object} param params {Object} 传值参数
 */
 export function serveInfoApi() {
    return request.get(`serve/user/info`)
}
/**
 * @description 一号通 -- 是否登录
 * @param {Object} param params {Object} 传值参数
 */
 export function smsPriceApi(type) {
    return request.get(`serve/mealList/${type}`)
}
/**
 * @description 一号通短信账户 -- 退出登录
 */
 export function logoutApi() {
    return request.get('sms/logout')
}
/**
 * @description 一号通短信账户 -- 登录
 */
 export function configApi(data) {
    return request.post('serve/login', data)
}
/**
 * @description 一号通短信账户 -- 支付二维码
 */
 export function payCodeApi(data) {
    return request.get('serve/paymeal', data)
}
/**
 * @description 一号通短信账户 -- 列表
 */
 export function smsRecordApi(data) {
    return request.get('sms/record', data)
}

/**
 * @description 一号通短信账户 -- 列表
 */
 export function serveRecordListApi(data) {
    return request.get('serve/record', data)
}
/**
 * @description 一号通短信账户 -- 物流列表
 */
 export function serveQueryListApi(data) {
    return request.get('serve/us_lst', data)
}
/**
 * @description 一号通 -- 开通服务
 */
 export function serveOpen(data) {
    return request.post('serve/open', data)
}

/**
 * @description 一号通 -- 快递列表
 */
 export function exportAllApi() {
    return request.get('serve/expr/lst')
}

/**
 * @description 一号通 -- 开通服务
 */
 export function exportTempApi(data) {
    return request.get('serve/expr/temps',data)
}
/**
 * @description 短信账户签名修改 -- 获取验证码
 */
 export function captchaApi(phone) {
    return request.get(`serve/captcha/${phone}`)
}
/**
 * @description 短信账户签名修改 -- 确认修改
 */
 export function serveSign(data) {
    return request.post(`serve/change_sign`, data)
}
/**
 * @description 短信账户签名修改 -- 检查验证码
 */
 export function checkCaptchaApi(data) {
    return request.post(`serve/captcha`, data)
}
/**
 * @description 一号通 -- 修改密码
 */
 export function serveModifyApi(data) {
    return request.post(`serve/change_password`, data)
}
/**
 * @description 一号通 -- 修改手机号
 */
 export function updateHoneApi(data) {
    return request.post(`serve/change_phone`, data)
}
/**
 * @description 一号通 -- 获取配置信息
 */
 export function getSmsConfig() {
    return request.get(`serve/config`)
}
/**
 * @description 一号通 -- 更新配置信息
 */
 export function updateSmsConfig(data) {
    return request.post(`serve/config`, data)
}
/**
 * @description 服务设置 -- 添加设置
 */
 export function addServiceConfig() {
    return request.get(`serve/meal/create/form`)
 }
 /**
 * @description 服务设置 -- 列表
 */
  export function aserviceConfigLst(data) {
    return request.get(`serve/meal/lst`, data)
 }
  /**
 * @description 服务设置 -- 是否显示
 */
   export function aserviceStatusApi(id, data) {
    return request.post(`serve/meal/status/${id}`, data)
 }
 /**
 * @description 服务设置 -- 编辑
 */
  export function updateServiceConfig(id) {
    return request.get(`serve/meal/update/${id}/form`)
 }
  /**
 * @description 服务设置 -- 删除
 */
   export function deleteServiceConfig(id) {
    return request.delete(`serve/meal/detele/${id}`)
 }
 /**
 * @description 平台购买记录 -- 列表
 */
  export function purchaseRecordLst(data) {
    return request.get(`serve/paylst`, data)
 }
/**
 * @description 商户购买记录 -- 列表
 */
   export function purchaseMerLst(data) {
    return request.get(`serve/mer/paylst`, data)
 }
/**
 * @description 商户结余记录 -- 列表
 */
  export function merBalanceLst(data) {
    return request.get(`serve/mer/lst`, data)
  }
/**
 * @description 消息管理 -- 列表
 */
 export function messageManageLst(data) {
  return request.get(`notice/config/lst`, data)
}
/**
 * @description 消息管理 -- 添加消息
 */
 export function addMessageApi() {
  return request.get(`notice/config/create/form`)
}
/**
 * @description 消息管理 -- 设置
 */
 export function messageSettingApi(id) {
  return request.get(`notice/config/update/${id}/form`)
}
export function messageChangeApi(id) {
  return request.get(`notice/config/change/${id}/form`)
}
  /**
 * @description 消息管理 -- 是否显示
 */
   export function messageStatusApi(id, data) {
    return request.post(`notice/config/status/${id}`, data)
 }
  /**
 * @description 消息管理 -- 同步小程序订阅消息
 */
  export function syncAppletsApi() {
    return request.get(`wechat/template/min/sync`)
  }
   /**
 * @description 消息管理 -- 同步公众号订阅消息
 */
  export function syncPublicApi() {
    return request.get(`wechat/template/sync`)
  }
   /**
 * @description 一键换色 -- 获取
 */
    export function getStyleApi() {
      return request.get(`change/color`)
    }
   /**
 * @description 一键换色 -- 提交
 */
    export function setStyleApi(data) {
      return request.post(`change/color`,data)
    }
  /**
 * @description 协议与规则 -- 左侧获取列表
 */
   export function keylstApi() {
    return request.get(`agreement/keylst`)
  }

 /**
 * @description 协议与规则 -- 获取对应的数据
 */
  export function getAgreeApi(key) {
    return request.get(`agreement/${key}`)
  }

/**
 * @description 协议与规则 -- 编辑对应的数据
 */
 export function postAgreeApi(key,data) {
  return request.post(`agreement/${key}`,data)
}
