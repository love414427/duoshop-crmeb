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
        name: 'c_home_shop',
        cname: '店铺街',
        componentsName: 'home_shop',
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
                        components: toolCom.c_upload_img,
                        configNme: 'logoConfig'
                    },
                     {
                        components: toolCom.c_input_number,
                        configNme: 'numConfig'
                    },
                   
                    {
                        components: toolCom.c_tab,
                        configNme: 'tabConfig'
                    },
                    {
                        components: toolCom.c_is_show,
                        configNme: 'titleShow'
                    },
                    {
                        components: toolCom.c_is_show,
                        configNme: 'priceShow'
                    },
                    {
                        components: toolCom.c_bg_color,
                        configNme: 'bgColor'
                    },
                    {
                        components: toolCom.c_bg_color,
                        configNme: 'themeColor'
                    },
                    {
                        components: toolCom.c_txt_tab,
                        configNme: 'bgStyle'
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
                productInfo: {
                        name:'小米商城',
                        avatar:'http://mer1.crmeb.net/uploads/def/20210427/27ea72a7517c8a3e322122a0c8fca30a.png',
                        bgPic:'http://mer1.crmeb.net/uploads/def/20210427/a88fb560fd8b83e3a1944f1e09069b7e.jpg',
                        proList:[
                            {
                                image: "",
                                store_name: "无线蓝牙耳机",
                                price: '1299.00'
                            },
                            {
                                image: "",
                                store_name: "苹果新款平板",
                                price: '1299.00'
                            },
                            {
                                image: "",
                                store_name: "蒸汽手持熨斗",
                                price: '1299.00'
                            }
                        ]
                    }
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
                let list = []
                if(data.numVal){
                    for(var i = 0; i < data.numVal; i++){
                        list.push(this.productInfo)
                    }
                }
                this.configObj.shopList = list
            }
        }
    }
</script>

<style scoped>

</style>
