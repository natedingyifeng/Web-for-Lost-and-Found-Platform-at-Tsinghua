import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue')
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
    path: '/certification-application-list',
    name: 'certification-application-list',
    component: () => import('../views/certification_application_list.vue')
  },
  {
    path: '/report-list',
    name: 'report-list',
    component: () => import('../views/report_list.vue')
  },
  {
    path: '/property-types-list',
    name: 'property-types-list',
    component: () => import('../views/property_types_list.vue')
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
  },
  {
    path: '/property-templates/:templateId',
    name: 'property-templates',
    component: () => import('../views/property_templates.vue')
  },
  {
    path: '/certification-application/:certificationApplicationId',
    name: 'certification-application',
    component: () => import('../views/certification_application.vue')
  },
  {
    path: '/report/:reportId',
    name: 'report',
    component: () => import('../views/report.vue')
  },
  {
    path: '/analysis',
    name: 'anslysis',
    component: () => import('../views/analysis.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../views/map.vue')
  },
  {
    path: '/create-accounts',
    name: 'create-accounts',
    component: () => import('../views/account.vue')
  },
  {
    path: '/create-accounts-invitation/:token',
    name: 'create-accounts-invitation',
    component: () => import('../views/account_invitation.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/matching-entries',
    name: 'matching-entries',
    component: () => import('../views/matching_entries_list.vue')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('../views/help.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router