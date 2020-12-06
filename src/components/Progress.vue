<template>
  <div class="main">
    <div class="top">
      <div>{{ minProgress }}</div>
      <div class="line">
        <div
          class="progress"
          :style="{ width: `${lineWidth}%` }"
          :class="{ yellow: pauseStatus, green: !pauseStatus }"
        ></div>
      </div>
      <div>{{ maxProgress }}</div>
    </div>
    <div></div>
  </div>
</template>

<script>
import Pause from "../components/svg/Pause";
import Play from "../components/svg/Play";
import Finish from "../components/svg/Finish";
import Loop from "../components/svg/Loop";
import Time from "../components/svg/Time";

export default {
  props: ["pauseStatus", "maxProgress", "minProgress"],
  // props: {
  //   pauseStatus: Boolean,
  //   maxProgress: String,
  //   minProgress: String,
  // },
  data: () => {
    return {
      // pause: false,
    };
  },
  computed: {
    lineWidth() {
      let step = 1 / this.maxProgress;
      step = step.toFixed(4) * 100;
      return step * this.minProgress;
    },
  },
  components: {
    Pause,
    Play,
    Finish,
    Loop,
    Time,
  },
};
</script>

<style scoped lang="scss">
.main {
  display: flex;
  justify-content: center;
}
// .progress {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }
.top {
  display: flex;
  align-items: center;
  justify-content: center;
  // >div{
  //   display: flex;
  //   align-items: center;
  // }
  background-color: white;
  border-radius: 5px;
  padding: 0.2em;
  max-width: 310px;
}
.line {
  border-radius: 5px;
  height: 18px;
  // display: flex;
  min-width: 240px;
  margin: 0 0.5em;
  > div {
  }
  .progress {
    border-radius: 5px;
    height: 100%;
    transition: width 1s ease-in-out, background-color 0.5s ease-in-out;
  }
}
.stop_buttons {
  > div {
    cursor: pointer;
    margin-left: 1em;
    padding: 0.3em 2em;
    border-radius: 5px;
    transition: background-color 0.2s ease-in-out;
  }
}
// .play {
//   background-color: rgba(29, 209, 161, 0.4);
// }
.stop_training {
  background-color: rgba(255, 107, 107, 0.4);
}
.green {
  background-color: rgba(29, 209, 161, 0.4);
}
.yellow {
  background-color: rgba(254, 202, 87, 0.5);
}
.animation {
  // background-color: rgba(29, 209, 161, 0.4);
  animation: bg_yellow 2s infinite linear;
}
@keyframes bg_green {
  25% {
    background-color: rgba(29, 209, 161, 0.1);
  }
  50% {
    background-color: rgba(29, 209, 161, 0.4);
  }
  75% {
    background-color: rgba(29, 209, 161, 0.1);
  }
}
// @keyframes bg_yellow {
//   25% {
//     background-color: rgba(254, 202, 87, 0.1);
//   }
//   50% {
//     background-color: rgba(254, 202, 87, 0.5);
//   }
//   75% {
//     background-color: rgba(254, 202, 87, 0.1);
//   }
// }
</style>