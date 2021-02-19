<template>
  <div id="app" :class="theme">
    <router-view v-if="isRefresh"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isRefresh: true,
      theme: "theme-dark"
    };
  },
  methods: {
    // 页面刷新
    reload() {
      this.isRefresh = false;
      this.$nextTick(() => {
        this.isRefresh = true;
      });
    }
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  created() {
    if (window.localStorage.getItem("YH_BF_THEME")) {
      this.theme = window.localStorage.getItem("YH_BF_THEME");
    }
  },
  mounted() {
    window.addEventListener("setItem", e => {
      this.theme = e.newValue;
    });
  }
};
</script>
