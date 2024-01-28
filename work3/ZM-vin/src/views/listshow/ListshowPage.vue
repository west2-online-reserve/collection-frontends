<script setup>
import { ref, reactive } from 'vue'
import { useTaskStore } from '@/stores/task'
import { Search } from '@element-plus/icons-vue'
import { formatTime } from '@/utils/format.js'

const useTask = useTaskStore()
const input = ref('')
const dialogVisible = ref(false)//控制修改Dialog对话框的显示
const dataList = ref(useTask.list)

//修改
const midId = ref('')
const change = (row) => {
    dialogVisible.value = true
    input.value = row.content
    midId.value = row.id
}
const changeContent = () => {
    dialogVisible.value = false
    useTask.list.forEach(item => {
        if (item.id === midId.value)
        {
            item.content=input.value
        }
    })
}

//完成
const finish = (row) => {
    row.sign = false
}

//已完成
const unfinish = (row) => {
    row.sign = true
}

//删除
const deleteData = (row) => {
    useTask.list = useTask.list.filter(item => item.id !== row.id)
    dataList.value = useTask.list
}

//按时间查询
const datesearch = ref('')
const dsearch = () => {
    if (!(datesearch.value)&&!(wordsearch.value.length))
    {
       dataList.value = useTask.list
    }
   if(datesearch.value)
    {
        dataList.value = useTask.list
        dataList.value = dataList.value.filter(item => ((new Date(item.settime).getYear() === new Date(datesearch.value).getYear()) && (new Date(item.settime).getMonth() === new Date(datesearch.value).getMonth()) && (new Date(item.settime).getDate()=== new Date(datesearch.value).getDate())))
    }
}

//按字查询
const wordsearch = ref('')
const wsearch = () => {
    if (!(datesearch.value) && !(wordsearch.value.length)) {
        dataList.value = useTask.list
    }
    if (wordsearch.value.length) {
        dataList.value = useTask.list
        dataList.value = dataList.value.filter(item => !(item.content !== wordsearch.value) )
    }
}
</script>


<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span class="item">待办事项</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <!--时间选择器-->
                <div class="block">
                    <el-date-picker
                    v-model="datesearch"
                    type="dates"
                    placeholder="请选择所选时间"
                    />
                    <el-button @click="dsearch()" type="primary" round style="background-color:#9b9ebf">查找</el-button>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <!--搜索框-->
                <el-input @input="wsearch()" v-model="wordsearch" class="w-50 m-2" placeholder="请输入要查找的内容" style="width: 25%" >
                    <template #prefix>
                    <el-icon class="el-input__icon"><search /></el-icon>
                    </template>
                </el-input>
            </div>
        </template>
        <!--待办表格-->
        <el-table :data="dataList" style="width: 100%">
            <el-table-column type="index" label="序号" width="180" />
            <el-table-column prop="content" label="内容" width="450" />
            <el-table-column prop="settime" label="创建时间" width="250">
                <template #default="{ row }">
                    {{ formatTime(row.settime) }}
                </template>
            </el-table-column>
            <el-table-column prop="finishtime" label="完成时间" width="250">
                <template #default="{ row }">
                        {{ formatTime(row.finishtime) }}
                    </template>
            </el-table-column>
            <el-table-column prop="operate" label="操作">
            <template #default="{row}">
                <div>  
                    <el-button v-if="!row.sign" @click="unfinish(row)" type="danger" plain>已完成</el-button>
                    <el-button v-if="row.sign" @click="finish(row)" type="primary" plain>完成</el-button>
                    <el-button v-if="row.sign" @click="change(row)" type="info" plain>修改</el-button>
                     <el-button v-if="row.sign" @click="deleteData(row)" type="warning" plain>删除</el-button>
                </div>
            </template>
            </el-table-column>
      </el-table>
    </el-card>
    <!--修改Dialog对话框-->
        <el-dialog
            v-model="dialogVisible"
            title="修改"
            width="30%"
            >
            <el-input v-model="input" placeholder="请修改" />
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="changeContent()">确定</el-button>
                    </span>
                </template>
        </el-dialog>
</template>

<style>
.box-card {
    min-height: 100%;
    box-sizing: border-box;
}
.card-header {
    display: flex;
    align-items: center;
}
</style>
