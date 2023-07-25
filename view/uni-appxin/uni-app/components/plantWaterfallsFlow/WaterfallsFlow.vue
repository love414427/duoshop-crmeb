<template>
    <view class="wf-page">
        <!--left-->
        <view>
            <view id="left" v-if="leftList.length">
                <view v-for="(item,index) in leftList" :key="index"
                      class="wf-item" @tap="itemTap(item)">
                    <WaterfallsFlowItem :item="item" :isAuth="isAuth" :uid="uid" :isShow="isShow" :tab="tab" @likeToggle="(item)=>likeToggle(false, index, item)"/>
                </view>
            </view>
        </view>
        <!--right-->
        <view>
            <view id="right" v-if="rightList.length">
                <view v-for="(item,index) in rightList" :key="index"
                      class="wf-item" @tap="itemTap(item)">
                    <WaterfallsFlowItem :item="item" :isAuth="isAuth" :uid="uid" :isShow="isShow" :tab="tab" @likeToggle="(item)=>likeToggle(true, index, item)"/>
                </view>
            </view>
        </view>
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
    </view>
</template>

<script>
import WaterfallsFlowItem from '../plantWaterfallsFlowItem/WaterfallsFlowItem.vue'
import { graphicStartApi } from '@/api/community.js';
import authorize from '@/components/Authorize';
import { mapGetters } from "vuex";
export default {
    components: {
        WaterfallsFlowItem,
		authorize,
    },
    props: {
        // 瀑布流列表
        wfList: {
					type: Array,
					require: true
        },
        updateNum: {
					type: Number,
					default: 10
        },
				isAuth: {
					type: Number || String,
					default: 0
				},
				tab: {
					type: Number,
					default: 1
				},
				uid: {
					type: Number,
					default: 0
				},
				isShow: {
					type: Boolean,
					default: false
				},
    },
    data() {
        return {
            allList: [],       // 全部列表
            leftList: [],      // 左边列表
            rightList: [],     // 右边列表
            mark: 0,           // 列表标记
            boxHeight: [],     // 下标0和1分别为左列和右列高度
			isShowAuth: false,
			isAuto: false
        };
    },
    watch: {
        // 监听列表数据变化
        'wfList.length':  {
			handler(nVal,oVal){
				// 如果数据为空或新的列表数据少于旧的列表数据（通常为下拉刷新或切换排序或使用筛选器），初始化变量
				if (!this.wfList.length ||
				    (this.wfList.length === this.updateNum && this.wfList.length <= this.allList.length)) {
				    this.allList = [];
				    this.leftList = [];
				    this.rightList = [];
				    this.boxHeight = [];
				    this.mark = 0;
				}
				// 如果列表有值，调用waterfall方法
				if (this.wfList.length) {
				    this.allList = this.wfList;
					this.leftList = [];
					this.rightList = [];
					this.boxHeight = [];
					this.allList.forEach((v, i) => {
						if(this.allList.length < 3 || (this.allList.length <= 7  && this.allList.length - i > 1) || (this.allList.length > 7 && this.allList.length - i > 2)) {
							if(i % 2){
								this.rightList.push(v);
							}else{
								this.leftList.push(v);
							}
						}
					});
					if(this.allList.length < 3){
						this.mark = this.allList.length+1;
					}else if(this.allList.length <= 7){
						this.mark = this.allList.length - 1;
					}else{
						this.mark = this.allList.length - 2;
					}
					if(this.mark < this.allList.length){
						this.waterFall()
					}
				}
			},
			immediate: true,
			deep:true
        },
		mounted(){
		},
        // 监听标记，当标记发生变化，则执行下一个item排序
        mark() {
            const len = this.allList.length;
            if (this.mark < len && this.mark !== 0 && this.boxHeight.length) {
                this.waterFall();
            }
        }
    },
	computed: {
		...mapGetters(['isLogin']),
	},
    methods: {
        // 瀑布流排序
        waterFall() {
            const i = this.mark;
			if(!this.allList[i]) return ;
            if (i == 0) {
                // 初始化，从左边开始插入
                this.leftList.push(this.allList[i]);
                // 更新左边列表高度
                this.getViewHeight(0);
            } else if (i == 1) {
                // 第二个item插入，默认为右边插入
                this.rightList.push(this.allList[i]);
                // 更新右边列表高度
                this.getViewHeight(1);
            } else {
                // 根据左右列表高度判断下一个item应该插入哪边
				if(!this.boxHeight.length){
					this.rightList.length < this.leftList.length
					? this.rightList.push(this.allList[i])
					: this.leftList.push(this.allList[i]);
				} else {
					const leftOrRight = this.boxHeight[0] > this.boxHeight[1] ? 1 : 0;
					if (leftOrRight) {
					    this.rightList.push(this.allList[i])
					} else {
					    this.leftList.push(this.allList[i])
					}
				}
				// 更新插入列表高度
				this.getViewHeight();
            }
        },
        // 获取列表高度
        getViewHeight() {
            // 使用nextTick，确保页面更新结束后，再请求高度
            this.$nextTick(() => {
            	setTimeout(()=>{
            		uni.createSelectorQuery().in(this).select('#right').boundingClientRect(res => {
            				res ? this.boxHeight[1] = res.height : '';
            			uni.createSelectorQuery().in(this).select('#left').boundingClientRect(res => {
            				res ? this.boxHeight[0] = res.height : '';
            				this.mark = this.mark + 1;
            			}).exec();
            		}).exec();
            	},100)
            })
        },
        // item点击
        itemTap(item) {
            this.$emit('itemTap', item)
        },
		giveStart(item){
			let status = item.relevance_id ? 0 : 1
			graphicStartApi(item.community_id,{status: status}).then(res => {
				if(item.relevance_id){
					item.relevance_id = !item.relevance_id;
					item.count_start--;
					item.count_start = item.count_start == 0 ? 0 : item.count_start
				}else{
					item.relevance_id = !item.relevance_id;
					item.count_start++;
				}
			}).catch(err => {
				uni.showToast({
					title: err,
					icon: 'none'
				})
			});
		},
		// 授权回调
		onLoadFun() {
			this.isShowAuth = false
		},
		// 授权关闭
		authColse: function(e) {
			this.isShowAuth = e
		},
		// 打开授权
		authOpen: function() {
			let that = this;
			if (that.isLogin === false) {
				this.isAuto = true;
				this.isShowAuth = true
			}
		},
		likeToggle(type, index){
			if(this.isLogin == true){
				if(type){
					this.giveStart(this.rightList[index])
				}else{
					this.giveStart(this.leftList[index])
				}
			}else{
				this.authOpen();
			}
		},
    }
}
</script>

<style lang="scss" scoped>
$page-padding: 20rpx;
$grid-gap: 20rpx;

.wf-page {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: $grid-gap;
}
.wf-item {
    width: calc((100vw - 2 * #{$page-padding} - #{$grid-gap}) / 2);
    margin-bottom: $grid-gap;
	background: #fff;
	border-radius: 16rpx;
}
.wf-item-page{
	padding-bottom: 20rpx;
}
</style>
