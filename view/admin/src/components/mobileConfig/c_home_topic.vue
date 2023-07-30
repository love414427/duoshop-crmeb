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
    export default {
        name: 'c_home_topic',
        cname: '专场',
        componentsName: 'home_topic',
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
                ],
                space: [
                    {
                        components: toolCom.c_menu_list,
                        configNme: 'menuConfig'
                    }
                ],
                space2: [],
                oneStyle: [
                     {
                        components: toolCom.c_txt_tab,
                        configNme: 'bgStyle'
                    },
                    {
                        components: toolCom.c_txt_tab,
                        configNme: 'conStyle'
                    },
                    {
                        components: toolCom.c_is_show,
                        configNme: 'colorShow'
                    },
                    {
                        components: toolCom.c_bg_color,
                        configNme: 'bgColor'
                    },

                    {
                        components: toolCom.c_slider,
                        configNme: 'prConfig'
                    },
                    {
                        components: toolCom.c_slider,
                        configNme: 'mbConfig'
                    }
                ],
                twoStyle: [
                     {
                        components: toolCom.c_txt_tab,
                        configNme: 'bgStyle'
                    },
                    {
                        components: toolCom.c_txt_tab,
                        configNme: 'conStyle'
                    },
                    {
                        components: toolCom.c_is_show,
                        configNme: 'colorShow'
                    },
                  
                    {
                        components: toolCom.c_txt_tab,
                        configNme: 'pointerStyle'
                    },
                     {
                        components: toolCom.c_txt_tab,
                        configNme: 'txtStyle'
                    },
                    {
                        components: toolCom.c_bg_color,
                        configNme: 'bgColor'
                    },
                    {
                        components: toolCom.c_slider,
                        configNme: 'prConfig'
                    },
                    {
                        components: toolCom.c_slider,
                        configNme: 'mbConfig'
                    }
                ],
                type:0,
                setUp:0,
                count:1,
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
            'configObj.menuConfig.list': {
                handler (nVal, oVal) {
                    this.count = nVal.length;
                },
                deep: true
            },
            'configObj.setUp.tabVal': {
                handler (nVal, oVal) {
                    this.setUp = nVal;
                    var arr = [this.rCom[0]]
                    if (nVal == 0) {
                        let tempArr = [
                            {
                                components: toolCom.c_menu_list,
                                configNme: 'menuConfig'
                            }
                        ]
                        this.rCom = arr.concat(tempArr)
                    } else {
                        if(this.count > 1){
                            this.rCom = arr.concat(this.twoStyle)
                        }else {
                            this.rCom = arr.concat(this.oneStyle)
                        }
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

<style scoped>

</style>
