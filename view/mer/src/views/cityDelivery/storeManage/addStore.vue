<template>
  <el-dialog
    v-loading="loading"
    :title="station_id ? '编辑发货点' : '添加发货点'"
    :visible.sync="dialogVisible"
    width="600px"
  >
    <div class="description">
      <div>
         <el-form size="small" :model="formValidate" ref="formValidate" :rules="rules"  label-width="140px">         
          <el-form-item label="发货点名称：" prop="station_name">  
            <el-input v-model="formValidate.station_name" placeholder="请输入发货点名称" class="selWidth" size="small" />
          </el-form-item>
          <el-form-item label="配送品类：" prop="business">
            <el-select v-model="formValidate.business" placeholder="请选择" class="selWidth" clearable>
              <el-option v-for="item in categoryList" :label="item.label" :value="item.key" />
            </el-select>
          </el-form-item>  
          <el-form-item label="所属城市：" prop="city_name" required>      
            <el-select v-model="formValidate.city_name" placeholder="请选择" class="selWidth" filterable clearable>
              <el-option v-for="item in cityList" :label="item.label" :value="item.key" :key="item.key"/>
            </el-select>
          </el-form-item>
          <el-form-item label="发货点地址：" prop="station_address">
            <el-input v-model="formValidate.station_address" placeholder="请输入发货点地址" class="selWidth" size="small" />
          </el-form-item> 
          <el-form-item label="经纬度：" prop="location">
            <el-input v-model="formValidate.location" enter-button="查找位置" style="width: 100%;" placeholder="请查找位置">
              <el-button slot="append" style="background: #46a6ff; color: #fff; border-radius: 0 4px 4px 0;" @click="onSearchs" >查找位置</el-button>
            </el-input>
            <div slot="content">请点击查找位置选择位置</div>
          </el-form-item>
          <el-form-item label="联系人姓名：" prop="contact_name">
            <el-input v-model="formValidate.contact_name" placeholder="请输入联系人姓名" class="selWidth" size="small" />
          </el-form-item>
          <el-form-item label="联系人电话：" prop="phone">
            <el-input v-model="formValidate.phone" placeholder="请输入联系人电话" class="selWidth" size="small"/>
          </el-form-item>
          <el-form-item label="联系人身份证：">
            <el-input v-model="formValidate.id_card" placeholder="请输入联系人身份证" class="selWidth" size="small" />
          </el-form-item>
          <el-form-item v-if="deliveryType == 1" label="达达商家app账号：" required>
            <el-input v-model="formValidate.username" placeholder="请输入app账号(必须是手机号)" class="selWidth" size="small" />
          </el-form-item> 
          <el-form-item v-if="deliveryType == 1" label="达达商家app密码：" required>
              <el-input v-model="formValidate.password"  placeholder="请输入商家app密码" class="selWidth" size="small" />
          </el-form-item>
          <el-form-item label="状态：">
            <el-switch
                v-model="formValidate.status"
                :active-value="1"
                :inactive-value="0"
                active-text="开启"
                inactive-text="关闭"
              />
          </el-form-item>           
        </el-form>
        <span class="dialog-footerdialog-footer">
            <el-button style="width: 100%;" type="primary" @click="submitForm('formValidate')">提交</el-button>
        </span>
      </div>   
    <el-dialog
      v-if="modalMap"
      v-model="modalMap"
      :visible.sync="modalMap"
      title="选择位置"
      close-on-click-modal
      class="mapBox"
      custom-class="dialog-scustom"
      :append-to-body= 'true'
    >
      <iframe id="mapPage" width="100%" height="500px" frameborder="0" :src="keyUrl" />
    </el-dialog>
    </div>
  </el-dialog>
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
import {
  getDeliveryCate, createStoreApi, deliveryStoreDetail, deliveryStoreUpdate, getCityLst
} from '@/api/systemForm'
export default {
  name: 'addStore',
  props: {
      mapKey: {
        type: String,
        default: ''
      },
      keyUrl: {
        type: String,
        default: ''
      },
      deliveryType: {
        type: Number,
        default: 1
      },
    },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      listLoading: true,
      modalMap: false,
      station_id: "",
      formValidate: {
        location: ''
      },
      categoryList: [],
      cityList: [],
      rules: {
        station_name: [
          { required: true, message: '请输入发货点名称', trigger: 'blur' }
        ],
        business: [
          { required: true, message: '请选择配送品类', trigger: 'change' }
        ],
        station_address: [
          { required: true, message: '请输入发货点地址', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '请选择经纬度', trigger: 'blur' }
        ],
        contact_name: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系人电话', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
    }
  },
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
    this.getCategoryList()
    this.getCityList()
  },
  methods: {
    // 查找位置
    onSearchs() {
      if (!this.mapKey || this.mapKey == '') { this.$message.error('平台未配置腾讯地图KEY') } else this.modalMap = true
    },
     // 选择经纬度
    selectAdderss(data) {
      this.formValidate.lat = data.latlng.lat
      this.formValidate.lng = data.latlng.lng
      this.formValidate.location = data.latlng.lat+','+data.latlng.lng
      this.modalMap = false
    },
    // 获取配送品类
    getCategoryList() {
      getDeliveryCate()
        .then(res => {
          this.categoryList = res.data
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 获取城市列表
    getCityList() {
        getCityLst()
          .then(res => {
            this.cityList = res.data
          })
          .catch(res => {
            this.$message.error(res.message)
          })
    },
    // 获取详情数据
    getDetails(id) {
      this.dialogVisible = true
      this.station_id = id
      deliveryStoreDetail(id)
        .then(res => {
          let info = res.data
          this.formValidate = {
            station_name: info.station_name,
            business: info.business && info.business.key,
            station_address: info.station_address,
            location: info.lat+','+info.lng,
            contact_name: info.contact_name,
            phone: info.phone,
            id_card: info.id_card,
            username: info.username,
            password: info.password,
            status: info.status,
            city_name: info.city_name
          }
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    submitForm(name) {
      this.$refs[name].validate(valid => {
        if (valid) { 
          this.formValidate.lat = this.formValidate.location.split(',')[0];
          this.formValidate.lng = this.formValidate.location.split(',')[1];
          // delete this.formValidate.location
          var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
          if(this.formValidate.id_card && !reg.test(this.formValidate.id_card)){
            return this.$message.warning('请输入正确的身份证号！')
          }
          this.station_id ? 
          deliveryStoreUpdate(this.station_id, this.formValidate).then(res => {
            this.dialogVisible = false
            this.station_id = ""
            this.$message.success(res.message)
            this.$emit('getList',''); 
          }).catch(({ message }) => {
            this.$message.error(message)
          }) :
          createStoreApi(this.formValidate).then(res => {
            this.dialogVisible = false
            this.$message.success(res.message)
            this.$emit('getList','');    
          }).catch(({ message }) => {
            this.$message.error(message)
          })
        }
      })
    },
    addStore(){
      this.dialogVisible = true
      this.station_id = ""
       this.formValidate = {
          station_name: '',
          business: '',
          station_address: '',
          location: '',
          contact_name: '',
          phone: '',
          id_card: '',
          username: '',
          password: '',
          status: '',
          city_name: ''
        }
    }
  }
}
</script>

<style scoped lang="scss">
.selWidth{
  width: 100%;
}

</style>
