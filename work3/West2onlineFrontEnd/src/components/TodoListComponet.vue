<!-- To doListView.vue -->
<template> 
    <div class="container-add-task">
        <el-container v-loading="loading">
            <el-main style="padding:0;">
                <el-row style="width: 100%;">
                    <el-col :span="11">
                        <el-text class="title-todo">TODO LIST</el-text>
                    </el-col>
                    <el-col :span="3">
                        <el-checkbox-button v-model="checked1"><el-icon><Menu/></el-icon></el-checkbox-button>
                    </el-col>
                    <el-col :span="5">
                        <el-checkbox-group v-model="checkboxGroup1">
                            <el-checkbox-button label="Star"><el-icon><StarFilled/></el-icon></el-checkbox-button>
                            <el-checkbox-button label="Completed"><el-icon><CircleCheckFilled/></el-icon></el-checkbox-button>
                        </el-checkbox-group>
                    </el-col>
                    <el-col :span="5">
                        <el-dropdown split-button type="primary" @click="handleClick">
                            Tags
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>Label 1</el-dropdown-item>
                                    <el-dropdown-item>Label 2</el-dropdown-item>
                                    <el-dropdown-item>Label 3</el-dropdown-item>
                                    <el-dropdown-item>Label 4</el-dropdown-item>
                                    <el-dropdown-item>Label 5</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-col>
                </el-row>
                <el-scrollbar style="height: 484px;">
                    <div v-for="item in todoListOfSelectedDate" :key="item.id" class="scrollbar-demo-item">
                    <TodoListItem :item="item"/>
                    </div>
                </el-scrollbar>
        </el-main>    
    </el-container>
</div>
</template>
    
<script setup lang="ts" name="TodoList"> 
    import { ref, reactive, onMounted } from 'vue';
    //interface
    import { type TodoItem, type TodoList, type CheckTime } from '@/types/todoList';
    // store
    import { useTodoListStore } from '@/stores/todolistStore'
    //utils
    import { CurrentYMD } from '@/utils/dateUtilities';

    // ui
    import TodoListItem from '@/components/TodoListItemComponent.vue'

    const loading = ref(true);
    setTimeout(()=>{
        loading.value = false
    },1000
    )

    // const { } = useTodoListStore();
    const { getTodoListOfSelectedDate, getSelectedDate } = useTodoListStore();

    const checked1 = ref(true)
    const checkboxGroup1 = ref(['Star'])
    const labels = ['All', 'Star', 'Completed'];

    const handleClick = () => {
        // eslint-disable-next-line no-alert
        alert('button click')
    }

    // todolist
    // const todoListOfSelectedDate = ref<TodoList>(getTodoListOfSelectedDate(getSelectedDate()));
    const todoListOfSelectedDate = ref<TodoList>([])
    setInterval(() => {todoListOfSelectedDate.value = getTodoListOfSelectedDate(getSelectedDate())}, 1000);







    
    
</script>

<style scoped>

.container-add-task{
    background-color: #DDEBDB;
    border-radius: 10px;
    padding: 10px 4px 10px 4px;
}
.title-todo{
    user-select:none;
    padding-left: 14px;
    font-size: 24px;
    font-weight: bold;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 
        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 
        'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
