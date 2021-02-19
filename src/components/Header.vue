<template>
  <div class="header">
    <border-image-box :height="'50px'" class="left">
      <div class="conText">
        <div class="header_Img">
          <img src="/static/images/logo.png" />
        </div>
        <div class="system-name">
          <p>交旅业财一体化平台</p>
          <p>big-data integrated platform</p>
        </div>
      </div>
    </border-image-box>
    <border-image-box class="menu">
      <div class="breadcrumb">
        <div class="left-menu">
          <span
            :class="{ label: true, active: details.currentLevel === 1 }"
            @click="toLevel(1)"
            >{{ details.level1 }}</span
          >
          <span v-if="details.currentLevel >= 2">
            <i class="el-icon-arrow-right"></i>
            <span
              :class="{ label: true, active: details.currentLevel === 2 }"
              @click="toLevel(2)"
              >{{ details.level2 }}</span
            >
          </span>
          <span v-if="details.currentLevel >= 3">
            <i class="el-icon-arrow-right"></i>
            <span
              :class="{ label: true, active: details.currentLevel === 3 }"
              @click="toLevel(3)"
              >{{ details.level3 }}</span
            >
          </span>
        </div>
        <div class="right-menu">
          <span v-if="details.currentLevel !== 1" @click="decreaseLevel">
            <i class="el-icon-d-arrow-left"></i>
            <span>返回上一级</span>
          </span>
        </div>
      </div>
    </border-image-box>
    <border-image-box class="lgoin">
      <span class="welcome">欢迎你,admin</span>
      <i class="log-out"></i>
      <el-dropdown>
        <i class="sign-out logout"></i>
        <el-dropdown-menu slot="dropdown" trigger="click">
          <el-dropdown-item @click.native="back">
            <i class="log-out"></i>
            返回到主界面
          </el-dropdown-item>
          <el-dropdown-item @click.native="logOut">
            <i class="el-icon-right"></i>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </border-image-box>
  </div>
</template>

<script>
import borderImageBox from "@/components/common/borderImageBox/borderImageBox.vue";
export default {
  components: {
    borderImageBox
  },
  data() {
    return {};
  },
  methods: {
    logOut() {
      this.$router.push({ path: "/login" });
    },
    selectMenu(v) {
      console.log(v);
    },
    back() {
      this.$router.push({ path: "/catalog" });
    },
    onDarkTheme() {
      this.$addStorageEvent(1, "YH_BF_THEME", "theme-dark");
    },
    onLightTheme() {
      this.$addStorageEvent(1, "YH_BF_THEME", "theme-light");
    },
    // 返回上一级
    decreaseLevel() {
      if (this.details.currentLevel) {
        this.details.currentLevel--;
      }
    },
    // 跳转到指定层级
    toLevel(i) {
      this.details.currentLevel = i;
    }
  },
  computed: {
    link: {
      get() {
        return this.$store.state.report.link;
      },
      set(value) {
        this.$store.commit("changeLink", value);
      }
    },
    details: {
      get() {
        return this.$store.state.report.details;
      },
      set(value) {
        this.$store.commit("changeDetails", value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #fff;
  box-sizing: border-box;
  .left {
    box-sizing: border-box;
    margin-right: 1vh;
    width: (280rem/16);
    .conText {
      height: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: nowrap;
      align-items: center;
      .header_Img {
        width: (60rem/16);
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: auto;
          height: 100%;
        }
      }
      .system-name {
        p {
          margin: 0;
          font-family: Arial;
          &:first-of-type {
            font-size: (18rem/16);
            font-weight: bold;
            margin-bottom: 0.5rem;
            color: #effbff;
          }
          &:last-of-type {
            color: #97a9bc;
            text-transform: uppercase;
            font-size: (12rem/16);
          }
        }
      }
    }
  }

  .menu {
    flex: 1;
    box-sizing: border-box;
    position: relative;
    padding: 0 10px;
    display: flex;
    align-items: center;
    &::before,
    &::after {
      display: inline-block;
      content: "";
      height: 100%;
      width: 6px;
      background: url("/static/images/menu_icon.png") 50% no-repeat;
      position: absolute;
      top: 0;
    }
    &::before {
      left: 0;
    }
    &::after {
      transform: rotate(180deg);
      right: 0;
    }
    .breadcrumb {
      height: 100%;
      width: 100%;
      padding: 0 1vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left-menu {
        color: #97a9bc;
        font-size: (14rem/16);
        .label {
          cursor: pointer;
          transition: all 0.3s ease;
          &:hover {
            color: #1ec5ee;
          }
        }
        .active {
          color: #1ec5ee;
        }
      }
      .right-menu {
        color: #97a9bc;
        font-size: (14rem/16);
        span {
          cursor: pointer;
        }
      }
    }
  }
  .lgoin {
    display: flex;
    align-items: center;
    margin-left: 1vh;
    padding: 0 1vh;
    box-sizing: border-box;
    width: (280rem/16);
    .welcome {
      color: #ebfaff;
      margin-right: 5rem;
      font-size: (13rem/16);
      border-left: 2px solid #1ac3fe;
      padding-left: 6px;
    }
    .log-out,
    .sign-out {
      display: block;
      content: "";
      height: (15rem/16);
      width: (15rem/16);
    }
    .log-out {
      background: url("/static/images/log_out.png");
      margin-right: (24rem/16);
    }
    .sign-out {
      background: url("/static/images/sign_out.png");
    }
  }
  .el-dropdown {
    color: #abb7c2;
    cursor: pointer;
    .logout {
      margin-right: 1rem;
    }
  }
}

/deep/.return-back {
  .el-breadcrumb__inner {
    cursor: pointer;
  }
}
</style>
