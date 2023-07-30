<template>
    <div>
        <el-dialog v-if="modals" :visible.sync="modals" title="选择链接" width="900px" :before-close="cancel">
			<div class="table_box">
				<div class="left_box">
					<el-tree :data="categoryData" default-expand-all @node-click="handleCheckChange"></el-tree>
				</div>
				<div class="right_box" v-if="currenType=='link'">
					<div v-for="(item,index) in currentList" >
						<div class="cont">{{item.name}}</div>
						<div class="Box">
							<div class="cont_box" :class="currenId==itemn.id?'on':''" v-for="(itemn,indexn) in item.pageLink" :key="indexn" @click="getUrl(itemn)">{{itemn.name}}</div>
						</div>
					</div>
				</div>
				<div class="right_box" v-if="currenType=='special' || currenType=='product_category' || currenType=='product' || currenType=='seckill' ||currenType=='presell' || currenType == 'bargain' || currenType == 'combination' || currenType == 'active'">
					<el-form
						ref="formValidate"
						:model="formValidate"
						class="tabform"
						v-if="currenType=='product'"
					>
						<el-row type="flex">
							<el-col>
								<el-form-item label="商品分类：" label-for="pid">
									<el-cascader
										v-model="formValidate.cate_id"
										class="selWidth"
										:options="merCateList"
										:props="props"
										clearable
										@change="userSearchs()"
									/>  
								</el-form-item>
							</el-col>
							<el-col>
								<el-form-item label="搜索：" label-for="store_name">
									<el-input class="selWidth" placeholder="请输入商品名称,关键字,编号" v-model="formValidate.store_name"  @keyup.enter.native="userSearchs"/>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
					<el-table
						ref="table"
						size="mini"
						:data="tableList"
						v-loading="loading"
						:row-key="currenType == 'product_category' ? 'store_category_id' : 'id'"
						:default-expand-all="false"
						:tree-props="{children: 'children', hasChildren: 'hasChildren'}"				
					>
						<el-table-column :key="4" label="选择" min-width="60">
							<template scope="scope">
								<el-radio v-model="radio" :label="scope.$index"  @change.native="getCurrentRow(scope.row)" />
							</template>
						</el-table-column>
						<el-table-column :key="1" prop="id" label="ID" min-width="60">
						<template slot-scope="scope">
							<span>{{scope.row.id || scope.row.product_id}}</span>
						</template>
						</el-table-column>
						<el-table-column v-if="currenType=='special'" :key="2"  prop="name" label="页面名称" min-width="60" />
						<el-table-column v-if="currenType=='special'" :key="3"  prop="url" label="页面链接" min-width="150" />
						<el-table-column v-if="currenType=='product_category'" :key="5"  prop="cate_name" label="分类名称" min-width="60" />
						<el-table-column v-if="currenType=='product_category'" :key="6" label="分类图标" min-width="150">
							<template slot-scope="scope">
								<div class="demo-image__preview">
									<el-image style="width: 36px; height: 36px" :src="scope.row.pic" :preview-src-list="[scope.row.pic]" />
								</div>
						</template>
						</el-table-column>
						<el-table-column v-if="currenType=='bargain'||currenType=='combination'" :key="9" label="商品图片" min-width="80">
							<template slot-scope="scope">
								<div class="demo-image__preview">
									<el-image style="width: 36px; height: 36px" :src="scope.row.image" :preview-src-list="[scope.row.image]" />
								</div>
							</template>
						</el-table-column>
						<el-table-column v-if="currenType=='bargain'||currenType=='combination'" :key="8"  prop="store_name" label="商品名称" min-width="150" />
						<el-table-column v-if="currenType !=='bargain' && currenType !=='combination' && currenType !=='product_category' && currenType !=='special' && currenType != 'active'" :key="13"  prop="store_name" label="商品名称" min-width="150" />
						<el-table-column v-if="currenType=='active'" :key="14" label="专场图片" min-width="80">
							<template slot-scope="scope">
								<div class="demo-image__preview">
									<el-image style="width: 36px; height: 36px" :src="scope.row.image" :preview-src-list="[scope.row.image]" />
								</div>
							</template>
						</el-table-column>
						<el-table-column v-if="currenType=='active'" :key="15"  prop="name" label="专场名称" min-width="150" />
					</el-table>
					<div class="block" v-if="currenType=='product'||currenType=='seckill'||currenType=='presell'||currenType == 'bargain'||currenType == 'combination'||currenType == 'active'">
						<el-pagination
						:page-sizes="[15, 30, 45, 60]"
						:page-size="formValidate.limit"
						:current-page="formValidate.page"
						layout="total, sizes, prev, pager, next, jumper"
						:total="total"
						@size-change="handleSizeChange"
						@current-change="pageChange"
						/>
        </div>
				</div>
				<div class="right_box" v-if="currenType=='custom'">
					<div style="width: 340px;margin: 150px 100px 0 120px">
						<el-form ref="customdate" :model="customdate" :rules="ruleValidate" label-width="90px">	
							<el-form-item label="跳转路径：" prop="url">
								<el-input v-model="customdate.url" placeholder="请输入正确跳转路径"></el-input>
							</el-form-item>
							<div style="color:#ff4949;">小程序跳转外链链接，域名需在白名单范围内的合法域名</div>
						</el-form>
					</div>	
				</div>
			</div>
			<div slot="footer">
				<el-button @click="cancel">取消</el-button>
				<el-button type="primary" @click="handleSubmit('customdate')" v-if="currenType=='custom'">确定</el-button>
				<el-button type="primary" @click="ok" v-else>确定</el-button>
			</div>
        </el-dialog>
    </div>
