/*
 * @Description:request
 * @Author: Duchin/梁达钦
 * @Date: 2019-11-07 17:39:27
 * @LastEditTime: 2019-11-11 16:47:40
 * @LastEditors: Duchin/梁达钦
 */
import axios from '@icony/vue-container/axios'
import { Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'
// import apiBaseUrl from 'apiBaseUrl'
import { getCookie } from '@/utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: API_BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const hasToken = getCookie()
    if (hasToken) {
      // let each request carry token
      // ['token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['token'] = store.getters.token
      config.headers.authorization = hasToken
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.log('response', response) // for debug
    const res = response.data
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      // 401 token无效
      if (res.code === 401) {
        // to re-login
        Message({
          message: res.msg || '无权限访问或者权限失效，请重新登录。',
          type: 'error',
          duration: 5 * 1000
        })
        store.dispatch('user/resetUserInfo').then(() => {
          // APP_GLOBAL_ROUTER.push('/login')
          // location.href="/login"
          window.APP_GLOBAL_ROUTER.replace({
            path: '/login',
            query: { redirect: window.APP_GLOBAL_ROUTER.currentRoute.fullPath }// 登录成功后跳入浏览的当前页面
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return response
    }
  },
  error => {
    console.log('err', error) // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error.response)
  }
)

export default service
