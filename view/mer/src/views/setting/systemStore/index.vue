<template>
  <div class="divBox">
    <el-card class="box-card">
      <div class="article-manager">
        <div class="ivu-mt">
          <el-form
            ref="formItem"
            :model="formItem"
            :label-width="labelWidth"
            :label-position="labelPosition"
            :rules="ruleValidate"
            @submit.native.prevent
          >
            <el-row :gutter="24">
              <el-col :span="24">
                <el-col v-bind="grid">
                  <el-form-item label="提货点名称：" prop="mer_take_name">
                    <el-input v-model="formItem.mer_take_name" placeholder="请输入提货点名称" />
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-col v-bind="grid">
                  <el-form-item label="提货点手机号：" prop="mer_take_phone">
                    <el-input
                      v-model="formItem.mer_take_phone"
                      type="number"
                      placeholder="请输入提货点手机号"
                    />
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-col v-bind="grid">
                  <el-form-item label="详细地址：" prop="mer_take_address">
                    <el-input v-model="formItem.mer_take_address" placeholder="请输入详细地址" />
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-col v-bind="grid">
                  <el-form-item label="提货点营业日期：" prop="mer_take_day">
                    <el-select
                      v-model="formItem.mer_take_day"
                      filterable
                      multiple
                      placeholder="请选择营业时间"
                      class="selWidth"
                    >
                      <el-option
                        v-for="item in date"
                        :key="item.date_id"
                        :label="item.date_name"
                        :value="item.date_id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-col v-bind="grid">
                  <el-form-item label="提货点营业时间：" prop="mer_take_time">
                    <el-time-picker
                      v-model="formItem.mer_take_time"
                      is-range
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      placeholder="选择时间范围"
                      value-format="HH:mm"
                      @change="onchangeTime"
                    />
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-col v-bind="grid">
                  <el-form-item label="经纬度：" prop="mer_take_location">
                    <el-input
                      v-model="formItem.mer_take_location"
                      enter-button="查找位置"
                      style="width: 100%;"
                      placeholder="请查找位置"
                      readonly
                    >
                      <el-button
                        slot="append"
                        style="background: #46a6ff; color: #fff; border-radius: 0 4px 4px 0;"
                        @click="onSearch"
                      >查找位置</el-button>
                    </el-input>
                    <div slot="content">请点击查找位置选择位置</div>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="是否开启门店自提：">
                    <el-switch
                      v-model="formItem.mer_take_status"
                      :active-value="1"
                      :inactive-value="0"
                      active-text="开启"
                      inactive-text="关闭"
                    />
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col v-bind="grid">
                <el-button type="primary" style="width: 100%" @click="handleSubmit('formItem')">提交</el-button>
              </el-col>
            </el-row>
            <!--<Spin size="large" fix v-if="spinShow"></Spin>-->
          </el-form>
        </div>
        <el-dialog
          v-if="modalMap"
          v-model="modalMap"
          :visible.sync="modalMap"
          title="选择位置"
          close-on-click-modal
          class="mapBox"
          custom-class="dialog-scustom"
        >
          <iframe id="mapPage" width="100%" height="500px" frameborder="0" :src="keyUrl" />
        </el-dialog>
      </div>
    </el-card>
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
import { storeUpdateApi, storeGetInfoApi } from '@/api/setting'
export default {
  name: 'SystemStore',
  components: {},
  props: {},
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写手机号'))
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('手机号格式不正确!'))
      } else {
        callback()
      }
    }
    return {
      modalMap: false,
      labelPosition: 'right',
      labelWidth: '130px',
      key: '',
      date: [
        { date_name: '周一', date_id: 1 },
        { date_name: '周二', date_id: 2 },
        { date_name: '周三', date_id: 3 },
        { date_name: '周四', date_id: 4 },
        { date_name: '周五', date_id: 5 },
        { date_name: '周六', date_id: 6 },
        { date_name: '周日', date_id: 7 }
      ],
      formItem: {
        mer_take_name: '',
        mer_take_phone: '',
        mer_take_address: '',
        // mer_take_time: [
        //   new Date(2016, 9, 10, 8, 40),
        //   new Date(2016, 9, 10, 9, 40),
        // ],
        mer_take_time: ['', ''],
        mer_take_day: [],
        mer_take_location: '',
        id: 0,
        mer_take_status: 0
      },
      ruleValidate: {
        mer_take_name: [
          { required: true, message: '请输入提货点名称', trigger: 'blur' }
        ],
        mer_take_day: [
          {
            required: true,
            type: 'array',
            message: '请选择提货点营业日期',
            trigger: 'change'
          }
        ],
        mer_take_time: [
          {
            required: true,
            message: '请选择提货点营业时间',
            trigger: 'change'
          }
        ],
        mer_take_phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        mer_take_address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        mer_take_location: [
          { required: true, message: '请选择经纬度', trigger: 'blur' }
        ]
      },
      keyUrl: '',
      grid: {
        xl: 20,
        lg: 20,
        md: 20,
        sm: 24,
        xs: 24
      },
      gridPic: {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 12,
        xs: 12
      }
    }
  },
  created() {},
  mounted: function() {
    window.addEventListener(
      'message',
      function(event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data
        if (loc && loc.module === 'locationPicker') {
          // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          window.parent.selectAdderss(loc)
        }
      },
      false
    )
    window.selectAdderss = this.selectAdderss
    this.getInfo()
  },
  methods: {
    // 营业时间
    onchangeTime(e) {
      this.formItem.mer_take_time = e
    },
    // 选择经纬度
    selectAdderss(data) {
      this.formItem.mer_take_location = data.latlng.lat + ',' + data.latlng.lng
      this.modalMap = false
    },
    // 详情
    getInfo() {
      const that = this
      storeGetInfoApi()
        .then(res => {
          this.key = res.data.tx_map_key
          const keys = res.data.tx_map_key
          this.keyUrl = `https://apis.map.qq.com/tools/locpicker?type=1&key=${keys}&referer=myapp`
          const info = res.data || null
          that.formItem.mer_take_time = info.mer_take_time || ['', '']
          that.formItem.mer_take_day = info.mer_take_day || []
          that.formItem.mer_take_phone = info.mer_take_phone
          that.formItem.mer_take_name = info.mer_take_name
          that.formItem.mer_take_address = info.mer_take_address
          that.formItem.mer_take_location =
            info.mer_take_location && info.mer_take_location.length
              ? info.mer_take_location[0] + ',' + info.mer_take_location[1]
              : ''
          that.formItem.mer_take_status = info.mer_take_status || 0
        })
        .catch(function(res) {
          that.spinShow = false
          that.$message.error(res.message)
        })
    },
    onSearch() {
      if (!this.key || this.key == '') { this.$message.error('平台未配置腾讯地图KEY') } else this.modalMap = true
    },
    // 提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const location = this.formItem.mer_take_location
            ? [
              this.formItem.mer_take_location.split(',')[0],
              this.formItem.mer_take_location.split(',')[1]
            ]
            : []
          const args = Object.assign({}, this.formItem)
          // args.mer_take_time = mer_take_time;
          args.mer_take_location = location

          storeUpdateApi(args)
            .then(async res => {
              this.$message.success(res.message)
              this.getInfo()
            })
            .catch(res => {
              this.$message.error(res.message)
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.dialog-scustom {
  height: 600px;
}
.selWidth {
  width: 100%;
}
.picBox {
  display: inline-block;
  cursor: pointer;
  .upLoad {
    width: 58px;
    height: 58px;
    line-height: 58px;
    border: 1px dotted rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.02);
  }

  .pictrue {
    width: 60px;
    height: 60px;
    border: 1px dotted rgba(0, 0, 0, 0.1);
    margin-right: 10px;
  }

  img {
    width: 100%;
    height: 100%;
  }
  .iconfont {
    color: #898989;
  }
}
</style>
