<template>
  <button
    @click="handleClick"
    :disabled="internalDisabled"
    :class="[bemPrev.b(), bemPrev.e('prev'), bemPrev.is('disabled', internalDisabled)]"
  >
    <el-icon><ArrowLeft /></el-icon>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/use-namespace'
const bemPrev = useNamespace('btn')
defineOptions({
  name: 'zt-prev'
})
const props = defineProps({
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1
  }
})
const emit = defineEmits(['change'])
const handleClick = () => {
  if (!props.disabled && props.currentPage > 1) {
    emit('change', props.currentPage - 1)
  }
}
const internalDisabled = computed(() => props.disabled || props.currentPage <= 1)
</script>
