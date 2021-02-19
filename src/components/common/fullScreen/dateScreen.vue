<template>
  <div class="screen">
    <div class="detail">
      <p class="title">{{title}}</p>

      <div class="column">
        <div class="cell card">
          <slot name="firstLeft"></slot>
        </div>
        <div class="cell card empty"></div>
        <div class="cell card empty"></div>
        <div class="cell card">
          <slot name="firstRight"></slot>
        </div>
      </div>

      <div class="column">
        <div class="cell card">
          <slot name="secondLeft"></slot>
        </div>
        <div class="cell card empty"></div>
        <div class="cell card empty"></div>
        <div class="cell card">
          <slot name="secondRight"></slot>
        </div>
      </div>

      <div class="column">
        <div class="cell histogram">
          <slot name="thirdLeft"></slot>
        </div>
        <div class="cell histogram empty"></div>
        <div class="cell histogram empty"></div>
        <div class="cell histogram">
          <slot name="thirdRight"></slot>
        </div>
      </div>

      <div class="column">
        <div class="cell bottom">
          <slot name="bottomFirst"></slot>
        </div>
        <div class="cell bottom">
          <slot name="bottomSecond"></slot>
        </div>
        <div class="cell bottom">
          <slot name="bottomThird"></slot>
        </div>
        <div class="cell bottom">
          <slot name="bottomFourth"></slot>
        </div>
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script>
export default {
  name: "carPassengerBusiness",
  props: {
    title: {
      type: String,
      required: true,
      default: "交旅业财一体化平台-数据大屏"
    }
  }
};
</script>

<style lang="scss" scoped>
.screen {
  width: 100vw;
  height: 100vh;
  .detail,
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
  }
  .detail {
    padding-top: 6vh;
    .title {
      color: #fff;
      font-size: 2rem;
      background: #1b1f23;
      border: 1px solid #3f4a51;
      padding: 1rem 2rem;
      position: fixed;
      top: 2vh;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .bg {
    background: url("/static/images/bac.png") no-repeat;
    background-size: cover;
    z-index: -1;
  }
}

.column {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1vh;
  .cell {
    width: 24.5%;
    & > div {
      height: 100%;
      width: 100%;
    }
  }
}

.card {
  height: 15vh;
  background: #1b1f23;
  border: 1px solid #3f4a51;
  padding: 2vh 1vh;
  box-sizing: border-box;
}

.histogram {
  height: 30vh;
  background: #1b1f23;
  border: 1px solid #3f4a51;
  padding-top: 2vh;
  box-sizing: border-box;
}

.bottom {
  height: 30vh;
  background: #1b1f23;
  border: 1px solid #3f4a51;
  box-sizing: border-box;
}

.empty {
  display: none;
}
</style>