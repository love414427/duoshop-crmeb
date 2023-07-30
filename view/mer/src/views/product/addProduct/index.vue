<template>
  <div class="divBox">
    <el-card class="box-card">
      <div class="clearfix">
        <!-- <el-steps :active="currentTab" align-center finish-status="success">
          <el-step title="商品信息" />
          <el-step title="商品详情" />
          <el-step title="其他设置" />
          <el-step title="规格设置" />
        </el-steps> -->
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
        label-width="130px"
        @submit.native.prevent
      >
        <el-row v-if="currentTab == '1'" :gutter="24">
          <!-- 商品信息-->
          <el-col :span="24">
            <el-form-item label="商品类型：" required>
              <div
                v-for="(item, index) in virtual"
                :key="index"
                class="virtual"
                :class="
                  formValidate.type == item.id
                    ? 'virtual_boder'
                    : 'virtual_boder2'
                "
                @click="virtualbtn(item.id, 2)"
              >
                <div class="virtual_top">{{ item.tit }}</div>
                <div class="virtual_bottom">({{ item.tit2 }})</div>
                <div v-if="formValidate.type == item.id" class="virtual_san" />
                <div v-if="formValidate.type == item.id" class="virtual_dui">
                  ✓
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品名称：" prop="store_name">
              <el-input
                v-model="formValidate.store_name"
                placeholder="请输入商品名称"
                class="selWidth"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="平台商品分类：" prop="cate_id">
              <el-cascader
                v-model="formValidate.cate_id"
                class="selWidth"
                :options="categoryList"
                :props="props"
                @change="getSpecsLst"
                filterable
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商户商品分类：">
              <el-cascader
                v-model="formValidate.mer_cate_id"
                class="selWidth"
                :options="merCateList"
                :props="propsMer"
                filterable
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col v-if="labelList.length" :span="24">
            <el-form-item label="商品标签：">
              <el-select
                v-model="formValidate.mer_labels"
                multiple
                placeholder="请选择"
                class="selWidth"
              >
                <el-option
                  v-for="item in labelList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid2">
            <el-form-item label="品牌选择：">
              <el-select
                v-model="formValidate.brand_id"
                filterable
                placeholder="请选择"
                class="selWidth"
              >
                <el-option
                  v-for="item in BrandList"
                  :key="item.brand_id"
                  :label="item.brand_name"
                  :value="item.brand_id"
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
          <el-col :span="24">
            <el-form-item label="主图视频：" prop="video_link">
              <el-input
                v-model="videoLink"
                class="perW50"
                placeholder="请输入视频链接"
              />
              <input
                ref="refid"
                type="file"
                style="display:none"
                @change="zh_uploadFile_change"
              >
              <el-button
                type="primary"
                icon="ios-cloud-upload-outline"
                class="uploadVideo"
                @click="zh_uploadFile"
              >
                {{ videoLink ? "确认添加" : "上传视频" }}
              </el-button>
              <el-col :span="12">
                <el-progress
                  v-if="upload.videoIng"
                  :percentage="progress"
                  :text-inside="true"
                  :stroke-width="20"
                  style="margin-top: 10px;"
                />
              </el-col>
              <el-col :span="24">
                <div v-if="formValidate.video_link" class="iview-video-style">
                  <video
                    style="width:100%;height: 100%!important;border-radius: 10px;"
                    :src="formValidate.video_link"
                    controls="controls"
                  >
                    您的浏览器不支持 video 标签。
                  </video>
                  <div class="mark" />
                  <i class="el-icon-delete iconv" @click="delVideo" />
                </div>
              </el-col>
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

          <el-col :span="24">
            <el-form-item label="优惠券（赠送券）：" class="proCoupon">
              <div class="acea-row">
                <el-tag
                  v-for="(tag, index) in formValidate.couponData"
                  :key="index"
                  class="mr10"
                  closable
                  :disable-transitions="false"
                  @close="handleCloseCoupon(tag)"
                >{{ tag.title }}
                </el-tag>
                <el-button
                  class="mr15"
                  size="mini"
                  @click="addCoupon"
                >选择优惠券</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 规格设置 -->
        <el-row v-if="currentTab == '2'">
          <el-col :span="24">
            <el-form-item
              v-if="extensionStatus > 0"
              label="佣金设置："
              props="extension_type"
            >
              <el-radio-group
                v-model="formValidate.extension_type"
                @change="onChangetype(formValidate.extension_type)"
              >
                <el-radio :label="1" class="radio">单独设置</el-radio>
                <el-radio :label="0">默认设置</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              v-if="open_svip"
              label="付费会员价设置："
              props="svip_price_type"
            >
              <el-radio-group
                v-model="formValidate.svip_price_type"
                @change="onChangeSpecs(formValidate.svip_price_type)"
              >
                <el-radio :label="0" class="radio">不设置会员价</el-radio>
                <el-radio :label="1" class="radio">默认设置会员价</el-radio>
                <el-radio :label="2">自定义设置会员价</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
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
            <el-form-item label="选择规格：">
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
                  size="mini"
                  @click="confirm"
                >确认</el-button>
                <el-button
                  class="ml15"
                  size="small"
                  @click="addRule"
                >添加规格模板</el-button>
              </div>
            </el-form-item>
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
                    class="ml15"
                    size="small"
                    @click="createAttrName"
                  >确定</el-button>
                  <el-button @click="offAttrName" size="small">取消</el-button>
                </el-form-item>
              </el-col>
            </el-col>
            <el-form-item v-if="!isBtn">
              <el-button
                type="primary"
                icon="md-add"
                class="mr15"
                size="small"
                @click="addBtn"
              >添加新规格</el-button>
              <el-button
                type="success"
                icon="md-add"
                class="mr15"
                size="small"
                @click="generate"
              >立即生成</el-button>
            </el-form-item>
          </el-col>
          <!-- 批量设置-->
          <el-col
            v-if="(formValidate.spec_type === 1 && formValidate.attr.length > 0 && $route.params.id) || (!$route.params.id && createProduct && formValidate.spec_type === 1)"
            :span="24"
            class="noForm"
          >
          
            <el-form-item :label="'批量设置：'" class="labeltop">
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
                    <div v-if="formValidate.svip_price_type != 0">
                      <el-input
                        v-if="formThead[iii].title === '付费会员价'"
                        v-model="scope.row[iii]"
                        :disabled="formValidate.svip_price_type == 1"
                        class="priceBox"
                        controls-position="right"
                      />
                      <el-input
                        v-if="formThead[iii].title === '商品编号'"
                        v-model="scope.row[iii]"
                        type="text"
                        class="priceBox"
                      />
                      <el-input
                        v-if="
                          formThead[iii].title !== '付费会员价' &&
                          formThead[iii].title !== '商品编号' && 
                          formThead[iii].title !== '库存'
                        "
                        v-model="scope.row[iii]"
                        type="number"
                        min="0"
                        class="priceBox"
                        controls-position="right"
                        @blur="memberPrice(formThead[iii], scope.row)"
                      />
                      <el-input
                        v-if="formThead[iii].title === '库存' && formValidate.type == 2"
                        v-model="scope.row[iii]"
                        type="text"
                        class="priceBox"
                        disabled
                      />
                       <el-input
                        v-else-if="formThead[iii].title === '库存' && formValidate.type != 2"
                        v-model="scope.row[iii]"
                        type="text"
                        class="priceBox"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-if="formThead[iii].title === '商品编号'"
                        v-model="scope.row[iii]"
                        type="text"
                        class="priceBox"
                      />
                      <el-input
                        v-else-if="formThead[iii].title === '库存' && formValidate.type == 2"
                        v-model="scope.row[iii]"
                        type="text"
                        class="priceBox"
                        disabled
                      />
                      <el-input
                        v-else
                        v-model="scope.row[iii]"
                        type="number"
                        min="0"
                        class="priceBox"
                        controls-position="right"
                      />
                    </div> 
                  </template>
                </el-table-column>
                <template v-if="formValidate.type == 2">
                  <el-table-column
                    align="center"
                    label="卡密设置"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                      <el-button
                        v-if="scope.row.cdkey && !scope.row.cdkey.list && !scope.row.stock"
                        size="small"
                        @click="addVirtual(0, 'oneFormBatch')"
                        >添加卡密</el-button>
                      <span v-else class="seeCatMy" @click="seeVirtual(oneFormBatch[0], 'oneFormBatch', 0)">已设置</span>
                    </template>
                  </el-table-column> 
                </template>
                <template v-if="formValidate.extension_type === 1">
                  <el-table-column
                    align="center"
                    label="一级返佣(元)"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                      <el-input-number
                        v-model="scope.row.extension_one"
                        :min="0"
                        class="priceBox"
                        controls-position="right"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="二级返佣(元)"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                      <el-input-number
                        v-model="scope.row.extension_two"
                        :min="0"
                        class="priceBox"
                        controls-position="right"
                      />
                    </template>
                  </el-table-column>
                </template>
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
                  :label="formThead[iii] && formThead[iii].title"
                  align="center"
                  min-width="120"
                >
                  <template slot-scope="scope">
                    <div v-if="formValidate.svip_price_type != 0 && formThead[iii]">
                      <el-input-number
                        v-if="formThead[iii].title === '付费会员价'"
                        v-model="scope.row[iii]"
                        :min="0"
                        :disabled="formValidate.svip_price_type == 1"
                        class="priceBox"
                        controls-position="right"
                      />
                      <el-input
                        v-if="formThead[iii].title === '商品编号'"
                        v-model="scope.row[iii]"
                        type="text"
                        class="priceBox"
                      />
                      <el-input-number
                        v-if="
                          formThead[iii].title !== '付费会员价' &&
                          formThead[iii].title !== '商品编号' &&
                          formThead[iii].title !== '库存'
                        "
                        v-model="scope.row[iii]"
                        :min="0"
                        @blur="memberPrice(formThead[iii], scope.row)"
                        class="priceBox"
                        controls-position="right"
                      />  
                      <el-input
                      v-if="formThead[iii].title === '库存' && formValidate.type == 2"
                      v-model="scope.row[iii]"
                      type="text"
                      class="priceBox"
                      disabled
                    />
                    <el-input
                      v-else-if="formThead[iii].title === '库存' && formValidate.type !== 2"
                      v-model="scope.row[iii]"
                      type="text"
                      class="priceBox"
                    />
                    </div>
                 
                    <div v-else>
                      <el-input
                        v-if="formThead[iii].title === '商品编号'"
                        v-model="scope.row[iii]"
                        type="text"
                        class="priceBox"
                      />
                      <el-input-number
                        v-else
                        v-model="scope.row[iii]"
                        :min="0"
                        :disabled="formThead[iii].title === '库存' && formValidate.type == 2"
                        class="priceBox"
                        controls-position="right"
                      />
                    </div>
                  </template>
                </el-table-column>
                <template v-if="formValidate.type == 2">
                  <el-table-column
                    align="center"
                    label="卡密设置"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                       <el-button
                        v-if="scope.row.cdkey && !scope.row.cdkey.list && !scope.row.stock"
                        size="small"
                        @click="addVirtual(0, 'OneattrValue')"
                        >添加卡密</el-button>
                      <span v-else class="seeCatMy" @click="seeVirtual(OneattrValue[0], 'OneattrValue', 0)">已设置</span>
                    </template>
                  </el-table-column>
                </template>
                <template v-if="formValidate.extension_type === 1">
                  <el-table-column
                    align="center"
                    label="一级返佣(元)"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                      <el-input-number
                        v-model="scope.row.extension_one"
                        :min="0"
                        class="priceBox"
                        controls-position="right"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="二级返佣(元)"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                      <el-input-number
                        v-model="scope.row.extension_two"
                        :min="0"
                        class="priceBox"
                        controls-position="right"
                      />
                    </template>
                  </el-table-column>
                </template>
              </el-table>
            </el-form-item>
            <!-- 多规格表格-->
            <el-form-item
              v-if="(formValidate.spec_type === 1 && formValidate.attr.length > 0 && $route.params.id) || (!$route.params.id && createProduct && formValidate.spec_type === 1)"
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
                    <div v-if="formValidate.svip_price_type != 0 && formThead[iii]">
                      <el-input-number
                        v-if="formThead[iii].title === '付费会员价'"
                        v-model="scope.row[iii]"
                        :min="0"
                        :disabled="formValidate.svip_price_type == 1"
                        class="priceBox"
                        controls-position="right"
                      />
                      <el-input
                        v-if="formThead[iii].title === '商品编号'"
                        v-model="scope.row[iii]"
                        type="text"
                        class="priceBox"
                      />
                      <el-input-number
                        v-if="formThead[iii].title !== '付费会员价' &&
                          formThead[iii].title !== '商品编号' && 
                          formThead[iii].title !== '库存'"
                        v-model="scope.row[iii]"
                        :min="0"
                        @blur="memberPrice(formThead[iii], scope.row)"
                        class="priceBox"
                        controls-position="right"
                      />
                      <el-input
                        v-if="formThead[iii].title === '库存' && formValidate.type == 2"
                        v-model="scope.row[iii]"
                        type="text"
                        class="priceBox"
                        disabled
                      />
                      <el-input
                        v-else-if="formThead[iii].title === '库存' && formValidate.type != 2"
                        v-model="scope.row[iii]"
                        type="text"
                        class="priceBox"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-if="formThead[iii].title === '商品编号'"
                        v-model="scope.row[iii]"
                        type="text"
                        class="priceBox"
                      />
                      <el-input
                        v-else-if="formThead[iii].title === '库存' && formValidate.type == 2"
                        v-model="scope.row[iii]"
                        type="text"
                        class="priceBox"
                        disabled
                      />
                      <el-input-number
                        v-else
                        v-model="scope.row[iii]"
                        :min="0"
                        class="priceBox"
                        controls-position="right"
                      />
                    </div>
                  </template>
                </el-table-column>
                <template v-if="formValidate.type == 2">
                  <el-table-column
                    align="center"
                    label="卡密设置"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                       <el-button
                        v-if="!scope.row.cdkey || (scope.row.cdkey && !scope.row.cdkey.list && !scope.row.stock)"
                        size="small"
                        @click="addVirtual(scope.$index, 'ManyAttrValue')"
                        >添加卡密</el-button>
                      <span v-else class="seeCatMy" @click="seeVirtual(ManyAttrValue[scope.$index], 'ManyAttrValue', scope.$index)">已设置</span>
                    </template>
                  </el-table-column>
                </template>
                <template v-if="formValidate.extension_type === 1">
                  <el-table-column
                    key="1"
                    align="center"
                    label="一级返佣(元)"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                      <el-input-number
                        v-model="scope.row.extension_one"
                        :min="0"
                        class="priceBox"
                        controls-position="right"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    key="2"
                    align="center"
                    label="二级返佣(元)"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                      <el-input-number
                        v-model="scope.row.extension_two"
                        :min="0"
                        class="priceBox"
                        controls-position="right"
                      />
                    </template>
                  </el-table-column>
                </template>
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
        <!-- 营销设置-->
        <el-row v-if="currentTab == '4'">
          <el-col :span="24">
            <el-form-item label="商品推荐：">
              <el-checkbox-group
                v-model="checkboxGroup"
                size="small"
                @change="onChangeGroup"
              >
                <el-checkbox
                  v-for="(item, index) in recommend"
                  :key="index"
                  :label="item.value"
                >
                  {{ item.name }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item v-if="deductionStatus > 0" label="积分抵扣比例：">
              <el-radio-group
                v-model="deduction_set"
                @change="changeIntergral(deduction_set)"
              >
                <el-radio :label="1" class="radio">单独设置</el-radio>
                <el-radio :label="-1">默认设置</el-radio>
              </el-radio-group>
              <div v-if="deduction_set == 1">
                <el-input-number
                  v-model="formValidate.integral_rate"
                  :min="0"
                  controls-position="right"
                  placeholder="请输入抵扣比例"
                />
                %
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否开启礼包：">
              <el-radio-group
                v-model="formValidate.is_gift_bag"
                :disabled="$route.params.id ? true : false"
              >
                <el-radio :label="0" class="radio">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注：">
              <div>1. 选择开启礼包后，不可修改</div>
              <div>
                2.
                用户购买该分销礼包商品后，可自动成为分销员（即已成为分销员的用户在移动端看不到该分销礼包商品）
              </div>
              <div>
                3.
                该商品设置为分销礼包后会展示在平台后台的【分销】-【分销礼包】（即不会展示在平台后台-【商品列表】）
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 其它设置 -->
        <el-row v-if="currentTab == '5'">
          <el-col>
            <el-form-item label="支持退款：">
              <el-switch
                v-model="formValidate.refund_switch"
                :active-value="1"
                :inactive-value="0"
                active-text="开启"
                inactive-text="关闭"
              />
            </el-form-item> 
          </el-col>
          <el-col v-if="deliveryList.length > 0" :span="24">
            <el-form-item label="送货方式：" prop="delivery_way">
              <div class="acea-row">
                <el-checkbox-group v-model="formValidate.delivery_way">
                  <el-checkbox
                    v-for="item in deliveryList"
                    :key="item.value"
                    :label="item.value"
                  >
                    {{ item.name }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
          </el-col>
          <el-col
            v-if="
              (formValidate.delivery_way.length == 2 ||
                (formValidate.delivery_way.length == 1 &&
                formValidate.delivery_way[0] == 2)) &&
                formValidate.type == 0
            "
            :span="24"
          >
            <el-form-item label="是否包邮：">
              <el-radio-group v-model="formValidate.delivery_free">
                <el-radio :label="0" class="radio">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col
            v-if="
              formValidate.delivery_free == 0 &&
                (formValidate.delivery_way.length == 2 ||
                (formValidate.delivery_way.length == 1 &&
                formValidate.delivery_way[0] == 2)) &&
                formValidate.type == 0
            "
            :span="24"
          >
            <el-form-item label="运费模板：" prop="temp_id">
              <div class="acea-row">
                <el-select
                  v-model="formValidate.temp_id"
                  placeholder="请选择"
                  class="selWidth"
                >
                  <el-option
                    v-for="item in shippingList"
                    :key="item.shipping_template_id"
                    :label="item.name"
                    :value="item.shipping_template_id"
                  />
                </el-select>
                <el-button
                  class="ml15"
                  size="small"
                  @click="addTem"
                >添加运费模板</el-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-col>
              <el-form-item label="最少购买件数：">
                <el-input-number
                  v-model="formValidate.once_min_count"
                  :min="0"
                  controls-position="right"
                  placeholder="请输入购买件数"
                />
                &nbsp;&nbsp;默认为0，则不限制购买件数
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-form-item label="限购类型：">
              <el-radio-group v-model="formValidate.pay_limit">
                <el-radio :label="0" class="radio">不限购</el-radio>
                <el-radio :label="1">单次限购</el-radio>
                <el-radio :label="2">长期限购</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-if="formValidate.pay_limit != 0" :span="24">
            <el-col>
              <el-form-item label="限购数量" prop="once_max_count">
                <el-input-number
                  v-model="formValidate.once_max_count"
                  :min="formValidate.once_min_count"
                  controls-position="right"
                  placeholder="请输入购买件数"
                />
                &nbsp;&nbsp;单次限购是限制每次下单最多购买的数量，长期限购是限制一个用户总共可以购买的数量
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col v-bind="grid">
              <el-form-item label="排序：">
                <el-input-number
                  v-model="formValidate.sort"
                  controls-position="right"
                  placeholder="请输入排序"
                />
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-form-item label="平台保障服务：">
              <div class="acea-row">
                <el-select
                  v-model="formValidate.guarantee_template_id"
                  placeholder="请选择"
                  clearable
                  class="selWidth"
                >
                  <el-option
                    v-for="item in guaranteeList"
                    :key="item.guarantee_template_id"
                    :label="item.template_name"
                    :value="item.guarantee_template_id"
                  />
                </el-select>
                <el-button
                  class="ml15"
                  size="small"
                  @click="addServiceTem"
                >添加服务说明模板</el-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="平台商品参数：">
              <el-cascader
                v-model="formValidate.param_temp_id"
                class="selWidth"
                :options="sysSpecsSelect"
                :props="propsMer"
                filterable
                clearable
                @change="getSpecsList"
              />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item>
              <el-table
                border
                ref="tableParameter"
                :data="formValidate.params"
                row-key="parameter_value_id"
                header-row-class-name="head-table"
              >
                <el-table-column
                  align="center"
                  label="参数名称"
                  min-width="120"
                >
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.name"
                      :disabled="scope.row.mer_id == 0"
                      placeholder="请输入参数名称"
                      class="priceBox"
                    />
                  </template>
                </el-table-column>
                <el-table-column align="center" label="参数值" min-width="120">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.value"
                      :min="0"
                      placeholder="请输入参数值"
                      class="priceBox"
                    />
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" min-width="60">
                  <template slot-scope="scope">
                    <el-button
                      v-if="scope.row.mer_id != 0"
                      type="text"
                      class="submission"
                      @click.native.prevent="delSpecs(scope.$index)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button
                type="defalut"
                size="small"
                class="mt20"
                @click="addSpecs"
              >添加参数</el-button>
              <el-select
                v-model="customSpecs"
                multiple
                placeholder="添加自定义参数模板"
                @change="getSpecsList"
                class="selWidth"
              >
                <el-option
                  v-for="item in merSpecsSelect"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"  
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="formValidate.type == 1" :span="24">
            <el-form-item label="自定义留言：">
              <el-radio-group v-model="customBtn" @change="customMessBtn">
                <el-radio :label="0">关闭</el-radio>
                <el-radio :label="1">开启</el-radio>
              </el-radio-group>
              <div v-if="customBtn" class="addCustom_content">
                <div
                  v-for="(item, index) in formValidate.extend"
                  :key="index"
                  type="flex"
                  class="custom_box"
                >
                  <el-input
                    v-model.trim="item.title"
                    :placeholder="'留言标题' + (index + 1)"
                    style="width: 100px; margin-right: 10px"
                  />
                  <el-select
                    v-model="item.key"
                    style="width: 200px; margin-left: 6px; margin-right: 10px"
                  >
                    <el-option
                      v-for="items in CustomList"
                      :key="items.value"
                      :value="items.value"
                      :label="items.label"
                    >{{ items.label }}
                    </el-option>
                  </el-select>
                  <el-checkbox v-model="item.require">必填</el-checkbox>
                  <div
                    v-if="formValidate.extend.length - 1"
                    class="addfont"
                    @click="delcustom(index)"
                  >
                    删除
                  </div>
                </div>
              </div>
              <div v-show="customBtn" class="addCustomBox">
                <div class="btn" @click="addcustom">+ 添加表单</div>
                <div class="remark">
                  <div>备注：</div>
                  <div>
                    <div class="titTip">
                      1.用户下单时需填写的信息，最多可设置10条
                    </div>
                    <div class="titTip">
                      2.虚拟物品不可加入购物车，用户可直接购买
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="margin-top:30px;">
          <el-button
            v-show="currentTab > 1"
            type="primary"
            class="submission"
            size="small"
            @click="handleSubmitUp"
          >上一步
          </el-button>
          <el-button
            v-show="currentTab < 5"
            type="primary"
            class="submission"
            size="small"
            @click="handleSubmitNest('formValidate')"
          >下一步
          </el-button>
          <el-button
            v-show="currentTab == '5' || $route.params.id"
            :loading="loading"
            type="primary"
            class="submission"
            size="small"
            @click="handleSubmit('formValidate')"
          >提交
          </el-button>
          <el-button
            :loading="loading"
            type="primary"
            class="submission"
            size="small"
            @click="handlePreview('formValidate')"
          >预览
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!--属性选择弹窗-->
    <el-dialog v-if="attrShow" :visible.sync="attrShow" title="请选择商品规格" width="320px">
      <attr-list :attrs="attrsList" @activeData="activeAttr" @close="labelAttr" @subAttrs="subAttrs" v-if="attrShow"></attr-list>
    </el-dialog>
    <!--添加服务保障模板-->
    <guarantee-service ref="serviceGuarantee" @get-list="getGuaranteeList" />
    <!--预览商品-->
    <div v-if="previewVisible">
      <div class="bg" @click.stop="previewVisible = false" />
      <preview-box
        v-if="previewVisible"
        ref="previewBox"
        :preview-key="previewKey"
      />
    </div>
    <!-- 生成淘宝京东表单-->
    <tao-bao ref="taoBao" @info-data="infoData" />
    <!--添加卡密-->
		<add-carMy ref="addCarMy" :virtualList="virtualList" @changeVirtual="changeVirtual" @fixdBtn="fixdBtn" @closeCarMy="closeCarMy"></add-carMy>
		
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
  shippingListApi,
  templateLsitApi,
  productCreateApi,
  productDetailApi,
  categorySelectApi,
  categoryListApi,
  categoryBrandListApi,
  productUpdateApi,
  productConfigApi,
  productGetTempKeysApi,
  guaranteeListApi,
  productPreviewApi,
  getProductLabelApi,
  specsSelectedApi,
  productSpecsDetailApi,
  generateAttrApi,
  uploadVideoOfLocal
} from '@/api/product'
import { roterPre } from '@/settings'
import guaranteeService from '@/components/serviceGuarantee/index'
import previewBox from '@/components/previewBox/index'
import attrList from "@/components/attrList";
import SettingMer from '@/libs/settingMer'
import { getToken } from '@/utils/auth'
import taoBao from './taoBao'
import copyRecord from './copyRecord'
import addCarMy from "./addCarMy";

const defaultObj = {
  image: '',
  slider_image: [],
  store_name: '',
  store_info: '',
  keyword: '',
  brand_id: '', // 品牌id
  cate_id: '', // 平台分类id
  mer_cate_id: [], // 商户分类id
  param_temp_id: [],
  unit_name: '',
  sort: 0,
  once_max_count: 0,
  is_good: 0,
  temp_id: '',
  video_link: '',
  guarantee_template_id: '',
  delivery_way: [],
  mer_labels: [],
  delivery_free: 0,
  pay_limit: 0,
  once_min_count: 0,
  svip_price_type: 0,
  params: [],
  attrValue: [
    {
      image: '',
      price: null,
      cost: null,
      ot_price: null,
      svip_price: null,
      select: false,
      stock: null,
      cdkey: {},
      bar_code: '',
      weight: null,
      volume: null
    }
  ],
  attr: [],
  extension_type: 0,
  integral_rate: -1,
  content: '',
  spec_type: 0,
  give_coupon_ids: [],
  is_gift_bag: 0,
  couponData: [],
  extend: [], // 自定义留言
  type: 0,
  product_type: 0
}
const objTitle = {
  price: {
    title: '售价'
  },
  cost: {
    title: '成本价'
  },
  ot_price: {
    title: '市场价'
  },
  svip_price: {
    title: '付费会员价'
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
const proOptions = [{ name: '店铺推荐', value: 'is_good' }]
export default {
  name: 'ProductProductAdd',
  components: {
    ueditorFrom,
    VueUeditorWrap,
    guaranteeService,
    previewBox,
    attrList,
    taoBao,
    copyRecord,
    addCarMy
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
      props: { emitPath: false },
      propsMer: { emitPath: true },
      active: 0,
      deduction_set: -1,
      OneattrValue: [Object.assign({}, defaultObj.attrValue[0])], // 单规格
      ManyAttrValue: [Object.assign({}, defaultObj.attrValue[0])], // 多规格
      ruleList: [],
      merCateList: [], // 商户分类筛选
      categoryList: [], // 平台分类筛选
      shippingList: [], // 运费模板
      guaranteeList: [], // 服务保障模板
      BrandList: [], // 品牌
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
      isChoice: '',
      upload: {
        videoIng: false // 是否显示进度条；
      },
      progress: 10, // 进度条默认0
      videoLink: '',
      grid: {
        xl: 8,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      },
      loading: false,
      ruleValidate: {
        give_coupon_ids: [
          {
            required: true,
            message: '请选择优惠券',
            trigger: 'change',
            type: 'array'
          }
        ],
        store_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        cate_id: [
          { required: true, message: '请选择平台分类', trigger: 'change' }
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
      keyNum: 0,
      extensionStatus: 0,
      deductionStatus: 0,
      previewVisible: false,
      previewKey: '',
      deliveryType: [],
      virtual: [
        { tit: '普通商品', id: 0, tit2: '物流发货' },
        { tit: '虚拟商品', id: 1, tit2: '虚拟发货' },
        { tit: '卡密/网盘', id: 2, tit2: '自动发货' }
      ],
      customBtn: 0, // 自定义留言开关
      // 自定义留言下拉选择
      CustomList: [
        {
          value: 'text',
          label: '文本框'
        },
        {
          value: 'number',
          label: '数字'
        },
        {
          value: 'email',
          label: '邮件'
        },
        {
          value: 'date',
          label: '日期'
        },
        {
          value: 'time',
          label: '时间'
        },
        {
          value: 'idCard',
          label: '身份证'
        },
        {
          value: 'mobile',
          label: '手机号'
        },
        {
          value: 'image',
          label: '图片'
        }
      ],
      customess: {
        content: []
      }, // 自定义留言内容
      headTab: [
        { title: '商品信息', name: '1' },
        { title: '规格设置', name: '2' },
        { title: '商品详情', name: '3' },
        { title: '营销设置', name: '4' },
        { title: '其他设置', name: '5' }
      ],
      type: 0,
      modals: false,
      attrVal: {
        price: null,
        cost: null,
        ot_price: null,
        stock: null,
        bar_code: '',
        weight: null,
        volume: null
      },
      open_svip: false,
      svip_rate: 0,
      customSpecs: [],
      merSpecsSelect: [],
      sysSpecsSelect: [],
      attrs: [],
      attrsList:[],
			activeAtter:[],
      attrShow: false,
      isGenerate: false,
      createProduct: false,
      generateArr: [],
      addGenerate: false,
      createCount: this.$route.params.id ? 0 : -10,
      virtualList:[],
		  carMyShow: false,//是否开启卡密弹窗
      tabIndex: 0,
			tabName: "",
       oneFormBatch: [
        {
          attr:"全部",
		      image: "",
          price: "",
          cost: "",
          ot_price: "",
          svip_price: "",
          stock: "",
          cdkey: {},
		      code: "",
          weight: "",
          volume: "",
        },
      ],
      headerCarMy:{
        title: "卡密设置",
        slot: "fictitious",
        align: "center",
        width: 95,
      },
    }
  },
  computed: {
    attrValue() {
      const obj = Object.assign({}, this.attrVal)
      return obj
    },
    // oneFormBatch() {
    //   const obj = [Object.assign({}, defaultObj.attrValue[0])]
    //   if (this.OneattrValue[0] && this.OneattrValue[0]['image']) { obj[0]['image'] = this.OneattrValue[0]['image'] }
    //   obj[0]['attr'] = '全部'
    //   delete obj[0].bar_code
    //   return obj
    // }
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
    currentTab(newVal) {
      if (newVal == 5) {
        this.$nextTick(e=>{
          this.setSort()
        })
      }
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
      this.getInfo()
    } else {
      this.getSpecsLst(this.formValidate.cate_id)
      this.productCon()
      if (this.deduction_set == -1) this.formValidate.integral_rate = -1
    }
    this.formValidate.attr.map(item => {
      this.$set(item, 'inputVisible', false)
    })
    if (this.$route.query.type == 1) {
      this.type = this.$route.query.type
      this.$refs.taoBao.modals = true
    } else {
      this.type = 0
    }
    this.getCategorySelect()
    this.getCategoryList()
    this.getBrandListApi()
    this.getShippingList()
    this.getGuaranteeList()
    
    this.productGetRule()
    this.getLabelLst()
    this.$store.dispatch('settings/setEdit', true)
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
    handleCloseCoupon(tag) {
      this.formValidate.couponData.splice(
        this.formValidate.couponData.indexOf(tag),
        1
      )
      this.formValidate.give_coupon_ids = []
      this.formValidate.couponData.map(item => {
        this.formValidate.give_coupon_ids.push(item.coupon_id)
      })
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
			  // j.select = false;
        this.$set(j,'select',false)
			  if(newData.length){
				 newData.forEach(item=> {
            if(j.sku.split('').length == item.split('').length){
              if(j.sku == item){
                this.$set(j,'select',true)
                // j.select = true;
              }
            }else{
              if(j.sku == item){
                // j.select = true;
                this.$set(j,'select',true)
              }
            }
          })
			  }else{
				  // j.select = true;
          this.$set(j,'select',true)
			  }
		  })
      this.$nextTick(function(){
        this.$set(this,'ManyAttrValue',manyAttr)
      })
	  },
    // 参数模板
    getSpecsLst(id) {
      let cate_id = id ? id : this.formValidate.cate_id
      specsSelectedApi({ cate_id: cate_id })
        .then(res => {
          this.merSpecsSelect = res.data.mer
          this.sysSpecsSelect = res.data.sys
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    productCon() {
      productConfigApi()
        .then(res => {
          this.extensionStatus = res.data.extension_status
          this.deductionStatus = res.data.integral_status
          this.deliveryType = res.data.delivery_way.map(String)
          this.open_svip =
            res.data.mer_svip_status == 1 && res.data.svip_switch_status == 1
          this.svip_rate = res.data.svip_store_rate
          const name = this.formValidate.type == 0 ? '快递配送' : '虚拟发货'
          if (!this.$route.params.id) { this.formValidate.delivery_way = this.deliveryType }
          if (this.deliveryType.length == 2) {
            if(this.formValidate.type == 2){
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
            if (this.deliveryType.length == 1 && this.deliveryType[0] == '1' && this.formValidate.type != 2) {
              this.deliveryList = [{ value: '1', name: '到店自提' }]
            } else {
              this.deliveryList = [{ value: '2', name: name }]
              this.formValidate.delivery_way = ['2']
            }
          }
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 获取标签项
    getLabelLst() {
      getProductLabelApi()
        .then(res => {
          this.labelList = res.data
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    addCoupon() {
      const _this = this
      this.$modalCoupon(
        this.formValidate.couponData,
        'wu',
        _this.formValidate.give_coupon_ids,
        (this.keyNum += 1),
        function(row) {
          _this.formValidate.give_coupon_ids = []
          _this.formValidate.couponData = row
          row.map(item => {
            _this.formValidate.give_coupon_ids.push(item.coupon_id)
          })
        }
      )
    },
    delSpecs(index) {
      this.formValidate.params.splice(index, 1)
    },
    addSpecs() {
      this.formValidate.params.push({ name: '', value: '', sort: 0 })
    },
    // 参数模板详情
    getSpecsList() {
      let merParams = [...this.customSpecs],sysParams = [...[this.formValidate.param_temp_id]]
      let params = [...merParams,...sysParams]
      if (params.length <= 0) {
        this.formValidate.merParams = []
        this.formValidate.sysParams = []
      } else {
        productSpecsDetailApi({
          template_ids: params.toString()
        })
          .then(res => {
            this.formValidate.params = res.data
          })
          .catch(res => {
            this.$message.error(res.message)
          })
      }
    },
     //添加倒入卡密的值
	  changeVirtual(e){
		  this.virtualList = this.virtualList.concat(e);
	  },
	  //添加卡密
	  addVirtual(index, name) {
      this.$refs.addCarMy.carMyShow = true;	
	    this.tabIndex = index;
	    this.tabName = name;
      this.virtualListClear();
      this.$refs.addCarMy.fixedCar = {
        is_type: 0,
        key:'',
        stock:0
      }
	  },
	  //确认提交卡密
	  fixdBtn(e){
		  if(e.is_type == 0){
			  this.$set(this[this.tabName][this.tabIndex]['cdkey'],"key",e.key);
			  this.$set(this[this.tabName][this.tabIndex],"stock",Number(e.stock));
			  this[this.tabName][this.tabIndex]['cdkey'].list = [];
		  }else{
			  this.$set(this[this.tabName][this.tabIndex]['cdkey'],"list",e.list);
			  this.$set(this[this.tabName][this.tabIndex],"stock",e.list.length);
			  this[this.tabName][this.tabIndex]['cdkey'].key = '';
		  }
      this.$set(this[this.tabName][this.tabIndex]['cdkey'],"is_type",e.is_type);
		  this.$refs.addCarMy.carMyShow = false;	
	  },
	  closeCarMy(){
		  this.$refs.addCarMy.carMyShow = false;	
	  },
	  //清空卡密
	  virtualListClear(){
		  this.virtualList = [
		    {
          is_type: 0,
		      key: "",
		      stock: "",
		    },
		  ];
	  },
	  seeVirtual(data, name, index) {
	    this.tabName = name;
      this.tabIndex = index;
      this.virtualListClear();
      this.$refs.addCarMy.fixedCar = {
        is_type: 0,
        key:'',
        stock:0
      }	
	    if (data.cdkey && data.cdkey.list && data.cdkey.list.length && data.cdkey.is_type == 1) {
		    this.$refs.addCarMy.fixedCar.is_type = 1;
	      this.virtualList = data.cdkey.list;
	    } else if (data.cdkey && data.cdkey.key) {
	      this.$refs.addCarMy.fixedCar.is_type = 0;
	      this.$refs.addCarMy.fixedCar.key = data.cdkey.key;
	      this.$refs.addCarMy.fixedCar.stock = data.stock;
	    }
	    this.$refs.addCarMy.carMyShow = true;
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
    watCh(val) {
      const tmp = {}
      const tmpTab = {}
      this.formValidate.attr.forEach((o, i) => {
        tmp['value' + i] = { title: o.value }
        tmpTab['value' + i] = ''
      })
      if(this.isGenerate || this.createCount == 1){
        this.ManyAttrValue = this.attrFormat(val)
        this.manyTabTit = tmp
        this.manyTabDate = tmpTab
        this.formThead = Object.assign({}, this.formThead, tmp)
      }
      this.isGenerate = false
      this.addGenerate = false
    },
    attrFormat(arr) {
      let data = [],that = this;
      let res = []
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
                      sku: "",
                      stock: 0,
                      cdkey: {},
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
                cdkey: {},
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
            res[i]['image'] = v.image
            res[i]['price'] = v.price
            res[i]['cost'] = v.cost
            res[i]['ot_price'] = v.ot_price
            res[i]['sku'] = v.sku
            res[i]['stock'] = v.stock
            res[i]['bar_code'] = v.bar_code
            res[i]['volume'] = v.volume
            res[i]['brokerage'] = v.brokerage
            res[i]['brokerage_two'] = v.brokerage_two
            res[i]['cdkey'] = v.cdkey&&v.cdkey.length&&v.cdkey[0] || null
            res[i]['svip_price'] = v.svip_price || ""
          })
        }
        return res
      }
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
    // 删除视频；
    delVideo() {
      const that = this
      that.$set(that.formValidate, 'video_link', '')
    },
    zh_uploadFile() {
      if (this.videoLink) {
        this.formValidate.video_link = this.videoLink
      } else {
        this.$refs.refid.click()
      }
    },
    zh_uploadFile_change(evfile) {
      const that = this
      that.progress = 10
      const suffix = evfile.target.files[0].name.substr(
        evfile.target.files[0].name.indexOf('.')
      )
      if (suffix !== '.mp4') {
        return that.$message.error('只能上传MP4文件')
      }
      productGetTempKeysApi().then(res => {
        that.$videoCloud
        .videoUpload({
          type: res.data.type,
          evfile: evfile,
          res: res,
          uploading(status, progress) {
            that.upload.videoIng = status
          }
        })
        .then(res => {
          that.formValidate.video_link = res.url || res.data.src
          that.$message.success('视频上传成功')
          that.progress = 100
        })
        .catch(res => {
          that.upload.videoIng = false
          that.$message.error(res.msg&&res.msg.message || res.message)
        })
      })
    },
    // 添加规则；
    addRule() {
      const _this = this
      this.$modalAttr(this.formDynamics, function() {
        _this.productGetRule()
      })
    },
    // 选择规格
    onChangeSpec(num) {
      if (num === 1) this.productGetRule()
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
    // 商户分类；
    getCategorySelect() {
      categorySelectApi()
        .then(res => {
          this.merCateList = res.data
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 平台分类；
    getCategoryList() {
      categoryListApi()
        .then(res => {
          this.categoryList = res.data
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    // 品牌筛选；
    getBrandListApi() {
      categoryBrandListApi()
        .then(res => {
          this.BrandList = res.data
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
    // 运费模板；
    getShippingList() {
      shippingListApi().then(res => {
        this.shippingList = res.data
      })
    },
    // 获取服务保障模板
    getGuaranteeList() {
      guaranteeListApi().then(res => {
        this.guaranteeList = res.data
      })
    },
    showInput(item) {
      this.$set(item, 'inputVisible', true)
    },
    virtualbtn(id, type) {
      if (this.$route.params.id) {
        return this.$message.warning('商品类型不能切换!')
      }
      this.formValidate.type = id
      this.productCon()
    },
    customMessBtn(e) {
      if (!e) {
        this.formValidate.extend = []
      }
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
    delcustom(index) {
      this.formValidate.extend.splice(index, 1)
    },
    onChangetype(item) {
      if (item === 1) {
        this.OneattrValue.map(item => {
          this.$set(item, 'extension_one', null)
          this.$set(item, 'extension_two', null)
        })
        this.ManyAttrValue.map(item => {
          this.$set(item, 'extension_one', null)
          this.$set(item, 'extension_two', null)
        })
      } else {
        this.OneattrValue.map(item => {
          delete item.extension_one
          delete item.extension_two
          this.$set(item, 'extension_one', null)
          this.$set(item, 'extension_two', null)
        })
        this.ManyAttrValue.map(item => {
          delete item.extension_one
          delete item.extension_two
        })
      }
    },
    onChangeSpecs(item) {
      if (item == 1 || item == 2) {
         this.formThead.svip_price = { title: "付费会员价" }
         this.attrVal = {
          price: null,
          cost: null,
          ot_price: null,
          svip_price: null,
          stock: null,
          bar_code: '',
          weight: null,
          volume: null
        }
        // if(this.formValidate.type == 2)this.attrVal.cdkey = {}
        this.OneattrValue[0]['svip_price'] = this.OneattrValue[0]['price']
          ? this.accMul(this.OneattrValue[0]['price'], this.svip_rate)
          : 0
        let price = 0
        for (const val of this.ManyAttrValue) {
          price = val.price ? this.accMul(val.price, this.svip_rate) : 0
          this.$set(val, 'svip_price', price)
        }
      } else {
        delete this.formThead.svip_price
        this.attrVal = {
          price: null,
          cost: null,
          ot_price: null,
          stock: null,
          bar_code: '',
          weight: null,
          volume: null
        }
      }
    },
    memberPrice(formHead, row) {
      if (formHead.title == '售价') {
        row.svip_price = this.accMul(row.price, this.svip_rate)
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
          if(this.oneFormBatch[0].attr!= '')this.$set(val, 'attr', this.oneFormBatch[0].attr)
          if(this.oneFormBatch[0].image!= '')this.$set(val, 'image', this.oneFormBatch[0].image)
          if(this.oneFormBatch[0].price!= null && this.oneFormBatch[0].price!= '')this.$set(val, 'price',  this.oneFormBatch[0].price)
          if(this.oneFormBatch[0].cost!= null && this.oneFormBatch[0].cost!= '')this.$set(val, 'cost', this.oneFormBatch[0].cost)
          if(this.oneFormBatch[0].ot_price!= null && this.oneFormBatch[0].ot_price!= '')this.$set(val, 'ot_price', this.oneFormBatch[0].ot_price)
          if(this.oneFormBatch[0].svip_price!= null && this.oneFormBatch[0].svip_price!= '')this.$set(val, 'svip_price', this.oneFormBatch[0].svip_price)
          if(this.oneFormBatch[0].stock!= null && this.oneFormBatch[0].stock!= '')this.$set(val, 'stock', this.oneFormBatch[0].stock)
          if(this.oneFormBatch[0].bar_code!= null && this.oneFormBatch[0].bar_code!= '')this.$set(val, 'bar_code', this.oneFormBatch[0].bar_code)
          if(this.oneFormBatch[0].weight!= null && this.oneFormBatch[0].weight!= '')this.$set(val, 'weight', this.oneFormBatch[0].weight)
          if(this.oneFormBatch[0].volume!= null && this.oneFormBatch[0].volume!= '')this.$set(val, 'volume', this.oneFormBatch[0].volume)
          if(this.oneFormBatch[0].extension_one!= null && this.oneFormBatch[0].extension_one!= '')this.$set(val, 'extension_one', this.oneFormBatch[0].extension_one)
          if(this.oneFormBatch[0].extension_two!= null && this.oneFormBatch[0].extension_two!= '')this.$set(val, 'extension_two', this.oneFormBatch[0].extension_two)
          if(this.formValidate.type == 2){
            val.cdkey = {}
            if(this.oneFormBatch[0]['cdkey'].is_type == 1){
              if(this.oneFormBatch[0]['cdkey'].list && this.oneFormBatch[0]['cdkey'].list.length){
                this.$set(val.cdkey, "list", this.oneFormBatch[0]['cdkey'].list);
                this.$set(val, "stock", this.oneFormBatch[0]['cdkey'].list.length);
              }
            }else if(this.oneFormBatch[0]['cdkey'].key){
              this.$set(val.cdkey, "key", this.oneFormBatch[0]['cdkey'].key);
            }
            this.$set(val.cdkey, "is_type",this.oneFormBatch[0]['cdkey'].is_type); 
			    }
        }
      }
    },
    // 添加按钮
    addBtn() {
      this.clearAttr()
      this.isBtn = true
      this.addGenerate = true
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
      this.attrs = this.formValidate.attr;
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
          if (!this.$route.params.id && this.formValidate.spec_type === 1) { 
            this.ManyAttrValue.map((item) => {
              item.image = this.formValidate.slider_image[0];
              this.$set(item, 'select', true)
            });
            this.oneFormBatch[0].pic = this.formValidate.slider_image[0];
          }
					this.getAttr();
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 详情
    getInfo() {
      this.fullscreenLoading = true;
      productDetailApi(this.$route.params.id)
        .then(async res => {
          let info = res.data;
          this.infoData(info);
          this.getSpecsLst(info.cate_id);
          this.productCon();
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
        // val.select = true;
        this.$set(val,'select', true)
      });
      this.formValidate = {
        product_type: info.product_type || 0,
        is_copy: info.is_copy,
        image: info.image,
        attrValue: info.attrValue,
        slider_image: info.slider_image,
        store_name: info.store_name,
        store_info: info.store_info,
        keyword: info.keyword,
        params: info.params,
        param_temp_id: info.param_temp_id,
        brand_id: info.brand_id, // 品牌id
        cate_id: info.cate_id, // 平台分类id
        mer_cate_id: info.mer_cate_id || [], // 商户分类id
        unit_name: info.unit_name,
        sort: info.sort,
        once_max_count: info.once_max_count || 1,
        once_min_count: info.once_min_count || 0,
        is_good: info.is_good,
        temp_id: info.temp_id,
        guarantee_template_id: info.guarantee_template_id
          ? info.guarantee_template_id
          : "",
        attr: info.attr,
        pay_limit: info.pay_limit || 0,
        refund_switch: info.refund_switch,
        extension_type: info.extension_type,
        content: info.content,
        spec_type: Number(info.spec_type),
        give_coupon_ids: info.give_coupon_ids,
        is_gift_bag: info.is_gift_bag,
        couponData: info.coupon,
        video_link: info.video_link ? info.video_link : "",
        integral_rate: info.integral_rate,
        delivery_way:
          info.delivery_way && info.delivery_way.length
            ? info.delivery_way.map(String)
            : this.deliveryType,
        delivery_free: info.delivery_free ? info.delivery_free : 0,
        mer_labels:
          info.mer_labels && info.mer_labels.length
            ? info.mer_labels.map(Number)
            : [],
        type: info.type || 0,
        extend: info.extend || [],
        svip_price_type: info.svip_price_type || 0
      };
      if (info.svip_price_type != 0)
        this.attrVal = {
          price: null,
          cost: null,
          ot_price: null,
          svip_price: null,
          stock: null,
          // cdkey: {},
          bar_code: "",
          weight: null,
          volume: null
        };
      if (this.formValidate.extend.length != 0) {
        this.customBtn = 1;
      }

      if (this.formValidate.spec_type === 0) {
        info.attrValue[0].list = [],
        this.OneattrValue = info.attrValue;    
      } else {
        this.ManyAttrValue = info.attrValue;
        this.generate();
      }
      if (this.formValidate.is_good === 1) {
        this.checkboxGroup.push("is_good");
      }
      this.getAttr();
      this.fullscreenLoading = false;
    },
    //关闭淘宝弹窗并生成数据；
    onClose(data) {
      this.modals = false;
      this.infoData(data);
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
      this.$store.dispatch("settings/setEdit", false);
      this.onChangeGroup();
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
            ? productUpdateApi(this.$route.params.id, this.formValidate)
                .then(async res => {
                  this.fullscreenLoading = false;
                  this.$message.success(res.message);
                  this.$router.push({ path: this.roterPre + "/product/list" });
                  this.$refs[name].resetFields();
                  this.formValidate.slider_image = [];
                  this.loading = false;
                })
                .catch(res => {
                  this.fullscreenLoading = false;
                  this.loading = false;
                  this.$message.error(res.message);
                })
            : productCreateApi(this.formValidate)
                .then(async res => {
                  this.fullscreenLoading = false;
                  this.$message.success(res.message);
                  this.$router.push({ path: this.roterPre + "/product/list" });
                  this.loading = false;
                })
                .catch(res => {
                  this.fullscreenLoading = false;
                  this.loading = false;
                  this.$message.error(res.message);
                });
        } else {
          if (!this.formValidate.store_name.trim()) {
            return this.$message.warning("基本信息-商品名称不能为空");
          }
          if (!this.formValidate.unit_name) {
            return this.$message.warning("基本信息-单位不能为空");
          }
          if (!this.formValidate.cate_id) {
            return this.$message.warning("基本信息-平台商品分类不能为空");
          }
          // if (!this.formValidate.mer_cate_id) {
          //   return this.$message.warning("基本信息-商户商品分类不能为空");
          // }
          if (!this.formValidate.image) {
            return this.$message.warning("基本信息-商品封面图不能为空");
          }
          if (this.formValidate.slider_image.length < 0) {
            return this.$message.warning("基本信息-商品轮播图不能为空");
          }
        }
      });
    },
    //预览
    handlePreview(name) {
      this.onChangeGroup();
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
    margin-left: 0 !important;
  }
}
.tabNumWidth {
  /deep/ .el-input-number--medium {
    width: 100px;
  }
  /deep/ .el-input-number__increase {
    width: 20px !important;
    font-size: 12px !important;
  }
  /deep/ .el-input-number__decrease {
    width: 20px !important;
    font-size: 12px !important;
  }
  /deep/ .el-input-number--medium .el-input__inner {
    padding-left: 25px !important;
    padding-right: 25px !important;
  }
  /deep/.priceBox .el-input-number__decrease,
  /deep/.priceBox .el-input-number__increase {
    display: none;
  }
  /deep/.priceBox .el-input-number.is-controls-right .el-input__inner {
    padding: 0 5px;
  }
  /deep/ thead {
    line-height: normal !important;
  }
  /deep/.cell {
    line-height: normal !important;
    text-overflow: clip !important;
  }
}
.seeCatMy {
  color: #2d8cf0;
  cursor: pointer;
}	
.selectOn{
	color: #2d8cf0;
}	
.virtual_boder {
  border: 1px solid #1890ff;
}
.virtual_boder2 {
  border: 1px solid #e7e7e7;
}
.virtual_san {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  border-bottom: 26px solid #1890ff;
  border-left: 26px solid transparent;
}
.virtual_dui {
  position: absolute;
  bottom: -2px;
  right: 2px;
  color: #ffffff;
  font-family: system-ui;
}
.virtual {
  width: 120px;
  height: 60px;
  background: #ffffff;
  border-radius: 3px;
  float: left;
  text-align: center;
  padding-top: 8px;
  position: relative;
  cursor: pointer;
  line-height: 23px;
  .virtual_top {
    font-size: 14px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
  .virtual_bottom {
    font-size: 12px;
    font-weight: 400;
    color: #999999;
  }
}
.virtual:nth-child(2n) {
  margin: 0 12px;
}
.addfont {
  display: inline-block;
  font-size: 13px;
  font-weight: 400;
  color: #1890ff;
  margin-left: 14px;
  cursor: pointer;
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
