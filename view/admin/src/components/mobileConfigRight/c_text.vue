<template>
    <div v-if="configData" class="slider-box">
        <div class="c_row-item">
            <el-col class="label" :span="24" v-if="configData.text">
                <div :style="'color:'+configData.color" class="text">{{configData.text}}</div>
            </el-col>
           
        </div>
    </div>

</template>

<script>
    export default {
        name: 'c_text',
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
        mounted () {
            this.$nextTick(() => {
                this.defaults = this.configObj
                this.configData = this.configObj[this.configNme]
            })
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
        methods: {
            sliderChange (e) {
            }
        }
    }
</script>

<style scoped lang="scss">
.c_row-item{
    margin-bottom: 20px;
    .label{
       font-size: 13px;
    }    
}    
</style>
