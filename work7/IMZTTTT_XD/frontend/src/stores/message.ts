import { defineStore } from 'pinia'
import { ref } from 'vue'
interface Message {
  id?: string,
  content: string, 
  senderId:number,
  receiverId: number,
  timestamp: number
}
export const useMessageStore = defineStore(
  'message',
  () => {
    const message = ref<Message[]>([])
    const setMessages = (currentMessage: Message[]) => {
      message.value = currentMessage
    }
    const addMessage = (newMessage: Message) => {
      message.value.push(newMessage)
    }
    return {
      message,
      setMessages,
      addMessage
    }
  },
  //参数持久化
  {
    persist: true
  }
)
