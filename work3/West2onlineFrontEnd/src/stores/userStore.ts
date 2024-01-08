// userStore.ts
import { reactive } from 'vue';
//interface
import { defaultUser, type CheckedDate, type User } from '@/types/userManagement';
import {  } from '@/types/userManagement';
// store
import { defineStore } from 'pinia'
import { type TodoItem, type TodoList } from '@/types/todoList';

// test mode
const TESTMODE = false;

export const useUserStore =  defineStore('user-of-schedule', () =>{
    // user information
    // const user = reactive<User>({
    //     account: {
    //         id: undefined,
    //         username: undefined,
    //         password: undefined,
    //         email: undefined,
    //     },
    //     loginStatus: {
    //         isLoggedIn: undefined,
    //         noLoginAgain: undefined,
    //         checkedDate: undefined,
    //     },
    //     todoList: undefined,
    // });
    const user = reactive<User>(JSON.parse(localStorage.getItem('user-of-schedule') as string || '{}'));

    const getUserName = () => {
        return user.account.username;
    };
    const getUserEmail = () => {
        return user.account.email;
    }

    // update the LocalStorage
    const updateLocalStorage = (userTobeupdated:User = defaultUser) => {
        if (TESTMODE) {
            console.log("updateLocalStorage:", user);
        }
        user.account = userTobeupdated.account;
        user.loginStatus = userTobeupdated.loginStatus;
        user.todoList = userTobeupdated.todoList;
        // console.log(localStorage.setItem('user-of-schedule', JSON.stringify(user)));
        localStorage.setItem('user-of-schedule', JSON.stringify(userTobeupdated));
    }

    const updateLoginStatusOfLocalStorage = (userTobeupdated:User = defaultUser) => {
        user.loginStatus = userTobeupdated.loginStatus;
        updateLocalStorage(user);
    }

    // Clear LocalStorage
    const clearUserLocalStorage = ():void => {
        updateLocalStorage();
        localStorage.removeItem('user-of-schedule');
    };

    // Log out
    const logoutAccountOfUser = ():void => {
        user.loginStatus.isLoggedIn = false;
        user.loginStatus.noLoginAgain = false;
        user.loginStatus.checkedDate = undefined;
        localStorage.setItem('user-of-schedule', JSON.stringify(user));
    };

    // Check Date
    const checkDate = (date:CheckedDate):boolean => {
        if (user.loginStatus.checkedDate == undefined) {
            return false
        }
        const {year:originalYear, month:originalMonth, day:originalDay} = user.loginStatus.checkedDate;
        const originalTimestamp = new Date(originalYear, originalMonth - 1, originalDay).getTime();
        const inputTimestamp = new Date(date.year, date.month - 1, date.day).getTime();
        const timeDifference = Math.abs(inputTimestamp - originalTimestamp);
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        if (daysDifference > 30) {
            return false;
        }
        if (TESTMODE) console.log(date, "No login time last time");
        return true;
    }

    // Autologin
    // 1. Check whether the login is not required. 
    // 2. Check whether the login is timed out. 
    // 3. Check whether user data is correct
    const isAutoLogin = (): boolean => {
        // Check whether user data is stored in localStorage when the page is loaded
        const savedUser = localStorage.getItem('user-of-schedule');
        
        if (!savedUser) return false ;
        
        const savedUserInfo = JSON.parse(savedUser as string);
        const {isLoggedIn, noLoginAgain, checkedDate } =  savedUserInfo.loginStatus
        if (!isLoggedIn) {
            return false;
        } else if (!noLoginAgain){
            user.loginStatus.isLoggedIn = false;
            return false;
        } else if (!checkDate(checkedDate)) {
            user.loginStatus.isLoggedIn = false;
            user.loginStatus.noLoginAgain = false;
            user.loginStatus.checkedDate = undefined;
            return false;
        } else {
            return true; 
        }
    }

    // todolist
    const updateTodoListOfLocalUser = (todoList:TodoList):void => {
        if (TESTMODE) console.log('updateTodoListOfLocalUser');
        const user = JSON.parse(localStorage.getItem('user-of-schedule') as string || '{}');
        user.todolist = todoList;
        localStorage.setItem('user-of-schedule', JSON.stringify(user));
    };

    
    return {
        // Detect
        isAutoLogin,
        
        // Get
        getUserName,
        getUserEmail,
        
        // Modify
        updateLocalStorage,
        updateLoginStatusOfLocalStorage,
        logoutAccountOfUser,
        
        // Clear
        clearUserLocalStorage,

        // todolist
        updateTodoListOfLocalUser,

    };
},  // persisted state
{
  persist: true,
  // storage: sessionStorage , // default: localStorage
},
)
