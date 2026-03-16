import {createRouter,createWebHistory} from 'vue-router'
import PersonInfo from '@/pages/PersonInfo.vue'
import MainPage from '@/pages/MainPage.vue'
import OtherPersonInfo from '@/pages/OtherPersonInfo.vue'
import Detail from '@/pages/Detail.vue'
import Ask from '@/pages/Ask.vue'
import Write from '@/pages/Write.vue'
import Draft from '@/pages/Draft.vue'
import Settings from '@/pages/Settings.vue'
const router=createRouter({
    history:createWebHistory(),
    routes:[
        {
            name:'detail',
            path:'/detail',
            component: Detail
        },
        {
            name:'personInfo',
            path:'/personInfo',
            component:PersonInfo
        },
        {
            name:'mainPage',
            path:'/mainPage',
            component: MainPage,
        },
        {
            name:'otherPersonInfo',
            path:'/otherPersonInfo',
            component: OtherPersonInfo
        },
        {
            name:'ask',
            path:'/ask',
            component:Ask
        },
        {
            name:'write',
            path:'/write',
            component:Write
        },
        {
            name:'draft',
            path:'/draft',
            component:Draft
        },
        {
            name:'settings',
            path:'/settings',
            component:Settings
        },
        {
            path:'/',
            redirect:'/mainPage'
        }
    ]

})

export default router