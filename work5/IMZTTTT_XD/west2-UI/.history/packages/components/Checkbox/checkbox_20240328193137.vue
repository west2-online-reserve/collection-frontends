<template>
  <label>
    <input type="checkbox" :checked="isChecked" :disabled="isDisabled" @change="handleChange" />
    <slot>{{ label }}</slot>
  </label>
</template>

<script setup lang="ts">
import { useNamespace } from '../../hooks/use-namespace'
defineOptions({
  name: 'zt-button'
})
const bem = useNamespace('checkbox')
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String
  },
  checked: {
    type: Boolean,
    default: false
  }
})
</script>
