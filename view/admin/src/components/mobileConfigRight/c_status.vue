<template>
  <div>
    <div class="c_row-item" v-if="configData">
      <el-col :span="8" class="c_label">{{ configData.title }}</el-col>
      <div class="color-box">
        <el-switch
          :true-value="true"
          :false-value="false"
          v-model="configData.status"
          @change="change"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "c_status",
  props: {
    configObj: {
      type: Object,
    },
    configNme: {
      type: String,
    },
  },
  data() {
    return {
      configData: {
        status: false,
      },
    };
  },
  created() {
    this.defaults = this.configObj;
    this.configData =  this.configObj[this.configNme]
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
    change(status) {
      this.$nextTick(() => {
        // if(this.configNme != 'bgOpacity'){
          this.configData.status = status;
          this.$store.commit("mobildConfig/footStatus", status);
        // }
        
      });
      //   this.$emit("getConfig", this.configData);
    },
  },
};
</script>

<style scoped lang="scss">
.c_row-item {
  margin-top: 10px;
  margin-bottom: 10px;
}

.color-box {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .color-item {
    margin-left: 15px;

    span {
      margin-left: 5px;
      color: #999;
      font-size: 13px;
      cursor: pointer;
    }
  }
}
</style>
