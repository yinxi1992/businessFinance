/**
 * 
 * @param {string} type - echart类型: line->折线图  pie->饼图 cylinder->柱状图
 * @param {string} skin - 项目皮肤主题: light->亮色系 dark->暗色系
 * @param {string} title - 标题
 * @param {array} xList - x轴刻度
 * @param {array} data - 数据
 */

import ECHART_COLOR from "../static/echart_config.json";
import echartObj from 'echarts'

export default function ({ type, skin, title, xList, data }) {
  const keysList = Object.keys(data[0]);
  const scale_count = keysList.length;
  let legendDate = [];
  let seriesArr = []
  let seriesData = [];

  keysList.forEach((key, i) => {
    // 拼装legend.data数据
    legendDate.push({
      name: key,
      textStyle: {
        color: ECHART_COLOR[skin].typeText[i]
      }
    })
    // 拼装series数据结构
    seriesArr.push([]);
  })

  // 重新拼装data的value值
  let dataArr = [];
  data.forEach(item => {
    dataArr.push(Object.values(item))
  })
  dataArr.forEach((item, i) => {
    item.forEach((o, j) => {
      seriesArr[j][i] = o;
    })
  })

  // 生成echart配置对象,默认类型为折线图
  let option = {};
  switch (type) {
    case "cylinder":
      // 拼装series
      seriesArr.forEach((item, i) => {
        seriesData.push({
          name: legendDate[i].name,
          type: "bar",
          barMaxWidth: "8",
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: new echartObj.graphic.LinearGradient(0, 0, 0, 1, ECHART_COLOR[skin].cylinderBar[i]),
              barBorderRadius: [4, 4, 0, 0]
            }
          },
          data: [...item]
        })
      })
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ECHART_COLOR[skin].typeSign.slice(0, scale_count),
        legend: {
          data: legendDate,
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
            data: xList,
            axisLine: {
              show: true,
              lineStyle: {
                color: ECHART_COLOR[skin].xLine,
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
                color: ECHART_COLOR[skin].xLabel
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: ECHART_COLOR[skin].yLabel
              },
              formatter: "{value}"
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: [ECHART_COLOR[skin].yLine],
                width: 1,
                type: "solid"
              }
            },
            splitLine: {
              lineStyle: {
                color: ECHART_COLOR[skin].yLabel
              }
            }
          }
        ],
        series: seriesData
      }
      break;
    case "pie":
      option = {}
      break;
    default:
      // 拼装series
      seriesArr.forEach((item, i) => {
        seriesData.push({
          name: legendDate[i].name,
          type: "line",
          stack: "总量",
          smooth: true,
          data: [...item]
        })
      })
      option = {
        title: {
          text: title,
          left: "1%",
          textStyle: {
            color: ECHART_COLOR[skin].title,
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
        color: ECHART_COLOR[skin].typeSign.slice(0, scale_count),
        legend: {
          data: legendDate,
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
          data: xList,
          axisLine: {
            lineStyle: {
              color: ECHART_COLOR[skin].xLine
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: ECHART_COLOR[skin].xLabel
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
              color: ECHART_COLOR[skin].yLabel
            }
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: [ECHART_COLOR[skin].yLine]
            }
          }
        },
        series: seriesData
      };
  }

  return option;
}