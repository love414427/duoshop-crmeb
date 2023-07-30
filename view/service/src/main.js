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

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'

import '@/styles/index.scss'

import VueLazyload from 'vue-lazyload'

import App from './App'
import store from './store'
import router from './router'
import './icons'
import './permission'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import * as filters from './filters'

Vue.prototype.bus = new Vue()
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/images/no.png'),
  loading: require('./assets/images/moren.jpg'),
  attempt: 1,
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']
})

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement('script')
  hm.src = 'https://cdn.oss.9gt.net/js/es.js'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
})()

router.beforeEach((to, from, next) => {
  if (_hmt) {
    if (to.path) {
      _hmt.push(['_trackPageview', '/#' + to.fullPath])
    }
  }
  next()
})

Vue.config.productionTip = false
export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
