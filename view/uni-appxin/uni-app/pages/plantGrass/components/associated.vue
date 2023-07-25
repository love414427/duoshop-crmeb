<template>
	<view class="containers" :style="viewColor">
		<view class="header">
			<view class="title">
				<text :class="isActive == 0 ? 'on' : ''" @click="tabs(0)">已购</text>
				<text :class="isActive == 1 ? 'on' : ''" @click="tabs(1)">收藏</text>
				<text :class="isActive == 2 ? 'on' : ''" @click="tabs(2)">浏览</text>
			</view>
			<view class="search">
				<text class="iconfont icon-xiazai5"></text>
				<input type="text" placeholder="请输入商品名称" v-model="searchVal" @input="setValue" confirm-type="search" @confirm="searchBut()" placeholder-class='placeholder'>
			</view>
			<view class="sub_title">{{isActive == 0 ? '已购宝贝' : isActive == 1 ?'收藏宝贝' : '浏览记录'}}</view>
			<text class="iconfont icon-guanbi5" @click="close"></text>
		</view>
		<view class="main">
			<scroll-view scroll-y="true">
				<block v-if="isActive == 0">
					<view v-if="bought.length" @touchmove="onTouchmove" id="goods">
						<view class="picTxt acea-row" v-for="(item, index) in bought" :key="index">
							<view class="checkbox">
								<text v-if="item.check" @click.stop="goodsCheck(item,index)" class="iconfont icon-xuanzhong1"></text>		
								<text v-else @click.stop="goodsCheck(item,index)" :class="{'disabled':disabled}" class="iconfont icon-weixuanzhong"></text>
							</view>
							<view class='pictrue'>
								<image :src='item.image'></image>
							</view>
							<view class='text'>
								<view class='line2 name'>{{item.store_name}}</view>	
								<view class='money'>￥<text>{{item.price}}</text></view>
							</view>					
						</view>
					</view>
					<view v-else class="empty">
						<image src="/static/images/no_thing.png"></image>
						<text>暂无内容哦~</text>
					</view>
				</block>
				<block v-if="isActive == 1">
					<view v-if="collect.length" id="collect" @touchmove="onTouchmove1">
						<view class="picTxt acea-row" v-for="(item, index) in collect" :key="index">			
							<view class="checkbox">							
								<text v-if="item.check" @click.stop="goodsCheck(item,index)" class="iconfont icon-xuanzhong1"></text>		
								<text v-else @click.stop="goodsCheck(item,index)" :class="{'disabled':disabled}" class="iconfont icon-weixuanzhong"></text>	
							</view>
							<view class='pictrue'>
								<image :src='item.image'></image>
							</view>
							<view class='text'>
								<view class='line2 name'>{{item.store_name}}</view>	
								<view class='money'>￥<text>{{item.price}}</text></view>
							</view>					
						</view>
					</view>
					<view v-else class="empty">
						<image src="/static/images/no_thing.png"></image>
						<text>暂无内容哦~</text>
					</view>
				</block>
				<block v-if="isActive == 2">
					<view v-if="browse.length" id="browse" @touchmove="onTouchmove2">
						<view class="picTxt acea-row" v-for="(item, index) in browse" :key="index">			
							<view class="checkbox">							
								<text v-if="item.check" @click.stop="goodsCheck(item,index)" class="iconfont icon-xuanzhong1"></text>		
								<text v-else @click.stop="goodsCheck(item,index)" :class="{'disabled':disabled}" class="iconfont icon-weixuanzhong"></text>
							</view>
							<view class='pictrue'>
								<image :src='item.image'></image>
							</view>
							<view class='text'>
								<view class='line2 name'>{{item.store_name}}</view>	
								<view class='money'>￥<text>{{item.price}}</text></view>
							</view>					
						</view>
					</view>
					<view v-else class="empty">
						<image src="/static/images/no_thing.png"></image>
						<text>暂无内容哦~</text>
					</view>
				</block>
			</scroll-view>
			<view class="foot_bar">
				<button class="confirm_btn" @click="submit">确定({{checkedArr.length}})</button>
			</view>
		</view>	
	</view>
</template>

