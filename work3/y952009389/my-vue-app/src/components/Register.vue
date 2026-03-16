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
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const username = ref("");
  const password = ref("");
  const email = ref("");
  const router = useRouter();

  const register = () => {
    // 输入校验
    if (username.value.length < 6) {
      alert('Username should be at least 6 characters long.');
      return;
    }

    if (password.value.length < 8 || !/[a-z]/.test(password.value) || !/[A-Z]/.test(password.value)) {
      alert('Password should be at least 8 characters long and contain both uppercase and lowercase letters.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email.value)) {
      alert('Invalid email address.');
      return;
    }

    // 输入校验通过，保存至localStorage
    const userData = {
      username: username,
      password: password,
      email: email,
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    // 跳转到登录页
    router.push({ name: 'login' });
  }

  </script>
  