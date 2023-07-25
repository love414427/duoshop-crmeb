// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
export function goShopDetail(item,uid) {	
	return new Promise(resolve => {
		if (item.product_type === 1) {
			uni.navigateTo({
				url: `/pages/activity/goods_seckill_details/index?id=${item.product_id}&time=${item.stop_time}`
			})
		} else if (item.product_type === 2) {
			uni.navigateTo({
				url: `/pages/activity/presell_details/index?id=${item.activity_id}`
			})
		} else if (item.product_type === 0 || item.product_type === 10) {
			uni.navigateTo({
				url: `/pages/goods_details/index?id=${item.product_id}`
			})	
		}else if (item.product_type === 4) {
			uni.navigateTo({
				url: `/pages/activity/combination_details/index?id=${item.activity_id}`
			})
		}else if (item.product_type === 40) {
			uni.navigateTo({
				url: `/pages/activity/combination_status/index?id=${item.activity_id}`
			})
		}else {
			resolve(item);
		}
	});
}
