<template>
  <span> 共 {{ total }} 条 </span>
</template>

<script setup lang="ts">
defineOptions({
  name: 'zt-total'
})
defineProps({
  total: {
    type: Number,
    required: true
  }
})
</script>
