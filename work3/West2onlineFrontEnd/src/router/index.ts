// router/index.ts
import {createRouter, createWebHashHistory, } from 'vue-router'
import AuthenticationView from '@/views/AuthenticationView.vue'
import CustomLoginForm from '@/components/CustomLoginForm.vue'
import TestView from '@/views/TestView.vue'
import HomeView from '@/views/HomeView.vue' 
import TablePresentationViewVue from '@/views/TablePresentationView.vue'

const router = createRouter({
  history: createWebHashHistory(), 
  routes: [
    {
      name: 'authentication',
      path: '/authentication',
      component: AuthenticationView,
      children: [
        {
          name: 'login',
          path: '',
          component: CustomLoginForm,
        },
        {
          name: 'register',
          path: 'register',
          component: () => import('@/components/CustomRegisterForm.vue')
        },
        {
          name: 'reset-password',
          path: 'reset-password',
          component: () => import('@/components/CustomResetPasswordForm.vue')
        },
      ]
    },
    {
      name: 'home',
      path: '/home',
      component: HomeView,
      children: [
        {
          name: 'todolist',
          path: '',
          component: () => import('@/views/TodoListView.vue'),
        },
        {
          name: 'table-presentation',
          path: 'table-presentation',
          component: TablePresentationViewVue,
        },
        {
          name: 'test',
          path: '/test',
          component: TestView,
        }
      ]
    },
    {
      path:'/',
      redirect: '/authentication'
      // redirect: '/home'
    }
  ]
})

export default router
