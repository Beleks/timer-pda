<template>
  <div class="head_block">
    <div class="settings_box" v-show="!training">
      <div>
        <div class="title">
          <div class="head">ПДА</div>
          <ControlButton :minValue="10" :maxValue="999" :objKey="'pda'"
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
            :minValue="2"
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
      </div>
      <!-- time -->
      <div v-if="!startClick" class="start_block" @click="start()">
        <div v-if="timer">{{ current }}</div>
        <div v-else>Начать</div>
      </div>
      <div v-show="startClick" class="scale">
        <div class="inhale" :style="{ flexGrow: inhaleStyle }">
          <transition name="start" @after-enter="afterEnter">
            <div
              v-if="startFlag"
              class="bg-inhale"
              :style="{ transitionDuration: this.setings.inhale + 's' }"
            ></div>
          </transition>
        </div>
        <div class="exhalation" :style="{ flexGrow: exhalationStyle }">
          <transition name="start" @after-enter="afterEnterTwo">
            <div
              v-if="startFlagTwo"
              class="bg-inhale-2"
              :style="{
                transitionDuration:
                  this.setings.pda - this.setings.inhale + 's',
              }"
            ></div>
          </transition>
        </div>
      </div>
      <!-- toString() - ошибка -->
      <div class="progress" v-show="training">
        <Progress
          :pauseStatus="stopButton"
          :secProgress="secProgress"
          :maxProgress="setingsData.loop"
          :minProgress="progressLoopComputed"
        ></Progress>
        <div class="info">
          <div>
            <div><Time></Time></div>
            <div>{{ progressTimeComputed }}</div>
          </div>
          <div class="play_panel">
            <div class="play_block" v-show="!this.timer">
              <div class="pause" v-if="!stopButton" @click="stop">
                <Pause></Pause>
              </div>
              <div class="play" v-else @click="proceed">
                <Play></Play>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div>
          <input v-model.number="number" type="number" step="20" />
          <p>{{ animatedNumber }}</p>
        </div> -->
    </div>
    <div v-if="training" class="end_training">
      <div class="button" @click="endTraining()">
        <Finish></Finish>
        <div>Закончить тренировку</div>
      </div>
    </div>
    <Result
      v-if="END"
      :trainingResult="trainingSettings"
      @close="END = false"
    ></Result>
  </div>
</template>

<script>
// components
import ControlButton from "../components/ControlButton.vue";
import Progress from "../components/Progress";
import Result from "../components/Result";
// ======
// svg
//
import Finish from "../components/svg/Finish";
import Pause from "../components/svg/Pause";
import Play from "../components/svg/Play";
import Loop from "../components/svg/Loop";
import Time from "../components/svg/Time";
//
// audio
import audioInh from "../assets/wav/inh.mp3";
import audioExh from "../assets/wav/exh.mp3";
import { Howl, Howler } from "howler";

//
let soundExh = new Howl({
  src: [audioExh],
  autoplay: false,
  loop: true,
  volume: 1,
  preload: true,
});
let soundInh = new Howl({
  src: [audioInh],
  autoplay: false,
  loop: false,
  volume: 1,
  preload: true,
});

