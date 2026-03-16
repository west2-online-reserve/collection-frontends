<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { changeUsername, changeAvatar } from '@/api/api';
const username = ref('')
const avatar_url = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

const fetchChangeUsername = async () => {
  try {
    const data = {
      username: username.value,
      Authorization: "XSOiyesyGQxPFBGTW0evEnvioN3igXS52KWQ7HVfJAw5DWCkxkOwao0T7wqOpGbTJghhsrPdNeYZjvsV5AoqmfRDcZru9N713g9dHmOkAHcYxOfZqH8M+SNH7jwtTZFnfHdsf3gi3kBr1bA/HJ/jMO9IbELboa/dqhANtNr6vfE=",
    };

    const response = await changeUsername(data);

    alert(response.base.msg)
  } catch (err: any) {
    ElMessage.error(err.message || "修改失败");
  }
}

const fetchChangeAvatar = async () => {
  try {
    const data = {
      avatar_url: avatar_url.value,
      Authorization: "XSOiyesyGQxPFBGTW0evEnvioN3igXS52KWQ7HVfJAw5DWCkxkOwao0T7wqOpGbTJghhsrPdNeYZjvsV5AoqmfRDcZru9N713g9dHmOkAHcYxOfZqH8M+SNH7jwtTZFnfHdsf3gi3kBr1bA/HJ/jMO9IbELboa/dqhANtNr6vfE=",
    };

    const response = await changeAvatar(data);

    alert(response.base.msg)
  } catch (err: any) {
    ElMessage.error(err.message || "修改失败");
  }
}

const openFileDialog = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      avatar_url.value = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
 <div class="container">
  <div class="label-box">用户名：</div>
  <el-input
    v-model="username"
    class="input-box"
    maxlength="20"
    placeholder="Please input"
    show-word-limit
    type="text"
  />
  <el-button type="primary" plain class="button1" @click="fetchChangeUsername">确认修改用户名</el-button>
  <img src="../pictures/touxiang.png" class="avatar">
  <div  class="button2">
    <el-button type="primary" plain @click="openFileDialog">上传头像</el-button>
    <input
        type="file"
        accept="image/*"
        ref="fileInput"
        @change="handleFileSelect"
        style="display: none"
      />
      <el-button type="primary" plain @click="fetchChangeAvatar">确认</el-button>
    <h4>格式: 支持JPG、PNG、JPEG  大小: 5M以内</h4>
  </div>
</div>
</template>

<style scoped>
.container {
  position: relative;
  height: 100%;
}

.input-box {
  position: absolute;
  bottom: 480px;
  right: 0;
  left: 0;
  margin-right: auto;
  margin-left: auto;
  width: 400px;
}

.label-box {
  position: absolute;
  bottom: 550px;
}

.avatar {
  position: absolute;
  bottom: 150px;
}

.button2 {
  position: absolute;
  bottom: 0px;
  text-align: center;
}

.button1 {
  position: absolute;
  bottom: 400px;
  text-align: center;
}
</style>