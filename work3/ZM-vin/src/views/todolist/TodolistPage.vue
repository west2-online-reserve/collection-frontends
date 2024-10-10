<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useTaskStore } from '@/stores/task'
const useTask = useTaskStore()
const newContent = ref('')
const time = ref(new Date())
const sign = ref('')
const add = () => {
    const addData = {
        id: useTask.count,
        content: newContent.value,
        settime: time,
        finishtime: time,
        sign: true,
    }
    useTask.list.push(addData)
    useTask.count++
    newContent.value=''
}
</script>

<template>
    <el-row type="flex" justify="center" align="middle">
        <!--日历-->
        <el-col :span="12">
            <el-calendar v-model="time" />
        </el-col>

        <el-col :span="12">
            <!--待办列表-->
            <div>
                <h3 class="thing">待办事项</h3>
                <el-empty description="暂无待办" :image-size="100" v-show="!useTask.list.length"/>
            </div>
            <el-scrollbar height="400px" v-show="useTask.list.length">
                <p v-for="item in useTask.list" :key="item.id" class="scrollbar-demo-item">{{ item.content }}</p>
            </el-scrollbar>
            <!--输入框-->
            <el-input v-model="newContent" placeholder="新任务"/>
            <el-button  @click="add()" type="primary" style="background-color:#9b9ebf">
                添加<el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button>
        </el-col>
    </el-row>
</template>

<style>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  background-color:#efe7f4;
  color: #9098b7;
}
.thing {
    color:#9098b7;
}
</style>