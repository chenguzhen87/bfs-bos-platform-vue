/*
 * @Description: 路由入口
 * @Author: icony/精武陈真
 * @Date: 2019-06-21 11:18:48
 * @LastEditTime: 2019-11-06 20:33:33
 * @LastEditors: icony/精武陈真
 */
import Vue from '@icony/vue-container/vue'
import Router from '@icony/vue-container/vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import LoginLayout from '@/views/login'
import AdminLayout from '@/layout/AdminLayout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/home/index')
  },
  {
    path: '/login',
    component: LoginLayout,
    children: [
      {
        path: '/',
        component: () => import('@/views/login/create/login')
      }, 
      {
        path: 'vcode',
        name: 'vcode',
        component: () => import('@/views/login/create/loginCode'),
      }
    ]
  },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/account',
    children: [
      {
        path: 'account',
        component: () => import('@/views/account')
      },
      {
        path: 'actionLogList',
        component: () => import('@/views/actionLogList')
      }
    ]
  },
  {
    path: '/adminLayout',
    component: AdminLayout,
    redirect: '/adminLayout/activeCodeList',
    children: [
      {
        path: 'activeCodeList',
        component: () => import('@/views/activeCodeList')
      },
      {
        path: 'userList',
        component: () => import('@/views/userList')
      },
      {
        path: 'instanceList',
        component: () => import('@/views/userList')
      },
      {
        path: 'logList',
        component: () => import('@/views/actionLogList')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