<script>
	import Loading from '@/components/Loading/index.vue';
	import { boughtLstApi, collectLstApi, browseLstApi } from "@/api/community";
	import { mapGetters } from "vuex";
	export default {
		props:{
			checkedObj: {
				type: Array,
				default: []
			}
		},
		computed: mapGetters(['viewColor']),
		components: { Loading },
		data() {
			return {
				isActive: 0,
				loadedb: false,
				loadingb: false,
				loadedc: false,
				loadingc: false,
				loadeds: false,
				loadings: false,
				whereb:{
					page: 1,
					limit: 10,
					keyword: '',
				},
				wherec:{
					page: 1,
					limit: 10,
					keyword: '',
				},
				wheres:{
					page: 1,
					limit: 10,
					keyword: '',
				},
				searchVal: "",
				checked: [],
				list: [],
				collect: [],
				bought: [],
				browse: [],
				checkedArr: this.checkedObj,
				disabled: false
			};
		},
		watch: {
			checkedObj:{
				handler(n){
					this.checkedArr = n
				},
				deep: true
			}
		},
		mounted(){
			this.checkedArr = this.checkedObj
			this.getBounht();
			this.getCollect();
			this.getBrowse();
		},
		methods: {	
			// 点击关闭按钮
			close() {
				this.$emit('close');
			},
			tabs(index){
				this.isActive = index
				this.$set(this.whereb, 'keyword', '');
				this.$set(this.wherec, 'keyword', '');
				this.$set(this.wheres, 'keyword', '');
				this.searchVal = ''
				this.searchBut()
			},
			onTouchmove(e){
				if (this.loadendb) return;
				if (this.loadingb) return;
				const query = uni.createSelectorQuery().in(this);
				query.select('#goods').boundingClientRect(data => {
					if(data.bottom < 1500 && data.top < 0) {
						this.getBounht();	
					}
				}).exec();
				// 模拟触底刷新
			},
			onTouchmove1(e){
				if (this.loadendc) return;
				if (this.loadingc) return;
				const query = uni.createSelectorQuery().in(this);
				query.select('#collect').boundingClientRect(data => {
					if(data.bottom < 1500 && data.top < 0) {
						this.getCollect();	
					}
				}).exec();
				// 模拟触底刷新
			},
			onTouchmove2(e){
				if (this.loadends) return;
				if (this.loadings) return;
				const query = uni.createSelectorQuery().in(this);
				query.select('#browse').boundingClientRect(data => {
					if(data.bottom < 1500 && data.top < 0) {
						this.getBrowse();	
					}
				}).exec();
				// 模拟触底刷新
			},
			setValue: function(event) {
				this.$set(this.whereb, 'keyword', event.detail.value);
				this.$set(this.wherec, 'keyword', event.detail.value);
				this.$set(this.wheres, 'keyword', event.detail.value);
			},
			searchBut(){
				this.loadingb=this.loadingc=this.loadings=this.loadedb=this.loadedc=this.loadeds = false
				this.whereb.page = this.wherec.page = this.wheres.page = 1
				this.bought = this.collect = this.browse = []
				this.isActive == 0 ? this.getBounht() : this.isActive == 1 ? this.getCollect() : this.getBrowse()
			},
			getBounht(){
				var that = this;
				if(that.loadingb || that.loadedb) return;
				that.loadingb = true;
				boughtLstApi(that.whereb).then(
				  res => {
				    that.loadingb = false;
				    that.loadedb = res.data.list.length < that.whereb.limit;
				    that.bought.push.apply(that.bought, res.data.list);
				    that.whereb.page = that.whereb.page + 1;
					that.getInitchecked(that.bought);
				  },
				  error => {
				    that.$util.Tips({
				      title: error.msg
				    })
				  }
				);
			},
			getCollect(){
				var that = this;
				if(that.loadingc || that.loadedc) return;
				that.loadingc = true;
				collectLstApi(that.wherec).then(
				  res => {
				    that.loadingc = false;
				    that.loadedc = res.data.list.length < that.wherec.limit;
				    that.collect.push.apply(that.collect, res.data.list);
				    that.wherec.page = that.wherec.page + 1;
					that.getInitchecked(that.collect);
				  },
				  error => {
				    that.$util.Tips({
				      title: error.msg
				    })
				  }
				);
			},
			getBrowse(){
				var that = this;
				if(that.loadings || that.loadeds) return;
				that.loadings = true;
				browseLstApi(that.wheres).then(
				  res => {
				    that.loadings = false;
				    that.loadeds = res.data.list.length < that.wheres.limit;
				    that.browse.push.apply(that.browse, res.data.list);
				    that.wheres.page = that.wheres.page + 1;
						that.getInitchecked(that.browse);
				  },
				  error => {
				    that.$util.Tips({
				      title: error.msg
				    })
				  }
				);
			},
			/*获取初始化选中的数据*/
			getInitchecked(arr){
				let that = this;
				arr.forEach((item, index) => {
					that.$set(item, 'check', false);
					that.checkedArr.forEach((val, i) =>{
						if((item.spu_id == (val.spu&&val.spu.spu_id)) || (item.spu_id == val.spu_id)){
							that.$set(item, 'check', true);
						}	
					})
				})
			},
			/*点击选中与否*/
			goodsCheck(item,index){
				if(this.checkedArr.length > 4 && !item.check){
					return ;
				}
				this.$set(item, 'check', !item.check);
				if(item.check){
					this.checkedArr.push(item)
				}else{
					this.checkedArr.splice(this.checkedArr.findIndex(itemn => ((itemn.spu_id == item.spu_id) || (item.spu_id == (itemn.spu&&itemn.spu.spu_id)))), 1)	
				}
				this.disabled = this.checkedArr.length > 4
			},		
			/*确定提交*/
			submit(){	
				this.$emit('getProduct',this.checkedArr);
			},
		}
	}
