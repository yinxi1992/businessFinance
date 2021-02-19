<template>
  <div class="catalog">
    <div class="imageContainer">
      <p class="catalog_title title">交旅业财一体化平台</p>
      <el-row>
        <el-col
          :span="5"
          v-for="(o, index) in dataList"
          :key="o.name"
          :offset="index > 0 ? 1 : 0"
        >
          <div class="catalog_border">
            <img :src="o.image" class="image" />
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="dologin(o)">{{
                  o.name
                }}</el-button>
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
          name: "智能数据大屏",
          index: "/bigScreen",
          image: "/static/images/1.jpg"
        },
        {
          name: "综合报表查询",
          index: "/ticketRevenueForm",
          image: "/static/images/1.jpg"
        },
        {
          name: "基础数据管理",
          index: "/basicData",
          image: "/static/images/1.jpg"
        },
        {
          name: "业务台账应用",
          index: "/ledger",
          image: "/static/images/1.jpg"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    dologin(v) {
      this.$router.push(v.index);
    }
  }
};
</script>



<style lang="scss" scoped>
.catalog {
  height: 100vh;
  display: flex;
  justify-content: center;
  background: url("/static/images/bac.png") center no-repeat;
  background-size: cover;
  .imageContainer {
    width: 80%;
    .catalog_title {
      color: #fff;
      text-align: center;
      font-size: 40px;
      font-weight: 700;
      margin: 60px 0 100px 0;
    }
    .catalog_border {
      border: 1px solid #999;
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

