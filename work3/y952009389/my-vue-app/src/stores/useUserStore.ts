import { defineStore } from 'pinia';

interface User {
  username: string;
  password: string;
  email: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[], // 初始化为一个空数组
  }),
  actions: {
    // 定义 action 以一次性添加用户信息
    addUser({ username, password, email }: User) {
      this.users.push({ username, password, email });
    },
  },
});