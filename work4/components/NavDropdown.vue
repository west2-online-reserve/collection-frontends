<template>
  <div class="dropdown" :class="{ show: visible }">
    <span @click="$router.push('/user')">我的主页</span>
    <span @click="$router.push('/setting')">账号设置</span>
  </div>
</template>

<script setup>
const props = defineProps(['visible'])
</script>

<style scoped>
.dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  width: 100px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-radius: 4px;
  padding: 8px 0;
  display: none;
}
.dropdown.show {
  display: block;
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
</style>