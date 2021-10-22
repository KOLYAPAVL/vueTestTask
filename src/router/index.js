import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    meta: {
      auth: false,
      title: "Вход | SibDev",
    },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/schemes',
    name: 'MySchemes',
    meta: {
      auth: true,
      title: "Мои схемы | SibDev",
    },
    component: () => import('../views/MySchemes.vue'),
  },
  {
    path: '/schemes/create',
    name: 'CreateSchemes',
    meta: {
      title: "Создать схему | SibDev",
      auth: true,
    },
    component: () => import('../views/CreateScheme.vue'),
  },
  {
    path: '/schemes/change/:id',
    name: 'ChangeScheme',
    meta: {
      title: "Изменить схему | SibDev",
      auth: true,
    },
    component: () => import('../views/ChangeScheme.vue'),
  },
  {
    path: '/schemes/show/:id',
    name: 'ShowSchemes',
    meta: {
      title: "Тестирование схемы | SibDev",
      auth: true,
    },
    component: () => import('../views/ShowSchemes.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
