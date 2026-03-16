<template>
  <button
    @click="handleClick"
    :disabled="disabled"
    :class="[
      bem.b(),
      bem.m(type),
      bem.m(size),
      bem.is('disabled', disabled),
      bem.is('round', round)
    ]"
  >
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script setup>
import { useNamespace } from '../../hooks/use-namespace'
defineOptions({
  name: 'zt-button'
})
const bem = useNamespace('button')
const props = defineProps({
  type: {
    // 类型
    type: String,
    default: 'info',
    validator: (value) => ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
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
const emit = defineEmits(['click'])

const handleClick = (event) => {
  emit('click', event)
  console.log('111')
}
</script>
