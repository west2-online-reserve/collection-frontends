<!-- TablePresentationView.vue -->
<template> 
    <div class="container-table" v-loading="loading">
        <el-row>
            <el-col :span="4">
                <el-text class="title-todoitems">TODO ITEMS</el-text>
            </el-col>
            <el-col :span="2">
                <el-checkbox-button v-model="valueShowAll" @change="showPickDate">Show All</el-checkbox-button>
            </el-col>
            <el-col :span="6">
                <div class="block">
                    <el-date-picker
                        v-model="valueDatePicker"
                        type="date"
                        placeholder="Pick a day"
                        :shortcuts="shortcuts"
                    />
                </div>
            
            </el-col>
            <el-col :span="9">
                <el-input
                    v-model="input3"
                    placeholder="Please input"
                    class="input-with-select"
                >
                    <template #prepend>
                        <el-select v-model="select" placeholder="Select" style="width: 75px">
                        <el-option label="Title" value="1" />
                        <el-option label="Tags" value="2" />
                        </el-select>
                    </template>
                    <template #append>
                        <el-button :icon="Search" />
                    </template>
                </el-input>
            </el-col>
        </el-row>
        <el-row>
          <!-- table -->
            <el-table ref="tableRef" row-key="date" :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%"  height="480">
                <el-table-column type="index" label="S.N." width="50" />
                <el-table-column prop="title" label="Title" width="260" />
                <el-table-column prop="createdDate" label="Start Date" width="130"
                column-key="date"
                sortable
                :filters="[

                ]"
                :filter-method="filterHandler"
                />
                <el-table-column prop="completedDate" label="Completed Date" width="130" />
                <el-table-column prop="label" label="Label" width="220" >
                  <template #default>
                    <el-tag
                      v-for="tag in tags"
                      :key="tag.name"
                      class="mx-1"
                      :type="tag.type"
                    >
                      {{ tag.name }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column  label="Operations" width="250">
                    <template #default="scope">
                        <el-button size="small" :type="CompleteButtonType(scope.row.id)" @click="handleComplete(scope.row.id)">{{ CompleteButtonText(scope.row.id) }}</el-button>
                        <EditItem :msg="binfo" :item="scope.row"/>                  
                        <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="600"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </el-row>
    </div>

</template>
    
<script setup lang="ts" name="TablePresentation"> 
    import { ref } from 'vue';
    //interface
    import { type TodoList} from '@/types/todoList'
    // store
    // import { useUserStore } from '@/stores/userStore';
    import { useTodoListStore } from '@/stores/todolistStore';
    //utils
    // import {registerAccountToLocalStorage} from '@/utils/userManagement'
    //ui
    import { Search } from '@element-plus/icons-vue'
    import { ElInput } from 'element-plus'
    // components
    import EditItem from '@/components/EditItemComponent.vue'
    import type { TableColumnCtx, TableInstance } from 'element-plus'

    const { getTodoList, deleteTodoItem, completeItem, getCompleteStatus, getTodoListOfSelectedDate, getSelectedDate} = useTodoListStore()
  
    const binfo = {
        name: 'Edit',
        type: 'primary',
        textbutton: false
    };

    const loading = ref(true);
    setTimeout(()=>{
        loading.value = false
    },500
    )

    // search
    // 显示所有
    const valueShowAll = ref()

    const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
    }
    // 日期选择器
    const valueDatePicker =ref('');
    const showPickDate = ()=>{
        const dateString = valueDatePicker.value;
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate);
        return formattedDate
    }
    const shortcuts = [
        {
            text: 'Today',
            value: new Date(),
        },
        {
            text: 'Yesterday',
            value: () => {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                return date
            },
        },
        {
            text: 'A week ago',
            value: () => {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                return date
            },
        },
    ]
// class
const input3 = ref('')
const select = ref('1')

// table
// TODO 表格数据
const tableRef = ref<TableInstance>()

const getCompletedDate =(completedDate:any)=>{
  if(completedDate === undefined){
    return '-----'
  }
  else{
    return  (completedDate.year + '-' + completedDate.month + '-' + completedDate.day)
  }
}

interface ItemInfo {
    id: string,
    title: string,
    createdDate: string,
    completedDate: string ,
    label:string | undefined, 
}

const tableData: ItemInfo[] = getTodoList().map(item => {
    return {
        id: item.id,
        title: item.title,
        createdDate: item.startDate.year + '-' + item.startDate.month + '-' + item.startDate.day,
        completedDate: getCompletedDate(item.finishedDateTime),
        label: item.label,
    };
})

getTodoListOfSelectedDate(getSelectedDate())
// tags in table
const tags = ref([
  { name: 'Tag 1', type: '' },
  { name: 'Tag 2', type: 'success' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 4', type: 'warning' },
  // { name: 'Tag 5', type: 'danger' },
])

const CompleteButtonType = (id: string)=>{
  if(getCompleteStatus(id)){ return 'success';}
  else {return 'warning';}
}
const CompleteButtonText = (id: string)=>{
  if(getCompleteStatus(id)){ return 'Complete';}
  else {return 'Completed';}
}
// button in table
const handleComplete = (id: string) => {
  completeItem(id);
  window.location.reload()
}

const handleDelete = (id: string) => {
  console.log(id)
  deleteTodoItem(id)
  window.location.reload()
}

const filterHandler = (
  value: string,
  row: ItemInfo,
  column: TableColumnCtx<ItemInfo>
) => {
  const property = column['property'] as keyof ItemInfo;
  return row[property] === value
}

// 分页
const currentPage = ref(1)
const pageSize = ref(6)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  currentPage.value = val;
}
  
</script>
    
<style>
    .input-with-select .el-input__wrapper{
        --el-input-border-color: #cfe2ce;
        box-shadow: 1px 0 0 0 #d6e5d6 inset,0 1px 0 0 #ebf6ea inset,0 -1px 0 0 #c0d9bf inset;
    }
    .el-table__row{
        height: 73px;
    }
</style>
<style scoped>
    .container-table{
        padding: 20px;
        height: 586px;
    }
  .title-todoitems{
        user-select:none;
        padding-left: 4px;
        font-size: 24px;
        font-weight: bold;
        font-family: Inter, -apple-system, BlinkMacSystemFont, 
            'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 
            'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;      
    }
    .input-with-select{
        --el-input-border-color: #cfe2ce;
    }
    .el-select{
        --el-input-border-color: #cfe2ce;
    }


</style>