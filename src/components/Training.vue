<template>
  <div class="head_block">
    <div class="settings_box" v-show="!training">
      <div>
        <div class="title">
          <div class="head">ПДА</div>
          <ControlButton :minValue="7" :maxValue="999" :objKey="'pda'"
            >сек</ControlButton
          >
        </div>
        <div class="title">
          <div class="head">Вдох</div>
          <ControlButton :minValue="2" :maxValue="6" :objKey="'inhale'"
            >сек</ControlButton
          >
        </div>
        <div class="title">
          <div class="head">
            Продолжительность занятия <br />
            (в циклах)
          </div>
          <ControlButton
            :minValue="1"
            :maxValue="100"
            :objKey="'loop'"
          ></ControlButton>
        </div>
      </div>
    </div>
    <div class="start_box">
      <!-- time -->
      <div class="time">
        <div v-if="!training">
          Времени займет:
          {{ timeAnimated | timeFilter }}
        </div>
        <!-- <div>Осталось меньше 1 минуты</div> -->
      </div>
      <!-- time -->
      <div v-if="!startClick" class="start_block" @click="start()">
        <div v-if="timer">{{ current }}</div>
        <div v-else>Начать</div>
      </div>
      <div v-show="startClick" class="scale">
        <div class="inhale" :style="{ flexGrow: inhaleStyle }">
          <transition name="start" @after-enter="afterEnter">
            <!-- <div v-show="startFlag"
            :class="['bg-inhale', { start_bg_inhale: startFlag }]"
            :style="{ transitionDuration: this.setings.inhale + 's' }"
          ></div> -->
            <div
              v-if="startFlag"
              class="bg-inhale"
              :style="{ transitionDuration: this.setings.inhale + 's' }"
            ></div>
          </transition>
        </div>
        <div class="exhalation" :style="{ flexGrow: exhalationStyle }">
          <transition name="start" @after-enter="afterEnterTwo">
            <!-- <div v-show="startFlag"
            :class="['bg-inhale', { start_bg_inhale: startFlag }]"
            :style="{ transitionDuration: this.setings.inhale + 's' }"
          ></div> -->
            <div
              v-if="startFlagTwo"
              class="bg-inhale-2"
              :style="{
                transitionDuration:
                  this.setings.pda - this.setings.inhale + 's',
              }"
            ></div>
          </transition>
          <!-- <div :class="['bg-inhale-2', {}]"></div> -->
        </div>
      </div>

      <div class="progress">
        <div>Прогресс тренировки</div>
        <div class="info">
          <div>
            <div>
              <Loop></Loop>
            </div>
            <div>{{ progressLoopComputed }}</div>
          </div>
          <div>
            <div><Time></Time></div>
            <div>{{ progressTimeComputed }}</div>
          </div>
        </div>
      </div>
      <div class="play_panel" v-show="training">
        <!-- <div class="loop">Осталось циклов: {{ this.checkLoop }}</div> -->
        <div class="play_block" v-show="!this.timer">
          <div class="pause" v-if="!stopButton" @click="stop">
            <Pause></Pause>
          </div>
          <div class="pause" v-else @click="proceed">
            <Play></Play>
          </div>
        </div>
        <div class="end" v-show="this.stopButton">
          Хотите закончить тренировку ?
        </div>
      </div>
      <!-- <div>
          <input v-model.number="number" type="number" step="20" />
          <p>{{ animatedNumber }}</p>
        </div> -->
    </div>
  </div>
</template>

<script>
import ControlButton from "../components/ControlButton.vue";
// ======
// svg
//
import Pause from "../components/svg/Pause";
import Play from "../components/svg/Play";
import Loop from "../components/svg/Loop";
import Time from "../components/svg/Time";

