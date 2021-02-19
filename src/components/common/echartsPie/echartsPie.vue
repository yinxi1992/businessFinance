<template>
  <div id="pie" style="width:100%;height:96%;" ref="pie"></div>
</template>

<script>
export default {
  props: ["option"],

  watch: {
    option: {
      handler(newV, oldV) {
        this.drawEcharts();
      },
      deep: true
    }
  },
  data() {
    return {
      pie: null
    };
  },

  methods: {
    drawEcharts() {
      // this.pie = this.$echarts.init(document.getElementById("pie"));
      this.pie = this.$echarts.init(this.$refs.pie);
      this.pie.setOption(this.option);
    },

    //监听自适应
    init() {
      setTimeout(() => {
        window.addEventListener("resize", () => {
          this.pie.resize();
        });
      }, 20);
    },
    destroyed() {
      window.removeEventListener("resize", this.init, 20);
    }
  },

  mounted() {
    this.drawEcharts();
    this.init();
  }
};
</script>

<style>
</style>
