<template>
  <div class="item" @click="handleClick">
    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <span>{{ user.username }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  onClick: {
    type: Function,
    required: true
  }
})

const handleClick = () => {
  props.onClick(props.user)
}
</script>

<style scoped>
.el-avatar {
  width: 40px;
  margin-right: 10px;
}
.item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
}
.item:hover {
  background-color: #f5f5f5;
}
</style>
