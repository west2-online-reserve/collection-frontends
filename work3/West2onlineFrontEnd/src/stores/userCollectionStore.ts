// userCollectionStore.ts

import { reactive } from 'vue';
// interface 
import { primaryUser,  defaultUser, type User, type UserCollection} from '@/types/userManagement';
import { type TodoList } from '@/types/todoList';
// Store
import { useUserStore } from './userStore';
import { defineStore} from 'pinia';
import { v4 as v4uuid } from 'uuid';
// test MODE
const TESTMODE = true;
    
export const useUserCollectionStore = defineStore('user-collection-of-schedule', ()=>{

    const { 
        // detect
        isAutoLogin,

        // get
        getUserName,
        getUserEmail,

        // modify
        updateLocalStorage,
        updateLoginStatusOfLocalStorage,
        logoutAccountOfUser,

        // clear 
        clearUserLocalStorage,

        // todo
        updateTodoListOfLocalUser,
    } = useUserStore();
    
    // const userCollection = reactive<UserCollection>([]);
    // 用户数据集是一个数组
    const userCollection = reactive<UserCollection>(JSON.parse(localStorage.getItem('user-collection-of-schedule') as string || '[]'));
    
    // test

    /**
     * @description print user collection
     */
    const testInfo = ():void => {
        console.log("userCollection", userCollection);
       
        // const userCollectionJson = localStorage.getItem('user-collection-of-schedule');
        // console.log("userCollectionJson", userCollectionJson);

        // const userCollection2 = JSON.parse(userCollectionJson as string || '[]');
        // console.log("userCollection2", userCollection2);
    }

    /*
    *   unique 
    *   唯一性检验
    *   dectect if the info is unique
    */
    // const userIdSet = new Set(userCollection.map(user => user.id));
    // const userUsernameSet = new Set(userCollection.map(user => user.username));
    // const userEmailSet = new Set(userCollection.map(user => user.email));
    
    // const isIdUnique = (id:string):boolean => !userIdSet.has(id);
    // const isUsernameUnique = (username:string):boolean => !userUsernameSet.has(username);
    // const isEmailUnique = (email:string):boolean => !userEmailSet.has(email);
    const isIdUnique = (id:string):boolean => {
        for(let index = 0; index < userCollection.length; index++){
            if(id == userCollection[index].account.id)
            return false;
        }
        return true;
    }
    const isUsernameUnique = (username:string):boolean => {
        for(let index = 0; index < userCollection.length; index++){
            if(username == userCollection[index].account.username)
            return false;
        }
        return true;
    }
    const isEmailUnique = (email:string):boolean => {
        for(let index = 0; index < userCollection.length; index++){
            if(email == userCollection[index].account.email)
            return false;
        }
        return true;
    }

    /** 
     * @description Add Account To Collection
     * @param user 
     * @returns 
     */
    const addAccountToCollection = (user: User):void => {
        if(TESTMODE){console.log('addAccountToCollection');}
        user.loginStatus = primaryUser.loginStatus;
        const newUser = {...user};

            userCollection.push(newUser);

            localStorage.setItem('user-collection-of-schedule', JSON.stringify(userCollection));

            // TODO 更新 userStore
            updateLocalStorage(newUser);

    };
    
    /**
     * Remove account, if it exists
     * @param user 
     * @returns boolean 
     */
    const removeAccountByUsername = (username: string):boolean => {
        for(let i = 0; i < userCollection.length; i++){
            if(userCollection[i].account.username == username){
                userCollection.splice(i, 1);
                localStorage.setItem('user-collection-of-schedule', JSON.stringify(userCollection));
                // TODO 更新 userStore
                // updateLocalStorage();
                return true;
            }
        }
        return false;
    };

    /**
     * @description Reset Password By Name 
     * @param username 
     * @param newPassword 
     * @returns 
     */
    const resetPasswordByName = (username: string, newPassword: string):boolean => {
        for(let i = 0; i < userCollection.length; i++){
            if(userCollection[i].account.username == username){
                userCollection[i].account.password = newPassword;
                localStorage.setItem('user-collection-of-schedule', JSON.stringify(userCollection));
                return true;
            }
        }
        return false;
    };

    // Login
    const isAccountCorrect = (username: string, password: string, noLoginAgain:any, checkedDate:any):boolean => {
        
        for(let i = 0; i < userCollection.length; i++){
            if(userCollection[i].account.username == username && userCollection[i].account.password == password){
                userCollection[i].loginStatus.isLoggedIn = true;
                userCollection[i].loginStatus.checkedDate = checkedDate;
                userCollection[i].loginStatus.noLoginAgain = noLoginAgain;

                updateLoginStatusOfLocalStorage(userCollection[i]);
                return true;
            }
        }
        return false;
    };
    // Logout
    const logoutAccount = ():boolean => {
        const userName= getUserName();
        logoutAccountOfUser();
        for(let i = 0; i < userCollection.length; i++){
            if(userCollection[i].account.username == userName){
                userCollection[i].loginStatus.isLoggedIn = false;
                userCollection[i].loginStatus.noLoginAgain = false;
                userCollection[i].loginStatus.checkedDate = undefined;
                localStorage.setItem('user-collection-of-schedule', JSON.stringify(userCollection));
                // TODO 更新 userStore
                // updateLocalStorage();
                return true;
            }
        }
        return false;
    };

    /**
     * @description Clear All about userCollectionStore and userStore
     * 
     */ 
    const clearAll = (): void => {
        if(TESTMODE) console.log('clearAll');
        userCollection.splice(0, userCollection.length);
        localStorage.removeItem('user-collection-of-schedule');
        
        // clear userStore inside LocalStorage
        clearUserLocalStorage();
    };

    // todolist 
    const updateTodoList = (todoList: TodoList):void => {
        if(TESTMODE) console.log('updateTodoList');
        const userCollection = JSON.parse(localStorage.getItem('user-collection-of-schedule') as string || '[]');
        const userIndex = userCollection.findIndex((user:any) => user.account.username === getUserName());
        userCollection[userIndex].todolist = todoList;
        localStorage.setItem('user-collection-of-schedule', JSON.stringify(userCollection));
    }
    
    return {
        // Test
        testInfo,

        // Get
        getUserEmail,
        getUserName,
                
        // Detect
        isAutoLogin,
        isUsernameUnique,
        isEmailUnique,
        
        // Add
        addAccountToCollection,

        // Clear
        removeAccountByUsername, // delete
        clearAll,
        
        // Modify
        isAccountCorrect,
        logoutAccount,
        resetPasswordByName,

        // Todo
        updateTodoListOfLocalUser,
        updateTodoList,
    };
},
{
    persist: true,
    // storage: sessionStorage , // default: localStorage
},
);
