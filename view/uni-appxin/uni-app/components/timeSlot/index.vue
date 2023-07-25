<template>
	<!-- 日期组件 -->
	<view>
		<view class="list">
			<view class="times">
				<view class="item" :class="time == 'all' ? 'on' : ''" @click="setTime('all')">全部</view>
				<view class="item" :class="time == 'today' ? 'on' : ''" @click="setTime('today')">今日</view>
				<view class="item" :class="time == 'yesterday' ? 'on' : ''" @click="setTime('yesterday')">昨日</view>
				<view class="item" :class="time == 'seven' ? 'on' : ''" @click="setTime('seven')">近7日</view>
			</view>
			<view class="item" :class="time == 'date' ? 'on' : ''" @click="dateTitle">自定义时间 <text
					class="iconfont icon-xiangxia aaa"></text></view>
		</view>
		<uni-calendar ref="calendar" :date="info.date" :insert="info.insert" :lunar="info.lunar"
			:startDate="info.startDate" :endDate="info.endDate" :range="info.range" @confirm="confirm"
			:showMonth="info.showMonth" />
		<view class="mask" @touchmove.prevent v-show="current === true" @click="close"></view>
		<Loading :loaded="loaded" :loading="loading"></Loading>
	</view>

</template>

<script>
	import Loading from '@/components/Loading/index.vue'
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	const year = new Date().getFullYear();
	const month = new Date().getMonth() + 1;
	const day = new Date().getDate();
	export default {
		components: {
			uniCalendar,
			Loading
		},
		data() {
			return {
				time:'all',
				current: false,
				loaded: false,
				loading: false,
				info: {
					startDate: '',
					endDate: '',
					lunar: false,
					range: true,
					insert: false,
					selected: [],
					showMonth: false
				},
				where: {
					start: "",
					stop: "",
				},
			}
		},
		methods: {
			close() {
				this.current = false;
			},
			// 日历确定
			confirm(e) {
				let self = this
				let star, stop;
				if ((e.range.after && e.range.before) || e.fulldate) {
					if(e.range.after && e.range.before){
						if (e.range.before > e.range.after) {
							star = new Date(e.range.after + ' 00:00:00').getTime() / 1000
							stop = new Date(e.range.before + ' 23:59:59').getTime() / 1000
						} else {
							star = new Date(e.range.before + ' 00:00:00').getTime() / 1000
							stop = new Date(e.range.after + ' 23:59:59').getTime() / 1000
						}
					}else{
						var year = new Date(e.fulldate).getFullYear(),
							month = new Date(e.fulldate).getMonth() + 1,
							day = new Date(e.fulldate).getDate();
						star = new Date(e.fulldate + ' 00:00:00').getTime() / 1000
						stop =new Date(Date.parse(year + "/" + month + "/" + day)).getTime() / 1000 +
							24 * 60 * 60 -
							1;
					}
					self.where.start = star
					self.where.stop = stop
					self.loaded = false;
					self.loading = false;
					this.$emit('changeTime', this.where)
				}
			},
			dateTitle() {
				this.$refs.calendar.open()
				this.time = 'date'
			},
			setTime(time) {
				let self = this
				this.time = time;
				var year = new Date().getFullYear(),
					month = new Date().getMonth() + 1,
					day = new Date().getDate();
				this.tip = 1
				this.loaded = false;
				this.loading = false;
				switch (time) {
					case "all":
						this.where.start = 0
						this.where.stop = 0
						this.title = "全部";
						this.$emit('changeTime', this.where)
						break;
					case "today":
						this.where.start =
							new Date(Date.parse(year + "/" + month + "/" + day)).getTime() /
							1000;
						this.where.stop =
							new Date(Date.parse(year + "/" + month + "/" + day)).getTime() /
							1000 +
							24 * 60 * 60 -
							1;
						this.title = "今日";
						this.$emit('changeTime', this.where)
						break;
					case "yesterday":
						this.where.start =
							new Date(Date.parse(year + "/" + month + "/" + day)).getTime() /
							1000 -
							24 * 60 * 60;
						this.where.stop =
							new Date(Date.parse(year + "/" + month + "/" + day)).getTime() /
							1000 -
							1;
						this.title = "昨日";
						this.$emit('changeTime', this.where)
						break;
					case "month":
						this.where.start =
							new Date(year, new Date().getMonth(), 1).getTime() / 1000;
						this.where.stop = new Date(year, month, 1).getTime() / 1000 - 1;
						this.title = "本月";
						this.$emit('changeTime', this.where)
						break;
					case "seven":
						this.where.start =
							new Date(Date.parse(year + "/" + month + "/" + day)).getTime() /
							1000 +
							24 * 60 * 60 -
							7 * 3600 * 24;
						this.where.stop =
							new Date(Date.parse(year + "/" + month + "/" + day)).getTime() /
							1000 +
							24 * 60 * 60 -
							1;
						this.title = "七日";
						this.$emit('changeTime', this.where)
						break;
						// #ifdef MP
					case "date":
						let star = new Date(self.before).getTime() / 1000
						let stop = new Date(self.after).getTime() / 1000
						self.where.start = star
						self.where.stop = stop
						// Promise.all([self.getList()]);
						this.$emit('changeTime', this.where)
						break;
						// #endif
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		display: flex;
		justify-content: space-between;
		padding: 24rpx 30rpx;
		background-color: #fff;
		color: #666666;
		font-size: 26rpx;
		.times {
			display: flex;
			.item {
				margin-right: 20rpx;
				background: #F5F5F5;
				padding: 10rpx 20rpx;
				border-radius: 30rpx;
			}
			.item.on {
				color: var(--view-theme);
				background-color: var(--view-minorColor);
			}
		}
		.item{
			padding: 10rpx 0rpx;
		}
	}
	.aaa {
		padding-left: 10rpx;
		font-size: 20rpx !important;
	}
</style>
