<template>
  <div class="divBox">
    <el-card class="box-card">
      <div>
        <el-tabs
          tab-position="left"
          v-model="editableTabsValue"
          @tab-click="tabStatus"
        >
          <el-tab-pane
            :label="item.label"
            v-for="(item, index) in tabList"
            :key="index"
            :name="item.key"
          >
            <div class="content">
              <div class="phoneBox">
                <div class="fontBox" v-html="formValidate.agree"></div>
              </div>
              <div class="ueditor">
                <div class="font">
                  <span class="gang"></span> {{ item.label }}
                </div>
                <ueditor-from
                  v-model="formValidate.agree"
                  :content="formValidate.agree"
                />
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="btn">
          <el-button class="button" type="primary" @click="submenus"
            >提交</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import ueditorFrom from "@/components/ueditorFrom";
import { keylstApi, getAgreeApi, postAgreeApi } from "@/api/setting";
export default {
  name: "agreements",
  components: { ueditorFrom },
  data() {
    return {
      tabList: [
        { title: "用户协议", id: 1 },
        { title: "隐私政策", id: 2 },
        { title: "入驻协议", id: 3 },
        { title: "关于我们", id: 4 },
        { title: "资质证照", id: 5 },
        { title: "平台规则", id: 6 },
        { title: "注销声明", id: 7 },
        { title: "注销重要提示", id: 8 },
      ],
      formValidate: {
        agree: "",
      },
      editableTabsValue: "",
    };
  },
  created() {
    keylstApi().then((res) => {
      this.tabList = res.data;
      this.editableTabsValue = res.data[0].key;
      this.getInfo(this.editableTabsValue);
    });
  },
  methods: {
    getInfo(data) {
      getAgreeApi(data).then((res) => {
        this.formValidate.agree = res.data[this.editableTabsValue];
      });
    },
    submenus() {
      if (this.formValidate.agree === "" || !this.formValidate.agree) {
        this.$message.warning("请输入协议信息！");
        return;
      } else {
        postAgreeApi(this.editableTabsValue, this.formValidate)
          .then(async (res) => {
            this.$message.success(res.message);
          })
          .catch((res) => {
            this.$message.error(res.message);
          });
      }
    },
    tabStatus(e) {
      this.getInfo(e.name);
    },
  },
};
</script>
<style scoped lang="scss">
.box-card /deep/.el-card__body {
  padding-left: 0px;
}
/deep/.el-tabs__item.is-active {
  color: #1890ff;
  background-color: #ccc;
  background: #437efd1e;
  // opacity: 0.1;
}
/deep/.el-tabs--left .el-tabs__header.is-left {
  float: left;
  margin-bottom: 0;
  margin-right: 20px;
  height: 700px;
}
.gang {
  border: 2px solid #1890ff;
  margin-right: 10px;
}
.btn {
  border-top: 1px solid #ccc;
  margin-top: 20px;
  .button {
    display: block;
    margin: 17px auto 0px;
  }
}
.content {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  img{
    max-width: 100%;
  }
  .phoneBox {
    width: 302px;
    height: 543px;
    background-image: url("../../../assets/images/phoneBox.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    margin-right: 30px;
    .fontBox {
      margin: 0 auto;
      margin-top: 45px;
      width: 255px;
      height: 450px;
      background: #ffffff;
      border: 1px solid #e2e2e2;
      padding: 10px;
      overflow: hidden;
      overflow-y: auto;
      
    }
  }
  .ueditor {
    flex: 1;
    .font {
      font-size: 20px;
      font-weight: 600;
      color: #303133;
      margin-bottom: 30px;
    }
  }
}
</style>