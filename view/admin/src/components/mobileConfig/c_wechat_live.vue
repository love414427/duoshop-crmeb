<template>
    <div class="mobile-config">
        <div  v-for="(item,key) in rCom" :key="key">
            <component :is="item.components.name" :configObj="configObj" ref="childData" :configNme="item.configNme" :key="key" @getConfig="getConfig" :index="activeIndex" :num="item.num"></component>
        </div>
        <rightBtn :activeIndex="activeIndex" :configObj="configObj"></rightBtn>
    </div>
</template>

<script>
    import toolCom from '@/components/mobileConfigRight/index.js'
    import rightBtn from '@/components/rightBtn/index.vue';
    import { mapMutations } from 'vuex'
    export default {
        name: 'c_wechat_live',
        componentsName: 'wechat_live',
        cname: '小程序直播',
        props: {
            activeIndex: {
                type: null
            },
            num: {
                type: null
            },
            index: {
                type: null
            }
        },
        components: {
            ...toolCom,
            rightBtn
        },
        data () {
            return {
                // 组件参数配置
                option: {
                    submitBtn: false
                },
                configObj: {}, // 配置对象
                rCom: [
                    {
                        components: toolCom.c_txt_tab,
                        configNme: 'listStyle'
                    },
                    {
                        components: toolCom.c_bg_color,
                        configNme: 'bg'
                    },
                    {
                        components: toolCom.c_txt_tab,
                        configNme: 'bgStyle'
                    },
                    {
                        components: toolCom.c_slider,
                        configNme: 'mbConfig'
                    }
                ] // 当前页面组件
            }
        },
        watch: {
            num (nVal) {
                let value = JSON.parse(JSON.stringify(this.$store.state.mobildConfig.defaultArray[nVal]))
                this.configObj = value;
            },
            configObj: {
                handler (nVal, oVal) {
                    this.$store.commit('mobildConfig/UPDATEARR', { num: this.num, val: nVal });
                },
                deep: true
            },
           
        },
        mounted () {
            this.$nextTick(() => {
                let value = JSON.parse(JSON.stringify(this.$store.state.mobildConfig.defaultArray[this.num]))
                this.configObj = value;
            })
        },
        methods: {
            getConfig (data) {

            }
        }
    }
</script>

<style scoped>

</style>
