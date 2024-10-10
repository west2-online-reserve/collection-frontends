<script lang="ts" setup>
import { ref, reactive, initCustomFormatter } from 'vue';
import { useUserStore } from '../stores/user';
import { ElContainer, ElHeader, ElMain, ElForm, ElFormItem, ElInput, ElInputNumber, ElButton, ElFooter } from 'element-plus';
const store = useUserStore();
const profile = reactive({
    username: store.getName(),
    age: 0,
    sex: '',
    email: store.getEmail(),
    like: '',
})


const updateProfile = () => {
    // 在这里可以将用户信息提交到服务器或进行其他操作
    console.log('更新用户信息');
    console.log('用户名:', profile.username);
    console.log('年龄:', profile.age);
    console.log('邮箱:', profile.email);
    store.nowuser.email=profile.email;
    store.nowuser.username=profile.username;
}

</script>
<template>
    <div class="profile">
        <el-container>
            <el-header style="height: fit-content;">
                <h1 style="font-size: 56px;">个人主页</h1>
            </el-header>
            <el-main>
                <el-form :model="profile" label-width="120px">
                    <el-form-item label="用户名">
                        <el-input v-model="profile.username"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input-number v-model="profile.age" controls-position="right"></el-input-number>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="profile.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateProfile">更新信息</el-button>
                    </el-form-item>
                </el-form>
            </el-main>

        </el-container>
    </div>
</template>
  
  
<style scoped>
.profile {
    display: flex;
    justify-content: center;
    height: 100vh;
    background-image: url('../assets/img/userbg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.el-container {
    max-width: 600px;
    border: none;
    border-radius: 5px;
}

.el-header {
    padding: 30px;
    text-align: center;
}

.el-main {
    padding: 20px;
}
</style>
  