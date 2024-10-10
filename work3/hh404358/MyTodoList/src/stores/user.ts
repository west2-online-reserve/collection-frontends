import { defineStore } from 'pinia';
import { createPersistedState } from 'pinia-persistedstate-plugin';
import { ElMessage } from 'element-plus'
export const useUserStore = defineStore('user', {

    state: () => ({
        // index:0,
        // idArr:[],
        isLoggedIn: false,
        nowuser: {
            username: '',
            email: '',
            password: '',
        },
        user: [] as {
            username: string,
            email: string,
            password: string,
        }[],
        todolist: [] as {
            todo: string,
            date: string[],
            completed: boolean,
            classify: string

        }[],
        //Todo:一个用户对应一个todolist（当前逻辑存在问题，变成所有公用todolist）
        data: [] as {
            username: string,
            email: string,
            password: string,
            todolist: {
                todo: string,
                date: string[],
                completed: boolean,
                classify: string
            }[]
        }[]


    }),
    getters: {

    },
    actions: {
        // 注册
        register(newuser: { username: string; email: string; password: string; }) {
            this.user.push({ ...newuser });
            console.log(this.nowuser.username + ':' + this.nowuser.password);
        },
        //登录
        login(username: string, password: string) {
            this.user.forEach(item => (console.log(item.username)));
            const index = this.user.findIndex((user) => (user.username === username && user.password === password));
            if (index !== -1) {
                this.isLoggedIn = true;
                this.nowuser = this.user[index];
                return this.user[index];
            }
        },
        //退出
        logout() {
            this.nowuser.username = '';
            this.nowuser.email = '';
            this.nowuser.password = '';
            this.data.push(this.nowuser, this.todolist);
            this.isLoggedIn = false;
        },
        getName() {
            return this.nowuser.username;
        },
        getEmail() {
            return this.nowuser.email;
        },
        addTodo(todo: { todo: string; date: string[]; completed: boolean; classify: string; }) {
            // todo.id=this.index++;
            // this.idArr.push(todo.id);
            // const index=this.data.findIndex((user,todos)=>(user.username===nowuser.username));
            this.todolist.push({ ...todo });
        },
        deleteTodo(date: string) {
            // const i=this.idArr.indexOf(id);
            // if(i===-1){
            //     console.log('todo.id is undefined!');
            //     return;
            // }
            // this.idArr.splice(i,1);
            this.todolist = this.todolist.filter((item) => item.date[1] !== date);
        },
        completeTodo(date: string) {
            this.todolist.forEach(element => {
                console.log(element.date[1] + ":" + element.todo);
            });
            // const i=this.idArr.indexOf(id);
            // if(i===-1){
            //     console.log('todo.id is undefined!');
            //     return;
            // }
            // this.idArr.splice(i,1);
            // console.log('date:'+date)
            if (this.todolist && this.todolist.length > 0) {
                const index = this.todolist.findIndex((item) => item.date[1] === date);
                if (index !== -1) {
                    this.todolist[index].completed = true;
                }
            }
        },
        editTodo(date: string, context: string) {
            if (this.todolist && this.todolist.length > 0) {
                const index = this.todolist.findIndex((item) => item.date[1] === date);
                if (index !== -1) {
                    this.todolist[index].todo = context;
                }
            }

        },
        editUserName(name: string, newname: string) {
            const index = this.user.findIndex((user) => user.username === name);
            if (index !== -1) {
                this.user[index].username = newname;
            }
        },

        // messages
        errorMessage(text: string) {
            ElMessage({
                message: 'error:' + text,
                type: 'error',
            })
        },
        successMessage(text: string) {
            ElMessage({
                message: text + '成功！',
                type: 'success',
            })
        },
    },
    persist: true,
})