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
    <!--通过$slots.default 获取所有没有被包含在具名插槽中的节点，这里指el-button标签中所包裹的所有内容-->
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script setup>
import { ref } from 'vue'
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
const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur'])

const handleClick = (event) => {
  emit('click', event)
}
</script>
