<template>
  <div class="information">
    <el-tabs v-if="tabList.length > 0" v-model="infoType">
      <el-tab-pane v-for="(item,index) in tabList" :key="index" :name="item.value" :label="item.title " />
    </el-tabs>
    <div v-if="merModel" class="business-msg" style="min-height: 600px;">
      <div v-if="infoType == '1'" class="user-msg">
        <div class="basic-information">
          <span class="basic-label">商户名称：</span>
           {{ merData.mer_name }}
        </div>
         <div class="basic-information">
          <span class="basic-label">商户负责人手机号：</span>
           {{ merData.mer_phone }}
        </div>
        <div v-if="merData.merchantCategory.category_name" class="basic-information">
          <span class="basic-label">商户分类：</span>
           {{ merData.merchantCategory.category_name || "" }}
        </div>
        <div v-if="merData.merchantCategory.category_name" class="basic-information">
          <span class="basic-label"> 商户类别：</span>
          {{ merData.is_trader ? "自营" : "非自营" }}
        </div>
        <div class="basic-information">
          <span class="basic-label"> 商户负责人姓名：</span>
           {{ merData.real_name }}
        </div>
        <div class="basic-information">
          <span class="basic-label"> 商户入驻时间：</span>
          {{ merData.create_time }}
        </div>
        <div v-if="merData.sub_mchid" class="basic-information">
          <span class="basic-label"> 商户入驻时间：</span>
          {{ merData.create_time }}
        </div>
        <div v-if="merData.sub_mchid && merData.merchantType" class="basic-information">
          <span class="basic-label"> 店铺类型：</span>
          {{ merData.merchantType.type_name }}
        </div>
        <div class="basic-information">
          <div>
            <span class="basic-label">是否开启商户：</span>
            <el-tooltip v-if="merData.is_margin == 1 && merData.mer_state == 0" class="item" effect="dark" content="请先支付店铺保证金！" placement="top-start">
              <el-switch disabled v-model="merData.mer_state" active-text="开启" inactive-text="关闭" :active-value="1" :inactive-value="0" />
            </el-tooltip>
            <el-switch v-else v-model="merData.mer_state" active-text="开启" inactive-text="关闭" :active-value="1" :inactive-value="0" />
            <span class="trip">开启，店铺即可展示在移动端</span>
          </div>
        </div>
        <div class="basic-information">
          <div v-if="merData.is_margin != 0">
            <!--未支付-->
            <div v-if="merData.is_margin == 1">
              <span class="basic-label">店铺保证金：</span>
              <span class="font_red">{{merData.margin}}元</span>
              <div class="margin_count" @mouseenter="getCode()">
                <el-button type="text" size="small" class="mr10 pay_btn">去支付保证金</el-button>
                <!--支付二维码-->
                <div class="erweima">
                  <div class="pay_title">支付保证金</div>
                  <div>
                    <vue-qr class="bicode" :text="qrCode" :size="310" />
                    <div class="pay_type" >请使用微信扫码支付</div>
                     <div class="pay_price" >￥{{marginPrice}}元</div>
                    <div class="pay_time">支付码过期时间： {{qrEndTime}}</div>
                  </div>
                </div>
              </div>
            </div>
            <!--已支付-->
            <div class="margin_main" v-if="merData.is_margin == 10 ">
              <span class="basic-label">店铺保证金：</span>
              <span class="margin_price">{{merData.margin}}元</span>
              <div class="margin_count">
                <span class="mr10 spanBtn" @click="viewRecords">查看保证金记录</span>
                 <!--保证金弹窗-->
                <div class="margin_modal"  @mouseleave="supplyPay=false">
                  <div>
                    <img src="@/assets/images/margin03.png"/>
                    <div class="alic">
                      <span class="text_g">剩余保证金￥{{merData.margin}}元</span>
                      <el-button v-if="merData.margin>0" type="primary" size="small" @click="applyReturn">申请退回保证金</el-button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-if="merData.marginStatus" style="display: inline-block;">
                <div class="margin_count" @mouseenter="getCode()">
                <el-button type="text" size="small" class="mr10 pay_btn">去补缴保证金</el-button>
                <!--支付二维码-->
                <div class="erweima">
                  <div class="pay_title">支付保证金</div>
                  <div>
                    <vue-qr class="bicode" :text="qrCode" :size="310" />
                    <div class="pay_type" >请使用微信扫码支付</div>
                     <div class="pay_price" >￥{{marginPrice}}元</div>
                    <div class="pay_time">支付码过期时间： {{qrEndTime}}</div>
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div class="margin_main" v-if="merData.is_margin == -10 || merData.is_margin == -1">
              <span class="basic-label">店铺保证金：</span>
              <span class="margin_price">{{merData.margin}}元</span>
              <div class="margin_count">
                 <span class="mr10 spanBtn" @click="viewRecords">查看保证金记录</span>
                <!--保证金弹窗-->
                <div class="margin_modal" @mouseleave="goPay=false">
                  <div>
                    <img v-if="merData.is_margin == -10" src="@/assets/images/margin01.png"/>
                    <img v-if="merData.is_margin == -1" src="@/assets/images/margin02.png"/>
                    <img v-if="merData.is_margin == 10" src="@/assets/images/margin03.png"/>
                    <div class="alic" v-if="merData.is_margin == 10">
                      <span class="text_g">剩余保证金￥{{merData.margin}}元</span>
                      <el-button v-if="merData.margin>0" type="primary" size="small" @click="applyReturn">申请退回保证金</el-button>
                    </div>
                    <div class="alic"  v-if="merData.is_margin == -1">
                      <span class="text_b b01"> 审核中</span>
                      <div class="margin_refused">您申请退回保证金，正在审核中…</div>
                    </div>
                    <div class="alic"  v-if="merData.is_margin == -10">
                      <span class="text_b b02">审核未通过</span>
                      <div class="margin_refused">未通过原因：<span>{{merData.refundMarginOrder.refusal}}</span></div>
                      <el-button type="primary" size="small" @click="applyReturn">再次申请</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--申请退回保障金银行信息弹窗-->
       <el-dialog
        v-if="modalBank"
        v-model="modalBank"
        :visible.sync="modalBank"
        title="申请退回保证金"
        width="600px"
        close-on-click-modal
        custom-class="dialog-scustom"
      >
        <div class="bank-container">
          <div class="item">说明： <span class="red">申请退回保证金则视为关闭店铺，请谨慎操作！</span></div>
          <div class="item">
            <div v-if="online > 0">线上支付的保证金 <span class="red">{{online}}元</span>会原路返回</div>
            
            <div v-if="offline > 0">
              线下支付的保证金<span class="red">{{offline}}元，</span>会通过下方账号信息返回，请务必确认下方您的收款信息真实有效，以确保资金可顺利退回，感谢配合！
            </div>
          </div>
          <div class="title">账号信息：</div>
           <el-form ref="bankValidate" :model="bankValidate" :rules="bankRules" label-width="100px" @submit.native.prevent>
            <el-form-item label="真实姓名：" prop="name">
              <el-input v-model="bankValidate.name" type="text" size="small" placeholder="请输入真实姓名" />
            </el-form-item>
            <el-form-item label="开户银行：" prop="code">
              <el-input v-model="bankValidate.code" type="text" size="small" placeholder="请输入开户银行" />
            </el-form-item>
            <el-form-item v-if="bankValidate.type == 1" label="银行卡号：" prop="pic">
              <el-input v-model="bankValidate.pic" type="number" size="small" placeholder="请输入银行卡号" />
            </el-form-item>
            <el-form-item v-if="bankValidate.type == 2" label="收款二维码：">
              <img v-if="bankValidate.pic" :src="bankValidate.pic" style="width: 120px;height: 120px;">
              <div v-else class="red">
                请前往财务-收款方式页面填写收款信息
              </div>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="bankConfirm('bankValidate')">确定</el-button>
        </span>
      </el-dialog>
      <div v-if="infoType == '2'" class="business-msg">
        <div class="form-data">
          <el-form ref="ruleForm" :model="merData" :rules="rules" label-width="150px" class="demo-ruleForm">
            <el-form-item class="form-item" label="店铺背景图：" prop="mer_banner">
              <div class="upLoadPicBox" @click="modalPicTap('1')">
                <div v-if="merData.mer_banner" class="pictrue">
                  <img :src="merData.mer_banner">
                </div>
                <div v-else class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
                <div class="trip">建议尺寸：710*200px</div>
              </div>
            </el-form-item>
            <el-form-item class="form-item" label="店铺头像：" prop="mer_avatar">
              <div class="upLoadPicBox" @click="modalPicTap('2')">
                <div v-if="merData.mer_avatar" class="pictrue">
                  <img :src="merData.mer_avatar">
                </div>
                <div v-else class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
                <div class="trip">建议尺寸：120*120px</div>
              </div>
            </el-form-item>
            <el-form-item class="form-item" label="店铺街背景图：">
              <div class="upLoadPicBox" @click="modalPicTap('3')">
                <div v-if="merData.mini_banner" class="pictrue">
                  <img :src="merData.mini_banner">
                </div>
                <div v-else class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
                <div class="trip">建议尺寸：710*134px或710*460px(请根据平台要求选择尺寸，此图如未上传默认展示店铺背景图)</div>    
              </div> 
            </el-form-item>
            <el-form-item class="form-item" label="店铺资质：" :prop="merData.sys_bases_status == 1 ? 'uploadedqualifications' : ''">
              <div class="upLoadPicBox_qualification">
                <div v-for="(item, index) in uploadedQualifications" :key="index" class="uploadpicBox_list">
                  <div class="uploadpicBox_list_image">
                    <el-image ref="elImage" :src="item.url" :preview-src-list="[item.url]" />
                  </div>
                  <div class="uploadpicBox_list_method">
                    <i class="el-icon-delete" @click="deldetQualificationsList(index)" />
                    <i class="el-icon-view" @click="viewImage(item, index)" />
                  </div>
                </div>
                <el-upload :action="fileUrl" :show-file-list="false" list-type="picture-card" multiple :headers="myHeaders" :on-success="setQualificationsList" :before-upload="beforeUploadQualification">
                  <i class="el-icon-plus" />
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item label="配送方式:" prop="delivery_way">
              <el-checkbox-group v-model="merData.delivery_way">
                <el-checkbox v-for="item in deliveryList" :key="item.value" :label="item.value">
                  {{ item.name }}
                </el-checkbox>
              </el-checkbox-group> <span class="trip">只选择一种配送方式时,会自动修改店铺所有商品的配送方式</span>
            </el-form-item>
            <el-row v-if="(merData.delivery_way.length == 1 && merData.delivery_way[0] == '1') || (merData.delivery_way.length == 2)" :gutter="24">
              <el-col :span="24">
                <el-form-item label="提货点名称：" prop="mer_take_name">
                  <el-input v-model="merData.mer_take_name" maxlength="30" placeholder="请输入提货点名称" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="提货点电话：" prop="mer_take_phone">
                  <el-input
                    v-model="merData.mer_take_phone"
                    placeholder="请输入提货点电话"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="(merData.delivery_way.length == 1 && merData.delivery_way[0] == '1') || (merData.delivery_way.length == 2)" >
              <el-col :span="24">
                <el-form-item label="详细地址：" prop="mer_take_address">
                  <el-input v-model="merData.mer_take_address" placeholder="请输入详细地址" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="经纬度：" prop="mer_take_location">
                  <el-input
                    v-model="merData.mer_take_location"
                    enter-button="查找位置"
                    placeholder="请查找位置"
                    readonly
                  >
                    <el-button
                      slot="append"
                      type="primary"
                      @click="onSearchs"
                    >查找位置</el-button>
                  </el-input>
                  <div slot="content">请点击查找位置选择位置</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="(merData.delivery_way.length == 1 && merData.delivery_way[0] == '1') || (merData.delivery_way.length == 2)" >
              <el-col :span="24">
                <el-form-item label="提货点营业日期：" prop="mer_take_day">
                  <el-select
                    v-model="merData.mer_take_day"
                    filterable
                    multiple
                    placeholder="请选择营业时间"
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
              <el-col :span="24">
                <el-form-item label="提货点营业时间：" required>
                  <el-time-picker
                    v-model="value1"
                    placeholder="开始时间"
                    value-format="HH:mm"
                    @change="onchangeTime1">
                  </el-time-picker>
                  <el-time-picker
                    v-model="value2"
                    placeholder="结束时间"
                    value-format="HH:mm"
                    @change="onchangeTime2">
                  </el-time-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="商户简介：" prop="mer_info">
                  <el-input v-model="merData.mer_info" type="textarea" placeholder="文字简介，200字以内" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="商户关键字：" prop="mer_keyword">
                  <div class="tip-form">
                    <el-input v-model="merData.mer_keyword" style="min-width: 200px;" placeholder="用户在搜索该关键字时，可搜索到本店铺" />
                  </div>
                </el-form-item>
                <el-form-item label="客服电话：">
                  <el-input v-model="merData.service_phone" type="number"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="商户地址：" prop="mer_address">
                  <el-input v-model="merData.mer_address" enter-button="查找位置" placeholder="请输入商户地址（地址中请包含城市名称，否则会影响搜索精度）">
                    <el-button slot="append" type="primary" @click="onSearch">查找位置</el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div style="width: 460px;margin-left: 150px;">
              <Maps v-if="mapKey" ref="mapChild" class="map-sty" :map-key="mapKey" :lat="Number(merData.lat || 34.34127)" :lon="Number(merData.long || 108.93984)" :address="merData.mer_address" @getCoordinates="getCoordinates" />
            </div>
            <el-form-item />
          </el-form>
        </div>
      </div>
      <div v-if="infoType == '3'" class="user-msg">
        <div class="basic-information">
          <span class="basic-label"> 商户手续费：</span>
          {{ Number(merData.commission_rate) > 0 ? (parseFloat(merData.commission_rate)).toFixed(2) : (parseFloat(merData.merchantCategory.commission_rate * 100)).toFixed(2)}}%
        </div>
        <div class="basic-information">
          <span class="basic-label"> 添加商品：</span>
          {{ merData.is_audit ? "需平台审核" : "平台免审核" }}
        </div>
        <div class="basic-information">
          <span class="basic-label"> 开启直播间：</span>
          {{ merData.is_bro_room ? "需平台审核" : "平台免审核" }}
        </div>
        <div class="basic-information">
          <span class="basic-label"> 添加直播商品：</span>
          {{ merData.is_bro_goods ? "需平台审核" : "平台免审核" }}
        </div>
        <div class="basic-information">
          <span class="basic-label"> 平台首页推荐商户：</span>
          {{ merData.is_best ? "是" : "否" }}
        </div>
      </div>
      <div v-if="infoType != 3" class="submit-button">
        <el-button type="primary" :loading="submitLoading" @click="submitForm('ruleForm')">提交</el-button>
      </div>
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
    <!--保证金记录-->
    <el-dialog
      v-if="modalRecord"
      :visible.sync="modalRecord"
      title="操作记录"
      width="800px"
      close-on-click-modal
      class="mapBox"
      custom-class="dialog-scustom"
    >
     <el-table :data="tableData.data" :loading="loading" size="small">
      <el-table-column label="序号" min-width="50">
        <template scope="scope">
          <span>{{ scope.$index+(tableFrom.page - 1) * tableFrom.limit + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="90" prop="title" />
      <el-table-column prop="number" label="金额" min-width="60">
        <template scope="scope">
          <span v-if="scope.row.pm == 1" style="color:#13ce66">+{{scope.row.number}}</span>
          <span v-else style="color:rgb(237, 64, 20)">-{{scope.row.number}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="balance" label="保证金结余" min-width="100" />
      <el-table-column label="备注" min-width="150" prop="mark" />
      <el-table-column prop="create_time" label="操作时间" min-width="120" />
    </el-table>
    <div class="acea-row row-right page">
      <el-pagination
        :page-sizes="[20, 40, 60, 80]"
        :page-size="tableFrom.limit"
        :current-page="tableFrom.page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="pageChange"
      />
    </div>
    </el-dialog>
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
import { storeGetInfoApi, marginCode, marginMakeCode, marginRecordLst, marginRefund, marginRefundApply } from '@/api/setting'
import { getBaseInfo, merchantUpdate } from '@/api/user.js'
import Maps from '@/components/map/map.vue'

import { mapState } from 'vuex'
import { getToken } from '@/utils/auth'
import SettingMer from '@/libs/settingMer'
import { roterPre } from '@/settings'
// 二维码组件
import VueQr from 'vue-qr'
export default {
  name: 'Information',
  components: { Maps, VueQr },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入客服电话'))
      } else {
        let regPone = null
        const mobile = /^1(3|4|5|6|7|8|9)\d{9}$/ // 最新16手机正则
        const tel = /^(0[0-9]{2,3}\-)([2-9][0-9]{4,7})+(\-[0-9]{1,4})?$/ // 座机
        const tels = /^400-[016789]\d{2}-\d{4}$/
        if (value.charAt(0) == 0) {
          // charAt查找第一个字符方法，用来判断输入的是座机还是手机号
          regPone = tel
        }else if(value.charAt(0) == 4){
          regPone = tels
        } else {
          regPone = mobile
        }
        if (!regPone.test(value)) {
          return callback(new Error("请填写客服电话(座机格式'区号-座机号码'),400格式：400-XXX-XXXX"))
        }
        callback()
      }
    }

  // const checkPhone= (rule, value, callback) =>{
  //     const phoneExp = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
  //     setTimeout(()=>{
  //       if(value !== undefined && value !==''){
  //         if ((!phoneExp.test(value)) && value !== '') {
  //           callback(new Error('请输入正确的格式！'));
  //         } else {
  //           callback();
  //         }
  //       }else{
  //         callback()
  //       }
  //     },100)
  //   }
  
// var checkPhone = (rule, value, callback) => {
//       if (value === '') {
//         callback(new Error('请输入电话号码'))
//       }
//       if (value.length !== 11) {
//         callback(new Error('请输入正确电话号码'))
//       }
//       if (value.length !== 11) {
//         callback(new Error('请输入正确电话号码'))
//       }
//       // 验证电话号码手机号码，包含至今所有号段? ?
//       var ab = /^[1][3,4,5,7,8][0-9]{9}$/
//       if (ab.test(value) === false) {
//         callback(new Error('请输入正确电话号码'))
//       }
//       callback()
//     }

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
      merModel: false,
      modalMap: false,
      modalBank: false,
      modalRecord: false,
      loading: false,
      roterPre: roterPre,
      qrCode: '',
      qrEndTime: '',
      supplyPay: false,
      goPay: false,
      tableFrom: {
        page: 1,
        limit: 20
      },
      tableData: {
        total: 0,
        data: []
      },
      value1: "",
      value2: "",
      marginPrice: 0,
      merData: {
        delivery_way: [],
        mer_take_name: '',
        mer_take_phone: '',
        mer_take_address: '',
        mer_take_time: ['', ''],
        mer_take_day: [],
        mer_take_location: '',
        id: 0,
        mer_take_status: 0 }, // 默认数据
      myHeaders: { 'X-Token': getToken() },
      uploadedQualifications: [], // 资质图片列表
      mapKey: '', // 地图key
      address: '',
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
      submitLoading: false, // 提交loading
      deliveryList: [
        { value: '1', name: '到店自提' },
        { value: '2', name: '快递配送' }
      ],
      rules: {
        mer_banner: [{ required: true, message: '请上传店铺banner' }],
        mer_avatar: [{ required: true, message: '请上传店铺头像' }],
        mer_info: [{ required: true, message: '请输入商户简介', trigger: 'blur' },
          { min: 3, max: 200, message: '长度在 3 到 200 个字符', trigger: 'blur' }
        ],
        mer_keyword: [{ required: false, message: '请输入商户关键字', trigger: 'blur' }],
        mer_address: [{ required: true, message: '请输入商户地址', trigger: 'blur' }],
        uploadedqualifications: [{ required: true, message: '请上传商户资质', trigger: 'blur' }],
        delivery_way: [{ required: true, message: '请选择送货方式', trigger: 'change' }],
        mer_take_name: [{ required: true, message: '请输入提货点名称', trigger: 'blur' }],
        mer_take_day: [{ required: true, type: 'array', message: '请选择提货点营业日期', trigger: 'change' }],
        mer_take_time: [{ required: true, message: '请选择提货点营业时间', trigger: 'change' }],
        mer_take_phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        mer_take_address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        mer_take_location: [{ required: true, message: '请选择经纬度', trigger: 'blur' }]
      },
      bankValidate: {
        code: "",
        name: "",
        type: 1,
        pic: ""
      },
      bankRules: {
        code: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
        pic: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' },
          { pattern: /\d{10,19}/, message: '请输入正确的银行账号', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
      },
      offline: "",
      online: "",
      keyUrl: '',
      infoType: '1',
      tabList: [
        {value: '1',title: '基本信息'},
        {value: '2',title: '店铺信息'},
        {value: '3',title: '功能信息'}
      ]
    }
  },
  computed: {
    fileUrl() {
      return SettingMer.https + `/upload/certificate`
    }
  },
  watch: {
    uploadedQualifications(val) {
      // 由于 uploadedqualifications 字段未被添加到 merData 对象中，因此，使用 1 或 '' 作为符号表示 merData 中的 uploadedqualifications 图片列表是否添加完毕
      if (val.length) {
        this.merData.uploadedqualifications = 1
      } else {
        this.merData.uploadedqualifications = ''
      }
    }
  },
  created() {
    this.getMapInfo()
    

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
    this.getInfo()
  },
  methods: {
    // 营业时间
    onchangeTime1(e) {
      this.value1 = e;
      this.merData.mer_take_time[0] = e
    },
     onchangeTime2(e) {
      this.value2 = e;
      this.merData.mer_take_time[1] = e
    },
    // 选择经纬度
    selectAdderss(data) {
      this.merData.mer_take_location = data.latlng.lat + ',' + data.latlng.lng
      this.modalMap = false
    },
    onSearchs() {
      if (!this.key || this.key == '') { this.$message.error('平台未配置腾讯地图KEY') } else this.modalMap = true
    },
    // 地图信息获取
    getCoordinates(data) {
      // this.merData.mer_address = data.address;
      this.merData.lat = data.location.lat || 34.34127
      this.merData.long = data.location.lng || 108.93984
      console.log(data)
    },
    // 获取历史信息
    getInfo() {
      const that = this
      that.merModel = false
      getBaseInfo().then((res) => {
        that.merData = res.data
        that.$set(that.merData, 'uploadedqualifications', '') // 资质图片列表
        that.$set(that.merData, 'delivery_way', res.data.delivery_way && res.data.delivery_way.length ? res.data.delivery_way.map(String) : [])
        that.key = res.data.tx_map_key
        const keys = res.data.tx_map_key
        that.keyUrl = `https://apis.map.qq.com/tools/locpicker?type=1&key=${keys}&referer=myapp`
        const info = res.data || null
        that.value1 = info.mer_take_time[0] || ''
        that.value2 = info.mer_take_time[1] || ''
        that.merData.mer_take_time = info.mer_take_time || ['', '']
        that.merData.mer_take_day = info.mer_take_day || []
        that.merData.mer_take_phone = info.mer_take_phone
        that.merData.mer_take_name = info.mer_take_name
        that.merData.mer_take_address = info.mer_take_address
        that.marginPrice = info.is_margin
        that.merData.margin = info.margin
        that.merData.mer_take_location =
            info.mer_take_location && info.mer_take_location.length
              ? info.mer_take_location[0] + ',' + info.mer_take_location[1]
              : ''
        that.merData.mer_take_status = info.mer_take_status || 0
        that.merData.refundMarginOrder = info.refundMarginOrder
        that.merData.marginStatus = info.margin_remind_status
        this.merModel = true
        if (res.data.mer_certificate instanceof Array) {
          res.data.mer_certificate.forEach((item) => {
            that.uploadedQualifications.push({ url: item })
          })
        } else {
          that.uploadedQualifications = []
        }   
        if(that.merData.is_margin == 1)(this.getCode())
      })
    },
    // 提交线下转账信息
    bankConfirm(name){
      this.$refs[name].validate(valid => {
        if (valid) {
          marginRefundApply(this.bankValidate)
            .then((res) => {
              this.$message.success(res.message)
              this.modalBank = false;
              this.getInfo()
            })
            .catch((res) => {
              this.$message.error(res.message)
            })
        } else {
          this.$message.error('请完善信息后再进行提交')
          return false
        }
      })
    },
    // 提交/修改
    submitForm(formName) {
      if(this.infoType == 2){
        this.$refs[formName].validate(valid => {
          if (valid) {
            const dataKey = Object.keys(this.rules)
            const reqData = {};
            [...dataKey, 'mer_state', 'long', 'lat', 'mini_banner', 'service_phone'].map(item => {
              reqData[item] = this.merData[item]
            })
            reqData.type = this.infoType
            reqData.mer_certificate = this.uploadedQualifications.map(item => item.response ? item.response.data.src : item.url)
            const location = this.merData.mer_take_location
              ? [
                this.merData.mer_take_location.split(',')[0],
                this.merData.mer_take_location.split(',')[1]
              ] : []
            reqData.mer_take_location = location
            this.submitLoading = true
            merchantUpdate(reqData)
              .then((res) => {
                console.log(res)
                this.submitLoading = false
                this.$message.success('提交成功')
              })
              .catch((rej) => {
                this.submitLoading = false
                this.$message.error(rej.data.message)
              })
          } else {
            this.$message.error('请完善信息后再进行提交')
            this.submitLoading = false
            return false
          }
        })
      }else{
        let data = {
          mer_state: this.merData.mer_state,
          type: this.infoType
        }
         merchantUpdate(data)
          .then((res) => {
            console.log(res)
            this.submitLoading = false
            this.$message.success('提交成功')
          })
          .catch((rej) => {
            this.submitLoading = false
            this.$message.error(rej.data.message)
        })
      }  
    },
    // 获取支付二维码
    getCode() {
      let that = this
      if(this.merData.marginStatus){
        marginMakeCode()
        .then((res) => {
          that.qrCode = res.data.config
          that.qrEndTime = res.data.endtime
          that.marginPrice = res.data.price
        })
        .catch(function(res) {
          that.$message.error(res.message)
        })
      }else{
        marginCode()
        .then((res) => {
          that.qrCode = res.data.config
          that.qrEndTime = res.data.endtime
          that.marginPrice = res.data.price
        })
        .catch(function(res) {
          that.$message.error(res.message)
        })
      }
    },
    // 查看保证金记录
    viewRecords() {
      this.modalRecord = true;
      this.getRecordList()
    },
    // 保证金记录列表
    getRecordList(){
      let that = this
      that.loading = true;
      marginRecordLst(that.tableFrom).then(async (res) => { 
        that.tableData.data = res.data.list;
        that.tableData.total = res.data.count;
        that.loading = false;
      }).catch((res) => {
        that.loading = false;
        that.$message.error(res.message);
      });
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getList()
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList()
    },
    // 申请退回保证金
    applyReturn() {
      let that = this;
      that.$confirm('申请退回保证金则视为关闭店铺，请谨慎操作！您是否确定继续操作？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        marginRefund()
        .then((res) => {
          that.bankValidate = res.data.info
          that.offline = res.data.offline 
          that.online = res.data.online
          if(Number(res.data.offline) <= 0){
           marginRefundApply(this.bankValidate)
            .then((res) => {
              this.$message.success(res.message)
              this.getInfo()
            })
            .catch((res) => {
              this.$message.error(res.message)
            })
          }else{
            that.modalBank = true
          }
        })
        .catch(function(res) {
          that.$message.error(res.message)
        })
      })
    },
    // 查找位置
    onSearch() {
      console.log(this.$refs)
      this.$refs.mapChild.searchKeyword(this.merData.mer_address)
    },
    // 获取 map key
    getMapInfo() {
      const that = this
      storeGetInfoApi()
        .then((res) => {
          console.log(res)
          this.mapKey = res.data.tx_map_key
        })
        .catch(function(res) {
          that.$message.error(res.message)
        })
    },
    // 上传图片
    modalPicTap(tit, num, i) {
      const _this = this
      this.$modalUpload((img) => {
        if (tit === '1' && !num) {
          _this.merData.mer_banner = img[0]
        }
        if (tit === '2' && !num) {
          _this.merData.mer_avatar = img[0]
        }
        if (tit === '3' && !num) {
          _this.merData.mini_banner = img[0]
        }
      }, tit)
    },

    // 资质图片删除
    deldetQualificationsList(index) {
      this.uploadedQualifications.splice(index, 1)
    },
    // 上传文件之前的钩子函数
    beforeUploadQualification() {
      if (this.uploadedQualifications.length >= 5) {
        this.$message.error('上传文件最大数量为5张, 上传失败!')
        return false
      } else {
        return true
      }
    },
    // 上传成功
    setQualificationsList(response) {
      if (response.status === 200) {
        this.uploadedQualifications.push({ url: response.data.src })
      } else {
        this.$message.error(response.message)
      }
    },
    // 查看资质图片
    viewImage(item, index) {
      this.$refs.elImage[index].clickHandler()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-textarea__inner{
  height: 90px;
}
.information {
  width: 100%;
  padding: 10px 20px 80px 20px;
  h2 {
    text-align: center;
    color: #303133;
    font-weight: bold;
    font-size: 20px;
  }
  .lab-title {
    width: max-content;
    font-size: 14px;
    font-weight: bold;
    color: #303133;
    margin: 10px 10%;
    &::before{
      content: "";
      display: inline-block;
      width: 3px;
      height: 13px;
      background-color: #1890FF;
      margin-right: 6px;
      position: relative;
      top: 1px;
    }
  }
  .user-msg {
    padding: 0 20px;
    margin-top: 20px;
  }
  .basic-information {
    padding: 0 100px;
    margin-bottom: 20px;
    font-size: 13px;
    text-rendering: optimizeLegibility;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
    color: #606266;
    .basic-label{
      display: inline-block;
      text-align: right;
      width: 150px;
      margin-right: 10px;
    }
  }
  .trip {
    color: #999999;
    font-weight: normal;
    font-size: 12px;
  }
  /deep/.el-form-item__label{
    color: #303133;
  }
  .demo-ruleForm{
    overflow: hidden;
  }
  .form-data {
    padding: 30px 8%;
    .map-sty {
      width: 100%;
    }
    .pictrue img {
      border-radius: 4px;
      object-fit: cover;
    }
    .tip-form {
      display: flex;
      align-items: center;
      span {
        white-space: nowrap;
        padding-left: 10px;
        line-height: 20px;
      }
    }
  }
  .submit-button {
    display: flex;
    justify-content: center;
    // position: fixed;
    bottom: 20px;
    // left: 50%;
    width: 80%;
    padding: 10px 0;
    background-color: rgba(255, 255, 255, 0.7);
  }
}
.bank-container{
  padding: 0 20px;
  .item{
    margin-top: 10px;
    color: #282828;
    font-size: 13px;
    line-height: 26px; 
  }
  .red{
    color:rgb(237, 64, 20);;
  }
  .title{
    color:#303133;
    margin: 15px 0;
    font-weight: bold;

  }
}
.font_red {
  color: red;
  margin-right: 5px;
  font-weight: bold;
}
.spanBtn{
  color:#1890ff;
  font-size:12px;
  cursor: pointer;
}
.margin_main{
  position: relative;
  .margin_price{
    cursor: pointer;
  }
}
.margin_modal{
    position: absolute;
    left: -20px;
    top: 20px;
    border-radius: 8px;
    background: #fff;
    align-items: center;
    justify-content: center;
    z-index: 9;
    width: 250px;
    padding-bottom: 30px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    display: none;
    .alic{
      text-align: center;
    }
    img{
      display: block;
      width: 150px;
      height: 116px;
      margin: 20px auto 50px;
    }
    span{
      margin-bottom: 10px;
      display: block;
      font-weight: normal;
      text-align: center;
    }
    .text_g{
      font-size: 16px;
      color: #303133;
    }
    .text_b{
      color: #606266;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 14px;
      &.b02{
        color: #EF9B6F;
      }
      &.b01{
        color: #57D1A0;
      }
    }
    .el-button{
      margin-top: 25px;
    }
  }
  .margin_refused{
    display: block;
    margin-bottom: 10px;
    text-align: center;
    color: #606266;
    span{
      display: inline;
      // color: red;
    }
  }
.margin_count {
  position: relative;
  display: inline-block;
  padding-bottom: 10px;
  .pay_btn:hover + .erweima {
    display: block;
  }
  &:hover{
    .margin_modal{
      display: block;
    }
  }
  .erweima {
    position: absolute;
    left: 0;
    top: 30px;
    z-index: 9;
    display: none;
    width: 250px;
    height: 320px;
    text-align: center;
    background: #fff;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    
    img{
      width: 160px;
      height: 160px;
      margin-top: 20px;
    }
    .pay_type{
      font-size: 16px;
      color: #303133;
      font-weight: normal;
     
    }
    .pay_price{
      font-size: 18px;
      color: #E57272;
      margin: 10px 0;
    }
    .pay_title{
      font-size: 16px;
      color: #303133;
      margin-top: 20px;
    }
    .pay_time{
      font-size: 12px;
      color: #6D7278;
      
    }
  }

}
/deep/ .el-upload--picture-card {
  width: 58px;
  height: 58px;
  line-height: 70px;
}

/deep/.el-upload-list__item {
  width: 58px;
  height: 58px;
}

.upLoadPicBox_qualification {
  display: flex;
  flex-wrap: wrap;
  .uploadpicBox_list {
    position: relative;
    height: 58px;
    width: 58px;
    margin: 0 20px 20px 0;
    .uploadpicBox_list_image {
      position: absolute;
      top: 0;
      left: 0;
      width: 58px;
      height: 58px;
      border-radius: 4px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .uploadpicBox_list_method {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 4px;
      opacity: 0;
      width: 100%;
      height: 100%;
      transition: 0.3s;
    }
  }
}
.uploadpicBox_list:hover .uploadpicBox_list_method {
  z-index: 11;
  opacity: 1;
}
</style>
