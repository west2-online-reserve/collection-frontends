// user.ts
import {type UserInfo, type UserInfoCollection} from '@/backup/userInfo';

import { ref, reactive,  computed, toRefs} from 'vue';
import { v4 as uuidv4 } from 'uuid';

import { defineStore } from 'pinia';
import {storeToRefs} from 'pinia'

export const useUserStore = defineStore(
  'userInfoCollection', 
  () => 
  {
    // the collection of user info
    const userInfoCollection = reactive<UserInfoCollection>(JSON.parse(localStorage.getItem('userInfoCollection') as string || '[]'));

    // register
    const register = (userInfo: UserInfo) => {
      userInfoCollection.users.push({
        id: uuidv4(),
        // 扩展运算符...将userInfo对象中的所有属性复制到新对象中
        // ...userInfo,
        username:userInfo.username,
        password: userInfo.password,
        email: userInfo.email,
        noLoginAgain: userInfo.noLoginAgain,
        checkedDate: userInfo.checkedDate
      })
      localStorage.setItem('userInfoCollection', JSON.stringify(userInfoCollection))
    }

    // login Checkout
    // TO DO 检索数据
    // function isUsernameExists(username: string): boolean {
    //   for (const user of userInfoCollection.users) {
    //     if (user.username === username) {
    //       return true; // 用户名已存在
    //     }
    //   }
    //   return false; // 用户名不存在
    // }

    // login
    // TO DO 登录
    const login = (userInfo: UserInfo) => {
      // const user = userInfoCollection.find((user) => user.username === userInfo.username)
      // const isValid = isUserExist(userInfo.username);
      // if()
    }

    // reset password
    // TO DO 修改密码
    const resetPassword = (userInfo: UserInfo) => {
      // const user = userInfoCollection.find((user) => user.username === userInfo.username)
    }

    return { 
      userInfoCollection,
      register,
      // isUsernameExists,

    }
  },
  // persisted state
  {
    persist: true,
    // storage: sessionStorage , // default: localStorage
  },
)
