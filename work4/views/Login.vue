<template>
  <div class="page">
    <div class="login-box">
      <h1>账号登录</h1>
      <input type="text" placeholder="请输入账号/手机号" />
      <input type="password" placeholder="请输入密码" />
      <button class="login-btn" @click="$router.push('/home')">登录</button>
      <div class="links">
        <span>忘记密码？</span>
        <span>| 没有账号？立即注册</span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #F5F7FA;
}
.login-box {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  width: 400px;
}
h1 {
  text-align: center;
  margin-bottom: 30px;
}
input {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin: 15px 0;
}
.login-btn {
  width: 100%;
  background: #1E80FF;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 8px;
  margin: 20px 0;
  cursor: pointer;
}
.links {
  text-align: center;
  color: #1E80FF;
}
</style>