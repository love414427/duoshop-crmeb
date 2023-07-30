// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
// 公共过滤器
export function filterEmpty(val) {
  let _result = '-'
  if (!val) {
    return _result
  }
  _result = val
  return _result
}
export function filterYesOrNo(value) {
  return value ? '是' : '否'
}

export function filterShowOrHide(value) {
  return value ? '显示' : '不显示'
}

export function filterShowOrHideForFormConfig(value) {
  return value === '‘0’' ? '显示' : '不显示'
}

export function filterYesOrNoIs(value) {
  return value ? '否' : '是'
}

/**
 * @description 公众号回复类型
 */
export function keywordStatusFilter(status) {
  const statusMap = {
    'text': '文字消息',
    'image': '图片消息',
    'news': '图文消息',
    'voice': '声音消息'
  }
  return statusMap[status]
}

/**
 * @description 订单对账类型
 */
export function reconciliationFilter(value) {
  return value > 0 ? '已对账' : '未对账'
}

/**
 * @description 订单支付类型
 */
export function payTypeFilter(status) {
  const statusMap = {
    '0': '余额',
    '1': '微信',
    '2': '微信',
    '3': '微信',
    '4': '支付宝',
    '5': '支付宝'
  }
  return statusMap[status]
}
/**
 * @description 订单支付类型
 */
export function rechargeTypeFilter(status) {
  const statusMap = {
    'h5': '微信',
    'weixin': '微信',
    'routine': '小程序'
  }
  return statusMap[status]
}

/**
 * @description 退款单状态
 */
export function orderRefundFilter(status) {
  const statusMap = {
    '0': '待审核',
    '-1': '审核未通过',
    '1': '待退货',
    '2': '待收货',
    '3': '已退款'
  }
  return statusMap[status]
}
/**
 * @description 优惠券使用类型
 */
export function couponUseTypeFilter(status) {
  const statusMap = {
    0: '领取',
    1: '赠送券',
    2: '领取'
  }
  return statusMap[status]
}
/**
 * @description 提现方式
 */
export function extractTypeFilter(status) {
  const statusMap = {
    0: '银行卡',
    1: '微信',
    2: '支付宝',
    3: '微信零钱'
  }
  return statusMap[status]
}

/**
 * @description 提现方式
 */
export function extractStatusFilter(status) {
  const statusMap = {
    '0': '审核中',
    '-1': '已拒绝',
    '1': '已通过'
  }
  return statusMap[status]
}

/**
 * @description 支付状态
 */
export function payStatusFilter(status) {
  const statusMap = {
    '0': '未支付',
    '1': '已支付'
  }
  return statusMap[status]
}

/**
 * @description 订单状态
 */
export function orderStatusFilter(status) {
  const statusMap = {
    '0': '待发货',
    '1': '待收货',
    '2': '待评价',
    '3': '已完成',
    '-1': '已退款',
    '9': '未成团',
    '10': '待付尾款',
    '11': '尾款过期未付'
  }
  return statusMap[status]
}
export function cancelOrderStatusFilter(status) {
  const statusMap = {
    '0': '待核销',
    '2': '待评价',
    '3': '已完成',
    '-1': '已退款',
    '10': '待付尾款',
    '11': '尾款过期未付'
  }
  return statusMap[status]
}
/**
 *
 * 支付方式
 */

export function orderPayType(type) {
    const typeMap = {
      '0': '余额支付',
      '1': '微信支付',
      '2': '小程序',
      '3': '微信支付',
      '4': '支付宝',
      '5': '支付宝扫码',
      '6': '微信扫码'
    }
    return typeMap[type]
  }
  /**
 *
 * 付费会员支付方式
 */

export function svipPayType(type) {
  const typeMap = {
    'weixinQr': '微信扫码',
    'alipayQr': '支付宝扫码',
    'alipay': '支付宝',
    'h5': '微信',
    'routine': '小程序',
    'weixin': '微信',
    'free': '免费',
    'sys': '平台赠送'
  }
  return typeMap[type]
}
/**
 * @description 订单活动状态
 */
export function activityOrderStatus(status) {
    const statusMap = {
      '-1': '未完成',
      '10': '已完成',
      '0': '进行中'
    }
    return statusMap[status]
}
/**
 * @description 自提订单状态
 */
export function takeOrderStatusFilter(status) {
  const statusMap = {
    '0': '待提货',
    '1': '待提货',
    '2': '待评价',
    '3': '已完成',
    '-1': '已退款',
    '9': '未成团'
  }
  return statusMap[status]
}
/**
 * @description 转账状态
 */
export function accountStatusFilter(status) {
  const statusMap = {
    0: '未转账',
    1: '已转账'
  }
  return statusMap[status]
}

/**
 * @description 对账状态
 */
export function reconciliationStatusFilter(status) {
  const statusMap = {
    0: '未确认',
    1: '已拒绝',
    2: '已确认'
  }
  return statusMap[status]
}
/**
 * @description 商品状态
 */
