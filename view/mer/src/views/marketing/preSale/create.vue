<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-steps :active="currentTab" align-center finish-status="success">
          <el-step title="选择预售商品" />
          <el-step title="填写基础信息" />
          <el-step title="修改商品详情" />
        </el-steps>
      </div>
      <el-form ref="formValidate" v-loading="fullscreenLoading" class="formValidate mt20" :rules="ruleValidate" :model="formValidate" label-width="120px" @submit.native.prevent>
        <div v-show="currentTab === 0" style="overflow: hidden;">
          <el-row :gutter="24">
            <el-col v-bind="grid2">
              <el-form-item label="选择商品：" prop="image">
                <div class="upLoadPicBox" @click="add()">
                  <div v-if="formValidate.image" class="pictrue">
                    <img :src="formValidate.image">
                  </div>
                  <div v-else class="upLoad">
                    <i class="el-icon-camera cameraIconfont" />
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-show="currentTab === 1">
          <el-row :gutter="24">
            <el-col v-bind="grid2">
              <el-form-item label="商品主图：" prop="image">
                <div class="upLoadPicBox" @click="modalPicTap('1')">
                  <div v-if="formValidate.image" class="pictrue">
                    <img :src="formValidate.image">
                  </div>
                  <div v-else class="upLoad">
                    <i class="el-icon-camera cameraIconfont" />
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="商品轮播图：" prop="slider_image">
                <div class="acea-row">
                  <div v-for="(item,index) in formValidate.slider_image" :key="index" class="pictrue" draggable="false" @dragstart="handleDragStart($event, item)" @dragover.prevent="handleDragOver($event, item)" @dragenter="handleDragEnter($event, item)" @dragend="handleDragEnd($event, item)">
                    <img :src="item">
                    <i class="el-icon-error btndel" @click="handleRemove(index)" />
                  </div>
                  <div v-if="formValidate.slider_image.length < 10" class="upLoadPicBox" @click="modalPicTap('2')">
                    <div class="upLoad">
                      <i class="el-icon-camera cameraIconfont" />
                    </div>
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <!-- 商品信息-->
            <el-col class="sp100">
              <el-form-item label="商品名称：" prop="store_name">
                <el-input v-model="formValidate.store_name" placeholder="请输入商品名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col class="sp100">
              <el-form-item label="预售活动简介：" prop="store_info">
                <el-input v-model="formValidate.store_info" type="textarea" :rows="3" placeholder="请输入秒杀活动简介" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="预售设置：">
                <el-radio-group v-model="formValidate.presell_type" @change="wayChange">
                  <el-radio :label="1" class="radio">全款预售</el-radio>
                  <el-radio :label="2">定金预售</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col v-bind="grid2">
              <el-form-item label="预售活动日期：" required>
                <el-date-picker
                  v-model="timeVal"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
                  @change="onchangeTime"
                />

              </el-form-item>
            </el-col>
            <el-col v-bind="grid2">
              <div v-if="formValidate.presell_type == 2">
                <el-form-item label="尾款支付日期：" required>
                  <el-date-picker
                    v-model="timeVal2"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    @change="onchangeTime2"
                  />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="24">
              <el-form-item label="发货时间：" prop="delivery_type">
                <div class="acea-row">
                  <el-select v-if="formValidate.presell_type === 1" v-model="formValidate.delivery_type" placeholder="请选择" class="selWidthd1 mr20">
                    <el-option v-for="item in deliveryTime" :key="item.date_id" :label="item.name" :value="item.date_id" />
                  </el-select>
                  <span v-else style="padding-right: 10px;">尾款支付后</span>
                  <el-input-number v-model="formValidate.delivery_day" :min="1" placeholder="请输入天数" style="width: 150px;" class="mr20" /> 天之内
                </div>
              </el-form-item>
            </el-col>
            <el-col v-bind="grid2">
              <el-form-item label="限购：">
                <el-input-number v-model="formValidate.pay_count" :min="0" placeholder="请输入数量" />  默认“0” ，为不限制购买数量
              </el-form-item>
            </el-col>
            <el-col v-bind="grid2">
              <el-form-item label="活动状态：">
                <el-radio-group v-model="formValidate.is_show">
                  <el-radio :label="0" class="radio">关闭</el-radio>
                  <el-radio :label="1">开启</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="排序：">
                <el-input-number
                  v-model="formValidate.sort"
                  placeholder="请输入排序序号"
                  style="width: 200px;"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="送货方式：" prop="delivery_way">
                <div class="acea-row">
                  <el-checkbox-group v-model="formValidate.delivery_way">
                    <el-checkbox v-for="item in deliveryList" :key="item.value" :label="item.value">
                      {{ item.name }}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-form-item>
            </el-col>
            <el-col v-if="(formValidate.delivery_way.length == 2 || (formValidate.delivery_way.length == 1 && formValidate.delivery_way[0] == 2)) && formValidate.type == 0" :span="24">
              <el-form-item label="是否包邮：">
                <el-radio-group v-model="formValidate.delivery_free">
                  <el-radio :label="0" class="radio">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col v-if="(formValidate.delivery_free == 0 && ((formValidate.delivery_way.length == 2) || (formValidate.delivery_way.length == 1 && formValidate.delivery_way[0] == 2))) && formValidate.type == 0" :span="24">
              <el-form-item label="运费模板：" prop="temp_id">
                <div class="acea-row">
                  <el-select v-model="formValidate.temp_id" placeholder="请选择" class="selWidthd mr20">
                    <el-option v-for="item in shippingList" :key="item.shipping_template_id" :label="item.name" :value="item.shipping_template_id" />
                  </el-select>
                  <el-button class="mr15" size="small" @click="addTem">添加运费模板</el-button>
                </div>
              </el-form-item>
            </el-col>
            <el-col v-if="labelList.length" :span="24">
              <el-form-item label="商品标签：">
                <el-select v-model="formValidate.mer_labels" multiple placeholder="请选择" class="selWidthd">
                  <el-option
                    v-for="item in labelList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="平台保障服务：">
                <div class="acea-row">
                  <el-select v-model="formValidate.guarantee_template_id" placeholder="请选择" clearable class="selWidthd mr20">
                    <el-option
                      v-for="item in guaranteeList"
                      :key="item.guarantee_template_id"
                      :label="item.template_name"
                      :value="item.guarantee_template_id"
                    />
                  </el-select>
                  <el-button class="mr15" size="small" @click="addServiceTem">添加服务说明模板</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" />
          <el-row :gutter="24">
            <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
              <!-- 单规格表格-->
              <el-form-item v-if="formValidate.spec_type === 0">
                <el-table :data="OneattrValue" border class="tabNumWidth" size="mini">
                  <el-table-column align="center" label="图片" min-width="80">
                    <template slot-scope="scope">
                      <div class="upLoadPicBox" @click="modalPicTap('1', 'dan', 'pi')">
                        <div v-if="formValidate.image" class="pictrue tabPic">
                          <img :src="scope.row.image">
                        </div>
                        <div v-else class="upLoad tabPic">
                          <i class="el-icon-camera cameraIconfont" />
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="市场价" min-width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row['price'] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="预售价" min-width="80">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row['presell_price']" type="number" class="priceBox" :min="0" :max="scope.row['price']" @blur="limitPrice(scope.row)" />
                    </template>
                  </el-table-column>
                  <el-table-column v-if="formValidate.presell_type === 2" align="center" label="预售定金" min-width="80">
                    <template slot-scope="scope">
                      <el-input @input="handleInput(scope.row['down_price'])" v-model="scope.row['down_price']" type="number" class="priceBox" :min="0" :max="scope.row['price']*0.2" @blur="restrictedRange(scope.row)" />
                    </template>
                  </el-table-column>
                  <el-table-column v-if="formValidate.presell_type === 2" align="center" label="尾款" min-width="80">
                    <template slot-scope="scope">
                      <span>{{ (scope.row['presell_price'] && scope.row['down_price']) ? (scope.row['presell_price'] - scope.row['down_price']).toFixed(2) : scope.row['presell_price'] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="成本价" min-width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row['cost'] }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column align="center" label="库存" min-width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row['old_stock'] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="限量" min-width="80">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row['stock']" type="number" class="priceBox" :max="scope.row['old_stock']" :min="0" @change="limitInventory(scope.row)" />
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="商品编号" min-width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row['bar_code'] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="重量（KG）" min-width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row['weight'] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="体积（m³）" min-width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row['volume'] }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <!-- 多规格表格-->
            </el-col>
          </el-row>
         
          <el-row>
            <el-col
            v-if="formValidate.spec_type === 1 && formValidate.attr.length > 0"
            :span="24"
            class="noForm"
          >
            <el-form-item label="批量设置：" class="labeltop">
              <el-table
                :data="oneFormBatch"
                border
                class="tabNumWidth"
                size="mini"
              >
                <el-table-column align="center" label="商品规格" min-width="80">
                  <template slot-scope="scope">
                    <div @click="batchAttr" class="acea-row row-between-wrapper" style="cursor: pointer;">
                     	<div style="width: 45px;">{{oneFormBatch[0]['attr']}}</div>
                      <i class="el-icon-arrow-down" />
                    </div>
                  </template>
                </el-table-column>  
                <el-table-column align="center" label="图片" min-width="80">
                  <template slot-scope="scope">
                    <div
                      class="upLoadPicBox"
                      title="750*750px"
                      @click="modalPicTap('1', 'pi')"
                    >
                      <div v-if="scope.row.image" class="pictrue tabPic">
                        <img :src="scope.row.image">
                      </div>
                      <div v-else class="upLoad tabPic">
                       
                        <i class="el-icon-camera cameraIconfont" />
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="(item, iii) in attrValue"
                  :key="iii"
                  :label="formThead[iii].title"
                  align="center"
                  min-width="120"
                >
                  <template slot-scope="scope">
                    <div>
                      <el-input
                        v-if="formThead[iii].title === '商品编号'"
                        v-model="scope.row[iii]"
                        type="text"
                        disabled
                        class="priceBox"
                      />
                      <el-input
                        v-else-if="formThead[iii].title === '预售定金'"
                        @input="handleInput(scope.row['down_price'],-1)"
                        v-model="scope.row[iii]"
                        type="text"
                        class="priceBox"
                      /> 
                      <el-input
                        v-else
                        v-model="scope.row[iii]"
                        :disabled="(formThead[iii].title !== '预售价' && formThead[iii].title !== '限量')"
                        type="number"
                        min="0"
                        class="priceBox"
                        controls-position="right"
                      />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" min-width="80">
                  <template>
                    <el-button
                      type="text"
                      class="submission"
                      @click="batchAdd"
                      size="small"
                    >批量添加</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-form-item v-if="formValidate.spec_type === 1" class="labeltop" label="规格列表：">
              <el-table ref="multipleSelection" :data="ManyAttrValue" tooltip-effect="dark" :row-key="(row) => { return row.id }" @selection-change="handleSelectionChange">
                <el-table-column align="center" type="selection" :reserve-selection="true" min-width="50" />
                <template v-if="manyTabDate">
                  <el-table-column v-for="(item,iii) in manyTabDate" :key="iii" align="center" :label="manyTabTit[iii].title" min-width="80">
                    <template slot-scope="scope">
                      <span class="priceBox" :class="scope.row.select?'selectOn':''" v-text="scope.row[iii]" />
                    </template>
                  </el-table-column>
                </template>
                <el-table-column align="center" label="图片" min-width="80">
                  <template slot-scope="scope">
                    <div class="upLoadPicBox" @click="modalPicTap('1','duo',scope.$index)">
                      <div v-if="scope.row.image" class="pictrue tabPic">
                        <img :src="scope.row.image">
                      </div>
                      <div v-else class="upLoad tabPic">
                        <i class="el-icon-camera cameraIconfont" />
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="市场价" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row['price'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="预售价" min-width="80">
                  <template slot-scope="scope">
                    <el-input v-model.number=" scope.row['presell_price']" type="number" class="priceBox" :min="0" :max="scope.row['price']" @blur="limitPrice(scope.row)" />
                  </template>
                </el-table-column>
                <el-table-column v-if="formValidate.presell_type === 2" align="center" label="预售定金" min-width="80">
                  <template slot-scope="scope">
                    <el-input @input="handleInput(scope.row['down_price'],scope.$index)" :precision="2" v-model="scope.row['down_price']" type="number" class="priceBox" :min="0" :max="scope.row['price']*0.2" @blur="restrictedRange(scope.row)" />
                  </template>
                </el-table-column>
                <el-table-column v-if="formValidate.presell_type === 2" align="center" label="尾款" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ (scope.row['presell_price'] && scope.row['down_price']) ? (scope.row['presell_price'] - scope.row['down_price']).toFixed(2) : scope.row['presell_price'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="成本价" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row['cost'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="库存" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row['old_stock'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="限量" min-width="80">
                  <template slot-scope="scope">
                    <el-input v-model.number="scope.row['stock']" type="number" class="priceBox" :min="0" :max="scope.row['old_stock']" />
                  </template>
                </el-table-column>
                <el-table-column align="center" label="商品编号" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row['bar_code'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="重量（KG）" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row['weight'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="体积（m³）" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row['volume'] }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-row>
        </div>

        <!-- 商品详情-->
        <el-row v-show="currentTab === 2">
          <el-col :span="24">
            <el-form-item label="商品详情：">
              <ueditorFrom v-model="formValidate.content" :content="formValidate.content" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="margin-top:30px;">
          <el-button v-show="currentTab>0" type="primary" class="submission" size="small" @click="handleSubmitUp">上一步</el-button>
          <el-button v-show="currentTab == 0" type="primary" class="submission" size="small" @click="handleSubmitNest1('formValidate')">下一步</el-button>
          <el-button v-show="currentTab == 1" type="primary" class="submission" size="small" @click="handleSubmitNest2('formValidate')">下一步</el-button>
          <el-button v-show="currentTab===2" :loading="loading" type="primary" class="submission" size="small" @click="handleSubmit('formValidate')">提交</el-button>
          <el-button v-show="currentTab===2" :loading="loading" type="primary" class="submission" size="small" @click="handlePreview()">预览</el-button>
        </el-form-item>
      </el-form>
    </el-card>
     <!--属性选择弹窗-->
    <el-dialog v-if="attrShow" :visible.sync="attrShow" title="请选择商品规格" width="320px">
      <attr-list :attrs="attrsList" @activeData="activeAttr" @close="labelAttr" @subAttrs="subAttrs" v-if="attrShow"></attr-list>
    </el-dialog>
    <!--选择商品-->
    <goods-list ref="goodsList" :resellShow="true" @getProduct="getProduct" />
    <!--添加服务保障模板-->
    <guarantee-service ref="serviceGuarantee" @get-list="getGuaranteeList" />
    <!--预览商品-->
    <div v-if="previewVisible">
      <div class="bg" @click.stop="previewVisible = false" />
      <preview-box v-if="previewVisible" ref="previewBox" :product-type="2" :preview-key="previewKey" />
    </div>
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
import ueditorFrom from '@/components/ueditorFrom'
import VueUeditorWrap from 'vue-ueditor-wrap'
import goodsList from '../seckill/seckillGoods/goodsList'
import guaranteeService from '@/components/serviceGuarantee/index'
import previewBox from '@/components/previewBox/index'
import attrList from "@/components/attrList"
import {
  shippingListApi,
  templateLsitApi,
  preSaleCreateProApi,
  preSaleProDetailApi,
  productDetailApi,
  categorySelectApi,
  categoryListApi,
  categoryBrandListApi,
  preSaleUpdateProApi,
  guaranteeListApi,
  presellPreviewApi,
  productConfigApi,
  getProductLabelApi
} from '@/api/product'
import { roterPre } from '@/settings'
const defaultObj = {
  product_id: '',
  image: '',
  slider_image: [],
  store_name: '',
  store_info: '',
  start_day: '',
  end_day: '',
  start_time: '',
  end_time: '',
  is_open_recommend: 1,
  is_open_state: 1,
  is_show: 1,
  presell_type: 1,
  keyword: '',
  brand_id: '', // 品牌id
  cate_id: '', // 平台分类id
  mer_cate_id: [], // 商户分类id
  pay_count: 0,
  integral: 0,
  sort: 0,
  is_good: 0,
  temp_id: '',
  guarantee_template_id: '',
  preSale_date: '',
  finalPayment_date: '',
  delivery_type: 1,
  delivery_day: 10,
  delivery_way: [],
  mer_labels: [],
  delivery_free: 0,
  attrValue: [{
    image: '',
    price: null,
    presell_price: null,
    down_price: null,
    cost: null,
    old_stock: null,
    stock: null,
    bar_code: '',
    weight: null,
    volume: null
  }],
  attr: [],
  extension_type: 0,
  content: '',
  spec_type: 0,
  is_gift_bag: 0
}
const objTitle = {
  price: {
    title: '市场价'
  },
  cost: {
    title: '成本价'
  },
  presell_price: {
    title: '预售价'
  },
  down_price: {
    title: '预售定金'
  },
  old_stock: {
    title: '库存'
  },
  stock: {
    title: '限量'
  },
  bar_code: {
    title: '商品编号'
  },
  weight: {
    title: '重量（KG）'
  },
  volume: {
    title: '体积(m³)'
  }
}

const proOptions = [{
  name: '店铺推荐',
  value: 'is_good'
}]
export default {
  name: 'PresellProductAdd',
  components: {
    ueditorFrom,
    goodsList,
    VueUeditorWrap,
    guaranteeService,
    previewBox,
    attrList
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      timeVal: '',
      timeVal2: '',
      dialogVisible: false,
      product_id: '',
      multipleSelection: [],
      optionsCate: {
        value: 'store_category_id',
        label: 'cate_name',
        children: 'children',
        emitPath: false
      },
      roterPre: roterPre,
      selectRule: '',
      checkboxGroup: [],
      recommend: proOptions,
      tabs: [],
      fullscreenLoading: false,
      props: {
        emitPath: false
      },
      propsMer: {
        emitPath: false,
        multiple: true
      },
      active: 0,
      OneattrValue: [Object.assign({}, defaultObj.attrValue[0])], // 单规格
      ManyAttrValue: [Object.assign({}, defaultObj.attrValue[0])], // 多规格
      ruleList: [],
      merCateList: [], // 商户分类筛选
      categoryList: [], // 平台分类筛选
      shippingList: [], // 发货时间
      guaranteeList: [], // 服务保障模板
      deliveryList: [],
      labelList: [], // 商品标签
      deliveryTime: [{
        name: '支付成功',
        date_id: 1
      },
      {
        name: '预售结束',
        date_id: 2
      }
      ],
      spikeTimeList: [],
      BrandList: [], // 品牌
      formValidate: Object.assign({}, defaultObj),
      maxStock: '',
      addNum: 0,
      singleSpecification: {},
      multipleSpecifications: [],
      formDynamics: {
        template_name: '',
        template_value: []
      },
      manyTabTit: {},
      manyTabDate: {},
      formThead: Object.assign({}, objTitle),
      grid2: {
        lg: 10,
        md: 12,
        sm: 24,
        xs: 24
      },
      // 规格数据
      formDynamic: {
        attrsName: '',
        attrsVal: ''
      },
      isBtn: false,
      manyFormValidate: [],
      images: [],
      currentTab: 0,
      isChoice: '',
      grid: {
        xl: 8,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      },
      loading: false,
      ruleValidate: {
        store_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        mer_cate_id: [{ required: true, message: '请选择商户分类', trigger: 'change', type: 'array', min: '1' }],
        cate_id: [{ required: true, message: '请选择平台分类', trigger: 'change' }],
        keyword: [{ required: true, message: '请输入商品关键字', trigger: 'blur' }],
        pay_count: [{ required: true, message: '请输入限购量', trigger: 'blur' }],
        store_info: [{ required: true, message: '请输入秒杀活动简介', trigger: 'blur' }],
        temp_id: [{ required: true, message: '请选择运费模板', trigger: 'change' }],
        delivery_type: [{ required: true, message: '请选择发货时间', trigger: 'change' }],
        image: [{ required: true, message: '请上传商品图', trigger: 'change' }],
        slider_image: [{ required: true, message: '请上传商品轮播图', type: 'array', trigger: 'change' }],
        delivery_way: [{ required: true, message: '请选择送货方式', trigger: 'change' }]
      },
      attrInfo: {},
      keyNum: 0,
      extensionStatus: 0,
      previewVisible: false,
      previewKey: '',
      deliveryType: [],
      attrs: [],
      attrsList:[],
			activeAtter:[],
      attrShow: false,
    
    }
  },
  computed: {
    attrValue() {
      const obj = Object.assign({}, defaultObj.attrValue[0])
      delete obj.image
      return obj
    },
    oneFormBatch() {
      const obj = [Object.assign({}, defaultObj.attrValue[0])]
      obj[0]['attr'] = '全部'
      delete obj[0].bar_code
      return obj
    }
  },
  watch: {
    'formValidate.attr': {
      handler: function(val) {
        if (this.formValidate.spec_type === 1) this.watCh(val)
      },
      immediate: false,
      deep: true
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
    if (this.$route.params.id && this.formValidate.spec_type === 1) {
      this.$watch('formValidate.attr', this.watCh)
    }
  },
  mounted() {
    this.formValidate.slider_image = []
    if (this.$route.params.id) {
      this.setTagsViewTitle()
      this.getInfo(this.$route.params.id)
      this.currentTab = 1

    } else {
      this.formValidate.attr.map((item) => {
        this.$set(item, 'inputVisible', false)
      })
      this.productCon()
    }
    this.getCategorySelect()
    this.getCategoryList()
    this.getBrandListApi()
    this.getShippingList()
    this.getGuaranteeList()
    this.getLabelLst()
    this.$store.dispatch('settings/setEdit', true)
  },
  methods: {
    handleInput(value,index){
     if (value != '') {
      if (value.indexOf('.') > -1) {
        if(this.formValidate.spec_type == 1){
          if(index == -1){
            this.oneFormBatch[0]['down_price'] = value.slice(0, value.indexOf('.') + 3)
          }else{
            this.ManyAttrValue[index]['down_price'] = value.slice(0, value.indexOf('.') + 3)
          }  
        }else{
          this.OneattrValue[0]['down_price'] = value.slice(0, value.indexOf('.') + 3)
        }
        
      }
    }
    },
    // 获取标签项
    getLabelLst() {
      getProductLabelApi().then(res => {
        this.labelList = res.data
      })
      .catch(res => {
        this.$message.error(res.message)
      })
    },
    productCon() {
      productConfigApi()
        .then(res => {
          this.deliveryType = res.data.delivery_way.map(String)
          const name = this.formValidate.type == 0 ? '快递配送' : '虚拟发货'
          if (this.deliveryType.length == 2) {
             if(this.formValidate.type == 2){ //卡密商品
              this.deliveryList = [
                { value: '2', name: name }
              ]
            }else{
              this.deliveryList = [
                { value: '1', name: '到店自提' },
                { value: '2', name: name }
              ]
            }   
          } else {
            if (this.deliveryType.length == 1 && this.deliveryType[0] == '1') {
              this.deliveryList = [
                { value: '1', name: '到店自提' }
              ]
            } else {
              if (this.deliveryType.length == 1 && this.deliveryType[0] == '1' && this.formValidate.type != 2) {
                this.deliveryList = [{ value: '1', name: '到店自提' }]
              } else {
                this.deliveryList = [{ value: '2', name: name }]
                this.formValidate.delivery_way = ['2']
              }
            }
          }
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 修改预售方式
    wayChange(e) {
      this.formValidate.presell_type = e
    },
    // 限制预售定金最大值
    restrictedRange(row) {
      if (parseFloat(row.down_price) > (row.presell_price) * 0.2) {
        row.down_price = (row.presell_price * 0.2).toFixed(2)
      }
    },
    limitInventory(row) {
      if (row.stock - row.old_stock > 0)row.stock = row.old_stock
    },
    limitPrice(row) {
      if (row.presell_price - row.price > 0)row.presell_price = row.price
    },
    add() {
      this.$refs.goodsList.dialogVisible = true
    },
    getProduct(data) {
      this.formValidate.image = data.src
      this.product_id = data.id
      console.log(this.product_id)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e
      this.formValidate.start_time = e ? this.moment(e[0]).format('YYYY-MM-DD HH:mm:ss') : ''
      this.formValidate.end_time = e ? this.moment(e[1]).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    onchangeTime2(e) {
      this.timeVal2 = e
      this.formValidate.final_start_time = e ? this.moment(e[0]).format('YYYY-MM-DD HH:mm:ss') : ''
      this.formValidate.final_end_time = e ? this.moment(e[1]).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    setTagsViewTitle() {
      const title = '编辑商品'
      const route = Object.assign({}, this.tempRoute, {
        title: `${title}-${this.$route.params.id}`
      })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    onChangeGroup() {
      this.checkboxGroup.includes('is_good')
        ? (this.formValidate.is_good = 1)
        : (this.formValidate.is_good = 0)
    },
    //打开属性
	  batchAttr(){
		  this.attrShow = true;
	  },
    //选中属性
	  activeAttr(e){
		  this.attrsList = e;
	  },
	  //关闭属性弹窗
	  labelAttr(){
	  	this.attrShow = false;
	  },
    //获取属性
		getAttr(){
			this.oneFormBatch[0].attr = '全部';
			let data = this.attrs;
			data.map(el=>{
				el.details = [];
				el.detail.map(label=>{
					el.details.push({
						name:label,
						select:false
					})
				})
			})
			this.attrsList = data;
		},
    doCombination(arr) {
      var count = arr.length - 1; //数组长度(从0开始)
      var tmp = [];
      var totalArr = [];// 总数组
      return doCombinationCallback(arr, 0);//从第一个开始
      //js 没有静态数据，为了避免和外部数据混淆，需要使用闭包的形式
      function doCombinationCallback(arr, curr_index) {
        for(let val of arr[curr_index]) {
          tmp[curr_index] = val;//以curr_index为索引，加入数组
          //当前循环下标小于数组总长度，则需要继续调用方法
          if(curr_index < count) {
            doCombinationCallback(arr, curr_index + 1);//继续调用
          }else{
            totalArr.push(tmp.join(','));//(直接给push进去，push进去的不是值，而是值的地址)
          }
          //js  对象都是 地址引用(引用关系)，每次都需要重新初始化，否则 totalArr的数据都会是最后一次的 tmp 数据；
          let oldTmp = tmp;
          tmp = [];
          for(let index of oldTmp) {
            tmp.push(index);
          }
        }
        return totalArr;
      }
    },

    //提交属性值；
	  subAttrs(e){
			let selectData = [];
			this.attrsList.forEach((el,index)=>{
				let obj = [];
				el.details.forEach((label)=>{
					if(label.select){
						obj.push(label.name);
					}
				})
				if(obj.length){
					selectData.push(obj)
				}
			})
		  let newData = [];
		  if(selectData.length){
			  newData = this.doCombination(selectData);
		  }
		  this.attrShow = false;
		  this.activeAtter = selectData;
		  this.oneFormBatch[0].attr = newData.length?newData.join(';') : '全部';
      let manyAttr = this.ManyAttrValue
		  manyAttr.forEach(j=> {
			  j.select = false;
			  if(newData.length){
				 newData.forEach(item=> {
            if(j.sku.split('').length == item.split('').length){
              if(j.sku == item){
                j.select = true;
              }
            }else{
              if(j.sku == item){
                j.select = true;
              }
            }
          })
			  }else{
				  j.select = true;
			  }
		  })
      this.$nextTick(function(){
        this.$set(this,'ManyAttrValue',manyAttr)
      })
      console.log(this.ManyAttrValue)
	  },
    watCh(val) {
      const tmp = {}
      const tmpTab = {}
      this.formValidate.attr.forEach((o, i) => {
        tmp['value' + i] = {
          title: o.value
        }
        tmpTab['value' + i] = ''
      })
      this.ManyAttrValue.forEach((val, index) => {
        const key = Object.values(val.detail).sort().join('/')
        if (this.attrInfo[key]) this.ManyAttrValue[index] = this.attrInfo[key]
      })
      this.attrInfo = {}
      this.ManyAttrValue.forEach((val) => {
        this.attrInfo[Object.values(val.detail).sort().join('/')] = val
      })
      this.manyTabTit = tmp
      this.manyTabDate = tmpTab
      this.formThead = Object.assign({}, this.formThead, tmp)
      console.log(this.formThead)
    },
    // 运费模板
    addTem() {
      const _this = this
      this.$modalTemplates(0, function() {
        _this.getShippingList()
      })
    },
    // 添加服务保障模板
    addServiceTem() {
      this.$refs.serviceGuarantee.add()
    },
    // 商户分类；
    getCategorySelect() {
      categorySelectApi()
        .then((res) => {
          this.merCateList = res.data
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    // 平台分类；
    getCategoryList() {
      categoryListApi()
        .then((res) => {
          this.categoryList = res.data
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    // 品牌筛选；
    getBrandListApi() {
      categoryBrandListApi()
        .then((res) => {
          this.BrandList = res.data
        })
        .catch((res) => {
          this.$message.error(res.message)
        })
    },
    // 获取商品属性模板；
    productGetRule() {
      templateLsitApi().then((res) => {
        this.ruleList = res.data
      })
    },
    // 运费模板；
    getShippingList() {
      shippingListApi().then((res) => {
        this.shippingList = res.data
      })
    },
    // 获取服务保障模板
    getGuaranteeList() {
      guaranteeListApi().then(res => {
        this.guaranteeList = res.data
      })
    },
    // 批量添加
    batchAdd() {
      for (const val of this.ManyAttrValue) {
        if(val.select){
          if(this.oneFormBatch[0].attr!= '')this.$set(val, 'attr', this.oneFormBatch[0].attr)
          if(this.oneFormBatch[0].image!= '')this.$set(val, 'image', this.oneFormBatch[0].image)
          if(this.oneFormBatch[0].price!= null && this.oneFormBatch[0].price!= "")this.$set(val, 'price', this.oneFormBatch[0].price)
          if(this.oneFormBatch[0].cost!= null && this.oneFormBatch[0].cost!= "")this.$set(val, 'cost', this.oneFormBatch[0].cost)
          if(this.oneFormBatch[0].down_price!= null && this.oneFormBatch[0].down_price!= "")this.$set(val, 'down_price', this.oneFormBatch[0].down_price)
          if(this.oneFormBatch[0].presell_price!= null && this.oneFormBatch[0].presell_price!= "")this.$set(val, 'presell_price', this.oneFormBatch[0].presell_price)
          if(this.oneFormBatch[0].stock!= null && this.oneFormBatch[0].stock!= "")this.$set(val, 'stock', this.oneFormBatch[0].stock)
          if(this.oneFormBatch[0].bar_code!= null && this.oneFormBatch[0].bar_code!= "")this.$set(val, 'bar_code', this.oneFormBatch[0].bar_code)
          if(this.oneFormBatch[0].weight!= null && this.oneFormBatch[0].weight!= "")this.$set(val, 'weight', this.oneFormBatch[0].weight)
          if(this.oneFormBatch[0].volume!= null && this.oneFormBatch[0].volume!= "")this.$set(val, 'volume', this.oneFormBatch[0].volume)
        }   
      }
    },
    // 详情
    getInfo(id) {
      this.fullscreenLoading = true
      this.$route.params.id ? preSaleProDetailApi(id).then(async(res) => {
        const info = res.data
        this.attrs = info.product.attr || [];
        this.formValidate = {
          type: info.type,
          product_id: info.product_id,
          guarantee_template_id: info.product.guarantee_template_id,
          image: info.product.image,
          slider_image: info.product.slider_image,
          store_name: info.store_name,
          store_info: info.store_info,
          presell_type: info.presell_type ? info.presell_type : 1,
          delivery_type: info.delivery_type ? info.delivery_type : 1,
          delivery_day: info.delivery_day ? info.delivery_day : 10,
          start_time: info.start_time
            ? info.start_time : '',
          end_time: info.end_time
            ? info.end_time : '',
          final_start_time: info.final_start_time
            ? info.final_start_time : '',
          final_end_time: info.final_end_time
            ? info.final_end_time : '',
          brand_id: info.product.brand_id, // 品牌id
          cate_id: info.cate_id ? info.cate_id : '', // 平台分类id
          mer_cate_id: info.mer_cate_id, // 商户分类id
          pay_count: info.pay_count,
          sort: info.product.sort,
          is_good: info.product.is_good,
          temp_id: info.product.temp_id,
          is_show: info.is_show,
          attr: info.product.attr,
          extension_type: info.extension_type,
          content: info.product.content.content,
          spec_type: info.product.spec_type,
          is_gift_bag: info.product.is_gift_bag,
          delivery_way: info.product.delivery_way && info.product.delivery_way.length ? info.product.delivery_way.map(String) : this.deliveryType,
          delivery_free: info.delivery_free ? info.delivery_free : 0,
          mer_labels: info.mer_labels && info.mer_labels.length ? info.mer_labels.map(Number) : []
        }
        if (this.formValidate.spec_type === 0) {
          this.OneattrValue = info.product.attrValue
          this.OneattrValue.forEach((val, i) => {
            this.attrInfo[Object.values(val.detail).sort().join('/')] = val
            this.$set(this.OneattrValue[i], 'down_price', (val.presellSku ? val.presellSku.down_price : 0))
            this.$set(this.OneattrValue[i], 'presell_price', (val.presellSku ? val.presellSku.presell_price : val.price))
            this.$set(this.OneattrValue[i], 'stock', (val.presellSku ? val.presellSku.stock : val.old_stock))
          })
          this.singleSpecification = JSON.parse(
            JSON.stringify(info.product.attrValue)
          )
          this.formValidate.attrValue = this.OneattrValue
        } else {
          const arr = []
          this.ManyAttrValue = info.product.attrValue
          this.ManyAttrValue.forEach((val, i) => {
            this.attrInfo[Object.values(val.detail).sort().join('/')] = val
            this.$set(this.ManyAttrValue[i], 'down_price', (val.presellSku ? val.presellSku.down_price : 0))
            this.$set(this.ManyAttrValue[i], 'presell_price', (val.presellSku ? val.presellSku.presell_price : val.price))
            this.$set(this.ManyAttrValue[i], 'stock', (val.presellSku ? val.presellSku.stock : val.old_stock))
            if (val.presellSku) {
              this.multipleSpecifications = JSON.parse(JSON.stringify(info.product.attrValue))
              arr.push(val)
            }
          })
          this.multipleSpecifications = JSON.parse(JSON.stringify(arr))
          this.$nextTick(() => {
            arr.forEach((row) => {
              this.$refs.multipleSelection.toggleRowSelection(row, true)
            })
          })
          this.formValidate.attrValue = this.multipleSelection
        }
        this.fullscreenLoading = false
        this.timeVal = [
          new Date(info.start_time),
          new Date(info.end_time)
        ]
        if(info.presell_type == 2){
          this.timeVal2 = [new Date(res.data.final_start_time), new Date(res.data.final_end_time)];
        }
        this.$store.dispatch('settings/setEdit', true)
        this.getAttr();
        this.productCon();
      })
        .catch((res) => {
          this.fullscreenLoading = false
          this.$message.error(res.message)
        })
        : productDetailApi(id)
          .then(async(res) => {
            const info = res.data
            info.attrValue.forEach(val => {
              val.select = true;
            });
            this.attrs = info.attr || [];
            this.formValidate = {
              type: info.type,
              product_id: info.product_id,
              image: info.image,
              slider_image: info.slider_image,
              store_name: info.store_name,
              store_info: info.store_info,
              presell_type: 1,
              delivery_type: info.delivery_type ? info.delivery_type : 1,
              delivery_day: info.delivery_day ? info.delivery_day : 10,
              start_time: '',
              end_time: '',
              final_start_time: '',
              final_end_time: '',
              brand_id: info.brand_id, // 品牌id
              cate_id: info.cate_id, // 平台分类id
              mer_cate_id: info.mer_cate_id, // 商户分类id
              pay_count: info.pay_count ? info.paycount : 0,
              sort: info.sort,
              is_good: info.is_good,
              temp_id: info.temp_id,
              guarantee_template_id: info.guarantee_template_id,
              is_show: info.is_show,
              attr: info.attr,
              extension_type: info.extension_type,
              content: info.content,
              spec_type: info.spec_type,
              is_gift_bag: info.is_gift_bag,
              delivery_way: info.delivery_way && info.delivery_way.length ? info.delivery_way.map(String) : this.deliveryType,
              delivery_free: info.delivery_free ? info.delivery_free : 0,
              mer_labels: info.mer_labels && info.mer_labels.length ? info.mer_labels.map(Number) : []
            }
            this.timeVal = this.timeVal2 = []
            if (this.formValidate.spec_type === 0) {
              this.OneattrValue = info.attrValue
              this.OneattrValue.forEach((val, i) => {
                this.$set(this.OneattrValue[i], 'down_price', 0)
                this.$set(this.OneattrValue[i], 'presell_price', this.OneattrValue[i].price)
              })
              this.singleSpecification = JSON.parse(
                JSON.stringify(info.attrValue)
              )
              this.formValidate.attrValue = this.OneattrValue
            } else {
              this.$nextTick(() => {
                info.attrValue.forEach((row) => {
                  this.$refs.multipleSelection.toggleRowSelection(row, true)
                })
              })
              this.ManyAttrValue = info.attrValue
              this.multipleSpecifications = JSON.parse(JSON.stringify(info.attrValue))
              this.ManyAttrValue.forEach((val, i) => {
                this.attrInfo[Object.values(val.detail).sort().join('/')] = val
                this.$set(this.ManyAttrValue[i], 'down_price', 0)
                this.$set(this.ManyAttrValue[i], 'presell_price', this.ManyAttrValue[i].price)
              })
              this.multipleSelection = info.attrValue
            }
            if (this.formValidate.is_good === 1) { this.checkboxGroup.push('is_good') }
            this.fullscreenLoading = false
            this.getAttr();
            this.productCon();
          })
          .catch((res) => {
            this.fullscreenLoading = false
            this.$message.error(res.message)
          })
    },
    handleRemove(i) {
      this.formValidate.slider_image.splice(i, 1)
    },
    // 点击商品图
    modalPicTap(tit, num, i) {
      const _this = this
      const attr = []
      this.$modalUpload(function(img) {
        if (tit === '1' && !num) {
          _this.formValidate.image = img[0]
          _this.OneattrValue[0].image = img[0]
        }
        if (tit === '2' && !num) {
          img.map((item) => {
            attr.push(item.attachment_src)
            _this.formValidate.slider_image.push(item)
            if (_this.formValidate.slider_image.length > 10) {
              _this.formValidate.slider_image.length = 10
            }
          })
        }
        if (tit === '1' && num === 'dan') {
          _this.OneattrValue[0].image = img[0]
        }
        if (tit === '1' && num === 'duo') {
          _this.ManyAttrValue[i].image = img[0]
        }
        if (tit === '1' && num === 'pi') {
          _this.oneFormBatch[0].image = img[0]
        }
      }, tit)
    },
    handleSubmitUp() {
      if (this.currentTab-- < 0) this.currentTab = 0
    },
    handleSubmitNest1(name) {
      if (!this.formValidate.image) {
        this.$message.warning('请选择商品！')
        return
      } else {
        this.currentTab++
        if (!this.$route.params.id) this.getInfo(this.product_id)
      }
    },
    handleSubmitNest2(name) {
      if (this.formValidate.spec_type === 1) {
        this.formValidate.attrValue = this.multipleSelection
      } else {
        this.formValidate.attrValue = this.OneattrValue
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (
            !this.formValidate.store_name ||
                        !this.formValidate.store_info ||
                        !this.formValidate.image ||
                        !this.formValidate.slider_image
          ) {
            this.$message.warning('请填写完整商品信息！')
            return
          }
          if (
            !this.formValidate.attrValue ||
                        this.formValidate.attrValue.length === 0
          ) {
            this.$message.warning('请选择商品规格！')
            return
          }
          if (!this.formValidate.delivery_day) {
            this.$message.warning('请填写发货时间！')
            return
          }
          this.currentTab++
        }
      })
    },
    // 提交
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$store.dispatch('settings/setEdit', false)
          this.fullscreenLoading = true
          this.loading = true
          delete this.formValidate.preSale_date
          delete this.formValidate.finalPayment_date
          console.log(this.formValidate)
          if (this.$route.params.id) {
            console.log(this.ManyAttrValue)
            if (this.formValidate.presell_type === 1) { this.formValidate.final_start_time = this.formValidate.final_end_time = '' }
            preSaleUpdateProApi(this.$route.params.id, this.formValidate)
              .then(async(res) => {
                this.fullscreenLoading = false
                this.$message.success(res.message)
                this.$router.push({
                  path: this.roterPre + '/marketing/presell/list'
                })
                this.$refs[name].resetFields()
                this.formValidate.slider_image = []
                this.loading = false
              })
              .catch((res) => {
                this.fullscreenLoading = false
                this.loading = false
                this.$message.error(res.message)
              })
          } else {
            preSaleCreateProApi(this.formValidate)
              .then(async(res) => {
                this.fullscreenLoading = false
                this.$message.success(res.message)
                this.$router.push({
                  path: this.roterPre + '/marketing/presell/list'
                })
                this.$refs[name].resetFields()
                this.formValidate.slider_image = []
                this.loading = false
              })
              .catch((res) => {
                this.fullscreenLoading = false
                this.loading = false
                this.$message.error(res.message)
              })
          }
        } else {
          if (
            !this.formValidate.store_name ||
                        !this.formValidate.store_info ||
                        !this.formValidate.image ||
                        !this.formValidate.slider_image
          ) {
            this.$message.warning('请填写完整商品信息！')
          }
        }
      })
    },
    // 预览
    handlePreview() {
      delete this.formValidate.preSale_date
      delete this.formValidate.finalPayment_date
      if (this.formValidate.presell_type === 1) { this.formValidate.final_start_time = this.formValidate.final_end_time = '' }
      presellPreviewApi(this.formValidate)
        .then(async res => {
          this.previewVisible = true
          this.previewKey = res.data.preview_key
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 表单验证
    validate(prop, status, error) {
      if (status === false) {
        this.$message.warning(error)
      }
    },
    // 移动
    handleDragStart(e, item) {
      this.dragging = item
    },
    handleDragEnd(e, item) {
      this.dragging = null
    },
    handleDragOver(e) {
      e.dataTransfer.dropEffect = 'move'
    },
    handleDragEnter(e, item) {
      e.dataTransfer.effectAllowed = 'move'
      if (item === this.dragging) {
        return
      }
      const newItems = [...this.formValidate.slider_image]
      const src = newItems.indexOf(this.dragging)
      const dst = newItems.indexOf(item)
      newItems.splice(dst, 0, ...newItems.splice(src, 1))
      this.formValidate.slider_image = newItems
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}
.priceBox {
    /deep/input {
        padding-right: 0;
    }
}
.sp100 {
    width: 100%;
}
.proCoupon {
    /deep/.el-form-item__content {
        margin-top: 5px;
    }
}

.tabPic {
    width: 40px !important;
    height: 40px !important;

    img {
        width: 100%;
        height: 100%;
    }
}

.noLeft {
    /deep/.el-form-item__content {
        margin-left: 0 !important;
    }
}

.tabNumWidth {
    /deep/.el-input-number--medium {
        width: 121px !important;
    }

    /deep/.el-input-number__increase {
        width: 20px !important;
        font-size: 12px !important;
    }

    /deep/.el-input-number__decrease {
        width: 20px !important;
        font-size: 12px !important;
    }

    /deep/.el-input-number--medium .el-input__inner {
        padding-left: 25px !important;
        padding-right: 25px !important;
    }

    /deep/ thead {
        line-height: normal !important;
    }

    /deep/ .el-table .cell {
        line-height: normal !important;
    }
}

.selWidth {
    width: 100%;
}
.selectOn{
	color: #2d8cf0;
}	
.selWidthd {
    width: 300px;
}

.selWidthd1 {
    width: 200px;
}

.button-new-tag {
    height: 28px;
    line-height: 26px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}

.pictrue {
    width: 60px;
    height: 60px;
    border: 1px dotted rgba(0, 0, 0, 0.1);
    margin-right: 10px;
    position: relative;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
    }
}

.btndel {
    position: absolute;
    z-index: 1;
    width: 20px !important;
    height: 20px !important;
    left: 46px;
    top: -4px;
}

.labeltop {
    /deep/.el-form-item__label {
        float: none !important;
        display: inline-block !important;
        margin-left: 120px !important;
        width: auto !important;
    }
}
</style>
