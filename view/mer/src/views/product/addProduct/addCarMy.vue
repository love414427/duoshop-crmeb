<template>
	<el-dialog
     :visible.sync="carMyShow"
		  title="添加卡密"
		  width="600px"
		>
    <div class="carMywrapper">
		<div class="type-radio">
		  <el-form label-width="80px">
		    <el-form-item label="卡密类型：">
		      <el-radio-group v-model="fixedCar.is_type" size="large">
		        <el-radio :label="0">固定卡密</el-radio>
		        <!-- <el-radio :label="1">一次性卡密</el-radio> -->
		      </el-radio-group>
		      <div v-if="fixedCar.is_type == 0">
				  <div class="stock-disk">
					  <el-input
					    v-model="fixedCar.key"
					    size="small"
					    type="textarea"
					    :rows="4"
					    placeholder="填写卡密信息"
					  />
				  </div>
				  <div class="stock-input">
					  <!-- <el-input
					    type="number"
							size="small"
					    v-model="fixedCar.stock"
							:min="1"
					    placeholder="填写库存数量"
					  > -->
						<el-input-number v-model="fixedCar.stock" :min="1" label="填写库存数量"  /> 件 
					  <!-- </el-input> -->
				  </div>
		      </div>
		      <div class="scroll-virtual" v-if="fixedCar.is_type == 1">
		        <div
		          class="acea-row row-middle mb10"
		          v-for="(item, index) in virtualList"
		          :key="index"
		        >
		          <span class="mr10 virtual-title">卡号{{ index + 1 }}：</span>
		          <el-input
		            class="mr10 width15"
		            type="text"
								size="small"
		            v-model.trim="item.key"
		            placeholder="请输入卡号(非必填)"
		          ></el-input>
		          <span class="mr10 virtual-title">卡密{{ index + 1 }}：</span>
		          <el-input
		            class="mr10 width15"
		            type="text"
		            v-model.trim="item.pwd"
		            placeholder="请输入卡密"
								size="small"
		          ></el-input>
		          <span class="deteal-btn" @click="removeVirtual(index)"
		            >删除</span
		          >
		        </div>
		      </div>
		      <div v-if="fixedCar.is_type == 1" class="add-more">
		        <el-button type="primary" size="mini" @click="handleAdd">添加卡密</el-button>
		        <el-upload
				  		ref="upload"
		          class="ml10"
							style="display: inline-block;"
		          :action="cardUrl"
		          :before-upload="beforeUpload"
		          :headers="header"
		          :on-success="upFile"
							:format="['xlsx']"
							:on-format-error="handleFormatError"
		        >
		          <!-- <el-button type="success" size="mini">导入卡密</el-button> -->
		        </el-upload>
						<!-- <el-button class="download" type="default" size="small" @click="getCarMyList">下载卡密模板</el-button> -->
		    	</div>
		    </el-form-item>
		  </el-form>
		</div>
		<div class="footer">
			<el-button type="primary" class="btns" size="small" @click="cancel">取消</el-button>
			<el-button type="primary" class="btns" size="small" @click="subBtn">确定</el-button>
		</div>
  </div>
	</el-dialog>
</template>
<script>
	import SettingMer from "@/libs/settingMer";
	// import util from "@/libs/util";
	import { getToken } from "@/utils/auth";
	import exportExcel from "@/utils/newToExcel.js";
	import {
	  importCard,
	  exportProductCard
	} from "@/api/product";
    export default {
			name: "addCarMy",
			props:{
				virtualList: {
					type: Array,
					default: function () {
						return [];
					}
				}
      },
			data(){
				return {
					carMyShow: false,
					fixedCar:{
						is_type: 0,
						key:'',
						stock:0
					},
					cardUrl: SettingMer.https + "/file/upload/1",
					header: {} //请求头部信息
				}
			},
			computed: {
				// cardUrl() {
				// 	return (
				// 		SettingMer.https +
				// 		`/upload/image/file`
				// 	);
				// }
			},
			created() {
				// this.getToken();
			},
			mounted() {
			},
      methods:{
				// 下载卡密
				async getCarMyList() {
					let [th, filekey, data, fileName] = [[], [], [], ""];
					let lebData = await this.getExcelData();
					if (!fileName) fileName = lebData.filename;
					if (!filekey.length) {
						filekey = lebData.filekey;
					}
					if (!th.length) th = lebData.header;
					data = lebData.export;
					exportExcel(th, filekey, fileName, data);
				},
				getExcelData() {
					return new Promise((resolve, reject) => {
						exportProductCard().then((res) => {
							return resolve(res.data);
						});
					});
				},
				removeVirtual(index) {
					this.virtualList.splice(index, 1);
				},
				upFile(res) {
					importCard({ file: res.data.src }).then((res) => {
					this.$emit('changeVirtual',JSON.parse(JSON.stringify(res.data))) 
					//this.$refs.upload.clearFiles();	
					}).catch(err=>{
						return this.$Message.error(err.msg);
					})
				},
				handleFormatError(file){
					return this.$Message.error('必须上传xlsx格式文件');
				},
				// 上传头部token
				getToken() {
					this.header["Authori-zation"] = "Bearer " + getToken();
				},
				cancel(){
					this.$emit('closeCarMy')
				},
				handleAdd() {
					this.virtualList.push({
						key: "",
						pwd: "",
					});
				},
				beforeUpload() {
					let promise = new Promise((resolve) => {
						this.$nextTick(function () {
							resolve(true);
						});
					});
					return promise;
				},
				subBtn(){
					if(this.fixedCar.is_type==0){
						if(this.fixedCar.key == ''){
							return this.$message.error("请填写卡密信息");
						}
						if(!this.fixedCar.stock){
							return this.$message.error("请填写库存数量");
						}
						this.$emit('fixdBtn',JSON.parse(JSON.stringify(this.fixedCar)))
					}else{
						let data = {
							is_type:1,
							list:this.virtualList
						}
						for (let i = 0; i < this.virtualList.length; i++) {
							const element = this.virtualList[i];
							if (!element.pwd) {
								return this.$message.error("请输入所有卡密");
							}
						}
						this.$emit('fixdBtn',JSON.parse(JSON.stringify(data)))
					}
				}
      }
    }
</script>

<style lang="scss" scoped>
	.width15{
		width: 150px;
	}
	/deep/.el-radio__label{
		font-size: 13px;
	}
	.carMywrapper{
		.download{
			margin-left: 10px;
		}
		.stock-disk{
			margin: 10px 0 15px 0;
		}
		.scroll-virtual {
		  max-height: 320px;
		  overflow-y: auto;
		  margin-top: 10px;
		}
		.virtual-title {
		  width: 50px;
		}
		.deteal-btn {
		  color: #5179ea;
		  cursor: pointer;
		}
		.add-more {
		  margin-top: 20px;
			line-height: 32px;

		}
		.footer{
			display: flex;
			justify-content: flex-end;
			margin-top: 40px;
			button{
				margin-left: 10px;
			}
		}
	}
	/deep/.el-input-group--append .el-input__inner{
		padding-right: 0;
	}
</style>
