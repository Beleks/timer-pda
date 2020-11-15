<template>
  <div class="home">
    <div class="settings">
      <div>
        <div class="title">
          <div class="head">ПДА</div>
          <ControlButton :minValue="7" :maxValue="999" @changeParams="pda"
            >сек</ControlButton
          >
        </div>
        <div class="title">
          <div class="head">Вдох</div>
          <ControlButton :minValue="2" :maxValue="6" @changeParams="inhale"
            >сек</ControlButton
          >
        </div>
        <div class="title">
          <div class="head">Продолжительность занятия</div>
          <ControlButton :minValue="1" :maxValue="30" @changeParams="time"
            >мин</ControlButton
          >
        </div>
      </div>
    </div>
    <div v-if="!startClick" class="start_block" @click="start()">
      <div v-if="timer">{{ current }}</div>
      <div v-else>Начать</div>
    </div>
    <div v-show="startFlag" class="scale">
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
              transitionDuration: this.setings.pda - this.setings.inhale + 's',
            }"
          ></div>
        </transition>
        <!-- <div :class="['bg-inhale-2', {}]"></div> -->
      </div>
    </div>
    <!-- <div class="start"><div class="button" >Начать</div></div> -->
  </div>
</template>

<script>
// import ControlButton from "@/components/ControlButton.vue";
import ControlButton from "../components/ControlButton.vue";

export default {
  name: "Home",
  data: () => {
    return {
      startClick: false,
      timer: false,
      startFlag: false,
      startFlagTwo: false,
      current: 3,
      setings: {
        pda: 7,
        inhale: 2,
        time: 20,
      },
    };
  },
  computed: {
    inhaleStyle() {
      return (1 / this.setings.pda) * this.setings.inhale;
    },
    exhalationStyle() {
      return 1 - this.inhaleStyle;
    },
  },
  methods: {
    start() {
      // this.startClick = true;
      // let  = this.current;
      // console.log(number);
      this.timer = true;
      let scope = this;

      let timer = setInterval(function () {
        // console.log();
        if (scope.current === 1) {
          clearInterval(timer);
          scope.startFlag = true;
          scope.startClick = true;
          let timerClok = scope.setings.time * 1000;
          setTimeout(() => {
            console.log("конец");
            scope.startClick = false;
            scope.timer = false;
            scope.startFlag = false;
            scope.startFlagTwo = false;
            scope.current = 3;
          }, timerClok);
        }
        scope.current--;
      }, 1000);
      // setTimeout();
    },
    pda(value) {
      this.setings.pda = value;
    },
    inhale(value) {
      this.setings.inhale = value;
    },
    time(value) {
      this.setings.time = value * 60;
    },
    // ==============
    afterEnter() {
      this.startFlagTwo = true;
    },
    afterEnterTwo() {
      this.startFlagTwo = false;
      this.startFlag = false;
      // this.startFlag = true;
      setTimeout(() => {
        this.startFlag = true;
      }, 0);
    },
  },
  components: { ControlButton },
};
</script>

<style lang="scss" scoped>
.start_block {
  display: flex;
  align-items: center;
  border: 1px solid gray;
  border-radius: 5px;
  height: 40px;
  justify-content: center;
  align-items: center;
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
    display: flex;
    align-items: flex-start;
  }
  > div {
    margin-bottom: 0.4em;
  }
}
.scale {
  display: flex;
  height: 40px;
  > div {
    border: 1px solid gray;
    height: 40px;
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
  height: 40px;
  // width: 0%;
  transition-timing-function: linear;
  transition-property: width;
}
.bg-inhale-2 {
  // position: absolute;
  border: none;
  border-radius: 0 5px 5px 0;
  background-color: rgba(239, 83, 80, 0.5);
  height: 40px;
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
