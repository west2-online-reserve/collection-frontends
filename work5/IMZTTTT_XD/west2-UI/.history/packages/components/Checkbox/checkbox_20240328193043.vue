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
const bem = useNamespace('button')
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['small', 'default', 'large'].includes(value)
  },
  round: {
    type: Boolean,
    default: false
  }
})
</script>
