<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px" inline>           
            <el-form-item label="等级名称：" class="width100">
              <el-input v-model="tableFrom.brokerage_name" @keyup.enter.native="getList(1)" placeholder="请输入等级名称" class="selWidth" size="small" clearable>
                <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
              </el-input>
            </el-form-item>
            <el-button type="primary" @click="groupAdd" size="small" class="filter-item">添加分销员等级</el-button>
          </el-form>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="mini"
        class="table"
        highlight-current-row
      >
        <el-table-column
          prop="user_brokerage_id"
          label="ID"
          width="60"
        />
        <el-table-column
          label="图标"
          min-width="80"
        >
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image
                :src="scope.row.brokerage_icon || ''"
                :preview-src-list="[scope.row.brokerage_icon || '']"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="brokerage_name"
          label="名称"
          min-width="120"
        />
        <el-table-column
          label="等级"
          min-width="100"
        >
        <template slot-scope="scope">
           <span>Lv {{scope.row.brokerage_level}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="任务描述"
          min-width="160"
        >
         <template slot-scope="scope">
           <div v-for="(item,index) in scope.row.brokerage_rule" :key="index">
               <div v-if="item.num > 0">
                   <div v-if="index=='spread_user'">推广人数{{item.num}}人</div>
                   <div v-if="index=='pay_num'">自身下单{{item.num}}个</div>
                   <div v-if="index=='spread_money'">推广订单金额{{item.num}}元</div>
                   <div v-if="index=='pay_money'">自身消费金额{{item.num}}元</div>
                   <div v-if="index=='spread_pay_num'">推广订单{{item.num}}个</div>
               </div>              
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="分销员人数"
          min-width="100"
          prop="user_num"
        />
        <el-table-column
          prop="extension_one"
          label="一级返佣上浮比例(%)"
          min-width="120"
        />
        <el-table-column
          prop="extension_two"
          label="二级返佣上浮比例(%)"
          min-width="120"
        />
        <el-table-column label="操作" min-width="150" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="mr10" @click="onDetail(scope.row.user_brokerage_id)">详情</el-button>
            <el-button type="text" size="small" class="mr10" @click="onEdit(scope.row.user_brokerage_id)">编辑</el-button>
            <el-button type="text" size="small" class="mr10" @click="onDelete(scope.row.user_brokerage_id, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80]"
          :page-size="tableFrom.limit"
          :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>

    <!--添加数据-->
    <el-dialog
      :title="isEdit ? '编辑分销员等级' : '添加分销员等级'"
      :visible.sync="dialogVisible"
      width="900px"
      :before-close="handleClose"
    >
     <el-form ref="formValidate" :model="formValidate" :rules="rules" label-width="170px" v-loading="fullscreenLoading" class="demo-promoterForm">
         <el-form-item label="等级名称：" required>
          <el-input v-model="formValidate.brokerage_name" placeholder="请输入等级名称"></el-input> 
        </el-form-item>
        <el-form-item label="等级：" prop="brokerage_level">
          <el-input-number v-model="formValidate.brokerage_level" :min="0" placeholder="请输入任务数量"></el-input-number>
        </el-form-item>
        <el-form-item label="图标：" prop="image">
            <div class="upLoadPicBox" @click="modalPicTap('1')">
                <div v-if="formValidate.brokerage_icon" class="pictrue">
                    <img :src="formValidate.brokerage_icon">
                </div>
                <div v-else class="upLoad">
                    <i class="el-icon-camera cameraIconfont" />
                </div>
            </div>
        </el-form-item>
        <el-form-item label="邀请好友成为下线：">
          <el-input v-model="formValidate.spread_user_name" placeholder="请输入任务名称"></el-input> 
        </el-form-item>
        <el-form-item label="">
          <el-input-number v-model="formValidate.spread_user_num" :min="0" placeholder="请输入任务数量"></el-input-number> 单位：人数
        </el-form-item>
        <el-form-item label="">
          <el-input type="textarea" v-model="formValidate.spread_user_info" maxlength="150" placeholder="请输入任务描述"></el-input> 
        </el-form-item>
        <el-form-item label="自身消费金额：">
          <el-input v-model="formValidate.pay_money_name" placeholder="请输入任务名称"></el-input> 
        </el-form-item>
        <el-form-item label="">
          <el-input-number v-model="formValidate.pay_money_num" :min="0" placeholder="请输入任务数量"></el-input-number>  单位：元
        </el-form-item>
        <el-form-item label="">
          <el-input type="textarea" v-model="formValidate.pay_money_info" maxlength="150" placeholder="请输入任务描述"></el-input> 
        </el-form-item>
        <el-form-item label="自身消费订单数：">
          <el-input v-model="formValidate.pay_num_name" placeholder="请输入任务名称"></el-input> 
        </el-form-item>
        <el-form-item label="" prop="pay_num_num">
          <el-input-number v-model="formValidate.pay_num_num" :min="0" :step="1" step-strictly placeholder="请输入任务数量"></el-input-number> 单位：个 
        </el-form-item>
        <el-form-item label="">
          <el-input type="textarea" v-model="formValidate.pay_num_info" maxlength="150" placeholder="请输入任务描述"></el-input> 
        </el-form-item>
        <el-form-item label="下级消费金额：">
          <el-input v-model="formValidate.spread_money_name" placeholder="请输入任务名称"></el-input> 
        </el-form-item>
        <el-form-item label="">
          <el-input-number v-model="formValidate.spread_money_num" :min="0" placeholder="请输入任务数量"></el-input-number> 单位：元
        </el-form-item>
        <el-form-item label="">
          <el-input type="textarea" v-model="formValidate.spread_money_info" maxlength="150" placeholder="请输入任务描述"></el-input> 
        </el-form-item>
        <el-form-item label="下级消费订单数：" prop="spread_pay_num_name">
          <el-input v-model="formValidate.spread_pay_num_name" placeholder="请输入任务名称"></el-input> 
        </el-form-item>
        <el-form-item label="">
          <el-input-number v-model="formValidate.spread_pay_num_num" :min="0" placeholder="请输入任务数量"></el-input-number> 单位：个
        </el-form-item>
        <el-form-item label="">
          <el-input type="textarea" v-model="formValidate.spread_pay_num_info" maxlength="150" placeholder="请输入任务描述"></el-input> 
        </el-form-item>
        
        <el-form-item prop="extension_one">
          <span slot="label">
            <span>一级返佣(上浮比例)：</span>
            <el-tooltip class="item" effect="dark" content="在分销一级佣金基础上浮（0-100）百分比" placement="top-start">
              <i class="el-icon-warning-outline" />
            </el-tooltip>
          </span>
          <el-input-number v-model="formValidate.extension_one" :precision="2" :step="0.1" :min="0" :max="1000" class="selWidth"></el-input-number>
          <span>%</span>
        </el-form-item>
        <el-form-item prop="extension_two">
          <span slot="label">
            <span>二级返佣(上浮比例)：</span>
            <el-tooltip class="item" effect="dark" content="在分销二级佣金基础上浮（0-1000之间整数）百分比" placement="top-start">
              <i class="el-icon-warning-outline" />
            </el-tooltip>
          </span>
          <el-input-number v-model="formValidate.extension_two" :precision="2" :step="0.1" :min="0" :max="1000" class="selWidth"></el-input-number>
          <span>%</span>
        </el-form-item>       
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="submitForm('formValidate')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--详情-->
    <el-dialog
      title="查看详情"
      :visible.sync="detailDialog"
      width="700px"
      :before-close="handleClose"
    >
      <div v-loading="loading">
      <div class="box-container">
        <div class="acea-row">
          <div class="list sp"><label class="name">等级名称：</label>{{ formValidate.brokerage_name }}</div>
        </div>
        <div class="title" style="margin-top: 20px;">分销任务：</div>
        <div class="acea-row">
          <table class="detail-table">
            <tr>
                <!-- <th>序号</th> -->
                <th>任务类型</th>
                <th>任务名称</th>
                <th>任务数量</th>
                <th>任务描述</th>
            </tr>
            <tr v-if="formValidate.spread_user_num > 0">
                <!-- <td>1</td> -->
                <td>邀请好友成为下线</td>
                <td>邀请好友</td>
                <td>{{formValidate.spread_user_num}}人</td>
                <td>{{formValidate.spread_user_info}}</td>
            </tr>
            <tr v-if="formValidate.pay_money_num > 0">
                <!-- <td>2</td> -->
                <td>自身消费金额</td>
                <td>分销自购</td>
                <td>{{formValidate.pay_money_num}}元</td>
                <td>{{formValidate.pay_money_info}}</td>
            </tr>
            <tr v-if="formValidate.pay_num_num > 0">
                <!-- <td>2</td> -->
                <td>自身消费订单数</td>
                <td>分销自购</td>
                <td>{{formValidate.pay_num_num}}个订单</td>
                <td>{{formValidate.pay_num_info}}</td>
            </tr>
            <tr v-if="formValidate.spread_money_num > 0">
                <!-- <td>2</td> -->
                <td>下级消费金额</td>
                <td>推广订单金额</td>
                <td>{{formValidate.spread_money_num}}元</td>
                <td>{{formValidate.spread_money_info}}</td>
            </tr>
            <tr v-if="formValidate.spread_pay_num_num > 0">
                <!-- <td>2</td> -->
                <td>下级消费订单数</td>
                <td>推广订单数</td>
                <td>{{formValidate.spread_pay_num_num}}个订单</td>
                <td>{{formValidate.spread_pay_num_info}}</td>
            </tr>
          </table>
        </div>
        <div class="acea-row">
          <div class="list sp"><label class="name">等级：</label>{{ formValidate.brokerage_level }}级</div>
          <div class="list sp100 image">
            <label class="name">图标：</label>
            <img
              style="max-width: 150px; height: 80px;"
              :src="formValidate.brokerage_icon"
            />
          </div>
          <div class="list sp100"><label class="name">一级返佣(上浮比例)：</label>{{ formValidate.extension_one }}%</div>
          <div class="list sp100"><label class="name">二级返佣(上浮比例)：</label>{{ formValidate.extension_two }}%</div>
        </div>
      </div>
    </div>
     
    </el-dialog>
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
import { distributionLevelLst, membershipDataAddApi, distributionDetail, distributionUpdate, distributionDelete } from '@/api/promoter'
export default {
  name: 'brokerageLevel',
  data() {
    return {
      fullscreenLoading: false,
      cardLists: [],
      isEdit: false,
      tableData: {
        data: [],
        total: 0
      },
      listLoading: true,
      loading: false,
      tableFrom: {
        brokerage_name: '',
        page: 1,
        limit: 20
      },
      id: '',
      dialogVisible: false,
      detailDialog: false,
      uid: '',
      formValidate: {
        brokerage_name: '',
        brokerage_level: '',
        spread_user_name: '',
        spread_user_num: '',
        spread_user_info: '',
        pay_money_name: '',
        pay_money_num: '',
        pay_money_info: '',
        pay_num_name: '',
        pay_num_num: '',
        pay_num_info: '',
        spread_money_name: '',
        spread_money_num: '',
        spread_money_info: '',
        spread_pay_num_name: '',
        spread_pay_num_num: '',
        spread_pay_num_info: '',
        extension_one: 0,
        extension_two: 0
      },
      rules: {
        brokerage_name: [
          { required: true, message: '请输入等级名称', trigger: 'blur' }
        ],
        brokerage_level: [
          { required: true, message: '请输入等级', trigger: 'change' }
        ],
        brokerage_icon: [
          { required: true, message: '请上传图标', trigger: 'change' }
        ],
        extension_one: [
          { required: true, message: '请输入一级返佣比例', trigger: 'change' }
        ],
        extension_two: [
          { required: true, message: '请输入二级返佣比例', trigger: 'change' }
        ],
        
      }
    }
  },
  mounted() {
    this.getList('')
  },
  methods: {
    // 点击上传图标
    modalPicTap(tit, num, i) {
      const _this = this
      this.$modalUpload(function(img) {
        _this.formValidate.brokerage_icon = img[0]
        _this.$forceUpdate()
      }, tit)
    },
    // 添加数据
    groupAdd() {
        this.dialogVisible = true;   
        this.isEdit = false; 
        this.id= ''
        this.resetData();
    },
    resetData(){
        this.formValidate = {
            brokerage_name: '',
            brokerage_level: '',
            spread_user_name: '',
            spread_user_num: '',
            spread_user_info: '',
            pay_money_name: '',
            pay_money_num: '',
            pay_money_info: '',
            pay_num_name: '',
            pay_num_num: '',
            pay_num_info: '',
            spread_money_name: '',
            spread_money_num: '',
            spread_money_info: '',
            spread_pay_num_name: '',
            spread_pay_num_num: '',
            spread_pay_num_info: '',
            extension_one: 0,
            extension_two: 0
      } 
    },
    submitForm(name){     
        let formData = this.formValidate
        this.$refs[name].validate(valid => {
            if (valid) {
              if(!formData.brokerage_name){
                    return this.$message.error('请输入等级名称！')
                }
                if(!formData.spread_user_num && !formData.pay_money_num && !formData.pay_num_num && !formData.spread_money_num && !formData.spread_pay_num_num){
                    return this.$message.error('请至少输入一个等级任务！')
                }
                if((formData.spread_user_num && !formData.spread_user_name) ||
                   (formData.pay_money_num && !formData.pay_money_name) || 
                   (formData.pay_num_num && !formData.pay_num_name) || 
                   (formData.spread_money_num && !formData.spread_money_name) ||
                   (formData.spread_pay_num_num && !formData.spread_pay_num_name) ||
                   (!formData.spread_user_num && formData.spread_user_name) ||
                   (!formData.pay_money_num && formData.pay_money_name) || 
                   (!formData.pay_num_num && formData.pay_num_name) || 
                   (!formData.spread_money_num && formData.spread_money_name) ||
                   (!formData.spread_pay_num_num && formData.spread_pay_num_name)){
                    return this.$message.error('请输入相对应的任务或数量！')
                }
                this.loading = true;
                let parmas = {
                    brokerage_level: formData.brokerage_level,
                    brokerage_name: formData.brokerage_name,
                    brokerage_icon: formData.brokerage_icon,
                    brokerage_rule: {
                        spread_user:{
                            name: formData.spread_user_name,
                            num: formData.spread_user_num ? formData.spread_user_num : 0,
                            info: formData.spread_user_info
                        }, 
                        pay_money:{
                            name: formData.pay_money_name,
                            num: formData.pay_money_num ? formData.pay_money_num : 0,
                            info: formData.pay_money_info
                        },
                        pay_num:{
                            name: formData.pay_num_name,
                            num: formData.pay_num_num ? formData.pay_num_num : 0,
                            info: formData.pay_num_info
                        },
                        spread_money:{
                            name: formData.spread_money_name,
                            num: formData.spread_money_num ? formData.spread_money_num : 0,
                            info: formData.spread_money_info
                        },
                        spread_pay_num:{
                            name: formData.spread_pay_num_name,
                            num: formData.spread_pay_num_num ? formData.spread_pay_num_num : 0,
                            info: formData.spread_pay_num_info
                        }
                    },
                    extension_one: formData.extension_one,
                    extension_two: formData.extension_two
                }
                this.id ? distributionUpdate(this.id, parmas).then(res => {   
                     this.loading = false
                     this.$message.success(res.message)
                     this.dialogVisible = false;
                     this.getList('')
                     this.resetData();
                }).catch((res) => {
                    this.$message.error(res.message)
                    this.loading = false
                }) :
                membershipDataAddApi(parmas).then(res => {   
                    this.loading = false
                     this.$message.success(res.message)
                     this.dialogVisible = false;
                     this.getList('')
                     this.resetData();
                }).catch((res) => {
                    this.$message.error(res.message)
                    this.loading = false
                })
            } 

        }) 
    },
    // 编辑
    onEdit(id) {
        this.id = id;
        this.isEdit = true;
        this.dialogVisible = true
        this.getDetail(id);
    },
    getDetail(id){
        distributionDetail(id).then(res => {   
        this.loading = false;
        let info = res.data;
        this.formValidate = {
            brokerage_icon: info.brokerage_icon,
            brokerage_level: info.brokerage_level,
            brokerage_name: info.brokerage_name,
            extension_one: info.extension_one,
            extension_two: info.extension_two,
            pay_money_name: info.brokerage_rule.pay_money.name,
            pay_money_num: info.brokerage_rule.pay_money.num,
            pay_money_info: info.brokerage_rule.pay_money.info,
            pay_num_name: info.brokerage_rule.pay_num.name,
            pay_num_num: info.brokerage_rule.pay_num.num,
            pay_num_info: info.brokerage_rule.pay_num.info,
            spread_money_name: info.brokerage_rule.spread_money.name,
            spread_money_num: info.brokerage_rule.spread_money.num,
            spread_money_info: info.brokerage_rule.spread_money.info,
            spread_pay_num_name: info.brokerage_rule.spread_pay_num.name,
            spread_pay_num_num: info.brokerage_rule.spread_pay_num.num,
            spread_pay_num_info: info.brokerage_rule.spread_pay_num.info,
            spread_user_name: info.brokerage_rule.spread_user.name,
            spread_user_num: info.brokerage_rule.spread_user.num,
            spread_user_info: info.brokerage_rule.spread_user.info
        }
      }).catch((res) => {
         this.$message.error(res.message)
         this.loading = false;
      })
    },
    // 详情
    onDetail(id) {
      this.loading = true;
      this.detailDialog = true; 
      this.getDetail(id)
    },
    // 删除
    onDelete(id,idx) {
      this.$modalSure('确定删除该等级吗').then(() => {
        distributionDelete(id)
          .then(({ message }) => {
            this.$message.success(message)
            this.tableData.data.splice(idx, 1)
          })
          .catch(({ message }) => {
            this.$message.error(message)
          })
      })
    },
    handleClose() {
      this.dialogVisible = false
      this.detailDialog = false
    },

    selectChange(tab) {
      this.tableFrom.date = tab
      this.timeVal = []
      this.tableFrom.page = 1;
      this.getList('')
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e
      this.tableFrom.date = e ? this.timeVal.join('-') : ''
      this.tableFrom.page = 1;
      this.getList('')
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page
      distributionLevelLst(this.tableFrom).then(res => {
        this.tableData.data = res.data.list
        this.tableData.total = res.data.count
        this.listLoading = false
      }).catch((res) => {
        this.$message.error(res.message)
        this.listLoading = false
      })
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getList('')
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList('')
    }
  }
}
</script>

<style scoped lang="scss">
  .selWidth{
    width: 300px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    font-size: 12px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .detail-table{
      width: 500px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #e6ebf5;
      border-bottom: none;
      td,th{
        border-bottom: 1px solid #e6ebf5;
        border-right: 1px solid #e6ebf5;
        &:last-child{
            border-right: none;
        } 
      }
  }
  .box-container {
    overflow: hidden;
  }
   .box-container .list {
    float: left;
    line-height: 40px;
    }
    .box-container .sp {
    width: 50%;
    }
    .box-container .sp3 {
    width: 33.3333%;
    }
    .box-container .sp100 {
    width: 100%;
    }
    .box-container .list .name {
    display: inline-block;
    color: #606266;
    }
    .box-container .list .blue {
    color: #1890ff;
    }
    .box-container .list.image {
    margin: 20px 0;
    position: relative;
    }
    .box-container .list.image img {
    position: absolute;
    top: -20px;
    }
    .title{
    margin-bottom: 16px;
    color: #606266;
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 2px;
    }
</style>
