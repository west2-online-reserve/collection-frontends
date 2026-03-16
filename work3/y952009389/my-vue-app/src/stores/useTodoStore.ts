import { defineStore } from 'pinia';

interface Todo {
  content: string;
  createdAt: string;
  completedAt: string;
}

export const useTodoStore = defineStore('todo', {
  // 真正存储数据的地方
  state: () => ({
    todoList: [] as Todo[],
  }),
  // actions里面放置的是一个一个的方法，用于响应组件里的“动作”
  actions: {
    getTodoList() {
      // this指的是当前的store(useTodoStore)
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