import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
export const useUserStore = defineStore('user', () => {
    const register = ref([])
    const name = ref('')
    return {
        register,
        name,
    }
}, {
    persist:true
})