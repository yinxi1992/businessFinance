<template>
  <div class="catalog">
    <Header />
    <border-image-box class="imageContainer">
      <div v-for="o in dataList" :key="o.name" class="card" @click="dologin(o)">
        <div class="catalog_border">
          <div class="context">
            <div class="rotate-box">
              <div class="rotate-circle"></div>
              <img :src="o.image" />
            </div>
            <p class="title">
              <i></i>
              {{o.name}}
            </p>
            <!-- <p class="subtitle">{{o.subtitle}}</p> -->
          </div>
        </div>
      </div>
    </border-image-box>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import borderImageBox from "@/components/common/borderImageBox/borderImageBox.vue";

export default {
  name: "login",
  components: {
    Header,
    borderImageBox
  },
  data() {
    return {
      dataList: [
        {
          name: "智能数据大屏",
          subtitle: "Smart data screen",
          index: "/bigScreen",
          image: "/static/images/Smart_data_screen.png"
        },
        {
          name: "综合报表查询",
          subtitle: "Consolidated report query",
          index: "/ticketRevenueForm",
          image: "/static/images/Consolidated_report_query.png"
        },
        {
          name: "基础数据管理",
          subtitle: "Basic Data Management ",
          index: "/basicData",
          image: "/static/images/Basic_Data_Management.png"
        },
        {
          name: "业务台账应用",
          subtitle: "Business reconciliation application",
          index: "/ledger",
          image: "/static/images/Business_reconciliation_application.png"
        },
        {
          name: "商务智能应用",
          subtitle: "BI Application",
          index: "/ledger",
          image: "/static/images/BI_Application.png"
        },
        {
          name: "预警信息管理",
          subtitle: "Early warning information management",
          index: "/bigScreen",
          image: "/static/images/Early_warning_information_management.png"
        },
        {
          name: "系统参数设定",
          subtitle: "System Parameter Setup",
          index: "/paramsSetting",
          image: "/static/images/System_Parameter_Setup.png"
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
  padding: 1vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: url("/static/images/bac.png") no-repeat;
  .imageContainer {
    flex: 1;
    margin-top: 1vh;
    padding: 5vh 0;

    .card {
      display: inline-block;
      width: 20%;
      height: 20vh;
      box-sizing: border-box;
      margin-bottom: 3vh;

      &:hover {
        cursor: pointer;

        .catalog_border {
          background: url("/static/images/card_active.png") no-repeat;
          background-size: 100% 100%;
          .context {
            text-align: center;

            .rotate-box {
              position: relative;
              .rotate-circle {
                background: url("/static/images/rotate_circle_active.png")
                  no-repeat;
                background-size: cover;
              }
            }
            .title {
              color: #38c5ef;
              i {
                background: url("/static/images/pointer_active.png") no-repeat;
                background-size: contain;
              }
            }
            .subtitle {
              color: #38c5ef;
            }
          }
        }
      }

      .catalog_border {
        height: 100%;
        width: 17vw;
        margin: 0 auto;
        background: url("/static/images/card_norm.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .context {
          text-align: center;

          .rotate-box {
            position: relative;
            .rotate-circle {
              height: 10vh;
              width: 10vh;
              background: url("/static/images/rotate_circle_norm.png") no-repeat;
              background-size: cover;
              margin: 0 auto;
              display: flex;
              align-items: center;
              justify-content: center;
              user-select: none;
              animation: rotate 10s linear infinite;
            }
            img {
              user-select: none;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .title {
            display: inline-block;
            font-size: 1rem;
            font-weight: bold;
            color: #effbff;
            margin: 1.2rem 0 0.5rem 0;
            position: relative;
            padding-left: 1vw;
            i {
              display: inline-block;
              content: "";
              width: (7rem/16);
              height: (7rem/16);
              background: url("/static/images/pointer_norm.png") no-repeat;
              background-size: contain;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: 0;
            }
          }
          .subtitle {
            font-size: (12rem/16);
            color: #97a9bc;
            text-transform: uppercase;
            margin: 0;
          }
        }
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

