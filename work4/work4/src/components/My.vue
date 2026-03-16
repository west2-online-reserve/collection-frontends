<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, onBeforeMount } from 'vue';

const likesCount = ref(0);
const router = useRouter();

onBeforeMount(() => {
  router.push({ name: 'myArticles' });
})
const set = () => {
  router.push({ name: 'set' });
}
</script>

<template>
  <div class="page-container">
    <div class="top-box">
      <img src="../pictures/touxiang.png" class="avatar">
      <el-button type="primary" plain class="settings-button" @click="set">设置</el-button>
    </div>

    <div class="tab-box">
      <RouterLink to="/my/myArticles" class="tab" active-class="active-tab">文章</RouterLink>
      <RouterLink to="/my/myLikes" class="tab" active-class="active-tab">赞 <span>{{ likesCount }}</span></RouterLink>
    </div>

    <div class="content-box">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 80vh;
  align-items: center;
}

.top-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  margin-bottom: 20px;
  width: 75%;
}

.avatar {
  margin-left: 250px;
}

.settings-button {
  margin-right: 250px;
  font-size: 1.5em;
}

.tab-box {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: white;
  gap: 100px;
  margin-bottom: 10px;
  width: 75%;
}

.tab {
  color: black;
  text-decoration: none;
}

.active-tab {
  font-weight: bold;
  text-decoration: underline;
  text-decoration-color: #1E90FF;
  text-underline-offset: 0.5em;
  text-decoration-thickness: 2px;
}

.content-box {
  flex-grow: 1;
  padding: 20px;
  background-color: #fff;
  width: 75%;
}
</style>