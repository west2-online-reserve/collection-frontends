<template>
    <br />
    <br />
      <div>
      <!-- Banner -->
      <div class="banner">
        <div class="nav">
          <router-link to="/todo" class="Iamhere">TodoList</router-link>
          <router-link to="/table">表格展示</router-link>
        </div>
        <div class="user-info">
          <span>{{ userStore.users[0].username }}</span>
          <button @click="logout">退出登录</button>
        </div>
      </div>
  
      <!-- TodoList Content -->
      <div class="content">
  
        <!-- Todo Input -->
        <div>
          <input v-model="newTodo" type="text" placeholder="你要做些什么呢？" />
          <button @click="addTodo">添加</button>
        </div>
  
        <!-- Todo List -->
        <ul>
          <li v-for="(todo, index) in todoList" :key="index">{{ todo }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { useUserStore } from '../stores/useUserStore.ts';
  import { useTodoStore } from '../stores/useTodoStore.ts';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();
  const todoStore = useTodoStore();
  const newTodo = ref("");
  const router = useRouter();
  
  const addTodo = () => {
    if (newTodo.value.trim() !== '') {
          const currentTime = new Date().toLocaleString();
          todoStore.addTodo({
            content: newTodo.value.trim(),
            createdAt: currentTime,
          });
          newTodo.value = "";
        }
  };

  const logout = () => {
    router.push({ name: 'login' });
  };

  const todoList = computed(() => {
    return todoStore.getTodoList();
  });

  </script>
  
  <style scoped>
  .Iamhere {
  font-weight: bold; /* 加粗 */
  font-size: 1.5em;  /* 放大字体，可以根据需要调整值 */
  }
  .banner {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: greenyellow;
  }
  
  .nav {
    display: flex;
  }
  
  .nav a {
    margin-right: 15px;
    text-decoration: none;
    color: #333;
  }
  
  .user-info {
    display: flex;
    align-items: center;
  }
  
  .user-info span {
    margin-right: 10px;
  }
  
  .content {
    margin: 20px;
  }
  
  input {
    padding: 5px;
    margin-right: 10px;
  }
  
  button {
    padding: 5px;
  }
  </style>