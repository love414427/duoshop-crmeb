<template>
<div class="divBox">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-tabs v-model="user_type" @tab-click="getList(1)">
                <el-tab-pane label="全部用户" name="" />
                <el-tab-pane label="微信用户" name="wechat" />
                <el-tab-pane label="小程序用户" name="routine" />
                <el-tab-pane label="H5用户" name="h5" />
                <el-tab-pane label="APP" name="app" />
                <el-tab-pane label="PC" name="pc" />
            </el-tabs>
            <div class="container">
                <el-form inline size="small" :label-position="labelPosition" label-width="100px">
                    <el-row>
                        <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                            <el-col v-bind="grid">
                                <el-form-item label="用户昵称：">
                                    <el-input v-model="userFrom.nickname" placeholder="请输入昵称" clearable class="selWidth" />
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <template v-if="collapse">
                            <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                                <el-col v-bind="grid">
                                    <el-form-item label="用户标签：">
                                        <el-select v-model="userFrom.label_id" placeholder="请选择" class="selWidth" clearable filterable>
                                            <el-option value="">全部</el-option>
                                            <el-option v-for="(item, index) in labelLists" :key="index" :value="item.label_id" :label="item.label_name" />
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                                <el-col v-bind="grid">
                                    <el-form-item label="性别：">
                                        <el-radio-group v-model="userFrom.sex" type="button" class="selWidth">
                                            <el-radio-button label="">
                                                <span>全部</span>
                                            </el-radio-button>
                                            <el-radio-button label="1">
                                                <span>男</span>
                                            </el-radio-button>
                                            <el-radio-button label="2">
                                                <span>女</span>
                                            </el-radio-button>
                                            <el-radio-button label="0">
                                                <span>保密</span>
                                            </el-radio-button>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                                <el-col v-bind="grid">
                                    <el-form-item label="身份：">
                                        <el-radio-group v-model="userFrom.is_promoter" type="button" class="selWidth">
                                            <el-radio-button label="">
                                                <span>全部</span>
                                            </el-radio-button>
                                            <el-radio-button label="1">
                                                <span>推广员</span>
                                            </el-radio-button>
                                            <el-radio-button label="0">
                                                <span>普通用户</span>
                                            </el-radio-button>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                                <el-col v-bind="grid">
                                    <el-form-item label="访问情况：">
                                        <el-select v-model="userFrom.user_time_type" placeholder="请选择" class="selWidth" clearable>
                                            <!--<el-option value="visitno" label="时间段未访问" />-->
                                            <el-option value="visit" label="最后访问" />
                                            <el-option value="add_time" label="首次访问" />
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col v-bind="grid">
                                    <el-form-item label="消费情况：">
                                        <el-select v-model="userFrom.pay_count" placeholder="请选择" class="selWidth" clearable>
                                            <el-option value="-1" label="0次"></el-option>
                                            <el-option value="0" label="1次及以上"></el-option>
                                            <el-option value="1" label="2次及以上"></el-option>
                                            <el-option value="2" label="3次及以上"></el-option>
                                            <el-option value="3" label="4次及以上"></el-option>
                                            <el-option value="4" label="5次及以上"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                                <el-col v-bind="grid">
                                    <el-form-item label="访问时间：" class="timeBox">
                                        <el-date-picker v-model="timeVal" value-format="yyyy/MM/dd" align="right" unlink-panels format="yyyy/MM/dd" size="small" type="daterange" placement="bottom-end" placeholder="自定义时间" class="selWidth" :picker-options="pickerOptions" @change="onchangeTime" />
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </template>
                        <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6" class="text-right userFrom">
                            <el-form-item>
                                <el-button type="primary" icon="ios-search" label="default" class="mr15" size="small" @click="userSearchs">搜索</el-button>
                                <el-button class="ResetSearch mr10" size="small" type="reset" @click="reset('userFrom')">重置</el-button>
                                <a class="ivu-ml-8" @click="collapse = !collapse">
                                    <template v-if="!collapse">
                                        展开 <i class="el-icon-arrow-down" />
                                    </template>
                                    <template v-else>
                                        收起 <i class="el-icon-arrow-up" />
                                    </template>
                                </a>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div>
            <el-button type="primary" icon="ios-search" label="default" class="mr15" size="small" @click="sendCoupon" style="margin-bottom: 20px;">发送优惠券</el-button>
            <el-alert v-if="checkedIds.length>0 || allCheck" :title="allCheck ? `已选择  ${tableData.total}  项` : `已选择  ${checkedIds.length}  项`" type="info" show-icon />
        </div>
        <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%;" size="small" >
          <el-table-column  width="50">
            <template slot="header" slot-scope="scope">
              <el-popover placement="top-start" width="100" trigger="hover" class="tabPop">
                <div>
                  <span class="spBlock onHand" :class="{'check': chkName === 'dan'}" @click="onHandle('dan',scope.$index)">选中本页</span>
                  <span class="spBlock onHand" :class="{'check': chkName === 'duo'}" @click="onHandle('duo')">选中全部</span>
                </div>
                <el-checkbox slot="reference" :value="(chkName === 'dan' && checkedPage.indexOf(userFrom.page) > -1) || chkName === 'duo'" @change="changeType" />
              </el-popover>
            </template>
            <template slot-scope="scope">
              <el-checkbox :value="checkedIds.indexOf(scope.row.uid) > -1 || (chkName === 'duo' && noChecked.indexOf(scope.row.uid) === -1)" @change="(v)=>changeOne(v,scope.row)" />
            </template>
          </el-table-column>
          <el-table-column prop="uid" label="ID" min-width="60" />
          <el-table-column label="头像" min-width="50">
            <template slot-scope="scope">
                <div class="demo-image__preview">
                    <el-image style="width: 36px; height: 36px" :src="scope.row.avatar ? scope.row.avatar : moren" :preview-src-list="[scope.row.avatar || moren]" />
                </div>
            </template>
          </el-table-column>
          <el-table-column label="昵称" min-width="90">
            <template slot-scope="{row}">
                <div class="acea-row">
                    <i v-show="row.sex===1" class="el-icon-male mr5" style="font-size: 15px; margin-top: 3px; color:#2db7f5; " />
                    <i v-show="row.sex===2" class="el-icon-female mr5" style="font-size: 15px; margin-top: 3px; color:#ed4014; " />
                    <div v-text="row.nickname" />
                </div>
                <div v-show="row.vip_name" class="vipName">{{ row.vip_name }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="is_svip" label="付费会员" min-width="120">
            <template slot-scope="{row}">
                <span>{{row.is_svip > 0 ? "是" : "否"}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" min-width="120" />
          <el-table-column label="首次访问时间" prop="create_time" min-width="120" />
          <el-table-column label="用户类型" min-width="100">
            <template slot-scope="{row}">
              <span>{{ row.user_type === 'routine' ? '小程序' : row.user_type === 'wechat' ? '公众号' : row.user_type === 'app' ? 'App' : row.user_type === 'pc' ? 'PC' : 'H5' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="首次消费时间" prop="first_pay_time" min-width="120" />
          <el-table-column label="最近消费时间" prop="last_pay_time" min-width="120" />
            <el-table-column label="标签" min-width="100">
                <template slot-scope="{row}">
                    <span> {{ row.label.join('、') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="130" fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" size="small" class="mr10" @click="onDetails(scope.row)">详情</el-button>
                  <el-button type="text" size="small" class="mr10" @click="setLabel(scope.row.user_merchant_id)">设置标签</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="userFrom.limit" :current-page="userFrom.page" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange" @current-change="pageChange" />
        </div>
    </el-card>
    <!--会员详情-->
    <el-dialog v-if="visibleDetail" title="用户详情" :visible.sync="visibleDetail" width="1000px" :before-close="Close">
      <user-details v-if="visibleDetail" ref="userDetails" :uid="uid" :row="row" />        
    </el-dialog>
    <!-- 选择优惠券 -->
     <el-dialog v-if="visibleCoupon" title="优惠券列表" :visible.sync="visibleCoupon" width="1000px">
      <coupon-List v-if="visibleCoupon" ref="couponList" :couponForm="couponForm" :checkedIds="checkedIds" :allCheck="allCheck" :userFrom="userFrom" @sendSuccess="sendSuccess" />        
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
import {
    userLstApi,
    changeGroupApi,
    labelLstApi
} from '@/api/user'
import userDetails from './userDetails'
import couponList from './couponList'
export default {
    name: 'UserList',
    components: {
      userDetails,
      couponList
    },
    data() {
        return {
            moren: require("@/assets/images/f.png"),
            pickerOptions: {
                shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '昨天',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)))
                            end.setTime(end.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())))
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '最近7天',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '最近30天',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '本月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), 1)))
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '本年',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.setTime(new Date(new Date().getFullYear(), 0, 1)))
                            picker.$emit('pick', [start, end])
                        }
                    }
                ]
            },
            timeVal: [],
            collapse: false,
            visibleDetail: false,
            visibleCoupon: false,
            maxCols: 3,
            isShowSend: true,
            visible: false,
            user_type: '',
            tableData: {
                data: [],
                total: 0
            },
            listLoading: true,
            wechatIds: '',
            row: '',
            labelPosition: 'right',
            userProps: {
                children: 'children',
                label: 'name',
                value: 'name'
            },
            userFrom: {
                label_id: '',
                user_type: '',
                sex: '',
                is_promoter: '',
                country: '',
                pay_count: '',
                user_time_type: '',
                user_time: '',
                nickname: '',
                province: '',
                city: '',
                page: 1,
                limit: 20,
                group_id: ''
            },
             couponForm: {
                用户标签: '',
                用户类型: '',
                性别: '',
                身份: '',
                消费情况: '',
                访问情况: '',
                访问时间: '',
                昵称: ''
            },
            address: [],
            grid: {
                xl: 8,
                lg: 12,
                md: 12,
                sm: 24,
                xs: 24
            },
            grid2: {
                xl: 18,
                lg: 16,
                md: 12,
                sm: 24,
                xs: 24
            },
            grid3: {
                xl: 8,
                lg: 12,
                md: 12,
                sm: 24,
                xs: 24
            },
            addresData: [],
            groupList: [],
            labelLists: [],
            chkName: '',
            checkedPage: [],
            checkedIds: [], // 订单当前页选中的数据
            noChecked: [], // 订单全选状态下当前页不选中的数据
            allCheck: false
        }
    },
    mounted() {
        this.getTagList()
        this.getList('')
    },
    methods: {
        // 用户
        onHandle(name) {
          this.chkName = this.chkName === name ? '' : name
          this.changeType(!(this.chkName === ''))
        },
        changeType(v) {
          if (v) {
            if (!this.chkName) {
              this.chkName = 'dan'
            }
          } else {
            this.chkName = ''
            this.allCheck = false;
          }
          const index = this.checkedPage.indexOf(this.userFrom.page)
          if (this.chkName === 'dan') {
            this.checkedPage.push(this.userFrom.page)
          } else if (index > -1) {
            this.checkedPage.splice(index, 1)
          }
          this.syncCheckedId()
        },
        syncCheckedId() {
          const ids = this.tableData.data.map(v => v.uid)
          if (this.chkName === 'duo') {
            this.checkedIds = []
            this.allCheck = true;
          } else if (this.chkName === 'dan') {
            this.allCheck = false;
            ids.forEach(id => {
              const index = this.checkedIds.indexOf(id)
              if (index === -1) {
                this.checkedIds.push(id)
              }
            })
          } else {
            ids.forEach(id => {
              const index = this.checkedIds.indexOf(id)
              if (index > -1) {
                this.checkedIds.splice(index, 1)
              }
            })
          }
        },
        // 发送优惠券
        sendCoupon(){
            if(this.checkedIds.length == 0 && this.allCheck == false){
                this.$message.warning('请选择用户')
            }else{
                this.visibleCoupon = true;
            }
        },
        // 分开选择
        changeOne(v, user) {
            if (v) {
                if (this.chkName === 'duo') {
                    const index = this.noChecked.indexOf(user.uid)
                    if (index > -1) this.noChecked.splice(index, 1)
                } else {
                    const index = this.checkedIds.indexOf(user.uid)
                    if (index === -1) this.checkedIds.push(user.uid)
                }
            } else {
                if (this.chkName === 'duo') {
                    const index = this.noChecked.indexOf(user.uid)
                    if (index === -1) this.noChecked.push(user.uid)
                } else {
                    const index = this.checkedIds.indexOf(user.uid)
                    if (index > -1) this.checkedIds.splice(index, 1)
                }
            }
        },
        sendSuccess(){
            this.visibleCoupon = false;
        },
        getCoupounParmas(){
            let label_id = this.userFrom.label_id == '' ? '' : this.getLabelValue(),
            user_type = this.findKey(this.userFrom.user_type,{'':'','微信用户':'wechat','小程序用户':'routine','H5用户':'h5'}),
            sex = this.findKey(this.userFrom.sex,{'男':'1','女':'2','保密':'0','':''}),
            pay_count = this.findKey(this.userFrom.sex,{'0次':'-1','1次及以上':'0','2次及以上':'1','3次及以上':'2','4次及以上':'3','5次及以上':'4','': ''}),          
            is_promoter = this.findKey(this.userFrom.is_promoter,{'推广员':'1','普通用户':'0','':''}),
            user_time_type = this.userFrom.user_time_type == 'visit' ? '最后访问' : this.userFrom.user_time_type == 'add_time' ? '首次访问' : ''
            this.couponForm =  {
                用户标签: label_id,
                用户类型: user_type,
                性别: sex,
                消费情况: pay_count,
                身份: is_promoter,
                访问情况: user_time_type,
                访问时间: this.userFrom.user_time,
                昵称: this.userFrom.nickname
            }
        },
        findKey(value,data, compare = (a, b) => a === b) {
            return Object.keys(data).find(k => compare(data[k], value))
        },
        getLabelValue(){
            let labelName = ''
            for(let i = 0; i < this.labelLists.length; i ++) {
                if(this.labelLists[i]['label_id'] === this.userFrom.label_id) {
                    labelName = this.labelLists[i]['label_name']
                    return labelName
                }
            }
        },

        // 选择时间
        selectChange(tab) {
            this.timeVal = []
            this.userFrom.user_time = tab
            this.getList('')
        },
        // 具体日期
        onchangeTime(e) {
            this.timeVal = e
            this.userFrom.user_time = e ? this.timeVal.join('-') : ''
        },
        userSearchs() {
          if(this.userFrom.user_time_type && (!this.userFrom.user_time)){
            this.$message.error('请选择访问时间')
          }else if(!this.userFrom.user_time_type && (this.userFrom.user_time)){
            this.$message.error('请选择访问情况')
          }else{
            this.getList(1)
          }
          
        },
        // 标签列表
        getTagList() {
            labelLstApi({
                page: 1,
                limit: 9999,
                all: 1
            }).then(res => {
                this.labelLists = res.data.list
            }).catch(res => {
                this.$message.error(res.message)
            })
        },
        // 详情
        onDetails(row) {
            this.row = row
            this.uid = row.uid
            this.visibleDetail = true
        },
        Close() {
            this.visibleDetail = false
        },
        handleClose() {
            this.visible = false
        },

        // 修改标签
        setLabel(id) {
          this.$modalForm(changeGroupApi(id)).then(() => this.getList(''))
        },
        // 列表
        getList(num) {
            this.listLoading = true
            this.userFrom.page = num ? num : this.userFrom.page;
            this.userFrom.user_type = this.user_type
            this.userFrom.province = this.address[0]
            this.userFrom.city = this.address[1]
            if (this.userFrom.user_type === '0') this.userFrom.user_type = ''
            userLstApi(this.userFrom).then(res => {
                this.tableData.data = res.data.list
                this.tableData.total = res.data.count
                this.listLoading = false
                this.getCoupounParmas();
            }).catch(res => {
                this.listLoading = false
                this.$message.error(res.message)
            })
        },
        pageChange(page) {
            this.userFrom.page = page
            this.getList('')
        },
        handleSizeChange(val) {
            this.userFrom.limit = val
            this.getList('')
        },
        handleClick() {
            this.getList('')
        },

        // 重置
        reset() {
            this.userFrom = {
                label_id: '',
                user_type: '',
                sex: '',
                is_promoter: '',
                country: '',
                pay_count: '',
                user_time_type: '',
                user_time: '',
                nickname: '',
                province: '',
                city: '',
                page: 1,
                limit: 20,
                group_id: '',
                date: ''
            },
            this.timeVal = []
            this.getList(1)
        }
    }
}
</script>

<style lang="scss" scoped>
.spBlock {
    cursor: pointer;
    display: block;
    padding: 5px 0;
}

.check {
    color: #00a2d4;
}
.selWidth {
    width: 100% !important;
}

.dia {
    /deep/ .el-dialog__body {
        height: 700px !important;
    }
}

.text-right {
    text-align: right;
}

.container {
    min-width: 821px;

    /deep/.el-form-item {
        width: 100%;
    }

    /deep/.el-form-item__content {
        width: 72%;
    }
}

.vipName {
    color: #dab176
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    font-size: 12px;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33.33%;
}

/deep/[type=reset],
[type=submit],
button,
html [type=button] {
    -webkit-appearance: none !important;
}
.box-container {
  overflow: hidden;
}
.box-container .list {
  line-height: 40px;
  display: flex;
  align-items: center;
}

.box-container .list .name {
  display: inline-block;
  width: 100px;
  text-align: right;
  color: #606266;
}
.box-container .list .blue {
  color: #1890ff;
}
//.box-container .list.image {
//  margin-bottom: 40px;
//}
//.box-container .list.image img {
//  position: relative;
//  top: 40px;
//}
</style>
