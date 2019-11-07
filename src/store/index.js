import Vue from '@icony/vue-container/vue'
import Vuex from '@icony/vue-container/vuex'
import getters from './getters'
import user from './modules/user'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
  },
  getters
})

export default store
