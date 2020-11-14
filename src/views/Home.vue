<template>
  <div class="home">
    <div class="settings">
      <div>
        <div class="title">
          <div>ПДА</div>
          <ControlButton>сек</ControlButton>
        </div>
        <div class="title">
          <div>Вдох</div>
          <ControlButton>сек</ControlButton>
        </div>
        <div class="title">
          <div>Продолжительность занятия</div>
          <ControlButton>мин</ControlButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ControlButton from "@/components/ControlButton.vue";
import ControlButton from "../components/ControlButton.vue";

export default {
  name: "Home",
  components: { ControlButton },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 0.5em;
  // justify-content: flex-start;
  > div{
    margin-bottom: 0.5em;
  }
}
</style>
