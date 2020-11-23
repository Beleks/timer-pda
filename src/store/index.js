import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    defaultConfig: {
      pda: localStorage.getItem("pdaSetings"),
      inhale: localStorage.getItem("inhaleSetings"),
      loop: localStorage.getItem("loopSetings"),
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
