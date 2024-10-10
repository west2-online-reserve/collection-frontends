<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="240px">
        <div class="userlist">好友列表</div>
        <div v-for="item in userAll.users" :key="item.id">
          <UserItem :user="item" @click="handleUserClick" />
        </div>
        <div class="logout">
          <el-icon
            @click="
              router.push('/');
              useUser.removeUser
            "
            ><SwitchButton
          /></el-icon>
        </div>
      </el-aside>
      <Room :user="selectedUser" />
    </el-container>
  </div>
</template>

<script setup lang="ts">
import UserItem from './UserItem.vue'
import Room from './Room.vue'
import { userAllSevrvice } from '../apis/user'
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserAllStore } from '../stores/userAll'
import { useUserStore } from '../stores/user'
import { getMessageSevrvice } from '@/apis/message'
import { useMessageStore } from '@/stores/message'

const userAll = reactive({ users: [] })
const selectedUser = ref<{ id: number; username: string } | null>(null)

const router = useRouter()
const useUserAll = useUserAllStore()
const useUser = useUserStore()
const useMessage = useMessageStore()
// 获取已注册的用户信息
const getUserAll = async () => {
  const response = await userAllSevrvice()
  const allUsers = response.users

  // 获取当前用户的 ID
  const currentUser = useUser.user
  const currentUserId = currentUser.id

  // 过滤掉当前用户
  const filteredUsers = allUsers.filter((user) => user.id !== currentUserId)
  userAll.users = filteredUsers
  useUserAll.setUsers(filteredUsers)
}
// 从数据库获取聊天记录然后存进本地
const getMessage = async () => {
  try {
    if (selectedUser.value) {
      let result = await getMessageSevrvice(useUser.user.id, selectedUser.value.id)
      useMessage.setMessages(result.messages)
    } else {
      console.log('没有选中用户')
    }
  } catch (err) {
    console.error(err)
  }
}
// 点击用户列表中的用户，获取该用户的聊天记录
const handleUserClick = (user: { id: number; username: string }) => {
  selectedUser.value = user
  getMessage()
}

onMounted(() => {
  getUserAll()
})
</script>

<style scoped>
.el-aside {
  background-color: #fafcf9;
  height: 100vh;
  .userlist {
    font-size: 20px;
    text-align: center;
    font-weight: 700;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #edf7e7;
  }
}
.logout {
  position: absolute;
  bottom: 20px;
  left: 2%;
  transform: translateX(-50%);
  cursor: pointer;
}
</style>
