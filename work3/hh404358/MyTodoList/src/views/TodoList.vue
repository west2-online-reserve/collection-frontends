<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '../stores/user';
import {
    ElDatePicker,
    ElInput, ElButton, ElCalendar,
    ElSelect, ElOption,
    ElText, ElIcon, ElRadio
} from 'element-plus'
import {
    Star, Search
} from '@element-plus/icons-vue'
const value = ref(new Date());//today
const store = useUserStore();
const task = ref('');
const date = ref('');
let dateArr:string[]=[];
const picker = ref('');

const todo=reactive({
    todo:task,
    date:dateArr,
    completed:false,
    classify:picker
})
//分类标签（不同标签对应不同颜色）
const options = [
    {
        value: 'learning',
        label: '学习',
        color: 'rgb(245, 211, 202)',
    },
    {
        value: 'work',
        label: '工作',
        color: 'rgb(229, 248, 231)',
    },
    {
        value: 'life',
        label: '生活',
        color: 'rgb(198, 231, 247)',
    },
];

const formatDateTime=(date: Date)=> {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds=String(date.getSeconds()).padStart(2,'0');
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}
// add
const handleAdd = () => {
    if (task.value.trim() !== '' && date.value.length !== 0 && picker.value.trim() !== '') {
        console.log(date.value);
        date.value+=(','+formatDateTime(new Date()));
        dateArr=date.value.split(',');
        todo.date=dateArr;
        store.addTodo(todo);
        //todo.date.forEach((item)=>(console.log(':::'+item)));
        task.value = '';
        date.value = '';
        picker.value = '';
        store.successMessage('添加');
    }
    else if (task.value.trim() === '') {
        store.errorMessage('内容不能为空');
    }
    else if (picker.value.trim() !== '') {
        store.errorMessage('请选择分类标签');
    }
    else {
        store.errorMessage('日期不能为空');
    }
};
//delete
const handleFinish = (start:String) => {
    const index = store.todolist.findIndex(item => item.date[1] === start);
    if (index !== -1) {
      store.todolist.splice(index, 1);
    }
}
//classify type
const getTodoClass = (classify: string) => {
    return options.find(option => option.value === classify)?.color;
}

</script>
<template>
    <div class="left" style="float:left;width:50%">
        <el-calendar v-model="value" style="padding-top: 5%;"></el-calendar>
        <!-- 添加任务 -->
        <div class="task">
            <div style="display:flex ">
                <span style="font-size:40px;font-weight:800;">Task</span>
                <el-date-picker v-model="date" type="datetime" placeholder="ddl"
                    format="YYYY/MM/DD HH:mm" date-format="YYYY/MM/DD dd" time-format="A hh:mm:ss"
                    value-format="YYYY/MM/DD HH:mm:ss" style="padding-top: 18px;width:50%"/>
                <el-select v-model="picker" placeholder="分类标签" style="padding-top: 18px;width:30%">
                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                        :value="item.value"></el-option></el-select>
            </div>
            <div class="textarea">
                <el-input v-model="task" :rows="8" maxlength="20" type="textarea" placeholder="请输入今日任务..." />
                <el-button @click="handleAdd()">添 加 至 待 办</el-button>
            </div>

        </div>
    </div>
    <!-- 待办显示 -->
    <div class="right" style="float:left ;width:50%">
        <div style="display: flex;">
            <el-text style="font-size: 32px;font-weight: 800;">待办</el-text>
            <span>
                <el-icon :size=30 style="margin-top:45px;margin-right: 15px;">
                    <Star @click="" />
                </el-icon>
                <el-icon :size=30 style="margin:0;padding: 0;">
                    <Search @click="" />
                </el-icon>
            </span>
        </div>
        <div v-for="(todoitem, index) in store.todolist.filter((item) => item.completed === false)" class="item"
            :style="{ backgroundColor: getTodoClass(todoitem.classify) }" :key="index">
            <el-radio style="padding-top:30px;" @click="handleFinish(todoitem.date[1])"></el-radio>
            <span>{{ todoitem.todo }}</span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
//日历
.el-calendar {
    --el-calendar-border: none;
    --el-calendar-header-border-bottom: none;
    --el-calendar-selected-bg-color: transparent;
    --el-calendar-cell-width: 12%;
    width: 80%;

}
:deep(.el-calendar__title) {
    color: #11240E;
    font-family: Inter;
    font-size: 28px;
    font-style: normal;
    font-weight: 800;
    line-height: 30px;
    padding: 0 0 0 3%;
    border: none;
    box-shadow: none;
}

:deep(.el-calendar__button-group) {
    display: none;
}

:deep(.el-calendar__body thead th) {
    width: 50%;
    font-size: 18px;
    font-family: Inter;
    font-weight: 500;
    text-align: center;
    color: #163012;
    line-height: normal;
    border: none;
}

:deep(.el-calendar-table .el-calendar-day) {
    padding: 2px;
    height: 40px;
    width: 40px;
    text-align: center;
}

:deep(.el-calendar-table .el-calendar-day span) {
    display: block;
    padding: 0;
    height: 100%;
    width: 100%;
    text-align: center;
}

:deep(.el-calendar__body) {
    width: 100%;
    text-align: center;
    line-height: 26px;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    color: #426440;

}

:deep(.el-calendar__body td.is-today span) {
    padding: 0;
    color: #FEFFFF;
    background-color: #426440;
    border-radius: 50%;
}

// 日期选择器
:deep(.el-calendar__body td.is-today>td.is-selected span) {
    background-color: transparent;
    border-radius: 50%;
}

:deep(.el-date-editor) {
    display: inline;
    width: 20%;
    margin-right: 10px;
    flex-wrap: wrap;
    text-align: center;
}

.task {
    padding-top: 30px;
    color: #11240E;
    font-size: 20px;
    font-weight: 800;
    line-height: normal;
}

.textarea {
    display: flex;

}
:deep(.el-textarea) {
    width: 75%;
    margin-right: 10px;
}

:deep(.el-textarea__inner) {
    display: inline;
    padding: 40px 0 0 40px;
    width: 100%;
    height: 100%;
    font-size: 18px;
    border: none;
    border-radius: 5%;
    background-color: #DDEBDB;

}
.el-button{
    display: inline;
    padding: 0;
    width: 18%;
    height: 40%;
    color: #000;
    writing-mode: vertical-rl;
    font-family: Inter;
    font-size: 28px;
    font-style: normal;
    font-weight: 1000;
    line-height: normal;
    border: none;
    border-radius: 10px;
    background-color: #DDEBDB;
}

.el-button:active{
    background-color:#426440 ;
}

:deep(.el-text) {
    display: block;
    width: 50%;
    color: #000;
    font-family: Inter;
    font-size: 28px;
    font-style: normal;
    font-weight: 800;
}

// 不同分类标签
.item :deep(.el-radio__input.is-checked .el-radio__inner) {
    border-color: #DDEBDB;
    border: 2px;
    background: #b2e1ab;
}

.el-radio {
    --el-radio-input-border-color-hover: #DDEBDB;
}

.item {
    display: flex;
    width: 80%;
    height: 60%;
    text-align: center;
    line-height: 60px;
    margin-bottom: 20px;
    border-radius: 10px;
}

</style>
