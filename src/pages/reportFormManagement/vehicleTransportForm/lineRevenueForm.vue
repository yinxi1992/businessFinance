<template>
  <div class="lineRevenueForm">
    <border-image-box class="statement">
      <p class="title">
        <span>{{title}}</span>
        <span>{{subtitle}}</span>
      </p>
      <div class="btnBox">
        <div class="right_con">
          <el-form :inline="true" ref="form" :model="requestObj" class="demo-form-inline">
            <el-form-item label="时间范围:" prop="beginTime">
              <el-date-picker
                v-model="requestObj.timeRange"
                type="monthrange"
                range-separator="至"
                format="yyyy-MM"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getListFn">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="main_con">
        <div class="bottom">
          <el-table :data="tableData" @row-click="handdle">
            <el-table-column prop="lineName" label="线路名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="vehicleFrequency" label="发班数" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="serviceLoad" label="实载率" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="totalRevenue" label="营收金额" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="lastYear" label="同期" :show-overflow-tooltip="true" class="yoy"></el-table-column>
            <el-table-column label="同比" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div :class="[{ 'increase': scope.row.yoy > 0 }, {'decrease':scope.row.yoy<0}]">
                  <i
                    :class="[{ 'el-icon-caret-top': scope.row.yoy > 0 }, {'el-icon-caret-bottom':scope.row.yoy<0}]"
                  ></i>
                  <span>{{scope.row.yoy | yoyFilter}}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </border-image-box>

    <page :total="total" @getPageData="getPageData"></page>

    <!--操作列表-->
    <el-drawer
      :close-on-click-modal="false"
      title="线路基础数据"
      :visible.sync="showDialog"
      v-if="showDialog"
      :show-close="false"
      class="form-drawer"
    >
      <el-row class="dialog_header">
        <el-col :span="12">
          <div class="dialog_data">
            <span class="dialog_data_title">公里数：</span>
            <span class="dialog_data_num">{{diaDate.transportamount}}公里</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="dialog_data">
            <span class="dialog_data_title">估计时间：</span>
            <span class="dialog_data_num">{{diaDate.estimatedTime}}小时</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="dialog_data">
            <span class="dialog_data_title">票价：</span>
            <span class="dialog_data_num">&yen;{{diaDate.price}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="dialog_data">
            <span class="dialog_data_title">每月平均发班：</span>
            <span class="dialog_data_num">{{diaDate.AVGvf}}班</span>
          </div>
        </el-col>
      </el-row>
      <div class="dialog_chart">
        <div class="pieBox">
          <charts :option="revenueOption" :id="id1" />
        </div>
        <div class="pieBox">
          <charts :option="loadOption" :id="id2" />
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import charts from "@/components/common/charts/charts.vue";
import echarts from "echarts";
import page from "@/components/common/pagination/pagination.vue";
import borderImageBox from "@/components/common/borderImageBox/borderImageBox.vue";
import {
  lineRevenueReportform,
  lineRevenueReportformCount,
  popupTpe,
  popupVf,
  popupRevenueTrend,
  popupServiceLoadTrend
} from "@/api/lib/api";
import {
  getCurrentMonth,
  changeNumberAccuracy,
  PrefixZero
} from "@/assets/js/utils.js";

export default {
  components: {
    page,
    charts,
    borderImageBox
  },
  data() {
    return {
      title: "",
      subtitle: "",
      requestObj: {
        pageSizeValue: 10,
        pageNumValue: 1,
        timeRange: [
          new Date(
            `${new Date().getFullYear() - 1}-${new Date().getMonth() + 1}`
          ),
          new Date()
        ]
      },
      diaDate: {
        transportamount: 0, // 公里数
        estimatedTime: 0, // 估计时间
        price: 0, // 票价
        AVGvf: 0 // 每月平均发班
      },
      showDialog: false,
      tableData: [],
      editData: {},
      total: 0,
      id1: "line1",
      id2: "line2",
      revenueOption: {
        title: {
          text: "营收走势分析",
          left: "1%",
          textStyle: {
            color: "#1EC5EE",
            fontSize: 14,
            fontWeight: "bold"
          },
          top: 10
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["#2AC9FD", "#76FBC0"],
        legend: {
          data: [
            { name: "始发站-终点站", textStyle: { color: "#abb7c2" } },
            { name: "省内同类班线平均值", textStyle: { color: "#abb7c2" } }
          ],
          bottom: 0
          // padding: [20, 0, 20, 0]
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: {
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
              color: "#01ADFF"
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#A6A6A6" //更改坐标轴文字颜色
            }
          }
        },
        yAxis: {
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
              color: "#ABB7C2" //更改坐标轴文字颜色
            }
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: ["#ABB7C2"]
            }
          }
        },
        series: [
          {
            name: "始发站-终点站",
            type: "line",
            stack: "总量",
            smooth: true,
            data: [0, 0, 0, 0, 0]
          },
          {
            name: "省内同类班线平均值",
            type: "line",
            stack: "总量",
            smooth: true,
            data: [0, 0, 0, 0, 0]
          }
        ]
      },
      loadOption: {
        title: {
          text: "实载率走势分析",
          left: "1%",
          textStyle: {
            color: "#1EC5EE",
            fontSize: 14,
            fontWeight: "bold"
          },
          top: 10
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["#2AC9FD"],
        legend: {
          data: [{ name: "始发站-终点站", textStyle: { color: "#abb7c2" } }],
          bottom: 0
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: {
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
          boundaryGap: true
        },
        yAxis: {
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
        },
        series: [
          {
            name: "始发站-终点站",
            type: "line",
            stack: "总量",
            smooth: true,
            data: [0, 0, 0, 0, 0]
          }
        ]
      }
    };
  },
  methods: {
    getPageData(val) {
      let { pageSize, currentPage } = val;
      this.requestObj.pageNumValue = currentPage;
      this.requestObj.pageSizeValue = pageSize;
      this.getListFn();
    },
    /* 表单重置 */
    reset() {
      (this.requestObj = {
        pageNumValue: 1,
        pageSizeValue: 10,
        timeRange: [new Date(), new Date()]
      }),
        this.getListFn();
    },
    handdle(v) {
      // 清空dialog数据,避免打开dialog时会短暂显示上一条数据的信息
      this.diaDate = {
        transportamount: 0,
        estimatedTime: 0,
        price: 0,
        AVGvf: 0
      };
      this.revenueOption.xAxis.data = [];
      this.revenueOption.series[0].data = [];
      this.revenueOption.series[1].data = [];
      this.loadOption.xAxis.data = [];
      this.loadOption.series[0].data = [];
      // 加载当前所选记录的信息
      this.revenueOption.legend.data[0].name = lineName;
      this.revenueOption.series[0].name = lineName;
      this.revenueOption.legend.data[0].name = lineName;
      this.revenueOption.series[0].name = lineName;
      this.loadOption.legend.data[0].name = lineName;
      this.loadOption.series[0].name = lineName;
      // 查询数据
      this.showDialog = true;
      let { time, lineName } = { ...v };
      let data = {
        pageNumValue: this.requestObj.pageNumValue,
        pageSizeValue: this.requestObj.pageSizeValue,
        startDate: `${this.requestObj.timeRange[0].getFullYear()}-${PrefixZero(
          this.requestObj.timeRange[0].getMonth() + 1,
          2
        )}`,
        endDate: `${this.requestObj.timeRange[1].getFullYear()}-${PrefixZero(
          this.requestObj.timeRange[1].getMonth() + 1,
          2
        )}`,
        lineName: v.lineName
      };
      popupTpe({ ...data }).then(res => {
        if (res.code === 200) {
          const result = JSON.parse(res.body)[0];
          // 公里数
          this.diaDate.transportamount = result.transportamount;
          // 票价
          this.diaDate.price = result.price;
          // 估计时间
          this.diaDate.estimatedTime = result.estimatedTime;
        }
      });
      // 平均每月发班数
      popupVf({ ...data }).then(res => {
        if (res.code === 200) {
          const result = JSON.parse(res.body)[0];
          this.diaDate.AVGvf = changeNumberAccuracy(result.AVGvf, 2);
        }
      });
      // 营收走势
      popupRevenueTrend({ ...data }).then(res => {
        if (res.code === 200) {
          const result = JSON.parse(res.body);
          let dateList = [];
          let lineData = [];
          let sameTypeLineData = [];
          result.forEach(item => {
            dateList.push(item.time);
            lineData.push(item.totalRevenue);
            sameTypeLineData.push(item.sameType || 0);
          });
          this.revenueOption.xAxis.data = dateList;
          this.revenueOption.series[0].data = lineData;
          this.revenueOption.series[1].data = sameTypeLineData;
        }
      });
      // 实载率走势
      popupServiceLoadTrend({ ...data }).then(res => {
        if (res.code === 200) {
          const result = JSON.parse(res.body);
          let dateList = [];
          let loadData = [];
          result.forEach(item => {
            dateList.push(item.time);
            loadData.push(changeNumberAccuracy(item.serviceLoad, 2));
          });
          this.loadOption.xAxis.data = dateList;
          this.loadOption.series[0].data = loadData;
        } else {
          console.log(res.message);
        }
      });
    },
    getListFn() {
      this.tableData = [];
      let _this = this;
      let data = {
        pageNumValue: _this.requestObj.pageNumValue,
        pageSizeValue: _this.requestObj.pageSizeValue,
        startDate: `${_this.requestObj.timeRange[0].getFullYear()}-${PrefixZero(
          _this.requestObj.timeRange[0].getMonth() + 1,
          2
        )}`,
        endDate: `${_this.requestObj.timeRange[1].getFullYear()}-${PrefixZero(
          _this.requestObj.timeRange[1].getMonth() + 1,
          2
        )}`
      };
      lineRevenueReportform({ ...data }).then(res => {
        if (res.code === 200) {
          const result = JSON.parse(res.body);
          this.tableData = result;
          this.tableData.forEach(item => {
            item.serviceLoad = changeNumberAccuracy(item.serviceLoad, 2);
            item.yoy = changeNumberAccuracy(item.yoy, 2);
            item.serviceLoad = changeNumberAccuracy(item.serviceLoad, 2);
            item.totalRevenue = changeNumberAccuracy(item.totalRevenue, 2);
            item.lastYear = changeNumberAccuracy(item.lastYear, 2);
            item.yoy = changeNumberAccuracy(item.yoy, 2);
          });
        } else {
          this.tableData = [];
        }
      });
      lineRevenueReportformCount({ ...data }).then(res => {
        if (res.code === 200) {
          const result = JSON.parse(res.body);
          this.total = result[0].num;
        } else {
          this.total = 0;
        }
      });
    }
  },
  created() {
    this.getListFn();
  },
  filters: {
    yoyFilter(yoy) {
      return yoy == 0 ? "0" : `${yoy.toString().replace("-", "")}%`;
    }
  },

  mounted() {
    //折线图
    this.title = this.$route.meta.title;
    this.subtitle = this.$route.meta.subtitle;
  },
  watch: {
    $route(v) {
      this.title = v.meta.title;
      this.subtitle = v.meta.subtitle;
    }
  }
};
</script>

