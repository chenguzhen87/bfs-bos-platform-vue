/*
 * @Description: 用户
 * @Author: icony/精武陈真
 * @Date: 2019-09-16 19:25:47
 * @LastEditTime: 2019-11-08 14:26:21
 * @LastEditors: Duchin/梁达钦
 */
import {
  logout,
  loginCodeTwo
} from '@/api/user'
import { getCookie, setCookie, removeCookie } from '@/utils/auth'
import { resetRouter } from '@/router'
import { batchUpdateState, getNavigatorLang } from '@/utils'
import { UPDATE_USER_INFO, BATCH_UPDATE_STATE } from '@/utils/mutation-types'

const bos_user = process.env.VUE_APP_USER
const bos_email = process.env.VUE_APP_EMAIL
const user = window.localStorage.getItem(bos_user)
const email = window.localStorage.getItem(bos_email)

const state = {
  token: getCookie() || '',
  lang: getNavigatorLang() || 'zh-cn',
  currentUser: user && user !== 'undefined' ? JSON.parse(user) : '',
  email: email || ''
}

const mutations = {
  [BATCH_UPDATE_STATE]: (state, payload) => {
    batchUpdateState(state, payload)
  },
  [UPDATE_USER_INFO]: (state, payload) => {
    const data_email = payload.data.data.email || 'dongxucheng@126.com'
    const data_token = payload.data.data.token || 'dxc_token'
    const data_role = payload.data.data.role || 'common' // admin
    const currentUser = {
      token: data_token,
      email: data_email,
      role: data_role
    }
    const stateData = { token: data_token, lang: getNavigatorLang() || 'zh-cn', currentUser, email: data_email }
    setCookie(data_token)
    window.localStorage.setItem(bos_user, JSON.stringify(currentUser))
    window.localStorage.setItem(bos_email, data_email)

    batchUpdateState(state, stateData)
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      loginCodeTwo(userInfo).then(
        async response => {
          await commit(UPDATE_USER_INFO, response)
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
      commit(BATCH_UPDATE_STATE, { token: '', lang: 'zh-cn', currentUser: '', email: '' })
      removeCookie() // token
      removeCookie(bos_email)
      window.localStorage.removeItem(bos_user)
      window.localStorage.removeItem(bos_email) // bos_email
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

