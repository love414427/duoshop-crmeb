<template>
    <div class="txt_tab" v-if="configData">
    
        <div class="c_row-item">
            <el-row class="c_label">
                {{configData.title}}
                <span>{{configData.list[configData.type].val}}</span>
            </el-row>
            <el-row class="color-box">
                <el-radio-group v-model="configData.type" type="button" @change="radioChange($event)">
                    <el-radio :label="key" v-for="(radio,key) in configData.list" :key="key">
                        <span class="iconfont-diy" :class="radio.icon" v-if="radio.icon"></span>
                        <span v-else>{{radio.val}}</span>
                    </el-radio>
                </el-radio-group>
            </el-row>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'c_txt_tab',
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
        methods: {
            radioChange (e) {
                if(this.configData.name !== 'itemSstyle' && this.configData.name !== 'bgStyle' && this.configData.name !== 'conStyle'){
                    this.$emit('getConfig', { name: 'radio', values: e })
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .txt_tab{
        margin-top: 20px;
    }
        
    .c_row-item{
        margin-bottom: 20px;
    }
        
    .row-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
        
    .iconfont{
        font-size: 18px
    }
    .color-box{
        position: relative;
        max-width: 100%;
        min-height: 1px;
    }
    .el-radio-group{
        display: inline-block;
        font-size: 0;
        vertical-align: middle;
        -webkit-text-size-adjust: none;
    }
    /deep/.el-radio-group .el-radio:after{
        height: 0;
    }
    /deep/.el-radio-group .el-radio{
        display: inline-block;
        height: 32px;
        line-height: 30px;
        margin: 0;
        padding: 0 15px;
        font-size: 14px;
        color: #515a6e;
        transition: all .2s ease-in-out;
        cursor: pointer;
        border: 1px solid #dcdee2;
        border-left: 0;
        background: #fff;
        position: relative; 
        &:first-child {
            border-radius: 4px 0 0 4px;
            border-left: 1px solid #dcdee2;
        }    
    }
    /deep/.el-radio__label{
        padding-left: 0;
    }
    .el-radio-group .el-radio.is-checked{
        background: #fff;
        border-color: #2d8cf0;
        color: #2d8cf0;
        box-shadow: -1px 0 0 0 #2d8cf0;
        z-index: 1;
        &:first-child {
            border-color: #2d8cf0;
            box-shadow: none;
        }
    }
    /deep/.el-radio-group .el-radio:nth-of-type(2){
        border-left: 1px solid #dcdee2;
    }
    /deep/.el-radio__inner{
        opacity: 0;
        width: 0;
        height: 0;
    }   
</style>
