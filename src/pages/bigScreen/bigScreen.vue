<template>
  <div class="catalog">
    <div class="imageContainer">
      <span class="catalog_back" @click="back">返回上一级</span>
      <p class="catalog_title title">交旅业财一体化平台-数据大屏</p>
      <el-row>
        <el-col :span="5" v-for="(o, index) in dataList" :key="o.name" :offset="index > 0 ? 1 : 0">
          <div>
            <img :src="o.image" class="image" />
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="dologin(o)">{{o.name}}</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      dataList: [
        {
          name: "交旅集团公司数据大屏",
          index: "/groupUseScreen",
          image:
            "/static/images/1.jpg"
        },
        {
          name: "汽车客运业务-数据大屏",
          index: "/carPassengerBusiness",
          image:
            "/static/images/1.jpg"
        },
        {
          name: "大屏名称XXXXX",
          index: "/basicData",
          image:
            "/static/images/1.jpg"
        },
        {
          name: "大屏名称XXXXX",
          index: "/ledger",
          image:
            "/static/images/1.jpg"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    dologin(v) {
      this.$router.push(v.index);
    },
    back() {
      this.$router.push("/cataLog");
    }
  }
};
</script>



<style lang="scss" scoped>
.catalog {
  height: 100vh;
  display: flex;
  justify-content: center;
  background: url("/static/images/bac.png") no-repeat;
  .imageContainer {
    width: 80%;
    .catalog_back {
      color: white;
      float: right;
      cursor: pointer;
      padding-top: 70px;
    }
    .catalog_title {
      color: #fff;
      text-align: center;
      font-size: 30px;
      font-weight: 700;
      margin: 60px 0 100px 0;
    }
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
    text-align: center;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
}
</style>