</template>

<script>
	import { pageCategory, pageLink, getProduct } from "@/api/diy";
	import { categoryListApi } from "@/api/product";
    export default {
        name: 'linkaddress',
        data () {
        return {
        modals: false,
				categoryData:[],
				currenType:'link',
				radio: '',
				props: {
					emitPath: false
				},
				merCateList: [],
				formValidate: {
					page: 1,
					limit: 15,
					cate_id: "",
					store_name: ""
				},
				total: 0,
				currentList:[],
				currenId:'',
				currenUrl:'',
				loading:false,
				tableList:[],
				presentId:0,
				categoryId:'',//左侧分类id
				customdate: {
					// name:'',
					url:''
				},
				customNum:1,
				ruleValidate:{
					name: [
						{ required: true, message: '请输入链接名称', trigger: 'blur' }
					],
					url: [
						{ required: true, message: '请输入跳转路径', trigger: 'blur' }
					]
				}
            }
        },
        computed: {
        },
		created(){
     
		},
		mounted(){
		},
    methods: {
			init() {
				this.modals = true;
				this.getSort();
				this.goodsCategory();
			},
			getCurrentRow(row) { // 获取选中数据
				row.checked = true
				this.presentId = row.id;
				this.currenUrl = row.url;
			 },
			getCustomList(){
				pageLink(this.categoryId).then(res=>{
					if(!res.data.list.length){
						this.customNum = 2
					}
					this.tableList = res.data.list
				}).catch(err=>{
					this.$message.error(err.message)
				})
			},
			handleSubmit (name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.$emit("linkUrl",this.customdate.url);
						this.modals = false
						this.reset();
					} else {
						this.$message.error('请填写信息');
					}
				})
			},
			pageChange(index) {
				this.formValidate.page = index;
				this.getList();
			},
			handleSizeChange(val) {
				this.formValidate.limit = val
				this.getList()
			},
			// 商品分类；
			goodsCategory() {
				categoryListApi()
					.then((res) => {
						this.merCateList = res.data;
					})
					.catch((res) => {
						this.$message.error(res.message);
					});
			},
			// 表格搜索
			userSearchs() {
				this.formValidate.page = 1;
				this.getList();
			},
      reset(){
				this.currenUrl = "";
				this.presentId = 0;
				this.currenId = "";
				this.radio = "";
				this.customdate.url="";
				this.tableList = []
			},
			getUrl(item){
				this.currenId = item.id;
				this.currenUrl = item.url;
			},
      getSort(){
				pageCategory().then(res=>{
					if(res.data[0].children[0]){
						res.data[0].children[0].selected = true;
						this.handleCheckChange(res.data[0].children[0]);
					}else{
						this.handleCheckChange(res.data[0]);
					}
					this.categoryData = res.data;
					
				}).catch(err=>{
					this.$message.error(err.message)
				})
			},
			getList(){
				this.loading = true;
				if(this.currenType == 'product'){
					let formValidate = this.formValidate
					formValidate.product_type = 0;
					getProduct(formValidate)
							.then(async (res) => {
								let data = res.data;
								data.list.forEach((e)=>{
									e.url = `/pages/goods_details/index?id=${e.product_id}`
								});
								this.tableList = data.list;
								this.total = res.data.count;
								this.loading = false;
							})
							.catch((res) => {
								this.loading = false;
								this.$message.error(res.message);
							});
				}else if(this.currenType == 'seckill'){
					// seckillProductLstApi(this.formValidate)
					let formValidate = this.formValidate
					formValidate.product_type = 1;
					getProduct(formValidate)
							.then(async (res) => {
								let data = res.data;
								data.list.forEach((e)=>{
									e.url = `/pages/activity/goods_seckill_details/index?id=${e.product_id}`
								});
								this.tableList = data.list;
								this.total = res.data.count;
								this.loading = false;
							})
							.catch((res) => {
								this.loading = false;
								this.$message.error(res.message);
							});
				}else if(this.currenType == 'bargain'){
					// assistProListApi(this.formValidate)
					let formValidate = this.formValidate
					formValidate.product_type = 3;
					getProduct(formValidate)
							.then(async (res) => {
								let data = res.data;
								data.list.forEach((e)=>{
									e.url = `/pages/activity/assist_detail/index?id=${e.activity_id}`
								});
								this.tableList = data.list;
								this.total = res.data.count;
								this.loading = false;
							})
							.catch((res) => {
								this.loading = false;
								this.$message.error(res.message);
							});
				}else if(this.currenType == 'combination'){
					// combinationProLst(this.formValidate)
					let formValidate = this.formValidate
					formValidate.product_type = 4;
					getProduct(formValidate)
							.then(async (res) => {
								let data = res.data;
								data.list.forEach((e)=>{
									e.url = `/pages/activity/combination_details/index?id=${e.activity_id}`
								});
								this.tableList = data.list;
								this.total = res.data.count;
								this.loading = false;
							})
							.catch((res) => {
								this.loading = false;
								this.$message.error(res.message);
							});
				}else if(this.currenType == 'presell'){
					let formValidate = this.formValidate
					formValidate.product_type = 2;
					getProduct(formValidate)
							.then(async (res) => {
								let data = res.data;
								data.list.forEach((e)=>{
									e.url = `/pages/activity/presell_details/index?id=${e.activity_id}`
								});
								this.tableList = data.list;
								this.total = res.data.count;
								this.loading = false;
							})
							.catch((res) => {
								this.loading = false;
								this.$message.error(res.message);
							});
				} else if (this.currenType == 'active') {
					pageLink(id, {
						page: this.formValidate.page,
						limit: this.formValidate.limit
					}).then(res=>{
						this.loading = false
						let data = res.data;
						this.currentList = data;
						if(this.currenType == 'special'){
							let list = []
							data.forEach((e)=>{
								e.url = `/pages/index/index?id=${e.id}`
								if(e.is_diy){
									list.push(e)
								}
							});
							this.tableList = list
						}else if(this.currenType == 'product_category'){
							data.forEach((e)=>{
								if(e.hasOwnProperty('children')){
									e.children.forEach((j)=>{
										j.url = `/pages/store/list/index?id=${j.store_category_id}&title=${j.cate_name}`
										if(j.hasOwnProperty('children')){
											j.children.forEach((h)=>{
												h.url = `/pages/store/list/index?id=${h.store_category_id}&title=${h.cate_name}`
											})
										}
									})
								}
								e.url = `/pages/store/list/index?id=${e.store_category_id}&title=默认`
							});
							this.tableList = data
							this.total = data.length
						} else if (this.currenType == 'active') {
							data.list.forEach(item => {
								item.id = item.group_data_id
								item.url = `/pages/activity/topic_detail/index?id=${item.group_data_id}`
							})
							this.tableList = data.list
							this.total = res.data.count
						}
					}).catch(err=>{
						this.loading = false
						this.$message.error(err.message)
					});
				}
			},
			handleCheckChange(data){
				this.reset();
        let id = ''
				this.currenType = data.type
				if(data.pid){
					id = data.id
					this.categoryId = data.id
				}else {
					return false
				}
				this.loading = true	
				this.formValidate.page = 1
				if(this.currenType == 'product' || this.currenType == 'seckill' || this.currenType == 'presell' || this.currenType == 'bargain' || this.currenType == 'combination'){
					this.getList();
				} else if(this.currenType=='custom'){
					this.getCustomList();
				}else {
					let obj = {};
					if (this.currenType == 'active') {
						obj.page = this.formValidate.page;
						obj.limit = this.formValidate.limit;
					}
					pageLink(id, obj).then(res=>{
						this.loading = false
						let data = res.data;
						this.currentList = data;
						if(this.currenType == 'special'){
							let list = []
							data.list.forEach((e)=>{
								e.url = `/pages/index/index?id=${e.id}`
								if(e.is_diy){
									list.push(e)
								}
							});
							this.tableList = list
						}else if(this.currenType == 'product_category'){
							data.forEach((e)=>{
								if(e.hasOwnProperty('children')){
									e.children.forEach((j)=>{
										j.url = `/pages/store/list/index?id=${j.store_category_id}&title=${j.cate_name}`
										if(j.hasOwnProperty('children')){
											j.children.forEach((h)=>{
												h.url = `/pages/store/list/index?id=${h.store_category_id}&title=${h.cate_name}`
											})
										}
									})
								}
								e.url = `/pages/store/list/index?id=${e.store_category_id}&title=默认`
							});
							this.tableList = data
							this.total = data.length
						} else if (this.currenType == 'active') {
							data.list.forEach(item => {
								item.id = item.group_data_id
								item.url = `/pages/activity/topic_detail/index?id=${item.group_data_id}`
							})
							this.tableList = data.list
							this.total = res.data.count
						}
					}).catch(err=>{
						this.loading = false
						this.$message.error(err.message)
					});
				}
			},
			ok(){
				if(this.currenUrl==""){
					return this.$message.warning("请选择链接");
				}else {
					this.$emit("linkUrl",this.currenUrl);
					this.modals = false
					this.reset();
				}
			},
			cancel(){
				this.modals = false
				this.reset();
			}
        }
    }
