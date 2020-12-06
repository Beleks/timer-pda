import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.filter('timeFilter', function (value) {
  let fixedValue = value.toFixed(0);
  let minutes;
  let sec;
  if (fixedValue < 60) {
    minutes = 0;
    sec = fixedValue;
    if (sec < 10) {
      sec = `0${sec}`;
    }
  } else {
    minutes = Math.trunc(fixedValue / 60);
    sec = fixedValue - minutes * 60;
    if (sec < 10) {
      sec = `0${sec}`;
    }
  }
  return `${minutes}:${sec}`;
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
