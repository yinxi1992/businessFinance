<template>
  <div class="ticketRevenueForm">
    <border-image-box class="statement">
      <p class="title">
        <span>{{ title }}</span>
        <span>{{ subtitle }}</span>
      </p>
      <div class="btnBox">
        <div class="echart_con">
          <el-form
            :inline="true"
            ref="form"
            :model="requestObj"
            class="demo-form-inline"
          >
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
            <el-form-item class="export">
              <el-button @click="exportForm" type="primary">导出报表</el-button>
            </el-form-item>
          </el-form>
          <echartsCyclinder :option="cyclinderOption"></echartsCyclinder>
        </div>
      </div>
      <div class="main_con">
        <div class="bottom">
          <!-- <el-table :data="tableData" height="43.5vh"> -->
          <el-table :data="tableData" height="100%">
            <el-table-column
              prop="time"
              label="时间"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column label="售票量" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.ticketAmount | numberFormat }}</span>
              </template>
            </el-table-column>
            <el-table-column label="窗口售票" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.windosTicket | numberFormat }}</span>
              </template>
            </el-table-column>
            <el-table-column label="网络售票" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.networkTickets | numberFormat }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="totalRevenue"
              label="合计营收"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span>&yen;{{ scope.row.totalRevenue | numberFormat }}</span>
              </template>
            </el-table-column>
            <el-table-column label="同比" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div
                  :class="[
                    { increase: scope.row.yoy > 0 },
                    { decrease: scope.row.yoy < 0 }
                  ]"
                >
                  <i
                    :class="[
                      { 'el-icon-caret-top': scope.row.yoy > 0 },
                      { 'el-icon-caret-bottom': scope.row.yoy < 0 }
                    ]"
                  ></i>
                  <span>{{ scope.row.yoy | yoyFilter }}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </border-image-box>
    <page :total="total" @getPageData="getPageData"></page>
  </div>
</template>

<script>
import echartsCyclinder from "@/components/common/echartsCyclinder/echartsCyclinder.vue";
import page from "@/components/common/pagination/pagination.vue";
import borderImageBox from "@/components/common/borderImageBox/borderImageBox.vue";
import { ticketRevenueReport, ticketRevenueReportConut } from "@/api/lib/api";
import {
  getCurrentMonth,
  changeNumberAccuracy,
  PrefixZero
} from "@/assets/js/utils.js";

export default {
  components: {
    page,
    echartsCyclinder,
    borderImageBox
  },

  created() {
    this.getListFn();
  },

  data() {
    return {
      title: "",
      subtitle: "",
      tableData: [],
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
      editData: {},
      pageSize: 10,
      currentPage: 1,
      total: 0,
      cyclinderOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["#2AC9FD", "#76FBC0"],
        legend: {
          data: ["当前", "同比"],
          // align: "bottom",
          // right: 5,
          bottom: 10,
          textStyle: {
            color: "#6E7072"
          },
          orient: "horizontal",
          itemWidth: 20,
          itemHeight: 10,
          itemGap: 10
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "15%",
          top: "8%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisLine: {
              show: true,
              lineStyle: {
                color: "#ccc",
                width: 1,
                type: "solid"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#6E7072"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#6E7072"
              },
              formatter: "{value}"
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#000",
                width: 1,
                type: "solid"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#ccc"
              }
            }
          }
        ],
        series: [
          {
            name: "当前",
            type: "bar",
            barMaxWidth: "8",
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#19FFAA" },
                  { offset: 1, color: "#13C37F" }
                ]),
                barBorderRadius: [4, 4, 0, 0]
              }
            },
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "同比",
            type: "bar",
            barMaxWidth: "8",
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#1ADEFF" },
                  { offset: 1, color: "#1BA8FF" }
                ]),
                barBorderRadius: [4, 4, 0, 0]
              }
            },
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
    getListFn() {
      this.tableData = [];
      var _this = this;
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
      // 查询数据
      ticketRevenueReport({ ...data }).then(res => {
        if (res.code === 200) {
          const result = JSON.parse(res.body);
          if (result.length) {
            let dateList = [];
            let thisYear = [];
            let lastYear = [];
            result.forEach(item => {
              dateList.push(item.time);
              thisYear.push(item.ticketAmount);
              lastYear.push(item.lastYear);
            });
            // 柱状图
            _this.cyclinderOption.xAxis[0].data = dateList;
            _this.cyclinderOption.series[0].data = thisYear;
            _this.cyclinderOption.series[1].data = lastYear;
            // 表格
            _this.tableData = result;
          }
        } else {
          console.log("error");
        }
      });
      // 表格总数
      ticketRevenueReportConut({ ...data }).then(res => {
        if (res.code === 200) {
          const result = JSON.parse(res.body);
          _this.total = result[0].num;
        } else {
          _this.total = 0;
        }
      });
    },
    // 导出报表
    exportForm() {
      // TODO
      console.log("export form data");
    }
  },
  mounted() {
    this.title = this.$route.meta.title;
    this.subtitle = this.$route.meta.subtitle;
  },
  filters: {
    yoyFilter(yoy) {
      return yoy == 0 ? "0" : `${yoy.toString().replace("-", "")}%`;
    }
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
.ticketRevenueForm {
  height: 100%;
  display: flex;
  flex-direction: column;
  .statement {
    display: flex;
    justify-content: space-between;
    height: 100%;
    flex-direction: column;
    .echart_con {
      width: 100%;
      height: 100%;
      .export {
        float: right;
      }
    }
    .btnBox {
      flex: 4;
      width: 100%;
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
