<template>
  <button
    @click="handleClick"
    :disabled="internalDisabled"
    :class="[bemNext.b(), bemNext.e('next'), bemNext.is('disabled', internalDisabled)]"
  >
    <el-icon><ArrowRight /></el-icon>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/use-namespace'
const bemNext = useNamespace('btn')
defineOptions({
  name: 'zt-next'
})

const props = defineProps({
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1
  },
  pageCount: {
    type: Number
  }
})
const emit = defineEmits(['change'])
const handleClick = () => {
  if (!props.disabled && props.currentPage < props.pageCount) {
    emit('change', props.currentPage + 1)
  }
}
const internalDisabled = computed(
  () => props.disabled || props.currentPage === props.pageCount || props.pageCount === 0
)
</script>
