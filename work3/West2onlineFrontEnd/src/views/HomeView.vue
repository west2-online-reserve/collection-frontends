<!-- HomeView.vue -->
<template> 
    <div class="homeview-container">
        <el-container>
            <el-header class="homeview-header">
                <el-menu 
                    :default-active="activeIndex"
                    class="homeview-menu"
                    style="border-radius: 20px 20px 0 0;"
                    mode="horizontal"
                    :ellipsis="false"
                    @select="handleSelect"
                >
                    <el-menu-item index="1" class="">Todo List</el-menu-item>
                    <el-menu-item index="2">Table View</el-menu-item>
                    <!-- h-spring -->
                    <div class="flex-grow" />
                    <el-text link class="text-email">
                        <el-icon><User/></el-icon> {{getUserEmail()}}
                    </el-text>
                    <el-button link type="danger" class="button-logout" @click="dialogVisible = true">logout</el-button>
                    <el-dialog
                        v-model="dialogVisible"
                        title="Tips" center
                        width="30%"
                        :before-close="handleClose"
                    >
                        <span>Logout will not delete any data. You can still log in with this account.</span>
                        <template #footer>
                        <span class="dialog-footer">
                            <el-button type="primary" @click="dialogVisible = false; logoutUser()">Confirm</el-button>
                            <el-button @click="dialogVisible = false">Cancel</el-button>
                        </span>
    </template>
  </el-dialog>
                </el-menu>
            </el-header>
            <el-main class="homeview-main">
                <RouterView></RouterView>
            </el-main>
        </el-container>
    </div>
</template>
    
<script setup lang="ts" name="HomeView"> 
    import { ref, onMounted } from 'vue';
    //interface
    import { type User} from '@/types/userManagement';
    // router
    import { RouterView, useRouter } from 'vue-router';
    // store
    import { useUserCollectionStore } from '@/stores/userCollectionStore';
    import { useTodoListStore } from '@/stores/todolistStore';
    //utils
    // import {registerAccountToLocalStorage} from '@/utils/userManagement'
    // ui
    import { ElMessageBox} from 'element-plus'
    
    let router = useRouter();

    const { getUserEmail, logoutAccount} = useUserCollectionStore();
    const { clearTodoList } = useTodoListStore();


    // menu
    const activeIndex = ref('1');
    onMounted(() => {
      restoreActiveIndex();
    });
    const handleSelect = (index:string) => {
      activeIndex.value = index; // 更新 activeIndex 的值
      if(index == '1') router.replace({name: 'todolist',});
    if( index == '2') router.replace({name: 'table-presentation',});
      saveActiveIndex(); // 保存 activeIndex 的值
    };

    // 保存 activeIndex 的值到 sessionStorage
    const saveActiveIndex = () => {
      sessionStorage.setItem('activeIndex', activeIndex.value);
    };

    // 从 sessionStorage 中恢复 activeIndex 的值
    const restoreActiveIndex = () => {
      const savedActiveIndex = sessionStorage.getItem('activeIndex');
      if (savedActiveIndex) {
        activeIndex.value = savedActiveIndex;
      }
    };

    // TODO 退出按键
    // logout
    const dialogVisible = ref(false)
    const handleClose = (done: () => void) => {
        ElMessageBox.confirm('Are you sure to close this dialog?')
            .then(() => {done()})
            .catch(() => { /*catch error*/ })
    }

    const logoutUser = ()=>{
        console.log('logout button');
        logoutAccount();
        clearTodoList();
        setTimeout(() => {
            router.replace({name: 'login',})
        }, 1000);
    }

</script>
    

<style>
    .el-dialog--center .el-dialog__body{
        padding-top: 0px;
        padding-bottom: 0px;
    }
</style>
<style scoped>
    .flex-grow {
        flex-grow: 1;
    }
    .homeview-container{
        display: flex;
        border-radius: 5px;
        width: 1145px;
        height: 692px;
        border-radius: 20px;
        box-shadow: 1px 1px 8px 1px #D1E2CF;

    }

    .homeview-header{
        background-color: #D1E2CF;
        padding: 0;
        border-radius: 20px;
    }
    .homeview-menu{
        background-color: #D1E2CF;
    }
    .homeview-menu > .el-menu-item:nth-child(1):hover{
        border-radius: 20px 0 0 0;
    }
    .homeview-menu > .el-menu-item{
        color: #11240e;
        font-size: 18px;
        user-select:none;
    }
    .homeview-menu > .is-active:nth-child(1), 
    .homeview-menu > .el-menu-item:nth-child(1):hover,
    .homeview-menu > .el-menu-item:nth-child(1):not(:hover){
        border-radius: 20px 0 0 0;
    }
    .text-email{
        color: #11240e;
        font-size: 18px;
        vertical-align: middle;
    }
    
    .button-logout{
        margin-left:20px;
        margin-right:20px;
        font-size: 18px;

        border: 0;
        padding: 0;
        line-height: 1.6;
        font-family: Inter, -apple-system, BlinkMacSystemFont, 
            'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 
            'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;;
    }

    .dialog-footer button:first-child {
        margin-right: 10px;
    }

    .homeview-main{
        background-color: #FEFFFF;
        /* test */
        /* background-color: #c7dddd; */
        border-radius: 0 0 20px 20px;
    }

</style>
    @/utils/userMangement@/stores/userCollectionStore@/stores/userStore