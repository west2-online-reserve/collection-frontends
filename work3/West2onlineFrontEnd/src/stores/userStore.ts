// userStore.ts
import { reactive } from 'vue';
//interface
import { type UserInfo, type LoginStatus} from '@/types/userInfo';
// store
import { defineStore } from 'pinia'

export const useUserStore =  defineStore('user-of-schedule', () =>{
    // 用户数据
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
    
    // 登录状态
    const loginStatus = reactive<LoginStatus>({
        isLoggedIn: undefined,
        noLoginAgain: undefined,
        checkedDate: undefined,
    })

    const updateLoginStatus = (IsLoggedIn = false, NoLoginAgain = false, CheckedDate = '') => {
        loginStatus.isLoggedIn = IsLoggedIn;
        loginStatus.noLoginAgain = NoLoginAgain;
        loginStatus.checkedDate = CheckedDate;
    }

    // update the userInfo
    const updateInfoInLocalStorage =() => {
        localStorage.setItem('user-of-schedule', JSON.stringify(userInfo));
    }

    // 注册
    // 设置用户数据
    // 并后续导入用户数据组
    const registerAccount = (user: UserInfo):UserInfo => {
        userInfo.id = user.id;
        userInfo.username = user.username;
        userInfo.password = user.password;
        userInfo.email = user.email;

        localStorage.setItem('user-of-schedule', JSON.stringify(userInfo));

        return user;
    };

    // 清除用户数据
    // 并后续删除用户组中数据
    // use clearAccountInfoInsideLocalStorage after updateLoginStatus
    const clearAccountInfoInsideLocalStorage = ():void => {
        userInfo.id = undefined;
        userInfo.username = undefined;
        userInfo.password = '';
        userInfo.email = '';

        // localStorage.removeItem('user-of-schedule');
        localStorage.setItem('user-of-schedule', JSON.stringify(userInfo));
    };

    // 退出登录
    const logoutAccount = ():void => {
        loginStatus.isLoggedIn = false;
        loginStatus.noLoginAgain = false;
        loginStatus.checkedDate = undefined;
    };

    // 时间检测
    const checkDate = (date:string):boolean => {
        console.log(date, "上次免登录时间");
        return true;
    }

    // 自动登录
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
