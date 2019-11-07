/*
 * @Description: 权限控制
 * @Author: icony/精武陈真
 * @Date: 2019-11-06 10:57:45
 * @LastEditTime: 2019-11-07 19:32:46
 * @LastEditors: Duchin/梁达钦
 */
import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getCookie } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = [
  '/',
  'home',
  '/login',
  '/register',
  '/login/logincode',
  '/404'
  // '/layout',
  // '/layout/account',
  // '/adminLayout/activeCodeList',
  // '/layout/account'
] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getCookie()

  if (hasToken) {
    if (whiteList.indexOf(to.name) > -1) {
      // if is logged in, redirect to the home page
      next({ path: '/layout' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    // debugger
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      console.log('whiteList.indexOf')
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      debugger
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
