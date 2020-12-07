<template>
  <div class="end_block">
    <div class="content">
      <div class="title">
        <div class="svg"><Trophy></Trophy></div>
        <div>Отлично!</div>
      </div>
      <div class="result">
        <!-- <div @click="el = !el">true</div> -->
        <transition-group name="item">
          <div
            v-for="(params, index) in mas"
            :key="index"
            class="params"
            v-show="el"
            :style="{ transitionDelay: `${params.delay}s` }"
          >
            <div>{{ params.title }}</div>

            <div
              :style="{ display: 'flex' }"
              class="value"
              v-if="params.key === 'time'"
              :class="{
                green: progress[`${params.key}`] > 0,
                red: progress[`${params.key}`] < 0,
              }"
            >
              {{ trainingResult[`${params.key}`] | timeFilter }}
              <div
                :style="{ marginLeft: '0.2em' }"
                v-if="!(progress.timeDif === 0)"
              >
                ({{ different(trainingResult[`${params.key}`], params.key) }}
                {{ progress.timeDif | timeFilter }})
              </div>
            </div>
            <div
              class="value"
              v-else
              :class="{
                green: progress[`${params.key}`] > 0,
                red: progress[`${params.key}`] < 0,
              }"
            >
              <!-- {{ trainingResult[`${params.key}`] }} -->
              {{ different(trainingResult[`${params.key}`], params.key) }}
            </div>
          </div>
        </transition-group>
      </div>
      <div class="status">
        <div>Как прошла тренировка?</div>
        <div class="top">
          <div
            v-for="(like, index) in masLike"
            :key="index"
            @click="choseLike(index)"
            class="heart"
          >
            <Like v-if="like.like" :width="'34px'" :height="'34px'"></Like>
            <UnLike v-else></UnLike>
          </div>
        </div>
        <div class="text">
          <div>Очень тяжело</div>
          <div>Очень легко</div>
        </div>
        <div class="save" @click="endTraining()">Сохранить</div>
      </div>
    </div>
  </div>
</template>

<script>
import Trophy from "../components/svg/Trophy";
import Like from "../components/svg/Like";
import UnLike from "../components/svg/UnLike";
export default {
  props: {
    trainingResult: Object,
  },
  data: () => {
    return {
      idx: 0,
      el: false,
      progress: {
        pda: 0,
        inhale: 0,
        exhalation: 0,
        loop: 0,
        time: 0,
        timeNew: "",
        timeDif: "",
      },
      mas: [
        { pda: 15, title: "ПДА", key: "pda", delay: 0 },
        { inhale: 2, title: "Вдох", key: "inhale", delay: 0.4 },
        { exhalation: 13, title: "Выдох", key: "exhalation", delay: 0.8 },
        { loop: 6, title: "Циклы", key: "loop", delay: 1.2 },
        { time: 90, title: "Время", key: "time", delay: 1.6 },
      ],
      masLike: [
        { like: false },
        { like: false },
        { like: false },
        { like: false },
        { like: false },
      ],
      endMas: {},
    };
  },
  methods: {
    different(value, key) {
      let oldValue = this.$store.state.trainingLog;
      if (oldValue.length === 0) {
        return value;
      }

      let dif = value - oldValue[0][key];
      this.progress[key] = dif;
      if (key !== "time") {
        if (dif > 0) {
          return `${value} (+${dif})`;
        } else if (dif < 0) {
          return `${value} (${dif})`;
        } else {
          return `${value}`;
        }
      } else {
        this.progress.timeDif = Math.abs(dif);
        if (dif > 0) {
          return "+";
        } else if (dif < 0) {
          return "-";
        } else {
          return "";
        }
      }
    },
    choseLike(index) {
      let chose = index + 1;
      this.masLike.forEach((element) => {
        element.like = false;
      });
      for (let i = 0; i < chose; i++) {
        this.masLike[i].like = true;
      }
    },
    endTraining() {
      let mas = this.$store.state.trainingLog;

      let result = this.trainingResult;
      let life = 0;
      this.masLike.forEach((element) => {
        if (element.like === true) {
          life += 1;
        }
      });
      result.life = life;
      if (mas === null) {
        let newMas = [];
        newMas.push(result);
        this.$store.commit("setTraining", newMas);
      } else {
        // JSON.parse(mas)

        let newMas = [];
        newMas.push(result);
        let oldMas = mas.slice();
        let resultMas = newMas.concat(oldMas);
        console.log(resultMas, "массив для сохранения");
        this.$store.commit("setTraining", resultMas);
      }

      // передать в родитель END = false
      this.$emit("close");
    },
  },
  computed: {
    oldResult() {
      console.log(this.$store.state.trainingLog);
      return this.$store.state.trainingLog[0];
    },
  },
  mounted() {
    this.el = true;
  },
  filters: {
    // progressFilter: (value, key) => {
    //   let oldValue = this.$store.state.trainingLog[0][key]
    //   console.log(oldValue, "key");
    //   return "0";
    // },
  },
  components: {
    Trophy,
    Like,
    UnLike,
  },
};
</script>

<style lang="scss" scoped>
.end_block {
  position: absolute;
  // min-height: 100%;
  display: flex;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 1);
  .content {
    min-width: 300px;
    max-width: 360px;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-weight: bold;
      font-size: 1.3rem;
      .svg {
        margin: 1.5em auto;
      }
    }
    .result {
      margin: 1em 2em;
      .params {
        margin-top: 0.5em;
        display: flex;
        justify-content: space-between;
        font-size: 1.2rem;
        // margin: auto;
        .value {
          margin-left: 0 2em;
        }
      }
    }
  }
}
.status {
  margin: 0 auto;
  margin-top: 1em;
  width: 220px;
  // height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // align-items: center;
  .top {
    display: flex;
    justify-content: space-evenly;
    margin: auto;
    width: 220px;
    margin-top: 0.5em;
    .heart {
      cursor: pointer;
    }
  }
  .text {
    display: flex;
    justify-content: space-between;
    margin: 0 -0.7em;
    font-size: 0.7rem;
  }
}
.save {
  cursor: pointer;
  border-radius: 5px;
  margin: 0 1em;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  padding: 0.5em 2em;
  background-color: rgba(29, 209, 161, 0.4);
}
.green {
  color: rgb(38, 166, 154);
}
.red {
  color: rgb(239, 83, 80);
}
// transition
.item-enter-active,
.item-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}

.item-enter,
.item-leave-to {
  transform: translate(-30px);
  opacity: 0;
}
</style>