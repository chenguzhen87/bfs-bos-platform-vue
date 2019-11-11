/*
 * @Description: main
 * @Author: Duchin/梁达钦
 * @Date: 2019-11-07 17:39:27
 * @LastEditTime: 2019-11-11 16:15:31
 * @LastEditors: Duchin/梁达钦
 */
import Vue from '@icony/vue-container/vue'
import VueI18n from 'vue-i18n'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import enUS from 'element-ui/lib/locale/lang/en' // lang i18n 英文
import zhCN from 'element-ui/lib/locale/lang/zh-CN' // lang i18n 中文

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import * as filters from './filters' // global filters

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: store.getters.lang, // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale
  messages: {
    'zh-cn': {
      ...require('./i18n/zh-CN'),
      ...zhCN
    }, // 中文语言包
    'en-us': {
      ...require('./i18n/en-US'),
      ...enUS
    } // 英文语言包
  }
})
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// store routr 注册全局
window.APP_GLOBAL_STORE = store
window.APP_GLOBAL_ROUTER = router
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
