// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import request from "@/utils/request.js";

/** 获取话题分类*/
export function getTopicList() {
	return request.get('community/category/lst', {}, {
		noAuth: true
	});
}
/**已购商品列表*/
export function boughtLstApi(data) {
	return request.get('community/pay_product/lst', data);
}
/** 收藏图文列表*/
export function collectLstApi(data) {
	return request.get('community/rela_product/lst', data);
}
/** 浏览图文列表*/
export function browseLstApi(data) {
	return request.get('community/hist_product/lst', data);
}
/** 发布图文*/
export function createPlantApi(data) {
	return request.post('community/create', data);
}
/*图文编辑*/
export function updatePlantApi(id, data) {
	return request.post(`community/update/${id}`, data);
}
/*删除图文*/
export function deletePlantApi(id) {
	return request.post(`community/delete/${id}`);
}
/** 图文详情*/
export function plantDetailApi(id) {
	return request.get(`community/show/${id}`, {}, {
		noAuth: true
	});
}
/** 订单关联图文商品*/
export function orderAssociatePlantApi(orderId) {
	return request.get(`community/order/${orderId}`, {}, {
		noAuth: true
	});
}
/**评论列表*/
export function replyLstApi(id, data) {
	return request.get(`community/${id}/reply`, data, {
		noAuth: true
	});
}
/**发布评论*/
export function replyCreateApi(id, data) {
	return request.post(`community/reply/create/${id}`, data);
}
/**点赞评论*/
export function starCommentApi(id, data) {
	return request.post(`community/reply/start/${id}`, data);
}
/**关注用户*/
export function followAuthorApi(id, data) {
	return request.post(`community/fans/${id}`, data);
}
/**全部图文列表*/
export function graphicLstApi(data) {
	return request.get(`community/lst`, data, {
		noAuth: true
	});
}
/**视频列表*/
export function videoList(data) {
	return request.get(`community/video_lst`, data, {
		noAuth: true
	});
}
/**自己的视频列表*/
export function myVideoList(id,data) {
	return request.get(`community/user/community_video/${id}`, data, {
		noAuth: true
	});
}
/**文章点赞*/
export function graphicStartApi(id, status) {
	return request.post(`community/start/${id}`, status);
}
/**用户详情*/
export function userInfoApi(id) {
	return request.get(`community/user/info/${id}`);
}
/**关注人的文章列表*/
export function focusArticleLst(data) {
	return request.get(`community/focuslst`, data, {
		noAuth: true
	});
}
/**用户的文章列表*/
export function userArticleLst(id, data) {
	return request.get(`community/user/community/${id}`, data);
}
/**赞过的图文*/
export function starArticleLst(data) {
	return request.get(`community/start/lst`, data);
}
/**我的关注*/
export function myFocusLst(data) {
	return request.get(`community/focus/lst`, data);
}
/**我的粉丝*/
export function myFansLst(data) {
	return request.get(`community/fans/lst`, data);
}
/**热门搜索*/
export function hotSearchLst() {
	return request.get(`common/commuunity/hot_keyword`,{}, {
		noAuth: true
	});
}
/**热门搜索*/
export function graphicProApi(id) {
	return request.get(`product/spu/get/${id}`,{
		noAuth: true
	});
}
/*视频分享二维码*/
 
export function getVideoCode(id, data) {
	return request.get(`community/qrcode/${id}`, data, {
		noAuth: true
	});
}