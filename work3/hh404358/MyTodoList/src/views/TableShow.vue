<script lang="ts" setup>
import { computed, reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { Search, Calendar } from '@element-plus/icons-vue'
import { useUserStore } from '../stores/user';
import { type FormInstance } from 'element-plus'
import {
    ElPagination, ElDatePicker,
    ElInput, ElIcon, ElTable,
    ElTableColumn, ElText, ElButton,
    ElDialog, ElForm, ElFormItem,
} from 'element-plus'
import { setMapStoreSuffix } from 'pinia';

const ruleFormRef = ref<FormInstance>();
const search = ref('');
const date = ref('');
const store = useUserStore();

//组件
const calendarVisible = ref(true);
const datePickerVisible = ref(false);
const searchiconVisible = ref(true);
const searchVisible = ref(false);
const showDatePicker = () => {
    datePickerVisible.value = true;
    calendarVisible.value = false;
};
const confirmDate = () => {
    datePickerVisible.value = false;
    calendarVisible.value = true;
};
const showSearch = () => {
    searchVisible.value = true;
    searchiconVisible.value = false;
}
const confirmSearch = () => {
    searchiconVisible.value = true;
    searchVisible.value = false;
}

// 从pinia获取待办数据
const tableData = computed(() => {
    const incompleted = store.todolist
        .filter(item => item.completed === false)
        .map((item, index) => ({
            id: index++,
            context: item.todo,
            start:item.date.length > 1 ? item.date[1] : '',
            end: item.date[0],
            completed: false,
        }));
    const completed = store.todolist
        .filter(item => item.completed === true)
        .map((item, index) => ({
            id: index++,
            context: item.todo,
            start:item.date.length > 1 ? item.date[1] : '',
            end:  item.date[0],
            completed: true,
        }));
    return [...incompleted, ...completed];
})

// 分页展示表格数据
const currentPage = ref(1); // 初始页
const pageSize = ref(8); // 初始每页的数据
const filterData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return tableData.value
        .filter(
            (data) =>
                (!date.value || data.start.includes(date.value) || data.end.includes(date.value)) &&
                (!search.value || data.context.toLowerCase().includes(search.value.toLowerCase()))
        )
        .slice(start, end);
});

//处理每页显示的条数
const handleSizeChange = (size:number) => {
    pageSize.value = size;
};
//处理当前页码变化
const handleCurrentChange = (page:number) => {
    currentPage.value = page;
};


// 完成操作（获取表格中完成的todo，然后修改pinia中对应数据）
const handleComplish = (date:string) => {
    console.log(date);
    store.completeTodo(date);
}

// 删除操作
const handleDelete = (date:string) => {
    console.log('删除'+date);store.todolist.forEach(item=>(console.log(item.date[0]+';'+item.date[1]+';')));
    store.deleteTodo(date);
    store.successMessage('删除');
}

// 修改
const editData = ref({
    start:'',
    context: ''
})
const rules = {
    context: [
        { required: true, message: '请输入内容', trigger: 'blur' }
    ]
}
const handleEdit = (start:string,context:string) => {
    dialogVisible.value = true;
    editData.value.context = context;
    editData.value.start=start;
}
//控制添加分类弹窗
const dialogVisible = ref(false);
// 修改pinia内存储的待办信息
const editTodo = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            store.editTodo(editData.value.start, editData.value.context);
            dialogVisible.value = false;
            store.successMessage('修改');
        } else {
            store.errorMessage('内容不能为空');
            return false;
        }
    });
};

// 表格数据按创建时间排序
const sortMethod = (a: { start: string | number | Date; }, b: { start: string | number | Date; }) => {
    const dateA: Date = new Date(a.start);
    const dateB: Date = new Date(b.start);
    return dateA.getTime() - dateB.getTime();
};
</script>

