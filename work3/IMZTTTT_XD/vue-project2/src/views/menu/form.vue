<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { userStore } from '../../stores/userStore';
import { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'

const ruleFormRef = ref<FormInstance>()
const search = ref('')
const date = ref('')
const todolist = userStore()

// 一些消息提示
const Editerror = () => {
    ElMessage.error('输入不能为空，请输入！')
}
const Deletesuccess = () => {
    ElMessage({
        message: '删除成功',
        type: 'success',
    })
}
const Editsuccess = () => {
    ElMessage({
        message: '修改成功',
        type: 'success',
    })
}

// 从pinia获取待办数据
const tableData = computed(() => {
    const incompleted = todolist.todolistStore.map((item,index) => ({
        id:index++,
        content: item.content,
        start: item.time[0],
        end: item.time.length > 1 ? item.time[1] : '',
        completed: false,
    }))
    const completed = todolist.CompleteStore.map((item,index) => ({
        id: index++,
        content: item.content,
        start: item.time[0],
        end: item.time.length > 1 ? item.time[1] : '',
        completed: true,
    }));
    return [...incompleted, ...completed];

});

// 表格数据
const filterTableData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return tableData.value
        .filter(
            (data) =>
                (!date.value || data.start.includes(date.value) || data.end.includes(date.value)) &&
                (!search.value || data.content.toLowerCase().includes(search.value.toLowerCase()))
        )
        .slice(start, end);
});

// 修改操作
const editData = ref({
    id: 0,
    content: '',
})
const handleEdit = ({ row }) => {
    dialogVisible.value = true;
    editData.value.content = row.content;
    editData.value.id = row.id;
}
//控制添加分类弹窗
const dialogVisible = ref(false)
// 校验修改信息
const rules = {
    content: [
        { required: true, message: '请输入内容', trigger: 'blur' },
    ],
}
// 修改pinia内存储的待办信息
const editTodo = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {          
            todolist.EditTodoById(editData.value.id, editData.value.content);
            dialogVisible.value = false;
            Editsuccess()
        } else {
            Editerror();
            return false;
        }
    });
};

// 完成操作
const handleComplish = ({ row }) => {
    const completedTask = todolist.todolistStore[row.id];
    todolist.Completelist(completedTask);
    todolist.todolistStore.splice(row.id, 1);
}

// 删除操作
const handleDelete = ({ row }) => {
    todolist.todolistStore.splice(row.id, 1);
    Deletesuccess();
}

// 分页
const currentPage = ref(1); // 初始页
const pageSize = ref(8); // 初始每页的数据
const handleSizeChange = (size) => {
    pageSize.value = size;
};

const handleCurrentChange = (page) => {
    currentPage.value = page;
};

</script>
<template>
    <div class="main" style="margin-left:120px; margin-top: 50px;">
        <div class="title">
            <span>待办事项</span>
            <div class="demo-date-picker" style="display: inline;margin-left: 30px;">
                <el-date-picker v-model="date" type="date" placeholder="请选择要查找的日期" format="YYYY/MM/DD"
                    value-format="YYYY/MM/DD" />
                <el-input v-model="search" placeholder="请输入要查找的内容" :prefix-icon="Search"
                    style="--el-input-width: none;padding-left: 20px;display: inline;" />
            </div>
        </div>
        <!-- 表格 -->
        <el-table :data="filterTableData" empty-text="暂无内容">
            <!-- 表头 -->
            <el-table-column type="index" label="序号" width="120px" align="center" />
            <el-table-column label="内容" prop="content" width="480px" align="center" />
            <el-table-column label="创建时间" prop="start" width="250px" align="center" format="YYYY/MM/DD" />
            <el-table-column label="完成时间" prop="end" width="250px" align="center" />
            <el-table-column label="操作" align="center" width="300px">
                <!-- 操作按钮 -->
                <template #default="scope">
                    <el-button size="large" type="primary" @click="handleComplish(scope)" v-if="!scope.row.completed"
                        style="background-color: #426440;font-size: 20px;font-style: normal;font-weight: 700;"
                        round>完成</el-button>
                    <el-button size="large" type="primary" @click="handleEdit(scope)"
                        v-if="!scope.row.completed" style="font-size: 20px;font-style: normal;font-weight: 700;"
                        round>修改</el-button>
                    <el-button size="large" type="danger" @click="handleDelete(scope)" v-if="!scope.row.completed"
                        style="font-size: 20px;font-style: normal;font-weight: 700;" round>删除</el-button>
                    <el-button size="large" type="warning" @click="handleDelete(scope)" v-if="scope.row.completed"
                        style="font-size: 20px;font-style: normal;font-weight: 700;width: 130px;" round
                        disabled>已完成</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            layout="prev, pager, next" :total="tableData.length" :page-size="pageSize" style="float: right;"/>
        <!-- 修改弹窗 -->
        <el-dialog v-model="dialogVisible" title="修改" width="30%">
            <el-form ref="ruleFormRef" :model="editData" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="待办事项" prop="content">
                    <el-input v-model="editData.content" minlength="1" maxlength="20"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="editTodo(ruleFormRef)"> 确认 </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<style>
.title {
    color: #11240E;
    font-size: 32px;
    font-weight: 800;
    margin: 20px 0;
}

.el-table {
    overflow: hidden;
    width: 1402px;
    text-align: center;
    border: 2px solid #D1E2CF;
    border-top: none;
    border-left: none;
    box-sizing: border-box;
}

.el-table__cell {
    padding: 5px;
    height: 70px;
    border: 2px solid #D1E2CF;
    box-sizing: border-box;
}

.el-table__header .cell {
    color: #11240E;
    font-family: Inter;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    overflow: visible;
}

.el-table__body .cell {
    color: #5A6858;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    overflow: visible;
}

/* .el-table_column_1 .cell {
    color: #11240E;
    font-size: 28px;
    font-weight: 500;
}
天哪为什么一刷新字体样式就没了 */


.el-table__empty-block {
    width: 1398px !important;
    height: 500px !important;
    border: none;
    border-top: 2px solid #D1E2CF;
    border-left: 2px solid #D1E2CF;
}

.el-table__empty-text {
    color: #D2D2D2;
    font-size: 32px;
    font-weight: 700;
}

.completed-task .cell {
    color: #D3D3D3;
}

/* 日期选择器 */
.demo-date-picker .cell {
    height: 30px;
    padding: 3px 0;
    box-sizing: border-box;
}

.demo-date-picker .cell .text {
    width: 24px;
    height: 24px;
    display: block;
    margin: 0 auto;
    line-height: 24px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
}
</style>
  

  