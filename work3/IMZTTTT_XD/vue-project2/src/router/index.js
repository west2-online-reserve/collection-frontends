import { createRouter,createWebHistory } from "vue-router";
// 导入组件
import Layout from '@/views/Layout.vue';
import Login from '@/views/Login.vue';
import TodoList from '@/views/menu/todolist.vue';
import form from '@/views/menu/form.vue';

// 定义路由关系
const routes=[
    {path :'/login',component: Login},
    {path :'/',component: Layout,redirect:'/menu/todolist' ,children: [
        {path:'/menu/todolist',component:TodoList},
        {path:'/menu/form',component:form},
    ]},
]
// 创建路由器
const router=createRouter({
    history:createWebHistory(),
    routes:routes
})
// 导出路由
export default router
