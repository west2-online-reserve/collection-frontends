<!-- HomeView.vue -->
<template> 
    <el-button type="primary" @click="testButton">test</el-button>
    <el-button type="primary" @click="testButton1">addAccountToCollection</el-button>
    <el-button type="primary" @click="testButton2">clearAll</el-button>
    <el-button type="primary" @click="testButton3">removeAccountByUsername</el-button>
    <el-button type="primary" @click="testButton4">resetPasswordByName</el-button>
    <div style="height: 10px;"></div>

    <el-button type="primary" @click="testButton5">logoutAccount</el-button>
    <el-button type="primary" @click="testButton6">isAccountCorrect</el-button>
    <el-button type="primary" @click="testButton7">resetPasswordByName</el-button>
    <el-button type="primary" @click="testButton8">resetPasswordByName</el-button>
    <el-button type="primary" @click="testButton9">resetPasswordByName</el-button>

    <!-- <el-icon class="is-loading">
        <Search width="1/>
    </el-icon> -->
    <RouterView> </RouterView>
</template>
    
<script setup lang="ts" name="TestView"> 
    import { ref, reactive } from 'vue';
    // Interface
    import { type User, type UserCollection} from '@/types/userManagement';
    import { testUser01, testUser02 } from '@/types/userManagement'
    // Router
    import { RouterView, RouterLink, useRouter } from 'vue-router';
    // Store
    // import { useUserStore } from '@/stores/userStore';
    import { useUserCollectionStore } from '@/stores/userCollectionStore';
    import { v4 as v4uuid } from 'uuid';
    // Utils
    // import {registerAccountToLocalStorage} from '@/utils/userManagement'
    // UI
    import {ElMessage} from 'element-plus'
    

    let router = useRouter();

    const { testInfo, addAccountToCollection, clearAll, removeAccountByUsername, resetPasswordByName, logoutAccount, isAccountCorrect} = useUserCollectionStore();


    function loginSuccessfully() {
        ElMessage({
            message: 'Log in Successffuly!', type: 'success',
            grouping: true, showClose: false, offset: 100, duration:1000,
        });
    }    

    const testButton = ()=>{
        testInfo();
    };
    const testButton1 = ()=>{
        addAccountToCollection(testUser01);
        addAccountToCollection(testUser02);
    };
    const testButton2 = ()=>{
        clearAll();
    };
    const testButton3 = ()=>{
        removeAccountByUsername('testUser01');
    };
    const testButton4 = ()=>{
        resetPasswordByName('testUser01', 'resetPassword');
    };

    const testButton5 = ()=>{
        logoutAccount();
    };
    const testButton6 = ()=>{
    };
    const testButton7 = ()=>{
    };
    const testButton8 = ()=>{
    };
    const testButton9 = ()=>{
    };
</script>
    
<style scoped>
    
</style>