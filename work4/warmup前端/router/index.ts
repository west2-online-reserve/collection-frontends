import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes:Array<RouteRecordRaw> = [
    { name: 'home', path: '/home', component:() => import('@/components/Home.vue') }
  ]
const router = createRouter({
    history: createWebHistory(), 
    routes
})
export default router