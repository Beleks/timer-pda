<template>
  <div>
    <div class="information">
      <div>
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
      </div>
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
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.log {
  .info {
    display: flex;
    justify-content: space-evenly;
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
        display: flex;
        align-items: center;
        padding: 0em 0.5em;
        border-radius: 0px 3px 3px 0px;
      }
    }
  }
}
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