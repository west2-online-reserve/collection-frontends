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
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useUserStore } from '../stores/useUserStore.ts';
  import { useRouter } from 'vue-router';
  
  const loginUsername = ref("");
  const loginPassword = ref("");
  const router = useRouter();

  const login = () => {
    // 用户名和密码校验
    const storedUserData = localStorage.getItem('userData');

    // 检查是否有存储的数据
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData.username._value === loginUsername.value && userData.password._value === loginPassword.value) {
        // 登录成功，保存用户信息至Pinia中
        const userStore = useUserStore();
        userStore.addUser({
          username: userData.username,
          password: userData.password,
          email: userData.email
        });

        // 跳转到TodoList页面
        router.push({ name: 'todo' });
    } 
    else alert('Username or password is incorrect.');
  }
  }
  </script>