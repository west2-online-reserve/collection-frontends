<template>
  <div class="page">
    <!-- 导航栏 -->
    <div class="navbar">
      <div class="logo">
        <img src="../assets/logo.png" alt="logo" class="logo-img" />
       <span>稀土掘金</span>
       <span class="active">首页</span>
    </div>
    <div class="nav-right">
     <button class="write-btn" @click="$router.push('/write')">创作者中心</button>
     <div class="avatar-box">
      <div class="avatar"></div>
     </div>
    </div>
  </div>

    <!-- 个人信息 -->
    <div class="profile-card">
      <div class="avatar-large"></div>
      <button class="setting-btn" @click="$router.push('/setting')">设置</button>
    </div>

    <!-- 文章列表 -->
    <div class="tab-bar">
      <span class="active">文章</span>
      <span>赞 2</span>
    </div>
    <div class="article-list">
      <div v-for="(item, idx) in articleList" :key="idx" class="article-item">
        <div class="text">
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
          <div class="meta">时间 · 浏览数 · 点赞数 · 评论数</div>
        </div>
        <div class="cover"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { articleList } from '../data/mockData'
</script>

<style scoped>
.page {
  background: #F5F7FA;
  min-height: 100vh;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #eee;
}
.active {
  color: #1E80FF;
}
.nav-right{
  display: flex;
  align-items: center;
  gap: 15px;
}
.write-btn {
  background: #1E80FF;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #eee;
}
.profile-card {
  max-width: 800px;
  margin: 20px auto;
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.avatar-large {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #eee;
}
.setting-btn {
  border: 1px solid #1E80FF;
  color: #1E80FF;
  background: #fff;
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.tab-bar {
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  padding: 10px 20px;
  display: flex;
  gap: 20px;
  border-bottom: 1px solid #eee;
}
.tab-bar .active {
  color: #111;
  font-weight: bold;
  border-bottom: 2px solid #1E80FF;
}
.article-list {
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  padding: 0 20px;
  box-sizing: border-box;
}
.article-item {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}
.text h3 {
  font-size: 16px;
  margin: 0;
}
.text p {
  font-size: 14px;
  color: #666;
  margin: 8px 0;
}
.meta {
  font-size: 12px;
  color: #999;
}
.cover {
  width: 180px;
  height: 100px;
  background: #eee;
  border-radius: 8px;
}
</style>