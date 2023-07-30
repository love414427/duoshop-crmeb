<template>
    <div v-if="configData" class="c_row-item">
        <el-col class="c_label">{{configData.title}}</el-col>
        <el-col style="width: auto;">
            <el-switch v-model="configData.val"/>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: 'c_is_show',
        props: {
            configObj: {
                type: Object
            },
            configNme: {
                type: String
            }
        },
        data () {
            return {
                defaults: {},
                configData: {}
            }
        },
        created () {
            this.defaults = this.configObj
            this.configData = this.configObj[this.configNme]
        },
        watch: {
            configObj: {
                handler (nVal, oVal) {
                    this.defaults = nVal
                    this.configData = nVal[this.configNme]
                },
                immediate: true,
                deep: true
            }
        },
        methods:{

        }
    }
</script>

<style scoped lang="scss">
    .c_row-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style>