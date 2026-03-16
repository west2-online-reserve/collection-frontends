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
      <input type="text" v-model="searchQuery" placeholder="搜索" />
      <input type="date" v-model="selectedDate" />
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
        <tr v-for="(item, index) in filteredList" :key="index">
          <td>{{ item.content }}</td>
          <td>{{ item.createdAt }}</td>
          <td>{{ item.completedAt }}</td>
          <td>
            <button @click="completeItem(index)" :disabled="ifFinish(index)">完成</button>
            <button @click="openDiv(index)">修改</button>
            <button @click="deleteItem(index)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-show="divOpen">
      <input type="text" v-model="newContent" placeholder="请输入新的新内容"/>
      <button @click="confirmEdit">确认</button>
      <button @click="closeDialog">取消</button>
    </div>
  </div>
</template>

<script lang="ts" setup name="TableView666">
import { ref, computed } from 'vue';
import { useTodoStore } from '../stores/useTodoStore.ts';

const todoStore = useTodoStore();
const items = todoStore.getTodoList();
const divOpen = ref(false);
const newContent = ref("");
const newIndex = ref(0);
const selectedDate = ref("");
const searchQuery = ref("");

interface TodoItem {
  content: string;
  createdAt: string; 
  completedAt: string; 
}

const filteredList = computed(() => {
  return todoStore.todoList
    .filter((item: TodoItem) =>
      item.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .filter((item: TodoItem) => {
      if(selectedDate.value !=""){
        let [year, month, day] = selectedDate.value.split("-");
        month = parseInt(month, 10).toString();
        const date = ref(`${year}/${month}/${day}`)
        return item.createdAt.includes(date.value);
      }
      else return item.createdAt.includes(selectedDate.value);
    });
});

const ifFinish = (index: number) => {
  if(todoStore.todoList[index].completedAt === undefined) {
    return false;
  } 
  else return true;
};

const openDiv = (index: number) => {
  divOpen.value = true;
  newIndex.value = index;
};

const closeDialog = () => {
  divOpen.value = false;
};

const confirmEdit = () => {
  todoStore.updateContent(newContent.value, newIndex.value);
  newContent.value = "";
  closeDialog();
};

const completeItem = (index: number) => {
  const currentTime = new Date().toLocaleString();
  items[index].completedAt = currentTime;
};

const deleteItem = (index: number) => {
  items.splice(index, 1);
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