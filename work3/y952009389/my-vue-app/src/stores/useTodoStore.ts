import { defineStore } from 'pinia';

interface Todo {
  content: string;
  createdAt: string;
  completedAt: string;
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todoList: [] as Todo[],
  }),
  
  actions: {
    getTodoList() {
      return this.todoList;
    },
    
    addTodo({ content, createdAt, completedAt }: Todo) {
      this.todoList.push({ content, createdAt, completedAt });
    },

    updateContent(newContent: string, index: number) {
      this.todoList[index].content = newContent;
    },
  },
});