<template>
    <div v-if="FromData">
        <el-dialog v-if="modals" :visible.sync="modals" :title="FromData.title"  :z-index="1" width="700" :before-close="cancel">
            <template>
                <div class="radio acea-row row-middle" v-if="FromData.action === '/marketing/coupon/save.html'">
                    <div class="name ivu-form-item-content">优惠券类型</div>
                    <el-radio-group v-model="type" @change="couponsType">
                        <el-radio :label="0">通用券</el-radio>
                        <el-radio :label="1">品类券</el-radio>
                        <el-radio :label="2">商品券</el-radio>
                    </el-radio-group>
                </div>
            </template>
            <form-create :option="config" :rule="Array.from(FromData.rules)" @submit="onSubmit" class="formBox" ref="fc" handleIcon="false"></form-create>
        </el-dialog>
    </div>
</template>

<script>
    import formCreate from '@form-create/element-ui'
    import request from '@/api/request'
    import { mapState } from 'vuex';
    export default {
        name: 'edit',
        components: {
            formCreate: formCreate.$form()
        },
        computed: {
            ...mapState('admin/userLevel', [
                'taskId',
                'levelId'
            ])
        },
        props: {
            FromData: {
                type: Object,
                default: null
            }
        },
        data () {
            return {
                modals: false,
                type: 0,
                config: {
                    global: {
                        upload: {
                            props: {
                                onSuccess (res, file) {
                                    if (res.status === 200) {
                                        file.url = res.data.src;
                                    } else {
                                        this.Message.error(res.message);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        methods: {
            couponsType () {
                this.$parent.addType(this.type);
            },
            // 提交表单 group
            onSubmit (formData) {
                let datas = {};
                datas = formData;
                request({
                    url: this.FromData.action,
                    method: this.FromData.method,
                    data: datas
                }).then(res => {
                    this.$parent.getList();
                    this.$message.success(res.message);
                    this.modals = false;
                    setTimeout(() => {
                        this.$emit('submitFail');
                    }, 1000);
                }).catch(res => {
                    this.$message.error(res.message);
                });
            },
            // 关闭按钮
            cancel () {
                this.type = 0;
                // this.$emit('onCancel')
            }
        }
    }
</script>

<style scoped lang="scss">
    .v-transfer-dom >>> .ivu-modal-content-drag{
        z-index: 2!important;
    }
    .radio{
        margin-bottom:14px;
    }
    .radio >>> .name{
        width: 125px;
        text-align: right;
        padding-right: 12px;
    }
</style>
