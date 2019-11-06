/*
 * @Description: 数据仓库入口
 * @Author: icony/精武陈真
 * @Date: 2019-06-21 11:18:48
 * @LastEditTime: 2019-09-11 10:47:35
 * @LastEditors: icony/精武陈真
 */
import Vue from '@icony/vue-container/vue'
import Vuex from '@icony/vue-container/vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store
