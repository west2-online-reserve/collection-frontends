<script lang="ts" setup>
import { ref, reactive } from 'vue'
import {Search,Star} from '@element-plus/icons-vue'
import { useTodoStore } from '../../stores/TodoStore';
import { ElMessage } from 'element-plus'

const value = ref(new Date())
const date = ref('')
const textarea = ref('')
const todoStore = useTodoStore()
const todoData = reactive({
    content: textarea,
    time: date,
})

// 一些消息提示
const Addsuccess = () => {
    ElMessage({
        message: '添加成功',
        type: 'success',
    })
}
const AddContenterror = () => {
    ElMessage.error('输入不能为空，请输入！')
}
const AddTimeerror = () => {
    ElMessage.error('请选择时间范围！');
};

// 添加待办校验输入内容是否为空，以及是否选中时间，然后再上传到pinia
const addCheck = () => {
    if (textarea.value.trim() !== '' && date.value.length !== 0) {
        todoStore.addtodolist(todoData);
        textarea.value = '';
        date.value = '';
        Addsuccess();
    } else if (textarea.value.trim() === '') {
        AddContenterror();
    } else {
        AddTimeerror();
    }
};
</script>
<template>
    <!-- 日历以及添加待办 -->
    <div>
        <el-calendar v-model="value" />
        <div class="Task">
            <span>Task</span>
            <div class="block" style="display: inline; margin-left: 20px;">
                <el-date-picker v-model="date" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间"
                    format="YYYY/MM/DD HH:mm" date-format="YYYY/MM/DD dd" time-format="A hh:mm"
                    value-format="YYYY/MM/DD HH:mm" style="width: 380px;" />
            </div>
            <div style="display: flex;">
                <div class="text">
                    <el-input v-model="textarea" :rows="4" maxlength="25" type="textarea" placeholder="请输入今日任务..." />
                </div>
                <el-button class="Task-button" @click="addCheck()">添 加 至 待 办</el-button>
            </div>
        </div>
    </div>
    <!-- 待办展示 -->
    <el-main style="margin-left: 160px">
        <div style="padding:25px 0 20px 0;display: flex;align-items: center;">
            <span style="color: #11240E;font-size: 32px;font-weight: 800;">待办</span>
            <el-button style="margin-left: 430px;" :icon="Search" size='large' circle />
            <el-button style="margin-left: 20px;" :icon="Star" type="warning" size='large' circle />
        </div>
        <div>
            <div v-for="(todo, index) in todoStore.todolistStore" class="item" :key="index"
                style="background-color:#DDEBDB ;">
                <img src="../../assets/Ellipse 2.svg" alt="" style="margin-left: 24px;">
                <span style="margin-left: 20px;">{{ todo.content }}</span>
            </div>
        </div>
    </el-main>
</template>
<style lang="scss" scoped>
.Task {
    color: #11240E;
    font-size: 32px;
    font-weight: 800;
    line-height: normal;
    padding-left: 120px;
    padding-top: 30px;
}


.text {
    margin-top: 10px;
    border-radius: 10px;
    width: 500px;
    height: 280px;
    background: #DDEBDB;
}

.Task-button {
    background-color: #DDEBDB;
    margin: 10px 20px;
    writing-mode: vertical-rl;
    height: 280px;
    width: 80px;
    color: #000;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border-radius: 10px;
}

:deep(.el-textarea__inner) {
    width: 450px;
    font-size: 18px;
    padding: 40px 0 0 40px;
    border: none;
    box-shadow: none;
    background: transparent;
    outline: none;
    resize: none
}

.item {
    width: 600px;
    height: 80px;
    line-height: 80px;
    margin-bottom: 20px;
    flex-shrink: 0;
    border-radius: 10px;
}

/*日历样式*/
:deep(.el-calendar__body .el-calendar-day) {
    height: auto;
}

:deep(.el-calendar__header) {
    border: none;
    color: #11240E;
    font-family: Inter;
    font-size: 28px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    padding: 10px 10px 4px 32px;

}


:deep(.el-calendar__button-group) {
    display: none;
}

:deep(.el-calendar__body thead th) {
    color: #11240E;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}


:deep(.el-calendar__body tr:first-child td) {
    border: none;
}

:deep(.el-calendar__body__row td) {
    border: none;
}

:deep(.el-calendar__body) {
    padding: 5px 20px 10px 13px;
    text-align: center;
    line-height: 35px;
    color: #426440;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
}

:deep(.el-calendar) {
    padding: 40px 38px 0 88px;
    width: 550px;
    --el-calendar-selected-bg-color: #ffffff00;
    --el-calendar-border: none;
}

:deep(.el-calendar__body td.is-today) {
    color: #FEFFFF;
    background-image: url('../../assets/Ellipse\ 1.png');
    background-repeat: no-repeat;
    background-position: center;
}

// 时间选择器
.demo-datetime-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: stretch;
}

.demo-datetime-picker .block {
    padding: 30px 0;
    text-align: center;
}

.line {
    width: 1px;
    background-color: var(--el-border-color);
}
</style>