<template>
  <div class="home">
    <component :is="tabComponent"></component>
    <div class="footer_block">
      <!-- <div @click="update()">Обновить</div> -->
      <!-- <div :style="{ margin: '0 2em' }">new</div> -->
      <!-- <div>0.3.7v beta</div> -->
      <div :class="{ active_tub: tabComponent === 'Training' }" @click="tabComponent = 'Training'">тренировка</div>
      <div :class="{ active_tub: tabComponent === 'Profile' }" @click="tabComponent = 'Profile'">профиль</div>
    </div>
    <!-- <div class="start"><div class="button" >Начать</div></div> -->
  </div>
</template>

<script>
import Training from "@/components/Training.vue";
import Profile from "@/components/Profile.vue";


//=============1
// Плавное премещение scale наверх?
// Пауза, завершение тренировки
// Убрать моргание при паузе

//=============
export default {
  name: "Home",
  data: () => {
    return {
      tabComponent: "Training",
    };
  },
  components: {
    Training, Profile
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 600px) {
  .home {
    display: block;
    width: 600px;
  }
}
@media (max-width: 600px) {
  .home {
    position: absolute;
  }
}
.home {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // 
  .footer_block {
    border-top: 1px solid gray;
    user-select: none;
    display: flex;
    // opacity: 0.5;
    > div {
      padding: 0.5em;
      width: 50%;
    }
    > div:first-child {
      border-right: 1px solid gray;
    }
  }
}
.active_tub{
  background-color: rgba(128, 128, 128, 0.2);
}
// New
</style>