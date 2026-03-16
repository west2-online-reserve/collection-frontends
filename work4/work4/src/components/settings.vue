<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { changePassword } from '@/api/api';
const password = ref('')

const fetchChangePassword = async () => {
  try {
    const data = {
      password: password.value,
      Authorization: "XSOiyesyGQxPFBGTW0evEnvioN3igXS52KWQ7HVfJAw5DWCkxkOwao0T7wqOpGbTJghhsrPdNeYZjvsV5AoqmfRDcZru9N713g9dHmOkAHcYxOfZqH8M+SNH7jwtTZFnfHdsf3gi3kBr1bA/HJ/jMO9IbELboa/dqhANtNr6vfE=",
    };

    const response = await changePassword(data);

    alert(response.base.msg)
  } catch (err: any) {
    ElMessage.error(err.message || "修改失败");
  }
}
</script>

<template>
<div class="container">
<div class="label-box">请输入新的密码：</div>
<el-input
  v-model="password"
  class="input-box"
  maxlength="20"
  placeholder="Please input"
  show-word-limit
  type="text"
/>
<el-button type="primary" plain class="button" @click="fetchChangePassword">确认修改用户名</el-button>
</div>
</template>

<style scoped>
.container {
  position: relative;
  height: 100%;
}

.input-box {
  position: absolute;
  bottom: 450px;
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

.button {
  position: absolute;
  bottom: 300px;
  text-align: center;
}
</style>