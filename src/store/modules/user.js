/*
 * @Description: 用户
 * @Author: icony/精武陈真
 * @Date: 2019-09-16 19:25:47
 * @LastEditTime: 2019-11-07 18:58:30
 * @LastEditors: Duchin/梁达钦
 */
import {
  logout,
  loginCodeTwo
} from '@/api/user'
import { getCookie, setCookie, removeCookie } from '@/utils/auth'
import { resetRouter } from '@/router'
import { batchUpdateState, getNavigatorLang } from '@/utils'
// import { emit } from 'cluster'
const bos_user = process.env.VUE_APP_LANG
const bos_email = process.env.VUE_APP_EMAIL
const user = window.localStorage.getItem(bos_user)
const email = window.localStorage.getItem(bos_email)

const state = {
  token: getCookie() || '',
  lang: getNavigatorLang() || 'zh-cn',
  currentUser: user && user != 'undefined' ? JSON.parse(user) : '',
  email: email || ''
}

const mutations = {
  batchUpdateState: (state, payload) => {
    batchUpdateState(state, payload)
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      loginCodeTwo(userInfo).then(
        response => {
          const data_email = response.data.email || 'dongxucheng@126.com'
          const data_token = response.data.data.token || 'dxc_token'
          const data_role = response.data.data.role || 'common' // admin
          const currentUser = {
            token: data_token,
            email: data_email,
            role: data_role
          }
          setCookie(data_token)
          window.localStorage.setItem(bos_user, JSON.stringify(currentUser))
          window.localStorage.setItem(bos_email, data_email)
          commit('batchUpdateState',
            { token: data_token, lang: 'zh-cn', currentUser, email: data_email })

          resolve(true)
        },
        err => {
          reject(err)
        }
      )
    })
  },
  // user logout
  logout({ dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then((result) => {
        dispatch('resetUserInfo').then(() => {
          console.log(APP_GLOBAL_ROUTER)
          // location.href="/login"
          APP_GLOBAL_ROUTER.push('/login')
        })
        resetRouter()
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetUserInfo({ commit }) {
    return new Promise(resolve => {
      commit('batchUpdateState', { token: '', lang: 'zh-cn', currentUser: '', email: '' })
      removeCookie() // token
      removeCookie(process.env.VUE_APP_BOS_EMAIL)
      window.localStorage.removeItem(process.env.VUE_APP_BOS_USER)
      // removeCookie(process.env.VUE_APP_BOS_USER) // beehub_user
      window.localStorage.removeItem(process.env.VUE_APP_BOS_EMAIL) // bos_email
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

