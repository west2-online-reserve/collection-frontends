// userCollectionStore.ts

// interface 
import { type UserInfo } from '@/backup/userInfo';
// Store
import { useUserStore } from './userStore';
import { defineStore} from 'pinia';

export const useUserCollectionStore = defineStore('user-collection-of-schedule', ()=>{
    // const userCollection = reactive<UserInfoCollection>([]);
    const userCollection = JSON.parse(localStorage.getItem('user-collection-of-schedule')as string || '[]');
    
    const testInfo = ():void => {
        const userCollectionJson = localStorage.getItem('user-collection-of-schedule');
        console.log(userCollectionJson);
        const userCollection2 = JSON.parse(userCollectionJson as string || '[]');
        console.log(userCollection2);
        console.log(userCollection);
    }

    // const { updateLoginStatus, registerAccount, clearAccount, logoutAccount, autoLogin} = useUserStore();
    const { updateUserInfo, updateLoginStatus, updateInfoInLocalStorage, 
        registerAccount, logoutAccount, clearAccountInfoInsideLocalStorage, isAutoLogin } = useUserStore();

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
            if(id == userCollection[index].id)
            return false;
        }
        return true;
    }
    const isUsernameUnique = (username:string):boolean => {
        for(let index = 0; index < userCollection.length; index++){
            if(username == userCollection[index].username)
            return false;
        }
        return true;
    }
    const isEmailUnique = (email:string):boolean => {
        for(let index = 0; index < userCollection.length; index++){
            if(email == userCollection[index].email)
            return false;
        }
        return true;
    }

    // Add Account
    const addAccountToCollection = (user: UserInfo):void => {
        const newUser = {...user};
        if(isIdUnique(newUser.id as string)){
            userCollection.push(newUser);

            console.log(userCollection);
            localStorage.setItem('user-collection-of-schedule', JSON.stringify(userCollection));
            // 更新 userStore
            updateInfoInLocalStorage();
        }
    };
    
    // Remove Account
    const removeAccount = (user: UserInfo) => {
        for(let i = 0; i < userCollection.length; i++){
            if(userCollection[i].username == user.username){
                userCollection.splice(i, 1);
                localStorage.setItem('user-collection-of-schedule', JSON.stringify(userCollection));
                updateLoginStatus(undefined, undefined, undefined);
                clearAccountInfoInsideLocalStorage();
                return true;
            }
        }
    };

    // Reset Password
    const resetPasswordByName = (username: string, newPassword: string):boolean => {
        for(let i = 0; i < userCollection.length; i++){
            if(userCollection[i].username == username){
                userCollection[i].password = newPassword;
                localStorage.setItem('user-collection-of-schedule', JSON.stringify(userCollection));
                return true;
            }
        }
        return false;
    };

    // Login
    const isAccountCorrect = (username: string, password: string, checkedDate = 'Today', noLoginAgain = false, ):boolean => {
        
        // console.log(userArray.value[0]);
        for(let i = 0; i < userCollection.length; i++){
            if(userCollection[i].username == username && userCollection[i].password == password){
                // console.log(userArray.value[i].username, userArray.value[i].password);
                updateLoginStatus(true, noLoginAgain, checkedDate);
                // 提取用户信息， 更新到 LocalStorage
                updateUserInfo(userCollection[i]);
                updateInfoInLocalStorage();
                return true;
            }
        }
        return false;
    };

    // Clear All about userCollectionStore and userStore
    const clearAll = ():void => {
        userCollection.splice(0, userCollection.length);
        localStorage.removeItem('user-collection-of-schedule');
        
        // clear userStore inside LocalStorage
        updateLoginStatus(undefined, undefined, undefined);
        clearAccountInfoInsideLocalStorage();
    };
    
    return {
        testInfo,
                
        isUsernameUnique,
        isEmailUnique,
        
        registerAccount,
        addAccountToCollection,
        
        updateLoginStatus,
        isAccountCorrect,

        logoutAccount,
        removeAccount,

        resetPasswordByName,

        clearAll,

        isAutoLogin,
    };
},
{
    persist: true,
    // storage: sessionStorage , // default: localStorage
},
);