</script>

<style scoped lang="scss">
	.tabBox_img {
		width: 36px;
		height: 36px;
		border-radius: 4px;
		cursor: pointer;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.selWidth{
		width: 200px;
	}
	/*定义滑块 内阴影+圆角*/
	::-webkit-scrollbar-thumb{
		-webkit-box-shadow: inset 0 0 6px #ddd;
	}
	::-webkit-scrollbar {
		width: 4px!important; /*对垂直流动条有效*/
	}
.on{
	background-color: #2d8cf0!important;
	color: #fff!important;
}
.menu-item{
	position: relative;
	display: flex;
	justify-content: space-between;
	word-break: break-all;
	.icon-box{
		z-index: 3;
		position: absolute;
		right: 20px;
		top: 50%;
		transform: translateY(-50%);
		display: none;
	}
	&:hover .icon-box{
	    display: block;
	}
	.right-menu{
		z-index: 10;
		position: absolute;
		right: -106px;
		top: -11px;
		width: auto;
		min-width: 121px;
	}
}
	   
.table_box{
	margin-top: 14px;
	display: flex;
	position: relative;
	.left_box{
		width: 171px;
		height: 470px;
		border-right: 1px solid #EEEEEE;
		overflow-x: hidden;
		overflow-y: auto;
		.left_cont{
			margin-bottom: 12px;
			cursor: pointer;
		}
	}
	.right_box{
		margin-left: 23px;
		font-size: 13px;
		font-family: PingFang SC;
		width: 645px;
		height: 470px;
		overflow-x: hidden;
		overflow-y: auto;
		.cont{
			font-weight: 500;
			color: #000000;
			font-weight: bold;
		}
		.Box{
			margin-top: 19px;
			display: flex;
			flex-wrap: wrap;
			.cont_box{
				font-weight: 400;
				color: rgba(0, 0, 0, 0.85);
				background: #FAFAFA;
				border-radius: 3px;
				text-align: center;
				padding: 7px 30px;
				margin-right: 10px;
				margin-bottom: 18px;
				cursor: pointer;
				&:hover{
					background-color: #eee;
					color: #333;
				}
			}
			.item{
				position: relative;
				.iconfont{
					display: none;
				}
				&:hover{
					.iconfont{
						display: block;
					}
				}
			}
			.iconfont{
				position: absolute;
				right: 9px;
				top:-8px;
				font-size: 18px;
				color: #333;
			}
		}
		
	}
	.Button{
		position: absolute;
		bottom: 15px;
		right: 15px;
		font-family: PingFangSC-Regular;
		text-align: center;
		.cancel{
			width: 70px;
			height: 32px;
			background: #FFFFFF;
			border: 1px solid rgba(0, 0, 0, 0.14901960784313725);
			border-radius: 2px;
			font-size: 14px;
			color: #000000;
			line-height: 32px;
			float: left;
			margin-right: 10px;
			cursor: pointer;
		}
		.ok{
			width: 70px;
			height: 32px;
			background: #1890FF;
			border-radius: 2px;
			font-size: 14px;
			color: #FFFFFF;
			line-height: 32px;
			float: left;
			cursor: pointer;
		}
	}
}
</style>
