<template>
  <date-screen :title="title">
    <div slot="firstLeft">
      <p class="theTitle">{{contentArr[0].title}}</p>
      <p>
        <span class="theNumber">{{contentArr[0].number | numberFormat}}</span>
        <span class="theUnit">{{contentArr[0].unit}}</span>
      </p>
    </div>
    <div slot="firstRight">
      <p class="theTitle">{{contentArr[1].title}}</p>
      <p>
        <span class="theNumber">{{contentArr[1].number | numberFormat}}</span>
        <span class="theUnit">{{contentArr[1].unit}}</span>
      </p>
    </div>
    <div slot="secondLeft">
      <p class="theTitle">{{contentArr[2].title}}</p>
      <p>
        <span class="theNumber">{{contentArr[2].number | numberFormat}}</span>
        <span class="theUnit">{{contentArr[2].unit}}</span>
      </p>
    </div>
    <div slot="secondRight">
      <p class="theTitle">{{contentArr[3].title}}</p>
      <p>
        <span class="theNumber">{{contentArr[3].number | numberFormat}}</span>
        <span class="theUnit">{{contentArr[3].unit}}</span>
      </p>
    </div>
    <div slot="thirdLeft">
      <echartsPie :option="lineAxhubOption"></echartsPie>
    </div>
    <div slot="thirdRight">
      <echartsPie :option="carAxhubOption"></echartsPie>
    </div>
    <div slot="bottomFirst"></div>
    <div slot="bottomSecond"></div>
    <div slot="bottomThird"></div>
    <div slot="bottomFourth"></div>
  </date-screen>
</template>

<script>
import dateScreen from "@/components/common/fullScreen/dateScreen.vue";
import echartsPie from "@/components/common/echartsPie/echartsPie.vue";
import {
  dataBoardTotalIncome,
  dataBoardTicketNumber,
  dataBoardVehicleFrequency,
  dataBoardPassengerPersonKilometres,
  dataBoardLineTotal,
  dataBoardLineCirculation
} from "@/api/lib/api";

export default {
  name: "carPassengeerBusiness",
  components: {
    dateScreen,
    echartsPie
  },
  data() {
    return {
      title: "交旅业财一体化平台-数据大屏",
      timer: null, // 定时器
      timeRange: 2, // 定时器执行周期(单位:min)
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
      lineAxhubOption: {
        title: {
          text: "当月线路累计营收排行",
          left: "1%",
          textStyle: {
            color: "#02a7f0",
            fontSize: 24,
            fontWeight: "bold"
          }
        },
        color: ["#1880DE"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "始发站-终点站",
              "始发站-终点站",
              "始发站-终点站",
              "始发站-终点站",
              "始发站-终点站"
            ],
            axisLine: {
              lineStyle: {
                color: "#737373"
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#A6A6A6" //更改坐标轴文字颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#A6A6A6" //更改坐标轴文字颜色
              }
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: ["#404040"]
              }
            }
          }
        ],
        series: [
          {
            name: "total",
            type: "bar",
            barWidth: "30%",
            data: [0, 0, 0, 0, 0]
          }
        ]
      },
      carAxhubOption: {
        title: {
          text: "当月累计发班量排行",
          left: "1%",
          textStyle: {
            color: "#02a7f0",
            fontSize: 24,
            fontWeight: "bold"
          }
        },
        color: ["#1880DE"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "始发站-终点站",
              "始发站-终点站",
              "始发站-终点站",
              "始发站-终点站",
              "始发站-终点站"
            ],
            axisLine: {
              lineStyle: {
                color: "#737373"
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#A6A6A6" //更改坐标轴文字颜色
              }
            },
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#A6A6A6" //更改坐标轴文字颜色
              }
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: ["#404040"]
              }
            }
          }
        ],
        series: [
          {
            name: "total",
            type: "bar",
            barWidth: "30%",
            data: [0, 0, 0, 0, 0]
          }
        ]
      }
    };
  },
  created() {
    this.getListFn();
  },
  methods: {
    getListFn() {
      // 当月累计营收
      dataBoardTotalIncome().then(res => {
        if (res.code === 200) {
          const result = JSON.parse(res.body)[0];
          this.contentArr[0].number = result["sum(price)"];
        }
      });
      // 当月累计售票量
      dataBoardTicketNumber().then(res => {
        if (res.code === 200) {
          const result = JSON.parse(res.body)[0];
          this.contentArr[1].number = result["count(1)"];
        }
      });
      // 当月累计发班数
      dataBoardVehicleFrequency().then(res => {
        if (res.code === 200) {
          const result = JSON.parse(res.body)[0];
          this.contentArr[2].number = result["count(1)"];
        }
      });
      // 当月客运周转量
      dataBoardPassengerPersonKilometres().then(res => {
        if (res.code === 200) {
          const result = JSON.parse(res.body)[0];
          this.contentArr[3].number = result.num;
        }
      });
      // 当月线路累计营收排行
      dataBoardLineTotal().then(res => {
        if (res.code === 200) {
          const result = JSON.parse(res.body);
          let lineList1 = []; // 线路
          let revenue = []; // 营收
          result.forEach(item => {
            lineList1.push(item.line);
            revenue.push(item.money);
          });
          this.lineAxhubOption.xAxis[0].data = lineList1;
          this.lineAxhubOption.series[0].data = revenue;
        }
      });
      // 当月累计发班量排行
      dataBoardLineCirculation().then(res => {
        if (res.code === 200) {
          const result = JSON.parse(res.body);
          let lineList2 = []; // 线路
          let departures = []; // 发班量
          result.slice(0, 5).forEach(item => {
            lineList2.push(item.line);
            departures.push(item.cun);
          });
          this.carAxhubOption.xAxis[0].data = lineList2;
          this.carAxhubOption.series[0].data = departures;
        }
      });
    }
  },
  mounted() {
    // 开启定时访问
    this.timer = setInterval(() => {
      this.getListFn();
    }, this.timeRange * 60 * 1000);
  },
  destroyed() {
    // 清除定时器
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
.theTitle {
  color: #02a7f0;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}
p:nth-of-type(2) {
  text-align: center;
  margin: 0;
  .theNumber {
    color: #fff;
    font-size: 3rem;
    font-weight: bold;
    line-height: 2;
  }
  .theUnit {
    color: #86a6bd;
    font-size: 1.5rem;
  }
}
</style>