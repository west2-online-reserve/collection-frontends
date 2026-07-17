import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ReadArticle from '../views/ReadArticle.vue'
import UserIndex from '../views/UserIndex.vue'
import Setting from '../views/Setting.vue'
import WriteArticle from '../views/WriteArticle.vue'
import Login from '../views/Login.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/article', component: ReadArticle },
  { path: '/user', component: UserIndex },
  { path: '/setting', component: Setting },
  { path: '/write', component: WriteArticle }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router