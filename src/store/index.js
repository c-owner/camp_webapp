import Vue from 'vue'
import Vuex from 'vuex'

import userInfo from "./user/UserInfo"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    userInfo,
  }
})
