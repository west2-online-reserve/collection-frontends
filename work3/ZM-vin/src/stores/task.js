import { defineStore } from 'pinia'
import { ref,reactive } from 'vue'
export const useTaskStore = defineStore('task', () => {
    const list = ref([])
    const count = ref('0')
    return {
        list,
        count,
    }
}, {
    persist: true
})