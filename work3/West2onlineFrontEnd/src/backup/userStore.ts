// userStore.ts
import { reactive } from 'vue';
//interface
import { type UserInfo, type LoginStatus} from '@/backup/userInfo';
import {type User} from '@/types/userManagement';
// store
import { defineStore } from 'pinia'

export const useUserStore =  defineStore('user-of-schedule', () =>{
    // user information
    const user = reactive<User>({
        account: {
            id: undefined,
            username: undefined,
            password: undefined,
            email: undefined,
        },
        loginStatus: {
            isLoggedIn: undefined,
            noLoginAgain: undefined,
            checkedDate: undefined,
        },
        todoList: undefined,
    });

    const userInfo = reactive<UserInfo>({
        id: undefined,
        username: '',
        password: '',
        email: '',
    });

    // Update the userInfo
    const updateUserInfo = (user: UserInfo) => {
        userInfo.id = user.id;
        userInfo.username = user.username;
        userInfo.password = user.password;
        userInfo.email = user.email;
    }
    
    // Login Status
    const loginStatus = reactive<LoginStatus>({
        isLoggedIn: undefined,
        noLoginAgain: undefined,
        checkedDate: undefined,
    })

    // Update the loginStatus
    const updateLoginStatus = (IsLoggedIn = false, NoLoginAgain = false, CheckedDate = '') => {
        loginStatus.isLoggedIn = IsLoggedIn;
        loginStatus.noLoginAgain = NoLoginAgain;
        loginStatus.checkedDate = CheckedDate;
    }

    // update the userInfo
    const updateInfoInLocalStorage =() => {
        console.log(JSON.parse(localStorage.getItem('user-of-schedule') as string));
        localStorage.setItem('user-of-schedule', JSON.stringify(userInfo));
    }

    // Register Account
    // 设置用户数据
    // 并后续导入用户数据组
    const registerAccount = (user: UserInfo):UserInfo => {
        userInfo.id = user.id;
        userInfo.username = user.username;
        userInfo.password = user.password;
        userInfo.email = user.email;
        console.log(JSON.parse(localStorage.getItem('user-of-schedule') as string));
        // localStorage.setItem('user-of-schedule', JSON.stringify(userInfo));

        return user;
    };

    // Clear Account Info Inside LocalStorage
    // 并后续删除用户组中数据
    // use clearAccountInfoInsideLocalStorage after updateLoginStatus
    const clearAccountInfoInsideLocalStorage = ():void => {
        userInfo.id = undefined;
        userInfo.username = undefined;
        userInfo.password = '';
        userInfo.email = '';

        // localStorage.removeItem('user-of-schedule');
        console.log(JSON.parse(localStorage.getItem('user-of-schedule') as string));
        localStorage.setItem('user-of-schedule', JSON.stringify(userInfo));
    };

    // Log out
    const logoutAccount = ():void => {
        // const newLoginStatus = Object.assign(userInfo, loginStatus);
        loginStatus.isLoggedIn = false;
        loginStatus.noLoginAgain = false;
        loginStatus.checkedDate = '';
        JSON.parse(localStorage.getItem('user-of-schedule') as string);
        // localStorage.setItem('user-of-schedule', JSON.stringify(newLoginStatus));
    };

    // Check Date
    const checkDate = (date:string):boolean => {
        console.log(date, "上次免登录时间");
        return true;
    }

    // Autologin
    // 综合考虑 1.是否免登录 2.免登录是否超时 3用户数据是否正确
    const isAutoLogin = (): boolean => {
        // 页面加载时检查localStorage是否有保存的用户数据
        const savedUser = localStorage.getItem('user-of-schedule');
        
        if (!savedUser) return false ;
        
        const savedUserInfo = JSON.parse(savedUser as string);
        console.log(savedUserInfo.loginStatus);
        const {isLoggedIn, noLoginAgain, checkedDate } =  savedUserInfo.loginStatus

        if (!isLoggedIn) {
            return false;
        } else if (!noLoginAgain){
            loginStatus.isLoggedIn = false;
            return false;
        } else if (!checkDate(checkedDate)) {
            loginStatus.isLoggedIn = false;
            loginStatus.noLoginAgain = false;
            loginStatus.checkedDate = undefined;
            return false;
        } else {
            // 跳转主页面
            return true; 
        }
    }

    return {
        userInfo,
        updateUserInfo,
        
        loginStatus,
        updateLoginStatus,
        
        updateInfoInLocalStorage,

        registerAccount,
        
        clearAccountInfoInsideLocalStorage,
        
        logoutAccount,
        
        isAutoLogin,
    };
},  // persisted state
{
  persist: true,
  // storage: sessionStorage , // default: localStorage
},
)
