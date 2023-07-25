<template>
	<view class="container">
		<view class="input_content">
			<view class="input_content_textarea">
				<textarea v-model="formData.cate_name" placeholder="请输入分类" placeholder-class="placeholderStyle" maxlength="12"/>
				<view><text v-if="formData.cate_name">{{formData.cate_name.length}}</text><text v-else>0</text>/12</view>
			
			</view>
			
			<view class="input_content_photo">
				<view v-if="formData.pic" class="input_content_photo_adPh">
					<image class="photos" :src="formData.pic"></image>
					<view class="input_content_photo_adPh_jiao" @click="deleteImage"><image src="../static/images/close.png" mode=""></image></view>
				</view>
				<view v-else class="input_content_photo_adPh" @click="handleChooseImage">
					<view><image src="../static/images/creamer.png" mode="widthFix"></image></view>
					<view>添加图片</view>
				</view>
			</view>
		</view>
		<view class="list_content">
			<view class="list_item">
				<text class="list_item_title">上级分类</text>
				<picker @change="bindPickerChange" :range="classifyArr" range-key="cate_name">									
					<input placeholder="请选择上级分类" type="text" disabled readonly v-model="parentClassify">
					<view class='iconfont icon-jiantou'></view>
				</picker>						
			</view>
			<view class="list_item">
				<view class="list_item_title">是否显示</view>
				<view class="input_class">
					<view class="input_class_con">
						<switch :checked="is_show" @change="is_show = !is_show" color="#E93323" style="transform:scale(0.8)" />
					</view>
				</view>
			</view>
		</view>
		<view class="handle">
			<view class="handle_button" @click="submit">
				确定
			</view>
		</view>
		
	</view>
</template>

<script>
import { storeClassifyLst, merClassifyAdd, merClassifyDetail, merClassifyUpdate } from "@/api/product";
export default {
	components: {
		
	},
	data() {
		return {
			parentClassify: '',
			formData: {
				cate_name: '',
				pic: '',
				pid: '',
				is_show: 1,
				sort: 0
			},
			is_show: true,
			index: 0,
			mer_id: '',
			pid: '',
			classifyArr: [],
			
		}
	},
	onLoad(options) {
		this.mer_id = options.mer_id
		this.pid = options.pid
		this.getCateList()
		if(this.pid && this.mer_id) this.getCateDetail()
		
	},
	onShow() {
	
	},
	onReady() {
		
	},
	methods: {
		bindPickerChange: function(e) {
			let idx = e.target.value
			this.formData.pid = this.classifyArr[idx]['store_category_id']
			this.parentClassify = this.classifyArr[idx]['cate_name']
		},
		getCateList(){
			storeClassifyLst(this.mer_id)
				.then(res => {
					this.classifyArr = res.data
					this.classifyArr.unshift({cate_name: '顶级分类', store_category_id: 0, children: []})
					if(!this.pid){this.pid = 0;this.parentClassify = this.getStorCateName(0, this.classifyArr)}
				})
				.catch(res => {
					this.$util.Tips({
						title: res
					});
				});
		},
		//获取分类详情
		getCateDetail(){
			let that = this
			uni.showLoading({
				title: '加载中'
			});
			merClassifyDetail(that.mer_id,that.pid)
				.then(res => {
					uni.hideLoading();
					let data = res.data
					that.formData = data
					that.is_show = data.is_show == 1;
					that.parentClassify = that.getStorCateName(data.pid, that.classifyArr)
				})
				.catch(res => {
					that.$util.Tips({
						title: res
					});
				});
		},
		//获取店铺分类名称
		getStorCateName(id, arr) {
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].store_category_id === id) {
					return arr[i]['cate_name']
				}
			}
		},
		handleChooseImage() {
			let that = this;
			that.$util.uploadImageOne('upload/image', function (res) {
			  that.$set(that.formData,'pic',res.data.path);
			});
		},
		// 删除图片
		deleteImage(index) {		
			this.formData.pic ="";
		},
		submit(){
			let that = this;	
			that.formData.is_show = that.is_show ? 1 : 0
			that.formData.pid = that.formData.pid ? that.formData.pid : 0
			let value = that.formData
			if (!value.cate_name) return that.$util.Tips({
				title: '请输入分类名称'
			});
			that.pid ? merClassifyUpdate(that.mer_id,that.pid,that.formData).then(data => {
				if (data.status == 200) {
					that.$util.Tips({
						title: data.message
					});
					setTimeout(()=>{
						uni.redirectTo({
							url: "/pages/product/storeClassification/index?mer_id="+that.mer_id
						})
					},1000)				
				}
			}).catch(res => {
				that.$util.Tips({
					title: res
				});
			}) :
			merClassifyAdd(that.mer_id,that.formData).then(data => {
				if (data.status == 200) {
					that.$util.Tips({
						title: data.message
					});
					setTimeout(()=>{
						uni.redirectTo({
							url: "/pages/product/storeClassification/index?mer_id="+that.mer_id
						})
					},1000)
					
				}
			
			}).catch(res => {
				that.$util.Tips({
					title: res
				});
			})
			
		}
	}
};
</script>

<style lang="scss" scoped>
@import './scss/addStoreClass.scss';
.uni-input-placeholder {
	color: #BBBBBB;
}
</style>
