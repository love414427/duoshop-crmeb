<template>
    <div class="mobile-config pro">
        <div  v-for="(item,key) in rCom" :key="key">
            <component :is="item.components.name" :configObj="configObj" ref="childData" :configNme="item.configNme" :key="key" @getConfig="getConfig" :index="activeIndex" :num="item.num"></component>
        </div>
        <rightBtn :activeIndex="activeIndex" :configObj="configObj"></rightBtn>
    </div>
</template>

<script>
    import toolCom from '@/components/mobileConfigRight/index.js'
    import { mapState, mapMutations, mapActions } from 'vuex'
    import rightBtn from '@/components/rightBtn/index.vue';
    import { getGroomList } from '@/api/diy'
    export default {
        name: 'c_home_plant',
        componentsName: 'home_plant',
        cname: '种草社区',
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
                configObj: {},
                rCom: [
                    {
                        components: toolCom.c_set_up,
                        configNme: 'setUp'
                    }
                ]
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
            'configObj.setUp.tabVal': {
                handler (nVal, oVal) {
                    var arr = [this.rCom[0]]
                    if (nVal == 0) {
                        let tempArr = [
                            // {
                            //     components: toolCom.c_input_number,
                            //     configNme: 'numConfig'
                            // },
                            {
                                components: toolCom.c_is_show,
                                configNme: 'titleShow'
                            },
                            {
                                components: toolCom.c_is_show,
                                configNme: 'avatarShow'
                            },
                            {
                                components: toolCom.c_is_show,
                                configNme: 'nicknameShow'
                            }
                        ]
                        this.rCom = arr.concat(tempArr)
                    } else {
                        let tempArr = [
                            {
                                components: toolCom.c_tab,
                                configNme: 'tabConfig'
                            },
        
                             {
                                components: toolCom.c_txt_tab,
                                configNme: 'bgStyle'
                            },
                              {
                                components: toolCom.c_txt_tab,
                                configNme: 'conStyle'
                            },
                            {
                                components: toolCom.c_slider,
                                configNme: 'prConfig'
                            },
                            {
                                components: toolCom.c_slider,
                                configNme: 'mbConfig'
                            }
                        ]
                        this.rCom = arr.concat(tempArr)
                    }
                },
                deep: true
            }
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

<style scoped lang="scss">
.pro{
    padding: 0 15px;
    .tips{
        height: 50px;
        line-height: 50px;
        color: #999;
        font-size: 12px;
        border-bottom: 1px solid rgba(0,0,0,0.05);
    }      
    .btn-box{
        padding-bottom: 20px;
    }
}
    
    
</style>