</script>

<style lang="scss" scoped>
.containers{
	background: #ffffff;
	border-radius: 16rpx 16rpx 0 0;
	padding: 40rpx 0;
	position: relative;
	.header{
		position: relative;
		padding: 0 30rpx;
		.title{
			width: 100%;
			text-align: center;
			text{
				position: relative;
				margin: 0 50rpx;
				color: #999999;
				font-size: 30rpx;
				&.on{
					color: #333333;
					font-weight: bold;
					font-size: 34rpx;
					&::after{
						content: "";
						display: inline-block;
						width: 40rpx;
						height: 5rpx;
						background: var(--view-theme);
						position: absolute;
						bottom: -10rpx;
						left: 10rpx;
					}
				}
			}	
		}
		.search{
			margin-top: 44rpx;
			background: #F5F5F5;
			border-radius: 30rpx;
			padding: 12rpx 30rpx 12rpx 66rpx;
			position: relative;
			.iconfont{
				font-size: 24rpx;
				color: #939393;
				position: absolute;
				top: 20rpx;
				left: 30rpx;
			}
			.placeholder{
				color: #999999;
				font-size: 26rpx;
			}
		}
		.sub_title{
			color: #282828;
			font-size: 26rpx;
			margin-top: 30rpx;
		}
		.iconfont{
			color: #8A8A8A;
			font-size: 28rpx;
			position: absolute;
			top: 0;
			right: 30rpx;
		}
	}
	scroll-view{
		height: 650rpx;
	}
	.main{
		height: 650rpx;
		margin: 40rpx 0 80rpx;
		padding: 0 30rpx;
	}
}
.picTxt {
	width: 100%;
	padding: 25rpx 0;
	position: relative;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 10rpx;
	.checkbox {
		margin-right: 30rpx;
		.iconfont {
			font-size: 38rpx;
			color: #CCCCCC;
		}
		.icon-xuanzhong1 {
			color: var(--view-theme);
		}
		.disabled{
			pointer-events: none;
			cursor: default;
			opacity: 0.3;
		}
	}
	.pictrue {
		width: 160rpx;
		height: 160rpx;
		image {
			width: 100%;
			height: 100%;
			border-radius: 8rpx;
		}
	}
	.text {
		width: 430rpx;
		margin-left: 30rpx;
		font-size: 28rpx;
		color: #282828;
		position: relative;	
		height: 160rpx;
		.name{
			color: #282828;
			font-size: 28rpx;
		}
		.money{
			position: absolute;
			bottom: 0;
			left: 0;
			color: var(--view-priceColor);
			font-size: 22rpx;
			font-weight: bold;
			text{
				font-size: 26rpx;
			}
		}
	}
}
.foot_bar{
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	background: #ffffff;
	padding: 20rpx 0;
	z-index: 5;
	.confirm_btn{
		width: 710rpx;
		height: 86rpx;
		line-height: 86rpx;
		color: #ffffff;
		text-align: center;
		font-size: 32rpx;
		background: var(--view-theme);
		border-radius: 43rpx;
		margin: 0 auto;
	}
}
.empty{
	margin: 130rpx 0 150rpx;
	text-align: center;
	image,uni-image{
		display: inline-block;
		width: 414rpx;
		height: 305rpx;
	}
	text{
		display: block;
		color: #999999;
		font-size: 26rpx;
	}
}
</style>
