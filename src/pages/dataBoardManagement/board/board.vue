<template>
  <div class="dashBoard">
    <!-- 统计 -->
    <div class="statement">
      <div class="state_left">
        <div class="timeSet">
          <p class="refresh-time">
            <span>刷新时间:</span>
            <span>{{lastRefreshTime}}</span>
          </p>
          <p class="refresh-frequency">
            <span>刷新频率:</span>
            <span>{{refreshFrequency}}分钟</span>
          </p>
          <p class="statistical-time">
            <span>统计时间段:</span>
            <span>{{statisticalTime}}</span>
          </p>
        </div>
        <div class="cont_top">
          <div class="cont_box" v-for="(v,i) in contentArr" :key="i">
            <div class="right">
              <p class="theTitle">{{v.title}}</p>
              <p class="theNumber">
                {{v.number | numberFormat}}
                <span class="unit">{{v.unit}}</span>
              </p>
              <p class="thePercent">
                <span>同比:</span>
                <span style="margin-right:10px;">
                  <i class="el-icon-caret-top increase"></i>
                  <span class="increase">4.56%</span>
                </span>
                <span>环比:</span>
                <span>
                  <i class="el-icon-caret-bottom decrease"></i>
                  <span class="decrease">2.87%</span>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="pie">
          <div class="pieEcharts">
            <echartsPie :option="pieOption"></echartsPie>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echartsPie from "@/components/common/echartsPie/echartsPie.vue";
import { getNowDate } from "@/assets/js/utils.js";
import { dataBoard } from "@/api/lib/api";
export default {
  components: {
    echartsPie
  },
  data() {
    return {
      pieOption: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: "center",
          data: ["场站营收", "车辆营收"]
        },
        title: {
          text: "当月营收占比（万元）",
          top: 30
        },
        color: ["#2AC9FD", "#76FBC0"],
        series: [
          {
            name: "当月营收占比（万元）",
            type: "pie",
            radius: ["30%", "40%"],
            labelLine: {
              normal: {
                length: 25,
                length2: 10,
                lineStyle: {
                  type: "solid"
                }
              }
            },
            data: [
              { value: 0, name: "场站营收" },
              { value: 0, name: "车辆营收" }
            ]
          }
        ]
      },
      contentArr: [
        {
          icon: "el-icon-tickets",
          bgcolor: "#fff",
          title: "当月累计营收",
          number: 0,
          unit: "元"
        },
        {
          icon: "el-icon-service",
          bgcolor: "#fff",
          title: "当月累计售票量",
          number: 0,
          unit: "张"
        },
        {
          icon: "el-icon-bell",
          bgcolor: "#fff",
          title: "当月累计发班数",
          number: 0,
          unit: "班"
        },
        {
          icon: "el-icon-news",
          bgcolor: "#fff",
          title: "当月客运周转量",
          number: 0,
          unit: "人公里"
        }
      ],
      // lastRefreshTime: "2020-01-10 18:40:32", // 最近一次刷新时间
      refreshFrequency: "2", // 刷新频率(单位:分钟)
      refreshTimer: null,
      statisticalTime: "2020年1月1日---2020年1月31日", // 统计时间段
      pollingInterval: null // 月统计数据轮询计时器
    };
  },
  mounted() {
    this.getDataBord();
    // 按照频率刷新页面
    this.pageRefresh();
    // 轮询当月累计数据
    this.polling();
  },

  methods: {
    // 按照频率刷新页面
    pageRefresh() {
      this.refreshTimer = setTimeout(() => {
        this.reload();
      }, this.refreshFrequency * 60 * 1000);
    },

    // 月统计数据轮询
    polling() {
      this.pollingInterval = setInterval(() => {
        this.getDataBord();
      }, 300000);
    },

    // 数据看板数据查询
    getDataBord() {
      dataBoard().then(res => {
        if (Object.keys(res.data).length) {
          // 当月累计营收
          this.contentArr[0].number = res.data.TotalIncome || 0;
          // 当月累计售票量
          this.contentArr[1].number = res.data.ticketNumber || 0;
          // 当月累计发班数
          this.contentArr[2].number = res.data.vehicleFrequency || 0;
          // 当月客运周转量
          this.contentArr[3].number = res.data.passengerPersonKilometres || 0;

          // 当月营收占比饼状图数据

          // 场站营收
          this.pieOption.series[0].data[0].value = res.data.sumYOY;
          // 车辆营收
          this.pieOption.series[0].data[1].value = res.data.vehicleSales;
        }
      });
    }
  },
  created() {},
  filters: {
    // 为数字每三位加逗号分隔
    numberFormat(num) {
      if (typeof num != "number" || num / 1000 < 1) {
        return num;
      } else {
        num = num + "";
        let arr = num.split("");
        arr.reverse();
        let tempArr = [];
        arr.forEach((item, index) => {
          tempArr.push(item);
          if (index % 3 == 2 && index != arr.length - 1) {
            tempArr.push(",");
          }
        });
        tempArr = tempArr.reverse();
        num = "";
        tempArr.forEach(item => {
          num += item;
        });
        return num;
      }
    }
  },
  computed: {
    lastRefreshTime: function() {
      return getNowDate();
    }
  },
  destroyed() {
    // 清空定时器
    clearTimeout(this.refreshTimer);
    clearInterval(this.pollingInterval);
  },
  inject: ["reload"]
};
</script>

<style lang="scss" scoped>
.dashBoard {
  margin: 0 auto;
  height: 100%;
  padding: (15rem/16);
  h3 {
    font-size: (18rem / 16);
    color: #333333;
  }

  .statement {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: #fff;
    .state_left {
      width: 100%;
      height: 100%;
      .cont_top {
        display: flex;
        justify-content: space-between;
        padding: 0 1vh;
        .cont_box {
          // height: 15vh;
          border-radius: (8rem/16);
          overflow: hidden;
          width: 23%;
          background-color: #fcfcfc;
          padding: 1vh 0;
          .right {
            height: 100%;
            // background: #fff;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: (20rem/16);
            box-sizing: border-box;
            .theTitle {
              font-size: $norm-lg-fontsize;
              font-weight: bold;
              color: #000;
              text-align: left;
              padding: 0 1vh;
            }
            .theNumber {
              font-size: (32rem / 16);
              font-weight: 700;
              color: $norm-blue;
              line-height: 10vh;
              padding: 0 1vh;
              border-bottom: 1px solid
                rgba($color: $norm-border-bottom-color, $alpha: 0.4);
              .unit {
                font-size: $norm-normal-fontsize;
                color: #000;
              }
            }
            .thePercent {
              padding: 0 1vh;
              margin-top: 1vh;
              text-align: right;
              font-size: $norm-normal-fontsize;
              .increase {
                color: #ff0000;
              }
              .decrease {
                color: #70b603;
              }
            }
          }
        }
      }
      .pie {
        display: flex;
        justify-content: space-between;
        height: 60%;
        padding: 0 1vh;
        .pieEcharts {
          width: 30%;
          height: 90%;
        }
      }
    }
  }
}
.timeSet {
  padding: 2vh;
  border-bottom: 1px solid rgba($color: $norm-border-bottom-color, $alpha: 0.4);
  margin-bottom: 2vh;
  font-size: $norm-normal-fontsize;
  .refresh-time {
    margin-right: 5vw;
  }
  .refresh-frequency {
  }
  .statistical-time {
    float: right;
  }
  p {
    display: inline-block;
    span {
      &:first-of-type {
        color: #000;
      }
      &:last-of-type {
        color: $norm-blue;
      }
    }
  }
}
</style>
