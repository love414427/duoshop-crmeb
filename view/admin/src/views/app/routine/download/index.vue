<template>
  <div>
    <el-card :bordered="false" class="ivu-mt">
      <div>
        <div class="flex-wrapper">
        <!-- :src="iframeUrl" -->
        <div>
          <iframe
            class="iframe-box"
            :src="pageData.site_url+'?inner_frame=1'"
            frameborder="0"
            ref="iframe"
          ></iframe>
          <div class="mask"></div>
        </div>
        <div class="right">
          <div class="content">
            <div class="content-box title">
              <div class="line"></div>
              <div class="right title">小程序设置</div>
            </div>
            <el-alert v-if="!pageData.routine_appId" type="info"
              description="您尚未配置小程序信息，请前往小程序配置页面立即设置">
            </el-alert>
            <div class="content-box">
              <div class="left">小程序名称：</div>
              <div class="right">{{ pageData.routine_name || "未命名" }}</div>
            </div>
            <div class="content-box">
              <div class="left">种草功能：</div>
              <div class="right">
                <span>是否显示种草模块</span>
                <el-radio-group class="rad" size="large" v-model="is_menu">
                  <el-radio :label="1">显示</el-radio>
                  <el-radio :label="0">不显示</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div class="content-box">
              <div class="left">小程序包：</div>
              <div class="right">
                <span>是否已开通小程序直播</span>
                <el-radio-group class="rad" size="large" v-model="is_live">
                  <el-radio :label="0">未开通</el-radio>
                  <el-radio :label="1">已开通</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div class="content-box last">
              <div class="left"></div>
              <div class="right">
                <div style="margin-top: 10px;">
                  请谨慎选择是否有开通小程序直播功能，否则将影响小程序的发布
                  可前往
                  <a :href="pageData.url" target="_blank">帮助文档</a>
                  查看如何开通直播功能
                </div>
                <el-button style="margin-top: 10px;" type="primary" size="mini" @click="downLoad()">下载小程序包</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div> 
    </el-card>
  </div>
</template>

<script>
import { routineDownload, routineInfo } from "@/api/app";
export default {
  name: "routineTemplate",
  data() {
    return {
      is_live: 1,
      is_menu: 1,
      pageData: {
        routine_name: "",
        url: "",
        routine_appId: "1",
        site_url: "",
       
      },
    };
  },
  created() {
    routineInfo().then((res) => {
      console.log(res);
      this.pageData = res.data;
    });
  },
  watch: {
    $route(to, from) {},
  },
  computed: {

  },
  methods: {
    downLoad() {
      routineDownload({
        is_live: this.is_live,
        is_menu: this.is_menu
      })
        .then((res) => {
          window.open(res.data.url);
        })
        .catch((err) => {
          this.$message.warning(err.message);
        });
    },
    downLoadCode(url) {
      if (!url) return this.$message.warning("暂无小程序码");
      var image = new Image();
      image.src = url;
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL(); //得到图片的base64编码数据
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
    },
  },
};
</script>

<style scoped lang="scss">
.template_sp_box {
  padding: 5px 0;
  box-sizing: border-box;
}
.template_sp {
  display: block;
  padding: 2px 0;
  box-sizing: border-box;
}
.flex-wrapper {
  display: flex;
  border-radius: 10px;
}
.iframe-box {
  width: 312px;
  height: 550px;
  border-radius: 10px;
}
.ivu-mt {
  height: 600px;
}
.content {
  padding: 0 20px;
}
.content > .title {
  padding-bottom: 26px;
}
.content-box {
  display: flex;
  align-items: center;
  margin: 20px 20px 0 20px;
  color: #333;
}
.content-box.last {
  margin-top: 8px;
  color: #999999;
  font-size: 12px;
}
.line {
  width: 3px;
  height: 16px;
  background-color: #1890FF;
  margin-right: 11px;
}
.content-box .title {
  font-size: 16px;
  font-weight: bold;
}
.content-box > span {
  color: #F5222D;
  font-size: 20px;
}
.content-box .left {
  width: 100px;
  text-align: right;
}
.content-box .right {
  width: 400px;
  a {
    color: #57a3f3;
  }
}
.rad {
  margin-left: 20px;
}
.mask {
  position: absolute;
  left: 20px;
  bottom: 0;
  top: 0;
  width: 312px;
  height: 570px;
  background-color: rgba(0, 0, 0, 0);
}
</style>
