<script lang="ts" setup>
import { ref } from 'vue'
import { userStore } from '../../stores/userStore';
import { ElAvatar, ElHeader, ElForm, ElFormItem, ElContainer } from 'element-plus';
const user = userStore();
</script>
<template>
    <el-container class="body">
        <el-form label-position=top style="width:100vh">
            <span class="title">{{ user.getusername() }}的个人空间</span>
            <br>
            <br>
            <img src="../../assets/img/avatar1.jpg" style="border-radius: 50%;size: 100px;">
            <el-form-item style="margin-right: 500px;" label="用户名" prop="username">
               <span> {{ user.getusername() }}</span>
            </el-form-item>
            <el-form-item style="width:100vh" label="邮箱" prop="email">
               <span> {{ user.getEmail() }}</span>
            </el-form-item>
        </el-form>
    </el-container>
</template>

<style>
.body {
    flex: none;
    display: flex;
    align-items: center;
    border-radius: 10px;
    background: #D1E2CF;
    width: 1400px;
    height: 90vh;
}

.detail {
    color: #3D565A;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
span{
    font-display: center;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
.el-form {
    text-align: center;
}

.el-form-item {
    margin-top: 20px;
    margin-right: 150px;
}
</style>
