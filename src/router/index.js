/*
 * @Description: 路由入口
 * @Author: icony/精武陈真
 * @Date: 2019-06-21 11:18:48
 * @LastEditTime: 2019-11-08 19:10:30
 * @LastEditors: Duchin/梁达钦
 */
import Vue from '@icony/vue-container/vue'
import Router from '@icony/vue-container/vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import LoginLayout from '@/views/login'
import RegisterLayout from '@/views/registration/index'
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
    name: 'Home',
    component: () => import('@/views/home/index')
  },
  {
    path: '/login',
    component: LoginLayout,
    children: [
      {
        path: '/',
        name: 'LoginOne',
        component: () => import('@/views/login/create/login')
      },
      {
        path: 'logincode',
        name: 'LoginCode',
        component: () => import('@/views/login/create/loginCode')
      }
    ]
  },
  {
    path: '/register',
    component: RegisterLayout,
    children: [
      {
        path: '/',
        name: 'Registration',
        component: () => import('@/views/registration/create/registration.vue')
      },
      {
        path: 'registrationEmail',
        name: 'RegistrationEmail',
        component: () => import('@/views/registration/create/registrationEmail.vue')
      },
      {
        path: 'registrationCode',
        name: 'RegistrationCode',
        component: () => import('@/views/registration/create/registrationCode.vue')
      }
    ]
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    redirect: '/layout/account',
    children: [
      {
        path: 'account',
        name: 'Ccount',
        component: () => import('@/views/account')
      },
      {
        path: 'actionLogList',
        name: 'ActionLogList',
        component: () => import('@/views/actionLogList')
      }
    ]
  },
  {
    path: '/adminLayout',
    name: 'AdminLayout',
    component: AdminLayout,
    redirect: '/adminLayout/activeCodeList',
    children: [
      {
        path: 'activeCodeList',
        name: 'ActiveCodeList',
        component: () => import('@/views/activeCodeList')
      },
      {
        path: 'activeQuantityList/:id',
        name: 'ActiveCodeList',
        component: () => import('@/views/activeQuantityList')
      },
      {
        path: 'userList',
        name: 'UserList',
        component: () => import('@/views/userList')
      },
      {
        path: 'instanceList',
        name: 'InstanceList',
        component: () => import('@/views/instanceList')
      },
      {
        path: 'instanceDetail/:id',
        name: 'instanceDetail',
        component: () => import('@/views/instanceDetail')
      },
      {
        path: 'logList',
        name: 'LogList',
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
