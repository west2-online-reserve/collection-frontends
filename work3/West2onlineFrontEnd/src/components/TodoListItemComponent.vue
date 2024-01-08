<!-- To doListView.vue -->
<template> 
    <div class="container-todolist-item">
        <el-container>
            <el-row style="width: 100%;">
                <el-col :span="2">
                    <el-checkbox v-model="checked1" @change="handleCheckAllChange"></el-checkbox>
                </el-col>
                <el-col :span="20" >
                    <TitleItem :msg="binfo" :item='iteminfo'/>
                </el-col>
                <el-col :span="2">
                    <el-checkbox-button v-model="checked2" @change="handleCheckAllChange2"><el-icon><Star /></el-icon></el-checkbox-button>
                </el-col>
            </el-row>
        </el-container>
    </div>
</template>
    
<script setup lang="ts" name="TodoListItem"> 
    import { ref, unref, reactive, nextTick } from 'vue';
    //interface
    import { type TodoItem, type TodoList, type CheckTime } from '@/types/todoList';
    // store
    // import { useUserStore } from '@/stores/userStore';
    import { useTodoListStore } from '@/stores/todolistStore';
    //utils
    // ui
    // components
    import TitleItem from '@/components/TitleItemComponent.vue'

    const { completeItem, getCompleteStatus, starMarkItem, getStarStatus} = useTodoListStore()

    const props = defineProps({
        item: {
            type: Object as () => TodoItem,
            required: true
        }
    })
    const titlename = props.item.title
    const iteminfo =  props.item   
    const binfo = { name: titlename , type: 'default', textbutton: true };

    const checked1 = ref(getCompleteStatus(props.item.id))
    const checked2 = ref(getStarStatus(props.item.id))

    const handleCheckAllChange = () => {
        completeItem(props.item.id)
    }
    const handleCheckAllChange2 = () => {
        starMarkItem(props.item.id)
    }
    
</script>
<style>
.el-checkbox .el-checkbox__inner {
  border-radius: 50%;
}
</style>
<style scoped>

.container-todolist-item{
    /* background-color: #DDEBDB */
    border-radius: 10px;
    padding: 0;
    width: 100%;
    margin: 10px 10px;
}


</style>
    @/utils/userMangement@/stores/userCollectionStore@/utils/dateUtilities@/backup/userInfo