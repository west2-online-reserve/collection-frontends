import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',component: ()=> import('@/views/login/LoginPage.vue')
    },
    {
      path: '/', component: () => import('@/views/layout/LayoutPage.vue'), redirect: '/todolist',
      children: [
        {path:'/todolist',component:()=>import('@/views/todolist/TodolistPage.vue')},
        {path:'/listshow',component:()=>import('@/views/listshow/ListshowPage.vue')}
      ]
    }
  ]
})
export default router
