<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-form ref="form" :model="form" class="demo-promoterForm">
        <el-form-item label="选择配色方案：">
          <el-radio-group v-model="form.global_theme" @change="changeColor">
            <el-radio label="default" border class="box red"
              >中国红<img
                src="@/assets/images/dui.png"
                class="iconfont bgred"
                alt=""
            /></el-radio>
            <el-radio label="orange" border class="box orange"
              >阳光橙<img
                src="@/assets/images/dui.png"
                class="iconfont bgorange"
                alt=""
            /></el-radio>
            <el-radio label="pink" border class="box pink"
              >浪漫粉<img
                src="@/assets/images/dui.png"
                class="iconfont bgpink"
                alt=""
            /></el-radio>
            <el-radio label="green" border class="box green"
              >生鲜绿<img
                src="@/assets/images/dui.png"
                class="iconfont bggreen"
                alt=""
            /></el-radio>
            <el-radio label="blue" border class="box blue"
              >科技蓝<img
                src="@/assets/images/dui.png"
                class="iconfont bgblue"
                alt=""
            /></el-radio>
            <el-radio label="purple" border class="box purple"
              >梦幻紫<img
                src="@/assets/images/dui.png"
                class="iconfont bgpurple"
                alt=""
            /></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前风格：">
          <div class="styleBox">
            <div class="pictrue" v-for="(item, index) in picList" :key="index">
              <img :src="item.image" />
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="save">
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button @click="reset">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getStyleApi, setStyleApi } from "@/api/setting";
export default {
  name: "themeStyle",
  data() {
    return {
      picList: [],
      picListRed: [
        { image: require("@/assets/images/themStyle/red3.jpg") },
        { image: require("@/assets/images/themStyle/red1.jpg") },
        { image: require("@/assets/images/themStyle/red2.jpg") },
      ],
      picListBule: [
        { image: require("@/assets/images/themStyle/blue3.jpg") },
        { image: require("@/assets/images/themStyle/blue1.jpg") },
        { image: require("@/assets/images/themStyle/blue2.jpg") },
      ],
      picListGreen: [
        { image: require("@/assets/images/themStyle/green3.jpg") },
        { image: require("@/assets/images/themStyle/green1.jpg") },
        { image: require("@/assets/images/themStyle/green2.jpg") },
      ],
      picListOrange: [
        { image: require("@/assets/images/themStyle/orange3.jpg") },
        { image: require("@/assets/images/themStyle/orange1.jpg") },
        { image: require("@/assets/images/themStyle/orange2.jpg") },
      ],
      picListPurple: [
        { image: require("@/assets/images/themStyle/purple3.jpg") },
        { image: require("@/assets/images/themStyle/purple1.jpg") },
        { image: require("@/assets/images/themStyle/purple2.jpg") },
      ],
      picListPink: [
        { image: require("@/assets/images/themStyle/pink3.jpg") },
        { image: require("@/assets/images/themStyle/pink1.jpg") },
        { image: require("@/assets/images/themStyle/pink2.jpg") },
      ],
      form: {
        global_theme: "default",
      },
    };
  },
  created() {
    this.getInfo();
    this.picList = this.picListRed;
  },
  methods: {
    getInfo() {
      getStyleApi()
        .then((res) => {
          this.form.global_theme = res.data.global_theme;
          this.changeColor(res.data.global_theme || 'default');
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    reset() {
      this.form.global_theme = "default";
      setStyleApi(this.form)
        .then((res) => {
          this.getInfo();
          this.$message.success(res);
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    submitForm() {
      setStyleApi(this.form)
        .then((res) => {
          this.getInfo();
          this.$message.success(res);
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    changeColor(e) {
      switch (e) {
        case "blue":
          this.picList = this.picListBule;
          break;
        case "green":
          this.picList = this.picListGreen;
          break;
        case "default":
          this.picList = this.picListRed;
          break;
        case "pink":
          this.picList = this.picListPink;
          break;
        case "orange":
          this.picList = this.picListOrange;
          break;
        case "purple":
          this.picList = this.picListPurple;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.box {
  margin: 0;
  width: 100px;
  height: 40px;
  border-radius: 4px;
  position: relative;
}
/deep/.el-radio--medium.is-bordered .el-radio__inner {
  width: 20px;
  height: 20px;
  opacity: 1;
  border-radius: 2px;
}

.red /deep/.el-radio__inner {
  background-color: #e93323;
  border: 1px solid #e93323;
}
.orange /deep/.el-radio__inner {
  background-color: #ff5c2d;
  border: 1px solid #ff5c2d;
}
.pink /deep/.el-radio__inner {
  background-color: #ff448f;
  border: 1px solid #ff448f;
}
.green /deep/.el-radio__inner {
  background-color: #42ca4d;
  border: 1px solid #42ca4d;
}
.blue /deep/.el-radio__inner {
  background-color: #1db0fc;
  border: 1px solid #1db0fc;
}
.purple /deep/.el-radio__inner {
  background-color: #905eff;
  border: 1px solid #905eff;
}
.bgred {
  background-color: #e93323;
}
.bgorange {
  background-color: #ff5c2d;
}
.bgpink {
  background-color: #ff448f;
}
.bggreen {
  background-color: #42ca4d;
}
.bgblue {
  background-color: #1db0fc;
}
.bgpurple {
  background-color: #905eff;
}
.iconfont {
  position: absolute;
  top: 15px;
  left: 14px;
  font-size: 12px;
  display: none;
  // background-color: #e93323;
}

/deep/.is-checked .iconfont {
  display: inline-block;
}
.styleBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .pictrue {
    width: 300px;
    height: 560px;
    margin: 10px 30px 0 0;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
.save {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
</style>
