<template>
  <el-row align="middle" :gutter="10" class="ivu-mt">
    <el-col
      v-for="(item, index) in cardLists"
      :key="index"
      :xl="4"
      :lg="6"
      :md="12"
      :sm="24"
      :xs="24"
      class="ivu-mb mb10"
    >
      <div class="card_box">
        <div
          class="card_box_cir"
          :class="{'one':index%5==0,'two':index%5==1,'three':index%5==2,'four':index%5==3,'five':index%5==4}"
        >
          <div
            class="card_box_cir1"
            :class="{'one1':index%5==0,'two1':index%5==1,'three1':index%5==2,'four1':index%5==3,'five1':index%5==4}"
          >
            <i :class="item.className" style="font-size: 24px;" />
          </div>
        </div>
        <div class="card_box_txt">
          <span class="sp1" v-text="item.count || 0" />
          <span class="sp2" v-text="item.name" />
        </div>
      </div>
    </el-col>
  </el-row>
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
export default {
  name: "Index",
  props: {
    cardLists: Array,
  },
};
</script>

<style scoped lang="scss">

.one {
  background: #e4ecff;
}
.two {
  background: #fff3e0;
}
.three {
  background: #eaf9e1;
}
.four {
  background: #ffeaf4;
}
.five {
  background: #f1e4ff;
}
.one1 {
  background: #4d7cfe;
}
.two1 {
  background: #ffab2b;
}
.three1 {
  background: #6dd230;
}
.four1 {
  background: #ff85c0;
}
.five1 {
  background: #b37feb;
}
.card_box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  /*justify-content: center*/
  padding: 25px;
  box-sizing: border-box;
  border-radius: 4px;
  background: #f5f7f9;
  .card_box_cir {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    // overflow: hidden;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .card_box_cir1 {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
  .card_box_txt {
    .sp1 {
      display: block;
      color: #252631;
      font-size: 24px;
      line-height: 37px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sp2 {
      display: block;
      color: #98a9bc;
      font-size: 12px;
    }
  }
}
</style>
