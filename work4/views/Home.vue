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
        <div class="avatar-box" @mouseover="dropVisible=true" @mouseout="setTimeout(()=>dropVisible=false,200)">
          <div class="avatar"></div>
          <div class="dropdown" :class="{ show: dropVisible }">
           <span @click="$router.push('/user')">我的主页</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 文章榜 -->
    <div class="rank">
      <h2>文章榜</h2>
      <div class="divider"></div>
      <div class="rank-list">
        <div v-for="(color, idx) in rankColors" :key="idx" class="rank-item">
          <span class="num" :style="{background:color}">{{ idx+1 }}</span>
          <span>这是一篇热门文章标题</span>
        </div>
      </div>
      <div class="more">查看更多 ></div>
    </div>

    <!-- 文章列表 -->
    <div class="article-list">
      <h2>最新</h2>
      <div class="cards">
        <ArticleCard v-for="(item, idx) in articleList" :key="idx" :item="item"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'
import { articleList, rankColors } from '../data/mockData'

// 控制下拉菜单显示和隐藏
const dropVisible = ref(false)
</script>

<style scoped>
.page {
  width: 100%;
  min-height: 100vh;
  background: #F5F7FA;
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
  object-fit: cover;
}
.active {
  color: #1E80FF;
}
/* 创作者中心和头像一起靠右显示 */
.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}
.write-btn {
  background: #1E80FF;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.avatar-box {
  position: relative;
  cursor: pointer;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #eee;
  cursor: pointer;
}
.dropdown {
  position: absolute;
  top: 40px;
  right: 0;
  min-width: 100px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border-radius: 4px;
  padding: 8px 0;
  display: none;
  z-index: 999;
  pointer-events: none;
}

.dropdown.show {
  display: block;
  pointer-events: auto;
}
.dropdown span {
  display: block;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
}
.dropdown span:hover {
  color: #1E80FF;
}

/* 文章榜 */
.rank {
  position: absolute;
  top: 80px;
  right: 40px;
  width: 240px;
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.1);
}
.divider {
  height: 1px;
  background: #eee;
  margin: 10px 0;
}
.rank-item {
  display: flex;
  align-items: center;
  margin: 12px 0;
}
.num {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  margin-right: 8px;
}
.more {
  text-align: center;
  color: #86909C;
  margin-top: 20px;
  cursor: pointer;
}

/* 文章列表 */
.article-list {
  position: absolute;
  top: 80px;
  left: 20px;
  right: 330px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
}
.cards {
  margin-top: 20px;
}
</style>