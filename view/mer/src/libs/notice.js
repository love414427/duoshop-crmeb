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
import ElementUI from 'element-ui'
import router from '../router'
import { roterPre } from '@/settings'
import Vue from 'vue'

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
  return new WebSocket(`${SettingMer.wsSocketUrl}?type=mer&token=${token}`)
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
    if (data.type === 'notice') {
      const h = vm.$createElement
      ElementUI.Notification({
        title: data.data.data.title,
        message: h('a', { style: 'color: teal' }, data.data.data.message),
        onClick() {
          if (data.data.type === 'min_stock' || data.data.type === 'product') {
            router.push({ path: `${roterPre}/product/list` })
          }else if (data.data.type === 'reply') { //评价
            router.push({ path: `${roterPre}/product/reviews` })
          } else if (data.data.type === 'product_success') { //普通商品审核通过
            router.push({ path: `${roterPre}/product/list?id=`+data.data.data.id+`&type=2` })
          } else if (data.data.type === 'product_fail') { //普通商品审核未通过
            router.push({ path: `${roterPre}/product/list?id=`+data.data.data.id+`&type=7` })
          } else if (data.data.type === 'product_seckill_success') {   //秒杀商品审核通过
            router.push({ path: `${roterPre}/marketing/seckill/list?id=`+data.data.data.id+`&type=2` })
          } else if (data.data.type === 'product_seckill_fail') {   //秒杀商品审核未通过
            router.push({ path: `${roterPre}/marketing/seckill/list?id=`+data.data.data.id+`&type=7` })
          } else if (data.data.type === 'new_order') {
            router.push({ path: `${roterPre}/order/list?id=`+data.data.data.id })
          } else if (data.data.type === 'new_refund_order') {
            router.push({ path: `${roterPre}/order/refund?id=`+data.data.data.id })
          }else if (data.data.type === 'product_presell_success') { //预售商品审核通过
            router.push({ path: `${roterPre}/marketing/presell/list?id=`+data.data.data.id+`&type=`+data.data.data.type+`&status=1` })
          }else if (data.data.type === 'product_presell_fail') { //预售商品审核未通过
            router.push({ path: `${roterPre}/marketing/presell/list?id=`+data.data.data.id+`&type=`+data.data.data.type+`&status=-1` })
          }else if (data.data.type === 'product_group_success') { //拼团商品审核通过
            router.push({ path: `${roterPre}/marketing/combination/combination_goods?id=`+data.data.data.id+`&status=1` })
          }else if (data.data.type === 'product_group_fail') { //拼团商品审核未通过
            router.push({ path: `${roterPre}/marketing/combination/combination_goods?id=`+data.data.data.id+`&status=-1` })
          }else if (data.data.type === 'product_assist_success') { //助力商品审核通过
            router.push({ path: `${roterPre}/marketing/assist/list?id=`+data.data.data.id+`&status=1` })
          }else if (data.data.type === 'product_assist_fail') { //助力商品审核未通过
            router.push({ path: `${roterPre}/marketing/assist/list?id=`+data.data.data.id+`&status=-1` })
          }else if (data.data.type === 'broadcast_status_success') { //直播间审核通过
            router.push({ path: `${roterPre}/marketing/studio/list?id=`+data.data.data.id+`&status=1` })
          }else if (data.data.type === 'broadcast_status_fail') { //直播间审核通过
            router.push({ path: `${roterPre}/marketing/studio/list?id=`+data.data.data.id+`&status=-1` })
          }else if (data.data.type === 'goods_status_success') { //直播商品审核通过
            router.push({ path: `${roterPre}/marketing/broadcast/list?id=`+data.data.data.id+`&status=1` })
          }else if (data.data.type === 'goods_status_fail') { //直播商品审核未通过
            router.push({ path: `${roterPre}/marketing/broadcast/list?id=`+data.data.data.id+`&status=-1` })
          }
        }
      })
    }
  }
  ws.onclose = function(e) {
    vm.$emit('close', e)
    clearInterval(ping)
  }

  bindEvent(vm)

  return function() {
    ws.close()
  }
}

export default notice
