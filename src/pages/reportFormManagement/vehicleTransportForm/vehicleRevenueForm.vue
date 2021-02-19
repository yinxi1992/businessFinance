<template>
  <div class="vehicleRevenueForm">
    <!-- 车辆收支综合报表 -->
    <border-image-box
      class="statement"
      height="calc(96vh - 108px)"
      v-if="showTitle"
    >
      <p class="title">
        <span>{{ title }}</span>
        <span>{{ subtitle }}</span>
      </p>
      <el-form
        :inline="true"
        ref="form"
        :model="requestObj"
        class="demo-form-inline form"
      >
        <el-form-item prop="line" label="所属线路：">
          <el-select v-model="requestObj.line" placeholder="请选择线路">
            <el-option label="全部" value="0"></el-option>
            <el-option label="1路" value="1"></el-option>
            <el-option label="2路" value="2"></el-option>
            <el-option label="3路" value="3"></el-option>
            <el-option label="4路" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="vehicleType" label="车辆类型：">
          <el-select
            v-model="requestObj.vehicleType"
            placeholder="请选择车辆类型"
          >
            <el-option label="全部" value="0"></el-option>
            <el-option label="四驱车" value="1"></el-option>
            <el-option label="遥控车" value="2"></el-option>
            <el-option label="玩具车" value="3"></el-option>
            <el-option label="碰碰车" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="businessModel" label="经营模式：">
          <el-select
            v-model="requestObj.businessModel"
            placeholder="请选择经营模式"
          >
            <el-option label="全部" value="0"></el-option>
            <el-option label="摆地摊" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 车辆收支综合报表 -->
      <el-table
        :data="tableData"
        height="calc(96vh - 152px - 3.75rem)"
        class="space-table"
        :cell-style="cellStyle"
        :header-cell-style="cellStyle"
        @row-click="onRowClick"
        :key="
          Number(
            Math.random()
              .toString()
              .substr(3, 5) + Date.now()
          ).toString(36)
        "
      >
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="plateNo" label="车牌号"> </el-table-column>
        <el-table-column prop="line" label="所属路线">
          <template slot-scope="scope">
            <span>{{ scope.row.line }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="车辆类型">
          <template slot-scope="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mode" label="经营模式">
          <template slot-scope="scope">
            <span>{{ scope.row.mode }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="thisMonthRevenue" label="本月营收">
          <template slot-scope="scope">
            <span>{{
              scope.row.thisMonthRevenue | numberFormat | addYuanSign
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lastMonthRevenue" label="上月营收">
          <template slot-scope="scope">
            <span>{{
              scope.row.lastMonthRevenue | numberFormat | addYuanSign
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="revenueYoY" label="同比">
          <template slot-scope="scope">
            <div
              :class="[
                { increase: scope.row.revenueYoY > 0 },
                { decrease: scope.row.revenueYoY < 0 }
              ]"
            >
              <i
                :class="[
                  { 'el-icon-caret-top': scope.row.revenueYoY > 0 },
                  { 'el-icon-caret-bottom': scope.row.revenueYoY < 0 }
                ]"
              ></i>
              <span>{{ scope.row.revenueYoY | format2Percent }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="thisYearTotalRevenue" label="本年累计">
          <template slot-scope="scope">
            <span>{{
              scope.row.thisYearTotalRevenue | numberFormat | addYuanSign
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="thisMonthCost" label="本月成本">
          <template slot-scope="scope">
            <span>{{
              scope.row.thisMonthCost | numberFormat | addYuanSign
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lastMonthCost" label="上月成本">
          <template slot-scope="scope">
            <span>{{
              scope.row.lastMonthCost | numberFormat | addYuanSign
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="costYoY" label="同比">
          <template slot-scope="scope">
            <div
              :class="[
                { increase: scope.row.costYoY > 0 },
                { decrease: scope.row.costYoY < 0 }
              ]"
            >
              <i
                :class="[
                  { 'el-icon-caret-top': scope.row.costYoY > 0 },
                  { 'el-icon-caret-bottom': scope.row.costYoY < 0 }
                ]"
              ></i>
              <span>{{ scope.row.costYoY | format2Percent }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="thisYearTotalCost" label="本年累计">
          <template slot-scope="scope">
            <span>{{
              scope.row.thisYearTotalCost | numberFormat | addYuanSign
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lastMonthProfit" label="上月利润">
          <template slot-scope="scope">
            <span>{{
              scope.row.lastMonthProfit | numberFormat | addYuanSign
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="profitYoY" label="同比">
          <template slot-scope="scope">
            <div
              :class="[
                { increase: scope.row.profitYoY > 0 },
                { decrease: scope.row.profitYoY < 0 }
              ]"
            >
              <i
                :class="[
                  { 'el-icon-caret-top': scope.row.profitYoY > 0 },
                  { 'el-icon-caret-bottom': scope.row.profitYoY < 0 }
                ]"
              ></i>
              <span>{{ scope.row.profitYoY | format2Percent }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="thisYearTotalProfit" label="本年累计">
          <template slot-scope="scope">
            <span>{{
              scope.row.thisYearTotalProfit | numberFormat | addYuanSign
            }}</span>
          </template>
        </el-table-column>
      </el-table>
    </border-image-box>

    <!-- 指定车辆月度运营数据 -->
    <border-image-box class="chart" :height="'28vh'" v-if="showFlexChart">
      <p class="title">
        <span>月度运营数据-川H12300</span>
        <span>Monthly operating data - 川H12300</span>
      </p>
      <div class="content">
        <div class="charts">
          <div class="line">
            <charts :option="lineOption" :id="id1" />
          </div>
          <div class="pie">
            <charts :option="pieOption" :id="id2" />
          </div>
        </div>
        <div class="arrow-top">
          <i class="el-icon-d-arrow-left" @click="onArrowClick"></i>
        </div>
      </div>
    </border-image-box>

    <border-image-box
      class="statement"
      height="53.5vh"
      v-if="showvehicleRevenuTable"
    >
      <el-form
        :inline="true"
        ref="form"
        :model="requestObj2"
        class="demo-form-inline form"
        v-if="showvehicleRevenuTable"
      >
        <el-form-item prop="dateRange" label="时间范围：">
          <el-date-picker
            v-model="requestObj2.dateRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="vehicleRevenuData"
        height="calc(65vh - 168px)"
        class="space-table"
        :cell-style="cellStyle2"
        :header-cell-style="cellStyle2"
        @row-click="onVehicleRevenuTableClick"
        :key="
          Number(
            Math.random()
              .toString()
              .substr(3, 5) + Date.now()
          ).toString(36)
        "
      >
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column label="时间" prop="date">
          <template slot-scope="scope">
            <span>{{ scope.row.date | numberFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="公交趟次" prop="busTrips">
          <template slot-scope="scope">
            <span>{{ scope.row.busTrips | numberFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="公交收入" prop="busIncome">
          <template slot-scope="scope">
            <span>{{ scope.row.busIncome | numberFormat | addYuanSign }}</span>
          </template>
        </el-table-column>
        <el-table-column label="包车趟次" prop="charteredVehicleTrips">
          <template slot-scope="scope">
            <span>{{ scope.row.charteredVehicleTrips | numberFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="包车收入" prop="charteredVehicleIncome">
          <template slot-scope="scope">
            <span>{{
              scope.row.charteredVehicleIncome | numberFormat | addYuanSign
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="当月总营收" prop="thisMonthRevenue">
          <template slot-scope="scope">
            <span>{{
              scope.row.thisMonthRevenue | numberFormat | addYuanSign
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="同比" prop="revenueYoY">
          <template slot-scope="scope">
            <div
              :class="[
                { increase: scope.row.revenueYoY > 0 },
                { decrease: scope.row.revenueYoY < 0 }
              ]"
            >
              <i
                :class="[
                  { 'el-icon-caret-top': scope.row.revenueYoY > 0 },
                  { 'el-icon-caret-bottom': scope.row.revenueYoY < 0 }
                ]"
              ></i>
              <span>{{ scope.row.revenueYoY | format2Percent }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="燃料费" prop="fuelCost">
          <template slot-scope="scope">
            <span>{{ scope.row.fuelCost | numberFormat | addYuanSign }}</span>
          </template>
        </el-table-column>
        <el-table-column label="维修费" prop="maintenanceFee">
          <template slot-scope="scope">
            <span>{{
              scope.row.maintenanceFee | numberFormat | addYuanSign
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="驾驶员工资" prop="driverSalary">
          <template slot-scope="scope">
            <span>{{
              scope.row.driverSalary | numberFormat | addYuanSign
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="保险" prop="Insurance">
          <template slot-scope="scope">
            <span>{{ scope.row.Insurance | numberFormat | addYuanSign }}</span>
          </template>
        </el-table-column>
        <el-table-column label="其他" prop="otherFee">
          <template slot-scope="scope">
            <span>{{ scope.row.otherFee | numberFormat | addYuanSign }}</span>
          </template>
        </el-table-column>
        <el-table-column label="当月总成本" prop="thisMonthTotalCost">
          <template slot-scope="scope">
            <span>{{
              scope.row.thisMonthTotalCost | numberFormat | addYuanSign
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="同比" prop="costYoY">
          <template slot-scope="scope">
            <div
              :class="[
                { increase: scope.row.costYoY > 0 },
                { decrease: scope.row.costYoY < 0 }
              ]"
            >
              <i
                :class="[
                  { 'el-icon-caret-top': scope.row.costYoY > 0 },
                  { 'el-icon-caret-bottom': scope.row.costYoY < 0 }
                ]"
              ></i>
              <span>{{ scope.row.costYoY | format2Percent }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="当月利润" prop="thisMonthProfit">
          <template slot-scope="scope">
            <span>{{
              scope.row.thisMonthProfit | numberFormat | addYuanSign
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="同比" prop="profitYoY">
          <template slot-scope="scope">
            <div
              :class="[
                { increase: scope.row.profitYoY > 0 },
                { decrease: scope.row.profitYoY < 0 }
              ]"
            >
              <i
                :class="[
                  { 'el-icon-caret-top': scope.row.profitYoY > 0 },
                  { 'el-icon-caret-bottom': scope.row.profitYoY < 0 }
                ]"
              ></i>
              <span>{{ scope.row.profitYoY | format2Percent }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </border-image-box>

    <!-- 指定车辆指定月度运营数据 -->
    <border-image-box
      class="statement"
      height="calc(96vh - 108px)"
      v-if="showSpecificData"
    >
      <p class="title" v-if="showSpecificData">
        <span>月度运营数据 - {{ requestObj3.plateNo }}</span>
        <span> Monthly operating data- {{ requestObj3.plateNo }}</span>
      </p>
      <el-form
        :inline="true"
        ref="form2"
        :model="requestObj3"
        class="demo-form-inline form"
        v-if="showSpecificData"
      >
        <el-form-item prop="dateRange">
          <el-date-picker
            v-model="requestObj3.dateRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="businessModel" label="类别：">
          <el-select v-model="requestObj3.type" placeholder="请选择类别">
            <el-option label="全部" :value="0"></el-option>
            <el-option label="收入" :value="1"></el-option>
            <el-option label="支出" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="specificData"
        height="calc(96vh - 152px - 3.75rem)"
        v-if="showSpecificData"
        :key="
          Number(
            Math.random()
              .toString()
              .substr(3, 5) + Date.now()
          ).toString(36)
        "
      >
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column label="时间" prop="date">
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类别" prop="category">
          <template slot-scope="scope">
            <span>{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类别明细" prop="categoryDetails">
          <template slot-scope="scope">
            <span>{{ scope.row.categoryDetails }}</span>
          </template>
        </el-table-column>
        <el-table-column label="金额" prop="amount">
          <template slot-scope="scope">
            <span>{{ scope.row.amount | numberFormat | addYuanSign }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人" prop="operator">
          <template slot-scope="scope">
            <span>{{ scope.row.operator }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位" prop="company">
          <template slot-scope="scope">
            <span>{{ scope.row.company }}</span>
          </template>
        </el-table-column>
        <el-table-column label="职位" prop="position">
          <template slot-scope="scope">
            <span>{{ scope.row.position }}</span>
          </template>
        </el-table-column>
      </el-table>
    </border-image-box>

    <page :total="total" @getPageData="getPageData"></page>
  </div>
</template>

<script>
import charts from "@/components/common/charts/charts.vue";
import page from "@/components/common/pagination/pagination.vue";
import borderImageBox from "@/components/common/borderImageBox/borderImageBox.vue";

export default {
  components: {
    page,
    charts,
    borderImageBox
  },
  data() {
    return {
      total: 100,
      title: "车辆收支综合报表",
      subtitle: "Comprehensive report of vehicle revenue and expenditure",
      requestObj: {
        line: "0",
        vehicleType: "0",
        businessModel: "0"
      },
      showFlexChart: false,
      showTitle: true,
      tableData: Array.from({ length: 20 }, (_, ids) => ({
        plateNo: "川AE86",
        line: "1路",
        type: "公交车",
        mode: "公车",
        thisMonthRevenue: 69760,
        lastMonthRevenue: 69760,
        thisYearTotalRevenue: 69760,
        revenueYoY: -0.0068,
        thisMonthCost: 6976004,
        lastMonthCost: 6976004,
        thisYearTotalCost: 6976004,
        costYoY: 0.0068,
        lastMonthProfit: 6976004,
        thisYearTotalProfit: 6976004,
        profitYoY: -0.0068
      })),
      vehicleRevenuData: Array.from({ length: 20 }, (_, ids) => ({
        date: "2020年6月",
        busTrips: 666,
        busIncome: 250,
        charteredVehicleTrips: 666,
        charteredVehicleIncome: 3600,
        thisMonthRevenue: 66666,
        revenueYoY: -0.005,
        fuelCost: 250,
        maintenanceFee: 55555,
        driverSalary: 1,
        Insurance: 0,
        otherFee: 3564,
        thisMonthTotalCost: 3565,
        costYoY: 0.0075,
        thisMonthProfit: 354,
        profitYoY: -0.5432
      })),
      id1: "id1",
      id2: "id2",
      lineOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        title: {
          text: "营收、成本、利润走势",
          left: "1%",
          textStyle: {
            color: "#1EC5EE",
            fontSize: 14,
            fontWeight: "bold"
          },
          top: 0
        },
        color: ["#2AC9FD", "#76FBC0", "#FDD93B"],
        legend: {
          data: ["同比", "当前", "成本"],
          // align: "bottom",
          // right: 5,
          bottom: 0,
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
          bottom: "11%",
          top: "15%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
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
            data: [201, 510, 215, 321, 548, 615, 124, 315, 454, 555, 654, 215]
          },
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
            data: [548, 654, 785, 215, 321, 546, 666, 147, 123, 547, 654, 178]
          },
          {
            name: "成本",
            type: "line",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#FDD93B" },
                  { offset: 1, color: "#F9BD2B" }
                ]),
                barBorderRadius: [4, 4, 0, 0]
              }
            },
            data: [654, 214, 654, 125, 874, 532, 145, 654, 751, 245, 545, 126]
          }
        ]
      },
      pieOption: {
        title: {
          text: "本年累计收入占比",
          left: 0,
          textStyle: {
            color: "#1EC5EE",
            fontSize: 14,
            fontWeight: "bold"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        grid: {
          left: "3%",
          right: "15%",
          bottom: "3%",
          top: "3%",
          containLabel: true
        },
        legend: {
          left: "center",
          bottom: 0,
          data: ["公交客运", "包车"],
          textStyle: {
            color: "#6E7072"
          },
          orient: "horizontal",
          itemWidth: 20,
          itemHeight: 10,
          itemGap: 10
        },
        series: [
          {
            name: "收入来源",
            type: "pie",
            radius: ["40%", "55%"],
            data: [
              {
                name: "公交客运",
                value: 6123,
                itemStyle: {
                  color: {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#1ADDFF" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#1890E9" // 100% 处的颜色
                      }
                    ]
                  }
                },
                label: {
                  color: "#1890E9"
                }
              },
              {
                name: "包车",
                value: 3877,
                itemStyle: {
                  color: {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#FDD93B" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#F9BD2B" // 100% 处的颜色
                      }
                    ]
                  }
                },
                label: {
                  color: "#F9BD2B"
                }
              }
            ]
          }
        ]
      },
      showvehicleRevenuTable: false,
      showSpecificData: false,
      requestObj2: {
        dateRange: []
      },
      requestObj3: {
        dateRange: [],
        plateNo: "川AE886",
        plateId: 1,
        type: 0
      },
      specificData: Array.from({ length: 20 }, (_, ids) => ({
        time: "2020-06-10 14:07:35",
        category: "收入",
        categoryDetails: "公交刷卡收入",
        amount: 3150,
        operator: "灭霸",
        company: "四川英海瑞特科技有限公司",
        position: "混子"
      }))
    };
  },
  methods: {
    getPageData(val) {
      let { pageSize, currentPage } = val;
      this.requestObj.pageNumValue = currentPage;
      this.requestObj.pageSizeValue = pageSize;
      this.getListFn();
    },
    onChartsFlex() {
      this.showFlexChart = !this.showFlexChart;
      this.showTitle = !this.showTitle;
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 4 || columnIndex === 8 || columnIndex === 12) {
        return "border-right: 2px solid rgba(0,0,0,0.5)";
      }
    },
    cellStyle2({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 7 || columnIndex === 14) {
        return "border-right: 2px solid rgba(0,0,0,0.5)";
      }
    },
    onRowClick(row) {
      this.showFlexChart = true;
      this.showTitle = false;
      this.showvehicleRevenuTable = true;
      this.$store.commit("changeDetailLevel", 2);
      this.$store.commit("changeTitle", {
        title: "月度运营数据 - ",
        subtitle: row.plateNo
      });
      this.$store.commit("changeLevel2", "月度运营数据");
    },
    onArrowClick() {
      this.showFlexChart = false;
      this.showTitle = true;
      this.showvehicleRevenuTable = false;
      this.showSpecificData = false;
      this.$store.commit("changeDetailLevel", 1);
    },
    // 指定月度运营数据表格行点击事件
    onVehicleRevenuTableClick(row) {
      this.showFlexChart = false;
      this.showvehicleRevenuTable = false;
      this.showSpecificData = true;
      this.$store.commit("changeDetailLevel", 3);
      this.$store.commit("changeTitle", {
        title: `${row.date}明细数据 - `
      });
      this.$store.commit("changeLevel3", `${row.date}明细数据`);
    }
  },
  mounted() {
    // 向VueX中添加link信息
    this.$store.commit("changeLink", {
      path: this.$route.path,
      title: this.$route.meta.title
    });
    // 向VueX中添加详细信息
    this.$store.commit("changeDetails", {
      currentLevel: 1,
      totalLevel: 3,
      title: "车辆收支统计报表",
      subtitle: ""
    });
    this.$store.commit("changeLevel1", "车辆收支综合报表");
  },
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
    },
    addYuanSign(num) {
      return `￥${num}`;
    },
    format2Percent(num) {
      return `${Math.abs((num * 100).toFixed(2))}%`;
    }
  },
  watch: {
    "$store.state.report.details": {
      handler(val) {
        if (val.currentLevel === 1) {
          // 还原页面至step1
          this.showFlexChart = false;
          this.showTitle = true;
          this.showvehicleRevenuTable = false;
          this.showSpecificData = false;
          // 设置title
          this.$store.commit("changeTitle", {
            title: "车辆收支统计报表",
            subtitle: " "
          });
        } else if (val.currentLevel === 2) {
          // 还原页面至step2
          this.showFlexChart = true;
          this.showTitle = false;
          this.showvehicleRevenuTable = true;
          this.showSpecificData = false;
          // 设置title
          this.$store.commit("changeTitle", {
            title: "月度运营数据 - ",
            subtitle: val.subtitle
          });
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.vehicleRevenueForm {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  .form {
    margin-bottom: 1rem;
  }

  .chart {
    margin-bottom: 1vh;
    display: flex;
    flex-direction: column;

    .title {
      height: (24rem/15);
    }

    .content {
      flex: 1;
      display: flex;
      flex-wrap: nowrap;
      .charts {
        flex: 1;
        display: flex;
        flex-wrap: nowrap;
        height: 23vh;
        .line {
          flex: 3;
          height: 23vh;
        }
        .pie {
          flex: 1;
          height: 23vh;
        }
      }
      .arrow-top {
        width: (30rem/16);
        display: flex;
        align-items: flex-end;
        justify-content: center;
        i {
          line-height: (30rem/16);
          width: (30rem/16);
          height: (30rem/16);
          background-color: rgba($color: #394d66, $alpha: 0.45);
          border: 1px solid #394d66;
          border-radius: 4px;
          color: #fff;
          transform: rotate(90deg);
          display: flex;
          justify-content: center;
          cursor: pointer;
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
}

.comprehensive-report {
  height: 100%;
  width: 100%;
  background-color: #fff;
}
.monthly-report {
  height: 100%;
  width: 100%;
}
.designated-month-report {
  height: 100%;
  width: 100%;
}

/deep/.space-table {
  table tbody {
    tr {
      cursor: pointer;
    }
  }
}
</style>
