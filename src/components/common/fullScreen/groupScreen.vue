<template>
  <div class="screen">
    <div class="detail">
      <p class="title">{{title}}</p>
      <div class="column">
        <div class="cell big">
          <slot name="firstTop"></slot>
        </div>
        <div class="cell big">
          <slot name="firstCenter"></slot>
        </div>
        <div class="cell small">
          <slot name="firstBottom"></slot>
        </div>
      </div>
      <div class="column">
        <div class="cell small">
          <slot name="second"></slot>
        </div>
      </div>
      <div class="column">
        <div class="cell small">
          <slot name="third"></slot>
        </div>
      </div>
      <div class="column">
        <div class="cell medium">
          <slot name="fourthTop"></slot>
        </div>
        <div class="cell medium">
          <slot name="fourthCenter"></slot>
        </div>
        <div class="cell medium">
          <slot name="fourthBottom"></slot>
        </div>
      </div>
    </div>
    <slot name="background"></slot>
  </div>
</template>

<script>
export default {
  name: "groupScreen",
  props: {
    title: {
      type: String,
      required: true,
      default: "集团用数据大屏"
    }
  }
};
</script>

<style lang="scss" scoped>
.screen {
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  .detail,
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
  }
  .detail {
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    z-index: 9;
    .title {
      color: #fff;
      font-size: 2rem;
      background: #1b1f23;
      border: 1px solid #3f4a51;
      padding: 1rem 2rem;
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 24%;
  .cell {
    margin-bottom: 2vh;
    background: #1b1f23;
    border: 1px solid #3f4a51;
    & > div {
      height: 100%;
      width: 100%;
    }
    &.medium {
      height: (80vh/3);
      box-sizing: border-box;
    }
    &.small {
      height: 20vh;
      box-sizing: border-box;
    }
    &.big {
      height: 30vh;
      box-sizing: border-box;
    }
  }
}
</style>