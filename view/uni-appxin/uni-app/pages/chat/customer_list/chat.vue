<template>
	<div class="broadcast-details" :style="'height:'+windowH+'px'">
		<view class="hd-wrapper" :class="active === true ? 'on' : ''" :style="viewColor" @click="stoppress">
			<view class="store-wrapper" v-if="storeInfo">
				<view class="left">
					<image :src="storeInfo.mer_avatar" mode=""></image>
					<view class="txt">{{storeInfo.mer_name}}</view>
				</view>
				<view class="acea-row store-opeation">
					<navigator v-if="hide_mer_status != 1 && storeInfo.mer_id" :url="'/pages/store/home/index?id='+storeInfo.mer_id" class="link" open-type="redirect">进店</navigator>
					<text v-if="storeInfo.service_phone" class="iconfont icon-dadianhua01" @click="goCustomer"></text>
				</view>	
			</view>
			<scroll-view scroll-y="true" style="height: 100%;overflow: hidden;" :scroll-top="scrollTop" scroll-with-animation="true"
			 @scrolltoupper="bindScroll">
				<div class="chat" ref="chat">
					<Loading :loaded="status" :loading="loading"></Loading>
					<view v-if="storeInfo" style="height: 100rpx;"></view>
					<!-- 客服聊天列表 -->
					<block v-for="(items,index) in history" v-if="userId != 0" :key="index">
						<div class="create_time">{{items.time}}</div>
						<block v-for="(item,j) in items.children" :key="item.service_log_id">
							<!-- 左边 -->
							<div class="item acea-row row-top" v-if="item.send_type == 0">	
								<div v-if="item.msn_type !== 100" class="pictrue" @click="userDetail(item.user.uid)">
									<image :src="item.user.avatar ? item.user.avatar : '/static/images/f.png'" mode=""></image>
								</div>
								<view v-if="item.msn_type === 100" class="recall-msg">对方撤回了一条消息</view>
								
								<div class="text">								
									<div class="acea-row">
										<!--退款订单链接-->
										<navigator v-if="item.msn_type === 6 && item.refundOrder && item.refundOrder.refund_order_id" open-type="navigate" :url="'/pages/order_details/index?order_id='+item.refundOrder.order_id">
											<div class="broadcast-details_num">
												<span>退款单号：{{ item.refundOrder.refund_order_sn }}</span>
											</div>
											<div class="conter acea-row row-middle">
												<div class="broadcast-details_order noPad" v-for="(val, inx) in item.refundOrder.refundProduct" :key="item.service_log_id">
													<div class="broadcast-details_box noPad" v-if="inx == 0">
														<div class="broadcast_details_img">
															<image :src="val.product.cart_info.product.image" />
															<div class="broadcast_details_model">
																{{item.refundOrder.refund_num}}件商品
															</div>
														</div>
														<div class="broadcast_details_picBox noPad">
															<div class="broadcast_details_tit">{{val.product.cart_info.product.store_name}}</div>
															<div class="broadcast_details_pic">
																￥{{ item.refundOrder.refund_price }}
															</div>
														</div>
													</div>
												</div>
											</div>
										</navigator>
										<!--订单链接-->
										<div v-if="item.msn_type === 5 && item.orderInfo && item.orderInfo.order_id">
											<div class="broadcast-details_num acea-row row-middle">
												<span>订单号：{{ item.orderInfo.order_sn }}</span>
												<!-- #ifdef H5 -->
												<button class="copy copy-data" :data-clipboard-text="item.orderInfo.order_sn">复制</button>
												<!-- #endif -->
												<!-- #ifndef H5 -->
												<button class="copy" @tap.stop="copyText(item.orderInfo.order_sn)">复制</button>
												<!-- #endif -->
											</div>
											<navigator :url="'/pages/admin/orderDetail/index?id='+item.orderInfo.order_id+'&mer_id='+item.orderInfo.mer_id" open-type="open-type" class="conter acea-row row-middle">
												<div class="broadcast-details_order noPad" v-for="(val, inx) in item.orderInfo.orderProduct" :key="val.id">
													<div class="broadcast-details_box noPad" v-if="inx == 0">
														<div class="broadcast_details_img">
															<image :src="val.cart_info.product.image" />
															<div class="broadcast_details_model">
																{{item.orderInfo.total_num}}件商品
															</div>
														</div>
														<div class="broadcast_details_picBox noPad">
															<div class="broadcast_details_tit">{{val.cart_info.product.store_name}}</div>
															<div class="broadcast_details_pic">
																￥{{ item.orderInfo.pay_price }}
															</div>
														</div>
													</div>
												</div>
											</navigator>
										</div>
										<!--商品链接-->
										<div class="conter acea-row row-middle" v-if="item.msn_type === 4 && item.product">
											<div class=" noPad">
												<navigator class="acea-row row-column-around noPad" v-if="item.product.product_id" :url="`/pages/goods_details/index?id=${item.product.product_id}`" open-type="navigate">
													<div class="broadcast_details_img_no">
														<image :src="item.product.image" />
													</div>
													<div class="broadcast_details_picBox_no noPad">
														<div class="broadcast_details_pic">
															￥{{ item.product.price }}
														</div>
														<div class="broadcast_details_tit_no line1">{{item.product.store_name}}</div>
													</div>
												</navigator>
											</div>
										</div>
										<!--预售商品链接-->
										<div class="conter acea-row row-middle" v-if="item.msn_type === 7 && item.presell && item.presell.product">
											<div class=" noPad">
												<navigator class="acea-row row-column-around noPad" v-if="item.presell.product_presell_id" :url="`/pages/activity/presell_details/index?id=${item.presell.product_presell_id}`" open-type="navigate">
													<div class="broadcast_details_img_no">
														<image :src="item.presell.product.image" />
													</div>
													<div class="broadcast_details_picBox_no noPad">
														<div class="broadcast_details_pic">
															￥{{ item.presell.price }}
														</div>
														<div class="broadcast_details_tit_no line1">{{item.presell.store_name}}</div>
													</div>
												</navigator>
											</div>
										</div>
										<!--拼团商品链接-->
										<div class="conter acea-row row-middle" v-if="item.msn_type === 8 && item.productGroup && item.productGroup.product">
											<div class=" noPad">
												<navigator class="acea-row row-column-around noPad" v-if="item.productGroup.product_group_id" :url="`/pages/activity/combination_details/index?id=${item.productGroup.product_group_id}`" open-type="navigate">
													<div class="broadcast_details_img_no">
														<image :src="item.productGroup.product.image" />
													</div>
													<div class="broadcast_details_picBox_no noPad">
														<div class="broadcast_details_pic">
															￥{{ item.productGroup.product.price }}
														</div>
														<div class="broadcast_details_tit_no line1">{{item.productGroup.product.store_name}}</div>
													</div>
												</navigator>
											</div>
										</div>
										<div class="conter acea-row row-middle" v-if="item.msn_type === 3">
											<image :src="item.msn" @click="clickImg(item.msn)" mode="heightFix" />
										</div>
										<div class="conter acea-row row-middle" v-if="item.msn_type === 2">
											<i class="em" :class="item.msn" :style="'background-image:url('+ httpUrl +')'"></i>
										</div>
										<div class="conter acea-row row-middle" v-if="item.msn_type === 1">										
											{{item.msn}}
										</div>
										
									</div>
								</div>
							</div>
							<!-- 右边 -->
							<div class="item acea-row row-top row-right" v-else @longpress="longTime(items,index,item,j)">
								<div class="text textR">
									<!-- <div class="name">{{ item.user.nickname }}</div> -->
									<div class="acea-row ">
										<!--退款订单链接-->
										<navigator v-if="item.msn_type === 6 && item.refundOrder.refund_order_id" open-type="navigate">
											<div class="broadcast-details_num acea-row row-middle">
												<text>订单号：{{ item.refundOrder.refund_order_sn }}</text>		
												<!-- #ifdef H5 -->
												<button class="copy copy-data" :data-clipboard-text="item.refundOrder.refund_order_sn">复制</button>
												<!-- #endif -->
												<!-- #ifndef H5 -->
												<button class="copy" @tap.stop="copyText(item.refundOrder.refund_order_sn)">复制</button>
												<!-- #endif -->
											</div>
											<div class="conter acea-row row-middle">
												<div class="broadcast-details_order noPad" v-for="(val, inx) in item.refundOrder.refundProduct" :key="val.id">
													<div class="broadcast-details_box noPad" v-if="inx == 0">
														<div class="broadcast_details_img">
															<image :src="val.product.cart_info.product.image" />
															<div class="broadcast_details_model">
																{{item.refundOrder.refund_num}}件商品
															</div>
														</div>
														<div class="broadcast_details_picBox noPad">
															<div class="broadcast_details_tit">{{val.product.cart_info.product.store_name}}</div>
															<div class="broadcast_details_pic">
																￥{{ item.refundOrder.refund_price }}
															</div>
														</div>
													</div>
												</div>
											</div>
										</navigator>
										<!--订单链接-->
										<div v-if="item.msn_type === 5 && item.orderInfo.order_id">
											<div class="broadcast-details_num acea-row row-middle">
												<text>订单号：{{ item.orderInfo.order_sn }}</text>
												<!-- #ifdef H5 -->
												<button class="copy copy-data" :data-clipboard-text="item.orderInfo.order_sn">复制</button>
												<!-- #endif -->
												<!-- #ifndef H5 -->
												<button class="copy" @tap.stop="copyText(item.orderInfo.order_sn)">复制</button>
												<!-- #endif -->
											</div>
											<navigator :url="'/pages/admin/orderDetail/index?id='+item.orderInfo.order_id+'&mer_id='+item.orderInfo.mer_id" open-type="navigate" class="conter acea-row row-middle">
												<div class="broadcast-details_order noPad" v-for="(val, inx) in item.orderInfo.orderProduct" :key="val.id">
													<div class="broadcast-details_box noPad" v-if="inx == 0">
														<div class="broadcast_details_img">
															<image :src="val.cart_info.product.image" />
															<div class="broadcast_details_model">
																{{item.orderInfo.total_num}}件商品
															</div>
														</div>
														<div class="broadcast_details_picBox noPad">
															<div class="broadcast_details_tit">{{val.cart_info.product.store_name}}</div>
															<div class="broadcast_details_pic">
																￥{{ item.orderInfo.pay_price }}
															</div>
														</div>
													</div>
												</div>
											</navigator>
										</div>
										<!--商品链接-->
										<div class="conter acea-row row-middle" v-if="item.msn_type === 4 && item.product">
											<div class=" acea-row row-column-around noPad">
												<navigator class="acea-row row-column-around noPad" v-if="item.product.product_id" :url="`/pages/goods_details/index?id=${item.product.product_id}`">
													<div class="broadcast_details_img_no">
														<image :src="item.product.image" />
													</div>
													<div class="broadcast_details_picBox_no noPad">
														<div class="broadcast_details_pic">
															￥{{ item.product.price }}
														</div>
														<div class="broadcast_details_tit_no line1">{{item.product.store_name}}</div>
													</div>
												</navigator>
											</div>
										</div>
										<!--预售商品链接-->
										<div class="conter acea-row row-middle" v-if="item.msn_type === 7 && item.presell && item.presell.product">
											<div class=" acea-row row-column-around noPad">
												<navigator class="acea-row row-column-around noPad" v-if="item.presell.product_presell_id" :url="`/pages/activity/presell_details/index?id=${item.presell.product_presell_id}`" open-type="navigate">
													<div class="broadcast_details_img_no">
														<image :src="item.presell.product.image" />
													</div>
													<div class="broadcast_details_picBox_no noPad">
														<div class="broadcast_details_pic">
															￥{{ item.presell.price }}
														</div>
														<div class="broadcast_details_tit_no line1">{{item.presell.store_name}}</div>
													</div>
												</navigator>
											</div>
										</div>
										<!--拼团商品链接-->
										<div class="conter acea-row row-middle" v-if="item.msn_type === 8 && item.productGroup && item.productGroup.product">
											<div class=" acea-row row-column-around noPad">
												<navigator class="acea-row row-column-around noPad" v-if="item.productGroup.product_group_id" :url="`/pages/activity/combination_details/index?id=${item.productGroup.product_group_id}`" open-type="navigate">
													<div class="broadcast_details_img_no">
														<image :src="item.productGroup.product.image" />
													</div>
													<div class="broadcast_details_picBox_no noPad">
														<div class="broadcast_details_pic">
															￥{{ item.productGroup.product.price }}
														</div>
														<div class="broadcast_details_tit_no line1">{{item.productGroup.product.store_name}}</div>
													</div>
												</navigator>
											</div>
										</div>
										<div class="conter acea-row row-middle" v-if="item.msn_type === 3">
											<image :src="item.msn" @click="clickImg(item.msn)" mode="heightFix" />
										</div>
										<div class="conter acea-row row-middle" v-if="item.msn_type === 2">
											<i class="em" :class="item.msn" :style="'background-image:url('+ httpUrl +')'"></i>
										</div>
										<div class="conter acea-row row-middle" v-if="item.msn_type === 1">
											{{item.msn}}
										</div>
										<view class="recall" :class="'recall'+index+j" v-if="item.longpress && press && (item.msn_type === 1 || (new Date().getTime()/1000 - item.send_time) <= 120)">
											<view class="recall-item" v-if="item.msn_type === 1">
												<!-- #ifdef H5 -->
												<view class="copy copy-data" :data-clipboard-text="item.msn">
													<text class="iconfont icon-fuzhi"></text>
													复制
												</view>
												<!-- #endif -->
												<!-- #ifndef H5 -->
												<view class="copy copy-data" @tap.stop="copyText(item.msn)">
													<text class="iconfont icon-fuzhi"></text>
													复制
												</view>
												<!-- #endif -->
											</view>
											<view v-if="(new Date().getTime()/1000 - item.send_time) <= 120" class="recall-item" @click.stop="reverstMsg(item)"><view class="iconfont icon-chehui"></view>撤回</view>
										</view>
									</div>
								</div>
								<div v-if="item.msn_type != 100" class="pictrue">
									<image :src="item.service.avatar ? item.service.avatar : '/static/images/f.png'"  />
								</div>
								<view v-if="item.msn_type === 100" class="recall-msg">你撤回了一条消息</view>
							</div>
						</block>
					</block>
					<!-- 客户聊天列表 -->
					<block v-for="(items,index) in history" v-if="userId == 0" :key="items.time">
						<div class="create_time">{{items.time}}</div>
						<block v-for="(item,j) in items.children" :key="item.service_log_id">
							<!-- 左边 -->
							<div class="item acea-row row-top" v-if="item.send_type == 1">
								<div v-if="item.msn_type !== 100" class="pictrue">
									<image :src="item.service.avatar ? item.service.avatar : '/static/images/f.png'" mode=""></image>
								</div>
								<view v-if="item.msn_type === 100" class="recall-msg">对方撤回了一条消息</view>
								<div class="text">
									<!-- <div class="name">{{ item.service.nickname }}</div> -->
									<div class="acea-row">
										<!--退款订单链接-->
										<navigator v-if="item.msn_type === 6 && item.refundOrder.refund_order_id"  open-type="navigate" :url="'/pages/order_details/index?order_id='+item.refundOrder.order_id">
											<div class="broadcast-details_num">
												<text>退款单号：{{ item.refundOrder.refund_order_sn }}</text>
											</div>
											<div class="conter acea-row row-middle">
												<!-- :key="item.service_log_id" -->
												<div class="broadcast-details_order noPad" v-for="(val, inx) in item.refundOrder.refundProduct">
													<div class="broadcast-details_box noPad" v-if="inx == 0">
														<div class="broadcast_details_img">
															<image :src="val.product.cart_info.product.image" />
															<div class="broadcast_details_model">
																{{item.refundOrder.refund_num}}件商品
															</div>
														</div>
														<div class="broadcast_details_picBox noPad">
															<div class="broadcast_details_tit">{{val.product.cart_info.product.store_name}}</div>
															<div class="broadcast_details_pic">
																￥{{ val.product.cart_info.productAttr.price }}
															</div>
														</div>
													</div>
												</div>
											</div>
										</navigator>
										<!--订单链接-->
										<div v-if="item.msn_type === 5 && item.orderInfo.order_id">
											<div class="broadcast-details_num acea-row row-middle">
												<text>订单号：{{ item.orderInfo.order_sn }}</text>
												<!-- #ifdef H5 -->
												<button class="copy copy-data" :data-clipboard-text="item.orderInfo.order_sn">复制</button>
												<!-- #endif -->
												<!-- #ifndef H5 -->
												<button class="copy" @tap.stop="copyText(item.orderInfo.order_sn)">复制</button>
												<!-- #endif -->
											</div>
											<navigator :url="'/pages/order_details/index?order_id='+item.orderInfo.order_id" open-type="navigate" class="conter acea-row row-middle">
												<!-- :key="item.service_log_id" -->
												<div class="broadcast-details_order noPad" v-for="(val, inx) in item.orderInfo.orderProduct">
													<div class="broadcast-details_box noPad" v-if="inx == 0">
														<div class="broadcast_details_img">
															<image :src="val.cart_info.product.image" />
															<div class="broadcast_details_model">
																{{item.orderInfo.total_num}}件商品
															</div>
														</div>
														<div class="broadcast_details_picBox noPad">
															<div class="broadcast_details_tit">{{val.cart_info.product.store_name}}</div>
															<div class="broadcast_details_pic">
																￥{{ item.orderInfo.pay_price }}
															</div>
														</div>
													</div>
												</div>
											</navigator>
										</div>
										<!--商品链接-->
										<div class="conter acea-row row-middle" v-if="item.msn_type === 4 && item.product">
											<div class=" noPad">
												<navigator class="acea-row row-column-around noPad" v-if="item.product.product_id" :url="`/pages/goods_details/index?id=${item.product.product_id}`" open-type="navigate">
													<div class="broadcast_details_img_no">
														<image :src="item.product.image" />
													</div>
													<div class="broadcast_details_picBox_no noPad">
														<div class="broadcast_details_pic">
															￥{{ item.product.price }}
														</div>
														<div class="broadcast_details_tit_no line1">{{item.product.store_name}}</div>
													</div>
												</navigator>
											</div>
										</div>
										<!--预售商品链接-->
										<div class="conter acea-row row-middle" v-if="item.msn_type === 7 && item.presell && item.presell.product">
											<div class=" noPad">
												<navigator class="acea-row row-column-around noPad" v-if="item.presell.product_presell_id" :url="`/pages/activity/presell_details/index?id=${item.presell.product_presell_id}`" open-type="navigate">
													<div class="broadcast_details_img_no">
														<image :src="item.presell.product.image" />
													</div>
													<div class="broadcast_details_picBox_no noPad">
														<div class="broadcast_details_pic">
															￥{{ item.presell.price }}
														</div>
														<div class="broadcast_details_tit_no line1">{{item.presell.store_name}}</div>
													</div>
												</navigator>
											</div>
										</div>
										<!--拼团商品链接-->
										<div class="conter acea-row row-middle" v-if="item.msn_type === 8 && item.productGroup && item.productGroup.product">
											<div class="noPad">
												<navigator class="acea-row row-column-around noPad" v-if="item.productGroup.product_group_id" :url="`/pages/activity/combination_details/index?id=${item.productGroup.product_group_id}`" open-type="navigate">
													<div class="broadcast_details_img_no">
														<image :src="item.productGroup.product.image" />
													</div>
													<div class="broadcast_details_picBox_no noPad">
														<div class="broadcast_details_pic">
															￥{{ item.productGroup.product.price }}
														</div>
														<div class="broadcast_details_tit_no line1">{{item.productGroup.product.store_name}}</div>
													</div>
												</navigator>
											</div>
										</div>
										<div class="conter acea-row row-middle" v-if="item.msn_type === 3">
											<image :src="item.msn" @click="clickImg(item.msn)"  mode="heightFix" />
										</div>
										<div class="conter acea-row row-middle" v-if="item.msn_type === 2">
											<i class="em" :class="item.msn" :style="'background-image:url('+ httpUrl +')'"></i>
										</div>
										<div class="conter acea-row row-middle" v-if="item.msn_type === 1">
											{{item.msn}}
										</div>
										
									</div>
								</div>
							</div>
							<!-- 右边 -->
							<div class="item acea-row row-top row-right" v-else>
								<div class="text textR">	
									<!-- <div class="name">{{ item.user.nickname }}</div> -->
									<div class="acea-row" @longpress="longTime(items,index,item,j)">
										<!--退款订单链接-->
										<navigator v-if="item.msn_type === 6 && item.refundOrder.refund_order_id" open-type="navigate" :url="'/pages/order_details/index?order_id='+item.refundOrder.order_id">
											<div class="broadcast-details_num">
												<text>退款单号：{{ item.refundOrder.refund_order_sn }}</text>
											</div>
											<div class="conter acea-row row-middle">
												<!-- :key="item.service_log_id" -->
												<div class="broadcast-details_order noPad" v-for="(val, inx) in item.refundOrder.refundProduct">
													<div class="broadcast-details_box noPad" v-if="inx == 0">
														<div class="broadcast_details_img">
															<image :src="val.product.cart_info.product.image" />
															<div class="broadcast_details_model"></div>
														</div>
														<div class="broadcast_details_picBox noPad">
															<div class="broadcast_details_tit">{{val.product.cart_info.product.store_name}}</div>
															<div class="broadcast_details_pic">
																共{{item.refundOrder.refund_num}}件商品，
																合计 ￥{{ item.refundOrder.refund_price }}
															</div>
														</div>
													</div>
												</div>
											</div>
										</navigator>
										<!--订单链接-->
										<div v-if="item.msn_type === 5 && item.orderInfo.order_id">
											<div class="broadcast-details_num acea-row row-middle">
												<text>订单号：{{ item.orderInfo.order_sn }}</text>
												<!-- #ifdef H5 -->
												<button class="copy copy-data" :data-clipboard-text="item.orderInfo.order_sn">复制</button>
												<!-- #endif -->
												<!-- #ifndef H5 -->
												<button class="copy" @tap.stop="copyText(item.orderInfo.order_sn)">复制</button>
												<!-- #endif -->
											</div>
											<navigator :url="'/pages/order_details/index?order_id='+item.orderInfo.order_id" open-type="navigate" class="conter acea-row row-middle">
												<div class="broadcast-details_order noPad" v-for="(val, inx) in item.orderInfo.orderProduct">
													<div class="broadcast-details_box noPad" v-if="inx == 0">
														<div class="broadcast_details_img">
															<image :src="val.cart_info.product.image" />
															<div class="broadcast_details_model">
																{{item.orderInfo.total_num}}件商品
															</div>
														</div>
														<div class="broadcast_details_picBox noPad">
															<div class="broadcast_details_tit">{{val.cart_info.product.store_name}}</div>
															<div class="broadcast_details_pic">
																￥{{ item.orderInfo.pay_price }}
															</div>
														</div>
													</div>
												</div>
											</navigator>
										</div>
										<!--商品链接-->
										<div class="conter acea-row row-middle" v-if="item.msn_type === 4 && item.product">
											<div class="acea-row row-column-around noPad">
												<navigator class="acea-row row-column-around noPad" v-if="item.product.product_id" :url="`/pages/goods_details/index?id=${item.product.product_id}`" open-type="navigate">
													<div class="broadcast_details_img_no">
														<image :src="item.product.image" />
													</div>
													<div class="broadcast_details_picBox_no noPad">
														<div class="broadcast_details_pic">
															￥{{ item.product.price }}
														</div>
														<div class="broadcast_details_tit_no line1">{{item.product.store_name}}</div>
													</div>
												</navigator>
											</div>
										</div>
										<!--预售商品链接-->
										<div class="conter acea-row row-middle" v-if="item.msn_type === 7 && item.presell && item.presell.product">
											<div class="acea-row row-column-around noPad">
												<navigator class="acea-row row-column-around noPad" v-if="item.presell.product_presell_id" :url="`/pages/activity/presell_details/index?id=${item.presell.product_presell_id}`" open-type="navigate">
													<div class="broadcast_details_img_no">
														<image :src="item.presell.product.image" />
													</div>
													<div class="broadcast_details_picBox_no noPad">
														<div class="broadcast_details_pic">
															￥{{ item.presell.price }}
														</div>
														<div class="broadcast_details_tit_no line1">{{item.presell.store_name}}</div>
													</div>
												</navigator>
											</div>
										</div>
										<!--拼团商品链接-->
										<div class="conter acea-row row-middle" v-if="item.msn_type === 8 && item.productGroup && item.productGroup.product">
											<div class="acea-row row-column-around noPad">
												<navigator class="acea-row row-column-around noPad" v-if="item.productGroup.product_group_id" :url="`/pages/activity/combination_details/index?id=${item.productGroup.product_group_id}`" open-type="navigate">
													<div class="broadcast_details_img_no">
														<image :src="item.productGroup.product.image" />
													</div>
													<div class="broadcast_details_picBox_no noPad">
														<div class="broadcast_details_pic">
															￥{{ item.productGroup.product.price }}
														</div>
														<div class="broadcast_details_tit_no line1">{{item.productGroup.product.store_name}}</div>
													</div>
												</navigator>
											</div>
										</div>
										<div class="conter acea-row row-middle" v-if="item.msn_type === 3">
											<image :src="item.msn" @click="clickImg(item.msn)" mode="heightFix" />
										</div>
										<div class="conter acea-row row-middle" v-if="item.msn_type === 2">
											<i class="em" :class="item.msn" :style="'background-image:url('+ httpUrl +')'"></i>
										</div>
										<div class="conter acea-row row-middle" v-if="item.msn_type === 1">
											{{ item.msn }}
										</div>	
										<view class="recall" :class="'recall'+index+j" v-if="item.longpress && press && (item.msn_type === 1 || (new Date().getTime()/1000 - item.send_time) <= 120)">
											<view class="recall-item" v-if="item.msn_type === 1">
												<!-- #ifdef H5 -->
												<view class="copy copy-data" :data-clipboard-text="item.msn">
													<text class="iconfont icon-fuzhi"></text>
													复制
												</view>
												<!-- #endif -->
												<!-- #ifndef H5 -->
												<view class="copy copy-data" @tap.stop="copyText(item.msn)">
													<text class="iconfont icon-fuzhi"></text>
													复制
												</view>
												<!-- #endif -->
											</view>
											<view v-if="(new Date().getTime()/1000 - item.send_time) <= 120" class="recall-item" @click.stop="reverstMsg(item)"><view class="iconfont icon-chehui"></view>撤回</view>
										</view>
									</div>	
								</div>
								<div v-if="item.msn_type !== 100" class="pictrue">
									<image :src="item.user.avatar ? item.user.avatar : '/static/images/f.png'"/>				
								</div>
							<view v-if="item.msn_type === 100" class="recall-msg">你撤回了一条消息</view>
							</div>
						</block>
					</block>
					<view class="footer_box" v-if="productId || orderId || refund_order_id"></view>
					<div class="broadcast-details_order footer_count">
						<!-- 商品信息 -->
						<div class="broadcast-details_box" v-if="productId && productInfo.product_id">
							<text class="iconfont icon-guanbi" @click.stop="productId = ''"></text>
							<div class="broadcast_details_img">
								<image v-if="!presellId" :src="productInfo.image" />
								<image v-else :src="productInfo.product.image" />
							</div>
							<div class="broadcast_details_picBox">
								<div class="broadcast_details_tit">{{productInfo.store_name}}</div>
								<div class="acea-row row-between product_price">
									<div class="broadcast_details_pic p-color">
										￥{{ productInfo.price}}
									</div>
									<div class="broadcast_details_btn product_btn" @click="sendProduct">发送商品</div>
								</div>
							</div>
						</div>
						<!-- 订单信息 -->
						<div class="broadcast_box" v-if="orderId && orderInfo.order_id">
							<text class="iconfont icon-guanbi" @click.stop="orderId = ''"></text>
							<div class="broadcast-details_num broadcast_num acea-row row-between-wrapper">
								<text>订单号：{{ orderInfo.order_sn }}</text>
								<!-- <span class="line1">{{ orderInfo.pay_time }}</span> -->
							</div>
							<div class="broadcast-details_box">
								<div class="broadcast_details_img">
									<image :src="cartInfo.cart_info.product.image" />
								</div>
								<div class="broadcast_details_picBox">
									<div class="broadcast_details_tit">
										{{ cartInfo.cart_info.product.store_name }}
									</div>
									<div>
										<div class="broadcast_details_pic">
											共{{ orderInfo.total_num }}件商品，合计 <text class="p-color">￥{{ orderInfo.pay_price }}</text>
										</div>
										<div class="broadcast_details_btn" @click="sendOrder">
											发送订单
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- 退款订单 -->
						<div class="broadcast_box" v-if="refund_order_id && refundDetail.refund_order_id">
							<text class="iconfont icon-guanbi" @click.stop="refund_order_id = ''"></text>
							<div class="broadcast-details_num broadcast_num">
								<text>退款单号：{{ refundDetail.refund_order_sn }}</text>
							</div>
							<div class="broadcast-details_box">
								<div class="broadcast_details_img">
									<image :src="refundDetail.refundProduct[0].product.cart_info.product.image" />
								</div>
								<div class="broadcast_details_picBox">
									<div class="broadcast_details_tit">
										{{ refundDetail.refundProduct[0].product.cart_info.product.store_name }}
									</div>
									<div>
										<div class="broadcast_details_pic">
											共{{ refundDetail.refund_num }}件商品，
											合计 <text class="p-color">￥{{ refundDetail.refund_price}}</text>
										</div>
										<div class="broadcast_details_btn refund_btn" @click="sendRefundOrder">
											发送退款单
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div :style=" active === true ? 'height:' + footerConH + 'rem;' : 'height:' + footerH + 'rem;'"></div>
			</scroll-view>
		</view>
		<view style="height: 100rpx;"></view>
		<div class="footerCon" :class="active === true ? 'on' : ''" ref="footerCon">
			<form>
				<div class="footer acea-row row-between row-bottom" ref="footer">
					<text @click="uploadImg" class="iconfont icon-tupian2"></text>
					<text @click="emoticon" class="iconfont icon-biaoqing2"></text>
					<div class="voice acea-row row-center-wrapper" v-if="voice" @touchstart.prevent="start" @touchmove.prevent="move"
					 @touchend.prevent="end">
						{{ speak }}
					</div>
					<view class="input_count">
						<input type="text" placeholder-class='placeholder' placeholder="输入内容" class="input" ref="input" v-show="!voice" @input="bindInput" @keyup="keyup"
						 @focus="focus" cursor-spacing="20" v-model="textCon">
						<div class="send iconfont icon-fasong" :style="'color:'+iconColor" @click="sendTest"></div>
					</view>
				</div>
			</form>
			<div class="banner slider-banner">
				<swiper class="swiper-wrapper" :autoplay="autoplay" :circular="circular" :interval="interval" :duration="duration"
				 v-if="emojiGroup.length > 0">
					<block v-for="(emojiList, index) in emojiGroup" :key="index">
						<swiper-item>
							<i class="em" :class="emoji" :style="'background-image:url('+ httpUrl +')'" v-for="emoji in emojiList" :key="emoji" @click="addEmoji(emoji)"></i>
						</swiper-item>
					</block>
				</swiper>
			</div>
		</div>
		<div class="recording" v-if="recording">
			<image src="/static/images/recording.png" />
		</div>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
	</div>
