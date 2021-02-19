<template>
  <div ref="box" class="box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "borderImageBox",
  props: {
    repeat: {
      type: String,
      default: "stretch"
    },
    height: {
      type: String,
      default: "100%"
    },
    width: {
      type: String
    }
  },
  methods: {
    addStyle() {
      let box = this.$refs.box;
      box.style.borderImageRepeat = this.repeat;
      box.style.height = this.height;
      if (this.width) {
        box.style.width = `${this.width.replace("px", "") / 16}rem`;
      }
    }
  },
  mounted() {
    this.addStyle();
  },
  watch: {
    height(val) {
      this.$refs.box.style.height = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  border: 6px solid transparent;
  box-shadow: 0px 0px 6px 3px rgba($color: #040000, $alpha: 0.5);
  // padding: 6px;
  background-color: rgba($color: #11191e, $alpha: 0.45);
  border-image: url("/static/images/border.png") 6 6 fill;
}
</style>