export function productStatusFilter(status) {
    const statusMap = {
      '0': '下架',
      '1': '上架显示',
      '-1': '平台关闭'
    }
    return statusMap[status]
  }
/**
 * @description 优惠券类型
 */
export function couponTypeFilter(status) {
  const statusMap = {
    0: '店铺券',
    1: '商品券',
    10: '平台通用券',
    11: '平台品类全',
    12: '平台跨店券'
  }
  return statusMap[status]
}

/**
 * @description 是否开启
 */
export function filterOpen(value) {
  return value ? '开启' : '未开启'
}
/**
 * @description 直播状态
 */
export function broadcastStatusFilter(status) {
  const statusMap = {
    101: '直播中',
    102: '未开始',
    103: '已结束',
    104: '禁播',
    105: '暂停',
    106: '异常',
    107: '已过期'
  }
  return statusMap[status]
}

/**
 * @description 直播审核状态
 */

export function liveReviewStatusFilter(status) {
  const statusMap = {
    '0': '未审核',
    '1': '微信审核中',
    '2': '审核通过',
    '-1': '审核未通过'
  }
  return statusMap[status]
}
/**
 * @description 直播间类型
 */
export function broadcastType(type) {
  const typeMap = {
    0: '手机直播',
    1: '推流'
  }
  return typeMap[type]
}
/**
 * @description 直播显示类型
 */
export function broadcastDisplayType(type) {
  const typeMap = {
    0: '竖屏',
    1: '横屏'
  }
  return typeMap[type]
}
/**
 * @description 是否关闭点赞、评论
 */
export function filterClose(value) {
  return value ? '✔' : '✖'
}
/**
 * @description 资金明细订单类型
 */
export function transactionTypeFilter(type) {
  const typeMap = {
    'sys_accoubts': '财务对账',
    'refund_order': '退款订单',
    'brokerage_one': '一级分佣',
    'brokerage_two': '二级分佣',
    'refund_brokerage_one': '返还一级分佣',
    'refund_brokerage_two': '返还二级分佣',
    'order': '订单支付'
  }
  return typeMap[type]
}
/**
 * @description 导出订单状态
 */
export function exportOrderStatusFilter(status) {
  const statusMap = {
    '0': '正在导出，请稍后再来',
    '1': '完成',
    '2': '失败'
  }
  return statusMap[status]
}
/**
 * @description 秒杀状态
 */
export function seckillStatusFilter(status) {
  const statusMap = {
    '0': '未开始',
    '1': '正在进行',
    '-1': '已结束'
  }
  return statusMap[status]
}
  /**
 * @description 导出订单类型
 */
export function exportOrderTypeFilter(type) {
    const typeMap = {
      'order': '订单',
      'financial': '流水',
      'delivery': '发货单',
      'importDelivery': '导入记录',
      'exportFinancial': '账单信息',
      'searchLog': '用户搜索'
    }
    return typeMap[type]
  }
/**
 * @description 主体类型
 */
export function organizationType(type) {
    const typeMap = {
      2401: '小微商户',
      2500: '个人卖家',
      4: '个体工商户',
      2: '企业',
      3: '党政、机关及事业单位',
      1708: '其他组织'
    }
    return typeMap[type]
  }
  
/**
 * @description 证件类型
 */
export function id_docType(type) {
    const typeMap = {
      1: '中国大陆居民-身份证',
      2: '其他国家或地区居民-护照',
      3: '中国香港居民–来往内地通行证',
      4: '中国澳门居民–来往内地通行证',
      5: '中国台湾居民–来往大陆通行证'
    }
    return typeMap[type]
  }
  /**
 * @description 证件类型
 */
export function purchaseType(type) {
    const typeMap = {
      'sms': '短信',
      'copy': '商品采集',
      'dump': '电子面单',
      'query': '物流查询'
    }
    return typeMap[type]
  }

  /**
 * @description 证件类型
 */
   export function communityStatus(status) {
    const statusMap = {
      '0': '待审核',
      '1': '审核通过',
     '-1': '审核失败',
      '-2': '强制下架'
    }
    return statusMap[status]
  }
  
  /**
 * @description 订单配送状态
 */
   export function runErrandStatus(status) {
    const statusMap = {
      '0': '待接单',
      '-1': '已取消',
      '2': '待取货',
      '3': '配送中',
      '4': '已完成',
      '9': '物品返回中',
      '10': '物品返回完成',
      '100': '骑士到店'
    }
    return statusMap[status]
  }
  /**
 * @description 发送方式
 */
export function sendWay(type) {
  const typesMap = {
    null: '-',
    '1': '快递',
    '2': '配送',
    '3': '虚拟发货',
    '4': '快递',
    '5': '配送',
    '6': '自动发货',
  }
  return typesMap[type]
}