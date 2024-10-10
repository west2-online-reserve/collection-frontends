import { createRouter,createWebHistory } from "vue-router";
// 导入组件
import Chat from '../views/Chat.vue';
import Login from '../views/Login.vue';
import Room from '../views/Room.vue';
// 定义路由关系
const routes=[
    {path :'/',component: Login},
    {path :'/Chat',component: Chat}
]
// 创建路由器
const router=createRouter({
    history:createWebHistory(),
    routes:routes
})
// 导出路由
export default router
