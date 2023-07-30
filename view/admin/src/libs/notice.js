// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import SettingMer from '@/libs/settingMer'
import Vue from 'vue'
import ElementUI from 'element-ui'
import router from '../router'
import { roterPre } from '@/settings'
function bindEvent(vm) {
  vm.$on('notice', function(data) {
    this.$notify.info({
      title: data.title || '消息',
      message: data.message,
      duration: 5000,
      onClick() {
        console.log('click')
      }
    })
  })
}
function createWebScoket(token) {
  return new WebSocket(`${SettingMer.wsSocketUrl}?type=admin&token=${token}`)
}
function notice(token) {
  const ws = createWebScoket(token)
  const vm = new Vue()
  let ping
  function send(type, data) {
    ws.send(JSON.stringify({ type, data }))
  }
  ws.onopen = function() {
    vm.$emit('open')
    ping = setInterval(function() {
      send('ping')
    }, 10000)
  }
  ws.onmessage = function(res) {
    vm.$emit('message', res)
    const data = JSON.parse(res.data)
    if (data.status === 200) {
      vm.$emit(data.data.status, data.data.result)
    }
    console.log(res)
    if (data.type === 'notice') {
        const h = vm.$createElement
        ElementUI.Notification({
          title: data.data.data.title,
          message: h('a', { style: 'color: teal' }, data.data.data.message),
          onClick() {
            if (data.data.type === 'new_product') {
              router.push({ path: `${roterPre}/product/examine?id=`+data.data.data.id })
            }else if (data.data.type === 'new_seckill') {
                router.push({ path: `${roterPre}/marketing/seckill/list?id=`+data.data.data.id })
            }else if (data.data.type === 'new_presell') {
              router.push({ path: `${roterPre}/marketing/presell/list?id=`+data.data.data.id+`&type=`+data.data.data.type+`&status=0`   })
            }else if (data.data.type === 'new_group') {
              router.push({ path: `${roterPre}/marketing/combination/combination_goods?id=`+data.data.data.id+`&status=0` })
            }else if (data.data.type === 'new_assist') {
              router.push({ path: `${roterPre}/marketing/assist/goods_list?id=`+data.data.data.id+`&status=0` })
            }else if (data.data.type === 'new_intention') {
                router.push({ path: `${roterPre}/merchant/application?id=`+data.data.data.id+`&status=0` })
            }else if (data.data.type === 'new_goods') {
                router.push({ path: `${roterPre}/marketing/broadcast/list?id=`+data.data.data.id+`&status=0` })
            }else if (data.data.type === 'new_broadcast') {
                router.push({ path: `${roterPre}/marketing/studio/list?id=`+data.data.data.id+`&status=0` })
            }else if (data.data.type === 'new_bag') {
                router.push({ path: `${roterPre}/promoter/gift` })
            }
          }
        })
      }
  }
  ws.onclose = function(e) {
    vm.$emit('close', e)
    console.log('on close')
    clearInterval(ping)
  }

  bindEvent(vm)

  return function() {
    ws.close()
  }
}

export default notice
