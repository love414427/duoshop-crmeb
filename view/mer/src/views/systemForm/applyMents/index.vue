<template>
  <div class="divBox">
    <el-card class="box-card">
      <div class="splitGuide">
        <span v-if="open_wx_sub_mch" class="color_red">温馨提示：平台已开通电商收付通，子商户可在此处提交相应资料，审核完成后，即可实现自动分账</span>
        <span v-else class="color_red">温馨提示：平台未开通电商收付通，此处不许做任何操作</span>
        <el-button type="primary" size="small" class="guideBtn" @click="dialogVisible = true">申请分账商户指南</el-button>
      </div>
      <div v-if="open_wx_sub_mch">
        <el-form
          v-if="status==-1 || status==0 || status==40 || !applyment_id"
          ref="formValidate"
          v-loading="fullscreenLoading"
          class="formValidate mt20"
          :rules="ruleValidate"
          :model="formValidate"
          label-width="180px"
          @submit.native.prevent
        >
          <el-row>
            <el-col v-if="formValidate.out_request_no">
              <el-form-item label="业务申请编号：">
                <span>{{ formValidate.out_request_no }}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="主体类型：" prop="organization_type">
                <el-radio-group v-model="formValidate.organization_type" @change="typeChange">
                  <el-radio :label="2401" class="radio">小微商户</el-radio>
                  <el-radio :label="2500">个人卖家</el-radio>
                  <el-radio :label="2">企业</el-radio>
                  <el-radio :label="4">个体工商户</el-radio>
                  <el-radio :label="3">党政、机关及事业单</el-radio>
                  <el-radio :label="1708">其他组织</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col v-if="formValidate.organization_type != 2401 && formValidate.organization_type != 2500">
              <div class="title">{{ (formValidate.organization_type == 2 || formValidate.organization_type == 4) ? '营业执照信息' : '登记证书信息' }}</div>
              <el-form-item label="证件扫描件：" prop="business_license_copy">
                <div v-if="formValidate.business_license_copy && formValidate.business_license_copy['dir']" class="upLoadPicBox">
                  <div class="pictrue">
                    <img :src="formValidate.business_license_copy['dir']" @click="getPicture(formValidate.business_license_copy['dir'])">
                    <i class="el-icon-error btndel" @click="formValidate.business_license_copy = []" />
                  </div>
                </div>
                <el-upload
                  v-else
                  class="upload-demo mr10 mb15"
                  :action="fileUrl"
                  :on-success="handleSuccess"
                  :headers="myHeaders"
                  :show-file-list="false"
                >
                  <div class="upLoadPicBox">
                    <div class="upLoad">
                      <i class="el-icon-camera cameraIconfont" />
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item label="证件注册号：" required>
                <el-input v-model="formValidate.business_license_number" :min="15" :max="18" placeholder="请输入证件注册号,须为15位数字或 18位数字|大写字母" />
              </el-form-item>
              <el-form-item label="商户名称：" prop="merchant_name">
                <el-input v-model="formValidate.merchant_name" placeholder="请填写营业执照/登记证书的商家名称，2~110个字符，支持括号" />
              </el-form-item>
              <el-form-item label="经营者/法定代表人姓名：" prop="legal_person">
                <el-input v-model="formValidate.legal_person" placeholder="请输入经营者/法定代表人姓名" />
              </el-form-item>
              <el-form-item label="注册地址：">
                <el-input v-model="formValidate.company_address" placeholder="请填写登记证书的注册地址" />
              </el-form-item>
              <el-form-item label="营业期限：">
                <el-date-picker
                  v-model="business_start"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  size="small"
                  type="date"
                  placement="bottom-end"
                  placeholder="开始时间"
                  style="width: 250px;"
                  :picker-options="pickerOptions3"
                  @change="onchangeBusinessStart"
                />
                <el-date-picker
                  v-if="!business_long"
                  v-model="business_end"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  size="small"
                  type="date"
                  placement="bottom-end"
                  placeholder="结束时间"
                  style="width: 250px;"
                  :picker-options="pickerOptions4"
                  @change="onchangeBusinessEnd"
                />
                <el-checkbox v-model="business_long" @change="changeTime3">长期</el-checkbox>
              </el-form-item>
            </el-col>
            <!--<el-col v-if="formValidate.organization_type != 2401 && formValidate.organization_type != 2500">
              <div class="title">组织机构代码证信息</div>
              <el-form-item label="组织机构代码证照片：" prop="organization_copy">
                <div v-if="formValidate.organization_copy && formValidate.organization_copy['dir']" class="upLoadPicBox">
                  <div class="pictrue">
                    <img :src="formValidate.organization_copy['dir']" @click="getPicture(formValidate.organization_copy['dir'])">
                    <i class="el-icon-error btndel" @click="formValidate.organization_copy = []" />
                  </div>
                </div>
                <el-upload
                  v-else
                  class="upload-demo mr10 mb15"
                  :action="fileUrl"
                  :on-success="handleSuccess2"
                  :headers="myHeaders"
                  :show-file-list="false"
                >
                  <div class="upLoadPicBox">
                    <div class="upLoad">
                      <i class="el-icon-camera cameraIconfont" />
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item label="组织机构代码：" prop="organization_number">
                <el-input v-model="formValidate.organization_number" placeholder="请输入组织机构代码证上的组织机构代码" />
              </el-form-item>
              <el-form-item label="组织机构代码有效期限:" required>
                <el-date-picker
                  v-model="start_time"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  size="small"
                  type="date"
                  placement="bottom-end"
                  placeholder="开始时间"
                  style="width: 250px;"
                  :picker-options="pickerOptions1"
                  @change="onchangeStart"
                />
                <el-date-picker
                  v-if="!long"
                  v-model="end_time"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  size="small"
                  type="date"
                  placement="bottom-end"
                  placeholder="到期时间"
                  style="width: 250px;"
                  :picker-options="pickerOptions2"
                  @change="onchangeEnd"
                />
                <el-checkbox v-model="long" @change="changeTime">长期</el-checkbox>
              </el-form-item>
            </el-col>-->
            <el-col>
              <div class="title">证件类型</div>
              <el-form-item label="经营者/法人证件类型：" prop="id_doc_type">
                <el-select v-model="formValidate.id_doc_type" filterable placeholder="请选择" class="selWidth">
                  <el-option label="中国大陆居民-身份证" value="1" />
                  <el-option v-if="formValidate.organization_type != 2401 && formValidate.organization_type != 2500" label="其他国家或地区居民-护照" value="2" />
                  <el-option v-if="formValidate.organization_type != 2401 && formValidate.organization_type != 2500" label="中国香港居民–来往内地通行证" value="3" />
                  <el-option v-if="formValidate.organization_type != 2401 && formValidate.organization_type != 2500" label="中国澳门居民–来往内地通行证" value="4" />
                  <el-option v-if="formValidate.organization_type != 2401 && formValidate.organization_type != 2500" label="中国台湾居民–来往大陆通行证" value="5" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-if="formValidate.id_doc_type == 1">
              <div class="title">经营者/法人身份证信息</div>
              <el-form-item label="身份证人像面照片：" prop="id_card_copy">
                <div v-if="formValidate.id_card_copy && formValidate.id_card_copy['dir']" class="upLoadPicBox">
                  <div class="pictrue">
                    <img :src="formValidate.id_card_copy['dir']" @click="getPicture(formValidate.id_card_copy['dir'])">
                    <i class="el-icon-error btndel" @click="formValidate.id_card_copy = []" />
                  </div>
                </div>
                <el-upload
                  v-else
                  class="upload-demo mr10 mb15"
                  :action="fileUrl"
                  :on-success="handleSuccess3"
                  :headers="myHeaders"
                  :show-file-list="false"
                >
                  <div class="upLoadPicBox">
                    <div class="upLoad">
                      <i class="el-icon-camera cameraIconfont" />
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item label="身份证国徽面照片：" prop="id_card_national">
                <div v-if="formValidate.id_card_national && formValidate.id_card_national['dir']" class="upLoadPicBox">
                  <div class="pictrue">
                    <img :src="formValidate.id_card_national['dir']" @click="getPicture(formValidate.id_card_national['dir'])">
                    <i class="el-icon-error btndel" @click="formValidate.id_card_national = []" />
                  </div>
                </div>
                <el-upload
                  v-else
                  class="upload-demo mr10 mb15"
                  :action="fileUrl"
                  :on-success="handleSuccess4"
                  :headers="myHeaders"
                  :show-file-list="false"
                >
                  <div class="upLoadPicBox">
                    <div class="upLoad">
                      <i class="el-icon-camera cameraIconfont" />
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item label="身份证姓名：" prop="id_card_name">
                <el-input v-model="formValidate.id_card_name" placeholder="请输入经营者/法定代表人对应身份证的姓名" />
              </el-form-item>
              <el-form-item label="身份证号码：" prop="id_card_number">
                <el-input v-model="formValidate.id_card_number" :min="15" :max="18" placeholder="请输入经营者/法定代表人对应身份证的号码" />
              </el-form-item>
              <el-form-item label="身份证开始时间:" required>
                <el-date-picker
                  v-model="idCard_start_time"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  size="small"
                  type="date"
                  placement="bottom-end"
                  placeholder="开始时间"
                  style="width: 250px;"
                  @change="onchangeIdBegin"
                />
              </el-form-item>
              <el-form-item label="身份证有效期限:" required>
                <el-date-picker
                  v-if="!effective_long"
                  v-model="effective_time"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  size="small"
                  type="date"
                  placement="bottom-end"
                  placeholder="到期时间"
                  style="width: 250px;"
                  :picker-options="pickerOptions0"
                  @change="onchangeEffective"
                />
                <el-checkbox v-model="effective_long" @change="changeTime1">长期</el-checkbox>
              </el-form-item>
              <el-form-item v-if="formValidate.organization_type == 2" label="身份证居住地址:" prop="id_card_address">
                <el-input v-model="formValidate.id_card_address" placeholder="请输入身份证居住地址" />
              </el-form-item>
            </el-col>

            <el-col v-if="formValidate.id_doc_type != 1">
              <div class="title">经营者/法人其他类型证件信息</div>
              <el-form-item label="证件姓名：" prop="id_doc_name">
                <el-input v-model="formValidate.id_doc_name" placeholder="请输入经营者/法人姓名" />
              </el-form-item>
              <el-form-item label="证件号码：" prop="id_doc_number">
                <el-input v-model="formValidate.id_doc_number" placeholder="请输入证件号码" />
              </el-form-item>
              <el-form-item label="证件正面照片：" prop="id_doc_copy">
                <div v-if="formValidate.id_doc_copy && formValidate.id_doc_copy['dir']" class="upLoadPicBox">
                  <div class="pictrue">
                    <img :src="formValidate.id_doc_copy['dir']" @click="getPicture(formValidate.id_doc_copy['dir'])">
                    <i class="el-icon-error btndel" @click="formValidate.id_doc_copy = []" />
                  </div>
                </div>
                <el-upload
                  v-else
                  class="upload-demo mr10 mb15"
                  :action="fileUrl"
                  :on-success="handleSuccess5"
                  :headers="myHeaders"
                  :show-file-list="false"
                >
                  <div class="upLoadPicBox">
                    <div class="upLoad">
                      <i class="el-icon-camera cameraIconfont" />
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item v-if="formValidate.id_doc_type != 2" label="证件反面照片：">
                <div v-if="formValidate.id_doc_copy_back && formValidate.id_doc_copy_back['dir']" class="upLoadPicBox">
                  <div class="pictrue">
                    <img :src="formValidate.id_doc_copy_back['dir']" @click="getPicture(formValidate.id_doc_copy_back['dir'])">
                    <i class="el-icon-error btndel" @click="formValidate.id_doc_copy_back = []" />
                  </div>
                </div>
                <el-upload
                  v-else
                  class="upload-demo mr10 mb15"
                  :action="fileUrl"
                  :on-success="handleSuccess9"
                  :headers="myHeaders"
                  :show-file-list="false"
                >
                  <div class="upLoadPicBox">
                    <div class="upLoad">
                      <i class="el-icon-camera cameraIconfont" />
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item label="证件有效期开始时间:" required>
                <el-date-picker
                  v-model="cer_start_time"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  size="small"
                  type="date"
                  placement="bottom-end"
                  placeholder="到期时间"
                  style="width: 250px;"
                  @change="onchangeDoc"
                />
              </el-form-item>
              <el-form-item label="证件结束日期:">
                <el-date-picker
                  v-if="!cer_long"
                  v-model="cer_end_time"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  size="small"
                  type="date"
                  placement="bottom-end"
                  placeholder="到期时间"
                  style="width: 250px;"
                  :picker-options="pickerOptions0"
                  @change="onchangeCer"
                />
                <el-checkbox v-model="cer_long" @change="changeTime2">长期</el-checkbox>
              </el-form-item>
              <el-form-item label="证件居住地址:">
                <el-input v-model="formValidate.id_doc_address" placeholder="请输入证件居住地址" />
              </el-form-item>
            </el-col>
            <el-col>
              <div class="title">结算银行账户</div>
              <el-form-item label="账户类型：" required>
                <el-radio-group v-model="formValidate.bank_account_type">
                  <el-radio v-if="formValidate.organization_type == 2 || formValidate.organization_type == 3 || formValidate.organization_type == 1708 || formValidate.organization_type == 4" :label="74" class="radio">对公账户</el-radio>
                  <el-radio v-if="formValidate.organization_type == 2401 || formValidate.organization_type == 2500 || formValidate.organization_type == 4" :label="75" class="radio">对私账户</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="开户银行：" required>
                <el-select
                  v-model="formValidate.account_bank"
                  placeholder="请选择"
                  class="filter-item selWidth"
                  clearable
                >
                  <el-option
                    v-for="item in brankList"
                    :key="item.label"
                    :label="item.value"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="开户名称：" required>
                <el-input v-model="formValidate.account_name" placeholder="请输入开户名称" />
              </el-form-item>
              <el-form-item class="selWidth" label="开户银行省市编码：" prop="bank_address_code">
                <el-cascader
                  v-model="formValidate.bank_address_code"
                  :options="provinceCodeList"
                  clearable
                  :show-all-levels="false"
                />
              </el-form-item>
              <el-form-item label="开户银行联行号：">
                <el-input v-model="formValidate.bank_branch_id" :max="64" placeholder="请输入开户银行联行号" />
              </el-form-item>
              <el-form-item label="开户银行全称 （含支行）：">
                <el-input v-model="formValidate.bank_name" :max="128" placeholder="请输入开户银行全称" />
              </el-form-item>
              <el-form-item label="银行帐号：" prop="account_number">
                <el-input v-model="formValidate.account_number" :maxlength="40" placeholder="请输入银行帐号" />
              </el-form-item>
            </el-col>
            <el-col>
              <div class="title">超级管理员信息</div>
              <el-form-item label="超级管理员类型：" prop="contact_type">
                <el-radio-group v-model="formValidate.contact_type">
                  <el-radio :label="65" class="radio">经营者/法人</el-radio>
                  <el-radio v-if="formValidate.organization_type != 2401 && formValidate.organization_type != 2500" :label="66" class="radio">经办人</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="formValidate.contact_type == 66" label="超级管理员证件类型：">
                <el-select v-model="formValidate.contact_id_doc_type" filterable placeholder="请选择" class="selWidth">
                  <el-option label="中国大陆居民-身份证" value="1" />
                  <el-option label="其他国家或地区居民-护照" value="2" />
                  <el-option label="中国香港居民–来往内地通行证" value="3" />
                  <el-option label="中国澳门居民–来往内地通行证" value="4" />
                  <el-option label="中国台湾居民–来往大陆通行证" value="5" />
                  <el-option label="外国人居留证" value="6" />
                  <el-option label="港澳居民证" value="7" />
                  <el-option label="台湾居留证" value="8" />
                </el-select>
              </el-form-item>
              <el-form-item v-if="formValidate.contact_type == 66" label="证件正面照片：">
                <div v-if="formValidate.contact_id_doc_copy && formValidate.contact_id_doc_copy['dir']" class="upLoadPicBox">
                  <div class="pictrue">
                    <img :src="formValidate.contact_id_doc_copy['dir']" @click="getPicture(formValidate.contact_id_doc_copy['dir'])">
                    <i class="el-icon-error btndel" @click="formValidate.contact_id_doc_copy = []" />
                  </div>
                </div>
                <el-upload
                  v-else
                  class="upload-demo mr10 mb15"
                  :action="fileUrl"
                  :on-success="handleSuccess10"
                  :headers="myHeaders"
                  :show-file-list="false"
                >
                  <div class="upLoadPicBox">
                    <div class="upLoad">
                      <i class="el-icon-camera cameraIconfont" />
                    </div>
                  </div>
                </el-upload>
              </el-form-item>

              <el-form-item v-if="formValidate.contact_type == 66 && formValidate.contact_id_doc_type != '2'" label="证件反面照片：">
                <div v-if="formValidate.contact_id_doc_copy_back && formValidate.contact_id_doc_copy_back['dir']" class="upLoadPicBox">
                  <div class="pictrue">
                    <img :src="formValidate.contact_id_doc_copy_back['dir']" @click="getPicture(formValidate.contact_id_doc_copy_back['dir'])">
                    <i class="el-icon-error btndel" @click="formValidate.contact_id_doc_copy_back = []" />
                  </div>
                </div>
                <el-upload
                  v-else
                  class="upload-demo mr10 mb15"
                  :action="fileUrl"
                  :on-success="handleSuccess11"
                  :headers="myHeaders"
                  :show-file-list="false"
                >
                  <div class="upLoadPicBox">
                    <div class="upLoad">
                      <i class="el-icon-camera cameraIconfont" />
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item  v-if="formValidate.contact_type == 66"  label="证件有效期开始时间:" required>
                <el-date-picker
                  v-model="contact_start_time"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  size="small"
                  type="date"
                  placement="bottom-end"
                  placeholder="开始时间"
                  style="width: 250px;"
                  @change="onchangeContactStart"
                />
              </el-form-item>
              <el-form-item  v-if="formValidate.contact_type == 66"  label="证件结束日期:" required>
                <el-date-picker
                  v-if="!contact_long"
                  v-model="contact_end_time"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  size="small"
                  type="date"
                  placement="bottom-end"
                  placeholder="到期时间"
                  style="width: 250px;"
                  :picker-options="pickerOptions0"
                  @change="onchangeContactEnd"
                />
                <el-checkbox v-model="contact_long" @change="changeTime4">长期</el-checkbox>
              </el-form-item>
              <el-form-item v-if="formValidate.contact_type == 66" label="业务办理授权函：" prop="business_authorization_letter">
                <div v-if="formValidate.business_authorization_letter && formValidate.business_authorization_letter['dir']" class="upLoadPicBox">
                  <div class="pictrue">
                    <img :src="formValidate.business_authorization_letter['dir']" @click="getPicture(formValidate.business_authorization_letter['dir'])">
                    <i class="el-icon-error btndel" @click="formValidate.business_authorization_letter = []" />
                  </div>
                </div>
                <el-upload
                  v-else
                  class="upload-demo mr10 mb15"
                  :action="fileUrl"
                  :on-success="handleSuccess12"
                  :headers="myHeaders"
                  :show-file-list="false"
                >
                  <div class="upLoadPicBox">
                    <div class="upLoad">
                      <i class="el-icon-camera cameraIconfont" />
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item label="超级管理员姓名：" prop="contact_name">
                <el-input v-model="formValidate.contact_name" placeholder="请输入超级管理员姓名" />
              </el-form-item>
              <el-form-item label="超级管理员身份证件号码：" prop="contact_id_card_number">
                <el-input v-model="formValidate.contact_id_card_number" placeholder="请输入超级管理员身份证件号码" />
              </el-form-item>
              <el-form-item label="超级管理员手机：" prop="mobile_phone">
                <el-input v-model="formValidate.mobile_phone" placeholder="请输入超级管理员手机号" />
              </el-form-item>
              <el-form-item label="超级管理员邮箱：">
                <el-input v-model="formValidate.contact_email" placeholder="请输入超级管理员邮箱" />
              </el-form-item>
            </el-col>
            <!-- 店铺信息 -->
            <el-col>
              <div class="title">店铺信息</div>
              <el-form-item label="店铺名称：" prop="store_name">
                <el-input v-model="formValidate.store_name" placeholder="请输入店铺名称" />
              </el-form-item>
              <el-form-item label="店铺链接：">
                <el-input v-model="formValidate.store_url" placeholder="请输入店铺链接" />
              </el-form-item>
              <el-form-item label="店铺二维码：">
                <div v-if="formValidate.store_qr_code && formValidate.store_qr_code['dir']" class="upLoadPicBox">
                  <div class="pictrue">
                    <img :src="formValidate.store_qr_code['dir']" @click="getPicture(formValidate.store_qr_code['dir'])">
                    <i class="el-icon-error btndel" @click="formValidate.store_qr_code = []" />
                  </div>
                </div>
                <el-upload
                  v-else
                  class="upload-demo mr10 mb15"
                  :action="fileUrl"
                  :data="{water:1}"
                  :on-success="handleSuccess6"
                  :headers="myHeaders"
                  :show-file-list="false"
                >
                  <div class="upLoadPicBox">
                    <div class="upLoad">
                      <i class="el-icon-camera cameraIconfont" />
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item label="小程序AppID：">
                <el-input v-model="formValidate.mini_program_sub_appid" placeholder="请输入小程序AppID" />
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="商户简称：" prop="merchant_shortname">
                <el-input v-model="formValidate.merchant_shortname" type="textarea" placeholder="请输入商户简称" />
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="特殊资质：">
                <div class="acea-row">
                  <div v-if="formValidate.qualifications && formValidate.qualifications.length" class="upLoadPicBox">
                    <div v-for="(item, index) in formValidate.qualifications" :key="index" class="pictrue">
                      <img :src="item.dir" @click="getPicture(item.dir)">
                      <i class="el-icon-error btndel" @click="handleRemove(index)" />
                    </div>
                  </div>
                  <el-upload
                    v-if="formValidate.qualifications.length < 5"
                    class="upload-demo mr10 mb15"
                    :action="fileUrl"
                    :on-success="handleSuccess7"
                    :headers="myHeaders"
                    :show-file-list="false"
                  >
                    <div class="upLoadPicBox">
                      <div class="upLoad">
                        <i class="el-icon-camera cameraIconfont" />
                      </div>
                    </div>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="补充材料：">
                <div class="acea-row">
                  <div v-if="formValidate.business_addition_pics.length" class="upLoadPicBox">
                    <div v-for="(item, index) in formValidate.business_addition_pics" :key="index" class="pictrue">
                      <img :src="item.dir" @click="getPicture(item.dir)">
                      <i class="el-icon-error btndel" @click="handleRemove2(index)" />
                    </div>
                  </div>
                  <el-upload
                    v-if="formValidate.business_addition_pics.length < 5"
                    class="upload-demo mr10 mb15"
                    :action="fileUrl"
                    :on-success="handleSuccess8"
                    :headers="myHeaders"
                    :show-file-list="false"
                  >
                    <div class="upLoadPicBox">
                      <div class="upLoad">
                        <i class="el-icon-camera cameraIconfont" />
                      </div>
                    </div>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="补充说明：" :required="formValidate.organization_type == '2500'">
                <el-input v-model="formValidate.business_addition_desc" type="textarea" :max="512" placeholder="个人卖家主体请填写：该商户已持续从事电子商务经营活动满6个月，且期间经营收入累计超过20万元。" />
              </el-form-item>
            </el-col>
            <el-col v-if="message">
              <el-form-item label="审核结果：">
                <span>{{ message }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="margin-top:30px;">
            <el-button :loading="loading" type="primary" class="submission" size="small" @click="handleSubmit('formValidate')">提交</el-button>
          </el-form-item>
        </el-form>
        <div v-else v-loading="loading">
          <div class="box-container">
            <div class="acea-row">
              <div class="list sp"><label class="name">业务申请编号：</label>{{ formValidate.out_request_no }}</div>
              <div class="list sp"><label class="name">主体类型：</label>{{ formValidate.organization_type | organizationType }}</div>
            </div>
            <div v-if="formValidate.organization_type != 2401 && formValidate.organization_type != 2500" class="acea-row">
              <div class="title" style="margin-top: 20px;">{{ (formValidate.organization_type == 2 || formValidate.organization_type == 4) ? '请上传营业执照' : '请上传登记证书' }}</div>
              <div class="list sp100 image">
                <label class="name">证件扫描件：</label>
                <img
                  style="max-width: 150px; height: 80px;"
                  :src="formValidate.business_license_copy && formValidate.business_license_copy['dir']"
                >
              </div>
              <div class="list sp100"><label class="name">证件注册号：</label>{{ formValidate.business_license_number }}</div>
              <div class="list sp100"><label class="name">商户名称：</label>{{ formValidate.merchant_name }}</div>
              <div class="list sp"><label class="name">经营者/法定代表人姓名：</label>{{ formValidate.legal_person }}</div>
              <div v-if="formValidate.company_address" class="list sp"><label class="name">注册地址：</label>{{ formValidate.company_address }}</div>
              <div v-if="formValidate.business_time" class="list sp"><label class="name">营业期限：</label>{{ formValidate.business_start +'-'+ formValidate.business_end }}</div>
            </div>
            <!--<div v-if="formValidate.organization_cert_info">
              <div class="title" style="margin-top: 20px;">组织机构代码证信息：</div>
              <div class="acea-row">
                <div class="list sp100 image">
                  <label class="name">组织机构代码证照片：</label>
                  <img style="max-width: 150px; height: 80px;" :src="formValidate.organization_copy && formValidate.organization_copy['dir']">
                </div>
                <div class="list sp"><label class="name">组织机构代码：</label>{{ formValidate.organization_number }}</div>
                <div class="list sp"><label class="name">组织机构代码有效期限：</label>{{ formValidate.start_time+'-'+formValidate.end_time }}</div>
                <div class="list sp"><label class="name">经营者/法人证件类型：</label>{{ formValidate.id_doc_type | id_docType }}</div>
              </div>
            </div>-->
            <div v-if="formValidate.id_doc_type == 1">
              <div class="title" style="margin-top: 20px;">经营者/法人身份证信息：</div>
              <div class="acea-row">
                <div class="list sp100 image">
                  <label class="name">身份证人像面照片：</label>
                  <img style="max-width: 150px; height: 80px;" :src="formValidate.id_card_copy && formValidate.id_card_copy['dir']">
                </div>
                <div class="list sp100 image">
                  <label class="name">身份证国徽面照片：</label>
                  <img style="max-width: 150px; height: 80px;" :src="formValidate.id_card_national && formValidate.id_card_national['dir']">
                </div>
                <div class="list sp"><label class="name">身份证姓名：</label>{{ formValidate.id_card_name }}</div>
                <div class="list sp"><label class="name">身份证号码：</label>{{ formValidate.id_card_number }}</div>
                <div class="list sp"><label class="name">身份证有效开始时间：</label>{{ formValidate.id_card_valid_time_begin }}</div>
                <div class="list sp"><label class="name">身份证有效期限：</label>{{ formValidate.id_card_valid_time }}</div>
                <div v-if="formValidate.id_card_address" class="list sp"><label class="name">身份证居住地址：</label>{{ formValidate.id_card_address }}</div>
             </div>
            </div>
            <div v-else>
              <div class="title" style="margin-top: 20px;">经营者/法人其他类型证件信息：</div>
              <div class="acea-row">
                <div class="list sp"><label class="name">证件姓名：</label>{{ formValidate.id_doc_name }}</div>
                <div class="list sp"><label class="name">证件号码：</label>{{ formValidate.id_doc_number }}</div>
                <div class="list sp100 image">
                  <label class="name">证件照片：</label>
                  <img style="max-width: 150px; height: 80px;" :src="formValidate.id_doc_copy && formValidate.id_doc_copy['dir']">
                </div>
                <div class="list sp"><label class="name">证件有效开始日期：</label>{{ formValidate.doc_period_begin }}</div>
                <div class="list sp"><label class="name">证件结束日期：</label>{{ formValidate.doc_period_end }}</div>
              </div>
            </div>
            <div>
              <div class="title" style="margin-top: 20px;">结算银行账户：</div>
              <div class="acea-row">
                <div class="list sp"><label class="name">账户类型：</label>{{ formValidate.bank_account_type == 74 ? '对公账户' : '对私账户' }}</div>
                <div class="list sp"><label class="name">开户银行：</label>{{ formValidate.account_bank }}</div>
                <div class="list sp"><label class="name">开户名称：</label>{{ formValidate.account_name }}</div>
                <div class="list sp"><label class="name">开户银行省市编码：</label>
                  <el-cascader
                    v-model="formValidate.bank_address_code"
                    :options="provinceCodeList"
                    :show-all-levels="false"
                    disabled
                    style="display: inline-block; width: 300px;"
                  />
                </div>
                <div v-if="formValidate.bank_branch_id" class="list sp"><label class="name">开户银行联行号：</label>{{ formValidate.bank_branch_id }}</div>
                <div v-if="formValidate.bank_name" class="list sp"><label class="name">开户银行全称 （含支行）：</label>{{ formValidate.bank_name }}</div>
                <div class="list sp"><label class="name">银行帐号：</label>{{ formValidate.account_number }}</div>
              </div>
            </div>
            <div>
              <div class="title" style="margin-top: 20px;">超级管理员信息：</div>
              <div class="acea-row">
                <div class="list sp"><label class="name">超级管理员类型：</label>{{ formValidate.contact_type == 65 ? '经营者/法人' : '负责人' }}</div>
                <div class="list sp"><label class="name">超级管理员姓名：</label>{{ formValidate.contact_name }}</div>
                <div class="list sp"><label class="name">超级管理员身份证件号码：</label>{{ formValidate.contact_id_card_number }}</div>
                <div class="list sp"><label class="name">超级管理员手机：</label>{{ formValidate.mobile_phone }}</div>
                <div v-if="formValidate.contact_email" class="list sp"><label class="name">超级管理员邮箱：</label>{{ formValidate.contact_email }}</div>
              </div>
            </div>
            <div>
              <div class="title" style="margin-top: 20px;">店铺信息：</div>
              <div class="acea-row">
                <div class="list sp"><label class="name">店铺名称：</label>{{ formValidate.store_name }}</div>
                <div v-if="formValidate.store_url" class="list sp"><label class="name">店铺链接：</label>{{ formValidate.store_url }}</div>
                <div v-if="formValidate.store_qr_code" class="list sp100 image">
                  <label class="name">店铺二维码：</label>
                  <img style="max-width: 150px; height: 80px;" :src="formValidate.store_qr_code && formValidate.store_qr_code['dir']">
                </div>
                <div v-if="formValidate.mini_program_sub_appid" class="list sp"><label class="name">小程序AppID：</label>{{ formValidate.mini_program_sub_appid }}</div>
                <div class="list sp"><label class="name">商户简称：：</label>{{ formValidate.merchant_shortname }}</div>
                <div v-if="formValidate.qualifications && formValidate.qualifications.length > 0" class="list sp100 image">
                  <label class="name">特殊资质：</label>
                  <img v-for="(item, index) in formValidate.qualifications" :key="index" style="max-width: 150px; height: 80px;" :src="item['dir']">
                </div>
                <div v-if="formValidate.business_addition_pics && formValidate.business_addition_pics.length > 0" class="list sp100 image">
                  <label class="name">补充材料：</label>
                  <img v-for="(item, index) in formValidate.business_addition_pics" :key="index" style="max-width: 150px; height: 80px;" :src="item['dir']">
                </div>
                <div v-if="formValidate.business_addition_desc" class="list sp"><label class="name">补充说明：</label>{{ formValidate.business_addition_desc }}</div>
                <div v-if="formValidate.message" class="list sp"><label class="name">{{ (status == -1 || status == 40) ? '驳回原因': status == 11 ? '需验证操作' : '审核结果' }}：</label>
                  <span :class="(status == -1 || status == 40) ? 'color_red' : ''" />  {{ formValidate.message }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!--查看图片-->
    <el-dialog v-if="pictureVisible" :visible.sync="pictureVisible" width="700px">
      <img :src="pictureUrl" class="pictures">
    </el-dialog>
    <!--分账指南-->
    <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" width="1000px">
      <div class="guideContainer">
        <h1 class="title1">申请分账商户指南</h1>
        <div class="content">
          <p>申请分账商户是指，平台已开通电商收付通后，子商户在此处提交相关资料进行二级商户入驻申请，微信支付验证及签约。</p>
          <p>子商户申请分账商户成功后，平台与子商户关于微信入口的资金无需线下转账，用户确认收货后15天微信将自动分账。</p>
          <h2>1.主体选择</h2>
          <table class="guideTable">
            <thead>
              <th>类型</th>
              <th>定义</th>
              <th>所需资料</th>
            </thead>
            <tbody>
              <tr>
                <td>小微</td>
                <td>无营业执照、免办理工商注册登记的商户</td>
                <td>需提供小微经营者的个人身份证</td>
              </tr>
              <tr>
                <td>个人卖家</td>
                <td>无营业执照，已持续从事电子商务经营活动满6个月，且期间经营收入累计超过20万元的个人商家（电商平台需核实已满足上述条件）</td>
                <td>需提供个人卖家的个人身份证</td>
              </tr>
              <tr>
                <td>个体工商户</td>
                <td>营业执照上的主体类型一般为个体户、个体工商户、个体经营</td>
                <td>需提供营业执照、经营者证件</td>
              </tr>
              <tr>
                <td>企业</td>
                <td>营业执照上的主体类型一般为有限公司、有限责任公司</td>
                <td>需提供营业执照、法人证件、组织机构代码证（未三证合一提供）</td>
              </tr>
              <tr>
                <td>党政、机关及事业单位</td>
                <td>包括国内各级、各类政府机构、事业单位等。如：公安、党团、司法、交通、旅游、工商税务、市政、医疗、教育、学校等机构</td>
                <td>需提供登记证书、法人证件、组织机构代码证（未三证合一提供）</td>
              </tr>
              <tr>
                <td>其他组织</td>
                <td>不属于企业、政府/事业单位的组织机构，如社会团体、民办非企业、基金会。要求机构已办理组织机构代码证。</td>
                <td>需提供登记证书、法人证件、组织机构代码证（未三证合一提供）</td>
              </tr>
            </tbody>
          </table>
          <div class="desc">
            <h3>说明：</h3>
            <p>（1） 正常日收款额度为200万，若交易良好则自动提升额度，若交易异常则下降额度；</p>
            <p>（2） 无信用卡收款额度限制。</p>
            <p>（3）其他主体类型，没有收款额度限制；</p>
          </div>
          <h2>2.入驻流程</h2>
          <p>下图中“二级商户”指：正在申请分账商户的子商户</p>
          <img src="../../../assets/images/split_guide.png" alt="" style="max-width: 100%;">
          <h2>3.环节说明</h2>
          <p>审核、签约、账户验证，为三个并行流程。</p>
          <p>（1）审核：指平台和微信支付审核申请单资料，2-5个工作日完成</p>
          <p>（2）账户验证：指判断指定条件的商家，需通过指定方式核实开户意愿及账户有效性；</p>
          <p>（3）签约：指商家超级管理员，使用微信打开制定页面，核实签约。</p>
          <p>完成上述三个环节，即完成入驻，如有任何疑问，请联系入驻平台的管理员。</p>
        </div>
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
import { createApplyment, applymentDetail, updateApplyment } from '@/api/system'
import { roterPre } from '@/settings'
import { getToken } from '@/utils/auth'
import SettingMer from '@/libs/settingMer'

export default {
  name: 'ApplyMents',
  components: {},
  data() {
    return {
      start_time: '',
      end_time: '',
      business_start: '',
      business_end: '',
      pickerOptions0: {
        disabledDate(time) {
          const curDate = (new Date()).getTime()
          const two = 60 * 24 * 3600 * 1000
          const twoMonths = curDate + two
          return time.getTime() < twoMonths
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          const end_date = this.end_time
          if (end_date !== '') {
            return time.getTime() > Date.now() || time.getTime() > end_date
          }
        }
      },
      pickerOptions2: {
        disabledDate: time => {
          const start_date = this.start_time
          const curDate = (new Date()).getTime()
          const two = 60 * 24 * 3600 * 1000
          const twoMonths = curDate + two
          return time.getTime() < start_date || time.getTime() < twoMonths
        }
      },
      pickerOptions3: {
        disabledDate: time => {
          const end_date = this.business_end
          if (end_date !== '') {
            return time.getTime() > Date.now() || time.getTime() > end_date
          }
        }
      },
      pickerOptions4: {
        disabledDate: time => {
          const start_date = this.business_start
          const curDate = (new Date()).getTime()
          const two = 60 * 24 * 3600 * 1000
          const twoMonths = curDate + two
          return time.getTime() < start_date || time.getTime() < twoMonths
        }
      },
      roterPre: roterPre,
      myHeaders: { 'X-Token': getToken() },
      fullscreenLoading: false,
      idCard_start_time: '',
      effective_time: '',
      cer_end_time: '',
      cer_start_time: '',
      contact_start_time: '',
      contact_end_time: '',
      business_long: false, // 长期营业
      long: false,
      effective_long: false,
      cer_long: false,
      contact_long: false,
      provinceCodeList: [],
      applyment_id: '',
      status: 0,
      pictureVisible: false,
      pictureUrl: '',
      dialogVisible: false,
      brankList: [
        { key: '工商银行', value: '工商银行' },
        { key: '交通银行', value: '交通银行' },
        { key: '招商银行', value: '招商银行' },
        { key: '民生银行', value: '民生银行' },
        { key: '中信银行', value: '中信银行' },
        { key: '浦发银行', value: '浦发银行' },
        { key: '兴业银行', value: '兴业银行' },
        { key: '光大银行', value: '光大银行' },
        { key: '广发银行', value: '广发银行' },
        { key: '平安银行', value: '平安银行' },
        { key: '北京银行', value: '北京银行' },
        { key: '华夏银行', value: '华夏银行' },
        { key: '农业银行', value: '农业银行' },
        { key: '建设银行', value: '建设银行' },
        { key: '邮政储蓄银行', value: '邮政储蓄银行' },
        { key: '中国银行', value: '中国银行' },
        { key: '宁波银行', value: '宁波银行' },
        { key: '其他银行', value: '其他银行' }
      ],
      props: { emitPath: false, multiple: true },
      formValidate: {
        out_request_no: '',
        organization_type: 2,
        business_license_copy: '',
        business_license_number: '', // 证件注册号
        merchant_name: '', // 商户名称
        legal_person: '', // 经营者/法定代表人姓名
        company_address: '', // 注册地址
        business_time: [],
        organization_time: [],
        organization_copy: '', // 组织机构代码证照片
        organization_number: '', // 组织机构代码
        id_doc_type: '',
        id_card_copy: '', // 身份证人像面照片
        id_card_national: '', // 身份证国徽面照片
        id_card_name: '', // 身份证姓名
        id_card_number: '', // 身份证号码
        id_card_valid_time: '', // 证件有效期
        id_doc_name: '', // 证件姓名
        id_doc_number: '', // 证件号码
        id_doc_copy: '', // 证件照片
        doc_period_end: '', // 证件结束日期
        bank_account_type: 74,
        account_bank: '',
        account_name: '',
        bank_address_code: [],
        bank_branch_id: '',
        bank_name: '',
        account_number: '',
        contact_type: 65, // 超级管理员类型
        contact_name: '', // 超级管理员姓名
        contact_id_card_number: '', // 超级管理员身份证件号码
        mobile_phone: '',
        contact_email: '', // 超级管理员邮箱
        store_name: '', // 店铺名称
        store_url: '', // 店铺链接
        store_qr_code: '', // 店铺二维码
        mini_program_sub_appid: '', // 小程序AppID
        merchant_shortname: '', // 商户简称
        qualifications: [],
        business_addition_pics: [],
        business_addition_desc: '',
        contact_id_doc_period_begin: '',
        contact_id_doc_period_end: '',
        business_authorization_letter: '',
        id_doc_address: '',
        contact_id_doc_type: '',
        contact_id_doc_copy: '',
        contact_id_doc_copy_back: '',
        id_doc_copy: '',
        id_doc_copy_back: '',
        doc_period_begin: ''

      },
      loading: false,
      open_wx_sub_mch: 0,
      message: '',
      ruleValidate: {
        out_request_no: [{ required: true, message: '请输入业务申请编号', trigger: 'blur' }],
        organization_type: [{ required: true, message: '请选择主体类型', trigger: 'change' }],
        business_license_copy: [{ required: true, message: '请上传证件扫描件', trigger: 'change' }],
        business_authorization_letter: [{ required: true, message: '请上传证件扫描件', trigger: 'change' }],
        business_license_numb: [{ required: true, message: '请输入证件注册号', trigger: 'blur' }],
        id_card_address: [{ required: true, message: '请输入身份证居住地址', trigger: 'blur' }],
        merchant_name: [{ required: true, message: '请输入商户名称', trigger: 'blur' }],
        legal_person: [{ required: true, message: '请输入经营者/法定代表人姓名', trigger: 'blur' }],
        organization_copy: [{ required: true, message: '请上传组织机构代码证照片', trigger: 'change' }],
        organization_number: [{ required: true, message: '请输入组织机构代码', trigger: 'blur' }],
        id_card_copy: [{ required: true, message: '请上传经营者/法定代表人的身份证人像面照片', trigger: 'change' }],
        id_card_national: [{ required: true, message: '请上传经营者/法定代表人的身份证国徽面照片', trigger: 'change' }],
        id_card_name: [{ required: true, message: '请输入经营者/法定代表人对应身份证的姓名', trigger: 'blur' }],
        id_card_number: [
          { required: true, message: '请输入经营者/法定代表人对应身份证的号码', trigger: 'blur' },
          { min: 15, max: 18, message: '身份证号码在15-18位', trigger: 'blur' },
          { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号码', trigger: 'blur' }
        ],
        id_doc_name: [{ required: true, message: '请输入经营者/法人姓名', trigger: 'blur' }],
        id_doc_number: [
          { required: true, message: '请输入证件号码', trigger: 'blur' },
          { min: 7, max: 11, message: '长度在 7 到 11 个字符', trigger: 'blur' },
          { pattern: /^([-A-Za-z0-9]){7,11}$/, message: '7~11位 数字|字母|连字符', trigger: 'blur' }
        ],
        id_doc_copy: [{ required: true, message: '请上传证件照片', trigger: 'change' }],
        account_number: [
          { required: true, message: '请输入银行帐号', trigger: 'blur' },
          { pattern: /\d{10,19}/, message: '请输入正确的银行账号', trigger: 'blur' }
        ],
        contact_type: [{ required: true, message: '请选择超级管理员类型', trigger: 'change' }],
        contact_name: [{ required: true, message: '请输入超级管理员姓名', trigger: 'blur' }],
        contact_id_card_number: [
          { required: true, message: '请输入超级管理员身份证件号码', trigger: 'blur' },
          { pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '身份证格式不正确', trigger: 'blur' }
        ],
        mobile_phone: [
          { required: true, message: '请输入超级管理员手机号', trigger: 'blur' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        contact_email: [
          { required: true, message: '请输入超级管理员邮箱', trigger: 'blur' },
          { pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        store_name: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
        mini_program_sub_appid: [{ required: true, message: '请输入小程序AppID', trigger: 'blur' }],
        merchant_shortname: [{ required: true, message: '请输入商户简称', trigger: 'blur' }],
        id_doc_type: [{ required: true, message: '请选择经营者/法人证件类型', trigger: 'change' }]
      }
    }
  },
  computed: {
    fileUrl() {
      return (
        SettingMer.https +
        `/applyments/upload/file`
      )
    }
  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.getDetail()
    import('../../../utils/address.js').then(res => {
      this.provinceCodeList = res.default
    })
  },
  methods: {
    // 获取详情数据
    getDetail() {
      applymentDetail().then(async res => {
        const info = res.data.info
        this.applyment_id = res.data.mer_applyments_id
        this.status = res.data.status
        this.open_wx_sub_mch = res.data.open_wx_sub_mch
        this.message = res.data.message
        if (res.data !== [] && res.data && res.data.info) {
          this.formValidate = {
            message: res.data.message,
            out_request_no: info.out_request_no,
            organization_type: info.organization_type,
            business_license_copy: info.business_license_info ? info.business_license_info.business_license_copy : '',
            business_license_number: info.business_license_info ? info.business_license_info.business_license_number : '',
            merchant_name: info.business_license_info ? info.business_license_info.merchant_name : '',
            legal_person: info.business_license_info ? info.business_license_info.legal_person : '',
            company_address: info.business_license_info ? info.business_license_info.company_address : '',
            // organization_copy: info.organization_cert_info ? info.organization_cert_info.organization_copy : '',
            // organization_number: info.organization_cert_info ? info.organization_cert_info.organization_number : '',
            id_doc_type: info.id_doc_type,
            contact_type: info.contact_info.contact_type,
            contact_name: info.contact_info.contact_name,
            contact_id_card_number: info.contact_info.contact_id_card_number,
            mobile_phone: info.contact_info.mobile_phone,
            contact_email: info.contact_info.contact_email,
            store_name: info.sales_scene_info.store_name,
            store_url: info.sales_scene_info.store_url,
            store_qr_code: info.sales_scene_info.store_qr_code,
            mini_program_sub_appid: info.sales_scene_info.mini_program_sub_appid,
            merchant_shortname: info.merchant_shortname,
            qualifications: info.qualifications ? info.qualifications : [],
            business_addition_pics: info.business_addition_pics ? info.business_addition_pics : [],
            business_addition_desc: info.business_addition_desc,
            business_time: info.business_license_info ? info.business_license_info.business_time : '',
            business_start: info.business_license_info && info.business_license_info.business_time ? info.business_license_info.business_time[0] : '',
            business_end: info.business_license_info && info.business_license_info.business_time ? info.business_license_info.business_time[1] : '',
            // start_time: info.organization_cert_info && info.organization_cert_info.organization_time ? info.organization_cert_info.organization_time[0] : '',
            // end_time: info.organization_cert_info && info.organization_cert_info.organization_time ? info.organization_cert_info.organization_time[1] : '',
            // organization_cert_info: info.organization_cert_info,
            bank_account_type: info.account_info ? info.account_info.bank_account_type : '',
            account_bank: info.account_info ? info.account_info.account_bank : '',
            account_name: info.account_info ? info.account_info.account_name : '',
            bank_address_code: info.account_info ? info.account_info.bank_address_code : [],
            bank_branch_id: info.account_info ? info.account_info.bank_branch_id : '',
            bank_name: info.account_info ? info.account_info.bank_name : '',
            account_number: info.account_info ? info.account_info.account_number : '',
            id_card_copy: info.id_card_info ? info.id_card_info.id_card_copy : '',
            id_card_national: info.id_card_info ? info.id_card_info.id_card_national : '',
            id_card_name: info.id_card_info ? info.id_card_info.id_card_name : '',
            id_card_number: info.id_card_info ? info.id_card_info.id_card_number : '',
            id_card_valid_time: info.id_card_info ? info.id_card_info.id_card_valid_time : '',
            id_doc_name: info.id_doc_info ? info.id_doc_info.id_doc_name : '',
            id_doc_number: info.id_doc_info ? info.id_doc_info.id_doc_number : '',
            id_doc_copy: info.id_doc_info ? info.id_doc_info.id_doc_copy : '',
            doc_period_end: (info.id_doc_info && info.id_doc_info.doc_period_end != '长期') ? info.id_doc_info.doc_period_end : '',
            id_card_valid_time_begin: info.id_card_info ? info.id_card_info.id_card_valid_time_begin : '',
            id_card_address: info.id_card_info ? info.id_card_info.id_card_address : '',
            contact_id_doc_period_begin: info.contact_info ? info.contact_info.contact_id_doc_period_begin : '',
            contact_id_doc_period_end: (info.contact_info && info.contact_info.contact_id_doc_period_end != '长期') ? info.contact_info.contact_id_doc_period_end : '',
            contact_id_doc_copy: info.contact_info ? info.contact_info.contact_id_doc_copy : '',
            contact_id_doc_copy_back: info.contact_info ? info.contact_info.contact_id_doc_copy_back : '',
            business_authorization_letter: info.contact_info ? info.contact_info.business_authorization_letter : '',
            
          }
          this.business_start = info.business_license_info && info.business_license_info.business_time ? info.business_license_info.business_time[0] : ''
          this.business_long = !!((info.business_license_info && info.business_license_info.business_time && info.business_license_info.business_time[1] == '长期'))
          if (!this.business_long) this.business_end = info.business_license_info && info.business_license_info.business_time ? info.business_license_info.business_time[1] : ''
          // this.start_time = info.organization_cert_info && info.organization_cert_info.organization_time ? info.organization_cert_info.organization_time[0] : ''
          // this.long = !!((info.organization_cert_info && info.organization_cert_info.organization_time && info.organization_cert_info.organization_time[1] == '长期'))
          // if (!this.long) this.end_time = (info.organization_cert_info && info.organization_cert_info.organization_time) ? info.organization_cert_info.organization_time[1] : ''
          this.formValidate.business_time = [this.business_start, this.business_end]
          this.formValidate.organization_time = [this.start_time, this.end_time]
          if (info.id_card_info) this.effective_long = !!((info.id_card_info && info.id_card_info.id_card_valid_time && info.id_card_info.id_card_valid_time == '长期'))
          if (info.id_card_info) this.effective_time = (info.id_card_info && info.id_card_info.id_card_valid_time == '长期') ? '' : info.id_card_info.id_card_valid_time
          if (info.id_doc_info) this.cer_long = !!((info.id_doc_info && info.id_doc_info.doc_period_end && info.id_doc_info.doc_period_end == '长期'))
          if (info.id_doc_info) this.cer_end_time = (info.id_doc_info && info.id_doc_info.doc_period_end != '长期') ? info.id_doc_info.doc_period_end : ''
          if (info.id_card_info) this.idCard_start_time = (info.id_card_info) ? info.id_card_info.id_card_valid_time_begin : ''
          if (info.contact_info) this.contact_long = !!((info.contact_info && info.contact_info.contact_id_doc_period_end && info.contact_info.contact_id_doc_period_end == '长期'))
          if (info.contact_info) this.contact_end_time = (info.contact_info && info.contact_info.contact_id_doc_period_end != '长期') ? info.contact_info.contact_id_doc_period_end : ''
          if (info.contact_info) this.contact_start_time = (info.contact_info) ? info.contact_info.contact_id_doc_period_begin : ''
        }
      })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 查看图片
    getPicture(url) {
      this.pictureVisible = true
      this.pictureUrl = url
    },
    typeChange(val) {
      if (val == 2401 || val == 2500) {
        this.formValidate.bank_account_type = 75
      } else if (val == 2 || val == 3 || val == 1708) {
        this.formValidate.bank_account_type = 74
      }
    },
    // 上传成功
    handleSuccess(response) {
      if (response.status === 200) {
        this.$message.success('上传成功')
        this.formValidate.business_license_copy = response.data[0]
      } else {
        this.$message.error(response.message)
      }
    },
    // 上传成功
    handleSuccess2(response) {
      if (response.status === 200) {
        this.$message.success('上传成功')
        this.formValidate.organization_copy = response.data[0]
        this.$forceUpdate()
      } else {
        this.$message.error(response.message)
      }
    },
    // 上传成功
    handleSuccess3(response) {
      if (response.status === 200) {
        this.$message.success('上传成功')
        this.$set(this.formValidate, 'id_card_copy', response.data[0])
        this.$forceUpdate()
      } else {
        this.$message.error(response.message)
      }
    },
    // 上传成功
    handleSuccess4(response) {
      if (response.status === 200) {
        this.$message.success('上传成功')
        this.formValidate.id_card_national = response.data[0]
        this.$forceUpdate()
      } else {
        this.$message.error(response.message)
      }
    },
    // 上传成功
    handleSuccess5(response) {
      if (response.status === 200) {
        this.$message.success('上传成功')
        this.formValidate.id_doc_copy = response.data[0]
        this.$forceUpdate()
      } else {
        this.$message.error(response.message)
      }
    },

    // 上传成功
    handleSuccess6(response) {
      if (response.status === 200) {
        this.$message.success('上传成功')
        this.formValidate.store_qr_code = response.data[0]
        this.$forceUpdate()
      } else {
        this.$message.error(response.message)
      }
    },
    // 上传成功
    handleSuccess7(response) {
      if (response.status === 200) {
        this.$message.success('上传成功')
        this.formValidate.qualifications.push(response.data[0])
        this.$forceUpdate()
        console.log(this.formValidate.qualifications)
      } else {
        this.$message.error(response.message)
      }
    },
    // 上传成功
    handleSuccess8(response) {
      if (response.status === 200) {
        this.$message.success('上传成功')
        this.formValidate.business_addition_pics.push(response.data[0])
        this.$forceUpdate()
        console.log(this.formValidate.business_addition_pics)
      } else {
        this.$message.error(response.message)
      }
    },
    // 上传成功
    handleSuccess9(response) {
      if (response.status === 200) {
        this.$message.success('上传成功')
        this.formValidate.id_doc_copy_back = response.data[0]
        this.$forceUpdate()
      } else {
        this.$message.error(response.message)
      }
    },
    // 上传成功
    handleSuccess10(response) {
      if (response.status === 200) {
        this.$message.success('上传成功')
        this.formValidate.contact_id_doc_copy = response.data[0]
        this.$forceUpdate()
      } else {
        this.$message.error(response.message)
      }
    },
    // 上传成功
    handleSuccess11(response) {
      if (response.status === 200) {
        this.$message.success('上传成功')
        this.formValidate.contact_id_doc_copy_back = response.data[0]
        this.$forceUpdate()
      } else {
        this.$message.error(response.message)
      }
    },
    // 上传成功
    handleSuccess12(response) {
      if (response.status === 200) {
        this.$message.success('上传成功')
        this.formValidate.business_authorization_letter = response.data[0]
        this.$forceUpdate()
      } else {
        this.$message.error(response.message)
      }
    },
    handleRemove(i) {
      this.formValidate.qualifications.splice(i, 1)
      console.log(this.formValidate.qualifications)
    },
    handleRemove2(i) {
      this.formValidate.business_addition_pics.splice(i, 1)
    },
    onchangeStart(e) {
      this.start_time = e
      this.formValidate.organization_time[0] = e ? this.start_time : ''
    },
    onchangeEnd(e) {
      this.end_time = e
      this.formValidate.organization_time[1] = e ? this.end_time : ''
    },
    onchangeEffective(e) {
      this.effective_time = e
      this.formValidate.id_card_valid_time = e ? this.effective_time : ''
    }, 
    onchangeIdBegin(e) {
      this.idCard_start_time = e
      this.formValidate.id_card_valid_time_begin = e ? this.idCard_start_time : ''
    },
    onchangeCer(e) {
      this.cer_end_time = e
      this.formValidate.doc_period_end = e ? this.cer_end_time : ''
    },
    onchangeDoc(e) {
      this.cer_start_time = e
      this.formValidate.doc_period_begin = e ? this.cer_start_time : ''
    },
    onchangeBusinessStart(e) {
      this.business_start = e
      this.formValidate.business_time[0] = e ? this.business_start : ''
    },
    onchangeBusinessEnd(e) {
      this.business_end = e
      this.formValidate.business_time[1] = e ? this.business_end : ''
    },
    onchangeContactStart(e) {
      this.contact_start_time = e
      this.formValidate.contact_id_doc_period_begin = e ? this.contact_start_time : ''
    },
    onchangeContactEnd(e) {
      this.contact_end_time = e
      this.formValidate.contact_id_doc_period_end = e ? this.contact_end_time : ''
    },
    changeTime() {
      if (this.long) this.formValidate.organization_time[1] = '长期'
    },
    changeTime1() {
      if (this.effective_long) {
        this.formValidate.id_card_valid_time = '长期'
      } else {
        this.formValidate.id_card_valid_time = this.effective_time
      }
    },
    changeTime2() {
      if (this.cer_long) {
        this.formValidate.doc_period_end = '长期'
      } else {
        this.formValidate.doc_period_end = this.cer_end_time
      }
    },
    changeTime3() {
      if (this.business_long) {
        this.formValidate.business_time[1] = '长期'
        this.business_end = ''
      } else {
        this.formValidate.business_time[1] = this.business_end
      }
    },
    changeTime4() {
      if (this.contact_long) {
        this.formValidate.contact_id_doc_period_end = '长期'
        this.contant_end_time = ''
      } else {
        this.formValidate.contact_id_doc_period_end = this.contant_end_time
      }
    }, 
    // 提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const formData = this.formValidate
          if (formData.organization_type == 3 || formData.organization_type == 1708) {
            if (!formData.company_address) return this.$message.error('请输入注册地址')
            if (!formData.business_time) return this.$message.error('请输入营业期限')
          }
          if (!formData.store_url && !formData.store_qr_code) return this.$message.error('店铺链接和店铺二维码必须填写一个')
          if (formData.organization_type == 2500) {
            if (!formData.business_addition_desc) return this.$message.error('请填写补充说明')
          }
          if (formData.organization_type != 2500 && formData.organization_type != 2401) {
            if (!formData.contact_email) return this.$message.error('请填写超级管理员邮箱')
          }
          
          if(!formData.id_card_valid_time_begin){
            return this.$message.error('请选择身份证开始时间')
          }
          const data = {
            out_request_no: formData.out_request_no,
            organization_type: formData.organization_type,
            business_license_info: {
              business_license_copy: formData.business_license_copy,
              business_license_number: formData.business_license_number,
              merchant_name: formData.merchant_name,
              legal_person: formData.legal_person,
              company_address: formData.company_address,
              business_time: [this.business_start, this.business_long ? '长期' : this.business_end]
            },
            id_doc_type: formData.id_doc_type,
            account_info: {
              bank_account_type: formData.bank_account_type,
              account_bank: formData.account_bank,
              account_name: formData.account_name,
              bank_address_code: formData.bank_address_code,
              bank_branch_id: formData.bank_branch_id,
              bank_name: formData.bank_name,
              account_number: formData.account_number
            },
            contact_info: {
              contact_id_doc_type: formData.contact_id_doc_type,
              contact_id_doc_copy: formData.contact_id_doc_copy,
              contact_id_doc_copy_back: formData.contact_id_doc_copy_back,
              contact_id_doc_period_begin: formData.contact_id_doc_period_begin,
              contact_id_doc_period_end: formData.contact_id_doc_period_end,
              business_authorization_letter: formData.business_authorization_letter,
              contact_type: formData.contact_type,
              contact_name: formData.contact_name,
              contact_id_card_number: formData.contact_id_card_number,
              mobile_phone: formData.mobile_phone,
              contact_email: formData.contact_email
            },
            sales_scene_info: {
              store_name: formData.store_name,
              store_url: formData.store_url,
              store_qr_code: formData.store_qr_code,
              mini_program_sub_appid: formData.mini_program_sub_appid
            },
            merchant_shortname: formData.merchant_shortname,
            qualifications: formData.qualifications,
            business_addition_pics: formData.business_addition_pics,
            business_addition_desc: formData.business_addition_desc
          }
          // if (formData.organization_type != 2401 && formData.organization_type != 2500) {
          //   data['organization_cert_info'] = {
          //     organization_copy: formData.organization_copy,
          //     organization_number: formData.organization_number,
          //     organization_time: [this.start_time, this.long ? '长期' : this.business_end]
          //   }
          // }
          if (formData.id_doc_type == 1) {
            data['id_card_info'] = {
              id_card_copy: formData.id_card_copy,
              id_card_national: formData.id_card_national,
              id_card_name: formData.id_card_name,
              id_card_number: formData.id_card_number,
              id_card_valid_time_begin: formData.id_card_valid_time_begin,
              id_card_valid_time: this.effective_long ? '长期' : formData.id_card_valid_time,
              id_card_address: formData.id_card_address
            }
          } else {
            data['id_doc_info'] = {
              id_doc_name: formData.id_doc_name,
              id_doc_number: formData.id_doc_number,
              id_doc_copy: formData.id_doc_copy,
              id_doc_copy_back: formData.id_doc_copy_back,
              doc_period_begin: formData.doc_period_begin,
              doc_period_end: this.cer_long ? '长期' : formData.doc_period_end,
              id_doc_address: formData.id_doc_address
            }
          }
          this.fullscreenLoading = true
          this.loading = true
          this.applyment_id ? updateApplyment(this.applyment_id, data).then(async res => {
            this.fullscreenLoading = false
            this.$message.success(res.message)
            this.loading = false
          })
            .catch(res => {
              this.fullscreenLoading = false
              this.loading = false
              this.$message.error(res.message)
            })
            : createApplyment(data)
              .then(async res => {
                this.fullscreenLoading = false
                this.$message.success(res.message)
                this.loading = false
              })
              .catch(res => {
                this.fullscreenLoading = false
                this.loading = false
                this.$message.error(res.message)
              })
        }
      })
    },
    // 表单验证
    validate(prop, status, error) {
      if (status === false) {
        this.$message.warning(error)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.pictures{
    width: 100%;
    max-width: 100%;
}
/deep/ .upLoadPicBox {
  .upLoad {
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -o-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    line-height: 20px;
  }
  span {
    font-size: 10px;
  }
}
.el-cascader{
    display: block;
}
.box-container .title{
    font-weight: bold;
    color: #498FF7;
    font-size: 14px;
    margin-bottom: 10px;
}
.btndel {
  position: absolute;
  z-index: 1;
  width: 20px !important;
  height: 20px !important;
  left: 46px;
  top: -4px;
}

.pictrue {
  width: 60px;
  height: 60px;
  border: 1px dotted rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  img {
    width: 100%;
    height: 100%;
  }
}
.upload-demo{
    display: inline-block;
}
/deep/ table .el-image {
  display: inline-block !important;
}
/deep/ .el-dialog__title{
  font-weight: bold;
}
.box-container {
  overflow: hidden;
}
.box-container .list {
  float: left;
  line-height: 40px;

}
.box-container .sp {
  width: 50%;
}
.box-container .sp3 {
  width: 33.3333%;
}
.box-container .sp100 {
  width: 100%;
}
.box-container .list .name {
  display: inline-block;
  color: #606266;
}
.box-container .list .blue {
  color: #1890ff;
}
.box-container .list.image {
  margin: 20px 0;
  position: relative;
}
.box-container .list.image img {
  position: absolute;
  top: -20px;
}
.labeltop{
  max-height: 280px;
  min-height: 120px;
  overflow-y: auto;
}
.title{
  margin-bottom: 16px;
  color: #17233d;
  font-size: 14px;
  font-weight: bold;
  padding-bottom: 2px;
  border-bottom: 1px solid #dfe6ec;
}
.selWidth,.el-cascader{
    width: 300px;
}
.splitGuide{
    .color_red{
        color: #ff4949;
        display: inline-block;
        margin-left: 10px;
        line-height: 32px;
    }
    .guideBtn{
        float: right;
    }
}
.guideContainer{
    height: 80%;
    h1{
        text-align: center;
    }
    .guideTable{
        td,th{
            padding: 8px;
        }
    }
}
.color_red{
    color: #ff4949;
}

</style>
