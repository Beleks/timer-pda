<template>
  <div class="progress">
    <div class="line">
      <div
        v-for="(column, index) in progressLine"
        :key="index"
        class="column"
        :class="{ yellow: column.status, animation: index === 9 }"
      ></div>
    </div>
    <div class="stop_buttons">
      <!-- <div class="pause" v-if="!pauseStatus">
        <Pause></Pause>
      </div>
      <div class="play" v-else>
        <Play></Play>
      </div> -->
      <div class="stop_training" v-if="pauseStatus" @click="$emit('stop-training')">
        <Finish></Finish>
      </div>
    </div>
  </div>
</template>

<script>
import Pause from "../components/svg/Pause";
import Play from "../components/svg/Play";
import Finish from "../components/svg/Finish";

export default {
  props: {
    pauseStatus: Boolean,
  },
  data: () => {
    return {
      pause: false,
      progressLine: [
        { status: true },
        { status: true },
        { status: true },
        { status: true },
        { status: true },
        { status: true },
        { status: true },
        { status: true },
        { status: true },
        { status: false },
      ],
    };
  },
  components: {
    Pause,
    Play,
    Finish,
  },
};
</script>

<style scoped lang="scss">
.progress {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.line {
  background-color: white;
  display: flex;
  padding: 0.1em 0.3em;
  border-radius: 5px;
  .column {
    width: 10px;
    height: 23px;
    margin: 0.1em;
    border-radius: 3px;
    // transition: background-color 2s ease-in-out;
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