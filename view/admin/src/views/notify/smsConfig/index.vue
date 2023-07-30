<template>
    <div>
        <div class="divBox">
            <!-- <el-card class="product_tabs" title="一号通账户" hidden-breadcrumb v-if="!isShowList"></el-card> -->
            <el-card v-if="isShowList" class="box-card">
                 <div slot="header" class="clearfix">
                     <div class="content acea-row row-middle">
                        <div class="demo-basic--circle acea-row row-middle">
                            <el-avatar :size="50" class="dashboard-workplace-header-avatar" :src="imgUrl" />
                            <div class="dashboard-workplace-header-tip">
                                <div class="dashboard-workplace-header-tip-title">{{smsAccount}}，祝您每一天开心！</div>
                                <div class="dashboard-workplace-header-tip-desc">
                                    <span class="mr10"  @click="onChangePassswordIndex">修改密码</span>
                                    <span class="mr10"  @click="signOut">退出登录</span>
                                </div>
                            </div>
                        </div>
                        <div class="dashboard-workplace-header-extra">
                            <div class="acea-row">
                                <div class="header-extra">
                                    <div class="mb-5"><span>短信条数</span></div>
                                    <el-button class="open_btn" size="small" type="primary" v-if="sms.open ===0" @click="onOpen('sms')">开通服务</el-button>
                                    <div v-else>
                                        <div>{{sms.num || 0}}</div>
                                        <el-button size="small" type="primary" class="mt3" @click="mealPay('sms')">套餐购买</el-button>
                                    </div>
                                </div>
                                <div class="header-extra">
                                    <div class="mb-5"><span>采集次数</span></div>
                                        <el-button class="open_btn" size="small" type="primary" v-if="copy.open ===0" @click="onOpen('copy')">开通服务</el-button>
                                        <div v-else>
                                        <div>{{copy.num || 0}}</div>
                                        <el-button size="small" type="primary" class="mt3" @click="mealPay('copy')">套餐购买</el-button>
                                    </div>
                                </div>
                                <div class="header-extra">
                                <div class="mb-5"><span>物流查询次数</span></div>
                                <el-button class="open_btn" size="small" type="primary" v-if="query.open ===0" @click="onOpen('query')">开通服务</el-button>
                                <div v-else>
                                    <div>{{query.num || 0}}</div>
                                    <el-button size="small" type="primary" class="mt3" @click="mealPay('expr_query')">套餐购买</el-button>
                                </div>
                            </div>
                                <div class="header-extra">
                                    <div class="mb-5"><span>面单打印次数</span> </div>
                                    <el-button class="open_btn" size="small" type="primary" v-if="dump.open ===0" @click="onOpen('dump')">开通服务</el-button>
                                    <div v-else>
                                        <div>{{dump.num || 0}}</div>
                                        <el-button size="small" type="primary" class="mt3" @click="mealPay('expr_dump')">套餐购买</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>
                 </div>              
            </el-card>
        </div>
        <el-card class="ivu-mt">
            <login-from @change="onChangePasssword" v-if="isShowLogn" @changes="onChangeReg" @on-Login="onLogin"></login-from>
            <forget-password v-if="isShow" @goback="goback" @on-Login="onLogin" :isIndex="isIndex"></forget-password>
            <register-from v-if="isShowReg" @change="logoup"></register-from>
            <table-list ref="tableLists" v-if="isShowList" :sms="sms" :copy="copy" :dump="dump" :query="query" :accountInfo="accountInfo" @openService="openService"></table-list>          
        </el-card>
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
    import loginFrom from './components/loginFrom';
    import forgetPassword from './components/forgetPassword';
    import registerFrom from './components/register';
    import tableList from './tableList';
    import { roterPre } from '@/settings'
    import { isLoginApi, logoutApi, serveInfoApi } from '@/api/setting';
    export default {
        name: 'smsConfig',
        components: { loginFrom, forgetPassword, registerFrom, tableList },
        data () {
            return {
                imgUrl: require('@/assets/images/ren.png'),
                spinShow: false,
                isShowLogn: false, // 登录
                isShow: false, // 修改密码
                isShowReg: false, // 注册
                isShowList: false, // 登录之后列表
                smsAccount: '',
                accountInfo:{},
                isForgetPhone: false, // 修改手机号
                isIndex: false, // 判断忘记密码返回的路径
                sms: { open: 0 }, // 短信信息
                query: { open: 0 }, // 物流查询
                dump: { open: 0 }, // 电子面单打印
                copy: { open: 0 } // 商品采集
            }
        },
        created () {
            this.onIsLogin();
        },
        methods: {
            onOpen (val) {
                this.$refs.tableLists.onOpenIndex(val)
            },
            mealPay (val) {
                this.$router.push(`${roterPre}/setting/sms/sms_pay/index?type=${val}`);
            },
            // 开通服务
            openService (val) {
                switch (val) {
                case 'sms':
                    this.sms.open = 1
                    break;
                case 'copy':
                    this.copy.open = 1
                    break;
                default:
                    this.dump.open = 1
                    this.query.open = 1
                    break;
                }
            },
            // 平台用户信息
            getServeInfo () {
                this.spinShow = true;
                serveInfoApi().then(async res => {
                    let data = res.data;
                    this.sms = {
                        num: data.sms.num,
                        open: data.sms.open,
                        surp: data.sms.open
                    };
                    this.query = {
                        num: data.query.num,
                        open: data.query.open,
                        surp: data.query.open
                    };
                    this.dump = {
                        num: data.dump.num,
                        open: data.dump.open,
                        surp: data.dump.open
                    };
                    this.copy = {
                        num: data.copy.num,
                        open: data.copy.open,
                        surp: data.copy.open
                    };
                    this.spinShow = false;
                    this.smsAccount = data.account;
                    this.accountInfo = data;
                }).catch(res => {
                    this.$message.error(res.message);
                    this.isShowLogn = true;
                    this.isShowList = false;
                    this.spinShow = false;
                })
            },
            // 查看是否登录
            onIsLogin () {
                this.spinShow = true;
                isLoginApi().then(async res => {
                    let data = res.data;
                    this.isShowLogn = !data.status;
                    this.isShowList = data.status;
                    this.spinShow = false;
                    if (data.status) {
                        this.getServeInfo();
                    }
                }).catch(res => {
                    this.spinShow = false;
                    this.$message.error(res.message);
                })
            },
            // 退出登录
            signOut () {
                logoutApi().then(async res => {
                    this.isShowLogn = true;
                    this.isShowList = false;
                }).catch(res => {
                    this.$message.error(res.message);
                })
            },
            // 修改密码
            onChangePassswordIndex () {
                this.isIndex = true;
                this.passsword();
            },
            // 忘记密码
            onChangePasssword () {
                this.isIndex = false;
                // this.isShow = true;
                this.passsword();
                // this.isShowLogn = false;
                // this.isShow = true;
                // this.isShowList = false;
            },
            passsword () {
                this.isShowLogn = false;
                this.isShow = true;
                this.isShowList = false;
            },

            // 立即注册
            onChangeReg () {
                this.isShowLogn = false;
                this.isShow = false;
                this.isShowReg = true;
            },
            // 立即登录
            logoup () {
                this.isShowLogn = true;
                this.isShow = false;
                this.isShowReg = false;
            },
            // 登录跳转
            onLogin () {
                let url = this.$route.query.url;
                if (url) {
                    this.$router.replace(url);
                } else {
                    this.isShowLogn = false;
                    this.isShow = false;
                    this.isShowReg = false;
                    this.isForgetPhone = false;
                    this.isShowList = true;
                    this.getServeInfo();
                }
            },
            // 密码返回
            goback () {
                if (this.isIndex) {
                    this.isShowList = true;
                    this.isShow = false;
                } else {
                    this.isShowLogn = true;
                    this.isShow = false;
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    $cursor: #1890ff;
    .content{
        justify-content: space-between;
    }
    .dashboard-workplace-header-tip-desc{
      display: block;
    span{
      font-size: 12px;
      color: $cursor;
      cursor: pointer;
      display: inline-block;
    }
  }
  .dashboard-workplace-header-extra{
    width: auto!important;
    min-width: 400px;
    .el-button{
        margin-top: 5px;
    }
    .open_btn{
        margin-top: 21px;
    }
  }
    .dashboard{
        width: auto;
        min-width: 300px;
    }
    .header-extra{
        // width: 25%;
        border-right: 1px solid #E9E9E9;
        text-align: center;
        padding: 0 18px;
    }
    .page-account-top-tit{
        font-size: 21px;
        color: #1890FF;
    }
    .dashboard-workplace{
        &-header{
            &-avatar{
                width: 64px;
                height: 64px;
                border-radius: 50%;
                margin-right: 16px;
            }
            &-tip{
                display: inline-block;
                vertical-align: middle;
                &-title{
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 12px;
                }
                &-desc{
                    color: #808695;
                }
            }
            &-extra{
                .ivu-col{
                    p{
                        text-align: right;
                    }
                    p:first-child{
                        span:first-child{
                            margin-right: 4px;
                        }
                        span:last-child{
                            color: #808695;
                        }
                    }
                    p:last-child{
                        font-size: 22px;
                    }
                }
            }
        }
    }
    .conBox{
      .ivu-page-header-extra{
            width: auto !important;
            min-width: 457px;
        }
        .ivu-page-header{
            padding: 16px 0px 0 32px !important;
        }
    }
</style>
