<!-- To doListView.vue -->
<template> 
    <div class="container-add-task">
        <el-container>
            <el-main style="padding:0;">
                <el-row>
                    <el-col :span="4">
                        <el-text class="title-task">TASK</el-text>
                    </el-col>
                    <el-col :span="16" style="padding-top:4px ;">
                        <el-input v-model="inputTitle" placeholder="Please input Title" class="input-title">
                            <template #prepend>Title</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row justify="space-between" style="width: 100%;">
                    <el-col :span="20" style="background-color: aliceblue;">
                    <el-input
                        v-model="textarea"
                        :rows="3"
                        type="textarea"
                        placeholder="Please input Content"
                        resize="none"
                        class="text-area"
                        />
                    </el-col>
                    <el-col :span="3" >
                    <el-button class="button-reset-task" style="width: 100%; margin: 0;" @click="resetTextArea">Reset</el-button>
                    <div style="height: 10px;"></div>
                    <el-button class="button-add-task" style="width: 100%; margin: 0;" @click="addTask">Add</el-button>
                </el-col>
            </el-row>
        </el-main>    
    </el-container>
</div>
</template>
    
<script setup lang="ts" name="AddTasks"> 
    import { ref, reactive } from 'vue';
    //interface
    import { defaultTodoItem, type TodoItem} from '@/types/todoList';
    // store
    import { useTodoListStore } from '@/stores/todolistStore'
    //utils
    import * as dateUtils from '@/utils/dateUtilities'
    // ui
    import {ElMessage} from 'element-plus'
    import type { CalendarDateType, CalendarInstance } from 'element-plus'

    const {addTodoItem, getTodoList, getSelectedDate} = useTodoListStore();

    const inputTitle = ref('')
    const textarea = ref('')

    const resetTextArea = ()=>{
        textarea.value = '';
        inputTitle.value = '';
        console.log('Reset TextArea!');
    }
    const addTask = ()=>{
        if(inputTitle.value == ''){
            ElMessage({
                message: 'Please input Title!',
                type: 'warning'
            })
            return;
        } else{
            console.log('Add defaultTodoItem!');

            const task = Object.assign({}, defaultTodoItem);
            task.title = inputTitle.value;
            task.description = textarea.value;
            task.creatDateTime = dateUtils.CurrentYMDHMS;
            task.startDate = getSelectedDate()
            task.id = Date.now().toString();
            resetTextArea();
            addTodoItem(task);
            // window.location.reload();
        }
    }
</script>

<style scoped>
.container-add-task{
    background-color: #DDEBDB;
    border-radius: 10px;
    padding: 0 4px 4px 4px;
    height: 116px;
}
.title-task{
    user-select:none;
    padding-left: 4px;
    font-size: 24px;
    font-weight: bold;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 
        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 
        'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}
.input-title{
    --el-input-border-color: #cfe2ce;
}
.text-area{
    /* font-size: 18px; */
    font-family: Inter;
}

.button-add-task, .button-reset-task{
    color: #000;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

</style>