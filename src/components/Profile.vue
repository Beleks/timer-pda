<template>
  <div>
    <div class="information">
      <!-- <div>
        <div></div>
        <div>Всего тренировок</div>
      </div>
      <div>
        <div></div>
        <div>Самый долгий выдох</div>
      </div>
      <div>
        <div></div>
        <div>Самая длинная тренировка</div>
      </div> -->
    </div>
    <div class="log">
      <div class="info">
        <div class="min_card">
          <div class="color one"></div>
          <div class="title">ПДА</div>
        </div>
        <div class="min_card">
          <div class="color two"></div>
          <div class="title">Вдох</div>
        </div>
        <div class="min_card">
          <div class="color three"></div>
          <div class="title">Выдох</div>
        </div>
        <div class="min_card">
          <div class="color four"></div>
          <div class="title">Время</div>
        </div>
      </div>
      <div class="table">
        <div v-for="(record, index) in table" :key="index" class="record">
          <div class="data">{{ record.data }}</div>
          <div class="cards">
            <div class="min_card">
              <div class="color one"></div>
              <div class="title">{{ record.pda }}</div>
            </div>
            <div class="min_card">
              <div class="color two"></div>
              <div class="title">{{ record.inhale }}</div>
            </div>
            <div class="min_card">
              <div class="color three"></div>
              <div class="title">{{ record.exhalation }}</div>
            </div>
            <div class="min_card">
              <div class="color four"></div>
              <div class="title">{{ record.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      table: [
        {
          data: "30.11.2020",
          pda: 36,
          inhale: 4,
          exhalation: 32,
          time: "2:40",
        },
        {
          data: "29.11.2020",
          pda: 30,
          inhale: 4,
          exhalation: 26,
          time: "13:00",
        },
        {
          data: "28.11.2020",
          pda: 30,
          inhale: 4,
          exhalation: 26,
          time: "2:00",
        },
        {
          data: "27.11.2020",
          pda: 30,
          inhale: 4,
          exhalation: 26,
          time: "2:00",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.log {
  margin-top: 1em;
  .info {
    display: flex;
    justify-content: space-between;
    margin: 0.8em;
  }
}
// table
.min_card {
  height: 24px;
  display: flex;
  .color {
    height: 100%;
    width: 6px;
    border-radius: 3px 0 0 3px;
  }
  .title {
    background-color: white;
    width: 55px;
    display: flex;
    align-items: center;
    padding: 0em 0.2em;
    border-radius: 0px 3px 3px 0px;
  }
}
.table {
  .record {
    display: flex;
    // align-items: center;
    // width: 100%;
    flex-direction: column;
    margin: 0.4em 0.8em;
    .data {
      display: flex;
      font-size: 0.9rem;
      // margin-top: 1em;
      margin-bottom: 0.2em;
      // flex-basis: 10%;
    }
    > div:not(:first-child) {
      // flex-basis: 18%;
    }
    .cards {
      display: flex;
      justify-content: space-between;
    }
  }
}

// ===================
.one {
  background-color: rgba(255, 159, 67, 1);
}
.two {
  background-color: rgba(10, 189, 227, 1);
}
.three {
  background-color: rgba(238, 82, 83, 1);
}
.four {
  background-color: rgba(243, 104, 224, 1);
}
</style>