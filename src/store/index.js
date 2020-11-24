import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    defaultConfig: {
      pda: localStorage.getItem("pda"),
      inhale: localStorage.getItem("inhale"),
      loop: localStorage.getItem("loop"),
    }
  },
  mutations: {
    setConfig(state, obj) {
      localStorage.setItem(obj.key, obj.value)
      state.defaultConfig[obj.key] = obj.value
    }
  },
  actions: {
  },
  modules: {
  }
})
