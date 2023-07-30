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
                            <el-form-item label="会员昵称：">
                                <el-input v-model="userFrom.nickname" placeholder="请输入昵称" clearable class="selWidth" />
                            </el-form-item>
                            <el-form-item label="手机号：">
                                <el-input v-model="userFrom.phone" placeholder="请输入手机号" clearable class="selWidth" />
                            </el-form-item>
                            <el-form-item label="用户ID：">
                                <el-input v-model="userFrom.uid" placeholder="请输入用户ID" clearable class="selWidth" />
                            </el-form-item>
                        </el-col>
                        <template v-if="collapse">
                            <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                                <el-col v-bind="grid">
                                    <el-form-item label="会员分组：">
                                        <el-select v-model="userFrom.group_id" placeholder="请选择" class="selWidth" clearable filterable>
                                            <el-option value="">全部</el-option>
                                            <el-option v-for="(item, index) in groupList" :key="index" :value="item.group_id" :label="item.group_name" />
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col v-bind="grid">
                                    <el-form-item label="会员标签：">
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
                                                <span>普通会员</span>
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
            <div>
                <el-button class="mr10" size="mini" @click="createUser">创建用户</el-button>             
                <el-button v-show="user_type === 'wechat'" size="mini" class="mr10" @click="sendNews">发送图文消息</el-button>
                <el-button v-show="checkedIds.length != 0" size="mini" class="mr10" @click="batchGroup">批量设置分组</el-button>
                <el-button v-show="checkedIds.length != 0" size="mini" @click="batchlabel">批量设置标签</el-button>
                <el-button type="primary" icon="ios-search" label="default" class="mr15" size="mini" @click="sendCoupon">发送优惠券</el-button>
            </div>
            <el-alert v-if="checkedIds.length>0 || allCheck" :title="allCheck ? `已选择  ${tableData.total}  项` : `已选择  ${checkedIds.length}  项`" type="info" show-icon />
            <!-- <el-alert v-if="multipleSelection.length>0" :title="`已选择  ${multipleSelection.length}  项`" type="info" show-icon /> -->
        </div>
        <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="small" highlight-current-row @selection-change="handleSelectionChange">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="首次访问：">
                            <span>{{ props.row.create_time }}</span>
                        </el-form-item>
                        <el-form-item label="近次访问：">
                            <span>{{ props.row.last_time }}</span>
                        </el-form-item>
                        <el-form-item label="身份证号：">
                            <span>{{ props.row.card_id }}</span>
                        </el-form-item>
                        <el-form-item label="手机号：">
                            <span>{{ props.row.phone }}</span>
                        </el-form-item>
                        <el-form-item label="真实姓名：">
                            <span>{{ props.row.real_name }}</span>
                        </el-form-item>
                        <el-form-item label="标签：">
                            <span v-for="(item, index) in props.row.label" :key="index" v-text="item" />
                        </el-form-item>
                        <el-form-item label="生日：">
                            <span>{{ props.row.birthday }}</span>
                        </el-form-item>
                        <el-form-item label="地址：">
                            <span>{{ props.row.addres }}</span>
                        </el-form-item>
                        <el-form-item label="备注：">
                            <span>{{ props.row.mark }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <!-- <el-table-column type="selection" width="55" /> -->

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
                <el-checkbox :disabled="scope.row.cancel_time" :value="!scope.row.cancel_time && (checkedIds.indexOf(scope.row.uid) > -1 || (chkName === 'duo' && noChecked.indexOf(scope.row.uid) === -1))" @change="(v)=>changeOne(v,scope.row)" />
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
            <el-table-column label="昵称" min-width="150">
                <template slot-scope="{row}">
                    <div class="acea-row">
                        <i v-show="row.sex===1" class="el-icon-male mr5" style="font-size: 15px; margin-top: 3px; color:#2db7f5;" />
                        <i v-show="row.sex===2" class="el-icon-female mr5" style="font-size: 15px; margin-top: 3px; color:#ed4014;" />
                        <div v-text="row.nickname" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="is_svip" label="付费会员" min-width="120">
                 <template slot-scope="{row}">
                    <span>{{row.is_svip > 0 ? "是" : "否"}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号" min-width="120" />
            <el-table-column label="等级" min-width="100">
                <template slot-scope="{row}">
                    <span>{{ row.member?row.member.brokerage_name:'-' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="分组" min-width="100">
                <template slot-scope="{row}">
                    <span>{{ row.group?row.group.group_name:'无' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="推荐人" min-width="140">
                <template slot-scope="{row}">
                  <span>{{ row.spread ? row.spread.nickname + ' / ' + row.spread.uid : '-'  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户类型" min-width="100">
              <template slot-scope="{row}">
                <span>{{ row.user_type === 'routine' ? '小程序' : row.user_type === 'wechat' ? '公众号' : row.user_type === 'app' || row.user_type === 'App' ? 'App' : row.user_type === 'pc' ? 'PC' : 'H5' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="now_money" label="余额" sortable min-width="100" :sort-method="(a,b)=>{return a.now_money - b.now_money}"/>
            <el-table-column prop="integral" label="当前可用积分" min-width="100" />
            <el-table-column label="操作" min-width="130" fixed="right">
                <template slot-scope="scope">
                    <el-button v-if="!scope.row.cancel_time" type="text" size="small" class="mr10" @click="onEdit(scope.row.uid)">编辑</el-button>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            更多<i class="el-icon-arrow-down el-icon--right" />
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="onDetails(scope.row.uid)">用户详情</el-dropdown-item>                            
                            <el-dropdown-item v-if="!scope.row.cancel_time" @click.native="setMoney(scope.row)">设置余额</el-dropdown-item>
                            <el-dropdown-item v-if="!scope.row.cancel_time" @click.native="changeIntegral(scope.row)">设置积分</el-dropdown-item>
                            <el-dropdown-item v-if="scope.row.vip_name && !scope.row.cancel_time">清除等级</el-dropdown-item>
                            <el-dropdown-item v-if="!scope.row.cancel_time" @click.native="setGroup(scope.row)">设置分组</el-dropdown-item>
                            <el-dropdown-item v-if="!scope.row.cancel_time" @click.native="setLabel(scope.row)">设置标签</el-dropdown-item>
                            <el-dropdown-item v-if="!scope.row.cancel_time" @click.native="setModify(scope.row)">修改推荐人</el-dropdown-item>
                            <el-dropdown-item v-if="!scope.row.cancel_time" @click.native="setPassword(scope.row)">修改密码</el-dropdown-item>
                            <el-dropdown-item v-if="!scope.row.cancel_time" @click.native="setMember(scope.row)">编辑会员等级</el-dropdown-item>
                             <el-dropdown-item v-if="!scope.row.cancel_time" @click.native="giveMember(scope.row)">付费会员设置</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="userFrom.limit" :current-page="userFrom.page" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange" @current-change="pageChange" />
        </div>
    </el-card>
    <el-dialog title="提示" :visible.sync="visible" width="1000px" :before-close="handleClose" class="dia">
        <news-category v-if="visible" :is-show-send="isShowSend" :wechat-ids="wechatIds" :user-ids="ids" :max-cols="maxCols" />
        <!--<span slot="footer" class="dialog-footer" />-->
    </el-dialog>
    <!--用户详情-->
    <user-detail
        @closeDrawer="closeDrawer"
        @changeDrawer="changeDrawer"
        @onEdit="onEdit"
        @setMoney="setMoney"
        @changeIntegral="changeIntegral"
        @setGroup="setGroup"
        @setLabel="setLabel"
        @setModify="setModify"
        @setPassword="setPassword"
        @setMember="setMember"
        @giveMember="giveMember"
        :drawer="drawer" 
        ref="userDetails" 
        :cancel-time="cancel_time" />

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
    changelabelApi,
    changeNowMoneyApi,
    changeNowIntegralApi,
    batchChangeGroupApi,
    batchChangelabelApi,
    userUpdateApi,
    groupLstApi,
    labelLstApi,
    modifyUserReferrer,
    modifyUserPassword,
    changeMemberApi,
    createUserApi,
    giveMemberApi
} from '@/api/user'
import newsCategory from '@/components/newsCategory/index.vue'
import userDetail from './userDetails'
import couponList from './couponList'

export default {
    name: 'UserList',
    components: {
        newsCategory,
        userDetail,
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
            drawer: false,
            maxCols: 3,
            isShowSend: true,
            visible: false,
            user_type: '',
            tableData: {
                data: [],
                total: 0
            },
            uid: "",
            listLoading: true,
            multipleSelection: [],
            ids: '',
            wechatIds: '',
            uid: '',
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
                phone: '',
                province: '',
                city: '',
                page: 1,
                limit: 20,
                group_id: ''
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
            checkedIds: [], // 订单当前页选中的数据
            noChecked: [], // 订单全选状态下当前页不选中的数据
            checkedPage: [],
            visibleCoupon: false,
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
            allCheck: false,
            cancel_time: null

        }
    },
    mounted() {
        this.groupLists()
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
        //   const ids = this.tableData.data.map(v => v.uid)
          const ids = this.tableData.data.map(v => {
              if (!v.cancel_time) {
                  return v.uid
              }
          })
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
          console.log("分开选择",this.checkedIds)

        },
         // 发送优惠券
        sendCoupon(){
            if(this.checkedIds.length == 0 && this.allCheck == false){
                this.$message.warning('请选择用户')
            }else{
                this.visibleCoupon = true;
            }
        },
        sendSuccess(){
            this.visibleCoupon = false;
        },
        getCoupounParmas(){
            let label_id = this.userFrom.label_id == '' ? '' : this.getLabelValue(),
            user_type = this.findKey(this.userFrom.user_type,{'':'','微信用户':'wechat','小程序用户':'routine','H5用户':'h5'}),
            sex = this.findKey(this.userFrom.sex,{'男':'1','女':'2','保密':'0','':''}),
            pay_count = this.findKey(this.userFrom.sex,{'0次':'-1','1次以上':'0','2次以上':'1','3次以上':'2','4次以上':'3','5次以上':'4','': ''}),          
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
        // 创建用户
        createUser() {
            this.$modalForm(createUserApi()).then(() => this.getList(''))
        },
        // 分组列表
        groupLists() {
            groupLstApi({
                page: 1,
                limit: 9999
            }).then(async res => {
                this.groupList = res.data.list
            }).catch(res => {
                this.$message.error(res.message)
            })
        },
        // 标签列表
        getTagList() {
            labelLstApi({
                page: 1,
                limit: 9999
            }).then(res => {
                this.labelLists = res.data.list
            }).catch(res => {
                this.$message.error(res.message)
            })
        },
        // 账户详情
        onDetails(id) {
            this.drawer = true
            this.uid = id
            this.cancel_time = this.tableData.data.find(item => item.uid === id).cancel_time
            this.$refs.userDetails.getData(id);
            
        },
        closeDrawer() {
            this.drawer = false
        },
        changeDrawer(v) {
            this.drawer = v;
        },
        sendNews() {
            if (this.checkedIds.length === 0 && this.allCheck == false) return this.$message.warning('请先选择用户')
            this.visible = true
            this.wechatIds = this.getWechatUsers(this.tableData.data, this.checkedIds)
            
        },
        handleClose() {
            this.visible = false
        },
        /**获取选中的微信用户Id */
        getWechatUsers(arr1, arr2){
            let newArr = [];
            if(this.allCheck){
                for (let i = 0; i < arr1.length; i++) {
                    if(arr1[i]['wechat_user_id']){
                        newArr.push(arr1[i]['wechat_user_id']);
                    }
                } 
            }else{
                for (let i = 0; i < arr1.length; i++) {
                    for (let j = 0; j < arr2.length; j++) {
                        if(arr1[i]['uid'] === arr2[j] && arr1[i]['wechat_user_id']){
                            newArr.push(arr2[j]);
                        }
                    }
                }
            }
             return newArr;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
            const data = []
            const wechatData = []
            this.multipleSelection.map((item) => {
                data.push(item.uid)
                wechatData.push(item.wechat_user_id)
            })
            this.ids = data.join(',')
            this.wechatIds = wechatData.join(',')
        },
        // 修改分组
        setGroup(row) {
            this.$modalForm(changeGroupApi(row.uid)).then(() => this.getList(''))
        },
        // 批量分组
        batchGroup() {
            if (this.checkedIds.length === 0) return this.$message.warning('请先选择用户')
            this.$modalForm(batchChangeGroupApi({
                ids: (this.checkedIds).join(",")
            }))
        },
        // 批量标签
        batchlabel() {
            if (this.checkedIds.length === 0) return this.$message.warning('请先选择用户')
            this.$modalForm(batchChangelabelApi({
                ids: (this.checkedIds).join(",")
            }))
        },
        // 修改标签
        setLabel(row) {
            this.$modalForm(changelabelApi(row.uid)).then(() => this.getList(''))
        },
        // 编辑会员等级
        setMember(row) {
            this.$modalForm(changeMemberApi(row.uid)).then(() => this.getList(''))
        },
        // 赠送付费会员
        giveMember(row) {  
            this.$modalForm(giveMemberApi(row.uid)).then(() => this.getList(''))
        },
        // 修改推荐人
        setModify(row){
            this.$modalForm(modifyUserReferrer(row.uid)).then(({ message }) => {
                this.getList('');
            });
        },
        // 修改密码
        setPassword(row){
            this.$modalForm(modifyUserPassword(row.uid)).then(() => this.getList(''));
        },
        // 修改余额
        setMoney(row) {
            this.$modalForm(changeNowMoneyApi(row.uid)).then(() => this.getList(''))
        },
        // 修改积分余额
        changeIntegral(row){            
            this.$modalForm(changeNowIntegralApi(row.uid)).then(() => this.getList(''))
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
                this.checkedIds = [];

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
        // 编辑
        onEdit(id) {
            this.$modalForm(userUpdateApi(id)).then(() => this.getList(''))
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
                group_id: ''
            }
            this.timeVal=[]
            this.getList(1)
        }
    }
}
</script>

<style lang="scss" scoped>
.check {
    color: #00a2d4;
}
.selWidth {
    // width: 100% !important;
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
</style>
