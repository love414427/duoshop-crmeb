<template>
  <div class="divBox">
    <el-card class="box-card">
      <div class="clearfix">
        <el-tabs v-if="headTab.length > 0" v-model="currentTab">
          <el-tab-pane
            v-for="(item, index) in headTab"
            :key="index"
            :name="item.name"
            :label="item.title"
          />
        </el-tabs>
      </div>
      <el-form
        ref="formValidate"
        :key="currentTab"
        v-loading="fullscreenLoading"
        class="formValidate mt20"
        :rules="ruleValidate"
        :model="formValidate"
        label-width="160px"
        @submit.native.prevent
      >
        <el-row v-if="currentTab == '1'" :gutter="24">
          <el-col :span="24">
            <el-form-item label="商品标题：" prop="store_name">
              <el-input
                v-model="formValidate.store_name"
                placeholder="请输入商品标题"
                class="selWidth"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品分类：" prop="cate_id">
              <el-select
                v-model="formValidate.cate_id"
                placeholder="请选择"
                class="selWidth"
              >
                <el-option
                  v-for="item in categoryList"
                  :key="item.store_category_id"
                  :label="item.cate_name"
                  :value="item.store_category_id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品封面图：" prop="image">
              <div
                class="upLoadPicBox"
                title="750*750px"
                @click="modalPicTap('1')"
              >
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
                <div
                  v-for="(item, index) in formValidate.slider_image"
                  :key="index"
                  class="pictrue"
                  draggable="false"
                  @dragstart="handleDragStart($event, item)"
                  @dragover.prevent="handleDragOver($event, item)"
                  @dragenter="handleDragEnter($event, item)"
                  @dragend="handleDragEnd($event, item)"
                >
                  <img :src="item">
                  <i
                    class="el-icon-error btndel"
                    @click="handleRemove(index)"
                  />
                </div>
                <div
                  v-if="formValidate.slider_image.length < 10"
                  class="uploadCont"
                  title="750*750px"
                >
                  <div class="upLoadPicBox" @click="modalPicTap('2')">
                    <div class="upLoad">
                      <i class="el-icon-camera cameraIconfont" />
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid2">
            <el-form-item label="用户兑换总数量限制：" prop="once_max_count">
              <el-input-number
                v-model="formValidate.once_max_count"
                :min="1"
                placeholder="请输入排序序号"
                style="width: 200px;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="单位：" prop="unit_name">
              <el-input
                v-model="formValidate.unit_name"
                placeholder="请输入单位"
                class="selWidth"
              />
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
            <el-form-item label="上架状态：" props="is_used" required>
              <el-radio-group
                v-model="formValidate.is_used"
              >
                <el-radio :label="1" class="radio">开启</el-radio>
                <el-radio :label="0">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="好物精选：" props="is_hot" required>
              <el-radio-group
                v-model="formValidate.is_hot"
              >
                <el-radio :label="1" class="radio">开启</el-radio>
                <el-radio :label="0">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品关键字：">
              <el-input
                v-model="formValidate.keyword"
                placeholder="请输入商品关键字"
                class="selWidth"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品简介：" prop="store_info">
              <el-input
                v-model="formValidate.store_info"
                type="textarea"
                :rows="3"
                placeholder="请输入商品简介"
                class="selWidth"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 规格设置 -->
        <el-row v-if="currentTab == '2'">
          <el-col :span="24">
            <el-form-item label="商品规格：" props="spec_type">
              <el-radio-group
                v-model="formValidate.spec_type"
                @change="onChangeSpec(formValidate.spec_type)"
              >
                <el-radio :label="0" class="radio">单规格</el-radio>
                <el-radio :label="1">多规格</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <!-- 多规格添加-->
          <el-col v-if="formValidate.spec_type === 1" :span="24" class="noForm">
            <!-- <el-form-item label="设置规格：">
              <div class="acea-row">
                <el-select v-model="selectRule">
                  <el-option
                    v-for="item in ruleList"
                    :key="item.attr_template_id"
                    :label="item.template_name"
                    :value="item.attr_template_id"
                  />
                </el-select>
                <el-button
                  type="primary"
                  class="ml15"
                  size="small"
                  @click="confirm"
                >确认</el-button>
                <el-button
                  class="ml15"
                  size="small"
                  @click="addRule"
                >添加规格模板</el-button>
              </div>
            </el-form-item> -->
            <el-form-item v-if="formValidate.attr.length > 0">
              <div v-for="(item, index) in formValidate.attr" :key="index">
                <div class="acea-row row-middle">
                  <span class="mr5">{{ item.value }}</span>
                  <i
                    class="el-icon-circle-close"
                    @click="handleRemoveAttr(index)"
                  />
                </div>
                <div class="rulesBox">
                  <el-tag
                    v-for="(j, indexn) in item.detail"
                    :key="indexn"
                    closable
                    size="medium"
                    :disable-transitions="false"
                    class="mb5 mr10"
                    @close="handleClose(item.detail, indexn)"
                  >{{ j }}
                  </el-tag>
                  <el-input
                    v-if="item.inputVisible"
                    ref="saveTagInput"
                    v-model="item.detail.attrsVal"
                    class="input-new-tag"
                    size="small"
                    @keyup.enter.native="
                      createAttr(item.detail.attrsVal, index)
                    "
                    @blur="createAttr(item.detail.attrsVal, index)"
                  />
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput(item)"
                  >+ 添加</el-button>
                </div>
              </div>
            </el-form-item>
            <el-col v-if="isBtn">
              <el-col :xl="6" :lg="9" :md="9" :sm="24" :xs="24">
                <el-form-item label="规格：">
                  <el-input
                    v-model="formDynamic.attrsName"
                    placeholder="请输入规格"
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="9" :md="9" :sm="24" :xs="24">
                <el-form-item label="规格值：">
                  <el-input
                    v-model="formDynamic.attrsVal"
                    placeholder="请输入规格值"
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="12" :lg="6" :md="6" :sm="24" :xs="24">
                <el-form-item class="noLeft">
                  <el-button
                    type="primary"
                    size="small"
                    @click="createAttrName"
                  >确定</el-button>
                  <el-button size="small" @click="offAttrName">取消</el-button>
                </el-form-item>
              </el-col>
            </el-col>
            <el-form-item v-if="!isBtn" label="设置规格：">
              <el-button
                type="primary"
                icon="md-add"
                size="small"
                @click="addBtn"
              >添加新规格</el-button>
              <el-button
                type="success"
                icon="md-add"
                size="small"
                @click="generate"
              >立即生成</el-button>
            </el-form-item>
          </el-col>
          <!-- 批量设置-->
          <el-col
            v-if="(formValidate.spec_type === 1 && formValidate.attr.length > 0 && $route.params.id) || (!$route.params.id && createProduct)"
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
                        class="priceBox"
                      />
                      <el-input
                        v-else-if="formThead[iii].title === '兑换积分'"
                        v-model.number="scope.row[iii]"
                        type="number"
                        oninput="value=value.replace(/[^0-9]/g,'')"
                        class="priceBox"
                      />
                      <el-input
                        v-else
                        v-model="scope.row[iii]"
                        type="number"
                        min="0"
                        class="priceBox"
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
          <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
            <!-- 单规格表格-->
            <el-form-item v-if="formValidate.spec_type === 0">
              <el-table
                :data="OneattrValue"
                border
                class="tabNumWidth"
                size="mini"
              >
                <el-table-column align="center" label="图片" min-width="80">
                  <template slot-scope="scope">
                    <div
                      class="upLoadPicBox"
                      @click="modalPicTap('1', 'dan', 'pi')"
                    >
                      <div v-if="formValidate.image" class="pictrue tabPic">
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
                        class="priceBox"
                      />
                      <el-input
                        v-else-if="formThead[iii].title === '兑换积分'"
                        v-model.number="scope.row[iii]"
                        type="number"
                        oninput="value=value.replace(/[^0-9]/g,'')"
                        class="priceBox"
                      />
                      <el-input
                        v-else
                        v-model="scope.row[iii]"
                        type="number"
                        :min="0"
                        class="priceBox"
                      />
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <!-- 多规格表格-->
            <el-form-item
              v-if="(formValidate.spec_type === 1 && formValidate.attr.length > 0 && $route.params.id) || (!$route.params.id && createProduct)"
              class="labeltop"
              label="规格列表："
            >
              <el-table
                :data="ManyAttrValue"
                border
                class="tabNumWidth"
                size="mini"
                key="2"
              >
                <template v-if="manyTabDate">
                  <el-table-column
                    v-for="(item, iii) in manyTabDate"
                    :key="iii"
                    align="center"
                    :label="manyTabTit[iii].title"
                    min-width="80"
                  >
                    <template slot-scope="scope">
                      <span class="priceBox" :class="scope.row.select?'selectOn':''" v-text="scope.row[iii]" />
                    </template>
                  </el-table-column>
                </template>
                <el-table-column align="center" label="图片" min-width="80">
                  <template slot-scope="scope">
                    <div
                      class="upLoadPicBox"
                      title="750*750px"
                      @click="modalPicTap('1', 'duo', scope.$index)"
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
                        class="priceBox"
                      />
                      <el-input
                        v-else-if="formThead[iii].title === '兑换积分'"
                        v-model.number="scope.row[iii]"
                        type="number"
                        oninput="value=value.replace(/[^0-9]/g,'')"
                        class="priceBox"
                      />
                      <el-input
                        v-else
                        v-model="scope.row[iii]"
                        :min="0"
                        class="priceBox"
                        type="number"
                      />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  key="3"
                  align="center"
                  label="操作"
                  min-width="80"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      class="submission"
                      size="small"
                      @click="delAttrTable(scope.$index)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 商品详情-->
        <el-row v-if="currentTab == '3'">
          <el-col :span="24">
            <el-form-item label="商品详情：">
              <vue-ueditor-wrap
                v-model="formValidate.content"
                :config="myConfig"
                @beforeInit="addCustomDialog"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="margin-top:30px;">
          <el-button
            v-show="currentTab > 1"
            type="primary"
            size="small"
            @click="handleSubmitUp"
          >上一步
          </el-button>
          <el-button
            v-show="currentTab < 3"
            type="primary"
            class="submission"
            size="small"
            @click="handleSubmitNest('formValidate')"
          >下一步
          </el-button>
          <el-button
            v-show="currentTab == '3' || $route.params.id"
            :loading="loading"
            type="primary"
            class="submission"
            size="small"
            @click="handleSubmit('formValidate')"
          >提交
          </el-button>
          <!-- <el-button
            :loading="loading"
            type="primary"
            class="submission"
            size="small"
            @click="handlePreview('formValidate')"
          >预览
          </el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
    <!--属性选择弹窗-->
    <el-dialog v-if="attrShow" :visible.sync="attrShow" title="请选择商品规格" width="320px">
      <attr-list :attrs="attrsList" @activeData="activeAttr" @close="labelAttr" @subAttrs="subAttrs" v-if="attrShow"></attr-list>
    </el-dialog>
    <!--预览商品-->
    <div v-if="previewVisible">
      <div class="bg" @click.stop="previewVisible = false" />
      <preview-box
        v-if="previewVisible"
        ref="previewBox"
        :preview-key="previewKey"
      />
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
import Sortable from 'sortablejs'
import {
  templateLsitApi,
  createIntegralProduct,
  integralProDetailApi,
  integralProCateSelect,
  integralProUpdateApi,
  productPreviewApi,
  generateAttrApi
} from '@/api/marketing'
import { roterPre } from '@/settings'
import previewBox from '@/components/previewBox/index'
import attrList from "@/components/attrList";
import SettingMer from '@/libs/settingMer'
import { getToken } from '@/utils/auth'
import copyRecord from './copyRecord'
import { mateName } from '@/utils'
const defaultObj = {
  image: '',
  slider_image: [],
  store_name: '',
  store_info: '',
  keyword: '',
  cate_id: '', // 平台分类id
  param_temp_id: [],
  unit_name: '',
  sort: 0,
  once_max_count: 0,
  is_hot: 0,
  is_used: 0,
  attrValue: [
    {
      image: '',
      price: null,
      cost: null,
      ot_price: null,
      select: false,
      stock: null,
      bar_code: '',
      weight: null,
      volume: null
    }
  ],
  attr: [],
  content: '',
  spec_type: 0,
  type: 0,
  product_type: 0
}
const objTitle = {
  cost: {
    title: '市场价'
  },
  ot_price: {
    title: '兑换积分'
  },
  price: {
    title: '兑换金额'
  },
  stock: {
    title: '库存'
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
export default {
  name: 'IntegralProductAdd',
  components: {
    ueditorFrom,
    VueUeditorWrap,
    previewBox,
    attrList,
    copyRecord
  },
  data() {
    const url =
      SettingMer.https + '/upload/image/0/file?ueditor=1&token=' + getToken()
    return {
      myConfig: {
        autoHeightEnabled: false, // 编辑器不自动被内容撑高
        initialFrameHeight: 500, // 初始容器高度
        initialFrameWidth: '100%', // 初始容器
        enableAutoSave: false,
        UEDITOR_HOME_URL: '/UEditor/',
        serverUrl: url,
        imageUrl: url,
        imageFieldName: 'file',
        imageUrlPrefix: '',
        imageActionName: 'upfile',
        imageMaxSize: 2048000,
        imageAllowFiles: ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
      },
      roterPre: roterPre,
      selectRule: '',
      checkboxGroup: [],
      tabs: [],
      fullscreenLoading: false,
      props: { emitPath: false },
      propsMer: { emitPath: true },
      active: 0,
      deduction_set: -1,
      OneattrValue: [Object.assign({}, defaultObj.attrValue[0])], // 单规格
      ManyAttrValue: [Object.assign({}, defaultObj.attrValue[0])], // 多规格
      ruleList: [],
      categoryList: [], // 分类筛选
      deliveryList: [],
      labelList: [], // 商品标签
      formThead: Object.assign({}, objTitle),
      formValidate: Object.assign({}, defaultObj),
      picValidate: true,
      formDynamics: {
        template_name: '',
        template_value: []
      },
      manyTabTit: {},
      manyTabDate: {},
      grid2: {
        xl: 10,
        lg: 12,
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
      images: [],
      currentTab: '1',
      grid: {
        xl: 8,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      },
      loading: false,
      ruleValidate: {
        store_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        cate_id: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ],
        keyword: [
          { required: true, message: '请输入商品关键字', trigger: 'blur' }
        ],
        unit_name: [{ required: true, message: '请输入单位', trigger: 'blur' }],
        store_info: [
          { required: true, message: '请输入商品简介', trigger: 'blur' }
        ],
        temp_id: [
          { required: true, message: '请选择运费模板', trigger: 'change' }
        ],
        once_max_count: [
          { required: true, message: '请输入限购数量', trigger: 'change' }
        ],
        image: [{ required: true, message: '请上传商品图', trigger: 'change' }],
        slider_image: [
          {
            required: true,
            message: '请上传商品轮播图',
            type: 'array',
            trigger: 'change'
          }
        ],
        spec_type: [
          { required: true, message: '请选择商品规格', trigger: 'change' }
        ],
        delivery_way: [
          { required: true, message: '请选择送货方式', trigger: 'change' }
        ]
      },
      attrInfo: {},
      previewVisible: false,
      previewKey: '',
      headTab: [
        { title: '商品信息', name: '1' },
        { title: '规格设置', name: '2' },
        { title: '商品详情', name: '3' },
      ],
      type: 0,
      attrVal: {
        price: null,
        cost: null,
        ot_price: null,
        stock: null,
        bar_code: '',
        weight: null,
        volume: null
      },
      attrs: [],
      attrsList:[],
			activeAtter:[],
      attrShow: false,
      isGenerate: false,
      createProduct: false,
      generateArr: [],
      createCount: this.$route.params.id ? 0 : -10
    }
  },
  computed: {
    attrValue() {
      const obj = Object.assign({}, this.attrVal)
      return obj
    },
    oneFormBatch() {
      const obj = [Object.assign({}, defaultObj.attrValue[0])]
      if (this.OneattrValue[0] && this.OneattrValue[0]['image']) { obj[0]['image'] = this.OneattrValue[0]['image'] }
      obj[0]['attr'] = '全部'
      delete obj[0].bar_code
      return obj
    }
  },
  watch: {
    'formValidate.attr': {   
      handler: function(val) {
        this.createCount+=1
        if (this.formValidate.spec_type === 1) this.watCh(val)
      },
      immediate: false,
      deep: true
    },
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
    if (this.$route.params.id && this.formValidate.spec_type === 1) {
      this.$watch('formValidate.attr', this.watCh)
    }
  },
  mounted() {
    this.getCategoryList();
    if (this.$route.params.id) {
      this.setTagsViewTitle()
      this.$nextTick(() => {
        this.getInfo()
      }) 
    }else{
      this.formValidate.slider_image = [];
    }
    this.formValidate.attr.map(item => {
      this.$set(item, 'inputVisible', false)
    })
    this.type = this.$route.query.type || 0
    // this.$store.dispatch('settings/setEdit', true)
  },
  destroyed() {
    window.removeEventListener('popstate', this.goBack, false)
  },
  methods: {
    setSort() {
      // ref一定跟table上面的ref一致
      const el = this.$refs.tableParameter.$el.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        // 监听拖拽事件结束时触发
        onEnd: evt => {
          this.elChangeExForArray(evt.oldIndex, evt.newIndex, this.formValidate.params)
        }
      })
    },
    elChangeExForArray(index1, index2, array) {
      const temp = array[index1]
      array[index1] = array[index2]
      array[index2] = temp
      return array
    },
    goBack() {
      sessionStorage.clear()
      window.history.back()
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
	  },
    setTagsViewTitle() {
      const title = '编辑商品'
      const route = Object.assign({}, this.tempRoute, {
        title: `${title}-${this.$route.params.id}`
      })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    watCh(val) {
      const tmp = {}
      const tmpTab = {}
      this.formValidate.attr.forEach((o, i) => {
        tmp['value' + i] = { title: o.value }
        tmpTab['value' + i] = ''
      })
      if(this.isGenerate || this.createCount == 1 ){
        this.ManyAttrValue = this.attrFormat(val)
        this.ManyAttrValue.forEach((val, index) => {
          const key = Object.values(val.detail)
            .sort()
            .join('/')
          if (this.attrInfo[key]) this.ManyAttrValue[index] = this.attrInfo[key]
        })
        this.attrInfo = {}
        this.ManyAttrValue.forEach(val => {
          if (val.detail !== 'undefined' && val.detail !== null) {
            this.attrInfo[
              Object.values(val.detail)
                .sort()
                .join('/')
            ] = val
          }
        })
        this.manyTabTit = tmp
        this.manyTabDate = tmpTab
        this.formThead = Object.assign({}, this.formThead, tmp)
      }
      this.isGenerate = false
    },
    attrFormat(arr) {
      let data = [],that = this;
      const res = []
      return format(arr)
      function format(arr) {
        if (arr.length > 1) {
          arr.forEach((v, i) => {
            if (i === 0) data = arr[i]['detail']
            const tmp = []
            data.forEach(function(vv) {
              arr[i + 1] &&
                arr[i + 1]['detail'] &&
                arr[i + 1]['detail'].forEach(g => {
                  const rep2 =
                    (i !== 0 ? '' : arr[i]['value'] + '_$_') +
                    vv +
                    '-$-' +
                    arr[i + 1]['value'] +
                    '_$_' +
                    g
                  tmp.push(rep2)
                  if (i === arr.length - 2) {
                    const rep4 = {
                      image: '',
                      price: 0,
                      cost: 0,
                      ot_price: 0,
                      select: true,
                      sku: vv.sku,
                      stock: 0,
                      bar_code: '',
                      weight: 0,
                      volume: 0,
                      brokerage: 0,
                      brokerage_two: 0
                    }
                    rep2.split('-$-').forEach((h, k) => {
                      const rep3 = h.split('_$_')
                      if (!rep4['detail']) rep4['detail'] = {}
                      rep4['detail'][rep3[0]] = rep3.length > 1 ? rep3[1] : ''
                    })
                    // if(rep4.detail !== 'undefined' && rep4.detail !== null){
                    Object.values(rep4.detail).forEach((v, i) => {
                      rep4['value' + i] = v
                    })
                    // }

                    res.push(rep4)
                  }
                })
            })
            data = tmp.length ? tmp : []
          })
        } else {
          const dataArr = []
          arr.forEach((v, k) => {
            v['detail'].forEach((vv, kk) => {
              dataArr[kk] = v['value'] + '_' + vv
              res[kk] = {
                image: '',
                price: 0,
                cost: 0,
                ot_price: 0,
                select: true,
                sku: "",
                stock: 0,
                bar_code: '',
                weight: 0,
                volume: 0,
                brokerage: 0,
                brokerage_two: 0,
                detail: { [v['value']]: vv }
              }
              Object.values(res[kk].detail).forEach((v, i) => {
                res[kk]['value' + i] = v
              })
            })
          })
          data.push(dataArr.join('$&'))
        }
        if(that.generateArr.length>0){
          that.generateArr.forEach((v, i) => {
            res[i]['sku'] = v.sku
          })
        }
        return res
      }
    },
    // 选择规格
    onChangeSpec(num) {
      // if (num === 1) this.productGetRule()
    },
    // 切换积分抵扣
    changeIntergral(e) {
      if (e == -1) {
        this.formValidate.integral_rate = -1
      } else {
        this.formValidate.integral_rate = this.formValidate.integral_rate
      }
    },
    // 选择属性确认
    confirm() {
      if (!this.selectRule) {
        return this.$message.warning('请选择属性')
      } 
      this.ruleList.forEach(item => {
        if (item.attr_template_id === this.selectRule) {
          this.formValidate.attr = item.template_value
          this.attrs = item.template_value
        }
      })
      this.addmanyData(this.ManyAttrValue)
      this.getAttr();
    },
    addmanyData(data){
      data.forEach(item=>{
        item.select = true
      })
      this.ManyAttrValue = data;
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
    // 积分商品分类；
    getCategoryList() {
      integralProCateSelect()
        .then(res => {
          this.categoryList = res.data
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 获取商品属性模板；
    productGetRule() {
      templateLsitApi().then(res => {
        this.ruleList = res.data
      })
    },
    showInput(item) {
      this.$set(item, 'inputVisible', true)
    },
    addcustom() {
      if (this.formValidate.extend.length > 9) {
        this.$message.warning('最多添加10条')
      } else {
        this.formValidate.extend.push({
          title: '',
          key: 'text',
          value: '',
          require: false
        })
      }
    },

    // 乘法
    accMul(arg1, arg2) {
      var max = 0
      var s1 = arg1.toString()
      var s2 = arg2.toString()
      try {
        max += s1.split('.')[1].length
      } catch (e) {}
      try {
        max += s2.split('.')[1].length
      } catch (e) {}
      return (
        (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
        Math.pow(10, max)
      )
    },
    // 删除表格中的属性
    delAttrTable(index) {
      this.ManyAttrValue.splice(index, 1)
    },
    // 批量添加
    batchAdd() {
      for (const val of this.ManyAttrValue) {
        if(val.select){
          console.log(this.oneFormBatch[0])
          if(this.oneFormBatch[0].attr!= '')this.$set(val, 'attr', this.oneFormBatch[0].attr)
          if(this.oneFormBatch[0].image!= '')this.$set(val, 'image', this.oneFormBatch[0].image)
          if(this.oneFormBatch[0].price!= null)this.$set(val, 'price', this.oneFormBatch[0].price)
          if(this.oneFormBatch[0].cost!= null)this.$set(val, 'cost', this.oneFormBatch[0].cost)
          if(this.oneFormBatch[0].ot_price!= null)this.$set(val, 'ot_price', this.oneFormBatch[0].ot_price)
          if(this.oneFormBatch[0].svip_price!= null)this.$set(val, 'svip_price', this.oneFormBatch[0].svip_price)
          if(this.oneFormBatch[0].stock!= null)this.$set(val, 'stock', this.oneFormBatch[0].stock)
          if(this.oneFormBatch[0].bar_code!= null)this.$set(val, 'bar_code', this.oneFormBatch[0].bar_code)
          if(this.oneFormBatch[0].weight!= null)this.$set(val, 'weight', this.oneFormBatch[0].weight)
          if(this.oneFormBatch[0].volume!= null)this.$set(val, 'volume', this.oneFormBatch[0].volume)
          if(this.oneFormBatch[0].extension_one!= null)this.$set(val, 'extension_one', this.oneFormBatch[0].extension_one)
          if(this.oneFormBatch[0].extension_two!= null)this.$set(val, 'extension_two', this.oneFormBatch[0].extension_two)
        }
      }
    },
    // 添加按钮
    addBtn() {
      this.clearAttr()
      this.isBtn = true
    },
    // 取消
    offAttrName() {
      this.isBtn = false
    },
    clearAttr() {
      this.formDynamic.attrsName = ''
      this.formDynamic.attrsVal = ''
    },
    // 删除规格
    handleRemoveAttr(index) {
      this.formValidate.attr.splice(index, 1)
      this.ManyAttrValue.splice(index, 1)
    },
    // 删除属性
    handleClose(item, index) {
      item.splice(index, 1)
      this.attrs = this.formValidate.attr;
    },
    // 添加规则名称
    createAttrName() {
      if (this.formDynamic.attrsName && this.formDynamic.attrsVal) {
        const data = {
          value: this.formDynamic.attrsName,
          detail: [this.formDynamic.attrsVal]
        }
        this.formValidate.attr.push(data)
        var hash = {}
        this.formValidate.attr = this.formValidate.attr.reduce(function(
          item,
          next
        ) {
          /* eslint-disable */
          hash[next.value] ? "" : (hash[next.value] = true && item.push(next));
          return item;
        },
        []);
        this.clearAttr();
        this.attrs = this.formValidate.attr;
        this.isGenerate = true;
        this.isBtn = false;
      } else {
        this.$message.warning("请添加完整的规格！");
      }
    },
    // 添加属性
    createAttr(num, idx) {
      if (num) {
        this.formValidate.attr[idx].detail.push(num);
        var hash = {};
        this.formValidate.attr[idx].detail = this.formValidate.attr[
          idx
        ].detail.reduce(function(item, next) {
          /* eslint-disable */
          hash[next] ? "" : (hash[next] = true && item.push(next));
          return item;
        }, []);
        this.formValidate.attr[idx].inputVisible = false;
      } else {
        this.$message.warning("请添加属性");
      }
    },
     // 立即生成
    generate() {
      let id = this.$route.params.id || 0;
      generateAttrApi(id,{ attrs: this.attrs,product_type: this.formValidate.product_type })
        .then((res) => {
          let info = res.data
          this.generateArr = res.data.value
          this.formValidate.attr = res.data.attr;
          this.createProduct = true
          this.isGenerate = true
          if (this.$route.params.id !== "0") {
			      this.addmanyData(info.value);
          }
          // if (!this.$route.params.id && this.formValidate.spec_type === 1) { 
          //   this.ManyAttrValue.map((item) => {
          //     item.image = this.formValidate.slider_image[0];
          //   });
          //   this.oneFormBatch[0].image = this.formValidate.slider_image[0];
          // } else if (this.$route.params.id) {
          //   this.ManyAttrValue.map((item) => {
          //     if (!item.image) {
          //       item.image = this.formValidate.slider_image[0];
          //     }
          //   });
          //   this.oneFormBatch[0].image = this.formValidate.slider_image[0];
          // }
					this.getAttr();
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 详情
    getInfo() {
      this.fullscreenLoading = true;
      integralProDetailApi(this.$route.params.id)
        .then(async res => {
          let info = res.data;
          this.infoData(info);
        })
        .catch(res => {
          this.fullscreenLoading = false;
          this.$message.error(res.message);
        });
    },
    infoData(info) {
      this.deduction_set = info.integral_rate == -1 ? -1 : 1;
      this.attrs = info.attr || [];
        info.attrValue.forEach(val => {
          val.select = true;
        });
      this.formValidate = {
        product_type: info.product_type || 0,
        image: info.image,
        attrValue: info.attrValue,
        slider_image: info.slider_image,
        store_name: info.store_name,
        store_info: info.store_info,
        keyword: info.keyword,
        cate_id: this.type == 1 ? "" : mateName(this.categoryList,'store_category_id',info.cate_id), // 分类id
        is_used: info.is_used,
        unit_name: info.unit_name,
        sort: info.sort,
        once_max_count: info.once_max_count || 1,
        is_hot: info.is_hot,
        attr: info.attr,
        content: info.content,
        spec_type: Number(info.spec_type),
        type: info.type || 0,
      };
      if (this.formValidate.spec_type === 0) {
        this.OneattrValue = info.attrValue;
      } else {
        this.ManyAttrValue = info.attrValue;
        this.ManyAttrValue.forEach(val => {
          if (val.detail !== "undefined" && val.detail !== null) {
            this.attrInfo[
              Object.values(val.detail)
                .sort()
                .join("/")
            ] = val;
          }
        });
      }
      this.getAttr();
      this.fullscreenLoading = false;
    },
    handleRemove(i) {
      this.formValidate.slider_image.splice(i, 1);
    },
    // 点击商品图
    modalPicTap(tit, num, i) {
      const _this = this;
      const attr = [];
      this.$modalUpload(function(img) {
        if (tit === "1" && !num) {
          _this.formValidate.image = img[0];
          _this.OneattrValue[0].image = img[0];
        }
        if (tit === "2" && !num) {
          img.map(item => {
            attr.push(item.attachment_src);
            _this.formValidate.slider_image.push(item);
            if (_this.formValidate.slider_image.length > 10) {
              _this.formValidate.slider_image.length = 10;
            }
          });
        }
        if (tit === "1" && num === "dan") {
          _this.OneattrValue[0].image = img[0];
        }
        if (tit === "1" && num === "duo") {
          _this.ManyAttrValue[i].image = img[0];
        }
        if (tit === "1" && num === "pi") {
          _this.oneFormBatch[0].image = img[0];
        }
      }, tit);
    },
    handleSubmitUp() {
      this.currentTab = (Number(this.currentTab) - 1).toString();
    },
    handleSubmitNest(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.currentTab = (Number(this.currentTab) + 1).toString();
        }
      });
    },
    // 提交
    handleSubmit(name) {
      // this.$store.dispatch("settings/setEdit", false);
      if (this.formValidate.spec_type === 1) {
        this.formValidate.attrValue = this.ManyAttrValue;
      } else {
        this.formValidate.attrValue = this.OneattrValue;
        this.formValidate.attr = [];
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          this.fullscreenLoading = true;
          this.loading = true;
          let disCreate = this.$route.params.id && !this.$route.query.type;
          disCreate
            ? integralProUpdateApi(this.$route.params.id, this.formValidate)
                .then(async res => {
                  this.fullscreenLoading = false;
                  this.$message.success(res.message);
                  this.$refs[name].resetFields();
                  this.formValidate.slider_image = [];
                  this.$router.push({ path: this.roterPre + "/marketing/integral/proList" });
                 
                  this.loading = false;
                })
                .catch(res => {
                  this.fullscreenLoading = false;
                  this.loading = false;
                  this.$message.error(res.message);
                })
            : createIntegralProduct(this.formValidate)
                .then(async res => {
                  this.fullscreenLoading = false;
                  this.$message.success(res.message);
                  this.$refs[name].resetFields();
                  this.formValidate.slider_image = [];
                  this.$router.push({ path: this.roterPre + "/marketing/integral/proList" });
                  this.loading = false;
                })
                .catch(res => {
                  this.fullscreenLoading = false;
                  this.loading = false;
                  this.$message.error(res.message);
                });
        } else {
          if (!this.formValidate.store_name.trim()) {
            return this.$message.warning("商品名称不能为空");
          }
          if (!this.formValidate.unit_name) {
            return this.$message.warning("单位不能为空");
          }
          if (!this.formValidate.cate_id) {
            return this.$message.warning("商品分类不能为空");
          }
          if (!this.formValidate.image) {
            return this.$message.warning("商品封面图不能为空");
          }
          if (this.formValidate.slider_image.length < 0) {
            return this.$message.warning("商品轮播图不能为空");
          }
        }
      });
    },
    //预览
    handlePreview(name) {
      if (this.formValidate.spec_type === 1) {
        this.formValidate.attrValue = this.ManyAttrValue;
      } else {
        this.formValidate.attrValue = this.OneattrValue;
        this.formValidate.attr = [];
      }
      productPreviewApi(this.formValidate)
        .then(async res => {
          this.previewVisible = true;
          this.previewKey = res.data.preview_key;
        })
        .catch(res => {
          this.$message.error(res.message);
        });
    },
    // 表单验证
    validate(prop, status, error) {
      if (status === false) {
        this.$message.warning(error);
      }
    },
    // 规格图片验证
    specPicValidate(ManyAttrValue) {
      for (let i = 0; i < ManyAttrValue.length; i++) {
        if (ManyAttrValue[i].image === "" || !ManyAttrValue[i].image) {
          this.$message.warning("请上传商品规格图！");
          this.picValidate = false;
          break;
        }
      }
    },
    // 移动
    handleDragStart(e, item) {
      this.dragging = item;
    },
    handleDragEnd(e, item) {
      this.dragging = null;
    },
    handleDragOver(e) {
      e.dataTransfer.dropEffect = "move";
    },
    handleDragEnter(e, item) {
      e.dataTransfer.effectAllowed = "move";
      if (item === this.dragging) {
        return;
      }
      const newItems = [...this.formValidate.slider_image];
      const src = newItems.indexOf(this.dragging);
      const dst = newItems.indexOf(item);
      newItems.splice(dst, 0, ...newItems.splice(src, 1));
      this.formValidate.slider_image = newItems;
    },
    // 添加自定义弹窗
    addCustomDialog(editorId) {
      window.UE.registerUI(
        "test-dialog",
        function(editor, uiName) {
          // 创建 dialog
          let dialog = new window.UE.ui.Dialog({
            iframeUrl: roterPre + "/admin/widget/image?field=dialog",
            editor: editor,
            name: uiName,
            title: "上传图片",
            cssRules: "width:1200px;height:500px;padding:20px;"
          });
          this.dialog = dialog;
          let btn = new window.UE.ui.Button({
            name: "dialog-button",
            title: "上传图片",
            cssRules: `background-image: url(../../../assets/images/icons.png);background-position: -726px -77px;`,
            onclick: function() {
              // 渲染dialog
              dialog.render();
              dialog.open();
            }
          });
          return btn;
        },
        37
      );
      window.UE.registerUI(
        "video-dialog",
        function(editor, uiName) {
          let dialog = new window.UE.ui.Dialog({
            iframeUrl: roterPre + "/admin/widget/video?fodder=video",
            editor: editor,
            name: uiName,
            title: "上传视频",
            cssRules: "width:600px;height:420px;padding:10px 20px 20px;"
          });
          this.dialog = dialog;
          let btn = new window.UE.ui.Button({
            name: "video-button",
            title: "上传视频",
            cssRules: `background-image: url(../../../assets/images/icons.png);background-position: -320px -20px;`,
            onclick: function() {
              // 渲染dialog
              dialog.render();
              dialog.open();
            }
          });
          return btn;
        },
        38
      );
    }
  }
};
</script>
<style scoped lang="scss">
.bg {
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.goods_detail .goods_detail_wrapper {
  z-index: -10;
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
.proCoupon {
  /deep/ .el-form-item__content {
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
  /deep/ .el-form-item__content {
    margin-left: 10px !important;
  }
}
.tabNumWidth {
  /deep/ .el-input-number--medium {
    width: 100px;
  }
  /deep/.el-input__inner{
    padding: 0 0 0 15px;
  }
  /deep/ thead {
    line-height: normal !important;
  }
  /deep/.cell {
    line-height: normal !important;
    text-overflow: clip !important;
  }
}
.addfont {
  display: inline-block;
  font-size: 13px;
  font-weight: 400;
  color: #1890ff;
  margin-left: 14px;
  cursor: pointer;
}
.selectOn{
	color: #2d8cf0;
}	
.titTip {
  display: inline-bolck;
  font-size: 12px;
  font-weight: 400;
  color: #999999;
}
.addCustom_content {
  margin-top: 20px;
  .custom_box {
    margin-bottom: 10px;
  }
}
.addCustomBox {
  margin-top: 12px;
  font-size: 13px;
  font-weight: 400;
  color: #1890ff;
  .btn {
    cursor: pointer;
    width: max-content;
  }
  .remark {
    display: flex;
    margin-top: 14px;
  }
}
.selWidth {
  width: 50%;
}
.ml15 {
  margin-left: 15px;
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
.iview-video-style {
  width: 40%;
  height: 180px;
  border-radius: 10px;
  background-color: #707070;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
}
.iconv {
  color: #fff;
  line-height: 180px;
  display: inherit;
  font-size: 26px;
  position: absolute;
  top: -74px;
  left: 50%;
  margin-left: -25px;
}
.iview-video-style .mark {
  position: absolute;
  width: 100%;
  height: 30px;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
}
.uploadVideo {
  margin-left: 10px;
}
.perW50 {
  width: 50%;
}
.submission {
  margin-left: 10px;
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
  /deep/ .el-form-item__label {
    float: none !important;
    display: inline-block !important;
    margin-left: 120px !important;
    width: auto !important;
  }
}
</style>
