<template>
    <br />
    <br />
      <!-- Banner -->
      <div class="banner">
        <div class="nav">
          <router-link to="/todo">TodoList</router-link>
          <router-link to="/table" class="Iamhere">表格展示</router-link>
        </div>
      </div>
  <div>
    <div>
      <input type="text" v-model="searchQuery" placeholder="Search" @input="filterItems" />
      <input type="date" v-model="selectedDate" @change="filterItems" />
    </div>
    <table>
      <thead>
        <tr>
          <th>内容</th>
          <th>创建时间</th>
          <th>完成时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in todoList" :key="index">
          <td>{{ todoStore.todoList[index].content }}</td>
          <td>{{ todoStore.todoList[index].createdAt }}</td>
          <td>{{ todoStore.todoList[index].completedAt }}</td>
          <td>
            <button @click="completeItem(index)" :disabled="ifFinish(index)">完成</button>
            <button @click="openDialog(index)">修改</button>
            <button @click="deleteItem(index)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <dialog v-show="dialogOpen">
      <input type="text" v-model="newContent" placeholder="请输入新的新内容"/>
      <button @click="confirmEdit">确认</button>
      <button @click="closeDialog">取消</button>
    </dialog>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useTodoStore } from '../stores/useTodoStore.ts';
const todoStore = useTodoStore();

export default {
  name: 'TableView',
  data() {
    return {
      searchQuery: '',
      selectedDate: '',
      dialogOpen: false,
    };
  },

  computed: {
      todoStore() {
        return useTodoStore();
      },
      todoList() {
        return this.todoStore.getTodoList();
      },
    },

  setup() {
    const items = todoStore.getTodoList();
    const dialogOpen = ref(false);
    const newContent = ref('');
    const filteredItems = computed(() => {
      return items.filter((item) => {
        const dateMatch = !this.selectedDate || item.createdAt.includes(this.selectedDate);
        const searchMatch = !this.searchQuery || item.content.toLowerCase().includes(this.searchQuery.toLowerCase());
        return dateMatch && searchMatch;
      });
    });

    const ifFinish = (index) => {
      if(todoStore.todoList[index].completedAt === undefined) {
        return false;
      } 
      else return true;
    };

    const openDialog = function(index) {
      this.dialogOpen = true;
      newContent.value = todoStore.todoList[index].content;
    };

    const closeDialog = function() {
      this.dialogOpen = false;
    };

    const confirmEdit = () => {
      todoStore.updateContent(newContent.value, index);
      closeDialog();
    };

    const completeItem = (index) => {
      const currentTime = new Date().toLocaleString();
      items[index].completedAt = currentTime;
    };

    const deleteItem = (index) => {
      items.splice(index, 1);
    };

    const filterItems = () => {
      
    };

    return {
      filteredItems,
      openDialog,
      closeDialog,
      confirmEdit,
      completeItem,
      deleteItem,
      filterItems,
      ifFinish,
    };
  },
};
</script>

  <style scoped>
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

  .Iamhere {
  font-weight: bold; /* 加粗 */
  font-size: 1.5em;  /* 放大字体，可以根据需要调整值 */
  }

  .filters {
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  button {
    margin-right: 5px;
  }
  
  dialog {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  </style>