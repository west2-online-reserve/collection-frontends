import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Write from '../components/Write.vue'
import My from '../components/My.vue'
import MyArticles from '../components/myArticles.vue'
import MyLikes from '../components/myLikes.vue'
import Set from '../components/Set.vue'
import AboutMe from '../components/aboutMe.vue'
import Settings from '../components/settings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/write',
      name: 'write',
      component: Write
    },
    {
      path: '/my',
      name: 'my',
      component: My,
      children:[
        {
          path:'myArticles',
          name:'myArticles',
          component: MyArticles
        },
        {
          path:'myLikes',
          name:'myLikes',
          component: MyLikes
        }
      ]
    },
    {
      path: '/set',
      name: 'set',
      component: Set,
      children:[
        {
          path:'aboutMe',
          name:'aboutMe',
          component: AboutMe
        },
        {
          path:'settings',
          name:'settings',
          component: Settings
        }
      ]
    },
  ]
})

export default router