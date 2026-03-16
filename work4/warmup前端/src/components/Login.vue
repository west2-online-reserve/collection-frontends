<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { ElMessage } from 'element-plus'; //elementPlus组件库​
import { useRouter } from 'vue-router';
import { Login } from '@/api/api'; //登录接口

const userStore = useUserStore(); //封装了一个鉴权store，存有token等信息​
const router = useRouter();
const username = ref("");
const password = ref("");

interface LoginData {
    username: string;
    password: string;
}

//async和await配合，实现异步操作，保证在接口调用完后才读取值​
const login = async (loginData: LoginData) => {
  try {
    const res = await Login(loginData);
    if (res.data.msg === "success") {
      userStore.setUserData(res.data.token, res.data.username);
      ElMessage.success("登录成功！");
      router.push({ name: 'home' });
    } else {
      ElMessage.error(res.data.msg);
    }
  } catch (err: any) {
    ElMessage.error(err.message || "登录失败");
  }
};
</script>

<template>
  <div>
    <br>
    <el-input v-model="username" placeholder="请输入：" clearable/>
    <br><br>
    <el-input v-model="password" type="password" placeholder="请输入：" show-password/>
    <br><br>
    <el-button type="primary" @click="login">点击登录</el-button>
  </div>
</template>

<style scoped>
 :deep(.el-input__inner) {
  flex-grow: 0;
 }
 :deep(.el-input__wrapper) {
  flex-grow: 0;
  background-color: pink;
	width: 150px;
 }
 .el-button {
  position: absolute;
  left: 50px;
 }
</style>