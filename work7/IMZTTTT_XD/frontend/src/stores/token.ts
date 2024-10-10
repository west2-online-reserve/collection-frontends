import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useTokenStore = defineStore('token',()=>{
    //1.定义描述token
    const token = ref('')

    //2.定义修改token的方法
    const setToken = (newToken:string)=>{
        token.value = newToken
    }

    //3.定义移除token的方法
    const removeToken = ()=>{
        token.value=''
    }
    return {
        token,setToken,removeToken
    }
}
,
//参数持久化
{
    persist:true
}
)