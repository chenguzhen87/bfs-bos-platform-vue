/*
 * @Description:Cookie
 * @Author: Duchin/梁达钦
 * @Date: 2019-11-07 15:52:57
 * @LastEditTime: 2019-11-07 18:57:31
 * @LastEditors: Duchin/梁达钦
 */
import Cookies from '@icony/vue-container/js-cookie'

const TokenKey = process.env.VUE_APP_TOKEN
export function getCookie(key) {
  if (key === undefined) {
    return Cookies.get(TokenKey)
  } else {
    return Cookies.get(key)
  }
}

export function setCookie(key, token) {
  if (token === undefined) {
    return Cookies.set(TokenKey, key)
  } else {
    return Cookies.set(key, token)
  }
}

export function removeCookie(key) {
  if (key === undefined) {
    return Cookies.remove(TokenKey)
  } else {
    return Cookies.remove(key)
  }
}
