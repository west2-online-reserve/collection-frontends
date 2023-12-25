import { createRouter,createWebHistory } from "vue-router";
// 导入组件
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import TodoList from '../views/home/todolist.vue';
import Table from '../views/home/TableDisplay.vue';
import UserInfo from '../views/home/UserInfo.vue';

// 定义路由关系
const routes=[
    {path :'/login',component: Login},
    {path :'/',component: Home,redirect:'/home/todolist' ,children: [
        {path:'/home/todolist',component:TodoList},
        {path:'/home/tabledisplay',component:Table},
        {path:'/home/userInfo',component: UserInfo},
    ]},
    
]
// 创建路由器
const router=createRouter({
    history:createWebHistory(),
    routes:routes
})
// 导出路由
export default router