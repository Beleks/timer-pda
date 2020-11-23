<template>
  <div class="main">
    <div class="input-block">
      <div class="input-area">
        <input
          type="text"
          v-model="time"
          :input="$emit('change-params', this.t)"
          onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
        />
      </div>
      <div class="sec"><slot></slot></div>
    </div>
    <div class="change">
      <div class="minus" @click="minus()">-</div>
      <div class="plus" @click="plus()">+</div>
    </div>
  </div>
</template>

<script>
// import { config } from "vue/types/umd";
export default {
  props: {
    valueP: Number,
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
      t: -1,
    };
  },
  computed: {
    propsData() {},
    time: {
      get: function () {
        let fromState = this.$store.state.defaultConfig
        console.log(fromState.pda, 'status')
        if(fromState.pda !== null){
          // fromState 
        }else{

        }
        // console.log(this.valueP, "valueP");
        // this.t = this.valueP;
        // return this.t;
      },
      set: function (value) {
        // toString(value);
        console.log(value, "valueSet");
        if (value.length > 3) {
          this.t = 0;
          this.t = value.slice(0, 3);
          return;
        } else {
          this.t = value;
        }
      },
    },
  },

  methods: {
    plus() {
      if (this.t < this.maxValue) {
        this.t++;
        // this.$emit("changeParams", this.t);
      }
    },
    minus() {
      if (this.t > this.minValue) {
        this.t--;
        // this.$emit("changeParams", this.t);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-between;
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
  background-color: rgba(128, 128, 128, 0.1);
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
  margin-left: 1em;
  display: flex;
  > div {
    user-select: none;
    border: 1px solid gray;
    cursor: pointer;
    padding: 0.3em 1.4em;
  }
  .minus {
    border-radius: 5px 0 0 5px;
    background-color: rgba(239, 83, 80, 0.5);
  }
  .plus {
    border-left: none;
    border-radius: 0 5px 5px 0;
    background-color: rgba(38, 166, 153, 0.5);
  }
  .minus:active {
    background-color: rgba(239, 83, 80, 1);
  }
  .plus:active {
    background-color: rgba(38, 166, 153, 1);
  }
}
</style>
