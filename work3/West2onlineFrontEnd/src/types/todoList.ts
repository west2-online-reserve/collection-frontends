// todolist.ts
export interface CheckTime{
    year: number;
    month: number;
    day: number;
}

interface TodolistTime{
    hour: number;
    minute: number;
    second: number;
}

interface TodolistDateTime{
    year: number;
    month: number;
    day: number;
    time: TodolistTime;
}

export interface TodoItem {
    id: string;
    creatDateTime: TodolistDateTime;
    startDate:CheckTime;
    
    title: string;
    description: string|undefined;
    
    starMark: boolean;
    label: string|undefined;

    completed: boolean;
    finishedDateTime: TodolistDateTime|undefined;
}

export type TodoList = Array<TodoItem>;

// test data
const testTodoItem01: TodoItem = {
    id: 'testTodoItem01',
    creatDateTime: {
        year: 2021,
        month: 10,
        day: 1,
        time: {
            hour: 10,
            minute: 10,
            second: 10,
        }
    },
    startDate:{
        year: 2021,
        month: 10,
        day: 1,
    },
    title: 'testTodoItem01',
    description: 'testTodoItem01_description',
    starMark: false,
    label: 'testTodoItem01_label',
    completed: false,
    finishedDateTime: {
        year: 2021,
        month: 10,
        day: 1,
        time: {
            hour: 10,
            minute: 10,
            second: 10,
        }
    }
}
const testTodoItem02: TodoItem = {
    id: 'testTodoItem02',
    creatDateTime: {
        year: 2021,
        month: 10,
        day: 1,
        time: {
            hour: 10,
            minute: 10,
            second: 10,
        }
    },
    startDate:{
        year: 2021,
        month: 10,
        day: 1,
    },
    title: 'testTodoItem02',
    description: 'testTodoItem02_description',
    starMark: false,
    label: 'testTodoItem02_label',
    completed: false,
    finishedDateTime: {
        year: 2021,
        month: 10,
        day: 1,
        time: {
            hour: 10,
            minute: 10,
            second: 10,
        }
    }
}
export const testTodoList01: TodoList = [testTodoItem01, testTodoItem02]; 

export const defaultTodoItem: TodoItem = {
    id: 'defaultTodoItem',
    creatDateTime: {
        year: 2024,
        month: 1,
        day: 1,
        time: {
            hour: 0,
            minute: 0,
            second: 0,
        }
    },
    startDate:{
        year: 2024,
        month: 1,
        day: 1,
    },
    title: 'defaultTodoItem',
    description: 'defaultTodoItem_description',
    starMark: false,
    label: 'defaultTodoItem_label',
    completed: false,
    finishedDateTime: undefined,
}