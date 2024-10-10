import { defineStore } from 'pinia'
import { ref } from 'vue'
interface User {
  id: string
  username: string
}
export const useUserAllStore = defineStore(
  'userAll',
  () => {
    const userAll = ref<User[]>([])
    const setUsers = (users: User[]) => {
      userAll.value = users
    }
    const getUserById = (id: string): User | undefined => {
      return userAll.value.find((user) => user.id === id)
    }
    return {
      userAll,
      setUsers,
      getUserById
    }
  },
  //参数持久化
  {
    persist: true
  }
)
