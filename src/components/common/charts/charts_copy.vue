<template>
  <div :id="id" class="chart" style="height:95%;"></div>
</template>

<script>
import echart_data from "@/assets/skin/js/echart_model.js";

export default {
  name: "hello",
  props: {
    option: {
      type: Object
    },
    id: {
      type: String
    }
  },
  watch: {
    option: {
      handler(newV, oldV) {
        this.drawLine();
      },
      deep: true
    }
  },
  data() {
    return {
      myChart: null,
      theme: window.localStorage.getItem("YH_BF_THEME")
    };
  },
  mounted() {
    if (this.option) {
      this.drawLine();
      this.init();
    }
    window.addEventListener("setItem", e => {
      this.theme = e.newValue;
      this.drawLine();
    });
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById(this.id));
      // 绘制图表
      this.myChart.setOption(this.darkOption);
    },
    //监听自适应
    init() {
      setTimeout(() => {
        window.addEventListener("resize", () => {
          this.myChart.resize();
        });
      }, 20);
    },
    destroyed() {
      window.removeEventListener("resize", this.init, 20);
    }
  },
  computed: {
    darkOption() {
      let config = {
        type: "cylinder",
        skin: this.$root.THEME_NAME,
        title: "自定义图表标题",
        xList: ["A-B", "B-C", "C-D", "D-E", "E-F"],
        data: [
          { typeA: 1, typeB: 2 },
          { typeA: 3, typeB: 4 },
          { typeA: 5, typeB: 6 },
          { typeA: 7, typeB: 8 },
          { typeA: 9, typeB: 10 }
        ]
      };

      let option = echart_data(config);

      console.log(option);
      return option;
    }
  }
};
</script>

<style scoped>
.chart {
  width: 100%;
}
</style>
