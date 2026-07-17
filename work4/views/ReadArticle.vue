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

    <!-- 左侧点赞评论 -->
    <div class="action-bar">
      <div class="btn"><div class="icon"></div></div>
      <div class="btn"><div class="icon"></div></div>
    </div>

    <!-- 文章内容 -->
    <div class="article-content">
      <h1>H1标题</h1>
      <div class="meta">作者名 · 时间 · 浏览数</div>
      <div class="content-block"></div>
      <h2>一级标题</h2>
      <h3>二级标题</h3>
      <h4>三级标题</h4>
      <p>正文段落</p>
      <div class="code-block">代码块文字</div>

      <!-- 评论区 -->
      <div class="comment-section">
        <h3>评论 21</h3>
        <div class="comment-input">
          <div class="avatar-small"></div>
          <textarea placeholder="平等表达，友善交流"></textarea>
          <button class="publish-btn">发布</button>
        </div>
        <div class="comment-list">
          <div class="comment-item">
            <div class="avatar-small"></div>
            <div>
              <div class="username">用户名字</div>
              <div class="comment-text">这篇文章写得真好，学到了！</div>
              <div class="comment-meta">X天前 · 点赞数 · 评论数</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
.action-bar {
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.icon {
  width: 16px;
  height: 16px;
  background: #eee;
}
.article-content {
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  border-radius: 4px;
}
.meta {
  color: #999;
  font-size: 14px;
  margin: 10px 0;
}
.content-block {
  width: 100%;
  height: 80px;
  background: #F5F7FA;
  margin: 20px 0;
}
.comment-section {
  margin-top: 40px;
}
.comment-input {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}
.avatar-small {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #eee;
}
textarea {
  flex: 1;
  background: #eee;
  border: none;
  border-radius: 4px;
  padding: 10px;
}
.publish-btn {
  background: #1E80FF;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.comment-item {
  display: flex;
  gap: 10px;
  margin: 15px 0;
}
.username {
  font-weight: bold;
}
.comment-text {
  margin: 4px 0;
}
.comment-meta {
  font-size: 12px;
  color: #999;
}
</style>