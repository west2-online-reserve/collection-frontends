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
  
  <script>
  import { useUserStore } from '../stores/useUserStore.ts';
  import { useTodoStore } from '../stores/useTodoStore.ts';
  const userStore = useUserStore();
  const todoStore = useTodoStore();
  export default {
    data() {
      return {
        newTodo: '',
      };
    },
    computed: {
      userStore() {
        return useUserStore();
      },
      todoStore() {
        return useTodoStore();
      },
      todoList() {
        return this.todoStore.getTodoList();
      },
    },
    methods: {
      addTodo() {
        if (this.newTodo.trim() !== '') {
          const currentTime = new Date().toLocaleString();
          this.todoStore.addTodo({
            content: this.newTodo.trim(),
            createdAt: currentTime,
          });
          this.newTodo = '';
        }
      },
      logout() {
        // 跳转至登录页
        this.$router.push({ name: 'login' });
      },
    },
  };
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