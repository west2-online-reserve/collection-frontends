<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { onBeforeMount } from 'vue';

const router = useRouter();

onBeforeMount(() => {
  router.push({ name: 'aboutMe' });
})
const returnMy = () => {
  router.push({ name: 'my' });
}
</script>

<template>
  <div class="container">
    <div class="top-box">
      <span @click="returnMy" class="back-link">&lt; 返回个人主页</span>
    </div>
    <div class="navigation">
      <div class="tabs">
        <RouterLink to="/set/aboutMe" class="tab" active-class="active-tab">个人资料</RouterLink>
        <RouterLink to="/set/settings" class="tab" active-class="active-tab">账号设置</RouterLink>
      </div>
      <div class="content">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-box {
  background: white;
  height: 70px;
  line-height: 70px;
  color: #1E90FF;
  padding-left: 30px;
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
}

.back-link {
  cursor: pointer;
}

.navigation {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  gap: 2%;
}

.tabs {
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  flex: 0 0 30%;
  height: 70vh;
  padding-top: 20px;
}

.content {
  background: white;
  box-sizing: border-box;
  flex: 0 0 68%;
  height: 70vh;
}

.tab {
  padding: 10px 0;
  text-decoration: none;
  color: black;
  text-align: center;
  width: 100%;
}

.active-tab {
  font-weight: bold;
  color: #1E90FF;
}
</style>