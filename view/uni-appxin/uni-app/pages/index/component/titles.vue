<template>
	<view v-if="titleConfig">
		<navigator :url="path(linkConfig)" hover-class="none" class='title' :class="[(textPosition==0?'left':textPosition==2?'right':''),(textStyle==1?'italics':textStyle==2?'blod':'')]" :style="'font-size:'+fontSize+'rpx;margin:'+mbConfig+'rpx '+prConfig+'rpx 0;background-color:'+titleColor+';border-radius:'+bgStyle+'rpx;'">
			<view :style="'color:'+textColor">{{titleConfig}}</view>
		</navigator>
	</view>
</template>

<script>
	import {merPath} from "@/utils/index"	
	export default {
		name: 'titles',
		props: {
			dataConfig: {
				type: Object,
				default: () => {}
			},
			merId: {
				type: String || Number,
				default: ''
			}
		},
		data() {
			return {
				fontSize:this.dataConfig.fontSize.val*2,
				linkConfig:this.dataConfig.linkConfig.value,
				mbConfig:this.dataConfig.mbConfig.val*2,
				prConfig:this.dataConfig.prConfig.val*2,
				textPosition:this.dataConfig.textPosition.type,
				textStyle:this.dataConfig.textStyle.type,
				titleColor:this.dataConfig.titleColor.color[0].item,
				titleConfig:this.dataConfig.titleConfig.value,
				textColor:this.dataConfig.themeColor.color[0].item,
				bgStyle:this.dataConfig.bgStyle.type ? '16' : '0'
			};
		},
		created() {},
		methods:{
			path(url){
				return merPath(url, this.merId)
			}
		}
	}
</script>

<style scoped lang="scss">
	.title{
		font-size: 40rpx;
		color: #282828;
		text-align: center;	
		&.left{
			text-align: left;
		}
		&.right{
			text-align: right;
		}
		&.blod{
			font-weight: bold;
		}
		&.italics{
			font-style: italic;
		}
	}
	
</style>
