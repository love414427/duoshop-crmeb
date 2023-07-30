<template>
    <div style="margin-bottom: 20px">
        <div class="title-tips" v-if="configData.tabList">
            <span>{{configData.title}}</span>{{configData.tabList[configData.tabVal].name}}
        </div>
        <div class="radio-box" :class="{on:configData.type == 1}">
            <el-radio-group v-model="configData.tabVal" type="button" size="large" @change="radioChange($event)">
                <el-radio :label="index" v-for="(item,index) in configData.tabList" :key="index">
                    <span class="iconfont-diy" :class="item.icon" v-if="item.icon"></span>
                    <span v-else>{{item.name}}</span>
                </el-radio>
            </el-radio-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'c_tab',
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
                formData: {
                    type: 0
                },
                defaults: {},
                configData: {}
            }
        },
        watch: {
            configObj: {
                handler (nVal, oVal) {
                    this.defaults = nVal
                    this.configData = nVal[this.configNme]
                },
                deep: true
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.defaults = this.configObj
                this.configData = this.configObj[this.configNme]
            })
        },
        methods: {
            radioChange (e) {
                if(this.defaults.picStyle){
                    this.defaults.picStyle.tabVal = '0'
                }
                this.$emit('getConfig', e);
            }
        }
    }
</script>

<style scoped lang="scss">
    /deep/.el-radio-group .el-radio:after{
        height: 0;
    }
    /deep/.el-radio-group .el-radio{
        height: 34px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all .2s ease-in-out;
        cursor: pointer;
        border: 1px solid #dcdee2;
        position: relative;
        margin: 0;
        padding: 0 15px;
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
    .radio-box{
        /deep/.el-radio-group{
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            .ivu-radio-wrapper{
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }               
        &.on{
            /deep/.el-radio{
                flex: unset;
                width: 67px;
                margin-right: 20px;
                margin-top: 10px;
                border-radius: 4px;
            }      
        }
            
    }
    .title-tips{
        padding-bottom: 10px;
        font-size: 14px;
        color: #333;
        span{
            margin-right: 14px;
            color: #999;
        }     
    }   
    .iconfont-diy{
        font-size: 20px;
        line-height: 18px;
    }
        
</style>