export default {
  data: () => {
    return {
      END: false,
      //
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
      forEndTraining: {
        loop: 0,
        // time: "",
        // date: "",
      },
      preEndStatus: false,
      checkLoop: 1,
      stopButton: false,
      progressTime: 0,
      secProgress: 0,
      lastSecProgress: 0,
      // ======================
      // testTime
      //
      // number: 0,
      // tweenedNumber: 0,
      // ======================
      // timeAnimated
      //
      //
      trainingSettings: {},
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
      this.timeComputed();
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
    endTraining() {
      // pause
      // this.stop();

      // костыль из-за кнопки stop, play
      this.startFlag = false;
      this.startFlagTwo = false;
      soundExh.stop();
      soundInh.stop();
      //
      //
      this.training = false;
      this.startClick = false;
      this.timer = false;
      this.current = 2;
      this.secProgress = 0;
      this.lastSecProgress = 0;
      this.progressTime = 0;
      this.preEndStatus = false;

      //
      // this.stopButton = false;
      //
      // audio stop
      // soundInh.stop()
      // soundExh.stop()
      //
      // let trainingSettings;

      let date = new Date();
      let dateObj = new Date();
      let month = dateObj.getUTCMonth() + 1; //months from 1-12
      let day = dateObj.getUTCDate();
      let year = dateObj.getUTCFullYear();

      //
      let pda = this.setingsData.pda;
      let inhale = this.setingsData.inhale;
      let exhalation = this.setingsData.pda - this.setingsData.inhale;
      let time = this.forEndTraining.loop * this.setingsData.pda;
      let loop = this.forEndTraining.loop;

      this.trainingSettings = {
        date: day + "." + month + "." + year,
        pda,
        inhale,
        exhalation,
        loop,
        time,
      };

      this.END = true;
    },
    timeComputed() {
      this.timeInput = this.setingsData.pda * this.setingsData.loop;
    },
    toClock() {},
    stop() {
      // scope.startClick = false;
      // scope.timer = false;
      this.stopButton = true;
      this.startFlag = false;
      this.startFlagTwo = false;
      soundExh.stop();
      soundInh.stop();
      // scope.current = 5;
    },
    proceed() {
      this.secProgress = this.lastSecProgress;
      soundInh.play();
      console.log("Продолжить");
      this.preEndStatus = false;
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
          soundInh.play();

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
        if (scope.stopButton || scope.END) {
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
      soundExh.play();
    },
    afterEnterTwo() {
      this.startFlagTwo = false;
      this.startFlag = false;
      // this.startFlag = true;
      // this.afterEnter()
      //
      // forEndTraning
      //
      this.forEndTraining.loop++;
      // forEndTraning
      this.lastSecProgress = this.secProgress;
      this.checkLoop--;
      soundExh.stop();
      if (this.checkLoop !== 0) {
        soundInh.play();
        setTimeout(() => {
          this.startFlag = true;
        }, 0);
      } else {
        this.endTraining();
      }
    },
  },
  filters: {
    // timeFilter: function (value) {
    //   let fixedValue = value.toFixed(0);
    //   let minutes;
    //   let sec;
    //   if (fixedValue < 60) {
    //     minutes = 0;
    //     sec = fixedValue;
    //     if (sec < 10) {
    //       sec = `0${sec}`;
    //     }
    //   } else {
    //     minutes = Math.trunc(fixedValue / 60);
    //     sec = fixedValue - minutes * 60;
    //     if (sec < 10) {
    //       sec = `0${sec}`;
    //     }
    //   }
    //   return `${minutes}:${sec}`;
    // },
  },
  components: {
    ControlButton,
    Pause,
    Play,
    Loop,
    Time,
    Time,
    Progress,
    Finish,
    Result,
    Result,
  },
};
</script>

<style  lang="scss" scoped>
.head_block {
  padding: 0.5em;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.end_training {
  display: flex;
  justify-content: center;
  margin-bottom: 1em;

  .button {
    cursor: pointer;
    border-radius: 5px;
    background-color: rgba(255, 107, 107, 0.4);
    padding: 0.4em 1.5em;
    max-width: 200px;
    display: flex;
    justify-content: center;
    > div:last-child {
      margin-left: 0.5em;
    }
  }
}
.play_panel {
  // margin: 0.7em 0;
  // height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .play_block {
    display: flex;
    justify-content: center;
    background-color: white;
    border-radius: 5px;
    > div {
      // margin: 0.2em;
      padding: 0.2em 2em;
      // border: 1px solid gray;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }
    .pause {
      background-color: rgba(255, 107, 107, 0.4);
    }
    .play {
      background-color: rgba(29, 209, 161, 0.4);
    }
  }

  .end {
    margin: 1em;
    // opacity: 0.5;
    .pre_keep {
      cursor: pointer;
    }
    .keep {
      display: flex;
      flex-direction: column;
      .title {
        width: 200px;
      }
      .buttons {
        display: flex;
        justify-content: space-evenly;
        > div {
          padding: 0.2em 0.5em;
          border: 1px solid;
          cursor: pointer;
          border-radius: 5px;
          width: 40px;
        }
        div:first-child {
          border-color: rgba(255, 107, 107, 0.5);
          background-color: rgba(255, 107, 107, 0.5);
        }
        div:last-child {
          border-color: rgba(29, 209, 161, 0.5);
          background-color: rgba(29, 209, 161, 0.5);
        }
      }
    }
  }
}
.progress {
  margin-top: 0.5em;
}
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5em;
  height: 32px;
  > div {
    // width: 50%;
    display: flex;
    // padding-left: 2em;
    // border-radius: 5px;
    // margin: 0.3em 0;
    // padding: 0.2em 0;
    // background-color: rgba(128, 128, 128, 0.1);
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
}

// =================================================
.start_box {
  margin-top: 1em;
}
.start_block {
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid rgba(29, 209, 161, 0.8);
  border-radius: 5px;
  //
  height: 39px;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  background-color: rgba(29, 209, 161, 0.2);
}
.start_block:hover {
  color: white;
  background-color: rgba(29, 209, 161, 0.7);
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
  // background-color: rgba(29, 209, 161, 0.7);
  background-color: rgba(10, 189, 227, 1);
  height: 39px;
  // width: 0%;
  transition-timing-function: linear;
  transition-property: width;
}
.bg-inhale-2 {
  // position: absolute;
  border: none;
  border-radius: 0 5px 5px 0;
  // background-color: rgba(255, 107, 107, 0.7);
  background-color: rgba(238, 82, 83, 1);
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
