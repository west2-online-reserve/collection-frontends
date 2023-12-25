import { defineStore } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
export const userStore = defineStore('user', {
    state: () => ({
        registerDataList: [],
        loginData: {
            username: '',
            email: '',
            password: '',
        },
        todolistStore: [] as {id:number, content: string; time: string[];completed:boolean;classify:string}[],
        CompleteStore:[] as { id:number,content: string; time: string[];completed:boolean}[],
    }),

    actions: {
        // 存储注册用户数据
        addRegisterData(data) {
            this.registerDataList.push({ ...data });
        },
        // 登录信息与存储数据对比校验
        logincheck(username, password) {
            return this.registerDataList.find(
                (user) => user.username === username && user.password === password
            );
        },
        // 获取登录信息
        setLoginData(data) {
            this.loginData = { ...data };
        },
        //更新todolist数据
        updateTodoList(todos){
            this.todolistStore={...todos};
        },
        // 获取登录用户名
        getusername() {
            return this.loginData.username;
        },
        //获取用户邮箱
        getEmail(){
            return this.loginData.email;
        },
        // 退出时清空登录信息
        clearlogin(){
            this.loginData.username = '';
            this.loginData.email = '';
            this.loginData.password = '';
        },
        // 添加待办
        addtodolist(data) {
            this.todolistStore.push({ ...data });
        },
        // 修改待办
        EditTodoById(id,content) {
            this.todolistStore[id].content = content;
        },
        // 完成待办
        Completelist(data){
            this.CompleteStore.push({ ...data });
        }

    },
    persist: true,
});