export default {
  data: () => {
    return {
      startClick: false, // ?
      training: false, // статус тренировки
      timer: false,
      startFlag: false,
      startFlagTwo: false,
      current: 2,
      setingsData: {
        pda: 15,
        inhale: 2,
        loop: 6,
      },
      forEndTraning: {
        loop: 0,
      },
      checkLoop: 1,
      stopButton: false,
      progressTime: 0,
      secProgress: 0,
      // ======================
      // testTime
      //
      // number: 0,
      // tweenedNumber: 0,
      // ======================
      // timeAnimated
      //
      timeInput: 0,
      timeAnimated: 0,
      // loop: 0,
    };
  },
  watch: {
    // timeInput: function(){

    // },
    timeInput: function (newValue, oldValue) {
      // gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue });
      let time = (500 * 1) / Math.abs(newValue - oldValue);
      let sum = Math.abs(newValue - oldValue) / 150;
      // как только число меньше чем
      let state = this;
      function changeNumber(newValue) {
        if (newValue < oldValue) {
          //  state.timeAnimated = state.timeAnimated - sum - 1;
          state.timeAnimated = state.timeAnimated - sum;
          if (state.timeAnimated <= newValue) {
            state.timeAnimated = newValue;
            clearInterval(timerId);
          }
        } else {
          // при маленьких значениях прибавление 1 может быть лишним из-за увелечение предпологаемой скорости
          state.timeAnimated = state.timeAnimated + sum;
          if (state.timeAnimated >= newValue) {
            state.timeAnimated = newValue;
            clearInterval(timerId);
          }
        }
      }
      // Надо получить два парметра сколько частей надо сложить с такой задержкой что бы в сумме получилось 500 мс (0.5с)
      let timerId = setInterval(() => {
        changeNumber(newValue);
      }, 1);
    },
  },
  computed: {
    progressLoopComputed() {
      let settingLoop = this.$store.state.defaultConfig.loop;
      return settingLoop - this.checkLoop;
    },
    progressTimeComputed() {
      if (this.progressTime === 0) {
        return `\<${this.progressTime + 1} мин`;
      } else {
        return `${this.progressTime} мин`;
      }
    },
    setings() {
      this.setingsData = this.$store.state.defaultConfig;
      this.timeComuted();
      return this.$store.state.defaultConfig;
    },
    inhaleStyle() {
      return ((1 / this.setings.pda) * this.setings.inhale).toPrecision(2);
    },
    exhalationStyle() {
      return (1 - this.inhaleStyle).toPrecision(2);
    },
  },
  methods: {
    update() {
      // location.reload(true)
      // console.log('Обновлено')
    },
    timeComuted() {
      this.timeInput = this.setingsData.pda * this.setingsData.loop;
    },
    toClock() {},
    stop() {
      // scope.startClick = false;
      // scope.timer = false;
      this.stopButton = true;
      this.startFlag = false;
      this.startFlagTwo = false;
      // scope.current = 5;
    },
    proceed() {
      console.log("Продолжить");
      this.startFlag = true;
      this.stopButton = false;
      this.progressInterval();
    },
    start() {
      this.training = true;
      this.timer = true;
      let scope = this;
      scope.checkLoop = scope.setings.loop;
      let timer = setInterval(function () {
        // console.log();
        if (scope.current === 1) {
          clearInterval(timer);

          // scope.timer = false // ! метка
          // index--;
          // scope.checkTime = index;
          console.log("начал отсчет");
          // ==================================!!!!!!!!!!!!!!!!!!!!!!!!
          let index = scope.setings.time;
          // index--;
          // scope.checkTime = index;
          scope.startClick = true;
          scope.startFlag = true;
          scope.timer = false;
          scope.progressInterval();
          // ==================================!!!!!!!!!!!!!!!!!!!!!!!!
        }
        scope.current--;
      }, 1000);
      // setTimeout();
    },
    progressInterval() {
      let scope = this;
      let timerClok = (scope.timeAnimated.toFixed(0) / 60).toFixed(0);

      let progress = setInterval(() => {
        if (scope.stopButton) {
          clearInterval(progress);
          // console.log(scope.secProgress, "secProgress STOP !");
        }
        console.log(scope.secProgress);
        scope.secProgress++;
        if (scope.secProgress % 60 === 0) {
          scope.progressTime++;
          console.log(scope.progressTime, "% 60 === 0");
        }
        if (scope.progressTime >= timerClok) {
          // Сброс настроек
          // Ре
          console.log("progressInterval END");
          scope.progressTime === 0;
          clearInterval(progress);
        }
      }, 1000);
    },
    // pda(value) {
    //   console.log(value, "set from child");
    //   this.setingsData.pda = value;
    //   // localStorage.setItem("pdaSetings", value);
    // },
    // inhale(value) {
    //   this.setingsData.inhale = value;
    //   // localStorage.setItem("inhaleSetings", value);
    // },
    // loop(value) {
    //   this.setingsData.loop = value;
    //   // localStorage.setItem("loopSetings", value);
    // },
    // ==============
    afterEnter() {
      // console.log("вызвали получается");
      // if (this.startFlagTwo) {
      //   this.startFlag = true;
      // } else {
      // }
      this.startFlagTwo = true;
    },
    afterEnterTwo() {
      this.startFlagTwo = false;
      this.startFlag = false;
      // this.startFlag = true;
      // this.afterEnter()
      //
      // forEndTraning
      //
      this.forEndTraning.loop++;
      // forEndTraning
      this.checkLoop--;
      if (this.checkLoop !== 0) {
        setTimeout(() => {
          this.startFlag = true;
        }, 0);
      } else {
        this.training = false;
        this.startClick = false;
        this.timer = false;
        this.current = 2;
        this.secProgress = 0;
        this.progressTime = 0;
      }
    },
  },
  filters: {
    timeFilter: function (value) {
      let fixedValue = value.toFixed(0);
      let minutes;
      let sec;
      if (fixedValue < 60) {
        minutes = 0;
        sec = fixedValue;
        if (sec < 10) {
          sec = `0${sec}`;
        }
      } else {
        minutes = Math.trunc(fixedValue / 60);
        sec = fixedValue - minutes * 60;
        if (sec < 10) {
          sec = `0${sec}`;
        }
      }
      return `${minutes}:${sec}`;
    },
  },
  components: { ControlButton, Pause, Play, Loop, Time, Time },
};
</script>

