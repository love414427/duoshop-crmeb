<template>
    <div>
        <div class="i-layout-page-header">
            <el-card class="product_tabs">
                <div>
                    <router-link :to="{path:'/admin/setting/sms/sms_config/index'}"><el-button icon="el-icon-arrow-left" size="mini" class="mr20">返回</el-button></router-link>
                    <span v-text="$route.meta.title" class="mr20"></span>
                </div>
            </el-card>
        </div>
        <el-card class="ivu-mt">
            <el-tabs v-model="isChecked" @tab-click="onChangeType">
                <el-tab-pane label="短信" name="sms"></el-tab-pane>
                <el-tab-pane label="商品采集" name="copy"></el-tab-pane>
                <el-tab-pane label="物流查询" name="expr_query"></el-tab-pane>
                <el-tab-pane label="电子面单打印" name="expr_dump"></el-tab-pane>
            </el-tabs>
            <el-row :gutter="16" class="mt50" v-loading="spinShow">
                <el-col :span="24" class="ivu-text-left mb20">
                    <el-col :xs="12" :sm="6" :md="4" :lg="2" class="mr20">
                        <span class="ivu-text-right ivu-block">当前剩余条数：</span>
                    </el-col>
                    <el-col :xs="11" :sm="13" :md="19" :lg="20">
                        <span>{{numbers}}</span>
                    </el-col>
                </el-col>
                <el-col :span="24" class="ivu-text-left mb20">
                    <el-col :xs="12" :sm="6" :md="4" :lg="2" class="mr20">
                        <span class="ivu-text-right ivu-block">选择套餐：</span>
                    </el-col>
                    <el-col :xs="11" :sm="13" :md="19" :lg="20">
                        <el-row :gutter="20">
                            <el-col v-for="(item, index) in list" :key="index" :xxl="4" :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
                                <div class="list-goods-list-item mb15" :class="{active:index === current}"
                                     @click="check(item,index)">
                                    <div class="list-goods-list-item-title" :class="{active:index === current}">¥ <i>{{item.price }}</i></div>
                                    <div class="list-goods-list-item-price" :class="{active:index === current}">
                                        <span>{{all[isChecked]}}条数: {{ item.num }}</span>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-col>
                <el-col :span="24" class="ivu-text-left mb20" v-if="checkList">
                    <el-col :xs="12" :sm="6" :md="4" :lg="2" class="mr20">
                        <span class="ivu-text-right ivu-block">充值条数：</span>
                    </el-col>
                    <el-col :xs="11" :sm="13" :md="19" :lg="20">
                        <span>{{checkList.num}}</span>
                    </el-col>
                </el-col>
                <el-col :span="24" class="ivu-text-left mb20" v-if="checkList">
                    <el-col :xs="12" :sm="6" :md="4" :lg="2" class="mr20">
                        <span class="ivu-text-right ivu-block">支付金额：</span>
                    </el-col>
                    <el-col :xs="11" :sm="13" :md="19" :lg="20">
                        <span class="list-goods-list-item-number">￥{{checkList.price}}</span>
                    </el-col>
                </el-col>
                <el-col :span="24" class="ivu-text-left mb20">
                    <el-col :xs="12" :sm="6" :md="4" :lg="2" class="mr20">
                        <span class="ivu-text-right ivu-block">付款方式：</span>
                    </el-col>
                    <el-col :xs="11" :sm="13" :md="19" :lg="20">
                        <span class="list-goods-list-item-pay">微信支付<i v-if="code.invalid">{{'  （ 支付码过期时间：' + code.invalid + ' ）' }}</i></span>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :xs="12" :sm="6" :md="4" :lg="3" class="mr20">&nbsp;</el-col>
                    <el-col :xs="11" :sm="13" :md="19" :lg="20">
                        <div class="list-goods-list-item-code mr20"><img v-lazy="code.code_url" v-if="code.code_url"></div>
                    </el-col>
                </el-col>
            </el-row>
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
    import { smsPriceApi, payCodeApi, isLoginApi, serveInfoApi } from '@/api/setting';
    export default {
        name: 'smsPay',
        data () {
            return {
                all: { 'sms': '短信', 'copy': '商品采集', 'expr_query': '物流查询', 'expr_dump': '电子面单打印' },
                isChecked: 'sms',
                numbers: '',
                account: '',
                list: [],
                current: 0,
                checkList: {},
                spinShow: false,
                code: {}
            }
        },
        created () {
            this.isChecked = this.$route.query.type;
            this.onIsLogin();
        },
        activated(){
            this.isChecked = this.$route.query.type;
        },
        methods: {
            // 查看是否登录
            onIsLogin () {
                this.spinShow = true;
                isLoginApi().then(async res => {
                    let data = res.data;
                    if (!data.status) {
                        this.$message.warning('请先登录');
                        this.$router.push('/admin/setting/sms/sms_config/index?url=' + this.$route.path);
                    } else {
                        this.getServeInfo();
                        this.getPrice();
                    }
                }).catch(res => {
                    this.$message.error(res.message);
                })
            },
            // 平台用户信息
            getServeInfo () {
                serveInfoApi().then(async res => {
                    let data = res.data;
                    switch (this.isChecked) {
                    case 'sms':
                        this.numbers = data.sms.num
                        break;
                    case 'copy':
                        this.numbers = data.copy.num
                        break;
                    case 'expr_dump':
                        this.numbers = data.dump.num
                        break;
                    default:
                        this.numbers = data.query.num
                        break;
                    }
                }).catch(res => {
                    this.$message.error(res.message);
                })
            },
            onChangeType (val) {
                this.current = 0;
                this.getPrice();
                this.getServeInfo();
            },
            // 支付套餐
            getPrice () {
                this.spinShow = true;
                smsPriceApi(this.isChecked).then(async res => {
                    setTimeout(() => {
                        this.spinShow = false;
                    }, 800);
                    let data = res.data;
                    this.list = data.data;
                    this.checkList = this.list[0];
                    this.getCode(this.checkList);
                }).catch(res => {
                    this.spinShow = false;
                    this.$message.error(res.message);
                    this.list = [];
                })
            },
            // 选中
            check (item, index) {
                this.spinShow = true;
                this.current = index;
                setTimeout(() => {
                    this.getCode(item);
                    this.checkList = item;
                    this.spinShow = false;
                }, 800);
            },
            // 支付码
            getCode (item) {
                let data = {
                    pay_type: 'weixin',
                    meal_id: item.id,
                    price: item.price,
                    num: item.num,
                    type: item.type
                };
                payCodeApi(data).then(async res => {
                    this.code = res.data;
                }).catch(res => {
                    this.code = '';
                    this.$message.error(res.message);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .active{
        background: #0091FF;
        box-shadow:0px 6px 20px 0px rgba(0, 145, 255, 0.3);
        color: #fff !important;
    }
    .list-goods-list-item{
        border: 1px solid #DADFE6;
        padding: 20px 10px;
        box-sizing: border-box;
        border-radius:3px;
    }
    .list-goods-list{
        &-item{
            text-align: center;
            position: relative;
            cursor: pointer;
            img{
                width: 60%;
            }
            .ivu-tag{
                position: absolute;
                top: 10px;
                right: 10px;
            }
            &-title{
                font-size: 16px;
                font-weight: bold;
                color: #0091FF;
                margin-bottom: 3px;
                i{
                    font-size: 30px;
                    font-style: normal;
                }
            }
            &-desc{
                font-size: 14px;
                color: #808695;
            }
            &-price{
                font-size: 14px;
                color: #000000;
                s{
                    color: #c5c8ce;
                }
            }
            &-number{
                font-size: 14px;
                color: #ED4014;
            }
            &-pay{
                font-size: 14px;
                color: #00C050;
                i{
                    font-size: 12px;
                    font-style: normal;
                    color: #6D7278;
                }
            }
            &-code{
                width: 130px;
                height: 130px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>