</template>
<script>
	// +----------------------------------------------------------------------
	// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
	// +----------------------------------------------------------------------
	// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
	// +----------------------------------------------------------------------
	// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
	// +----------------------------------------------------------------------
	// | Author: CRMEB Team <admin@crmeb.com>
	// +----------------------------------------------------------------------
	import emojiList from "@/utils/emoji";
	import Socket from "@/libs/chat";
	// #ifdef H5
	import ClipboardJS from "@/plugin/clipboard/clipboard.js";
	// #endif
	import { getChatRecord, getMerHistory, chatReverstApi, hasServiceApi } from "@/api/user";
	import { getProductDetail, getPresellProductDetail, getStoreDetail } from "@/api/store";	
	import { getCombinationDetail } from "@/api/activity";
	import { getOrderDetail, refundDetail } from "@/api/order";
	import Loading from "@/components/Loading";
	import { TOKENNAME, HTTP_REQUEST_URL } from '@/config/app.js';
	import { configMap } from "@/utils";
	import { mapGetters } from "vuex";
	import authorize from '@/components/Authorize';
	const chunk = function(arr, num) {
		num = num * 1 || 1;
		var ret = [];
		arr.forEach(function(item, i) {
			if (i % num === 0) {
				ret.push([]);
			}
			ret[ret.length - 1].push(item);
		});
		return ret;
	};
	const NAME = "CustomerService";
	const PATH = 'pages/chat/customer_list/chat'
	const app = getApp();
	export default {
		name: NAME,
		components: {
			Loading,
			authorize
		},
		props: {
			couponList: {
				type: Array,
				default: () => []
			}
		},
		computed: configMap(['hide_mer_status'],mapGetters(['isLogin', 'viewColor', 'uid'])),
		data: function() {
			return {
				url: `${HTTP_REQUEST_URL}/api/upload/image`,
				headers: {
					"Authori-zation": "Bearer " + this.$store.state.app.token
				},
				emojiGroup: chunk(emojiList, 21),
				active: false,
				voice: false,
				speak: "按住 说话",
				recording: false,
				swiperOption: {
					pagination: {
						el: ".swiper-pagination",
						clickable: true
					},
					speed: 1000,
					observer: true,
					observeParents: true
				},
				percent: 0,
				footerConH: 0,
				footerH: 1.08,
				socket: null,
				toUid: 0,
				page: 1,
				limit: 30,
				loading: false,
				loaded: false,
				history: [],
				sendColor: false,
				sendtxt: "",
				productId: 0,
				presellId: 0,
				combinationId: 0,
				productInfo: {},
				orderId: "",
				orderInfo: {},
				cartInfo: {},
				autoplay: false,
				circular: true,
				interval: 3000,
				duration: 500,
				upload_max: 2, //图片大小
				//上传的图片地址
				uploadImages: [],
				//展示的图片地址
				uploads: [],
				// 超出限制数组
				exceeded_list: [],
				windowH: 0,
				isBQ: false,
				scrollTop: 0, //滚动距离
				textCon: '', //文字
				iconColor: '#CCCCCC',
				mer_id: 0, //商铺id
				refund_order_id: 0, //退款订单id
				refundDetail: '', //退款订单详情
				userId: 0, //客服----用户id
				pageType: 0, //页面区分
				status: false, //砍价列表是否获取完成 false 未完成 true 完成
				storeInfo: '',
				isBack: false,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				httpUrl: '',
				press: false,
				index: 0,
				j: 0
			};
		},
		watch: {
			textCon: function(nval, oVal) {
				if (nval == "") {
					this.iconColor = '#CCCCCC'
				} else {
					this.iconColor = '#86C956'
				}
			}
		},
		beforeDestroy() {
			uni.$off(["socket_open", "reply", "chat", "send_chat", "socket_error", "socket_close"])
		},
		onUnload() {
			this.wsEnd();
		},
		onLoad(option) {
			let self = this
			this.toUid = option.uid || 0;
			this.productId = parseInt(option.productId) || 0;
			this.presellId = parseInt(option.presellId) || 0;
			this.combinationId = parseInt(option.combinationId) || 0;
			this.orderId = option.order_id || ""
			this.mer_id = option.mer_id || 0
			this.refund_order_id = option.refund_order_id || 0
			this.userId = option.userId || 0
			uni.getSystemInfo({
				success: function(res) {
					self.windowH = res.windowHeight
				}
			})
			// #ifdef H5
			this.$nextTick(function() {
				var clipboard = new ClipboardJS('.copy-data');
				clipboard.on('success', function(e) {
					self.$util.Tips({
						title:'复制成功'
					})
					self.press = false;
				});
				clipboard.on('error', function(e) {
					self.$util.Tips({
						title:'复制失败'
					})
				});
			});
			// #endif
		},
		onReady() {
			this.httpUrl = `${HTTP_REQUEST_URL}/static/look.png`;
		},
		mounted: function() {
			let that = this
			if (that.isLogin) {
				if (that.userId == 0) {
					// 用户
					that.getHistory();
					that.getproductInfo();
					that.getOrderInfo();
					that.getRefundDetail();
					that.getStoreDetail();
				} else {
					// 客服
					that.getMerHistory();
				}
				uni.$on("socket_open", () => {
					if (that.userId == 0) {
						that.socket.send({
							data: {
								mer_id: that.mer_id
							},
							type: "chat_start"
						});
					} else {					
						that.socket.send({
							data: {
								uid: that.userId,
								mer_id: that.mer_id
							},
							type: "service_chat_start"
						});
					}
				});
				uni.$on(["reply", "chat", "send_chat"], data => {
					data.longpress = false
					if(that.history.length>0 && that.history[that.history.length-1]['children'].length > 0){
						let index = that.history[that.history.length-1]['children'].length-1
						let item = that.history[that.history.length-1]['children'][index]
					
						if(data.send_time - item.send_time > 300){
							that.history.push({time: data.create_time,children:[data]})
						}else{
							that.history[that.history.length-1]['children'].push(data);
						}
					}else{
						that.history.push({time: data.create_time,children:[data]})
					}	
					that.deleteMsg(data);		
					that.height();
				});
				uni.$on("socket_error", () => {
					if (!that.isBack) {
						let self = this
						uni.showModal({
							title: '提示',
							content: '连接失败,是否重新连接',
							success: function(res) {
								if (res.confirm) {
									self.wsStart()
								} else if (res.cancel) {
									uni.navigateBack();
								}
							}
						});
					}
				});
				uni.$on("err_tip", data => {
					if (!this.isBack) {
						uni.showModal({
							title: '提示',
							content: data,
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				});
				uni.$on("socket_close", () => {
					if (!this.isBack) {
						let curRoute = this.$mp.page.route;
						let self = this
						uni.showModal({
							title: '提示',
							content: '连接断开，是否重新连接',
							success: function(res) {
								if (res.confirm) {
									self.wsStart()
								} else if (res.cancel) {
									uni.navigateBack();
								}
							}
						});
					}
				})
				that.hasService();
				that.wsStart();
			} else {
				that.isAuto = true;
				that.isShowAuth = true
			}
		},
		methods: {
			/**
			 * 登录授权回调
			 *
			 */
			onLoadFun: function() {
				this.isShowAuth = false;
				if (this.userId == 0) {
					// 用户
					this.getHistory();
					this.getproductInfo();
					this.getOrderInfo();
					this.getRefundDetail();
					this.getStoreDetail();
				} else {
					// 客服
					this.getMerHistory();
				}
			},
			// 授权关闭
			authColse: function(e) {
			  this.isShowAuth = e;
			},
			userDetail(uid){
				this.wsEnd()
				uni.redirectTo({
					url: `/pages/chat/customer_info/index?uid=${uid}&mer_id=${this.mer_id}`
				})
			},
			/*判断店铺是否有在线客服*/
			hasService(){
				hasServiceApi(this.mer_id).then(res => {
					this.height();
					if (this.userId == 0) {
						// 用户
						this.getHistory();
					} else {
						// 客服
						this.getMerHistory();
					}
				}).catch(err => {
					return this.$util.Tips({
						title: err
					}, {
						tab: 3,
						url: 1
					});
				});
			},
			// 联系客服拨打电话
			goCustomer(){
				 uni.makePhoneCall({	
				 // 手机号
				    phoneNumber: this.storeInfo.service_phone, 
					// 成功回调
					success: (res) => {},
					// 失败回调
					fail: (res) => {}		
				});
			},
			// 获取店铺详情
			getStoreDetail() {
				getStoreDetail(this.mer_id).then(res => {
					this.storeInfo = res.data
				})
			},
			// ws连接
			wsStart() {
				this.socket = new Socket();
				this.height();
			},
			// ws关闭
			wsEnd() {
				let that = this;
				if (that.userId == 0) {
					that.socket.send({
						data: {
							mer_id: that.mer_id
						},
						type: "chat_end"
					});
				} else {
					that.socket.send({
						data: {
							uid: that.userId,
							mer_id: that.mer_id
						},
						type: "service_chat_end"
					});
				}
				that.isBack = true
				that.socket && that.socket.onClose();
			},
			// 删除数组中已撤回的消息
			deleteMsg(data){
				let that = this;
				that.history.forEach(function(item, index) {
					item.children.forEach(function(itx, i) {
						if(data.msn_type == 100 && data.msn == itx.service_log_id){
							item.children.splice(i,1)
						}
					});	
				});
			},
			// 退款订单
			getRefundDetail() {
				if (this.refund_order_id) {
					refundDetail(this.refund_order_id).then(res => {
						this.refundDetail = res.data
					})
				}
			},
			uploadImg() {
				let self = this
				self.$util.uploadImageOne('upload/image', function(res) {
					if(res.status == 200){
						self.sendMsg(res.data.path, 3)
					}
				});
			},
			/*长按事件*/
			longTime(items,index,item,j){
				item.longpress = true
				this.history[this.index]['children'][this.j]['longpress'] = false
				this.press = true
				this.index = index;
				this.j = j
				this.history[this.index]['children'][this.j]['longpress'] = true
			},
			stoppress() {
				this.press = false		
			},
			reverstMsg(item) {
				this.sendMsg(item.service_log_id,100)
				setTimeout(function(){
					item.longpress = false;
				},300)
			},
			getOrderInfo() {
				if (!this.orderId) return;
				getOrderDetail(this.orderId).then(res => {
					this.orderInfo = res.data;
					if (this.orderInfo.orderProduct.length) {
						this.cartInfo = this.orderInfo.orderProduct[0];
					}
				});
			},
			getproductInfo() {
				let that = this;
				if (!that.productId && !that.presellId && !that.combinationId) return;
				if(that.presellId || that.combinationId){
					if(that.presellId){
						getPresellProductDetail(that.presellId).then(res => {
							that.productInfo = res.data;
						});		
					}else if(that.combinationId){
						getCombinationDetail(that.combinationId).then(res => {
							that.productInfo = res.data.product;
						});
					}
				}else{
					getProductDetail(that.productId).then(res => {
						that.productInfo = res.data;
					});
				}	
			},
			scroll() {
				if (window.scrollY < 300 && !this.loaded && !this.loading)
				this.getHistory();
			},
			imageuploaded(res) {
				if (res.status !== 200)
				return this.$util.Tips({
					title: res.msg || "上传图片失败"
				});
				this.sendMsg(res.data.url, 3);
			},
			// 用户聊天记录
			getHistory() {
				if (this.loading || this.loaded) return;
				this.loading = true;
				getChatRecord(this.mer_id, {
						page: this.page,
						limit: this.limit
					}).then(({data}) => {
						let arr = this.getChatTime(data.list)
						let newArr = []
						for(var j in arr){
							let key = j
							let item  = {}
							item.time = key;
							arr[j].forEach(function(itm, i) {
								itm.longpress = false
							});
							item.children = arr[j]
							newArr.push(item)
						}
						this.history = newArr.concat(this.history);
						if (this.page === 1) {
							this.$nextTick(function() {
								this.height();
							});
						}
						this.page++;
						this.loading = false;
						this.loaded = data.length < this.limit;
					})
					.catch(err => {
						this.$util.Tips({
							title: err.message || "加载失败"
						});
					});
			},
			// 处理聊天时间
			getChatTime(list){
				let arr = {}
				let currentTime = ''
				for(var i=0; i<list.length;i++){
					if(i == 0){
						let time = list[i]['create_time']
						arr[time] = [list[i]]
						currentTime = time
					}else{
						if((list[i]['send_time'] - list[i-1]['send_time']) <= 300 ){
							arr[currentTime].push(list[i]) 
						}else{
							let time = list[i]['create_time']
							currentTime = time
							if(arr[time]){
								arr[currentTime].push(list[i]) 
							}else{
								arr[time] = [list[i]]
							} 
						}
					}
				}
				return arr;
			},
			// 客服聊天记录
			getMerHistory() {
				if (this.loading || this.loaded) return;
				this.loading = true;
				const last_id = this.history.length ? this.history[0].service_log_id : '';
				getMerHistory(this.userId, this.mer_id, {
						page: this.page,
						limit: this.limit,
						last_id
					})
					.then(({
						data
					}) => {
						let arr = this.getChatTime(data.list)
						let newArr = []
						for(var j in arr){
							let key = j
							let item  = {}
							item.time = key;
							arr[j].forEach(function(itm, i) {
								itm.longpress = false
							});
							item.children = arr[j]
							newArr.push(item)
						}
						this.history = newArr.concat(this.history);
						
						if (this.page === 1) {
							this.$nextTick(function() {
								this.height();
							});
						}
						this.page++;
						this.loading = false;
						this.loaded = data.length < this.limit;
					})
					.catch(err => {
						this.$util.Tips({
							title: err.msg || "加载失败"
						});
					});
			},
			focus: function() {
				this.active = false;
			},
			keyup: function() {
				if (this.$refs.input.value.length > 0) {
					this.sendColor = true;
				} else {
					this.sendColor = false;
				}
			},
			addEmoji(name) {
				this.sendMsg(name, 2);
			},
			// 聊天表情转换
			replace_em(str) {
				str = str.replace(/\[em-([\s\S]*)\]/g, "<span class='em em-$1' style='background-image:url(" + this
					.httpUrl + ")'></span>");
				return str;
			},
			clickImg(url){
				wx.previewImage({
					urls: [url],
					current: "",
					success: function(res){},
					fail: function(res){},
					complate: function(res){}
				})
			},
			sendMsg(msn, type) {
				let self = this;
				if (this.userId == 0) {
					this.height();
					this.socket.send({
						data: {
							msn,
							msn_type: type,
							// to_uid: this.toUid,
							mer_id: self.mer_id
						},
						type: "send_chat",
					})
				} else {
					this.height();
					this.socket.send({
						data: {
							msn,
							msn_type: type,
							// to_uid: this.toUid,
							uid: self.userId,
							mer_id: self.mer_id
						},
						type: "service_chat",
					})
				}
			},
			sendTest() {
				this.sendMsg(this.textCon, 1);
				this.textCon = ''
				this.height();
			},
			sendProduct() {
				if(this.presellId || this.combinationId){
					if(this.presellId){
						this.sendMsg(this.presellId, 7);
						this.presellId = 0;									
					}else if(this.combinationId){
						this.sendMsg(this.combinationId, 8);
						this.combinationId = 0;
					}
				}else{
					this.sendMsg(this.productId, 4);
					this.productId = 0;	
				}
				this.productInfo = {};
			},
			sendOrder() {
				this.sendMsg(this.orderId, 5);
				this.orderId = 0;
				this.orderInfo = {};
			},
			sendRefundOrder() {
				this.sendMsg(this.refund_order_id, 6);
				this.refund_order_id = 0;
				this.refundDetail = {};
			},
			bindInput: function(e) {
				if (e.detail.value) {
					this.sendColor = true
				} else {
					this.sendColor = false
				}
				this.height();
			},
			start() {
				var that = this;
				this.longClick = 0;
				this.timeOutEvent = setTimeout(function() {
					that.longClick = 1;
				}, 500);
				that.speak = "松开 结束";
				that.recording = true;
			},
			move() {
				clearTimeout(this.timeOutEvent);
				this.timeOutEvent = 0;
			},
			end() {
				clearTimeout(this.timeOutEvent);
				if (this.timeOutEvent !== 0 && this.longClick === 0) {
					//点击
					//此处为点击事件----在此处添加跳转详情页
				}
				this.speak = "按住 说话";
				this.recording = false;
				return false;
			},
			voiceBnt: function() {
				this.active = false;
				if (this.voice === true) {
					this.voice = false;
					this.$nextTick(function() {
						this.$refs.input.focus();
					});
				} else {
					this.voice = true;
				}
				this.percent = 0;
				this.footerConH = 0;
				this.footerH = 0;
				this.$nextTick(function() {
					this.height();
				});
			},
			emoticon: function() {
				this.voice = false;
				if (this.active === true) {
					this.active = false;
					this.isBQ = false
				} else {
					this.active = true;
					this.isBQ = true
				}
				this.height();
			},
			height() {
				let self = this
				var scrollTop = 0
				let info = uni.createSelectorQuery().select(".chat");
				setTimeout(res => {
					(!this.isBack) && info.boundingClientRect(function(data) { //data - 各种参数
						scrollTop = data.height
						if (self.active) {
							self.scrollTop = parseInt(scrollTop) + 500
						} else {
							self.scrollTop = parseInt(scrollTop) + 100
						}
					}).exec()
				}, 1000)
			},
			// 滚动到头部
			bindScroll() {
				if (this.userId == 0) {
					this.getHistory();
					this.getproductInfo();
					this.getOrderInfo();
					this.getRefundDetail();
					this.getStoreDetail();
				} else {
					this.getMerHistory();
				}
			},
			//#ifndef H5
			copyText:function(text){
			  uni.setClipboardData({ data: text});
			},
			// #endif
		}
	};
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
	}
	// @import url("@/plugin/emoji-awesome/css/google.min.css");
		@import "@/plugin/emoji-awesome/css/tuoluojiang.css";
	.noPad {
		padding: 0 !important;
		margin-bottom: 0 !important;
		height: auto !important;
	}
	.broadcast-details_num {
		width: 100%;
		height: 72rpx;
		line-height: 72rpx;
		color: #666666;
		font-size: 26rpx;
		display: flex;
		justify-content: space-between;
		background: #fff;
		border-bottom: 1px solid #F5F5F5;
		padding: 0 24rpx;
		border-radius: 10rpx 10rpx 0 0;
		.line1{
			max-width: 203rpx;
		}
	}
	uni-swiper-item{
		background: #fff;
	}
	.footer_count{
		margin-top: 20rpx;
		width: 710rpx;
		position: fixed;
		bottom: 120rpx;
		bottom: calc(120rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		bottom: calc(120rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		left: 20rpx;
		.broadcast-details_box,.broadcast_box{
			margin-bottom: 0;
			position: relative;
		}
		.icon-guanbi{
			font-size: 20rpx;
			color: #C4C4C4;
			position: absolute;
			right: 20rpx;
			top: 20rpx;
		}
	}
	.broadcast-details_order {
		// padding: 15rpx;
	}
	.copy {
		color: var(--view-theme);
		margin-left: 24rpx;
		font-size: 22rpx;
		opacity: .5;
	}
	.broadcast-details_box {
		padding: 20rpx;
		display: flex;
		background: #fff;
		border-radius: 0 0 10rpx 10rpx;
		margin-bottom: 24rpx;
	}

	.broadcast_details_model {
		width: 100%;
		height: 43rpx;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 0 0 16rpx 16rpx;
		position: absolute;
		z-index: 0;
		bottom: 0;
		font-size: 22rpx;
		color: #fff;
		text-align: center;
		line-height: 43rpx;
	}

	.broadcast_details_img {
		width: 160rpx;
		height: 160rpx;
		border-radius: 10px;
		overflow: hidden;
		position: relative;
	}
	.broadcast_details_img uni-image{
		width: 160rpx;
		height: 160rpx;
	}
	.broadcast_details_img_no {
		width: 456rpx;
		height: 456rpx;
		border-radius: 10px 10px 0px 0px;
		overflow: hidden;
		margin-bottom: 10rpx;
	}
	.broadcast_details_picBox_no {
		width: 100%;
	}
	.broadcast_details_img_no uni-image, .broadcast_details_img_no img{
		width: 100%;
		height: 100%;
	}
	.broadcast_details_tit {
		font-size: 30rpx;
		color: #282828;
		// height: 30rpx;
		max-width: 400rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		text-align: left !important;	
	}
	.product_price{
		margin-top: 66rpx;
	}
	.broadcast_details_tit_no {
		font-size: 28rpx;
		color: #333333;
		font-weight: 800;
		text-align: left;
		margin-top: 5rpx;
		max-width: 420rpx;
	}
	.broadcast_details_picBox {
		width: 75%;
		margin-left: 24rpx;
	}
	.broadcast_details_pic {
		margin-top: 15rpx;
		font-size: 24rpx;
		color: #999999;
		text-align: left;
	}
	.broadcast_details_pic_num {
		text-decoration: line-through;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.5);
		margin-left: 0.1rem;
	}
	.broadcast_details_btn {
		width: 130rpx;
		height: 50rpx;
		background: var(--view-theme);
		opacity: 1;
		border-radius: 125rpx;
		color: #fff;
		font-size: 24rpx;
		text-align: center;
		line-height: 50rpx;
		margin-top: 16px;
		float: right;
		&.product_btn{
			margin-top: 0;
			float: none;
		}
		&.refund_btn{
			width: 150rpx;
		}
	}
	.p-color {
		color: var(--view-priceColor);
	}
	.broadcast-details .chat {
		padding: 1rpx 23rpx 0 23rpx;
		margin-bottom: 3rpx;
		
	}
	.broadcast-details .chat .item {
		margin-top: 37rpx;
	}
	.broadcast-details .create_time {
		dislay: block;
		width: 100%;
		text-align: center;
		color: #999999;
		font-size: 22rpx;
		margin: 30rpx 0;
	}
	.broadcast-details .chat .item .pictrue {
		width: 80rpx;
		height: 80rpx;
		margin-top: 10rpx;
	}
	.broadcast-details .chat .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.broadcast-details .chat .item .text {
		margin-left: 20rpx;
	}
	.broadcast-details .chat .item .text.textR {
		text-align: right;
		margin: 0 20rpx 0 0;
		position: relative;
		.recall{
			position: absolute;
			width: 220rpx;
			height: 114rpx;
			border-radius: 6rpx;
			background: #4C4C4C;
			color: #fff;
			top: -140rpx;
			right: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 200;
			&.recall00{
				top: auto;
				bottom: -130rpx;
				&::after{
					border-top-color: transparent;
					border-bottom-color: rgba(0,0,0,.6);
					bottom: auto;
					top: -26rpx;
				}
			}
			&::after{
				content: "";
				display: block;
				border: 14rpx solid transparent;
				border-top-color: rgba(0,0,0,.6);
				position: absolute;
				bottom: -26rpx;
				right: 30rpx;
			}
			.recall-item{
				text-align: center;
				margin: 0 30rpx;
				font-size: 24rpx;
				.copy-data{
					color: #fff;
					margin-left: 0;
					opacity: 1;
				}
				.iconfont{
					display: block;
					font-size: 32rpx;
					margin-bottom: 8rpx;
				}
			}
		}
	}
	.broadcast-details .chat .item .text .name {
		font-size: 24rpx;
		color: #999;
	}
	.broadcast-details .chat .item .text .name .return {
		color: #509efb;
		margin-left: 17rpx;
	}
	.broadcast-details .chat .item .text.textR .name .return {
		margin: 0 0.17rem 0 0;
	}
	.broadcast-details .chat .item .text .conter {
		background-color: #fff;
		border-radius: 8rpx;
		padding: 16rpx 20rpx;
		font-size: 30rpx;
		color: #333;
		position: relative;
		max-width: 600rpx;
		margin-top: 2rpx;
		word-break: break-all;
		text-align: left;
		.em{
			margin: 0;
		}	
	}
	.recall-msg {
		display: block;
		width: 100%;
		text-align: center;
		color: #999;
		font-size: 24rpx;
		margin: 10rpx 0;
	}
	.broadcast-details .chat .item .text .spot {
		width: 15rpx;
		height: 15rpx;
		background-color: #c00000;
		border-radius: 50%;
		margin-left: 20rpx;
	}
	.broadcast-details .chat .item .text .conter:before {
		position: absolute;
		content: "";
		width: 0;
		height: 0;
		border-bottom: 9rpx solid transparent;
		border-right: 14rpx solid #fff;
		border-top: 9rpx solid transparent;
		left: -14rpx;
		top: 25rpx;
	}
	.broadcast-details .chat .item .text.textR .conter:before {
		left: unset;
		right: -14rpx;
		transform: rotateY(180deg);
	}
	.broadcast-details .chat .item .text .conter img {
		/* #ifdef H5 */
		width: 100%;
		/* #endif */
		display: block;
	}
	.broadcast-details .chat .item .text .conter .signal {
		width: 48rpx;
		height: 48rpx;
	}
	.broadcast-details .chat .item .text .conter .signal.signalR {
		transform: rotate(180deg);
		-ms-transform: rotate(180deg);
		-webkit-transform: rotate(180deg);
	}
	.broadcast-details .footerCon {
		height: 100rpx;
		width: 100%;
		transition: all 0.005s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		background-color: #fff;	
		position: fixed;
		bottom: 0;
		height: calc(100rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		height: calc(100rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		left: 0;
	}

	.broadcast-details .footerCon .banner {
		background: #fff;
		margin-top: calc(0rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		margin-top: calc(0rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
	}
	.broadcast-details .footerCon.on {
		position: relative;
		top: -300rpx;
		transform: translate3d(0, 0, 0) !important;
		.banner{
			margin-top: 0;
		}
	}
	.broadcast-details .footerCon .banner .swiper-slide {
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
		background-color: #fff;
		padding-bottom: 50rpx;
		border-top: 1px solid #f5f5f5;
	}
	.broadcast-details .footerCon .banner .swiper-slide .emoji-outer,
	.swiper-slide .em {
		display: block;
		width: 50rpx;
		height: 50rpx;
		margin: 40rpx 0 0 50rpx;
	}
	.broadcast-details .footerCon .banner .swiper-container-horizontal>.swiper-pagination-bullets {
		bottom: 10rpx;
	}
	.broadcast-details .footerCon .slider-banner .swiper-pagination-bullet-active {
		background-color: #999;
	}
	.broadcast-details .recording {
		width: 300rpx;
		height: 300rpx;
		position: fixed;
		top: 40%;
		left: 50%;
		margin-left: -150rpx;
	}
	.broadcast-details .recording img {
		width: 100%;
		height: 100%;
	}
	.broadcast-details .footer {
		width: 100%;
		background-color: #fff;
		padding: 17rpx 26rpx;
		align-items: center;

	}
	.footer_box{
		margin-top: 260rpx;
	}
	.broadcast-details .footer image {
		width: 61rpx;
		height: 60rpx;
		display: block;
	}
	.broadcast-details .footer .icon-biaoqing2,.broadcast-details .footer .icon-tupian2 {
		font-size: 60rpx;
		display: block;
	}
	.broadcast-details .footer .voice {
		width: 440rpx;
		border-radius: 10rpx;
		background-color: #e5e5e5;
		/* padding: 17rpx 30rpx; */
		height: 60rpx;
		padding-left: 20rpx;
	}
	.broadcast-details .footer .input_count{
		margin-left: 20rpx;
		width: 544rpx;
		border-radius: 38rpx;
		background-color: #F6F6F6;
		padding: 0 80rpx 0 30rpx;
		height: 76rpx;
		position: relative;
	}
	.broadcast-details .footer .placeholder{
		color: #999999;
		font-size: 26rpx;
	}
	.broadcast-details .footer .input{
		max-height: 150rpx;
		overflow-y: auto;
		overflow-x: hidden;
		color: #999999;
		height: 76rpx;
		font-size: 26rpx;
	}
	.broadcast-details .footer .send {
		font-size: 48rpx;
		color: #cccccc;
		position: absolute;
		right: 15rpx;
		top: 15rpx;
	}
	.em {
		display: inline-block;
		width: 50rpx;
		height: 50rpx;
		margin: 40rpx 0 0 50rpx;
	}
	.emoji-outer {
		position: absolute;
		right: 70rpx;
		/* bottom: 12rpx; */
		width: 50rpx;
		height: 50rpx;
		margin: 40rpx 0 0 50rpx;
	}
	.broadcast-details {
		display: flex;
		flex-direction: column;
		width: 100%;
		overflow: hidden;
		.hd-wrapper {
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			
			&.on {
				padding-bottom: 300rpx;
			}
		}
	}
	.store-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15rpx 20rpx;
		background-color: #fff;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		image {
			width: 60rpx;
			height: 60rpx;
			margin-right: 10rpx;
		}
		.left {
			display: flex;
			align-items: center;
		}
		.link {
			width: 80rpx;
			height: 40rpx;
			line-height: 38rpx;
			border: 1px solid var(--view-theme);
			border-radius: 20px;
			font-size: 24rpx;
			color: var(--view-theme);
			text-align: center;
		}
		.store-opeation{
			align-items: center;
			.icon-dadianhua01{
				color: var(--view-theme);
				margin-left: 28rpx;
				font-size: 34rpx;
			}
		}
	}
</style>
