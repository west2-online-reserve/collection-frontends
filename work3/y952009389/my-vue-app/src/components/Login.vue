<template>
    <div>
      <h2>登录</h2>
      <form @submit.prevent="login">
        <label for="loginUsername">用户名: </label>
        <input v-model="loginUsername" type="text" id="loginUsername" required />
        <br />
  
        <label for="loginPassword">密码: </label>
        <input v-model="loginPassword" type="password" id="loginPassword" required />
        <br />
        <br />
        <br />
        <button type="submit">点击登录</button>
      </form>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '../stores/useUserStore.ts';
  
  export default {
    data() {
      return {
        loginUsername: '',
        loginPassword: '',
      };
    },
    methods: {
      login() {
        // 用户名和密码校验
        const userData = JSON.parse(localStorage.getItem('userData'));
  
        if (userData && userData.username === this.loginUsername && userData.password === this.loginPassword) {
          // 登录成功，保存用户信息至Pinia中
          const userStore = useUserStore();
          userStore.addUser({
            username: userData.username,
            password: userData.password,
            email: userData.email
          });
  
          // 跳转到TodoList页面
          this.$router.push({ name: 'todo' });
        } else {
          alert('Username or password is incorrect.');
        }
      },
    },
  };
  </script>