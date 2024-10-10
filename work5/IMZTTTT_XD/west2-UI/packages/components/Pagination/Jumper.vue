<template>
  <span :class="bemJump.b()">
    前往
    <el-input v-model="currentPage" maxlength="4" @change="handleChange"> </el-input>页
  </span>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useNamespace } from '../../hooks/use-namespace'
const bemJump = useNamespace('jump')
const props = defineProps({
  currentPage: {
    type: Number,
    defalut: 1
  },
  pageCount: {
    type: Number
  }
})
const currentPage = ref(props.currentPage)
const emits = defineEmits(['change'])
const handleChange = () => {
  if (currentPage.value > props.pageCount) {
    currentPage.value = props.pageCount
  } else if (currentPage.value < 1) {
    currentPage.value = 1
  }
  emits('change', Number(currentPage.value))
}
watchEffect(() => {
  currentPage.value = props.currentPage
})
</script>
