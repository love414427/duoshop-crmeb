<template>
<div class="divBox">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <div class="container">
                <el-form size="small" label-width="100px">
                    <el-form-item label="时间选择：" class="width100">
                        <el-radio-group v-model="tableFrom.date" type="button" class="mr20" size="small" @change="selectChange(tableFrom.date)">
                            <el-radio-button v-for="(item,i) in fromList.fromTxt" :key="i" :label="item.val">{{ item.text }}</el-radio-button>
                        </el-radio-group>
                        <el-date-picker v-model="timeVal" value-format="yyyy/MM/dd" format="yyyy/MM/dd" size="small" type="daterange" placement="bottom-end" placeholder="自定义时间" style="width: 250px;" @change="onchangeTime" />
                    </el-form-item>
                    <el-form-item label="提现状态：">
                        <el-radio-group v-model="tableFrom.status" type="button" size="small" @change="getList(1)">
                            <el-radio-button label="">全部</el-radio-button>
                            <el-radio-button label="0">审核中</el-radio-button>
                            <el-radio-button label="1">已提现</el-radio-button>
                            <el-radio-button label="-1">已拒绝</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="提现方式：">
                        <el-radio-group v-model="tableFrom.extract_type" type="button" size="small" @change="getList(1)">
                            <el-radio-button label="">全部</el-radio-button>
                            <el-radio-button label="0">银行卡</el-radio-button>
                            <el-radio-button label="2">支付宝</el-radio-button>
                            <el-radio-button label="1">微信</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="关键字：" class="width100">
                        <el-input v-model="tableFrom.keyword" @keyup.enter.native="getList(1)" placeholder="姓名/支付宝账号/银行卡号" class="selWidth" size="small">
                            <el-button slot="append" icon="el-icon-search" size="small" class="el-button-solt" @click="getList(1)" />
                        </el-input>
                        <el-button size="small" type="primary" icon="el-icon-top" @click="exports">列表导出</el-button>
                        <!-- <el-button size="small" type="primary" @click="getExportFileList">导出记录</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="mini" class="table" highlight-current-row>
            <el-table-column prop="extract_id" label="序号" width="60" />
            <el-table-column label="二维码" min-width="80">
                <template slot-scope="scope">
                    <div class="demo-image__preview">
                        <el-image v-if="scope.row.extract_pic" :src="scope.row.extract_pic" :preview-src-list="[scope.row.extract_pic]" />

                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="user.nickname" label="用户信息" min-width="150" />
            <el-table-column prop="uid" label="用户UID" min-width="150" />
             <el-table-column prop="real_name" label="户名" min-width="150" />
            <el-table-column prop="extract_price" label="提现金额" min-width="120" />
            <el-table-column label="提现方式" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.extract_type | extractTypeFilter }}</span>
                </template>
            </el-table-column>
            <el-table-column label="银行名称" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.extract_type === 0">{{ (scope.row.bank_name&&scope.row.bank_address) ? scope.row.bank_name+scope.row.bank_address : scope.row.bank_address }}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column label="账号" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.extract_type==0">{{scope.row.bank_code }}</span>
                    <span v-else-if="scope.row.extract_type==2">{{scope.row.alipay_code }}</span>
                    <span v-else-if="scope.row.extract_type==1">{{scope.row.wechat }}</span>
                    <span v-else></span>
                </template>
            </el-table-column>
            <el-table-column label="审核状态" min-width="200">
                <template slot-scope="scope">
                    <span class="spBlock">{{ scope.row.status | extractStatusFilter }}</span>
                    <template v-if="scope.row.status === 0">
                        <el-button type="danger" icon="el-icon-close" size="mini" @click="onExamine(scope.row.extract_id)">未通过</el-button>
                        <el-button type="primary" icon="el-icon-check" size="mini" @click="ok(scope.row.extract_id)">通过</el-button>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="拒绝原因" min-width="150">
                <template slot-scope="scope">
                    <span class="spBlock">{{ scope.row.fail_msg ? scope.row.fail_msg : '-' }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="添加时间" min-width="150" />
        </el-table>
        <div class="block">
            <el-pagination :page-sizes="[20, 40, 60, 80]" :page-size="tableFrom.limit" :current-page="tableFrom.page" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange" @current-change="pageChange" />
        </div>
    </el-card>
    <!--导出订单列表-->
    <file-list ref="exportList" />
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
import { extractListApi, extractStatusApi, extractManageExportApi } from '@/api/accounts'
import createWorkBook from '@/utils/newToExcel.js'
import { fromList } from '@/libs/constants.js'
import fileList from '@/components/exportFile/fileList'
export default {
    components: { fileList },
    name: 'AccountsExtract',
    data() {
        return {
            timeVal: [],
            tableData: {
                data: [],
                total: 0
            },
            listLoading: true,
            tableFrom: {
                extract_type: '',
                status: '',
                date: '',
                keyword: '',
                page: 1,
                limit: 20
            },
            fromList: fromList
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        onExamine(id) {
            this.$prompt('未通过', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputErrorMessage: '请输入原因',
                inputType: 'textarea',
                inputValue: '输入信息不完整或有误!',
                inputPlaceholder: '请输入原因',
                inputValidator: (value) => {
                    if (!value) {
                        return '请输入原因'
                    }
                }
            }).then(({
                value
            }) => {
                extractStatusApi(id, {
                    status: -1,
                    fail_msg: value
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '提交成功'
                    })
                    this.getList()
                }).catch((res) => {
                    this.$message.error(res.message)
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                })
            })
        },
        ok(id) {
            this.$modalSure('审核通过吗').then(() => {
                extractStatusApi(id, {
                    status: 1
                }).then(({
                    message
                }) => {
                    this.$message.success(message)
                    this.getList()
                }).catch(({
                    message
                }) => {
                    this.$message.error(message)
                })
            })
        },
        // 选择时间
        selectChange(tab) {
            this.timeVal = []
            this.tableFrom.date = tab
            this.tableFrom.page = 1;
            this.getList()
        },
        // 具体日期
        onchangeTime(e) {
            this.timeVal = e
            this.tableFrom.date = e ? this.timeVal.join('-') : ''
            this.tableFrom.page = 1;
            this.getList()
        },
        async exports() {
            let excelData = JSON.parse(JSON.stringify(this.tableFrom)), data = []
            excelData.page = 1
            let pageCount = 1
            let lebData = {};
            for (let i = 0; i < pageCount; i++) {
                lebData = await this.downData(excelData)
                pageCount = Math.ceil(lebData.count/excelData.limit)
                if (lebData.export.length) {
                data = data.concat(lebData.export)
                excelData.page++
                }  
            }
            createWorkBook(lebData.header, lebData.title, data, lebData.foot,lebData.filename);
            return
            },
        /**体现管理 */
        downData(excelData) {
            return new Promise((resolve, reject) => {
                extractManageExportApi(excelData).then((res) => {
                    return resolve(res.data)
                })
            })
        },
        // 导出
        exportRecord() {
            extractManageExportApi(this.tableFrom)
                .then((res) => {
                const h = this.$createElement;
                this.$msgbox({
                    title: '提示',
                    message: h('p', null, [
                    h('span', null, '文件正在生成中，请稍后点击"'),
                    h('span', { style: 'color: teal' }, '导出记录'),
                    h('span', null, '"查看~ '),
                    ]),
                    confirmButtonText: '我知道了',
                }).then(action => {

                });
                })
                .catch((res) => {
                this.$message.error(res.message)
                })
            },
        // 导出列表
        getExportFileList() {
        this.$refs.exportList.exportFileList()
        },
        // 列表
        getList(num) {
            this.listLoading = true
            this.tableFrom.page = num ? num : this.tableFrom.page;
            extractListApi(this.tableFrom).then(res => {
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
            this.getList()
        },
        handleSizeChange(val) {
            this.tableFrom.limit = val
            this.getList()
        }
    }
}
</script>

<style scoped>
.selWidth {
    width: 300px;
}
</style>
