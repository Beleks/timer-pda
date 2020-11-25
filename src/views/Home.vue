<template>
  <div class="home">
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
              :maxValue="30"
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
            {{ (this.setings.pda * this.setings.loop) | timeFilter }}
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
        <div class="play_panel" v-show="training">
          <div class="loop">Осталось циклов: {{ this.checkLoop }}</div>
          <div class="play_block" v-show="!this.timer">
            <div class="pause" v-if="!stopButton" @click="stop">Стоп</div>
            <div class="pause" v-else @click="proceed">Продолжить</div>
          </div>
        </div>
        <div>
          <input v-model.number="number" type="number" step="20" />
          <p>{{ animatedNumber }}</p>
        </div>
      </div>
    </div>
    <div class="footer_block">0.3.0v beta</div>
    <!-- <div class="start"><div class="button" >Начать</div></div> -->
  </div>
</template>

<script>
// import ControlButton from "@/components/ControlButton.vue";
import ControlButton from "../components/ControlButton.vue";
//=============
// Плавное премещение scale наверх?
// Пауза, завершение тренировки
// Убрать моргание при паузе

//=============
export default {
  name: "Home",
  data: () => {
    return {
      startClick: false, // ?
      training: false, // статус тренировки
      timer: false,
      startFlag: false,
      startFlagTwo: false,
      current: 5,
      setingsData: {
        pda: 15,
        inhale: 2,
        loop: 6,
      },
      checkLoop: 1,
      stopButton: false,
      // testTime
      number: 0,
      tweenedNumber: 0,
      // loop: 0,
    };
  },
  watch: {
    number: function (newValue, oldValue) {
      // gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue });
      let time = (500 * 1) / Math.abs(newValue - oldValue);
      let sum = Math.abs(newValue - oldValue) / 150;
      // как только число меньше чем 
      console.log(sum, "sum");
      let state = this;
      function changeNumber(newValue) {
        if (newValue < oldValue) {
          state.tweenedNumber = state.tweenedNumber - sum - 1;
          if (state.tweenedNumber <= newValue) {
            state.tweenedNumber = newValue;
            clearInterval(timerId);
          }
        } else {
          // при маленьких значениях прибавление 1 может быть лишним
          state.tweenedNumber = state.tweenedNumber + sum;
          if (state.tweenedNumber >= newValue) {
            state.tweenedNumber = newValue;
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
    animatedNumber: function () {
      // return this.tweenedNumber
      return this.tweenedNumber.toFixed(0);
    },
    setings() {
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
          let timerClok = scope.setings.time * 1000;
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
          // ==================================!!!!!!!!!!!!!!!!!!!!!!!!

          // setTimeout(() => {
          //   console.log("конец");
          //   scope.startClick = false;
          //   scope.timer = false;
          //   scope.startFlag = false;
          //   scope.startFlagTwo = false;
          //   scope.current = 5;
          //   console.log(scope.checkTime, "время окончания");
          // }, timerClok);
        }
        scope.current--;
      }, 1000);
      // setTimeout();
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
      this.checkLoop--;
      if (this.checkLoop !== 0) {
        setTimeout(() => {
          this.startFlag = true;
        }, 0);
      } else {
        this.training = false;
        this.startClick = false;
        this.timer = false;
        this.current = 5;
      }
    },
  },
  filters: {
    timeFilter: function (value) {
      // console.log(value, "value");
      let minutes;
      let sec;
      //
      //
      //
      if (value < 60) {
        minutes = 0;
        sec = value;
        if (sec < 10) {
          sec = `0${sec}`;
        }
      } else {
        minutes = Math.trunc(value / 60);
        sec = value - minutes * 60;
        if (sec < 10) {
          sec = `0${sec}`;
        }
      }
      // if (value / 60 < 1) {
      //   if (value / 60 < 0.1) {
      //     sec = `0${value}`;
      //     console.log(sec, "sec");
      //   } else {
      //     sec = value - minutes * 60;
      //   }
      //   // return value
      // } else {
      //   if (value < 10) {
      //     sec = `0${value}`;
      //     console.log(sec, "sec");
      //   } else {
      //     sec = value - minutes * 60;
      //   }
      // }
      // let sec = (value / 60 + "").split(".")[1];
      // console.log(sec, "sec");
      return `${minutes}:${sec}`;
    },
  },
  components: { ControlButton },
};
</script>

<style lang="scss" scoped>
.home {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // min-height: 100%;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // .head_block{
  // }
  .footer_block {
    user-select: none;
    display: flex;
    justify-content: flex-end;
    opacity: 0.5;
  }
}

// New
.play_panel {
  margin: 0.7em 0;
  // height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  padding: 0.2em 0.8em;
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
