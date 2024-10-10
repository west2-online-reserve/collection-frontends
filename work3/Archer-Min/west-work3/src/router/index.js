// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import TodoList from '../views/TodoList.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/todo',
    component: TodoList
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
