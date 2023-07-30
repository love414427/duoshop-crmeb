// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import Cookies from "js-cookie";
// 请求接口地址 如果没有配置自动获取当前网址路径
const VUE_APP_API_URL = process.env.VUE_APP_BASE_API || `${location.origin}`
const VUE_APP_WS_URL = process.env.VUE_APP_WS_URL || (location.protocol === 'https:' ? 'wss' : 'ws') + ':' + location.hostname
const login_title = Cookies.get('MerInfo') ? JSON.parse(Cookies.get('MerInfo')).login_title : ''
const SettingMer = {
  // 服务器地址
  httpUrl: VUE_APP_API_URL,
  // 接口请求地址
  https: VUE_APP_API_URL + '/sys',
  // socket连接
  wsSocketUrl: VUE_APP_WS_URL,
  // 路由标题
  title: login_title || '加载中...'
}

export default SettingMer
