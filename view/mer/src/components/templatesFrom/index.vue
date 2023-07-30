<template>
  <div>
    <el-form ref="ruleForm" v-loading="loading" :model="ruleForm" label-width="120px" size="mini" :rules="rules">
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="ruleForm.name" class="withs" placeholder="请输入模板名称" />
      </el-form-item>
      <el-form-item label="运费说明" prop="info">
        <el-input v-model="ruleForm.info" type="textarea" class="withs" placeholder="请输入运费说明" />
      </el-form-item>
      <el-form-item label="计费方式" prop="type">
        <el-radio-group v-model="ruleForm.type" @change="changeRadio(ruleForm.type)">
          <el-radio :label="0">按件数</el-radio>
          <el-radio :label="1">按重量</el-radio>
          <el-radio :label="2">按体积</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="配送区域及运费" prop="region">
        <el-table v-loading="listLoading" :data="ruleForm.region" border fit highlight-current-row style="width: 100%" size="mini" class="tempBox">
          <el-table-column align="center" label="可配送区域" min-width="260">
            <template slot-scope="scope">
              <span v-if="scope.$index === 0">默认全国   <span style="font-weight: bold;">(开启指定区域不配送时无效)</span></span>
              <LazyCascader
                v-else
                v-model="scope.row.city_ids"
                style="width: 98%"
                :props="props"
                collapse-tags
                clearable
                :filterable="false"
              />
            </template>
          </el-table-column>
          <el-table-column min-width="130px" align="center" :label="columns.title">
            <template slot-scope="{row}">
              <el-input-number v-model="row.first" controls-position="right" :min="0" />
            </template>
          </el-table-column>
          <el-table-column min-width="120px" align="center" label="运费（元）">
            <template slot-scope="{row}">
              <el-input-number v-model="row.first_price" controls-position="right" :min="0" />
            </template>
          </el-table-column>
          <el-table-column min-width="120px" align="center" :label="columns.title2">
            <template slot-scope="{row}">
              <el-input-number v-model="row.continue" controls-position="right" :min="0.1" />
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" align="center" label="续费（元）" min-width="120">
            <template slot-scope="{row}">
              <el-input-number v-model="row.continue_price" controls-position="right" :min="0" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="80" fixed="right">
            <template slot-scope="scope">
              <el-button
                v-if="scope.$index > 0"
                type="text"
                size="small"
                @click="confirmEdit(ruleForm.region,scope.$index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="addRegion(ruleForm.region)">
          添加配送区域
        </el-button>
      </el-form-item>
      <el-form-item label="指定包邮" prop="appoint">
        <el-radio-group v-model="ruleForm.appoint">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="ruleForm.appoint === 1" prop="free">
        <el-table v-loading="listLoading" :data="ruleForm.free" border fit highlight-current-row style="width: 100%" size="mini">
          <el-table-column align="center" label="选择地区" min-width="220">
            <template slot-scope="{row}">
              <LazyCascader
                v-model="row.city_ids"
                style="width: 95%"
                :props="props"
                collapse-tags
                clearable
                :filterable="false"
              />
            </template>
          </el-table-column>
          <el-table-column min-width="180px" align="center" :label="columns.title3">
            <template slot-scope="{row}">
              <el-input-number v-model="row.number" controls-position="right" :min="1" />
            </template>
          </el-table-column>
          <el-table-column min-width="120px" align="center" label="最低购买金额（元）">
            <template slot-scope="{row}">
              <el-input-number v-model="row.price" controls-position="right" :min="0.01" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="120" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="confirmEdit(ruleForm.free,scope.$index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item v-if="ruleForm.appoint === 1">
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="addFree(ruleForm.free)">
          添加指定包邮区域
        </el-button>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="指定区域不配送" prop="undelivery">
            <el-radio-group v-model="ruleForm.undelivery">
              <el-radio :label="1">自定义</el-radio>
              <el-radio :label="2">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
            <br>
            (说明: 选择"开启"时, 仅支持上表添加的配送区域)
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="ruleForm.undelivery === 1" class="noBox" prop="city_id3">
            <LazyCascader
              v-model="ruleForm.city_id3"
              placeholder="请选择不配送区域"
              style="width: 46%"
              :props="props"
              collapse-tags
              clearable
              :filterable="false"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="排序">
        <el-input v-model="ruleForm.sort" class="withs" placeholder="请输入排序" />
      </el-form-item>
    </el-form>
    <span class="footer acea-row">
      <el-button @click="resetForm('ruleForm')">取 消</el-button>
      <el-button type="primary" @click="onsubmit('ruleForm')">确 定</el-button>
    </span>
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
import { cityListV2, templateCreateApi, templateDetailApi, templateUpdateApi } from '@/api/freight'
import LazyCascader from '../lazyCascader'
const defaultRole = {
  name: '',
  type: 0,
  appoint: 0,
  sort: 0,
  info: '',
  region: [{
    first: 1,
    first_price: 0,
    continue: 1,
    continue_price: 0,
    city_id: [],
    city_ids: []
  }],
  undelivery: 0,
  free: [],
  undelives: {},
  city_id3: []
}

