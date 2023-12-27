<template>
    <div>
      <h2>注册</h2>
      <form @submit.prevent="register">
        <label for="username">用户名: </label>
        <input v-model="username" type="text" id="username" required />
        <br />
  
        <label for="password">密码: </label>
        <input v-model="password" type="password" id="password" required />
        <br />
  
        <label for="email">邮箱:</label>
        <input v-model="email" type="email" id="email" required />
        <br />
        <br />
        <br />
        <button type="submit">点击注册</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        email: '',
      };
    },
    methods: {
      register() {
        // 输入校验
        if (this.username.length < 6) {
          alert('Username should be at least 6 characters long.');
          return;
        }
  
        if (this.password.length < 8 || !/[a-z]/.test(this.password) || !/[A-Z]/.test(this.password)) {
          alert('Password should be at least 8 characters long and contain both uppercase and lowercase letters.');
          return;
        }
  
        if (!/\S+@\S+\.\S+/.test(this.email)) {
          alert('Invalid email address.');
          return;
        }
  
        // 输入校验通过，保存至localStorage
        const userData = {
          username: this.username,
          password: this.password,
          email: this.email,
        };
  
        localStorage.setItem('userData', JSON.stringify(userData));
  
        // 跳转到登录页
        this.$router.push({ name: 'login' });
      },
    },
  };
  </script>
  