<style lang="scss" scoped>
.lineRevenueForm {
  height: 100%;
  display: flex;
  flex-direction: column;
  .statement {
    display: flex;
    justify-content: space-between;
    height: 100%;
    flex-direction: column;
    // overflow: auto;
    .btnBox {
      display: flex;
      width: 100%;
      height: 5vh;
      justify-content: space-between;
      flex: 0;
      margin-bottom: (20rem/16);
    }
    .main_con {
      flex: 6;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .bottom {
        flex: 1;
      }
    }
    td,
    th {
      text-align: center !important;
    }
  }
  .dialog_header {
    border-bottom: 1px solid #394859;
    .dialog_data {
      margin-bottom: (20rem/16);
      .dialog_data_title {
        display: inline-block;
        width: (100rem/16);
        text-align: right;
      }
      .dialog_data_num {
        color: #4ca7e8;
      }
    }
  }

  .dialog_chart {
    flex: 1;
    display: flex;
    flex-direction: column;
    .pieBox {
      flex: 1;

      &:first-of-type {
        border-bottom: 1px solid #394859;
      }
    }
  }
}
.increase {
  color: #f74646;
}
.decrease {
  color: #10c35a;
}
.title {
  margin: 0 0 (20rem/16);
  display: flex;
  flex-wrap: nowrap;
  &::before {
    display: inline-block;
    content: "";
    width: 7px;
    height: 7px;
    background: url("/static/images/standbook_icon.png") no-repeat;
    align-self: center;
    margin-left: (6rem/16);
    margin-right: (10rem/16);
  }
  span {
    &:first-of-type {
      font-weight: bold;
      font-size: (24rem/16);
      color: #e4f3f8;
      margin-right: 1rem;
    }
    &:last-of-type {
      font-size: (14rem/16);
      font-family: Arial;
      color: #97a9bc;
      text-transform: uppercase;
      align-self: flex-end;
    }
  }
}
</style>