const cacheAddress = {}

const kg = '重量（kg）'
const m = '体积（m³）'
const statusMap = [
  {
    title: '首件',
    title2: '续件',
    title3: '最低购买件数'
  },
  {
    title: `首件${kg}`,
    title2: `续件${kg}`,
    title3: `最低购买${kg}`
  },
  {
    title: `首件${m}`,
    title2: `续件${m}`,
    title3: `最低购买${m}`
  }
]
export default {
  name: 'CreatTemplates',
  components: {
    LazyCascader
  },
  props: {
    tempId: {
      type: Number,
      default: 0
    },
    componentKey: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      rules: {
        name: [
          { required: true, message: '请输入模板名称', trigger: 'change' }
        ],
        info: [
          { required: true, message: '请输入运费说明', trigger: 'blur' },
          { min: 3, max: 500, message: '长度在 3 到 500 个字符', trigger: 'blur' }
        ],
        free: [
          { type: 'array', required: true, message: '请至少添加一个地区', trigger: 'change' }
        ],
        appoint: [
          { required: true, message: '请选择是否指定包邮', trigger: 'change' }
        ],
        undelivery: [
          { required: true, message: '请选择是否指定区域不配送', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择计费方式', trigger: 'change' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
        // city_id3: [
        //   { type: 'array', required: true, message: '请至少选择一个地区', trigger: 'remove-tag' }
        // ]
      },
      nodeKey: 'city_id',
      props: {
        children: 'children',
        label: 'name',
        value: 'id',
        multiple: true,
        lazy: true,
        lazyLoad: this.lazyLoad,
        checkStrictly: true
      },
      dialogVisible: false,
      ruleForm: Object.assign({}, defaultRole),
      listLoading: false,
      cityList: [],
      columns: {
        title: '首件',
        title2: '续件',
        title3: '最低购买件数'
      }
    }
  },
  watch: {
    componentKey: {
      handler: function(val, oldVal) {
        if (val) {
          this.getInfo()
        } else {
          this.ruleForm = {
            name: '',
            type: 0,
            appoint: 0,
            sort: 0,
            region: [{
              first: 1,
              first_price: 0,
              continue: 1,
              continue_price: 0,
              city_id: [],
              city_ids: []
            }],
            undelivery: 0,
            free: [],
            undelives: {},
            city_id3: []
          }
        }
      }
      // immediate: true
    }
  },
  mounted() {
    // this.getCityList()
    if (this.tempId > 0) this.getInfo()
  },
  methods: {
    resetForm(formName) {
      this.$msgbox.close()
      this.$refs[formName].resetFields()
    },
    onClose(formName) {
      this.dialogVisible = false
      this.$refs[formName].resetFields()
    },
    confirmEdit(row, index) {
      row.splice(index, 1)
    },
    changeRadio(num) {
      this.columns = Object.assign({}, statusMap[num])
    },
    // 添加配送区域
    addRegion(region) {
      region.push(Object.assign({}, {
        first: 1,
        first_price: 1,
        continue: 1,
        continue_price: 0,
        city_id: [],
        city_ids: []
      }))
    },
    addFree(Free) {
      Free.push(Object.assign({}, {
        city_id: [],
        number: 1,
        price: 0.01,
        city_ids: []
      }))
    },
    lazyLoad(node, resolve) {
      if (cacheAddress[node]) {
        cacheAddress[node]().then(res => {
          resolve([...res.data])
        })
      } else {
        const p = cityListV2(node)
        cacheAddress[node] = () => p
        p.then(res => {
          res.data.forEach(item => {
            item.leaf = item.snum === 0
          })
          cacheAddress[node] = () => new Promise((resolve1) => {
            setTimeout(() => resolve1(res), 300)
          })
          resolve(res.data)
        }).catch(res => {
          this.$message.error(res.message)
        })
      }
    },
    // 详情
    getInfo() {
      this.loading = true
      templateDetailApi(this.tempId).then(res => {
        this.dialogVisible = true
        const info = res.data
        this.ruleForm = {
          name: info.name,
          type: info.type,
          info: info.info,
          appoint: info.appoint,
          sort: info.sort,
          region: info.region,
          undelivery: info.undelivery,
          free: info.free,
          undelives: info.undelives,
          city_id3: info.undelives.city_ids || []
        }
        this.ruleForm.region.map(item => {
          this.$set(item, 'city_id', item.city_ids[0])
          this.$set(item, 'city_ids', item.city_ids)
        })
        this.ruleForm.free.map(item => {
          this.$set(item, 'city_id', item.city_ids[0])
          this.$set(item, 'city_ids', item.city_ids)
        })
        this.changeRadio(info.type)
        // this.$refs.changeType.click(info.type)
        // this.$refs.refid.click();
        this.loading = false
      }).catch(res => {
        this.$message.error(res.message)
        this.loading = false
      })
    },
    // 列表
    // getCityList() {
    //   cityListV2(0).then(res => {
    //     this.cityList = res.data
    //   }).catch(res => {
    //     this.$message.error(res.message)
    //   })
    // },
    change(idBox) {
      idBox.map(item => {
        const ids = []
        if (item.city_ids.length === 0) return
        item.city_ids.map(j => {
          // j.splice(0, 1)
          ids.push(j[j.length - 1])
        })
        item.city_id = ids
      })
      return idBox
    },
    changeOne(idBox) {
      const city_ids = []
      if (idBox.length === 0) return
      idBox.map(item => {
        // item.splice(0, 1)
        city_ids.push(item[item.length - 1])
      })
      return city_ids
    },
    onsubmit(formName) {
      // this.ruleForm.region = this.change(this.ruleForm.region)
      // this.ruleForm.free = this.change(this.ruleForm.free)
      // this.ruleForm.undelives.city_id = this.changeOne(this.ruleForm.city_id3)
      const data = {
        name: this.ruleForm.name,
        type: this.ruleForm.type,
        info: this.ruleForm.info,
        appoint: this.ruleForm.appoint,
        sort: this.ruleForm.sort,
        region: this.change(this.ruleForm.region),
        undelivery: this.ruleForm.undelivery,
        free: this.change(this.ruleForm.free),
        undelives: {
          city_id: this.changeOne(this.ruleForm.city_id3)
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.tempId === 0 ? templateCreateApi(data).then(res => {
            this.$message.success(res.message)
            setTimeout(() => {
              this.$msgbox.close()
            }, 500)
            setTimeout(() => {
              this.$emit('getList')
              this.$refs[formName].resetFields()
            }, 600)
          }).catch(res => {
            this.$message.error(res.message)
          }) : templateUpdateApi(this.tempId, data).then(res => {
            this.$message.success(res.message)
            setTimeout(() => {
              this.$msgbox.close()
            }, 500)
            setTimeout(() => {
              this.$emit('getList')
              this.$refs[formName].resetFields()
            }, 600)
          }).catch(res => {
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
.footer{
  justify-content: flex-end;
}
.withs{
  width: 50%;
}
.noBox{
  /deep/.el-form-item__content{
    margin-left: 0 !important;
  }
}
.tempBox{
  /deep/.el-input-number--mini{
    width: 100px !important;
  }
}
</style>
