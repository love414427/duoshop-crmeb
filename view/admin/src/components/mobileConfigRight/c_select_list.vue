<template>
  <div class="box">
    <div class="title">
      {{ configData.title }}
    </div>
    <div class="list-box">
      <draggable class="dragArea list-group" :list="configData.list" group="peoples" handle=".move-icon">
        <div class="item" v-for="(item, index) in configData.list" :key="index">
          <div class="move-icon">
            <span class="iconfont-diy icondrag"></span>
          </div>
          <div v-if="configData.isLive" class="img-box" @click="modalPicTap(item, index)">
            <img :src="item.img" alt="" v-if="item.img" />
            <div class="upload-box" v-else><i class="el-icon-camera-solid" style="font-size: 30px" /></div>
            <div class="delect-btn" v-if="!configData.isLive" @click.stop="bindDelete(item, index)">
              <span class="iconfont-diy icondel_1"></span>
            </div>
          </div>
          <div class="info">
            <div class="info-item">
              <div class="input-box">
                <el-cascader
                  :ref="'cascader' + index"
                  :options="categoryList"
                  placeholder="请选择商品分类"
                  v-model="item.cate"
                  :props="{ checkStrictly: configData.isRank ? false : true, emitPath: false }"
                  clearable
                ></el-cascader>
              </div>
            </div>
          </div>
        </div>
      </draggable>
    </div>
    <template v-if="configData.list">
      <div class="add-btn" v-if="configData.list.length < configData.maxList">
        <el-button plain style="width: 100%; height: 40px; border-color: #1890ff; color: #1890ff" @click="addBox"
          >添加分类</el-button
        >
      </div>
    </template>
  </div>
</template>

<script>
import { getCategory, getLiveCategory } from '@/api/diy';
import { configApi } from '@/api/system'
import vuedraggable from 'vuedraggable';
export default {
  name: 'c_select_list',
  props: {
    configObj: {
      type: Object,
    },
    configNme: {
      type: String,
    },
  },
  components: {
    draggable: vuedraggable,
  },
  data() {
    return {
      value: '',
      defaults: {},
      configData: {},
      activeIndex: 0,
      lastObj: {},
      categoryList: [],
      isHotRanking: this.configObj.name == 'hotRanking' ? true : false,
      lv: '1'
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.defaults = this.configObj;
      this.configData = this.configObj[this.configNme];
      this.getCategory();
    });
  },
  watch: {
    configObj: {
      handler(nVal, oVal) {
        this.defaults = nVal;
        this.configData = nVal[this.configNme];
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    getCategory() {
      if (this.configData.isLive) {
        //直播
        getLiveCategory().then((res) => {
          this.categoryList = res.data;
        });
      } else {
        configApi().then(res=> {
          getCategory({lv:res.data.hot_ranking_lv}).then((res) => {
            this.categoryList = res.data;
          });
        })
        
      }
    },
    addBox() {
      if (this.configData.list.length == 0) {
        this.lastObj.title = '';
        this.lastObj.value = '';
        this.configData.list.push(this.lastObj);
      } else {
        let obj = JSON.parse(JSON.stringify(this.configData.list[this.configData.list.length - 1]));
        obj.title = '';
        obj.value = '';
        this.configData.list.push(obj);
      }
    },
    sliderChange(index) {
      let nodesInfo = this.$refs['cascader' + index][0].getCheckedNodes();
      this.configData.list[index]['value'] = nodesInfo[0].label;
      this.configData.list[index]['id'] = nodesInfo[0].value;
      let storage = window.localStorage;
      // this.configData.activeValue = e ? e : storage.getItem(this.timeStamp);
      this.$emit('getConfig', { name: 'select', values: this.configData });
    },
    // 点击图文封面
    modalPicTap(item, index) {
      let _this = this;
      _this.activeIndex = index;
      _this.$modalUpload(function (img) {
        item.img = img[0];
        _this.$forceUpdate();
        _this.getPic(img[0]);
      });
    },
    // 获取图片信息
    getPic(pc) {
      this.$nextTick(() => {
        this.configData.list[this.activeIndex].img = pc;
        this.modalPic = false;
      });
    },
    // 删除
    bindDelete(item, index) {
      if (this.configData.list.length == 1) {
        this.lastObj = this.configData.list[0];
      }
      this.configData.list.splice(index, 1);
    },
  },
};
</script>

<style scoped lang="scss">
.box {
  margin-bottom: 20px;
  .title {
    padding: 13px 0;
    color: #999;
    font-size: 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
}

.list-box {
  .item {
    position: relative;
    display: flex;
    margin-top: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    align-items: center;
    .move-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      cursor: move;
      .iconfont-diy {
        color: #dddddd;
        font-size: 28px;
      }
    }
    .img-box {
      position: relative;
      width: 70px;
      height: 70px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .upload-box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #f7f7f7;
    font-size: 12px;
    color: #cccccc;
    .iconfont {
      font-size: 16px;
    }
  }
  .info {
    margin-left: 10px;
    .info-item {
      display: flex;
      align-items: center;
      span {
        width: 40px;
        font-size: 13px;
      }
      .input-box {
        flex: 1;
        /deep/.ivu-input {
          font-size: 13px !important;
        }
      }
    }
  }
  .delect-btn {
    position: absolute;
    right: -7px;
    top: -12px;
    .iconfont-diy {
      font-size: 25px;
      color: #999;
    }
  }
}
.el-cascader {
  width: 250px;
}
.iconfont-diy {
  color: #dddddd;
  font-size: 28px;
}
</style>
