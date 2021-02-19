<template>
  <div id="cyclinder" style="width:100%;height:96%"></div>
</template>

<script>
export default {
  props: ["option"],

  //监听props改变 重绘echarts
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
      cyclinder: null
    };
  },

  methods: {
    drawEcharts() {
      this.cyclinder = this.$echarts.init(document.getElementById("cyclinder"));
      this.cyclinder.setOption(this.option);
    },

    //监听自适应
    init() {
      setTimeout(() => {
        window.addEventListener("resize", () => {
          this.cyclinder.resize();
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
