import { createRouter, createWebHistory, type Router } from 'vue-router'
import Login from '../views/Login.vue';
import HomeView from '../views/HomeView.vue';
import TodoList from '../views/TodoList.vue';
import TableShow from '../views/TableShow.vue';
import UserInfoVue from '../views/UserInfo.vue';
import { useUserStore } from '../stores/user';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   
    {
      path:'/',
      name:'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta:{
        requireAuth:true
      },
      redirect:'/home/todolist',
      children:[
        {
          path:'/home/todolist',
          name:'todolist',
          component:TodoList
        },
        {
          path:'/home/tableshow',
          name:'tableShow',
          component:TableShow
        },
        {
          path:'/home/userInfo',
          name:'userInfo',
          component:UserInfoVue
        }
      ]
    },
   
    
  ]
})
//11111111:11111111111wW
export default router;

router.beforeEach((to,from,next)=>{
  console.log('to:'+to.fullPath+' from:'+from.fullPath+' next:'+next.toString);
  if(to.meta.requireAuth){
    const isLoggedIn=useUserStore().isLoggedIn;
    console.log(isLoggedIn);
    if(isLoggedIn===true){
      next();
    }else{
      next({path:'/login'})
    }
  }else{
    next();
  }
});

