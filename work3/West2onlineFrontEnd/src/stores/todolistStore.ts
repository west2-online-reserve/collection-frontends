// todolistStore.ts

import { reactive } from 'vue';
//interface
import {type CheckTime, type TodoItem, type TodoList } from '@/types/todoList';
// store
import { defineStore } from 'pinia'
import { useUserCollectionStore } from '@/stores/userCollectionStore'
// utils
import { CurrentYMDHMS } from '@/utils/dateUtilities';

// test mode
const TESTMODE = false;

export const useTodoListStore =  defineStore('todolist', () =>{

    const todoList = reactive<TodoList>(JSON.parse(localStorage.getItem('user-of-schedule') as string || '{}').todolist || []);

    const selectedDate = ({year: new Date().getFullYear() ,month: new Date().getMonth() + 1,day: new Date().getDate(),});

    const setSelectedDate = (date:any):void => {
        selectedDate.year = parseInt(date.day.split('-')[0])
        selectedDate.month = parseInt(date.day.split('-')[1]);
        selectedDate.day = parseInt(date.day.split('-')[2]);
        if(TESTMODE)console.log(selectedDate);

    }

    const getSelectedDate = ():CheckTime =>{
        // console.log(selectedDate)
        const year = selectedDate.year;
        const month = selectedDate.month;
        const day = selectedDate.day;
        return {year, month ,day}
    }


    const { getUserName, updateTodoListOfLocalUser, updateTodoList, } = useUserCollectionStore();

    const getTodoList = ():TodoList => {
        return todoList;
    }

    // add todo item
    const addTodoItem = (todoItem:TodoItem):void => {
        todoList.push(todoItem);
        localStorage.setItem('todolist', JSON.stringify(todoList));
        // console.log("todolist", todoList);
        // 更新 localStorage
        updateTodoListOfLocalUser(todoList);
        updateTodoList(todoList);
    };

    // delete todo item
    const deleteTodoItem = (id: string): void => {
        // 查找待删除的待办事项在 todoList 中的索引
        const index = todoList.findIndex(item => item.id === id);
        
        if (index !== -1) {
          // 从 todoList 中移除待办事项
          todoList.splice(index, 1);
      
          // 更新 localStorage
          localStorage.setItem('todolist', JSON.stringify(todoList));
      
          // 更新组件中的待办事项列表
          updateTodoList(todoList);
          
          // 更新本地用户的待办事项列表
          updateTodoListOfLocalUser(todoList);
        }
      };
      

    // update todo item
    const updateTodoItem = (todoItem: TodoItem): void => {
        // 查找待更新的待办事项在 todoList 中的索引
        const index = todoList.findIndex(item => item.id === todoItem.id);
        // console.log('1', todoItem);
        // console.log('2', todoList[index])
        if (index !== -1) {
            // 更新待办事项对象
            todoList[index].title = todoItem.title;
            todoList[index].description = todoItem.description;
      
          // 更新 localStorage
          localStorage.setItem('todolist', JSON.stringify(todoList));
      
          // 更新组件中的待办事项列表
          updateTodoList(todoList);
      
          // 更新本地用户的待办事项列表
          updateTodoListOfLocalUser(todoList);
        }
      };

    // update complete Status
    const completeItem = (id: string)=>{
        const index = todoList.findIndex(item => item.id === id);
        if (index !== -1) {
        todoList[index].completed = !todoList[index].completed;
        if(todoList[index].completed){
            todoList[index].finishedDateTime = CurrentYMDHMS;
        }else{
            todoList[index].finishedDateTime = undefined;
        }
        localStorage.setItem('todolist', JSON.stringify(todoList));
        updateTodoList(todoList);
        updateTodoListOfLocalUser(todoList);
       }
    }
    const starMarkItem = (id: string)=>{
        const index = todoList.findIndex(item => item.id === id);
        if (index !== -1) {
        todoList[index].starMark = !todoList[index].starMark;
        localStorage.setItem('todolist', JSON.stringify(todoList));
        updateTodoList(todoList);
        updateTodoListOfLocalUser(todoList);
       }
    }

    // clear todo list
    const clearTodoList = ():void => {
        todoList.splice(0, todoList.length);
        // 清除 localStorage
        localStorage.removeItem('todolist');   
        updateTodoList(todoList);     
        updateTodoListOfLocalUser(todoList);
    };

    // test
    const testInfo = ():void => {
        console.log("todoList", todoList);
    }

    // get todo list of selected date
    const getTodoListOfSelectedDate = (date: CheckTime): TodoList => {
        const todoList = JSON.parse(localStorage.getItem('todolist') as string || '[]');
        // console.log("todoList", todoList);
        const todoListOfDate = <TodoList>[];
      
        todoList.forEach((todoItem: TodoItem) => {
          if (
              todoItem.startDate.year == date.year &&              
              todoItem.startDate.month == date.month &&
              todoItem.startDate.day == date.day 
          ) {
            todoListOfDate.push(todoItem);
          }
        });
      
        // console.log("todoListOfDate", todoListOfDate);
        return todoListOfDate;
      };
    const getCompleteStatus = (id: string)=>{
        const index = todoList.findIndex(item => item.id === id);
        if (index !== -1) {
        return todoList[index].completed
        }
    }
    const getStarStatus = (id: string)=>{
        const index = todoList.findIndex(item => item.id === id);
        if (index !== -1) {
        return todoList[index].starMark
        }
    }



    return {
        // Add
        addTodoItem,

        // Delete
        deleteTodoItem,
        clearTodoList,

        // Update
        setSelectedDate,
        updateTodoItem,
        completeItem,
        starMarkItem,

        // Get
        getTodoList,
        getTodoListOfSelectedDate,
        getSelectedDate,
        getCompleteStatus,
        getStarStatus,
    };
},
{
    persist: true,
    // storage: sessionStorage , // default: localStorage
},
);