<template>
    <div :class="['message', isSender ? 'message-right' : 'message-left']">
      <el-avatar 
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" 
        :class="isSender ? 'avatar-right' : 'avatar-left'"
      />
      <span class="content">
        {{ message.content }}
      </span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useUserStore } from '@/stores/user';
  const useUser = useUserStore();
  const props = defineProps({
    message: {
      type: Object
    }
  })
  
  const isSender = computed(() => props.message.senderId === useUser.user.id);
  </script>
  
  <style scoped>
  .message {
    display: flex;
    align-items: center;
    margin: 16px 0;
  }
  .message-right {
    justify-content: flex-end;
  }
  .message-left {
    justify-content: flex-start;
  }
  .avatar-right {
    order: 2;
    margin-left: 10px;
  }
  .avatar-left {
    order: 0;
    margin-right: 10px;
  }
  .content {
    padding: 12px;
    background-color: #f5f5f5;
    border-radius: 5px;
  }
  </style>
  