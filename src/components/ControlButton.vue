<template>
  <div class="main">
    <div class="input-block">
      <div class="input-area">
        <input
          type="text"
          v-model="time"
          onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
        />
      </div>
      <div class="sec"><slot></slot></div>
    </div>
    <div class="change">
      <div class="minus" @click="minus()"><Minus></Minus></div>
      <div class="plus" @click="plus()"><Plus></Plus></div>
    </div>
  </div>
</template>

<script>
import Plus from "../components/svg/Plus";
import Minus from "../components/svg/Minus";
export default {
  props: {
    objKey: String,
    // valueP: Number,
    minValue: Number,
    maxValue: Number,
  },
  data: () => {
    return {
      default: {
        pda: 15,
        inhale: 2,
        loop: 6,
      },
      t: 0,
    };
  },
  computed: {
    propsData() {},
    time: {
      get: function () {
        let fromState = this.$store.state.defaultConfig;
        if (fromState[this.objKey] !== null) {
          this.t = fromState[this.objKey];
          return this.t;
        } else {
          this.t = this.default[this.objKey];
          let obj = {
            key: this.objKey,
            value: this.t,
          };
          this.$store.commit("setConfig", obj);
          return this.t;
        }
      },
      set: function (value) {
        toString(value);
        if (value.length > 3) {
          this.t = 0;
          this.t = value.slice(0, 3);
          let obj = {
            key: this.objKey,
            value: this.t,
          };
          this.$store.commit("setConfig", obj);
        } else {
          this.t = value.replace(/[^\d]/g, "");
          let obj = {
            key: this.objKey,
            value: this.t,
          };
          this.$store.commit("setConfig", obj);
        }
      },
    },
  },

  methods: {
    plus() {
      if (this.t < this.maxValue) {
        this.t++;
        let obj = {
          key: this.objKey,
          value: this.t,
        };
        console.log(obj);
        this.$store.commit("setConfig", obj);
      }
    },
    minus() {
      if (this.t > this.minValue) {
        this.t--;
        let obj = {
          key: this.objKey,
          value: this.t,
        };
        this.$store.commit("setConfig", obj);
      }
    },
  },
  components: {
    Plus,
    Minus,
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.input-block {
  position: relative;
  display: flex;
  justify-content: space-between;
  // align-items: center;
  padding: 0 0.4em;
  border: 1px solid gray;
  border-radius: 5px;
  width: 70px;
  height: 26px;
  // background-color: rgba(128, 128, 128, 0.1);
  background-color: white;
  .input-area {
    display: flex;
    align-items: center;
    input {
      width: 35px;
      // padding: 0.1em 0;
      font-size: 1.1rem;
      padding: 0;
    }
  }

  .sec {
    user-select: none;
    display: flex;
    align-items: flex-end;
    opacity: 0.8;
    font-size: 1.1rem;
  }
}
.change {
  // margin-left: 1em;
  display: flex;
  background-color: white;
  // padding: 0.2em;
  border-radius: 5px;
  > div {
    border-radius: 5px;
    margin: 0.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 27px;
    width: 58px;
    user-select: none;
    // border: 1px solid gray;
    cursor: pointer;
    // padding: 0.3em 1.4em;
    transition: background-color 0.2s ease-in-out;
  }
  .minus {
    // border-radius: 5px 0 0 5px;
    background-color: rgba(255, 107, 107, 0.4);
  }
  .plus {
    border-left: none;
    // border-radius: 0 5px 5px 0;
    background-color: rgba(29, 209, 161, 0.4);
  }
  .minus:active {
    background-color: rgba(239, 83, 80, 1);
  }
  .plus:active {
    background-color: rgba(38, 166, 153, 1);
  }
}
</style>
