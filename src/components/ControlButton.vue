<template>
  <div class="main">
    <div class="input-block">
      <div class="input-area">
        <input type="number" v-model="time" />
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
export default {
  data: () => {
    return {
      t: "0",
    };
  },
  computed: {
    time: {
      get: function () {
        return this.t;
      },
      set: function (value) {
        // toString(value);
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
      if (this.t < 999) {
        this.t++;
      }
    },
    minus() {
      if (this.t > 0) {
        this.t--;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
}
.input-block {
  position: relative;
  display: flex;
  justify-content: space-between;
  // align-items: center;
  padding: 0 0.4em;
  border: 1px solid gray;
  border-radius: 5px;
  width: 60px;
  background-color: rgba(128, 128, 128, 0.1);
  .input-area {
    display: flex;
    align-items: center;
    input {
      width: 35px;
      // padding: 0.1em 0;
      padding: 0;
    }
  }

  .sec {
    user-select: none;
    display: flex;
    align-items: flex-end;
    opacity: 0.8;
  }
}
.change {
  margin-left: 1em;
  display: flex;
  > div {
    border: 1px solid gray;
    cursor: pointer;
    padding: 0.2em 1em;
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
}
</style>
