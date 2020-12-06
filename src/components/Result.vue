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

            <div class="value" v-if="params.key === 'time'">
              {{ params[`${params.key}`] | timeFilter }}
            </div>
            <div class="value" v-else>{{ params[`${params.key}`] }}</div>
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
          >
            <Like v-if="like.like" :width="'34px'" :height="'34px'"></Like>
            <UnLike v-else></UnLike>
          </div>
        </div>
        <div class="text">
          <div>Очень тяжело</div>
          <div>Очень легко</div>
        </div>
        <div class="save">Сохранить</div>
      </div>
    </div>
  </div>
</template>

<script>
import Trophy from "../components/svg/Trophy";
import Like from "../components/svg/Like";
import UnLike from "../components/svg/UnLike";
export default {
  data: () => {
    return {
      idx: 0,
      el: false,
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
    };
  },
  methods: {
    choseLike(index) {
      let chose = index + 1;
      this.masLike.forEach((element) => {
        element.like = false;
      });
      for (let i = 0; i < chose; i++) {
        this.masLike[i].like = true;
      }
    },
  },
  computed: {
    oldResult() {
      console.log(this.$store.state.trainingLog);
      return this.$store.state.trainingLog[0];
    },
    different() {},
  },
  mounted() {
    this.el = true;
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
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 1);
  .content {
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
      margin: 1em 4em;
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
    margin: auto;
    margin-top: 0.5em;
  }
  .text {
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
  }
}
.save {
  border-radius: 5px;
  margin: 0 1em;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  padding: 0.5em 2em;
  background-color: rgba(29, 209, 161, 0.4);
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