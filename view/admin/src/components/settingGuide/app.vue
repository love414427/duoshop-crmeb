<template>
  <el-tabs class="guide-tab" value="1" :animated="false">
    <el-tab-pane label="1.注册开放平台" name="1">
      <el-timeline>
        <el-timeline-item>
          <div class="dot" slot="dot">1</div>
          <div class="title">打开开放平台</div>
          <div class="content">
            <div class="item">
              <div class="text">
                <div>
                  在微信开放平台官网首页：<a
                    href="https://open.weixin.qq.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    >https://open.weixin.qq.com</a
                  >
                </div>
                <div>点击右上角“注册”</div>
              </div>
              <div class="image">
                <img :src="`${baseURL}/statics/system/open-1-1-1.png`" alt="" />
              </div>
            </div>
          </div>
        </el-timeline-item>
        <el-timeline-item>
          <div class="dot" slot="dot">2</div>
          <div class="title">完善信息</div>
          <div class="content">
            <div class="item">
              <div class="text">
                <div>根据提示，完善信息即可完成注册</div>
              </div>
              <div class="image">
                <img :src="`${baseURL}/statics/system/open-1-2-1.png`" alt="" />
              </div>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </el-tab-pane>
    <el-tab-pane label="2.开发者资质认证" name="2">
      <el-timeline>
        <el-timeline-item>
          <div class="title">开发者资质认证</div>
          <div class="content">
            <div class="item">
              <div class="text">
                <div>
                  开发者资质认证（跟微信公众号一样，需要每年300元服务费）
                </div>
              </div>
              <div class="image">
                <img :src="`${baseURL}/statics/system/open-2-1-1.png`" alt="" />
              </div>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </el-tab-pane>
    <el-tab-pane label="3.创建应用" name="3">
      <el-timeline>
        <el-timeline-item>
          <div class="dot" slot="dot">1</div>
          <div class="title">关联绑定相关应用</div>
          <div class="content">
            <div class="item">
              <div class="text">
                <div>
                  可根据自己的情况，关联绑定 APP、PC网站、公众号、小程序等
                </div>
              </div>
              <div class="image">
                <img :src="`${baseURL}/statics/system/open-3-1-1.png`" alt="" />
              </div>
            </div>
          </div>
        </el-timeline-item>
        <el-timeline-item>
          <div class="dot" slot="dot">2</div>
          <div class="title">获取Appid以及Secret</div>
          <div class="content">
            <div class="item">
              <div class="text">
                <div>创建之后可以点击进入获取开放平台appid以及secret</div>
              </div>
              <div class="image">
                <img :src="`${baseURL}/statics/system/open-3-2-1.png`" alt="" />
              </div>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import SettingMer from '@/libs/settingMer'
export default {
  name: 'appGuide',
  data() {
    return {
     baseURL: SettingMer.httpUrl || 'http://localhost:8080',
    };
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-timeline-item__content{
  padding-bottom: 20px;
  .title{
    margin: 10px 0;
    font-size: 16px;
    line-height: 20px;
    color: #333;
    font-weight: 600;
  }
  .text{
    font-size: 12px;
    line-height: 17px;
    color: #666;
  }
  .image{
    margin-top: 15px;
  }
  .image img{
    max-width: 100%;
  }
}

</style>