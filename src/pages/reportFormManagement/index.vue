<template>
  <div class="appSystem">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      console.log("reloading");
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    }
  },
  mounted() {
    // window.addEventListener("resize", () => {
    //   this.reload();
    // });
  }
};
</script>

<style lang="scss" scoped>
.appSystem {
  flex: 1;
  overflow: hidden;
}
</style>
