<template>
  <div class="home">
    <div class="settings">
      <div>
        <div class="title">
          <div>ПДА</div>
          <ControlButton></ControlButton>
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
  align-items: center;
}
</style>
