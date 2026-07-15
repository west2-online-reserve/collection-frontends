<template>
  <div class="article-card" @click="$router.push('/article')">
    <div class="card-left">
      <h3 class="title">{{ item.title }}</h3>
      <p class="desc">{{ item.desc }}</p>
      <div class="info">
        <span>作者</span>
        <span><i class="icon"></i> {{ item.viewNum }}</span>
        <span><i class="icon"></i> {{ item.likeNum }}</span>
      </div>
    </div>
    <div class="cover"></div>
  </div>
</template>

<script setup>
const props = defineProps(['item'])
</script>

<style scoped>
.article-card {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #F3F4F6;
  cursor: pointer;
}
.card-left {
  width: calc(100% - 200px);
}
.title {
  font-size: 18px;
  color: #111827;
  margin: 0;
}
.desc {
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0;
}
.info {
  display: flex;
  font-size: 12px;
  color: #9CA3AF;
  gap: 20px;
}
.icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #E5E7EB;
  margin-right: 4px;
}
.cover {
  width: 180px;
  height: 100px;
  background: #F3F4F6;
  border-radius: 8px;
}
</style>