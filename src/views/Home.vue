<template>
  <div class="home">
    <div class="settings">
      <div>
        <div class="title">
          <div>ПДА</div>
          <ControlButton :minValue="7" :maxValue="999" @changeParams="pda"
            >сек</ControlButton
          >
        </div>
        <div class="title">
          <div>Вдох</div>
          <ControlButton :minValue="1" :maxValue="4" @changeParams="inhale"
            >сек</ControlButton
          >
        </div>
        <div class="title">
          <div>Продолжительность занятия</div>
          <ControlButton :minValue="1" :maxValue="30">мин</ControlButton>
        </div>
      </div>
    </div>
    <div class="scale">
      <div class="inhale" :style="{ flexGrow: inhaleStyle }">
        <div
          :class="['bg-inhale', { start_bg_inhale: startFlag }]"
          :style="{ transitionDuration: this.setings.inhale + 's' }"
        ></div>
      </div>
      <div class="exhalation" :style="{ flexGrow: exhalationStyle }">
        <div :class="['bg-inhale-2']"></div>
      </div>
    </div>
    <div class="start" @click="start()">начать</div>
  </div>
</template>

<script>
// import ControlButton from "@/components/ControlButton.vue";
import ControlButton from "../components/ControlButton.vue";

export default {
  name: "Home",
  data: () => {
    return {
      startFlag: false,
      setings: {
        pda: 7,
        inhale: 1,
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
      this.startFlag = true;
    },
    pda(value) {
      this.setings.pda = value;
    },
    inhale(value) {
      this.setings.inhale = value;
    },
  },
  components: { ControlButton },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 0.9em;
  // justify-content: flex-start;
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
  background-color: greenyellow;
  height: 40px;
  width: 0%;
  transition-timing-function: linear;
  transition-property: width;
}
.bg-inhale-2 {
  // position: absolute;
  border: none;
  border-radius: 0 5px 5px 0;
  background-color: greenyellow;
  height: 40px;
  width: 0%;
  transition: width 6s linear;
}
.start_bg_inhale {
  width: 100%;
}

.start {
  cursor: pointer;
  margin: 2em;
}
@keyframes start_bg_inhale {
  0% {
    .bg_inhale {
      width: 100%;
    }
  }
  50% {
    .bg_inhale-2 {
      width: 100%;
    }
  }
}
</style>
