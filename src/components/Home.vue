<template>
  <div class="home">
    <el-container class="container">
      <el-header>
        <my-header />
      </el-header>
      <el-container>
        <side-bar />
        <el-main>
          <router-view />
        </el-main>
        <my-footer />
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sideBar from "@/components/sideBar.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import borderImageBox from "@/components/common/borderImageBox/borderImageBox.vue";

export default {
  components: {
    "side-bar": sideBar,
    "my-header": Header,
    "my-footer": Footer,
    borderImageBox
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  background: url("/static/images/bac.png") no-repeat;
  background-size: cover;
  .container {
    height: 100%;
    border: 1px solid #000000;
    padding: 1vh;
    overflow: hidden;
  }
  .el-main {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .el-aside {
    margin-right: 1vh;
    display: flex;
    flex-direction: column;
  }
}
</style>
