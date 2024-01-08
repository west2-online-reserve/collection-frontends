// types/userInfo.ts
import { v4 as v4uuid } from 'uuid';
import { type TodoList} from '@/types/todoList';
//test 
import { testTodoList01 } from '@/types/todoList';



// define a type of user
enum UserType{
    Admin = 'admin',
    User = 'user',
}

export interface CheckedDate{
    year: number,
    month: number,
    day: number,
}
export const CurrentYMD ={
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDay(),
  };

// define a Form of validating data
export interface RuleForm{
    username: string | undefined,
    password: string | undefined,
    confirmed?: string | undefined,
    email?: string | undefined,
    noLoginAgain?: boolean,
}

// define the login status
interface LoginStatus {
    isLoggedIn: boolean | undefined,
    noLoginAgain: boolean | undefined,
    checkedDate: CheckedDate | undefined,
}

// define account information
interface AccountInfo{
    id?:string | undefined,
    username:string | undefined,
    password:string | undefined,
    email:string | undefined,
    // TODO 后期修改为必选项
    userType?:UserType,
    // noLoginAgain?:boolean,
    // checkedDate?:string,
    // isLoggedIn?:boolean,
}
// define a User
export interface User{
    account:  AccountInfo,
    loginStatus: LoginStatus,
    todoList?: TodoList | undefined,
}

// define a collection of Users
export type UserCollection = Array<User>;

// default user
const default_account ={
    id: 'default_id',
    username: 'default_user',
    password: 'default_user_password',
    email: 'default_user_email',
    userType: UserType.User,
};
const primary_loginStatus = {
    isLoggedIn:  true,
    noLoginAgain: true,
    checkedDate: {
        year: 2021,
        month: 1,
        day: 1,
    },
}
const default_loginStatus = {
    isLoggedIn:  false,
    noLoginAgain: false,
    checkedDate: undefined,
}
const default_todoList = undefined;

/* default user */
export const defaultUser = {
    account:  default_account,
    loginStatus: default_loginStatus,
    todoList: default_todoList,
}
/** primary user */
export const primaryUser = {
    account:  default_account,
    loginStatus: primary_loginStatus,
    todoList: default_todoList,
}
// test data
const testUser01_account ={
    id: 'dfsdfsdfsdfdfs',
    username: 'testUser01',
    password: 'testUser01_password',
    email: 'testUser01_email',
    userType: UserType.User,
};
const testUser01_loginStatus = {
    isLoggedIn:  false,
    noLoginAgain: false,
    checkedDate: CurrentYMD,
}
const testUser01_todoList = testTodoList01;
// test user 01
export const testUser01 = {
    account:  testUser01_account,
    loginStatus: testUser01_loginStatus,
    todoList: testUser01_todoList,
}

const testUser02_account ={
    id: 'dfsdfsdfsdfdfs',
    username: 'testUser02',
    password: 'testUser02_password',
    email: 'testUser02_email',
    userType: UserType.User,
};
const testUser02_loginStatus = {
    isLoggedIn:  true,
    noLoginAgain: true,
    checkedDate: CurrentYMD,
}
const testUser02_todoList = testTodoList01;

// test user 02
export const testUser02 = {
    account:  testUser02_account,
    loginStatus: testUser02_loginStatus,
    todoList: testUser02_todoList,
}

export const testUserCollection = [
    testUser01,
    testUser02,
];