<style  lang="scss" scoped>
.head_block {
  padding: 0.5em;
}
.play_panel {
  margin: 0.7em 0;
  // height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .play_block {
    display: flex;
    justify-content: center;
  }
  .end {
    margin: 1em;
    opacity: 0.5;
  }
}
.progress {
  margin-top: 0.5em;
}
.info {
  display: flex;
  // justify-content: space-evenly;
  // margin-top: 0.5em;
  padding-top: 0.5em;
  > div {
    width: 50%;
    display: flex;
    // padding-left: 2em;
    border-radius: 5px;
    margin: 0.3em 0;
    padding: 0.2em 0;
    background-color: rgba(128, 128, 128, 0.1);
    justify-content: center;
    align-items: center;
  }
  > div:first-child {
    margin-right: 0.6em;
  }
}

.time {
  text-align: start;
  margin-bottom: 0.3em;
  opacity: 0.8;
}
.loop {
  padding: 0.2em 0;
  border: 1px solid white;
  border-radius: 5px;
}
.none {
  opacity: 0;
}
.pause {
  padding: 0.2em 2em;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
}

// =================================================
.start_box {
  margin-top: 1em;
}
.start_block {
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid gray;
  border-radius: 5px;
  //
  height: 39px;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-in-out;
}
.start_block:hover {
  background-color: rgba(38, 166, 153, 0.5);
}
.start-enter-active {
  // transition: all 0.3s ease;
  // transition-timing-function: linear;
  // transition-property: width;
  // border: none;
  // border-radius: 0;
  // height: 40px;
  // background-color: rgba(38, 166, 153, 0.8);
}
.start-enter {
  width: 0%;
}
.start-enter-to {
  width: 100%;
  // border-radius: 0 5px 5px 0;
}
// .start-leave-active {
//   transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
// }
.start-leave-active {
  transition-duration: 0s !important;
}
.title {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.9em;
  .head {
    // display: flex;
    // align-items: flex-start;
    text-align: start;
    font-size: 1.1rem;
  }
  > div {
    margin-bottom: 0.4em;
  }
}
.scale {
  display: flex;
  // height: 39px;
  > div {
    border: 1px solid gray;
    height: 39px;
  }
  .inhale {
    border-radius: 5px 0 0 5px;
    border-right: none;
    // flex-grow: 0.14;
  }
  .exhalation {
    border-radius: 0 5px 5px 0;
    // flex-grow: 0.86;
  }
}
.bg-inhale {
  // position: absolute;
  border: none;
  border-radius: 5px 0 0 5px;
  background-color: rgba(38, 166, 153, 0.8);
  height: 39px;
  // width: 0%;
  transition-timing-function: linear;
  transition-property: width;
}
.bg-inhale-2 {
  // position: absolute;
  border: none;
  border-radius: 0 5px 5px 0;
  background-color: rgba(239, 83, 80, 0.5);
  height: 39px;
  // width: 0%;
  transition: width 6s linear;
}
.start_bg_inhale {
  width: 100%;
}

.start {
  margin: 2em;
  display: flex;
  justify-content: center;
  .button {
    cursor: pointer;
    padding: 0.3em 1em;
    border: 1px solid gray;
    border-radius: 5px;
  }
}
</style>