<template>
    <!-- 标题+搜索框 -->
    <div><el-text>待办事项</el-text>
        <div class="picker" style="display: inline;margin-left: 30px;">
            <span class="calender" style="margin-right:30px;padding-right: 30px ;">
                <el-icon :size="30"><Calendar v-if="calendarVisible" @click="showDatePicker()" /> </el-icon>
                <span v-if="datePickerVisible">
                    <el-date-picker v-model="date" type="date" format="YYYY/MM/DD" value-format="YYYY/MM/DD">
                    </el-date-picker>
                    <el-button type="danger" style="background-color: #426440 ;" @click="confirmDate()"> 确认 </el-button>
                </span>
            </span>
            <span class="search">
                <el-icon :size=30><Search @click="showSearch()" /></el-icon>
                <span v-if="searchVisible">
                    <el-input v-model="search" v-if="searchVisible" placeholder="请输入要查找的内容" :prefix-icon="Search"
                        style="--el-input-width: none;padding-left: 20px;display: inline;">
                    </el-input>
                    <el-button type="danger" style="background-color: #426440 ;" @click="confirmSearch()"> 确认 </el-button>
                </span>
            </span>
        </div>
    </div>
    <!-- 表格显示 -->
    <el-table :data="filterData" empty-text="暂无内容" class="table">
        <el-table-column type="index" label="序号" width="100vh" align-items="center" />
        <el-table-column label="内容" prop="context" width="400vh" align-ite0ms="center" />
        <el-table-column label="创建时间" prop="start" width="200pvh" align-items="center" format="YYYY/MM/DD"
            :sort-method="sortMethod" />
        <el-table-column label="完成时间" prop="end" width="200vh" align-items="center" />
        <el-table-column label="操作" align-items="center" width="360vh">
            <template #default="scope">
                <el-button size="large" type="primary" @click="handleComplish(scope.row.start)" v-if="!scope.row.completed"
                    style="background-color: #5A6858;" round>完成</el-button>
                <el-button size="large" type="primary" @click="handleEdit(scope.row.start,scope.row.context)" v-if="!scope.row.completed"
                    round>修改</el-button>
                <el-button size="large" type="danger" @click="handleDelete(scope.row.start)" v-if="!scope.row.completed"
                    round>删除</el-button>
                <el-button size="large" type="warning" @click="handleDelete(scope.row.start)" v-if="scope.row.completed" round
                    disabled>已完成</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        layout="prev, pager, next" :total="tableData.length" :page-size="pageSize" style="float: right;" />
    <!-- 修改弹窗 -->
    <el-dialog v-model="dialogVisible" title="修改" width="30%">
        <el-form ref="ruleFormRef" :model="editData" :rules="rules" label-width="100px" style="padding-right: 30px">
            <el-form-item label="待办事项" prop="content">
                <el-input v-model="editData.context" minlength="1" maxlength="20"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="editTodo(ruleFormRef)"> 确认 </el-button>
            </span>
        </template>
    </el-dialog>
</template>


<style >
.el-text {
    color: #11240E;
    font-size: 32px;
    font-weight: 800;
    line-height: 80px;
    margin: 20px 0;
}

/* 日期选择器 */
.el-date-picker{
    --el-datepicker-text-color: #426440 ;
    --el-datepicker-active-color: #426440!important;;
    --el-datepicker-hover-text-color: #426440;
    --el-datepicker-off-text-color: var(--el-text-color-placeholder);
    --el-datepicker-inner-border-color: transparent;
    --el-datepicker-header-botton-color: transparent;

}
.el-date-picker__header-label {
    float: left;
    font-size: 30px;
    font-weight: 700;
    padding: 15px 5px;
    border: none;
    line-height: 5px;
    cursor: pointer;
    color: black;
}

.el-picker-panel__icon-btn {
    display: none;
}

.el-date-table th {
    padding: 5px;
    color: var(--el-datepicker-header-text-color);
    font-size: 15px;
    font-weight: 640;
    border-bottom: solid 1px var(--el-border-color-lighter);
}

.el-date-table td .el-date-table-cell .el-date-table-cell__text {
    color: #426440;
}

.el-date-table-cell__text {
    width: 100%;
    text-align: center;
    line-height: 26px;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    color: #426440;
}

.el-table__header-wrapper,
.el-table__body-wrapper {
    display: flex;
    align-items: flex-start;
}

.el-table {
    overflow: hidden;
    width: 100%;
    text-align: center;
    border: 2px solid #D1E2CF;
    border-top: none;
    border-left: none;
    box-sizing: border-box;
}

.el-table__cell {
    padding: 5px;
    height: auto;
    border: 2px solid #D1E2CF;
    box-sizing: border-box;
}

.el-table__header .cell {
    overflow: hidden;
    color: #11240E;
    text-align: center;
    font-family: Inter;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.el-table__body .cell {
    padding: 5px;
    color: #5A6858;
    font-family: Inter;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    overflow: hidden;
}

.el-table__empty-block {
    width: 100% !important;
    height: 300px !important;
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

.el-table .el-button {
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
}
</style>
  

  