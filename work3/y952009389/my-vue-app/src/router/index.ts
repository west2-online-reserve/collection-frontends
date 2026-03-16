// 创建一个路由器并暴露出去

// 引入路由对象
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
 
// 路由数组的类型 RouteRecordRaw
// 创建一些路由，每个路由需要分别对应一个组件。
const routes:Array<RouteRecordRaw> = [
    { name: 'register', path: '/register', component:() => import('../components/Register.vue') },
    { name: 'login', path: '/login', component:() => import('../components/Login.vue') },
    { name: 'todo', path: '/todo', component:() => import('../components/TodoList.vue') },
    { name: 'table', path: '/table', component:() => import('../components/TableView.vue') },
  ]

// 创建路由器
const router = createRouter({
    history: createWebHistory(), //路由器的工作模式
    routes //路由数组
})
 
//暴露路由器
export default router
