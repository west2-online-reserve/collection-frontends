import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userToken: "",
    userName: ""
  }),
  actions: {
    setUserData(token: string, name: string) {
      this.userToken = token;
      this.userName = name;
    }
  },

});