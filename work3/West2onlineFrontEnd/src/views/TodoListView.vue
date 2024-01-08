<!-- To doListView.vue -->
<template> 
    <el-container>
        <el-main style="height: 586px;">
            <el-row justify="space-between">
                <el-col :span="12" >
                    <Calendar/>
                    <AddTasks/>
                </el-col>

                <el-col :span="11">
                    <TodoList/>
                </el-col>                
            </el-row>
        </el-main>

    </el-container>
</template>
    
<script setup lang="ts" name="TodoListView"> 
    // components
    import Calendar from '@/components/CalendarComponent.vue'
    import AddTasks from '@/components/AddTasksComponent.vue'
    import TodoList from '@/components/TodoListComponet.vue'
</script>

<style scoped>
    
</style>