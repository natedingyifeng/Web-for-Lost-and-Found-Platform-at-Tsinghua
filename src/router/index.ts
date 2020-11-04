import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   component: () => import('../views/admin.vue'),
  //   meta: {
  //     title: '管理者界面'
  //   }
  // },
  // {
  //   path: '/index',
  //   name: 'index',
  //   component: () => import('../views/index.vue')
  // },
  // {
  //   path: '/userList',
  //   name: 'userList',
  //   component: () => import('../views/user-list.vue')
  // },
  // {
  //   path: '/user/:userId',
  //   name: 'user',
  //   component: () => import('../views/user.vue')
  // },
  // {
  //   path: '/equipment/:equipmentId',
  //   name: 'equipment',
  //   component: () => import('../views/equipment.vue')
  // },
  // {
  //   path: '/rent-application/:rentApplicationId',
  //   name: 'rent-application',
  //   component: () => import('../views/rent-application.vue')
  // },
  // {
  //   path: '/renter-application/:renterApplicationId',
  //   name: 'renter-application',
  //   component: () => import('../views/renter-application.vue')
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('../views/login.vue')
  // },
  // {
  //   path: '/adminLogin',
  //   name: 'adminLogin',
  //   component: () => import('../views/loginAdmin.vue')
  // },
  // {
  //   path: '/registration',
  //   name: 'registrationn',
  //   component: () => import('../views/registration.vue')
  // },
  // {
  //   path: '/analysis',
  //   name: 'anslysis',
  //   component: () => import('../views/analysis.vue')
  // },
  // {
  //   path: '/create-equipment',
  //   name: 'create-equipment',
  //   component: () => import('../views/create-equipment.vue')
  // },
  // {
  //   path: '/create-renter-application',
  //   name: 'create-renter-application',
  //   component: () => import('../views/create-renter-application.vue')
  // },
  // {
  //   path: '/create-rent-application/:equipmentId',
  //   name: 'create-rent-application',
  //   component: () => import('../views/create-rent-application.vue')
  // },
  // {
  //   path: '/release-application/:releaseApplicationId',
  //   name: 'release-application',
  //   component: () => import('../views/release-application.vue')
  // },
  // {
  //   path: '/create-release-application/:equipmentId',
  //   name: 'create-release-application',
  //   component: () => import('../views/create-release-application.vue')
  // },
  // {
  //   path: '/renter-application-list',
  //   name: 'renter-application-list',
  //   component: () => import('../views/renter-application-list.vue')
  // },
  // {
  //   path: '/rent-application-list',
  //   name: 'rent-application-list',
  //   component: () => import('../views/rent-application-list.vue')
  // },
  // {
  //   path: '/release-application-list',
  //   name: 'release-application-list',
  //   component: () => import('../views/release-application-list.vue')
  // },
  {
    path: '/',
    name: 'lost-list',
    component: () => import('../views/lost_list.vue')
  },
  {
    path: '/lost-list',
    name: 'lost-list',
    component: () => import('../views/lost_list.vue')
  },
  {
    path: '/found-list',
    name: 'found-list',
    component: () => import('../views/found_list.vue')
  },
  {
    path: '/user-list',
    name: 'user-list',
    component: () => import('../views/user_list.vue')
  },
  {
    path: '/lost/:lostId',
    name: 'lost',
    component: () => import('../views/lost.vue')
  },
  {
    path: '/found/:foundId',
    name: 'found',
    component: () => import('../views/found.vue')
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import('../views/user.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router