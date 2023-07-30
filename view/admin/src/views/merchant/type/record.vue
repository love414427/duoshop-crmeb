<template>
<div class="divBox">
    <el-card class="box-card mb20">
        <div slot="header" class="clearfix">
            <router-link v-if="$route.params.type === '1'" :to="{path:roterPre+'/merchant/list'}">
                <el-button size="mini" class="mr20 mb20" icon="el-icon-back">返回</el-button>
            </router-link>
            <router-link v-else :to="{path:roterPre+'/accounts/reconciliation'}">
                <el-button size="mini" class="mr20 mb20" icon="el-icon-back">返回</el-button>
            </router-link>
            <div v-if="$route.params.type === '1'" class="filter-container">
                <el-form :inline="true">
                    <el-form-item label="使用状态：" class="mr20">
                        <el-select v-model="tableFrom.status" placeholder="请选择评价状态" @change="init">
                            <el-option label="全部" value="" />
                            <el-option label="未对账" value="0" />
                            <el-option label="已对账" value="1" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时间选择：" class="mr10">
                        <el-date-picker v-model="timeVal" type="daterange" align="right" unlink-panels format="yyyy 年 MM 月 dd 日" value-format="yyyy/MM/dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @change="onchangeTime" />
                    </el-form-item>
                </el-form>
            </div>
            <el-button v-if="$route.params.type === '1'" size="small" type="primary" @click="onAdd(0)">商户对账</el-button>
        </div>
        <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini" class="table" highlight-current-row>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand demo-table-expands">
                        <el-form-item label="收货人：">
                            <span>{{ props.row.real_name | filterEmpty }}</span>
                        </el-form-item>
                        <el-form-item label="电话：">
                            <span>{{ props.row.user_phone | filterEmpty }}</span>
                        </el-form-item>
                        <el-form-item label="地址：">
                            <span>{{ props.row.user_address | filterEmpty }}</span>
                        </el-form-item>
                        <el-form-item label="商品总数：">
                            <span>{{ props.row.total_num | filterEmpty }}</span>
                        </el-form-item>
                        <el-form-item label="支付状态：">
                            <span>{{ props.row.pay_type | payTypeFilter }}</span>
                        </el-form-item>
                        <el-form-item label="支付时间：">
                            <span>{{ props.row.pay_time | filterEmpty }}</span>
                        </el-form-item>
                        <el-form-item label="对账备注：">
                            <span>{{ props.row.admin_mark }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column v-if="$route.params.type === '1'" width="50">
                <template slot="header" slot-scope="scope">
                    <el-popover placement="top-start" width="100" trigger="hover" class="tabPop">
                        <div>
                            <span class="spBlock onHand" :class="{'check': chkName === 'dan'}" @click="onHandle('dan',scope.$index)">选中本页</span>
                            <span class="spBlock onHand" :class="{'check': chkName === 'duo'}" @click="onHandle('duo')">选中全部</span>
                        </div>
                        <el-checkbox slot="reference" :value="(chkName === 'dan' && checkedPage.indexOf(tableFrom.page) > -1) || chkName === 'duo'" @change="changeType" />
                    </el-popover>
                </template>
                <template slot-scope="scope">
                    <el-checkbox :value="checkedIds.indexOf(scope.row.order_id) > -1 || (chkName === 'duo' && noChecked.indexOf(scope.row.order_id) === -1)" @change="(v)=>changeOne(v,scope.row)" />
                </template>
            </el-table-column>
            <el-table-column prop="order_id" label="ID" width="60" />
            <el-table-column label="是否对账" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.reconciliation_id | reconciliationFilter }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="order_sn" label="订单编号" min-width="190" />
            <el-table-column label="商品信息" min-width="330">
                <template slot-scope="scope">
                    <div v-for="(val, i ) in scope.row.orderProduct" :key="i" class="tabBox acea-row row-middle">
                        <div class="demo-image__preview">
                            <el-image :src="val.cart_info.product.image" :preview-src-list="[val.cart_info.product.image]" />
                        </div>
                        <span class="tabBox_tit">{{ val.cart_info.product.store_name + ' | ' }}{{ val.cart_info.productAttr.sku }}</span>
                        <span class="tabBox_pice">{{ '￥'+ val.cart_info.productAttr.price + ' x '+ val.product_num }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="商品总价" min-width="150">
                <template slot-scope="scope">
                    <span>{{ getTotal(scope.row.orderProduct) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="pay_price" label="实际支付" min-width="100" />
            <el-table-column label="佣金金额" min-width="100">
              <template slot-scope="scope">
                <span>{{Number(scope.row.extension_one)+Number(scope.row.extension_two)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="total_postage" label="邮费" min-width="100" />
          <el-table-column prop="order_rate" label="手续费" min-width="100" />
            <el-table-column prop="create_time" label="下单时间" min-width="150" />
            <el-table-column v-if="$route.params.type === '1'" label="操作" min-width="80" fixed="right" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addMark(scope.row.order_id)">添加备注</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block mb20">
            <el-pagination :page-sizes="[10, 20, 30, 40]" :page-size="tableFrom.limit" :current-page="tableFrom.page" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange" @current-change="pageChange" />
        </div>
    </el-card>
    <el-card class="box-card">
        <el-table v-loading="listLoading" :data="tableDataRefund.data" style="width: 100%" size="mini" class="table" highlight-current-row>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="订单号：">
                            <span>{{ props.row.order.order_sn }}</span>
                        </el-form-item>
                        <el-form-item label="退款商品总价：">
                            <span>{{ getTotalRefund(props.row.refundProduct) }}</span>
                        </el-form-item>
                        <el-form-item label="退款商品总数：">
                            <span>{{ props.row.refund_num }}</span>
                        </el-form-item>
                        <el-form-item label="申请退款时间：">
                            <span>{{ props.row.create_time | filterEmpty }}</span>
                        </el-form-item>
                        <el-form-item label="对账备注：">
                            <span>{{ props.row.admin_mark }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column v-if="$route.params.type === '1'" width="50">
                <template slot="header" slot-scope="scope">
                    <el-popover placement="top-start" width="100" trigger="hover" class="tabPop">
                        <div>
                            <span class="spBlock onHand" :class="{'check': chkNameRefund === 'dan'}" @click="onHandleRefund('dan',scope.$index)">选中本页</span>
                            <span class="spBlock onHand" :class="{'check': chkNameRefund === 'duo'}" @click="onHandleRefund('duo')">选中全部</span>
                        </div>
                        <el-checkbox slot="reference" :value="(chkNameRefund === 'dan' && checkedPage.indexOf(tableFrom.page) > -1) || chkNameRefund === 'duo'" @change="changeTypeRefund" />
                    </el-popover>
                </template>
                <!--:disabled="isDisabled"-->
                <template slot-scope="scope">
                    <el-checkbox :value="refundCheckedIds.indexOf(scope.row.refund_order_id) > -1 || (chkNameRefund === 'duo' && refundNoChecked.indexOf(scope.row.refund_order_id) === -1)" @change="(v)=>changeOneRefund(v,scope.row)" />
                </template>
            </el-table-column>
            <el-table-column prop="refund_order_id" label="ID" width="60" />
            <el-table-column label="退款单号" min-width="170">
                <template slot-scope="scope">
                    <span style="display: block;" v-text="scope.row.refund_order_sn" />
                    <span v-show="scope.row.is_del > 0" style="color: #ED4014;display: block;">用户已删除</span>
                </template>
            </el-table-column>
            <el-table-column label="是否对账" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.reconciliation_id | reconciliationFilter }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="user.nickname" label="用户信息" min-width="130" />
            <el-table-column prop="refund_price" label="退款金额" min-width="130" />
            <el-table-column prop="nickname" label="商品信息" min-width="330">
                <template slot-scope="scope">
                    <div v-for="(val, i ) in scope.row.refundProduct" :key="i" class="tabBox acea-row row-middle">
                        <div class="demo-image__preview">
                            <el-image :src="val.product.cart_info.product.image" :preview-src-list="[val.product.cart_info.product.image]" />
                        </div>
                        <span class="tabBox_tit">{{ val.product.cart_info.product.store_name + ' | ' }}{{ val.product.cart_info.productAttr.sku }}</span>
                        <span class="tabBox_pice">{{ '￥'+ val.product.cart_info.productAttr.price + ' x '+ val.product.product_num }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="serviceScore" label="订单状态" min-width="250">
                <template slot-scope="scope">
                    <span style="display: block">{{ scope.row.status | orderRefundFilter }}</span>
                    <span style="display: block">退款原因：{{ scope.row.refund_message }}</span>
                    <!--<p>备注说明：{{scope.row.mark}}</p>-->
                    <span style="display: block">状态变更时间：{{ scope.row.status_time }}</span>
                    <!--<p>备注凭证：{{}}</p>-->
                </template>
            </el-table-column>
            <el-table-column v-if="$route.params.type === '1'" key="10" label="操作" min-width="80" fixed="right" align="center">

                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="onOrderMark(scope.row.refund_order_id)">订单备注</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination :page-sizes="[10, 20, 30, 40]" :page-size="tableFrom.limit" :current-page="tableFrom.page" layout="total, sizes, prev, pager, next, jumper" :total="tableDataRefund.total" @size-change="handleSizeChangeRefund" @current-change="pageChangeRefund" />
        </div>
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
import {
    merOrderListApi,
    refundOrderListApi,
    orderMarkApi,
    refundMarkApi,
    reconciliationApi
} from '@/api/merchant'
import {
    reconciliationOrderApi,
    reconciliationRefundApi
} from '@/api/accounts'
import {
    roterPre
} from '@/settings'
export default {
    name: 'Record',
    data() {
        return {
            roterPre: roterPre,
            chkName: '',
            chkNameRefund: '',
            isIndeterminate: true,
            resource: [],
            visible: false,
            timeVal: [],
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                        picker.$emit('pick', [start, end])
                    }
                }]
            },
            listLoading: true,
            tableData: {
                data: [],
                total: 0
            },
            tableDataRefund: {
                data: [],
                total: 0
            },
            tableFrom: {
                page: 1,
                limit: 10,
                date: '',
                status: ''
            },
            ids: [],
            idsRefund: [],
            checkedPage: [],
            checkedIds: [], // 订单当前页选中的数据
            noChecked: [], // 订单全选状态下当前页不选中的数据
            refundCheckedIds: [], // 退款单当前页选中的数据
            refundNoChecked: [] // 退款单全选状态下当前页不选中的数据
        }
    },
    mounted() {
        this.init()
    },
    created() {
        this.tempRoute = Object.assign({}, this.$route)
    },
    methods: {
        isDisabled(row) {
            if (row.status !== 3) {
                return false
            }
            return true
        },
        init() {
            this.tableFrom.page = 1
            this.getList()
            this.getRefundList()
            if (this.$route.params.type === 0) {
                this.setTagsViewTitle()
            }
        },
        // 订单
        onHandle(name) {
            this.chkName = this.chkName === name ? '' : name
            this.changeType(!(this.chkName === ''))
        },
        changeOne(v, order) {
            if (v) {
                if (this.chkName === 'duo') {
                    const index = this.noChecked.indexOf(order.order_id)
                    if (index > -1) this.noChecked.splice(index, 1)
                } else {
                    const index = this.checkedIds.indexOf(order.order_id)
                    if (index === -1) this.checkedIds.push(order.order_id)
                }
            } else {
                if (this.chkName === 'duo') {
                    const index = this.noChecked.indexOf(order.order_id)
                    if (index === -1) this.noChecked.push(order.order_id)
                } else {
                    const index = this.checkedIds.indexOf(order.order_id)
                    if (index > -1) this.checkedIds.splice(index, 1)
                }
            }
        },
        changeType(v) {
            if (v) {
                if (!this.chkName) {
                    this.chkName = 'dan'
                }
            } else {
                this.chkName = ''
            }
            const index = this.checkedPage.indexOf(this.tableFrom.page)
            if (this.chkName === 'dan') {
                this.checkedPage.push(this.tableFrom.page)
            } else if (index > -1) {
                this.checkedPage.splice(index, 1)
            }
            this.syncCheckedId()
        },
        syncCheckedId() {
            const ids = this.tableData.data.map(v => v.order_id)
            if (this.chkName === 'duo') {
                this.checkedIds = []
            } else if (this.chkName === 'dan') {
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
        // 退款订单
        onHandleRefund(name) {
            this.chkNameRefund = this.chkNameRefund === name ? '' : name
            this.changeTypeRefund(!(this.chkNameRefund === ''))
        },
        changeOneRefund(v, order) {
            if (v) {
                if (this.chkNameRefund === 'duo') {
                    const index = this.refundNoChecked.indexOf(order.refund_order_id)
                    if (index > -1) this.refundNoChecked.splice(index, 1)
                } else {
                    const index = this.refundCheckedIds.indexOf(order.refund_order_id)
                    if (index === -1) this.refundCheckedIds.push(order.refund_order_id)
                }
            } else {
                if (this.chkNameRefund === 'duo') {
                    const index = this.refundNoChecked.indexOf(order.refund_order_id)
                    if (index === -1) this.refundNoChecked.push(order.refund_order_id)
                } else {
                    const index = this.refundCheckedIds.indexOf(order.refund_order_id)
                    if (index > -1) this.refundCheckedIds.splice(index, 1)
                }
            }
        },
        changeTypeRefund(v) {
            if (v) {
                if (!this.chkNameRefund) {
                    this.chkNameRefund = 'dan'
                }
            } else {
                this.chkNameRefund = ''
            }
            const index = this.checkedPage.indexOf(this.tableFrom.page)
            if (this.chkNameRefund === 'dan') {
                this.checkedPage.push(this.tableFrom.page)
            } else if (index > -1) {
                this.checkedPage.splice(index, 1)
            }
            this.syncCheckedIdRefund()
        },
        syncCheckedIdRefund() {
            const ids = this.tableDataRefund.data.map(v => v.refund_order_id)
            if (this.chkNameRefund === 'duo') {
                this.refundCheckedIds = []
            } else if (this.chkNameRefund === 'dan') {
                ids.forEach(id => {
                    const index = this.refundCheckedIds.indexOf(id)
                    if (index === -1) {
                        this.refundCheckedIds.push(id)
                    }
                })
            } else {
                ids.forEach(id => {
                    const index = this.refundCheckedIds.indexOf(id)
                    if (index > -1) {
                        this.refundCheckedIds.splice(index, 1)
                    }
                })
            }
        },
        onAdd() {
            // if (this.ids.length === 0 || this.idsRefund.length === 0) return this.$message.warning('请先选择对账单')
            const datas = {
                order_ids: this.checkedIds,
                order_out_ids: this.noChecked,
                order_type: this.chkName === 'duo' ? 1 : 0,
                refund_order_ids: this.refundCheckedIds,
                refund_out_ids: this.refundNoChecked,
                refund_type: this.chkNameRefund === 'duo' ? 1 : 0,
                date: this.tableFrom.date
            }
            this.$modalSure('发起商户对账吗').then(() => {
                reconciliationApi(this.$route.params.id, datas, ).then(({
                    message
                }) => {
                    this.$message.success(message)
                    this.tableFrom.page = 1
                    this.getList()
                    this.getRefundList()
                    this.chkName = ''
                    this.chkNameRefund = ''
                    this.refundCheckedIds = []
                    this.checkedIds = []
                    this.noChecked = []
                    this.refundNoChecked = []
                }).catch(({
                    message
                }) => {
                    this.$message.error(message)
                })
            })
        },
        // 具体日期
        onchangeTime(e) {
            this.timeVal = e
            this.tableFrom.date = this.timeVal ? this.timeVal.join('-') : ''
            this.tableFrom.page = 1
            this.getList()
            this.getRefundList()
        },
        // 退款备注
        onOrderMark(id) {
            this.$modalForm(refundMarkApi(id)).then(() => this.getRefundList())
        },
        // 订单备注
        addMark(id) {
            this.$modalForm(orderMarkApi(id)).then(() => this.getList())
        },
        getTotalRefund(row) {
            let sum = 0
            for (let i = 0; i < row.length; i++) {
                sum += row[i].product.cart_info.productAttr.price * row[i].refund_num
            }
            return sum
        },
        getTotal(row) {
            let sum = 0
            for (let i = 0; i < row.length; i++) {
                sum += row[i].cart_info.productAttr.price * row[i].product_num
            }
            return sum
        },
        // 列表
        getList() {
            this.listLoading = true
            this.$route.params.type === '1' ? merOrderListApi(this.$route.params.id, this.tableFrom).then(res => {
                this.tableData.data = res.data.list
                this.tableData.total = res.data.count
                this.tableData.data.map((item) => {
                    this.$set(item, {
                        checked: false
                    })
                })
                this.listLoading = false
            }).catch(res => {
                this.listLoading = false
                this.$message.error(res.message)
            }) : reconciliationOrderApi(this.$route.params.id, this.tableFrom).then(res => {
                this.tableData.data = res.data.list
                this.tableData.total = res.data.count
                this.tableData.data.map((item) => {
                    this.$set(item, {
                        checked: false
                    })
                })
                this.listLoading = false
            }).catch(res => {
                this.listLoading = false
                this.$message.error(res.message)
            })
        },
        pageChange(page) {
            this.tableFrom.page = page
            this.getList()
        },
        handleSizeChange(val) {
            this.tableFrom.limit = val
            this.chkName = ''
            this.getList()
        },
        // 退款列表
        getRefundList() {
            this.listLoading = true
            this.$route.params.type === '1' ? refundOrderListApi(this.$route.params.id, this.tableFrom).then(res => {
                this.tableDataRefund.data = res.data.list
                this.tableDataRefund.total = res.data.count
                this.listLoading = false
            }).catch(res => {
                this.listLoading = false
                this.$message.error(res.message)
            }) : reconciliationRefundApi(this.$route.params.id, this.tableFrom).then(res => {
                this.tableDataRefund.data = res.data.list
                this.tableDataRefund.total = res.data.count
                this.listLoading = false
            }).catch(res => {
                this.listLoading = false
                this.$message.error(res.message)
            })
        },
        pageChangeRefund(page) {
            this.tableFrom.page = page
            this.getRefundList()
        },
        handleSizeChangeRefund(val) {
            this.tableFrom.limit = val
            this.getRefundList()
        },
        setTagsViewTitle() {
            const title = '查看订单'
            const route = Object.assign({}, this.tempRoute, {
                title: `${title}-${this.$route.params.id}`
            })
            this.$store.dispatch('tagsView/updateVisitedView', route)
        }
    }
}
</script>

<style lang="scss" scoped>
.spBlock {
    cursor: pointer;
}

.check {
    color: #00a2d4;
}

.tabPop {
    /deep/ .el-popover {
        width: 100px !important;
    }
}

.fang {
    display: inline-block;
    position: relative;
    border: 1px solid #DCDFE6;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    z-index: 1;
    -webkit-transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46), background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
    transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46), background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
}

.el-table /deep/.DisabledSelection .cell .el-checkbox__inner {
    margin-left: -30px;
    position: relative;
}

.el-table /deep/.DisabledSelection .cell:before {
    content: "全选";
    position: absolute;
    right: 11px;
}

.demo-table-expands {
    /deep/ label {
        width: 84px !important;
        color: #99a9bf;
    }
}

.selWidth {
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

.tabBox_tit {
    width: 60%;
    font-size: 12px !important;
    margin: 0 2px 0 10px;
    letter-spacing: 1px;
    padding: 5px 0;
    box-sizing: border-box;
}
</style>
