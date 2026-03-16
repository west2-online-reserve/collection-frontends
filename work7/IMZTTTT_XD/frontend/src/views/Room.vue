<template>
  <el-container v-if="user">
    <el-header>
      {{ user.username }}
    </el-header>
    <el-main>
      <div v-for="item in useMessage.message" :key="item.id">
        <message :message="item"></message>
      </div>
    </el-main>
    <el-footer>
      <input v-model="inputMessage" id="input" autocomplete="off" />
      <button type="submit" @click="sendMessage">发送</button>
    </el-footer>
  </el-container>
  <el-container v-else class="center"> 选择好友，开始聊天吧！ </el-container>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useMessageStore } from '@/stores/message'
import { io } from 'socket.io-client'
import message from '@/component/message.vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const props = defineProps<{
  user: { id: number; username: string } | null
}>()
// 用户信息
const state = reactive({
  username: userStore.user.username,
  id: userStore.user.id,
  userList: []
})
// 用户信息发送给socket
const socket = io('http://localhost:3000', {
  query: {
    username: state.username,
    id: state.id
  }
})
// 连接
socket.on('connect', () => {
  console.log('Connected to server:', socket.id)
})
// 获取在线用户
socket.on('online', (data) => {
  console.log('Online users:', data.userList)
  state.userList = data.userList
})
// 发送给对应用户
socket.on('receive', (data) => {
  console.log('Received message:', data)
  useMessage.addMessage(data)
})

const useMessage = useMessageStore()
const inputMessage = ref('')
// 发送短信
const sendMessage = () => {
  if (inputMessage.value.trim() !== '') {
    const newMessage = {
      content: inputMessage.value,
      senderId: userStore.user.id,
      receiverId: props.user?.id, 
      timestamp: new Date().toISOString()
    }
    useMessage.addMessage(newMessage)
    socket.emit('send', newMessage)
    inputMessage.value = ''
  }
}
</script>

<style scoped>
.el-header {
  font-size: 20px;
  text-align: center;
  font-weight: 700;
  background-color: #e0ebdc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-footer {
  background-color: #d4e1d0;
  display: flex;
  align-items: center;
}

#input {
  border: none;
  margin: 10px 0;
  width: 90%;
  height: 60%;
  border-radius: 0.5rem;
  margin-right: 10px;
  padding: 2px;
  font-size: 20px;
}
#input:focus {
  outline: none;
}
button {
  background: #5f985a;
  border: none;
  width: 8%;
  height: 60%;
  cursor: pointer;
  border-radius: 0.5rem;
  outline: none;
  color: #fff;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e2ebdd;
}
.el-main {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 140px);
  overflow-y: auto;
  padding: 1rem;
}
</style>
