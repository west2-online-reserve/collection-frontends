<template>
  <div class="page">
    <div class="sidebar">
      <div class="back-btn" @click="$router.push('/user')">← 返回个人主页</div>
      <div class="menu-item">个人资料</div>
      <div class="menu-item active">账号设置</div>
    </div>
    <div class="content">
      <h2>账号设置</h2>
      <div class="divider"></div>
      <div class="form-group">
        <label>修改密码</label>
        <div class="input-item">
          <span>旧密码</span>
          <input type="password" placeholder="你的旧密码" />
        </div>
        <div class="input-item">
          <span>新密码</span>
          <input type="password" placeholder="你的新密码" />
        </div>
        <div class="input-item">
          <span>确认新密码</span>
          <input type="password" placeholder="你的新密码" />
        </div>
        <button class="submit-btn">修改密码</button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.page {
  display: flex;
  min-height: 100vh;
  background: #fff;
}
.sidebar {
  width: 200px;
  border-right: 1px solid #eee;
  padding: 20px;
}
.back-btn {
  color: #1E80FF;
  margin-bottom: 20px;
  cursor: pointer;
}
.menu-item {
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  cursor: pointer;
}
.menu-item.active {
  background: #F0F7FF;
  color: #1E80FF;
}
.content {
  flex: 1;
  padding: 20px;
}
.divider {
  height: 1px;
  background: #eee;
  margin: 10px 0;
}
.form-group {
  margin-top: 20px;
}
.input-item {
  display: flex;
  align-items: center;
  margin: 15px 0;
}
.input-item span {
  width: 100px;
}
input {
  flex: 1;
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 4px;
}
.submit-btn {
  background: #1E80FF;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}
</style>